import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { Stars } from '../../../features/unit-v2/games/records.ts'
import { linearLatex, termLatex, termsLatex, type Term } from '../algebra.ts'

/* ==========================================================================
   Aljebra (1. DBH) games besides the race:
   - Balantza azkarra: eight equations in a row, type x; a wrong answer
     costs time.
   - Memoria: an expression and its reduced form, an expression and its
     value, a product of monomials and its result.
   ========================================================================== */

/* ---------- Quick balance ---------- */

export const EQUATIONS_PER_ROUND = 8
export const EQUATION_PENALTY_MS = 3000

export type EquationKind = 'add' | 'subtract' | 'times' | 'divide' | 'two-step' | 'both-sides'

export interface EquationLevel {
    kinds: EquationKind[]
    secondsPerEquation: number
}

export const equationLevels: EquationLevel[] = [
    { kinds: ['add', 'subtract'], secondsPerEquation: 7 },
    { kinds: ['times', 'divide', 'two-step'], secondsPerEquation: 10 },
    { kinds: ['two-step', 'both-sides'], secondsPerEquation: 14 }
]

export interface EquationItem {
    latex: string
    answer: number
}

export function createEquation(random: Random, kind: EquationKind): EquationItem {
    const x = randomInt(random, kind === 'add' || kind === 'subtract' ? 0 : -4, 12)
    const n = randomInt(random, 2, 9)
    switch (kind) {
        case 'add': return { latex: `x+${n}=${x + n}`, answer: x }
        case 'subtract': return { latex: `x-${n}=${x - n}`, answer: x }
        case 'times': return { latex: `${n}x=${n * x}`, answer: x }
        case 'divide': return { latex: `\\frac{x}{${n}}=${x}`, answer: n * x }
        case 'two-step': {
            const b = randomInt(random, 1, 9) * (random() < 0.5 ? -1 : 1)
            return { latex: `${linearLatex({ a: n, b })}=${n * x + b}`, answer: x }
        }
        case 'both-sides': {
            const c = randomInt(random, 1, n - 1)
            const b = randomInt(random, 1, 9) * (random() < 0.5 ? -1 : 1)
            return { latex: `${linearLatex({ a: n, b })}=${linearLatex({ a: c, b: (n - c) * x + b })}`, answer: x }
        }
    }
}

export function createEquationRound(random: Random, levelIndex: number, levels: EquationLevel[] = equationLevels): EquationItem[] {
    const { kinds } = levels[levelIndex]
    const items: EquationItem[] = []
    while (items.length < EQUATIONS_PER_ROUND) {
        const item = createEquation(random, pick(random, kinds))
        if (!items.some((existing) => existing.latex === item.latex)) items.push(item)
    }
    return items
}

export function equationParTime(levelIndex: number, levels: EquationLevel[] = equationLevels): number {
    return (EQUATIONS_PER_ROUND * levels[levelIndex].secondsPerEquation + 5) * 1000
}

export function equationStars(levelIndex: number, timeMs: number, mistakes: number): Stars {
    const par = equationParTime(levelIndex)
    if (timeMs <= par * 0.8 && mistakes <= 1) return 3
    if (timeMs <= par) return 2
    return 1
}

/* ---------- Memory ---------- */

export const MEMORY_PAIRS = 6

export type AlgebraMemoryKind = 'reduce' | 'value' | 'product'

export interface AlgebraCard {
    id: string
    setId: number
    latex: string
    /** Plain value the pair shares, to explain a mismatch */
    shows: string
}

export const algebraMemoryLevels: AlgebraMemoryKind[] = ['reduce', 'value', 'product']

function reducePair(random: Random): [string, string] {
    const power = randomInt(random, 1, 2)
    const coefficients = [randomInt(random, 1, 7), randomInt(random, 1, 7) * (random() < 0.4 ? -1 : 1), random() < 0.5 ? randomInt(random, 1, 4) : 0].filter((value) => value !== 0)
    const sum = coefficients.reduce((total, value) => total + value, 0)
    const terms: Term[] = coefficients.map((coefficient) => ({ coefficient, power }))
    return [termsLatex(terms), sum === 0 ? '0' : termLatex({ coefficient: sum, power })]
}

function valuePair(random: Random): [string, string] {
    const a = randomInt(random, 2, 5)
    const b = randomInt(random, -6, 6)
    const x = randomInt(random, -3, 5)
    return [`${linearLatex({ a, b })}\\ (x=${x})`, String(a * x + b)]
}

function productPair(random: Random): [string, string] {
    const left: Term = { coefficient: randomInt(random, 2, 5) * (random() < 0.3 ? -1 : 1), power: randomInt(random, 1, 3) }
    const right: Term = { coefficient: randomInt(random, 2, 5), power: randomInt(random, 1, 3) }
    const product: Term = { coefficient: left.coefficient * right.coefficient, power: left.power + right.power }
    const first = termLatex(left)
    return [`${first.startsWith('-') ? `(${first})` : first}\\cdot ${termLatex(right)}`, termLatex(product)]
}

const makers: Record<AlgebraMemoryKind, (random: Random) => [string, string]> = { reduce: reducePair, value: valuePair, product: productPair }

/** Six pairs whose results are all different, so every card has exactly one partner */
export function createAlgebraMemoryBoard(random: Random, levelIndex: number): AlgebraCard[] {
    const kind = algebraMemoryLevels[levelIndex]
    const pairs: Array<[string, string]> = []
    for (let attempt = 0; pairs.length < MEMORY_PAIRS && attempt < 500; attempt += 1) {
        const pair = makers[kind](random)
        if (pairs.some(([question, answer]) => answer === pair[1] || question === pair[0])) continue
        pairs.push(pair)
    }
    const cards = pairs.flatMap(([question, answer], setId) => [
        { id: `${setId}-q`, setId, latex: question, shows: answer },
        { id: `${setId}-a`, setId, latex: answer, shows: answer }
    ])
    return shuffle(random, cards)
}

export function algebraMemoryStars(moves: number): Stars {
    if (moves <= Math.ceil(MEMORY_PAIRS * 1.6)) return 3
    if (moves <= Math.ceil(MEMORY_PAIRS * 2.3)) return 2
    return 1
}
