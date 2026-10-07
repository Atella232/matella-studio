import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import {
    apothemHundredths,
    arcHundredths,
    ARC_STEP,
    CAPS,
    circleChallenges,
    circleHundredths,
    CIRCLE_RADIUS_MAX,
    COMPOUND_HEIGHT_MAX,
    COMPOUND_RADIUS_MAX,
    compoundChallenges,
    compoundHundredths,
    compoundIsEmpty,
    compoundThirds,
    CONE_HEIGHT_MAX,
    hundredthsText,
    initialCircleState,
    initialCompoundState,
    initialRegularState,
    partThirds,
    REGULAR_MAX,
    REGULAR_MIN,
    REGULAR_SIDE_MAX,
    regularAreaHundredths,
    regularChallenges,
    regularPerimeter,
    setCircle,
    setCompound,
    setRegular,
    type Cap,
    type CircleState,
    type CompoundState,
    type RegularState
} from './labTools'

/* ==========================================================================
   The three new tools of the Perimetroak, azalerak eta bolumenak lab: the
   circle with its arc (and both unrolled as bars), the regular polygon cut
   into triangles from its centre, and a compound solid seen from the front
   (a cylinder with a cone or a hemisphere at each end). Drawings are
   language-free; numbers in Arabic use the decimal point.
   ========================================================================== */

type Text = { eu: string; es: string; ar: string }
type Point = [number, number]

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
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

/* ---------- 1. The circle and its arcs ---------- */

export function ArcTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<CircleState>(initialCircleState)
    const { r, angle } = state
    const whole = circleHundredths(state)
    const arc = arcHundredths(state)
    const cx = 160
    const cy = 165
    const R = 120
    const end: Point = [cx + R * Math.cos(rad(angle)), cy - R * Math.sin(rad(angle))]
    const arcPath = angle === 360
        ? `M${cx + R} ${cy} A${R} ${R} 0 1 0 ${cx - R} ${cy} A${R} ${R} 0 1 0 ${cx + R} ${cy}`
        : `M${cx + R} ${cy} A${R} ${R} 0 ${angle > 180 ? 1 : 0} 0 ${end[0]} ${end[1]}`
    const sector = angle === 360 ? null : <path d={`M${cx} ${cy} L${cx + R} ${cy} A${R} ${R} 0 ${angle > 180 ? 1 : 0} 0 ${end[0]} ${end[1]} Z`} fill={SOFT} stroke="none" />
    // Bars: the longest circle (r = 20) fills 300 px
    const scale = 300 / circleHundredths({ r: CIRCLE_RADIUS_MAX, angle: 360 })
    const barX = 320
    const controls = (
        <>
            <Stepper label={l(say('Erradioa (cm)', 'Radio (cm)', 'نصف القطر (سم)'))} value={r} min={1} max={CIRCLE_RADIUS_MAX} onChange={(value) => setState((s) => setCircle(s, { r: value }))} language={props.language} />
            <Stepper label={l(say('Angelua', 'Ángulo', 'الزاوية'))} value={angle} min={ARC_STEP} max={360} step={ARC_STEP} format={(value) => `${value}°`} onChange={(value) => setState((s) => setCircle(s, { angle: value }))} language={props.language} />
        </>
    )
    const latex = `L=2\\cdot 3{,}14\\cdot ${r}=${tex(hundredthsText(whole))}\\qquad \\frac{${tex(hundredthsText(whole))}\\cdot ${angle}}{360}${arc.exact ? '=' : '\\approx '}${tex(hundredthsText(arc.value))}`
    const note = l(say(
        `${angle}°-ko arkua zirkunferentziaren ${angle}/360 da: ${hundredthsText(arc.value)} cm.`,
        `El arco de ${angle}° es ${angle}/360 de la circunferencia: ${hundredthsText(arc.value)} cm.`,
        `قوس ${angle}° هو ${angle}/360 من الدائرة: ${plain('ar', hundredthsText(arc.value))} سم.`
    ))
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout language={props.language} latex={latex} note={note} />} challenges={circleChallenges} state={state}>
            <Board height={330} label={l(say('Zirkunferentzia eta arkua', 'Circunferencia y arco', 'الدائرة والقوس'))}>
                <circle cx={cx} cy={cy} r={R} fill={PAPER} stroke={MUTED} strokeWidth={2} strokeDasharray={angle === 360 ? undefined : '6 5'} />
                {sector}
                <path d={arcPath} fill="none" stroke={SECOND} strokeWidth={6} strokeLinecap="round" />
                <line x1={cx} y1={cy} x2={cx + R} y2={cy} stroke={INK} strokeWidth={2.2} />
                {angle !== 360 && <line x1={cx} y1={cy} x2={end[0]} y2={end[1]} stroke={INK} strokeWidth={2.2} />}
                <circle cx={cx} cy={cy} r={4} fill={INK} />
                <Tag x={cx + R / 2} y={cy + 22}>{`r = ${r}`}</Tag>
                {angle !== 360 && <Tag x={cx + 34 * Math.cos(rad(angle / 2))} y={cy - 34 * Math.sin(rad(angle / 2)) + 5} size={14} color={SECOND}>{`${angle}°`}</Tag>}

                <Tag x={barX} y={104} anchor="start" size={14} color={MUTED}>{l(say('Zirkunferentzia', 'Circunferencia', 'الدائرة'))}</Tag>
                <rect x={barX} y={114} width={Math.max(2, whole * scale)} height={16} rx={4} fill={STAGE_TINT} stroke={STAGE} strokeWidth={1.6} />
                <Tag x={barX} y={152} anchor="start" size={15} color={STAGE}>{`${plain(props.language, hundredthsText(whole))} cm`}</Tag>
                <Tag x={barX} y={194} anchor="start" size={14} color={MUTED}>{l(say('Arkua', 'Arco', 'القوس'))}</Tag>
                <rect x={barX} y={204} width={Math.max(2, arc.value * scale)} height={16} rx={4} fill={SECOND} fillOpacity={0.3} stroke={SECOND} strokeWidth={1.6} />
                <Tag x={barX} y={242} anchor="start" size={15} color={SECOND}>{`${arc.exact ? '' : '≈ '}${plain(props.language, hundredthsText(arc.value))} cm`}</Tag>
            </Board>
        </ToolFrame>
    )
}

/* ---------- 2. The area of a regular polygon ---------- */

export function RegularTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<RegularState>(initialRegularState)
    const { n, side } = state
    const a = apothemHundredths(state)
    const area = regularAreaHundredths(state)
    const perimeter = regularPerimeter(state)
    const cx = 180
    const cy = 170
    const R = 130
    // Flat bottom side: vertices start half a central angle past the bottom
    const vertices: Point[] = Array.from({ length: n }, (_, index) => {
        const angle = 90 + 180 / n + (360 * index) / n
        return [cx + R * Math.cos(rad(angle)), cy + R * Math.sin(rad(angle))]
    })
    const foot: Point = [(vertices[n - 1][0] + vertices[0][0]) / 2, (vertices[n - 1][1] + vertices[0][1]) / 2]
    const controls = (
        <>
            <Stepper label={l(say('Alde kopurua', 'Número de lados', 'عدد الأضلاع'))} value={n} min={REGULAR_MIN} max={REGULAR_MAX} onChange={(value) => setState((s) => setRegular(s, { n: value }))} language={props.language} />
            <Stepper label={l(say('Aldea (cm)', 'Lado (cm)', 'الضلع (سم)'))} value={side} min={1} max={REGULAR_SIDE_MAX} onChange={(value) => setState((s) => setRegular(s, { side: value }))} language={props.language} />
        </>
    )
    const aText = tex(hundredthsText(a.value))
    const latex = `a${a.exact ? '=' : '\\approx '}${aText}\\qquad A=\\frac{${perimeter}\\cdot ${aText}}{2}${area.exact ? '=' : '\\approx '}${tex(hundredthsText(area.value))}`
    const note = l(say(
        `${n} triangelu berdin, bakoitza ${side} · a / 2. Perimetroa: ${perimeter} cm.`,
        `${n} triángulos iguales, cada uno ${side} · a / 2. Perímetro: ${perimeter} cm.`,
        `${n} مثلثات متطابقة، كل منها ${side} · a / 2. المحيط: ${perimeter} سم.`
    ))
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout language={props.language} latex={latex} note={note} />} challenges={regularChallenges} state={state}>
            <Board height={330} label={l(say('Poligono erregularra triangelutan', 'El polígono regular en triángulos', 'المضلع المنتظم مقسّمًا إلى مثلثات'))}>
                {vertices.map((vertex, index) => {
                    const next = vertices[(index + 1) % n]
                    return <polygon key={index} points={points([[cx, cy], vertex, next])} fill={index === n - 1 ? ROSE : index % 2 ? STAGE_TINT : PAPER} stroke={MUTED} strokeWidth={1.2} />
                })}
                <polygon points={points(vertices)} fill="none" stroke={INK} strokeWidth={2.6} strokeLinejoin="round" />
                <line x1={cx} y1={cy} x2={foot[0]} y2={foot[1]} stroke={SECOND} strokeWidth={3} />
                <circle cx={cx} cy={cy} r={4} fill={INK} />
                <Tag x={cx + 14} y={(cy + foot[1]) / 2 + 5} anchor="start" color={SECOND}>a</Tag>
                <Tag x={foot[0]} y={foot[1] + 24}>{`l = ${side}`}</Tag>

                <Tag x={470} y={110} size={18} color={SECOND}>{`a ${a.exact ? '=' : '≈'} ${plain(props.language, hundredthsText(a.value))}`}</Tag>
                <Tag x={470} y={160} size={18} color={STAGE}>{`P = ${n} · ${side} = ${perimeter}`}</Tag>
                <Tag x={470} y={210} size={18}>{`A ${area.exact && a.exact ? '=' : '≈'} ${plain(props.language, hundredthsText(area.value))}`}</Tag>
            </Board>
        </ToolFrame>
    )
}

/* ---------- 3. Compound solids ---------- */

const capNames: Record<Cap, Text> = {
    none: say('Ezer ez', 'Nada', 'لا شيء'),
    cone: say('Konoa', 'Cono', 'مخروط'),
    hemisphere: say('Esfera-erdia', 'Semiesfera', 'نصف كرة')
}

/** One part of the volume as LaTeX, in terms of π */
function partLatex(state: CompoundState, part: 'cylinder' | Cap): string {
    const { r, h, k } = state
    if (part === 'cylinder') return `\\pi\\cdot ${r}^{2}\\cdot ${h}`
    if (part === 'cone') return `\\frac{\\pi\\cdot ${r}^{2}\\cdot ${k}}{3}`
    return `\\frac{2\\pi\\cdot ${r}^{3}}{3}`
}

export function CompoundTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<CompoundState>(initialCompoundState)
    const { r, h, top, bottom, k } = state
    const capHeight = (cap: Cap) => (cap === 'cone' ? k : cap === 'hemisphere' ? r : 0)
    const total = h + capHeight(top) + capHeight(bottom)
    const s = total > 0 ? Math.min(220 / (2 * r), 270 / total) : 1
    const cx = 220
    const y0 = 165 - (total * s) / 2
    const yTop = y0 + capHeight(top) * s
    const yBottom = yTop + h * s
    const left = cx - r * s
    const right = cx + r * s
    const capShape = (cap: Cap, y: number, up: boolean) => {
        if (cap === 'cone') return <polygon points={points([[left, y], [right, y], [cx, up ? y - k * s : y + k * s]])} fill={SOFT} stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
        if (cap === 'hemisphere') return <path d={`M${left} ${y} A${r * s} ${r * s} 0 0 ${up ? 1 : 0} ${right} ${y} Z`} fill={ROSE} stroke={INK} strokeWidth={2.2} />
        return null
    }
    const parts: Array<'cylinder' | Cap> = [...(h > 0 ? ['cylinder' as const] : []), ...(top !== 'none' ? [top] : []), ...(bottom !== 'none' ? [bottom] : [])]
    const thirds = compoundThirds(state)
    const volume = compoundHundredths(state)
    const amount = thirds % 3 === 0 ? `${thirds / 3}\\pi` : `\\frac{${thirds}}{3}\\pi`
    const latex = compoundIsEmpty(state)
        ? 'V=0'
        : `V=${parts.map((part) => partLatex(state, part)).join('+')}=${amount}${volume.exact ? '=' : '\\approx '}${tex(hundredthsText(volume.value))}`
    const pieces = parts.map((part) => `${hundredthsText(Math.round((314 * partThirds(state, part)) / 3))}`).join(' + ')
    const note = compoundIsEmpty(state)
        ? l(say('Gehitu zilindro bat edo mutur bat.', 'Añade un cilindro o un extremo.', 'أضف أسطوانة أو طرفًا.'))
        : l(say(`Zatiak: ${pieces}. Guztira ${hundredthsText(volume.value)} cm³ = ${hundredthsText(volume.value)} mL.`, `Partes: ${pieces}. Total ${hundredthsText(volume.value)} cm³ = ${hundredthsText(volume.value)} mL.`, `الأجزاء: ${pieces.replace(/,/g, '.')}. المجموع ${plain('ar', hundredthsText(volume.value))} سم³ = ${plain('ar', hundredthsText(volume.value))} مل.`))
    const controls = (
        <>
            <Stepper label={l(say('Erradioa', 'Radio', 'نصف القطر'))} value={r} min={1} max={COMPOUND_RADIUS_MAX} onChange={(value) => setState((current) => setCompound(current, { r: value }))} language={props.language} />
            <Stepper label={l(say('Zilindroaren altuera', 'Altura del cilindro', 'ارتفاع الأسطوانة'))} value={h} min={0} max={COMPOUND_HEIGHT_MAX} onChange={(value) => setState((current) => setCompound(current, { h: value }))} language={props.language} />
            <Segmented label={l(say('Goian', 'Arriba', 'في الأعلى'))} value={top} options={CAPS.map((value) => ({ value, label: l(capNames[value]) }))} onChange={(value) => setState((current) => setCompound(current, { top: value }))} />
            <Segmented label={l(say('Behean', 'Abajo', 'في الأسفل'))} value={bottom} options={CAPS.map((value) => ({ value, label: l(capNames[value]) }))} onChange={(value) => setState((current) => setCompound(current, { bottom: value }))} />
            {(top === 'cone' || bottom === 'cone') && <Stepper label={l(say('Konoaren altuera', 'Altura del cono', 'ارتفاع المخروط'))} value={k} min={1} max={CONE_HEIGHT_MAX} onChange={(value) => setState((current) => setCompound(current, { k: value }))} language={props.language} />}
        </>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout language={props.language} latex={latex} note={note} />} challenges={compoundChallenges} state={state}>
            <Board height={330} label={l(say('Gorputz konposatua aurretik ikusita', 'El cuerpo compuesto visto de frente', 'الجسم المركّب من الأمام'))}>
                {compoundIsEmpty(state) ? (
                    <Tag x={320} y={170} size={18} color={MUTED}>V = 0</Tag>
                ) : (
                    <g>
                        {h > 0 && <rect x={left} y={yTop} width={right - left} height={yBottom - yTop} fill={MINT} stroke={INK} strokeWidth={2.2} />}
                        {capShape(top, yTop, true)}
                        {capShape(bottom, yBottom, false)}
                        {(h > 0 || top !== 'none') && <ellipse cx={cx} cy={yTop} rx={r * s} ry={Math.min(12, r * s * 0.2)} fill="none" stroke={INK} strokeWidth={1.3} strokeDasharray="5 4" />}
                        {h > 0 && bottom !== 'none' && <ellipse cx={cx} cy={yBottom} rx={r * s} ry={Math.min(12, r * s * 0.2)} fill="none" stroke={INK} strokeWidth={1.3} strokeDasharray="5 4" />}
                        <line x1={cx} y1={h > 0 ? yBottom : yTop} x2={right} y2={h > 0 ? yBottom : yTop} stroke={SECOND} strokeWidth={2.4} />
                        <Tag x={right + 10} y={(h > 0 ? yBottom : yTop) + 5} anchor="start" color={SECOND} size={15}>{`r = ${r}`}</Tag>
                        {h > 0 && <line x1={left - 16} y1={yTop} x2={left - 16} y2={yBottom} stroke={STAGE} strokeWidth={2.2} />}
                        {h > 0 && <Tag x={left - 24} y={(yTop + yBottom) / 2 + 5} anchor="end" color={STAGE} size={15}>{`h = ${h}`}</Tag>}
                        {(top === 'cone' || bottom === 'cone') && <Tag x={left - 24} y={top === 'cone' ? yTop - (k * s) / 2 + 5 : yBottom + (k * s) / 2 + 5} anchor="end" color={MUTED} size={15}>{`k = ${k}`}</Tag>}
                    </g>
                )}
                <Tag x={530} y={150} size={18}>{`V ${volume.exact ? '=' : '≈'}`}</Tag>
                <Tag x={530} y={182} size={20} color={STAGE}>{plain(props.language, hundredthsText(volume.value))}</Tag>
            </Board>
        </ToolFrame>
    )
}
