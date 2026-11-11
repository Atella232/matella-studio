import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J2 · Rolle betetzen du? (¿Cumple Rolle?): a function and an interval,
   and the learner says whether Rolle gives a point c (the three
   hypotheses hold) or which hypothesis fails: continuity on [a, b],
   differentiability on (a, b) or f(a) = f(b). Only one hypothesis fails
   in each round, so the answer is never ambiguous. Level 1: polynomials,
   sine and cosine (equal heights or not); level 2: corners of |x − k| as
   well; level 3: jumps, asymptotes and cusps too.
   ========================================================================== */

export type RolleBin = 'yes' | 'continuity' | 'derivability' | 'heights'

export const ROLLE_BINS: RolleBin[] = ['yes', 'continuity', 'derivability', 'heights']

export const ROLLE_ROUNDS = 8

export interface RolleRound {
    latex: string
    interval: string
    /** f(a) and f(b), in LaTeX */
    fa: string
    fb: string
    /** The point c when Rolle applies, or where the hypothesis fails */
    point: string
    bin: RolleBin
}

const signed = (value: number) => (value < 0 ? `-${-value}` : `+${value}`)
const interval = (a: number | string, b: number | string) => `[${a},\\,${b}]`

type Maker = (random: Random) => RolleRound | null

/** x² + px on an interval symmetric about −p/2 (Rolle) or not (heights) */
const parabola = (equal: boolean): Maker => (random) => {
    const c = randomInt(random, -2, 3)
    const p = -2 * c
    const r = randomInt(random, 1, 3)
    const a = c - r
    const b = equal ? c + r : c + r + randomInt(random, 1, 2)
    const f = (x: number) => x * x + p * x
    if (!equal && f(a) === f(b)) return null
    return { latex: `x^2${p === 0 ? '' : signed(p) + 'x'}`, interval: interval(a, b), fa: String(f(a)), fb: String(f(b)), point: `c=${c}`, bin: equal ? 'yes' : 'heights' }
}

/** x³ − 3x: equal heights at −√3, 0 and √3 and at −2 and 1; different ones elsewhere */
const cubic = (equal: boolean): Maker => (random) => {
    const options = equal
        ? [{ a: '-2', b: '1', fa: '-2', fb: '-2', point: 'c=-1' }, { a: '-1', b: '2', fa: '2', fb: '2', point: 'c=1' }, { a: '0', b: '\\sqrt{3}', fa: '0', fb: '0', point: 'c=1' }]
        : [{ a: '0', b: '2', fa: '0', fb: '2', point: '' }, { a: '-1', b: '1', fa: '2', fb: '-2', point: '' }, { a: '1', b: '3', fa: '-2', fb: '18', point: '' }]
    const chosen = pick(random, options)
    return { latex: 'x^3-3x', interval: interval(chosen.a, chosen.b), fa: chosen.fa, fb: chosen.fb, point: chosen.point, bin: equal ? 'yes' : 'heights' }
}

const trig = (equal: boolean): Maker => (random) => pick(random, equal
    ? [{ latex: '\\sin x', interval: interval(0, '\\pi'), fa: '0', fb: '0', point: 'c=\\frac{\\pi}{2}', bin: 'yes' as const }, { latex: '\\cos x', interval: interval('-\\frac{\\pi}{2}', '\\frac{\\pi}{2}'), fa: '0', fb: '0', point: 'c=0', bin: 'yes' as const }]
    : [{ latex: '\\sin x', interval: interval(0, '\\frac{\\pi}{2}'), fa: '0', fb: '1', point: '', bin: 'heights' as const }, { latex: '\\cos x', interval: interval(0, '\\pi'), fa: '1', fb: '-1', point: '', bin: 'heights' as const }])

/** |x − k| on an interval symmetric about k: equal heights, but a corner */
const corner: Maker = (random) => {
    const k = randomInt(random, -2, 2)
    const r = randomInt(random, 1, 3)
    return { latex: `|x${k === 0 ? '' : signed(-k)}|`, interval: interval(k - r, k + r), fa: String(r), fb: String(r), point: `x=${k}`, bin: 'derivability' }
}

/** A cusp: the cube root of x², on [−r, r] */
const cusp: Maker = (random) => {
    const r = pick(random, [1, 8])
    return { latex: '\\sqrt[3]{x^2}', interval: interval(-r, r), fa: String(r === 1 ? 1 : 4), fb: String(r === 1 ? 1 : 4), point: 'x=0', bin: 'derivability' }
}

/** 1/(x − k)² on an interval symmetric about k: equal heights, but an asymptote */
const asymptote: Maker = (random) => {
    const k = randomInt(random, -2, 2)
    const r = pick(random, [1, 2])
    return { latex: `\\frac{1}{(x${k === 0 ? '' : signed(-k)})^2}`.replace('(x)^2', 'x^2'), interval: interval(k - r, k + r), fa: `\\frac{1}{${r * r}}`.replace('\\frac{1}{1}', '1'), fb: `\\frac{1}{${r * r}}`.replace('\\frac{1}{1}', '1'), point: `x=${k}`, bin: 'continuity' }
}

/** A jump at x = k with f(k − 1) = f(k + 1) */
const jump: Maker = (random) => {
    const k = randomInt(random, 0, 2)
    const latex = `\\begin{cases}x & x<${k}\\\\ x-2 & x\\ge ${k}\\end{cases}`
    return { latex, interval: interval(k - 1, k + 1), fa: String(k - 1), fb: String(k - 1), point: `x=${k}`, bin: 'continuity' }
}

const LEVELS: Array<Record<RolleBin, Maker[]>> = [
    { yes: [parabola(true), cubic(true), trig(true)], heights: [parabola(false), cubic(false), trig(false)], derivability: [corner], continuity: [asymptote] },
    { yes: [parabola(true), cubic(true), trig(true)], heights: [parabola(false), cubic(false), trig(false)], derivability: [corner], continuity: [asymptote, jump] },
    { yes: [parabola(true), cubic(true), trig(true)], heights: [parabola(false), trig(false)], derivability: [corner, cusp], continuity: [asymptote, jump] }
]

/** How many rounds of each bin per level: the first two are mostly about the heights */
const MIX: RolleBin[][] = [
    ['yes', 'yes', 'yes', 'heights', 'heights', 'heights', 'derivability', 'continuity'],
    ['yes', 'yes', 'heights', 'heights', 'derivability', 'derivability', 'continuity', 'continuity'],
    ['yes', 'yes', 'heights', 'heights', 'derivability', 'derivability', 'continuity', 'continuity']
]

export function createRolleRounds(random: Random, levelIndex: number): RolleRound[] {
    const makers = LEVELS[levelIndex] ?? LEVELS[0]
    const bins = shuffle(random, MIX[levelIndex] ?? MIX[0])
    for (let attempt = 0; attempt < 200; attempt += 1) {
        const rounds: RolleRound[] = []
        for (const bin of bins) {
            for (let tries = 0; tries < 200; tries += 1) {
                const next = pick(random, makers[bin])(random)
                if (next && !rounds.some((other) => other.latex === next.latex && other.interval === next.interval)) {
                    rounds.push(next)
                    break
                }
            }
        }
        if (rounds.length === ROLLE_ROUNDS) return rounds
    }
    throw new Error('No Rolle rounds')
}
