import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { equals, fraction, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { probLatex, say } from '../../batx2-zientziak-probabilitatea/lab/probability.ts'

/* ==========================================================================
   P-L2 · Hodien zuhaitza (El árbol de tuberías): 10 000 litres of water
   (the orders of a shop, say) go down a tree. The first pipes split them
   among three sources A, B and C as wide as their share; from each source
   a thin pipe takes its rate to the tank D (returned orders) and the rest
   goes on. The water that reaches D is the total probability; ▶ pours the
   three streams into one tank, and the part of the tank that came down
   each pipe is Bayes. Before that, the learner bets on the pipe that
   brings most water to D. Shares in fives of percent and rates in whole
   percents, so every stream is a whole number of litres. Pure logic.
   ========================================================================== */

export interface PipesState {
    /** Shares of A, B and C in percent (fives), adding up to 100 */
    shares: [number, number, number]
    /** Rates to D in percent */
    rates: [number, number, number]
    /** The source whose rate the stepper changes */
    editing: 0 | 1 | 2
    prediction: Prediction | null
}

export const PIPES_LITRES = 10000
export const PIPES_LIMITS = { share: { min: 5, max: 85, step: 5 }, rate: { min: 0, max: 30 } } as const
export const initialPipesState: PipesState = { shares: [50, 30, 20], rates: [4, 2, 10], editing: 0, prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

/** Changing the share of A or B gives the rest to C, which keeps at least 5\u00a0% */
export function setPipeShare(state: PipesState, source: 0 | 1, share: number): PipesState {
    const other = state.shares[1 - source]
    const value = clamp(share, PIPES_LIMITS.share.min, 100 - other - PIPES_LIMITS.share.min)
    if (value === state.shares[source]) return state
    const shares = [...state.shares] as PipesState['shares']
    shares[source] = value
    shares[2] = 100 - shares[0] - shares[1]
    return { ...state, shares, prediction: null }
}

export function setPipeRate(state: PipesState, source: 0 | 1 | 2, rate: number): PipesState {
    const value = clamp(rate, PIPES_LIMITS.rate.min, PIPES_LIMITS.rate.max)
    if (value === state.rates[source]) return state
    const rates = [...state.rates] as PipesState['rates']
    rates[source] = value
    return { ...state, rates, prediction: null }
}

export const setEditingPipe = (state: PipesState, editing: 0 | 1 | 2): PipesState => ({ ...state, editing })

type Flows = Pick<PipesState, 'shares' | 'rates'>

/** Litres down each source: share % of 10 000 */
export const sourceLitres = (state: Flows) => state.shares.map((share) => share * 100) as [number, number, number]
/** Litres from each source into D: share · rate (in percent), out of 10 000 */
export const streamsOf = (state: Flows) => state.shares.map((share, index) => share * state.rates[index]) as [number, number, number]
export const litresInD = (state: Flows) => streamsOf(state).reduce((sum, value) => sum + value, 0)
/** P(D) and P(source/D), exact */
export const pD = (state: Flows): FractionValue => fraction(litresInD(state), PIPES_LITRES)
export function posteriorPipe(state: Flows, source: number): FractionValue | null {
    const total = litresInD(state)
    return total === 0 ? null : fraction(streamsOf(state)[source], total)
}
/** The pipe that brings most water to D (the first on a tie): A (<), B (=) or C (>) */
export function likeliestPipe(state: Flows): 0 | 1 | 2 {
    const streams = streamsOf(state)
    return streams.indexOf(Math.max(...streams)) as 0 | 1 | 2
}
export const pipesPrediction = (state: Flows): Prediction => (['<', '=', '>'] as const)[likeliestPipe(state)]

/* ---------- Challenges ---------- */

const sharesAre = (state: Flows, shares: number[]) => state.shares.every((share, index) => share === shares[index])

export const pipesChallenges: LabChallenge<PipesState>[] = [
    { id: 150121, prompt: say('A %\u00a050, B %\u00a030 eta C %\u00a020 izanik, egin $P(D)=0{,}05$ izatea.', 'Con A al 50\u00a0%, B al 30\u00a0% y C al 20\u00a0%, haz que $P(D)=0{,}05$.', 'مع A بنسبة 50\u00a0% وB بنسبة 30\u00a0% وC بنسبة 20\u00a0%، اجعل $P(D)=0{,}05$.', 'With A at 50%, B at 30% and C at 20%, make $P(D)=0{,}05$.'), hint: say('D andelera 500 litro iritsi behar dira: hiru korronteak batuta.', 'Al depósito D tienen que llegar 500 litros: los tres chorros juntos.', 'يجب أن يصل إلى الخزان D خمسمئة لتر: الجداول الثلاثة معًا.', '500 litres have to reach tank D: the three streams together.'), isSolved: (state) => sharesAre(state, [50, 30, 20]) && litresInD(state) === 500 },
    { id: 150122, prompt: say('Egin D andeleko uraren erdia C hoditik etortzea: $P(C/D)=\\frac{1}{2}$.', 'Haz que la mitad del agua de D venga del tubo C: $P(C/D)=\\frac{1}{2}$.', 'اجعل نصف ماء D يأتي من الأنبوب C: $P(C/D)=\\frac{1}{2}$.', 'Make half the water in D come down pipe C: $P(C/D)=\\frac{1}{2}$.'), hint: say('C korronteak beste biek batera bezainbeste ur ekarri behar du.', 'El chorro de C tiene que traer tanta agua como los otros dos juntos.', 'يجب أن يجلب جدول C ماءً بقدر الجدولين الآخرين معًا.', 'The stream from C has to bring as much water as the other two together.'), isSolved: (state) => litresInD(state) > 0 && 2 * streamsOf(state)[2] === litresInD(state) },
    { id: 150123, prompt: say('A %\u00a060, B %\u00a030 eta C %\u00a010 izanik, egin C izatea D-ren jatorririk probableena.', 'Con A al 60\u00a0%, B al 30\u00a0% y C al 10\u00a0%, haz que C sea el origen más probable de D.', 'مع A بنسبة 60\u00a0% وB بنسبة 30\u00a0% وC بنسبة 10\u00a0%، اجعل C المصدر الأرجح لـ D.', 'With A at 60%, B at 30% and C at 10%, make C the most likely source of D.'), hint: say('C hodia estua da: haren tasak besteenak baino askoz handiagoa izan behar du.', 'El tubo C es estrecho: su tasa tiene que ser mucho mayor que las otras.', 'الأنبوب C ضيّق: يجب أن تكون نسبته أكبر بكثير من الأخريين.', 'Pipe C is narrow: its rate has to be much bigger than the others.'), isSolved: (state) => sharesAre(state, [60, 30, 10]) && streamsOf(state)[2] > streamsOf(state)[0] && streamsOf(state)[2] > streamsOf(state)[1] }
]

const NAMES = ['A', 'B', 'C'] as const

/** Endless practice: with given shares, reach a P(D) or a P(source/D) */
const pipesMaker: LabChallengeMaker<PipesState> = (random) => {
    for (;;) {
        const first = 5 * randomInt(random, 2, 12)
        const second = 5 * randomInt(random, 1, Math.max(1, 19 - first / 5 - 1))
        const third = 100 - first - second
        if (third < 5) continue
        const shares: PipesState['shares'] = [first, second, third]
        const rates: PipesState['rates'] = [randomInt(random, 0, 15), randomInt(random, 0, 15), randomInt(random, 0, 15)]
        const solution: PipesState = { shares, rates, editing: 0, prediction: null }
        const given = say(`A %\u00a0${first}, B %\u00a0${second} eta C %\u00a0${third} izanik`, `Con A al ${first}\u00a0%, B al ${second}\u00a0% y C al ${third}\u00a0%`, `مع A بنسبة ${first}\u00a0% وB بنسبة ${second}\u00a0% وC بنسبة ${third}\u00a0%`, `With A at ${first}%, B at ${second}% and C at ${third}%`)
        if (litresInD(solution) === 0) continue
        if (pick(random, ['total', 'posterior'] as const) === 'total') {
            const total = pD(solution)
            return {
                prompt: say(`${given.eu}, egin $P(D)=${probLatex(total)}$ izatea.`, `${given.es}, haz que $P(D)=${probLatex(total)}$.`, `${given.ar}، اجعل $P(D)=${probLatex(total)}$.`, `${given.en}, make $P(D)=${probLatex(total)}$.`),
                hint: say('Batu hiru korronteak: ehunekoa bider tasa.', 'Suma los tres chorros: cuota por tasa.', 'اجمع الجداول الثلاثة: الحصة في النسبة.', 'Add the three streams: share times rate.'),
                isSolved: (state) => sharesAre(state, shares) && litresInD(state) === litresInD(solution),
                solution
            }
        }
        const source = randomInt(random, 0, 2)
        const value = posteriorPipe(solution, source)!
        if (value.numerator === 0) continue
        return {
            prompt: say(`${given.eu}, egin $P(${NAMES[source]}/D)=${probLatex(value)}$ izatea.`, `${given.es}, haz que $P(${NAMES[source]}/D)=${probLatex(value)}$.`, `${given.ar}، اجعل $P(${NAMES[source]}/D)=${probLatex(value)}$.`, `${given.en}, make $P(${NAMES[source]}/D)=${probLatex(value)}$.`),
            hint: say('Hodi horren korrontea zati D andeleko ur guztia.', 'El chorro de ese tubo entre toda el agua de D.', 'جدول ذلك الأنبوب على كل ماء D.', 'That pipe\'s stream over all the water in D.'),
            isSolved: (state) => sharesAre(state, shares) && posteriorPipe(state, source) !== null && equals(posteriorPipe(state, source)!, value),
            solution
        }
    }
}

export const pipesExtra = freshFrom(initialPipesState, pipesMaker)
