import type { FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { add, cross, dot, scale, sub, type Vec3 } from '../../batx2-zientziak-bektoreak/space/vec3.ts'
import { clampTo, clampVec, fractionPoint, isZeroVec, levelLatex, nonZeroStep, sameVec, say, tidy, vec } from './common.ts'

/* ==========================================================================
   L2 · Perpendikularraren oina (El pie de la perpendicular): a point P
   and a plane n·X = d or a line A + t·u; the foot M of the perpendicular
   from P, exact. P goes from −3 to 3, n and u from −2 to 2 (never zero),
   A from −2 to 2 and d from −4 to 4. The learner first predicts whether
   M is below the floor, on it or above it (the sign of its z); then the
   t of the foot, M and the distance appear. These pieces are shared with
   L4 (the distance ruler). Pure logic.
   ========================================================================== */

export const FOOT_POINT_LIMIT = 3
export const FOOT_LIMIT = 2
export const FOOT_LEVEL_LIMIT = 4

export type FootMode = 'plane' | 'line'
export type FootPartName = 'P' | 'n' | 'A' | 'u'

export interface FootState {
    mode: FootMode
    p: Vec3
    n: Vec3
    d: number
    a: Vec3
    u: Vec3
    prediction: Prediction | null
}

export const initialFootState: FootState = { mode: 'plane', p: [2, 1, 3], n: [0, 0, 1], d: 1, a: [0, 0, 0], u: [1, 1, 0], prediction: null }

type Shape = Omit<FootState, 'prediction'>
const sameShape = (x: Shape, y: Shape) => x.mode === y.mode && sameVec(x.p, y.p) && sameVec(x.n, y.n) && x.d === y.d && sameVec(x.a, y.a) && sameVec(x.u, y.u)
const settle = <State extends FootState>(state: State, next: Shape): State => ({ ...state, ...next, prediction: sameShape(next, state) ? state.prediction : null })

export const setFootMode = <State extends FootState>(state: State, mode: FootMode): State => settle(state, { ...state, mode })
export function setFootPart<State extends FootState>(state: State, name: FootPartName, value: Vec3, pointLimit = FOOT_POINT_LIMIT): State {
    return settle(state, {
        ...state,
        p: name === 'P' ? clampVec(pointLimit, value) : state.p,
        n: name === 'n' ? nonZeroStep(FOOT_LIMIT, state.n, value) : state.n,
        a: name === 'A' ? clampVec(FOOT_LIMIT, value) : state.a,
        u: name === 'u' ? nonZeroStep(FOOT_LIMIT, state.u, value) : state.u
    })
}
export const setFootLevel = <State extends FootState>(state: State, d: number, limit = FOOT_LEVEL_LIMIT): State => settle(state, { ...state, d: clampTo(limit)(d) })

/** The state as the controls would leave it (for the tests) */
export const normalFootState = (state: FootState): FootState => {
    const parts: Array<[FootPartName, Vec3]> = [['P', state.p], ['n', state.n], ['A', state.a], ['u', state.u]]
    return { ...setFootLevel(parts.reduce((current, [name, value]) => setFootPart(current, name, value), state), state.d), prediction: state.prediction }
}

type Shapes = Pick<FootState, 'mode' | 'p' | 'n' | 'd' | 'a' | 'u'>

/** The t of the foot as a fraction top / bottom: P + t·n on the plane, or A + t·u on the line */
export function footParameter(state: Shapes): [number, number] {
    if (state.mode === 'plane') return [state.d - dot(state.n, state.p), dot(state.n, state.n)]
    return [dot(sub(state.p, state.a), state.u), dot(state.u, state.u)]
}

/** The exact foot M */
export function footPoint(state: Shapes): FractionValue[] {
    const [top, bottom] = footParameter(state)
    const start = state.mode === 'plane' ? state.p : state.a
    const along = state.mode === 'plane' ? state.n : state.u
    return fractionPoint(add(scale(bottom, start), scale(top, along)), bottom)
}

/** The square of the distance from P to the plane or the line, as top / bottom */
export function distanceSquare(state: Shapes): [number, number] {
    if (state.mode === 'plane') return [(dot(state.n, state.p) - state.d) ** 2, dot(state.n, state.n)]
    const c = cross(sub(state.p, state.a), state.u)
    return [dot(c, c), dot(state.u, state.u)]
}

const sign = (value: FractionValue) => Math.sign(value.numerator)
/** What the learner predicts: M below the floor ('<'), on it ('=') or above it ('>') */
export const footPrediction = (state: FootState): Prediction => {
    const z = sign(footPoint(state)[2])
    return z === 0 ? '=' : z < 0 ? '<' : '>'
}

export const isFractionPoint = (point: FractionValue[], target: Vec3) => point.every((value, index) => value.numerator === target[index] * value.denominator)
/** The plane equation (any multiple of a·x + b·y + c·z = d) */
const isPlane = (state: Shapes, n: Vec3, d: number) => isZeroVec(cross(state.n, n)) && state.d * dot(n, n) === d * dot(state.n, n)

export const planeLabel = (state: Shapes) => levelLatex(state.n, state.d)

export const footChallenges: LabChallenge<FootState>[] = [
    {
        id: 121151,
        prompt: say('Planoa: lortu oina jatorria izatea, $P$ jatorria izan gabe.', 'Plano: haz que el pie sea el origen sin que $P$ lo sea.', 'مستوى: اجعل المسقط هو الأصل دون أن تكون $P$ هي الأصل.', 'Plane: make the foot the origin without $P$ being the origin.'),
        hint: say('Planoa jatorritik pasatu behar da, eta $P$ normalaren norabidean egon.', 'El plano tiene que pasar por el origen, y $P$ estar en la dirección del normal.', 'يجب أن يمر المستوى بالأصل وأن تكون $P$ في اتجاه الناظم.', 'The plane has to go through the origin, and $P$ has to be along the normal.'),
        isSolved: (state) => state.mode === 'plane' && isFractionPoint(footPoint(state), [0, 0, 0]) && !isZeroVec(state.p)
    },
    {
        id: 121152,
        prompt: say('Planoa: jarri $P$ planoan. Zein da orduan oina?', 'Plano: pon $P$ en el plano. ¿Cuál es entonces el pie?', 'مستوى: ضع $P$ في المستوى. ما المسقط عندئذ؟', 'Plane: put $P$ on the plane. What is the foot then?'),
        hint: say('$P$ puntuak ekuazioa bete behar du.', '$P$ tiene que cumplir la ecuación.', 'يجب أن تحقق $P$ المعادلة.', '$P$ has to satisfy the equation.'),
        isSolved: (state) => state.mode === 'plane' && dot(state.n, state.p) === state.d
    },
    {
        id: 121153,
        prompt: say('Zuzena: $x$ ardatza hartuta, lortu oina $(2,0,0)$ izatea, $P$ ardatzetik kanpo dagoela.', 'Recta: con el eje $x$, haz que el pie sea $(2,0,0)$ con $P$ fuera del eje.', 'مستقيم: مع المحور $x$ اجعل المسقط $(2,0,0)$ و$P$ خارج المحور.', 'Line: with the $x$ axis, make the foot $(2,0,0)$ with $P$ off the axis.'),
        hint: say('$A=(0,0,0)$, $\\vec{u}=(1,0,0)$ eta $P$ puntuak $x=2$.', '$A=(0,0,0)$, $\\vec{u}=(1,0,0)$ y $P$ con $x=2$.', '$A=(0,0,0)$ و$\\vec{u}=(1,0,0)$ و$P$ فيها $x=2$.', '$A=(0,0,0)$, $\\vec{u}=(1,0,0)$ and $P$ with $x=2$.'),
        isSolved: (state) => state.mode === 'line' && state.a[1] === 0 && state.a[2] === 0 && state.u[1] === 0 && state.u[2] === 0 && isFractionPoint(footPoint(state), [2, 0, 0]) && (state.p[1] !== 0 || state.p[2] !== 0)
    },
    {
        id: 121154,
        prompt: say('Planoa: $x+y+{z}=3$ planoarekin, lortu oina $(1,1,1)$ izatea, $P$ planotik kanpo.', 'Plano: con $x+y+{z}=3$, haz que el pie sea $(1,1,1)$ con $P$ fuera del plano.', 'مستوى: مع $x+y+{z}=3$ اجعل المسقط $(1,1,1)$ و$P$ خارج المستوى.', 'Plane: with $x+y+{z}=3$, make the foot $(1,1,1)$ with $P$ off the plane.'),
        hint: say('$P=(1,1,1)+k\\,(1,1,1)$, adibidez $(2,2,2)$.', '$P=(1,1,1)+k\\,(1,1,1)$, por ejemplo $(2,2,2)$.', '$P=(1,1,1)+k\\,(1,1,1)$، مثل $(2,2,2)$.', '$P=(1,1,1)+k\\,(1,1,1)$, for example $(2,2,2)$.'),
        isSolved: (state) => state.mode === 'plane' && isPlane(state, [1, 1, 1], 3) && isFractionPoint(footPoint(state), [1, 1, 1]) && dot(state.n, state.p) !== state.d
    },
    {
        id: 121155,
        prompt: say('Lortu $P$ lurraren gainean egotea eta haren oina lurraren azpian.', 'Haz que $P$ esté por encima del suelo y su pie por debajo.', 'اجعل $P$ فوق الأرض ومسقطها تحتها.', 'Make $P$ above the floor and its foot below it.'),
        hint: say('Adibidez ${z}=-1$ planoa eta $P$ goian.', 'Por ejemplo el plano ${z}=-1$ y $P$ arriba.', 'مثلًا المستوى ${z}=-1$ و$P$ في الأعلى.', 'For example the plane ${z}=-1$ and $P$ up high.'),
        isSolved: (state) => state.p[2] > 0 && sign(footPoint(state)[2]) < 0
    }
]

/** Endless practice: a plane and the foot wanted; P anywhere on the perpendicular, off the plane */
const footMaker: LabChallengeMaker<FootState> = (random) => {
    for (;;) {
        const pick = () => randomInt(random, -FOOT_LIMIT, FOOT_LIMIT)
        const n: Vec3 = [pick(), pick(), pick()]
        const m: Vec3 = [pick(), pick(), pick()]
        if (n.filter((value) => value !== 0).length < 2) continue
        const d = dot(n, m) + 0
        const k = [1, -1][randomInt(random, 0, 1)]
        const p = add(m, scale(k, n))
        if (Math.abs(d) > FOOT_LEVEL_LIMIT || p.some((value) => Math.abs(value) > FOOT_POINT_LIMIT)) continue
        const plane = levelLatex(n, d)
        return {
            prompt: say(`Planoa $${plane}$ da. Jarri $P$, planotik kanpo, haren oina $${vec(m)}$ izan dadin.`, `El plano es $${plane}$. Pon $P$ fuera del plano para que su pie sea $${vec(m)}$.`, `المستوى هو $${plane}$. ضع $P$ خارج المستوى ليكون مسقطها $${vec(m)}$.`, `The plane is $${plane}$. Put $P$ off the plane so that its foot is $${vec(m)}$.`),
            hint: say('$P$ normalaren zuzenean dago: $M+k\\,\\vec{n}$.', '$P$ está en la recta normal: $M+k\\,\\vec{n}$.', 'تقع $P$ على المستقيم العمودي: $M+k\\,\\vec{n}$.', '$P$ is on the normal line: $M+k\\,\\vec{n}$.'),
            isSolved: (state) => state.mode === 'plane' && sameVec(state.n, n) && state.d === d && isFractionPoint(footPoint(state), m) && !sameVec(state.p, m),
            solution: { ...initialFootState, mode: 'plane', n, d, p: tidy(p), prediction: null }
        }
    }
}

export const footExtra = freshFrom(initialFootState, footMaker)
