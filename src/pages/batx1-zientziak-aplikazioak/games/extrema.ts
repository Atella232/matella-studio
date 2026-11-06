import { pick, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J2 · Caza los extremos (Batxilergoa 1 · Zientziak, Deribatuaren
   aplikazioak): the graph is f′, not f. Three points A, B and C on the
   x-axis; where does f have a maximum, a minimum, or f′ = 0 without an
   extremum? Level 1: f′ is a parabola (two simple zeros, and the vertex
   as a decoy); level 2: a cubic with three simple zeros; level 3: a
   double zero, where f′ touches the axis without crossing it. f′ is
   s·Π(x − r)^m, scaled so that the part around the zeros fills the
   plane (a double zero must be seen to touch the axis). Plain data.
   ========================================================================== */

export const EXTREMA_ROUNDS = 6

export interface Root {
    x: number
    /** 1: f′ crosses the axis; 2: it only touches it */
    m: 1 | 2
}

export type ExtremaQuestion = 'maximum' | 'minimum' | 'flat'

export interface ExtremaRound {
    roots: Root[]
    /** The sign of the leading coefficient */
    s: 1 | -1
    /** The three points, left to right: A, B, C */
    xs: number[]
    question: ExtremaQuestion
    answer: number
}

const product = (roots: Root[], x: number) => roots.reduce((value, root) => value * (x - root.x) ** root.m, 1)

/** The span around the zeros that has to be seen well: from just before the first to just after the last */
export function zeroSpan(roots: Root[]): [number, number] {
    const xs = roots.map((root) => root.x)
    return [Math.min(...xs) - 0.3, Math.max(...xs) + 0.3]
}

/** The largest |Π(x − r)^m| around the zeros: there f′ is drawn big; further out it may leave the plane */
function size(roots: Root[]): number {
    const [from, to] = zeroSpan(roots)
    let top = 0
    for (let x = from; x <= to + 1e-4; x += 0.01) top = Math.max(top, Math.abs(product(roots, x)))
    return top || 1
}

/** f′ at x, scaled so that its largest value around the zeros is 3 */
export function primeValue(round: Pick<ExtremaRound, 'roots' | 's'>, x: number): number {
    return (round.s * 3 * product(round.roots, x)) / size(round.roots)
}

/** What f does at a point: a maximum (f′ from + to −), a minimum (− to +), flat (f′ = 0, no change) or nothing (f′ ≠ 0) */
export function pointKind(round: Pick<ExtremaRound, 'roots' | 's'>, x: number): ExtremaQuestion | 'none' {
    const left = primeValue(round, x - 1e-3)
    const right = primeValue(round, x + 1e-3)
    if (Math.abs(primeValue(round, x)) > 1e-9) return 'none'
    if (left > 0 && right < 0) return 'maximum'
    if (left < 0 && right > 0) return 'minimum'
    return 'flat'
}

const POINT_NAMES = ['A', 'B', 'C'] as const
export const extremaPointName = (index: number) => POINT_NAMES[index]

function round(random: Random, level: number): ExtremaRound | null {
    const s = pick(random, [1, -1] as const)
    let roots: Root[]
    let xs: number[]
    if (level === 0) {
        const [p, q] = shuffle(random, [-2, -1, 0, 1, 2]).slice(0, 2).sort((u, v) => u - v)
        if (q - p < 2) return null
        roots = [{ x: p, m: 1 }, { x: q, m: 1 }]
        xs = [p, (p + q) / 2, q]
    } else if (level === 1) {
        // Evenly spaced, so that both bumps of f′ show well
        const picked = pick(random, [[-2, 0, 2], [-1, 0, 1], [-2, -1, 0], [0, 1, 2], [-3, -1, 1], [-1, 1, 3]])
        roots = picked.map((x) => ({ x, m: 1 as const }))
        xs = picked
    } else {
        const [d, r] = shuffle(random, [-2, -1, 0, 1, 2]).slice(0, 2)
        if (Math.abs(d - r) < 2) return null
        roots = [{ x: d, m: 2 }, { x: r, m: 1 }]
        // A third point where f′ ≠ 0, away from the other two
        const decoy = pick(random, [-2.5, -1.5, -0.5, 0.5, 1.5, 2.5].filter((x) => Math.abs(x - d) >= 1 && Math.abs(x - r) >= 1))
        if (decoy === undefined) return null
        xs = [d, r, decoy].sort((u, v) => u - v)
    }
    const kinds = xs.map((x) => pointKind({ roots, s }, x))
    const asks: ExtremaQuestion[] = (['maximum', 'minimum', 'flat'] as const).filter((kind) => kinds.filter((item) => item === kind).length === 1)
    if (!asks.length) return null
    const question = pick(random, asks)
    return { roots, s, xs, question, answer: kinds.indexOf(question) }
}

export function createExtremaRounds(random: Random, levelIndex: number): ExtremaRound[] {
    const rounds: ExtremaRound[] = []
    for (let attempt = 0; rounds.length < EXTREMA_ROUNDS && attempt < 4000; attempt += 1) {
        const next = round(random, levelIndex)
        if (!next) continue
        const key = JSON.stringify([next.roots, next.s, next.question])
        if (rounds.some((other) => JSON.stringify([other.roots, other.s, other.question]) === key)) continue
        rounds.push(next)
    }
    return rounds
}
