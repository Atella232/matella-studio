import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { say } from '../../batx2-zientziak-probabilitatea/lab/probability.ts'

/* ==========================================================================
   L3 · Zozketa bidezkoa (La rifa justa): an association sells N tickets
   at a price, with one big prize and some small ones. The learner moves
   them and sees the money that comes in against the money that goes out,
   the player's mean gain μ − price and the association's profit. Before
   the numbers, they say whether the game is unfavourable, fair or
   favourable for the player. Everything is in whole euros, and the gain
   is exact in cents. Pure.
   ========================================================================== */

export interface RaffleState {
    tickets: number
    /** Price of a ticket, in euros */
    price: number
    /** The big prize, in euros */
    big: number
    /** How many small prizes, and how much each one is */
    smallCount: number
    small: number
    prediction: Prediction | null
}

export const RAFFLE_TICKETS = [100, 200, 500] as const
export const RAFFLE_LIMITS = { price: { min: 1, max: 5 }, big: { min: 0, max: 500, step: 50 }, smallCount: { min: 0, max: 10 }, small: { min: 0, max: 100, step: 10 } } as const

export const initialRaffleState: RaffleState = { tickets: 100, price: 2, big: 100, smallCount: 2, small: 20, prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export function setRaffle(state: RaffleState, patch: Partial<Omit<RaffleState, 'prediction'>>): RaffleState {
    const tickets = (RAFFLE_TICKETS as readonly number[]).includes(patch.tickets ?? state.tickets) ? patch.tickets ?? state.tickets : state.tickets
    const price = clamp(patch.price ?? state.price, RAFFLE_LIMITS.price.min, RAFFLE_LIMITS.price.max)
    const big = clamp(patch.big ?? state.big, RAFFLE_LIMITS.big.min, RAFFLE_LIMITS.big.max)
    const smallCount = clamp(patch.smallCount ?? state.smallCount, RAFFLE_LIMITS.smallCount.min, RAFFLE_LIMITS.smallCount.max)
    const small = clamp(patch.small ?? state.small, RAFFLE_LIMITS.small.min, RAFFLE_LIMITS.small.max)
    const next = { tickets, price, big, smallCount, small }
    const same = Object.entries(next).every(([key, value]) => state[key as keyof typeof next] === value)
    return { ...next, prediction: same ? state.prediction : null }
}

/** All the prize money, in euros */
export const prizesOf = (state: Pick<RaffleState, 'big' | 'smallCount' | 'small'>) => state.big + state.smallCount * state.small
/** The money the tickets bring in, in euros */
export const incomeOf = (state: Pick<RaffleState, 'tickets' | 'price'>) => state.tickets * state.price
/** μ, the mean prize of a ticket, in cents (exact: the prizes are whole tens of euros) */
export const meanPrizeCents = (state: Pick<RaffleState, 'tickets' | 'big' | 'smallCount' | 'small'>) => (100 * prizesOf(state)) / state.tickets
/** The player's mean gain per ticket, in cents */
export const gainCents = (state: Omit<RaffleState, 'prediction'>) => meanPrizeCents(state) - 100 * state.price
/** The association's profit, in euros */
export const profitOf = (state: Omit<RaffleState, 'prediction'>) => incomeOf(state) - prizesOf(state)

/** Unfavourable, fair or favourable for the player */
export const rafflePrediction = (state: RaffleState): Prediction => compareTo(gainCents(state), 0)

/* ---------- Challenges ---------- */

export const raffleChallenges: LabChallenge<RaffleState>[] = [
    { id: 139121, prompt: say('100 txartelekin, bakoitza 2 €, egin joko bidezko bat.', 'Con 100 boletos de 2 €, haz un juego justo.', 'بـ 100 بطاقة سعر كل منها 2 €، اصنع لعبة عادلة.', 'With 100 tickets at €2, make a fair game.'), hint: say('Sariek sartzen den diru bera banatu behar dute: 200 €.', 'Los premios tienen que repartir lo mismo que entra: 200 €.', 'يجب أن توزّع الجوائز قدر ما يدخل: 200 €.', 'The prizes must give out as much as comes in: €200.'), isSolved: (state) => state.tickets === 100 && state.price === 2 && gainCents(state) === 0 },
    { id: 139122, prompt: say('500 txartelekin, bakoitza euro 1, egin elkarteak 300 € irabaz ditzan.', 'Con 500 boletos de 1 €, haz que la asociación gane 300 €.', 'بـ 500 بطاقة سعر كل منها 1 €، اجعل الجمعية تربح 300 €.', 'With 500 tickets at €1, make the association earn €300.'), hint: say('500 € sartzen dira: sariek 200 € banatu behar dituzte.', 'Entran 500 €: los premios tienen que repartir 200 €.', 'يدخل 500 €: يجب أن توزّع الجوائز 200 €.', '€500 comes in: the prizes must give out €200.'), isSolved: (state) => state.tickets === 500 && state.price === 1 && profitOf(state) === 300 },
    { id: 139123, prompt: say('200 txartelekin, egin jokalariaren batez besteko irabazia $-0{,}5$ € izan dadin, sari txikiren bat dagoela.', 'Con 200 boletos, haz que la ganancia media del jugador sea $-0{,}5$ €, con algún premio pequeño.', 'بـ 200 بطاقة، اجعل الربح المتوسط للاعب $-0{,}5$ € مع وجود جائزة صغيرة على الأقل.', 'With 200 tickets, make the player\'s mean gain $-0{,}5$ euros, with some small prize.'), hint: say('Txartel bakoitzak batez beste prezioa ken 0,5 € itzuli behar du.', 'Cada boleto tiene que devolver de media el precio menos 0,5 €.', 'يجب أن تعيد كل بطاقة في المتوسط الثمن ناقص 0.5 €.', 'Each ticket has to give back, on average, the price minus €0.50.'), isSolved: (state) => state.tickets === 200 && gainCents(state) === -50 && state.smallCount > 0 && state.small > 0 }
]

/** Endless practice: a mean gain to reach with a number of tickets and a price */
const raffleMaker: LabChallengeMaker<RaffleState> = (random) => {
    for (;;) {
        const tickets = pick(random, RAFFLE_TICKETS)
        const price = randomInt(random, 1, 5)
        const big = 50 * randomInt(random, 0, 10)
        const smallCount = randomInt(random, 0, 10)
        const small = 10 * randomInt(random, 0, 10)
        const solution: RaffleState = { tickets, price, big, smallCount, small, prediction: null }
        const gain = gainCents(solution)
        if (gain > 0 || gain % 10 !== 0) continue
        const latex = `${gain < 0 ? '-' : ''}${Math.floor(Math.abs(gain) / 100)}${Math.abs(gain) % 100 ? `{,}${String(Math.abs(gain) % 100).padStart(2, '0').replace(/0$/, '')}` : ''}`
        return {
            prompt: say(`${tickets} txartelekin, bakoitza ${price} €, egin batez besteko irabazia $${latex}$ € izan dadin.`, `Con ${tickets} boletos de ${price} €, haz que la ganancia media sea $${latex}$ €.`, `بـ ${tickets} بطاقة سعر كل منها ${price} €، اجعل الربح المتوسط $${latex}$ €.`, `With ${tickets} tickets at €${price}, make the mean gain $${latex}$ euros.`),
            hint: say('Sari guztiak = txartel kopurua bider (prezioa + irabazia).', 'Todos los premios = número de boletos por (precio + ganancia).', 'كل الجوائز = عدد البطاقات في (الثمن + الربح).', 'All the prizes = number of tickets times (price + gain).'),
            isSolved: (state) => state.tickets === tickets && state.price === price && gainCents(state) === gain,
            solution
        }
    }
}

export const raffleExtra = freshFrom(initialRaffleState, raffleMaker)
