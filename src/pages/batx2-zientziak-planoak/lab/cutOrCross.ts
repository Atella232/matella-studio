import { fraction, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { add, cross, det3, dot, scale, sub, type Vec3 } from '../../batx2-zientziak-bektoreak/space/vec3.ts'
import { clampVec, fractionPoint, isZeroVec, nonZeroStep, sameVec, say, tidy, vec } from './common.ts'

/* ==========================================================================
   L3 · Ebakitzen dira ala gurutzatzen? (¿Se cortan o se cruzan?): the
   lines r = A + t·u and s = B + λ·v, with whole coordinates between −2
   and 2 (u and v never zero). The learner first predicts whether they
   meet, are parallel (or the same line) or are skew; then u × v, the
   scalar triple product [AB, u, v] and, when they meet, the exact
   meeting point appear. Pure logic.
   ========================================================================== */

export const PAIR_LIMIT = 2

export type PairPartName = 'A' | 'u' | 'B' | 'v'
export type PairKind = 'meet' | 'parallel' | 'same' | 'skew'

export interface CutOrCrossState {
    a: Vec3
    u: Vec3
    b: Vec3
    v: Vec3
    prediction: Prediction | null
}

export const initialCutOrCrossState: CutOrCrossState = { a: [1, 0, 0], u: [0, 1, 0], b: [0, 0, 1], v: [1, 0, 0], prediction: null }

export function setPairPart(state: CutOrCrossState, name: PairPartName, value: Vec3): CutOrCrossState {
    const next = {
        a: name === 'A' ? clampVec(PAIR_LIMIT, value) : state.a,
        u: name === 'u' ? nonZeroStep(PAIR_LIMIT, state.u, value) : state.u,
        b: name === 'B' ? clampVec(PAIR_LIMIT, value) : state.b,
        v: name === 'v' ? nonZeroStep(PAIR_LIMIT, state.v, value) : state.v
    }
    const same = sameVec(next.a, state.a) && sameVec(next.u, state.u) && sameVec(next.b, state.b) && sameVec(next.v, state.v)
    return { ...next, prediction: same ? state.prediction : null }
}

/** The state as the controls would leave it (for the tests) */
export const normalCutOrCrossState = (state: CutOrCrossState): CutOrCrossState => {
    const parts: Array<[PairPartName, Vec3]> = [['A', state.a], ['u', state.u], ['B', state.b], ['v', state.v]]
    return { ...parts.reduce((current, [name, value]) => setPairPart(current, name, value), state), prediction: state.prediction }
}

type Pair = Pick<CutOrCrossState, 'a' | 'u' | 'b' | 'v'>

export const pairCross = ({ u, v }: Pair): Vec3 => tidy(cross(u, v))
/** [AB, u, v]: 0 when the two lines lie in one plane */
export const pairMixed = ({ a, u, b, v }: Pair) => det3(sub(b, a), u, v) + 0

export function pairKind(pair: Pair): PairKind {
    if (isZeroVec(pairCross(pair))) return isZeroVec(cross(sub(pair.b, pair.a), pair.u)) ? 'same' : 'parallel'
    return pairMixed(pair) === 0 ? 'meet' : 'skew'
}

/** What the learner predicts: they meet ('<'), parallel or the same line ('='), skew ('>') */
export const cutOrCrossPrediction = (state: CutOrCrossState): Prediction => {
    const kind = pairKind(state)
    return kind === 'meet' ? '<' : kind === 'skew' ? '>' : '='
}

/** The exact meeting point, when the lines meet: A + t·u with t = ((B − A) × v)·(u × v) / |u × v|² */
export function meetingPoint(pair: Pair): FractionValue[] | null {
    if (pairKind(pair) !== 'meet') return null
    const c = pairCross(pair)
    const square = dot(c, c)
    const top = dot(cross(sub(pair.b, pair.a), pair.v), c)
    return fractionPoint(add(scale(square, pair.a), scale(top, pair.u)), square)
}

const isPoint = (point: FractionValue[] | null, target: Vec3) => point !== null && point.every((value, index) => value.numerator === target[index] * value.denominator)

export const cutOrCrossChallenges: LabChallenge<CutOrCrossState>[] = [
    {
        id: 120201,
        prompt: say('Lortu zuzenak ebakitzea, ez $A$ puntuan ez $B$ puntuan.', 'Haz que se corten en un punto que no sea ni $A$ ni $B$.', 'اجعلهما يتقاطعان في نقطة ليست $A$ ولا $B$.', 'Make them meet at a point that is neither $A$ nor $B$.'),
        hint: say('Jarri biak plano berean, adibidez ${z}=0$ planoan, norabide desberdinekin.', 'Pon las dos en un mismo plano, por ejemplo ${z}=0$, con direcciones distintas.', 'ضع الاثنين في مستوى واحد، مثل ${z}=0$، باتجاهين مختلفين.', 'Put both in one plane, for example ${z}=0$, with different directions.'),
        isSolved: (state) => {
            const point = meetingPoint(state)
            return point !== null && !isPoint(point, state.a) && !isPoint(point, state.b)
        }
    },
    {
        id: 120202,
        prompt: say('$r$ zuzena $x$ ardatza izanik, lortu $s$ gurutzatzea.', 'Con $r$ en el eje $x$, haz que $s$ se cruce con ella.', 'مع $r$ على المحور $x$ اجعل $s$ يتخالف معه.', 'With $r$ on the $x$ axis, make $s$ skew to it.'),
        hint: say('$r$: $A=(0,0,0)$ eta $\\vec{u}=(1,0,0)$. $s$: lurretik kanpo, $y$ ardatzaren paraleloa.', '$r$: $A=(0,0,0)$ y $\\vec{u}=(1,0,0)$. $s$: fuera del suelo, paralela al eje $y$.', '$r$: ‏$A=(0,0,0)$ و$\\vec{u}=(1,0,0)$. ‏$s$: خارج الأرض وموازٍ للمحور $y$.', '$r$: $A=(0,0,0)$ and $\\vec{u}=(1,0,0)$. $s$: off the floor, parallel to the $y$ axis.'),
        isSolved: (state) => state.a[1] === 0 && state.a[2] === 0 && state.u[1] === 0 && state.u[2] === 0 && pairKind(state) === 'skew'
    },
    {
        id: 120203,
        prompt: say('Lortu zuzenak paraleloak eta desberdinak izatea.', 'Haz que sean paralelas y distintas.', 'اجعلهما متوازيين ومختلفين.', 'Make them parallel and different.'),
        hint: say('$\\vec{v}$ bektorea $\\vec{u}$ bektorearen multiploa, eta $B$ puntua $r$ zuzenetik kanpo.', '$\\vec{v}$ múltiplo de $\\vec{u}$, y $B$ fuera de $r$.', '$\\vec{v}$ مضاعف لـ $\\vec{u}$، و$B$ خارج $r$.', '$\\vec{v}$ a multiple of $\\vec{u}$, and $B$ off $r$.'),
        isSolved: (state) => pairKind(state) === 'parallel'
    },
    {
        id: 120204,
        prompt: say('Lortu zuzenak bat etortzea, $B$ puntua $A$ izan gabe.', 'Haz que coincidan sin que $B$ sea $A$.', 'اجعلهما منطبقين دون أن تكون $B$ هي $A$.', 'Make them the same line without $B$ being $A$.'),
        hint: say('$B$ puntua $r$ zuzenean: $B=A+t\\,\\vec{u}$; eta $\\vec{v}$ bektorea $\\vec{u}$ bektorearen paraleloa.', '$B$ en $r$: $B=A+t\\,\\vec{u}$; y $\\vec{v}$ paralelo a $\\vec{u}$.', '$B$ على $r$: ‏$B=A+t\\,\\vec{u}$؛ و$\\vec{v}$ موازٍ لـ $\\vec{u}$.', '$B$ on $r$: $B=A+t\\,\\vec{u}$; and $\\vec{v}$ parallel to $\\vec{u}$.'),
        isSolved: (state) => pairKind(state) === 'same' && !sameVec(state.a, state.b)
    },
    {
        id: 120205,
        prompt: say('$\\vec{u}=(1,0,0)$ eta $\\vec{v}=(0,1,0)$ direla, lortu $(2,1,1)$ puntuan ebakitzea.', 'Con $\\vec{u}=(1,0,0)$ y $\\vec{v}=(0,1,0)$, haz que se corten en $(2,1,1)$.', 'مع $\\vec{u}=(1,0,0)$ و$\\vec{v}=(0,1,0)$ اجعلهما يتقاطعان في $(2,1,1)$.', 'With $\\vec{u}=(1,0,0)$ and $\\vec{v}=(0,1,0)$, make them meet at $(2,1,1)$.'),
        hint: say('$r$ zuzenak $y=1$ eta ${z}=1$ ditu; $s$ zuzenak $x=2$ eta ${z}=1$.', '$r$ tiene $y=1$ y ${z}=1$; $s$, $x=2$ y ${z}=1$.', '$r$ فيه $y=1$ و${z}=1$؛ و$s$ فيه $x=2$ و${z}=1$.', '$r$ has $y=1$ and ${z}=1$; $s$, $x=2$ and ${z}=1$.'),
        isSolved: (state) => sameVec(state.u, [1, 0, 0]) && sameVec(state.v, [0, 1, 0]) && isPoint(meetingPoint(state), [2, 1, 1])
    }
]

/** Endless practice: r and the direction of s are given, and B misses its z */
const cutOrCrossMaker: LabChallengeMaker<CutOrCrossState> = (random) => {
    for (;;) {
        const pick = () => randomInt(random, -PAIR_LIMIT, PAIR_LIMIT)
        const a: Vec3 = [pick(), pick(), pick()]
        const u: Vec3 = [pick(), pick(), pick()]
        const v: Vec3 = [pick(), pick(), pick()]
        const c = cross(u, v)
        // u × v with a z makes the z of B the only one that works
        if (isZeroVec(u) || isZeroVec(v) || c[2] === 0) continue
        const t = randomInt(random, -1, 1)
        const lambda = [-1, 1][randomInt(random, 0, 1)]
        const b = tidy(sub(add(a, scale(t, u)), scale(lambda, v)))
        if (b.some((value) => Math.abs(value) > PAIR_LIMIT)) continue
        const given = `(${b[0]},${b[1]},?)`
        return {
            prompt: say(`$r$: $${vec(a)}+t\\,${vec(u)}$. $s$ zuzenaren norabidea $${vec(v)}$ da. Jarri $B=${given}$, zuzenak ebaki daitezen.`, `$r$: $${vec(a)}+t\\,${vec(u)}$. $s$ tiene dirección $${vec(v)}$. Pon $B=${given}$ para que se corten.`, `$r$: ‏$${vec(a)}+t\\,${vec(u)}$. اتجاه $s$ هو $${vec(v)}$. ضع $B=${given}$ ليتقاطعا.`, `$r$: $${vec(a)}+t\\,${vec(u)}$. $s$ has direction $${vec(v)}$. Set $B=${given}$ so that they meet.`),
            hint: say('Biderkadura mistoa 0 izan behar da: probatu ${z}$ balioak.', 'El producto mixto tiene que ser 0: prueba valores de ${z}$.', 'يجب أن يكون الجداء المختلط 0: جرّب قيمًا لـ ${z}$.', 'The scalar triple product has to be 0: try values of ${z}$.'),
            isSolved: (state) => sameVec(state.a, a) && sameVec(state.u, u) && sameVec(state.v, v) && state.b[0] === b[0] && state.b[1] === b[1] && pairKind(state) === 'meet',
            solution: { a, u, b, v, prediction: null }
        }
    }
}

export const cutOrCrossExtra = freshFrom(initialCutOrCrossState, cutOrCrossMaker)

/** For the tests: the exact meeting point checked on both lines */
export const meetsBoth = (pair: Pair, point: FractionValue[]) => {
    const onLine = (start: Vec3, direction: Vec3) => {
        // point − start parallel to direction, with whole numbers: (n − start·d) × direction = 0
        const d = point[0].denominator * point[1].denominator * point[2].denominator
        const whole: Vec3 = [point[0].numerator * (d / point[0].denominator), point[1].numerator * (d / point[1].denominator), point[2].numerator * (d / point[2].denominator)]
        return isZeroVec(cross(sub(whole, scale(d, start)), direction))
    }
    return onLine(pair.a, pair.u) && onLine(pair.b, pair.v)
}

/** A FractionValue for the readout of t */
export const meetingParameter = (pair: Pair): FractionValue | null => {
    if (pairKind(pair) !== 'meet') return null
    const c = pairCross(pair)
    return fraction(dot(cross(sub(pair.b, pair.a), pair.v), c), dot(c, c))
}
