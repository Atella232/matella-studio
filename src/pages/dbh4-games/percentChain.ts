import { pick, shuffle, type Random } from '../../features/unit-v2/games/random.ts'

/* ==========================================================================
   Chained percentages (4. DBH academic reals and percentages): a price
   and a chain of rises and discounts; which is the total change? The
   percentages are not added: the multipliers are. After answering, the
   price bars grow and shrink step by step with their multipliers. Level 1:
   two changes; level 2: three changes; level 3: the way back (the price
   before a rise or a discount).
   ========================================================================== */

export const CHAIN_ROUNDS = 5

export interface ChainRound {
    start: number
    /** Percent changes in order: 20 is a 20 % rise, −10 a 10 % discount */
    changes: number[]
    /** Level 3: the final price is given and the start is asked */
    inverse: boolean
    options: number[]
    right: number
}

const hundredths = (value: number) => Math.abs(value * 100 - Math.round(value * 100)) < 1e-9
export const multiplier = (change: number) => 1 + change / 100
export const chainFactor = (changes: number[]) => changes.reduce((product, change) => product * multiplier(change), 1)
/** The total change in percent, rounded to tenths */
export const totalChange = (changes: number[]) => Math.round((chainFactor(changes) - 1) * 1000) / 10
export const finalPrice = (round: Pick<ChainRound, 'start' | 'changes'>) => Math.round(round.start * chainFactor(round.changes) * 100) / 100

const RATES = [10, 20, 25, 30, 40, 50]

export function createChainRound(random: Random, levelIndex: number): ChainRound {
    for (;;) {
        const count = levelIndex === 1 ? 3 : levelIndex === 0 ? 2 : 1
        const changes = Array.from({ length: count }, () => pick(random, [1, -1]) * pick(random, RATES))
        const start = pick(random, [40, 50, 60, 80, 100, 120, 200])
        if (levelIndex < 2) {
            // An exact total change with one decimal at most (1,25 % would be rounded)
            const exact = (chainFactor(changes) - 1) * 1000
            if (Math.abs(exact - Math.round(exact)) > 1e-6) continue
            const right = totalChange(changes)
            const added = changes.reduce((sum, change) => sum + change, 0)
            // The total change, the percentages added, the last change only, and the change with its sign turned
            const options = [right, added, changes[changes.length - 1], -right]
            if (new Set(options).size < 4 || !hundredths(finalPrice({ start, changes })) || right === 0) continue
            const shuffled = shuffle(random, options)
            return { start, changes, inverse: false, options: shuffled, right: shuffled.indexOf(right) }
        }
        // The way back: the price after one change is known
        const after = finalPrice({ start, changes })
        if (!hundredths(after) || !Number.isInteger(after)) continue
        const change = changes[0]
        const wrongBack = after * multiplier(-change)
        const options = [start, Math.round(wrongBack * 100) / 100, after - change, Math.round(after * multiplier(change) * 100) / 100]
        if (new Set(options).size < 4 || options.some((option) => option <= 0 || !hundredths(option))) continue
        const shuffled = shuffle(random, options)
        return { start, changes, inverse: true, options: shuffled, right: shuffled.indexOf(start) }
    }
}

export const createChainRounds = (random: Random, levelIndex: number) => Array.from({ length: CHAIN_ROUNDS }, () => createChainRound(random, levelIndex))
