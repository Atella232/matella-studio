import { pick, randomInt, type Random } from '../../features/unit-v2/games/random.ts'
import type { PaintRound } from './equations.ts'
import { binomialLatex, fromRoots, polyLatex, valueAt, type Coefficients } from './polynomials.ts'

/* ==========================================================================
   Functions for the 4. DBH games.
   · Paint the domain: f(x) with a root or a denominator; it is the paint
     engine of the inequalities with the condition behind the formula
     (radicand ≥ 0, denominator ≠ 0 as (denominator)² > 0, both > 0).
   · The mean slope: a function and its graph; choose the interval [a, b]
     whose rate of change is the target.
   ========================================================================== */

export interface DomainRound extends PaintRound {
    /** f(x) as LaTeX */
    display: string
}

const nonzero = (min: number, max: number) => Array.from({ length: max - min + 1 }, (_, index) => index + min).filter((value) => value !== 0)

export const DOMAIN_ROUNDS = 5

export function createDomainRound(random: Random, levelIndex: number): DomainRound {
    const a = randomInt(random, -5, 5)
    if (levelIndex === 0) {
        const kind = pick(random, ['sqrt', 'sqrt-minus', 'fraction', 'polynomial'] as const)
        if (kind === 'sqrt') return { display: `\\sqrt{${binomialLatex(a)}}`, coefficients: [1, -a], relation: '>=', roots: [a], hidden: false }
        if (kind === 'sqrt-minus') return { display: `\\sqrt{${a}-x}`.replace('{0-x}', '{-x}'), coefficients: [-1, a], relation: '>=', roots: [a], hidden: false }
        if (kind === 'fraction') return { display: `\\frac{${randomInt(random, 1, 9)}}{${binomialLatex(a)}}`, coefficients: fromRoots(1, [a, a]), relation: '>', roots: [a], hidden: false }
        return { display: polyLatex([1, randomInt(random, -4, 4), randomInt(random, -9, 9)]), coefficients: [1, 0, 1], relation: '>', roots: [], hidden: false }
    }
    const r1 = randomInt(random, -6, 2)
    const r2 = randomInt(random, r1 + 1, 7)
    const quadratic = fromRoots(1, [r1, r2])
    if (levelIndex === 1) {
        const kind = pick(random, ['sqrt', 'fraction'] as const)
        if (kind === 'sqrt') return { display: `\\sqrt{${polyLatex(quadratic)}}`, coefficients: quadratic, relation: '>=', roots: [r1, r2], hidden: true }
        return { display: `\\frac{x}{${polyLatex(quadratic)}}`, coefficients: fromRoots(1, [r1, r1, r2, r2]), relation: '>', roots: [r1, r2], hidden: true }
    }
    // Level 3: a root in the denominator, or the radicand opening downwards
    const kind = pick(random, ['root-below', 'downwards'] as const)
    if (kind === 'root-below') return { display: `\\frac{1}{\\sqrt{${polyLatex(quadratic)}}}`, coefficients: quadratic, relation: '>', roots: [r1, r2], hidden: true }
    const downwards = fromRoots(-1, [r1, r2])
    return { display: `\\sqrt{${polyLatex(downwards)}}`, coefficients: downwards, relation: '>=', roots: [r1, r2], hidden: true }
}

export const createDomainRounds = (random: Random, levelIndex: number) => Array.from({ length: DOMAIN_ROUNDS }, () => createDomainRound(random, levelIndex))

/* ---------- The mean slope ---------- */

export const SLOPE_ROUNDS = 5
export const SLOPE_MIN = -4
export const SLOPE_MAX = 4

export interface SlopeRound {
    /** f(x) = ax² + bx + c */
    coefficients: Coefficients
    target: number
}

/** The mean rate of change of f on [a, b] */
export const meanRate = (coefficients: Coefficients, a: number, b: number) => (valueAt(coefficients, b) - valueAt(coefficients, a)) / (b - a)

/** Every interval [a, b] with whole ends inside the steppers whose rate is the target */
export function rightIntervals(round: SlopeRound): Array<[number, number]> {
    const found: Array<[number, number]> = []
    for (let a = SLOPE_MIN; a <= SLOPE_MAX; a += 1) for (let b = a + 1; b <= SLOPE_MAX; b += 1) if (Math.abs(meanRate(round.coefficients, a, b) - round.target) < 1e-9) found.push([a, b])
    return found
}

export function createSlopeRound(random: Random, levelIndex: number): SlopeRound {
    for (;;) {
        const lead = levelIndex === 2 ? pick(random, [-1, 1]) : 1
        const coefficients: Coefficients = [lead, levelIndex === 0 ? 0 : pick(random, nonzero(-3, 3)), randomInt(random, -4, 4)]
        const a = randomInt(random, SLOPE_MIN, SLOPE_MAX - 1)
        const b = randomInt(random, a + 1, SLOPE_MAX)
        const round = { coefficients, target: meanRate(coefficients, a, b) }
        // The start [0, 1] must not already be right, and the values must fit the graph
        if (rightIntervals(round).some(([from, to]) => from === 0 && to === 1)) continue
        const values = Array.from({ length: 9 }, (_, index) => valueAt(coefficients, index - 4))
        if (Math.max(...values) > 20 || Math.min(...values) < -12) continue
        return round
    }
}

export const createSlopeRounds = (random: Random, levelIndex: number) => Array.from({ length: SLOPE_ROUNDS }, () => createSlopeRound(random, levelIndex))
