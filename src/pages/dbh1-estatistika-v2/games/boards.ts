import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { Stars } from '../../../features/unit-v2/games/records.ts'
import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'

/* ==========================================================================
   Estatistika (1. DBH) games besides the race:
   - Batez bestekoaren begia: some data are drawn on a line; estimate their
     mean. The closer, the more points.
   - Memoria: a frequency and its percentage, some data and their mean, a
     die event and its probability.
   ========================================================================== */

/* ---------- Estimating the mean ---------- */

export const MEAN_ROUNDS = 8

export interface MeanLevel {
    count: number
    max: number
    /** Only whole means on the first level */
    wholeMean: boolean
}

export const meanLevels: MeanLevel[] = [
    { count: 4, max: 10, wholeMean: true },
    { count: 5, max: 10, wholeMean: false },
    { count: 7, max: 20, wholeMean: false }
]

export const meanOfData = (values: number[]) => values.reduce((sum, value) => sum + value, 0) / values.length

export function createMeanRound(random: Random, levelIndex: number): number[][] {
    const { count, max, wholeMean } = meanLevels[levelIndex]
    const rounds: number[][] = []
    while (rounds.length < MEAN_ROUNDS) {
        const values = Array.from({ length: count }, () => randomInt(random, 0, max)).sort((x, y) => x - y)
        if (wholeMean && !Number.isInteger(meanOfData(values))) continue
        if (values[count - 1] - values[0] < 3) continue
        if (rounds.some((round) => round.join() === values.join())) continue
        rounds.push(values)
    }
    return rounds
}

/** Points for one estimate, relative to the size of the line: 3 very close, 2 close, 1 near */
export function meanPoints(guess: number, values: number[], max: number): number {
    const error = Math.abs(guess - meanOfData(values)) / max
    if (error <= 0.03) return 3
    if (error <= 0.08) return 2
    if (error <= 0.15) return 1
    return 0
}

export function meanStars(total: number): Stars {
    if (total >= 20) return 3
    if (total >= 13) return 2
    return 1
}

/* ---------- Memory ---------- */

export const STATISTICS_MEMORY_PAIRS = 6

export const statisticsMemoryLevels = ['percent', 'mean', 'probability'] as const

function percentPair(random: Random): [string, string] {
    const n = pick(random, [4, 5, 10, 20, 25, 50])
    const f = randomInt(random, 1, n - 1)
    return [`\\frac{${f}}{${n}}`, `${(100 * f) / n}\\,\\%`]
}

function meanPair(random: Random): [string, string] {
    const count = pick(random, [2, 3, 4])
    const values = Array.from({ length: count }, () => randomInt(random, 1, 12))
    const sum = values.reduce((total, value) => total + value, 0)
    if (sum % count !== 0) return meanPair(random)
    return [`\\frac{${values.join('+')}}{${count}}`, String(sum / count)]
}

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))

/** A die event with k favourable faces: P = k/6, written simplified */
function probabilityPair(random: Random): [string, string] {
    const size = randomInt(random, 1, 6)
    const faces = shuffle(random, [1, 2, 3, 4, 5, 6]).slice(0, size).sort((x, y) => x - y)
    const divisor = gcd(size, 6)
    const answer = size === 6 ? '1' : `\\frac{${size / divisor}}{${6 / divisor}}`
    return [`P(\\{${faces.join(',')}\\})`, answer]
}

const makers = { percent: percentPair, mean: meanPair, probability: probabilityPair }

/** Six pairs with different results, so every card has exactly one partner */
export function createStatisticsMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const make = makers[statisticsMemoryLevels[levelIndex]]
    const pairs: Array<[string, string]> = []
    for (let attempt = 0; pairs.length < STATISTICS_MEMORY_PAIRS && attempt < 500; attempt += 1) {
        const pair = make(random)
        if (pairs.some(([question, answer]) => answer === pair[1] || question === pair[0])) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap(([question, answer], setId) => [
        { id: `${setId}-q`, setId, latex: question, shows: answer },
        { id: `${setId}-a`, setId, latex: answer, shows: answer }
    ]))
}
