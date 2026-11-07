import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L3 · La gráfica de f′: a probe walks along f (x from −3 to 3, in steps
   of 0,5) carrying its tangent, and below, a second plane draws the slope
   it reads: the graph of f′. Before the graphs are shown the learner
   predicts whether the tangent at a marked point p goes down, is
   horizontal or goes up. ▶ walks the probe from the left end and draws f′
   as it goes. Five functions: two polynomials, a hill, sin x and eˣ.
   ========================================================================== */

export type SlopeFunction = 'parabola' | 'cubic' | 'hill' | 'sine' | 'exp'

export const SLOPE_FUNCTIONS: SlopeFunction[] = ['parabola', 'cubic', 'hill', 'sine', 'exp']

/** The probe is at x = t / 2 */
export const SLOPE_LIMITS = { t: { min: -6, max: 6 } } as const

interface SlopeSetup {
    fn: (x: number) => number
    derivative: (x: number) => number
    latex: string
    derivativeLatex: string
    /** The point of the prediction */
    p: number
    /** The y range of each plane, in whole units */
    top: [number, number]
    bottom: [number, number]
}

export const SLOPE_SETUP: Record<SlopeFunction, SlopeSetup> = {
    parabola: { fn: (x) => (x * x) / 2 - x - 1, derivative: (x) => x - 1, latex: 'f(x)=\\frac{x^2}{2}-x-1', derivativeLatex: "f'(x)=x-1", p: 2, top: [-3, 4], bottom: [-4, 3] },
    cubic: { fn: (x) => (x ** 3) / 3 - x, derivative: (x) => x * x - 1, latex: 'f(x)=\\frac{x^3}{3}-x', derivativeLatex: "f'(x)=x^2-1", p: 0, top: [-3, 3], bottom: [-2, 5] },
    hill: { fn: (x) => 2 - (x * x) / 2, derivative: (x) => -x, latex: 'f(x)=2-\\frac{x^2}{2}', derivativeLatex: "f'(x)=-x", p: 0, top: [-3, 3], bottom: [-3, 3] },
    sine: { fn: Math.sin, derivative: Math.cos, latex: 'f(x)=\\sin x', derivativeLatex: "f'(x)=\\cos x", p: 2, top: [-2, 2], bottom: [-2, 2] },
    exp: { fn: Math.exp, derivative: Math.exp, latex: 'f(x)=e^x', derivativeLatex: "f'(x)=e^x", p: -1, top: [-1, 6], bottom: [-1, 6] }
}

export interface SlopeState {
    fn: SlopeFunction
    /** x = t / 2 */
    t: number
    prediction: Prediction | null
}

export const initialSlopeState: SlopeState = { fn: 'parabola', t: -2, prediction: null }

/** Only a new function asks for a new prediction */
export function setSlope(state: SlopeState, patch: Partial<Omit<SlopeState, 'prediction'>>): SlopeState {
    const fn = patch.fn ?? state.fn
    const t = Math.min(SLOPE_LIMITS.t.max, Math.max(SLOPE_LIMITS.t.min, Math.round(patch.t ?? state.t)))
    return { fn, t, prediction: fn === state.fn ? state.prediction : null }
}

export const probeX = (state: SlopeState) => state.t / 2

/** f′ at the probe, rounded to what the readout shows */
export function probeSlope(state: SlopeState): number {
    return Math.round(SLOPE_SETUP[state.fn].derivative(probeX(state)) * 1e9) / 1e9
}

/** The tangent at p goes down (<), is horizontal (=) or goes up (>) */
export function slopePrediction(state: SlopeState): Prediction {
    const { derivative, p } = SLOPE_SETUP[state.fn]
    return compareTo(Math.round(derivative(p) * 1e9) / 1e9, 0)
}

export const slopeChallenges: LabChallenge<SlopeState>[] = [
    {
        id: 110201,
        prompt: say('$f_1$ funtzioan, eraman zunda zuzen ukitzailea horizontala den puntura: $f\'$ grafikoak ardatza mozten du.', 'En $f_1$, lleva la sonda al punto donde la tangente es horizontal: la gráfica de $f\'$ corta el eje.', 'في $f_1$ انقل المسبار إلى النقطة التي يكون فيها المماس أفقيًّا: يقطع رسم $f\'$ المحور.', 'In $f_1$, take the probe to the point where the tangent is horizontal: the graph of $f\'$ crosses the axis.'),
        hint: say('$f\'(x)=x-1=0$', '$f\'(x)=x-1=0$', '$f\'(x)=x-1=0$', '$f\'(x)=x-1=0$'),
        isSolved: (state) => state.fn === 'parabola' && state.t === 2
    },
    {
        id: 110202,
        prompt: say('$f_2$ funtzioan, bilatu $x>0$ puntu bat, non $f\'(x)=3$ den.', 'En $f_2$, busca un punto con $x>0$ donde $f\'(x)=3$.', 'في $f_2$ ابحث عن نقطة فيها $x>0$ و$f\'(x)=3$.', 'In $f_2$, find a point with $x>0$ where $f\'(x)=3$.'),
        hint: say('$x^2-1=3$', '$x^2-1=3$', '$x^2-1=3$', '$x^2-1=3$'),
        isSolved: (state) => state.fn === 'cubic' && state.t === 4
    },
    {
        id: 110203,
        prompt: say('$f_2$ funtzioan, eraman zunda $x<0$ eta zuzen ukitzaile horizontala dituen puntura.', 'En $f_2$, lleva la sonda al punto con $x<0$ y tangente horizontal.', 'في $f_2$ انقل المسبار إلى النقطة التي فيها $x<0$ والمماس أفقي.', 'In $f_2$, take the probe to the point with $x<0$ and a horizontal tangent.'),
        hint: say('$x^2-1=0$', '$x^2-1=0$', '$x^2-1=0$', '$x^2-1=0$'),
        isSolved: (state) => state.fn === 'cubic' && state.t === -2
    },
    {
        id: 110204,
        prompt: say('$f_4$ funtzioan, eraman zunda $x=0$ puntura: $\\sin x$ funtzioaren malda $\\cos 0=1$ da.', 'En $f_4$, lleva la sonda a $x=0$: la pendiente de $\\sin x$ es $\\cos 0=1$.', 'في $f_4$ انقل المسبار إلى $x=0$: ميل $\\sin x$ هو $\\cos 0=1$.', 'In $f_4$, take the probe to $x=0$: the slope of $\\sin x$ is $\\cos 0=1$.'),
        hint: say('Laugarren funtzioa, $\\sin x$.', 'La cuarta función, $\\sin x$.', 'الدالة الرابعة، $\\sin x$.', 'The fourth function, $\\sin x$.'),
        isSolved: (state) => state.fn === 'sine' && state.t === 0
    },
    {
        id: 110205,
        prompt: say('$f_5$ funtzioan, eraman zunda $x=1$ puntura: $e^x$ funtzioaren malda bera da, $e$.', 'En $f_5$, lleva la sonda a $x=1$: la pendiente de $e^x$ es ella misma, $e$.', 'في $f_5$ انقل المسبار إلى $x=1$: ميل $e^x$ هو نفسه، $e$.', 'In $f_5$, take the probe to $x=1$: the slope of $e^x$ is itself, $e$.'),
        hint: say('$f\'(x)=e^x$', '$f\'(x)=e^x$', '$f\'(x)=e^x$', '$f\'(x)=e^x$'),
        isSolved: (state) => state.fn === 'exp' && state.t === 2
    }
]

/** The functions whose slope at a half step is a short decimal */
const EXACT: SlopeFunction[] = ['parabola', 'cubic', 'hill']
const NAMES: Record<SlopeFunction, string> = { parabola: 'f_1', cubic: 'f_2', hill: 'f_3', sine: 'f_4', exp: 'f_5' }

/** Endless practice: find a point with this slope (any such point solves it) */
const slopeMaker: LabChallengeMaker<SlopeState> = (random) => {
    const fn = EXACT[randomInt(random, 0, EXACT.length - 1)]
    const t = randomInt(random, SLOPE_LIMITS.t.min, SLOPE_LIMITS.t.max)
    const value = SLOPE_SETUP[fn].derivative(t / 2)
    const written = String(value).replace('.', '{,}')
    const name = `$${NAMES[fn]}$`
    const slope = `$f'(x)=${written}$`
    return {
        prompt: say(
            `${name} funtzioan, eraman zunda ${slope} den puntu batera.`,
            `En ${name}, lleva la sonda a un punto donde ${slope}.`,
            `في ${name} انقل المسبار إلى نقطة فيها ${slope}.`,
            `In ${name}, take the probe to a point where ${slope}.`
        ),
        hint: say('Begiratu beheko planoa: $f\'$ grafikoa.', 'Mira el plano de abajo: la gráfica de $f\'$.', 'انظر إلى المستوى السفلي: رسم $f\'$.', 'Look at the lower plane: the graph of $f\'$.'),
        isSolved: (state) => state.fn === fn && Math.abs(SLOPE_SETUP[fn].derivative(state.t / 2) - value) < 1e-9,
        solution: { fn, t, prediction: null }
    }
}

export const slopeExtra = freshFrom(initialSlopeState, slopeMaker)
