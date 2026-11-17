import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L1 · Tiketa (El ticket): two shops sell three products. The learner
   builds the matrices from the table: the quantities with the shops in rows
   (Q, 2 × 3) or in columns (Qᵗ, 3 × 2), the prices as a column (P, 3 × 1)
   or as a row (Pᵗ, 1 × 3), and the order of the product. Only two of the
   eight products can be done, QP (a column) and PᵗQᵗ (a row), and both give
   what each shop takes in; the others say why not. The prices can be the
   selling prices, the costs or the profit per unit (V − C). Before the
   totals are shown, the learner predicts which shop gets more.
   ========================================================================== */

export type Layout = 'shops' | 'products'
export type PriceShape = 'column' | 'row'
export type Order = 'QP' | 'PQ'
export type Measure = 'income' | 'cost' | 'profit'

export interface TicketState {
    scenario: number
    /** Quantities: shops × products */
    q: number[][]
    layout: Layout
    shape: PriceShape
    order: Order
    measure: Measure
    /** The shop whose quantities the steppers change */
    shop: number
    prediction: Prediction | null
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })

export interface TicketScenario {
    name: LocalizedText
    products: LocalizedText[]
    q: number[][]
    sell: number[]
    cost: number[]
}

export const TICKET_SCENARIOS: TicketScenario[] = [
    {
        name: say('Fruta-denda', 'Frutería', 'محل الفواكه', 'Fruit shop'),
        products: [say('sagarrak', 'manzanas', 'تفاح', 'apples'), say('udareak', 'peras', 'إجاص', 'pears'), say('platanoak', 'plátanos', 'موز', 'bananas')],
        q: [[10, 6, 8], [4, 12, 5]],
        sell: [3, 2, 2],
        cost: [2, 1, 1]
    },
    {
        name: say('Papeldenda', 'Papelería', 'مكتبة القرطاسية', 'Stationer\'s'),
        products: [say('koadernoak', 'cuadernos', 'دفاتر', 'notebooks'), say('boligrafoak', 'bolis', 'أقلام', 'pens'), say('karpetak', 'carpetas', 'ملفات', 'folders')],
        q: [[8, 20, 5], [12, 10, 6]],
        sell: [3, 2, 5],
        cost: [2, 1, 3]
    },
    {
        name: say('Okindegia', 'Panadería', 'المخبز', 'Bakery'),
        products: [say('ogi-barrak', 'barras', 'أرغفة', 'loaves'), say('kruasanak', 'cruasanes', 'كرواسون', 'croissants'), say('tartak', 'tartas', 'كعكات', 'cakes')],
        q: [[30, 12, 2], [25, 20, 1]],
        sell: [2, 3, 18],
        cost: [1, 1, 10]
    }
]
export const TICKET_LIMITS = { min: 0, max: 40 } as const

const copy = (matrix: number[][]) => matrix.map((row) => [...row])

export const loadScenario = (scenario: number): TicketState => ({ scenario, q: copy(TICKET_SCENARIOS[scenario].q), layout: 'products', shape: 'row', order: 'QP', measure: 'income', shop: 0, prediction: null })
export const initialTicketState = loadScenario(0)

export const setLayout = (state: TicketState, layout: Layout): TicketState => (layout === state.layout ? state : { ...state, layout, prediction: null })
export const setShape = (state: TicketState, shape: PriceShape): TicketState => (shape === state.shape ? state : { ...state, shape, prediction: null })
export const setOrder = (state: TicketState, order: Order): TicketState => (order === state.order ? state : { ...state, order, prediction: null })
export const setMeasure = (state: TicketState, measure: Measure): TicketState => (measure === state.measure ? state : { ...state, measure, prediction: null })
export const chooseShop = (state: TicketState, shop: number): TicketState => ({ ...state, shop })

export function setQuantity(state: TicketState, product: number, value: number): TicketState {
    const q = copy(state.q)
    q[state.shop][product] = Math.min(TICKET_LIMITS.max, Math.max(TICKET_LIMITS.min, Math.round(value)))
    return { ...state, q, prediction: null }
}

/** The price per unit of each product for the chosen measure */
export function prices(state: TicketState): number[] {
    const scenario = TICKET_SCENARIOS[state.scenario]
    return scenario.sell.map((sell, index) => (state.measure === 'income' ? sell : state.measure === 'cost' ? scenario.cost[index] : sell - scenario.cost[index]))
}

/** The quantities as the learner laid them out */
export const quantityMatrix = (state: TicketState): number[][] => (state.layout === 'shops' ? copy(state.q) : state.q[0].map((_, j) => state.q.map((row) => row[j])))
/** The prices as a column (3 × 1) or a row (1 × 3) */
export const priceMatrix = (state: TicketState): number[][] => (state.shape === 'column' ? prices(state).map((value) => [value]) : [prices(state)])

export const sizeOf = (matrix: number[][]): [number, number] => [matrix.length, matrix[0].length]

/** The two factors in the chosen order */
export function factors(state: TicketState): [number[][], number[][]] {
    const q = quantityMatrix(state)
    const p = priceMatrix(state)
    return state.order === 'QP' ? [q, p] : [p, q]
}

export const multiply = (a: number[][], b: number[][]) => a.map((row) => b[0].map((_, j) => row.reduce((sum, value, k) => sum + value * b[k][j], 0)))

/** The product, or null when the inner sizes do not match */
export function result(state: TicketState): number[][] | null {
    const [a, b] = factors(state)
    return sizeOf(a)[1] === sizeOf(b)[0] ? multiply(a, b) : null
}

/** What each shop takes in, spends or makes (whatever the layout) */
export const shopTotals = (state: TicketState): number[] => state.q.map((row) => row.reduce((sum, value, k) => sum + value * prices(state)[k], 0))

export const canMultiply = (state: TicketState) => result(state) !== null
export const ticketPrediction = (state: TicketState): Prediction => compareTo(shopTotals(state)[0], shopTotals(state)[1])

/* ---------- Challenges ---------- */

const valid = (state: TicketState) => canMultiply(state)

export const ticketChallenges: LabChallenge<TicketState>[] = [
    {
        id: 141101,
        prompt: say('Fruta-dendan, eraiki prezioak zutabe gisa dituen biderkadura bat, egin daitekeena.', 'En la frutería, monta un producto que se pueda hacer con los precios en una columna.', 'في محل الفواكه كوّن جداءً يمكن حسابه والأسعار في عمود.', 'In the fruit shop, build a product that can be done with the prices in a column.'),
        hint: say('Dendak errenkadetan ($Q$ matrizea, $2\\times 3$) eta prezioak eskuinean: $QP$.', 'Las tiendas en filas ($Q$, $2\\times 3$) y los precios a la derecha: $QP$.', 'المتاجر في الصفوف ($Q$، $2\\times 3$) والأسعار على اليمين: $QP$.', 'The shops in rows ($Q$, $2\\times 3$) and the prices on the right: $QP$.'),
        isSolved: (state) => state.scenario === 0 && state.shape === 'column' && valid(state)
    },
    {
        id: 141102,
        prompt: say('Fruta-dendan, aurkitu beste bidea: prezioak errenkada gisa, eta biderkadura egin daitekeena.', 'En la frutería, encuentra la otra forma: los precios en una fila y un producto que se pueda hacer.', 'في محل الفواكه جد الطريقة الأخرى: الأسعار في صف وجداء يمكن حسابه.', 'In the fruit shop, find the other way: the prices in a row and a product that can be done.'),
        hint: say('$1\\times 3$ errenkada baten ondoren $3\\times 2$ matrize bat behar da: dendak zutabeetan, eta prezioak ezkerrean.', 'Tras una fila $1\\times 3$ hace falta una matriz $3\\times 2$: las tiendas en columnas y los precios a la izquierda.', 'بعد صف $1\\times 3$ نحتاج مصفوفة $3\\times 2$: المتاجر في الأعمدة والأسعار على اليسار.', 'After a $1\\times 3$ row you need a $3\\times 2$ matrix: the shops in columns and the prices on the left.'),
        isSolved: (state) => state.scenario === 0 && state.shape === 'row' && valid(state)
    },
    {
        id: 141103,
        prompt: say('Papeldendan, kalkulatu denda bakoitzaren irabazia, eta iragarri zein dendak irabazten duen gehiago.', 'En la papelería, calcula el beneficio de cada tienda y predice cuál gana más.', 'في مكتبة القرطاسية احسب ربح كل متجر وتوقّع أيهما يربح أكثر.', 'In the stationer\'s, work out the profit of each shop and predict which one makes more.'),
        hint: say('Aukeratu «Irabazia»: unitateko prezioa $V-C$ da.', 'Elige «Beneficio»: el precio por unidad es $V-C$.', 'اختر «الربح»: سعر الوحدة هو $V-C$.', 'Choose «Profit»: the price per unit is $V-C$.'),
        isSolved: (state) => state.scenario === 1 && state.measure === 'profit' && valid(state) && state.prediction !== null
    },
    {
        id: 141104,
        prompt: say('Papeldendan, aldatu 2. dendaren kopuruak, bi dendek diru bera jaso dezaten.', 'En la papelería, cambia las cantidades de la tienda 2 para que las dos tiendas ingresen lo mismo.', 'في مكتبة القرطاسية غيّر كميات المتجر 2 ليكون إيراد المتجرين متساويًا.', 'In the stationer\'s, change the quantities of shop 2 so that both shops take in the same.'),
        hint: say('1. dendak 89 euro jasotzen ditu, eta 2. dendak 86: 3 euro falta zaizkio.', 'La tienda 1 ingresa 89 € y la 2, 86 €: le faltan 3 €.', 'إيراد المتجر 1 هو 89 € والمتجر 2 هو 86 €: ينقصه 3 €.', 'Shop 1 takes in €89 and the second shop €86: it is €3 short.'),
        isSolved: (state) => state.scenario === 1 && state.measure === 'income' && valid(state) && shopTotals(state)[0] === shopTotals(state)[1] && state.q[0].every((value, index) => value === TICKET_SCENARIOS[1].q[0][index])
    },
    {
        id: 141105,
        prompt: say('Okindegian, lortu 1. dendak 80 euro irabaz ditzan.', 'En la panadería, consigue que la tienda 1 gane 80 €.', 'في المخبز اجعل المتجر 1 يربح 80 €.', 'In the bakery, get shop 1 to make €80 of profit.'),
        hint: say('Orain 70 euro irabazten ditu. Kruasan bakoitzak 2 euro uzten ditu, eta barra bakoitzak 1 euro.', 'Ahora gana 70 €. Cada cruasán deja 2 € y cada barra, 1 €.', 'يربح الآن 70 €. كل كرواسون يترك 2 € وكل رغيف 1 €.', 'It makes €70 now. Each croissant leaves €2 and each loaf €1.'),
        isSolved: (state) => state.scenario === 2 && state.measure === 'profit' && valid(state) && shopTotals(state)[0] === 80
    }
]

const MEASURE_WORDS: Record<'income' | 'profit', LocalizedText> = {
    income: say('jaso dezan', 'ingrese', 'إيراد', 'take in'),
    profit: say('irabaz dezan', 'gane', 'ربح', 'make')
}

/** Endless practice: a shop has to take in or make an exact amount by changing one quantity */
const ticketMaker: LabChallengeMaker<TicketState> = (random) => {
    for (;;) {
        const scenario = randomInt(random, 0, TICKET_SCENARIOS.length - 1)
        const shop = randomInt(random, 0, 1)
        const measure = pick(random, ['income', 'profit'] as const)
        const product = randomInt(random, 0, 2)
        const start = { ...loadScenario(scenario), layout: 'shops' as const, shape: 'column' as const, measure, shop }
        if (prices(start)[product] === 0) continue
        const change = pick(random, [-4, -3, -2, -1, 1, 2, 3, 4, 5])
        const value = start.q[shop][product] + change
        if (value < TICKET_LIMITS.min || value > TICKET_LIMITS.max) continue
        const solution = setQuantity(start, product, value)
        const target = shopTotals(solution)[shop]
        const name = TICKET_SCENARIOS[scenario].name
        const word = MEASURE_WORDS[measure]
        const euro = { eu: `${target} euro`, es: `${target} €`, ar: `${target} €`, en: `€${target}` }
        return {
            prompt: say(
                `${name.eu}: lortu ${shop + 1}. dendak ${euro.eu} ${word.eu}.`,
                `${name.es}: consigue que la tienda ${shop + 1} ${word.es} ${euro.es}.`,
                `${name.ar}: اجعل ${word.ar} المتجر ${shop + 1} يساوي ${euro.ar}.`,
                `${name.en}: get shop ${shop + 1} to ${word.en} ${euro.en}.`
            ),
            hint: say(
                `Aldatu ${shop + 1}. dendaren kopuru bat, eta erabili egin daitekeen biderkadura bat.`,
                `Cambia una cantidad de la tienda ${shop + 1} y usa un producto que se pueda hacer.`,
                `غيّر كمية من كميات المتجر ${shop + 1} واستعمل جداءً يمكن حسابه.`,
                `Change one quantity of shop ${shop + 1} and use a product that can be done.`
            ),
            isSolved: (state) => state.scenario === scenario && state.measure === measure && valid(state) && shopTotals(state)[shop] === target,
            solution
        }
    }
}

export const ticketExtra = freshFrom(initialTicketState, ticketMaker)
