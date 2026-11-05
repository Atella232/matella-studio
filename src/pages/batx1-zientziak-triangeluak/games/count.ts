import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { compassAngles, compassHeight, compassSine, triangleCount } from '../lab/compass.ts'

/* ==========================================================================
   J1 · Zenbat triangelu? (¿Cuántos triángulos?): two sides a and b and the
   angle A opposite a. The learner says whether they give no triangle, one
   or two; then the compass of side a is drawn from C with its cuts, and
   sen B with the angles. Level 1: an acute A with the height drawn and its
   value, and a far from the height and from b; level 2: obtuse angles,
   a = b and the compass that just touches; level 3: no drawing until the
   answer, and a close to the height, so sen B has to be worked out. The
   geometry is the laboratory's (lab/compass.ts).
   ========================================================================== */

export const COUNT_ROUNDS = 6

export type TriangleCount = 0 | 1 | 2

export interface CountRound {
    A: number
    b: number
    a: number
    count: TriangleCount
    /** Whether the drawing (without the compass) is shown before answering, and with the height's value */
    drawing: 'height' | 'plain' | 'none'
}

const round = (A: number, b: number, a: number, drawing: CountRound['drawing']): CountRound => ({ A, b, a, count: triangleCount({ A, b, a }) as TriangleCount, drawing })

/** An acute A and a opening chosen for the count, far from the borders (level 1) or close to the height (level 3) */
function acuteRound(random: Random, count: TriangleCount, close: boolean): CountRound | null {
    const A = pick(random, [30, 35, 40, 45, 50, 55, 60])
    const b = randomInt(random, 6, 10)
    const h = compassHeight({ A, b })
    if (Math.abs(h - Math.round(h)) < 1e-9) return null
    const candidates = Array.from({ length: 14 }, (_, index) => index + 1).filter((a) => {
        if (triangleCount({ A, b, a }) !== count) return false
        if (close) return count === 1 ? a === b : Math.abs(a - h) < 0.7
        return count === 1 ? a >= b + 1 : Math.abs(a - h) >= 0.8 && Math.abs(a - b) >= 1
    })
    return candidates.length ? round(A, b, pick(random, candidates), close ? 'none' : 'height') : null
}

/** Level 2: an obtuse A (none or one), a = b (one, isosceles), the compass that just touches (one, right-angled), or two */
function borderRound(random: Random, kind: number): CountRound | null {
    if (kind === 0 || kind === 1) {
        const A = pick(random, [100, 110, 120, 130, 140])
        const b = randomInt(random, 4, 8)
        const a = kind === 0 ? randomInt(random, 2, b - 1) : randomInt(random, b + 1, b + 4)
        return round(A, b, a, 'plain')
    }
    if (kind === 2) {
        const A = pick(random, [35, 45, 55, 65])
        const b = randomInt(random, 5, 9)
        return round(A, b, b, 'plain')
    }
    if (kind === 3) {
        const b = pick(random, [6, 8, 10, 12])
        return round(30, b, b / 2, 'plain')
    }
    const made = acuteRound(random, 2, false)
    return made && { ...made, drawing: 'plain' }
}

/** Six different rounds of one level, with each count at least once */
export function createCountRounds(random: Random, levelIndex: number): CountRound[] {
    for (;;) {
        const rounds: CountRound[] = []
        const plan = levelIndex === 1 ? shuffle(random, [0, 1, 2, 3, 4, pick(random, [0, 1, 4])]) : shuffle(random, [0, 0, 1, 1, 2, 2])
        for (const step of plan) {
            for (let attempt = 0; attempt < 200; attempt += 1) {
                const made = levelIndex === 1 ? borderRound(random, step) : acuteRound(random, step as TriangleCount, levelIndex === 2)
                if (made && !rounds.some((other) => other.A === made.A && other.b === made.b && other.a === made.a)) {
                    rounds.push(made)
                    break
                }
            }
        }
        if (rounds.length === COUNT_ROUNDS && new Set(rounds.map((item) => item.count)).size === 3) return rounds
    }
}

/** sen B and the angles B of the triangles, as the explanation shows them */
export function countWorking(round: CountRound) {
    return { sine: compassSine(round), height: compassHeight(round), angles: compassAngles(round) }
}

export const isCountChoice = (round: CountRound, choice: TriangleCount) => round.count === choice
