import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'
import { numberLatex } from '../../batx1-zientziak-integralak/lab/numbers.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L2 · Fracciones simples: a rational function R with its denominator
   factorised, and the two pieces A/(x − a) + B/(x − b) (or A/(x − a) +
   B/(x − a)² for a double root). The learner moves A and B in half steps
   and sees the graph of the sum laid over the graph of R: when they
   match, that is the decomposition, and the integral is written out.
   Before the sum appears, a guess: will A be negative, zero or positive?
   (the cover-up rule: A = N(a)/(a − b)). Pure logic, exported for
   2.º Sociales; the drawing is in Bach2IndefiniteTools.
   ========================================================================== */

export interface FractionSpec {
    kind: 'simple' | 'double'
    a: number
    /** The other root (equal to a for a double root) */
    b: number
    A: number
    B: number
}

/** A and B move in half steps, from −4 to 4 */
export const FRACTION_LIMITS = { half: { min: -8, max: 8 } } as const

export const FRACTION_CASES: FractionSpec[] = [
    { kind: 'simple', a: 1, b: -2, A: 2, B: -1 },
    { kind: 'simple', a: 1, b: -1, A: 2, B: 1 },
    { kind: 'simple', a: 2, b: -2, A: 1, B: -1 },
    { kind: 'double', a: 1, b: 1, A: 2, B: 3 },
    { kind: 'double', a: 1, b: 1, A: 0, B: 3 },
    { kind: 'double', a: -2, b: -2, A: 1, B: -2 }
]

/** The numerator N(x) = p·x + q of R = N / denominator */
export function numerator(spec: FractionSpec): [number, number] {
    return spec.kind === 'simple'
        ? [spec.A + spec.B, -(spec.A * spec.b + spec.B * spec.a)]
        : [spec.A, spec.B - spec.A * spec.a]
}

/** R(x), the rational function the pieces must rebuild */
export function rational(spec: FractionSpec, x: number): number {
    const [p, q] = numerator(spec)
    const denominator = spec.kind === 'simple' ? (x - spec.a) * (x - spec.b) : (x - spec.a) ** 2
    return (p * x + q) / denominator
}

/** The sum of the pieces with the learner's A and B */
export function pieces(spec: FractionSpec, A: number, B: number, x: number): number {
    return spec.kind === 'simple' ? A / (x - spec.a) + B / (x - spec.b) : A / (x - spec.a) + B / (x - spec.a) ** 2
}

/** x − a written as LaTeX (x+2 for a = −2, x for a = 0) */
export const linear = (a: number) => (a === 0 ? 'x' : a > 0 ? `x-${a}` : `x+${-a}`)

/** p·x + q as LaTeX */
export function polyLatex([p, q]: [number, number]): string {
    const head = p === 0 ? '' : p === 1 ? 'x' : p === -1 ? '-x' : `${p}x`
    if (!head) return String(q)
    return q === 0 ? head : `${head}${q > 0 ? '+' : '-'}${Math.abs(q)}`
}

export const denominatorLatex = (spec: FractionSpec) => (spec.kind === 'simple' ? `(${linear(spec.a)})(${linear(spec.b)})` : `(${linear(spec.a)})^2`)

export const rationalLatex = (spec: FractionSpec) => `R(x)=\\frac{${polyLatex(numerator(spec))}}{${denominatorLatex(spec)}}`

/** A coefficient times a term, with its sign, as LaTeX: +2\ln|x-1|, -\frac{1}{2}\ln|x+3| */
function signed(value: number, term: string, first: boolean): string {
    if (value === 0) return ''
    const size = numberLatex(Math.abs(value))
    const body = size === '1' ? term : `${size}${term}`
    return value < 0 ? `-${body}` : first ? body : `+${body}`
}

/** The pieces with the learner's values: \frac{2}{x-1}-\frac{1}{x+2} */
export function piecesLatex(spec: FractionSpec, A: number, B: number): string {
    const fraction = (value: number, denominator: string, first: boolean) => {
        const top = numberLatex(Math.abs(value))
        const body = `\\frac{${top}}{${denominator}}`
        return value < 0 ? `-${body}` : first ? body : `+${body}`
    }
    const second = spec.kind === 'simple' ? linear(spec.b) : `(${linear(spec.a)})^2`
    return `${fraction(A, linear(spec.a), true)}${fraction(B, second, false)}`
}

/** ∫ R dx once A and B are right */
export function integralLatex(spec: FractionSpec): string {
    const first = signed(spec.A, `\\ln|${linear(spec.a)}|`, true)
    // A double root: ∫ B/(x − a)² dx = −B/(x − a), written as one fraction
    const power = -spec.B
    const second = spec.kind === 'simple'
        ? signed(spec.B, `\\ln|${linear(spec.b)}|`, !first)
        : `${power < 0 ? '-' : first ? '+' : ''}\\frac{${numberLatex(Math.abs(power))}}{${linear(spec.a)}}`
    return `\\int R(x)\\,dx=${first}${second}+k`
}

export interface FractionState {
    spec: FractionSpec
    /** A = half / 2 and B = half / 2 */
    halfA: number
    halfB: number
    prediction: Prediction | null
}

export const initialFractionState: FractionState = { spec: FRACTION_CASES[0], halfA: 0, halfB: 0, prediction: null }

const clampHalf = (value: number) => Math.min(FRACTION_LIMITS.half.max, Math.max(FRACTION_LIMITS.half.min, Math.round(value)))

const sameSpec = (one: FractionSpec, other: FractionSpec) => one.kind === other.kind && one.a === other.a && one.b === other.b && one.A === other.A && one.B === other.B

/** A new fraction starts with A = B = 0 and asks for a new guess; moving A or B does not */
export function setFraction(state: FractionState, patch: Partial<Omit<FractionState, 'prediction'>>): FractionState {
    const spec = patch.spec ?? state.spec
    if (!sameSpec(spec, state.spec)) return { spec, halfA: clampHalf(patch.halfA ?? 0), halfB: clampHalf(patch.halfB ?? 0), prediction: null }
    return { spec: state.spec, halfA: clampHalf(patch.halfA ?? state.halfA), halfB: clampHalf(patch.halfB ?? state.halfB), prediction: state.prediction }
}

export const fractionA = (state: FractionState) => state.halfA / 2
export const fractionB = (state: FractionState) => state.halfB / 2

/** The pieces rebuild R exactly */
export const fractionMatches = (state: FractionState) => fractionA(state) === state.spec.A && fractionB(state) === state.spec.B

/** The sign of the A that rebuilds R */
export const fractionPrediction = (state: FractionState): Prediction => compareTo(state.spec.A, 0)

const withR = (spec: FractionSpec, goal: LocalizedText): LocalizedText => {
    const r = rationalLatex(spec)
    return say(`$${r}$ funtzioarekin, ${goal.eu}`, `Con $${r}$, ${goal.es}`, `مع $${r}$، ${goal.ar}`, `With $${r}$, ${goal.en}`)
}

const matchGoal = say('doitu $A$ eta $B$, bi kurbak bat etor daitezen.', 'ajusta $A$ y $B$ hasta que las dos curvas coincidan.', 'اضبط $A$ و$B$ حتى يتطابق المنحنيان.', 'adjust $A$ and $B$ until the two curves match.')
const coverHint = say('Estali erro baten faktorea, eta ordeztu $x$ erro horrekin: hori da haren koefizientea.', 'Tapa el factor de una raíz y sustituye $x$ por esa raíz: ese es su coeficiente.', 'غطِّ عامل جذر وعوّض $x$ بذلك الجذر: هذا معامله.', 'Cover the factor of one root and put that root in for $x$: that is its coefficient.')
const doubleHint = say('$B$ ateratzeko, ordeztu $x=a$; $A$ ateratzeko, eman $x$ aldagaiari beste balio bat.', 'Para $B$, sustituye $x=a$; para $A$, da a $x$ otro valor.', 'لإيجاد $B$ عوّض $x=a$، ولإيجاد $A$ أعطِ $x$ قيمة أخرى.', 'For $B$, put $x=a$; for $A$, give $x$ another value.')

const solves = (spec: FractionSpec) => (state: FractionState) => sameSpec(state.spec, spec) && fractionMatches(state)

export const fractionChallenges: LabChallenge<FractionState>[] = [
    { id: 126201, prompt: withR(FRACTION_CASES[0], matchGoal), hint: coverHint, isSolved: solves(FRACTION_CASES[0]) },
    { id: 126202, prompt: withR(FRACTION_CASES[1], matchGoal), hint: coverHint, isSolved: solves(FRACTION_CASES[1]) },
    { id: 126203, prompt: withR(FRACTION_CASES[3], matchGoal), hint: doubleHint, isSolved: solves(FRACTION_CASES[3]) },
    { id: 126204, prompt: withR(FRACTION_CASES[4], say('aurkitu bi kurbak bat etortzeko $A$ eta $B$. Bat zero izan daiteke.', 'encuentra $A$ y $B$ para que coincidan. Uno puede ser cero.', 'أوجد $A$ و$B$ ليتطابقا. قد يكون أحدهما صفرًا.', 'find $A$ and $B$ so that they match. One of them may be zero.')), hint: doubleHint, isSolved: solves(FRACTION_CASES[4]) },
    { id: 126205, prompt: withR(FRACTION_CASES[2], matchGoal), hint: coverHint, isSolved: solves(FRACTION_CASES[2]) }
]

/** Endless practice: a new fraction with whole A and B */
const fractionMaker: LabChallengeMaker<FractionState> = (random) => {
    for (;;) {
        const double = random() < 0.35
        const a = randomInt(random, -3, 3)
        const b = double ? a : randomInt(random, -3, 3)
        const A = randomInt(random, -3, 3)
        const B = randomInt(random, -3, 3)
        if ((!double && (a === b || A === 0)) || B === 0) continue
        const spec: FractionSpec = { kind: double ? 'double' : 'simple', a, b, A, B }
        const [p, q] = numerator(spec)
        // A numerator that cancels with the denominator would not be a real decomposition
        if (p === 0 && q === 0) continue
        return {
            prompt: withR(spec, matchGoal),
            hint: double ? doubleHint : coverHint,
            isSolved: solves(spec),
            solution: { spec, halfA: 2 * A, halfB: 2 * B, prediction: compareTo(A, 0) }
        }
    }
}

export const fractionExtra = freshFrom(initialFractionState, fractionMaker)
