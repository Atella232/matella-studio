import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { between } from '../../batx2-zientziak-banaketak/normal.ts'

/* ==========================================================================
   J1 · Zer ehuneko? (¿Qué porcentaje?): a normal N(μ; σ) and an interval
   whose ends are whole numbers of σ from the mean; the learner chooses its
   percentage without a table. Level 1: μ ± σ, μ ± 2σ, μ ± 3σ. Level 2:
   one side (μ to μ + kσ) or one tail (beyond μ + kσ). Level 3: two pieces
   added (μ − σ to μ + 2σ…). The wrong options are the whole band taken for
   the half, the half taken for the whole and the neighbouring band. Every
   value is the table's, so the three numbers of the rule add up. Pure.
   ========================================================================== */

export const PERCENT_ROUNDS = 6

export interface PercentRound {
    mean: number
    sd: number
    /** The ends in σ from the mean; null is an open end */
    from: number | null
    to: number | null
    /** Three options, in hundredths of a percent */
    options: number[]
    answer: number
}

/** The share of the normal between two numbers of σ, in ten-thousandths (open ends are ±∞) */
export const shareBetween = (from: number | null, to: number | null) => between(from ?? -8, to ?? 8)

const BANDS = [1, 2, 3]

function makeRound(random: Random, level: number): PercentRound | null {
    const sd = pick(random, [2, 4, 5, 8, 10, 15])
    const mean = 10 * randomInt(random, 5, 20)
    let from: number | null
    let to: number | null
    let wrong: number[]
    if (level === 0) {
        const k = pick(random, BANDS)
        from = -k
        to = k
        wrong = [shareBetween(0, k), shareBetween(-(k === 3 ? 2 : k + 1), k === 3 ? 2 : k + 1)]
    } else if (level === 1) {
        const k = pick(random, BANDS)
        if (random() < 0.5) {
            ;[from, to] = random() < 0.5 ? [0, k] : [-k, 0]
            wrong = [shareBetween(-k, k), shareBetween(k, null)]
        } else {
            ;[from, to] = random() < 0.5 ? [k, null] : [null, -k]
            wrong = [10_000 - shareBetween(-k, k), shareBetween(0, k)]
        }
    } else {
        const a = pick(random, BANDS)
        const b = pick(random, BANDS.filter((value) => value !== a))
        if (random() < 0.5) {
            from = -a
            to = b
            wrong = [shareBetween(-Math.max(a, b), Math.max(a, b)), shareBetween(0, a) + shareBetween(0, b) - shareBetween(0, Math.min(a, b))]
        } else {
            from = null
            to = b
            wrong = [shareBetween(0, b), shareBetween(-b, b)]
        }
    }
    const right = shareBetween(from, to)
    const values = [right, ...wrong]
    if (new Set(values).size < 3 || values.some((value) => value <= 0 || value >= 10_000)) return null
    const options = shuffle(random, values)
    return { mean, sd, from, to, options, answer: options.indexOf(right) }
}

export function createPercentRounds(random: Random, level: number): PercentRound[] {
    const rounds: PercentRound[] = []
    for (let attempt = 0; attempt < 2000 && rounds.length < PERCENT_ROUNDS; attempt += 1) {
        const round = makeRound(random, level)
        if (round && !rounds.some((other) => other.from === round.from && other.to === round.to && other.mean === round.mean)) rounds.push(round)
    }
    return rounds
}

/** The ends of the interval as values of X */
export const endsOf = (round: Pick<PercentRound, 'mean' | 'sd' | 'from' | 'to'>) => ({ from: round.from === null ? null : round.mean + round.from * round.sd, to: round.to === null ? null : round.mean + round.to * round.sd })
