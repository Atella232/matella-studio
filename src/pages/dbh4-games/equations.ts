import { pick, randomInt, type Random } from '../../features/unit-v2/games/random.ts'
import type { Stars } from '../../features/unit-v2/games/records.ts'
import { binomialLatex, fromRoots, polyLatex, valueAt, type Coefficients } from './polynomials.ts'

/* ==========================================================================
   Equations for the 4. DBH games.
   · Is it a solution? (academic): the candidates an algebraic method gives
     (squaring, clearing denominators, the change t = x²) as chips; the
     learner keeps only the true solutions.
   · Paint the solution (academic): an inequality and the number line cut
     at its roots; the learner switches on the pieces and the ends that
     solve it.
   · Build the equation (applied): two solutions, and b and c of
     x² + bx + c = 0 to set; the parabola shows where it crosses.
   · The crossing point (applied, and Systems): two lines; tap the point
     that solves the system.
   ========================================================================== */

const roundsOf = <Round>(count: number, make: () => Round) => Array.from({ length: count }, make)
const nonzero = (min: number, max: number) => Array.from({ length: max - min + 1 }, (_, index) => index + min).filter((value) => value !== 0)

export function standardStars(rounds: number) {
    return (score: number): Stars => (score >= rounds ? 3 : score >= rounds - 1 ? 2 : score >= Math.ceil(rounds / 2) ? 1 : 0)
}

/* ---------- Is it a solution? ---------- */

export const CHECK_ROUNDS = 5

export interface CheckRound {
    latex: string
    candidates: number[]
    solutions: number[]
}

export function createCheckRound(random: Random, levelIndex: number): CheckRound {
    for (;;) {
        if (levelIndex === 0) {
            // √(x + c) = x + d: squaring gives (x + d)² = x + c, whose roots r need r + d ≥ 0
            const r1 = randomInt(random, -6, 6)
            const r2 = randomInt(random, -6, 6)
            if (r1 === r2 || (r1 + r2) % 2 === 0) continue
            const d = (1 - r1 - r2) / 2
            const c = d * d - r1 * r2
            const solutions = [r1, r2].filter((root) => root + d >= 0 && root + c >= 0)
            if (c === 0 || d === 0) continue
            const inside = `x${c > 0 ? '+' : '-'}${Math.abs(c)}`
            return { latex: `\\sqrt{${inside}}=${binomialLatex(-d)}`, candidates: [r1, r2].sort((a, b) => a - b), solutions: solutions.sort((a, b) => a - b) }
        }
        if (levelIndex === 1) {
            // (x − a)(x − r)/(x − a) = 0 has the candidates a and r, but x = a makes the denominator 0
            const a = pick(random, nonzero(-5, 5))
            const r = pick(random, nonzero(-6, 6))
            const s = pick(random, nonzero(-6, 6))
            if (new Set([a, r, s]).size < 3) continue
            // Half the time the numerator has two good roots
            const excluded = random() < 0.65
            const numerator = excluded ? fromRoots(1, [a, r]) : fromRoots(1, [s, r])
            const candidates = excluded ? [a, r] : [s, r]
            return { latex: `\\frac{${polyLatex(numerator)}}{${binomialLatex(a)}}=0`, candidates: candidates.sort((x, y) => x - y), solutions: candidates.filter((x) => x !== a).sort((x, y) => x - y) }
        }
        // Biquadratic x⁴ + bx² + c = 0 with t = x²: the t values are candidates too, and a negative t gives nothing
        const p = randomInt(random, 1, 4)
        const q = random() < 0.35 ? -randomInt(random, 1, 3) : randomInt(random, 1, 5)
        if (p === Math.abs(q)) continue
        const t1 = p * p
        const t2 = q > 0 ? q * q : q
        const coefficients: Coefficients = [1, 0, -(t1 + t2), 0, t1 * t2]
        const solutions = [p, -p, ...(t2 > 0 ? [q, -q] : [])].sort((a, b) => a - b)
        const candidates = [...new Set([...solutions, t1, t2])].sort((a, b) => a - b)
        if (candidates.length < 4) continue
        return { latex: `${polyLatex(coefficients)}=0`, candidates, solutions }
    }
}

export const createCheckRounds = (random: Random, levelIndex: number) => roundsOf(CHECK_ROUNDS, () => createCheckRound(random, levelIndex))
export const checkRight = (round: CheckRound, chosen: number[]) => chosen.length === round.solutions.length && [...chosen].sort((a, b) => a - b).every((value, index) => value === round.solutions[index])

/* ---------- Paint the solution ---------- */

export const PAINT_ROUNDS = 5

export type Relation = '<' | '<=' | '>' | '>='

export interface PaintRound {
    coefficients: Coefficients
    relation: Relation
    /** The roots, smallest first (none when it never crosses zero) */
    roots: number[]
    /** Level 3 hides the roots on the line */
    hidden: boolean
}

export const relationLatex: Record<Relation, string> = { '<': '<', '<=': '\\le ', '>': '>', '>=': '\\ge ' }
const holds = (value: number, relation: Relation) => (relation === '<' ? value < 0 : relation === '<=' ? value <= 0 : relation === '>' ? value > 0 : value >= 0)

/** The pieces of the line between the roots: −∞…r1, r1…r2, r2…+∞ */
export const pieceCount = (round: PaintRound) => round.roots.length + 1
/** A point inside each piece */
export function pieceSample(round: PaintRound, piece: number): number {
    const { roots } = round
    if (roots.length === 0) return 0
    if (piece === 0) return roots[0] - 1
    if (piece === roots.length) return roots[roots.length - 1] + 1
    return (roots[piece - 1] + roots[piece]) / 2
}
export const pieceSolves = (round: PaintRound, piece: number) => holds(valueAt(round.coefficients, pieceSample(round, piece)), round.relation)
export const rootSolves = (round: PaintRound) => round.relation === '<=' || round.relation === '>='

export function createPaintRound(random: Random, levelIndex: number): PaintRound {
    const relation = pick(random, ['<', '<=', '>', '>='] as const)
    if (levelIndex === 0) {
        // a·x + b with a whole root
        const root = randomInt(random, -6, 6)
        const a = pick(random, [2, 3, -2, -3, 1, -1])
        return { coefficients: [a, -a * root], relation, roots: [root], hidden: false }
    }
    const lead = levelIndex === 2 ? pick(random, [1, -1, 2, -1]) : 1
    if (levelIndex === 2 && random() < 0.2) {
        // No real roots: x² + c with c > 0, or a double root
        if (random() < 0.5) return { coefficients: [lead, 0, lead * randomInt(random, 1, 6)], relation, roots: [], hidden: true }
        const double = randomInt(random, -4, 4)
        return { coefficients: fromRoots(lead, [double, double]), relation, roots: [double], hidden: true }
    }
    const r1 = randomInt(random, -6, 3)
    const r2 = randomInt(random, r1 + 1, 7)
    return { coefficients: fromRoots(lead, [r1, r2]), relation, roots: [r1, r2], hidden: levelIndex === 2 }
}

export const createPaintRounds = (random: Random, levelIndex: number) => roundsOf(PAINT_ROUNDS, () => createPaintRound(random, levelIndex))

export function paintRight(round: PaintRound, pieces: boolean[], ends: boolean[]): boolean {
    return pieces.every((on, piece) => on === pieceSolves(round, piece)) && ends.every((on) => on === rootSolves(round))
}

/** The solution as intervals, for the verdict: (−∞, 2) ∪ [5, +∞), ℝ, ∅ or {3} */
export function solutionLatex(round: PaintRound): string {
    const { roots } = round
    const parts: string[] = []
    const closed = rootSolves(round)
    const number = (value: number) => String(value)
    const everyPiece = Array.from({ length: pieceCount(round) }, (_, piece) => pieceSolves(round, piece)).every(Boolean)
    if (everyPiece && (closed || roots.length === 0)) return '\\mathbb{R}'
    for (let piece = 0; piece < pieceCount(round); piece += 1) {
        if (!pieceSolves(round, piece)) continue
        const left = piece === 0 ? '(-\\infty' : `${closed ? '[' : '('}${number(roots[piece - 1])}`
        const right = piece === roots.length ? '+\\infty)' : `${number(roots[piece])}${closed ? ']' : ')'}`
        parts.push(`${left},\\,${right}`)
    }
    // A root alone, when the pieces on both sides do not solve it
    roots.forEach((root, index) => {
        if (closed && !pieceSolves(round, index) && !pieceSolves(round, index + 1)) parts.push(`\\{${root}\\}`)
    })
    if (parts.length === 0) return '\\varnothing'
    if (parts.length === 1 && parts[0] === '(-\\infty,\\,+\\infty)') return '\\mathbb{R}'
    return parts.join('\\cup ')
}

/* ---------- Build the equation ---------- */

export const BUILD_ROUNDS = 5
export const B_LIMIT = 14
export const C_LIMIT = 40

export interface BuildRound {
    roots: [number, number]
}

export function createBuildRound(random: Random, levelIndex: number): BuildRound {
    for (;;) {
        const range = levelIndex === 0 ? [1, 7] : [-7, 7]
        const r1 = randomInt(random, range[0], range[1])
        const r2 = levelIndex === 2 && random() < 0.3 ? r1 : randomInt(random, range[0], range[1])
        if (levelIndex < 2 && r1 === r2) continue
        if (levelIndex === 1 && r1 > 0 && r2 > 0) continue
        if (Math.abs(r1 + r2) > B_LIMIT || Math.abs(r1 * r2) > C_LIMIT) continue
        return { roots: [Math.min(r1, r2), Math.max(r1, r2)] }
    }
}

export const createBuildRounds = (random: Random, levelIndex: number) => roundsOf(BUILD_ROUNDS, () => createBuildRound(random, levelIndex))
/** x² + bx + c has exactly these roots when b = −(r1 + r2) and c = r1·r2 */
export const buildRight = (round: BuildRound, b: number, c: number) => b === -(round.roots[0] + round.roots[1]) && c === round.roots[0] * round.roots[1]

/* ---------- The crossing point ---------- */

export const CROSS_ROUNDS = 5

export interface LineEquation { a: number; b: number; c: number }
export interface CrossRound {
    lines: [LineEquation, LineEquation]
    point: [number, number]
    /** Write the lines as y = mx + n */
    explicit: boolean
}

/** ax + by = c written as LaTeX; y = mx + n when it can be */
export function equationLatex({ a, b, c }: LineEquation, explicit: boolean): string {
    if (explicit && b === 1) {
        const m = -a
        return `y=${polyLatex([m, c])}`
    }
    const left = polyLatex([a, 0]).replace(/x$/, 'x') + (b === 0 ? '' : `${b > 0 ? '+' : '-'}${Math.abs(b) === 1 ? '' : Math.abs(b)}y`)
    return `${left.replace(/^\+/, '')}=${c}`
}

export function createCrossRound(random: Random, levelIndex: number): CrossRound {
    for (;;) {
        const x = randomInt(random, levelIndex === 0 ? 0 : -5, 5)
        const y = randomInt(random, levelIndex === 0 ? 0 : -5, 5)
        const explicit = levelIndex === 0 || (levelIndex === 2 && random() < 0.5)
        const make = (): LineEquation => {
            const a = pick(random, explicit ? nonzero(-3, 3) : nonzero(-4, 4))
            const b = explicit ? 1 : pick(random, nonzero(-3, 3))
            return { a, b, c: a * x + b * y }
        }
        const first = make()
        const second = make()
        // Not parallel, and the lines inside the plane near the point
        if (first.a * second.b === second.a * first.b) continue
        return { lines: [first, second], point: [x, y], explicit }
    }
}

export const createCrossRounds = (random: Random, levelIndex: number) => roundsOf(CROSS_ROUNDS, () => createCrossRound(random, levelIndex))
export const lineAt = ({ a, b, c }: LineEquation, x: number) => (c - a * x) / b
