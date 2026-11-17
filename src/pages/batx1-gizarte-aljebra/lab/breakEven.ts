import { pick } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L1 · El punto muerto (Errentagarritasun-atalasea): three businesses, each
   with fixed costs F and a cost c per unit. The learner sets the price p
   and the units sold x; the income line I(x) = p·x and the cost line
   C(x) = F + c·x cross at the break-even point x = F ÷ (p − c). Before the
   profit is shown, the learner predicts a loss, nothing or a gain. Pure
   logic.
   ========================================================================== */

export interface Business {
    name: LocalizedText
    unit: LocalizedText
    fixed: number
    cost: number
    price: { min: number; max: number; step: number; start: number }
    units: { max: number; step: number; start: number }
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })

export const BUSINESSES: Business[] = [
    { name: say('Motxilak', 'Mochilas', 'الحقائب', 'Backpacks'), unit: say('motxila', 'mochilas', 'حقيبة', 'backpacks'), fixed: 1200, cost: 5, price: { min: 6, max: 15, step: 1, start: 9 }, units: { max: 600, step: 25, start: 150 } },
    { name: say('Okindegia', 'Panadería', 'المخبز', 'Bakery'), unit: say('ogi', 'panes', 'رغيف', 'loaves'), fixed: 600, cost: 1, price: { min: 2, max: 6, step: 1, start: 3 }, units: { max: 800, step: 25, start: 150 } },
    { name: say('Akademia', 'Academia', 'الأكاديمية', 'School'), unit: say('ikasle', 'alumnos', 'طالب', 'students'), fixed: 2000, cost: 30, price: { min: 40, max: 120, step: 10, start: 80 }, units: { max: 100, step: 5, start: 20 } }
]

export interface BreakEvenState {
    business: number
    price: number
    units: number
    prediction: Prediction | null
}

export const initialBreakEvenState: BreakEvenState = { business: 0, price: 9, units: 150, prediction: null }

const clamp = (value: number, min: number, max: number, step: number) => Math.min(max, Math.max(min, min + Math.round((value - min) / step) * step))

export function setBreakEven(state: BreakEvenState, patch: Partial<Omit<BreakEvenState, 'prediction'>>): BreakEvenState {
    const business = patch.business !== undefined && BUSINESSES[patch.business] ? patch.business : state.business
    const { price: prices, units: amounts } = BUSINESSES[business]
    // A new business starts at its own price and units
    const changed = business !== state.business
    const price = clamp(patch.price ?? (changed ? prices.start : state.price), prices.min, prices.max, prices.step)
    const units = clamp(patch.units ?? (changed ? amounts.start : state.units), 0, amounts.max, amounts.step)
    const same = business === state.business && price === state.price && units === state.units
    return { business, price, units, prediction: same ? state.prediction : null }
}

export const income = (state: Pick<BreakEvenState, 'business' | 'price' | 'units'>) => state.price * state.units
export const costs = (state: Pick<BreakEvenState, 'business' | 'price' | 'units'>) => BUSINESSES[state.business].fixed + BUSINESSES[state.business].cost * state.units
export const profit = (state: Pick<BreakEvenState, 'business' | 'price' | 'units'>) => income(state) - costs(state)
/** The break-even point F ÷ (p − c): units, maybe with decimals */
export const breakEvenUnits = (state: Pick<BreakEvenState, 'business' | 'price'>) => BUSINESSES[state.business].fixed / (state.price - BUSINESSES[state.business].cost)
/** A loss (<), nothing (=) or a gain (>) */
export const breakEvenPrediction = (state: BreakEvenState): Prediction => compareTo(profit(state), 0)

export const breakEvenChallenges: LabChallenge<BreakEvenState>[] = [
    {
        id: 132101,
        prompt: say('Motxilak 9 eurotan: aurkitu atalasea, ez irabazi ez galdu.', 'Mochilas a 9 euros: encuentra el punto muerto, ni ganar ni perder.', 'الحقائب بسعر 9 يورو: أوجد نقطة التعادل، لا ربح ولا خسارة.', 'Backpacks at 9 euros: find the break-even point, neither gaining nor losing.'),
        hint: say('Motxila bakoitzak $9-5=4$ euro uzten ditu kostu finkoetarako.', 'Cada mochila deja $9-5=4$ euros para los costes fijos.', 'كل حقيبة تترك $9-5=4$ يورو للتكاليف الثابتة.', 'Each backpack leaves $9-5=4$ euros for the fixed costs.'),
        isSolved: (state) => state.business === 0 && state.price === 9 && state.units === 300
    },
    {
        id: 132102,
        prompt: say('Motxilak: igo prezioa, atalasea 200 motxilan egon dadin, eta jarri 200 motxila.', 'Mochilas: sube el precio hasta que el punto muerto esté en 200 mochilas, y pon 200 mochilas.', 'الحقائب: ارفع السعر حتى تصبح نقطة التعادل عند 200 حقيبة، وضع 200 حقيبة.', 'Backpacks: raise the price until break-even is at 200 backpacks, and set 200 backpacks.'),
        hint: same('$\\frac{1200}{p-5}=200$'),
        isSolved: (state) => state.business === 0 && state.price === 11 && state.units === 200
    },
    {
        id: 132103,
        prompt: say('Okindegia: 400 ogirekin, lortu 600 euroko mozkina.', 'Panadería: con 400 panes, consigue 600 euros de beneficio.', 'المخبز: مع 400 رغيف، احصل على ربح 600 يورو.', 'Bakery: with 400 loaves, make a profit of 600 euros.'),
        hint: same('$400\\cdot(p-1)-600=600$'),
        isSolved: (state) => state.business === 1 && state.units === 400 && profit(state) === 600
    },
    {
        id: 132104,
        prompt: say('Akademia: 30 ikaslerekin, aurkitu dirurik galtzen ez duen kuotarik txikiena.', 'Academia: con 30 alumnos, busca la cuota más baja que no pierde dinero.', 'الأكاديمية: مع 30 طالبًا، ابحث عن أقل رسم لا يخسر المال.', 'School: with 30 students, find the lowest fee that does not lose money.'),
        hint: say('Probatu kuotak hamarnaka: 30 ikaslek kostu finkoak ordaindu behar dituzte.', 'Prueba las cuotas de diez en diez: 30 alumnos tienen que pagar los costes fijos.', 'جرّب الرسوم بزيادة 10 في كل مرة: يجب أن يغطي 30 طالبًا التكاليف الثابتة.', 'Try the fees in steps of ten: 30 students have to pay the fixed costs.'),
        isSolved: (state) => state.business === 2 && state.units === 30 && state.price === 100
    },
    {
        id: 132105,
        prompt: say('Akademia 80 eurotan: zenbat ikaslerekin irabazten dira 500 euro?', 'Academia a 80 euros: ¿con cuántos alumnos se ganan 500 euros?', 'الأكاديمية بسعر 80 يورو: بكم طالب تُربح 500 يورو؟', 'School at 80 euros: with how many students do you earn 500 euros?'),
        hint: same('$50x-2000=500$'),
        isSolved: (state) => state.business === 2 && state.price === 80 && state.units === 50
    }
]

function same(value: string): LocalizedText {
    return { eu: value, es: value, en: value, ar: value }
}

/** Endless practice: a price, and the break-even point to find with it (a whole number of the units' step) */
const breakEvenMaker: LabChallengeMaker<BreakEvenState> = (random) => {
    const options: Array<{ business: number; price: number; units: number }> = []
    BUSINESSES.forEach(({ fixed, cost, price, units }, business) => {
        for (let p = price.min; p <= price.max; p += price.step) {
            const x = fixed / (p - cost)
            if (Number.isInteger(x) && x % units.step === 0 && x <= units.max && !(business === 0 && p === 9)) options.push({ business, price: p, units: x })
        }
    })
    const { business, price, units } = pick(random, options)
    const name = BUSINESSES[business].name
    return {
        prompt: say(`${name.eu}, ${price} eurotan: aurkitu atalasea.`, `${name.es} a ${price} euros: encuentra el punto muerto.`, `${name.ar} بسعر ${price} يورو: أوجد نقطة التعادل.`, `${name.en} at ${price} euros: find the break-even point.`),
        hint: say('Unitate bakoitzak prezioa ken kostua uzten du.', 'Cada unidad deja el precio menos el coste.', 'كل وحدة تترك السعر ناقص التكلفة.', 'Each unit leaves the price minus the cost.'),
        isSolved: (state) => state.business === business && state.price === price && state.units === units,
        solution: setBreakEven(setBreakEven(initialBreakEvenState, { business }), { price, units })
    }
}

export const breakEvenExtra = freshFrom(initialBreakEvenState, breakEvenMaker)
