import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   Integral mugatua (Batxilergoa 2 · Zientziak) memory. Level 1, a definite
   integral and its value; level 2, an integral function and its
   derivative (the fundamental theorem, with x, 2x or x² as the top
   limit); level 3, a volume of revolution (and the area under |x|) and its
   value. Every card has exactly one partner and stays narrow enough for a
   card at 375 px (85 px: no formula wider than ∫₀¹ x² dx, and no sin or
   tan, which each language writes in its own way). Each pair keeps what it computes, for the tests.
   ========================================================================== */

export const BACH2_DEFINITE_MEMORY_PAIRS = 6

export const bach2DefiniteMemoryLevels = ['values', 'derivatives', 'volumes'] as const

/** A pair whose question is a number: factor · ∫ₐᵇ fn = value */
export interface ValuePair {
    kind: 'value'
    question: string
    answer: string
    fn: (x: number) => number
    a: number
    b: number
    factor: number
    value: number
}

/** A pair whose question is F(x) = ∫ from low to high of fn, and whose answer is F′ */
export interface DerivativePair {
    kind: 'derivative'
    question: string
    answer: string
    fn: (t: number) => number
    low: (x: number) => number
    high: (x: number) => number
    derivative: (x: number) => number
}

export type MemoryPair = ValuePair | DerivativePair

const value = (question: string, answer: string, fn: (x: number) => number, a: number, b: number, result: number, factor = 1): ValuePair => ({ kind: 'value', question, answer, fn, a, b, factor, value: result })
const derived = (question: string, answer: string, fn: (t: number) => number, low: (x: number) => number, high: (x: number) => number, derivative: (x: number) => number): DerivativePair => ({ kind: 'derivative', question, answer, fn, low, high, derivative })

export const VALUE_PAIRS: MemoryPair[] = [
    value('\\int_0^1 x\\,dx', '\\frac{1}{2}', (x) => x, 0, 1, 1 / 2),
    value('\\int_0^1 x^2\\,dx', '\\frac{1}{3}', (x) => x * x, 0, 1, 1 / 3),
    value('\\int_0^2 x\\,dx', '2', (x) => x, 0, 2, 2),
    value('\\int_1^2 2x\\,dx', '3', (x) => 2 * x, 1, 2, 3),
    value('\\int_0^2 3x^2\\,dx', '8', (x) => 3 * x * x, 0, 2, 8),
    value('\\int_0^3 x^2\\,dx', '9', (x) => x * x, 0, 3, 9),
    value('\\int_{-1}^{1}x^3\\,dx', '0', (x) => x ** 3, -1, 1, 0),
    value('\\int_1^4\\frac{dx}{\\sqrt{x}}', '2', (x) => 1 / Math.sqrt(x), 1, 4, 2),
    value('\\int_1^2\\frac{dx}{x^2}', '\\frac{1}{2}', (x) => 1 / (x * x), 1, 2, 1 / 2),
    value('\\int_0^1 4x^3\\,dx', '1', (x) => 4 * x ** 3, 0, 1, 1)
]

export const DERIVATIVE_PAIRS: MemoryPair[] = [
    derived('\\int_0^x t^2\\,dt', 'x^2', (t) => t * t, () => 0, (x) => x, (x) => x * x),
    derived('\\int_1^x\\frac{dt}{t}', '\\frac{1}{x}', (t) => 1 / t, () => 1, (x) => x, (x) => 1 / x),
    derived('\\int_0^{x^2}t\\,dt', '2x^3', (t) => t, () => 0, (x) => x * x, (x) => 2 * x ** 3),
    derived('\\int_0^{2x}e^t\\,dt', '2e^{2x}', (t) => Math.exp(t), () => 0, (x) => 2 * x, (x) => 2 * Math.exp(2 * x)),
    derived('\\int_0^{x^2}e^t\\,dt', '2xe^{x^2}', (t) => Math.exp(t), () => 0, (x) => x * x, (x) => 2 * x * Math.exp(x * x)),
    derived('\\int_x^0 t\\,dt', '-x', (t) => t, (x) => x, () => 0, (x) => -x),
    derived('\\int_0^x\\sqrt{t}\\,dt', '\\sqrt{x}', (t) => Math.sqrt(t), () => 0, (x) => x, (x) => Math.sqrt(x)),
    derived('\\int_0^{x^3}t\\,dt', '3x^5', (t) => t, () => 0, (x) => x ** 3, (x) => 3 * x ** 5),
    derived('\\int_1^{2x}\\frac{dt}{t}', '\\frac{1}{x}', (t) => 1 / t, () => 1, (x) => 2 * x, (x) => 1 / x)
]

export const VOLUME_PAIRS: MemoryPair[] = [
    value('\\pi\\int_0^1 x^2\\,dx', '\\frac{\\pi}{3}', (x) => x * x, 0, 1, Math.PI / 3, Math.PI),
    value('\\pi\\int_0^2 x\\,dx', '2\\pi', (x) => x, 0, 2, 2 * Math.PI, Math.PI),
    value('\\pi\\int_0^1 x^4\\,dx', '\\frac{\\pi}{5}', (x) => x ** 4, 0, 1, Math.PI / 5, Math.PI),
    value('\\pi\\int_0^4 x\\,dx', '8\\pi', (x) => x, 0, 4, 8 * Math.PI, Math.PI),
    value('\\pi\\int_0^3 x^2\\,dx', '9\\pi', (x) => x * x, 0, 3, 9 * Math.PI, Math.PI),
    value('\\pi\\int_0^2 x^2\\,dx', '\\frac{8\\pi}{3}', (x) => x * x, 0, 2, (8 * Math.PI) / 3, Math.PI),
    value('\\pi\\int_0^1 x\\,dx', '\\frac{\\pi}{2}', (x) => x, 0, 1, Math.PI / 2, Math.PI),
    value('\\pi\\int_0^3 x\\,dx', '\\frac{9\\pi}{2}', (x) => x, 0, 3, (9 * Math.PI) / 2, Math.PI),
    value('\\int_{-2}^{2}|x|\\,dx', '4', (x) => Math.abs(x), -2, 2, 4)
]

const POOLS: Record<(typeof bach2DefiniteMemoryLevels)[number], MemoryPair[]> = { values: VALUE_PAIRS, derivatives: DERIVATIVE_PAIRS, volumes: VOLUME_PAIRS }

/** How a pair is explained once it is found */
const explain = (item: MemoryPair) => (item.kind === 'value' ? `${item.question}=${item.answer}` : `\\left(${item.question}\\right)'=${item.answer}`)

/** Six pairs of one level, every question and every answer different */
export function createBach2DefiniteMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = bach2DefiniteMemoryLevels[levelIndex] ?? 'values'
    const pool = POOLS[level]
    const pairs: MemoryPair[] = []
    for (let attempt = 0; pairs.length < BACH2_DEFINITE_MEMORY_PAIRS && attempt < 3000; attempt += 1) {
        const next = pick(random, pool)
        // No card may repeat another, not even a question showing what another pair answers
        const cards = pairs.flatMap((other) => [other.question, other.answer])
        if (cards.includes(next.question) || cards.includes(next.answer)) continue
        pairs.push(next)
    }
    return shuffle(random, pairs.flatMap((item, setId) => [
        { id: `${setId}-q`, setId, latex: item.question, shows: item.answer, explain: explain(item) },
        { id: `${setId}-a`, setId, latex: item.answer, shows: item.answer, explain: explain(item) }
    ]))
}
