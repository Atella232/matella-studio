import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { Stars } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Altxorraren banaketa (El reparto del botín, 3. DBH): a chest of coins is
   shared among the crew. In levels 1 and 2 the share is in direct
   proportion to the days each pirate worked; in level 3 it is in inverse
   proportion to the mistakes each one made (whoever made fewer mistakes
   gets more). The learner sets every pile with its own buttons, in steps
   of the share's unit, and checks once. The right split is the only one.
   Pure logic, no React.
   ========================================================================== */

export const LOOT_ROUNDS = 5

export type LootKind = 'direct' | 'inverse'

export interface LootRound {
    kind: LootKind
    total: number
    /** Days worked (direct) or mistakes made (inverse) of each pirate */
    numbers: number[]
    /** The weights the coins are shared by: the numbers, or their reciprocals times the lcm */
    weights: number[]
    /** Coins per part */
    unit: number
    /** Step of the buttons: the shares are all multiples of it */
    step: number
    shares: number[]
}

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
const lcm = (a: number, b: number) => (a * b) / gcd(a, b)

export function createLootRound(random: Random, level: number): LootRound {
    for (;;) {
        const kind: LootKind = level === 2 ? 'inverse' : 'direct'
        const count = level === 0 ? 2 : level === 1 ? 3 : pick(random, [2, 3])
        const numbers = Array.from({ length: count }, () => randomInt(random, kind === 'inverse' ? 1 : 2, kind === 'inverse' ? 6 : 9))
        if (new Set(numbers).size < count) continue
        const common = numbers.reduce(lcm, 1)
        const weights = kind === 'direct' ? numbers : numbers.map((value) => common / value)
        const sum = weights.reduce((a, b) => a + b, 0)
        if (sum > 30) continue
        const unit = pick(random, [2, 3, 4, 5, 6, 10, 12, 15, 20])
        const total = sum * unit
        if (total > 400) continue
        const shares = weights.map((weight) => weight * unit)
        const step = shares.reduce(gcd)
        return { kind, total, numbers, weights, unit, step, shares }
    }
}

export function createLootRounds(random: Random, level: number): LootRound[] {
    const rounds: LootRound[] = []
    while (rounds.length < LOOT_ROUNDS) {
        const round = createLootRound(random, level)
        if (rounds.some((other) => other.total === round.total && other.numbers.join() === round.numbers.join())) continue
        rounds.push(round)
    }
    return shuffle(random, rounds)
}

/** Where every pile starts: the coins shared out equally, rounded down to the step */
export const startingPiles = (round: LootRound) => round.numbers.map(() => Math.floor(round.total / round.numbers.length / round.step) * round.step)

export const lootSolved = (round: LootRound, piles: number[]) => piles.every((pile, index) => pile === round.shares[index])

export function lootStars(score: number): Stars {
    if (score >= 5) return 3
    if (score >= 4) return 2
    if (score >= 3) return 1
    return 0
}
