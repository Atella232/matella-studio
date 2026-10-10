import { fraction, type FractionValue } from '../../features/unit-v2/math/fraction.ts'

/* ==========================================================================
   Berreturak, erroak eta logaritmoak · 4. DBH akademikoak — pure maths
   shared by the lessons, the content, the laboratory and the games: prime
   exponents, simplifying a radical ⁿ√aᵐ, a common index, taking factors
   out of a root, the factor that rationalizes ⁿ√aᵐ, and exact logarithms
   (when the value is a rational power of the base). Plain TypeScript so
   the node tests can load it.
   ========================================================================== */

export const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b))
export const lcm = (a: number, b: number) => Math.abs(a * b) / gcd(a, b)

/** The prime factorization of a whole number ≥ 1, as prime → exponent */
export function primeExponents(n: number): Map<number, number> {
    const result = new Map<number, number>()
    let rest = n
    for (let prime = 2; prime * prime <= rest; prime += 1) {
        while (rest % prime === 0) {
            result.set(prime, (result.get(prime) ?? 0) + 1)
            rest /= prime
        }
    }
    if (rest > 1) result.set(rest, (result.get(rest) ?? 0) + 1)
    return result
}

/** ⁿ√aᵐ with index and exponent divided by their gcd: ⁶√2⁴ → ∛2² */
export function simplifyRadical(index: number, exponent: number) {
    const divisor = gcd(index, exponent)
    return { index: index / divisor, exponent: exponent / divisor }
}

/** ⁿ√a written with the smallest index: ⁶√8 → √2 (a must be a whole number ≥ 2) */
export function lowestIndex(index: number, radicand: number) {
    const exponents = primeExponents(radicand)
    let divisor = index
    for (const exponent of exponents.values()) divisor = gcd(divisor, exponent)
    const value = [...exponents].reduce((product, [prime, exponent]) => product * prime ** (exponent / divisor), 1)
    return { index: index / divisor, radicand: value }
}

/** ⁿ√a as outside · ⁿ√inside, with every factor that can leave the root taken out */
export function extractFactors(radicand: number, index: number) {
    let outside = 1
    let inside = 1
    for (const [prime, exponent] of primeExponents(radicand)) {
        outside *= prime ** Math.floor(exponent / index)
        inside *= prime ** (exponent % index)
    }
    return { outside, inside }
}

/** The reverse: a · ⁿ√b with a inside the root, aⁿ · b */
export const putInside = (outside: number, inside: number, index: number) => outside ** index * inside

/** Two radicals ⁿ√a and ᵐ√b written with their common index: values under the new root */
export function commonIndex(firstIndex: number, firstRadicand: number, secondIndex: number, secondRadicand: number) {
    const index = lcm(firstIndex, secondIndex)
    return { index, first: firstRadicand ** (index / firstIndex), second: secondRadicand ** (index / secondIndex) }
}

/** The factor that rationalizes ⁿ√aᵐ (m < n): ⁿ√aⁿ⁻ᵐ */
export const rationalizingExponent = (index: number, exponent: number) => index - exponent

/** a / ⁿ√bᵐ rationalized: a · ⁿ√bⁿ⁻ᵐ / b, as numerator coefficient over b (simplified) */
export function rationalized(numerator: number, base: number) {
    const divisor = gcd(numerator, base)
    return { coefficient: numerator / divisor, denominator: base / divisor }
}

/** a^(p/q) for whole a, exact when it is a whole number or the inverse of one */
export function rationalPower(base: number, exponent: FractionValue): FractionValue | null {
    const root = Math.round(Math.abs(base) ** (1 / exponent.denominator))
    if (root ** exponent.denominator !== Math.abs(base)) return null
    if (base < 0 && exponent.denominator % 2 === 0) return null
    const signedRoot = base < 0 ? -root : root
    const power = signedRoot ** Math.abs(exponent.numerator)
    return exponent.numerator >= 0 ? fraction(power) : fraction(1, power)
}

/**
 * logₐ b exactly, when b = a^(p/q) with q ≤ 6: log₂ 32 = 5, log₉ 3 = 1/2,
 * log₄ (1/8) = −3/2. Null when it is not a simple rational number.
 */
export function exactLog(base: FractionValue, value: FractionValue): FractionValue | null {
    const a = base.numerator / base.denominator
    const b = value.numerator / value.denominator
    if (a <= 0 || a === 1 || b <= 0) return null
    const approximation = Math.log(b) / Math.log(a)
    for (let q = 1; q <= 6; q += 1) {
        // + 0 turns −0 into 0
        const p = Math.round(approximation * q) + 0
        if (Math.abs(approximation * q - p) < 1e-9) return fraction(p, q)
    }
    return null
}
