import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'
import { exact } from '../../batx1-zientziak-integralak/lab/numbers.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L3 · Parte el recinto. A region bounded by two or three curves (one of
   them may be the x-axis or a horizontal line), in the style of the EBAU
   of the Basque Country. First the learner guesses how many strips it
   needs: one, two or three. Then the cuts appear, and in each strip the
   learner says which of its two curves is on top; each strip is worked
   out as ∫(chosen − other), so a wrong choice gives a negative strip, and
   the sum is the area only when every choice is right.
   ========================================================================== */

export type StripRegion = 'parabolaLine' | 'rootLine' | 'twoParabolas' | 'chord' | 'cubicAxis'

export const STRIP_REGIONS: StripRegion[] = ['parabolaLine', 'rootLine', 'twoParabolas', 'chord', 'cubicAxis']

export interface StripCurve {
    fn: (x: number) => number
    /** An antiderivative */
    F: (x: number) => number
    /** Its name on the board and on the buttons */
    name: string
    latex: string
    /** How it is written inside ∫(top − bottom): brackets where a minus needs them, f for the long cubic */
    term: string
}

const curve = (fn: (x: number) => number, F: (x: number) => number, name: string, latex: string, term: string): StripCurve => ({ fn, F, name, latex, term })

export const AXIS = curve(() => 0, () => 0, 'y = 0', 'y=0', '0')
const SQUARE = curve((x) => x * x, (x) => x ** 3 / 3, 'x²', 'y=x^2', 'x^2')
const TWO_MINUS = curve((x) => 2 - x, (x) => 2 * x - x * x / 2, '2 − x', 'y=2-x', '(2-x)')
const ROOT = curve((x) => Math.sqrt(x), (x) => (2 / 3) * x ** 1.5, '√x', 'y=\\sqrt{x}', '\\sqrt{x}')
const QUARTER = curve((x) => x * x / 4, (x) => x ** 3 / 12, 'x²/4', 'y=\\frac{x^2}{4}', '\\frac{x^2}{4}')
const FOUR = curve(() => 4, (x) => 4 * x, 'y = 4', 'y=4', '4')
const DOUBLE = curve((x) => 2 * x, (x) => x * x, '2x', 'y=2x', '2x')
const CUBIC = curve((x) => x ** 3 - 3 * x * x + 2 * x, (x) => x ** 4 / 4 - x ** 3 + x * x, 'x³ − 3x² + 2x', 'y=x^3-3x^2+2x', 'f')

export interface Strip {
    from: number
    to: number
    /** The two curves that bound it, in the order of the buttons */
    curves: [StripCurve, StripCurve]
    /** Which of the two is on top */
    top: 0 | 1
}

interface RegionSetup {
    curves: StripCurve[]
    strips: Strip[]
    /** The exact area as LaTeX */
    areaLatex: string
    /** The x and y range of the board */
    view: { x: [number, number]; y: [number, number] }
    /** Where each curve's name goes on the board (none for the x-axis) */
    labels: Array<[number, number] | null>
}

export const STRIP_SETUP: Record<StripRegion, RegionSetup> = {
    parabolaLine: {
        curves: [SQUARE, TWO_MINUS, AXIS],
        strips: [{ from: 0, to: 1, curves: [AXIS, SQUARE], top: 1 }, { from: 1, to: 2, curves: [TWO_MINUS, AXIS], top: 0 }],
        areaLatex: '\\frac{5}{6}',
        view: { x: [-0.5, 2.5], y: [-0.5, 2.5] },
        labels: [[1.62, 2.15], [2.15, 0.35], null]
    },
    rootLine: {
        curves: [ROOT, TWO_MINUS, AXIS],
        strips: [{ from: 0, to: 1, curves: [AXIS, ROOT], top: 1 }, { from: 1, to: 2, curves: [TWO_MINUS, AXIS], top: 0 }],
        areaLatex: '\\frac{7}{6}',
        view: { x: [-0.5, 2.5], y: [-0.5, 2.5] },
        labels: [[2.15, 1.7], [-0.2, 1.75], null]
    },
    twoParabolas: {
        curves: [SQUARE, QUARTER, FOUR],
        strips: [{ from: 0, to: 2, curves: [QUARTER, SQUARE], top: 1 }, { from: 2, to: 4, curves: [FOUR, QUARTER], top: 0 }],
        areaLatex: '\\frac{16}{3}',
        view: { x: [-0.5, 4.5], y: [-0.5, 5] },
        labels: [[1.25, 3.3], [4.05, 3.3], [0.55, 4.4]]
    },
    chord: {
        curves: [SQUARE, DOUBLE],
        strips: [{ from: 0, to: 2, curves: [SQUARE, DOUBLE], top: 1 }],
        areaLatex: '\\frac{4}{3}',
        view: { x: [-0.5, 2.5], y: [-0.5, 4.5] },
        labels: [[1.6, 3.7], [2.3, 3.6]]
    },
    cubicAxis: {
        curves: [CUBIC, AXIS],
        strips: [{ from: 0, to: 1, curves: [AXIS, CUBIC], top: 1 }, { from: 1, to: 2, curves: [CUBIC, AXIS], top: 1 }, { from: 2, to: 3, curves: [CUBIC, AXIS], top: 0 }],
        areaLatex: '\\frac{11}{4}',
        view: { x: [-0.5, 3.3], y: [-1, 6.5] },
        labels: [[1.05, 2.1], null]
    }
}

export interface StripState {
    region: StripRegion
    /** The curve the learner put on top in each strip (index into the strip's two curves) */
    tops: Array<0 | 1>
    prediction: Prediction | null
}

const startTops = (region: StripRegion): Array<0 | 1> => STRIP_SETUP[region].strips.map(() => 0)

export const initialStripState: StripState = { region: 'parabolaLine', tops: startTops('parabolaLine'), prediction: null }

/** A new region starts again (new prediction, every strip on its first button); choosing tops keeps the prediction */
export function setStrips(state: StripState, patch: { region?: StripRegion; strip?: number; top?: 0 | 1 }): StripState {
    const region = patch.region ?? state.region
    if (region !== state.region) return { region, tops: startTops(region), prediction: null }
    const tops = STRIP_SETUP[region].strips.map((_, i) => (i === patch.strip && patch.top !== undefined ? patch.top : state.tops[i] ?? 0))
    return { region, tops, prediction: state.prediction }
}

/** ∫ (chosen − other) over a strip */
export function stripValue(strip: Strip, top: 0 | 1): number {
    const upper = strip.curves[top]
    const lower = strip.curves[top === 0 ? 1 : 0]
    return exact(upper.F(strip.to) - upper.F(strip.from) - (lower.F(strip.to) - lower.F(strip.from)))
}

export const stripValues = (state: Pick<StripState, 'region' | 'tops'>) => STRIP_SETUP[state.region].strips.map((strip, i) => stripValue(strip, state.tops[i] ?? 0))
export const stripTotal = (state: Pick<StripState, 'region' | 'tops'>) => exact(stripValues(state).reduce((total, value) => total + value, 0))
export const regionArea = (region: StripRegion) => exact(STRIP_SETUP[region].strips.reduce((total, strip) => total + stripValue(strip, strip.top), 0))
export const allRight = (state: Pick<StripState, 'region' | 'tops'>) => STRIP_SETUP[state.region].strips.every((strip, i) => state.tops[i] === strip.top)
export const rightTops = (region: StripRegion): Array<0 | 1> => STRIP_SETUP[region].strips.map((strip) => strip.top)

/** One strip (<), two (=) or three (>) */
export const stripPrediction = (state: Pick<StripState, 'region'>): Prediction => compareTo(STRIP_SETUP[state.region].strips.length, 2)

/** The region named by its curves, for the prompts */
export const regionLatex = (region: StripRegion) => STRIP_SETUP[region].curves.map((item) => `$${item.latex}$`)

const bounded = (region: StripRegion, goal: LocalizedText): LocalizedText => {
    const names = regionLatex(region)
    const list = (and: string) => (names.length === 2 ? `${names[0]} ${and} ${names[1]}` : `${names[0]}, ${names[1]} ${and} ${names[2]}`)
    const listAr = names.length === 2 ? `${names[0]} و${names[1]}` : `${names[0]} و${names[1]} و${names[2]}`
    return say(
        `${list('eta')} kurbek mugatutako barrutian, ${goal.eu}`,
        `En el recinto limitado por ${list('y')}, ${goal.es}`,
        `في المنطقة التي يحدّها ${listAr}، ${goal.ar}`,
        `In the region bounded by ${list('and')}, ${goal.en}`
    )
}

const fitIt = say(
    'aukeratu zerrenda bakoitzean goiko kurba, batura azalera izan dadin.',
    'elige la curva de arriba en cada tira para que la suma sea el área.',
    'اختر المنحنى الأعلى في كل شريحة ليكون المجموع هو المساحة.',
    'choose the top curve in each strip so that the sum is the area.'
)
const fitHint = say(
    'Zerrenda batek zenbaki negatiboa ematen badu, haren goiko kurba gaizki dago.',
    'Si una tira da un número negativo, su curva de arriba está mal.',
    'إذا أعطت شريحة عددًا سالبًا فمنحناها الأعلى خاطئ.',
    'If a strip gives a negative number, its top curve is wrong.'
)
const negative = say(
    'lortu batura negatiboa: aukeratu nahita behekoa goian zerrenda guztietan.',
    'consigue una suma negativa: pon a propósito la de abajo arriba en todas las tiras.',
    'احصل على مجموع سالب: ضع عمدًا المنحنى الأدنى في الأعلى في كل الشرائح.',
    'get a negative sum: on purpose, put the bottom curve on top in every strip.'
)

export const stripChallenges: LabChallenge<StripState>[] = STRIP_REGIONS.map((region, index) => ({
    id: 127301 + index,
    prompt: bounded(region, fitIt),
    hint: fitHint,
    isSolved: (state: StripState) => state.region === region && state.prediction !== null && allRight(state)
}))

/** Endless practice: fit a region, or get the negative sum of the wrong tops on purpose */
const stripMaker: LabChallengeMaker<StripState> = (random) => {
    const region = STRIP_REGIONS[randomInt(random, 0, STRIP_REGIONS.length - 1)]
    if (randomInt(random, 0, 1) === 0) {
        return { prompt: bounded(region, fitIt), hint: fitHint, isSolved: (state) => state.region === region && state.prediction !== null && allRight(state), solution: { region, tops: rightTops(region), prediction: '=' } }
    }
    const wrong = rightTops(region).map((top) => (top === 0 ? 1 : 0)) as Array<0 | 1>
    return {
        prompt: bounded(region, negative),
        hint: say('Zerrenda bakoitzean, $\\int(\\text{behekoa}-\\text{goikoa})$ negatiboa da.', 'En cada tira, $\\int(\\text{abajo}-\\text{arriba})$ es negativa.', 'في كل شريحة يكون التكامل سالبًا إذا طرحنا الأعلى من الأدنى.', 'On each strip, $\\int(\\text{bottom}-\\text{top})$ is negative.'),
        isSolved: (state) => state.region === region && state.prediction !== null && stripValues(state).every((value) => value < 0),
        solution: { region, tops: wrong, prediction: '=' }
    }
}

export const stripExtra = freshFrom(initialStripState, stripMaker)
