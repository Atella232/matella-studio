import { mean, total, type FrequencyRow } from '../dbh4-aplikatuak-estatistika/stats.ts'

/* ==========================================================================
   Estatistika · 4. DBH akademikoak — the pure statistics this unit adds to
   the 4. DBH aplikatuak ones: proportional allocation of a stratified
   sample, the mean of joined groups, the mean deviation, the median of a
   frequency table and the class marks of intervals. Plain TypeScript so
   the node tests can load it.
   ========================================================================== */

/** Stratified sampling with proportional allocation: n · Nᵢ / N for each stratum */
export const allocate = (sizes: number[], sample: number) => {
    const all = sizes.reduce((sum, size) => sum + size, 0)
    return sizes.map((size) => (sample * size) / all)
}

/** The mean of several groups joined: Σ nᵢ·x̄ᵢ / Σ nᵢ */
export const joinedMean = (groups: Array<{ students: number; mean: number }>) =>
    groups.reduce((sum, group) => sum + group.students * group.mean, 0) / groups.reduce((sum, group) => sum + group.students, 0)

/** Mean deviation: Σ |xᵢ − x̄| / N */
export const meanDeviation = (data: number[]) => {
    const average = mean(data)
    return data.reduce((sum, value) => sum + Math.abs(value - average), 0) / data.length
}

/** The same on a frequency table: Σ fᵢ·|xᵢ − x̄| / N */
export const tableMeanDeviation = (rows: FrequencyRow[]) => {
    const average = rows.reduce((sum, row) => sum + row.value * row.count, 0) / total(rows)
    return rows.reduce((sum, row) => sum + row.count * Math.abs(row.value - average), 0) / total(rows)
}

/** Median of a frequency table: the datum in the middle (mean of the two central data when N is even) */
export const tableMedian = (rows: FrequencyRow[]) => {
    const n = total(rows)
    const datum = (k: number) => {
        let cumulative = 0
        for (const row of rows) {
            cumulative += row.count
            if (k <= cumulative) return row.value
        }
        return rows[rows.length - 1].value
    }
    return n % 2 === 1 ? datum((n + 1) / 2) : (datum(n / 2) + datum(n / 2 + 1)) / 2
}

/** Intervals as a table of class marks */
export const markRows = (intervals: Array<{ from: number; to: number; count: number }>): FrequencyRow[] =>
    intervals.map((row) => ({ value: (row.from + row.to) / 2, count: row.count }))
