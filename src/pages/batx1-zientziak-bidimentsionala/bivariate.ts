/* ==========================================================================
   Estatistika bidimentsionala · Batxilergoa 1 · Zientziak — the statistics
   of pairs, shared by the figures, the content, the laboratory, the games
   and the tests: means, variances, covariance, r and the two regression
   lines of a list of pairs or of a double-entry table, and the cell that a
   table needs for independence. Plain TypeScript so the node tests can
   load it.
   ========================================================================== */

export type Pair = [number, number]

const sum = (values: number[]) => values.reduce((total, value) => total + value, 0)
export const meanOf = (values: number[]) => sum(values) / values.length

export interface PairStats {
    n: number
    /** x̄ and ȳ: the centre of gravity */
    mx: number
    my: number
    /** σx² and σy² */
    vx: number
    vy: number
    /** σxy = Σxy/N − x̄ȳ */
    cxy: number
    /** r = σxy / (σx σy); 0 when one of the variables does not vary */
    r: number
    /** Slope of the line of y on x, σxy / σx² */
    myx: number
    /** Coefficient of the line of x on y, σxy / σy² */
    mxy: number
}

/** The parameters of a table: a value of X for each row, of Y for each column and the frequency of each cell */
export function tableStats(xs: number[], ys: number[], cells: number[][]): PairStats {
    const n = sum(cells.flat())
    const rows = cells.map((row) => sum(row))
    const columns = ys.map((_, column) => sum(cells.map((row) => row[column])))
    const mx = sum(xs.map((x, i) => x * rows[i])) / n
    const my = sum(ys.map((y, j) => y * columns[j])) / n
    const vx = sum(xs.map((x, i) => x * x * rows[i])) / n - mx * mx
    const vy = sum(ys.map((y, j) => y * y * columns[j])) / n - my * my
    const cxy = sum(cells.flatMap((row, i) => row.map((f, j) => f * xs[i] * ys[j]))) / n - mx * my
    // Rounding: a variance of 1e-15 is a variance of 0
    const clean = (value: number) => (Math.abs(value) < 1e-12 ? 0 : value)
    const [cvx, cvy, ccxy] = [clean(vx), clean(vy), clean(cxy)]
    return {
        n, mx, my, vx: cvx, vy: cvy, cxy: ccxy,
        r: cvx > 0 && cvy > 0 ? ccxy / Math.sqrt(cvx * cvy) : 0,
        myx: cvx > 0 ? ccxy / cvx : 0,
        mxy: cvy > 0 ? ccxy / cvy : 0
    }
}

/** The parameters of a list of pairs (each pair once) */
export function pairStats(pairs: Pair[]): PairStats {
    return tableStats(pairs.map(([x]) => x), pairs.map(([, y]) => y), pairs.map((_, i) => pairs.map((__, j) => (i === j ? 1 : 0))))
}

/** Row and column totals of a double-entry table */
export const rowTotals = (cells: number[][]) => cells.map((row) => sum(row))
export const columnTotals = (cells: number[][]) => cells[0].map((_, column) => sum(cells.map((row) => row[column])))

/** The cell that independence asks for: (row total)·(column total) / N */
export const independentCell = (rowTotal: number, columnTotal: number, total: number) => (rowTotal * columnTotal) / total

/** X and Y are independent when every cell is (row total)·(column total) / N: the rows are proportional */
export function isIndependent(cells: number[][]): boolean {
    const rows = rowTotals(cells)
    const columns = columnTotals(cells)
    const total = sum(rows)
    return total > 0 && cells.every((row, i) => row.every((f, j) => Math.abs(f * total - rows[i] * columns[j]) < 1e-9))
}

/** The line of y on x as y = slope·x + intercept, through (x̄, ȳ) */
export const lineYonX = (stats: PairStats) => ({ slope: stats.myx, intercept: stats.my - stats.myx * stats.mx })
/** The line of x on y as x = slope·y + intercept, through (x̄, ȳ) */
export const lineXonY = (stats: PairStats) => ({ slope: stats.mxy, intercept: stats.mx - stats.mxy * stats.my })

/** The products (x − x̄)(y − ȳ) of each pair: the signed areas of the quadrants */
export function deviationProducts(pairs: Pair[]): number[] {
    const { mx, my } = pairStats(pairs)
    // + 0 turns −0 into 0
    return pairs.map(([x, y]) => (x - mx) * (y - my) + 0)
}

/** Two regression lines y = a·x + b (y on x) and x = c·y + d (x on y) are possible together only with a·c in [0, 1] */
export const possibleLines = (slopeYonX: number, coefficientXonY: number) => slopeYonX * coefficientXonY >= 0 && slopeYonX * coefficientXonY <= 1 + 1e-12 && (slopeYonX !== 0) === (coefficientXonY !== 0)

/** Where the two lines y = a·x + b and x = c·y + d cross: the centre of gravity (x̄, ȳ) */
export function crossing(a: number, b: number, c: number, d: number): Pair | null {
    // x = c(a x + b) + d → x (1 − c a) = c b + d
    const det = 1 - c * a
    if (Math.abs(det) < 1e-12) return null
    const x = (c * b + d) / det
    return [x, a * x + b]
}
