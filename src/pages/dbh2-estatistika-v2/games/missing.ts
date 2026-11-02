import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { Stars } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   J1 · Falta den txartela (La carta que falta): a set of data with one
   card face down, and a target. The learner finds the hidden value so
   that the data have that mean (level 1) or that median (level 2), or the
   missing frequency of a table with that mean (level 3), sets it and
   turns the card. Several values can give the same median: any of them
   is right.
   ========================================================================== */

export const MISSING_ROUNDS = 5

export type MissingKind = 'mean' | 'median' | 'frequency'

export interface MissingRound {
    kind: MissingKind
    /** The cards shown, in the order shown (mean and median) */
    known: number[]
    /** Frequency table: the values and their frequencies, one of them missing (null) */
    table: { values: number[]; frequencies: Array<number | null> } | null
    target: number
    /** The only right answer */
    answer: number
    min: number
    max: number
}

export const mean = (values: number[]) => values.reduce((sum, value) => sum + value, 0) / values.length
export function median(values: number[]): number {
    const sorted = [...values].sort((a, b) => a - b)
    const middle = Math.floor(sorted.length / 2)
    return sorted.length % 2 === 1 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2
}
export function tableMean(values: number[], frequencies: number[]): number {
    const total = frequencies.reduce((sum, frequency) => sum + frequency, 0)
    return values.reduce((sum, value, index) => sum + value * frequencies[index], 0) / total
}

/** True when the hidden value gives the target */
export function missingRight(round: MissingRound, hidden: number): boolean {
    if (round.kind === 'mean') return Math.abs(mean([...round.known, hidden]) - round.target) < 1e-9
    if (round.kind === 'median') return Math.abs(median([...round.known, hidden]) - round.target) < 1e-9
    const frequencies = round.table!.frequencies.map((frequency) => frequency ?? hidden)
    return hidden > 0 && Math.abs(tableMean(round.table!.values, frequencies) - round.target) < 1e-9
}

export function createMissingRound(random: Random, levelIndex: number): MissingRound {
    for (;;) {
        if (levelIndex === 0) {
            // Five marks out of 10, one hidden; a whole mean
            const known = Array.from({ length: 4 }, () => randomInt(random, 2, 10))
            const target = randomInt(random, 4, 8)
            const answer = 5 * target - known.reduce((sum, value) => sum + value, 0)
            // Never the value the stepper starts on
            if (answer < 1 || answer > 10) continue
            return { kind: 'mean', known, table: null, target, answer, min: 0, max: 10 }
        }
        if (levelIndex === 1) {
            // Five marks shown and one hidden: six data, so the median is the mean of the two middle ones
            const known = Array.from({ length: 5 }, () => randomInt(random, 1, 10))
            const sorted = [...known].sort((a, b) => a - b)
            const [second, middle, fourth] = [sorted[1], sorted[2], sorted[3]]
            const options = Array.from({ length: 11 }, (_, value) => value).filter((value) => value > second && value < fourth && value !== middle)
            if (options.length === 0) continue
            const answer = pick(random, options)
            return { kind: 'median', known: shuffle(random, known), table: null, target: (answer + middle) / 2, answer, min: 0, max: 10 }
        }
        // A table of brothers and sisters with one frequency missing; a mean with at most one decimal
        const values = [0, 1, 2, 3, 4]
        const frequencies = values.map(() => randomInt(random, 1, 9))
        const missingIndex = pick(random, [0, 1, 3, 4])
        const target = tableMean(values, frequencies)
        if (!Number.isInteger(target * 10) || frequencies[missingIndex] > 12) continue
        // The answer must be the only frequency that gives this mean
        const answer = frequencies[missingIndex]
        if (Math.abs(values[missingIndex] - target) < 1e-9 || answer < 2) continue
        return { kind: 'frequency', known: [], table: { values, frequencies: frequencies.map((frequency, index) => (index === missingIndex ? null : frequency)) }, target, answer, min: 1, max: 15 }
    }
}

export const createMissingRounds = (random: Random, levelIndex: number) => Array.from({ length: MISSING_ROUNDS }, () => createMissingRound(random, levelIndex))

export function missingStars(score: number): Stars {
    if (score >= 5) return 3
    if (score >= 4) return 2
    if (score >= 3) return 1
    return 0
}
