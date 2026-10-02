import { add, divide, fraction, multiply, toExactDecimal, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   Zenbaki hamartarrak (1. DBH) memory: a decimal and its decimal fraction,
   a fraction and its decimal (exact or periodic), and an operation and its
   result. Every card has exactly one partner.
   ========================================================================== */

export const DECIMALS_MEMORY_PAIRS = 6

export const decimalsMemoryLevels = ['decimal-fraction', 'fraction-decimal', 'operations'] as const

const dec = (units: number, places: number) => fraction(units, 10 ** places)
const written = (value: FractionValue) => toExactDecimal(value, ',')!.replace(',', '{,}')

interface Pair {
    question: string
    answer: string
    /** The shared value, to tell pairs apart */
    key: string
}

function decimalFractionPair(random: Random): Pair {
    const places = randomInt(random, 1, 3)
    const units = randomInt(random, 1, places === 1 ? 99 : 999)
    const value = dec(units, places)
    return { question: written(value), answer: `\\frac{${units}}{${10 ** places}}`, key: `${value.numerator}/${value.denominator}` }
}

const fractions: Array<[number, number, string]> = [
    [1, 2, '0{,}5'], [1, 4, '0{,}25'], [3, 4, '0{,}75'], [1, 5, '0{,}2'], [2, 5, '0{,}4'], [3, 5, '0{,}6'], [4, 5, '0{,}8'],
    [1, 8, '0{,}125'], [3, 8, '0{,}375'], [3, 2, '1{,}5'], [5, 4, '1{,}25'], [7, 4, '1{,}75'], [1, 20, '0{,}05'], [7, 20, '0{,}35'],
    [1, 3, '0{,}333\\ldots'], [2, 3, '0{,}666\\ldots'], [7, 3, '2{,}333\\ldots'], [1, 9, '0{,}111\\ldots'], [5, 6, '0{,}833\\ldots']
]

function fractionDecimalPair(random: Random): Pair {
    const [numerator, denominator, decimal] = pick(random, fractions)
    return { question: `\\frac{${numerator}}{${denominator}}`, answer: decimal, key: `${numerator}/${denominator}` }
}

function operationPair(random: Random): Pair {
    const kind = randomInt(random, 0, 3)
    let latex: string
    let value: FractionValue
    if (kind === 0) {
        const a = dec(randomInt(random, 11, 99), 1)
        const b = dec(randomInt(random, 11, 99), 2)
        latex = `${written(a)}+${written(b)}`
        value = add(a, b)
    } else if (kind === 1) {
        const a = dec(randomInt(random, 2, 9), 1)
        const b = dec(randomInt(random, 2, 9), randomInt(random, 0, 1))
        latex = `${written(a)}\\cdot ${written(b)}`
        value = multiply(a, b)
    } else if (kind === 2) {
        const a = dec(randomInt(random, 11, 999), 2)
        const power = pick(random, [10, 100, 1000])
        const times = random() < 0.5
        latex = `${written(a)}${times ? '\\cdot ' : '\\mathbin{:}'}${power}`
        value = times ? multiply(a, fraction(power)) : divide(a, fraction(power))
    } else {
        const divisor = pick(random, [dec(2, 1), dec(5, 1), dec(25, 2)])
        const quotient = fraction(randomInt(random, 2, 20))
        latex = `${written(multiply(quotient, divisor))}\\mathbin{:}${written(divisor)}`
        value = quotient
    }
    return { question: latex, answer: written(value), key: `${value.numerator}/${value.denominator}` }
}

const makers = { 'decimal-fraction': decimalFractionPair, 'fraction-decimal': fractionDecimalPair, operations: operationPair }

/** Six pairs with different values, so every card has exactly one partner */
export function createDecimalsMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const make = makers[decimalsMemoryLevels[levelIndex]]
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < DECIMALS_MEMORY_PAIRS && attempt < 500; attempt += 1) {
        const pair = make(random)
        if (pairs.some((other) => other.key === pair.key || other.question === pair.question || other.answer === pair.answer)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}=${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}=${pair.answer}` }
    ]))
}
