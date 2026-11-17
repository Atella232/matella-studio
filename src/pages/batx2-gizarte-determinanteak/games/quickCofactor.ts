import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { cofactor, cofactorSign, det, minor } from '../../batx2-zientziak-determinanteak/determinant.ts'

/* ==========================================================================
   J2 · Adjuntu azkarra (Adjunto exprés): one cofactor or one entry of the
   inverse at a time, against the clock of five rounds. Level 1: the
   cofactor A_ij of a 3 × 3 (slips: the minor without its sign, the cofactor
   of (j, i), the entry times the cofactor). Level 2: an entry of A⁻¹ of a
   2 × 2; level 3, of a 3 × 3 (slips: no transpose, no division by |A|,
   the sign turned). Every option is a different number.
   ========================================================================== */

export const QUICK_ROUNDS = 5

export interface QuickRound {
    level: number
    a: number[][]
    row: number
    column: number
    det: number
    /** The options as LaTeX, and their values */
    options: string[]
    answer: number
    worked: string
}

const value = (input: { numerator: number; denominator: number }) => input.numerator / input.denominator
const digit = (random: Random) => pick(random, [-2, -1, 0, 1, 2, 3])
const small = (random: Random) => pick(random, [-2, -1, 1, 2, 3, 4])

/** A fraction in LaTeX, simplified */
export function fractionLatex(numerator: number, denominator: number): string {
    const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b))
    const g = gcd(numerator, denominator) || 1
    let n = numerator / g
    let d = denominator / g
    if (d < 0) { n = -n; d = -d }
    return d === 1 ? String(n) : `${n < 0 ? '-' : ''}\\frac{${Math.abs(n)}}{${d}}`
}

/** The right option and three different wrong ones, as fractions over the same denominator */
function choose(random: Random, right: [number, number], slips: Array<[number, number]>): { options: string[]; answer: number } | null {
    const rightLatex = fractionLatex(...right)
    const wrong: string[] = []
    for (const [n, d] of [...slips, [right[0] + right[1], right[1]], [right[0] - right[1], right[1]], [-right[0], right[1]], [right[0] + 2 * right[1], right[1]]] as Array<[number, number]>) {
        if (wrong.length === 3) break
        const latex = fractionLatex(n, d)
        if (latex === rightLatex || latex === '-0' || wrong.includes(latex)) continue
        wrong.push(latex)
    }
    if (wrong.length < 3) return null
    const options = shuffle(random, [rightLatex, ...wrong])
    return { options, answer: options.indexOf(rightLatex) }
}

const vm = (rows: number[][]) => `\\begin{vmatrix}${rows.map((row) => row.join('&')).join('\\\\')}\\end{vmatrix}`
const without = (a: number[][], row: number, column: number) => a.filter((_, r) => r !== row).map((cells) => cells.filter((_, c) => c !== column))

function cofactorRound(random: Random): QuickRound | null {
    const a = Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => digit(random)))
    const row = randomInt(random, 0, 2)
    const column = randomInt(random, 0, 2)
    const c = value(cofactor(a, row, column))
    const m = value(minor(a, row, column))
    const mirror = value(cofactor(a, column, row))
    const picked = choose(random, [c, 1], [[m === c ? -m : m, 1], [mirror, 1], [a[row][column] * c, 1]])
    const sign = cofactorSign(row, column) === 1 ? '+' : '-'
    return picked && { level: 0, a, row, column, det: value(det(a)), ...picked, worked: `A_{${row + 1}${column + 1}}=${sign}${vm(without(a, row, column))}=${c}` }
}

function inverseRound(random: Random, size: 2 | 3): QuickRound | null {
    const a = Array.from({ length: size }, () => Array.from({ length: size }, () => (size === 2 ? small(random) : digit(random))))
    const d = value(det(a))
    if (d === 0 || Math.abs(d) > 6) return null
    const row = randomInt(random, 0, size - 1)
    const column = randomInt(random, 0, size - 1)
    // (A⁻¹)_ij = A_ji / |A|
    const transposed = value(cofactor(a, column, row))
    const straight = value(cofactor(a, row, column))
    const picked = choose(random, [transposed, d], [[straight, d], [transposed, 1], [-transposed, d]])
    return picked && { level: size === 2 ? 1 : 2, a, row, column, det: d, ...picked, worked: `(A^{-1})_{${row + 1}${column + 1}}=\\frac{A_{${column + 1}${row + 1}}}{|A|}=\\frac{${transposed}}{${d}}=${fractionLatex(transposed, d)}` }
}

export function createQuickRounds(random: Random, level: number): QuickRound[] {
    const rounds: QuickRound[] = []
    for (let attempt = 0; rounds.length < QUICK_ROUNDS && attempt < 5000; attempt += 1) {
        const round = level === 0 ? cofactorRound(random) : inverseRound(random, level === 1 ? 2 : 3)
        if (!round || rounds.some((other) => other.a.flat().join() === round.a.flat().join())) continue
        rounds.push(round)
    }
    return rounds
}

/** The matrix, with the asked entry boxed in level 1 */
export function quickLatex(round: QuickRound): string {
    const cells = round.a.map((cells, r) => cells.map((entry, c) => (round.level === 0 && r === round.row && c === round.column ? `\\boxed{${entry}}` : String(entry))))
    return `A=\\begin{pmatrix}${cells.map((row) => row.join('&')).join('\\\\')}\\end{pmatrix}`
}
