import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { matrixLatex, power, toMatrix, toNumbers, type Matrix } from '../matrix.ts'

/* ==========================================================================
   J3 · Berretura erraldoia (Potencia gigante): the learner sees A, A² and
   A³ and chooses a giant power such as A²⁰²⁶ among four matrices. Level 1:
   A² = I (even or odd). Level 2: A³ = I or A⁴ = I (the remainder of n).
   Level 3: a number that grows with n, (1 a / 0 1)ⁿ = (1 na / 0 1) and the
   like. The wrong options are a power with the wrong remainder, I, and the
   power taken entry by entry. One right option per round.
   ========================================================================== */

export const POWER_ROUNDS = 5

export interface PowerRound {
    level: number
    base: number[][]
    exponent: number
    /** A, A², A³ as shown */
    shown: number[][][]
    options: number[][][]
    answer: number
    /** How the exponent is cut: the period (A^k = I) or 0 when the entries grow with n */
    period: number
}

const INVOLUTIONS = [[[0, 1], [1, 0]], [[-1, 0], [0, 1]], [[1, 0], [0, -1]], [[0, -1], [-1, 0]], [[1, 2], [0, -1]], [[-1, 0], [3, 1]]]
const CYCLES = [[[0, -1], [1, 0]], [[0, 1], [-1, 0]], [[0, -1], [1, -1]], [[-1, 1], [-1, 0]], [[0, 0, 1], [1, 0, 0], [0, 1, 0]], [[0, 1, 0], [0, 0, 1], [1, 0, 0]]]

const key = (matrix: number[][]) => JSON.stringify(matrix)
const at = (base: number[][], exponent: number) => toNumbers(power(toMatrix(base), exponent))
const identity = (size: number) => Array.from({ length: size }, (_, i) => Array.from({ length: size }, (__, j) => (i === j ? 1 : 0)))
/** The smallest k with A^k = I (up to 12) */
export function periodOf(base: number[][]): number {
    for (let k = 1; k <= 12; k++) if (key(at(base, k)) === key(identity(base.length))) return k
    return 0
}
/** Entry by entry: every number raised to n (the typical slip) */
const entrywise = (base: number[][], exponent: number) => base.map((row) => row.map((value) => value ** exponent))

function build(random: Random, level: number, base: number[][], exponent: number, wrong: number[][][]): PowerRound | null {
    const right = at(base, exponent)
    const options: number[][][] = [right]
    for (const item of wrong) {
        if (options.some((other) => key(other) === key(item))) continue
        if (item.flat().some((value) => !Number.isSafeInteger(value) || Math.abs(value) > 99_999)) continue
        options.push(item)
        if (options.length === 4) break
    }
    if (options.length < 4) return null
    const shuffled = shuffle(random, options)
    return { level, base, exponent, shown: [1, 2, 3].map((k) => at(base, k)), options: shuffled, answer: shuffled.findIndex((item) => key(item) === key(right)), period: periodOf(base) }
}

function involutionRound(random: Random): PowerRound | null {
    const base = pick(random, INVOLUTIONS)
    const exponent = pick(random, [2026, 2025, 101, 100, 51, 64, 999, 1000])
    const minus = (matrix: number[][]) => matrix.map((row) => row.map((value) => -value))
    return build(random, 0, base, exponent, [at(base, exponent + 1), minus(base), minus(identity(base.length)), base.map((row) => row.map((value) => Math.abs(value)))])
}

function cycleRound(random: Random): PowerRound | null {
    const base = pick(random, CYCLES)
    const period = periodOf(base)
    const exponent = randomInt(random, 30, 2030)
    if (exponent % period === 0 && random() < 0.6) return null
    const others = Array.from({ length: period }, (_, r) => at(base, exponent + r + 1))
    return build(random, 1, base, exponent, [...others, at(base, exponent).map((row) => row.map((value) => -value)), identity(base.length)])
}

function patternRound(random: Random): PowerRound | null {
    const a = pick(random, [2, 3, -2, 4, -3, 5])
    const kind = randomInt(random, 0, 2)
    const base = kind === 0 ? [[1, a], [0, 1]] : kind === 1 ? [[1, 0], [a, 1]] : [[1, a, 0], [0, 1, 0], [0, 0, 1]]
    const exponent = pick(random, [10, 20, 25, 50, 100, 2026])
    const grown = at(base, exponent)
    const plusN = base.map((row, i) => row.map((value, j) => (i !== j && value !== 0 ? value + exponent : value)))
    const timesA = base.map((row, i) => row.map((value, j) => (i !== j && value !== 0 ? value * (exponent - 1) : value)))
    const diagonalN = grown.map((row, i) => row.map((value, j) => (i === j ? exponent : value)))
    return build(random, 2, base, exponent, [entrywise(base, exponent), plusN, timesA, diagonalN])
}

const makers = [involutionRound, cycleRound, patternRound]

/** The rounds of a level, with different bases or exponents */
export function createPowerRounds(random: Random, level: number): PowerRound[] {
    const rounds: PowerRound[] = []
    const seen = new Set<string>()
    for (let attempt = 0; rounds.length < POWER_ROUNDS && attempt < 5000; attempt++) {
        const round = (makers[level] ?? makers[0])(random)
        if (!round) continue
        const id = `${key(round.base)} ${round.exponent}`
        if (seen.has(id) || rounds.some((other) => key(other.base) === key(round.base) && rounds.length < 4)) continue
        seen.add(id)
        rounds.push(round)
    }
    return rounds
}

export const powerLatex = (matrix: number[][] | Matrix) => matrixLatex(matrix as number[][])
