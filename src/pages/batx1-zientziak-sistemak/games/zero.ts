import { gcd } from '../../../features/unit-v2/math/fraction.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J1 · Egin zeroa (Haz el cero): the augmented matrix of a system and one
   place under a pivot that has to become 0. The learner picks the row
   operation, m·Eᵢ + k·Eⱼ, among four: one leaves the 0; the others are the
   typical slips (the sign of k, the pivot taken as 1, the numbers
   swapped). The rounds follow one another on the same matrix, so the
   system is made triangular step by step and its solution appears at the
   end. Level 1: 2 × 2 systems starting with x; level 2: 3 × 3 systems,
   three steps each; level 3: pivots that are not 1, so m is needed too.
   ========================================================================== */

export const ZERO_ROUNDS = 6

export interface ZeroOption {
    m: number
    k: number
}

export interface ZeroRound {
    /** The matrix before the step, one row per equation, the constant term last */
    rows: number[][]
    target: number
    source: number
    /** The column of the pivot, where the 0 has to appear */
    column: number
    options: ZeroOption[]
    /** The option that leaves the 0 */
    answer: number
    /** The matrix after the right step */
    after: number[][]
    /** The solution, when this step leaves the matrix triangular */
    solution: number[] | null
}

/** The new entry under the pivot: m times the target's plus k times the pivot */
export const zeroLeft = (round: Pick<ZeroRound, 'rows' | 'target' | 'source' | 'column'>, option: ZeroOption) => option.m * round.rows[round.target][round.column] + option.k * round.rows[round.source][round.column]

/** The row m·Eᵢ + k·Eⱼ */
export const combined = (rows: number[][], target: number, source: number, option: ZeroOption) => rows[target].map((value, column) => option.m * value + option.k * rows[source][column])

/** The operation in LaTeX: E_2-3E_1, 2E_2+E_1 */
export function zeroOperationLatex(target: number, source: number, option: ZeroOption): string {
    const changing = `${option.m === 1 ? '' : option.m}E_${target + 1}`
    const size = Math.abs(option.k) === 1 ? '' : String(Math.abs(option.k))
    return `${changing}${option.k < 0 ? '-' : '+'}${size}E_${source + 1}`
}

/** The matrix in LaTeX, with the bar before the constant terms */
export const zeroMatrixLatex = (rows: number[][]) => `\\left(\\begin{array}{${'c'.repeat(rows[0].length - 1)}|c}${rows.map((row) => row.join('&')).join('\\\\ ')}\\end{array}\\right)`

/** m and k that leave 0 under a pivot p from an entry e, with m > 0 and the smallest numbers */
function rightOption(pivot: number, entry: number): ZeroOption {
    const g = gcd(Math.abs(pivot), Math.abs(entry))
    return { m: Math.abs(pivot) / g, k: (-Math.sign(pivot) * entry) / g }
}

/** The right operation and three mistakes, all different and only one leaving the 0 */
function optionsFor(random: Random, round: Omit<ZeroRound, 'options' | 'answer'>): { options: ZeroOption[]; answer: number } | null {
    const pivot = round.rows[round.source][round.column]
    const entry = round.rows[round.target][round.column]
    const right = rightOption(pivot, entry)
    const candidates: ZeroOption[] = [
        { m: right.m, k: -right.k },
        { m: 1, k: -entry },
        { m: right.m === 1 ? 1 : Math.abs(right.k), k: right.m === 1 ? right.k + (right.k > 0 ? 1 : -1) : -Math.sign(right.k) * right.m },
        { m: 1, k: right.k - 1 },
        { m: 1, k: right.k + 1 },
        { m: right.m, k: right.k + 1 }
    ]
    const chosen: ZeroOption[] = [right]
    for (const option of candidates) {
        if (chosen.length === 4) break
        if (option.k === 0 || option.m < 1 || Math.abs(option.k) > 9) continue
        if (zeroLeft(round, option) === 0) continue
        if (chosen.some((other) => other.m === option.m && other.k === option.k)) continue
        chosen.push(option)
    }
    if (chosen.length < 4) return null
    const options = shuffle(random, chosen)
    return { options, answer: options.findIndex((option) => option.m === right.m && option.k === right.k) }
}

const dot = (row: number[], point: number[]) => row.reduce((total, value, index) => total + value * point[index], 0)
/** A row a·x + … = d from its coefficients and a solution */
const rowFor = (coefficients: number[], point: number[]) => [...coefficients, dot(coefficients, point)]

/** One step of the elimination, ready as a round */
function step(random: Random, rows: number[][], target: number, source: number, column: number, last: boolean, solution: number[]): ZeroRound | null {
    const pivot = rows[source][column]
    const entry = rows[target][column]
    if (pivot === 0 || entry === 0) return null
    const right = rightOption(pivot, entry)
    const after = rows.map((row) => [...row])
    after[target] = combined(rows, target, source, right)
    const base = { rows, target, source, column, after, solution: last ? solution : null }
    const made = optionsFor(random, base)
    return made && { ...base, ...made }
}

/** Level 1: x + by = c and ax + b′y = c′, with a whole solution */
function twoByTwo(random: Random, leading: number): ZeroRound | null {
    const point = [randomInt(random, -3, 3), randomInt(random, -3, 3)]
    const b = pick(random, [-3, -2, -1, 1, 2, 3])
    const a = pick(random, leading === 1 ? [-4, -3, -2, 2, 3, 4, 5] : [-3, -2, -1, 1, 2, 3, 4, 5].filter((value) => value % leading !== 0))
    const b2 = randomInt(random, -4, 4)
    if (b2 * leading - a * b === 0) return null
    const rows = [rowFor([leading, b], point), rowFor([a, b2], point)]
    // At least one number has to change on the right too, or the constant term would look untouched
    if (rows[1][2] === 0 && rows[0][2] === 0) return null
    return step(random, rows, 1, 0, 0, true, point)
}

/** Level 2: three steps on a 3 × 3 system whose first pivot is 1 and whose second step needs no m */
function threeByThree(random: Random): ZeroRound[] | null {
    const point = [randomInt(random, -3, 3), randomInt(random, -3, 3), randomInt(random, -3, 3)]
    const first = [1, randomInt(random, -2, 2), randomInt(random, -2, 2)]
    const second = [pick(random, [-3, -2, -1, 1, 2, 3]), randomInt(random, -3, 3), randomInt(random, -3, 3)]
    const third = [pick(random, [-3, -2, -1, 1, 2, 3]), randomInt(random, -3, 3), randomInt(random, -3, 3)]
    const m0 = [rowFor(first, point), rowFor(second, point), rowFor(third, point)]
    const r1 = step(random, m0, 1, 0, 0, false, point)
    if (!r1) return null
    const r2 = step(random, r1.after, 2, 0, 0, false, point)
    if (!r2) return null
    const p = r2.after[1][1]
    const q = r2.after[2][1]
    // The pivot of y divides the entry under it, the step needs k only, and z is left alone at the end
    if (p === 0 || q === 0 || q % p !== 0 || Math.abs(q / p) > 5) return null
    const r3 = step(random, r2.after, 2, 1, 1, true, point)
    if (!r3 || r3.after[2][2] === 0) return null
    if ([...r1.after, ...r2.after, ...r3.after].some((row) => row.some((value) => Math.abs(value) > 30))) return null
    return [r1, r2, r3]
}

export function createZeroRounds(random: Random, level: number): ZeroRound[] {
    const rounds: ZeroRound[] = []
    for (let attempt = 0; rounds.length < ZERO_ROUNDS && attempt < 5000; attempt += 1) {
        if (level === 1) {
            const made = threeByThree(random)
            if (made) rounds.push(...made)
            continue
        }
        const round = twoByTwo(random, level === 2 ? pick(random, [2, 3]) : 1)
        if (!round || rounds.some((other) => zeroMatrixLatex(other.rows) === zeroMatrixLatex(round.rows))) continue
        rounds.push(round)
    }
    return rounds.slice(0, ZERO_ROUNDS)
}

/** A row of the matrix as an equation: 3x-y=5, -2y+z=4 */
export function zeroRowLatex(row: number[]): string {
    const names = ['x', 'y', 'z'].slice(0, row.length - 1)
    const terms = names.map((name, index) => ({ name, value: row[index] })).filter(({ value }) => value !== 0)
    if (terms.length === 0) return `0${names[names.length - 1]}=${row[row.length - 1]}`
    return `${terms.map(({ name, value }, index) => `${value < 0 ? '-' : index === 0 ? '' : '+'}${Math.abs(value) === 1 ? '' : Math.abs(value)}${name}`).join('')}=${row[row.length - 1]}`
}
