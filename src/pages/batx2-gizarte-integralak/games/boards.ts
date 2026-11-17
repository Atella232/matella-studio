import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   Integralen memoria (Batxilergoa 2 · Gizarte Zientziak): a function and
   one antiderivative of it. Level 1, powers; level 2, e^{kx} and k/x;
   level 3, the chain f′·fⁿ and f′/f.
   ========================================================================== */

export const BACH2G_INTEGRALS_MEMORY_PAIRS = 6

export const bach2gIntegralsMemoryLevels = ['powers', 'exp-log', 'chain'] as const

interface Pair {
    question: string
    answer: string
}

const coefficient = (value: number) => (value === 1 ? '' : String(value))

function powersPair(random: Random): Pair | null {
    const n = randomInt(random, 1, 5)
    const k = randomInt(random, 1, 4)
    const a = k * (n + 1)
    return { question: n === 1 ? `${a}x` : `${a}x^{${n}}`, answer: `${coefficient(k)}x^{${n + 1}}` }
}

function expLogPair(random: Random): Pair | null {
    if (randomInt(random, 0, 1) === 0) {
        const m = randomInt(random, 2, 7)
        return { question: `${m}e^{${m}x}`, answer: `e^{${m}x}` }
    }
    const c = randomInt(random, 2, 9)
    return { question: `\\frac{${c}}{x}`, answer: `${c}\\ln|x|` }
}

function chainPair(random: Random): Pair | null {
    const c = randomInt(random, 1, 9)
    if (randomInt(random, 0, 1) === 0) {
        const n = pick(random, [2, 3, 4])
        return { question: `2x(x^2+${c})^{${n}}`, answer: `\\frac{(x^2+${c})^{${n + 1}}}{${n + 1}}` }
    }
    return { question: `\\frac{2x}{x^2+${c}}`, answer: `\\ln(x^2+${c})` }
}

/** Six pairs of one level, every question and every answer different */
export function createBach2gIntegralsMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = bach2gIntegralsMemoryLevels[levelIndex] ?? 'powers'
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < BACH2G_INTEGRALS_MEMORY_PAIRS && attempt < 4000; attempt += 1) {
        const pair = level === 'powers' ? powersPair(random) : level === 'exp-log' ? expLogPair(random) : chainPair(random)
        if (!pair || pairs.some((other) => other.question === pair.question || other.answer === pair.answer)) continue
        pairs.push(pair)
    }
    const explain = (pair: Pair) => `\\int ${pair.question}\\,dx=${pair.answer}+C`
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: explain(pair) },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: explain(pair) }
    ]))
}
