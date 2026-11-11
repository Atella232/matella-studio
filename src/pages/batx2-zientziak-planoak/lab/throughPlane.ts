import { fraction, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { add, cross, dot, scale, type Vec3 } from '../../batx2-zientziak-bektoreak/space/vec3.ts'
import { clampTo, clampVec, fractionPoint, isZeroVec, levelLatex, nonZeroStep, sameVec, say, vec } from './common.ts'

/* ==========================================================================
   L4 · Planoa zeharkatzen duen zuzena (La recta que atraviesa): the plane
   π: n·X = d and the line r = A + t·u. n and u go from −2 to 2 (never
   zero), A from −2 to 2 and d from −4 to 4. The learner first predicts
   whether r goes through π, lies in it or is parallel to it (u·n and
   n·A − d); then the exact t of the meeting point and the point itself
   appear (drawn only when it is inside the board). Pure logic.
   ========================================================================== */

export const CROSS_LIMIT = 2
export const LEVEL_LIMIT = 4

export type ThroughPartName = 'n' | 'A' | 'u'
export type ThroughKind = 'meet' | 'inside' | 'parallel'

export interface ThroughPlaneState {
    n: Vec3
    d: number
    a: Vec3
    u: Vec3
    prediction: Prediction | null
}

export const initialThroughPlaneState: ThroughPlaneState = { n: [0, 0, 1], d: 2, a: [1, -1, 0], u: [1, 1, 1], prediction: null }

const settle = (state: ThroughPlaneState, next: Omit<ThroughPlaneState, 'prediction'>): ThroughPlaneState => ({
    ...next,
    prediction: sameVec(next.n, state.n) && next.d === state.d && sameVec(next.a, state.a) && sameVec(next.u, state.u) ? state.prediction : null
})

export const setThroughPart = (state: ThroughPlaneState, name: ThroughPartName, value: Vec3) => settle(state, {
    n: name === 'n' ? nonZeroStep(CROSS_LIMIT, state.n, value) : state.n,
    d: state.d,
    a: name === 'A' ? clampVec(CROSS_LIMIT, value) : state.a,
    u: name === 'u' ? nonZeroStep(CROSS_LIMIT, state.u, value) : state.u
})
export const setThroughLevel = (state: ThroughPlaneState, d: number) => settle(state, { n: state.n, d: clampTo(LEVEL_LIMIT)(d), a: state.a, u: state.u })

/** The state as the controls would leave it (for the tests) */
export const normalThroughPlaneState = (state: ThroughPlaneState): ThroughPlaneState => {
    const parts: Array<[ThroughPartName, Vec3]> = [['n', state.n], ['A', state.a], ['u', state.u]]
    return { ...setThroughLevel(parts.reduce((current, [name, value]) => setThroughPart(current, name, value), state), state.d), prediction: state.prediction }
}

type Through = Pick<ThroughPlaneState, 'n' | 'd' | 'a' | 'u'>

export const directionDotNormal = ({ n, u }: Through) => dot(u, n) + 0
export const normalDotPoint = ({ n, a }: Through) => dot(n, a) + 0

export function throughKind(state: Through): ThroughKind {
    if (directionDotNormal(state) !== 0) return 'meet'
    return normalDotPoint(state) === state.d ? 'inside' : 'parallel'
}

/** What the learner predicts: r goes through π ('<'), lies in it ('=') or is parallel to it ('>') */
export const throughPrediction = (state: ThroughPlaneState): Prediction => {
    const kind = throughKind(state)
    return kind === 'meet' ? '<' : kind === 'inside' ? '=' : '>'
}

/** The t of the meeting point: (d − n·A) / (u·n) */
export const meetingT = (state: Through): FractionValue | null => (throughKind(state) === 'meet' ? fraction(state.d - normalDotPoint(state), directionDotNormal(state)) : null)

/** The exact meeting point A + t·u */
export function crossingPoint(state: Through): FractionValue[] | null {
    if (throughKind(state) !== 'meet') return null
    const bottom = directionDotNormal(state)
    return fractionPoint(add(scale(bottom, state.a), scale(state.d - normalDotPoint(state), state.u)), bottom)
}

const isOrigin = (point: FractionValue[] | null) => point !== null && point.every((value) => value.numerator === 0)

export const throughPlaneChallenges: LabChallenge<ThroughPlaneState>[] = [
    {
        id: 120251,
        prompt: say('Lortu zuzena planoaren paraleloa izatea, planoan egon gabe.', 'Haz que la recta sea paralela al plano sin estar en él.', 'اجعل المستقيم موازيًا للمستوى دون أن يكون فيه.', 'Make the line parallel to the plane without lying in it.'),
        hint: say('$\\vec{u}\\cdot\\vec{n}=0$, eta $A$ puntua planotik kanpo.', '$\\vec{u}\\cdot\\vec{n}=0$, y $A$ fuera del plano.', '$\\vec{u}\\cdot\\vec{n}=0$، و$A$ خارج المستوى.', '$\\vec{u}\\cdot\\vec{n}=0$, and $A$ off the plane.'),
        isSolved: (state) => throughKind(state) === 'parallel'
    },
    {
        id: 120252,
        prompt: say('Sartu zuzena planoaren barruan.', 'Mete la recta dentro del plano.', 'أدخل المستقيم داخل المستوى.', 'Put the line inside the plane.'),
        hint: say('$\\vec{u}\\cdot\\vec{n}=0$, eta $A$ puntuak planoaren ekuazioa betetzen du.', '$\\vec{u}\\cdot\\vec{n}=0$, y $A$ cumple la ecuación del plano.', '$\\vec{u}\\cdot\\vec{n}=0$، و$A$ تحقق معادلة المستوى.', '$\\vec{u}\\cdot\\vec{n}=0$, and $A$ satisfies the equation of the plane.'),
        isSolved: (state) => throughKind(state) === 'inside'
    },
    {
        id: 120253,
        prompt: say('Lortu zuzenak planoa jatorrian zeharkatzea.', 'Haz que la recta atraviese el plano en el origen.', 'اجعل المستقيم يخترق المستوى في الأصل.', 'Make the line go through the plane at the origin.'),
        hint: say('Planoa jatorritik pasatu behar da ($d=0$), eta zuzena ere bai.', 'El plano tiene que pasar por el origen ($d=0$), y la recta también.', 'يجب أن يمر المستوى بالأصل ($d=0$)، والمستقيم أيضًا.', 'The plane has to go through the origin ($d=0$), and the line too.'),
        isSolved: (state) => isOrigin(crossingPoint(state))
    },
    {
        id: 120254,
        prompt: say('Lortu zuzena planoarekiko perpendikularra izatea.', 'Haz que la recta sea perpendicular al plano.', 'اجعل المستقيم عموديًا على المستوى.', 'Make the line perpendicular to the plane.'),
        hint: say('Norabidea normalaren paraleloa: $\\vec{u}=k\\,\\vec{n}$.', 'El director, paralelo al normal: $\\vec{u}=k\\,\\vec{n}$.', 'متجه التوجيه موازٍ للناظم: $\\vec{u}=k\\,\\vec{n}$.', 'The direction, parallel to the normal: $\\vec{u}=k\\,\\vec{n}$.'),
        isSolved: (state) => isZeroVec(cross(state.u, state.n))
    },
    {
        id: 120255,
        prompt: say('$\\pi$: $x+y+{z}=3$ izanik, lortu zuzenak $t=1$ denean zeharkatzea.', 'Con $\\pi$: $x+y+{z}=3$, haz que la recta lo atraviese en $t=1$.', 'مع $\\pi$: ‏$x+y+{z}=3$ اجعل المستقيم يخترقه عند $t=1$.', 'With $\\pi$: $x+y+{z}=3$, make the line go through it at $t=1$.'),
        hint: say('$t=\\frac{3-\\vec{n}\\cdot A}{\\vec{u}\\cdot\\vec{n}}=1$: adibidez, $A$ jatorria eta $\\vec{u}=(1,1,1)$.', '$t=\\frac{3-\\vec{n}\\cdot A}{\\vec{u}\\cdot\\vec{n}}=1$: por ejemplo, $A$ en el origen y $\\vec{u}=(1,1,1)$.', '$t=\\frac{3-\\vec{n}\\cdot A}{\\vec{u}\\cdot\\vec{n}}=1$: مثلًا $A$ في الأصل و$\\vec{u}=(1,1,1)$.', '$t=\\frac{3-\\vec{n}\\cdot A}{\\vec{u}\\cdot\\vec{n}}=1$: for example, $A$ at the origin and $\\vec{u}=(1,1,1)$.'),
        isSolved: (state) => {
            const t = meetingT(state)
            return sameVec(state.n, [1, 1, 1]) && state.d === 3 && t !== null && t.numerator === t.denominator
        }
    }
]

/** Endless practice: π and A are given, and u misses its z so that r is parallel to π */
const throughPlaneMaker: LabChallengeMaker<ThroughPlaneState> = (random) => {
    for (;;) {
        const pick = () => randomInt(random, -CROSS_LIMIT, CROSS_LIMIT)
        const n: Vec3 = [pick(), pick(), pick()]
        const a: Vec3 = [pick(), pick(), pick()]
        const d = randomInt(random, -LEVEL_LIMIT, LEVEL_LIMIT)
        const [u1, u2] = [pick(), pick()]
        // n with a z makes the z of u the only one that works
        if (n[2] === 0 || dot(n, a) === d) continue
        const top = -(n[0] * u1 + n[1] * u2)
        if (top % n[2] !== 0) continue
        const u: Vec3 = [u1, u2, top / n[2] + 0]
        if (isZeroVec(u) || Math.abs(u[2]) > CROSS_LIMIT) continue
        const given = `(${u1},${u2},?)`
        return {
            prompt: say(`$\\pi$: $${levelLatex(n, d)}$ eta $A=${vec(a)}$. Jarri $\\vec{u}=${given}$, zuzena planoaren paraleloa izan dadin.`, `$\\pi$: $${levelLatex(n, d)}$ y $A=${vec(a)}$. Pon $\\vec{u}=${given}$ para que la recta sea paralela al plano.`, `$\\pi$: ‏$${levelLatex(n, d)}$ و$A=${vec(a)}$. ضع $\\vec{u}=${given}$ ليكون المستقيم موازيًا للمستوى.`, `$\\pi$: $${levelLatex(n, d)}$ and $A=${vec(a)}$. Set $\\vec{u}=${given}$ so that the line is parallel to the plane.`),
            hint: say('$\\vec{u}\\cdot\\vec{n}=0$ izan behar da.', 'Tiene que ser $\\vec{u}\\cdot\\vec{n}=0$.', 'يجب أن يكون $\\vec{u}\\cdot\\vec{n}=0$.', 'It has to be $\\vec{u}\\cdot\\vec{n}=0$.'),
            isSolved: (state) => sameVec(state.n, n) && state.d === d && sameVec(state.a, a) && state.u[0] === u1 && state.u[1] === u2 && throughKind(state) === 'parallel',
            solution: { n, d, a, u, prediction: null }
        }
    }
}

export const throughPlaneExtra = freshFrom(initialThroughPlaneState, throughPlaneMaker)
