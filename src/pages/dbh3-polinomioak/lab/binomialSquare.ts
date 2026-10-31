import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { freshFrom, type Prediction } from './prediction.ts'

/* ==========================================================================
   L2 · Binomioaren karratua (El cuadrado del binomio): the three special
   products drawn as areas, with a and b as lengths. (a + b)² is a square
   cut into a², b² and two ab rectangles; (a − b)² is what is left of a²
   after taking away two strips; (a + b)(a − b) is a² with the b² corner
   cut off. The learner predicts how the area compares with a² + b² (or
   with a² for the last one), then ▶ cuts the figure into its pieces.
   Pure logic, whole numbers only.
   ========================================================================== */

export type SquareMode = 'sum' | 'diff' | 'product'

export const SQUARE_LIMITS = { a: { min: 2, max: 9 }, b: { min: 1, max: 6 } } as const

export interface SquareState {
    mode: SquareMode
    a: number
    b: number
    prediction: Prediction | null
}

export const initialSquareState: SquareState = { mode: 'sum', a: 5, b: 2, prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export function setSquare(state: SquareState, patch: Partial<Omit<SquareState, 'prediction'>>): SquareState {
    const mode = patch.mode ?? state.mode
    const a = clamp(patch.a ?? state.a, SQUARE_LIMITS.a.min, SQUARE_LIMITS.a.max)
    // In a difference, b stays smaller than a so that every length is positive
    const b = clamp(patch.b ?? state.b, SQUARE_LIMITS.b.min, mode === 'sum' ? SQUARE_LIMITS.b.max : Math.min(SQUARE_LIMITS.b.max, a - 1))
    return { mode, a, b, prediction: mode === state.mode ? state.prediction : null }
}

/** The area the special product gives */
export function squareArea(state: SquareState): number {
    if (state.mode === 'sum') return (state.a + state.b) ** 2
    if (state.mode === 'diff') return (state.a - state.b) ** 2
    return (state.a + state.b) * (state.a - state.b)
}

/** What a learner who forgets the middle term would expect: a² + b² (or a² for the product) */
export const squareNaive = (state: SquareState) => (state.mode === 'product' ? state.a ** 2 : state.a ** 2 + state.b ** 2)
/** Is the real area smaller (<), equal (=) or larger (>) than the naive one? It is never equal. */
export const squarePrediction = (state: SquareState): Prediction => (state.mode === 'sum' ? '>' : '<')

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })

export const squareChallenges: LabChallenge<SquareState>[] = [
    { id: 91201, prompt: say('Erakutsi $(7+3)^{2}=100$.', 'Muestra $(7+3)^{2}=100$.', 'أظهر $(7+3)^{2}=100$.', 'Show $(7+3)^{2}=100$.'), hint: say('Batura, $a=7$ eta $b=3$.', 'Suma, con $a=7$ y $b=3$.', 'مجموع مع $a=7$ و$b=3$.', 'Sum, with $a=7$ and $b=3$.'), isSolved: (state) => state.mode === 'sum' && state.a === 7 && state.b === 3 },
    { id: 91202, prompt: say('Batura baten karratua 81 izan dadin, bi laukizuzenak batera 36 izanik.', 'Que el cuadrado de una suma sea 81 y los dos rectángulos juntos midan 36.', 'اجعل مربع المجموع 81 ومساحة المستطيلين معًا 36.', 'Make the square of a sum equal 81, with the two rectangles together making 36.'), hint: say('$a+b=9$ eta $2ab=36$.', '$a+b=9$ y $2ab=36$.', '$a+b=9$ و$2ab=36$.', '$a+b=9$ and $2ab=36$.'), isSolved: (state) => state.mode === 'sum' && state.a + state.b === 9 && 2 * state.a * state.b === 36 },
    { id: 91203, prompt: say('$a=9$ dela, lortu $(a-b)^{2}=16$.', 'Con $a=9$, consigue $(a-b)^{2}=16$.', 'مع $a=9$ احصل على $(a-b)^{2}=16$.', 'With $a=9$, get $(a-b)^{2}=16$.'), hint: say('$a-b=4$.', '$a-b=4$.', '$a-b=4$.', '$a-b=4$.'), isSolved: (state) => state.mode === 'diff' && state.a === 9 && state.b === 5 },
    { id: 91204, prompt: say('$a=7$ dela, lortu $(a+b)(a-b)=40$.', 'Con $a=7$, consigue $(a+b)(a-b)=40$.', 'مع $a=7$ احصل على $(a+b)(a-b)=40$.', 'With $a=7$, get $(a+b)(a-b)=40$.'), hint: say('$49-b^{2}=40$.', '$49-b^{2}=40$.', '$49-b^{2}=40$.', '$49-b^{2}=40$.'), isSolved: (state) => state.mode === 'product' && state.a === 7 && state.b === 3 },
    { id: 91205, prompt: say('Batura baten karratuan, lortu bi laukizuzenak batera bi karratuen adina izatea.', 'En el cuadrado de una suma, consigue que los dos rectángulos juntos midan lo mismo que los dos cuadrados.', 'في مربع المجموع اجعل المستطيلين معًا يساويان المربعين.', 'In the square of a sum, make the two rectangles together the same size as the two squares.'), hint: say('$2ab=a^{2}+b^{2}$: noiz?', '$2ab=a^{2}+b^{2}$: ¿cuándo?', '$2ab=a^{2}+b^{2}$: متى؟', '$2ab=a^{2}+b^{2}$: when?'), isSolved: (state) => state.mode === 'sum' && state.a === state.b }
]

const MODES: SquareMode[] = ['sum', 'diff', 'product']

/** Endless practice: an area to reach with a given a */
const squareMaker: LabChallengeMaker<SquareState> = (random) => {
    for (;;) {
        const mode = MODES[randomInt(random, 0, 2)]
        const a = randomInt(random, 3, 9)
        const b = randomInt(random, 1, mode === 'sum' ? 6 : a - 1)
        const state: SquareState = { mode, a, b, prediction: null }
        const area = squareArea(state)
        const formula = mode === 'sum' ? '(a+b)^{2}' : mode === 'diff' ? '(a-b)^{2}' : '(a+b)(a-b)'
        return {
            prompt: say(`$a=${a}$ dela, lortu $${formula}=${area}$.`, `Con $a=${a}$, consigue $${formula}=${area}$.`, `مع $a=${a}$ احصل على $${formula}=${area}$.`, `With $a=${a}$, get $${formula}=${area}$.`),
            hint: say(`Saiatu $b$ desberdinekin.`, `Prueba distintos valores de $b$.`, `جرّب قيمًا مختلفة لـ $b$.`, `Try different values of $b$.`),
            isSolved: (current) => current.mode === mode && current.a === a && squareArea(current) === area,
            solution: state
        }
    }
}

export const squareExtra = freshFrom(initialSquareState, squareMaker)
