import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J3 · Asintotak begi-bistan (Asíntotas a la vista): a function and three
   lists of asymptotes; the learner picks the complete, right list. The
   wrong lists are the typical mistakes: a and p swapped, a sign changed,
   one asymptote missing or one too many, a horizontal one where there is
   an oblique one, the oblique one of the right taken for both sides.
   Level 1: rational functions; level 2: exponential and logarithmic;
   level 3: roots and everything mixed. Every round carries the numbers
   the tests check it against.
   ========================================================================== */

export const SIGHT_ROUNDS = 8

export interface SightRound {
    latex: string
    options: string[]
    correct: number
    /** Where the asymptotes come from, in LaTeX */
    explain: string
    /** The asymptotes as numbers: vertical x, horizontal y, oblique [m, n] (one side or both) */
    meta: { verticals: number[]; horizontals: number[]; obliques: Array<[number, number]> }
    /** The function, for the tests */
    fn: (x: number) => number
}

type Maker = (random: Random) => SightRound | null

const signed = (value: number) => (value < 0 ? `-${-value}` : `+${value}`)
const lineLatex = (m: number, n: number) => `y=${m === 1 ? '' : m === -1 ? '-' : m}x${n === 0 ? '' : signed(n)}`

/** The round with the right list first among the options, shuffled; null if two lists coincide */
function round(random: Random, latex: string, right: string, wrong: string[], explain: string, meta: SightRound['meta'], fn: (x: number) => number): SightRound | null {
    const lists = [right, ...wrong.slice(0, 2)]
    if (new Set(lists).size < 3) return null
    const options = shuffle(random, lists)
    return { latex, options, correct: options.indexOf(right), explain, meta, fn }
}

/* ---------- Level 1: rational functions ---------- */

const linearOverLinear: Maker = (random) => {
    const a = randomInt(random, 2, 4)
    const b = pick(random, [-3, -1, 1, 3])
    const p = randomInt(random, 1, 3)
    if (a * p + b === 0 || a === p) return null
    return round(random, `\\frac{${a}x${signed(b)}}{x-${p}}`, `x=${p},\\ y=${a}`, shuffle(random, [`x=${a},\\ y=${p}`, `x=-${p},\\ y=${a}`, `x=${p},\\ y=0`]), `\\begin{gathered}\\lim_{x\\to ${p}}f(x)=\\infty\\\\ \\lim_{x\\to\\pm\\infty}f(x)=${a}\\end{gathered}`, { verticals: [p], horizontals: [a], obliques: [] }, (x) => (a * x + b) / (x - p))
}

const quadraticOverLinear: Maker = (random) => {
    const c = randomInt(random, 1, 4)
    const p = randomInt(random, 1, 3)
    // x² + c = (x − p)(x + p) + p² + c
    return round(random, `\\frac{x^2+${c}}{x-${p}}`, `x=${p},\\ ${lineLatex(1, p)}`, shuffle(random, [`x=${p},\\ y=1`, `x=${p},\\ y=x`, `x=-${p},\\ ${lineLatex(1, p)}`]), `x^2+${c}=(x-${p})(x+${p})+${p * p + c}`, { verticals: [p], horizontals: [], obliques: [[1, p]] }, (x) => (x * x + c) / (x - p))
}

const twoVerticals: Maker = (random) => {
    const p = randomInt(random, 1, 3)
    const k = randomInt(random, 2, 5)
    return round(random, `\\frac{${k}}{x^2-${p * p}}`, `x=\\pm ${p},\\ y=0`, shuffle(random, [`x=${p},\\ y=0`, `x=\\pm ${p},\\ y=${k}`, `x=\\pm ${p}`]), `x^2-${p * p}=0\\ \\to\\ x=\\pm ${p}`, { verticals: [-p, p], horizontals: [0], obliques: [] }, (x) => k / (x * x - p * p))
}

const noVertical: Maker = (random) => {
    const p = pick(random, [1, 2, 3])
    return round(random, `\\frac{x^2}{x^2+${p * p}}`, 'y=1', shuffle(random, [`x=\\pm ${p},\\ y=1`, 'y=0', `x=\\pm ${p}`]), `x^2+${p * p}>0\\qquad \\lim_{x\\to\\pm\\infty}f(x)=1`, { verticals: [], horizontals: [1], obliques: [] }, (x) => (x * x) / (x * x + p * p))
}

/* ---------- Level 2: exponential and logarithmic ---------- */

const expOfInverse: Maker = (random) => round(random, 'e^{1/x}', 'x=0,\\ y=1', shuffle(random, ['x=0,\\ y=0', 'y=1', 'x=1,\\ y=0']), '\\begin{gathered}\\lim_{x\\to 0^+}e^{1/x}=+\\infty\\\\ \\lim_{x\\to\\pm\\infty}e^{1/x}=e^0=1\\end{gathered}', { verticals: [0], horizontals: [1], obliques: [] }, (x) => Math.exp(1 / x))

const logarithm: Maker = (random) => {
    const p = randomInt(random, 1, 4)
    return round(random, `\\ln(x-${p})`, `x=${p}`, shuffle(random, [`x=-${p}`, `x=${p},\\ y=0`, `x=${p + 1}`]), `\\lim_{x\\to ${p}^+}\\ln(x-${p})=-\\infty`, { verticals: [p], horizontals: [], obliques: [] }, (x) => (x > p ? Math.log(x - p) : NaN))
}

const powerTimesExp: Maker = (random) => {
    const k = randomInt(random, 1, 3)
    const latex = k === 1 ? 'x\\,e^{-x}' : `x^${k}e^{-x}`
    return round(random, latex, 'y=0', shuffle(random, ['x=0', 'x=0,\\ y=0', 'y=1']), `\\lim_{x\\to+\\infty}\\frac{x^${k}}{e^x}=0`, { verticals: [], horizontals: [0], obliques: [] }, (x) => x ** k * Math.exp(-x))
}

const expOverX: Maker = (random) => round(random, '\\frac{e^x}{x}', 'x=0,\\ y=0', shuffle(random, ['x=0', 'y=0', 'x=0,\\ y=1']), '\\begin{gathered}\\lim_{x\\to 0}\\frac{e^x}{x}=\\infty\\\\ \\lim_{x\\to-\\infty}\\frac{e^x}{x}=0\\end{gathered}', { verticals: [0], horizontals: [0], obliques: [] }, (x) => Math.exp(x) / x)

const shiftedExp: Maker = (random) => {
    const k = randomInt(random, 1, 4)
    return round(random, `e^{x}+${k}`, `y=${k}`, shuffle(random, ['y=0', `y=-${k}`, `x=0,\\ y=${k}`]), `\\lim_{x\\to-\\infty}e^x=0\\ \\to\\ y=${k}`, { verticals: [], horizontals: [k], obliques: [] }, (x) => Math.exp(x) + k)
}

/* ---------- Level 3: roots and everything mixed ---------- */

const rootOfSquare: Maker = (random) => {
    const c = randomInt(random, 1, 5)
    return round(random, `\\sqrt{x^2+${c}}`, 'y=x,\\ y=-x', shuffle(random, ['y=x', 'y=1', 'y=x,\\ y=-x,\\ x=0']), '\\begin{gathered}\\lim_{x\\to+\\infty}\\frac{f(x)}{x}=1\\\\ \\lim_{x\\to-\\infty}\\frac{f(x)}{x}=-1\\end{gathered}', { verticals: [], horizontals: [], obliques: [[1, 0], [-1, 0]] }, (x) => Math.sqrt(x * x + c))
}

const rootShifted: Maker = (random) => {
    const p = pick(random, [1, 2, 3])
    // √(x² + 2px) − x → p on the right; on the left the slope is −1 and n = −p
    return round(random, `\\sqrt{x^2+${2 * p}x}`, `${lineLatex(1, p)},\\ ${lineLatex(-1, -p)}`, shuffle(random, [`${lineLatex(1, p)}`, `${lineLatex(1, 2 * p)},\\ ${lineLatex(-1, -2 * p)}`, `${lineLatex(1, p)},\\ ${lineLatex(-1, p)}`]), `\\sqrt{x^2+${2 * p}x}-x=\\frac{${2 * p}x}{\\sqrt{x^2+${2 * p}x}+x}\\to ${p}`, { verticals: [], horizontals: [], obliques: [[1, p], [-1, -p]] }, (x) => Math.sqrt(x * x + 2 * p * x))
}

const plusInverse: Maker = (random) => {
    const k = randomInt(random, 1, 4)
    return round(random, `\\frac{x^2+${k}}{x}`, 'x=0,\\ y=x', shuffle(random, ['y=x', 'x=0,\\ y=1', `x=0,\\ y=x+${k}`]), `f(x)=x+\\frac{${k}}{x}`, { verticals: [0], horizontals: [], obliques: [[1, 0]] }, (x) => (x * x + k) / x)
}

const evenWithTwo: Maker = (random) => {
    const a = randomInt(random, 2, 3)
    return round(random, `\\frac{${a}x^2+1}{x^2-1}`, `x=\\pm 1,\\ y=${a}`, shuffle(random, [`x=\\pm 1,\\ y=1`, `x=1,\\ y=${a}`, `x=\\pm 1,\\ y=${a}x`]), `\\begin{gathered}x^2-1=0\\ \\to\\ x=\\pm 1\\\\ \\lim_{x\\to\\pm\\infty}f(x)=${a}\\end{gathered}`, { verticals: [-1, 1], horizontals: [a], obliques: [] }, (x) => (a * x * x + 1) / (x * x - 1))
}

const LEVELS: Maker[][] = [
    [linearOverLinear, quadraticOverLinear, twoVerticals, noVertical],
    [expOfInverse, logarithm, powerTimesExp, expOverX, shiftedExp],
    [rootOfSquare, rootShifted, plusInverse, evenWithTwo, quadraticOverLinear, logarithm, expOverX]
]

/** Eight rounds of one level, each with its own function */
export function createSightRounds(random: Random, levelIndex: number): SightRound[] {
    const makers = LEVELS[levelIndex] ?? LEVELS[0]
    const rounds: SightRound[] = []
    for (let attempt = 0; attempt < 600 && rounds.length < SIGHT_ROUNDS; attempt += 1) {
        const next = pick(random, makers)(random)
        if (!next || rounds.some((other) => other.latex === next.latex)) continue
        rounds.push(next)
    }
    if (rounds.length < SIGHT_ROUNDS) throw new Error('No asymptote rounds')
    return rounds
}
