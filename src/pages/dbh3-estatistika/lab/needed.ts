import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { percentile } from '../../dbh4-aplikatuak-estatistika/stats.ts'
import { compareTo, freshFrom, type Prediction } from './prediction.ts'

/* ==========================================================================
   L3 · Zer nota behar dut? (¿Qué nota necesito?): four marks are already
   on a seesaw from 0 to 10; the learner chooses the fifth one. The seesaw
   balances at the mean, the point where the data weigh the same on both
   sides. First a guess: with this fifth mark, will the mean be below,
   exactly or above 6? ▶ drops the new mark and the seesaw finds its new
   balance.
   ========================================================================== */

export const MARK_SETS: number[][] = [[5, 6, 8, 4], [7, 7, 6, 8], [3, 5, 4, 6], [9, 8, 10, 7]]

export interface NeededState {
    set: number
    mark: number
    prediction: Prediction | null
}

export const initialNeededState: NeededState = { set: 0, mark: 5, prediction: null }

export function setNeeded(state: NeededState, patch: Partial<Pick<NeededState, 'set' | 'mark'>>): NeededState {
    const set = Math.min(MARK_SETS.length - 1, Math.max(0, Math.round(patch.set ?? state.set)))
    const mark = Math.min(10, Math.max(0, Math.round(patch.mark ?? state.mark)))
    return { set, mark, prediction: set === state.set && mark === state.mark ? state.prediction : null }
}

export const neededMarks = (state: Pick<NeededState, 'set' | 'mark'>) => [...MARK_SETS[state.set], state.mark]
export const neededMean = (state: Pick<NeededState, 'set' | 'mark'>) => neededMarks(state).reduce((total, value) => total + value, 0) / 5
export const neededMedian = (state: Pick<NeededState, 'set' | 'mark'>) => percentile(neededMarks(state), 50)
/** Mean below (<), exactly (=) or above (>) 6? */
export const neededPrediction = (state: NeededState): Prediction => compareTo(neededMean(state), 6)

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const tex = (value: number) => String(value).replace('.', '{,}')
const marksOf = (set: number) => `${MARK_SETS[set].join(',\\ ')}`
const reach = (set: number, mean: number) => say(
    `Notak: $${marksOf(set)}$. Zer nota behar duzu bosgarren azterketan batez bestekoa $${tex(mean)}$ izateko?`,
    `Notas: $${marksOf(set)}$. ¿Qué nota necesitas en el quinto examen para tener de media $${tex(mean)}$?`,
    `الدرجات: $${marksOf(set)}$. ما الدرجة التي تحتاجها في الاختبار الخامس ليصبح المتوسط $${tex(mean)}$؟`,
    `Marks: $${marksOf(set)}$. What mark do you need in the fifth test for a mean of $${tex(mean)}$?`
)
const reachHint = (set: number, mean: number) => {
    const total = MARK_SETS[set].reduce((sum, value) => sum + value, 0)
    const latex = `\\frac{${total}+x}{5}=${tex(mean)}`
    return say(`$${latex}$`, `$${latex}$`, `$${latex}$`, `$${latex}$`)
}
const is = (set: number, mark: number) => (state: NeededState) => state.set === set && state.mark === mark

export const neededChallenges: LabChallenge<NeededState>[] = [
    { id: 56301, prompt: reach(0, 6), hint: reachHint(0, 6), isSolved: is(0, 7) },
    { id: 56302, prompt: reach(1, 7.4), hint: reachHint(1, 7.4), isSolved: is(1, 9) },
    { id: 56303, prompt: say(`Notak: $${marksOf(2)}$. Batez besteko 6 lortzerik ba al dago? Jarri ahalik eta nota onena.`, `Notas: $${marksOf(2)}$. ¿Se puede llegar a 6 de media? Pon la mejor nota posible.`, `الدرجات: $${marksOf(2)}$. هل يمكن بلوغ متوسط $6$؟ ضع أفضل درجة ممكنة.`, `Marks: $${marksOf(2)}$. Can you reach a mean of 6? Put the best mark possible.`), hint: say('Nahiz eta 10 atera, $\\frac{28}{5}=5{,}6$.', 'Aunque saques un 10, $\\frac{28}{5}=5{,}6$.', 'حتى مع $10$: $\\frac{28}{5}=5{,}6$.', 'Even with a 10, $\\frac{28}{5}=5{,}6$.'), isSolved: is(2, 10) },
    { id: 56304, prompt: say(`Notak: $${marksOf(3)}$. Egin batez bestekoa eta mediana berdinak izan daitezen.`, `Notas: $${marksOf(3)}$. Haz que la media y la mediana sean iguales.`, `الدرجات: $${marksOf(3)}$. اجعل المتوسط والوسيط متساويين.`, `Marks: $${marksOf(3)}$. Make the mean and the median equal.`), hint: say('Datu simetrikoetan, batez bestekoa eta mediana bat datoz.', 'Con datos simétricos, media y mediana coinciden.', 'في البيانات المتناظرة يتساوى المتوسط والوسيط.', 'With symmetric data, mean and median agree.'), isSolved: (state) => state.set === 3 && Math.abs(neededMean(state) - neededMedian(state)) < 1e-9 },
    { id: 56305, prompt: say(`Notak: $${marksOf(1)}$. Zein da batez bestekoa 7 baino txikiago uzten duen notarik handiena?`, `Notas: $${marksOf(1)}$. ¿Cuál es la mayor nota que deja la media por debajo de 7?`, `الدرجات: $${marksOf(1)}$. ما أكبر درجة تُبقي المتوسط أقل من $7$؟`, `Marks: $${marksOf(1)}$. What is the highest mark that keeps the mean below 7?`), hint: same('\\frac{28+x}{5}<7'), isSolved: is(1, 6) }
]

function same(latex: string): LocalizedText {
    return say(`$${latex}$`, `$${latex}$`, `$${latex}$`, `$${latex}$`)
}

/** Endless practice: a set of marks and the mean a fifth mark gives */
const neededMaker: LabChallengeMaker<NeededState> = (random) => {
    const set = randomInt(random, 0, MARK_SETS.length - 1)
    const mark = randomInt(random, 0, 10)
    const mean = neededMean({ set, mark })
    return { prompt: reach(set, mean), hint: reachHint(set, mean), isSolved: is(set, mark), solution: { set, mark, prediction: null } }
}

export const neededExtra = freshFrom(initialNeededState, neededMaker)
