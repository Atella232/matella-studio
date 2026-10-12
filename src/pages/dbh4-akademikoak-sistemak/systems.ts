/* ==========================================================================
   Sistemak · 4. DBH akademikoak — the plane geometry behind the figures,
   the laboratory and the games: a linear system solved with Cramer's rule
   and classified, and a polygon cut by half-planes ax + by ≤ c, which is
   how a region of inequalities is shaded. Kept apart from the SVG so the
   tests can load it.
   ========================================================================== */

export type Point = [number, number]
export type Sense = '≤' | '<' | '≥' | '>'

/** ax + by R c */
export interface HalfPlane {
    a: number
    b: number
    c: number
    sense: Sense
}

/** The linear equation ax + by = c */
export interface Linear {
    a: number
    b: number
    c: number
}

export type SystemKind = 'one' | 'none' | 'infinite'

/** One solution, none (parallel lines) or infinitely many (the same line) */
export function classify(first: Linear, second: Linear): SystemKind {
    const det = first.a * second.b - first.b * second.a
    if (det !== 0) return 'one'
    // Parallel: the same line when every 2×2 minor with c vanishes too
    const sameLine = first.a * second.c - first.c * second.a === 0 && first.b * second.c - first.c * second.b === 0
    return sameLine ? 'infinite' : 'none'
}

/** The single solution of a determined system (Cramer), or null */
export function solveLinear(first: Linear, second: Linear): Point | null {
    const det = first.a * second.b - first.b * second.a
    if (det === 0) return null
    return [(first.c * second.b - first.b * second.c) / det, (first.a * second.c - first.c * second.a) / det]
}

/** How much a point misses the boundary: positive when ax + by > c */
const excess = (h: Pick<HalfPlane, 'a' | 'b' | 'c'>, [x, y]: Point) => h.a * x + h.b * y - h.c

export function inHalfPlane(h: HalfPlane, point: Point): boolean {
    const value = excess(h, point)
    return h.sense === '≤' ? value <= 1e-9 : h.sense === '<' ? value < -1e-9 : h.sense === '≥' ? value >= -1e-9 : value > 1e-9
}

/** Sutherland–Hodgman: the part of a convex polygon on the right side of the boundary (the boundary itself kept) */
export function clipPolygon(polygon: Point[], h: HalfPlane): Point[] {
    const keep = (point: Point) => (h.sense === '≤' || h.sense === '<' ? excess(h, point) <= 1e-9 : excess(h, point) >= -1e-9)
    const out: Point[] = []
    polygon.forEach((current, index) => {
        const previous = polygon[(index + polygon.length - 1) % polygon.length]
        const inCurrent = keep(current)
        const inPrevious = keep(previous)
        if (inCurrent !== inPrevious) {
            const p = excess(h, previous)
            const q = excess(h, current)
            const t = p / (p - q)
            out.push([previous[0] + t * (current[0] - previous[0]), previous[1] + t * (current[1] - previous[1])])
        }
        if (inCurrent) out.push(current)
    })
    return out
}

/** The region of a box where every inequality holds */
export function region(box: { xMin: number; xMax: number; yMin: number; yMax: number }, halves: HalfPlane[]): Point[] {
    const start: Point[] = [[box.xMin, box.yMin], [box.xMax, box.yMin], [box.xMax, box.yMax], [box.xMin, box.yMax]]
    return halves.reduce((polygon, h) => (polygon.length ? clipPolygon(polygon, h) : polygon), start)
}

/** Whole-number points (x, y) of the box that satisfy every inequality */
export function latticePoints(box: { xMin: number; xMax: number; yMin: number; yMax: number }, halves: HalfPlane[]): Point[] {
    const points: Point[] = []
    for (let x = box.xMin; x <= box.xMax; x += 1) for (let y = box.yMin; y <= box.yMax; y += 1) if (halves.every((h) => inHalfPlane(h, [x, y]))) points.push([x, y])
    return points
}
