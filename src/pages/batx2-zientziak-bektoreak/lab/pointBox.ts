import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { add, sub, type Vec3 } from '../space/vec3.ts'
import { clampVec, isZeroVec, sameVec, say, vec } from './common.ts'

/* ==========================================================================
   L1 · Puntua eta haren kutxa (El punto y su caja): two points A and B
   with whole coordinates (−4…4). The board draws the vector AB and the
   box it is the diagonal of, with sides |x₂ − x₁|, |y₂ − y₁| and
   |z₂ − z₁|. The learner first predicts whether AB is shorter than 5,
   exactly 5 or longer; then AB, its magnitude (the diagonal of the box,
   with all three squares) and the midpoint M appear. Pure logic.
   ========================================================================== */

export const POINT_LIMIT = 4
/** The length the learner compares |AB| with */
export const POINT_REFERENCE = 5

export type PointName = 'A' | 'B'

export interface PointBoxState {
    a: Vec3
    b: Vec3
    prediction: Prediction | null
}

export const initialPointBoxState: PointBoxState = { a: [1, -2, 0], b: [3, 1, 2], prediction: null }

export function setPoint(state: PointBoxState, name: PointName, value: Vec3): PointBoxState {
    const point = clampVec(POINT_LIMIT, value)
    const next = name === 'A' ? { ...state, a: point } : { ...state, b: point }
    return { ...next, prediction: sameVec(next.a, state.a) && sameVec(next.b, state.b) ? state.prediction : null }
}

export const pointVector = ({ a, b }: Pick<PointBoxState, 'a' | 'b'>): Vec3 => sub(b, a)
export const pointSquare = (state: Pick<PointBoxState, 'a' | 'b'>) => {
    const [x, y, z] = pointVector(state)
    return x * x + y * y + z * z
}
/** The midpoint, as twice its coordinates (so it stays whole): M = (A + B) / 2 */
export const doubledMidpoint = ({ a, b }: Pick<PointBoxState, 'a' | 'b'>): Vec3 => add(a, b)

/** Whether |AB| is below, equal to or above 5: what the learner predicts (5² = 25, all whole) */
export const pointPrediction = (state: PointBoxState): Prediction => compareTo(pointSquare(state), POINT_REFERENCE * POINT_REFERENCE)

const lengthIs = (n: number) => (state: PointBoxState) => pointSquare(state) === n * n

export const pointBoxChallenges: LabChallenge<PointBoxState>[] = [
    {
        id: 119101,
        prompt: say('Egin $|\\overrightarrow{AB}|=7$.', 'Haz que $|\\overrightarrow{AB}|=7$.', 'اجعل $|\\overrightarrow{AB}|=7$.', 'Make $|\\overrightarrow{AB}|=7$.'),
        hint: say('$2^2+3^2+6^2=49$: kutxak 2, 3 eta 6 alde ditu.', '$2^2+3^2+6^2=49$: una caja de lados 2, 3 y 6.', '$2^2+3^2+6^2=49$: صندوق أضلاعه 2 و3 و6.', '$2^2+3^2+6^2=49$: a box with sides 2, 3 and 6.'),
        isSolved: lengthIs(7)
    },
    {
        id: 119102,
        prompt: say('Jarri $A$ eta $B$, haien erdiko puntua $M(1,1,1)$ izan dadin.', 'Coloca $A$ y $B$ para que su punto medio sea $M(1,1,1)$.', 'ضع $A$ و$B$ ليكون منتصفهما $M(1,1,1)$.', 'Place $A$ and $B$ so that their midpoint is $M(1,1,1)$.'),
        hint: say('$A+B=(2,2,2)$: adibidez, $A(0,0,0)$ eta $B(2,2,2)$.', '$A+B=(2,2,2)$: por ejemplo, $A(0,0,0)$ y $B(2,2,2)$.', '$A+B=(2,2,2)$: مثلًا $A(0,0,0)$ و$B(2,2,2)$.', '$A+B=(2,2,2)$: for example, $A(0,0,0)$ and $B(2,2,2)$.'),
        isSolved: (state) => sameVec(doubledMidpoint(state), [2, 2, 2]) && !sameVec(state.a, state.b)
    },
    {
        id: 119103,
        prompt: say('Egin $B$ puntua $A$ puntuaren simetrikoa jatorriarekiko, $A$ jatorria izan gabe.', 'Haz que $B$ sea el simétrico de $A$ respecto del origen, sin que $A$ sea el origen.', 'اجعل $B$ نظيرة $A$ بالنسبة إلى الأصل، دون أن تكون $A$ هي الأصل.', 'Make $B$ the symmetric of $A$ with respect to the origin, without $A$ being the origin.'),
        hint: say('Jatorria erdiko puntua da: $B=-A$.', 'El origen es el punto medio: $B=-A$.', 'الأصل هو المنتصف: $B=-A$.', 'The origin is the midpoint: $B=-A$.'),
        isSolved: (state) => isZeroVec(doubledMidpoint(state)) && !isZeroVec(state.a)
    },
    {
        id: 119104,
        prompt: say('Egin $|\\overrightarrow{AB}|=9$, $\\overrightarrow{AB}$ bektorearen hiru koordenatuak 0 ez direla.', 'Haz que $|\\overrightarrow{AB}|=9$ con las tres coordenadas de $\\overrightarrow{AB}$ distintas de 0.', 'اجعل $|\\overrightarrow{AB}|=9$ ومركّبات $\\overrightarrow{AB}$ الثلاث غير معدومة.', 'Make $|\\overrightarrow{AB}|=9$ with all three coordinates of $\\overrightarrow{AB}$ other than 0.'),
        hint: say('$1+16+64=81$ edo $16+16+49=81$.', '$1+16+64=81$ o $16+16+49=81$.', '$1+16+64=81$ أو $16+16+49=81$.', '$1+16+64=81$ or $16+16+49=81$.'),
        isSolved: (state) => lengthIs(9)(state) && pointVector(state).every((value) => value !== 0)
    },
    {
        id: 119105,
        prompt: say('Jarri $AB$ zuzenkiaren erdiko puntua ${z}$ ardatzean, $A$ ardatz horretan egon gabe.', 'Pon el punto medio de $AB$ en el eje ${z}$, sin que $A$ esté en ese eje.', 'ضع منتصف $AB$ على المحور ${z}$، دون أن تكون $A$ على هذا المحور.', 'Put the midpoint of $AB$ on the ${z}$ axis, without $A$ being on that axis.'),
        hint: say('Erdiko puntuaren $x$ eta $y$ zero dira: $B$ puntuak $A$ puntuaren aurkako $x$ eta $y$ ditu.', 'Las $x$ e $y$ del punto medio son 0: $B$ tiene las $x$ e $y$ opuestas a las de $A$.', 'إحداثيا المنتصف $x$ و$y$ صفر: لـ $B$ إحداثيان $x$ و$y$ معاكسان لإحداثيي $A$.', 'The $x$ and $y$ of the midpoint are 0: $B$ has the opposite $x$ and $y$ to those of $A$.'),
        isSolved: (state) => doubledMidpoint(state)[0] === 0 && doubledMidpoint(state)[1] === 0 && (state.a[0] !== 0 || state.a[1] !== 0)
    }
]

/** Boxes whose diagonal is whole: the sides and the length */
const BOXES: Array<[Vec3, number]> = [[[1, 2, 2], 3], [[2, 1, 2], 3], [[2, 2, 1], 3], [[0, 3, 4], 5], [[4, 0, 3], 5], [[2, 4, 4], 6], [[4, 2, 4], 6], [[2, 3, 6], 7], [[3, 6, 2], 7], [[6, 2, 3], 7], [[1, 4, 8], 9], [[4, 4, 7], 9], [[7, 4, 4], 9]]

/** Endless practice: a fixed A and a length to reach, or a midpoint to hit */
const pointMaker: LabChallengeMaker<PointBoxState> = (random) => {
    if (random() < 0.5) {
        for (;;) {
            const [sides, length] = pick(random, BOXES)
            const signs = sides.map(() => (random() < 0.5 ? -1 : 1))
            const step: Vec3 = [sides[0] * signs[0], sides[1] * signs[1], sides[2] * signs[2]]
            const a: Vec3 = [randomInt(random, -2, 2), randomInt(random, -2, 2), randomInt(random, -2, 2)]
            const b = add(a, step)
            if (b.some((value) => Math.abs(value) > POINT_LIMIT)) continue
            return {
                prompt: say(`$A${vec(a)}$ dela, jarri $B$ eta egin $|\\overrightarrow{AB}|=${length}$.`, `Con $A${vec(a)}$, coloca $B$ para que $|\\overrightarrow{AB}|=${length}$.`, `مع $A${vec(a)}$ ضع $B$ ليكون $|\\overrightarrow{AB}|=${length}$.`, `With $A${vec(a)}$, place $B$ so that $|\\overrightarrow{AB}|=${length}$.`),
                hint: say(`Bilatu kutxa bat, $${length}^2=${length * length}$ ematen duten hiru karratuekin.`, `Busca una caja cuyos tres cuadrados sumen $${length}^2=${length * length}$.`, `ابحث عن صندوق مجموع مربعات أضلاعه $${length}^2=${length * length}$.`, `Look for a box whose three squares add up to $${length}^2=${length * length}$.`),
                isSolved: (state) => sameVec(state.a, a) && lengthIs(length)(state),
                solution: { a, b, prediction: null }
            }
        }
    }
    for (;;) {
        // B = A + 2d keeps the midpoint M = A + d whole
        const a: Vec3 = [randomInt(random, -3, 3), randomInt(random, -3, 3), randomInt(random, -3, 3)]
        const d: Vec3 = [randomInt(random, -2, 2), randomInt(random, -2, 2), randomInt(random, -2, 2)]
        const b = add(a, add(d, d))
        if (isZeroVec(d) || b.some((value) => Math.abs(value) > POINT_LIMIT)) continue
        const m = add(a, d)
        const doubled = add(a, b)
        return {
            prompt: say(`Jarri $A$ eta $B$, haien erdiko puntua $M${vec(m)}$ izan dadin.`, `Coloca $A$ y $B$ para que su punto medio sea $M${vec(m)}$.`, `ضع $A$ و$B$ ليكون منتصفهما $M${vec(m)}$.`, `Place $A$ and $B$ so that their midpoint is $M${vec(m)}$.`),
            hint: say(`$A+B=2M=${vec(doubled)}$ izan behar da.`, `Tiene que ser $A+B=2M=${vec(doubled)}$.`, `يجب أن يكون $A+B=2M=${vec(doubled)}$.`, `It has to be $A+B=2M=${vec(doubled)}$.`),
            isSolved: (state) => sameVec(doubledMidpoint(state), doubled) && !sameVec(state.a, state.b),
            solution: { a, b, prediction: null }
        }
    }
}

export const pointBoxExtra = freshFrom(initialPointBoxState, (random) => {
    for (;;) {
        const challenge = pointMaker(random)
        if (challenge.isSolved(challenge.solution)) return challenge
    }
})
