import { add, divide, fraction, multiply, subtract, toLatex, type FractionValue } from '../../features/unit-v2/math/fraction.ts'
import { toMatrix, transpose, type Matrix } from '../batx2-zientziak-matrizeak/matrix.ts'

/* ==========================================================================
   Determinanteak · Batxilergoa 2 · Zientziak — determinants with exact
   fractions: by Sarrus, by expanding along a row or column, minors and
   cofactors, the adjugate and the inverse with it, the rank by minors.
   Exported for Sistemas (Cramer, Rouché) and for 2.º Ciencias Sociales;
   builds on the matrix logic of Matrizeak. No React here.
   ========================================================================== */

export type { Matrix }
const F = (value: number | FractionValue): FractionValue => (typeof value === 'number' ? fraction(value) : value)
const ZERO = fraction(0)

/** The matrix without row i and column j */
export const without = (matrix: Matrix, row: number, column: number): Matrix =>
    matrix.filter((_, i) => i !== row).map((cells) => cells.filter((_, j) => j !== column))

/** The determinant of a square matrix, by expanding along the first row */
export function det(input: Matrix | number[][]): FractionValue {
    const matrix = (input as Array<Array<number | FractionValue>>).map((row) => row.map(F))
    const size = matrix.length
    if (size === 0) return fraction(1)
    if (matrix.some((row) => row.length !== size)) throw new Error('det: not square')
    if (size === 1) return matrix[0][0]
    if (size === 2) return subtract(multiply(matrix[0][0], matrix[1][1]), multiply(matrix[0][1], matrix[1][0]))
    return matrix[0].reduce((sum, value, j) => add(sum, multiply(value, cofactor(matrix, 0, j))), ZERO)
}

/** The minor of an entry: the determinant without its row and column */
export const minor = (matrix: Matrix | number[][], row: number, column: number) => det(without((matrix as Array<Array<number | FractionValue>>).map((cells) => cells.map(F)), row, column))

/** The sign of the cofactor of (i, j): + where i + j is even */
export const cofactorSign = (row: number, column: number) => ((row + column) % 2 === 0 ? 1 : -1)

/** The cofactor (adjunto): (−1)^(i+j) times the minor */
export function cofactor(matrix: Matrix | number[][], row: number, column: number): FractionValue {
    const value = minor(matrix, row, column)
    return cofactorSign(row, column) === 1 ? value : fraction(-value.numerator, value.denominator)
}

/** The matrix of cofactors (Adj A, as Santillana and Anaya call it) */
export function cofactorMatrix(matrix: Matrix | number[][]): Matrix {
    const size = matrix.length
    return Array.from({ length: size }, (_, i) => Array.from({ length: size }, (__, j) => cofactor(matrix, i, j)))
}

/** The inverse by cofactors: (1/|A|)·(Adj A)ᵗ, or null when |A| = 0 */
export function inverseByCofactors(input: Matrix | number[][]): Matrix | null {
    const matrix = (input as Array<Array<number | FractionValue>>).map((row) => row.map(F))
    const d = det(matrix)
    if (d.numerator === 0) return null
    return transpose(cofactorMatrix(matrix)).map((row) => row.map((value) => divide(value, d)))
}

/** Expanding along a row or a column: the terms entry × cofactor that add up to the determinant */
export function expansionTerms(matrix: Matrix | number[][], line: { kind: 'row' | 'column'; index: number }): Array<{ row: number; column: number; entry: FractionValue; cofactor: FractionValue }> {
    const exact = (matrix as Array<Array<number | FractionValue>>).map((row) => row.map(F))
    return exact.map((_, k) => {
        const row = line.kind === 'row' ? line.index : k
        const column = line.kind === 'row' ? k : line.index
        return { row, column, entry: exact[row][column], cofactor: cofactor(exact, row, column) }
    })
}

/** Sarrus for a 3 × 3: the three products that add and the three that subtract */
export function sarrusTerms(input: number[][]): { plus: number[]; minus: number[] } {
    const m = input
    return {
        plus: [m[0][0] * m[1][1] * m[2][2], m[0][1] * m[1][2] * m[2][0], m[0][2] * m[1][0] * m[2][1]],
        minus: [m[0][2] * m[1][1] * m[2][0], m[0][0] * m[1][2] * m[2][1], m[0][1] * m[1][0] * m[2][2]]
    }
}

/** All the square submatrices of a given order: their rows and columns */
export function minorsOfOrder(rows: number, columns: number, order: number): Array<{ rows: number[]; columns: number[] }> {
    const choose = (n: number, k: number): number[][] => (k === 0 ? [[]] : n < k ? [] : [...choose(n - 1, k - 1).map((set) => [...set, n - 1]), ...choose(n - 1, k)])
    const rowSets = choose(rows, order).map((set) => set.sort((a, b) => a - b))
    const columnSets = choose(columns, order).map((set) => set.sort((a, b) => a - b))
    return rowSets.flatMap((r) => columnSets.map((c) => ({ rows: r, columns: c })))
}

/** The rank as the order of the largest minor that is not 0 */
export function rankByMinors(input: Matrix | number[][]): number {
    const matrix = (input as Array<Array<number | FractionValue>>).map((row) => row.map(F))
    const height = matrix.length
    const width = matrix[0]?.length ?? 0
    for (let order = Math.min(height, width); order > 0; order--) {
        for (const { rows, columns } of minorsOfOrder(height, width, order)) {
            const sub = rows.map((r) => columns.map((c) => matrix[r][c]))
            if (det(sub).numerator !== 0) return order
        }
    }
    return 0
}

/** A determinant written with bars: \begin{vmatrix}…\end{vmatrix} */
export function detLatex(input: Matrix | number[][]): string {
    const matrix = (input as Array<Array<number | FractionValue>>).map((row) => row.map(F))
    return `\\begin{vmatrix}${matrix.map((row) => row.map(toLatex).join('&')).join('\\\\')}\\end{vmatrix}`
}

export { toMatrix }
