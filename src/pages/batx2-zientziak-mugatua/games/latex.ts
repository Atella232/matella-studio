/* ==========================================================================
   Integral mugatua (Batxilergoa 2 · Zientziak) games — small LaTeX helpers
   shared by the games: a fraction in lowest terms, x − c with its sign
   and a number with its sign in front.
   ========================================================================== */

const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b))

/** p/q in lowest terms as LaTeX: 3, -\frac{1}{2}… */
export function frac(p: number, q = 1): string {
    if (q < 0) return frac(-p, -q)
    const d = gcd(p, q) || 1
    const [top, bottom] = [p / d, q / d]
    if (bottom === 1) return String(top)
    return `${top < 0 ? '-' : ''}\\frac{${Math.abs(top)}}{${bottom}}`
}

/** x − c, x + c or x */
export const shift = (c: number) => (c === 0 ? 'x' : c > 0 ? `x-${c}` : `x+${-c}`)

/** +3, −2 or nothing for 0 */
export const signed = (value: number) => (value === 0 ? '' : value > 0 ? `+${value}` : `-${-value}`)
