import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { NaturalAnswer } from './LabBits'
import { DIVISION_LIMITS, divisionChallenges, divisionParts, initialDivisionState, resultVisible, setDivision, type DivisionState, type NaturalsToolProps } from './labTools'

export function DivisionTool(props: NaturalsToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<DivisionState>(initialDivisionState)
    const { dividend, divisor } = state
    const { quotient, remainder } = divisionParts(state)
    const shown = resultVisible(state, quotient)

    const controls = (
        <>
            <Stepper label={l({ eu: 'Fitxak (zatikizuna)', es: 'Fichas (dividendo)', ar: 'القطع (المقسوم)' })} value={dividend} min={1} max={DIVISION_LIMITS.dividend} onChange={(next) => setState((current) => setDivision(current, { dividend: next }))} language={props.language} />
            <Stepper label={l({ eu: 'Taldeko (zatitzailea)', es: 'Por grupo (divisor)', ar: 'في كل مجموعة (المقسوم عليه)' })} value={divisor} min={1} max={DIVISION_LIMITS.divisor} onChange={(next) => setState((current) => setDivision(current, { divisor: next }))} language={props.language} />
        </>
    )

    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main">
                <MathText text={shown ? `$${dividend}=${divisor}\\cdot ${quotient}+${remainder}\\qquad ${remainder}<${divisor}$` : `$${dividend}\\mathbin{:}${divisor}$`} />
            </span>
            <span className="fraction-v2-lab-readout-note">
                {remainder === 0
                    ? l({ eu: 'Ez da ezer soberan geratzen: zatiketa zehatza.', es: 'No sobra nada: división exacta.', ar: 'لا يبقى شيء: قسمة تامة.' })
                    : l({ eu: `${remainder} fitxa soberan: zatiketa osoa (ez-zehatza).`, es: `Sobran ${remainder} fichas: división entera (inexacta).`, ar: `تبقى ${remainder} قطع: قسمة غير تامة.` })}
            </span>
            <span className="fraction-v2-lab-readout-note">{l({ eu: 'Zenbat talde oso daude? Hori da zatidura.', es: '¿Cuántos grupos completos hay? Ese es el cociente.', ar: 'كم مجموعة كاملة؟ هذا هو خارج القسمة.' })}</span>
            <NaturalAnswer language={props.language} state={state} expected={{ numerator: quotient, denominator: 1 }} onChange={(patch) => setState((current) => ({ ...current, ...patch }))} />
        </>
    )

    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={divisionChallenges} state={state}>
            <div className="naturals-share" dir="ltr" role="img" aria-label={`${dividend} = ${divisor} · ${quotient} + ${remainder}`}>
                {Array.from({ length: quotient }, (_, group) => (
                    <span className="naturals-share-group" key={group}>
                        {Array.from({ length: divisor }, (_, index) => <i key={index} />)}
                    </span>
                ))}
                {remainder > 0 && (
                    <span className="naturals-share-rest">
                        {Array.from({ length: remainder }, (_, index) => <i key={index} />)}
                    </span>
                )}
            </div>
        </ToolFrame>
    )
}
