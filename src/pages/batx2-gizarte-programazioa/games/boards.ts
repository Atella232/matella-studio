import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J5 · Memoria (Programazio lineala): F at a vertex and its value, the
   system of two boundary lines and the vertex where they cross, and a
   rectangle x ≤ a, y ≤ b and its number of whole points. Every card has
   exactly one partner.
   ========================================================================== */

export const PROGRAMMING_MEMORY_PAIRS = 6

export const programmingMemoryLevels = ['value', 'crossing', 'count'] as const

interface Pair {
    question: string
    answer: string
}

/** F = ax + by at (p, q) and its value */
function valuePair(random: Random): Pair {
    const [a, b, p, q] = [randomInt(random, 1, 6), randomInt(random, 1, 6), randomInt(random, 0, 6), randomInt(random, 0, 6)]
    return { question: `F=${a === 1 ? '' : a}x+${b === 1 ? '' : b}y,\\ (${p},${q})`, answer: String(a * p + b * q) }
}

/** x + y = s and x + ky = t, crossing at (p, q) */
function crossingPair(random: Random): Pair | null {
    const p = randomInt(random, 0, 6)
    const q = randomInt(random, 1, 6)
    const k = randomInt(random, 2, 3)
    return { question: `\\begin{cases}x+y=${p + q}\\\\ x+${k}y=${p + k * q}\\end{cases}`, answer: `(${p},${q})` }
}

/** x ≤ a, y ≤ b with x, y ≥ 0: (a + 1)(b + 1) whole points */
function countPair(random: Random): Pair {
    const a = randomInt(random, 1, 5)
    const b = randomInt(random, 1, 5)
    return { question: `\\begin{cases}0\\le x\\le ${a}\\\\ 0\\le y\\le ${b}\\end{cases}`, answer: String((a + 1) * (b + 1)) }
}

export function createProgrammingMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = programmingMemoryLevels[levelIndex] ?? 'value'
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < PROGRAMMING_MEMORY_PAIRS && attempt < 5000; attempt += 1) {
        const pair = level === 'value' ? valuePair(random) : level === 'crossing' ? crossingPair(random) : countPair(random)
        if (!pair) continue
        const cards = pairs.flatMap((other) => [other.question, other.answer])
        if (pair.question === pair.answer || cards.includes(pair.question) || cards.includes(pair.answer)) continue
        pairs.push(pair)
    }
    const relation = level === 'crossing' ? '\\to' : '='
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}${relation}${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}${relation}${pair.answer}` }
    ]))
}
