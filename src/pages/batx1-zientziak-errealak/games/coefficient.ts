import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J2 · Koefiziente ezkutua (El coeficiente escondido): the expansion of
   (a x + b)ⁿ with one coefficient hidden; the learner writes it. Level 1:
   (x + 1)ⁿ, so the coefficients are a row of Tartaglia; level 2: (x ± b)ⁿ,
   with the powers of b and their signs; level 3: (a x + b)ⁿ, both powers.
   The term with x^(n−k) has C(n, k) · a^(n−k) · b^k as coefficient.
   ========================================================================== */

export const COEFFICIENT_ROUNDS = 5

export interface CoefficientRound {
    a: number
    b: number
    n: number
    /** The hidden term is the one with b^k, that is x^(n−k) */
    k: number
}

export function binomial(n: number, k: number): number {
    let value = 1
    for (let i = 1; i <= k; i += 1) value = (value * (n - k + i)) / i
    return Math.round(value)
}

/** The coefficient of x^(n−k) in (a x + b)ⁿ */
export const coefficientOf = ({ a, b, n }: Pick<CoefficientRound, 'a' | 'b' | 'n'>, k: number) => binomial(n, k) * a ** (n - k) * b ** k
export const hiddenCoefficient = (round: CoefficientRound) => coefficientOf(round, round.k)

/** A term of the expansion in LaTeX, with its sign in front (except the first) */
export function termLatex(coefficient: number, power: number, first: boolean, hidden = false): string {
    const sign = coefficient < 0 ? '-' : first ? '' : '+'
    const size = Math.abs(coefficient)
    const x = power === 0 ? '' : power === 1 ? 'x' : `x^{${power}}`
    const number = hidden ? '\\square ' : size === 1 && power > 0 ? '' : String(size)
    // The hidden coefficient keeps no sign of its own: the learner writes it with its sign
    if (hidden) return `${first ? '' : '+'}${number}${x}`
    return `${sign}${number}${x}`
}

/** (a x + b)ⁿ = … with the hidden coefficient as a box */
export function expansionLatex(round: CoefficientRound): string {
    const terms = Array.from({ length: round.n + 1 }, (_, k) => termLatex(coefficientOf(round, k), round.n - k, k === 0, k === round.k))
    return terms.join('')
}

export function binomialLatex({ a, b, n }: Pick<CoefficientRound, 'a' | 'b' | 'n'>): string {
    const ax = a === 1 ? 'x' : `${a}x`
    return `(${ax}${b < 0 ? '-' : '+'}${Math.abs(b)})^{${n}}`
}

function makeRound(random: Random, level: number): CoefficientRound {
    if (level === 0) {
        const n = randomInt(random, 3, 6)
        return { a: 1, b: 1, n, k: randomInt(random, 1, n - 1) }
    }
    if (level === 1) {
        const n = randomInt(random, 3, 5)
        return { a: 1, b: pick(random, [-3, -2, 2, 3]), n, k: randomInt(random, 1, n - 1) }
    }
    const n = randomInt(random, 3, 5)
    return { a: pick(random, [2, 3]), b: pick(random, [-2, -1, 1, 2]), n, k: randomInt(random, 1, n - 1) }
}

/** Five different rounds of one level, with coefficients small enough to work out by hand */
export function createCoefficientRounds(random: Random, level: number): CoefficientRound[] {
    const rounds: CoefficientRound[] = []
    for (let attempt = 0; rounds.length < COEFFICIENT_ROUNDS && attempt < 1000; attempt += 1) {
        const round = makeRound(random, level)
        if (Math.abs(hiddenCoefficient(round)) > 1000) continue
        if (rounds.some((other) => other.a === round.a && other.b === round.b && other.n === round.n && other.k === round.k)) continue
        rounds.push(round)
    }
    return rounds
}

/** x − a written the usual way: x − 3, x + 2 or just x */
export const xMinus = (a: number) => (a === 0 ? 'x' : a > 0 ? `x-${a}` : `x+${-a}`)

/** The answer typed by the learner: a whole number, with − or - for the sign */
export function readCoefficient(input: string): number | null {
    const text = input.trim().replace(/[−–]/g, '-').replace(/\s/g, '')
    return /^[-+]?\d+$/.test(text) ? Number(text) : null
}
