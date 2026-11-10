import { randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { fraction, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'

/* ==========================================================================
   J3 · Nork egin du? (¿Quién fue?): a factory with two or three machines,
   each with its share of the production and its failure rate. A part
   turns up faulty (or, in level 3, sometimes fine): which machine most
   likely made it? The answer is the largest path P(Aᵢ)·P(D/Aᵢ), that is,
   the largest posterior probability; in four rounds out of six it is not
   the machine that makes most, and the winner always beats the others
   clearly. Shares in tenths, rates in whole percents. Pure logic.
   ========================================================================== */

export const CULPRIT_ROUNDS = 6

export interface CulpritRound {
    /** P(Aᵢ) in tenths */
    shares: number[]
    /** P(D/Aᵢ) in percent */
    rates: number[]
    /** Whether the part is faulty (D) or fine (D̄) */
    faulty: boolean
    answer: number
}

/** Each path in thousandths: P(Aᵢ)·P(D/Aᵢ), or P(Aᵢ)·P(D̄/Aᵢ) when the part is fine */
export const culpritPaths = (round: Pick<CulpritRound, 'shares' | 'rates' | 'faulty'>) => round.shares.map((share, index) => share * (round.faulty ? round.rates[index] : 100 - round.rates[index]))
export const culpritTotal = (round: Pick<CulpritRound, 'shares' | 'rates' | 'faulty'>) => culpritPaths(round).reduce((sum, path) => sum + path, 0)
export const culpritPosterior = (round: Pick<CulpritRound, 'shares' | 'rates' | 'faulty'>, index: number): FractionValue => fraction(culpritPaths(round)[index], culpritTotal(round))

const largest = (values: number[]) => values.indexOf(Math.max(...values))

function makeRound(random: Random, count: number, faulty: boolean, trap: boolean): CulpritRound | null {
    const first = randomInt(random, 2, 10 - count + 1)
    const shares = count === 2 ? [first, 10 - first] : [first, 0, 0]
    if (count === 3) {
        shares[1] = randomInt(random, 1, 10 - first - 1)
        shares[2] = 10 - first - shares[1]
        if (shares[2] < 1) return null
    }
    const rates = shares.map(() => (faulty ? randomInt(random, 1, 12) : randomInt(random, 2, 30)))
    if (new Set(rates).size < rates.length) return null
    const round: CulpritRound = { shares, rates, faulty, answer: 0 }
    const paths = culpritPaths(round)
    const answer = largest(paths)
    // The winner beats every other path by at least a fifth
    if (paths.some((path, index) => index !== answer && path * 6 > paths[answer] * 5)) return null
    const isTrap = answer !== largest(shares)
    if (isTrap !== trap) return null
    if (new Set(shares).size < shares.length && isTrap) return null
    return { ...round, answer }
}

/** Six rounds, four of them traps (the likeliest machine is not the one that makes most) */
export function createCulpritRounds(random: Random, level: number): CulpritRound[] {
    const count = level === 0 ? 2 : 3
    const traps = shuffle(random, [true, true, true, true, false, false])
    const faultyList = level === 2 ? shuffle(random, [true, true, true, false, false, false]) : Array<boolean>(CULPRIT_ROUNDS).fill(true)
    const rounds: CulpritRound[] = []
    for (let index = 0; index < CULPRIT_ROUNDS; index += 1) {
        // With a fine part the likeliest machine is nearly always the biggest: no trap is asked then
        const trap = faultyList[index] ? traps[index] : false
        for (let attempt = 0; attempt < 4000; attempt += 1) {
            const round = makeRound(random, count, faultyList[index], trap)
            if (round && !rounds.some((other) => other.shares.join() === round.shares.join() && other.rates.join() === round.rates.join())) {
                rounds.push(round)
                break
            }
        }
    }
    return rounds.length === CULPRIT_ROUNDS ? rounds : createCulpritRounds(random, level)
}
