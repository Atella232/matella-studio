import type { LocalizedText } from '../content.ts'
import { fraction, multiply, subtract, type FractionValue } from '../math/fraction.ts'
import { pick, randomInt, shuffle, type Random } from './random.ts'
import type { Stars } from './records.ts'

/* ==========================================================================
   Merkealdiak (Rebajas): percentages and fractions of a price, in shops.
   Every amount is a whole number of euros. Wrong options come from typical
   mistakes, and after each answer the price is drawn as a bar split into
   equal parts: what you pay and what you save.
   ========================================================================== */

export const SALES_ROUNDS = 6

/** An offer on a price tag */
export type Offer =
    | { type: 'percent'; percent: number }
    | { type: 'fraction'; off: FractionValue }
    | { type: 'pay'; pay: FractionValue }
    | { type: 'take'; take: number; pay: number }
    | { type: 'chain'; first: number; second: number }

export type SaleKind = 'pay' | 'save' | 'compare' | 'chained' | 'chained-compare' | 'original'

export type SaleError =
    | 'euros-as-percent'
    | 'discount-not-price'
    | 'price-not-discount'
    | 'pay-as-discount'
    | 'one-part'
    | 'added-percents'
    | 'only-first'
    | 'added-to-paid'
    | 'calculation'
    | 'worse-offer'

export interface SaleOption {
    label: LocalizedText
    correct: boolean
    error: SaleError | null
}

/** A price drawn as a bar of equal parts, the first `paid` of them paid */
export interface SaleBar {
    /** The price the bar stands for */
    total: number
    parts: number
    paid: number
    /** Euros paid, and euros saved */
    paidValue: number
    savedValue: number
    /** The offer the bar shows, when there are several */
    offer?: Offer
}

export interface SaleRound {
    kind: SaleKind
    product: ProductId
    /** Price of one unit; for 'original', the unknown price */
    price: number
    quantity: number
    /** On the tag: the offer (or two, chained); for comparisons the options are the offers */
    offers: Offer[]
    /** For 'original': what was paid */
    paid: number | null
    question: LocalizedText
    options: SaleOption[]
    /** Worked explanation, shown after answering */
    steps: LocalizedText[]
    bars: SaleBar[]
}

/* ---------- Products ---------- */

export type ProductId = 'backpack' | 'trainers' | 'book' | 'headphones' | 'ball' | 'jacket' | 'game'

export const products: Record<ProductId, LocalizedText> = {
    backpack: { eu: 'Motxila', es: 'Mochila', en: 'Backpack', ar: 'حقيبة ظهر' },
    trainers: { eu: 'Zapatilak', es: 'Zapatillas', en: 'Trainers', ar: 'حذاء رياضي' },
    book: { eu: 'Liburua', es: 'Libro', en: 'Book', ar: 'كتاب' },
    headphones: { eu: 'Entzungailuak', es: 'Auriculares', en: 'Headphones', ar: 'سماعات' },
    ball: { eu: 'Baloia', es: 'Balón', en: 'Ball', ar: 'كرة' },
    jacket: { eu: 'Jaka', es: 'Chaqueta', en: 'Jacket', ar: 'سترة' },
    game: { eu: 'Mahai-jokoa', es: 'Juego de mesa', en: 'Board game', ar: 'لعبة لوحية' }
}

const productIds = Object.keys(products) as ProductId[]

/* ---------- Offers ---------- */

const frac = (value: FractionValue) => `$\\frac{${value.numerator}}{${value.denominator}}$`

/** Share of the price that is paid with the offer */
export function payShare(offer: Offer): FractionValue {
    switch (offer.type) {
        case 'percent': return fraction(100 - offer.percent, 100)
        case 'fraction': return subtract(fraction(1), offer.off)
        case 'pay': return offer.pay
        case 'take': return fraction(offer.pay, offer.take)
        case 'chain': return multiply(fraction(100 - offer.first, 100), fraction(100 - offer.second, 100))
    }
}

/** How the offer is written on the tag (Basque never puts a case ending after a number) */
export function offerLabel(offer: Offer): LocalizedText {
    switch (offer.type) {
        case 'percent':
            return { eu: `Deskontua: % ${offer.percent}`, es: `${offer.percent} % de descuento`, en: `${offer.percent}% off`, ar: `خصم ${offer.percent}٪` }
        case 'fraction':
            return { eu: `Deskontua: ${frac(offer.off)}`, es: `${frac(offer.off)} de descuento`, en: `${frac(offer.off)} off`, ar: `خصم ${frac(offer.off)}` }
        case 'pay':
            return { eu: `Prezioaren ${frac(offer.pay)} ordaintzen duzu`, es: `Pagas ${frac(offer.pay)} del precio`, en: `You pay ${frac(offer.pay)} of the price`, ar: `تدفع ${frac(offer.pay)} من السعر` }
        case 'take':
            return { eu: `${offer.take} × ${offer.pay}: eraman ${offer.take}, ordaindu ${offer.pay}`, es: `${offer.take} × ${offer.pay}: llévate ${offer.take} y paga ${offer.pay}`, en: `${offer.take} × ${offer.pay}: take ${offer.take} and pay ${offer.pay}`, ar: `${offer.take} × ${offer.pay}: خذ ${offer.take} وادفع ثمن ${offer.pay}` }
        case 'chain':
            return { eu: `% ${offer.first}, eta gero beste % ${offer.second}`, es: `${offer.first} % y luego otro ${offer.second} %`, en: `${offer.first}% and then another ${offer.second}%`, ar: `${offer.first}٪ ثم ${offer.second}٪ إضافية` }
    }
}

/** Equal parts the bar of an offer is split into, and how many of them are paid */
export function offerParts(offer: Offer): { parts: number; paid: number } {
    if (offer.type === 'take') return { parts: offer.take, paid: offer.pay }
    const share = payShare(offer)
    return { parts: share.denominator, paid: share.numerator }
}

/* ---------- Money ---------- */

const euros = (value: number): LocalizedText => ({ eu: `${value} €`, es: `${value} €`, en: `€${value}`, ar: `${value} €` })
const isWhole = (value: FractionValue) => value.denominator === 1
const amount = (total: number, share: FractionValue) => multiply(fraction(total), share)

/**
 * Four money options: the right amount and up to three typical mistakes,
 * skipping any that is not a positive whole number or repeats another; the
 * rest are filled with nearby amounts.
 */
function moneyOptions(random: Random, right: number, mistakes: Array<[number | FractionValue, SaleError]>): SaleOption[] | null {
    const seen = new Set([right])
    const options: SaleOption[] = [{ label: euros(right), correct: true, error: null }]
    for (const [raw, error] of mistakes) {
        const value = typeof raw === 'number' ? fraction(raw) : raw
        if (!isWhole(value) || value.numerator <= 0 || seen.has(value.numerator) || options.length === 4) continue
        seen.add(value.numerator)
        options.push({ label: euros(value.numerator), correct: false, error })
    }
    const steps = right >= 40 ? [10, -10, 5, -5, 20] : [2, -2, 1, -1, 4, 3]
    for (const step of shuffle(random, steps)) {
        if (options.length === 4) break
        const near = right + step
        if (near <= 0 || seen.has(near)) continue
        seen.add(near)
        options.push({ label: euros(near), correct: false, error: 'calculation' })
    }
    return options.length === 4 ? shuffle(random, options) : null
}

/** In Arabic a formula and the € after it are kept together, reading left to right (LRI … PDI) */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\$([^$]+)\$ €/g, '\u2066$$$1$ €\u2069') })

/* ---------- Level 1: how much do I pay, how much do I save ---------- */

const PERCENTS = [10, 15, 20, 25, 30, 40, 50, 60, 75]
const OFF_FRACTIONS = [fraction(1, 2), fraction(1, 3), fraction(1, 4), fraction(1, 5), fraction(2, 5), fraction(1, 6), fraction(3, 10), fraction(2, 3), fraction(3, 4)]
const PAY_FRACTIONS = [fraction(2, 3), fraction(3, 4), fraction(4, 5), fraction(3, 5), fraction(5, 6), fraction(7, 10)]

function simpleRound(random: Random): SaleRound | null {
    const kind: SaleKind = random() < 0.65 ? 'pay' : 'save'
    const offerType = kind === 'save' ? pick(random, ['percent', 'fraction'] as const) : pick(random, ['percent', 'fraction', 'pay'] as const)
    const offer: Offer = offerType === 'percent' ? { type: 'percent', percent: pick(random, PERCENTS) }
        : offerType === 'fraction' ? { type: 'fraction', off: pick(random, OFF_FRACTIONS) }
            : { type: 'pay', pay: pick(random, PAY_FRACTIONS) }
    const share = payShare(offer)
    const price = randomInt(random, 2, 40) * 5
    const paid = amount(price, share)
    const saved = subtract(fraction(price), paid)
    if (!isWhole(paid) || !isWhole(saved)) return null
    const [pay, save] = [paid.numerator, saved.numerator]
    const { parts } = offerParts(offer)
    const part = price / parts
    let options: SaleOption[] | null
    let steps: LocalizedText[]
    if (kind === 'pay') {
        if (offer.type === 'percent') {
            options = moneyOptions(random, pay, [[price - offer.percent, 'euros-as-percent'], [save, 'discount-not-price']])
            steps = [
                say(`Deskontua: $\\frac{${offer.percent}}{100}\\cdot ${price}=${save}$ €.`, `Descuento: $\\frac{${offer.percent}}{100}\\cdot ${price}=${save}$ €.`, `الخصم: $\\frac{${offer.percent}}{100}\\cdot ${price}=${save}$ €.`, `Discount: $\\frac{${offer.percent}}{100}\\cdot ${price}=${save}$ euros.`),
                say(`Ordaintzen duzu: $${price}-${save}=${pay}$ €.`, `Pagas: $${price}-${save}=${pay}$ €.`, `تدفع: $${price}-${save}=${pay}$ €.`, `You pay: $${price}-${save}=${pay}$ euros.`)
            ]
        } else if (offer.type === 'fraction') {
            // With one part off, taking a single part is the right method, so only the discount is a typical mistake
            options = moneyOptions(random, pay, offer.off.numerator > 1 ? [[save, 'discount-not-price'], [price - part, 'one-part']] : [[save, 'discount-not-price']])
            steps = offer.off.numerator === 1
                ? [
                    say(`Deskontua, zati bat: $${price}\\div ${parts}=${part}$ €.`, `Descuento, una parte: $${price}\\div ${parts}=${part}$ €.`, `الخصم جزء واحد: $${price}\\div ${parts}=${part}$ €.`, `Discount for one part: $${price}\\div ${parts}=${part}$ euros.`),
                    say(`Ordaintzen duzu: $${price}-${save}=${pay}$ €.`, `Pagas: $${price}-${save}=${pay}$ €.`, `تدفع: $${price}-${save}=${pay}$ €.`, `You pay: $${price}-${save}=${pay}$ euros.`)
                ]
                : [
                    say(`Zati bat: $${price}\\div ${parts}=${part}$ €.`, `Una parte: $${price}\\div ${parts}=${part}$ €.`, `جزء واحد: $${price}\\div ${parts}=${part}$ €.`, `One part: $${price}\\div ${parts}=${part}$ euros.`),
                    say(`Deskontua: $${offer.off.numerator}\\cdot ${part}=${save}$ €; ordaintzen duzu $${price}-${save}=${pay}$ €.`, `Descuento: $${offer.off.numerator}\\cdot ${part}=${save}$ €; pagas $${price}-${save}=${pay}$ €.`, `الخصم: $${offer.off.numerator}\\cdot ${part}=${save}$ €؛ تدفع $${price}-${save}=${pay}$ €.`, `Discount: $${offer.off.numerator}\\cdot ${part}=${save}$ euros; you pay $${price}-${save}=${pay}$ euros.`)
                ]
        } else {
            options = moneyOptions(random, pay, [[save, 'pay-as-discount'], [share.numerator > 1 ? part : price - share.numerator, share.numerator > 1 ? 'one-part' : 'calculation']])
            steps = [
                say(`Zati bat: $${price}\\div ${parts}=${part}$ €.`, `Una parte: $${price}\\div ${parts}=${part}$ €.`, `جزء واحد: $${price}\\div ${parts}=${part}$ €.`, `One part: $${price}\\div ${parts}=${part}$ euros.`),
                say(`Ordaintzen duzu: $${share.numerator}\\cdot ${part}=${pay}$ €.`, `Pagas: $${share.numerator}\\cdot ${part}=${pay}$ €.`, `تدفع: $${share.numerator}\\cdot ${part}=${pay}$ €.`, `You pay: $${share.numerator}\\cdot ${part}=${pay}$ euros.`)
            ]
        }
    } else {
        const percentNumber = offer.type === 'percent' ? offer.percent : null
        const offParts = offer.type === 'fraction' ? offer.off.numerator : 0
        options = moneyOptions(random, save, [
            [pay, 'price-not-discount'],
            percentNumber !== null ? [percentNumber, 'euros-as-percent'] : [offParts > 1 ? part : price - part, offParts > 1 ? 'one-part' : 'price-not-discount']
        ])
        steps = offer.type === 'percent'
            ? [say(`Aurrezten duzu: $\\frac{${offer.percent}}{100}\\cdot ${price}=${save}$ €.`, `Ahorras: $\\frac{${offer.percent}}{100}\\cdot ${price}=${save}$ €.`, `توفّر: $\\frac{${offer.percent}}{100}\\cdot ${price}=${save}$ €.`, `You save: $\\frac{${offer.percent}}{100}\\cdot ${price}=${save}$ euros.`)]
            : offParts === 1
                ? [say(`Aurrezten duzu zati bat: $${price}\\div ${parts}=${save}$ €.`, `Ahorras una parte: $${price}\\div ${parts}=${save}$ €.`, `توفّر جزءًا واحدًا: $${price}\\div ${parts}=${save}$ €.`, `You save one part: $${price}\\div ${parts}=${save}$ euros.`)]
                : [
                    say(`Zati bat: $${price}\\div ${parts}=${part}$ €.`, `Una parte: $${price}\\div ${parts}=${part}$ €.`, `جزء واحد: $${price}\\div ${parts}=${part}$ €.`, `One part: $${price}\\div ${parts}=${part}$ euros.`),
                    say(`Aurrezten duzu: $${offParts}\\cdot ${part}=${save}$ €.`, `Ahorras: $${offParts}\\cdot ${part}=${save}$ €.`, `توفّر: $${offParts}\\cdot ${part}=${save}$ €.`, `You save: $${offParts}\\cdot ${part}=${save}$ euros.`)
                ]
    }
    if (!options) return null
    return {
        kind,
        product: pick(random, productIds),
        price,
        quantity: 1,
        offers: [offer],
        paid: null,
        question: kind === 'pay'
            ? say('Zenbat ordaintzen duzu?', '¿Cuánto pagas?', 'كم تدفع؟', 'How much do you pay?')
            : say('Zenbat aurrezten duzu?', '¿Cuánto te ahorras?', 'كم توفّر؟', 'How much do you save?'),
        options,
        steps,
        bars: [{ total: price, ...offerParts(offer), paidValue: pay, savedValue: save }]
    }
}

/* ---------- Level 2: which offer is cheaper ---------- */

const TAKE_OFFERS: Array<[number, number]> = [[3, 2], [4, 3], [5, 4], [2, 1]]

function randomOffer(random: Random, type: Offer['type']): Offer {
    switch (type) {
        case 'percent': return { type: 'percent', percent: pick(random, PERCENTS.filter((percent) => percent <= 50)) }
        case 'fraction': return { type: 'fraction', off: pick(random, OFF_FRACTIONS.filter((value) => value.numerator / value.denominator <= 0.5)) }
        case 'pay': return { type: 'pay', pay: pick(random, PAY_FRACTIONS) }
        case 'take': {
            const [take, pay] = pick(random, TAKE_OFFERS)
            return { type: 'take', take, pay }
        }
        case 'chain': return { type: 'chain', first: pick(random, [10, 20, 25, 50]), second: pick(random, [10, 20, 25]) }
    }
}

/** Final price of each offer; null unless all are whole euros, all different and at least 1 € apart */
function offerPrices(total: number, offers: Offer[]): number[] | null {
    const prices = offers.map((offer) => amount(total, payShare(offer)))
    if (!prices.every(isWhole)) return null
    const values = prices.map((value) => value.numerator)
    const sorted = [...values].sort((a, b) => a - b)
    if (sorted.some((value, index) => index > 0 && value - sorted[index - 1] < 1)) return null
    return values
}

function compareRound(random: Random, kind: 'compare' | 'chained-compare'): SaleRound | null {
    let offers: Offer[]
    if (kind === 'chained-compare') {
        const chain = randomOffer(random, 'chain') as Extract<Offer, { type: 'chain' }>
        const combined = 100 - (100 - chain.first) * (100 - chain.second) / 100
        // A single discount near the chained one, so either can win
        const percent = Math.round(combined) + pick(random, [-6, -4, -2, 2, 4, 6, chain.first + chain.second - Math.round(combined)])
        if (percent <= 0 || percent >= 100) return null
        offers = shuffle(random, [chain, { type: 'percent', percent }])
    } else {
        const count = random() < 0.5 ? 2 : 3
        const types = shuffle(random, ['percent', 'fraction', 'pay', 'take'] as const).slice(0, count)
        offers = types.map((type) => randomOffer(random, type))
    }
    const take = offers.find((offer) => offer.type === 'take')
    const quantity = take?.type === 'take' ? take.take : 1
    const unit = randomInt(random, 2, 24) * (quantity > 1 ? 1 : 5)
    const total = unit * quantity
    const prices = offerPrices(total, offers)
    if (!prices) return null
    const sorted = [...prices].sort((a, b) => a - b)
    // Close offers: the best two within a quarter of the price, so the choice needs working out
    if (sorted[1] - sorted[0] > total / 4) return null
    const best = prices.indexOf(sorted[0])
    const steps = offers.map((offer, index) => {
        const share = payShare(offer)
        const label = offerLabel(offer)
        const formula = `$\\frac{${share.numerator}}{${share.denominator}}\\cdot ${total}=${prices[index]}$`
        return say(`${label.eu}: ${formula} €`, `${label.es}: ${formula} €`, `${label.ar}: ${formula} €`, `${label.en}: ${formula} euros`)
    })
    if (kind === 'chained-compare') {
        steps.push(say(
            'Bigarren deskontua prezio merkatuari aplikatzen zaio: ehunekoak ez dira batzen.',
            'El segundo descuento se aplica sobre el precio ya rebajado: los porcentajes no se suman.',
            'الخصم الثاني يُطبَّق على السعر المخفَّض: النسب لا تُجمع.', 'The second discount is applied to the already reduced price: the percentages are not added together.'
        ))
    }
    return {
        kind,
        product: pick(random, productIds),
        price: unit,
        quantity,
        offers,
        paid: null,
        question: say('Zein eskaintza da merkeagoa?', '¿Qué oferta es más barata?', 'أي عرض أرخص؟', 'Which offer is cheaper?'),
        options: offers.map((offer, index) => ({ label: offerLabel(offer), correct: index === best, error: index === best ? null : 'worse-offer' })),
        steps,
        bars: offers.map((offer, index) => ({ total, ...offerParts(offer), paidValue: prices[index], savedValue: total - prices[index], offer }))
    }
}

/* ---------- Level 3: chained discounts and the price before the sale ---------- */

function chainedRound(random: Random): SaleRound | null {
    const offer = randomOffer(random, 'chain') as Extract<Offer, { type: 'chain' }>
    const price = randomInt(random, 2, 40) * 10
    const afterFirst = amount(price, fraction(100 - offer.first, 100))
    const final = amount(afterFirst.numerator, fraction(100 - offer.second, 100))
    const added = amount(price, fraction(100 - offer.first - offer.second, 100))
    if (![afterFirst, final, added].every(isWhole)) return null
    const [p1, pay] = [afterFirst.numerator, final.numerator]
    const options = moneyOptions(random, pay, [[added, 'added-percents'], [p1, 'only-first'], [price - pay, 'discount-not-price']])
    if (!options) return null
    const first = offerParts({ type: 'percent', percent: offer.first })
    const second = offerParts({ type: 'percent', percent: offer.second })
    return {
        kind: 'chained',
        product: pick(random, productIds),
        price,
        quantity: 1,
        offers: [offer],
        paid: null,
        question: say('Zenbat ordaintzen duzu azkenean?', '¿Cuánto pagas al final?', 'كم تدفع في النهاية؟', 'How much do you pay in the end?'),
        options,
        steps: [
            say(`Lehen deskontua: $${price}-\\frac{${offer.first}}{100}\\cdot ${price}=${p1}$ €.`, `Primer descuento: $${price}-\\frac{${offer.first}}{100}\\cdot ${price}=${p1}$ €.`, `الخصم الأول: $${price}-\\frac{${offer.first}}{100}\\cdot ${price}=${p1}$ €.`, `First discount: $${price}-\\frac{${offer.first}}{100}\\cdot ${price}=${p1}$ euros.`),
            say(`Bigarrena, ${p1} € horien gainean: $${p1}-\\frac{${offer.second}}{100}\\cdot ${p1}=${pay}$ €.`, `El segundo, sobre esos ${p1} €: $${p1}-\\frac{${offer.second}}{100}\\cdot ${p1}=${pay}$ €.`, `الثاني على تلك الـ${p1} €: $${p1}-\\frac{${offer.second}}{100}\\cdot ${p1}=${pay}$ €.`, `The second one, on that €${p1}: $${p1}-\\frac{${offer.second}}{100}\\cdot ${p1}=${pay}$ euros.`)
        ],
        bars: [
            { total: price, ...first, paidValue: p1, savedValue: price - p1 },
            { total: p1, ...second, paidValue: pay, savedValue: p1 - pay }
        ]
    }
}

const ORIGINAL_PERCENTS = [10, 20, 25, 30, 40, 50, 60, 75]

function originalRound(random: Random): SaleRound | null {
    const percent = pick(random, ORIGINAL_PERCENTS)
    const share = fraction(100 - percent, 100)
    const part = randomInt(random, 2, 20)
    const price = share.denominator * part
    const paid = share.numerator * part
    const addedToPaid = amount(paid, fraction(100 + percent, 100))
    // The typical mistake (adding the percentage to what was paid) must be a whole amount too
    if (!isWhole(addedToPaid)) return null
    const options = moneyOptions(random, price, [[addedToPaid, 'added-to-paid'], [paid + percent, 'euros-as-percent']])
    if (!options || price > 400) return null
    return {
        kind: 'original',
        product: pick(random, productIds),
        price,
        quantity: 1,
        offers: [{ type: 'percent', percent }],
        paid,
        question: say('Zenbat balio zuen merkealdien aurretik?', '¿Cuánto costaba antes de la rebaja?', 'كم كان سعره قبل التخفيض؟', 'How much did it cost before the sale?'),
        options,
        steps: [
            say(`Ordaindutakoa prezioaren % ${100 - percent} da, hau da, $\\frac{${share.numerator}}{${share.denominator}}$.`, `Lo pagado es el ${100 - percent} % del precio, es decir, $\\frac{${share.numerator}}{${share.denominator}}$.`, `المدفوع هو ${100 - percent}٪ من السعر، أي $\\frac{${share.numerator}}{${share.denominator}}$.`, `What you paid is ${100 - percent}% of the price, that is, $\\frac{${share.numerator}}{${share.denominator}}$.`),
            share.numerator === 1
                ? say(`Ordaindutakoa zati bat da; prezioa: $${share.denominator}\\cdot ${part}=${price}$ €.`, `Lo pagado es una parte; el precio: $${share.denominator}\\cdot ${part}=${price}$ €.`, `المدفوع جزء واحد؛ السعر: $${share.denominator}\\cdot ${part}=${price}$ €.`, `What you paid is one part; the price: $${share.denominator}\\cdot ${part}=${price}$ euros.`)
                : say(`Zati bat: $${paid}\\div ${share.numerator}=${part}$ €; prezioa: $${share.denominator}\\cdot ${part}=${price}$ €.`, `Una parte: $${paid}\\div ${share.numerator}=${part}$ €; el precio: $${share.denominator}\\cdot ${part}=${price}$ €.`, `جزء واحد: $${paid}\\div ${share.numerator}=${part}$ €؛ السعر: $${share.denominator}\\cdot ${part}=${price}$ €.`, `One part: $${paid}\\div ${share.numerator}=${part}$ euros; the price: $${share.denominator}\\cdot ${part}=${price}$ euros.`)
        ],
        bars: [{ total: price, parts: share.denominator, paid: share.numerator, paidValue: paid, savedValue: price - paid }]
    }
}

/* ---------- Levels ---------- */

export const salesLevels: Array<Array<SaleKind>> = [
    ['pay', 'save'],
    ['compare'],
    ['chained', 'chained-compare', 'original']
]

export function createSaleRound(random: Random, kind: SaleKind): SaleRound {
    for (;;) {
        const round = kind === 'pay' || kind === 'save' ? simpleRound(random)
            : kind === 'compare' || kind === 'chained-compare' ? compareRound(random, kind)
                : kind === 'chained' ? chainedRound(random) : originalRound(random)
        if (round && (kind === 'pay' || kind === 'save' ? round.kind === kind : true)) return round
    }
}

/** Six rounds that go through the kinds of the level in turn */
export function createSaleRounds(random: Random, levelIndex: number): SaleRound[] {
    const kinds = salesLevels[levelIndex]
    return Array.from({ length: SALES_ROUNDS }, (_, index) => createSaleRound(random, kinds[index % kinds.length]))
}

export const saleErrorTips: Record<SaleError, LocalizedText> = {
    'euros-as-percent': { eu: 'Ehunekoa ez da euroak: kalkulatu lehenik deskontua.', es: 'Un porcentaje no son euros: calcula primero el descuento.', en: 'A percentage is not an amount in euros: work out the discount first.', ar: 'النسبة المئوية ليست يوروهات: احسب الخصم أولًا.' },
    'discount-not-price': { eu: 'Hori deskontua da, ez ordaintzen duzuna: kendu prezioari.', es: 'Eso es el descuento, no lo que pagas: réstalo del precio.', en: 'That is the discount, not what you pay: subtract it from the price.', ar: 'هذا هو الخصم لا ما تدفعه: اطرحه من السعر.' },
    'price-not-discount': { eu: 'Hori ordaintzen duzuna da; aurrezten duzuna deskontua da.', es: 'Eso es lo que pagas; lo que te ahorras es el descuento.', en: 'That is what you pay; what you save is the discount.', ar: 'هذا ما تدفعه؛ أما ما توفّره فهو الخصم.' },
    'pay-as-discount': { eu: 'Prezioaren zatiki bat ordaintzen baduzu, zatiki hori ordaintzen duzu, ez deskontua.', es: 'Si pagas una fracción del precio, esa fracción es lo que pagas, no el descuento.', en: 'If you pay a fraction of the price, that fraction is what you pay, not the discount.', ar: 'إذا دفعت كسرًا من السعر فذلك الكسر هو ما تدفعه لا الخصم.' },
    'one-part': { eu: 'Zati bakarra hartu duzu: kalkulatu zati bat eta biderkatu zenbakitzaileaz.', es: 'Has tomado una sola parte: calcula una parte y multiplícala por el numerador.', en: 'You have taken just one part: work out one part and multiply it by the numerator.', ar: 'أخذت جزءًا واحدًا فقط: احسب جزءًا ثم اضربه في البسط.' },
    'added-percents': { eu: 'Bigarren deskontua prezio merkatuari aplikatzen zaio: ehunekoak ez dira batzen.', es: 'El segundo descuento se aplica sobre el precio ya rebajado: los porcentajes no se suman.', en: 'The second discount is applied to the already reduced price: the percentages are not added together.', ar: 'الخصم الثاني يُطبَّق على السعر المخفَّض: النسب لا تُجمع.' },
    'only-first': { eu: 'Bigarren deskontua aplikatzea falta da.', es: 'Falta aplicar el segundo descuento.', en: 'You still need to apply the second discount.', ar: 'لم تطبّق الخصم الثاني.' },
    'added-to-paid': { eu: 'Deskontua jatorrizko prezioaren gainean kalkulatu zen, ez ordaindutakoaren gainean: ordaindutakoa prezioaren zati bat da.', es: 'El descuento se calculó sobre el precio original, no sobre lo pagado: lo pagado es una parte del precio.', en: 'The discount was worked out on the original price, not on what you paid: what you paid is a part of the price.', ar: 'حُسب الخصم على السعر الأصلي لا على المدفوع: المدفوع جزء من السعر.' },
    calculation: { eu: 'Berrikusi kalkuluak.', es: 'Repasa las cuentas.', en: 'Check your working.', ar: 'راجع الحسابات.' },
    'worse-offer': { eu: 'Eskaintza horrekin gehiago ordaintzen duzu: kalkulatu bakoitzarekin zenbat ordaintzen duzun.', es: 'Con esa oferta pagas más: calcula lo que pagas con cada una.', en: 'With that offer you pay more: work out what you pay with each one.', ar: 'بهذا العرض تدفع أكثر: احسب ما تدفعه مع كل عرض.' }
}

/** Right answers out of six */
export function salesStars(right: number): Stars {
    if (right >= 6) return 3
    if (right >= 4) return 2
    if (right >= 3) return 1
    return 0
}
