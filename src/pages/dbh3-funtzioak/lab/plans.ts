import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from './prediction.ts'

/* ==========================================================================
   L3 · Bi tarifa (Dos tarifas): plan A is fixed, y = 5x + 20 (20 € to join
   and 5 € a month); the learner builds plan B, y = mx + n, and moves a
   month cursor. The two lines cross where both plans cost the same; with
   the same slope they are parallel and never meet. First a guess: in this
   month, will B cost less than, the same as or more than A? ▶ runs the
   months.
   ========================================================================== */

export const PLAN_A = { m: 5, n: 20 } as const
export const PLAN_LIMITS = { m: { min: 0, max: 10, step: 1 }, n: { min: 0, max: 60, step: 5 }, month: { min: 0, max: 12, step: 1 } } as const

export interface PlansState {
    m: number
    n: number
    month: number
    prediction: Prediction | null
}

export const initialPlansState: PlansState = { m: 8, n: 5, month: 2, prediction: null }

const snap = (value: number, { min, max, step }: { min: number; max: number; step: number }) => Math.min(max, Math.max(min, Math.round(value / step) * step))

export function setPlans(state: PlansState, patch: Partial<Pick<PlansState, 'm' | 'n' | 'month'>>): PlansState {
    const m = snap(patch.m ?? state.m, PLAN_LIMITS.m)
    const n = snap(patch.n ?? state.n, PLAN_LIMITS.n)
    const month = snap(patch.month ?? state.month, PLAN_LIMITS.month)
    return { m, n, month, prediction: m === state.m && n === state.n && month === state.month ? state.prediction : null }
}

export const planA = (month: number) => PLAN_A.m * month + PLAN_A.n
export const planB = (state: Pick<PlansState, 'm' | 'n'>, month: number) => state.m * month + state.n
/** The month where both cost the same, or null for parallel lines (or the very same plan) */
export const plansCrossing = (state: Pick<PlansState, 'm' | 'n'>): number | null => (state.m === PLAN_A.m ? null : (state.n - PLAN_A.n) / (PLAN_A.m - state.m))
/** In this month, B costs less (<), the same (=) or more (>) than A? */
export const plansPrediction = (state: PlansState): Prediction => compareTo(planB(state, state.month), planA(state.month))

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const findMonth = (m: number, n: number) => say(
    `B tarifa: $y=${m}x+${n}$. Jarri eta aurkitu bi tarifek berdin balio duten hilabetea.`,
    `Tarifa B: $y=${m}x+${n}$. Ponla y encuentra el mes en que las dos tarifas cuestan lo mismo.`,
    `التعريفة B: $y=${m}x+${n}$. اضبطها وجد الشهر الذي تتساوى فيه التعريفتان.`,
    `Plan B: $y=${m}x+${n}$. Set it and find the month when both plans cost the same.`
)
const monthHint = (m: number, n: number) => say(`$5x+20=${m}x+${n}$`, `$5x+20=${m}x+${n}$`, `$5x+20=${m}x+${n}$`, `$5x+20=${m}x+${n}$`)
const always = (state: PlansState, test: (b: number, a: number) => boolean) => Array.from({ length: 13 }, (_, month) => month).every((month) => test(planB(state, month), planA(month)))

export const plansChallenges: LabChallenge<PlansState>[] = [
    { id: 38301, prompt: findMonth(8, 5), hint: monthHint(8, 5), isSolved: (state) => state.m === 8 && state.n === 5 && state.month === 5 },
    { id: 38302, prompt: say('Egin B tarifa A-ren paraleloa: inoiz ez dute berdin balio behar.', 'Haz la tarifa B paralela a la A: nunca deben costar lo mismo.', 'اجعل التعريفة B موازية لـA: يجب ألّا تتساويا أبدًا.', 'Make plan B parallel to A: they must never cost the same.'), hint: say('Malda bera, $m=5$, eta $n$ desberdina.', 'La misma pendiente, $m=5$, y distinto $n$.', 'الميل نفسه $m=5$ و$n$ مختلف.', 'The same slope, $m=5$, and a different $n$.'), isSolved: (state) => state.m === PLAN_A.m && state.n !== PLAN_A.n },
    { id: 38303, prompt: say('Izen-emate gabe ($n=0$), egin bi tarifek berdin balio dezaten 4. hilabetean, eta jarri kurtsorea han.', 'Sin cuota de alta ($n=0$), haz que las dos tarifas cuesten lo mismo en el mes 4 y pon el cursor allí.', 'دون رسم اشتراك ($n=0$)، اجعل التعريفتين متساويتين في الشهر $4$ وضع المؤشر هناك.', 'With no joining fee ($n=0$), make both plans cost the same in month 4 and put the cursor there.'), hint: same('$4m=5\\cdot 4+20=40$'), isSolved: (state) => state.n === 0 && state.m === 10 && state.month === 4 },
    { id: 38304, prompt: say('Egin B merkeagoa A baino hilabete guztietan, $0$-tik $12$-ra.', 'Haz que B sea más barata que A todos los meses, del $0$ al $12$.', 'اجعل B أرخص من A في كل الأشهر من $0$ إلى $12$.', 'Make B cheaper than A in every month from $0$ to $12$.'), hint: say('$n$ txikiagoa eta malda ez handiagoa.', 'Un $n$ menor y una pendiente que no sea mayor.', '$n$ أصغر وميل ليس أكبر.', 'A smaller $n$ and a slope that is not larger.'), isSolved: (state) => always(state, (b, a) => b < a) },
    { id: 38305, prompt: say('Egin B tarifa A-ren berdina: zuzen bera.', 'Haz que la tarifa B sea igual que la A: la misma recta.', 'اجعل التعريفة B مثل A تمامًا: المستقيم نفسه.', 'Make plan B the same as A: the same line.'), hint: same('$y=5x+20$'), isSolved: (state) => state.m === PLAN_A.m && state.n === PLAN_A.n }
]

function same(latex: string): LocalizedText {
    return say(`$${latex}$`, `$${latex}$`, `$${latex}$`, `$${latex}$`)
}

/** Endless practice: a plan B that meets A in a whole month */
const plansMaker: LabChallengeMaker<PlansState> = (random) => {
    for (;;) {
        const m = randomInt(random, PLAN_LIMITS.m.min, PLAN_LIMITS.m.max)
        const n = randomInt(random, 0, 12) * 5
        const month = plansCrossing({ m, n })
        if (month === null || !Number.isInteger(month) || month < 1 || month > 12) continue
        return { prompt: findMonth(m, n), hint: monthHint(m, n), isSolved: (state) => state.m === m && state.n === n && state.month === month, solution: { m, n, month, prediction: null } }
    }
}

export const plansExtra = freshFrom(initialPlansState, plansMaker)
