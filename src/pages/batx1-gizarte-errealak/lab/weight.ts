import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L1 · Errore bera, pisu desberdina (El mismo error, distinto peso): two
   quantities of very different size from everyday economy (a salary and a
   coffee, a country and a village, a flat and a set menu). Each has a
   stepper for its absolute error, in steps of its own unit. The learner
   predicts which relative error is greater before the two bars show them
   as percentages, and the challenges ask for the error that weighs the
   same as a given one. Pure logic: the errors are whole numbers of steps.
   ========================================================================== */

export interface WeightPair {
    /** The big and the small quantity, and the step of each error */
    big: { value: number; step: number; label: LocalizedText; unit: 'euro' | 'people' }
    small: { value: number; step: number; label: LocalizedText; unit: 'euro' | 'people' }
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })

export const WEIGHT_PAIRS: WeightPair[] = [
    {
        big: { value: 30000, step: 100, label: say('Urteko soldata', 'Sueldo anual', 'الراتب السنوي', 'Annual salary'), unit: 'euro' },
        small: { value: 1.5, step: 0.01, label: say('Kafe bat', 'Un café', 'فنجان قهوة', 'A coffee'), unit: 'euro' }
    },
    {
        big: { value: 50000000, step: 100000, label: say('Herrialde bat', 'Un país', 'دولة', 'A country'), unit: 'people' },
        small: { value: 2000, step: 10, label: say('Herri bat', 'Un pueblo', 'قرية', 'A village'), unit: 'people' }
    },
    {
        big: { value: 200000, step: 1000, label: say('Etxebizitza bat', 'Un piso', 'شقة', 'A flat'), unit: 'euro' },
        small: { value: 12, step: 0.1, label: say('Eguneko menua', 'El menú del día', 'وجبة اليوم', 'The set menu'), unit: 'euro' }
    }
]

/** How many steps each error can take */
export const WEIGHT_STEPS = { min: 1, max: 30 } as const

export interface WeightState {
    pair: number
    /** The absolute errors, as a number of steps of each quantity */
    big: number
    small: number
    prediction: Prediction | null
}

export const initialWeightState: WeightState = { pair: 0, big: 1, small: 1, prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export function setWeight(state: WeightState, patch: Partial<Omit<WeightState, 'prediction'>>): WeightState {
    const pair = clamp(patch.pair ?? state.pair, 0, WEIGHT_PAIRS.length - 1)
    const big = clamp(patch.big ?? state.big, WEIGHT_STEPS.min, WEIGHT_STEPS.max)
    const small = clamp(patch.small ?? state.small, WEIGHT_STEPS.min, WEIGHT_STEPS.max)
    const same = pair === state.pair && big === state.big && small === state.small
    return { pair, big, small, prediction: same ? state.prediction : null }
}

/** The absolute errors, in euros or people (rounded to avoid 0.1 · 3 = 0.30000000000000004) */
export const absoluteErrors = ({ pair, big, small }: WeightState) => {
    const { big: b, small: s } = WEIGHT_PAIRS[pair]
    return { big: Math.round(big * b.step * 100) / 100, small: Math.round(small * s.step * 100) / 100 }
}

/** The relative errors, error ÷ value, as fractions of 1 */
export const relativeErrors = (state: WeightState) => {
    const { big, small } = absoluteErrors(state)
    const pair = WEIGHT_PAIRS[state.pair]
    return { big: big / pair.big.value, small: small / pair.small.value }
}

/** Does the error of the big quantity weigh less (<), the same (=) or more (>) than that of the small one? */
export const weightPrediction = (state: WeightState): Prediction => {
    const { big, small } = relativeErrors(state)
    return compareTo(Math.round(big * 1e9), Math.round(small * 1e9))
}

const sameWeight = (state: WeightState) => weightPrediction(state) === '='

export const weightChallenges: LabChallenge<WeightState>[] = [
    {
        id: 130101,
        prompt: say('Soldata eta kafea: jarri soldatan bere balioaren % 1 den errorea.', 'Sueldo y café: pon en el sueldo un error que sea el 1 % de su valor.', 'الراتب والقهوة: ضع في الراتب خطأً يساوي 1 % من قيمته.', 'Salary and coffee: give the salary an error that is 1% of its value.'),
        hint: say('$30\\,000$ zenbakiaren % 1: $300$ euro.', 'El 1 % de $30\\,000$: $300$ euros.', '1 % من $30\\,000$: ‏$300$ يورو.', '1% of $30\\,000$: $300$ euros.'),
        isSolved: (state) => state.pair === 0 && state.big === 3
    },
    {
        id: 130102,
        prompt: say('Kafean $0{,}05$ euroko errorea dago. Jarri soldatan pisu bera duen errorea.', 'El café tiene un error de $0{,}05$ euros. Pon en el sueldo el error que pesa lo mismo.', 'خطأ القهوة $0{,}05$ يورو. ضع في الراتب الخطأ الذي له الوزن نفسه.', 'The coffee has an error of $0{,}05$ euros. Give the salary the error that weighs the same.'),
        hint: say('$\\frac{0{,}05}{1{,}5}=\\frac{E}{30\\,000}$: soldata kafea baino $20\\,000$ aldiz handiagoa da.', '$\\frac{0{,}05}{1{,}5}=\\frac{E}{30\\,000}$: el sueldo es $20\\,000$ veces el café.', '$\\frac{0{,}05}{1{,}5}=\\frac{E}{30\\,000}$: الراتب يساوي ثمن القهوة $20\\,000$ مرة.', '$\\frac{0{,}05}{1{,}5}=\\frac{E}{30\\,000}$: the salary is $20\\,000$ times the coffee.'),
        isSolved: (state) => state.pair === 0 && state.small === 5 && sameWeight(state)
    },
    {
        id: 130103,
        prompt: say('Herrialdea eta herria: herrialdean milioi bat biztanleko errorea dago. Jarri herrian pisu bera duen errorea.', 'País y pueblo: el país tiene un error de un millón de habitantes. Pon en el pueblo el error que pesa lo mismo.', 'الدولة والقرية: خطأ الدولة مليون ساكن. ضع في القرية الخطأ الذي له الوزن نفسه.', 'Country and village: the country has an error of a million people. Give the village the error that weighs the same.'),
        hint: say('Milioi bat $50$ milioiko % 2 da. Eta $2000$ zenbakiaren % 2?', 'Un millón es el 2 % de $50$ millones. ¿Y el 2 % de $2000$?', 'المليون يساوي 2 % من $50$ مليونًا. وكم 2 % من $2000$؟', 'A million is 2% of $50$ million. And 2% of $2000$?'),
        isSolved: (state) => state.pair === 1 && state.big === 10 && state.small === 4
    },
    {
        id: 130104,
        prompt: say('Etxebizitza eta menua: menuan $0{,}30$ euroko errorea dago. Jarri etxebizitzan pisu bera duen errorea.', 'Piso y menú: el menú tiene un error de $0{,}30$ euros. Pon en el piso el error que pesa lo mismo.', 'الشقة والوجبة: خطأ الوجبة $0{,}30$ يورو. ضع في الشقة الخطأ الذي له الوزن نفسه.', 'Flat and set menu: the menu has an error of $0{,}30$ euros. Give the flat the error that weighs the same.'),
        hint: say('$\\frac{0{,}30}{12}=0{,}025$: % $2{,}5$. Eta $200\\,000$ zenbakiaren % $2{,}5$?', '$\\frac{0{,}30}{12}=0{,}025$: el $2{,}5$ %. ¿Y el $2{,}5$ % de $200\\,000$?', '$\\frac{0{,}30}{12}=0{,}025$: أي $2{,}5$ %. وكم $2{,}5$ % من $200\\,000$؟', '$\\frac{0{,}30}{12}=0{,}025$: $2{,}5$%. And $2{,}5$% of $200\\,000$?'),
        isSolved: (state) => state.pair === 2 && state.small === 3 && state.big === 5
    },
    {
        id: 130105,
        prompt: say('Herrialdean $100\\,000$ biztanleko errorea dago. Lortu herriaren errore erlatiboa herrialdearena baino 10 aldiz handiagoa izatea.', 'El país tiene un error de $100\\,000$ habitantes. Consigue que el error relativo del pueblo sea 10 veces el del país.', 'خطأ الدولة $100\\,000$ ساكن. اجعل الخطأ النسبي للقرية 10 أضعاف خطأ الدولة.', 'The country has an error of $100\\,000$ people. Make the village\'s relative error 10 times the country\'s.'),
        hint: say('Herrialdearena: $\\frac{100\\,000}{50\\,000\\,000}=0{,}002$. Herrikoa: $0{,}02$.', 'El del país: $\\frac{100\\,000}{50\\,000\\,000}=0{,}002$. El del pueblo: $0{,}02$.', 'خطأ الدولة: $\\frac{100\\,000}{50\\,000\\,000}=0{,}002$. وخطأ القرية: $0{,}02$.', 'The country\'s: $\\frac{100\\,000}{50\\,000\\,000}=0{,}002$. The village\'s: $0{,}02$.'),
        isSolved: (state) => state.pair === 1 && state.big === 1 && state.small === 4
    }
]

/** How the error of each pair is written in a challenge: in euros or people, with the comma */
const amount = (value: number) => (Number.isInteger(value) ? (value >= 10000 ? String(value).replace(/\B(?=(\d{3})+(?!\d))/g, '\\,') : String(value)) : value.toFixed(2).replace('.', '{,}'))

/** Endless practice: the small quantity has an error; find the error of the big one that weighs the same */
const weightMaker: LabChallengeMaker<WeightState> = (random) => {
    const pair = randomInt(random, 0, WEIGHT_PAIRS.length - 1)
    // small · step_s / value_s = big · step_b / value_b, with whole steps: per pair, small = p·m and big = q·m
    const ratio = [{ small: 1, big: 2 }, { small: 2, big: 5 }, { small: 3, big: 5 }][pair]
    const most = Math.floor(WEIGHT_STEPS.max / Math.max(ratio.small, ratio.big))
    const m = randomInt(random, 1, most)
    const small = ratio.small * m
    const big = ratio.big * m
    const solution = setWeight(initialWeightState, { pair, small, big })
    const error = amount(absoluteErrors(solution).small)
    const { big: b, small: s } = WEIGHT_PAIRS[pair]
    const unitEu = s.unit === 'euro' ? 'euro' : 'biztanle'
    const unitEs = s.unit === 'euro' ? 'euros' : 'habitantes'
    const unitAr = s.unit === 'euro' ? 'يورو' : 'ساكن'
    const unitEn = s.unit === 'euro' ? 'euros' : 'people'
    return {
        prompt: say(
            `${s.label.eu}: $${error}$ ${unitEu}ko errorea. «${b.label.eu}»: jarri pisu bera duen errorea.`,
            `${s.label.es}: error de $${error}$ ${unitEs}. «${b.label.es}»: pon el error que pesa lo mismo.`,
            `${s.label.ar}: خطأ قدره $${error}$ ${unitAr}. «${b.label.ar}»: ضع الخطأ الذي له الوزن نفسه.`,
            `${s.label.en}: an error of $${error}$ ${unitEn}. «${b.label.en}»: set the error that weighs the same.`
        ),
        hint: say(
            'Errore erlatiboak berdinak: $\\frac{E_1}{x_1}=\\frac{E_2}{x_2}$.',
            'Errores relativos iguales: $\\frac{E_1}{x_1}=\\frac{E_2}{x_2}$.',
            'خطآن نسبيان متساويان: $\\frac{E_1}{x_1}=\\frac{E_2}{x_2}$.',
            'Equal relative errors: $\\frac{E_1}{x_1}=\\frac{E_2}{x_2}$.'
        ),
        isSolved: (state) => state.pair === pair && state.small === small && state.big === big,
        solution
    }
}

export const weightExtra = freshFrom(initialWeightState, weightMaker)
