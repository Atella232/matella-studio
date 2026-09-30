import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { ResultAnswer, Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { toExactDecimal, type FractionValue } from '../../../features/unit-v2/math/fraction'
import type { LocalizedText } from '../../../features/unit-v2/types'
import { linearLatex, type Linear } from '../../dbh1-aljebra-v2/algebra'
import {
    answerProblem,
    answerSolver,
    chooseEquation,
    clearedSide,
    clearsAll,
    discriminant,
    equationLcm,
    initialLcmState,
    initialProblemsState,
    initialQuadraticState,
    initialSolverState,
    initialTrialState,
    lcmChallenges,
    lcmEquations,
    lcmSolution,
    MULTIPLIER_LIMITS,
    nextSolverStep,
    planned,
    problemCards,
    problemsChallenges,
    QUADRATIC_LIMITS,
    quadraticChallenges,
    quadraticSolutions,
    setLcm,
    setProblem,
    setQuadratic,
    setSolverEquation,
    setTrialEquation,
    solverChallenges,
    solverEquations,
    solverSolution,
    solverStepCount,
    TRIAL_LIMITS,
    trialChallenges,
    trialEquations,
    trialSides,
    tryValue,
    type FractionTerm,
    type LcmState,
    type ProblemsState,
    type QuadraticState,
    type SolverState,
    type TrialState
} from './labTools'

const INK = 'var(--ink, #1d2733)'
const STAGE = 'var(--stage, #2f6fdb)'
const SECOND = 'var(--second, #c4432a)'
const LINE = 'var(--line, #d6cfc2)'

const signed = (value: number) => (value < 0 ? `−${-value}` : String(value))
const answerTexts = {
    placeholder: { eu: 'Adib.: −3', es: 'Ej.: −3', ar: 'مثال: ⁦−3⁩' },
    unreadable: { eu: 'Idatzi zenbaki bat edo zatiki bat.', es: 'Escribe un número o una fracción.', ar: 'اكتب عددًا أو كسرًا.' }
}

/** A value as LaTeX: integer, exact decimal or fraction */
function valueLatex(value: FractionValue): string {
    if (value.denominator === 1) return String(value.numerator)
    const decimal = toExactDecimal(value, ',')
    return decimal ? decimal.replace(',', '{,}') : `${value.numerator < 0 ? '-' : ''}\\frac{${Math.abs(value.numerator)}}{${value.denominator}}`
}

/* ---------- Trying values ---------- */

export function TrialTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<TrialState>(initialTrialState)
    const equation = trialEquations[state.equation]
    const { left, right } = trialSides(state)
    const relation = left === right ? '=' : left < right ? '<' : '>'
    const tried = state.tried[state.equation] ?? []
    const controls = (
        <>
            <Segmented label={l({ eu: 'Ekuazioa', es: 'Ecuación', ar: 'المعادلة' })} value={String(state.equation)} options={trialEquations.map((_, index) => ({ value: String(index), label: String(index + 1) }))} onChange={(next) => setState((current) => setTrialEquation(current, Number(next)))} />
            <Stepper label={l({ eu: 'Probatu x =', es: 'Prueba x =', ar: 'جرّب x =' })} value={state.x} min={TRIAL_LIMITS.min} max={TRIAL_LIMITS.max} format={signed} onChange={(next) => setState((current) => tryValue(current, next))} language={props.language} />
            <p className="fraction-v2-lab-tip">{l({ eu: `Probak: ${tried.length ? tried.map(signed).join(', ') : '—'}`, es: `Intentos: ${tried.length ? tried.map(signed).join(', ') : '—'}`, ar: `المحاولات: ${tried.length ? tried.map(signed).join('، ') : '—'}` })}</p>
        </>
    )
    const readout = (
        <span className="fraction-v2-lab-readout-note">
            {relation === '='
                ? l({ eu: `Bi atalek ${signed(left)} balio dute: x = ${signed(state.x)} ebazpena da.`, es: `Los dos miembros valen ${signed(left)}: x = ${signed(state.x)} es solución.`, ar: `الطرفان يساويان ${signed(left)}: x = ${signed(state.x)} حل.` })
                : l({ eu: `Ez dira berdinak: x = ${signed(state.x)} ez da ebazpena.`, es: `No son iguales: x = ${signed(state.x)} no es solución.`, ar: `ليسا متساويين: x = ${signed(state.x)} ليس حلًّا.` })}
        </span>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={trialChallenges} state={state}>
            <div className="algebra-trial" dir="ltr">
                <p className="algebra-trial-equation"><MathText text={`$${equation.latex}$`} /></p>
                <div className="algebra-trial-sides">
                    <span className={relation === '=' ? 'equal' : ''}>{signed(left)}</span>
                    <strong>{relation}</strong>
                    <span className={relation === '=' ? 'equal' : ''}>{signed(right)}</span>
                </div>
            </div>
        </ToolFrame>
    )
}

/* ---------- Step-by-step solver ---------- */

interface SolverLine {
    latex: string
    note: LocalizedText
}

function solverLines(index: number): SolverLine[] {
    const equation = solverEquations[index]
    const { left, right } = equation
    const lines: SolverLine[] = [{ latex: equation.latex, note: { eu: 'Hasierako ekuazioa', es: 'Ecuación inicial', ar: 'المعادلة الأصلية' } }]
    if (equation.expanded) lines.push({ latex: equation.expanded, note: { eu: 'Parentesiak kendu', es: 'Quitar paréntesis', ar: 'حذف الأقواس' } })
    const xLeft = [left.a !== 0 ? linearLatex({ a: left.a, b: 0 }) : '', right.a !== 0 ? linearLatex({ a: -right.a, b: 0 }) : ''].filter(Boolean).join('+').replace('+-', '-')
    const numbers = [right.b !== 0 ? String(right.b) : '', left.b !== 0 ? String(-left.b) : ''].filter(Boolean).join('+').replace('+-', '-')
    lines.push({ latex: `${xLeft}=${numbers || '0'}`, note: { eu: 'x-ak ezkerrean, zenbakiak eskuinean (zeinua aldatuz)', es: 'Las x a la izquierda, los números a la derecha (cambiando el signo)', ar: 'x إلى اليسار والأعداد إلى اليمين (مع تغيير الإشارة)' } })
    const a = left.a - right.a
    const b = right.b - left.b
    lines.push({ latex: `${linearLatex({ a, b: 0 })}=${b}`, note: { eu: 'Laburtu', es: 'Reducir', ar: 'التبسيط' } })
    lines.push({ latex: `x=${valueLatex(solverSolution(equation))}`, note: { eu: `Askatu x: ${a} zatitzen pasatzen da`, es: `Despejar x: el ${a} pasa dividiendo`, ar: `عزل x: ينتقل ${a} قاسمًا` } })
    return lines
}

export function SolverTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<SolverState>(initialSolverState)
    const equation = solverEquations[state.equation]
    const lines = solverLines(state.equation)
    const total = solverStepCount(equation)
    const controls = (
        <>
            <Segmented label={l({ eu: 'Ekuazioa', es: 'Ecuación', ar: 'المعادلة' })} value={String(state.equation)} options={solverEquations.map((_, index) => ({ value: String(index), label: String(index + 1) }))} onChange={(next) => setState((current) => setSolverEquation(current, Number(next)))} />
            <button type="button" className="fraction-v2-secondary" disabled={state.shown >= total} onClick={() => setState(nextSolverStep)}>{l({ eu: 'Hurrengo urratsa', es: 'Siguiente paso', ar: 'الخطوة التالية' })}</button>
        </>
    )
    const readout = (
        <ResultAnswer language={props.language} state={state} expected={solverSolution(equation)} placeholder={answerTexts.placeholder} unreadable={answerTexts.unreadable} onChange={(patch) => setState((current) => answerSolver(current, patch))} />
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={solverChallenges} state={state}>
            <ol className="equations-lab-steps">
                {lines.slice(0, state.shown).map((line, index) => (
                    <li key={index}>
                        <span dir="ltr"><MathText text={`$${line.latex}$`} /></span>
                        <small>{l(line.note)}</small>
                    </li>
                ))}
            </ol>
        </ToolFrame>
    )
}

/* ---------- Clearing denominators ---------- */

function termLatex(item: FractionTerm, index: number): string {
    const numerator = linearLatex(item.numerator)
    const sign = item.sign < 0 ? '-' : index === 0 ? '' : '+'
    if (item.denominator === 1) return `${sign}${numerator}`
    return `${sign}\\frac{${numerator}}{${item.denominator}}`
}

function multipliedLatex(item: FractionTerm, index: number, multiplier: number): string {
    const sign = item.sign < 0 ? '-' : index === 0 ? '' : '+'
    const numerator = linearLatex(item.numerator)
    const twoTerms = item.numerator.a !== 0 && item.numerator.b !== 0
    if (multiplier === 1) return termLatex(item, index)
    if (multiplier % item.denominator !== 0) return `${sign}\\frac{${multiplier}\\cdot ${twoTerms ? `(${numerator})` : numerator}}{${item.denominator}}`
    const factor = multiplier / item.denominator
    if (!twoTerms) return `${sign}${linearLatex({ a: factor * item.numerator.a, b: factor * item.numerator.b })}`
    return `${sign}${factor === 1 ? '' : factor}(${numerator})`
}

const sideLatex = (terms: FractionTerm[], render: (item: FractionTerm, index: number) => string) => terms.map(render).join('')

export function LcmTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<LcmState>(initialLcmState)
    const equation = lcmEquations[state.equation]
    const cleared = clearsAll(equation, state.multiplier)
    const lcm = equationLcm(equation)
    const left: Linear = clearedSide(equation.left, state.multiplier)
    const right: Linear = clearedSide(equation.right, state.multiplier)
    const controls = (
        <>
            <Segmented label={l({ eu: 'Ekuazioa', es: 'Ecuación', ar: 'المعادلة' })} value={String(state.equation)} options={lcmEquations.map((_, index) => ({ value: String(index), label: String(index + 1) }))} onChange={(next) => setState((current) => setLcm(current, { equation: Number(next) }))} />
            <Stepper label={l({ eu: 'Biderkatu …z', es: 'Multiplica por', ar: 'اضرب في' })} value={state.multiplier} min={MULTIPLIER_LIMITS.min} max={MULTIPLIER_LIMITS.max} onChange={(next) => setState((current) => setLcm(current, { multiplier: next }))} language={props.language} />
        </>
    )
    const readout = (
        <>
            {cleared && (
                <span className="fraction-v2-lab-readout-main">
                    <MathText text={`$${linearLatex(left)}=${linearLatex(right)}\\ \\to\\ x=${valueLatex(lcmSolution(equation))}$`} />
                </span>
            )}
            <span className="fraction-v2-lab-readout-note">
                {!cleared
                    ? l({ eu: 'Zatikiren bat geratzen da: zenbaki hori ez da izendatzaile guztien multiploa.', es: 'Queda alguna fracción: ese número no es múltiplo de todos los denominadores.', ar: 'بقي كسر: هذا العدد ليس مضاعفًا لكل المقامات.' })
                    : state.multiplier === lcm
                        ? l({ eu: `Zatikirik gabe, zenbakirik txikienarekin: MKTa ${lcm} da.`, es: `Sin fracciones, con el menor número: el m.c.m. es ${lcm}.`, ar: `بلا كسور وبأصغر عدد: م.م.أ هو ${lcm}.` })
                        : l({ eu: `Zatikirik gabe, baina ${lcm} txikiagoa da (MKTa): zenbaki handiagoak geratzen dira.`, es: `Sin fracciones, pero ${lcm} es menor (el m.c.m.): quedan números más grandes.`, ar: `بلا كسور، لكن ${lcm} أصغر (م.م.أ): تبقى أعداد أكبر.` })}
            </span>
        </>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={lcmChallenges} state={state}>
            <div className="equations-lab-lcm" dir="ltr">
                <p><MathText text={`$${sideLatex(equation.left, termLatex)}=${sideLatex(equation.right, termLatex)}$`} /></p>
                <p className="equations-lab-lcm-arrow">↓ × {state.multiplier}</p>
                <p className={cleared ? 'cleared' : ''}><MathText text={`$${sideLatex(equation.left, (item, index) => multipliedLatex(item, index, state.multiplier))}=${sideLatex(equation.right, (item, index) => multipliedLatex(item, index, state.multiplier))}$`} /></p>
            </div>
        </ToolFrame>
    )
}

/* ---------- Planning problems ---------- */

/** A stable order of the three options of each problem */
const optionOrder = (problem: number) => [[1, 0, 2], [2, 1, 0], [0, 2, 1], [1, 2, 0]][problem % 4]

export function ProblemsTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<ProblemsState>(initialProblemsState)
    const card = problemCards[state.problem]
    const chosen = state.chosen[state.problem]
    const ready = planned(state, state.problem)
    const controls = (
        <>
            <Segmented label={l({ eu: 'Buruketa', es: 'Problema', ar: 'المسألة' })} value={String(state.problem)} options={problemCards.map((_, index) => ({ value: String(index), label: String(index + 1) }))} onChange={(next) => setState((current) => setProblem(current, Number(next)))} />
            <p className="fraction-v2-lab-tip">{l({ eu: `Ebatzita: ${state.solved.length} / ${problemCards.length}`, es: `Resueltos: ${state.solved.length} / ${problemCards.length}`, ar: `المحلولة: ${state.solved.length} / ${problemCards.length}` })}</p>
        </>
    )
    const readout = ready
        ? <ResultAnswer language={props.language} state={state} expected={card.answer} placeholder={answerTexts.placeholder} unreadable={answerTexts.unreadable} onChange={(patch) => setState((current) => answerProblem(current, patch))} />
        : <span className="fraction-v2-lab-readout-note">{l({ eu: 'Lehenik aukeratu ekuazio zuzena.', es: 'Primero elige la ecuación correcta.', ar: 'اختر المعادلة الصحيحة أولًا.' })}</span>
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={problemsChallenges} state={state}>
            <div className="equations-lab-problem">
                <p className="equations-lab-statement">{l(card.statement)}</p>
                <p className="equations-lab-unknown">{l(card.unknown)}</p>
                <div className="equations-lab-options" role="group" aria-label={l({ eu: 'Ekuazioa', es: 'Ecuación', ar: 'المعادلة' })}>
                    {optionOrder(state.problem).map((option) => (
                        <button type="button" key={option} aria-pressed={chosen === option} className={chosen === option ? (option === 0 ? 'right' : 'wrong') : ''} onClick={() => setState((current) => chooseEquation(current, option))} dir="ltr">
                            <MathText text={`$${card.options[option]}$`} />
                        </button>
                    ))}
                </div>
                {chosen !== undefined && chosen !== 0 && <p className="fraction-v2-feedback error">{l({ eu: 'Ekuazio horrek ez du enuntziatua itzultzen. Irakurri berriro zatika.', es: 'Esa ecuación no traduce el enunciado. Vuelve a leerlo por partes.', ar: 'هذه المعادلة لا تترجم النص. أعد قراءته جزءًا جزءًا.' })}</p>}
            </div>
        </ToolFrame>
    )
}

/* ---------- The discriminant ---------- */

export function QuadraticTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<QuadraticState>(initialQuadraticState)
    const delta = discriminant(state)
    const roots = quadraticSolutions(state)
    const shown = (value: number) => (Math.abs(value - Math.round(value)) < 1e-9 ? signed(Math.round(value)) : `≈ ${(Math.round(value * 100) / 100).toString().replace('.', props.language === 'ar' ? '.' : ',')}`)
    const equation = `${linearLatex({ a: state.a, b: 0 }).replace('x', 'x^{2}')}${state.b === 0 ? '' : linearLatex({ a: state.b, b: 0 }).startsWith('-') ? linearLatex({ a: state.b, b: 0 }) : `+${linearLatex({ a: state.b, b: 0 })}`}${state.c === 0 ? '' : state.c < 0 ? state.c : `+${state.c}`}=0`
    // Graph: x from −8 to 8, y clipped to the box
    const width = 420
    const height = 260
    const toX = (x: number) => width / 2 + x * 24
    const scaleY = 8
    const toY = (y: number) => height / 2 - y * scaleY
    const points = Array.from({ length: 161 }, (_, step) => -8 + step * 0.1).map((x) => [toX(x), Math.max(-20, Math.min(height + 20, toY(state.a * x * x + state.b * x + state.c)))])
    const controls = (
        <>
            <Stepper label="a" value={state.a} min={QUADRATIC_LIMITS.a.min} max={QUADRATIC_LIMITS.a.max} format={signed} onChange={(next) => setState((current) => setQuadratic(current, { a: next }))} language={props.language} />
            <Stepper label="b" value={state.b} min={QUADRATIC_LIMITS.b.min} max={QUADRATIC_LIMITS.b.max} format={signed} onChange={(next) => setState((current) => setQuadratic(current, { b: next }))} language={props.language} />
            <Stepper label="c" value={state.c} min={QUADRATIC_LIMITS.c.min} max={QUADRATIC_LIMITS.c.max} format={signed} onChange={(next) => setState((current) => setQuadratic(current, { c: next }))} language={props.language} />
        </>
    )
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$${equation}$`} /></span>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$\\Delta=${state.b < 0 ? `(${state.b})` : state.b}^{2}-4\\cdot ${state.a < 0 ? `(${state.a})` : state.a}\\cdot ${state.c < 0 ? `(${state.c})` : state.c}=${delta}$`} /></span>
            <span className="fraction-v2-lab-readout-note">
                {delta > 0
                    ? l({ eu: `Bi ebazpen: x = ${shown(roots[0])} eta x = ${shown(roots[1])}.`, es: `Dos soluciones: x = ${shown(roots[0])} y x = ${shown(roots[1])}.`, ar: `حلان: x = ${shown(roots[0])} وx = ${shown(roots[1])}.` })
                    : delta === 0
                        ? l({ eu: `Ebazpen bat (bikoitza): x = ${shown(roots[0])}.`, es: `Una solución (doble): x = ${shown(roots[0])}.`, ar: `حل واحد (مضاعف): x = ${shown(roots[0])}.` })
                        : l({ eu: 'Δ negatiboa: ez dago ebazpenik.', es: 'Δ negativo: no hay solución.', ar: 'Δ سالب: لا حل.' })}
            </span>
        </>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={quadraticChallenges} state={state}>
            <div className="equations-lab-figure">
                <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`Δ = ${delta}`}>
                    <defs>
                        <clipPath id="equations-parabola-clip"><rect x={0} y={0} width={width} height={height} /></clipPath>
                    </defs>
                    {Array.from({ length: 17 }, (_, index) => index - 8).map((x) => <line key={x} x1={toX(x)} x2={toX(x)} y1={0} y2={height} stroke={LINE} strokeWidth={1} />)}
                    <line x1={0} x2={width} y1={toY(0)} y2={toY(0)} stroke={INK} strokeWidth={2} />
                    <line x1={toX(0)} x2={toX(0)} y1={0} y2={height} stroke={INK} strokeWidth={1.4} />
                    {[-8, -4, 4, 8].map((x) => <text key={x} x={toX(x)} y={toY(0) + 18} textAnchor="middle" fontSize={12} fill={INK}>{x}</text>)}
                    <polyline points={points.map(([x, y]) => `${x},${y}`).join(' ')} fill="none" stroke={STAGE} strokeWidth={3} clipPath="url(#equations-parabola-clip)" />
                    {roots.filter((root) => Math.abs(root) <= 8).map((root, index) => <circle key={index} cx={toX(root)} cy={toY(0)} r={6} fill={SECOND} />)}
                </svg>
            </div>
        </ToolFrame>
    )
}
