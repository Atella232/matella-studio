import type { Pair } from '../batx1-zientziak-bidimentsionala/bivariate.ts'

/* ==========================================================================
   Estatistika bidimentsionala · Batxilergoa 1 · Gizarte Zientziak — the
   data that the lesson figures, the laboratory and the games draw, kept as
   plain TypeScript so the tests can check them. A cloud with a given r is
   built from ten x values, a straight line and a fixed «noise» that has
   mean 0 and no relation to x, so that r comes out exactly as asked.
   ========================================================================== */

export const CLOUD_X = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const centre = (values: number[]) => values.map((value) => value - values.reduce((sum, item) => sum + item, 0) / values.length)
const dot = (a: number[], b: number[]) => a.reduce((sum, value, index) => sum + value * b[index], 0)

/** A noise with mean 0 and no covariance with x */
export function noiseFrom(raw: number[], xs: number[] = CLOUD_X): number[] {
    const dx = centre(xs)
    const centred = centre(raw)
    const along = dot(centred, dx) / dot(dx, dx)
    return centred.map((value, index) => value - along * dx[index])
}

export const CLOUD_NOISE = noiseFrom([0.8, -1.3, 0.4, 1.6, -0.9, -1.7, 1.1, 0.5, -1.2, 0.9])

/** Ten points around y = 5 + slope·(x − 5,5) with exactly the r asked for (|r| < 1) */
export function cloudWithR(r: number, noise: number[] = CLOUD_NOISE, xs: number[] = CLOUD_X, slope = 0.5): Pair[] {
    const dx = centre(xs)
    const vx = dot(dx, dx) / xs.length
    const ve = dot(noise, noise) / noise.length
    const b = Math.sign(r) * slope
    const k = r === 0 ? 1.5 : Math.sqrt(b * b * vx * (1 / (r * r) - 1) / ve)
    return xs.map((x, index): Pair => [x, 5 + b * dx[index] + k * noise[index]])
}

/** The four clouds of «Reading r in a cloud», in the order A, B, C, D */
export const R_CLOUDS = [0.92, -0.8, 0.45, -0.6]

/** The line of X on Y of «The line of X on Y»: x̄ = 6, ȳ = 10, σy² = 8, σxy = 4 */
export const LINE_XY = { mx: 6, my: 10, vy: 8, cxy: 4, y: 14 }

/** The two lines of «Both lines», solved for y */
export const BOTH_LINES = { yx: [0.8, 3.8] as Pair, xy: [1.25, 2] as Pair }

/** Ages (rows) by preference (columns: cinema, theatre, sport) of «Marginal and conditional measures» */
export const PREFERENCE_TABLE = { marks: [25, 35, 45], cells: [[1, 0, 3], [9, 6, 9], [1, 3, 0]] }
