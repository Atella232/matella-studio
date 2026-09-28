import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { Stars } from '../../../features/unit-v2/games/records.ts'
import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { reduceTerms, termLatex, termsLatex, type Term } from '../../dbh1-aljebra-v2/algebra.ts'

/* ==========================================================================
   Aljebra (2. DBH) games besides the race:
   - Garapen azkarra: a product is shown; type the coefficient of x or the
     independent term of its expansion. A wrong answer costs time.
   - Memoria: a notable product and its expansion, a polynomial and its
     factorisation, a product of monomials and its result.
   ========================================================================== */

/* ---------- Quick expansion ---------- */

export const EXPANSIONS_PER_ROUND = 8
export const EXPANSION_PENALTY_MS = 3000

export type ExpansionKind = 'binomials' | 'square' | 'sum-difference'
export type ExpansionAsk = 'middle' | 'constant'

export interface ExpansionLevel {
    kinds: ExpansionKind[]
    /** Largest coefficient of x in the factors */
    maxP: number
    secondsPerItem: number
}

export const expansionLevels: ExpansionLevel[] = [
    { kinds: ['binomials'], maxP: 1, secondsPerItem: 8 },
    { kinds: ['square', 'sum-difference'], maxP: 1, secondsPerItem: 8 },
    { kinds: ['binomials', 'square', 'sum-difference'], maxP: 4, secondsPerItem: 11 }
]

export interface ExpansionItem {
    latex: string
    ask: ExpansionAsk
    answer: number
    /** The whole expansion, shown after answering */
    expansion: string
}

export const expansionAskText: Record<ExpansionAsk, LocalizedText> = {
    middle: { eu: 'x-ren koefizientea', es: 'Coeficiente de x', ar: 'معامل x' },
    constant: { eu: 'Gai askea', es: 'Término independiente', ar: 'الحد الثابت' }
}

const t = (coefficient: number, power: number): Term => ({ coefficient, power })
const signed = (random: Random, min: number, max: number) => randomInt(random, min, max) * (random() < 0.5 ? -1 : 1)

export function createExpansion(random: Random, level: ExpansionLevel): ExpansionItem {
    const kind = pick(random, level.kinds)
    const p = randomInt(random, 1, level.maxP)
    const ask = pick(random, ['middle', 'constant'] as const)
    let factors: string
    let terms: Term[]
    if (kind === 'binomials') {
        const a = signed(random, 1, 7)
        let b = signed(random, 1, 7)
        if (a === -b) b = -b
        factors = `(${termsLatex([t(p, 1), t(a, 0)])})(${termsLatex([t(1, 1), t(b, 0)])})`
        terms = [t(p, 2), t(p * b + a, 1), t(a * b, 0)]
    } else if (kind === 'square') {
        const q = signed(random, 1, 9)
        factors = `(${termsLatex([t(p, 1), t(q, 0)])})^{2}`
        terms = [t(p * p, 2), t(2 * p * q, 1), t(q * q, 0)]
    } else {
        const q = randomInt(random, 1, 9)
        factors = `(${termsLatex([t(p, 1), t(q, 0)])})(${termsLatex([t(p, 1), t(-q, 0)])})`
        terms = [t(p * p, 2), t(0, 1), t(-q * q, 0)]
    }
    const answer = terms.find((term) => term.power === (ask === 'middle' ? 1 : 0))!.coefficient
    return { latex: factors, ask, answer, expansion: termsLatex(reduceTerms(terms)) }
}

export function createExpansionRound(random: Random, levelIndex: number): ExpansionItem[] {
    const items: ExpansionItem[] = []
    while (items.length < EXPANSIONS_PER_ROUND) {
        const item = createExpansion(random, expansionLevels[levelIndex])
        if (!items.some((existing) => existing.latex === item.latex && existing.ask === item.ask)) items.push(item)
    }
    return items
}

export function expansionParTime(levelIndex: number): number {
    return (EXPANSIONS_PER_ROUND * expansionLevels[levelIndex].secondsPerItem + 5) * 1000
}

export function expansionStars(levelIndex: number, timeMs: number, mistakes: number): Stars {
    const par = expansionParTime(levelIndex)
    if (timeMs <= par * 0.8 && mistakes <= 1) return 3
    if (timeMs <= par) return 2
    return 1
}

/* ---------- Memory ---------- */

export const ALGEBRA_MEMORY_PAIRS = 6

export const algebraMemoryLevels = ['monomials', 'products', 'factor'] as const

function monomialPair(random: Random): [string, string] {
    const a = randomInt(random, 2, 6)
    const b = signed(random, 2, 5)
    const p = randomInt(random, 1, 4)
    const q = randomInt(random, 1, 3)
    const right = termLatex(t(b, q))
    return [`${termLatex(t(a, p))}\\cdot ${b < 0 ? `(${right})` : right}`, termLatex(t(a * b, p + q))]
}

function productPair(random: Random): [string, string] {
    const q = randomInt(random, 1, 9)
    const kind = pick(random, ['sum', 'difference', 'product'] as const)
    if (kind === 'product') return [`(x+${q})(x-${q})`, termsLatex([t(1, 2), t(-q * q, 0)])]
    const sign = kind === 'sum' ? 1 : -1
    return [`(${termsLatex([t(1, 1), t(sign * q, 0)])})^{2}`, termsLatex([t(1, 2), t(sign * 2 * q, 1), t(q * q, 0)])]
}

const gcd = (left: number, right: number): number => (right === 0 ? left : gcd(right, left % right))

function factorPair(random: Random): [string, string] {
    const g = randomInt(random, 2, 6)
    const power = randomInt(random, 0, 2)
    const a = randomInt(random, 1, 5)
    const b = signed(random, 1, 5)
    // Nothing may stay in common inside the bracket
    if (gcd(a, Math.abs(b)) !== 1) return factorPair(random)
    const inner = [t(a, 1), t(b, 0)]
    const expanded = termsLatex(inner.map((term) => t(term.coefficient * g, term.power + power)))
    return [expanded, `${termLatex(t(g, power))}(${termsLatex(inner)})`]
}

const makers = { monomials: monomialPair, products: productPair, factor: factorPair }

/** Six pairs with different cards, so every card has exactly one partner */
export function createAlgebraMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const make = makers[algebraMemoryLevels[levelIndex]]
    const pairs: Array<[string, string]> = []
    for (let attempt = 0; pairs.length < ALGEBRA_MEMORY_PAIRS && attempt < 500; attempt += 1) {
        const pair = make(random)
        if (pairs.some(([question, answer]) => answer === pair[1] || question === pair[0] || answer === pair[0] || question === pair[1])) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap(([question, answer], setId) => [
        { id: `${setId}-q`, setId, latex: question, shows: answer },
        { id: `${setId}-a`, setId, latex: answer, shows: answer }
    ]))
}
