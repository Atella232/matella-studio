/* Reading the matrix formulas of the Bachillerato algebra units (matrices, determinants, systems): every
   \begin{pmatrix}…\end{pmatrix} is read as a matrix of numbers and every equality between matrix expressions
   (sums, numbers times matrices, products, powers, transposes and inverses) is worked out, with named matrices
   (A, B, X…) taken from a table the test gives. I is the identity and O the zero matrix of whatever size is
   needed. Shared by the tests of those units (this file is not a test). */

import { evaluate, near } from './latex-math.ts'

export type Grid = number[][]
/** k·I: the identity (or zero, k = 0) of the size the other side needs */
type Scaled = { identity: number }
type Value = number | Grid | Scaled
export type Env = Record<string, Grid>

const isGrid = (value: Value): value is Grid => Array.isArray(value)
const isScaled = (value: Value): value is Scaled => typeof value === 'object' && !Array.isArray(value)
const eye = (size: number, k = 1): Grid => Array.from({ length: size }, (_, i) => Array.from({ length: size }, (_, j) => (i === j ? k : 0)))
const sameSize = (a: Grid, b: Grid) => a.length === b.length && a[0].length === b[0].length

export function multiplyGrids(a: Grid, b: Grid): Grid | null {
    if (a[0].length !== b.length) return null
    return a.map((row) => b[0].map((_, j) => row.reduce((sum, value, k) => sum + value * b[k][j], 0)))
}

export function inverseGrid(matrix: Grid): Grid | null {
    const size = matrix.length
    if (matrix[0].length !== size) return null
    const work = matrix.map((row, i) => [...row, ...eye(size)[i]])
    for (let column = 0; column < size; column++) {
        let pivot = column
        for (let r = column + 1; r < size; r++) if (Math.abs(work[r][column]) > Math.abs(work[pivot][column])) pivot = r
        if (Math.abs(work[pivot][column]) < 1e-12) return null
        ;[work[column], work[pivot]] = [work[pivot], work[column]]
        const p = work[column][column]
        work[column] = work[column].map((value) => value / p)
        for (let r = 0; r < size; r++) {
            if (r === column) continue
            const factor = work[r][column]
            work[r] = work[r].map((value, j) => value - factor * work[column][j])
        }
    }
    return work.map((row) => row.slice(size))
}

export const gridsEqual = (a: Grid, b: Grid) => sameSize(a, b) && a.every((row, i) => row.every((value, j) => near(value, b[i][j]) || Math.abs(value - b[i][j]) < 1e-9))

/* ---------- Operations on values ---------- */

function add(a: Value, b: Value, sign: 1 | -1): Value | null {
    if (typeof a === 'number' && typeof b === 'number') return a + sign * b
    if (isGrid(a) && isGrid(b)) return sameSize(a, b) ? a.map((row, i) => row.map((value, j) => value + sign * b[i][j])) : null
    if (isGrid(a) && isScaled(b)) return a.length === a[0].length ? add(a, eye(a.length, b.identity), sign) : null
    if (isScaled(a) && isGrid(b)) return b.length === b[0].length ? add(eye(b.length, a.identity), b, sign) : null
    if (isScaled(a) && isScaled(b)) return { identity: a.identity + sign * b.identity }
    return null
}

function times(a: Value, b: Value): Value | null {
    if (typeof a === 'number' && typeof b === 'number') return a * b
    if (typeof a === 'number') return isGrid(b) ? b.map((row) => row.map((value) => a * value)) : { identity: a * (b as Scaled).identity }
    if (typeof b === 'number') return times(b, a)
    if (isGrid(a) && isGrid(b)) return multiplyGrids(a, b)
    if (isScaled(a) && isScaled(b)) return { identity: a.identity * b.identity }
    if (isScaled(a)) return times(a.identity, b)
    return times((b as Scaled).identity, a)
}

function raise(base: Value, exponent: string): Value | null {
    if (exponent === 't') return isGrid(base) ? base[0].map((_, j) => base.map((row) => row[j])) : base
    if (exponent === '-1') {
        if (typeof base === 'number') return base === 0 ? null : 1 / base
        if (isScaled(base)) return base.identity === 0 ? null : { identity: 1 / base.identity }
        return inverseGrid(base)
    }
    if (!/^\d+$/.test(exponent)) return null
    const power = Number(exponent)
    if (typeof base === 'number') return base ** power
    if (isScaled(base)) return { identity: base.identity ** power }
    if (base.length !== base[0].length) return null
    let result: Grid = eye(base.length)
    let square = base
    for (let rest = power; rest > 0; rest = Math.floor(rest / 2)) {
        if (rest % 2) result = multiplyGrids(result, square)!
        square = multiplyGrids(square, square)!
    }
    return result
}

/* ---------- Reading a formula ---------- */

/** The matrices written in a formula, each replaced by ⟦n⟧; a matrix with a cell that is not a number is null */
function literals(formula: string): { text: string; matrices: Array<Grid | null> } {
    const matrices: Array<Grid | null> = []
    const text = formula.replace(/\\begin\{pmatrix\}([\s\S]*?)\\end\{pmatrix\}/g, (_, body: string) => {
        const rows = body.split(/\\\\/).map((row) => row.split('&').map((cell) => evaluate(cell.trim())))
        const ok = rows.every((row) => row.every((value) => value !== null)) && rows.every((row) => row.length === rows[0].length)
        matrices.push(ok ? (rows as Grid) : null)
        return `⟦${matrices.length - 1}⟧`
    })
    return { text, matrices }
}

type Token = { kind: 'value'; value: Value | null } | { kind: 'op'; op: string } | { kind: 'power'; exponent: string }

/** Tokens of one side; null when it holds something this reader does not know */
function tokens(side: string, matrices: Array<Grid | null>, env: Env): Token[] | null {
    const found: Token[] = []
    let rest = side.replace(/\\left|\\right|\\,|\\ /g, ' ').trim()
    while (rest.length) {
        let match: RegExpMatchArray | null
        if ((match = rest.match(/^\s+/))) { rest = rest.slice(match[0].length); continue }
        if ((match = rest.match(/^⟦(\d+)⟧/))) found.push({ kind: 'value', value: matrices[Number(match[1])] })
        else if ((match = rest.match(/^\\frac\{(\d+)\}\{(\d+)\}/))) found.push({ kind: 'value', value: Number(match[1]) / Number(match[2]) })
        else if ((match = rest.match(/^\d+(?:\{,\}\d+)?/))) found.push({ kind: 'value', value: Number(match[0].replace('{,}', '.')) })
        else if ((match = rest.match(/^[A-Z](?![a-zA-Z])/))) {
            const name = match[0]
            if (name === 'I') found.push({ kind: 'value', value: { identity: 1 } })
            else if (name === 'O') found.push({ kind: 'value', value: { identity: 0 } })
            else if (name in env) found.push({ kind: 'value', value: env[name] })
            else return null
        } else if ((match = rest.match(/^\^\{?(t|-1|\d+)\}?/))) found.push({ kind: 'power', exponent: match[1] })
        else if ((match = rest.match(/^(\+|-|\\cdot|\(|\))/))) found.push({ kind: 'op', op: match[1] })
        else return null
        rest = rest.slice(match[0].length)
    }
    return found
}

/** Sum of products, with signs, brackets and powers; null when it cannot be worked out */
function parse(list: Token[]): Value | null {
    let index = 0
    const peek = () => list[index]
    const atom = (): Value | null => {
        const token = peek()
        if (!token) return null
        let value: Value | null
        if (token.kind === 'op' && token.op === '(') {
            index++
            value = sum()
            const close = peek()
            if (!close || close.kind !== 'op' || close.op !== ')') return null
            index++
        } else if (token.kind === 'value') {
            index++
            value = token.value
        } else return null
        while (value !== null && peek()?.kind === 'power') value = raise(value, (list[index++] as { exponent: string }).exponent)
        return value
    }
    const product = (): Value | null => {
        let value = atom()
        while (value !== null) {
            const token = peek()
            if (!token) break
            if (token.kind === 'op' && token.op === '\\cdot') index++
            else if (!(token.kind === 'value' || (token.kind === 'op' && token.op === '('))) break
            const next = atom()
            value = next === null ? null : times(value, next)
        }
        return value
    }
    const sum = (): Value | null => {
        let sign: 1 | -1 = 1
        const first = peek()
        if (first?.kind === 'op' && (first.op === '-' || first.op === '+')) {
            sign = first.op === '-' ? -1 : 1
            index++
        }
        let value = product()
        if (value !== null && sign === -1) value = times(-1, value)
        while (value !== null) {
            const token = peek()
            if (!token || token.kind !== 'op' || (token.op !== '+' && token.op !== '-')) break
            index++
            const next = product()
            value = next === null ? null : add(value, next, token.op === '+' ? 1 : -1)
        }
        return value
    }
    const value = sum()
    return index === list.length ? value : null
}

function same(a: Value, b: Value): boolean | null {
    if (typeof a === 'number' && typeof b === 'number') return near(a, b)
    if (isGrid(a) && isGrid(b)) return gridsEqual(a, b)
    if (isGrid(a) && isScaled(b)) return a.length === a[0].length ? gridsEqual(a, eye(a.length, b.identity)) : false
    if (isScaled(a) && isGrid(b)) return same(b, a)
    if (isScaled(a) && isScaled(b)) return near(a.identity, b.identity)
    return null
}

/** One relation read in a formula */
export interface Relation { left: string; right: string; relation: '=' | '\\neq'; holds: boolean }

/**
 * Every equality (=) and inequality (\neq) between two sides that can be worked out, in the formulas of a text.
 * A formula is cut where it starts something new (\qquad, \quad, \to, a comma and a space, the rows of cases).
 */
export function matrixRelations(text: string, env: Env = {}): Relation[] {
    const found: Relation[] = []
    for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) {
        const { text: plain, matrices } = literals(formula)
        const pieces = plain
            .replace(/\\begin\{cases\}|\\end\{cases\}/g, '\\\\')
            .split(/\\qquad|\\quad|\\Rightarrow|\\to|,\\ |\\\\|;/)
        for (const piece of pieces) {
            const parts = piece.split(/(=|\\neq)/)
            for (let index = 1; index < parts.length - 1; index += 2) {
                const leftTokens = tokens(parts[index - 1], matrices, env)
                const rightTokens = tokens(parts[index + 1], matrices, env)
                if (!leftTokens || !rightTokens || !leftTokens.length || !rightTokens.length) continue
                const left = parse(leftTokens)
                const right = parse(rightTokens)
                if (left === null || right === null) continue
                // A side that is a bare number next to a matrix is a label, not a value (c_{11}=1⋯=7 is read as numbers)
                const equal = same(left, right)
                if (equal === null) continue
                const relation = parts[index] as '=' | '\\neq'
                found.push({ left: parts[index - 1].trim(), right: parts[index + 1].trim(), relation, holds: relation === '=' ? equal : !equal })
            }
        }
    }
    return found
}

/** The matrices written in a text, read as numbers (null when a cell has a letter) */
export function matricesIn(text: string): Array<Grid | null> {
    return [...text.matchAll(/\$([^$]+)\$/g)].flatMap(([, formula]) => literals(formula).matrices)
}
