import { checkAnswer, fraction, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { written } from '../../batx1-zientziak-errealak/games/race.ts'

/* ==========================================================================
   Diruaren lasterketa (Batxilergoa 1 · Gizarte Zientziak): five circuits,
   one per stage — percentages (an index, a chain, a starting price),
   compound interest (a final capital, the years), the APR (from a nominal
   interest, with a fee), saving (a geometric sum, a term) and loans (the
   first interest, the first repayment, the cost of cancelling). The wrong
   options are the typical mistakes; every question carries `meta`, the
   numbers the tests check it against. Money is rounded to the cent.
   ========================================================================== */

export const GIZ_MONEY_RACE_CIRCUITS = 5

export type GizMoneyRaceError = 'added' | 'subtracted' | 'simple' | 'divided' | 'nominal' | 'fee' | 'minus-one' | 'power' | 'first-capital' | 'whole-payment' | 'instalments' | 'calculation'

export type GizMoneyRaceQuestion = RaceQuestion<GizMoneyRaceError> & { meta: Record<string, number> }

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (latex: string): LocalizedText => ({ eu: `$${latex}$`, es: `$${latex}$`, en: `$${latex}$`, ar: `$${latex.replace(/\{,\}/g, '.')}$` })
const math = (latex: string) => `$${latex}$`
/** A value to the cent (or to the ten-thousandth for an index) as an exact fraction */
const exactTo = (value: number, places = 2) => fraction(Math.round(value * 10 ** places), 10 ** places)
const dec = (value: number, places = 2) => (Math.round(value * 10 ** places) / 10 ** places).toString().replace('.', '{,}')

interface Candidate {
    value: FractionValue
    error: GizMoneyRaceError
}
const near = (value: number, error: GizMoneyRaceError, places = 2): Candidate => ({ value: exactTo(value, places), error })
const nearby = (value: number): Candidate[] => [value + 1, value - 1, value * 1.1, value * 0.9].map((item) => near(item, 'calculation'))

/** The right option and three different mistakes */
function options(random: Random, right: FractionValue, candidates: Candidate[]): RaceOption<GizMoneyRaceError>[] | null {
    const rightLatex = written(right)
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: GizMoneyRaceError }> = []
    for (const candidate of [...candidates, ...nearby(right.numerator / right.denominator)]) {
        if (wrong.length === 3) break
        const latex = written(candidate.value)
        if (latex === null || latex.startsWith('-') || used.has(latex)) continue
        used.add(latex)
        wrong.push({ latex, error: candidate.error })
    }
    if (wrong.length < 3) return null
    return shuffle(random, [{ latex: rightLatex, correct: true, error: null }, ...wrong.map((item) => ({ latex: item.latex, correct: false, error: item.error }))])
}

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<GizMoneyRaceError>[], answer: FractionValue, solution: LocalizedText, meta: Record<string, number>): GizMoneyRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution, meta }
}

/* ---------- Circuit 0: percentages ---------- */

function chainQuestion(random: Random): GizMoneyRaceQuestion | null {
    const price = randomInt(random, 2, 20) * 10
    const up = pick(random, [10, 20, 25, 50])
    const down = pick(random, [10, 20, 25, 40])
    const value = price * (1 + up / 100) * (1 - down / 100)
    const answer = exactTo(value)
    const choices = options(random, answer, [near(price * (1 + (up - down) / 100), 'added'), near(price, 'added'), near(price * (1 + up / 100), 'calculation')])
    return choices && build(0, 'chain', say(`${price} euro: +% ${up}, gero −% ${down}. Azken prezioa?`, `${price} euros: +${up} % y luego −${down} %. ¿Precio final?`, `${price} يورو: +${up} % ثم −${down} %. السعر النهائي؟`, `${price} euros: +${up}% and then −${down}%. Final price?`), choices, answer, same(`${price}\\cdot ${dec(1 + up / 100)}\\cdot ${dec(1 - down / 100)}=${dec(value)}`), { price, up, down })
}

function initialQuestion(random: Random): GizMoneyRaceQuestion | null {
    const before = randomInt(random, 2, 40) * 10
    const rate = pick(random, [10, 20, 25, 50])
    const after = before * (1 + rate / 100)
    const answer = fraction(before)
    const choices = options(random, answer, [near(after * (1 - rate / 100), 'subtracted'), near(after - rate, 'subtracted'), near(after * (1 + rate / 100), 'calculation')])
    return choices && build(0, 'initial', say(`% ${rate} igo ondoren, ${dec(after)} euro. Zenbat zen lehen?`, `Tras subir un ${rate} %, ${dec(after)} euros. ¿Cuánto era antes?`, `بعد ارتفاع ${rate} %: ‏${dec(after)} يورو. كم كان قبل؟`, `After a ${rate}% rise, ${dec(after)} euros. How much was it before?`), choices, answer, same(`\\frac{${dec(after)}}{${dec(1 + rate / 100)}}=${before}`), { before, rate })
}

/* ---------- Circuit 1: compound interest ---------- */

function finalQuestion(random: Random): GizMoneyRaceQuestion | null {
    const capital = randomInt(random, 1, 10) * 1000
    const rate = pick(random, [2, 3, 4, 5, 10])
    const years = pick(random, [2, 3])
    const value = capital * (1 + rate / 100) ** years
    const answer = exactTo(value)
    const choices = options(random, answer, [near(capital * (1 + (rate * years) / 100), 'simple'), near(capital * (1 + rate / 100), 'calculation'), near(capital * (1 + rate / 100) ** (years + 1), 'calculation')])
    return choices && build(1, 'final', say(`${capital} euro, % ${rate}, ${years} urte (konposatua). Zenbat amaieran?`, `${capital} euros al ${rate} % durante ${years} años (compuesto). ¿Cuánto al final?`, `${capital} يورو بفائدة ${rate} % لمدة ${years} سنوات (مركبة). كم في النهاية؟`, `${capital} euros at ${rate}% for ${years} years (compound). How much at the end?`), choices, answer, same(`${capital}\\cdot ${dec(1 + rate / 100)}^{${years}}=${dec(value)}`), { capital, rate, years })
}

function yearsQuestion(random: Random): GizMoneyRaceQuestion | null {
    const rate = pick(random, [3, 4, 5, 6, 8, 10])
    const goal = pick(random, [2, 3])
    const exact = Math.log(goal) / Math.log(1 + rate / 100)
    const years = Math.ceil(exact)
    if (years - exact < 0.05) return null
    const answer = fraction(years)
    const choices = options(random, answer, [{ value: fraction(Math.floor(exact)), error: 'calculation' }, { value: fraction(Math.round((goal * 100) / rate)), error: 'divided' }, { value: fraction(years + 2), error: 'calculation' }])
    return choices && build(1, 'years', say(`Zenbat urtetan biderkatzen da kapitala ${goal} aldiz, interesa % ${rate} bada?`, `¿En cuántos años se multiplica por ${goal} un capital al ${rate} %?`, `في كم سنة يُضرب رأس المال في ${goal} بفائدة ${rate} %؟`, `In how many years is a capital multiplied by ${goal} at ${rate}%?`), choices, answer, same(`\\frac{\\log ${goal}}{\\log ${dec(1 + rate / 100)}}\\approx ${dec(exact)}\\ \\to\\ ${years}`), { rate, goal, years })
}

/* ---------- Circuit 2: the APR ---------- */

function taeQuestion(random: Random): GizMoneyRaceQuestion | null {
    const rate = pick(random, [4, 6, 8, 12])
    const periods = pick(random, [2, 4, 12])
    const value = ((1 + rate / 100 / periods) ** periods - 1) * 100
    const answer = exactTo(value)
    const choices = options(random, answer, [{ value: fraction(rate), error: 'nominal' }, near(rate + 1, 'calculation'), near(rate / periods, 'calculation')])
    return choices && build(2, 'tae', say(`Urteko % ${rate}, urtean ${periods} aldiz ordainduta. Urteko tasa baliokidea, %?`, `Un ${rate} % anual pagado ${periods} veces al año. ¿TAE, en %?`, `${rate} % سنويًا تُدفع ${periods} مرات في السنة. المعدل السنوي المكافئ بالنسبة المئوية؟`, `${rate}% a year paid ${periods} times a year. APR, in %?`), choices, answer, same(`\\left(1+\\frac{${dec(rate / 100)}}{${periods}}\\right)^{${periods}}-1\\approx ${dec(value / 100, 4)}`), { rate, periods })
}

function feeQuestion(random: Random): GizMoneyRaceQuestion | null {
    const rate = pick(random, [5, 6, 8, 10])
    const fee = pick(random, [1, 2, 4])
    const value = ((1 + rate / 100) / (1 - fee / 100) - 1) * 100
    const answer = exactTo(value)
    const choices = options(random, answer, [{ value: fraction(rate), error: 'fee' }, { value: fraction(rate + fee), error: 'calculation' }, near(rate - fee, 'calculation')])
    return choices && build(2, 'fee', say(`Mailegua urtebetean, % ${rate}, eta % ${fee} komisioa sinatzean. Urteko tasa baliokidea, %?`, `Préstamo a un año al ${rate} % con una comisión del ${fee} % al firmar. ¿TAE, en %?`, `قرض لسنة بفائدة ${rate} % وعمولة ${fee} % عند التوقيع. المعدل السنوي المكافئ بالنسبة المئوية؟`, `A one-year loan at ${rate}% with a ${fee}% fee when signing. APR, in %?`), choices, answer, same(`\\frac{${dec(1 + rate / 100)}}{${dec(1 - fee / 100)}}-1\\approx ${dec(value / 100, 4)}`), { rate, fee })
}

/* ---------- Circuit 3: saving ---------- */

function sumQuestion(random: Random): GizMoneyRaceQuestion | null {
    const first = randomInt(random, 1, 10)
    const ratio = pick(random, [2, 3])
    const terms = randomInt(random, 3, 6)
    const value = (first * (ratio ** terms - 1)) / (ratio - 1)
    const answer = fraction(value)
    const choices = options(random, answer, [{ value: fraction(first * ratio ** terms, ratio - 1), error: 'minus-one' }, { value: fraction(first * ratio ** (terms - 1)), error: 'calculation' }, { value: fraction(first * ratio * terms), error: 'calculation' }])
    const list = Array.from({ length: Math.min(terms, 3) }, (_, index) => first * ratio ** index).join(',\\ ')
    return choices && build(3, 'sum', say(`Batu ${math(`${list},\\ldots`)} progresioaren lehen ${terms} gaiak.`, `Suma los ${terms} primeros términos de ${math(`${list},\\ldots`)}`, `اجمع الحدود ${terms} الأولى من ${math(`${list},\\ldots`)}`, `Add the first ${terms} terms of ${math(`${list},\\ldots`)}`), choices, answer, same(`${first}\\cdot\\frac{${ratio}^{${terms}}-1}{${ratio}-1}=${value}`), { first, ratio, terms })
}

function termQuestion(random: Random): GizMoneyRaceQuestion | null {
    const capital = randomInt(random, 1, 5) * 1000
    const rate = pick(random, [2, 5, 10])
    const year = randomInt(random, 2, 4)
    const value = capital * (1 + rate / 100) ** year
    const answer = exactTo(value)
    const choices = options(random, answer, [near(capital * (1 + rate / 100) ** (year - 1), 'power'), near(capital * (1 + (rate * year) / 100), 'simple'), near(capital * (1 + rate / 100) ** (year + 1), 'power')])
    return choices && build(3, 'term', say(`${capital} euroko gordailua % ${rate} hazten da urtero. Zenbat da ${year}. urtearen amaieran?`, `Un depósito de ${capital} euros crece un ${rate} % cada año. ¿Cuánto vale al final del año ${year}?`, `وديعة ${capital} يورو تنمو ${rate} % كل سنة. كم قيمتها في نهاية السنة ${year}؟`, `A deposit of ${capital} euros grows ${rate}% each year. What is it worth at the end of year ${year}?`), choices, answer, same(`${capital}\\cdot ${dec(1 + rate / 100)}^{${year}}=${dec(value)}`), { capital, rate, year })
}

/* ---------- Circuit 4: loans ---------- */

function interestQuestion(random: Random): GizMoneyRaceQuestion | null {
    const capital = randomInt(random, 4, 30) * 1000
    const rate = pick(random, [3, 4, 5, 6])
    const repaid = randomInt(random, 2, 6) * 500
    const debt = capital - repaid
    const value = (debt * rate) / 100
    const answer = exactTo(value)
    const choices = options(random, answer, [near((capital * rate) / 100, 'first-capital'), near((repaid * rate) / 100, 'calculation'), near((debt * rate) / 1000, 'calculation')])
    return choices && build(4, 'interest', say(`${capital} euroko mailegua, % ${rate}; lehen urtean ${repaid} euro amortizatu dira. Bigarren urteko interesak?`, `Préstamo de ${capital} euros al ${rate} %; el primer año se amortizaron ${repaid} euros. ¿Intereses del segundo año?`, `قرض ${capital} يورو بفائدة ${rate} %، وأُطفئ في السنة الأولى ${repaid} يورو. فوائد السنة الثانية؟`, `A loan of ${capital} euros at ${rate}%; ${repaid} euros were repaid in the first year. Second-year interest?`), choices, answer, same(`${debt}\\cdot ${dec(rate / 100)}=${dec(value)}`), { debt, rate })
}

function repaidQuestion(random: Random): GizMoneyRaceQuestion | null {
    const debt = randomInt(random, 4, 30) * 1000
    const rate = pick(random, [3, 4, 5, 6, 8])
    const interest = (debt * rate) / 100
    const payment = interest + randomInt(random, 2, 8) * 250
    const value = payment - interest
    const answer = fraction(value)
    const choices = options(random, answer, [{ value: fraction(payment), error: 'whole-payment' }, { value: fraction(interest), error: 'calculation' }, { value: fraction(debt - payment), error: 'whole-payment' }])
    return choices && build(4, 'repaid', say(`Zorra ${debt} euro, % ${rate}, eta ${payment} euroko urtekoa. Zenbat amortizatzen da?`, `Deuda de ${debt} euros al ${rate} % y anualidad de ${payment} euros. ¿Cuánto se amortiza?`, `دين ${debt} يورو بفائدة ${rate} % ودفعة سنوية ${payment} يورو. كم يُطفأ؟`, `A debt of ${debt} euros at ${rate}% and a yearly payment of ${payment} euros. How much is repaid?`), choices, answer, same(`${payment}-${debt}\\cdot ${dec(rate / 100)}=${value}`), { debt, rate, payment })
}

function cancelQuestion(random: Random): GizMoneyRaceQuestion | null {
    const debt = randomInt(random, 2, 30) * 1000
    const fee = pick(random, [1, 2, 3])
    const instalments = randomInt(random, 2, 4)
    const value = debt * (1 + fee / 100)
    const answer = exactTo(value)
    const choices = options(random, answer, [{ value: fraction((debt * fee) / 100), error: 'calculation' }, near((debt / instalments) * 1.1 * instalments * (1 + fee / 100), 'instalments'), { value: fraction(debt), error: 'calculation' }])
    return choices && build(4, 'cancel', say(`Zor bizia ${debt} euro, ezeztatzeko komisioa % ${fee}. Zenbat ordaintzen da?`, `Deuda pendiente de ${debt} euros, comisión de cancelación del ${fee} %. ¿Cuánto se paga?`, `دين متبقٍ ${debt} يورو وعمولة إلغاء ${fee} %. كم يُدفع؟`, `Outstanding debt of ${debt} euros, cancellation fee ${fee}%. How much is paid?`), choices, answer, same(`${debt}\\cdot ${dec(1 + fee / 100)}=${dec(value)}`), { debt, fee })
}

type Generator = (random: Random, tier: Tier) => GizMoneyRaceQuestion | null

const circuitGenerators: Generator[][] = [
    [chainQuestion, initialQuestion],
    [finalQuestion, yearsQuestion],
    [taeQuestion, feeQuestion],
    [sumQuestion, termQuestion],
    [interestQuestion, repaidQuestion, cancelQuestion]
]

export function generateGizMoneyRaceQuestion(random: Random, circuit: number, tier: Tier): GizMoneyRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkGizMoneyPitAnswer(question: RaceQuestion<GizMoneyRaceError>, input: string): AnswerCheck {
    return checkAnswer(input, question.answer, question.answerForm)
}

export function gizMoneyParTime(circuit: number): number {
    return parTimeFor([12, 13, 14, 13, 13][circuit] ?? 13)
}

export const gizMoneyRaceErrorTips: Record<GizMoneyRaceError, LocalizedText> = {
    added: say('Ehunekoak ez dira batzen: indizeak biderkatzen dira.', 'Los porcentajes no se suman: se multiplican los índices.', 'النسب لا تُجمع بل تُضرب المؤشرات.', 'Percentages do not add: the indexes multiply.'),
    subtracted: say('Hasierakoa: zatitu indizeaz, ez kendu ehunekoa.', 'El inicial: divide entre el índice, no restes el porcentaje.', 'الأصلي: اقسم على المؤشر ولا تطرح النسبة.', 'The starting value: divide by the index, do not subtract the percentage.'),
    simple: say('Konposatua: C · (1 + i)ⁿ, ez C · (1 + n · i).', 'Compuesto: C · (1 + i)ⁿ, no C · (1 + n · i).', 'المركبة: C · (1 + i)ⁿ لا C · (1 + n · i).', 'Compound: C · (1 + i)ⁿ, not C · (1 + n · i).'),
    divided: say('Urteak logaritmoekin askatzen dira, ez zatituz.', 'Los años se despejan con logaritmos, no dividiendo.', 'السنوات تُعزل باللوغاريتمات لا بالقسمة.', 'The years come from logarithms, not from dividing.'),
    nominal: say('Aldi batzuetan ordainduta, urteko tasa baliokidea nominala baino handiagoa da.', 'Pagado en varios periodos, la TAE es mayor que el nominal.', 'عند الدفع على فترات يكون المعدل أكبر من الاسمي.', 'Paid in several periods, the APR is greater than the nominal rate.'),
    fee: say('Komisioarekin gutxiago jasotzen da: tasa handiagoa.', 'Con comisión se recibe menos: la TAE es mayor.', 'مع العمولة تستلم أقل: المعدل أكبر.', 'With a fee you receive less: the APR is higher.'),
    'minus-one': say('Sₙ = a₁ · (rⁿ − 1) : (r − 1): ez ahaztu −1.', 'Sₙ = a₁ · (rⁿ − 1) ÷ (r − 1): no olvides el −1.', 'Sₙ = a₁ · (rⁿ − 1) ÷ (r − 1): لا تنسَ −1.', 'Sₙ = a₁ · (rⁿ − 1) ÷ (r − 1): do not forget the −1.'),
    power: say('n urte: berretzailea n.', 'n años: exponente n.', 'n سنوات: الأس n.', 'n years: exponent n.'),
    'first-capital': say('Interesak urte horretako zorraren gainean.', 'Los intereses, sobre la deuda de ese año.', 'الفوائد على دين تلك السنة.', 'Interest on that year\'s debt.'),
    'whole-payment': say('Amortizazioa = urtekoa − interesak.', 'Amortización = anualidad − intereses.', 'الإطفاء = الدفعة − الفوائد.', 'Repayment = payment − interest.'),
    instalments: say('Ezeztatzeko, zor bizia eta komisioa; ez kuotak.', 'Para cancelar, la deuda pendiente y la comisión; no las cuotas.', 'للإلغاء: الدين المتبقي والعمولة لا الأقساط.', 'To cancel: the outstanding debt and the fee, not the instalments.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}
