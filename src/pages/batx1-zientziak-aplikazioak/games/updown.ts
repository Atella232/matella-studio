import { pick, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J1 · Sube o baja (Batxilergoa 1 · Zientziak, Deribatuaren aplikazioak):
   the sign chart of f′ (a strip with + and − between its zeros) and three
   graphs; which one is f? Level 1: parabolas (one change of sign); level
   2: cubics (two changes); level 3: also a zero without a change of sign
   (a cubic that keeps rising through a flat point) and a hole where f
   does not exist (a function a + k/(x − h)). The wrong graphs are the
   same curve upside down and the curve with its turning points moved.
   Plain data: a graph is { kind, a, h, k }.
   ========================================================================== */

export const UPDOWN_ROUNDS = 6

export type UpdownKind = 'parabola' | 'cubic' | 'flat' | 'hyperbola'

/** parabola: a(x − h)² + k; cubic: a((x − h)³ − 3(x − h)) + k; flat: a(x − h)³ + k; hyperbola: k + a/(x − h) */
export interface UpdownGraph {
    kind: UpdownKind
    a: number
    h: number
    k: number
}

export function updownValue({ kind, a, h, k }: UpdownGraph, x: number): number {
    const t = x - h
    if (kind === 'parabola') return a * t * t + k
    if (kind === 'cubic') return a * (t ** 3 - 3 * t) + k
    if (kind === 'flat') return a * t ** 3 / 2 + k
    return k + a / t
}

export function updownSlope({ kind, a, h }: UpdownGraph, x: number): number {
    const t = x - h
    if (kind === 'parabola') return 2 * a * t
    if (kind === 'cubic') return a * (3 * t * t - 3)
    if (kind === 'flat') return (3 * a * t * t) / 2
    return -a / (t * t)
}

/** Where f′ is 0 or does not exist, left to right */
export function updownCuts(graph: UpdownGraph): number[] {
    if (graph.kind === 'cubic') return [graph.h - 1, graph.h + 1]
    return [graph.h]
}

/** The sign chart of f′ on [−4, 4]: pieces with their sign, and the marks between them (0 or a hole) */
export function signChart(graph: UpdownGraph): { pieces: Array<{ from: number; to: number; sign: 1 | -1 }>; marks: Array<{ x: number; hole: boolean }> } {
    const cuts = updownCuts(graph)
    const ends = [-4, ...cuts, 4]
    const pieces = ends.slice(0, -1).map((from, index) => {
        const to = ends[index + 1]
        return { from, to, sign: (updownSlope(graph, (from + to) / 2) > 0 ? 1 : -1) as 1 | -1 }
    })
    return { pieces, marks: cuts.map((x) => ({ x, hole: graph.kind === 'hyperbola' })) }
}

/** Two charts are the same when every piece has the same sign */
export function sameChart(p: UpdownGraph, q: UpdownGraph): boolean {
    for (let x = -3.9; x <= 3.9; x += 0.1) {
        const sp = Math.sign(updownSlope(p, x))
        const sq = Math.sign(updownSlope(q, x))
        if (Number.isFinite(sp) && Number.isFinite(sq) && Math.abs(updownSlope(p, x)) > 1e-6 && Math.abs(updownSlope(q, x)) > 1e-6 && sp !== sq) return false
    }
    return updownCuts(p).join() === updownCuts(q).join() && (p.kind === 'hyperbola') === (q.kind === 'hyperbola')
}

export interface UpdownRound {
    f: UpdownGraph
    options: UpdownGraph[]
    answer: number
}

function randomGraph(random: Random, level: number): UpdownGraph {
    const kind: UpdownKind = level === 0 ? 'parabola' : level === 1 ? 'cubic' : pick(random, ['cubic', 'flat', 'hyperbola', 'parabola'] as const)
    const a = pick(random, kind === 'hyperbola' ? [-2, -1, 1, 2] : [-1, -0.5, 0.5, 1])
    const h = pick(random, [-1, 0, 1])
    const k = kind === 'parabola' ? (a > 0 ? pick(random, [-2, -1]) : pick(random, [1, 2])) : pick(random, [-1, 0, 1])
    return { kind, a, h, k }
}

/** The same curve with its turning points (or its hole) somewhere else */
function moved(graph: UpdownGraph, random: Random): UpdownGraph {
    // Two units away at least, so that the small graphs tell them apart
    const h = pick(random, [-2, -1, 0, 1, 2].filter((value) => Math.abs(value - graph.h) >= 2))
    return { ...graph, h }
}

function round(random: Random, level: number): UpdownRound | null {
    const f = randomGraph(random, level)
    const flipped: UpdownGraph = { ...f, a: -f.a }
    // In level 3 the third graph may be the other kind of cubic: extrema where f has a flat point, or the other way round
    const swap = level === 2 && (f.kind === 'cubic' || f.kind === 'flat') && random() < 0.5
    const third: UpdownGraph = swap ? { ...f, kind: f.kind === 'flat' ? 'cubic' : 'flat' } : moved(f, random)
    const options = shuffle(random, [f, flipped, third])
    if (options.filter((option) => sameChart(option, f)).length !== 1) return null
    return { f, options, answer: options.indexOf(f) }
}

export function createUpdownRounds(random: Random, levelIndex: number): UpdownRound[] {
    const rounds: UpdownRound[] = []
    for (let attempt = 0; rounds.length < UPDOWN_ROUNDS && attempt < 4000; attempt += 1) {
        const next = round(random, levelIndex)
        if (!next) continue
        const key = JSON.stringify(next.f)
        if (rounds.some((other) => JSON.stringify(other.f) === key)) continue
        rounds.push(next)
    }
    return rounds
}

/** The curve in LaTeX, for the explanation */
export function updownLatex({ kind, a, h, k }: UpdownGraph): string {
    const shifted = h === 0 ? 'x' : `(x${h > 0 ? '-' : '+'}${Math.abs(h)})`
    const constant = k === 0 ? '' : `${k > 0 ? '+' : '-'}${Math.abs(k)}`
    if (kind === 'hyperbola') {
        const fractionPart = `\\frac{${Math.abs(a)}}{${h === 0 ? 'x' : shifted.slice(1, -1)}}`
        return k === 0 ? `${a < 0 ? '-' : ''}${fractionPart}` : `${k}${a < 0 ? '-' : '+'}${fractionPart}`
    }
    const coefficient = (value: number) => (value === 1 ? '' : value === -1 ? '-' : value === 0.5 ? '\\frac{1}{2}' : value === -0.5 ? '-\\frac{1}{2}' : String(value))
    if (kind === 'parabola') return `${coefficient(a)}${shifted}^2${constant}`
    if (kind === 'flat') return `${coefficient(a / 2)}${shifted}^3${constant}`
    const inner = h === 0 ? 'x^3-3x' : `${shifted}^3-3${shifted}`
    return `${coefficient(a)}\\left(${inner}\\right)${constant}`
}

