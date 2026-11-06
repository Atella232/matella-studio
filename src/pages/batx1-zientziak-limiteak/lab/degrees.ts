import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   L3 · Maila handienak irabazten du (Gana el de mayor grado): the quotient
   (a·xᵐ + 5xᵐ⁻¹)/(b·xⁿ − 4) with the degrees m and n (1 to 3) and the
   leading coefficients a and b (−3 to 3, not 0) chosen by the learner,
   evaluated at x = 10, 100, 1000 and 10 000. Two bars race: the size of
   the numerator and of the denominator. Before the values are shown the
   learner predicts where the quotient goes as x grows: to 0 (the bottom
   wins, <), to a/b (a draw, =) or to infinity (the top wins, >). ▶ makes x
   grow from 10. The lower terms are there to show that they do not count.
   ========================================================================== */

export const DEGREES_LIMITS = { degree: { min: 1, max: 3 }, coefficient: { min: -3, max: 3 }, k: { min: 1, max: 4 } } as const

export interface DegreesState {
    m: number
    n: number
    a: number
    b: number
    /** x = 10^k */
    k: number
    prediction: Prediction | null
}

export const initialDegreesState: DegreesState = { m: 2, n: 1, a: 1, b: 1, k: 1, prediction: null }

const clamp = (value: number, { min, max }: { min: number; max: number }) => Math.min(max, Math.max(min, Math.round(value)))
/** A leading coefficient is never 0: going down from 1 jumps to −1 and going up from −1 jumps to 1 */
const coefficient = (value: number, previous: number) => {
    const next = clamp(value, DEGREES_LIMITS.coefficient)
    return next !== 0 ? next : previous > 0 ? -1 : 1
}

export function setDegrees(state: DegreesState, patch: Partial<Omit<DegreesState, 'prediction'>>): DegreesState {
    const m = clamp(patch.m ?? state.m, DEGREES_LIMITS.degree)
    const n = clamp(patch.n ?? state.n, DEGREES_LIMITS.degree)
    const a = coefficient(patch.a ?? state.a, state.a)
    const b = coefficient(patch.b ?? state.b, state.b)
    const k = clamp(patch.k ?? state.k, DEGREES_LIMITS.k)
    const unchanged = m === state.m && n === state.n && a === state.a && b === state.b
    return { m, n, a, b, k, prediction: unchanged ? state.prediction : null }
}

export const numeratorValue = (state: DegreesState, x: number) => state.a * x ** state.m + 5 * x ** (state.m - 1)
export const denominatorValue = (state: DegreesState, x: number) => state.b * x ** state.n - 4
export const degreesValue = (state: DegreesState, x: number) => numeratorValue(state, x) / denominatorValue(state, x)

/** The bottom wins (<: the limit is 0), a draw (=: a/b) or the top wins (>: ±∞) */
export const degreesPrediction = (state: DegreesState): Prediction => compareTo(state.m, state.n)

/** The limit as x → +∞: a number, or ±Infinity */
export function degreesLimit(state: DegreesState): number {
    if (state.m < state.n) return 0
    if (state.m === state.n) return state.a / state.b
    return Math.sign(state.a * state.b) * Infinity
}

const power = (degree: number) => (degree === 1 ? 'x' : `x^${degree}`)
const lead = (value: number, degree: number) => `${value === 1 ? '' : value === -1 ? '-' : value}${power(degree)}`

export const numeratorLatex = (state: DegreesState) => `${lead(state.a, state.m)}+5${state.m === 1 ? '' : power(state.m - 1)}`
export const denominatorLatex = (state: DegreesState) => `${lead(state.b, state.n)}-4`
export const degreesLatex = (state: DegreesState) => `f(x)=\\frac{${numeratorLatex(state)}}{${denominatorLatex(state)}}`

const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b))

/** a/b in lowest terms for LaTeX: 3, -2, \frac{1}{2}, -\frac{2}{3} */
export function ratioLatex(a: number, b: number): string {
    const g = gcd(a, b)
    const sign = a * b < 0 ? '-' : ''
    const top = Math.abs(a) / g
    const bottom = Math.abs(b) / g
    return bottom === 1 ? `${sign}${top}` : `${sign}\\frac{${top}}{${bottom}}`
}

const ratioIs = (state: DegreesState, a: number, b: number) => state.m === state.n && state.a * b === a * state.b

export const degreesChallenges: LabChallenge<DegreesState>[] = [
    {
        id: 109301,
        prompt: say('Egin limitea infinituan 3 izan dadin.', 'Haz que el límite en el infinito sea 3.', 'اجعل النهاية عند اللانهاية تساوي 3.', 'Make the limit at infinity equal 3.'),
        hint: say('Maila bera goian eta behean, eta $\\frac{a}{b}=3$.', 'El mismo grado arriba y abajo, y $\\frac{a}{b}=3$.', 'الدرجة نفسها في البسط والمقام، و$\\frac{a}{b}=3$.', 'The same degree on top and below, and $\\frac{a}{b}=3$.'),
        isSolved: (state) => ratioIs(state, 3, 1)
    },
    {
        id: 109302,
        prompt: say('Egin limitea infinituan $-2$ izan dadin.', 'Haz que el límite en el infinito sea $-2$.', 'اجعل النهاية عند اللانهاية تساوي $-2$.', 'Make the limit at infinity equal $-2$.'),
        hint: say('$a$ eta $b$ zeinu desberdinekoak.', '$a$ y $b$ de signos distintos.', '$a$ و$b$ مختلفا الإشارة.', '$a$ and $b$ with different signs.'),
        isSolved: (state) => ratioIs(state, -2, 1)
    },
    {
        id: 109303,
        prompt: say('Goian 2 mailarekin, egin zatidura 0 baliora joan dadin.', 'Con grado 2 arriba, haz que el cociente vaya a 0.', 'مع الدرجة 2 في البسط، اجعل خارج القسمة يتجه إلى 0.', 'With degree 2 on top, make the quotient go to 0.'),
        hint: say('Behekoak irabazi behar du.', 'Tiene que ganar el de abajo.', 'يجب أن يفوز المقام.', 'The bottom has to win.'),
        isSolved: (state) => state.m === 2 && state.n === 3
    },
    {
        id: 109304,
        prompt: say('Egin zatidura $-\\infty$ aldera joan dadin.', 'Haz que el cociente vaya a $-\\infty$.', 'اجعل خارج القسمة يتجه إلى $-\\infty$.', 'Make the quotient go to $-\\infty$.'),
        hint: say('Goikoak irabazi, eta $a$ eta $b$ zeinu desberdinekoak.', 'Que gane el de arriba, con $a$ y $b$ de signos distintos.', 'ليفز البسط، مع $a$ و$b$ مختلفي الإشارة.', 'Let the top win, with $a$ and $b$ of different signs.'),
        isSolved: (state) => degreesLimit(state) === -Infinity
    },
    {
        id: 109305,
        prompt: say('Goian eta behean 3 mailarekin, egin limitea $\\frac{1}{2}$ izan dadin.', 'Con grado 3 arriba y abajo, haz que el límite sea $\\frac{1}{2}$.', 'مع الدرجة 3 في البسط والمقام، اجعل النهاية $\\frac{1}{2}$.', 'With degree 3 on top and below, make the limit $\\frac{1}{2}$.'),
        hint: say('$b$ zenbakiak $a$ zenbakiaren bikoitza izan behar du.', '$b$ tiene que ser el doble de $a$.', 'يجب أن يكون $b$ ضعف $a$.', '$b$ has to be twice $a$.'),
        isSolved: (state) => state.m === 3 && ratioIs(state, 1, 2)
    }
]

/** Endless practice: a given limit with given degrees */
const degreesMaker: LabChallengeMaker<DegreesState> = (random) => {
    const kind = randomInt(random, 0, 2)
    if (kind === 0) {
        const degree = randomInt(random, 1, 3)
        const a = randomInt(random, 1, 3) * (randomInt(random, 0, 1) === 0 ? 1 : -1)
        const b = randomInt(random, 1, 3) * (randomInt(random, 0, 1) === 0 ? 1 : -1)
        const limit = `$${ratioLatex(a, b)}$`
        return {
            prompt: say(`Goian eta behean ${degree} mailarekin, egin limitea ${limit} izan dadin.`, `Con grado ${degree} arriba y abajo, haz que el límite sea ${limit}.`, `مع الدرجة ${degree} في البسط والمقام، اجعل النهاية ${limit}.`, `With degree ${degree} on top and below, make the limit ${limit}.`),
            hint: say('Limitea koefiziente nagusien zatidura da: $\\frac{a}{b}$.', 'El límite es el cociente de los coeficientes principales: $\\frac{a}{b}$.', 'النهاية هي خارج قسمة المعاملين الرئيسيين: $\\frac{a}{b}$.', 'The limit is the quotient of the leading coefficients: $\\frac{a}{b}$.'),
            isSolved: (state) => state.m === degree && ratioIs(state, a, b),
            solution: { m: degree, n: degree, a, b, k: 1, prediction: null }
        }
    }
    if (kind === 1) {
        const m = randomInt(random, 1, 2)
        return {
            prompt: say(`Goian ${m} mailarekin, egin zatidura 0 baliora joan dadin.`, `Con grado ${m} arriba, haz que el cociente vaya a 0.`, `مع الدرجة ${m} في البسط، اجعل خارج القسمة يتجه إلى 0.`, `With degree ${m} on top, make the quotient go to 0.`),
            hint: say('Behean maila handiagoa.', 'Abajo, un grado mayor.', 'درجة أكبر في المقام.', 'A higher degree below.'),
            isSolved: (state) => state.m === m && state.n > m,
            solution: { m, n: m + 1, a: 1, b: 1, k: 1, prediction: null }
        }
    }
    const n = randomInt(random, 1, 2)
    const sign = randomInt(random, 0, 1) === 0 ? 1 : -1
    const infinity = sign > 0 ? '$+\\infty$' : '$-\\infty$'
    return {
        prompt: say(`Behean ${n} mailarekin, egin zatidura ${infinity} aldera joan dadin.`, `Con grado ${n} abajo, haz que el cociente vaya a ${infinity}.`, `مع الدرجة ${n} في المقام، اجعل خارج القسمة يتجه إلى ${infinity}.`, `With degree ${n} below, make the quotient go to ${infinity}.`),
        hint: say('Goian maila handiagoa; zeinua $\\frac{a}{b}$ zatidurarena da.', 'Arriba, un grado mayor; el signo es el de $\\frac{a}{b}$.', 'درجة أكبر في البسط؛ والإشارة إشارة $\\frac{a}{b}$.', 'A higher degree on top; the sign is that of $\\frac{a}{b}$.'),
        isSolved: (state) => state.n === n && degreesLimit(state) === sign * Infinity,
        solution: { m: n + 1, n, a: sign, b: 1, k: 1, prediction: null }
    }
}

export const degreesExtra = freshFrom(initialDegreesState, degreesMaker)
