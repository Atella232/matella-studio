import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { numberLatex, signed } from '../../dbh2-funtzioak-v2/functions'
import { Plane, PlaneLine, PlanePath, PlanePoint } from '../../dbh2-funtzioak-v2/plane'
import type { PlaneMap } from '../../dbh2-funtzioak-v2/planeMap'
import { hyperbolaBranches, sampled } from '../../dbh4-aplikatuak-grafikoa/functions'
import {
    ABS_B_LIMIT,
    ABS_C_LIMIT,
    ABS_M_LIMIT,
    ABS_N_LIMIT,
    absoluteAt,
    absoluteChallenges,
    absoluteZeros,
    FIT_A_LIMIT,
    FIT_ROOT_LIMIT,
    fitChallenges,
    fitExpanded,
    fitValue,
    fitVertex,
    foldedVertex,
    initialAbsoluteState,
    initialFitState,
    initialRationalState,
    initialSecantState,
    insideAt,
    parabolaAt,
    RATIONAL_A_LIMIT,
    RATIONAL_B_LIMIT,
    RATIONAL_D_LIMIT,
    rationalAt,
    rationalChallenges,
    rationalK,
    rationalZero,
    SECANT_M_LIMIT,
    SECANT_N_LIMIT,
    secantChallenges,
    secantDelta,
    secantKind,
    secantXs,
    setAbsolute,
    setFit,
    setRational,
    setSecant,
    type AbsoluteKind,
    type AbsoluteState,
    type FitState,
    type RationalState,
    type SecantState
} from './labTools'

const INK = 'var(--ink, #1d2733)'
const STAGE = 'var(--stage, #2f6fdb)'
const SECOND = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const MUTED = 'var(--muted, #58616e)'

/** A number in LaTeX with the decimal comma (point in Arabic); halves as fractions */
const latex = (language: string, value: number) => {
    const text = numberLatex(Math.round(value * 1000) / 1000)
    return language === 'ar' ? text.replace('{,}', '.') : text
}
/** A rounded decimal in LaTeX, for coordinates that may not be whole */
const decimal = (language: string, value: number) => {
    const rounded = Math.round(value * 100) / 100
    const text = String(rounded).replace('.', language === 'ar' ? '.' : '{,}')
    return Number.isInteger(value * 100) ? text : `${text}\\ldots`
}
/** Keeps a short formula left to right inside Arabic text */
const ltr = (text: string) => `\u2066${text}\u2069`
/** Halves written as 0,5 on the steppers */
const half = (language: string) => (value: number) => signed(Math.round(value * 100) / 100).replace('.', language === 'ar' ? '.' : ',')

/** "+ 3x", "− x", "" … one term of a polynomial written in LaTeX */
function term(language: string, value: number, variable: string, first = false) {
    if (value === 0) return ''
    const sign = value < 0 ? '-' : first ? '' : '+'
    const size = Math.abs(value)
    return `${sign}${variable && size === 1 ? '' : latex(language, size)}${variable}`
}
/** A polynomial ax² + bx + c in LaTeX (0 when every term vanishes) */
const polynomial = (language: string, a: number, b: number, c: number) => `${term(language, a, 'x^{2}', true)}${term(language, b, 'x', a === 0)}${term(language, c, '', a === 0 && b === 0)}` || '0'
/** (x − r), x or (x + r) */
const factor = (r: number) => (r === 0 ? 'x' : r > 0 ? `(x-${r})` : `(x+${-r})`)

/** A dashed line across the box: vertical at x or horizontal at y */
function Dashed({ map, x, y }: { map: PlaneMap; x?: number; y?: number }) {
    const { box } = map
    return x !== undefined
        ? <line x1={map.x(x)} y1={map.y(box.yMin)} x2={map.x(x)} y2={map.y(box.yMax)} stroke={MUTED} strokeWidth={2} strokeDasharray="7 5" />
        : <line x1={map.x(box.xMin)} y1={map.y(y!)} x2={map.x(box.xMax)} y2={map.y(y!)} stroke={MUTED} strokeWidth={2} strokeDasharray="7 5" />
}

/* ---------- A parabola from its roots ---------- */

export function FitTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<FitState>(initialFitState)
    const { a, r, t } = state
    const [vx, vy] = fitVertex(state)
    const expanded = fitExpanded(state)
    const aText = a === 1 ? '' : a === -1 ? '-' : latex(props.language, a)
    const factored = `y=${aText}${r === t ? `${factor(r)}^{2}` : `${factor(r)}${factor(t)}`}`
    const controls = (
        <>
            <Stepper label="a" value={a} min={-FIT_A_LIMIT} max={FIT_A_LIMIT} step={0.5} format={half(props.language)} onChange={(value) => setState((s) => setFit(s, { a: value }))} language={props.language} />
            <Stepper label={l({ eu: 'Lehen erroa', es: 'Primera raíz', ar: 'الجذر الأول' })} value={r} min={-FIT_ROOT_LIMIT} max={FIT_ROOT_LIMIT} format={signed} onChange={(value) => setState((s) => setFit(s, { r: value }))} language={props.language} />
            <Stepper label={l({ eu: 'Bigarren erroa', es: 'Segunda raíz', ar: 'الجذر الثاني' })} value={t} min={-FIT_ROOT_LIMIT} max={FIT_ROOT_LIMIT} format={signed} onChange={(value) => setState((s) => setFit(s, { t: value }))} language={props.language} />
        </>
    )
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$${factored}$`} /></span>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$y=${polynomial(props.language, expanded.a, expanded.b, expanded.c)}$`} /></span>
            <span className="fraction-v2-lab-readout-note">
                <MathText text={`$V(${latex(props.language, vx)},\\,${latex(props.language, vy)})$`} />
                {' · '}
                <MathText text={l({ eu: `Y ardatza: $(0,\\,${latex(props.language, expanded.c)})$`, es: `Eje Y: $(0,\\,${latex(props.language, expanded.c)})$`, ar: `محور Y: $(0,\\,${latex(props.language, expanded.c)})$` })} />
            </span>
        </>
    )
    const box = { xMin: -6, xMax: 6, yMin: -7, yMax: 7 }
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={fitChallenges} state={state}>
            <Plane box={box} cell={24} label={factored}>
                {(map, clip) => (
                    <g>
                        <Dashed map={map} x={vx} />
                        <PlanePath map={map} points={sampled((x) => fitValue(state, x), -7, 7)} color={STAGE} width={3.4} clip={clip} />
                        {[...new Set([r, t])].map((root) => <PlanePoint key={root} map={map} point={[root, 0]} color={GREEN} radius={6} />)}
                        {Math.abs(expanded.c) <= box.yMax && <PlanePoint map={map} point={[0, expanded.c]} color={INK} radius={4.5} />}
                        {Math.abs(vy) <= box.yMax && r !== t && <PlanePoint map={map} point={[vx, vy]} color={SECOND} radius={6.5} name="V" dx={10} dy={a > 0 ? 20 : -10} />}
                    </g>
                )}
            </Plane>
        </ToolFrame>
    )
}

/* ---------- A line against the parabola y = x² − 1 ---------- */

export function SecantTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<SecantState>(initialSecantState)
    const { m, n } = state
    const xs = secantXs(state)
    const kind = secantKind(state)
    const delta = secantDelta(state)
    const line = `y=${polynomial(props.language, 0, m, n)}`
    const equation = `x^{2}${term(props.language, -m, 'x')}${term(props.language, -(n + 1), '')}=0`
    const names = {
        secant: l({ eu: 'Ebakitzailea: 2 puntu', es: 'Secante: 2 puntos', ar: 'قاطع: نقطتان' }),
        tangent: l({ eu: 'Ukitzailea: puntu 1', es: 'Tangente: 1 punto', ar: 'مماس: نقطة واحدة' }),
        exterior: l({ eu: 'Kanpokoa: ez dute elkar ebakitzen', es: 'Exterior: no se cortan', ar: 'خارجي: لا يتقاطعان' })
    }
    const controls = (
        <>
            <Stepper label="m" value={m} min={-SECANT_M_LIMIT} max={SECANT_M_LIMIT} format={signed} onChange={(value) => setState((s) => setSecant(s, { m: value }))} language={props.language} />
            <Stepper label="n" value={n} min={-SECANT_N_LIMIT} max={SECANT_N_LIMIT} format={signed} onChange={(value) => setState((s) => setSecant(s, { n: value }))} language={props.language} />
        </>
    )
    const points = xs.map((x) => `(${decimal(props.language, x)},\\,${decimal(props.language, m * x + n)})`).join(',\\ ')
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$${line}$`} /></span>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$${equation}$`} /></span>
            <span className="fraction-v2-lab-readout-note"><MathText text={`$\\Delta=${delta}$`} />{' · '}{names[kind]}</span>
            {xs.length > 0 && <span className="fraction-v2-lab-readout-note"><MathText text={`$${points}$`} /></span>}
        </>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={secantChallenges} state={state}>
            <Plane box={{ xMin: -5, xMax: 5, yMin: -3, yMax: 9 }} cell={26} label={`y=x^{2}-1 · ${line}`}>
                {(map, clip) => (
                    <g>
                        <PlanePath map={map} points={sampled(parabolaAt, -5.5, 5.5)} color={STAGE} width={3.4} clip={clip} />
                        <PlaneLine map={map} m={m} n={n} color={SECOND} clip={clip} />
                        {xs.filter((x) => Math.abs(x) <= 5 && m * x + n <= 9).map((x) => <PlanePoint key={x} map={map} point={[x, m * x + n]} color={kind === 'tangent' ? GREEN : INK} radius={6.5} />)}
                    </g>
                )}
            </Plane>
        </ToolFrame>
    )
}

/* ---------- Folding an absolute value ---------- */

export function AbsoluteTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<AbsoluteState>(initialAbsoluteState)
    const zeros = absoluteZeros(state)
    const inside = state.kind === 'line' ? polynomial(props.language, 0, state.m, state.n) : polynomial(props.language, 1, state.b, state.c)
    const formula = `y=\\left|${inside}\\right|`
    const kinds: Array<{ value: AbsoluteKind; label: string }> = [
        { value: 'line', label: ltr('|mx + n|') },
        { value: 'parabola', label: ltr('|x² + bx + c|') }
    ]
    const controls = (
        <>
            <Segmented label={l({ eu: 'Barrukoa', es: 'Lo de dentro', ar: 'ما بالداخل' })} value={state.kind} options={kinds} onChange={(kind) => setState((s) => setAbsolute(s, { kind }))} />
            {state.kind === 'line'
                ? (
                    <>
                        <Stepper label="m" value={state.m} min={-ABS_M_LIMIT} max={ABS_M_LIMIT} format={signed} onChange={(value) => setState((s) => setAbsolute(s, { m: value }))} language={props.language} />
                        <Stepper label="n" value={state.n} min={-ABS_N_LIMIT} max={ABS_N_LIMIT} format={signed} onChange={(value) => setState((s) => setAbsolute(s, { n: value }))} language={props.language} />
                    </>
                )
                : (
                    <>
                        <Stepper label="b" value={state.b} min={-ABS_B_LIMIT} max={ABS_B_LIMIT} format={signed} onChange={(value) => setState((s) => setAbsolute(s, { b: value }))} language={props.language} />
                        <Stepper label="c" value={state.c} min={-ABS_C_LIMIT} max={ABS_C_LIMIT} format={signed} onChange={(value) => setState((s) => setAbsolute(s, { c: value }))} language={props.language} />
                    </>
                )}
        </>
    )
    const zerosText = zeros.map((x) => decimal(props.language, x)).join(',\\ ')
    const [fx, fy] = foldedVertex(state)
    const folds = state.kind === 'parabola' && zeros.length === 2
    const note = state.kind === 'line'
        ? l({ eu: `Erpina: $x=${zerosText}$`, es: `Pico: $x=${zerosText}$`, ar: `الرأس: $x=${zerosText}$` })
        : zeros.length === 0
            ? l({ eu: 'Ez dago ezer islatzeko', es: 'No hay nada que reflejar', ar: 'لا شيء يُعكس' })
            : l({ eu: `X ardatza: $x=${zerosText}$`, es: `Eje X: $x=${zerosText}$`, ar: `محور X: $x=${zerosText}$` })
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$${formula}$`} /></span>
            <span className="fraction-v2-lab-readout-note"><MathText text={note} /></span>
            {folds && <span className="fraction-v2-lab-readout-note"><MathText text={l({ eu: `Maximo erlatiboa: $(${decimal(props.language, fx)},\\,${decimal(props.language, fy)})$`, es: `Máximo relativo: $(${decimal(props.language, fx)},\\,${decimal(props.language, fy)})$`, ar: `عظمى نسبية: $(${decimal(props.language, fx)},\\,${decimal(props.language, fy)})$` })} /></span>}
        </>
    )
    const box = { xMin: -6, xMax: 6, yMin: -5, yMax: 8 }
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={absoluteChallenges} state={state}>
            <Plane box={box} cell={24} label={formula}>
                {(map, clip) => (
                    <g>
                        <PlanePath map={map} points={sampled((x) => insideAt(state, x), -7, 7)} color={MUTED} width={2.4} dashed clip={clip} />
                        <PlanePath map={map} points={sampled((x) => absoluteAt(state, x), -7, 7, 0.01)} color={STAGE} width={3.6} clip={clip} />
                        {zeros.filter((x) => Math.abs(x) <= 6).map((x) => <PlanePoint key={x} map={map} point={[x, 0]} color={SECOND} radius={6} />)}
                        {folds && fy <= box.yMax && <PlanePoint map={map} point={[fx, fy]} color={GREEN} radius={6} />}
                    </g>
                )}
            </Plane>
        </ToolFrame>
    )
}

/* ---------- (ax + b)/(x + d) = a + k/(x + d) ---------- */

export function RationalTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<RationalState>(initialRationalState)
    const { a, b, d } = state
    const k = rationalK(state)
    const zero = rationalZero(state)
    const denominator = d === 0 ? 'x' : d > 0 ? `x+${d}` : `x-${-d}`
    const formula = `y=\\frac{${polynomial(props.language, 0, a, b)}}{${denominator}}`
    const divided = k === 0 ? `y=${a}` : `y=${a === 0 ? '' : `${a}+`}\\frac{${k}}{${denominator}}`.replace('+\\frac{-', '-\\frac{')
    const controls = (
        <>
            <Stepper label="a" value={a} min={-RATIONAL_A_LIMIT} max={RATIONAL_A_LIMIT} format={signed} onChange={(value) => setState((s) => setRational(s, { a: value }))} language={props.language} />
            <Stepper label="b" value={b} min={-RATIONAL_B_LIMIT} max={RATIONAL_B_LIMIT} format={signed} onChange={(value) => setState((s) => setRational(s, { b: value }))} language={props.language} />
            <Stepper label="d" value={d} min={-RATIONAL_D_LIMIT} max={RATIONAL_D_LIMIT} format={signed} onChange={(value) => setState((s) => setRational(s, { d: value }))} language={props.language} />
        </>
    )
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$${formula}$`} /></span>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$${divided}$`} /></span>
            <span className="fraction-v2-lab-readout-note">
                {k === 0
                    ? <MathText text={l({ eu: `$k=0$: zuzen bat, $x=${-d}$ puntuan zuloa duena`, es: `$k=0$: una recta con un agujero en $x=${-d}$`, ar: `$k=0$: مستقيم فيه ثقب عند $x=${-d}$` })} />
                    : <MathText text={l({ eu: `Asintotak: $x=${-d}$ eta $y=${a}$`, es: `Asíntotas: $x=${-d}$ e $y=${a}$`, ar: `المقاربان: $x=${-d}$ و$y=${a}$` })} />}
            </span>
            {zero !== null && <span className="fraction-v2-lab-readout-note"><MathText text={l({ eu: `X ardatza: $x=${latex(props.language, zero)}$`, es: `Eje X: $x=${latex(props.language, zero)}$`, ar: `محور X: $x=${latex(props.language, zero)}$` })} /></span>}
        </>
    )
    const box = { xMin: -6, xMax: 6, yMin: -6, yMax: 6 }
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={rationalChallenges} state={state}>
            <Plane box={box} cell={26} label={formula}>
                {(map, clip) => (
                    <g>
                        {k !== 0 && <Dashed map={map} x={-d} />}
                        {k !== 0 && <Dashed map={map} y={a} />}
                        {k !== 0
                            ? hyperbolaBranches(k, -d, a, -6.5, 6.5, -6, 6).map((points, index) => <PlanePath key={index} map={map} points={points} color={STAGE} width={3.4} clip={clip} />)
                            : (
                                <g>
                                    <PlaneLine map={map} m={0} n={a} color={STAGE} clip={clip} />
                                    <PlanePoint map={map} point={[-d, a]} color={STAGE} radius={6} hollow />
                                </g>
                            )}
                        {zero !== null && Math.abs(zero) <= 6 && <PlanePoint map={map} point={[zero, 0]} color={SECOND} radius={5.5} />}
                        {k !== 0 && d !== 0 && rationalAt(state, 0) !== null && Math.abs(rationalAt(state, 0)!) <= 6 && <PlanePoint map={map} point={[0, rationalAt(state, 0)!]} color={GREEN} radius={5} />}
                    </g>
                )}
            </Plane>
        </ToolFrame>
    )
}
