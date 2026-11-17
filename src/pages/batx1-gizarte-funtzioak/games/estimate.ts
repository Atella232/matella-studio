import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J1 · Estimatu datua (Estima el dato): two data (a line) or three (a
   parabola) on a grid and a target x. The learner says whether estimating
   there is interpolating or extrapolating and taps the point the line or
   the parabola gives at the target. There is a single right point, whole
   and on the board. Level 1: a line with whole or half slopes; level 2:
   data further apart and extrapolations further away; level 3: three data
   and Newton's parabola, where the line through the two nearest data gives
   another point (the typical slip).
   ========================================================================== */

export const ESTIMATE_ROUNDS = 6
export const ESTIMATE_BOX = 10

export type EstimateKind = 'inter' | 'extra'

export interface EstimateRound {
    mode: 'linear' | 'parabolic'
    data: Array<[number, number]>
    target: number
    kind: EstimateKind
    answer: [number, number]
    /** With three data: what the line through the two data nearest the target gives */
    lineValue: number | null
}

const inBox = (value: number) => Number.isInteger(value) && value >= 0 && value <= ESTIMATE_BOX

/** The line through two points, at x */
export const lineThrough = ([x1, y1]: [number, number], [x2, y2]: [number, number], x: number) => y1 + ((y2 - y1) / (x2 - x1)) * (x - x1)

/** Newton's parabola through three points, at x */
export function parabolaThrough(data: Array<[number, number]>, x: number): number {
    const [[x1, y1], [x2, y2], [x3, y3]] = data
    const first = (y2 - y1) / (x2 - x1)
    const second = ((y3 - y2) / (x3 - x2) - first) / (x3 - x1)
    return y1 + first * (x - x1) + second * (x - x1) * (x - x2)
}

export const estimateOf = (round: Pick<EstimateRound, 'mode' | 'data'>, x: number) => (round.mode === 'linear' ? lineThrough(round.data[0], round.data[1], x) : parabolaThrough(round.data, x))

function linearRound(random: Random, level: number): EstimateRound | null {
    const gap = level === 0 ? randomInt(random, 2, 4) : randomInt(random, 4, 6)
    const x1 = randomInt(random, 0, ESTIMATE_BOX - gap)
    const x2 = x1 + gap
    const slope = level === 0 ? pick(random, [-2, -1, -0.5, 0.5, 1, 2]) : pick(random, [-1.5, -1, -0.5, 0.5, 1, 1.5, 2])
    const y1 = randomInt(random, 0, ESTIMATE_BOX)
    const y2 = y1 + slope * gap
    if (!inBox(y2)) return null
    const extra = random() < 0.5
    const target = extra ? randomInt(random, 0, ESTIMATE_BOX) : randomInt(random, x1 + 1, x2 - 1)
    if (target === x1 || target === x2) return null
    if (extra && target > x1 && target < x2) return null
    // Far extrapolations in level 2
    if (level === 1 && extra && Math.min(Math.abs(target - x1), Math.abs(target - x2)) < 2) return null
    const value = y1 + slope * (target - x1)
    if (!inBox(value)) return null
    return { mode: 'linear', data: [[x1, y1], [x2, y2]], target, kind: extra ? 'extra' : 'inter', answer: [target, value], lineValue: null }
}

function parabolicRound(random: Random): EstimateRound | null {
    const a = pick(random, [-1, -0.5, 0.5, 1])
    const p = randomInt(random, 2, 8)
    const q = a > 0 ? randomInt(random, 0, 4) : randomInt(random, 6, 10)
    const value = (x: number) => a * (x - p) ** 2 + q
    const x1 = randomInt(random, 0, 5)
    const xs = [x1, x1 + 2, x1 + 4]
    const data = xs.map((x) => [x, value(x)] as [number, number])
    if (!data.every(([x, y]) => inBox(x) && inBox(y))) return null
    const target = randomInt(random, 0, ESTIMATE_BOX)
    if (xs.includes(target)) return null
    const y = value(target)
    if (!inBox(y)) return null
    // The line through the two data nearest the target: it must give another point
    const nearest = [...data].sort((one, other) => Math.abs(one[0] - target) - Math.abs(other[0] - target)).slice(0, 2).sort((one, other) => one[0] - other[0])
    const lineValue = lineThrough(nearest[0], nearest[1], target)
    if (Math.abs(lineValue - y) < 1) return null
    const kind: EstimateKind = target > xs[0] && target < xs[2] ? 'inter' : 'extra'
    return { mode: 'parabolic', data, target, kind, answer: [target, y], lineValue }
}

/** Six different rounds of one level, both kinds present */
export function createEstimateRounds(random: Random, level: number): EstimateRound[] {
    for (;;) {
        const rounds: EstimateRound[] = []
        for (let attempt = 0; rounds.length < ESTIMATE_ROUNDS && attempt < 5000; attempt += 1) {
            const round = level === 2 ? parabolicRound(random) : linearRound(random, level)
            if (!round || rounds.some((other) => other.target === round.target && other.data.join() === round.data.join())) continue
            rounds.push(round)
        }
        if (rounds.some((round) => round.kind === 'inter') && rounds.some((round) => round.kind === 'extra')) return rounds
    }
}

export const isEstimateRight = (round: EstimateRound, picked: [number, number] | null, kind: EstimateKind | null) =>
    picked !== null && kind === round.kind && picked[0] === round.answer[0] && picked[1] === round.answer[1]
