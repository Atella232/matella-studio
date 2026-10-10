import { fraction, type FractionValue } from '../../features/unit-v2/math/fraction.ts'
import type { Point } from '../dbh2-funtzioak-v2/functions.ts'
import { sampled } from '../dbh4-aplikatuak-funtzioak/functions.ts'

/* ==========================================================================
   Funtzio baten grafikoa · 4. DBH aplikatuak — pure maths shared by the
   lessons, the content, the laboratory and the games: lines through a
   point or two, the vertex of a parabola, the two branches of a hyperbola,
   square roots and exponentials sampled for drawing. Plain TypeScript so
   the node tests can load it.
   ========================================================================== */

export type { Point }
export { sampled }

/* ---------- Lines ---------- */

/** Slope of the line through two points (null when it is vertical) */
export const slopeOf = (a: Point, b: Point): FractionValue | null => (a[0] === b[0] ? null : fraction(b[1] - a[1], b[0] - a[0]))

/** Ordinate at the origin n of the line with slope m through (x0, y0): y0 = m·x0 + n */
export const interceptThrough = (m: number, [x0, y0]: Point) => y0 - m * x0

/* ---------- Parabolas y = ax² + bx + c ---------- */

export const quadraticValue = (a: number, b: number, c: number, x: number) => a * x * x + b * x + c

/** The vertex: x = −b / 2a, y = f(x) */
export function vertexOf(a: number, b: number, c: number): Point {
    const x = -b / (2 * a)
    return [x, quadraticValue(a, b, c, x)]
}

/** Real roots of ax² + bx + c = 0, smallest first */
export function quadraticRoots(a: number, b: number, c: number): number[] {
    const discriminant = b * b - 4 * a * c
    if (discriminant < 0) return []
    if (discriminant === 0) return [-b / (2 * a)]
    const root = Math.sqrt(discriminant)
    return [(-b - root) / (2 * a), (-b + root) / (2 * a)].sort((p, q) => p - q)
}

/* ---------- Hyperbolas y = k / (x − a) + b ---------- */

export const hyperbolaValue = (k: number, a: number, b: number, x: number) => k / (x - a) + b

/**
 * The two branches of y = k / (x − a) + b between `from` and `to`, each
 * stopping where the curve leaves the band [yMin, yMax] near the asymptote
 * (the drawing is clipped to the box anyway).
 */
export function hyperbolaBranches(k: number, a: number, b: number, from: number, to: number, yMin: number, yMax: number, step = 0.02): Point[][] {
    const branch = (start: number, end: number) => sampled((x) => hyperbolaValue(k, a, b, x), start, end, step).filter(([, y]) => y >= yMin - 2 && y <= yMax + 2)
    const gap = 0.01
    return [branch(from, a - gap), branch(a + gap, to)].filter((points) => points.length > 1)
}

/* ---------- Roots and exponentials ---------- */

/** y = s·√(x − a) + b, drawn from x = a (s = ±1) */
export const rootCurve = (s: number, a: number, b: number, to: number): Point[] => sampled((x) => s * Math.sqrt(Math.max(0, x - a)) + b, a, to, 0.02)

/** y = k·aˣ sampled between two x */
export const exponentialCurve = (k: number, base: number, from: number, to: number): Point[] => sampled((x) => k * base ** x, from, to)
