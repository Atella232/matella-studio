import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   Bektoreak (Batxilergoa 1 · Zientziak) memory: a dot product with
   coordinates and its value, a vector and its magnitude, and the k that
   makes two vectors perpendicular. Every card has
   exactly one partner, and the text stays short enough for a card.
   ========================================================================== */

export const BACH_VECTORS_MEMORY_PAIRS = 6

export const bachVectorsMemoryLevels = ['dot', 'magnitude', 'perpendicular'] as const

interface Pair {
    question: string
    answer: string
}

const pairLatex = ([x, y]: [number, number]) => `(${x},${y})`

function dotPair(random: Random): Pair | null {
    const u: [number, number] = [randomInt(random, -4, 4), randomInt(random, -4, 4)]
    const v: [number, number] = [randomInt(random, -4, 4), randomInt(random, -4, 4)]
    if (u.includes(0) || v.includes(0)) return null
    // Two short rows so the card is wide enough
    return { question: `\\begin{gathered}${pairLatex(u)}\\\\ \\cdot\\,${pairLatex(v)}\\end{gathered}`, answer: String(u[0] * v[0] + u[1] * v[1]) }
}

const WHOLE: Array<[number, number]> = [[3, 4], [4, 3], [6, 8], [8, 6], [5, 12], [12, 5], [0, 7], [9, 0]]

function magnitudePair(random: Random): Pair | null {
    if (pick(random, [true, false])) {
        const [x, y] = pick(random, WHOLE)
        const p: [number, number] = [x * pick(random, [1, -1]), y * pick(random, [1, -1])]
        return { question: `|${pairLatex(p)}|`, answer: String(Math.sqrt(x * x + y * y)) }
    }
    const p: [number, number] = [randomInt(random, 1, 4), randomInt(random, 1, 4)]
    const square = p[0] * p[0] + p[1] * p[1]
    if (Number.isInteger(Math.sqrt(square))) return null
    return { question: `|${pairLatex(p)}|`, answer: `\\sqrt{${square}}` }
}

/** (k, a) ⟂ (c, d): k = −a·d / c, a whole number */
function perpendicularPair(random: Random): Pair | null {
    const c = pick(random, [-4, -3, -2, -1, 1, 2, 3, 4])
    const a = randomInt(random, -4, 4)
    const d = randomInt(random, -4, 4)
    if (a === 0 || d === 0 || (a * d) % c !== 0) return null
    const k = -(a * d) / c
    if (k === 0) return null
    return { question: `\\begin{gathered}(k,${a})\\\\ \\perp(${c},${d})\\end{gathered}`, answer: `k=${k}` }
}

/** Six pairs with different answers, so every card has exactly one partner */
export function createBachVectorsMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = bachVectorsMemoryLevels[levelIndex] ?? 'dot'
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < BACH_VECTORS_MEMORY_PAIRS && attempt < 3000; attempt += 1) {
        const pair = level === 'dot' ? dotPair(random) : level === 'magnitude' ? magnitudePair(random) : perpendicularPair(random)
        if (!pair || pairs.some((other) => other.question === pair.question || other.answer === pair.answer)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` }
    ]))
}
