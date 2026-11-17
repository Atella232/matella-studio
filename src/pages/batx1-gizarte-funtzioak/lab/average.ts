import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { same, say } from '../text.ts'

/* ==========================================================================
   L3 · Batez besteko kostua (Coste medio): a fixed cost F, a cost v per
   unit and x units. The average cost M(x) = v + F/x is drawn as a bar of
   two parts, v and the share F/x, over the hyperbola that falls towards
   the asymptote y = v. Before the bar is shown the learner predicts
   whether the average cost is above, at or below twice v (it is exactly
   2v when F/x = v). ▶ runs the production from 10 to 200 units and the
   point slides down the curve without ever reaching v.
   ========================================================================== */

export const AVERAGE_LIMITS = { F: { min: 100, max: 1000, step: 100 }, v: { min: 1, max: 10 }, x: { min: 10, max: 200, step: 10 } } as const

export interface AverageState {
    F: number
    v: number
    x: number
    prediction: Prediction | null
}

export const initialAverageState: AverageState = { F: 500, v: 5, x: 20, prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))
const snap = (value: number, step: number) => Math.round(value / step) * step

export function setAverage(state: AverageState, patch: Partial<Omit<AverageState, 'prediction'>>): AverageState {
    const F = clamp(snap(patch.F ?? state.F, AVERAGE_LIMITS.F.step), AVERAGE_LIMITS.F.min, AVERAGE_LIMITS.F.max)
    const v = clamp(patch.v ?? state.v, AVERAGE_LIMITS.v.min, AVERAGE_LIMITS.v.max)
    const x = clamp(snap(patch.x ?? state.x, AVERAGE_LIMITS.x.step), AVERAGE_LIMITS.x.min, AVERAGE_LIMITS.x.max)
    return { F, v, x, prediction: F === state.F && v === state.v && x === state.x ? state.prediction : null }
}

/** The fixed cost each unit carries */
export const shareOf = ({ F }: Pick<AverageState, 'F'>, x: number) => F / x
export const averageAt = (state: Pick<AverageState, 'F' | 'v'>, x: number) => state.v + shareOf(state, x)

/** Above (>), at (=) or below (<) twice the cost per unit */
export const averagePrediction = (state: AverageState): Prediction => compareTo(averageAt(state, state.x), 2 * state.v)

const near = (value: number, goal: number) => Math.abs(value - goal) < 1e-9

export const averageChallenges: LabChallenge<AverageState>[] = [
    {
        id: 133301,
        prompt: say('Lortu 15 euroko batez besteko kostua, zehazki.', 'Consigue un coste medio de 15 € exactos.', 'احصل على تكلفة متوسطة قدرها 15 € تمامًا.', 'Get an average cost of exactly €15.'),
        hint: same('$v+\\frac{F}{x}=15$'),
        isSolved: (state) => near(averageAt(state, state.x), 15)
    },
    {
        id: 133302,
        prompt: say('$F=600$ eta $v=4$ direnean, zenbat unitaterekin da batez besteko kostua $v$ balioaren bikoitza?', 'Con $F=600$ y $v=4$, ¿con cuántas unidades el coste medio es el doble de $v$?', 'مع $F=600$ و$v=4$، عند كم وحدة تكون التكلفة المتوسطة ضعف $v$؟', 'With $F=600$ and $v=4$, for how many units is the average cost twice $v$?'),
        hint: same('$\\frac{600}{x}=4$'),
        isSolved: (state) => state.F === 600 && state.v === 4 && state.x === 150
    },
    {
        id: 133303,
        prompt: say('Lortu unitate bakoitzak kostu finkoaren euro bat baino gutxiago ordaintzea.', 'Consigue que cada unidad pague menos de 1 € del coste fijo.', 'اجعل كل وحدة تدفع أقل من 1 € من التكلفة الثابتة.', 'Make each unit pay less than €1 of the fixed cost.'),
        hint: same('$\\frac{F}{x}<1$'),
        isSolved: (state) => shareOf(state, state.x) < 1
    },
    {
        id: 133304,
        prompt: say('100 unitaterekin, lortu 12 euroko batez besteko kostua.', 'Con 100 unidades, consigue un coste medio de 12 €.', 'مع 100 وحدة، احصل على تكلفة متوسطة قدرها 12 €.', 'With 100 units, get an average cost of €12.'),
        hint: same('$v+\\frac{F}{100}=12$'),
        isSolved: (state) => state.x === 100 && near(averageAt(state, 100), 12)
    },
    {
        id: 133305,
        prompt: say('$F=800$ eta $v=6$ direnean, zenbat unitaterekin jaisten da batez besteko kostua 10 eurora?', 'Con $F=800$ y $v=6$, ¿con cuántas unidades baja el coste medio a 10 €?', 'مع $F=800$ و$v=6$، عند كم وحدة تنخفض التكلفة المتوسطة إلى 10 €؟', 'With $F=800$ and $v=6$, for how many units does the average cost fall to €10?'),
        hint: same('$\\frac{800}{x}=4$'),
        isSolved: (state) => state.F === 800 && state.v === 6 && state.x === 200
    }
]

/** Endless practice: the units that bring the average cost to a whole value */
const averageMaker: LabChallengeMaker<AverageState> = (random) => {
    for (;;) {
        const F = 100 * randomInt(random, 1, 10)
        const v = randomInt(random, 1, 10)
        const x = 10 * randomInt(random, 1, 20)
        if (F % x !== 0) continue
        const value = v + F / x
        return {
            prompt: say(`$F=${F}$ eta $v=${v}$ direnean, zenbat unitaterekin da batez besteko kostua ${value} €?`, `Con $F=${F}$ y $v=${v}$, ¿con cuántas unidades el coste medio es de ${value} €?`, `مع $F=${F}$ و$v=${v}$، عند كم وحدة تكون التكلفة المتوسطة ${value} €؟`, `With $F=${F}$ and $v=${v}$, for how many units is the average cost €${value}?`),
            hint: same(`$\\frac{${F}}{x}=${F / x}$`),
            isSolved: (state) => state.F === F && state.v === v && state.x === x,
            solution: { F, v, x, prediction: null }
        }
    }
}

export const averageExtra = freshFrom(initialAverageState, averageMaker)
