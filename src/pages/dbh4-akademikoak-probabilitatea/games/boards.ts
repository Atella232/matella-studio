import { fraction, multiply, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { written } from './race.ts'

/* ==========================================================================
   Probabilitatearen memoria (4. DBH akademikoak): the sum of two dice and
   its probability, a product of two probabilities and its value, and a
   conditional probability as a quotient and its decimal. Cards carry
   formulas only, so they read the same in every language (the game shows
   the decimal point in Arabic). Every card has exactly one partner, and
   the text stays short enough for a phone card.
   ========================================================================== */

export const PROBABILITY_AK_MEMORY_PAIRS = 6

export const probabilityAkMemoryLevels = ['dice', 'products', 'conditional'] as const

interface Pair2 {
    question: string
    answer: string
}

const asFraction = (value: FractionValue) => written(value, 'fraction')!
const asDecimal = (value: FractionValue) => written(value, 'decimal')!

/** The six different probabilities of the sum of two dice, each from one of its two sums */
function dicePairs(random: Random): Pair2[] {
    return [[2, 12], [3, 11], [4, 10], [5, 9], [6, 8], [7, 7]].map((sums) => {
        const sum = pick(random, sums)
        return { question: `P(S=${sum})`, answer: asFraction(fraction(6 - Math.abs(sum - 7), 36)) }
    })
}

const factors = [fraction(1, 2), fraction(1, 3), fraction(1, 4), fraction(1, 6), fraction(2, 3), fraction(3, 4), fraction(5, 6), fraction(2, 5), fraction(3, 5)]

function productPair(random: Random): Pair2 {
    const a = pick(random, factors)
    const b = pick(random, factors)
    return { question: `${asFraction(a)}\\cdot${asFraction(b)}`, answer: asFraction(multiply(a, b)) }
}

function conditionalPair(random: Random): Pair2 | null {
    const given = pick(random, [20, 25, 40, 50, 80])
    const ratio = fraction(pick(random, [1, 2, 3, 4, 5, 6, 7, 8, 9]), 10)
    const both = (given * ratio.numerator) / ratio.denominator
    if (!Number.isInteger(both)) return null
    return { question: `\\frac{${asDecimal(fraction(both, 100))}}{${asDecimal(fraction(given, 100))}}`, answer: asDecimal(ratio) }
}

/** Six pairs with different questions and answers, so every card has exactly one partner */
export function createProbabilityAkMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = probabilityAkMemoryLevels[levelIndex] ?? 'dice'
    const pairs: Pair2[] = level === 'dice' ? dicePairs(random) : []
    for (let attempt = 0; pairs.length < PROBABILITY_AK_MEMORY_PAIRS && attempt < 3000; attempt += 1) {
        const pair = level === 'products' ? productPair(random) : conditionalPair(random)
        if (!pair || pairs.some((other) => other.question === pair.question || other.answer === pair.answer)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}=${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}=${pair.answer}` }
    ]))
}
