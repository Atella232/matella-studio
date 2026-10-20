import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   Funtzio esponentzial, logaritmiko eta trigonometrikoen memoria (4. DBH
   akademikoak): a power aⁿ and its value, a logarithm and its value, and
   cos kx and its period. Cards carry formulas only (the cosine has the
   same name in every language), so they read the same everywhere. Every
   card has exactly one partner, and the text stays short enough for a
   phone card.
   ========================================================================== */

export const EXPONENTIAL_AK_MEMORY_PAIRS = 6

export const exponentialAkMemoryLevels = ['powers', 'logarithms', 'periods'] as const

interface Pair2 {
    question: string
    answer: string
}

/** aⁿ written as a whole number or a fraction */
const powerLatex = (a: number, n: number) => (n >= 0 ? String(a ** n) : `\\frac{1}{${a ** -n}}`)

function powerPair(random: Random): Pair2 {
    const a = pick(random, [2, 3, 4, 5, 10])
    const n = randomInt(random, -2, a === 2 ? 5 : 3)
    return { question: `${a}^{${n}}`, answer: powerLatex(a, n) }
}

function logarithmPair(random: Random): Pair2 {
    const a = pick(random, [2, 3, 5, 10])
    const n = randomInt(random, -2, a === 2 ? 6 : 3)
    const log = a === 10 ? '\\log' : `\\log_{${a}}`
    return { question: `\\small ${log} ${powerLatex(a, n)}`, answer: String(n) }
}

function periodPair(random: Random): Pair2 {
    const k = pick(random, [1, 2, 3, 4, 5, 6, 8])
    const half = random() < 0.25
    if (half) {
        const m = pick(random, [2, 3, 4])
        return { question: `\\cos\\frac{x}{${m}}`, answer: `${2 * m}\\pi` }
    }
    const period = k === 1 ? '2\\pi' : k === 2 ? '\\pi' : k % 2 === 0 ? `\\frac{\\pi}{${k / 2}}` : `\\frac{2\\pi}{${k}}`
    return { question: `\\cos ${k === 1 ? '' : k}x`, answer: period }
}

/** Six pairs with different questions and answers, so every card has exactly one partner */
export function createExponentialAkMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = exponentialAkMemoryLevels[levelIndex] ?? 'powers'
    const pairs: Pair2[] = []
    for (let attempt = 0; pairs.length < EXPONENTIAL_AK_MEMORY_PAIRS && attempt < 3000; attempt += 1) {
        const pair = level === 'powers' ? powerPair(random) : level === 'logarithms' ? logarithmPair(random) : periodPair(random)
        if (pairs.some((other) => other.question === pair.question || other.answer === pair.answer)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` }
    ]))
}
