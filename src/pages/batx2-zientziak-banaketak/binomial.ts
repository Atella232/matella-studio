import { add, fraction, multiply, power, subtract, type FractionValue } from '../../features/unit-v2/math/fraction.ts'

/* ==========================================================================
   Banaketak · Batxilergoa 2 — the binomial distribution B(n, p), exact:
   p is a fraction, so P(X = k) = C(n, k)·pᵏ·qⁿ⁻ᵏ is an exact fraction, and
   so are the sums for «at least» and «at most». Also the mean np and the
   variance npq, and the normal that approximates it. Pure, exported for
   1.º and 2.º Sociales.
   ========================================================================== */

/** C(n, k), exact for the sizes used in the unit */
export function choose(n: number, k: number): number {
    if (k < 0 || k > n) return 0
    let value = 1
    for (let i = 1; i <= k; i += 1) value = (value * (n - k + i)) / i
    return Math.round(value)
}

/** P(X = k) for B(n, p) */
export function binomialPmf(n: number, p: FractionValue, k: number): FractionValue {
    if (k < 0 || k > n) return fraction(0)
    const q = subtract(fraction(1), p)
    return multiply(fraction(choose(n, k)), multiply(power(p, k), power(q, n - k)))
}

/** P(a ≤ X ≤ b) for B(n, p) */
export function binomialBetween(n: number, p: FractionValue, a: number, b: number): FractionValue {
    let sum = fraction(0)
    for (let k = Math.max(0, a); k <= Math.min(n, b); k += 1) sum = add(sum, binomialPmf(n, p, k))
    return sum
}

/** P(X ≤ k) and P(X ≥ k) */
export const binomialAtMost = (n: number, p: FractionValue, k: number) => binomialBetween(n, p, 0, k)
export const binomialAtLeast = (n: number, p: FractionValue, k: number) => binomialBetween(n, p, k, n)

/** μ = np and σ² = npq */
export const binomialMean = (n: number, p: FractionValue) => multiply(fraction(n), p)
export const binomialVariance = (n: number, p: FractionValue) => multiply(binomialMean(n, p), subtract(fraction(1), p))

/** Whether the normal approximation is advised: np ≥ 5 and nq ≥ 5 */
export function approximable(n: number, p: FractionValue): boolean {
    const mean = binomialMean(n, p)
    const rest = multiply(fraction(n), subtract(fraction(1), p))
    return mean.numerator >= 5 * mean.denominator && rest.numerator >= 5 * rest.denominator
}

/**
 * P(X = k) for B(n, p) as a decimal, through logarithms: the exact fraction overflows from about
 * n = 40 (5¹⁰⁰ has seventy digits), so drawings and approximations with a large n use this one
 */
export function binomialPmfDecimal(n: number, p: number, k: number): number {
    if (k < 0 || k > n) return 0
    if (p === 0 || p === 1) return (p === 1 ? k === n : k === 0) ? 1 : 0
    let logChoose = 0
    for (let i = 1; i <= k; i += 1) logChoose += Math.log(n - k + i) - Math.log(i)
    return Math.exp(logChoose + k * Math.log(p) + (n - k) * Math.log(1 - p))
}
