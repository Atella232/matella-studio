import { pick, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J3 · Área a ojo (Batxilergoa 1 · Zientziak, Integralak): a shaded
   region on a grid of unit squares and three numbers; which one is its
   area? Counting squares is enough to choose. Level 1, under a straight
   line (a trapezoid or a triangle); level 2, under a parabola; level 3,
   the integral of a curve that crosses the axis, where the options are
   the integral, the area (all the parts counted as positive) and the
   integral with the wrong sign. The wrong numbers of levels 1 and 2 are
   far enough from the right one (×½, ×2, ±2…) to be told apart by eye,
   and the right one is not always the middle one. Plain data.
   ========================================================================== */

export const ESTIMATE_ROUNDS = 6

export type EstimateCurve =
    | { kind: 'line'; m: number; n: number }
    | { kind: 'cap'; h: number; c: number }
    | { kind: 'bowl'; h: number; c: number }

export interface EstimateRound {
    curve: EstimateCurve
    a: number
    b: number
    /** 'area': the shaded area; 'integral': ∫ₐᵇ f(x) dx, with its sign */
    question: 'area' | 'integral'
    options: number[]
    answer: number
}

/** f(x): a line mx + n, a cap c − (x − h)² or a bowl (x − h)² − c */
export function estimateValue(curve: EstimateCurve, x: number): number {
    if (curve.kind === 'line') return curve.m * x + curve.n
    const t = (x - curve.h) ** 2
    return curve.kind === 'cap' ? curve.c - t : t - curve.c
}

/** An antiderivative of f */
function antiderivative(curve: EstimateCurve, x: number): number {
    if (curve.kind === 'line') return (curve.m * x * x) / 2 + curve.n * x
    const t = (x - curve.h) ** 3 / 3
    return curve.kind === 'cap' ? curve.c * x - t : t - curve.c * x
}

const round12 = (value: number) => Math.round(value * 1e9) / 1e9

export const estimateIntegral = (curve: EstimateCurve, a: number, b: number) => round12(antiderivative(curve, b) - antiderivative(curve, a))

/** Where f is 0 strictly between a and b */
export function estimateRoots(curve: EstimateCurve, a: number, b: number): number[] {
    const roots = curve.kind === 'line'
        ? (curve.m === 0 ? [] : [-curve.n / curve.m])
        : [curve.h - Math.sqrt(curve.c), curve.h + Math.sqrt(curve.c)]
    return roots.filter((root) => root > a + 1e-9 && root < b - 1e-9).sort((u, v) => u - v)
}

/** The area between f and the axis: the integral split at the roots, each part positive */
export function estimateArea(curve: EstimateCurve, a: number, b: number): number {
    const cuts = [a, ...estimateRoots(curve, a, b), b]
    let total = 0
    for (let i = 0; i + 1 < cuts.length; i += 1) total += Math.abs(estimateIntegral(curve, cuts[i], cuts[i + 1]))
    return round12(total)
}

/** Two wrong values, each at least ×1.4 away from the right one and from each other */
function farOptions(random: Random, right: number): number[] | null {
    const candidates = shuffle(random, [right / 3, right / 2, right * 2, right * 3, right + 2, right - 2, right + 3]).filter((value) => value > 0.2)
    const picked: number[] = []
    for (const value of candidates) {
        if ([right, ...picked].every((other) => Math.max(value, other) / Math.min(value, other) >= 1.4)) picked.push(round12(value))
        if (picked.length === 2) return picked
    }
    return null
}

function lineRound(random: Random): EstimateRound | null {
    const a = pick(random, [-3, -2, -1, 0])
    const b = a + pick(random, [2, 3, 4])
    const m = pick(random, [-1, -0.5, 0.5, 1])
    const n = pick(random, [0, 1, 2, 3, 4])
    const curve: EstimateCurve = { kind: 'line', m, n }
    const ends = [estimateValue(curve, a), estimateValue(curve, b)]
    if (Math.min(...ends) < 0 || Math.max(...ends) > 4 || Math.max(...ends) < 1) return null
    const right = estimateIntegral(curve, a, b)
    const wrong = farOptions(random, right)
    if (!wrong) return null
    const options = shuffle(random, [right, ...wrong])
    return { curve, a, b, question: 'area', options, answer: options.indexOf(right) }
}

function capRound(random: Random): EstimateRound | null {
    const h = pick(random, [-1, 0, 1])
    const r = pick(random, [1, 1.5, 2])
    const curve: EstimateCurve = { kind: 'cap', h, c: r * r }
    const right = estimateIntegral(curve, h - r, h + r)
    const wrong = farOptions(random, right)
    if (!wrong) return null
    const options = shuffle(random, [right, ...wrong])
    return { curve, a: h - r, b: h + r, question: 'area', options, answer: options.indexOf(right) }
}

function bowlRound(random: Random): EstimateRound | null {
    // Under (x − h)² − c from its vertex outwards, where it stays above the axis: c ≤ 0
    const h = pick(random, [-2, -1, 0])
    const lift = pick(random, [0, 1])
    const width = pick(random, [1, 2])
    const curve: EstimateCurve = { kind: 'bowl', h, c: -lift }
    const [a, b] = [h, h + width]
    // The region must stay on the 8 × 8 plane
    if (Math.max(estimateValue(curve, a), estimateValue(curve, b)) > 4) return null
    const right = estimateIntegral(curve, a, b)
    if (right < 0.3) return null
    const wrong = farOptions(random, right)
    if (!wrong) return null
    const options = shuffle(random, [right, ...wrong])
    return { curve, a, b, question: 'area', options, answer: options.indexOf(right) }
}

function signedRound(random: Random): EstimateRound | null {
    const curve: EstimateCurve = pick(random, [
        { kind: 'line', m: 1, n: pick(random, [-2, -1, 0, 1]) },
        { kind: 'line', m: -1, n: pick(random, [-1, 0, 1, 2]) },
        { kind: 'bowl', h: pick(random, [-1, 0, 1]), c: pick(random, [1, 4]) }
    ] as EstimateCurve[])
    const a = pick(random, [-3, -2, -1, 0])
    const b = a + pick(random, [3, 4, 5])
    if (b > 3) return null
    const roots = estimateRoots(curve, a, b)
    if (!roots.length || Math.max(Math.abs(estimateValue(curve, a)), Math.abs(estimateValue(curve, b))) > 4) return null
    const right = estimateIntegral(curve, a, b)
    const area = estimateArea(curve, a, b)
    // The three must be different: the integral is not 0 and some part lies on each side
    if (Math.abs(right) < 0.25 || Math.abs(Math.abs(right) - area) < 0.25) return null
    const options = shuffle(random, [right, area, round12(-right)])
    return { curve, a, b, question: 'integral', options, answer: options.indexOf(right) }
}

export function createEstimateRounds(random: Random, levelIndex: number): EstimateRound[] {
    const makers = [[lineRound], [capRound, bowlRound], [signedRound]][levelIndex] ?? [lineRound]
    const rounds: EstimateRound[] = []
    for (let attempt = 0; rounds.length < ESTIMATE_ROUNDS && attempt < 6000; attempt += 1) {
        const next = pick(random, makers)(random)
        if (!next) continue
        if (rounds.some((other) => JSON.stringify([other.curve, other.a, other.b]) === JSON.stringify([next.curve, next.a, next.b]))) continue
        rounds.push(next)
    }
    return rounds
}
