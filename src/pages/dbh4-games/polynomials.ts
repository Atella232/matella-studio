import { pick, randomInt, shuffle, type Random } from '../../features/unit-v2/games/random.ts'
import type { Stars } from '../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Polynomials for the 4. DBH games: coefficient lists (highest degree
   first), Ruffini, the remainder theorem and three games.
   · Root hunt (both tracks): a polynomial with whole roots; the learner
     tries divisors of the constant term with Ruffini until it is fully
     factorised. Right with at most one miss.
   · Divisible by x − a (applied): choose k so that the remainder is 0.
   · Simplify the fraction (academic): four simplifications, the wrong ones
     cancel terms, lose a sign or cancel the x.
   ========================================================================== */

export type Coefficients = number[]

export const valueAt = (coefficients: Coefficients, x: number) => coefficients.reduce((total, coefficient) => total * x + coefficient, 0)

/** Ruffini: the quotient and the remainder of dividing by x − a */
export function ruffini(coefficients: Coefficients, a: number): { row: number[]; quotient: Coefficients; remainder: number } {
    const row: number[] = []
    let carry = 0
    for (const coefficient of coefficients) {
        carry = carry * a + coefficient
        row.push(carry)
    }
    return { row, quotient: row.slice(0, -1), remainder: row[row.length - 1] }
}

export function multiply(left: Coefficients, right: Coefficients): Coefficients {
    const result = Array(left.length + right.length - 1).fill(0)
    left.forEach((a, i) => right.forEach((b, j) => { result[i + j] += a * b }))
    return result
}

/** a·x^n + … written as a polynomial: 2x^{3}-x+5 */
export function polyLatex(coefficients: Coefficients, letter = 'x'): string {
    const degree = coefficients.length - 1
    const terms = coefficients.map((coefficient, index) => {
        const power = degree - index
        if (coefficient === 0) return ''
        const literal = power === 0 ? '' : power === 1 ? letter : `${letter}^{${power}}`
        const size = Math.abs(coefficient) === 1 && power > 0 ? '' : String(Math.abs(coefficient))
        return `${coefficient < 0 ? '-' : '+'}${size}${literal}`
    }).join('')
    if (terms === '') return '0'
    return terms.startsWith('+') ? terms.slice(1) : terms
}

/** x − a as LaTeX: x-3, x+2, x */
export const binomialLatex = (root: number) => (root === 0 ? 'x' : root > 0 ? `x-${root}` : `x+${-root}`)
/** a(x − r1)(x − r2)… */
export const factoredLatex = (leading: number, roots: number[]) => `${leading === 1 ? '' : leading === -1 ? '-' : leading}${roots.map((root) => (roots.length === 1 && leading === 1 ? binomialLatex(root) : `(${binomialLatex(root)})`)).join('')}`
export const fromRoots = (leading: number, roots: number[]): Coefficients => roots.reduce((product, root) => multiply(product, [1, -root]), [leading])

/** Positive and negative divisors of n, smallest first */
export function divisorsOf(n: number): number[] {
    const size = Math.abs(n)
    const positive = Array.from({ length: size }, (_, index) => index + 1).filter((d) => size % d === 0)
    return [...positive.map((d) => -d).reverse(), ...positive]
}

/* ---------- Root hunt ---------- */

export const HUNT_ROUNDS = 4

export interface HuntRound {
    leading: number
    roots: number[]
    coefficients: Coefficients
}

export function createHuntRound(random: Random, levelIndex: number): HuntRound {
    for (;;) {
        const count = levelIndex === 2 ? 4 : 3
        const roots = Array.from({ length: count }, () => randomInt(random, -4, 4)).sort((a, b) => a - b)
        // No zero root (the constant term must have divisors); level 1 all different
        if (roots.includes(0)) continue
        if (levelIndex === 0 && new Set(roots).size < count) continue
        const leading = levelIndex === 1 ? pick(random, [1, 2, -1, 3]) : 1
        const coefficients = fromRoots(leading, roots)
        if (Math.abs(coefficients[coefficients.length - 1]) > 60) continue
        return { leading, roots, coefficients }
    }
}

export const createHuntRounds = (random: Random, levelIndex: number) => Array.from({ length: HUNT_ROUNDS }, () => createHuntRound(random, levelIndex))
/** A hunt is won with at most one wrong candidate */
export const HUNT_MISSES = 1

export function huntStars(score: number): Stars {
    if (score >= 4) return 3
    if (score >= 3) return 2
    if (score >= 2) return 1
    return 0
}

/* ---------- Divisible by x − a ---------- */

export const DIVISIBLE_ROUNDS = 5
export const K_MIN = -40
export const K_MAX = 40

export interface DivisibleRound {
    /** The coefficients with null where k goes */
    pattern: Array<number | null>
    root: number
    k: number
}

export const withK = (round: DivisibleRound, k: number): Coefficients => round.pattern.map((coefficient) => coefficient ?? k)
/** The pattern as LaTeX with k in its place */
export function patternLatex(pattern: Array<number | null>): string {
    const degree = pattern.length - 1
    const parts = pattern.map((coefficient, index) => {
        const power = degree - index
        const literal = power === 0 ? '' : power === 1 ? 'x' : `x^{${power}}`
        if (coefficient === null) return `+k${literal}`
        if (coefficient === 0) return ''
        const size = Math.abs(coefficient) === 1 && power > 0 ? '' : String(Math.abs(coefficient))
        return `${coefficient < 0 ? '-' : '+'}${size}${literal}`
    }).join('')
    return parts.startsWith('+') ? parts.slice(1) : parts
}

export function createDivisibleRound(random: Random, levelIndex: number): DivisibleRound {
    for (;;) {
        const root = levelIndex === 0 ? pick(random, [1, 2, 3, -1, -2]) : pick(random, [2, 3, -2, -3, -1, 4])
        const degree = levelIndex === 0 ? 2 : 3
        const pattern: Array<number | null> = [1, ...Array.from({ length: degree }, () => randomInt(random, -6, 6))]
        // Where k goes: the constant term (level 1), the x term (level 2), any but the first (level 3)
        const slot = levelIndex === 0 ? degree : levelIndex === 1 ? degree - 1 : randomInt(random, 1, degree)
        pattern[slot] = null
        const power = degree - slot
        const rest = valueAt(pattern.map((coefficient) => coefficient ?? 0), root)
        const weight = root ** power
        if (rest % weight !== 0) continue
        const k = -rest / weight
        if (k < K_MIN || k > K_MAX || k === 0) continue
        return { pattern, root, k }
    }
}

export const createDivisibleRounds = (random: Random, levelIndex: number) => Array.from({ length: DIVISIBLE_ROUNDS }, () => createDivisibleRound(random, levelIndex))

export function divisibleStars(score: number): Stars {
    if (score >= 5) return 3
    if (score >= 4) return 2
    if (score >= 3) return 1
    return 0
}

/* ---------- Simplify the fraction ---------- */

export const SIMPLIFY_ROUNDS = 6

export interface SimplifyRound {
    numerator: Coefficients
    denominator: Coefficients
    /** The common root and the two that stay */
    common: number
    top: number
    bottom: number
    options: string[]
    right: number
}

const fractionLatex = (top: string, bottom: string) => `\\frac{${top}}{${bottom}}`

export function createSimplifyRound(random: Random, levelIndex: number): SimplifyRound {
    for (;;) {
        const common = randomInt(random, -5, 5)
        const top = randomInt(random, -5, 5)
        const bottom = randomInt(random, -5, 5)
        if (new Set([common, top, bottom]).size < 3 || top === -bottom || common === 0 || bottom === 0) continue
        // Only level 3 has a factor x in the numerator: x² − 3x = x(x − 3)
        if (top === 0 && levelIndex < 2) continue
        const numerator = fromRoots(1, [common, top])
        const denominator = fromRoots(levelIndex === 0 ? 1 : pick(random, [1, 2]), [common, bottom])
        if (denominator[0] !== 1 && levelIndex === 0) continue
        const lead = denominator[0]
        const right = fractionLatex(binomialLatex(top), lead === 1 ? binomialLatex(bottom) : `${lead}(${binomialLatex(bottom)})`)
        // The usual wrong ones: the x² cancelled, the signs swapped, the x cancelled
        const cancelSquares = fractionLatex(polyLatex(numerator.slice(1)), polyLatex(denominator.slice(1)))
        const signs = fractionLatex(binomialLatex(-top), lead === 1 ? binomialLatex(-bottom) : `${lead}(${binomialLatex(-bottom)})`)
        const cancelX = fractionLatex(String(-top), String(-bottom * lead))
        const options = shuffle(random, [right, cancelSquares, signs, cancelX])
        if (new Set(options).size < 4) continue
        return { numerator, denominator, common, top, bottom, options, right: options.indexOf(right) }
    }
}

export const createSimplifyRounds = (random: Random, levelIndex: number) => Array.from({ length: SIMPLIFY_ROUNDS }, () => createSimplifyRound(random, levelIndex))

export function simplifyStars(score: number): Stars {
    if (score >= 6) return 3
    if (score >= 5) return 2
    if (score >= 3) return 1
    return 0
}
