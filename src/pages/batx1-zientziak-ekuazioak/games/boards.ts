import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { polyLatex } from '../../dbh4-games/polynomials.ts'

/* ==========================================================================
   Ekuazioak eta inekuazioak (Batxilergoa 1 · Zientziak) memory: an
   equation of second degree and its two solutions, an exponential or a
   logarithmic equation and its solution, and an inequality with an
   absolute value or a square and its interval. Every card has exactly one
   partner, and the text stays short enough for a card.
   ========================================================================== */

export const BACH_EQUATIONS_MEMORY_PAIRS = 6

export const bachEquationsMemoryLevels = ['roots', 'exponents', 'intervals'] as const

interface Pair {
    question: string
    answer: string
}

const signed = (value: number) => (value < 0 ? `-${-value}` : `+${value}`)
const binomial = (root: number) => (root === 0 ? 'x' : `x${signed(-root)}`)

function rootsPair(random: Random): Pair | null {
    const r1 = randomInt(random, -5, 5)
    const r2 = randomInt(random, -4, 6)
    // One-figure coefficients and «= 0» on a second row, so the card is wide enough
    if (r1 >= r2 || r1 === 0 || r2 === 0 || Math.abs(r1 + r2) > 9 || Math.abs(r1 * r2) > 9) return null
    return { question: `\\begin{gathered}${polyLatex([1, -(r1 + r2), r1 * r2])}\\\\ =0\\end{gathered}`, answer: `${r1},\\ ${r2}` }
}

function exponentPair(random: Random): Pair | null {
    const base = pick(random, [2, 3, 5])
    const k = randomInt(random, 1, base === 2 ? 6 : base === 3 ? 4 : 3)
    if (pick(random, [true, false])) {
        const n = randomInt(random, -3, 3)
        if (n === 0 || k - n < -1) return null
        return { question: `${base}^{x${signed(n)}}=${base ** k}`, answer: String(k - n) }
    }
    if (k < 2) return null
    return { question: `\\log_{${base}}x=${k}`, answer: String(base ** k) }
}

function intervalPair(random: Random): Pair | null {
    const closed = pick(random, [true, false])
    const relation = closed ? '\\le' : '<'
    const [open, close] = closed ? ['[', ']'] : ['(', ')']
    if (pick(random, [true, false])) {
        const a = randomInt(random, -4, 4)
        const c = randomInt(random, 1, 5)
        return { question: `|${binomial(a)}|${relation}${c}`, answer: `${open}${a - c},${a + c}${close}` }
    }
    const k = randomInt(random, 2, 6)
    return { question: `x^2${relation}${k * k}`, answer: `${open}-${k},${k}${close}` }
}

/** Six pairs with different answers, so every card has exactly one partner */
export function createBachEquationsMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = bachEquationsMemoryLevels[levelIndex] ?? 'roots'
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < BACH_EQUATIONS_MEMORY_PAIRS && attempt < 3000; attempt += 1) {
        const pair = level === 'roots' ? rootsPair(random) : level === 'exponents' ? exponentPair(random) : intervalPair(random)
        if (!pair || pairs.some((other) => other.question === pair.question || other.answer === pair.answer)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` }
    ]))
}
