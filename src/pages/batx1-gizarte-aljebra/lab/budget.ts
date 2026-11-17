import { pick } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L3 · La región del presupuesto (Aurrekontuaren eskualdea): a workshop
   (chairs and tables, money and hours) and a bakery (cakes and boxes of
   biscuits, flour and oven hours). The learner places a plan (x, y); each
   resource is an inequality a·x + b·y ≤ c. Before the region and the use
   of each resource are shown, the learner predicts whether the plan fits
   with some left over, uses up a resource exactly, or does not fit. There
   is no objective function: that is linear programming, in 2.º. Pure
   logic.
   ========================================================================== */

export interface Resource {
    name: LocalizedText
    a: number
    b: number
    limit: number
}

export interface Scenario {
    name: LocalizedText
    x: LocalizedText
    y: LocalizedText
    resources: [Resource, Resource]
    max: { x: number; y: number }
    start: { x: number; y: number }
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })

export const SCENARIOS: Scenario[] = [
    {
        name: say('Tailerra', 'Taller', 'الورشة', 'Workshop'),
        x: say('aulki', 'sillas', 'الكراسي', 'chairs'),
        y: say('mahai', 'mesas', 'الطاولات', 'tables'),
        resources: [
            { name: say('Dirua (€)', 'Dinero (€)', 'المال (€)', 'Money (€)'), a: 20, b: 50, limit: 1000 },
            { name: say('Orduak', 'Horas', 'الساعات', 'Hours'), a: 2, b: 4, limit: 90 }
        ],
        max: { x: 50, y: 25 },
        start: { x: 10, y: 5 }
    },
    {
        name: say('Gozotegia', 'Pastelería', 'محل الحلويات', 'Cake shop'),
        x: say('tarta', 'tartas', 'الكعكات', 'cakes'),
        y: say('gaileta-kutxa', 'cajas de galletas', 'علب البسكويت', 'boxes of biscuits'),
        resources: [
            { name: say('Irina (kg)', 'Harina (kg)', 'الطحين (kg)', 'Flour (kg)'), a: 2, b: 1, limit: 40 },
            { name: say('Labea (h)', 'Horno (h)', 'الفرن (h)', 'Oven (h)'), a: 1, b: 1, limit: 25 }
        ],
        max: { x: 25, y: 30 },
        start: { x: 5, y: 5 }
    }
]

export interface BudgetState {
    scenario: number
    x: number
    y: number
    prediction: Prediction | null
}

export const initialBudgetState: BudgetState = { scenario: 0, x: 10, y: 5, prediction: null }

export function setBudget(state: BudgetState, patch: Partial<Omit<BudgetState, 'prediction'>>): BudgetState {
    const scenario = patch.scenario !== undefined && SCENARIOS[patch.scenario] ? patch.scenario : state.scenario
    const { max, start } = SCENARIOS[scenario]
    const changed = scenario !== state.scenario
    const x = Math.min(max.x, Math.max(0, Math.round(patch.x ?? (changed ? start.x : state.x))))
    const y = Math.min(max.y, Math.max(0, Math.round(patch.y ?? (changed ? start.y : state.y))))
    const same = scenario === state.scenario && x === state.x && y === state.y
    return { scenario, x, y, prediction: same ? state.prediction : null }
}

/** What the plan uses of each resource */
export const uses = (state: Pick<BudgetState, 'scenario' | 'x' | 'y'>) => SCENARIOS[state.scenario].resources.map((resource) => resource.a * state.x + resource.b * state.y)
/** Every resource within its limit */
export const fits = (state: Pick<BudgetState, 'scenario' | 'x' | 'y'>) => uses(state).every((used, index) => used <= SCENARIOS[state.scenario].resources[index].limit)
/** Some left over of everything (<), a resource used up exactly and none over (=), or over a limit (>) */
export function budgetPrediction(state: BudgetState): Prediction {
    const ratios = uses(state).map((used, index) => used / SCENARIOS[state.scenario].resources[index].limit)
    return compareTo(Math.round(Math.max(...ratios) * 1000), 1000)
}

export const budgetChallenges: LabChallenge<BudgetState>[] = [
    {
        id: 132301,
        prompt: say('Tailerra: 10 mahairekin, bilatu dirua eta orduak aldi berean agortzen dituen plana.', 'Taller: con 10 mesas, busca el plan que agota a la vez el dinero y las horas.', 'الورشة: مع 10 طاولات، ابحث عن الخطة التي تستنفد المال والساعات معًا.', 'Workshop: with 10 tables, find the plan that uses up the money and the hours at the same time.'),
        hint: same('$20x+500=1000$'),
        isSolved: (state) => state.scenario === 0 && state.x === 25 && state.y === 10
    },
    {
        id: 132302,
        prompt: say('Tailerra: mahairik gabe, zenbat aulki egin daitezke gehienez?', 'Taller: sin mesas, ¿cuántas sillas se pueden hacer como máximo?', 'الورشة: بلا طاولات، كم كرسيًا يمكن صنعه على الأكثر؟', 'Workshop: with no tables, how many chairs can be made at most?'),
        hint: say('Begiratu bi murrizketak: lehenengo agortzen dena da muga.', 'Mira las dos restricciones: la que se agota antes es el límite.', 'انظر إلى القيدين: الذي يُستنفد أولًا هو الحد.', 'Look at both constraints: the one that runs out first is the limit.'),
        isSolved: (state) => state.scenario === 0 && state.y === 0 && state.x === 45
    },
    {
        id: 132303,
        prompt: say('Tailerra: bilatu orduetan sartzen den baina dirutan sartzen ez den plan bat.', 'Taller: busca un plan que quepa en horas pero no en dinero.', 'الورشة: ابحث عن خطة تتسع لها الساعات لا المال.', 'Workshop: find a plan that fits in hours but not in money.'),
        hint: say('Mahaiak garestiak dira, baina ez dute hainbeste ordu behar.', 'Las mesas son caras, pero no piden tantas horas.', 'الطاولات غالية لكنها لا تحتاج إلى ساعات كثيرة.', 'Tables are expensive, but they do not need so many hours.'),
        isSolved: (state) => state.scenario === 0 && uses(state)[1] <= 90 && uses(state)[0] > 1000
    },
    {
        id: 132304,
        prompt: say('Gozotegia: tartarik gabe, zenbat gaileta-kutxa egin daitezke gehienez?', 'Pastelería: sin tartas, ¿cuántas cajas de galletas se pueden hacer como máximo?', 'محل الحلويات: بلا كعكات، كم علبة بسكويت يمكن صنعها على الأكثر؟', 'Cake shop: with no cakes, how many boxes of biscuits can be made at most?'),
        hint: same('$y\\le 40\\qquad y\\le 25$'),
        isSolved: (state) => state.scenario === 1 && state.x === 0 && state.y === 25
    },
    {
        id: 132305,
        prompt: say('Gozotegia: bilatu irina eta labea aldi berean agortzen dituen plana.', 'Pastelería: busca el plan que agota a la vez la harina y el horno.', 'محل الحلويات: ابحث عن الخطة التي تستنفد الطحين والفرن معًا.', 'Cake shop: find the plan that uses up the flour and the oven at the same time.'),
        hint: same('$2x+y=40\\qquad x+y=25$'),
        isSolved: (state) => state.scenario === 1 && state.x === 15 && state.y === 10
    }
]

function same(value: string): LocalizedText {
    return { eu: value, es: value, en: value, ar: value }
}

/** Endless practice: the most of one product when the other one is fixed */
const budgetMaker: LabChallengeMaker<BudgetState> = (random) => {
    const scenario = pick(random, [0, 1])
    const { resources, max, name, x: xName, y: yName } = SCENARIOS[scenario]
    const options: Array<{ x: number; y: number; fixed: 'x' | 'y' }> = []
    for (let y = 1; y <= max.y; y += 1) {
        const most = Math.min(...resources.map((resource) => Math.floor((resource.limit - resource.b * y) / resource.a)))
        if (most >= 1 && most <= max.x) options.push({ x: most, y, fixed: 'y' })
    }
    for (let x = 1; x <= max.x; x += 1) {
        const most = Math.min(...resources.map((resource) => Math.floor((resource.limit - resource.a * x) / resource.b)))
        if (most >= 1 && most <= max.y) options.push({ x, y: most, fixed: 'x' })
    }
    const start = SCENARIOS[scenario].start
    const { x, y, fixed } = pick(random, options.filter((option) => !(scenario === 0 && option.x === start.x && option.y === start.y)))
    const prompt = fixed === 'y'
        ? say(`${name.eu}: ${y} ${yName.eu} eginda, zenbat ${xName.eu} gehienez?`, `${name.es}: con ${y} ${yName.es}, ¿cuántas ${xName.es} como máximo?`, `${name.ar}: مع ${y} من ${yName.ar}، كم من ${xName.ar} على الأكثر؟`, `${name.en}: with ${y} ${yName.en}, how many ${xName.en} at most?`)
        : say(`${name.eu}: ${x} ${xName.eu} eginda, zenbat ${yName.eu} gehienez?`, `${name.es}: con ${x} ${xName.es}, ¿cuántas ${yName.es} como máximo?`, `${name.ar}: مع ${x} من ${xName.ar}، كم من ${yName.ar} على الأكثر؟`, `${name.en}: with ${x} ${xName.en}, how many ${yName.en} at most?`)
    return {
        prompt,
        hint: say('Bi murrizketak bete behar dira: txikiena da muga.', 'Hay que cumplir las dos restricciones: manda la más pequeña.', 'يجب تحقيق القيدين: الأصغر هو الحد.', 'Both constraints must hold: the smaller one rules.'),
        isSolved: (state) => state.scenario === scenario && state.x === x && state.y === y,
        solution: setBudget(setBudget(initialBudgetState, { scenario }), { x, y })
    }
}

export const budgetExtra = freshFrom(initialBudgetState, budgetMaker)
