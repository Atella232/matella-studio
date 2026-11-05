import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L2 · Kalkulu-erregela (La regla de cálculo): two logarithmic scales from
   1 to 10. To multiply a · b, the 1 of the sliding scale goes over a on the
   fixed one, and the fixed scale under b reads a · b: the lengths log a and
   log b add up to log(a · b). To divide a : b, b goes over a and the 1 reads
   the quotient. Before reading, the learner predicts whether the product
   (or quotient) is smaller than, equal to or greater than the sum (or
   difference): log(a + b) is not log a + log b. Whole numbers whose result
   stays on the scale, from 1 to 10.
   ========================================================================== */

export type SlideOperation = 'times' | 'divide'

export const SLIDE_LIMITS = { min: 1, max: 10 } as const

export interface SlideState {
    operation: SlideOperation
    a: number
    b: number
    prediction: Prediction | null
}

export const initialSlideState: SlideState = { operation: 'times', a: 2, b: 3, prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

/** Keeps the result on the scale: a · b ≤ 10 when multiplying, b ≤ a when dividing */
export function setSlide(state: SlideState, patch: Partial<Omit<SlideState, 'prediction'>>): SlideState {
    const operation = patch.operation ?? state.operation
    const a = clamp(patch.a ?? state.a, SLIDE_LIMITS.min, SLIDE_LIMITS.max)
    const top = operation === 'times' ? Math.floor(SLIDE_LIMITS.max / a) : a
    const b = clamp(patch.b ?? state.b, SLIDE_LIMITS.min, top)
    const same = operation === state.operation && a === state.a && b === state.b
    return { operation, a, b, prediction: same ? state.prediction : null }
}

/** The number read on the fixed scale */
export const slideResult = ({ operation, a, b }: SlideState) => (operation === 'times' ? a * b : a / b)
/** Where the 1 of the sliding scale sits on the fixed one, as a logarithm (0 to 1) */
export const slideShift = ({ operation, a, b }: SlideState) => (operation === 'times' ? Math.log10(a) : Math.log10(a) - Math.log10(b))
/** The product against the sum, or the quotient against the difference */
export const slideCompared = (state: SlideState) => (state.operation === 'times' ? state.a + state.b : state.a - state.b)
export const slidePrediction = (state: SlideState): Prediction => compareTo(slideResult(state), slideCompared(state))

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })

export const slideChallenges: LabChallenge<SlideState>[] = [
    { id: 99201, prompt: say('Biderkatu $2\\cdot 4$ erregelarekin.', 'Multiplica $2\\cdot 4$ con la regla.', 'اضرب $2\\cdot 4$ بالمسطرة.', 'Multiply $2\\cdot 4$ with the rule.'), hint: say('Jarri mugikorraren 1 finkoaren 2 zenbakiaren gainean, eta irakurri 4 zenbakiaren azpian.', 'Pon el 1 de la móvil sobre el 2 de la fija y lee debajo del 4.', 'ضع 1 المتحركة فوق 2 الثابتة واقرأ تحت 4.', 'Put the 1 of the sliding scale over the 2 of the fixed one and read under the 4.'), isSolved: (state) => state.operation === 'times' && slideResult(state) === 8 && [state.a, state.b].includes(2) },
    { id: 99202, prompt: say('Lortu 9, bi zenbaki berdin biderkatuz.', 'Consigue el 9 multiplicando dos números iguales.', 'احصل على 9 بضرب عددين متساويين.', 'Get 9 by multiplying two equal numbers.'), hint: say('$\\log 9=2\\log 3$.', '$\\log 9=2\\log 3$.', '$\\log 9=2\\log 3$.', '$\\log 9=2\\log 3$.'), isSolved: (state) => state.operation === 'times' && state.a === 3 && state.b === 3 },
    { id: 99203, prompt: say('Zatitu $8\\div 2$ erregelarekin.', 'Divide $8\\div 2$ con la regla.', 'اقسم $8\\div 2$ بالمسطرة.', 'Divide $8\\div 2$ with the rule.'), hint: say('Zatitzean luzerak kentzen dira: 2 zenbakia 8 zenbakiaren gainean.', 'Al dividir se restan las longitudes: el 2 sobre el 8.', 'عند القسمة تُطرح الأطوال: 2 فوق 8.', 'When dividing, the lengths are subtracted: the 2 over the 8.'), isSolved: (state) => state.operation === 'divide' && state.a === 8 && state.b === 2 },
    { id: 99204, prompt: say('Lortu 10, bi zenbaki biderkatuz, eta biak 1 ez izanik.', 'Consigue el 10 multiplicando dos números distintos de 1.', 'احصل على 10 بضرب عددين مختلفين عن 1.', 'Get 10 by multiplying two numbers other than 1.'), hint: say('Bi luzerek erregela osoa bete behar dute.', 'Las dos longitudes deben llenar la regla entera.', 'يجب أن يملأ الطولان المسطرة كلها.', 'The two lengths must fill the whole rule.'), isSolved: (state) => state.operation === 'times' && slideResult(state) === 10 && state.a > 1 && state.b > 1 },
    { id: 99205, prompt: say('Bilatu biderkadura bat, batura bera ematen duena: $a\\cdot b=a+b$.', 'Busca un producto que dé lo mismo que la suma: $a\\cdot b=a+b$.', 'ابحث عن ضرب يساوي المجموع: $a\\cdot b=a+b$.', 'Find a product that equals the sum: $a\\cdot b=a+b$.'), hint: say('Txikiak probatu: 1 zenbakiarekin beti txikiagoa da.', 'Prueba con números pequeños: con el 1 siempre sale menor.', 'جرّب أعدادًا صغيرة: مع 1 يكون الناتج دائمًا أصغر.', 'Try small numbers: with 1 it always comes out smaller.'), isSolved: (state) => state.operation === 'times' && state.a === 2 && state.b === 2 }
]

/** Endless practice: a product that stays on the scale, or a division with a whole quotient */
const slideMaker: LabChallengeMaker<SlideState> = (random) => {
    if (pick(random, ['times', 'divide'] as const) === 'times') {
        const a = randomInt(random, 2, 5)
        const b = randomInt(random, 2, Math.floor(10 / a))
        return {
            prompt: say(`Biderkatu $${a}\\cdot ${b}$ erregelarekin.`, `Multiplica $${a}\\cdot ${b}$ con la regla.`, `اضرب $${a}\\cdot ${b}$ بالمسطرة.`, `Multiply $${a}\\cdot ${b}$ with the rule.`),
            hint: say(`$\\log ${a}+\\log ${b}=\\log ${a * b}$`, `$\\log ${a}+\\log ${b}=\\log ${a * b}$`, `$\\log ${a}+\\log ${b}=\\log ${a * b}$`, `$\\log ${a}+\\log ${b}=\\log ${a * b}$`),
            isSolved: (state) => state.operation === 'times' && state.a === a && state.b === b,
            solution: { operation: 'times', a, b, prediction: null }
        }
    }
    const b = randomInt(random, 2, 5)
    const quotient = randomInt(random, 1, Math.floor(10 / b))
    const a = b * quotient
    return {
        prompt: say(`Zatitu $${a}\\div ${b}$ erregelarekin.`, `Divide $${a}\\div ${b}$ con la regla.`, `اقسم $${a}\\div ${b}$ بالمسطرة.`, `Divide $${a}\\div ${b}$ with the rule.`),
        hint: say(`$\\log ${a}-\\log ${b}=\\log ${quotient}$`, `$\\log ${a}-\\log ${b}=\\log ${quotient}$`, `$\\log ${a}-\\log ${b}=\\log ${quotient}$`, `$\\log ${a}-\\log ${b}=\\log ${quotient}$`),
        isSolved: (state) => state.operation === 'divide' && state.a === a && state.b === b,
        solution: { operation: 'divide', a, b, prediction: null }
    }
}

export const slideExtra = freshFrom(initialSlideState, slideMaker)
