import { useState } from 'react'
import { Segmented, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import { NumberField } from '../../../features/unit-v2/lab/NumberField'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { formatNatural } from '../format'
import { NaturalAnswer } from './LabBits'
import { initialRoundingState, resultVisible, ROUNDING_MAX, ROUNDING_PLACES, roundingChallenges, roundTo, setRounding, type NaturalsToolProps, type RoundingPlace, type RoundingState } from './labTools'

export function RoundingTool(props: NaturalsToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<RoundingState>(initialRoundingState)
    const { value, place } = state
    const lower = Math.floor(value / place) * place
    const upper = lower + place
    const middle = lower + place / 2
    const rounded = roundTo(value, place)
    const shown = resultVisible(state, rounded)
    const left = 70
    const right = 650
    const x = (number: number) => left + ((number - lower) / place) * (right - left)
    const lineY = 120

    const controls = (
        <>
            <NumberField label={l({ eu: 'Zenbakia', es: 'Número', en: 'Number', ar: 'العدد' })} value={value} min={0} max={ROUNDING_MAX} format={(number) => formatNatural(number, props.language)} onChange={(next) => setState((current) => setRounding(current, { value: next }))} language={props.language} />
            <Segmented
                label={l({ eu: 'Biribildu hona', es: 'Redondear a', en: 'Round to', ar: 'التقريب إلى' })}
                value={String(place)}
                options={ROUNDING_PLACES.map((option) => ({ value: String(option), label: formatNatural(option, props.language) }))}
                onChange={(next) => setState((current) => setRounding(current, { place: Number(next) as RoundingPlace }))}
            />
        </>
    )

    const readout = (
        <>
            <span className="fraction-v2-lab-readout-note">
                {l({
                    eu: `${formatNatural(value, props.language)} ${formatNatural(lower, props.language)} eta ${formatNatural(upper, props.language)} artean dago; erdia ${formatNatural(middle, props.language)} da.`,
                    es: `${formatNatural(value, props.language)} está entre ${formatNatural(lower, props.language)} y ${formatNatural(upper, props.language)}; la mitad es ${formatNatural(middle, props.language)}.`,
                    en: `${formatNatural(value, props.language)} is between ${formatNatural(lower, props.language)} and ${formatNatural(upper, props.language)}; the halfway point is ${formatNatural(middle, props.language)}.`,
                    ar: `يقع ${formatNatural(value, props.language)} بين ${formatNatural(lower, props.language)} و${formatNatural(upper, props.language)}؛ والمنتصف ${formatNatural(middle, props.language)}.`
                })}
            </span>
            <NaturalAnswer language={props.language} state={state} expected={{ numerator: rounded, denominator: 1 }} onChange={(patch) => setState((current) => ({ ...current, ...patch }))} />
        </>
    )

    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={roundingChallenges} state={state}>
            <div className="naturals-lab-figure">
                <svg viewBox="0 0 720 200" className="naturals-figure" role="img" aria-label={l({ eu: `${formatNatural(value, props.language)} zuzenean`, es: `${formatNatural(value, props.language)} en la recta`, en: `${formatNatural(value, props.language)} on the number line`, ar: `${formatNatural(value, props.language)} على المستقيم` })}>
                    <defs>
                        <marker id="naturals-lab-round" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                            <path d="M0 0 L10 5 L0 10 z" fill="var(--stage, #7a55d6)" />
                        </marker>
                    </defs>
                    <rect x={x(middle)} y={lineY - 36} width={right - x(middle)} height={72} rx={10} fill="var(--stage-tint, #e8e0f7)" />
                    <line x1={left - 24} x2={right + 24} y1={lineY} y2={lineY} stroke="var(--ink)" strokeWidth={2.4} />
                    {Array.from({ length: 11 }, (_, index) => {
                        const tick = lower + (index * place) / 10
                        const main = index === 0 || index === 10
                        return <line key={index} x1={x(tick)} x2={x(tick)} y1={lineY - (main ? 12 : index === 5 ? 10 : 6)} y2={lineY + (main ? 12 : index === 5 ? 10 : 6)} stroke="var(--ink)" strokeWidth={main ? 2.6 : 1.4} strokeDasharray={index === 5 ? '3 3' : undefined} />
                    })}
                    <text x={x(lower)} y={lineY + 42} textAnchor="middle" fontSize={17} fontWeight={700} fill="var(--ink)">{formatNatural(lower, props.language)}</text>
                    <text x={x(upper)} y={lineY + 42} textAnchor="middle" fontSize={17} fontWeight={700} fill="var(--ink)">{formatNatural(upper, props.language)}</text>
                    <text x={x(middle)} y={lineY + 42} textAnchor="middle" fontSize={13} fill="var(--muted)">{formatNatural(middle, props.language)}</text>
                    <circle cx={x(value)} cy={lineY} r={9} fill="var(--stage, #7a55d6)" stroke="var(--ink)" strokeWidth={2} />
                    <text x={x(value)} y={lineY - 48} textAnchor="middle" fontSize={18} fontWeight={700} fill="var(--stage, #7a55d6)">{formatNatural(value, props.language)}</text>
                    {shown && value !== rounded && (
                        <path d={`M${x(value)} ${lineY - 16} Q ${(x(value) + x(rounded)) / 2} ${lineY - 44} ${x(rounded) + (rounded > value ? -6 : 6)} ${lineY - 14}`} fill="none" stroke="var(--stage, #7a55d6)" strokeWidth={2.2} markerEnd="url(#naturals-lab-round)" />
                    )}
                    {shown && <text x={360} y={192} textAnchor="middle" fontSize={16} fontWeight={700} fill="var(--ink)">{formatNatural(value, props.language)} ≈ {formatNatural(rounded, props.language)}</text>}
                </svg>
            </div>
        </ToolFrame>
    )
}
