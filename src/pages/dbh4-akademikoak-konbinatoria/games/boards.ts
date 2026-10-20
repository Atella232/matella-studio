import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { big, factorial } from './race.ts'

/* ==========================================================================
   Konbinatoriaren memoria (4. DBH akademikoak): a factorial or a quotient
   of factorials and its value, V and VR and their values, and a
   combinatorial number and its value. Cards carry formulas only, so they
   read the same in every language. Every card has exactly one partner,
   and the text stays short enough for a phone card.
   ========================================================================== */

export const COMBINATORICS_AK_MEMORY_PAIRS = 6

export const combinatoricsAkMemoryLevels = ['factorials', 'variations', 'combinations'] as const

interface Pair2 {
    question: string
    answer: string
    value: number
}

function factorialPair(random: Random): Pair2 {
    if (random() < 0.5) {
        const n = randomInt(random, 3, 7)
        return { question: `${n}!`, answer: big(factorial(n)), value: factorial(n) }
    }
    const b = randomInt(random, 2, 8)
    const a = b + pick(random, [1, 2])
    const value = factorial(a) / factorial(b)
    return { question: `\\frac{${a}!}{${b}!}`, answer: big(value), value }
}

function variationPair(random: Random): Pair2 {
    if (random() < 0.5) {
        const n = randomInt(random, 2, 5)
        const k = randomInt(random, 2, 4)
        return { question: `\\text{VR}_{${n},${k}}`, answer: big(n ** k), value: n ** k }
    }
    const n = randomInt(random, 4, 9)
    const k = randomInt(random, 2, 3)
    const value = factorial(n) / factorial(n - k)
    return { question: `\\text{V}_{${n},${k}}`, answer: big(value), value }
}

function combinationPair(random: Random): Pair2 {
    const n = randomInt(random, 4, 10)
    const k = randomInt(random, 1, n - 1)
    const value = factorial(n) / (factorial(k) * factorial(n - k))
    return { question: `\\binom{${n}}{${k}}`, answer: big(value), value }
}

/** Six pairs with different questions and answers, so every card has exactly one partner */
export function createCombinatoricsAkMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = combinatoricsAkMemoryLevels[levelIndex] ?? 'factorials'
    const pairs: Pair2[] = []
    for (let attempt = 0; pairs.length < COMBINATORICS_AK_MEMORY_PAIRS && attempt < 3000; attempt += 1) {
        const pair = level === 'factorials' ? factorialPair(random) : level === 'variations' ? variationPair(random) : combinationPair(random)
        if (pairs.some((other) => other.question === pair.question || other.answer === pair.answer)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}=${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}=${pair.answer}` }
    ]))
}
