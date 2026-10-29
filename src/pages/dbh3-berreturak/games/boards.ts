import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   Berreturak eta erroak (3. DBH) memory: a power and its value, a number in
   scientific notation and the number written out, and a root with a factor
   to take out and its simplified form. Every card has exactly one partner,
   and the text stays short enough for a card.
   ========================================================================== */

export const POWERS_MEMORY_PAIRS = 6

export const powersMemoryLevels = ['powers', 'scientific', 'roots'] as const

export interface MemoryPair {
    question: string
    answer: string
    /** The shared answer, to tell pairs apart */
    key: string
}

const grouped = (digits: string) => digits.replace(/\B(?=(\d{3})+$)/g, '\\,')

function negativePair(random: Random): MemoryPair | null {
    const base = pick(random, [2, 3, 4, 5, 10])
    const k = randomInt(random, 1, base === 10 ? 3 : base === 2 ? 5 : 3)
    return { question: `${base}^{-${k}}`, answer: `\\frac{1}{${base ** k}}`, key: `1/${base ** k}` }
}

function signedPair(random: Random): MemoryPair | null {
    const base = pick(random, [-2, -3, -4, -5])
    const n = pick(random, [2, 3, 4])
    const value = base ** n
    return { question: `(${base})^{${n}}`, answer: String(value), key: String(value) }
}

function productPair(random: Random): MemoryPair | null {
    const base = pick(random, [2, 3, 5])
    const m = randomInt(random, 2, 6)
    const n = randomInt(random, -4, 3)
    const exponent = m + n
    if (n === 0 || exponent < -3 || exponent > 5) return null
    const answer = exponent >= 0 ? String(base ** exponent) : `\\frac{1}{${base ** -exponent}}`
    return { question: `${base}^{${m}}\\cdot ${base}^{${n}}`, answer, key: answer }
}

function sciPair(random: Random): MemoryPair | null {
    const digits = pick(random, ['45', '32', '7', '81', '19', '603'])
    const exponent = pick(random, [-5, -4, -3, -2, 2, 3, 4, 5, 6])
    const mantissa = `${digits[0]}${digits.length > 1 ? `{,}${digits.slice(1)}` : ''}`
    const written = exponent > 0 ? grouped(digits.padEnd(exponent + 1, '0')) : `0{,}${'0'.repeat(-exponent - 1)}${digits}`
    if (written.replace(/\D/g, '').length > 9) return null
    return { question: `${mantissa}\\cdot 10^{${exponent}}`, answer: written, key: written }
}

function rootPair(random: Random): MemoryPair | null {
    const outside = randomInt(random, 2, 9)
    const inside = pick(random, [2, 3, 5, 6, 7])
    const radicand = outside ** 2 * inside
    if (radicand > 400) return null
    return { question: `\\sqrt{${radicand}}`, answer: `${outside}\\sqrt{${inside}}`, key: `${outside}:${inside}` }
}

function exactRootPair(random: Random): MemoryPair | null {
    const k = randomInt(random, 6, 20)
    return { question: `\\sqrt{${k * k}}`, answer: String(k), key: `exact:${k}` }
}

const generators: Array<Array<(random: Random) => MemoryPair | null>> = [
    [negativePair, signedPair, productPair],
    [sciPair],
    [rootPair, rootPair, exactRootPair]
]

/** Six pairs with different answers, so every card has exactly one partner */
export function createPowersMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const list = generators[levelIndex] ?? generators[0]
    const pairs: MemoryPair[] = []
    for (let attempt = 0; pairs.length < POWERS_MEMORY_PAIRS && attempt < 3000; attempt += 1) {
        const pair = pick(random, list)(random)
        if (!pair || pairs.some((other) => other.key === pair.key || other.question === pair.question || other.answer === pair.answer)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` }
    ]))
}
