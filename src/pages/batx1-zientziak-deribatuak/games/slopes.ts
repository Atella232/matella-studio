import { pick, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { curveSlope, curveValue, flatPoints, randomCurve, visiblePoints, type Curve } from './curves.ts'

/* ==========================================================================
   J1 · ¿Qué pendiente? (Batxilergoa 1 · Zientziak, Deribatuak): a graph
   and three points A, B and C. Level 1 asks where f′ is 0, positive or
   negative (one point of each); level 2, where the slope is greatest or
   smallest (three clearly different slopes); level 3 draws a line and asks
   where the tangent is parallel to it. After the answer the three
   tangents come in with their slopes.
   ========================================================================== */

export const SLOPE_ROUNDS = 6

export type SlopeQuestion = 'zero' | 'positive' | 'negative' | 'greatest' | 'smallest' | 'parallel'

export interface SlopeRound {
    curve: Curve
    /** The three points, left to right: A, B, C */
    xs: number[]
    question: SlopeQuestion
    /** The index of the right point */
    answer: number
    /** The line of level 3, y = m·x + n */
    line: [number, number] | null
}

const POINT_NAMES = ['A', 'B', 'C'] as const
export const pointName = (index: number) => POINT_NAMES[index]

/** Three points left to right and the index of the one that was chosen */
function ordered(xs: number[], chosen: number): { xs: number[]; answer: number } {
    const sorted = [...xs].sort((p, q) => p - q)
    return { xs: sorted, answer: sorted.indexOf(chosen) }
}

/** Level 1: one point with f′ = 0, one with f′ > 0 and one with f′ < 0 (both clearly so) */
function signRound(random: Random): SlopeRound | null {
    const curve = randomCurve(random)
    const points = visiblePoints(curve)
    const flat = points.filter((x) => flatPoints(curve).includes(x))
    const up = points.filter((x) => curveSlope(curve, x) >= 0.75)
    const down = points.filter((x) => curveSlope(curve, x) <= -0.75)
    if (!flat.length || !up.length || !down.length) return null
    const chosen = { zero: pick(random, flat), positive: pick(random, up), negative: pick(random, down) }
    const question = pick(random, ['zero', 'positive', 'negative'] as const)
    const { xs, answer } = ordered([chosen.zero, chosen.positive, chosen.negative], chosen[question])
    if (xs[1] - xs[0] < 1 || xs[2] - xs[1] < 1) return null
    return { curve, xs, question, answer, line: null }
}

/** Level 2: three slopes at least 1 apart; the greatest or the smallest */
function compareRound(random: Random): SlopeRound | null {
    const curve = randomCurve(random)
    const points = shuffle(random, visiblePoints(curve))
    const xs: number[] = []
    for (const x of points) {
        if (xs.length === 3) break
        if (xs.some((other) => Math.abs(curveSlope(curve, other) - curveSlope(curve, x)) < 1 || Math.abs(other - x) < 1)) continue
        xs.push(x)
    }
    if (xs.length < 3) return null
    const question = pick(random, ['greatest', 'smallest'] as const)
    const slopes = xs.map((x) => curveSlope(curve, x))
    const target = question === 'greatest' ? Math.max(...slopes) : Math.min(...slopes)
    const { xs: sorted, answer } = ordered(xs, xs[slopes.indexOf(target)])
    return { curve, xs: sorted, question, answer, line: null }
}

/** Level 3: a line with a whole slope m; one point has f′ = m, the other two are at least 1 away from it */
function parallelRound(random: Random): SlopeRound | null {
    const curve = randomCurve(random)
    const points = visiblePoints(curve).filter((x) => Number.isInteger(curveSlope(curve, x)) && curveSlope(curve, x) !== 0)
    if (!points.length) return null
    const chosen = pick(random, points)
    const m = curveSlope(curve, chosen)
    const others = shuffle(random, visiblePoints(curve).filter((x) => Math.abs(curveSlope(curve, x) - m) >= 1 && Math.abs(x - chosen) >= 1))
    const picked: number[] = []
    for (const x of others) {
        if (picked.length === 2) break
        if (picked.some((other) => Math.abs(other - x) < 1)) continue
        picked.push(x)
    }
    if (picked.length < 2) return null
    const { xs, answer } = ordered([chosen, ...picked], chosen)
    // The line keeps away from the three points, so that it does not look like the tangent at one of them
    const n = shuffle(random, [-3, -2, -1, 0, 1, 2, 3]).find((value) => xs.every((x) => Math.abs(curveValue(curve, x) - (m * x + value)) >= 1.5))
    if (n === undefined) return null
    return { curve, xs, question: 'parallel', answer, line: [m, n] }
}

export function createSlopeRounds(random: Random, levelIndex: number): SlopeRound[] {
    const make = [signRound, compareRound, parallelRound][levelIndex] ?? signRound
    const rounds: SlopeRound[] = []
    for (let attempt = 0; rounds.length < SLOPE_ROUNDS && attempt < 4000; attempt += 1) {
        const round = make(random)
        if (!round) continue
        const key = JSON.stringify(round)
        if (rounds.some((other) => JSON.stringify(other) === key)) continue
        rounds.push(round)
    }
    return rounds
}
