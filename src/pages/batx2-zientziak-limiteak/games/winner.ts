import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J1 · Nork irabazten du? (¿Quién gana?): the limit at +∞ of a quotient of
   two infinities; the learner says whether it is 0, a number or +∞. Every
   term is c · aˣ · xᵖ · (ln x)^q, and the order is decided by the base a
   first, then the power p, then the power of the logarithm q. Level 1:
   one term on top and one below; level 2: a smaller term added on each
   side (only the leading terms count); level 3: the traps (x¹⁰ against
   1,1ˣ, 2ˣ against 3ˣ, ln x⁵ against √x, e²ˣ against x³eˣ).
   ========================================================================== */

export type WinnerBin = 'zero' | 'number' | 'infinity'

export const WINNER_BINS: WinnerBin[] = ['zero', 'number', 'infinity']

export const WINNER_ROUNDS = 8

export interface Term {
    c: number
    /** The base of the exponential, 1 when there is none */
    base: number
    /** The power of x */
    p: number
    /** The power of ln x */
    q: number
    /** How to write it, when the usual way would not do (e^{2x}, \ln x^5) */
    latex?: string
}

export interface WinnerRound {
    top: Term[]
    bottom: Term[]
    /** The limit, for LaTeX */
    limit: string
    bin: WinnerBin
    /** The number, as LaTeX, when the bin is a number */
    value: string | null
    /** The leading terms, for the explanation */
    leading: [string, string]
}

const BASE_LATEX: Record<string, string> = { '2': '2^x', '3': '3^x', '1.1': '1{,}1^x', [String(Math.E)]: 'e^x' }

export function termLatex(term: Term, withCoefficient = true): string {
    if (term.latex) return withCoefficient && term.c !== 1 ? `${term.c}${term.latex}` : term.latex
    const parts: string[] = []
    if (term.p === 0.5) parts.push('\\sqrt{x}')
    else if (term.p === 1) parts.push('x')
    else if (term.p > 0) parts.push(`x^{${term.p}}`)
    if (term.q === 1) parts.push(parts.length ? '\\,\\ln x' : '\\ln x')
    if (term.base > 1) parts.push(BASE_LATEX[String(term.base)])
    const body = parts.join('') || '1'
    return withCoefficient && term.c !== 1 ? `${term.c}${body}` : body
}

const sumLatex = (terms: Term[]) => terms.map((term, index) => (index === 0 ? termLatex(term) : `+${termLatex(term)}`)).join('')

/** −1 when a is an infinity of lower order than b, 0 of the same, 1 of higher */
export function compareTerms(a: Term, b: Term): -1 | 0 | 1 {
    for (const key of ['base', 'p', 'q'] as const) {
        if (Math.abs(a[key] - b[key]) > 1e-12) return a[key] < b[key] ? -1 : 1
    }
    return 0
}

export const leadingTerm = (terms: Term[]) => terms.reduce((best, term) => (compareTerms(term, best) > 0 ? term : best))

function gcd(a: number, b: number): number {
    return b === 0 ? Math.abs(a) : gcd(b, a % b)
}

/** The bin and value of the quotient of two sums */
export function judge(top: Term[], bottom: Term[]): { bin: WinnerBin; value: string | null; ratio: [number, number] | null } {
    const a = leadingTerm(top)
    const b = leadingTerm(bottom)
    const order = compareTerms(a, b)
    if (order < 0) return { bin: 'zero', value: null, ratio: null }
    if (order > 0) return { bin: 'infinity', value: null, ratio: null }
    const g = gcd(a.c, b.c)
    const [n, d] = [a.c / g, b.c / g]
    return { bin: 'number', value: d === 1 ? String(n) : `\\frac{${n}}{${d}}`, ratio: [n, d] }
}

const t = (c: number, base: number, p: number, q = 0, latex?: string): Term => ({ c, base, p, q, ...(latex ? { latex } : {}) })

/** The infinities of the first two levels */
const SIMPLE: Term[] = [t(1, 1, 0, 1), t(1, 1, 0.5), t(1, 1, 1), t(1, 1, 2), t(1, 1, 3), t(1, 2, 0), t(1, Math.E, 0), t(1, 3, 0)]

const withC = (term: Term, c: number): Term => ({ ...term, c })

function simpleRound(random: Random): WinnerRound | null {
    const a = pick(random, SIMPLE)
    // A third of the rounds have the same order on both sides
    const b = randomInt(random, 0, 2) === 0 ? a : pick(random, SIMPLE)
    const top = [withC(a, randomInt(random, 1, 4))]
    const bottom = [withC(b, compareTerms(a, b) === 0 ? randomInt(random, 2, 5) : 1)]
    return make(top, bottom)
}

/** A smaller term added on each side: x^p plus a lower power or a logarithm, an exponential plus a power */
function sumRound(random: Random): WinnerRound | null {
    const leaders = SIMPLE.filter((term) => term.p >= 1 || term.base > 1)
    const a = pick(random, leaders)
    const b = randomInt(random, 0, 1) === 0 ? a : pick(random, leaders)
    const smaller = (lead: Term) => pick(random, SIMPLE.filter((term) => compareTerms(term, lead) < 0))
    const top = [withC(a, randomInt(random, 1, 5)), withC(smaller(a), randomInt(random, 1, 6))]
    const bottom = [withC(b, randomInt(random, 1, 4)), withC(smaller(b), randomInt(random, 1, 6))]
    if (top[0].c === bottom[0].c && compareTerms(a, b) === 0) return null
    return make(shuffle(random, top), shuffle(random, bottom))
}

/** The traps: what looks bigger at first is not what wins */
const TRAPS: Array<[Term[], Term[]]> = [
    [[t(1, 1, 10)], [t(1, 1.1, 0)]],
    [[t(1, 1, 100)], [t(1, Math.E, 0)]],
    [[t(1, 2, 0)], [t(1, 3, 0)]],
    [[t(1, 1, 0, 1, '\\ln x^5')], [t(1, 1, 0.5)]],
    [[t(1, Math.E ** 2, 0, 0, 'e^{2x}')], [t(1, Math.E, 3)]],
    [[t(1, 1, 2, 1)], [t(1, 1, 3)]],
    [[t(1, 1, 3)], [t(1, 1, 2, 1)]],
    [[t(1, 1.1, 0)], [t(1, 1, 50)]],
    [[t(1, 3, 0)], [t(1, 2, 3)]],
    [[t(2, 1, 1, 1)], [t(1, 1, 1), t(1, 1, 0, 1)]]
]

function trapRound(random: Random): WinnerRound | null {
    const [top, bottom] = pick(random, TRAPS)
    return make(top, bottom)
}

function make(top: Term[], bottom: Term[]): WinnerRound | null {
    const verdict = judge(top, bottom)
    const limit = `\\lim_{x\\to+\\infty}\\frac{${sumLatex(top)}}{${sumLatex(bottom)}}`
    return { top, bottom, limit, bin: verdict.bin, value: verdict.value, leading: [termLatex(leadingTerm(top)), termLatex(leadingTerm(bottom))] }
}

/** Eight rounds of a level, with every bin at least once and no limit twice */
export function createWinnerRounds(random: Random, levelIndex: number): WinnerRound[] {
    const generator = [simpleRound, sumRound, trapRound][levelIndex] ?? simpleRound
    for (let attempt = 0; attempt < 400; attempt += 1) {
        const rounds: WinnerRound[] = []
        for (let tries = 0; rounds.length < WINNER_ROUNDS && tries < 400; tries += 1) {
            const round = generator(random)
            if (round && !rounds.some((other) => other.limit === round.limit)) rounds.push(round)
        }
        const bins = new Set(rounds.map((round) => round.bin))
        if (rounds.length === WINNER_ROUNDS && (levelIndex === 2 || bins.size === 3)) return rounds
    }
    throw new Error('No winner rounds')
}
