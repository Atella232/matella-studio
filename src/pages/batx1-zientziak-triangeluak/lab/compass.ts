import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { say } from '../../dbh4-akademikoak-trigonometria/text.ts'

/* ==========================================================================
   L1 · Kasu zalantzazkoaren konpasa (El compás del caso dudoso): the angle
   A at the left end of a ray, the side b = AC leaving at that angle, and a
   compass of opening a centred on C. Where the compass cuts the ray are
   the possible vertices B: none (a is shorter than the height
   h = b · sen A), one (it just touches, or the other cut falls behind A),
   or two. The learner first predicts how many triangles there are; then
   the cuts, the triangles and the angles B are drawn. Pure logic.
   ========================================================================== */

export const COMPASS_LIMITS = { A: { min: 15, max: 150, step: 5 }, b: { min: 2, max: 8 }, a: { min: 1, max: 10 } }

export interface CompassState {
    A: number
    b: number
    a: number
    prediction: Prediction | null
}

export const initialCompassState: CompassState = { A: 40, b: 6, a: 7, prediction: null }

const D = Math.PI / 180
const EPSILON = 1e-9
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))
const snap = (value: number, step: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value / step) * step))

export function setCompass(state: CompassState, patch: Partial<Omit<CompassState, 'prediction'>>): CompassState {
    const A = snap(patch.A ?? state.A, COMPASS_LIMITS.A.step, COMPASS_LIMITS.A.min, COMPASS_LIMITS.A.max)
    const b = clamp(patch.b ?? state.b, COMPASS_LIMITS.b.min, COMPASS_LIMITS.b.max)
    const a = clamp(patch.a ?? state.a, COMPASS_LIMITS.a.min, COMPASS_LIMITS.a.max)
    const same = A === state.A && b === state.b && a === state.a
    return { A, b, a, prediction: same ? state.prediction : null }
}

/** The distance from C to the ray: the shortest a can be */
export const compassHeight = ({ A, b }: Pick<CompassState, 'A' | 'b'>) => b * Math.sin(A * D)

/**
 * Where the compass cuts the ray, as distances AB from A (only the ones in front of A, nearest first): the
 * cuts are b · cos A ± √(a² − h²)
 */
export function compassCuts({ A, b, a }: Pick<CompassState, 'A' | 'b' | 'a'>): number[] {
    const h = compassHeight({ A, b })
    const foot = b * Math.cos(A * D)
    if (a < h - EPSILON) return []
    if (Math.abs(a - h) < EPSILON) return foot > EPSILON ? [foot] : []
    const half = Math.sqrt(a * a - h * h)
    return [foot - half, foot + half].filter((cut) => cut > EPSILON)
}

/** How many triangles the data give: 0, 1 or 2 */
export const triangleCount = (state: Pick<CompassState, 'A' | 'b' | 'a'>) => compassCuts(state).length
/** Fewer than one triangle (<), exactly one (=) or two (>) */
export const compassPrediction = (state: CompassState): Prediction => compareTo(triangleCount(state), 1)

/** The angle B of each triangle, in the order of the cuts (nearest vertex first) */
export function compassAngles(state: Pick<CompassState, 'A' | 'b' | 'a'>): number[] {
    const h = compassHeight(state)
    const foot = state.b * Math.cos(state.A * D)
    return compassCuts(state).map((cut) => {
        // The angle at B between BA (pointing back to A) and BC
        const angle = Math.atan2(h, foot - cut) / D
        return 180 - angle
    })
}

/** sen B from the sine rule: b · sen A / a */
export const compassSine = ({ A, b, a }: Pick<CompassState, 'A' | 'b' | 'a'>) => (b * Math.sin(A * D)) / a

const setUp = (state: CompassState, A: number, b: number) => state.A === A && state.b === b

export const compassChallenges: LabChallenge<CompassState>[] = [
    { id: 102101, prompt: say('$A=40°$ eta $b=8$ izanik, lortu bi triangelu.', 'Con $A=40°$ y $b=8$, consigue dos triángulos.', 'مع $A=40°$ و$b=8$ احصل على مثلثين.', 'With $A=40°$ and $b=8$, get two triangles.'), hint: say('$a$ altuera baino luzeagoa izan behar du, baina $b$ baino laburragoa.', '$a$ tiene que ser más largo que la altura, pero más corto que $b$.', 'يجب أن يكون $a$ أطول من الارتفاع وأقصر من $b$.', '$a$ has to be longer than the height but shorter than $b$.'), isSolved: (state) => setUp(state, 40, 8) && triangleCount(state) === 2 },
    { id: 102102, prompt: say('$A=30°$ eta $b=8$ izanik, egin konpasak zuzena ukitu besterik ez egitea: triangelu angeluzuzen bakarra.', 'Con $A=30°$ y $b=8$, haz que el compás solo toque la recta: un único triángulo, rectángulo.', 'مع $A=30°$ و$b=8$ اجعل الفرجار يلمس المستقيم فقط: مثلث واحد قائم.', 'With $A=30°$ and $b=8$, make the compass just touch the line: a single right-angled triangle.'), hint: say('$a$ altuera bera izan behar da: $a=8\\cdot\\sen 30°$.', '$a$ tiene que medir lo mismo que la altura: $a=8\\cdot\\sen 30°$.', 'يجب أن يساوي $a$ الارتفاع: $a=8\\cdot\\sen 30°$.', '$a$ must be as long as the height: $a=8\\cdot\\sin 30°$.'), isSolved: (state) => setUp(state, 30, 8) && state.a === 4 },
    { id: 102103, prompt: say('$A=50°$ eta $b=6$ izanik, egin triangelurik ez egotea.', 'Con $A=50°$ y $b=6$, haz que no haya ningún triángulo.', 'مع $A=50°$ و$b=6$ اجعل المثلث غير موجود.', 'With $A=50°$ and $b=6$, make it so there is no triangle.'), hint: say('$a$ ez da zuzenera iristen altuera baino laburragoa bada.', '$a$ no llega a la recta si es más corto que la altura.', 'لا يصل $a$ إلى المستقيم إذا كان أقصر من الارتفاع.', '$a$ does not reach the line if it is shorter than the height.'), isSolved: (state) => setUp(state, 50, 6) && triangleCount(state) === 0 },
    { id: 102104, prompt: say('Jarri $A=120°$ eta lortu triangelu bat.', 'Pon $A=120°$ y consigue un triángulo.', 'ضع $A=120°$ واحصل على مثلث.', 'Set $A=120°$ and get a triangle.'), hint: say('A kamutsa bada, $a$ aldeak $b$ baino luzeagoa izan behar du.', 'Si A es obtuso, $a$ tiene que ser más largo que $b$.', 'إذا كانت A منفرجة وجب أن يكون $a$ أطول من $b$.', 'If A is obtuse, $a$ has to be longer than $b$.'), isSolved: (state) => state.A === 120 && triangleCount(state) === 1 },
    { id: 102105, prompt: say('$b=6$ eta $a=5$ izanik, aukeratu A bi triangelu egon daitezen.', 'Con $b=6$ y $a=5$, elige A para que haya dos triángulos.', 'مع $b=6$ و$a=5$ اختر A ليوجد مثلثان.', 'With $b=6$ and $a=5$, choose A so that there are two triangles.'), hint: say('Altuerak, $6\\cdot\\sen A$, 5 baino txikiagoa izan behar du.', 'La altura, $6\\cdot\\sen A$, tiene que ser menor que 5.', 'يجب أن يكون الارتفاع $6\\cdot\\sen A$ أصغر من 5.', 'The height, $6\\cdot\\sin A$, must be less than 5.'), isSolved: (state) => state.b === 6 && state.a === 5 && triangleCount(state) === 2 }
]

const COUNT_WORDS = [
    say('triangelurik ez', 'ningún triángulo', 'لا مثلث', 'no triangle'),
    say('triangelu bakarra', 'un solo triángulo', 'مثلثًا واحدًا', 'a single triangle'),
    say('bi triangelu', 'dos triángulos', 'مثلثين', 'two triangles')
]

/** Endless practice: A and b are given, the learner opens the compass for 0, 1 or 2 triangles */
const compassMaker: LabChallengeMaker<CompassState> = (random) => {
    for (;;) {
        const A = pick(random, [25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 110, 120, 130])
        const b = randomInt(random, 4, 8)
        const count = pick(random, [0, 1, 2])
        const options = Array.from({ length: COMPASS_LIMITS.a.max }, (_, index) => index + 1).filter((a) => triangleCount({ A, b, a }) === count)
        if (options.length === 0) continue
        const words = COUNT_WORDS[count]
        return {
            prompt: say(`$A=${A}°$ eta $b=${b}$ izanik, ireki konpasa eta lortu ${words.eu}.`, `Con $A=${A}°$ y $b=${b}$, abre el compás y consigue ${words.es}.`, `مع $A=${A}°$ و$b=${b}$ افتح الفرجار واحصل على ${words.ar}.`, `With $A=${A}°$ and $b=${b}$, open the compass and get ${words.en}.`),
            hint: A > 90
                ? say('A kamutsa denean, $a>b$ bada triangelu bat dago; bestela, bat ere ez.', 'Con A obtuso hay un triángulo si $a>b$; si no, ninguno.', 'مع A المنفرجة يوجد مثلث إذا كان $a>b$، وإلا فلا مثلث.', 'With an obtuse A there is one triangle if $a>b$; otherwise none.')
                : say(`Konparatu $a$ altuerarekin, $${b}\\cdot\\sen ${A}°$, eta $b$ aldearekin.`, `Compara $a$ con la altura, $${b}\\cdot\\sen ${A}°$, y con $b$.`, `قارن $a$ بالارتفاع $${b}\\cdot\\sen ${A}°$ وبالضلع $b$.`, `Compare $a$ with the height, $${b}\\cdot\\sin ${A}°$, and with $b$.`),
            isSolved: (state) => setUp(state, A, b) && triangleCount(state) === count,
            solution: { A, b, a: pick(random, options), prediction: null }
        }
    }
}

export const compassExtra = freshFrom(initialCompassState, compassMaker)
