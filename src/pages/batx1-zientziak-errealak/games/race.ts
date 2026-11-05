import { checkAnswer, fraction, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { binomial, xMinus } from './coefficient.ts'

/* ==========================================================================
   Errealen lasterketa (Batxilergoa 1 · Zientziak): five circuits, one per
   stage — real numbers (an intersection, a recurring decimal as a fraction,
   the n of √n drawn as a hypotenuse), absolute value (a distance, a
   solution of |x − a| = r, an end of |x − a| < r, the radius of an
   interval), errors (significant figures, a bound, a relative error),
   radicals and logarithms (a factor out, rationalising, a logarithm, a sum
   of logarithms) and the binomial theorem (a binomial coefficient, the
   number of terms, a coefficient, the sum of a row). The wrong options are
   the typical mistakes. Every question carries `meta`, the numbers the
   tests check it against.
   ========================================================================== */

export const BACH_REALS_RACE_CIRCUITS = 5

export type BachRealsRaceError =
    | 'union'
    | 'period'
    | 'legs-added'
    | 'distance-sign'
    | 'one-side'
    | 'radius-length'
    | 'left-zeros'
    | 'whole-unit'
    | 'upside-down'
    | 'outside'
    | 'denominator'
    | 'log-value'
    | 'log-sum'
    | 'binomial-product'
    | 'terms'
    | 'row'
    | 'calculation'

export type BachRealsRaceQuestion = RaceQuestion<BachRealsRaceError> & { meta: Record<string, number> }

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (latex: string): LocalizedText => ({ eu: `$${latex}$`, es: `$${latex}$`, en: `$${latex}$`, ar: `$${latex.replace(/\{,\}/g, '.')}$` })
const math = (latex: string) => `$${latex}$`

/** A value in LaTeX: a whole number, a short decimal or a fraction */
export function written(value: FractionValue): string | null {
    if (value.denominator === 1) return String(value.numerator)
    const decimal = value.numerator / value.denominator
    for (const places of [1, 2, 3, 4]) {
        if (Math.abs(Math.round(decimal * 10 ** places) - decimal * 10 ** places) < 1e-9) return decimal.toFixed(places).replace('.', '{,}')
    }
    if (Math.abs(value.numerator) > 9999 || value.denominator > 9999) return null
    return `${value.numerator < 0 ? '-' : ''}\\frac{${Math.abs(value.numerator)}}{${value.denominator}}`
}

interface Candidate {
    value: FractionValue
    error: BachRealsRaceError
}
const whole = (value: number, error: BachRealsRaceError): Candidate => ({ value: fraction(Math.round(value) + 0), error })
const exact = (value: number, error: BachRealsRaceError): Candidate => ({ value: fraction(Math.round(value * 10000), 10000), error })
const nearby = (value: number): Candidate[] => [value + 1, value - 1, value + 2, value * 2].map((item) => exact(item, 'calculation'))

/** The right option and three different mistakes */
function options(random: Random, right: FractionValue, candidates: Candidate[]): RaceOption<BachRealsRaceError>[] | null {
    const rightLatex = written(right)
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: BachRealsRaceError }> = []
    for (const candidate of [...candidates, ...nearby(right.numerator / right.denominator)]) {
        if (wrong.length === 3) break
        const latex = written(candidate.value)
        if (latex === null || latex === '-0' || used.has(latex)) continue
        used.add(latex)
        wrong.push({ latex, error: candidate.error })
    }
    if (wrong.length < 3) return null
    return shuffle(random, [{ latex: rightLatex, correct: true, error: null }, ...wrong.map((item) => ({ latex: item.latex, correct: false, error: item.error }))])
}

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<BachRealsRaceError>[], answer: FractionValue, solution: LocalizedText, meta: Record<string, number>): BachRealsRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution, meta }
}

const calc = (formula: string) => say(`Kalkulatu ${math(formula)}.`, `Calcula ${math(formula)}.`, `احسب ${math(formula)}.`, `Work out ${math(formula)}.`)
const howMuch = (formula: string, letter: string) => say(`${math(formula)}. Zenbat da ${math(letter)}?`, `${math(formula)}. ¿Cuánto vale ${math(letter)}?`, `${math(formula)}. كم تساوي ${math(letter)}؟`, `${math(formula)}. What is the value of ${math(letter)}?`)

/* ---------- Circuit 0: real numbers ---------- */

function intersectionQuestion(random: Random): BachRealsRaceQuestion | null {
    const start = randomInt(random, 1, 6)
    const a = Array.from({ length: randomInt(random, 4, 6) }, (_, i) => start + i)
    const step = pick(random, [2, 3])
    const b = Array.from({ length: 4 }, (_, i) => randomInt(random, 0, 1) + i * step + start - 1)
    const setB = [...new Set(b)]
    const common = a.filter((item) => setB.includes(item)).length
    const union = new Set([...a, ...setB]).size
    if (common === 0 || common === union) return null
    const answer = fraction(common)
    const choices = options(random, answer, [whole(union, 'union'), whole(a.length + setB.length, 'union'), whole(a.length - common, 'calculation')])
    const list = (items: number[]) => `\\{${items.join(',')}\\}`
    return choices && build(0, 'intersection', say(`Zenbat elementu ditu ${math(`${list(a)}\\cap${list(setB)}`)} multzoak?`, `¿Cuántos elementos tiene ${math(`${list(a)}\\cap${list(setB)}`)}?`, `كم عنصرًا في ${math(`${list(a)}\\cap${list(setB)}`)}؟`, `How many elements does ${math(`${list(a)}\\cap${list(setB)}`)} have?`), choices, answer, say(`Bietan daudenak: ${common}.`, `Los que están en los dos: ${common}.`, `الموجودة في الاثنتين: ${common}.`, `Those in both: ${common}.`), { common, union })
}

function periodQuestion(random: Random): BachRealsRaceQuestion | null {
    const period = randomInt(random, 12, 98)
    if (period % 11 === 0) return null
    const answer = fraction(period, 99)
    const choices = options(random, answer, [{ value: fraction(period, 100), error: 'period' }, { value: fraction(period, 90), error: 'period' }, { value: fraction(period, 9), error: 'period' }])
    return choices && build(0, 'period', say(`Zein zatikik ematen du ${math(`0{,}\\overline{${period}}`)}?`, `¿Qué fracción da ${math(`0{,}\\overline{${period}}`)}?`, `أيّ كسر يعطي ${math(`0{,}\\overline{${period}}`)}؟`, `Which fraction gives ${math(`0{,}\\overline{${period}}`)}?`), choices, answer, same(`\\frac{${period}}{99}=${written(answer)}`), { period })
}

function hypotenuseQuestion(random: Random): BachRealsRaceQuestion | null {
    const p = randomInt(random, 1, 6)
    const q = randomInt(random, p, 7)
    const answer = fraction(p * p + q * q)
    const choices = options(random, answer, [whole(p + q, 'legs-added'), whole((p + q) ** 2, 'legs-added'), whole(q * q - p * p, 'calculation')])
    return choices && build(0, 'hypotenuse', say(`${math(`\\sqrt{n}`)} ${p} eta ${q} katetoak dituen triangeluaren hipotenusa da. Zenbat da ${math('n')}?`, `${math(`\\sqrt{n}`)} es la hipotenusa del triángulo de catetos ${p} y ${q}. ¿Cuánto vale ${math('n')}?`, `${math(`\\sqrt{n}`)} وتر المثلث الذي ضلعاه القائمان ${p} و${q}. كم تساوي ${math('n')}؟`, `${math(`\\sqrt{n}`)} is the hypotenuse of the triangle with legs ${p} and ${q}. What is the value of ${math('n')}?`), choices, answer, same(`${p}^2+${q}^2=${p * p + q * q}`), { p, q })
}

/* ---------- Circuit 1: intervals and absolute value ---------- */

function distanceQuestion(random: Random): BachRealsRaceQuestion | null {
    const a = -randomInt(random, 1, 9)
    const b = randomInt(random, 1, 9)
    const answer = fraction(b - a)
    const choices = options(random, answer, [whole(b + a, 'distance-sign'), whole(-(b - a), 'distance-sign'), whole(Math.abs(b + a) + 1, 'calculation')])
    return choices && build(1, 'distance', say(`Zer distantzia dago ${math(String(a))} eta ${math(String(b))} artean?`, `¿Qué distancia hay entre ${math(String(a))} y ${math(String(b))}?`, `ما المسافة بين ${math(String(a))} و${math(String(b))}؟`, `How far apart are ${math(String(a))} and ${math(String(b))}?`), choices, answer, same(`|${b}-(${a})|=${b - a}`), { a, b })
}

function absoluteQuestion(random: Random, tier: Tier): BachRealsRaceQuestion | null {
    const a = randomInt(random, tier === 0 ? 0 : -5, 6)
    const r = randomInt(random, 2, 8)
    const answer = fraction(a - r)
    const choices = options(random, answer, [whole(a + r, 'one-side'), whole(r - a, 'calculation'), whole(-a - r, 'calculation')])
    const equation = `|${xMinus(a)}|=${r}`
    return choices && build(1, 'absolute', say(`Zein da ${math(equation)} ekuazioaren soluzio txikiena?`, `¿Cuál es la menor solución de ${math(equation)}?`, `ما أصغر حلّ للمعادلة ${math(equation)}؟`, `What is the smallest solution of ${math(equation)}?`), choices, answer, same(`x=${a}\\pm ${r}\\ \\to\\ ${a - r}`), { a, r })
}

function neighbourhoodQuestion(random: Random): BachRealsRaceQuestion | null {
    const a = randomInt(random, -5, 5)
    const r = randomInt(random, 1, 6)
    const answer = fraction(a - r)
    const choices = options(random, answer, [whole(a + r, 'calculation'), whole(-r, 'one-side'), whole(r - a, 'calculation')])
    const inequality = `|${xMinus(a)}|<${r}`
    return choices && build(1, 'neighbourhood', say(`${math(inequality)} tarte bat da. Zein da bere ezkerreko muturra?`, `${math(inequality)} es un intervalo. ¿Cuál es su extremo izquierdo?`, `${math(inequality)} فترة. ما طرفها الأيسر؟`, `${math(inequality)} is an interval. What is its left endpoint?`), choices, answer, same(`(${a - r},${a + r})`), { a, r })
}

function radiusQuestion(random: Random): BachRealsRaceQuestion | null {
    const centre = randomInt(random, -4, 6)
    const r = randomInt(random, 1, 6)
    const [p, q] = [centre - r, centre + r]
    const answer = fraction(r)
    const choices = options(random, answer, [whole(2 * r, 'radius-length'), whole(centre, 'calculation'), whole(q, 'calculation')])
    return choices && build(1, 'radius', say(`Zein da ${math(`(${p},${q})`)} ingurunearen erradioa?`, `¿Cuál es el radio del entorno ${math(`(${p},${q})`)}?`, `ما نصف قطر الجوار ${math(`(${p},${q})`)}؟`, `What is the radius of the neighbourhood ${math(`(${p},${q})`)}?`), choices, answer, same(`r=\\frac{${q}-(${p})}{2}=${r}`), { centre, r })
}

/* ---------- Circuit 2: approximations and errors ---------- */

function figuresQuestion(random: Random): BachRealsRaceQuestion | null {
    const zeros = randomInt(random, 1, 3)
    const digits = pick(random, ['42', '507', '9', '3060', '81'])
    const number = `0{,}${'0'.repeat(zeros)}${digits}`
    const answer = fraction(digits.length)
    const choices = options(random, answer, [whole(digits.length + zeros + 1, 'left-zeros'), whole(digits.length + zeros, 'left-zeros'), whole(digits.replace(/0+$/, '').length === digits.length ? digits.length + 1 : digits.replace(/0+$/, '').length, 'calculation')])
    return choices && build(2, 'figures', say(`Zenbat zifra esanguratsu ditu ${math(number)} zenbakiak?`, `¿Cuántas cifras significativas tiene ${math(number)}?`, `كم رقمًا معنويًا في ${math(number)}؟`, `How many significant figures does ${math(number)} have?`), choices, answer, say(`Lehen zifra ez-nulutik: ${digits.length}.`, `Desde la primera cifra distinta de cero: ${digits.length}.`, `من أول رقم غير صفري: ${digits.length}.`, `From the first non-zero figure: ${digits.length}.`), { zeros, digits: digits.length })
}

function boundQuestion(random: Random): BachRealsRaceQuestion | null {
    const places = randomInt(random, 0, 3)
    const value = randomInt(random, 11, 99) / 10 ** places
    const answer = fraction(5, 10 ** (places + 1))
    const valueLatex = value.toFixed(places).replace('.', '{,}')
    const choices = options(random, answer, [{ value: fraction(1, 10 ** places), error: 'whole-unit' }, { value: fraction(5, 10 ** places), error: 'calculation' }, { value: fraction(1, 10 ** (places + 1)), error: 'calculation' }])
    return choices && build(2, 'bound', say(`${math(valueLatex)} biribildutako neurketa da. Zein da errore absolutuaren bornea?`, `${math(valueLatex)} es una medida redondeada. ¿Cuál es la cota del error absoluto?`, `${math(valueLatex)} قياس مقرّب. ما حدّ الخطأ المطلق؟`, `${math(valueLatex)} is a rounded measurement. What is the bound of the absolute error?`), choices, answer, say(`Azken zifraren unitate erdia: ${math(written(answer)!)}.`, `Media unidad de la última cifra: ${math(written(answer)!)}.`, `نصف وحدة الرقم الأخير: ${math(written(answer)!)}.`, `Half a unit of the last figure: ${math(written(answer)!)}.`), { places })
}

function relativeQuestion(random: Random): BachRealsRaceQuestion | null {
    const measure = pick(random, [20, 25, 40, 50, 80, 125, 200, 250])
    const error = pick(random, [1, 2, 4, 5].filter((item) => (100 * item) % measure === 0 || (1000 * item) % measure === 0))
    if (error === undefined) return null
    const answer = fraction(100 * error, measure)
    const choices = options(random, answer, [exact(measure / error, 'upside-down'), exact(error, 'calculation'), exact((100 * measure) / error / 100, 'upside-down')])
    return choices && build(2, 'relative', say(`${measure} g neurtzean ${error} g-ko errorea egin da. Zein da errore erlatiboa, ehunekotan?`, `Al medir ${measure} g se comete un error de ${error} g. ¿Cuál es el error relativo, en porcentaje?`, `عند قياس ${measure} غ نخطئ بمقدار ${error} غ. ما الخطأ النسبي بالنسبة المئوية؟`, `Measuring ${measure} g, an error of ${error} g is made. What is the relative error, as a percentage?`), choices, answer, same(`\\frac{${error}}{${measure}}\\cdot 100=${written(answer)}`), { measure, error })
}

/* ---------- Circuit 3: radicals and logarithms ---------- */

function extractQuestion(random: Random): BachRealsRaceQuestion | null {
    const k = randomInt(random, 2, 7)
    const m = pick(random, [2, 3, 5, 6, 7])
    const answer = fraction(k)
    const choices = options(random, answer, [whole(k * k, 'outside'), whole(m, 'calculation'), whole(k * m, 'calculation')])
    return choices && build(3, 'extract', howMuch(`\\sqrt{${k * k * m}}=a\\sqrt{${m}}`, 'a'), choices, answer, same(`\\sqrt{${k * k}\\cdot ${m}}=${k}\\sqrt{${m}}`), { k, m })
}

function rationalizeQuestion(random: Random): BachRealsRaceQuestion | null {
    const b = pick(random, [2, 3, 5, 6, 7])
    const c = randomInt(random, 1, 5)
    const answer = fraction(c)
    const choices = options(random, answer, [whole(c * b, 'denominator'), whole(c * b * b, 'denominator'), whole(c + 1, 'calculation')])
    return choices && build(3, 'rationalize', howMuch(`\\frac{${c * b}}{\\sqrt{${b}}}=a\\sqrt{${b}}`, 'a'), choices, answer, same(`\\frac{${c * b}\\sqrt{${b}}}{${b}}=${c}\\sqrt{${b}}`), { b, c })
}

function logQuestion(random: Random, tier: Tier): BachRealsRaceQuestion | null {
    const base = pick(random, [2, 3, 5, 10])
    const e = randomInt(random, tier === 0 ? 2 : -2, base === 2 ? 6 : 3)
    if (e === 0 || e === 1) return null
    const value = e > 0 ? String(base ** e) : `\\frac{1}{${base ** -e}}`
    const answer = fraction(e)
    const choices = options(random, answer, [whole(e > 0 ? base ** e / base : -(base ** -e) / base, 'log-value'), whole(-e, 'calculation'), whole(e > 0 ? base ** e : base ** -e, 'log-value')])
    return choices && build(3, 'log', calc(`\\log_{${base}} ${value}`), choices, answer, same(`${base}^{${e}}=${value}`), { base, e })
}

function logSumQuestion(random: Random): BachRealsRaceQuestion | null {
    const m = randomInt(random, 1, 4)
    const n = randomInt(random, 1, 4)
    const answer = fraction(m + n)
    const sumLog = Math.log2(2 ** m + 2 ** n)
    const choices = options(random, answer, [whole(m * n, 'log-sum'), exact(Math.round(sumLog * 100) / 100, 'log-sum'), whole(2 ** (m + n), 'log-value')])
    return choices && build(3, 'log-sum', calc(`\\log_2 ${2 ** m}+\\log_2 ${2 ** n}`), choices, answer, same(`\\log_2(${2 ** m}\\cdot ${2 ** n})=\\log_2 ${2 ** (m + n)}=${m + n}`), { m, n })
}

/* ---------- Circuit 4: the binomial theorem ---------- */

function binomialQuestion(random: Random, tier: Tier): BachRealsRaceQuestion | null {
    const n = randomInt(random, 4, tier === 0 ? 7 : 10)
    const k = randomInt(random, 2, n - 2)
    const answer = fraction(binomial(n, k))
    const choices = options(random, answer, [whole(n * k, 'binomial-product'), whole(binomial(n, k) * factorialOf(k), 'binomial-product'), whole(binomial(n, k - 1), 'calculation')])
    return choices && build(4, 'binomial', calc(`\\binom{${n}}{${k}}`), choices, answer, same(`\\binom{${n}}{${k}}=${binomial(n, k)}`), { n, k })
}

function factorialOf(n: number): number {
    return n <= 1 ? 1 : n * factorialOf(n - 1)
}

function termsQuestion(random: Random): BachRealsRaceQuestion | null {
    const n = randomInt(random, 4, 12)
    const answer = fraction(n + 1)
    const choices = options(random, answer, [whole(n, 'terms'), whole(2 * n, 'terms'), whole(n - 1, 'terms')])
    return choices && build(4, 'terms', say(`Zenbat gai ditu ${math(`(a+b)^{${n}}`)} garapenak?`, `¿Cuántos términos tiene el desarrollo de ${math(`(a+b)^{${n}}`)}?`, `كم حدًّا في نشر ${math(`(a+b)^{${n}}`)}؟`, `How many terms does the expansion of ${math(`(a+b)^{${n}}`)} have?`), choices, answer, same(`${n}+1=${n + 1}`), { n })
}

function coefficientQuestion(random: Random): BachRealsRaceQuestion | null {
    const n = randomInt(random, 4, 7)
    const power = randomInt(random, 1, n - 1)
    const b = pick(random, [1, 2])
    const k = n - power
    const value = binomial(n, k) * b ** k
    const answer = fraction(value)
    const choices = options(random, answer, [whole(binomial(n, k), 'calculation'), whole(binomial(n, k + 1 > n ? k - 1 : k + 1) * b ** k, 'calculation'), whole(n * b ** k, 'binomial-product')])
    const expression = `(x+${b})^{${n}}`
    return choices && build(4, 'coefficient', say(`Zein da ${math(`x^{${power}}`)} gaiaren koefizientea ${math(expression)} garatzean?`, `¿Cuál es el coeficiente de ${math(`x^{${power}}`)} al desarrollar ${math(expression)}?`, `ما معامل ${math(`x^{${power}}`)} عند نشر ${math(expression)}؟`, `What is the coefficient of ${math(`x^{${power}}`)} when you expand ${math(expression)}?`), choices, answer, same(`\\binom{${n}}{${k}}\\cdot ${b}^{${k}}=${value}`), { n, power, b })
}

function rowQuestion(random: Random): BachRealsRaceQuestion | null {
    const n = randomInt(random, 3, 10)
    const answer = fraction(2 ** n)
    const choices = options(random, answer, [whole(2 * n, 'row'), whole(n * n, 'row'), whole(2 ** (n - 1), 'row')])
    return choices && build(4, 'row', say(`Zenbat da Tartagliaren ${n}. errenkadako zenbakien batura?`, `¿Cuánto suman los números de la fila ${n} de Tartaglia?`, `كم مجموع أعداد الصف ${n} في مثلث تارتاليا؟`, `What do the numbers in row ${n} of Tartaglia add up to?`), choices, answer, same(`2^{${n}}=${2 ** n}`), { n })
}

type Generator = (random: Random, tier: Tier) => BachRealsRaceQuestion | null

const circuitGenerators: Generator[][] = [
    [intersectionQuestion, periodQuestion, hypotenuseQuestion],
    [distanceQuestion, absoluteQuestion, neighbourhoodQuestion, radiusQuestion],
    [figuresQuestion, boundQuestion, relativeQuestion],
    [extractQuestion, rationalizeQuestion, logQuestion, logSumQuestion],
    [binomialQuestion, termsQuestion, coefficientQuestion, rowQuestion]
]

export function generateBachRealsRaceQuestion(random: Random, circuit: number, tier: Tier): BachRealsRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkBachRealsPitAnswer(question: RaceQuestion<BachRealsRaceError>, input: string): AnswerCheck {
    return checkAnswer(input, question.answer, question.answerForm)
}

export function bachRealsParTime(circuit: number): number {
    return parTimeFor([12, 11, 12, 12, 12][circuit] ?? 12)
}

export const bachRealsRaceErrorTips: Record<BachRealsRaceError, LocalizedText> = {
    union: say('∩ bietan daudenak dira; ∪ batean edo bestean.', '∩ son los que están en los dos; ∪, en uno o en otro.', '∩ هي العناصر الموجودة في الاثنتين، و∪ في إحداهما أو الأخرى.', '∩ is those in both; ∪, those in one or the other.'),
    period: say('Bi zifrako periodoa: 99 behean, ez 100 edo 90.', 'Periodo de dos cifras: 99 abajo, no 100 ni 90.', 'دورة من رقمين: 99 في المقام، لا 100 ولا 90.', 'A two-figure repeating block: 99 underneath, not 100 or 90.'),
    'legs-added': say('n katetoen karratuen batura da, ez katetoen batura.', 'n es la suma de los cuadrados de los catetos, no la suma de los catetos.', 'n مجموع مربعي الضلعين القائمين، لا مجموع الضلعين.', 'n is the sum of the squares of the legs, not the sum of the legs.'),
    'distance-sign': say('Distantzia |b − a| da: lehenik kendu, gero zeinua kendu.', 'La distancia es |b − a|: primero resta y después quita el signo.', 'المسافة |b − a|: اطرح أولًا ثم احذف الإشارة.', 'The distance is |b − a|: subtract first, then drop the sign.'),
    'one-side': say('|x − a| = r: bi soluzio, a + r eta a − r.', '|x − a| = r: dos soluciones, a + r y a − r.', '|x − a| = r: حلّان، a + r وa − r.', '|x − a| = r: two solutions, a + r and a − r.'),
    'radius-length': say('Erradioa luzeraren erdia da.', 'El radio es la mitad de la longitud.', 'نصف القطر نصف الطول.', 'The radius is half the length.'),
    'left-zeros': say('Ezkerreko zeroak ez dira zifra esanguratsuak.', 'Los ceros de la izquierda no son cifras significativas.', 'الأصفار على اليسار ليست أرقامًا معنوية.', 'Zeros on the left are not significant figures.'),
    'whole-unit': say('Biribiltzean, bornea unitate erdia da, ez osoa.', 'Al redondear, la cota es media unidad, no una entera.', 'عند التدوير الحدّ نصف وحدة لا وحدة كاملة.', 'When rounding, the bound is half a unit, not a whole one.'),
    'upside-down': say('Errore erlatiboa = errorea : neurria, eta bider 100.', 'Error relativo = error ÷ medida, y por 100.', 'الخطأ النسبي = الخطأ ÷ القياس، ثم في 100.', 'Relative error = error ÷ measurement, times 100.'),
    outside: say('√(k² · m) = k√m: kanpora k ateratzen da, ez k².', '√(k² · m) = k√m: sale k, no k².', '√(k² · m) = k√m: يخرج k لا k².', '√(k² · m) = k√m: k comes out, not k².'),
    denominator: say('√b · √b = b: zatitu izendatzaileaz.', '√b · √b = b: divide entre el denominador.', '√b · √b = b: اقسم على المقام.', '√b · √b = b: divide by the denominator.'),
    'log-value': say('Logaritmoa berretzailea da, ez zatiketa ez balioa.', 'El logaritmo es el exponente, no una división ni el valor.', 'اللوغاريتم هو الأس، لا قسمة ولا القيمة.', 'The logarithm is the exponent, not a division or the value.'),
    'log-sum': say('log m + log n = log(m · n): biderkadura, ez batura.', 'log m + log n = log(m · n): producto, no suma.', 'log m + log n = log(m · n): ضرب لا جمع.', 'log m + log n = log(m · n): a product, not a sum.'),
    'binomial-product': say('C(n, k) = n! : (k! · (n − k)!), ez n · k.', 'C(n, k) = n! ÷ (k! · (n − k)!), no n · k.', 'C(n, k) = n! ÷ (k! · (n − k)!)، لا n · k.', 'C(n, k) = n! ÷ (k! · (n − k)!), not n · k.'),
    terms: say('(a + b)ⁿ garapenak n + 1 gai ditu.', 'El desarrollo de (a + b)ⁿ tiene n + 1 términos.', 'نشر (a + b)ⁿ فيه n + 1 حدًّا.', 'The expansion of (a + b)ⁿ has n + 1 terms.'),
    row: say('n errenkadaren batura 2ⁿ da.', 'La fila n suma 2ⁿ.', 'مجموع الصف n هو 2ⁿ.', 'Row n adds up to 2ⁿ.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}
