import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { ResultAnswer, Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabChallenge, LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { fraction } from '../../../features/unit-v2/math/fraction'
import { linearLatex, termsLatex } from '../algebra'
import {
    balanceChallenges,
    balanceExercises,
    balanceSolved,
    chooseTranslation,
    divideByBoxes,
    groupTerms,
    initialBalanceState,
    initialMachineState,
    initialTilesState,
    initialTranslateState,
    initialTrialState,
    MACHINE_LIMITS,
    machineChallenges,
    machineExpressions,
    machineValue,
    phraseCards,
    removeUnit,
    setMachine,
    setTiles,
    setTrialEquation,
    startBalance,
    TILE_LIMIT,
    tilesChallenges,
    tilesResult,
    translateChallenges,
    translatedRight,
    TRIAL_LIMITS,
    trialChallenges,
    trialEquations,
    trialSides,
    tryValue,
    type BalanceState,
    type MachineExpression,
    type MachineState,
    type TileGroup,
    type TilesState,
    type TranslateState,
    type TrialState
} from './labTools'

const signed = (value: number) => (value < 0 ? `−${-value}` : String(value))

/** A stable, shuffled-looking order of the three options of each card */
const optionOrder = (id: string) => [0, 1, 2].sort((a, b) => ((a * 7 + id.length) % 3) - ((b * 7 + id.length) % 3))

/* ---------- Translate ---------- */

export function TranslateTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<TranslateState>(initialTranslateState)
    const right = translatedRight(state)

    const controls = (
        <>
            <p className="fraction-v2-lab-tip">{l({ eu: 'Esaldi bakoitzerako, aukeratu adierazpen aljebraiko zuzena.', es: 'Para cada frase, elige la expresión algebraica correcta.', ar: 'لكل جملة اختر العبارة الجبرية الصحيحة.' })}</p>
            <p className="algebra-lab-score">{l({ eu: `Ondo: ${right} / ${phraseCards.length} · Akatsak: ${state.mistakes}`, es: `Bien: ${right} / ${phraseCards.length} · Errores: ${state.mistakes}`, ar: `صحيحة: ${right} / ${phraseCards.length} · الأخطاء: ${state.mistakes}` })}</p>
            <button type="button" className="fraction-v2-secondary" onClick={() => setState(initialTranslateState)}>{l({ eu: 'Berriro hasi', es: 'Empezar de nuevo', ar: 'ابدأ من جديد' })}</button>
        </>
    )

    return (
        <ToolFrame {...props} controls={controls} challenges={translateChallenges} state={state}>
            <ul className="algebra-lab-cards">
                {phraseCards.map((card) => {
                    const chosen = state.answers[card.id]
                    const status = chosen === undefined ? '' : chosen === card.options[0] ? 'right' : 'wrong'
                    return (
                        <li className={status} key={card.id}>
                            <p>{l(card.phrase)}</p>
                            <div role="group" aria-label={l(card.phrase)}>
                                {optionOrder(card.id).map((index) => (
                                    <button type="button" aria-pressed={chosen === card.options[index]} disabled={status === 'right'} onClick={() => setState((current) => chooseTranslation(current, card.id, card.options[index]))} key={index}>
                                        <MathText text={`$${card.options[index]}$`} />
                                    </button>
                                ))}
                            </div>
                        </li>
                    )
                })}
            </ul>
        </ToolFrame>
    )
}

/* ---------- The number machine ---------- */

/** The machine of this unit by default; other units pass their expressions, limits for x and challenges */
export function MachineTool({ expressions = machineExpressions, limits = MACHINE_LIMITS, challenges = machineChallenges, ...props }: LabToolProps & { expressions?: MachineExpression[]; limits?: { min: number; max: number }; challenges?: LabChallenge<MachineState>[] }) {
    const l = useLabText(props.language)
    const [state, setState] = useState<MachineState>(initialMachineState)
    const expression = expressions[state.expression]
    const value = machineValue(state, expressions)
    const shown = state.revealed || state.checked

    const controls = (
        <>
            <Segmented
                label={l({ eu: 'Makina', es: 'Máquina', ar: 'الآلة' })}
                value={String(state.expression)}
                options={expressions.map((item, index) => ({ value: String(index), label: item.latex.replace(/\\frac\{x\}\{2\}/, 'x/2').replace(/\^\{2\}/g, '²').replace(/\^\{3\}/g, '³') }))}
                onChange={(next) => setState((current) => setMachine(current, { expression: Number(next) }, expressions, limits))}
            />
            <Stepper label="x" value={state.x} min={limits.min} max={limits.max} format={signed} onChange={(next) => setState((current) => setMachine(current, { x: next }, expressions, limits))} language={props.language} />
        </>
    )

    const written = state.x < 0 ? `(${state.x})` : String(state.x)
    const substituted = expression.latex.replace(/(\d)?x/g, (_, digit?: string) => (digit ? `${digit}\\cdot ${written}` : written))
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main">
                <MathText text={`$${substituted}${shown ? `=${Number.isInteger(value) ? value : `\\frac{${value * 2}}{2}`}` : ''}$`} />
            </span>
            <ResultAnswer
                language={props.language}
                state={state}
                expected={fraction(Math.round(value * 2), 2)}
                placeholder={{ eu: 'Adib.: −11', es: 'Ej.: −11', ar: 'مثال: ⁦−11⁩' }}
                unreadable={{ eu: 'Idatzi zenbaki bat, adibidez −11.', es: 'Escribe un número, por ejemplo −11.', ar: 'اكتب عددًا، مثل ⁦−11⁩.' }}
                onChange={(patch) => setState((current) => ({ ...current, ...patch }))}
            />
        </>
    )

    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={challenges} state={state}>
            <div className="algebra-machine" dir="ltr">
                <span className="algebra-machine-in">x = {signed(state.x)}</span>
                <span className="algebra-machine-arrow">→</span>
                <span className="algebra-machine-box"><MathText text={`$${expression.latex}$`} /></span>
                <span className="algebra-machine-arrow">→</span>
                <span className="algebra-machine-out">{shown ? signed(value) : '?'}</span>
            </div>
        </ToolFrame>
    )
}

/* ---------- Algebra tiles ---------- */

function TileRow({ group, label }: { group: TileGroup; label: string }) {
    const tiles = (count: number, kind: string) => Array.from({ length: Math.abs(count) }, (_, index) => <span className={`algebra-tile ${kind} ${count < 0 ? 'negative' : ''}`} key={`${kind}${index}`} />)
    return (
        <div className="algebra-tile-row" aria-label={label}>
            {tiles(group.squares, 'square')}
            {tiles(group.bars, 'bar')}
            {tiles(group.units, 'unit')}
            {groupTerms(group).length === 0 && <span className="algebra-tile-empty">0</span>}
        </div>
    )
}

/** The tiles of this unit by default; other units pass their starting groups and challenges */
export function TilesTool({ initial = initialTilesState, challenges = tilesChallenges, ...props }: LabToolProps & { initial?: TilesState; challenges?: LabChallenge<TilesState>[] }) {
    const l = useLabText(props.language)
    const [state, setState] = useState<TilesState>(initial)
    const steppers = (which: 'first' | 'second') => (
        <div className="algebra-tile-controls">
            <strong>{which === 'first' ? 'A' : 'B'}</strong>
            <Stepper label="x²" value={state[which].squares} min={-TILE_LIMIT} max={TILE_LIMIT} format={signed} onChange={(next) => setState((current) => setTiles(current, which, { squares: next }))} language={props.language} />
            <Stepper label="x" value={state[which].bars} min={-TILE_LIMIT} max={TILE_LIMIT} format={signed} onChange={(next) => setState((current) => setTiles(current, which, { bars: next }))} language={props.language} />
            <Stepper label="1" value={state[which].units} min={-TILE_LIMIT} max={TILE_LIMIT} format={signed} onChange={(next) => setState((current) => setTiles(current, which, { units: next }))} language={props.language} />
        </div>
    )
    const controls = (
        <>
            {steppers('first')}
            <Segmented label={l({ eu: 'Eragiketa', es: 'Operación', ar: 'العملية' })} value={state.op} options={[{ value: 'add', label: '+' }, { value: 'subtract', label: '−' }]} onChange={(op) => setState((current) => ({ ...current, op }))} />
            {steppers('second')}
        </>
    )
    const first = termsLatex(groupTerms(state.first))
    const second = termsLatex(groupTerms(state.second))
    const readout = (
        <span className="fraction-v2-lab-readout-main">
            <MathText text={`$\\begin{gathered}(${first})${state.op === 'add' ? '+' : '-'}(${second})\\\\=${termsLatex(tilesResult(state))}\\end{gathered}$`} />
        </span>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={challenges} state={state}>
            <div className="algebra-tiles" dir="ltr">
                <TileRow group={state.first} label="A" />
                <span className="algebra-tiles-op">{state.op === 'add' ? '+' : '−'}</span>
                <TileRow group={state.second} label="B" />
                <span className="algebra-tiles-op">=</span>
                <TileRow group={{ squares: tilesResult(state).find((term) => term.power === 2)?.coefficient ?? 0, bars: tilesResult(state).find((term) => term.power === 1)?.coefficient ?? 0, units: tilesResult(state).find((term) => term.power === 0)?.coefficient ?? 0 }} label="=" />
            </div>
            <p className="algebra-tiles-legend">{l({ eu: 'Urdina: positiboa. Gorria: negatiboa. Karratu handia x², barra x, karratu txikia 1.', es: 'Azul: positivo. Rojo: negativo. Cuadrado grande x², barra x, cuadradito 1.', ar: 'الأزرق: موجب. الأحمر: سالب. المربع الكبير x²، الشريط x، المربع الصغير 1.' })}</p>
        </ToolFrame>
    )
}

/* ---------- The balance ---------- */

export function BalanceTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<BalanceState>(initialBalanceState)
    const [warning, setWarning] = useState(false)
    const solved = balanceSolved(state)
    const act = (move: (current: BalanceState) => BalanceState) => {
        const next = move(state)
        setWarning(next.mistakes > state.mistakes)
        setState(next)
    }

    const controls = (
        <>
            <Segmented
                label={l({ eu: 'Ekuazioa', es: 'Ecuación', ar: 'المعادلة' })}
                value={String(state.exercise)}
                options={balanceExercises.map((item) => ({ value: String(item.id), label: `${item.id}${state.finished.includes(item.id) ? ' ✓' : ''}` }))}
                onChange={(next) => { setWarning(false); setState((current) => startBalance(Number(next), current.finished)) }}
            />
            <button type="button" className="fraction-v2-secondary" disabled={solved} onClick={() => act(removeUnit)}>{l({ eu: 'Kendu 1 bi platerretatik', es: 'Quitar 1 de los dos platos', ar: 'أزل 1 من الكفتين' })}</button>
            <button type="button" className="fraction-v2-secondary" disabled={solved} onClick={() => act(divideByBoxes)}>{l({ eu: `Zatitu ${state.left.a} zatitan`, es: `Dividir en ${state.left.a} partes`, ar: `اقسم إلى ${state.left.a} أجزاء` })}</button>
            <button type="button" className="fraction-v2-secondary" onClick={() => { setWarning(false); setState((current) => startBalance(current.exercise, current.finished)) }}>{l({ eu: 'Berriro hasi', es: 'Empezar de nuevo', ar: 'ابدأ من جديد' })}</button>
        </>
    )

    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$${linearLatex(state.left)}=${state.right}$`} /></span>
            <span className="fraction-v2-lab-readout-note">
                {solved
                    ? l({ eu: `Askatuta: x = ${state.right}.`, es: `Despejada: x = ${state.right}.`, ar: `عُزل x: x = ${state.right}.` })
                    : warning
                        ? l({ eu: 'Ezin da: balantza desorekatuko litzateke. Kendu lehenik unitate solteak, edo zatiketa ez da zehatza.', es: 'No se puede: la balanza se desequilibraría. Quita primero las unidades sueltas, o la división no es exacta.', ar: 'لا يمكن: سيختلّ الميزان. أزل أولًا الوحدات المنفردة، أو إن القسمة ليست تامة.' })
                        : l({ eu: 'Utzi x bakarrik ezkerreko platerrean.', es: 'Deja la x sola en el plato de la izquierda.', ar: 'اترك x وحده في الكفة اليسرى.' })}
            </span>
        </>
    )

    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={balanceChallenges} state={state}>
            <div className="algebra-balance" dir="ltr">
                <div className="algebra-balance-beam" />
                <div className="algebra-balance-pans">
                    <div className="algebra-balance-pan">
                        {Array.from({ length: state.left.a }, (_, index) => <span className="algebra-box" key={`x${index}`}>x</span>)}
                        {Array.from({ length: state.left.b }, (_, index) => <span className="algebra-weight" key={`u${index}`} />)}
                    </div>
                    <div className="algebra-balance-pan">
                        {Array.from({ length: state.right }, (_, index) => <span className="algebra-weight" key={index} />)}
                    </div>
                </div>
                <div className="algebra-balance-stand" />
            </div>
        </ToolFrame>
    )
}

/* ---------- Trial and error ---------- */

export function TrialTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<TrialState>(initialTrialState)
    const equation = trialEquations[state.equation]
    const { left, right } = trialSides(state)
    const relation = left === right ? '=' : left < right ? '<' : '>'
    const tried = state.tried[state.equation] ?? []

    const controls = (
        <>
            <Segmented
                label={l({ eu: 'Ekuazioa', es: 'Ecuación', ar: 'المعادلة' })}
                value={String(state.equation)}
                options={trialEquations.map((_, index) => ({ value: String(index), label: `${index + 1}` }))}
                onChange={(next) => setState((current) => setTrialEquation(current, Number(next)))}
            />
            <Stepper label={l({ eu: 'Probatu x =', es: 'Prueba x =', ar: 'جرّب x =' })} value={state.x} min={TRIAL_LIMITS.min} max={TRIAL_LIMITS.max} format={signed} onChange={(next) => setState((current) => tryValue(current, next))} language={props.language} />
            <p className="fraction-v2-lab-tip">{l({ eu: `Probak: ${tried.length ? tried.map(signed).join(', ') : '—'}`, es: `Intentos: ${tried.length ? tried.map(signed).join(', ') : '—'}`, ar: `المحاولات: ${tried.length ? tried.map(signed).join('، ') : '—'}` })}</p>
        </>
    )

    const readout = (
        <span className="fraction-v2-lab-readout-note">
            {relation === '='
                ? l({ eu: `Bi atalek ${signed(left)} balio dute: x = ${signed(state.x)} ebazpena da.`, es: `Los dos miembros valen ${signed(left)}: x = ${signed(state.x)} es la solución.`, ar: `الطرفان يساويان ${signed(left)}: x = ${signed(state.x)} هو الحل.` })
                : relation === '<'
                    ? l({ eu: 'Lehen atala txikiagoa da.', es: 'El primer miembro es menor.', ar: 'الطرف الأول أصغر.' })
                    : l({ eu: 'Lehen atala handiagoa da.', es: 'El primer miembro es mayor.', ar: 'الطرف الأول أكبر.' })}
        </span>
    )

    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={trialChallenges} state={state}>
            <div className="algebra-trial" dir="ltr">
                <p className="algebra-trial-equation"><MathText text={`$${linearLatex(equation.left)}=${linearLatex(equation.right)}$`} /></p>
                <div className="algebra-trial-sides">
                    <span className={relation === '=' ? 'equal' : ''}>{signed(left)}</span>
                    <strong>{relation}</strong>
                    <span className={relation === '=' ? 'equal' : ''}>{signed(right)}</span>
                </div>
            </div>
        </ToolFrame>
    )
}
