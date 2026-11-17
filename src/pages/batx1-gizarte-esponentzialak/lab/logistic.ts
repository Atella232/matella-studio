import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { same, say } from '../text.ts'

/* ==========================================================================
   L2 · S kurba (La curva en S): the logistic f(x) = M / (1 + b·a⁻ˣ) with a
   ceiling M, a start b and a rhythm a, and a probe day x. Before the value
   is shown the learner predicts whether, on that day, half the ceiling has
   not been reached, is reached exactly or has been passed (it is half
   exactly when aˣ = b). ▶ runs a point along the curve up to the probe.
   The exponential with the same start is drawn dashed: they agree at
   first and part ways near the half.
   ========================================================================== */

export const LOGISTIC_RATES = [1.5, 2, 3] as const
export const LOGISTIC_LIMITS = { M: { min: 100, max: 1000, step: 100 }, b: { min: 1, max: 99 }, x: { min: 0, max: 12 } } as const

export interface LogisticState {
    M: number
    b: number
    /** Index in LOGISTIC_RATES */
    rate: number
    x: number
    prediction: Prediction | null
}

export const initialLogisticState: LogisticState = { M: 1000, b: 24, rate: 1, x: 2, prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export function setLogistic(state: LogisticState, patch: Partial<Omit<LogisticState, 'prediction'>>): LogisticState {
    const M = clamp(Math.round((patch.M ?? state.M) / 100) * 100, LOGISTIC_LIMITS.M.min, LOGISTIC_LIMITS.M.max)
    const b = clamp(patch.b ?? state.b, LOGISTIC_LIMITS.b.min, LOGISTIC_LIMITS.b.max)
    const rate = clamp(patch.rate ?? state.rate, 0, LOGISTIC_RATES.length - 1)
    const x = clamp(patch.x ?? state.x, LOGISTIC_LIMITS.x.min, LOGISTIC_LIMITS.x.max)
    const unchanged = M === state.M && b === state.b && rate === state.rate && x === state.x
    return { M, b, rate, x, prediction: unchanged ? state.prediction : null }
}

export const rateOf = (state: Pick<LogisticState, 'rate'>) => LOGISTIC_RATES[state.rate]
export const logisticAt = (state: Pick<LogisticState, 'M' | 'b' | 'rate'>, x: number) => state.M / (1 + state.b * rateOf(state) ** -x)
/** The exponential with the same start: M/(1 + b)·aˣ */
export const startExpAt = (state: Pick<LogisticState, 'M' | 'b' | 'rate'>, x: number) => (state.M / (1 + state.b)) * rateOf(state) ** x
/** The day at which half the ceiling is reached: aˣ = b */
export const halfDay = (state: Pick<LogisticState, 'b' | 'rate'>) => Math.log(state.b) / Math.log(rateOf(state))

/** Below (<), at (=) or past (>) half the ceiling on the probe day; aˣ against b keeps it exact */
export const logisticPrediction = (state: LogisticState): Prediction => compareTo(rateOf(state) ** state.x, state.b)

const near = (value: number, goal: number) => Math.abs(value - goal) < 1e-9

export const logisticChallenges: LabChallenge<LogisticState>[] = [
    {
        id: 134201,
        prompt: say('Lortu hasieran zehazki 50 egotea.', 'Consigue que al principio haya exactamente 50.', 'اجعل القيمة في البداية 50 تمامًا.', 'Make it exactly 50 at the start.'),
        hint: same('$\\frac{M}{1+b}=50$'),
        isSolved: (state) => near(logisticAt(state, 0), 50)
    },
    {
        id: 134202,
        prompt: say('$a=2$ erritmoarekin, lortu sabaiaren erdia 3. egunean, zehazki, lortzea.', 'Con el ritmo $a=2$, consigue llegar a la mitad del techo justo el día 3.', 'مع الإيقاع $a=2$، اجعلها تبلغ نصف السقف في اليوم 3 تمامًا.', 'With the rhythm $a=2$, reach half the ceiling exactly on day 3.'),
        hint: same('$2^3=b$'),
        isSolved: (state) => rateOf(state) === 2 && state.b === 8
    },
    {
        id: 134203,
        prompt: say('Jarri zunda sabaiaren % 90 gainditzen den lehen egunean.', 'Pon la sonda en el primer día en que se pasa del 90 % del techo.', 'ضع المسبار في أول يوم تتجاوز فيه 90 % من السقف.', 'Put the probe on the first day that passes 90 % of the ceiling.'),
        hint: say('Begiratu aurreko eguna ere.', 'Mira también el día anterior.', 'انظر أيضًا إلى اليوم السابق.', 'Look at the day before too.'),
        isSolved: (state) => state.x > 0 && logisticAt(state, state.x) > 0.9 * state.M && logisticAt(state, state.x - 1) <= 0.9 * state.M
    },
    {
        id: 134204,
        prompt: say('$M=600$ sabaiarekin, lortu hasieran 6 bakarrik egotea.', 'Con techo $M=600$, consigue que al principio haya solo 6.', 'مع السقف $M=600$، اجعل القيمة في البداية 6 فقط.', 'With ceiling $M=600$, make it only 6 at the start.'),
        hint: same('$\\frac{600}{1+b}=6$'),
        isSolved: (state) => state.M === 600 && state.b === 99
    },
    {
        id: 134205,
        prompt: say('$b=9$ denean, aukeratu erdia 2. egunean zehazki lortzen duen erritmoa.', 'Con $b=9$, elige el ritmo con el que se llega a la mitad justo el día 2.', 'مع $b=9$، اختر الإيقاع الذي تُبلغ به النصف في اليوم 2 تمامًا.', 'With $b=9$, choose the rhythm that reaches half exactly on day 2.'),
        hint: same('$a^2=9$'),
        isSolved: (state) => state.b === 9 && rateOf(state) === 3
    }
]

/** Endless practice: the start b that puts the half on a given day */
const logisticMaker: LabChallengeMaker<LogisticState> = (random) => {
    for (;;) {
        const rate = pick(random, [1, 2])
        const a = LOGISTIC_RATES[rate]
        const day = randomInt(random, 1, 4)
        const b = a ** day
        if (b > LOGISTIC_LIMITS.b.max) continue
        return {
            prompt: say(`$a=${a}$ erritmoarekin, lortu erdia ${day}. egunean zehazki lortzea.`, `Con el ritmo $a=${a}$, consigue llegar a la mitad justo el día ${day}.`, `مع الإيقاع $a=${a}$، اجعلها تبلغ النصف في اليوم ${day} تمامًا.`, `With the rhythm $a=${a}$, reach half exactly on day ${day}.`),
            hint: same(`$b=${a}^{${day}}$`),
            isSolved: (state) => state.rate === rate && state.b === b,
            solution: { ...initialLogisticState, rate, b }
        }
    }
}

export const logisticExtra = freshFrom(initialLogisticState, logisticMaker)
