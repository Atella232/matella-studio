import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'
import { freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L3 · Interesa gero eta maizago (Interés cada vez más a menudo): 1000 €
   at a yearly rate r (5 %, 10 % or 100 %) compounded n times a year, from
   once a year to every hour. The capital after a year is
   1000 (1 + r/n)ⁿ: a 1^∞ form whose limit is 1000 eʳ. A stepper and ▶
   walk n up; the board draws one bar per n under the dashed line of
   1000 eʳ. Before drawing, the learner predicts what happens when n grows
   a lot: it approaches a ceiling (<, right), it stays as with n = 1 (=)
   or it grows without end (>).
   ========================================================================== */

export type CompoundRate = 'r5' | 'r10' | 'r100'

export const COMPOUND_RATES: CompoundRate[] = ['r5', 'r10', 'r100']

export const RATE_VALUE: Record<CompoundRate, number> = { r5: 0.05, r10: 0.1, r100: 1 }

/** How many times a year: yearly, every six months, quarterly, monthly, weekly, daily and hourly */
export const PERIODS = [1, 2, 4, 12, 52, 365, 8760]

export const PERIOD_NAMES: LocalizedText[] = [
    say('urtean behin', 'anual', 'سنوية', 'yearly'),
    say('sei hilean behin', 'semestral', 'نصف سنوية', 'every six months'),
    say('hiru hilean behin', 'trimestral', 'فصلية', 'quarterly'),
    say('hilean behin', 'mensual', 'شهرية', 'monthly'),
    say('astean behin', 'semanal', 'أسبوعية', 'weekly'),
    say('egunean behin', 'diaria', 'يومية', 'daily'),
    say('orduan behin', 'cada hora', 'كل ساعة', 'hourly')
]

export const CAPITAL = 1000

export interface CompoundState {
    rate: CompoundRate
    /** Index in PERIODS */
    step: number
    prediction: Prediction | null
}

export const initialCompoundState: CompoundState = { rate: 'r10', step: 0, prediction: null }

export function setCompound(state: CompoundState, patch: Partial<Omit<CompoundState, 'prediction'>>): CompoundState {
    const rate = patch.rate ?? state.rate
    const step = Math.min(PERIODS.length - 1, Math.max(0, Math.round(patch.step ?? state.step)))
    return { rate, step, prediction: rate === state.rate ? state.prediction : null }
}

export const capitalAfter = (rate: CompoundRate, n: number) => CAPITAL * (1 + RATE_VALUE[rate] / n) ** n

export const capitalOf = (state: Pick<CompoundState, 'rate' | 'step'>) => capitalAfter(state.rate, PERIODS[state.step])

export const ceilingOf = (rate: CompoundRate) => CAPITAL * Math.exp(RATE_VALUE[rate])

/** It always approaches a ceiling: the misconception is that it grows without end */
export const compoundPrediction = (): Prediction => '<'

export const compoundChallenges: LabChallenge<CompoundState>[] = [
    {
        id: 145301,
        prompt: say('Interesa % 100 denean, lortu 2700 euro baino gehiago urte batean.', 'Con un interés del 100 %, consigue más de 2700 € en un año.', 'بفائدة 100 %، احصل على أكثر من 2700 € في سنة.', 'With 100 % interest, get more than €2,700 in a year.'),
        hint: say('Kapitalizatu maizago: $1000\\,e\\approx 2718$ da sabaia.', 'Capitaliza más a menudo: el techo es $1000\\,e\\approx 2718$.', 'رسمِل بتكرار أكبر: السقف $1000\\,e\\approx 2718$.', 'Compound more often: the ceiling is $1000\\,e\\approx 2718$.'),
        isSolved: (state) => state.rate === 'r100' && capitalOf(state) > 2700
    },
    {
        id: 145302,
        prompt: say('Interesa % 10 denean, zein kapitalizaziok ematen du 1104,71 euro?', 'Con un 10 %, ¿qué capitalización da 1104,71 €?', 'بفائدة 10 %، أي رسملة تعطي 1104.71 €؟', 'With 10 %, which compounding gives €1,104.71?'),
        hint: same('$1000\\left(1+\\frac{0{,}1}{n}\\right)^{n}$'),
        isSolved: (state) => state.rate === 'r10' && PERIODS[state.step] === 12
    },
    {
        id: 145303,
        prompt: say('Interesa % 5 denean, jarri kapitala sabaitik zentimo bat baino gutxiagora.', 'Con un 5 %, deja el capital a menos de un céntimo del techo.', 'بفائدة 5 %، اجعل رأس المال على بعد أقل من سنت واحد من السقف.', 'With 5 %, bring the capital within one cent of the ceiling.'),
        hint: same('$1000\\,e^{0{,}05}\\approx 1051{,}27$'),
        isSolved: (state) => state.rate === 'r5' && ceilingOf('r5') - capitalOf(state) < 0.01
    },
    {
        id: 145304,
        prompt: say('Interesa % 100 denean, kalkulatu kapitala hilean behin kapitalizatuta.', 'Con un 100 %, halla el capital capitalizando cada mes.', 'بفائدة 100 %، احسب رأس المال برسملة شهرية.', 'With 100 %, find the capital compounding every month.'),
        hint: say('Hilean behin: $n=12$.', 'Cada mes: $n=12$.', 'كل شهر: $n=12$.', 'Every month: $n=12$.'),
        isSolved: (state) => state.rate === 'r100' && PERIODS[state.step] === 12
    },
    {
        id: 145305,
        prompt: say('Interesa % 10 denean, jarri kapitala sabaitik 0,1 euro baino gutxiagora.', 'Con un 10 %, deja el capital a menos de 0,1 € del techo.', 'بفائدة 10 %، اجعل رأس المال على بعد أقل من 0.1 € من السقف.', 'With 10 %, bring the capital within €0.1 of the ceiling.'),
        hint: same('$1000\\,e^{0{,}1}\\approx 1105{,}17$'),
        isSolved: (state) => state.rate === 'r10' && ceilingOf('r10') - capitalOf(state) < 0.1
    }
]

function same(text: string) {
    return say(text, text, text, text)
}

const RATE_WORDS: Record<CompoundRate, LocalizedText> = {
    r5: say('Interesa % 5 denean', 'Con un 5 %', 'بفائدة 5 %', 'With 5 %'),
    r10: say('Interesa % 10 denean', 'Con un 10 %', 'بفائدة 10 %', 'With 10 %'),
    r100: say('Interesa % 100 denean', 'Con un 100 %', 'بفائدة 100 %', 'With 100 %')
}

/** Endless practice: the capital with a given rate and compounding */
const compoundMaker: LabChallengeMaker<CompoundState> = (random) => {
    const rate = COMPOUND_RATES[randomInt(random, 0, 2)]
    const step = randomInt(random, 1, PERIODS.length - 1)
    const words = RATE_WORDS[rate]
    const period = PERIOD_NAMES[step]
    return {
        prompt: say(`${words.eu}, kalkulatu kapitala ${period.eu} kapitalizatuta.`, `${words.es}, halla el capital con capitalización ${period.es}.`, `${words.ar}، احسب رأس المال برسملة ${period.ar}.`, `${words.en}, find the capital compounding ${period.en}.`),
        hint: say(`$n=${PERIODS[step]}$`, `$n=${PERIODS[step]}$`, `$n=${PERIODS[step]}$`, `$n=${PERIODS[step]}$`),
        isSolved: (state) => state.rate === rate && state.step === step,
        solution: { rate, step, prediction: null }
    }
}

export const compoundExtra = freshFrom(initialCompoundState, compoundMaker)
