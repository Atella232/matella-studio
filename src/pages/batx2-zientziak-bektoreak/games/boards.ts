import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { cross, dot, type Vec3 } from '../space/vec3.ts'

/* ==========================================================================
   Espazioko bektoreak (Batxilergoa 2 · Zientziak) memory: a dot product in
   space and its value, a vector and its magnitude, and a cross product
   and the vector it gives. Every card has exactly one partner, and the
   text stays short enough for a card.
   ========================================================================== */

export const SPACE_MEMORY_PAIRS = 6

export const spaceMemoryLevels = ['dot', 'magnitude', 'cross'] as const

interface Pair {
    question: string
    answer: string
}

const vec = (a: Vec3) => `(${a.map((value) => value + 0).join(',')})`
const small = (random: Random, limit: number): Vec3 => [randomInt(random, -limit, limit), randomInt(random, -limit, limit), randomInt(random, -limit, limit)]

function dotPair(random: Random): Pair | null {
    const u = small(random, 3)
    const v = small(random, 3)
    if (u.filter((value) => value === 0).length > 1 || v.filter((value) => value === 0).length > 1) return null
    // Two short rows so the card is wide enough
    return { question: `\\begin{gathered}${vec(u)}\\\\ \\cdot\\,${vec(v)}\\end{gathered}`, answer: String(dot(u, v) + 0) }
}

const WHOLE: Vec3[] = [[1, 2, 2], [2, 3, 6], [1, 4, 8], [4, 4, 7], [2, 4, 4], [0, 3, 4], [2, 6, 9], [3, 4, 12], [2, 2, 1], [6, 6, 7]]

function magnitudePair(random: Random): Pair | null {
    if (pick(random, [true, true, false])) {
        const [x, y, z] = pick(random, WHOLE)
        const p: Vec3 = [x * pick(random, [1, -1]), y * pick(random, [1, -1]), z * pick(random, [1, -1])]
        return { question: `|${vec(p)}|`, answer: String(Math.sqrt(x * x + y * y + z * z)) }
    }
    const p: Vec3 = [randomInt(random, 1, 3), randomInt(random, 0, 3), randomInt(random, 1, 3)]
    const square = dot(p, p)
    if (Number.isInteger(Math.sqrt(square))) return null
    return { question: `|${vec(p)}|`, answer: `\\sqrt{${square}}` }
}

function crossPair(random: Random): Pair | null {
    const u = small(random, 2)
    const v = small(random, 2)
    const n = cross(u, v)
    if (n.every((value) => value === 0)) return null
    return { question: `\\begin{gathered}${vec(u)}\\\\ \\times\\,${vec(v)}\\end{gathered}`, answer: vec(n) }
}

/** Six pairs with different answers, so every card has exactly one partner */
export function createSpaceMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = spaceMemoryLevels[levelIndex] ?? 'dot'
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < SPACE_MEMORY_PAIRS && attempt < 3000; attempt += 1) {
        const pair = level === 'dot' ? dotPair(random) : level === 'magnitude' ? magnitudePair(random) : crossPair(random)
        if (!pair || pairs.some((other) => other.question === pair.question || other.answer === pair.answer)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` }
    ]))
}
