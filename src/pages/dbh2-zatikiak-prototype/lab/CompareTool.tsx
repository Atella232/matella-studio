import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import type { FractionValue } from '../math/fraction'
import {
    COMPARE_LIMITS,
    compareChallenges,
    compareRelation,
    initialCompareState,
    lcm,
    setCompareFraction,
    type CompareState,
    type CompareStrategy,
    type Relation
} from './labTools'
import type { ToolProps } from './labTools'
import { Segmented, Stepper, ToolFrame } from './LabKit'
import { PartitionBar } from './models'
import { useLabText } from './useLabText'

/** Beyond this many pieces the common-denominator split is too thin to draw */
const MAX_DRAWN_PIECES = 36

const latex = (value: FractionValue) => `\\frac{${value.numerator}}{${value.denominator}}`

export function CompareTool(props: ToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<CompareState>(initialCompareState)
    const { first, second, strategy, guess } = state
    const relation = compareRelation(state)
    const common = lcm(first.denominator, second.denominator)
    const firstScaled = first.numerator * (common / first.denominator)
    const secondScaled = second.numerator * (common / second.denominator)
    const drawSplit = common <= MAX_DRAWN_PIECES
    const crossFirst = first.numerator * second.denominator
    const crossSecond = second.numerator * first.denominator

    const relationNames: Record<Relation, string> = {
        '<': l({ eu: 'txikiagoa da', es: 'es menor que', ar: 'أصغر من' }),
        '=': l({ eu: 'berdina da', es: 'es igual a', ar: 'يساوي' }),
        '>': l({ eu: 'handiagoa da', es: 'es mayor que', ar: 'أكبر من' })
    }

    const fractionControls = (which: 'first' | 'second', value: FractionValue, title: string) => (
        <>
            <h3>{title}</h3>
            <Stepper label={l({ eu: 'Zenbakitzailea', es: 'Numerador', ar: 'البسط' })} value={value.numerator} min={1} max={value.denominator} onChange={(next) => setState((current) => setCompareFraction(current, which, next, current[which].denominator))} language={props.language} />
            <Stepper label={l({ eu: 'Izendatzailea', es: 'Denominador', ar: 'المقام' })} value={value.denominator} min={COMPARE_LIMITS.minDenominator} max={COMPARE_LIMITS.maxDenominator} onChange={(next) => setState((current) => setCompareFraction(current, which, current[which].numerator, next))} language={props.language} />
        </>
    )

    const strategyOptions: Array<{ value: CompareStrategy; label: string }> = [
        { value: 'common', label: l({ eu: 'Izend. komuna', es: 'Denom. común', ar: 'مقام مشترك' }) },
        { value: 'line', label: l({ eu: 'Zuzena', es: 'Recta', ar: 'الخط' }) },
        { value: 'cross', label: l({ eu: 'Gurutzatua', es: 'Cruzados', ar: 'تبادلي' }) }
    ]

    const controls = (
        <>
            {fractionControls('first', first, l({ eu: 'Lehen zatikia', es: 'Primera fracción', ar: 'الكسر الأول' }))}
            {fractionControls('second', second, l({ eu: 'Bigarren zatikia', es: 'Segunda fracción', ar: 'الكسر الثاني' }))}
            <Segmented label={l({ eu: 'Estrategia', es: 'Estrategia', ar: 'الاستراتيجية' })} value={strategy} options={strategyOptions} onChange={(next) => setState((current) => ({ ...current, strategy: next }))} />
        </>
    )

    const readout = (
        <>
            <div className="fraction-v2-cmp-guess" role="group" aria-label={l({ eu: 'Zure iragarpena', es: 'Tu predicción', ar: 'توقّعك' })}>
                <MathText text={`$${latex(first)}$`} />
                {(['<', '=', '>'] as Relation[]).map((option) => (
                    <button
                        type="button"
                        aria-pressed={guess === option}
                        aria-label={relationNames[option]}
                        className={guess === option ? (option === relation ? 'right' : 'wrong') : ''}
                        onClick={() => setState((current) => ({ ...current, guess: option }))}
                        key={option}
                    >
                        {option}
                    </button>
                ))}
                <MathText text={`$${latex(second)}$`} />
            </div>
            <span className="fraction-v2-lab-readout-note" aria-live="polite">
                {guess === null
                    ? l({ eu: 'Aukeratu zure iragarpena: <, = edo >.', es: 'Elige tu predicción: <, = o >.', ar: 'اختر توقّعك: < أو = أو >.' })
                    : guess === relation
                        ? l({ eu: 'Ondo ikusita!', es: '¡Bien visto!', ar: 'أحسنت الملاحظة!' })
                        : l({ eu: 'Ez da horrela: begiratu estrategiari eta saiatu berriro.', es: 'No es así: mira la estrategia y vuelve a intentarlo.', ar: 'ليس كذلك: انظر إلى الاستراتيجية وحاول مجددًا.' })}
            </span>
        </>
    )

    const firstLabel = `${l({ eu: 'Lehen zatikia', es: 'Primera fracción', ar: 'الكسر الأول' })}: ${first.numerator}/${first.denominator}`
    const secondLabel = `${l({ eu: 'Bigarren zatikia', es: 'Segunda fracción', ar: 'الكسر الثاني' })}: ${second.numerator}/${second.denominator}`

    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={compareChallenges} state={state}>
            {strategy === 'common' && (
                <div className="fraction-v2-bar-stack">
                    <div className="fraction-v2-bar-row">
                        <span className="fraction-v2-bar-label"><MathText text={`$${latex(first)}=\\frac{${firstScaled}}{${common}}$`} /></span>
                        <PartitionBar parts={first.denominator} filled={first.numerator} ghostPerPart={drawSplit ? common / first.denominator : 1} label={firstLabel} />
                    </div>
                    <div className="fraction-v2-bar-row">
                        <span className="fraction-v2-bar-label"><MathText text={`$${latex(second)}=\\frac{${secondScaled}}{${common}}$`} /></span>
                        <PartitionBar parts={second.denominator} filled={second.numerator} ghostPerPart={drawSplit ? common / second.denominator : 1} tone="second" label={secondLabel} />
                    </div>
                    <p className="fraction-v2-insight">
                        {l({
                            eu: `Biak ${common}renetan: ${firstScaled} eta ${secondScaled} zati. Alderatu zenbakitzaileak.`,
                            es: `Las dos en ${common} partes: ${firstScaled} y ${secondScaled} trozos. Compara los numeradores.`,
                            ar: `كلاهما بـ ${common} أجزاء: ${firstScaled} و${secondScaled} قطعة. قارن البسطين.`
                        })}
                    </p>
                </div>
            )}

            {strategy === 'line' && (
                <div className="fraction-v2-cmp-line" role="img" aria-label={`${firstLabel}; ${secondLabel}`}>
                    <span className="fraction-v2-cmp-axis" />
                    <span className="fraction-v2-cmp-end start" data-label="0" />
                    <span className="fraction-v2-cmp-end half" />
                    <span className="fraction-v2-cmp-end finish" data-label="1" />
                    <span className="fraction-v2-cmp-point first" style={{ left: `${(first.numerator / first.denominator) * 100}%` }}>
                        <MathText text={`$${latex(first)}$`} />
                    </span>
                    <span className="fraction-v2-cmp-point second" style={{ left: `${(second.numerator / second.denominator) * 100}%` }}>
                        <MathText text={`$${latex(second)}$`} />
                    </span>
                </div>
            )}

            {strategy === 'cross' && (
                <div className="fraction-v2-cmp-cross">
                    <MathText text={`$${latex(first)}\\;\\;?\\;\\;${latex(second)}$`} />
                    <div className="fraction-v2-cmp-products">
                        <span className="first"><MathText text={`$${first.numerator}\\cdot${second.denominator}=${crossFirst}$`} /></span>
                        <strong>{guess === null ? '?' : crossFirst === crossSecond ? '=' : crossFirst < crossSecond ? '<' : '>'}</strong>
                        <span className="second"><MathText text={`$${second.numerator}\\cdot${first.denominator}=${crossSecond}$`} /></span>
                    </div>
                    <p className="fraction-v2-insight">{l({
                        eu: 'Biderkatu zenbakitzaile bakoitza beste zatikiaren izendatzailearekin: emaitzen ordena bera da zatikien ordena.',
                        es: 'Multiplica cada numerador por el denominador de la otra fracción: los productos quedan en el mismo orden que las fracciones.',
                        ar: 'اضرب كل بسط في مقام الكسر الآخر: يأتي الناتجان بترتيب الكسرين نفسه.'
                    })}</p>
                </div>
            )}
        </ToolFrame>
    )
}
