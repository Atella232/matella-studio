import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { equals } from '../math/fraction'
import {
    currentTokens,
    EXPRESSION_PRESETS,
    expressionChallenges,
    expressionDone,
    expressionLatex,
    expressionValue,
    initialExpressionState,
    loadExpression,
    needsBrackets,
    numberLatex,
    readyTargets,
    tapExpression,
    toggleExpressionHint,
    type ExpressionState,
    type ExprFeedback,
    type ExprMistake,
    type ExprOp
} from './expression'
import type { ToolProps } from './labTools'
import { Stepper, ToolFrame } from './LabKit'
import { useLabText } from './useLabText'
import './Expression.css'
import './Motion.css'

const opSymbols: Record<ExprOp, string> = { '+': '+', '-': '−', '·': '·', ':': '÷' }

const opNames: Record<ExprOp | 'power', { eu: string; es: string; en: string; ar: string }> = {
    '+': { eu: 'batuketa', es: 'la suma', en: 'the addition', ar: 'الجمع' },
    '-': { eu: 'kenketa', es: 'la resta', en: 'the subtraction', ar: 'الطرح' },
    '·': { eu: 'biderketa', es: 'la multiplicación', en: 'the multiplication', ar: 'الضرب' },
    ':': { eu: 'zatiketa', es: 'la división', en: 'the division', ar: 'القسمة' },
    power: { eu: 'berretura', es: 'la potencia', en: 'the power', ar: 'القوة' }
}

const mistakeRules: Record<ExprMistake, { eu: string; es: string; en: string; ar: string }> = {
    parentheses: { eu: 'Lehenik, parentesi barrukoa.', es: 'Primero, lo que hay dentro del paréntesis.', en: 'First, what is inside the brackets.', ar: 'أولًا ما بداخل القوسين.' },
    power: { eu: 'Lehenik, berreturak.', es: 'Primero, las potencias.', en: 'First, the powers.', ar: 'أولًا القوى.' },
    precedence: { eu: 'Biderketak eta zatiketak batuketen eta kenketen aurretik egiten dira.', es: 'Las multiplicaciones y divisiones van antes que las sumas y restas.', en: 'Multiplications and divisions come before additions and subtractions.', ar: 'الضرب والقسمة قبل الجمع والطرح.' },
    'left-to-right': { eu: 'Maila bereko eragiketak ezkerretik eskuinera egiten dira.', es: 'Las operaciones del mismo nivel se hacen de izquierda a derecha.', en: 'Operations at the same level are done from left to right.', ar: 'العمليات من المستوى نفسه تُنجز من اليسار إلى اليمين.' }
}

export function ExpressionTool(props: ToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<ExpressionState>(initialExpressionState)
    const tokens = currentTokens(state)
    const done = expressionDone(state)
    const result = expressionValue(state.lines[0])
    const ready = readyTargets(tokens)
    const mistake = state.feedback?.kind === 'mistake' ? state.feedback : null
    const tap = (target: number) => setState((current) => tapExpression(current, target))

    const controls = (
        <>
            <Stepper
                label={l({ eu: `Adierazpena (1–${EXPRESSION_PRESETS.length})`, es: `Expresión (1–${EXPRESSION_PRESETS.length})`, en: `Expression (1–${EXPRESSION_PRESETS.length})`, ar: `العبارة (1–${EXPRESSION_PRESETS.length})` })}
                value={state.preset + 1}
                min={1}
                max={EXPRESSION_PRESETS.length}
                onChange={(next) => setState(loadExpression(next - 1))}
                language={props.language}
            />
            <div className="fraction-v2-lab-quick-actions">
                <button type="button" onClick={() => setState((current) => loadExpression(current.preset))}>{l({ eu: 'Hasi berriro', es: 'Empezar de nuevo', en: 'Start again', ar: 'ابدأ من جديد' })}</button>
            </div>
            <div className="fraction-v2-lab-quick-actions">
                <button type="button" aria-pressed={state.hint} disabled={done} onClick={() => setState(toggleExpressionHint)}>{l({ eu: 'Zer egin dezaket orain?', es: '¿Qué puedo hacer ahora?', en: 'What can I do now?', ar: 'ماذا يمكنني أن أفعل الآن؟' })}</button>
            </div>
        </>
    )

    /** An operator or exponent button, lit when it can be done (hint) or when it goes first (after a mistake) */
    const action = (target: number, label: string, name: { eu: string; es: string; en: string; ar: string }, className: string): ReactNode => {
        const lit = (state.hint && ready.includes(target)) || (mistake?.focus.includes(target) ?? false)
        const wrong = mistake?.target === target
        return (
            <button
                type="button"
                key={`${state.lines.length}-${target}`}
                className={`${className} ${lit ? 'lit' : ''} ${wrong ? 'wrong' : ''}`}
                aria-label={l({ eu: `Egin ${name.eu}`, es: `Hacer ${name.es}`, en: `Do ${name.en}`, ar: `أجرِ ${name.ar}` })}
                onClick={() => tap(target)}
            >
                {label}
            </button>
        )
    }

    const board = tokens.map((token, index) => {
        switch (token.kind) {
            case 'num': {
                const base = <MathText text={`$${numberLatex(token.value, needsBrackets(token, tokens[index - 1]))}$`} />
                if (!token.exponent) return <span className="expr-num" key={index}>{base}</span>
                return (
                    <span className="expr-num expr-power" key={index}>
                        {base}
                        {action(index, String(token.exponent), opNames.power, 'expr-exp')}
                    </span>
                )
            }
            case 'op':
                return action(index, opSymbols[token.op], opNames[token.op], 'expr-op')
            case 'open':
                return <span className="expr-paren" key={index} aria-hidden="true">(</span>
            case 'close':
                return (
                    <span className="expr-power" key={index}>
                        <span className="expr-paren" aria-hidden="true">)</span>
                        {token.exponent && action(index, String(token.exponent), opNames.power, 'expr-exp')}
                    </span>
                )
        }
    })

    const readout = (
        <div className="expr-readout">
            <ol className="expr-lines">
                {state.lines.map((line, index) => (
                    <li key={index}><MathText text={`$${index > 0 ? '=' : ''}${expressionLatex(line)}$`} /></li>
                ))}
            </ol>
            <p className="expr-mistakes">{l({ eu: `Akatsak: ${state.mistakes}`, es: `Errores: ${state.mistakes}`, en: `Mistakes: ${state.mistakes}`, ar: `الأخطاء: ${state.mistakes}` })}</p>
        </div>
    )

    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={expressionChallenges} state={state}>
            <div className="expr">
                <div className="expr-board" aria-label={l({ eu: 'Adierazpena', es: 'La expresión', en: 'The expression', ar: 'العبارة' })}>{board}</div>
                <div className="expr-order">
                    <ol aria-label={l({ eu: 'Eragiketen ordena', es: 'El orden de las operaciones', en: 'The order of operations', ar: 'ترتيب العمليات' })}>
                        <li aria-label={l({ eu: 'Parentesiak', es: 'Paréntesis', en: 'Brackets', ar: 'الأقواس' })}>( )</li>
                        <li aria-label={l({ eu: 'Berreturak', es: 'Potencias', en: 'Powers', ar: 'القوى' })}>aⁿ</li>
                        <li aria-label={l({ eu: 'Biderketak eta zatiketak', es: 'Multiplicaciones y divisiones', en: 'Multiplication and division', ar: 'الضرب والقسمة' })}>· ÷</li>
                        <li aria-label={l({ eu: 'Batuketak eta kenketak', es: 'Sumas y restas', en: 'Adding and subtracting', ar: 'الجمع والطرح' })}>+ −</li>
                    </ol>
                    <p>{l({ eu: 'Maila berean: ezkerretik eskuinera.', es: 'Mismo nivel: de izquierda a derecha.', en: 'Same level: left to right.', ar: 'في المستوى نفسه: من اليسار إلى اليمين.' })}</p>
                </div>
                <p className="fraction-v2-insight">
                    {done
                        ? l({ eu: 'Adierazpena zenbaki bakar bat da orain.', es: 'La expresión ya es un solo número.', en: 'The expression is already a single number.', ar: 'أصبحت العبارة عددًا واحدًا.' })
                        : l({ eu: 'Sakatu lehenengo egin behar den eragiketa.', es: 'Toca la operación que va primero.', en: 'Tap the operation that goes first.', ar: 'اضغط العملية التي تأتي أولًا.' })}
                </p>
                <div aria-live="polite">
                    {done
                        ? <DoneMessage state={state} result={result} language={props.language} />
                        : state.feedback && <FeedbackMessage feedback={state.feedback} result={result} language={props.language} />}
                </div>
            </div>
        </ToolFrame>
    )
}

function FeedbackMessage({ feedback, result, language }: { feedback: ExprFeedback; result: ReturnType<typeof expressionValue>; language: ToolProps['language'] }) {
    const l = useLabText(language)
    if (feedback.kind === 'step') {
        return (
            <div className="fraction-v2-feedback success expr-feedback">
                <strong>{l({ eu: 'Ondo:', es: 'Bien:', en: 'Correct:', ar: 'أحسنت:' })}</strong>
                <MathText text={`$${expressionLatex(feedback.operation)}=${numberLatex(feedback.result)}$`} />
            </div>
        )
    }
    const wrong = feedback.wrong && `$${numberLatex(feedback.wrong)}$`
    return (
        <div className="fraction-v2-feedback error expr-feedback">
            <strong>{l({ eu: 'Itxaron:', es: 'Espera:', en: 'Wait:', ar: 'انتظر:' })}</strong>
            {feedback.reasons.map((reason) => l(mistakeRules[reason])).join(' ')}
            {wrong && (
                <p>
                    <MathText text={equals(feedback.wrong!, result)
                        ? l({ eu: 'Kasu honetan emaitza bera litzateke, baina ordena errespetatzen da.', es: 'En este caso el resultado coincidiría, pero se respeta el orden.', en: 'In this case the result would be the same, but the order is still followed.', ar: 'في هذه الحالة تتساوى النتيجة، لكننا نحترم الترتيب.' })
                        : l({ eu: `Orain eginez gero, amaieran ${wrong} aterako litzateke: beste emaitza bat.`, es: `Si la hicieras ahora, al final saldría ${wrong}: otro resultado.`, en: `If you did it now, the final answer would be ${wrong}: a different result.`, ar: `لو أجريتها الآن لكانت النتيجة في النهاية ${wrong}، وهي نتيجة مختلفة.` })} />
                </p>
            )}
        </div>
    )
}

function DoneMessage({ state, result, language }: { state: ExpressionState; result: ReturnType<typeof expressionValue>; language: ToolProps['language'] }) {
    const l = useLabText(language)
    const value = `$${numberLatex(result)}$`
    return (
        <div className={`fraction-v2-feedback ${state.mistakes === 0 ? 'success' : 'form'} expr-feedback`}>
            <MathText text={state.mistakes === 0
                ? l({ eu: `Emaitza: ${value}. Akatsik gabe!`, es: `Resultado: ${value}. ¡Sin ningún error!`, en: `Result: ${value}. Without any mistakes!`, ar: `النتيجة: ${value}. من دون أي خطأ!` })
                : l({ eu: `Emaitza: ${value}. Akatsak: ${state.mistakes}. Hasi berriro akatsik gabe egiteko.`, es: `Resultado: ${value}. Errores: ${state.mistakes}. Empieza de nuevo para hacerlo sin errores.`, en: `Result: ${value}. Mistakes: ${state.mistakes}. Start again to do it without mistakes.`, ar: `النتيجة: ${value}. الأخطاء: ${state.mistakes}. ابدأ من جديد لتنجزها من دون أخطاء.` })} />
        </div>
    )
}
