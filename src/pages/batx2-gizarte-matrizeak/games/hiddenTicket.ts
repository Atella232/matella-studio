import { randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J2 · Tiket ezkutua (El ticket escondido): the product of the quantities
   of two shops by the prices, with its totals in view and one number
   covered. One row of the product is an equation with one unknown. Level
   1: two products and a covered price. Level 2: three products and a
   covered quantity. Level 3: profit, Q(V − C), with a covered cost. The
   wrong options are the slips: the other products forgotten, the division
   forgotten, the profit per unit taken for the cost.
   ========================================================================== */

export const HIDDEN_ROUNDS = 5

export interface HiddenRound {
    level: number
    q: number[][]
    /** Selling prices (levels 1 and 2: the prices) */
    sell: number[]
    /** Costs (level 3 only) */
    cost: number[]
    totals: number[]
    /** Which number is covered: a price, a quantity or a cost */
    hidden: { kind: 'price' | 'quantity' | 'cost'; row: number; column: number }
    value: number
    /** The row of the product used to find it */
    row: number
    options: number[]
    answer: number
}

const multiplyRow = (row: number[], prices: number[]) => row.reduce((sum, value, k) => sum + value * prices[k], 0)

/** The right value and three different wrong ones (whole and positive) */
function choices(random: Random, value: number, slips: number[]): { options: number[]; answer: number } | null {
    const wrong: number[] = []
    for (const candidate of [...slips, value + 1, value - 1, value + 2, value + 3]) {
        if (wrong.length === 3) break
        if (!Number.isInteger(candidate) || candidate <= 0 || candidate === value || wrong.includes(candidate)) continue
        wrong.push(candidate)
    }
    if (wrong.length < 3) return null
    const options = shuffle(random, [value, ...wrong])
    return { options, answer: options.indexOf(value) }
}

function makeRound(random: Random, level: number): HiddenRound | null {
    const products = level === 0 ? 2 : 3
    const q = [0, 1].map(() => Array.from({ length: products }, () => randomInt(random, 2, 12)))
    if (level < 2) {
        const sell = Array.from({ length: products }, () => randomInt(random, 2, 9))
        const totals = q.map((row) => multiplyRow(row, sell))
        const row = randomInt(random, 0, 1)
        const column = randomInt(random, 0, products - 1)
        const others = totals[row] - q[row][column] * sell[column]
        if (level === 0) {
            const value = sell[column]
            const picked = choices(random, value, [totals[row] / q[row][column], totals[row] - others])
            return picked && { level, q, sell, cost: [], totals, hidden: { kind: 'price', row: -1, column }, value, row, ...picked }
        }
        const value = q[row][column]
        const picked = choices(random, value, [totals[row] - others, totals[row] / sell[column]])
        return picked && { level, q, sell, cost: [], totals, hidden: { kind: 'quantity', row, column }, value, row, ...picked }
    }
    const cost = Array.from({ length: products }, () => randomInt(random, 2, 8))
    const sell = cost.map((value) => value + randomInt(random, 1, 6))
    const profit = sell.map((value, k) => value - cost[k])
    const totals = q.map((row) => multiplyRow(row, profit))
    const row = randomInt(random, 0, 1)
    const column = randomInt(random, 0, products - 1)
    const value = cost[column]
    const picked = choices(random, value, [profit[column], sell[column] + profit[column]])
    return picked && { level, q, sell, cost, totals, hidden: { kind: 'cost', row: -1, column }, value, row, ...picked }
}

export function createHiddenRounds(random: Random, level: number): HiddenRound[] {
    const rounds: HiddenRound[] = []
    for (let attempt = 0; rounds.length < HIDDEN_ROUNDS && attempt < 2000; attempt += 1) {
        const round = makeRound(random, level)
        if (!round) continue
        if (rounds.some((other) => other.q.flat().join() === round.q.flat().join())) continue
        rounds.push(round)
    }
    return rounds
}

/* ---------- LaTeX ---------- */

const HOLE = '\\boxed{?}'
const column = (values: Array<number | string>) => `\\begin{pmatrix}${values.join('\\\\')}\\end{pmatrix}`
const matrix = (rows: Array<Array<number | string>>) => `\\begin{pmatrix}${rows.map((row) => row.join('&')).join('\\\\')}\\end{pmatrix}`

/** The product with the covered number */
export function hiddenLatex(round: HiddenRound): string {
    const { kind, row, column: k } = round.hidden
    const q = round.q.map((cells, r) => cells.map((value, c) => (kind === 'quantity' && r === row && c === k ? HOLE : value)))
    const totals = column(round.totals)
    if (kind === 'cost') {
        const cost = round.cost.map((value, c) => (c === k ? HOLE : value))
        return `${matrix(q)}\\left[${column(round.sell)}-${column(cost)}\\right]=${totals}`
    }
    const sell = round.sell.map((value, c) => (kind === 'price' && c === k ? HOLE : value))
    return `${matrix(q)}${column(sell)}=${totals}`
}

/** The row used, as an equation with x for the covered number, and its solution */
export function hiddenWorked(round: HiddenRound): string {
    const { kind, column: k } = round.hidden
    const r = round.row
    const terms = round.q[r].map((value, c) => {
        if (kind === 'quantity' && c === k) return `x\\cdot ${round.sell[c]}`
        if (kind === 'price' && c === k) return `${value}x`
        if (kind === 'cost') return c === k ? `${value}(${round.sell[c]}-x)` : `${value}\\cdot ${round.sell[c] - round.cost[c]}`
        return `${value}\\cdot ${round.sell[c]}`
    })
    return `${terms.join('+')}=${round.totals[r]}\\ \\to\\ x=${round.value}`
}

export const hiddenRowName = (round: HiddenRound) => round.row + 1

