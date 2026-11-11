import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { dot, scale, sub, type Vec3 } from '../../batx2-zientziak-bektoreak/space/vec3.ts'
import { inside, lengthOf, lineLatex, lineSquare, planeLatex, planeValue, root, small, tidy, WHOLE_NORMALS, WHOLE_OFFSETS, type Line, type Plane } from './common.ts'

/* ==========================================================================
   J3 · Nor dago hurbilago? (¿Quién está más cerca?): a point P and two
   objects; the learner works out both distances and says which one is
   nearer, or that they are at the same distance. Level 1: two planes;
   level 2: a plane and a line; level 3: two lines. The distances are
   whole by construction (normals of length 1 or 3, offsets of whole
   length), so the comparison is exact. After answering, the board shows
   the perpendiculars from P.
   ========================================================================== */

export const NEARER_ROUNDS = 6
export const NEARER_RANGE = 5

export type Nearer = 'first' | 'second' | 'same'
export const NEARER_ANSWERS: Nearer[] = ['first', 'second', 'same']

export type NearObject = { kind: 'plane'; plane: Plane } | { kind: 'line'; line: Line }

export interface NearerRound {
    p: Vec3
    objects: [NearObject, NearObject]
    names: [string, string]
    latex: [string, string]
    distances: [number, number]
    feet: [Vec3, Vec3]
    answer: Nearer
    working: [string, string]
}

/** The distance from P to an object, exact (the tests check every round with it) */
export function distanceTo(object: NearObject, p: Vec3): number {
    if (object.kind === 'plane') return Math.abs(planeValue(object.plane, p)) / Math.sqrt(dot(object.plane.normal, object.plane.normal))
    const [top, bottom] = lineSquare(object.line, p)
    return Math.sqrt(top / bottom)
}

function planeAt(random: Random, p: Vec3, distance: number): { object: NearObject; foot: Vec3 } {
    const normal = pick(random, WHOLE_NORMALS)
    const size = lengthOf(normal)
    const side = pick(random, [1, -1])
    // n·P + D = side·distance·|n|, and the foot is P − side·distance·n / |n|
    const D = side * distance * size - dot(normal, p) + 0
    return { object: { kind: 'plane', plane: { normal, D } }, foot: sub(p, scale((side * distance) / size, normal)) }
}

function lineAt(random: Random, p: Vec3, distance: number): { object: NearObject; foot: Vec3 } | null {
    const offset = pick(random, WHOLE_OFFSETS.filter((item) => lengthOf(item) === distance))
    const direction = small(random, 2)
    if (direction.filter((value) => value !== 0).length < 2 || dot(direction, offset) !== 0) return null
    const foot = tidy(sub(p, offset))
    const point = tidy(sub(foot, scale(pick(random, [1, -1]), direction)))
    if (!inside(point, NEARER_RANGE) || !inside(foot, NEARER_RANGE)) return null
    return { object: { kind: 'line', line: { point, direction } }, foot }
}

const KINDS: Array<['plane' | 'line', 'plane' | 'line']> = [['plane', 'plane'], ['plane', 'line'], ['line', 'line']]

function workingFor(object: NearObject, name: string, p: Vec3, distance: number): string {
    if (object.kind === 'plane') {
        const value = planeValue(object.plane, p)
        const size = dot(object.plane.normal, object.plane.normal)
        return size === 1 ? `d(P,${name})=|${value}|=${distance}` : `d(P,${name})=\\frac{|${value}|}{${root(size)}}=${distance}`
    }
    const [top, bottom] = lineSquare(object.line, p)
    return `d(P,${name})=\\frac{|\\overrightarrow{AP}\\times\\vec{u}|}{|\\vec{u}|}=\\frac{${root(top)}}{${root(bottom)}}=${distance}`
}

function round(random: Random, level: number, answer: Nearer): NearerRound | null {
    const p = small(random, 2)
    const first = randomInt(random, 1, 3)
    const second = answer === 'same' ? first : answer === 'first' ? first + randomInt(random, 1, 2) : first - 1
    if (second < 1 || second > 4) return null
    const kinds = KINDS[Math.min(2, Math.max(0, level))]
    const built = kinds.map((kind, index) => (kind === 'plane' ? planeAt(random, p, [first, second][index]) : lineAt(random, p, [first, second][index])))
    if (built.some((item) => item === null)) return null
    const [one, two] = built as Array<{ object: NearObject; foot: Vec3 }>
    const names: [string, string] = level === 0 ? ['\\pi_1', '\\pi_2'] : level === 1 ? ['\\pi', 'r'] : ['r', 's']
    const latexOf = (object: NearObject, name: string, parameter: string) => `${name}\\colon ${object.kind === 'plane' ? planeLatex(object.plane) : lineLatex(object.line, parameter)}`
    const latex: [string, string] = [latexOf(one.object, names[0], 't'), latexOf(two.object, names[1], level === 2 ? '\\lambda' : 't')]
    if (latex[0] === latex[1]) return null
    return {
        p,
        objects: [one.object, two.object],
        names,
        latex,
        distances: [first, second],
        feet: [one.foot, two.foot],
        answer,
        working: [workingFor(one.object, names[0], p, first), workingFor(two.object, names[1], p, second)]
    }
}

/** Six rounds of one level: two of each answer */
export function createNearerRounds(random: Random, level: number): NearerRound[] {
    const answers = shuffle(random, Array.from({ length: NEARER_ROUNDS }, (_, index) => NEARER_ANSWERS[index % 3]))
    const rounds: NearerRound[] = []
    for (const answer of answers) {
        for (let attempt = 0; attempt < 4000; attempt++) {
            const next = round(random, level, answer)
            if (next && !rounds.some((other) => other.latex[0] === next.latex[0] && other.latex[1] === next.latex[1])) {
                rounds.push(next)
                break
            }
        }
    }
    return rounds
}

