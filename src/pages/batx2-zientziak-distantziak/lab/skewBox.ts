import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { add, cross, dot, scale, type Vec3 } from '../../batx2-zientziak-bektoreak/space/vec3.ts'
import { clampVec, isZeroVec, nonZeroStep, sameVec, say, tidy, vec } from './common.ts'

/* ==========================================================================
   L5 · Gurutzatzen diren zuzenen kutxa (La caja de las que se cruzan):
   r through the origin A with direction u, and s through B with
   direction v (B from −3 to 3, u and v from −2 to 2, never zero). The
   box of AB, u and v: its volume |[AB, u, v]| over its base |u × v| is
   the distance (for parallel lines, |AB × u| / |u|). The learner first
   predicts whether the distance is less than 2, 2 or more; then the
   volume, the base and the distance appear. ▶ slides B along s: the box
   changes, the distance does not. Pure logic.
   ========================================================================== */

export const BOX_POINT_LIMIT = 3
export const BOX_LIMIT = 2

export type SkewPartName = 'B' | 'u' | 'v'

export interface SkewBoxState {
    b: Vec3
    u: Vec3
    v: Vec3
    prediction: Prediction | null
}

export const initialSkewBoxState: SkewBoxState = { b: [1, 1, 3], u: [1, 0, 0], v: [0, 1, 0], prediction: null }

export function setSkewPart(state: SkewBoxState, name: SkewPartName, value: Vec3): SkewBoxState {
    const next = {
        b: name === 'B' ? clampVec(BOX_POINT_LIMIT, value) : state.b,
        u: name === 'u' ? nonZeroStep(BOX_LIMIT, state.u, value) : state.u,
        v: name === 'v' ? nonZeroStep(BOX_LIMIT, state.v, value) : state.v
    }
    return { ...next, prediction: sameVec(next.b, state.b) && sameVec(next.u, state.u) && sameVec(next.v, state.v) ? state.prediction : null }
}
/** The state as the controls would leave it (for the tests) */
export const normalSkewBoxState = (state: SkewBoxState): SkewBoxState =>
    ({ ...setSkewPart(setSkewPart(setSkewPart(state, 'B', state.b), 'u', state.u), 'v', state.v), prediction: state.prediction })

type Lines = Pick<SkewBoxState, 'b' | 'u' | 'v'>

export const skewCross = ({ u, v }: Lines): Vec3 => tidy(cross(u, v))
export const skewMixed = (lines: Lines) => dot(lines.b, skewCross(lines)) + 0
export const isParallel = (lines: Lines) => isZeroVec(skewCross(lines))

/** The square of the distance between r and s, as top / bottom */
export function skewSquare(lines: Lines): [number, number] {
    if (isParallel(lines)) {
        const c = cross(lines.b, lines.u)
        return [dot(c, c), dot(lines.u, lines.u)]
    }
    const w = skewCross(lines)
    return [skewMixed(lines) ** 2, dot(w, w)]
}

/** What the learner predicts: the distance is less than 2 ('<'), 2 ('=') or more ('>') */
export const skewPrediction = (state: SkewBoxState): Prediction => {
    const [top, bottom] = skewSquare(state)
    return top === 4 * bottom ? '=' : top < 4 * bottom ? '<' : '>'
}

/** B moved along s, for the ▶ */
export const slideB = (state: Lines, lambda: number): Vec3 => add(state.b, scale(lambda, state.v))

const distanceIs = (lines: Lines, square: number) => {
    const [top, bottom] = skewSquare(lines)
    return top === square * bottom
}

export const skewBoxChallenges: LabChallenge<SkewBoxState>[] = [
    {
        id: 121301,
        prompt: say('Lortu zuzenak gurutzatzea, 2 distantziara.', 'Haz que las rectas se crucen a distancia 2.', 'اجعل المستقيمين متخالفين على بعد 2.', 'Make the lines skew at distance 2.'),
        hint: say('$\\vec{u}=(1,0,0)$, $\\vec{v}=(0,1,0)$ eta $B$ puntuak ${z}=2$.', '$\\vec{u}=(1,0,0)$, $\\vec{v}=(0,1,0)$ y $B$ con ${z}=2$.', '$\\vec{u}=(1,0,0)$ و$\\vec{v}=(0,1,0)$ و$B$ فيها ${z}=2$.', '$\\vec{u}=(1,0,0)$, $\\vec{v}=(0,1,0)$ and $B$ with ${z}=2$.'),
        isSolved: (state) => !isParallel(state) && skewMixed(state) !== 0 && distanceIs(state, 4)
    },
    {
        id: 121302,
        prompt: say('Lortu zuzenak ebakitzea, $B$ jatorria izan gabe.', 'Haz que las rectas se corten sin que $B$ sea el origen.', 'اجعل المستقيمين متقاطعين دون أن تكون $B$ هي الأصل.', 'Make the lines meet without $B$ being the origin.'),
        hint: say('Biderkadura mistoa 0: $B$ puntua $\\vec{u}$ eta $\\vec{v}$ bektoreen planoan.', 'Producto mixto 0: $B$ en el plano de $\\vec{u}$ y $\\vec{v}$.', 'الجداء المختلط 0: $B$ في مستوى $\\vec{u}$ و$\\vec{v}$.', 'Triple product 0: $B$ in the plane of $\\vec{u}$ and $\\vec{v}$.'),
        isSolved: (state) => !isParallel(state) && skewMixed(state) === 0 && !isZeroVec(state.b)
    },
    {
        id: 121303,
        prompt: say('Lortu zuzenak paraleloak izatea, 1 distantziara.', 'Haz que las rectas sean paralelas a distancia 1.', 'اجعل المستقيمين متوازيين على بعد 1.', 'Make the lines parallel at distance 1.'),
        hint: say('$\\vec{v}$ bektorea $\\vec{u}$ bektorearen multiploa, eta $B$ zuzenetik 1 distantziara.', '$\\vec{v}$ múltiplo de $\\vec{u}$, y $B$ a distancia 1 de $r$.', '$\\vec{v}$ مضاعف لـ $\\vec{u}$، و$B$ على بعد 1 من $r$.', '$\\vec{v}$ a multiple of $\\vec{u}$, and $B$ at distance 1 from $r$.'),
        isSolved: (state) => isParallel(state) && distanceIs(state, 1)
    },
    {
        id: 121304,
        prompt: say('Egin 6 bolumeneko eta 3 azalerako oinarriko kutxa bat. Zein da distantzia?', 'Haz una caja de volumen 6 con base de área 3. ¿Cuál es la distancia?', 'اصنع صندوقًا حجمه 6 ومساحة قاعدته 3. ما المسافة؟', 'Make a box of volume 6 with a base of area 3. What is the distance?'),
        hint: say('$|\\vec{u}\\times\\vec{v}|=3$: probatu $(1,1,0)$ eta $(0,1,2)$.', '$|\\vec{u}\\times\\vec{v}|=3$: prueba $(1,1,0)$ y $(0,1,2)$.', '$|\\vec{u}\\times\\vec{v}|=3$: جرّب $(1,1,0)$ و$(0,1,2)$.', '$|\\vec{u}\\times\\vec{v}|=3$: try $(1,1,0)$ and $(0,1,2)$.'),
        isSolved: (state) => Math.abs(skewMixed(state)) === 6 && dot(skewCross(state), skewCross(state)) === 9
    },
    {
        id: 121305,
        prompt: say('Lortu distantzia $\\sqrt{2}$ izatea.', 'Haz que la distancia sea $\\sqrt{2}$.', 'اجعل المسافة $\\sqrt{2}$.', 'Make the distance $\\sqrt{2}$.'),
        hint: say('Adibidez $\\vec{u}\\times\\vec{v}=(0,-1,1)$ eta biderkadura mistoa 2.', 'Por ejemplo $\\vec{u}\\times\\vec{v}=(0,-1,1)$ y producto mixto 2.', 'مثلًا $\\vec{u}\\times\\vec{v}=(0,-1,1)$ والجداء المختلط 2.', 'For example $\\vec{u}\\times\\vec{v}=(0,-1,1)$ and triple product 2.'),
        isSolved: (state) => distanceIs(state, 2)
    }
]

/** Endless practice: u and v are given and B misses its z: the z that makes the lines meet */
const skewBoxMaker: LabChallengeMaker<SkewBoxState> = (random) => {
    for (;;) {
        const pick = () => randomInt(random, -BOX_LIMIT, BOX_LIMIT)
        const u: Vec3 = [pick(), pick(), pick()]
        const v: Vec3 = [pick(), pick(), pick()]
        const w = cross(u, v)
        if (isZeroVec(u) || isZeroVec(v) || w[2] === 0) continue
        const b = tidy(add(scale(randomInt(random, -1, 1), u), scale([1, -1][randomInt(random, 0, 1)], v)))
        if (b.some((value) => Math.abs(value) > BOX_POINT_LIMIT) || isZeroVec(b)) continue
        const given = `(${b[0]},${b[1]},?)`
        return {
            prompt: say(`$\\vec{u}=${vec(u)}$ eta $\\vec{v}=${vec(v)}$. Jarri $B=${given}$, zuzenak ebaki daitezen.`, `$\\vec{u}=${vec(u)}$ y $\\vec{v}=${vec(v)}$. Pon $B=${given}$ para que las rectas se corten.`, `$\\vec{u}=${vec(u)}$ و$\\vec{v}=${vec(v)}$. ضع $B=${given}$ ليتقاطع المستقيمان.`, `$\\vec{u}=${vec(u)}$ and $\\vec{v}=${vec(v)}$. Set $B=${given}$ so that the lines meet.`),
            hint: say('Kutxa zapalduta: $[\\overrightarrow{AB},\\vec{u},\\vec{v}]=0$.', 'La caja aplastada: $[\\overrightarrow{AB},\\vec{u},\\vec{v}]=0$.', 'الصندوق منضغط: $[\\overrightarrow{AB},\\vec{u},\\vec{v}]=0$.', 'The box flattened: $[\\overrightarrow{AB},\\vec{u},\\vec{v}]=0$.'),
            isSolved: (state) => sameVec(state.u, u) && sameVec(state.v, v) && state.b[0] === b[0] && state.b[1] === b[1] && skewMixed(state) === 0,
            solution: { b, u, v, prediction: null }
        }
    }
}

export const skewBoxExtra = freshFrom(initialSkewBoxState, skewBoxMaker)
