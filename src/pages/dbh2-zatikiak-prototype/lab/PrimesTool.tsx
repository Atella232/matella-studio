import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { NumberField } from '../../../features/unit-v2/lab/NumberField'
import { createRandom, randomSeed } from '../../../features/unit-v2/games/random'
import type { ToolProps } from './labTools'
import { ToolFrame } from './LabKit'
import {
    clearPrimes,
    initialPrimesState,
    pairAll,
    PRIMES_LIMITS,
    primesChallenges,
    primesExtra,
    primesSummary,
    randomPrimesFraction,
    setPrimesNumbers,
    tapFactor,
    type FactorRow,
    type PrimesState
} from './primes'
import { useLabText } from './useLabText'
import './Primes.css'

const product = (values: number[]) => values.reduce((total, value) => total * value, 1)

/** The factors of a term as LaTeX, the crossed-out ones struck through */
const factorsLatex = (factors: number[], crossed: boolean[]) =>
    factors.length === 0 ? '1' : factors.map((factor, index) => (crossed[index] ? `\\cancel{${factor}}` : String(factor))).join('\\cdot ')

const termLatex = (numerator: number, denominator: number) => denominator === 1 ? String(numerator) : `\\frac{${numerator}}{${denominator}}`

const primeClass = (prime: number) => (prime <= 7 ? `p${prime}` : 'pbig')

export function PrimesTool(props: ToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<PrimesState>(initialPrimesState)
    const summary = primesSummary(state)
    const { numerator, denominator } = state
    const tap = (row: FactorRow, index: number) => setState((current) => tapFactor(current, row, index))

    const controls = (
        <>
            <NumberField label={l({ eu: 'Zenbakitzailea (goian)', es: 'Numerador (arriba)', ar: 'البسط (في الأعلى)' })} value={numerator} min={PRIMES_LIMITS.minNumerator} max={PRIMES_LIMITS.max} onChange={(next) => setState((current) => setPrimesNumbers(current, { numerator: next }))} language={props.language} />
            <NumberField label={l({ eu: 'Izendatzailea (behean)', es: 'Denominador (abajo)', ar: 'المقام (في الأسفل)' })} value={denominator} min={PRIMES_LIMITS.minDenominator} max={PRIMES_LIMITS.max} onChange={(next) => setState((current) => setPrimesNumbers(current, { denominator: next }))} language={props.language} />
            <div className="fraction-v2-lab-quick-actions">
                <button type="button" onClick={() => setState((current) => setPrimesNumbers(current, randomPrimesFraction(createRandom(randomSeed()))))}>{l({ eu: 'Beste zatiki bat', es: 'Otra fracción', ar: 'كسر آخر' })}</button>
            </div>
            <div className="fraction-v2-lab-quick-actions">
                <button type="button" onClick={() => setState(clearPrimes)}>{l({ eu: 'Hasi berriro', es: 'Empezar de nuevo', ar: 'ابدأ من جديد' })}</button>
                <button type="button" onClick={() => setState(pairAll)}>{l({ eu: 'Ikusi ebazpena', es: 'Ver la solución', ar: 'اعرض الحل' })}</button>
            </div>
        </>
    )

    const row = (term: FactorRow, value: number, factors: number[], crossed: boolean[]) => (
        <div className={`primes-term ${term}`}>
            <span className="primes-number">{value} =</span>
            <div className="primes-row" role="group" aria-label={l(term === 'top' ? { eu: 'Zenbakitzailearen faktoreak', es: 'Factores del numerador', ar: 'عوامل البسط' } : { eu: 'Izendatzailearen faktoreak', es: 'Factores del denominador', ar: 'عوامل المقام' })}>
                {factors.length === 0 && <span className="primes-none">1</span>}
                {factors.map((prime, index) => {
                    const selected = state.selected?.row === term && state.selected.index === index
                    return (
                        <button
                            type="button"
                            key={index}
                            className={`primes-tile ${primeClass(prime)} ${crossed[index] ? 'crossed' : ''} ${selected ? 'selected' : ''}`}
                            aria-pressed={selected}
                            aria-label={crossed[index]
                                ? l({ eu: `${prime}, marratuta: sakatu berreskuratzeko`, es: `${prime}, tachado: toca para recuperarlo`, ar: `${prime} مشطوب: اضغط لاستعادته` })
                                : String(prime)}
                            onClick={() => tap(term, index)}
                        >
                            {prime}
                        </button>
                    )
                })}
            </div>
        </div>
    )

    const leftTop = product(summary.leftTop)
    const leftBottom = product(summary.leftBottom)
    const crossedLatex = summary.crossed.length ? `${summary.crossed.join('\\cdot ')}=${summary.divisor}` : '1'
    const multipleParts = [summary.divisor > 1 ? String(summary.divisor) : '', ...summary.leftTop, ...summary.leftBottom].filter((part) => part !== '')
    const formula = `${termLatex(numerator, denominator)}=\\frac{${factorsLatex(summary.top, summary.crossedTop)}}{${factorsLatex(summary.bottom, summary.crossedBottom)}}${state.pairs.length > 0 ? `=${termLatex(leftTop, leftBottom)}` : ''}`

    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$${formula}$`} /></span>
            <ul className="primes-notes">
                {summary.complete && state.pairs.length === 0 && (
                    <li>{l({ eu: 'Ez dago faktore komunik: zatikia laburtezina da jada.', es: 'No hay factores comunes: la fracción ya es irreducible.', ar: 'لا توجد عوامل مشتركة: الكسر في أبسط صورة أصلًا.' })}</li>
                )}
                {!summary.complete && state.pairs.length > 0 && (
                    <li>
                        {l({ eu: 'Orain arte marratuta:', es: 'Tachado hasta ahora:', ar: 'المشطوب حتى الآن:' })}{' '}
                        <bdi dir="ltr"><MathText inline text={`$${crossedLatex}$`} /></bdi>{' '}
                        {l({ eu: 'Faktore komunak geratzen dira oraindik.', es: 'Aún quedan factores comunes.', ar: 'ما زالت هناك عوامل مشتركة.' })}
                    </li>
                )}
                {summary.complete && (
                    <>
                        <li>
                            <strong>{l({ eu: 'ZKH', es: 'm.c.d.', ar: 'ق.م.أ' })}</strong>{' '}
                            <bdi dir="ltr"><MathText inline text={`$${crossedLatex}$`} /></bdi>
                        </li>
                        <li>
                            <strong>{l({ eu: 'MKT', es: 'm.c.m.', ar: 'م.م.أ' })}</strong>{' '}
                            <bdi dir="ltr"><MathText inline text={`$${multipleParts.length > 1 ? `${multipleParts.join('\\cdot ')}=` : ''}${summary.multiple}$`} /></bdi>
                        </li>
                    </>
                )}
            </ul>
        </>
    )

    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={primesChallenges} extraChallenges={primesExtra} state={state}>
            <div className="primes">
                {row('top', numerator, summary.top, summary.crossedTop)}
                <span className="primes-bar" aria-hidden="true" />
                {row('bottom', denominator, summary.bottom, summary.crossedBottom)}
                {state.mismatch && (
                    <p className="primes-warning" role="alert">{l({ eu: 'Faktore berdinak bakarrik marra daitezke: bat goian eta bera behean.', es: 'Solo se tachan factores iguales: uno de arriba con el mismo de abajo.', ar: 'لا تُشطب إلا العوامل المتساوية: واحد في الأعلى ومثله في الأسفل.' })}</p>
                )}
                <p className="fraction-v2-insight">
                    {summary.complete
                        ? l({ eu: 'Ez dago marratzeko ezer: zatikia laburtezina da.', es: 'No queda nada que tachar: la fracción es irreducible.', ar: 'لم يبقَ ما يُشطب: الكسر في أبسط صورة.' })
                        : l({ eu: 'Sakatu faktore bat goian eta bera behean, biak marratzeko.', es: 'Toca un factor de arriba y el mismo de abajo para tacharlos.', ar: 'اضغط عاملًا في الأعلى ومثله في الأسفل لشطبهما.' })}
                </p>
            </div>
        </ToolFrame>
    )
}
