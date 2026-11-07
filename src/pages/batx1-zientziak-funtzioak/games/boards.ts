import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   Funtzio elementalak (Batxilergoa 1 · Zientziak) memory: the integer part
   of a decimal and its value (negatives too), a function and its inverse,
   and a function and its domain. Every card has exactly one partner, and
   the text stays short enough for a card.
   ========================================================================== */

export const BACH_FUNCTIONS_MEMORY_PAIRS = 6

export const bachFunctionsMemoryLevels = ['floor', 'inverses', 'domains'] as const

interface Pair {
    question: string
    answer: string
}

const signed = (value: number) => (value < 0 ? `-${-value}` : `+${value}`)

function floorPair(random: Random): Pair | null {
    const whole = randomInt(random, -5, 5)
    const tenth = randomInt(random, 1, 9)
    const value = whole * 10 + (whole < 0 ? -tenth : tenth)
    const sign = value < 0 ? '-' : ''
    const absolute = Math.abs(value)
    const number = `${sign}${Math.floor(absolute / 10)}{,}${absolute % 10}`
    return { question: `E(${number})`, answer: String(Math.floor(value / 10)) }
}

function inversePair(random: Random): Pair | null {
    const kind = pick(random, ['line', 'divide', 'exp', 'cube'] as const)
    if (kind === 'line') {
        const a = randomInt(random, 2, 5)
        const b = randomInt(random, 1, 6)
        return { question: `${a}x${signed(b)}`, answer: `\\frac{x-${b}}{${a}}` }
    }
    if (kind === 'divide') {
        const b = randomInt(random, 2, 9)
        return { question: `\\frac{x}{${b}}`, answer: `${b}x` }
    }
    if (kind === 'exp') {
        const c = randomInt(random, 1, 5)
        return pick(random, [true, false]) ? { question: `2^x+${c}`, answer: `\\log_2(x-${c})` } : { question: `2^{x-${c}}`, answer: `\\log_2 x+${c}` }
    }
    const c = randomInt(random, 1, 5)
    return { question: `x^3-${c}`, answer: `\\sqrt[3]{x+${c}}` }
}

function domainPair(random: Random): Pair | null {
    const a = randomInt(random, -5, 5)
    const inner = a === 0 ? 'x' : `x${signed(-a)}`
    const kind = pick(random, ['root', 'log', 'fraction', 'root-fraction'] as const)
    if (kind === 'root') return { question: `\\sqrt{${inner}}`, answer: `[${a},+\\infty)` }
    if (kind === 'log') return { question: `\\log(${inner})`, answer: `(${a},+\\infty)` }
    if (kind === 'fraction') return { question: `\\frac{1}{${inner}}`, answer: `\\mathbb{R}-\\{${a}\\}` }
    return { question: `\\frac{1}{\\sqrt{${inner}}}`, answer: `(${a},+\\infty)` }
}

/** Six pairs of one level, every question and every answer different */
export function createBachFunctionsMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = bachFunctionsMemoryLevels[levelIndex] ?? 'floor'
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < BACH_FUNCTIONS_MEMORY_PAIRS && attempt < 3000; attempt += 1) {
        const pair = level === 'floor' ? floorPair(random) : level === 'inverses' ? inversePair(random) : domainPair(random)
        if (!pair || pairs.some((other) => other.question === pair.question || other.answer === pair.answer)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` }
    ]))
}
