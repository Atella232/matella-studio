/* ==========================================================================
   Integralak (Batxilergoa 1 · Zientziak) laboratory — small number helpers
   shared by the tools: exact values (rounded to 9 decimals, so that a sum
   that equals an area compares as equal) and numbers written as LaTeX
   fractions when they are one.
   ========================================================================== */

/** A value rounded to 9 decimals: what the tools compare */
export const exact = (value: number) => Math.round(value * 1e9) / 1e9

/** A number as LaTeX: a whole number, a fraction with a small denominator or a decimal with two places */
export function numberLatex(value: number): string {
    const v = exact(value)
    for (let d = 1; d <= 48; d += 1) {
        const n = v * d
        if (Math.abs(n - Math.round(n)) < 1e-7) {
            const top = Math.round(n)
            if (d === 1) return String(top)
            return `${top < 0 ? '-' : ''}\\frac{${Math.abs(top)}}{${d}}`
        }
    }
    return (Math.round(v * 100) / 100).toString().replace('.', '{,}')
}

/** Every value from min to max (inclusive) in steps of one: the stepper grid */
export const grid = (min: number, max: number) => Array.from({ length: max - min + 1 }, (_, i) => min + i)
