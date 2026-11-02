import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   Zero pairs (1. DBH integers): an addition or subtraction of integers.
   The learner sets the result first; then each term becomes counters (+ or
   −, a subtraction turned into adding the opposite), the + and − counters
   pair up and cancel, and what is left is the result. Level 1: a positive
   plus a negative; level 2: subtractions (also of a negative); level 3:
   chains of three or four terms with brackets.
   ========================================================================== */

export const ZERO_ROUNDS = 5
/** The stepper's range */
export const ZERO_LIMIT = 15
/** At most this many counters in a row of the scene */
export const ROW_MAX = 14

export interface Term { op: '+' | '-'; value: number }

export interface ZeroRound {
    terms: Term[]
    answer: number
    /** Counters in the scene, after turning the subtractions into additions */
    positives: number
    negatives: number
}

/** The value a term adds: a subtraction adds the opposite */
export const effective = ({ op, value }: Term) => (op === '+' ? value : -value)

const signed = (value: number) => (value < 0 ? `-${-value}` : `${value}`)
const bracket = (value: number) => (value < 0 ? `(${value})` : `${value}`)

/** The expression as written: the first term bare, a negative after a sign in brackets */
export function termsLatex(terms: Term[]): string {
    return terms.map((term, index) => (index === 0 ? signed(term.value) : `${term.op}${bracket(term.value)}`)).join('')
}

/** The same expression with every subtraction written as adding the opposite */
export function sumLatex(terms: Term[]): string {
    return terms.map((term, index) => (index === 0 ? signed(term.value) : `+${bracket(effective(term))}`)).join('')
}

/** A whole number from −max to max, never 0 */
const nonzero = (random: Random, max: number) => pick(random, [-1, 1]) * randomInt(random, 1, max)

export function createZeroRound(random: Random, levelIndex: number): ZeroRound {
    for (;;) {
        let terms: Term[]
        if (levelIndex === 0) {
            const a = nonzero(random, 9)
            const b = -Math.sign(a) * randomInt(random, 1, 9)
            terms = [{ op: '+', value: a }, { op: '+', value: b }]
        } else if (levelIndex === 1) {
            terms = [{ op: '+', value: nonzero(random, 9) }, { op: '-', value: nonzero(random, 9) }]
        } else {
            const count = randomInt(random, 3, 4)
            terms = Array.from({ length: count }, (_, index) => ({ op: index === 0 ? '+' : pick(random, ['+', '-'] as const), value: nonzero(random, 8) }))
            // At least one subtraction of a negative, the step that needs thinking
            if (!terms.some((term) => term.op === '-' && term.value < 0)) continue
        }
        const values = terms.map(effective)
        const answer = values.reduce((sum, value) => sum + value, 0)
        const positives = values.filter((value) => value > 0).reduce((sum, value) => sum + value, 0)
        const negatives = -values.filter((value) => value < 0).reduce((sum, value) => sum + value, 0)
        if (answer === 0 || Math.abs(answer) > ZERO_LIMIT || positives > ROW_MAX || negatives > ROW_MAX) continue
        return { terms, answer, positives, negatives }
    }
}

export const createZeroRounds = (random: Random, levelIndex: number) => Array.from({ length: ZERO_ROUNDS }, () => createZeroRound(random, levelIndex))
