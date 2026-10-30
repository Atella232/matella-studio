import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types'
import { useState, type CSSProperties } from 'react'
import { MathText } from '../../../components/MathText'
import { gcd } from '../math/fraction'
import {
    commonDivisors,
    EQUIVALENCE_LIMITS,
    equivalenceChallenges,
    equivalenceResult,
    initialEquivalenceState,
    setEquivalenceBase,
    type EquivalenceState
} from './labTools'
import type { ToolProps } from './labTools'
import { Segmented, Stepper, ToolFrame } from './LabKit'
import { MergeBar, PartitionBar } from './models'
import { mergeDuration } from './motion'
import { equivalenceExtra } from './extraChallenges'
import { useLabText } from './useLabText'

export function EquivalenceTool(props: ToolProps & { challenges?: LabChallenge<EquivalenceState>[]; extraChallenges?: LabChallengeMaker<EquivalenceState> }) {
    const l = useLabText(props.language)
    const [state, setState] = useState<EquivalenceState>(initialEquivalenceState)
    const { numerator, denominator, mode, factor, divisor } = state
    const result = equivalenceResult(state)
    const divisors = commonDivisors(numerator, denominator)
    const simplified = mode === 'simplify' && divisor !== null && divisors.includes(divisor)
    const resultIsIrreducible = gcd(result.numerator, result.denominator) === 1
    // Simplifying merges the pieces in groups of the divisor
    const group = simplified && divisor !== null ? divisor : 1

    const controls = (
        <>
            <h3>{l({ eu: 'Hasierako zatikia', es: 'Fracción de partida', en: 'Starting fraction', ar: 'الكسر الأصلي' })}</h3>
            <Stepper label={l({ eu: 'Zenbakitzailea', es: 'Numerador', en: 'Numerator', ar: 'البسط' })} value={numerator} min={1} max={denominator} onChange={(next) => setState((current) => setEquivalenceBase(current, next, current.denominator))} language={props.language} />
            <Stepper label={l({ eu: 'Izendatzailea', es: 'Denominador', en: 'Denominator', ar: 'المقام' })} value={denominator} min={EQUIVALENCE_LIMITS.minDenominator} max={EQUIVALENCE_LIMITS.maxDenominator} onChange={(next) => setState((current) => setEquivalenceBase(current, current.numerator, next))} language={props.language} />
            <Segmented
                label={l({ eu: 'Zer egin', es: 'Qué hacer', en: 'What to do', ar: 'ماذا تفعل' })}
                value={mode}
                options={[
                    { value: 'amplify', label: l({ eu: 'Anplifikatu', es: 'Amplificar', en: 'Expanding', ar: 'توسيع' }) },
                    { value: 'simplify', label: l({ eu: 'Sinplifikatu', es: 'Simplificar', en: 'Simplify', ar: 'تبسيط' }) }
                ]}
                onChange={(next) => setState((current) => ({ ...current, mode: next }))}
            />
            {mode === 'amplify' ? (
                <Stepper label={l({ eu: 'Biderkatu honekin', es: 'Multiplicar por', en: 'Multiply by', ar: 'اضرب في' })} value={factor} min={EQUIVALENCE_LIMITS.minFactor} max={EQUIVALENCE_LIMITS.maxFactor} onChange={(next) => setState((current) => ({ ...current, factor: next }))} language={props.language} />
            ) : divisors.length === 0 ? (
                <p className="fraction-v2-lab-tip">{l({ eu: 'Ez dago zatitzaile komunik: zatikia laburtezina da jada.', es: 'No hay ningún divisor común: la fracción ya es irreducible.', en: 'There is no common divisor: the fraction is already in its simplest form.', ar: 'لا يوجد قاسم مشترك: الكسر في أبسط صورة بالفعل.' })}</p>
            ) : (
                <div className="fraction-v2-segmented" role="group" aria-label={l({ eu: 'Zatitu honekin', es: 'Dividir entre', en: 'Divide by', ar: 'اقسم على' })}>
                    <span className="fraction-v2-stepper-label" aria-hidden="true">{l({ eu: 'Zatitu honekin', es: 'Dividir entre', en: 'Divide by', ar: 'اقسم على' })}</span>
                    <div>
                        {divisors.map((candidate) => (
                            <button type="button" aria-pressed={divisor === candidate} onClick={() => setState((current) => ({ ...current, divisor: candidate }))} key={candidate}>{candidate}</button>
                        ))}
                    </div>
                </div>
            )}
        </>
    )

    let formula: string
    let note: string
    if (mode === 'amplify') {
        formula = `\\frac{${numerator}}{${denominator}}=\\frac{${numerator}\\cdot${factor}}{${denominator}\\cdot${factor}}=\\frac{${result.numerator}}{${result.denominator}}`
        note = l({
            eu: `Zati bakoitza ${factor} zatitan banatu da: ${factor} aldiz zati gehiago daude eta ${factor} aldiz koloreztatu gehiago.`,
            es: `Cada porción se ha partido en ${factor}: hay ${factor} veces más partes y ${factor} veces más coloreadas.`,
            en: `Each piece has been split into ${factor} parts: there are ${factor} times as many parts and ${factor} times as many coloured ones.`,
            ar: `قُسّم كل جزء إلى ${factor}: صار عدد الأجزاء وعدد الأجزاء الملوّنة ${factor} أضعاف.`
        })
    } else if (simplified) {
        formula = `\\frac{${numerator}}{${denominator}}=\\frac{${numerator}:${divisor}}{${denominator}:${divisor}}=\\frac{${result.numerator}}{${result.denominator}}`
        note = `${l({ eu: `Zatiak ${divisor} zatiko taldeetan bildu dira.`, es: `Se han juntado las porciones de ${divisor} en ${divisor}.`, en: `The pieces have been grouped ${divisor} by ${divisor}.`, ar: `جُمعت الأجزاء كل ${divisor} معًا.` })}${resultIsIrreducible ? ` ${l({ eu: 'Zatiki laburtezina da.', es: 'Es la fracción irreducible.', en: 'It is in its simplest form.', ar: 'إنه الكسر في أبسط صورة.' })}` : ''}`
    } else {
        formula = `\\frac{${numerator}}{${denominator}}`
        note = divisors.length === 0
            ? l({ eu: 'Zatiki laburtezina da: ezin da sinplifikatu.', es: 'Es irreducible: no se puede simplificar.', en: 'It is in its simplest form: it cannot be simplified.', ar: 'إنه في أبسط صورة: لا يمكن تبسيطه.' })
            : l({ eu: 'Aukeratu zatitzaile komun bat.', es: 'Elige un divisor común.', en: 'Choose a common divisor.', ar: 'اختر قاسمًا مشتركًا.' })
    }

    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$${formula}$`} /></span>
            <span className="fraction-v2-lab-readout-note">{note}</span>
        </>
    )

    const startLabel = `${l({ eu: 'Hasierako zatikia', es: 'Fracción de partida', en: 'Starting fraction', ar: 'الكسر الأصلي' })}: ${numerator}/${denominator}`
    const resultLabel = `${l({ eu: 'Zatiki baliokidea', es: 'Fracción equivalente', en: 'Equivalent fraction', ar: 'الكسر المكافئ' })}: ${result.numerator}/${result.denominator}`

    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={props.challenges ?? equivalenceChallenges}
            extraChallenges={props.challenges ? props.extraChallenges : equivalenceExtra} state={state}>
            <div className="fraction-v2-bar-stack">
                <div className="fraction-v2-bar-row">
                    <span className="fraction-v2-bar-label"><MathText text={`$\\frac{${numerator}}{${denominator}}$`} /></span>
                    <PartitionBar parts={denominator} filled={numerator} label={startLabel} />
                </div>
                <div className="fraction-v2-bar-row">
                    {/* The new name appears once the pieces have been cut or merged */}
                    <span
                        className="fraction-v2-bar-label fraction-v2-merge-label"
                        style={{ '--delay': `${mode === 'simplify' ? mergeDuration(denominator, group) : 0}ms` } as CSSProperties}
                        key={`${result.numerator}/${result.denominator}`}
                    >
                        <MathText text={`$\\frac{${result.numerator}}{${result.denominator}}$`} />
                    </span>
                    {mode === 'amplify'
                        ? <PartitionBar parts={denominator} filled={numerator} ghostPerPart={factor} label={resultLabel} />
                        : <MergeBar parts={denominator} filled={numerator} group={group} label={resultLabel} />}
                </div>
            </div>
        </ToolFrame>
    )
}
