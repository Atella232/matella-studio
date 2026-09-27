import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabChallenge } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { factorize, factorLatex, isPrime } from '../math'
import { NumberField } from './LabBits'
import { divideLadder, initialLadderState, LADDER_LIMITS, LADDER_PRIMES, ladderChallenges, ladderRest, ladderStuck, setLadderValue, type DivisibilityToolProps, type LadderState } from './labTools'

export function LadderTool(props: DivisibilityToolProps & { challenges?: LabChallenge<LadderState>[] }) {
    const l = useLabText(props.language)
    const [state, setState] = useState<LadderState>(initialLadderState)
    const rest = ladderRest(state)
    const done = rest === 1
    const stuck = ladderStuck(state)
    const rows = state.steps.map((prime, index) => ({ value: state.steps.slice(0, index).reduce((current, step) => current / step, state.value), prime }))

    const controls = (
        <>
            <NumberField label={l({ eu: 'Deskonposatzeko zenbakia', es: 'Número que descomponer', ar: 'العدد المراد تحليله' })} value={state.value} min={LADDER_LIMITS.min} max={LADDER_LIMITS.max} onChange={(next) => setState((current) => setLadderValue(current, next))} language={props.language} />
            <div className="divisibility-prime-buttons" role="group" aria-label={l({ eu: 'Zatitu honekin', es: 'Dividir entre', ar: 'اقسم على' })}>
                <span className="fraction-v2-stepper-label">{l({ eu: 'Zatitu honekin', es: 'Dividir entre', ar: 'اقسم على' })}</span>
                <div>
                    {LADDER_PRIMES.map((prime) => <button type="button" disabled={done} onClick={() => setState((current) => divideLadder(current, prime))} key={prime}>{prime}</button>)}
                    {stuck && isPrime(rest) && <button type="button" className="big" onClick={() => setState((current) => divideLadder(current, rest))}>{rest}</button>}
                </div>
            </div>
            <button type="button" className="fraction-v2-secondary" onClick={() => setState((current) => setLadderValue(current, current.value))}>{l({ eu: 'Berriro hasi', es: 'Empezar de nuevo', ar: 'ابدأ من جديد' })}</button>
        </>
    )

    const readout = (
        <>
            {state.rejected !== null && (
                <span className="fraction-v2-lab-readout-note">
                    {l({ eu: `${rest} ez da ${state.rejected}rekin zatigarria (hondarra ${rest % state.rejected}). Probatu beste lehen bat.`, es: `${rest} no es divisible por ${state.rejected} (resto ${rest % state.rejected}). Prueba otro primo.`, ar: `${rest} لا يقبل القسمة على ${state.rejected} (الباقي ${rest % state.rejected}). جرّب عددًا أوليًا آخر.` })}
                </span>
            )}
            {stuck && (
                <span className="fraction-v2-lab-readout-note">
                    {isPrime(rest)
                        ? l({ eu: `${rest} lehena da: zatitu berarekin.`, es: `${rest} es primo: divídelo entre sí mismo.`, ar: `${rest} أولي: اقسمه على نفسه.` })
                        : l({ eu: `${rest} zenbakiak 13 baino handiagoak diren lehenak ditu.`, es: `${rest} tiene factores primos mayores que 13.`, ar: `للعدد ${rest} عوامل أولية أكبر من 13.` })}
                </span>
            )}
            {done && (
                <span className="fraction-v2-lab-readout-main">
                    <MathText text={`$${state.value}=${factorLatex(factorize(state.value))}$`} />
                </span>
            )}
        </>
    )

    return (
        <ToolFrame {...props} controls={controls} readout={state.rejected !== null || stuck || done ? readout : undefined} challenges={props.challenges ?? ladderChallenges} state={state}>
            <div className="divisibility-ladder" dir="ltr" aria-live="polite">
                {rows.map(({ value, prime }, index) => (
                    <div className="divisibility-ladder-row" key={index}>
                        <span>{value}</span>
                        <strong>{prime}</strong>
                    </div>
                ))}
                <div className={`divisibility-ladder-row ${done ? 'done' : 'current'}`}>
                    <span>{rest}</span>
                    <strong>{done ? '' : '?'}</strong>
                </div>
            </div>
        </ToolFrame>
    )
}
