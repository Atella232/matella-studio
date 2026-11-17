import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   Zenbaki errealak (Batxilergoa 1 · Gizarte Zientziak) memory: a root and
   its power, a logarithm and its value, and a number and its scientific
   notation. Every card has exactly one partner, and the text stays short
   enough for a card.
   ========================================================================== */

export const GIZ_REALS_MEMORY_PAIRS = 6

export const gizRealsMemoryLevels = ['roots', 'logarithms', 'scientific'] as const

interface Pair {
    question: string
    answer: string
    /** The shared answer, to tell pairs apart */
    key: string
}

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))

function rootPair(random: Random): Pair | null {
    const n = randomInt(random, 2, 5)
    const m = randomInt(random, 1, 5)
    if (m % n === 0 || gcd(m, n) !== 1) return null
    const root = n === 2 ? `\\sqrt{a^{${m}}}` : `\\sqrt[${n}]{a^{${m}}}`
    return { question: m === 1 ? root.replace('a^{1}', 'a') : root, answer: `a^{\\frac{${m}}{${n}}}`, key: `${m}/${n}` }
}

function logPair(random: Random): Pair | null {
    const base = pick(random, [2, 3, 5, 10])
    const x = randomInt(random, -2, base === 2 ? 5 : 3)
    if (x === 0) return null
    const value = x > 0 ? String(base ** x) : `\\frac{1}{${base ** -x}}`
    return { question: `\\log_{${base}} ${value}`, answer: String(x), key: String(x) }
}

function scientificPair(random: Random): Pair | null {
    const digits = randomInt(random, 11, 99)
    if (digits % 10 === 0) return null
    const exponent = pick(random, [-4, -3, -2, 3, 4, 5])
    const mantissa = `${String(digits)[0]}{,}${String(digits)[1]}`
    // digits · 10^(exponent − 1), written in full
    let full: string
    if (exponent > 0) {
        const text = String(digits) + '0'.repeat(exponent - 1)
        full = text.length >= 5 ? text.replace(/\B(?=(\d{3})+(?!\d))/g, '\\,') : text
    } else {
        full = `0{,}${'0'.repeat(-exponent - 1)}${digits}`
    }
    return { question: full, answer: `${mantissa}\\cdot 10^{${exponent}}`, key: `${digits}e${exponent}` }
}

/** Six pairs with different answers, so every card has exactly one partner */
export function createGizRealsMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = gizRealsMemoryLevels[levelIndex] ?? 'roots'
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < GIZ_REALS_MEMORY_PAIRS && attempt < 2000; attempt += 1) {
        const pair = level === 'roots' ? rootPair(random) : level === 'logarithms' ? logPair(random) : scientificPair(random)
        if (!pair || pairs.some((other) => other.key === pair.key || other.question === pair.question || other.answer === pair.answer)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}=${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}=${pair.answer}` }
    ]))
}
