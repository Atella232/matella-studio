import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { augmentedStarLatex, detValue, replaceColumn } from '../system.ts'

/* ==========================================================================
   Sistemak (Batxilergoa 2 · Zientziak) memory: a 2 × 2 system written as
   its augmented matrix A* and its solution (x, y), A* and its |A_x|, and
   the A* of a homogeneous system with k and the k that gives non-trivial
   solutions. A* fits on a card where the whole system does not; every
   card has exactly one partner.
   ========================================================================== */

export const SISTEMAK_MEMORY_PAIRS = 6

export const sistemakMemoryLevels = ['solution', 'column', 'homogeneous'] as const

interface Pair {
    question: string
    answer: string
    /** For the tests */
    rows: number[][]
    b: number[]
}

const coefficient = (random: Random) => pick(random, [1, 2, 3, -1])
/** A* a size smaller, so that it fits on a card */
const small = (latex: string) => `{\\scriptstyle ${latex}}`

function solutionPair(random: Random): Pair | null {
    // Positive numbers only: a minus sign in every cell would not fit on a card
    const rows = [[randomInt(random, 1, 3), randomInt(random, 1, 3)], [randomInt(random, 1, 3), randomInt(random, 1, 3)]]
    if (detValue(rows) === 0) return null
    const s = [randomInt(random, 0, 3), randomInt(random, 0, 3)]
    const b = rows.map((row) => row[0] * s[0] + row[1] * s[1])
    // One or two figures in every cell, so that A* fits on a card
    if (b.some((item) => item < -9 || item > 12)) return null
    return { question: small(augmentedStarLatex(rows, b)), answer: `(${s[0]},${s[1]})`, rows, b }
}

function columnPair(random: Random): Pair | null {
    const rows = [[coefficient(random), coefficient(random)], [coefficient(random), coefficient(random)]]
    if (detValue(rows) === 0) return null
    const b = [randomInt(random, 0, 5), randomInt(random, 0, 5)]
    return { question: small(augmentedStarLatex(rows, b)), answer: `|A_x|=${detValue(replaceColumn(rows, b, 0))}`, rows, b }
}

function homogeneousPair(random: Random): Pair | null {
    const c = pick(random, [1, 2, 3])
    const k = pick(random, [1, 2, 3, -1, -2, 4])
    const d = c * k
    return { question: small(`\\left(\\begin{array}{cc|c}1&k&0\\\\${c}&${d}&0\\end{array}\\right)`), answer: `k=${k}`, rows: [[1, k], [c, d]], b: [0, 0] }
}

/** Six pairs with different cards, so every card has exactly one partner */
export function createSistemakMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = sistemakMemoryLevels[levelIndex] ?? 'solution'
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < SISTEMAK_MEMORY_PAIRS && attempt < 5000; attempt += 1) {
        const pair = level === 'solution' ? solutionPair(random) : level === 'column' ? columnPair(random) : homogeneousPair(random)
        if (!pair) continue
        const cards = pairs.flatMap((other) => [other.question, other.answer])
        if (cards.includes(pair.question) || cards.includes(pair.answer)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}\\ \\to\\ ${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}\\ \\to\\ ${pair.answer}` }
    ]))
}
