import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J1 · Deribagarria? (¿Derivable?): a function in two pieces, or with an
   absolute value, and a point. The learner says what happens there:
   differentiable, continuous with a corner, or not continuous. Level 1:
   two polynomial pieces (some jumps keep equal slopes, the trap of
   checking only the slopes); level 2: a polynomial and an exponential,
   a logarithm, a sine, a cosine or 1/x; level 3: absolute values
   (x|x|, |x² − c²|, x|x − a|, |x − a|/(x − a)…). Every round carries the
   two heights and the two slopes, shown after the answer.
   ========================================================================== */

export type DerivableBin = 'smooth' | 'corner' | 'jump'

export const DERIVABLE_BINS: DerivableBin[] = ['smooth', 'corner', 'jump']

export const DERIVABLE_ROUNDS = 8

export interface DerivableRound {
    latex: string
    a: number
    /** The limits from the left and from the right (the heights of the two pieces) */
    values: [number, number]
    /** The one-sided derivatives */
    slopes: [number, number]
    bin: DerivableBin
    /** The function itself, for the tests */
    f: (x: number) => number
}

export function derivableBin(values: [number, number], slopes: [number, number]): DerivableBin {
    if (Math.abs(values[0] - values[1]) > 1e-9) return 'jump'
    return Math.abs(slopes[0] - slopes[1]) > 1e-9 ? 'corner' : 'smooth'
}

const term = (coefficient: number, power: string, first: boolean) => {
    if (coefficient === 0) return ''
    const sign = coefficient < 0 ? '-' : first ? '' : '+'
    const size = Math.abs(coefficient)
    return `${sign}${size === 1 && power ? '' : size}${power}`
}

/** c2 x² + c1 x + c0 in LaTeX, without zeros or ones */
export function polyLatex(c2: number, c1: number, c0: number): string {
    const parts = [term(c2, 'x^2', true)]
    parts.push(term(c1, 'x', parts.join('') === ''))
    parts.push(term(c0, '', parts.join('') === ''))
    return parts.join('') || '0'
}

const pieces = (left: string, right: string, a: number) => `f(x)=\\begin{cases}${left} & x<${a}\\\\ ${right} & x\\ge ${a}\\end{cases}`

function round(latex: string, a: number, values: [number, number], slopes: [number, number], f: (x: number) => number): DerivableRound {
    return { latex, a, values, slopes, bin: derivableBin(values, slopes), f }
}

const nonzero = (random: Random) => pick(random, [-2, -1, 1, 2])

/** Level 1: a parabola and a parabola or a line, built to be smooth, a corner or a jump */
function polynomialRound(random: Random, bin: DerivableBin): DerivableRound | null {
    const a = pick(random, [-1, 0, 1, 2])
    const l2 = pick(random, [-1, 1, 2])
    const l1 = randomInt(random, -3, 3)
    const l0 = randomInt(random, -3, 3)
    const value = l2 * a * a + l1 * a + l0
    const slope = 2 * l2 * a + l1
    const r2 = pick(random, [0, 0, 1, -1])
    // A jump keeps the same slopes half of the times: checking only the slopes is the trap
    const bend = bin === 'corner' || (bin === 'jump' && randomInt(random, 0, 1) === 1) ? nonzero(random) : 0
    const r1 = slope - 2 * r2 * a + bend
    const r0 = value - r2 * a * a - r1 * a + (bin === 'jump' ? nonzero(random) : 0)
    if (Math.abs(r1) > 9 || Math.abs(r0) > 9 || (r2 === l2 && r1 === l1 && r0 === l0)) return null
    const right = r2 * a * a + r1 * a + r0
    return round(pieces(polyLatex(l2, l1, l0), polyLatex(r2, r1, r0), a), a, [value, right], [slope, 2 * r2 * a + r1], (x) => (x < a ? l2 * x * x + l1 * x + l0 : r2 * x * x + r1 * x + r0))
}

interface Special {
    latex: string
    f: (x: number) => number
    a: number
    value: number
    slope: number
}

const SPECIALS: Special[] = [
    { latex: 'e^x', f: Math.exp, a: 0, value: 1, slope: 1 },
    { latex: 'e^{2x}', f: (x) => Math.exp(2 * x), a: 0, value: 1, slope: 2 },
    { latex: '\\sin x', f: Math.sin, a: 0, value: 0, slope: 1 },
    { latex: '\\cos x', f: Math.cos, a: 0, value: 1, slope: 0 },
    { latex: '\\ln(x+1)', f: (x) => Math.log(x + 1), a: 0, value: 0, slope: 1 },
    { latex: '\\ln x', f: Math.log, a: 1, value: 0, slope: 1 },
    { latex: 'x^3', f: (x) => x ** 3, a: 1, value: 1, slope: 3 },
    { latex: '\\frac{1}{x}', f: (x) => 1 / x, a: 1, value: 1, slope: -1 },
    { latex: 'e^{x-1}', f: (x) => Math.exp(x - 1), a: 1, value: 1, slope: 1 }
]

/** Level 2: a line or a parabola on the left, an elementary function on the right */
function specialRound(random: Random, bin: DerivableBin): DerivableRound | null {
    const special = pick(random, SPECIALS)
    const { a } = special
    const l2 = pick(random, [0, 1, -1])
    const bend = bin === 'corner' || (bin === 'jump' && randomInt(random, 0, 1) === 1) ? nonzero(random) : 0
    const l1 = special.slope - 2 * l2 * a + bend
    const l0 = special.value - l2 * a * a - l1 * a + (bin === 'jump' ? nonzero(random) : 0)
    if (Math.abs(l1) > 9 || Math.abs(l0) > 9 || (l2 === 0 && l1 === 0)) return null
    const left = l2 * a * a + l1 * a + l0
    return round(pieces(polyLatex(l2, l1, l0), special.latex, a), a, [left, special.value], [2 * l2 * a + l1, special.slope], (x) => (x < a ? l2 * x * x + l1 * x + l0 : special.f(x)))
}

/** Level 3: absolute values, at the point where the inside is 0 */
function absoluteRound(random: Random, bin: DerivableBin): DerivableRound | null {
    const a = randomInt(random, 1, 3)
    if (bin === 'smooth') {
        const kind = pick(random, ['x|x|', '(x-a)|x-a|', '|x-a|^3'] as const)
        if (kind === 'x|x|') return round('f(x)=x\\,|x|', 0, [0, 0], [0, 0], (x) => x * Math.abs(x))
        if (kind === '(x-a)|x-a|') return round(`f(x)=(x-${a})\\,|x-${a}|`, a, [0, 0], [0, 0], (x) => (x - a) * Math.abs(x - a))
        return round(`f(x)=|x-${a}|^3`, a, [0, 0], [0, 0], (x) => Math.abs(x - a) ** 3)
    }
    if (bin === 'corner') {
        const kind = pick(random, ['|x^2-c^2|', 'x|x-a|', '|x-a|+x'] as const)
        if (kind === '|x^2-c^2|') return round(`f(x)=|x^2-${a * a}|`, a, [0, 0], [-2 * a, 2 * a], (x) => Math.abs(x * x - a * a))
        if (kind === 'x|x-a|') return round(`f(x)=x\\,|x-${a}|`, a, [0, 0], [-a, a], (x) => x * Math.abs(x - a))
        return round(`f(x)=|x-${a}|+x`, a, [a, a], [0, 2], (x) => Math.abs(x - a) + x)
    }
    const kind = pick(random, ['sign', 'quotient'] as const)
    if (kind === 'sign') return round(`f(x)=\\frac{|x-${a}|}{x-${a}}`, a, [-1, 1], [0, 0], (x) => Math.abs(x - a) / (x - a))
    return round(`f(x)=\\frac{x^2-${a * a}}{|x-${a}|}`, a, [-2 * a, 2 * a], [-1, 1], (x) => (x * x - a * a) / Math.abs(x - a))
}

const makers = [polynomialRound, specialRound, absoluteRound]

/** Eight rounds of a level, each verdict at least twice, no function twice */
export function createDerivableRounds(random: Random, levelIndex: number): DerivableRound[] {
    const make = makers[levelIndex] ?? polynomialRound
    const bins = shuffle(random, [...DERIVABLE_BINS, ...DERIVABLE_BINS, ...DERIVABLE_BINS.slice(0, 2)].slice(0, DERIVABLE_ROUNDS))
    for (let attempt = 0; attempt < 200; attempt += 1) {
        const rounds: DerivableRound[] = []
        for (const bin of bins) {
            for (let tries = 0; tries < 200; tries += 1) {
                const next = make(random, bin)
                if (next && next.bin === bin && !rounds.some((other) => other.latex === next.latex)) {
                    rounds.push(next)
                    break
                }
            }
        }
        if (rounds.length === DERIVABLE_ROUNDS) return rounds
    }
    throw new Error('No derivable rounds')
}
