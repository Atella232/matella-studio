import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J1 · Eta epe luzera? (¿Y a la larga?): a function and where x goes; the
   learner picks, from four cards, what it does in the long run: a number,
   0, +∞ or −∞. Level 1: polynomials and exponentials at +∞ (the sign of
   the leading term, aˣ with a > 1 or 0 < a < 1); level 2: quotients by
   degrees and average costs at +∞; level 3: towards −∞ (even and odd
   degree, aˣ on the left) and roots at +∞. The wrong cards are the typical
   mistakes: ∞/∞ = 1, the top coefficient alone, the other infinity, the
   start value, √(a²x²) read as a²x.
   ========================================================================== */

export const LONG_ROUNDS = 6

export interface LongRound {
    /** The function, in LaTeX */
    latex: string
    /** Where x goes */
    toward: '+' | '-'
    /** The right card, in LaTeX */
    answer: string
    options: string[]
    /** One line of working, in LaTeX */
    working: string
}

const INF = '+\\infty'
const MINUS_INF = '-\\infty'

function gcd(a: number, b: number): number {
    return b === 0 ? Math.abs(a) : gcd(b, a % b)
}

/** A fraction in LaTeX, reduced, with its sign in front */
export function ratioLatex(top: number, bottom: number): string {
    const sign = top * bottom < 0 ? '-' : ''
    const g = gcd(top, bottom)
    const p = Math.abs(top / g)
    const q = Math.abs(bottom / g)
    return q === 1 ? `${sign}${p}` : `${sign}\\frac{${p}}{${q}}`
}

const power = (n: number) => (n === 1 ? 'x' : `x^${n}`)
const lead = (a: number, n: number) => `${a === 1 ? '' : a === -1 ? '-' : a}${power(n)}`
const term = (value: number, body: string) => (value === 0 ? '' : `${value < 0 ? '-' : '+'}${Math.abs(value) === 1 && body ? '' : Math.abs(value)}${body}`)
const dec = (value: number) => String(value).replace('.', '{,}')

function finish(latex: string, toward: '+' | '-', answer: string, wrong: string[], working: string, random: Random): LongRound | null {
    const options = [...new Set([answer, ...wrong])].slice(0, 4)
    if (options.length < 4) return null
    return { latex, toward, answer, options: shuffle(random, options), working }
}

/* ---------- Level 1: polynomials and exponentials at +∞ ---------- */

function polynomialRound(random: Random, toward: '+' | '-'): LongRound | null {
    const n = randomInt(random, 2, 4)
    const a = pick(random, [-3, -2, -1, 1, 2, 3])
    const b = randomInt(random, -40, 40)
    const c = randomInt(random, -20, 20)
    if (b === 0) return null
    // At −∞ an odd degree changes the sign of the leading term
    const sign = toward === '+' || n % 2 === 0 ? Math.sign(a) : -Math.sign(a)
    const answer = sign > 0 ? INF : MINUS_INF
    const other = sign > 0 ? MINUS_INF : INF
    const latex = `${lead(a, n)}${term(b, power(n - 1))}${term(c, '')}`
    return finish(latex, toward, answer, [other, '0', String(a), String(c)], `${lead(a, n)}\\ \\to\\ ${answer}`, random)
}

function exponentialRound(random: Random, toward: '+' | '-'): LongRound | null {
    const base = pick(random, [2, 3, 5, 0.5, 0.2, 0.8])
    const k = randomInt(random, 2, 9)
    const c = randomInt(random, 1, 20)
    const grows = toward === '+' ? base > 1 : base < 1
    const answer = grows ? INF : String(c)
    const latex = `${c}+${k}\\cdot ${dec(base)}^x`
    const working = grows ? `${dec(base)}^x\\ \\to\\ ${INF}` : `${dec(base)}^x\\ \\to\\ 0\\qquad ${c}+0=${c}`
    return finish(latex, toward, answer, [grows ? String(c) : INF, String(c + k), '0', MINUS_INF], working, random)
}

/* ---------- Level 2: quotients by degrees at +∞ ---------- */

function quotientRound(random: Random): LongRound | null {
    const m = randomInt(random, 1, 3)
    const n = randomInt(random, 1, 3)
    const a = pick(random, [-6, -4, -3, -2, 2, 3, 4, 5, 6, 8, 9])
    const b = pick(random, [1, 2, 3, 4])
    const p = randomInt(random, -9, 9)
    const q = randomInt(random, 1, 9)
    if (p === 0) return null
    const latex = `\\frac{${lead(a, m)}${term(p, '')}}{${lead(b, n)}+${q}}`
    const answer = m === n ? ratioLatex(a, b) : m < n ? '0' : a > 0 ? INF : MINUS_INF
    const working = m === n ? `\\frac{${lead(a, m)}}{${lead(b, n)}}=${ratioLatex(a, b)}` : m < n ? `\\frac{${lead(a, m)}}{${lead(b, n)}}\\ \\to\\ 0` : `\\frac{${lead(a, m)}}{${lead(b, n)}}\\ \\to\\ ${answer}`
    // ∞/∞ = 1, the top coefficient alone, the ratio when the degrees differ, the other end
    return finish(latex, '+', answer, ['1', String(a), ratioLatex(a, b), '0', a > 0 ? INF : MINUS_INF, ratioLatex(p, q)].filter((item) => item !== answer), working, random)
}

function averageCostRound(random: Random): LongRound | null {
    const fixed = pick(random, [600, 900, 1200, 2000, 3000, 5000])
    const unit = randomInt(random, 3, 40)
    const latex = `\\frac{${fixed}+${unit}x}{x}`
    return finish(latex, '+', String(unit), [String(fixed), '0', INF, String(fixed + unit)], `\\frac{${fixed}}{x}+${unit}\\ \\to\\ ${unit}`, random)
}

/* ---------- Level 3: towards −∞ and roots ---------- */

function rootRound(random: Random): LongRound | null {
    const r = randomInt(random, 2, 5)
    const m = randomInt(random, 1, 4)
    const c = randomInt(random, 1, 9)
    const d = randomInt(random, 1, 9)
    const latex = `\\frac{\\sqrt{${r * r}x^2+${c}}}{${m === 1 ? '' : m}x+${d}}`
    const answer = ratioLatex(r, m)
    return finish(latex, '+', answer, [ratioLatex(r * r, m), INF, '0', ratioLatex(-r, m)], `\\frac{${r}x}{${m === 1 ? '' : m}x}=${answer}`, random)
}

const levelMakers: Array<Array<(random: Random) => LongRound | null>> = [
    [(random) => polynomialRound(random, '+'), (random) => exponentialRound(random, '+')],
    [quotientRound, quotientRound, averageCostRound],
    [(random) => polynomialRound(random, '-'), (random) => exponentialRound(random, '-'), rootRound]
]

/** Six different rounds of one level */
export function createLongRounds(random: Random, level: number): LongRound[] {
    const makers = levelMakers[level] ?? levelMakers[0]
    const rounds: LongRound[] = []
    for (let attempt = 0; rounds.length < LONG_ROUNDS && attempt < 5000; attempt += 1) {
        const round = pick(random, makers)(random)
        if (!round || rounds.some((other) => other.latex === round.latex)) continue
        rounds.push(round)
    }
    return rounds
}
