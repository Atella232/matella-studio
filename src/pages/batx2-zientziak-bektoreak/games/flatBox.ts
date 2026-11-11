import { randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { cross, det3, type Vec3 } from '../space/vec3.ts'

/* ==========================================================================
   J3 · Kutxa zapaldua (La caja aplastada): u, v and w with a parameter k
   in one coordinate of w. The box they span has volume |A·k + B|, a
   line in k. Levels 1 and 2: the k that flattens the box ([u, v, w] = 0,
   the three coplanar); level 3: the k > 0 that gives a set volume. The
   learner picks k among four: the right one and the typical mistakes (k
   with the sign changed, B left undivided, the value that only gives
   half…). After answering, the box moves to the right k and, when it
   is flat, lies on the plane of u and v. Level 1 uses coordinates 0, 1
   and 2 with a 0 in u and in v; level 2 takes any small vectors.
   ========================================================================== */

export const FLAT_ROUNDS = 6

export interface FlatRound {
    u: Vec3
    v: Vec3
    /** w with the coordinate `index` still to fill with k */
    w: Vec3
    index: 0 | 1 | 2
    /** [u, v, w(k)] = slope·k + offset */
    slope: number
    offset: number
    /** 0: flatten the box; otherwise the volume to reach with k > 0 */
    volume: number
    answer: number
    options: number[]
    /** The k the box shows before answering */
    start: number
}

/** w with its parameter set to k */
export const wAt = (round: Pick<FlatRound, 'w' | 'index'>, k: number): Vec3 => {
    const copy: [number, number, number] = [round.w[0], round.w[1], round.w[2]]
    copy[round.index] = k
    return copy
}

/** [u, v, w(k)] */
export const mixedAt = (round: Pick<FlatRound, 'u' | 'v' | 'w' | 'index'>, k: number) => det3(round.u, round.v, wAt(round, k)) + 0

const small = (random: Random, low = -2, high = 3): [number, number, number] => [randomInt(random, low, high), randomInt(random, low, high), randomInt(random, low, high)]

function make(random: Random, level: number): FlatRound | null {
    // Level 1: small coordinates (0, 1, 2) with a 0 in each vector, so the determinant is short
    const u = level === 0 ? small(random, 0, 2) : small(random)
    const v = level === 0 ? small(random, 0, 2) : small(random)
    if (level === 0 && (!u.includes(0) || !v.includes(0))) return null
    const index = randomInt(random, 0, 2) as 0 | 1 | 2
    const w = small(random, -3, 3)
    w[index] = 0
    const slope = cross(u, v)[index] + 0
    if (slope === 0) return null
    const offset = det3(u, v, w) + 0
    let answer: number
    let volume = 0
    if (level < 2) {
        if (offset % slope !== 0) return null
        answer = -offset / slope + 0
        if (answer === 0) return null
    } else {
        answer = randomInt(random, 1, 4)
        volume = Math.abs(slope * answer + offset)
        if (volume === 0 || volume > 30) return null
        // Only one positive k may give that volume
        const roots = [(volume - offset) / slope, (-volume - offset) / slope].filter((root) => root > 1e-9)
        if (roots.length !== 1) return null
    }
    if (Math.abs(answer) > 6) return null
    const wrong = level < 2
        ? [-answer, offset + 0, answer + (answer > 0 ? 1 : -1), 2 * answer, answer + 2]
        : [(-volume - offset) / slope, volume / slope, answer + 1, answer * 2, volume]
    const options = [answer]
    for (const candidate of wrong) {
        if (options.length === 4) break
        if (!Number.isInteger(candidate) || options.includes(candidate + 0)) continue
        options.push(candidate + 0)
    }
    if (options.length < 4) return null
    const start = [answer + 2, answer - 2, answer + 3].find((value) => Math.abs(mixedAt({ u, v, w, index }, value)) > 0) ?? answer + 1
    return { u, v, w, index, slope, offset, volume, answer, options: shuffle(random, options), start }
}

/** Six rounds of one level, no two alike */
export function createFlatRounds(random: Random, level: number): FlatRound[] {
    const rounds: FlatRound[] = []
    for (let attempt = 0; rounds.length < FLAT_ROUNDS && attempt < 6000; attempt++) {
        const round = make(random, Math.min(2, Math.max(0, level)))
        if (round && !rounds.some((other) => `${other.u}|${other.v}|${other.w}` === `${round.u}|${round.v}|${round.w}`)) rounds.push(round)
    }
    return rounds
}
