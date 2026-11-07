import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J2 · Ehizatu asintota (Caza la asíntota): a rational function written
   out, and a few cards with lines; the learner marks every asymptote and
   no other line. Level 1: vertical asymptotes only (the traps: a root of
   the numerator, a hole, the opposite sign); level 2: vertical and
   horizontal (y = 0 when the degrees are equal, the quotient upside
   down); level 3: oblique (without the independent term, the sign of n, a
   horizontal one that is not there). After checking, the graph shows the
   asymptotes and the hole.
   ========================================================================== */

export const ASYMPTOTE_ROUNDS = 6

export const ASYMPTOTE_BOX = 6

export interface AsymptoteCard {
    latex: string
    right: boolean
}

export interface AsymptoteRound {
    /** The function, for LaTeX */
    latex: string
    cards: AsymptoteCard[]
    /** For the graph: roots of the numerator and the denominator, the leading coefficient */
    top: number[]
    bottom: number[]
    lead: number
    /** The asymptotes to draw */
    verticals: number[]
    horizontal: number | null
    oblique: [number, number] | null
    /** The hole, if a factor cancels */
    hole: [number, number] | null
}

const signed = (value: number) => (value < 0 ? `-${-value}` : `+${value}`)

/** A polynomial from its coefficients, the highest first: [1, -3, 2] → x^2-3x+2 */
export function polynomialLatex(coefficients: number[]): string {
    const degree = coefficients.length - 1
    let text = ''
    coefficients.forEach((coefficient, index) => {
        if (coefficient === 0) return
        const power = degree - index
        const letter = power === 0 ? '' : power === 1 ? 'x' : `x^${power}`
        const size = Math.abs(coefficient) === 1 && power > 0 ? '' : String(Math.abs(coefficient))
        const sign = coefficient < 0 ? '-' : text === '' ? '' : '+'
        text += `${sign}${size}${letter}`
    })
    return text === '' ? '0' : text
}

/** The coefficients of k·(x − r₁)(x − r₂)… */
export function fromRoots(lead: number, roots: number[]): number[] {
    return roots.reduce((coefficients, root) => [...coefficients, 0].map((value, index) => value - root * (coefficients[index - 1] ?? 0)), [lead])
}

/** f(x) from the roots of the numerator and the denominator, or null where it is not defined */
export function asymptoteValue(round: Pick<AsymptoteRound, 'top' | 'bottom' | 'lead'>, x: number): number | null {
    const bottom = round.bottom.reduce((product, root) => product * (x - root), 1)
    if (Math.abs(bottom) < 1e-12) return null
    return (round.lead * round.top.reduce((product, root) => product * (x - root), 1)) / bottom
}

const vertical = (d: number) => `x=${d}`
const horizontal = (b: string) => `y=${b}`
const line = (m: number, n: number) => `y=${m === 1 ? '' : m === -1 ? '-' : m}x${n === 0 ? '' : signed(n)}`

/** Cards: the right ones and the traps, each line once, shuffled */
function cardsOf(random: Random, right: string[], traps: string[]): AsymptoteCard[] | null {
    const cards: AsymptoteCard[] = right.map((latex) => ({ latex, right: true }))
    for (const latex of traps) {
        if (cards.length >= 5) break
        if (!cards.some((card) => card.latex === latex)) cards.push({ latex, right: false })
    }
    if (cards.length < 4 || new Set(cards.map((card) => card.latex)).size !== cards.length) return null
    return shuffle(random, cards)
}

const fraction = (top: number[], bottom: number[]) => `f(x)=\\frac{${polynomialLatex(top)}}{${polynomialLatex(bottom)}}`

/** Level 1: vertical asymptotes, perhaps with a hole */
function verticalRound(random: Random): AsymptoteRound | null {
    const d1 = randomInt(random, -4, 4)
    const d2 = randomInt(random, -4, 4)
    const r = randomInt(random, -4, 4)
    if (d1 === d2 || d1 === 0 || d2 === 0 || r === d2 || d1 === -d2) return null
    // r = d1: a factor cancels and d1 is a hole
    const cancels = r === d1
    const verticals = cancels ? [d2] : [d1, d2]
    const traps = [cancels ? vertical(d1) : vertical(r), vertical(-d1), vertical(-d2), vertical(0)]
    const cards = cardsOf(random, verticals.map(vertical), traps)
    if (!cards) return null
    const hole: [number, number] | null = cancels ? [d1, 1 / (d1 - d2)] : null
    return { latex: fraction(fromRoots(1, [r]), fromRoots(1, [d1, d2])), cards, top: cancels ? [] : [r], bottom: cancels ? [d2] : [d1, d2], lead: 1, verticals, horizontal: null, oblique: null, hole }
}

/** Level 2: vertical and horizontal */
function horizontalRound(random: Random): AsymptoteRound | null {
    const equal = pick(random, [true, true, false])
    const d = randomInt(random, -4, 4)
    if (d === 0) return null
    if (equal) {
        const a = pick(random, [-3, -2, 2, 3])
        const r = randomInt(random, -4, 4)
        if (r === d) return null
        const traps = [horizontal('0'), horizontal(`${a < 0 ? '-' : ''}\\frac{1}{${Math.abs(a)}}`), vertical(-d), vertical(r)]
        const cards = cardsOf(random, [vertical(d), horizontal(String(a))], traps)
        if (!cards) return null
        return { latex: fraction(fromRoots(a, [r]), fromRoots(1, [d])), cards, top: [r], bottom: [d], lead: a, verticals: [d], horizontal: a, oblique: null, hole: null }
    }
    const d2 = randomInt(random, -4, 4)
    const r = randomInt(random, -4, 4)
    if (d2 === d || d2 === 0 || r === d || r === d2 || d === -d2) return null
    const traps = [horizontal('1'), vertical(r), vertical(-d), vertical(-d2)]
    const cards = cardsOf(random, [vertical(d), vertical(d2), horizontal('0')], traps)
    if (!cards) return null
    return { latex: fraction(fromRoots(1, [r]), fromRoots(1, [d, d2])), cards, top: [r], bottom: [d, d2], lead: 1, verticals: [d, d2], horizontal: 0, oblique: null, hole: null }
}

/** Level 3: oblique: (a·x² + p·x + q)/(x − d) = a·x + (p + a·d) + remainder/(x − d) */
function obliqueRound(random: Random): AsymptoteRound | null {
    const a = pick(random, [-2, -1, 1, 2])
    const r1 = randomInt(random, -3, 3)
    const r2 = randomInt(random, -3, 3)
    const d = randomInt(random, -3, 3)
    if (d === r1 || d === r2 || d === 0) return null
    const [, p] = fromRoots(a, [r1, r2])
    const n = p + a * d
    if (n === 0 || Math.abs(n) > 5) return null
    const traps = [line(a, 0), line(a, -n), horizontal(String(a)), vertical(-d), line(a, p)]
    const cards = cardsOf(random, [vertical(d), line(a, n)], traps)
    if (!cards) return null
    return { latex: fraction(fromRoots(a, [r1, r2]), fromRoots(1, [d])), cards, top: [r1, r2], bottom: [d], lead: a, verticals: [d], horizontal: null, oblique: [a, n], hole: null }
}

const makers = [verticalRound, horizontalRound, obliqueRound]

/** Six different rounds of one level */
export function createAsymptoteRounds(random: Random, level: number): AsymptoteRound[] {
    const make = makers[level] ?? verticalRound
    const rounds: AsymptoteRound[] = []
    for (let attempt = 0; rounds.length < ASYMPTOTE_ROUNDS && attempt < 5000; attempt += 1) {
        const round = make(random)
        if (!round || rounds.some((other) => other.latex === round.latex)) continue
        rounds.push(round)
    }
    return rounds
}

/** Whether the marked cards are exactly the asymptotes */
export const isAsymptotePick = (round: AsymptoteRound, marked: number[]) => round.cards.every((card, index) => card.right === marked.includes(index))
