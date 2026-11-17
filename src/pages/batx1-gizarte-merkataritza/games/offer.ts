import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J1 · Zein eskaintza da hobea? (¿Qué oferta es mejor?): two offers, each
   with a nominal interest, how often it is paid and, for loans, a fee
   taken when signing. The learner taps the better one: the deposit with
   the higher APR, the loan with the lower APR. Level 1: the same interest
   paid differently; level 2: a higher interest that is not always better;
   level 3: loans for one year, one with a fee. Pure logic.
   ========================================================================== */

export const OFFER_ROUNDS = 5

export interface Offer {
    /** Nominal yearly interest, in % */
    rate: number
    /** Payments a year */
    periods: 1 | 2 | 4 | 12
    /** Fee taken when signing, in % of the loan (loans only) */
    fee: number
}

export interface OfferRound {
    kind: 'deposit' | 'loan'
    offers: [Offer, Offer]
}

/** The APR in %: (1 + r/n)ⁿ − 1, and for a one-year loan with a fee, what you pay back over what you receive */
export function offerTae(offer: Offer): number {
    const growth = (1 + offer.rate / 100 / offer.periods) ** offer.periods
    return (growth / (1 - offer.fee / 100) - 1) * 100
}

/** The better offer: the higher APR for a deposit, the lower for a loan */
export function betterOffer(round: OfferRound): 0 | 1 {
    const [a, b] = round.offers.map(offerTae)
    return (round.kind === 'deposit' ? a > b : a < b) ? 0 : 1
}

const PERIODS = [1, 2, 4, 12] as const

export function createOfferRound(random: Random, level: number): OfferRound {
    for (;;) {
        let round: OfferRound
        if (level === 0) {
            const rate = randomInt(random, 2, 10)
            const [p, q] = [pick(random, PERIODS), pick(random, PERIODS)]
            if (p === q) continue
            round = { kind: 'deposit', offers: [{ rate, periods: p, fee: 0 }, { rate, periods: q, fee: 0 }] }
        } else if (level === 1) {
            // The offer with the higher nominal interest is paid less often, and not always the better one
            const rate = randomInt(random, 30, 100) / 10
            const higher = Math.round((rate + randomInt(random, 1, 3) / 10) * 10) / 10
            round = { kind: 'deposit', offers: [{ rate, periods: pick(random, [4, 12] as const), fee: 0 }, { rate: higher, periods: pick(random, [1, 2] as const), fee: 0 }] }
        } else {
            const rate = randomInt(random, 4, 10)
            const fee = pick(random, [0.5, 1, 1.5, 2])
            const other = Math.round((rate + randomInt(random, 2, 25) / 10) * 10) / 10
            round = { kind: 'loan', offers: [{ rate, periods: 1, fee }, { rate: other, periods: 1, fee: 0 }] }
        }
        const [a, b] = round.offers.map(offerTae)
        // Never a tie or almost: at least two hundredths of a point apart
        if (Math.abs(a - b) < 0.02) continue
        // The order on screen is random
        if (random() < 0.5) round = { ...round, offers: [round.offers[1], round.offers[0]] }
        return round
    }
}

export function createOfferRounds(random: Random, level: number): OfferRound[] {
    return Array.from({ length: OFFER_ROUNDS }, () => createOfferRound(random, level))
}
