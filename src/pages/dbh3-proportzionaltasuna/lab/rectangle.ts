import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { freshFrom, type Prediction } from './prediction.ts'

/* ==========================================================================
   L2 · El rectángulo que se estira: two ways of changing a rectangle.
   With a fixed area k, the base x and the height y = k / x are inversely
   proportional and the corners trace a hyperbola. With a fixed height k,
   the base x and the area y = k · x are directly proportional and the
   points lie on a line through the origin. The learner predicts what
   doubling the base does to y (half, the same, double), then moves the
   base and sees the point run along its graph. Bases go in halves, so
   that 7,5 or 2,5 can be reached; state is kept in halves to stay exact.
   ========================================================================== */

export type RectangleMode = 'inverse' | 'direct'

export const RECTANGLE_LIMITS = { k: { min: 2, max: 36 }, halves: { min: 2, max: 24 } } as const

export interface RectangleState {
    mode: RectangleMode
    /** The fixed area (inverse) or the fixed height (direct) */
    k: number
    /** The base, in halves of a unit: 6 is a base of 3 */
    halves: number
    prediction: Prediction | null
}

export const initialRectangleState: RectangleState = { mode: 'inverse', k: 12, halves: 4, prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export function setRectangle(state: RectangleState, patch: Partial<Omit<RectangleState, 'prediction'>>): RectangleState {
    const mode = patch.mode ?? state.mode
    const k = clamp(patch.k ?? state.k, RECTANGLE_LIMITS.k.min, mode === 'direct' ? 6 : RECTANGLE_LIMITS.k.max)
    const halves = clamp(patch.halves ?? state.halves, RECTANGLE_LIMITS.halves.min, RECTANGLE_LIMITS.halves.max)
    // The prediction is about the relationship, so only a change of mode asks for a new one
    return { mode, k, halves, prediction: mode === state.mode ? state.prediction : null }
}

export const rectangleBase = (state: RectangleState) => state.halves / 2
/** The other quantity: the height (inverse) or the area (direct) */
export const rectangleY = (state: RectangleState) => (state.mode === 'inverse' ? state.k / rectangleBase(state) : state.k * rectangleBase(state))
export const rectangleHeight = (state: RectangleState) => (state.mode === 'inverse' ? rectangleY(state) : state.k)
/** What doubling the base does to y: half (<), the same (=) or double (>) */
export const rectanglePrediction = (state: RectangleState): Prediction => (state.mode === 'inverse' ? '<' : '>')

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const dec = (value: number) => String(value).replace('.', '{,}')

export const rectangleChallenges: LabChallenge<RectangleState>[] = [
    {
        id: 87201,
        prompt: say('Azalera 24 da. Aurkitu altuera 3 duen laukizuzena.', 'Área 24. Encuentra el rectángulo de altura 3.', 'المساحة 24. جد المستطيل الذي ارتفاعه 3.', 'Area 24. Find the rectangle with a height of 3.'),
        hint: say('$x\\cdot 3=24$.', '$x\\cdot 3=24$.', '$x\\cdot 3=24$.', '$x\\cdot 3=24$.'),
        isSolved: (state) => state.mode === 'inverse' && state.k === 24 && state.halves === 16
    },
    {
        id: 87202,
        prompt: say('Egin 36 azalerako karratu bat.', 'Haz un cuadrado de área 36.', 'اصنع مربعًا مساحته 36.', 'Make a square with an area of 36.'),
        hint: say('Karratuan oinarria eta altuera berdinak dira.', 'En un cuadrado la base y la altura son iguales.', 'في المربع القاعدة والارتفاع متساويان.', 'In a square, the base and the height are equal.'),
        isSolved: (state) => state.mode === 'inverse' && state.k === 36 && state.halves === 12
    },
    {
        id: 87203,
        prompt: say('Altuera finkoa, 3. Lortu 18 azalera.', 'Altura fija, 3. Consigue un área de 18.', 'ارتفاع ثابت 3. احصل على مساحة 18.', 'Fixed height, 3. Get an area of 18.'),
        hint: say('Zuzena: $3\\cdot x=18$.', 'Directa: $3\\cdot x=18$.', 'طردي: $3\\cdot x=18$.', 'Direct: $3\\cdot x=18$.'),
        isSolved: (state) => state.mode === 'direct' && state.k === 3 && state.halves === 12
    },
    {
        id: 87204,
        prompt: say('Azalera 30 da. Aurkitu altuera $2{,}5$ duen laukizuzena.', 'Área 30. Encuentra el rectángulo de altura $2{,}5$.', 'المساحة 30. جد المستطيل الذي ارتفاعه $2{,}5$.', 'Area 30. Find the rectangle with a height of $2{,}5$.'),
        hint: say('$30\\mathbin{:}2{,}5=12$.', '$30\\mathbin{:}2{,}5=12$.', '$30\\mathbin{:}2{,}5=12$.', '$30\\mathbin{:}2{,}5=12$.'),
        isSolved: (state) => state.mode === 'inverse' && state.k === 30 && state.halves === 24
    },
    {
        id: 87205,
        prompt: say('Azalera 20 da. Lortu altuera oinarriaren bost aldiz.', 'Área 20. Consigue que la altura sea cinco veces la base.', 'المساحة 20. اجعل الارتفاع خمسة أضعاف القاعدة.', 'Area 20. Make the height five times the base.'),
        hint: say('$x\\cdot 5x=20$, beraz $x^{2}=4$.', '$x\\cdot 5x=20$, así que $x^{2}=4$.', '$x\\cdot 5x=20$ إذن $x^{2}=4$.', '$x\\cdot 5x=20$, so $x^{2}=4$.'),
        isSolved: (state) => state.mode === 'inverse' && state.k === 20 && state.halves === 4
    }
]

/** Endless practice: a height to reach with a fixed area, or an area with a fixed height */
const rectangleMaker: LabChallengeMaker<RectangleState> = (random) => {
    if (random() < 0.6) {
        for (;;) {
            const halves = randomInt(random, 2, 24)
            const base = halves / 2
            const height = pick(random, [1, 1.5, 2, 2.5, 3, 4, 5, 6])
            const k = base * height
            if (!Number.isInteger(k) || k < RECTANGLE_LIMITS.k.min || k > RECTANGLE_LIMITS.k.max) continue
            return {
                prompt: say(`Azalera ${k} da. Aurkitu altuera $${dec(height)}$ duen laukizuzena.`, `Área ${k}. Encuentra el rectángulo de altura $${dec(height)}$.`, `المساحة ${k}. جد المستطيل الذي ارتفاعه $${dec(height)}$.`, `Area ${k}. Find the rectangle with a height of $${dec(height)}$.`),
                hint: say(`$x=${k}\\mathbin{:}${dec(height)}$.`, `$x=${k}\\mathbin{:}${dec(height)}$.`, `$x=${k}\\mathbin{:}${dec(height)}$.`, `$x=${k}\\mathbin{:}${dec(height)}$.`),
                isSolved: (state) => state.mode === 'inverse' && state.k === k && state.halves === halves,
                solution: { mode: 'inverse', k, halves, prediction: null }
            }
        }
    }
    const k = randomInt(random, 2, 6)
    const halves = randomInt(random, 1, 12) * 2
    const area = k * (halves / 2)
    return {
        prompt: say(`Altuera finkoa, ${k}. Lortu ${area} azalera.`, `Altura fija, ${k}. Consigue un área de ${area}.`, `ارتفاع ثابت ${k}. احصل على مساحة ${area}.`, `Fixed height, ${k}. Get an area of ${area}.`),
        hint: say(`$${k}\\cdot x=${area}$.`, `$${k}\\cdot x=${area}$.`, `$${k}\\cdot x=${area}$.`, `$${k}\\cdot x=${area}$.`),
        isSolved: (state) => state.mode === 'direct' && state.k === k && state.halves === halves,
        solution: { mode: 'direct', k, halves, prediction: null }
    }
}

export const rectangleExtra = freshFrom(initialRectangleState, rectangleMaker)
