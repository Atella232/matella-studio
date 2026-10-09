import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   Antzekotasuna (4. DBH aplikatuak) memory: a Thales proportion and its
   missing segment, a ratio applied to a length, an area or a volume and
   the factor it gives, and a map distance with its scale and the real
   distance. Every card has exactly one partner.
   ========================================================================== */

export const SIMILARITY_MEMORY_PAIRS = 6

export const similarityMemoryLevels = ['thales', 'factors', 'scales'] as const

interface Pair {
    question: string
    answer: string
    /** The shared value, to tell pairs apart */
    key: number
}

/** A decimal in LaTeX with the comma and thousands grouped from five digits */
const tex = (value: number) => {
    const [whole, decimals] = String(Math.round(value * 1000) / 1000).split('.')
    const spaced = whole.length > 4 ? whole.replace(/\B(?=(\d{3})+$)/g, '\\,') : whole
    return decimals === undefined ? spaced : `${spaced}{,}${decimals}`
}

function thalesPair(random: Random): Pair | null {
    const a = randomInt(random, 2, 6)
    const k = pick(random, [2, 3, 1.5, 2.5])
    const c = randomInt(random, 2, 9)
    const x = c * k
    if (!Number.isInteger(x * 10)) return null
    return { question: `\\frac{${a}}{${tex(a * k)}}=\\frac{${c}}{x}`, answer: `x=${tex(x)}`, key: x }
}

function factorPair(random: Random): Pair {
    const r = pick(random, [2, 3, 4, 5, 10])
    const power = pick(random, [1, 2, 3])
    const name = power === 1 ? 'P' : power === 2 ? 'A' : 'V'
    return { question: `r=${r}\\ \\to\\ ${name}`, answer: `\\times ${tex(r ** power)}`, key: r ** power }
}

function scalePair(random: Random): Pair {
    const n = pick(random, [10000, 25000, 50000, 100000, 200000, 500000])
    const cm = randomInt(random, 1, 8)
    const km = (cm * n) / 100000
    return { question: `${cm}\\ \\text{cm},\\ 1\\mathbin{:}${tex(n)}`, answer: `${tex(km)}\\ \\text{km}`, key: km }
}

/** Six pairs with different values, so every card has exactly one partner */
export function createSimilarityMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = similarityMemoryLevels[levelIndex] ?? 'thales'
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < SIMILARITY_MEMORY_PAIRS && attempt < 800; attempt += 1) {
        const pair = level === 'thales' ? thalesPair(random) : level === 'factors' ? factorPair(random) : scalePair(random)
        if (!pair || pairs.some((other) => other.key === pair.key || other.question === pair.question)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` }
    ]))
}
