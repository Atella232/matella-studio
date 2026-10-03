import { checkAnswer, divide, fraction, multiply, toExactDecimal, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { readProportionAnswer } from '../../dbh1-proportzionaltasuna-v2/answers.ts'

/* ==========================================================================
   Proportzionaltasunaren eta ehunekoen lasterketa (2. DBH): five circuits —
   proportions, compound proportionality, shares, percentages, and changes
   and interest. Every wrong option is a typical mistake: the relation
   taken the wrong way, only one factor applied, an inverse share done as a
   direct one, the value of one part, 5 % read as 0,5, dividing instead of
   multiplying, undoing a rise with the same percentage down, adding
   percentages instead of multiplying indices, one year of interest…
   Prompts never put a Basque suffix after a generated number.
   ========================================================================== */

export const PROPORTION_DBH2_RACE_CIRCUITS = 5

export type ProportionDbh2RaceError =
    | 'cross'
    | 'relation'
    | 'one-factor'
    | 'direct-share'
    | 'one-part'
    | 'decimal-place'
    | 'multiplied'
    | 'inverted'
    | 'undo-percent'
    | 'added-percents'
    | 'change-only'
    | 'one-year'
    | 'calculation'

export type ProportionDbh2RaceQuestion = RaceQuestion<ProportionDbh2RaceError>

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
const same = (latex: string): LocalizedText => ({ eu: latex, es: latex, ar: latex.replace(/\{,\}/g, '.') })
const math = (latex: string) => `$${latex}$`
const percentLatex = (percent: number | string) => `${percent}\\,\\%`
const percentEu = (percent: number | string) => `\\%\\,${percent}`

/** An exact decimal in LaTeX with the comma ({,}); only values that end with at most three decimals */
export function written(value: FractionValue): string | null {
    const text = toExactDecimal(value, ',')
    if (text === null || (text.split(',')[1] ?? '').length > 3 || text.length > 9) return null
    return text.replace(',', '{,}')
}

/** A number for a prompt or a worked line */
const w = (value: FractionValue) => written(value) ?? `\\frac{${value.numerator}}{${value.denominator}}`
const n = (value: number) => fraction(value)
const dec = (hundredths: number) => fraction(hundredths, 100)

interface Candidate {
    value: FractionValue
    error: ProportionDbh2RaceError
}

const near = (value: FractionValue): Candidate[] => [multiply(value, n(10)), divide(value, n(10)), multiply(value, n(2)), divide(value, n(2))].map((item) => ({ value: item, error: 'calculation' }))

/** The right option and three different mistakes, all positive and written as exact decimals */
function options(random: Random, right: FractionValue, candidates: Candidate[]): RaceOption<ProportionDbh2RaceError>[] | null {
    const rightLatex = written(right)
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: ProportionDbh2RaceError }> = []
    for (const candidate of candidates) {
        if (wrong.length === 3) break
        if (candidate.value.numerator <= 0) continue
        const latex = written(candidate.value)
        if (latex === null || used.has(latex)) continue
        used.add(latex)
        wrong.push({ latex, error: candidate.error })
    }
    if (wrong.length < 3) return null
    return shuffle(random, [{ latex: rightLatex, correct: true, error: null }, ...wrong.map((item) => ({ latex: item.latex, correct: false, error: item.error }))])
}

function question(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<ProportionDbh2RaceError>[], answer: FractionValue, solution: LocalizedText): ProportionDbh2RaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution }
}

/* ---------- Circuit 0: proportions ---------- */

function fourthQuestion(random: Random, tier: Tier): ProportionDbh2RaceQuestion | null {
    const a = randomInt(random, 2, tier === 0 ? 6 : 12)
    const k = pick(random, tier === 0 ? [2, 3, 4, 5] : [2, 3, 4, 6, 15, 25])
    const c = randomInt(random, 2, tier === 0 ? 9 : 20)
    if (c === a) return null
    const b = a * k
    const x = fraction(b * c, a)
    const choices = options(random, x, [{ value: fraction(a * c, b), error: 'cross' }, { value: fraction(a * b, c), error: 'cross' }, { value: n(b + c - a), error: 'calculation' }, ...near(x)])
    if (!choices) return null
    return question(0, 'fourth', same(math(`\\frac{${a}}{${b}}=\\frac{${c}}{x}`)), choices, x, same(math(`${a}\\cdot x=${b}\\cdot ${c}=${b * c}\\ \\to\\ x=${b * c}\\mathbin{:}${a}=${w(x)}`)))
}

function inverseQuestion(random: Random, tier: Tier): ProportionDbh2RaceQuestion | null {
    const known = randomInt(random, 2, tier === 0 ? 6 : 12)
    const wanted = randomInt(random, 2, tier === 0 ? 6 : 12)
    if (wanted === known) return null
    const total = known * wanted * randomInt(random, 1, tier === 2 ? 6 : 3)
    const time = total / known
    const answer = fraction(total, wanted)
    const choices = options(random, answer, [{ value: fraction(time * wanted, known), error: 'relation' }, { value: n(total), error: 'one-factor' }, ...near(answer)])
    if (!choices) return null
    return question(0, 'inverse', say(
        `${math(`${known}`)} langile: ${math(`${time}`)} egun. Zenbat egun ${math(`${wanted}`)} langile izanda?`,
        `${math(`${known}`)} obreros tardan ${math(`${time}`)} días. ¿Cuántos días tardan ${math(`${wanted}`)} obreros?`,
        `${math(`${known}`)} عمال يحتاجون ${math(`${time}`)} أيام. كم يومًا يحتاج ${math(`${wanted}`)} عمال؟`
    ), choices, answer, same(math(`${known}\\cdot ${time}=${total}\\ \\to\\ ${total}\\mathbin{:}${wanted}=${w(answer)}`)))
}

/* ---------- Circuit 1: compound proportionality ---------- */

const compoundContexts = [
    {
        // workers (inverse) and hours a day (inverse) → days
        first: say('langile', 'obreros', 'عمال'), second: say('ordu egunean', 'horas al día', 'ساعات يوميًا'), unknown: say('egun', 'días', 'أيام'),
        relations: ['inverse', 'inverse'] as const
    },
    {
        // machines (direct) and hours (direct) → pieces
        first: say('makina', 'máquinas', 'آلات'), second: say('ordu', 'horas', 'ساعات'), unknown: say('pieza', 'piezas', 'قطع'),
        relations: ['direct', 'direct'] as const
    },
    {
        // cows (inverse) and kilos of fodder (direct) → days
        first: say('behi', 'vacas', 'أبقار'), second: say('kg pentsu', 'kg de pienso', 'كغ علف'), unknown: say('egun', 'días', 'أيام'),
        relations: ['inverse', 'direct'] as const
    }
]

function compoundQuestion(random: Random, tier: Tier): ProportionDbh2RaceQuestion | null {
    const context = pick(random, compoundContexts)
    const firstOld = randomInt(random, 2, tier === 0 ? 6 : 12)
    const firstNew = randomInt(random, 2, tier === 0 ? 6 : 12)
    const secondOld = randomInt(random, 2, 10) * (context.relations[1] === 'direct' && context.unknown.es === 'días' ? 50 : 1)
    const secondNew = randomInt(random, 2, 10) * (context.relations[1] === 'direct' && context.unknown.es === 'días' ? 50 : 1)
    if (firstOld === firstNew || secondOld === secondNew) return null
    const known = n(randomInt(random, 2, tier === 0 ? 12 : 30) * (context.unknown.es === 'piezas' ? 10 : 1))
    const factorOf = (old: number, next: number, relation: 'direct' | 'inverse') => (relation === 'direct' ? fraction(next, old) : fraction(old, next))
    const first = factorOf(firstOld, firstNew, context.relations[0])
    const second = factorOf(secondOld, secondNew, context.relations[1])
    const answer = multiply(multiply(known, first), second)
    if (answer.denominator !== 1 && written(answer) === null) return null
    const flip = (relation: 'direct' | 'inverse') => (relation === 'direct' ? 'inverse' : 'direct')
    const choices = options(random, answer, [
        { value: multiply(multiply(known, factorOf(firstOld, firstNew, flip(context.relations[0]))), second), error: 'relation' },
        { value: multiply(multiply(known, first), factorOf(secondOld, secondNew, flip(context.relations[1]))), error: 'relation' },
        { value: multiply(known, first), error: 'one-factor' },
        { value: multiply(known, second), error: 'one-factor' },
        ...near(answer)
    ])
    if (!choices) return null
    const fractionLatex = (value: FractionValue) => (value.denominator === 1 ? `${value.numerator}` : `\\frac{${value.numerator}}{${value.denominator}}`)
    return question(1, `compound-${context.relations.join('-')}`, say(
        `${math(`${firstOld}`)} ${context.first.eu}, ${math(`${secondOld}`)} ${context.second.eu}: ${math(w(known))} ${context.unknown.eu}. Eta ${math(`${firstNew}`)} ${context.first.eu}, ${math(`${secondNew}`)} ${context.second.eu}?`,
        `${math(`${firstOld}`)} ${context.first.es}, ${math(`${secondOld}`)} ${context.second.es}: ${math(w(known))} ${context.unknown.es}. ¿Y con ${math(`${firstNew}`)} ${context.first.es} y ${math(`${secondNew}`)} ${context.second.es}?`,
        `${math(`${firstOld}`)} ${context.first.ar}، ${math(`${secondOld}`)} ${context.second.ar}: ${math(w(known))} ${context.unknown.ar}. فماذا مع ${math(`${firstNew}`)} ${context.first.ar} و${math(`${secondNew}`)} ${context.second.ar}؟`
    ), choices, answer, same(math(`${w(known)}\\cdot ${fractionLatex(first)}\\cdot ${fractionLatex(second)}=${w(answer)}`)))
}

/* ---------- Circuit 2: shares ---------- */

function directShareQuestion(random: Random, tier: Tier): ProportionDbh2RaceQuestion | null {
    const numbers = [randomInt(random, 1, 6), randomInt(random, 1, 6), randomInt(random, 2, tier === 0 ? 6 : 9)]
    const sum = numbers[0] + numbers[1] + numbers[2]
    const part = randomInt(random, 2, tier === 0 ? 10 : 40) * (tier === 2 ? 5 : 10)
    const total = sum * part
    const asked = pick(random, [0, 1, 2])
    const answer = n(numbers[asked] * part)
    const choices = options(random, answer, [{ value: n(part), error: 'one-part' }, { value: fraction(total, 3), error: 'calculation' }, { value: n(total - numbers[asked] * part), error: 'calculation' }, ...near(answer)])
    if (!choices) return null
    return question(2, 'direct-share', say(
        `Banatu ${math(`${total}`)} zuzenki proportzionalki ${math(`${numbers[0]}`)}, ${math(`${numbers[1]}`)} eta ${math(`${numbers[2]}`)} zenbakiekiko. Zenbat dagokio ${math(`${numbers[asked]}`)} zenbakiari?`,
        `Reparte ${math(`${total}`)} de forma directamente proporcional a ${math(`${numbers[0]}`)}, ${math(`${numbers[1]}`)} y ${math(`${numbers[2]}`)}. ¿Cuánto le toca al ${math(`${numbers[asked]}`)}?`,
        `وزّع ${math(`${total}`)} طرديًا على ${math(`${numbers[0]}`)} و${math(`${numbers[1]}`)} و${math(`${numbers[2]}`)}. كم نصيب ${math(`${numbers[asked]}`)}؟`
    ), choices, answer, same(math(`${total}\\mathbin{:}${sum}=${part}\\ \\to\\ ${numbers[asked]}\\cdot ${part}=${numbers[asked] * part}`)))
}

function inverseShareQuestion(random: Random, tier: Tier): ProportionDbh2RaceQuestion | null {
    const [a, b, c] = pick(random, tier === 0 ? [[1, 2, 4], [1, 2, 3], [2, 3, 6]] : [[1, 2, 3], [2, 3, 5], [2, 4, 6], [1, 3, 4], [3, 4, 6], [2, 5, 10]])
    // Common multiple of the three numbers: the weights are lcm / number
    const lcm = [a, b, c].reduce((value, number) => { let m = value; while (m % number !== 0) m += value; return m }, 1)
    const weights = [lcm / a, lcm / b, lcm / c]
    const sum = weights[0] + weights[1] + weights[2]
    const part = randomInt(random, 1, tier === 0 ? 10 : 30) * 10
    const total = sum * part
    const asked = pick(random, [0, 1, 2])
    const answer = n(weights[asked] * part)
    const directValue = fraction(total * [a, b, c][asked], a + b + c)
    const choices = options(random, answer, [{ value: directValue, error: 'direct-share' }, { value: n(part), error: 'one-part' }, { value: n(weights[2 - asked] * part), error: 'calculation' }, ...near(answer)])
    if (!choices) return null
    const number = [a, b, c][asked]
    return question(2, 'inverse-share', say(
        `Banatu ${math(`${total}`)} alderantziz proportzionalki ${math(`${a}`)}, ${math(`${b}`)} eta ${math(`${c}`)} zenbakiekiko. Zenbat dagokio ${math(`${number}`)} zenbakiari?`,
        `Reparte ${math(`${total}`)} de forma inversamente proporcional a ${math(`${a}`)}, ${math(`${b}`)} y ${math(`${c}`)}. ¿Cuánto le toca al ${math(`${number}`)}?`,
        `وزّع ${math(`${total}`)} عكسيًا على ${math(`${a}`)} و${math(`${b}`)} و${math(`${c}`)}. كم نصيب ${math(`${number}`)}؟`
    ), choices, answer, same(math(`\\frac{${weights[0]}}{${lcm}},\\frac{${weights[1]}}{${lcm}},\\frac{${weights[2]}}{${lcm}}\\ \\to\\ ${total}\\mathbin{:}${sum}=${part}\\ \\to\\ ${weights[asked]}\\cdot ${part}=${weights[asked] * part}`)))
}

/* ---------- Circuit 3: percentages ---------- */

function percentOfQuestion(random: Random, tier: Tier): ProportionDbh2RaceQuestion | null {
    const percent = pick(random, tier === 0 ? [5, 8, 12, 20, 35] : [2, 5, 8, 12, 15, 35, 120, 150, 115])
    const quantity = randomInt(random, 2, tier === 0 ? 20 : 60) * 10
    const answer = fraction(quantity * percent, 100)
    const choices = options(random, answer, [{ value: fraction(quantity * percent, 10), error: 'decimal-place' }, { value: fraction(quantity * 100, percent), error: 'inverted' }, { value: fraction(quantity * percent, 1000), error: 'decimal-place' }, ...near(answer)])
    if (!choices) return null
    return question(3, 'percent-of', say(`Kalkulatu ${math(`${quantity}`)} kantitatearen ${math(percentEu(percent))}.`, `Calcula el ${math(percentLatex(percent))} de ${math(`${quantity}`)}.`, `احسب ${math(percentLatex(percent))} من ${math(`${quantity}`)}.`), choices, answer, same(math(`${quantity}\\cdot ${w(dec(percent))}=${w(answer)}`)))
}

function totalQuestion(random: Random, tier: Tier): ProportionDbh2RaceQuestion | null {
    const percent = pick(random, tier === 0 ? [10, 20, 25, 50] : [4, 8, 12, 15, 30, 40, 75])
    const total = randomInt(random, 2, tier === 0 ? 20 : 50) * (tier === 0 ? 10 : 25)
    const part = fraction(total * percent, 100)
    if (part.denominator !== 1) return null
    const answer = n(total)
    const choices = options(random, answer, [{ value: multiply(part, dec(percent)), error: 'multiplied' }, { value: fraction(part.numerator * percent, 10), error: 'decimal-place' }, { value: n(part.numerator + percent), error: 'calculation' }, ...near(answer)])
    if (!choices) return null
    return question(3, 'total', say(
        `${math(`x`)} kantitatearen ${math(percentEu(percent))} ${math(`${part.numerator}`)} da. Zenbat da ${math('x')}?`,
        `El ${math(percentLatex(percent))} de ${math('x')} es ${math(`${part.numerator}`)}. ¿Cuánto vale ${math('x')}?`,
        `${math(percentLatex(percent))} من ${math('x')} تساوي ${math(`${part.numerator}`)}. كم قيمة ${math('x')}؟`
    ), choices, answer, same(math(`x=${part.numerator}\\mathbin{:}${w(dec(percent))}=${total}`)))
}

function variationQuestion(random: Random, tier: Tier): ProportionDbh2RaceQuestion | null {
    const percent = pick(random, tier === 0 ? [10, 20, 25, 50] : [5, 12, 15, 20, 25, 40])
    const start = randomInt(random, 2, tier === 0 ? 20 : 60) * 20
    const end = (start * (100 + percent)) / 100
    if (!Number.isInteger(end)) return null
    const answer = n(percent)
    const choices = options(random, answer, [{ value: n(100 + percent), error: 'change-only' }, { value: fraction((end - start) * 100, end), error: 'inverted' }, { value: n(end - start), error: 'calculation' }, ...near(answer)])
    if (!choices) return null
    return question(3, 'variation', say(
        `Prezioa: lehen ${math(`${start}`)} €, orain ${math(`${end}`)} €. Zer ehuneko igo da? (% gabe)`,
        `Un precio pasa de ${math(`${start}`)} € a ${math(`${end}`)} €. ¿Qué porcentaje ha subido? (sin %)`,
        `ارتفع سعر من ${math(`${start}`)} € إلى ${math(`${end}`)} €. بأي نسبة ارتفع؟ (بلا ٪)`
    ), choices, answer, same(math(`${end}\\mathbin{:}${start}\\cdot 100=${100 + percent}\\ \\to\\ ${100 + percent}-100=${percent}`)))
}

/* ---------- Circuit 4: changes and interest ---------- */

function initialQuestion(random: Random, tier: Tier): ProportionDbh2RaceQuestion | null {
    const rise = random() < 0.5
    const percent = pick(random, tier === 0 ? [10, 20, 25, 50] : [5, 10, 12, 15, 20, 25, 40])
    const start = randomInt(random, 2, tier === 0 ? 20 : 60) * 20
    const index = dec(rise ? 100 + percent : 100 - percent)
    const end = multiply(n(start), index)
    if (written(end) === null) return null
    const answer = n(start)
    const undo = multiply(end, dec(rise ? 100 - percent : 100 + percent))
    const choices = options(random, answer, [{ value: undo, error: 'undo-percent' }, { value: multiply(end, index), error: 'multiplied' }, ...near(answer)])
    if (!choices) return null
    return question(4, rise ? 'initial-rise' : 'initial-discount', rise
        ? say(`${math(percentEu(percent))} igo ondoren, prezioa ${math(w(end))} € da. Zenbat zen lehen?`, `Tras subir un ${math(percentLatex(percent))}, el precio es ${math(w(end))} €. ¿Cuánto era antes?`, `بعد زيادة ${math(percentLatex(percent))} صار السعر ${math(w(end))} €. كم كان قبل ذلك؟`)
        : say(`${math(percentEu(percent))} merkatu ondoren, prezioa ${math(w(end))} € da. Zenbat zen lehen?`, `Tras una rebaja del ${math(percentLatex(percent))}, el precio es ${math(w(end))} €. ¿Cuánto era antes?`, `بعد تخفيض ${math(percentLatex(percent))} صار السعر ${math(w(end))} €. كم كان قبل ذلك؟`),
    choices, answer, same(math(`${w(end)}\\mathbin{:}${w(index)}=${start}`)))
}

function chainedQuestion(random: Random, tier: Tier): ProportionDbh2RaceQuestion | null {
    const first = pick(random, tier === 0 ? [10, 20, -10, -20] : [10, 20, 25, 30, -10, -20, -25, -30])
    const second = pick(random, tier === 0 ? [-10, -20, 10] : [10, 20, 25, -10, -20, -25, -40])
    const start = pick(random, [100, 200, 400, 500, 800])
    const answer = multiply(multiply(n(start), dec(100 + first)), dec(100 + second))
    const added = multiply(n(start), dec(100 + first + second))
    const choices = options(random, answer, [{ value: added, error: 'added-percents' }, { value: multiply(n(start), dec(100 + first)), error: 'one-factor' }, ...near(answer)])
    if (!choices) return null
    const word = (percent: number, language: 'eu' | 'es' | 'ar') => (percent > 0 ? { eu: 'igo', es: 'sube', ar: 'يرتفع' } : { eu: 'jaitsi', es: 'baja', ar: 'ينخفض' })[language]
    return question(4, 'chained', say(
        `Prezioa ${math(`${start}`)} € da. Lehenik ${math(percentEu(Math.abs(first)))} ${word(first, 'eu')} da, gero ${math(percentEu(Math.abs(second)))} ${word(second, 'eu')}. Zenbat da orain?`,
        `Un precio de ${math(`${start}`)} € primero ${word(first, 'es')} un ${math(percentLatex(Math.abs(first)))} y luego ${word(second, 'es')} un ${math(percentLatex(Math.abs(second)))}. ¿Cuánto es ahora?`,
        `سعر ${math(`${start}`)} € ${word(first, 'ar')} أولًا ${math(percentLatex(Math.abs(first)))} ثم ${word(second, 'ar')} ${math(percentLatex(Math.abs(second)))}. كم أصبح؟`
    ), choices, answer, same(math(`${start}\\cdot ${w(dec(100 + first))}\\cdot ${w(dec(100 + second))}=${w(answer)}`)))
}

function interestQuestion(random: Random, tier: Tier): ProportionDbh2RaceQuestion | null {
    const capital = pick(random, tier === 0 ? [1000, 2000, 5000] : [1500, 2400, 3000, 3500, 4000, 6000, 8000])
    const rate = randomInt(random, 2, tier === 0 ? 5 : 8)
    const years = randomInt(random, 2, tier === 0 ? 4 : 6)
    const answer = fraction(capital * rate * years, 100)
    const choices = options(random, answer, [{ value: fraction(capital * rate, 100), error: 'one-year' }, { value: n(capital * rate * years), error: 'decimal-place' }, { value: add100(answer, capital), error: 'change-only' }, ...near(answer)])
    if (!choices) return null
    return question(4, 'interest', say(
        `Kapitala ${math(`${capital}`)} €, interes-tasa ${math(percentEu(rate))}, ${math(`${years}`)} urte. Zer interes sortzen du?`,
        `¿Qué interés producen ${math(`${capital}`)} € al ${math(percentLatex(rate))} durante ${math(`${years}`)} años?`,
        `ما الفائدة التي تُنتجها ${math(`${capital}`)} € بنسبة ${math(percentLatex(rate))} مدة ${math(`${years}`)} سنوات؟`
    ), choices, answer, same(math(`\\frac{${capital}\\cdot ${rate}\\cdot ${years}}{100}=${w(answer)}`)))
}

/** Interest plus capital: the final amount instead of the interest */
const add100 = (interest: FractionValue, capital: number) => fraction(interest.numerator + capital * interest.denominator, interest.denominator)

/* ---------- Public API ---------- */

type Generator = (random: Random, tier: Tier) => ProportionDbh2RaceQuestion | null

const circuitGenerators: Generator[][] = [
    [fourthQuestion, inverseQuestion],
    [compoundQuestion],
    [directShareQuestion, inverseShareQuestion],
    [percentOfQuestion, totalQuestion, variationQuestion],
    [initialQuestion, chainedQuestion, interestQuestion]
]

export function generateProportionDbh2RaceQuestion(random: Random, circuit: number, tier: Tier): ProportionDbh2RaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 800; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkProportionDbh2PitAnswer(question: ProportionDbh2RaceQuestion, input: string): AnswerCheck {
    return checkAnswer(readProportionAnswer(input), question.answer, question.answerForm)
}

export function proportionDbh2ParTime(circuit: number): number {
    return parTimeFor([11, 14, 13, 11, 13][circuit] ?? 12)
}

export const proportionDbh2RaceErrorTips: Record<ProportionDbh2RaceError, LocalizedText> = {
    cross: say('Gurutzeko biderkadurak: muturrak elkarrekin eta erdikoak elkarrekin, $a\\cdot x=b\\cdot c$.', 'Productos cruzados: extremos con extremos y medios con medios, $a\\cdot x=b\\cdot c$.', 'الضرب التبادلي: الطرفان معًا والوسطان معًا، $a\\cdot x=b\\cdot c$.'),
    relation: say('Erlazioa beste aldera hartu duzu. Galdetu: hau handitzean, ezezaguna handitu ala txikitu egiten da?', 'Has tomado la relación al revés. Pregúntate: al crecer esta, ¿la incógnita crece o decrece?', 'أخذت العلاقة بالعكس. اسأل: حين يزيد هذا هل يزيد المجهول أم ينقص؟'),
    'one-factor': say('Urrats bat falta da: magnitude guztiak aldatzen dira, ez bakarra.', 'Falta un paso: cambian todas las magnitudes, no solo una.', 'تنقص خطوة: تتغيّر كل المقادير لا واحد فقط.'),
    'direct-share': say('Hori zuzenki banatzea da. Alderantzizkoan, banatu alderantzizkoekiko: zenbaki handienari gutxiago.', 'Eso es repartir de forma directa. En el inverso, reparte a los inversos: al número mayor, menos.', 'هذا توزيع طردي. في العكسي وزّع على المقلوبات: العدد الأكبر يأخذ أقل.'),
    'one-part': say('Hori zati bakar baten balioa da; biderkatu zenbakiaren zati kopuruaz.', 'Ese es el valor de una sola parte; multiplícalo por las partes de ese número.', 'هذه قيمة جزء واحد؛ اضربها في عدد أجزاء ذلك العدد.'),
    'decimal-place': say('Kontuz komarekin: % 5 = $0{,}05$, ez $0{,}5$; zatitu 100ez.', 'Cuidado con la coma: 5 % = $0{,}05$, no $0{,}5$; divide entre 100.', 'انتبه للفاصلة: 5٪ = $0{,}05$ لا $0{,}5$؛ اقسم على 100.'),
    multiplied: say('Atzera joateko, zatitu: osoa = zatia : hamartarra; hasierakoa = amaierakoa : indizea.', 'Para ir hacia atrás, divide: total = parte : decimal; inicial = final : índice.', 'للرجوع اقسم: الكل = الجزء : العدد العشري؛ الأصلية = النهائية : المؤشر.'),
    inverted: say('Zatiketa buruz behera dago: zatia osoaren artean (edo kantitatea bider hamartarra).', 'La división está al revés: la parte entre el total (o la cantidad por el decimal).', 'القسمة مقلوبة: الجزء على الكل (أو الكمية في العدد العشري).'),
    'undo-percent': say('Igoera bat ez da desegiten ehuneko bera jaitsiz: zatitu indizeaz.', 'Una subida no se deshace bajando el mismo porcentaje: divide entre el índice.', 'لا تُلغى الزيادة بخفض النسبة نفسها: اقسم على المؤشر.'),
    'added-percents': say('Ehunekoak ez dira batzen: biderkatu indizeak.', 'Los porcentajes no se suman: multiplica los índices.', 'لا تُجمع النسب: اضرب المؤشرات.'),
    'change-only': say('Begiratu zer eskatzen den: aldaketa (% edo interesa) ala azken kantitatea.', 'Mira qué se pide: el cambio (el % o el interés) o la cantidad final.', 'انظر ما المطلوب: التغيّر (النسبة أو الفائدة) أم الكمية النهائية.'),
    'one-year': say('Hori urte bateko interesa da; biderkatu urte kopuruaz.', 'Ese es el interés de un año; multiplícalo por los años.', 'هذه فائدة سنة واحدة؛ اضربها في عدد السنوات.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.')
}
