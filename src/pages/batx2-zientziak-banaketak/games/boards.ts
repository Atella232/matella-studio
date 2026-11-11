import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { above, tableLatex, zLatex } from '../normal.ts'

/* ==========================================================================
   Banaketak (Batxilergoa 2 · Zientziak) memory: a binomial and its mean
   μ = np; a probability above a value and its number from the table,
   1 − P(Z ≤ k); and a normal with a value x, stacked, and its standard
   score z. Every card has exactly one partner, and each one stays short
   enough for a phone card.
   ========================================================================== */

export const DISTRIBUTIONS_BATX2_MEMORY_PAIRS = 6

export const distributionsBatx2MemoryLevels = ['mean', 'table', 'score'] as const

interface Pair {
    question: string
    answer: string
}

const tenths = (value: number) => String(value / 10).replace('.', '{,}')
/** Two rows stacked, with no brace, so the card is narrow enough */
const stacked = (top: string, bottom: string) => `\\begin{array}{c}${top}\\\\ ${bottom}\\end{array}`

/** B(n; p) and μ = np */
function meanPair(random: Random): Pair {
    const n = 10 * randomInt(random, 1, 10)
    const p = randomInt(random, 1, 9)
    return { question: `B(${n};\\,${tenths(p)})`, answer: `\\mu=${String((n * p) / 10).replace('.', '{,}')}` }
}

/** P(Z > k) and its value, 1 − P(Z ≤ k) */
function tablePair(random: Random): Pair {
    const k = randomInt(random, 2, 25) / 10
    return { question: `P(Z>${zLatex(k)})`, answer: tableLatex(above(k)) }
}

/** N(μ; σ) with a value x, and its z */
function scorePair(random: Random): Pair {
    const sd = pick(random, [2, 4, 5, 10])
    const mean = 10 * randomInt(random, 2, 9)
    const steps = randomInt(random, -8, 8)
    const x = mean + steps
    return { question: stacked(`N(${mean};\\,${sd})`, `x=${x}`), answer: `{z}=${zLatex(steps / sd)}` }
}

/** Six pairs with different answers, so every card has exactly one partner */
export function createDistributionsBatx2MemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = distributionsBatx2MemoryLevels[levelIndex] ?? 'mean'
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < DISTRIBUTIONS_BATX2_MEMORY_PAIRS && attempt < 3000; attempt += 1) {
        const pair = level === 'mean' ? meanPair(random) : level === 'table' ? tablePair(random) : scorePair(random)
        if (pairs.some((other) => other.question === pair.question || other.answer === pair.answer)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` }
    ]))
}
