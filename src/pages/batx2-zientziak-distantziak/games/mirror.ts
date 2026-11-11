import { pick, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { add, dot, scale, sub, type Vec3 } from '../../batx2-zientziak-bektoreak/space/vec3.ts'
import { fracLatex, inside, isZero, lineLatex, nonZeroCount, planeLatex, same, small, tidy, vec, type Line, type Plane } from './common.ts'

/* ==========================================================================
   J2 · Ispilua (El espejo): a point P and a plane (levels 1 and 2) or a
   line (level 3). Four numbered points on the 3D board: only one is the
   symmetric P′ = 2M − P; the others are the typical mistakes: the foot M
   itself, the vector M − P taken as a point, and P moved the wrong way
   (the sign of t changed). Level 1: a normal along an axis; level 2: any
   plane; level 3: a line. Every coordinate is whole and fits the board.
   ========================================================================== */

export const MIRROR_ROUNDS = 6
export const MIRROR_RANGE = 5

export type MirrorKind = 'right' | 'foot' | 'difference' | 'wrong-way'

export interface MirrorRound {
    p: Vec3
    plane: Plane | null
    line: Line | null
    foot: Vec3
    given: string
    options: Array<{ at: Vec3; kind: MirrorKind }>
    answer: number
    working: string[]
}

const AXES: Vec3[] = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]

/** The four candidates from P and the foot M, in the order right, foot, M − P, wrong way */
export function mirrorCandidates(p: Vec3, foot: Vec3): Array<{ at: Vec3; kind: MirrorKind }> {
    const step = sub(foot, p)
    return [
        { at: tidy(add(foot, step)), kind: 'right' },
        { at: tidy(foot), kind: 'foot' },
        { at: tidy(step), kind: 'difference' },
        { at: tidy(sub(p, step)), kind: 'wrong-way' }
    ]
}

function planeRound(random: Random, level: number): MirrorRound | null {
    const factor = pick(random, [1, -1, 2])
    const normal = level === 0 ? scale(factor, pick(random, AXES)) : small(random, 2)
    if (level > 0 && nonZeroCount(normal) < 2) return null
    const p = small(random, 2)
    // Along an axis the step is 1 or 2 whatever the normal: t = step / |factor|
    const [top, bottom] = level === 0 ? [pick(random, [1, -1, 2, -2]), Math.abs(factor)] : [pick(random, [1, -1]), 1]
    const t = top / bottom
    const foot = add(p, scale(t, normal))
    if (!foot.every(Number.isInteger)) return null
    const D = -dot(normal, foot) + 0
    const plane = { normal: tidy(normal), D }
    const working = [`t=-\\frac{\\vec{n}\\cdot P+D}{|\\vec{n}|^2}=${fracLatex(top, bottom)}`, `M=P+t\\,\\vec{n}=${vec(foot)}`, `P'=2M-P=${vec(tidy(sub(scale(2, foot), p)))}`]
    return finish(random, p, plane, null, tidy(foot), `\\pi\\colon ${planeLatex(plane)}`, working)
}

function lineRound(random: Random): MirrorRound | null {
    const direction = small(random, 2)
    const offset = small(random, 2)
    if (nonZeroCount(direction) < 2 || isZero(offset) || dot(direction, offset) !== 0) return null
    const foot = small(random, 2)
    const s = pick(random, [1, -1])
    const line = { point: tidy(sub(foot, scale(s, direction))), direction }
    const p = tidy(add(foot, offset))
    const working = [`\\overrightarrow{MP}\\cdot\\vec{u}=0\\ \\Rightarrow\\ M=${vec(foot)}`, `P'=2M-P=${vec(tidy(sub(scale(2, foot), p)))}`]
    return finish(random, p, null, line, foot, `r\\colon ${lineLatex(line)}`, working)
}

function finish(random: Random, p: Vec3, plane: Plane | null, line: Line | null, foot: Vec3, given: string, working: string[]): MirrorRound | null {
    const candidates = mirrorCandidates(p, foot)
    if (candidates.some((item) => !inside(item.at, MIRROR_RANGE) || same(item.at, p))) return null
    if (candidates.some((item, index) => candidates.some((other, place) => place < index && same(other.at, item.at)))) return null
    if (line && !inside(line.point, MIRROR_RANGE)) return null
    const options = shuffle(random, candidates)
    return { p, plane, line, foot, given, options, answer: options.findIndex((item) => item.kind === 'right'), working }
}

/** Six rounds of one level */
export function createMirrorRounds(random: Random, level: number): MirrorRound[] {
    const rounds: MirrorRound[] = []
    for (let attempt = 0; rounds.length < MIRROR_ROUNDS && attempt < 20000; attempt++) {
        const next = level >= 2 ? lineRound(random) : planeRound(random, level)
        if (next && !rounds.some((other) => other.given === next.given && same(other.p, next.p))) rounds.push(next)
    }
    return rounds
}

