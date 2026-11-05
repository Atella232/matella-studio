import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   Triangeluen ebazpena (Batxilergoa 1 · Zientziak) memory: an angle of
   several turns (or a negative one) and the same angle between 0° and
   360°; two sides and the angle between them (60° or 120°) and the third
   side (or a, 30° and 90° and the side b); and the three sides of a triangle, or two sides and 30° or 150°,
   and its area. Cards carry values only, never the names of the ratios,
   so they read the same in every language. Every card has exactly one
   partner, and the text stays short enough for a phone card.
   ========================================================================== */

export const TRIANGLES_MEMORY_PAIRS = 6

export const trianglesMemoryLevels = ['turns', 'sides', 'areas'] as const

interface Pair {
    question: string
    answer: string
}

const lines = (...rows: string[]) => `\\begin{array}{c}${rows.join('\\\\')}\\end{array}`

function turnsPair(random: Random): Pair {
    const rest = randomInt(random, 1, 35) * 10
    if (pick(random, [true, false])) {
        const turns = randomInt(random, 1, 3)
        return { question: `${turns * 360 + rest}^{\\circ}`, answer: `${rest}^{\\circ}` }
    }
    return { question: `-${360 - rest}^{\\circ}`, answer: `${rest}^{\\circ}` }
}

// b² + c² ∓ bc that are squares: 60° and 120°
const SIXTY: Array<[number, number, number]> = [[3, 8, 7], [5, 8, 7], [8, 15, 13], [7, 15, 13], [5, 21, 19], [16, 21, 19]]
const ONE_TWENTY: Array<[number, number, number]> = [[3, 5, 7], [7, 8, 13], [6, 10, 14], [5, 16, 19], [9, 15, 21]]

function sidesPair(random: Random): Pair {
    // The sine rule with 30° and 90°: b is twice a
    if (pick(random, [true, false])) {
        const a = randomInt(random, 2, 9)
        return { question: lines(`a{=}${a},\\ A{=}30^{\\circ}`, `B{=}90^{\\circ}`), answer: `b{=}${2 * a}` }
    }
    const obtuse = pick(random, [false, true])
    const [b, c, a] = pick(random, obtuse ? ONE_TWENTY : SIXTY)
    return { question: lines(`b{=}${b},\\ c{=}${c}`, `A{=}${obtuse ? 120 : 60}^{\\circ}`), answer: `a{=}${a}` }
}

const HERON: Array<[number, number, number, number]> = [[5, 12, 13, 30], [6, 8, 10, 24], [13, 14, 15, 84], [9, 10, 17, 36], [7, 15, 20, 42], [10, 13, 13, 60], [5, 5, 6, 12]]

function areaPair(random: Random): Pair | null {
    if (pick(random, [true, false])) {
        const [x, y, z, area] = pick(random, HERON)
        return { question: lines(`${x},\\ ${y},\\ ${z}`), answer: `S{=}${area}` }
    }
    const b = randomInt(random, 2, 12)
    const c = randomInt(random, 2, 12)
    if ((b * c) % 4 !== 0) return null
    return { question: lines(`b{=}${b},\\ c{=}${c}`, `A{=}${pick(random, [30, 150])}^{\\circ}`), answer: `S{=}${(b * c) / 4}` }
}

/** Six pairs with different questions and answers, so every card has exactly one partner */
export function createTrianglesMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = trianglesMemoryLevels[levelIndex] ?? 'turns'
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < TRIANGLES_MEMORY_PAIRS && attempt < 3000; attempt += 1) {
        const pair = level === 'turns' ? turnsPair(random) : level === 'sides' ? sidesPair(random) : areaPair(random)
        if (!pair || pairs.some((other) => other.question === pair.question || other.answer === pair.answer)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` }
    ]))
}
