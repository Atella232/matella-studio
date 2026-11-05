import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { binomial, xMinus } from './coefficient.ts'

/* ==========================================================================
   Zenbaki errealak (Batxilergoa 1 · Zientziak) memory: a neighbourhood
   and its interval, a logarithm and its value, and a binomial coefficient
   and its value. Every card has exactly one partner, and the text stays
   short enough for a card.
   ========================================================================== */

export const BACH_REALS_MEMORY_PAIRS = 6

export const bachRealsMemoryLevels = ['neighbourhoods', 'logarithms', 'binomials'] as const

interface Pair {
    question: string
    answer: string
    /** The shared answer, to tell pairs apart */
    key: string
}

function neighbourhoodPair(random: Random): Pair {
    const a = randomInt(random, -4, 5)
    const r = randomInt(random, 1, 4)
    return { question: `|${xMinus(a)}|<${r}`, answer: `(${a - r},${a + r})`, key: `${a}:${r}` }
}

function logPair(random: Random): Pair | null {
    const base = pick(random, [2, 3, 5, 10])
    const x = randomInt(random, -2, base === 2 ? 5 : 3)
    if (x === 0) return null
    const value = x > 0 ? String(base ** x) : `\\frac{1}{${base ** -x}}`
    return { question: `\\log_{${base}} ${value}`, answer: String(x), key: String(x) }
}

function binomialPair(random: Random): Pair | null {
    const n = randomInt(random, 4, 8)
    const k = randomInt(random, 1, n - 1)
    const value = binomial(n, k)
    if (value > 99) return null
    return { question: `\\binom{${n}}{${k}}`, answer: String(value), key: String(value) }
}

/** Six pairs with different answers, so every card has exactly one partner */
export function createBachRealsMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = bachRealsMemoryLevels[levelIndex] ?? 'neighbourhoods'
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < BACH_REALS_MEMORY_PAIRS && attempt < 2000; attempt += 1) {
        const pair = level === 'neighbourhoods' ? neighbourhoodPair(random) : level === 'logarithms' ? logPair(random) : binomialPair(random)
        if (!pair || pairs.some((other) => other.key === pair.key || other.question === pair.question || other.answer === pair.answer)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` }
    ]))
}
