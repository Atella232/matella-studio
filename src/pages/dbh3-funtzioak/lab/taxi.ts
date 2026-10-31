import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from './prediction.ts'

/* ==========================================================================
   L2 · Taxia (El taxímetro): the learner sets the start fee n, the price
   per km m and the length of the ride; the fare y = mx + n is drawn as a
   line and the ride as a point on it. First a guess: will the ride cost
   less than, exactly or more than 20 €? ▶ drives the taxi and the point
   climbs the line.
   ========================================================================== */

export const TAXI_LIMITS = { start: { min: 0, max: 6, step: 0.5 }, perKm: { min: 0.5, max: 3, step: 0.5 }, km: { min: 0, max: 12, step: 1 } } as const

export interface TaxiState {
    start: number
    perKm: number
    km: number
    prediction: Prediction | null
}

export const initialTaxiState: TaxiState = { start: 2, perKm: 1, km: 4, prediction: null }

const snap = (value: number, { min, max, step }: { min: number; max: number; step: number }) => Math.min(max, Math.max(min, Math.round(value / step) * step))

export function setTaxi(state: TaxiState, patch: Partial<Pick<TaxiState, 'start' | 'perKm' | 'km'>>): TaxiState {
    const start = snap(patch.start ?? state.start, TAXI_LIMITS.start)
    const perKm = snap(patch.perKm ?? state.perKm, TAXI_LIMITS.perKm)
    const km = snap(patch.km ?? state.km, TAXI_LIMITS.km)
    const same = start === state.start && perKm === state.perKm && km === state.km
    return { start, perKm, km, prediction: same ? state.prediction : null }
}

export const taxiCost = (state: Pick<TaxiState, 'start' | 'perKm' | 'km'>, km = state.km) => state.start + state.perKm * km
/** Less than (<), exactly (=) or more than (>) 20 €? */
export const taxiPrediction = (state: TaxiState): Prediction => compareTo(taxiCost(state), 20)

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const tex = (value: number) => String(value).replace('.', '{,}')
const fare = (start: number, perKm: number) => `y=${tex(perKm)}x+${tex(start)}`
const is = (start: number, perKm: number, km: number) => (state: TaxiState) => state.start === start && state.perKm === perKm && state.km === km

const findRide = (start: number, perKm: number, cost: number) => say(
    `Tarifa: $${fare(start, perKm)}$. Jarri tarifa eta aurkitu $${tex(cost)}$ € balio dituen bidaia.`,
    `Tarifa: $${fare(start, perKm)}$. Pon la tarifa y encuentra el viaje que cuesta $${tex(cost)}$ €.`,
    `التعريفة: $${fare(start, perKm)}$. اضبطها وجد الرحلة التي ثمنها $${tex(cost)}$ يورو.`,
    `Fare: $${fare(start, perKm)}$. Set the fare and find the ride that costs $${tex(cost)}$ €.`
)
const rideHint = (start: number, perKm: number, cost: number) => say(`$x=\\frac{${tex(cost)}-${tex(start)}}{${tex(perKm)}}$`, `$x=\\frac{${tex(cost)}-${tex(start)}}{${tex(perKm)}}$`, `$x=\\frac{${tex(cost)}-${tex(start)}}{${tex(perKm)}}$`, `$x=\\frac{${tex(cost)}-${tex(start)}}{${tex(perKm)}}$`)

export const taxiChallenges: LabChallenge<TaxiState>[] = [
    { id: 38201, prompt: findRide(3, 1.5, 18), hint: rideHint(3, 1.5, 18), isSolved: is(3, 1.5, 10) },
    { id: 38202, prompt: say('Hasierako $5$ €-rekin, egin $10$ km-ko bidaiak $25$ € balio ditzan.', 'Con una bajada de $5$ €, haz que un viaje de $10$ km cueste $25$ €.', 'مع انطلاق بـ $5$ يورو، اجعل رحلة $10$ كم بـ $25$ يورو.', 'With a $5$ € start, make a $10$ km ride cost $25$ €.'), hint: same('$10m+5=25$'), isSolved: is(5, 2, 10) },
    { id: 38203, prompt: say('Egin $0$ km-ko bidaiak $4$ € balio ditzan. Zer da $n$ grafikoan?', 'Haz que un viaje de $0$ km cueste $4$ €. ¿Qué es $n$ en la gráfica?', 'اجعل رحلة $0$ كم بـ $4$ يورو. ما $n$ في التمثيل؟', 'Make a $0$ km ride cost $4$ €. What is $n$ on the graph?'), hint: say('$x=0$ denean, $y=n$: Y ardatzeko puntua.', 'Si $x=0$, $y=n$: el punto del eje Y.', 'إذا $x=0$ فإن $y=n$: نقطة محور Y.', 'If $x=0$, $y=n$: the point on the Y axis.'), isSolved: (state) => state.km === 0 && state.start === 4 },
    { id: 38204, prompt: say('Tarifa proportzionala ($n=0$): egin $6$ km-k $15$ € balio ditzaten.', 'Tarifa proporcional ($n=0$): haz que $6$ km cuesten $15$ €.', 'تعريفة تناسبية ($n=0$): اجعل $6$ كم بـ $15$ يورو.', 'A proportional fare ($n=0$): make $6$ km cost $15$ €.'), hint: same('$m=\\frac{15}{6}$'), isSolved: is(0, 2.5, 6) },
    { id: 38205, prompt: say('$y=1{,}5x+2$ tarifarekin $8$ km-k $14$ € balio dute. Hasierako $6$ €-rekin, zein prezio km-ko behar da berdin balio dezan?', 'Con $y=1{,}5x+2$, $8$ km cuestan $14$ €. Con una bajada de $6$ €, ¿qué precio por km hace falta para que cueste lo mismo?', 'مع $y=1{,}5x+2$ تكلّف $8$ كم $14$ يورو. مع انطلاق بـ $6$ يورو، ما سعر الكيلومتر ليكون الثمن نفسه؟', 'With $y=1{,}5x+2$, $8$ km cost $14$ €. With a $6$ € start, what price per km makes it cost the same?'), hint: same('$8m+6=14$'), isSolved: is(6, 1, 8) }
]

function same(latex: string): LocalizedText {
    return say(latex, latex, latex, latex)
}

/** Endless practice: a fare and a price, find the ride */
const taxiMaker: LabChallengeMaker<TaxiState> = (random) => {
    const start = randomInt(random, 0, 12) / 2
    const perKm = pick(random, [0.5, 1, 1.5, 2, 2.5, 3])
    const km = randomInt(random, 1, 12)
    const cost = start + perKm * km
    return { prompt: findRide(start, perKm, cost), hint: rideHint(start, perKm, cost), isSolved: is(start, perKm, km), solution: { start, perKm, km, prediction: null } }
}

export const taxiExtra = freshFrom(initialTaxiState, taxiMaker)
