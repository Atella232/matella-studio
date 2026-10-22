import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types'
import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { fraction, type FractionValue } from '../math/fraction'
import {
    initialSumState,
    OPERATION_LIMITS,
    resultVisible,
    setPrediction,
    setSumOp,
    setSumOperand,
    setWorksheet,
    sumChallenges,
    sumParts,
    sumPrediction,
    type SumState
} from './labTools'
import type { ToolProps } from './labTools'
import { Segmented, Stepper, ToolFrame } from './LabKit'
import { PartitionBar, SegmentBars, type SegmentTone } from './models'
import { sumExtra } from './extraChallenges'
import { PredictionStep } from './PredictionStep'
import { SumWorksheetPanel } from './SumWorksheet'
import { useLabText } from './useLabText'

/** Beyond this many pieces per unit the common split is too thin to draw */
const MAX_DRAWN_PIECES = 36

const latex = (value: FractionValue) => `${value.numerator < 0 ? '-' : ''}\\frac{${Math.abs(value.numerator)}}{${value.denominator}}`

function simplifiedTail(value: FractionValue): string {
    const reduced = fraction(value.numerator, value.denominator)
    let tail = ''
    if (reduced.denominator !== value.denominator) tail += `=${reduced.denominator === 1 ? reduced.numerator : latex(reduced)}`
    const absolute = Math.abs(reduced.numerator)
    if (reduced.denominator > 1 && absolute > reduced.denominator) {
        tail += `=${reduced.numerator < 0 ? '-' : ''}${Math.floor(absolute / reduced.denominator)}\\frac{${absolute % reduced.denominator}}{${reduced.denominator}}`
    }
    return tail
}

export function SumTool(props: ToolProps & { challenges?: LabChallenge<SumState>[]; extraChallenges?: LabChallengeMaker<SumState> }) {
    const l = useLabText(props.language)
    const [state, setState] = useState<SumState>(initialSumState)
    const { first, second, op, view } = state
    const { common, first: firstScaled, second: secondScaled, result } = sumParts(state)
    const symbol = op === 'add' ? '+' : '-'
    const showResult = resultVisible(state, result)
    const splitFirst = view === 'common' && common <= MAX_DRAWN_PIECES ? common / first.denominator : 1
    const splitSecond = view === 'common' && common <= MAX_DRAWN_PIECES ? common / second.denominator : 1

    const operandControls = (which: 'first' | 'second', value: FractionValue, title: string) => (
        <>
            <h3>{title}</h3>
            <Stepper label={l({ eu: 'Zenbakitzailea', es: 'Numerador', ar: 'البسط' })} value={value.numerator} min={1} max={value.denominator} onChange={(next) => setState((current) => setSumOperand(current, which, next, current[which].denominator))} language={props.language} />
            <Stepper label={l({ eu: 'Izendatzailea', es: 'Denominador', ar: 'المقام' })} value={value.denominator} min={OPERATION_LIMITS.minDenominator} max={OPERATION_LIMITS.maxDenominator} onChange={(next) => setState((current) => setSumOperand(current, which, current[which].numerator, next))} language={props.language} />
        </>
    )

    const controls = (
        <>
            {operandControls('first', first, l({ eu: 'Lehen zatikia', es: 'Primera fracción', ar: 'الكسر الأول' }))}
            <Segmented label={l({ eu: 'Eragiketa', es: 'Operación', ar: 'العملية' })} value={op} options={[{ value: 'add', label: '+' }, { value: 'subtract', label: '−' }]} onChange={(next) => setState((current) => setSumOp(current, next))} />
            {operandControls('second', second, l({ eu: 'Bigarren zatikia', es: 'Segunda fracción', ar: 'الكسر الثاني' }))}
            <Segmented
                label={l({ eu: 'Barrak', es: 'Barras', ar: 'الأشرطة' })}
                value={view}
                options={[
                    { value: 'original', label: l({ eu: 'Zatikiak', es: 'Fracciones', ar: 'الكسور' }) },
                    { value: 'common', label: l({ eu: 'Izendatzaile bera', es: 'Mismo denominador', ar: 'مقام موحّد' }) }
                ]}
                onChange={(next) => setState((current) => ({ ...current, view: next }))}
            />
        </>
    )

    // Result pieces: the first operand, then the second added after it or crossed out from its end
    const total = Math.max(firstScaled, op === 'add' ? firstScaled + secondScaled : firstScaled)
    const unitCount = Math.max(1, Math.ceil(total / common))
    const units: SegmentTone[][] = Array.from({ length: unitCount }, (_, unit) => Array.from({ length: common }, (_, piece) => {
        const index = unit * common + piece
        if (op === 'add') return index < firstScaled ? 'first' : index < firstScaled + secondScaled ? 'second' : ''
        if (index < firstScaled - secondScaled) return 'first'
        return index < firstScaled ? 'removed' : ''
    }))
    const negative = result.numerator < 0

    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main">
                <MathText text={`$${latex(first)}${symbol}${latex(second)}${view === 'common' || showResult ? `=\\frac{${firstScaled}}{${common}}${symbol}\\frac{${secondScaled}}{${common}}` : ''}${showResult ? `=${latex(result)}${simplifiedTail(result)}` : ''}$`} />
            </span>
            {showResult && negative && (
                <span className="fraction-v2-lab-readout-note">{l({ eu: 'Bigarren zatikia handiagoa denez, emaitza negatiboa da.', es: 'Como la segunda fracción es mayor, el resultado es negativo.', ar: 'بما أن الكسر الثاني أكبر، فالنتيجة سالبة.' })}</span>
            )}
            <PredictionStep
                language={props.language}
                question={op === 'add'
                    ? { eu: 'Kalkulatu aurretik: batura 1 baino txikiagoa, berdina ala handiagoa izango da?', es: 'Antes de calcular: ¿la suma será menor, igual o mayor que 1?', ar: 'قبل الحساب: هل سيكون المجموع أصغر من 1 أم يساويه أم أكبر منه؟' }
                    : { eu: 'Kalkulatu aurretik: kenketa negatiboa, zero ala positiboa izango da?', es: 'Antes de calcular: ¿la resta será negativa, cero o positiva?', ar: 'قبل الحساب: هل سيكون الفرق سالبًا أم صفرًا أم موجبًا؟' }}
                labels={op === 'add' ? undefined : {
                    '<': { eu: 'Negatiboa', es: 'Negativa', ar: 'سالب' },
                    '=': { eu: 'Zero', es: 'Cero', ar: 'صفر' },
                    '>': { eu: 'Positiboa', es: 'Positiva', ar: 'موجب' }
                }}
                actual={sumPrediction(state).relation}
                choice={state.prediction}
                tip={op === 'add'
                    ? { eu: 'Trikimailua: konparatu zatiki bakoitza erdiarekin. Biak erdia baino handiagoak badira, batura 1 baino handiagoa da; biak txikiagoak badira, ez da 1era iristen.', es: 'Truco: compara cada fracción con la mitad. Si las dos pasan de la mitad, la suma pasa de 1; si las dos se quedan por debajo, no llega a 1.', ar: 'حيلة: قارن كل كسر بالنصف. إذا تجاوز الكسران النصف تجاوز المجموع 1، وإذا كانا أصغر منه لم يبلغ 1.' }
                    : { eu: 'Lehena baino zatiki handiago bat kentzen baduzu, emaitza negatiboa da; txikiagoa bada, positiboa.', es: 'Si restas una fracción mayor que la primera, el resultado es negativo; si es menor, positivo.', ar: 'إذا طرحت كسرًا أكبر من الأول فالنتيجة سالبة، وإذا كان أصغر فهي موجبة.' }}
                onChoose={(relation) => setState((current) => setPrediction(current, relation))}
            >
                <SumWorksheetPanel
                    language={props.language}
                    state={state}
                    onWorksheet={(patch) => setState((current) => setWorksheet(current, patch))}
                    onAnswer={(patch) => setState((current) => ({ ...current, ...patch }))}
                />
            </PredictionStep>
        </>
    )

    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={props.challenges ?? sumChallenges}
            extraChallenges={props.challenges ? props.extraChallenges : sumExtra} state={state}>
            <div className="fraction-v2-bar-stack">
                <div className="fraction-v2-bar-row">
                    <span className="fraction-v2-bar-label"><MathText text={`$${latex(first)}$`} /></span>
                    <PartitionBar parts={first.denominator} filled={first.numerator} ghostPerPart={splitFirst} label={`${first.numerator}/${first.denominator}`} />
                </div>
                <div className="fraction-v2-bar-row">
                    <span className="fraction-v2-bar-label"><MathText text={`$${symbol === '+' ? '+' : '-'}\\,${latex(second)}$`} /></span>
                    <PartitionBar parts={second.denominator} filled={second.numerator} ghostPerPart={splitSecond} tone="second" label={`${second.numerator}/${second.denominator}`} />
                </div>
                {view === 'common' && common > MAX_DRAWN_PIECES && (
                    <p className="fraction-v2-insight">{l({ eu: `Izendatzaile komuna ${common} da: zati gehiegi marrazteko.`, es: `El denominador común es ${common}: demasiadas partes para dibujarlas.`, ar: `المقام المشترك هو ${common}: أجزاء كثيرة جدًا لرسمها.` })}</p>
                )}
                {showResult && !negative && common <= MAX_DRAWN_PIECES && (
                    <div className="fraction-v2-bar-row">
                        <span className="fraction-v2-bar-label"><MathText text={`$=${latex(result)}$`} /></span>
                        <SegmentBars units={units} label={`${result.numerator}/${result.denominator}`} />
                    </div>
                )}
            </div>
        </ToolFrame>
    )
}
