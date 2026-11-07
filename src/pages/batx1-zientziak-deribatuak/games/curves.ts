import { pick, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   The curves the derivative games draw: a parabola a(x − h)² + k and a
   cubic a((x − h)³ − 3(x − h)) + k, whose tangent is horizontal at h and
   at h ± 1. Plain data, so the rounds can be compared and tested; value
   and slope give f and f′.
   ========================================================================== */

export interface Curve {
    kind: 'parabola' | 'cubic'
    a: number
    h: number
    k: number
}

export function curveValue({ kind, a, h, k }: Curve, x: number): number {
    const t = x - h
    return kind === 'parabola' ? a * t * t + k : a * (t ** 3 - 3 * t) + k
}

export function curveSlope({ kind, a, h }: Curve, x: number): number {
    const t = x - h
    return kind === 'parabola' ? 2 * a * t : a * (3 * t * t - 3)
}

/** The x where the tangent is horizontal */
export const flatPoints = ({ kind, h }: Curve): number[] => (kind === 'parabola' ? [h] : [h - 1, h + 1])

/** The plane every game draws on: −4 to 4 on both axes */
export const CURVE_BOX = 4

/** The points of a curve on the half steps of the box where it stays well inside */
export function visiblePoints(curve: Curve): number[] {
    const points: number[] = []
    for (let x = -3.5; x <= 3.5; x += 0.5) {
        if (Math.abs(curveValue(curve, x)) <= CURVE_BOX - 0.5) points.push(x)
    }
    return points
}

/** A parabola or a cubic whose turning points are inside the box */
export function randomCurve(random: Random, kind: Curve['kind'] = pick(random, ['parabola', 'cubic'] as const)): Curve {
    if (kind === 'parabola') {
        const a = pick(random, [-1, -0.5, 0.5, 1])
        const h = pick(random, [-1, 0, 1])
        const k = a > 0 ? pick(random, [-3, -2, -1]) : pick(random, [1, 2, 3])
        return { kind, a, h, k }
    }
    const a = pick(random, [-1, -0.5, 0.5, 1])
    const h = pick(random, [-1, 0, 1])
    const k = pick(random, [-1, 0, 1])
    return { kind, a, h, k }
}

/** The curve in LaTeX, for the explanations */
export function curveLatex({ kind, a, h, k }: Curve): string {
    const coefficient = a === 1 ? '' : a === -1 ? '-' : a === 0.5 ? '\\frac{1}{2}' : '-\\frac{1}{2}'
    const shifted = h === 0 ? 'x' : `(x${h > 0 ? '-' : '+'}${Math.abs(h)})`
    const constant = k === 0 ? '' : `${k > 0 ? '+' : '-'}${Math.abs(k)}`
    if (kind === 'parabola') return `${coefficient}${shifted}^2${constant}`
    const inner = h === 0 ? 'x^3-3x' : `${shifted}^3-3${shifted}`
    return `${coefficient}\\left(${inner}\\right)${constant}`
}
