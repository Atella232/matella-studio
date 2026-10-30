import { useId, useState, type ReactNode } from 'react'
import { Segmented, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { signed } from '../format'
import { englishDigits } from '../../../utils/numberFormat'
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
    /** English types thousands with commas (15,000): read them as 15000 before checking */
    const readAnswer = (input: string) => (props.language === 'en' ? englishDigits(input) : input)
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
                    aria-label={`${l({ eu: 'Eragiketa', es: 'Operación', en: 'Operation', ar: 'العملية' })} ${opSymbol[node.op]}`}
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
                label={l({ eu: 'Eragiketa', es: 'Operación', en: 'Operation', ar: 'العملية' })}
                value={String(state.exercise)}
                options={hierarchyExercises.map((item) => ({ value: String(item.id), label: `${item.id}${state.finished[item.id] ? ' ✓' : ''}` }))}
                onChange={(next) => setState((current) => startHierarchy(Number(next), current.finished))}
            />
            <button type="button" className="fraction-v2-secondary" onClick={() => setState((current) => startHierarchy(current.exercise, current.finished))}>
                {l({ eu: 'Berriro hasi', es: 'Empezar de nuevo', en: 'Start again', ar: 'ابدأ من جديد' })}
            </button>
            <p className="fraction-v2-lab-tip">
                {l({ eu: `Ordena-akatsak: ${state.orderMistakes} · Kalkulu-akatsak: ${state.calcMistakes}`, es: `Errores de orden: ${state.orderMistakes} · Errores de cálculo: ${state.calcMistakes}`, en: `Order mistakes: ${state.orderMistakes} · Calculation mistakes: ${state.calcMistakes}`, ar: `أخطاء الترتيب: ${state.orderMistakes} · أخطاء الحساب: ${state.calcMistakes}` })}
            </p>
        </>
    )

    const message = {
        'inside-first': l({ eu: 'Oraindik ez: egin lehenik parentesi edo kako barrukoa.', es: 'Todavía no: haz primero lo de dentro del paréntesis o corchete.', en: 'Not yet: do the part inside the brackets first.', ar: 'ليس بعد: احسب أولًا ما داخل القوس.' }),
        'muldiv-first': l({ eu: 'Oraindik ez: lehenik biderketak eta zatiketak.', es: 'Todavía no: primero los productos y cocientes.', en: 'Not yet: do products and quotients first.', ar: 'ليس بعد: الضرب والقسمة أولًا.' }),
        'left-first': l({ eu: 'Oraindik ez: maila bereko eragiketak ezkerretik eskuinera egiten dira.', es: 'Todavía no: las operaciones del mismo nivel se hacen de izquierda a derecha.', en: 'Not yet: operations at the same level are done from left to right.', ar: 'ليس بعد: العمليات من المستوى نفسه تُجرى من اليسار إلى اليمين.' }),
        'wrong-result': l({ eu: 'Emaitza hori ez da zuzena. Begiratu zeinuak.', es: 'Ese resultado no es correcto. Revisa los signos.', en: 'That result is not correct. Check the signs.', ar: 'هذه النتيجة غير صحيحة. راجع الإشارات.' }),
        unreadable: l({ eu: 'Idatzi zenbaki oso bat, adibidez −7.', es: 'Escribe un número entero, por ejemplo −7.', en: 'Write an integer, for example −7.', ar: 'اكتب عددًا صحيحًا، مثل ⁦−7⁩.' })
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
                    <p className="integers-lab-question">{l({ eu: 'Sakatu lehenik egin behar duzun eragiketaren ikurra.', es: 'Pulsa el signo de la operación que tienes que hacer primero.', en: 'Press the sign of the operation you need to do first.', ar: 'اضغط رمز العملية التي يجب أن تجريها أولًا.' })}</p>
                )}

                {chosenNode?.kind === 'bin' && chosenNode.left.kind === 'num' && chosenNode.right.kind === 'num' && (
                    <div className="integers-hier-step">
                        <label htmlFor={inputId} dir="ltr">{numText({ ...chosenNode.left, paren: true })} {opSymbol[chosenNode.op]} {numText({ ...chosenNode.right, paren: true })} =</label>
                        <input
                            id={inputId}
                            value={state.answer}
                            inputMode="text"
                            placeholder={l({ eu: 'Adib.: −7', es: 'Ej.: −7', en: 'Example: −7', ar: 'مثال: ⁦−7⁩' })}
                            onChange={(event) => setState((current) => ({ ...current, answer: event.target.value, feedback: null }))}
                            onKeyDown={(event) => { if (event.key === 'Enter') setState((current) => submitStep(current, false, readAnswer)) }}
                            autoFocus
                        />
                        <button type="button" className="fraction-v2-primary" onClick={() => setState((current) => submitStep(current, false, readAnswer))}>{l({ eu: 'Egiaztatu', es: 'Comprobar', en: 'Check', ar: 'تحقق' })}</button>
                        <button type="button" className="fraction-v2-hint-button" onClick={() => setState((current) => submitStep(current, true))}>{l({ eu: 'Egin niretzat', es: 'Hazlo por mí', en: 'Do it for me', ar: 'احسبها لي' })}</button>
                    </div>
                )}

                <div aria-live="polite">
                    {feedback && <div className={`fraction-v2-feedback ${feedback === 'unreadable' ? '' : 'error'}`}>{message[feedback]}</div>}
                    {done && record && (
                        <div className="fraction-v2-feedback success">
                            {record.order === 0 && record.calc === 0
                                ? l({ eu: 'Amaituta, akatsik gabe!', es: '¡Terminada sin ningún error!', en: 'Finished without any mistakes!', ar: 'انتهت دون أي خطأ!' })
                                : l({ eu: `Amaituta. Ordena-akatsak: ${record.order}; kalkulu-akatsak: ${record.calc}.`, es: `Terminada. Errores de orden: ${record.order}; de cálculo: ${record.calc}.`, en: `Finished. Order mistakes: ${record.order}; calculation mistakes: ${record.calc}.`, ar: `انتهت. أخطاء الترتيب: ${record.order}؛ أخطاء الحساب: ${record.calc}.` })}
                        </div>
                    )}
                </div>
            </div>
        </ToolFrame>
    )
}
