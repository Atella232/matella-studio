import { checkAnswer, fraction, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { written } from '../../batx1-zientziak-errealak/games/race.ts'

/* ==========================================================================
   Aljebraren lasterketa (Batxilergoa 1 · Gizarte Zientziak): five circuits,
   one per stage — polynomials (a remainder, a root, a simplified fraction),
   equations (biquadratic, radical, exponential, logarithmic), systems (two
   prices, sum and product, triangular), inequalities (the greatest
   integer, how many integers) and economics (break-even, profit,
   equilibrium). The wrong options are the typical mistakes; every question
   carries `meta`, the numbers the tests check it against.
   ========================================================================== */

export const GIZ_ALGEBRA_RACE_CIRCUITS = 5

export type GizAlgebraRaceError = 'remainder-sign' | 'false-root' | 'negative-t' | 'exponent' | 'log-sum' | 'other-unknown' | 'flip' | 'endpoint' | 'margin' | 'no-fixed' | 'equilibrium-sign' | 'calculation'

export type GizAlgebraRaceQuestion = RaceQuestion<GizAlgebraRaceError> & { meta: Record<string, number> }

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const same = (latex: string): LocalizedText => ({ eu: `$${latex}$`, es: `$${latex}$`, en: `$${latex}$`, ar: `$${latex}$` })
/** A formula inside a sentence; in Arabic isolated left to right */
const f = (latex: string) => `$${latex}$`
const fa = (latex: string) => `⁦$${latex}$⁩`
/** A whole number for LaTeX: thousands with \\, from five digits (15\\,728), as the unit writes them */
const big = (value: number) => (Math.abs(value) >= 10000 ? `${value < 0 ? '-' : ''}${String(Math.abs(value)).replace(/\B(?=(\d{3})+(?!\d))/g, '\\,')}` : String(value))
const signed = (value: number, letter = '') => (value < 0 ? `-${Math.abs(value) === 1 && letter ? '' : Math.abs(value)}${letter}` : `+${value === 1 && letter ? '' : value}${letter}`)

interface Candidate {
    /** null when the mistake does not give a whole number: then it is not offered */
    value: FractionValue | null
    error: GizAlgebraRaceError
}
const wrongAs = (value: number, error: GizAlgebraRaceError): Candidate => ({ value: Number.isInteger(value) ? fraction(value) : null, error })
const nearby = (value: number): Candidate[] => [value + 1, value - 1, value + 2, value * 2].map((item) => wrongAs(item, 'calculation'))

/** The right option and three different mistakes */
function options(random: Random, right: FractionValue, candidates: Candidate[]): RaceOption<GizAlgebraRaceError>[] | null {
    const rightLatex = written(right)
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: GizAlgebraRaceError }> = []
    for (const candidate of [...candidates, ...nearby(right.numerator / right.denominator)]) {
        if (wrong.length === 3) break
        if (candidate.value === null) continue
        const latex = written(candidate.value)
        if (latex === null || used.has(latex)) continue
        used.add(latex)
        wrong.push({ latex, error: candidate.error })
    }
    if (wrong.length < 3) return null
    return shuffle(random, [{ latex: rightLatex, correct: true, error: null }, ...wrong.map((item) => ({ latex: item.latex, correct: false, error: item.error }))])
}

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<GizAlgebraRaceError>[], answer: FractionValue, solution: LocalizedText, meta: Record<string, number>): GizAlgebraRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution, meta }
}

/* ---------- Circuit 0: polynomials and fractions ---------- */

function remainderQuestion(random: Random): GizAlgebraRaceQuestion | null {
    const a = randomInt(random, -3, 3)
    if (a === 0) return null
    const [p, q, r] = [randomInt(random, -4, 4), randomInt(random, -5, 5), randomInt(random, -6, 6)]
    const value = a ** 3 + p * a * a + q * a + r
    const mirror = -(a ** 3) + p * a * a - q * a + r
    const poly = `x^{3}${p ? signed(p, 'x^{2}') : ''}${q ? signed(q, 'x') : ''}${r ? signed(r) : ''}`
    const divisor = a > 0 ? `x-${a}` : `x+${-a}`
    const choices = options(random, fraction(value), [wrongAs(mirror, 'remainder-sign'), wrongAs(r, 'calculation'), wrongAs(value + a, 'calculation')])
    return choices && build(0, 'remainder', say(`Hondarra: ${f(poly)} zati ${f(divisor)}`, `Resto de ${f(poly)} entre ${f(divisor)}`, `باقي قسمة ${fa(poly)} على ${fa(divisor)}`, `Remainder of ${f(poly)} divided by ${f(divisor)}`), choices, fraction(value), same(`P(${a})=${value}`), { a, p, q, r })
}

function rootQuestion(random: Random): GizAlgebraRaceQuestion | null {
    // (x − r)(x² + s·x + t) with no other integer root among the options
    const r = pick(random, [-3, -2, -1, 1, 2, 3])
    const others = [-3, -2, -1, 1, 2, 3].filter((value) => value !== r)
    const [m, n] = [pick(random, others), randomInt(random, 4, 9)]
    // x² − m·x + n with m² < 4n has no real root, so r is the only one
    if (m * m >= 4 * n) return null
    const coefficients = [1, -m - r, n + m * r, -n * r]
    const poly = `x^{3}${coefficients[1] ? signed(coefficients[1], 'x^{2}') : ''}${coefficients[2] ? signed(coefficients[2], 'x') : ''}${signed(coefficients[3])}`
    const choices = options(random, fraction(r), [wrongAs(-r, 'remainder-sign'), ...others.filter((value) => value !== -r).map((value) => wrongAs(value, 'calculation'))])
    return choices && build(0, 'root', say(`Zein da ${f(poly)} polinomioaren erroa?`, `¿Qué número es raíz de ${f(poly)}?`, `أيّ عدد جذر لـ ${fa(poly)}؟`, `Which number is a root of ${f(poly)}?`), choices, fraction(r), same(`P(${r})=0`), { r, b: coefficients[1], c: coefficients[2], d: coefficients[3] })
}

function fractionQuestion(random: Random): GizAlgebraRaceQuestion | null {
    // (x² − a²) ÷ (x − a) = x + a, worth x + a at x = v
    const a = randomInt(random, 1, 6)
    const v = randomInt(random, -5, 9)
    if (v === a) return null
    const value = v + a
    const choices = options(random, fraction(value), [wrongAs(v - a, 'calculation'), wrongAs(v * v - a * a, 'calculation'), wrongAs(value + 1, 'calculation')])
    return choices && build(0, 'fraction', say(`${f(`\\frac{x^{2}-${a * a}}{x-${a}}`)} balioa, ${f(`x=${v}`)} denean`, `Valor de ${f(`\\frac{x^{2}-${a * a}}{x-${a}}`)} para ${f(`x=${v}`)}`, `قيمة ${fa(`\\frac{x^{2}-${a * a}}{x-${a}}`)} عند ${fa(`x=${v}`)}`, `Value of ${f(`\\frac{x^{2}-${a * a}}{x-${a}}`)} at ${f(`x=${v}`)}`), choices, fraction(value), same(`x+${a}=${value}`), { a, v })
}

/* ---------- Circuit 1: equations ---------- */

function biquadraticQuestion(random: Random): GizAlgebraRaceQuestion | null {
    // x⁴ − (m² + n²)x² + m²n² = 0, or with t = −n: only ±m
    const m = randomInt(random, 1, 4)
    const n = randomInt(random, 1, 5)
    if (m === n) return null
    const negative = random() < 0.4
    const answer = negative ? m : Math.max(m, n)
    const middle = negative ? n * n - m * m : -(m * m + n * n)
    const last = negative ? -m * m * n * n : m * m * n * n
    const equation = `x^{4}${signed(middle, 'x^{2}')}${signed(last)}=0`
    const choices = options(random, fraction(answer), [wrongAs(negative ? n : Math.min(m, n), negative ? 'negative-t' : 'calculation'), wrongAs(answer * answer, 'calculation'), wrongAs(negative ? n * n : m * m + n * n, 'calculation')])
    return choices && build(1, 'biquadratic', say(`Soluziorik handiena: ${f(equation)}`, `Mayor solución de ${f(equation)}`, `أكبر حل لـ ${fa(equation)}`, `Greatest solution of ${f(equation)}`), choices, fraction(answer), same(negative ? `t=${m * m},\\ t=-${n * n}\\ \\to\\ x=\\pm ${m}` : `t=${m * m},\\ t=${n * n}\\ \\to\\ x=${answer}`), { m, n, negative: negative ? 1 : 0 })
}

function radicalQuestion(random: Random): GizAlgebraRaceQuestion | null {
    // √(x + a) = x − b: true root t > b, false root f < b
    const b = randomInt(random, 1, 4)
    const t = b + randomInt(random, 2, 5)
    const fake = 2 * b + 1 - t
    const a = b * b - t * fake
    if (fake >= b || fake + a < 0 || a <= 0) return null
    const choices = options(random, fraction(t), [wrongAs(fake, 'false-root'), wrongAs(t + fake, 'calculation'), wrongAs(t * t, 'calculation')])
    return choices && build(1, 'radical', say(`Soluzioa: ${f(`\\sqrt{x+${a}}=x-${b}`)}`, `Solución de ${f(`\\sqrt{x+${a}}=x-${b}`)}`, `حل ${fa(`\\sqrt{x+${a}}=x-${b}`)}`, `Solution of ${f(`\\sqrt{x+${a}}=x-${b}`)}`), choices, fraction(t), same(`\\sqrt{${t + a}}=${t - b}`), { a, b, t })
}

function exponentialQuestion(random: Random): GizAlgebraRaceQuestion | null {
    const base = pick(random, [2, 3, 5])
    const shift = randomInt(random, -2, 3)
    const power = randomInt(random, 2, base === 2 ? 6 : 4)
    const value = power - shift
    const target = base ** power
    const exponent = shift === 0 ? 'x' : `x${signed(shift)}`
    const choices = options(random, fraction(value), [wrongAs(power, 'exponent'), wrongAs(power + shift, 'exponent'), wrongAs(target / base, 'calculation')])
    return choices && build(1, 'exponential', say(`Ebatzi ${f(`${base}^{${exponent}}=${target}`)}`, `Resuelve ${f(`${base}^{${exponent}}=${target}`)}`, `حل ${fa(`${base}^{${exponent}}=${target}`)}`, `Solve ${f(`${base}^{${exponent}}=${target}`)}`), choices, fraction(value), same(`${exponent}=${power}\\ \\to\\ x=${value}`), { base, shift, power })
}

function logQuestion(random: Random): GizAlgebraRaceQuestion | null {
    // log x + log k = log m: x = m ÷ k
    const k = randomInt(random, 2, 6)
    const value = randomInt(random, 2, 12)
    const m = k * value
    const choices = options(random, fraction(value), [wrongAs(m - k, 'log-sum'), wrongAs(m + k, 'calculation'), wrongAs(m * k, 'calculation')])
    return choices && build(1, 'log', say(`Ebatzi ${f(`\\log x+\\log ${k}=\\log ${m}`)}`, `Resuelve ${f(`\\log x+\\log ${k}=\\log ${m}`)}`, `حل ${fa(`\\log x+\\log ${k}=\\log ${m}`)}`, `Solve ${f(`\\log x+\\log ${k}=\\log ${m}`)}`), choices, fraction(value), same(`${k}x=${m}\\ \\to\\ x=${value}`), { k, m })
}

/* ---------- Circuit 2: systems ---------- */

function pricesQuestion(random: Random): GizAlgebraRaceQuestion | null {
    const a = pick(random, [4, 5, 6, 8])
    const b = a + pick(random, [2, 3, 4])
    const x = randomInt(random, 2, 12) * 5
    const y = randomInt(random, 2, 12) * 5
    if (x === y) return null
    const total = x + y
    const takings = a * x + b * y
    const choices = options(random, fraction(y), [wrongAs(x, 'other-unknown'), wrongAs(Math.round(total / 2), 'calculation'), wrongAs(y + 5, 'calculation')])
    return choices && build(2, 'prices', say(`${total} sarrera, ${a} eta ${b} eurokoak, ${takings} euro. Zenbat ${b} eurokoak?`, `${total} entradas de ${a} y ${b} euros, ${takings} euros. ¿Cuántas de ${b} euros?`, `${total} تذكرة بسعر ${a} و${b} يورو، ${takings} يورو. كم تذكرة بسعر ${b} يورو؟`, `${total} tickets at ${a} and ${b} euros, ${takings} euros. How many at ${b} euros?`), choices, fraction(y), same(`${b - a}y=${takings}-${a}\\cdot ${total}\\ \\to\\ y=${y}`), { a, b, total, takings })
}

function sumProductQuestion(random: Random): GizAlgebraRaceQuestion | null {
    const small = randomInt(random, 1, 8)
    const big = small + randomInt(random, 1, 6)
    const s = small + big
    const p = small * big
    const choices = options(random, fraction(big), [wrongAs(small, 'other-unknown'), wrongAs(s, 'calculation'), wrongAs(p, 'calculation')])
    return choices && build(2, 'sum-product', say(`${f(`x+y=${s}`)}, ${f(`xy=${p}`)}: $x$ handiena`, `${f(`x+y=${s}`)}, ${f(`xy=${p}`)}: la mayor $x$`, `${fa(`x+y=${s}`)} و${fa(`xy=${p}`)}: أكبر ${fa('x')}`, `${f(`x+y=${s}`)}, ${f(`xy=${p}`)}: the greatest $x$`), choices, fraction(big), same(`x^{2}-${s}x+${p}=0\\ \\to\\ x=${small},\\ x=${big}`), { s, p })
}

function triangularQuestion(random: Random): GizAlgebraRaceQuestion | null {
    const [x, y, z] = [randomInt(random, -4, 6), randomInt(random, -4, 6), randomInt(random, 1, 6)]
    const k = randomInt(random, 2, 4)
    const total = x + y + z
    const middle = y + k * z
    const choices = options(random, fraction(x), [wrongAs(total - z, 'calculation'), wrongAs(y, 'other-unknown'), wrongAs(total - y, 'calculation')])
    const system = `x+y+z=${total},\\ y+${k}z=${middle},\\ z=${z}`
    return choices && build(2, 'triangular', say(`${f(system)}. Zenbat da $x$?`, `${f(system)}. ¿Cuánto vale $x$?`, `${fa(system)}. كم قيمة ${fa('x')}؟`, `${f(system)}. What is $x$?`), choices, fraction(x), same(`y=${y}\\ \\to\\ x=${x}`), { total, middle, z, k })
}

/* ---------- Circuit 3: inequalities ---------- */

function greatestQuestion(random: Random): GizAlgebraRaceQuestion | null {
    // a − k·x > c: x < bound (a whole number), the greatest integer is bound − 1
    const k = randomInt(random, 2, 5)
    const bound = randomInt(random, -3, 8)
    const a = randomInt(random, 1, 12)
    const c = a - k * bound
    const choices = options(random, fraction(bound - 1), [wrongAs(bound, 'endpoint'), wrongAs(bound + 1, 'flip'), wrongAs(-bound, 'flip')])
    return choices && build(3, 'greatest', say(`Zenbaki osorik handiena: ${f(`${a}-${k}x>${c}`)}`, `Mayor entero que cumple ${f(`${a}-${k}x>${c}`)}`, `أكبر عدد صحيح يحقق ${fa(`${a}-${k}x>${c}`)}`, `Greatest integer with ${f(`${a}-${k}x>${c}`)}`), choices, fraction(bound - 1), same(`x<${bound}\\ \\to\\ ${bound - 1}`), { a, k, c })
}

function countQuadraticQuestion(random: Random): GizAlgebraRaceQuestion | null {
    const a = randomInt(random, -4, 3)
    const b = a + randomInt(random, 2, 7)
    const count = b - a + 1
    const poly = `(x${signed(-a)})(x${signed(-b)})\\le 0`.replace('(x+0)', 'x').replace('(x-0)', 'x')
    const choices = options(random, fraction(count), [wrongAs(b - a - 1, 'endpoint'), wrongAs(b - a, 'endpoint'), wrongAs(count + 2, 'calculation')])
    return choices && build(3, 'count-quadratic', say(`Zenbat zenbaki osok betetzen dute ${f(poly)}?`, `¿Cuántos enteros cumplen ${f(poly)}?`, `كم عددًا صحيحًا يحقق ${fa(poly)}؟`, `How many integers satisfy ${f(poly)}?`), choices, fraction(count), same(`[${a},\\,${b}]\\ \\to\\ ${count}`), { a, b })
}

function countRationalQuestion(random: Random): GizAlgebraRaceQuestion | null {
    const a = randomInt(random, 1, 6)
    const b = randomInt(random, 1, 5)
    const count = a + b
    const choices = options(random, fraction(count), [wrongAs(count + 1, 'endpoint'), wrongAs(count - 1, 'endpoint'), wrongAs(a - b > 0 ? a - b : a * b, 'calculation')])
    return choices && build(3, 'count-rational', say(`Zenbat zenbaki osok betetzen dute ${f(`\\frac{x-${a}}{x+${b}}\\le 0`)}?`, `¿Cuántos enteros cumplen ${f(`\\frac{x-${a}}{x+${b}}\\le 0`)}?`, `كم عددًا صحيحًا يحقق ${fa(`\\frac{x-${a}}{x+${b}}\\le 0`)}؟`, `How many integers satisfy ${f(`\\frac{x-${a}}{x+${b}}\\le 0`)}?`), choices, fraction(count), same(`(-${b},\\,${a}]\\ \\to\\ ${count}`), { a, b })
}

/* ---------- Circuit 4: the algebra of economics ---------- */

function breakEvenQuestion(random: Random): GizAlgebraRaceQuestion | null {
    const margin = randomInt(random, 2, 9)
    const cost = randomInt(random, 2, 12)
    const point = randomInt(random, 2, 30) * 10
    const fixed = margin * point
    const price = cost + margin
    const choices = options(random, fraction(point), [wrongAs(fixed / price, 'margin'), wrongAs(fixed / cost, 'margin'), wrongAs(point * 2, 'calculation')])
    return choices && build(4, 'break-even', say(`Kostu finkoak ${fixed} euro, kostua ${cost} euro, prezioa ${price} euro. Atalasea?`, `Costes fijos ${fixed} euros, coste ${cost} euros, precio ${price} euros. ¿Punto muerto?`, `تكاليف ثابتة ${fixed} يورو، تكلفة ${cost} يورو، سعر ${price} يورو. نقطة التعادل؟`, `Fixed costs ${fixed} euros, cost ${cost} euros, price ${price} euros. Break-even?`), choices, fraction(point), same(`\\frac{${fixed}}{${price}-${cost}}=${point}`), { fixed, cost, price })
}

function profitQuestion(random: Random): GizAlgebraRaceQuestion | null {
    const price = randomInt(random, 6, 20)
    const cost = randomInt(random, 1, price - 2)
    const fixed = randomInt(random, 2, 20) * 100
    // At most 9 · 50 = 450 units, so no amount reaches five digits
    const units = randomInt(random, 2, 9) * 50
    const value = price * units - fixed - cost * units
    const choices = options(random, fraction(value), [wrongAs(price * units, 'no-fixed'), wrongAs(price * units - fixed, 'no-fixed'), wrongAs((price - cost) * units, 'no-fixed')])
    return choices && build(4, 'profit', say(`${f(`I(x)=${price}x`)}, ${f(`C(x)=${fixed}+${cost}x`)}: mozkina ${units} unitaterekin`, `${f(`I(x)=${price}x`)}, ${f(`C(x)=${fixed}+${cost}x`)}: beneficio con ${units} unidades`, `${fa(`I(x)=${price}x`)} و${fa(`C(x)=${fixed}+${cost}x`)}: الربح مع ${units} وحدة`, `${f(`I(x)=${price}x`)}, ${f(`C(x)=${fixed}+${cost}x`)}: profit with ${units} units`), choices, fraction(value), same(`${price}\\cdot ${units}-(${fixed}+${cost}\\cdot ${units})=${big(value)}`), { price, cost, fixed, units })
}

function equilibriumQuestion(random: Random): GizAlgebraRaceQuestion | null {
    const b = randomInt(random, 1, 5)
    const c = randomInt(random, 1, 6)
    const price = randomInt(random, 4, 30)
    const d = randomInt(random, 2, 12) * 5
    const a = (b + c) * price - d
    if (c * price - d <= 0) return null
    const choices = options(random, fraction(price), [{ value: fraction(a - d, b + c), error: 'equilibrium-sign' }, { value: fraction(a, b + c), error: 'equilibrium-sign' }, wrongAs(price + 5, 'calculation')])
    const demand = `${a}-${b === 1 ? '' : b}p`
    const supply = `${c === 1 ? '' : c}p-${d}`
    return choices && build(4, 'equilibrium', say(`Eskaria ${f(demand)}, eskaintza ${f(supply)}. Oreka-prezioa?`, `Demanda ${f(demand)}, oferta ${f(supply)}. ¿Precio de equilibrio?`, `الطلب ${fa(demand)} والعرض ${fa(supply)}. سعر التوازن؟`, `Demand ${f(demand)}, supply ${f(supply)}. Equilibrium price?`), choices, fraction(price), same(`${a + d}=${b + c}p\\ \\to\\ p=${price}`), { a, b, c, d })
}

type Generator = (random: Random, tier: Tier) => GizAlgebraRaceQuestion | null

const circuitGenerators: Generator[][] = [
    [remainderQuestion, rootQuestion, fractionQuestion],
    [biquadraticQuestion, radicalQuestion, exponentialQuestion, logQuestion],
    [pricesQuestion, sumProductQuestion, triangularQuestion],
    [greatestQuestion, countQuadraticQuestion, countRationalQuestion],
    [breakEvenQuestion, profitQuestion, equilibriumQuestion]
]

export function generateGizAlgebraRaceQuestion(random: Random, circuit: number, tier: Tier): GizAlgebraRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkGizAlgebraPitAnswer(question: RaceQuestion<GizAlgebraRaceError>, input: string): AnswerCheck {
    return checkAnswer(input, question.answer, question.answerForm)
}

export function gizAlgebraParTime(circuit: number): number {
    return parTimeFor([12, 13, 13, 12, 13][circuit] ?? 13)
}

export const gizAlgebraRaceErrorTips: Record<GizAlgebraRaceError, LocalizedText> = {
    'remainder-sign': say('x − a zatitzailearekin, hondarra P(a) da, ez P(−a).', 'Con el divisor x − a, el resto es P(a), no P(−a).', 'مع القاسم x − a يكون الباقي P(a) لا P(−a).', 'With the divisor x − a, the remainder is P(a), not P(−a).'),
    'false-root': say('Karratura jasotzean soluzio faltsuak ager daitezke: egiaztatu.', 'Al elevar al cuadrado salen soluciones falsas: compruébalas.', 'التربيع قد يعطي حلولًا زائفة: تحقق منها.', 'Squaring can give false solutions: check them.'),
    'negative-t': say('t = x² ezin da negatiboa izan.', 't = x² no puede ser negativa.', 't = x² لا يمكن أن تكون سالبة.', 't = x² cannot be negative.'),
    exponent: say('Berdindu berretzaile osoak, eta askatu x.', 'Iguala los exponentes enteros y despeja x.', 'ساوِ الأسس كاملة ثم اعزل x.', 'Set the whole exponents equal and solve for x.'),
    'log-sum': say('log a + log b = log(a · b): biderkatu, ez kendu.', 'log a + log b = log(a · b): multiplica, no restes.', 'log a + log b = log(a · b): اضرب ولا تطرح.', 'log a + log b = log(a · b): multiply, do not subtract.'),
    'other-unknown': say('Begiratu zein ezezagun eskatzen den.', 'Mira qué incógnita se pide.', 'انظر أيّ مجهول مطلوب.', 'Look at which unknown is asked for.'),
    flip: say('Negatibo batez zatitzean, desberdintza biratzen da.', 'Al dividir entre un negativo, la desigualdad se da la vuelta.', 'عند القسمة على سالب تنقلب المتراجحة.', 'Dividing by a negative flips the inequality.'),
    endpoint: say('Begiratu muturrak: ≤ barne, < kanpo; izendatzailearen erroa beti kanpo.', 'Mira los extremos: ≤ entra, < no; la raíz del denominador nunca.', 'انظر إلى الطرفين: ≤ يدخل و< لا، وجذر المقام لا يدخل أبدًا.', 'Look at the ends: ≤ is in, < is not; the root of the denominator never is.'),
    margin: say('Atalasea: kostu finkoak zati (prezioa − kostua).', 'Punto muerto: costes fijos entre (precio − coste).', 'نقطة التعادل: التكاليف الثابتة على (السعر − التكلفة).', 'Break-even: fixed costs divided by (price − cost).'),
    'no-fixed': say('Mozkina = diru-sarrerak − kostu finkoak − unitateko kostuak.', 'Beneficio = ingresos − costes fijos − costes por unidad.', 'الربح = الإيرادات − التكاليف الثابتة − تكاليف الوحدات.', 'Profit = income − fixed costs − unit costs.'),
    'equilibrium-sign': say('Aldez aldatzean, gaiak zeinua aldatzen du.', 'Al cambiar de lado, el término cambia de signo.', 'عند النقل إلى الطرف الآخر يتغير الإشارة.', 'Moving a term across changes its sign.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}
