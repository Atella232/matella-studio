import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'

/* ==========================================================================
   J1 · Ordenatu ekonomia (Ordena la economía): four economic figures, each
   written in its own way, to be tapped from the smallest to the largest.
   Level 1: all in scientific notation (the exponent first, then the
   mantissa); level 2: mixed forms such as 453 · 10¹¹ or 0,85 · 10¹², which
   have to be put right before comparing; level 3: small amounts with
   negative exponents and plain decimals. A figure is its digits D and the
   power p of D · 10ᵖ, so every form is exact. Pure logic.
   ========================================================================== */

export const ORDER_ROUNDS = 5
export const ORDER_CARDS = 4

export interface OrderCard {
    label: LocalizedText
    /** The significant digits: the figure is digits · 10^power */
    digits: string
    power: number
    /** The exponent it is written with, or null when it is written in full */
    shown: number | null
}

export interface OrderRound {
    cards: OrderCard[]
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })

const BIG_LABELS: LocalizedText[] = [
    say('Zorra', 'Deuda', 'الدين', 'Debt'),
    say('BPG', 'PIB', 'الناتج المحلي', 'GDP'),
    say('Aurrekontua', 'Presupuesto', 'الميزانية', 'Budget'),
    say('Esportazioak', 'Exportaciones', 'الصادرات', 'Exports'),
    say('Inportazioak', 'Importaciones', 'الواردات', 'Imports'),
    say('Salmentak', 'Ventas', 'المبيعات', 'Sales'),
    say('Zergak', 'Impuestos', 'الضرائب', 'Taxes')
]
const SMALL_LABELS: LocalizedText[] = [
    say('Klik bat', 'Un clic', 'نقرة', 'A click'),
    say('Mezu bat', 'Un mensaje', 'رسالة', 'A message'),
    say('Gramo bat', 'Un gramo', 'غرام', 'A gram'),
    say('Kopia bat', 'Una copia', 'نسخة', 'A copy'),
    say('Minutu bat', 'Un minuto', 'دقيقة', 'A minute'),
    say('Kilowatt bat', 'Un kilovatio', 'كيلوواط', 'A kilowatt')
]

export const valueOf = (card: OrderCard) => Number(card.digits) * 10 ** card.power
/** The exponent of the scientific form: one digit before the point */
export const scientificExponentOf = (card: OrderCard) => card.power + card.digits.length - 1

/** digits · 10^power written with the exponent n: «453», «0,85», «4,53» (comma as {,}, thousands with \,) */
export function mantissaLatex(digits: string, power: number, exponent: number): string {
    const place = digits.length + power - exponent
    if (place <= 0) return `0{,}${'0'.repeat(-place)}${digits}`
    if (place >= digits.length) {
        const whole = digits + '0'.repeat(place - digits.length)
        return whole.length >= 5 ? whole.replace(/\B(?=(\d{3})+(?!\d))/g, '\\,') : whole
    }
    return `${digits.slice(0, place)}{,}${digits.slice(place)}`
}

/** The card as it is shown */
export const cardLatex = (card: OrderCard) => (card.shown === null ? mantissaLatex(card.digits, card.power, 0) : `${mantissaLatex(card.digits, card.power, card.shown)}\\cdot 10^{${card.shown}}`)
/** The card in scientific notation, to explain the order */
export const scientificLatex = (card: OrderCard) => {
    const exponent = scientificExponentOf(card)
    return `${mantissaLatex(card.digits, card.power, exponent)}\\cdot 10^{${exponent}}`
}

/** The cards' positions from the smallest to the largest */
export const rightOrder = (round: OrderRound) => round.cards.map((card, index) => ({ index, value: valueOf(card) })).sort((a, b) => a.value - b.value).map((item) => item.index)
export const isRightOrder = (round: OrderRound, picks: number[]) => picks.length === round.cards.length && rightOrder(round).every((index, place) => picks[place] === index)

/** Two or three significant digits, never ending in 0 */
function randomDigits(random: Random, three: boolean): string {
    for (;;) {
        const value = three ? randomInt(random, 101, 999) : randomInt(random, 11, 99)
        if (value % 10 !== 0) return String(value)
    }
}

function makeCard(random: Random, level: number, exponent: number, label: LocalizedText): OrderCard {
    const digits = randomDigits(random, level > 0 && random() < 0.5)
    // digits · 10^power = m · 10^exponent with 1 ≤ m < 10
    const power = exponent - digits.length + 1
    if (level === 0) return { label, digits, power, shown: exponent }
    if (level === 1) return { label, digits, power, shown: exponent + pick(random, [-2, -1, 1, 2, 0]) }
    return { label, digits, power, shown: random() < 0.4 ? null : exponent + pick(random, [-1, 1, 2, 0]) }
}

/** One round: four different figures, close enough that the order needs thinking */
export function createOrderRound(random: Random, level: number): OrderRound {
    for (;;) {
        const base = level === 2 ? randomInt(random, -5, -3) : randomInt(random, 7, 11)
        const labels = shuffle(random, level === 2 ? SMALL_LABELS : BIG_LABELS).slice(0, ORDER_CARDS)
        const cards = labels.map((label) => makeCard(random, level, base + randomInt(random, 0, level === 0 ? 1 : 2), label))
        const values = cards.map(valueOf).sort((a, b) => a - b)
        // No two figures almost equal, and on levels 2 and 3 at least two written in a form that is not the scientific one
        const apart = values.every((value, index) => index === 0 || value / values[index - 1] > 1.04)
        const odd = cards.filter((card) => card.shown !== scientificExponentOf(card)).length
        // The plain decimals stay short enough for a card
        const short = cards.every((card) => card.shown !== null || card.power >= -6)
        if (apart && short && (level === 0 || odd >= 2)) return { cards }
    }
}

export function createOrderRounds(random: Random, level: number): OrderRound[] {
    return Array.from({ length: ORDER_ROUNDS }, () => createOrderRound(random, level))
}
