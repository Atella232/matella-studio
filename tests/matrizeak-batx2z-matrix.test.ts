import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import {
    add, applyOperation, augmentedLatex, echelon, echelonSteps, equal, gaussJordan, identity, inverse, isAntisymmetric, isDiagonal, isIdentity,
    isLowerTriangular, isScalar, isSymmetric, isUpperTriangular, matrixLatex, multiply, operationLatex, power, productEntry, rank, scale, subtract,
    toMatrix, toNumbers, transpose, type Matrix
} from '../src/pages/batx2-zientziak-matrizeak/matrix.ts'
import { fraction } from '../src/features/unit-v2/math/fraction.ts'
import { inverseGrid, multiplyGrids } from './matrix-latex.ts'

/* The shared matrix logic of Matrizeak (2.º Bachillerato), which Determinantes, Sistemas and 2.º Ciencias Sociales
   reuse: operations, kinds, Gauss and Gauss–Jordan with exact fractions, and the LaTeX it writes. */

const random = (seed: number, size: number, columns = size, spread = 4): Matrix => {
    const next = createRandom(seed)
    return toMatrix(Array.from({ length: size }, () => Array.from({ length: columns }, () => Math.floor(next() * (2 * spread + 1)) - spread)))
}

test('matrizeak matrix: sums, products, transpose and powers', () => {
    const a = toMatrix([[1, 2, 0], [3, -1, 4]])
    const b = toMatrix([[2, 1], [0, 3], [1, -2]])
    assert.deepEqual(toNumbers(multiply(a, b)), [[2, 7], [10, -8]])
    assert.deepEqual(toNumbers(transpose(a)), [[1, 3], [2, -1], [0, 4]])
    assert.equal(productEntry(a, b, 1, 0).numerator, 10)
    assert.throws(() => multiply(a, a))
    const p = toMatrix([[1, 2], [0, 1]])
    assert.deepEqual(toNumbers(power(p, 5)), [[1, 10], [0, 1]])
    assert.ok(isIdentity(power(p, 0)))
    assert.deepEqual(toNumbers(subtract(scale(2, toMatrix([[1, 3], [0, -2]])), toMatrix([[4, 1], [-3, 5]]))), [[-2, 5], [3, -9]])
    assert.ok(equal(add(a, scale(-1, a)), toMatrix([[0, 0, 0], [0, 0, 0]])))
})

test('matrizeak matrix: kinds of matrices', () => {
    assert.ok(isUpperTriangular(toMatrix([[2, 5], [0, 3]])) && !isLowerTriangular(toMatrix([[2, 5], [0, 3]])))
    assert.ok(isDiagonal(toMatrix([[2, 0], [0, 3]])) && !isScalar(toMatrix([[2, 0], [0, 3]])))
    assert.ok(isScalar(toMatrix([[3, 0], [0, 3]])) && !isIdentity(toMatrix([[3, 0], [0, 3]])))
    assert.ok(isSymmetric(toMatrix([[3, -1, 7], [-1, 0, 2], [7, 2, 5]])))
    assert.ok(isAntisymmetric(toMatrix([[0, 3], [-3, 0]])) && !isAntisymmetric(toMatrix([[2, 3], [-3, 2]])))
})

test('matrizeak matrix: Gauss keeps the rows equivalent and the rank is right', () => {
    assert.equal(rank(toMatrix([[1, 2, 1], [2, 3, 4], [3, 5, 5]])), 2)
    assert.equal(rank(toMatrix([[2, 4], [-3, -6], [1, 2]])), 1)
    assert.equal(rank(toMatrix([[0, 0], [0, 0]])), 0)
    assert.equal(rank(identity(4)), 4)
    for (let seed = 1; seed <= 200; seed++) {
        const size = 2 + (seed % 3)
        const start = random(seed * 7919, size, size + (seed % 2))
        let matrix = start
        for (const step of echelonSteps(start)) {
            matrix = applyOperation(matrix, step.operation)
            assert.ok(equal(matrix, step.matrix), `seed ${seed}`)
            // Never multiplies a row by 0: each step can be undone
            if (step.operation.kind === 'combine') assert.ok((step.operation.keep ?? fraction(1)).numerator !== 0)
        }
        const reduced = echelon(start)
        // Triangular: each row starts later than the one above
        const lead = (row: Matrix[number]) => row.findIndex((value) => value.numerator !== 0)
        for (let r = 1; r < reduced.length; r++) {
            const here = lead(reduced[r])
            if (here >= 0) assert.ok(here > lead(reduced[r - 1]) && lead(reduced[r - 1]) >= 0, `seed ${seed}`)
        }
    }
})

test('matrizeak matrix: Gauss–Jordan gives the inverse, or none when the rank is not full', () => {
    let invertible = 0
    for (let seed = 1; seed <= 300; seed++) {
        const size = 2 + (seed % 2)
        const matrix = random(seed * 104729, size, size, 3)
        const { steps, inverse: found } = gaussJordan(matrix)
        const check = inverseGrid(toNumbers(matrix))
        if (rank(matrix) < size) {
            assert.equal(found, null, `seed ${seed}`)
            continue
        }
        invertible += 1
        assert.ok(found && check, `seed ${seed}`)
        assert.ok(isIdentity(multiply(matrix, found!)) && isIdentity(multiply(found!, matrix)), `seed ${seed}`)
        // The last step leaves (I | A⁻¹)
        const last = steps.length ? steps[steps.length - 1].matrix : null
        if (last) assert.ok(isIdentity(last.map((row) => row.slice(0, size))))
        for (const [i, row] of toNumbers(found!).entries()) for (const [j, value] of row.entries()) assert.ok(Math.abs(value - check![i][j]) < 1e-9)
    }
    assert.ok(invertible > 150, `${invertible}`)
    assert.deepEqual(toNumbers(inverse(toMatrix([[2, 1], [5, 3]]))!), [[3, -1], [-5, 2]])
    assert.deepEqual(toNumbers(inverse(toMatrix([[1, 1, 0], [0, 1, 1], [1, 0, 1]]))!), [[0.5, -0.5, 0.5], [0.5, 0.5, -0.5], [-0.5, 0.5, 0.5]])
    assert.equal(inverse(toMatrix([[1, 3], [2, 6]])), null)
    assert.deepEqual(multiplyGrids([[1, 2]], [[3], [4]]), [[11]])
})

test('matrizeak matrix: the LaTeX it writes renders and reads as written', () => {
    const half = toMatrix([[fraction(1, 2), 0], [fraction(-1, 2), 1]])
    assert.equal(matrixLatex(half), '\\begin{pmatrix}\\frac{1}{2}&0\\\\-\\frac{1}{2}&1\\end{pmatrix}')
    assert.equal(augmentedLatex([[1, 2], [3, 7]], [[1, 0], [0, 1]]), '\\left(\\begin{array}{cc|cc}1&2&1&0\\\\3&7&0&1\\end{array}\\right)')
    assert.equal(operationLatex({ kind: 'combine', target: 1, source: 0, factor: fraction(-3) }), 'E_2-3E_1')
    assert.equal(operationLatex({ kind: 'combine', target: 0, source: 1, factor: fraction(1) }), 'E_1+E_2')
    assert.equal(operationLatex({ kind: 'combine', target: 2, source: 1, factor: fraction(-1), keep: fraction(2) }), '2E_3-E_2')
    assert.equal(operationLatex({ kind: 'scale', target: 0, factor: fraction(1, 2) }), '\\frac{1}{2}E_1')
    assert.equal(operationLatex({ kind: 'swap', target: 0, source: 2 }), 'E_1\\leftrightarrow E_3')
    for (const latex of [matrixLatex(half), augmentedLatex([[1, 2], [3, 7]], [[1, 0], [0, 1]]), operationLatex({ kind: 'swap', target: 0, source: 1 })]) {
        katex.renderToString(latex, { throwOnError: true, strict: 'error' })
    }
})
