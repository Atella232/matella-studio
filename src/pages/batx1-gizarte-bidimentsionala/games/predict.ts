import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J2 · Aurreikusi zuzenarekin (Predice con la recta): a regression line of
   Y on X worked out from data between two values of x, its r and an x to
   estimate. The learner picks the estimate ŷ together with whether it is
   reliable (|r| ≥ 0,75 and x within the data). The options cross the right
   and wrong ŷ (the intercept forgotten) with the right and wrong verdict.
   Level 1: |r| large, x inside or far away; level 2: also with |r| small;
   level 3: the line is not given, it comes from x̄, ȳ, σx² and σxy.
   Pure logic.
   ========================================================================== */

export const PREDICT_ROUNDS = 6

export interface PredictOption {
    value: number
    reliable: boolean
}

export interface PredictRound {
    slope: number
    intercept: number
    /** The parameters of level 3; the line is given otherwise */
    given?: { mx: number; my: number; vx: number; cxy: number }
    r: number
    low: number
    high: number
    x: number
    answer: PredictOption
    options: PredictOption[]
}

export const isReliable = (round: Pick<PredictRound, 'r' | 'low' | 'high' | 'x'>) => Math.abs(round.r) >= 0.75 && round.x >= round.low && round.x <= round.high

const SLOPES = [0.5, 1.5, 2, 3, -0.5, -2]

function makeRound(random: Random, level: number): PredictRound | null {
    const slope = pick(random, SLOPES)
    const low = pick(random, [2, 4, 5, 10])
    const high = low + pick(random, [6, 8, 10])
    const mx = (low + high) / 2
    const my = randomInt(random, 10, 40)
    const intercept = my - slope * mx
    const strength = level === 0 ? pick(random, [0.85, 0.9, 0.95]) : pick(random, [0.92, 0.88, 0.4, 0.3])
    const r = Math.sign(slope) * strength
    const inside = pick(random, [true, false])
    const x = inside ? randomInt(random, low + 1, high - 1) : high + pick(random, [8, 10, 15])
    const value = slope * x + intercept
    const wrong = slope * x
    if (!Number.isInteger(value * 2) || !Number.isInteger(intercept * 2) || intercept === 0 || Math.abs(wrong - value) < 1e-9 || value < 0) return null
    const answer = { value, reliable: isReliable({ r, low, high, x }) }
    const options = shuffle(random, [answer, { value, reliable: !answer.reliable }, { value: wrong, reliable: answer.reliable }, { value: wrong, reliable: !answer.reliable }])
    const vx = pick(random, [2, 4, 5])
    const given = level === 2 ? { mx, my, vx, cxy: slope * vx } : undefined
    return { slope, intercept, given, r, low, high, x, answer, options }
}

export function createPredictRounds(random: Random, level: number): PredictRound[] {
    const rounds: PredictRound[] = []
    for (let attempt = 0; rounds.length < PREDICT_ROUNDS && attempt < 5000; attempt += 1) {
        const round = makeRound(random, level)
        if (round) rounds.push(round)
    }
    if (rounds.length < PREDICT_ROUNDS) throw new Error(`No predict rounds for level ${level}`)
    return rounds
}

/** A number for LaTeX: 12{,}5, -2 */
export const predictTex = (value: number) => String(Math.round(value * 1000) / 1000).replace('.', '{,}')
