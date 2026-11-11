import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J2 · Teoremak ziurtatzen al du? (¿Lo asegura el teorema?): a function, an
   interval and a claim (it has a root: Bolzano; it takes the value k: the
   intermediate values; it has a maximum and a minimum: Weierstrass). The
   learner says whether the theorem ensures it (yes), or why not: the
   function is not continuous on the interval (checked first), or the
   other condition fails (the same sign, k outside, an interval that is
   not closed). Level 1: roots; level 2: values and extremes; level 3: all
   three, with logarithms, square roots and open intervals.
   ========================================================================== */

export type AssureBin = 'yes' | 'continuity' | 'other'
export type AssureClaim = 'root' | 'value' | 'extremes'

export const ASSURE_BINS: AssureBin[] = ['yes', 'continuity', 'other']

export const ASSURE_ROUNDS = 8

export interface AssureFunction {
    latex: string
    f: (x: number) => number
    /** Not continuous at these points (a jump, an asymptote) */
    breaks: number[]
    /** Not defined below this x (a logarithm or a square root) */
    from?: number
    /** The function is defined at `from` (√x is, ln x is not) */
    fromIncluded?: boolean
}

export interface AssureRound {
    fn: AssureFunction
    a: number
    b: number
    /** Whether each end belongs to the interval */
    closed: [boolean, boolean]
    claim: AssureClaim
    k: number
    bin: AssureBin
}

const FUNCTIONS: AssureFunction[] = [
    { latex: 'x^3-3x+1', f: (x) => x ** 3 - 3 * x + 1, breaks: [] },
    { latex: 'x^2-2', f: (x) => x * x - 2, breaks: [] },
    { latex: 'x^3+x-3', f: (x) => x ** 3 + x - 3, breaks: [] },
    { latex: '2^x-3', f: (x) => 2 ** x - 3, breaks: [] },
    { latex: '\\frac{1}{x-1}', f: (x) => 1 / (x - 1), breaks: [1] },
    { latex: '\\frac{x+2}{x}', f: (x) => (x + 2) / x, breaks: [0] },
    { latex: '\\frac{1}{x^2-4}', f: (x) => 1 / (x * x - 4), breaks: [-2, 2] },
    { latex: '\\begin{cases}x+1 & x<0\\\\ x-2 & x\\ge 0\\end{cases}', f: (x) => (x < 0 ? x + 1 : x - 2), breaks: [0] }
]

const LEVEL3: AssureFunction[] = [
    { latex: '\\ln x-1', f: (x) => Math.log(x) - 1, breaks: [], from: 0, fromIncluded: false },
    { latex: '\\sqrt{x}-1', f: (x) => Math.sqrt(x) - 1, breaks: [], from: 0, fromIncluded: true },
    { latex: 'e^x-2', f: (x) => Math.exp(x) - 2, breaks: [] },
    { latex: '\\frac{x}{x^2+1}', f: (x) => x / (x * x + 1), breaks: [] }
]

/** Continuous on the interval as written: no break inside it or at an end it includes, and defined on all of it */
export function continuousOn(round: Pick<AssureRound, 'fn' | 'a' | 'b' | 'closed'>): boolean {
    const { fn, a, b, closed } = round
    const inside = (x: number) => (x > a && x < b) || (x === a && closed[0]) || (x === b && closed[1])
    if (fn.breaks.some(inside)) return false
    if (fn.from !== undefined) {
        if (a < fn.from) return false
        if (a === fn.from && closed[0] && !fn.fromIncluded) return false
    }
    return true
}

/** The verdict: continuity first, then the other condition of the claim's theorem */
export function assureBin(round: Omit<AssureRound, 'bin'>): AssureBin {
    if (!continuousOn(round)) return 'continuity'
    const closedBoth = round.closed[0] && round.closed[1]
    if (round.claim === 'extremes') return closedBoth ? 'yes' : 'other'
    if (!closedBoth) return 'other'
    const fa = round.fn.f(round.a)
    const fb = round.fn.f(round.b)
    if (round.claim === 'root') return fa * fb < 0 ? 'yes' : 'other'
    return (round.k - fa) * (round.k - fb) < 0 ? 'yes' : 'other'
}

export const intervalLatex = (round: Pick<AssureRound, 'a' | 'b' | 'closed'>) => `${round.closed[0] ? '[' : '('}${round.a},${round.b}${round.closed[1] ? ']' : ')'}`

function makeRound(random: Random, level: number): AssureRound | null {
    const fn = level === 2 && randomInt(random, 0, 1) === 0 ? pick(random, LEVEL3) : pick(random, FUNCTIONS)
    const low = fn.from ?? -3
    const a = randomInt(random, fn.from !== undefined && level === 2 ? fn.from : low, 2)
    const b = randomInt(random, a + 1, 3)
    if (fn.from !== undefined && a < fn.from) return null
    const claim: AssureClaim = level === 0 ? 'root' : level === 1 ? pick(random, ['value', 'extremes'] as const) : pick(random, ['root', 'value', 'extremes'] as const)
    // Open ends only in the last level, and only for Weierstrass in the second
    const openable = level === 2 || (level === 1 && claim === 'extremes')
    const closed: [boolean, boolean] = openable && randomInt(random, 0, 2) === 0 ? [randomInt(random, 0, 1) === 1, false] : [true, true]
    const k = randomInt(random, -3, 3)
    const values = [fn.f(a), fn.f(b)]
    // No end exactly on the axis or on the line y = k: the sign must be clear
    if (values.some((value) => !Number.isFinite(value) || Math.abs(value) < 1e-9 || (claim === 'value' && Math.abs(value - k) < 1e-9))) {
        if (continuousOn({ fn, a, b, closed })) return null
    }
    const round = { fn, a, b, closed, claim, k }
    return { ...round, bin: assureBin(round) }
}

/** Eight rounds of a level, every verdict at least twice, no round twice */
export function createAssureRounds(random: Random, levelIndex: number): AssureRound[] {
    for (let attempt = 0; attempt < 500; attempt += 1) {
        const rounds: AssureRound[] = []
        for (let tries = 0; rounds.length < ASSURE_ROUNDS && tries < 500; tries += 1) {
            const round = makeRound(random, levelIndex)
            if (!round) continue
            const key = `${round.fn.latex}|${intervalLatex(round)}|${round.claim}|${round.claim === 'value' ? round.k : ''}`
            if (rounds.some((other) => `${other.fn.latex}|${intervalLatex(other)}|${other.claim}|${other.claim === 'value' ? other.k : ''}` === key)) continue
            rounds.push(round)
        }
        const counts = ASSURE_BINS.map((bin) => rounds.filter((round) => round.bin === bin).length)
        if (rounds.length === ASSURE_ROUNDS && counts.every((count) => count >= 2)) return rounds
    }
    throw new Error('No assure rounds')
}
