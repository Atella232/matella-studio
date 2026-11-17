import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J1 · Cuadra la taquilla (Leihatila koadratu): a theatre sold tickets at
   two or three prices; the total of tickets and the takings are known, and
   with three prices one more fact. The learner picks, out of three, how
   many tickets of one price were sold. Level 1: two prices (a 2 × 2
   system). Level 2: three prices, and k times as many of the cheapest as
   of the dearest. Level 3: three prices, and as many of the cheapest as of
   the other two together. Every round has a single solution in whole,
   non-negative numbers (the determinant is never 0). Pure logic.
   ========================================================================== */

export const BOX_ROUNDS = 5

export type BoxRelation = { kind: 'none' } | { kind: 'times'; times: number } | { kind: 'sum' }

export interface BoxRound {
    /** Ticket prices, from the cheapest */
    prices: number[]
    /** How many tickets of each price were sold: the solution */
    counts: number[]
    tickets: number
    takings: number
    relation: BoxRelation
    /** The price whose tickets are asked for */
    ask: number
    options: number[]
}

/** The 3 × 3 determinant of the system, to be sure the solution is the only one */
export function boxDeterminant(round: Pick<BoxRound, 'prices' | 'relation'>): number {
    const [a, b, c] = round.prices
    if (round.relation.kind === 'none') return round.prices[1] - round.prices[0]
    // Rows: x + y + z, a·x + b·y + c·z, and the relation (x − k·z or x − y − z)
    const third = round.relation.kind === 'times' ? [1, 0, -round.relation.times] : [1, -1, -1]
    return 1 * (b * third[2] - c * third[1]) - 1 * (a * third[2] - c * third[0]) + 1 * (a * third[1] - b * third[0])
}

/** Solves the round from its totals only (Cramer's rule), as a check of the generator */
export function solveBox(round: Pick<BoxRound, 'prices' | 'tickets' | 'takings' | 'relation'>): number[] {
    const { prices, tickets, takings, relation } = round
    if (relation.kind === 'none') {
        const [a, b] = prices
        const y = (takings - a * tickets) / (b - a)
        return [tickets - y, y]
    }
    const [a, b, c] = prices
    const third = relation.kind === 'times' ? [1, 0, -relation.times] : [1, -1, -1]
    const rows = [[1, 1, 1, tickets], [a, b, c, takings], [...third, 0]]
    const det3 = (m: number[][]) => m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) - m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) + m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0])
    const base = rows.map((row) => row.slice(0, 3))
    const d = det3(base)
    return [0, 1, 2].map((column) => det3(base.map((row, index) => row.map((value, j) => (j === column ? rows[index][3] : value)))) / d)
}

function options(random: Random, right: number, others: number[]): number[] | null {
    const pool = [...new Set(others.filter((value) => value >= 0 && value !== right && Number.isInteger(value)))]
    if (pool.length < 2) return null
    return shuffle(random, [right, ...shuffle(random, pool).slice(0, 2)])
}

export function createBoxRound(random: Random, level: number): BoxRound {
    for (;;) {
        let round: Omit<BoxRound, 'options'>
        if (level === 0) {
            const a = pick(random, [4, 5, 6, 8, 10])
            const b = a + pick(random, [2, 3, 4, 5])
            const counts = [randomInt(random, 2, 16) * 5, randomInt(random, 2, 16) * 5]
            round = { prices: [a, b], counts, tickets: counts[0] + counts[1], takings: a * counts[0] + b * counts[1], relation: { kind: 'none' }, ask: randomInt(random, 0, 1) }
        } else {
            const a = pick(random, [5, 6, 8, 10])
            const b = a + pick(random, [2, 3, 4, 5])
            const c = b + pick(random, [2, 3, 4, 5, 6])
            const z = randomInt(random, 1, 8) * 5
            const y = randomInt(random, 2, 12) * 5
            const relation: BoxRelation = level === 1 ? { kind: 'times', times: pick(random, [2, 3]) } : { kind: 'sum' }
            const x = relation.kind === 'times' ? relation.times * z : y + z
            const counts = [x, y, z]
            round = { prices: [a, b, c], counts, tickets: x + y + z, takings: a * x + b * y + c * z, relation, ask: pick(random, [1, 2]) }
        }
        if (boxDeterminant(round) === 0) continue
        const right = round.counts[round.ask]
        const others = round.counts.filter((_, index) => index !== round.ask)
        // The other count, half the tickets, and a near miss
        const made = options(random, right, [...others, Math.round(round.tickets / round.prices.length), right + 5, right - 5, right + 10])
        if (!made) continue
        return { ...round, options: made }
    }
}

export function createBoxRounds(random: Random, level: number): BoxRound[] {
    return Array.from({ length: BOX_ROUNDS }, () => createBoxRound(random, level))
}
