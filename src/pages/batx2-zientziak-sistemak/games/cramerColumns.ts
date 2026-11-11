import { fraction, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { written } from '../../batx1-zientziak-errealak/games/race.ts'
import { detValue, replaceColumn, systemLatex } from '../system.ts'

/* ==========================================================================
   J2 · Cramer, zutabez zutabe (Cramer, columna a columna): a system and an
   unknown. Levels 1 and 2 (2 × 2 and 3 × 3): which determinant is |A_j|?
   The wrong ones are B in another column, B written as a row, and A as it
   is. Level 3: the value of the unknown among four (|A|/|A_j| upside down,
   the column of another unknown, the sign changed). The tests rebuild
   every option from the system.
   ========================================================================== */

export const CRAMER_ROUNDS = 6
export const NAMES = ['x', 'y', 'z'] as const

export type CramerOption = { kind: 'right' | 'other-column' | 'row' | 'plain' | 'inverted' | 'sign'; latex: string }

export interface CramerRound {
    level: number
    rows: number[][]
    b: number[]
    unknown: number
    options: CramerOption[]
    answer: number
    /** The value of the unknown */
    value: FractionValue
}

const small = (random: Random) => pick(random, [-3, -2, -1, 1, 2, 3, 4])
export const vm = (rows: number[][]) => `\\begin{vmatrix}${rows.map((row) => row.join('&')).join('\\\\')}\\end{vmatrix}`
/** A with row i replaced by B: the slip of writing B as a row */
export const replaceRow = (a: number[][], b: number[], row: number) => a.map((items, i) => (i === row ? [...b] : [...items]))

export const roundSystem = (round: Pick<CramerRound, 'rows' | 'b'>) => systemLatex(round.rows, round.b)

function makeRound(random: Random, level: number): CramerRound | null {
    const size = level === 0 ? 2 : 3
    const rows = Array.from({ length: size }, () => Array.from({ length: size }, () => small(random)))
    const d = detValue(rows)
    if (d === 0 || Math.abs(d) > 30) return null
    const solution = rows.map(() => small(random))
    const b = rows.map((row) => row.reduce((sum, item, j) => sum + item * solution[j], 0))
    if (b.some((item) => Math.abs(item) > 15)) return null
    const unknown = randomInt(random, 0, size - 1)
    const other = (unknown + 1) % size
    const dj = detValue(replaceColumn(rows, b, unknown))
    const value = fraction(dj, d)
    let options: CramerOption[]
    if (level < 2) {
        options = [
            { kind: 'right', latex: vm(replaceColumn(rows, b, unknown)) },
            { kind: 'other-column', latex: vm(replaceColumn(rows, b, other)) },
            { kind: 'row', latex: vm(replaceRow(rows, b, unknown)) },
            { kind: 'plain', latex: vm(rows) }
        ]
    } else {
        const latex = (input: FractionValue) => written(input) ?? `\\frac{${input.numerator}}{${input.denominator}}`
        const otherValue = fraction(detValue(replaceColumn(rows, b, other)), d)
        options = [
            { kind: 'right', latex: latex(value) },
            ...(dj === 0 ? [] : [{ kind: 'inverted' as const, latex: latex(fraction(d, dj)) }]),
            { kind: 'other-column', latex: latex(otherValue) },
            { kind: 'sign', latex: latex(fraction(-value.numerator, value.denominator)) },
            { kind: 'plain', latex: latex(fraction(dj)) }
        ]
        const seen = new Set<string>()
        options = options.filter((option) => !seen.has(option.latex) && seen.add(option.latex)).slice(0, 4)
        if (options.length < 4) return null
    }
    if (new Set(options.map((option) => option.latex)).size !== 4) return null
    options = shuffle(random, options)
    return { level, rows, b, unknown, options, answer: options.findIndex((option) => option.kind === 'right'), value }
}

/** Six rounds of one level */
export function createCramerRounds(random: Random, level: number): CramerRound[] {
    const rounds: CramerRound[] = []
    for (let attempt = 0; rounds.length < CRAMER_ROUNDS && attempt < 5000; attempt += 1) {
        const round = makeRound(random, level)
        if (round) rounds.push(round)
    }
    return rounds
}
