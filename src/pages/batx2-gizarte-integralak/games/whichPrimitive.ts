import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J1 · Zein da jatorrizkoa? (¿Qué primitiva es?): a function and four
   candidates; the learner picks the antiderivative (checking by
   differentiating). Level 1, powers and sums: the wrong ones forget to
   divide, give the derivative or lower the exponent. Level 2, e^{kx} and
   k/x: the 1/k forgotten, the power rule on 1/x. Level 3, the chain:
   f′·fⁿ and f′/f with the inside derivative left in or the n + 1 lost.
   Each candidate carries its function, so the test can differentiate it.
   ========================================================================== */

export const WHICH_PRIMITIVE_ROUNDS = 6

export interface Candidate {
    latex: string
    fn: (x: number) => number
}

export interface WhichPrimitiveRound {
    latex: string
    f: (x: number) => number
    options: Candidate[]
    answer: number
    working: string
}

const coefficient = (value: number) => (value === 1 ? '' : value === -1 ? '-' : String(value))

function round(random: Random, latex: string, f: (x: number) => number, right: Candidate, wrong: Candidate[], working: string): WhichPrimitiveRound | null {
    const all = [right, ...wrong]
    if (new Set(all.map((item) => item.latex)).size !== 4) return null
    const options = shuffle(random, all)
    return { latex, f, options, answer: options.indexOf(right), working }
}

/** Level 1: a xⁿ + b */
function powerRound(random: Random): WhichPrimitiveRound | null {
    const n = randomInt(random, 1, 4)
    const k = randomInt(random, 1, 4)
    const a = k * (n + 1)
    const b = randomInt(random, 1, 6)
    const latex = `${a}x^{${n}}+${b}`.replace('x^{1}', 'x')
    const power = (c: number, e: number) => (e === 1 ? `${coefficient(c)}x` : `${coefficient(c)}x^{${e}}`)
    return round(random, latex, (x) => a * x ** n + b,
        { latex: `${power(k, n + 1)}+${b}x+C`, fn: (x) => k * x ** (n + 1) + b * x },
        [
            { latex: `${power(a, n + 1)}+${b}x+C`, fn: (x) => a * x ** (n + 1) + b * x },
            { latex: n === 1 ? `${a}+C` : `${power(a * n, n - 1)}+C`, fn: (x) => a * n * x ** (n - 1) },
            { latex: `${power(k, n + 1)}+C`, fn: (x) => k * x ** (n + 1) }
        ],
        `\\frac{${a}x^{${n + 1}}}{${n + 1}}=${power(k, n + 1)}`.replace('x^{1}', 'x'))
}

/** Level 2: k e^{mx} + c/x */
function expLogRound(random: Random): WhichPrimitiveRound | null {
    const m = pick(random, [2, 3, 4, 5])
    const k = m * randomInt(random, 1, 3)
    const c = randomInt(random, 1, 6)
    const kk = k / m
    const latex = `${k}e^{${m}x}+\\frac{${c}}{x}`
    return round(random, latex, (x) => k * Math.exp(m * x) + c / x,
        { latex: `${coefficient(kk)}e^{${m}x}+${c}\\ln|x|+C`, fn: (x) => kk * Math.exp(m * x) + c * Math.log(Math.abs(x)) },
        [
            { latex: `${k}e^{${m}x}+${c}\\ln|x|+C`, fn: (x) => k * Math.exp(m * x) + c * Math.log(Math.abs(x)) },
            { latex: `${coefficient(kk)}e^{${m}x}-\\frac{${c}}{x^2}+C`, fn: (x) => kk * Math.exp(m * x) - c / (x * x) },
            { latex: `${k * m}e^{${m}x}+${c}\\ln|x|+C`, fn: (x) => k * m * Math.exp(m * x) + c * Math.log(Math.abs(x)) }
        ],
        `\\int ${k}e^{${m}x}\\,dx=${coefficient(kk)}e^{${m}x}`)
}

/** Level 3: the chain, 2x(x² + a)ⁿ or 2x/(x² + a) */
function chainRound(random: Random): WhichPrimitiveRound | null {
    const a = randomInt(random, 1, 6)
    if (randomInt(random, 0, 1) === 0) {
        const n = randomInt(random, 2, 4)
        const inner = (x: number) => x * x + a
        return round(random, `2x(x^2+${a})^{${n}}`, (x) => 2 * x * inner(x) ** n,
            { latex: `\\frac{(x^2+${a})^{${n + 1}}}{${n + 1}}+C`, fn: (x) => inner(x) ** (n + 1) / (n + 1) },
            [
                { latex: `\\frac{2x(x^2+${a})^{${n + 1}}}{${n + 1}}+C`, fn: (x) => (2 * x * inner(x) ** (n + 1)) / (n + 1) },
                { latex: `(x^2+${a})^{${n + 1}}+C`, fn: (x) => inner(x) ** (n + 1) },
                { latex: `\\frac{(x^2+${a})^{${n - 1}}}{${n - 1}}+C`, fn: (x) => inner(x) ** (n - 1) / (n - 1) }
            ],
            `u=x^2+${a}\\qquad u'=2x\\ \\to\\ \\frac{u^{${n + 1}}}{${n + 1}}`)
    }
    return round(random, `\\frac{2x}{x^2+${a}}`, (x) => (2 * x) / (x * x + a),
        { latex: `\\ln(x^2+${a})+C`, fn: (x) => Math.log(x * x + a) },
        [
            { latex: `2x\\ln(x^2+${a})+C`, fn: (x) => 2 * x * Math.log(x * x + a) },
            { latex: `\\frac{1}{x^2+${a}}+C`, fn: (x) => 1 / (x * x + a) },
            { latex: `x^2\\ln(x^2+${a})+C`, fn: (x) => x * x * Math.log(x * x + a) }
        ],
        `(x^2+${a})'=2x\\ \\to\\ \\ln(x^2+${a})`)
}

/** Six rounds of a level, no function twice */
export function createWhichPrimitiveRounds(random: Random, levelIndex: number): WhichPrimitiveRound[] {
    const generator = [powerRound, expLogRound, chainRound][levelIndex] ?? powerRound
    const rounds: WhichPrimitiveRound[] = []
    for (let tries = 0; rounds.length < WHICH_PRIMITIVE_ROUNDS && tries < 3000; tries += 1) {
        const next = generator(random)
        if (next && !rounds.some((other) => other.latex === next.latex)) rounds.push(next)
    }
    if (rounds.length < WHICH_PRIMITIVE_ROUNDS) throw new Error('No primitive rounds')
    return rounds
}
