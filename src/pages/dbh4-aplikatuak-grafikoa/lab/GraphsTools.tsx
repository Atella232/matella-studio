import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { lineLatex, numberLatex, signed } from '../../dbh2-funtzioak-v2/functions'
import { Plane, PlaneGuides, PlaneLine, PlanePath, PlanePoint } from '../../dbh2-funtzioak-v2/plane'
import type { PlaneMap } from '../../dbh2-funtzioak-v2/planeMap'
import { hyperbolaBranches, rootCurve, sampled } from '../functions'
import {
    A_LIMIT,
    baseOf,
    EXPONENTIAL_BASES,
    expandedOf,
    exponentialAt,
    exponentialChallenges,
    FIXED_LINE,
    frameArea,
    frameChallenges,
    frameHeight,
    halfPerimeter,
    hyperbolaChallenges,
    initialExponentialState,
    initialFrameState,
    initialHyperbolaState,
    initialParabolaState,
    initialPointSlopeState,
    initialRootState,
    initialTwoLinesState,
    interceptOf,
    K_LIMIT,
    K_MAX,
    LINE_N_LIMIT,
    linesRelation,
    parabolaChallenges,
    parabolaRoots,
    PERIMETERS,
    POINT_LIMIT,
    pointSlopeChallenges,
    rootChallenges,
    setExponential,
    setFrame,
    setHyperbola,
    setParabola,
    setPointSlope,
    setRoot,
    setTwoLines,
    SHIFT_LIMIT,
    SLOPE_STEP_LIMIT,
    twoLinesChallenges,
    VERTEX_LIMIT,
    X_RANGE,
    type ExponentialState,
    type FrameState,
    type HyperbolaState,
    type ParabolaState,
    type PointSlopeState,
    type RootState,
    type TwoLinesState
} from './labTools'

const INK = 'var(--ink, #1d2733)'
const STAGE = 'var(--stage, #2f6fdb)'
const SECOND = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const MUTED = 'var(--muted, #58616e)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'

/** A number in LaTeX with the decimal comma (point in Arabic); halves as fractions */
const latex = (language: string, value: number) => {
    const rounded = Math.round(value * 1000) / 1000
    const text = numberLatex(rounded)
    return language === 'ar' ? text.replace('{,}', '.') : text
}
/** A number in LaTeX always as a decimal (1,5 rather than 3/2) */
const decimal = (language: string, value: number) => String(Math.round(value * 1000) / 1000).replace('.', language === 'ar' ? '.' : '{,}')
/** A decimal number for plain readouts: comma, point in Arabic, true minus */
const plain = (language: string, value: number) => signed(Math.round(value * 100) / 100).replace('.', language === 'ar' ? '.' : ',')
/** Halves written as 0,5 on the steppers */
const half = (language: string) => (value: number) => plain(language, value)

/** A dashed line across the box: vertical at x or horizontal at y */
function Dashed({ map, x, y }: { map: PlaneMap; x?: number; y?: number }) {
    const { box } = map
    return x !== undefined
        ? <line x1={map.x(x)} y1={map.y(box.yMin)} x2={map.x(x)} y2={map.y(box.yMax)} stroke={MUTED} strokeWidth={2} strokeDasharray="7 5" />
        : <line x1={map.x(box.xMin)} y1={map.y(y!)} x2={map.x(box.xMax)} y2={map.y(y!)} stroke={MUTED} strokeWidth={2} strokeDasharray="7 5" />
}

/** "y = a(x − p)² + q", "y = k/(x − a) + b" and similar: (x − a) written as x, x − 3 or x + 3 */
const shifted = (a: number) => (a === 0 ? 'x' : a > 0 ? `x-${a}` : `x+${-a}`)
const plus = (b: number) => (b === 0 ? '' : b > 0 ? `+${b}` : `-${-b}`)

/* ---------- A point and a slope ---------- */

/** The right side of y − y₀ = m(x − x₀), written without 1·, 0· or (x) */
function pointSlopeRight(language: string, { x0, m }: PointSlopeState) {
    if (m === 0) return '0'
    const factor = m === 1 ? '' : m === -1 ? '-' : latex(language, m)
    return `${factor}${x0 === 0 ? 'x' : `(${shifted(x0)})`}`
}

export function PointSlopeTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<PointSlopeState>(initialPointSlopeState)
    const n = interceptOf(state)
    const controls = (
        <>
            <Stepper label="x₀" value={state.x0} min={-POINT_LIMIT} max={POINT_LIMIT} format={signed} onChange={(x0) => setState((s) => setPointSlope(s, { x0 }))} language={props.language} />
            <Stepper label="y₀" value={state.y0} min={-POINT_LIMIT} max={POINT_LIMIT} format={signed} onChange={(y0) => setState((s) => setPointSlope(s, { y0 }))} language={props.language} />
            <Stepper label={l({ eu: 'Malda m', es: 'Pendiente m', ar: 'الميل m' })} value={state.m} min={-SLOPE_STEP_LIMIT} max={SLOPE_STEP_LIMIT} step={0.5} format={half(props.language)} onChange={(m) => setState((s) => setPointSlope(s, { m }))} language={props.language} />
        </>
    )
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$y${plus(-state.y0)}=${pointSlopeRight(props.language, state)}$`} /></span>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$${lineLatex(state.m, n).replace(/\{,\}/g, props.language === 'ar' ? '.' : '{,}')}$`} /></span>
            <span className="fraction-v2-lab-readout-note"><MathText text={`$n=${state.y0}-${latex(props.language, state.m).replace(/^-(.*)$/, '($&)')}\\cdot${state.x0 < 0 ? `(${state.x0})` : state.x0}=${latex(props.language, n)}$`} /></span>
        </>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={pointSlopeChallenges} state={state}>
            <Plane box={{ xMin: -6, xMax: 6, yMin: -6, yMax: 6 }} cell={26} label={l({ eu: 'Puntu batetik pasatzen den zuzena', es: 'La recta que pasa por un punto', 'ar': 'المستقيم المار بنقطة' })}>
                {(map, clip) => (
                    <g>
                        <PlaneLine map={map} m={state.m} n={n} color={STAGE} clip={clip} />
                        <PlaneGuides map={map} point={[state.x0, state.y0]} color={MUTED} />
                        <PlanePath map={map} points={[[state.x0, state.y0], [state.x0 + 1, state.y0], [state.x0 + 1, state.y0 + state.m]]} color={SECOND} width={2.6} dashed clip={clip} />
                        {Math.abs(n) <= 6 && <PlanePoint map={map} point={[0, n]} color={GREEN} radius={5.5} />}
                        <PlanePoint map={map} point={[state.x0, state.y0]} color={SECOND} radius={7} name="P" />
                    </g>
                )}
            </Plane>
        </ToolFrame>
    )
}

/* ---------- Two lines ---------- */

export function TwoLinesTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<TwoLinesState>(initialTwoLinesState)
    const relation = linesRelation(state)
    const controls = (
        <>
            <Stepper label={l({ eu: 's-ren malda m', es: 'Pendiente m de s', ar: 'ميل s ‏m' })} value={state.m} min={-SLOPE_STEP_LIMIT} max={SLOPE_STEP_LIMIT} step={0.5} format={half(props.language)} onChange={(m) => setState((s) => setTwoLines(s, { m }))} language={props.language} />
            <Stepper label={l({ eu: 's-ren n', es: 'n de s', ar: 'n للمستقيم s' })} value={state.n} min={-LINE_N_LIMIT} max={LINE_N_LIMIT} format={signed} onChange={(n) => setState((s) => setTwoLines(s, { n }))} language={props.language} />
        </>
    )
    const verdict = relation.kind === 'same'
        ? l({ eu: 'Zuzen bera dira', es: 'Son la misma recta', ar: 'إنهما المستقيم نفسه' })
        : relation.kind === 'parallel'
            ? l({ eu: 'Paraleloak: ez dira inoiz ebakitzen', es: 'Paralelas: no se cortan nunca', ar: 'متوازيان: لا يتقاطعان أبدًا' })
            : l({ eu: 'Ebakitzaileak: puntu bakarrean ebakitzen dira', es: 'Secantes: se cortan en un solo punto', ar: 'متقاطعان: يلتقيان في نقطة واحدة' })
    const at = relation.kind === 'secant' ? relation.at : null
    const lineText = (m: number, n: number) => lineLatex(m, n).replace(/\{,\}/g, props.language === 'ar' ? '.' : '{,}')
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={`r: $${lineText(FIXED_LINE.m, FIXED_LINE.n)}$`} /></span>
            <span className="fraction-v2-lab-readout-main"><MathText text={`s: $${lineText(state.m, state.n)}$`} /></span>
            <span className="fraction-v2-lab-readout-note">
                {verdict}
                {at && <>{' · '}<MathText text={`$(${latex(props.language, at[0])},\\,${latex(props.language, at[1])})$`} /></>}
            </span>
        </>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={twoLinesChallenges} state={state}>
            <Plane box={{ xMin: -6, xMax: 6, yMin: -6, yMax: 6 }} cell={26} label={l({ eu: 'r eta s zuzenak', es: 'Las rectas r y s', ar: 'المستقيمان r وs' })}>
                {(map, clip) => (
                    <g>
                        <PlaneLine map={map} m={FIXED_LINE.m} n={FIXED_LINE.n} color={STAGE} width={relation.kind === 'same' ? 7 : 3.5} clip={clip} />
                        <PlaneLine map={map} m={state.m} n={state.n} color={SECOND} dashed={relation.kind === 'same'} clip={clip} />
                        {at && Math.abs(at[0]) <= 6 && Math.abs(at[1]) <= 6 && <PlanePoint map={map} point={at} color={INK} radius={6.5} />}
                        <text x={map.x(-5.6)} y={map.y(-5.3)} fontSize={18} fontWeight={700} fill={STAGE}>r</text>
                        <text x={map.x(5.2)} y={map.y(-5.3)} fontSize={18} fontWeight={700} fill={SECOND}>s</text>
                    </g>
                )}
            </Plane>
        </ToolFrame>
    )
}

/* ---------- The parabola and its vertex ---------- */

export function ParabolaTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<ParabolaState>(initialParabolaState)
    const { a, p, q } = state
    const roots = parabolaRoots(state)
    const expanded = expandedOf(state)
    const coefficient = (value: number, variable: string, first = false) => {
        if (value === 0) return ''
        const sign = value < 0 ? '-' : first ? '' : '+'
        const size = Math.abs(value)
        const body = variable && size === 1 ? '' : latex(props.language, size)
        return `${sign}${body}${variable}`
    }
    const aText = a === 1 ? '' : a === -1 ? '-' : latex(props.language, a)
    const vertexForm = `y=${aText}${p === 0 ? 'x' : `(${shifted(p)})`}^{2}${plus(q)}`
    const generalForm = `y=${coefficient(expanded.a, 'x^{2}', true)}${coefficient(expanded.b, 'x')}${coefficient(expanded.c, '')}`
    const controls = (
        <>
            <Stepper label="a" value={a} min={-A_LIMIT} max={A_LIMIT} step={0.5} format={half(props.language)} onChange={(value) => setState((s) => setParabola(s, { a: value }))} language={props.language} />
            <Stepper label="p" value={p} min={-VERTEX_LIMIT} max={VERTEX_LIMIT} format={signed} onChange={(value) => setState((s) => setParabola(s, { p: value }))} language={props.language} />
            <Stepper label="q" value={q} min={-VERTEX_LIMIT} max={VERTEX_LIMIT} format={signed} onChange={(value) => setState((s) => setParabola(s, { q: value }))} language={props.language} />
        </>
    )
    const cuts = roots.map((x) => (Number.isInteger(x * 100) ? latex(props.language, x) : `${latex(props.language, Math.round(x * 100) / 100)}\\ldots`)).join(',\\ ')
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$${vertexForm}$`} /></span>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$${generalForm}$`} /></span>
            <span className="fraction-v2-lab-readout-note">
                <MathText text={`$V(${p},\\,${q})$`} />
                {' · '}
                {a > 0 ? l({ eu: 'minimoa', es: 'mínimo', ar: 'قيمة صغرى' }) : l({ eu: 'maximoa', es: 'máximo', ar: 'قيمة عظمى' })}
                {' · '}
                {roots.length === 0
                    ? l({ eu: 'ez du X ardatza ebakitzen', es: 'no corta al eje X', ar: 'لا يقطع محور X' })
                    : <MathText text={l({ eu: `X ardatza: $x=${cuts}$`, es: `Eje X: $x=${cuts}$`, ar: `محور X: $x=${cuts}$` })} />}
            </span>
        </>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={parabolaChallenges} state={state}>
            <Plane box={{ xMin: -6, xMax: 6, yMin: -6, yMax: 6 }} cell={26} label={vertexForm}>
                {(map, clip) => (
                    <g>
                        <PlanePath map={map} points={sampled((x) => x * x, -4, 4)} color={MUTED} width={2} dashed clip={clip} />
                        <Dashed map={map} x={p} />
                        <PlanePath map={map} points={sampled((x) => a * (x - p) ** 2 + q, -7, 7)} color={STAGE} width={3.4} clip={clip} />
                        {roots.filter((x) => Math.abs(x) <= 6).map((x) => <PlanePoint key={x} map={map} point={[x, 0]} color={GREEN} radius={6} />)}
                        <PlanePoint map={map} point={[p, q]} color={SECOND} radius={7} name="V" dx={10} dy={a > 0 ? 20 : -10} />
                    </g>
                )}
            </Plane>
        </ToolFrame>
    )
}

/* ---------- The hyperbola and its asymptotes ---------- */

export function HyperbolaTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<HyperbolaState>(initialHyperbolaState)
    const { k, a, b } = state
    const formula = `y=\\frac{${k}}{${shifted(a)}}${plus(b)}`
    const controls = (
        <>
            <Stepper label="k" value={k} min={-K_LIMIT} max={K_LIMIT} format={signed} onChange={(value) => setState((s) => setHyperbola(s, { k: value }))} language={props.language} />
            <Stepper label="a" value={a} min={-SHIFT_LIMIT} max={SHIFT_LIMIT} format={signed} onChange={(value) => setState((s) => setHyperbola(s, { a: value }))} language={props.language} />
            <Stepper label="b" value={b} min={-SHIFT_LIMIT} max={SHIFT_LIMIT} format={signed} onChange={(value) => setState((s) => setHyperbola(s, { b: value }))} language={props.language} />
        </>
    )
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$${formula}$`} /></span>
            <span className="fraction-v2-lab-readout-note"><MathText text={l({ eu: `Asintotak: $x=${a}$ eta $y=${b}$`, es: `Asíntotas: $x=${a}$ e $y=${b}$`, ar: `المقاربان: $x=${a}$ و$y=${b}$` })} /></span>
            <span className="fraction-v2-lab-readout-note"><MathText text={`$\\text{Dom}\\,f=\\mathbb{R}-\\{${a}\\}$`} /></span>
        </>
    )
    const marks = [1, 2, -1, -2].map((dx) => [a + dx, k / dx + b] as const).filter(([x, y]) => Math.abs(x) <= 6 && Math.abs(y) <= 6 && Number.isInteger(y * 2))
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={hyperbolaChallenges} state={state}>
            <Plane box={{ xMin: -6, xMax: 6, yMin: -6, yMax: 6 }} cell={26} label={formula}>
                {(map, clip) => (
                    <g>
                        <Dashed map={map} x={a} />
                        <Dashed map={map} y={b} />
                        {hyperbolaBranches(k, a, b, -6.5, 6.5, -6, 6).map((points, index) => <PlanePath key={index} map={map} points={points} color={STAGE} width={3.4} clip={clip} />)}
                        {marks.map(([x, y]) => <PlanePoint key={x} map={map} point={[x, y]} color={SECOND} radius={5} />)}
                    </g>
                )}
            </Plane>
        </ToolFrame>
    )
}

/* ---------- Square roots ---------- */

export function RootTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<RootState>(initialRootState)
    const { s, a, b } = state
    const inside = a === 0 ? 'x' : a > 0 ? `x-${a}` : `x+${-a}`
    const formula = b === 0 ? `y=${s < 0 ? '-' : ''}\\sqrt{${inside}}` : `y=${b}${s < 0 ? '-' : '+'}\\sqrt{${inside}}`
    const controls = (
        <>
            <Segmented label={l({ eu: 'Norabidea', es: 'Sentido', ar: 'الاتجاه' })} value={String(s)} options={[{ value: '1', label: l({ eu: 'Gora (+√)', es: 'Arriba (+√)', ar: 'للأعلى (+√)' }) }, { value: '-1', label: l({ eu: 'Behera (−√)', es: 'Abajo (−√)', ar: 'للأسفل (−√)' }) }]} onChange={(next) => setState((current) => setRoot(current, { s: next === '-1' ? -1 : 1 }))} />
            <Stepper label="a" value={a} min={-SHIFT_LIMIT} max={SHIFT_LIMIT} format={signed} onChange={(value) => setState((current) => setRoot(current, { a: value }))} language={props.language} />
            <Stepper label="b" value={b} min={-SHIFT_LIMIT} max={SHIFT_LIMIT} format={signed} onChange={(value) => setState((current) => setRoot(current, { b: value }))} language={props.language} />
        </>
    )
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$${formula}$`} /></span>
            <span className="fraction-v2-lab-readout-note"><MathText text={l({ eu: `Hasiera: $(${a},\\,${b})$ · Dom $f=[${a},\\,+\\infty)$`, es: `Empieza en $(${a},\\,${b})$ · Dom $f=[${a},\\,+\\infty)$`, ar: `يبدأ من $(${a},\\,${b})$ · Dom $f=[${a},\\,+\\infty)$` })} /></span>
        </>
    )
    // Whole points of the curve: x − a = 0, 1, 4, 9
    const marks = [0, 1, 4, 9].map((square) => [a + square, s * Math.sqrt(square) + b] as const).filter(([x, y]) => x <= 7 && Math.abs(y) <= 5)
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={rootChallenges} state={state}>
            <Plane box={{ xMin: -5, xMax: 7, yMin: -5, yMax: 5 }} cell={26} label={formula}>
                {(map, clip) => (
                    <g>
                        <PlanePath map={map} points={rootCurve(s, a, b, 7.5)} color={STAGE} width={3.4} clip={clip} />
                        <line x1={map.x(a)} y1={map.y(0)} x2={map.x(7)} y2={map.y(0)} stroke={STAGE} strokeWidth={9} strokeLinecap="round" opacity={0.3} />
                        {marks.map(([x, y], index) => <PlanePoint key={x} map={map} point={[x, y]} color={index === 0 ? SECOND : STAGE} radius={index === 0 ? 7 : 4.5} />)}
                    </g>
                )}
            </Plane>
        </ToolFrame>
    )
}

/* ---------- The exponential ---------- */

export function ExponentialTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<ExponentialState>(initialExponentialState)
    const base = baseOf(state)
    const value = exponentialAt(state)
    const exact = Math.abs(value * 1000 - Math.round(value * 1000)) < 1e-9
    const baseText = decimal(props.language, base)
    const formula = `y=${state.k === 1 ? '' : `${state.k}\\cdot `}${baseText}^{x}`
    const controls = (
        <>
            <Stepper label="k" value={state.k} min={1} max={K_MAX} onChange={(k) => setState((s) => setExponential(s, { k }))} language={props.language} />
            <Segmented label={l({ eu: 'Oinarria a', es: 'Base a', ar: 'الأساس a' })} value={String(state.base)} options={EXPONENTIAL_BASES.map((item, index) => ({ value: String(index), label: plain(props.language, item) }))} onChange={(next) => setState((s) => setExponential(s, { base: Number(next) }))} />
            <Stepper label={l({ eu: 'Kurtsorea: x =', es: 'Cursor: x =', ar: 'المؤشر: x =' })} value={state.x} min={X_RANGE.min} max={X_RANGE.max} format={signed} onChange={(x) => setState((s) => setExponential(s, { x }))} language={props.language} />
        </>
    )
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$${formula}$`} /></span>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$y(${state.x})${exact ? '=' : '\\approx '}${decimal(props.language, exact ? value : Math.round(value * 100) / 100)}$`} /></span>
            <span className="fraction-v2-lab-readout-note">
                {base > 1 ? l({ eu: 'Gorakorra', es: 'Creciente', ar: 'متزايدة' }) : l({ eu: 'Beherakorra', es: 'Decreciente', ar: 'متناقصة' })}
                {' · '}
                {base > 1
                    ? l({ eu: `% ${Math.round((base - 1) * 100)} gehiago urrats bakoitzean`, es: `un ${Math.round((base - 1) * 100)} % más cada paso`, ar: `تزيد ${Math.round((base - 1) * 100)} % كل خطوة` })
                    : l({ eu: `% ${Math.round((1 - base) * 100)} gutxiago urrats bakoitzean`, es: `un ${Math.round((1 - base) * 100)} % menos cada paso`, ar: `تنقص ${Math.round((1 - base) * 100)} % كل خطوة` })}
            </span>
        </>
    )
    const yMax = 10
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={exponentialChallenges} state={state}>
            <Plane box={{ xMin: -3, xMax: 4, yMin: 0, yMax }} cell={30} label={formula}>
                {(map, clip) => (
                    <g>
                        <PlanePath map={map} points={sampled((x) => state.k * base ** x, -3, 4)} color={STAGE} width={3.4} clip={clip} />
                        <PlanePoint map={map} point={[0, state.k]} color={GREEN} radius={6} />
                        {value <= yMax && (
                            <g>
                                <PlaneGuides map={map} point={[state.x, value]} color={MUTED} />
                                <PlanePoint map={map} point={[state.x, value]} color={SECOND} radius={7} />
                            </g>
                        )}
                    </g>
                )}
            </Plane>
        </ToolFrame>
    )
}

/* ---------- The rectangle of fixed perimeter ---------- */

export function FrameTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<FrameState>(initialFrameState)
    const semi = halfPerimeter(state)
    const height = frameHeight(state)
    const area = frameArea(state)
    const maxArea = (semi / 2) ** 2
    const controls = (
        <>
            <Segmented label={l({ eu: 'Perimetroa', es: 'Perímetro', ar: 'المحيط' })} value={String(state.perimeter)} options={PERIMETERS.map((item, index) => ({ value: String(index), label: l({ eu: `${item} m`, es: `${item} m`, ar: `${item} م` }) }))} onChange={(next) => setState((s) => setFrame(s, { perimeter: Number(next) }))} />
            <Stepper label={l({ eu: 'Oinarria x (m)', es: 'Base x (m)', ar: 'القاعدة x (م)' })} value={state.x} min={0.5} max={semi - 0.5} step={0.5} format={half(props.language)} onChange={(x) => setState((s) => setFrame(s, { x }))} language={props.language} />
        </>
    )
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$A(x)=x\\,(${semi}-x)$`} /></span>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$A=${decimal(props.language, state.x)}\\cdot ${decimal(props.language, height)}=${decimal(props.language, area)}\\ \\text{m}^{2}$`} /></span>
        </>
    )
    // Left: the rectangle drawn to scale; right: the parabola A(x)
    const scale = 190 / semi
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={frameChallenges} state={state}>
            <div className="functions-lab-pair" style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 250 230" width={250} height={230} role="img" aria-label={l({ eu: 'Laukizuzena', es: 'El rectángulo', ar: 'المستطيل' })} direction="ltr">
                    <rect x={25} y={25} width={state.x * scale} height={height * scale} fill={STAGE_TINT} stroke={STAGE} strokeWidth={3} />
                    <text x={25 + (state.x * scale) / 2} y={18} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>{plain(props.language, state.x)}</text>
                    <text x={30 + state.x * scale} y={25 + (height * scale) / 2} fontSize={16} fontWeight={700} fill={INK}>{plain(props.language, height)}</text>
                </svg>
                <Plane box={{ xMin: 0, xMax: semi, yMin: 0, yMax: Math.ceil(maxArea / 5) }} cell={Math.floor(320 / semi)} yUnit={5} labelStep={semi > 10 ? 3 : 2} xTitle="x" yTitle="A" label={l({ eu: 'Azalera oinarriaren arabera', es: 'El área según la base', ar: 'المساحة بحسب القاعدة' })}>
                    {(map, clip) => (
                        <g>
                            <PlanePath map={map} points={sampled((x) => (x * (semi - x)) / 5, 0, semi, 0.1)} color={STAGE} width={3.2} clip={clip} />
                            <PlaneGuides map={map} point={[state.x, area / 5]} color={MUTED} />
                            <PlanePoint map={map} point={[state.x, area / 5]} color={SECOND} radius={7} />
                        </g>
                    )}
                </Plane>
            </div>
        </ToolFrame>
    )
}
