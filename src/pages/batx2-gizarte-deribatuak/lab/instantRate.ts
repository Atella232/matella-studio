import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'
import { freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L2 · Batez bestekotik unean unekora (De la media a la instantánea): three
   models measured from month t = 2 over [2, 2 + h], h from 4 down to
   0,01; the board draws the secant and, as h shrinks, the tangent it
   becomes. Sales that grow ever more slowly (V = 12t − t², average rate
   8 − h: it goes up as h shrinks), users that grow ever faster
   (U = t² + 2t, average rate 6 + h: it goes down) and a straight line
   (L = 5t + 3: it stays). Before drawing, the learner predicts which.
   ========================================================================== */

export type RateModel = 'sales' | 'users' | 'line'

export const RATE_MODELS: RateModel[] = ['sales', 'users', 'line']

export const STEPS = [4, 2, 1, 0.5, 0.1, 0.01]

export const T0 = 2

export interface RateState {
    model: RateModel
    /** Index in STEPS */
    step: number
    prediction: Prediction | null
}

export const initialRateState: RateState = { model: 'sales', step: 0, prediction: null }

interface Model {
    f: (t: number) => number
    latex: string
    /** The derivative at t = 2 */
    instant: number
    /** What the average rate does as h shrinks: goes down (<), stays (=) or goes up (>) */
    trend: Prediction
    yMax: number
}

export const MODELS: Record<RateModel, Model> = {
    sales: { f: (t) => 12 * t - t * t, latex: 'V(t)=12t-t^2', instant: 8, trend: '>', yMax: 40 },
    users: { f: (t) => t * t + 2 * t, latex: 'U(t)=t^2+2t', instant: 6, trend: '<', yMax: 50 },
    line: { f: (t) => 5 * t + 3, latex: 'L(t)=5t+3', instant: 5, trend: '=', yMax: 40 }
}

export function setRate(state: RateState, patch: Partial<Omit<RateState, 'prediction'>>): RateState {
    const model = patch.model ?? state.model
    const step = Math.min(STEPS.length - 1, Math.max(0, Math.round(patch.step ?? state.step)))
    return { model, step, prediction: model === state.model ? state.prediction : null }
}

export const hOf = (state: Pick<RateState, 'step'>) => STEPS[state.step]

/** The average rate on [2, 2 + h], rounded to thousandths */
export function averageRateOf(state: Pick<RateState, 'model' | 'step'>): number {
    const { f } = MODELS[state.model]
    const h = hOf(state)
    return Math.round(((f(T0 + h) - f(T0)) / h) * 1000) / 1000
}

export const ratePrediction = (state: Pick<RateState, 'model'>): Prediction => MODELS[state.model].trend

const same = (text: string) => say(text, text, text, text)

export const rateChallenges: LabChallenge<RateState>[] = [
    {
        id: 146201,
        prompt: say('Salmentetan, bilatu T.V.M. 7 den $h$.', 'En las ventas, busca la $h$ con T.V.M. 7.', 'في المبيعات، ابحث عن $h$ التي يكون فيها معدل التغير المتوسط 7.', 'In the sales, find the $h$ with average rate 7.'),
        hint: same('$8-h=7$'),
        isSolved: (state) => state.model === 'sales' && averageRateOf(state) === 7
    },
    {
        id: 146202,
        prompt: say('Erabiltzaileetan, bilatu T.V.M. 6,1 den $h$.', 'En los usuarios, busca la $h$ con T.V.M. 6,1.', 'في المستخدمين، ابحث عن $h$ التي يكون فيها معدل التغير المتوسط 6.1.', 'In the users, find the $h$ with average rate 6.1.'),
        hint: same('$6+h=6{,}1$'),
        isSolved: (state) => state.model === 'users' && averageRateOf(state) === 6.1
    },
    {
        id: 146203,
        prompt: say('Salmentetan, jarri T.V.M. tasa unekotik (8) 0,05 baino gutxiagora.', 'En las ventas, deja la T.V.M. a menos de 0,05 de la tasa instantánea (8).', 'في المبيعات، اجعل معدل التغير المتوسط على بعد أقل من 0.05 من المعدل اللحظي (8).', 'In the sales, bring the average rate within 0.05 of the instantaneous rate (8).'),
        hint: say('Txikitu $h$.', 'Encoge $h$.', 'صغّر $h$.', 'Shrink $h$.'),
        isSolved: (state) => state.model === 'sales' && Math.abs(averageRateOf(state) - 8) < 0.05
    },
    {
        id: 146204,
        prompt: say('Eredu linealean, jarri $h=0{,}1$: T.V.M. aldatzen al da?', 'En el modelo lineal, pon $h=0{,}1$: ¿cambia la T.V.M.?', 'في النموذج الخطي ضع $h=0{,}1$: هل يتغير معدل التغير المتوسط؟', 'In the linear model, set $h=0{,}1$: does the average rate change?'),
        hint: say('Zuzen batean malda beti berdina da.', 'En una recta la pendiente es siempre la misma.', 'في المستقيم الميل نفسه دائمًا.', 'On a line the slope is always the same.'),
        isSolved: (state) => state.model === 'line' && hOf(state) === 0.1
    },
    {
        id: 146205,
        prompt: say('Erabiltzaileetan, jaitsi T.V.M. 6,5etik behera.', 'En los usuarios, baja la T.V.M. de 6,5.', 'في المستخدمين، اخفض معدل التغير المتوسط إلى أقل من 6.5.', 'In the users, bring the average rate below 6.5.'),
        hint: same('$6+h<6{,}5$'),
        isSolved: (state) => state.model === 'users' && averageRateOf(state) < 6.5
    }
]

const NAMES: Record<RateModel, LocalizedText> = {
    sales: say('Salmentetan', 'En las ventas', 'في المبيعات', 'In the sales'),
    users: say('Erabiltzaileetan', 'En los usuarios', 'في المستخدمين', 'In the users'),
    line: say('Eredu linealean', 'En el modelo lineal', 'في النموذج الخطي', 'In the linear model')
}

/** Endless practice: the h that gives a stated average rate */
const rateMaker: LabChallengeMaker<RateState> = (random) => {
    const model: RateModel = randomInt(random, 0, 1) === 0 ? 'sales' : 'users'
    const step = randomInt(random, 0, STEPS.length - 1)
    const value = averageRateOf({ model, step })
    const shown = String(value).replace('.', '{,}')
    const name = NAMES[model]
    return {
        prompt: say(`${name.eu}, bilatu T.V.M. $${shown}$ den $h$.`, `${name.es}, busca la $h$ con T.V.M. $${shown}$.`, `${name.ar}، ابحث عن $h$ التي يكون فيها معدل التغير المتوسط $${shown}$.`, `${name.en}, find the $h$ with average rate $${shown}$.`),
        hint: same(model === 'sales' ? '$8-h$' : '$6+h$'),
        isSolved: (state) => state.model === model && averageRateOf(state) === value,
        solution: { model, step, prediction: null }
    }
}

export const rateExtra = freshFrom(initialRateState, rateMaker)
