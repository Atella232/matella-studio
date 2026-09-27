import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import { NumberField } from '../../../features/unit-v2/lab/NumberField'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { formatNatural } from '../format'
import { NaturalAnswer } from './LabBits'
import { initialLineState, LINE_MAX, lineChallenges, lineJump, markValue, resultVisible, setLine, type LineState, type NaturalsToolProps } from './labTools'

export function LineTool(props: NaturalsToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<LineState>(initialLineState)
    const { from, to, parts, mark } = state
    const jump = lineJump(state)
    const asked = markValue(state, mark)
    const shown = asked !== null && resultVisible(state, asked)
    const width = 720
    const left = 60
    const right = width - 60
    const x = (index: number) => left + (index / parts) * (right - left)
    const lineY = 120

    const controls = (
        <>
            <NumberField label={l({ eu: 'Hasiera', es: 'Inicio', ar: 'البداية' })} value={from} min={0} max={LINE_MAX - 1} format={formatNatural} onChange={(next) => setState((current) => setLine(current, { from: next }))} language={props.language} />
            <NumberField label={l({ eu: 'Amaiera', es: 'Final', ar: 'النهاية' })} value={to} min={1} max={LINE_MAX} format={formatNatural} onChange={(next) => setState((current) => setLine(current, { to: next }))} language={props.language} />
            <Stepper label={l({ eu: 'Salto kopurua', es: 'Número de saltos', ar: 'عدد القفزات' })} value={parts} min={2} max={10} onChange={(next) => setState((current) => setLine(current, { parts: next }))} language={props.language} />
            <Stepper label={l({ eu: 'Galdetutako marka', es: 'Marca preguntada', ar: 'العلامة المطلوبة' })} value={mark} min={1} max={parts - 1} onChange={(next) => setState((current) => setLine(current, { mark: next }))} language={props.language} />
        </>
    )

    const readout = jump === null
        ? (
            <span className="fraction-v2-lab-readout-note">
                {l({ eu: `${formatNatural(to - from)} ezin da ${parts} zati berdinetan banatu zenbaki naturalekin. Aldatu muturrak edo salto kopurua.`, es: `${formatNatural(to - from)} no se puede repartir en ${parts} saltos iguales con números naturales. Cambia los extremos o el número de saltos.`, ar: `لا يمكن تقسيم ${formatNatural(to - from)} إلى ${parts} قفزات متساوية بأعداد طبيعية. غيّر الطرفين أو عدد القفزات.` })}
            </span>
        )
        : (
            <>
                <span className="fraction-v2-lab-readout-main">
                    <MathText text={`$(${formatNatural(to)}-${formatNatural(from)})\\mathbin{:}${parts}=${formatNatural(jump)}$`} />
                </span>
                <span className="fraction-v2-lab-readout-note">{l({ eu: `Zein zenbaki dago ${mark}. markan?`, es: `¿Qué número hay en la marca ${mark}?`, ar: `ما العدد عند العلامة ${mark}؟` })}</span>
                <NaturalAnswer language={props.language} state={state} expected={{ numerator: asked ?? 0, denominator: 1 }} onChange={(patch) => setState((current) => ({ ...current, ...patch }))} />
            </>
        )

    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={lineChallenges} state={state}>
            <div className="naturals-lab-figure">
                <svg viewBox={`0 0 ${width} 200`} className="naturals-figure" role="img" aria-label={l({ eu: `${formatNatural(from)}tik ${formatNatural(to)}ra ${parts} salto`, es: `De ${formatNatural(from)} a ${formatNatural(to)} en ${parts} saltos`, ar: `من ${formatNatural(from)} إلى ${formatNatural(to)} في ${parts} قفزات` })}>
                    {jump !== null && Array.from({ length: parts }, (_, index) => (
                        <g key={index}>
                            <path d={`M${x(index)} ${lineY - 8} Q ${(x(index) + x(index + 1)) / 2} ${lineY - 70} ${x(index + 1)} ${lineY - 8}`} fill="none" stroke="var(--stage, #2f6fdb)" strokeWidth={2.4} />
                            <text x={(x(index) + x(index + 1)) / 2} y={lineY - 46} textAnchor="middle" fontSize={parts > 6 ? 12 : 14} fontWeight={700} fill="var(--stage, #2f6fdb)">+{formatNatural(jump)}</text>
                        </g>
                    ))}
                    <line x1={left - 24} x2={right + 24} y1={lineY} y2={lineY} stroke="var(--ink)" strokeWidth={2.4} />
                    {Array.from({ length: parts + 1 }, (_, index) => {
                        const end = index === 0 || index === parts
                        const isAsked = index === mark
                        return (
                            <g key={index}>
                                <line x1={x(index)} x2={x(index)} y1={lineY - 10} y2={lineY + 10} stroke="var(--ink)" strokeWidth={end ? 3 : 2} />
                                {isAsked && <circle cx={x(index)} cy={lineY} r={9} fill="var(--stage, #2f6fdb)" stroke="var(--ink)" strokeWidth={1.8} />}
                                {end && <text x={x(index)} y={lineY + 40} textAnchor="middle" fontSize={16} fontWeight={700} fill="var(--ink)">{formatNatural(index === 0 ? from : to)}</text>}
                                {isAsked && <text x={x(index)} y={lineY + 40} textAnchor="middle" fontSize={16} fontWeight={700} fill="var(--stage, #2f6fdb)">{shown && asked !== null ? formatNatural(asked) : '?'}</text>}
                            </g>
                        )
                    })}
                </svg>
            </div>
        </ToolFrame>
    )
}
