import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   Deribatuak (Batxilergoa 2 · Gizarte Zientziak) memory: a function and
   its derivative. Level 1, powers and polynomials; level 2, the chain
   rule with powers, exponentials and logarithms; level 3, a cost and the
   cost of the next unit at a production (C′(x) as a number).
   ========================================================================== */

export const BACH2G_DERIVATIVES_MEMORY_PAIRS = 6

export const bach2gDerivativesMemoryLevels = ['powers', 'chain', 'next'] as const

interface Pair {
    question: string
    answer: string
}

const coefficient = (value: number) => (value === 1 ? '' : String(value))

function powersPair(random: Random): Pair | null {
    const a = randomInt(random, 1, 5)
    const n = randomInt(random, 2, 5)
    const kind = randomInt(random, 0, 2)
    if (kind === 0) return { question: `${coefficient(a)}x^{${n}}`, answer: `${a * n}x^{${n - 1}}`.replace('x^{1}', 'x') }
    if (kind === 1) return { question: `\\frac{${a}}{x^{${n - 1}}}`, answer: `-\\frac{${a * (n - 1)}}{x^{${n}}}` }
    return { question: `${coefficient(a)}x^2+${n}x`, answer: `${2 * a}x+${n}` }
}

function chainPair(random: Random): Pair | null {
    const k = randomInt(random, 2, 6)
    const kind = pick(random, ['power', 'exp', 'log'] as const)
    if (kind === 'power') return { question: `(${k}x+1)^2`, answer: `${2 * k}(${k}x+1)` }
    if (kind === 'exp') return { question: `e^{${k}x}`, answer: `${k}e^{${k}x}` }
    return { question: `\\ln(x^2+${k})`, answer: `\\frac{2x}{x^2+${k}}` }
}

function nextPair(random: Random): Pair | null {
    const b = randomInt(random, 2, 20)
    const x = pick(random, [5, 10, 20, 30])
    return { question: `C'(${x}),\\ C=x^2+${b}x`, answer: String(2 * x + b) }
}

/** Six pairs of one level, every question and every answer different */
export function createBach2gDerivativesMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = bach2gDerivativesMemoryLevels[levelIndex] ?? 'powers'
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < BACH2G_DERIVATIVES_MEMORY_PAIRS && attempt < 4000; attempt += 1) {
        const pair = level === 'powers' ? powersPair(random) : level === 'chain' ? chainPair(random) : nextPair(random)
        if (!pair || pairs.some((other) => other.question === pair.question || other.answer === pair.answer)) continue
        pairs.push(pair)
    }
    const explain = (pair: Pair) => (level === 'next' ? `${pair.question.split(',')[0]}=${pair.answer}` : `\\left(${pair.question}\\right)'=${pair.answer}`)
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: explain(pair) },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: explain(pair) }
    ]))
}
