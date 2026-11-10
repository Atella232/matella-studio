import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   Limiteak eta jarraitutasuna (Batxilergoa 2 · Zientziak) memory: 1^∞
   and its value eᵃ, at a point and at infinity, limits at
   −∞ with roots and their values, and limits at +∞ with exponentials and
   powers. Every card has exactly one partner, and the text stays narrow
   enough for a card at 375 px (\lim\limits puts «x → a» below).
   ========================================================================== */

export const BACH2_LIMITS_MEMORY_PAIRS = 6

export const bach2LimitsMemoryLevels = ['notable', 'minus', 'orders'] as const

interface Pair {
    question: string
    answer: string
}

function ratio(p: number, q: number): string {
    const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b))
    const g = gcd(p, q)
    const [top, bottom] = [p / g, q / g]
    const sign = top * bottom < 0 ? '-' : ''
    return Math.abs(bottom) === 1 ? String(top * bottom) : `${sign}\\frac{${Math.abs(top)}}{${Math.abs(bottom)}}`
}

/** 1^∞ at a point and at infinity (no sines: the memory cards are not translated, and Spanish writes sen) */
function notablePair(random: Random): Pair | null {
    const p = randomInt(random, 1, 4)
    const q = randomInt(random, 1, 4)
    if (randomInt(random, 0, 1) === 0) return { question: `\\lim\\limits_{x\\to 0}(1+${p === 1 ? '' : p}x)^{\\frac{${q}}{x}}`, answer: `e^{${p * q}}` }
    return { question: `\\lim\\limits_{x\\to\\infty}\\left(1+\\frac{${p}}{x}\\right)^{${q === 1 ? '' : q}x}`, answer: `e^{${p * q}}` }
}

function minusPair(random: Random): Pair | null {
    const kind = pick(random, ['root', 'conjugate'] as const)
    if (kind === 'root') {
        const p = randomInt(random, 1, 6)
        const q = randomInt(random, 1, 4)
        return { question: `\\lim\\limits_{x\\to-\\infty}\\frac{${p === 1 ? '' : p}x}{\\sqrt{x^2+${q}}}`, answer: String(-p) }
    }
    const p = randomInt(random, 1, 6)
    return { question: `\\lim\\limits_{x\\to-\\infty}\\left(\\sqrt{x^2+${p}x}+x\\right)`, answer: ratio(-p, 2) }
}

/** At +∞ the card shows the function only (the level says x → +∞); the explanation writes the limit */
function ordersPair(random: Random): Pair | null {
    const p = randomInt(random, 1, 6)
    const q = randomInt(random, 2, 5)
    if (p === q) return null
    const kind = pick(random, ['exp', 'power-log'] as const)
    if (kind === 'exp') return { question: `\\frac{${p === 1 ? '' : p}e^x+x^5}{${q}e^x}`, answer: ratio(p, q) }
    return { question: `\\frac{${p === 1 ? '' : p}x^2+\\ln x}{${q}x^2}`, answer: ratio(p, q) }
}

/** Six pairs of one level, every question and every answer different */
export function createBach2LimitsMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = bach2LimitsMemoryLevels[levelIndex] ?? 'notable'
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < BACH2_LIMITS_MEMORY_PAIRS && attempt < 4000; attempt += 1) {
        const pair = level === 'notable' ? notablePair(random) : level === 'minus' ? minusPair(random) : ordersPair(random)
        if (!pair || pairs.some((other) => other.question === pair.question || other.answer === pair.answer)) continue
        pairs.push(pair)
    }
    const explain = (pair: Pair) => (level === 'orders' ? `\\lim_{x\\to+\\infty}${pair.question}=${pair.answer}` : `${pair.question.replace('\\limits', '')}=${pair.answer}`)
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: explain(pair) },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: explain(pair) }
    ]))
}
