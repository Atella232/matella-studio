import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { dot, type Vec3 } from '../../batx2-zientziak-bektoreak/space/vec3.ts'
import { clampVec, generalLatex, isZeroVec, nonZeroStep, proportional, sameVec, say } from './common.ts'

/* ==========================================================================
   L2 · Planoa eta haren normala (El plano y su normal): the plane through
   A with normal n, written as a·x + b·y + c·z + D = 0 with D = −n·A, and
   a test point Q. All whole coordinates between −3 and 3 (n never
   zero). The learner first predicts on which side of the plane Q is: on
   the side n points to, on the plane or on the other side (the sign of
   n·Q + D); then the equation and the value at Q appear. Pure logic.
   ========================================================================== */

export const NORMAL_LIMIT = 3

export type NormalPointName = 'n' | 'A' | 'Q'

export interface PlaneNormalState {
    n: Vec3
    a: Vec3
    q: Vec3
    prediction: Prediction | null
}

export const initialPlaneNormalState: PlaneNormalState = { n: [1, 1, 2], a: [1, 1, 1], q: [0, 0, 3], prediction: null }

export function setNormalPart(state: PlaneNormalState, name: NormalPointName, value: Vec3): PlaneNormalState {
    const next = {
        n: name === 'n' ? nonZeroStep(NORMAL_LIMIT, state.n, value) : state.n,
        a: name === 'A' ? clampVec(NORMAL_LIMIT, value) : state.a,
        q: name === 'Q' ? clampVec(NORMAL_LIMIT, value) : state.q
    }
    return { ...next, prediction: sameVec(next.n, state.n) && sameVec(next.a, state.a) && sameVec(next.q, state.q) ? state.prediction : null }
}

/** The state as the controls would leave it (for the tests) */
export const normalPlaneNormalState = (state: PlaneNormalState): PlaneNormalState =>
    ({ ...setNormalPart(setNormalPart(setNormalPart(state, 'n', state.n), 'A', state.a), 'Q', state.q), prediction: state.prediction })

/** The constant term D = −n·A of the general equation */
export const planeConstant = ({ n, a }: Pick<PlaneNormalState, 'n' | 'a'>) => -dot(n, a) + 0
/** n·Q + D: 0 on the plane, positive on the side n points to */
export const sideValue = (state: Pick<PlaneNormalState, 'n' | 'a' | 'q'>) => dot(state.n, state.q) + planeConstant(state) + 0
export const planeEquation = (state: Pick<PlaneNormalState, 'n' | 'a'>) => generalLatex(state.n, planeConstant(state))

/** What the learner predicts: Q on the other side ('<'), on the plane ('=') or on the side of n ('>') */
export const planeNormalPrediction = (state: PlaneNormalState): Prediction => {
    const value = sideValue(state)
    return value === 0 ? '=' : value < 0 ? '<' : '>'
}

/** The same plane as a·x + b·y + c·z + D = 0 (any multiple of it) */
const isPlane = (state: PlaneNormalState, n: Vec3, D: number) => proportional([...state.n, planeConstant(state)], [...n, D])

export const planeNormalChallenges: LabChallenge<PlaneNormalState>[] = [
    {
        id: 120151,
        prompt: say('Sartu $Q$ planoan, $A$ izan gabe.', 'Mete $Q$ en el plano sin que sea $A$.', 'أدخل $Q$ في المستوى دون أن تكون $A$.', 'Put $Q$ on the plane without it being $A$.'),
        hint: say('Bilatu $Q$, $\\vec{n}\\cdot Q+D=0$ izan dadin.', 'Busca $Q$ con $\\vec{n}\\cdot Q+D=0$.', 'ابحث عن $Q$ بحيث $\\vec{n}\\cdot Q+D=0$.', 'Find $Q$ with $\\vec{n}\\cdot Q+D=0$.'),
        isSolved: (state) => sideValue(state) === 0 && !sameVec(state.q, state.a)
    },
    {
        id: 120152,
        prompt: say('Lortu planoa $2x-y+{z}-3=0$ izatea.', 'Haz que el plano sea $2x-y+{z}-3=0$.', 'اجعل المستوى $2x-y+{z}-3=0$.', 'Make the plane $2x-y+{z}-3=0$.'),
        hint: say('$\\vec{n}=(2,-1,1)$, eta $A$ puntuak ekuazioa bete behar du.', '$\\vec{n}=(2,-1,1)$, y $A$ tiene que cumplir la ecuación.', '$\\vec{n}=(2,-1,1)$، ويجب أن تحقق $A$ المعادلة.', '$\\vec{n}=(2,-1,1)$, and $A$ has to satisfy the equation.'),
        isSolved: (state) => isPlane(state, [2, -1, 1], -3)
    },
    {
        id: 120153,
        prompt: say('Jarri lurraren paraleloa den plano bat, 2 altueran.', 'Pon un plano paralelo al suelo a altura 2.', 'ضع مستوى موازيًا للأرض على ارتفاع 2.', 'Set a plane parallel to the floor at height 2.'),
        hint: say('Normala bertikala da, $(0,0,1)$, eta $A$ puntuak ${z}=2$ du.', 'El normal es vertical, $(0,0,1)$, y $A$ tiene ${z}=2$.', 'الناظم عمودي، $(0,0,1)$، و$A$ فيها ${z}=2$.', 'The normal is vertical, $(0,0,1)$, and $A$ has ${z}=2$.'),
        isSolved: (state) => state.n[0] === 0 && state.n[1] === 0 && state.a[2] === 2
    },
    {
        id: 120154,
        prompt: say('Lortu $D=0$ izatea, $A$ jatorria izan gabe.', 'Consigue $D=0$ sin que $A$ sea el origen.', 'اجعل $D=0$ دون أن تكون $A$ هي الأصل.', 'Get $D=0$ without $A$ being the origin.'),
        hint: say('$D=0$ denean, planoa jatorritik pasatzen da: $\\vec{n}\\cdot A=0$.', 'Con $D=0$ el plano pasa por el origen: $\\vec{n}\\cdot A=0$.', 'عندما $D=0$ يمر المستوى بالأصل: $\\vec{n}\\cdot A=0$.', 'With $D=0$ the plane goes through the origin: $\\vec{n}\\cdot A=0$.'),
        isSolved: (state) => planeConstant(state) === 0 && !isZeroVec(state.a)
    },
    {
        id: 120155,
        prompt: say('Jarri $(t,2t,-t)$ zuzenarekiko perpendikularra den eta $(1,1,1)$ puntutik pasatzen den planoa.', 'Pon el plano perpendicular a la recta $(t,2t,-t)$ que pasa por $(1,1,1)$.', 'ضع المستوى العمودي على المستقيم $(t,2t,-t)$ والمار بـ $(1,1,1)$.', 'Set the plane perpendicular to the line $(t,2t,-t)$ through $(1,1,1)$.'),
        hint: say('Zuzenaren norabidea planoaren normala da: $(1,2,-1)$.', 'El director de la recta es el normal del plano: $(1,2,-1)$.', 'متجه توجيه المستقيم هو ناظم المستوى: $(1,2,-1)$.', 'The direction of the line is the normal of the plane: $(1,2,-1)$.'),
        isSolved: (state) => isPlane(state, [1, 2, -1], -2)
    }
]

/** Endless practice: a general equation to set on the board */
const planeNormalMaker: LabChallengeMaker<PlaneNormalState> = (random) => {
    for (;;) {
        const pick = () => randomInt(random, -NORMAL_LIMIT, NORMAL_LIMIT)
        const n: Vec3 = [randomInt(random, -2, 2), randomInt(random, -2, 2), randomInt(random, -2, 2)]
        if (n.filter((value) => value !== 0).length < 2) continue
        const a: Vec3 = [pick(), pick(), pick()]
        const D = -dot(n, a) + 0
        const equation = generalLatex(n, D)
        return {
            prompt: say(`Jarri $${equation}$ planoa.`, `Coloca el plano $${equation}$.`, `ضع المستوى $${equation}$.`, `Set the plane $${equation}$.`),
            hint: say('Normala: $x$, $y$ eta ${z}$ aldagaien koefizienteak. Gero, ekuazioa betetzen duen puntu bat.', 'El normal: los coeficientes de $x$, $y$ y ${z}$. Después, un punto que cumpla la ecuación.', 'الناظم: معاملات $x$ و$y$ و${z}$. ثم نقطة تحقق المعادلة.', 'The normal: the coefficients of $x$, $y$ and ${z}$. Then a point that satisfies the equation.'),
            isSolved: (state) => sameVec(state.n, n) && planeConstant(state) === D,
            solution: { n, a, q: initialPlaneNormalState.q, prediction: null }
        }
    }
}

export const planeNormalExtra = freshFrom(initialPlaneNormalState, planeNormalMaker)
