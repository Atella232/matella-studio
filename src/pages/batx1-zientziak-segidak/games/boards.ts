import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { written } from '../../batx1-zientziak-errealak/games/race.ts'
import { fraction } from '../../../features/unit-v2/math/fraction.ts'

/* ==========================================================================
   Segidak (Batxilergoa 1 · Zientziak) memory: a progression and one of its
   terms, an infinite geometric sum and its value, and the limit of a
   quotient and its value. Every card has exactly one partner, and the
   text stays short enough for a card.
   ========================================================================== */

export const BACH_SEQUENCES_MEMORY_PAIRS = 6

export const bachSequencesMemoryLevels = ['terms', 'series', 'limits'] as const

interface Pair {
    question: string
    answer: string
}

function termPair(random: Random): Pair | null {
    const p = randomInt(random, 2, 6)
    const q = randomInt(random, -5, 5)
    const n = randomInt(random, 3, 10)
    if (q === 0) return null
    return { question: `a_n=${p}n${q < 0 ? '-' : '+'}${Math.abs(q)},\\ a_{${n}}`, answer: String(p * n + q) }
}

function seriesPair(random: Random): Pair | null {
    const k = pick(random, [2, 3, 4])
    const a1 = k * randomInt(random, 1, 5)
    const sign = pick(random, [1, -1])
    const second = (a1 * sign) / k
    const sum = written(fraction(a1 * k, k - sign))
    if (!sum) return null
    return { question: `${a1}${second < 0 ? '-' : '+'}${Math.abs(second)}+\\ldots`, answer: sum }
}

function limitPair(random: Random): Pair | null {
    const a = randomInt(random, 1, 9)
    const b = randomInt(random, 1, 5)
    const c = randomInt(random, 1, 9)
    const limit = written(fraction(a, b))
    if (!limit) return null
    return { question: `\\lim\\frac{${a === 1 ? '' : a}n+${c}}{${b === 1 ? '' : b}n}`, answer: limit }
}

/** Six pairs with different answers, so every card has exactly one partner */
export function createBachSequencesMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = bachSequencesMemoryLevels[levelIndex] ?? 'terms'
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < BACH_SEQUENCES_MEMORY_PAIRS && attempt < 3000; attempt += 1) {
        const pair = level === 'terms' ? termPair(random) : level === 'series' ? seriesPair(random) : limitPair(random)
        if (!pair || pairs.some((other) => other.question === pair.question || other.answer === pair.answer)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}\\ \\Rightarrow\\ ${pair.answer}` }
    ]))
}
