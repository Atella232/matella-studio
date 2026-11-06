import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { exact, numberLatex } from './numbers.ts'

/* ==========================================================================
   L3 · Área con signo: a curve that crosses the x-axis and two limits a
   and b (from −3 to 3, in half steps; a may be greater than b). Once the
   learner has guessed, the region between the curve and the axis is
   shaded blue above the axis and red below, and the readout gives the
   integral (with its sign) and the area (always positive). ▶ moves b
   from a to the right end. Each function opens on an interval of its
   own, and the prediction is about that interval: will the integral be
   negative, zero or positive? (x² − 2x on [0, 3] gives exactly 0.)
   ========================================================================== */

export type SignedFunction = 'dip' | 'line' | 'cubic' | 'well'

export const SIGNED_FUNCTIONS: SignedFunction[] = ['dip', 'line', 'cubic', 'well']

/** A limit is at x = t / 2 */
export const SIGNED_LIMITS = { t: { min: -6, max: 6 } } as const

interface SignedSetup {
    fn: (x: number) => number
    F: (x: number) => number
    latex: string
    /** Where f is 0, left to right */
    roots: number[]
    /** The interval the function opens on (and the prediction is about), in half units */
    preset: [number, number]
    view: [number, number]
}

export const SIGNED_SETUP: Record<SignedFunction, SignedSetup> = {
    dip: { fn: (x) => x * x - 2 * x, F: (x) => x ** 3 / 3 - x * x, latex: 'f(x)=x^2-2x', roots: [0, 2], preset: [0, 6], view: [-2, 4] },
    line: { fn: (x) => x - 1, F: (x) => x * x / 2 - x, latex: 'f(x)=x-1', roots: [1], preset: [0, 6], view: [-4, 3] },
    cubic: { fn: (x) => x ** 3 - 4 * x, F: (x) => x ** 4 / 4 - 2 * x * x, latex: 'f(x)=x^3-4x', roots: [-2, 0, 2], preset: [-2, 4], view: [-5, 5] },
    well: { fn: (x) => x * x - 4, F: (x) => x ** 3 / 3 - 4 * x, latex: 'f(x)=x^2-4', roots: [-2, 2], preset: [0, 6], view: [-5, 5] }
}

export interface SignedState {
    fn: SignedFunction
    /** a = ta / 2 */
    ta: number
    /** b = tb / 2 */
    tb: number
    prediction: Prediction | null
}

export const initialSignedState: SignedState = { fn: 'dip', ta: 0, tb: 6, prediction: null }

const clampT = (t: number) => Math.min(SIGNED_LIMITS.t.max, Math.max(SIGNED_LIMITS.t.min, Math.round(t)))

/** A new function opens on its own interval and asks for a new prediction; new limits do not */
export function setSigned(state: SignedState, patch: Partial<Omit<SignedState, 'prediction'>>): SignedState {
    const fn = patch.fn ?? state.fn
    if (fn !== state.fn) {
        const [ta, tb] = SIGNED_SETUP[fn].preset
        return { fn, ta: clampT(patch.ta ?? ta), tb: clampT(patch.tb ?? tb), prediction: null }
    }
    return { fn, ta: clampT(patch.ta ?? state.ta), tb: clampT(patch.tb ?? state.tb), prediction: state.prediction }
}

export const signedA = (state: SignedState) => state.ta / 2
export const signedB = (state: SignedState) => state.tb / 2

/** ∫ₐᵇ f(x) dx = F(b) − F(a) */
export const signedIntegral = (fn: SignedFunction, a: number, b: number) => exact(SIGNED_SETUP[fn].F(b) - SIGNED_SETUP[fn].F(a))

/** The area between the curve and the axis from a to b: the integral split at the roots, each part positive */
export function signedArea(fn: SignedFunction, a: number, b: number): number {
    const low = Math.min(a, b)
    const high = Math.max(a, b)
    const cuts = [low, ...SIGNED_SETUP[fn].roots.filter((root) => root > low && root < high), high]
    let total = 0
    for (let i = 0; i + 1 < cuts.length; i += 1) total += Math.abs(signedIntegral(fn, cuts[i], cuts[i + 1]))
    return exact(total)
}

/** The integral on the function's own interval is negative (<), zero (=) or positive (>) */
export function signedPrediction(state: SignedState): Prediction {
    const [ta, tb] = SIGNED_SETUP[state.fn].preset
    return compareTo(signedIntegral(state.fn, ta / 2, tb / 2), 0)
}

const withF = (fn: SignedFunction, goal: LocalizedText): LocalizedText => {
    const f = SIGNED_SETUP[fn].latex
    return say(`$${f}$ funtzioarekin, ${goal.eu}`, `Con $${f}$, ${goal.es}`, `مع $${f}$، ${goal.ar}`, `With $${f}$, ${goal.en}`)
}

const integralIs = (value: string) => `\\int_a^b f(x)\\,dx=${value}`

export const signedChallenges: LabChallenge<SignedState>[] = [
    {
        id: 112201,
        prompt: withF('dip', say(`$a=-1$ hartuta, lortu $${integralIs('0')}$.`, `empieza en $a=-1$ y consigue $${integralIs('0')}$.`, `ابدأ من $a=-1$ واحصل على $${integralIs('0')}$.`, `start at $a=-1$ and get $${integralIs('0')}$.`)),
        hint: say('Ardatzaren gaineko zatiak eta azpikoak berdin neurtu behar dute.', 'La parte de arriba y la de abajo tienen que medir lo mismo.', 'يجب أن يتساوى الجزء العلوي والسفلي.', 'The part above and the part below must measure the same.'),
        isSolved: (state) => state.fn === 'dip' && signedA(state) === -1 && state.tb !== state.ta && signedIntegral('dip', -1, signedB(state)) === 0
    },
    {
        id: 112202,
        prompt: withF('line', say('lortu 0 balio duen integrala eta 2 edo gehiagoko azalera.', 'consigue una integral que valga 0 y un área de 2 o más.', 'احصل على تكامل يساوي 0 ومساحة 2 أو أكثر.', 'get an integral equal to 0 and an area of 2 or more.')),
        hint: say('Bi triangeluek, ardatzaren gainean eta azpian, berdinak izan behar dute: aukeratu 1 zenbakiarekiko mugak simetrikoak.', 'Los dos triángulos, encima y debajo del eje, tienen que ser iguales: elige límites simétricos respecto de 1.', 'يجب أن يتساوى المثلثان فوق المحور وتحته: اختر حدّين متناظرين حول 1.', 'The two triangles, above and below the axis, must be equal: choose limits symmetric about 1.'),
        isSolved: (state) => state.fn === 'line' && signedIntegral('line', signedA(state), signedB(state)) === 0 && signedArea('line', signedA(state), signedB(state)) >= 2
    },
    {
        id: 112203,
        prompt: withF('cubic', say('lortu 0 balio duen integrala eta 8 balio duen azalera.', 'consigue una integral de 0 y un área de 8.', 'احصل على تكامل يساوي 0 ومساحة تساوي 8.', 'get an integral of 0 and an area of 8.')),
        hint: say('Kurba simetrikoa da jatorriarekiko: hartu ebaki-puntuak muga gisa.', 'La curva es simétrica respecto del origen: toma los cortes como límites.', 'المنحنى متناظر حول الأصل: خذ نقاط التقاطع حدودًا.', 'The curve is symmetric about the origin: take the crossings as limits.'),
        isSolved: (state) => state.fn === 'cubic' && signedIntegral('cubic', signedA(state), signedB(state)) === 0 && signedArea('cubic', signedA(state), signedB(state)) === 8
    },
    {
        id: 112204,
        prompt: withF('well', say('lortu ahalik eta integral negatiboena.', 'consigue la integral más negativa posible.', 'احصل على أصغر تكامل سالب ممكن.', 'get the most negative integral you can.')),
        hint: say('Hartu ardatzaren azpiko zati osoa, eta ezer ez gainekotik.', 'Toma toda la parte de debajo del eje y nada de la de arriba.', 'خذ كل الجزء الذي تحت المحور ولا شيء مما فوقه.', 'Take all of the part below the axis and none of the part above.'),
        isSolved: (state) => state.fn === 'well' && signedIntegral('well', signedA(state), signedB(state)) === exact(-32 / 3)
    },
    {
        id: 112205,
        prompt: withF('dip', say(`$a>b$ izanik, lortu $${integralIs('\\frac{4}{3}')}$.`, `con $a>b$, consigue $${integralIs('\\frac{4}{3}')}$.`, `مع $a>b$ احصل على $${integralIs('\\frac{4}{3}')}$.`, `with $a>b$, get $${integralIs('\\frac{4}{3}')}$.`)),
        hint: say('Mugak alderantzikatzean integralak zeinua aldatzen du.', 'Al invertir los límites, la integral cambia de signo.', 'عند قلب الحدّين يغيّر التكامل إشارته.', 'Swapping the limits changes the sign of the integral.'),
        isSolved: (state) => state.fn === 'dip' && state.ta > state.tb && signedIntegral('dip', signedA(state), signedB(state)) === exact(4 / 3)
    }
]

const from = (p: number) => say(`$a=${numberLatex(p)}$ hartuta, `, `empieza en $a=${numberLatex(p)}$ y `, `ابدأ من $a=${numberLatex(p)}$ و`, `start at $a=${numberLatex(p)}$ and `)
const joined = (first: LocalizedText, second: LocalizedText): LocalizedText => say(first.eu + second.eu, first.es + second.es, first.ar + second.ar, first.en + second.en)

/** Endless practice: from a given a, reach an integral or an area of a given value */
const signedMaker: LabChallengeMaker<SignedState> = (random) => {
    for (;;) {
        const fn = SIGNED_FUNCTIONS[randomInt(random, 0, SIGNED_FUNCTIONS.length - 1)]
        const ta = randomInt(random, SIGNED_LIMITS.t.min, SIGNED_LIMITS.t.max - 1)
        const tb = randomInt(random, ta + 1, SIGNED_LIMITS.t.max)
        const [a, b] = [ta / 2, tb / 2]
        const area = random() < 0.5
        const value = area ? signedArea(fn, a, b) : signedIntegral(fn, a, b)
        if (Math.abs(value) < 0.2) continue
        const target = numberLatex(value)
        const goal = area
            ? say(`lortu $${target}$ balio duen azalera.`, `consigue un área de $${target}$.`, `احصل على مساحة تساوي $${target}$.`, `get an area of $${target}$.`)
            : say(`lortu $${integralIs(target)}$.`, `consigue $${integralIs(target)}$.`, `احصل على $${integralIs(target)}$.`, `get $${integralIs(target)}$.`)
        return {
            prompt: withF(fn, joined(from(a), goal)),
            hint: area
                ? say('Azalerak zati guztiak positibo gisa batzen ditu.', 'El área suma todas las partes en positivo.', 'المساحة تجمع كل الأجزاء موجبة.', 'The area adds up all the parts as positive.')
                : say('Integralak ardatzaren azpiko zatia kendu egiten du.', 'La integral resta la parte de debajo del eje.', 'التكامل يطرح الجزء الذي تحت المحور.', 'The integral subtracts the part below the axis.'),
            isSolved: (state) => state.fn === fn && state.ta === ta && Math.abs((area ? signedArea(fn, signedA(state), signedB(state)) : signedIntegral(fn, signedA(state), signedB(state))) - value) < 1e-9,
            solution: { fn, ta, tb, prediction: null }
        }
    }
}

export const signedExtra = freshFrom(initialSignedState, signedMaker)
