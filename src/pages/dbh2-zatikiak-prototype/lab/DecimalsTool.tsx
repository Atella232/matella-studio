import { useEffect, useRef, useState } from 'react'
import { MathText } from '../../../components/MathText'
import { NumberField } from '../../../features/unit-v2/lab/NumberField'
import { createRandom, randomSeed } from '../../../features/unit-v2/games/random'
import { decimalSeparatorFor } from '../../../utils/numberFormat'
import type { LocalizedText } from '../content'
import type { ToolProps } from './labTools'
import { ToolFrame } from './LabKit'
import {
    DECIMALS_LIMITS,
    decimalLatex,
    decimalsChallenges,
    decimalsExtra,
    denominatorFactors,
    divisionDone,
    divisionKind,
    finishDivision,
    initialDecimalsState,
    longDivision,
    nextDigit,
    predictDecimal,
    quotientParts,
    randomDecimalsFraction,
    restartDivision,
    setDecimalsNumbers,
    type DecimalKind,
    type DecimalsState
} from './decimals'
import { useLabText } from './useLabText'
import './Primes.css'
import './Prediction.css'
import './Decimals.css'

const KINDS: DecimalKind[] = ['exact', 'pure', 'mixed']

const kindLabels: Record<DecimalKind, LocalizedText> = {
    exact: { eu: 'Zehatza', es: 'Exacto', en: 'Exact', ar: 'منتهٍ' },
    pure: { eu: 'Periodiko hutsa', es: 'Periódico puro', en: 'Pure recurring', ar: 'دوري بحت' },
    mixed: { eu: 'Periodiko mistoa', es: 'Periódico mixto', en: 'Mixed recurring', ar: 'دوري مختلط' }
}

/** Why the simplified denominator gives that kind */
const kindReasons: Record<DecimalKind, LocalizedText> = {
    exact: { eu: '2 eta 5 bakarrik ditu: zatiketa amaitu egiten da.', es: 'Solo tiene doses y cincos: la división se acaba.', en: 'It only has 2s and 5s: the division ends.', ar: 'فيه 2 و5 فقط: القسمة تنتهي.' },
    pure: { eu: 'Ez du ez 2 ez 5: periodoa komaren ondoren hasten da.', es: 'No tiene ni 2 ni 5: el periodo empieza justo después de la coma.', en: 'It has neither 2 nor 5: the repeating block starts right after the decimal point.', ar: 'ليس فيه 2 ولا 5: يبدأ الدور بعد الفاصلة مباشرة.' },
    mixed: { eu: '2 edo 5 eta beste faktore bat ditu: lehenik zifra solte batzuk, eta gero periodoa.', es: 'Tiene 2 o 5 y también otro factor: primero salen unas cifras sueltas y después el periodo.', en: 'It has a 2 or a 5 and another factor too: first some digits that don’t repeat come out, then the repeating block.', ar: 'فيه 2 أو 5 وعامل آخر أيضًا: تظهر بعض الأرقام أولًا ثم الدور.' }
}

const primeClass = (prime: number) => (prime <= 7 ? `p${prime}` : 'pbig')

export function DecimalsTool(props: ToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<DecimalsState>(initialDecimalsState)
    const { numerator, denominator, shown, prediction } = state
    const division = longDivision(numerator, denominator)
    const kind = divisionKind(division)
    const done = divisionDone(state)
    const factors = denominatorFactors(numerator, denominator)
    const parts = quotientParts(division)
    const separator = props.language === 'ar' ? '.' : ','
    const steps = division.steps.slice(0, shown)
    // The remainder that came back, and the step whose remainder it was first (−1: the whole-part division)
    const repeated = done && division.periodStart !== null ? division.steps[division.steps.length - 1].remainder : null
    const firstSeen = done && division.periodStart !== null ? division.periodStart - 1 : null

    const listRef = useRef<HTMLOListElement>(null)
    useEffect(() => {
        const list = listRef.current
        if (list) list.scrollTop = list.scrollHeight
    }, [shown, prediction])

    const controls = (
        <>
            <NumberField label={l({ eu: 'Zenbakitzailea', es: 'Numerador', en: 'Numerator', ar: 'البسط' })} value={numerator} min={DECIMALS_LIMITS.minNumerator} max={DECIMALS_LIMITS.maxNumerator} onChange={(next) => setState((current) => setDecimalsNumbers(current, { numerator: next }))} language={props.language} />
            <NumberField label={l({ eu: 'Izendatzailea', es: 'Denominador', en: 'Denominator', ar: 'المقام' })} value={denominator} min={DECIMALS_LIMITS.minDenominator} max={DECIMALS_LIMITS.maxDenominator} onChange={(next) => setState((current) => setDecimalsNumbers(current, { denominator: next }))} language={props.language} />
            <div className="fraction-v2-lab-quick-actions">
                <button type="button" onClick={() => setState((current) => setDecimalsNumbers(current, randomDecimalsFraction(createRandom(randomSeed()))))}>{l({ eu: 'Beste zatiki bat', es: 'Otra fracción', en: 'Another fraction', ar: 'كسر آخر' })}</button>
            </div>
        </>
    )

    /* ---------- The denominator in prime factors ---------- */

    const reducible = factors.denominator !== denominator
    const factorsBlock = (
        <div className="decimals-factors">
            <p className="decimals-label">{l({ eu: 'Izendatzailea lehen faktoretan', es: 'El denominador en factores primos', en: 'The denominator in prime factors', ar: 'المقام في عوامل أولية' })}</p>
            <div className="decimals-factor-row">
                <span className="primes-number">{denominator} =</span>
                <span className="primes-row">
                    {factors.factors.map((prime, index) => (
                        <span key={index} className={`primes-tile decimals-tile ${primeClass(prime)} ${factors.cancelled[index] ? 'crossed' : ''}`}>{prime}</span>
                    ))}
                </span>
            </div>
            {reducible && (
                <p className="decimals-simplified">
                    {l({ eu: 'Sinplifikatzean, marratutakoak joan egiten dira:', es: 'Al simplificar, los tachados se van:', en: 'When simplifying, the crossed-out factors cancel out:', ar: 'عند الاختزال تذهب العوامل المشطوبة:' })}{' '}
                    <bdi dir="ltr"><MathText inline text={`$\\frac{${numerator}}{${denominator}}=${factors.denominator === 1 ? factors.numerator : `\\frac{${factors.numerator}}{${factors.denominator}}`}$`} /></bdi>
                </p>
            )}
        </div>
    )

    /* ---------- Predict before dividing ---------- */

    const simplifiedLatex = factors.left.length ? `${factors.denominator}=${factors.left.join('\\cdot ')}` : ''
    const right = prediction === kind
    const predictionBlock = (
        <div className="prediction decimals-prediction">
            <p className="prediction-question">{l({ eu: 'Zatitu gabe: zer hamartar emango du?', es: 'Sin dividir: ¿qué decimal saldrá?', en: 'Without dividing: what decimal will come out?', ar: 'من دون قسمة: أي عدد عشري سينتج؟' })}</p>
            <div className="prediction-options" role="group" aria-label={l({ eu: 'Zure iragarpena', es: 'Tu predicción', en: 'Your prediction', ar: 'توقّعك' })}>
                {KINDS.map((option) => (
                    <button
                        type="button"
                        key={option}
                        aria-pressed={prediction === option}
                        className={!done || prediction === null ? '' : option === kind ? 'right' : option === prediction ? 'wrong' : ''}
                        disabled={prediction !== null}
                        onClick={() => setState((current) => predictDecimal(current, option))}
                    >
                        {l(kindLabels[option])}
                    </button>
                ))}
            </div>
            {prediction !== null && !done && (
                <p className="prediction-wait">{l({ eu: 'Zatitu egiaztatzeko.', es: 'Divide para comprobarlo.', en: 'Divide to check.', ar: 'اقسم لتتحقّق.' })}</p>
            )}
            {done && (
                <p className={`prediction-feedback ${right ? 'right' : 'wrong'}`} aria-live="polite">
                    <strong>{right ? l({ eu: 'Ondo pentsatuta!', es: '¡Bien pensado!', en: 'Good thinking!', ar: 'أحسنت التفكير!' }) : l({ eu: 'Ez da horrela.', es: 'No es así.', en: 'That’s not right.', ar: 'ليس كذلك.' })}</strong>{' '}
                    {factors.left.length === 0
                        ? l({ eu: 'Sinplifikatzean izendatzailea desagertu egiten da: zenbaki osoa da.', es: 'Al simplificar, el denominador desaparece: es un número entero.', en: 'When you simplify, the denominator disappears: it is an integer.', ar: 'عند الاختزال يختفي المقام: إنه عدد صحيح.' })
                        : (
                            <>
                                {l({ eu: 'Izendatzaile sinplifikatua:', es: 'Denominador simplificado:', en: 'Simplified denominator:', ar: 'المقام بعد الاختزال:' })}{' '}
                                <bdi dir="ltr"><MathText inline text={`$${simplifiedLatex}$`} /></bdi>.{' '}
                                {l(kindReasons[kind])}
                            </>
                        )}
                </p>
            )}
        </div>
    )

    /* ---------- The division, digit by digit ---------- */

    const digitClass = (index: number) => {
        if (!done || division.periodStart === null) return ''
        return index >= division.periodStart ? 'period' : 'pre'
    }

    const quotient = (
        <div className="decimals-quotient" aria-hidden="true">
            <span className="decimals-digit whole">{division.integer}</span>
            {division.steps.length > 0 && <span className="decimals-comma">{props.language === 'ar' ? '.' : decimalSeparatorFor(props.language)}</span>}
            {steps.map((step, index) => (
                <span key={index} className={`decimals-digit ${digitClass(index)}`}>{step.digit}</span>
            ))}
            {!done && division.steps.length > 0 && <span className="decimals-digit next">?</span>}
            {done && repeated !== null && <span className="decimals-dots">…</span>}
        </div>
    )

    const restLabel = l({ eu: 'hondarra', es: 'resto', en: 'remainder', ar: 'الباقي' })
    const row = (key: string, dividend: number, digit: number, remainder: number, className: string, isRepeat: boolean) => (
        <li key={key} className={className} aria-label={`${dividend} ÷ ${denominator} = ${digit}, ${restLabel} ${remainder}`}>
            <span className="decimals-op">{dividend} ÷ {denominator}</span>
            <span className="decimals-step-digit">{digit}</span>
            <span className={`decimals-rest ${isRepeat ? 'repeat' : ''} ${remainder === 0 ? 'zero' : ''}`}>{remainder}</span>
        </li>
    )

    const stepList = (
        <div className="decimals-steps-wrap">
            <div className="decimals-steps-head" aria-hidden="true">
                <span>{l({ eu: 'Zatiketa', es: 'División', en: 'Division', ar: 'القسمة' })}</span>
                <span>{l({ eu: 'Zifra', es: 'Cifra', en: 'Digit', ar: 'الرقم' })}</span>
                <span>{l({ eu: 'Hondarra', es: 'Resto', en: 'Remainder', ar: 'الباقي' })}</span>
            </div>
            <ol className="decimals-steps" ref={listRef}>
                {row('whole', numerator, division.integer, division.first, 'whole', firstSeen === -1)}
                {steps.map((step, index) => row(String(index), step.dividend, step.digit, step.remainder, digitClass(index), firstSeen === index || (repeated !== null && index === division.steps.length - 1)))}
            </ol>
        </div>
    )

    const used = new Set([division.first, ...steps.map((step) => step.remainder)])
    const remainderChips = (
        <div className="decimals-remainders">
            <p className="decimals-label">
                {l({ eu: 'Hondar posibleak', es: 'Restos posibles', en: 'Possible remainders', ar: 'البواقي الممكنة' })}{' '}
                <span className="decimals-count">{l({ eu: `(${denominator} besterik ez)`, es: `(solo ${denominator})`, en: `(only ${denominator})`, ar: `(عددها ${denominator} فقط)` })}</span>
            </p>
            <div className="decimals-chips">
                {Array.from({ length: denominator }, (_, remainder) => (
                    <span key={remainder} className={`decimals-chip ${used.has(remainder) ? 'used' : ''} ${remainder === repeated ? 'repeat' : ''} ${remainder === 0 ? 'zero' : ''}`}>{remainder}</span>
                ))}
            </div>
        </div>
    )

    const status = (() => {
        if (division.steps.length === 0) return l({ eu: 'Hondarra 0 da hasieratik: zatikia zenbaki osoa da.', es: 'El resto es 0 desde el principio: la fracción es un número entero.', en: 'The remainder is 0 from the start: the fraction is an integer.', ar: 'الباقي 0 منذ البداية: الكسر عدد صحيح.' })
        if (!done) return l({ eu: 'Hondar bakoitzari 0 bat gehitu eta berriro zatitzen da: hori da hurrengo zifra.', es: 'A cada resto se le añade un 0 y se vuelve a dividir: eso da la cifra siguiente.', en: 'A 0 is added to each remainder and you divide again: that gives the next digit.', ar: 'نضيف 0 إلى كل باقٍ ونقسم من جديد: هكذا نحصل على الرقم التالي.' })
        if (repeated === null) return l({ eu: 'Hondarra 0 da: zatiketa amaitu da. Hamartar zehatza.', es: 'El resto es 0: la división termina. Decimal exacto.', en: 'The remainder is 0: the division ends. Exact decimal.', ar: 'الباقي 0: انتهت القسمة. عدد عشري منتهٍ.' })
        if (kind === 'pure') return l({ eu: `${repeated} hondarra itzuli da, lehenengoa: periodoa komaren ondoren hasten da. Periodiko hutsa.`, es: `Ha vuelto el resto ${repeated}, el primero: el periodo empieza justo después de la coma. Periódico puro.`, en: `Remainder ${repeated} has come back, and it is the first one: the repeating block starts right after the decimal point. Pure recurring decimal.`, ar: `عاد الباقي ${repeated}، وهو الأول: يبدأ الدور بعد الفاصلة مباشرة. دوري بحت.` })
        return l({ eu: `${repeated} hondarra itzuli da, baina ez da lehenengoa: periodoaren aurretik zifra solteak daude (aurreperiodoa). Periodiko mistoa.`, es: `Ha vuelto el resto ${repeated}, pero no es el primero: antes del periodo hay cifras sueltas (el anteperiodo). Periódico mixto.`, en: `Remainder ${repeated} has come back, but it is not the first one: before the repeating block there are some digits that don’t repeat (the non-repeating part). Mixed recurring decimal.`, ar: `عاد الباقي ${repeated} لكنه ليس الأول: قبل الدور أرقام أخرى (ما قبل الدور). دوري مختلط.` })
    })()

    const divisionBlock = prediction === null
        ? <p className="prediction-wait">{l({ eu: 'Iragarri lehenik; gero zatitu.', es: 'Primero predice; después divide.', en: 'First predict; then divide.', ar: 'توقّع أولًا، ثم اقسم.' })}</p>
        : (
            <div className="decimals-division">
                <div className="decimals-actions">
                    <button type="button" className="fraction-v2-primary" disabled={done} onClick={() => setState(nextDigit)}>{l({ eu: 'Hurrengo zifra', es: 'Siguiente cifra', en: 'Next digit', ar: 'الرقم التالي' })}</button>
                    <button type="button" className="fraction-v2-secondary" disabled={done} onClick={() => setState(finishDivision)}>{l({ eu: 'Amaierara arte', es: 'Hasta el final', en: 'Until the end', ar: 'حتى النهاية' })}</button>
                    <button type="button" className="fraction-v2-secondary" onClick={() => setState(restartDivision)}>{l({ eu: 'Hasi berriro', es: 'Empezar de nuevo', en: 'Start again', ar: 'ابدأ من جديد' })}</button>
                </div>
                {quotient}
                {done && repeated !== null && (
                    <p className="decimals-legend">
                        {parts.preperiod && <><span className="decimals-key pre" aria-hidden="true" />{l({ eu: 'Aurreperiodoa', es: 'Anteperiodo', en: 'Non-repeating part', ar: 'ما قبل الدور' })}</>}
                        <span className="decimals-key period" aria-hidden="true" />{l({ eu: 'Periodoa', es: 'Periodo', en: 'Repeating block', ar: 'الدور' })}
                    </p>
                )}
                {stepList}
                {remainderChips}
                <p className="fraction-v2-insight" aria-live="polite">{status}</p>
            </div>
        )

    /* ---------- Readout ---------- */

    const sofar = steps.length ? `${division.integer}{${separator}}${steps.map((step) => step.digit).join('')}` : String(division.integer)
    const value = done ? decimalLatex(division, separator) : prediction === null ? '\\;?' : `${sofar}${division.steps.length ? '\\ldots' : ''}`
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$\\frac{${numerator}}{${denominator}}=${value}$`} /></span>
            {done && (
                <span className="fraction-v2-lab-readout-note">
                    {division.steps.length === 0
                        ? l({ eu: 'Zenbaki osoa', es: 'Número entero', en: 'Integer', ar: 'عدد صحيح' })
                        : <>
                            {l(kindLabels[kind])}
                            {parts.preperiod && repeated !== null && <> · {l({ eu: 'aurreperiodoa', es: 'anteperiodo', en: 'non-repeating part', ar: 'ما قبل الدور' })}: <bdi dir="ltr">{parts.preperiod}</bdi></>}
                            {parts.period && <> · {l({ eu: 'periodoa', es: 'periodo', en: 'repeating block', ar: 'الدور' })}: <bdi dir="ltr">{parts.period}</bdi></>}
                        </>}
                </span>
            )}
        </>
    )

    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={decimalsChallenges} extraChallenges={decimalsExtra} state={state}>
            <div className="decimals">
                {factorsBlock}
                {predictionBlock}
                {divisionBlock}
            </div>
        </ToolFrame>
    )
}
