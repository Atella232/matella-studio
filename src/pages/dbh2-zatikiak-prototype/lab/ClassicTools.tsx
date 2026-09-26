// Tools carried over from the first V2 laboratory, now with their own controls.
// Each one will be rebuilt in later steps (operations → sum/difference and
// product/quotient, fraction of a quantity).
import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import type { PrototypeLanguage } from '../content'
import {
    add,
    divide,
    fraction,
    multiply,
    subtract,
    toExactDecimal,
    toLatex,
    type FractionValue
} from '../math/fraction'
import type { LabToolInfo } from './labTools'
import { Segmented, Stepper, ToolFrame } from './LabKit'
import { useLabText } from './useLabText'
import { FractionModel } from './models'

export interface ToolProps {
    tool: LabToolInfo
    stageLabel: string
    language: PrototypeLanguage
    completedIds: number[]
    onComplete: (id: number) => void
    onOpenLesson: () => void
}

type Operation = 'add' | 'subtract' | 'multiply' | 'divide'
const operationSymbols: Record<Operation, string> = { add: '+', subtract: '−', multiply: '×', divide: '÷' }

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

function useTwoFractions() {
    const [firstNumerator, setFirstNumerator] = useState(3)
    const [firstDenominator, setFirstDenominator] = useState(8)
    const [secondNumerator, setSecondNumerator] = useState(1)
    const [secondDenominator, setSecondDenominator] = useState(2)
    return {
        first: { numerator: firstNumerator, denominator: firstDenominator },
        second: { numerator: secondNumerator, denominator: secondDenominator },
        setFirstNumerator,
        setFirstDenominator,
        setSecondNumerator,
        setSecondDenominator
    }
}

function TwoFractionControls({ fractions, language, minNumerator }: { fractions: ReturnType<typeof useTwoFractions>; language: PrototypeLanguage; minNumerator: number }) {
    const l = useLabText(language)
    return (
        <>
            <FractionSteppers title={l({ eu: 'Lehen zatikia', es: 'Primera fracción', ar: 'الكسر الأول' })} numerator={fractions.first.numerator} denominator={fractions.first.denominator} minNumerator={minNumerator} onNumerator={fractions.setFirstNumerator} onDenominator={fractions.setFirstDenominator} language={language} />
            <FractionSteppers title={l({ eu: 'Bigarren zatikia', es: 'Segunda fracción', ar: 'الكسر الثاني' })} numerator={fractions.second.numerator} denominator={fractions.second.denominator} minNumerator={minNumerator} onNumerator={fractions.setSecondNumerator} onDenominator={fractions.setSecondDenominator} language={language} />
        </>
    )
}

const written = (value: FractionValue) => `${value.numerator < 0 ? '-' : ''}\\frac{${Math.abs(value.numerator)}}{${value.denominator}}`

export function OperationsTool(props: ToolProps) {
    const l = useLabText(props.language)
    const fractions = useTwoFractions()
    const [operation, setOperation] = useState<Operation>('add')
    let result: FractionValue | null
    try {
        if (operation === 'add') result = add(fractions.first, fractions.second)
        else if (operation === 'subtract') result = subtract(fractions.first, fractions.second)
        else if (operation === 'multiply') result = multiply(fractions.first, fractions.second)
        else result = divide(fractions.first, fractions.second)
    } catch {
        result = null
    }

    return (
        <ToolFrame
            {...props}
            controls={(
                <>
                    <TwoFractionControls fractions={fractions} language={props.language} minNumerator={-12} />
                    <Segmented
                        label={l({ eu: 'Eragiketa', es: 'Operación', ar: 'العملية' })}
                        value={operation}
                        options={(Object.keys(operationSymbols) as Operation[]).map((item) => ({ value: item, label: operationSymbols[item] }))}
                        onChange={setOperation}
                    />
                </>
            )}
            readout={(
                <span className="fraction-v2-lab-readout-main">
                    <MathText text={`$${written(fractions.first)}\\;${operationSymbols[operation]}\\;${written(fractions.second)}$`} />
                    <span aria-hidden="true">=</span>
                    {result ? <MathText text={`$${toLatex(result)}$`} /> : <strong>{l({ eu: 'Ezin da zeroz zatitu', es: 'No se puede dividir entre cero', ar: 'لا يمكن القسمة على صفر' })}</strong>}
                </span>
            )}
        >
            <div className="fraction-v2-operands">
                <FractionModel value={fractions.first} label={l({ eu: 'Lehen eragigaia', es: 'Primer operando', ar: 'المعامل الأول' })} />
                <span aria-hidden="true">{operationSymbols[operation]}</span>
                <FractionModel value={fractions.second} label={l({ eu: 'Bigarren eragigaia', es: 'Segundo operando', ar: 'المعامل الثاني' })} />
            </div>
        </ToolFrame>
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
