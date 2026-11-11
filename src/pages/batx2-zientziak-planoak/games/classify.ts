import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { add, cross, det3, dot, isZero, scale, sub, type Vec3 } from '../../batx2-zientziak-bektoreak/space/vec3.ts'
import { levelLatex } from '../lab/common.ts'
import { continuousLatex } from '../lab/parameterT.ts'

/* ==========================================================================
   J2 · Sailkatu bikotea (Clasifica la pareja): two objects written as
   equations and the learner says how they are. Level 1: two planes
   (secant, parallel, the same); level 2: a line and a plane (through
   it, parallel, inside); level 3: two lines (they meet, skew, parallel,
   the same). The six answers of a level are spread over all the
   positions. After answering, the pair is drawn on the 3D board with the
   short calculation that decides it.
   ========================================================================== */

export const CLASSIFY_ROUNDS = 6

export type PairType = 'planes' | 'line-plane' | 'lines'
export type Position = 'secant' | 'parallel' | 'same' | 'through' | 'inside' | 'meet' | 'skew'

export const POSITIONS: Record<PairType, Position[]> = {
    planes: ['secant', 'parallel', 'same'],
    'line-plane': ['through', 'parallel', 'inside'],
    lines: ['meet', 'skew', 'parallel', 'same']
}

export interface Line3 {
    point: Vec3
    direction: Vec3
}

export interface Plane3 {
    normal: Vec3
    level: number
}

export interface ClassifyRound {
    type: PairType
    answer: Position
    first: string
    second: string
    lines: Line3[]
    planes: Plane3[]
    working: string
}

const vec = (a: Vec3) => `(${a.map((value) => value + 0).join(',')})`
const tidy = (a: Vec3): Vec3 => [a[0] + 0, a[1] + 0, a[2] + 0]
const parallelTo = (a: Vec3, b: Vec3) => isZero(cross(a, b))
const small = (random: Random, limit: number): Vec3 => [randomInt(random, -limit, limit), randomInt(random, -limit, limit), randomInt(random, -limit, limit)]
const planeLatex = ({ normal, level }: Plane3) => levelLatex(normal, level)
/** A line written in vector form or, when it can be, as a continuous equation */
const lineLatex = (random: Random, { point, direction }: Line3, parameter = 't') =>
    direction.every((value) => value !== 0) && pick(random, [true, false]) ? continuousLatex(point, direction) : `(x,y,{z})=${vec(point)}+${parameter}\\,${vec(direction)}`

/** How a pair really is (the tests check every round with it) */
export function positionOf(type: PairType, lines: Line3[], planes: Plane3[]): Position {
    if (type === 'planes') {
        const [a, b] = planes
        if (!parallelTo(a.normal, b.normal)) return 'secant'
        // Proportional normals: the same plane when the levels follow the same proportion
        const index = [0, 1, 2].find((i) => a.normal[i] !== 0)!
        return a.level * b.normal[index] === b.level * a.normal[index] ? 'same' : 'parallel'
    }
    if (type === 'line-plane') {
        const [{ point, direction }] = lines
        const [{ normal, level }] = planes
        if (dot(direction, normal) !== 0) return 'through'
        return dot(normal, point) === level ? 'inside' : 'parallel'
    }
    const [r, s] = lines
    if (parallelTo(r.direction, s.direction)) return parallelTo(sub(s.point, r.point), r.direction) ? 'same' : 'parallel'
    return det3(sub(s.point, r.point), r.direction, s.direction) === 0 ? 'meet' : 'skew'
}

function planesRound(random: Random, answer: Position): ClassifyRound | null {
    const n1 = small(random, 3)
    if (n1.filter((value) => value !== 0).length < 2) return null
    const d1 = randomInt(random, -4, 4)
    let n2: Vec3
    let d2: number
    if (answer === 'secant') {
        n2 = small(random, 3)
        d2 = randomInt(random, -4, 4)
        if (isZero(n2) || parallelTo(n1, n2)) return null
    } else {
        const k = pick(random, [-1, 2, -2, 3])
        n2 = tidy(scale(k, n1))
        d2 = answer === 'same' ? k * d1 : k * d1 + pick(random, [1, -1, 2, 3])
        if (n2.some((value) => Math.abs(value) > 6)) return null
    }
    const planes = [{ normal: n1, level: d1 }, { normal: n2, level: d2 + 0 }]
    return { type: 'planes', answer, first: planeLatex(planes[0]), second: planeLatex(planes[1]), lines: [], planes, working: `\\vec{n}_1=${vec(n1)}\\qquad\\vec{n}_2=${vec(n2)}` }
}

function linePlaneRound(random: Random, answer: Position): ClassifyRound | null {
    const normal = small(random, 2)
    const direction = small(random, 2)
    const point = small(random, 2)
    if (normal.filter((value) => value !== 0).length < 2 || isZero(direction)) return null
    const along = dot(direction, normal)
    if ((answer === 'through') !== (along !== 0)) return null
    const onPlane = dot(normal, point)
    const level = answer === 'parallel' ? onPlane + pick(random, [1, -1, 2, -2]) : answer === 'inside' ? onPlane : randomInt(random, -4, 4)
    const lines = [{ point, direction }]
    const planes = [{ normal, level }]
    const working = answer === 'through' ? `\\vec{u}\\cdot\\vec{n}=${along}\\neq 0` : `\\vec{u}\\cdot\\vec{n}=0\\qquad\\vec{n}\\cdot A=${onPlane}${onPlane === level ? '=' : '\\neq '}${level}`
    return { type: 'line-plane', answer, first: lineLatex(random, lines[0]), second: planeLatex(planes[0]), lines, planes, working }
}

function linesRound(random: Random, answer: Position): ClassifyRound | null {
    const a = small(random, 2)
    const u = small(random, 2)
    if (isZero(u)) return null
    let b: Vec3
    let v: Vec3
    if (answer === 'meet' || answer === 'skew') {
        v = small(random, 2)
        if (isZero(v) || parallelTo(u, v)) return null
        b = answer === 'meet' ? tidy(sub(add(a, scale(randomInt(random, -1, 1), u)), scale(pick(random, [1, -1]), v))) : small(random, 2)
    } else {
        v = tidy(scale(pick(random, [-1, 2, -2]), u))
        b = answer === 'same' ? tidy(add(a, scale(pick(random, [1, -1, 2]), u))) : tidy(add(a, small(random, 1)))
    }
    if (b.some((value) => Math.abs(value) > 4) || v.some((value) => Math.abs(value) > 4)) return null
    const lines = [{ point: a, direction: u }, { point: b, direction: v }]
    if (positionOf('lines', lines, []) !== answer) return null
    const c = cross(u, v)
    const working = answer === 'meet' || answer === 'skew'
        ? `\\vec{u}\\times\\vec{v}=${vec(c)}\\qquad[\\overrightarrow{AB},\\vec{u},\\vec{v}]=${det3(sub(b, a), u, v) + 0}`
        : `\\vec{v}=${vec(v)}\\parallel\\vec{u}\\qquad\\overrightarrow{AB}=${vec(sub(b, a))}`
    return { type: 'lines', answer, first: lineLatex(random, lines[0]), second: lineLatex(random, lines[1], '\\lambda'), lines, planes: [], working }
}

const TYPES: PairType[] = ['planes', 'line-plane', 'lines']

/** Six rounds of one level, with every position of the level among the answers */
export function createClassifyRounds(random: Random, level: number): ClassifyRound[] {
    const type = TYPES[Math.min(2, Math.max(0, level))]
    const positions = POSITIONS[type]
    const answers = shuffle(random, Array.from({ length: CLASSIFY_ROUNDS }, (_, index) => positions[index % positions.length]))
    const builder = type === 'planes' ? planesRound : type === 'line-plane' ? linePlaneRound : linesRound
    const rounds: ClassifyRound[] = []
    for (const answer of answers) {
        for (let attempt = 0; attempt < 4000; attempt++) {
            const round = builder(random, answer)
            if (round && !rounds.some((other) => other.first === round.first && other.second === round.second)) {
                rounds.push(round)
                break
            }
        }
    }
    return rounds
}
