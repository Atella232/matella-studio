import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L5 · Monta la gráfica: the graph of a function is built layer by layer,
   as in the lessons: 1 domain, 2 intercepts, 3 asymptotes, 4 increase
   and decrease (arrows and extrema), 5 concavity (∪, ∩ and inflections)
   and 6 the curve, which joins all the marks. ▶ adds the layers one by
   one. Four functions: a cubic, a quartic, a rational function with an
   oblique asymptote and x·eˣ. Before the first layer the learner guesses
   whether the function has fewer than two local extrema, two or more.
   Each challenge describes a function by its features: choose it and
   show the layer that proves it.
   ========================================================================== */

export type LayerFunction = 'cubic' | 'quartic' | 'rational' | 'exp'

export const LAYER_FUNCTIONS: LayerFunction[] = ['cubic', 'quartic', 'rational', 'exp']

export const LAYER_COUNT = 6

export interface Mark {
    x: number
    y: number
}

interface LayerSetup {
    fn: (x: number) => number
    derivative: (x: number) => number
    second: (x: number) => number
    latex: string
    /** Where f does not exist (vertical asymptotes) */
    holes: number[]
    /** Where the graph meets the axes */
    cuts: Mark[]
    /** Oblique or horizontal asymptotes y = mx + n, with the side where they hold (both: 0) */
    lines: Array<{ m: number; n: number; side: -1 | 0 | 1 }>
    maxima: Mark[]
    minima: Mark[]
    inflections: Mark[]
    view: [number, number]
}

const r3 = Math.sqrt(3)
const r2 = Math.sqrt(2)
const third = 1 / Math.sqrt(3)

export const LAYER_SETUP: Record<LayerFunction, LayerSetup> = {
    cubic: {
        fn: (x) => -(x ** 3) + 3 * x, derivative: (x) => -3 * x * x + 3, second: (x) => -6 * x, latex: 'f(x)=-x^3+3x',
        holes: [], cuts: [{ x: -r3, y: 0 }, { x: 0, y: 0 }, { x: r3, y: 0 }], lines: [],
        maxima: [{ x: 1, y: 2 }], minima: [{ x: -1, y: -2 }], inflections: [{ x: 0, y: 0 }], view: [-4, 4]
    },
    quartic: {
        fn: (x) => x ** 4 / 2 - x * x, derivative: (x) => 2 * x ** 3 - 2 * x, second: (x) => 6 * x * x - 2, latex: 'f(x)=\\frac{x^4}{2}-x^2',
        holes: [], cuts: [{ x: -r2, y: 0 }, { x: 0, y: 0 }, { x: r2, y: 0 }], lines: [],
        maxima: [{ x: 0, y: 0 }], minima: [{ x: -1, y: -0.5 }, { x: 1, y: -0.5 }], inflections: [{ x: -third, y: third ** 4 / 2 - third ** 2 }, { x: third, y: third ** 4 / 2 - third ** 2 }], view: [-2, 4]
    },
    rational: {
        fn: (x) => (x * x) / (x - 1), derivative: (x) => (x * x - 2 * x) / (x - 1) ** 2, second: (x) => 2 / (x - 1) ** 3, latex: 'f(x)=\\frac{x^2}{x-1}',
        holes: [1], cuts: [{ x: 0, y: 0 }], lines: [{ m: 1, n: 1, side: 0 }],
        maxima: [{ x: 0, y: 0 }], minima: [{ x: 2, y: 4 }], inflections: [], view: [-4, 7]
    },
    exp: {
        fn: (x) => x * Math.exp(x), derivative: (x) => (1 + x) * Math.exp(x), second: (x) => (2 + x) * Math.exp(x), latex: 'f(x)=x\\,e^x',
        holes: [], cuts: [{ x: 0, y: 0 }], lines: [{ m: 0, n: 0, side: -1 }],
        maxima: [], minima: [{ x: -1, y: -1 / Math.E }], inflections: [{ x: -2, y: -2 / Math.E ** 2 }], view: [-1, 3]
    }
}

export interface LayerState {
    fn: LayerFunction
    /** How many layers are shown, 0 to 6 */
    layers: number
    prediction: Prediction | null
}

export const initialLayerState: LayerState = { fn: 'cubic', layers: 0, prediction: null }

/** A new function starts again from no layers and asks for a new prediction */
export function setLayers(state: LayerState, patch: Partial<Omit<LayerState, 'prediction'>>): LayerState {
    const fn = patch.fn ?? state.fn
    const layers = Math.min(LAYER_COUNT, Math.max(0, Math.round(patch.layers ?? (fn === state.fn ? state.layers : 0))))
    return { fn, layers, prediction: fn === state.fn ? state.prediction : null }
}

export const extremaCount = (fn: LayerFunction) => LAYER_SETUP[fn].maxima.length + LAYER_SETUP[fn].minima.length

/** Fewer than two local extrema (<), two (=) or more (>) */
export const layerPrediction = (state: LayerState): Prediction => compareTo(extremaCount(state.fn), 2)

export const LAYER_NAMES: Record<LayerFunction, string> = { cubic: 'f_1', quartic: 'f_2', rational: 'f_3', exp: 'f_4' }

/** The layers, in the order they are added */
export const LAYER_TITLES: LocalizedText[] = [
    say('Izate-eremua', 'Dominio', 'المجال', 'Domain'),
    say('Ebaki-puntuak', 'Cortes', 'التقاطع', 'Intercepts'),
    say('Asintotak', 'Asíntotas', 'المقاربات', 'Asymptotes'),
    say('Hazkundea', 'Crecimiento', 'التزايد', 'Increase'),
    say('Kurbadura', 'Curvatura', 'التقعّر', 'Concavity'),
    say('Kurba', 'Curva', 'المنحنى', 'Curve')
]

/** A function described by its features, and the layer that shows them */
interface Feature {
    fn: LayerFunction
    layer: number
    text: LocalizedText
}

const FEATURES: Feature[] = [
    { fn: 'rational', layer: 3, text: say('asintota zeihar bat duen funtzioa', 'la función con una asíntota oblicua', 'الدالة التي لها مقارب مائل', 'the function with an oblique asymptote') },
    { fn: 'exp', layer: 4, text: say('mutur bakarra duen funtzioa', 'la función con un solo extremo', 'الدالة التي لها قيمة قصوى واحدة', 'the function with a single extremum') },
    { fn: 'quartic', layer: 4, text: say('hiru mutur dituen funtzioa', 'la función con tres extremos', 'الدالة التي لها ثلاث قيم قصوى', 'the function with three extrema') },
    { fn: 'rational', layer: 5, text: say('inflexiorik ez duen funtzioa', 'la función sin puntos de inflexión', 'الدالة التي لا نقطة انعطاف لها', 'the function with no point of inflection') },
    { fn: 'exp', layer: 3, text: say('alde batean bakarrik asintota horizontala duen funtzioa', 'la función con asíntota horizontal por un solo lado', 'الدالة التي لها مقارب أفقي من جهة واحدة', 'the function with a horizontal asymptote on one side only') },
    { fn: 'quartic', layer: 5, text: say('bi inflexio-puntu dituen funtzioa', 'la función con dos puntos de inflexión', 'الدالة التي لها نقطتا انعطاف', 'the function with two points of inflection') },
    { fn: 'cubic', layer: 4, text: say('maximo bat eta minimo bat, eta asintotarik ez dituen funtzioa', 'la función con un máximo, un mínimo y sin asíntotas', 'الدالة التي لها قيمة عظمى وقيمة صغرى ولا مقاربات لها', 'the function with one maximum, one minimum and no asymptotes') },
    { fn: 'rational', layer: 1, text: say('izate-eremuan zulo bat duen funtzioa', 'la función a la que le falta un punto del dominio', 'الدالة التي ينقص مجالها نقطة', 'the function missing a point from its domain') },
    { fn: 'cubic', layer: 5, text: say('inflexio-puntu bakarra eta asintotarik ez dituen funtzioa', 'la función con un solo punto de inflexión y sin asíntotas', 'الدالة التي لها نقطة انعطاف واحدة ولا مقاربات لها', 'the function with a single point of inflection and no asymptotes') }
]

const prompt = (feature: Feature) => {
    const title = LAYER_TITLES[feature.layer - 1]
    return say(
        `Aukeratu ${feature.text.eu}, eta erakutsi «${title.eu}» geruzaraino.`,
        `Elige ${feature.text.es} y muéstrala hasta la capa «${title.es}».`,
        `اختر ${feature.text.ar} واعرضها حتى طبقة «${title.ar}».`,
        `Choose ${feature.text.en} and show it up to the «${title.en}» layer.`
    )
}

const hint = say('Funtzio bakoitzaren geruzak begiratu, eta konparatu.', 'Mira las capas de cada función y compáralas.', 'انظر إلى طبقات كل دالة وقارن بينها.', 'Look at the layers of each function and compare them.')

const solves = (feature: Feature) => (state: LayerState) => state.fn === feature.fn && state.layers >= feature.layer

export const layerChallenges: LabChallenge<LayerState>[] = [0, 1, 2, 3, 6].map((index, order) => ({
    id: 111351 + order,
    prompt: prompt(FEATURES[index]),
    hint,
    isSolved: solves(FEATURES[index])
}))

/** Endless practice: any of the features, also those of the fixed challenges */
const layerMaker: LabChallengeMaker<LayerState> = (random) => {
    const feature = FEATURES[randomInt(random, 0, FEATURES.length - 1)]
    return { prompt: prompt(feature), hint, isSolved: solves(feature), solution: { fn: feature.fn, layers: feature.layer, prediction: null } }
}

export const layerExtra = freshFrom(initialLayerState, layerMaker)
