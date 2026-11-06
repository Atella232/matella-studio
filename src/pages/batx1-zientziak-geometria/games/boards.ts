import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { fraction, toLatex } from '../../../features/unit-v2/math/fraction.ts'
import { generalLatex } from './lines.ts'

/* ==========================================================================
   Geometria analitikoa (Batxilergoa 1 · Zientziak) memory: a line in
   general form and its slope, a segment and its midpoint, and a point and
   a line with the distance between them. Every card has exactly one
   partner, and the text stays short enough for a card.
   ========================================================================== */

export const BACH_GEOMETRY_MEMORY_PAIRS = 6

export const bachGeometryMemoryLevels = ['slope', 'midpoint', 'distance'] as const

interface Pair {
    question: string
    answer: string
}

const point = (name: string, [x, y]: [number, number]) => `${name}(${x},${y})`

/** Ax + By + C = 0 and its slope −A/B */
function slopePair(random: Random): Pair | null {
    const A = randomInt(random, 1, 4)
    const B = pick(random, [-4, -3, -2, -1, 1, 2, 3, 4])
    const C = randomInt(random, -6, 6)
    return { question: generalLatex({ A, B, C }), answer: `m=${toLatex(fraction(-A, B))}` }
}

/** A segment with a whole midpoint */
function midpointPair(random: Random): Pair | null {
    const a: [number, number] = [randomInt(random, -5, 5), randomInt(random, -5, 5)]
    const b: [number, number] = [randomInt(random, -5, 5), randomInt(random, -5, 5)]
    if ((a[0] + b[0]) % 2 !== 0 || (a[1] + b[1]) % 2 !== 0 || (a[0] === b[0] && a[1] === b[1])) return null
    // Two short rows so the card is wide enough
    return { question: `\\begin{gathered}${point('A', a)}\\\\ ${point('B', b)}\\end{gathered}`, answer: point('M', [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]) }
}

const NORMALS: Array<[number, number, number]> = [[3, 4, 5], [4, 3, 5], [3, -4, 5], [4, -3, 5]]

/** A point, a line and a whole distance */
function distancePair(random: Random): Pair | null {
    const [A, B, length] = pick(random, NORMALS)
    const p: [number, number] = [randomInt(random, -3, 3), randomInt(random, -3, 3)]
    const d = randomInt(random, 1, 6)
    const C = pick(random, [1, -1]) * d * length - (A * p[0] + B * p[1])
    if (Math.abs(C) > 35) return null
    return { question: `\\begin{gathered}${point('P', p)}\\\\ ${generalLatex({ A, B, C })}\\end{gathered}`, answer: `d=${d}` }
}

/** Six pairs with different answers, so every card has exactly one partner */
export function createBachGeometryMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = bachGeometryMemoryLevels[levelIndex] ?? 'slope'
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < BACH_GEOMETRY_MEMORY_PAIRS && attempt < 3000; attempt += 1) {
        const pair = level === 'slope' ? slopePair(random) : level === 'midpoint' ? midpointPair(random) : distancePair(random)
        if (!pair || pairs.some((other) => other.question === pair.question || other.answer === pair.answer)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` }
    ]))
}
