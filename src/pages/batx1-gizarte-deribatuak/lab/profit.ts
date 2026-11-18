import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { same, say } from '../text.ts'

/* ==========================================================================
   L2 · Mozkin maximoa (Beneficio máximo): a price p (revenue I = p·x) and
   a cost C(x) = c·x² + v·x + F. The learner moves the production x and
   predicts whether one more unit raises the profit, leaves it the same
   or lowers it: the sign of B′(x) = p − v − 2c·x, that is, revenue of one
   more unit against its marginal cost. ▶ runs the production from 0 to
   30 along the profit curve; the top is where I′ = C′.
   ========================================================================== */

export const PROFIT_CURVES = [0.5, 1, 2] as const
export const PROFIT_LIMITS = { p: { min: 10, max: 60, step: 5 }, v: { min: 0, max: 30, step: 5 }, F: { min: 0, max: 200, step: 50 }, x: { min: 0, max: 30 } } as const
export const PROFIT_X = 30

export interface ProfitState {
    p: number
    v: number
    /** Index in PROFIT_CURVES */
    curve: number
    F: number
    x: number
    prediction: Prediction | null
}

export const initialProfitState: ProfitState = { p: 30, v: 10, curve: 1, F: 50, x: 5, prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))
const stepped = (value: number, step: number, min: number, max: number) => clamp(value / step, min / step, max / step) * step

export function setProfit(state: ProfitState, patch: Partial<Omit<ProfitState, 'prediction'>>): ProfitState {
    const p = stepped(patch.p ?? state.p, 5, PROFIT_LIMITS.p.min, PROFIT_LIMITS.p.max)
    const v = stepped(patch.v ?? state.v, 5, PROFIT_LIMITS.v.min, PROFIT_LIMITS.v.max)
    const curve = clamp(patch.curve ?? state.curve, 0, PROFIT_CURVES.length - 1)
    const F = stepped(patch.F ?? state.F, 50, PROFIT_LIMITS.F.min, PROFIT_LIMITS.F.max)
    const x = clamp(patch.x ?? state.x, PROFIT_LIMITS.x.min, PROFIT_LIMITS.x.max)
    const unchanged = p === state.p && v === state.v && curve === state.curve && F === state.F && x === state.x
    return { p, v, curve, F, x, prediction: unchanged ? state.prediction : null }
}

export const curveOf = (state: Pick<ProfitState, 'curve'>) => PROFIT_CURVES[state.curve]
export const revenueAt = (state: Pick<ProfitState, 'p'>, x: number) => state.p * x
export const costAt = (state: Pick<ProfitState, 'v' | 'curve' | 'F'>, x: number) => curveOf(state) * x * x + state.v * x + state.F
export const profitAt = (state: Pick<ProfitState, 'p' | 'v' | 'curve' | 'F'>, x: number) => revenueAt(state, x) - costAt(state, x)
export const profitSlope = (state: Pick<ProfitState, 'p' | 'v' | 'curve'>, x: number) => state.p - state.v - 2 * curveOf(state) * x
/** The production with the greatest profit: p − v = 2c·x */
export const bestX = (state: Pick<ProfitState, 'p' | 'v' | 'curve'>) => (state.p - state.v) / (2 * curveOf(state))

/** One more unit: the revenue p against its marginal cost v + 2c·x (> raises the profit) */
export const profitPrediction = (state: ProfitState): Prediction => compareTo(state.p - state.v, 2 * curveOf(state) * state.x)

export const profitChallenges: LabChallenge<ProfitState>[] = [
    {
        id: 136201,
        prompt: say('Jarri ekoizpena mozkin maximoan.', 'Pon la producción en el beneficio máximo.', 'ضع الإنتاج عند الربح الأعظم.', 'Put the production at the greatest profit.'),
        hint: same('$B\'(x)=p-v-2c\\cdot x=0$'),
        isSolved: (state) => profitSlope(state, state.x) === 0
    },
    {
        id: 136202,
        prompt: say('$p=40$, $v=10$ eta $c=1$ direnean, jarri mozkin maximoa ematen duen ekoizpena.', 'Con $p=40$, $v=10$ y $c=1$, pon la producción que da el beneficio máximo.', 'مع $p=40$ و$v=10$ و$c=1$ ضع الإنتاج الذي يعطي الربح الأعظم.', 'With $p=40$, $v=10$ and $c=1$, put the production that gives the greatest profit.'),
        hint: same('$40-10-2x=0$'),
        isSolved: (state) => state.p === 40 && state.v === 10 && curveOf(state) === 1 && state.x === 15
    },
    {
        id: 136203,
        prompt: say('Lortu maximoa $x=20$ puntuan egotea.', 'Consigue que el máximo esté en $x=20$.', 'اجعل القيمة العظمى عند $x=20$.', 'Make the maximum be at $x=20$.'),
        hint: same('$p-v=2c\\cdot 20$'),
        isSolved: (state) => bestX(state) === 20
    },
    {
        id: 136204,
        prompt: say('$F=100$ denean, lortu 125 euroko mozkin maximoa.', 'Con $F=100$, consigue un beneficio máximo de 125 €.', 'مع $F=100$ اجعل الربح الأعظم 125 €.', 'With $F=100$, get a greatest profit of €125.'),
        hint: same('$\\frac{(p-v)^2}{4c}-100=125$'),
        isSolved: (state) => state.F === 100 && Math.abs(profitAt(state, bestX(state)) - 125) < 1e-9
    },
    {
        id: 136205,
        prompt: say('$c=2$, $p=50$ eta $v=10$ direnean, jarri ekoizpena maximoan.', 'Con $c=2$, $p=50$ y $v=10$, pon la producción justo en el máximo.', 'مع $c=2$ و$p=50$ و$v=10$ ضع الإنتاج عند القيمة العظمى تمامًا.', 'With $c=2$, $p=50$ and $v=10$, put the production right at the maximum.'),
        hint: same('$50-10-4x=0$'),
        isSolved: (state) => curveOf(state) === 2 && state.p === 50 && state.v === 10 && state.x === 10
    }
]

/** Endless practice: prices and costs are given; find the best production */
const profitMaker: LabChallengeMaker<ProfitState> = (random) => {
    for (;;) {
        const curve = randomInt(random, 0, PROFIT_CURVES.length - 1)
        const c = PROFIT_CURVES[curve]
        const p = pick(random, [20, 25, 30, 35, 40, 45, 50, 55, 60])
        const v = pick(random, [0, 5, 10, 15, 20])
        const x = (p - v) / (2 * c)
        if (!Number.isInteger(x) || x <= 0 || x > PROFIT_X) continue
        const shown = String(c).replace('.', '{,}')
        return {
            prompt: say(`$p=${p}$, $v=${v}$ eta $c=${shown}$ direnean, jarri mozkin maximoa ematen duen ekoizpena.`, `Con $p=${p}$, $v=${v}$ y $c=${shown}$, pon la producción que da el beneficio máximo.`, `مع $p=${p}$ و$v=${v}$ و$c=${shown}$ ضع الإنتاج الذي يعطي الربح الأعظم.`, `With $p=${p}$, $v=${v}$ and $c=${shown}$, put the production that gives the greatest profit.`),
            hint: same(`$${p}-${v}-2\\cdot ${shown}\\cdot x=0$`),
            isSolved: (state) => state.p === p && state.v === v && state.curve === curve && state.x === x,
            solution: { ...initialProfitState, p, v, curve, x }
        }
    }
}

export const profitExtra = freshFrom(initialProfitState, profitMaker)
