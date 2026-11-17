import { pick } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { equals, fraction, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { probLatex, say } from '../../batx2-zientziak-probabilitatea/lab/probability.ts'

/* ==========================================================================
   P-L1 · Inkesta (La encuesta): 100 people answer a yes-or-no question.
   Some are young (G) and the rest are adults; the learner sets how many
   young people there are and how many of each group say yes (S), and taps
   a condition (everyone, the young, the adults, those who said yes): the
   people outside the condition fade, and what is left is the new total.
   P(S/G) is the share of yes among the young; when it equals P(S), the
   answer and the age are independent. Before the numbers, the learner
   says whether P(S/G) is below, equal to or above P(S). Groups of 10 and
   answers in fives, so every probability is exact. Pure logic.
   ========================================================================== */

export type SurveyCondition = 'all' | 'young' | 'old' | 'yes'

export interface SurveyState {
    /** Young people among the 100, in tens */
    young: number
    /** People who say yes in each group */
    yesYoung: number
    yesOld: number
    condition: SurveyCondition
    prediction: Prediction | null
}

export const SURVEY_TOTAL = 100
export const SURVEY_LIMITS = { young: { min: 10, max: 90, step: 10 }, yes: { step: 5 } } as const
export const initialSurveyState: SurveyState = { young: 60, yesYoung: 40, yesOld: 10, condition: 'all', prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export function setSurvey(state: SurveyState, patch: Partial<Pick<SurveyState, 'young' | 'yesYoung' | 'yesOld'>>): SurveyState {
    const young = clamp(patch.young ?? state.young, SURVEY_LIMITS.young.min, SURVEY_LIMITS.young.max)
    const yesYoung = clamp(patch.yesYoung ?? state.yesYoung, 0, young)
    const yesOld = clamp(patch.yesOld ?? state.yesOld, 0, SURVEY_TOTAL - young)
    const same = young === state.young && yesYoung === state.yesYoung && yesOld === state.yesOld
    return { ...state, young, yesYoung, yesOld, prediction: same ? state.prediction : null }
}

export const setCondition = (state: SurveyState, condition: SurveyCondition): SurveyState => ({ ...state, condition })

type Counts = Pick<SurveyState, 'young' | 'yesYoung' | 'yesOld'>

export const yesOf = (state: Counts) => state.yesYoung + state.yesOld
/** P(S), P(S/G) and P(G/S), exact (null when the condition is empty) */
export const pYes = (state: Counts): FractionValue => fraction(yesOf(state), SURVEY_TOTAL)
export const pYesGivenYoung = (state: Counts): FractionValue => fraction(state.yesYoung, state.young)
export const pYoungGivenYes = (state: Counts): FractionValue | null => (yesOf(state) === 0 ? null : fraction(state.yesYoung, yesOf(state)))
/** Independent: P(S/G) = P(S), the same as P(S∩G) = P(S)·P(G) */
export const isIndependentSurvey = (state: Counts) => state.yesYoung * SURVEY_TOTAL === yesOf(state) * state.young

/** P(S/G) compared with P(S) */
export function surveyPrediction(state: Counts): Prediction {
    const left = state.yesYoung * SURVEY_TOTAL
    const right = yesOf(state) * state.young
    return left === right ? '=' : left < right ? '<' : '>'
}

/** Who is kept by the condition: index i < young is a young person, and the first yes ones of each group said yes */
export function personOf(state: Counts, index: number): { young: boolean; yes: boolean } {
    const young = index < state.young
    const yes = young ? index < state.yesYoung : index - state.young < state.yesOld
    return { young, yes }
}
export function keeps(condition: SurveyCondition, person: { young: boolean; yes: boolean }): boolean {
    if (condition === 'young') return person.young
    if (condition === 'old') return !person.young
    if (condition === 'yes') return person.yes
    return true
}

/* ---------- Challenges ---------- */

export const surveyChallenges: LabChallenge<SurveyState>[] = [
    { id: 150101, prompt: say('50 gazterekin, egin $P(S/G)=0{,}6$ izatea.', 'Con 50 jóvenes, haz que $P(S/G)=0{,}6$.', 'مع 50 شابًّا، اجعل $P(S/G)=0{,}6$.', 'With 50 young people, make $P(S/G)=0{,}6$.'), hint: say('Gazteak dira osoko berria: horien artean, %\u00a060 baiezkoak izan behar dira.', 'Los jóvenes son el nuevo total: el 60\u00a0% de ellos tiene que decir «sí».', 'الشباب هم الكل الجديد: يجب أن يقول 60\u00a0% منهم «نعم».', 'The young are the new total: 60% of them have to say ‘yes’.'), isSolved: (state) => state.young === 50 && state.yesYoung === 30 },
    { id: 150102, prompt: say('40 gazterekin eta $P(S)=0{,}5$ izanik, egin erantzuna eta adina independenteak izatea.', 'Con 40 jóvenes y $P(S)=0{,}5$, haz que la respuesta y la edad sean independientes.', 'مع 40 شابًّا و$P(S)=0{,}5$، اجعل الإجابة والعمر مستقلين.', 'With 40 young people and $P(S)=0{,}5$, make the answer and the age independent.'), hint: say('Independenteak: talde bakoitzean «bai» proportzio bera, $0{,}5$.', 'Independientes: en cada grupo la misma proporción de «sí», $0{,}5$.', 'مستقلان: النسبة نفسها من «نعم» في كل مجموعة، $0{,}5$.', 'Independent: the same share of ‘yes’ in each group, $0{,}5$.'), isSolved: (state) => state.young === 40 && state.yesYoung === 20 && state.yesOld === 30 },
    { id: 150103, prompt: say('Egin $P(S)=0{,}4$ eta $P(G/S)=0{,}75$ izatea.', 'Haz que $P(S)=0{,}4$ y $P(G/S)=0{,}75$.', 'اجعل $P(S)=0{,}4$ و$P(G/S)=0{,}75$.', 'Make $P(S)=0{,}4$ and $P(G/S)=0{,}75$.'), hint: say('Orain «bai» esan dutenak dira osoko berria: 40 pertsona, eta horietatik 30 gazteak.', 'Ahora el nuevo total son los que dicen «sí»: 40 personas, y 30 de ellas jóvenes.', 'الآن الكل الجديد هم القائلون «نعم»: 40 شخصًا، منهم 30 شابًّا.', 'Now the new total is those who say ‘yes’: 40 people, 30 of them young.'), isSolved: (state) => yesOf(state) === 40 && state.yesYoung === 30 }
]

/** Endless practice: a given P(S/G), independence with a given P(S), or a given P(S) and P(G/S) */
const surveyMaker: LabChallengeMaker<SurveyState> = (random) => {
    for (;;) {
        const young = pick(random, [20, 30, 40, 50, 60, 70, 80])
        const fives = (most: number) => 5 * Math.floor(random() * (most / 5 + 1))
        const yesYoung = fives(young)
        const yesOld = fives(SURVEY_TOTAL - young)
        const solution: SurveyState = { young, yesYoung, yesOld, condition: 'all', prediction: null }
        const kind = pick(random, ['conditional', 'independent', 'reverse'] as const)
        if (kind === 'conditional') {
            const value = pYesGivenYoung(solution)
            return {
                prompt: say(`${young} gazterekin, egin $P(S/G)=${probLatex(value)}$ izatea.`, `Con ${young} jóvenes, haz que $P(S/G)=${probLatex(value)}$.`, `مع ${young} شابًّا، اجعل $P(S/G)=${probLatex(value)}$.`, `With ${young} young people, make $P(S/G)=${probLatex(value)}$.`),
                hint: say('Gazteak dira osoko berria.', 'Los jóvenes son el nuevo total.', 'الشباب هم الكل الجديد.', 'The young are the new total.'),
                isSolved: (state) => state.young === young && equals(pYesGivenYoung(state), value),
                solution
            }
        }
        if (kind === 'independent') {
            const share = pick(random, [0.2, 0.4, 0.5, 0.6, 0.8])
            const inYoung = young * share
            const inOld = (SURVEY_TOTAL - young) * share
            if (inYoung % 5 !== 0 || inOld % 5 !== 0) continue
            const yes = fraction(Math.round(share * 10), 10)
            return {
                prompt: say(`${young} gazterekin eta $P(S)=${probLatex(yes)}$ izanik, egin erantzuna eta adina independenteak izatea.`, `Con ${young} jóvenes y $P(S)=${probLatex(yes)}$, haz que la respuesta y la edad sean independientes.`, `مع ${young} شابًّا و$P(S)=${probLatex(yes)}$، اجعل الإجابة والعمر مستقلين.`, `With ${young} young people and $P(S)=${probLatex(yes)}$, make the answer and the age independent.`),
                hint: say('Talde bakoitzean «bai» proportzio bera.', 'En cada grupo, la misma proporción de «sí».', 'النسبة نفسها من «نعم» في كل مجموعة.', 'The same share of ‘yes’ in each group.'),
                isSolved: (state) => state.young === young && isIndependentSurvey(state) && equals(pYes(state), yes),
                solution: { ...solution, yesYoung: inYoung, yesOld: inOld }
            }
        }
        const reverse = pYoungGivenYes(solution)
        if (reverse === null || yesYoung === 0) continue
        const yes = pYes(solution)
        return {
            prompt: say(`Egin $P(S)=${probLatex(yes)}$ eta $P(G/S)=${probLatex(reverse)}$ izatea.`, `Haz que $P(S)=${probLatex(yes)}$ y $P(G/S)=${probLatex(reverse)}$.`, `اجعل $P(S)=${probLatex(yes)}$ و$P(G/S)=${probLatex(reverse)}$.`, `Make $P(S)=${probLatex(yes)}$ and $P(G/S)=${probLatex(reverse)}$.`),
            hint: say('«Bai» esan dutenak dira osoko berria.', 'Los que dicen «sí» son el nuevo total.', 'القائلون «نعم» هم الكل الجديد.', 'Those who say ‘yes’ are the new total.'),
            isSolved: (state) => equals(pYes(state), yes) && pYoungGivenYes(state) !== null && equals(pYoungGivenYes(state)!, reverse),
            solution
        }
    }
}

export const surveyExtra = freshFrom(initialSurveyState, surveyMaker)
