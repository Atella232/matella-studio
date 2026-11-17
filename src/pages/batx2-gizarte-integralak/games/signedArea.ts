import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   J2 · Azalera zeinuarekin (Área con signo): a function, an interval and
   the value of its integral. Is that number the area? Three answers: yes;
   the area is the number with its sign changed (the curve is all below
   the axis); or the interval must be split (the curve crosses the axis
   inside). After the answer, the area itself is worked out. Level 1,
   lines; level 2, parabolas; level 3, cubics and parabolas mixed.
   ========================================================================== */

export const SIGNED_ROUNDS = 6

export type SignedKind = 'area' | 'minus' | 'split'

export const SIGNED_KINDS: SignedKind[] = ['area', 'minus', 'split']

export interface SignedRound {
    prompt: LocalizedText
    answer: SignedKind
    /** The integral and the area, as fractions in LaTeX */
    working: string
    meta: { integral: number; area: number }
}

/** A fraction p/q in LaTeX, with q a small whole number */
function fractionLatex(value: number): string {
    for (const q of [1, 2, 3, 4, 6, 12]) {
        const p = Math.round(value * q)
        if (Math.abs(p / q - value) < 1e-9) {
            if (q === 1) return String(p)
            const g = gcd(Math.abs(p), q)
            const [pp, qq] = [p / g, q / g]
            return qq === 1 ? String(pp) : `${pp < 0 ? '-' : ''}\\frac{${Math.abs(pp)}}{${qq}}`
        }
    }
    return String(Math.round(value * 1000) / 1000)
}
const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))

/** ∫ₐᵇ of a polynomial given by coefficients c₀ + c₁x + c₂x² + c₃x³ */
const integral = (c: number[], a: number, b: number) => {
    const F = (x: number) => c.reduce((sum, value, k) => sum + (value * x ** (k + 1)) / (k + 1), 0)
    return F(b) - F(a)
}
/** The area: the integral split at the roots inside (a, b) */
const areaOf = (c: number[], roots: number[], a: number, b: number) => {
    const cuts = [a, ...roots.filter((r) => r > a && r < b).sort((p, q) => p - q), b]
    let total = 0
    for (let i = 1; i < cuts.length; i++) total += Math.abs(integral(c, cuts[i - 1], cuts[i]))
    return total
}

function polyLatex(c: number[]): string {
    const parts: string[] = []
    for (let k = c.length - 1; k >= 0; k--) {
        const v = c[k]
        if (v === 0) continue
        const sign = v < 0 ? '-' : parts.length ? '+' : ''
        const abs = Math.abs(v)
        const body = k === 0 ? String(abs) : `${abs === 1 ? '' : abs}x${k === 1 ? '' : `^${k}`}`
        parts.push(`${sign}${body}`)
    }
    return parts.join('')
}

function make(c: number[], roots: number[], a: number, b: number): SignedRound {
    const I = integral(c, a, b)
    const A = areaOf(c, roots, a, b)
    const inside = roots.some((r) => r > a && r < b)
    const answer: SignedKind = inside ? 'split' : I >= 0 ? 'area' : 'minus'
    const latex = `\\int_{${a}}^{${b}}(${polyLatex(c)})\\,dx=${fractionLatex(I)}`
    return {
        prompt: say(`$${latex}$. Azalera al da?`, `$${latex}$. ¿Es el área?`, `$${latex}$. هل هذه هي المساحة؟`, `$${latex}$. Is that the area?`),
        answer,
        working: `A=${fractionLatex(A)}`,
        meta: { integral: I, area: A }
    }
}

/** Level 1: m x + q with a root r */
function lineRound(random: Random): SignedRound | null {
    const r = randomInt(random, -2, 3)
    const m = pick(random, [1, 2, -1, -2])
    const a = randomInt(random, -3, 2)
    const b = a + randomInt(random, 1, 4)
    return make([-m * r, m], [r], a, b)
}

/** Level 2: s (x − p)(x − q) */
function parabolaRound(random: Random): SignedRound | null {
    const p = randomInt(random, -2, 1)
    const q = p + randomInt(random, 1, 3)
    const s = pick(random, [1, -1])
    const a = randomInt(random, -3, 2)
    const b = a + randomInt(random, 1, 3)
    return make([s * p * q, -s * (p + q), s], [p, q], a, b)
}

/** Level 3: x³ − k² x or a parabola */
function mixedRound(random: Random): SignedRound | null {
    if (randomInt(random, 0, 1) === 0) return parabolaRound(random)
    const k = randomInt(random, 1, 2)
    const a = randomInt(random, -3, 1)
    const b = a + randomInt(random, 1, 3)
    return make([0, -k * k, 0, 1], [-k, 0, k], a, b)
}

/** Six rounds of a level, no integral twice and at least two different answers */
export function createSignedRounds(random: Random, levelIndex: number): SignedRound[] {
    const generator = [lineRound, parabolaRound, mixedRound][levelIndex] ?? lineRound
    for (let attempt = 0; attempt < 200; attempt += 1) {
        const rounds: SignedRound[] = []
        for (let tries = 0; rounds.length < SIGNED_ROUNDS && tries < 3000; tries += 1) {
            const next = generator(random)
            if (next && !rounds.some((other) => other.prompt.es === next.prompt.es)) rounds.push(next)
        }
        if (rounds.length === SIGNED_ROUNDS && new Set(rounds.map((round) => round.answer)).size >= 2) return rounds
    }
    throw new Error('No signed-area rounds')
}
