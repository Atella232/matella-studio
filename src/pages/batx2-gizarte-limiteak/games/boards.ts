import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   Limiteak eta jarraitutasuna (Batxilergoa 2 · Gizarte Zientziak) memory:
   limits at +∞ of quotients and conjugates and their values, 1^∞ and its
   eᵃ, and the long-run value of a model (a population, an average cost).
   Every card has exactly one partner, and the text stays narrow enough
   for a card at 375 px (\lim\limits puts «x → a» below).
   ========================================================================== */

export const BACH2G_LIMITS_MEMORY_PAIRS = 6

export const bach2gLimitsMemoryLevels = ['infinity', 'e', 'long-run'] as const

interface Pair {
    question: string
    answer: string
}

function ratio(p: number, q: number): string {
    const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b))
    const g = gcd(p, q)
    const [top, bottom] = [p / g, q / g]
    return bottom === 1 ? String(top) : `\\frac{${top}}{${bottom}}`
}

/** At +∞ the card shows the function only (the level says x → +∞); the explanation writes the limit */
function infinityPair(random: Random): Pair | null {
    if (randomInt(random, 0, 1) === 0) {
        const p = randomInt(random, 1, 9)
        const q = randomInt(random, 2, 6)
        if (p === q) return null
        return { question: `\\frac{${p === 1 ? '' : p}x^2+5}{${q}x^2+x}`, answer: ratio(p, q) }
    }
    const p = randomInt(random, 1, 12)
    return { question: `\\sqrt{x^2+${p}x}-x`, answer: ratio(p, 2) }
}

function ePair(random: Random): Pair | null {
    const p = randomInt(random, 1, 4)
    const q = randomInt(random, 1, 4)
    return { question: `\\lim\\limits_{x\\to\\infty}\\left(1+\\frac{${p}}{x}\\right)^{${q === 1 ? '' : q}x}`, answer: `e^{${p * q}}` }
}

/** The long run of a population (thousands) or of an average cost */
function longRunPair(random: Random): Pair | null {
    if (randomInt(random, 0, 1) === 0) {
        const p = randomInt(random, 2, 12) * 5
        const q = randomInt(random, 1, 9)
        const r = randomInt(random, 1, 5)
        return { question: `\\frac{${p}t+${q}}{t+${r}}`, answer: String(p) }
    }
    const fixed = pick(random, [200, 500, 800, 1200])
    const c = randomInt(random, 2, 40)
    return { question: `\\frac{${fixed}+${c}x}{x}`, answer: String(c) }
}

/** Six pairs of one level, every question and every answer different */
export function createBach2gLimitsMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = bach2gLimitsMemoryLevels[levelIndex] ?? 'infinity'
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < BACH2G_LIMITS_MEMORY_PAIRS && attempt < 4000; attempt += 1) {
        const pair = level === 'infinity' ? infinityPair(random) : level === 'e' ? ePair(random) : longRunPair(random)
        if (!pair || pairs.some((other) => other.question === pair.question || other.answer === pair.answer)) continue
        pairs.push(pair)
    }
    const variable = (pair: Pair) => (pair.question.includes('t') && !pair.question.includes('sqrt') ? 't' : 'x')
    const explain = (pair: Pair) => (level === 'e' ? `${pair.question.replace('\\limits', '')}=${pair.answer}` : `\\lim_{${variable(pair)}\\to+\\infty}${pair.question}=${pair.answer}`)
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: explain(pair) },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: explain(pair) }
    ]))
}
