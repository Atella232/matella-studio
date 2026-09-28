import { add, compare, equals, fraction, subtract, type FractionValue } from '../math/fraction.ts'
import { pick, shuffle, type Random } from './random.ts'
import type { Stars } from './records.ts'

/* ==========================================================================
   Zatiki-horma: place each brick in a row; a row that adds up to exactly one
   unit is cleared. The sequence is built from exact decompositions of 1, so a
   perfect game always exists.
   ========================================================================== */

export const WALL_ROWS = 4
export const WALL_LIVES = 3
export const WALL_UNITS = 8

export interface WallLevel {
    /** Each family is a set of brick sizes that can tile a unit together */
    families: FractionValue[][]
    /** Show how much is missing in each row (only on the first levels) */
    showMissing: boolean
}

const f = fraction

export const wallLevels: WallLevel[] = [
    { families: [[f(1, 2), f(1, 4), f(1, 8)]], showMissing: true },
    { families: [[f(1, 2), f(1, 3), f(1, 4), f(1, 6), f(1, 12)]], showMissing: true },
    {
        families: [
            [f(2, 3), f(3, 4), f(5, 12), f(1, 2), f(1, 3), f(1, 4), f(1, 6), f(1, 12)],
            [f(1, 2), f(1, 5), f(2, 5), f(3, 10), f(1, 10), f(3, 5)]
        ],
        showMissing: false
    }
]

/** A random exact decomposition of 1 into 2–5 bricks of one family */
export function decomposeUnit(random: Random, family: FractionValue[]): FractionValue[] {
    for (let attempt = 0; attempt < 200; attempt += 1) {
        const bricks: FractionValue[] = []
        let remaining = f(1)
        while (remaining.numerator > 0 && bricks.length < 5) {
            const fitting = family.filter((brick) => compare(brick, remaining) <= 0)
            // Avoid a single brick filling the whole row
            const options = bricks.length === 0 ? fitting.filter((brick) => compare(brick, f(1)) < 0) : fitting
            if (options.length === 0) break
            const brick = pick(random, options)
            bricks.push(brick)
            remaining = subtract(remaining, brick)
        }
        if (remaining.numerator === 0 && bricks.length >= 2) return bricks
    }
    return [f(1, 2), f(1, 2)]
}

export function createWallUnits(random: Random, levelIndex: number, levels: WallLevel[] = wallLevels): FractionValue[][] {
    const level = levels[levelIndex]
    return Array.from({ length: WALL_UNITS }, () => decomposeUnit(random, pick(random, level.families)))
}

/**
 * Units are dealt two at a time with their bricks shuffled together, so two
 * rows are always enough for a perfect game (each brick goes back to its own
 * unit) while the other two rows give room to plan ahead.
 */
export function dealWallUnits(random: Random, units: FractionValue[][]): FractionValue[] {
    const sequence: FractionValue[] = []
    for (let index = 0; index < units.length; index += 2) {
        sequence.push(...shuffle(random, [...units[index], ...(units[index + 1] ?? [])]))
    }
    return sequence
}

export function createWallSequence(random: Random, levelIndex: number): FractionValue[] {
    return dealWallUnits(random, createWallUnits(random, levelIndex))
}

export interface WallState {
    rows: FractionValue[][]
    next: number
    lives: number
    cleared: number
    discarded: number
}

export function initialWallGame(): WallState {
    return { rows: Array.from({ length: WALL_ROWS }, () => []), next: 0, lives: WALL_LIVES, cleared: 0, discarded: 0 }
}

export function rowTotal(row: FractionValue[]): FractionValue {
    return row.reduce((total, brick) => add(total, brick), f(0))
}

export function fitsInRow(row: FractionValue[], brick: FractionValue): boolean {
    return compare(add(rowTotal(row), brick), f(1)) <= 0
}

export type WallEvent =
    | { type: 'placed'; row: number }
    | { type: 'cleared'; row: number }
    | { type: 'overflow'; row: number }
    | { type: 'discarded' }

export function wallFinished(state: WallState, sequence: FractionValue[]): boolean {
    return state.lives <= 0 || state.next >= sequence.length
}

/** Places the current brick. A brick that does not fit changes nothing. */
export function placeBrick(state: WallState, sequence: FractionValue[], row: number): { state: WallState; event: WallEvent } {
    const brick = sequence[state.next]
    const current = state.rows[row]
    if (!brick || !current) return { state, event: { type: 'overflow', row } }
    if (!fitsInRow(current, brick)) return { state, event: { type: 'overflow', row } }
    const filled = [...current, brick]
    const complete = equals(rowTotal(filled), f(1))
    const rows = state.rows.map((item, index) => index === row ? (complete ? [] : filled) : item)
    return {
        state: { ...state, rows, next: state.next + 1, cleared: state.cleared + (complete ? 1 : 0) },
        event: complete ? { type: 'cleared', row } : { type: 'placed', row }
    }
}

/** Throws the current brick away and costs a life */
export function discardBrick(state: WallState): { state: WallState; event: WallEvent } {
    return {
        state: { ...state, next: state.next + 1, lives: state.lives - 1, discarded: state.discarded + 1 },
        event: { type: 'discarded' }
    }
}

export function brickFitsAnywhere(state: WallState, brick: FractionValue): boolean {
    return state.rows.some((row) => fitsInRow(row, brick))
}

export function wallStars(cleared: number): Stars {
    if (cleared >= WALL_UNITS) return 3
    if (cleared >= 6) return 2
    if (cleared >= 4) return 1
    return 0
}
