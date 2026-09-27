import { randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { Stars } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Piramidea: every brick is the sum (or the product) of the two bricks under
   it. Some bricks are hidden; the visible ones always determine the rest, so
   each pyramid can be solved step by step, adding or subtracting.
   ========================================================================== */

export const PYRAMIDS_PER_LEVEL = 3

export interface PyramidLevel {
    rows: number
    op: 'sum' | 'product'
    /** Size range of the bottom bricks */
    min: number
    max: number
    /** Whether bottom bricks may be hidden (the student has to subtract or divide) */
    hideBase: boolean
}

export const pyramidLevels: PyramidLevel[] = [
    { rows: 3, op: 'sum', min: 1, max: 9, hideBase: false },
    { rows: 4, op: 'sum', min: 1, max: 9, hideBase: true },
    { rows: 3, op: 'product', min: 1, max: 4, hideBase: true }
]

/** Bricks row by row, from the top (row 0, one brick) to the base */
export type PyramidValues = number[][]

export interface Pyramid {
    values: PyramidValues
    /** Same shape: true when the brick is shown */
    given: boolean[][]
}

const combine = (op: PyramidLevel['op'], left: number, right: number) => (op === 'sum' ? left + right : left * right)

export function buildPyramid(base: number[], op: PyramidLevel['op']): PyramidValues {
    const rows: PyramidValues = [base]
    while (rows[0].length > 1) {
        const below = rows[0]
        rows.unshift(below.slice(1).map((value, index) => combine(op, below[index], value)))
    }
    return rows
}

/**
 * Whether the shown bricks determine every hidden one by repeated local steps:
 * both bricks below known → the one above; the one above and one below known →
 * the other one below (for products, only when the known one below is not 0).
 */
export function isSolvable(values: PyramidValues, given: boolean[][], op: PyramidLevel['op']): boolean {
    const known = given.map((row) => [...row])
    let changed = true
    while (changed) {
        changed = false
        for (let row = 0; row < values.length - 1; row += 1) {
            for (let index = 0; index <= row; index += 1) {
                const top = known[row][index]
                const left = known[row + 1][index]
                const right = known[row + 1][index + 1]
                if (!top && left && right) { known[row][index] = true; changed = true }
                if (top && left && !right && (op === 'sum' || values[row + 1][index] !== 0)) { known[row + 1][index + 1] = true; changed = true }
                if (top && !left && right && (op === 'sum' || values[row + 1][index + 1] !== 0)) { known[row + 1][index] = true; changed = true }
            }
        }
    }
    return known.every((row) => row.every(Boolean))
}

function nonZero(random: Random, min: number, max: number): number {
    const size = randomInt(random, min, max)
    return random() < 0.5 ? -size : size
}

export function createPyramid(random: Random, levelIndex: number, levels: PyramidLevel[] = pyramidLevels): Pyramid {
    const level = levels[levelIndex]
    for (let attempt = 0; attempt < 500; attempt += 1) {
        const base = Array.from({ length: level.rows }, () => nonZero(random, level.min, level.max))
        // Both signs in every pyramid, so it is really about integers
        if (!base.some((value) => value < 0) || !base.some((value) => value > 0)) continue
        const values = buildPyramid(base, level.op)
        const cells = values.flatMap((row, rowIndex) => row.map((_value, index) => [rowIndex, index] as const))
        const shownCount = level.rows
        const candidates = level.hideBase ? shuffle(random, cells) : cells.filter(([row]) => row === level.rows - 1)
        const shown = candidates.slice(0, shownCount)
        // With hidden base bricks, at least one of them must really be hidden
        if (level.hideBase && shown.filter(([row]) => row === level.rows - 1).length === level.rows) continue
        const given = values.map((row, rowIndex) => row.map((_value, index) => shown.some(([r, i]) => r === rowIndex && i === index)))
        if (isSolvable(values, given, level.op)) return { values, given }
    }
    throw new Error('Could not build a solvable pyramid')
}

/** Cells whose typed value is wrong; empty inputs count as wrong */
export function wrongCells(pyramid: Pyramid, answers: Record<string, number | null>): string[] {
    const wrong: string[] = []
    pyramid.values.forEach((row, rowIndex) => row.forEach((value, index) => {
        if (pyramid.given[rowIndex][index]) return
        const key = `${rowIndex}-${index}`
        if (answers[key] !== value) wrong.push(key)
    }))
    return wrong
}

export function pyramidStars(mistakes: number): Stars {
    if (mistakes === 0) return 3
    if (mistakes <= 2) return 2
    return 1
}
