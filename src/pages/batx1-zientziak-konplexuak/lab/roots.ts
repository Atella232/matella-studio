import { pick } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { say } from '../text.ts'
import { polarPoint, type Complex } from './complex.ts'

/* ==========================================================================
   L3 · Erroek poligono bat osatzen dute (Las raíces forman un polígono):
   the learner chooses w by its modulus and its argument, and n. Before
   the n n-th roots are drawn, the learner predicts how many fall inside
   the first quadrant (none, one, two or more); then the tool draws them on
   a circle, as the vertices of a regular polygon, and ▶ makes them appear
   one by one, each 360°/n after the one before. Pure logic.
   ========================================================================== */

export const ROOT_MODULI = [1, 8, 16, 27, 64]
export const ROOT_LIMITS = { n: { min: 2, max: 6 }, theta: { min: 0, max: 330, step: 30 } }

export interface RootsState {
    n: number
    /** Index in ROOT_MODULI */
    m: number
    /** The argument of w, in degrees */
    theta: number
    prediction: Prediction | null
}

export const initialRootsState: RootsState = { n: 3, m: 0, theta: 90, prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))
const snap = (value: number) => clamp(Math.round(value / ROOT_LIMITS.theta.step) * ROOT_LIMITS.theta.step, ROOT_LIMITS.theta.min, ROOT_LIMITS.theta.max)

export function setRoots(state: RootsState, patch: Partial<Omit<RootsState, 'prediction'>>): RootsState {
    const next = { n: clamp(patch.n ?? state.n, ROOT_LIMITS.n.min, ROOT_LIMITS.n.max), m: clamp(patch.m ?? state.m, 0, ROOT_MODULI.length - 1), theta: snap(patch.theta ?? state.theta) }
    const unchanged = next.n === state.n && next.m === state.m && next.theta === state.theta
    return { ...next, prediction: unchanged ? state.prediction : null }
}

export const radiusOf = (state: Pick<RootsState, 'm'>) => ROOT_MODULI[state.m]
/** The modulus of the roots: the n-th root of the modulus of w */
export const rootModulus = (state: Pick<RootsState, 'm' | 'n'>) => {
    const value = radiusOf(state) ** (1 / state.n)
    return Math.abs(value - Math.round(value)) < 1e-9 ? Math.round(value) : value
}
/** The arguments of the n roots, k = 0, 1, …, n − 1 */
export const rootArguments = ({ n, theta }: Pick<RootsState, 'n' | 'theta'>) => Array.from({ length: n }, (_, k) => (theta + 360 * k) / n)
export const rootPoints = (state: Pick<RootsState, 'm' | 'n' | 'theta'>): Complex[] => rootArguments(state).map((angle) => polarPoint(rootModulus(state), angle))
/** The roots strictly inside the first quadrant (one on an axis does not count) */
export const firstQuadrantCount = (state: Pick<RootsState, 'n' | 'theta'>) => rootArguments(state).filter((angle) => angle > 1e-9 && angle < 90 - 1e-9).length
/** None (<), one (=) or two or more (>) */
export const rootsPrediction = (state: RootsState): Prediction => {
    const count = firstQuadrantCount(state)
    return count === 0 ? '<' : count === 1 ? '=' : '>'
}

const hasRoot = (state: RootsState, r: number, angle: number) => Math.abs(rootModulus(state) - r) < 1e-9 && rootArguments(state).some((value) => Math.abs(value - angle) < 1e-9)

export const rootsChallenges: LabChallenge<RootsState>[] = [
    { id: 104301, prompt: say('Lortu erroek karratu bat osatzea.', 'Haz que las raíces formen un cuadrado.', 'اجعل الجذور تشكّل مربعًا.', 'Make the roots form a square.'), hint: say('Karratu batek lau erpin ditu.', 'Un cuadrado tiene cuatro vértices.', 'للمربع أربعة رؤوس.', 'A square has four vertices.'), isSolved: (state) => state.n === 4 },
    { id: 104302, prompt: say('Aurkitu 8 zenbakiaren erro kubikoak.', 'Halla las raíces cúbicas de 8.', 'أوجد الجذور التكعيبية للعدد 8.', 'Find the cube roots of 8.'), hint: say('8 zenbakiaren argumentua 0° da.', 'El argumento de 8 es 0°.', 'عمدة العدد 8 هي 0°.', 'The argument of 8 is 0°.'), isSolved: (state) => state.n === 3 && radiusOf(state) === 8 && state.theta === 0 },
    { id: 104303, prompt: say('Lortu erroetako bat $i$ izatea.', 'Consigue que una de las raíces sea $i$.', 'اجعل أحد الجذور يساوي $i$.', 'Make one of the roots be $i$.'), hint: say('$i=1_{90°}$: erroen moduluak 1 izan behar du.', '$i=1_{90°}$: el módulo de las raíces tiene que ser 1.', '$i=1_{90°}$: يجب أن تكون طويلة الجذور 1.', '$i=1_{90°}$: the modulus of the roots has to be 1.'), isSolved: (state) => hasRoot(state, 1, 90) },
    { id: 104304, prompt: say('Marraztu 64 zenbakiaren erro seigarrenen hexagonoa.', 'Dibuja el hexágono de las raíces sextas de 64.', 'ارسم سداسي الجذور السادسة للعدد 64.', 'Draw the hexagon of the sixth roots of 64.'), hint: say('Sei erro, modulua $\\sqrt[6]{64}=2$ dutela.', 'Seis raíces, de módulo $\\sqrt[6]{64}=2$.', 'ستة جذور طويلتها $\\sqrt[6]{64}=2$.', 'Six roots, with modulus $\\sqrt[6]{64}=2$.'), isSolved: (state) => state.n === 6 && radiusOf(state) === 64 && state.theta === 0 },
    { id: 104305, prompt: say('Lortu lehen erroak, $k=0$ denean, 45° argumentua izatea.', 'Consigue que la primera raíz, con $k=0$, tenga argumento 45°.', 'اجعل عمدة الجذر الأول، مع $k=0$، تساوي 45°.', 'Make the first root, with $k=0$, have argument 45°.'), hint: say('Lehen erroaren argumentua $\\frac{\\theta}{n}$ da.', 'El argumento de la primera raíz es $\\frac{\\theta}{n}$.', 'عمدة الجذر الأول هي $\\frac{\\theta}{n}$.', 'The argument of the first root is $\\frac{\\theta}{n}$.'), isSolved: (state) => Math.abs(state.theta / state.n - 45) < 1e-9 }
]

const ns = Array.from({ length: ROOT_LIMITS.n.max - ROOT_LIMITS.n.min + 1 }, (_, index) => ROOT_LIMITS.n.min + index)
const thetas = Array.from({ length: ROOT_LIMITS.theta.max / ROOT_LIMITS.theta.step + 1 }, (_, index) => index * ROOT_LIMITS.theta.step)

/** Endless practice: make one of the roots a given number (a whole modulus and a whole argument) */
const rootsMaker: LabChallengeMaker<RootsState> = (random) => {
    for (;;) {
        const state: RootsState = { n: pick(random, ns), m: pick(random, ROOT_MODULI.map((_, index) => index)), theta: pick(random, thetas), prediction: null }
        const r = rootModulus(state)
        const angle = pick(random, rootArguments(state))
        if (!Number.isInteger(r) || !Number.isInteger(angle)) continue
        return {
            prompt: say(`Lortu erroetako bat $${r}_{${angle}°}$ izatea.`, `Consigue que una de las raíces sea $${r}_{${angle}°}$.`, `اجعل أحد الجذور يساوي $${r}_{${angle}°}$.`, `Make one of the roots be $${r}_{${angle}°}$.`),
            hint: say(`Erroen moduluak ${r} izan behar du: $|w|=${r}^n$.`, `El módulo de las raíces tiene que ser ${r}: $|w|=${r}^n$.`, `يجب أن تكون طويلة الجذور ${r}: $|w|=${r}^n$.`, `The modulus of the roots has to be ${r}: $|w|=${r}^n$.`),
            isSolved: (current) => hasRoot(current, r, angle),
            solution: state
        }
    }
}

export const rootsExtra = freshFrom(initialRootsState, rootsMaker)
