import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { angleDeg, dot, scale, type Vec3 } from '../space/vec3.ts'
import { clampVec, isZeroVec, sameVec, say, vec } from './common.ts'

/* ==========================================================================
   L3 · Itzala espazioan (La sombra en el espacio): two vectors u and v
   with whole coordinates (−3…3) from the origin. The light falls
   perpendicular to the line of u, so v casts a shadow on it: its signed
   length is u·v / |u| and the shadow itself is (u·v / |u|²)·u. The
   learner first predicts the sign of u·v; then the shadow (green
   forwards, red backwards), u₁v₁ + u₂v₂ + u₃v₃, the projection and the
   angle appear. Pure logic.
   ========================================================================== */

export const SHADOW_LIMIT = 3

export type ShadowVectorName = 'u' | 'v'

export interface SpaceShadowState {
    u: Vec3
    v: Vec3
    prediction: Prediction | null
}

export const initialSpaceShadowState: SpaceShadowState = { u: [2, 1, 0], v: [1, -1, 2], prediction: null }

export function setShadowVector(state: SpaceShadowState, name: ShadowVectorName, value: Vec3): SpaceShadowState {
    const next = { ...state, [name]: clampVec(SHADOW_LIMIT, value) }
    return { ...next, prediction: sameVec(next.u, state.u) && sameVec(next.v, state.v) ? state.prediction : null }
}

export const shadowDot = ({ u, v }: Pick<SpaceShadowState, 'u' | 'v'>) => dot(u, v) + 0
/** The sign of u·v: what the learner predicts */
export const spaceShadowPrediction = (state: SpaceShadowState): Prediction => compareTo(shadowDot(state), 0)
/** The shadow of v on the line of u, (u·v / |u|²)·u, or null if u is zero */
export const shadowVector = ({ u, v }: Pick<SpaceShadowState, 'u' | 'v'>): Vec3 | null => (isZeroVec(u) ? null : scale(dot(u, v) / dot(u, u), u))
/** The angle in degrees, or null if a vector is zero */
export const shadowAngle = ({ u, v }: Pick<SpaceShadowState, 'u' | 'v'>) => (isZeroVec(u) || isZeroVec(v) ? null : angleDeg(u, v))

const near = (a: number | null, b: number) => a !== null && Math.abs(a - b) < 1e-6

export const spaceShadowChallenges: LabChallenge<SpaceShadowState>[] = [
    {
        id: 119201,
        prompt: say('Egin $\\vec{u}$ eta $\\vec{v}$ perpendikularrak, $\\vec{u}$ bektorearen hiru koordenatuak 0 ez direla eta $\\vec{v}$ nulua izan gabe.', 'Haz que $\\vec{u}$ y $\\vec{v}$ sean perpendiculares, con las tres coordenadas de $\\vec{u}$ distintas de 0 y $\\vec{v}$ no nulo.', 'اجعل $\\vec{u}$ و$\\vec{v}$ متعامدين، ومركّبات $\\vec{u}$ الثلاث غير معدومة و$\\vec{v}$ غير معدوم.', 'Make $\\vec{u}$ and $\\vec{v}$ perpendicular, with all three coordinates of $\\vec{u}$ other than 0 and $\\vec{v}$ not zero.'),
        hint: say('$u_1v_1+u_2v_2+u_3v_3=0$: adibidez $(1,1,1)$ eta $(1,-1,0)$.', '$u_1v_1+u_2v_2+u_3v_3=0$: por ejemplo $(1,1,1)$ y $(1,-1,0)$.', '$u_1v_1+u_2v_2+u_3v_3=0$: مثلًا $(1,1,1)$ و$(1,-1,0)$.', '$u_1v_1+u_2v_2+u_3v_3=0$: for example $(1,1,1)$ and $(1,-1,0)$.'),
        isSolved: (state) => state.u.every((value) => value !== 0) && !isZeroVec(state.v) && shadowDot(state) === 0
    },
    {
        id: 119202,
        prompt: say('$\\vec{u}=(1,2,2)$ dela, egin $\\vec{v}$ bektorearen itzalak 3 neur dezan.', 'Con $\\vec{u}=(1,2,2)$, haz que la sombra de $\\vec{v}$ mida 3.', 'مع $\\vec{u}=(1,2,2)$ اجعل طول ظل $\\vec{v}$ يساوي 3.', 'With $\\vec{u}=(1,2,2)$, make the shadow of $\\vec{v}$ 3 long.'),
        hint: say('$|\\vec{u}|=3$: biderkadura eskalarrak 9 eman behar du.', '$|\\vec{u}|=3$: el producto escalar tiene que dar 9.', '$|\\vec{u}|=3$: يجب أن يعطي الجداء السلمي 9.', '$|\\vec{u}|=3$: the dot product has to be 9.'),
        isSolved: (state) => sameVec(state.u, [1, 2, 2]) && shadowDot(state) === 9
    },
    {
        id: 119203,
        prompt: say('$\\vec{u}=(1,1,1)$ dela, jarri $\\vec{v}$ haren itzala atzera eror dadin.', 'Con $\\vec{u}=(1,1,1)$, pon $\\vec{v}$ para que su sombra caiga hacia atrás.', 'مع $\\vec{u}=(1,1,1)$ ضع $\\vec{v}$ ليقع ظله إلى الخلف.', 'With $\\vec{u}=(1,1,1)$, place $\\vec{v}$ so that its shadow falls backwards.'),
        hint: say('Atzerako itzala: $\\vec{u}\\cdot\\vec{v}<0$, angelu kamutsa.', 'Sombra hacia atrás: $\\vec{u}\\cdot\\vec{v}<0$, ángulo obtuso.', 'ظل إلى الخلف: $\\vec{u}\\cdot\\vec{v}<0$، زاوية منفرجة.', 'Shadow backwards: $\\vec{u}\\cdot\\vec{v}<0$, obtuse angle.'),
        isSolved: (state) => sameVec(state.u, [1, 1, 1]) && shadowDot(state) < 0
    },
    {
        id: 119204,
        prompt: say('$\\vec{u}=(0,0,2)$ dela, egin itzala $(0,0,3)$ bektorea izan dadin.', 'Con $\\vec{u}=(0,0,2)$, haz que la sombra sea el vector $(0,0,3)$.', 'مع $\\vec{u}=(0,0,2)$ اجعل الظل هو المتجه $(0,0,3)$.', 'With $\\vec{u}=(0,0,2)$, make the shadow the vector $(0,0,3)$.'),
        hint: say('$\\vec{u}$ bertikala da: itzala $\\vec{v}$ bektorearen altuera da.', '$\\vec{u}$ es vertical: la sombra es la altura de $\\vec{v}$.', '$\\vec{u}$ رأسي: الظل هو ارتفاع $\\vec{v}$.', '$\\vec{u}$ is vertical: the shadow is the height of $\\vec{v}$.'),
        isSolved: (state) => sameVec(state.u, [0, 0, 2]) && state.v[2] === 3
    },
    {
        id: 119205,
        prompt: say('Lortu $60^\\circ$ angelua, $\\vec{u}=(1,1,0)$ izanik.', 'Consigue un ángulo de $60^\\circ$ con $\\vec{u}=(1,1,0)$.', 'احصل على زاوية $60^\\circ$ مع $\\vec{u}=(1,1,0)$.', 'Get an angle of $60^\\circ$ with $\\vec{u}=(1,1,0)$.'),
        hint: say('$\\cos 60^\\circ=\\frac{1}{2}$: probatu $(0,1,1)$ bezalako bektore batekin.', '$\\cos 60^\\circ=\\frac{1}{2}$: prueba con un vector como $(0,1,1)$.', '$\\cos 60^\\circ=\\frac{1}{2}$: جرّب متجهًا مثل $(0,1,1)$.', '$\\cos 60^\\circ=\\frac{1}{2}$: try a vector like $(0,1,1)$.'),
        isSolved: (state) => sameVec(state.u, [1, 1, 0]) && near(shadowAngle(state), 60)
    }
]

/** Endless practice: a fixed u and the dot product v has to give */
const spaceShadowMaker: LabChallengeMaker<SpaceShadowState> = (random) => {
    for (;;) {
        const u: Vec3 = [randomInt(random, -2, 2), randomInt(random, -2, 2), randomInt(random, -2, 2)]
        const v: Vec3 = [randomInt(random, -3, 3), randomInt(random, -3, 3), randomInt(random, -3, 3)]
        if (isZeroVec(u) || isZeroVec(v) || u.filter((value) => value === 0).length > 1) continue
        const k = dot(u, v) + 0
        return {
            prompt: say(`$\\vec{u}=${vec(u)}$ dela, lortu $\\vec{u}\\cdot\\vec{v}=${k}$.`, `Con $\\vec{u}=${vec(u)}$, consigue $\\vec{u}\\cdot\\vec{v}=${k}$.`, `مع $\\vec{u}=${vec(u)}$ احصل على $\\vec{u}\\cdot\\vec{v}=${k}$.`, `With $\\vec{u}=${vec(u)}$, get $\\vec{u}\\cdot\\vec{v}=${k}$.`),
            hint: k === 0
                ? say('Biderkadura 0: $\\vec{v}$ perpendikularra.', 'Producto 0: $\\vec{v}$ perpendicular.', 'الجداء 0: $\\vec{v}$ عمودي.', 'Product 0: $\\vec{v}$ perpendicular.')
                : say('$u_1v_1+u_2v_2+u_3v_3$: probatu $\\vec{v}$ bektorearen koordenatuekin.', '$u_1v_1+u_2v_2+u_3v_3$: prueba con las coordenadas de $\\vec{v}$.', '$u_1v_1+u_2v_2+u_3v_3$: جرّب بمركّبات $\\vec{v}$.', '$u_1v_1+u_2v_2+u_3v_3$: try with the coordinates of $\\vec{v}$.'),
            isSolved: (state) => sameVec(state.u, u) && shadowDot(state) === k,
            solution: { u, v, prediction: null }
        }
    }
}

export const spaceShadowExtra = freshFrom(initialSpaceShadowState, spaceShadowMaker)
