import { inHalfPlane, region, type HalfPlane, type Point } from '../dbh4-akademikoak-sistemak/systems.ts'

/* ==========================================================================
   Programazio lineala · Batxilergoa 2 · Gizarte Zientziak — linear
   programming in two variables: the vertices of the feasible region (the
   crossings of two boundary lines that satisfy every constraint), the
   value of the objective function at each, and the kind of solution:
   one vertex, a whole side (multiple), no optimum (the region does not
   close in the direction of the objective) or no region at all. Shared by
   the lessons, the content, the lab, the games and the tests. No React.
   ========================================================================== */

export type { HalfPlane, Point }
export type Goal = 'max' | 'min'
export type SolutionKind = 'unique' | 'multiple' | 'unbounded' | 'empty'

export interface Objective {
    a: number
    b: number
}

const near = (a: number, b: number) => Math.abs(a - b) < 1e-9
const samePoint = (p: Point, q: Point) => near(p[0], q[0]) && near(p[1], q[1])
const clean = (value: number) => (near(value, Math.round(value)) ? Math.round(value) + 0 : value)

/** The constraints with x ≥ 0 and y ≥ 0 added */
export const withSigns = (constraints: HalfPlane[]): HalfPlane[] => [...constraints, { a: 1, b: 0, c: 0, sense: '≥' }, { a: 0, b: 1, c: 0, sense: '≥' }]

/** The vertices of the region: crossings of two boundaries that satisfy every constraint, in turn around the region */
export function vertices(constraints: HalfPlane[]): Point[] {
    const found: Point[] = []
    for (let i = 0; i < constraints.length; i++) for (let j = i + 1; j < constraints.length; j++) {
        const [p, q] = [constraints[i], constraints[j]]
        const det = p.a * q.b - p.b * q.a
        if (near(det, 0)) continue
        const point: Point = [clean((p.c * q.b - p.b * q.c) / det), clean((p.a * q.c - p.c * q.a) / det)]
        if (constraints.every((h) => inHalfPlane({ ...h, sense: h.sense === '<' ? '≤' : h.sense === '>' ? '≥' : h.sense }, point)) && !found.some((other) => samePoint(other, point))) found.push(point)
    }
    const cx = found.reduce((sum, [x]) => sum + x, 0) / (found.length || 1)
    const cy = found.reduce((sum, [, y]) => sum + y, 0) / (found.length || 1)
    return found.sort((p, q) => Math.atan2(p[1] - cy, p[0] - cx) - Math.atan2(q[1] - cy, q[0] - cx))
}

export const objectiveValue = ({ a, b }: Objective, [x, y]: Point) => clean(a * x + b * y)

/** Whether the region goes on for ever in the direction where the objective improves */
export function unboundedTowards(constraints: HalfPlane[], objective: Objective, goal: Goal): boolean {
    const far = 1000
    const box = { xMin: -far, xMax: far, yMin: -far, yMax: far }
    const polygon = region(box, constraints)
    if (!polygon.length) return false
    const best = Math.max(...polygon.map((point) => (goal === 'max' ? 1 : -1) * objectiveValue(objective, point)))
    const atVertices = vertices(constraints).map((point) => (goal === 'max' ? 1 : -1) * objectiveValue(objective, point))
    return !atVertices.length || best > Math.max(...atVertices) + 1e-6
}

export interface Optimum {
    kind: SolutionKind
    value: number | null
    /** The vertices where the optimum is reached (two for a multiple solution) */
    at: Point[]
}

/** The optimum of the objective on the region of the constraints */
export function optimum(constraints: HalfPlane[], objective: Objective, goal: Goal): Optimum {
    const points = vertices(constraints)
    if (!points.length) return { kind: 'empty', value: null, at: [] }
    if (unboundedTowards(constraints, objective, goal)) return { kind: 'unbounded', value: null, at: [] }
    const values = points.map((point) => objectiveValue(objective, point))
    const best = goal === 'max' ? Math.max(...values) : Math.min(...values)
    const at = points.filter((_, index) => near(values[index], best))
    return { kind: at.length > 1 ? 'multiple' : 'unique', value: best, at }
}

/** Whole-number points of the region inside a box */
export function integerPoints(constraints: HalfPlane[], size: number): Point[] {
    const points: Point[] = []
    for (let x = 0; x <= size; x++) for (let y = 0; y <= size; y++) if (constraints.every((h) => inHalfPlane(h, [x, y]))) points.push([x, y])
    return points
}

/* ---------- LaTeX ---------- */

const SENSE_LATEX: Record<HalfPlane['sense'], string> = { '≤': '\\le', '<': '<', '≥': '\\ge', '>': '>' }

/** ax + by, with 1 and 0 left out: 2x+3y, x-y, 4y */
export function linearTerms(a: number, b: number, names = ['x', 'y']): string {
    const term = (coefficient: number, name: string, first: boolean) => {
        if (coefficient === 0) return ''
        const sign = coefficient < 0 ? '-' : first ? '' : '+'
        const size = Math.abs(coefficient) === 1 ? '' : String(Math.abs(coefficient)).replace('.', '{,}')
        return `${sign}${size}${name}`
    }
    const left = `${term(a, names[0], true)}${term(b, names[1], a === 0)}`
    return left || '0'
}

export const constraintLatex = (h: HalfPlane) => `${linearTerms(h.a, h.b)}${SENSE_LATEX[h.sense]}${String(h.c).replace('.', '{,}')}`
export const systemLatex = (constraints: HalfPlane[]) => `\\begin{cases}${constraints.map(constraintLatex).join('\\\\ ')}\\end{cases}`
export const pointLatex = ([x, y]: Point) => `(${String(x).replace('.', '{,}')},${String(y).replace('.', '{,}')})`
export const objectiveLatex = ({ a, b }: Objective) => `F(x,y)=${linearTerms(a, b)}`
