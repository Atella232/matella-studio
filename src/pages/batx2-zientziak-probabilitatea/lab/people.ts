import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { equals, fraction, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { probLatex, say } from './probability.ts'

/* ==========================================================================
   L5 · 10 000 pertsona (10 000 personas): a diagnostic test on a town of
   10 000 people, drawn as a square of 100 × 100 cells. The prevalence
   P(E), the sensitivity P(+/E) and the false-positive rate P(+/Ē) are
   whole percents, so every group is a whole number of people: ill and
   positive, ill and negative, healthy and positive, healthy and negative.
   Before the numbers, the learner says whether P(E/+) is below, at or
   above one half; the answer is the share of the ill among all the
   positives. Pure logic.
   ========================================================================== */

export const PEOPLE = 10_000

export interface PeopleState {
    /** P(E), P(+/E) and P(+/Ē) in percent */
    prevalence: number
    sensitivity: number
    falsePositive: number
    prediction: Prediction | null
}

export const PEOPLE_LIMITS = { prevalence: { min: 1, max: 50 }, sensitivity: { min: 50, max: 100 }, falsePositive: { min: 0, max: 30 } } as const
export const initialPeopleState: PeopleState = { prevalence: 1, sensitivity: 90, falsePositive: 5, prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export function setPeople(state: PeopleState, patch: Partial<Pick<PeopleState, 'prevalence' | 'sensitivity' | 'falsePositive'>>): PeopleState {
    const prevalence = clamp(patch.prevalence ?? state.prevalence, PEOPLE_LIMITS.prevalence.min, PEOPLE_LIMITS.prevalence.max)
    const sensitivity = clamp(patch.sensitivity ?? state.sensitivity, PEOPLE_LIMITS.sensitivity.min, PEOPLE_LIMITS.sensitivity.max)
    const falsePositive = clamp(patch.falsePositive ?? state.falsePositive, PEOPLE_LIMITS.falsePositive.min, PEOPLE_LIMITS.falsePositive.max)
    const same = prevalence === state.prevalence && sensitivity === state.sensitivity && falsePositive === state.falsePositive
    return { prevalence, sensitivity, falsePositive, prediction: same ? state.prediction : null }
}

export interface PeopleCounts {
    ill: number
    truePositive: number
    falseNegative: number
    falsePositive: number
    trueNegative: number
}

/** The four groups of the 10 000, all whole numbers */
export function countsOf(state: Pick<PeopleState, 'prevalence' | 'sensitivity' | 'falsePositive'>): PeopleCounts {
    const ill = (PEOPLE * state.prevalence) / 100
    const truePositive = (ill * state.sensitivity) / 100
    const falsePositive = ((PEOPLE - ill) * state.falsePositive) / 100
    return { ill, truePositive, falseNegative: ill - truePositive, falsePositive, trueNegative: PEOPLE - ill - falsePositive }
}

/** P(E/+), exact: the ill among all the positives */
export function illGivenPositive(state: Pick<PeopleState, 'prevalence' | 'sensitivity' | 'falsePositive'>): FractionValue {
    const counts = countsOf(state)
    return fraction(counts.truePositive, counts.truePositive + counts.falsePositive)
}

/** P(E/+) against one half */
export function peoplePrediction(state: PeopleState): Prediction {
    const counts = countsOf(state)
    return counts.truePositive === counts.falsePositive ? '=' : counts.truePositive < counts.falsePositive ? '<' : '>'
}

/* ---------- Challenges ---------- */

export const peopleChallenges: LabChallenge<PeopleState>[] = [
    { id: 128181, prompt: say('Egin $P(E/+)$ 0,9 baino handiagoa izatea.', 'Haz que $P(E/+)$ sea mayor que 0,9.', 'اجعل $P(E/+)$ أكبر من 0.9.', 'Make $P(E/+)$ greater than 0.9.'), hint: say('Positibo faltsu gutxi behar dira positibo egiazkoen ondoan: igo prebalentzia edo jaitsi $P(+/\\overline{E})$.', 'Hacen falta pocos falsos positivos al lado de los verdaderos: sube la prevalencia o baja $P(+/\\overline{E})$.', 'يلزم قليل من الإيجابيات الكاذبة مقارنة بالحقيقية: ارفع الانتشار أو اخفض $P(+/\\overline{E})$.', 'You need few false positives next to the true ones: raise the prevalence or lower $P(+/\\overline{E})$.'), isSolved: (state) => { const value = illGivenPositive(state); return value.numerator * 10 > value.denominator * 9 } },
    { id: 128182, prompt: say('Egin positibo faltsuak eta egiazkoak adina izatea, $P(+/E)=0{,}9$ izanik.', 'Haz que haya tantos falsos positivos como verdaderos, con $P(+/E)=0{,}9$.', 'اجعل الإيجابيات الكاذبة بعدد الحقيقية مع $P(+/E)=0{,}9$.', 'Make there be as many false positives as true ones, with $P(+/E)=0{,}9$.'), hint: say('Orduan $P(E/+)=\\frac{1}{2}$. Saiatu % 10 gaixorekin.', 'Entonces $P(E/+)=\\frac{1}{2}$. Prueba con un 10 % de enfermos.', 'عندئذ $P(E/+)=\\frac{1}{2}$. جرّب نسبة 10٪ من المرضى.', 'Then $P(E/+)=\\frac{1}{2}$. Try 10% ill.'), isSolved: (state) => state.sensitivity === 90 && countsOf(state).truePositive === countsOf(state).falsePositive },
    { id: 128183, prompt: say('Gaixoetan proba perfektua izanik ($P(+/E)=1$) eta % 2 positibo faltsu, egin $P(E/+)$ 0,5 baino txikiagoa izatea.', 'Con una prueba perfecta en enfermos ($P(+/E)=1$) y un 2 % de falsos positivos, haz que $P(E/+)$ sea menor que 0,5.', 'مع اختبار كامل لدى المرضى ($P(+/E)=1$) و2٪ من الإيجابيات الكاذبة، اجعل $P(E/+)$ أقل من 0.5.', 'With a test that is perfect on the ill ($P(+/E)=1$) and 2% false positives, make $P(E/+)$ less than 0.5.'), hint: say('Gaixotasunak oso arraroa izan behar du: saiatu prebalentziarik txikienarekin.', 'La enfermedad tiene que ser muy rara: prueba con la prevalencia más baja.', 'يجب أن يكون المرض نادرًا جدًّا: جرّب أقل معدل انتشار.', 'The disease has to be very rare: try the lowest prevalence.'), isSolved: (state) => state.sensitivity === 100 && state.falsePositive === 2 && peoplePrediction(state) === '<' }
]

/** Endless practice: with a given prevalence and sensitivity, find the false-positive rate that gives P(E/+) */
const peopleMaker: LabChallengeMaker<PeopleState> = (random) => {
    for (;;) {
        const prevalence = randomInt(random, 1, 20)
        const sensitivity = 5 * randomInt(random, 12, 20)
        const falsePositive = randomInt(random, 1, 20)
        const solution: PeopleState = { prevalence, sensitivity, falsePositive, prediction: null }
        const target = illGivenPositive(solution)
        if (target.denominator > 200) continue
        return {
            prompt: say(`$P(E)=${probLatex(fraction(prevalence, 100))}$ eta $P(+/E)=${probLatex(fraction(sensitivity, 100))}$ izanik, egin $P(E/+)=${probLatex(target)}$ izatea.`, `Con $P(E)=${probLatex(fraction(prevalence, 100))}$ y $P(+/E)=${probLatex(fraction(sensitivity, 100))}$, haz que $P(E/+)=${probLatex(target)}$.`, `مع $P(E)=${probLatex(fraction(prevalence, 100))}$ و$P(+/E)=${probLatex(fraction(sensitivity, 100))}$، اجعل $P(E/+)=${probLatex(target)}$.`, `With $P(E)=${probLatex(fraction(prevalence, 100))}$ and $P(+/E)=${probLatex(fraction(sensitivity, 100))}$, make $P(E/+)=${probLatex(target)}$.`),
            hint: say('Aldatu positibo faltsuen ehunekoa: zenbat eta gehiago, orduan eta txikiagoa $P(E/+)$.', 'Cambia el porcentaje de falsos positivos: cuantos más, más pequeña $P(E/+)$.', 'غيّر نسبة الإيجابيات الكاذبة: كلما زادت صغر $P(E/+)$.', 'Change the false-positive percentage: the more there are, the smaller $P(E/+)$.'),
            isSolved: (state) => state.prevalence === prevalence && state.sensitivity === sensitivity && equals(illGivenPositive(state), target),
            solution
        }
    }
}

export const peopleExtra = freshFrom(initialPeopleState, peopleMaker)
