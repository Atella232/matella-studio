import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   L1 · Epsilon eta delta (Épsilon y delta): four functions with a limit
   L at a point a. The learner picks the band ε around L and the strip δ
   around a, from two short lists; the piece of the curve over the strip
   turns green when it stays inside the band and red when it leaves it.
   Before the drawing is shown the learner predicts whether the largest δ
   that works is smaller than ε, equal to it or larger (it is ε divided
   by the slope near a). ▶ opens the strip. Every function is monotonic
   near a, so the worst distance over the open strip is at its ends.
   ========================================================================== */

export type EpsilonFunction = 'steep' | 'gentle' | 'hole' | 'square'

export const EPSILON_FUNCTIONS: EpsilonFunction[] = ['steep', 'gentle', 'hole', 'square']

/** The ε that can be chosen, from wide to narrow */
export const EPSILONS = [1, 0.5, 0.2, 0.1]
/** The δ that can be chosen, from wide to narrow */
export const DELTAS = [2, 1, 0.5, 0.4, 0.25, 0.2, 0.1, 0.05, 0.02, 0.01]

export const EPSILON_LIMITS = { e: { min: 0, max: EPSILONS.length - 1 }, d: { min: 0, max: DELTAS.length - 1 } } as const

export interface EpsilonState {
    fn: EpsilonFunction
    /** Index in EPSILONS */
    e: number
    /** Index in DELTAS */
    d: number
    prediction: Prediction | null
}

export const initialEpsilonState: EpsilonState = { fn: 'steep', e: 0, d: 0, prediction: null }

export function setEpsilon(state: EpsilonState, patch: Partial<Omit<EpsilonState, 'prediction'>>): EpsilonState {
    const fn = patch.fn ?? state.fn
    const clamp = (value: number, max: number) => Math.min(max, Math.max(0, Math.round(value)))
    return { fn, e: clamp(patch.e ?? state.e, EPSILON_LIMITS.e.max), d: clamp(patch.d ?? state.d, EPSILON_LIMITS.d.max), prediction: fn === state.fn ? state.prediction : null }
}

interface EpsilonSetup {
    a: number
    limit: number
    /** f near a (the hole function is x + 1 there) */
    f: (x: number) => number
    /** f is not defined at a */
    hole: boolean
    latex: string
    /** The largest δ that works for an ε, exactly */
    bestDelta: (epsilon: number) => number
    view: { xMin: number; xMax: number; yMin: number; yMax: number }
}

export const EPSILON_SETUP: Record<EpsilonFunction, EpsilonSetup> = {
    steep: { a: 1, limit: 2, f: (x) => 3 * x - 1, hole: false, latex: 'f(x)=3x-1', bestDelta: (epsilon) => epsilon / 3, view: { xMin: -1, xMax: 3, yMin: -1, yMax: 5 } },
    gentle: { a: 2, limit: 2, f: (x) => x / 2 + 1, hole: false, latex: 'f(x)=\\frac{x}{2}+1', bestDelta: (epsilon) => 2 * epsilon, view: { xMin: 0, xMax: 4, yMin: 0, yMax: 4 } },
    hole: { a: 1, limit: 2, f: (x) => x + 1, hole: true, latex: 'f(x)=\\frac{x^2-1}{x-1}', bestDelta: (epsilon) => epsilon, view: { xMin: -1, xMax: 3, yMin: -1, yMax: 5 } },
    square: { a: 1, limit: 1, f: (x) => x * x, hole: false, latex: 'f(x)=x^2', bestDelta: (epsilon) => Math.sqrt(1 + epsilon) - 1, view: { xMin: -1, xMax: 3, yMin: -1, yMax: 5 } }
}

export const epsilonOf = (state: EpsilonState) => EPSILONS[state.e]
export const deltaOf = (state: EpsilonState) => DELTAS[state.d]

/** The farthest f gets from L over the open strip 0 < |x − a| < δ (reached at its ends, never inside) */
export function worstDistance(state: EpsilonState): number {
    const { a, limit, f } = EPSILON_SETUP[state.fn]
    const delta = deltaOf(state)
    return Math.max(Math.abs(f(a - delta) - limit), Math.abs(f(a + delta) - limit))
}

/** The strip fits: every x of the strip sends f(x) inside the band (the ends themselves are left out) */
export const deltaWorks = (state: EpsilonState) => worstDistance(state) <= epsilonOf(state) + 1e-9

/** The index of the largest δ of the list that works for this ε */
export function largestDeltaIndex(fn: EpsilonFunction, e: number): number {
    return DELTAS.findIndex((_, d) => deltaWorks({ fn, e, d, prediction: null }))
}

/** δ works and the next wider δ of the list does not */
export const isLargestDelta = (state: EpsilonState) => state.d === largestDeltaIndex(state.fn, state.e)

/** The largest δ that works, compared with ε: smaller (steep), equal (slope 1) or larger (gentle) */
export function epsilonPrediction(state: EpsilonState): Prediction {
    const epsilon = epsilonOf(state)
    return compareTo(EPSILON_SETUP[state.fn].bestDelta(epsilon), epsilon)
}

const at = (fn: EpsilonFunction, e: number) => (state: EpsilonState) => state.fn === fn && state.e === e && isLargestDelta(state)

export const epsilonChallenges: LabChallenge<EpsilonState>[] = [
    {
        id: 122101,
        prompt: say('$3x-1$ funtzioan, $\\varepsilon=0{,}5$ baliorako, aurkitu zerrendako $\\delta$ handiena, balio duena.', 'En $3x-1$, con $\\varepsilon=0{,}5$, encuentra el mayor $\\delta$ de la lista que sirve.', 'في $3x-1$ ومع $\\varepsilon=0{,}5$، أوجد أكبر $\\delta$ في القائمة تصلح.', 'In $3x-1$, with $\\varepsilon=0{,}5$, find the largest $\\delta$ of the list that works.'),
        hint: say('Malda 3 da: $\\delta$ ezin da $\\frac{0{,}5}{3}$ baino handiagoa izan.', 'La pendiente es 3: $\\delta$ no puede pasar de $\\frac{0{,}5}{3}$.', 'الميل 3: لا يمكن أن تتجاوز $\\delta$ القيمة $\\frac{0{,}5}{3}$.', 'The slope is 3: $\\delta$ cannot go above $\\frac{0{,}5}{3}$.'),
        isSolved: at('steep', 1)
    },
    {
        id: 122102,
        prompt: say('$\\frac{x}{2}+1$ funtzioan, $\\varepsilon=0{,}2$ baliorako, aurkitu $\\delta$ handiena: $\\varepsilon$ baino handiagoa da.', 'En $\\frac{x}{2}+1$, con $\\varepsilon=0{,}2$, encuentra el mayor $\\delta$: es mayor que $\\varepsilon$.', 'في $\\frac{x}{2}+1$ ومع $\\varepsilon=0{,}2$، أوجد أكبر $\\delta$: إنها أكبر من $\\varepsilon$.', 'In $\\frac{x}{2}+1$, with $\\varepsilon=0{,}2$, find the largest $\\delta$: it is larger than $\\varepsilon$.'),
        hint: say('Malda $\\frac{1}{2}$ da: $\\delta=2\\varepsilon$.', 'La pendiente es $\\frac{1}{2}$: $\\delta=2\\varepsilon$.', 'الميل $\\frac{1}{2}$: ‏$\\delta=2\\varepsilon$.', 'The slope is $\\frac{1}{2}$: $\\delta=2\\varepsilon$.'),
        isSolved: at('gentle', 2)
    },
    {
        id: 122103,
        prompt: say('$\\frac{x^2-1}{x-1}$ funtzioan ez dago $f(1)$, baina limitea badago. $\\varepsilon=0{,}1$ baliorako, aurkitu $\\delta$ handiena.', 'En $\\frac{x^2-1}{x-1}$ no existe $f(1)$, pero sí el límite. Con $\\varepsilon=0{,}1$, encuentra el mayor $\\delta$.', 'في $\\frac{x^2-1}{x-1}$ لا توجد $f(1)$ لكن النهاية موجودة. مع $\\varepsilon=0{,}1$ أوجد أكبر $\\delta$.', 'In $\\frac{x^2-1}{x-1}$, $f(1)$ does not exist, but the limit does. With $\\varepsilon=0{,}1$, find the largest $\\delta$.'),
        hint: say('Zulotik kanpo $x+1$ da: malda 1.', 'Fuera del agujero es $x+1$: pendiente 1.', 'خارج الثقب هي $x+1$: الميل 1.', 'Away from the hole it is $x+1$: slope 1.'),
        isSolved: at('hole', 3)
    },
    {
        id: 122104,
        prompt: say('$x^2$ funtzioan, $x=1$ puntuan, $\\varepsilon=1$ baliorako, aurkitu $\\delta$ handiena.', 'En $x^2$, en $x=1$, con $\\varepsilon=1$, encuentra el mayor $\\delta$.', 'في $x^2$ عند $x=1$ ومع $\\varepsilon=1$، أوجد أكبر $\\delta$.', 'In $x^2$, at $x=1$, with $\\varepsilon=1$, find the largest $\\delta$.'),
        hint: say('Eskuineko aldea da arriskutsuena: $(1+\\delta)^2-1\\le 1$.', 'El lado derecho es el peligroso: $(1+\\delta)^2-1\\le 1$.', 'الجانب الأيمن هو الأخطر: $(1+\\delta)^2-1\\le 1$.', 'The right side is the risky one: $(1+\\delta)^2-1\\le 1$.'),
        isSolved: at('square', 0)
    },
    {
        id: 122105,
        prompt: say('$3x-1$ funtzioan, estutu banda $\\varepsilon=0{,}1$ izan arte eta aurkitu $\\delta$ handiena.', 'En $3x-1$, estrecha la banda hasta $\\varepsilon=0{,}1$ y encuentra el mayor $\\delta$.', 'في $3x-1$ ضيّق الشريط حتى $\\varepsilon=0{,}1$ وأوجد أكبر $\\delta$.', 'In $3x-1$, narrow the band to $\\varepsilon=0{,}1$ and find the largest $\\delta$.'),
        hint: say('Banda estuago, zerrenda estuago.', 'Banda más estrecha, franja más estrecha.', 'شريط أضيق، شريحة أضيق.', 'A narrower band, a narrower strip.'),
        isSolved: at('steep', 3)
    }
]

const FN_LATEX: Record<EpsilonFunction, string> = { steep: '3x-1', gentle: '\\frac{x}{2}+1', hole: '\\frac{x^2-1}{x-1}', square: 'x^2' }
export const EPSILON_LATEX = ['1', '0{,}5', '0{,}2', '0{,}1']

/** Endless practice: the largest δ of the list for a function and an ε */
const epsilonMaker: LabChallengeMaker<EpsilonState> = (random) => {
    const fn = EPSILON_FUNCTIONS[randomInt(random, 0, EPSILON_FUNCTIONS.length - 1)]
    const e = randomInt(random, 0, EPSILONS.length - 1)
    const f = `$${FN_LATEX[fn]}$`
    const eps = `$\\varepsilon=${EPSILON_LATEX[e]}$`
    return {
        prompt: say(`${f} funtzioan, ${eps} baliorako, aurkitu zerrendako $\\delta$ handiena, balio duena.`, `En ${f}, con ${eps}, encuentra el mayor $\\delta$ de la lista que sirve.`, `في ${f} ومع ${eps}، أوجد أكبر $\\delta$ في القائمة تصلح.`, `In ${f}, with ${eps}, find the largest $\\delta$ of the list that works.`),
        hint: say('Zatitu $\\varepsilon$ maldaz.', 'Divide $\\varepsilon$ entre la pendiente.', 'اقسم $\\varepsilon$ على الميل.', 'Divide $\\varepsilon$ by the slope.'),
        isSolved: at(fn, e),
        solution: { fn, e, d: largestDeltaIndex(fn, e), prediction: null }
    }
}

export const epsilonExtra = freshFrom(initialEpsilonState, epsilonMaker)
