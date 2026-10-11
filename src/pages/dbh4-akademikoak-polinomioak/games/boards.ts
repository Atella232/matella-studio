import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { binomialLatex, fromRoots, polyLatex } from '../polynomials.ts'

/* ==========================================================================
   Polinomioak eta zatiki aljebraikoak (4. DBH akademikoak) memory: a
   notable identity and its expansion, a polynomial and its roots, and an
   algebraic fraction and its simplified form. Every card has exactly one
   partner, and the text stays short enough for a card: no coefficient
   has two digits (x² − 10x + 25 does not fit a phone card).
   ========================================================================== */

export const POLYNOMIALS_MEMORY_PAIRS = 6

export const polynomialsMemoryLevels = ['identities', 'roots', 'fractions'] as const

interface Pair {
    question: string
    answer: string
    /** The shared answer, to tell pairs apart */
    key: string
}

const plus = (value: number) => (value < 0 ? `-${-value}` : `+${value}`)

function identityPair(random: Random): Pair | null {
    const a = randomInt(random, 1, 3)
    const kind = pick(random, ['sum', 'difference', 'product'] as const)
    // {+} and {-} drop the spacing around the signs, so the product fits a phone card
    const question = kind === 'sum' ? `(x+${a})^{2}` : kind === 'difference' ? `(x-${a})^{2}` : `(x{+}${a})(x{-}${a})`
    const answer = polyLatex(kind === 'sum' ? [1, 2 * a, a * a] : kind === 'difference' ? [1, -2 * a, a * a] : [1, 0, -a * a])
    return { question, answer, key: answer }
}

function rootsPair(random: Random): Pair | null {
    const r = randomInt(random, -5, 5)
    const s = randomInt(random, -5, 5)
    if (r >= s || Math.abs(r + s) > 9 || Math.abs(r * s) > 9) return null
    const answer = `${r},\\ ${s}`
    return { question: polyLatex(fromRoots([r, s])), answer, key: answer }
}

function fractionPair(random: Random): Pair | null {
    const a = randomInt(random, -5, 5)
    const b = randomInt(random, -5, 5)
    if (a === b || a === 0 || Math.abs(a + b) > 9 || Math.abs(a * b) > 9) return null
    // (x + a)(x + b) / (x + a) = x + b
    const answer = binomialLatex(-b)
    return { question: `\\frac{${polyLatex([1, a + b, a * b])}}{x${plus(a)}}`, answer, key: answer }
}

/** Six pairs with different answers, so every card has exactly one partner */
export function createPolynomialsMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = polynomialsMemoryLevels[levelIndex] ?? 'identities'
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < POLYNOMIALS_MEMORY_PAIRS && attempt < 2000; attempt += 1) {
        const pair = level === 'identities' ? identityPair(random) : level === 'roots' ? rootsPair(random) : fractionPair(random)
        if (!pair || pairs.some((other) => other.key === pair.key || other.question === pair.question || other.answer === pair.answer)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` }
    ]))
}
