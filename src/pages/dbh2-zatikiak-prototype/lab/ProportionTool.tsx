import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types'
import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { fraction, type FractionValue } from '../math/fraction'
import { decimalSeparatorFor } from '../../../utils/numberFormat'
import {
    decimalExpansion,
    initialProportionState,
    PROPORTION_LIMITS,
    proportionChallenges,
    proportionPrediction,
    proportionResult,
    resultVisible,
    setPrediction,
    updateProportion,
    type ProportionState,
    type ToolProps
} from './labTools'
import { ResultAnswer, Segmented, Stepper, ToolFrame } from './LabKit'
import { proportionExtra } from './extraChallenges'
import { PredictionStep } from './PredictionStep'
import { useLabText } from './useLabText'

const valueLatex = (value: FractionValue) => value.denominator === 1 ? String(value.numerator) : `\\frac{${value.numerator}}{${value.denominator}}`

/** Decimal with its period marked with an overline: 1/6 → 0,1̅6 written as 0{,}1\overline{6} */
function decimalLatex(numerator: number, denominator: number, separator: string): string {
    const { integer, fixed, repeating } = decimalExpansion(numerator, denominator)
    if (!fixed && !repeating) return String(integer)
    return `${integer}{${separator}}${fixed}${repeating ? `\\overline{${repeating}}` : ''}`
}

export function ProportionTool(props: ToolProps & { challenges?: LabChallenge<ProportionState>[]; extraChallenges?: LabChallengeMaker<ProportionState>; modes?: Array<ProportionState['mode']> }) {
    const l = useLabText(props.language)
    const [state, setState] = useState<ProportionState>(initialProportionState)
    const { mode, numerator, denominator, quantity, percent } = state
    const result = proportionResult(state)
    const showResult = resultVisible(state, result)
    const separator = props.language === 'ar' ? '.' : ','
    const update = (patch: Parameters<typeof updateProportion>[1]) => setState((current) => updateProportion(current, patch))

    const fractionSteppers = (
        <>
            <Stepper label={l({ eu: 'Zenbakitzailea', es: 'Numerador', en: 'Numerator', ar: 'البسط' })} value={numerator} min={1} max={denominator} onChange={(next) => update({ numerator: next })} language={props.language} />
            <Stepper label={l({ eu: 'Izendatzailea', es: 'Denominador', en: 'Denominator', ar: 'المقام' })} value={denominator} min={PROPORTION_LIMITS.minDenominator} max={PROPORTION_LIMITS.maxDenominator} onChange={(next) => update({ denominator: next })} language={props.language} />
        </>
    )
    const quantityStepper = (
        <Stepper label={l({ eu: 'Kantitatea', es: 'Cantidad', en: 'Quantity', ar: 'الكمية' })} value={quantity} min={PROPORTION_LIMITS.minQuantity} max={PROPORTION_LIMITS.maxQuantity} step={PROPORTION_LIMITS.quantityStep} onChange={(next) => update({ quantity: next })} language={props.language} />
    )

    const controls = (
        <>
            <Segmented
                label={l({ eu: 'Modua', es: 'Modo', en: 'Mode', ar: 'الوضع' })}
                value={mode}
                options={([
                    { value: 'of', label: l({ eu: 'Zatikia', es: 'Fracción de', en: 'Fraction of', ar: 'كسر من' }) },
                    { value: 'percent', label: l({ eu: 'Ehunekoa', es: 'Porcentaje', en: 'Percentage', ar: 'نسبة مئوية' }) },
                    { value: 'forms', label: l({ eu: 'Hiru forma', es: 'Tres formas', en: 'Three forms', ar: 'ثلاث صيغ' }) }
                ] as Array<{ value: ProportionState['mode']; label: string }>).filter((option) => !props.modes || props.modes.includes(option.value))}
                onChange={(next) => update({ mode: next })}
            />
            {mode !== 'percent' && fractionSteppers}
            {mode === 'percent' && (
                <Stepper label={l({ eu: 'Ehunekoa (%)', es: 'Porcentaje (%)', en: 'Percentage (%)', ar: 'النسبة المئوية (٪)' })} value={percent} min={0} max={100} step={PROPORTION_LIMITS.percentStep} onChange={(next) => update({ percent: next })} language={props.language} />
            )}
            {mode !== 'forms' && quantityStepper}
        </>
    )

    let readout
    if (mode === 'forms') {
        readout = (
            <span className="fraction-v2-lab-readout-main">
                <MathText text={`$\\frac{${numerator}}{${denominator}}=${decimalLatex(numerator, denominator, separator)}=${decimalLatex(numerator * 100, denominator, separator)}\\,\\%$`} />
            </span>
        )
    } else {
        const reducedPercent = fraction(percent, 100)
        const expression = mode === 'of'
            ? `\\frac{${numerator}}{${denominator}}\\cdot${quantity}${showResult ? `=\\frac{${numerator}\\cdot${quantity}}{${denominator}}=${valueLatex(result)}` : ''}`
            : `${percent}\\,\\%\\cdot${quantity}${showResult ? `=\\frac{${percent}}{100}\\cdot${quantity}=${valueLatex(result)}` : ''}`
        readout = (
            <>
                <span className="fraction-v2-lab-readout-main"><MathText text={`$${expression}$`} /></span>
                {mode === 'percent' && percent > 0 && percent < 100 && (
                    <span className="fraction-v2-lab-readout-note">
                        <MathText text={`$${percent}\\,\\%=\\frac{${percent}}{100}${reducedPercent.denominator !== 100 ? `=${valueLatex(reducedPercent)}` : ''}$`} />
                    </span>
                )}
                <PredictionStep
                    language={props.language}
                    question={{ eu: `Kalkulatu aurretik: emaitza ${quantity} kantitatearen erdia baino txikiagoa, berdina ala handiagoa izango da?`, es: `Antes de calcular: ¿el resultado será menor, igual o mayor que la mitad de ${quantity}?`, en: `Before calculating: will the result be smaller than, equal to or bigger than half of ${quantity}?`, ar: `قبل الحساب: هل ستكون النتيجة أصغر من نصف ${quantity} أم تساويه أم أكبر منه؟` }}
                    actual={proportionPrediction(state).relation}
                    choice={state.prediction}
                    tip={mode === 'of'
                        ? { eu: 'Zatikia erdia baino handiagoa bada, erdia baino gehiago hartzen duzu; txikiagoa bada, gutxiago.', es: 'Si la fracción es mayor que la mitad, tomas más de la mitad; si es menor, menos.', en: 'If the fraction is bigger than a half, you take more than half; if it is smaller, you take less.', ar: 'إذا كان الكسر أكبر من النصف فأنت تأخذ أكثر من النصف، وإذا كان أصغر فأقل.' }
                        : { eu: '% 50 erdia da: ehuneko handiago batek erdia baino gehiago hartzen du; txikiago batek, gutxiago.', es: 'El 50 % es la mitad: un porcentaje mayor toma más de la mitad; uno menor, menos.', en: '50% is a half: a bigger percentage takes more than half; a smaller one takes less.', ar: '50٪ هي النصف: النسبة الأكبر تأخذ أكثر من النصف، والأصغر أقل.' }}
                    onChoose={(relation) => setState((current) => setPrediction(current, relation))}
                >
                    <ResultAnswer language={props.language} state={state} expected={result} onChange={(patch) => setState((current) => ({ ...current, ...patch }))} />
                </PredictionStep>
            </>
        )
    }

    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={props.challenges ?? proportionChallenges}
            extraChallenges={props.challenges ? props.extraChallenges : proportionExtra} state={state}>
            {mode === 'of' && <TapeDiagram numerator={numerator} denominator={denominator} quantity={quantity} showResult={showResult} result={result} language={props.language} />}
            {mode === 'percent' && <PercentBar percent={percent} quantity={quantity} showResult={showResult} result={result} />}
            {mode === 'forms' && <HundredGrid numerator={numerator} denominator={denominator} language={props.language} />}
        </ToolFrame>
    )
}

/** The whole quantity split into equal groups, the chosen groups coloured */
function TapeDiagram({ numerator, denominator, quantity, showResult, result, language }: { numerator: number; denominator: number; quantity: number; showResult: boolean; result: FractionValue; language: ToolProps['language'] }) {
    const l = useLabText(language)
    const group = fraction(quantity, denominator)
    const groups = Array.from({ length: denominator }, (_, index) => index)
    return (
        <div className="fraction-v2-tape">
            <div className="fraction-v2-tape-total"><span>{quantity}</span></div>
            <div className="fraction-v2-tape-bar" role="img" aria-label={l({ eu: `${quantity} ${denominator} taldetan; ${numerator} koloreztatuta`, es: `${quantity} en ${denominator} grupos; ${numerator} coloreados`, en: `${quantity} in ${denominator} groups; ${numerator} coloured`, ar: `${quantity} في ${denominator} مجموعات؛ ${numerator} ملوّنة` })}>
                {groups.map((index) => (
                    <span className={index < numerator ? 'filled' : ''} key={index}>
                        <MathText text={`$${valueLatex(group)}$`} />
                    </span>
                ))}
            </div>
            <div className="fraction-v2-tape-part" style={{ width: `${(numerator / denominator) * 100}%` }}>
                <span>{showResult ? <MathText text={`$${valueLatex(result)}$`} /> : '?'}</span>
            </div>
            <p className="fraction-v2-insight">
                {showResult
                    ? l({ eu: `${denominator} talde, bakoitza ${group.denominator === 1 ? group.numerator : `${group.numerator}/${group.denominator}`}; ${numerator} talde hartuta.`, es: `${denominator} grupos de ${group.denominator === 1 ? group.numerator : `${group.numerator}/${group.denominator}`}; se toman ${numerator}.`, en: `${denominator} groups of ${group.denominator === 1 ? group.numerator : `${group.numerator}/${group.denominator}`}; take ${numerator}.`, ar: `${denominator} مجموعات، كل منها ${group.denominator === 1 ? group.numerator : `${group.numerator}/${group.denominator}`}؛ نأخذ ${numerator}.` })
                    : l({ eu: 'Zenbat balio du talde bakoitzak? Eta koloreztatutako taldeek?', es: '¿Cuánto vale cada grupo? ¿Y los grupos coloreados?', en: 'How much is each group worth? And the coloured groups?', ar: 'كم تساوي كل مجموعة؟ وكم تساوي المجموعات الملوّنة؟' })}
            </p>
        </div>
    )
}

/** 0–100 % bar aligned with 0–quantity, marked every 10 % */
function PercentBar({ percent, quantity, showResult, result }: { percent: number; quantity: number; showResult: boolean; result: FractionValue }) {
    const marks = Array.from({ length: 11 }, (_, index) => index * 10)
    return (
        <div className="fraction-v2-percent" role="img" aria-label={`${percent} % · ${quantity}`}>
            <div className="fraction-v2-percent-labels top">
                {marks.map((mark) => <span style={{ left: `${mark}%` }} key={mark}>{mark}%</span>)}
            </div>
            <div className="fraction-v2-percent-bar">
                <span className="fraction-v2-percent-fill" style={{ width: `${percent}%` }} />
                {marks.map((mark) => <i style={{ left: `${mark}%` }} key={mark} />)}
                <span className="fraction-v2-percent-marker" style={{ left: `${percent}%` }} />
            </div>
            <div className="fraction-v2-percent-labels bottom">
                {marks.map((mark) => <span style={{ left: `${mark}%` }} key={mark}>{(quantity * mark) / 100}</span>)}
            </div>
            <div className="fraction-v2-percent-answer" style={{ left: `${percent}%` }}>
                {showResult ? <MathText text={`$${valueLatex(result)}$`} /> : '?'}
            </div>
        </div>
    )
}

/** A hundred-square: the fraction as coloured hundredths, with a partial square when it does not land on a whole one */
function HundredGrid({ numerator, denominator, language }: { numerator: number; denominator: number; language: ToolProps['language'] }) {
    const l = useLabText(language)
    const hundredths = (numerator * 100) / denominator
    const full = Math.floor(hundredths + 1e-9)
    const partial = hundredths - full
    // The rounded number for the label, with the language's decimal mark (Arabic keeps the point)
    const shown = String(Math.round(hundredths * 10) / 10).replace('.', language === 'ar' ? '.' : decimalSeparatorFor(language))
    const cells = Array.from({ length: 100 }, (_, index) => index)
    return (
        <div className="fraction-v2-hundred">
            <div className="fraction-v2-hundred-grid" role="img" aria-label={l({ eu: `100 laukitatik ${shown}`, es: `${shown} de 100 casillas`, en: `${shown} of 100 squares`, ar: `${shown} من 100 خانة` })}>
                {cells.map((index) => (
                    <span className={index < full ? 'filled' : ''} key={index}>
                        {index === full && partial > 1e-9 && <i style={{ width: `${partial * 100}%` }} />}
                    </span>
                ))}
            </div>
            <p className="fraction-v2-insight">{l({
                eu: 'Ehuneko bat ehunen bat da: 100 laukitatik zenbat koloreztatzen diren.',
                es: 'Un porcentaje cuenta centésimas: cuántas casillas de 100 se colorean.',
                en: 'A percentage counts hundredths: how many of the 100 squares are coloured.',
                ar: 'النسبة المئوية تعدّ أجزاء المئة: كم خانة من 100 نلوّن.'
            })}</p>
        </div>
    )
}
