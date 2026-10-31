import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   Planoko geometria (3. DBH) memory: the number of sides of a polygon and
   the sum of its angles, two legs and the hypotenuse, and an area formula
   with its value. Every card has exactly one partner, and the text stays
   short enough for a card on a phone.
   ========================================================================== */

export const GEOMETRY3_MEMORY_PAIRS = 6

interface MemoryPair {
    question: string
    answer: string
}

const TRIPLES: Array<[number, number, number]> = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17], [12, 16, 20], [7, 24, 25], [15, 20, 25], [10, 24, 26], [20, 21, 29], [9, 40, 41], [12, 35, 37]]

function anglePair(random: Random): MemoryPair {
    const n = randomInt(random, 3, 12)
    return { question: `n=${n}`, answer: `${(n - 2) * 180}°` }
}

function pythagorasPair(random: Random): MemoryPair {
    const [b, c, a] = pick(random, TRIPLES)
    return { question: `${b},\\ ${c}`, answer: `${a}` }
}

function areaPair(random: Random): MemoryPair {
    const a = randomInt(random, 2, 12)
    const b = 2 * randomInt(random, 1, 6)
    return random() < 0.5
        ? { question: `\\frac{${a}\\cdot ${b}}{2}`, answer: `${(a * b) / 2}` }
        : { question: `${a}\\cdot ${b}`, answer: `${a * b}` }
}

const generators = [anglePair, pythagorasPair, areaPair]

/** Six pairs with different answers, so every card has exactly one partner */
export function createGeometry3MemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const make = generators[levelIndex] ?? generators[0]
    const pairs: MemoryPair[] = []
    for (let attempt = 0; pairs.length < GEOMETRY3_MEMORY_PAIRS && attempt < 3000; attempt += 1) {
        const pair = make(random)
        if (pairs.some((other) => other.answer === pair.answer || other.question === pair.question)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}\\ \\to\\ ${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}\\ \\to\\ ${pair.answer}` }
    ]))
}
