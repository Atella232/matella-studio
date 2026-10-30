import { checkAnswer, equals, fraction, multiply, subtract, toExactDecimal, toNumber, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { pick, shuffle } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker, OperationAnswer } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { readMoneyAnswer } from '../answers.ts'
import { latexNumber } from '../games/numbers.ts'
import { roundedAnswer } from './percentBar.ts'

/* ==========================================================================
   The shopping receipt: a price without VAT, a discount, the VAT and a
   coupon of fixed euros, in an order the learner chooses. The learner
   writes the total; then every line shows its amount. The discount and the
   VAT multiply by their index, so their order does not matter; the coupon
   takes off fixed euros, and what it saves is multiplied by the indices
   that come after it (before the VAT it also saves its VAT). Tests in
   tests/proportzionaltasuna-dbh4ap-receipt.test.ts.
   ========================================================================== */

export type ReceiptStep = 'discount' | 'vat' | 'coupon'

export interface ReceiptState extends OperationAnswer {
    /** Price without VAT, in whole euros */
    price: number
    /** Discount in % (0: none) */
    discount: number
    /** VAT in % */
    vat: number
    /** Coupon in whole euros (0: none) */
    coupon: number
    /** The order of the three lines on the receipt */
    order: ReceiptStep[]
}

export const RECEIPT_PRICE_MAX = 9999
export const RECEIPT_DISCOUNT_MAX = 90
export const RECEIPT_COUPON_MAX = 500
export const RECEIPT_VATS = [4, 10, 21] as const
export const RECEIPT_STEPS: ReceiptStep[] = ['discount', 'vat', 'coupon']

const freshAnswer = { answer: '', checked: false, revealed: false }

/** Not one of the challenges, so that none is solved on arrival */
export const initialReceiptState: ReceiptState = { price: 60, discount: 25, vat: 21, coupon: 0, order: ['discount', 'vat', 'coupon'], ...freshAnswer }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

/** A new case clears the written answer */
export function setReceipt(state: ReceiptState, patch: Partial<Pick<ReceiptState, 'price' | 'discount' | 'vat' | 'coupon' | 'order'>>): ReceiptState {
    const vat = patch.vat ?? state.vat
    const next = {
        price: clamp(patch.price ?? state.price, 1, RECEIPT_PRICE_MAX),
        discount: clamp(patch.discount ?? state.discount, 0, RECEIPT_DISCOUNT_MAX),
        vat: (RECEIPT_VATS as readonly number[]).includes(vat) ? vat : state.vat,
        coupon: clamp(patch.coupon ?? state.coupon, 0, RECEIPT_COUPON_MAX),
        order: patch.order ?? state.order
    }
    const same = next.price === state.price && next.discount === state.discount && next.vat === state.vat && next.coupon === state.coupon && next.order.join() === state.order.join()
    return same ? state : { ...next, ...freshAnswer }
}

/** Moves a line one place up (−1) or down (1) */
export function moveReceiptStep(state: ReceiptState, step: ReceiptStep, direction: -1 | 1): ReceiptState {
    const from = state.order.indexOf(step)
    const to = from + direction
    if (to < 0 || to >= state.order.length) return state
    const order = [...state.order]
    ;[order[from], order[to]] = [order[to], order[from]]
    return setReceipt(state, { order })
}

/** A line counts when it changes something: no 0 % discount and no 0 € coupon */
export const stepUsed = (state: ReceiptState, step: ReceiptStep) => (step === 'discount' ? state.discount > 0 : step === 'coupon' ? state.coupon > 0 : true)

/** The index of a line: 0,8 for a 20 % discount, 1,21 for the VAT; none for the coupon */
export const stepIndex = (state: ReceiptState, step: ReceiptStep): FractionValue | null =>
    step === 'discount' ? fraction(100 - state.discount, 100) : step === 'vat' ? fraction(100 + state.vat, 100) : null

export interface ReceiptLine {
    step: ReceiptStep
    /** Euros the line adds (or takes off, negative) */
    change: FractionValue
    /** What is left to pay after the line */
    after: FractionValue
}

/** The lines that change something, in order, with exact amounts */
export function receiptLines(state: ReceiptState, order: ReceiptStep[] = state.order): ReceiptLine[] {
    let amount = fraction(state.price)
    return order.filter((step) => stepUsed(state, step)).map((step) => {
        const index = stepIndex(state, step)
        const after = index ? multiply(amount, index) : subtract(amount, fraction(state.coupon))
        const line = { step, change: subtract(after, amount), after }
        amount = after
        return line
    })
}

export const receiptTotal = (state: ReceiptState, order: ReceiptStep[] = state.order): FractionValue => receiptLines(state, order).at(-1)?.after ?? fraction(state.price)

/** The coupon never takes more than what is left to pay at its line */
export const receiptValid = (state: ReceiptState, order: ReceiptStep[] = state.order) => receiptLines(state, order).every((line) => line.after.numerator >= 0)

/** The six orders of the three lines */
export const RECEIPT_ORDERS: ReceiptStep[][] = RECEIPT_STEPS.flatMap((first) => RECEIPT_STEPS.filter((step) => step !== first).flatMap((second) => [[first, second, RECEIPT_STEPS.find((step) => step !== first && step !== second)!]]))

/** The lowest total of any order that the coupon allows */
export function cheapestTotal(state: ReceiptState): FractionValue {
    return RECEIPT_ORDERS.filter((order) => receiptValid(state, order)).map((order) => receiptTotal(state, order)).reduce((low, total) => (toNumber(total) < toNumber(low) ? total : low))
}

/** The total with the coupon first, between the other two lines, or last (the discount and the VAT keep their order) */
export function couponTotals(state: ReceiptState): Array<FractionValue | null> {
    const others = state.order.filter((step) => step !== 'coupon')
    return [0, 1, 2].map((place) => {
        const order = [...others.slice(0, place), 'coupon' as const, ...others.slice(place)]
        return receiptValid(state, order) ? receiptTotal(state, order) : null
    })
}

export const expectedReceiptAnswer = (state: ReceiptState) => roundedAnswer(receiptTotal(state)).value

/** The learner has written the right total (a revealed result does not count) */
export const receiptAnswered = (state: ReceiptState) =>
    receiptValid(state) && checkAnswer(readMoneyAnswer(state.answer), expectedReceiptAnswer(state)) === 'correct'

/** The working in one line, without the result: (80 · 0,8 − 5) · 1,21 */
export function receiptExpression(state: ReceiptState, order: ReceiptStep[] = state.order): string {
    let expression = String(state.price)
    // A subtraction needs brackets before it is multiplied
    let open = false
    for (const step of order.filter((item) => stepUsed(state, item))) {
        const index = stepIndex(state, step)
        if (index) {
            expression = `${open ? `(${expression})` : expression}\\cdot ${latexNumber(toNumber(index))}`
            open = false
        } else {
            expression = `${expression}-${state.coupon}`
            open = true
        }
    }
    return expression
}

/** The working with its result in euros and cents: (80 · 0,8 − 5) · 1,21 = 71,39 (48,40, not 48,4), with ≈ when the total has more than two decimals */
export function receiptLatex(state: ReceiptState): string {
    const { value, rounded } = roundedAnswer(receiptTotal(state))
    const euros = toNumber(value)
    return `${receiptExpression(state)}${rounded ? '\\approx ' : '='}${Number.isInteger(euros) ? euros : euros.toFixed(2).replace('.', '{,}')}`
}

/* ---------- Challenges ---------- */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })

const has = (state: ReceiptState, values: Pick<ReceiptState, 'price' | 'discount' | 'vat' | 'coupon'>) =>
    state.price === values.price && state.discount === values.discount && state.vat === values.vat && state.coupon === values.coupon
const before = (state: ReceiptState, first: ReceiptStep, second: ReceiptStep) => state.order.indexOf(first) < state.order.indexOf(second)

export const receiptChallenges: LabChallenge<ReceiptState>[] = [
    {
        id: 43801,
        prompt: say(
            'Motxila batek 80 € balio du BEZik gabe. Deskontua: % 20, eta gero BEZa gehitzen da (% 21). Prestatu tiketa eta idatzi guztira.',
            'Una mochila cuesta 80 € sin IVA. Tiene un 20 % de descuento y después se suma el 21 % de IVA. Prepara el tique y escribe el total.',
            'حقيبة ثمنها 80 € دون ضريبة. عليها خصم 20٪ ثم تُضاف ضريبة 21٪. جهّز الإيصال واكتب المجموع.', 'A backpack costs €80 without VAT. It has a 20% discount, and then 21% VAT is added. Set up the receipt and write the total.'
        ),
        hint: say('$80\\cdot 0{,}8\\cdot 1{,}21$', '$80\\cdot 0{,}8\\cdot 1{,}21$', '$80\\cdot 0{,}8\\cdot 1{,}21$', '$80\\cdot 0{,}8\\cdot 1{,}21$'),
        isSolved: (state) => has(state, { price: 80, discount: 20, vat: 21, coupon: 0 }) && before(state, 'discount', 'vat') && receiptAnswered(state)
    },
    {
        id: 43802,
        prompt: say(
            'Orain jarri lehenik BEZa eta gero deskontua. Aldatzen da guztira? Idatzi.',
            'Ahora pon primero el IVA y después el descuento. ¿Cambia el total? Escríbelo.',
            'ضع الآن الضريبة أولًا ثم الخصم. هل يتغيّر المجموع؟ اكتبه.', 'Now put the VAT first and then the discount. Does the total change? Write it down.'
        ),
        hint: say('$80\\cdot 1{,}21\\cdot 0{,}8$: biderkagaien ordenak ez du biderkadura aldatzen.', '$80\\cdot 1{,}21\\cdot 0{,}8$: el orden de los factores no cambia el producto.', '$80\\cdot 1{,}21\\cdot 0{,}8$: ترتيب العوامل لا يغيّر الناتج.', '$80\\cdot 1{,}21\\cdot 0{,}8$: the order of the factors does not change the product.'),
        isSolved: (state) => has(state, { price: 80, discount: 20, vat: 21, coupon: 0 }) && before(state, 'vat', 'discount') && receiptAnswered(state)
    },
    {
        id: 43803,
        prompt: say(
            'Gehitu kupoi bat: 5 €. Zein ordenatan ordaintzen duzu gutxien? Ordenatu tiketa horrela eta idatzi guztira.',
            'Añade un cupón de 5 €. ¿En qué orden pagas menos? Ordena el tique así y escribe ese total.',
            'أضف قسيمة بقيمة 5 €. بأي ترتيب تدفع أقل؟ رتّب الإيصال هكذا واكتب المجموع.', 'Add a €5 coupon. In which order do you pay less? Order the receipt that way and write that total.'
        ),
        hint: say('BEZaren aurretik, kupoiak bere BEZa ere aurrezten dizu: $5\\cdot 1{,}21=6{,}05$ €.', 'Antes del IVA, el cupón también te ahorra su IVA: $5\\cdot 1{,}21=6{,}05$ €.', 'قبل الضريبة توفّر القسيمة ضريبتها أيضًا: $5\\cdot 1{,}21=6{,}05$ €.', 'Before the VAT, the coupon also saves you its VAT: $5\\cdot 1{,}21=6{,}05$ euros.'),
        isSolved: (state) => has(state, { price: 80, discount: 20, vat: 21, coupon: 5 }) && equals(receiptTotal(state), cheapestTotal(state)) && receiptAnswered(state)
    },
    {
        id: 43804,
        prompt: say(
            'Liburu batek 30 € balio du BEZik gabe: % 10 deskontua eta % 4 BEZa, eta amaieran kupoi bat (3 €). Zenbat ordaintzen duzu?',
            'Un libro de 30 € sin IVA lleva un 10 % de descuento y el 4 % de IVA, y al final pagas con un cupón de 3 €. ¿Cuánto pagas?',
            'كتاب ثمنه 30 € دون ضريبة، عليه خصم 10٪ وضريبة 4٪، وتدفع في النهاية بقسيمة 3 €. كم تدفع؟', 'A book costs €30 without VAT. It has a 10% discount and 4% VAT, and at the end you pay with a €3 coupon. How much do you pay?'
        ),
        hint: say('$30\\cdot 0{,}9\\cdot 1{,}04-3$', '$30\\cdot 0{,}9\\cdot 1{,}04-3$', '$30\\cdot 0{,}9\\cdot 1{,}04-3$', '$30\\cdot 0{,}9\\cdot 1{,}04-3$'),
        isSolved: (state) => has(state, { price: 30, discount: 10, vat: 4, coupon: 3 }) && state.order[2] === 'coupon' && receiptAnswered(state)
    }
]

/* ---------- Endless challenges ---------- */

/** An endless challenge is never already solved by the tool's first state */
function freshFrom<State>(start: State, maker: LabChallengeMaker<State>): LabChallengeMaker<State> {
    return (random) => {
        for (;;) {
            const challenge = maker(random)
            if (!challenge.isSolved(start)) return challenge
        }
    }
}

const STEP_NAMES: Record<ReceiptStep, LocalizedText> = {
    discount: say('deskontua', 'descuento', 'الخصم', 'discount'),
    vat: say('BEZa', 'IVA', 'الضريبة', 'VAT'),
    coupon: say('kupoia', 'cupón', 'القسيمة', 'coupon')
}

/** «descuento, IVA y cupón» */
function orderText(state: ReceiptState): LocalizedText {
    const names = state.order.filter((step) => stepUsed(state, step)).map((step) => STEP_NAMES[step])
    const list = (language: 'eu' | 'es' | 'en' | 'ar', and: string) => {
        const words = names.map((name) => name[language])
        return words.length === 1 ? words[0] : `${words.slice(0, -1).join(', ')} ${and} ${words[words.length - 1]}`
    }
    return { eu: list('eu', 'eta'), es: list('es', 'y'), en: list('en', 'and'), ar: names.map((name) => name.ar).join(' ثم ') }
}

/** What the receipt has: «80 € sin IVA, 20 % de descuento, IVA del 21 % y un cupón de 5 €» */
function receiptData(state: ReceiptState): LocalizedText {
    const { price, discount, vat, coupon } = state
    return say(
        `${price} € BEZik gabe.${discount ? ` Deskontua: % ${discount}.` : ''} BEZa: % ${vat}.${coupon ? ` Kupoia: ${coupon} €.` : ''}`,
        `${price} € sin IVA${discount ? `, un ${discount} % de descuento` : ''}, IVA del ${vat} %${coupon ? ` y un cupón de ${coupon} €` : ''}.`,
        `${price} € دون ضريبة.${discount ? ` الخصم ${discount}٪.` : ''} الضريبة ${vat}٪.${coupon ? ` القسيمة ${coupon} €.` : ''}`, `€${price} without VAT${discount ? `, a ${discount}% discount` : ''}, VAT at ${vat}%${coupon ? ` and a €${coupon} coupon` : ''}.`
    )
}

const PRICES = [20, 25, 30, 40, 45, 50, 60, 75, 80, 90, 100, 120, 150, 200, 240, 300] as const
const DISCOUNTS = [0, 10, 15, 20, 25, 30, 40, 50] as const
const COUPONS = [0, 0, 2, 3, 5, 10] as const

/** A receipt in a given order, or the cheapest order, with a total exact to the cent */
export const receiptExtra: LabChallengeMaker<ReceiptState> = freshFrom(initialReceiptState, (random) => {
    for (;;) {
        const values = { price: pick(random, PRICES), discount: pick(random, DISCOUNTS), vat: pick(random, RECEIPT_VATS), coupon: pick(random, COUPONS) }
        // Only the VAT would be too plain
        if (values.discount === 0 && values.coupon === 0) continue
        const cheapest = values.coupon > 0 && random() < 0.35
        const base: ReceiptState = { ...values, order: shuffle(random, RECEIPT_STEPS), ...freshAnswer }
        const order = cheapest ? RECEIPT_ORDERS.find((item) => receiptValid(base, item) && equals(receiptTotal(base, item), cheapestTotal(base)))! : base.order
        const solution: ReceiptState = { ...base, order }
        if (!receiptValid(solution)) continue
        const total = receiptTotal(solution)
        if (roundedAnswer(total).rounded) continue
        const answer = toExactDecimal(total, ',')!
        const data = receiptData(solution)
        const ready = { ...solution, answer, checked: true }
        if (cheapest) {
            return {
                prompt: say(
                    `Tiketa: ${data.eu} Zein ordenatan ordaintzen duzu gutxien? Ordenatu horrela eta idatzi guztira.`,
                    `Tique: ${data.es} ¿En qué orden pagas menos? Ordénalo así y escribe ese total.`,
                    `الإيصال: ${data.ar} بأي ترتيب تدفع أقل؟ رتّبه هكذا واكتب المجموع.`, `Receipt: ${data.en} In which order do you pay less? Order it that way and write that total.`
                ),
                hint: say(
                    'Kupoiak aurrezten duena atzetik datozen indizeez biderkatzen da: BEZaren aurretik eta deskontuaren ondoren.',
                    'Lo que ahorra el cupón se multiplica por los índices que vienen detrás: antes del IVA y después del descuento.',
                    'ما توفّره القسيمة يُضرب في المؤشرات التي تأتي بعدها: قبل الضريبة وبعد الخصم.', 'What the coupon saves is multiplied by the multipliers that come after it: before the VAT and after the discount.'
                ),
                isSolved: (state) => has(state, values) && equals(receiptTotal(state), cheapestTotal(state)) && receiptAnswered(state),
                solution: ready
            }
        }
        const sequence = orderText(solution)
        return {
            prompt: say(
                `Tiketa: ${data.eu} Ordena: ${sequence.eu}. Idatzi guztira.`,
                `Tique: ${data.es} Orden: ${sequence.es}. Escribe el total.`,
                `الإيصال: ${data.ar} الترتيب: ${sequence.ar}. اكتب المجموع.`, `Receipt: ${data.en} Order: ${sequence.en}. Write the total.`
            ),
            hint: say(`$${receiptExpression(solution)}$`, `$${receiptExpression(solution)}$`, `$${receiptExpression(solution)}$`, `$${receiptExpression(solution)}$`),
            // Any order with the same total will do: the discount and the VAT may swap when the coupon is not between them
            isSolved: (state) => has(state, values) && equals(receiptTotal(state), total) && receiptAnswered(state),
            solution: ready
        }
    }
})
