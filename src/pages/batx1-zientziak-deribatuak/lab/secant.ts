import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L1 · De la secante a la tangente: a curve, the point P = (a, f(a)) and
   the point Q = (a + h, f(a + h)). The secant through P and Q has slope
   (f(a + h) − f(a))/h; as h shrinks (1, 0,5, 0,1, 0,01, 0,001) it turns
   into the tangent, of slope f′(a). Before the graph is shown the learner
   predicts whether the tangent will be less steep, as steep or steeper
   than the secant with h = 1. ▶ slides Q towards P.
   ========================================================================== */

export type SecantFunction = 'square' | 'cube' | 'root' | 'sine'

export const SECANT_FUNCTIONS: SecantFunction[] = ['square', 'cube', 'root', 'sine']

export const SECANT_H = [1, 0.5, 0.1, 0.01, 0.001]
export const SECANT_H_LATEX = ['1', '0{,}5', '0{,}1', '0{,}01', '0{,}001']

export const SECANT_LIMITS = { k: { min: 0, max: SECANT_H.length - 1 } } as const

interface SecantSetup {
    fn: (x: number) => number
    derivative: (x: number) => number
    /** The points a the stepper reaches */
    aMin: number
    aMax: number
    latex: string
    /** The view, in whole units */
    view: { xMin: number; xMax: number; yMin: number; yMax: number }
}

export const SECANT_SETUP: Record<SecantFunction, SecantSetup> = {
    square: { fn: (x) => x * x, derivative: (x) => 2 * x, aMin: -2, aMax: 2, latex: 'f(x)=x^2', view: { xMin: -3, xMax: 4, yMin: -1, yMax: 9 } },
    cube: { fn: (x) => x ** 3, derivative: (x) => 3 * x * x, aMin: -1, aMax: 1, latex: 'f(x)=x^3', view: { xMin: -2, xMax: 3, yMin: -2, yMax: 8 } },
    root: { fn: Math.sqrt, derivative: (x) => 1 / (2 * Math.sqrt(x)), aMin: 1, aMax: 4, latex: 'f(x)=\\sqrt{x}', view: { xMin: -1, xMax: 6, yMin: -1, yMax: 3 } },
    sine: { fn: Math.sin, derivative: Math.cos, aMin: -2, aMax: 2, latex: 'f(x)=\\sin x', view: { xMin: -3, xMax: 4, yMin: -2, yMax: 2 } }
}

export interface SecantState {
    fn: SecantFunction
    a: number
    /** h = SECANT_H[k] */
    k: number
    prediction: Prediction | null
}

export const initialSecantState: SecantState = { fn: 'square', a: 0, k: 0, prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

/** Changing the function or the point asks for a new prediction; h does not */
export function setSecant(state: SecantState, patch: Partial<Omit<SecantState, 'prediction'>>): SecantState {
    const fn = patch.fn ?? state.fn
    const { aMin, aMax } = SECANT_SETUP[fn]
    const a = clamp(patch.a ?? state.a, aMin, aMax)
    const k = clamp(patch.k ?? state.k, SECANT_LIMITS.k.min, SECANT_LIMITS.k.max)
    return { fn, a, k, prediction: fn === state.fn && a === state.a ? state.prediction : null }
}

/** The slope of the secant through a and a + h */
export function secantSlope(fn: SecantFunction, a: number, h: number): number {
    const f = SECANT_SETUP[fn].fn
    return (f(a + h) - f(a)) / h
}

export const tangentSlope = (fn: SecantFunction, a: number) => SECANT_SETUP[fn].derivative(a)

/** The tangent less steep (<), as steep (=) or steeper (>) than the secant with h = 1 */
export function secantPrediction(state: SecantState): Prediction {
    const round = (value: number) => Math.round(value * 1e9) / 1e9
    return compareTo(round(tangentSlope(state.fn, state.a)), round(secantSlope(state.fn, state.a, 1)))
}

const close = (state: SecantState, k = 3) => state.k >= k

export const secantChallenges: LabChallenge<SecantState>[] = [
    {
        id: 110101,
        prompt: say('$x^2$ funtzioan, $a=1$ puntuan, hurbildu $Q$ puntua $h=0{,}001$ distantziaraino: malda 2 baliora hurbiltzen da.', 'En $x^2$, con $a=1$, acerca $Q$ hasta $h=0{,}001$: la pendiente se acerca a 2.', 'في $x^2$ مع $a=1$ قرّب $Q$ حتى $h=0{,}001$: يقترب الميل من 2.', 'In $x^2$, with $a=1$, bring $Q$ in to $h=0{,}001$: the slope approaches 2.'),
        hint: say('Funtzioa $x^2$, $a=1$ eta $h$ txikiena.', 'Función $x^2$, $a=1$ y la $h$ más pequeña.', 'الدالة $x^2$ و$a=1$ وأصغر $h$.', 'Function $x^2$, $a=1$ and the smallest $h$.'),
        isSolved: (state) => state.fn === 'square' && state.a === 1 && state.k === 4
    },
    {
        id: 110102,
        prompt: say('$x^2$ funtzioan, bilatu zuzen ukitzaileak $-4$ malda duen puntua, eta hurbildu $h=0{,}01$ distantziaraino edo gehiago.', 'En $x^2$, busca el punto donde la tangente tiene pendiente $-4$ y acércate hasta $h=0{,}01$ o más.', 'في $x^2$ ابحث عن النقطة التي ميل المماس عندها $-4$، واقترب حتى $h=0{,}01$ أو أكثر.', 'In $x^2$, find the point where the tangent has slope $-4$ and close in to $h=0{,}01$ or nearer.'),
        hint: say('$f\'(a)=2a=-4$', '$f\'(a)=2a=-4$', '$f\'(a)=2a=-4$', '$f\'(a)=2a=-4$'),
        isSolved: (state) => state.fn === 'square' && state.a === -2 && close(state)
    },
    {
        id: 110103,
        prompt: say('$\\sqrt{x}$ funtzioan, begiratu zuzen ukitzailea $a=4$ puntuan, $h=0{,}01$ edo txikiagoarekin: haren malda $\\frac{1}{4}$ da.', 'En $\\sqrt{x}$, mira la tangente en $a=4$ con $h=0{,}01$ o menos: su pendiente es $\\frac{1}{4}$.', 'في $\\sqrt{x}$ انظر إلى المماس عند $a=4$ مع $h=0{,}01$ أو أقل: ميله $\\frac{1}{4}$.', 'In $\\sqrt{x}$, look at the tangent at $a=4$ with $h=0{,}01$ or less: its slope is $\\frac{1}{4}$.'),
        hint: same4('$\\frac{1}{2\\sqrt{4}}=\\frac{1}{4}$'),
        isSolved: (state) => state.fn === 'root' && state.a === 4 && close(state)
    },
    {
        id: 110104,
        prompt: say('$x^3$ funtzioan, bilatu zuzen ukitzaile horizontala duen puntua, eta hurbildu $h=0{,}001$ distantziaraino.', 'En $x^3$, busca el punto con tangente horizontal y acércate hasta $h=0{,}001$.', 'في $x^3$ ابحث عن النقطة ذات المماس الأفقي واقترب حتى $h=0{,}001$.', 'In $x^3$, find the point with a horizontal tangent and close in to $h=0{,}001$.'),
        hint: say('$3a^2=0$', '$3a^2=0$', '$3a^2=0$', '$3a^2=0$'),
        isSolved: (state) => state.fn === 'cube' && state.a === 0 && state.k === 4
    },
    {
        id: 110105,
        prompt: say('$\\sin x$ funtzioan, begiratu zuzen ukitzailea $a=0$ puntuan, $h=0{,}001$ distantziarekin: haren malda 1 da.', 'En $\\sin x$, mira la tangente en $a=0$ con $h=0{,}001$: su pendiente es 1.', 'في $\\sin x$ انظر إلى المماس عند $a=0$ مع $h=0{,}001$: ميله 1.', 'In $\\sin x$, look at the tangent at $a=0$ with $h=0{,}001$: its slope is 1.'),
        hint: same4('$\\cos 0=1$'),
        isSolved: (state) => state.fn === 'sine' && state.a === 0 && state.k === 4
    }
]

function same4(formula: string) {
    return say(formula, formula, formula, formula)
}

/** Endless practice: this function, this point, seen from this close */
const secantMaker: LabChallengeMaker<SecantState> = (random) => {
    const fn = SECANT_FUNCTIONS[randomInt(random, 0, SECANT_FUNCTIONS.length - 1)]
    const { aMin, aMax, latex } = SECANT_SETUP[fn]
    const a = randomInt(random, aMin, aMax)
    const k = randomInt(random, 2, SECANT_LIMITS.k.max)
    const formula = `$${latex}$`
    const point = `$a=${a}$`
    const h = `$h=${SECANT_H_LATEX[k]}$`
    return {
        prompt: say(
            `${formula} funtzioan, ${point} puntuan, begiratu ebakitzailea ${h} distantziarekin.`,
            `En ${formula}, con ${point}, mira la secante con ${h}.`,
            `في ${formula} مع ${point} انظر إلى القاطع مع ${h}.`,
            `In ${formula}, with ${point}, look at the secant with ${h}.`
        ),
        hint: say('Aukeratu funtzioa, gero $a$, gero $h$.', 'Elige la función, después $a$ y después $h$.', 'اختر الدالة ثم $a$ ثم $h$.', 'Choose the function, then $a$, then $h$.'),
        isSolved: (state) => state.fn === fn && state.a === a && state.k === k,
        solution: { fn, a, k, prediction: null }
    }
}

export const secantExtra = freshFrom(initialSecantState, secantMaker)
