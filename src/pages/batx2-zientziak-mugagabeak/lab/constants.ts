import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L3 · Dos constantes: f″ is given, so f(x) = F₀(x) + k₁x + k₂. The learner
   moves k₁ (which tilts the curve) and k₂ (which lifts it) until the graph
   goes through the point P with the slope m that the problem asks for:
   the red stroke through P. Before the numbers appear, a guess: will k₁
   be negative, zero or positive? (k₁ = m − F₀′(x₀)). ▶ runs k₂ through
   the family, every curve with the same slope at x₀. Pure logic,
   exported for 2.º Sociales; the drawing is in Bach2IndefiniteTools.
   ========================================================================== */

export interface ConstantsBase {
    /** f″ as LaTeX */
    second: string
    /** F₀, a function whose second derivative is f″ (no constants) */
    F0: (x: number) => number
    dF0: (x: number) => number
    /** F₀ as LaTeX, to write f(x) = F₀ + k₁x + k₂ */
    latex: string
}

export const CONSTANTS_BASES: ConstantsBase[] = [
    { second: '6x-2', F0: (x) => x ** 3 - x * x, dF0: (x) => 3 * x * x - 2 * x, latex: 'x^3-x^2' },
    { second: '2', F0: (x) => x * x, dF0: (x) => 2 * x, latex: 'x^2' },
    { second: '-2', F0: (x) => -x * x, dF0: (x) => -2 * x, latex: '-x^2' },
    { second: '6x', F0: (x) => x ** 3, dF0: (x) => 3 * x * x, latex: 'x^3' },
    { second: '6x-6', F0: (x) => x ** 3 - 3 * x * x, dF0: (x) => 3 * x * x - 6 * x, latex: 'x^3-3x^2' }
]

/** The problem: the base, the abscissa of P and the constants that solve it */
export interface ConstantsSpec {
    base: number
    x0: number
    k1: number
    k2: number
}

export const CONSTANTS_LIMITS = { k: { min: -6, max: 6 } } as const

export const CONSTANTS_CASES: ConstantsSpec[] = [
    { base: 0, x0: 1, k1: 2, k2: 3 },
    { base: 1, x0: 0, k1: -4, k2: 1 },
    { base: 2, x0: 1, k1: 2, k2: 3 },
    { base: 3, x0: 0, k1: 2, k2: 1 },
    { base: 4, x0: 2, k1: 0, k2: 3 }
]

/** f(x) = F₀(x) + k₁x + k₂ */
export const curveAt = (base: number, k1: number, k2: number, x: number) => CONSTANTS_BASES[base].F0(x) + k1 * x + k2
export const slopeAt = (base: number, k1: number, x: number) => CONSTANTS_BASES[base].dF0(x) + k1

/** The point P and the slope m that the problem gives */
export function target(spec: ConstantsSpec): { x0: number; y0: number; m: number } {
    return { x0: spec.x0, y0: curveAt(spec.base, spec.k1, spec.k2, spec.x0), m: slopeAt(spec.base, spec.k1, spec.x0) }
}

/** k·x and k as LaTeX terms after the polynomial: +2x, -4x, +3 (nothing for 0) */
const term = (value: number, letter: string) => (value === 0 ? '' : `${value > 0 ? '+' : '-'}${Math.abs(value) === 1 && letter ? '' : Math.abs(value)}${letter}`)

export const curveLatex = (base: number, k1: number, k2: number) => `f(x)=${CONSTANTS_BASES[base].latex}${term(k1, 'x')}${term(k2, '')}`

export interface ConstantsState {
    spec: ConstantsSpec
    k1: number
    k2: number
    prediction: Prediction | null
}

export const initialConstantsState: ConstantsState = { spec: CONSTANTS_CASES[0], k1: 0, k2: 0, prediction: null }

const clampK = (value: number) => Math.min(CONSTANTS_LIMITS.k.max, Math.max(CONSTANTS_LIMITS.k.min, Math.round(value)))
const sameSpec = (one: ConstantsSpec, other: ConstantsSpec) => one.base === other.base && one.x0 === other.x0 && one.k1 === other.k1 && one.k2 === other.k2

/** A new problem starts with k₁ = k₂ = 0 and asks for a new guess */
export function setConstants(state: ConstantsState, patch: Partial<Omit<ConstantsState, 'prediction'>>): ConstantsState {
    const spec = patch.spec ?? state.spec
    if (!sameSpec(spec, state.spec)) return { spec, k1: clampK(patch.k1 ?? 0), k2: clampK(patch.k2 ?? 0), prediction: null }
    return { spec: state.spec, k1: clampK(patch.k1 ?? state.k1), k2: clampK(patch.k2 ?? state.k2), prediction: state.prediction }
}

/** The curve goes through P */
export const throughPoint = (state: ConstantsState) => Math.abs(curveAt(state.spec.base, state.k1, state.k2, state.spec.x0) - target(state.spec).y0) < 1e-9
/** Its slope at x₀ is m */
export const rightSlope = (state: ConstantsState) => Math.abs(slopeAt(state.spec.base, state.k1, state.spec.x0) - target(state.spec).m) < 1e-9

/** The sign of the k₁ that gives the slope m */
export const constantsPrediction = (state: ConstantsState): Prediction => compareTo(state.spec.k1, 0)

const withProblem = (spec: ConstantsSpec, goal: LocalizedText): LocalizedText => {
    const { x0, y0, m } = target(spec)
    const second = `f''(x)=${CONSTANTS_BASES[spec.base].second}`
    const point = `P(${x0},\\,${y0})`
    return say(
        `$${second}$ bada, ${goal.eu} $${point}$ puntutik pasatzen den eta bertan $m=${m}$ malda duen kurba.`,
        `Con $${second}$, ${goal.es} la curva que pasa por $${point}$ con pendiente $m=${m}$.`,
        `مع $${second}$، ${goal.ar} المنحنى الذي يمر بالنقطة $${point}$ بميل $m=${m}$.`,
        `With $${second}$, ${goal.en} the curve through $${point}$ with slope $m=${m}$.`
    )
}

const getIt = say('lortu', 'consigue', 'احصل على', 'get')

const constantsHint = say('$k_1$ konstanteak malda aldatzen du, eta $k_2$ konstanteak kurba igo edo jaitsi. Lehenik malda.', '$k_1$ cambia la pendiente y $k_2$ sube o baja la curva. Primero la pendiente.', '$k_1$ يغيّر الميل و$k_2$ يرفع المنحنى أو يخفضه. الميل أولًا.', '$k_1$ changes the slope and $k_2$ moves the curve up or down. The slope first.')

export const constantsChallenges: LabChallenge<ConstantsState>[] = CONSTANTS_CASES.map((spec, index) => ({
    id: 126301 + index,
    prompt: withProblem(spec, getIt),
    hint: constantsHint,
    isSolved: (state: ConstantsState) => sameSpec(state.spec, spec) && state.k1 === spec.k1 && state.k2 === spec.k2
}))

/** Endless practice: a new point and slope for one of the bases, with P inside the board */
const constantsMaker: LabChallengeMaker<ConstantsState> = (random) => {
    for (;;) {
        const spec: ConstantsSpec = { base: randomInt(random, 0, CONSTANTS_BASES.length - 1), x0: randomInt(random, -1, 2), k1: randomInt(random, -4, 4), k2: randomInt(random, -4, 4) }
        const { y0, m } = target(spec)
        if (y0 < -5 || y0 > 7 || Math.abs(m) > 6) continue
        return {
            prompt: withProblem(spec, getIt),
            hint: constantsHint,
            isSolved: (state) => sameSpec(state.spec, spec) && state.k1 === spec.k1 && state.k2 === spec.k2,
            solution: { spec, k1: spec.k1, k2: spec.k2, prediction: compareTo(spec.k1, 0) }
        }
    }
}

export const constantsExtra = freshFrom(initialConstantsState, constantsMaker)
