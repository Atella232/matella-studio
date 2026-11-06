import { fraction, toLatex } from '../../../features/unit-v2/math/fraction.ts'

/* ==========================================================================
   Writing the conics of this unit in LaTeX, shared by the games: (x − h)²
   with the sign the right way round, a polynomial without «+ −» or «1x»,
   the reduced equations and points. The minus is a plain «-» (MathText
   draws it as a real minus).
   ========================================================================== */

/** (x − h)², x² when h = 0 */
export const squareOf = (name: string, h: number) => (h === 0 ? `${name}^2` : `(${name}${h > 0 ? '-' : '+'}${Math.abs(h)})^2`)

/** (x − h), x when h = 0 */
export const shiftOf = (name: string, h: number) => (h === 0 ? name : `(${name}${h > 0 ? '-' : '+'}${Math.abs(h)})`)

/** A square over a denominator; just the square when the denominator is 1 */
export const overOf = (square: string, denominator: number) => (denominator === 1 ? square : `\\frac{${square}}{${denominator}}`)

/** A sum of terms [coefficient, letters] with the signs written once: 4x^2-2y+1 */
export function polynomial(terms: Array<[number, string]>): string {
    let text = ''
    for (const [coefficient, letters] of terms) {
        if (coefficient === 0) continue
        const sign = coefficient < 0 ? '-' : text === '' ? '' : '+'
        const size = Math.abs(coefficient) === 1 && letters ? '' : String(Math.abs(coefficient))
        text += `${sign}${size}${letters}`
    }
    return text === '' ? '0' : text
}

/** A number as toLatex writes it: 3, -2, \frac{3}{4} */
export const ratio = (numerator: number, denominator = 1) => toLatex(fraction(numerator, denominator))

/** A point (x, y) */
export const point = (name: string, x: number | string, y: number | string) => `${name}(${x},${y})`

/** The foci (±c, 0) or (0, ±c) */
export const fociOf = (c: number | string, vertical: boolean) => (vertical ? `F(0,\\pm ${c})` : `F(\\pm ${c},0)`)

/** x²/a² + y²/b² = 1 for a horizontal ellipse, x²/b² + y²/a² = 1 for a vertical one (a is the semi-major axis) */
export const ellipseLatex = (a: number, b: number, vertical: boolean) => (vertical ? `\\frac{x^2}{${b * b}}+\\frac{y^2}{${a * a}}=1` : `\\frac{x^2}{${a * a}}+\\frac{y^2}{${b * b}}=1`)

/** x²/a² − y²/b² = 1 */
export const hyperbolaLatex = (a: number, b: number) => `\\frac{x^2}{${a * a}}-\\frac{y^2}{${b * b}}=1`

/** Semi-axes (a, b, c) of ellipses with whole numbers: a² = b² + c² */
export const ELLIPSE_TRIPLES: Array<[number, number, number]> = [[5, 4, 3], [5, 3, 4], [13, 12, 5], [13, 5, 12], [10, 8, 6], [10, 6, 8], [17, 15, 8], [17, 8, 15]]

/** Semi-axes (a, b, c) of hyperbolas with whole numbers: c² = a² + b² */
export const HYPERBOLA_TRIPLES: Array<[number, number, number]> = [[3, 4, 5], [4, 3, 5], [5, 12, 13], [12, 5, 13], [6, 8, 10], [8, 6, 10], [8, 15, 17], [15, 8, 17]]
