import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   Azalerak, bolumenak eta antzekotasuna (4. DBH akademikoak) memory: the
   two projections on the hypotenuse and the altitude (h² = m · n), a ratio
   k with the factor it gives to areas or volumes (k² and k³), and the
   volume of a cylinder, cone or sphere in terms of π. Every card has
   exactly one partner, and the text stays short enough for a phone card:
   one short row per line.
   ========================================================================== */

export const AREAS_SIMILARITY_MEMORY_PAIRS = 6

export const areasSimilarityMemoryLevels = ['altitude', 'ratios', 'volumes'] as const

interface Pair {
    question: string
    answer: string
}

const lines = (...rows: string[]) => `\\begin{array}{c}${rows.join('\\\\')}\\end{array}`
/** A multiple of π: 1 → π, 12 → 12π */
const timesPi = (k: number) => (k === 1 ? '\\pi' : `${k}\\pi`)

function altitudePair(random: Random): Pair | null {
    const m = randomInt(random, 1, 9)
    const n = randomInt(random, m + 1, 25)
    const h = Math.sqrt(m * n)
    if (!Number.isInteger(h)) return null
    return { question: lines(`m{=}${m}`, `n{=}${n}`), answer: `h{=}${h}` }
}

function ratioPair(random: Random): Pair {
    const k = pick(random, [2, 3, 4, 5, 10])
    const volume = random() < 0.5
    return { question: lines(`k{=}${k}`, volume ? 'V_{2}\\mathbin{:}V_{1}' : 'A_{2}\\mathbin{:}A_{1}'), answer: String(volume ? k ** 3 : k ** 2) }
}

function volumePair(random: Random): Pair | null {
    const solid = pick(random, ['cylinder', 'cone', 'sphere'] as const)
    const r = randomInt(random, 1, solid === 'sphere' ? 3 : 4)
    const h = randomInt(random, 2, 9)
    if (solid === 'cylinder') return { question: `\\pi{\\cdot}${r}^{2}{\\cdot}${h}`, answer: timesPi(r * r * h) }
    if (solid === 'cone') {
        if ((r * r * h) % 3 !== 0) return null
        return { question: `\\frac{\\pi{\\cdot}${r}^{2}{\\cdot}${h}}{3}`, answer: timesPi((r * r * h) / 3) }
    }
    if ((4 * r ** 3) % 3 !== 0) return null
    return { question: `\\frac{4\\pi{\\cdot}${r}^{3}}{3}`, answer: timesPi((4 * r ** 3) / 3) }
}

/** Six pairs with different questions and answers, so every card has exactly one partner */
export function createAreasSimilarityMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = areasSimilarityMemoryLevels[levelIndex] ?? 'altitude'
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < AREAS_SIMILARITY_MEMORY_PAIRS && attempt < 3000; attempt += 1) {
        const pair = level === 'altitude' ? altitudePair(random) : level === 'ratios' ? ratioPair(random) : volumePair(random)
        if (!pair || pairs.some((other) => other.question === pair.question || other.answer === pair.answer)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` }
    ]))
}
