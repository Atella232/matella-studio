import { add, compare, equals, fraction, gcd, subtract, type FractionValue } from '../math/fraction.ts'
import { pick, randomInt, shuffle, type Random } from './random.ts'
import type { Stars } from './records.ts'

/* ==========================================================================
   Balantza (Balanza): a two-pan scale. Fraction weights sit on one pan and
   the learner loads the other from a tray until both weigh the same. The
   scale stays locked until the learner weighs, and there are only three
   weighings a round: thinking first earns more points than trying.

   The tray is built so that size alone does not give the answer away: the
   wrong weights share the right one's denominators and sit both above and
   below it, and the right one is at a different place in the order each
   time. The rounds of a level get harder one after another.
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
const over = (numerator: number, denominator: number) => fraction(numerator, denominator)

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

/** Points for each star: guessing alone should not reach them */
export const BALANCE_STARS = { three: 16, two: 12, one: 9 } as const

export function balanceStars(score: number): Stars {
    if (score >= BALANCE_STARS.three) return 3
    if (score >= BALANCE_STARS.two) return 2
    if (score >= BALANCE_STARS.one) return 1
    return 0
}

/* ---------- Building the rounds ---------- */

const key = (value: FractionValue) => {
    const reduced = fraction(value.numerator, value.denominator)
    return `${reduced.numerator}/${reduced.denominator}`
}

/** Adds positive candidates that differ in value from everything already there, up to `size` */
function fill(list: FractionValue[], candidates: FractionValue[], size: number): FractionValue[] {
    const result = [...list]
    for (const candidate of candidates) {
        if (result.length >= size) break
        if (candidate.numerator <= 0 || candidate.denominator <= 0) continue
        if (result.some((item) => equals(item, candidate))) continue
        result.push(candidate)
    }
    return result
}

/**
 * The wrong weights around a single right one: some lighter and some heavier,
 * how many of each chosen at random, so the right weight's place in the
 * order of the tray changes from round to round. Null when it cannot be done.
 */
function around(random: Random, answer: FractionValue, candidates: FractionValue[], count: number): FractionValue[] | null {
    const distinct = fill([answer], shuffle(random, candidates), candidates.length + 1).slice(1)
    const lighter = distinct.filter((value) => compare(value, answer) < 0)
    const heavier = distinct.filter((value) => compare(value, answer) > 0)
    const fewest = Math.max(1, count - heavier.length)
    const most = Math.min(lighter.length, count - 1)
    if (fewest > most) return null
    const below = randomInt(random, fewest, most)
    return [...lighter.slice(0, below), ...heavier.slice(0, count - below)]
}

/** Families of denominators that fit together, as in the fraction wall; the later ones for the later rounds */
const EASY_FAMILIES = [[2, 4, 8], [3, 6], [5, 10], [2, 4]]
const HARD_FAMILIES = [[2, 4, 8], [3, 6, 12], [2, 3, 6], [2, 4, 8, 16]]

/**
 * Level 1: one weight against pieces of the same family (3/4 = 1/2 + 1/4),
 * sometimes also an equivalent single weight (6/8). Two pieces in the first
 * rounds; three, and finer families, later.
 */
function equalWeights(random: Random, step: number): BalanceRound {
    const hard = step >= 3
    for (;;) {
        const family = pick(random, hard ? HARD_FAMILIES : EASY_FAMILIES)
        const finest = family[family.length - 1]
        const written = pick(random, family.slice(1).length ? family.slice(1) : family)
        const target = over(randomInt(random, Math.ceil(written / 2), Math.floor(written * 1.5)), written)
        if (target.denominator === 1) continue
        const units = (target.numerator * finest) / target.denominator
        const parts = hard && units >= 4 && random() < 0.5 ? 3 : 2
        const cuts = Array.from({ length: parts - 1 }, () => randomInt(random, 1, units - 1)).sort((a, b) => a - b)
        const sizes = [...cuts, units].map((cut, index) => cut - (index === 0 ? 0 : cuts[index - 1]))
        if (sizes.some((size) => size <= 0)) continue
        const pieces = sizes.map((size) => over(size, finest))
        if (new Set(pieces.map(key)).size !== pieces.length || pieces.some((piece) => equals(piece, target))) continue
        const equivalent = target.denominator * 2 <= finest && random() < 0.35 ? [{ numerator: target.numerator * 2, denominator: target.denominator * 2 }] : []
        // Wrong weights from the same family, lighter and heavier than the pieces and the target
        const pool = shuffle(random, family.flatMap((denominator) => Array.from({ length: 2 * denominator }, (_, n) => over(n + 1, denominator))))
            .filter((value) => !equals(value, target) && compare(value, over(target.numerator * 3, target.denominator * 2)) <= 0)
        let tray = fill([], [...pieces, ...equivalent], 5)
        tray = fill(tray, pool, 5)
        if (tray.length !== 5 || !sizeDoesNotTell(tray, [...pieces, ...equivalent])) continue
        return finish(random, { left: [target], right: [], tray, solution: [] }, pieces)
    }
}

/**
 * The right weights must not be the heaviest of the tray (or the lightest,
 * when a single one is right): "take the biggest" must not work.
 */
function sizeDoesNotTell(tray: FractionValue[], right: FractionValue[]): boolean {
    const heaviest = tray.reduce((best, value) => (compare(value, best) > 0 ? value : best))
    const lightest = tray.reduce((best, value) => (compare(value, best) < 0 ? value : best))
    if (right.some((value) => equals(value, heaviest))) return false
    return !(right.length === 1 && equals(right[0], lightest))
}

/** Level 2: two weights with different denominators; the tray has the sum (or two pieces of it) among near and typical wrong sums */
function sumWeights(random: Random, step: number): BalanceRound {
    const denominators = step < 3 ? [2, 3, 4, 6, 8, 12] : [2, 3, 4, 5, 6, 8, 10, 12]
    const maxCommon = step < 3 ? 12 : 24
    for (;;) {
        const b = pick(random, denominators)
        const d = pick(random, denominators)
        if (b === d) continue
        const first = over(randomInt(random, 1, b - 1), b)
        const second = over(randomInt(random, 1, d - 1), d)
        if (first.denominator !== b || second.denominator !== d) continue
        const total = add(first, second)
        const common = lcm(b, d)
        if (common > maxCommon || compare(total, over(3, 2)) > 0) continue
        const units = (total.numerator * common) / total.denominator
        // The sum as one weight (when it simplifies, sometimes also as written over the common denominator), or as two pieces
        let solution: FractionValue[] = [total]
        let right: FractionValue[] = units !== total.numerator && random() < 0.4 ? [total, { numerator: units, denominator: common }] : [total]
        if (units >= 3 && random() < 0.4) {
            const cut = randomInt(random, 1, units - 1)
            const pieces = [over(cut, common), over(units - cut, common)]
            if (!equals(pieces[0], pieces[1]) && !pieces.some((piece) => equals(piece, first) || equals(piece, second))) {
                solution = pieces
                right = pieces
            }
        }
        const near = [-3, -2, -1, 1, 2, 3].map((shift) => over(units + shift, common))
        // Typical slips: only one numerator scaled to the common denominator, or adding across
        const slips = [
            over(first.numerator * (common / b) + second.numerator, common),
            over(first.numerator + second.numerator * (common / d), common),
            over(first.numerator + second.numerator, b + d)
        ].filter((value) => common % value.denominator === 0 || value.denominator <= 12)
        // With two pieces, the whole sum must not be in the tray (it would be a one-weight answer)
        const pool = shuffle(random, [...near, ...slips]).filter((value) => !equals(value, total))
        const others = solution.length === 1 ? around(random, total, pool, 6 - right.length) : pool
        if (!others) continue
        const tray = fill([], [...right, ...others], 6)
        if (tray.length !== 6 || !sizeDoesNotTell(tray, right)) continue
        return finish(random, { left: [first, second], right: [], tray, solution: [] }, solution)
    }
}

/** Level 3: both pans are loaded; the learner adds what is missing, and the totals can be more than 1 */
function missingWeight(random: Random, step: number): BalanceRound {
    const denominators = [2, 3, 4, 5, 6, 8, 12]
    const maxCommon = step < 3 ? 12 : 24
    for (;;) {
        const b = pick(random, denominators)
        const d = pick(random, denominators)
        const f = pick(random, denominators)
        const first = over(randomInt(random, 1, 2 * b - 1), b)
        const second = over(randomInt(random, 1, d - 1), d)
        const fixed = over(randomInt(random, 1, 2 * f - 1), f)
        const total = add(first, second)
        const missing = subtract(total, fixed)
        const common = lcm(lcm(first.denominator, second.denominator), fixed.denominator)
        if (missing.numerator <= 0 || common > maxCommon || compare(total, over(5, 2)) > 0) continue
        if (equals(missing, first) || equals(missing, second)) continue
        const units = (missing.numerator * common) / missing.denominator
        const near = [-3, -2, -1, 1, 2, 3].map((shift) => over(units + shift, common))
        // Forgetting the weight already there, or adding it instead of taking it away
        const slips = [total, add(total, fixed)]
        const others = around(random, missing, [...near, ...shuffle(random, slips).slice(0, 1)], 4)
        if (!others) continue
        const tray = fill([missing], others, 5)
        if (tray.length !== 5 || !sizeDoesNotTell(tray, [missing])) continue
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

export function createBalanceRound(random: Random, level: BalanceLevel, step = 0): BalanceRound {
    return builders[level](random, step)
}

/** A level's rounds, easier ones first, never the same loaded pan twice */
export function createBalanceRounds(random: Random, level: BalanceLevel): BalanceRound[] {
    const rounds: BalanceRound[] = []
    const seen = new Set<string>()
    while (rounds.length < BALANCE_ROUNDS) {
        const round = createBalanceRound(random, level, rounds.length)
        const id = [...round.left, ...round.right].map(key).join('+')
        if (seen.has(id)) continue
        seen.add(id)
        rounds.push(round)
    }
    return rounds
}

/* ---------- Explaining a round ---------- */

const latex = (value: FractionValue) => (value.denominator === 1 ? String(value.numerator) : `\\frac{${value.numerator}}{${value.denominator}}`)

/**
 * a + b + … written over a common denominator and added, as separate pieces
 * so a long chain can wrap: \frac{1}{3}+\frac{1}{4}, \frac{4}{12}+\frac{3}{12}, \frac{7}{12}.
 * A single weight is rewritten over the denominator when it differs (3/4 = 6/8).
 */
export function sumParts(values: FractionValue[], denominator?: number): string[] {
    const total = sum(values)
    const common = denominator ?? values.reduce((value, item) => lcm(value, item.denominator), 1)
    const scaledOne = (value: FractionValue) => `\\frac{${(value.numerator * common) / value.denominator}}{${common}}`
    if (values.length === 1) {
        const [value] = values
        const parts = [latex(value)]
        if (common % value.denominator === 0 && common !== value.denominator && value.denominator !== 1) parts.push(scaledOne(value))
        return parts
    }
    const written = values.map(latex).join('+')
    const scaled = values.map(scaledOne).join('+')
    const parts = [written]
    if (scaled !== written) parts.push(scaled)
    const unsimplified = `\\frac{${(total.numerator * common) / total.denominator}}{${common}}`
    if (unsimplified !== latex(total)) parts.push(unsimplified)
    parts.push(latex(total))
    return parts
}

export const sumLatex = (values: FractionValue[], denominator?: number) => sumParts(values, denominator).join('=')

/** Common denominator of everything on the scale, so both pans are written alike */
export function roundDenominator(round: BalanceRound, chosen: number[] = round.solution): number {
    return [...round.left, ...round.right, ...chosen.map((index) => round.tray[index])].reduce((value, item) => lcm(value, item.denominator), 1)
}
