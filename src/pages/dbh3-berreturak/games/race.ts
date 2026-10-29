import { checkAnswer, fraction, hasTerminatingDecimal, power, toExactDecimal, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'

/* ==========================================================================
   Berreturen lasterketa (3. DBH): five circuits, one per stage — powers
   (the sign of a power, a negative exponent, a negative exponent on a
   fraction, the rules aᵐ · aⁿ : aᵖ), scientific notation (the exponent of
   a number, of a product and of a quotient, a ratio of powers of ten),
   roots (exact roots, factors out and in, like radicals, a product),
   real numbers (how many irrationals, between which integers, integers in
   an interval, its length) and approximations (round, truncate, absolute
   and relative error). Wrong options are typical mistakes. Every question
   carries `meta`, the numbers the tests check it against.
   ========================================================================== */

export const POWERS_RACE_CIRCUITS = 5

export type PowersRaceError =
    | 'sign-base'
    | 'no-inverse'
    | 'negative-result'
    | 'multiply-exponents'
    | 'exponent-sign'
    | 'no-adjust'
    | 'sign'
    | 'no-root'
    | 'outside'
    | 'no-square'
    | 'add-radicands'
    | 'irrational'
    | 'interval'
    | 'round-trunc'
    | 'abs-rel'
    | 'calculation'

export type PowersRaceQuestion = RaceQuestion<PowersRaceError> & { meta: Record<string, number> }

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
const same = (latex: string): LocalizedText => ({ eu: `$${latex}$`, es: `$${latex}$`, ar: `$${latex.replace(/\{,\}/g, '.')}$` })
const math = (latex: string) => `$${latex}$`
const frac = (numerator: number, denominator: number) => fraction(numerator, denominator)

/** A value in LaTeX: a whole number, a short decimal, or a fraction */
export function written(value: FractionValue): string | null {
    if (value.denominator === 1) return String(value.numerator)
    if (Math.abs(value.numerator) > 99999 || value.denominator > 99999) return null
    if (hasTerminatingDecimal(value)) {
        const decimal = toExactDecimal(value, ',')
        if (decimal !== null) return decimal.replace(',', '{,}')
    }
    return `${value.numerator < 0 ? '-' : ''}\\frac{${Math.abs(value.numerator)}}{${value.denominator}}`
}

interface Candidate {
    value: FractionValue
    error: PowersRaceError
}
const whole = (value: number, error: PowersRaceError): Candidate => ({ value: fraction(Math.round(value)), error })
const decimalOf = (value: number, places: number, error: PowersRaceError): Candidate => ({ value: fraction(Math.round(value * 10 ** places), 10 ** places), error })
/** A power as a wrong option; nothing when it is too big to be a sensible option */
const powerOption = (base: number, exponent: number, error: PowersRaceError): Candidate[] => (Math.abs(exponent) > 8 || base ** Math.abs(exponent) > 100000 ? [] : [{ value: power(fraction(base), exponent), error }])
const near = (value: FractionValue): Candidate[] => {
    const x = value.numerator / value.denominator
    return [x + 1, x - 1, x + 2, -x].filter(Number.isInteger).map((item) => whole(item, 'calculation'))
}

/** The right option and three different mistakes */
function options(random: Random, right: FractionValue, candidates: Candidate[]): RaceOption<PowersRaceError>[] | null {
    const rightLatex = written(right)
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: PowersRaceError }> = []
    for (const candidate of candidates) {
        if (wrong.length === 3) break
        if (!Number.isFinite(candidate.value.numerator / candidate.value.denominator)) continue
        const latex = written(candidate.value)
        if (latex === null || latex === '-0' || used.has(latex)) continue
        used.add(latex)
        wrong.push({ latex, error: candidate.error })
    }
    if (wrong.length < 3) return null
    return shuffle(random, [{ latex: rightLatex, correct: true, error: null }, ...wrong.map((item) => ({ latex: item.latex, correct: false, error: item.error }))])
}

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<PowersRaceError>[], answer: FractionValue, solution: LocalizedText, meta: Record<string, number>): PowersRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution, meta }
}

const calc = (formula: string) => say(`Kalkulatu ${math(formula)}.`, `Calcula ${math(formula)}.`, `احسب ${math(formula)}.`)
const howMuch = (formula: string, letter: string) => say(`${math(formula)}. Zenbat da ${math(letter)}?`, `${math(formula)}. ¿Cuánto vale ${math(letter)}?`, `${math(formula)}. كم تساوي ${math(letter)}؟`)
const paren = (value: number) => (value < 0 ? `(${value})` : String(value))
const grouped = (value: number) => String(value).replace(/\B(?=(\d{3})+$)/g, '\\,')

/* ---------- Circuit 0: powers ---------- */

function signPowerQuestion(random: Random, tier: Tier): PowersRaceQuestion | null {
    const a = randomInt(random, 2, tier === 0 ? 5 : 7)
    const n = pick(random, tier === 0 ? [2, 3, 4] : [2, 3, 4, 5, 6])
    const bracketed = random() < 0.5
    const value = bracketed ? (-a) ** n : -(a ** n)
    const formula = bracketed ? `(-${a})^{${n}}` : `-${a}^{${n}}`
    const choices = options(random, fraction(value), [whole(-value, 'sign-base'), whole(-a * n, 'multiply-exponents'), whole(a * n, 'multiply-exponents'), whole(a ** (n - 1), 'calculation'), ...near(fraction(value))])
    const solution = bracketed ? same(`(-${a})^{${n}}=${value}`) : same(`-${a}^{${n}}=-(${a}^{${n}})=${value}`)
    return choices && build(0, 'sign-power', calc(formula), choices, fraction(value), solution, { a, n, bracketed: bracketed ? 1 : 0 })
}

function negativePowerQuestion(random: Random, tier: Tier): PowersRaceQuestion | null {
    const base = pick(random, tier === 0 ? [2, 3, 5, 10] : [-2, -3, 2, 3, 4, 5])
    const k = randomInt(random, 1, tier === 0 ? 3 : 4)
    const power_ = base ** k
    if (Math.abs(power_) > 1000) return null
    const answer = frac(1, power_)
    const choices = options(random, answer, [whole(power_, 'no-inverse'), whole(-power_, 'negative-result'), { value: frac(-1, power_), error: 'negative-result' }, whole(base * -k, 'multiply-exponents')])
    return choices && build(0, 'negative-power', calc(`${paren(base)}^{-${k}}`), choices, answer, same(`\\frac{1}{${paren(base)}^{${k}}}=${written(answer)}`), { base, k })
}

function fractionPowerQuestion(random: Random): PowersRaceQuestion | null {
    const a = randomInt(random, 1, 5)
    const b = randomInt(random, 2, 5)
    if (a === b) return null
    const k = randomInt(random, 1, 3)
    const answer = frac(b ** k, a ** k)
    const choices = options(random, answer, [{ value: frac(a ** k, b ** k), error: 'no-inverse' }, { value: frac(-(b ** k), a ** k), error: 'negative-result' }, { value: frac(-(a ** k), b ** k), error: 'negative-result' }, { value: frac(b * k, a), error: 'multiply-exponents' }])
    return choices && build(0, 'fraction-power', calc(`\\left(\\frac{${a}}{${b}}\\right)^{-${k}}`), choices, answer, same(`\\left(\\frac{${b}}{${a}}\\right)^{${k}}=${written(answer)}`), { a, b, k })
}

function rulesQuestion(random: Random, tier: Tier): PowersRaceQuestion | null {
    const base = pick(random, [2, 3, 5])
    const limit = tier === 0 ? 4 : 5
    const m = randomInt(random, tier === 0 ? 1 : -2, limit)
    const n = randomInt(random, tier === 0 ? 0 : -2, limit)
    const p = randomInt(random, tier === 0 ? 0 : -2, limit)
    const exponent = m + n - p
    if (exponent < -3 || exponent > 4) return null
    const answer = power(fraction(base), exponent)
    if (Math.abs(answer.numerator) > 700 || answer.denominator > 700) return null
    const choices = options(random, answer, [...powerOption(base, m * n - p, 'multiply-exponents'), ...powerOption(base, m + n + p, 'sign'), ...powerOption(base, m - n - p, 'sign'), ...powerOption(base, exponent + 1, 'calculation'), ...powerOption(base, exponent - 1, 'calculation')])
    return choices && build(0, 'rules', calc(`\\frac{${base}^{${m}}\\cdot ${base}^{${n}}}{${base}^{${p}}}`), choices, answer, same(`${base}^{${m}+${paren(n)}-${paren(p)}}=${base}^{${exponent}}=${written(answer)}`), { base, m, n, p })
}

/* ---------- Circuit 1: scientific notation ---------- */

function sciExponentQuestion(random: Random, tier: Tier): PowersRaceQuestion | null {
    const digits = pick(random, ['34', '52', '319', '8', '71', '608'])
    const exponent = tier === 0 ? pick(random, [-4, -3, 3, 5, 6]) : randomInt(random, -9, 9)
    if (exponent === 0) return null
    const mantissa = `${digits[0]}${digits.length > 1 ? `{,}${digits.slice(1)}` : ''}`
    const shown = exponent > 0 ? digits.padEnd(exponent + 1, '0') : `0{,}${'0'.repeat(-exponent - 1)}${digits}`
    if (shown.replace(/\D/g, '').length > 12) return null
    const text = exponent > 0 ? shown.replace(/\B(?=(\d{3})+$)/g, '\\,') : shown
    const step = exponent > 0 ? 1 : -1
    const choices = options(random, fraction(exponent), [whole(-exponent, 'exponent-sign'), whole(exponent + step, 'no-adjust'), whole(exponent - step, 'no-adjust'), ...near(fraction(exponent))])
    return choices && build(1, 'sci-exponent', howMuch(`${text}=${mantissa}\\cdot 10^{n}`, 'n'), choices, fraction(exponent), same(`${text}=${mantissa}\\cdot 10^{${exponent}}`), { exponent })
}

function sciProductQuestion(random: Random): PowersRaceQuestion | null {
    const a = pick(random, [2, 3, 4, 5, 6, 8])
    const b = pick(random, [2, 3, 4, 5, 7, 9])
    const p = randomInt(random, -6, 8)
    const q = randomInt(random, -6, 8)
    const product = a * b
    if (product < 10) return null
    const exponent = p + q + 1
    const mantissa = `${Math.floor(product / 10)}{,}${product % 10}`.replace('{,}0', '')
    const choices = options(random, fraction(exponent), [whole(p + q, 'no-adjust'), whole(p * q, 'multiply-exponents'), whole(p - q, 'sign'), ...near(fraction(exponent))])
    return choices && build(1, 'sci-product', howMuch(`(${a}\\cdot 10^{${p}})\\cdot(${b}\\cdot 10^{${q}})=${mantissa}\\cdot 10^{n}`, 'n'), choices, fraction(exponent), same(`${product}\\cdot 10^{${p + q}}=${mantissa}\\cdot 10^{${exponent}}`), { a, b, p, q })
}

function sciQuotientQuestion(random: Random): PowersRaceQuestion | null {
    const b = pick(random, [2, 3])
    const c = pick(random, [2, 3, 4])
    const a = b * c
    const p = randomInt(random, -4, 9)
    const q = randomInt(random, -4, 9)
    const exponent = p - q
    const choices = options(random, fraction(exponent), [whole(p + q, 'sign'), whole(q - p, 'sign'), whole(p * q, 'multiply-exponents'), ...near(fraction(exponent))])
    return choices && build(1, 'sci-quotient', howMuch(`\\frac{${a}\\cdot 10^{${p}}}{${b}\\cdot 10^{${q}}}=${c}\\cdot 10^{n}`, 'n'), choices, fraction(exponent), same(`\\frac{${a}}{${b}}\\cdot 10^{${p}-${paren(q)}}=${c}\\cdot 10^{${exponent}}`), { a, b, p, q })
}

function ratioQuestion(random: Random): PowersRaceQuestion | null {
    const q = randomInt(random, 1, 4)
    const gap = randomInt(random, 2, 5)
    const p = q + gap
    const answer = fraction(10 ** gap)
    const choices = options(random, answer, [whole(10 ** (p + q), 'sign'), whole(gap * 10, 'multiply-exponents'), whole(10 ** (gap + 1), 'no-adjust'), whole(10 ** (gap - 1), 'no-adjust')])
    return choices && build(1, 'ratio', say(`Zenbat aldiz handiagoa da ${math(`10^{${p}}`)}, ${math(`10^{${q}}`)} baino?`, `¿Cuántas veces mayor es ${math(`10^{${p}}`)} que ${math(`10^{${q}}`)}?`, `كم مرة ${math(`10^{${p}}`)} أكبر من ${math(`10^{${q}}`)}؟`), choices, answer, same(`10^{${p}-${q}}=10^{${gap}}=${grouped(10 ** gap)}`), { p, q })
}

/* ---------- Circuit 2: roots ---------- */

function exactRootQuestion(random: Random, tier: Tier): PowersRaceQuestion | null {
    const k = randomInt(random, tier === 0 ? 7 : 11, tier === 0 ? 15 : 25)
    const choices = options(random, fraction(k), [whole(-k, 'sign'), whole(Math.floor((k * k) / 2), 'no-root'), whole(k + 1, 'calculation'), whole(k - 1, 'calculation')])
    return choices && build(2, 'exact-root', calc(`\\sqrt{${k * k}}`), choices, fraction(k), same(`${k}^{2}=${k * k}`), { k })
}

function outsideQuestion(random: Random, tier: Tier): PowersRaceQuestion | null {
    const s = randomInt(random, 2, tier === 0 ? 6 : 9)
    const k = pick(random, [2, 3, 5, 6, 7])
    const radicand = s * s * k
    if (radicand > 400) return null
    const choices = options(random, fraction(s), [whole(s * s, 'no-square'), whole(s * k, 'outside'), whole(k, 'outside'), whole(s + 1, 'calculation'), whole(s - 1, 'calculation')])
    return choices && build(2, 'outside', howMuch(`\\sqrt{${radicand}}=a\\sqrt{${k}}`, 'a'), choices, fraction(s), same(`\\sqrt{${s}^{2}\\cdot ${k}}=${s}\\sqrt{${k}}`), { s, k })
}

function insideQuestion(random: Random): PowersRaceQuestion | null {
    const s = randomInt(random, 2, 7)
    const k = pick(random, [2, 3, 5, 6, 7])
    const n = s * s * k
    const choices = options(random, fraction(n), [whole(s * k, 'no-square'), whole(s + k, 'add-radicands'), whole(s * s + k, 'add-radicands'), whole(s * k * k, 'outside'), whole(s ** 3 * k, 'calculation')])
    return choices && build(2, 'inside', howMuch(`${s}\\sqrt{${k}}=\\sqrt{n}`, 'n'), choices, fraction(n), same(`${s}\\sqrt{${k}}=\\sqrt{${s}^{2}\\cdot ${k}}=\\sqrt{${n}}`), { s, k })
}

function likeQuestion(random: Random, tier: Tier): PowersRaceQuestion | null {
    const k = pick(random, [2, 3, 5, 6, 7])
    const p = randomInt(random, 2, 9)
    const q = randomInt(random, 1, 6)
    const r = randomInt(random, 1, tier === 0 ? 4 : 8)
    const total = p + q - r
    if (total < 1) return null
    const choices = options(random, fraction(total), [whole(p + q + r, 'sign'), whole(total * k, 'add-radicands'), whole(p + q - r + k, 'add-radicands'), whole(p * q - r, 'multiply-exponents'), ...near(fraction(total))])
    return choices && build(2, 'like', howMuch(`${p}\\sqrt{${k}}+${q}\\sqrt{${k}}-${r}\\sqrt{${k}}=a\\sqrt{${k}}`, 'a'), choices, fraction(total), same(`(${p}+${q}-${r})\\sqrt{${k}}=${total}\\sqrt{${k}}`), { p, q, r, k })
}

function productRootsQuestion(random: Random): PowersRaceQuestion | null {
    const a = pick(random, [2, 3, 5, 6, 7])
    const m = randomInt(random, 2, 6)
    const b = a * m * m
    const answer = a * m
    const choices = options(random, fraction(answer), [whole(a * b, 'no-root'), whole(a + b, 'add-radicands'), whole(m, 'calculation'), whole(Math.floor(b / 2), 'calculation'), ...near(fraction(answer))])
    return choices && build(2, 'product-roots', calc(`\\sqrt{${a}}\\cdot\\sqrt{${b}}`), choices, fraction(answer), same(`\\sqrt{${a}\\cdot ${b}}=\\sqrt{${a * b}}=${answer}`), { a, b })
}

/* ---------- Circuit 3: real numbers ---------- */

const RATIONAL_POOL = ['\\sqrt{25}', '\\sqrt{49}', '0{,}25', '\\frac{3}{7}', '0{,}\\overline{3}', '\\sqrt{81}', '3{,}14', '\\frac{22}{7}', '-\\frac{5}{2}']
const IRRATIONAL_POOL = ['\\sqrt{2}', '\\sqrt{3}', '\\sqrt{7}', '\\pi', '\\sqrt{10}', '\\sqrt{50}', '\\sqrt{11}', '2\\sqrt{3}']

function irrationalCountQuestion(random: Random): PowersRaceQuestion | null {
    const count = pick(random, [1, 2, 3, 4])
    const items = shuffle(random, [...shuffle(random, IRRATIONAL_POOL).slice(0, count), ...shuffle(random, RATIONAL_POOL).slice(0, 5 - count)])
    const choices = options(random, fraction(count), [whole(5 - count, 'irrational'), whole(count + 1, 'calculation'), whole(count - 1, 'calculation'), whole(count + 2, 'calculation'), whole(0, 'irrational')])
    return choices && build(3, 'irrational-count', say(`Hauetako zenbat dira irrazionalak: ${items.map(math).join(', ')}?`, `¿Cuántos de estos son irracionales: ${items.map(math).join(', ')}?`, `كم من هذه الأعداد غير نسبي: ${items.map(math).join(', ')}؟`), choices, fraction(count), say(`${count} irrazional: karratu perfektua ez diren erroak, π eta horien biderkaduren.`, `${count} irracionales: raíces de no cuadrados perfectos, π y sus múltiplos.`, `${count} غير نسبية: جذور غير المربعات الكاملة و π ومضاعفاتها.`), { count })
}

function betweenQuestion(random: Random, tier: Tier): PowersRaceQuestion | null {
    const n = randomInt(random, 2, tier === 0 ? 8 : 12)
    const radicand = randomInt(random, n * n + 1, (n + 1) * (n + 1) - 1)
    const choices = options(random, fraction(n), [whole(n + 1, 'no-adjust'), whole(Math.floor(radicand / 2), 'no-root'), whole(n - 1, 'calculation'), whole(n + 2, 'calculation')])
    return choices && build(3, 'between', say(`${math(`n<\\sqrt{${radicand}}<n+1`)}. Zenbat da ${math('n')}?`, `${math(`n<\\sqrt{${radicand}}<n+1`)}. ¿Cuánto vale ${math('n')}?`, `${math(`n<\\sqrt{${radicand}}<n+1`)}. كم تساوي ${math('n')}؟`), choices, fraction(n), same(`${n}^{2}=${n * n}<${radicand}<${(n + 1) ** 2}=${n + 1}^{2}`), { n, radicand })
}

function intervalCountQuestion(random: Random): PowersRaceQuestion | null {
    const a = randomInt(random, -5, 3)
    const b = a + randomInt(random, 3, 8)
    const closedA = random() < 0.5
    const closedB = random() < 0.5
    const count = b - a - 1 + (closedA ? 1 : 0) + (closedB ? 1 : 0)
    const interval = `${closedA ? '[' : '('}${a},\\,${b}${closedB ? ']' : ')'}`
    const choices = options(random, fraction(count), [whole(b - a, 'interval'), whole(b - a + 1, 'interval'), whole(b - a - 1, 'interval'), whole(count + 2, 'interval')])
    return choices && build(3, 'interval-count', say(`Zenbat zenbaki oso daude ${math(interval)} tartean?`, `¿Cuántos números enteros hay en el intervalo ${math(interval)}?`, `كم عددًا صحيحًا في الفترة ${math(interval)}؟`), choices, fraction(count), say(`${count} zenbaki oso: kortxeteko muturra sartzen da, parentesikoa ez.`, `${count} enteros: el extremo con corchete entra, el de paréntesis no.`, `${count} أعداد صحيحة: الطرف بقوس مربع داخل والآخر غير داخل.`), { a, b, closedA: closedA ? 1 : 0, closedB: closedB ? 1 : 0 })
}

function intervalLengthQuestion(random: Random): PowersRaceQuestion | null {
    const a = randomInt(random, -9, 4)
    const b = a + randomInt(random, 2, 12)
    const choices = options(random, fraction(b - a), [whole(b + a, 'sign'), whole(a - b, 'sign'), whole(b - a + 1, 'interval'), whole(b - a - 1, 'interval')])
    return choices && build(3, 'interval-length', say(`Zenbat da ${math(`[${a},\\,${b}]`)} tartearen luzera?`, `¿Cuánto mide la longitud del intervalo ${math(`[${a},\\,${b}]`)}?`, `كم طول الفترة ${math(`[${a},\\,${b}]`)}؟`), choices, fraction(b - a), same(`${b}-${paren(a)}=${b - a}`), { a, b })
}

/* ---------- Circuit 4: approximations ---------- */

/** A number with four decimals whose digits make rounding and truncating differ */
function awkwardNumber(random: Random, places: number): { text: string; value: number } | null {
    const whole_ = randomInt(random, 1, 9)
    const digits = Array.from({ length: 4 }, () => randomInt(random, 0, 9))
    // The first dropped digit is 5 or more, so that rounding goes up
    digits[places] = randomInt(random, 5, 9)
    const value = Number(`${whole_}.${digits.join('')}`)
    return { text: `${whole_}{,}${digits.join('')}`, value }
}

const PLACES: Record<number, LocalizedText> = {
    1: say('hamarrenetara', 'a las décimas', 'إلى الأعشار'),
    2: say('ehunenetara', 'a las centésimas', 'إلى الأجزاء من مئة'),
    3: say('milaenetara', 'a las milésimas', 'إلى الأجزاء من ألف')
}

function roundQuestion(random: Random, tier: Tier): PowersRaceQuestion | null {
    const places = pick(random, tier === 0 ? [1, 2] : [1, 2, 3])
    const number = awkwardNumber(random, places)
    if (!number) return null
    const factor = 10 ** places
    const rounded = Math.round(number.value * factor + 1e-9) / factor
    const truncated = Math.floor(number.value * factor + 1e-9) / factor
    const answer = fraction(Math.round(rounded * factor), factor)
    const choices = options(random, answer, [decimalOf(truncated, places, 'round-trunc'), decimalOf(rounded + 1 / factor, places, 'calculation'), decimalOf(Math.round(number.value * factor * 10 + 1e-9) / (factor * 10), places + 1, 'calculation')])
    return choices && build(4, 'round', say(`Biribildu ${math(number.text)} ${PLACES[places].eu}.`, `Redondea ${math(number.text)} ${PLACES[places].es}.`, `قرّب ${math(number.text)} ${PLACES[places].ar}.`), choices, answer, same(`${number.text}\\approx ${written(answer)}`), { places, value: Math.round(number.value * 10000) })
}

function truncateQuestion(random: Random, tier: Tier): PowersRaceQuestion | null {
    const places = pick(random, tier === 0 ? [1, 2] : [1, 2, 3])
    const number = awkwardNumber(random, places)
    if (!number) return null
    const factor = 10 ** places
    const rounded = Math.round(number.value * factor + 1e-9) / factor
    const truncated = Math.floor(number.value * factor + 1e-9) / factor
    const answer = fraction(Math.round(truncated * factor), factor)
    const choices = options(random, answer, [decimalOf(rounded, places, 'round-trunc'), decimalOf(truncated - 1 / factor, places, 'calculation'), decimalOf(Math.floor(number.value * factor * 10 + 1e-9) / (factor * 10), places + 1, 'calculation')])
    return choices && build(4, 'truncate', say(`Trunkatu ${math(number.text)} ${PLACES[places].eu}.`, `Trunca ${math(number.text)} ${PLACES[places].es}.`, `ابتر ${math(number.text)} ${PLACES[places].ar}.`), choices, answer, same(`${number.text}\\to ${written(answer)}`), { places, value: Math.round(number.value * 10000) })
}

function absoluteErrorQuestion(random: Random): PowersRaceQuestion | null {
    const tenths = randomInt(random, 11, 89)
    const hundredths = randomInt(random, 1, 9)
    // The exact value has two decimals and its second decimal is not 0: x = tenths/10 + hundredths/100
    const exactCents = tenths * 10 + hundredths
    const approxTenths = Math.round(exactCents / 10)
    const errorCents = Math.abs(exactCents - approxTenths * 10)
    if (errorCents === 0) return null
    const answer = fraction(errorCents, 100)
    const exact = written(fraction(exactCents, 100))!
    const approx = written(fraction(approxTenths, 10))!
    const choices = options(random, answer, [{ value: fraction(approxTenths, 10), error: 'abs-rel' }, { value: fraction(errorCents, 10), error: 'calculation' }, { value: fraction(exactCents - approxTenths * 10, 100), error: 'sign' }, { value: fraction(errorCents, 1000), error: 'calculation' }])
    return choices && build(4, 'absolute-error', say(`${math(exact)} hamarrenetara biribiltzen da: ${math(approx)}. Zenbat da errore absolutua?`, `Se redondea ${math(exact)} a las décimas: ${math(approx)}. ¿Cuánto es el error absoluto?`, `قُرّب ${math(exact)} إلى الأعشار فصار ${math(approx)}. كم الخطأ المطلق؟`), choices, answer, same(`|${exact}-${approx}|=${written(answer)}`), { exactCents, approxTenths })
}

function relativeErrorQuestion(random: Random): PowersRaceQuestion | null {
    const exact = pick(random, [20, 25, 40, 50, 80, 100, 200])
    const error = randomInt(random, 1, Math.min(4, exact / 10))
    const answer = frac(error, exact)
    const choices = options(random, answer, [whole(error, 'abs-rel'), { value: frac(exact, error), error: 'abs-rel' }, { value: frac(error, exact - error), error: 'calculation' }, { value: frac(error, exact * 10), error: 'calculation' }])
    return choices && build(4, 'relative-error', say(`Zenbaki zehatza ${math(String(exact))} da eta neurtutakoa ${math(String(exact - error))}. Zenbat da errore erlatiboa?`, `El valor exacto es ${math(String(exact))} y se midió ${math(String(exact - error))}. ¿Cuánto es el error relativo?`, `القيمة الصحيحة ${math(String(exact))} والمقيسة ${math(String(exact - error))}. كم الخطأ النسبي؟`), choices, answer, same(`\\frac{|${exact}-${exact - error}|}{${exact}}=\\frac{${error}}{${exact}}=${written(answer)}`), { exact, error })
}

type Generator = (random: Random, tier: Tier) => PowersRaceQuestion | null

const circuitGenerators: Generator[][] = [
    [signPowerQuestion, negativePowerQuestion, fractionPowerQuestion, rulesQuestion],
    [sciExponentQuestion, sciProductQuestion, sciQuotientQuestion, ratioQuestion],
    [exactRootQuestion, outsideQuestion, insideQuestion, likeQuestion, productRootsQuestion],
    [irrationalCountQuestion, betweenQuestion, intervalCountQuestion, intervalLengthQuestion],
    [roundQuestion, truncateQuestion, absoluteErrorQuestion, relativeErrorQuestion]
]

export function generatePowersRaceQuestion(random: Random, circuit: number, tier: Tier): PowersRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkPowersPitAnswer(question: RaceQuestion<PowersRaceError>, input: string): AnswerCheck {
    return checkAnswer(input, question.answer, question.answerForm)
}

export function powersParTime(circuit: number): number {
    return parTimeFor([12, 13, 12, 14, 13][circuit] ?? 12)
}

export const powersRaceErrorTips: Record<PowersRaceError, LocalizedText> = {
    'sign-base': say('Berretzaileak oinarriari bakarrik eragiten dio: −5² = −25, baina (−5)² = 25.', 'El exponente solo afecta a la base: −5² = −25, pero (−5)² = 25.', 'الأس يؤثر في الأساس فقط: −5² = −25 لكن (−5)² = 25.'),
    'no-inverse': say('Berretzaile negatiboa: alderantzizkoa, a⁻ⁿ = 1/aⁿ. Zatikietan, buelta eman.', 'Exponente negativo: el inverso, a⁻ⁿ = 1/aⁿ. En las fracciones, se da la vuelta.', 'الأس السالب: المقلوب، a⁻ⁿ = 1/aⁿ. وفي الكسور نقلب الكسر.'),
    'negative-result': say('Berretzaile negatiboak ez du emaitza negatiboa ematen: alderantzizkoa ematen du.', 'Un exponente negativo no da un resultado negativo: da el inverso.', 'الأس السالب لا يعطي نتيجة سالبة: يعطي المقلوب.'),
    'multiply-exponents': say('Oinarri bera biderkatzean berretzaileak batu, ez biderkatu; berreturaren berreturan bakarrik biderkatzen dira.', 'Al multiplicar la misma base se suman los exponentes; solo se multiplican en la potencia de una potencia.', 'عند ضرب الأساس نفسه تُجمع الأسس لا تُضرب؛ وتُضرب في قوة القوة فقط.'),
    'exponent-sign': say('Zenbaki handiak: berretzaile positiboa; 1 baino txikiagoak: negatiboa.', 'Números grandes: exponente positivo; menores que 1: negativo.', 'الأعداد الكبيرة: أس موجب؛ والأصغر من 1: سالب.'),
    'no-adjust': say('Zenbatu jauziak ondo: komaren aurretik zifra bakarra geratu behar da, 0 ez dena. Emaitzak 10 edo gehiago ateratzen badu, egokitu.', 'Cuenta bien los saltos: delante de la coma una sola cifra distinta de 0. Si el resultado sale 10 o más, ajusta.', 'عُدّ القفزات جيدًا: رقم واحد غير صفر قبل الفاصلة. وإذا خرج 10 أو أكثر فاضبطه.'),
    sign: say('Kontuz zeinuarekin: berretzaileak kentzean edo zatitzean, kendu berretzaileak.', 'Cuidado con el signo: al dividir, los exponentes se restan.', 'انتبه للإشارة: عند القسمة تُطرح الأسس.'),
    'no-root': say('Erroa atera behar da, ez erdira zatitu.', 'Hay que sacar la raíz, no dividir entre la mitad.', 'يجب أخذ الجذر لا القسمة على النصف.'),
    outside: say('Ateratzen dena karratu perfektuaren erroa da, ez gainerako faktorea.', 'Lo que sale es la raíz del cuadrado perfecto, no el otro factor.', 'ما يخرج هو جذر المربع الكامل لا العامل الآخر.'),
    'no-square': say('Sartzean, aurreko faktorea karratura jaso behar da: a√b = √(a² · b).', 'Al meter, el factor de delante se eleva al cuadrado: a√b = √(a² · b).', 'عند الإدخال يُرفع العامل الأمامي إلى التربيع: a√b = √(a² · b).'),
    'add-radicands': say('Erroak ez dira errokizunak batuz batzen; biderkatzean errokizunak biderkatzen dira.', 'Las raíces no se suman sumando los radicandos; al multiplicar se multiplican los radicandos.', 'لا تُجمع الجذور بجمع ما تحتها؛ وعند الضرب يُضرب ما تحتها.'),
    irrational: say('Irrazionala: zifra hamartar infinituak periodorik gabe. Karratu perfektuen erroak eta hamartar periodikoak arrazionalak dira.', 'Irracional: infinitas cifras sin periodo. Las raíces de cuadrados perfectos y los decimales periódicos son racionales.', 'غير النسبي: أرقام لا نهائية بلا دور. جذور المربعات الكاملة والعشريات الدورية نسبية.'),
    interval: say('Kortxeteko muturra sartzen da, parentesikoa ez. Luzera: b − a.', 'El extremo con corchete entra, el de paréntesis no. Longitud: b − a.', 'الطرف بقوس مربع داخل والآخر لا. الطول: b − a.'),
    'round-trunc': say('Trunkatzea mozteko da; biribiltzean, kendutako lehen zifra 5 edo handiagoa bada, 1 gehitzen da.', 'Truncar es cortar; al redondear, si la primera cifra suprimida es 5 o más, se suma 1.', 'البتر قطع؛ وعند التقريب إذا كان أول رقم محذوف 5 أو أكثر نضيف 1.'),
    'abs-rel': say('Errore absolutua distantzia da; erlatiboa, absolutua zenbaki zehatzaz zatitzea.', 'El error absoluto es la distancia; el relativo, el absoluto entre el valor exacto.', 'الخطأ المطلق هو المسافة؛ والنسبي هو المطلق مقسومًا على القيمة الصحيحة.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.')
}
