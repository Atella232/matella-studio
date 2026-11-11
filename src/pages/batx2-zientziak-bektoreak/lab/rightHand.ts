import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { cross, dot, type Vec3 } from '../space/vec3.ts'
import { clampVec, isZeroVec, sameVec, say, vec } from './common.ts'

/* ==========================================================================
   L4 · Eskuineko eskua (La mano derecha): two vectors u and v with whole
   coordinates (−3…3) span a parallelogram, and their cross product
   stands on it. A button swaps the order (v × u) and the arrow turns
   round. The learner first predicts where the arrow points: down (its
   z is negative), flat (z = 0) or up; then the arrow, its coordinates
   from the determinant and the area |u × v| appear. Pure logic.
   ========================================================================== */

export const HAND_LIMIT = 3

export type HandVectorName = 'u' | 'v'

export interface RightHandState {
    u: Vec3
    v: Vec3
    /** true: the product is v × u */
    swapped: boolean
    prediction: Prediction | null
}

export const initialRightHandState: RightHandState = { u: [2, 0, 0], v: [1, 2, 0], swapped: false, prediction: null }

export function setHandVector(state: RightHandState, name: HandVectorName, value: Vec3): RightHandState {
    const next = { ...state, [name]: clampVec(HAND_LIMIT, value) }
    return { ...next, prediction: sameVec(next.u, state.u) && sameVec(next.v, state.v) ? state.prediction : null }
}

/** Swapping the order turns the arrow round: a new prediction */
export const swapHand = (state: RightHandState): RightHandState => ({ ...state, swapped: !state.swapped, prediction: null })

/** The product shown: u × v, or v × u after swapping */
export const handProduct = ({ u, v, swapped }: Pick<RightHandState, 'u' | 'v' | 'swapped'>): Vec3 => {
    const product = swapped ? cross(v, u) : cross(u, v)
    return [product[0] + 0, product[1] + 0, product[2] + 0]
}
/** |u × v|², the square of the area of the parallelogram */
export const handAreaSquare = (state: Pick<RightHandState, 'u' | 'v' | 'swapped'>) => {
    const product = handProduct(state)
    return dot(product, product)
}

/** Whether the arrow points down, is flat or points up: what the learner predicts */
export const rightHandPrediction = (state: RightHandState): Prediction => compareTo(handProduct(state)[2], 0)

const plain = (state: RightHandState) => !state.swapped

export const rightHandChallenges: LabChallenge<RightHandState>[] = [
    {
        id: 119251,
        prompt: say('Lortu $\\vec{u}\\times\\vec{v}=(0,0,5)$.', 'Consigue $\\vec{u}\\times\\vec{v}=(0,0,5)$.', 'احصل على $\\vec{u}\\times\\vec{v}=(0,0,5)$.', 'Get $\\vec{u}\\times\\vec{v}=(0,0,5)$.'),
        hint: say('Biak $XY$ planoan (${z}=0$), eta $u_1v_2-u_2v_1=5$.', 'Los dos en el plano $XY$ (${z}=0$), y $u_1v_2-u_2v_1=5$.', 'كلاهما في المستوى $XY$ (${z}=0$)، و$u_1v_2-u_2v_1=5$.', 'Both in the plane $XY$ (${z}=0$), and $u_1v_2-u_2v_1=5$.'),
        isSolved: (state) => plain(state) && sameVec(handProduct(state), [0, 0, 5])
    },
    {
        id: 119252,
        prompt: say('Egin paralelogramoaren azalera 6 izan dadin.', 'Haz que el área del paralelogramo sea 6.', 'اجعل مساحة متوازي الأضلاع 6.', 'Make the area of the parallelogram 6.'),
        hint: say('Laukizuzen bat: $(2,0,0)$ eta $(0,3,0)$.', 'Un rectángulo: $(2,0,0)$ y $(0,3,0)$.', 'مستطيل: $(2,0,0)$ و$(0,3,0)$.', 'A rectangle: $(2,0,0)$ and $(0,3,0)$.'),
        isSolved: (state) => handAreaSquare(state) === 36
    },
    {
        id: 119253,
        prompt: say('Egin $\\vec{u}\\times\\vec{v}=\\vec{0}$, $\\vec{u}$ eta $\\vec{v}$ nuluak edo berdinak izan gabe.', 'Haz que $\\vec{u}\\times\\vec{v}=\\vec{0}$ sin que $\\vec{u}$ y $\\vec{v}$ sean nulos ni iguales.', 'اجعل $\\vec{u}\\times\\vec{v}=\\vec{0}$ دون أن يكون $\\vec{u}$ و$\\vec{v}$ معدومين أو متساويين.', 'Make $\\vec{u}\\times\\vec{v}=\\vec{0}$ without $\\vec{u}$ and $\\vec{v}$ being zero or equal.'),
        hint: say('Paraleloak: bata bestearen multiploa.', 'Paralelos: uno múltiplo del otro.', 'متوازيان: أحدهما مضاعف للآخر.', 'Parallel: one a multiple of the other.'),
        isSolved: (state) => !isZeroVec(state.u) && !isZeroVec(state.v) && !sameVec(state.u, state.v) && isZeroVec(handProduct(state))
    },
    {
        id: 119254,
        prompt: say('Aldatu ordena ($\\vec{v}\\times\\vec{u}$) eta egin geziak gora seinala dezan.', 'Cambia el orden ($\\vec{v}\\times\\vec{u}$) y haz que la flecha apunte hacia arriba.', 'غيّر الترتيب ($\\vec{v}\\times\\vec{u}$) واجعل السهم يشير إلى الأعلى.', 'Swap the order ($\\vec{v}\\times\\vec{u}$) and make the arrow point up.'),
        hint: say('$\\vec{v}\\times\\vec{u}$ bektorearen ${z}$ koordenatua $v_1u_2-v_2u_1$ da.', 'La ${z}$ de $\\vec{v}\\times\\vec{u}$ es $v_1u_2-v_2u_1$.', 'المركّبة ${z}$ لـ $\\vec{v}\\times\\vec{u}$ هي $v_1u_2-v_2u_1$.', 'The ${z}$ of $\\vec{v}\\times\\vec{u}$ is $v_1u_2-v_2u_1$.'),
        isSolved: (state) => state.swapped && handProduct(state)[2] > 0
    },
    {
        id: 119255,
        prompt: say('Egin $\\vec{u}\\times\\vec{v}$ $x$ ardatzaren paraleloa izan dadin.', 'Haz que $\\vec{u}\\times\\vec{v}$ sea paralelo al eje $x$.', 'اجعل $\\vec{u}\\times\\vec{v}$ موازيًا للمحور $x$.', 'Make $\\vec{u}\\times\\vec{v}$ parallel to the $x$ axis.'),
        hint: say('$\\vec{u}$ eta $\\vec{v}$ $YZ$ planoan ($x=0$) jarri.', 'Pon $\\vec{u}$ y $\\vec{v}$ en el plano $YZ$ ($x=0$).', 'ضع $\\vec{u}$ و$\\vec{v}$ في المستوى $YZ$ ($x=0$).', 'Put $\\vec{u}$ and $\\vec{v}$ in the plane $YZ$ ($x=0$).'),
        isSolved: (state) => plain(state) && handProduct(state)[0] !== 0 && handProduct(state)[1] === 0 && handProduct(state)[2] === 0
    }
]

/** Endless practice: the cross product to reach, from a pair that gives it */
const rightHandMaker: LabChallengeMaker<RightHandState> = (random) => {
    for (;;) {
        const u: Vec3 = [randomInt(random, -2, 2), randomInt(random, -2, 2), randomInt(random, -2, 2)]
        const v: Vec3 = [randomInt(random, -2, 2), randomInt(random, -2, 2), randomInt(random, -2, 2)]
        const product = handProduct({ u, v, swapped: false })
        if (isZeroVec(product) || product.some((value) => Math.abs(value) > 6)) continue
        return {
            prompt: say(`Lortu $\\vec{u}\\times\\vec{v}=${vec(product)}$.`, `Consigue $\\vec{u}\\times\\vec{v}=${vec(product)}$.`, `احصل على $\\vec{u}\\times\\vec{v}=${vec(product)}$.`, `Get $\\vec{u}\\times\\vec{v}=${vec(product)}$.`),
            hint: say(`Bi bektoreek $${vec(product)}$ bektorearekiko perpendikularrak izan behar dute.`, `Los dos vectores tienen que ser perpendiculares a $${vec(product)}$.`, `يجب أن يكون المتجهان عموديين على $${vec(product)}$.`, `Both vectors have to be perpendicular to $${vec(product)}$.`),
            isSolved: (state) => plain(state) && sameVec(handProduct(state), product),
            solution: { u, v, swapped: false, prediction: null }
        }
    }
}

export const rightHandExtra = freshFrom(initialRightHandState, rightHandMaker)
