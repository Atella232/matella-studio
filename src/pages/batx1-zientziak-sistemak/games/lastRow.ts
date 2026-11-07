import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J2 · Irakurri azken errenkada (Lee la última fila): a system already made
   triangular, as its augmented matrix. Levels 1 and 2 ask how many
   solutions it has: one, infinitely many or none. Level 2 hides the traps:
   a row 0 0 0 | 5 that is not the last one, two rows of zeros, and a last
   row 0 0 −2 | 0, which is z = 0 and not «no solution». Level 3 puts a
   parameter in the last row and asks for the value of a that makes the
   system inconsistent or dependent.
   ========================================================================== */

export const LAST_ROW_ROUNDS = 6

export type RowKind = 'one' | 'infinite' | 'none'
export const ROW_KINDS: RowKind[] = ['one', 'infinite', 'none']

export interface LastRowRound {
    /** Three rows of four cells, in LaTeX (a cell can hold a − 3) */
    rows: string[][]
    mode: 'kind' | 'parameter'
    /** Level 1 and 2: the kind of system */
    kind: RowKind
    /** Level 3: the kind asked about and the three values of a offered */
    asked: RowKind
    values: number[]
    /** Level 3: the right value of a (the one that makes the pivot of z zero) */
    critical: number
    /** The numbers behind the last row: c·z = d, or with the parameter (a − k)z = d */
    meta: Record<string, number>
}

const cell = (value: number) => String(value)
/** a − k in LaTeX: a-3, a+2, a */
const minusK = (k: number) => (k === 0 ? 'a' : k > 0 ? `a-${k}` : `a+${-k}`)

/** The two rows above the last one: x + by + cz = d and py + qz = r, with p ≠ 0 */
function topRows(random: Random): string[][] {
    const first = [1, randomInt(random, -3, 3), randomInt(random, -3, 3), randomInt(random, -6, 6)]
    const second = [0, pick(random, [-3, -2, -1, 1, 2, 3]), randomInt(random, -3, 3), randomInt(random, -6, 6)]
    return [first.map(cell), second.map(cell)]
}

/** Level 1: the last row alone decides */
function plainRound(random: Random, kind: RowKind): LastRowRound {
    const c = pick(random, [-4, -3, -2, 2, 3, 4])
    const z = randomInt(random, -3, 3)
    const d = kind === 'one' ? c * z : kind === 'infinite' ? 0 : pick(random, [-5, -3, -2, 2, 4, 6])
    const last = [0, 0, kind === 'one' ? c : 0, d].map(cell)
    return { rows: [...topRows(random), last], mode: 'kind', kind, asked: kind, values: [], critical: 0, meta: { c: kind === 'one' ? c : 0, d } }
}

/** Level 2: the traps of reading a triangular matrix */
function trickyRound(random: Random, kind: RowKind): LastRowRound {
    const top = topRows(random)
    const trap = pick(random, [0, 1])
    if (kind === 'none') {
        // A row 0 0 0 | k that is not the last one: there is no solution, whatever the last row says
        const k = pick(random, [-4, -2, 3, 5])
        return trap === 0
            ? { rows: [top[0], ['0', '0', '0', cell(k)], ['0', '0', '0', '0']], mode: 'kind', kind, asked: kind, values: [], critical: 0, meta: { c: 0, d: k } }
            : { rows: [...top, ['0', '0', '0', cell(k)]], mode: 'kind', kind, asked: kind, values: [], critical: 0, meta: { c: 0, d: k } }
    }
    if (kind === 'infinite') {
        // Two rows of zeros (two parameters), or one row of zeros at the end
        return trap === 0
            ? { rows: [top[0], ['0', '0', '0', '0'], ['0', '0', '0', '0']], mode: 'kind', kind, asked: kind, values: [], critical: 0, meta: { c: 0, d: 0 } }
            : { rows: [...top, ['0', '0', '0', '0']], mode: 'kind', kind, asked: kind, values: [], critical: 0, meta: { c: 0, d: 0 } }
    }
    // One solution with z = 0: a 0 on the right is not «no solution»
    const c = pick(random, [-3, -2, 2, 3, 5])
    return { rows: [...top, ['0', '0', cell(c), '0']], mode: 'kind', kind, asked: kind, values: [], critical: 0, meta: { c, d: 0 } }
}

/** Level 3: (a − k)z = d; with d = 0 or d = (a − k) the critical a gives infinitely many, with d ≠ 0 none */
function parameterRound(random: Random, asked: RowKind): LastRowRound | null {
    const k = pick(random, [-3, -2, -1, 1, 2, 3, 4])
    const top = topRows(random)
    const d = asked === 'none' ? pick(random, [-5, -3, -2, 2, 4, 6]) : 0
    const right = asked === 'none' ? cell(d) : pick(random, ['0', minusK(k)])
    const values = shuffle(random, [k, -k, asked === 'none' ? d : k + 1])
    if (new Set(values).size < 3) return null
    return { rows: [...top, ['0', '0', minusK(k), right]], mode: 'parameter', kind: asked, asked, values, critical: k, meta: { k, d, same: right === minusK(k) ? 1 : 0 } }
}

export function createLastRowRounds(random: Random, level: number): LastRowRound[] {
    const kinds = shuffle(random, [...ROW_KINDS, ...ROW_KINDS])
    if (level === 0) return kinds.map((kind) => plainRound(random, kind))
    if (level === 1) return kinds.map((kind) => trickyRound(random, kind))
    const asked = shuffle(random, ['none', 'none', 'none', 'infinite', 'infinite', 'infinite'] as RowKind[])
    const rounds: LastRowRound[] = []
    for (let attempt = 0; rounds.length < LAST_ROW_ROUNDS && attempt < 3000; attempt += 1) {
        const round = parameterRound(random, asked[rounds.length])
        if (round) rounds.push(round)
    }
    return rounds
}

/** The kind of system the rows say, read as a learner should: any row 0 0 0 | k ≠ 0 means none */
export function rowsKind(rows: number[][]): RowKind {
    if (rows.some((row) => row.slice(0, 3).every((value) => value === 0) && row[3] !== 0)) return 'none'
    const useful = rows.filter((row) => row.some((value) => value !== 0)).length
    return useful === 3 ? 'one' : 'infinite'
}

/** The numbers of a round's matrix (level 1 and 2), or of level 3 with a given value of a */
export function roundNumbers(round: LastRowRound, a = 0): number[][] {
    return round.rows.map((row) => row.map((value) => (/a/.test(value) ? a - round.critical : value === minusK(round.critical) ? a - round.critical : Number(value))))
}

/** The matrix in LaTeX */
export const lastRowMatrixLatex = (round: LastRowRound) => `\\left(\\begin{array}{ccc|c}${round.rows.map((row) => row.join('&')).join('\\\\ ')}\\end{array}\\right)`

/** The last row as an equation in LaTeX: 3z=6, 0z=5, (a-2)z=4 */
export function lastRowLatex(round: LastRowRound): string {
    const [, , c, d] = round.rows[round.rows.length - 1]
    if (/a/.test(c)) return `(${c})z=${/a/.test(d) ? `${d}` : d}`
    return `${c === '1' ? '' : c === '-1' ? '-' : c}z=${d}`
}
