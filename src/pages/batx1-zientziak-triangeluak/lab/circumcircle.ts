import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { say } from '../../dbh4-akademikoak-trigonometria/text.ts'

/* ==========================================================================
   L3 · 2R zirkunferentzia (La circunferencia de 2R): the side a = BC and
   its opposite angle A fix the circumscribed circle, whose diameter is
   2R = a / sen A. Changing a or A makes the circle grow or shrink; moving
   A along its arc changes b, c, B and C, but the three quotients of the
   sine rule stay 2R. The learner first predicts whether R comes out
   smaller than a, equal to it or bigger (sen A against ½); ▶ slides A
   along the arc. Pure logic: B and C sit at 270° ∓ A on the circle, so
   the arc BC away from A measures 2A.
   ========================================================================== */

export const CIRCUMCIRCLE_LIMITS = { a: { min: 2, max: 10 }, A: { min: 30, max: 150, step: 10 }, position: { min: 1, max: 9 } }

export interface CircumcircleState {
    a: number
    A: number
    /** Where A sits on its arc, from 1 (next to C) to 9 (next to B) */
    position: number
    prediction: Prediction | null
}

export const initialCircumcircleState: CircumcircleState = { a: 6, A: 60, position: 4, prediction: null }

const D = Math.PI / 180
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))
const snap = (value: number, step: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value / step) * step))

export function setCircumcircle(state: CircumcircleState, patch: Partial<Omit<CircumcircleState, 'prediction'>>): CircumcircleState {
    const a = clamp(patch.a ?? state.a, CIRCUMCIRCLE_LIMITS.a.min, CIRCUMCIRCLE_LIMITS.a.max)
    const A = snap(patch.A ?? state.A, CIRCUMCIRCLE_LIMITS.A.step, CIRCUMCIRCLE_LIMITS.A.min, CIRCUMCIRCLE_LIMITS.A.max)
    const position = clamp(patch.position ?? state.position, CIRCUMCIRCLE_LIMITS.position.min, CIRCUMCIRCLE_LIMITS.position.max)
    // Moving A along the arc keeps the prediction: R does not change
    const same = a === state.a && A === state.A
    return { a, A, position, prediction: same ? state.prediction : null }
}

/** R = a / (2 · sen A) */
export const circumradius = ({ a, A }: Pick<CircumcircleState, 'a' | 'A'>) => a / (2 * Math.sin(A * D))
/** R smaller than (<), equal to (=) or bigger than (>) a */
export const circumcirclePrediction = (state: CircumcircleState): Prediction => compareTo(circumradius(state), state.a)

/** The angles on the circle (degrees, counterclockwise from the right) of B, C and A; A may be between two steps while ▶ plays */
export function circumcircleAngles({ A, position }: Pick<CircumcircleState, 'A'> & { position: number }) {
    const B = 270 - A
    const C = 270 + A
    // A goes from C (position 0) to B (position 10) along the arc that does not hold the bottom of the circle
    const atA = C + (position / 10) * (360 - 2 * A)
    return { B, C, A: atA }
}

type Point = [number, number]
/** The vertices for a circle of radius R around (0, 0), y upwards */
export function circumcircleVertices(state: Pick<CircumcircleState, 'a' | 'A'> & { position: number }): { A: Point; B: Point; C: Point; R: number } {
    const R = circumradius(state)
    const angles = circumcircleAngles(state)
    const at = (degrees: number): Point => [R * Math.cos(degrees * D), R * Math.sin(degrees * D)]
    return { A: at(angles.A), B: at(angles.B), C: at(angles.C), R }
}

const distance = (p: Point, q: Point) => Math.hypot(p[0] - q[0], p[1] - q[1])
/** The angle at v of the triangle v, p, q */
const angleAt = (v: Point, p: Point, q: Point) => {
    const u = [p[0] - v[0], p[1] - v[1]]
    const w = [q[0] - v[0], q[1] - v[1]]
    return Math.acos((u[0] * w[0] + u[1] * w[1]) / (Math.hypot(u[0], u[1]) * Math.hypot(w[0], w[1]))) / D
}

/** The sides and angles of the triangle: a, b, c and A, B, C */
export function circumcircleTriangle(state: Pick<CircumcircleState, 'a' | 'A'> & { position: number }) {
    const { A, B, C } = circumcircleVertices(state)
    return {
        sides: { a: distance(B, C), b: distance(A, C), c: distance(A, B) },
        angles: { A: angleAt(A, B, C), B: angleAt(B, A, C), C: angleAt(C, A, B) }
    }
}

/** Whether the centre lies outside the triangle: one of its angles is obtuse */
export const centreOutside = (state: Pick<CircumcircleState, 'a' | 'A' | 'position'>) => Math.max(...Object.values(circumcircleTriangle(state).angles)) > 90 + 1e-6

const near = (value: number, target: number, tolerance = 1e-6) => Math.abs(value - target) < tolerance

export const circumcircleChallenges: LabChallenge<CircumcircleState>[] = [
    { id: 102301, prompt: say('Egin $2R$ diametroa $a$ bezain luzea izatea.', 'Haz que el diámetro $2R$ mida lo mismo que $a$.', 'اجعل القطر $2R$ مساويًا لـ $a$.', 'Make the diameter $2R$ as long as $a$.'), hint: say('$2R=\\frac{a}{\\sen A}$: sinuak 1 izan behar du.', '$2R=\\frac{a}{\\sen A}$: el seno tiene que valer 1.', '$2R=\\frac{a}{\\sen A}$: يجب أن يساوي الجيب 1.', '$2R=\\frac{a}{\\sin A}$: the sine has to be 1.'), isSolved: (state) => state.A === 90 },
    { id: 102302, prompt: say('$a=6$ izanik, lortu $R=6$.', 'Con $a=6$, consigue $R=6$.', 'مع $a=6$ احصل على $R=6$.', 'With $a=6$, get $R=6$.'), hint: say('$R=a$ denean, $\\sen A=\\frac{1}{2}$.', 'Cuando $R=a$, $\\sen A=\\frac{1}{2}$.', 'عندما يكون $R=a$ يكون $\\sen A=\\frac{1}{2}$.', 'When $R=a$, $\\sin A=\\frac{1}{2}$.'), isSolved: (state) => state.a === 6 && near(circumradius(state), 6) },
    { id: 102303, prompt: say('$A=30°$ izanik, lortu $R=5$.', 'Con $A=30°$, consigue $R=5$.', 'مع $A=30°$ احصل على $R=5$.', 'With $A=30°$, get $R=5$.'), hint: say('$\\sen 30°=\\frac{1}{2}$ denez, $R=a$.', 'Como $\\sen 30°=\\frac{1}{2}$, $R=a$.', 'بما أن $\\sen 30°=\\frac{1}{2}$ فإن $R=a$.', 'Since $\\sin 30°=\\frac{1}{2}$, $R=a$.'), isSolved: (state) => state.A === 30 && near(circumradius(state), 5) },
    { id: 102304, prompt: say('Egin O zentroa triangelutik kanpo geratzea.', 'Haz que el centro O quede fuera del triángulo.', 'اجعل المركز O خارج المثلث.', 'Make the centre O end up outside the triangle.'), hint: say('Triangeluak angelu kamuts bat izan behar du.', 'El triángulo tiene que tener un ángulo obtuso.', 'يجب أن تكون في المثلث زاوية منفرجة.', 'The triangle has to have an obtuse angle.'), isSolved: centreOutside },
    { id: 102305, prompt: say('Jarri A arkuan, triangelua isoszelea izan dadin, $b=c$ izanik.', 'Coloca A en su arco para que el triángulo sea isósceles, con $b=c$.', 'ضع A على قوسها ليكون المثلث متساوي الساقين بحيث $b=c$.', 'Place A on its arc so that the triangle is isosceles, with $b=c$.'), hint: say('A arkuaren erdian.', 'A en la mitad del arco.', 'A في منتصف القوس.', 'A in the middle of the arc.'), isSolved: (state) => near(circumcircleTriangle(state).sides.b, circumcircleTriangle(state).sides.c) }
]

/** Endless practice: a is given and R to the hundredth; A or 180° − A give it */
const circumcircleMaker: LabChallengeMaker<CircumcircleState> = (random) => {
    for (;;) {
        const a = randomInt(random, 2, 10)
        const A = pick(random, [30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150])
        const target = Math.round(circumradius({ a, A }) * 100) / 100
        const matches = (state: Pick<CircumcircleState, 'a' | 'A'>) => state.a === a && near(Math.round(circumradius(state) * 100) / 100, target, 1e-9)
        const angles = Array.from({ length: 13 }, (_, index) => 30 + 10 * index).filter((angle) => matches({ a, A: angle }))
        if (angles.length === 0 || angles.length > 2) continue
        const shown = String(target).replace('.', '{,}')
        return {
            prompt: say(`$a=${a}$ izanik, lortu $R\\approx ${shown}$.`, `Con $a=${a}$, consigue $R\\approx ${shown}$.`, `مع $a=${a}$ احصل على $R\\approx ${shown}$.`, `With $a=${a}$, get $R\\approx ${shown}$.`),
            hint: say('Gogoratu: $\\sen A=\\frac{a}{2R}$; A edo 180° − A.', 'Recuerda: $\\sen A=\\frac{a}{2R}$; A o 180° − A.', 'تذكّر: $\\sen A=\\frac{a}{2R}$؛ A أو 180° − A.', 'Remember: $\\sin A=\\frac{a}{2R}$; A or 180° − A.'),
            isSolved: matches,
            solution: { a, A, position: 5, prediction: null }
        }
    }
}

export const circumcircleExtra = freshFrom(initialCircumcircleState, circumcircleMaker)
