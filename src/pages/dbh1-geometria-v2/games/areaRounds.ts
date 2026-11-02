import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   Areas on the grid (1. DBH plane geometry): a shape drawn on squared paper
   (each square 1 cm²). Choose its area among options that hold the usual
   slips; after answering, the shape turns into the rectangle or the
   parallelogram it comes from. Level 1: rectangles and parallelograms;
   level 2: triangles (also with the height outside); level 3: rhombuses and
   trapezoids.
   ========================================================================== */

export const AREA_ROUNDS = 5
export const GRID = { columns: 10, rows: 7 }

export type Point = [number, number]
export type ShapeKind = 'rectangle' | 'parallelogram' | 'triangle' | 'rhombus' | 'trapezoid'

export interface AreaRound {
    kind: ShapeKind
    /** The vertices in grid units, y down */
    points: Point[]
    /** Base and height (the diagonals of a rhombus; the two bases of a trapezoid in base and top) */
    base: number
    height: number
    top: number
    area: number
    options: number[]
}

function shape(random: Random, kind: ShapeKind): Omit<AreaRound, 'options' | 'kind'> | null {
    const { columns, rows } = GRID
    if (kind === 'rectangle' || kind === 'parallelogram') {
        const [base, height] = [randomInt(random, 2, 7), randomInt(random, 2, 5)]
        const shift = kind === 'rectangle' ? 0 : randomInt(random, 1, 3)
        if (base + shift > columns - 1 || height > rows - 1) return null
        const [x, y] = [randomInt(random, 0, columns - base - shift), randomInt(random, 0, rows - height)]
        return { points: [[x + shift, y], [x + shift + base, y], [x + base, y + height], [x, y + height]], base, height, top: base, area: base * height }
    }
    if (kind === 'triangle') {
        const [base, height] = [randomInt(random, 2, 7), randomInt(random, 2, 6)]
        const apex = randomInt(random, -2, base + 2)
        const [left, right] = [Math.min(0, apex), Math.max(base, apex)]
        if ((base * height) % 2 !== 0 || right - left > columns || height > rows) return null
        const [x, y] = [randomInt(random, -left, columns - right), randomInt(random, 0, rows - height)]
        // The parallelogram of two such triangles must fit on one side or the other
        if (x + apex + base > columns && x + apex - base < 0) return null
        return { points: [[x, y + height], [x + base, y + height], [x + apex, y]], base, height, top: 0, area: (base * height) / 2 }
    }
    if (kind === 'rhombus') {
        const [across, down] = [2 * randomInt(random, 2, 4), 2 * randomInt(random, 1, 3)]
        if (across === down || down > rows) return null
        const [cx, cy] = [randomInt(random, across / 2, columns - across / 2), randomInt(random, down / 2, rows - down / 2)]
        return { points: [[cx, cy - down / 2], [cx + across / 2, cy], [cx, cy + down / 2], [cx - across / 2, cy]], base: across, height: down, top: 0, area: (across * down) / 2 }
    }
    const [base, height] = [randomInt(random, 4, 8), randomInt(random, 2, 5)]
    const top = randomInt(random, 1, base - 2)
    const offset = randomInt(random, 0, base - top)
    // Room for the turned copy that makes a parallelogram
    if (((base + top) * height) % 2 !== 0 || offset + top + base > columns || height > rows) return null
    const [x, y] = [randomInt(random, 0, columns - offset - top - base), randomInt(random, 0, rows - height)]
    return { points: [[x + offset, y], [x + offset + top, y], [x + base, y + height], [x, y + height]], base, height, top, area: ((base + top) * height) / 2 }
}

/** The usual slips for each shape: no half, the bounding box, the sides added, the halving where it does not belong */
function slips(round: Omit<AreaRound, 'options'>): number[] {
    const { kind, base, height, top, points } = round
    const xs = points.map(([x]) => x)
    const box = (Math.max(...xs) - Math.min(...xs)) * height
    if (kind === 'rectangle') return [2 * (base + height), base + height, (base * height) / 2]
    if (kind === 'parallelogram') return [box, (base * height) / 2, base + height]
    if (kind === 'triangle') return [base * height, box / 2 === round.area ? box : box / 2, base + height]
    if (kind === 'rhombus') return [base * height, base + height, (base * height) / 4]
    return [(base + top) * height, base * height, top * height]
}

export function createAreaRound(random: Random, levelIndex: number): AreaRound {
    for (;;) {
        const kind: ShapeKind = levelIndex === 0 ? pick(random, ['rectangle', 'parallelogram', 'parallelogram'] as const) : levelIndex === 1 ? 'triangle' : pick(random, ['rhombus', 'trapezoid'] as const)
        const made = shape(random, kind)
        if (!made) continue
        const round = { ...made, kind }
        const wrong = shuffle(random, slips(round).filter((value) => Number.isInteger(value) && value > 0 && value !== round.area))
        const options = [...new Set([round.area, ...wrong])].slice(0, 4).sort((x, y) => x - y)
        if (options.length < 3) continue
        return { ...round, options }
    }
}

export const createAreaRounds = (random: Random, levelIndex: number) => Array.from({ length: AREA_ROUNDS }, () => createAreaRound(random, levelIndex))
