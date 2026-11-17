import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   Aljebra (Batxilergoa 1 · Gizarte Zientziak) memory: a quadratic and its
   roots, an exponential equation and its solution, and a break-even
   fraction and its number of units. Every card has exactly one partner.
   ========================================================================== */

export const GIZ_ALGEBRA_MEMORY_PAIRS = 6

export const gizAlgebraMemoryLevels = ['roots', 'exponential', 'break-even'] as const

interface Pair {
    question: string
    answer: string
    key: string
}

function rootsPair(random: Random): Pair {
    const small = randomInt(random, 1, 6)
    const big = small + randomInt(random, 1, 5)
    return { question: `x^{2}-${small + big}x+${small * big}`, answer: `x=${small},\\ x=${big}`, key: `${small}-${big}` }
}

function exponentialPair(random: Random): Pair {
    const base = pick(random, [2, 3, 5, 10])
    const most = { 2: 7, 3: 5, 5: 4, 10: 3 }[base] ?? 3
    const power = randomInt(random, 1, most)
    const value = base ** power
    return { question: `${base}^{x}=${value >= 10000 ? String(value).replace(/\B(?=(\d{3})+(?!\d))/g, '\\,') : value}`, answer: `x=${power}`, key: String(power) }
}

function breakEvenPair(random: Random): Pair {
    const margin = randomInt(random, 2, 8)
    const cost = randomInt(random, 1, 9)
    const point = randomInt(random, 2, 20) * 10
    return { question: `\\frac{${margin * point}}{${cost + margin}-${cost}}`, answer: String(point), key: String(point) }
}

/** Six pairs with different answers, so every card has exactly one partner */
export function createGizAlgebraMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = gizAlgebraMemoryLevels[levelIndex] ?? 'roots'
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < GIZ_ALGEBRA_MEMORY_PAIRS && attempt < 2000; attempt += 1) {
        const pair = level === 'roots' ? rootsPair(random) : level === 'exponential' ? exponentialPair(random) : breakEvenPair(random)
        if (pairs.some((other) => other.key === pair.key || other.question === pair.question || other.answer === pair.answer)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}\\ \\to\\ ${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}\\ \\to\\ ${pair.answer}` }
    ]))
}
