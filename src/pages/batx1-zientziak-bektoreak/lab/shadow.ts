import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import type { Pair } from './skewGrid.ts'

/* ==========================================================================
   L2 · Itzala (La sombra): two vectors u and v with whole coordinates
   from the same point. The light falls perpendicular to the line of u,
   so v casts a shadow on it: its signed length is u·v / |u|, and
   u·v = |u| · shadow. The learner first predicts the sign of u·v
   (negative, 0 or positive); then the shadow, the dot product
   u₁v₁ + u₂v₂, the cosine and the angle appear. Pure logic.
   ========================================================================== */

export const SHADOW_LIMIT = 4

export interface ShadowState {
    u: Pair
    v: Pair
    prediction: Prediction | null
}

export const initialShadowState: ShadowState = { u: [3, 1], v: [1, 2], prediction: null }

const clamp = (value: number) => Math.min(SHADOW_LIMIT, Math.max(-SHADOW_LIMIT, Math.round(value)))
const samePair = (p: Pair, q: Pair) => p[0] === q[0] && p[1] === q[1]

export function setShadow(state: ShadowState, patch: Partial<Omit<ShadowState, 'prediction'>>): ShadowState {
    const u: Pair = patch.u ? [clamp(patch.u[0]), clamp(patch.u[1])] : state.u
    const v: Pair = patch.v ? [clamp(patch.v[0]), clamp(patch.v[1])] : state.v
    const same = samePair(u, state.u) && samePair(v, state.v)
    return { u, v, prediction: same ? state.prediction : null }
}

export const dotOf = ([a, b]: Pair, [c, d]: Pair) => a * c + b * d
export const squareOf = ([a, b]: Pair) => a * a + b * b
const isZero = (p: Pair) => p[0] === 0 && p[1] === 0

/** The sign of u·v: what the learner predicts */
export const shadowPrediction = ({ u, v }: ShadowState): Prediction => compareTo(dotOf(u, v), 0)

/** The signed length of the shadow of v on the line of u, or null if u is zero */
export const shadowLength = ({ u, v }: Pick<ShadowState, 'u' | 'v'>) => (isZero(u) ? null : dotOf(u, v) / Math.sqrt(squareOf(u)))
/** The foot of the shadow: (u·v / |u|²)·u, or null if u is zero */
export function shadowFoot({ u, v }: Pick<ShadowState, 'u' | 'v'>): [number, number] | null {
    if (isZero(u)) return null
    const k = dotOf(u, v) / squareOf(u)
    return [k * u[0], k * u[1]]
}
/** The angle between u and v in degrees, or null if one of them is zero */
export function angleOf({ u, v }: Pick<ShadowState, 'u' | 'v'>): number | null {
    if (isZero(u) || isZero(v)) return null
    const cosine = Math.max(-1, Math.min(1, dotOf(u, v) / Math.sqrt(squareOf(u) * squareOf(v))))
    return (Math.acos(cosine) * 180) / Math.PI
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const near = (a: number | null, b: number) => a !== null && Math.abs(a - b) < 1e-6

export const shadowChallenges: LabChallenge<ShadowState>[] = [
    {
        id: 105201,
        prompt: say('Egin $\\vec{u}$ eta $\\vec{v}$ perpendikularrak, bat ere nulua izan gabe.', 'Haz que $\\vec{u}$ y $\\vec{v}$ sean perpendiculares sin que ninguno sea nulo.', 'اجعل $\\vec{u}$ و$\\vec{v}$ متعامدين دون أن يكون أحدهما معدومًا.', 'Make $\\vec{u}$ and $\\vec{v}$ perpendicular without either of them being zero.'),
        hint: say('Biderkadura eskalarra 0: $(a,b)$ eta $(-b,a)$.', 'Producto escalar 0: $(a,b)$ y $(-b,a)$.', 'الجداء السلمي 0: $(a,b)$ و$(-b,a)$.', 'Dot product 0: $(a,b)$ and $(-b,a)$.'),
        isSolved: (state) => !isZero(state.u) && !isZero(state.v) && dotOf(state.u, state.v) === 0
    },
    {
        id: 105202,
        prompt: say('$\\vec{u}=(3,1)$ dela, jarri $\\vec{v}$ haren itzala atzera eror dadin.', 'Con $\\vec{u}=(3,1)$, pon $\\vec{v}$ para que su sombra caiga hacia atrás.', 'مع $\\vec{u}=(3,1)$ ضع $\\vec{v}$ ليقع ظله إلى الخلف.', 'With $\\vec{u}=(3,1)$, place $\\vec{v}$ so that its shadow falls backwards.'),
        hint: say('Atzerako itzala: angelu kamutsa, $\\vec{u}\\cdot\\vec{v}<0$.', 'Sombra hacia atrás: ángulo obtuso, $\\vec{u}\\cdot\\vec{v}<0$.', 'ظل إلى الخلف: زاوية منفرجة، $\\vec{u}\\cdot\\vec{v}<0$.', 'Shadow backwards: obtuse angle, $\\vec{u}\\cdot\\vec{v}<0$.'),
        isSolved: (state) => samePair(state.u, [3, 1]) && dotOf(state.u, state.v) < 0
    },
    {
        id: 105203,
        prompt: say('$\\vec{u}=(4,0)$ dela, egin $\\vec{v}$ bektorearen itzalak 3 neur dezan.', 'Con $\\vec{u}=(4,0)$, haz que la sombra de $\\vec{v}$ mida 3.', 'مع $\\vec{u}=(4,0)$ اجعل طول ظل $\\vec{v}$ يساوي 3.', 'With $\\vec{u}=(4,0)$, make the shadow of $\\vec{v}$ 3 long.'),
        hint: say('$\\vec{u}$ horizontala da: itzala $\\vec{v}$ bektorearen lehen koordenatua da.', '$\\vec{u}$ es horizontal: la sombra es la primera coordenada de $\\vec{v}$.', '$\\vec{u}$ أفقي: الظل هو المركّبة الأولى لـ $\\vec{v}$.', '$\\vec{u}$ is horizontal: the shadow is the first coordinate of $\\vec{v}$.'),
        isSolved: (state) => samePair(state.u, [4, 0]) && state.v[0] === 3
    },
    {
        id: 105204,
        prompt: say('$\\vec{u}=(1,1)$ dela, egin bi bektoreek $135^\\circ$ osa dezaten.', 'Con $\\vec{u}=(1,1)$, consigue un ángulo de $135^\\circ$.', 'مع $\\vec{u}=(1,1)$ احصل على زاوية $135^\\circ$.', 'With $\\vec{u}=(1,1)$, get an angle of $135^\\circ$.'),
        hint: say('$\\cos 135^\\circ=-\\frac{\\sqrt{2}}{2}$: saiatu ardatz batean.', '$\\cos 135^\\circ=-\\frac{\\sqrt{2}}{2}$: prueba sobre un eje.', '$\\cos 135^\\circ=-\\frac{\\sqrt{2}}{2}$: جرّب على أحد المحورين.', '$\\cos 135^\\circ=-\\frac{\\sqrt{2}}{2}$: try on an axis.'),
        isSolved: (state) => samePair(state.u, [1, 1]) && near(angleOf(state), 135)
    },
    {
        id: 105205,
        prompt: say('Lortu $\\vec{u}\\cdot\\vec{v}=10$, $|\\vec{u}|=5$ izanik.', 'Consigue $\\vec{u}\\cdot\\vec{v}=10$ con $|\\vec{u}|=5$.', 'احصل على $\\vec{u}\\cdot\\vec{v}=10$ مع $|\\vec{u}|=5$.', 'Get $\\vec{u}\\cdot\\vec{v}=10$ with $|\\vec{u}|=5$.'),
        hint: say('$|\\vec{u}|=5$: $(3,4)$, $(4,3)$… Gero itzalak 2 neurtu behar du.', '$|\\vec{u}|=5$: $(3,4)$, $(4,3)$… Después la sombra tiene que medir 2.', '$|\\vec{u}|=5$: ‏$(3,4)$ أو $(4,3)$… ثم يجب أن يكون طول الظل 2.', '$|\\vec{u}|=5$: $(3,4)$, $(4,3)$… Then the shadow has to be 2 long.'),
        isSolved: (state) => squareOf(state.u) === 25 && dotOf(state.u, state.v) === 10
    }
]

/** Endless practice: a fixed u and the dot product v has to give */
const shadowMaker: LabChallengeMaker<ShadowState> = (random) => {
    for (;;) {
        const u: Pair = [randomInt(random, -3, 3), randomInt(random, -3, 3)]
        const v: Pair = [randomInt(random, -3, 3), randomInt(random, -3, 3)]
        if (isZero(u) || isZero(v)) continue
        const k = dotOf(u, v)
        return {
            prompt: say(`$\\vec{u}=(${u[0]},${u[1]})$ dela, lortu $\\vec{u}\\cdot\\vec{v}=${k}$.`, `Con $\\vec{u}=(${u[0]},${u[1]})$, consigue $\\vec{u}\\cdot\\vec{v}=${k}$.`, `مع $\\vec{u}=(${u[0]},${u[1]})$ احصل على $\\vec{u}\\cdot\\vec{v}=${k}$.`, `With $\\vec{u}=(${u[0]},${u[1]})$, get $\\vec{u}\\cdot\\vec{v}=${k}$.`),
            hint: k === 0
                ? say('Biderkadura 0: $\\vec{v}$ perpendikularra.', 'Producto 0: $\\vec{v}$ perpendicular.', 'الجداء 0: $\\vec{v}$ عمودي.', 'Product 0: $\\vec{v}$ perpendicular.')
                : say('$u_1v_1+u_2v_2$: probatu $\\vec{v}$ bektorearen koordenatuekin.', '$u_1v_1+u_2v_2$: prueba con las coordenadas de $\\vec{v}$.', '$u_1v_1+u_2v_2$: جرّب بمركّبتي $\\vec{v}$.', '$u_1v_1+u_2v_2$: try with the coordinates of $\\vec{v}$.'),
            isSolved: (state) => samePair(state.u, u) && dotOf(state.u, state.v) === k,
            solution: { u, v, prediction: null }
        }
    }
}

export const shadowExtra = freshFrom(initialShadowState, shadowMaker)
