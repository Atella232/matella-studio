import { checkAnswer, fraction, toNumber, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { written } from '../../batx1-zientziak-errealak/games/race.ts'
import { readStatisticsAnswer } from '../../dbh2-estatistika-v2/answers.ts'
import { say } from '../../batx2-zientziak-probabilitatea/lab/probability.ts'
import { choose } from '../../batx2-zientziak-banaketak/binomial.ts'

/* ==========================================================================
   Banaketen lasterketa (Batxilergoa 1 · Gizarte Zientziak): four circuits,
   one per stage — review (two draws with and without replacement, the
   orders of k heads), variable (the missing probability, μ of a table,
   the gain of a raffle), binomial (P(X = k) with p = 0,5, μ = np,
   σ² = npq, «at least one») and fit (p = x̄/n, an expected value, the
   largest difference as a percentage). The wrong options are the typical
   mistakes; every question carries `meta`, the numbers the tests check.
   ========================================================================== */

export const DISCRETE_BATX1G_RACE_CIRCUITS = 4

export type DiscreteBatx1gRaceError =
    | 'replacement'
    | 'order'
    | 'sum'
    | 'weights'
    | 'cost'
    | 'coefficient'
    | 'variance'
    | 'mean'
    | 'multiply'
    | 'trials'
    | 'probability'
    | 'percent'
    | 'calculation'

export type DiscreteBatx1gRaceQuestion = RaceQuestion<DiscreteBatx1gRaceError> & { meta: Record<string, number> }

interface Candidate {
    value: FractionValue
    error: DiscreteBatx1gRaceError
}
const as = (value: FractionValue, error: DiscreteBatx1gRaceError): Candidate => ({ value, error })
const nearby = (value: FractionValue): Candidate[] => {
    const number = toNumber(value)
    if (Number.isInteger(number)) return [number + 1, number - 1, number * 2].map((item) => as(fraction(item), 'calculation'))
    return [fraction(value.numerator + 1, value.denominator), fraction(Math.max(1, value.numerator - 1), value.denominator), fraction(value.numerator, value.denominator + 1)].map((item) => as(item, 'calculation'))
}

/** The right option and three different mistakes */
function options(random: Random, right: FractionValue, candidates: Candidate[], allowNegative = false): RaceOption<DiscreteBatx1gRaceError>[] | null {
    const rightLatex = written(right)
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: DiscreteBatx1gRaceError }> = []
    for (const candidate of [...candidates, ...nearby(right)]) {
        if (wrong.length === 3) break
        if (!allowNegative && candidate.value.numerator < 0) continue
        const latex = written(candidate.value)
        if (latex === null || used.has(latex)) continue
        used.add(latex)
        wrong.push({ latex, error: candidate.error })
    }
    if (wrong.length < 3) return null
    return shuffle(random, [{ latex: rightLatex, correct: true, error: null }, ...wrong.map((item) => ({ latex: item.latex, correct: false, error: item.error }))])
}

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<DiscreteBatx1gRaceError>[], answer: FractionValue, solution: LocalizedText, meta: Record<string, number>): DiscreteBatx1gRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution, meta }
}

const all = (latex: string) => say(`$${latex}$`, `$${latex}$`, `$${latex}$`, `$${latex}$`)
const tenths = (value: number) => String(value / 10).replace('.', '{,}')
const frac = (value: FractionValue) => written(value) ?? `\\frac{${value.numerator}}{${value.denominator}}`

/* ---------- Circuit 0: review ---------- */

function drawsQuestion(random: Random): DiscreteBatx1gRaceQuestion | null {
    const red = randomInt(random, 2, 5)
    const other = randomInt(random, 1, 5)
    const total = red + other
    const back = random() < 0.5
    const answer = back ? fraction(red * red, total * total) : fraction(red * (red - 1), total * (total - 1))
    const otherWay = back ? fraction(red * (red - 1), total * (total - 1)) : fraction(red * red, total * total)
    const choices = options(random, answer, [as(otherWay, 'replacement'), as(fraction(red, total), 'calculation'), as(fraction(2 * red, total), 'calculation')])
    const prompt = back
        ? say(`Kutxa batean ${red} gorri eta ${other} berde. Bi ateratzen dira, itzulita. P(bi gorri)?`, `Una caja con ${red} rojas y ${other} verdes. Se sacan dos con devolución. ¿P(dos rojas)?`, `صندوق فيه ${red} حمراء و${other} خضراء. تُسحب كرتان مع الإرجاع. ما احتمال حمراوين؟`, `A box with ${red} red and ${other} green. Two are drawn with replacement. P(two red)?`)
        : say(`Kutxa batean ${red} gorri eta ${other} berde. Bi ateratzen dira, itzuli gabe. P(bi gorri)?`, `Una caja con ${red} rojas y ${other} verdes. Se sacan dos sin devolución. ¿P(dos rojas)?`, `صندوق فيه ${red} حمراء و${other} خضراء. تُسحب كرتان دون إرجاع. ما احتمال حمراوين؟`, `A box with ${red} red and ${other} green. Two are drawn without replacement. P(two red)?`)
    const work = back ? `\\frac{${red}}{${total}}\\cdot\\frac{${red}}{${total}}=${frac(answer)}` : `\\frac{${red}}{${total}}\\cdot\\frac{${red - 1}}{${total - 1}}=${frac(answer)}`
    return choices && build(0, 'draws', prompt, choices, answer, all(work), { red, other, back: back ? 1 : 0 })
}

function ordersQuestion(random: Random): DiscreteBatx1gRaceQuestion | null {
    const n = randomInt(random, 3, 6)
    const k = randomInt(random, 1, n - 1)
    const answer = fraction(choose(n, k), 2 ** n)
    const choices = options(random, answer, [as(fraction(1, 2 ** n), 'order'), as(fraction(k, n), 'calculation'), as(fraction(choose(n, k), n + 1), 'calculation')])
    return choices && build(0, 'orders', say(`Txanpon bat ${n} aldiz botatzen da. P(zehazki ${k} aurpegi)?`, `Se lanza una moneda ${n} veces. ¿P(exactamente ${k} caras)?`, `تُرمى قطعة نقود ${n} مرات. ما احتمال ${k} أوجه بالضبط؟`, `A coin is tossed ${n} times. P(exactly ${k} heads)?`), choices, answer, all(`\\binom{${n}}{${k}}\\cdot\\frac{1}{${2 ** n}}=${frac(answer)}`), { n, k })
}

/* ---------- Circuit 1: discrete random variable ---------- */

function missingQuestion(random: Random): DiscreteBatx1gRaceQuestion | null {
    const known = [randomInt(random, 1, 4), randomInt(random, 1, 3), randomInt(random, 1, 3)]
    const rest = 10 - known.reduce((sum, value) => sum + value, 0)
    if (rest < 1) return null
    const answer = fraction(rest, 10)
    const sum = fraction(10 - rest, 10)
    const choices = options(random, answer, [as(sum, 'sum'), as(fraction(1, 4), 'calculation'), as(fraction(rest + 1, 10), 'calculation')])
    const list = known.map(tenths).join(';\\ ')
    return choices && build(1, 'missing', say(`$X$: 0, 1, 2, 3 probabilitateak $${list};\\ k$. Zenbat da $k$?`, `$X$: 0, 1, 2, 3 con probabilidades $${list};\\ k$. ¿Cuánto vale $k$?`, `$X$: 0 و1 و2 و3 باحتمالات $${list};\\ k$. كم يساوي $k$؟`, `$X$: 0, 1, 2, 3 with probabilities $${list};\\ k$. What is $k$?`), choices, answer, all(`k=1-${tenths(10 - rest)}=${tenths(rest)}`), { rest })
}

function meanQuestion(random: Random): DiscreteBatx1gRaceQuestion | null {
    const a = randomInt(random, 1, 7)
    const b = randomInt(random, 1, 9 - a)
    const c = 10 - a - b
    if (c < 1) return null
    // values 1, 2, 3
    const answer = fraction(a + 2 * b + 3 * c, 10)
    const choices = options(random, answer, [as(fraction(2), 'weights'), as(fraction(a + b + c, 10), 'calculation'), as(fraction(a + 4 * b + 9 * c, 10), 'calculation')])
    return choices && build(1, 'mean', say(`$X$: 1, 2, 3 probabilitateak $${tenths(a)};\\ ${tenths(b)};\\ ${tenths(c)}$. Zenbat da $\\mu$?`, `$X$: 1, 2, 3 con probabilidades $${tenths(a)};\\ ${tenths(b)};\\ ${tenths(c)}$. ¿Cuánto vale $\\mu$?`, `$X$: 1 و2 و3 باحتمالات $${tenths(a)};\\ ${tenths(b)};\\ ${tenths(c)}$. كم يساوي $\\mu$؟`, `$X$: 1, 2, 3 with probabilities $${tenths(a)};\\ ${tenths(b)};\\ ${tenths(c)}$. What is $\\mu$?`), choices, answer, all(`\\mu=${tenths(a)}+2\\cdot ${tenths(b)}+3\\cdot ${tenths(c)}=${frac(answer)}`), { a, b, c })
}

function gainQuestion(random: Random): DiscreteBatx1gRaceQuestion | null {
    const tickets = pick(random, [100, 200, 500])
    const price = randomInt(random, 1, 3)
    const prizes = 50 * randomInt(random, 1, 8)
    const mean = fraction(prizes, tickets)
    const answer = fraction(prizes - price * tickets, tickets)
    const choices = options(random, answer, [as(mean, 'cost'), as(fraction(price * tickets - prizes, tickets), 'cost'), as(fraction(prizes - price, 1), 'probability')], true)
    return choices && build(1, 'gain', say(`${tickets} txartel, bakoitza ${price} €, eta ${prizes} € sarietan. Batez besteko irabazia, eurotan?`, `${tickets} boletos a ${price} € y ${prizes} € en premios. ¿Ganancia media, en euros?`, `${tickets} بطاقة بسعر ${price} € و${prizes} € جوائز. الربح المتوسط باليورو؟`, `${tickets} tickets at €${price} and €${prizes} in prizes. Mean gain, in euros?`), choices, answer, all(`\\frac{${prizes}}{${tickets}}-${price}=${frac(answer)}`), { tickets, price, prizes })
}

/* ---------- Circuit 2: binomial ---------- */

function pmfQuestion(random: Random): DiscreteBatx1gRaceQuestion | null {
    const n = randomInt(random, 3, 6)
    const k = randomInt(random, 1, n - 1)
    const answer = fraction(choose(n, k), 2 ** n)
    const choices = options(random, answer, [as(fraction(1, 2 ** n), 'coefficient'), as(fraction(k, n), 'calculation'), as(fraction(choose(n, k), 2 ** (n - 1)), 'calculation')])
    return choices && build(2, 'pmf', say(`$X\\sim B(${n};\\,0{,}5)$. Zenbat da $P(X=${k})$?`, `$X\\sim B(${n};\\,0{,}5)$. ¿Cuánto vale $P(X=${k})$?`, `$X\\sim B(${n};\\,0{,}5)$. كم يساوي $P(X=${k})$؟`, `$X\\sim B(${n};\\,0{,}5)$. What is $P(X=${k})$?`), choices, answer, all(`\\binom{${n}}{${k}}\\cdot 0{,}5^{${n}}=${frac(answer)}`), { n, k })
}

function binomialMeanQuestion(random: Random): DiscreteBatx1gRaceQuestion | null {
    const n = 10 * randomInt(random, 1, 20)
    const p = randomInt(random, 1, 9)
    const answer = fraction(n * p, 10)
    const choices = options(random, answer, [as(fraction(n * p * (10 - p), 100), 'variance'), as(fraction(n * (10 - p), 10), 'calculation'), as(fraction(n, 2), 'calculation')])
    return choices && build(2, 'binomialMean', say(`$X\\sim B(${n};\\,${tenths(p)})$. Zenbat da $\\mu$?`, `$X\\sim B(${n};\\,${tenths(p)})$. ¿Cuánto vale $\\mu$?`, `$X\\sim B(${n};\\,${tenths(p)})$. كم يساوي $\\mu$؟`, `$X\\sim B(${n};\\,${tenths(p)})$. What is $\\mu$?`), choices, answer, all(`\\mu=${n}\\cdot ${tenths(p)}=${frac(answer)}`), { n, p })
}

function binomialVarianceQuestion(random: Random): DiscreteBatx1gRaceQuestion | null {
    const n = 10 * randomInt(random, 1, 10)
    const p = randomInt(random, 1, 9)
    const answer = fraction(n * p * (10 - p), 100)
    const choices = options(random, answer, [as(fraction(n * p, 10), 'mean'), as(fraction(n * p * p, 100), 'calculation'), as(fraction(n * (10 - p), 10), 'calculation')])
    return choices && build(2, 'variance', say(`$X\\sim B(${n};\\,${tenths(p)})$. Zenbat da $\\sigma^2$?`, `$X\\sim B(${n};\\,${tenths(p)})$. ¿Cuánto vale $\\sigma^2$?`, `$X\\sim B(${n};\\,${tenths(p)})$. كم يساوي $\\sigma^2$؟`, `$X\\sim B(${n};\\,${tenths(p)})$. What is $\\sigma^2$?`), choices, answer, all(`\\sigma^2=${n}\\cdot ${tenths(p)}\\cdot ${tenths(10 - p)}=${frac(answer)}`), { n, p })
}

function atLeastQuestion(random: Random): DiscreteBatx1gRaceQuestion | null {
    const n = randomInt(random, 2, 3)
    const p = pick(random, [1, 2, 3, 4, 6, 7, 8, 9])
    const q = 10 - p
    const answer = fraction(10 ** n - q ** n, 10 ** n)
    const choices = options(random, answer, [as(fraction(10 ** n - p ** n, 10 ** n), 'multiply'), as(fraction(q ** n, 10 ** n), 'calculation'), as(fraction(n * p, 10), 'calculation')])
    return choices && build(2, 'atLeast', say(`$X\\sim B(${n};\\,${tenths(p)})$. Zenbat da $P(X\\ge 1)$?`, `$X\\sim B(${n};\\,${tenths(p)})$. ¿Cuánto vale $P(X\\ge 1)$?`, `$X\\sim B(${n};\\,${tenths(p)})$. كم يساوي $P(X\\ge 1)$؟`, `$X\\sim B(${n};\\,${tenths(p)})$. What is $P(X\\ge 1)$?`), choices, answer, all(`1-${tenths(q)}^{${n}}=${frac(answer)}`), { n, p })
}

/* ---------- Circuit 3: fitting ---------- */

function estimateQuestion(random: Random): DiscreteBatx1gRaceQuestion | null {
    const trials = randomInt(random, 2, 6)
    const p = randomInt(random, 1, 9)
    const data = pick(random, [40, 50, 80, 100])
    const mean = fraction(trials * p, 10)
    const answer = fraction(p, 10)
    const choices = options(random, answer, [as(fraction(trials * p, 10 * data), 'trials'), as(fraction(10 * trials, trials * p), 'calculation'), as(mean, 'calculation')])
    return choices && build(3, 'estimate', say(`${data} datu, ${trials} proba bakoitzean, $\\bar{x}=${frac(mean)}$. Zein $p$?`, `${data} datos de ${trials} pruebas, $\\bar{x}=${frac(mean)}$. ¿Qué $p$?`, `${data} معطى من ${trials} محاولات، $\\bar{x}=${frac(mean)}$. ما $p$؟`, `${data} data of ${trials} trials, $\\bar{x}=${frac(mean)}$. Which $p$?`), choices, answer, all(`p=\\frac{${frac(mean)}}{${trials}}=${frac(answer)}`), { trials, p, data })
}

function expectedQuestion(random: Random): DiscreteBatx1gRaceQuestion | null {
    const trials = randomInt(random, 2, 4)
    const data = 2 ** trials * randomInt(random, 2, 10)
    const k = randomInt(random, 0, trials)
    const probability = fraction(choose(trials, k), 2 ** trials)
    const answer = fraction(data * choose(trials, k), 2 ** trials)
    const choices = options(random, answer, [as(probability, 'probability'), as(fraction(data, trials + 1), 'calculation'), as(fraction(data, 2), 'calculation')])
    return choices && build(3, 'expected', say(`${data} datu eta $B(${trials};\\,0{,}5)$. Zenbat espero dira $X=${k}$ balioarekin?`, `${data} datos y una $B(${trials};\\,0{,}5)$. ¿Cuántos se esperan con $X=${k}$?`, `${data} معطى و$B(${trials};\\,0{,}5)$. كم يُتوقع مع $X=${k}$؟`, `${data} data and a $B(${trials};\\,0{,}5)$. How many are expected with $X=${k}$?`), choices, answer, all(`${data}\\cdot ${frac(probability)}=${frac(answer)}`), { trials, data, k })
}

function percentQuestion(random: Random): DiscreteBatx1gRaceQuestion | null {
    const data = pick(random, [40, 50, 80, 100, 200])
    const largest = randomInt(random, 1, 12)
    const answer = fraction(100 * largest, data)
    const choices = options(random, answer, [as(fraction(largest, data), 'percent'), as(fraction(largest), 'percent'), as(fraction(data, largest), 'calculation')])
    return choices && build(3, 'percent', say(`${data} datu, eta diferentziarik handiena ${largest}. Zer ehuneko da?`, `${data} datos y la mayor diferencia es ${largest}. ¿Qué porcentaje es?`, `${data} معطى وأكبر فرق ${largest}. ما النسبة المئوية؟`, `${data} data and the largest difference is ${largest}. What percentage is it?`), choices, answer, all(`\\frac{${largest}}{${data}}\\cdot 100=${frac(answer)}`), { data, largest })
}

const circuitGenerators: Array<Array<(random: Random, tier: Tier) => DiscreteBatx1gRaceQuestion | null>> = [
    [drawsQuestion, ordersQuestion],
    [missingQuestion, meanQuestion, gainQuestion],
    [pmfQuestion, binomialMeanQuestion, binomialVarianceQuestion, atLeastQuestion],
    [estimateQuestion, expectedQuestion, percentQuestion]
]

export function generateDiscreteBatx1gRaceQuestion(random: Random, circuit: number, tier: Tier): DiscreteBatx1gRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkDiscreteBatx1gPitAnswer(question: RaceQuestion<DiscreteBatx1gRaceError>, input: string): AnswerCheck {
    return checkAnswer(readStatisticsAnswer(input), question.answer, question.answerForm)
}

export function discreteBatx1gParTime(circuit: number): number {
    return parTimeFor([12, 12, 13, 12][circuit] ?? 12)
}

export const discreteBatx1gRaceErrorTips: Record<DiscreteBatx1gRaceError, LocalizedText> = {
    replacement: say('Itzulita, probabilitate bera bi aldiz; itzuli gabe, bigarrena kutxan geratzen denarekin.', 'Con devolución, la misma probabilidad dos veces; sin devolución, la segunda con lo que queda.', 'مع الإرجاع الاحتمال نفسه مرتين؛ ودونه الثانية بما بقي.', 'With replacement, the same probability twice; without, the second with what is left.'),
    order: say('Ez ahaztu ordena kopurua: $\\binom{n}{k}$.', 'No olvides el número de órdenes: $\\binom{n}{k}$.', 'لا تنسَ عدد الترتيبات: $\\binom{n}{k}$.', 'Do not forget the number of orders: $\\binom{n}{k}$.'),
    sum: say('Guztiek 1 egiten dute batuta: falta dena 1 ken besteak da.', 'Todas suman 1: la que falta es 1 menos las demás.', 'مجموعها كلها 1: الناقص هو 1 ناقص الباقي.', 'They all add up to 1: the missing one is 1 minus the others.'),
    weights: say('Balio bakoitzak bere probabilitatearen pisua du.', 'Cada valor pesa según su probabilidad.', 'لكل قيمة وزن بحسب احتمالها.', 'Each value is weighted by its probability.'),
    cost: say('Irabazia = batez besteko saria ken prezioa.', 'Ganancia = premio medio menos el precio.', 'الربح = الجائزة المتوسطة ناقص الثمن.', 'Gain = mean prize minus the price.'),
    coefficient: say('Ez ahaztu ordenak: $\\binom{n}{k}$.', 'No olvides los órdenes: $\\binom{n}{k}$.', 'لا تنسَ الترتيبات: $\\binom{n}{k}$.', 'Do not forget the orders: $\\binom{n}{k}$.'),
    variance: say('Hori bariantza da, $npq$.', 'Eso es la varianza, $npq$.', 'هذا هو التباين $npq$.', 'That is the variance, $npq$.'),
    mean: say('Hori batez bestekoa da, $np$.', 'Eso es la media, $np$.', 'هذا هو المتوسط $np$.', 'That is the mean, $np$.'),
    multiply: say('«Gutxienez bat» kalkulatzeko, erabili aurkakoa: $1-q^n$.', 'Para «al menos uno», usa el contrario: $1-q^n$.', 'لـ «واحد على الأقل» استعمل المعاكس: $1-q^n$.', 'For ‘at least one’, use the complement: $1-q^n$.'),
    trials: say('$n$ datu bakoitzeko proba kopurua da, ez datu kopurua.', '$n$ es el número de pruebas de cada dato, no el número de datos.', '$n$ عدد المحاولات في كل معطى لا عدد المعطيات.', '$n$ is the number of trials in each datum, not the number of data.'),
    probability: say('Biderkatu datu kopuruaz: $N\\cdot P(X=k)$.', 'Multiplica por el número de datos: $N\\cdot P(X=k)$.', 'اضرب في عدد المعطيات: $N\\cdot P(X=k)$.', 'Multiply by the number of data: $N\\cdot P(X=k)$.'),
    percent: say('Zatitu guztizkoaz eta biderkatu 100 zenbakiaz.', 'Divide entre el total y multiplica por 100.', 'اقسم على الكل واضرب في 100.', 'Divide by the total and multiply by 100.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}
