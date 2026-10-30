import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { Stars } from '../../../features/unit-v2/games/records.ts'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types.ts'
import { latexNumber, moneyText } from './numbers.ts'

/* ==========================================================================
   Dendako kutxa (La caja de la tienda, 4. DBH aplikatuak): customers queue
   at the till with a price tag (a discount, VAT, or both) and the player
   types on the till what to charge, or the price before the changes. Each
   customer waits a set time: the sooner the answer, the more points. Every
   amount is exact to the cent, and a wrong first answer that is a typical
   slip (only the discount, the % taken from the final price...) gets a
   word of advice.
   ========================================================================== */

export type TillKind = 'discount' | 'vat' | 'discount-back' | 'vat-back' | 'two-discounts' | 'discount-vat' | 'two-discounts-back' | 'discount-vat-back'

export const tillLevels: TillKind[][] = [
    ['discount', 'vat'],
    ['discount-back', 'vat-back'],
    ['two-discounts', 'discount-vat', 'two-discounts-back', 'discount-vat-back']
]

export const TILL_CUSTOMERS = 8
export const TILL_TRIES = 2
/** Seconds each customer waits, per level */
export const TILL_PATIENCE = [45, 60, 75]

export type TillProduct = 'backpack' | 'trainers' | 'book' | 'headphones' | 'ball' | 'jacket' | 'game' | 'cake' | 'bike'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })

/** Each product with its VAT (books 4 %, cakes 10 %) and a range of prices in whole euros */
const PRODUCTS: Record<TillProduct, { name: LocalizedText; vat: number; prices: [number, number] }> = {
    backpack: { name: say('Motxila', 'Mochila', 'حقيبة ظهر', 'Backpack'), vat: 21, prices: [20, 60] },
    trainers: { name: say('Zapatilak', 'Zapatillas', 'حذاء رياضي', 'Trainers'), vat: 21, prices: [40, 120] },
    book: { name: say('Liburua', 'Libro', 'كتاب', 'Book'), vat: 4, prices: [10, 40] },
    headphones: { name: say('Entzungailuak', 'Auriculares', 'سماعات', 'Headphones'), vat: 21, prices: [20, 150] },
    ball: { name: say('Baloia', 'Balón', 'كرة', 'Ball'), vat: 21, prices: [10, 40] },
    jacket: { name: say('Jaka', 'Chaqueta', 'سترة', 'Jacket'), vat: 21, prices: [40, 160] },
    game: { name: say('Mahai-jokoa', 'Juego de mesa', 'لعبة لوحية', 'Board game'), vat: 21, prices: [20, 60] },
    cake: { name: say('Tarta', 'Tarta', 'كعكة', 'Cake'), vat: 10, prices: [10, 40] },
    bike: { name: say('Bizikleta', 'Bicicleta', 'دراجة', 'Bike'), vat: 21, prices: [150, 600] }
}

const PRODUCT_IDS = Object.keys(PRODUCTS) as TillProduct[]
const DISCOUNTS = [10, 15, 20, 25, 30, 40, 50] as const
const EXTRA_DISCOUNTS = [5, 10, 15, 20] as const

export interface TillRound {
    kind: TillKind
    product: TillProduct
    /** What the tag shows, in cents: the price before the changes, or the price after them on the way back */
    shown: number
    /** The changes in order, in %: −20 is a discount, +21 the VAT */
    changes: number[]
    /** What to type, in cents */
    answer: number
}

export const isBack = (kind: TillKind) => kind.endsWith('-back')

export const productName = (round: TillRound) => PRODUCTS[round.product].name

/** The price after each change in turn, as long as each step is a whole number of cents */
function applyChanges(cents: number, changes: number[]): number | null {
    let value = cents
    for (const change of changes) {
        const scaled = value * (100 + change)
        if (scaled % 100 !== 0) return null
        value = scaled / 100
    }
    return value
}

function changesFor(random: Random, kind: TillKind, vat: number): number[] {
    const discount = -pick(random, DISCOUNTS)
    if (kind === 'discount' || kind === 'discount-back') return [discount]
    if (kind === 'vat' || kind === 'vat-back') return [vat]
    if (kind === 'two-discounts' || kind === 'two-discounts-back') return [discount, -pick(random, EXTRA_DISCOUNTS)]
    return [discount, vat]
}

function draft(random: Random, level: number, kind: TillKind, product: TillProduct): TillRound | null {
    const { vat, prices } = PRODUCTS[product]
    const price = randomInt(random, prices[0], prices[1])
    const changes = changesFor(random, kind, vat)
    // On the first level prices end in 0 or 5, and what is charged has at most one decimal
    if (level === 0 && price % 5 !== 0) return null
    const after = applyChanges(price * 100, changes)
    if (after === null || (level === 0 && after % 10 !== 0)) return null
    // After the first of two changes the price is still in whole euros
    if (changes.length === 2 && (price * (100 + changes[0])) % 100 !== 0) return null
    const back = isBack(kind)
    return { kind, product, shown: back ? after : price * 100, changes, answer: back ? price * 100 : after }
}

/** Eight customers, each with a different product, the kinds of the level in equal numbers */
export function createTillRounds(random: Random, level: number): TillRound[] {
    const kinds = tillLevels[level]
    const plan = shuffle(random, Array.from({ length: TILL_CUSTOMERS }, (_, index) => kinds[index % kinds.length]))
    const products = shuffle(random, PRODUCT_IDS)
    return plan.map((kind, index) => {
        for (let attempt = 0; attempt < 20000; attempt += 1) {
            const round = draft(random, level, kind, products[index])
            if (round) return round
        }
        throw new Error(`No till round for level ${level}`)
    })
}

/** Cents of what was typed («68», «48,4», «48.40»), or null */
export function readCents(typed: string): number | null {
    const match = typed.replace(',', '.').match(/^(\d+)(?:\.(\d{0,2}))?$/)
    if (!match) return null
    return Number(match[1]) * 100 + Number((match[2] ?? '').padEnd(2, '0'))
}

/** Right at the first try: 50 points and up to 50 more for the patience left; at the second try, half */
export function tillPoints(tries: number, left: number): number {
    if (tries < 1 || tries > TILL_TRIES) return 0
    const full = 50 + Math.round(50 * Math.min(1, Math.max(0, left)))
    return tries === 1 ? full : Math.round(full / 2)
}

export function tillStars(total: number): Stars {
    if (total >= 600) return 3
    if (total >= 450) return 2
    if (total >= 300) return 1
    return 0
}

/* ---------- Typical slips ---------- */

export type TillSlip = 'part' | 'wrong-way' | 'percent-of-final' | 'multiplied' | 'added-percents'

/** The typical slip behind a wrong amount, if there is one */
export function tillSlip(round: TillRound, cents: number): TillSlip | null {
    const near = (value: number) => Math.abs(cents - value) <= 1
    // With 50 % off, the discount alone is also what to charge
    if (near(round.answer)) return null
    const { shown, changes } = round
    const sum = changes.reduce((total, change) => total + change, 0)
    if (isBack(round.kind)) {
        if (near(changes.reduce((value, change) => (value * (100 + change)) / 100, shown))) return 'multiplied'
        if (changes.length === 1 && near((shown * (100 - changes[0])) / 100)) return 'percent-of-final'
        if (changes.length === 2 && near((shown * 100) / (100 + sum))) return 'added-percents'
        return null
    }
    if (changes.length === 2) return near((shown * (100 + sum)) / 100) ? 'added-percents' : null
    if (near((shown * Math.abs(changes[0])) / 100)) return 'part'
    if (near((shown * (100 - changes[0])) / 100)) return 'wrong-way'
    return null
}

export function tillSlipText(round: TillRound, slip: TillSlip): LocalizedText {
    const vat = round.changes[0] > 0
    switch (slip) {
        case 'part':
            return vat
                ? say('Hori BEZa bakarrik da: gehitu prezioari.', 'Eso es solo el IVA: súmalo al precio.', 'هذه هي الضريبة فقط: أضفها إلى السعر.', 'That is just the VAT: add it to the price.')
                : say('Hori deskontua bakarrik da: kendu prezioari.', 'Eso es solo el descuento: réstalo del precio.', 'هذا هو الخصم فقط: اطرحه من السعر.', 'That is just the discount: subtract it from the price.')
        case 'wrong-way':
            return vat
                ? say('BEZa kendu duzu: gehitu egin behar da.', 'Has restado el IVA: hay que sumarlo.', 'طرحت الضريبة: يجب أن تضيفها.', 'You subtracted the VAT: you need to add it.')
                : say('Deskontua gehitu duzu: kendu egin behar da.', 'Has sumado el descuento: hay que restarlo.', 'أضفت الخصم: يجب أن تطرحه.', 'You added the discount: you need to subtract it.')
        case 'percent-of-final':
            return say('Ehunekoa lehengo prezioarena da, ez honena: zatitu indizeaz.', 'El % es del precio de antes, no de este: divide entre el índice.', 'النسبة من السعر السابق لا من هذا: اقسم على المؤشر.', 'The percentage is of the price before, not of this one: divide by the multiplier.')
        case 'multiplied':
            return say('Atzera egiteko ez da indizeaz biderkatzen: zatitu egiten da.', 'Para volver atrás no se multiplica por el índice: se divide.', 'للرجوع لا نضرب في المؤشر بل نقسم عليه.', 'To go back, you don\'t multiply by the multiplier: you divide.')
        case 'added-percents':
            return say('Ehunekoak ez dira batzen: aplikatu bata bestearen atzetik.', 'Los porcentajes no se suman: aplica uno detrás de otro.', 'النسب لا تُجمع: طبّقها واحدة بعد الأخرى.', 'Percentages are not added together: apply one after the other.')
    }
}

/* ---------- The tag, the question and the working ---------- */

/** Euros to the cent for a sentence, never split from the €; in Arabic kept left to right, the € on the right */
export function euroText(cents: number, language: UnitLanguage): string {
    const text = `${moneyText(cents / 100, language)}\u00a0€`
    return language === 'ar' ? `\u2066${text}\u2069` : text
}

/** Next to the price on the tag: what that price is */
export function tillTagLabel(round: TillRound): LocalizedText {
    switch (round.kind) {
        case 'discount':
        case 'two-discounts':
            return say('Prezioa', 'Precio', 'السعر', 'Price')
        case 'vat':
        case 'discount-vat':
            return say('BEZik gabe', 'Sin IVA', 'دون ضريبة', 'Without VAT')
        case 'discount-back':
            return say('Merkatuta', 'Rebajado', 'بعد التخفيض', 'Discounted')
        case 'vat-back':
            return say('BEZa barne', 'IVA incluido', 'شامل الضريبة', 'VAT included')
        case 'two-discounts-back':
        case 'discount-vat-back':
            return say('Ordaindu du', 'Ha pagado', 'دفع', 'You paid')
    }
}

/** A sticker for each change: «Descuento: 15 %», «Otro descuento: 10 %», «IVA: 21 %» */
export function tillStickers(round: TillRound): LocalizedText[] {
    return round.changes.map((change, index) => {
        if (change > 0) return say(`BEZa: % ${change}`, `IVA: ${change} %`, `الضريبة ${change}٪`, `VAT: ${change}%`)
        return index > 0
            ? say(`Beste deskontu bat: % ${-change}`, `Otro descuento: ${-change} %`, `خصم إضافي ${-change}٪`, `Another discount: ${-change}%`)
            : say(`Deskontua: % ${-change}`, `Descuento: ${-change} %`, `خصم ${-change}٪`, `Discount: ${-change}%`)
    })
}

/** What the customer asks */
export function tillQuestion(round: TillRound): LocalizedText {
    switch (round.kind) {
        case 'discount-back':
            return say('Zenbat balio zuen merkatu aurretik?', '¿Cuánto costaba antes de la rebaja?', 'كم كان سعره قبل التخفيض؟', 'How much did it cost before the discount?')
        case 'vat-back':
            return say('Fakturarako: zenbat da BEZik gabe?', 'Para la factura: ¿cuánto es sin IVA?', 'للفاتورة: كم السعر دون ضريبة؟', 'For the invoice: how much is it without VAT?')
        case 'two-discounts-back':
            return say('Zenbat balio zuen bi deskontuen aurretik?', '¿Cuánto costaba antes de los dos descuentos?', 'كم كان سعره قبل التخفيضين؟', 'How much did it cost before the two discounts?')
        case 'discount-vat-back':
            return say('Zein zen prezioa, deskonturik eta BEZik gabe?', '¿Cuál era el precio sin descuento y sin IVA?', 'كم كان السعر دون خصم ودون ضريبة؟', 'What was the price without discount and without VAT?')
        default:
            return say('Zenbat ordaindu behar dut?', '¿Cuánto tengo que pagar?', 'كم عليّ أن أدفع؟', 'How much do I have to pay?')
    }
}

/** An amount in LaTeX: 68, 48{,}40 */
const moneyLatex = (cents: number) => (cents % 100 === 0 ? String(cents / 100) : (cents / 100).toFixed(2).replace('.', '{,}'))

/** The working, a label above each line: the price times the indices, or divided by them */
export function tillSteps(round: TillRound): { label: LocalizedText; latex: string }[] {
    const indices = round.changes.map((change) => latexNumber((100 + change) / 100))
    const shown = moneyLatex(round.shown)
    const answer = moneyLatex(round.answer)
    if (!isBack(round.kind)) {
        const label = indices.length === 1
            ? say('Prezioa bider indizea', 'Precio por el índice', 'السعر في المؤشر', 'Price times the multiplier')
            : say('Prezioa bider bi indizeak', 'Precio por los dos índices', 'السعر في المؤشرين', 'Price times both multipliers')
        return [{ label, latex: `${shown}\\cdot ${indices.join('\\cdot ')}=${answer}` }]
    }
    if (indices.length === 1) return [{ label: say('Prezioa zati indizea', 'Precio entre el índice', 'السعر مقسومًا على المؤشر', 'Price divided by the multiplier'), latex: `${shown}\\mathbin{:}${indices[0]}=${answer}` }]
    const total = latexNumber(round.changes.reduce((value, change) => (value * (100 + change)) / 100, 1))
    return [
        { label: say('Indize osoa', 'El índice total', 'المؤشر الكلي', 'The total multiplier'), latex: `${indices.join('\\cdot ')}=${total}` },
        { label: say('Prezioa zati indize osoa', 'Precio entre el índice total', 'السعر مقسومًا على المؤشر الكلي', 'Price divided by the total multiplier'), latex: `${shown}\\mathbin{:}${total}=${answer}` }
    ]
}

/** The answer in words, after a miss or when the customer leaves */
export function tillAnswerText(round: TillRound): LocalizedText {
    const amount = (language: UnitLanguage) => euroText(round.answer, language)
    return isBack(round.kind)
        ? say(`Erantzuna: ${amount('eu')}.`, `La respuesta era ${amount('es')}.`, `الجواب الصحيح: ${amount('ar')}.`, `The answer was ${amount('en')}.`)
        : say(`Kobratu behar zena: ${amount('eu')}.`, `Había que cobrar ${amount('es')}.`, `المبلغ الصحيح: ${amount('ar')}.`, `You had to charge ${amount('en')}.`)
}
