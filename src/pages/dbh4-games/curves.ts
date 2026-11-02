import { pick, randomInt, shuffle, type Random } from '../../features/unit-v2/games/random.ts'

/* ==========================================================================
   Families of curves for the 4. DBH graph games.
   · Curve laser: targets on the plane and a family with its parameters
     (y = mx + n, y = a(x − h)² + k, y = a|x − h| + k, y = k/(x − h) + v,
     y = b^(x − h) + k, y = log_b(x − h) + k); set them and fire.
   · Which formula?: a graph and four formulas; the wrong ones have the
     shift with the wrong sign, the opening upside down or h and k swapped.
   · When does it double?: b^t = N in a context (growth, half-life); set t.
   ========================================================================== */

export type Family = 'line' | 'parabola' | 'abs' | 'inverse' | 'exp' | 'log'
export interface Curve { family: Family; a: number; h: number; k: number; base: number }

export const PARAMETERS: Record<Family, Array<'a' | 'h' | 'k' | 'base'>> = {
    line: ['a', 'k'],
    parabola: ['a', 'h', 'k'],
    abs: ['a', 'h', 'k'],
    inverse: ['a', 'h', 'k'],
    exp: ['h', 'k'],
    log: ['h', 'k']
}
export const RANGES: Record<'a' | 'h' | 'k' | 'base', [number, number]> = { a: [-6, 6], h: [-5, 5], k: [-6, 6], base: [2, 3] }
/** Where every stepper starts: never a curve of a round */
export const START: Record<Family, Curve> = {
    line: { family: 'line', a: 0, h: 0, k: 0, base: 2 },
    parabola: { family: 'parabola', a: 0, h: 0, k: 0, base: 2 },
    abs: { family: 'abs', a: 0, h: 0, k: 0, base: 2 },
    inverse: { family: 'inverse', a: 0, h: 0, k: 0, base: 2 },
    exp: { family: 'exp', a: 1, h: 0, k: -6, base: 2 },
    log: { family: 'log', a: 1, h: -5, k: -6, base: 2 }
}

/** y at x, or null outside the domain */
export function curveAt({ family, a, h, k, base }: Curve, x: number): number | null {
    if (family === 'line') return a * x + k
    if (family === 'parabola') return a * (x - h) ** 2 + k
    if (family === 'abs') return a * Math.abs(x - h) + k
    if (family === 'inverse') return x === h ? null : a / (x - h) + k
    if (family === 'exp') return base ** (x - h) + k
    return x - h <= 0 ? null : Math.log(x - h) / Math.log(base) + k
}

const minus = (value: number) => (value === 0 ? '' : value > 0 ? `-${value}` : `+${-value}`)
const plus = (value: number) => (value === 0 ? '' : value > 0 ? `+${value}` : `-${-value}`)
const lead = (value: number) => (value === 1 ? '' : value === -1 ? '-' : String(value))

/** The curve as LaTeX: y = 2(x−1)^2+3, y = log_2(x+1)−4… */
export function curveLatex({ family, a, h, k, base }: Curve): string {
    const inside = h === 0 ? 'x' : `x${minus(h)}`
    if (family === 'line') return `y=${a === 0 ? (k === 0 ? '0' : k) : `${lead(a)}x${plus(k)}`}`
    if (family === 'parabola') return `y=${lead(a)}${h === 0 ? 'x^{2}' : `(${inside})^{2}`}${plus(k)}`
    if (family === 'abs') return `y=${lead(a)}|${inside}|${plus(k)}`
    if (family === 'inverse') return `y=\\frac{${a}}{${inside}}${plus(k)}`
    if (family === 'exp') return `y=${base}^{${inside}}${plus(k)}`
    return `y=\\log_{${base}}(${inside})${plus(k)}`
}

/** Whole x where the curve has a whole y, inside the plane */
export function wholePoints(curve: Curve): Array<[number, number]> {
    const points: Array<[number, number]> = []
    for (let x = -6; x <= 6; x += 1) {
        const y = curveAt(curve, x)
        if (y !== null && Number.isInteger(Math.round(y * 1e9) / 1e9) && Math.abs(y) <= 7) points.push([x, Math.round(y)])
    }
    return points
}

/* ---------- Curve laser ---------- */

export const LASER_CURVE_ROUNDS = 5

export interface CurveRound { curve: Curve; targets: Array<[number, number]> }

const nonzero = (min: number, max: number) => Array.from({ length: max - min + 1 }, (_, index) => index + min).filter((value) => value !== 0)

export function randomCurve(random: Random, family: Family): Curve {
    const base = family === 'exp' || family === 'log' ? pick(random, [2, 3]) : 2
    const a = family === 'line' ? pick(random, nonzero(-3, 3)) : family === 'inverse' ? pick(random, [-6, -4, -3, -2, 2, 3, 4, 6]) : family === 'exp' || family === 'log' ? 1 : pick(random, [-2, -1, 1, 2])
    return { family, a, h: family === 'line' ? 0 : randomInt(random, -3, 3), k: randomInt(random, -4, 4), base }
}

const sameCurve = (left: Curve, right: Curve) => left.family === right.family && left.a === right.a && left.h === right.h && left.k === right.k && left.base === right.base
/** True when the curve with these parameters hits every target */
export const hitsAll = (curve: Curve, targets: Array<[number, number]>) => targets.every(([x, y]) => {
    const value = curveAt(curve, x)
    return value !== null && Math.abs(value - y) < 1e-9
})

export function createCurveRound(random: Random, families: Family[]): CurveRound {
    for (;;) {
        const family = pick(random, families)
        const curve = randomCurve(random, family)
        if (sameCurve(curve, START[family])) continue
        const points = wholePoints(curve)
        const count = family === 'line' ? 2 : 3
        if (points.length < count) continue
        // Spread targets; they must decide the curve among every setting of the steppers
        const targets = shuffle(random, points).slice(0, count).sort((p, q) => p[0] - q[0])
        if (!uniqueFit({ curve, targets })) continue
        return { curve, targets }
    }
}

/** No other setting of the steppers hits every target */
export function uniqueFit(round: CurveRound): boolean {
    const { family } = round.curve
    const values = (name: 'a' | 'h' | 'k' | 'base') => (PARAMETERS[family].includes(name) ? Array.from({ length: RANGES[name][1] - RANGES[name][0] + 1 }, (_, index) => index + RANGES[name][0]) : [round.curve[name]])
    let fits = 0
    for (const a of values('a')) for (const h of values('h')) for (const k of values('k')) {
        if (hitsAll({ ...round.curve, a, h, k }, round.targets)) fits += 1
        if (fits > 1) return false
    }
    return fits === 1
}

export const createCurveRounds = (families: Family[][]) => (random: Random, levelIndex: number) => Array.from({ length: LASER_CURVE_ROUNDS }, () => createCurveRound(random, families[levelIndex]))

/* ---------- Which formula? ---------- */

export const MATCH_ROUNDS = 6

export interface MatchRound { curve: Curve; options: string[]; right: number }

export function createMatchRound(random: Random, families: Family[]): MatchRound {
    for (;;) {
        const family = pick(random, families)
        const curve = randomCurve(random, family)
        if (family !== 'line' && curve.h === 0) continue
        if (curve.k === 0) continue
        const traps: Curve[] = family === 'line'
            ? [{ ...curve, a: -curve.a }, { ...curve, k: -curve.k }, { ...curve, a: curve.k, k: curve.a }]
            : [{ ...curve, h: -curve.h }, family === 'exp' || family === 'log' ? { ...curve, k: -curve.k } : { ...curve, a: -curve.a }, { ...curve, h: curve.k, k: curve.h }]
        const options = shuffle(random, [curveLatex(curve), ...traps.map(curveLatex)])
        if (new Set(options).size < 4) continue
        return { curve, options, right: options.indexOf(curveLatex(curve)) }
    }
}

export const createMatchRounds = (families: Family[][]) => (random: Random, levelIndex: number) => Array.from({ length: MATCH_ROUNDS }, () => createMatchRound(random, families[levelIndex]))

/* ---------- When does it double? ---------- */

export const GROWTH_ROUNDS = 5

export type GrowthKind = 'double' | 'triple' | 'half'
export interface GrowthRound {
    kind: GrowthKind
    start: number
    /** Time of one step (hours, years) */
    period: number
    target: number
    /** The answer: how many periods × period */
    time: number
}

export function createGrowthRound(random: Random, levelIndex: number): GrowthRound {
    const kind: GrowthKind = levelIndex === 0 ? 'double' : levelIndex === 1 ? pick(random, ['double', 'triple'] as const) : pick(random, ['half', 'double', 'triple'] as const)
    const factor = kind === 'triple' ? 3 : 2
    const steps = randomInt(random, kind === 'triple' ? 2 : 3, kind === 'triple' ? 4 : 6)
    const period = levelIndex === 0 ? 1 : pick(random, [2, 3, 5])
    const start = kind === 'half' ? pick(random, [64, 128, 256, 512]) : pick(random, [10, 50, 100, 200])
    const target = kind === 'half' ? start / factor ** Math.min(steps, 6) : start * factor ** steps
    return { kind, start, period, target, time: (kind === 'half' ? Math.min(steps, 6) : steps) * period }
}

export const createGrowthRounds = (random: Random, levelIndex: number) => Array.from({ length: GROWTH_ROUNDS }, () => createGrowthRound(random, levelIndex))
export const growthAt = (round: GrowthRound, time: number) => round.start * (round.kind === 'half' ? 0.5 : round.kind === 'triple' ? 3 : 2) ** (time / round.period)
