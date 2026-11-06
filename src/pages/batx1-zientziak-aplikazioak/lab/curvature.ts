import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'
import { freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L4 · Curvatura con la tangente: a tangent rides along the curve (x from
   −3 to 3, in half steps). Where the curve stays above its tangent it is
   cóncava, ∪ (f″ > 0); where it stays below, convexa, ∩ (f″ < 0); at a
   point of inflection the tangent crosses it. The gap between the curve
   and the tangent is painted green above and red below. Before the
   colours are shown the learner guesses, at a marked point p, whether the
   curve stays above the tangent, crosses it or stays below; one function
   is x⁴/12, whose f″(0) = 0 without an inflection.
   ========================================================================== */

export type CurveFunction = 'cubic' | 'quartic' | 'flat' | 'exp' | 'inverse'

export const CURVE_FUNCTIONS: CurveFunction[] = ['cubic', 'quartic', 'flat', 'exp', 'inverse']

/** The tangent is at x = t / 2 */
export const CURVE_LIMITS = { t: { min: -6, max: 6 } } as const

export type CurveSide = 'above' | 'cross' | 'below'

interface CurveSetup {
    fn: (x: number) => number
    derivative: (x: number) => number
    second: (x: number) => number
    latex: string
    secondLatex: string
    /** Where f does not exist */
    holes: number[]
    /** The marked point of the prediction */
    p: number
    view: [number, number]
}

export const CURVE_SETUP: Record<CurveFunction, CurveSetup> = {
    cubic: { fn: (x) => x ** 3 / 3 - x, derivative: (x) => x * x - 1, second: (x) => 2 * x, latex: 'f(x)=\\frac{x^3}{3}-x', secondLatex: "f''(x)=2x", holes: [], p: 0, view: [-3, 3] },
    quartic: { fn: (x) => x ** 4 / 12 - x * x / 2, derivative: (x) => x ** 3 / 3 - x, second: (x) => x * x - 1, latex: 'f(x)=\\frac{x^4}{12}-\\frac{x^2}{2}', secondLatex: "f''(x)=x^2-1", holes: [], p: 1, view: [-3, 2] },
    flat: { fn: (x) => x ** 4 / 12, derivative: (x) => x ** 3 / 3, second: (x) => x * x, latex: 'f(x)=\\frac{x^4}{12}', secondLatex: "f''(x)=x^2", holes: [], p: 0, view: [-1, 4] },
    exp: { fn: (x) => x * Math.exp(x), derivative: (x) => (1 + x) * Math.exp(x), second: (x) => (2 + x) * Math.exp(x), latex: 'f(x)=x\\,e^x', secondLatex: "f''(x)=(2+x)\\,e^x", holes: [], p: -2, view: [-1, 3] },
    inverse: { fn: (x) => 1 / x, derivative: (x) => -1 / (x * x), second: (x) => 2 / x ** 3, latex: 'f(x)=\\frac{1}{x}', secondLatex: "f''(x)=\\frac{2}{x^3}", holes: [0], p: -1, view: [-3, 3] }
}

export interface CurveState {
    fn: CurveFunction
    /** x = t / 2 */
    t: number
    prediction: Prediction | null
}

export const initialCurveState: CurveState = { fn: 'cubic', t: -4, prediction: null }

/** Only a new function asks for a new prediction */
export function setCurve(state: CurveState, patch: Partial<Omit<CurveState, 'prediction'>>): CurveState {
    const fn = patch.fn ?? state.fn
    const t = Math.min(CURVE_LIMITS.t.max, Math.max(CURVE_LIMITS.t.min, Math.round(patch.t ?? state.t)))
    return { fn, t, prediction: fn === state.fn ? state.prediction : null }
}

export const curveX = (state: CurveState) => state.t / 2

const exists = (fn: CurveFunction, x: number) => !CURVE_SETUP[fn].holes.some((hole) => Math.abs(hole - x) < 1e-9)

/** Where the curve is next to its tangent at x: above it (∪), crossing it (inflection) or below it (∩); null where f does not exist */
export function curveSide(fn: CurveFunction, x: number): CurveSide | null {
    if (!exists(fn, x)) return null
    const { fn: f, derivative } = CURVE_SETUP[fn]
    const gap = (h: number) => f(x + h) - (f(x) + derivative(x) * h)
    const left = gap(-0.05)
    const right = gap(0.05)
    if (left > 1e-9 && right > 1e-9) return 'above'
    if (left < -1e-9 && right < -1e-9) return 'below'
    return 'cross'
}

/** The prediction: below (<), crossing (=) or above (>) the tangent at the marked point */
export function curvePrediction(state: CurveState): Prediction {
    const side = curveSide(state.fn, CURVE_SETUP[state.fn].p)
    return side === 'above' ? '>' : side === 'below' ? '<' : '='
}

export const CURVE_NAMES: Record<CurveFunction, string> = { cubic: 'f_1', quartic: 'f_2', flat: 'f_3', exp: 'f_4', inverse: 'f_5' }

const same = (value: string) => say(value, value, value, value)

export const curveChallenges: LabChallenge<CurveState>[] = [
    {
        id: 111301,
        prompt: say('$f_1$ funtzioan, eraman zuzen ukitzailea kurba ahurra (∪) den puntu batera.', 'En $f_1$, lleva la tangente a un punto donde la curva es cóncava (∪).', 'في $f_1$ انقل المماس إلى نقطة يكون فيها المنحنى مقعّرًا نحو الأعلى (∪).', 'In $f_1$, take the tangent to a point where the curve is concave up (∪).'),
        hint: say('Kurba zuzen ukitzailearen gainean geratzen da.', 'La curva queda por encima de la tangente.', 'يبقى المنحنى فوق المماس.', 'The curve stays above the tangent.'),
        isSolved: (state) => state.fn === 'cubic' && curveSide('cubic', curveX(state)) === 'above'
    },
    {
        id: 111302,
        prompt: say('$f_2$ funtzioan, aurkitu $x>0$ duen inflexio-puntu bat: zuzen ukitzaileak kurba zeharkatzen du.', 'En $f_2$, encuentra un punto de inflexión con $x>0$: la tangente atraviesa la curva.', 'في $f_2$ اعثر على نقطة انعطاف فيها $x>0$: يخترق المماس المنحنى.', 'In $f_2$, find a point of inflection with $x>0$: the tangent crosses the curve.'),
        hint: same("$f''(x)=x^2-1=0$"),
        isSolved: (state) => state.fn === 'quartic' && state.t === 2
    },
    {
        id: 111303,
        prompt: say('$f_3$ funtzioan, eraman zuzen ukitzailea $x=0$ puntura: $f\'\'(0)=0$ da. Zeharkatzen al du kurba?', 'En $f_3$, lleva la tangente a $x=0$: allí $f\'\'(0)=0$. ¿Atraviesa la curva?', 'في $f_3$ انقل المماس إلى $x=0$: هناك $f\'\'(0)=0$. هل يخترق المنحنى؟', 'In $f_3$, take the tangent to $x=0$: there $f\'\'(0)=0$. Does it cross the curve?'),
        hint: say('$f\'\'(x)=x^2$ ez da inoiz negatiboa.', '$f\'\'(x)=x^2$ nunca es negativa.', '$f\'\'(x)=x^2$ ليست سالبة أبدًا.', '$f\'\'(x)=x^2$ is never negative.'),
        isSolved: (state) => state.fn === 'flat' && state.t === 0
    },
    {
        id: 111304,
        prompt: say('$f_4$ funtzioan, eraman zuzen ukitzailea inflexio-puntura.', 'En $f_4$, lleva la tangente al punto de inflexión.', 'في $f_4$ انقل المماس إلى نقطة الانعطاف.', 'In $f_4$, take the tangent to the point of inflection.'),
        hint: same("$f''(x)=(2+x)\\,e^x$"),
        isSolved: (state) => state.fn === 'exp' && state.t === -4
    },
    {
        id: 111305,
        prompt: say('$f_5$ funtzioan, eraman zuzen ukitzailea kurba ganbila (∩) den puntu batera.', 'En $f_5$, lleva la tangente a un punto donde la curva es convexa (∩).', 'في $f_5$ انقل المماس إلى نقطة يكون فيها المنحنى مقعّرًا نحو الأسفل (∩).', 'In $f_5$, take the tangent to a point where the curve is concave down (∩).'),
        hint: say('Kurba zuzen ukitzailearen azpian geratzen da.', 'La curva queda por debajo de la tangente.', 'يبقى المنحنى تحت المماس.', 'The curve stays below the tangent.'),
        isSolved: (state) => state.fn === 'inverse' && curveSide('inverse', curveX(state)) === 'below'
    }
]

const SIDE_WORDS: Record<CurveSide, ReturnType<typeof say>> = {
    above: say('kurba ahurra (∪) den', 'la curva es cóncava (∪)', 'يكون فيها المنحنى مقعّرًا نحو الأعلى (∪)', 'the curve is concave up (∪)'),
    below: say('kurba ganbila (∩) den', 'la curva es convexa (∩)', 'يكون فيها المنحنى مقعّرًا نحو الأسفل (∩)', 'the curve is concave down (∩)'),
    cross: say('inflexio bat dagoen', 'hay una inflexión', 'يوجد فيها انعطاف', 'there is an inflection')
}

/** Endless practice: take the tangent to a point where the curve is ∪, ∩ or has an inflection */
const curveMaker: LabChallengeMaker<CurveState> = (random) => {
    for (;;) {
        const fn = CURVE_FUNCTIONS[randomInt(random, 0, CURVE_FUNCTIONS.length - 1)]
        const side = (['above', 'below', 'cross'] as const)[randomInt(random, 0, 2)]
        const points: number[] = []
        for (let t = CURVE_LIMITS.t.min; t <= CURVE_LIMITS.t.max; t += 1) if (curveSide(fn, t / 2) === side) points.push(t)
        if (!points.length) continue
        const name = `$${CURVE_NAMES[fn]}$`
        const words = SIDE_WORDS[side]
        return {
            prompt: say(`${name} funtzioan, eraman zuzen ukitzailea ${words.eu} puntu batera.`, `En ${name}, lleva la tangente a un punto donde ${words.es}.`, `في ${name} انقل المماس إلى نقطة ${words.ar}.`, `In ${name}, take the tangent to a point where ${words.en}.`),
            hint: say('Gainean: ∪. Azpian: ∩. Zeharkatzen badu: inflexioa.', 'Por encima: ∪. Por debajo: ∩. Si la atraviesa: inflexión.', 'فوقه: ∪. وتحته: ∩. وإذا اخترقه: انعطاف.', 'Above: ∪. Below: ∩. If it crosses: an inflection.'),
            isSolved: (state) => state.fn === fn && curveSide(fn, curveX(state)) === side,
            solution: { fn, t: points[randomInt(random, 0, points.length - 1)], prediction: null }
        }
    }
}

export const curveExtra = freshFrom(initialCurveState, curveMaker)
