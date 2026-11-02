import { randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   The own games of 1. DBH plane figures:
   · Can it be built? Three sticks: is there a triangle with them? Level 1:
     clear cases; level 2: the borderline a + b = c too; level 3: two sticks
     are given and the learner sets the shortest and the longest whole
     third stick. After answering, the sticks try to close.
   · Lines of symmetry: a shape with dashed candidate lines; tap the ones
     that are lines of symmetry (maybe none). Level 1: quadrilaterals with
     axes; level 2: other quadrilaterals and triangles; level 3: how many
     axes (regular polygons too), all drawn after answering.
   ========================================================================== */

/* ---------- Can it be built? ---------- */

export const STICKS_ROUNDS = 5
export const STICK_LIMIT = 24

export interface SticksRound {
    sides: [number, number, number]
    /** Level 3: the third side goes from min to max */
    range: [number, number] | null
    possible: boolean
}

export const canBuild = ([a, b, c]: number[]) => a + b > c && a + c > b && b + c > a

export function createSticksRound(random: Random, levelIndex: number, possible: boolean): SticksRound {
    for (;;) {
        const [a, b] = [randomInt(random, 2, 10), randomInt(random, 2, 10)]
        if (levelIndex === 2) {
            if (a === b) continue
            return { sides: [a, b, 0], range: [Math.abs(a - b) + 1, a + b - 1], possible: true }
        }
        const c = possible
            ? randomInt(random, Math.abs(a - b) + 1, a + b - 1)
            : levelIndex === 1 && random() < 0.5 ? a + b : randomInt(random, a + b + 1, Math.min(a + b + 6, STICK_LIMIT))
        if (c < 2 || canBuild([a, b, c]) !== possible) continue
        return { sides: shuffle(random, [a, b, c]) as [number, number, number], range: null, possible }
    }
}

export function createSticksRounds(random: Random, levelIndex: number): SticksRound[] {
    const answers = levelIndex === 2 ? [true, true, true, true, true] : shuffle(random, [true, true, false, false, random() < 0.5])
    return answers.map((possible) => createSticksRound(random, levelIndex, possible))
}

/* ---------- Lines of symmetry ---------- */

export const SYMMETRY_ROUNDS = 5
export type Point = [number, number]
/** A candidate line through two points, and whether it is a line of symmetry */
export interface Candidate { from: Point; to: Point; axis: boolean }

export type ShapeName =
    | 'rectangle' | 'square' | 'rhombus' | 'isosceles-trapezoid' | 'kite'
    | 'parallelogram' | 'right-trapezoid' | 'isosceles-triangle' | 'equilateral-triangle' | 'scalene-triangle'
    | 'pentagon' | 'hexagon' | 'octagon'

export interface ShapeDefinition { points: Point[]; candidates: Candidate[] }

/** A regular polygon around (170, 120), a vertex at the top */
function regular(sides: number, radius = 95): Point[] {
    return Array.from({ length: sides }, (_, index) => {
        const angle = -Math.PI / 2 + (index * 2 * Math.PI) / sides
        return [Math.round((170 + radius * Math.cos(angle)) * 10) / 10, Math.round((120 + radius * Math.sin(angle)) * 10) / 10] as Point
    })
}

const middle = ([x1, y1]: Point, [x2, y2]: Point): Point => [(x1 + x2) / 2, (y1 + y2) / 2]
const line = (from: Point, to: Point, axis: boolean): Candidate => ({ from, to, axis })
const [V, H] = [line([170, 20], [170, 220], true), line([30, 120], [310, 120], true)]
const not = (candidate: Candidate): Candidate => ({ ...candidate, axis: false })
const TRIANGLE = regular(3, 110)

export const SHAPES: Record<ShapeName, ShapeDefinition> = {
    'rectangle': { points: [[70, 60], [270, 60], [270, 180], [70, 180]], candidates: [V, H, line([70, 60], [270, 180], false), line([270, 60], [70, 180], false)] },
    'square': { points: [[100, 50], [240, 50], [240, 190], [100, 190]], candidates: [V, H, line([100, 50], [240, 190], true), line([240, 50], [100, 190], true)] },
    'rhombus': { points: [[170, 40], [280, 120], [170, 200], [60, 120]], candidates: [V, H, line(middle([170, 40], [280, 120]), middle([170, 200], [60, 120]), false), line(middle([280, 120], [170, 200]), middle([60, 120], [170, 40]), false)] },
    'isosceles-trapezoid': { points: [[120, 60], [220, 60], [280, 180], [60, 180]], candidates: [V, not(H), line([120, 60], [280, 180], false), line([220, 60], [60, 180], false)] },
    'kite': { points: [[170, 30], [240, 90], [170, 210], [100, 90]], candidates: [V, line([30, 90], [310, 90], false), line([100, 90], [240, 210], false), line([240, 90], [100, 210], false)] },
    'parallelogram': { points: [[110, 60], [290, 60], [230, 180], [50, 180]], candidates: [not(V), not(H), line([110, 60], [230, 180], false), line([290, 60], [50, 180], false)] },
    'right-trapezoid': { points: [[80, 60], [200, 60], [280, 180], [80, 180]], candidates: [not(V), not(H), line([80, 60], [280, 180], false), line([200, 60], [80, 180], false)] },
    'isosceles-triangle': { points: [[170, 30], [260, 200], [80, 200]], candidates: [V, line([30, 143], [310, 143], false), line([260, 200], middle([170, 30], [80, 200]), false), line([80, 200], middle([170, 30], [260, 200]), false)] },
    // Its three medians are axes, the horizontal is not
    'equilateral-triangle': { points: TRIANGLE, candidates: [line(TRIANGLE[0], middle(TRIANGLE[1], TRIANGLE[2]), true), line(TRIANGLE[1], middle(TRIANGLE[0], TRIANGLE[2]), true), line(TRIANGLE[2], middle(TRIANGLE[0], TRIANGLE[1]), true), line([30, 120], [310, 120], false)] },
    'scalene-triangle': { points: [[110, 40], [290, 200], [60, 170]], candidates: [line([110, 40], middle([290, 200], [60, 170]), false), line([290, 200], middle([110, 40], [60, 170]), false), line([60, 170], middle([110, 40], [290, 200]), false), not(V)] },
    'pentagon': { points: regular(5), candidates: [] },
    'hexagon': { points: regular(6), candidates: [] },
    'octagon': { points: regular(8), candidates: [] }
}

/** The lines of symmetry of a shape, for drawing them after answering */
export function axesOf(name: ShapeName): Candidate[] {
    const shape = SHAPES[name]
    if (shape.candidates.length > 0) return shape.candidates.filter((candidate) => candidate.axis)
    // A regular polygon: lines through the centre and each vertex (and, if even, each side's midpoint)
    const { points } = shape
    const count = points.length
    return points.flatMap((point, index): Candidate[] => {
        if (count % 2 === 1) return [line(point, middle(points[(index + Math.floor(count / 2)) % count], points[(index + Math.floor(count / 2) + 1) % count]), true)]
        if (index >= count / 2) return []
        return [line(point, points[index + count / 2], true), line(middle(point, points[index + 1]), middle(points[index + count / 2], points[(index + count / 2 + 1) % count]), true)]
    })
}

export interface SymmetryRound {
    shape: ShapeName
    /** Levels 1 and 2: tap the candidates; level 3: count the axes */
    count: boolean
    axes: number
}

const LEVEL_SHAPES: ShapeName[][] = [
    ['rectangle', 'square', 'rhombus', 'isosceles-trapezoid', 'kite'],
    ['parallelogram', 'right-trapezoid', 'isosceles-triangle', 'equilateral-triangle', 'scalene-triangle'],
    ['equilateral-triangle', 'square', 'pentagon', 'hexagon', 'octagon', 'rectangle', 'rhombus', 'kite', 'isosceles-trapezoid']
]

export function createSymmetryRounds(random: Random, levelIndex: number): SymmetryRound[] {
    return shuffle(random, LEVEL_SHAPES[levelIndex]).slice(0, SYMMETRY_ROUNDS).map((shape) => ({ shape, count: levelIndex === 2, axes: axesOf(shape).length }))
}
