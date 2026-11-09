import { fraction, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { add, cross, det3, dot, rank, scale, type Vec3 } from '../space/vec3.ts'
import { clampVec, isZeroVec, sameVec, say, vec } from './common.ts'

/* ==========================================================================
   L2 · Planoan sartzen da? (¿Cabe en el plano?): three vectors u, v and w
   with whole coordinates (−3…3). u and v span a plane, drawn on the
   board; w either lies in it (the three are dependent, determinant 0)
   or sticks out of it (they form a basis). The learner first predicts
   «inside», «no plane» (u and v parallel) or «outside»; then the
   determinant and the rank appear and, when w is inside, the numbers a
   and b of w = a·u + b·v. Pure logic.
   ========================================================================== */

export const PLANE_LIMIT = 3

export type PlaneVectorName = 'u' | 'v' | 'w'

export interface InPlaneState {
    u: Vec3
    v: Vec3
    w: Vec3
    prediction: Prediction | null
}

export const initialInPlaneState: InPlaneState = { u: [1, 2, 0], v: [0, 1, 1], w: [1, 0, 1], prediction: null }

export function setPlaneVector(state: InPlaneState, name: PlaneVectorName, value: Vec3): InPlaneState {
    const next = { ...state, [name]: clampVec(PLANE_LIMIT, value) }
    return { ...next, prediction: sameVec(next.u, state.u) && sameVec(next.v, state.v) && sameVec(next.w, state.w) ? state.prediction : null }
}

export const planeDeterminant = ({ u, v, w }: Pick<InPlaneState, 'u' | 'v' | 'w'>) => det3(u, v, w) + 0
export const planeRank = ({ u, v, w }: Pick<InPlaneState, 'u' | 'v' | 'w'>) => rank([u, v, w])
/** u and v span no plane: one of them is zero or they are parallel */
export const noPlane = ({ u, v }: Pick<InPlaneState, 'u' | 'v'>) => isZeroVec(cross(u, v))

/**
 * What the learner predicts: '<' w inside the plane of u and v, '=' there is no plane (u ∥ v),
 * '>' w outside it (u, v and w form a basis)
 */
export const inPlanePrediction = (state: InPlaneState): Prediction => (noPlane(state) ? '=' : planeDeterminant(state) === 0 ? '<' : '>')

/** The numbers a and b of w = a·u + b·v when w lies in the plane of u and v, exact */
export function planeCoefficients(state: Pick<InPlaneState, 'u' | 'v' | 'w'>): [FractionValue, FractionValue] | null {
    if (noPlane(state) || planeDeterminant(state) !== 0) return null
    const n = cross(state.u, state.v)
    const square = dot(n, n)
    return [fraction(dot(cross(state.w, state.v), n), square), fraction(dot(cross(state.u, state.w), n), square)]
}

const fixed = (u: Vec3, v: Vec3) => (state: InPlaneState) => sameVec(state.u, u) && sameVec(state.v, v)

export const inPlaneChallenges: LabChallenge<InPlaneState>[] = [
    {
        id: 119151,
        prompt: say('Sartu $\\vec{w}$ bektorea $\\vec{u}$ eta $\\vec{v}$ bektoreen planoan, haietako baten paraleloa izan gabe.', 'Mete $\\vec{w}$ en el plano de $\\vec{u}$ y $\\vec{v}$, sin que sea paralelo a ninguno de los dos.', 'أدخل $\\vec{w}$ في مستوى $\\vec{u}$ و$\\vec{v}$ دون أن يوازي أيًا منهما.', 'Put $\\vec{w}$ in the plane of $\\vec{u}$ and $\\vec{v}$, without it being parallel to either of them.'),
        hint: say('Probatu $\\vec{w}=\\vec{u}+\\vec{v}$.', 'Prueba con $\\vec{w}=\\vec{u}+\\vec{v}$.', 'جرّب $\\vec{w}=\\vec{u}+\\vec{v}$.', 'Try $\\vec{w}=\\vec{u}+\\vec{v}$.'),
        isSolved: (state) => !noPlane(state) && planeDeterminant(state) === 0 && !isZeroVec(cross(state.w, state.u)) && !isZeroVec(cross(state.w, state.v))
    },
    {
        id: 119152,
        prompt: say('$\\vec{u}=(1,0,1)$ eta $\\vec{v}=(0,1,1)$ direla, jarri $\\vec{w}$ eta lortu determinantea 2 izatea.', 'Con $\\vec{u}=(1,0,1)$ y $\\vec{v}=(0,1,1)$, pon $\\vec{w}$ para que el determinante valga 2.', 'مع $\\vec{u}=(1,0,1)$ و$\\vec{v}=(0,1,1)$ ضع $\\vec{w}$ ليكون المحدد 2.', 'With $\\vec{u}=(1,0,1)$ and $\\vec{v}=(0,1,1)$, place $\\vec{w}$ so that the determinant is 2.'),
        hint: say('Determinantea $\\vec{w}\\cdot(\\vec{u}\\times\\vec{v})$ da, eta $\\vec{u}\\times\\vec{v}=(-1,-1,1)$.', 'El determinante es $\\vec{w}\\cdot(\\vec{u}\\times\\vec{v})$, y $\\vec{u}\\times\\vec{v}=(-1,-1,1)$.', 'المحدد هو $\\vec{w}\\cdot(\\vec{u}\\times\\vec{v})$، و$\\vec{u}\\times\\vec{v}=(-1,-1,1)$.', 'The determinant is $\\vec{w}\\cdot(\\vec{u}\\times\\vec{v})$, and $\\vec{u}\\times\\vec{v}=(-1,-1,1)$.'),
        isSolved: (state) => fixed([1, 0, 1], [0, 1, 1])(state) && planeDeterminant(state) === 2
    },
    {
        id: 119153,
        prompt: say('Egin heina 1 izatea, hiru bektoreak nuluak izan gabe.', 'Haz que el rango sea 1 sin que ninguno de los tres vectores sea nulo.', 'اجعل الرتبة 1 دون أن يكون أي من المتجهات الثلاثة معدومًا.', 'Make the rank 1 without any of the three vectors being zero.'),
        hint: say('Hirurak paraleloak: bata bestearen multiploa.', 'Los tres paralelos: múltiplos uno de otro.', 'الثلاثة متوازية: كل منها مضاعف للآخر.', 'All three parallel: multiples of each other.'),
        isSolved: (state) => planeRank(state) === 1 && !isZeroVec(state.u) && !isZeroVec(state.v) && !isZeroVec(state.w)
    },
    {
        id: 119154,
        prompt: say('$\\vec{u}=(1,1,0)$ eta $\\vec{v}=(0,1,1)$ direla, jarri $\\vec{w}=2\\vec{u}-\\vec{v}$.', 'Con $\\vec{u}=(1,1,0)$ y $\\vec{v}=(0,1,1)$, coloca $\\vec{w}=2\\vec{u}-\\vec{v}$.', 'مع $\\vec{u}=(1,1,0)$ و$\\vec{v}=(0,1,1)$ ضع $\\vec{w}=2\\vec{u}-\\vec{v}$.', 'With $\\vec{u}=(1,1,0)$ and $\\vec{v}=(0,1,1)$, place $\\vec{w}=2\\vec{u}-\\vec{v}$.'),
        hint: say('Koordenatuz koordenatu: $(2,2,0)-(0,1,1)$.', 'Coordenada a coordenada: $(2,2,0)-(0,1,1)$.', 'مركّبةً مركّبة: $(2,2,0)-(0,1,1)$.', 'Coordinate by coordinate: $(2,2,0)-(0,1,1)$.'),
        isSolved: (state) => fixed([1, 1, 0], [0, 1, 1])(state) && sameVec(state.w, [2, 1, -1])
    },
    {
        id: 119155,
        prompt: say('Osatu oinarri bat, hiru bektoreen koordenatu guztiak 0 ez direla.', 'Forma una base en la que ninguna coordenada de los tres vectores sea 0.', 'كوّن أساسًا لا تكون فيه أي مركّبة للمتجهات الثلاثة صفرًا.', 'Make a basis in which no coordinate of the three vectors is 0.'),
        hint: say('Determinantea 0 ez izatea nahikoa da.', 'Basta con que el determinante no sea 0.', 'يكفي أن يكون المحدد غير 0.', 'It is enough for the determinant not to be 0.'),
        isSolved: (state) => planeDeterminant(state) !== 0 && [state.u, state.v, state.w].every((vector) => vector.every((value) => value !== 0))
    }
]

const PLANE_PAIRS: Array<[Vec3, Vec3]> = [[[1, 0, 1], [0, 1, 1]], [[1, 1, 0], [0, 1, 1]], [[1, 0, 0], [0, 1, 1]], [[1, 2, 0], [0, 1, 1]], [[2, 0, 1], [0, 1, -1]], [[1, -1, 0], [0, 1, 2]], [[1, 0, -1], [1, 1, 0]]]

/** Endless practice: fixed u and v and the combination w has to be */
const inPlaneMaker: LabChallengeMaker<InPlaneState> = (random) => {
    for (;;) {
        const [u, v] = PLANE_PAIRS[randomInt(random, 0, PLANE_PAIRS.length - 1)]
        const a = randomInt(random, -2, 2)
        const b = randomInt(random, -2, 2)
        if (a === 0 && b === 0) continue
        const w = add(scale(a, u), scale(b, v))
        if (w.some((value) => Math.abs(value) > PLANE_LIMIT)) continue
        const term = (k: number, name: string, first: boolean) => (k === 0 ? '' : `${k < 0 ? '-' : first ? '' : '+'}${Math.abs(k) === 1 ? '' : Math.abs(k)}\\vec{${name}}`)
        const combination = `${term(a, 'u', true)}${term(b, 'v', a === 0)}`
        return {
            prompt: say(`$\\vec{u}=${vec(u)}$ eta $\\vec{v}=${vec(v)}$ direla, jarri $\\vec{w}=${combination}$.`, `Con $\\vec{u}=${vec(u)}$ y $\\vec{v}=${vec(v)}$, coloca $\\vec{w}=${combination}$.`, `مع $\\vec{u}=${vec(u)}$ و$\\vec{v}=${vec(v)}$ ضع $\\vec{w}=${combination}$.`, `With $\\vec{u}=${vec(u)}$ and $\\vec{v}=${vec(v)}$, place $\\vec{w}=${combination}$.`),
            hint: say('Biderkatu eta batu koordenatuz koordenatu.', 'Multiplica y suma coordenada a coordenada.', 'اضرب واجمع مركّبةً مركّبة.', 'Multiply and add coordinate by coordinate.'),
            isSolved: (state) => fixed(u, v)(state) && sameVec(state.w, w),
            solution: { u, v, w, prediction: null }
        }
    }
}

export const inPlaneExtra = freshFrom(initialInPlaneState, inPlaneMaker)
