import type { Stars } from '../../../features/unit-v2/games/records.ts'
import { pick, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J3 · Estaltzen al dute? (¿Cubren el plano?): regular polygons round a
   vertex. Level 1: does one kind of regular polygon tile on its own (its
   interior angle divides 360°)? Level 2: how many fit round a vertex?
   Level 3: a mixture of polygons (octagon + octagon + square, hexagon +
   square + dodecagon…): do the angles add up to exactly 360°?
   ========================================================================== */

export const TILE_ROUNDS = 8

export const interiorAngle = (sides: number) => 180 - 360 / sides

export type TileRound =
    | { kind: 'single'; sides: number; answer: boolean }
    | { kind: 'count'; sides: number; answer: number; options: number[] }
    | { kind: 'mixture'; polygons: number[]; answer: boolean }

const MIXTURES: number[][] = [
    [8, 8, 4], [6, 4, 12], [3, 3, 3, 4, 4], [5, 5, 10], [3, 12, 12], [4, 4, 4, 4], [3, 3, 6, 6], [3, 4, 4, 6],
    [5, 5, 5], [8, 8, 8], [6, 6, 4], [3, 3, 3, 3, 4], [5, 6, 6], [4, 8, 6], [3, 3, 3, 6], [10, 10, 4]
]

export const mixtureSum = (polygons: number[]) => polygons.reduce((sum, sides) => sum + interiorAngle(sides), 0)

export function createTileRounds(random: Random, level: number): TileRound[] {
    if (level === 0) {
        const sides = shuffle(random, [3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 18, 20]).slice(0, TILE_ROUNDS)
        // At least two that tile and two that do not
        if (sides.filter((n) => 360 % interiorAngle(n) === 0).length < 2) return createTileRounds(random, level)
        return sides.map((n) => ({ kind: 'single', sides: n, answer: Number.isInteger(360 / interiorAngle(n)) }))
    }
    if (level === 1) {
        const pool = [3, 4, 6]
        return Array.from({ length: TILE_ROUNDS }, () => {
            const sides = pick(random, pool)
            const answer = 360 / interiorAngle(sides)
            return { kind: 'count', sides, answer, options: [3, 4, 5, 6] }
        })
    }
    return shuffle(random, MIXTURES).slice(0, TILE_ROUNDS).map((polygons) => ({ kind: 'mixture', polygons, answer: Math.abs(mixtureSum(polygons) - 360) < 1e-9 }))
}

export function tileStars(score: number): Stars {
    if (score >= 8) return 3
    if (score >= 6) return 2
    if (score >= 4) return 1
    return 0
}
