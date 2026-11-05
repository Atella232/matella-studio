import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { say } from '../../dbh4-akademikoak-trigonometria/text.ts'

/* ==========================================================================
   L2 · Kosinuaren bisagra (La bisagra del coseno): two sides b and c
   joined at A like a hinge. Opening A changes the third side a, and the
   bars compare a² with b² + c²: the correction −2bc · cos A takes away
   while A is acute, is 0 at 90° (Pythagoras) and adds once A is obtuse.
   The learner first predicts whether a² is smaller than, equal to or
   greater than b² + c²; ▶ opens the hinge from 0° to the chosen angle.
   Pure logic.
   ========================================================================== */

export const HINGE_LIMITS = { side: { min: 2, max: 8 }, A: { min: 10, max: 170, step: 10 } }

export interface HingeState {
    b: number
    c: number
    A: number
    prediction: Prediction | null
}

export const initialHingeState: HingeState = { b: 4, c: 6, A: 50, prediction: null }

const D = Math.PI / 180
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))
const snap = (value: number, step: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value / step) * step))

export function setHinge(state: HingeState, patch: Partial<Omit<HingeState, 'prediction'>>): HingeState {
    const b = clamp(patch.b ?? state.b, HINGE_LIMITS.side.min, HINGE_LIMITS.side.max)
    const c = clamp(patch.c ?? state.c, HINGE_LIMITS.side.min, HINGE_LIMITS.side.max)
    const A = snap(patch.A ?? state.A, HINGE_LIMITS.A.step, HINGE_LIMITS.A.min, HINGE_LIMITS.A.max)
    const same = b === state.b && c === state.c && A === state.A
    return { b, c, A, prediction: same ? state.prediction : null }
}

/** −2bc · cos A: negative while A is acute, 0 at 90°, positive when A is obtuse */
export const hingeCorrection = ({ b, c, A }: Pick<HingeState, 'b' | 'c' | 'A'>) => {
    const value = -2 * b * c * Math.cos(A * D)
    return Math.abs(value) < 1e-9 ? 0 : value
}
/** a² = b² + c² − 2bc · cos A */
export const hingeSquare = (state: Pick<HingeState, 'b' | 'c' | 'A'>) => state.b * state.b + state.c * state.c + hingeCorrection(state)
export const hingeSide = (state: Pick<HingeState, 'b' | 'c' | 'A'>) => Math.sqrt(hingeSquare(state))
/** a² smaller than (<), equal to (=) or greater than (>) b² + c² */
export const hingePrediction = (state: HingeState): Prediction => compareTo(hingeSquare(state), state.b * state.b + state.c * state.c)

const near = (value: number, target: number) => Math.abs(value - target) < 1e-6

export const hingeChallenges: LabChallenge<HingeState>[] = [
    { id: 102201, prompt: say('Ireki bisagra $a^2=b^2+c^2$ izan arte.', 'Abre la bisagra hasta que $a^2=b^2+c^2$.', 'افتح المفصل حتى يصير $a^2=b^2+c^2$.', 'Open the hinge until $a^2=b^2+c^2$.'), hint: say('Zuzenketa 0 da kosinua 0 denean.', 'La corrección es 0 cuando el coseno es 0.', 'يساوي التصحيح 0 عندما يكون جيب التمام 0.', 'The correction is 0 when the cosine is 0.'), isSolved: (state) => state.A === 90 },
    { id: 102202, prompt: say('$b=3$ eta $c=5$ izanik, lortu $a=7$.', 'Con $b=3$ y $c=5$, consigue $a=7$.', 'مع $b=3$ و$c=5$ احصل على $a=7$.', 'With $b=3$ and $c=5$, get $a=7$.'), hint: say('$49$ handiagoa da $9+25$ baino: A kamutsa da.', '$49$ es mayor que $9+25$: A es obtuso.', '$49$ أكبر من $9+25$: الزاوية A منفرجة.', '$49$ is greater than $9+25$: A is obtuse.'), isSolved: (state) => state.b === 3 && state.c === 5 && near(hingeSide(state), 7) },
    { id: 102203, prompt: say('$b=5$ eta $c=8$ izanik, lortu $a=7$.', 'Con $b=5$ y $c=8$, consigue $a=7$.', 'مع $b=5$ و$c=8$ احصل على $a=7$.', 'With $b=5$ and $c=8$, get $a=7$.'), hint: say('$49$ txikiagoa da $25+64$ baino: A zorrotza da, eta $\\cos A=\\frac{1}{2}$.', '$49$ es menor que $25+64$: A es agudo, y $\\cos A=\\frac{1}{2}$.', '$49$ أصغر من $25+64$: الزاوية A حادة و$\\cos A=\\frac{1}{2}$.', '$49$ is less than $25+64$: A is acute, and $\\cos A=\\frac{1}{2}$.'), isSolved: (state) => state.b === 5 && state.c === 8 && near(hingeSide(state), 7) },
    { id: 102204, prompt: say('Egin zuzenketak, $-2bc\\cdot\\cos A$, 60 baino gehiago batzea.', 'Haz que la corrección, $-2bc\\cdot\\cos A$, sume más de 60.', 'اجعل التصحيح $-2bc\\cdot\\cos A$ يضيف أكثر من 60.', 'Make the correction, $-2bc\\cdot\\cos A$, add more than 60.'), hint: say('A kamutsa eta alde luzeak.', 'A obtuso y lados largos.', 'زاوية A منفرجة وأضلاع طويلة.', 'An obtuse A and long sides.'), isSolved: (state) => hingeCorrection(state) > 60 },
    { id: 102205, prompt: say('Lortu triangelu bat, $a$ aldea $b$ eta $c$ baino laburragoa duena.', 'Consigue un triángulo con $a$ más corto que $b$ y que $c$.', 'احصل على مثلث فيه $a$ أقصر من $b$ ومن $c$.', 'Get a triangle with $a$ shorter than both $b$ and $c$.'), hint: say('Itxi bisagra: A txikia.', 'Cierra la bisagra: A pequeño.', 'أغلق المفصل: A صغيرة.', 'Close the hinge: a small A.'), isSolved: (state) => hingeSide(state) < Math.min(state.b, state.c) - 1e-9 }
]

/** Endless practice: b and c are given, and a to the tenth; only one angle of the stepper gives it */
const hingeMaker: LabChallengeMaker<HingeState> = (random) => {
    for (;;) {
        const b = randomInt(random, 2, 8)
        const c = randomInt(random, 2, 8)
        const A = pick(random, [20, 30, 40, 50, 60, 70, 80, 100, 110, 120, 130, 140, 150])
        const target = Math.round(hingeSide({ b, c, A }) * 10) / 10
        const matches = (state: Pick<HingeState, 'b' | 'c' | 'A'>) => state.b === b && state.c === c && Math.abs(Math.round(hingeSide(state) * 10) / 10 - target) < 1e-9
        const angles = Array.from({ length: 17 }, (_, index) => 10 + 10 * index).filter((angle) => matches({ b, c, A: angle }))
        if (angles.length !== 1) continue
        const shown = String(target).replace('.', '{,}')
        return {
            prompt: say(`$b=${b}$ eta $c=${c}$ izanik, lortu $a\\approx ${shown}$.`, `Con $b=${b}$ y $c=${c}$, consigue $a\\approx ${shown}$.`, `مع $b=${b}$ و$c=${c}$ احصل على $a\\approx ${shown}$.`, `With $b=${b}$ and $c=${c}$, get $a\\approx ${shown}$.`),
            hint: A < 90
                ? say('$a^2$ txikiagoa da $b^2+c^2$ baino: A zorrotza.', '$a^2$ es menor que $b^2+c^2$: A agudo.', '$a^2$ أصغر من $b^2+c^2$: الزاوية A حادة.', '$a^2$ is less than $b^2+c^2$: A is acute.')
                : say('$a^2$ handiagoa da $b^2+c^2$ baino: A kamutsa.', '$a^2$ es mayor que $b^2+c^2$: A obtuso.', '$a^2$ أكبر من $b^2+c^2$: الزاوية A منفرجة.', '$a^2$ is greater than $b^2+c^2$: A is obtuse.'),
            isSolved: matches,
            solution: { b, c, A, prediction: null }
        }
    }
}

export const hingeExtra = freshFrom(initialHingeState, hingeMaker)
