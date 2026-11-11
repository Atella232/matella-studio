import { pick, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J3 · Malda ezkutua (Pendiente escondida): a curve given by an equation
   in x and y, a point on it and three lines through the point, A, B and
   C. Only one is the tangent; the other two have the slopes of typical
   mistakes: the normal or a sign changed (level 1, circles), the factor
   of y² forgotten or x and y swapped (level 2, ellipses and hyperbolas
   xy = k), and the product xy derived without its y′ or without y
   (level 3, x² ± xy + y² = d), or else the normal or the slope with its
   sign changed. Every point has whole coordinates, and the three lines
   are at least 12° apart so they can be told apart.
   ========================================================================== */

export const HIDDEN_ROUNDS = 6

/** The curve a x² + b xy + c y² = d (an ellipse when 4ac > b²), or the hyperbola xy = k */
export type HiddenCurve = { kind: 'conic'; a: number; b: number; c: number; d: number } | { kind: 'hyperbola'; k: number }

export interface Slope {
    p: number
    q: number
}

export interface HiddenRound {
    curve: HiddenCurve
    latex: string
    /** y′ in terms of x and y */
    formula: string
    point: [number, number]
    /** The slopes of lines A, B and C */
    slopes: Slope[]
    correct: number
}

const gcd = (m: number, n: number): number => (n === 0 ? Math.abs(m) : gcd(n, m % n))

/** p/q in lowest terms with a positive denominator, or null for a vertical line */
function slope(p: number, q: number): Slope | null {
    if (q === 0) return null
    const g = gcd(p, q) || 1
    const sign = q < 0 ? -1 : 1
    return { p: (sign * p) / g, q: (sign * q) / g }
}

export const slopeValue = (value: Slope) => value.p / value.q

export function slopeLatex(value: Slope): string {
    if (value.q === 1) return String(value.p)
    return `${value.p < 0 ? '-' : ''}\\frac{${Math.abs(value.p)}}{${value.q}}`
}

const term = (coefficient: number, letters: string, first: boolean) => {
    if (coefficient === 0) return ''
    const sign = coefficient < 0 ? '-' : first ? '' : '+'
    return `${sign}${Math.abs(coefficient) === 1 ? '' : Math.abs(coefficient)}${letters}`
}

export function curveLatex(curve: HiddenCurve): string {
    if (curve.kind === 'hyperbola') return `xy=${curve.k}`
    const parts = [term(curve.a, 'x^2', true)]
    parts.push(term(curve.b, 'xy', parts.join('') === ''))
    parts.push(term(curve.c, 'y^2', parts.join('') === ''))
    return `${parts.join('')}=${curve.d}`
}

/** The slope of the tangent at a point of the curve (null when it is vertical) */
export function tangentSlope(curve: HiddenCurve, [x, y]: [number, number]): Slope | null {
    if (curve.kind === 'hyperbola') return slope(-y, x)
    return slope(-(2 * curve.a * x + curve.b * y), curve.b * x + 2 * curve.c * y)
}

export const onCurve = (curve: HiddenCurve, [x, y]: [number, number]) => (curve.kind === 'hyperbola' ? x * y === curve.k : curve.a * x * x + curve.b * x * y + curve.c * y * y === curve.d)

interface Setup {
    curve: HiddenCurve
    points: Array<[number, number]>
    formula: string
    /** The slopes of the typical mistakes at a point */
    mistakes: (point: [number, number]) => Array<Slope | null>
}

const circle = (r2: number, points: Array<[number, number]>): Setup => ({
    curve: { kind: 'conic', a: 1, b: 0, c: 1, d: r2 },
    points,
    formula: "y'=-\\frac{x}{y}",
    // the normal y/x and the sign changed x/y
    mistakes: ([x, y]) => [slope(y, x), slope(x, y)]
})

const both = (points: Array<[number, number]>): Array<[number, number]> => points.flatMap(([x, y]) => [[x, y], [-x, y], [x, -y], [-x, -y]] as Array<[number, number]>)

const ellipse = (a: number, c: number, d: number, points: Array<[number, number]>): Setup => ({
    curve: { kind: 'conic', a, b: 0, c, d },
    points: both(points),
    formula: `y'=-\\frac{${a === 1 ? '' : a}x}{${c === 1 ? '' : c}y}`,
    // the factors forgotten (−x/y) and x and y swapped (−cy/ax)
    mistakes: ([x, y]) => [slope(-x, y), slope(-c * y, a * x)]
})

const hyperbola = (k: number, points: Array<[number, number]>): Setup => ({
    curve: { kind: 'hyperbola', k },
    points: points.flatMap(([x, y]) => [[x, y], [-x, -y]] as Array<[number, number]>),
    formula: "y'=-\\frac{y}{x}",
    // x and y swapped and the sign changed
    mistakes: ([x, y]) => [slope(-x, y), slope(y, x)]
})

const rotated = (b: 1 | -1, d: number, points: Array<[number, number]>): Setup => ({
    curve: { kind: 'conic', a: 1, b, c: 1, d },
    points,
    formula: b === 1 ? "y'=-\\frac{2x+y}{x+2y}" : "y'=-\\frac{2x-y}{-x+2y}",
    // xy derived as x·y′ only, and as y only (without y′)
    mistakes: ([x, y]) => [slope(-2 * x, b * x + 2 * y), slope(-(2 * x + b * y), 2 * y)]
})

const LEVELS: Setup[][] = [
    [
        circle(25, both([[3, 4], [4, 3]])),
        circle(5, both([[1, 2], [2, 1]])),
        circle(10, both([[1, 3], [3, 1]])),
        circle(13, both([[2, 3], [3, 2]]))
    ],
    [
        ellipse(1, 2, 9, [[1, 2]]),
        ellipse(1, 4, 8, [[2, 1]]),
        ellipse(1, 4, 20, [[4, 1], [2, 2]]),
        ellipse(2, 1, 6, [[1, 2]]),
        ellipse(1, 3, 12, [[3, 1]]),
        hyperbola(4, [[1, 4], [4, 1]]),
        hyperbola(6, [[2, 3], [3, 2], [1, 6]])
    ],
    [
        rotated(1, 7, [[1, 2], [2, 1], [-1, -2], [1, -3], [3, -1], [2, -3], [-3, 2]]),
        rotated(1, 3, [[1, 1], [-1, -1]]),
        rotated(-1, 7, [[2, -1], [3, 1], [1, 3], [-2, 1], [-1, -3]]),
        rotated(-1, 4, [[2, 2], [-2, -2]])
    ]
]

/** At least 12° between any two of the lines */
function apart(slopes: Slope[]): boolean {
    const angles = slopes.map((value) => (Math.atan(slopeValue(value)) * 180) / Math.PI)
    return angles.every((one, i) => angles.every((two, j) => i === j || Math.min(Math.abs(one - two), 180 - Math.abs(one - two)) >= 12))
}

function makeRound(random: Random, levelIndex: number): HiddenRound | null {
    const setup = pick(random, LEVELS[levelIndex] ?? LEVELS[0])
    const point = pick(random, setup.points)
    const right = tangentSlope(setup.curve, point)
    if (!right || right.p === 0) return null
    // The mistakes of the curve first, then the normal and the sign changed: the first two that can be told apart
    const candidates = [...setup.mistakes(point), slope(-right.q, right.p), slope(-right.p, right.q)].filter((value): value is Slope => value !== null && value.p !== 0)
    let slopes: Slope[] | null = null
    for (let i = 0; i < candidates.length && !slopes; i++) {
        for (let j = i + 1; j < candidates.length && !slopes; j++) {
            const trial = [right, candidates[i], candidates[j]]
            if (new Set(trial.map(slopeLatex)).size === 3 && apart(trial)) slopes = trial
        }
    }
    if (!slopes) return null
    const shown = shuffle(random, slopes)
    return { curve: setup.curve, latex: curveLatex(setup.curve), formula: setup.formula, point, slopes: shown, correct: shown.indexOf(right) }
}

/** Six different rounds of a level, the tangent not always the same letter */
export function createHiddenRounds(random: Random, levelIndex: number): HiddenRound[] {
    for (let attempt = 0; attempt < 300; attempt += 1) {
        const rounds: HiddenRound[] = []
        for (let tries = 0; rounds.length < HIDDEN_ROUNDS && tries < 400; tries += 1) {
            const next = makeRound(random, levelIndex)
            if (next && !rounds.some((other) => other.latex === next.latex && other.point.join() === next.point.join())) rounds.push(next)
        }
        if (rounds.length === HIDDEN_ROUNDS && new Set(rounds.map((item) => item.correct)).size >= 2) return rounds
    }
    throw new Error('No hidden-slope rounds')
}

/** Points of the curve for the board: a closed loop for an ellipse, two branches for a hyperbola */
export function curveBranches(curve: HiddenCurve, limit: number): Array<Array<[number, number]>> {
    if (curve.kind === 'hyperbola') {
        const branch = (sign: number) => Array.from({ length: 121 }, (_, i) => {
            const x = sign * (Math.abs(curve.k) / limit + (i / 120) * (limit - Math.abs(curve.k) / limit))
            return [x, curve.k / x] as [number, number]
        })
        return [branch(1), branch(-1)]
    }
    return [Array.from({ length: 181 }, (_, i) => {
        const angle = (i / 180) * 2 * Math.PI
        const [u, v] = [Math.cos(angle), Math.sin(angle)]
        const r = Math.sqrt(curve.d / (curve.a * u * u + curve.b * u * v + curve.c * v * v))
        return [r * u, r * v] as [number, number]
    })]
}

/** How far the board reaches on each axis */
export function boardLimit(curve: HiddenCurve): number {
    if (curve.kind === 'hyperbola') return 7
    const reach = Math.max(...curveBranches(curve, 1)[0].map(([x, y]) => Math.max(Math.abs(x), Math.abs(y))))
    return Math.ceil(reach + 1)
}
