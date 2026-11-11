import type { FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { add, dot, scale, type Vec3 } from '../../batx2-zientziak-bektoreak/space/vec3.ts'
import { clampTo, clampVec, fractionPoint, levelLatex, nonZeroStep, sameVec, say, tidy, vec } from './common.ts'
import { isFractionPoint } from './foot.ts'

/* ==========================================================================
   L3 · Ispilua (El espejo): the plane n·X = d is a mirror; the point P
   and its symmetric P′ = 2M − P, and a second point Q with its image, so
   the segment PQ is reflected too. P and Q go from −3 to 3, n from −2 to
   2 (never zero) and d from −4 to 4. The learner first predicts whether
   P′ is below the floor, on it or above it (the sign of its z); then M
   and P′ appear, exact. Pure logic.
   ========================================================================== */

export const MIRROR_POINT_LIMIT = 3
export const MIRROR_LIMIT = 2
export const MIRROR_LEVEL_LIMIT = 4

export type MirrorPartName = 'P' | 'Q' | 'n'

export interface MirrorState {
    p: Vec3
    q: Vec3
    n: Vec3
    d: number
    prediction: Prediction | null
}

export const initialMirrorState: MirrorState = { p: [2, 1, 3], q: [-1, 2, 2], n: [0, 0, 1], d: 0, prediction: null }

const settle = (state: MirrorState, next: Omit<MirrorState, 'prediction'>): MirrorState => ({
    ...next,
    prediction: sameVec(next.p, state.p) && sameVec(next.q, state.q) && sameVec(next.n, state.n) && next.d === state.d ? state.prediction : null
})

export const setMirrorPart = (state: MirrorState, name: MirrorPartName, value: Vec3) => settle(state, {
    p: name === 'P' ? clampVec(MIRROR_POINT_LIMIT, value) : state.p,
    q: name === 'Q' ? clampVec(MIRROR_POINT_LIMIT, value) : state.q,
    n: name === 'n' ? nonZeroStep(MIRROR_LIMIT, state.n, value) : state.n,
    d: state.d
})
export const setMirrorLevel = (state: MirrorState, d: number) => settle(state, { ...state, d: clampTo(MIRROR_LEVEL_LIMIT)(d) })
/** The state as the controls would leave it (for the tests) */
export const normalMirrorState = (state: MirrorState): MirrorState =>
    ({ ...setMirrorLevel(setMirrorPart(setMirrorPart(setMirrorPart(state, 'P', state.p), 'Q', state.q), 'n', state.n), state.d), prediction: state.prediction })

type Mirror = Pick<MirrorState, 'n' | 'd'>

/** The foot of a point on the mirror, exact */
export function mirrorFoot({ n, d }: Mirror, point: Vec3): FractionValue[] {
    const bottom = dot(n, n)
    return fractionPoint(add(scale(bottom, point), scale(d - dot(n, point), n)), bottom)
}

/** The symmetric 2M − P, exact */
export function mirrorImage({ n, d }: Mirror, point: Vec3): FractionValue[] {
    const bottom = dot(n, n)
    return fractionPoint(add(scale(bottom, point), scale(2 * (d - dot(n, point)), n)), bottom)
}

/** What the learner predicts: P′ below the floor ('<'), on it ('=') or above it ('>') */
export const mirrorPrediction = (state: MirrorState): Prediction => {
    const z = Math.sign(mirrorImage(state, state.p)[2].numerator)
    return z === 0 ? '=' : z < 0 ? '<' : '>'
}

export const mirrorLabel = (state: Mirror) => levelLatex(state.n, state.d)

export const mirrorChallenges: LabChallenge<MirrorState>[] = [
    {
        id: 121201,
        prompt: say('Lortu $P\'$ jatorria izatea, $P$ jatorria izan gabe.', 'Haz que $P\'$ sea el origen sin que $P$ lo sea.', 'اجعل $P\'$ هي الأصل دون أن تكون $P$ هي الأصل.', 'Make $P\'$ the origin without $P$ being the origin.'),
        hint: say('Ispiluak $P$ eta jatorriaren erdiko puntutik pasatu behar du, $P$ norabideko normalarekin.', 'El espejo tiene que pasar por el punto medio de $P$ y el origen, con normal en la dirección de $P$.', 'يجب أن تمر المرآة بمنتصف $P$ والأصل، وناظمها في اتجاه $P$.', 'The mirror has to go through the midpoint of $P$ and the origin, with its normal along $P$.'),
        isSolved: (state) => isFractionPoint(mirrorImage(state, state.p), [0, 0, 0]) && !sameVec(state.p, [0, 0, 0])
    },
    {
        id: 121202,
        prompt: say('Jarri $P$ ispiluan: $P\'=P$.', 'Pon $P$ en el espejo: $P\'=P$.', 'ضع $P$ في المرآة: $P\'=P$.', 'Put $P$ on the mirror: $P\'=P$.'),
        hint: say('$P$ puntuak planoaren ekuazioa betetzen du.', '$P$ cumple la ecuación del plano.', 'تحقق $P$ معادلة المستوى.', '$P$ satisfies the equation of the plane.'),
        isSolved: (state) => dot(state.n, state.p) === state.d
    },
    {
        id: 121203,
        prompt: say('Lurra ispilu gisa (${z}=0$), lortu $P\'=(1,2,-3)$.', 'Con el suelo como espejo (${z}=0$), consigue $P\'=(1,2,-3)$.', 'مع الأرض مرآةً (${z}=0$) احصل على $P\'=(1,2,-3)$.', 'With the floor as the mirror (${z}=0$), get $P\'=(1,2,-3)$.'),
        hint: say('Lurrean ${z}$ koordenatuaren zeinua bakarrik aldatzen da.', 'En el suelo solo cambia el signo de la ${z}$.', 'على الأرض تتغير إشارة ${z}$ فقط.', 'On the floor only the sign of ${z}$ changes.'),
        isSolved: (state) => state.n[0] === 0 && state.n[1] === 0 && state.d === 0 && isFractionPoint(mirrorImage(state, state.p), [1, 2, -3])
    },
    {
        id: 121204,
        prompt: say('Lortu $P\'$ eta $P$ puntuek ${z}$ bera izatea, $P$ ispiluan egon gabe.', 'Haz que $P\'$ tenga la misma ${z}$ que $P$, sin que $P$ esté en el espejo.', 'اجعل لـ $P\'$ نفس ${z}$ التي لـ $P$ دون أن تكون $P$ في المرآة.', 'Make $P\'$ have the same ${z}$ as $P$, without $P$ being on the mirror.'),
        hint: say('Ispilu bertikal bat: normala horizontala, ${z}$ koordenatua 0.', 'Un espejo vertical: el normal horizontal, con ${z}$ igual a 0.', 'مرآة رأسية: ناظم أفقي مركّبته ${z}$ صفر.', 'A vertical mirror: a horizontal normal, with ${z}$ equal to 0.'),
        isSolved: (state) => state.n[2] === 0 && dot(state.n, state.p) !== state.d
    },
    {
        id: 121205,
        prompt: say('Lortu $PP\'$ zuzenkiak 4 neurtzea.', 'Haz que el segmento $PP\'$ mida 4.', 'اجعل طول القطعة $PP\'$ يساوي 4.', 'Make the segment $PP\'$ measure 4.'),
        hint: say('$PP\'$ distantzia bikoitza da: $P$ ispilutik 2 distantziara.', '$PP\'$ es el doble de la distancia: $P$ a distancia 2 del espejo.', '$PP\'$ ضعف المسافة: $P$ على بعد 2 من المرآة.', '$PP\'$ is twice the distance: $P$ at distance 2 from the mirror.'),
        isSolved: (state) => (dot(state.n, state.p) - state.d) ** 2 === 4 * dot(state.n, state.n)
    }
]

/** Endless practice: a mirror and the image wanted; P is the only point that gives it */
const mirrorMaker: LabChallengeMaker<MirrorState> = (random) => {
    for (;;) {
        const pick = () => randomInt(random, -MIRROR_LIMIT, MIRROR_LIMIT)
        const n: Vec3 = [pick(), pick(), pick()]
        const d = randomInt(random, -MIRROR_LEVEL_LIMIT, MIRROR_LEVEL_LIMIT)
        const target: Vec3 = [randomInt(random, -3, 3), randomInt(random, -3, 3), randomInt(random, -3, 3)]
        if (n.filter((value) => value !== 0).length < 2 || dot(n, target) === d) continue
        const image = mirrorImage({ n, d }, target)
        if (image.some((value) => value.denominator !== 1 || Math.abs(value.numerator) > MIRROR_POINT_LIMIT)) continue
        const p = tidy([image[0].numerator, image[1].numerator, image[2].numerator])
        const plane = levelLatex(n, d)
        return {
            prompt: say(`Ispilua $${plane}$ da. Jarri $P$, haren simetrikoa $${vec(target)}$ izan dadin.`, `El espejo es $${plane}$. Pon $P$ para que su simétrico sea $${vec(target)}$.`, `المرآة هي $${plane}$. ضع $P$ لتكون نظيرتها $${vec(target)}$.`, `The mirror is $${plane}$. Put $P$ so that its symmetric is $${vec(target)}$.`),
            hint: say(`$P$ bera $${vec(target)}$ puntuaren simetrikoa da.`, `$P$ es el simétrico de $${vec(target)}$.`, `$P$ هي نظيرة $${vec(target)}$.`, `$P$ is the symmetric of $${vec(target)}$.`),
            isSolved: (state) => sameVec(state.n, n) && state.d === d && isFractionPoint(mirrorImage(state, state.p), target),
            solution: { p, q: initialMirrorState.q, n, d, prediction: null }
        }
    }
}

export const mirrorExtra = freshFrom(initialMirrorState, mirrorMaker)
