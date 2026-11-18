import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { det } from '../../batx2-zientziak-determinanteak/determinant.ts'

/* ==========================================================================
   L1 · Ondoriozta daitezke prezioak? (¿Se deducen los precios?): a shop
   sells bundles of two or three products, and only the price of each
   bundle is known. The quantities are the matrix A (one row per bundle);
   the totals B come from prices the learner does not see. The learner
   changes what a bundle carries and, before |A| is shown, predicts its
   sign. With |A| ≠ 0 the prices come out, X = A⁻¹B; with |A| = 0 one
   bundle is a multiple or a mix of the others and the data do not fix
   the prices. Only |A| decides here: Rouché and Cramer are for Sistemak.
   ========================================================================== */

export interface BundlesState {
    scenario: number
    q: number[][]
    bundle: number
    prediction: Prediction | null
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })

export interface BundlesScenario {
    name: LocalizedText
    products: LocalizedText[]
    /** The prices of the shop, hidden from the learner */
    prices: number[]
    q: number[][]
}

export const BUNDLE_SCENARIOS: BundlesScenario[] = [
    {
        name: say('Fruta-denda', 'Frutería', 'محل الفواكه', 'Fruit shop'),
        products: [say('sagarrak', 'manzanas', 'تفاح', 'apples'), say('madariak', 'peras', 'إجاص', 'pears')],
        prices: [2, 3],
        q: [[2, 1], [3, 2]]
    },
    {
        name: say('Papeldenda', 'Papelería', 'المكتبة', 'Stationer\'s'),
        products: [say('koadernoak', 'cuadernos', 'دفاتر', 'notebooks'), say('boligrafoak', 'bolígrafos', 'أقلام', 'pens')],
        prices: [3, 1],
        q: [[2, 3], [4, 6]]
    },
    {
        name: say('Okindegia', 'Panadería', 'المخبز', 'Bakery'),
        products: [say('ogiak', 'panes', 'خبز', 'loaves'), say('kruasanak', 'cruasanes', 'كرواسون', 'croissants'), say('magdalenak', 'magdalenas', 'مادلين', 'muffins')],
        prices: [1, 2, 1],
        q: [[1, 1, 1], [1, 2, 3], [2, 3, 4]]
    }
]

export const BUNDLE_LIMITS = { min: 0, max: 6 } as const

const copy = (matrix: number[][]) => matrix.map((row) => [...row])
const clamp = (value: number) => Math.min(BUNDLE_LIMITS.max, Math.max(BUNDLE_LIMITS.min, Math.round(value)))

export const loadBundles = (scenario: number): BundlesState => ({ scenario, q: copy(BUNDLE_SCENARIOS[scenario].q), bundle: 0, prediction: null })
export const initialBundlesState = loadBundles(0)

export const chooseBundle = (state: BundlesState, bundle: number): BundlesState => ({ ...state, bundle })

/** Changes how many of a product the chosen bundle carries */
export function setAmount(state: BundlesState, product: number, value: number): BundlesState {
    const q = copy(state.q)
    q[state.bundle][product] = clamp(value)
    return { ...state, q, prediction: null }
}

/** |A|, a whole number (the quantities are whole) */
export const bundlesDet = (state: BundlesState) => {
    const value = det(state.q)
    return value.numerator / value.denominator
}
/** What each bundle costs: its row times the hidden prices */
export const bundleTotals = (state: BundlesState) => state.q.map((row) => row.reduce((sum, amount, k) => sum + amount * BUNDLE_SCENARIOS[state.scenario].prices[k], 0))
export const pricesFound = (state: BundlesState) => bundlesDet(state) !== 0
export const bundlesPrediction = (state: BundlesState): Prediction => compareTo(bundlesDet(state), 0)

/** A bundle with nothing in it */
export const hasEmptyBundle = (state: BundlesState) => state.q.some((row) => row.every((value) => value === 0))

/** k when bundle j is k times bundle i (k ≥ 0, i before j), or null */
export function multipleOf(state: BundlesState): { i: number; j: number; k: number } | null {
    for (let i = 0; i < state.q.length; i += 1) {
        for (let j = 0; j < state.q.length; j += 1) {
            if (i === j || state.q[i].every((value) => value === 0)) continue
            const lead = state.q[i].findIndex((value) => value !== 0)
            const k = state.q[j][lead] / state.q[i][lead]
            if (state.q[j].every((value, c) => Math.abs(value - k * state.q[i][c]) < 1e-9)) return { i, j, k }
        }
    }
    return null
}

/* ---------- Challenges ---------- */

const sameRows = (state: BundlesState, rows: number[]) => rows.every((row) => state.q[row].join() === BUNDLE_SCENARIOS[state.scenario].q[row].join())

export const bundlesChallenges: LabChallenge<BundlesState>[] = [
    {
        id: 142101,
        prompt: say('Fruta-dendan, iragarri $|A|$ positiboa, zero ala negatiboa den, eta ikusi prezioak.', 'En la frutería, predice si $|A|$ es positivo, cero o negativo, y mira los precios.', 'في محل الفواكه توقّع هل $|A|$ موجب أم صفر أم سالب، وانظر إلى الأسعار.', 'In the fruit shop, predict whether $|A|$ is positive, zero or negative, and look at the prices.'),
        hint: say('Gurutzean biderkatu: $|A|=2\\cdot 2-1\\cdot 3$.', 'Multiplica en cruz: $|A|=2\\cdot 2-1\\cdot 3$.', 'اضرب متقاطعًا: $|A|=2\\cdot 2-1\\cdot 3$.', 'Multiply crosswise: $|A|=2\\cdot 2-1\\cdot 3$.'),
        isSolved: (state) => state.scenario === 0 && state.prediction !== null
    },
    {
        id: 142102,
        prompt: say('Papeldendan ezin dira prezioak ondorioztatu. Aldatu sorta bat, ondoriozta daitezen.', 'En la papelería no se pueden deducir los precios. Cambia un lote para que se puedan.', 'في المكتبة لا يمكن استنتاج الأسعار. غيّر مجموعة لكي يمكن ذلك.', 'At the stationer\'s the prices cannot be found. Change a bundle so that they can.'),
        hint: say('2. sorta 1. sortaren bikoitza da: hautsi proportzio hori.', 'El lote 2 es el doble del lote 1: rompe esa proporción.', 'المجموعة 2 ضعف المجموعة 1: اكسر هذا التناسب.', 'Bundle 2 is twice bundle 1: break that proportion.'),
        isSolved: (state) => state.scenario === 1 && pricesFound(state) && state.prediction !== null
    },
    {
        id: 142103,
        prompt: say('Fruta-dendan, aldatu 2. sorta, prezioak ondorioztatu ezin izateko (sorta hutsik gabe).', 'En la frutería, cambia el lote 2 para que no se puedan deducir los precios (sin lotes vacíos).', 'في محل الفواكه غيّر المجموعة 2 لكي لا يمكن استنتاج الأسعار (دون مجموعات فارغة).', 'In the fruit shop, change bundle 2 so that the prices cannot be found (with no empty bundle).'),
        hint: say('Egin 2. sorta 1. sortaren multiplo: $(4,2)$, adibidez.', 'Haz el lote 2 múltiplo del lote 1: $(4,2)$, por ejemplo.', 'اجعل المجموعة 2 مضاعفًا للمجموعة 1: $(4,2)$ مثلًا.', 'Make bundle 2 a multiple of bundle 1: $(4,2)$, for example.'),
        isSolved: (state) => state.scenario === 0 && !pricesFound(state) && !hasEmptyBundle(state) && sameRows(state, [0])
    },
    {
        id: 142104,
        prompt: say('Okindegian, 3. sorta beste bien batura da. Aldatu 3. sorta bakarrik, prezioak ondoriozta daitezen.', 'En la panadería, el lote 3 es la suma de los otros dos. Cambia solo el lote 3 para que se deduzcan los precios.', 'في المخبز المجموعة 3 هي مجموع الأخريين. غيّر المجموعة 3 فقط لكي تُستنتج الأسعار.', 'At the bakery, bundle 3 is the sum of the other two. Change only bundle 3 so that the prices can be found.'),
        hint: say('Nahikoa da 3. sortako zenbaki bat aldatzea.', 'Basta con cambiar un número del lote 3.', 'يكفي تغيير عدد واحد من المجموعة 3.', 'Changing one number of bundle 3 is enough.'),
        isSolved: (state) => state.scenario === 2 && pricesFound(state) && sameRows(state, [0, 1])
    },
    {
        id: 142105,
        prompt: say('Okindegian, egin 3. sorta 1. sortaren bikoitza. Ondoriozta al daitezke prezioak?', 'En la panadería, haz que el lote 3 sea el doble del lote 1. ¿Se pueden deducir los precios?', 'في المخبز اجعل المجموعة 3 ضعف المجموعة 1. هل يمكن استنتاج الأسعار؟', 'At the bakery, make bundle 3 twice bundle 1. Can the prices be found?'),
        hint: say('1. sorta $(1,1,1)$ da; bikoitza, $(2,2,2)$.', 'El lote 1 es $(1,1,1)$; el doble, $(2,2,2)$.', 'المجموعة 1 هي $(1,1,1)$؛ وضعفها $(2,2,2)$.', 'Bundle 1 is $(1,1,1)$; twice it is $(2,2,2)$.'),
        isSolved: (state) => state.scenario === 2 && state.q[2].every((value, c) => value === 2 * state.q[0][c]) && sameRows(state, [0, 1]) && state.prediction !== null
    }
]

/** Endless practice: a pair of bundles of the fruit shop or the stationer's has to give an exact |A|, by changing one number */
const bundlesMaker: LabChallengeMaker<BundlesState> = (random) => {
    for (;;) {
        const scenario = randomInt(random, 0, 1)
        const bundle = randomInt(random, 0, 1)
        const product = randomInt(random, 0, 1)
        const start = { ...loadBundles(scenario), bundle }
        const value = start.q[bundle][product] + pick(random, [-2, -1, 1, 2, 3])
        if (value < BUNDLE_LIMITS.min || value > BUNDLE_LIMITS.max) continue
        const solution = setAmount(start, product, value)
        const target = bundlesDet(solution)
        const name = BUNDLE_SCENARIOS[scenario].name
        return {
            prompt: say(
                `${name.eu}: aldatu ${bundle + 1}. sortako zenbaki bat, $|A|=${target}$ izan dadin.`,
                `${name.es}: cambia un número del lote ${bundle + 1} para que $|A|=${target}$.`,
                `${name.ar}: غيّر عددًا من المجموعة ${bundle + 1} ليكون $|A|=${target}$.`,
                `${name.en}: change one number of bundle ${bundle + 1} so that $|A|=${target}$.`
            ),
            hint: say('$|A|=ad-bc$: zein zenbakik aldatzen du gehien?', '$|A|=ad-bc$: ¿qué número lo cambia más?', '$|A|=ad-bc$: أي عدد يغيّره أكثر؟', '$|A|=ad-bc$: which number changes it most?'),
            isSolved: (state) => state.scenario === scenario && bundlesDet(state) === target && sameRows(state, [1 - bundle]),
            solution
        }
    }
}

export const bundlesExtra = freshFrom(initialBundlesState, bundlesMaker)
