import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { add, scale, type Vec3 } from '../../batx2-zientziak-bektoreak/space/vec3.ts'
import { linearLatex } from '../lab/common.ts'
import { continuousLatex } from '../lab/parameterT.ts'

/* ==========================================================================
   Zuzenak eta planoak espazioan (Batxilergoa 2 · Zientziak) memory: a
   plane and its normal, a continuous equation and its direction, and a
   point of a line for a value of t and the point it gives. Every card
   has exactly one partner, and the text stays short enough for a card.
   ========================================================================== */

export const PLANES_MEMORY_PAIRS = 6

export const planesMemoryLevels = ['normal', 'direction', 'point'] as const

interface Pair {
    question: string
    answer: string
}

const vec = (a: Vec3) => `(${a.map((value) => value + 0).join(',')})`
const small = (random: Random, limit: number): Vec3 => [randomInt(random, -limit, limit), randomInt(random, -limit, limit), randomInt(random, -limit, limit)]

function normalPair(random: Random): Pair | null {
    const n = small(random, 3)
    if (n[2] === 0 || (n[0] === 0 && n[1] === 0)) return null
    // Two rows so the card stays narrow: the x and y terms, then the z term and d
    const z = linearLatex([0, 0, n[2]])
    return { question: `\\begin{gathered}${linearLatex([n[0], n[1], 0])}\\\\ ${z.startsWith('-') ? z : `+${z}`}=${randomInt(random, -4, 4)}\\end{gathered}`, answer: vec(n) }
}

function directionPair(random: Random): Pair | null {
    const a = small(random, 3)
    const u = small(random, 3)
    if (u.some((value) => value === 0)) return null
    // The continuous equation is too wide for a card: two rows of small fractions
    const [first, second, third] = continuousLatex(a, u).replace(/\\frac/g, '\\tfrac').split('=')
    return { question: `\\begin{gathered}${first}=${second}\\\\ =${third}\\end{gathered}`, answer: vec(u) }
}

function pointPair(random: Random): Pair | null {
    const a = small(random, 2)
    const u = small(random, 2)
    const t = [2, 3, -2][randomInt(random, 0, 2)]
    // At most one minus sign in u, so that the second row fits on the card
    if (u.filter((value) => value !== 0).length < 2 || u.filter((value) => value < 0).length > 1) return null
    // Two short rows, a little smaller, so the card stays narrow
    return { question: `\\footnotesize\\begin{gathered}${vec(a)}\\\\ ${t < 0 ? '-' : '+'}${Math.abs(t)}\\,${vec(u)}\\end{gathered}`, answer: vec(add(a, scale(t, u))) }
}

/** Six pairs with different answers, so every card has exactly one partner */
export function createPlanesMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = planesMemoryLevels[levelIndex] ?? 'normal'
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < PLANES_MEMORY_PAIRS && attempt < 3000; attempt += 1) {
        const pair = level === 'normal' ? normalPair(random) : level === 'direction' ? directionPair(random) : pointPair(random)
        if (!pair || pairs.some((other) => other.question === pair.question || other.answer === pair.answer)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` }
    ]))
}
