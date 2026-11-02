import { pick, randomInt, type Random } from '../../features/unit-v2/games/random.ts'

/* ==========================================================================
   Tile the floor (4. DBH applied areas): the plan of a floor with its sides
   in metres and a tile in centimetres. How many tiles cover the floor
   exactly? Set the number and lay them: they go down row by row and leave
   floor bare, fit or are left over. Level 1: rectangles and square tiles;
   level 2: L-shaped floors; level 3: oblong tiles on L-, U- and T-shaped
   floors.
   ========================================================================== */

export const TILES_ROUNDS = 5

export type FloorKind = 'rectangle' | 'l' | 'u' | 't'
export type Vertex = [number, number]

export interface TilesRound {
    kind: FloorKind
    /** The floor as a polygon in tiles, from the top-left corner, clockwise on the screen */
    outline: Vertex[]
    /** Tiles across and down the bounding rectangle */
    columns: number
    rows: number
    /** The tile in centimetres: across and down */
    tile: [number, number]
    count: number
    max: number
}

/** Twice the signed area of the outline, in tiles (positive when clockwise on the screen) */
export function outlineArea(outline: Vertex[]): number {
    let sum = 0
    outline.forEach(([x, y], index) => {
        const [nx, ny] = outline[(index + 1) % outline.length]
        sum += x * ny - nx * y
    })
    return sum / 2
}

/** True when the centre of the tile (column, row) is inside the floor */
export function inFloor(outline: Vertex[], column: number, row: number): boolean {
    const [px, py] = [column + 0.5, row + 0.5]
    let inside = false
    outline.forEach(([x, y], index) => {
        const [nx, ny] = outline[(index + 1) % outline.length]
        if ((y > py) !== (ny > py) && px < x + ((py - y) * (nx - x)) / (ny - y)) inside = !inside
    })
    return inside
}

/** The tiles of the floor, row by row from the top */
export function floorCells(round: TilesRound): Vertex[] {
    const cells: Vertex[] = []
    for (let row = 0; row < round.rows; row += 1) for (let column = 0; column < round.columns; column += 1) if (inFloor(round.outline, column, row)) cells.push([column, row])
    return cells
}

function outlineFor(kind: FloorKind, columns: number, rows: number, cutColumns: number, cutRows: number, offset: number): Vertex[] {
    if (kind === 'rectangle') return [[0, 0], [columns, 0], [columns, rows], [0, rows]]
    if (kind === 'l') return [[0, 0], [columns - cutColumns, 0], [columns - cutColumns, cutRows], [columns, cutRows], [columns, rows], [0, rows]]
    if (kind === 'u') return [[0, 0], [offset, 0], [offset, cutRows], [offset + cutColumns, cutRows], [offset + cutColumns, 0], [columns, 0], [columns, rows], [0, rows]]
    // A T: the bar on top, the stem down from the column offset, cutColumns wide
    return [[0, 0], [columns, 0], [columns, cutRows], [offset + cutColumns, cutRows], [offset + cutColumns, rows], [offset, rows], [offset, cutRows], [0, cutRows]]
}

const SQUARE_TILES = [20, 25, 40, 50]
const OBLONG_TILES: Array<[number, number]> = [[40, 20], [50, 25], [60, 30], [30, 20], [60, 40]]
/** The longest side of a floor, in centimetres */
const FLOOR_MAX = 800

export function createTilesRound(random: Random, levelIndex: number): TilesRound {
    for (;;) {
        const kind: FloorKind = levelIndex === 0 ? 'rectangle' : levelIndex === 1 ? 'l' : pick(random, ['l', 'u', 't'] as const)
        const square = pick(random, SQUARE_TILES)
        const tile: [number, number] = levelIndex < 2 ? [square, square] : pick(random, OBLONG_TILES)
        const columns = randomInt(random, kind === 'rectangle' ? 3 : 4, 14)
        const rows = randomInt(random, kind === 'rectangle' ? 3 : 4, 12)
        const [width, height] = [columns * tile[0], rows * tile[1]]
        // Sides of whole decimetres, a floor that fits the plan and is wider than tall
        if (width > FLOOR_MAX || height > FLOOR_MAX || width % 10 !== 0 || height % 10 !== 0 || height > width * 1.1) continue
        const cutColumns = randomInt(random, kind === 'rectangle' ? 0 : 1, Math.max(1, kind === 'u' || kind === 't' ? columns - 2 : columns - 1))
        const cutRows = randomInt(random, 1, rows - 1)
        const offset = kind === 'u' || kind === 't' ? randomInt(random, 1, columns - cutColumns - 1) : 0
        if ((kind === 'u' || kind === 't') && (offset < 1 || offset + cutColumns > columns - 1)) continue
        // Every side of the plan of whole decimetres
        if ((cutColumns * tile[0]) % 10 !== 0 || (cutRows * tile[1]) % 10 !== 0 || (offset * tile[0]) % 10 !== 0) continue
        const outline = outlineFor(kind, columns, rows, cutColumns, cutRows, offset)
        const count = outlineArea(outline)
        if (count < 8 || count > (levelIndex === 0 ? 100 : levelIndex === 1 ? 160 : 200)) continue
        // The cut-out is a real bite, not one tile nor almost the whole floor
        if (kind !== 'rectangle' && (count > columns * rows * 0.9 || count < columns * rows * 0.4)) continue
        return { kind, outline, columns, rows, tile, count, max: Math.max(20, Math.ceil((count * 1.5) / 10) * 10) }
    }
}

export const createTilesRounds = (random: Random, levelIndex: number) => Array.from({ length: TILES_ROUNDS }, () => createTilesRound(random, levelIndex))

/** The length in metres of each side of the plan, from the first vertex */
export function sideLengths(round: TilesRound): number[] {
    return round.outline.map(([x, y], index) => {
        const [nx, ny] = round.outline[(index + 1) % round.outline.length]
        return (Math.abs(nx - x) * round.tile[0] + Math.abs(ny - y) * round.tile[1]) / 100
    })
}

/** The floor in square metres and the tile in square metres */
export const floorArea = (round: TilesRound) => (round.count * round.tile[0] * round.tile[1]) / 10000
export const tileArea = (round: TilesRound) => (round.tile[0] * round.tile[1]) / 10000
