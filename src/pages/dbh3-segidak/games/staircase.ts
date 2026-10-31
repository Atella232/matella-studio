import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { Stars } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Gaussen eskailera (La escalera de Gauss, 3. DBH): a staircase of blocks,
   one row per step, each row d blocks longer than the one above it. The
   chest holds a fixed number of blocks, and the learner chooses how many
   rows to build so that not a single block is left over. Each round has
   exactly one right number of rows: Sₙ = (a₁ + aₙ)·n / 2 grows with n.
   Level 1: 1, 2, 3, … (d = 1, a₁ = 1). Level 2: other a₁, d = 1 or 2.
   Level 3: larger a₁ and d. Pure logic, no React.
   ========================================================================== */

export const STAIRCASE_ROUNDS = 6
export const STAIRCASE_ROWS_MAX = 16

export interface StaircaseRound {
    a1: number
    d: number
    total: number
    rows: number
}

export const staircaseSum = (a1: number, d: number, rows: number) => ((2 * a1 + (rows - 1) * d) * rows) / 2

function round(random: Random, level: number): StaircaseRound {
    const a1 = level === 0 ? 1 : level === 1 ? randomInt(random, 2, 5) : randomInt(random, 3, 9)
    const d = level === 0 ? 1 : level === 1 ? pick(random, [1, 2]) : pick(random, [2, 3, 4])
    const rows = randomInt(random, level === 0 ? 4 : 3, level === 2 ? 10 : 14)
    return { a1, d, total: staircaseSum(a1, d, rows), rows }
}

export function createStaircaseRounds(random: Random, level: number): StaircaseRound[] {
    const rounds: StaircaseRound[] = []
    while (rounds.length < STAIRCASE_ROUNDS) {
        const next = round(random, level)
        if (rounds.some((other) => other.total === next.total)) continue
        rounds.push(next)
    }
    return shuffle(random, rounds)
}

export function staircaseStars(score: number): Stars {
    if (score >= 6) return 3
    if (score >= 5) return 2
    if (score >= 3) return 1
    return 0
}
