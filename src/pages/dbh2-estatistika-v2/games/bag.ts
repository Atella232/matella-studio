import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import type { Stars } from '../../../features/unit-v2/games/records.ts'
import { gcd } from '../../../features/unit-v2/math/fraction.ts'

/* ==========================================================================
   J2 · Prestatu poltsa (Prepara la bolsa): a card with the probabilities
   a bag must have, and three steppers, red, blue and green balls. Laplace:
   favourable cases over possible cases. Level 1: one probability; level 2:
   two; level 3: «not green» and «red twice as likely as blue». Many bags
   are right (2 red and 3 blue, or 4 and 6...): any of them counts.
   ========================================================================== */

export const BAG_ROUNDS = 5
export const BAG_MAX = 12

export type BallColour = 'red' | 'blue' | 'green'
export const BALL_COLOURS: BallColour[] = ['red', 'blue', 'green']
export type BagCounts = Record<BallColour, number>

export type BagCondition =
    | { kind: 'is'; colour: BallColour; numerator: number; denominator: number }
    | { kind: 'not'; colour: BallColour; numerator: number; denominator: number }
    | { kind: 'twice'; colour: BallColour; other: BallColour }

export interface BagRound {
    conditions: BagCondition[]
    /** One bag that meets them, the smallest */
    example: BagCounts
}

const total = (counts: BagCounts) => counts.red + counts.blue + counts.green

export function conditionHolds(condition: BagCondition, counts: BagCounts): boolean {
    const all = total(counts)
    if (all === 0) return false
    if (condition.kind === 'twice') return counts[condition.colour] === 2 * counts[condition.other] && counts[condition.other] > 0
    const favourable = condition.kind === 'is' ? counts[condition.colour] : all - counts[condition.colour]
    return favourable * condition.denominator === condition.numerator * all
}

export const bagRight = (round: BagRound, counts: BagCounts) => round.conditions.every((condition) => conditionHolds(condition, counts))

function probability(colour: BallColour, counts: BagCounts, kind: 'is' | 'not'): BagCondition {
    const all = total(counts)
    const favourable = kind === 'is' ? counts[colour] : all - counts[colour]
    const divisor = gcd(favourable, all)
    return { kind, colour, numerator: favourable / divisor, denominator: all / divisor }
}

export function createBagRound(random: Random, levelIndex: number): BagRound {
    for (;;) {
        const counts: BagCounts = { red: randomInt(random, 1, 6), blue: randomInt(random, 1, 6), green: randomInt(random, levelIndex === 0 ? 0 : 1, 5) }
        let conditions: BagCondition[]
        if (levelIndex === 0) conditions = [probability(pick(random, ['red', 'blue'] as const), counts, 'is')]
        else if (levelIndex === 1) conditions = [probability('red', counts, 'is'), probability('blue', counts, 'is')]
        else {
            if (counts.red !== 2 * counts.blue) counts.red = 2 * counts.blue
            conditions = [probability('green', counts, 'not'), { kind: 'twice', colour: 'red', other: 'blue' }]
        }
        // The probabilities must say something: never 0 or 1
        if (conditions.some((condition) => condition.kind !== 'twice' && (condition.numerator === 0 || condition.numerator === condition.denominator))) continue
        // The smallest bag that meets every condition fits in the steppers
        const example = smallestBag(conditions)
        // A bag of at most 12 balls, so the fractions stay friendly
        if (!example || total(example) > 12) continue
        return { conditions, example }
    }
}

/** The bag with the fewest balls that meets the conditions, if one fits in the steppers */
export function smallestBag(conditions: BagCondition[]): BagCounts | null {
    let best: BagCounts | null = null
    for (let red = 0; red <= BAG_MAX; red += 1) {
        for (let blue = 0; blue <= BAG_MAX; blue += 1) {
            for (let green = 0; green <= BAG_MAX; green += 1) {
                const counts = { red, blue, green }
                if (conditions.every((condition) => conditionHolds(condition, counts)) && (!best || total(counts) < total(best))) best = counts
            }
        }
    }
    return best
}

export const createBagRounds = (random: Random, levelIndex: number) => Array.from({ length: BAG_ROUNDS }, () => createBagRound(random, levelIndex))

export function bagStars(score: number): Stars {
    if (score >= 5) return 3
    if (score >= 4) return 2
    if (score >= 3) return 1
    return 0
}
