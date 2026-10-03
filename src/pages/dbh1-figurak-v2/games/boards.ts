import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   Irudi lauak (1. DBH) memory: the angle sum of a polygon and its value,
   the central angle of a regular polygon and its value, and the diagonals
   of a polygon and how many they are. Every card has exactly one partner.
   ========================================================================== */

export const FIGURES_MEMORY_PAIRS = 6

export const figuresMemoryLevels = ['angle-sum', 'central', 'diagonals'] as const

interface Pair {
    question: string
    answer: string
    /** The shared value, to tell pairs apart */
    key: number
}

const angleSumPair = (random: Random): Pair => {
    const sides = pick(random, [3, 4, 5, 6, 7, 8, 9, 10, 12])
    return { question: `(${sides}-2)\\cdot 180^{\\circ}`, answer: `${(sides - 2) * 180}^{\\circ}`, key: sides }
}

const centralPair = (random: Random): Pair => {
    const sides = pick(random, [3, 4, 5, 6, 8, 9, 10, 12, 18, 20])
    return { question: `\\frac{360^{\\circ}}{${sides}}`, answer: `${360 / sides}^{\\circ}`, key: sides }
}

const diagonalsPair = (random: Random): Pair => {
    const sides = pick(random, [4, 5, 6, 7, 8, 9, 10, 12])
    return { question: `\\frac{${sides}\\cdot ${sides - 3}}{2}`, answer: `${(sides * (sides - 3)) / 2}`, key: sides }
}

const makers = { 'angle-sum': angleSumPair, central: centralPair, diagonals: diagonalsPair }

/** Six pairs with different values, so every card has exactly one partner */
export function createFiguresMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const make = makers[figuresMemoryLevels[levelIndex]]
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < FIGURES_MEMORY_PAIRS && attempt < 500; attempt += 1) {
        const pair = make(random)
        if (pairs.some((other) => other.key === pair.key)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}=${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}=${pair.answer}` }
    ]))
}
