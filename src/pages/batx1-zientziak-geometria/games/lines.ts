import { fraction, toLatex, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'

/* ==========================================================================
   Lines with whole coefficients for the games of Geometria analitikoa:
   the general form Ax + By + C = 0 kept reduced (no common factor, the
   first coefficient positive), and the other forms of the same line in
   LaTeX: explicit, point-slope, vector, parametric and continuous.
   ========================================================================== */

export type Point = [number, number]

export interface Line {
    A: number
    B: number
    C: number
}

export const gcd = (m: number, n: number): number => (n === 0 ? Math.abs(m) : gcd(n, m % n))

/** No common factor and the first coefficient positive */
export function reduced({ A, B, C }: Line): Line {
    const g = gcd(gcd(A, B), C) || 1
    const sign = A < 0 || (A === 0 && B < 0) ? -1 : 1
    return { A: (sign * A) / g + 0, B: (sign * B) / g + 0, C: (sign * C) / g + 0 }
}

export const sameLine = (r: Line, s: Line) => {
    const p = reduced(r)
    const q = reduced(s)
    return p.A === q.A && p.B === q.B && p.C === q.C
}

/** The line through P with direction d: bx − ay + (a·y₀ − b·x₀) = 0 */
export const lineThrough = ([x, y]: Point, [a, b]: Point): Line => reduced({ A: b, B: -a, C: a * y - b * x })

export const valueAt = ({ A, B, C }: Line, [x, y]: Point) => A * x + B * y + C
export const isOn = (line: Line, point: Point) => valueAt(line, point) === 0

/** Ax + By + C = 0 in LaTeX */
export function generalLatex({ A, B, C }: Line) {
    const parts: string[] = []
    const add = (coefficient: number, name: string) => {
        if (coefficient === 0) return
        const sign = coefficient < 0 ? '-' : parts.length === 0 ? '' : '+'
        const size = Math.abs(coefficient) === 1 && name ? '' : String(Math.abs(coefficient))
        parts.push(`${sign}${size}${name}`)
    }
    add(A, 'x')
    add(B, 'y')
    add(C, '')
    return `${parts.join('')}=0`
}

/** k·x in LaTeX for a fraction k: x, −x, 2x, \frac{2}{3}x */
function times(k: FractionValue, name: string) {
    if (k.numerator === 0) return ''
    if (k.numerator === k.denominator) return name
    if (k.numerator === -k.denominator) return `-${name}`
    return `${toLatex(k)}${name}`
}

export const slopeOf = ({ A, B }: Line): FractionValue | null => (B === 0 ? null : fraction(-A, B))
export const interceptOf = ({ B, C }: Line): FractionValue | null => (B === 0 ? null : fraction(-C, B))

/** y = mx + n (a line that is not vertical) */
export function explicitLatex(line: Line) {
    const m = slopeOf(line)!
    const n = interceptOf(line)!
    const term = times(m, 'x')
    if (n.numerator === 0) return `y=${term || '0'}`
    if (!term) return `y=${toLatex(n)}`
    return `y=${term}${n.numerator < 0 ? '' : '+'}${toLatex(n)}`
}

/** x − a, written so that a negative a turns into a plus */
export const shiftLatex = (name: string, value: number) => (value === 0 ? name : value > 0 ? `${name}-${value}` : `${name}+${-value}`)

/** y − y₀ = m(x − x₀) */
export function pointSlopeLatex([x, y]: Point, [a, b]: Point) {
    const m = fraction(b, a)
    const inner = shiftLatex('x', x)
    const factor = x === 0 ? inner : `(${inner})`
    const right = m.numerator === 0 ? '0' : m.numerator === m.denominator ? factor : m.numerator === -m.denominator ? `-${factor}` : `${toLatex(m)}${factor}`
    return `${shiftLatex('y', y)}=${right}`
}

export const pointLatex = ([x, y]: Point) => `(${x},${y})`

/** (x, y) = (x₀, y₀) + t(a, b) */
export const vectorLatex = (p: Point, d: Point) => `(x,y)=${pointLatex(p)}+t${pointLatex(d)}`

/** x₀ + a·t in LaTeX */
function linear(start: number, step: number) {
    const t = step === 1 ? 't' : step === -1 ? '-t' : `${step}t`
    if (step === 0) return String(start)
    if (start === 0) return t
    return `${start}${step < 0 ? '' : '+'}${t}`
}

/** x = x₀ + at, y = y₀ + bt */
export const parametricLatex = ([x, y]: Point, [a, b]: Point) => `\\begin{cases}x=${linear(x, a)}\\\\ y=${linear(y, b)}\\end{cases}`

/** (x − x₀)/a = (y − y₀)/b, for a direction with no zero coordinate */
export const continuousLatex = ([x, y]: Point, [a, b]: Point) => `\\frac{${shiftLatex('x', x)}}{${a}}=\\frac{${shiftLatex('y', y)}}{${b}}`
