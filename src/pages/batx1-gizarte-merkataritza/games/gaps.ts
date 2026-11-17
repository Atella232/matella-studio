import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J2 · Hutsuneak dituen taula (La tabla con huecos): the repayment table of
   a loan with one empty cell, and three values to choose from: the right
   one and two typical mistakes. Level 1: an interest (taken on the first
   capital, or with the repayment, by mistake); level 2: a repayment (the
   whole payment, or the interest); level 3: the outstanding debt (the debt
   minus the whole payment, or the repayment itself). The table is worked
   to the cent each year, as a bank does. Pure logic.
   ========================================================================== */

export const GAPS_ROUNDS = 5

export type GapColumn = 'interest' | 'repaid' | 'left'

export interface GapRow {
    year: number
    debt: number
    interest: number
    repaid: number
    left: number
}

export interface GapRound {
    capital: number
    /** Yearly interest in % */
    rate: number
    payment: number
    rows: GapRow[]
    year: number
    column: GapColumn
    /** The three values offered, in the order shown */
    options: number[]
}

const cents = (value: number) => Math.round(value * 100) / 100

export const annuity = (capital: number, rate: number, years: number) => {
    const i = rate / 100
    return cents((capital * (1 + i) ** years * i) / ((1 + i) ** years - 1))
}

export function gapRows(capital: number, rate: number, years: number, payment: number): GapRow[] {
    const rows: GapRow[] = []
    let debt = capital
    for (let year = 1; year <= years; year++) {
        const interest = cents((debt * rate) / 100)
        const repaid = cents(payment - interest)
        const left = year === years ? 0 : cents(debt - repaid)
        rows.push({ year, debt, interest, repaid, left })
        debt = left
    }
    return rows
}

export const rightValue = (round: GapRound) => round.rows[round.year - 1][round.column]

export function createGapRound(random: Random, level: number): GapRound {
    const column: GapColumn = (['interest', 'repaid', 'left'] as const)[level] ?? 'interest'
    for (;;) {
        const capital = randomInt(random, 2, 20) * 1000
        const rate = pick(random, [3, 4, 5, 6, 8])
        const years = pick(random, [3, 4])
        const payment = annuity(capital, rate, years)
        const rows = gapRows(capital, rate, years, payment)
        // The cell is never in the last year for the debt left (it is zero there)
        const year = randomInt(random, column === 'interest' ? 2 : 1, column === 'left' ? years - 1 : years)
        const row = rows[year - 1]
        const mistakes = column === 'interest'
            ? [cents((capital * rate) / 100), cents((row.debt * rate) / 1000)]
            : column === 'repaid'
                ? [payment, row.interest]
                : [cents(row.debt - payment), row.repaid]
        const right = row[column]
        const values = [right, ...mistakes]
        if (new Set(values).size < 3 || values.some((value) => value <= 0)) continue
        return { capital, rate, payment, rows, year, column, options: shuffle(random, values) }
    }
}

export function createGapRounds(random: Random, level: number): GapRound[] {
    return Array.from({ length: GAPS_ROUNDS }, () => createGapRound(random, level))
}
