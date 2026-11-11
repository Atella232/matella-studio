import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L3 · f′ grafikotik f grafikora (De f′ a f): the graph of f′ on top and,
   underneath, the graph of f, drawn from the left edge up to a point x₀
   that the learner moves along. Where f′ is above the axis f rises, where
   it is below f falls; where f′ crosses the axis f has an extremum, and
   where f′ turns f has an inflection. A stepper for C = f(0) shows that
   f′ fixes f only up to a vertical shift. Before drawing, the learner
   predicts where f has its maximum: at a negative x (<), at x = 0 (=) or
   at a positive x (>).
   ========================================================================== */

export type DerivativeId = 'd1' | 'd2' | 'd3' | 'd4' | 'd5'

export const DERIVATIVES: DerivativeId[] = ['d1', 'd2', 'd3', 'd4', 'd5']

interface DerivativeSetup {
    /** f′ and the f with f(0) = 0 */
    fp: (x: number) => number
    F: (x: number) => number
    fpLatex: string
    FLatex: string
    /** The values x₀ steps through */
    xs: number[]
    maxima: number[]
    minima: number[]
    inflections: number[]
}

const halves = (from: number, to: number) => Array.from({ length: Math.round((to - from) * 2) + 1 }, (_, k) => from + k / 2)
const R = 2 / Math.sqrt(3)

export const DERIVATIVE_SETUP: Record<DerivativeId, DerivativeSetup> = {
    d1: { fp: (x) => x * x - 1, F: (x) => x ** 3 / 3 - x, fpLatex: 'x^2-1', FLatex: '\\frac{x^3}{3}-x', xs: halves(-2.5, 2.5), maxima: [-1], minima: [1], inflections: [0] },
    d2: { fp: (x) => 2 - 2 * x, F: (x) => 2 * x - x * x, fpLatex: '2-2x', FLatex: '2x-x^2', xs: halves(-1.5, 3.5), maxima: [1], minima: [], inflections: [] },
    d3: { fp: (x) => 4 - x * x, F: (x) => 4 * x - x ** 3 / 3, fpLatex: '4-x^2', FLatex: '4x-\\frac{x^3}{3}', xs: halves(-3, 3), maxima: [2], minima: [-2], inflections: [0] },
    d4: { fp: (x) => x ** 3 - 4 * x, F: (x) => x ** 4 / 4 - 2 * x * x, fpLatex: 'x^3-4x', FLatex: '\\frac{x^4}{4}-2x^2', xs: halves(-3, 3), maxima: [0], minima: [-2, 2], inflections: [-R, R] },
    d5: { fp: (x) => x * x - 3 * x, F: (x) => x ** 3 / 3 - (3 * x * x) / 2, fpLatex: 'x^2-3x', FLatex: '\\frac{x^3}{3}-\\frac{3x^2}{2}', xs: halves(-1.5, 4.5), maxima: [0], minima: [3], inflections: [1.5] }
}

export const C_LIMITS = { min: -4, max: 4 } as const

export interface DerivativeState {
    fn: DerivativeId
    /** The index of x₀ in the list of the function */
    x: number
    /** C = f(0) */
    C: number
    prediction: Prediction | null
}

export const initialDerivativeState: DerivativeState = { fn: 'd1', x: 0, C: 0, prediction: null }

/** A new f′ starts at the left edge with C = 0 and asks for a new prediction */
export function setDerivative(state: DerivativeState, patch: Partial<Omit<DerivativeState, 'prediction'>>): DerivativeState {
    const fn = patch.fn ?? state.fn
    if (fn !== state.fn) return { fn, x: 0, C: 0, prediction: null }
    const last = DERIVATIVE_SETUP[fn].xs.length - 1
    const x = Math.min(last, Math.max(0, Math.round(patch.x ?? state.x)))
    const C = Math.min(C_LIMITS.max, Math.max(C_LIMITS.min, Math.round(patch.C ?? state.C)))
    return { fn, x, C, prediction: state.prediction }
}

export interface DerivativeReading {
    x: number
    slope: number
    y: number
    /** What f does at x₀: rises, falls, a maximum, a minimum or a stationary point that is neither */
    kind: 'rises' | 'falls' | 'max' | 'min'
}

const near = (value: number, list: number[]) => list.some((item) => Math.abs(item - value) < 1e-9)

export function derivativeReading(state: Pick<DerivativeState, 'fn' | 'x' | 'C'>): DerivativeReading {
    const setup = DERIVATIVE_SETUP[state.fn]
    const x = setup.xs[state.x]
    const slope = setup.fp(x)
    const kind = near(x, setup.maxima) ? 'max' : near(x, setup.minima) ? 'min' : slope > 0 ? 'rises' : 'falls'
    return { x, slope, y: setup.F(x) + state.C, kind }
}

/** Where the maximum of f is, against x = 0 */
export const derivativePrediction = (state: Pick<DerivativeState, 'fn'>): Prediction => compareTo(DERIVATIVE_SETUP[state.fn].maxima[0], 0)

const named = (fn: DerivativeId) => `$f'(x)=${DERIVATIVE_SETUP[fn].fpLatex}$`
const at = (fn: DerivativeId, value: number) => DERIVATIVE_SETUP[fn].xs.findIndex((x) => Math.abs(x - value) < 1e-9)
const pointAt = (fn: DerivativeId, values: number[]) => (state: DerivativeState) => state.fn === fn && near(DERIVATIVE_SETUP[fn].xs[state.x], values)

export const derivativeChallenges: LabChallenge<DerivativeState>[] = [
    {
        id: 125301,
        prompt: say(`${named('d1')} denean, eraman puntua $f$ funtzioaren maximora.`, `Con ${named('d1')}, lleva el punto al máximo de $f$.`, `مع ${named('d1')}، انقل النقطة إلى القيمة العظمى لـ $f$.`, `With ${named('d1')}, take the point to the maximum of $f$.`),
        hint: say('Maximoan $f\'$ deribatua $+$ zeinutik $-$ zeinura pasatzen da.', 'En el máximo $f\'$ pasa de $+$ a $-$.', 'عند القيمة العظمى تنتقل $f\'$ من $+$ إلى $-$.', 'At the maximum $f\'$ goes from $+$ to $-$.'),
        isSolved: pointAt('d1', [-1])
    },
    {
        id: 125302,
        prompt: say(`${named('d2')} denean, jarri puntua $f$ gorakorra izateari uzten dion tokian.`, `Con ${named('d2')}, pon el punto donde $f$ deja de crecer.`, `مع ${named('d2')}، ضع النقطة حيث تتوقف $f$ عن التزايد.`, `With ${named('d2')}, put the point where $f$ stops increasing.`),
        hint: say('$f\'$ zuzenak $X$ ardatza ebakitzen duen tokian.', 'Donde la recta $f\'$ corta el eje $X$.', 'حيث يقطع المستقيم $f\'$ المحور $X$.', 'Where the line $f\'$ cuts the $X$ axis.'),
        isSolved: pointAt('d2', [1])
    },
    {
        id: 125303,
        prompt: say(`${named('d3')} denean, jarri puntua $f$ funtzioaren minimoan.`, `Con ${named('d3')}, pon el punto en el mínimo de $f$.`, `مع ${named('d3')}، ضع النقطة عند القيمة الصغرى لـ $f$.`, `With ${named('d3')}, put the point on the minimum of $f$.`),
        hint: say('Minimoan $f\'$ deribatua $-$ zeinutik $+$ zeinura pasatzen da.', 'En el mínimo $f\'$ pasa de $-$ a $+$.', 'عند القيمة الصغرى تنتقل $f\'$ من $-$ إلى $+$.', 'At the minimum $f\'$ goes from $-$ to $+$.'),
        isSolved: pointAt('d3', [-2])
    },
    {
        id: 125304,
        prompt: say(`${named('d5')} denean, jarri puntua $f$ funtzioaren inflexioan.`, `Con ${named('d5')}, pon el punto en la inflexión de $f$.`, `مع ${named('d5')}، ضع النقطة عند انعطاف $f$.`, `With ${named('d5')}, put the point on the inflection of $f$.`),
        hint: say('$f$ funtzioaren inflexioa $f\'$ parabolaren erpinean dago.', 'La inflexión de $f$ está en el vértice de la parábola $f\'$.', 'انعطاف $f$ عند رأس القطع المكافئ $f\'$.', 'The inflection of $f$ is at the vertex of the parabola $f\'$.'),
        isSolved: pointAt('d5', [1.5])
    },
    {
        id: 125305,
        prompt: say(`${named('d4')} denean, aukeratu $C=f(0)$, $f$ funtzioaren minimoak $X$ ardatzaren gainean egon daitezen.`, `Con ${named('d4')}, elige $C=f(0)$ para que los mínimos de $f$ queden sobre el eje $X$.`, `مع ${named('d4')}، اختر $C=f(0)$ بحيث تقع القيمتان الصغريان لـ $f$ على المحور $X$.`, `With ${named('d4')}, choose $C=f(0)$ so that the minima of $f$ sit on the $X$ axis.`),
        hint: say('$C=0$ denean minimoak $-4$ balio dute.', 'Con $C=0$ los mínimos valen $-4$.', 'مع $C=0$ تساوي القيمتان الصغريان $-4$.', 'With $C=0$ the minima are $-4$.'),
        isSolved: (state) => state.fn === 'd4' && state.C === 4
    }
]

/** Endless practice: stand on an extremum or an inflection of f, or set C for a given maximum */
const derivativeMaker: LabChallengeMaker<DerivativeState> = (random) => {
    const options: Array<{ prompt: LocalizedText; hint: LocalizedText; isSolved: (state: DerivativeState) => boolean; solution: DerivativeState }> = []
    const features = [
        { key: 'maxima', name: say('maximo batean', 'en un máximo', 'عند قيمة عظمى', 'on a maximum'), hint: say('$f\'$ deribatua $+$ zeinutik $-$ zeinura.', '$f\'$ pasa de $+$ a $-$.', 'تنتقل $f\'$ من $+$ إلى $-$.', '$f\'$ goes from $+$ to $-$.') },
        { key: 'minima', name: say('minimo batean', 'en un mínimo', 'عند قيمة صغرى', 'on a minimum'), hint: say('$f\'$ deribatua $-$ zeinutik $+$ zeinura.', '$f\'$ pasa de $-$ a $+$.', 'تنتقل $f\'$ من $-$ إلى $+$.', '$f\'$ goes from $-$ to $+$.') },
        { key: 'inflections', name: say('inflexio-puntu batean', 'en una inflexión', 'عند نقطة انعطاف', 'on an inflection'), hint: say('$f\'$ deribatuak mutur bat duen tokian.', 'Donde $f\'$ tiene un extremo.', 'حيث تبلغ $f\'$ قيمة قصوى.', 'Where $f\'$ has an extremum.') }
    ] as const
    for (const fn of DERIVATIVES) {
        const setup = DERIVATIVE_SETUP[fn]
        for (const feature of features) {
            const targets = setup[feature.key].filter((value) => near(value, setup.xs))
            if (!targets.length) continue
            const { eu, es, ar, en } = feature.name
            options.push({
                prompt: say(`${named(fn)} denean, jarri puntua $f$ funtzioaren ${eu}.`, `Con ${named(fn)}, pon el punto ${es} de $f$.`, `مع ${named(fn)}، ضع النقطة ${ar} لـ $f$.`, `With ${named(fn)}, put the point ${en} of $f$.`),
                hint: feature.hint,
                isSolved: pointAt(fn, targets),
                solution: { fn, x: at(fn, targets[0]), C: 0, prediction: null }
            })
        }
    }
    // C for a given maximum value, where the maximum of f with C = 0 is a whole number
    for (const fn of ['d2', 'd4', 'd5'] as const) {
        const top = DERIVATIVE_SETUP[fn].F(DERIVATIVE_SETUP[fn].maxima[0])
        for (let value = -2; value <= 3; value++) {
            const C = value - top
            if (C < C_LIMITS.min || C > C_LIMITS.max || C === 0) continue
            options.push({
                prompt: say(`${named(fn)} denean, aukeratu $C$, $f$ funtzioaren maximoak $${value}$ balio dezan.`, `Con ${named(fn)}, elige $C$ para que el máximo de $f$ valga $${value}$.`, `مع ${named(fn)}، اختر $C$ بحيث تساوي القيمة العظمى لـ $f$ العدد $${value}$.`, `With ${named(fn)}, choose $C$ so that the maximum of $f$ is $${value}$.`),
                hint: say(`$C=0$ denean maximoak $${top}$ balio du.`, `Con $C=0$ el máximo vale $${top}$.`, `مع $C=0$ تساوي القيمة العظمى $${top}$.`, `With $C=0$ the maximum is $${top}$.`),
                isSolved: (state) => state.fn === fn && state.C === C,
                solution: { fn, x: 0, C, prediction: null }
            })
        }
    }
    const chosen = options[randomInt(random, 0, options.length - 1)]
    return { prompt: chosen.prompt, hint: chosen.hint, isSolved: chosen.isSolved, solution: chosen.solution }
}

export const derivativeExtra = freshFrom(initialDerivativeState, derivativeMaker)
