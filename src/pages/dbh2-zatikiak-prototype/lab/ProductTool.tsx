import { useState, type CSSProperties } from 'react'
import { MathText } from '../../../components/MathText'
import { fraction, type FractionValue } from '../math/fraction'
import {
    initialProductState,
    OPERATION_LIMITS,
    productChallenges,
    productResult,
    resultVisible,
    setProductOp,
    setProductOperand,
    type ProductState
} from './labTools'
import type { ToolProps } from './labTools'
import { ResultAnswer, Segmented, Stepper, ToolFrame } from './LabKit'
import { useLabText } from './useLabText'

const latex = (value: FractionValue) => value.denominator === 1 ? String(value.numerator) : `\\frac{${value.numerator}}{${value.denominator}}`

function simplifiedTail(value: FractionValue): string {
    const reduced = fraction(value.numerator, value.denominator)
    let tail = ''
    if (reduced.denominator !== value.denominator) tail += `=${latex(reduced)}`
    if (reduced.denominator > 1 && reduced.numerator > reduced.denominator) {
        tail += `=${Math.floor(reduced.numerator / reduced.denominator)}\\frac{${reduced.numerator % reduced.denominator}}{${reduced.denominator}}`
    }
    return tail
}

export function ProductTool(props: ToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<ProductState>(initialProductState)
    const { first, second, op } = state
    const result = productResult(state)
    const showResult = resultVisible(state, result)

    const operandControls = (which: 'first' | 'second', value: FractionValue, title: string) => (
        <>
            <h3>{title}</h3>
            <Stepper label={l({ eu: 'Zenbakitzailea', es: 'Numerador', ar: 'البسط' })} value={value.numerator} min={1} max={value.denominator} onChange={(next) => setState((current) => setProductOperand(current, which, next, current[which].denominator))} language={props.language} />
            <Stepper label={l({ eu: 'Izendatzailea', es: 'Denominador', ar: 'المقام' })} value={value.denominator} min={OPERATION_LIMITS.minDenominator} max={OPERATION_LIMITS.maxDenominator} onChange={(next) => setState((current) => setProductOperand(current, which, current[which].numerator, next))} language={props.language} />
        </>
    )

    const controls = (
        <>
            {operandControls('first', first, l({ eu: 'Lehen zatikia', es: 'Primera fracción', ar: 'الكسر الأول' }))}
            <Segmented label={l({ eu: 'Eragiketa', es: 'Operación', ar: 'العملية' })} value={op} options={[{ value: 'multiply', label: '×' }, { value: 'divide', label: '÷' }]} onChange={(next) => setState((current) => setProductOp(current, next))} />
            {operandControls('second', second, l({ eu: 'Bigarren zatikia', es: 'Segunda fracción', ar: 'الكسر الثاني' }))}
        </>
    )

    const expression = op === 'multiply'
        ? `${latex(first)}\\cdot${latex(second)}${showResult ? `=\\frac{${first.numerator}\\cdot${second.numerator}}{${first.denominator}\\cdot${second.denominator}}=${latex(result)}${simplifiedTail(result)}` : ''}`
        : `${latex(first)}\\div${latex(second)}${showResult ? `=${latex(first)}\\cdot\\frac{${second.denominator}}{${second.numerator}}=${latex(result)}${simplifiedTail(result)}` : ''}`

    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$${expression}$`} /></span>
            <ResultAnswer language={props.language} state={state} expected={result} onChange={(patch) => setState((current) => ({ ...current, ...patch }))} />
        </>
    )

    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={productChallenges} state={state}>
            {op === 'multiply' ? <AreaModel first={first} second={second} showResult={showResult} language={props.language} /> : <MeasureModel first={first} second={second} showResult={showResult} language={props.language} />}
        </ToolFrame>
    )
}

/** Unit square: the first fraction shades columns, the second shades rows; the overlap is the product */
function AreaModel({ first, second, showResult, language }: { first: FractionValue; second: FractionValue; showResult: boolean; language: ToolProps['language'] }) {
    const l = useLabText(language)
    const cells = Array.from({ length: first.denominator * second.denominator }, (_, index) => {
        const column = index % first.denominator
        const row = Math.floor(index / first.denominator)
        const inFirst = column < first.numerator
        const inSecond = row < second.numerator
        return inFirst && inSecond ? 'both' : inFirst ? 'first' : inSecond ? 'second' : ''
    })
    const overlap = first.numerator * second.numerator
    const total = first.denominator * second.denominator
    return (
        <div className="fraction-v2-area">
            <div className="fraction-v2-area-top"><MathText text={`$${latex(first)}$`} /></div>
            <div className="fraction-v2-area-body">
                <div className="fraction-v2-area-side"><MathText text={`$${latex(second)}$`} /></div>
                <div
                    className="fraction-v2-area-grid"
                    style={{ gridTemplateColumns: `repeat(${first.denominator}, minmax(0, 1fr))`, gridTemplateRows: `repeat(${second.denominator}, minmax(0, 1fr))` } as CSSProperties}
                    role="img"
                    aria-label={l({ eu: `${total} laukitatik ${overlap} gurutzean`, es: `${overlap} de ${total} casillas en el cruce`, ar: `${overlap} من ${total} خانة في التقاطع` })}
                >
                    {cells.map((tone, index) => <span className={tone} key={index} />)}
                </div>
            </div>
            <p className="fraction-v2-insight">
                {showResult
                    ? l({ eu: `Gurutzea: ${total} laukitatik ${overlap}.`, es: `El cruce ocupa ${overlap} de las ${total} casillas.`, ar: `يشغل التقاطع ${overlap} من ${total} خانة.` })
                    : l({ eu: 'Zenbatu bi koloreak gurutzatzen diren laukiak eta lauki guztiak.', es: 'Cuenta las casillas donde se cruzan los dos colores y las casillas totales.', ar: 'عُدّ الخانات التي يتقاطع فيها اللونان وجميع الخانات.' })}
            </p>
        </div>
    )
}

/** Number line: how many jumps of the second fraction fit into the first */
function MeasureModel({ first, second, showResult, language }: { first: FractionValue; second: FractionValue; showResult: boolean; language: ToolProps['language'] }) {
    const l = useLabText(language)
    const target = first.numerator / first.denominator
    const jump = second.numerator / second.denominator
    const fullJumps = Math.floor(target / jump + 1e-9)
    const leftover = target - fullJumps * jump
    const span = Math.max(1, Math.ceil(Math.max(target, jump) - 1e-9))
    const position = (value: number) => `${(value / span) * 100}%`
    const jumps = Array.from({ length: fullJumps }, (_, index) => index)
    const leftoverShare = fraction(first.numerator * second.denominator - fullJumps * first.denominator * second.numerator, first.denominator * second.numerator)

    return (
        <div className="fraction-v2-measure">
            <div className="fraction-v2-measure-line" role="img" aria-label={l({ eu: `${fullJumps} jauzi oso eta hondar bat`, es: `${fullJumps} saltos completos y un resto`, ar: `${fullJumps} قفزات كاملة وباقٍ` })}>
                <span className="fraction-v2-measure-target" style={{ width: position(target) }}>
                    <span><MathText text={`$${latex(first)}$`} /></span>
                </span>
                {jumps.map((index) => (
                    <span className="fraction-v2-measure-jump" style={{ left: position(index * jump), width: position(jump) }} key={index}>{index + 1}</span>
                ))}
                {leftover > 1e-9 && (
                    <span className="fraction-v2-measure-jump partial" style={{ left: position(fullJumps * jump), width: position(leftover) }} />
                )}
                <span className="fraction-v2-measure-axis" />
                {Array.from({ length: span + 1 }, (_, whole) => (
                    <span className="fraction-v2-measure-tick" style={{ left: position(whole) }} data-label={whole} key={whole} />
                ))}
            </div>
            <p className="fraction-v2-insight">
                {showResult
                    ? fullJumps === 0
                        ? l({
                            eu: `Ez da jauzi oso bat ere sartzen: jauzi baten ${leftoverShare.numerator}/${leftoverShare.denominator} baino ez.`,
                            es: `No cabe ni un salto completo: solo cabe ${leftoverShare.numerator}/${leftoverShare.denominator} de salto.`,
                            ar: `لا تتسع ولو قفزة كاملة: يتسع فقط ${leftoverShare.numerator}/${leftoverShare.denominator} من قفزة.`
                        })
                        : leftover > 1e-9
                        ? l({
                            eu: `${fullJumps} jauzi oso sartzen dira, eta hondarra jauzi baten ${leftoverShare.numerator}/${leftoverShare.denominator} da.`,
                            es: `Caben ${fullJumps} saltos completos y lo que sobra es ${leftoverShare.numerator}/${leftoverShare.denominator} de salto.`,
                            ar: `تتسع ${fullJumps} قفزات كاملة، والباقي ${leftoverShare.numerator}/${leftoverShare.denominator} من قفزة.`
                        })
                        : l({ eu: `Zehazki ${fullJumps} jauzi sartzen dira.`, es: `Caben exactamente ${fullJumps} saltos.`, ar: `تتسع ${fullJumps} قفزات تمامًا.` })
                    : l({ eu: `Zenbat jauzi ${second.numerator}/${second.denominator} sartzen dira ${first.numerator}/${first.denominator}ra iritsi arte?`, es: `¿Cuántos saltos de ${second.numerator}/${second.denominator} caben hasta llegar a ${first.numerator}/${first.denominator}?`, ar: `كم قفزة بطول ${second.numerator}/${second.denominator} تتسع حتى تصل إلى ${first.numerator}/${first.denominator}؟` })}
            </p>
        </div>
    )
}
