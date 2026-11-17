import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   Estatistika unidimentsionala (Batxilergoa 1 · Gizarte Zientziak) memory:
   a frequency and a width with the height f / a of the bar, an
   interpolation with its numbers and its percentile, and two groups with
   their joint mean. Every card has exactly one partner, and each one stays
   short enough for a phone card.
   ========================================================================== */

export const SOCIAL_STATS_MEMORY_PAIRS = 6

export const socialStatsMemoryLevels = ['height', 'percentile', 'groups'] as const

interface Pair {
    question: string
    answer: string
}

const tex = (value: number) => String(Math.round(value * 1000) / 1000).replace('.', '{,}')
const short = (value: number) => Math.abs(Math.round(value * 10) - value * 10) < 1e-9
/** Two rows stacked, with no brace, so the card is narrow enough */
const stacked = (top: string, bottom: string) => `\\begin{array}{c}${top}\\\\ ${bottom}\\end{array}`

/** A frequency and a width, and the height of the bar */
function heightPair(random: Random): Pair | null {
    const width = pick(random, [2, 4, 5, 10, 20])
    const count = randomInt(random, 4, 80)
    const height = count / width
    if (!short(height)) return null
    return { question: stacked(`f=${count}`, `a=${width}`), answer: `${tex(height)}` }
}

/** An interpolation with its numbers, and the percentile it gives */
function percentilePair(random: Random): Pair | null {
    const from = pick(random, [10, 20, 30, 40])
    const before = pick(random, [10, 20, 30, 40])
    const share = pick(random, [20, 40, 50])
    const k = before + pick(random, [5, 10, 15, 20])
    if (k >= before + share) return null
    const value = from + ((k - before) / share) * 10
    if (!short(value)) return null
    return { question: `${from}+\\frac{${k - before}}{${share}}\\cdot 10`, answer: `${tex(value)}` }
}

/** Two groups and their joint mean */
function groupsPair(random: Random): Pair | null {
    const a = pick(random, [10, 20, 30])
    const b = pick(random, [10, 20, 30])
    const meanA = randomInt(random, 2, 9)
    const meanB = randomInt(random, 2, 9)
    const mean = (a * meanA + b * meanB) / (a + b)
    if (meanA === meanB || !short(mean)) return null
    return { question: stacked(`${a}\\cdot ${meanA}`, `${b}\\cdot ${meanB}`), answer: `\\bar{x}=${tex(mean)}` }
}

/** Six pairs with different answers, so every card has exactly one partner */
export function createSocialStatsMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = socialStatsMemoryLevels[levelIndex] ?? 'height'
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < SOCIAL_STATS_MEMORY_PAIRS && attempt < 3000; attempt += 1) {
        const pair = level === 'height' ? heightPair(random) : level === 'percentile' ? percentilePair(random) : groupsPair(random)
        if (!pair || pairs.some((other) => other.question === pair.question || other.answer === pair.answer)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` }
    ]))
}
