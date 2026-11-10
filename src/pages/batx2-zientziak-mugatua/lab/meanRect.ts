import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'
import { exact } from '../../batx1-zientziak-integralak/lab/numbers.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L2 · El rectángulo del valor medio. The region under f on [a, b] and a
   rectangle on the same base, as high as f(c). The learner moves c (in
   tenths, with the stepper or by tapping the board) until the rectangle
   has the same area as the region: then f(c) is the mean value of f and c
   is the point of the mean value theorem, to the nearest tenth. Before the
   area of the region is shown, the learner guesses whether that c lies to
   the left of the middle of the interval, at the middle or to the right.
   ========================================================================== */

export type MeanFunction = 'square' | 'root' | 'line' | 'cap' | 'exp'

export const MEAN_FUNCTIONS: MeanFunction[] = ['square', 'root', 'line', 'cap', 'exp']

interface MeanSetup {
    fn: (x: number) => number
    /** An antiderivative, for the exact area */
    F: (x: number) => number
    /** The inverse of f, to find the exact c of the theorem */
    inverse: (y: number) => number
    latex: string
    /** The exact area as LaTeX */
    areaLatex: string
    a: number
    b: number
    /** The y range of the board */
    view: [number, number]
}

export const MEAN_SETUP: Record<MeanFunction, MeanSetup> = {
    square: { fn: (x) => x * x, F: (x) => x ** 3 / 3, inverse: (y) => Math.sqrt(y), latex: 'f(x)=x^2', areaLatex: '9', a: 0, b: 3, view: [0, 9] },
    root: { fn: (x) => Math.sqrt(x), F: (x) => (2 / 3) * x ** 1.5, inverse: (y) => y * y, latex: 'f(x)=\\sqrt{x}', areaLatex: '\\frac{16}{3}', a: 0, b: 4, view: [0, 2] },
    line: { fn: (x) => x + 1, F: (x) => x * x / 2 + x, inverse: (y) => y - 1, latex: 'f(x)=x+1', areaLatex: '12', a: 0, b: 4, view: [0, 5] },
    cap: { fn: (x) => 4 - x * x, F: (x) => 4 * x - x ** 3 / 3, inverse: (y) => Math.sqrt(4 - y), latex: 'f(x)=4-x^2', areaLatex: '\\frac{16}{3}', a: 0, b: 2, view: [0, 4] },
    exp: { fn: (x) => Math.exp(x), F: (x) => Math.exp(x), inverse: (y) => Math.log(y), latex: 'f(x)=e^x', areaLatex: 'e^2-1', a: 0, b: 2, view: [0, 8] }
}

export interface MeanState {
    fn: MeanFunction
    /** c in tenths: c = a + tenths / 10 */
    tenths: number
    prediction: Prediction | null
}

export const initialMeanState: MeanState = { fn: 'square', tenths: 5, prediction: null }

/** How many tenths the interval has */
export const meanSteps = (fn: MeanFunction) => Math.round((MEAN_SETUP[fn].b - MEAN_SETUP[fn].a) * 10)

/** A new function asks for a new prediction (and puts c back near the left end); moving c does not */
export function setMean(state: MeanState, patch: Partial<Omit<MeanState, 'prediction'>>): MeanState {
    const fn = patch.fn ?? state.fn
    const changed = fn !== state.fn
    const tenths = Math.min(meanSteps(fn), Math.max(0, Math.round(patch.tenths ?? (changed ? 5 : state.tenths))))
    return { fn, tenths, prediction: changed ? null : state.prediction }
}

export const meanC = (state: Pick<MeanState, 'fn' | 'tenths'>) => exact(MEAN_SETUP[state.fn].a + state.tenths / 10)
export const meanArea = (fn: MeanFunction) => exact(MEAN_SETUP[fn].F(MEAN_SETUP[fn].b) - MEAN_SETUP[fn].F(MEAN_SETUP[fn].a))
/** The mean value of f on the interval */
export const meanValue = (fn: MeanFunction) => exact(meanArea(fn) / (MEAN_SETUP[fn].b - MEAN_SETUP[fn].a))
/** The exact c of the theorem */
export const meanPoint = (fn: MeanFunction) => exact(MEAN_SETUP[fn].inverse(meanValue(fn)))
/** The area of the rectangle of height f(c) */
export const rectangleArea = (state: Pick<MeanState, 'fn' | 'tenths'>) => exact(MEAN_SETUP[state.fn].fn(meanC(state)) * (MEAN_SETUP[state.fn].b - MEAN_SETUP[state.fn].a))
/** The tenth nearest to the c of the theorem */
export const bestTenths = (fn: MeanFunction) => Math.round((meanPoint(fn) - MEAN_SETUP[fn].a) * 10)
export const isMeanPoint = (state: Pick<MeanState, 'fn' | 'tenths'>) => state.tenths === bestTenths(state.fn)

/** The c of the theorem lies left of the middle (<), at the middle (=) or right of it (>) */
export const meanPrediction = (state: Pick<MeanState, 'fn'>): Prediction => compareTo(meanPoint(state.fn), (MEAN_SETUP[state.fn].a + MEAN_SETUP[state.fn].b) / 2)

const withCurve = (fn: MeanFunction, goal: LocalizedText): LocalizedText => {
    const f = MEAN_SETUP[fn].latex
    return say(`$${f}$ funtzioarekin, ${goal.eu}`, `Con $${f}$, ${goal.es}`, `مع $${f}$، ${goal.ar}`, `With $${f}$, ${goal.en}`)
}

const placeC = say(
    'jarri $c$ laukizuzenak eskualdearen azalera bera izan dezan (hamarrenetara).',
    'coloca $c$ para que el rectángulo tenga la misma área que la región (a la décima).',
    'ضع $c$ بحيث يكون للمستطيل مساحة المنطقة نفسها (إلى أقرب عُشر).',
    'place $c$ so that the rectangle has the same area as the region (to the nearest tenth).'
)

const placeHint = say(
    'Laukizuzena handiegia bada, mugitu $c$ kurba baxuago dagoen aldera; txikiegia bada, beste aldera.',
    'Si el rectángulo se pasa, mueve $c$ hacia donde la curva está más baja; si se queda corto, al otro lado.',
    'إذا زاد المستطيل فحرّك $c$ نحو الجهة التي يكون فيها المنحنى أخفض، وإذا نقص فإلى الجهة الأخرى.',
    'If the rectangle is too big, move $c$ to where the curve is lower; if it falls short, to the other side.'
)

export const meanChallenges: LabChallenge<MeanState>[] = [
    { id: 127201, prompt: withCurve('square', placeC), hint: placeHint, isSolved: (state) => state.fn === 'square' && isMeanPoint(state) },
    { id: 127202, prompt: withCurve('root', placeC), hint: placeHint, isSolved: (state) => state.fn === 'root' && isMeanPoint(state) },
    { id: 127203, prompt: withCurve('line', placeC), hint: say('Zuzen batean, $c$ tartearen erdian dago.', 'En una recta, $c$ está en el centro del intervalo.', 'في المستقيم يقع $c$ في منتصف الفترة.', 'On a straight line, $c$ is at the middle of the interval.'), isSolved: (state) => state.fn === 'line' && isMeanPoint(state) },
    { id: 127204, prompt: withCurve('cap', placeC), hint: placeHint, isSolved: (state) => state.fn === 'cap' && isMeanPoint(state) },
    { id: 127205, prompt: withCurve('exp', placeC), hint: placeHint, isSolved: (state) => state.fn === 'exp' && isMeanPoint(state) }
]

const tooBig = say(
    'jarri $c$ laukizuzenak eskualdeak baino 1 unitate gehiago izan dezan, gutxienez.',
    'coloca $c$ para que el rectángulo tenga al menos 1 unidad más de área que la región.',
    'ضع $c$ بحيث تزيد مساحة المستطيل على مساحة المنطقة بوحدة واحدة على الأقل.',
    'place $c$ so that the rectangle has at least 1 unit more area than the region.'
)
const tooSmall = say(
    'jarri $c$ laukizuzenari eskualdeari baino 1 unitate gutxiago geratzeko, gutxienez.',
    'coloca $c$ para que al rectángulo le falte al menos 1 unidad de área respecto a la región.',
    'ضع $c$ بحيث تنقص مساحة المستطيل عن مساحة المنطقة بوحدة واحدة على الأقل.',
    'place $c$ so that the rectangle has at least 1 unit less area than the region.'
)

/** The tenth where f is highest (or lowest) on the interval */
function extremeTenths(fn: MeanFunction, highest: boolean): number {
    let best = 0
    for (let t = 0; t <= meanSteps(fn); t += 1) {
        const better = highest ? rectangleArea({ fn, tenths: t }) > rectangleArea({ fn, tenths: best }) : rectangleArea({ fn, tenths: t }) < rectangleArea({ fn, tenths: best })
        if (better) best = t
    }
    return best
}

/** Endless practice: place the point of the theorem, or make the rectangle clearly too big or too small */
const meanMaker: LabChallengeMaker<MeanState> = (random) => {
    const fn = MEAN_FUNCTIONS[randomInt(random, 0, MEAN_FUNCTIONS.length - 1)]
    const kind = randomInt(random, 0, 2)
    if (kind === 0) return { prompt: withCurve(fn, placeC), hint: placeHint, isSolved: (state) => state.fn === fn && isMeanPoint(state), solution: { fn, tenths: bestTenths(fn), prediction: null } }
    const big = kind === 1
    return {
        prompt: withCurve(fn, big ? tooBig : tooSmall),
        hint: say('Laukizuzenaren altuera $f(c)$ da: begiratu non dagoen kurba gorago edo beherago.', 'La altura del rectángulo es $f(c)$: mira dónde está la curva más alta o más baja.', 'ارتفاع المستطيل $f(c)$: انظر أين يكون المنحنى أعلى أو أخفض.', 'The height of the rectangle is $f(c)$: look where the curve is higher or lower.'),
        isSolved: (state) => state.fn === fn && (big ? rectangleArea(state) - meanArea(fn) >= 1 : meanArea(fn) - rectangleArea(state) >= 1),
        solution: { fn, tenths: extremeTenths(fn, big), prediction: null }
    }
}

export const meanExtra = freshFrom(initialMeanState, meanMaker)
