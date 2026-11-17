import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L2 · Amortizazio-taula (El cuadro de amortización): one of three loans and
   a yearly payment set in steps of 100 euros. Year after year the interest
   is the debt times i, the repayment is the payment minus the interest and
   the debt goes down by the repayment: the bars show the debt at the start
   of each year and what is left at the end. The learner predicts whether
   the debt ends near zero, still owed or overpaid; the payment that pays it
   off is the annuity C · (1 + i)ⁿ · i ÷ ((1 + i)ⁿ − 1), to the nearest 100.
   ========================================================================== */

export interface Loan {
    capital: number
    /** Yearly interest as a fraction: 0,05 is 5 % */
    rate: number
    years: number
}

export const TABLE_LOANS: Loan[] = [
    { capital: 10000, rate: 0.05, years: 4 },
    { capital: 6000, rate: 0.08, years: 3 },
    { capital: 20000, rate: 0.04, years: 5 }
]

export const PAYMENT_STEP = 100
export const paymentLimits = (loan: Loan) => ({ min: Math.ceil((loan.capital * loan.rate) / PAYMENT_STEP) * PAYMENT_STEP, max: loan.capital })

export interface TableState {
    loan: number
    payment: number
    prediction: Prediction | null
}

export const initialTableState: TableState = { loan: 0, payment: 2000, prediction: null }

export function setTable(state: TableState, patch: Partial<Omit<TableState, 'prediction'>>): TableState {
    const loan = Math.min(TABLE_LOANS.length - 1, Math.max(0, Math.round(patch.loan ?? state.loan)))
    const { min, max } = paymentLimits(TABLE_LOANS[loan])
    const payment = Math.min(max, Math.max(min, Math.round((patch.payment ?? state.payment) / PAYMENT_STEP) * PAYMENT_STEP))
    const same = loan === state.loan && payment === state.payment
    return { loan, payment, prediction: same ? state.prediction : null }
}

/** The annuity that pays the loan off exactly */
export const annuityOf = ({ capital, rate, years }: Loan) => (capital * (1 + rate) ** years * rate) / ((1 + rate) ** years - 1)
const cents = (value: number) => Math.round(value * 100) / 100

export interface TableRow {
    year: number
    debt: number
    interest: number
    repaid: number
    left: number
}

/** The table, rounded to the cent each year as a bank does */
export function tableRows(state: TableState): TableRow[] {
    const loan = TABLE_LOANS[state.loan]
    const rows: TableRow[] = []
    let debt = loan.capital
    for (let year = 1; year <= loan.years; year++) {
        const interest = cents(debt * loan.rate)
        const repaid = cents(state.payment - interest)
        const left = cents(debt - repaid)
        rows.push({ year, debt, interest, repaid, left })
        debt = left
    }
    return rows
}

export const finalDebt = (state: TableState) => tableRows(state).at(-1)!.left

/** Paid off (=) when the payment is the annuity to the nearest 100; still owed (>) or overpaid (<) otherwise */
export function tablePrediction(state: TableState): Prediction {
    const annuity = annuityOf(TABLE_LOANS[state.loan])
    if (Math.abs(state.payment - annuity) < PAYMENT_STEP / 2) return '='
    return state.payment < annuity ? '>' : '<'
}

/** The payment to the nearest 100 that pays the loan off */
export const bestPayment = (loan: Loan) => Math.round(annuityOf(loan) / PAYMENT_STEP) * PAYMENT_STEP

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })

/** «10 000 € at 5 % in 4 years» in each language, for the selector and the challenges */
export function loanLabel(loan: Loan): LocalizedText {
    const amount = loan.capital >= 10000 ? String(loan.capital).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : String(loan.capital)
    const english = String(loan.capital).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    const rate = Math.round(loan.rate * 100)
    return say(`${amount} € · % ${rate} · ${loan.years} urte`, `${amount} € · ${rate} % · ${loan.years} años`, `${amount} € · ${rate} % · ${loan.years} سنوات`, `€${english} · ${rate}% · ${loan.years} years`)
}

export const tableChallenges: LabChallenge<TableState>[] = [
    {
        id: 131201,
        prompt: say('$10\\,000$ euroko mailegua, % 5, 4 urtean: bilatu zorra zero uzten duen urtekoa, ehunetara biribilduta.', 'Préstamo de $10\\,000$ euros al 5 % en 4 años: busca la anualidad, en centenas, que deja la deuda a cero.', 'قرض $10\\,000$ يورو بفائدة 5 % في 4 سنوات: ابحث عن الدفعة السنوية، بالمئات، التي تجعل الدين صفرًا.', 'A loan of $10\\,000$ euros at 5% over 4 years: find the yearly payment, to the hundred, that leaves the debt at zero.'),
        hint: same('$a=C\\cdot\\frac{(1+i)^{n}\\cdot i}{(1+i)^{n}-1}$'),
        isSolved: (state) => state.loan === 0 && state.payment === 2800
    },
    {
        id: 131202,
        prompt: say('6000 euroko mailegua, % 8, 3 urtean: bilatu zorra zero uzten duen urtekoa.', 'Préstamo de 6000 euros al 8 % en 3 años: busca la anualidad que deja la deuda a cero.', 'قرض 6000 يورو بفائدة 8 % في 3 سنوات: ابحث عن الدفعة السنوية التي تجعل الدين صفرًا.', 'A loan of 6,000 euros at 8% over 3 years: find the yearly payment that leaves the debt at zero.'),
        hint: say('6000 zati 3 baino gehiago da: interesak ere badaude.', 'Es más que 6000 entre 3: también hay intereses.', 'إنها أكثر من 6000 مقسومة على 3: هناك فوائد أيضًا.', 'It is more than 6,000 divided by 3: there is interest too.'),
        isSolved: (state) => state.loan === 1 && state.payment === 2300
    },
    {
        id: 131203,
        prompt: say('$20\\,000$ euroko mailegua, % 4, 5 urtean: bilatu zorra zero uzten duen urtekoa.', 'Préstamo de $20\\,000$ euros al 4 % en 5 años: busca la anualidad que deja la deuda a cero.', 'قرض $20\\,000$ يورو بفائدة 4 % في 5 سنوات: ابحث عن الدفعة السنوية التي تجعل الدين صفرًا.', 'A loan of $20\\,000$ euros at 4% over 5 years: find the yearly payment that leaves the debt at zero.'),
        hint: say('Lehen urteko interesak: 800 euro.', 'Intereses del primer año: 800 euros.', 'فوائد السنة الأولى: 800 يورو.', 'First-year interest: 800 euros.'),
        isSolved: (state) => state.loan === 2 && state.payment === 4500
    },
    {
        id: 131204,
        prompt: say('$10\\,000$ euroko maileguan, lortu lehen urtean 2000 euro baino gehiago amortizatzea.', 'En el préstamo de $10\\,000$ euros, consigue que el primer año se amorticen más de 2000 euros.', 'في قرض $10\\,000$ يورو، اجعل الإطفاء في السنة الأولى أكثر من 2000 يورو.', 'In the $10\\,000$ euro loan, make the first year repay more than 2,000 euros.'),
        hint: say('Lehen urtean 500 euro interesak dira.', 'El primer año, 500 euros son intereses.', 'في السنة الأولى 500 يورو فوائد.', 'In the first year, 500 euros are interest.'),
        isSolved: (state) => state.loan === 0 && tableRows(state)[0].repaid > 2000
    },
    {
        id: 131205,
        prompt: say('$20\\,000$ euroko maileguan, lortu lehen urteko ordainketaren erdia interesak izatea.', 'En el préstamo de $20\\,000$ euros, consigue que la mitad del primer pago sean intereses.', 'في قرض $20\\,000$ يورو، اجعل نصف الدفعة الأولى فوائد.', 'In the $20\\,000$ euro loan, make half of the first payment interest.'),
        hint: same('$20\\,000\\cdot 0{,}04=800$'),
        isSolved: (state) => state.loan === 2 && state.payment === 1600
    }
]

function same(value: string): LocalizedText {
    return { eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') }
}

/** Endless practice: a loan and the repayment of its first year */
const tableMaker: LabChallengeMaker<TableState> = (random) => {
    const loan = randomInt(random, 0, TABLE_LOANS.length - 1)
    const { capital, rate } = TABLE_LOANS[loan]
    const interest = Math.round(capital * rate)
    const { min, max } = paymentLimits(TABLE_LOANS[loan])
    const payment = pick(random, Array.from({ length: Math.floor((Math.min(max, 6000) - min) / PAYMENT_STEP) }, (_, index) => min + (index + 1) * PAYMENT_STEP))
    const repaid = payment - interest
    const label = loanLabel(TABLE_LOANS[loan])
    return {
        prompt: say(`${label.eu}: lortu lehen urtean ${repaid} euro amortizatzea.`, `${label.es}: consigue que el primer año se amorticen ${repaid} euros.`, `${label.ar}: اجعل الإطفاء في السنة الأولى ${repaid} يورو.`, `${label.en}: make the first year repay ${repaid.toLocaleString('en-US')} euros.`),
        hint: say(`Urtekoa = amortizazioa + interesak, eta interesak ${interest} euro dira.`, `Anualidad = amortización + intereses, y los intereses son ${interest} euros.`, `الدفعة = الإطفاء + الفوائد، والفوائد ${interest} يورو.`, `Payment = repayment + interest, and the interest is ${interest} euros.`),
        isSolved: (state) => state.loan === loan && state.payment === payment,
        solution: setTable({ ...initialTableState, loan }, { payment })
    }
}

export const tableExtra = freshFrom(initialTableState, tableMaker)
