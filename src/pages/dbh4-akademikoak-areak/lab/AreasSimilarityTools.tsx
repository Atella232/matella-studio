import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { toExactDecimal, type FractionValue } from '../../../features/unit-v2/math/fraction'
import {
    decimalText,
    FRUSTUM_HEIGHT_MAX,
    FRUSTUM_RADIUS_MAX,
    frustumApex,
    frustumChallenges,
    frustumHundredths,
    frustumThirds,
    hundredthsText,
    initialFrustumState,
    initialModelState,
    initialProjectionsState,
    initialSegmentState,
    MODEL_SCALES,
    MODEL_SIDE_MAX,
    modelChallenges,
    modelReal,
    PROJECTION_MAX,
    projectionLengths,
    projectionsChallenges,
    projectionSquares,
    SEGMENT_RADIUS_MAX,
    SEGMENT_STEP,
    segmentArea,
    segmentChallenges,
    segmentSector,
    segmentTriangle,
    setFrustum,
    setModel,
    setProjections,
    setSegment,
    type FrustumState,
    type ModelState,
    type ProjectionsState,
    type SegmentState
} from './labTools'

/* ==========================================================================
   The four new tools of the Azalerak, bolumenak eta antzekotasuna lab: the
   circular segment inside its sector, the right triangle cut by its
   altitude, the frustum of a cone with the small cone it lost, and a box
   model next to its real measures. Drawings are language-free; numbers in
   Arabic use the decimal point.
   ========================================================================== */

type Text = { eu: string; es: string; ar: string }
type Point = [number, number]

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const PAPER = '#fffcf6'
const SOFT = '#fbebc0'
const ROSE = '#f6d9d2'
const MINT = '#d6eddf'

const say = (eu: string, es: string, ar: string): Text => ({ eu, es, ar })
/** {,} in LaTeX becomes the point in Arabic */
const localLatex = (language: string, latex: string) => (language === 'ar' ? latex.replace(/\{,\}/g, '.') : latex)
/** A decimal with the comma, ready for LaTeX */
const tex = (decimal: string) => decimal.replace(',', '{,}')
/** A decimal with the comma for plain text, the point in Arabic */
const plain = (language: string, decimal: string) => (language === 'ar' ? decimal.replace(',', '.') : decimal)
const points = (list: Point[]) => list.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
const rad = (degrees: number) => (degrees * Math.PI) / 180
const sign = (exact: boolean) => (exact ? '=' : '≈')
const texSign = (exact: boolean) => (exact ? '=' : '\\approx ')
/** A fraction as a decimal when it ends, otherwise a/b */
const fractionText = (value: FractionValue) => toExactDecimal(value) ?? `${value.numerator}/${value.denominator}`

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

function Tag({ x, y, children, color = INK, size = 16, anchor = 'middle' }: { x: number; y: number; children: ReactNode; color?: string; size?: number; anchor?: 'start' | 'middle' | 'end' }) {
    return <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={700} fill={color}>{children}</text>
}

/* ---------- 1. The circular segment ---------- */

export function SegmentTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<SegmentState>(initialSegmentState)
    const { r, angle } = state
    const sector = segmentSector(state)
    const triangle = segmentTriangle(state)
    const segment = segmentArea(state)
    const O: Point = [200, 215]
    const R = 150
    // The sector stands symmetric about the vertical through the centre
    const A: Point = [O[0] + R * Math.cos(rad(90 - angle / 2)), O[1] - R * Math.sin(rad(90 - angle / 2))]
    const B: Point = [O[0] + R * Math.cos(rad(90 + angle / 2)), O[1] - R * Math.sin(rad(90 + angle / 2))]
    const controls = (
        <>
            <Stepper label={l(say('Erradioa (cm)', 'Radio (cm)', 'نصف القطر (سم)'))} value={r} min={1} max={SEGMENT_RADIUS_MAX} onChange={(value) => setState((s) => setSegment(s, { r: value }))} language={props.language} />
            <Stepper label={l(say('Angelua', 'Ángulo', 'الزاوية'))} value={angle} min={SEGMENT_STEP} max={180} step={SEGMENT_STEP} format={(value) => `${value}°`} onChange={(value) => setState((s) => setSegment(s, { angle: value }))} language={props.language} />
        </>
    )
    const s = (value: number) => tex(hundredthsText(value))
    const latex = `A=${s(sector.value)}-${s(triangle.value)}${texSign(segment.exact)}${s(segment.value)}`
    const note = l(say(
        `${angle}°-ko sektorea ken bi erradiok eta kordak osatzen duten triangelua.`,
        `El sector de ${angle}° menos el triángulo que forman los dos radios y la cuerda.`,
        `قطاع ${angle}° ناقص المثلث الذي يكوّنه نصفا القطر والوتر.`
    ))
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout language={props.language} latex={latex} note={note} />} challenges={segmentChallenges} state={state}>
            <Board height={330} label={l(say('Sektorea, triangelua eta segmentua', 'Sector, triángulo y segmento', 'القطاع والمثلث والقطعة'))}>
                {/* Only the upper half of the circle: the sector never goes below the centre */}
                <path d={`M${O[0] + R} ${O[1]} A${R} ${R} 0 0 0 ${O[0] - R} ${O[1]}`} fill="none" stroke={MUTED} strokeWidth={1.4} strokeDasharray="6 5" />
                <path d={`M${O[0]} ${O[1]} L${A[0]} ${A[1]} A${R} ${R} 0 0 0 ${B[0]} ${B[1]} Z`} fill={PAPER} stroke={INK} strokeWidth={2} />
                <path d={`M${A[0]} ${A[1]} A${R} ${R} 0 0 0 ${B[0]} ${B[1]} Z`} fill={SECOND} fillOpacity={0.35} stroke={SECOND} strokeWidth={2.6} />
                {angle < 180 && <polygon points={points([O, A, B])} fill={STAGE_TINT} stroke={STAGE} strokeWidth={2} strokeLinejoin="round" />}
                <circle cx={O[0]} cy={O[1]} r={4} fill={INK} />
                <Tag x={O[0]} y={O[1] + 26} size={15}>{`r = ${r} · ${angle}°`}</Tag>

                <Tag x={500} y={96} size={15} color={MUTED}>{l(say('Sektorea', 'Sector', 'القطاع'))}</Tag>
                <Tag x={500} y={122} size={18}>{`${sign(sector.exact)} ${plain(props.language, hundredthsText(sector.value))}`}</Tag>
                <Tag x={500} y={164} size={15} color={MUTED}>{l(say('Triangelua', 'Triángulo', 'المثلث'))}</Tag>
                <Tag x={500} y={190} size={18} color={STAGE}>{`${sign(triangle.exact)} ${plain(props.language, hundredthsText(triangle.value))}`}</Tag>
                <Tag x={500} y={232} size={15} color={MUTED}>{l(say('Segmentua', 'Segmento', 'القطعة'))}</Tag>
                <Tag x={500} y={258} size={20} color={SECOND}>{`${sign(segment.exact)} ${plain(props.language, hundredthsText(segment.value))}`}</Tag>
            </Board>
        </ToolFrame>
    )
}

/* ---------- 2. The projections of the legs ---------- */

export function ProjectionsTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<ProjectionsState>(initialProjectionsState)
    const { m, n } = state
    const squares = projectionSquares(state)
    const lengths = projectionLengths(state)
    const left = 40
    const width = 380
    const base = 250
    const scale = width / squares.a
    const foot = left + m * scale
    const top: Point = [foot, base - Math.sqrt(squares.h) * scale]
    const value = (length: { value: number; exact: boolean }) => `${sign(length.exact)} ${plain(props.language, hundredthsText(length.value))}`
    const controls = (
        <>
            <Stepper label={l(say('m proiekzioa', 'Proyección m', 'المسقط m'))} value={m} min={1} max={PROJECTION_MAX} onChange={(next) => setState((s) => setProjections(s, { m: next }))} language={props.language} />
            <Stepper label={l(say('n proiekzioa', 'Proyección n', 'المسقط n'))} value={n} min={1} max={PROJECTION_MAX} onChange={(next) => setState((s) => setProjections(s, { n: next }))} language={props.language} />
        </>
    )
    const latex = `h=\\sqrt{${m}\\cdot ${n}}${texSign(lengths.h.exact)}${tex(hundredthsText(lengths.h.value))}`
    const note = l(say(
        `a = ${squares.a}. Katetoak: b² = ${squares.a} · ${n} eta c² = ${squares.a} · ${m}.`,
        `a = ${squares.a}. Catetos: b² = ${squares.a} · ${n} y c² = ${squares.a} · ${m}.`,
        `a = ${squares.a}. الضلعان القائمان: b² = ${squares.a} · ${n} وc² = ${squares.a} · ${m}.`
    ))
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout language={props.language} latex={latex} note={note} />} challenges={projectionsChallenges} state={state}>
            <Board height={310} label={l(say('Triangelu angeluzuzena eta hipotenusarekiko altuera', 'El triángulo rectángulo y la altura sobre la hipotenusa', 'المثلث القائم والارتفاع على الوتر'))}>
                <polygon points={points([[left, base], [foot, base], top])} fill={SOFT} stroke="none" />
                <polygon points={points([[foot, base], [left + width, base], top])} fill={STAGE_TINT} stroke="none" />
                <polygon points={points([[left, base], [left + width, base], top])} fill="none" stroke={INK} strokeWidth={2.4} strokeLinejoin="round" />
                <line x1={top[0]} y1={top[1]} x2={foot} y2={base} stroke={SECOND} strokeWidth={2.6} strokeDasharray="7 5" />
                <polyline points={points([[foot + 10, base], [foot + 10, base - 10], [foot, base - 10]])} fill="none" stroke={INK} strokeWidth={1.6} />
                <Tag x={(left + foot) / 2} y={base + 24} color={GREEN} size={15}>{`m = ${m}`}</Tag>
                <Tag x={(foot + left + width) / 2} y={base + 24} color={GREEN} size={15}>{`n = ${n}`}</Tag>
                <Tag x={(left + left + width) / 2} y={base + 50} color={MUTED} size={15}>{`a = ${squares.a}`}</Tag>
                <Tag x={foot + 8} y={(top[1] + base) / 2 + 5} anchor="start" color={SECOND} size={15}>h</Tag>

                <Tag x={540} y={96} size={18} color={SECOND}>{`h ${value(lengths.h)}`}</Tag>
                <Tag x={540} y={146} size={18} color={STAGE}>{`b ${value(lengths.b)}`}</Tag>
                <Tag x={540} y={196} size={18}>{`c ${value(lengths.c)}`}</Tag>
            </Board>
        </ToolFrame>
    )
}

/* ---------- 3. The frustum of a cone ---------- */

export function FrustumTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<FrustumState>(initialFrustumState)
    const { R, r, h } = state
    const x = frustumApex(state)
    const xValue = x.numerator / x.denominator
    const thirds = frustumThirds(state)
    const volume = frustumHundredths(state)
    const s = Math.min(250 / (xValue + h), 140 / R)
    const cx = 190
    const base = 280
    const cut = base - h * s
    const apexY = cut - xValue * s
    const ry = (radius: number) => radius * s * 0.18
    const amount = thirds % 3 === 0 ? `${thirds / 3}\\pi` : `\\frac{${thirds}}{3}\\pi`
    const controls = (
        <>
            <Stepper label={l(say('Beheko erradioa R', 'Radio de abajo R', 'نصف القطر السفلي R'))} value={R} min={2} max={FRUSTUM_RADIUS_MAX} onChange={(value) => setState((current) => setFrustum(current, { R: value }))} language={props.language} />
            <Stepper label={l(say('Goiko erradioa r', 'Radio de arriba r', 'نصف القطر العلوي r'))} value={r} min={1} max={R - 1} onChange={(value) => setState((current) => setFrustum(current, { r: value }))} language={props.language} />
            <Stepper label={l(say('Altuera h', 'Altura h', 'الارتفاع h'))} value={h} min={1} max={FRUSTUM_HEIGHT_MAX} onChange={(value) => setState((current) => setFrustum(current, { h: value }))} language={props.language} />
        </>
    )
    const latex = `V=${amount}${texSign(volume.exact)}${tex(hundredthsText(volume.value))}`
    const xText = plain(props.language, fractionText(x))
    const note = l(say(
        `Kono txikiaren altuera: x = ${xText}. Kono handia ken txikia.`,
        `Altura del cono pequeño: x = ${xText}. Cono grande menos pequeño.`,
        `ارتفاع المخروط الصغير: x = ${xText}. المخروط الكبير ناقص الصغير.`
    ))
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout language={props.language} latex={latex} note={note} />} challenges={frustumChallenges} state={state}>
            <Board height={320} label={l(say('Kono-enborra eta moztutako kono txikia', 'El tronco de cono y el cono pequeño cortado', 'جذع المخروط والمخروط الصغير المقطوع'))}>
                <polygon points={points([[cx - r * s, cut], [cx, apexY], [cx + r * s, cut]])} fill={PAPER} stroke={MUTED} strokeWidth={1.6} strokeDasharray="6 5" />
                <path d={`M${cx - R * s} ${base} L${cx - r * s} ${cut} L${cx + r * s} ${cut} L${cx + R * s} ${base} A${R * s} ${ry(R)} 0 0 1 ${cx - R * s} ${base} Z`} fill={STAGE_TINT} stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
                <ellipse cx={cx} cy={cut} rx={r * s} ry={ry(r)} fill={SOFT} stroke={INK} strokeWidth={1.8} />
                <ellipse cx={cx} cy={base} rx={R * s} ry={ry(R)} fill="none" stroke={INK} strokeWidth={1.2} strokeDasharray="5 4" />
                <line x1={cx} y1={apexY} x2={cx} y2={base} stroke={SECOND} strokeWidth={2} strokeDasharray="6 4" />
                <Tag x={cx - 10} y={(cut + base) / 2 + 6} anchor="end" color={SECOND} size={15}>{`h = ${h}`}</Tag>
                {/* Left of the small cone's slanted side, which is r · s / 2 from the axis halfway up */}
                <Tag x={cx - (r * s) / 2 - 12} y={(apexY + cut) / 2 + 6} anchor="end" color={MUTED} size={15}>{`x = ${xText}`}</Tag>
                <Tag x={cx + R * s + 10} y={base + 6} anchor="start" color={GREEN} size={15}>{`R = ${R}`}</Tag>
                <Tag x={cx + r * s + 10} y={cut + 6} anchor="start" color={GREEN} size={15}>{`r = ${r}`}</Tag>

                <Tag x={520} y={110} size={15} color={MUTED}>{`π · ${h} · (${R}² + ${R} · ${r} + ${r}²) : 3`}</Tag>
                <Tag x={520} y={150} size={20} color={STAGE}>{`V ${sign(volume.exact)} ${plain(props.language, hundredthsText(volume.value))}`}</Tag>
            </Board>
        </ToolFrame>
    )
}

/* ---------- 4. A box model at a scale ---------- */

export function ModelTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<ModelState>(initialModelState)
    const { n, length, width, height } = state
    const real = modelReal(state)
    const d = (value: FractionValue) => plain(props.language, decimalText(value))
    // Oblique view: the depth goes up and to the right at half size
    const s = Math.min(230 / (length + 0.5 * width), 200 / (height + 0.4 * width))
    const dx = 0.5 * width * s * Math.cos(rad(35))
    const dy = 0.5 * width * s * Math.sin(rad(35)) + 0.2 * width * s
    const x0 = 50
    const y0 = 280
    const front: Point[] = [[x0, y0], [x0 + length * s, y0], [x0 + length * s, y0 - height * s], [x0, y0 - height * s]]
    const back = front.map(([x, y]) => [x + dx, y - dy] as Point)
    const controls = (
        <>
            <Segmented label={l(say('Eskala', 'Escala', 'المقياس'))} value={String(n)} options={MODEL_SCALES.map((value) => ({ value: String(value), label: `1:${value}` }))} onChange={(value) => setState((current) => setModel(current, { n: Number(value) }))} />
            <Stepper label={l(say('Luzera (cm)', 'Largo (cm)', 'الطول (سم)'))} value={length} min={1} max={MODEL_SIDE_MAX} onChange={(value) => setState((current) => setModel(current, { length: value }))} language={props.language} />
            <Stepper label={l(say('Zabalera (cm)', 'Ancho (cm)', 'العرض (سم)'))} value={width} min={1} max={MODEL_SIDE_MAX} onChange={(value) => setState((current) => setModel(current, { width: value }))} language={props.language} />
            <Stepper label={l(say('Altuera (cm)', 'Alto (cm)', 'الارتفاع (سم)'))} value={height} min={1} max={MODEL_SIDE_MAX} onChange={(value) => setState((current) => setModel(current, { height: value }))} language={props.language} />
        </>
    )
    const latex = `A=${tex(decimalText(real.floor))}\\ \\text{m}^{2}\\qquad V=${tex(decimalText(real.volume))}\\ \\text{m}^{3}`
    const note = l(say(
        `Errealitatean: ${d(real.length)} m × ${d(real.width)} m × ${d(real.height)} m.`,
        `En la realidad: ${d(real.length)} m × ${d(real.width)} m × ${d(real.height)} m.`,
        `في الواقع: ${d(real.length)} م × ${d(real.width)} م × ${d(real.height)} م.`
    ))
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout language={props.language} latex={latex} note={note} />} challenges={modelChallenges} state={state}>
            <Board height={320} label={l(say('Maketa eta haren neurri errealak', 'La maqueta y sus medidas reales', 'المجسّم وأبعاده الحقيقية'))}>
                <polygon points={points([front[3], front[2], back[2], back[3]])} fill={ROSE} stroke={INK} strokeWidth={2} strokeLinejoin="round" />
                <polygon points={points([front[1], back[1], back[2], front[2]])} fill={SOFT} stroke={INK} strokeWidth={2} strokeLinejoin="round" />
                <polygon points={points(front)} fill={MINT} stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
                <Tag x={x0 + (length * s) / 2} y={y0 + 24} size={15}>{`${length} cm`}</Tag>
                <Tag x={x0 - 8} y={y0 - (height * s) / 2 + 5} anchor="end" size={15}>{`${height}`}</Tag>
                <Tag x={front[1][0] + dx / 2 + 10} y={y0 - dy / 2 + 5} anchor="start" size={15}>{`${width}`}</Tag>

                <Tag x={530} y={70} size={18} color={STAGE}>{`1 : ${n}`}</Tag>
                <Tag x={530} y={116} size={15} color={MUTED}>{l(say('Oinplanoa', 'Planta', 'القاعدة'))}</Tag>
                <Tag x={530} y={142} size={18}>{`${d(real.floor)} m²`}</Tag>
                <Tag x={530} y={186} size={15} color={MUTED}>{l(say('Bolumena', 'Volumen', 'الحجم'))}</Tag>
                <Tag x={530} y={212} size={18} color={SECOND}>{`${d(real.volume)} m³`}</Tag>
            </Board>
        </ToolFrame>
    )
}
