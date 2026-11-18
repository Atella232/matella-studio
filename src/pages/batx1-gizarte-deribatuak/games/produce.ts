import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J1 · Zenbat ekoiztu? (¿Cuánto producir?): a revenue and a cost. The
   learner moves the production up and down and watches two bars, the
   revenue of one more unit I′(x) and its marginal cost C′(x), until they
   are equal; then checks. Level 1: a fixed price and c = 1; level 2: c of
   0,5 or 2; level 3: a price that falls with the sales, I(x) = (P − d·x)·x,
   so both bars move. The answer is always a whole production from 1 to 30.
   ========================================================================== */

export const PRODUCE_ROUNDS = 5
export const PRODUCE_MAX = 30

export interface ProduceRound {
    /** Revenue I(x) = P·x − d·x² */
    P: number
    d: number
    /** Cost C(x) = c·x² + v·x + F */
    c: number
    v: number
    F: number
    answer: number
}

export const revenueSlope = (round: Pick<ProduceRound, 'P' | 'd'>, x: number) => round.P - 2 * round.d * x
export const costSlope = (round: Pick<ProduceRound, 'c' | 'v'>, x: number) => 2 * round.c * x + round.v
export const profitAt = (round: ProduceRound, x: number) => round.P * x - round.d * x * x - (round.c * x * x + round.v * x + round.F)

function makeRound(random: Random, level: number): ProduceRound | null {
    const d = level === 2 ? pick(random, [0.5, 1]) : 0
    const c = level === 0 ? 1 : pick(random, [0.5, 1, 2])
    const answer = randomInt(random, 4, level === 0 ? 20 : 25)
    const v = pick(random, [0, 5, 10, 15, 20])
    // P − 2d·x = 2c·x + v at the answer
    const P = v + 2 * (c + d) * answer
    if (!Number.isInteger(P) || P > 150) return null
    const F = pick(random, [0, 50, 100, 150, 200])
    return { P, d, c, v, F, answer }
}

/** Five rounds of one level, all different */
export function createProduceRounds(random: Random, level: number): ProduceRound[] {
    const rounds: ProduceRound[] = []
    for (let attempt = 0; rounds.length < PRODUCE_ROUNDS && attempt < 5000; attempt += 1) {
        const round = makeRound(random, level)
        if (!round || rounds.some((other) => other.answer === round.answer && other.c === round.c && other.P === round.P)) continue
        rounds.push(round)
    }
    return rounds
}

const dec = (value: number) => String(value).replace('.', '{,}')
const coefficient = (value: number) => (value === 1 ? '' : dec(value))

export const revenueLatex = (round: ProduceRound) => (round.d === 0 ? `I(x)=${round.P}x` : `I(x)=(${round.P}-${coefficient(round.d)}x)\\cdot x`)
export const costLatex = (round: ProduceRound) => `C(x)=${coefficient(round.c)}x^2${round.v === 0 ? '' : `+${round.v}x`}${round.F === 0 ? '' : `+${round.F}`}`
