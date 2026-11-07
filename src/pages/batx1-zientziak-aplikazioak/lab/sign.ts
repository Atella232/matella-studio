import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'
import { freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L1 · El semáforo de f′: a probe walks along f (x from −3 to 3, in half
   steps) and paints, under the graph, a strip with the sign of f′: green
   where f′ > 0 (f goes up), red where f′ < 0 (f goes down), amber dots
   where f′ = 0 and a gap where f does not exist. ▶ walks the probe from
   the left end and paints the strip as it goes. Before the strip is shown
   the learner predicts whether the marked point p, where f′(p) = 0, is a
   maximum, a minimum or neither (one function has f′ = 0 without a
   change of sign, as x³ does at 0).
   ========================================================================== */

export type SignFunction = 'cubic' | 'flat' | 'quartic' | 'rational' | 'exp'

export const SIGN_FUNCTIONS: SignFunction[] = ['cubic', 'flat', 'quartic', 'rational', 'exp']

/** The probe is at x = t / 2 */
export const SIGN_LIMITS = { t: { min: -6, max: 6 } } as const

export type PointKind = 'maximum' | 'minimum' | 'neither'

interface SignSetup {
    fn: (x: number) => number
    derivative: (x: number) => number
    latex: string
    derivativeLatex: string
    /** Where f′ is 0, left to right */
    zeros: number[]
    /** Where f does not exist */
    holes: number[]
    /** The marked point of the prediction (one of the zeros) */
    p: number
    /** The y range of the plane, in whole units */
    view: [number, number]
}

export const SIGN_SETUP: Record<SignFunction, SignSetup> = {
    cubic: { fn: (x) => x ** 3 / 3 - x, derivative: (x) => x * x - 1, latex: 'f(x)=\\frac{x^3}{3}-x', derivativeLatex: "f'(x)=x^2-1", zeros: [-1, 1], holes: [], p: -1, view: [-3, 3] },
    flat: { fn: (x) => (x - 1) ** 3 / 3 + 1, derivative: (x) => (x - 1) ** 2, latex: 'f(x)=\\frac{(x-1)^3}{3}+1', derivativeLatex: "f'(x)=(x-1)^2", zeros: [1], holes: [], p: 1, view: [-3, 4] },
    quartic: { fn: (x) => x ** 4 / 4 - x * x / 2, derivative: (x) => x ** 3 - x, latex: 'f(x)=\\frac{x^4}{4}-\\frac{x^2}{2}', derivativeLatex: "f'(x)=x^3-x", zeros: [-1, 0, 1], holes: [], p: 0, view: [-1, 3] },
    rational: { fn: (x) => x + 1 / x, derivative: (x) => 1 - 1 / (x * x), latex: 'f(x)=x+\\frac{1}{x}', derivativeLatex: "f'(x)=1-\\frac{1}{x^2}", zeros: [-1, 1], holes: [0], p: 1, view: [-4, 4] },
    exp: { fn: (x) => x * Math.exp(x), derivative: (x) => (1 + x) * Math.exp(x), latex: 'f(x)=x\\,e^x', derivativeLatex: "f'(x)=(1+x)\\,e^x", zeros: [-1], holes: [], p: -1, view: [-1, 3] }
}

export interface SignState {
    fn: SignFunction
    /** x = t / 2 */
    t: number
    prediction: Prediction | null
}

export const initialSignState: SignState = { fn: 'cubic', t: -5, prediction: null }

/** Only a new function asks for a new prediction */
export function setSign(state: SignState, patch: Partial<Omit<SignState, 'prediction'>>): SignState {
    const fn = patch.fn ?? state.fn
    const t = Math.min(SIGN_LIMITS.t.max, Math.max(SIGN_LIMITS.t.min, Math.round(patch.t ?? state.t)))
    return { fn, t, prediction: fn === state.fn ? state.prediction : null }
}

export const signX = (state: SignState) => state.t / 2

/** f′ at x, with the rounding the readout shows; null where f does not exist */
export function signSlope(fn: SignFunction, x: number): number | null {
    const setup = SIGN_SETUP[fn]
    if (setup.holes.some((hole) => Math.abs(hole - x) < 1e-9)) return null
    return Math.round(setup.derivative(x) * 1e9) / 1e9
}

/** Whether f′ changes sign at a zero: a maximum (+ to −), a minimum (− to +) or neither */
export function pointKind(fn: SignFunction, x: number): PointKind {
    const { derivative } = SIGN_SETUP[fn]
    const left = derivative(x - 1e-3)
    const right = derivative(x + 1e-3)
    if (left > 0 && right < 0) return 'maximum'
    if (left < 0 && right > 0) return 'minimum'
    return 'neither'
}

/** The prediction: the marked point is a minimum (<), neither (=) or a maximum (>) */
export function signPrediction(state: SignState): Prediction {
    const kind = pointKind(state.fn, SIGN_SETUP[state.fn].p)
    return kind === 'maximum' ? '>' : kind === 'minimum' ? '<' : '='
}

/** The pieces of the strip between the zeros and the holes: from, to and the sign of f′ there */
export function signPieces(fn: SignFunction, from = -3, to = 3): Array<{ from: number; to: number; sign: 1 | -1 }> {
    const { zeros, holes, derivative } = SIGN_SETUP[fn]
    const cuts = [from, ...[...zeros, ...holes].filter((x) => x > from && x < to).sort((p, q) => p - q), to]
    const pieces: Array<{ from: number; to: number; sign: 1 | -1 }> = []
    for (let index = 0; index + 1 < cuts.length; index += 1) {
        const middle = (cuts[index] + cuts[index + 1]) / 2
        pieces.push({ from: cuts[index], to: cuts[index + 1], sign: derivative(middle) > 0 ? 1 : -1 })
    }
    return pieces
}

export const signChallenges: LabChallenge<SignState>[] = [
    {
        id: 111101,
        prompt: say('$f_1$ funtzioan, eraman zunda maximo erlatibora: semaforoa berdetik gorrira pasatzen den tokira.', 'En $f_1$, lleva la sonda al máximo relativo: donde el semáforo pasa de verde a rojo.', 'في $f_1$ انقل المسبار إلى القيمة العظمى المحلية: حيث تنتقل الإشارة من الأخضر إلى الأحمر.', 'In $f_1$, take the probe to the local maximum: where the light turns from green to red.'),
        hint: same("$f'(x)=x^2-1=0$"),
        isSolved: (state) => state.fn === 'cubic' && state.t === -2
    },
    {
        id: 111102,
        prompt: say('$f_2$ funtzioan, eraman zunda $f\'=0$ den puntura. Aldatzen al da kolorea?', 'En $f_2$, lleva la sonda al punto donde $f\'=0$. ¿Cambia el color?', 'في $f_2$ انقل المسبار إلى النقطة التي فيها $f\'=0$. هل يتغير اللون؟', 'In $f_2$, take the probe to the point where $f\'=0$. Does the colour change?'),
        hint: same("$f'(x)=(x-1)^2$"),
        isSolved: (state) => state.fn === 'flat' && state.t === 2
    },
    {
        id: 111103,
        prompt: say('$f_3$ funtzioan, eraman zunda $x>0$ duen minimo batera.', 'En $f_3$, lleva la sonda a un mínimo con $x>0$.', 'في $f_3$ انقل المسبار إلى قيمة صغرى فيها $x>0$.', 'In $f_3$, take the probe to a minimum with $x>0$.'),
        hint: same("$f'(x)=x(x-1)(x+1)$"),
        isSolved: (state) => state.fn === 'quartic' && state.t === 2
    },
    {
        id: 111104,
        prompt: say('$f_4$ funtzioan, eraman zunda $x<0$ eta beherakorra den puntu batera.', 'En $f_4$, lleva la sonda a un punto con $x<0$ donde $f$ decrece.', 'في $f_4$ انقل المسبار إلى نقطة فيها $x<0$ وتتناقص فيها $f$.', 'In $f_4$, take the probe to a point with $x<0$ where $f$ decreases.'),
        hint: say('0 puntua ez dago izate-eremuan: semaforoak hutsune bat du han.', 'El 0 no está en el dominio: el semáforo tiene un hueco allí.', 'العدد 0 ليس في المجال: في الإشارة فراغ هناك.', '0 is not in the domain: the light has a gap there.'),
        isSolved: (state) => state.fn === 'rational' && state.t === -1
    },
    {
        id: 111105,
        prompt: say('$f_5$ funtzioan, eraman zunda minimora.', 'En $f_5$, lleva la sonda al mínimo.', 'في $f_5$ انقل المسبار إلى القيمة الصغرى.', 'In $f_5$, take the probe to the minimum.'),
        hint: say('$e^x$ ez da inoiz anulatzen.', '$e^x$ nunca se anula.', '$e^x$ لا تنعدم أبدًا.', '$e^x$ is never zero.'),
        isSolved: (state) => state.fn === 'exp' && state.t === -2
    }
]

function same(value: string) {
    return say(value, value, value, value)
}

export const SIGN_NAMES: Record<SignFunction, string> = { cubic: 'f_1', flat: 'f_2', quartic: 'f_3', rational: 'f_4', exp: 'f_5' }

/** Endless practice: a point where f increases, decreases, or a maximum or a minimum */
const signMaker: LabChallengeMaker<SignState> = (random) => {
    for (;;) {
        const challenge = signChallenge(random)
        if (challenge) return challenge
    }
}

function signChallenge(random: () => number): ReturnType<LabChallengeMaker<SignState>> | null {
    const fn = SIGN_FUNCTIONS[randomInt(random, 0, SIGN_FUNCTIONS.length - 1)]
    const name = `$${SIGN_NAMES[fn]}$`
    const extremes = SIGN_SETUP[fn].zeros.filter((x) => pointKind(fn, x) !== 'neither')
    if (random() < 0.4 && extremes.length) {
        const x = extremes[randomInt(random, 0, extremes.length - 1)]
        const kind = pointKind(fn, x)
        const others = extremes.filter((other) => other !== x && pointKind(fn, other) === kind)
        // Two extremes of the same kind: say on which side
        const side = others.length ? (x > 0 ? say(' $x>0$ duen', ' con $x>0$', ' فيها $x>0$', ' with $x>0$') : say(' $x<0$ duen', ' con $x<0$', ' فيها $x<0$', ' with $x<0$')) : say('', '', '', '')
        const word = kind === 'maximum' ? say('maximo', 'máximo', 'قيمة عظمى', 'maximum') : say('minimo', 'mínimo', 'قيمة صغرى', 'minimum')
        return {
            prompt: say(`${name} funtzioan, eraman zunda${side.eu} ${word.eu} batera.`, `En ${name}, lleva la sonda a un ${word.es}${side.es}.`, `في ${name} انقل المسبار إلى ${word.ar}${side.ar}.`, `In ${name}, take the probe to a ${word.en}${side.en}.`),
            hint: say('Begiratu semaforoari: kolorea aldatzen den tokian.', 'Mira el semáforo: donde cambia el color.', 'انظر إلى الإشارة: حيث يتغير اللون.', 'Look at the light: where the colour changes.'),
            isSolved: (state) => state.fn === fn && Math.abs(signX(state) - x) < 1e-9,
            solution: { fn, t: x * 2, prediction: null }
        }
    }
    const up = random() < 0.5
    const points: number[] = []
    for (let t = SIGN_LIMITS.t.min; t <= SIGN_LIMITS.t.max; t += 1) {
        const slope = signSlope(fn, t / 2)
        if (slope !== null && (up ? slope > 0 : slope < 0)) points.push(t)
    }
    // f₂ never decreases: that one is not asked
    if (!points.length) return null
    const t = points[randomInt(random, 0, points.length - 1)]
    return {
        prompt: up
            ? say(`${name} funtzioan, eraman zunda gorakorra den puntu batera (berdea).`, `En ${name}, lleva la sonda a un punto donde crece (verde).`, `في ${name} انقل المسبار إلى نقطة تتزايد فيها (أخضر).`, `In ${name}, take the probe to a point where it increases (green).`)
            : say(`${name} funtzioan, eraman zunda beherakorra den puntu batera (gorria).`, `En ${name}, lleva la sonda a un punto donde decrece (rojo).`, `في ${name} انقل المسبار إلى نقطة تتناقص فيها (أحمر).`, `In ${name}, take the probe to a point where it decreases (red).`),
        hint: say('$f\'$ deribatuaren zeinua: $+$ igotzen da, $-$ jaisten da.', 'El signo de $f\'$: $+$ sube, $-$ baja.', 'إشارة $f\'$: $+$ تصعد و$-$ تنزل.', 'The sign of $f\'$: $+$ goes up, $-$ goes down.'),
        isSolved: (state) => {
            const slope = signSlope(state.fn, signX(state))
            return state.fn === fn && slope !== null && (up ? slope > 0 : slope < 0)
        },
        solution: { fn, t, prediction: null }
    }
}

export const signExtra = freshFrom(initialSignState, signMaker)
