import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { exact } from './numbers.ts'

/* ==========================================================================
   L2 · Rectángulos bajo la curva: n rectangles of the same base under f
   on its interval [a, b], each as high as f at its left end, its middle
   or its right end. The board shows the bars and their sum; once the
   learner has guessed, the exact area (shaded) and its value appear. ▶
   makes the bars narrower (n from 1 to 24) so that the sum closes in on
   the area. Before that the learner guesses whether the sum with the
   chosen height is below, equal to or above the area: that depends on
   the function and the height, not on n (an increasing function is
   undercounted on the left; the middle of a straight line is exact).
   ========================================================================== */

export type RectFunction = 'square' | 'cap' | 'line' | 'root' | 'exp'
export type RectSide = 'left' | 'middle' | 'right'

export const RECT_FUNCTIONS: RectFunction[] = ['square', 'cap', 'line', 'root', 'exp']
export const RECT_SIDES: RectSide[] = ['left', 'middle', 'right']
export const RECT_LIMITS = { n: { min: 1, max: 24 } } as const

interface RectSetup {
    fn: (x: number) => number
    /** An antiderivative, for the exact area */
    F: (x: number) => number
    latex: string
    /** The exact area as LaTeX */
    areaLatex: string
    a: number
    b: number
    /** The y range of the board */
    view: [number, number]
}

export const RECT_SETUP: Record<RectFunction, RectSetup> = {
    square: { fn: (x) => x * x, F: (x) => x ** 3 / 3, latex: 'f(x)=x^2', areaLatex: '\\frac{8}{3}', a: 0, b: 2, view: [0, 4] },
    cap: { fn: (x) => 4 - x * x, F: (x) => 4 * x - x ** 3 / 3, latex: 'f(x)=4-x^2', areaLatex: '\\frac{16}{3}', a: 0, b: 2, view: [0, 4] },
    line: { fn: (x) => x + 1, F: (x) => x * x / 2 + x, latex: 'f(x)=x+1', areaLatex: '\\frac{15}{2}', a: 0, b: 3, view: [0, 4] },
    root: { fn: (x) => Math.sqrt(x), F: (x) => (2 / 3) * x ** 1.5, latex: 'f(x)=\\sqrt{x}', areaLatex: '\\frac{16}{3}', a: 0, b: 4, view: [0, 2] },
    exp: { fn: (x) => Math.exp(x), F: (x) => Math.exp(x), latex: 'f(x)=e^x', areaLatex: 'e^2-1', a: 0, b: 2, view: [0, 8] }
}

export interface RectState {
    fn: RectFunction
    side: RectSide
    n: number
    prediction: Prediction | null
}

export const initialRectState: RectState = { fn: 'square', side: 'right', n: 4, prediction: null }

/** A new function or a new height asks for a new prediction; more or fewer bars do not */
export function setRect(state: RectState, patch: Partial<Omit<RectState, 'prediction'>>): RectState {
    const fn = patch.fn ?? state.fn
    const side = patch.side ?? state.side
    const n = Math.min(RECT_LIMITS.n.max, Math.max(RECT_LIMITS.n.min, Math.round(patch.n ?? state.n)))
    return { fn, side, n, prediction: fn === state.fn && side === state.side ? state.prediction : null }
}

/** Where the height of bar i (0 … n − 1) is taken */
export function barPoint(fn: RectFunction, side: RectSide, n: number, i: number): number {
    const { a, b } = RECT_SETUP[fn]
    const width = (b - a) / n
    return a + (i + (side === 'left' ? 0 : side === 'middle' ? 0.5 : 1)) * width
}

/** The bars: their left end, width and height */
export function bars(fn: RectFunction, side: RectSide, n: number) {
    const { a, b, fn: f } = RECT_SETUP[fn]
    const width = (b - a) / n
    return Array.from({ length: n }, (_, i) => ({ x: a + i * width, width, height: f(barPoint(fn, side, n, i)) }))
}

export const rectSum = (fn: RectFunction, side: RectSide, n: number) => exact(bars(fn, side, n).reduce((total, bar) => total + bar.width * bar.height, 0))
export const rectArea = (fn: RectFunction) => exact(RECT_SETUP[fn].F(RECT_SETUP[fn].b) - RECT_SETUP[fn].F(RECT_SETUP[fn].a))
export const rectGap = (state: Pick<RectState, 'fn' | 'side' | 'n'>) => Math.abs(rectSum(state.fn, state.side, state.n) - rectArea(state.fn))

/** The sum with the chosen height is below (<), equal to (=) or above (>) the area: it does not depend on n */
export const rectPrediction = (state: RectState): Prediction => compareTo(rectSum(state.fn, state.side, state.n), rectArea(state.fn))

export const SIDE_WORDS: Record<RectSide, LocalizedText> = {
    left: say('ezkerrean', 'a la izquierda', 'عند اليسار', 'on the left'),
    middle: say('erdian', 'en el medio', 'في الوسط', 'in the middle'),
    right: say('eskuinean', 'a la derecha', 'عند اليمين', 'on the right')
}

const withHeight = (side: RectSide, fn: RectFunction, goal: LocalizedText): LocalizedText => {
    const f = RECT_SETUP[fn].latex
    const where = SIDE_WORDS[side]
    return say(
        `$${f}$ funtzioarekin eta altuera ${where.eu} hartuta, ${goal.eu}`,
        `Con $${f}$ y la altura ${where.es}, ${goal.es}`,
        `مع $${f}$ والارتفاع ${where.ar}، ${goal.ar}`,
        `With $${f}$ and the height ${where.en}, ${goal.en}`
    )
}

const within = (d: string) => say(
    `lortu azaleratik $${d}$ baino gutxiagora dagoen batura.`,
    `consigue una suma a menos de $${d}$ del área.`,
    `احصل على مجموع يبعد عن المساحة أقل من $${d}$.`,
    `get a sum less than $${d}$ away from the area.`
)

export const rectChallenges: LabChallenge<RectState>[] = [
    {
        id: 112101,
        prompt: withHeight('right', 'square', say('lortu 3 baino txikiagoa den batura.', 'consigue una suma menor que 3.', 'احصل على مجموع أصغر من 3.', 'get a sum smaller than 3.')),
        hint: say('Laukizuzen estuagoek gutxiago gainditzen dute kurba.', 'Los rectángulos más estrechos sobresalen menos de la curva.', 'المستطيلات الأضيق تبرز أقل فوق المنحنى.', 'Narrower rectangles stick out less above the curve.'),
        isSolved: (state) => state.fn === 'square' && state.side === 'right' && rectSum('square', 'right', state.n) < 3
    },
    {
        id: 112102,
        prompt: withHeight('left', 'cap', within('0{,}5')),
        hint: say('Funtzioa beherakorra da: ezkerreko altuerak handiegiak dira. Gehitu laukizuzenak.', 'La función decrece: las alturas de la izquierda se pasan. Pon más rectángulos.', 'الدالة متناقصة: ارتفاعات اليسار أكبر من اللازم. زد المستطيلات.', 'The function decreases: the heights on the left overshoot. Add rectangles.'),
        isSolved: (state) => state.fn === 'cap' && state.side === 'left' && rectGap(state) < 0.5
    },
    {
        id: 112103,
        prompt: say('$f(x)=x+1$ funtzioarekin, aukeratu batura azalera zehatza ematen duen altuera.', 'Con $f(x)=x+1$, elige la altura con la que la suma da justo el área.', 'مع $f(x)=x+1$ اختر الارتفاع الذي يعطي فيه المجموع المساحة تمامًا.', 'With $f(x)=x+1$, choose the height with which the sum gives exactly the area.'),
        hint: say('Zuzen batean, soberan dagoen triangeluak falta dena berdintzen du.', 'En una recta, el triángulo que sobra compensa el que falta.', 'في المستقيم يعوّض المثلث الزائد المثلث الناقص.', 'On a straight line, the triangle left over makes up for the one missing.'),
        isSolved: (state) => state.fn === 'line' && rectGap(state) < 1e-9
    },
    {
        id: 112104,
        prompt: withHeight('middle', 'exp', within('0{,}05')),
        hint: say('Erdiko altuerak oso ondo hurbiltzen du: laukizuzen gutxi behar dira.', 'La altura del medio aproxima muy bien: hacen falta pocos rectángulos.', 'ارتفاع الوسط يقرّب جيدًا جدًّا: تكفي مستطيلات قليلة.', 'The middle height approximates very well: few rectangles are needed.'),
        isSolved: (state) => state.fn === 'exp' && state.side === 'middle' && rectGap(state) < 0.05
    },
    {
        id: 112105,
        prompt: withHeight('left', 'root', within('0{,}5')),
        hint: say('Funtzioa gorakorra da: ezkerreko altuerak laburregiak dira.', 'La función crece: las alturas de la izquierda se quedan cortas.', 'الدالة متزايدة: ارتفاعات اليسار أقصر من اللازم.', 'The function increases: the heights on the left fall short.'),
        isSolved: (state) => state.fn === 'root' && state.side === 'left' && rectGap(state) < 0.5
    }
]

const GAPS: Array<[number, string]> = [[1, '1'], [0.5, '0{,}5'], [0.25, '0{,}25'], [0.1, '0{,}1']]

/** Endless practice: a function, a height and how close the sum must come to the area */
const rectMaker: LabChallengeMaker<RectState> = (random) => {
    for (;;) {
        const fn = RECT_FUNCTIONS[randomInt(random, 0, RECT_FUNCTIONS.length - 1)]
        const side = RECT_SIDES[randomInt(random, 0, RECT_SIDES.length - 1)]
        const [gap, text] = GAPS[randomInt(random, 0, GAPS.length - 1)]
        // The fewest bars that do it: at least 2 and within the stepper
        let n = 1
        while (n <= RECT_LIMITS.n.max && rectGap({ fn, side, n }) >= gap) n += 1
        if (n < 2 || n > RECT_LIMITS.n.max) continue
        return {
            prompt: withHeight(side, fn, within(text)),
            hint: say('Laukizuzen estuagoekin batura azalerara hurbiltzen da.', 'Con rectángulos más estrechos la suma se acerca al área.', 'مع مستطيلات أضيق يقترب المجموع من المساحة.', 'With narrower rectangles the sum gets closer to the area.'),
            isSolved: (state) => state.fn === fn && state.side === side && rectGap(state) < gap,
            solution: { fn, side, n, prediction: null }
        }
    }
}

export const rectExtra = freshFrom(initialRectState, rectMaker)
