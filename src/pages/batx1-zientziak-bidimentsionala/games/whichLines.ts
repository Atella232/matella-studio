import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J2 · Zein zuzen? (¿Qué rectas?): two regression lines, y = a·x + b
   (y on x) and x = c·y + d (x on y). Level 1: where do they cross, that
   is, the centre of gravity? (the wrong options swap the coordinates or
   take the constant terms). Level 2: what is r? (r² = a·c, and the wrong
   options are a·c itself and the other sign). Level 3: is the pair
   possible? (a and c must have the same sign and a·c must not pass 1).
   Pure logic.
   ========================================================================== */

export const LINES_ROUNDS = 6

export type LinesVerdict = 'possible' | 'signs' | 'over'

export interface LinesRound {
    level: number
    /** y = a·x + b and x = c·y + d */
    a: number
    b: number
    c: number
    d: number
    /** The centre of gravity (for possible pairs) */
    mx: number
    my: number
    verdict: LinesVerdict
    /** Options as LaTeX (levels 1 and 2) or verdicts (level 3), and the right one */
    options: string[]
    answer: number
}

/** Slope pairs whose product is the square of a tenth: r² = 0,16 … 0,81 */
const POSSIBLE: Array<[number, number]> = [[0.5, 0.5], [0.8, 0.45], [0.9, 0.4], [1.6, 0.4], [2, 0.32], [2, 0.18], [0.5, 0.98], [1.2, 0.3], [0.6, 0.6], [1.5, 0.24], [0.4, 0.4], [2.5, 0.1], [0.7, 0.7], [1.8, 0.45], [0.9, 0.9], [1.25, 0.2], [3, 0.12]]
/** Products past 1 */
const OVER: Array<[number, number]> = [[1.5, 0.8], [2, 0.6], [1.6, 0.75], [3, 0.5], [2.5, 0.5], [1.2, 1]]
/** Different signs */
const SIGNS: Array<[number, number]> = [[0.8, -0.45], [-1.2, 0.3], [2, -0.32], [-0.5, 0.5], [1.5, -0.24]]

const clean = (value: number) => Math.round(value * 1000) / 1000
/** A number for LaTeX: 0{,}45, -2, 1{,}5 */
export const texValue = (value: number) => String(clean(value)).replace('.', '{,}')

/** a·v + b written as a line: y=0{,}8x+1{,}4, x=-0{,}5y+9, y=2x */
export function lineLatex(left: 'x' | 'y', slope: number, intercept: number): string {
    const variable = left === 'y' ? 'x' : 'y'
    const coefficient = slope === 1 ? '' : slope === -1 ? '-' : texValue(slope)
    const constant = clean(intercept) === 0 ? '' : intercept > 0 ? `+${texValue(intercept)}` : texValue(intercept)
    return `${left}=${coefficient}${variable}${constant}`
}

export const pointLatex = (x: number, y: number) => `(${texValue(x)},\\,${texValue(y)})`

/** The r of a possible pair: the sign of the slopes, the root of their product */
export const linesR = (round: Pick<LinesRound, 'a' | 'c'>) => Math.sign(round.a) * Math.sqrt(round.a * round.c)

function makeRound(random: Random, level: number): LinesRound | null {
    const verdict: LinesVerdict = level < 2 ? 'possible' : pick(random, ['possible', 'possible', 'signs', 'over'] as const)
    const source = verdict === 'possible' ? POSSIBLE : verdict === 'over' ? OVER : SIGNS
    const [first, second] = pick(random, source)
    const flip = verdict === 'possible' || verdict === 'over' ? pick(random, [1, -1]) : 1
    const a = flip * first
    const c = flip * second
    const mx = randomInt(random, 2, 9)
    const my = randomInt(random, 2, 12)
    const b = clean(my - a * mx)
    const d = clean(mx - c * my)
    // The constant terms, as written, have at most two decimals
    if (Math.abs(b * 100 - Math.round(b * 100)) > 1e-9 || Math.abs(d * 100 - Math.round(d * 100)) > 1e-9) return null
    if (level === 0) {
        const candidates = [pointLatex(mx, my), pointLatex(my, mx), pointLatex(d, b)]
        if (new Set(candidates).size < 3) return null
        const options = shuffle(random, candidates)
        return { level, a, b, c, d, mx, my, verdict, options, answer: options.indexOf(pointLatex(mx, my)) }
    }
    if (level === 1) {
        const r = Math.sign(a) * Math.sqrt(a * c)
        const candidates = [texValue(r), texValue(a * c), texValue(-r)]
        if (new Set(candidates).size < 3) return null
        const options = shuffle(random, candidates)
        return { level, a, b, c, d, mx, my, verdict, options, answer: options.indexOf(texValue(r)) }
    }
    const options = ['possible', 'signs', 'over']
    return { level, a, b, c, d, mx, my, verdict, options, answer: options.indexOf(verdict) }
}

export function createLinesRounds(random: Random, level: number): LinesRound[] {
    const rounds: LinesRound[] = []
    for (let attempt = 0; rounds.length < LINES_ROUNDS && attempt < 20000; attempt += 1) {
        const round = makeRound(random, level)
        if (!round || rounds.some((other) => other.a === round.a && other.c === round.c && other.mx === round.mx)) continue
        rounds.push(round)
    }
    if (rounds.length < LINES_ROUNDS) throw new Error(`No rounds for level ${level}`)
    // Level 3: possible and impossible pairs both appear
    if (level === 2 && new Set(rounds.map((round) => round.verdict === 'possible')).size < 2) return createLinesRounds(random, level)
    return rounds
}
