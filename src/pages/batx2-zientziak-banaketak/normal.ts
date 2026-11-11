/* ==========================================================================
   Banaketak · Batxilergoa 2 — the normal distribution, computed. Φ, the
   distribution function of N(0, 1), comes from the series
   Φ(z) = 1/2 + φ(z)·(z + z³/3 + z⁵/(3·5) + …), accurate far beyond the
   four decimals of a school table; the table itself is Φ rounded to four
   decimals for z = 0,00 … 3,99, as the books print it, and every exercise
   of the unit reads its values from here (never copied from a book). The
   probabilities of the exercises use the rounded table values, as a
   learner with the table does. Pure, exported for 1.º and 2.º Sociales.
   ========================================================================== */

/** The density of N(0, 1) */
export const phiDensity = (z: number) => Math.exp((-z * z) / 2) / Math.sqrt(2 * Math.PI)

/** Φ(z) = P(Z ≤ z) for N(0, 1), to about fifteen digits for |z| ≤ 8 */
export function Phi(z: number): number {
    if (z < 0) return 1 - Phi(-z)
    if (z > 8) return 1
    let term = z
    let sum = z
    for (let n = 1; n < 400; n += 1) {
        term *= (z * z) / (2 * n + 1)
        sum += term
        if (term < 1e-17 * sum) break
    }
    return 0.5 + phiDensity(z) * sum
}

/** The largest z the table holds */
export const TABLE_MAX = 3.99

/** z in hundredths, as the table reads it: 1,96 → 196 */
const hundredths = (z: number) => Math.round(z * 100)

/**
 * The table value Φ(z) for z ≥ 0 with two decimals, as a number of ten-thousandths: Φ(1,96) → 9750.
 * Beyond the table, 1 (10 000), as the books say.
 */
export function tableValue(z: number): number {
    const index = hundredths(z)
    if (index < 0) throw new Error(`The table only has z ≥ 0 (${z})`)
    if (index > hundredths(TABLE_MAX)) return 10_000
    return Math.round(Phi(index / 100) * 10_000)
}

/** P(Z ≤ k) for any k with two decimals, from the table and the symmetry, in ten-thousandths */
export const below = (k: number) => (hundredths(k) >= 0 ? tableValue(k) : 10_000 - tableValue(-k))
/** P(Z ≥ k), in ten-thousandths */
export const above = (k: number) => 10_000 - below(k)
/** P(a ≤ Z ≤ b), in ten-thousandths */
export const between = (a: number, b: number) => below(b) - below(a)

/** A number of ten-thousandths for LaTeX: 9750 → 0{,}9750, 10000 → 1 (the table keeps its four decimals) */
export function tableLatex(tenThousandths: number): string {
    if (tenThousandths >= 10_000) return '1'
    return `0{,}${String(tenThousandths).padStart(4, '0')}`
}

/** A z with two decimals for LaTeX: 1.96 → 1{,}96, -0.5 → -0{,}5 */
export function zLatex(z: number): string {
    const index = hundredths(z)
    const sign = index < 0 ? '-' : ''
    const absolute = Math.abs(index)
    const whole = Math.floor(absolute / 100)
    const rest = absolute % 100
    if (rest === 0) return `${sign}${whole}`
    return `${sign}${whole}{,}${rest % 10 === 0 ? rest / 10 : String(rest).padStart(2, '0')}`
}

/**
 * The inverse reading of the table: the z ≥ 0 with two decimals whose Φ is closest to p (in
 * ten-thousandths). Null when two z are equally close (0,9500 lies between 1,64 and 1,65): the exercises
 * never ask for those.
 */
export function inverseTable(p: number): number | null {
    let best = 0
    let distance = Infinity
    let tie = false
    for (let index = 0; index <= hundredths(TABLE_MAX); index += 1) {
        const gap = Math.abs(tableValue(index / 100) - p)
        if (gap < distance) {
            best = index
            distance = gap
            tie = false
        } else if (gap === distance) {
            tie = true
        }
    }
    return tie ? null : best / 100
}

/** z = (x − μ) / σ */
export const standardize = (x: number, mean: number, sd: number) => (x - mean) / sd
