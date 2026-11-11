import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L4 · Alderantzizkoaren ispilua (El espejo de la inversa): a function f
   and its inverse, mirror images in the line y = x, with the tangent at
   P = (a, f(a)) and its reflection at Q = (f(a), a). The slopes are m and
   1/m; where f′(a) = 0 the mirrored tangent is vertical. The learner
   steps a along a list; before drawing, the learner predicts whether the
   slope of the inverse at Q is smaller than (<), equal to (=) or larger
   than (>) the slope m of f at the starting point.
   ========================================================================== */

export type MirrorFunction = 'exp' | 'cube' | 'square' | 'cubic'

export const MIRROR_FUNCTIONS: MirrorFunction[] = ['exp', 'cube', 'square', 'cubic']

interface MirrorSetup {
    f: (x: number) => number
    inverse: (y: number) => number
    derivative: (x: number) => number
    latex: string
    inverseLatex: string
    /** The values of a the learner steps through, and the starting one */
    points: number[]
    start: number
    /** Where f is drawn (its inverse is drawn over the mirrored range) */
    domain: [number, number]
}

/** The inverse of x³ + x, increasing everywhere, by Newton's method */
function inverseCubic(y: number) {
    let x = Math.cbrt(y)
    for (let step = 0; step < 30; step++) x -= (x ** 3 + x - y) / (3 * x * x + 1)
    return x
}

export const MIRROR_SETUP: Record<MirrorFunction, MirrorSetup> = {
    exp: { f: Math.exp, inverse: Math.log, derivative: Math.exp, latex: 'e^x', inverseLatex: '\\ln x', points: [-2, -1, 0, 1], start: 1, domain: [-4, 1.6] },
    cube: { f: (x) => x ** 3, inverse: Math.cbrt, derivative: (x) => 3 * x * x, latex: 'x^3', inverseLatex: '\\sqrt[3]{x}', points: [-1, -0.5, 0, 0.5, 1, 1.5], start: 4, domain: [-1.6, 1.6] },
    square: { f: (x) => x * x, inverse: Math.sqrt, derivative: (x) => 2 * x, latex: 'x^2,\\ x\\ge 0', inverseLatex: '\\sqrt{x}', points: [0, 0.5, 1, 1.5, 2], start: 1, domain: [0, 2.1] },
    cubic: { f: (x) => x ** 3 + x, inverse: inverseCubic, derivative: (x) => 3 * x * x + 1, latex: 'x^3+x', inverseLatex: 'f^{-1}(x)', points: [-1, -0.5, 0, 0.5, 1], start: 3, domain: [-1.4, 1.4] }
}

export interface MirrorState {
    fn: MirrorFunction
    /** The index of a in the list of the function */
    k: number
    prediction: Prediction | null
}

export const initialMirrorState: MirrorState = { fn: 'exp', k: MIRROR_SETUP.exp.start, prediction: null }

/** A new function starts at its own point and asks for a new prediction */
export function setMirror(state: MirrorState, patch: Partial<Omit<MirrorState, 'prediction'>>): MirrorState {
    const fn = patch.fn ?? state.fn
    if (fn !== state.fn) return { fn, k: MIRROR_SETUP[fn].start, prediction: null }
    const last = MIRROR_SETUP[fn].points.length - 1
    return { fn, k: Math.min(last, Math.max(0, Math.round(patch.k ?? state.k))), prediction: state.prediction }
}

export const mirrorA = (state: Pick<MirrorState, 'fn' | 'k'>) => MIRROR_SETUP[state.fn].points[state.k]

/** The slope m of f at a and the slope of the inverse at f(a) (Infinity when m = 0) */
export function mirrorSlopes(state: Pick<MirrorState, 'fn' | 'k'>): { m: number; inverse: number } {
    const m = MIRROR_SETUP[state.fn].derivative(mirrorA(state))
    return { m, inverse: Math.abs(m) < 1e-12 ? Infinity : 1 / m }
}

/** At the starting point: is the slope of the inverse smaller than, equal to or larger than m? */
export function mirrorPrediction(state: Pick<MirrorState, 'fn'>): Prediction {
    const { m, inverse } = mirrorSlopes({ fn: state.fn, k: MIRROR_SETUP[state.fn].start })
    return compareTo(inverse, m)
}

const at = (fn: MirrorFunction, values: number[]) => (state: MirrorState) => state.fn === fn && values.some((value) => Math.abs(mirrorA(state) - value) < 1e-9)

export const mirrorChallenges: LabChallenge<MirrorState>[] = [
    {
        id: 123351,
        prompt: say('$e^x$ funtzioarekin, aurkitu bi maldak berdinak diren puntua.', 'Con $e^x$, encuentra el punto donde las dos pendientes son iguales.', 'مع $e^x$، جد النقطة التي يتساوى فيها الميلان.', 'With $e^x$, find the point where the two slopes are equal.'),
        hint: say('$m=\\frac{1}{m}$ bada, $m=1$.', 'Si $m=\\frac{1}{m}$, $m=1$.', 'إذا كان $m=\\frac{1}{m}$ فإن $m=1$.', 'If $m=\\frac{1}{m}$, $m=1$.'),
        isSolved: at('exp', [0])
    },
    {
        id: 123352,
        prompt: say('$x^3$ funtzioarekin, aurkitu alderantzizkoak zuzen ukitzaile bertikala duen puntua.', 'Con $x^3$, encuentra el punto donde la inversa tiene tangente vertical.', 'مع $x^3$، جد النقطة التي يكون فيها مماس الدالة العكسية عموديًّا.', 'With $x^3$, find the point where the inverse has a vertical tangent.'),
        hint: say('Han $f\'(a)=0$ da.', 'Allí $f\'(a)=0$.', 'هناك $f\'(a)=0$.', 'There $f\'(a)=0$.'),
        isSolved: at('cube', [0])
    },
    {
        id: 123353,
        prompt: say('$x^3+x$ funtzioarekin, aurkitu alderantzizkoak $\\frac{1}{4}$ malda duen puntu bat.', 'Con $x^3+x$, encuentra un punto donde la inversa tenga pendiente $\\frac{1}{4}$.', 'مع $x^3+x$، جد نقطة يكون فيها ميل الدالة العكسية $\\frac{1}{4}$.', 'With $x^3+x$, find a point where the inverse has slope $\\frac{1}{4}$.'),
        hint: same2('$3a^2+1=4$'),
        isSolved: at('cubic', [-1, 1])
    },
    {
        id: 123354,
        prompt: say('$x^2$ funtzioarekin, aurkitu $\\sqrt{x}$ alderantzizkoak $\\frac{1}{2}$ malda duen puntua.', 'Con $x^2$, encuentra el punto donde la inversa $\\sqrt{x}$ tiene pendiente $\\frac{1}{2}$.', 'مع $x^2$، جد النقطة التي يكون فيها ميل الدالة العكسية $\\sqrt{x}$ مساويًا $\\frac{1}{2}$.', 'With $x^2$, find the point where the inverse $\\sqrt{x}$ has slope $\\frac{1}{2}$.'),
        hint: same2('$\\frac{1}{2a}=\\frac{1}{2}$'),
        isSolved: at('square', [1])
    },
    {
        id: 123355,
        prompt: say('$x^3$ funtzioarekin, aurkitu alderantzizkoak $\\frac{4}{3}$ malda duen puntu bat.', 'Con $x^3$, encuentra un punto donde la inversa tenga pendiente $\\frac{4}{3}$.', 'مع $x^3$، جد نقطة يكون فيها ميل الدالة العكسية $\\frac{4}{3}$.', 'With $x^3$, find a point where the inverse has slope $\\frac{4}{3}$.'),
        hint: same2('$\\frac{1}{3a^2}=\\frac{4}{3}$'),
        isSolved: at('cube', [-0.5, 0.5])
    }
]

function same2(text: string) {
    return say(text, text, text, text)
}

/** The slope of the inverse in LaTeX when it is a simple fraction (the exponential is left out) */
function inverseLatex(fn: MirrorFunction, a: number): string | null {
    const m = MIRROR_SETUP[fn].derivative(a)
    if (fn === 'exp' || Math.abs(m) < 1e-12) return null
    // m is a multiple of 1/4 here
    const p = 4
    const q = Math.round(m * 4)
    const gcd = (x: number, y: number): number => (y === 0 ? Math.abs(x) : gcd(y, x % y))
    const g = gcd(p, q)
    const [num, den] = [p / g, q / g]
    return den === 1 ? String(num) : `\\frac{${num}}{${den}}`
}

const NAMES: Record<MirrorFunction, string> = { exp: 'e^x', cube: 'x^3', square: 'x^2', cubic: 'x^3+x' }

/** Endless practice: find a point where the inverse has a given slope */
const mirrorMaker: LabChallengeMaker<MirrorState> = (random) => {
    for (;;) {
        const fn = (['cube', 'square', 'cubic'] as const)[randomInt(random, 0, 2)]
        const setup = MIRROR_SETUP[fn]
        const k = randomInt(random, 0, setup.points.length - 1)
        const a = setup.points[k]
        const latex = inverseLatex(fn, a)
        if (latex === null) continue
        const slope = 1 / setup.derivative(a)
        const values = setup.points.filter((value) => Math.abs(1 / setup.derivative(value) - slope) < 1e-9)
        const f = `$${NAMES[fn]}$`
        const m = `$${latex}$`
        return {
            prompt: say(`${f} funtzioarekin, aurkitu alderantzizkoak ${m} malda duen puntu bat.`, `Con ${f}, encuentra un punto donde la inversa tenga pendiente ${m}.`, `مع ${f}، جد نقطة يكون فيها ميل الدالة العكسية ${m}.`, `With ${f}, find a point where the inverse has slope ${m}.`),
            hint: say('Alderantzizkoaren malda $\\frac{1}{f\'(a)}$ da.', 'La pendiente de la inversa es $\\frac{1}{f\'(a)}$.', 'ميل الدالة العكسية $\\frac{1}{f\'(a)}$.', 'The slope of the inverse is $\\frac{1}{f\'(a)}$.'),
            isSolved: at(fn, values),
            solution: { fn, k, prediction: null }
        }
    }
}

export const mirrorExtra = freshFrom(initialMirrorState, mirrorMaker)
