import { checkAnswer, divide, fraction, multiply, subtract, add, toExactDecimal, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { readProportionAnswer } from '../answers.ts'

/* ==========================================================================
   Proportzionaltasunaren lasterketa (1. DBH): five circuits — ratios and
   proportions, direct problems, inverse problems, percentages, and
   discounts and increases. Every wrong option is a typical mistake: the
   ratio upside down, the wrong cross product, solving an inverse problem
   as a direct one (and the other way round), forgetting a step, taking
   the percentage as euros, giving the discount instead of the price…
   Prompts never put a Basque suffix after a generated number.
   ========================================================================== */

export const PROPORTION_RACE_CIRCUITS = 5

export type ProportionRaceError =
    | 'inverted'
    | 'cross'
    | 'inverse-used'
    | 'direct-used'
    | 'one-step'
    | 'percent-as-amount'
    | 'times-100'
    | 'change-only'
    | 'opposite'
    | 'calculation'

export type ProportionRaceQuestion = RaceQuestion<ProportionRaceError>

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
const same = (latex: string): LocalizedText => ({ eu: latex, es: latex, ar: latex.replace(/\{,\}/g, '.') })
const math = (latex: string) => `$${latex}$`

/** An exact decimal in LaTeX with the comma ({,}); only values that end and are short */
export function written(value: FractionValue): string | null {
    const text = toExactDecimal(value, ',')
    if (text === null || text.length > 8) return null
    return text.replace(',', '{,}')
}

/** A whole or decimal number written for a prompt */
const w = (value: FractionValue) => written(value) ?? `\\frac{${value.numerator}}{${value.denominator}}`

interface Candidate {
    value: FractionValue
    error: ProportionRaceError
}

/** The right option and three different mistakes, all positive and written as exact decimals */
function options(random: Random, right: FractionValue, candidates: Candidate[]): RaceOption<ProportionRaceError>[] | null {
    const rightLatex = written(right)
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: ProportionRaceError }> = []
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

function question(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<ProportionRaceError>[], answer: FractionValue, solution: LocalizedText): ProportionRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution }
}

const n = (value: number) => fraction(value)
const dec = (units: number, places: number) => fraction(units, 10 ** places)
const near = (value: FractionValue): Candidate[] => [add(value, n(1)), subtract(value, n(1)), multiply(value, n(10)), divide(value, n(10))].map((item) => ({ value: item, error: 'calculation' }))

/* ---------- Circuit 0: ratios and proportions ---------- */

function ratioQuestion(random: Random, tier: Tier): ProportionRaceQuestion | null {
    const b = pick(random, tier === 0 ? [2, 4, 5, 10] : [2, 4, 5, 8, 10, 20, 25])
    const a = randomInt(random, 1, b * (tier === 2 ? 3 : 2))
    const value = fraction(a, b)
    if (a === b) return null
    const choices = options(random, value, [{ value: fraction(b, a), error: 'inverted' }, { value: n(a * b), error: 'calculation' }, ...near(value)])
    if (!choices) return null
    return question(0, 'ratio', say(`Zein da ${math(`${a}`)} eta ${math(`${b}`)} arteko arrazoiaren balioa?`, `¿Cuánto vale la razón entre ${math(`${a}`)} y ${math(`${b}`)}?`, `كم قيمة النسبة بين ${math(`${a}`)} و${math(`${b}`)}؟`), choices, value, same(math(`\\frac{${a}}{${b}}=${a}\\mathbin{:}${b}=${w(value)}`)))
}

function proportionQuestion(random: Random, tier: Tier): ProportionRaceQuestion | null {
    const a = randomInt(random, 2, tier === 0 ? 6 : 12)
    const k = tier === 0 ? n(randomInt(random, 2, 5)) : pick(random, [n(2), n(3), dec(15, 1), dec(25, 1), dec(5, 1), n(4)])
    const b = multiply(n(a), k)
    const c = randomInt(random, 2, tier === 0 ? 9 : 15)
    if (b.denominator !== 1 || c === a) return null
    const x = multiply(n(c), k)
    const choices = options(random, x, [{ value: fraction(a * c, b.numerator), error: 'cross' }, { value: fraction(a * b.numerator, c), error: 'cross' }, { value: n(b.numerator + c - a), error: 'calculation' }, ...near(x)])
    if (!choices) return null
    return question(0, 'proportion', same(math(`\\frac{${a}}{${b.numerator}}=\\frac{${c}}{x}`)), choices, x, same(math(`${a}\\cdot x=${b.numerator}\\cdot ${c}=${b.numerator * c}\\ \\to\\ x=${b.numerator * c}\\mathbin{:}${a}=${w(x)}`)))
}

/* ---------- Circuits 1 and 2: direct and inverse problems ---------- */

const directContexts = [
    { thing: say('koaderno', 'cuadernos', 'دفاتر'), unit: '€', price: true },
    { thing: say('txokolatina', 'chocolatinas', 'قطع شوكولاتة'), unit: 'g', price: false },
    { thing: say('sarrera', 'entradas', 'تذاكر'), unit: '€', price: true },
    { thing: say('jauzi', 'saltos', 'قفزات'), unit: 'm', price: false }
]

function directQuestion(random: Random, tier: Tier): ProportionRaceQuestion | null {
    const context = pick(random, directContexts)
    const known = randomInt(random, 2, tier === 0 ? 5 : 8)
    const wanted = randomInt(random, 2, tier === 0 ? 10 : 15)
    const each = tier === 0 ? n(randomInt(random, 2, 12)) : context.price ? dec(randomInt(random, 105, 450), 2) : n(randomInt(random, 3, 40))
    if (wanted === known) return null
    const amount = multiply(each, n(known))
    const answer = multiply(each, n(wanted))
    const choices = options(random, answer, [
        { value: fraction(amount.numerator * known, amount.denominator * wanted), error: 'inverse-used' },
        { value: multiply(amount, n(wanted)), error: 'one-step' },
        { value: each, error: 'one-step' },
        ...near(answer)
    ])
    if (!choices) return null
    const unitWord = context.unit
    return question(1, 'direct', say(
        `${math(`${known}`)} ${context.thing.eu}: ${math(w(amount))} ${unitWord}. Zenbat dira ${math(`${wanted}`)} ${context.thing.eu}?`,
        `${math(`${known}`)} ${context.thing.es}: ${math(w(amount))} ${unitWord}. ¿Cuánto son ${math(`${wanted}`)} ${context.thing.es}?`,
        `${math(`${known}`)} ${context.thing.ar}: ${math(w(amount))} ${unitWord}. كم لـ ${math(`${wanted}`)} ${context.thing.ar}؟`
    ), choices, answer, same(math(`${w(amount)}\\mathbin{:}${known}=${w(each)}\\ \\to\\ ${w(each)}\\cdot ${wanted}=${w(answer)}`)))
}

const inverseContexts = [
    { workers: say('margolari', 'pintores', 'رسّامين'), time: say('ordu', 'horas', 'ساعات'), howMany: 'Cuántas' },
    { workers: say('txorrota', 'grifos', 'صنابير'), time: say('minutu', 'minutos', 'دقائق'), howMany: 'Cuántos' },
    { workers: say('zaldi', 'caballos', 'خيول'), time: say('egun', 'días', 'أيام'), howMany: 'Cuántos' },
    { workers: say('langile', 'obreros', 'عمال'), time: say('egun', 'días', 'أيام'), howMany: 'Cuántos' }
]

function inverseQuestion(random: Random, tier: Tier): ProportionRaceQuestion | null {
    const context = pick(random, inverseContexts)
    const known = randomInt(random, 2, tier === 0 ? 6 : 10)
    const wanted = randomInt(random, 2, tier === 0 ? 6 : 12)
    if (wanted === known) return null
    // The total work (one alone) is a multiple of both counts in the first levels
    const total = tier === 2 ? n(known * randomInt(random, 2, 12)) : n(known * wanted * randomInt(random, 1, 4))
    const time = divide(total, n(known))
    const answer = divide(total, n(wanted))
    const choices = options(random, answer, [
        { value: fraction(time.numerator * wanted, time.denominator * known), error: 'direct-used' },
        { value: total, error: 'one-step' },
        { value: divide(time, n(wanted)), error: 'one-step' },
        ...near(answer)
    ])
    if (!choices) return null
    return question(2, 'inverse', say(
        `${math(`${known}`)} ${context.workers.eu}: ${math(w(time))} ${context.time.eu}. Zenbat ${context.time.eu} ${math(`${wanted}`)} ${context.workers.eu} izanda?`,
        `${math(`${known}`)} ${context.workers.es}: ${math(w(time))} ${context.time.es}. ¿${context.howMany} ${context.time.es} con ${math(`${wanted}`)} ${context.workers.es}?`,
        `${math(`${known}`)} ${context.workers.ar}: ${math(w(time))} ${context.time.ar}. كم ${context.time.ar} مع ${math(`${wanted}`)} ${context.workers.ar}؟`
    ), choices, answer, same(math(`${w(time)}\\cdot ${known}=${w(total)}\\ \\to\\ ${w(total)}\\mathbin{:}${wanted}=${w(answer)}`)))
}

/* ---------- Circuit 3: percentages ---------- */

/** A percentage in LaTeX: Basque writes the sign first (% 15), Spanish and Arabic after (15 %) */
const percentLatex = (percent: number | string) => `${percent}\\,\\%`
const percentEu = (percent: number | string) => `\\%\\,${percent}`

function percentOfQuestion(random: Random, tier: Tier): ProportionRaceQuestion | null {
    const percent = pick(random, tier === 0 ? [10, 20, 25, 50, 75] : [5, 12, 15, 30, 35, 40, 45, 60, 80])
    const quantity = randomInt(random, 2, tier === 0 ? 20 : 60) * (tier === 2 ? 10 : 20)
    const answer = fraction(quantity * percent, 100)
    const choices = options(random, answer, [{ value: n(quantity * percent), error: 'times-100' }, { value: n(quantity - percent), error: 'percent-as-amount' }, { value: subtract(n(quantity), answer), error: 'change-only' }, ...near(answer)])
    if (!choices) return null
    return question(3, 'percent-of', say(`Zenbat da ${math(`${quantity}`)} kantitatearen ${math(percentEu(percent))}?`, `¿Cuánto es el ${math(percentLatex(percent))} de ${math(`${quantity}`)}?`, `كم يساوي ${math(percentLatex(percent))} من ${math(`${quantity}`)}؟`), choices, answer, same(math(`${quantity}\\cdot ${percent}\\mathbin{:}100=${w(answer)}`)))
}

function whichPercentQuestion(random: Random, tier: Tier): ProportionRaceQuestion | null {
    const percent = pick(random, tier === 0 ? [10, 20, 25, 50] : [5, 15, 20, 25, 30, 40, 60, 75])
    const total = randomInt(random, 2, 12) * (tier === 0 ? 20 : 40)
    const part = (total * percent) / 100
    if (!Number.isInteger(part)) return null
    const answer = n(percent)
    const choices = options(random, answer, [{ value: fraction(part, total), error: 'times-100' }, { value: n(100 - percent), error: 'calculation' }, { value: fraction(total * 100, part), error: 'inverted' }, ...near(answer)])
    if (!choices) return null
    return question(3, 'which-percent', say(`${math(`${total}`)} ikasletatik ${math(`${part}`)} bizikletaz datoz. Zer ehuneko da? (% gabe)`, `De ${math(`${total}`)} alumnos, ${math(`${part}`)} vienen en bici. ¿Qué porcentaje es? (sin %)`, `من ${math(`${total}`)} تلميذًا، ${math(`${part}`)} يأتون بالدراجة. ما النسبة المئوية؟ (بلا ٪)`), choices, answer, same(math(`${part}\\mathbin{:}${total}\\cdot 100=${percent}`)))
}

function totalQuestion(random: Random, tier: Tier): ProportionRaceQuestion | null {
    const percent = pick(random, tier === 0 ? [10, 20, 25, 50] : [5, 8, 15, 20, 30, 40, 60, 70])
    const total = randomInt(random, 2, 15) * (tier === 0 ? 20 : 20)
    const part = (total * percent) / 100
    if (!Number.isInteger(part)) return null
    const answer = n(total)
    const choices = options(random, answer, [{ value: fraction(part * percent, 100), error: 'percent-as-amount' }, { value: n(part * percent), error: 'calculation' }, { value: n(part + percent), error: 'calculation' }, ...near(answer)])
    if (!choices) return null
    return question(3, 'total', say(`${math(`${part}`)} erlauntza dira erlategiaren ${math(percentEu(percent))}. Zenbat erlauntza ditu guztira?`, `${math(`${part}`)} colmenas son el ${math(percentLatex(percent))} del colmenar. ¿Cuántas colmenas tiene en total?`, `${math(`${part}`)} خلية هي ${math(percentLatex(percent))} من المنحل. كم خلية فيه؟`), choices, answer, same(math(`${part}\\mathbin{:}${percent}\\cdot 100=${total}`)))
}

/* ---------- Circuit 4: discounts and increases ---------- */

function changeQuestion(random: Random, tier: Tier): ProportionRaceQuestion | null {
    const increase = random() < 0.4
    const percent = pick(random, tier === 0 ? [10, 20, 25, 50] : [5, 12, 15, 20, 30, 35])
    const price = randomInt(random, 2, tier === 0 ? 20 : 40) * (tier === 2 ? 5 : 10)
    const change = fraction(price * percent, 100)
    const answer = increase ? add(n(price), change) : subtract(n(price), change)
    const choices = options(random, answer, [
        { value: increase ? n(price + percent) : n(price - percent), error: 'percent-as-amount' },
        { value: change, error: 'change-only' },
        { value: increase ? subtract(n(price), change) : add(n(price), change), error: 'opposite' },
        ...near(answer)
    ])
    if (!choices) return null
    const sign = increase ? '+' : '-'
    return question(4, increase ? 'increase' : 'discount', increase
        ? say(`Prezioa ${math(`${price}`)} €; ${math(percentEu(percent))} igo da. Zenbat balio du orain?`, `Costaba ${math(`${price}`)} € y sube un ${math(percentLatex(percent))}. ¿Cuánto cuesta ahora?`, `كان الثمن ${math(`${price}`)} € وارتفع ${math(percentLatex(percent))}. كم الثمن الآن؟`)
        : say(`Prezioa ${math(`${price}`)} €; ${math(percentEu(percent))} merkatu da. Zenbat ordaintzen da?`, `Cuesta ${math(`${price}`)} € con un descuento del ${math(percentLatex(percent))}. ¿Cuánto se paga?`, `الثمن ${math(`${price}`)} € بخصم ${math(percentLatex(percent))}. كم يُدفع؟`),
    choices, answer, same(math(`${price}\\cdot ${percent}\\mathbin{:}100=${w(change)}\\ \\to\\ ${price}${sign}${w(change)}=${w(answer)}`)))
}

/* ---------- Public API ---------- */

type Generator = (random: Random, tier: Tier) => ProportionRaceQuestion | null

const circuitGenerators: Generator[][] = [
    [ratioQuestion, proportionQuestion],
    [directQuestion],
    [inverseQuestion],
    [percentOfQuestion, whichPercentQuestion, totalQuestion],
    [changeQuestion]
]

export function generateProportionRaceQuestion(random: Random, circuit: number, tier: Tier): ProportionRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkProportionPitAnswer(question: ProportionRaceQuestion, input: string): AnswerCheck {
    return checkAnswer(readProportionAnswer(input), question.answer, question.answerForm)
}

export function proportionParTime(circuit: number): number {
    return parTimeFor([9, 11, 12, 11, 12][circuit] ?? 11)
}

export const proportionRaceErrorTips: Record<ProportionRaceError, LocalizedText> = {
    inverted: say('Arrazoia buruz behera dago: aurrekaria goian, ondorengoa behean (zatia goian, osoa behean).', 'La razón está al revés: el antecedente arriba y el consecuente abajo (la parte arriba, el total abajo).', 'النسبة مقلوبة: المقدَّم في الأعلى والتالي في الأسفل (الجزء في الأعلى والكل في الأسفل).'),
    cross: say('Gurutzeko biderkadurak: muturrak elkarrekin eta erdikoak elkarrekin, $a\\cdot x=b\\cdot c$.', 'Productos cruzados: extremos con extremos y medios con medios, $a\\cdot x=b\\cdot c$.', 'الضرب التبادلي: الطرفان معًا والوسطان معًا، $a\\cdot x=b\\cdot c$.'),
    'inverse-used': say('Zuzena da (gehiago → gehiago): lehenik zatitu, gero biderkatu.', 'Es directa (más → más): primero divide, luego multiplica.', 'إنه طردي (أكثر ← أكثر): اقسم أولًا ثم اضرب.'),
    'direct-used': say('Alderantzizkoa da (gehiago → gutxiago): bakar batek gehiago behar du, lehenik biderkatu, gero zatitu.', 'Es inversa (más → menos): uno solo tarda más; primero multiplica, luego divide.', 'إنه عكسي (أكثر ← أقل): الواحد يحتاج وقتًا أطول؛ اضرب أولًا ثم اقسم.'),
    'one-step': say('Bi urrats behar dira: lehenik bat bakarrarentzat, gero eskatzen direnentzat.', 'Hacen falta dos pasos: primero para uno solo, después para los que se piden.', 'نحتاج خطوتين: أولًا للواحد ثم للعدد المطلوب.'),
    'percent-as-amount': say('Ehunekoa ez da euro kopuru bat: kalkulatu kantitatearen % hori, $Q\\cdot p\\mathbin{:}100$.', 'El porcentaje no es una cantidad de euros: calcula ese % de la cantidad, $Q\\cdot p\\mathbin{:}100$.', 'النسبة المئوية ليست مبلغًا من اليورو: احسب تلك النسبة من الكمية، $Q\\cdot p\\mathbin{:}100$.'),
    'times-100': say('Ez ahaztu 100: ehunekoa = zatia : osoa · 100, eta kantitatearen % $p$ = kantitatea · $p$ : 100.', 'No olvides el 100: porcentaje = parte : total · 100, y el $p$ % de una cantidad = cantidad · $p$ : 100.', 'لا تنسَ 100: النسبة = الجزء : الكل · 100، و$p$٪ من كمية = الكمية · $p$ : 100.'),
    'change-only': say('Hori aldaketa bakarrik da (beherapena edo igoera); orain kendu edo batu prezioari.', 'Eso es solo el cambio (el descuento o la subida); ahora réstalo o súmalo al precio.', 'هذا هو التغيّر فقط (الخصم أو الزيادة)؛ اطرحه الآن من السعر أو أضفه إليه.'),
    opposite: say('Beherapenean kendu egiten da; igoeran, batu.', 'En un descuento se resta; en una subida, se suma.', 'في التخفيض نطرح؛ وفي الزيادة نجمع.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.')
}
