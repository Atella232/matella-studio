import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { NaturalAnswer } from './LabBits'
import { DISTRIBUTIVE_LIMITS, distributiveChallenges, distributiveTotal, initialDistributiveState, resultVisible, setDistributive, type DistributiveState, type NaturalsToolProps } from './labTools'

export function DistributiveTool(props: NaturalsToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<DistributiveState>(initialDistributiveState)
    const { factor, first, second } = state
    const total = distributiveTotal(state)
    const shown = resultVisible(state, total)

    const controls = (
        <>
            <Stepper label={l({ eu: 'Ilarak (a)', es: 'Filas (a)', ar: 'الصفوف (a)' })} value={factor} min={1} max={DISTRIBUTIVE_LIMITS.factor} onChange={(next) => setState((current) => setDistributive(current, { factor: next }))} language={props.language} />
            <Stepper label={l({ eu: 'Zutabe urdinak (b)', es: 'Columnas azules (b)', ar: 'الأعمدة الزرقاء (b)' })} value={first} min={1} max={DISTRIBUTIVE_LIMITS.part} onChange={(next) => setState((current) => setDistributive(current, { first: next }))} language={props.language} />
            <Stepper label={l({ eu: 'Zutabe gorriak (c)', es: 'Columnas rojas (c)', ar: 'الأعمدة الحمراء (c)' })} value={second} min={1} max={DISTRIBUTIVE_LIMITS.part} onChange={(next) => setState((current) => setDistributive(current, { second: next }))} language={props.language} />
        </>
    )

    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main">
                <MathText text={shown
                    ? `$${factor}\\cdot (${first}+${second})=${factor}\\cdot ${first}+${factor}\\cdot ${second}=${factor * first}+${factor * second}=${total}$`
                    : `$${factor}\\cdot (${first}+${second})=${factor}\\cdot ${first}+${factor}\\cdot ${second}$`} />
            </span>
            <NaturalAnswer language={props.language} state={state} expected={{ numerator: total, denominator: 1 }} onChange={(patch) => setState((current) => ({ ...current, ...patch }))} />
        </>
    )

    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={distributiveChallenges} state={state}>
            <div className="naturals-split" dir="ltr" role="img" aria-label={`${factor} · (${first} + ${second})`}>
                <div className="naturals-split-part">
                    <span className="naturals-split-label blue">{factor} · {first}</span>
                    <div className="naturals-split-grid blue" style={{ gridTemplateColumns: `repeat(${first}, 1fr)`, width: `${first * 26}px` }}>
                        {Array.from({ length: factor * first }, (_, index) => <span key={index} />)}
                    </div>
                </div>
                <div className="naturals-split-part">
                    <span className="naturals-split-label coral">{factor} · {second}</span>
                    <div className="naturals-split-grid coral" style={{ gridTemplateColumns: `repeat(${second}, 1fr)`, width: `${second * 26}px` }}>
                        {Array.from({ length: factor * second }, (_, index) => <span key={index} />)}
                    </div>
                </div>
            </div>
        </ToolFrame>
    )
}
