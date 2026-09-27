import { useId, useState, type ReactNode } from 'react'
import { Segmented, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { chooseOperation, isMulDiv, nodeAt, submitStep, type Expr, type ExprPath, type HierarchyState } from '../../../features/unit-v2/math/expression'
import { formatNatural } from '../format'
import { readNaturalAnswer } from '../numbers'
import { initialSemaphoreState, semaphoreChallenges, semaphoreExercises, startSemaphore, type NaturalsToolProps } from './labTools'

const opSymbol = { '+': '+', '-': '−', '·': '·', ':': ':' } as const

const samePath = (left: ExprPath | null, right: ExprPath) => left !== null && left.length === right.length && left.every((step, index) => step === right[index])

/** The expression as plain text, for the list of earlier steps */
function exprText(expr: Expr): string {
    if (expr.kind === 'num') return formatNatural(expr.value)
    if (expr.kind === 'group') return expr.bracket === 'square' ? `[${exprText(expr.inner)}]` : `(${exprText(expr.inner)})`
    return `${exprText(expr.left)} ${opSymbol[expr.op]} ${exprText(expr.right)}`
}

export function SemaphoreTool(props: NaturalsToolProps) {
    const l = useLabText(props.language)
    const inputId = useId()
    const [state, setState] = useState<HierarchyState>(initialSemaphoreState)
    const { expr, selected, feedback, history } = state
    const done = expr.kind === 'num'
    const record = state.finished[state.exercise]

    /** Operators are buttons in their semaphore colour; brackets are red */
    const render = (node: Expr, path: ExprPath, inSelection: boolean): ReactNode => {
        if (node.kind === 'num') return <span className={`naturals-sem-num ${inSelection ? 'selected' : ''}`} key={path.join('')}>{formatNatural(node.value)}</span>
        if (node.kind === 'group') {
            const [open, close] = node.bracket === 'square' ? ['[', ']'] : ['(', ')']
            return (
                <span className="naturals-sem-group" key={path.join('')}>
                    <span className="naturals-sem-bracket">{open}</span>
                    {render(node.inner, [...path, 'i'], inSelection)}
                    <span className="naturals-sem-bracket">{close}</span>
                </span>
            )
        }
        const chosen = samePath(selected, path)
        return (
            <span className="naturals-sem-bin" key={path.join('')}>
                {render(node.left, [...path, 'l'], inSelection || chosen)}
                <button
                    type="button"
                    className={`naturals-sem-op ${isMulDiv(node.op) ? 'yellow' : 'green'} ${chosen ? 'selected' : ''}`}
                    aria-pressed={chosen}
                    aria-label={`${l({ eu: 'Eragiketa', es: 'Operación', ar: 'العملية' })} ${opSymbol[node.op]}`}
                    onClick={() => setState((current) => chooseOperation(current, path))}
                    disabled={done}
                >
                    {opSymbol[node.op]}
                </button>
                {render(node.right, [...path, 'r'], inSelection || chosen)}
            </span>
        )
    }

    const chosenNode = selected ? nodeAt(expr, selected) : null
    const controls = (
        <>
            <Segmented
                label={l({ eu: 'Eragiketa', es: 'Operación', ar: 'العملية' })}
                value={String(state.exercise)}
                options={semaphoreExercises.map((item) => ({ value: String(item.id), label: `${item.id}${state.finished[item.id] ? ' ✓' : ''}` }))}
                onChange={(next) => setState((current) => startSemaphore(Number(next), current.finished))}
            />
            <button type="button" className="fraction-v2-secondary" onClick={() => setState((current) => startSemaphore(current.exercise, current.finished))}>
                {l({ eu: 'Berriro hasi', es: 'Empezar de nuevo', ar: 'ابدأ من جديد' })}
            </button>
            <ul className="naturals-sem-legend">
                <li className="red">{l({ eu: 'Gorria: parentesiak', es: 'Rojo: paréntesis', ar: 'الأحمر: الأقواس' })}</li>
                <li className="yellow">{l({ eu: 'Horia: · eta :', es: 'Amarillo: · y :', ar: 'الأصفر: · و :' })}</li>
                <li className="green">{l({ eu: 'Berdea: + eta −', es: 'Verde: + y −', ar: 'الأخضر: + و −' })}</li>
            </ul>
            <p className="fraction-v2-lab-tip">
                {l({ eu: `Ordena-akatsak: ${state.orderMistakes} · Kalkulu-akatsak: ${state.calcMistakes}`, es: `Errores de orden: ${state.orderMistakes} · Errores de cálculo: ${state.calcMistakes}`, ar: `أخطاء الترتيب: ${state.orderMistakes} · أخطاء الحساب: ${state.calcMistakes}` })}
            </p>
        </>
    )

    const message = {
        'inside-first': l({ eu: 'Gorria! Egin lehenik parentesi edo kako barrukoa.', es: '¡Rojo! Haz primero lo de dentro del paréntesis o corchete.', ar: 'أحمر! احسب أولًا ما داخل القوس.' }),
        'muldiv-first': l({ eu: 'Oraindik ez: horia berdearen aurretik doa (lehenik · eta :).', es: 'Todavía no: el amarillo va antes que el verde (primero · y :).', ar: 'ليس بعد: الأصفر قبل الأخضر (أولًا · و :).' }),
        'left-first': l({ eu: 'Oraindik ez: kolore bereko eragiketak ezkerretik eskuinera.', es: 'Todavía no: las operaciones del mismo color, de izquierda a derecha.', ar: 'ليس بعد: العمليات من اللون نفسه من اليسار إلى اليمين.' }),
        'wrong-result': l({ eu: 'Emaitza hori ez da zuzena. Egin berriro kalkulua.', es: 'Ese resultado no es correcto. Repite el cálculo.', ar: 'هذه النتيجة غير صحيحة. أعد الحساب.' }),
        unreadable: l({ eu: 'Idatzi zenbaki natural bat, adibidez 24.', es: 'Escribe un número natural, por ejemplo 24.', ar: 'اكتب عددًا طبيعيًا، مثل 24.' })
    }

    return (
        <ToolFrame {...props} controls={controls} challenges={semaphoreChallenges} state={state}>
            <div className="naturals-sem">
                {history.length > 0 && (
                    <ol className="naturals-sem-history" dir="ltr">
                        {history.map((line, index) => <li key={index}>{index > 0 && '= '}{exprText(line)}</li>)}
                    </ol>
                )}
                <div className="naturals-sem-expr" dir="ltr">
                    {history.length > 0 && <span className="naturals-sem-equals">=</span>}
                    {render(expr, [], false)}
                </div>

                {!done && !selected && (
                    <p className="naturals-lab-question">{l({ eu: 'Sakatu lehenik egin behar duzun eragiketaren ikurra.', es: 'Pulsa el signo de la operación que tienes que hacer primero.', ar: 'اضغط رمز العملية التي يجب أن تجريها أولًا.' })}</p>
                )}

                {chosenNode?.kind === 'bin' && chosenNode.left.kind === 'num' && chosenNode.right.kind === 'num' && (
                    <div className="naturals-sem-step">
                        <label htmlFor={inputId} dir="ltr">{formatNatural(chosenNode.left.value)} {opSymbol[chosenNode.op]} {formatNatural(chosenNode.right.value)} =</label>
                        <input
                            id={inputId}
                            value={state.answer}
                            inputMode="numeric"
                            placeholder={l({ eu: 'Adib.: 24', es: 'Ej.: 24', ar: 'مثال: 24' })}
                            onChange={(event) => setState((current) => ({ ...current, answer: event.target.value, feedback: null }))}
                            onKeyDown={(event) => { if (event.key === 'Enter') setState((current) => submitStep(current, false, readNaturalAnswer)) }}
                            autoFocus
                        />
                        <button type="button" className="fraction-v2-primary" onClick={() => setState((current) => submitStep(current, false, readNaturalAnswer))}>{l({ eu: 'Egiaztatu', es: 'Comprobar', ar: 'تحقق' })}</button>
                        <button type="button" className="fraction-v2-hint-button" onClick={() => setState((current) => submitStep(current, true))}>{l({ eu: 'Egin niretzat', es: 'Hazlo por mí', ar: 'احسبها لي' })}</button>
                    </div>
                )}

                <div aria-live="polite">
                    {feedback && <div className={`fraction-v2-feedback ${feedback === 'unreadable' ? '' : 'error'}`}>{message[feedback]}</div>}
                    {done && record && (
                        <div className="fraction-v2-feedback success">
                            {record.order === 0 && record.calc === 0
                                ? l({ eu: 'Amaituta, akatsik gabe!', es: '¡Terminada sin ningún error!', ar: 'انتهت دون أي خطأ!' })
                                : l({ eu: `Amaituta. Ordena-akatsak: ${record.order}; kalkulu-akatsak: ${record.calc}.`, es: `Terminada. Errores de orden: ${record.order}; de cálculo: ${record.calc}.`, ar: `انتهت. أخطاء الترتيب: ${record.order}؛ أخطاء الحساب: ${record.calc}.` })}
                        </div>
                    )}
                </div>
            </div>
        </ToolFrame>
    )
}
