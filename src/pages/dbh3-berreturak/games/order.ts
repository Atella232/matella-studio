import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { Stars } from '../../../features/unit-v2/games/records.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { scaleObjects } from '../lab/scale.ts'

/* ==========================================================================
   Eskala kosmikoa (Escala cósmica, 3. DBH): five cards with sizes written
   in scientific notation, to tap from the smallest to the largest. Level 1
   uses real objects (an atom, an ant, the Earth, a galaxy…), level 2 plain
   numbers with different exponents, and level 3 the traps: the same
   exponent, and numbers not written in scientific notation (25 · 10³).
   Every card has a different size, and no two are close enough to doubt.
   ========================================================================== */

export const ORDER_ROUNDS = 5
export const ORDER_CARDS = 5

export interface OrderCard {
    id: string
    /** The size, in LaTeX with the decimal comma */
    latex: string
    /** A real object this size, on level 1 */
    label: LocalizedText | null
    /** log₁₀ of the size: the order of the cards */
    log: number
}

export type OrderRound = OrderCard[]

const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar })

const mantissaText = (tenths: number) => (tenths % 10 === 0 ? String(tenths / 10) : `${Math.floor(tenths / 10)}{,}${tenths % 10}`)

/** a · 10ⁿ with the mantissa in tenths (a = tenths / 10), possibly not in scientific notation */
function sizeCard(id: string, tenths: number, exponent: number, label: LocalizedText | null = null): OrderCard {
    return { id, latex: `${mantissaText(tenths)}\\cdot 10^{${exponent}}`, label, log: Math.log10(tenths / 10) + exponent }
}

/** The cards are all different and no two sizes are within 15 % of each other */
const clearlyDifferent = (cards: OrderCard[]) => {
    const sorted = [...cards].sort((a, b) => a.log - b.log)
    return sorted.every((card, index) => index === 0 || card.log - sorted[index - 1].log >= 0.06)
}

function objectRound(random: Random): OrderRound {
    const objects = shuffle(random, scaleObjects).slice(0, ORDER_CARDS)
    return objects.map((object) => {
        const tenths = Math.round(Number(object.mantissa.replace(',', '.')) * 10)
        return sizeCard(object.id, tenths, object.exponent, object.name)
    })
}

function numberRound(random: Random): OrderRound | null {
    const exponents = shuffle(random, Array.from({ length: 18 }, (_, index) => index - 8)).slice(0, ORDER_CARDS)
    return exponents.map((exponent, index) => sizeCard(`n${index}`, randomInt(random, 11, 99), exponent))
}

function trapRound(random: Random): OrderRound | null {
    const base = randomInt(random, -4, 6)
    const cards: OrderCard[] = []
    // Two or three cards share the exponent: the mantissa decides
    const shared = randomInt(random, 2, 3)
    const mantissas = shuffle(random, [12, 19, 27, 34, 46, 58, 63, 71, 85, 93]).slice(0, shared)
    mantissas.forEach((tenths, index) => cards.push(sizeCard(`s${index}`, tenths, base)))
    // One card is not in scientific notation: 25 · 10ⁿ, that is 2,5 · 10ⁿ⁺¹
    const long = randomInt(random, 11, 90)
    cards.push(sizeCard('long', long * 10, base + pick(random, [-1, 0, 1, 2])))
    while (cards.length < ORDER_CARDS) cards.push(sizeCard(`o${cards.length}`, randomInt(random, 11, 99), base + pick(random, [-3, -2, 2, 3, 4])))
    return cards
}

export function createOrderRound(random: Random, level: number, avoid: OrderRound[] = []): OrderRound {
    for (let attempt = 0; attempt < 2000; attempt += 1) {
        const round = level === 0 ? objectRound(random) : level === 1 ? numberRound(random) : trapRound(random)
        if (!round || round.length !== ORDER_CARDS || !clearlyDifferent(round)) continue
        if (avoid.some((other) => other.map((card) => card.id).sort().join() === round.map((card) => card.id).sort().join() && level === 0)) continue
        return round
    }
    throw new Error(`No order round for level ${level}`)
}

export function createOrderRounds(random: Random, level: number): OrderRound[] {
    const rounds: OrderRound[] = []
    for (let index = 0; index < ORDER_ROUNDS; index += 1) rounds.push(createOrderRound(random, level, rounds))
    return rounds
}

/** Right order of a round, from the smallest */
export const orderSolution = (round: OrderRound): OrderCard[] => [...round].sort((a, b) => a.log - b.log)

/** The card to tap next, given the ones already placed */
export const nextCard = (round: OrderRound, placed: string[]): OrderCard | undefined => orderSolution(round).find((card) => !placed.includes(card.id))

/** A point per card, minus one for each mistake */
export const orderPoints = (mistakes: number) => Math.max(0, ORDER_CARDS - mistakes)

export const ORDER_MAX = ORDER_ROUNDS * ORDER_CARDS

export function orderStars(total: number): Stars {
    if (total >= 21) return 3
    if (total >= 15) return 2
    if (total >= 9) return 1
    return 0
}

export const orderHint = (): LocalizedText => say('Konparatu berretzaileak lehenik; berdinak badira, zenbakiak. Kontuz: $25\\cdot 10^{3}$ ez dago idazkera zientifikoan.', 'Compara primero los exponentes; si son iguales, los números. Ojo: $25\\cdot 10^{3}$ no está en notación científica.', 'قارن الأسس أولًا؛ وإذا تساوت فقارن الأعداد. انتبه: $25\\cdot 10^{3}$ ليست بالترميز العلمي.')
