import { useId, useState, type ReactNode } from 'react'
import { Segmented, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { signed } from '../format'
import {
    chooseOperation,
    hierarchyChallenges,
    hierarchyExercises,
    initialHierarchyState,
    nodeAt,
    startHierarchy,
    submitStep,
    type Expr,
    type ExprPath,
    type HierarchyState,
    type IntegerToolProps
} from './labTools'

const opSymbol = { '+': '+', '-': '−', '·': '·', ':': ':' } as const

const numText = (expr: Extract<Expr, { kind: 'num' }>) => (expr.paren ? `(${signed(expr.value)})` : signed(expr.value, false))

const samePath = (left: ExprPath | null, right: ExprPath) => left !== null && left.length === right.length && left.every((step, index) => step === right[index])

/** The expression as plain text, for the list of earlier steps */
function exprText(expr: Expr): string {
    if (expr.kind === 'num') return numText(expr)
    if (expr.kind === 'group') return expr.bracket === 'square' ? `[${exprText(expr.inner)}]` : `(${exprText(expr.inner)})`
    return `${exprText(expr.left)} ${opSymbol[expr.op]} ${exprText(expr.right)}`
}

export function HierarchyTool(props: IntegerToolProps) {
    const l = useLabText(props.language)
    const inputId = useId()
    const [state, setState] = useState<HierarchyState>(initialHierarchyState)
    const { expr, selected, feedback, history } = state
    const done = expr.kind === 'num'
    const record = state.finished[state.exercise]

    /** Operators are buttons; the chosen one and its two numbers are highlighted */
    const render = (node: Expr, path: ExprPath, inSelection: boolean): ReactNode => {
        if (node.kind === 'num') return <span className={`integers-hier-num ${inSelection ? 'selected' : ''}`} key={path.join('')}>{numText(node)}</span>
        if (node.kind === 'group') {
            const [open, close] = node.bracket === 'square' ? ['[', ']'] : ['(', ')']
            return (
                <span className="integers-hier-group" key={path.join('')}>
                    <span className="integers-hier-bracket">{open}</span>
                    {render(node.inner, [...path, 'i'], inSelection)}
                    <span className="integers-hier-bracket">{close}</span>
                </span>
            )
        }
        const chosen = samePath(selected, path)
        return (
            <span className="integers-hier-bin" key={path.join('')}>
                {render(node.left, [...path, 'l'], inSelection || chosen)}
                <button
                    type="button"
                    className={`integers-hier-op ${chosen ? 'selected' : ''}`}
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
                options={hierarchyExercises.map((item) => ({ value: String(item.id), label: `${item.id}${state.finished[item.id] ? ' ✓' : ''}` }))}
                onChange={(next) => setState((current) => startHierarchy(Number(next), current.finished))}
            />
            <button type="button" className="fraction-v2-secondary" onClick={() => setState((current) => startHierarchy(current.exercise, current.finished))}>
                {l({ eu: 'Berriro hasi', es: 'Empezar de nuevo', ar: 'ابدأ من جديد' })}
            </button>
            <p className="fraction-v2-lab-tip">
                {l({ eu: `Ordena-akatsak: ${state.orderMistakes} · Kalkulu-akatsak: ${state.calcMistakes}`, es: `Errores de orden: ${state.orderMistakes} · Errores de cálculo: ${state.calcMistakes}`, ar: `أخطاء الترتيب: ${state.orderMistakes} · أخطاء الحساب: ${state.calcMistakes}` })}
            </p>
        </>
    )

    const message = {
        'inside-first': l({ eu: 'Oraindik ez: egin lehenik parentesi edo kako barrukoa.', es: 'Todavía no: haz primero lo de dentro del paréntesis o corchete.', ar: 'ليس بعد: احسب أولًا ما داخل القوس.' }),
        'muldiv-first': l({ eu: 'Oraindik ez: lehenik biderketak eta zatiketak.', es: 'Todavía no: primero los productos y cocientes.', ar: 'ليس بعد: الضرب والقسمة أولًا.' }),
        'left-first': l({ eu: 'Oraindik ez: maila bereko eragiketak ezkerretik eskuinera egiten dira.', es: 'Todavía no: las operaciones del mismo nivel se hacen de izquierda a derecha.', ar: 'ليس بعد: العمليات من المستوى نفسه تُجرى من اليسار إلى اليمين.' }),
        'wrong-result': l({ eu: 'Emaitza hori ez da zuzena. Begiratu zeinuak.', es: 'Ese resultado no es correcto. Revisa los signos.', ar: 'هذه النتيجة غير صحيحة. راجع الإشارات.' }),
        unreadable: l({ eu: 'Idatzi zenbaki oso bat, adibidez −7.', es: 'Escribe un número entero, por ejemplo −7.', ar: 'اكتب عددًا صحيحًا، مثل ⁦−7⁩.' })
    }

    return (
        <ToolFrame {...props} controls={controls} challenges={hierarchyChallenges} state={state}>
            <div className="integers-hier">
                {history.length > 0 && (
                    <ol className="integers-hier-history" dir="ltr">
                        {history.map((line, index) => <li key={index}>{index > 0 && '= '}{exprText(line)}</li>)}
                    </ol>
                )}
                <div className="integers-hier-expr" dir="ltr">
                    {history.length > 0 && <span className="integers-hier-equals">=</span>}
                    {render(expr, [], false)}
                </div>

                {!done && !selected && (
                    <p className="integers-lab-question">{l({ eu: 'Sakatu lehenik egin behar duzun eragiketaren ikurra.', es: 'Pulsa el signo de la operación que tienes que hacer primero.', ar: 'اضغط رمز العملية التي يجب أن تجريها أولًا.' })}</p>
                )}

                {chosenNode?.kind === 'bin' && chosenNode.left.kind === 'num' && chosenNode.right.kind === 'num' && (
                    <div className="integers-hier-step">
                        <label htmlFor={inputId} dir="ltr">{numText({ ...chosenNode.left, paren: true })} {opSymbol[chosenNode.op]} {numText({ ...chosenNode.right, paren: true })} =</label>
                        <input
                            id={inputId}
                            value={state.answer}
                            inputMode="text"
                            placeholder={l({ eu: 'Adib.: −7', es: 'Ej.: −7', ar: 'مثال: ⁦−7⁩' })}
                            onChange={(event) => setState((current) => ({ ...current, answer: event.target.value, feedback: null }))}
                            onKeyDown={(event) => { if (event.key === 'Enter') setState((current) => submitStep(current)) }}
                            autoFocus
                        />
                        <button type="button" className="fraction-v2-primary" onClick={() => setState((current) => submitStep(current))}>{l({ eu: 'Egiaztatu', es: 'Comprobar', ar: 'تحقق' })}</button>
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
