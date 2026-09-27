import { pick, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { Stars } from '../../../features/unit-v2/games/records.ts'
import { factorize } from '../math.ts'

/* ==========================================================================
   Deskonposaketa azkarra: factorize numbers by tapping primes, against the
   clock. Tapping a prime that does not divide costs time.
   ========================================================================== */

export const FACTOR_NUMBERS = 8
export const FACTOR_PENALTY_MS = 3000

export interface FactorLevel {
    primes: number[]
    min: number
    max: number
    /** Seconds an average student needs per number */
    secondsPerNumber: number
}

export const factorLevels: FactorLevel[] = [
    { primes: [2, 3, 5], min: 12, max: 100, secondsPerNumber: 7 },
    { primes: [2, 3, 5, 7], min: 60, max: 1000, secondsPerNumber: 10 },
    { primes: [2, 3, 5, 7, 11, 13], min: 200, max: 10000, secondsPerNumber: 13 }
]

/** Numbers whose prime factors are all in the level's buttons, with at least three factors */
export function factorPool(levelIndex: number, levels: FactorLevel[] = factorLevels): number[] {
    const { primes, min, max } = levels[levelIndex]
    const pool: number[] = []
    for (let value = min; value <= max; value += 1) {
        const factors = factorize(value)
        const count = factors.reduce((total, [, exponent]) => total + exponent, 0)
        if (count >= 3 && factors.every(([prime]) => primes.includes(prime))) pool.push(value)
    }
    return pool
}

export function createFactorNumbers(random: Random, levelIndex: number, levels: FactorLevel[] = factorLevels): number[] {
    const pool = factorPool(levelIndex, levels)
    const { primes } = levels[levelIndex]
    // The newest prime of the level shows up at least twice
    const newest = primes[primes.length - 1]
    const withNewest = shuffle(random, pool.filter((value) => value % newest === 0)).slice(0, 2)
    const rest = shuffle(random, pool.filter((value) => !withNewest.includes(value)))
    const chosen = [...withNewest]
    while (chosen.length < FACTOR_NUMBERS) {
        const next = rest.length ? rest.shift()! : pick(random, pool)
        if (!chosen.includes(next)) chosen.push(next)
    }
    return shuffle(random, chosen)
}

export function factorParTime(levelIndex: number, levels: FactorLevel[] = factorLevels): number {
    return (FACTOR_NUMBERS * levels[levelIndex].secondsPerNumber + 5) * 1000
}

export function factorStars(levelIndex: number, timeMs: number, mistakes: number, levels: FactorLevel[] = factorLevels): Stars {
    const par = factorParTime(levelIndex, levels)
    if (timeMs <= par * 0.8 && mistakes <= 1) return 3
    if (timeMs <= par) return 2
    return 1
}
