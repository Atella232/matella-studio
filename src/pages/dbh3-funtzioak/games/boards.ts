import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { lin, quad } from '../content.ts'

/* ==========================================================================
   Funtzioak (3. DBH) memory: a function and a value, a line and its slope
   and intercept, a parabola and its vertex. Every card has exactly one
   partner, and the text stays short enough for a card on a phone (two
   lines with gathered).
   ========================================================================== */

export const FUNCTIONS3_MEMORY_PAIRS = 6

interface MemoryPair {
    question: string
    answer: string
}

function valuePair(random: Random): MemoryPair {
    const m = pick(random, [-3, -2, 2, 3, 4])
    const n = randomInt(random, -5, 5)
    const x = pick(random, [-2, -1, 1, 2, 3])
    return { question: `\\begin{gathered}${lin(m, n)}\\\\ x=${x}\\end{gathered}`, answer: String(m * x + n) }
}

function linePair(random: Random): MemoryPair {
    const m = pick(random, [-3, -2, -1, 1, 2, 3])
    const n = pick(random, [-4, -3, -2, -1, 1, 2, 3, 4])
    return { question: `y=${lin(m, n)}`, answer: `\\begin{gathered}m=${m}\\\\ n=${n}\\end{gathered}` }
}

function vertexPair(random: Random): MemoryPair {
    const a = pick(random, [1, -1])
    const p = randomInt(random, -3, 3)
    const q = randomInt(random, -4, 4)
    return { question: `y=${quad(a, -2 * a * p, a * p * p + q)}`, answer: `(${p},${q})` }
}

const generators = [valuePair, linePair, vertexPair]

/** Six pairs with different answers, so every card has exactly one partner */
export function createFunctions3MemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const make = generators[levelIndex] ?? generators[0]
    const pairs: MemoryPair[] = []
    for (let attempt = 0; pairs.length < FUNCTIONS3_MEMORY_PAIRS && attempt < 3000; attempt += 1) {
        const next = make(random)
        if (pairs.some((other) => other.answer === next.answer || other.question === next.question)) continue
        pairs.push(next)
    }
    return shuffle(random, pairs.flatMap((item, setId) => [
        { id: `${setId}-q`, setId, latex: item.question, shows: item.answer, explain: `${item.question}\\ \\to\\ ${item.answer}` },
        { id: `${setId}-a`, setId, latex: item.answer, shows: item.answer, explain: `${item.question}\\ \\to\\ ${item.answer}` }
    ]))
}
