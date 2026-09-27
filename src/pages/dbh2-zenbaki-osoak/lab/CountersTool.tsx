import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabChallenge } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { signed } from '../format'
import { COUNTER_LIMITS, countersChallenges, countersSummary, initialCountersState, setCounters, type CountersState, type IntegerToolProps } from './labTools'

export function CountersTool(props: IntegerToolProps & { challenges?: LabChallenge<CountersState>[] }) {
    const l = useLabText(props.language)
    const [state, setState] = useState<CountersState>(initialCountersState)
    const { positive, negative } = state
    const { pairs, result } = countersSummary(state)
    const leftover = Math.abs(result)

    const controls = (
        <>
            <Stepper label={l({ eu: 'Fitxa positiboak (+1)', es: 'Fichas positivas (+1)', ar: 'بطاقات موجبة (+1)' })} value={positive} min={COUNTER_LIMITS.min} max={COUNTER_LIMITS.max} onChange={(next) => setState((current) => setCounters(current, 'positive', next))} language={props.language} />
            <Stepper label={l({ eu: 'Fitxa negatiboak (−1)', es: 'Fichas negativas (−1)', ar: 'بطاقات سالبة (−1)' })} value={negative} min={COUNTER_LIMITS.min} max={COUNTER_LIMITS.max} onChange={(next) => setState((current) => setCounters(current, 'negative', next))} language={props.language} />
        </>
    )

    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main">
                <MathText text={`$${positive}-${negative}=${result < 0 ? '-' : ''}${leftover}$`} />
            </span>
            <span className="fraction-v2-lab-readout-note">
                {l({
                    eu: `${pairs} bikote (0 balio dute) eta ${leftover} fitxa ${result < 0 ? 'negatibo' : 'positibo'} geratzen dira: ${signed(result)}.`,
                    es: `${pairs} parejas (valen 0) y quedan ${leftover} fichas ${result < 0 ? 'negativas' : 'positivas'}: ${signed(result)}.`,
                    ar: `${pairs} أزواج (تساوي 0) ويبقى ${leftover} بطاقات ${result < 0 ? 'سالبة' : 'موجبة'}: ⁦${signed(result)}⁩.`
                })}
            </span>
        </>
    )

    const chip = (kind: 'plus' | 'minus', paired: boolean, key: string) => (
        <span className={`integers-chip ${kind} ${paired ? 'paired' : ''}`} key={key} aria-hidden="true">{kind === 'plus' ? '+' : '−'}</span>
    )

    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={props.challenges ?? countersChallenges} state={state}>
            <div
                className="integers-counters"
                role="img"
                aria-label={l({ eu: `${positive} fitxa positibo eta ${negative} negatibo`, es: `${positive} fichas positivas y ${negative} negativas`, ar: `${positive} بطاقات موجبة و${negative} بطاقات سالبة` })}
            >
                <div className="integers-counters-pairs">
                    {Array.from({ length: pairs }, (_, index) => (
                        <span className="integers-counters-pair" key={index}>
                            {chip('plus', true, 'p')}
                            {chip('minus', true, 'm')}
                            <em>0</em>
                        </span>
                    ))}
                </div>
                <div className="integers-counters-left">
                    {Array.from({ length: leftover }, (_, index) => chip(result < 0 ? 'minus' : 'plus', false, String(index)))}
                </div>
                {positive + negative === 0 && <p className="fraction-v2-lab-tip">{l({ eu: 'Gehitu fitxak ezkerreko kontrolekin.', es: 'Añade fichas con los controles.', ar: 'أضف بطاقات بأدوات التحكم.' })}</p>}
            </div>
        </ToolFrame>
    )
}
