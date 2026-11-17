import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { same, say } from '../text.ts'

/* ==========================================================================
   L2 · Gehien ematen duen prezioa (El precio que más da): a demand line
   q = Q − k·p and a price p. The rectangle p × q is the revenue; with a
   cost v per unit, the part (p − v) × q is the profit. Before the curve is
   shown the learner predicts whether raising the price by one euro makes
   the revenue (or the profit) go up, stay or go down. ▶ slides the price
   to the vertex of the parabola. Everything is whole: Q, k, p and v.
   ========================================================================== */

export type PriceMode = 'revenue' | 'profit'

export const PRICE_LIMITS = { Q: { min: 60, max: 120, step: 10 }, k: { min: 2, max: 6 }, p: { min: 1, max: 60 }, v: { min: 0, max: 20, step: 5 } } as const

export interface PriceState {
    mode: PriceMode
    /** Units sold at price 0 */
    Q: number
    /** Units lost for each euro of price */
    k: number
    p: number
    /** Cost of each unit (profit mode) */
    v: number
    prediction: Prediction | null
}

export const initialPriceState: PriceState = { mode: 'revenue', Q: 100, k: 5, p: 4, v: 0, prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))
const snap = (value: number, step: number) => Math.round(value / step) * step

/** The highest price that still sells something */
export const priceLimit = ({ Q, k }: Pick<PriceState, 'Q' | 'k'>) => Math.floor(Q / k)

export function setPrice(state: PriceState, patch: Partial<Omit<PriceState, 'prediction'>>): PriceState {
    const mode = patch.mode ?? state.mode
    const Q = clamp(snap(patch.Q ?? state.Q, PRICE_LIMITS.Q.step), PRICE_LIMITS.Q.min, PRICE_LIMITS.Q.max)
    const k = clamp(patch.k ?? state.k, PRICE_LIMITS.k.min, PRICE_LIMITS.k.max)
    const v = clamp(snap(patch.v ?? state.v, PRICE_LIMITS.v.step), PRICE_LIMITS.v.min, PRICE_LIMITS.v.max)
    const p = clamp(patch.p ?? state.p, PRICE_LIMITS.p.min, priceLimit({ Q, k }))
    const unchanged = mode === state.mode && Q === state.Q && k === state.k && v === state.v && p === state.p
    return { mode, Q, k, p, v, prediction: unchanged ? state.prediction : null }
}

export const quantityAt = ({ Q, k }: Pick<PriceState, 'Q' | 'k'>, p: number) => Math.max(0, Q - k * p)

/** Revenue p·q, or profit (p − v)·q */
export const valueAt = (state: Pick<PriceState, 'mode' | 'Q' | 'k' | 'v'>, p: number) => (state.mode === 'revenue' ? p : p - state.v) * quantityAt(state, p)

/** The price at the vertex: Q/(2k) for the revenue, (Q/k + v)/2 for the profit */
export const bestPrice = (state: Pick<PriceState, 'mode' | 'Q' | 'k' | 'v'>) => (state.mode === 'revenue' ? state.Q / (2 * state.k) : (state.Q / state.k + state.v) / 2)

/** Raising the price one euro: the value goes up (>), stays (=) or goes down (<) */
export const pricePrediction = (state: PriceState): Prediction => compareTo(valueAt(state, state.p + 1), valueAt(state, state.p))

export const priceChallenges: LabChallenge<PriceState>[] = [
    {
        id: 133201,
        prompt: say('$q=100-5p$ eskariarekin, aurkitu diru-sarrerarik handienak ematen dituen prezioa.', 'Con la demanda $q=100-5p$, encuentra el precio que da los mayores ingresos.', 'مع الطلب $q=100-5p$، جد السعر الذي يعطي أكبر الإيرادات.', 'With the demand $q=100-5p$, find the price that gives the greatest revenue.'),
        hint: same('$p=\\frac{100}{2\\cdot 5}$'),
        isSolved: (state) => state.mode === 'revenue' && state.Q === 100 && state.k === 5 && state.p === 10
    },
    {
        id: 133202,
        prompt: say('Lortu 400 euroko diru-sarrerak, zehazki.', 'Consigue unos ingresos de 400 € exactos.', 'احصل على إيرادات قدرها 400 € تمامًا.', 'Get a revenue of exactly €400.'),
        hint: say('Prezioa bider kopurua: adibidez, 10 bider 40.', 'Precio por cantidad: por ejemplo, 10 por 40.', 'السعر في الكمية: مثلًا 10 في 40.', 'Price times quantity: for example, 10 times 40.'),
        isSolved: (state) => state.mode === 'revenue' && valueAt(state, state.p) === 400
    },
    {
        id: 133203,
        prompt: say('Unitate bakoitzak 10 € kostatzen ditu, eta eskaria $q=120-4p$ da. Aurkitu mozkinik handiena ematen duen prezioa.', 'Cada unidad cuesta 10 € y la demanda es $q=120-4p$. Encuentra el precio de máximo beneficio.', 'تكلّف كل وحدة 10 € والطلب $q=120-4p$. جد سعر أكبر ربح.', 'Each unit costs €10 and the demand is $q=120-4p$. Find the price of greatest profit.'),
        hint: same('$p=\\frac{30+10}{2}$'),
        isSolved: (state) => state.mode === 'profit' && state.Q === 120 && state.k === 4 && state.v === 10 && state.p === 20
    },
    {
        id: 133204,
        prompt: say('Bilatu prezio bat non euro bat igotzeak eta euro bat jaisteak diru-sarrerak jaisten dituzten.', 'Busca un precio en el que subir 1 € y bajar 1 € hagan bajar los ingresos.', 'ابحث عن سعر تؤدي فيه زيادة 1 € وإنقاص 1 € كلتاهما إلى نقص الإيرادات.', 'Find a price where raising it €1 and lowering it €1 both make the revenue fall.'),
        hint: say('Parabolaren erpinean zaude.', 'Estás en el vértice de la parábola.', 'أنت عند رأس القطع المكافئ.', 'You are at the vertex of the parabola.'),
        isSolved: (state) => state.mode === 'revenue' && valueAt(state, state.p + 1) < valueAt(state, state.p) && valueAt(state, state.p - 1) < valueAt(state, state.p)
    },
    {
        id: 133205,
        prompt: say('Mozkinarekin, jarri galerak dituen prezio bat.', 'Con el beneficio, pon un precio que dé pérdidas.', 'مع الربح، ضع سعرًا يعطي خسارة.', 'With the profit, set a price that makes a loss.'),
        hint: say('Unitateko kostua prezioa baino handiagoa denean.', 'Cuando el coste por unidad es mayor que el precio.', 'عندما تكون تكلفة الوحدة أكبر من السعر.', 'When the cost per unit is higher than the price.'),
        isSolved: (state) => state.mode === 'profit' && valueAt(state, state.p) < 0
    }
]

/** Endless practice: the best price of a demand line, for the revenue or the profit */
const priceMaker: LabChallengeMaker<PriceState> = (random) => {
    const profit = random() < 0.5
    for (;;) {
        const Q = 10 * randomInt(random, 6, 12)
        const k = randomInt(random, 2, 6)
        const v = profit ? 5 * randomInt(random, 1, 4) : 0
        const state = { mode: profit ? 'profit' : 'revenue', Q, k, v } as const
        const best = bestPrice(state)
        if (!Number.isInteger(best) || best < 1 || best > priceLimit(state) - 1) continue
        const demand = `$q=${Q}-${k}p$`
        return {
            prompt: profit
                ? say(`${demand} eskariarekin eta ${v} € unitateko kostuarekin, aurkitu mozkinik handiena ematen duen prezioa.`, `Con la demanda ${demand} y un coste de ${v} € por unidad, encuentra el precio de máximo beneficio.`, `مع الطلب ${demand} وتكلفة ${v} € للوحدة، جد سعر أكبر ربح.`, `With the demand ${demand} and a cost of €${v} per unit, find the price of greatest profit.`)
                : say(`${demand} eskariarekin, aurkitu diru-sarrerarik handienak ematen dituen prezioa.`, `Con la demanda ${demand}, encuentra el precio que da los mayores ingresos.`, `مع الطلب ${demand}، جد السعر الذي يعطي أكبر الإيرادات.`, `With the demand ${demand}, find the price that gives the greatest revenue.`),
            hint: profit ? same(`$p=\\frac{${Q / k}+${v}}{2}$`) : same(`$p=\\frac{${Q}}{2\\cdot ${k}}$`),
            isSolved: (current) => current.mode === state.mode && current.Q === Q && current.k === k && (!profit || current.v === v) && current.p === best,
            solution: { mode: state.mode, Q, k, p: best, v, prediction: null }
        }
    }
}

export const priceExtra = freshFrom(initialPriceState, priceMaker)
