import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J3 · Faktura zatika (La factura a trozos): a tariff with a fixed part F,
   a price r1 per unit up to a limit L and r2 beyond it. Its graph is a
   broken line. Level 1: the tariff as a piecewise formula and an amount:
   what is the bill?; level 2: the tariff in words; level 3: the bill is
   known, how much was used? Four cards each; the wrong ones are the
   typical slips: the second price for every unit, the first price for
   every unit, forgetting the fixed part. Prices are multiples of 5 cents
   and amounts multiples of 20, so every bill is a whole number of euros.
   ========================================================================== */

export const BILL_ROUNDS = 5

export type BillUnit = 'kwh' | 'm3' | 'copies' | 'minutes'

export interface BillRound {
    level: number
    unit: BillUnit
    /** Fixed part, euros */
    fixed: number
    /** Prices per unit, in cents */
    r1: number
    r2: number
    limit: number
    /** Amount used */
    amount: number
    /** The bill for that amount, euros */
    bill: number
    options: number[]
    answer: number
}

/** The bill for x units, in euros */
export function billFor(round: Pick<BillRound, 'fixed' | 'r1' | 'r2' | 'limit'>, x: number): number {
    const cents = x <= round.limit ? round.r1 * x : round.r1 * round.limit + round.r2 * (x - round.limit)
    return round.fixed + cents / 100
}

function cards(random: Random, answer: number, wrong: number[]): number[] | null {
    const distinct = [...new Set([answer, ...wrong.filter((value) => value > 0 && Number.isInteger(value))])]
    if (distinct.length < 4) return null
    return shuffle(random, distinct.slice(0, 4))
}

function makeRound(random: Random, level: number): BillRound | null {
    const unit = pick(random, ['kwh', 'm3', 'copies', 'minutes'] as BillUnit[])
    const fixed = pick(random, [0, 5, 8, 10, 12, 15])
    const r1 = 5 * randomInt(random, 2, 6)
    const r2 = r1 + pick(random, [-5, 5, 10, 15])
    if (r2 <= 0) return null
    const limit = 20 * randomInt(random, 3, 10)
    const beyond = level === 2 || random() < 0.75
    const amount = beyond ? limit + 20 * randomInt(random, 1, 8) : 20 * randomInt(random, 1, limit / 20 - 1)
    const tariff = { fixed, r1, r2, limit }
    const bill = billFor(tariff, amount)
    if (!Number.isInteger(bill)) return null
    if (level < 2) {
        const options = cards(random, bill, [fixed + (r2 * amount) / 100, fixed + (r1 * amount) / 100, bill - fixed, bill + (r2 - r1)])
        return options && { level, unit, ...tariff, amount, bill, options, answer: bill }
    }
    // Reverse: the bill is known, the amount is asked
    if (fixed === 0) return null
    const allSecond = ((bill - fixed) * 100) / r2
    const noFixed = limit + ((bill * 100 - r1 * limit) / r2)
    const options = cards(random, amount, [allSecond, noFixed, amount + 20, amount - 20])
    return options && { level, unit, ...tariff, amount, bill, options, answer: amount }
}

/** Five rounds of one level */
export function createBillRounds(random: Random, level: number): BillRound[] {
    const rounds: BillRound[] = []
    for (let attempt = 0; rounds.length < BILL_ROUNDS && attempt < 5000; attempt += 1) {
        const round = makeRound(random, level)
        if (!round || rounds.some((other) => other.limit === round.limit && other.amount === round.amount && other.r1 === round.r1)) continue
        rounds.push(round)
    }
    return rounds
}
