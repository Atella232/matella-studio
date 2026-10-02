import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { Segmented, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { toLatex } from '../../../features/unit-v2/math/fraction'
import { chooseExpression, expressionLatex, hierarchyExpressions, initialHierarchyState, isFinished, pickOperation, tokens, type HierarchyState } from './hierarchy'
import { hierarchyChallenges } from './labTools'

/* Zenbaki arrazionalak (3. DBH) — the order of operations: press the sign of the operation that can be done now. */

const symbols = { '+': '+', '-': '−', '·': '·', ':': ':' }

export function HierarchyTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<HierarchyState>(initialHierarchyState)
    const finished = isFinished(state)
    const result = state.tree.kind === 'number' ? toLatex(state.tree.value) : null
    const controls = (
        <>
            <Segmented label={l({ eu: 'Adierazpena', es: 'Expresión', ar: 'التعبير' })} value={String(state.expression)} options={hierarchyExpressions.map((_, index) => ({ value: String(index), label: String(index + 1) }))} onChange={(next) => setState((s) => chooseExpression(s, Number(next)))} />
            <div className="fraction-v2-lab-quick-actions">
                <button type="button" onClick={() => setState((s) => chooseExpression(s, s.expression))}>{l({ eu: 'Hasieratik', es: 'Desde el principio', ar: 'من البداية' })}</button>
            </div>
            <p className="fraction-v2-lab-tip">{l({ eu: 'Sakatu orain egin daitekeen eragiketaren ikurra.', es: 'Pulsa el signo de la operación que toca hacer.', ar: 'اضغط إشارة العملية التي يجب إجراؤها الآن.' })}</p>
        </>
    )
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$${expressionLatex(hierarchyExpressions[state.expression])}${result === null ? '' : `=${result}`}$`} /></span>
            <span className="fraction-v2-lab-readout-note">
                {state.miss !== null
                    ? l({ eu: 'Oraindik ez: eragiketa horren eragigaiek zenbaki izan behar dute lehenik.', es: 'Todavía no: los operandos de esa operación tienen que ser números primero.', ar: 'ليس بعد: يجب أن يكون طرفا هذه العملية عددين أولًا.' })
                    : finished
                        ? state.mistakes === 0 ? l({ eu: 'Akatsik gabe!', es: '¡Sin fallos!', ar: 'دون أخطاء!' }) : l({ eu: `Amaituta. Akatsak: ${state.mistakes}.`, es: `Terminado. Fallos: ${state.mistakes}.`, ar: `انتهى. الأخطاء: ${state.mistakes}.` })
                        : l({ eu: 'Parentesiak → biderketak eta zatiketak → batuketak eta kenketak.', es: 'Paréntesis → multiplicaciones y divisiones → sumas y restas.', ar: 'الأقواس ← الضرب والقسمة ← الجمع والطرح.' })}
            </span>
        </>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={hierarchyChallenges} state={state}>
            <div className="rationals-hierarchy" dir="ltr" role="group" aria-label={l({ eu: 'Adierazpena', es: 'Expresión', ar: 'التعبير' })}>
                {tokens(state.tree).map((token, index) => {
                    if (token.kind === 'number') return <span key={index} className="rationals-hierarchy-number"><MathText text={`$${token.latex}$`} /></span>
                    if (token.kind === 'bracket') return <span key={index} className="rationals-hierarchy-bracket">{token.open ? '(' : ')'}</span>
                    return (
                        <button
                            key={index}
                            type="button"
                            className={`rationals-hierarchy-op${state.miss === token.id ? ' miss' : ''}`}
                            onClick={() => setState((s) => pickOperation(s, token.id))}
                            aria-label={l({ eu: `Egin eragiketa: ${symbols[token.op]}`, es: `Hacer la operación ${symbols[token.op]}`, ar: `أجرِ العملية ${symbols[token.op]}` })}
                        >
                            {symbols[token.op]}
                        </button>
                    )
                })}
            </div>
        </ToolFrame>
    )
}
