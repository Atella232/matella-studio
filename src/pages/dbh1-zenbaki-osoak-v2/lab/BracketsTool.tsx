import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { Segmented, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { IntegerAnswer } from '../../dbh2-zenbaki-osoak/lab/IntegerLabKit'
import {
    bracketsChallenges,
    bracketsExercises,
    bracketsValue,
    bracketSlots,
    exerciseOf,
    flattenParts,
    initialBracketsState,
    resultIsVisible,
    rightSign,
    setBracketSign,
    signsAllRight,
    startBrackets,
    updateBracketsAnswer,
    type BracketsState,
    type ExpressionPart
} from './labTools'

/** LaTeX of the expression as written in the book: −4 − (5 − 7) */
function partsLatex(parts: ExpressionPart[]): string {
    return parts.map((part, index) => {
        if (part.kind === 'number') return index === 0 ? String(part.value) : part.value < 0 ? `-${-part.value}` : `+${part.value}`
        const inside = part.terms.map((term, termIndex) => (term < 0 ? `-${-term}` : termIndex === 0 ? String(term) : `+${term}`)).join('')
        return `${index === 0 && part.sign === '+' ? '+' : part.sign}(${inside})`
    }).join('')
}

const termsLatex = (terms: number[]) => terms.map((term, index) => (term < 0 ? `-${-term}` : index === 0 ? String(term) : `+${term}`)).join('')

export function BracketsTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<BracketsState>(initialBracketsState)
    const { parts } = exerciseOf(state)
    const slots = bracketSlots(parts)
    const chosen = slots.filter((slot) => state.signs[slot]).length
    const allRight = signsAllRight(state)
    const value = bracketsValue(parts)
    const flat = flattenParts(parts)
    const positives = flat.filter((term) => term > 0).reduce((sum, term) => sum + term, 0)
    const negatives = -flat.filter((term) => term < 0).reduce((sum, term) => sum + term, 0)

    const controls = (
        <>
            <Segmented
                label={l({ eu: 'Eragiketa', es: 'Operación', ar: 'العملية' })}
                value={String(state.exercise)}
                options={bracketsExercises.map((item) => ({ value: String(item.id), label: `${item.id}${state.finished.includes(item.id) ? ' ✓' : ''}` }))}
                onChange={(next) => setState((current) => startBrackets(Number(next), current.finished))}
            />
            <p className="fraction-v2-lab-tip">{l({ eu: 'Parentesi barruko zenbaki bakoitzean, aukeratu zein zeinu geratzen den parentesia kentzean.', es: 'En cada número de dentro del paréntesis, elige qué signo queda al quitar el paréntesis.', ar: 'في كل عدد داخل القوس، اختر الإشارة التي تبقى بعد حذف القوس.' })}</p>
        </>
    )

    const readout = (
        <>
            <span className="fraction-v2-lab-readout-note">
                {allRight
                    ? l({ eu: 'Zeinu guztiak ondo! Orain batu positiboak eta negatiboak.', es: '¡Todos los signos bien! Ahora suma positivos y negativos.', ar: 'كل الإشارات صحيحة! الآن اجمع الموجبة والسالبة.' })
                    : l({ eu: `${chosen} / ${slots.length} zeinu aukeratuta.`, es: `${chosen} de ${slots.length} signos elegidos.`, ar: `اختيرت ${chosen} من ${slots.length} إشارات.` })}
            </span>
            {allRight && (
                <span className="fraction-v2-lab-readout-main">
                    <MathText text={resultIsVisible(state) ? `$${termsLatex(flat)}=${positives}-${negatives}=${value}$` : `$${termsLatex(flat)}$`} />
                </span>
            )}
            {allRight && <IntegerAnswer language={props.language} state={state} expected={{ numerator: value, denominator: 1 }} onChange={(patch) => setState((current) => updateBracketsAnswer(current, patch))} />}
        </>
    )

    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={bracketsChallenges} state={state}>
            <div className="integers-brackets" dir="ltr">
                <div className="integers-brackets-original"><MathText text={`$${partsLatex(parts)}$`} /></div>
                <div className="integers-brackets-flat" role="group" aria-label={l({ eu: 'Parentesirik gabe', es: 'Sin paréntesis', ar: 'دون أقواس' })}>
                    <span className="integers-brackets-equals">=</span>
                    {parts.map((part, partIndex) => part.kind === 'number'
                        ? <span className="integers-brackets-fixed" key={partIndex}>{part.value < 0 ? `−${-part.value}` : partIndex === 0 ? part.value : `+${part.value}`}</span>
                        : part.terms.map((term, termIndex) => {
                            const slot = `${partIndex}-${termIndex}`
                            const sign = state.signs[slot]
                            const status = sign === undefined ? '' : sign === rightSign(parts, slot) ? 'right' : 'wrong'
                            return (
                                <span className={`integers-brackets-term ${status}`} key={slot}>
                                    <span className="integers-brackets-sign" role="group" aria-label={`${Math.abs(term)}`}>
                                        {(['+', '-'] as const).map((option) => (
                                            <button type="button" aria-pressed={sign === option} onClick={() => setState((current) => setBracketSign(current, slot, option))} key={option}>{option === '-' ? '−' : '+'}</button>
                                        ))}
                                    </span>
                                    <strong>{Math.abs(term)}</strong>
                                </span>
                            )
                        }))}
                </div>
            </div>
        </ToolFrame>
    )
}
