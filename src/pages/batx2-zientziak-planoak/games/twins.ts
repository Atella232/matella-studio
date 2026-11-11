import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { add, cross, dot, isZero, primitive, scale, sub, type Vec3 } from '../../batx2-zientziak-bektoreak/space/vec3.ts'
import { levelLatex } from '../lab/common.ts'
import { continuousLatex } from '../lab/parameterT.ts'

/* ==========================================================================
   J1 · Zuzen bikiak espazioan (Rectas gemelas en el espacio): a line and
   four equations; only one is the same line. Level 1: the line in vector
   form and four continuous equations (the right one, the signs of the
   point changed, point and direction swapped, another direction).
   Level 2: the continuous equation and four vector forms through other
   points and with proportional directions (one point off the line, one
   other direction, the signs of the point changed). Level 3: the vector
   form and four pairs of implicit equations (two planes that hold the
   line; one plane moved, so a parallel line; one plane through A that
   does not hold the line; the same plane twice, which is no line).
   ========================================================================== */

export const TWIN_ROUNDS = 6
export const TWIN_LETTERS = ['A', 'B', 'C', 'D'] as const

export type TwinKind = 'right' | 'sign' | 'swap' | 'point-off' | 'direction-off' | 'same-plane'

export type PlaneEquation = readonly [number, number, number, number]

export interface TwinOption {
    kind: TwinKind
    latex: string
    /** A line as a point and a direction, or as two planes */
    line?: { point: Vec3; direction: Vec3 }
    planes?: readonly [PlaneEquation, PlaneEquation]
}

export interface TwinRound {
    point: Vec3
    direction: Vec3
    given: string
    options: TwinOption[]
    answer: number
    /** What makes the right option the same line */
    working: string
}

const vec = (a: Vec3) => `(${a.map((value) => value + 0).join(',')})`
const tidy = (a: Vec3): Vec3 => [a[0] + 0, a[1] + 0, a[2] + 0]
export const vectorLatex = (point: Vec3, direction: Vec3, parameter = 't') => `(x,y,{z})=${vec(point)}+${parameter}\\,${vec(direction)}`
export const implicitLatex = ([first, second]: readonly [PlaneEquation, PlaneEquation]) =>
    `\\begin{cases}${levelLatex([first[0], first[1], first[2]], first[3])}\\\\${levelLatex([second[0], second[1], second[2]], second[3])}\\end{cases}`

const parallelTo = (a: Vec3, b: Vec3) => isZero(cross(a, b))
/** Whether the line (point, direction) is the line of the round */
const sameAs = (line: { point: Vec3; direction: Vec3 }, point: Vec3, direction: Vec3) => parallelTo(line.direction, direction) && parallelTo(sub(line.point, point), direction)

/** Whether an option is the line of the round (the tests check that only the right one is) */
export function isSameLine(option: TwinOption, point: Vec3, direction: Vec3): boolean {
    if (option.line) return !isZero(option.line.direction) && sameAs(option.line, point, direction)
    if (!option.planes) return false
    const [first, second] = option.planes
    const n1: Vec3 = [first[0], first[1], first[2]]
    const n2: Vec3 = [second[0], second[1], second[2]]
    const holds = (n: Vec3, d: number) => dot(n, direction) === 0 && dot(n, point) === d
    return !parallelTo(n1, n2) && holds(n1, first[3]) && holds(n2, second[3])
}

const smallVec = (random: Random, limit: number): Vec3 => [randomInt(random, -limit, limit), randomInt(random, -limit, limit), randomInt(random, -limit, limit)]
const nudge = (random: Random, a: Vec3): Vec3 => {
    const copy: [number, number, number] = [a[0], a[1], a[2]]
    copy[randomInt(random, 0, 2)] += pick(random, [1, -1, 2])
    return copy
}

/** Planes that hold the line: normals u × (an axis), whole and small */
function holdingNormals(direction: Vec3): Vec3[] {
    const axes: Vec3[] = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
    return axes.map((axis) => primitive(cross(direction, axis))).filter((normal) => !isZero(normal))
}

function make(random: Random, level: number): TwinRound | null {
    const point = smallVec(random, 3)
    const direction = smallVec(random, 3)
    if (direction.some((value) => value === 0) || point.filter((value) => value !== 0).length < 2) return null
    let given: string
    let raw: TwinOption[]
    let working: string
    if (level === 0) {
        // The vector form, and continuous equations
        const off = nudge(random, direction)
        const minus = scale(-1, point)
        if (off.some((value) => value === 0) || parallelTo(off, direction) || parallelTo(sub(minus, point), direction)) return null
        if (point.some((value) => value === 0) || sameAs({ point: direction, direction: point }, point, direction)) return null
        given = vectorLatex(point, direction)
        raw = [
            { kind: 'right', latex: continuousLatex(point, direction), line: { point, direction } },
            { kind: 'sign', latex: continuousLatex(minus, direction), line: { point: minus, direction } },
            { kind: 'swap', latex: continuousLatex(direction, point), line: { point: direction, direction: point } },
            { kind: 'direction-off', latex: continuousLatex(point, off), line: { point, direction: off } }
        ]
        working = `\\vec{u}=${vec(direction)}\\qquad A=${vec(point)}`
    } else if (level === 1) {
        // The continuous equation, and vector forms through other points
        const k = pick(random, [1, -1, 2])
        const m = pick(random, [-1, 2, -2])
        const other = tidy(add(point, scale(k, direction)))
        const along = scale(m, direction)
        const away = nudge(random, other)
        const turned = nudge(random, direction)
        const minus = tidy(scale(-1, point))
        if (other.some((value) => Math.abs(value) > 6) || along.some((value) => Math.abs(value) > 6)) return null
        if (sameAs({ point: away, direction }, point, direction) || parallelTo(turned, direction) || isZero(turned) || sameAs({ point: minus, direction }, point, direction)) return null
        given = continuousLatex(point, direction)
        raw = [
            { kind: 'right', latex: vectorLatex(other, along, '\\lambda'), line: { point: other, direction: along } },
            { kind: 'point-off', latex: vectorLatex(away, along, '\\lambda'), line: { point: away, direction: along } },
            { kind: 'direction-off', latex: vectorLatex(other, turned, '\\lambda'), line: { point: other, direction: turned } },
            { kind: 'sign', latex: vectorLatex(minus, direction, '\\lambda'), line: { point: minus, direction } }
        ]
        working = `${vec(other)}=${vec(point)}+${k < 0 ? `(${k})` : k}\\,${vec(direction)}\\qquad ${vec(along)}=${m < 0 ? `(${m})` : m}\\,${vec(direction)}`
    } else {
        // The vector form, and pairs of planes
        const normals = shuffle(random, holdingNormals(direction))
        if (normals.length < 2 || parallelTo(normals[0], normals[1])) return null
        const [n1, n2] = normals
        if ([...n1, ...n2].some((value) => Math.abs(value) > 6)) return null
        const d1 = dot(n1, point)
        const d2 = dot(n2, point)
        const plane = (n: Vec3, d: number): PlaneEquation => [n[0], n[1], n[2], d + 0]
        const tilted = nudge(random, n2)
        if (dot(tilted, direction) === 0 || parallelTo(tilted, n1) || isZero(tilted)) return null
        const shift = pick(random, [1, -1, 2])
        const right: [PlaneEquation, PlaneEquation] = [plane(n1, d1), plane(n2, d2)]
        const moved: [PlaneEquation, PlaneEquation] = [plane(n1, d1), plane(n2, d2 + shift)]
        const through: [PlaneEquation, PlaneEquation] = [plane(n1, d1), plane(tilted, dot(tilted, point))]
        const twice: [PlaneEquation, PlaneEquation] = [plane(n1, d1), plane(scale(2, n1), 2 * d1)]
        given = vectorLatex(point, direction)
        raw = [
            { kind: 'right', latex: implicitLatex(right), planes: right },
            { kind: 'point-off', latex: implicitLatex(moved), planes: moved },
            { kind: 'direction-off', latex: implicitLatex(through), planes: through },
            { kind: 'same-plane', latex: implicitLatex(twice), planes: twice }
        ]
        working = `${vec(n1)}\\cdot ${vec(direction)}=0\\qquad ${vec(n2)}\\cdot ${vec(direction)}=0`
    }
    if (new Set(raw.map((option) => option.latex)).size < raw.length) return null
    const options = shuffle(random, raw)
    return { point, direction, given, options, answer: options.findIndex((option) => option.kind === 'right'), working }
}

/** Six rounds of one level, no two with the same line */
export function createTwinRounds(random: Random, level: number): TwinRound[] {
    const rounds: TwinRound[] = []
    for (let attempt = 0; rounds.length < TWIN_ROUNDS && attempt < 6000; attempt++) {
        const round = make(random, Math.min(2, Math.max(0, level)))
        if (round && !rounds.some((other) => other.given === round.given)) rounds.push(round)
    }
    return rounds
}
