import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { complexLatex, mul, type Complex } from '../lab/complex.ts'

/* ==========================================================================
   Zenbaki konplexuak (Batxilergoa 1 · Zientziak) memory: a power of i
   times a number and its value; a number in polar form and the same
   number in binomial form; and an operation (a conjugate, an opposite, a
   product, a square, a division) and its result. Every card has exactly
   one partner (no two pairs share a question or an answer), and `value`
   lets the tests check every pair.
   ========================================================================== */

export const COMPLEX_MEMORY_PAIRS = 6

export const complexMemoryLevels = ['powers', 'polar', 'operations'] as const

export interface ComplexPair {
    question: string
    answer: string
    /** The value of both sides */
    value: Complex
}

const pow = (value: Complex, n: number): Complex => (n === 0 ? [1, 0] : mul(value, pow(value, n - 1)))
const bracket = (value: Complex) => (value[0] !== 0 && value[1] !== 0) || value[0] < 0 || value[1] < 0 ? `(${complexLatex(value)})` : complexLatex(value)

function powerPair(random: Random): ComplexPair {
    const n = randomInt(random, 2, 15)
    const k = randomInt(random, 1, 4)
    const value: Complex = mul([k, 0], pow([0, 1], n))
    return { question: k === 1 ? `i^{${n}}` : `${k}i^{${n}}`, answer: complexLatex(value), value }
}

const r3 = Math.sqrt(3)
/** Numbers whose polar and binomial forms both fit on a card */
const POLAR: ComplexPair[] = [
    { question: '2_{90°}', answer: '2i', value: [0, 2] },
    { question: '3_{180°}', answer: '-3', value: [-3, 0] },
    { question: '5_{270°}', answer: '-5i', value: [0, -5] },
    { question: '4_{0°}', answer: '4', value: [4, 0] },
    { question: '\\sqrt{2}_{45°}', answer: '1+i', value: [1, 1] },
    { question: '\\sqrt{2}_{135°}', answer: '-1+i', value: [-1, 1] },
    { question: '\\sqrt{2}_{225°}', answer: '-1-i', value: [-1, -1] },
    { question: '\\sqrt{2}_{315°}', answer: '1-i', value: [1, -1] },
    { question: '2_{60°}', answer: '1+\\sqrt{3}\\,i', value: [1, r3] },
    { question: '2_{120°}', answer: '-1+\\sqrt{3}\\,i', value: [-1, r3] },
    { question: '2_{300°}', answer: '1-\\sqrt{3}\\,i', value: [1, -r3] },
    { question: '2_{30°}', answer: '\\sqrt{3}+i', value: [r3, 1] },
    { question: '2_{210°}', answer: '-\\sqrt{3}-i', value: [-r3, -1] },
    { question: '2\\sqrt{2}_{45°}', answer: '2+2i', value: [2, 2] },
    { question: '2\\sqrt{2}_{315°}', answer: '2-2i', value: [2, -2] },
    { question: '3\\sqrt{2}_{135°}', answer: '-3+3i', value: [-3, 3] }
]

function operationPair(random: Random): ComplexPair | null {
    const kind = pick(random, ['conjugate', 'opposite', 'product', 'square', 'division', 'times-i'])
    const z: Complex = [randomInt(random, -4, 4), randomInt(random, -4, 4)]
    if (z[0] === 0 || z[1] === 0) return null
    if (kind === 'conjugate') return { question: `\\overline{${complexLatex(z)}}`, answer: complexLatex([z[0], -z[1]]), value: [z[0], -z[1]] }
    if (kind === 'opposite') return { question: `-(${complexLatex(z)})`, answer: complexLatex([-z[0], -z[1]]), value: [-z[0], -z[1]] }
    if (kind === 'times-i') {
        const value = mul(z, [0, 1])
        return { question: `i${bracket(z)}`, answer: complexLatex(value), value }
    }
    if (kind === 'product') {
        // A number by its conjugate: always real
        const value: Complex = [z[0] ** 2 + z[1] ** 2, 0]
        return { question: `${bracket(z)}${bracket([z[0], -z[1]])}`, answer: complexLatex(value), value }
    }
    if (kind === 'square') {
        const w: Complex = [randomInt(random, 1, 3), pick(random, [-2, -1, 1, 2])]
        const value = mul(w, w)
        return { question: `${bracket(w)}^2`, answer: complexLatex(value), value }
    }
    const d: Complex = pick(random, [[1, 1], [1, -1], [0, 1]] as Complex[])
    const w: Complex = [randomInt(random, -3, 3), randomInt(random, -3, 3)]
    if (w[0] === 0 && w[1] === 0) return null
    const top = mul(w, d)
    if (top[0] === 0 || top[1] === 0) return null
    return { question: `\\frac{${complexLatex(top)}}{${complexLatex(d)}}`, answer: complexLatex(w), value: w }
}

/** Six pairs with different questions and answers, so every card has exactly one partner */
export function createComplexMemoryPairs(random: Random, levelIndex: number): ComplexPair[] {
    const level = complexMemoryLevels[levelIndex] ?? 'powers'
    const pairs: ComplexPair[] = []
    for (let attempt = 0; pairs.length < COMPLEX_MEMORY_PAIRS && attempt < 3000; attempt += 1) {
        const pair = level === 'powers' ? powerPair(random) : level === 'polar' ? pick(random, POLAR) : operationPair(random)
        if (!pair || pairs.some((other) => other.question === pair.question || other.answer === pair.answer)) continue
        pairs.push(pair)
    }
    return pairs
}

/** The pairs of the polar level, as the tests check them */
export const complexPolarPairs = POLAR

/** The cards of a board */
export function createComplexMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const pairs = createComplexMemoryPairs(random, levelIndex)
    return shuffle(random, pairs.flatMap((pair, setId) => {
        const explain = `${pair.question}=${pair.answer}`
        return [
            { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain },
            { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain }
        ]
    }))
}
