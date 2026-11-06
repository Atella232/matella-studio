import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   Limiteak eta jarraitutasuna (Batxilergoa 1 · Zientziak) memory: a limit
   at a point and its value (0/0 by factorising a² − b² or a³ − b³, or by
   the conjugate), a function and its limit at +∞ (degrees, eᵖ, 0; the
   card leaves out «lim», which the level names), and a rational function
   and its asymptotes, on two lines. Every card has exactly one partner,
   and the text stays narrow enough for a card at 375 px.
   ========================================================================== */

export const BACH_LIMITS_MEMORY_PAIRS = 6

export const bachLimitsMemoryLevels = ['point', 'infinity', 'asymptotes'] as const

interface Pair {
    question: string
    answer: string
}

const signed = (value: number) => (value < 0 ? `-${-value}` : `+${value}`)
const factor = (a: number) => (a === 0 ? 'x' : `x${signed(-a)}`)
/** p/q in lowest terms */
function ratio(p: number, q: number): string {
    const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b))
    const g = gcd(p, q)
    const [top, bottom] = [p / g, q / g]
    const sign = top * bottom < 0 ? '-' : ''
    return Math.abs(bottom) === 1 ? String(top * bottom) : `${sign}\\frac{${Math.abs(top)}}{${Math.abs(bottom)}}`
}

/** Positive points keep the card narrow: x − a below, never x + a */
function pointPair(random: Random): Pair | null {
    const kind = pick(random, ['difference', 'conjugate', 'cube'] as const)
    if (kind === 'difference') {
        const a = randomInt(random, 1, 5)
        return { question: `\\lim\\limits_{x\\to ${a}}\\frac{x^2-${a * a}}{${factor(a)}}`, answer: String(2 * a) }
    }
    if (kind === 'conjugate') {
        const c = randomInt(random, 1, 3)
        return { question: `\\lim\\limits_{x\\to ${c * c}}\\frac{\\sqrt{x}-${c}}{x-${c * c}}`, answer: `\\frac{1}{${2 * c}}` }
    }
    const a = randomInt(random, 1, 3)
    return { question: `\\lim\\limits_{x\\to ${a}}\\frac{x^3-${a ** 3}}{${factor(a)}}`, answer: String(3 * a * a) }
}

/** At +∞ the card shows the function only (the level says x → +∞); the explanation writes the limit */
function infinityPair(random: Random): Pair | null {
    const kind = pick(random, ['degrees', 'e', 'zero'] as const)
    if (kind === 'degrees') {
        const a = randomInt(random, -5, 5)
        const b = randomInt(random, 2, 4)
        if (a === 0) return null
        return { question: `\\frac{${a}x+1}{${b}x}`, answer: ratio(a, b) }
    }
    if (kind === 'e') {
        const p = randomInt(random, 2, 5)
        return { question: `\\left(1+\\frac{${p}}{x}\\right)^x`, answer: `e^${p}` }
    }
    const p = randomInt(random, 2, 9)
    return { question: `\\frac{${p}x}{x^2+1}`, answer: '0' }
}

/** The asymptotes on two lines, so that the card stays narrow */
const lines = (vertical: string, other: string) => `\\begin{gathered}${vertical}\\\\ ${other}\\end{gathered}`

function asymptotePair(random: Random): Pair | null {
    const kind = pick(random, ['horizontal', 'zero', 'oblique'] as const)
    const d = randomInt(random, -4, 4)
    if (d === 0) return null
    if (kind === 'horizontal') {
        const a = pick(random, [-3, -2, 2, 3, 4])
        return { question: `\\frac{${a}x}{${factor(d)}}`, answer: lines(`x=${d}`, `y=${a}`) }
    }
    if (kind === 'zero') return { question: `\\frac{1}{${factor(d)}}`, answer: lines(`x=${d}`, 'y=0') }
    // x²/(x − d) = x + d + d²/(x − d)
    return { question: `\\frac{x^2}{${factor(d)}}`, answer: lines(`x=${d}`, `y=x${signed(d)}`) }
}

/** Six pairs of one level, every question and every answer different */
export function createBachLimitsMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = bachLimitsMemoryLevels[levelIndex] ?? 'point'
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < BACH_LIMITS_MEMORY_PAIRS && attempt < 3000; attempt += 1) {
        const pair = level === 'point' ? pointPair(random) : level === 'infinity' ? infinityPair(random) : asymptotePair(random)
        if (!pair || pairs.some((other) => other.question === pair.question || other.answer === pair.answer)) continue
        pairs.push(pair)
    }
    const explain = (pair: Pair) => {
        if (level === 'infinity') return `\\lim_{x\\to+\\infty}${pair.question}=${pair.answer}`
        if (level === 'asymptotes') return `${pair.question}\\ \\Rightarrow\\ ${pair.answer.replace(/\\begin\{gathered\}|\\end\{gathered\}/g, '').replace('\\\\ ', '\\qquad ')}`
        return `${pair.question}=${pair.answer}`
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: explain(pair) },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: explain(pair) }
    ]))
}
