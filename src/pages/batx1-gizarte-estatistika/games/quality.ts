import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J1 · Kalitate-kontrola (Control de calidad): a factory measures its
   parts and keeps those between two limits. Each round shows the lengths
   in five intervals of the same width and the acceptable stretch; the
   learner picks how many parts are faulty. The limits fall inside the
   second and fourth intervals, so only part of them counts (the data are
   spread evenly in each interval). Level 1: the limits at the middle of
   those intervals; level 2: at a quarter or three quarters; level 3: the
   answer as a percentage. The wrong options are the typical mistakes:
   counting the cut intervals whole, leaving them out, or giving the
   acceptable parts instead of the faulty ones. Every count is whole.
   ========================================================================== */

export const QUALITY_ROUNDS = 6

export type QualityMistake = 'whole' | 'none' | 'inside'

export interface QualityRound {
    start: number
    width: number
    counts: number[]
    low: number
    high: number
    /** Ask for the percentage of faulty parts (level 3) */
    percent: boolean
    /** The options in order: the right one and the three mistakes */
    options: Array<{ value: number; mistake: QualityMistake | null }>
}

export const qualityTotal = (round: Pick<QualityRound, 'counts'>) => round.counts.reduce((sum, count) => sum + count, 0)

/** The acceptable parts of each interval: whole inside, a part, or none */
export function acceptedParts(round: Pick<QualityRound, 'start' | 'width' | 'counts' | 'low' | 'high'>): number[] {
    return round.counts.map((count, index) => {
        const from = round.start + index * round.width
        const to = from + round.width
        const inside = Math.max(0, Math.min(to, round.high) - Math.max(from, round.low))
        return (count * inside) / round.width
    })
}

export const acceptedCount = (round: Pick<QualityRound, 'start' | 'width' | 'counts' | 'low' | 'high'>) => acceptedParts(round).reduce((sum, part) => sum + part, 0)
export const faultyCount = (round: Pick<QualityRound, 'start' | 'width' | 'counts' | 'low' | 'high'>) => qualityTotal(round) - acceptedCount(round)

/** The right answer: faulty parts, or their percentage */
export const qualityAnswer = (round: QualityRound) => (round.percent ? (faultyCount(round) / qualityTotal(round)) * 100 : faultyCount(round))

function makeRound(random: Random, level: number): QualityRound | null {
    const width = pick(random, [2, 4])
    const start = pick(random, [20, 30, 40, 60, 80])
    // Counts that split into quarters; a bell shape
    const counts = [randomInt(random, 1, 4), randomInt(random, 5, 12), randomInt(random, 12, 25), randomInt(random, 5, 12), randomInt(random, 1, 4)].map((count) => count * 4)
    if (level === 2) {
        // A total of 200, 400 or 500 for a whole percentage
        const total = counts.reduce((sum, count) => sum + count, 0)
        const target = pick(random, [200, 400, 500].filter((value) => value > total))
        counts[2] += target - total
    }
    const fraction = (position: number) => (level === 0 ? 0.5 : position)
    const lowShare = fraction(pick(random, [0.25, 0.5, 0.75]))
    const highShare = fraction(pick(random, [0.25, 0.5, 0.75]))
    const low = start + width + lowShare * width
    const high = start + 3 * width + highShare * width
    const base = { start, width, counts, low, high }
    const total = qualityTotal(base)
    const faulty = faultyCount(base)
    // The mistakes: the cut intervals counted whole, left out, or the acceptable ones given
    const whole = counts[0] + counts[4]
    const none = counts[0] + counts[1] + counts[3] + counts[4]
    const inside = total - faulty
    const percent = level === 2
    const as = (value: number) => (percent ? (value / total) * 100 : value)
    const values = [as(faulty), as(whole), as(none), as(inside)]
    if (values.some((value) => !Number.isInteger(value * 10)) || new Set(values).size < 4) return null
    const options = shuffle(random, [
        { value: values[0], mistake: null },
        { value: values[1], mistake: 'whole' as const },
        { value: values[2], mistake: 'none' as const },
        { value: values[3], mistake: 'inside' as const }
    ])
    return { start, width, counts, low, high, percent, options }
}

export function createQualityRounds(random: Random, level: number): QualityRound[] {
    return Array.from({ length: QUALITY_ROUNDS }, () => {
        for (let attempt = 0; attempt < 2000; attempt += 1) {
            const round = makeRound(random, level)
            if (round) return round
        }
        throw new Error(`No quality round for level ${level}`)
    })
}

/** A number for LaTeX: 12{,}5 */
export const qualityTex = (value: number) => String(Math.round(value * 100) / 100).replace('.', '{,}')
