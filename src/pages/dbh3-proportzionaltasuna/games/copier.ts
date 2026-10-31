import { pick, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { Stars } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Fotokopiagailua (La fotocopiadora, 3. DBH): a photo has to come out at an
   exact size, and the machine only enlarges or reduces by a few fixed
   percentages. Each press multiplies the size by its index (+25 % is
   × 1,25, −20 % is × 0,8), so two presses multiply their indices: +25 %
   and −20 % bring the photo back to where it was, and +20 % then −20 %
   do not. The learner has a fixed number of presses; any order that lands
   on the size is right. Sizes are kept in hundredths of a centimetre so
   that every product stays exact. Pure logic, no React.
   ========================================================================== */

export const COPIER_ROUNDS = 6

/** The buttons of each level, as percentages */
export const COPIER_BUTTONS: number[][] = [
    [10, 20, 25, 50],
    [20, 25, 50, -20, -25, -50],
    [10, 20, 25, 50, -10, -20, -25, -50]
]
/** Presses per round in each level */
export const COPIER_PRESSES = [2, 2, 3] as const

export interface CopierRound {
    /** Starting size, in hundredths of a cm */
    start: number
    /** The size to reach, in hundredths of a cm */
    target: number
    presses: number
    /** One sequence that reaches the target */
    solution: number[]
}

/** Size after pressing `percent`, in hundredths of a cm (null if it is not exact) */
export function press(size: number, percent: number): number | null {
    const next = (size * (100 + percent)) / 100
    return Number.isInteger(next) ? next : null
}

export function sizeAfter(start: number, sequence: number[]): number | null {
    let size: number | null = start
    for (const percent of sequence) {
        if (size === null) return null
        size = press(size, percent)
    }
    return size
}

/** Every size reachable with exactly `presses` presses of the level's buttons */
export function reachable(start: number, level: number, presses: number): Set<number> {
    let sizes = new Set([start])
    for (let step = 0; step < presses; step += 1) {
        const next = new Set<number>()
        for (const size of sizes) for (const percent of COPIER_BUTTONS[level]) {
            const after = press(size, percent)
            if (after !== null) next.add(after)
        }
        sizes = next
    }
    return sizes
}

const STARTS = [1600, 2000, 2400, 3200, 4000, 4800, 6000, 8000]

export function createCopierRound(random: Random, level: number): CopierRound {
    const buttons = COPIER_BUTTONS[level] ?? COPIER_BUTTONS[0]
    const presses = COPIER_PRESSES[level] ?? 2
    for (;;) {
        const start = pick(random, STARTS)
        const solution = Array.from({ length: presses }, () => pick(random, buttons))
        const target = sizeAfter(start, solution)
        // Never the size it started with, and always a size written with at most one decimal
        if (target === null || target === start || target % 10 !== 0) continue
        return { start, target, presses, solution }
    }
}

export function createCopierRounds(random: Random, level: number): CopierRound[] {
    const rounds: CopierRound[] = []
    while (rounds.length < COPIER_ROUNDS) {
        const round = createCopierRound(random, level)
        if (rounds.some((other) => other.start === round.start && other.target === round.target)) continue
        rounds.push(round)
    }
    return shuffle(random, rounds)
}

/** The index of a press as a decimal: +25 → 1,25 */
export const indexOf = (percent: number) => (100 + percent) / 100

export function copierStars(score: number): Stars {
    if (score >= 6) return 3
    if (score >= 5) return 2
    if (score >= 3) return 1
    return 0
}
