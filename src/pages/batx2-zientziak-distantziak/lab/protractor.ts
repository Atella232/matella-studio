import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { dot, type Vec3 } from '../../batx2-zientziak-bektoreak/space/vec3.ts'
import { angleFromSquare, nonZeroStep, sameVec, say, vec } from './common.ts'

/* ==========================================================================
   L1 · 3D garraiagailua (El transportador 3D): two lines, a line and a
   plane, or two planes, each given by a vector (directions or normals)
   with whole coordinates between −3 and 3, never zero. The learner first
   predicts whether the angle is 0°, acute or 90°; then the dot product,
   the cosine (the sine for a line and a plane) and the angle appear.
   Pure logic.
   ========================================================================== */

export const ANGLE_LIMIT = 3

export type AngleMode = 'lines' | 'line-plane' | 'planes'
export type AngleKind = 'zero' | 'acute' | 'right'

export interface ProtractorState {
    mode: AngleMode
    /** The direction of the first line, or the normal of the first plane */
    a: Vec3
    /** The direction of the second line, the normal of the plane, or the normal of the second plane */
    b: Vec3
    prediction: Prediction | null
}

export const initialProtractorState: ProtractorState = { mode: 'lines', a: [1, 2, 0], b: [0, 1, 1], prediction: null }

export const setAngleMode = (state: ProtractorState, mode: AngleMode): ProtractorState => ({ ...state, mode, prediction: mode === state.mode ? state.prediction : null })
export function setAngleVector(state: ProtractorState, name: 'a' | 'b', value: Vec3): ProtractorState {
    const next = { ...state, [name]: nonZeroStep(ANGLE_LIMIT, state[name], value) }
    return { ...next, prediction: sameVec(next.a, state.a) && sameVec(next.b, state.b) ? state.prediction : null }
}
/** The state as the controls would leave it (for the tests) */
export const normalProtractorState = (state: ProtractorState): ProtractorState => ({ ...setAngleVector(setAngleVector(state, 'a', state.a), 'b', state.b), prediction: state.prediction })

type Pair = Pick<ProtractorState, 'mode' | 'a' | 'b'>

/** (a·b)² and |a|²·|b|²: the square of the cosine (the sine for a line and a plane) is their quotient */
export const angleSquares = ({ a, b }: Pair): [number, number] => [dot(a, b) ** 2, dot(a, a) * dot(b, b)]

export function angleKind(pair: Pair): AngleKind {
    const [top, bottom] = angleSquares(pair)
    const parallel = top === bottom
    const perpendicular = top === 0
    if (pair.mode === 'line-plane') return perpendicular ? 'zero' : parallel ? 'right' : 'acute'
    return parallel ? 'zero' : perpendicular ? 'right' : 'acute'
}

/** The angle in degrees */
export const angleDegrees = (pair: Pair) => {
    const [top, bottom] = angleSquares(pair)
    return angleFromSquare(top, bottom, pair.mode === 'line-plane')
}

/** What the learner predicts: 0° ('<'), acute ('='), 90° ('>') */
export const protractorPrediction = (state: ProtractorState): Prediction => {
    const kind = angleKind(state)
    return kind === 'zero' ? '<' : kind === 'acute' ? '=' : '>'
}

const angleIs = (pair: Pair, quarter: number) => {
    const [top, bottom] = angleSquares(pair)
    return quarter * top === bottom
}
const twoCoordinates = (a: Vec3) => a.filter((value) => value !== 0).length >= 2

export const protractorChallenges: LabChallenge<ProtractorState>[] = [
    {
        id: 121101,
        prompt: say('Bi zuzen: lortu perpendikularrak izatea, norabideak ardatzetan egon gabe.', 'Dos rectas: haz que sean perpendiculares sin que los directores estén en los ejes.', 'مستقيمان: اجعلهما متعامدين دون أن يكون الاتجاهان على المحاور.', 'Two lines: make them perpendicular without the directions lying on the axes.'),
        hint: say('$\\vec{u}\\cdot\\vec{v}=0$, adibidez $(1,1,0)$ eta $(1,-1,1)$.', '$\\vec{u}\\cdot\\vec{v}=0$, por ejemplo $(1,1,0)$ y $(1,-1,1)$.', '$\\vec{u}\\cdot\\vec{v}=0$، مثل $(1,1,0)$ و$(1,-1,1)$.', '$\\vec{u}\\cdot\\vec{v}=0$, for example $(1,1,0)$ and $(1,-1,1)$.'),
        isSolved: (state) => state.mode === 'lines' && angleKind(state) === 'right' && twoCoordinates(state.a) && twoCoordinates(state.b)
    },
    {
        id: 121102,
        prompt: say('Zuzena eta planoa: lortu $90^\\circ$.', 'Recta y plano: consigue $90^\\circ$.', 'مستقيم ومستوى: احصل على $90^\\circ$.', 'Line and plane: get $90^\\circ$.'),
        hint: say('Zuzena planoarekiko perpendikularra: $\\vec{u}$ normalaren paraleloa.', 'Recta perpendicular al plano: $\\vec{u}$ paralelo al normal.', 'مستقيم عمودي على المستوى: $\\vec{u}$ موازٍ للناظم.', 'Line perpendicular to the plane: $\\vec{u}$ parallel to the normal.'),
        isSolved: (state) => state.mode === 'line-plane' && angleKind(state) === 'right'
    },
    {
        id: 121103,
        prompt: say('Bi plano: lortu $0^\\circ$, normal bera erabili gabe.', 'Dos planos: consigue $0^\\circ$ sin usar el mismo normal.', 'مستويان: احصل على $0^\\circ$ دون استعمال الناظم نفسه.', 'Two planes: get $0^\\circ$ without using the same normal.'),
        hint: say('Normal proportzionalak: $(1,1,0)$ eta $(2,2,0)$.', 'Normales proporcionales: $(1,1,0)$ y $(2,2,0)$.', 'ناظمان متناسبان: $(1,1,0)$ و$(2,2,0)$.', 'Proportional normals: $(1,1,0)$ and $(2,2,0)$.'),
        isSolved: (state) => state.mode === 'planes' && angleKind(state) === 'zero' && !sameVec(state.a, state.b)
    },
    {
        id: 121104,
        prompt: say('Bi zuzen: lortu zehazki $60^\\circ$.', 'Dos rectas: consigue exactamente $60^\\circ$.', 'مستقيمان: احصل على $60^\\circ$ بالضبط.', 'Two lines: get exactly $60^\\circ$.'),
        hint: say('$\\cos 60^\\circ=\\frac{1}{2}$: probatu $(1,1,0)$ eta $(1,0,1)$.', '$\\cos 60^\\circ=\\frac{1}{2}$: prueba con $(1,1,0)$ y $(1,0,1)$.', '$\\cos 60^\\circ=\\frac{1}{2}$: جرّب $(1,1,0)$ و$(1,0,1)$.', '$\\cos 60^\\circ=\\frac{1}{2}$: try $(1,1,0)$ and $(1,0,1)$.'),
        isSolved: (state) => state.mode === 'lines' && angleIs(state, 4)
    },
    {
        id: 121105,
        prompt: say('Zuzena eta planoa: lortu zehazki $30^\\circ$.', 'Recta y plano: consigue exactamente $30^\\circ$.', 'مستقيم ومستوى: احصل على $30^\\circ$ بالضبط.', 'Line and plane: get exactly $30^\\circ$.'),
        hint: say('$\\sin 30^\\circ=\\frac{1}{2}$.', '$\\sin 30^\\circ=\\frac{1}{2}$.', '$\\sin 30^\\circ=\\frac{1}{2}$.', '$\\sin 30^\\circ=\\frac{1}{2}$.'),
        isSolved: (state) => state.mode === 'line-plane' && angleIs(state, 4)
    }
]

/** Endless practice: two lines, u given and v missing its z, perpendicular */
const protractorMaker: LabChallengeMaker<ProtractorState> = (random) => {
    for (;;) {
        const pick = () => randomInt(random, -ANGLE_LIMIT, ANGLE_LIMIT)
        const a: Vec3 = [pick(), pick(), pick()]
        const [b1, b2] = [pick(), pick()]
        if (a[2] === 0 || !twoCoordinates(a)) continue
        const top = -(a[0] * b1 + a[1] * b2)
        if (top % a[2] !== 0) continue
        const b: Vec3 = [b1, b2, top / a[2] + 0]
        if (Math.abs(b[2]) > ANGLE_LIMIT || b.every((value) => value === 0)) continue
        const given = `(${b1},${b2},?)`
        return {
            prompt: say(`Bi zuzen: $\\vec{u}=${vec(a)}$. Jarri $\\vec{v}=${given}$, perpendikularrak izan daitezen.`, `Dos rectas: $\\vec{u}=${vec(a)}$. Pon $\\vec{v}=${given}$ para que sean perpendiculares.`, `مستقيمان: $\\vec{u}=${vec(a)}$. ضع $\\vec{v}=${given}$ ليتعامدا.`, `Two lines: $\\vec{u}=${vec(a)}$. Set $\\vec{v}=${given}$ so that they are perpendicular.`),
            hint: say('$\\vec{u}\\cdot\\vec{v}=0$ izan behar da.', 'Tiene que ser $\\vec{u}\\cdot\\vec{v}=0$.', 'يجب أن يكون $\\vec{u}\\cdot\\vec{v}=0$.', 'It has to be $\\vec{u}\\cdot\\vec{v}=0$.'),
            isSolved: (state) => state.mode === 'lines' && sameVec(state.a, a) && state.b[0] === b1 && state.b[1] === b2 && dot(state.a, state.b) === 0,
            solution: { mode: 'lines', a, b, prediction: null }
        }
    }
}

export const protractorExtra = freshFrom(initialProtractorState, protractorMaker)
