import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   Pitagorasen teorema (2. DBH) memory: square roots and their value, the
   hypotenuse from two legs, and a leg from the hypotenuse and the other
   leg. Every card has exactly one partner.
   ========================================================================== */

export const PYTHAGORAS_MEMORY_PAIRS = 6

export const pythagorasMemoryLevels = ['roots', 'hypotenuse', 'leg'] as const

interface Pair {
    question: string
    answer: string
    /** The shared value, to tell pairs apart */
    key: number
}

const TRIPLES: Array<[number, number, number]> = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17], [12, 16, 20], [7, 24, 25], [15, 20, 25], [10, 24, 26], [20, 21, 29], [18, 24, 30]]

const rootPair = (random: Random): Pair => {
    const value = pick(random, [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 20, 25])
    return { question: `\\sqrt{${value * value}}`, answer: `${value}`, key: value }
}

const hypotenusePair = (random: Random): Pair => {
    const [a, b, c] = pick(random, TRIPLES)
    return { question: `\\sqrt{${a}^{2}+${b}^{2}}`, answer: `${c}`, key: c }
}

const legPair = (random: Random): Pair => {
    const [a, b, c] = pick(random, TRIPLES)
    const [known, unknown] = random() < 0.5 ? [a, b] : [b, a]
    return { question: `\\sqrt{${c}^{2}-${known}^{2}}`, answer: `${unknown}`, key: unknown }
}

const makers = { roots: rootPair, hypotenuse: hypotenusePair, leg: legPair }

/** Six pairs with different values, so every card has exactly one partner */
export function createPythagorasMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const make = makers[pythagorasMemoryLevels[levelIndex]]
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < PYTHAGORAS_MEMORY_PAIRS && attempt < 500; attempt += 1) {
        const pair = make(random)
        if (pairs.some((other) => other.key === pair.key)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}=${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}=${pair.answer}` }
    ]))
}
