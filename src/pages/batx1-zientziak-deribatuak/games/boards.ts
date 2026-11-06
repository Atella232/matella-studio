import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   Deribatuak (Batxilergoa 1 · Zientziak) memory: a function and its
   derivative. Level 1, powers and polynomials (k·xⁿ, √x, 1/x, ax² + bx);
   level 2, the rules (x·(x + p) and x²·(x + p), a power of a binomial,
   1/(x + a)); level 3, exponentials and logarithms (eᵏˣ, aˣ, ln(x + a),
   e^(x²)). No card carries sin or tan, whose name changes with the
   language. Every card has exactly one partner, and the text stays narrow
   enough for a card at 375 px.
   ========================================================================== */

export const BACH_DERIVATIVES_MEMORY_PAIRS = 6

export const bachDerivativesMemoryLevels = ['powers', 'rules', 'elementary'] as const

interface Pair {
    question: string
    answer: string
}

const signed = (value: number) => (value < 0 ? `-${-value}` : `+${value}`)
const coefficient = (value: number) => (value === 1 ? '' : value === -1 ? '-' : String(value))

function powersPair(random: Random): Pair | null {
    const kind = pick(random, ['power', 'root', 'inverse', 'quadratic'] as const)
    if (kind === 'power') {
        const k = pick(random, [1, 2, 3, -1, -2])
        const n = randomInt(random, 2, 5)
        return { question: `${coefficient(k)}x^${n}`, answer: `${coefficient(k * n)}x${n - 1 === 1 ? '' : `^${n - 1}`}` }
    }
    if (kind === 'root') {
        const k = pick(random, [1, 2, 4, 6])
        return { question: `${coefficient(k)}\\sqrt{x}`, answer: k === 2 ? '\\frac{1}{\\sqrt{x}}' : `\\frac{${k === 1 ? 1 : k / 2}}{${k === 1 ? '2' : ''}\\sqrt{x}}` }
    }
    if (kind === 'inverse') {
        const k = pick(random, [1, 2, 3, 5])
        return { question: `\\frac{${k}}{x}`, answer: `-\\frac{${k}}{x^2}` }
    }
    const a = pick(random, [-2, -1, 1, 2, 3])
    const b = randomInt(random, -5, 5)
    if (b === 0) return null
    const bx = b === 1 ? '+x' : b === -1 ? '-x' : `${signed(b)}x`
    return { question: `${coefficient(a)}x^2${bx}`, answer: `${2 * a}x${signed(b)}` }
}

function rulesPair(random: Random): Pair | null {
    const kind = pick(random, ['product', 'power', 'inverse'] as const)
    if (kind === 'product') {
        // Two binomials do not fit on a card at 375 px: x·(x + p) and x²·(x + p)
        const p = pick(random, [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5])
        return random() < 0.5
            ? { question: `x(x${signed(p)})`, answer: `2x${signed(p)}` }
            : { question: `x^2(x${signed(p)})`, answer: `3x^2${signed(2 * p)}x` }
    }
    if (kind === 'power') {
        const k = randomInt(random, 2, 4)
        const c = randomInt(random, 1, 3)
        const n = randomInt(random, 2, 4)
        return { question: `(${k}x+${c})^${n}`, answer: `${n * k}(${k}x+${c})${n - 1 === 1 ? '' : `^${n - 1}`}` }
    }
    const a = randomInt(random, 1, 5)
    return { question: `\\frac{1}{x+${a}}`, answer: `-\\frac{1}{(x+${a})^2}` }
}

function elementaryPair(random: Random): Pair | null {
    const kind = pick(random, ['exp', 'base', 'log', 'square'] as const)
    if (kind === 'exp') {
        const k = pick(random, [-3, -2, 2, 3, 4, 5])
        return { question: `e^{${k}x}`, answer: `${k}e^{${k}x}` }
    }
    if (kind === 'base') {
        const a = pick(random, [2, 3, 5, 10])
        return { question: `${a}^x`, answer: `${a}^x\\ln ${a}` }
    }
    if (kind === 'log') {
        const a = randomInt(random, 1, 6)
        return { question: `\\ln(x+${a})`, answer: `\\frac{1}{x+${a}}` }
    }
    const k = pick(random, [1, 2, 3])
    return { question: `e^{${coefficient(k)}x^2}`, answer: `${2 * k}x\\,e^{${coefficient(k)}x^2}` }
}

/** Six pairs of one level, every question and every answer different */
export function createBachDerivativesMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = bachDerivativesMemoryLevels[levelIndex] ?? 'powers'
    const make = level === 'powers' ? powersPair : level === 'rules' ? rulesPair : elementaryPair
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < BACH_DERIVATIVES_MEMORY_PAIRS && attempt < 3000; attempt += 1) {
        const pair = make(random)
        if (!pair || pairs.some((other) => other.question === pair.question || other.answer === pair.answer)) continue
        pairs.push(pair)
    }
    const explain = (pair: Pair) => `\\left(${pair.question}\\right)'=${pair.answer}`
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: explain(pair) },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: explain(pair) }
    ]))
}
