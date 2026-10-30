import { checkAnswer, divide, fraction, multiply, toExactDecimal, toNumber, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { pick, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker, OperationAnswer } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types.ts'
import { decimalSeparatorFor } from '../../../utils/numberFormat.ts'
import { readLabAnswer } from '../answers.ts'
import { latexNumber, moneyText } from '../games/numbers.ts'
import { roundedAnswer } from './percentBar.ts'

/* ==========================================================================
   The interest calendar: simple interest with the time in years, months or
   days. The learner picks the unknown (the interest, the principal, the
   rate or the time) and writes it; the drawing is one year cut into 12
   months (or 360 days), with the interest of each month, so dividing by
   1200 = 100 · 12 or by 36 000 = 100 · 360 can be seen. Changing the unit
   keeps the same time when it can (8 months = 240 days), and with it the
   same interest. Tests in tests/proportzionaltasuna-dbh4ap-calendar.test.ts.
   ========================================================================== */

export type InterestUnknown = 'interest' | 'capital' | 'rate' | 'time'
export type TimeUnit = 'years' | 'months' | 'days'

export interface CalendarState extends OperationAnswer {
    /** What the learner works out */
    unknown: InterestUnknown
    unit: TimeUnit
    /** Principal in euros, up to two decimals */
    capital: number
    /** Annual rate in %, up to two decimals */
    rate: number
    /** A whole number of years, months or days */
    time: number
    /** Interest in euros, up to two decimals */
    interest: number
    /** Typed on the English page (18,700 is eighteen thousand seven hundred) */
    english?: boolean
}

export const INTEREST_UNKNOWNS: InterestUnknown[] = ['interest', 'capital', 'rate', 'time']
export const TIME_UNITS: TimeUnit[] = ['years', 'months', 'days']
export const CALENDAR_CAPITAL_MAX = 1000000
export const CALENDAR_RATE_MAX = 30
export const CALENDAR_INTEREST_MAX = 1000000
export const CALENDAR_TIME_MAX: Record<TimeUnit, number> = { years: 10, months: 60, days: 1800 }
/** Years: divide by 100; months: by 100 · 12; days: by 100 · 360 (the commercial year) */
export const DIVISORS: Record<TimeUnit, number> = { years: 100, months: 1200, days: 36000 }
export const PER_YEAR: Record<TimeUnit, number> = { years: 1, months: 12, days: 360 }

const freshAnswer = { answer: '', checked: false, revealed: false }

/** Not one of the challenges, so that none is solved on arrival */
export const initialCalendarState: CalendarState = { unknown: 'interest', unit: 'months', capital: 2000, rate: 3, time: 6, interest: 30, ...freshAnswer }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))
/** Euros and rates keep two decimals at most */
const hundredths = (value: number) => Math.round(value * 100) / 100
const exact = (value: number) => fraction(Math.round(value * 100), 100)

type Knowns = Pick<CalendarState, 'capital' | 'rate' | 'time' | 'interest'>

/** The smallest and largest value each field takes */
const MINIMA: Record<InterestUnknown, number> = { interest: 0.01, capital: 1, rate: 0.01, time: 1 }
const MAXIMA = (unit: TimeUnit): Record<InterestUnknown, number> => ({ interest: CALENDAR_INTEREST_MAX, capital: CALENDAR_CAPITAL_MAX, rate: CALENDAR_RATE_MAX, time: CALENDAR_TIME_MAX[unit] })

/** A new case clears the written answer */
export function setCalendar(state: CalendarState, patch: Partial<Knowns>): CalendarState {
    const next = {
        capital: clamp(hundredths(patch.capital ?? state.capital), MINIMA.capital, CALENDAR_CAPITAL_MAX),
        rate: clamp(hundredths(patch.rate ?? state.rate), MINIMA.rate, CALENDAR_RATE_MAX),
        time: clamp(Math.round(patch.time ?? state.time), MINIMA.time, CALENDAR_TIME_MAX[state.unit]),
        interest: clamp(hundredths(patch.interest ?? state.interest), MINIMA.interest, CALENDAR_INTEREST_MAX)
    }
    const same = next.capital === state.capital && next.rate === state.rate && next.time === state.time && next.interest === state.interest
    return same ? state : { ...state, ...next, ...freshAnswer }
}

/** The value of each quantity, with the unknown worked out from the other three: I = C · r · t / D */
export function calendarValues(state: CalendarState): Record<InterestUnknown, FractionValue> {
    const divisor = fraction(DIVISORS[state.unit])
    const capital = exact(state.capital)
    const rate = exact(state.rate)
    const time = fraction(state.time)
    const interest = exact(state.interest)
    if (state.unknown === 'interest') return { capital, rate, time, interest: divide(multiply(multiply(capital, rate), time), divisor) }
    const top = multiply(interest, divisor)
    if (state.unknown === 'capital') return { capital: divide(top, multiply(rate, time)), rate, time, interest }
    if (state.unknown === 'rate') return { capital, rate: divide(top, multiply(capital, time)), time, interest }
    return { capital, rate, time: divide(top, multiply(capital, rate)), interest }
}

export const unknownValue = (state: CalendarState) => calendarValues(state)[state.unknown]


/** The unknown comes out as something the fields could hold: a principal up to a million, a rate up to 30 %, a time the drawing can show */
export function calendarValid(state: CalendarState): boolean {
    const value = toNumber(unknownValue(state))
    return value >= 0.005 && value <= MAXIMA(state.unit)[state.unknown]
}

/** Another unknown: the old one keeps the value it had, so the case is the same (I = 30 € → what principal gives 30 €?) */
export function setUnknown(state: CalendarState, unknown: InterestUnknown): CalendarState {
    if (unknown === state.unknown) return state
    const value = toNumber(unknownValue(state))
    const old = state.unknown
    const kept = clamp(old === 'time' ? Math.round(value) : hundredths(value), MINIMA[old], MAXIMA(state.unit)[old])
    return { ...state, [old]: kept, unknown, ...freshAnswer }
}

/** Another unit: the time is changed into it when it can be (8 months = 240 days), and then the answer still holds unless it is the time */
export function setUnit(state: CalendarState, unit: TimeUnit): CalendarState {
    if (unit === state.unit) return state
    const converted = (state.time * PER_YEAR[unit]) / PER_YEAR[state.unit]
    const same = Number.isInteger(converted) && converted >= 1 && converted <= CALENDAR_TIME_MAX[unit]
    const time = same ? converted : clamp(Math.round(converted), 1, CALENDAR_TIME_MAX[unit])
    const next = { ...state, unit, time }
    return same && state.unknown !== 'time' ? next : { ...next, ...freshAnswer }
}

export const expectedCalendarAnswer = (state: CalendarState) => roundedAnswer(unknownValue(state)).value

/** The learner has written the right unknown (a revealed result does not count) */
export const calendarAnswered = (state: CalendarState) =>
    calendarValid(state) && checkAnswer(readLabAnswer(state), expectedCalendarAnswer(state)) === 'correct'

/** One year's interest, C · r / 100, and the interest of one month or day */
export function yearlyInterest(state: CalendarState): FractionValue {
    const values = calendarValues(state)
    return divide(multiply(values.capital, values.rate), fraction(100))
}

/* ---------- The working ---------- */

/** Euros inside LaTeX: 448{,}80, 18\,700 */
function moneyLatex(value: number): string {
    if (Number.isInteger(value)) return latexNumber(value)
    const [whole, cents] = value.toFixed(2).split('.')
    return `${latexNumber(Number(whole))}{,}${cents}`
}

const LETTERS: Record<InterestUnknown, string> = { interest: 'I', capital: 'C', rate: 'r', time: 't' }

/** The formula solved for the unknown, with the data: C = I · 1200 / (r · t) = 448,80 · 1200 / (3,2 · 9) = 18 700 */
export function calendarLatex(state: CalendarState): string {
    const divisor = latexNumber(DIVISORS[state.unit])
    const capital = moneyLatex(state.capital)
    const rate = latexNumber(state.rate)
    const interest = moneyLatex(state.interest)
    const { value, rounded } = roundedAnswer(unknownValue(state))
    const number = toNumber(value)
    const result = `${rounded ? '\\approx ' : '='}${state.unknown === 'interest' || state.unknown === 'capital' ? moneyLatex(number) : latexNumber(number)}`
    const forms: Record<InterestUnknown, [string, string]> = {
        interest: [`\\frac{C\\cdot r\\cdot t}{${divisor}}`, `\\frac{${capital}\\cdot ${rate}\\cdot ${state.time}}{${divisor}}`],
        capital: [`\\frac{I\\cdot ${divisor}}{r\\cdot t}`, `\\frac{${interest}\\cdot ${divisor}}{${rate}\\cdot ${state.time}}`],
        rate: [`\\frac{I\\cdot ${divisor}}{C\\cdot t}`, `\\frac{${interest}\\cdot ${divisor}}{${capital}\\cdot ${state.time}}`],
        time: [`\\frac{I\\cdot ${divisor}}{C\\cdot r}`, `\\frac{${interest}\\cdot ${divisor}}{${capital}\\cdot ${rate}}`]
    }
    const [letters, numbers] = forms[state.unknown]
    return `${LETTERS[state.unknown]}=${letters}=${numbers}${result}`
}

/* ---------- Words for the sentences ---------- */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (text: string) => say(text, text, text, text)
const LANGUAGES: UnitLanguage[] = ['eu', 'es', 'en', 'ar']
const each = (make: (language: UnitLanguage) => string): LocalizedText => Object.fromEntries(LANGUAGES.map((language) => [language, make(language)])) as unknown as LocalizedText

/** A decimal for a sentence: 3,2 (3.2 in Arabic and English) */
export const decimalText = (value: number, language: UnitLanguage) => (language === 'ar' ? String(value) : String(value).replace('.', decimalSeparatorFor(language)))

/** Euros for a sentence, never broken from their sign: 448,80 €, €448.80; kept left to right in Arabic */
export function eurosText(value: number, language: UnitLanguage): string {
    const amount = moneyText(value, language)
    if (language === 'en') return `€${amount}`
    return language === 'ar' ? `\u2066${amount} €\u2069` : `${amount}\u00a0€`
}

/** A rate for a sentence: 3,2 %, % 3,2, 3.2%, 3.2٪ */
export function rateText(value: number, language: UnitLanguage): string {
    const number = decimalText(value, language)
    return { eu: `%\u00a0${number}`, es: `${number}\u00a0%`, en: `${number}%`, ar: `${number}٪` }[language]
}

/** The noun after a number in Arabic: 1 and 2 have their own words, 3–10 take the plural, from 11 the singular */
function arabicCount(count: number, unit: TimeUnit): string {
    const words = { years: ['سنة واحدة', 'سنتان', 'سنوات', 'سنة'], months: ['شهر واحد', 'شهران', 'أشهر', 'شهرًا'], days: ['يوم واحد', 'يومان', 'أيام', 'يومًا'] }[unit]
    if (count === 1) return words[0]
    if (count === 2) return words[1]
    return `${count} ${count <= 10 ? words[2] : words[3]}`
}

/** «8 meses», «8 hilabete» (no ending on the number), «8 months», «8 أشهر» */
export function timeText(count: number, unit: TimeUnit, language: UnitLanguage): string {
    if (language === 'ar') return arabicCount(count, unit)
    const names = {
        eu: { years: 'urte', months: 'hilabete', days: 'egun' },
        es: count === 1 ? { years: 'año', months: 'mes', days: 'día' } : { years: 'años', months: 'meses', days: 'días' },
        en: count === 1 ? { years: 'year', months: 'month', days: 'day' } : { years: 'years', months: 'months', days: 'days' }
    }[language]
    return `${count} ${names[unit]}`
}

/* ---------- Challenges ---------- */

const near = (left: number, right: number) => Math.abs(left - right) < 1e-9

/** The case is set: this unknown, this unit and these three data (the unknown's own field does not matter) */
function has(state: CalendarState, unknown: InterestUnknown, unit: TimeUnit, data: Partial<Knowns>): boolean {
    return state.unknown === unknown && state.unit === unit && Object.entries(data).every(([key, value]) => key === unknown || near(state[key as keyof Knowns], value))
}

export const calendarChallenges: LabChallenge<CalendarState>[] = [
    {
        id: 43901,
        prompt: say(
            'Lezioaren adibidea. Kapitala: 6000\u00a0€. Interes-tasa: %\u00a03. Denbora: 8 hilabete. Zenbat interes sortzen du?',
            'El ejemplo de la lección: ¿qué interés producen 6000\u00a0€ al 3\u00a0% durante 8 meses?',
            'مثال الدرس: ما الفائدة التي تُنتجها \u20666000\u00a0€\u2069 بنسبة 3٪ مدة 8 أشهر؟',
            'The example in the lesson: how much interest does €6000 earn at 3% over 8 months?'
        ),
        hint: say('Hilabeteak: zatitzailea $1200$ da.', 'En meses se divide entre $1200$.', 'بالأشهر نقسم على $1200$.', 'In months, divide by $1200$.'),
        isSolved: (state) => has(state, 'interest', 'months', { capital: 6000, rate: 3, time: 8 }) && calendarAnswered(state)
    },
    {
        id: 43902,
        prompt: say(
            'Kapitala: 1000\u00a0€. Interes-tasa: %\u00a04. Denbora: 4 hilabete. Zenbat interes? Biribildu zentimoetara.',
            '1000\u00a0€ al 4\u00a0% durante 4 meses: ¿cuánto interés? Redondea a los céntimos.',
            '\u20661000\u00a0€\u2069 بنسبة 4٪ مدة 4 أشهر: كم الفائدة؟ قرّب إلى السنتات.',
            '€1000 at 4% for 4 months: how much interest? Round to the nearest cent.'
        ),
        hint: same('$\\frac{1000\\cdot 4\\cdot 4}{1200}$'),
        isSolved: (state) => has(state, 'interest', 'months', { capital: 1000, rate: 4, time: 4 }) && calendarAnswered(state)
    },
    {
        id: 43903,
        prompt: say(
            'Interesa: 448,80\u00a0€. Interes-tasa: %\u00a03,2. Denbora: 9 hilabete. Zer kapitalek sortzen du interes hori?',
            '¿Qué capital produce 448,80\u00a0€ de interés al 3,2\u00a0% en 9 meses?',
            'أي رأس مال يُنتج فائدة \u2066448{,}80\u00a0€\u2069 بنسبة 3{,}2٪ في 9 أشهر؟',
            'What principal earns €448.80 in interest at 3.2% over 9 months?'
        ),
        hint: say(
            'Aukeratu «Kapitala» ezezagun gisa: $C=\\frac{I\\cdot 1200}{r\\cdot t}$.',
            'Elige «Capital» como incógnita: $C=\\frac{I\\cdot 1200}{r\\cdot t}$.',
            'اختر «رأس المال» مجهولًا: $C=\\frac{I\\cdot 1200}{r\\cdot t}$.',
            'Choose “Principal” as the unknown: $C=\\frac{I\\cdot 1200}{r\\cdot t}$.'
        ),
        isSolved: (state) => has(state, 'capital', 'months', { interest: 448.8, rate: 3.2, time: 9 }) && calendarAnswered(state)
    },
    {
        id: 43904,
        prompt: say(
            'Kapitala: 120\u00a0000\u00a0€. Sei hilabete geroago: 126\u00a0750\u00a0€. Zein da urteko interes-tasa?',
            'Un capital de 120\u00a0000\u00a0€ se convierte en 126\u00a0750\u00a0€ en seis meses. ¿A qué tipo de interés anual?',
            'تحوّل رأس مال قدره \u2066120000\u00a0€\u2069 إلى \u2066126750\u00a0€\u2069 في ستة أشهر. ما سعر الفائدة السنوي؟',
            'A principal of €120,000 becomes €126,750 in six months. What is the annual interest rate?'
        ),
        hint: say(
            'Lehenik interesa: $126\\,750-120\\,000=6750$.',
            'Primero el interés: $126\\,750-120\\,000=6750$.',
            'أولًا الفائدة: $126\\,750-120\\,000=6750$.',
            'First the interest: $126\\,750-120\\,000=6750$.'
        ),
        isSolved: (state) => has(state, 'rate', 'months', { capital: 120000, interest: 6750, time: 6 }) && calendarAnswered(state)
    },
    {
        id: 43905,
        prompt: say(
            'Kapitala: 3600\u00a0€. Interes-tasa: %\u00a05. Interesa: 30\u00a0€. Zenbat egun behar dira?',
            '¿Cuántos días tienen que estar 3600\u00a0€ al 5\u00a0% para producir 30\u00a0€ de interés?',
            'كم يومًا يجب أن تبقى \u20663600\u00a0€\u2069 بنسبة 5٪ لتُنتج فائدة \u206630\u00a0€\u2069؟',
            'For how many days must €3600 be invested at 5% to earn €30 in interest?'
        ),
        hint: say(
            'Urte komertziala: 360 egun. Zatitzailea $36\\,000$ da.',
            'El año comercial tiene 360 días: se divide entre $36\\,000$.',
            'السنة التجارية 360 يومًا: نقسم على $36\\,000$.',
            'A commercial year has 360 days: divide by $36\\,000$.'
        ),
        isSolved: (state) => has(state, 'time', 'days', { capital: 3600, rate: 5, interest: 30 }) && calendarAnswered(state)
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

const CAPITALS = [1200, 1500, 1800, 2000, 2400, 3000, 3600, 4000, 4500, 4800, 5000, 6000, 7200, 8000, 9000, 10000, 12000, 15000, 18000, 20000, 24000, 30000, 36000] as const
const RATES = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 6, 7.5, 8] as const
const TIMES: Record<TimeUnit, readonly number[]> = {
    years: [1, 2, 3, 4, 5, 6],
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 15, 18, 20, 24],
    days: [15, 20, 30, 36, 40, 45, 60, 72, 75, 90, 100, 120, 144, 150, 180, 200, 240, 270, 300]
}

/** Months and days more often than years: they are what this lesson adds */
const pickUnit = (random: Random): TimeUnit => {
    const roll = random()
    return roll < 0.2 ? 'years' : roll < 0.65 ? 'months' : 'days'
}

/** The question for each unknown, with the three data in it */
function calendarPrompt(unknown: InterestUnknown, unit: TimeUnit, data: Knowns): LocalizedText {
    return each((language) => {
        const capital = eurosText(data.capital, language)
        const rate = rateText(data.rate, language)
        const time = timeText(data.time, unit, language)
        const interest = eurosText(data.interest, language)
        const units = {
            eu: { years: 'urte', months: 'hilabete', days: 'egun' },
            es: { years: 'años', months: 'meses', days: 'días' },
            en: { years: 'years', months: 'months', days: 'days' },
            ar: { years: 'سنةً', months: 'شهرًا', days: 'يومًا' }
        }[language][unit]
        const prompts: Record<UnitLanguage, Record<InterestUnknown, string>> = {
            eu: {
                interest: `Kapitala: ${capital}. Interes-tasa: ${rate}. Denbora: ${time}. Zenbat interes sortzen du?`,
                capital: `Interesa: ${interest}. Interes-tasa: ${rate}. Denbora: ${time}. Zer kapitalek sortzen du interes hori?`,
                rate: `Kapitala: ${capital}. Interesa: ${interest}. Denbora: ${time}. Zein da urteko interes-tasa?`,
                time: `Kapitala: ${capital}. Interes-tasa: ${rate}. Interesa: ${interest}. Zenbat ${units} behar dira?`
            },
            es: {
                interest: `¿Qué interés producen ${capital} al ${rate} durante ${time}?`,
                capital: `¿Qué capital produce ${interest} de interés al ${rate} en ${time}?`,
                rate: `${capital} producen ${interest} de interés en ${time}. ¿A qué tipo de interés anual?`,
                time: `¿Cuántos ${units} tienen que estar ${capital} al ${rate} para producir ${interest} de interés?`
            },
            en: {
                interest: `How much interest does ${capital} earn at ${rate} over ${time}?`,
                capital: `What principal earns ${interest} in interest at ${rate} over ${time}?`,
                rate: `${capital} earns ${interest} in interest over ${time}. What is the annual interest rate?`,
                time: `For how many ${units} must ${capital} be invested at ${rate} to earn ${interest} in interest?`
            },
            ar: {
                interest: `ما الفائدة التي تُنتجها ${capital} بنسبة ${rate} مدة ${time}؟`,
                capital: `أي رأس مال يُنتج فائدة ${interest} بنسبة ${rate} في ${time}؟`,
                rate: `رأس مال ${capital} أنتج فائدة ${interest} في ${time}. ما سعر الفائدة السنوي؟`,
                time: `كم ${units} يجب أن يبقى رأس مال ${capital} بنسبة ${rate} ليُنتج فائدة ${interest}؟`
            }
        }
        return prompts[language][unknown]
    })
}

/** The unknown to work out, in a unit, with every answer exact (the interest to the cent) */
export const calendarExtra: LabChallengeMaker<CalendarState> = freshFrom(initialCalendarState, (random) => {
    for (;;) {
        const unknown = pick(random, INTEREST_UNKNOWNS)
        const unit = pickUnit(random)
        const capital = pick(random, CAPITALS)
        const rate = pick(random, RATES)
        const time = pick(random, TIMES[unit])
        const interestCents = (capital * rate * time * 100) / DIVISORS[unit]
        // Every datum and every answer exact to the cent, and an interest worth working out
        if (!Number.isInteger(Math.round(interestCents * 1e6) / 1e6) || interestCents < 500) continue
        const interest = Math.round(interestCents) / 100
        const data: Knowns = { capital, rate, time, interest }
        const solution: CalendarState = { ...data, unknown, unit, ...freshAnswer }
        const answer = toExactDecimal(unknownValue(solution), ',')!
        const known = Object.fromEntries(Object.entries(data).filter(([key]) => key !== unknown)) as Partial<Knowns>
        return {
            prompt: calendarPrompt(unknown, unit, data),
            // The formula solved for the unknown, with letters: I = C · r · t / 1200
            hint: same(`$${calendarLatex(solution).split('=').slice(0, 2).join('=')}$`),
            isSolved: (state) => has(state, unknown, unit, known) && calendarAnswered(state),
            solution: { ...solution, answer, checked: true }
        }
    }
})

