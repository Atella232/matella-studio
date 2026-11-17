import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L1 · Noiz bikoizten da? (¿Cuándo se duplica?): 1000 euros at a yearly
   interest of 1 % to 12 % grow year after year as a staircase of bars,
   until they reach the goal: double, triple or one and a half times. The
   learner predicts whether it takes fewer, exactly or more than 10 years;
   then the years come from logarithms, n = log(goal) ÷ log(1 + i), rounded
   up, next to the rule of 72. Pure logic.
   ========================================================================== */

export type DoubleGoal = 'half' | 'double' | 'triple'
export const DOUBLE_GOALS: Record<DoubleGoal, number> = { half: 1.5, double: 2, triple: 3 }
export const DOUBLE_RATES = { min: 1, max: 12 } as const
export const DOUBLE_REFERENCE = 10

export interface DoubleState {
    rate: number
    goal: DoubleGoal
    prediction: Prediction | null
}

export const initialDoubleState: DoubleState = { rate: 5, goal: 'double', prediction: null }

export function setDouble(state: DoubleState, patch: Partial<Omit<DoubleState, 'prediction'>>): DoubleState {
    const rate = Math.min(DOUBLE_RATES.max, Math.max(DOUBLE_RATES.min, Math.round(patch.rate ?? state.rate)))
    const goal = patch.goal ?? state.goal
    const same = rate === state.rate && goal === state.goal
    return { rate, goal, prediction: same ? state.prediction : null }
}

/** The exact time n = log(goal) ÷ log(1 + i) */
export const exactYears = ({ rate, goal }: Pick<DoubleState, 'rate' | 'goal'>) => Math.log(DOUBLE_GOALS[goal]) / Math.log(1 + rate / 100)
/** Whole years: the bank pays at the end of each year */
export const yearsNeeded = (state: Pick<DoubleState, 'rate' | 'goal'>) => Math.ceil(exactYears(state) - 1e-9)
/** Fewer (<), exactly (=) or more (>) than 10 years */
export const doublePrediction = (state: DoubleState): Prediction => compareTo(yearsNeeded(state), DOUBLE_REFERENCE)

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })

export const goalWords: Record<DoubleGoal, LocalizedText> = {
    half: say('bider $1{,}5$', 'por $1{,}5$', 'مضروبًا في $1{,}5$', 'times $1{,}5$'),
    double: say('bikoitza', 'el doble', 'الضعف', 'double'),
    triple: say('hirukoitza', 'el triple', 'ثلاثة أضعاف', 'triple')
}

export const doubleChallenges: LabChallenge<DoubleState>[] = [
    {
        id: 131101,
        prompt: say('Bilatu dirua 10 urte baino gutxiagoan bikoizten duen interes bat.', 'Busca un interés que duplique el dinero en menos de 10 años.', 'ابحث عن فائدة تضاعف المال في أقل من 10 سنوات.', 'Find an interest that doubles the money in fewer than 10 years.'),
        hint: say('Hirurogeita hamabiren araua: 72 zati interesa, gutxi gorabehera urteak.', 'Regla del 72: 72 entre el interés da, más o menos, los años.', 'قاعدة الـ72: قسمة 72 على الفائدة تعطي السنوات تقريبًا.', 'The rule of 72: 72 divided by the interest gives roughly the years.'),
        isSolved: (state) => state.goal === 'double' && yearsNeeded(state) < 10
    },
    {
        id: 131102,
        prompt: say('Zein interesekin bikoizten da dirua 12 urtean, ez lehenago?', '¿Con qué interés se duplica el dinero justo en 12 años?', 'بأيّ فائدة يتضاعف المال في 12 سنة بالضبط؟', 'At what interest does the money double in exactly 12 years?'),
        hint: same('$\\frac{72}{12}=6$'),
        isSolved: (state) => state.goal === 'double' && yearsNeeded(state) === 12
    },
    {
        id: 131103,
        prompt: say('Hirukoiztu dirua 15 urtean edo gutxiagoan, ahalik eta interes txikienarekin.', 'Triplica el dinero en 15 años o menos, con el menor interés posible.', 'ضاعف المال ثلاث مرات في 15 سنة أو أقل بأقل فائدة ممكنة.', 'Triple the money in 15 years or fewer, with the lowest possible interest.'),
        hint: say('Probatu % 7 eta % 8.', 'Prueba el 7 % y el 8 %.', 'جرّب 7 % و8 %.', 'Try 7% and 8%.'),
        isSolved: (state) => state.goal === 'triple' && state.rate === 8
    },
    {
        id: 131104,
        prompt: say('% 3an, zenbat urte behar dira dirua hirukoizteko? Jarri eta begiratu.', 'Al 3 %, ¿cuántos años hacen falta para triplicar el dinero? Ponlo y míralo.', 'بفائدة 3 %، كم سنة تلزم لمضاعفة المال ثلاث مرات؟ ضعها وانظر.', 'At 3%, how many years does it take to triple the money? Set it and look.'),
        hint: same('$\\frac{\\log 3}{\\log 1{,}03}$'),
        isSolved: (state) => state.goal === 'triple' && state.rate === 3
    },
    {
        id: 131105,
        prompt: say('Bilatu dirua bider $1{,}5$ egiteko 7 urte behar dituen interesa.', 'Busca el interés con el que el dinero se multiplica por $1{,}5$ justo en 7 años.', 'ابحث عن الفائدة التي يُضرب بها المال في $1{,}5$ في 7 سنوات بالضبط.', 'Find the interest at which the money is multiplied by $1{,}5$ in exactly 7 years.'),
        hint: same('$1{,}06^{7}\\approx 1{,}5$'),
        isSolved: (state) => state.goal === 'half' && yearsNeeded(state) === 7
    }
]

function same(value: string): LocalizedText {
    return { eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') }
}

/** Endless practice: a goal and a number of years, reached by at least one interest */
const doubleMaker: LabChallengeMaker<DoubleState> = (random) => {
    const goal = pick(random, ['half', 'double', 'triple'] as const)
    const rate = randomInt(random, 2, 12)
    const years = yearsNeeded({ rate, goal })
    const words = goalWords[goal]
    return {
        prompt: say(
            `Lortu dirua ${words.eu} izatea ${years} urtean, ez lehenago.`,
            `Consigue que el dinero sea ${words.es} justo en ${years} años.`,
            `اجعل المال ${words.ar} في ${years} سنة بالضبط.`,
            `Make the money ${words.en} in exactly ${years} years.`
        ),
        hint: say(`Probatu % ${rate} inguruan.`, `Prueba cerca del ${rate} %.`, `جرّب قرب ${rate} %.`, `Try around ${rate}%.`),
        isSolved: (state) => state.goal === goal && yearsNeeded(state) === years,
        solution: setDouble(initialDoubleState, { rate, goal })
    }
}

export const doubleExtra = freshFrom(initialDoubleState, doubleMaker)
