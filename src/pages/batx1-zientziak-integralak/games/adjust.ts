import { pick, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J2 · Ajusta la constante (Batxilergoa 1 · Zientziak, Integralak): an
   integral that is almost basic and three antiderivatives that differ
   only in the number in front: the right one, the one that forgot to
   adjust and the one that multiplied instead of dividing. Level 1, a
   linear inside (e^(kx), cos(kx), sin(kx), (kx + b)ⁿ); level 2, u′·uⁿ with
   a number missing from u′; level 3, u′/u and u′·eᵘ with a number
   missing. Each round keeps the functions, so the tests can check by
   differentiating that only the right option gives the integrand back.
   ========================================================================== */

export const ADJUST_ROUNDS = 6

export interface AdjustRound {
    /** The integrand, in LaTeX */
    integrand: string
    /** The common part of the three antiderivatives, in LaTeX (written after the factor) */
    core: string
    /** The number in front of each option */
    factors: number[]
    answer: number
    /** For the explanation: what u is, and the derivative it needs */
    u: string
    /** The numbers that rebuild the functions */
    spec: AdjustSpec
}

export type AdjustSpec =
    | { kind: 'exp'; k: number }
    | { kind: 'cos'; k: number }
    | { kind: 'sin'; k: number }
    | { kind: 'linear'; k: number; b: number; n: number }
    | { kind: 'chain'; p: number; b: number; n: number }
    | { kind: 'log'; p: number; b: number }
    | { kind: 'expPower'; p: number }

const signed = (value: number) => (value < 0 ? `-${-value}` : `+${value}`)
const times = (k: number) => (k === 1 ? '' : k === -1 ? '-' : String(k))
const power = (p: number) => (p === 1 ? 'x' : `x^${p}`)

/** The integrand and the core (the antiderivative without its number) as functions */
export function adjustFunctions(spec: AdjustSpec): { integrand: (x: number) => number; core: (x: number) => number } {
    switch (spec.kind) {
        case 'exp': return { integrand: (x) => Math.exp(spec.k * x), core: (x) => Math.exp(spec.k * x) }
        case 'cos': return { integrand: (x) => Math.cos(spec.k * x), core: (x) => Math.sin(spec.k * x) }
        case 'sin': return { integrand: (x) => Math.sin(spec.k * x), core: (x) => Math.cos(spec.k * x) }
        case 'linear': return { integrand: (x) => (spec.k * x + spec.b) ** spec.n, core: (x) => (spec.k * x + spec.b) ** (spec.n + 1) }
        case 'chain': return { integrand: (x) => x ** (spec.p - 1) * (x ** spec.p + spec.b) ** spec.n, core: (x) => (x ** spec.p + spec.b) ** (spec.n + 1) }
        case 'log': return { integrand: (x) => x ** (spec.p - 1) / (x ** spec.p + spec.b), core: (x) => Math.log(x ** spec.p + spec.b) }
        case 'expPower': return { integrand: (x) => x ** (spec.p - 1) * Math.exp(x ** spec.p), core: (x) => Math.exp(x ** spec.p) }
    }
}

function make(random: Random, spec: AdjustSpec, integrand: string, core: string, u: string, right: number, wrong: number[]): AdjustRound {
    const factors = shuffle(random, [right, ...wrong])
    return { integrand, core, factors, answer: factors.indexOf(right), u, spec }
}

function levelOne(random: Random): AdjustRound | null {
    const kind = pick(random, ['exp', 'cos', 'sin', 'linear'] as const)
    if (kind === 'linear') {
        const k = pick(random, [2, 3, 4])
        const b = pick(random, [-3, -1, 1, 2, 5])
        const n = pick(random, [2, 3, 4])
        const inside = `(${k}x${signed(b)})`
        return make(random, { kind, k, b, n }, `${inside}^${n}`, `${inside}^${n + 1}`, `u=${k}x${signed(b)},\\ u'=${k}`, 1 / (k * (n + 1)), [1 / (n + 1), k / (n + 1)])
    }
    const k = pick(random, kind === 'exp' ? [2, 3, 4, 5, -2, -3] : [2, 3, 4, 5])
    const inside = `${times(k)}x`
    if (kind === 'exp') return make(random, { kind, k }, `e^{${inside}}`, `e^{${inside}}`, `u=${inside},\\ u'=${k}`, 1 / k, [1, k])
    if (kind === 'cos') return make(random, { kind, k }, `\\cos(${inside})`, `\\sin(${inside})`, `u=${inside},\\ u'=${k}`, 1 / k, [1, k])
    // ∫ sin(kx) dx = −(1/k) cos(kx): the core is cos(kx) and every factor carries the minus
    return make(random, { kind, k }, `\\sin(${inside})`, `\\cos(${inside})`, `u=${inside},\\ u'=${k}`, -1 / k, [-1, -k])
}

function levelTwo(random: Random): AdjustRound | null {
    const p = pick(random, [2, 3])
    const b = pick(random, [-4, -1, 1, 2, 3, 5])
    const n = pick(random, [2, 3, 4, 5])
    const inside = `(${power(p)}${signed(b)})`
    const outside = p === 2 ? 'x' : 'x^2'
    return make(random, { kind: 'chain', p, b, n }, `${outside}${inside}^${n}`, `${inside}^${n + 1}`, `u=${power(p)}${signed(b)},\\ u'=${p}${outside}`, 1 / (p * (n + 1)), [1 / (n + 1), p / (n + 1)])
}

function levelThree(random: Random): AdjustRound | null {
    const p = pick(random, [2, 3])
    const outside = p === 2 ? 'x' : 'x^2'
    if (random() < 0.5) {
        const b = pick(random, [1, 2, 3, 4, 5, 7])
        const inside = `${power(p)}+${b}`
        return make(random, { kind: 'log', p, b }, `\\frac{${outside}}{${inside}}`, `\\ln(${inside})`, `u=${inside},\\ u'=${p}${outside}`, 1 / p, [1, p])
    }
    return make(random, { kind: 'expPower', p }, `${outside}\\,e^{${power(p)}}`, `e^{${power(p)}}`, `u=${power(p)},\\ u'=${p}${outside}`, 1 / p, [1, p])
}

/** A factor in front of an expression, in LaTeX: 1 and −1 are not written, the rest as whole numbers or fractions */
export function factorLatex(value: number): string {
    if (Math.abs(value - 1) < 1e-12) return ''
    if (Math.abs(value + 1) < 1e-12) return '-'
    for (let d = 1; d <= 60; d += 1) {
        const n = value * d
        if (Math.abs(n - Math.round(n)) < 1e-9) {
            const top = Math.round(n)
            if (d === 1) return String(top)
            return `${top < 0 ? '-' : ''}\\frac{${Math.abs(top)}}{${d}}`
        }
    }
    return String(value)
}

/** One option: its number in front of the core, and the constant */
export const adjustOptionLatex = (round: AdjustRound, index: number) => `${factorLatex(round.factors[index])}${round.core}+k`

export function createAdjustRounds(random: Random, levelIndex: number): AdjustRound[] {
    const build = [levelOne, levelTwo, levelThree][levelIndex] ?? levelOne
    const rounds: AdjustRound[] = []
    for (let attempt = 0; rounds.length < ADJUST_ROUNDS && attempt < 4000; attempt += 1) {
        const next = build(random)
        if (!next) continue
        if (rounds.some((other) => other.integrand === next.integrand)) continue
        rounds.push(next)
    }
    return rounds
}
