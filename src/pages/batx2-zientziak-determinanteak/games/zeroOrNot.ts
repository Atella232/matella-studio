import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { det } from '../determinant.ts'

/* ==========================================================================
   J2 · Zero, kalkulatu gabe? (¿Cero sin calcular?): a 3 × 3 determinant
   and four statements: three relations between its rows (E₃ = 2E₁,
   E₂ = E₁ + E₃…) and «|A| ≠ 0». Exactly one is true. When a row is a
   multiple or a combination of the others, the determinant is 0 and that
   relation is the answer; the traps change one number, so the relation
   that seems to hold does not and |A| ≠ 0. Level 1: multiples. Level 2:
   combinations. Level 3: both, with more traps. The tests check each
   statement against the numbers.
   ========================================================================== */

export const ZERO_ROUNDS = 6

/** E_target = a·E_first + b·E_second (b = 0 for a multiple) */
export interface RowRelation {
    target: number
    first: number
    a: number
    second: number
    b: number
}

export interface ZeroRound {
    level: number
    rows: number[][]
    /** Three relations and, as null, «|A| ≠ 0» */
    options: Array<RowRelation | null>
    answer: number
    value: number
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })

const small = (random: Random) => pick(random, [-3, -2, -1, 0, 1, 2, 3, 4])
const detOf = (rows: number[][]) => {
    const value = det(rows)
    return value.numerator / value.denominator
}

/** Whether the relation holds for these rows */
export const holds = (rows: number[][], relation: RowRelation) => rows[relation.target].every((value, k) => value === relation.a * rows[relation.first][k] + relation.b * rows[relation.second][k])

const term = (factor: number, row: number, first: boolean) => {
    if (factor === 0) return ''
    const size = Math.abs(factor) === 1 ? '' : String(Math.abs(factor))
    const sign = factor < 0 ? '-' : first ? '' : '+'
    return `${sign}${size}E_${row + 1}`
}

/** E_3=2E_1, E_2=E_1-E_3 */
export const relationLatex = (relation: RowRelation | null) =>
    relation === null ? '|A|\\neq 0' : `E_${relation.target + 1}=${term(relation.a, relation.first, true)}${term(relation.b, relation.second, false)}`

/** Two rows that are not proportional, without zeros everywhere */
function baseRows(random: Random): number[][] | null {
    const e1 = [small(random), small(random), small(random)]
    const e2 = [small(random), small(random), small(random)]
    if (e1.every((value) => value === 0) || e2.every((value) => value === 0)) return null
    const proportional = [0, 1, 2].every((k) => e1[k] * e2[(k + 1) % 3] === e2[k] * e1[(k + 1) % 3]) && [0, 1, 2].every((k) => e1[k] * e2[(k + 2) % 3] === e2[k] * e1[(k + 2) % 3])
    return proportional ? null : [e1, e2]
}

/** A relation of the kind of the level, between three different rows */
function randomRelation(random: Random, multiple: boolean): RowRelation {
    const [target, first, second] = shuffle(random, [0, 1, 2])
    if (multiple) return { target, first, a: pick(random, [1, 2, 3, -1, -2]), second, b: 0 }
    return { target, first, a: pick(random, [1, 2, -1]), second, b: pick(random, [1, -1, 2]) }
}

/** The rows that make a relation true: the target row is built from the other two */
function rowsFor(base: number[][], relation: RowRelation): number[][] {
    const rows: number[][] = [[], [], []]
    rows[relation.first] = base[0]
    rows[relation.second] = base[1]
    rows[relation.target] = base[0].map((value, k) => relation.a * value + relation.b * base[1][k])
    return rows
}

/** One round: a zero determinant with its relation, or a trap with one number changed */
function makeRound(random: Random, level: number): ZeroRound | null {
    const base = baseRows(random)
    if (!base) return null
    const multiple = level === 0 ? true : level === 1 ? false : randomInt(random, 0, 1) === 0
    const relation = randomRelation(random, multiple)
    let rows = rowsFor(base, relation)
    const trap = randomInt(random, 0, level === 2 ? 1 : 2) === 0
    if (trap) {
        const k = randomInt(random, 0, 2)
        rows = rows.map((row, r) => (r === relation.target ? row.map((value, c) => (c === k ? value + pick(random, [1, -1]) : value)) : row))
    }
    if (rows.flat().some((value) => Math.abs(value) > 12)) return null
    const value = detOf(rows)
    if (trap !== (value !== 0)) return null
    // The relation shown (true or the trap), and two more that are false
    const others: RowRelation[] = []
    for (let attempt = 0; others.length < 2 && attempt < 60; attempt += 1) {
        const other = randomRelation(random, randomInt(random, 0, 1) === 0)
        const latex = relationLatex(other)
        if (holds(rows, other) || latex === relationLatex(relation) || others.some((item) => relationLatex(item) === latex)) continue
        others.push(other)
    }
    if (others.length < 2) return null
    const options = shuffle(random, [relation, ...others])
    const all: Array<RowRelation | null> = [...options, null]
    const answer = all.findIndex((option) => (option === null ? value !== 0 : holds(rows, option)))
    if (all.filter((option) => (option === null ? value !== 0 : holds(rows, option))).length !== 1) return null
    return { level, rows, options: all, answer, value }
}

/** Six rounds of one level, all different */
export function createZeroRounds(random: Random, level: number): ZeroRound[] {
    const rounds: ZeroRound[] = []
    for (let attempt = 0; rounds.length < ZERO_ROUNDS && attempt < 3000; attempt += 1) {
        const round = makeRound(random, level)
        if (!round) continue
        if (rounds.some((other) => JSON.stringify(other.rows) === JSON.stringify(round.rows))) continue
        rounds.push(round)
    }
    // At least one trap and one zero in every game
    if (!rounds.some((round) => round.value === 0) || !rounds.some((round) => round.value !== 0)) return createZeroRounds(random, level)
    return rounds
}

export const zeroWhy = {
    zero: say('Errenkada bat besteen multiploa edo konbinazioa denean, determinantea 0 da.', 'Cuando una fila es múltiplo o combinación de las otras, el determinante es 0.', 'عندما يكون صف مضاعفًا لغيره أو تركيبًا من الصفوف الأخرى يكون المحدد صفرًا.', 'When a row is a multiple or a combination of the others, the determinant is 0.'),
    trap: say('Tranpa: zenbaki batek ez du betetzen. Errenkadak independenteak dira.', 'Trampa: un número no cumple. Las filas son independientes.', 'فخ: عدد واحد لا يحقق العلاقة. الصفوف مستقلة.', 'A trap: one number does not fit. The rows are independent.')
}
