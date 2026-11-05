import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J1 · Nora doa? (¿Hacia dónde va?): a sequence is shown and the learner
   says where it goes: to a number, to +∞, to −∞, or nowhere (it
   oscillates). Level 1: quotients of polynomials (compare the degrees);
   level 2: powers rⁿ, signs and (−1)ⁿ; level 3: the number e, in
   (1 + k/n)ⁿ and its relatives. The three wrong options are the typical
   mistakes: the quotient upside down, the constant terms, 0 for every
   quotient, 1 or k·e for the powers of e.
   ========================================================================== */

export const WHERE_ROUNDS = 6

/** Where a sequence goes: a limit in LaTeX, ±∞, or none (it oscillates) */
export type Destination = string
export const PLUS = '+\\infty'
export const MINUS = '-\\infty'
export const NONE = 'none'

export type WhereKind = 'same-degree' | 'lower-degree' | 'higher-degree' | 'power-small' | 'power-big' | 'power-negative' | 'alternating' | 'alternating-small' | 'polynomial' | 'e-k' | 'e-times' | 'e-root'

export interface WhereRound {
    kind: WhereKind
    /** The general term, in LaTeX */
    latex: string
    answer: Destination
    options: Destination[]
    /** Numbers the verdict and the tests use */
    meta: Record<string, number>
}

const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b))
/** p/q in LaTeX, simplified, with the sign in front */
export function fractionLatex(p: number, q: number): string {
    const divisor = gcd(p, q) * Math.sign(q)
    const [top, bottom] = [p / divisor, q / divisor]
    if (bottom === 1) return String(top)
    return `${top < 0 ? '-' : ''}\\frac{${Math.abs(top)}}{${bottom}}`
}

/** c·nᵖ written as a term: 3n^{2}, -n, 5 */
function monomial(c: number, power: number, first: boolean): string {
    const sign = c < 0 ? '-' : first ? '' : '+'
    const size = Math.abs(c)
    const n = power === 0 ? '' : power === 1 ? 'n' : `n^${power}`
    return `${sign}${size === 1 && power > 0 ? '' : size}${n}`
}
const polynomial = (lead: number, power: number, rest: number) => `${monomial(lead, power, true)}${rest === 0 ? '' : monomial(rest, 0, false)}`

/** The right destination and three different wrong ones */
function round(random: Random, kind: WhereKind, latex: string, answer: Destination, wrong: Destination[], meta: Record<string, number>): WhereRound | null {
    const others = [...new Set(wrong.filter((item) => item !== answer))]
    if (others.length < 3) return null
    return { kind, latex, answer, options: shuffle(random, [answer, ...others.slice(0, 3)]), meta }
}

function quotientRound(random: Random): WhereRound | null {
    const kind = pick<WhereKind>(random, ['same-degree', 'lower-degree', 'higher-degree'])
    const a = pick(random, [-3, -2, 1, 2, 3, 4, 5, 6])
    const b = pick(random, [1, 2, 3, 4])
    const c = randomInt(random, -5, 7)
    const d = randomInt(random, 1, 9)
    const p = kind === 'lower-degree' ? 1 : 2
    const q = kind === 'higher-degree' ? 1 : 2
    const latex = `\\frac{${polynomial(a, p, c)}}{${polynomial(b, q, d)}}`
    const ratio = fractionLatex(a, b)
    if (kind === 'same-degree') return round(random, kind, latex, ratio, [fractionLatex(b, a), c === 0 ? fractionLatex(a + 1, b) : fractionLatex(c, d), '0', a > 0 ? PLUS : MINUS], { a, b, c, d, p, q })
    if (kind === 'lower-degree') return round(random, kind, latex, '0', [ratio, a > 0 ? PLUS : MINUS, fractionLatex(b, a)], { a, b, c, d, p, q })
    return round(random, kind, latex, a > 0 ? PLUS : MINUS, [ratio, '0', a > 0 ? MINUS : PLUS], { a, b, c, d, p, q })
}

function powerRound(random: Random): WhereRound | null {
    const kind = pick<WhereKind>(random, ['power-small', 'power-big', 'power-negative', 'alternating', 'alternating-small', 'polynomial'])
    if (kind === 'power-small') {
        const [top, bottom] = pick(random, [[1, 2], [2, 3], [3, 4], [1, 3], [4, 5]])
        const c = randomInt(random, 2, 9)
        return round(random, kind, `${c}\\cdot\\left(\\frac{${top}}{${bottom}}\\right)^n`, '0', [String(c), PLUS, NONE], { c, top, bottom })
    }
    if (kind === 'power-big') {
        const r = pick(random, [2, 3, 5])
        const c = pick(random, [-4, -3, -2, 2, 3, 4])
        return round(random, kind, `${c}\\cdot ${r}^n`, c > 0 ? PLUS : MINUS, [c > 0 ? MINUS : PLUS, String(c), NONE], { c, r })
    }
    if (kind === 'power-negative') {
        const r = pick(random, [2, 3])
        return round(random, kind, `(-${r})^n`, NONE, [PLUS, MINUS, '0'], { r })
    }
    if (kind === 'alternating') {
        const c = randomInt(random, 2, 7)
        return round(random, kind, `(-1)^n\\cdot ${c}`, NONE, [String(c), '0', PLUS], { c })
    }
    if (kind === 'alternating-small') {
        const l = randomInt(random, 1, 6)
        return round(random, kind, `${l}+\\frac{(-1)^n}{n}`, String(l), [NONE, '0', String(l + 1)], { l })
    }
    const c = randomInt(random, 2, 9)
    const minus = randomInt(random, 0, 1) === 1
    return minus
        ? round(random, kind, `${c}n-n^2`, MINUS, [PLUS, String(c), '0'], { c, sign: -1 })
        : round(random, kind, `n^2-${c}n`, PLUS, [MINUS, String(-c), '0'], { c, sign: 1 })
}

function eRound(random: Random): WhereRound | null {
    const kind = pick<WhereKind>(random, ['e-k', 'e-times', 'e-root'])
    if (kind === 'e-k') {
        const k = randomInt(random, 2, 5)
        return round(random, kind, `\\left(1+\\frac{${k}}{n}\\right)^n`, `e^{${k}}`, [`${k}e`, 'e', '1', PLUS], { k })
    }
    if (kind === 'e-times') {
        const k = randomInt(random, 2, 4)
        return round(random, kind, `\\left(1+\\frac{1}{n}\\right)^{${k}n}`, `e^{${k}}`, [`${k}e`, 'e', '1', PLUS], { k })
    }
    const k = randomInt(random, 2, 4)
    return round(random, kind, `\\left(1+\\frac{1}{${k}n}\\right)^n`, `e^{\\frac{1}{${k}}}`, [`\\frac{e}{${k}}`, 'e', '1', '0'], { k })
}

const makers = [quotientRound, powerRound, eRound]

/** Six rounds of one level, all with a different sequence */
export function createWhereRounds(random: Random, level: number): WhereRound[] {
    const rounds: WhereRound[] = []
    const make = makers[level] ?? makers[0]
    for (let attempt = 0; rounds.length < WHERE_ROUNDS && attempt < 2000; attempt += 1) {
        const next = make(random)
        if (!next || rounds.some((other) => other.latex === next.latex)) continue
        // Not too many of the same kind in a row
        if (rounds.length >= 2 && rounds.slice(-2).every((other) => other.kind === next.kind)) continue
        rounds.push(next)
    }
    return rounds
}
