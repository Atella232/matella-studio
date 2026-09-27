import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabChallenge } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { factorize, factorLatex } from '../math'
import { acronymLatex } from './acronyms'
import { WholeAnswer } from './LabBits'
import { commonLandings, initialJumpsState, JUMP_LIMITS, JUMP_TRACK, jumpsChallenges, jumpsLcm, resultVisible, setJumps, type DivisibilityToolProps, type JumpsState } from './labTools'

export function JumpsTool(props: DivisibilityToolProps & { challenges?: LabChallenge<JumpsState>[] }) {
    const l = useLabText(props.language)
    const [state, setState] = useState<JumpsState>(initialJumpsState)
    const { first, second } = state
    const answer = jumpsLcm(state)
    const shown = resultVisible(state, answer)
    const common = commonLandings(state)
    const width = 720
    const x = (value: number) => 20 + (value / JUMP_TRACK) * (width - 40)
    const arcs = (step: number, above: boolean) => Array.from({ length: Math.floor(JUMP_TRACK / step) }, (_, index) => index * step).map((from) => {
        const y = 80
        const lift = above ? -34 : 34
        return <path key={`${step}-${from}-${above}`} d={`M${x(from)} ${y} Q ${(x(from) + x(from + step)) / 2} ${y + lift * 1.4} ${x(from + step)} ${y}`} fill="none" stroke={above ? 'var(--blue, #2f6fdb)' : 'var(--coral, #c4432a)'} strokeWidth={2.2} />
    })

    const controls = (
        <>
            <Stepper label={l({ eu: 'Igel urdinaren jauzia', es: 'Salto de la rana azul', ar: 'قفزة الضفدع الأزرق' })} value={first} min={JUMP_LIMITS.min} max={JUMP_LIMITS.max} onChange={(next) => setState((current) => setJumps(current, { first: next }))} language={props.language} />
            <Stepper label={l({ eu: 'Igel gorriaren jauzia', es: 'Salto de la rana roja', ar: 'قفزة الضفدع الأحمر' })} value={second} min={JUMP_LIMITS.min} max={JUMP_LIMITS.max} onChange={(next) => setState((current) => setJumps(current, { second: next }))} language={props.language} />
        </>
    )

    const firstMultiples = Array.from({ length: 5 }, (_, index) => first * (index + 1)).join(',\\ ')
    const secondMultiples = Array.from({ length: 5 }, (_, index) => second * (index + 1)).join(',\\ ')
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main divisibility-lines">
                <MathText text={`$\\mathrm{M}(${first})=\\{${firstMultiples},\\ \\dots\\}$`} />
                <MathText text={`$\\mathrm{M}(${second})=\\{${secondMultiples},\\ \\dots\\}$`} />
                {shown && <MathText text={`$${acronymLatex(props.language, 'lcm')}(${first},${second})=${factorLatex(factorize(answer))}=${answer}$`} />}
            </span>
            <WholeAnswer language={props.language} state={state} expected={{ numerator: answer, denominator: 1 }} onChange={(patch) => setState((current) => ({ ...current, ...patch }))} />
        </>
    )

    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={props.challenges ?? jumpsChallenges} state={state}>
            <div className="divisibility-figure-box">
                <svg viewBox={`0 0 ${width} 170`} className="divisibility-figure" role="img" aria-label={l({ eu: `Multiplo komunak: ${common.join(', ')}`, es: `Múltiplos comunes: ${common.join(', ')}`, ar: `المضاعفات المشتركة: ${common.join('، ')}` })}>
                    {shown && common.map((value) => <rect key={value} x={x(value) - 12} y={30} width={24} height={110} rx={8} fill="var(--mustard-tint, #fbebc0)" stroke="var(--ink)" strokeWidth={1.4} />)}
                    {arcs(first, true)}
                    {arcs(second, false)}
                    <line x1={x(0)} x2={x(JUMP_TRACK)} y1={80} y2={80} stroke="var(--ink)" strokeWidth={2} />
                    {Array.from({ length: JUMP_TRACK + 1 }, (_, value) => (
                        <g key={value}>
                            <line x1={x(value)} x2={x(value)} y1={76} y2={84} stroke="var(--ink)" strokeWidth={value % 10 === 0 ? 2 : 1} />
                            {value % 10 === 0 && <text x={x(value)} y={162} textAnchor="middle" fontSize={14} fill="var(--ink)">{value}</text>}
                        </g>
                    ))}
                </svg>
            </div>
        </ToolFrame>
    )
}
