import { lineValue, type Point } from '../functions.ts'
import type { PlaneBox } from '../planeMap.ts'
import { pick, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { Stars } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   J2 · Laserra (El láser): targets on the plane and a laser y = mx + n.
   The learner reads the slope and the intercept from the targets, sets m
   and n and fires: only then is the line drawn, and every target it
   passes through lights up. Level 1: y = mx through the origin, one
   target; level 2: y = mx + n, two targets; level 3: slopes in halves and
   constant functions, three targets.
   ========================================================================== */

export const LASER_ROUNDS = 5
export const LASER_BOX: PlaneBox = { xMin: -6, xMax: 6, yMin: -6, yMax: 6 }

export interface LaserRound {
    m: number
    n: number
    targets: Point[]
    /** Level 1 fixes n = 0 */
    fixedN: boolean
    /** The step of the slope: 1, or 0.5 in level 3 */
    step: number
}

const inBox = (y: number) => y >= LASER_BOX.yMin && y <= LASER_BOX.yMax

export function createLaserRound(random: Random, levelIndex: number): LaserRound {
    for (;;) {
        const step = levelIndex === 2 ? 0.5 : 1
        const slopes = levelIndex === 0 ? [-3, -2, -1, 1, 2, 3] : levelIndex === 1 ? [-3, -2, -1, 1, 2, 3] : [-1.5, -0.5, 0.5, 1.5, -2, 2, 0]
        const m = pick(random, slopes)
        const n = levelIndex === 0 ? 0 : pick(random, [-4, -3, -2, -1, 1, 2, 3, 4])
        const count = [1, 2, 3][levelIndex]
        // Whole points away from the axis cut, so that the targets are not the intercept itself
        const xs = shuffle(random, [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5]).filter((x) => Number.isInteger(lineValue(m, n, x)) && inBox(lineValue(m, n, x)))
        if (xs.length < count) continue
        const targets: Point[] = xs.slice(0, count).sort((a, b) => a - b).map((x) => [x, lineValue(m, n, x)])
        return { m, n, targets, fixedN: levelIndex === 0, step }
    }
}

export const createLaserRounds = (random: Random, levelIndex: number) => Array.from({ length: LASER_ROUNDS }, () => createLaserRound(random, levelIndex))

/** The targets the laser y = mx + n passes through */
export const targetsHit = (round: LaserRound, m: number, n: number) => round.targets.filter(([x, y]) => Math.abs(lineValue(m, n, x) - y) < 1e-9)
export const laserRight = (round: LaserRound, m: number, n: number) => targetsHit(round, m, n).length === round.targets.length

export function laserStars(score: number): Stars {
    if (score >= 5) return 3
    if (score >= 4) return 2
    if (score >= 3) return 1
    return 0
}
