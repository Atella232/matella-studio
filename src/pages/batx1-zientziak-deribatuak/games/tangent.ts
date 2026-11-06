import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J4 · Tangente exacta (Batxilergoa 1 · Zientziak, Deribatuak): a
   function and a point on it; the learner builds the tangent y = mx + n
   with two steppers and sees it on the graph before checking. Level 1:
   parabolas x² + bx + c; level 2: cubics and k/x; level 3: eˣ, e²ˣ, ln x,
   sin x, cos x, x·eˣ and ln(x + 1). Every m and n is a whole number
   between −9 and 9.
   ========================================================================== */

export const TANGENT_ROUNDS = 5
export const TANGENT_LIMIT = 9

export interface TangentRound {
    latex: string
    fn: (x: number) => number
    derivative: (x: number) => number
    a: number
    m: number
    n: number
}

const signed = (value: number) => (value === 0 ? '' : value > 0 ? `+${value}` : `-${-value}`)
const term = (coefficient: number, letter: string) => (coefficient === 0 ? '' : `${coefficient > 0 ? '+' : '-'}${Math.abs(coefficient) === 1 ? '' : Math.abs(coefficient)}${letter}`)

function finish(latex: string, fn: (x: number) => number, derivative: (x: number) => number, a: number): TangentRound | null {
    const m = derivative(a)
    const n = fn(a) - a * m
    const round = (value: number) => Math.round(value * 1e9) / 1e9
    if (!Number.isInteger(round(m)) || !Number.isInteger(round(n)) || Math.abs(m) > TANGENT_LIMIT || Math.abs(n) > TANGENT_LIMIT) return null
    // The steppers start at y = 0: that is never the answer
    if (round(m) === 0 && round(n) === 0) return null
    // Keep the point on the plane (−4 to 4)
    if (Math.abs(a) > 3 || Math.abs(fn(a)) > 3.5) return null
    return { latex, fn, derivative, a, m: round(m) + 0, n: round(n) + 0 }
}

function parabola(random: Random): TangentRound | null {
    const b = randomInt(random, -3, 3)
    const c = randomInt(random, -3, 3)
    const a = randomInt(random, -2, 2)
    return finish(`f(x)=x^2${term(b, 'x')}${signed(c)}`, (x) => x * x + b * x + c, (x) => 2 * x + b, a)
}

function cubicOrInverse(random: Random): TangentRound | null {
    if (random() < 0.5) {
        const p = randomInt(random, 0, 3)
        const c = randomInt(random, -2, 2)
        const a = pick(random, [-1, 1])
        return finish(`f(x)=x^3${term(-p, 'x')}${signed(c)}`, (x) => x ** 3 - p * x + c, (x) => 3 * x * x - p, a)
    }
    const k = pick(random, [-4, -2, 2, 4])
    const a = pick(random, [-2, -1, 1, 2])
    return finish(`f(x)=\\frac{${k}}{x}`.replace('\\frac{-', '-\\frac{'), (x) => k / x, (x) => -k / (x * x), a)
}

const ELEMENTARY: Array<{ latex: string; fn: (x: number) => number; derivative: (x: number) => number; a: number }> = [
    { latex: 'f(x)=e^x', fn: Math.exp, derivative: Math.exp, a: 0 },
    { latex: 'f(x)=e^{2x}', fn: (x) => Math.exp(2 * x), derivative: (x) => 2 * Math.exp(2 * x), a: 0 },
    { latex: 'f(x)=\\ln x', fn: Math.log, derivative: (x) => 1 / x, a: 1 },
    { latex: 'f(x)=\\ln(x+1)', fn: (x) => Math.log(x + 1), derivative: (x) => 1 / (x + 1), a: 0 },
    { latex: 'f(x)=\\sin x', fn: Math.sin, derivative: Math.cos, a: 0 },
    { latex: 'f(x)=\\cos x', fn: Math.cos, derivative: (x) => -Math.sin(x), a: 0 },
    { latex: 'f(x)=x\\,e^x', fn: (x) => x * Math.exp(x), derivative: (x) => (1 + x) * Math.exp(x), a: 0 },
    { latex: 'f(x)=\\sin(2x)', fn: (x) => Math.sin(2 * x), derivative: (x) => 2 * Math.cos(2 * x), a: 0 },
    { latex: 'f(x)=3-e^x', fn: (x) => 3 - Math.exp(x), derivative: (x) => -Math.exp(x), a: 0 }
]

function elementary(random: Random): TangentRound | null {
    const item = pick(random, ELEMENTARY)
    return finish(item.latex, item.fn, item.derivative, item.a)
}

export function createTangentRounds(random: Random, levelIndex: number): TangentRound[] {
    const make = [parabola, cubicOrInverse, elementary][levelIndex] ?? parabola
    const rounds: TangentRound[] = []
    for (let attempt = 0; rounds.length < TANGENT_ROUNDS && attempt < 4000; attempt += 1) {
        const next = make(random)
        if (!next || rounds.some((other) => other.latex === next.latex && other.a === next.a)) continue
        rounds.push(next)
    }
    return rounds
}

/** The tangent in LaTeX: y = mx + n */
export function tangentLatex(m: number, n: number): string {
    const slope = m === 0 ? '' : m === 1 ? 'x' : m === -1 ? '-x' : `${m}x`
    if (!slope) return `y=${n}`
    return `y=${slope}${signed(n)}`
}
