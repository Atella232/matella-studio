import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   Ekuazio-sistemak (Batxilergoa 1 · Zientziak) memory: a 2 × 2 linear
   system and its solution, a last row and what it says (z = 2, no
   solution or infinitely many), and a sum and a product and their two
   numbers. Every card has exactly one partner, and each row stays short
   enough for a phone card (one or two figures, two rows at most).
   ========================================================================== */

export const BACH_SYSTEMS_MEMORY_PAIRS = 6

export const bachSystemsMemoryLevels = ['linear', 'last-row', 'sum-product'] as const

interface Pair {
    question: string
    answer: string
}

const term = (value: number, name: string, first = false) => (value === 0 ? '' : `${value < 0 ? '-' : first ? '' : '+'}${Math.abs(value) === 1 ? '' : Math.abs(value)}${name}`)
/** Two equations stacked, with no brace, so the card is narrow enough */
const stacked = (top: string, bottom: string) => `\\begin{array}{c}${top}\\\\ ${bottom}\\end{array}`

/** x + y = s and x − y = d, or x + 2y and 2x − y: one solution (x, y) */
function linearPair(random: Random): Pair | null {
    const x = randomInt(random, -2, 5)
    const y = randomInt(random, -2, 5)
    const [a, b] = pick(random, [[1, 1], [1, 2], [2, 1]])
    const [c, d] = pick(random, [[1, -1], [2, -1], [1, -2]])
    if (a * d - b * c === 0) return null
    const top = `${term(a, 'x', true)}${term(b, 'y')}=${a * x + b * y}`
    const bottom = `${term(c, 'x', true)}${term(d, 'y')}=${c * x + d * y}`
    return { question: stacked(top, bottom), answer: `(${x},${y})` }
}

/** The last row 0 0 c | d: z = d/c, or no solution, or infinitely many */
function lastRowPair(random: Random, kind: 'one' | 'none' | 'infinite'): Pair | null {
    if (kind === 'none') {
        const d = pick(random, [2, 3, 5, -4])
        return { question: `0\\ \\ 0\\ \\ 0\\mid ${d}`, answer: '\\varnothing' }
    }
    if (kind === 'infinite') return { question: '0\\ \\ 0\\ \\ 0\\mid 0', answer: 'z=\\lambda' }
    const c = pick(random, [2, 3, 4, -2])
    const z = randomInt(random, -3, 4)
    if (z === 0) return null
    return { question: `0\\ \\ 0\\ \\ ${c}\\mid ${c * z}`, answer: `z=${z}` }
}

/** x + y = S, xy = P: the two numbers */
function sumProductPair(random: Random): Pair | null {
    const m = randomInt(random, 1, 5)
    const n = randomInt(random, 2, 7)
    if (m >= n) return null
    return { question: stacked(`x+y=${m + n}`, `xy=${m * n}`), answer: `${m},\\ ${n}` }
}

/** Six pairs with different answers, so every card has exactly one partner */
export function createBachSystemsMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = bachSystemsMemoryLevels[levelIndex] ?? 'linear'
    const pairs: Pair[] = []
    const kinds = ['none', 'infinite', 'one', 'one', 'one', 'one'] as const
    for (let attempt = 0; pairs.length < BACH_SYSTEMS_MEMORY_PAIRS && attempt < 3000; attempt += 1) {
        const pair = level === 'linear' ? linearPair(random) : level === 'last-row' ? lastRowPair(random, kinds[pairs.length]) : sumProductPair(random)
        if (!pair || pairs.some((other) => other.question === pair.question || other.answer === pair.answer)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` }
    ]))
}
