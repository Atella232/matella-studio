// Tool carried over from the first V2 laboratory, now with its own controls.
// It will be rebuilt as the fraction-of-a-quantity and percentages tool.
import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import type { PrototypeLanguage } from '../content'
import { fraction, multiply, toExactDecimal, toLatex } from '../math/fraction'
import type { LabToolInfo } from './labTools'
import { Stepper, ToolFrame } from './LabKit'
import { useLabText } from './useLabText'

export interface ToolProps {
    tool: LabToolInfo
    stageLabel: string
    language: PrototypeLanguage
    completedIds: number[]
    onComplete: (id: number) => void
    onOpenLesson: () => void
}

function FractionSteppers({
    title,
    numerator,
    denominator,
    minNumerator,
    onNumerator,
    onDenominator,
    language
}: {
    title?: string
    numerator: number
    denominator: number
    minNumerator: number
    onNumerator: (value: number) => void
    onDenominator: (value: number) => void
    language: PrototypeLanguage
}) {
    const l = useLabText(language)
    return (
        <>
            {title && <h3>{title}</h3>}
            <Stepper label={l({ eu: 'Zenbakitzailea', es: 'Numerador', ar: 'البسط' })} value={numerator} min={minNumerator} max={12} onChange={onNumerator} language={language} />
            <Stepper label={l({ eu: 'Izendatzailea', es: 'Denominador', ar: 'المقام' })} value={denominator} min={2} max={12} onChange={onDenominator} language={language} />
        </>
    )
}

export function ProportionTool(props: ToolProps) {
    const l = useLabText(props.language)
    const [numerator, setNumerator] = useState(3)
    const [denominator, setDenominator] = useState(5)
    const [quantity, setQuantity] = useState(120)
    const value = fraction(numerator, denominator)
    const exactDecimal = toExactDecimal(value, props.language === 'ar' ? '.' : ',')
    const percentage = multiply(value, fraction(100))
    const part = multiply(value, fraction(quantity))

    return (
        <ToolFrame
            {...props}
            controls={(
                <>
                    <FractionSteppers numerator={numerator} denominator={denominator} minNumerator={0} onNumerator={setNumerator} onDenominator={setDenominator} language={props.language} />
                    <Stepper label={l({ eu: 'Kantitatea', es: 'Cantidad', ar: 'الكمية' })} value={quantity} min={10} max={300} step={10} onChange={setQuantity} language={props.language} />
                </>
            )}
            readout={<MathText text={`$\\frac{${numerator}}{${denominator}}\\cdot${quantity}=${toLatex(part)}$`} />}
        >
            <div className="fraction-v2-proportion-grid">
                <article><span>{l({ eu: 'Zatikia', es: 'Fracción', ar: 'الكسر' })}</span><MathText text={`$\\frac{${numerator}}{${denominator}}$`} /></article>
                <article><span>{l({ eu: 'Hamartarra', es: 'Decimal', ar: 'العشري' })}</span><strong>{exactDecimal ?? l({ eu: 'periodikoa', es: 'periódico', ar: 'دوري' })}</strong></article>
                <article><span>{l({ eu: 'Ehunekoa', es: 'Porcentaje', ar: 'النسبة المئوية' })}</span><MathText text={`$${toLatex(percentage)}\\%$`} /></article>
            </div>
        </ToolFrame>
    )
}
