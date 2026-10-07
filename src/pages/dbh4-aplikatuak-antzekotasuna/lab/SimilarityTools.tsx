import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { toExactDecimal, toNumber, type FractionValue } from '../../../features/unit-v2/math/fraction'
import { boxVertices, fitCamera } from '../../dbh2-gorputzak-v2/geometry3d'
import { Solid } from '../../dbh2-gorputzak-v2/solids'
import {
    COPY_MAX,
    DIVIDE_LENGTH_MAX,
    DIVIDE_PARTS_MAX,
    DIVIDE_PARTS_MIN,
    divideChallenges,
    divideParts,
    GROWTH_MAX,
    growthChallenges,
    growthFactors,
    HOMOTHETY_MAX,
    HOMOTHETY_MIN,
    homothetyArea,
    homothetyChallenges,
    homothetyPerimeter,
    initialDivideState,
    initialGrowthState,
    initialHomothetyState,
    initialMapState,
    initialRectanglesState,
    initialShadowsState,
    initialThalesState,
    isSimilar,
    MAP_DISTANCE_MAX,
    MAP_SCALES,
    mapChallenges,
    realDistance,
    RECTANGLES,
    rectanglesChallenges,
    rectanglesRatio,
    setDivide,
    setGrowth,
    setHomothety,
    setMap,
    setRectangles,
    setShadows,
    setThales,
    shadowsChallenges,
    smallSide,
    STICK_MAX,
    STICK_SHADOW_MAX,
    thalesChallenges,
    thalesRatio,
    THALES_SIDE_MAX,
    TREE_SHADOW_MAX,
    treeHeight,
    WEIGHT_MAX,
    type DivideState,
    type GrowthShape,
    type GrowthState,
    type HomothetyState,
    type MapState,
    type RectanglesState,
    type ShadowsState,
    type ThalesState
} from './labTools'

/* ==========================================================================
   The new tools of the Antzekotasuna lab: dividing a segment with Thales'
   parallels, triangles in Thales position, similar rectangles (similar
   when their diagonals line up), a homothety, a square or a cube grown by
   r, a map with its scale and the shadows of a stick and a tree. Drawings
   are language-free; numbers in Arabic use the decimal point.
   ========================================================================== */

type Text = { eu: string; es: string; ar: string }
type Point = [number, number]

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const SECOND = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const SOFT = '#fbebc0'
const MINT = '#d6eddf'
const SKY = '#dde7f7'
const ROSE = '#f6d9d2'

const say = (eu: string, es: string, ar: string): Text => ({ eu, es, ar })
/** {,} in LaTeX becomes the point in Arabic */
const localLatex = (language: string, latex: string) => (language === 'ar' ? latex.replace(/\{,\}/g, '.') : latex)
const points = (list: Point[]) => list.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
const lerp = ([ax, ay]: Point, [bx, by]: Point, t: number): Point => [ax + (bx - ax) * t, ay + (by - ay) * t]
/** A number with the comma, the point in Arabic */
const plain = (language: string, text: string) => (language === 'ar' ? text.replace(',', '.') : text)
/** Thousands grouped with thin spaces: 1 200 000 */
const grouped = (value: number) => String(value).replace(/\B(?=(\d{3})+$)/g, ' ')
/** A decimal text with its whole part grouped in thousands from five digits: 200000 → 200 000 */
const groupedText = (text: string) => {
    const [whole, decimals] = text.split(',')
    const spaced = whole.length > 4 ? whole.replace(/\B(?=(\d{3})+$)/g, ' ') : whole
    return decimals === undefined ? spaced : `${spaced},${decimals}`
}

/** An exact value as text with the comma, or rounded to hundredths with ≈ */
function valueText(value: FractionValue): { text: string; exact: boolean } {
    const exact = toExactDecimal(value, ',')
    if (exact !== null && (exact.split(',')[1] ?? '').length <= 3) return { text: exact, exact: true }
    return { text: (Math.round(toNumber(value) * 100) / 100).toString().replace('.', ','), exact: false }
}
const latexValue = (value: FractionValue) => {
    const { text, exact } = valueText(value)
    return `${exact ? '=' : '\\approx '}${text.replace(',', '{,}')}`
}

function Board({ height, label, children }: { height: number; label: string; children: ReactNode }) {
    return <svg viewBox={`0 0 640 ${height}`} direction="ltr" role="img" aria-label={label} style={{ width: '100%', height: 'auto', fontFamily: '"Atkinson Hyperlegible", "Noto Sans Arabic", system-ui, sans-serif' }}>{children}</svg>
}

function Readout({ language, latex, note }: { language: string; latex: string; note: string }) {
    return (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={localLatex(language, `$${latex}$`)} /></span>
            <span className="fraction-v2-lab-readout-note">{note}</span>
        </>
    )
}

function Tag({ x, y, children, color = INK, size = 15, anchor = 'middle' }: { x: number; y: number; children: ReactNode; color?: string; size?: number; anchor?: 'start' | 'middle' | 'end' }) {
    return <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={700} fill={color}>{children}</text>
}

/* ---------- 1. Dividing a segment ---------- */

export function DivideTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<DivideState>(initialDivideState)
    const parts = divideParts(state)
    const sum = state.weights.reduce((total, weight) => total + weight, 0)
    const A: Point = [50, 240]
    const B: Point = [590, 240]
    const angle = Math.atan2(-0.45, 1)
    const unit = 470 / sum
    // Running sums of the weights: where each mark and each cut falls
    const cumulative = state.weights.map((_, index) => state.weights.slice(0, index + 1).reduce((total, weight) => total + weight, 0))
    const marks: Point[] = cumulative.map((reach) => [A[0] + reach * unit * Math.cos(angle), A[1] + reach * unit * Math.sin(angle)])
    const cuts: Point[] = cumulative.map((reach) => lerp(A, B, reach / sum))
    const controls = (
        <>
            <Stepper label={l(say('Luzera (cm)', 'Longitud (cm)', 'الطول (سم)'))} value={state.length} min={1} max={DIVIDE_LENGTH_MAX} onChange={(value) => setState((s) => setDivide(s, { length: value }))} language={props.language} />
            <Stepper label={l(say('Zati kopurua', 'Número de partes', 'عدد الأجزاء'))} value={state.weights.length} min={DIVIDE_PARTS_MIN} max={DIVIDE_PARTS_MAX} onChange={(value) => setState((s) => setDivide(s, { count: value }))} language={props.language} />
            {state.weights.map((weight, index) => (
                <Stepper key={index} label={l(say(`${index + 1}. zatiaren pisua`, `Peso de la parte ${index + 1}`, `وزن الجزء ${index + 1}`))} value={weight} min={1} max={WEIGHT_MAX} onChange={(value) => setState((s) => setDivide(s, { weight: [index, value] }))} language={props.language} />
            ))}
        </>
    )
    const latex = `\\frac{${state.length}}{${sum}}\\cdot (${state.weights.join(',\\,')})\\to ${parts.map((part) => valueText(part).text.replace(',', '{,}')).join(';\\ ')}`
    const note = l(say(`Zatiak, cm-tan: ${parts.map((part) => valueText(part).text).join('; ')}.`, `Las partes, en cm: ${parts.map((part) => valueText(part).text).join('; ')}.`, `الأجزاء بالسنتيمتر: ${parts.map((part) => valueText(part).text.replace(',', '.')).join('؛ ')}.`))
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout language={props.language} latex={latex} note={note} />} challenges={divideChallenges} state={state}>
            <Board height={290} label={l(say('Zuzenkia Talesekin zatituta', 'El segmento dividido con Tales', 'القطعة مقسومة بطاليس'))}>
                <line x1={A[0]} y1={A[1]} x2={marks[marks.length - 1][0] + 20 * Math.cos(angle)} y2={marks[marks.length - 1][1] + 20 * Math.sin(angle)} stroke={MUTED} strokeWidth={1.6} />
                <line x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} stroke={INK} strokeWidth={3} />
                {marks.map((mark, index) => (
                    <g key={index}>
                        <line x1={mark[0]} y1={mark[1]} x2={cuts[index][0]} y2={cuts[index][1]} stroke={index === marks.length - 1 ? SECOND : STAGE} strokeWidth={2} strokeDasharray={index === marks.length - 1 ? undefined : '6 4'} />
                        <circle cx={mark[0]} cy={mark[1]} r={4.5} fill={SECOND} />
                    </g>
                ))}
                {[A, ...cuts].map((cut, index) => <line key={index} x1={cut[0]} y1={cut[1] - 8} x2={cut[0]} y2={cut[1] + 8} stroke={INK} strokeWidth={2.4} />)}
                {cuts.map((cut, index) => {
                    const start = index === 0 ? A : cuts[index - 1]
                    return <Tag key={index} x={(start[0] + cut[0]) / 2} y={266} size={14} color={STAGE}>{plain(props.language, valueText(parts[index]).text)}</Tag>
                })}
            </Board>
        </ToolFrame>
    )
}

/* ---------- 2. Thales position ---------- */

export function ThalesTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<ThalesState>(initialThalesState)
    const { ab, bc, cut } = state
    const A: Point = [60, 260]
    const B: Point = [60 + 34 * ab, 260]
    const C: Point = [60 + 34 * ab * 0.4, 30]
    const t = cut / ab
    const B2 = lerp(A, B, t)
    const C2 = lerp(A, C, t)
    const small = smallSide(state)
    const controls = (
        <>
            <Stepper label="AB" value={ab} min={2} max={THALES_SIDE_MAX} onChange={(value) => setState((s) => setThales(s, { ab: value }))} language={props.language} />
            <Stepper label="BC" value={bc} min={1} max={THALES_SIDE_MAX} onChange={(value) => setState((s) => setThales(s, { bc: value }))} language={props.language} />
            <Stepper label="AB'" value={cut} min={1} max={ab - 1} onChange={(value) => setState((s) => setThales(s, { cut: value }))} language={props.language} />
        </>
    )
    const latex = `\\frac{B'C'}{${bc}}=\\frac{${cut}}{${ab}}\\to B'C'=\\frac{${bc}\\cdot ${cut}}{${ab}}${latexValue(small)}`
    const ratio = valueText(thalesRatio(state))
    const note = l(say(`Arrazoia: ${ratio.exact ? '' : '≈ '}${ratio.text}. Triangelu txikiaren alde guztiak proportzio berean.`, `Razón: ${ratio.exact ? '' : '≈ '}${ratio.text}. Todos los lados del pequeño, en la misma proporción.`, `النسبة: ${ratio.exact ? '' : '≈ '}${ratio.text.replace(',', '.')}. كل أضلاع الصغير بالنسبة نفسها.`))
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout language={props.language} latex={latex} note={note} />} challenges={thalesChallenges} state={state}>
            <Board height={300} label={l(say('Bi triangelu Tales posizioan', 'Dos triángulos en posición de Tales', 'مثلثان في وضع طاليس'))}>
                <polygon points={points([A, B, C])} fill={SKY} stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
                <polygon points={points([A, B2, C2])} fill={SOFT} stroke={INK} strokeWidth={2} strokeLinejoin="round" />
                <line x1={B2[0]} y1={B2[1]} x2={C2[0]} y2={C2[1]} stroke={SECOND} strokeWidth={3} />
                <line x1={B[0]} y1={B[1]} x2={C[0]} y2={C[1]} stroke={SECOND} strokeWidth={3} />
                <Tag x={A[0] - 12} y={A[1] + 5} anchor="end">A</Tag>
                <Tag x={B[0] + 10} y={B[1] + 5} anchor="start">B</Tag>
                <Tag x={C[0]} y={C[1] - 10}>C</Tag>
                <Tag x={B2[0]} y={B2[1] + 22}>{"B'"}</Tag>
                <Tag x={C2[0] - 12} y={C2[1]} anchor="end">{"C'"}</Tag>
                <Tag x={(B[0] + C[0]) / 2 + 16} y={(B[1] + C[1]) / 2} anchor="start" color={SECOND}>{String(bc)}</Tag>
                <Tag x={(B2[0] + C2[0]) / 2 + 12} y={(B2[1] + C2[1]) / 2 + 10} anchor="start" color={SECOND} size={14}>{plain(props.language, valueText(small).text)}</Tag>
            </Board>
        </ToolFrame>
    )
}

/* ---------- 3. Similar rectangles ---------- */

export function RectanglesTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<RectanglesState>(initialRectanglesState)
    const [a, b] = RECTANGLES[state.original]
    const { width, height } = state
    const similar = isSimilar(state)
    const k = Math.min(400 / Math.max(width, a), 230 / Math.max(height, b))
    const O: Point = [80, 268]
    const controls = (
        <>
            <Segmented label={l(say('Jatorrizkoa', 'Original', 'الأصلي'))} value={String(state.original)} options={RECTANGLES.map(([x, y], index) => ({ value: String(index), label: `${x} × ${y}` }))} onChange={(value) => setState((s) => setRectangles(s, { original: Number(value) }))} />
            <Stepper label={l(say('Zabalera', 'Ancho', 'العرض'))} value={width} min={1} max={COPY_MAX} onChange={(value) => setState((s) => setRectangles(s, { width: value }))} language={props.language} />
            <Stepper label={l(say('Altuera', 'Alto', 'الارتفاع'))} value={height} min={1} max={COPY_MAX} onChange={(value) => setState((s) => setRectangles(s, { height: value }))} language={props.language} />
        </>
    )
    const latex = `\\frac{${width}}{${a}}${latexValue(rectanglesRatio(state))}\\qquad \\frac{${height}}{${b}}${latexValue({ numerator: height, denominator: b })}`
    const note = similar
        ? l(say('Antzekoak dira: zatidurak berdinak eta diagonalak lerrokatuta.', 'Son semejantes: los cocientes son iguales y las diagonales coinciden.', 'متشابهان: النسبتان متساويتان والقطران متطابقان.'))
        : l(say('Ez dira antzekoak: zatidurak desberdinak dira.', 'No son semejantes: los cocientes son distintos.', 'غير متشابهين: النسبتان مختلفتان.'))
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout language={props.language} latex={latex} note={note} />} challenges={rectanglesChallenges} state={state}>
            <Board height={300} label={l(say('Jatorrizko laukizuzena eta kopia, izkina berean', 'El rectángulo original y la copia, en la misma esquina', 'المستطيل الأصلي والنسخة في الزاوية نفسها'))}>
                <rect x={O[0]} y={O[1] - height * k} width={width * k} height={height * k} fill={similar ? MINT : ROSE} fillOpacity={0.7} stroke={INK} strokeWidth={2.2} />
                <rect x={O[0]} y={O[1] - b * k} width={a * k} height={b * k} fill={SOFT} stroke={INK} strokeWidth={2.2} />
                <line x1={O[0]} y1={O[1]} x2={O[0] + width * k} y2={O[1] - height * k} stroke={similar ? GREEN : SECOND} strokeWidth={2.4} strokeDasharray="7 5" />
                <line x1={O[0]} y1={O[1]} x2={O[0] + a * k} y2={O[1] - b * k} stroke={STAGE} strokeWidth={2.4} />
                <Tag x={O[0] + (width * k) / 2} y={O[1] + 18}>{String(width)}</Tag>
                <Tag x={O[0] + width * k + 10} y={O[1] - (height * k) / 2} anchor="start">{String(height)}</Tag>
                <Tag x={O[0] + (a * k) / 2} y={O[1] - b * k - 8} size={13} color={MUTED}>{String(a)}</Tag>
                <Tag x={O[0] - 10} y={O[1] - (b * k) / 2} anchor="end" size={13} color={MUTED}>{String(b)}</Tag>
            </Board>
        </ToolFrame>
    )
}

/* ---------- 4. Homothety ---------- */

export function HomothetyTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<HomothetyState>(initialHomothetyState)
    const { r } = state
    const O: Point = [50, 280]
    const unit = 22
    // The 3-4-5 triangle, legs along the axes, placed away from O
    const base: Point[] = [[2, 1], [6, 1], [2, 4]]
    const at = ([x, y]: Point, k: number): Point => [O[0] + x * unit * k, O[1] - y * unit * k]
    const original = base.map((p) => at(p, 1))
    const image = base.map((p) => at(p, r))
    const perimeter = homothetyPerimeter(state)
    const area = homothetyArea(state)
    const controls = (
        <Stepper label={l(say('Arrazoia r', 'Razón r', 'النسبة r'))} value={r} min={HOMOTHETY_MIN} max={HOMOTHETY_MAX} step={0.5} format={(value) => plain(props.language, String(value).replace('.', ','))} onChange={(value) => setState((s) => setHomothety(s, { r: value }))} language={props.language} />
    )
    const rTex = String(r).replace('.', '{,}')
    const latex = `P'=12\\cdot ${rTex}${latexValue(perimeter)}\\qquad A'=6\\cdot ${rTex}^{2}${latexValue(area)}`
    const note = l(say('Jatorrizko triangelua: aldeak 3, 4 eta 5; perimetroa 12 eta azalera 6.', 'Triángulo original: lados 3, 4 y 5; perímetro 12 y área 6.', 'المثلث الأصلي: الأضلاع 3 و4 و5؛ المحيط 12 والمساحة 6.'))
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout language={props.language} latex={latex} note={note} />} challenges={homothetyChallenges} state={state}>
            <Board height={300} label={l(say('O zentroko homotezia', 'Homotecia de centro O', 'تحاكٍ مركزه O'))}>
                {base.map((p, index) => <line key={index} x1={O[0]} y1={O[1]} x2={at(p, Math.max(r, 1) * 1.06)[0]} y2={at(p, Math.max(r, 1) * 1.06)[1]} stroke={MUTED} strokeWidth={1.2} strokeDasharray="5 4" />)}
                <polygon points={points(original)} fill={SOFT} stroke={INK} strokeWidth={2} strokeLinejoin="round" />
                <polygon points={points(image)} fill={MINT} fillOpacity={0.75} stroke={STAGE} strokeWidth={2.4} strokeLinejoin="round" />
                <circle cx={O[0]} cy={O[1]} r={5} fill={SECOND} />
                <Tag x={O[0] - 10} y={O[1] + 6} anchor="end" color={SECOND}>O</Tag>
                <Tag x={560} y={120} size={18} color={STAGE}>{`r = ${plain(props.language, String(r).replace('.', ','))}`}</Tag>
            </Board>
        </ToolFrame>
    )
}

/* ---------- 5. Growing a square or a cube ---------- */

const shapeNames: Record<GrowthShape, Text> = {
    square: say('Karratua', 'Cuadrado', 'مربع'),
    cube: say('Kuboa', 'Cubo', 'مكعب')
}

export function GrowthTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<GrowthState>(initialGrowthState)
    const { shape, r } = state
    const factors = growthFactors(state)
    const unit = 260 / GROWTH_MAX / 1.1
    const controls = (
        <>
            <Segmented label={l(say('Irudia', 'Figura', 'الشكل'))} value={shape} options={(['square', 'cube'] as GrowthShape[]).map((value) => ({ value, label: l(shapeNames[value]) }))} onChange={(value) => setState((s) => setGrowth(s, { shape: value }))} />
            <Stepper label={l(say('Arrazoia r', 'Razón r', 'النسبة r'))} value={r} min={0.5} max={GROWTH_MAX} step={0.5} format={(value) => plain(props.language, String(value).replace('.', ','))} onChange={(value) => setState((s) => setGrowth(s, { r: value }))} language={props.language} />
        </>
    )
    const rTex = String(r).replace('.', '{,}')
    const latex = shape === 'square'
        ? `r=${rTex}\\qquad r^{2}${latexValue(factors.area)}`
        : `r=${rTex}\\qquad r^{2}${latexValue(factors.area)}\\qquad r^{3}${latexValue(factors.volume)}`
    const note = shape === 'square'
        ? l(say(`Aldea ${valueText(factors.length).text} bider, azalera ${valueText(factors.area).text} bider.`, `El lado, ${valueText(factors.length).text} veces; el área, ${valueText(factors.area).text} veces.`, `الضلع ${valueText(factors.length).text.replace(',', '.')} مرة؛ والمساحة ${valueText(factors.area).text.replace(',', '.')} مرة.`))
        : l(say(`Ertza ${valueText(factors.length).text} bider, bolumena ${valueText(factors.volume).text} bider.`, `La arista, ${valueText(factors.length).text} veces; el volumen, ${valueText(factors.volume).text} veces.`, `الحرف ${valueText(factors.length).text.replace(',', '.')} مرة؛ والحجم ${valueText(factors.volume).text.replace(',', '.')} مرة.`))
    let drawing: ReactNode
    if (shape === 'square') {
        const side = r * unit
        const x = 200
        const y = 280 - side
        const lines = Array.from({ length: Math.floor(r) }, (_, index) => (index + 1) * unit).filter((offset) => offset < side - 0.5)
        drawing = (
            <g>
                <rect x={60} y={280 - unit} width={unit} height={unit} fill={SOFT} stroke={INK} strokeWidth={2} />
                <Tag x={60 + unit / 2} y={296} size={13} color={MUTED}>1</Tag>
                <rect x={x} y={y} width={side} height={side} fill={SKY} stroke={STAGE} strokeWidth={2.6} />
                {lines.map((offset) => <g key={offset}><line x1={x + offset} y1={y} x2={x + offset} y2={280} stroke={MUTED} strokeWidth={1} /><line x1={x} y1={280 - offset} x2={x + side} y2={280 - offset} stroke={MUTED} strokeWidth={1} /></g>)}
                <Tag x={x + side / 2} y={296} size={13} color={STAGE}>{plain(props.language, String(r).replace('.', ','))}</Tag>
            </g>
        )
    } else {
        const cam = fitCamera(boxVertices(GROWTH_MAX, GROWTH_MAX, GROWTH_MAX), [180, 20, 600, 290], 60)
        const small = fitCamera(boxVertices(GROWTH_MAX, GROWTH_MAX, GROWTH_MAX), [20, 150, 160, 290], 60)
        drawing = (
            <g>
                <Solid cam={small} vertices={boxVertices(1, 1, 1)} fill={SOFT} />
                <Solid cam={cam} vertices={boxVertices(r, r, r)} fill={SKY} />
            </g>
        )
    }
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout language={props.language} latex={latex} note={note} />} challenges={growthChallenges} state={state}>
            <Board height={300} label={l(shapeNames[shape])}>{drawing}</Board>
        </ToolFrame>
    )
}

/* ---------- 6. A map and its scale ---------- */

export function MapTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<MapState>(initialMapState)
    const { scale, cm } = state
    const real = realDistance(state)
    const P: Point = [60, 190]
    const Q: Point = [60 + cm * 26, 190 - cm * 4]
    const controls = (
        <>
            <Segmented label={l(say('Eskala', 'Escala', 'المقياس'))} value={String(scale)} options={MAP_SCALES.map((value) => ({ value: String(value), label: `1:${grouped(value)}` }))} onChange={(value) => setState((s) => setMap(s, { scale: Number(value) }))} />
            <Stepper label={l(say('Mapan (cm)', 'En el mapa (cm)', 'في الخريطة (سم)'))} value={cm} min={1} max={MAP_DISTANCE_MAX} onChange={(value) => setState((s) => setMap(s, { cm: value }))} language={props.language} />
        </>
    )
    const km = valueText(real.km)
    const m = valueText(real.m)
    const mText = groupedText(m.text)
    const latex = `${cm}\\cdot ${grouped(scale).replace(/ /g, '\\,')}=${grouped(real.cm).replace(/ /g, '\\,')}\\ \\text{cm}${m.exact ? '=' : '\\approx '}${mText.replace(',', '{,}').replace(/ /g, '\\,')}\\ \\text{m}`
    const note = l(say(`Errealitatean: ${groupedText(km.text)} km.`, `En la realidad: ${groupedText(km.text)} km.`, `في الواقع: ${groupedText(km.text).replace(',', '.')} كم.`))
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout language={props.language} latex={latex} note={note} />} challenges={mapChallenges} state={state}>
            <Board height={260} label={l(say('Mapa eta bi puntuen arteko distantzia', 'El mapa y la distancia entre dos puntos', 'الخريطة والمسافة بين نقطتين'))}>
                <rect x={30} y={40} width={580} height={190} rx={10} fill={MINT} stroke={INK} strokeWidth={2} />
                <path d="M30 150 C 150 110, 260 210, 400 160 S 560 110, 610 130" fill="none" stroke={STAGE} strokeWidth={6} strokeOpacity={0.4} />
                <line x1={P[0]} y1={P[1]} x2={Q[0]} y2={Q[1]} stroke={SECOND} strokeWidth={2.6} strokeDasharray="7 5" />
                <circle cx={P[0]} cy={P[1]} r={6} fill={SECOND} />
                <circle cx={Q[0]} cy={Q[1]} r={6} fill={SECOND} />
                <Tag x={(P[0] + Q[0]) / 2} y={(P[1] + Q[1]) / 2 - 14} color={SECOND}>{`${cm} cm`}</Tag>
                <Tag x={590} y={70} anchor="end" size={16}>{`1 : ${grouped(scale)}`}</Tag>
                <Tag x={590} y={215} anchor="end" size={18} color={STAGE}>{`${km.exact ? '' : '≈ '}${plain(props.language, km.text)} km`}</Tag>
            </Board>
        </ToolFrame>
    )
}

/* ---------- 7. Shadows ---------- */

export function ShadowsTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<ShadowsState>(initialShadowsState)
    const { stick, stickShadow, treeShadow } = state
    const tree = treeHeight(state)
    const treeValue = toNumber(tree)
    const ground = 270
    const k = Math.min(16, 230 / Math.max(treeValue, STICK_MAX), 400 / (treeShadow + 1))
    const stickK = 32
    const treeX = 230
    const half = (value: number) => plain(props.language, String(value).replace('.', ','))
    const controls = (
        <>
            <Stepper label={l(say('Makila (m)', 'Palo (m)', 'العصا (م)'))} value={stick} min={0.5} max={STICK_MAX} step={0.5} format={half} onChange={(value) => setState((s) => setShadows(s, { stick: value }))} language={props.language} />
            <Stepper label={l(say('Makilaren itzala (m)', 'Sombra del palo (m)', 'ظل العصا (م)'))} value={stickShadow} min={0.5} max={STICK_SHADOW_MAX} step={0.5} format={half} onChange={(value) => setState((s) => setShadows(s, { stickShadow: value }))} language={props.language} />
            <Stepper label={l(say('Zuhaitzaren itzala (m)', 'Sombra del árbol (m)', 'ظل الشجرة (م)'))} value={treeShadow} min={1} max={TREE_SHADOW_MAX} onChange={(value) => setState((s) => setShadows(s, { treeShadow: value }))} language={props.language} />
        </>
    )
    const latex = `x=\\frac{${String(stick).replace('.', '{,}')}\\cdot ${treeShadow}}{${String(stickShadow).replace('.', '{,}')}}${latexValue(tree)}`
    const shown = valueText(tree)
    const note = l(say(`Zuhaitzak ${shown.exact ? '' : '≈ '}${shown.text} m neurtzen ditu.`, `El árbol mide ${shown.exact ? '' : '≈ '}${shown.text} m.`, `طول الشجرة ${shown.exact ? '' : '≈ '}${shown.text.replace(',', '.')} م.`))
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout language={props.language} latex={latex} note={note} />} challenges={shadowsChallenges} state={state}>
            <Board height={300} label={l(say('Makila eta zuhaitza, beren itzalekin', 'El palo y el árbol con sus sombras', 'العصا والشجرة مع ظليهما'))}>
                <line x1={20} y1={ground} x2={620} y2={ground} stroke={MUTED} strokeWidth={2} />
                <line x1={60} y1={ground} x2={60} y2={ground - stick * stickK} stroke={INK} strokeWidth={5} strokeLinecap="round" />
                <line x1={60} y1={ground} x2={60 + stickShadow * stickK} y2={ground} stroke={MUTED} strokeWidth={8} />
                <line x1={60} y1={ground - stick * stickK} x2={60 + stickShadow * stickK} y2={ground} stroke={SECOND} strokeWidth={2} strokeDasharray="6 4" />
                <rect x={treeX - 4} y={ground - treeValue * k} width={8} height={treeValue * k} fill="#8a5a2b" />
                <circle cx={treeX} cy={ground - treeValue * k} r={Math.max(10, Math.min(40, treeValue * k * 0.25))} fill={MINT} stroke={GREEN} strokeWidth={2} fillOpacity={0.85} />
                <line x1={treeX} y1={ground} x2={treeX + treeShadow * k} y2={ground} stroke={MUTED} strokeWidth={8} />
                <line x1={treeX} y1={ground - treeValue * k} x2={treeX + treeShadow * k} y2={ground} stroke={SECOND} strokeWidth={2} strokeDasharray="6 4" />
                <Tag x={treeX + (treeShadow * k) / 2} y={ground + 22}>{`${treeShadow} m`}</Tag>
                <Tag x={treeX - 14} y={ground - (treeValue * k) / 2} anchor="end" color={SECOND}>{`${shown.exact ? '' : '≈ '}${plain(props.language, shown.text)} m`}</Tag>
            </Board>
        </ToolFrame>
    )
}
