import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   Berreturak, erroak eta logaritmoak (4. DBH akademikoak) memory: a power
   with a fractional exponent and its value, a root with a factor to take
   out and its simplified form, and a logarithm and its value. Every card
   has exactly one partner, and the text stays short enough for a card.
   ========================================================================== */

export const POWERS_MEMORY_PAIRS = 6

export const powersMemoryLevels = ['fractional', 'extract', 'logarithms'] as const

interface Pair {
    question: string
    answer: string
    /** The shared answer, to tell pairs apart */
    key: string
}

const root = (index: number, radicand: number) => (index === 2 ? `\\sqrt{${radicand}}` : `\\sqrt[${index}]{${radicand}}`)

function fractionalPair(random: Random): Pair | null {
    const q = pick(random, [2, 3, 4])
    const r = randomInt(random, 2, q === 2 ? 9 : q === 3 ? 4 : 3)
    const p = pick(random, [-1, 1, 2, 3])
    if (p === q) return null
    const value = r ** Math.abs(p)
    if (value > 999) return null
    const answer = p > 0 ? String(value) : `\\frac{1}{${value}}`
    return { question: `${r ** q}^{${p < 0 ? '-' : ''}\\frac{${Math.abs(p)}}{${q}}}`, answer, key: answer }
}

function extractPair(random: Random): Pair | null {
    const index = pick(random, [2, 3])
    const outside = randomInt(random, 2, index === 2 ? 7 : 3)
    const inside = pick(random, [2, 3, 5, 7])
    const radicand = outside ** index * inside
    return { question: root(index, radicand), answer: `${outside}${root(index, inside)}`, key: `${index}:${outside}:${inside}` }
}

function logPair(random: Random): Pair | null {
    const base = pick(random, [2, 3, 5, 10])
    const x = randomInt(random, -2, base === 2 ? 6 : 3)
    const value = x >= 0 ? String(base ** x) : `\\frac{1}{${base ** -x}}`
    return { question: `\\log_{${base}} ${value}`, answer: String(x), key: String(x) }
}

/** Six pairs with different answers, so every card has exactly one partner */
export function createPowersMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = powersMemoryLevels[levelIndex] ?? 'fractional'
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < POWERS_MEMORY_PAIRS && attempt < 2000; attempt += 1) {
        const pair = level === 'fractional' ? fractionalPair(random) : level === 'extract' ? extractPair(random) : logPair(random)
        if (!pair || pairs.some((other) => other.key === pair.key || other.question === pair.question || other.answer === pair.answer)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` }
    ]))
}
