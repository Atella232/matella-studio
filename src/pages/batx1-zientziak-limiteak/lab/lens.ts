import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   L1 · Limitearen lupa (La lupa del límite): five functions, each at its
   point a, and two probes at a − h and a + h. The lens (k) brings them
   closer: h = 1, 0,1, 0,01, 0,001. Before the graph is shown the learner
   predicts, from the formula, whether the value on the left ends up below,
   at or above the value on the right (at: the limit exists). ▶ slides the
   probes in from h = 1. Every piece is a line, so every value is exact
   with three decimals at most.
   ========================================================================== */

export type LensFunction = 'hole' | 'jump' | 'moved' | 'sign' | 'drop'

export const LENS_FUNCTIONS: LensFunction[] = ['hole', 'jump', 'moved', 'sign', 'drop']

export const LENS_LIMITS = { k: { min: 0, max: 3 } } as const

export interface LensState {
    fn: LensFunction
    /** h = 10^−k */
    k: number
    prediction: Prediction | null
}

export const initialLensState: LensState = { fn: 'hole', k: 0, prediction: null }

export function setLens(state: LensState, patch: Partial<Omit<LensState, 'prediction'>>): LensState {
    const fn = patch.fn ?? state.fn
    const k = Math.min(LENS_LIMITS.k.max, Math.max(LENS_LIMITS.k.min, Math.round(patch.k ?? state.k)))
    return { fn, k, prediction: fn === state.fn ? state.prediction : null }
}

interface LensSetup {
    /** The point */
    a: number
    /** The piece on the left of a and the piece on the right */
    left: (x: number) => number
    right: (x: number) => number
    /** f(a), or null where f is not defined */
    at: number | null
    /** The formula, for LaTeX */
    latex: string
    /** The view, in whole units */
    view: { xMin: number; xMax: number; yMin: number; yMax: number }
}

export const LENS_SETUP: Record<LensFunction, LensSetup> = {
    hole: { a: 2, left: (x) => x + 2, right: (x) => x + 2, at: null, latex: 'f(x)=\\frac{x^2-4}{x-2}', view: { xMin: -1, xMax: 5, yMin: -1, yMax: 7 } },
    jump: { a: 1, left: (x) => x + 1, right: (x) => 4 - x, at: 3, latex: 'f(x)=\\begin{cases}x+1 & x<1\\\\ 4-x & x\\ge 1\\end{cases}', view: { xMin: -2, xMax: 4, yMin: -1, yMax: 5 } },
    moved: { a: 1, left: (x) => 2 * x + 1, right: (x) => 2 * x + 1, at: 5, latex: 'f(x)=\\begin{cases}2x+1 & x\\neq 1\\\\ 5 & x=1\\end{cases}', view: { xMin: -2, xMax: 4, yMin: -2, yMax: 7 } },
    sign: { a: 0, left: () => -1, right: () => 1, at: null, latex: 'f(x)=\\frac{|x|}{x}', view: { xMin: -3, xMax: 3, yMin: -3, yMax: 3 } },
    drop: { a: -1, left: (x) => 1 - x, right: (x) => x + 1, at: 0, latex: 'f(x)=\\begin{cases}1-x & x<-1\\\\ x+1 & x\\ge -1\\end{cases}', view: { xMin: -4, xMax: 2, yMin: -1, yMax: 5 } }
}

export const lensH = (k: number) => 10 ** -k

/** The value of a probe, rounded to the thousandths it really has */
const exact = (value: number) => Math.round(value * 1000) / 1000

/** f(a − h) and f(a + h) */
export function lensValues(state: LensState): [number, number] {
    const { a, left, right } = LENS_SETUP[state.fn]
    const h = lensH(state.k)
    return [exact(left(a - h)), exact(right(a + h))]
}

/** The one-sided limits */
export function lensLimits(fn: LensFunction): [number, number] {
    const { a, left, right } = LENS_SETUP[fn]
    return [exact(left(a)), exact(right(a))]
}

/** The left limit below (<), equal to (=: the limit exists) or above (>) the right one */
export function lensPrediction(state: LensState): Prediction {
    const [left, right] = lensLimits(state.fn)
    return compareTo(left, right)
}

const close = (state: LensState) => state.k >= 2

export const lensChallenges: LabChallenge<LensState>[] = [
    {
        id: 109101,
        prompt: say('$\\frac{x^2-4}{x-2}$ funtzioan, hurbildu 2 zenbakira $0{,}001$ distantziaraino.', 'En $\\frac{x^2-4}{x-2}$, acércate a 2 hasta $0{,}001$.', 'في $\\frac{x^2-4}{x-2}$ اقترب من 2 حتى $0{,}001$.', 'In $\\frac{x^2-4}{x-2}$, get as close to 2 as $0{,}001$.'),
        hint: say('Lupa: $h=0{,}001$.', 'Lupa: $h=0{,}001$.', 'العدسة: $h=0{,}001$.', 'Lens: $h=0{,}001$.'),
        isSolved: (state) => state.fn === 'hole' && state.k === 3
    },
    {
        id: 109102,
        prompt: say('Bilatu funtzio bat, non ezkerreko limitea eskuinekoa baino txikiagoa den, eta begiratu $h=0{,}01$ edo hurbilago.', 'Busca una función cuyo límite por la izquierda sea menor que por la derecha, y mírala a $h=0{,}01$ o más cerca.', 'ابحث عن دالة نهايتها من اليسار أصغر من نهايتها من اليمين، وانظر إليها عند $h=0{,}01$ أو أقرب.', 'Find a function whose left limit is smaller than its right limit, and look at it from $h=0{,}01$ or closer.'),
        hint: say('Jauzi bat gorantz.', 'Un salto hacia arriba.', 'قفزة إلى الأعلى.', 'A jump upwards.'),
        isSolved: (state) => (state.fn === 'jump' || state.fn === 'sign') && close(state)
    },
    {
        id: 109103,
        prompt: say('Bilatu limitea duen funtzioa, baina limitea $f(a)$ ez dena, eta begiratu $h=0{,}01$ edo hurbilago.', 'Busca la función que tiene límite pero no vale $f(a)$, y mírala a $h=0{,}01$ o más cerca.', 'ابحث عن الدالة التي لها نهاية لا تساوي $f(a)$، وانظر إليها عند $h=0{,}01$ أو أقرب.', 'Find the function that has a limit which is not $f(a)$, and look at it from $h=0{,}01$ or closer.'),
        hint: say('Puntu bat lekuz kanpo dago.', 'Hay un punto fuera de sitio.', 'هناك نقطة في غير مكانها.', 'One point is out of place.'),
        isSolved: (state) => state.fn === 'moved' && close(state)
    },
    {
        id: 109104,
        prompt: say('Bilatu funtzio bat, non ezkerreko limitea eskuinekoa baino handiagoa den, eta begiratu $h=0{,}01$ edo hurbilago.', 'Busca una función cuyo límite por la izquierda sea mayor que por la derecha, y mírala a $h=0{,}01$ o más cerca.', 'ابحث عن دالة نهايتها من اليسار أكبر من نهايتها من اليمين، وانظر إليها عند $h=0{,}01$ أو أقرب.', 'Find a function whose left limit is greater than its right limit, and look at it from $h=0{,}01$ or closer.'),
        hint: say('Jauzi bat beherantz.', 'Un salto hacia abajo.', 'قفزة إلى الأسفل.', 'A jump downwards.'),
        isSolved: (state) => state.fn === 'drop' && close(state)
    },
    {
        id: 109105,
        prompt: say('$\\frac{|x|}{x}$ funtzioan, hurbildu 0 zenbakira $0{,}001$ distantziaraino: balioak ez dira mugitzen.', 'En $\\frac{|x|}{x}$, acércate a 0 hasta $0{,}001$: los valores no se mueven.', 'في $\\frac{|x|}{x}$ اقترب من 0 حتى $0{,}001$: القيم لا تتحرك.', 'In $\\frac{|x|}{x}$, get as close to 0 as $0{,}001$: the values do not move.'),
        hint: say('Ezkerrean $-1$ eta eskuinean 1, beti.', 'A la izquierda $-1$ y a la derecha 1, siempre.', 'إلى اليسار $-1$ وإلى اليمين 1 دائمًا.', 'On the left $-1$ and on the right 1, always.'),
        isSolved: (state) => state.fn === 'sign' && state.k === 3
    }
]

const H_LATEX = ['1', '0{,}1', '0{,}01', '0{,}001']

/** Endless practice: the function with these two one-sided limits, seen from this close */
const lensMaker: LabChallengeMaker<LensState> = (random) => {
    const fn = LENS_FUNCTIONS[randomInt(random, 0, LENS_FUNCTIONS.length - 1)]
    const k = randomInt(random, 1, 3)
    const [left, right] = lensLimits(fn)
    const l = `$${left}$`
    const r = `$${right}$`
    const h = `$h=${H_LATEX[k]}$`
    return {
        prompt: say(
            `Bilatu ezkerreko limitea ${l} eta eskuinekoa ${r} dituen funtzioa, eta begiratu ${h} distantziatik.`,
            `Busca la función con límite ${l} por la izquierda y ${r} por la derecha, y mírala a ${h}.`,
            `ابحث عن الدالة التي نهايتها من اليسار ${l} ومن اليمين ${r}، وانظر إليها عند ${h}.`,
            `Find the function with left limit ${l} and right limit ${r}, and look at it from ${h}.`
        ),
        hint: say('Ordezkatu $a$ zati bakoitzean.', 'Sustituye $a$ en cada trozo.', 'عوّض $a$ في كل جزء.', 'Substitute $a$ in each piece.'),
        isSolved: (state) => state.fn === fn && state.k === k,
        solution: { fn, k, prediction: null }
    }
}

export const lensExtra = freshFrom(initialLensState, lensMaker)
