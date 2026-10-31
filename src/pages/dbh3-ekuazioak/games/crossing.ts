import type { Stars } from '../../../features/unit-v2/games/records.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J3 · Zuzenen gurutzea (El cruce de rectas): two lines ax + by = c on a
   grid from −5 to 5. The learner taps the point where they cross, or says
   that they are parallel (no solution) or the same line (infinitely
   many). Level 1 draws the lines; level 2 shows only the equations and
   draws them after the answer; level 3 brings parallel and identical
   lines into the mix.
   ========================================================================== */

export const CROSSING_ROUNDS = 8
export const GRID = 5

export interface Line {
    a: number
    b: number
    c: number
}

export type CrossingKind = 'one' | 'none' | 'infinite'

export interface CrossingRound {
    lines: [Line, Line]
    kind: CrossingKind
    /** The crossing point when there is one */
    point: [number, number] | null
}

export function lineLatex({ a, b, c }: Line): string {
    const first = a === 0 ? '' : a === 1 ? 'x' : a === -1 ? '-x' : `${a}x`
    const second = b === 0 ? '' : `${first === '' ? (b < 0 ? '-' : '') : b < 0 ? '-' : '+'}${Math.abs(b) === 1 ? '' : Math.abs(b)}y`
    return `${first}${second}=${c}`
}

const COEFFICIENTS = [-3, -2, -1, 1, 2, 3]

/** A line through (x, y) with small whole coefficients */
function lineThrough(random: Random, x: number, y: number): Line {
    // x is written with a positive coefficient: −2x − y = −6 is shown as 2x + y = 6
    const a = Math.abs(pick(random, COEFFICIENTS))
    const b = pick(random, COEFFICIENTS)
    return { a, b, c: a * x + b * y }
}

function one(random: Random): CrossingRound {
    for (;;) {
        const x = randomInt(random, -4, 4)
        const y = randomInt(random, -4, 4)
        const first = lineThrough(random, x, y)
        const second = lineThrough(random, x, y)
        if (first.a * second.b === first.b * second.a) continue
        return { lines: [first, second], kind: 'one', point: [x, y] }
    }
}

/** The same line written twice: the second is the first times k */
function identical(random: Random): CrossingRound {
    const first = lineThrough(random, randomInt(random, -3, 3), randomInt(random, -3, 3))
    const k = pick(random, [-2, 2, 3])
    return { lines: [first, { a: k * first.a, b: k * first.b, c: k * first.c }], kind: 'infinite', point: null }
}

/** Two parallel lines: the same a and b, another c */
function parallel(random: Random): CrossingRound {
    const first = lineThrough(random, randomInt(random, -3, 3), randomInt(random, -3, 3))
    const shift = pick(random, [-3, -2, -1, 1, 2, 3])
    return { lines: [first, { a: first.a, b: first.b, c: first.c + shift * (Math.abs(first.a) + Math.abs(first.b)) }], kind: 'none', point: null }
}

export function createCrossingRounds(random: Random, level: number): CrossingRound[] {
    // Level 3 has two parallel pairs and two identical ones among the eight
    const plan = level === 2 ? [one, parallel, one, identical, one, parallel, identical, one] : Array.from({ length: CROSSING_ROUNDS }, () => one)
    const rounds: CrossingRound[] = []
    for (const make of plan) {
        for (;;) {
            const next = make(random)
            const key = next.lines.map(lineLatex).join(';')
            if (rounds.some((other) => other.lines.map(lineLatex).join(';') === key)) continue
            rounds.push(next)
            break
        }
    }
    return level === 2 ? shuffle(random, rounds) : rounds
}

/** The answer the learner gives: a point or a kind */
export type CrossingAnswer = { point: [number, number] } | { kind: 'none' | 'infinite' }

export function crossingRight(round: CrossingRound, answer: CrossingAnswer): boolean {
    if ('kind' in answer) return round.kind === answer.kind
    return round.point !== null && round.point[0] === answer.point[0] && round.point[1] === answer.point[1]
}

export function crossingStars(score: number): Stars {
    if (score >= 8) return 3
    if (score >= 6) return 2
    if (score >= 4) return 1
    return 0
}
