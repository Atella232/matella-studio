import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { cross, det3, dot, scale, sub, type Vec3 } from '../space/vec3.ts'
import { clampVec, isZeroVec, sameVec, say, vec } from './common.ts'

/* ==========================================================================
   L5 · Hiru bektoreren kutxa (La caja de tres vectores): u, v and w with
   whole coordinates (−3…3) are the edges of a parallelepiped. Each
   change keeps the box before it; the learner predicts whether the new
   volume is smaller, the same or bigger, and only then sees the new box
   and [u, v, w]. Moving w parallel to the base does not change the
   volume: only its height over the base counts. ▶ flattens the box,
   pushing w down onto the plane of u and v. Pure logic.
   ========================================================================== */

export const BOX_LIMIT = 3

export type BoxVectorName = 'u' | 'v' | 'w'

export interface BoxEdges {
    u: Vec3
    v: Vec3
    w: Vec3
}

export interface BoxVolumeState extends BoxEdges {
    /** The box before the last change, to compare with */
    previous: BoxEdges | null
    prediction: Prediction | null
}

/** It starts after moving w sideways from (0, 0, 2): the volume has not changed */
export const initialBoxVolumeState: BoxVolumeState = { u: [2, 0, 0], v: [0, 2, 0], w: [1, 1, 2], previous: { u: [2, 0, 0], v: [0, 2, 0], w: [0, 0, 2] }, prediction: null }

const edgesOf = ({ u, v, w }: BoxEdges): BoxEdges => ({ u, v, w })

export function setBoxVector(state: BoxVolumeState, name: BoxVectorName, value: Vec3): BoxVolumeState {
    const next = { ...state, [name]: clampVec(BOX_LIMIT, value) }
    if (sameVec(next.u, state.u) && sameVec(next.v, state.v) && sameVec(next.w, state.w)) return state
    return { ...next, previous: edgesOf(state), prediction: null }
}

/** The scalar triple product [u, v, w] */
export const boxProduct = ({ u, v, w }: BoxEdges) => det3(u, v, w) + 0
export const boxVolume = (edges: BoxEdges) => Math.abs(boxProduct(edges))

/** Whether the volume went down, stayed or went up since the last change: what the learner predicts */
export const boxPrediction = (state: BoxVolumeState): Prediction => compareTo(boxVolume(state), state.previous ? boxVolume(state.previous) : boxVolume(state))

/** w pushed a fraction t of the way down onto the plane of u and v (t = 1: the box is flat) */
export function flattenedW({ u, v, w }: BoxEdges, t: number): Vec3 {
    const n = cross(u, v)
    const square = dot(n, n)
    if (square === 0) return w
    return sub(w, scale((t * dot(w, n)) / square, n))
}

const fixed = (u: Vec3, v: Vec3) => (state: BoxVolumeState) => sameVec(state.u, u) && sameVec(state.v, v)
const parallel = (a: Vec3, b: Vec3) => isZeroVec(cross(a, b))

export const boxVolumeChallenges: LabChallenge<BoxVolumeState>[] = [
    {
        id: 119301,
        prompt: say('Egin kutxaren bolumena 12 izan dadin.', 'Haz que el volumen de la caja sea 12.', 'اجعل حجم الصندوق 12.', 'Make the volume of the box 12.'),
        hint: say('Kutxa zuzen bat: $(2,0,0)$, $(0,2,0)$ eta $(0,0,3)$.', 'Una caja recta: $(2,0,0)$, $(0,2,0)$ y $(0,0,3)$.', 'صندوق قائم: $(2,0,0)$ و$(0,2,0)$ و$(0,0,3)$.', 'A straight box: $(2,0,0)$, $(0,2,0)$ and $(0,0,3)$.'),
        isSolved: (state) => boxVolume(state) === 12
    },
    {
        id: 119302,
        prompt: say('Zapaldu kutxa: bolumena 0, bi bektore paralelo izan gabe.', 'Aplasta la caja: volumen 0 sin que dos vectores sean paralelos.', 'اضغط الصندوق: حجم 0 دون أن يتوازى متجهان.', 'Flatten the box: volume 0 without two vectors being parallel.'),
        hint: say('Hirurak plano batean: adibidez, $\\vec{w}=\\vec{u}+\\vec{v}$.', 'Los tres en un plano: por ejemplo, $\\vec{w}=\\vec{u}+\\vec{v}$.', 'الثلاثة في مستوى: مثلًا $\\vec{w}=\\vec{u}+\\vec{v}$.', 'All three in a plane: for example, $\\vec{w}=\\vec{u}+\\vec{v}$.'),
        isSolved: (state) => boxVolume(state) === 0 && !parallel(state.u, state.v) && !parallel(state.u, state.w) && !parallel(state.v, state.w)
    },
    {
        id: 119303,
        prompt: say('Egin ertz berak dituen tetraedroaren bolumena 1 izan dadin.', 'Haz que el tetraedro de las mismas aristas tenga volumen 1.', 'اجعل حجم رباعي الأوجه ذي الأحرف نفسها 1.', 'Make the tetrahedron with the same edges have volume 1.'),
        hint: say('Tetraedroa kutxaren seirena da: kutxak 6 behar du.', 'El tetraedro es la sexta parte de la caja: la caja tiene que medir 6.', 'رباعي الأوجه سدس الصندوق: يجب أن يكون حجم الصندوق 6.', 'The tetrahedron is a sixth of the box: the box has to be 6.'),
        isSolved: (state) => boxVolume(state) === 6
    },
    {
        id: 119304,
        prompt: say('$\\vec{u}=(2,0,0)$ eta $\\vec{v}=(0,3,0)$ direla, lortu 12 bolumena, $\\vec{w}$ bertikala izan gabe.', 'Con $\\vec{u}=(2,0,0)$ y $\\vec{v}=(0,3,0)$, consigue volumen 12 sin que $\\vec{w}$ sea vertical.', 'مع $\\vec{u}=(2,0,0)$ و$\\vec{v}=(0,3,0)$ احصل على حجم 12 دون أن يكون $\\vec{w}$ رأسيًا.', 'With $\\vec{u}=(2,0,0)$ and $\\vec{v}=(0,3,0)$, get volume 12 without $\\vec{w}$ being vertical.'),
        hint: say('Altuera bakarrik axola da: $w_3=\\pm 2$, eta $w_1$ eta $w_2$ nahi duzuna.', 'Solo cuenta la altura: $w_3=\\pm 2$, y $w_1$ y $w_2$ los que quieras.', 'لا يهم إلا الارتفاع: $w_3=\\pm 2$، و$w_1$ و$w_2$ كما تشاء.', 'Only the height counts: $w_3=\\pm 2$, and $w_1$ and $w_2$ whatever you like.'),
        isSolved: (state) => fixed([2, 0, 0], [0, 3, 0])(state) && boxVolume(state) === 12 && (state.w[0] !== 0 || state.w[1] !== 0)
    },
    {
        id: 119305,
        prompt: say('Lortu $[\\vec{u},\\vec{v},\\vec{w}]=-6$.', 'Consigue $[\\vec{u},\\vec{v},\\vec{w}]=-6$.', 'احصل على $[\\vec{u},\\vec{v},\\vec{w}]=-6$.', 'Get $[\\vec{u},\\vec{v},\\vec{w}]=-6$.'),
        hint: say('Bolumena 6, eta $\\vec{w}$ $\\vec{u}\\times\\vec{v}$ bektorearen aurkako aldean.', 'Volumen 6, con $\\vec{w}$ al otro lado de $\\vec{u}\\times\\vec{v}$.', 'الحجم 6، مع $\\vec{w}$ في الجهة المعاكسة لـ $\\vec{u}\\times\\vec{v}$.', 'Volume 6, with $\\vec{w}$ on the other side from $\\vec{u}\\times\\vec{v}$.'),
        isSolved: (state) => boxProduct(state) === -6
    }
]

/** Bases on the floor: u and v with z = 0, and the area of their parallelogram */
const FLOORS: Array<[Vec3, Vec3]> = [[[2, 0, 0], [0, 2, 0]], [[1, 0, 0], [0, 3, 0]], [[2, 1, 0], [0, 2, 0]], [[3, 0, 0], [1, 1, 0]], [[1, 1, 0], [-1, 1, 0]], [[2, 0, 0], [1, 3, 0]]]

/** Endless practice: a base on the floor and the volume the box has to reach */
const boxMaker: LabChallengeMaker<BoxVolumeState> = (random) => {
    for (;;) {
        const [u, v] = FLOORS[randomInt(random, 0, FLOORS.length - 1)]
        const w: Vec3 = [randomInt(random, -2, 2), randomInt(random, -2, 2), randomInt(random, 1, 3)]
        const volume = boxVolume({ u, v, w })
        if (volume === 0) continue
        return {
            prompt: say(`$\\vec{u}=${vec(u)}$ eta $\\vec{v}=${vec(v)}$ direla, egin bolumena ${volume} izan dadin.`, `Con $\\vec{u}=${vec(u)}$ y $\\vec{v}=${vec(v)}$, haz que el volumen sea ${volume}.`, `مع $\\vec{u}=${vec(u)}$ و$\\vec{v}=${vec(v)}$ اجعل الحجم ${volume}.`, `With $\\vec{u}=${vec(u)}$ and $\\vec{v}=${vec(v)}$, make the volume ${volume}.`),
            hint: say('Oinarriaren azalera bider $\\vec{w}$ bektorearen altuera.', 'Área de la base por la altura de $\\vec{w}$.', 'مساحة القاعدة في ارتفاع $\\vec{w}$.', 'Area of the base times the height of $\\vec{w}$.'),
            isSolved: (state) => fixed(u, v)(state) && boxVolume(state) === volume,
            solution: { u, v, w, previous: null, prediction: null }
        }
    }
}

export const boxVolumeExtra = freshFrom(initialBoxVolumeState, boxMaker)
