import { add as addF, divide, equals as equalsF, fraction, multiply as multiplyF, subtract as subtractF, toLatex, type FractionValue } from '../../features/unit-v2/math/fraction.ts'

/* ==========================================================================
   Matrizeak · Batxilergoa 2 · Zientziak — the pure matrix logic shared by
   the lessons, the lab, the games and the tests, and exported for the next
   units of the block (Determinantes, Sistemas) and for 2.º Ciencias
   Sociales. Entries are exact fractions (FractionValue): an inverse has
   halves and eighths. Rows are written E₁, E₂… in every language, as in
   the Gauss unit of 1.º Bachillerato. No React here.
   ========================================================================== */

export type Fraction = FractionValue
/** A matrix of exact fractions, row by row */
export type Matrix = Fraction[][]

const F = (value: number | Fraction): Fraction => (typeof value === 'number' ? fraction(value) : value)
const ZERO = fraction(0)
const ONE = fraction(1)
export const isZero = (value: Fraction) => value.numerator === 0

/** A matrix from whole numbers (or fractions): [[1, 2], [3, 4]] */
export const toMatrix = (rows: Array<Array<number | Fraction>>): Matrix => rows.map((row) => row.map(F))
/** Whole numbers back, for the tests and the drawings (fractions become decimals) */
export const toNumbers = (matrix: Matrix): number[][] => matrix.map((row) => row.map((value) => value.numerator / value.denominator))

export const rows = (matrix: Matrix) => matrix.length
export const columns = (matrix: Matrix) => matrix[0]?.length ?? 0
export const sameSize = (a: Matrix, b: Matrix) => rows(a) === rows(b) && columns(a) === columns(b)
export const isSquare = (matrix: Matrix) => rows(matrix) === columns(matrix)

export const identity = (size: number): Matrix => Array.from({ length: size }, (_, i) => Array.from({ length: size }, (_, j) => (i === j ? ONE : ZERO)))
export const zeros = (height: number, width: number): Matrix => Array.from({ length: height }, () => Array.from({ length: width }, () => ZERO))
export const copy = (matrix: Matrix): Matrix => matrix.map((row) => [...row])

export function equal(a: Matrix, b: Matrix): boolean {
    return sameSize(a, b) && a.every((row, i) => row.every((value, j) => equalsF(value, b[i][j])))
}

export function add(a: Matrix, b: Matrix): Matrix {
    if (!sameSize(a, b)) throw new Error('add: different sizes')
    return a.map((row, i) => row.map((value, j) => addF(value, b[i][j])))
}

export function subtract(a: Matrix, b: Matrix): Matrix {
    if (!sameSize(a, b)) throw new Error('subtract: different sizes')
    return a.map((row, i) => row.map((value, j) => subtractF(value, b[i][j])))
}

export const scale = (k: number | Fraction, matrix: Matrix): Matrix => matrix.map((row) => row.map((value) => multiplyF(F(k), value)))

/** Whether A·B can be done: the columns of A are as many as the rows of B */
export const canMultiply = (a: Matrix, b: Matrix) => columns(a) === rows(b)

/** The entry (i, j) of A·B: row i of A by column j of B */
export function productEntry(a: Matrix, b: Matrix, i: number, j: number): Fraction {
    return a[i].reduce((sum, value, k) => addF(sum, multiplyF(value, b[k][j])), ZERO)
}

export function multiply(a: Matrix, b: Matrix): Matrix {
    if (!canMultiply(a, b)) throw new Error('multiply: the inner sizes differ')
    return a.map((_, i) => b[0].map((__, j) => productEntry(a, b, i, j)))
}

export const transpose = (matrix: Matrix): Matrix => matrix[0].map((_, j) => matrix.map((row) => row[j]))

/** Aⁿ for n ≥ 0 (A⁰ = I) */
export function power(matrix: Matrix, exponent: number): Matrix {
    if (!isSquare(matrix)) throw new Error('power: not square')
    let result = identity(rows(matrix))
    for (let step = 0; step < exponent; step++) result = multiply(result, matrix)
    return result
}

/* ---------- Kinds of matrices ---------- */

export const isZeroMatrix = (matrix: Matrix) => matrix.every((row) => row.every(isZero))
export const isSymmetric = (matrix: Matrix) => isSquare(matrix) && equal(matrix, transpose(matrix))
export const isAntisymmetric = (matrix: Matrix) => isSquare(matrix) && equal(transpose(matrix), scale(-1, matrix))
export const isUpperTriangular = (matrix: Matrix) => isSquare(matrix) && matrix.every((row, i) => row.every((value, j) => j >= i || isZero(value)))
export const isLowerTriangular = (matrix: Matrix) => isSquare(matrix) && matrix.every((row, i) => row.every((value, j) => j <= i || isZero(value)))
export const isDiagonal = (matrix: Matrix) => isUpperTriangular(matrix) && isLowerTriangular(matrix)
export const isScalar = (matrix: Matrix) => isDiagonal(matrix) && matrix.every((row, i) => equalsF(row[i], matrix[0][0]))
export const isIdentity = (matrix: Matrix) => isSquare(matrix) && equal(matrix, identity(rows(matrix)))

/* ---------- Row operations (Gauss) ---------- */

/** One row operation: Eᵢ ↔ Eⱼ, Eᵢ → k·Eᵢ, or Eᵢ → m·Eᵢ + k·Eⱼ (m = 1 when it is left out) */
export type RowOperation =
    | { kind: 'swap'; target: number; source: number }
    | { kind: 'scale'; target: number; factor: Fraction }
    | { kind: 'combine'; target: number; source: number; factor: Fraction; keep?: Fraction }

export function applyOperation(matrix: Matrix, operation: RowOperation): Matrix {
    const next = copy(matrix)
    if (operation.kind === 'swap') {
        next[operation.target] = matrix[operation.source]
        next[operation.source] = matrix[operation.target]
    } else if (operation.kind === 'scale') {
        next[operation.target] = matrix[operation.target].map((value) => multiplyF(operation.factor, value))
    } else {
        const keep = operation.keep ?? ONE
        next[operation.target] = matrix[operation.target].map((value, j) => addF(multiplyF(keep, value), multiplyF(operation.factor, matrix[operation.source][j])))
    }
    return next
}

/** The LaTeX of an operation: E_2-3E_1, \frac{1}{2}E_1, E_1\leftrightarrow E_2, 2E_3+E_1 (rows counted from 1) */
export function operationLatex(operation: RowOperation): string {
    const row = (index: number) => `E_${index + 1}`
    const times = (value: Fraction) => (equalsF(value, ONE) ? '' : equalsF(value, fraction(-1)) ? '-' : toLatex(value))
    if (operation.kind === 'swap') return `${row(operation.target)}\\leftrightarrow ${row(operation.source)}`
    if (operation.kind === 'scale') return `${times(operation.factor)}${row(operation.target)}`
    const keep = operation.keep ?? ONE
    const factor = operation.factor
    const sign = factor.numerator < 0 ? '-' : '+'
    const size = fraction(Math.abs(factor.numerator), factor.denominator)
    return `${times(keep)}${row(operation.target)}${sign}${equalsF(size, ONE) ? '' : toLatex(size)}${row(operation.source)}`
}

/**
 * The operations that make a matrix triangular (zeros under each pivot), with the matrix after each one.
 * Only the first `width` columns are looked at (the left part of (A | I) or of an augmented matrix).
 */
export function echelonSteps(start: Matrix, width = columns(start)): Array<{ operation: RowOperation; matrix: Matrix }> {
    const steps: Array<{ operation: RowOperation; matrix: Matrix }> = []
    let matrix = copy(start)
    let pivotRow = 0
    for (let column = 0; column < width && pivotRow < rows(matrix); column++) {
        let found = -1
        for (let r = pivotRow; r < rows(matrix); r++) if (!isZero(matrix[r][column])) { found = r; break }
        if (found < 0) continue
        if (found !== pivotRow) {
            const operation: RowOperation = { kind: 'swap', target: pivotRow, source: found }
            matrix = applyOperation(matrix, operation)
            steps.push({ operation, matrix })
        }
        for (let r = pivotRow + 1; r < rows(matrix); r++) {
            if (isZero(matrix[r][column])) continue
            const factor = divide(matrix[r][column], matrix[pivotRow][column])
            const operation: RowOperation = { kind: 'combine', target: r, source: pivotRow, factor: fraction(-factor.numerator, factor.denominator) }
            matrix = applyOperation(matrix, operation)
            steps.push({ operation, matrix })
        }
        pivotRow++
    }
    return steps
}

/** The triangular (echelon) form that echelonSteps reaches */
export function echelon(matrix: Matrix, width = columns(matrix)): Matrix {
    const steps = echelonSteps(matrix, width)
    return steps.length ? steps[steps.length - 1].matrix : copy(matrix)
}

/** The rank: rows that are not all zeros once the matrix is triangular */
export function rank(matrix: Matrix): number {
    return echelon(matrix).filter((row) => row.some((value) => !isZero(value))).length
}

/** (A | B) side by side */
export const besides = (a: Matrix, b: Matrix): Matrix => a.map((row, i) => [...row, ...b[i]])

/**
 * Gauss–Jordan on (A | I): zeros under the diagonal, then above, then each row divided by its pivot.
 * Returns every step, and the inverse (null when a row of zeros appears on the left: no inverse).
 */
export function gaussJordan(matrix: Matrix): { steps: Array<{ operation: RowOperation; matrix: Matrix }>; inverse: Matrix | null } {
    const size = rows(matrix)
    if (!isSquare(matrix)) return { steps: [], inverse: null }
    const steps = echelonSteps(besides(matrix, identity(size)), size)
    let current = steps.length ? steps[steps.length - 1].matrix : besides(matrix, identity(size))
    for (let r = 0; r < size; r++) if (isZero(current[r][r])) return { steps, inverse: null }
    for (let column = size - 1; column > 0; column--) {
        for (let r = column - 1; r >= 0; r--) {
            if (isZero(current[r][column])) continue
            const factor = divide(current[r][column], current[column][column])
            const operation: RowOperation = { kind: 'combine', target: r, source: column, factor: fraction(-factor.numerator, factor.denominator) }
            current = applyOperation(current, operation)
            steps.push({ operation, matrix: current })
        }
    }
    for (let r = 0; r < size; r++) {
        if (equalsF(current[r][r], ONE)) continue
        const operation: RowOperation = { kind: 'scale', target: r, factor: divide(ONE, current[r][r]) }
        current = applyOperation(current, operation)
        steps.push({ operation, matrix: current })
    }
    return { steps, inverse: current.map((row) => row.slice(size)) }
}

export const inverse = (matrix: Matrix): Matrix | null => gaussJordan(matrix).inverse

/* ---------- LaTeX ---------- */

/** An entry as LaTeX: 3, -2, \frac{1}{2}, -\frac{3}{4} */
export const entryLatex = (value: Fraction) => toLatex(value)

/** A matrix between round brackets: \begin{pmatrix}1&2\\3&4\end{pmatrix} */
export function matrixLatex(matrix: Matrix | number[][]): string {
    const exact = (matrix as Array<Array<number | Fraction>>).map((row) => row.map(F))
    return `\\begin{pmatrix}${exact.map((row) => row.map(entryLatex).join('&')).join('\\\\')}\\end{pmatrix}`
}

/** (A | B) with a bar: \left(\begin{array}{cc|cc}…\end{array}\right) */
export function augmentedLatex(left: Matrix | number[][], right: Matrix | number[][]): string {
    const exact = (matrix: Matrix | number[][]) => (matrix as Array<Array<number | Fraction>>).map((row) => row.map(F))
    const a = exact(left)
    const b = exact(right)
    const spec = `${'c'.repeat(columns(a))}|${'c'.repeat(columns(b))}`
    return `\\left(\\begin{array}{${spec}}${a.map((row, i) => [...row, ...b[i]].map(entryLatex).join('&')).join('\\\\')}\\end{array}\\right)`
}

/** m × n as LaTeX */
export const sizeLatex = (matrix: Matrix) => `${rows(matrix)}\\times ${columns(matrix)}`

/** A plain-text entry for drawings: −2, 1/2 (with a true minus sign) */
export function entryText(value: Fraction): string {
    const sign = value.numerator < 0 ? '−' : ''
    const size = Math.abs(value.numerator)
    return value.denominator === 1 ? `${sign}${size}` : `${sign}${size}/${value.denominator}`
}
