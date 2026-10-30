import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { decimalSeparatorFor } from '../../../utils/numberFormat'
import { polyLatex } from '../../dbh4-akademikoak-polinomioak/polynomials'
import {
    biquadraticChallenges,
    biquadraticLatex,
    biquadraticSolutions,
    EXPONENT_X,
    exponentialChallenges,
    exponentialEquations,
    exponentLatex,
    exponents,
    GRAPHIC_LIMITS,
    graphicChallenges,
    graphicCrossings,
    graphicDiscriminant,
    initialBiquadraticState,
    initialExponentialState,
    initialGraphicState,
    initialLinearState,
    initialRootsState,
    initialSignState,
    initialSystemState,
    initialTariffsState,
    LINEAR_LIMITS,
    linearChallenges,
    linearLeftLatex,
    linearSolution,
    linearSpan,
    probeHolds,
    relationLatex,
    RELATIONS,
    resolventLatex,
    ROOTS_LIMITS,
    rootsChallenges,
    rootsEquation,
    rootsProduct,
    rootsSum,
    setBiquadratic,
    setExponential,
    setGraphic,
    setLatex,
    setLinear,
    setRoots,
    setSign,
    setSystem,
    setTariffs,
    SIGN_ROOT,
    signChallenges,
    signPoly,
    signSolution,
    signValue,
    span,
    SYSTEM_LIMIT,
    systemChallenges,
    systemSolution,
    systemSpans,
    T_LIMITS,
    TARIFF_X,
    tariffCost,
    tariffCosts,
    tariffCross,
    tariffScenarios,
    tariffsChallenges,
    type BiquadraticState,
    type ExponentialState,
    type GraphicState,
    type LinearState,
    type Relation,
    type RootsState,
    type SignState,
    type Span,
    type SystemState,
    type TariffsState
} from './labTools'

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const MUSTARD_TINT = 'var(--mustard-tint, #fbebc0)'
const PAPER = '#fffcf6'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
/** Negative numbers with the true minus sign */
const signed = (value: number) => (value < 0 ? `−${-value}` : String(value))
const SUPERSCRIPT: Record<string, string> = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹', x: 'ˣ', '+': '⁺', '-': '⁻' }
/** LaTeX of a polynomial as plain text: x^{2}-1 → x² − 1 */
const plain = (latex: string) => latex
    .replace(/\^\{([^{}]+)\}/g, (_, body: string) => body.split('').map((char) => SUPERSCRIPT[char] ?? char).join(''))
    .replace(/([^\s(])([+-])/g, '$1 $2 ')
    .replace(/-/g, '−')
const decimal = (value: number, language: UnitLanguage) => signed(Math.round(value * 100) / 100).replace('.', language === 'ar' ? '.' : decimalSeparatorFor(language))
const and = (language: UnitLanguage) => (language === 'eu' ? ' eta ' : language === 'es' ? ' y ' : language === 'en' ? ' and ' : ' و')

function Board({ height, label, children }: { height: number; label: string; children: ReactNode }) {
    return <svg viewBox={`0 0 640 ${height}`} direction="ltr" role="img" aria-label={label} style={{ width: '100%', height: 'auto', fontFamily: '"Atkinson Hyperlegible", "Noto Sans Arabic", system-ui, sans-serif' }}>{children}</svg>
}

function Readout({ latex, note }: { latex: string; note: string }) {
    return (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$${latex}$`} /></span>
            <span className="fraction-v2-lab-readout-note">{note}</span>
        </>
    )
}

function Text({ x, y, children, color = INK, size = 18, anchor = 'middle', weight = 700 }: { x: number; y: number; children: ReactNode; color?: string; size?: number; anchor?: 'start' | 'middle' | 'end'; weight?: number }) {
    return <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={weight} fill={color}>{children}</text>
}

/* ---------- The number line and sets drawn on it ---------- */

interface Scale {
    ox: number
    unit: number
    min: number
    max: number
}

const toX = (scale: Scale, x: number) => scale.ox + x * scale.unit

function Axis({ scale, y, labels = true, step = 1 }: { scale: Scale; y: number; labels?: boolean; step?: number }) {
    const ticks = Array.from({ length: scale.max - scale.min + 1 }, (_, k) => scale.min + k)
    return (
        <g>
            <line x1={toX(scale, scale.min - 0.6)} x2={toX(scale, scale.max + 0.6)} y1={y} y2={y} stroke={INK} strokeWidth={1.6} />
            {ticks.map((x) => (
                <g key={x}>
                    <line x1={toX(scale, x)} x2={toX(scale, x)} y1={y - 5} y2={y + 5} stroke={INK} strokeWidth={1.2} />
                    {labels && x % step === 0 && <Text x={toX(scale, x)} y={y + 24} size={13} color={MUTED} weight={400}>{signed(x)}</Text>}
                </g>
            ))}
        </g>
    )
}

/** An interval drawn over the axis: a thick bar, arrows at the infinite ends, and a filled or hollow circle at each finite end */
function SpanBar({ scale, s, y, color }: { scale: Scale; s: Span; y: number; color: string }) {
    const edge = 0.5
    if (s.from !== null && s.from === s.to) return <circle cx={toX(scale, s.from)} cy={y} r={7} fill={color} />
    const lo = Math.max(scale.min - edge, s.from ?? -Infinity)
    const hi = Math.min(scale.max + edge, s.to ?? Infinity)
    if (lo > hi) return null
    const ends = [
        { at: s.from, closed: s.closedFrom },
        { at: s.to, closed: s.closedTo }
    ].filter((end): end is { at: number; closed: boolean } => end.at !== null && end.at >= scale.min - edge && end.at <= scale.max + edge)
    return (
        <g>
            <line x1={toX(scale, lo)} x2={toX(scale, hi)} y1={y} y2={y} stroke={color} strokeWidth={6} strokeLinecap="round" opacity={0.85} />
            {s.from === null && <path d={`M${toX(scale, lo) - 10} ${y} l12 -8 v16 z`} fill={color} />}
            {s.to === null && <path d={`M${toX(scale, hi) + 10} ${y} l-12 -8 v16 z`} fill={color} />}
            {ends.map((end, index) => <circle key={index} cx={toX(scale, end.at)} cy={y} r={7} fill={end.closed ? color : PAPER} stroke={color} strokeWidth={3} />)}
        </g>
    )
}

const relationOptions = RELATIONS.map((relation) => ({ value: relation, label: relation }))

/* ---------- 1. From the roots to the equation ---------- */

export function RootsTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<RootsState>(initialRootsState)
    const sum = rootsSum(state)
    const product = rootsProduct(state)
    const equation = polyLatex(rootsEquation(state))
    const controls = (
        <>
            <Stepper label="a" value={state.a} min={ROOTS_LIMITS.a.min} max={ROOTS_LIMITS.a.max} onChange={(a) => setState((s) => setRoots(s, { a }))} language={props.language} />
            <Stepper label="x₁" value={state.r1} min={ROOTS_LIMITS.root.min} max={ROOTS_LIMITS.root.max} format={signed} onChange={(r1) => setState((s) => setRoots(s, { r1 }))} language={props.language} />
            <Stepper label="x₂" value={state.r2} min={ROOTS_LIMITS.root.min} max={ROOTS_LIMITS.root.max} format={signed} onChange={(r2) => setState((s) => setRoots(s, { r2 }))} language={props.language} />
        </>
    )
    const latex = `${equation}=0`
    const note = state.r1 === state.r2
        ? l(say(`Erro bikoitza: ${signed(state.r1)}. S = ${signed(sum)}, P = ${signed(product)}.`, `Raíz doble: ${signed(state.r1)}. S = ${signed(sum)}, P = ${signed(product)}.`, `جذر مضاعف: ${signed(state.r1)}. S = ${signed(sum)} وP = ${signed(product)}.`, `Double root: ${signed(state.r1)}. S = ${signed(sum)}, P = ${signed(product)}.`))
        : l(say(`Erroak ${signed(state.r1)} eta ${signed(state.r2)}: S = ${signed(sum)}, P = ${signed(product)}.`, `Raíces ${signed(state.r1)} y ${signed(state.r2)}: S = ${signed(sum)}, P = ${signed(product)}.`, `الجذران ${signed(state.r1)} و${signed(state.r2)}: S = ${signed(sum)} وP = ${signed(product)}.`, `Roots ${signed(state.r1)} and ${signed(state.r2)}: S = ${signed(sum)}, P = ${signed(product)}.`))
    const scale: Scale = { ox: 320, unit: 44, min: -6, max: 6 }
    const middle = sum / 2
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={note} />} challenges={rootsChallenges} state={state}>
            <Board height={190} label={l(say('Erroak zuzenean, batura eta biderkadura', 'Las raíces en la recta, su suma y su producto', 'الجذران على المستقيم ومجموعهما وجداؤهما', 'The roots on the number line, their sum and their product'))}>
                <rect x={60} y={14} width={240} height={42} rx={10} fill={STAGE_TINT} stroke={INK} strokeWidth={1.4} />
                <Text x={180} y={42} size={18}>{`S = x₁ + x₂ = ${signed(sum)}`}</Text>
                <rect x={340} y={14} width={240} height={42} rx={10} fill={MUSTARD_TINT} stroke={INK} strokeWidth={1.4} />
                <Text x={460} y={42} size={18}>{`P = x₁ · x₂ = ${signed(product)}`}</Text>
                <Axis scale={scale} y={130} />
                <line x1={toX(scale, middle)} x2={toX(scale, middle)} y1={84} y2={130} stroke={MUTED} strokeWidth={1.4} strokeDasharray="4 4" />
                <Text x={toX(scale, middle)} y={80} size={13} color={MUTED} weight={400}>S/2</Text>
                {[state.r1, state.r2].map((root, index) => <circle key={index} cx={toX(scale, root)} cy={130} r={8} fill={SECOND} stroke={PAPER} strokeWidth={2} />)}
                <Text x={toX(scale, state.r1)} y={112} size={15} color={SECOND}>{state.r1 === state.r2 ? 'x₁ = x₂' : 'x₁'}</Text>
                {state.r1 !== state.r2 && <Text x={toX(scale, state.r2)} y={112} size={15} color={SECOND}>x₂</Text>}
                <Text x={320} y={184} size={15} color={STAGE} weight={400}>{`${state.a === 1 ? '' : state.a}(x² ${sum > 0 ? '−' : '+'} ${Math.abs(sum)}x ${product < 0 ? '−' : '+'} ${Math.abs(product)}) = 0`}</Text>
            </Board>
        </ToolFrame>
    )
}

/* ---------- 2. The two t of a biquadratic ---------- */

/** What one t gives: x = ±2, x = ±√5, x = 0 or nothing */
function xLabel(t: number): string {
    if (t < 0) return '∅'
    if (t === 0) return 'x = 0'
    const root = Math.sqrt(t)
    return Number.isInteger(root) ? `x = ±${root}` : `x = ±√${t}`
}

export function BiquadraticTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<BiquadraticState>(initialBiquadraticState)
    const solutions = biquadraticSolutions(state)
    const controls = (
        <>
            <Stepper label="t₁" value={state.t1} min={T_LIMITS.min} max={T_LIMITS.max} format={signed} onChange={(t1) => setState((s) => setBiquadratic(s, { t1 }))} language={props.language} />
            <Stepper label="t₂" value={state.t2} min={T_LIMITS.min} max={T_LIMITS.max} format={signed} onChange={(t2) => setState((s) => setBiquadratic(s, { t2 }))} language={props.language} />
        </>
    )
    const latex = `${biquadraticLatex(state)}=0`
    const count = solutions.length
    const note = count === 0
        ? l(say('Bi t-ak negatiboak: ez dago ebazpen errealik.', 'Las dos t son negativas: no hay soluciones reales.', 'قيمتا t سالبتان: لا حلول حقيقية.', 'Both t values are negative: there are no real solutions.'))
        : l(say(`${count} ebazpen. t = x²: t negatiboak ez du x-rik ematen.`, `${count} ${count === 1 ? 'solución' : 'soluciones'}. t = x²: una t negativa no da ninguna x.`, `عدد الحلول: ${count}. t = x²: لا تعطي t السالبة أي x.`, `${count} ${count === 1 ? 'solution' : 'solutions'}. t = x²: a negative t gives no x.`))
    const scale: Scale = { ox: 320, unit: 70, min: -4, max: 4 }
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={note} />} challenges={biquadraticChallenges} state={state}>
            <Board height={226} label={l(say('t bakoitzak ematen dituen x-ak', 'Las x que da cada t', 'قيم x التي تعطيها كل t', 'The x values that each t gives'))}>
                <Text x={320} y={24} size={17} color={STAGE}>{`t = x²  →  ${plain(resolventLatex(state))} = 0`}</Text>
                {[state.t1, state.t2].map((t, index) => (
                    <g key={index}>
                        <rect x={110} y={40 + index * 50} width={130} height={38} rx={10} fill={t < 0 ? MUSTARD_TINT : STAGE_TINT} stroke={INK} strokeWidth={1.4} />
                        <Text x={175} y={66 + index * 50} size={18}>{`t${index ? '₂' : '₁'} = ${signed(t)}`}</Text>
                        <path d={`M256 ${59 + index * 50} h70 l-10 -7 m10 7 l-10 7`} fill="none" stroke={MUTED} strokeWidth={2} />
                        <Text x={344} y={66 + index * 50} size={18} anchor="start" color={t < 0 ? SECOND : GREEN}>{xLabel(t)}</Text>
                    </g>
                ))}
                <Axis scale={scale} y={176} />
                {solutions.filter((x) => Math.abs(x) <= scale.max + 0.4).map((x) => <circle key={x} cx={toX(scale, x)} cy={176} r={8} fill={GREEN} stroke={PAPER} strokeWidth={2} />)}
            </Board>
        </ToolFrame>
    )
}

/* ---------- 3. Two exponents that meet ---------- */

/** b^e as text: 2⁵ = 32, 5⁻² = 1/25 */
function powerText(base: number, exponent: number) {
    const value = exponent >= 0 ? String(base ** exponent) : `1/${base ** -exponent}`
    return `${base}${plain(`^{${exponent}}`)} = ${value}`
}

export function ExponentialTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<ExponentialState>(initialExponentialState)
    const equation = exponentialEquations[state.equation]
    const [left, right] = exponents(state)
    const meet = left === right
    const controls = (
        <>
            <Segmented label={l(say('Ekuazioa', 'Ecuación', 'المعادلة', 'Equation'))} value={String(state.equation)} options={exponentialEquations.map((_, index) => ({ value: String(index), label: `E${index + 1}` }))} onChange={(index) => setState((s) => setExponential(s, { equation: Number(index) }))} />
            <p className="fraction-v2-lab-tip"><MathText text={`$${equation.latex}\\ \\to\\ ${equation.base}^{${exponentLatex(equation.left)}}=${equation.base}^{${exponentLatex(equation.right)}}$`} /></p>
            <Stepper label="x" value={state.x} min={EXPONENT_X.min} max={EXPONENT_X.max} format={signed} onChange={(x) => setState((s) => setExponential(s, { x }))} language={props.language} />
        </>
    )
    const latex = `${equation.base}^{${left}}${meet ? '=' : '\\ne '}${equation.base}^{${right}}`
    const note = meet
        ? l(say(`Berretzaileak berdinak: x = ${signed(state.x)} ebazpena da.`, `Exponentes iguales: x = ${signed(state.x)} es la solución.`, `الأسّان متساويان: x = ${signed(state.x)} هو الحل.`, `Equal exponents: x = ${signed(state.x)} is the solution.`))
        : l(say(`Berretzaileak: ${signed(left)} eta ${signed(right)}. Mugitu x elkartu arte.`, `Exponentes: ${signed(left)} y ${signed(right)}. Mueve x hasta que se encuentren.`, `الأسّان: ${signed(left)} و${signed(right)}. حرّك x حتى يلتقيا.`, `Exponents: ${signed(left)} and ${signed(right)}. Move x until they meet.`))
    const scale: Scale = { ox: 272, unit: 24, min: -10, max: 14 }
    const visible = (e: number) => Math.max(scale.min - 0.5, Math.min(scale.max + 0.5, e))
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={note} />} challenges={exponentialChallenges} state={state}>
            <Board height={200} label={l(say('Bi berretzaileak zuzen batean', 'Los dos exponentes en una recta', 'الأسّان على مستقيم', 'The two exponents on a number line'))}>
                <Text x={30} y={30} size={16} color={STAGE} anchor="start">{`${plain(`${equation.base}^{${exponentLatex(equation.left)}}`)} → ${powerText(equation.base, left)}`}</Text>
                <Text x={610} y={30} size={16} color={SECOND} anchor="end">{powerText(equation.base, right)}</Text>
                <Axis scale={scale} y={122} step={2} />
                <path d={`M${toX(scale, visible(left))} 110 l-8 -14 h16 z`} fill={meet ? GREEN : STAGE} />
                <Text x={toX(scale, visible(left))} y={88} size={14} color={meet ? GREEN : STAGE}>{signed(left)}</Text>
                <path d={`M${toX(scale, visible(right))} 158 l-8 14 h16 z`} fill={meet ? GREEN : SECOND} />
                <Text x={toX(scale, visible(right))} y={192} size={14} color={meet ? GREEN : SECOND}>{signed(right)}</Text>
                {meet && <circle cx={toX(scale, left)} cy={122} r={11} fill="none" stroke={GREEN} strokeWidth={3} />}
            </Board>
        </ToolFrame>
    )
}

/* ---------- 4. A linear inequality on the number line ---------- */

const fractionLatex = (numerator: number, denominator: number) => (denominator === 1 ? String(numerator) : `${numerator < 0 ? '-' : ''}\\frac{${Math.abs(numerator)}}{${denominator}}`)
const fractionText = (numerator: number, denominator: number) => (denominator === 1 ? signed(numerator) : `${signed(numerator)}/${denominator}`)

export function LinearTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<LinearState>(initialLinearState)
    const { relation, end, flipped } = linearSolution(state)
    const ok = probeHolds(state)
    const controls = (
        <>
            <Stepper label="a" value={state.a} min={LINEAR_LIMITS.a.min} max={LINEAR_LIMITS.a.max} format={signed} onChange={(a) => setState((s) => setLinear(s, { a }))} language={props.language} />
            <Stepper label="b" value={state.b} min={LINEAR_LIMITS.b.min} max={LINEAR_LIMITS.b.max} format={signed} onChange={(b) => setState((s) => setLinear(s, { b }))} language={props.language} />
            <Segmented label={l(say('Zeinua', 'Signo', 'الرمز', 'Sign'))} value={state.relation} options={relationOptions} onChange={(value) => setState((s) => setLinear(s, { relation: value as Relation }))} />
            <Stepper label="c" value={state.c} min={LINEAR_LIMITS.c.min} max={LINEAR_LIMITS.c.max} format={signed} onChange={(c) => setState((s) => setLinear(s, { c }))} language={props.language} />
            <Stepper label={l(say('Probatu x', 'Prueba x', 'جرّب x', 'Try x'))} value={state.probe} min={LINEAR_LIMITS.probe.min} max={LINEAR_LIMITS.probe.max} format={signed} onChange={(probe) => setState((s) => setLinear(s, { probe }))} language={props.language} />
        </>
    )
    const latex = `${linearLeftLatex(state)}${relationLatex[state.relation]}${state.c}\\ \\to\\ x${relationLatex[relation]}${fractionLatex(end.numerator, end.denominator)}`
    const step = `${plain(polyLatex([state.a, 0]))} ${state.relation} ${signed(state.c - state.b)}`
    const divide = flipped
        ? l(say(`${step}. ${signed(state.a)}-z zatitzean (negatiboa), zentzua aldatzen da.`, `${step}. Al dividir entre ${signed(state.a)} (negativo), cambia el sentido.`, `\u2066${step}\u2069. عند القسمة على ${signed(state.a)} (سالب) ينقلب الاتجاه.`, `${step}. Dividing by ${signed(state.a)} (negative) flips the inequality sign.`))
        : l(say(`${step}. ${state.a}-z zatitzean (positiboa), zentzua ez da aldatzen.`, `${step}. Al dividir entre ${state.a} (positivo), el sentido no cambia.`, `\u2066${step}\u2069. عند القسمة على ${state.a} (موجب) لا يتغير الاتجاه.`, `${step}. Dividing by ${state.a} (positive) keeps the inequality sign the same.`))
    const value = state.a * state.probe + state.b
    const check = `x = ${signed(state.probe)}: ${signed(value)} ${state.relation} ${signed(state.c)} ${ok ? '✓' : '✗'}`
    const scale: Scale = { ox: 320, unit: 44, min: -6, max: 6 }
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={divide} />} challenges={linearChallenges} state={state}>
            <Board height={160} label={l(say('Soluzioa zenbaki-zuzenean', 'La solución en la recta numérica', 'الحل على مستقيم الأعداد', 'The solution on the number line'))}>
                <Text x={320} y={26} size={16} color={ok ? GREEN : SECOND}>{check}</Text>
                <Axis scale={scale} y={110} />
                <SpanBar scale={scale} s={linearSpan(state)} y={110} color={STAGE} />
                <path d={`M${toX(scale, state.probe)} 94 l-8 -14 h16 z`} fill={ok ? GREEN : SECOND} />
                <Text x={toX(scale, end.numerator / end.denominator)} y={66} size={14} color={STAGE}>{Math.abs(end.numerator / end.denominator) <= scale.max ? fractionText(end.numerator, end.denominator) : ''}</Text>
            </Board>
        </ToolFrame>
    )
}

/* ---------- 5. Two tariffs ---------- */

const costLatex = ([fixed, rate]: [number, number]) => `${fixed ? `${fixed}+` : ''}${rate === 1 ? '' : rate}x`

export function TariffsTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<TariffsState>(initialTariffsState)
    const scenario = tariffScenarios[state.scenario]
    const [costA, costB] = tariffCosts(state)
    const cross = tariffCross(state.scenario)
    const unit = l(scenario.unit)
    const controls = (
        <>
            <Segmented label={l(say('Egoera', 'Situación', 'الحالة', 'Situation'))} value={String(state.scenario)} options={tariffScenarios.map((item, index) => ({ value: String(index), label: l(item.title) }))} onChange={(index) => setState((s) => setTariffs(s, { scenario: Number(index) }))} />
            <p className="fraction-v2-lab-tip"><MathText text={`$A=${costLatex(scenario.a)}\\qquad B=${costLatex(scenario.b)}$`} /></p>
            <Stepper label={`x (${unit})`} value={state.x} min={TARIFF_X.min} max={TARIFF_X.max} onChange={(x) => setState((s) => setTariffs(s, { x }))} language={props.language} />
        </>
    )
    const latex = `A=${costA}\\ \\text{€}\\quad B=${costB}\\ \\text{€}`
    const note = costA === costB
        ? l(say(`${state.x} ${unit}: berdin kostatzen dira.`, `${state.x} ${unit}: cuestan lo mismo.`, `${state.x} ${unit}: التكلفة متساوية.`, `At ${state.x} ${unit} they cost the same.`))
        : l(say(`${state.x} ${unit}: ${costA < costB ? 'A' : 'B'} merkeagoa da. Zuzenak ${decimal(cross.numerator / cross.denominator, props.language)}-n gurutzatzen dira.`, `${state.x} ${unit}: es más barata la ${costA < costB ? 'A' : 'B'}. Las rectas se cruzan en ${decimal(cross.numerator / cross.denominator, props.language)}.`, `${state.x} ${unit}: ${costA < costB ? 'A' : 'B'} أرخص. يتقاطع المستقيمان عند ${decimal(cross.numerator / cross.denominator, props.language)}.`, `At ${state.x} ${unit} plan ${costA < costB ? 'A' : 'B'} is cheaper. The straight lines cross at ${decimal(cross.numerator / cross.denominator, props.language)}.`))
    const ox = 70
    const ux = 26
    const oy = 180
    const top = Math.max(tariffCost(scenario.a, TARIFF_X.max), tariffCost(scenario.b, TARIFF_X.max))
    const uy = 156 / top
    const point = (x: number, cost: number) => `${ox + x * ux},${oy - cost * uy}`
    const crossX = cross.numerator / cross.denominator
    const lines = [
        { name: 'A', rule: scenario.a, cost: costA, color: STAGE },
        { name: 'B', rule: scenario.b, cost: costB, color: SECOND }
    ]
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={note} />} challenges={tariffsChallenges} state={state}>
            <Board height={214} label={l(say('Bi tarifen kostua', 'El coste de las dos tarifas', 'تكلفة التعرفتين', 'The cost of the two plans'))}>
                <line x1={ox} x2={ox + TARIFF_X.max * ux + 10} y1={oy} y2={oy} stroke={INK} strokeWidth={1.6} />
                <line x1={ox} x2={ox} y1={oy} y2={10} stroke={INK} strokeWidth={1.6} />
                {[0, 5, 10, 15, 20].map((x) => <Text key={x} x={ox + x * ux} y={oy + 22} size={12} color={MUTED} weight={400}>{x}</Text>)}
                <Text x={ox - 10} y={20} size={13} color={MUTED} anchor="end" weight={400}>€</Text>
                {crossX >= 0 && crossX <= TARIFF_X.max && <line x1={ox + crossX * ux} x2={ox + crossX * ux} y1={oy} y2={oy - tariffCost(scenario.a, crossX) * uy} stroke={MUTED} strokeWidth={1.2} strokeDasharray="4 4" />}
                {lines.map((line) => (
                    <g key={line.name}>
                        <polyline points={`${point(0, tariffCost(line.rule, 0))} ${point(TARIFF_X.max, tariffCost(line.rule, TARIFF_X.max))}`} fill="none" stroke={line.color} strokeWidth={3} />
                        <Text x={ox + TARIFF_X.max * ux + 14} y={oy - tariffCost(line.rule, TARIFF_X.max) * uy + 6} size={16} color={line.color} anchor="start">{line.name}</Text>
                    </g>
                ))}
                <line x1={ox + state.x * ux} x2={ox + state.x * ux} y1={oy} y2={oy - Math.max(costA, costB) * uy} stroke={INK} strokeWidth={1.2} />
                {lines.map((line) => <circle key={line.name} cx={ox + state.x * ux} cy={oy - line.cost * uy} r={6} fill={line.color} stroke={PAPER} strokeWidth={2} />)}
            </Board>
        </ToolFrame>
    )
}

/* ---------- 6. The sign of a parabola ---------- */

export function SignTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<SignState>(initialSignState)
    const solution = signSolution(state)
    const lo = Math.min(state.r1, state.r2)
    const hi = Math.max(state.r1, state.r2)
    const controls = (
        <>
            <Segmented label="a" value={String(state.a)} options={[{ value: '1', label: 'a > 0' }, { value: '-1', label: 'a < 0' }]} onChange={(value) => setState((s) => setSign(s, { a: value === '1' ? 1 : -1 }))} />
            <Stepper label="x₁" value={state.r1} min={SIGN_ROOT.min} max={SIGN_ROOT.max} format={signed} onChange={(r1) => setState((s) => setSign(s, { r1 }))} language={props.language} />
            <Stepper label="x₂" value={state.r2} min={SIGN_ROOT.min} max={SIGN_ROOT.max} format={signed} onChange={(r2) => setState((s) => setSign(s, { r2 }))} language={props.language} />
            <Segmented label={l(say('Zeinua', 'Signo', 'الرمز', 'Sign'))} value={state.relation} options={relationOptions} onChange={(value) => setState((s) => setSign(s, { relation: value as Relation }))} />
        </>
    )
    const latex = `x\\in ${setLatex(solution)}`
    const inequality = `${plain(polyLatex(signPoly(state)))} ${state.relation} 0`
    const between = state.a > 0 ? l(say('negatiboa', 'negativo', 'سالبة', 'negative')) : l(say('positiboa', 'positivo', 'موجبة', 'positive'))
    const outside = state.a > 0 ? l(say('positiboa', 'positivo', 'موجبة', 'positive')) : l(say('negatiboa', 'negativo', 'سالبة', 'negative'))
    const note = `${props.language === 'ar' ? `\u2066${inequality}\u2069` : inequality}. ` + (lo === hi
        ? l(say(`Erro bikoitza ${signed(lo)}: polinomioa beti ${outside} da, ${signed(lo)}-n izan ezik.`, `Raíz doble ${signed(lo)}: el polinomio es ${outside} siempre, salvo en ${signed(lo)}.`, `جذر مضاعف ${signed(lo)}: الحدودية ${outside} دائمًا إلا عند ${signed(lo)}.`, `Double root ${signed(lo)}: the polynomial is always ${outside}, except at ${signed(lo)}.`))
        : l(say(`Erroen artean ${between}, kanpoan ${outside}.`, `Entre las raíces es ${between} y fuera ${outside}.`, `بين الجذرين ${between} وخارجهما ${outside}.`, `Between the roots it is ${between}, and outside them it is ${outside}.`)))
    const scale: Scale = { ox: 320, unit: 44, min: -6, max: 6 }
    const oy = 78
    const uy = 5
    const points = Array.from({ length: 129 }, (_, k) => -6.4 + k * 0.1).map((x) => `${toX(scale, x)},${Math.max(-200, Math.min(400, oy - signValue(state, x) * uy))}`).join(' ')
    // A + or − in the middle of each piece
    const pieces = lo === hi ? [lo - 2, lo + 2] : [lo - 1.6, (lo + hi) / 2, hi + 1.6]
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={note} />} challenges={signChallenges} state={state}>
            <Board height={232} label={l(say('Parabola eta haren zeinua', 'La parábola y su signo', 'القطع المكافئ وإشارته', 'The parabola and its sign'))}>
                <defs><clipPath id="sign-clip"><rect x={0} y={4} width={640} height={146} /></clipPath></defs>
                <line x1={toX(scale, -6.6)} x2={toX(scale, 6.6)} y1={oy} y2={oy} stroke={MUTED} strokeWidth={1} />
                <polyline points={points} fill="none" stroke={STAGE} strokeWidth={3} clipPath="url(#sign-clip)" />
                {[lo, hi].map((root, index) => <line key={index} x1={toX(scale, root)} x2={toX(scale, root)} y1={oy} y2={190} stroke={MUTED} strokeWidth={1} strokeDasharray="4 4" />)}
                {pieces.filter((x) => Math.abs(x) <= 6.2).map((x, index) => {
                    const positive = signValue(state, x) > 0
                    return <Text key={index} x={toX(scale, x)} y={176} size={22} color={positive ? GREEN : SECOND}>{positive ? '+' : '−'}</Text>
                })}
                <Axis scale={scale} y={194} />
                {solution.map((s, index) => <SpanBar key={index} scale={scale} s={s} y={194} color={GREEN} />)}
            </Board>
        </ToolFrame>
    )
}

/* ---------- 7. Parabola and line ---------- */

export function GraphicTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<GraphicState>(initialGraphicState)
    const crossings = graphicCrossings(state)
    const delta = graphicDiscriminant(state)
    const controls = (
        <>
            <Stepper label="m" value={state.m} min={GRAPHIC_LIMITS.m.min} max={GRAPHIC_LIMITS.m.max} format={signed} onChange={(m) => setState((s) => setGraphic(s, { m }))} language={props.language} />
            <Stepper label="n" value={state.n} min={GRAPHIC_LIMITS.n.min} max={GRAPHIC_LIMITS.n.max} format={signed} onChange={(n) => setState((s) => setGraphic(s, { n }))} language={props.language} />
        </>
    )
    const line = polyLatex([state.m, state.n])
    const exact = Number.isInteger(Math.sqrt(delta))
    const solutionLatex = crossings.length < 2
        ? '\\varnothing'
        : exact
            ? setLatex([span(crossings[0], crossings[1])])
            : `\\Delta=${delta}`
    const latex = `x^{2}<${line}\\ \\to\\ ${solutionLatex}`
    const note = crossings.length === 0
        ? l(say('Ez dira mozten: parabola beti dago zuzenaren gainetik.', 'No se cortan: la parábola está siempre por encima de la recta.', 'لا يتقاطعان: القطع المكافئ دائمًا فوق المستقيم.', 'They do not cross: the parabola is always above the straight line.'))
        : crossings.length === 1
            ? l(say(`Ukitzen dira x = ${decimal(crossings[0], props.language)} puntuan: parabola ez dago inoiz azpian.`, `Se tocan en x = ${decimal(crossings[0], props.language)}: la parábola nunca queda por debajo.`, `يتماسّان عند x = ${decimal(crossings[0], props.language)}: لا يكون القطع المكافئ تحته أبدًا.`, `They touch at x = ${decimal(crossings[0], props.language)}: the parabola never goes below the straight line.`))
            : l(say(`Ebaki-puntuak: x ≈ ${crossings.map((x) => decimal(x, props.language)).join(and(props.language))}. Parabola azpian dago bien artean.`, `Puntos de corte: x ≈ ${crossings.map((x) => decimal(x, props.language)).join(and(props.language))}. La parábola queda por debajo entre ellos.`, `نقطتا التقاطع: x ≈ ${crossings.map((x) => decimal(x, props.language)).join(and(props.language))}. القطع المكافئ تحته بينهما.`, `Intersection points: x ≈ ${crossings.map((x) => decimal(x, props.language)).join(and(props.language))}. The parabola is below the straight line between them.`))
    const scale: Scale = { ox: 320, unit: 60, min: -4, max: 4 }
    const oy = 196
    const uy = 10.5
    const y = (value: number) => Math.max(-200, Math.min(500, oy - value * uy))
    const parabola = Array.from({ length: 91 }, (_, k) => -4.5 + k * 0.1).map((x) => `${toX(scale, x)},${y(x * x)}`).join(' ')
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={note} />} challenges={graphicChallenges} state={state}>
            <Board height={232} label={l(say('y = x² parabola eta zuzena', 'La parábola y = x² y la recta', 'القطع المكافئ y = x² والمستقيم', 'The parabola y = x² and the straight line'))}>
                <defs><clipPath id="graphic-clip"><rect x={0} y={4} width={640} height={228} /></clipPath></defs>
                <Axis scale={scale} y={oy} />
                <line x1={scale.ox} x2={scale.ox} y1={8} y2={oy + 6} stroke={MUTED} strokeWidth={1} />
                {crossings.length === 2 && <SpanBar scale={scale} s={span(crossings[0], crossings[1])} y={oy} color={GREEN} />}
                {crossings.map((x, index) => <line key={index} x1={toX(scale, x)} x2={toX(scale, x)} y1={oy} y2={y(x * x)} stroke={MUTED} strokeWidth={1.2} strokeDasharray="4 4" clipPath="url(#graphic-clip)" />)}
                <polyline points={parabola} fill="none" stroke={STAGE} strokeWidth={3} clipPath="url(#graphic-clip)" />
                <line x1={toX(scale, -4.5)} x2={toX(scale, 4.5)} y1={y(state.m * -4.5 + state.n)} y2={y(state.m * 4.5 + state.n)} stroke={SECOND} strokeWidth={3} clipPath="url(#graphic-clip)" />
                {crossings.map((x, index) => <circle key={index} cx={toX(scale, x)} cy={y(x * x)} r={6} fill={INK} stroke={PAPER} strokeWidth={2} clipPath="url(#graphic-clip)" />)}
                <Text x={600} y={24} size={15} color={STAGE} anchor="end">y = x²</Text>
                <Text x={600} y={46} size={15} color={SECOND} anchor="end">{`y = ${plain(line)}`}</Text>
            </Board>
        </ToolFrame>
    )
}

/* ---------- 8. Two inequalities at once ---------- */

export function SystemTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<SystemState>(initialSystemState)
    const [first, second] = systemSpans(state)
    const solution = systemSolution(state)
    const controls = (
        <>
            <Segmented label={l(say('1. inekuazioa', '1.ª inecuación', 'المتراجحة الأولى', '1st inequality'))} value={state.first} options={relationOptions} onChange={(value) => setState((s) => setSystem(s, { first: value as Relation }))} />
            <Stepper label="p" value={state.p} min={-SYSTEM_LIMIT} max={SYSTEM_LIMIT} format={signed} onChange={(p) => setState((s) => setSystem(s, { p }))} language={props.language} />
            <Segmented label={l(say('2. inekuazioa', '2.ª inecuación', 'المتراجحة الثانية', '2nd inequality'))} value={state.second} options={relationOptions} onChange={(value) => setState((s) => setSystem(s, { second: value as Relation }))} />
            <Stepper label="q" value={state.q} min={-SYSTEM_LIMIT} max={SYSTEM_LIMIT} format={signed} onChange={(q) => setState((s) => setSystem(s, { q }))} language={props.language} />
        </>
    )
    const latex = `x${relationLatex[state.first]}${state.p},\\ x${relationLatex[state.second]}${state.q}\\ \\to\\ ${setLatex(solution)}`
    const note = solution.length === 0
        ? l(say('Ez dute zati komunik: sistemak ez du soluziorik.', 'No tienen parte común: el sistema no tiene solución.', 'لا جزء مشترك: النظام بلا حل.', 'They have no common part: the system has no solution.'))
        : l(say('Berdez, bietan dagoen zatia.', 'En verde, la parte que está en las dos.', 'بالأخضر الجزء الموجود في الاثنين.', 'In green, the part that is in both.'))
    const scale: Scale = { ox: 350, unit: 40, min: -6, max: 6 }
    const rows = [
        { s: first, y: 34, color: STAGE, label: `x ${state.first} ${signed(state.p)}` },
        { s: second, y: 84, color: SECOND, label: `x ${state.second} ${signed(state.q)}` }
    ]
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={note} />} challenges={systemChallenges} state={state}>
            <Board height={184} label={l(say('Bi soluzioak eta haien zati komuna', 'Las dos soluciones y su parte común', 'الحلّان وجزؤهما المشترك', 'The two solutions and their common part'))}>
                {rows.map((row) => (
                    <g key={row.y}>
                        <Text x={14} y={row.y + 6} size={16} color={row.color} anchor="start">{row.label}</Text>
                        <line x1={toX(scale, -6.6)} x2={toX(scale, 6.6)} y1={row.y} y2={row.y} stroke={MUTED} strokeWidth={1} />
                        <SpanBar scale={scale} s={row.s} y={row.y} color={row.color} />
                    </g>
                ))}
                <line x1={toX(scale, -6.6)} x2={toX(scale, 6.6)} y1={112} y2={112} stroke={MUTED} strokeWidth={1} strokeDasharray="4 4" />
                <Text x={14} y={146} size={16} color={GREEN} anchor="start">{l(say('Biak', 'Las dos', 'كلتاهما', 'Both'))}</Text>
                <Axis scale={scale} y={140} />
                {solution.map((s, index) => <SpanBar key={index} scale={scale} s={s} y={140} color={GREEN} />)}
            </Board>
        </ToolFrame>
    )
}
