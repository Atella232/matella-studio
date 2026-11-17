import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'
import { freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L1 · Batez besteko kostua epe luzera (Coste medio a largo plazo): three
   firms with a total cost C(x) and the average cost C(x)/x as production
   grows (x from 10 to 10 000 units, on a scale of tens). A bakery has a
   fixed cost and a cost per loaf (the average tends to that cost), an app
   costs only to make (the average tends to 0) and a crowded workshop
   pays more and more per extra unit (the average grows without end).
   Before drawing, the learner predicts where the average goes: to 0 (<),
   to the cost per unit (=) or without end (>). ▶ makes production grow.
   ========================================================================== */

export type CostFirm = 'bakery' | 'app' | 'workshop'

export const COST_FIRMS: CostFirm[] = ['bakery', 'app', 'workshop']

/** The productions the stepper walks through */
export const PRODUCTIONS = [10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000]

export interface CostState {
    firm: CostFirm
    /** Index in PRODUCTIONS */
    step: number
    prediction: Prediction | null
}

export const initialCostState: CostState = { firm: 'bakery', step: 0, prediction: null }

interface Firm {
    fixed: number
    perUnit: number
    /** Coefficient of x² (the workshop gets crowded) */
    square: number
    latex: string
    /** Where the average cost goes: 0 (<), the cost per unit (=) or +∞ (>) */
    trend: Prediction
    /** Highest average cost on the board */
    yMax: number
}

export const COST_SETUP: Record<CostFirm, Firm> = {
    bakery: { fixed: 600, perUnit: 2, square: 0, latex: 'C(x)=600+2x', trend: '=', yMax: 64 },
    app: { fixed: 5000, perUnit: 0, square: 0, latex: 'C(x)=5000', trend: '<', yMax: 500 },
    workshop: { fixed: 400, perUnit: 10, square: 0.05, latex: 'C(x)=400+10x+0{,}05x^2', trend: '>', yMax: 120 }
}

export function setCost(state: CostState, patch: Partial<Omit<CostState, 'prediction'>>): CostState {
    const firm = patch.firm ?? state.firm
    const step = Math.min(PRODUCTIONS.length - 1, Math.max(0, Math.round(patch.step ?? state.step)))
    return { firm, step, prediction: firm === state.firm ? state.prediction : null }
}

export const productionOf = (state: Pick<CostState, 'step'>) => PRODUCTIONS[state.step]

export function totalCost(firm: CostFirm, x: number): number {
    const { fixed, perUnit, square } = COST_SETUP[firm]
    return fixed + perUnit * x + square * x * x
}

export const averageCost = (firm: CostFirm, x: number) => totalCost(firm, x) / x

export const averageOf = (state: Pick<CostState, 'firm' | 'step'>) => averageCost(state.firm, productionOf(state))

export const costPrediction = (state: Pick<CostState, 'firm'>): Prediction => COST_SETUP[state.firm].trend

export const costChallenges: LabChallenge<CostState>[] = [
    {
        id: 145101,
        prompt: say('Okindegian, lortu 3 euro baino gutxiagoko batez besteko kostua.', 'En la panadería, consigue un coste medio de menos de 3 €.', 'في المخبز، احصل على متوسط تكلفة أقل من 3 €.', 'In the bakery, get an average cost below €3.'),
        hint: say('$\\frac{600}{x}+2<3$ izan behar du.', 'Tiene que cumplirse $\\frac{600}{x}+2<3$.', 'يجب أن يتحقق $\\frac{600}{x}+2<3$.', 'You need $\\frac{600}{x}+2<3$.'),
        isSolved: (state) => state.firm === 'bakery' && averageOf(state) < 3
    },
    {
        id: 145102,
        prompt: say('Aplikazioan, jaitsi batez besteko kostua 5 eurotik behera.', 'En la app, baja el coste medio de 5 €.', 'في التطبيق، اخفض متوسط التكلفة إلى أقل من 5 €.', 'In the app, bring the average cost below €5.'),
        hint: same('$\\frac{5000}{x}<5$'),
        isSolved: (state) => state.firm === 'app' && averageOf(state) < 5
    },
    {
        id: 145103,
        prompt: say('Lantegian, aurkitu batez besteko kosturik txikiena ematen duen produkzioa.', 'En el taller, encuentra la producción con el menor coste medio.', 'في الورشة، أوجد الإنتاج الذي يعطي أصغر متوسط تكلفة.', 'In the workshop, find the production with the lowest average cost.'),
        hint: say('Hasieran jaitsi egiten da eta gero igo: probatu 50, 100 eta 200.', 'Primero baja y luego sube: prueba 50, 100 y 200.', 'ينخفض أولًا ثم يرتفع: جرّب 50 و100 و200.', 'It goes down first and then up: try 50, 100 and 200.'),
        isSolved: (state) => state.firm === 'workshop' && productionOf(state) === 100
    },
    {
        id: 145104,
        prompt: say('Okindegian, jarri batez besteko kostua bere limitetik 0,1 euro baino gutxiagora.', 'En la panadería, deja el coste medio a menos de 0,1 € de su límite.', 'في المخبز، اجعل متوسط التكلفة على بعد أقل من 0.1 € من نهايته.', 'In the bakery, bring the average cost within €0.1 of its limit.'),
        hint: same('$\\frac{600}{x}<0{,}1$'),
        isSolved: (state) => state.firm === 'bakery' && averageOf(state) - 2 < 0.1
    },
    {
        id: 145105,
        prompt: say('Aplikazioan, zenbat unitaterekin da batez besteko kostua 10 euro zehazki?', 'En la app, ¿con cuántas unidades el coste medio es justo 10 €?', 'في التطبيق، بكم وحدة يكون متوسط التكلفة 10 € تمامًا؟', 'In the app, with how many units is the average cost exactly €10?'),
        hint: same('$\\frac{5000}{x}=10$'),
        isSolved: (state) => state.firm === 'app' && productionOf(state) === 500
    }
]

function same(text: string) {
    return say(text, text, text, text)
}

/** Endless practice: bring the average cost of the bakery or the app below a mark */
const costMaker: LabChallengeMaker<CostState> = (random) => {
    const firm: CostFirm = randomInt(random, 0, 1) === 0 ? 'bakery' : 'app'
    const marks = firm === 'bakery' ? [3, 4, 5, 8, 10, 14] : [1, 2, 10, 20, 50, 100]
    const mark = marks[randomInt(random, 0, marks.length - 1)]
    const name = firm === 'bakery' ? say('Okindegian', 'En la panadería', 'في المخبز', 'In the bakery') : say('Aplikazioan', 'En la app', 'في التطبيق', 'In the app')
    const { fixed, perUnit } = COST_SETUP[firm]
    const inequality = `$\\frac{${fixed}}{x}${perUnit ? `+${perUnit}` : ''}<${mark}$`
    return {
        prompt: say(`${name.eu}, jaitsi batez besteko kostua ${mark} eurotik behera.`, `${name.es}, baja el coste medio de ${mark} €.`, `${name.ar}، اخفض متوسط التكلفة إلى أقل من ${mark} €.`, `${name.en}, bring the average cost below €${mark}.`),
        hint: say(inequality, inequality, inequality, inequality),
        isSolved: (state) => state.firm === firm && averageOf(state) < mark,
        solution: { firm, step: PRODUCTIONS.findIndex((x) => averageCost(firm, x) < mark), prediction: null }
    }
}

export const costExtra = freshFrom(initialCostState, costMaker)
