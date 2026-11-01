import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { Stars } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   J1 · Etiketa (La etiqueta): a price tag and some stickers, each a
   percentage change (−20 %, +10 %…). The learner sticks the ones that
   take the price to the final price asked for. Every sticker multiplies
   by its multiplier (−20 % is · 0,8), so the order does not matter and
   −20 % then +20 % does not give the price back. Level 1: one or two
   stickers out of four; level 2: two out of five, often a rise and a
   fall of the same percentage; level 3: three out of six, VAT among them.
   ========================================================================== */

export const TAG_ROUNDS = 6

export interface TagRound {
    price: number
    /** Percentage changes on the stickers, in the order shown */
    stickers: number[]
    target: number
    /** Indexes of one choice of stickers that gives the target */
    solution: number[]
}

const LEVELS = [
    { changes: [-50, -25, -20, -10, 10, 20, 25, 50], size: [1, 2], count: 4, prices: [20, 40, 50, 60, 80, 100, 120, 200] },
    { changes: [-50, -40, -25, -20, -10, 10, 20, 25, 40, 50], size: [2, 2], count: 5, prices: [40, 50, 80, 100, 120, 150, 200, 250] },
    { changes: [-30, -25, -20, -15, -10, 10, 15, 20, 21, 25], size: [3, 3], count: 6, prices: [40, 60, 80, 100, 200, 300, 400] }
] as const

/** The multiplier of a change: −20 % → 0,8 */
export const multiplier = (change: number) => (100 + change) / 100
/** Money stays in cents: apply the changes with whole numbers and round only at the end */
export const applyChanges = (price: number, changes: number[]) => Math.round(changes.reduce((value, change) => (value * (100 + change)) / 100, price * 100)) / 100
const exactCents = (price: number, changes: number[]) => {
    const value = changes.reduce((current, change) => (current * (100 + change)) / 100, price * 100)
    return Math.abs(value - Math.round(value)) < 1e-6
}

/** The price the chosen stickers give */
export const tagPrice = (round: TagRound, chosen: number[]) => applyChanges(round.price, chosen.map((index) => round.stickers[index]))
export const tagSolved = (round: TagRound, chosen: number[]) => chosen.length > 0 && Math.abs(tagPrice(round, chosen) - round.target) < 1e-9

export function createTagRound(random: Random, levelIndex: number): TagRound {
    const level = LEVELS[levelIndex] ?? LEVELS[0]
    for (;;) {
        const price = pick(random, level.prices)
        const size = randomInt(random, level.size[0], level.size[1])
        // Level 2 likes a trap: a rise and a fall of the same percentage
        const trap = levelIndex === 1 && random() < 0.5
        const first = pick(random, level.changes.filter((change) => change > 0))
        const right = trap ? [first, -first] : shuffle(random, level.changes).slice(0, size)
        if (levelIndex === 2 && !right.includes(21) && random() < 0.5) continue
        if (!exactCents(price, right) || new Set(right).size < right.length) continue
        const target = applyChanges(price, right)
        if (target === price) continue
        const others = shuffle(random, level.changes.filter((change) => !right.includes(change))).slice(0, level.count - size)
        const stickers = shuffle(random, [...right, ...others])
        // No single sticker may reach the target when two or three are needed
        if (size > 1 && stickers.some((change) => exactCents(price, [change]) && applyChanges(price, [change]) === target)) continue
        return { price, stickers, target, solution: right.map((change) => stickers.indexOf(change)) }
    }
}

export const createTagRounds = (random: Random, levelIndex: number) => Array.from({ length: TAG_ROUNDS }, () => createTagRound(random, levelIndex))

export function tagStars(score: number): Stars {
    if (score >= 6) return 3
    if (score >= 5) return 2
    if (score >= 3) return 1
    return 0
}
