import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   Estatistika unidimentsionala (Batxilergoa 1 · Zientziak) memory: three
   data and their mean, (x − x̄) / σ with its numbers and the score z, and
   a mean and σ with their coefficient of variation. Every card has
   exactly one partner, and each one stays short enough for a phone card.
   ========================================================================== */

export const BACH_STATS_MEMORY_PAIRS = 6

export const bachStatsMemoryLevels = ['mean', 'score', 'cv'] as const

interface Pair {
    question: string
    answer: string
}

const tex = (value: number) => String(Math.round(value * 1000) / 1000).replace('.', '{,}')
/** Two rows stacked, with no brace, so the card is narrow enough */
const stacked = (top: string, bottom: string) => `\\begin{array}{c}${top}\\\\ ${bottom}\\end{array}`

/** Three data and their mean */
function meanPair(random: Random): Pair | null {
    const data = [randomInt(random, 1, 9), randomInt(random, 1, 9), randomInt(random, 2, 14)]
    const sum = data[0] + data[1] + data[2]
    if (sum % 3 !== 0 || new Set(data).size < 3) return null
    return { question: data.join(',\\ '), answer: `\\bar{x}=${sum / 3}` }
}

/** A datum, its mean and σ, and its standard score */
function scorePair(random: Random): Pair | null {
    const mean = randomInt(random, 4, 9)
    const sigma = pick(random, [1, 2, 0.5])
    const z = pick(random, [-2, -1, 1, 2, 3, 0.5, 1.5])
    const datum = mean + z * sigma
    if (datum < 0 || datum > 10) return null
    // (x − x̄) / σ with its numbers: narrow enough for a phone card
    return { question: `\\frac{${tex(datum)}-${mean}}{${tex(sigma)}}`, answer: `z=${tex(z)}` }
}

/** A mean and σ, and their coefficient of variation */
function cvPair(random: Random): Pair | null {
    const mean = pick(random, [10, 20, 25, 40, 50])
    const sigma = randomInt(random, 1, 10)
    const cv = sigma / mean
    if (Math.round(cv * 100) !== cv * 100 || cv >= 1) return null
    return { question: stacked(`\\bar{x}=${mean}`, `\\sigma=${sigma}`), answer: `CV=${tex(cv)}` }
}

/** Six pairs with different answers, so every card has exactly one partner */
export function createBachStatsMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = bachStatsMemoryLevels[levelIndex] ?? 'mean'
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < BACH_STATS_MEMORY_PAIRS && attempt < 3000; attempt += 1) {
        const pair = level === 'mean' ? meanPair(random) : level === 'score' ? scorePair(random) : cvPair(random)
        if (!pair || pairs.some((other) => other.question === pair.question || other.answer === pair.answer)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` }
    ]))
}
