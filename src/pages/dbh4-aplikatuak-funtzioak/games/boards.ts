import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { polyLatex } from './race.ts'

/* ==========================================================================
   Funtzioak (4. DBH aplikatuak) memory: an image f(k) and its value, a
   formula and its domain, and a function on an interval and its T.V.M.
   Every card has exactly one partner.
   ========================================================================== */

export const FUNCTIONS_MEMORY_PAIRS = 6

export const functionsMemoryLevels = ['images', 'domains', 'rates'] as const

interface Pair {
    question: string
    answer: string
    /** The shared answer, to tell pairs apart */
    key: string
}

function imagePair(random: Random): Pair {
    const b = randomInt(random, -4, 4)
    const c = randomInt(random, -5, 5)
    const k = randomInt(random, -3, 3)
    const value = k * k + b * k + c
    return { question: `${polyLatex(1, b, c)},\\ x=${k}`, answer: String(value), key: String(value) }
}

function domainPair(random: Random): Pair {
    const a = randomInt(random, -6, 6)
    const inside = polyLatex(0, 1, -a)
    if (random() < 0.5) return { question: `y=\\frac{1}{${inside}}`, answer: `\\mathbb{R}-\\{${a}\\}`, key: `f${a}` }
    return { question: `y=\\sqrt{${inside}}`, answer: `[${a},\\,+\\infty)`, key: `r${a}` }
}

function ratePair(random: Random): Pair | null {
    const power = pick(random, [2, 3])
    const k = pick(random, [1, 2, -1])
    const from = randomInt(random, -2, 2)
    const to = from + randomInt(random, 1, 3)
    const f = (x: number) => k * x ** power
    const rate = (f(to) - f(from)) / (to - from)
    if (!Number.isInteger(rate)) return null
    const formula = `${k === 1 ? '' : k === -1 ? '-' : k}x^{${power}}`
    return { question: `${formula},\\ [${from},\\,${to}]`, answer: String(rate), key: String(rate) }
}

/** Six pairs with different answers, so every card has exactly one partner */
export function createFunctionsMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = functionsMemoryLevels[levelIndex] ?? 'images'
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < FUNCTIONS_MEMORY_PAIRS && attempt < 2000; attempt += 1) {
        const pair = level === 'images' ? imagePair(random) : level === 'domains' ? domainPair(random) : ratePair(random)
        if (!pair || pairs.some((other) => other.key === pair.key || other.question === pair.question)) continue
        pairs.push(pair)
    }
    const prefix = level === 'rates' ? '\\text{T.V.M.}\\ ' : ''
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${prefix}${pair.question}\\ \\Rightarrow\\ ${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${prefix}${pair.question}\\ \\Rightarrow\\ ${pair.answer}` }
    ]))
}
