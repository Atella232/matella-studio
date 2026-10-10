/* ==========================================================================
   Estatistika eta probabilitatea · 4. DBH aplikatuak — pure statistics
   shared by the lessons, the content, the laboratory and the games: mean,
   variance and standard deviation of a frequency table, coefficient of
   variation, percentiles with the textbook rule, box-plot fences, and the
   correlation and regression line of a cloud of points. Plain TypeScript
   so the node tests can load it.
   ========================================================================== */

/** A frequency table: each value with its absolute frequency */
export type FrequencyRow = { value: number; count: number }
export type Pair = [number, number]

export const total = (rows: FrequencyRow[]) => rows.reduce((sum, row) => sum + row.count, 0)

/** Mean: Σ xᵢ·fᵢ / N */
export const tableMean = (rows: FrequencyRow[]) => rows.reduce((sum, row) => sum + row.value * row.count, 0) / total(rows)

/** Variance: Σ fᵢ·xᵢ² / N − x̄² (the same as Σ fᵢ·(xᵢ − x̄)² / N) */
export function tableVariance(rows: FrequencyRow[]) {
    const mean = tableMean(rows)
    return rows.reduce((sum, row) => sum + row.count * (row.value - mean) ** 2, 0) / total(rows)
}

export const tableDeviation = (rows: FrequencyRow[]) => Math.sqrt(tableVariance(rows))

/** A list of data as a table with every count 1 */
export const asRows = (data: number[]): FrequencyRow[] => data.map((value) => ({ value, count: 1 }))

export const mean = (data: number[]) => tableMean(asRows(data))
export const variance = (data: number[]) => tableVariance(asRows(data))
export const deviation = (data: number[]) => Math.sqrt(variance(data))

/** Coefficient of variation: σ / x̄ */
export const variation = (sigma: number, average: number) => sigma / average

/**
 * The percentile p of a frequency table (values in increasing order), with
 * the textbook rule: the position N·p/100; if it is a whole number k, the
 * mean of the data k and k + 1; if not, the next datum.
 */
export function tablePercentile(rows: FrequencyRow[], p: number) {
    const n = total(rows)
    const position = (n * p) / 100
    const datum = (k: number) => {
        let cumulative = 0
        for (const row of rows) {
            cumulative += row.count
            if (k <= cumulative) return row.value
        }
        return rows[rows.length - 1].value
    }
    const whole = Math.abs(position - Math.round(position)) < 1e-9
    if (whole) {
        const k = Math.round(position)
        return k >= n ? datum(n) : (datum(k) + datum(k + 1)) / 2
    }
    return datum(Math.ceil(position))
}

/** The same rule on a list of data (sorted first) */
export const percentile = (data: number[], p: number) => tablePercentile(asRows([...data].sort((a, b) => a - b)), p)

/** Q₁, Me, Q₃ */
export const quartiles = (data: number[]) => [percentile(data, 25), percentile(data, 50), percentile(data, 75)] as const

/**
 * Box and whiskers: the box goes from Q₁ to Q₃; the whiskers reach the last
 * data inside Q₁ − 1,5·(Q₃ − Q₁) and Q₃ + 1,5·(Q₃ − Q₁); data beyond are
 * outliers, drawn as stars.
 */
export function boxPlot(data: number[]) {
    const [q1, median, q3] = quartiles(data)
    const reach = 1.5 * (q3 - q1)
    const low = q1 - reach
    const high = q3 + reach
    const inside = data.filter((value) => value >= low && value <= high)
    return {
        q1,
        median,
        q3,
        low,
        high,
        min: Math.min(...inside),
        max: Math.max(...inside),
        outliers: data.filter((value) => value < low || value > high).sort((a, b) => a - b)
    }
}

/* ---------- Two variables ---------- */

const pairMean = (points: Pair[], index: 0 | 1) => points.reduce((sum, point) => sum + point[index], 0) / points.length

/** Pearson's correlation coefficient r */
export function correlation(points: Pair[]) {
    const mx = pairMean(points, 0)
    const my = pairMean(points, 1)
    const sxy = points.reduce((sum, [x, y]) => sum + (x - mx) * (y - my), 0)
    const sxx = points.reduce((sum, [x]) => sum + (x - mx) ** 2, 0)
    const syy = points.reduce((sum, [, y]) => sum + (y - my) ** 2, 0)
    return sxy / Math.sqrt(sxx * syy)
}

/** The regression line of y on x, y = slope·x + intercept, through (x̄, ȳ) */
export function regression(points: Pair[]) {
    const mx = pairMean(points, 0)
    const my = pairMean(points, 1)
    const sxy = points.reduce((sum, [x, y]) => sum + (x - mx) * (y - my), 0)
    const sxx = points.reduce((sum, [x]) => sum + (x - mx) ** 2, 0)
    const slope = sxy / sxx
    return { slope, intercept: my - slope * mx, centre: [mx, my] as Pair }
}

/** Correlation in words, from |r| */
export function strength(r: number): 'none' | 'weak' | 'strong' | 'functional' {
    const size = Math.abs(r)
    if (size > 0.999) return 'functional'
    if (size >= 0.7) return 'strong'
    if (size >= 0.3) return 'weak'
    return 'none'
}
