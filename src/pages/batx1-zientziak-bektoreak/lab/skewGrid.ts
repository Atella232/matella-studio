import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { fraction, toLatex, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L1 · Sare okerra (La cuadrícula torcida): two vectors u and v with whole
   coordinates draw a skew grid when they are a basis; a third vector w
   sits somewhere on it. Its coordinates in the basis are the numbers a
   and b with w = a·u + b·v (Cramer: a = (w × v)/(u × v), b = (u × w)/(u × v)).
   The learner first predicts the sign of a; then the path a·u, b·v is
   drawn. If u and v are parallel, the grid collapses onto a line: they
   are not a basis. Pure logic, whole numbers only.
   ========================================================================== */

export type Pair = [number, number]

export const SKEW_LIMITS = { vector: 3, target: 6 }

export interface SkewState {
    u: Pair
    v: Pair
    w: Pair
    prediction: Prediction | null
}

export const initialSkewState: SkewState = { u: [1, 1], v: [-1, 2], w: [1, 4], prediction: null }

const clamp = (value: number, limit: number) => Math.min(limit, Math.max(-limit, Math.round(value)))
const clampPair = ([x, y]: Pair, limit: number): Pair => [clamp(x, limit), clamp(y, limit)]
const samePair = (p: Pair, q: Pair) => p[0] === q[0] && p[1] === q[1]

export function setSkew(state: SkewState, patch: Partial<Omit<SkewState, 'prediction'>>): SkewState {
    const u = clampPair(patch.u ?? state.u, SKEW_LIMITS.vector)
    const v = clampPair(patch.v ?? state.v, SKEW_LIMITS.vector)
    const w = clampPair(patch.w ?? state.w, SKEW_LIMITS.target)
    const same = samePair(u, state.u) && samePair(v, state.v) && samePair(w, state.w)
    return { u, v, w, prediction: same ? state.prediction : null }
}

/** u × v: 0 when the two vectors are parallel (or one of them is zero) */
export const crossOf = ([a, b]: Pair, [c, d]: Pair) => a * d - b * c
export const isBasis = ({ u, v }: Pick<SkewState, 'u' | 'v'>) => crossOf(u, v) !== 0

/** The coordinates (a, b) of w in the basis (u, v), or null when u and v are not a basis */
export function skewCoordinates({ u, v, w }: Pick<SkewState, 'u' | 'v' | 'w'>): [FractionValue, FractionValue] | null {
    const det = crossOf(u, v)
    if (det === 0) return null
    return [fraction(crossOf(w, v), det), fraction(crossOf(u, w), det)]
}

const value = (f: FractionValue) => f.numerator / f.denominator

/** The sign of the first coordinate a: the prediction the learner makes */
export function skewPrediction(state: SkewState): Prediction | null {
    const coordinates = skewCoordinates(state)
    return coordinates === null ? null : compareTo(value(coordinates[0]), 0)
}

/** (x,y) in LaTeX */
export const pairLatex = ([x, y]: Pair) => `(${x},${y})`
/** (a,b)_B in LaTeX, with fractions */
export const coordinatesLatex = ([a, b]: [FractionValue, FractionValue]) => `(${toLatex(a)},${toLatex(b)})_B`

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const is = (f: FractionValue, n: number, d = 1) => f.numerator === n && f.denominator === d

export const skewChallenges: LabChallenge<SkewState>[] = [
    {
        id: 105101,
        prompt: say('$\\vec{u}=(1,1)$ eta $\\vec{v}=(-1,2)$ direla, jarri $\\vec{w}$ bektorea oinarri horretan $(3,-1)_B$ koordenatuak izan ditzan.', 'Con $\\vec{u}=(1,1)$ y $\\vec{v}=(-1,2)$, pon $\\vec{w}$ para que sus coordenadas en esa base sean $(3,-1)_B$.', 'مع $\\vec{u}=(1,1)$ و$\\vec{v}=(-1,2)$ ضع $\\vec{w}$ لتكون مركّبتاه في هذا الأساس $(3,-1)_B$.', 'With $\\vec{u}=(1,1)$ and $\\vec{v}=(-1,2)$, place $\\vec{w}$ so that its coordinates in that basis are $(3,-1)_B$.'),
        hint: say('$\\vec{w}=3\\vec{u}-\\vec{v}$: hiru urrats $\\vec{u}$ norabidean eta bat $\\vec{v}$ bektorearen kontra.', '$\\vec{w}=3\\vec{u}-\\vec{v}$: tres pasos de $\\vec{u}$ y uno contra $\\vec{v}$.', '$\\vec{w}=3\\vec{u}-\\vec{v}$: ثلاث خطوات من $\\vec{u}$ وخطوة عكس $\\vec{v}$.', '$\\vec{w}=3\\vec{u}-\\vec{v}$: three steps of $\\vec{u}$ and one against $\\vec{v}$.'),
        isSolved: (state) => samePair(state.u, [1, 1]) && samePair(state.v, [-1, 2]) && samePair(state.w, [4, 1])
    },
    {
        id: 105102,
        prompt: say('Egin $\\vec{u}$ eta $\\vec{v}$ bektoreek oinarririk ez osatzea, bat ere nulua izan gabe.', 'Haz que $\\vec{u}$ y $\\vec{v}$ no formen una base, sin que ninguno sea nulo.', 'اجعل $\\vec{u}$ و$\\vec{v}$ لا يكوّنان أساسًا دون أن يكون أحدهما معدومًا.', 'Make $\\vec{u}$ and $\\vec{v}$ not form a basis, without either of them being zero.'),
        hint: say('Paraleloak izan behar dute: koordenatu proportzionalak.', 'Tienen que ser paralelos: coordenadas proporcionales.', 'يجب أن يكونا متوازيين: مركّبات متناسبة.', 'They have to be parallel: proportional coordinates.'),
        isSolved: (state) => !isBasis(state) && !samePair(state.u, [0, 0]) && !samePair(state.v, [0, 0])
    },
    {
        id: 105103,
        prompt: say('$\\vec{w}=(0,5)$ eta $\\vec{u}=(2,1)$ direla, aukeratu $\\vec{v}$, $\\vec{w}=(1,2)_B$ izan dadin.', 'Con $\\vec{w}=(0,5)$ y $\\vec{u}=(2,1)$, elige $\\vec{v}$ para que $\\vec{w}=(1,2)_B$.', 'مع $\\vec{w}=(0,5)$ و$\\vec{u}=(2,1)$ اختر $\\vec{v}$ ليكون $\\vec{w}=(1,2)_B$.', 'With $\\vec{w}=(0,5)$ and $\\vec{u}=(2,1)$, choose $\\vec{v}$ so that $\\vec{w}=(1,2)_B$.'),
        hint: say('$2\\vec{v}=\\vec{w}-\\vec{u}$.', '$2\\vec{v}=\\vec{w}-\\vec{u}$.', '$2\\vec{v}=\\vec{w}-\\vec{u}$.', '$2\\vec{v}=\\vec{w}-\\vec{u}$.'),
        isSolved: (state) => samePair(state.u, [2, 1]) && samePair(state.w, [0, 5]) && samePair(state.v, [-1, 2])
    },
    {
        id: 105104,
        prompt: say('$\\vec{w}=(5,5)$ izanik, aukeratu oinarri bat non $\\vec{w}=(1,1)_B$ den, eta $\\vec{u}$ ez dadila $\\vec{w}$ bektorearen paraleloa.', 'Con $\\vec{w}=(5,5)$, elige una base en la que $\\vec{w}=(1,1)_B$, sin que $\\vec{u}$ sea paralelo a $\\vec{w}$.', 'مع $\\vec{w}=(5,5)$ اختر أساسًا يكون فيه $\\vec{w}=(1,1)_B$ دون أن يوازي $\\vec{u}$ المتجه $\\vec{w}$.', 'With $\\vec{w}=(5,5)$, choose a basis in which $\\vec{w}=(1,1)_B$, without $\\vec{u}$ being parallel to $\\vec{w}$.'),
        hint: say('$\\vec{u}+\\vec{v}$ bektoreak $(5,5)$ eman behar du.', '$\\vec{u}+\\vec{v}$ tiene que dar $(5,5)$.', 'يجب أن يعطي $\\vec{u}+\\vec{v}$ المتجه $(5,5)$.', '$\\vec{u}+\\vec{v}$ has to give $(5,5)$.'),
        isSolved: (state) => samePair(state.w, [5, 5]) && isBasis(state) && crossOf(state.u, state.w) !== 0 && samePair([state.u[0] + state.v[0], state.u[1] + state.v[1]], [5, 5])
    },
    {
        id: 105105,
        prompt: say('$\\vec{u}=(2,0)$ eta $\\vec{v}=(1,1)$ direla, jarri $\\vec{w}$, bere lehen koordenatua negatiboa eta bigarrena 2 izan daitezen.', 'Con $\\vec{u}=(2,0)$ y $\\vec{v}=(1,1)$, pon un $\\vec{w}$ cuya primera coordenada sea negativa y la segunda 2.', 'مع $\\vec{u}=(2,0)$ و$\\vec{v}=(1,1)$ ضع $\\vec{w}$ بحيث تكون مركّبته الأولى سالبة والثانية 2.', 'With $\\vec{u}=(2,0)$ and $\\vec{v}=(1,1)$, place a $\\vec{w}$ whose first coordinate is negative and the second one 2.'),
        hint: say('Bi urrats $\\vec{v}$ norabidean, eta gero atzera $\\vec{u}$ norabidean.', 'Dos pasos de $\\vec{v}$ y después hacia atrás en la dirección de $\\vec{u}$.', 'خطوتان من $\\vec{v}$ ثم إلى الخلف في اتجاه $\\vec{u}$.', 'Two steps of $\\vec{v}$ and then backwards along $\\vec{u}$.'),
        isSolved: (state) => {
            const coordinates = samePair(state.u, [2, 0]) && samePair(state.v, [1, 1]) ? skewCoordinates(state) : null
            return coordinates !== null && coordinates[0].numerator < 0 && is(coordinates[1], 2)
        }
    }
]

/** Endless practice: a basis and the coordinates w must have in it */
const skewMaker: LabChallengeMaker<SkewState> = (random) => {
    for (;;) {
        const u: Pair = [randomInt(random, -3, 3), randomInt(random, -3, 3)]
        const v: Pair = [randomInt(random, -3, 3), randomInt(random, -3, 3)]
        if (crossOf(u, v) === 0) continue
        const a = pick(random, [-2, -1, 1, 2, 3])
        const b = pick(random, [-2, -1, 1, 2])
        const w: Pair = [a * u[0] + b * v[0], a * u[1] + b * v[1]]
        if (Math.abs(w[0]) > SKEW_LIMITS.target || Math.abs(w[1]) > SKEW_LIMITS.target) continue
        const target = `(${a},${b})_B`
        const combination = `${a === 1 ? '' : a === -1 ? '-' : a}\\vec{u}${b === 1 ? '+' : b === -1 ? '-' : b > 0 ? `+${b}` : b}\\vec{v}`
        return {
            prompt: say(`$\\vec{u}=${pairLatex(u)}$ eta $\\vec{v}=${pairLatex(v)}$ direla, jarri $\\vec{w}$, oinarri horretan $${target}$ izan dadin.`, `Con $\\vec{u}=${pairLatex(u)}$ y $\\vec{v}=${pairLatex(v)}$, pon $\\vec{w}$ para que en esa base sea $${target}$.`, `مع $\\vec{u}=${pairLatex(u)}$ و$\\vec{v}=${pairLatex(v)}$ ضع $\\vec{w}$ ليكون في هذا الأساس $${target}$.`, `With $\\vec{u}=${pairLatex(u)}$ and $\\vec{v}=${pairLatex(v)}$, place $\\vec{w}$ so that in that basis it is $${target}$.`),
            hint: say(`$\\vec{w}=${combination}$: kalkulatu koordenatuz koordenatu.`, `$\\vec{w}=${combination}$: calcula coordenada a coordenada.`, `$\\vec{w}=${combination}$: احسب مركّبةً مركّبة.`, `$\\vec{w}=${combination}$: work it out coordinate by coordinate.`),
            isSolved: (state) => samePair(state.u, u) && samePair(state.v, v) && samePair(state.w, w),
            solution: { u, v, w, prediction: null }
        }
    }
}

export const skewExtra = freshFrom(initialSkewState, skewMaker)
