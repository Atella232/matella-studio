import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import { NumberField } from '../../../features/unit-v2/lab/NumberField'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { gcd, type FractionValue } from '../../../features/unit-v2/math/fraction'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { localize } from '../text'
import { decimalSeparatorFor } from '../../../utils/numberFormat'
import {
    AREA_LIMITS,
    areaAltitude,
    areaChallenges,
    arcOverPi,
    calculatorChallenges,
    calculatorDecimal,
    calculatorValues,
    CIRCLE_STEP,
    circleChallenges,
    circleValues,
    cosineRadicand,
    decimalText,
    DOUBLE_LIMITS,
    doubleChallenges,
    doubleSolution,
    ELEVATION_LIMITS,
    elevationChallenges,
    elevationHeight,
    elevationSight,
    fundamentalChallenges,
    fundamentalCosine,
    fundamentalValues,
    halfRootValue,
    hypotenuse,
    hypotenuseSquare,
    initialAreaState,
    initialCalculatorState,
    initialCircleState,
    initialDoubleState,
    initialElevationState,
    initialFundamentalState,
    initialNotableState,
    initialRadianState,
    initialRatiosState,
    initialTwoSidesState,
    LEG_MAX,
    minutesText,
    NOTABLE_ANGLES,
    NOTABLE_HYPOTENUSE_MAX,
    notableChallenges,
    notableLegRoots,
    piLatex,
    quadrant,
    RADIAN_RADIUS_MAX,
    radianChallenges,
    radiansOverPi,
    ratiosAngle,
    ratiosChallenges,
    ratiosExact,
    reducedAngle,
    rootLatex,
    setArea,
    setCalculator,
    setCircle,
    setDouble,
    setElevation,
    setFundamental,
    setNotable,
    setRadian,
    setRatios,
    setTwoSides,
    simplifyRoot,
    SINE_DENOMINATOR_MAX,
    triangleArea,
    TWO_SIDES_MAX,
    twoSidesChallenges,
    twoSidesSolution,
    type AreaState,
    type CalculatorState,
    type CircleState,
    type DoubleState,
    type ElevationState,
    type FundamentalState,
    type HalfRoot,
    type NotableAngle,
    type NotableState,
    type RadianState,
    type RatiosState,
    type TwoSidesMode,
    type TwoSidesState
} from './labTools'

/* ==========================================================================
   The ten tools of the Trigonometria lab. Drawings are language-free except
   for a few words; in the drawings Spanish writes «sen» and «tg», Basque
   «sin» and «tg», Arabic «sin» and «tan», and Arabic numbers carry the
   decimal point. Inside readouts \sen and \tg go through localize().
   ========================================================================== */

type Text = { eu: string; es: string; en: string; ar: string }
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
const SKY = '#e4eefb'

const say = (eu: string, es: string, ar: string, en: string): Text => ({ eu, es, en, ar })
const points = (list: Point[]) => list.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
const rad = (degrees: number) => (degrees * Math.PI) / 180
/** The point at a screen angle (0 = right, 90 = up) and distance r from c */
const polar = ([cx, cy]: Point, r: number, degrees: number): Point => [cx + r * Math.cos(rad(degrees)), cy - r * Math.sin(rad(degrees))]
/** A number for plain text: the point instead of the comma in Arabic and English */
const num = (language: UnitLanguage, text: string) => text.replace(/,/g, language === 'ar' ? '.' : decimalSeparatorFor(language))
/** A decimal for LaTeX: {,} for the comma, the point in Arabic */
const texNumber = (language: UnitLanguage, text: string) => text.replace(/,/g, language === 'ar' ? '.' : '{,}').replace(/−/g, '-')
const sen = (language: UnitLanguage) => (language === 'es' ? 'sen' : 'sin')
const tg = (language: UnitLanguage) => (language === 'ar' || language === 'en' ? 'tan' : 'tg')
/** a/b in LaTeX, written as a whole number when b is 1 */
const fracLatex = ({ numerator, denominator }: FractionValue) => (denominator === 1 ? String(numerator) : `${numerator < 0 ? '-' : ''}\\frac{${Math.abs(numerator)}}{${denominator}}`)

function Board({ height, label, children }: { height: number; label: string; children: ReactNode }) {
    return <svg viewBox={`0 0 640 ${height}`} direction="ltr" role="img" aria-label={label} style={{ width: '100%', height: 'auto', fontFamily: '"Atkinson Hyperlegible", "Noto Sans Arabic", system-ui, sans-serif' }}>{children}</svg>
}

function Readout({ language, latex, note }: { language: UnitLanguage; latex: string; note: string }) {
    return (
        <>
            {/* Each formula of the chain is its own piece, so the card wraps them on narrow screens */}
            <span className="fraction-v2-lab-readout-main"><MathText text={latex.split(/\\q?quad/).map((part) => `$${localize(language, part.trim())}$`).join(' ')} /></span>
            <span className="fraction-v2-lab-readout-note">{note}</span>
        </>
    )
}

function Tag({ x, y, children, color = INK, size = 16, anchor = 'middle' }: { x: number; y: number; children: ReactNode; color?: string; size?: number; anchor?: 'start' | 'middle' | 'end' }) {
    return <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={700} fill={color} direction="ltr">{children}</text>
}

/** A small right-angle mark at v, with legs along the unit directions u and w */
function RightMark({ v, u, w, s = 12 }: { v: Point; u: Point; w: Point; s?: number }) {
    const p1: Point = [v[0] + s * u[0], v[1] + s * u[1]]
    const p3: Point = [v[0] + s * w[0], v[1] + s * w[1]]
    const p2: Point = [p1[0] + s * w[0], p1[1] + s * w[1]]
    return <polyline points={points([p1, p2, p3])} fill="none" stroke={INK} strokeWidth={1.6} />
}

/** An arc marking the angle at v from screen angle `from` to `to` (counterclockwise) */
function AngleArc({ v, r, from, to, color = SECOND, filled = false }: { v: Point; r: number; from: number; to: number; color?: string; filled?: boolean }) {
    if (to - from <= 0) return null
    if (to - from >= 360) return <circle cx={v[0]} cy={v[1]} r={r} fill={filled ? color : 'none'} fillOpacity={filled ? 0.25 : undefined} stroke={color} strokeWidth={2} />
    const a = polar(v, r, from)
    const b = polar(v, r, to)
    const large = to - from > 180 ? 1 : 0
    const path = filled ? `M${v[0]} ${v[1]} L${a[0]} ${a[1]} A${r} ${r} 0 ${large} 0 ${b[0]} ${b[1]} Z` : `M${a[0]} ${a[1]} A${r} ${r} 0 ${large} 0 ${b[0]} ${b[1]}`
    return <path d={path} fill={filled ? color : 'none'} fillOpacity={filled ? 0.25 : undefined} stroke={color} strokeWidth={2} />
}

/** The three ratios in a column on the right of a board */
function RatioColumn({ language, x, y, sin, cos, tan, digits = 4 }: { language: UnitLanguage; x: number; y: number; sin: number; cos: number; tan: number | null; digits?: number }) {
    return (
        <g>
            <Tag x={x} y={y} size={18} color={SECOND}>{`${sen(language)} α ≈ ${num(language, decimalText(sin, digits))}`}</Tag>
            <Tag x={x} y={y + 40} size={18} color={GREEN}>{`cos α ≈ ${num(language, decimalText(cos, digits))}`}</Tag>
            <Tag x={x} y={y + 80} size={18}>{`${tg(language)} α ${tan === null ? '∄' : `≈ ${num(language, decimalText(tan, digits))}`}`}</Tag>
        </g>
    )
}

/* ---------- 1. From the legs to the ratios ---------- */

export function RatiosTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<RatiosState>(initialRatiosState)
    const { opposite, adjacent } = state
    const h = hypotenuse(state)
    const exact = ratiosExact(state)
    const angle = ratiosAngle(state)
    const s = Math.min(330 / adjacent, 220 / opposite)
    const A: Point = [50, 280]
    const C: Point = [A[0] + adjacent * s, 280]
    const B: Point = [C[0], 280 - opposite * s]
    const controls = (
        <>
            <Stepper label={l(say('Aurkako katetoa', 'Cateto opuesto', 'الضلع المقابل', 'Opposite side'))} value={opposite} min={1} max={LEG_MAX} onChange={(value) => setState((current) => setRatios(current, { opposite: value }))} language={props.language} />
            <Stepper label={l(say('Ondoko katetoa', 'Cateto contiguo', 'الضلع المجاور', 'Adjacent side'))} value={adjacent} min={1} max={LEG_MAX} onChange={(value) => setState((current) => setRatios(current, { adjacent: value }))} language={props.language} />
        </>
    )
    const hLatex = rootLatex(hypotenuseSquare(state))
    const ratio = (top: number, value: FractionValue | undefined) => (value ? fracLatex(value) : `\\frac{${top}}{${hLatex}}`)
    const latex = `\\sen\\alpha=${ratio(opposite, exact?.sin)}\\quad\\cos\\alpha=${ratio(adjacent, exact?.cos)}\\quad\\tg\\alpha=${fracLatex({ numerator: opposite, denominator: adjacent })}`
    const note = l(say(
        `Hipotenusa: √(${opposite}² + ${adjacent}²) = √${hypotenuseSquare(state)}. α ≈ ${minutesText(angle)}.`,
        `Hipotenusa: √(${opposite}² + ${adjacent}²) = √${hypotenuseSquare(state)}. α ≈ ${minutesText(angle)}.`,
        `الوتر: √(${opposite}² + ${adjacent}²) = √${hypotenuseSquare(state)}. α ≈ ${minutesText(angle)}.`, `Hypotenuse: √(${opposite}² + ${adjacent}²) = √${hypotenuseSquare(state)}. α ≈ ${minutesText(angle)}.`
    ))
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout language={props.language} latex={latex} note={note} />} challenges={ratiosChallenges} state={state}>
            <Board height={320} label={l(say('Bi katetoek zehaztutako triangelu angeluzuzena eta haren arrazoiak', 'El triángulo rectángulo determinado por sus dos catetos y sus razones', 'المثلث القائم المحدد بضلعيه القائمين ونسبه', 'The right-angled triangle defined by its two legs and its ratios'))}>
                <polygon points={points([A, C, B])} fill={STAGE_TINT} stroke={INK} strokeWidth={2} strokeLinejoin="round" />
                <line x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} stroke={STAGE} strokeWidth={4} />
                <line x1={C[0]} y1={C[1]} x2={B[0]} y2={B[1]} stroke={SECOND} strokeWidth={4} />
                <line x1={A[0]} y1={A[1]} x2={C[0]} y2={C[1]} stroke={GREEN} strokeWidth={4} />
                <RightMark v={C} u={[-1, 0]} w={[0, -1]} />
                <AngleArc v={A} r={34} from={0} to={angle} />
                <Tag x={A[0] + 48} y={A[1] - 8} size={15} color={SECOND} anchor="start">α</Tag>
                <Tag x={C[0] + 10} y={(B[1] + C[1]) / 2 + 6} anchor="start" color={SECOND}>{opposite}</Tag>
                <Tag x={(A[0] + C[0]) / 2} y={A[1] + 26} color={GREEN}>{adjacent}</Tag>
                <Tag x={(A[0] + B[0]) / 2 - 12} y={(A[1] + B[1]) / 2 - 8} anchor="end" color={STAGE}>{num(props.language, decimalText(h, Number.isInteger(Math.round(h * 1e9) / 1e9) ? 0 : 2))}</Tag>
                <RatioColumn language={props.language} x={530} y={110} sin={opposite / h} cos={adjacent / h} tan={opposite / adjacent} />
                <Tag x={530} y={250} size={15} color={MUTED}>{`α ≈ ${minutesText(angle)}`}</Tag>
            </Board>
        </ToolFrame>
    )
}

/* ---------- 2. The notable angles ---------- */

const notableExact: Record<NotableAngle, [string, string, string]> = {
    30: ['\\frac{1}{2}', '\\frac{\\sqrt{3}}{2}', '\\frac{\\sqrt{3}}{3}'],
    45: ['\\frac{\\sqrt{2}}{2}', '\\frac{\\sqrt{2}}{2}', '1'],
    60: ['\\frac{\\sqrt{3}}{2}', '\\frac{1}{2}', '\\sqrt{3}']
}

/** The leg h · √root / 2 as plain text: 3, 3√3, 5√2/2 */
function halfRootPlain(h: number, root: HalfRoot): string {
    const radical = root === 1 ? '' : `√${root}`
    if (h % 2 === 0) return root === 1 ? String(h / 2) : `${h / 2 === 1 ? '' : h / 2}${radical}`
    return `${h === 1 && root !== 1 ? '' : h}${radical}/2`
}

export function NotableTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<NotableState>(initialNotableState)
    const { angle, hypotenuse: h } = state
    const roots = notableLegRoots(angle)
    const L = 250
    const baseY = angle === 30 ? 160 : 285
    const A: Point = [60, baseY]
    const C: Point = [A[0] + L * Math.cos(rad(angle)), baseY]
    const B: Point = [C[0], baseY - L * Math.sin(rad(angle))]
    // The figure it is half of: the square for 45°, the equilateral triangle for 30° and 60°
    const whole: Point[] = angle === 45 ? [A, C, B, [A[0], B[1]]] : angle === 30 ? [A, B, [C[0], baseY + (baseY - B[1])]] : [A, [2 * C[0] - A[0], baseY], B]
    const controls = (
        <>
            <Segmented label={l(say('Angelua', 'Ángulo', 'الزاوية', 'Angle'))} value={String(angle)} options={NOTABLE_ANGLES.map((value) => ({ value: String(value), label: `${value}°` }))} onChange={(value) => setState((current) => setNotable(current, { angle: Number(value) as NotableAngle }))} />
            <Stepper label={l(say('Hipotenusa', 'Hipotenusa', 'الوتر', 'Hypotenuse'))} value={h} min={1} max={NOTABLE_HYPOTENUSE_MAX} onChange={(value) => setState((current) => setNotable(current, { hypotenuse: value }))} language={props.language} />
        </>
    )
    const [sinText, cosText, tanText] = notableExact[angle]
    const latex = `\\sen ${angle}^{\\circ}=${sinText}\\quad\\cos ${angle}^{\\circ}=${cosText}\\quad\\tg ${angle}^{\\circ}=${tanText}`
    const note = l(say(
        `Katetoak: ${halfRootPlain(h, roots.opposite)} eta ${halfRootPlain(h, roots.adjacent)} (≈ ${num(props.language, decimalText(halfRootValue(h, roots.opposite), 2))} eta ${num(props.language, decimalText(halfRootValue(h, roots.adjacent), 2))}).`,
        `Catetos: ${halfRootPlain(h, roots.opposite)} y ${halfRootPlain(h, roots.adjacent)} (≈ ${num(props.language, decimalText(halfRootValue(h, roots.opposite), 2))} y ${num(props.language, decimalText(halfRootValue(h, roots.adjacent), 2))}).`,
        `الضلعان القائمان: ${halfRootPlain(h, roots.opposite)} و${halfRootPlain(h, roots.adjacent)} (≈ ${num(props.language, decimalText(halfRootValue(h, roots.opposite), 2))} و${num(props.language, decimalText(halfRootValue(h, roots.adjacent), 2))}).`, `Legs: ${halfRootPlain(h, roots.opposite)} and ${halfRootPlain(h, roots.adjacent)} (≈ ${num(props.language, decimalText(halfRootValue(h, roots.opposite), 2))} and ${num(props.language, decimalText(halfRootValue(h, roots.adjacent), 2))}).`
    ))
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout language={props.language} latex={latex} note={note} />} challenges={notableChallenges} state={state}>
            <Board height={320} label={l(say('Angelu ospetsuen triangelua, karratu erdia edo triangelu aldeberdin erdia', 'El triángulo del ángulo notable, medio cuadrado o medio triángulo equilátero', 'مثلث الزاوية الشهيرة: نصف مربع أو نصف مثلث متساوي الأضلاع', 'The special-angle triangle: half a square or half an equilateral triangle'))}>
                <polygon points={points(whole)} fill={PAPER} stroke={MUTED} strokeWidth={1.6} strokeDasharray="6 5" strokeLinejoin="round" />
                <polygon points={points([A, C, B])} fill={STAGE_TINT} stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
                <line x1={C[0]} y1={C[1]} x2={B[0]} y2={B[1]} stroke={SECOND} strokeWidth={4} />
                <line x1={A[0]} y1={A[1]} x2={C[0]} y2={C[1]} stroke={GREEN} strokeWidth={4} />
                <RightMark v={C} u={[-1, 0]} w={[0, -1]} />
                <AngleArc v={A} r={36} from={0} to={angle} />
                <Tag x={A[0] + 50} y={A[1] - 8} size={15} color={SECOND} anchor="start">{`${angle}°`}</Tag>
                <Tag x={(A[0] + B[0]) / 2 - 12} y={(A[1] + B[1]) / 2 - 6} anchor="end" color={STAGE}>{String(h)}</Tag>
                <Tag x={C[0] + 10} y={(B[1] + C[1]) / 2 + 6} anchor="start" color={SECOND}>{halfRootPlain(h, roots.opposite)}</Tag>
                <Tag x={(A[0] + C[0]) / 2} y={A[1] + 24} color={GREEN}>{halfRootPlain(h, roots.adjacent)}</Tag>
                <Tag x={530} y={70} size={15} color={MUTED}>{l(angle === 45 ? say('Karratu erdia', 'Medio cuadrado', 'نصف مربع', 'Half a square') : say('Triangelu aldeberdin erdia', 'Medio triángulo equilátero', 'نصف مثلث متساوي الأضلاع', 'Half an equilateral triangle'))}</Tag>
                <RatioColumn language={props.language} x={530} y={120} sin={Math.sin(rad(angle))} cos={Math.cos(rad(angle))} tan={Math.tan(rad(angle))} />
            </Board>
        </ToolFrame>
    )
}

/* ---------- 3. From the sine to the others ---------- */

/** The cosine √(q² − p²) / q in LaTeX, simplified */
function cosineLatex(state: FundamentalState): string {
    const exact = fundamentalCosine(state)
    if (exact) return fracLatex(exact)
    const [outside, inside] = simplifyRoot(cosineRadicand(state))
    const common = gcd(outside, state.q)
    const k = outside / common
    const q = state.q / common
    const top = `${k === 1 ? '' : k}\\sqrt{${inside}}`
    return q === 1 ? top : `\\frac{${top}}{${q}}`
}

export function FundamentalTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<FundamentalState>(initialFundamentalState)
    const { p, q } = state
    const { sin, cos, tan, angle } = fundamentalValues(state)
    const O: Point = [60, 290]
    const R = 230
    const P = polar(O, R, angle)
    const barX = 360
    const barW = 250
    const controls = (
        <>
            <Stepper label={l(say('Sinuaren zenbakitzailea p', 'Numerador del seno p', 'بسط الجيب p', 'Numerator of the sine p'))} value={p} min={1} max={q - 1} onChange={(value) => setState((current) => setFundamental(current, { p: value }))} language={props.language} />
            <Stepper label={l(say('Sinuaren izendatzailea q', 'Denominador del seno q', 'مقام الجيب q', 'Denominator of the sine q'))} value={q} min={2} max={SINE_DENOMINATOR_MAX} onChange={(value) => setState((current) => setFundamental(current, { q: value }))} language={props.language} />
        </>
    )
    const latex = `\\sen\\alpha=\\frac{${p}}{${q}}\\quad\\cos\\alpha=\\sqrt{1-\\frac{${p * p}}{${q * q}}}=${cosineLatex(state)}`
    const note = l(say(
        `tg α = sin α : cos α ≈ ${decimalText(tan, 4)}. α ≈ ${minutesText(angle)}.`,
        `tg α = sen α : cos α ≈ ${decimalText(tan, 4)}. α ≈ ${minutesText(angle)}.`,
        `tan α = sin α : cos α ≈ ${decimalText(tan, 4).replace(',', '.')}. α ≈ ${minutesText(angle)}.`, `tan α = sin α : cos α ≈ ${num('en', decimalText(tan, 4))}. α ≈ ${minutesText(angle)}.`
    ))
    const sinShare = sin * sin
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout language={props.language} latex={latex} note={note} />} challenges={fundamentalChallenges} state={state}>
            <Board height={320} label={l(say('Erradio bateko zirkunferentzia-laurdena, sinua eta kosinua; sin² eta cos²-ren batura 1 da', 'Cuarto de circunferencia de radio 1 con el seno y el coseno; sen² y cos² suman 1', 'ربع دائرة نصف قطرها 1 مع الجيب وجيب التمام؛ مجموع sin² وcos² يساوي 1', 'Quarter of a circle of radius 1 with the sine and the cosine; sin² and cos² add up to 1'))}>
                <AngleArc v={O} r={R} from={0} to={90} color={MUTED} />
                <line x1={O[0]} y1={O[1]} x2={O[0] + R + 14} y2={O[1]} stroke={MUTED} strokeWidth={1.4} />
                <line x1={O[0]} y1={O[1]} x2={O[0]} y2={O[1] - R - 14} stroke={MUTED} strokeWidth={1.4} />
                <polygon points={points([O, [P[0], O[1]], P])} fill={STAGE_TINT} stroke="none" />
                <line x1={O[0]} y1={O[1]} x2={P[0]} y2={P[1]} stroke={STAGE} strokeWidth={3} />
                <line x1={P[0]} y1={P[1]} x2={P[0]} y2={O[1]} stroke={SECOND} strokeWidth={4} />
                <line x1={O[0]} y1={O[1]} x2={P[0]} y2={O[1]} stroke={GREEN} strokeWidth={4} />
                <circle cx={P[0]} cy={P[1]} r={5} fill={INK} />
                <AngleArc v={O} r={34} from={0} to={angle} />
                <Tag x={O[0] + 46} y={O[1] - 8} size={14} color={SECOND} anchor="start">α</Tag>
                <Tag x={(O[0] + P[0]) / 2 - 10} y={(O[1] + P[1]) / 2 - 6} anchor="end" color={STAGE} size={15}>1</Tag>
                <Tag x={P[0] + 14} y={(P[1] + O[1]) / 2 + 6} anchor="start" color={SECOND} size={15}>{`${p}/${q}`}</Tag>
                <Tag x={(O[0] + P[0]) / 2} y={O[1] + 22} color={GREEN} size={15}>{num(props.language, decimalText(cos, 3))}</Tag>

                <Tag x={barX + barW / 2} y={70} size={15} color={MUTED}>{`${sen(props.language)}² α + cos² α = 1`}</Tag>
                <rect x={barX} y={86} width={barW * sinShare} height={36} fill={ROSE} stroke={SECOND} strokeWidth={2} />
                <rect x={barX + barW * sinShare} y={86} width={barW * (1 - sinShare)} height={36} fill={SKY} stroke={GREEN} strokeWidth={2} />
                <Tag x={barX + (barW * sinShare) / 2} y={144} size={14} color={SECOND}>{`${p * p}/${q * q}`}</Tag>
                <Tag x={barX + barW * sinShare + (barW * (1 - sinShare)) / 2} y={144} size={14} color={GREEN}>{`${q * q - p * p}/${q * q}`}</Tag>
                <Tag x={barX + barW / 2} y={196} size={18} color={SECOND}>{`${sen(props.language)} α ≈ ${num(props.language, decimalText(sin, 4))}`}</Tag>
                <Tag x={barX + barW / 2} y={232} size={18} color={GREEN}>{`cos α ≈ ${num(props.language, decimalText(cos, 4))}`}</Tag>
                <Tag x={barX + barW / 2} y={268} size={18}>{`${tg(props.language)} α ≈ ${num(props.language, decimalText(tan, 4))}`}</Tag>
            </Board>
        </ToolFrame>
    )
}

/* ---------- 4. The calculator ---------- */

export function CalculatorTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<CalculatorState>(initialCalculatorState)
    const { degrees, minutes } = state
    const decimal = calculatorDecimal(state)
    const values = calculatorValues(state)
    const O: Point = [70, 270]
    const set = (patch: Partial<CalculatorState>) => setState((current) => setCalculator(current, patch))
    const controls = (
        <>
            <NumberField label={l(say('Graduak', 'Grados', 'الدرجات', 'Degrees'))} value={degrees} min={0} max={89} onChange={(value) => set({ degrees: value })} language={props.language} />
            <NumberField label={l(say('Minutuak', 'Minutos', 'الدقائق', 'Minutes'))} value={minutes} min={0} max={59} onChange={(value) => set({ minutes: value })} language={props.language} />
            <Stepper label={l(say('Minutuka', 'Minuto a minuto', 'دقيقة بدقيقة', 'Minute by minute'))} value={minutes} min={0} max={59} format={(value) => `${value}′`} onChange={(value) => set({ minutes: value })} language={props.language} />
        </>
    )
    // The calculator keys are always sin, cos and tan
    const screen = (y: number, key: string, value: number) => (
        <g>
            <Tag x={300} y={y} anchor="start" size={18} color={MUTED}>{`${key}(${degrees}° ${minutes}′)`}</Tag>
            <Tag x={600} y={y} anchor="end" size={20}>{num(props.language, decimalText(value, 4))}</Tag>
        </g>
    )
    const latex = `${degrees}^{\\circ}\\,${minutes}'=${degrees}+\\frac{${minutes}}{60}\\approx ${texNumber(props.language, decimalText(decimal, 4))}^{\\circ}`
    const note = l(say('Kalkulagailua DEG moduan. Arrazoitik angelura: SHIFT sin, SHIFT cos, SHIFT tan.', 'Calculadora en modo DEG. De la razón al ángulo: SHIFT sin, SHIFT cos, SHIFT tan.', 'الآلة الحاسبة بوضع DEG. من النسبة إلى الزاوية: SHIFT sin وSHIFT cos وSHIFT tan.', 'Calculator in DEG mode. From the ratio to the angle: SHIFT sin, SHIFT cos, SHIFT tan.'))
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout language={props.language} latex={latex} note={note} />} challenges={calculatorChallenges} state={state}>
            <Board height={320} label={l(say('Angelua gradu eta minututan eta kalkulagailuaren pantaila', 'El ángulo en grados y minutos y la pantalla de la calculadora', 'الزاوية بالدرجات والدقائق وشاشة الآلة الحاسبة', 'The angle in degrees and minutes, and the calculator screen'))}>
                <line x1={O[0]} y1={O[1]} x2={O[0] + 190} y2={O[1]} stroke={INK} strokeWidth={3} />
                <line x1={O[0]} y1={O[1]} x2={polar(O, 200, decimal)[0]} y2={polar(O, 200, decimal)[1]} stroke={STAGE} strokeWidth={3} />
                <AngleArc v={O} r={60} from={0} to={decimal} filled />
                <Tag x={O[0] + 74} y={O[1] - 14} size={15} color={SECOND} anchor="start">{`${degrees}° ${minutes}′`}</Tag>
                <rect x={282} y={56} width={336} height={220} rx={16} fill="#22303d" />
                <rect x={292} y={66} width={316} height={200} rx={10} fill="#dfe8d6" />
                <Tag x={600} y={98} anchor="end" size={15} color={MUTED}>DEG</Tag>
                <Tag x={300} y={130} anchor="start" size={18} color={MUTED}>{`${degrees}° ${minutes}′ =`}</Tag>
                <Tag x={600} y={130} anchor="end" size={20} color={STAGE}>{`${num(props.language, decimalText(decimal, 4))}°`}</Tag>
                {screen(176, 'sin', values.sin)}
                {screen(212, 'cos', values.cos)}
                {screen(248, 'tan', values.tan)}
            </Board>
        </ToolFrame>
    )
}

/* ---------- 5. Two sides known ---------- */

export function TwoSidesTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<TwoSidesState>(initialTwoSidesState)
    const { mode, a, b } = state
    const { alpha, beta, third } = twoSidesSolution(state)
    const adjacent = mode === 'legs' ? b : third
    const s = Math.min(320 / adjacent, 220 / a)
    const A: Point = [50, 280]
    const C: Point = [A[0] + adjacent * s, 280]
    const B: Point = [C[0], 280 - a * s]
    const set = (patch: Partial<TwoSidesState>) => setState((current) => setTwoSides(current, patch))
    const controls = (
        <>
            <Segmented label={l(say('Datuak', 'Datos', 'المعطيات', 'Data'))} value={mode} options={[{ value: 'legs' as TwoSidesMode, label: l(say('Bi katetoak', 'Dos catetos', 'ضلعان قائمان', 'Two legs')) }, { value: 'leg-hypotenuse' as TwoSidesMode, label: l(say('Katetoa eta hipotenusa', 'Cateto e hipotenusa', 'ضلع قائم ووتر', 'Leg and hypotenuse')) }]} onChange={(value) => set({ mode: value })} />
            <Stepper label={l(say('Aurkako katetoa a', 'Cateto opuesto a', 'الضلع المقابل a', 'Opposite side a'))} value={a} min={1} max={mode === 'legs' ? TWO_SIDES_MAX : TWO_SIDES_MAX - 1} onChange={(value) => set({ a: value })} language={props.language} />
            <Stepper label={l(mode === 'legs' ? say('Ondoko katetoa b', 'Cateto contiguo b', 'الضلع المجاور b', 'Adjacent side b') : say('Hipotenusa b', 'Hipotenusa b', 'الوتر b', 'Hypotenuse b'))} value={b} min={mode === 'legs' ? 1 : a + 1} max={TWO_SIDES_MAX} onChange={(value) => set({ b: value })} language={props.language} />
        </>
    )
    const thirdText = Number.isInteger(Math.round(third * 1e9) / 1e9) ? String(Math.round(third)) : num(props.language, decimalText(third, 2))
    const latex = mode === 'legs'
        ? `\\tg\\alpha=\\frac{${a}}{${b}}\\ \\Rightarrow\\ \\alpha\\approx ${texNumber(props.language, decimalText(alpha, 2))}^{\\circ}`
        : `\\sen\\alpha=\\frac{${a}}{${b}}\\ \\Rightarrow\\ \\alpha\\approx ${texNumber(props.language, decimalText(alpha, 2))}^{\\circ}`
    const note = l(say(
        `β = 90° − α ≈ ${minutesText(beta)}. Hirugarren aldea, Pitagorasekin: ${thirdText}.`,
        `β = 90° − α ≈ ${minutesText(beta)}. Tercer lado, con Pitágoras: ${thirdText}.`,
        `β = 90° − α ≈ ${minutesText(beta)}. الضلع الثالث بفيثاغورس: ${thirdText}.`, `β = 90° − α ≈ ${minutesText(beta)}. Third side, using Pythagoras: ${thirdText}.`
    ))
    const given = { stroke: INK, strokeWidth: 4.5 }
    const found = { stroke: STAGE, strokeWidth: 3, strokeDasharray: '8 6' }
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout language={props.language} latex={latex} note={note} />} challenges={twoSidesChallenges} state={state}>
            <Board height={320} label={l(say('Bi alde ezagunak dituen triangelu angeluzuzena', 'El triángulo rectángulo con dos lados conocidos', 'المثلث القائم المعلوم منه ضلعان', 'The right-angled triangle with two known sides'))}>
                <polygon points={points([A, C, B])} fill={SOFT} stroke="none" />
                <line x1={C[0]} y1={C[1]} x2={B[0]} y2={B[1]} {...given} />
                <line x1={A[0]} y1={A[1]} x2={C[0]} y2={C[1]} {...(mode === 'legs' ? given : found)} />
                <line x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} {...(mode === 'legs' ? found : given)} />
                <RightMark v={C} u={[-1, 0]} w={[0, -1]} />
                <AngleArc v={A} r={34} from={0} to={alpha} />
                <AngleArc v={B} r={28} from={270 - beta} to={270} color={GREEN} />
                <Tag x={A[0] + 46} y={A[1] - 8} size={15} color={SECOND} anchor="start">α</Tag>
                <Tag x={B[0] - 14} y={B[1] + 48} size={15} color={GREEN} anchor="end">β</Tag>
                <Tag x={C[0] + 10} y={(B[1] + C[1]) / 2 + 6} anchor="start">{`a = ${a}`}</Tag>
                <Tag x={(A[0] + C[0]) / 2} y={A[1] + 26} color={mode === 'legs' ? INK : STAGE}>{mode === 'legs' ? `b = ${b}` : thirdText}</Tag>
                <Tag x={(A[0] + B[0]) / 2 - 12} y={(A[1] + B[1]) / 2 - 8} anchor="end" color={mode === 'legs' ? STAGE : INK}>{mode === 'legs' ? thirdText : `b = ${b}`}</Tag>
                <Tag x={540} y={110} size={20} color={SECOND}>{`α ≈ ${minutesText(alpha)}`}</Tag>
                <Tag x={540} y={160} size={20} color={GREEN}>{`β ≈ ${minutesText(beta)}`}</Tag>
                <Tag x={540} y={210} size={18} color={STAGE}>{`${l(mode === 'legs' ? say('hipotenusa', 'hipotenusa', 'الوتر', 'hypotenuse') : say('katetoa', 'cateto', 'الضلع', 'leg'))} ${thirdText}`}</Tag>
            </Board>
        </ToolFrame>
    )
}

/* ---------- 6. The angle of elevation ---------- */

export function ElevationTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<ElevationState>(initialElevationState)
    const { distance, angle } = state
    const height = elevationHeight(state)
    const sight = elevationSight(state)
    const tangent = Math.tan(rad(angle))
    const W = Math.min(330, 230 / tangent)
    const ground = 290
    const eye: Point = [60, ground]
    const foot: Point = [eye[0] + W, ground]
    const top: Point = [foot[0], ground - W * tangent]
    const set = (patch: Partial<ElevationState>) => setState((current) => setElevation(current, patch))
    const controls = (
        <>
            <Stepper label={l(say('Distantzia (m)', 'Distancia (m)', 'المسافة (م)', 'Distance (m)'))} value={distance} min={ELEVATION_LIMITS.distance.min} max={ELEVATION_LIMITS.distance.max} step={ELEVATION_LIMITS.distance.step} onChange={(value) => set({ distance: value })} language={props.language} />
            <Stepper label={l(say('Goratze-angelua', 'Ángulo de elevación', 'زاوية الارتفاع', 'Angle of elevation'))} value={angle} min={ELEVATION_LIMITS.angle.min} max={ELEVATION_LIMITS.angle.max} step={ELEVATION_LIMITS.angle.step} format={(value) => `${value}°`} onChange={(value) => set({ angle: value })} language={props.language} />
        </>
    )
    const latex = `h=${distance}\\cdot\\tg ${angle}^{\\circ}\\approx ${texNumber(props.language, decimalText(height, 2))}\\ \\text{m}`
    const note = l(say(
        `Bisuala: ${distance} : cos ${angle}° ≈ ${decimalText(sight, 2)} m.`,
        `La visual: ${distance} : cos ${angle}° ≈ ${decimalText(sight, 2)} m.`,
        `خط النظر: ${distance} : cos ${angle}° ≈ ${decimalText(sight, 2).replace(',', '.')} م.`, `The line of sight: ${distance} : cos ${angle}° ≈ ${num('en', decimalText(sight, 2))} m.`
    ))
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout language={props.language} latex={latex} note={note} />} challenges={elevationChallenges} state={state}>
            <Board height={320} label={l(say('Behatzailea, dorrea eta goratze-angelua', 'El observador, la torre y el ángulo de elevación', 'الراصد والبرج وزاوية الارتفاع', 'The observer, the tower and the angle of elevation'))}>
                <line x1={20} y1={ground} x2={460} y2={ground} stroke={INK} strokeWidth={2} />
                <rect x={foot[0] - 7} y={top[1]} width={14} height={ground - top[1]} fill={ROSE} stroke={SECOND} strokeWidth={2} />
                <line x1={eye[0]} y1={eye[1]} x2={top[0]} y2={top[1]} stroke={STAGE} strokeWidth={2.4} strokeDasharray="8 6" />
                <circle cx={eye[0]} cy={eye[1]} r={6} fill={INK} />
                <AngleArc v={eye} r={44} from={0} to={angle} />
                <Tag x={eye[0] + 54} y={eye[1] - 10} size={14} color={SECOND} anchor="start">{`${angle}°`}</Tag>
                <Tag x={(eye[0] + foot[0]) / 2} y={ground + 24} size={15} color={GREEN}>{`${distance} m`}</Tag>
                <Tag x={foot[0] + 14} y={(top[1] + ground) / 2 + 6} anchor="start" size={15} color={SECOND}>h</Tag>
                <Tag x={550} y={110} size={15} color={MUTED}>{l(say('Altuera', 'Altura', 'الارتفاع', 'Height'))}</Tag>
                <Tag x={550} y={140} size={22} color={SECOND}>{`≈ ${num(props.language, decimalText(height, 2))} m`}</Tag>
                <Tag x={550} y={190} size={15} color={MUTED}>{l(say('Bisuala', 'Visual', 'خط النظر', 'Line of sight'))}</Tag>
                <Tag x={550} y={220} size={20} color={STAGE}>{`≈ ${num(props.language, decimalText(sight, 2))} m`}</Tag>
            </Board>
        </ToolFrame>
    )
}

/* ---------- 7. The double observation ---------- */

export function DoubleTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<DoubleState>(initialDoubleState)
    const { d, far, near } = state
    const { x, h } = doubleSolution(state)
    const s = Math.min(400 / (d + x), 220 / h)
    const ground = 290
    const A: Point = [40, ground]
    const B: Point = [A[0] + d * s, ground]
    const P: Point = [B[0] + x * s, ground]
    const T: Point = [P[0], ground - h * s]
    const set = (patch: Partial<DoubleState>) => setState((current) => setDouble(current, patch))
    const controls = (
        <>
            <Stepper label={l(say('Bi puntuen arteko distantzia d (m)', 'Distancia entre los dos puntos d (m)', 'المسافة بين النقطتين d (م)', 'Distance between the two points d (m)'))} value={d} min={DOUBLE_LIMITS.d.min} max={DOUBLE_LIMITS.d.max} step={DOUBLE_LIMITS.d.step} onChange={(value) => set({ d: value })} language={props.language} />
            <Stepper label={l(say('Urruneko angelua α', 'Ángulo lejano α', 'الزاوية البعيدة α', 'Far angle α'))} value={far} min={DOUBLE_LIMITS.far.min} max={DOUBLE_LIMITS.far.max} step={DOUBLE_LIMITS.step} format={(value) => `${value}°`} onChange={(value) => set({ far: value })} language={props.language} />
            <Stepper label={l(say('Hurbileko angelua β', 'Ángulo cercano β', 'الزاوية القريبة β', 'Near angle β'))} value={near} min={DOUBLE_LIMITS.near.min} max={DOUBLE_LIMITS.near.max} step={DOUBLE_LIMITS.step} format={(value) => `${value}°`} onChange={(value) => set({ near: value })} language={props.language} />
        </>
    )
    const latex = `\\begin{cases}h=x\\cdot\\tg ${near}^{\\circ}\\\\ h=(${d}+x)\\cdot\\tg ${far}^{\\circ}\\end{cases}`
    const note = l(say(
        `x ≈ ${decimalText(x, 2)} m eta h ≈ ${decimalText(h, 2)} m.`,
        `x ≈ ${decimalText(x, 2)} m y h ≈ ${decimalText(h, 2)} m.`,
        `x ≈ ${decimalText(x, 2).replace(',', '.')} م وh ≈ ${decimalText(h, 2).replace(',', '.')} م.`, `x ≈ ${num('en', decimalText(x, 2))} m and h ≈ ${num('en', decimalText(h, 2))} m.`
    ))
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout language={props.language} latex={latex} note={note} />} challenges={doubleChallenges} state={state}>
            <Board height={350} label={l(say('Bi puntutatik neurtutako dorrea', 'La torre medida desde dos puntos', 'البرج مقيسًا من نقطتين', 'The tower measured from two points'))}>
                <line x1={20} y1={ground} x2={470} y2={ground} stroke={INK} strokeWidth={2} />
                <rect x={P[0] - 6} y={T[1]} width={12} height={ground - T[1]} fill={ROSE} stroke={SECOND} strokeWidth={2} />
                <line x1={A[0]} y1={A[1]} x2={T[0]} y2={T[1]} stroke={MUTED} strokeWidth={2} strokeDasharray="7 5" />
                <line x1={B[0]} y1={B[1]} x2={T[0]} y2={T[1]} stroke={STAGE} strokeWidth={2.2} strokeDasharray="7 5" />
                <circle cx={A[0]} cy={A[1]} r={5} fill={INK} />
                <circle cx={B[0]} cy={B[1]} r={5} fill={INK} />
                <AngleArc v={A} r={40} from={0} to={far} color={MUTED} />
                <AngleArc v={B} r={30} from={0} to={near} />
                <Tag x={A[0] + 4} y={ground + 22} size={14}>A</Tag>
                <Tag x={B[0]} y={ground + 22} size={14}>B</Tag>
                <Tag x={A[0] + 46} y={A[1] - 6} size={13} color={MUTED} anchor="start">{`${far}°`}</Tag>
                <Tag x={B[0] + 36} y={B[1] - 6} size={13} color={SECOND} anchor="start">{`${near}°`}</Tag>
                <Tag x={(A[0] + B[0]) / 2} y={ground + 44} size={14} color={GREEN}>{`d = ${d}`}</Tag>
                <Tag x={(B[0] + P[0]) / 2} y={ground + 44} size={14} color={STAGE}>x</Tag>
                <Tag x={P[0] + 12} y={(T[1] + ground) / 2 + 6} anchor="start" size={15} color={SECOND}>h</Tag>
                <Tag x={560} y={120} size={20} color={STAGE}>{`x ≈ ${num(props.language, decimalText(x, 2))} m`}</Tag>
                <Tag x={560} y={170} size={22} color={SECOND}>{`h ≈ ${num(props.language, decimalText(h, 2))} m`}</Tag>
            </Board>
        </ToolFrame>
    )
}

/* ---------- 8. The area ½ · b · c · sen A ---------- */

export function AreaTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<AreaState>(initialAreaState)
    const { b, c, angle } = state
    const altitude = areaAltitude(state)
    const area = triangleArea(state)
    const footX = c * Math.cos(rad(angle))
    const xMin = Math.min(0, footX)
    const xMax = Math.max(b, footX)
    const s = Math.min(380 / (xMax - xMin), 210 / altitude)
    const base = 270
    const A: Point = [40 - xMin * s, base]
    const C: Point = [A[0] + b * s, base]
    const B: Point = [A[0] + footX * s, base - altitude * s]
    const H: Point = [B[0], base]
    const set = (patch: Partial<AreaState>) => setState((current) => setArea(current, patch))
    const controls = (
        <>
            <Stepper label={l(say('b aldea', 'Lado b', 'الضلع b', 'Side b'))} value={b} min={AREA_LIMITS.side.min} max={AREA_LIMITS.side.max} onChange={(value) => set({ b: value })} language={props.language} />
            <Stepper label={l(say('c aldea', 'Lado c', 'الضلع c', 'Side c'))} value={c} min={AREA_LIMITS.side.min} max={AREA_LIMITS.side.max} onChange={(value) => set({ c: value })} language={props.language} />
            <Stepper label={l(say('A angelua', 'Ángulo A', 'الزاوية A', 'Angle A'))} value={angle} min={AREA_LIMITS.angle.min} max={AREA_LIMITS.angle.max} step={AREA_LIMITS.angle.step} format={(value) => `${value}°`} onChange={(value) => set({ angle: value })} language={props.language} />
        </>
    )
    const latex = `S=\\frac{1}{2}\\cdot ${b}\\cdot ${c}\\cdot\\sen ${angle}^{\\circ}\\approx ${texNumber(props.language, decimalText(area, 2))}`
    const note = l(say(
        `Altuera: h = ${c} · sin ${angle}° ≈ ${decimalText(altitude, 2)}.`,
        `Altura: h = ${c} · sen ${angle}° ≈ ${decimalText(altitude, 2)}.`,
        `الارتفاع: h = ${c} · sin ${angle}° ≈ ${decimalText(altitude, 2).replace(',', '.')}.`, `Height: h = ${c} · sin ${angle}° ≈ ${num('en', decimalText(altitude, 2))}.`
    ))
    const outside = footX < 0 || footX > b
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout language={props.language} latex={latex} note={note} />} challenges={areaChallenges} state={state}>
            <Board height={320} label={l(say('Bi alde, haien arteko angelua eta altuera dituen triangelua', 'El triángulo con dos lados, el ángulo que forman y su altura', 'المثلث بضلعين والزاوية بينهما وارتفاعه', 'The triangle with two sides, the angle they form and its height'))}>
                {outside && <line x1={Math.min(A[0], H[0])} y1={base} x2={Math.max(C[0], H[0])} y2={base} stroke={MUTED} strokeWidth={1.4} strokeDasharray="5 5" />}
                <polygon points={points([A, C, B])} fill={STAGE_TINT} stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
                <line x1={A[0]} y1={A[1]} x2={C[0]} y2={C[1]} stroke={GREEN} strokeWidth={4} />
                <line x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} stroke={STAGE} strokeWidth={4} />
                <line x1={B[0]} y1={B[1]} x2={H[0]} y2={H[1]} stroke={SECOND} strokeWidth={2.4} strokeDasharray="7 5" />
                <RightMark v={H} u={[footX > b ? -1 : 1, 0]} w={[0, -1]} s={10} />
                <AngleArc v={A} r={30} from={0} to={angle} />
                <Tag x={A[0] - 8} y={A[1] + 20} size={14}>A</Tag>
                <Tag x={C[0] + 8} y={C[1] + 20} size={14}>C</Tag>
                <Tag x={B[0]} y={B[1] - 10} size={14}>B</Tag>
                <Tag x={(A[0] + C[0]) / 2} y={base + 26} size={15} color={GREEN}>{`b = ${b}`}</Tag>
                <Tag x={(A[0] + B[0]) / 2 - 10} y={(A[1] + B[1]) / 2} anchor="end" size={15} color={STAGE}>{`c = ${c}`}</Tag>
                <Tag x={B[0] + 8} y={(B[1] + base) / 2 + 6} anchor="start" size={15} color={SECOND}>h</Tag>
                <Tag x={560} y={110} size={15} color={MUTED}>{l(say('Altuera', 'Altura', 'الارتفاع', 'Height'))}</Tag>
                <Tag x={560} y={138} size={20} color={SECOND}>{`h ≈ ${num(props.language, decimalText(altitude, 2))}`}</Tag>
                <Tag x={560} y={186} size={15} color={MUTED}>{l(say('Azalera', 'Área', 'المساحة', 'Area'))}</Tag>
                <Tag x={560} y={216} size={22}>{`≈ ${num(props.language, decimalText(area, 2))}`}</Tag>
            </Board>
        </ToolFrame>
    )
}

/* ---------- 9. The unit circle ---------- */

const quadrantNames: Record<1 | 2 | 3 | 4, Text> = {
    1: say('I. koadrantea', 'I cuadrante', 'الربع الأول', 'First quadrant'),
    2: say('II. koadrantea', 'II cuadrante', 'الربع الثاني', 'Second quadrant'),
    3: say('III. koadrantea', 'III cuadrante', 'الربع الثالث', 'Third quadrant'),
    4: say('IV. koadrantea', 'IV cuadrante', 'الربع الرابع', 'Fourth quadrant')
}

export function CircleTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<CircleState>(initialCircleState)
    const { angle } = state
    const { sin, cos, tan } = circleValues(angle)
    const { reduced, relation } = reducedAngle(angle)
    const zone = quadrant(angle)
    const O: Point = [200, 160]
    const R = 120
    const P = polar(O, R, angle)
    const Q = polar(O, R, reduced)
    const controls = (
        <Stepper label={l(say('Angelua', 'Ángulo', 'الزاوية', 'Angle'))} value={angle} min={0} max={360} step={CIRCLE_STEP} format={(value) => `${value}°`} onChange={(value) => setState((current) => setCircle(current, { angle: value }))} language={props.language} />
    )
    const relationText = relation === 'same' ? `${angle}°` : relation === '180-a' ? `180° − ${reduced}°` : relation === '180+a' ? `180° + ${reduced}°` : `360° − ${reduced}°`
    const sign = (value: number) => (value > 0 ? '' : value < 0 ? '-' : '')
    const latex = relation === 'same' || reduced === 0 || reduced === 90
        ? `\\sen ${angle}^{\\circ}\\approx ${texNumber(props.language, decimalText(sin, 4))}\\quad\\cos ${angle}^{\\circ}\\approx ${texNumber(props.language, decimalText(cos, 4))}`
        : `\\sen ${angle}^{\\circ}=${sign(sin)}\\sen ${reduced}^{\\circ}\\quad\\cos ${angle}^{\\circ}=${sign(cos)}\\cos ${reduced}^{\\circ}`
    const note = `${zone ? l(quadrantNames[zone]) : l(say('Ardatz baten gainean', 'Sobre un eje', 'على محور', 'On an axis'))}${relation === 'same' ? '' : ` · ${angle}° = ${relationText}`}`
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout language={props.language} latex={latex} note={note} />} challenges={circleChallenges} state={state}>
            <Board height={320} label={l(say('Zirkunferentzia goniometrikoa, angeluaren puntua eta haren kosinua eta sinua', 'La circunferencia goniométrica con el punto del ángulo, su coseno y su seno', 'الدائرة المثلثية مع نقطة الزاوية وجيب تمامها وجيبها', 'The unit circle with the point of the angle, its cosine and its sine'))}>
                <line x1={O[0] - R - 30} y1={O[1]} x2={O[0] + R + 30} y2={O[1]} stroke={MUTED} strokeWidth={1.4} />
                <line x1={O[0]} y1={O[1] - R - 20} x2={O[0]} y2={O[1] + R + 20} stroke={MUTED} strokeWidth={1.4} />
                <circle cx={O[0]} cy={O[1]} r={R} fill="none" stroke={INK} strokeWidth={2} />
                {relation !== 'same' && reduced > 0 && reduced < 90 && (
                    <g>
                        <line x1={O[0]} y1={O[1]} x2={Q[0]} y2={Q[1]} stroke={MUTED} strokeWidth={1.6} strokeDasharray="6 5" />
                        <circle cx={Q[0]} cy={Q[1]} r={4} fill="none" stroke={MUTED} strokeWidth={2} />
                        <Tag x={Q[0] + 8} y={Q[1] - 8} anchor="start" size={13} color={MUTED}>{`${reduced}°`}</Tag>
                    </g>
                )}
                <AngleArc v={O} r={30} from={0} to={angle} filled />
                <line x1={P[0]} y1={P[1]} x2={P[0]} y2={O[1]} stroke={SECOND} strokeWidth={4} />
                <line x1={O[0]} y1={O[1]} x2={P[0]} y2={O[1]} stroke={GREEN} strokeWidth={4} />
                <line x1={O[0]} y1={O[1]} x2={P[0]} y2={P[1]} stroke={INK} strokeWidth={2} />
                <circle cx={P[0]} cy={P[1]} r={6} fill={INK} />
                <Tag x={O[0] + R + 8} y={O[1] - 8} anchor="start" size={13} color={MUTED}>1</Tag>
                {relation !== 'same' && <Tag x={530} y={70} size={16} color={MUTED}>{`${angle}° = ${relationText}`}</Tag>}
                <RatioColumn language={props.language} x={530} y={120} sin={sin} cos={cos} tan={tan} />
                <Tag x={530} y={250} size={15} color={MUTED}>{zone ? l(quadrantNames[zone]) : l(say('Ardatz baten gainean', 'Sobre un eje', 'على محور', 'On an axis'))}</Tag>
            </Board>
        </ToolFrame>
    )
}

/* ---------- 10. The radian and the arc ---------- */

/** k·π as plain text: π/3, 5π/3, 2π */
function piPlain(value: FractionValue): string {
    if (value.numerator === 0) return '0'
    const top = value.numerator === 1 ? 'π' : `${value.numerator}π`
    return value.denominator === 1 ? top : `${top}/${value.denominator}`
}

export function RadianTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<RadianState>(initialRadianState)
    const { angle, r } = state
    const theta = radiansOverPi(angle)
    const arc = arcOverPi(state)
    const O: Point = [200, 160]
    const R = 60 + 15 * r
    const set = (patch: Partial<RadianState>) => setState((current) => setRadian(current, patch))
    const controls = (
        <>
            <Stepper label={l(say('Angelua', 'Ángulo', 'الزاوية', 'Angle'))} value={angle} min={0} max={360} step={CIRCLE_STEP} format={(value) => `${value}°`} onChange={(value) => set({ angle: value })} language={props.language} />
            <Stepper label={l(say('Erradioa r', 'Radio r', 'نصف القطر r', 'Radius r'))} value={r} min={1} max={RADIAN_RADIUS_MAX} onChange={(value) => set({ r: value })} language={props.language} />
        </>
    )
    const latex = `${angle}^{\\circ}=${angle}\\cdot\\frac{\\pi}{180}=${piLatex(theta)}\\ \\text{rad}\\qquad l=${r}\\cdot ${piLatex(theta)}=${piLatex(arc)}`
    const radians = (angle * Math.PI) / 180
    const note = l(say(
        `θ ≈ ${decimalText(radians, 2)} rad eta l ≈ ${decimalText(r * radians, 2)}.`,
        `θ ≈ ${decimalText(radians, 2)} rad y l ≈ ${decimalText(r * radians, 2)}.`,
        `θ ≈ ${decimalText(radians, 2).replace(',', '.')} rad وl ≈ ${decimalText(r * radians, 2).replace(',', '.')}.`, `θ ≈ ${num('en', decimalText(radians, 2))} rad and l ≈ ${num('en', decimalText(r * radians, 2))}.`
    ))
    const end = polar(O, R, angle)
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout language={props.language} latex={latex} note={note} />} challenges={radianChallenges} state={state}>
            <Board height={320} label={l(say('Zirkunferentzia, angelua eta ebakitzen duen arkua', 'La circunferencia, el ángulo y el arco que corta', 'الدائرة والزاوية والقوس الذي تقطعه', 'The circle, the angle and the arc it cuts off'))}>
                <circle cx={O[0]} cy={O[1]} r={R} fill={PAPER} stroke={MUTED} strokeWidth={1.6} />
                <AngleArc v={O} r={R} from={0} to={angle} color={STAGE} filled />
                <AngleArc v={O} r={R} from={0} to={angle} color={SECOND} />
                <line x1={O[0]} y1={O[1]} x2={O[0] + R} y2={O[1]} stroke={INK} strokeWidth={2.2} />
                {angle > 0 && angle < 360 && <line x1={O[0]} y1={O[1]} x2={end[0]} y2={end[1]} stroke={INK} strokeWidth={2.2} />}
                <circle cx={O[0]} cy={O[1]} r={4} fill={INK} />
                <Tag x={O[0] + R / 2} y={O[1] + 22} size={14} color={GREEN}>{`r = ${r}`}</Tag>
                <Tag x={530} y={90} size={15} color={MUTED}>{l(say('Angelua', 'Ángulo', 'الزاوية', 'Angle'))}</Tag>
                <Tag x={530} y={122} size={22} color={STAGE}>{`${angle}° = ${piPlain(theta)} rad`}</Tag>
                <Tag x={530} y={178} size={15} color={MUTED}>{l(say('Arkuaren luzera', 'Longitud del arco', 'طول القوس', 'Arc length'))}</Tag>
                <Tag x={530} y={210} size={22} color={SECOND}>{`l = ${piPlain(arc)}`}</Tag>
                <Tag x={530} y={244} size={15} color={MUTED}>{`≈ ${num(props.language, decimalText((r * angle * Math.PI) / 180, 2))}`}</Tag>
            </Board>
        </ToolFrame>
    )
}

