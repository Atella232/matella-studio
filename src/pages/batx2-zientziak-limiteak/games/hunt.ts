import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J3 · Ehizatu erroak (Caza raíces): a polynomial (or an equation between
   two curves) and the six intervals [n, n + 1] from −3 to 3. The learner
   marks every interval where Bolzano ensures a root, and no other: the
   ones where the sign changes between n and n + 1. Level 1: a cubic with
   one change; level 2: a cubic with three; level 3: an equation f = g,
   with h = f − g a quartic or a cubic. No value at a whole number is 0,
   so every sign is clear.
   ========================================================================== */

export const HUNT_ROUNDS = 6
export const HUNT_STARTS = [-3, -2, -1, 0, 1, 2]

export interface HuntRound {
    /** What is shown: f(x) = …, or the equation */
    latex: string
    /** h, the function whose sign is looked at */
    h: (x: number) => number
    /** The h written out, for the explanation */
    hLatex: string
    /** The starts n of the intervals [n, n + 1] with a change of sign */
    right: number[]
}

const signed = (value: number) => (value < 0 ? `-${-value}` : `+${value}`)
const term = (c: number, power: string) => (c === 0 ? '' : `${c < 0 ? '-' : '+'}${Math.abs(c) === 1 ? '' : Math.abs(c)}${power}`)
const constant = (c: number) => (c === 0 ? '' : signed(c))

export const changesOf = (h: (x: number) => number) => HUNT_STARTS.filter((n) => h(n) * h(n + 1) < 0)
const clearAtWholes = (h: (x: number) => number) => [-3, -2, -1, 0, 1, 2, 3].every((n) => Math.abs(h(n)) > 1e-9)

/** x³ + bx² + cx + d */
function cubic(random: Random, changes: number): HuntRound | null {
    const b = randomInt(random, -2, 2)
    const c = randomInt(random, -6, 3)
    const d = randomInt(random, -5, 5)
    const h = (x: number) => x ** 3 + b * x * x + c * x + d
    if (!clearAtWholes(h)) return null
    const right = changesOf(h)
    if (right.length !== changes) return null
    const hLatex = `x^3${term(b, 'x^2')}${term(c, 'x')}${constant(d)}`
    return { latex: `f(x)=${hLatex}`, h, hLatex, right }
}

/** f = g with h = f − g a quartic (x⁴ + 1 = bx²…) or a cubic against a line (x³ = bx + c) */
function equation(random: Random): HuntRound | null {
    if (randomInt(random, 0, 1) === 0) {
        const b = randomInt(random, 3, 5)
        const c = randomInt(random, 1, 3)
        const h = (x: number) => x ** 4 - b * x * x + c
        if (!clearAtWholes(h) || changesOf(h).length < 2) return null
        return { latex: `x^4${signed(c)}=${b}x^2`, h, hLatex: `x^4-${b}x^2${signed(c)}`, right: changesOf(h) }
    }
    const b = randomInt(random, 2, 6)
    const c = pick(random, [-2, -1, 1, 2])
    const h = (x: number) => x ** 3 - b * x - c
    if (!clearAtWholes(h) || changesOf(h).length < 2) return null
    return { latex: `x^3=${b}x${signed(c)}`, h, hLatex: `x^3-${b}x${signed(-c)}`, right: changesOf(h) }
}

export function isHuntPick(round: HuntRound, marked: number[]): boolean {
    return marked.length === round.right.length && round.right.every((n) => marked.includes(n))
}

/** Six rounds of a level, no function twice */
export function createHuntRounds(random: Random, levelIndex: number): HuntRound[] {
    const rounds: HuntRound[] = []
    for (let tries = 0; rounds.length < HUNT_ROUNDS && tries < 5000; tries += 1) {
        const round = levelIndex === 0 ? cubic(random, 1) : levelIndex === 1 ? cubic(random, 3) : equation(random)
        if (round && !rounds.some((other) => other.latex === round.latex)) rounds.push(round)
    }
    if (rounds.length < HUNT_ROUNDS) throw new Error('No hunt rounds')
    return rounds
}
