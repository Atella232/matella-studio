import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { Stars } from '../../../features/unit-v2/games/records.ts'
import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'

/* ==========================================================================
   Geometria (1. DBH) games besides the race:
   - Angelu-begia: an angle is drawn; estimate it in degrees.
   - Memoria: a figure's data and its area, an angle and its complementary
     or supplementary, two legs and their hypotenuse.
   ========================================================================== */

/* ---------- Angle estimation ---------- */

export const ANGLE_ROUNDS = 10

export interface AngleLevel {
    max: number
    step: number
}

export const angleLevels: AngleLevel[] = [
    { max: 180, step: 10 },
    { max: 180, step: 5 },
    { max: 360, step: 5 }
]

export function createAngleRound(random: Random, levelIndex: number): number[] {
    const { max, step } = angleLevels[levelIndex]
    const values: number[] = []
    while (values.length < ANGLE_ROUNDS) {
        const value = randomInt(random, 1, max / step - 1) * step
        if (!values.includes(value)) values.push(value)
    }
    return values
}

/** Points for one estimate: 3 within 5°, 2 within 15°, 1 within 30° */
export function anglePoints(guess: number, value: number): number {
    const error = Math.abs(guess - value)
    if (error <= 5) return 3
    if (error <= 15) return 2
    if (error <= 30) return 1
    return 0
}

export function angleStars(total: number): Stars {
    if (total >= 24) return 3
    if (total >= 16) return 2
    return 1
}

/* ---------- Memory ---------- */

export const GEOMETRY_MEMORY_PAIRS = 6

export const geometryMemoryLevels = ['angles', 'areas', 'pythagoras'] as const

const triples: Array<[number, number, number]> = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17], [12, 16, 20], [7, 24, 25], [15, 20, 25], [20, 21, 29], [10, 24, 26]]

function anglePair(random: Random): [string, string] {
    if (random() < 0.5) {
        const angle = randomInt(random, 1, 17) * 5
        return [`90^{\\circ}-${angle}^{\\circ}`, `${90 - angle}^{\\circ}`]
    }
    const angle = randomInt(random, 1, 35) * 5
    return [`180^{\\circ}-${angle}^{\\circ}`, `${180 - angle}^{\\circ}`]
}

function areaPair(random: Random): [string, string] {
    const b = randomInt(random, 2, 12)
    const h = randomInt(random, 2, 10)
    const kind = pick(random, ['rectangle', 'triangle', 'square'] as const)
    if (kind === 'square') return [`A_{\\square}=${b}^{2}`, String(b * b)]
    if (kind === 'triangle') return (b * h) % 2 === 0 ? [`A_{\\triangle}=\\frac{${b}\\cdot ${h}}{2}`, String((b * h) / 2)] : [`A=${b}\\cdot ${h}`, String(b * h)]
    return [`A=${b}\\cdot ${h}`, String(b * h)]
}

function pythagorasPair(random: Random): [string, string] {
    const [a, b, c] = pick(random, triples)
    return [`\\sqrt{${a}^{2}+${b}^{2}}`, String(c)]
}

const makers = { angles: anglePair, areas: areaPair, pythagoras: pythagorasPair }

/** Six pairs with different results, so every card has exactly one partner */
export function createGeometryMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const make = makers[geometryMemoryLevels[levelIndex]]
    const pairs: Array<[string, string]> = []
    for (let attempt = 0; pairs.length < GEOMETRY_MEMORY_PAIRS && attempt < 500; attempt += 1) {
        const pair = make(random)
        if (pairs.some(([question, answer]) => answer === pair[1] || question === pair[0])) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap(([question, answer], setId) => [
        { id: `${setId}-q`, setId, latex: question, shows: answer },
        { id: `${setId}-a`, setId, latex: answer, shows: answer }
    ]))
}
