import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J2 · Prezio zuzena (El precio justo): a demand q = A − B·p and four
   price cards. Each card draws its rectangle p × q on the demand line, so
   the learner compares areas before choosing the price that brings in the
   most. Level 1: the revenue; level 2: the profit with a cost v per unit
   (the price of the greatest revenue tempts); level 3: «for every s euros
   more it sells d fewer», from a starting price. The wrong cards are the
   typical slips: the top price, half of it ignoring k, the price of the
   revenue when the cost counts, selling at cost, not changing the price.
   ========================================================================== */

export const PRICE_ROUNDS = 5

export type PriceRoundKind = 'revenue' | 'profit' | 'raise'

export interface PriceRound {
    kind: PriceRoundKind
    /** Demand q = A − B·p */
    A: number
    B: number
    /** Cost per unit (profit) */
    v: number
    /** Starting price, step in euros and units lost per step (raise) */
    start: number
    step: number
    loss: number
    options: number[]
    answer: number
}

export const quantityAt = (round: Pick<PriceRound, 'A' | 'B'>, p: number) => Math.max(0, round.A - round.B * p)
/** Revenue, or profit when there is a cost */
export const valueAt = (round: Pick<PriceRound, 'A' | 'B' | 'v' | 'kind'>, p: number) => (round.kind === 'profit' ? p - round.v : p) * quantityAt(round, p)
/** The price at the vertex */
export const bestOf = (round: Pick<PriceRound, 'A' | 'B' | 'v' | 'kind'>) => (round.kind === 'profit' ? (round.A / round.B + round.v) / 2 : round.A / (2 * round.B))

/** Four different positive cards, the right one included */
function cards(random: Random, answer: number, wrong: number[]): number[] | null {
    const all = [answer, ...wrong.filter((value) => value > 0 && Number.isInteger(value))]
    const distinct = [...new Set(all)]
    if (distinct.length < 4) return null
    return shuffle(random, distinct.slice(0, 4))
}

function revenueRound(random: Random): PriceRound | null {
    const k = randomInt(random, 2, 6)
    const best = randomInt(random, 4, 15)
    const A = 2 * k * best
    const top = A / k
    const options = cards(random, best, [top, A / 2 > 2 * top ? Math.round(best / 2) : A / 2, best + randomInt(random, 2, 4), best - randomInt(random, 2, 3)])
    return options && { kind: 'revenue', A, B: k, v: 0, start: 0, step: 0, loss: 0, options, answer: best }
}

function profitRound(random: Random): PriceRound | null {
    const k = randomInt(random, 2, 5)
    const top = randomInt(random, 8, 30)
    const v = randomInt(random, 2, top - 4)
    if ((top + v) % 2 !== 0) return null
    const best = (top + v) / 2
    const options = cards(random, best, [top % 2 === 0 ? top / 2 : best + 3, v, top, best - 2])
    return options && { kind: 'profit', A: k * top, B: k, v, start: 0, step: 0, loss: 0, options, answer: best }
}

function raiseRound(random: Random): PriceRound | null {
    const step = pick(random, [5, 10])
    const loss = pick(random, [1, 2, 3, 4])
    const start = step * randomInt(random, 4, 30)
    const moves = randomInt(random, 1, 8)
    // (start + step·x)(units − loss·x) has its vertex at x = moves
    const units = loss * (start / step + 2 * moves)
    const answer = start + step * moves
    const options = cards(random, answer, [start, start + 2 * step * moves, answer + 2 * step, Math.max(step, answer - 3 * step)])
    if (!options) return null
    return { kind: 'raise', A: units + (loss * start) / step, B: loss / step, v: 0, start, step, loss, options, answer }
}

/** Five rounds of one level */
export function createPriceRounds(random: Random, level: number): PriceRound[] {
    const rounds: PriceRound[] = []
    for (let attempt = 0; rounds.length < PRICE_ROUNDS && attempt < 5000; attempt += 1) {
        const round = level === 0 ? revenueRound(random) : level === 1 ? profitRound(random) : raiseRound(random)
        if (!round || rounds.some((other) => other.A === round.A && other.B === round.B && other.v === round.v)) continue
        rounds.push(round)
    }
    return rounds
}

/** Units sold at the starting price (raise rounds) */
export const unitsAtStart = (round: PriceRound) => quantityAt(round, round.start)
