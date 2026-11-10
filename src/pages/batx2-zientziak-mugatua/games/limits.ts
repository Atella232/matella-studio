import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J2 · Cambia los límites / Aldatu mugak: a definite integral and a change
   t = g(x). Three integrals in t: only one has the new limits g(a) and
   g(b) (and the number dt brings). The wrong ones keep the old limits,
   swap them, change only one of them, forget the constant inside g, take
   the limits from the wrong function (cos instead of sin) or drop the
   1/k of t = kx + m. Level 1, t = x² + m and t = kx + m; level 2, t = ln x,
   t = sin x and t = eˣ; level 3, all of them and the missing 1/k. Every
   option keeps what it integrates, so the tests can check that only the
   right one has the value of the original integral.
   ========================================================================== */

export const LIMITS_ROUNDS = 6

export interface TIntegral {
    factor: number
    from: number
    to: number
    fn: (t: number) => number
}

export interface LimitsRound {
    integral: string
    change: string
    options: string[]
    answer: number
    /** The new limits, worked out */
    worked: string[]
    /** What the original integral is, and what each option is */
    original: { fn: (x: number) => number; a: number; b: number }
    integrals: TIntegral[]
}

interface Option {
    latex: string
    value: TIntegral
}

interface Made {
    integral: string
    change: string
    worked: string[]
    original: LimitsRound['original']
    right: Option
    wrong: Option[]
}

/** The value of an integral in t, by Simpson's rule (only to tell the options apart) */
function valueOf(item: TIntegral): number {
    const steps = 200
    const h = (item.to - item.from) / steps
    let sum = item.fn(item.from) + item.fn(item.to)
    for (let k = 1; k < steps; k += 1) sum += item.fn(item.from + k * h) * (k % 2 ? 4 : 2)
    return (item.factor * sum * h) / 3
}

/** ∫ from → to of a factor · body dt, as LaTeX */
const tIntegral = (factor: string, from: string, to: string, body: string) => `${factor}\\int_{${from}}^{${to}}${body}\\,dt`

interface Body {
    /** f(t) as LaTeX, and as it reads inside ∫ … dx with u in place of t */
    t: string
    x: (u: string) => string
    fn: (t: number) => number
}

const POWERS: Body[] = [
    { t: 't^2', x: (u) => `(${u})^2`, fn: (t) => t * t },
    { t: 't^3', x: (u) => `(${u})^3`, fn: (t) => t ** 3 },
    { t: '\\sqrt{t}', x: (u) => `\\sqrt{${u}}`, fn: (t) => Math.sqrt(t) }
]
const EXP: Body = { t: 'e^t', x: (u) => `e^{${u}}`, fn: (t) => Math.exp(t) }

/** t = x² + m: ∫ₐᵇ 2x·f(x² + m) dx = ∫ from a² + m to b² + m of f(t) dt */
function square(random: Random): Made | null {
    const body = pick(random, [...POWERS, EXP])
    // (x²)ⁿ would read better as a power of x: with a power inside, t = x² + m with m ≠ 0
    const m = pick(random, body === EXP || body.t === '\\sqrt{t}' ? [0, 1, 2] : [1, 2])
    const a = randomInt(random, 0, 1)
    const b = randomInt(random, a + 1, 2)
    const [A, B] = [a * a + m, b * b + m]
    if (A === a && B === b) return null
    const inner = m === 0 ? 'x^2' : `x^2+${m}`
    const option = (from: number, to: number): Option => ({ latex: tIntegral('', String(from), String(to), body.t), value: { factor: 1, from, to, fn: body.fn } })
    const third = m !== 0 ? option(a * a, b * b) : option(B, A)
    return {
        integral: `\\int_{${a}}^{${b}}2x${body.x(inner)}\\,dx`,
        change: `t=${inner}`,
        worked: [`x=${a}\\to t=${A}`, `x=${b}\\to t=${B}`],
        original: { fn: (x) => 2 * x * body.fn(x * x + m), a, b },
        right: option(A, B),
        wrong: [option(a, b), third]
    }
}

/** t = kx + m: ∫ₐᵇ (kx + m)ⁿ dx = (1/k) ∫ from ka + m to kb + m of tⁿ dt */
function linear(random: Random, missingFactor: boolean): Made | null {
    const k = pick(random, [2, 3])
    const m = pick(random, [-1, 1, 2])
    const a = randomInt(random, 0, 1)
    const b = a + randomInt(random, 1, 2)
    const body = pick(random, POWERS.slice(0, 2))
    const [A, B] = [k * a + m, k * b + m]
    const inner = `${k}x${m > 0 ? '+' : '-'}${Math.abs(m)}`
    const factor = `\\frac{1}{${k}}`
    const option = (from: number, to: number, withFactor = true): Option => ({ latex: tIntegral(withFactor ? factor : '', String(from), String(to), body.t), value: { factor: withFactor ? 1 / k : 1, from, to, fn: body.fn } })
    return {
        integral: `\\int_{${a}}^{${b}}${body.x(inner)}\\,dx`,
        change: `t=${inner}`,
        worked: [`x=${a}\\to t=${A}`, `x=${b}\\to t=${B}`, `dx=${factor}\\,dt`],
        original: { fn: (x) => body.fn(k * x + m), a, b },
        right: option(A, B),
        wrong: [option(a, b), missingFactor ? option(A, B, false) : option(B, A)]
    }
}

/** t = ln x: ∫ from 1 to eᵏ of (ln x)ⁿ/x dx = ∫ from 0 to k of tⁿ dt */
function log(random: Random): Made {
    const k = pick(random, [1, 2, 3])
    const power = pick(random, [1, 2, 3])
    const t = power === 1 ? 't' : `t^${power}`
    const top = k === 1 ? 'e' : `e^${k}`
    const ln = power === 1 ? '\\ln x' : `(\\ln x)^${power}`
    const option = (from: string, to: string, f: number, g: number): Option => ({ latex: tIntegral('', from, to, t), value: { factor: 1, from: f, to: g, fn: (u) => u ** power } })
    return {
        integral: `\\int_{1}^{${top}}\\frac{${ln}}{x}\\,dx`,
        change: 't=\\ln x',
        worked: ['x=1\\to t=0', `x=${top}\\to t=${k}`],
        original: { fn: (x) => Math.log(x) ** power / x, a: 1, b: Math.exp(k) },
        right: option('0', String(k), 0, k),
        wrong: [option('1', top, 1, Math.exp(k)), option('0', top, 0, Math.exp(k))]
    }
}

/** t = sin x: ∫ from 0 to π/2 (or π/6) of cos x sinⁿ x dx = ∫ from 0 to 1 (or ½) of tⁿ dt */
function sine(random: Random): Made {
    const power = pick(random, [1, 2, 3])
    const half = random() < 0.5
    const t = power === 1 ? 't' : `t^${power}`
    const sin = power === 1 ? '\\sin x' : `\\sin^${power} x`
    const top = half ? '\\frac{\\pi}{6}' : '\\frac{\\pi}{2}'
    const end = half ? Math.PI / 6 : Math.PI / 2
    const T = half ? 0.5 : 1
    const Tl = half ? '\\frac{1}{2}' : '1'
    // The limits taken with cos instead of sin: cos 0 = 1, cos(π/2) = 0, cos(π/6) = √3/2
    const cosTo = half ? Math.sqrt(3) / 2 : 0
    const cosLatex = half ? '\\frac{\\sqrt{3}}{2}' : '0'
    const option = (from: string, to: string, f: number, g: number): Option => ({ latex: tIntegral('', from, to, t), value: { factor: 1, from: f, to: g, fn: (u) => u ** power } })
    return {
        integral: `\\int_{0}^{${top}}\\cos x\\,${sin}\\,dx`,
        change: 't=\\sin x',
        worked: ['x=0\\to t=0', `x=${top}\\to t=${Tl}`],
        original: { fn: (x) => Math.cos(x) * Math.sin(x) ** power, a: 0, b: end },
        right: option('0', Tl, 0, T),
        wrong: [option('0', top, 0, end), option('1', cosLatex, 1, cosTo)]
    }
}

/** t = eˣ: ∫ from 0 to ln k of eˣ/(1 + eˣ) dx = ∫ from 1 to k of dt/(1 + t) */
function exp(random: Random): Made {
    const k = pick(random, [2, 3, 4])
    const option = (from: string, to: string, f: number, g: number): Option => ({ latex: `\\int_{${from}}^{${to}}\\frac{dt}{1+t}`, value: { factor: 1, from: f, to: g, fn: (u) => 1 / (1 + u) } })
    return {
        integral: `\\int_{0}^{\\ln ${k}}\\frac{e^x}{1+e^x}\\,dx`,
        change: 't=e^x',
        worked: ['x=0\\to t=1', `x=\\ln ${k}\\to t=${k}`],
        original: { fn: (x) => Math.exp(x) / (1 + Math.exp(x)), a: 0, b: Math.log(k) },
        right: option('1', String(k), 1, k),
        wrong: [option('0', `\\ln ${k}`, 0, Math.log(k)), option('0', String(k), 0, k)]
    }
}

const LEVELS: Array<Array<(random: Random) => Made | null>> = [
    [square, (random) => linear(random, false)],
    [log, sine, exp],
    [square, (random) => linear(random, true), log, sine, exp]
]

/** Six rounds of one level, never the same integral twice */
export function createLimitsRounds(random: Random, level: number): LimitsRound[] {
    const makers = LEVELS[Math.min(2, Math.max(0, level))]
    const rounds: LimitsRound[] = []
    for (let attempt = 0; rounds.length < LIMITS_ROUNDS && attempt < 600; attempt += 1) {
        const made = pick(random, makers)(random)
        if (!made) continue
        if (attempt < 599 && rounds.some((round) => round.integral === made.integral)) continue
        // Three different integrals in t (x = 1 → t = 1 would make two of them the same), and with different values
        // (an odd power between −1 and 1 gives 0 whichever way the limits go)
        if (new Set([made.right, ...made.wrong].map((option) => option.latex)).size < 3) continue
        if (made.wrong.some((option) => Math.abs(valueOf(option.value) - valueOf(made.right.value)) < 1e-6)) continue
        const options = shuffle(random, [made.right, ...made.wrong])
        rounds.push({
            integral: made.integral,
            change: made.change,
            options: options.map((option) => option.latex),
            answer: options.indexOf(made.right),
            worked: made.worked,
            original: made.original,
            integrals: options.map((option) => option.value)
        })
    }
    return rounds
}
