import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { Stars } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Ruffiniren lasterketa (La carrera de Ruffini, 3. DBH): a division by
   x − a is set out in Ruffini's table, and the learner fills the bottom
   row one box at a time, choosing each number among three: the right one,
   the one that subtracts instead of adding, and the one that multiplies by
   −a (the sign of x + a read wrongly). A table is right only if every box
   is. Level 1: degree 2 and x − a; level 2: degree 3 and x + a; level 3:
   missing terms (zeros) and larger numbers. Pure logic.
   ========================================================================== */

export const RUFFINI_ROUNDS = 6

export interface RuffiniRound {
    coefficients: number[]
    a: number
    /** The right bottom row */
    bottom: number[]
    /** For every box after the first, three numbers to choose from */
    choices: number[][]
}

export function bottomRow(coefficients: number[], a: number): number[] {
    const row: number[] = []
    coefficients.forEach((coefficient, index) => row.push(index === 0 ? coefficient : coefficient + row[index - 1] * a))
    return row
}

function round(random: Random, level: number): RuffiniRound | null {
    const degree = level === 0 ? 2 : 3
    const a = level === 0 ? randomInt(random, 1, 4) : level === 1 ? -randomInt(random, 1, 4) : pick(random, [-3, -2, 2, 3])
    const coefficients = Array.from({ length: degree + 1 }, (_, index) => (index === 0 ? randomInt(random, 1, 3) : randomInt(random, -6, 6)))
    if (level === 2) coefficients[randomInt(random, 1, degree - 1)] = 0
    const bottom = bottomRow(coefficients, a)
    if (bottom.some((value) => Math.abs(value) > 99)) return null
    const choices: number[][] = []
    for (let index = 1; index < coefficients.length; index += 1) {
        const right = bottom[index]
        const options = new Set([right, coefficients[index] - bottom[index - 1] * a, coefficients[index] - bottom[index - 1] * -a, right + a, right - 1])
        const list = [right, ...[...options].filter((value) => value !== right).slice(0, 2)]
        if (list.length < 3) return null
        choices.push(shuffle(random, list))
    }
    return { coefficients, a, bottom, choices }
}

export function createRuffiniRounds(random: Random, level: number): RuffiniRound[] {
    const rounds: RuffiniRound[] = []
    while (rounds.length < RUFFINI_ROUNDS) {
        const next = round(random, level)
        if (next) rounds.push(next)
    }
    return rounds
}

export function ruffiniStars(score: number): Stars {
    if (score >= 6) return 3
    if (score >= 5) return 2
    if (score >= 3) return 1
    return 0
}
