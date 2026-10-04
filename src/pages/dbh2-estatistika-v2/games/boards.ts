import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   Estatistika eta probabilitatea (2. DBH) memory: a percentage and the
   angle of its sector, a mean (or a class mark) and its value, and the
   probability of a contrary event and its simplified fraction. Every card
   has exactly one partner.
   ========================================================================== */

export const STATISTICS_MEMORY_PAIRS = 6

export const statisticsMemoryLevels = ['angles', 'means', 'probability'] as const

interface Pair {
    question: string
    answer: string
    /** The shared value, scaled to a whole number, to tell pairs apart */
    key: number
}

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
/** A decimal for LaTeX with the comma: 12.5 → 12{,}5 */
const decimal = (value: number) => String(value).replace('.', '{,}')
const simplified = (numerator: number, denominator: number) => {
    const divisor = gcd(numerator, denominator)
    return denominator / divisor === 1 ? `${numerator / divisor}` : `\\frac{${numerator / divisor}}{${denominator / divisor}}`
}

const anglePair = (random: Random): Pair | null => {
    const percent = 5 * randomInt(random, 1, 19)
    const angle = (percent * 36) / 10
    return { question: `${percent}\\,\\%`, answer: `${decimal(angle)}^{\\circ}`, key: percent }
}

const meanPair = (random: Random): Pair | null => {
    if (random() < 0.3) {
        const width = pick(random, [10, 20])
        const lower = width * randomInt(random, 1, 9)
        return { question: `[${lower},${lower + width})`, answer: `${lower + width / 2}`, key: 2 * lower + width }
    }
    const size = randomInt(random, 2, 4)
    const data = Array.from({ length: size }, () => randomInt(random, 1, 12))
    const total = data.reduce((sum, value) => sum + value, 0)
    if (total % size !== 0) return null
    return { question: `\\frac{${data.join('+')}}{${size}}`, answer: `${total / size}`, key: (2 * total) / size }
}

const probabilityPair = (random: Random): Pair | null => {
    const denominator = pick(random, [4, 5, 6, 8, 10, 12])
    const numerator = randomInt(random, 1, denominator - 1)
    const rest = denominator - numerator
    const answer = simplified(rest, denominator)
    if (!answer.startsWith('\\frac')) return null
    return { question: `1-\\frac{${numerator}}{${denominator}}`, answer, key: Math.round((rest / denominator) * 120) }
}

const makers = { angles: anglePair, means: meanPair, probability: probabilityPair }

/** Six pairs with different values, so every card has exactly one partner */
export function createStatisticsMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const make = makers[statisticsMemoryLevels[levelIndex]]
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < STATISTICS_MEMORY_PAIRS && attempt < 2000; attempt += 1) {
        const pair = make(random)
        if (!pair || pairs.some((other) => other.key === pair.key || other.question === pair.question || other.answer === pair.answer)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}\\to ${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}\\to ${pair.answer}` }
    ]))
}
