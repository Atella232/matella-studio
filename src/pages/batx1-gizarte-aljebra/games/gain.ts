import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J2 · ¿Gana o pierde? (Irabazi ala galdu?): a business with fixed costs F,
   a cost c per unit and a price p. Levels 1 and 2: a number of units, and
   one tap — it loses money, breaks even or earns (level 2 gives income and
   costs as I(x) and C(x)). Level 3: the break-even point, F ÷ (p − c), out
   of three options; the wrong ones are F ÷ p and F ÷ c. Every break-even
   point is a whole number. Pure logic.
   ========================================================================== */

export const GAIN_ROUNDS = 6

export type GainVerdict = 'lose' | 'even' | 'win'

export interface GainRound {
    kind: 'verdict' | 'formula' | 'point'
    fixed: number
    cost: number
    price: number
    /** Units sold (verdict and formula rounds) */
    units: number
    /** Break-even options (point rounds) */
    options: number[]
}

export const gainProfit = (round: Pick<GainRound, 'fixed' | 'cost' | 'price' | 'units'>) => round.price * round.units - (round.fixed + round.cost * round.units)
export const gainBreakEven = (round: Pick<GainRound, 'fixed' | 'cost' | 'price'>) => round.fixed / (round.price - round.cost)
export const gainVerdict = (round: GainRound): GainVerdict => {
    const profit = gainProfit(round)
    return profit < 0 ? 'lose' : profit === 0 ? 'even' : 'win'
}

export function createGainRound(random: Random, level: number, verdict: GainVerdict): GainRound {
    for (;;) {
        const margin = randomInt(random, 2, 9)
        const cost = randomInt(random, 1, 12)
        const point = randomInt(random, 2, 30) * 10
        const fixed = margin * point
        const price = cost + margin
        if (level < 2) {
            const step = pick(random, [10, 20, 30, 50])
            const units = verdict === 'lose' ? point - step : verdict === 'even' ? point : point + step
            if (units <= 0) continue
            return { kind: level === 0 ? 'verdict' : 'formula', fixed, cost, price, units, options: [] }
        }
        const wrong = [fixed / price, fixed / cost].filter((value) => Number.isInteger(value) && value !== point)
        const extra = [point * 2, point + 10, point - 10].filter((value) => value > 0 && value !== point)
        const others = [...new Set([...wrong, ...extra])].slice(0, 2)
        if (others.length < 2) continue
        return { kind: 'point', fixed, cost, price, units: 0, options: shuffle(random, [point, ...others]) }
    }
}

/** Each verdict at least once in the first three rounds, then any */
export function createGainRounds(random: Random, level: number): GainRound[] {
    const verdicts: GainVerdict[] = [...shuffle(random, ['lose', 'even', 'win'] as GainVerdict[]), ...Array.from({ length: GAIN_ROUNDS - 3 }, () => pick(random, ['lose', 'even', 'win'] as GainVerdict[]))]
    return verdicts.map((verdict) => createGainRound(random, level, verdict))
}
