import { useState } from 'react'
import { ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { WholeAnswer } from './LabBits'
import { circleNumber, crossedOut, initialSieveState, PRIMES_UP_TO_100, SIEVE_MAX, sieveChallenges, sieveComplete, type DivisibilityToolProps, type SieveState } from './labTools'

export function SieveTool(props: DivisibilityToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<SieveState>(initialSieveState)
    const crossed = crossedOut(state)
    const complete = sieveComplete(state)
    const left = SIEVE_MAX - crossed.size

    const controls = (
        <>
            <p className="fraction-v2-lab-tip">{l({ eu: 'Sakatu ratatu gabeko zenbaki bat: lehena da, eta haren multiploak ratatuko dira.', es: 'Pulsa un número sin tachar: es primo, y se tacharán sus múltiplos.', ar: 'اضغط عددًا غير مشطوب: إنه أولي، وستُشطب مضاعفاته.' })}</p>
            <button type="button" className="fraction-v2-secondary" onClick={() => setState(initialSieveState)}>{l({ eu: 'Berriro hasi', es: 'Empezar de nuevo', ar: 'ابدأ من جديد' })}</button>
        </>
    )

    const readout = (
        <>
            <span className="fraction-v2-lab-readout-note">
                {complete
                    ? l({ eu: 'Bahea osatuta: ratatu gabe geratzen direnak lehenak dira.', es: 'Criba completa: los que quedan sin tachar son primos.', ar: 'اكتمل الغربال: الأعداد غير المشطوبة أولية.' })
                    : l({ eu: `Aukeratutako lehenak: ${state.circled.join(', ') || '—'}. Ratatu gabe: ${left}.`, es: `Primos elegidos: ${state.circled.join(', ') || '—'}. Sin tachar: ${left}.`, ar: `الأعداد الأولية المختارة: ${state.circled.join('، ') || '—'}. غير المشطوبة: ${left}.` })}
            </span>
            {complete && <WholeAnswer language={props.language} state={state} expected={{ numerator: PRIMES_UP_TO_100, denominator: 1 }} onChange={(patch) => setState((current) => ({ ...current, ...patch }))} />}
        </>
    )

    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={sieveChallenges} state={state}>
            <div className="divisibility-sieve" dir="ltr">
                {Array.from({ length: SIEVE_MAX }, (_, index) => index + 1).map((value) => {
                    const isCrossed = crossed.has(value)
                    const isCircled = state.circled.includes(value)
                    return (
                        <button
                            type="button"
                            className={`${isCrossed ? 'crossed' : ''} ${isCircled ? 'circled' : ''} ${complete && !isCrossed ? 'prime' : ''}`}
                            disabled={isCrossed || isCircled}
                            aria-label={`${value}${isCrossed ? ` · ${l({ eu: 'ratatua', es: 'tachado', ar: 'مشطوب' })}` : ''}${isCircled ? ` · ${l({ eu: 'lehena', es: 'primo', ar: 'أولي' })}` : ''}`}
                            onClick={() => setState((current) => circleNumber(current, value))}
                            key={value}
                        >
                            {value}
                        </button>
                    )
                })}
            </div>
        </ToolFrame>
    )
}
