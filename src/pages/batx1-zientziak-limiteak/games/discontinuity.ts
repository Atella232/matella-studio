import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J3 · Zer etenune? (¿Qué discontinuidad?): a function and a point a; the
   learner says whether it is continuous there or has a removable
   discontinuity, a finite jump or an infinite jump. Level 1: from the
   graph; level 2: from a piecewise formula (the graph comes after
   answering); level 3: from a formula with a quotient, |x − a| or E(x),
   where a corner is still continuous. Every round keeps both one-sided
   limits and f(a), which the verdict shows.
   ========================================================================== */

export type DiscontinuityKind = 'continuous' | 'removable' | 'jump' | 'infinite'

export const DISCONTINUITY_KINDS: DiscontinuityKind[] = ['continuous', 'removable', 'jump', 'infinite']

export const DISCONTINUITY_ROUNDS = 6

export const DISCONTINUITY_BOX = 5

export interface Piece {
    fn: (x: number) => number
    from: number
    to: number
}

export interface DiscontinuityRound {
    kind: string
    answer: DiscontinuityKind
    a: number
    /** The formula (levels 2 and 3); level 1 shows only the graph */
    latex: string | null
    pieces: Piece[]
    open: Array<[number, number]>
    full: Array<[number, number]>
    verticals: number[]
    /** The one-sided limits (±Infinity for an infinite jump) and f(a), or null where it does not exist */
    left: number
    right: number
    value: number | null
}

const B = DISCONTINUITY_BOX
const signed = (value: number) => (value < 0 ? `-${-value}` : `+${value}`)
/** m·x + c for LaTeX */
export function linearLatex(m: number, c: number): string {
    const lead = m === 0 ? '' : m === 1 ? 'x' : m === -1 ? '-x' : `${m}x`
    if (lead === '') return String(c)
    return c === 0 ? lead : `${lead}${signed(c)}`
}
const factor = (a: number) => (a === 0 ? 'x' : `x${signed(-a)}`)
const cases = (top: string, topWhere: string, bottom: string, bottomWhere: string) => `f(x)=\\begin{cases}${top} & ${topWhere}\\\\ ${bottom} & ${bottomWhere}\\end{cases}`

/** The kind that the limits and f(a) give */
export function kindOf(round: Pick<DiscontinuityRound, 'left' | 'right' | 'value'>): DiscontinuityKind {
    if (!Number.isFinite(round.left) || !Number.isFinite(round.right)) return 'infinite'
    if (round.left !== round.right) return 'jump'
    return round.value === round.left ? 'continuous' : 'removable'
}

/** Level 1: drawn with lines (slopes ±1/2 or ±1) and a hyperbola for the infinite jump */
function graphRound(random: Random, answer: DiscontinuityKind): DiscontinuityRound | null {
    const a = randomInt(random, -2, 2)
    const y0 = randomInt(random, -2, 3)
    const m1 = pick(random, [-1, -0.5, 0.5, 1])
    const m2 = pick(random, [-1, -0.5, 0.5, 1])
    const left = (x: number) => y0 + m1 * (x - a)
    if (answer === 'continuous') {
        return { kind: 'graph-continuous', answer, a, latex: null, pieces: [{ fn: left, from: -B, to: a }, { fn: (x) => y0 + m2 * (x - a), from: a, to: B }], open: [], full: [[a, y0]], verticals: [], left: y0, right: y0, value: y0 }
    }
    if (answer === 'removable') {
        const y1 = randomInt(random, -3, 4)
        const value = pick(random, [y1, null])
        if (value === y0) return null
        return { kind: 'graph-removable', answer, a, latex: null, pieces: [{ fn: left, from: -B, to: a }, { fn: left, from: a, to: B }], open: [[a, y0]], full: value === null ? [] : [[a, value]], verticals: [], left: y0, right: y0, value }
    }
    if (answer === 'jump') {
        const y1 = randomInt(random, -3, 4)
        if (y1 === y0) return null
        const closedLeft = pick(random, [true, false])
        return { kind: 'graph-jump', answer, a, latex: null, pieces: [{ fn: left, from: -B, to: a }, { fn: (x) => y1 + m2 * (x - a), from: a, to: B }], open: [closedLeft ? [a, y1] : [a, y0]], full: [closedLeft ? [a, y0] : [a, y1]], verticals: [], left: y0, right: y1, value: closedLeft ? y0 : y1 }
    }
    const k = pick(random, [-1, 1])
    return { kind: 'graph-infinite', answer, a, latex: null, pieces: [{ fn: (x) => y0 + k / (x - a), from: -B, to: a - 0.05 }, { fn: (x) => y0 + m2 * (x - a), from: a, to: B }], open: [], full: [[a, y0]], verticals: [a], left: -k * Infinity, right: y0, value: y0 }
}

/** Level 2: piecewise formulas with whole numbers */
function piecewiseRound(random: Random, answer: DiscontinuityKind): DiscontinuityRound | null {
    const a = randomInt(random, -1, 2)
    const m1 = pick(random, [-2, -1, 1, 2])
    const m2 = pick(random, [-2, -1, 1, 2])
    const c1 = randomInt(random, -3, 3)
    const y0 = m1 * a + c1
    if (Math.abs(y0) > 4) return null
    const L = (x: number) => m1 * x + c1
    const less = `x<${a}`
    const atLeast = `x\\ge ${a}`
    if (answer === 'continuous' || answer === 'jump') {
        const y1 = answer === 'continuous' ? y0 : y0 + pick(random, [-3, -2, -1, 1, 2, 3])
        if (Math.abs(y1) > 4) return null
        const c2 = y1 - m2 * a
        return { kind: `piecewise-${answer}`, answer, a, latex: cases(linearLatex(m1, c1), less, linearLatex(m2, c2), atLeast), pieces: [{ fn: L, from: -B, to: a }, { fn: (x) => m2 * x + c2, from: a, to: B }], open: answer === 'jump' ? [[a, y0]] : [], full: [[a, y1]], verticals: [], left: y0, right: y1, value: y1 }
    }
    if (answer === 'removable') {
        const v = y0 + pick(random, [-3, -2, 2, 3])
        if (Math.abs(v) > 4) return null
        return { kind: 'piecewise-removable', answer, a, latex: cases(linearLatex(m1, c1), `x\\neq ${a}`, String(v), `x=${a}`), pieces: [{ fn: L, from: -B, to: a }, { fn: L, from: a, to: B }], open: [[a, y0]], full: [[a, v]], verticals: [], left: y0, right: y0, value: v }
    }
    const c = randomInt(random, -2, 2)
    const right = a + c
    if (Math.abs(right) > 4) return null
    return { kind: 'piecewise-infinite', answer, a, latex: cases(`\\frac{1}{${factor(a)}}`, less, linearLatex(1, c), atLeast), pieces: [{ fn: (x) => 1 / (x - a), from: -B, to: a - 0.05 }, { fn: (x) => x + c, from: a, to: B }], open: [], full: [[a, right]], verticals: [a], left: -Infinity, right, value: right }
}

/** Level 3: a quotient that simplifies, k/0, |x − a|/(x − a), E(x) and the corner of |x − a| */
function formulaRound(random: Random, answer: DiscontinuityKind): DiscontinuityRound | null {
    const a = randomInt(random, -2, 2)
    if (answer === 'removable') {
        const b = randomInt(random, -3, 3)
        if (b === a || Math.abs(a - b) > 4) return null
        const numerator = `x^2${a + b === 0 ? '' : `${a + b > 0 ? '-' : '+'}${Math.abs(a + b) === 1 ? '' : Math.abs(a + b)}x`}${a * b === 0 ? '' : signed(a * b)}`
        const g = (x: number) => x - b
        return { kind: 'quotient-removable', answer, a, latex: `f(x)=\\frac{${numerator}}{${factor(a)}}`, pieces: [{ fn: g, from: -B, to: a }, { fn: g, from: a, to: B }], open: [[a, a - b]], full: [], verticals: [], left: a - b, right: a - b, value: null }
    }
    if (answer === 'infinite') {
        const b = randomInt(random, -3, 3)
        if (a + b === 0) return null
        const g = (x: number) => (x + b) / (x - a)
        const sign = Math.sign(a + b)
        return { kind: 'quotient-infinite', answer, a, latex: `f(x)=\\frac{${factor(-b)}}{${factor(a)}}`, pieces: [{ fn: g, from: -B, to: a - 0.02 }, { fn: g, from: a + 0.02, to: B }], open: [], full: [], verticals: [a], left: -sign * Infinity, right: sign * Infinity, value: null }
    }
    if (answer === 'jump') {
        if (pick(random, [true, false])) {
            return { kind: 'sign-jump', answer, a, latex: `f(x)=\\frac{|${factor(a)}|}{${factor(a)}}`, pieces: [{ fn: () => -1, from: -B, to: a }, { fn: () => 1, from: a, to: B }], open: [[a, -1], [a, 1]], full: [], verticals: [], left: -1, right: 1, value: null }
        }
        const pieces: Piece[] = Array.from({ length: 2 * B }, (_, i) => -B + i).map((n) => ({ fn: () => n, from: n, to: n + 1 }))
        return { kind: 'floor-jump', answer, a, latex: 'f(x)=E(x)', pieces, open: [[a, a - 1]], full: [[a, a]], verticals: [], left: a - 1, right: a, value: a }
    }
    const c = randomInt(random, -2, 2)
    if (pick(random, [true, false])) {
        const g = (x: number) => Math.abs(x - a) + c
        return { kind: 'corner', answer, a, latex: `f(x)=|${factor(a)}|${c === 0 ? '' : signed(c)}`, pieces: [{ fn: g, from: -B, to: a }, { fn: g, from: a, to: B }], open: [], full: [[a, c]], verticals: [], left: c, right: c, value: c }
    }
    const g = (x: number) => (2 * x) / (x * x + 1)
    return { kind: 'quotient-continuous', answer, a, latex: 'f(x)=\\frac{2x}{x^2+1}', pieces: [{ fn: g, from: -B, to: B }], open: [], full: [[a, g(a)]], verticals: [], left: g(a), right: g(a), value: g(a) }
}

const makers = [graphRound, piecewiseRound, formulaRound]

/** Six different rounds of one level, with every kind at least once */
export function createDiscontinuityRounds(random: Random, level: number): DiscontinuityRound[] {
    const make = makers[level] ?? graphRound
    const answers = shuffle(random, [...DISCONTINUITY_KINDS, pick(random, DISCONTINUITY_KINDS), pick(random, DISCONTINUITY_KINDS)])
    const rounds: DiscontinuityRound[] = []
    const key = (round: DiscontinuityRound) => `${round.kind}|${round.a}|${round.latex}|${round.left}|${round.right}|${round.value}|${round.full.join(';')}`
    for (const answer of answers) {
        for (let attempt = 0; attempt < 500; attempt += 1) {
            const round = make(random, answer)
            if (!round || rounds.some((other) => key(other) === key(round))) continue
            rounds.push(round)
            break
        }
    }
    return rounds
}
