import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { matrixLatex } from '../../batx2-zientziak-matrizeak/matrix.ts'

/* ==========================================================================
   Determinanteak (Batxilergoa 2 · Zientziak) memory: a 2 × 2 determinant
   and its value, a 3 × 3 triangular determinant and the product of its
   diagonal, and a 2 × 2 matrix and its adjugate (the matrix of its
   cofactors). Every card has exactly one partner.
   ========================================================================== */

export const DETERMINANTEAK_MEMORY_PAIRS = 6

export const determinanteakMemoryLevels = ['two', 'triangular', 'adjugate'] as const

interface Pair {
    question: string
    answer: string
}

const vm = (rows: number[][]) => `\\begin{vmatrix}${rows.map((row) => row.join('&')).join('\\\\')}\\end{vmatrix}`
const small = (random: Random) => pick(random, [-3, -2, -1, 1, 2, 3, 4, 5])

/** |a b / c d| and ad − bc */
function twoPair(random: Random): Pair {
    const rows = [[small(random), small(random)], [small(random), small(random)]]
    return { question: vm(rows), answer: String(rows[0][0] * rows[1][1] - rows[0][1] * rows[1][0]) }
}

/** A triangular 3 × 3 (above or below the diagonal) and the product of its diagonal; one minus sign at most, so it fits on a card */
function triangularPair(random: Random): Pair {
    const upper = randomInt(random, 0, 1) === 0
    const negative = randomInt(random, -1, 2)
    const rows = Array.from({ length: 3 }, (_, r) => Array.from({ length: 3 }, (_, c) => (r === c ? pick(random, [1, 2, 3, 4]) * (r === negative ? -1 : 1) : (upper ? c > r : c < r) ? randomInt(random, 1, 5) : 0)))
    return { question: vm(rows), answer: String(rows[0][0] * rows[1][1] * rows[2][2]) }
}

/** A 2 × 2 matrix and its adjugate (d −c / −b a), never the same matrix */
function adjugatePair(random: Random): Pair | null {
    const [a, b, c, d] = [small(random), small(random), small(random), small(random)]
    const adj = [[d, -c], [-b, a]]
    if (a === d && b === -c) return null
    return { question: matrixLatex([[a, b], [c, d]]), answer: matrixLatex(adj) }
}

/** Six pairs with different cards, so every card has exactly one partner */
export function createDeterminanteakMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = determinanteakMemoryLevels[levelIndex] ?? 'two'
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < DETERMINANTEAK_MEMORY_PAIRS && attempt < 5000; attempt += 1) {
        const pair = level === 'two' ? twoPair(random) : level === 'triangular' ? triangularPair(random) : adjugatePair(random)
        if (!pair) continue
        const cards = pairs.flatMap((other) => [other.question, other.answer])
        if (pair.question === pair.answer || cards.includes(pair.question) || cards.includes(pair.answer)) continue
        pairs.push(pair)
    }
    const relation = level === 'adjugate' ? '\\xrightarrow{\\ \\operatorname{Adj}\\ }' : '='
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}${relation}${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}${relation}${pair.answer}` }
    ]))
}
