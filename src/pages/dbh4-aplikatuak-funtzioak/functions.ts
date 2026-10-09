import { fraction, type FractionValue } from '../../features/unit-v2/math/fraction.ts'
import type { Point } from '../dbh2-funtzioak-v2/functions.ts'

/* ==========================================================================
   Funtzioak · 4. DBH aplikatuak — pure maths shared by the lessons, the
   content, the laboratory and the games: smooth curves through given
   points (that never overshoot them, so the peaks and valleys stay where
   the exercise says), intervals written as a textbook does, the average
   rate of change and periodic values. Plain TypeScript so the node tests
   can load it.
   ========================================================================== */

export type { Point }

/**
 * A smooth curve through the given points (monotone cubic interpolation):
 * between two points it never goes above or below them, so maxima, minima
 * and the range of the drawing are exactly those of the points.
 */
export function smoothThrough(points: readonly Point[], step = 0.05): Point[] {
    const count = points.length
    if (count < 3) return [...points]
    const h = points.slice(1).map((point, index) => point[0] - points[index][0])
    const delta = points.slice(1).map((point, index) => (point[1] - points[index][1]) / h[index])
    const tangent = points.map((_, index) => {
        if (index === 0) return delta[0]
        if (index === count - 1) return delta[count - 2]
        const before = delta[index - 1]
        const after = delta[index]
        if (before * after <= 0) return 0
        const w1 = 2 * h[index] + h[index - 1]
        const w2 = h[index] + 2 * h[index - 1]
        return (w1 + w2) / (w1 / before + w2 / after)
    })
    const out: Point[] = []
    for (let index = 0; index < count - 1; index += 1) {
        const [x0, y0] = points[index]
        const [x1, y1] = points[index + 1]
        const width = x1 - x0
        const steps = Math.max(2, Math.round(width / step))
        for (let k = 0; k < steps; k += 1) {
            const t = k / steps
            const t2 = t * t
            const t3 = t2 * t
            const y = (2 * t3 - 3 * t2 + 1) * y0 + (t3 - 2 * t2 + t) * width * tangent[index] + (-2 * t3 + 3 * t2) * y1 + (t3 - t2) * width * tangent[index + 1]
            out.push([Math.round((x0 + t * width) * 1000) / 1000, Math.round(y * 1000) / 1000])
        }
    }
    out.push([...points[count - 1]])
    return out
}

/** A function sampled every `step` units */
export function sampled(fn: (x: number) => number, from: number, to: number, step = 0.05): Point[] {
    const points: Point[] = []
    const steps = Math.round((to - from) / step)
    for (let k = 0; k <= steps; k += 1) {
        const x = Math.round((from + k * step) * 1000) / 1000
        points.push([x, Math.round(fn(x) * 1000) / 1000])
    }
    return points
}

/* ---------- Writing numbers and intervals ---------- */

/** A number as LaTeX with the decimal comma (point in Arabic via the callers' say/same) */
export function numberLatex(value: number): string {
    const rounded = Math.round(value * 1000) / 1000
    return String(rounded).replace('.', '{,}')
}

export type Bound = number | '-inf' | 'inf'

/** An interval as LaTeX: [−2, 5], (1, +∞), (−∞, 3] */
export function intervalLatex(from: Bound, to: Bound, closedFrom = false, closedTo = false): string {
    const left = from === '-inf' ? '(-\\infty' : `${closedFrom ? '[' : '('}${numberLatex(from as number)}`
    const right = to === 'inf' ? '+\\infty)' : `${numberLatex(to as number)}${closedTo ? ']' : ')'}`
    return `${left},\\,${right}`
}

/* ---------- Average rate of change ---------- */

/** T.V.M. [a, b] = (f(b) − f(a)) / (b − a), exact when the values are whole */
export const averageRate = (a: number, fa: number, b: number, fb: number): FractionValue => fraction(fb - fa, b - a)

/* ---------- Periodic functions ---------- */

/** The x inside the first period [0, T) that has the same value as x */
export const reduceToPeriod = (x: number, period: number) => ((x % period) + period) % period

/* ---------- Polynomials used across the unit ---------- */

/** Value of a polynomial given by its coefficients from the highest degree: [1, −2, −3] is x² − 2x − 3 */
export const polynomialValue = (coefficients: readonly number[], x: number) => coefficients.reduce((total, coefficient) => total * x + coefficient, 0)

/** The graph studied step by step in the lesson «study» */
export const studyKnots: Point[] = [[0, 0], [1, 3], [3, 1], [5, 2], [6, 1], [7, 3], [8, 0]]
