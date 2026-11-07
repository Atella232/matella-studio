/* ==========================================================================
   Zenbaki konplexuak · Batxilergoa 1 · Zientziak — the complex arithmetic
   the tools and the games share: [real part, imaginary part], arguments in
   degrees between 0° and 360°, and the number written for LaTeX (3-2i, -i)
   and as plain text (3 − 2i) with a true minus sign. Pure logic.
   ========================================================================== */

export type Complex = [number, number]

const D = Math.PI / 180

/** A value that is 0 up to rounding (cos 90°) is 0 */
export const clean = (value: number) => (Math.abs(value) < 1e-9 ? 0 : value)
export const mul = (a: Complex, b: Complex): Complex => [clean(a[0] * b[0] - a[1] * b[1]), clean(a[0] * b[1] + a[1] * b[0])]
export const modulus = ([a, b]: Complex) => Math.hypot(a, b)
export const polarPoint = (r: number, degrees: number): Complex => [clean(r * Math.cos(degrees * D)), clean(r * Math.sin(degrees * D))]
export const sameComplex = (a: Complex, b: Complex) => Math.abs(a[0] - b[0]) < 1e-9 && Math.abs(a[1] - b[1]) < 1e-9

/** The argument between 0° and 360°, or null for 0 */
export function argumentOf([a, b]: Complex): number | null {
    if (Math.abs(a) < 1e-9 && Math.abs(b) < 1e-9) return null
    let angle = (Math.atan2(b, a) * 180) / Math.PI
    if (angle < -1e-9) angle += 360
    if (Math.abs(angle - 360) < 1e-9 || Math.abs(angle) < 1e-9) angle = 0
    return angle
}

/** The angle between 0° and 360° that is the same turn */
export const turnOf = (degrees: number) => ((degrees % 360) + 360) % 360

const shortNumber = (value: number) => (Number.isInteger(value) ? String(value) : String(Math.round(value * 100) / 100))

/** a + bi for LaTeX with whole numbers: 3-2i, -i, 4, 0 */
export function complexLatex([a, b]: Complex): string {
    const imaginary = b === 0 ? '' : `${Math.abs(b) === 1 ? '' : shortNumber(Math.abs(b))}i`
    if (a === 0) return b === 0 ? '0' : `${b < 0 ? '-' : ''}${imaginary}`
    return b === 0 ? shortNumber(a) : `${shortNumber(a)}${b < 0 ? '-' : '+'}${imaginary}`
}

/** The same as plain text, with spaces and a true minus sign: 3 − 2i */
export const complexPlain = (value: Complex) => complexLatex(value).replace(/(?<=.)([+-])/g, ' $1 ').replace(/-/g, '−')
