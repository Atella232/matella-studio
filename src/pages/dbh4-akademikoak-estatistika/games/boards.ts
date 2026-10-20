import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   Estatistikaren memoria (4. DBH akademikoak): the share of a stratum
   n · Nᵢ / N and its number of students, three data and their mean, and
   σ with x̄ and the coefficient of variation. Cards carry formulas only,
   so they read the same in every language (the decimal comma becomes a
   point in Arabic). Every card has exactly one partner, and the text
   stays short enough for a phone card.
   ========================================================================== */

export const STATISTICS_AK_MEMORY_PAIRS = 6

export const statisticsAkMemoryLevels = ['shares', 'means', 'variation'] as const

interface Pair2 {
    question: string
    answer: string
}

function sharePair(random: Random): Pair2 {
    const step = pick(random, [5, 10, 20])
    const sample = pick(random, [20, 30, 40, 50, 60])
    const share = randomInt(random, 2, sample - 2)
    return { question: `${sample}\\cdot\\frac{${step * share}}{${step * sample}}`, answer: String(share) }
}

function meanPair(random: Random): Pair2 | null {
    const mean = randomInt(random, 3, 12)
    const a = randomInt(random, 1, 15)
    const b = randomInt(random, 1, 15)
    const c = 3 * mean - a - b
    if (c < 0 || c > 20 || a === b) return null
    const data = [a, b, c].sort((x, y) => x - y)
    return { question: `\\begin{gathered}\\bar{x}\\\\ ${data.join(',\\,')}\\end{gathered}`, answer: String(mean) }
}

function variationPair(random: Random): Pair2 | null {
    const mean = pick(random, [4, 5, 8, 10, 20, 25, 40, 50])
    const sigma = randomInt(random, 1, Math.min(10, mean))
    const hundredths = (100 * sigma) / mean
    if (!Number.isInteger(hundredths)) return null
    const answer = hundredths === 100 ? '1' : `0{,}${String(hundredths).padStart(2, '0').replace(/0$/, '')}`
    return { question: `\\begin{gathered}\\sigma=${sigma}\\\\ \\bar{x}=${mean}\\end{gathered}`, answer }
}

/** Six pairs with different questions and answers, so every card has exactly one partner */
export function createStatisticsAkMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = statisticsAkMemoryLevels[levelIndex] ?? 'shares'
    const pairs: Pair2[] = []
    for (let attempt = 0; pairs.length < STATISTICS_AK_MEMORY_PAIRS && attempt < 3000; attempt += 1) {
        const pair = level === 'shares' ? sharePair(random) : level === 'means' ? meanPair(random) : variationPair(random)
        if (!pair || pairs.some((other) => other.question === pair.question || other.answer === pair.answer)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` }
    ]))
}
