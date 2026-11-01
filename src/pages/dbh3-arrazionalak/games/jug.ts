import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { Stars } from '../../../features/unit-v2/games/records.ts'
import { add, compare, equals, fraction, gcd, toLatex, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'

/* ==========================================================================
   J2 · Bete pitxerra (Llena la jarra): the jug has a mark at a fraction;
   six cards hold fractions, and the learner chooses the cards that fill
   the jug exactly to the mark. Cards add up as they are chosen: the water
   rises and spills over the mark when there is too much. A negative card
   takes water out. Level 1: halves, quarters and eighths; level 2:
   thirds, sixths and twelfths too; level 3: some cards are negative and
   the right choice needs one of them.
   ========================================================================== */

export const JUG_ROUNDS = 6
export const JUG_CARDS = 6
/** The jug holds up to 2 */
export const JUG_CAPACITY = 2

export interface JugCard {
    id: number
    value: FractionValue
}

export interface JugRound {
    target: FractionValue
    cards: JugCard[]
    /** Ids of one choice that fills the jug exactly */
    solution: number[]
}

const LEVELS = [
    { denominators: [2, 4, 8], size: [2, 2], negative: false },
    { denominators: [2, 3, 4, 6, 12], size: [2, 3], negative: false },
    { denominators: [2, 3, 4, 6], size: [3, 3], negative: true }
] as const

/** A fraction in lowest terms between 0 and 1, or between −1 and 0 */
function card(random: Random, denominators: readonly number[], negative: boolean): FractionValue {
    for (;;) {
        const denominator = pick(random, denominators)
        const numerator = randomInt(random, 1, denominator - 1)
        if (gcd(numerator, denominator) === 1) return fraction(negative ? -numerator : numerator, denominator)
    }
}

export const sumOf = (values: FractionValue[]) => values.reduce((total, value) => add(total, value), fraction(0))
export const chosenSum = (round: JugRound, chosen: number[]) => sumOf(round.cards.filter((item) => chosen.includes(item.id)).map((item) => item.value))
export const isFull = (round: JugRound, chosen: number[]) => chosen.length > 0 && equals(chosenSum(round, chosen), round.target)

export function createJugRound(random: Random, levelIndex: number): JugRound {
    const level = LEVELS[levelIndex] ?? LEVELS[0]
    for (;;) {
        const size = randomInt(random, level.size[0], level.size[1])
        const right = Array.from({ length: size }, (_, index) => card(random, level.denominators, level.negative && index === 0))
        const target = sumOf(right)
        // A target between 1/4 and 3/2 that no single card reaches alone, written with a small denominator
        if (compare(target, fraction(1, 4)) < 0 || compare(target, fraction(3, 2)) > 0 || target.denominator > 12) continue
        const others = Array.from({ length: JUG_CARDS - size }, (_, index) => card(random, level.denominators, level.negative && index === 0))
        const values = [...right, ...others]
        if (values.some((value) => equals(value, target))) continue
        if (new Set(values.map(toLatex)).size < values.length) continue
        const order = shuffle(random, values.map((_, index) => index))
        const cards = order.map((from, id) => ({ id, value: values[from] }))
        return { target, cards, solution: order.map((from, id) => (from < size ? id : -1)).filter((id) => id >= 0) }
    }
}

export const createJugRounds = (random: Random, levelIndex: number) => Array.from({ length: JUG_ROUNDS }, () => createJugRound(random, levelIndex))

/** The sum of the right cards, as LaTeX: a + b = target */
export function jugSolutionLatex(round: JugRound): string {
    const parts = round.cards.filter((item) => round.solution.includes(item.id)).map((item) => toLatex(item.value))
    return `${parts.join('+').replace(/\+-/g, '-')}=${toLatex(round.target)}`
}

export function jugStars(score: number): Stars {
    if (score >= 6) return 3
    if (score >= 5) return 2
    if (score >= 3) return 1
    return 0
}
