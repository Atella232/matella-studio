import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { dot, type Vec3 } from '../../batx2-zientziak-bektoreak/space/vec3.ts'
import { sameVec, say, vec } from './common.ts'
import { distanceSquare, isFractionPoint, footPoint, normalFootState, setFootLevel, type FootState } from './foot.ts'

/* ==========================================================================
   L4 · Distantziaren erregela (La regla de la distancia): the point P
   and a plane n·X = d or a line A + t·u, as in L2, but the plane can go
   further (d from −9 to 9). The learner first predicts whether the
   distance is less than 3, exactly 3 or more; then the formula and the
   distance appear (exact, from its square), with the perpendicular
   segment drawn. Pure logic; the shapes and their setters are those of
   foot.ts.
   ========================================================================== */

export const RULER_LEVEL_LIMIT = 9
export type RulerState = FootState

export const initialRulerState: RulerState = { mode: 'plane', p: [1, 2, 2], n: [0, 0, 1], d: 0, a: [0, 0, 0], u: [1, 1, 0], prediction: null }
export const setRulerLevel = (state: RulerState, d: number) => setFootLevel(state, d, RULER_LEVEL_LIMIT)
/** The state as the controls would leave it (for the tests) */
export const normalRulerState = (state: RulerState): RulerState => ({ ...setRulerLevel(normalFootState({ ...state, d: 0 }), state.d), prediction: state.prediction })

/** What the learner predicts: the distance is less than 3 ('<'), 3 ('=') or more ('>') */
export const rulerPrediction = (state: RulerState): Prediction => {
    const [top, bottom] = distanceSquare(state)
    return top === 9 * bottom ? '=' : top < 9 * bottom ? '<' : '>'
}

const distanceIs = (state: RulerState, square: number) => {
    const [top, bottom] = distanceSquare(state)
    return top === square * bottom
}

export const rulerChallenges: LabChallenge<RulerState>[] = [
    {
        id: 121251,
        prompt: say('Planoa: jarri $P$ planotik zehazki 3 distantziara.', 'Plano: pon $P$ a distancia exactamente 3 del plano.', 'مستوى: ضع $P$ على بعد 3 بالضبط من المستوى.', 'Plane: put $P$ exactly 3 away from the plane.'),
        hint: say('${z}=0$ planoarekin, ${z}=3$ duen puntu bat.', 'Con el plano ${z}=0$, un punto con ${z}=3$.', 'مع المستوى ${z}=0$، نقطة فيها ${z}=3$.', 'With the plane ${z}=0$, a point with ${z}=3$.'),
        isSolved: (state) => state.mode === 'plane' && distanceIs(state, 9)
    },
    {
        id: 121252,
        prompt: say('Planoa: $2x+y+2{z}=0$ planoarekin, jarri $P$ 1 distantziara.', 'Plano: con $2x+y+2{z}=0$, pon $P$ a distancia 1.', 'مستوى: مع $2x+y+2{z}=0$ ضع $P$ على بعد 1.', 'Plane: with $2x+y+2{z}=0$, put $P$ at distance 1.'),
        hint: say('$|2x+y+2{z}|=3$ izan behar da.', 'Tiene que ser $|2x+y+2{z}|=3$.', 'يجب أن يكون $|2x+y+2{z}|=3$.', 'It has to be $|2x+y+2{z}|=3$.'),
        isSolved: (state) => state.mode === 'plane' && sameVec(state.n, [2, 1, 2]) && state.d === 0 && distanceIs(state, 1)
    },
    {
        id: 121253,
        prompt: say('Zuzena: $x$ ardatza hartuta, jarri $P$ $\\sqrt{8}$ distantziara.', 'Recta: con el eje $x$, pon $P$ a distancia $\\sqrt{8}$.', 'مستقيم: مع المحور $x$ ضع $P$ على بعد $\\sqrt{8}$.', 'Line: with the $x$ axis, put $P$ at distance $\\sqrt{8}$.'),
        hint: say('$y^2+{z}^2=8$: adibidez $y=2$ eta ${z}=2$.', '$y^2+{z}^2=8$: por ejemplo $y=2$ y ${z}=2$.', '$y^2+{z}^2=8$: مثلًا $y=2$ و${z}=2$.', '$y^2+{z}^2=8$: for example $y=2$ and ${z}=2$.'),
        isSolved: (state) => state.mode === 'line' && state.a[1] === 0 && state.a[2] === 0 && state.u[1] === 0 && state.u[2] === 0 && distanceIs(state, 8)
    },
    {
        id: 121254,
        prompt: say('Planoa: $P$ jatorrian dagoela, mugitu planoa jatorritik 2 distantziara gera dadin.', 'Plano: con $P$ en el origen, mueve el plano para que quede a distancia 2.', 'مستوى: مع $P$ في الأصل حرّك المستوى ليصبح على بعد 2.', 'Plane: with $P$ at the origin, move the plane so that it is 2 away.'),
        hint: say('$\\frac{|d|}{|\\vec{n}|}=2$.', '$\\frac{|d|}{|\\vec{n}|}=2$.', '$\\frac{|d|}{|\\vec{n}|}=2$.', '$\\frac{|d|}{|\\vec{n}|}=2$.'),
        isSolved: (state) => state.mode === 'plane' && sameVec(state.p, [0, 0, 0]) && distanceIs(state, 4)
    },
    {
        id: 121255,
        prompt: say('Zuzena: lortu distantzia 0 izatea, $P$ puntua $A$ izan gabe.', 'Recta: haz que la distancia sea 0 sin que $P$ sea $A$.', 'مستقيم: اجعل المسافة 0 دون أن تكون $P$ هي $A$.', 'Line: make the distance 0 without $P$ being $A$.'),
        hint: say('$P$ zuzenean: $P=A+t\\,\\vec{u}$.', '$P$ en la recta: $P=A+t\\,\\vec{u}$.', '$P$ على المستقيم: $P=A+t\\,\\vec{u}$.', '$P$ on the line: $P=A+t\\,\\vec{u}$.'),
        isSolved: (state) => state.mode === 'line' && distanceIs(state, 0) && !sameVec(state.p, state.a)
    }
]

/** Normals with a whole magnitude, so that the distance comes out whole */
const WHOLE_NORMALS: Vec3[] = [[1, 2, 2], [2, 1, 2], [2, 2, 1], [0, 0, 1], [0, 1, 0], [1, 0, 0], [2, -1, 2], [1, -2, 2], [2, 2, -1]]

/** Endless practice: P and the normal are given; the d (beyond P) that puts the plane at a whole distance */
const rulerMaker: LabChallengeMaker<RulerState> = (random) => {
    for (;;) {
        const n = WHOLE_NORMALS[randomInt(random, 0, WHOLE_NORMALS.length - 1)]
        const p: Vec3 = [randomInt(random, -2, 2), randomInt(random, -2, 2), randomInt(random, -2, 2)]
        const k = randomInt(random, 1, 2)
        const size = Math.sqrt(dot(n, n))
        const d = dot(n, p) + k * size
        if (Math.abs(d) > RULER_LEVEL_LIMIT) continue
        const np = dot(n, p) + 0
        return {
            prompt: say(`$P=${vec(p)}$ eta $\\vec{n}=${vec(n)}$. Aukeratu $d>${np}$, planoa $P$ puntutik ${k} distantziara egon dadin.`, `$P=${vec(p)}$ y $\\vec{n}=${vec(n)}$. Elige $d>${np}$ para que el plano quede a distancia ${k} de $P$.`, `$P=${vec(p)}$ و$\\vec{n}=${vec(n)}$. اختر $d>${np}$ ليكون المستوى على بعد ${k} من $P$.`, `$P=${vec(p)}$ and $\\vec{n}=${vec(n)}$. Choose $d>${np}$ so that the plane is ${k} away from $P$.`),
            hint: say(`$\\frac{|d-${np < 0 ? `(${np})` : np}|}{${size}}=${k}$`, `$\\frac{|d-${np < 0 ? `(${np})` : np}|}{${size}}=${k}$`, `$\\frac{|d-${np < 0 ? `(${np})` : np}|}{${size}}=${k}$`, `$\\frac{|d-${np < 0 ? `(${np})` : np}|}{${size}}=${k}$`),
            isSolved: (state) => state.mode === 'plane' && sameVec(state.p, p) && sameVec(state.n, n) && state.d === d,
            solution: { ...initialRulerState, mode: 'plane', p, n, d, prediction: null }
        }
    }
}

export const rulerExtra = freshFrom(initialRulerState, rulerMaker)

/** For the readout: the foot, to draw the perpendicular segment */
export { footPoint, isFractionPoint }
