import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { polynomialLatex } from '../../dbh4-akademikoak-funtzioak/games/race.ts'

/* ==========================================================================
   Funtzio polinomiko eta arrazionalen memoria (4. DBH akademikoak): two
   points and the slope of their line, a parabola x² + bx + c and its
   vertex, and (ax + b)/(x + d) and its two asymptotes. Cards carry
   formulas only, so they read the same in every language. Every card has
   exactly one partner, and the text stays short enough for a phone card.
   ========================================================================== */

export const POLYNOMIAL_AK_MEMORY_PAIRS = 6

export const polynomialAkMemoryLevels = ['slopes', 'vertices', 'asymptotes'] as const

interface Pair2 {
    question: string
    answer: string
}

const stacked = (...rows: string[]) => `\\small\\begin{gathered}${rows.join('\\\\')}\\end{gathered}`
const nonZero = (random: Random, size: number) => (random() < 0.5 ? -1 : 1) * randomInt(random, 1, size)

function slopePair(random: Random): Pair2 {
    const m = nonZero(random, 4)
    const x1 = randomInt(random, -3, 2)
    const y1 = randomInt(random, -4, 4)
    const dx = randomInt(random, 1, 3)
    return { question: stacked(`(${x1},\\,${y1})`, `(${x1 + dx},\\,${y1 + m * dx})`), answer: String(m) }
}

function vertexPair(random: Random): Pair2 {
    const h = nonZero(random, 4)
    const k = randomInt(random, -6, 6)
    return { question: `\\small ${polynomialLatex([1, -2 * h, h * h + k])}`, answer: `(${h},\\,${k})` }
}

function asymptotePair(random: Random): Pair2 {
    const a = nonZero(random, 3)
    const d = nonZero(random, 3)
    let b = randomInt(random, -5, 5)
    if (b === a * d) b += 1
    return { question: `\\frac{${polynomialLatex([a, b])}}{${polynomialLatex([1, d])}}`, answer: stacked(`x=${-d}`, `y=${a}`) }
}

/** Six pairs with different questions and answers, so every card has exactly one partner */
export function createPolynomialAkMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = polynomialAkMemoryLevels[levelIndex] ?? 'slopes'
    const pairs: Pair2[] = []
    for (let attempt = 0; pairs.length < POLYNOMIAL_AK_MEMORY_PAIRS && attempt < 3000; attempt += 1) {
        const pair = level === 'slopes' ? slopePair(random) : level === 'vertices' ? vertexPair(random) : asymptotePair(random)
        if (pairs.some((other) => other.question === pair.question || other.answer === pair.answer)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` }
    ]))
}
