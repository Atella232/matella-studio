import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { cross, dot, isZero, norm, parallel, scale, type Vec3 } from '../space/vec3.ts'

/* ==========================================================================
   J2 · Zein da u × v? (¿Cuál es u×v?): two vectors on the 3D board and
   four arrows from the origin, A to D, all of the same length so that
   only the direction counts. One is u × v; the others are v × u (the
   order swapped), u × v with the minus of the j forgotten and a vector
   that is perpendicular to u but not to v. The learner turns the board,
   uses the right hand and picks the letter. Level 1: u and v along two
   axes; level 2: u and v in a coordinate plane or close to it; level 3:
   any small vectors, with the coordinates of the four arrows written.
   ========================================================================== */

export const CROSS_ROUNDS = 6
export const CROSS_LETTERS = ['A', 'B', 'C', 'D'] as const
export type CrossLetter = (typeof CROSS_LETTERS)[number]
/** Every candidate arrow is drawn with this length */
export const CROSS_ARROW = 3.2

export type CandidateKind = 'right' | 'swapped' | 'j-forgotten' | 'one-only'

export interface CrossCandidate {
    letter: CrossLetter
    kind: CandidateKind
    /** The vector the arrow shows (its true size; the board draws its direction) */
    vector: Vec3
}

export interface CrossRound {
    u: Vec3
    v: Vec3
    candidates: CrossCandidate[]
    answer: CrossLetter
    /** Level 3 writes the coordinates of the candidates */
    showCoordinates: boolean
}

const AXES: Vec3[] = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]

/** The arrow of a candidate as drawn: same direction, length CROSS_ARROW */
export const drawnArrow = (vector: Vec3): Vec3 => scale(CROSS_ARROW / norm(vector), vector)

/** A vector perpendicular to u but not to v, not parallel to u × v */
function perpendicularToOne(random: Random, u: Vec3, v: Vec3): Vec3 | null {
    const n = cross(u, v)
    for (let attempt = 0; attempt < 40; attempt++) {
        const t: Vec3 = [randomInt(random, -2, 2), randomInt(random, -2, 2), randomInt(random, -2, 2)]
        const candidate = cross(u, t)
        if (isZero(candidate) || dot(candidate, v) === 0 || parallel(candidate, n)) continue
        return candidate
    }
    return null
}

function pair(random: Random, level: number): [Vec3, Vec3] | null {
    if (level === 0) {
        const [i, j] = shuffle(random, [0, 1, 2]).slice(0, 2)
        return [scale(pick(random, [1, 2, -1, -2]), AXES[i]), scale(pick(random, [1, 2, 3, -1, -2]), AXES[j])]
    }
    const u: [number, number, number] = [randomInt(random, -2, 3), randomInt(random, -2, 3), randomInt(random, -2, 3)]
    const v: [number, number, number] = [randomInt(random, -2, 3), randomInt(random, -2, 3), randomInt(random, -2, 3)]
    if (level === 1) {
        // One coordinate plane for both, or one of them on an axis
        const index = randomInt(random, 0, 2)
        u[index] = 0
        v[index] = pick(random, [0, 0, 1])
    }
    if (isZero(u) || isZero(v) || parallel(u, v)) return null
    return [u, v]
}

function make(random: Random, level: number): CrossRound | null {
    const made = pair(random, level)
    if (!made) return null
    const [u, v] = made
    const n = cross(u, v)
    const forgotten: Vec3 = [n[0], -n[1], n[2]]
    const one = perpendicularToOne(random, u, v)
    // The forgotten minus changes nothing when the j coordinate is 0: then a second «one only» arrow
    const fourth = n[1] !== 0 ? { kind: 'j-forgotten' as const, vector: forgotten } : (() => {
        const other = perpendicularToOne(random, v, u)
        return other && { kind: 'one-only' as const, vector: other }
    })()
    if (!one || !fourth) return null
    const raw: Array<{ kind: CandidateKind; vector: Vec3 }> = [
        { kind: 'right', vector: n },
        { kind: 'swapped', vector: scale(-1, n) },
        { kind: 'one-only', vector: one },
        fourth
    ]
    // Four different directions, far enough apart to be told apart on the board
    for (let a = 0; a < raw.length; a++) {
        for (let b = a + 1; b < raw.length; b++) {
            const cosine = dot(raw[a].vector, raw[b].vector) / (norm(raw[a].vector) * norm(raw[b].vector))
            if (cosine > 0.94) return null
        }
    }
    const order = shuffle(random, raw)
    const candidates = order.map((candidate, index) => ({ ...candidate, letter: CROSS_LETTERS[index], vector: candidate.vector.map((value) => value + 0) as unknown as Vec3 }))
    return { u, v, candidates, answer: candidates.find((candidate) => candidate.kind === 'right')!.letter, showCoordinates: level === 2 }
}

/** Six rounds of one level, no two with the same pair */
export function createCrossRounds(random: Random, level: number): CrossRound[] {
    const rounds: CrossRound[] = []
    for (let attempt = 0; rounds.length < CROSS_ROUNDS && attempt < 4000; attempt++) {
        const round = make(random, Math.min(2, Math.max(0, level)))
        if (round && !rounds.some((other) => `${other.u}|${other.v}` === `${round.u}|${round.v}`)) rounds.push(round)
    }
    return rounds
}

