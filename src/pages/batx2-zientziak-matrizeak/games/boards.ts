import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { matrixLatex } from '../matrix.ts'

/* ==========================================================================
   Matrizeak (Batxilergoa 2 · Zientziak) memory: a row times a column and
   the number it gives, a matrix and its transpose, and a matrix and its
   inverse (determinant 1, so the inverse has whole numbers). Every card has
   exactly one partner, and each card holds one small matrix at most.
   ========================================================================== */

export const MATRIZEAK_MEMORY_PAIRS = 6

export const matrizeakMemoryLevels = ['product', 'transpose', 'inverse'] as const

interface Pair {
    question: string
    answer: string
}

const small = (random: Random) => pick(random, [-3, -2, -1, 1, 2, 3, 4])

/** (a b)(c / d) and ac + bd */
function productPair(random: Random): Pair {
    const [a, b, c, d] = [small(random), small(random), small(random), small(random)]
    return { question: `${matrixLatex([[a, b]])}${matrixLatex([[c], [d]])}`, answer: String(a * c + b * d) }
}

/** A 2 × 2 (not symmetric) or a 2 × 3 matrix and its transpose */
function transposePair(random: Random): Pair | null {
    const columns = randomInt(random, 2, 3)
    const rows = Array.from({ length: 2 }, () => Array.from({ length: columns }, () => randomInt(random, -2, 5)))
    const transposed = rows[0].map((_, j) => rows.map((row) => row[j]))
    if (columns === 2 && rows[0][1] === rows[1][0]) return null
    return { question: matrixLatex(rows), answer: matrixLatex(transposed) }
}

/** A matrix with determinant 1 and its inverse */
function inversePair(random: Random): Pair | null {
    const a = randomInt(random, 1, 4)
    const b = randomInt(random, -3, 3)
    const c = randomInt(random, -3, 3)
    // ad − bc = 1 with a whole d
    if ((1 + b * c) % a !== 0) return null
    const d = (1 + b * c) / a
    if (b === 0 && c === 0) return null
    const inverse = [[d, -b], [-c, a]]
    return { question: matrixLatex([[a, b], [c, d]]), answer: matrixLatex(inverse.map((row) => row.map((value) => value + 0))) }
}

/** Six pairs with different cards, so every card has exactly one partner */
export function createMatrizeakMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = matrizeakMemoryLevels[levelIndex] ?? 'product'
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < MATRIZEAK_MEMORY_PAIRS && attempt < 5000; attempt += 1) {
        const pair = level === 'product' ? productPair(random) : level === 'transpose' ? transposePair(random) : inversePair(random)
        if (!pair) continue
        const cards = pairs.flatMap((other) => [other.question, other.answer])
        if (pair.question === pair.answer || cards.includes(pair.question) || cards.includes(pair.answer)) continue
        pairs.push(pair)
    }
    const relation = level === 'product' ? '=' : level === 'transpose' ? '\\xrightarrow{\\ t\\ }' : '\\xrightarrow{\\ -1\\ }'
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}${relation}${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}${relation}${pair.answer}` }
    ]))
}
