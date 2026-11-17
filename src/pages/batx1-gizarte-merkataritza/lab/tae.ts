import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L3 · Urteko tasa baliokidea hazten da (La TAE crece): a nominal yearly
   interest of 1 % to 12 % paid once, twice, four, twelve or 365 times a
   year. Five bars show the APR (TAE) for each frequency, with the nominal
   interest as a line: more periods, a higher APR, and the bigger the
   interest, the bigger the gap. The learner predicts whether the APR goes
   more or less than a quarter of a point above the nominal interest.
   ========================================================================== */

export const TAE_PERIODS = [1, 2, 4, 12, 365] as const
export type TaePeriods = (typeof TAE_PERIODS)[number]
export const TAE_RATES = { min: 1, max: 12 } as const
/** The gap the prediction compares with, in points */
export const TAE_GAP = 0.25

export interface TaeState {
    rate: number
    periods: TaePeriods
    prediction: Prediction | null
}

export const initialTaeState: TaeState = { rate: 6, periods: 12, prediction: null }

export function setTae(state: TaeState, patch: Partial<Omit<TaeState, 'prediction'>>): TaeState {
    const rate = Math.min(TAE_RATES.max, Math.max(TAE_RATES.min, Math.round(patch.rate ?? state.rate)))
    const periods = patch.periods && TAE_PERIODS.includes(patch.periods) ? patch.periods : state.periods
    const same = rate === state.rate && periods === state.periods
    return { rate, periods, prediction: same ? state.prediction : null }
}

/** The APR as a fraction: (1 + r/n)ⁿ − 1 */
export const taeOf = (rate: number, periods: number) => (1 + rate / 100 / periods) ** periods - 1
export const stateTae = (state: Pick<TaeState, 'rate' | 'periods'>) => taeOf(state.rate, state.periods)
/** Less (<), exactly (=) or more (>) than a quarter of a point above the nominal interest, to the hundredth of a point */
export const taePrediction = (state: TaeState): Prediction => compareTo(Math.round((stateTae(state) * 100 - state.rate) * 100), TAE_GAP * 100)

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const percent = (value: number) => (Math.round(value * 10000) / 100).toFixed(2).replace('.', '{,}')

export const periodWords: Record<TaePeriods, LocalizedText> = {
    1: say('urtean behin', 'anual', 'سنوي', 'yearly'),
    2: say('seihilekoan', 'semestral', 'نصف سنوي', 'every six months'),
    4: say('hiruhilekoan', 'trimestral', 'ربع سنوي', 'quarterly'),
    12: say('hilero', 'mensual', 'شهري', 'monthly'),
    365: say('egunero', 'diario', 'يومي', 'daily')
}

export const taeChallenges: LabChallenge<TaeState>[] = [
    {
        id: 131301,
        prompt: say('Interes nominala % 10 dela, lortu tasa baliokidea % 10 baino handiagoa izatea.', 'Con un interés nominal del 10 %, consigue una TAE mayor que el 10 %.', 'مع فائدة اسمية 10 %، اجعل المعدل السنوي المكافئ أكبر من 10 %.', 'With a nominal interest of 10%, get an APR above 10%.'),
        hint: say('Ordaindu urtean behin baino gehiagotan.', 'Paga más de una vez al año.', 'ادفع أكثر من مرة في السنة.', 'Pay more than once a year.'),
        isSolved: (state) => state.rate === 10 && state.periods > 1
    },
    {
        id: 131302,
        prompt: say('Hilero ordainduta, lortu % 9 baino handiagoa den tasa baliokidea, ahalik eta interes txikienarekin.', 'Con pago mensual, consigue una TAE de más del 9 % con el menor interés nominal posible.', 'مع الدفع الشهري، احصل على معدل سنوي مكافئ أكبر من 9 % بأقل فائدة اسمية ممكنة.', 'Paid monthly, get an APR above 9% with the lowest possible nominal interest.'),
        hint: same('$\\left(1+\\frac{0{,}09}{12}\\right)^{12}\\approx 1{,}0938$'),
        isSolved: (state) => state.periods === 12 && state.rate === 9
    },
    {
        id: 131303,
        prompt: say('Aukeratu tasa baliokidea interes nominalaren berdina egiten duen ordainketa.', 'Elige el pago que hace la TAE igual al interés nominal.', 'اختر طريقة الدفع التي تجعل المعدل السنوي المكافئ مساويًا للفائدة الاسمية.', 'Choose the payment that makes the APR equal to the nominal interest.'),
        hint: say('Interesek interesik sortzen ez badute…', 'Si los intereses no producen intereses…', 'إذا لم تولّد الفوائد فوائد…', 'If the interest earns no interest…'),
        isSolved: (state) => state.periods === 1
    },
    {
        id: 131304,
        prompt: say('Interes nominala % 12 dela, zein ordainketak ematen du % $12{,}55$?', 'Con un 12 % nominal, ¿qué pago da justo un $12{,}55$ %?', 'مع فائدة اسمية 12 %، أيّ دفع يعطي $12{,}55$ % بالضبط؟', 'With 12% nominal, which payment gives exactly $12{,}55$%?'),
        hint: same('$1{,}03^{4}\\approx 1{,}1255$'),
        isSolved: (state) => state.rate === 12 && state.periods === 4
    },
    {
        id: 131305,
        prompt: say('Hiruhilekoan ordainduta, bilatu % $6{,}14$ ematen duen interes nominala.', 'Con pago trimestral, busca el interés nominal que da una TAE del $6{,}14$ %.', 'مع الدفع كل ثلاثة أشهر، ابحث عن الفائدة الاسمية التي تعطي $6{,}14$ %.', 'Paid quarterly, find the nominal interest that gives an APR of $6{,}14$%.'),
        hint: same('$1{,}015^{4}\\approx 1{,}0614$'),
        isSolved: (state) => state.periods === 4 && state.rate === 6
    }
]

function same(value: string): LocalizedText {
    return { eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') }
}

/** Endless practice: an APR to reach, written to the hundredth */
const taeMaker: LabChallengeMaker<TaeState> = (random) => {
    const rate = randomInt(random, 2, 12)
    const periods = pick(random, [2, 4, 12, 365] as const)
    const target = Math.round(taeOf(rate, periods) * 10000)
    const written = percent(taeOf(rate, periods))
    return {
        prompt: say(`Lortu % $${written}$ tasa baliokidea.`, `Consigue una TAE del $${written}$ %.`, `احصل على معدل سنوي مكافئ $${written}$ %.`, `Get an APR of $${written}$%.`),
        hint: say(`Hasi % ${rate} inguruan.`, `Empieza cerca del ${rate} %.`, `ابدأ قرب ${rate} %.`, `Start around ${rate}%.`),
        isSolved: (state) => Math.round(stateTae(state) * 10000) === target,
        solution: setTae(initialTaeState, { rate, periods })
    }
}

export const taeExtra = freshFrom(initialTaeState, taeMaker)
