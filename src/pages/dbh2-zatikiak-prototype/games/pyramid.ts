import { add, compare, divide, equals, fraction, gcd, multiply, subtract, type FractionValue } from '../math/fraction.ts'
import { pick, randomInt, shuffle, type Random } from './random.ts'
import type { Stars } from './records.ts'

/* ==========================================================================
   Piramidea (Pirámide): every brick is the sum (or, in the last level, the
   product) of the two bricks under it. Some bricks are given and the rest
   have to be worked out: upwards by adding, downwards by taking away (or
   dividing). Every pyramid can be finished one brick at a time.
   ========================================================================== */

export const PYRAMID_ROUNDS = 5
/** Bricks of a three-row pyramid: 0 on top, 1–2 in the middle, 3–5 at the bottom */
export const PYRAMID_BRICKS = 6
/** Points for a brick right at the first try, and after a mistake or a hint */
export const PYRAMID_POINTS = { first: 2, later: 1 } as const

export type PyramidLevel = 0 | 1 | 2
export type PyramidOp = 'sum' | 'product'

/** Each brick above rests on two below: [above, left, right] */
export const PYRAMID_RELATIONS: Array<[number, number, number]> = [[0, 1, 2], [1, 3, 4], [2, 4, 5]]

export interface Pyramid {
    op: PyramidOp
    /** Every brick's value, top first */
    values: FractionValue[]
    /** Which bricks are shown from the start */
    given: boolean[]
}

export const combine = (op: PyramidOp, left: FractionValue, right: FractionValue) => (op === 'sum' ? add(left, right) : multiply(left, right))

/** Builds a pyramid from its bottom row */
export function buildValues(op: PyramidOp, bottom: [FractionValue, FractionValue, FractionValue]): FractionValue[] {
    const values: FractionValue[] = [fraction(0), fraction(0), fraction(0), ...bottom]
    values[1] = combine(op, values[3], values[4])
    values[2] = combine(op, values[4], values[5])
    values[0] = combine(op, values[1], values[2])
    return values
}

/**
 * A brick that can be worked out now from known ones, with how: as the
 * result of the two under it, or as one of the two under a known brick
 * (taking away the other, or dividing by it). Null when none can.
 */
export interface PyramidStep {
    brick: number
    /** 'up': the two below are known; 'down': the brick above and the neighbour are known */
    way: 'up' | 'down'
    /** For 'up', the two below; for 'down', the brick above and the neighbour */
    from: [number, number]
}

export function nextSteps(known: boolean[]): PyramidStep[] {
    const steps: PyramidStep[] = []
    for (const [above, left, right] of PYRAMID_RELATIONS) {
        if (!known[above] && known[left] && known[right]) steps.push({ brick: above, way: 'up', from: [left, right] })
        if (known[above] && !known[left] && known[right]) steps.push({ brick: left, way: 'down', from: [above, right] })
        if (known[above] && known[left] && !known[right]) steps.push({ brick: right, way: 'down', from: [above, left] })
    }
    return steps
}

/** Whether a pyramid with these bricks shown can be finished one brick at a time */
export function solvable(given: boolean[]): boolean {
    const known = [...given]
    for (;;) {
        const steps = nextSteps(known)
        if (steps.length === 0) return known.every(Boolean)
        for (const step of steps) known[step.brick] = true
    }
}

/** The value a step gives, from the pyramid's values */
export function stepValue(pyramid: Pyramid, step: PyramidStep): FractionValue | null {
    const [a, b] = step.from.map((index) => pyramid.values[index])
    if (step.way === 'up') return combine(pyramid.op, a, b)
    if (pyramid.op === 'sum') return subtract(a, b)
    return b.numerator === 0 ? null : divide(a, b)
}

/** Every way of showing three bricks that leaves a finishable pyramid with at least one brick to work out downwards */
export const DOWNWARD_PATTERNS: boolean[][] = (() => {
    const patterns: boolean[][] = []
    for (let a = 0; a < PYRAMID_BRICKS; a += 1) {
        for (let b = a + 1; b < PYRAMID_BRICKS; b += 1) {
            for (let c = b + 1; c < PYRAMID_BRICKS; c += 1) {
                const given = Array.from({ length: PYRAMID_BRICKS }, (_, index) => index === a || index === b || index === c)
                const bottomMissing = !given[3] || !given[4] || !given[5]
                if (bottomMissing && solvable(given)) patterns.push(given)
            }
        }
    }
    return patterns
})()

const BOTTOM_ONLY = [false, false, false, true, true, true]

/* ---------- Building the pyramids ---------- */

const FAMILIES = [[2, 4, 8], [3, 6, 12], [2, 4], [3, 6], [5, 10], [2, 3, 6]]
const MIXED = [2, 3, 4, 5, 6, 8, 10, 12]
const lcm = (a: number, b: number) => (a / gcd(a, b)) * b
const commonDenominator = (values: FractionValue[]) => values.reduce((value, item) => lcm(value, item.denominator), 1)

function properFraction(random: Random, denominators: number[]): FractionValue {
    for (;;) {
        const denominator = pick(random, denominators)
        const value = fraction(randomInt(random, 1, denominator - 1), denominator)
        if (value.denominator > 1) return value
    }
}

/** Level 1: the bottom row from one family of denominators; work upwards */
function upwards(random: Random): Pyramid {
    for (;;) {
        const family = pick(random, FAMILIES)
        const bottom: [FractionValue, FractionValue, FractionValue] = [properFraction(random, family), properFraction(random, family), properFraction(random, family)]
        const values = buildValues('sum', bottom)
        if (compare(values[0], fraction(4)) > 0 || new Set(bottom.map((value) => `${value.numerator}/${value.denominator}`)).size < 2) continue
        return { op: 'sum', values, given: BOTTOM_ONLY }
    }
}

/** Level 2: mixed denominators and three bricks shown anywhere; some bricks have to be found by taking away */
function downwards(random: Random): Pyramid {
    for (;;) {
        const bottom: [FractionValue, FractionValue, FractionValue] = [properFraction(random, MIXED), properFraction(random, MIXED), properFraction(random, MIXED)]
        const values = buildValues('sum', bottom)
        if (commonDenominator(values) > 24 || compare(values[0], fraction(4)) > 0) continue
        return { op: 'sum', values, given: pick(random, DOWNWARD_PATTERNS) }
    }
}

/** Fractions that multiply into small numbers */
const FACTORS = [fraction(1, 2), fraction(2, 3), fraction(3, 4), fraction(3, 2), fraction(4, 3), fraction(2, 5), fraction(5, 2), fraction(5, 6), fraction(6, 5), fraction(2), fraction(3), fraction(1, 3), fraction(3, 5), fraction(4, 5)]

/** Level 3: a product pyramid; downwards means dividing */
function products(random: Random): Pyramid {
    for (;;) {
        const bottom = shuffle(random, FACTORS).slice(0, 3) as [FractionValue, FractionValue, FractionValue]
        const values = buildValues('product', bottom)
        const top = values[0]
        if (top.numerator > 60 || top.denominator > 60 || equals(top, fraction(1))) continue
        return { op: 'product', values, given: random() < 0.3 ? BOTTOM_ONLY : pick(random, DOWNWARD_PATTERNS) }
    }
}

const builders = [upwards, downwards, products]

export function createPyramid(random: Random, level: PyramidLevel): Pyramid {
    return builders[level](random)
}

export function createPyramids(random: Random, level: PyramidLevel): Pyramid[] {
    const pyramids: Pyramid[] = []
    const seen = new Set<string>()
    while (pyramids.length < PYRAMID_ROUNDS) {
        const pyramid = createPyramid(random, level)
        const id = pyramid.values.map((value) => `${value.numerator}/${value.denominator}`).join(' ')
        if (seen.has(id)) continue
        seen.add(id)
        pyramids.push(pyramid)
    }
    return pyramids
}

/* ---------- Playing ---------- */

export const PYRAMID_MAX_SCORE = PYRAMID_ROUNDS * (PYRAMID_BRICKS - 3) * PYRAMID_POINTS.first

export function pyramidStars(score: number): Stars {
    if (score >= 26) return 3
    if (score >= 20) return 2
    if (score >= 14) return 1
    return 0
}

/**
 * The way to work out a brick the learner has not filled yet, from what is
 * on the pyramid now (shown and filled bricks), for the hint; null when the
 * brick cannot be worked out yet.
 */
export function hintFor(known: boolean[], brick: number): PyramidStep | null {
    return nextSteps(known).find((step) => step.brick === brick) ?? null
}

const latex = (value: FractionValue) => (value.denominator === 1 ? String(value.numerator) : `\\frac{${value.numerator}}{${value.denominator}}`)
const wrap = (value: FractionValue) => (value.denominator === 1 ? latex(value) : `\\left(${latex(value)}\\right)`)

/** The operation of a step written out, without its result: \frac{1}{2}+\frac{1}{4} or \frac{3}{4}-\frac{1}{2} */
export function stepLatex(pyramid: Pyramid, step: PyramidStep): string {
    const [a, b] = step.from.map((index) => pyramid.values[index])
    if (pyramid.op === 'sum') return step.way === 'up' ? `${latex(a)}+${latex(b)}` : `${latex(a)}-${latex(b)}`
    return step.way === 'up' ? `${latex(a)}\\cdot ${latex(b)}` : `${latex(a)}\\div ${wrap(b)}`
}
