import type { LabChallenge, LabToolInfo as UnitLabToolInfo } from '../../../features/unit-v2/lab/types'
import { useState, type CSSProperties, type KeyboardEvent } from 'react'
import { MathText } from '../../../components/MathText'
import type { LocalizedText, PrototypeLanguage } from '../content'
import {
    clearParts,
    fillAllParts,
    gridLayout,
    initialPartsState,
    partsChallenges,
    PARTS_LIMITS,
    setPartsDenominator,
    setPartsUnits,
    togglePart,
    type PartsShape,
    type PartsState
} from './labTools'
import { Segmented, Stepper, ToolFrame } from './LabKit'
import { useLabText } from './useLabText'

interface PartProps {
    index: number
    unit: number
    part: number
    filled: boolean
}

function wedgePath(part: number, parts: number): string {
    const radius = 92
    const center = 100
    const start = (part / parts) * Math.PI * 2 - Math.PI / 2
    const end = ((part + 1) / parts) * Math.PI * 2 - Math.PI / 2
    const point = (angle: number) => `${center + radius * Math.cos(angle)} ${center + radius * Math.sin(angle)}`
    const largeArc = end - start > Math.PI ? 1 : 0
    return `M ${center} ${center} L ${point(start)} A ${radius} ${radius} 0 ${largeArc} 1 ${point(end)} Z`
}

export function PartsTool({
    tool,
    stageLabel,
    language,
    completedIds,
    onComplete,
    onOpenLesson,
    challenges = partsChallenges
}: {
    tool: UnitLabToolInfo
    challenges?: LabChallenge<PartsState>[]
    stageLabel: string
    language: PrototypeLanguage
    completedIds: number[]
    onComplete: (id: number) => void
    onOpenLesson: () => void
}) {
    const l = useLabText(language)
    const [state, setState] = useState<PartsState>(initialPartsState)
    const { denominator, units, filled, shape } = state
    const numerator = filled.length
    const whole = Math.floor(numerator / denominator)
    const remainder = numerator % denominator

    const partLabel = ({ unit, part, filled: isFilled }: PartProps) => {
        const position: LocalizedText = {
            eu: `${unit + 1}. unitatea, ${part + 1}. zatia / ${denominator}`,
            es: `Unidad ${unit + 1}, parte ${part + 1} de ${denominator}`,
            ar: `الوحدة ${unit + 1}، الجزء ${part + 1} من ${denominator}`
        }
        const status: LocalizedText = isFilled
            ? { eu: 'koloreztatua', es: 'coloreada', ar: 'ملوّن' }
            : { eu: 'zuria', es: 'sin colorear', ar: 'غير ملوّن' }
        return `${l(position)}, ${l(status)}`
    }

    const toggle = (index: number) => setState((current) => togglePart(current, index))
    const onPartKey = (event: KeyboardEvent<SVGPathElement>, index: number) => {
        if (event.key !== 'Enter' && event.key !== ' ') return
        event.preventDefault()
        toggle(index)
    }

    const unitsList = Array.from({ length: units }, (_, unit) => unit)
    const partsList = Array.from({ length: denominator }, (_, part) => part)
    const { rows, columns } = gridLayout(denominator)

    const shapeOptions: Array<{ value: PartsShape; label: string }> = [
        { value: 'bar', label: l({ eu: 'Barra', es: 'Barra', ar: 'شريط' }) },
        { value: 'circle', label: l({ eu: 'Zirkulua', es: 'Círculo', ar: 'دائرة' }) },
        { value: 'grid', label: l({ eu: 'Laukizuzena', es: 'Rectángulo', ar: 'مستطيل' }) }
    ]

    const controls = (
        <>
            <Segmented label={l({ eu: 'Forma', es: 'Forma', ar: 'الشكل' })} value={shape} options={shapeOptions} onChange={(next) => setState((current) => ({ ...current, shape: next }))} />
            <Stepper
                label={l({ eu: 'Zatiak unitateko', es: 'Partes por unidad', ar: 'أجزاء كل وحدة' })}
                value={denominator}
                min={PARTS_LIMITS.minDenominator}
                max={PARTS_LIMITS.maxDenominator}
                onChange={(next) => setState((current) => setPartsDenominator(current, next))}
                language={language}
            />
            <Stepper
                label={l({ eu: 'Unitateak', es: 'Unidades', ar: 'الوحدات' })}
                value={units}
                min={PARTS_LIMITS.minUnits}
                max={PARTS_LIMITS.maxUnits}
                onChange={(next) => setState((current) => setPartsUnits(current, next))}
                language={language}
            />
            <div className="fraction-v2-lab-quick-actions">
                <button type="button" onClick={() => setState(clearParts)}>{l({ eu: 'Hustu', es: 'Vaciar', ar: 'إفراغ' })}</button>
                <button type="button" onClick={() => setState(fillAllParts)}>{l({ eu: 'Dena bete', es: 'Llenar todo', ar: 'املأ الكل' })}</button>
            </div>
            <p className="fraction-v2-lab-tip">{l({ eu: 'Sakatu zati bat koloreztatzeko edo kentzeko.', es: 'Pulsa una parte para colorearla o quitarle el color.', ar: 'اضغط على جزء لتلوينه أو إزالة لونه.' })}</p>
        </>
    )

    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main">
                <MathText text={`$\\frac{${numerator}}{${denominator}}$`} />
                {numerator > denominator && remainder > 0 && (
                    <>
                        <span aria-hidden="true">=</span>
                        <MathText text={`$${whole}\\frac{${remainder}}{${denominator}}$`} />
                    </>
                )}
                {numerator >= denominator && remainder === 0 && numerator > 0 && (
                    <>
                        <span aria-hidden="true">=</span>
                        <MathText text={`$${whole}$`} />
                    </>
                )}
            </span>
            <span className="fraction-v2-lab-readout-note">
                {numerator === 0
                    ? l({ eu: 'Ez dago zatirik koloreztatuta.', es: 'No hay ninguna parte coloreada.', ar: 'لا يوجد أي جزء ملوّن.' })
                    : numerator < denominator
                        ? l({ eu: 'Zatiki propioa: unitate bat baino gutxiago.', es: 'Fracción propia: menos de una unidad.', ar: 'كسر حقيقي: أقل من وحدة.' })
                        : numerator === denominator
                            ? l({ eu: 'Unitate oso bat.', es: 'Una unidad completa.', ar: 'وحدة كاملة.' })
                            : l({ eu: 'Zatiki inpropioa: unitate bat baino gehiago.', es: 'Fracción impropia: más de una unidad.', ar: 'كسر غير حقيقي: أكثر من وحدة.' })}
            </span>
        </>
    )

    return (
        <ToolFrame
            tool={tool}
            language={language}
            stageLabel={stageLabel}
            controls={controls}
            readout={readout}
            challenges={challenges}
            state={state}
            completedIds={completedIds}
            onComplete={onComplete}
            onOpenLesson={onOpenLesson}
        >
            <div className={`fraction-v2-parts fraction-v2-parts-${shape}`} data-units={units}>
                {unitsList.map((unit) => (
                    <div className="fraction-v2-parts-unit" key={unit}>
                        {shape === 'circle' ? (
                            <svg viewBox="0 0 200 200" className="fraction-v2-parts-pie">
                                {partsList.map((part) => {
                                    const index = unit * denominator + part
                                    const isFilled = filled.includes(index)
                                    return (
                                        <path
                                            key={part}
                                            d={wedgePath(part, denominator)}
                                            className={isFilled ? 'filled' : ''}
                                            role="button"
                                            tabIndex={0}
                                            aria-pressed={isFilled}
                                            aria-label={partLabel({ index, unit, part, filled: isFilled })}
                                            onClick={() => toggle(index)}
                                            onKeyDown={(event) => onPartKey(event, index)}
                                        />
                                    )
                                })}
                            </svg>
                        ) : (
                            <div
                                className="fraction-v2-parts-cells"
                                style={shape === 'grid'
                                    ? { gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`, gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))` } as CSSProperties
                                    : { gridTemplateColumns: `repeat(${denominator}, minmax(0, 1fr))` } as CSSProperties}
                            >
                                {partsList.map((part) => {
                                    const index = unit * denominator + part
                                    const isFilled = filled.includes(index)
                                    return (
                                        <button
                                            type="button"
                                            key={part}
                                            className={isFilled ? 'filled' : ''}
                                            aria-pressed={isFilled}
                                            aria-label={partLabel({ index, unit, part, filled: isFilled })}
                                            onClick={() => toggle(index)}
                                        />
                                    )
                                })}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </ToolFrame>
    )
}
