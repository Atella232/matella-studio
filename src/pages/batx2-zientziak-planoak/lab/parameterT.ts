import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { add, scale, type Vec3 } from '../../batx2-zientziak-bektoreak/space/vec3.ts'
import { clampTo, clampVec, isZeroVec, nonZeroStep, sameVec, say, vec } from './common.ts'

/* ==========================================================================
   L1 · t parametroa (El parámetro t): the line r through A with
   direction u, and the point P = A + t·u of one value of t. A and u
   have whole coordinates (−2…2, u never zero) and t goes from −2 to 2,
   so P always stays inside the board (|coordinate| ≤ 6). The learner
   first predicts whether P is above the floor, on it or below it (the
   sign of its z); then P, its coordinates and the continuous equation
   of r appear. Pure logic.
   ========================================================================== */

export const LINE_LIMIT = 2
export const T_LIMIT = 2
/** The box of the drawing: |A| + |t|·|u| never goes beyond it */
export const LINE_RANGE = LINE_LIMIT + T_LIMIT * LINE_LIMIT

export interface ParameterState {
    a: Vec3
    u: Vec3
    t: number
    prediction: Prediction | null
}

export const initialParameterState: ParameterState = { a: [1, -1, 2], u: [1, 1, -1], t: 1, prediction: null }

/** A new state: the prediction is kept only when nothing moved */
const settle = (state: ParameterState, next: Omit<ParameterState, 'prediction'>): ParameterState => ({
    ...next,
    prediction: sameVec(next.a, state.a) && sameVec(next.u, state.u) && next.t === state.t ? state.prediction : null
})

export const setLinePoint = (state: ParameterState, value: Vec3) => settle(state, { a: clampVec(LINE_LIMIT, value), u: state.u, t: state.t })
export const setLineDirection = (state: ParameterState, value: Vec3) => settle(state, { a: state.a, u: nonZeroStep(LINE_LIMIT, state.u, value), t: state.t })
export const setParameter = (state: ParameterState, t: number) => settle(state, { a: state.a, u: state.u, t: clampTo(T_LIMIT)(t) })
/** The state as the controls would leave it (for the tests) */
export const normalParameterState = (state: ParameterState): ParameterState => ({ ...setParameter(setLineDirection(setLinePoint(state, state.a), state.u), state.t), prediction: state.prediction })

/** The point of the line for the chosen t */
export const linePoint = ({ a, u, t }: Pick<ParameterState, 'a' | 'u' | 't'>): Vec3 => {
    const [x, y, z] = add(a, scale(t, u))
    return [x + 0, y + 0, z + 0]
}

/** What the learner predicts: P below the floor ('<'), on it ('=') or above it ('>') */
export const parameterPrediction = (state: ParameterState): Prediction => {
    const z = linePoint(state)[2]
    return z === 0 ? '=' : z < 0 ? '<' : '>'
}

/** The continuous equation of the line through a with direction u; coordinates with no change are written apart (x = 2) */
export function continuousLatex(a: Vec3, u: Vec3): string {
    const names = ['x', 'y', '{z}']
    const minus = (name: string, value: number) => (value === 0 ? name : value < 0 ? `${name}+${-value}` : `${name}-${value}`)
    const moving = [0, 1, 2].filter((index) => u[index] !== 0)
    const still = [0, 1, 2].filter((index) => u[index] === 0).map((index) => `${names[index]}=${a[index] + 0}`)
    const fractions = moving.length > 1 ? moving.map((index) => `\\frac{${minus(names[index], a[index])}}{${u[index]}}`).join('=') : ''
    return [fractions, ...still].filter(Boolean).join(',\\ ')
}

export const parameterChallenges: LabChallenge<ParameterState>[] = [
    {
        id: 120101,
        prompt: say('Eraman $P$ lurrera (${z}=0$), zuzena lurrean egon gabe.', 'Lleva $P$ al suelo (${z}=0$) sin que la recta esté en el suelo.', 'انقل $P$ إلى الأرض (${z}=0$) دون أن يكون المستقيم على الأرض.', 'Take $P$ to the floor (${z}=0$) without the line lying on the floor.'),
        hint: say('Aukeratu $t$ zenbakia, $a_3+t\\,u_3=0$ izan dadin.', 'Elige $t$ para que $a_3+t\\,u_3=0$.', 'اختر $t$ بحيث $a_3+t\\,u_3=0$.', 'Choose $t$ so that $a_3+t\\,u_3=0$.'),
        isSolved: (state) => linePoint(state)[2] === 0 && state.u[2] !== 0
    },
    {
        id: 120102,
        prompt: say('Jarri $A(1,0,2)$ eta $B(3,1,0)$ puntuetatik pasatzen den zuzena, $P$ puntua $B$ puntuan dagoela.', 'Pon la recta que pasa por $A(1,0,2)$ y $B(3,1,0)$, con $P$ en $B$.', 'ضع المستقيم المار بـ $A(1,0,2)$ و$B(3,1,0)$، مع $P$ في $B$.', 'Set the line through $A(1,0,2)$ and $B(3,1,0)$, with $P$ at $B$.'),
        hint: say('Norabidea: $\\overrightarrow{AB}=(2,1,-2)$, eta $t=1$.', 'El director: $\\overrightarrow{AB}=(2,1,-2)$, y $t=1$.', 'متجه التوجيه: $\\overrightarrow{AB}=(2,1,-2)$، و$t=1$.', 'The direction: $\\overrightarrow{AB}=(2,1,-2)$, and $t=1$.'),
        isSolved: (state) => sameVec(state.a, [1, 0, 2]) && sameVec(linePoint(state), [3, 1, 0])
    },
    {
        id: 120103,
        prompt: say('Jarri ${z}$ ardatzaren paraleloa den zuzen bat, $(2,1,0)$ puntutik pasatzen dena.', 'Pon una recta paralela al eje ${z}$ que pase por $(2,1,0)$.', 'ضع مستقيمًا موازيًا للمحور ${z}$ يمر بـ $(2,1,0)$.', 'Set a line parallel to the ${z}$ axis through $(2,1,0)$.'),
        hint: say('Norabidea $(0,0,1)$ da, eta $A$ puntuak $x=2$ eta $y=1$ ditu.', 'El director es $(0,0,1)$, y $A$ tiene $x=2$ e $y=1$.', 'متجه التوجيه $(0,0,1)$، و$A$ فيها $x=2$ و$y=1$.', 'The direction is $(0,0,1)$, and $A$ has $x=2$ and $y=1$.'),
        isSolved: (state) => state.u[0] === 0 && state.u[1] === 0 && state.a[0] === 2 && state.a[1] === 1
    },
    {
        id: 120104,
        prompt: say('$t=-1$ denean, lortu $P$ jatorria izatea.', 'Con $t=-1$, consigue que $P$ sea el origen.', 'عندما $t=-1$ اجعل $P$ هي الأصل.', 'With $t=-1$, make $P$ the origin.'),
        hint: say('$A-\\vec{u}=(0,0,0)$: $A$ eta $\\vec{u}$ berdinak.', '$A-\\vec{u}=(0,0,0)$: $A$ y $\\vec{u}$ iguales.', '$A-\\vec{u}=(0,0,0)$: ‏$A$ و$\\vec{u}$ متساويان.', '$A-\\vec{u}=(0,0,0)$: $A$ and $\\vec{u}$ equal.'),
        isSolved: (state) => state.t === -1 && isZeroVec(linePoint(state))
    },
    {
        id: 120105,
        prompt: say('Jarri taulan $\\frac{x-2}{1}=\\frac{y+1}{2}=\\frac{{z}}{-1}$ zuzena.', 'Pon en el tablero la recta $\\frac{x-2}{1}=\\frac{y+1}{2}=\\frac{{z}}{-1}$.', 'ضع على اللوحة المستقيم $\\frac{x-2}{1}=\\frac{y+1}{2}=\\frac{{z}}{-1}$.', 'Set the line $\\frac{x-2}{1}=\\frac{y+1}{2}=\\frac{{z}}{-1}$ on the board.'),
        hint: say('Zenbakitzaileek puntua ematen dute, zeinua aldatuta; izendatzaileek, norabidea.', 'Los numeradores dan el punto, con el signo cambiado; los denominadores, el director.', 'البسوط تعطي النقطة بإشارة معكوسة، والمقامات تعطي الاتجاه.', 'The numerators give the point, with the sign changed; the denominators, the direction.'),
        isSolved: (state) => sameVec(state.a, [2, -1, 0]) && sameVec(state.u, [1, 2, -1])
    }
]

/** Endless practice: a fixed line and the point P has to reach */
const parameterMaker: LabChallengeMaker<ParameterState> = (random) => {
    for (;;) {
        const pick = () => randomInt(random, -LINE_LIMIT, LINE_LIMIT)
        const a: Vec3 = [pick(), pick(), pick()]
        const u: Vec3 = [pick(), pick(), pick()]
        if (u.filter((value) => value !== 0).length < 2) continue
        const t = [-2, -1, 1, 2][randomInt(random, 0, 3)]
        const p = linePoint({ a, u, t })
        return {
            prompt: say(`$A=${vec(a)}$ eta $\\vec{u}=${vec(u)}$ direla, eraman $P$ puntua $${vec(p)}$ puntura.`, `Con $A=${vec(a)}$ y $\\vec{u}=${vec(u)}$, lleva $P$ a $${vec(p)}$.`, `مع $A=${vec(a)}$ و$\\vec{u}=${vec(u)}$ انقل $P$ إلى $${vec(p)}$.`, `With $A=${vec(a)}$ and $\\vec{u}=${vec(u)}$, take $P$ to $${vec(p)}$.`),
            hint: say('Bilatu $t$, $\\vec{u}$ bektorearen 0 ez den koordenatu batekin.', 'Busca $t$ con una coordenada de $\\vec{u}$ que no sea 0.', 'ابحث عن $t$ بمركّبة من $\\vec{u}$ ليست 0.', 'Find $t$ with a coordinate of $\\vec{u}$ that is not 0.'),
            isSolved: (state) => sameVec(state.a, a) && sameVec(state.u, u) && sameVec(linePoint(state), p),
            solution: { a, u, t, prediction: null }
        }
    }
}

export const parameterExtra = freshFrom(initialParameterState, parameterMaker)
