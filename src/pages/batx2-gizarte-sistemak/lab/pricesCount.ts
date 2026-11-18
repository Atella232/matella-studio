import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { classify, type SystemKind } from '../../batx2-zientziak-sistemak/system.ts'

/* ==========================================================================
   L1 · Bat ere ez, bat ala infinitu? (¿Ninguno, uno o infinitos?): three
   bundles of two products and what each one costs. The learner changes
   the quantities or the price of a bundle and, before the ranks of A and
   A* are shown, predicts how many sets of prices fit: none (the data
   contradict each other), one, or infinitely many (data are missing).
   It follows the bundles of Determinanteak, where only |A| decided.
   ========================================================================== */

export interface PricesCountState {
    scenario: number
    q: number[][]
    totals: number[]
    bundle: number
    prediction: Prediction | null
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })

export interface PricesCountScenario {
    name: LocalizedText
    products: LocalizedText[]
    q: number[][]
    totals: number[]
}

export const PRICES_SCENARIOS: PricesCountScenario[] = [
    { name: say('Fruta-denda', 'Frutería', 'محل الفواكه', 'Fruit shop'), products: [say('sagarrak', 'manzanas', 'تفاح', 'apples'), say('madariak', 'peras', 'إجاص', 'pears')], q: [[2, 1], [1, 1], [4, 3]], totals: [8, 5, 18] },
    { name: say('Papeldenda', 'Papelería', 'المكتبة', 'Stationer\'s'), products: [say('koadernoak', 'cuadernos', 'دفاتر', 'notebooks'), say('boligrafoak', 'bolígrafos', 'أقلام', 'pens')], q: [[1, 2], [2, 1], [1, 1]], totals: [7, 8, 6] },
    { name: say('Okindegia', 'Panadería', 'المخبز', 'Bakery'), products: [say('ogiak', 'panes', 'خبز', 'loaves'), say('kruasanak', 'cruasanes', 'كرواسون', 'croissants')], q: [[1, 2], [2, 4], [3, 6]], totals: [5, 10, 15] }
]

export const QUANTITY_LIMITS = { min: 0, max: 6 } as const
export const TOTAL_LIMITS = { min: 0, max: 40 } as const

const clamp = (value: number, limits: { min: number; max: number }) => Math.min(limits.max, Math.max(limits.min, Math.round(value)))

export const loadPrices = (scenario: number): PricesCountState => ({ scenario, q: PRICES_SCENARIOS[scenario].q.map((row) => [...row]), totals: [...PRICES_SCENARIOS[scenario].totals], bundle: 0, prediction: null })
export const initialPricesState = loadPrices(0)

export const choosePricesBundle = (state: PricesCountState, bundle: number): PricesCountState => ({ ...state, bundle })

export function setBundleAmount(state: PricesCountState, product: number, value: number): PricesCountState {
    const q = state.q.map((row) => [...row])
    q[state.bundle][product] = clamp(value, QUANTITY_LIMITS)
    return { ...state, q, prediction: null }
}

export function setBundleTotal(state: PricesCountState, value: number): PricesCountState {
    const totals = [...state.totals]
    totals[state.bundle] = clamp(value, TOTAL_LIMITS)
    return { ...state, totals, prediction: null }
}

export const pricesClassification = (state: PricesCountState) => classify(state.q, state.totals)
export const pricesKind = (state: PricesCountState): SystemKind => pricesClassification(state).kind

/** The kind as a prediction: none ‹, one =, infinitely many › */
export const KIND_PREDICTION: Record<SystemKind, Prediction> = { inconsistent: '<', determined: '=', indeterminate: '>' }
export const pricesPrediction = (state: PricesCountState): Prediction => KIND_PREDICTION[pricesKind(state)]

/** The unique prices, from two bundles that are not proportional (only when the kind is determined) */
export function uniquePrices(state: PricesCountState): number[] | null {
    if (pricesKind(state) !== 'determined') return null
    for (let i = 0; i < 3; i++) for (let j = i + 1; j < 3; j++) {
        const [[a, b], [c, d]] = [state.q[i], state.q[j]]
        const det = a * d - b * c
        if (det === 0) continue
        return [(state.totals[i] * d - b * state.totals[j]) / det, (a * state.totals[j] - state.totals[i] * c) / det]
    }
    return null
}

/* ---------- Challenges ---------- */

const sameQuantities = (state: PricesCountState) => state.q.every((row, i) => row.join() === PRICES_SCENARIOS[state.scenario].q[i].join())
const changedTotals = (state: PricesCountState) => state.totals.filter((total, i) => total !== PRICES_SCENARIOS[state.scenario].totals[i]).length

export const pricesChallenges: LabChallenge<PricesCountState>[] = [
    {
        id: 143101,
        prompt: say('Fruta-dendan, iragarri zenbat prezio-multzo datozen bat, eta ikusi heinak.', 'En la frutería, predice cuántos juegos de precios cuadran y mira los rangos.', 'في محل الفواكه توقّع كم مجموعة أسعار تتوافق، وانظر إلى الرتبتين.', 'In the fruit shop, predict how many sets of prices fit and look at the ranks.'),
        hint: say('Probatu lehen bi sorten prezioak hirugarrenean.', 'Prueba los precios de los dos primeros lotes en el tercero.', 'جرّب أسعار المجموعتين الأوليين في الثالثة.', 'Try the prices of the first two bundles in the third.'),
        isSolved: (state) => state.scenario === 0 && state.prediction !== null
    },
    {
        id: 143102,
        prompt: say('Papeldendako datuak ez datoz bat. Aldatu sorta baten prezioa bakarrik, prezioak bat etor daitezen.', 'En la papelería los datos no cuadran. Cambia solo lo que cuesta un lote para que haya precios.', 'في المكتبة المعطيات لا تتوافق. غيّر ثمن مجموعة واحدة فقط لكي توجد أسعار.', 'At the stationer\'s the data do not fit. Change only what one bundle costs so that there are prices.'),
        hint: say('Lehen bi sortek 3 eta 2 ematen dituzte: zenbat balio beharko luke hirugarrenak?', 'Los dos primeros lotes dan 3 y 2: ¿cuánto debería costar el tercero?', 'تعطي المجموعتان الأوليان 3 و2: كم يجب أن تكلّف الثالثة؟', 'The first two bundles give 3 and 2: how much should the third cost?'),
        isSolved: (state) => state.scenario === 1 && sameQuantities(state) && changedTotals(state) === 1 && pricesKind(state) !== 'inconsistent' && state.prediction !== null
    },
    {
        id: 143103,
        prompt: say('Fruta-dendan, aldatu hirugarren sortaren prezioa, datuak bat ez etortzeko.', 'En la frutería, cambia lo que cuesta el tercer lote para que los datos no cuadren.', 'في محل الفواكه غيّر ثمن المجموعة الثالثة لكي لا تتوافق المعطيات.', 'In the fruit shop, change what the third bundle costs so that the data do not fit.'),
        hint: say('Edozein prezio, 18 euro izan ezik.', 'Cualquier precio menos 18 €.', 'أي ثمن غير 18 €.', 'Any price except €18.'),
        isSolved: (state) => state.scenario === 0 && sameQuantities(state) && state.totals[0] === 8 && state.totals[1] === 5 && pricesKind(state) === 'inconsistent'
    },
    {
        id: 143104,
        prompt: say('Okindegian infinitu prezio daude. Aldatu sorta bat, prezioak bakarrak izan daitezen.', 'En la panadería hay infinitos precios. Cambia un lote para que los precios sean únicos.', 'في المخبز توجد أسعار لا نهائية. غيّر مجموعة لكي تكون الأسعار وحيدة.', 'At the bakery there are infinitely many prices. Change a bundle so that the prices are unique.'),
        hint: say('Sorta guztiak lehenaren multiploak dira: hautsi proportzioa, eta egokitu prezioa.', 'Todos los lotes son múltiplos del primero: rompe la proporción y ajusta lo que cuesta.', 'كل المجموعات مضاعفات للأولى: اكسر التناسب واضبط الثمن.', 'Every bundle is a multiple of the first: break the proportion and adjust what it costs.'),
        isSolved: (state) => state.scenario === 2 && pricesKind(state) === 'determined'
    },
    {
        id: 143105,
        prompt: say('Okindegian, aldatu sorta baten prezioa bakarrik, datuak bat ez etortzeko.', 'En la panadería, cambia solo lo que cuesta un lote para que los datos no cuadren.', 'في المخبز غيّر ثمن مجموعة واحدة فقط لكي لا تتوافق المعطيات.', 'At the bakery, change only what one bundle costs so that the data do not fit.'),
        hint: say('Bigarren sorta lehenaren bikoitza da: haren prezioak ere bikoitza izan behar luke.', 'El segundo lote es el doble del primero: lo que cuesta también debería ser el doble.', 'المجموعة الثانية ضعف الأولى: يجب أن يكون ثمنها الضعف أيضًا.', 'The second bundle is twice the first: what it costs should be twice too.'),
        isSolved: (state) => state.scenario === 2 && sameQuantities(state) && changedTotals(state) === 1 && pricesKind(state) === 'inconsistent'
    }
]

/** Endless practice: the third bundle of the fruit shop carries something new; give it the price that fits */
const pricesMaker: LabChallengeMaker<PricesCountState> = (random) => {
    const a = randomInt(random, 1, 6)
    const b = randomInt(random, 1, 6)
    const total = 3 * a + 2 * b
    const solution: PricesCountState = { ...loadPrices(0), bundle: 2, q: [[2, 1], [1, 1], [a, b]], totals: [8, 5, total] }
    return {
        prompt: say(
            `Fruta-dendan, 3. sortak $(${a},${b})$ ditu. Zer prezio behar du datuak bat etortzeko?`,
            `En la frutería, el lote 3 trae $(${a},${b})$. ¿Qué precio necesita para que los datos cuadren?`,
            `في محل الفواكه، المجموعة 3 فيها $(${a},${b})$. ما الثمن الذي تحتاجه لكي تتوافق المعطيات؟`,
            `In the fruit shop, bundle 3 carries $(${a},${b})$. What price does it need for the data to fit?`
        ),
        hint: say('Sagarra 3 euro da eta madaria 2 euro.', 'La manzana cuesta 3 € y la pera, 2 €.', 'التفاح بـ 3 € والإجاص بـ 2 €.', 'Apples cost €3 and pears €2.'),
        isSolved: (state) => state.scenario === 0 && state.q[2][0] === a && state.q[2][1] === b && state.totals[2] === total && state.totals[0] === 8 && state.totals[1] === 5 && state.q[0].join() === '2,1' && state.q[1].join() === '1,1',
        solution
    }
}

export const pricesExtra = freshFrom(initialPricesState, pricesMaker)
