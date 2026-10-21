import { add, divide, equals, fraction, gcd, multiply, subtract, type FractionValue } from '../math/fraction.ts'
import { pick, randomInt, shuffle, type Random } from './random.ts'
import type { Stars } from './records.ts'

/* ==========================================================================
   Helburu zehatza (Objetivo exacto): combine fraction cards with the four
   operations to reach the target exactly, as in "Cifras". Each round is
   built from a real combination of some of the cards, so it always has a
   solution; the other cards are there to make the learner think.
   ========================================================================== */

export type ExactOp = '+' | '-' | '·' | ':'

export interface ExactLevel {
    ops: ExactOp[]
    /** Cards dealt */
    cards: number
    /** How many cards the built solution uses */
    used: [number, number]
    /** Denominators of the cards; 1 deals whole numbers */
    denominators: number[]
    maxTargetDenominator: number
}

export const exactLevels: ExactLevel[] = [
    { ops: ['+', '-'], cards: 4, used: [2, 3], denominators: [1, 2, 3, 4, 6], maxTargetDenominator: 12 },
    { ops: ['+', '-', '·', ':'], cards: 4, used: [3, 3], denominators: [1, 2, 3, 4, 5, 6], maxTargetDenominator: 12 },
    { ops: ['+', '-', '·', ':'], cards: 5, used: [3, 4], denominators: [1, 2, 3, 4, 5, 6, 8], maxTargetDenominator: 24 }
]

export const EXACT_ROUNDS = 5
export const EXACT_POINTS = 100
export const EXACT_HINT_POINTS = 50

export interface ExactCard {
    id: number
    value: FractionValue
}

export interface ExactStep {
    left: FractionValue
    op: ExactOp
    right: FractionValue
    result: FractionValue
}

export interface ExactRound {
    cards: ExactCard[]
    target: FractionValue
    /** How the target was built */
    solution: ExactStep[]
}

/** Null when it cannot be done (dividing by zero) */
export function operateExact(op: ExactOp, left: FractionValue, right: FractionValue): FractionValue | null {
    switch (op) {
        case '+': return add(left, right)
        case '-': return subtract(left, right)
        case '·': return multiply(left, right)
        case ':': return right.numerator === 0 ? null : divide(left, right)
    }
}

function randomCard(random: Random, level: ExactLevel): FractionValue {
    const denominator = pick(random, level.denominators)
    if (denominator === 1) return fraction(randomInt(random, 1, 3))
    for (;;) {
        const numerator = randomInt(random, 1, denominator - 1)
        if (gcd(numerator, denominator) === 1) return fraction(numerator, denominator)
    }
}

/** A step worth doing: positive, and not just one of its operands again (· 1, : 1, …) */
function usefulStep(op: ExactOp, left: FractionValue, right: FractionValue): FractionValue | null {
    const result = operateExact(op, left, right)
    if (!result || result.numerator <= 0 || equals(result, left) || equals(result, right)) return null
    return result
}

export function createExactRound(random: Random, level: ExactLevel): ExactRound {
    for (;;) {
        const used = Array.from({ length: randomInt(random, level.used[0], level.used[1]) }, () => randomCard(random, level))
        // Combine two cards of the pool at a time, in a random order, until one value is left
        let pool = [...used]
        const solution: ExactStep[] = []
        while (pool.length > 1) {
            const [i, j] = shuffle(random, pool.map((_, index) => index)).slice(0, 2)
            const op = pick(random, level.ops)
            const result = usefulStep(op, pool[i], pool[j])
            if (!result) break
            solution.push({ left: pool[i], op, right: pool[j], result })
            pool = [...pool.filter((_, index) => index !== i && index !== j), result]
        }
        if (pool.length > 1) continue
        const target = pool[0]
        if (target.denominator > level.maxTargetDenominator || target.numerator > 6 * target.denominator) continue
        const dealt = [...used]
        while (dealt.length < level.cards) dealt.push(randomCard(random, level))
        // The target must be built, never just picked up
        if (dealt.some((card) => equals(card, target))) continue
        return { cards: shuffle(random, dealt).map((value, id) => ({ id, value })), target, solution }
    }
}

export function createExactRounds(random: Random, levelIndex: number, levels: ExactLevel[] = exactLevels): ExactRound[] {
    return Array.from({ length: EXACT_ROUNDS }, () => createExactRound(random, levels[levelIndex]))
}

const cardsKey = (cards: FractionValue[]) => cards.map((card) => `${card.numerator}/${card.denominator}`).sort().join(',')

/**
 * The shortest way from these cards to the target ([] when a card already is
 * the target), or null when there is none. Used for hints: it starts from
 * wherever the learner is, not from the built solution.
 */
export function solveExact(cards: FractionValue[], target: FractionValue, ops: ExactOp[]): ExactStep[] | null {
    if (cards.some((card) => equals(card, target))) return []
    // Positions already known to fail within a number of steps
    const dead = new Set<string>()
    const search = (pool: FractionValue[], steps: number): ExactStep[] | null => {
        if (pool.some((card) => equals(card, target))) return []
        if (steps === 0 || pool.length < 2) return null
        const key = `${steps}:${cardsKey(pool)}`
        if (dead.has(key)) return null
        for (let i = 0; i < pool.length; i += 1) {
            for (let j = 0; j < pool.length; j += 1) {
                if (i === j) continue
                for (const op of ops) {
                    // + and · give the same either way round: try them once
                    if ((op === '+' || op === '·') && j < i) continue
                    const result = operateExact(op, pool[i], pool[j])
                    if (!result) continue
                    const rest = search([...pool.filter((_, index) => index !== i && index !== j), result], steps - 1)
                    if (rest) return [{ left: pool[i], op, right: pool[j], result }, ...rest]
                }
            }
        }
        dead.add(key)
        return null
    }
    for (let steps = 1; steps < cards.length; steps += 1) {
        const found = search(cards, steps)
        if (found) return found
    }
    return null
}

export function exactRoundPoints(solved: boolean, hinted: boolean): number {
    if (!solved) return 0
    return hinted ? EXACT_HINT_POINTS : EXACT_POINTS
}

export function exactStars(score: number): Stars {
    if (score >= 450) return 3
    if (score >= 300) return 2
    if (score >= 150) return 1
    return 0
}
