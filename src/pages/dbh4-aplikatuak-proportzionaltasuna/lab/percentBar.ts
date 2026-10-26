import { checkAnswer, divide, equals, fraction, multiply, parseFractionInput, subtract, toExactDecimal, toNumber, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { pick } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker, OperationAnswer } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { readMoneyAnswer } from '../answers.ts'

/* ==========================================================================
   The 100 % bar: the reference amount is a bar split into ten pieces of
   10 %, and the compared amount is a second bar on the same scale (the
   p % of it, or the price after a rise or a cut). Two of the three numbers
   are known and the learner writes the third: the part (multiply by the
   index), the total (divide by the index: «84 € after a 25 % cut» was 112 €,
   not 84 + 25 % = 105 €) or the percentage. Tests in
   tests/proportzionaltasuna-dbh4ap-percentbar.test.ts.
   ========================================================================== */

/** What the learner works out */
export type PercentFind = 'part' | 'whole' | 'percent'
/** A plain percentage of an amount, a rise or a cut */
export type PercentChange = 'of' | 'up' | 'down'

export interface PercentBarState extends OperationAnswer {
    find: PercentFind
    change: PercentChange
    /** Euros of the 100 % bar: the total, or the price before the change */
    whole: number
    /** Euros of the compared bar: the part, or the price after the change */
    part: number
    /** The percentage (of), or the size of the rise or the cut, in % */
    rate: number
}

export const PERCENT_AMOUNT_MAX = 99999
export const PERCENT_RATE_MAX = { of: 300, up: 200, down: 99 } as const

const freshAnswer = { answer: '', checked: false, revealed: false }

/** Not one of the challenges, so that none is solved on arrival */
export const initialPercentBarState: PercentBarState = { find: 'part', change: 'of', whole: 500, part: 160, rate: 30, ...freshAnswer }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

/** A new case clears the written answer; the rate stays inside what each kind of change allows */
export function setPercentBar(state: PercentBarState, patch: Partial<Pick<PercentBarState, 'find' | 'change' | 'whole' | 'part' | 'rate'>>): PercentBarState {
    const change = patch.change ?? state.change
    const next = {
        find: patch.find ?? state.find,
        change,
        whole: clamp(patch.whole ?? state.whole, 1, PERCENT_AMOUNT_MAX),
        part: clamp(patch.part ?? state.part, 1, PERCENT_AMOUNT_MAX),
        rate: clamp(patch.rate ?? state.rate, 1, PERCENT_RATE_MAX[change])
    }
    const same = next.find === state.find && next.change === state.change && next.whole === state.whole && next.part === state.part && next.rate === state.rate
    return same ? state : { ...next, ...freshAnswer }
}

/** The compared bar as a percentage of the 100 % bar: p, 100 + p or 100 − p */
export const barPercent = (change: PercentChange, rate: number) => (change === 'of' ? rate : change === 'up' ? 100 + rate : 100 - rate)

/** The index: what the 100 % is multiplied by (0,3; 1,21; 0,75) */
export const percentIndex = (state: PercentBarState): FractionValue => fraction(barPercent(state.change, state.rate), 100)

export interface PercentBarCase {
    /** Euros of the 100 % bar and of the compared bar, and the compared bar in %, all exact */
    whole: FractionValue
    part: FractionValue
    percent: FractionValue
    /** The number the learner writes: euros, or the percentage (or the size of the rise or the cut) */
    unknown: FractionValue
    /** False when the numbers make no sense, e.g. a «rise» to a lower price */
    valid: boolean
}

export function percentBarCase(state: PercentBarState): PercentBarCase {
    if (state.find === 'part') {
        const whole = fraction(state.whole)
        const part = multiply(whole, percentIndex(state))
        return { whole, part, percent: fraction(barPercent(state.change, state.rate)), unknown: part, valid: true }
    }
    if (state.find === 'whole') {
        const part = fraction(state.part)
        const whole = divide(part, percentIndex(state))
        return { whole, part, percent: fraction(barPercent(state.change, state.rate)), unknown: whole, valid: true }
    }
    const whole = fraction(state.whole)
    const part = fraction(state.part)
    const percent = multiply(divide(part, whole), fraction(100))
    const unknown = state.change === 'of' ? percent : state.change === 'up' ? subtract(percent, fraction(100)) : subtract(fraction(100), percent)
    return { whole, part, percent, unknown, valid: unknown.numerator > 0 }
}

/** The answer to write: exact when it has at most two decimals, otherwise rounded to the hundredths */
export function roundedAnswer(value: FractionValue): { value: FractionValue; rounded: boolean } {
    const exact = toExactDecimal(value, ',')
    if (exact !== null && (exact.split(',')[1] ?? '').length <= 2) return { value, rounded: false }
    return { value: fraction(Math.round(toNumber(value) * 100), 100), rounded: true }
}

export const expectedPercentAnswer = (state: PercentBarState) => roundedAnswer(percentBarCase(state).unknown).value

/** The learner has written the right number (a revealed result does not count) */
export const percentAnswered = (state: PercentBarState) =>
    percentBarCase(state).valid && checkAnswer(readMoneyAnswer(state.answer), expectedPercentAnswer(state)) === 'correct'

/**
 * The classic slips when going back to the 100 %: adding the percentage to
 * the final price (84 € + 25 % = 105 €) or multiplying by the index instead
 * of dividing. Only after the learner checks a wrong answer.
 */
export function percentSlip(state: PercentBarState): 'added' | 'multiplied' | null {
    if (state.find !== 'whole' || !state.checked) return null
    const value = parseFractionInput(readMoneyAnswer(state.answer))
    if (value === null) return null
    const part = fraction(state.part)
    const index = percentIndex(state)
    const is = (slip: FractionValue) => equals(value, roundedAnswer(slip).value)
    if (state.change !== 'of' && is(multiply(part, subtract(fraction(2), index)))) return 'added'
    if (is(multiply(part, index))) return 'multiplied'
    return null
}

/* ---------- Challenges: the lessons' stadium, dress, plumber and insurance ---------- */

const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })

const is = (state: PercentBarState, find: PercentFind, change: PercentChange, values: Partial<Record<'whole' | 'part' | 'rate', number>>) =>
    state.find === find && state.change === change && Object.entries(values).every(([key, value]) => state[key as 'whole' | 'part' | 'rate'] === value) && percentAnswered(state)

export const percentBarChallenges: LabChallenge<PercentBarState>[] = [
    {
        id: 43501,
        prompt: say(
            'Estadioan 24 000 zale daude, edukieraren % 80. Zein da estadioaren edukiera? Prestatu barra eta idatzi emaitza.',
            'En el estadio hay 24 000 aficionados, el 80 % de su capacidad. ¿Cuál es la capacidad? Prepara la barra y escribe el resultado.',
            'في الملعب 24000 مشجع، أي 80٪ من سعته. ما سعة الملعب؟ جهّز الشريط واكتب النتيجة.'
        ),
        hint: say('Bilatu: osoa. % 80 = 24 000, beraz % 10 = 3000.', 'Busca: el total. El 80 % son 24 000, así que el 10 % son 3000.', 'ابحث عن: الكل. 80٪ هي 24000، إذن 10٪ هي 3000.'),
        isSolved: (state) => is(state, 'whole', 'of', { part: 24000, rate: 80 })
    },
    {
        id: 43502,
        prompt: say(
            'Soineko bat % 25 merketu dute, eta orain 84 € balio du. Zenbat balio zuen lehen?',
            'Un vestido rebajado un 25 % sale por 84 €. ¿Cuánto costaba antes de la rebaja?',
            'ثمن فستان بعد تخفيض 25٪ هو 84 €. كم كان ثمنه قبل التخفيض؟'
        ),
        hint: say('84 € prezio zaharraren % 75 da: zatitu $0{,}75$ zenbakiaz, ez gehitu % 25.', '84 € es el 75 % del precio de antes: divide entre $0{,}75$, no sumes un 25 %.', '84 € هي 75٪ من الثمن القديم: اقسم على $0{,}75$ ولا تضف 25٪.'),
        isSolved: (state) => is(state, 'whole', 'down', { part: 84, rate: 25 })
    },
    {
        id: 43503,
        prompt: say(
            'Iturgin baten faktura 119 € da, BEZik gabe. BEZa % 21 bada, zenbat ordaindu behar da?',
            'La factura de un fontanero es de 119 € sin IVA. ¿Cuánto hay que pagar con el 21 % de IVA?',
            'فاتورة سبّاك 119 € دون ضريبة. كم يجب أن يُدفع مع ضريبة 21٪؟'
        ),
        hint: say('% 21 igotzea $1{,}21$ zenbakiaz biderkatzea da.', 'Subir un 21 % es multiplicar por $1{,}21$.', 'رفع 21٪ يعني الضرب في $1{,}21$.'),
        isSolved: (state) => is(state, 'part', 'up', { whole: 119, rate: 21 })
    },
    {
        id: 43504,
        prompt: say(
            'Aseguruaren kuota 520 € zen, eta orain 442 € da. Zenbat merketu da, ehunekotan?',
            'El seguro baja la cuota de 520 € a 442 €. ¿Qué porcentaje la ha rebajado?',
            'خفّض التأمين القسط من 520 € إلى 442 €. ما نسبة التخفيض؟'
        ),
        hint: say('$442\\mathbin{:}520=0{,}85$: orain % 85 ordaintzen da.', '$442\\mathbin{:}520=0{,}85$: ahora se paga el 85 %.', '$442\\mathbin{:}520=0{,}85$: يُدفع الآن 85٪.'),
        isSolved: (state) => is(state, 'percent', 'down', { whole: 520, part: 442 })
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

/** 24 000 with a space in Basque and Spanish; Arabic keeps the plain digits */
const big = (value: number) => (value >= 10000 ? String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : String(value))
const decimalLatex = (value: FractionValue) => (toExactDecimal(value, ',') ?? String(toNumber(value))).replace(',', '{,}')

const RATES: Record<PercentChange, readonly number[]> = {
    of: [5, 10, 12, 15, 20, 25, 30, 35, 40, 45, 60, 75, 80, 85, 90],
    up: [4, 5, 10, 15, 20, 21, 25, 30, 40, 50],
    down: [5, 10, 15, 20, 25, 30, 35, 40, 50, 60]
}

/** A total, a percentage, a rise or a cut, with whole euros on both bars */
export const percentBarExtra: LabChallengeMaker<PercentBarState> = freshFrom(initialPercentBarState, (random) => {
    for (;;) {
        const change = pick(random, ['of', 'of', 'up', 'down'] as const)
        const find = pick(random, ['part', 'whole', 'percent'] as const)
        const rate = pick(random, RATES[change])
        const percent = barPercent(change, rate)
        const whole = pick(random, [20, 40, 50, 60, 80, 100, 120, 150, 200, 240, 250, 300, 400, 500, 600, 800, 1200, 1500, 2000, 2400, 5000, 12000, 30000])
        if ((whole * percent) % 100 !== 0) continue
        const part = (whole * percent) / 100
        const solution: PercentBarState = { find, change, whole, part, rate, ...freshAnswer }
        const answer = toExactDecimal(percentBarCase(solution).unknown, ',')!
        const ready = { ...solution, answer, checked: true }
        const index = decimalLatex(fraction(percent, 100))
        const W = big(whole)
        const P = big(part)
        const texts: Record<PercentChange, Record<PercentFind, LocalizedText>> = {
            of: {
                part: say(`Kalkulatu ${W} zenbakiaren % ${rate}.`, `Calcula el ${rate} % de ${W}.`, `احسب ${rate}٪ من ${whole}.`),
                whole: say(`${P} kantitate baten % ${rate} da. Zein da kantitate osoa?`, `${P} es el ${rate} % de una cantidad. ¿Cuál es la cantidad?`, `${part} هو ${rate}٪ من كمية. ما هذه الكمية؟`),
                percent: say(`${W} kantitatearen zer ehuneko da ${P}?`, `¿Qué porcentaje de ${W} es ${P}?`, `ما النسبة المئوية التي يمثلها ${part} من ${whole}؟`)
            },
            up: {
                part: say(`Prezioa: ${W} €. % ${rate} igo da. Zein da prezio berria?`, `Un precio de ${W} € sube un ${rate} %. ¿Cuál es el precio nuevo?`, `سعر ${whole} € يرتفع ${rate}٪. ما السعر الجديد؟`),
                whole: say(`% ${rate} igo ondoren, prezioa ${P} € da. Zenbat zen lehen?`, `Tras subir un ${rate} %, un precio es de ${P} €. ¿Cuánto era antes?`, `بعد ارتفاع ${rate}٪ صار السعر ${part} €. كم كان قبل ذلك؟`),
                percent: say(`Prezioa ${W} € zen, eta orain ${P} € da. Zenbat igo da, ehunekotan?`, `Un precio pasa de ${W} € a ${P} €. ¿Qué porcentaje ha subido?`, `ارتفع سعر من ${whole} € إلى ${part} €. ما نسبة الارتفاع؟`)
            },
            down: {
                part: say(`Prezioa: ${W} €. % ${rate} merketu da. Zein da prezio berria?`, `Un precio de ${W} € se rebaja un ${rate} %. ¿Cuál es el precio nuevo?`, `سعر ${whole} € يُخفَّض ${rate}٪. ما السعر الجديد؟`),
                whole: say(`% ${rate} merketuta, artikulu batek ${P} € balio du. Zenbat balio zuen lehen?`, `Rebajado un ${rate} %, un artículo cuesta ${P} €. ¿Cuánto costaba antes?`, `بعد تخفيض ${rate}٪ صار ثمن سلعة ${part} €. كم كان ثمنها قبل ذلك؟`),
                percent: say(`Prezioa ${W} € zen, eta orain ${P} € da. Zenbat merketu da, ehunekotan?`, `Un precio pasa de ${W} € a ${P} €. ¿Qué porcentaje se ha rebajado?`, `انخفض سعر من ${whole} € إلى ${part} €. ما نسبة التخفيض؟`)
            }
        }
        const hints: Record<PercentFind, LocalizedText> = {
            part: say(`Biderkatu indizeaz: $${index}$.`, `Multiplica por el índice: $${index}$.`, `اضرب في المؤشر: $${index}$.`),
            whole: say(`Zatitu indizeaz: $${index}$. Barra osoa % 100 da.`, `Divide entre el índice: $${index}$. La barra entera es el 100 %.`, `اقسم على المؤشر: $${index}$. الشريط كله هو 100٪.`),
            percent: say(`Zatitu: $${part}\\mathbin{:}${whole}$, eta pasatu ehunekora.`, `Divide $${part}\\mathbin{:}${whole}$ y pásalo a porcentaje.`, `اقسم $${part}\\mathbin{:}${whole}$ وحوّله إلى نسبة مئوية.`)
        }
        const known = find === 'part' ? { whole, rate } : find === 'whole' ? { part, rate } : { whole, part }
        return {
            prompt: texts[change][find],
            hint: hints[find],
            isSolved: (state) => is(state, find, change, known),
            solution: ready
        }
    }
})
