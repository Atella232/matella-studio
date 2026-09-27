import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { Segmented, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabChallenge } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { factorize, factorLatex } from '../math'
import { acronym, acronymLatex } from './acronyms'
import { NumberField, WholeAnswer } from './LabBits'
import { initialVennState, resultVisible, setVenn, VENN_LIMITS, vennChallenges, vennExpected, vennRegions, type DivisibilityToolProps, type VennState } from './labTools'

const product = (values: number[]) => values.reduce((total, value) => total * value, 1)

/** Factors spread in a small grid inside one region of the diagram */
function Factors({ values, cx, cy }: { values: number[]; cx: number; cy: number }) {
    const columns = Math.min(3, Math.max(1, values.length))
    return (
        <>
            {values.map((value, index) => (
                <text key={index} x={cx + ((index % columns) - (columns - 1) / 2) * 34} y={cy + (Math.floor(index / columns) - (Math.ceil(values.length / columns) - 1) / 2) * 34 + 9} textAnchor="middle" fontSize={26} fontWeight={700} fill="var(--ink)">{value}</text>
            ))}
        </>
    )
}

export function VennTool(props: DivisibilityToolProps & { challenges?: LabChallenge<VennState>[] }) {
    const l = useLabText(props.language)
    const [state, setState] = useState<VennState>(initialVennState)
    const { first, second, ask } = state
    const regions = vennRegions(first, second)
    const expected = vennExpected(state)
    const shown = resultVisible(state, expected)

    const controls = (
        <>
            <NumberField label={l({ eu: 'Lehen zenbakia', es: 'Primer número', ar: 'العدد الأول' })} value={first} min={VENN_LIMITS.min} max={VENN_LIMITS.max} onChange={(next) => setState((current) => setVenn(current, { first: next }))} language={props.language} />
            <NumberField label={l({ eu: 'Bigarren zenbakia', es: 'Segundo número', ar: 'العدد الثاني' })} value={second} min={VENN_LIMITS.min} max={VENN_LIMITS.max} onChange={(next) => setState((current) => setVenn(current, { second: next }))} language={props.language} />
            <Segmented label={l({ eu: 'Zer kalkulatu', es: 'Qué calcular', ar: 'ماذا نحسب' })} value={ask} options={[{ value: 'gcd', label: acronym(props.language, 'gcd') }, { value: 'lcm', label: acronym(props.language, 'lcm') }]} onChange={(next) => setState((current) => setVenn(current, { ask: next }))} />
        </>
    )

    const worked = ask === 'gcd'
        ? `${regions.shared.length ? regions.shared.join('\\cdot ') : '1'}=${expected}`
        : `${[...regions.onlyFirst, ...regions.shared, ...regions.onlySecond].join('\\cdot ')}=${expected}`
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main divisibility-lines">
                <MathText text={`$${first}=${factorLatex(factorize(first))}\\qquad ${second}=${factorLatex(factorize(second))}$`} />
                {shown && <MathText text={`$${acronymLatex(props.language, ask)}(${first},${second})=${worked}$`} />}
            </span>
            <WholeAnswer language={props.language} state={state} expected={{ numerator: expected, denominator: 1 }} onChange={(patch) => setState((current) => ({ ...current, ...patch }))} />
        </>
    )

    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={props.challenges ?? vennChallenges} state={state}>
            <div className="divisibility-figure-box">
                <svg viewBox="0 0 640 300" className="divisibility-figure" role="img" aria-label={l({ eu: `Erdian: ${regions.shared.join(' · ') || 'ezer ez'}`, es: `En el centro: ${regions.shared.join(' · ') || 'nada'}`, ar: `في الوسط: ${regions.shared.join(' · ') || 'لا شيء'}` })}>
                    <circle cx={250} cy={160} r={120} fill="var(--blue-tint, #dde7f7)" fillOpacity={ask === 'gcd' ? 0.5 : 0.8} stroke="var(--ink)" strokeWidth={2.2} />
                    <circle cx={390} cy={160} r={120} fill="var(--coral-tint, #f8dcd0)" fillOpacity={ask === 'gcd' ? 0.5 : 0.8} stroke="var(--ink)" strokeWidth={2.2} />
                    {ask === 'gcd' && <path d="M320 62 A120 120 0 0 1 320 258 A120 120 0 0 1 320 62 Z" fill="var(--mustard-tint, #fbebc0)" stroke="var(--ink)" strokeWidth={2.2} />}
                    <text x={190} y={28} textAnchor="middle" fontSize={22} fontWeight={700} fill="var(--ink)">{first}</text>
                    <text x={450} y={28} textAnchor="middle" fontSize={22} fontWeight={700} fill="var(--ink)">{second}</text>
                    <Factors values={regions.onlyFirst} cx={200} cy={160} />
                    <Factors values={regions.shared} cx={320} cy={160} />
                    <Factors values={regions.onlySecond} cx={440} cy={160} />
                    <text x={320} y={292} textAnchor="middle" fontSize={15} fill="var(--muted)">
                        {ask === 'gcd'
                            ? l({ eu: `${acronym(props.language, 'gcd')}: erdikoak bakarrik → ${shown ? product(regions.shared) : '?'}`, es: `${acronym(props.language, 'gcd')}: solo los del centro → ${shown ? product(regions.shared) : '?'}`, ar: `${acronym(props.language, 'gcd')}: عوامل الوسط فقط ← ${shown ? product(regions.shared) : '?'}` })
                            : l({ eu: `${acronym(props.language, 'lcm')}: diagramako guztiak → ${shown ? expected : '?'}`, es: `${acronym(props.language, 'lcm')}: todos los del diagrama → ${shown ? expected : '?'}`, ar: `${acronym(props.language, 'lcm')}: كل عوامل المخطط ← ${shown ? expected : '?'}` })}
                    </text>
                </svg>
            </div>
        </ToolFrame>
    )
}
