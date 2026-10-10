import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   Estatistika eta probabilitatea (4. DBH aplikatuak) memory: Q₁ and Q₃
   with the upper limit of the whiskers, a mean and σ with the coefficient
   of variation, and two branches of a tree with their product. Every card
   has exactly one partner, and the text stays short enough for a card.
   ========================================================================== */

export const STATISTICS_MEMORY_PAIRS = 6

export const statisticsMemoryLevels = ['fences', 'variation', 'trees'] as const

interface Pair {
    question: string
    answer: string
    /** The shared answer, to tell pairs apart */
    key: string
}

const decimal = (value: number) => String(Math.round(value * 100) / 100).replace('.', '{,}')
const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
const reduced = (numerator: number, denominator: number) => {
    const d = gcd(numerator, denominator)
    return [numerator / d, denominator / d]
}

function fencePair(random: Random): Pair {
    const q1 = randomInt(random, 2, 20)
    const box = pick(random, [2, 4, 6, 8, 10])
    const q3 = q1 + box
    const limit = q3 + 1.5 * box
    return { question: `\\begin{gathered}Q_1=${q1}\\\\ Q_3=${q3}\\end{gathered}`, answer: decimal(limit), key: String(limit) }
}

function variationPair(random: Random): Pair | null {
    const mean = pick(random, [10, 20, 25, 40, 50, 80, 100])
    const sigma = randomInt(random, 1, 12)
    const cv = (sigma / mean) * 100
    // Exact percentages with one decimal at most
    if (Math.abs(cv * 10 - Math.round(cv * 10)) > 1e-9 || sigma >= mean) return null
    return { question: `\\begin{gathered}\\bar{x}=${mean}\\\\ \\sigma=${sigma}\\end{gathered}`, answer: `${decimal(cv)}\\,\\%`, key: String(cv) }
}

function treePair(random: Random): Pair | null {
    const [a, b] = [randomInt(random, 1, 4), randomInt(random, 2, 6)]
    const [c, d] = [randomInt(random, 1, 4), randomInt(random, 2, 6)]
    // Proper fractions already in lowest terms, as on a tree's branches
    if (a >= b || c >= d || gcd(a, b) > 1 || gcd(c, d) > 1) return null
    const [p, q] = reduced(a * c, b * d)
    return { question: `\\frac{${a}}{${b}}\\cdot\\frac{${c}}{${d}}`, answer: `\\frac{${p}}{${q}}`, key: `${p}/${q}` }
}

/** Six pairs with different answers, so every card has exactly one partner */
export function createStatisticsMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = statisticsMemoryLevels[levelIndex] ?? 'fences'
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < STATISTICS_MEMORY_PAIRS && attempt < 2000; attempt += 1) {
        const pair = level === 'fences' ? fencePair(random) : level === 'variation' ? variationPair(random) : treePair(random)
        if (!pair || pairs.some((other) => other.key === pair.key || other.question === pair.question || other.answer === pair.question)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` }
    ]))
}
