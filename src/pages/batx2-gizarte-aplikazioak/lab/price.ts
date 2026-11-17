import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L3 · Diru-sarrerarik handiena ematen duen prezioa (El precio que más
   ingresa): a gym, a concert and a hotel. Raising the price x euros
   loses k customers per euro, so the income is I(x) = (p + x)(q − kx).
   The board draws I(x) with the point of the chosen rise; the readout
   gives the price, the customers and I′(x). Before the drawing the
   learner guesses whether the best rise is less than, exactly or more
   than 10 euros.
   ========================================================================== */

export type Venue = 'gym' | 'concert' | 'hotel'

export const VENUES: Venue[] = ['gym', 'concert', 'hotel']

export interface PriceState {
    venue: Venue
    /** The rise of the price, in euros */
    x: number
    prediction: Prediction | null
}

export const initialPriceState: PriceState = { venue: 'gym', x: 0, prediction: null }

interface VenueSetup {
    /** Starting price */
    p: number
    /** Starting customers */
    q: number
    /** Customers lost per euro */
    k: number
    /** The largest rise on the stepper (no customers left) */
    max: number
    /** The top of the board */
    yMax: number
}

export const VENUE_SETUP: Record<Venue, VenueSetup> = {
    gym: { p: 20, q: 600, k: 20, max: 30, yMax: 14000 },
    concert: { p: 20, q: 1000, k: 25, max: 40, yMax: 25000 },
    hotel: { p: 60, q: 100, k: 1, max: 100, yMax: 7000 }
}

export function setPrice(state: PriceState, patch: Partial<Omit<PriceState, 'prediction'>>): PriceState {
    const venue = patch.venue ?? state.venue
    const x = Math.min(VENUE_SETUP[venue].max, Math.max(0, Math.round(patch.x ?? state.x)))
    return { venue, x, prediction: venue === state.venue ? state.prediction : null }
}

export const priceOf = (venue: Venue, x: number) => VENUE_SETUP[venue].p + x
export const customersOf = (venue: Venue, x: number) => VENUE_SETUP[venue].q - VENUE_SETUP[venue].k * x
export const incomeAt = (venue: Venue, x: number) => priceOf(venue, x) * customersOf(venue, x)
/** I′(x) = (q − kx) − k(p + x) */
export const incomeSlope = (venue: Venue, x: number) => customersOf(venue, x) - VENUE_SETUP[venue].k * priceOf(venue, x)
export const bestRise = (venue: Venue) => {
    const { p, q, k } = VENUE_SETUP[venue]
    return (q - k * p) / (2 * k)
}

/** The best rise is less than (<), exactly (=) or more than (>) 10 euros */
export const pricePrediction = (state: Pick<PriceState, 'venue'>): Prediction => compareTo(bestRise(state.venue), 10)

/** I(x) as a formula */
export const incomeLatex = (venue: Venue) => {
    const { p, q, k } = VENUE_SETUP[venue]
    return `I(x)=(${p}+x)(${q}-${k === 1 ? '' : k}x)`
}

const same = (text: string) => say(text, text, text, text)

export const priceChallenges: LabChallenge<PriceState>[] = [
    {
        id: 147301,
        prompt: say('Gimnasioan, bilatu diru-sarrerarik handienak ematen dituen igoera.', 'En el gimnasio, busca la subida que da los mayores ingresos.', 'في النادي الرياضي، ابحث عن الزيادة التي تعطي أكبر إيراد.', 'In the gym, find the rise that gives the highest income.'),
        hint: same("$I'(x)=600-20x-20(20+x)=0$"),
        isSolved: (state) => state.venue === 'gym' && state.x === 5
    },
    {
        id: 147302,
        prompt: say("Kontzertuan, bilatu $I'(x)=0$ den igoera.", "En el concierto, busca la subida con $I'(x)=0$.", "في الحفلة، ابحث عن الزيادة التي يكون فيها $I'(x)=0$.", "At the concert, find the rise with $I'(x)=0$."),
        hint: same("$I'(x)=500-50x$"),
        isSolved: (state) => state.venue === 'concert' && state.x === 10
    },
    {
        id: 147303,
        prompt: say('Hotelean, bilatu hasierako diru-sarrera berak (6000 euro) ematen dituen beste igoera.', 'En el hotel, busca la otra subida que da los mismos ingresos que al principio (6000 €).', 'في الفندق، ابحث عن الزيادة الأخرى التي تعطي إيراد البداية نفسه (6000 €).', 'In the hotel, find the other rise that gives the same income as at the start (€6000).'),
        hint: same('$(60+x)(100-x)=6000$'),
        isSolved: (state) => state.venue === 'hotel' && state.x === 40
    },
    {
        id: 147304,
        prompt: say('Kontzertuan, bilatu 500 ikusle uzten dituen igoera.', 'En el concierto, busca la subida que deja 500 espectadores.', 'في الحفلة، ابحث عن الزيادة التي تُبقي 500 متفرج.', 'At the concert, find the rise that leaves 500 spectators.'),
        hint: same('$1000-25x=500$'),
        isSolved: (state) => state.venue === 'concert' && state.x === 20
    },
    {
        id: 147305,
        prompt: say('Hotelean, bilatu 6300 euroko diru-sarrera ematen duen igoera bat.', 'En el hotel, busca una subida que dé 6300 € de ingresos.', 'في الفندق، ابحث عن زيادة تعطي إيرادًا قدره 6300 €.', 'In the hotel, find a rise that gives an income of €6300.'),
        hint: same('$6000+40x-x^2=6300$'),
        isSolved: (state) => state.venue === 'hotel' && incomeAt('hotel', state.x) === 6300
    }
]

const NAMES: Record<Venue, LocalizedText> = {
    gym: say('Gimnasioan', 'En el gimnasio', 'في النادي الرياضي', 'In the gym'),
    concert: say('Kontzertuan', 'En el concierto', 'في الحفلة', 'At the concert'),
    hotel: say('Hotelean', 'En el hotel', 'في الفندق', 'In the hotel')
}

/** Endless practice: set a rise with a given price */
const priceMaker: LabChallengeMaker<PriceState> = (random) => {
    const venue = VENUES[randomInt(random, 0, VENUES.length - 1)]
    const x = randomInt(random, 1, VENUE_SETUP[venue].max - 1)
    const customers = customersOf(venue, x)
    const name = NAMES[venue]
    return {
        prompt: say(`${name.eu}, bilatu ${customers} bezero uzten dituen igoera.`, `${name.es}, busca la subida que deja ${customers} clientes.`, `${name.ar}، ابحث عن الزيادة التي تُبقي ${customers} زبونًا.`, `${name.en}, find the rise that leaves ${customers} customers.`),
        hint: same(`$${VENUE_SETUP[venue].q}-${VENUE_SETUP[venue].k === 1 ? '' : VENUE_SETUP[venue].k}x=${customers}$`),
        isSolved: (state) => state.venue === venue && state.x === x,
        solution: { venue, x, prediction: null }
    }
}

export const priceExtra = freshFrom(initialPriceState, priceMaker)
