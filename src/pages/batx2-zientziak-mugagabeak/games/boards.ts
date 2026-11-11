import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   Integral mugagabeak (Batxilergoa 2 · Zientziak) memory: a function and
   its antiderivative. Level 1, composite integrals (u′·f(u)); level 2, by
   parts ((x + c)·eˣ, x·eˣ, ln x); level 3, substitution (ln x and √x
   inside, eˣ in sums). The constant k is left out of the cards (it goes in
   the explanation), every card has exactly one partner, and the text stays
   narrow enough for a card at 375 px: no sin or tan, which each language
   writes in its own way. Each pair keeps its functions for the tests.
   ========================================================================== */

export const BACH2_INDEFINITE_MEMORY_PAIRS = 6

export const bach2IndefiniteMemoryLevels = ['composed', 'parts', 'substitution'] as const

export interface MemoryPair {
    question: string
    answer: string
    fn: (x: number) => number
    F: (x: number) => number
}

const pair = (question: string, answer: string, fn: (x: number) => number, F: (x: number) => number): MemoryPair => ({ question, answer, fn, F })

export const COMPOSED_PAIRS: MemoryPair[] = [
    pair('2xe^{x^2}', 'e^{x^2}', (x) => 2 * x * Math.exp(x * x), (x) => Math.exp(x * x)),
    pair('3x^2e^{x^3}', 'e^{x^3}', (x) => 3 * x * x * Math.exp(x ** 3), (x) => Math.exp(x ** 3)),
    pair('\\frac{2x}{x^2+1}', '\\ln(x^2+1)', (x) => (2 * x) / (x * x + 1), (x) => Math.log(x * x + 1)),
    pair('\\frac{1}{x+2}', '\\ln|x+2|', (x) => 1 / (x + 2), (x) => Math.log(Math.abs(x + 2))),
    pair('e^{3x}', '\\frac{e^{3x}}{3}', (x) => Math.exp(3 * x), (x) => Math.exp(3 * x) / 3),
    pair('\\frac{e^x}{e^x+1}', '\\ln(e^x+1)', (x) => Math.exp(x) / (Math.exp(x) + 1), (x) => Math.log(Math.exp(x) + 1)),
    pair('\\frac{1}{(x+1)^2}', '-\\frac{1}{x+1}', (x) => 1 / (x + 1) ** 2, (x) => -1 / (x + 1)),
    pair('4(2x+1)', '(2x+1)^2', (x) => 4 * (2 * x + 1), (x) => (2 * x + 1) ** 2),
    pair('\\frac{1}{2\\sqrt{x+1}}', '\\sqrt{x+1}', (x) => 1 / (2 * Math.sqrt(x + 1)), (x) => Math.sqrt(x + 1)),
    pair('\\frac{2}{2x+1}', '\\ln|2x+1|', (x) => 2 / (2 * x + 1), (x) => Math.log(Math.abs(2 * x + 1)))
]

/** ∫ (x + c)eˣ dx = eˣ(x + c − 1) */
const shifted = (c: number): MemoryPair => {
    const inner = (value: number) => (value === 0 ? 'x' : `x${value > 0 ? '+' : '-'}${Math.abs(value)}`)
    const answer = c === 1 ? 'xe^x' : `e^x(${inner(c - 1)})`
    return pair(`(${inner(c)})e^x`, answer, (x) => (x + c) * Math.exp(x), (x) => Math.exp(x) * (x + c - 1))
}

export const PARTS_PAIRS: MemoryPair[] = [
    pair('xe^x', 'e^x(x-1)', (x) => x * Math.exp(x), (x) => Math.exp(x) * (x - 1)),
    pair('\\ln x', 'x\\ln x-x', (x) => Math.log(x), (x) => x * Math.log(x) - x),
    ...[-2, -1, 1, 2, 3].map(shifted)
]

export const SUBSTITUTION_PAIRS: MemoryPair[] = [
    pair('\\frac{\\ln x}{x}', '\\frac{(\\ln x)^2}{2}', (x) => Math.log(x) / x, (x) => Math.log(x) ** 2 / 2),
    pair('\\frac{(\\ln x)^2}{x}', '\\frac{(\\ln x)^3}{3}', (x) => Math.log(x) ** 2 / x, (x) => Math.log(x) ** 3 / 3),
    pair('\\frac{e^{\\sqrt{x}}}{\\sqrt{x}}', '2e^{\\sqrt{x}}', (x) => Math.exp(Math.sqrt(x)) / Math.sqrt(x), (x) => 2 * Math.exp(Math.sqrt(x))),
    pair('\\frac{1}{x\\ln x}', '\\ln|\\ln x|', (x) => 1 / (x * Math.log(x)), (x) => Math.log(Math.abs(Math.log(x)))),
    pair('\\frac{e^x}{(e^x+1)^2}', '-\\frac{1}{e^x+1}', (x) => Math.exp(x) / (Math.exp(x) + 1) ** 2, (x) => -1 / (Math.exp(x) + 1)),
    pair('\\frac{x}{\\sqrt{x^2+1}}', '\\sqrt{x^2+1}', (x) => x / Math.sqrt(x * x + 1), (x) => Math.sqrt(x * x + 1)),
    pair('\\frac{1}{x(\\ln x)^2}', '-\\frac{1}{\\ln x}', (x) => 1 / (x * Math.log(x) ** 2), (x) => -1 / Math.log(x))
]

const POOLS: Record<(typeof bach2IndefiniteMemoryLevels)[number], MemoryPair[]> = { composed: COMPOSED_PAIRS, parts: PARTS_PAIRS, substitution: SUBSTITUTION_PAIRS }

/** Six pairs of one level, every question and every answer different */
export function createBach2IndefiniteMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = bach2IndefiniteMemoryLevels[levelIndex] ?? 'composed'
    const pool = POOLS[level]
    const pairs: MemoryPair[] = []
    for (let attempt = 0; pairs.length < BACH2_INDEFINITE_MEMORY_PAIRS && attempt < 3000; attempt += 1) {
        const next = pick(random, pool)
        // No card may repeat another, not even a question showing what another pair answers
        const cards = pairs.flatMap((other) => [other.question, other.answer])
        if (cards.includes(next.question) || cards.includes(next.answer)) continue
        pairs.push(next)
    }
    return shuffle(random, pairs.flatMap((item, setId) => [
        { id: `${setId}-q`, setId, latex: item.question, shows: item.answer, explain: `\\int ${item.question}\\,dx=${item.answer}+k` },
        { id: `${setId}-a`, setId, latex: item.answer, shows: item.answer, explain: `\\int ${item.question}\\,dx=${item.answer}+k` }
    ]))
}
