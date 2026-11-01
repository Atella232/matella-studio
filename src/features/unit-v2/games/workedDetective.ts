import type { LocalizedText } from '../types.ts'
import { shuffle, type Random } from './random.ts'
import type { Stars } from './records.ts'

/* ==========================================================================
   The cases of the worked-solution detective (WorkedDetectiveGame.tsx):
   a problem, three lines with exactly one wrong, the mistake, the fix and
   the right value against the value reached.
   ========================================================================== */

export interface WorkedLine {
    label: LocalizedText
    latex: string
}

export interface WorkedCase<Error extends string> {
    problem: LocalizedText
    lines: WorkedLine[]
    wrong: number
    error: Error
    fix: string
    options: Error[]
    right: number
    reached: number
}

/** Out of twice the cases: 3 stars from all but one point, 2 from three quarters, 1 from half */
export function workedDetectiveStars(score: number, cases: number): Stars {
    const total = cases * 2
    if (score >= total - 1) return 3
    if (score >= Math.ceil(total * 0.75)) return 2
    if (score >= total / 2) return 1
    return 0
}

/** Builds the cases of one level: every mistake of the level in turn, shuffled, three options each */
export function createWorkedCases<Error extends string>(random: Random, pool: Error[], count: number, build: (random: Random, error: Error) => Omit<WorkedCase<Error>, 'options'> | null): WorkedCase<Error>[] {
    const order = shuffle(random, pool)
    const errors = shuffle(random, Array.from({ length: count }, (_, index) => order[index % order.length]))
    return errors.map((error) => {
        for (let attempt = 0; attempt < 500; attempt += 1) {
            const made = build(random, error)
            if (!made || Math.abs(made.right - made.reached) < 1e-9) continue
            const others = shuffle(random, pool.filter((item) => item !== error)).slice(0, 2)
            return { ...made, options: shuffle(random, [error, ...others]) }
        }
        throw new Error(`No detective case for ${error}`)
    })
}
