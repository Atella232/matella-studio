import { useState } from 'react'
import { ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { acronym } from './acronyms'
import { classifyCard, initialSortState, problemCards, sortChallenges, type DivisibilityToolProps, type SortState } from './labTools'

export function SortTool(props: DivisibilityToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<SortState>(initialSortState)
    const right = problemCards.filter((card) => state.answers[card.id] === card.kind).length

    const controls = (
        <>
            <p className="fraction-v2-lab-tip">{l({ eu: 'Irakurri egoera bakoitza eta erabaki zer behar den.', es: 'Lee cada situación y decide qué hace falta.', ar: 'اقرأ كل موقف وقرّر ما المطلوب.' })}</p>
            <p className="divisibility-sort-score">{l({ eu: `Ondo: ${right} / ${problemCards.length} · Akatsak: ${state.mistakes}`, es: `Bien: ${right} / ${problemCards.length} · Errores: ${state.mistakes}`, ar: `صحيحة: ${right} / ${problemCards.length} · الأخطاء: ${state.mistakes}` })}</p>
            <button type="button" className="fraction-v2-secondary" onClick={() => setState(initialSortState)}>{l({ eu: 'Berriro hasi', es: 'Empezar de nuevo', ar: 'ابدأ من جديد' })}</button>
        </>
    )

    return (
        <ToolFrame {...props} controls={controls} challenges={sortChallenges} state={state}>
            <ul className="divisibility-sort">
                {problemCards.map((card) => {
                    const chosen = state.answers[card.id]
                    const status = chosen === undefined ? '' : chosen === card.kind ? 'right' : 'wrong'
                    return (
                        <li className={status} key={card.id}>
                            <p>{l(card.text)}</p>
                            <div role="group" aria-label={l({ eu: 'Zer behar da?', es: '¿Qué hace falta?', ar: 'ما المطلوب؟' })}>
                                {(['gcd', 'lcm'] as const).map((kind) => (
                                    <button type="button" aria-pressed={chosen === kind} disabled={status === 'right'} onClick={() => setState((current) => classifyCard(current, card.id, kind))} key={kind}>
                                        {acronym(props.language, kind)}
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
