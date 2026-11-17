import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { matrixLatex } from '../../batx2-zientziak-matrizeak/matrix.ts'

/* ==========================================================================
   Matrizeak (Batxilergoa 2 · Gizarte Zientziak) memory: a row of
   quantities times a column of prices and the total it gives, a table and
   its transpose, and a system of two equations and its coefficient
   matrix. Every card has exactly one partner.
   ========================================================================== */

export const GIZARTE_MEMORY_PAIRS = 6

export const gizarteMemoryLevels = ['income', 'transpose', 'system'] as const

interface Pair {
    question: string
    answer: string
}

/** (q₁ q₂)(p₁ / p₂) and q₁p₁ + q₂p₂ */
function incomePair(random: Random): Pair {
    const q = [randomInt(random, 2, 12), randomInt(random, 2, 12)]
    const p = [randomInt(random, 2, 9), randomInt(random, 2, 9)]
    return { question: `${matrixLatex([q])}${matrixLatex([[p[0]], [p[1]]])}`, answer: String(q[0] * p[0] + q[1] * p[1]) }
}

/** A 2 × 3 table and its transpose */
function transposePair(random: Random): Pair {
    const rows = [0, 1].map(() => [0, 1, 2].map(() => randomInt(random, 1, 9)))
    return { question: matrixLatex(rows), answer: matrixLatex([0, 1, 2].map((j) => rows.map((row) => row[j]))) }
}

const term = (coefficient: number, letter: string, first: boolean) => {
    const sign = coefficient < 0 ? '-' : first ? '' : '+'
    const size = Math.abs(coefficient) === 1 ? '' : String(Math.abs(coefficient))
    return `${sign}${size}${letter}`
}

/** A system of two equations and its coefficient matrix */
function systemPair(random: Random): Pair | null {
    const a = [0, 1].map(() => [randomInt(random, -3, 4), randomInt(random, -3, 4)])
    if (a.some((row) => row.includes(0))) return null
    const b = [randomInt(random, -5, 9), randomInt(random, -5, 9)]
    const equations = a.map((row, i) => `${term(row[0], 'x', true)}${term(row[1], 'y', false)}=${b[i]}`)
    return { question: `\\begin{cases}${equations.join('\\\\')}\\end{cases}`, answer: matrixLatex(a) }
}

/** Six pairs with different cards, so every card has exactly one partner */
export function createGizarteMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = gizarteMemoryLevels[levelIndex] ?? 'income'
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < GIZARTE_MEMORY_PAIRS && attempt < 5000; attempt += 1) {
        const pair = level === 'income' ? incomePair(random) : level === 'transpose' ? transposePair(random) : systemPair(random)
        if (!pair) continue
        const cards = pairs.flatMap((other) => [other.question, other.answer])
        if (pair.question === pair.answer || cards.includes(pair.question) || cards.includes(pair.answer)) continue
        pairs.push(pair)
    }
    const relation = level === 'income' ? '=' : level === 'transpose' ? '\\xrightarrow{\\ t\\ }' : '\\to'
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}${relation}${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}${relation}${pair.answer}` }
    ]))
}
