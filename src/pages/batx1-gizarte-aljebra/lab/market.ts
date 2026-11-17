import { pick } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L2 · Oferta y demanda (Eskaintza eta eskaria): three markets with a
   demand D(p) = a − b·p that goes down and a supply O(p) = c·p − d that
   goes up. The learner moves the price; two bars show what customers want
   and what producers offer. Before the gap is shown, the learner predicts
   a shortage (supply below demand), the equilibrium or a surplus. The
   equilibrium price of each market is a whole number. Pure logic.
   ========================================================================== */

export interface Market {
    name: LocalizedText
    demand: { a: number; b: number }
    supply: { c: number; d: number }
    price: { min: number; max: number; start: number }
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })

export const MARKETS: Market[] = [
    { name: say('Kontzertuak', 'Conciertos', 'الحفلات', 'Concerts'), demand: { a: 200, b: 4 }, supply: { c: 6, d: 50 }, price: { min: 10, max: 45, start: 15 } },
    { name: say('Fruta', 'Fruta', 'الفاكهة', 'Fruit'), demand: { a: 90, b: 3 }, supply: { c: 2, d: -10 }, price: { min: 4, max: 28, start: 8 } },
    { name: say('Liburuak', 'Libros', 'الكتب', 'Books'), demand: { a: 150, b: 5 }, supply: { c: 3, d: 10 }, price: { min: 5, max: 28, start: 10 } }
]

export interface MarketState {
    market: number
    price: number
    prediction: Prediction | null
}

export const initialMarketState: MarketState = { market: 0, price: 15, prediction: null }

export function setMarket(state: MarketState, patch: Partial<Omit<MarketState, 'prediction'>>): MarketState {
    const market = patch.market !== undefined && MARKETS[patch.market] ? patch.market : state.market
    const { price: prices } = MARKETS[market]
    const changed = market !== state.market
    const price = Math.min(prices.max, Math.max(prices.min, Math.round(patch.price ?? (changed ? prices.start : state.price))))
    const same = market === state.market && price === state.price
    return { market, price, prediction: same ? state.prediction : null }
}

export const demandAt = (market: number, price: number) => MARKETS[market].demand.a - MARKETS[market].demand.b * price
export const supplyAt = (market: number, price: number) => MARKETS[market].supply.c * price - MARKETS[market].supply.d
/** The equilibrium price (a + d) ÷ (b + c) */
export const equilibriumPrice = (market: number) => (MARKETS[market].demand.a + MARKETS[market].supply.d) / (MARKETS[market].demand.b + MARKETS[market].supply.c)
/** Supply minus demand: positive, product left over; negative, not enough */
export const gap = (state: Pick<MarketState, 'market' | 'price'>) => supplyAt(state.market, state.price) - demandAt(state.market, state.price)
/** A shortage (<), the equilibrium (=) or a surplus (>) */
export const marketPrediction = (state: MarketState): Prediction => compareTo(gap(state), 0)

/** D(p) and O(p) as LaTeX, with S(p) in English */
export function marketLatex(market: number, english: boolean): { demand: string; supply: string } {
    const { demand, supply } = MARKETS[market]
    const tail = supply.d < 0 ? `+${-supply.d}` : `-${supply.d}`
    return { demand: `D(p)=${demand.a}-${demand.b}p`, supply: `${english ? 'S' : 'O'}(p)=${supply.c}p${tail}` }
}

export const marketChallenges: LabChallenge<MarketState>[] = [
    {
        id: 132201,
        prompt: say('Kontzertuak: aurkitu oreka-prezioa.', 'Conciertos: encuentra el precio de equilibrio.', 'الحفلات: أوجد سعر التوازن.', 'Concerts: find the equilibrium price.'),
        hint: same('$200-4p=6p-50$'),
        isSolved: (state) => state.market === 0 && state.price === 25
    },
    {
        id: 132202,
        prompt: say('Kontzertuak: bilatu 50 sarrera soberan uzten dituen prezioa.', 'Conciertos: busca el precio con el que sobran 50 entradas.', 'الحفلات: ابحث عن السعر الذي تفيض فيه 50 تذكرة.', 'Concerts: find the price at which 50 tickets are left over.'),
        hint: same('$(6p-50)-(200-4p)=50$'),
        isSolved: (state) => state.market === 0 && state.price === 30
    },
    {
        id: 132203,
        prompt: say('Fruta: bilatu 20 kilo falta diren prezioa.', 'Fruta: busca el precio con el que faltan 20 kilos.', 'الفاكهة: ابحث عن السعر الذي ينقص فيه 20 كيلو.', 'Fruit: find the price at which 20 kilos are missing.'),
        hint: say('Eskaria ken eskaintza: 20.', 'Demanda menos oferta: 20.', 'الطلب ناقص العرض: 20.', 'Demand minus supply: 20.'),
        isSolved: (state) => state.market === 1 && state.price === 12
    },
    {
        id: 132204,
        prompt: say('Liburuak: aurkitu oreka-prezioa.', 'Libros: encuentra el precio de equilibrio.', 'الكتب: أوجد سعر التوازن.', 'Books: find the equilibrium price.'),
        hint: same('$150-5p=3p-10$'),
        isSolved: (state) => state.market === 2 && state.price === 20
    },
    {
        id: 132205,
        prompt: say('Liburuak: bilatu 40 liburu soberan uzten dituen prezioa.', 'Libros: busca el precio con el que sobran 40 libros.', 'الكتب: ابحث عن السعر الذي يفيض فيه 40 كتابًا.', 'Books: find the price at which 40 books are left over.'),
        hint: same('$8p-160=40$'),
        isSolved: (state) => state.market === 2 && state.price === 25
    }
]

function same(value: string): LocalizedText {
    return { eu: value, es: value, en: value, ar: value }
}

/** Endless practice: a gap to make (product left over or missing, or none) in a market */
const marketMaker: LabChallengeMaker<MarketState> = (random) => {
    const options: Array<{ market: number; price: number; difference: number }> = []
    MARKETS.forEach(({ price }, market) => {
        for (let p = price.min; p <= price.max; p += 1) {
            const difference = gap({ market, price: p })
            if (difference % 10 === 0 && Math.abs(difference) <= 80 && p !== price.start) options.push({ market, price: p, difference })
        }
    })
    const { market, price, difference } = pick(random, options)
    const name = MARKETS[market].name
    const amount = Math.abs(difference)
    const prompt = difference === 0
        ? say(`${name.eu}: aurkitu oreka-prezioa.`, `${name.es}: encuentra el precio de equilibrio.`, `${name.ar}: أوجد سعر التوازن.`, `${name.en}: find the equilibrium price.`)
        : difference > 0
            ? say(`${name.eu}: bilatu ${amount} unitate soberan uzten dituen prezioa.`, `${name.es}: busca el precio con el que sobran ${amount} unidades.`, `${name.ar}: ابحث عن السعر الذي تفيض فيه ${amount} وحدة.`, `${name.en}: find the price at which ${amount} units are left over.`)
            : say(`${name.eu}: bilatu ${amount} unitate falta diren prezioa.`, `${name.es}: busca el precio con el que faltan ${amount} unidades.`, `${name.ar}: ابحث عن السعر الذي تنقص فيه ${amount} وحدة.`, `${name.en}: find the price at which ${amount} units are missing.`)
    return {
        prompt,
        hint: say('Eskaintza ken eskaria: positiboa bada, soberan; negatiboa bada, falta.', 'Oferta menos demanda: si es positiva, sobra; si es negativa, falta.', 'العرض ناقص الطلب: إن كان موجبًا ففائض، وإن كان سالبًا فنقص.', 'Supply minus demand: positive means left over; negative means missing.'),
        isSolved: (state) => state.market === market && state.price === price,
        solution: setMarket(setMarket(initialMarketState, { market }), { price })
    }
}

export const marketExtra = freshFrom(initialMarketState, marketMaker)
