import { useState, type ReactElement } from 'react'
import { MathText } from '../../../components/MathText'
import { Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { formatNatural } from '../format'
import { NaturalAnswer } from './LabBits'
import { initialPowersState, POWER_LIMITS, powersChallenges, powerValue, resultVisible, setPowers, updatePowersAnswer, type NaturalsToolProps, type PowersState } from './labTools'

/** A cube of n × n × n blocks, drawn with its three visible faces */
function CubeDrawing({ n }: { n: number }) {
    const size = 150
    const cell = size / n
    const depth = cell * 0.5
    const x0 = 30
    const y0 = 20 + n * depth
    const faces: ReactElement[] = []
    for (let row = 0; row < n; row += 1) {
        for (let column = 0; column < n; column += 1) {
            faces.push(<rect key={`f${row}-${column}`} x={x0 + column * cell} y={y0 + row * cell} width={cell} height={cell} fill="var(--stage-tint, #d6eddf)" stroke="var(--ink)" strokeWidth={1.2} />)
        }
    }
    for (let column = 0; column < n; column += 1) {
        for (let layer = 0; layer < n; layer += 1) {
            const x = x0 + column * cell + layer * depth
            const y = y0 - layer * depth
            faces.push(<polygon key={`t${column}-${layer}`} points={`${x},${y} ${x + cell},${y} ${x + cell + depth},${y - depth} ${x + depth},${y - depth}`} fill="#eef7f1" stroke="var(--ink)" strokeWidth={1.2} />)
        }
    }
    for (let layer = 0; layer < n; layer += 1) {
        for (let row = 0; row < n; row += 1) {
            const x = x0 + n * cell + layer * depth
            const y = y0 + row * cell - layer * depth
            faces.push(<polygon key={`s${layer}-${row}`} points={`${x},${y} ${x + depth},${y - depth} ${x + depth},${y + cell - depth} ${x},${y + cell}`} fill="#b9dcc6" stroke="var(--ink)" strokeWidth={1.2} />)
        }
    }
    return <svg viewBox={`0 0 ${x0 * 2 + size + size / 2} ${y0 + size + 20}`} className="naturals-power-cube" aria-hidden="true">{faces}</svg>
}

export function PowersTool(props: NaturalsToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<PowersState>(initialPowersState)
    const { base, exponent } = state
    const value = powerValue(state)
    const shown = resultVisible(state, value)
    const factors = Array.from({ length: exponent }, () => base).join('\\cdot ')
    const ladder = Array.from({ length: exponent }, (_, index) => ({ exponent: index + 1, value: base ** (index + 1) }))

    const controls = (
        <>
            <Stepper label={l({ eu: 'Oinarria', es: 'Base', ar: 'الأساس' })} value={base} min={1} max={POWER_LIMITS.base} onChange={(next) => setState((current) => setPowers(current, { base: next }))} language={props.language} />
            <Stepper label={l({ eu: 'Berretzailea', es: 'Exponente', ar: 'الأس' })} value={exponent} min={1} max={POWER_LIMITS.exponent} onChange={(next) => setState((current) => setPowers(current, { exponent: next }))} language={props.language} />
            {state.solved.length > 0 && (
                <p className="fraction-v2-lab-tip">
                    {l({ eu: 'Kalkulatuta: ', es: 'Calculadas: ', ar: 'المحسوبة: ' })}
                    <MathText text={state.solved.map((key) => `$${key.replace('^', '^{')}}$`).join(', ')} />
                </p>
            )}
        </>
    )

    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main">
                <MathText text={shown ? `$${base}^{${exponent}}=${factors}=${formatNatural(value)}$` : `$${base}^{${exponent}}=${factors}$`} />
            </span>
            <NaturalAnswer language={props.language} state={state} expected={{ numerator: value, denominator: 1 }} onChange={(patch) => setState((current) => updatePowersAnswer(current, patch))} />
        </>
    )

    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={powersChallenges} state={state}>
            <div className="naturals-power" dir="ltr">
                {exponent === 2 && (
                    <div className="naturals-power-square" style={{ gridTemplateColumns: `repeat(${base}, 1fr)` }} role="img" aria-label={l({ eu: `${base} aldeko karratua`, es: `Cuadrado de lado ${base}`, ar: `مربع ضلعه ${base}` })}>
                        {Array.from({ length: base * base }, (_, index) => <span key={index} />)}
                    </div>
                )}
                {exponent === 3 && <CubeDrawing n={base} />}
                <ol className="naturals-power-ladder" aria-label={l({ eu: 'Berreturak bata bestearen ondoren', es: 'Potencias una tras otra', ar: 'القوى الواحدة تلو الأخرى' })}>
                    {ladder.map((step) => (
                        <li key={step.exponent} className={step.exponent === exponent ? 'current' : ''}>
                            <MathText text={`$${base}^{${step.exponent}}$`} />
                            <strong>{step.exponent === exponent && !shown ? '?' : formatNatural(step.value)}</strong>
                            {step.exponent < exponent && <small>· {base}</small>}
                        </li>
                    ))}
                </ol>
            </div>
        </ToolFrame>
    )
}
