import { pick, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J3 · Deriva la función integral / Deribatu funtzio integrala: F(x) is an
   integral whose limits depend on x, and three candidates for F′(x).
   Level 1, ∫ₐˣ f(t) dt: F′ = f(x); the wrong ones are f′(x) (the inside
   differentiated) and f(x) − f(a) (the bottom limit subtracted). Level 2,
   ∫ₐ^g(x) f(t) dt: F′ = f(g(x))·g′(x); the wrong ones forget g′ or put x
   instead of g(x). Level 3, ∫ from h(x) to g(x): F′ = f(g)·g′ − f(h)·h′;
   the wrong ones add instead of subtracting or forget the bottom limit.
   Every option keeps its function of x, and the round keeps f, g and h,
   so the tests can differentiate F numerically.
   ========================================================================== */

export const DERIVE_ROUNDS = 6

export interface Limit {
    latex: string
    /** Its derivative as LaTeX */
    d: string
    fn: (x: number) => number
    dfn: (x: number) => number
    /** Simple enough to go after cos or ln without brackets */
    simple: boolean
}

export interface Inner {
    /** f(t) as LaTeX with u in place of t */
    at: (u: string, simple: boolean) => string
    fn: (t: number) => number
    /** f′(x) as LaTeX, for level 1 */
    d: string
    dfn: (x: number) => number
    /** The bottom limit used at level 1 and f(a) as LaTeX (never 0, so that f(x) − f(a) differs from f(x)) */
    a: number
    fa: string
    /** Only for limits that stay where f is defined (ln needs t > 0) */
    positive?: boolean
}

export interface DeriveRound {
    F: string
    options: string[]
    answer: number
    /** The rule, worked out */
    worked: string
    f: (t: number) => number
    low: (x: number) => number
    high: (x: number) => number
    fns: Array<(x: number) => number>
}

const X: Limit = { latex: 'x', d: '1', fn: (x) => x, dfn: () => 1, simple: true }
const G: Limit[] = [
    { latex: 'x^2', d: '2x', fn: (x) => x * x, dfn: (x) => 2 * x, simple: true },
    { latex: 'x^3', d: '3x^2', fn: (x) => x ** 3, dfn: (x) => 3 * x * x, simple: true },
    { latex: '2x', d: '2', fn: (x) => 2 * x, dfn: () => 2, simple: true },
    { latex: '3x+1', d: '3', fn: (x) => 3 * x + 1, dfn: () => 3, simple: false },
    { latex: '\\sqrt{x}', d: '\\frac{1}{2\\sqrt{x}}', fn: (x) => Math.sqrt(x), dfn: (x) => 1 / (2 * Math.sqrt(x)), simple: true }
]

const INNER: Inner[] = [
    { at: (u) => `\\sqrt{1+${u}}`, fn: (t) => Math.sqrt(1 + t), d: '\\frac{1}{2\\sqrt{1+x}}', dfn: (x) => 1 / (2 * Math.sqrt(1 + x)), a: 0, fa: '1' },
    { at: (u) => `\\frac{1}{1+${u}}`, fn: (t) => 1 / (1 + t), d: '-\\frac{1}{(1+x)^2}', dfn: (x) => -1 / (1 + x) ** 2, a: 0, fa: '1' },
    { at: (u) => `e^{${u}}`, fn: (t) => Math.exp(t), d: '', dfn: (x) => Math.exp(x), a: 0, fa: '1' },
    { at: (u, simple) => (simple ? `\\cos ${u}` : `\\cos(${u})`), fn: (t) => Math.cos(t), d: '-\\sin x', dfn: (x) => -Math.sin(x), a: 0, fa: '1' },
    { at: (u, simple) => (simple ? `\\ln ${u}` : `\\ln(${u})`), fn: (t) => Math.log(t), d: '\\frac{1}{x}', dfn: (x) => 1 / x, a: 2, fa: '\\ln 2', positive: true }
]

/** More functions for level 1 only: with x² or 3x + 1 inside they would need brackets, (x²)² */
const LEVEL1_ONLY: Inner[] = [
    { at: (u) => `${u}^2`, fn: (t) => t * t, d: '2x', dfn: (x) => 2 * x, a: 1, fa: '1' },
    { at: (u) => `${u}^3`, fn: (t) => t ** 3, d: '3x^2', dfn: (x) => 3 * x * x, a: 1, fa: '1' },
    { at: (u) => `\\sqrt{1+${u}^2}`, fn: (t) => Math.sqrt(1 + t * t), d: '\\frac{x}{\\sqrt{1+x^2}}', dfn: (x) => x / Math.sqrt(1 + x * x), a: 0, fa: '1' }
]

/** f·d as LaTeX: a plain number goes in front (2e^{2x}), anything else after a dot (and so does a number before a fraction, which would read as a mixed number) */
function times(term: string, d: string): string {
    if (d === '1') return term
    return /^\d+$/.test(d) && !term.startsWith('\\frac') ? `${d}${term}` : `${term}\\cdot ${d}`
}

/** ∫ₐˣ f(t) dt: f(x), f′(x), f(x) − f(a). eᵗ is left out (f′ = f) */
function upperX(random: Random) {
    const inner = pick(random, [...INNER.filter((item) => item.d !== ''), ...LEVEL1_ONLY])
    const fx = inner.at('x', true)
    return {
        F: `F(x)=\\int_{${inner.a}}^{x}${inner.at('t', true)}\\,dt`,
        right: { latex: `F'(x)=${fx}`, fn: inner.fn },
        wrong: [
            { latex: `F'(x)=${inner.d}`, fn: inner.dfn },
            { latex: `F'(x)=${fx}-${inner.fa}`, fn: (x: number) => inner.fn(x) - inner.fn(inner.a) }
        ],
        worked: `F'(x)=f(x)=${fx}`,
        f: inner.fn, low: () => inner.a, high: (x: number) => x
    }
}

/** ∫ₐ^g(x) f(t) dt: f(g)·g′, f(g), f(x)·g′ */
function upperG(random: Random) {
    const inner = pick(random, INNER)
    // 3x + 1 inside 1 + t would read 1 + 3x + 1, and ln needs t > 0: keep it for eᵗ and cos t
    const g = pick(random, inner.positive || inner.at('u', true).includes('1+') ? G.filter((item) => item.latex !== '3x+1') : G)
    const a = inner.positive ? 1 : 0
    const fg = inner.at(g.latex, g.simple)
    const fx = inner.at('x', true)
    return {
        F: `F(x)=\\int_{${a}}^{${g.latex}}${inner.at('t', true)}\\,dt`,
        right: { latex: `F'(x)=${times(fg, g.d)}`, fn: (x: number) => inner.fn(g.fn(x)) * g.dfn(x) },
        wrong: [
            { latex: `F'(x)=${fg}`, fn: (x: number) => inner.fn(g.fn(x)) },
            { latex: `F'(x)=${times(fx, g.d)}`, fn: (x: number) => inner.fn(x) * g.dfn(x) }
        ],
        worked: `F'(x)=f(${g.latex})\\cdot(${g.latex})'`,
        f: inner.fn, low: () => a, high: g.fn
    }
}

/** ∫ from h(x) to g(x) of f(t) dt: f(g)·g′ − f(h)·h′, the same with +, and f(g)·g′ alone */
function bothLimits(random: Random) {
    const inner = pick(random, INNER.filter((item) => !item.positive))
    const [h, g] = pick(random, [[X, G[0]], [X, G[2]], [X, G[1]], [G[2], G[0]]] as Array<[Limit, Limit]>)
    const top = times(inner.at(g.latex, g.simple), g.d)
    const bottom = times(inner.at(h.latex, h.simple), h.d)
    const up = (x: number) => inner.fn(g.fn(x)) * g.dfn(x)
    const down = (x: number) => inner.fn(h.fn(x)) * h.dfn(x)
    return {
        F: `F(x)=\\int_{${h.latex}}^{${g.latex}}${inner.at('t', true)}\\,dt`,
        right: { latex: `F'(x)=${top}-${bottom}`, fn: (x: number) => up(x) - down(x) },
        wrong: [
            { latex: `F'(x)=${top}+${bottom}`, fn: (x: number) => up(x) + down(x) },
            { latex: `F'(x)=${top}`, fn: up }
        ],
        worked: `F'(x)=f(g)\\,g'-f(h)\\,h'`,
        f: inner.fn, low: h.fn, high: g.fn
    }
}

const LEVELS = [upperX, upperG, bothLimits]

/** Six rounds of one level, never the same integral twice */
export function createDeriveRounds(random: Random, level: number): DeriveRound[] {
    const maker = LEVELS[Math.min(2, Math.max(0, level))]
    const rounds: DeriveRound[] = []
    for (let attempt = 0; rounds.length < DERIVE_ROUNDS && attempt < 600; attempt += 1) {
        const made = maker(random)
        if (attempt < 599 && rounds.some((round) => round.F === made.F)) continue
        const options = shuffle(random, [made.right, ...made.wrong])
        rounds.push({
            F: made.F,
            options: options.map((option) => option.latex),
            answer: options.indexOf(made.right),
            worked: made.worked,
            f: made.f,
            low: made.low,
            high: made.high,
            fns: options.map((option) => option.fn)
        })
    }
    return rounds
}
