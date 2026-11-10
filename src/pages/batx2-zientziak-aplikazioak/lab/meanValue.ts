import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L2 · Ebakitzailea eta haren zuzen ukitzaile paraleloa (La secante y su
   tangente paralela): a function and an interval [a, b] whose ends the
   learner steps along a list. The board draws the secant through
   (a, f(a)) and (b, f(b)) and, after the prediction, the tangent at every
   c in (a, b) with f′(c) equal to the slope of the secant (mean value
   theorem). Before drawing, the learner predicts where c is in the
   starting interval: nearer a (<), in the middle (=) or nearer b (>).
   A curve that bends up (∪) puts c nearer b; one that bends down (∩),
   nearer a; a parabola, exactly in the middle.
   ========================================================================== */

export type MeanFunction = 'square' | 'cube' | 'root' | 'exp'

export const MEAN_FUNCTIONS: MeanFunction[] = ['square', 'cube', 'root', 'exp']

interface MeanSetup {
    f: (x: number) => number
    latex: string
    /** The points c in (a, b) whose slope is m */
    solve: (m: number) => number[]
    points: number[]
    start: [number, number]
    view: { xMin: number; xMax: number; yMin: number; yMax: number }
}

export const MEAN_SETUP: Record<MeanFunction, MeanSetup> = {
    square: { f: (x) => x * x, latex: 'x^2', solve: (m) => [m / 2], points: [-2, -1, 0, 1, 2, 3, 4], start: [2, 6], view: { xMin: -2.5, xMax: 4.5, yMin: -1.5, yMax: 16.5 } },
    cube: { f: (x) => x ** 3, latex: 'x^3', solve: (m) => (m < 0 ? [] : m === 0 ? [0] : [-Math.sqrt(m / 3), Math.sqrt(m / 3)]), points: [-2, -1, 0, 1, 2], start: [2, 4], view: { xMin: -2.4, xMax: 2.4, yMin: -8.5, yMax: 8.5 } },
    root: { f: Math.sqrt, latex: '\\sqrt{x}', solve: (m) => (m > 0 ? [1 / (4 * m * m)] : []), points: [0, 0.25, 1, 2.25, 4], start: [0, 4], view: { xMin: -0.4, xMax: 4.4, yMin: -0.3, yMax: 2.4 } },
    exp: { f: Math.exp, latex: 'e^x', solve: (m) => (m > 0 ? [Math.log(m)] : []), points: [-1, 0, 1, 2], start: [1, 2], view: { xMin: -1.4, xMax: 2.4, yMin: -0.6, yMax: 7.8 } }
}

export interface MeanState {
    fn: MeanFunction
    a: number
    b: number
    prediction: Prediction | null
}

export const initialMeanState: MeanState = { fn: 'square', a: MEAN_SETUP.square.start[0], b: MEAN_SETUP.square.start[1], prediction: null }

export function setMean(state: MeanState, patch: Partial<Omit<MeanState, 'prediction'>>): MeanState {
    const fn = patch.fn ?? state.fn
    const setup = MEAN_SETUP[fn]
    if (fn !== state.fn) return { fn, a: setup.start[0], b: setup.start[1], prediction: null }
    const last = setup.points.length - 1
    const clamp = (value: number) => Math.min(last, Math.max(0, Math.round(value)))
    return { fn, a: clamp(patch.a ?? state.a), b: clamp(patch.b ?? state.b), prediction: state.prediction }
}

export interface MeanResult {
    a: number
    b: number
    fa: number
    fb: number
    /** The slope of the secant (NaN when a ≥ b) */
    m: number
    /** The points c strictly inside (a, b) with f′(c) = m */
    cs: number[]
}

export function meanResult(state: Pick<MeanState, 'fn' | 'a' | 'b'>): MeanResult {
    const setup = MEAN_SETUP[state.fn]
    const a = setup.points[state.a]
    const b = setup.points[state.b]
    const fa = setup.f(a)
    const fb = setup.f(b)
    if (a >= b) return { a, b, fa, fb, m: Number.NaN, cs: [] }
    const m = (fb - fa) / (b - a)
    return { a, b, fa, fb, m, cs: setup.solve(m).filter((c) => a < c - 1e-12 && c < b - 1e-12) }
}

/** In the starting interval: is c nearer a, in the middle or nearer b? */
export function meanPrediction(state: Pick<MeanState, 'fn'>): Prediction {
    const [a, b] = MEAN_SETUP[state.fn].start
    const result = meanResult({ fn: state.fn, a, b })
    return compareTo(result.cs[0], (result.a + result.b) / 2)
}

const single = (state: MeanState, value: number) => {
    const { cs } = meanResult(state)
    return cs.length === 1 && Math.abs(cs[0] - value) < 1e-9
}

export const meanChallenges: LabChallenge<MeanState>[] = [
    {
        id: 124201,
        prompt: say('$x^2$ funtzioarekin, aukeratu $c=1$ ematen duen tarte bat.', 'Con $x^2$, elige un intervalo donde $c=1$.', 'مع $x^2$، اختر فترة تكون فيها $c=1$.', 'With $x^2$, choose an interval where $c=1$.'),
        hint: say('Parabolan $c$ tartearen erdiko puntua da.', 'En la parábola, $c$ es el punto medio del intervalo.', 'في القطع المكافئ تكون $c$ منتصف الفترة.', 'For the parabola, $c$ is the midpoint of the interval.'),
        isSolved: (state) => state.fn === 'square' && single(state, 1)
    },
    {
        id: 124202,
        prompt: say('$x^3$ funtzioarekin, aurkitu bi $c$ puntu dituen tarte bat.', 'Con $x^3$, encuentra un intervalo con dos puntos $c$.', 'مع $x^3$، جد فترة فيها نقطتان $c$.', 'With $x^3$, find an interval with two points $c$.'),
        hint: say('Probatu 0 puntuarekiko simetrikoa den tarte bat.', 'Prueba un intervalo simétrico respecto de 0.', 'جرّب فترة متناظرة بالنسبة إلى 0.', 'Try an interval symmetric about 0.'),
        isSolved: (state) => state.fn === 'cube' && meanResult(state).cs.length === 2
    },
    {
        id: 124203,
        prompt: say('$\\sqrt{x}$ funtzioarekin, aukeratu $c=1$ ematen duen tarte bat.', 'Con $\\sqrt{x}$, elige un intervalo donde $c=1$.', 'مع $\\sqrt{x}$، اختر فترة تكون فيها $c=1$.', 'With $\\sqrt{x}$, choose an interval where $c=1$.'),
        hint: say('Hemen $\\sqrt{c}=\\frac{\\sqrt{a}+\\sqrt{b}}{2}$ da.', 'Aquí $\\sqrt{c}=\\frac{\\sqrt{a}+\\sqrt{b}}{2}$.', 'هنا $\\sqrt{c}=\\frac{\\sqrt{a}+\\sqrt{b}}{2}$.', 'Here $\\sqrt{c}=\\frac{\\sqrt{a}+\\sqrt{b}}{2}$.'),
        isSolved: (state) => state.fn === 'root' && single(state, 1)
    },
    {
        id: 124204,
        prompt: say('$x^3$ funtzioarekin, aukeratu $c$ bakarra erdiko puntuaren ezkerrean duen tarte bat.', 'Con $x^3$, elige un intervalo con un solo $c$, a la izquierda del punto medio.', 'مع $x^3$، اختر فترة فيها $c$ واحدة على يسار المنتصف.', 'With $x^3$, choose an interval with a single $c$, to the left of the midpoint.'),
        hint: say('Kurba $\\cap$ den tokian, $c$ puntua $a$ muturretik hurbilago dago.', 'Donde la curva es $\\cap$, $c$ queda más cerca de $a$.', 'حيث يكون المنحنى $\\cap$ تكون $c$ أقرب إلى $a$.', 'Where the curve is $\\cap$, $c$ is nearer $a$.'),
        isSolved: (state) => {
            const result = meanResult(state)
            return state.fn === 'cube' && result.cs.length === 1 && result.cs[0] < (result.a + result.b) / 2 - 1e-9
        }
    },
    {
        id: 124205,
        prompt: say('$x^2$ funtzioarekin, aukeratu 3 luzerako tarte bat, $c=\\frac{1}{2}$ duena.', 'Con $x^2$, elige un intervalo de longitud 3 con $c=\\frac{1}{2}$.', 'مع $x^2$، اختر فترة طولها 3 تكون فيها $c=\\frac{1}{2}$.', 'With $x^2$, choose an interval of length 3 with $c=\\frac{1}{2}$.'),
        hint: say('$a+b=1$ eta $b-a=3$.', '$a+b=1$ y $b-a=3$.', '$a+b=1$ و$b-a=3$.', '$a+b=1$ and $b-a=3$.'),
        isSolved: (state) => {
            const result = meanResult(state)
            return state.fn === 'square' && Math.abs(result.b - result.a - 3) < 1e-9 && single(state, 0.5)
        }
    }
]

/** A number as LaTeX: an integer or a fraction with denominator 2, 4, 8 or 16 */
export function numberLatex(value: number): string {
    const sign = value < 0 ? '-' : ''
    const abs = Math.abs(value)
    for (const den of [1, 2, 4, 8, 16]) {
        const top = Math.round(abs * den)
        if (Math.abs(top / den - abs) < 1e-9) return den === 1 ? `${sign}${top}` : `${sign}\\frac{${top}}{${den}}`
    }
    return String(value)
}

/** Endless practice: with x² every midpoint is a c; with √x, c = ((√a + √b)/2)² */
const meanMaker: LabChallengeMaker<MeanState> = (random) => {
    const fn = randomInt(random, 0, 3) < 3 ? 'square' : 'root'
    const setup = MEAN_SETUP[fn]
    const pairs: Array<[number, number]> = []
    for (let a = 0; a < setup.points.length; a++) for (let b = a + 1; b < setup.points.length; b++) pairs.push([a, b])
    const [a, b] = pairs[randomInt(random, 0, pairs.length - 1)]
    const c = meanResult({ fn, a, b }).cs[0]
    const target = `$c=${numberLatex(c)}$`
    const name = `$${setup.latex}$`
    return {
        prompt: say(`${name} funtzioarekin, aukeratu ${target} ematen duen tarte bat.`, `Con ${name}, elige un intervalo donde ${target}.`, `مع ${name}، اختر فترة تكون فيها ${target}.`, `With ${name}, choose an interval where ${target}.`),
        hint: say('Ebakitzailearen malda $m=\\frac{f(b)-f(a)}{b-a}$ da, eta $f\'(c)=m$.', 'La pendiente de la secante es $m=\\frac{f(b)-f(a)}{b-a}$, y $f\'(c)=m$.', 'ميل القاطع $m=\\frac{f(b)-f(a)}{b-a}$، و$f\'(c)=m$.', 'The slope of the secant is $m=\\frac{f(b)-f(a)}{b-a}$, and $f\'(c)=m$.'),
        isSolved: (state) => state.fn === fn && single(state, c),
        solution: { fn, a, b, prediction: null }
    }
}

export const meanExtra = freshFrom(initialMeanState, meanMaker)
