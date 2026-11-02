import { pick, randomInt, shuffle, type Random } from '../../features/unit-v2/games/random.ts'

/* ==========================================================================
   The powers games of 4. DBH academic:
   · Simplify the radical: ⁿ√N (or a sum of square roots) as a·ⁿ√b; set a
     and b. Then the prime factors of N group in n's and leave the root.
     Level 1: square roots; level 2: cube and fourth roots; level 3: sums
     and differences of square roots.
   · Find the exponent: logarithms. Level 1: log_b N with N a power of b;
     level 2: negative and fractional exponents (1/8, 0,01, √2); level 3:
     the base or the argument is the unknown. A ladder of powers of b
     appears after checking.
   ========================================================================== */

/* ---------- Simplify the radical ---------- */

export const RADICAL_ROUNDS = 5

export interface RadicalTerm { sign: 1 | -1; coefficient: number; radicand: number }
export interface RadicalRound {
    index: 2 | 3 | 4
    terms: RadicalTerm[]
    outside: number
    inside: number
}

/** Prime factors in increasing order: 72 → [2, 2, 2, 3, 3] */
export function primeFactors(value: number): number[] {
    const factors: number[] = []
    let rest = value
    for (let prime = 2; prime * prime <= rest; prime += 1) {
        while (rest % prime === 0) {
            factors.push(prime)
            rest /= prime
        }
    }
    if (rest > 1) factors.push(rest)
    return factors
}

/** ⁿ√N = a·ⁿ√b with b free of n-th powers */
export function simplify(radicand: number, index: number): { outside: number; inside: number } {
    let outside = 1
    let inside = 1
    const counts = new Map<number, number>()
    for (const prime of primeFactors(radicand)) counts.set(prime, (counts.get(prime) ?? 0) + 1)
    for (const [prime, count] of counts) {
        outside *= prime ** Math.floor(count / index)
        inside *= prime ** (count % index)
    }
    return { outside, inside }
}

const FREE: Record<2 | 3 | 4, number[]> = { 2: [2, 3, 5, 6, 7, 10, 11], 3: [2, 3, 4, 5, 6, 7, 9, 10], 4: [2, 3, 5, 6, 8] }

export function createRadicalRound(random: Random, levelIndex: number): RadicalRound {
    for (;;) {
        if (levelIndex < 2) {
            const index = levelIndex === 0 ? 2 : pick(random, [3, 3, 4] as const)
            const k = randomInt(random, 2, index === 2 ? 6 : index === 3 ? 4 : 3)
            const free = pick(random, FREE[index])
            const radicand = k ** index * free
            if (radicand > (index === 2 ? 300 : 700)) continue
            return { index, terms: [{ sign: 1, coefficient: 1, radicand }], outside: k, inside: free }
        }
        const free = pick(random, [2, 3, 5, 6])
        const [k1, k2] = [randomInt(random, 1, 5), randomInt(random, 2, 5)]
        if (k1 === k2) continue
        const [c1, c2] = [pick(random, [1, 1, 2, 3]), pick(random, [1, 1, 2])]
        const sign = pick(random, [1, -1] as const)
        const outside = c1 * k1 + sign * c2 * k2
        const terms: RadicalTerm[] = shuffle(random, [{ sign: 1 as const, coefficient: c1, radicand: k1 * k1 * free }, { sign: 1 as const, coefficient: c2, radicand: k2 * k2 * free }])
        // The second term carries the sign; both radicands must need simplifying or be the bare √b
        terms[1] = { ...terms[1], sign }
        const value = terms.reduce((sum, term) => sum + term.sign * term.coefficient * Math.sqrt(term.radicand), 0)
        // At least 2 outside, so the steppers (1 and the first radicand) never start on the answer
        if (outside < 2 || Math.abs(value - outside * Math.sqrt(free)) > 1e-9) continue
        if (terms.every((term) => term.radicand === free) || terms.some((term) => term.radicand > 200)) continue
        return { index: 2, terms, outside: Math.round(value / Math.sqrt(free)), inside: free }
    }
}

export const createRadicalRounds = (random: Random, levelIndex: number) => Array.from({ length: RADICAL_ROUNDS }, () => createRadicalRound(random, levelIndex))

const root = (index: number, radicand: string) => (index === 2 ? `\\sqrt{${radicand}}` : `\\sqrt[${index}]{${radicand}}`)
export const radicalLatex = (index: number, outside: number, inside: number) => (inside === 1 ? String(outside) : `${outside === 1 ? '' : outside}${root(index, String(inside))}`)
export function expressionLatex(round: RadicalRound): string {
    return round.terms.map((term, position) => `${position === 0 ? '' : term.sign < 0 ? '-' : '+'}${term.coefficient === 1 ? '' : term.coefficient}${root(round.index, String(term.radicand))}`).join('')
}

/* ---------- Find the exponent ---------- */

export const LOG_ROUNDS = 5

export type LogUnknown = 'exponent' | 'base' | 'argument'
/** An exponent as a fraction: −1/2 → [−1, 2] */
export type Exponent = [number, number]

export interface LogRound {
    base: number
    exponent: Exponent
    unknown: LogUnknown
}

/** The exponents the level-2 stepper goes through */
export const EXPONENT_STEPS: Exponent[] = [[-4, 1], [-3, 1], [-2, 1], [-1, 1], [-1, 2], [-1, 3], [0, 1], [1, 3], [1, 2], [2, 3], [1, 1], [3, 2], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1]]

export const exponentValue = ([numerator, denominator]: Exponent) => numerator / denominator
export const powerValue = (base: number, exponent: Exponent) => base ** exponentValue(exponent)

/** b^e in LaTeX as a number: 8, \frac{1}{8}, 2 (for 4^{1/2}), \sqrt{2}, \sqrt[3]{25}, 0{,}01 */
export function argumentLatex(base: number, [numerator, denominator]: Exponent): string {
    const size = base ** (Math.abs(numerator) / denominator)
    const whole = Math.abs(size - Math.round(size)) < 1e-9
    const power = base ** Math.abs(numerator)
    const shown = whole ? String(Math.round(size)) : denominator === 2 ? `\\sqrt{${power}}` : `\\sqrt[${denominator}]{${power}}`
    if (numerator >= 0) return shown
    if (base === 10 && whole) return `0{,}${'0'.repeat(-numerator - 1)}1`
    return `\\frac{1}{${shown}}`
}

export const exponentLatex = ([numerator, denominator]: Exponent) => (denominator === 1 ? String(numerator) : `${numerator < 0 ? '-' : ''}\\frac{${Math.abs(numerator)}}{${denominator}}`)

export function createLogRound(random: Random, levelIndex: number): LogRound {
    if (levelIndex === 0) {
        const base = pick(random, [2, 3, 5, 10])
        const top = base === 2 ? 6 : base === 3 ? 5 : 4
        return { base, exponent: [randomInt(random, 1, top), 1], unknown: 'exponent' }
    }
    if (levelIndex === 1) {
        const base = pick(random, [2, 3, 4, 5, 10])
        const exponent = pick(random, EXPONENT_STEPS.filter(([numerator, denominator]) => (numerator < 0 || denominator > 1) && Math.abs(numerator) <= (base === 10 ? 3 : base > 3 ? 2 : 4) && !(base === 10 && denominator > 1)))
        return { base, exponent, unknown: 'exponent' }
    }
    const unknown = pick(random, ['base', 'argument'] as const)
    const base = pick(random, [2, 3, 4, 5, 6, 10])
    const exponent: Exponent = [randomInt(random, 2, base === 2 ? 6 : base <= 4 ? 4 : 3), 1]
    return { base, exponent, unknown }
}

export function createLogRounds(random: Random, levelIndex: number): LogRound[] {
    const rounds: LogRound[] = []
    while (rounds.length < LOG_ROUNDS) {
        const round = createLogRound(random, levelIndex)
        if (rounds.some((other) => other.base === round.base && exponentValue(other.exponent) === exponentValue(round.exponent))) continue
        rounds.push(round)
    }
    return rounds
}

/** The question: log_b N = ? (or log_x N = e, or log_b x = e) */
export function logQuestionLatex({ base, exponent, unknown }: LogRound): string {
    if (unknown === 'base') return `\\log_{x}${argumentLatex(base, exponent)}=${exponentLatex(exponent)}`
    if (unknown === 'argument') return `\\log_{${base}}x=${exponentLatex(exponent)}`
    return `\\log_{${base}}${argumentLatex(base, exponent)}=\\ ?`
}
