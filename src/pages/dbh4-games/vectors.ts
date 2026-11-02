import { pick, randomInt, type Random } from '../../features/unit-v2/games/random.ts'

/* ==========================================================================
   The vectors games of 4. DBH academic:
   · The vector jump: set two numbers and the arrows are drawn after
     checking. Level 1: the vector AB from A to B; level 2: the point B
     from A and the midpoint M (or A and its mirror point); level 3: a and
     b with a·u + b·v = w.
   · Find k: two lines in general form, one with a k. Level 1: parallel;
     level 2: perpendicular; level 3: the line through a point. Both lines
     are drawn after checking.
   ========================================================================== */

export type Pair = [number, number]
export const VECTOR_BOX = { xMin: -6, xMax: 6, yMin: -6, yMax: 6 }
const inBox = ([x, y]: Pair) => Math.abs(x) <= 6 && Math.abs(y) <= 6

/* ---------- The vector jump ---------- */

export const JUMP_ROUNDS = 5

export type JumpRound =
    | { kind: 'vector'; a: Pair; b: Pair; answer: Pair }
    | { kind: 'mirror'; a: Pair; m: Pair; answer: Pair }
    | { kind: 'combination'; u: Pair; v: Pair; w: Pair; answer: Pair }

const point = (random: Random, limit = 5): Pair => [randomInt(random, -limit, limit), randomInt(random, -limit, limit)]

export function createJumpRound(random: Random, levelIndex: number): JumpRound {
    for (;;) {
        if (levelIndex === 0) {
            const [a, b] = [point(random), point(random)]
            const answer: Pair = [b[0] - a[0], b[1] - a[1]]
            // A real jump in both directions, never the start of the steppers
            if (answer[0] === 0 || answer[1] === 0) continue
            return { kind: 'vector', a, b, answer }
        }
        if (levelIndex === 1) {
            const [a, m] = [point(random), point(random, 3)]
            const answer: Pair = [2 * m[0] - a[0], 2 * m[1] - a[1]]
            if (!inBox(answer) || (a[0] === m[0] && a[1] === m[1]) || (answer[0] === 0 && answer[1] === 0)) continue
            return { kind: 'mirror', a, m, answer }
        }
        const u: Pair = [randomInt(random, -3, 3), randomInt(random, -3, 3)]
        const v: Pair = [randomInt(random, -3, 3), randomInt(random, -3, 3)]
        // u and v independent, neither of them zero
        if (u[0] * v[1] - u[1] * v[0] === 0) continue
        const answer: Pair = [pick(random, [-3, -2, -1, 1, 2, 3]), pick(random, [-3, -2, -1, 1, 2, 3])]
        const w: Pair = [answer[0] * u[0] + answer[1] * v[0], answer[0] * u[1] + answer[1] * v[1]]
        if (!inBox(w) || !inBox([answer[0] * u[0], answer[0] * u[1]])) continue
        return { kind: 'combination', u, v, w, answer }
    }
}

export const createJumpRounds = (random: Random, levelIndex: number) => Array.from({ length: JUMP_ROUNDS }, () => createJumpRound(random, levelIndex))

/** Where the learner's two numbers lead: A + v, the point B, or a·u + b·v */
export function jumpLanding(round: JumpRound, [p, q]: Pair): Pair {
    if (round.kind === 'vector') return [round.a[0] + p, round.a[1] + q]
    if (round.kind === 'mirror') return [p, q]
    return [p * round.u[0] + q * round.v[0], p * round.u[1] + q * round.v[1]]
}

/* ---------- Find k ---------- */

export const LINES_ROUNDS = 5
export const K_RANGE = 10

/** ax + by + c = 0, with k standing for one coefficient of the second line */
export interface Line { a: number; b: number; c: number }
export interface LinesRound {
    kind: 'parallel' | 'perpendicular' | 'through'
    fixed: Line
    /** The second line with k in place of the coefficient `slot` */
    moving: Line
    slot: 'a' | 'b' | 'c'
    k: number
    /** Level 3: the point the second line passes through */
    point: Pair | null
}

const nonzero = (min: number, max: number) => Array.from({ length: max - min + 1 }, (_, index) => index + min).filter((value) => value !== 0)
export const withK = (round: LinesRound, k: number): Line => ({ ...round.moving, [round.slot]: k })
export const slopeOf = ({ a, b }: Line) => (b === 0 ? null : -a / b)

export function createLinesRound(random: Random, levelIndex: number): LinesRound {
    for (;;) {
        const fixed: Line = { a: pick(random, nonzero(-4, 4)), b: pick(random, nonzero(-4, 4)), c: randomInt(random, -6, 6) }
        if (levelIndex === 0) {
            // k x + b' y + c' = 0 parallel: k / a = b' / b
            const factor = pick(random, [-2, 2, 3, -3])
            const moving: Line = { a: 0, b: fixed.b * factor, c: randomInt(random, -9, 9) }
            const k = fixed.a * factor
            if (Math.abs(k) > K_RANGE || Math.abs(moving.b) > 12 || moving.c === fixed.c * factor) continue
            return { kind: 'parallel', fixed, moving, slot: 'a', k, point: null }
        }
        if (levelIndex === 1) {
            // k x + b' y + c' = 0 perpendicular: a·k + b·b' = 0
            const bPrime = pick(random, nonzero(-4, 4))
            if ((fixed.b * bPrime) % fixed.a !== 0) continue
            const k = -(fixed.b * bPrime) / fixed.a
            if (k === 0 || Math.abs(k) > K_RANGE) continue
            return { kind: 'perpendicular', fixed, moving: { a: 0, b: bPrime, c: randomInt(random, -6, 6) }, slot: 'a', k, point: null }
        }
        // a' x + b' y + k = 0 through P
        const moving: Line = { a: pick(random, nonzero(-3, 3)), b: pick(random, nonzero(-3, 3)), c: 0 }
        const p: Pair = [randomInt(random, -4, 4), randomInt(random, -4, 4)]
        const k = -(moving.a * p[0] + moving.b * p[1])
        if (k === 0 || Math.abs(k) > K_RANGE) continue
        return { kind: 'through', fixed, moving, slot: 'c', k, point: p }
    }
}

export const createLinesRounds = (random: Random, levelIndex: number) => Array.from({ length: LINES_ROUNDS }, () => createLinesRound(random, levelIndex))

/** ax + by + c = 0 as LaTeX, with k (or a number) in its slot */
export function lineLatex(line: Line, k?: { slot: 'a' | 'b' | 'c'; text: string }): string {
    const term = (value: number, letter: string, first: boolean) => {
        if (value === 0) return ''
        const size = Math.abs(value) === 1 && letter ? '' : String(Math.abs(value))
        return `${value < 0 ? '-' : first ? '' : '+'}${size}${letter}`
    }
    const parts: string[] = []
    for (const [slot, letter] of [['a', 'x'], ['b', 'y'], ['c', '']] as const) {
        if (k?.slot === slot) parts.push(`${parts.length === 0 ? '' : '+'}${k.text}${letter}`)
        else parts.push(term(line[slot], letter, parts.join('') === ''))
    }
    return `${parts.join('')}=0`
}

/** Two points of a line across the box, for drawing */
export function linePoints({ a, b, c }: Line): [Pair, Pair] {
    if (b === 0) return [[-c / a, -7], [-c / a, 7]]
    return [[-7, (-c + 7 * a) / b], [7, (-c - 7 * a) / b]]
}
