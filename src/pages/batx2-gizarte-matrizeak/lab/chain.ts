import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L2 · Ekoizpen-katea (La cadena de producción): two customers order two
   products (A, customers × products) and each product takes three parts
   (B, products × parts). The drawing joins customers → products → parts
   with the numbers on the arrows. The learner changes a customer's order
   or a product's recipe and chooses the order of the product: AB gives
   customers × parts, BA cannot be done. Before the column of a part is
   shown, the learner predicts which customer needs more of it.
   ========================================================================== */

export type ChainOrder = 'AB' | 'BA'

export interface ChainState {
    scenario: number
    a: number[][]
    b: number[][]
    order: ChainOrder
    customer: number
    part: number
    prediction: Prediction | null
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })

export interface ChainScenario {
    name: LocalizedText
    customers: LocalizedText[]
    products: LocalizedText[]
    parts: LocalizedText[]
    /** The Basque word after a number (160 torloju) */
    countEu: string[]
    a: number[][]
    b: number[][]
}

export const CHAIN_SCENARIOS: ChainScenario[] = [
    {
        name: say('Altzariak', 'Muebles', 'الأثاث', 'Furniture'),
        customers: [say('1. denda', 'Tienda 1', 'المتجر 1', 'Shop 1'), say('2. denda', 'Tienda 2', 'المتجر 2', 'Shop 2')],
        products: [say('mahaiak', 'mesas', 'طاولات', 'tables'), say('aulkiak', 'sillas', 'كراسٍ', 'chairs')],
        parts: [say('torlojuak', 'tornillos', 'براغٍ', 'screws'), say('oholak', 'tablas', 'ألواح', 'boards'), say('hankak', 'patas', 'أرجل', 'legs')],
        countEu: ['torloju', 'ohol', 'hanka'],
        a: [[5, 20], [8, 12]],
        b: [[8, 4, 4], [6, 2, 4]]
    },
    {
        name: say('Arropa', 'Ropa', 'الملابس', 'Clothes'),
        customers: [say('1. denda', 'Tienda 1', 'المتجر 1', 'Shop 1'), say('2. denda', 'Tienda 2', 'المتجر 2', 'Shop 2')],
        products: [say('alkandorak', 'camisas', 'قمصان', 'shirts'), say('prakak', 'pantalones', 'سراويل', 'trousers')],
        parts: [say('botoiak', 'botones', 'أزرار', 'buttons'), say('oihal-metroak', 'metros de tela', 'أمتار قماش', 'metres of cloth'), say('kremailerak', 'cremalleras', 'سحّابات', 'zips')],
        countEu: ['botoi', 'oihal-metro', 'kremailera'],
        a: [[10, 6], [4, 10]],
        b: [[8, 2, 0], [1, 1, 1]]
    },
    {
        name: say('Jantokiak', 'Comedores', 'المطاعم المدرسية', 'Canteens'),
        customers: [say('A jantokia', 'Comedor A', 'المطعم A', 'Canteen A'), say('B jantokia', 'Comedor B', 'المطعم B', 'Canteen B')],
        products: [say('haragi-menuak', 'menús de carne', 'وجبات لحم', 'meat menus'), say('arrain-menuak', 'menús de pescado', 'وجبات سمك', 'fish menus')],
        parts: [say('patatak', 'patatas', 'بطاطس', 'potatoes'), say('entsaladak', 'ensaladas', 'سلطات', 'salads'), say('postreak', 'postres', 'حلويات', 'desserts')],
        countEu: ['patata', 'entsalada', 'postre'],
        a: [[20, 15], [10, 30]],
        b: [[2, 1, 1], [1, 2, 1]]
    }
]
export const ORDER_LIMITS = { min: 0, max: 30 } as const
export const RECIPE_LIMITS = { min: 0, max: 10 } as const

const copy = (matrix: number[][]) => matrix.map((row) => [...row])
const clamp = (value: number, limits: { min: number; max: number }) => Math.min(limits.max, Math.max(limits.min, Math.round(value)))

export const loadChain = (scenario: number): ChainState => ({ scenario, a: copy(CHAIN_SCENARIOS[scenario].a), b: copy(CHAIN_SCENARIOS[scenario].b), order: 'BA', customer: 0, part: 0, prediction: null })
export const initialChainState = loadChain(0)

export const setChainOrder = (state: ChainState, order: ChainOrder): ChainState => (order === state.order ? state : { ...state, order, prediction: null })
export const chooseCustomer = (state: ChainState, customer: number): ChainState => ({ ...state, customer })
export const choosePart = (state: ChainState, part: number): ChainState => (part === state.part ? state : { ...state, part, prediction: null })

/** Changes how many of a product the chosen customer orders */
export function setOrderAmount(state: ChainState, product: number, value: number): ChainState {
    const a = copy(state.a)
    a[state.customer][product] = clamp(value, ORDER_LIMITS)
    return { ...state, a, prediction: null }
}

/** Changes how many of the chosen part a product takes */
export function setRecipe(state: ChainState, product: number, value: number): ChainState {
    const b = copy(state.b)
    b[product][state.part] = clamp(value, RECIPE_LIMITS)
    return { ...state, b, prediction: null }
}

const multiply = (a: number[][], b: number[][]) => a.map((row) => b[0].map((_, j) => row.reduce((sum, value, k) => sum + value * b[k][j], 0)))

/** AB: customers × parts (always 2 × 3) */
export const needs = (state: ChainState) => multiply(state.a, state.b)
/** BA cannot be done: B has 3 columns and A has 2 rows */
export const canChain = (state: ChainState) => state.order === 'AB'
export const chainPrediction = (state: ChainState): Prediction => compareTo(needs(state)[0][state.part], needs(state)[1][state.part])

/** The sum that gives one cell of AB, product by product */
export const chainTerms = (state: ChainState, customer: number, part: number): Array<[number, number]> => state.a[customer].map((amount, k) => [amount, state.b[k][part]])

/* ---------- Challenges ---------- */

export const chainChallenges: LabChallenge<ChainState>[] = [
    {
        id: 141151,
        prompt: say('Altzarietan, aukeratu zentzua duen ordena, eta iragarri zein dendak behar dituen torloju gehiago.', 'En los muebles, elige el orden que tiene sentido y predice qué tienda necesita más tornillos.', 'في الأثاث اختر الترتيب الذي له معنى، وتوقّع أي متجر يحتاج براغي أكثر.', 'In the furniture, choose the order that makes sense and predict which shop needs more screws.'),
        hint: say('Dendak → altzariak → piezak: lehen urratsa, $A$, ezkerrean.', 'Tiendas → muebles → piezas: el primer paso, $A$, a la izquierda.', 'المتاجر ← الأثاث ← القطع: الخطوة الأولى $A$ على اليسار.', 'Shops → furniture → parts: the first step, $A$, on the left.'),
        isSolved: (state) => state.scenario === 0 && canChain(state) && state.part === 0 && state.prediction !== null
    },
    {
        id: 141152,
        prompt: say('Altzarietan, aldatu 2. dendaren eskaera, 100 hanka behar izan ditzan.', 'En los muebles, cambia el pedido de la tienda 2 para que necesite 100 patas.', 'في الأثاث غيّر طلب المتجر 2 ليحتاج 100 رجل.', 'In the furniture, change the order of shop 2 so that it needs 100 legs.'),
        hint: say('Mahai eta aulki bakoitzak 4 hanka ditu: $4\\cdot 25=100$, 25 altzari behar dira.', 'Cada mesa y cada silla llevan 4 patas: $4\\cdot 25=100$, hacen falta 25 muebles.', 'لكل طاولة ولكل كرسي 4 أرجل: $4\\cdot 25=100$، فنحتاج 25 قطعة أثاث.', 'Each table and each chair has 4 legs: $4\\cdot 25=100$, so 25 pieces of furniture.'),
        isSolved: (state) => state.scenario === 0 && canChain(state) && needs(state)[1][2] === 100
    },
    {
        id: 141153,
        prompt: say('Arropan, lortu bi dendek oihal-metro berak behar izatea.', 'En la ropa, consigue que las dos tiendas necesiten los mismos metros de tela.', 'في الملابس اجعل المتجرين يحتاجان أمتار القماش نفسها.', 'In the clothes, get both shops to need the same metres of cloth.'),
        hint: say('Alkandora batek 2 metro behar ditu, eta praka batek metro 1: $2a+b$.', 'Cada camisa lleva 2 metros y cada pantalón, 1: $2a+b$.', 'يحتاج كل قميص مترين وكل سروال مترًا واحدًا: $2a+b$.', 'Each shirt takes 2 metres and each pair of trousers 1: $2a+b$.'),
        isSolved: (state) => state.scenario === 1 && canChain(state) && needs(state)[0][1] === needs(state)[1][1]
    },
    {
        id: 141154,
        prompt: say('Arropan, aldatu errezeta, 1. dendak 100 botoi behar izan ditzan.', 'En la ropa, cambia la receta para que la tienda 1 necesite 100 botones.', 'في الملابس غيّر الوصفة ليحتاج المتجر 1 إلى 100 زر.', 'In the clothes, change the recipe so that shop 1 needs 100 buttons.'),
        hint: say('1. dendak 10 alkandora eta 6 praka eskatzen ditu: $10x+6y=100$.', 'La tienda 1 pide 10 camisas y 6 pantalones: $10x+6y=100$.', 'يطلب المتجر 1 عشرة قمصان و6 سراويل: $10x+6y=100$.', 'Shop 1 orders 10 shirts and 6 pairs of trousers: $10x+6y=100$.'),
        isSolved: (state) => state.scenario === 1 && canChain(state) && needs(state)[0][0] === 100 && state.a[0][0] === 10 && state.a[0][1] === 6
    },
    {
        id: 141155,
        prompt: say('Jantokietan, lortu B jantokiak A jantokiaren postre bikoitza behar izatea.', 'En los comedores, consigue que el comedor B necesite el doble de postres que el A.', 'في المطاعم المدرسية اجعل المطعم B يحتاج ضعف حلويات المطعم A.', 'In the canteens, get canteen B to need twice as many desserts as canteen A.'),
        hint: say('Menu bakoitzak postre bat du: B jantokiak 40 menu ditu; A jantokiak 20 izan behar ditu.', 'Cada menú lleva un postre: el comedor B tiene 40 menús; el A tiene que tener 20.', 'كل وجبة فيها حلوى واحدة: للمطعم B أربعون وجبة؛ ويجب أن يكون للمطعم A عشرون.', 'Each menu has one dessert: canteen B has 40 menus; canteen A must have 20.'),
        isSolved: (state) => state.scenario === 2 && canChain(state) && needs(state)[0][2] > 0 && needs(state)[1][2] === 2 * needs(state)[0][2]
    }
]

/** Endless practice: a customer has to need an exact amount of a part, by changing one number of its order */
const chainMaker: LabChallengeMaker<ChainState> = (random) => {
    for (;;) {
        const scenario = randomInt(random, 0, CHAIN_SCENARIOS.length - 1)
        const customer = randomInt(random, 0, 1)
        const part = randomInt(random, 0, 2)
        const product = randomInt(random, 0, 1)
        const start = { ...loadChain(scenario), order: 'AB' as const, customer, part }
        if (start.b[product][part] === 0) continue
        const value = start.a[customer][product] + pick(random, [-5, -3, -2, -1, 1, 2, 3, 4, 5])
        if (value < ORDER_LIMITS.min || value > ORDER_LIMITS.max) continue
        const solution = setOrderAmount(start, product, value)
        const target = needs(solution)[customer][part]
        const s = CHAIN_SCENARIOS[scenario]
        return {
            prompt: say(
                `${s.name.eu}: lortu ${s.customers[customer].eu}k ${target} ${s.countEu[part]} behar izatea.`,
                `${s.name.es}: consigue que ${s.customers[customer].es.toLowerCase()} necesite ${target} ${s.parts[part].es}.`,
                `${s.name.ar}: اجعل ${s.customers[customer].ar} يحتاج ${target} (${s.parts[part].ar}).`,
                `${s.name.en}: get ${s.customers[customer].en.toLowerCase()} to need ${target} ${s.parts[part].en}.`
            ),
            hint: say(
                `Aldatu haren eskaera, eta erabili $AB$ ordena.`,
                `Cambia su pedido y usa el orden $AB$.`,
                `غيّر طلبه واستعمل الترتيب $AB$.`,
                `Change its order and use the order $AB$.`
            ),
            isSolved: (state) => state.scenario === scenario && canChain(state) && needs(state)[customer][part] === target,
            solution
        }
    }
}

export const chainExtra = freshFrom(initialChainState, chainMaker)
