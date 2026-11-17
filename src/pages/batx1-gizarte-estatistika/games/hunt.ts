import { pick, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J2 · Ehizatu pertzentila (Caza el percentil): a cumulative percentage
   polygon of four intervals, each point labelled with its percentage.
   Level 1: which value is P_k? Level 2: which percentile is the value x?
   Level 3: what percentage lies between two values? The wrong options are
   the typical mistakes: the class mark of the interval (what 1.º Ciencias
   gives for grouped data), dividing by the cumulative percentage H_i
   instead of h_i, reading the percentage at the upper end, or counting
   the intervals whole. Every answer is exact.
   ========================================================================== */

export const HUNT_ROUNDS = 6

export type HuntMistake = 'mark' | 'cumulative' | 'upper' | 'lower' | 'whole' | 'ends'

export interface HuntRound {
    start: number
    width: number
    /** Percentage of each interval, h_i */
    percents: number[]
    kind: 'percentile' | 'value' | 'between'
    /** k for «percentile»; x for «value»; [x₁, x₂] for «between» */
    k?: number
    x?: number
    pair?: [number, number]
    answer: number
    options: Array<{ value: number; mistake: HuntMistake | null }>
}

const PERCENT_SETS = [[10, 30, 40, 20], [20, 40, 30, 10], [15, 35, 30, 20], [5, 25, 50, 20], [20, 30, 40, 10], [10, 40, 25, 25], [25, 25, 30, 20]]

export const cumulativeOf = (percents: number[]) => percents.map((_, index) => percents.slice(0, index + 1).reduce((sum, value) => sum + value, 0))

const near = (a: number, b: number) => Math.abs(a - b) < 1e-9
const short = (value: number) => near(Math.round(value * 10) / 10, value)

/** P_k on the polygon */
export function huntPercentile(start: number, width: number, percents: number[], k: number) {
    let before = 0
    for (const [index, percent] of percents.entries()) {
        if (k <= before + percent) {
            const from = start + index * width
            return { index, before, value: from + ((k - before) / percent) * width }
        }
        before += percent
    }
    return { index: percents.length - 1, before: 100 - percents.at(-1)!, value: start + percents.length * width }
}

/** The percentage below x on the polygon */
export function huntPercentOf(start: number, width: number, percents: number[], x: number) {
    let below = 0
    for (const [index, percent] of percents.entries()) {
        const from = start + index * width
        if (x >= from + width) below += percent
        else if (x > from) return { index, value: below + ((x - from) / width) * percent }
    }
    return { index: percents.length - 1, value: below }
}

function distinct(random: Random, right: number, candidates: Array<{ value: number; mistake: HuntMistake }>) {
    const used = new Set([Math.round(right * 100)])
    const wrong: Array<{ value: number; mistake: HuntMistake }> = []
    for (const candidate of candidates) {
        const key = Math.round(candidate.value * 100)
        if (used.has(key) || !short(candidate.value) || candidate.value < 0) continue
        used.add(key)
        wrong.push(candidate)
    }
    if (wrong.length < 2) return null
    return shuffle(random, [{ value: right, mistake: null as HuntMistake | null }, ...wrong.slice(0, 3)])
}

function makeRound(random: Random, level: number): HuntRound | null {
    const width = pick(random, [10, 20])
    const start = pick(random, width === 10 ? [0, 20, 30, 40] : [0, 100, 200])
    const percents = pick(random, PERCENT_SETS)
    const cumulative = cumulativeOf(percents)
    if (level === 0) {
        const k = pick(random, [10, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90])
        const found = huntPercentile(start, width, percents, k)
        const from = start + found.index * width
        // k on a point of the polygon is too easy: the answer would be an end
        if (!short(found.value) || cumulative.includes(k)) return null
        const options = distinct(random, found.value, [
            { value: from + width / 2, mistake: 'mark' },
            { value: from + ((k - found.before) / cumulative[found.index]) * width, mistake: 'cumulative' },
            { value: from + width, mistake: 'upper' }
        ])
        return options && { start, width, percents, kind: 'percentile', k, answer: found.value, options }
    }
    if (level === 1) {
        const index = pick(random, [0, 1, 2, 3])
        const x = start + index * width + pick(random, [0.2, 0.25, 0.4, 0.5, 0.6, 0.75, 0.8]) * width
        const found = huntPercentOf(start, width, percents, x)
        const before = index === 0 ? 0 : cumulative[index - 1]
        if (!short(found.value)) return null
        const options = distinct(random, found.value, [
            { value: cumulative[index], mistake: 'upper' },
            { value: before, mistake: 'lower' },
            { value: ((x - (start + index * width)) / width) * percents[index], mistake: 'cumulative' }
        ])
        return options && { start, width, percents, kind: 'value', x, answer: found.value, options }
    }
    const first = pick(random, [0, 1])
    const second = pick(random, [2, 3])
    const x1 = start + first * width + pick(random, [0.25, 0.5, 0.75]) * width
    const x2 = start + second * width + pick(random, [0.25, 0.5, 0.75]) * width
    const answer = huntPercentOf(start, width, percents, x2).value - huntPercentOf(start, width, percents, x1).value
    if (!short(answer)) return null
    const whole = percents.slice(first, second + 1).reduce((sum, value) => sum + value, 0)
    const ends = cumulative[second] - cumulative[first]
    const options = distinct(random, answer, [
        { value: whole, mistake: 'whole' },
        { value: ends, mistake: 'ends' },
        { value: answer + percents[first] / 2, mistake: 'whole' }
    ])
    return options && { start, width, percents, kind: 'between', pair: [x1, x2], answer, options }
}

export function createHuntRounds(random: Random, level: number): HuntRound[] {
    const rounds: HuntRound[] = []
    for (let attempt = 0; rounds.length < HUNT_ROUNDS && attempt < 5000; attempt += 1) {
        const round = makeRound(random, level)
        if (round && !rounds.some((other) => other.percents === round.percents && other.answer === round.answer)) rounds.push(round)
    }
    if (rounds.length < HUNT_ROUNDS) throw new Error(`No hunt rounds for level ${level}`)
    return rounds
}

/** A number for LaTeX: 42{,}5 */
export const huntTex = (value: number) => String(Math.round(value * 100) / 100).replace('.', '{,}')
