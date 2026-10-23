import { add, compare, equals, fraction, gcd, subtract, type FractionValue } from '../math/fraction.ts'
import { pick, randomInt, shuffle, type Random } from './random.ts'
import type { Stars } from './records.ts'

/* ==========================================================================
   Balantza (Balanza): a two-pan scale. Fraction weights sit on one pan and
   the learner loads the other from a tray until both weigh the same. The
   scale stays locked until the learner weighs, and there are only three
   weighings a round: thinking first earns more points than trying.
   ========================================================================== */

export const BALANCE_ROUNDS = 6
export const BALANCE_WEIGHINGS = 3

export type BalanceLevel = 0 | 1 | 2

export interface BalanceRound {
    /** The loaded pan */
    left: FractionValue[]
    /** Weights already on the learner's pan */
    right: FractionValue[]
    /** Weights to choose from, for the learner's pan */
    tray: FractionValue[]
    /** Indices into the tray of one way to balance */
    solution: number[]
}

export type Weighing = 'lighter' | 'balanced' | 'heavier'

const sum = (values: FractionValue[]) => values.reduce((total, value) => add(total, value), fraction(0))
const lcm = (a: number, b: number) => (a / gcd(a, b)) * b

export const leftWeight = (round: BalanceRound) => sum(round.left)

/** What the learner's pan weighs with the chosen tray weights */
export const rightWeight = (round: BalanceRound, chosen: number[]) => sum([...round.right, ...chosen.map((index) => round.tray[index])])

/** The learner's pan against the loaded one */
export function weigh(round: BalanceRound, chosen: number[]): Weighing {
    const order = compare(rightWeight(round, chosen), leftWeight(round))
    return order === 0 ? 'balanced' : order < 0 ? 'lighter' : 'heavier'
}

/** Points for balancing on the first, second or third weighing */
export const balancePoints = (weighings: number) => Math.max(0, BALANCE_WEIGHINGS + 1 - weighings)

export const BALANCE_MAX_SCORE = BALANCE_ROUNDS * BALANCE_WEIGHINGS

export function balanceStars(score: number): Stars {
    if (score >= 15) return 3
    if (score >= 11) return 2
    if (score >= 7) return 1
    return 0
}

/* ---------- Building the rounds ---------- */

const key = (value: FractionValue) => {
    const reduced = fraction(value.numerator, value.denominator)
    return `${reduced.numerator}/${reduced.denominator}`
}

/** Positive, distinct by value, and none of them the same as one already in the list */
function addDistinct(list: FractionValue[], candidates: FractionValue[], count: number): FractionValue[] {
    const result = [...list]
    for (const candidate of candidates) {
        if (result.length - list.length >= count) break
        if (candidate.numerator <= 0 || candidate.denominator <= 0) continue
        if (result.some((item) => equals(item, candidate))) continue
        result.push(candidate)
    }
    return result
}

/** Splits n into `parts` positive whole numbers, none of them tiny next to the others */
function splitWhole(random: Random, n: number, parts: number): number[] {
    if (parts <= 1 || n < parts) return [n]
    const least = Math.max(1, Math.floor(n / (2 * parts)))
    const cut = randomInt(random, least, n - least * (parts - 1))
    return [cut, ...splitWhole(random, n - cut, parts - 1)]
}

/** Families of denominators that fit together, as in the fraction wall */
const FAMILIES = [[2, 4, 8], [3, 6, 12], [2, 4, 8, 16], [5, 10], [2, 3, 6, 12]]

/**
 * Level 1: one weight against pieces of the same family (3/4 = 1/2 + 1/4).
 * Sometimes the tray also has an equivalent single weight (6/8).
 */
function equalWeights(random: Random): BalanceRound {
    for (;;) {
        const family = pick(random, FAMILIES)
        const finest = family[family.length - 1]
        const written = pick(random, family.slice(1))
        const target = fraction(randomInt(random, 2, 2 * written - 1), written)
        if (target.denominator === 1 || target.numerator > target.denominator * 1.5) continue
        const units = (target.numerator * finest) / target.denominator
        const parts = splitWhole(random, units, randomInt(random, 2, Math.min(3, units))).map((part) => fraction(part, finest))
        if (parts.length < 2 || new Set(parts.map(key)).size !== parts.length) continue
        const solution = parts
        const equivalent = random() < 0.4 ? [{ numerator: target.numerator * 2, denominator: target.denominator * 2 }] : []
        const distractors = shuffle(random, family.flatMap((denominator) => [1, 2, 3].map((n) => fraction(n, denominator))))
        let tray = addDistinct([], [...solution, ...equivalent], 4)
        tray = addDistinct(tray, distractors.filter((value) => compare(value, target) < 0), 5 - tray.length)
        if (tray.length !== 5) continue
        return finish(random, { left: [target], right: [], tray, solution: [] }, solution)
    }
}

/** Level 2: two weights with different denominators; the tray has the sum (or two pieces of it) and typical wrong sums */
function sumWeights(random: Random): BalanceRound {
    const denominators = [2, 3, 4, 5, 6, 8, 10, 12]
    for (;;) {
        const b = pick(random, denominators)
        const d = pick(random, denominators)
        if (b === d) continue
        const first = fraction(randomInt(random, 1, b - 1), b)
        const second = fraction(randomInt(random, 1, d - 1), d)
        if (first.denominator !== b || second.denominator !== d) continue
        const total = add(first, second)
        const common = lcm(b, d)
        if (common > 24 || compare(total, fraction(3, 2)) > 0) continue
        // The sum in one weight, or in two pieces over the common denominator
        let solution = [total]
        if (random() < 0.5) {
            const units = (total.numerator * common) / total.denominator
            if (units >= 2) {
                const cut = randomInt(random, 1, units - 1)
                solution = [fraction(cut, common), fraction(units - cut, common)]
                if (equals(solution[0], solution[1])) solution = [total]
            }
        }
        const mistakes = [
            fraction(first.numerator + second.numerator, b + d),
            fraction(first.numerator + second.numerator, common),
            add(total, fraction(1, common)),
            subtract(total, fraction(1, common)),
            fraction(first.numerator * second.numerator, b * d)
        ].filter((value) => value.numerator > 0 && !equals(value, total))
        let tray = addDistinct([], solution, 2)
        tray = addDistinct(tray, shuffle(random, mistakes), 6 - tray.length)
        if (tray.length !== 6) continue
        return finish(random, { left: [first, second], right: [], tray, solution: [] }, solution)
    }
}

/** Level 3: both pans are loaded; the learner adds what is missing, and the totals can be more than 1 */
function missingWeight(random: Random): BalanceRound {
    const denominators = [2, 3, 4, 5, 6, 8, 12]
    for (;;) {
        const b = pick(random, denominators)
        const d = pick(random, denominators)
        const f = pick(random, denominators)
        const first = fraction(randomInt(random, 1, 2 * b - 1), b)
        const second = fraction(randomInt(random, 1, d - 1), d)
        const fixed = fraction(randomInt(random, 1, 2 * f - 1), f)
        const total = add(first, second)
        const missing = subtract(total, fixed)
        const common = lcm(lcm(first.denominator, second.denominator), fixed.denominator)
        if (missing.numerator <= 0 || common > 24 || compare(total, fraction(5, 2)) > 0) continue
        if (equals(missing, first) || equals(missing, second)) continue
        // Forgetting the weight already there, adding it instead of taking it away, near misses, and adding across
        const mistakes = [
            total,
            add(total, fixed),
            add(missing, fraction(1, common)),
            subtract(missing, fraction(1, common)),
            fraction(Math.abs(first.numerator + second.numerator - fixed.numerator), Math.abs(first.denominator + second.denominator - fixed.denominator) || 1)
        ].filter((value) => value.numerator > 0 && !equals(value, missing))
        let tray = addDistinct([], [missing], 1)
        tray = addDistinct(tray, shuffle(random, mistakes), 5 - tray.length)
        if (tray.length !== 5) continue
        return finish(random, { left: [first, second], right: [fixed], tray, solution: [] }, [missing])
    }
}

/** Shuffles the tray and records where the solution weights ended up */
function finish(random: Random, round: BalanceRound, solution: FractionValue[]): BalanceRound {
    const tray = shuffle(random, round.tray)
    const used = new Set<number>()
    const indices = solution.map((value) => {
        const index = tray.findIndex((item, position) => !used.has(position) && equals(item, value))
        used.add(index)
        return index
    })
    return { ...round, tray, solution: indices.sort((a, b) => a - b) }
}

const builders = [equalWeights, sumWeights, missingWeight]

export function createBalanceRound(random: Random, level: BalanceLevel): BalanceRound {
    return builders[level](random)
}

/** A level's rounds, never the same loaded pan twice */
export function createBalanceRounds(random: Random, level: BalanceLevel): BalanceRound[] {
    const rounds: BalanceRound[] = []
    const seen = new Set<string>()
    while (rounds.length < BALANCE_ROUNDS) {
        const round = createBalanceRound(random, level)
        const id = [...round.left, ...round.right].map(key).join('+')
        if (seen.has(id)) continue
        seen.add(id)
        rounds.push(round)
    }
    return rounds
}

/* ---------- Explaining a round ---------- */

const latex = (value: FractionValue) => (value.denominator === 1 ? String(value.numerator) : `\\frac{${value.numerator}}{${value.denominator}}`)

/** a + b + … written over a common denominator and added: \frac{1}{3}+\frac{1}{4}=\frac{4}{12}+\frac{3}{12}=\frac{7}{12} */
export function sumLatex(values: FractionValue[], denominator?: number): string {
    const total = sum(values)
    if (values.length === 1) return latex(values[0])
    const common = denominator ?? values.reduce((value, item) => lcm(value, item.denominator), 1)
    const written = values.map(latex).join('+')
    const scaled = values.map((value) => `\\frac{${(value.numerator * common) / value.denominator}}{${common}}`).join('+')
    const parts = [written]
    if (scaled !== written) parts.push(scaled)
    const unsimplified = `\\frac{${(total.numerator * common) / total.denominator}}{${common}}`
    if (unsimplified !== latex(total)) parts.push(unsimplified)
    parts.push(latex(total))
    return parts.join('=')
}

/** Common denominator of everything on the scale, so both pans are written alike */
export function roundDenominator(round: BalanceRound): number {
    return [...round.left, ...round.right, ...round.solution.map((index) => round.tray[index])].reduce((value, item) => lcm(value, item.denominator), 1)
}
