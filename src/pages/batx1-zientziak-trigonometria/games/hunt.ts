import { pick, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J2 · Ehizatu soluzioak (Caza las soluciones): an equation and a circle
   with a point every 15°, from 0° to 345°. The learner taps every
   solution between 0° and 360° and checks; one missing solution, or one
   too many, is a mistake. Level 1: sen x, cos x or tg x equal to a
   notable value (the second angle of the turn); level 2: sen nx, cos nx
   or tg nx with n = 2 or 3 (the solutions go round); level 3: equations
   of second degree and with formulas. Every solution is a multiple of 15°
   so it is one of the points. Formulas write \sen and \tg.
   ========================================================================== */

export const HUNT_ROUNDS = 6
export const HUNT_STEP = 15
export const HUNT_POINTS = Array.from({ length: 360 / HUNT_STEP }, (_, index) => index * HUNT_STEP)

export type HuntRatio = 'sin' | 'cos' | 'tan'

export interface HuntRound {
    equation: string
    solutions: number[]
    /** How it was made: the ratio, n and the value, or the name of a level-3 equation */
    kind: string
}

/** Notable values: their LaTeX, the value and the angles of one turn (half a turn for the tangent) */
interface Notable { latex: string; value: number; angles: Record<HuntRatio, number[]> }
const r2 = Math.SQRT2 / 2
const r3 = Math.sqrt(3) / 2
export const HUNT_VALUES: Notable[] = [
    { latex: '-1', value: -1, angles: { sin: [270], cos: [180], tan: [135, 315] } },
    { latex: '-\\frac{\\sqrt{3}}{2}', value: -r3, angles: { sin: [240, 300], cos: [150, 210], tan: [] } },
    { latex: '-\\frac{\\sqrt{2}}{2}', value: -r2, angles: { sin: [225, 315], cos: [135, 225], tan: [] } },
    { latex: '-\\frac{1}{2}', value: -0.5, angles: { sin: [210, 330], cos: [120, 240], tan: [] } },
    { latex: '0', value: 0, angles: { sin: [0, 180], cos: [90, 270], tan: [0, 180] } },
    { latex: '\\frac{1}{2}', value: 0.5, angles: { sin: [30, 150], cos: [60, 300], tan: [] } },
    { latex: '\\frac{\\sqrt{2}}{2}', value: r2, angles: { sin: [45, 135], cos: [45, 315], tan: [] } },
    { latex: '\\frac{\\sqrt{3}}{2}', value: r3, angles: { sin: [60, 120], cos: [30, 330], tan: [] } },
    { latex: '1', value: 1, angles: { sin: [90], cos: [0], tan: [45, 225] } },
    { latex: '\\sqrt{3}', value: Math.sqrt(3), angles: { sin: [], cos: [], tan: [60, 240] } },
    { latex: '-\\sqrt{3}', value: -Math.sqrt(3), angles: { sin: [], cos: [], tan: [120, 300] } },
    { latex: '\\frac{\\sqrt{3}}{3}', value: Math.sqrt(3) / 3, angles: { sin: [], cos: [], tan: [30, 210] } },
    { latex: '-\\frac{\\sqrt{3}}{3}', value: -Math.sqrt(3) / 3, angles: { sin: [], cos: [], tan: [150, 330] } }
]

const NAME: Record<HuntRatio, string> = { sin: '\\sen', cos: '\\cos', tan: '\\tg' }

/** The solutions of f(n·x) = value between 0° and 360°: u = n·x goes round n times */
export function huntSolutions(ratio: HuntRatio, n: number, notable: Notable): number[] {
    const found: number[] = []
    for (const u of notable.angles[ratio]) for (let turn = 0; turn < n; turn++) found.push((u + 360 * turn) / n)
    return [...new Set(found)].sort((a, b) => a - b)
}

/** The equation as a learner would meet it: 2\sen x=1 rather than \sen x=\frac{1}{2} for some values */
function written(ratio: HuntRatio, n: number, notable: Notable, random: Random): string {
    const term = `${NAME[ratio]} ${n === 1 ? 'x' : `${n}x`}`
    const plain = `${term}=${notable.latex}`
    const other: Record<string, string> = {
        '\\frac{1}{2}': `2${term}=1`,
        '-\\frac{1}{2}': `2${term}+1=0`,
        '\\frac{\\sqrt{2}}{2}': `\\sqrt{2}${term}=1`,
        '-\\frac{\\sqrt{2}}{2}': `\\sqrt{2}${term}+1=0`,
        '\\frac{\\sqrt{3}}{2}': `2${term}=\\sqrt{3}`,
        '-\\frac{\\sqrt{3}}{2}': `2${term}+\\sqrt{3}=0`,
        '\\frac{\\sqrt{3}}{3}': `\\sqrt{3}${term}=1`,
        '-\\frac{\\sqrt{3}}{3}': `\\sqrt{3}${term}+1=0`,
        '-1': `${term}+1=0`
    }
    return other[notable.latex] && pick(random, [true, false]) ? other[notable.latex] : plain
}

/** Level 3: equations of second degree and with formulas, with their solutions */
export const HUNT_EQUATIONS: Array<{ equation: string; solutions: number[]; f: (x: number) => number }> = [
    { equation: '2\\sen^2x-\\sen x-1=0', solutions: [90, 210, 330], f: (x) => 2 * sin(x) ** 2 - sin(x) - 1 },
    { equation: '2\\cos^2x+3\\cos x+1=0', solutions: [120, 180, 240], f: (x) => 2 * cos(x) ** 2 + 3 * cos(x) + 1 },
    { equation: '\\tg^2x=3', solutions: [60, 120, 240, 300], f: (x) => tan(x) ** 2 - 3 },
    { equation: '4\\sen^2x=1', solutions: [30, 150, 210, 330], f: (x) => 4 * sin(x) ** 2 - 1 },
    { equation: '2\\sen^2x=3\\cos x', solutions: [60, 300], f: (x) => 2 * sin(x) ** 2 - 3 * cos(x) },
    { equation: '2\\cos^2x=3\\sen x+3', solutions: [210, 270, 330], f: (x) => 2 * cos(x) ** 2 - 3 * sin(x) - 3 },
    { equation: '\\sen 2x=\\cos x', solutions: [30, 90, 150, 270], f: (x) => sin(2 * x) - cos(x) },
    { equation: '\\sen 2x=\\sqrt{2}\\cos x', solutions: [45, 90, 135, 270], f: (x) => sin(2 * x) - Math.SQRT2 * cos(x) },
    { equation: '\\cos 2x+\\cos x=0', solutions: [60, 180, 300], f: (x) => cos(2 * x) + cos(x) },
    { equation: '\\cos 2x=\\sen x', solutions: [30, 150, 270], f: (x) => cos(2 * x) - sin(x) },
    { equation: '\\cos 2x+3\\sen x=2', solutions: [30, 90, 150], f: (x) => cos(2 * x) + 3 * sin(x) - 2 },
    { equation: '\\sen x+\\cos x=0', solutions: [135, 315], f: (x) => sin(x) + cos(x) }
]

const D = Math.PI / 180
function sin(x: number) { return Math.sin(x * D) }
function cos(x: number) { return Math.cos(x * D) }
function tan(x: number) { return Math.tan(x * D) }

/** One equation of level 1 (n = 1) or 2 (n = 2, 3) whose solutions are all on the points */
function simpleRound(random: Random, level: number): HuntRound | null {
    const ratio = pick(random, ['sin', 'cos', 'tan'] as const)
    const n = level === 0 ? 1 : pick(random, [2, 3])
    const notable = pick(random, HUNT_VALUES)
    const solutions = huntSolutions(ratio, n, notable)
    if (solutions.length === 0 || solutions.some((x) => x % HUNT_STEP !== 0)) return null
    // Level 1 keeps the plain cases with two solutions most of the time
    if (level === 0 && solutions.length !== 2 && pick(random, [true, true, false])) return null
    return { equation: written(ratio, n, notable, random), solutions, kind: `${ratio}-${n}-${notable.latex}` }
}

/** Six different rounds of one level */
export function createHuntRounds(random: Random, levelIndex: number): HuntRound[] {
    if (levelIndex === 2) {
        return shuffle(random, HUNT_EQUATIONS).slice(0, HUNT_ROUNDS).map((item) => ({ equation: item.equation, solutions: item.solutions, kind: item.equation }))
    }
    const rounds: HuntRound[] = []
    for (let attempt = 0; rounds.length < HUNT_ROUNDS && attempt < 5000; attempt += 1) {
        const made = simpleRound(random, levelIndex)
        if (made && !rounds.some((other) => other.kind === made.kind)) rounds.push(made)
    }
    return rounds
}

/** Right when the tapped points are exactly the solutions */
export const isHuntRight = (round: HuntRound, chosen: number[]) => chosen.length === round.solutions.length && round.solutions.every((x) => chosen.includes(x))
