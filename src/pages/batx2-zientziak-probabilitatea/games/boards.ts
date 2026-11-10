import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { fraction } from '../../../features/unit-v2/math/fraction.ts'
import { hundredthsLatex, probLatex } from '../lab/probability.ts'

/* ==========================================================================
   Probabilitatea (Batxilergoa 2 · Zientziak) memory: a probability and
   its complement, written with De Morgan (P(A∪B) and P(Ā∩B̄)); P(A) and
   P(B/A) stacked and their intersection, the multiplication rule; and a
   path over the sum of the paths and the posterior it gives, Bayes. Every
   card has exactly one partner, and each one stays short enough for a
   phone card.
   ========================================================================== */

export const PROBABILITY_BATX2_MEMORY_PAIRS = 6

export const probabilityBatx2MemoryLevels = ['complement', 'product', 'bayes'] as const

interface Pair {
    question: string
    answer: string
}

const h = hundredthsLatex
/** Two rows stacked, with no brace, so the card is narrow enough */
const stacked = (top: string, bottom: string) => `\\begin{array}{c}${top}\\\\ ${bottom}\\end{array}`

/** An event and its complement, through De Morgan */
function complementPair(random: Random): Pair {
    const value = 5 * randomInt(random, 2, 18)
    const kind = pick(random, ['union', 'intersection', 'single'] as const)
    if (kind === 'union') return { question: `P(A\\cup B)=${h(value)}`, answer: `P(\\overline{A}\\cap\\overline{B})=${h(100 - value)}` }
    if (kind === 'intersection') return { question: `P(A\\cap B)=${h(value)}`, answer: `P(\\overline{A}\\cup\\overline{B})=${h(100 - value)}` }
    return { question: `P(A)=${h(value)}`, answer: `P(\\overline{A})=${h(100 - value)}` }
}

/** P(A) and P(B/A), and P(A∩B) */
function productPair(random: Random): Pair {
    const a = 10 * randomInt(random, 2, 9)
    const given = 10 * randomInt(random, 1, 9)
    return { question: stacked(`P(A)=${h(a)}`, `P(B/A)=${h(given)}`), answer: `P(A\\cap B)=${probLatex(fraction(a * given, 10_000))}` }
}

/** A path over the sum of the two paths, and the posterior */
function bayesPair(random: Random): Pair | null {
    const first = 2 * randomInt(random, 1, 9)
    const second = 2 * randomInt(random, 1, 9)
    if (first === second) return null
    const posterior = fraction(first, first + second)
    if (posterior.denominator > 20) return null
    return { question: `\\frac{0{,}${String(first).padStart(2, '0')}}{0{,}${String(first).padStart(2, '0')}+0{,}${String(second).padStart(2, '0')}}`, answer: `\\frac{${posterior.numerator}}{${posterior.denominator}}` }
}

/** Six pairs with different answers, so every card has exactly one partner */
export function createProbabilityBatx2MemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = probabilityBatx2MemoryLevels[levelIndex] ?? 'complement'
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < PROBABILITY_BATX2_MEMORY_PAIRS && attempt < 3000; attempt += 1) {
        const pair = level === 'complement' ? complementPair(random) : level === 'product' ? productPair(random) : bayesPair(random)
        if (!pair || pairs.some((other) => other.question === pair.question || other.answer === pair.answer)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` }
    ]))
}
