import { checkAnswer, fraction, toExactDecimal, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { gcd, rationalPower } from '../radicals.ts'

/* ==========================================================================
   Berreturen lasterketa (4. DBH akademikoak): five circuits, one per
   stage — powers (a negative exponent, 12ᵐ : 6ⁿ, the exponent of a number
   in scientific notation, a product in scientific notation), radicals (a
   root of any index, a fractional exponent, a common index, a simplified
   index), operations (factors out, like radicals, a product, a factor
   in), rationalizing (√b, ⁿ√bᵐ, the conjugate) and logarithms (from the
   definition, the base, a sum of logarithms, between which whole
   numbers). Wrong options are typical mistakes: the exponent with its
   sign, p and q swapped, the radicands added, the conjugate with the wrong
   sign, the power instead of the logarithm… Every question carries
   `meta`, the numbers the tests check it against.
   ========================================================================== */

export const POWERS_RACE_CIRCUITS = 5

export type PowersRaceError =
    | 'no-inverse'
    | 'sign'
    | 'multiply-exponents'
    | 'exponent-sign'
    | 'no-adjust'
    | 'swap'
    | 'no-root'
    | 'index'
    | 'radicand'
    | 'outside'
    | 'add-radicands'
    | 'no-square'
    | 'wrong-factor'
    | 'denominator'
    | 'log-value'
    | 'log-base'
    | 'log-product'
    | 'calculation'

export type PowersRaceQuestion = RaceQuestion<PowersRaceError> & { meta: Record<string, number> }

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
const same = (latex: string): LocalizedText => ({ eu: `$${latex}$`, es: `$${latex}$`, ar: `$${latex.replace(/\{,\}/g, '.')}$` })
const math = (latex: string) => `$${latex}$`
const root = (index: number, radicand: number | string) => (index === 2 ? `\\sqrt{${radicand}}` : `\\sqrt[${index}]{${radicand}}`)

/** A value in LaTeX: a whole number, a short decimal, or a fraction */
export function written(value: FractionValue): string | null {
    if (value.denominator === 1) return String(value.numerator)
    if (Math.abs(value.numerator) > 99999 || value.denominator > 99999) return null
    return `${value.numerator < 0 ? '-' : ''}\\frac{${Math.abs(value.numerator)}}{${value.denominator}}`
}
const decimalLatex = (value: number) => (toExactDecimal(fraction(Math.round(value * 10000), 10000), ',') ?? String(value)).replace(',', '{,}')

interface Candidate {
    value: FractionValue
    error: PowersRaceError
}
const whole = (value: number, error: PowersRaceError): Candidate => ({ value: fraction(Math.round(value) + 0), error })
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

/* ---------- Circuit 0: powers ---------- */

function negativePowerQuestion(random: Random, tier: Tier): PowersRaceQuestion | null {
    const base = pick(random, tier === 0 ? [2, 3, 5, 10] : [-2, -3, 2, 3, 4, 5])
    const k = randomInt(random, 1, tier === 0 ? 3 : 4)
    const power = base ** k
    if (Math.abs(power) > 1000) return null
    const answer = fraction(1, power)
    const choices = options(random, answer, [whole(power, 'no-inverse'), whole(-power, 'no-inverse'), { value: fraction(-1, power), error: 'sign' }, whole(base * -k, 'multiply-exponents'), { value: fraction(1, base * k), error: 'multiply-exponents' }])
    const b = base < 0 ? `(${base})` : String(base)
    return choices && build(0, 'negative-power', calc(`${b}^{-${k}}`), choices, answer, same(`\\frac{1}{${b}^{${k}}}=${written(answer)}`), { base, k })
}

function factorPowerQuestion(random: Random, tier: Tier): PowersRaceQuestion | null {
    const m = randomInt(random, tier === 0 ? 1 : -2, 3)
    const n = randomInt(random, tier === 0 ? 0 : -2, 3)
    const two = 2 * m - n
    const three = m - n
    const value = (a: number, b: number) => fraction(2 ** Math.max(a, 0) * 3 ** Math.max(b, 0), 2 ** Math.max(-a, 0) * 3 ** Math.max(-b, 0))
    const answer = value(two, three)
    if (Math.abs(answer.numerator) > 2000 || answer.denominator > 2000) return null
    const choices = options(random, answer, [{ value: value(m - n, m - n), error: 'multiply-exponents' }, { value: value(2 * m + n, m + n), error: 'sign' }, { value: value(two, -three), error: 'sign' }, { value: value(-two, -three), error: 'no-inverse' }])
    return choices && build(0, 'factor-power', calc(`12^{${m}}:6^{${n}}`), choices, answer, same(`2^{${2 * m}}\\cdot 3^{${m}}:\\left(2^{${n}}\\cdot 3^{${n}}\\right)=2^{${two}}\\cdot 3^{${three}}=${written(answer)}`), { m, n })
}

function scientificExponentQuestion(random: Random, tier: Tier): PowersRaceQuestion | null {
    const digits = pick(random, ['34', '52', '319', '8', '71', '608'])
    const exponent = tier === 0 ? pick(random, [-4, -3, 3, 5, 6]) : randomInt(random, -9, 9)
    if (exponent === 0) return null
    const mantissa = `${digits[0]}${digits.length > 1 ? `{,}${digits.slice(1)}` : ''}`
    // The number written out: digits followed or preceded by zeros
    const shown = exponent > 0 ? `${digits.padEnd(exponent + 1, '0')}` : `0{,}${'0'.repeat(-exponent - 1)}${digits}`
    if (shown.replace(/\D/g, '').length > 12) return null
    const grouped = exponent > 0 ? shown.replace(/\B(?=(\d{3})+$)/g, '\\,') : shown
    const choices = options(random, fraction(exponent), [whole(-exponent, 'exponent-sign'), whole(exponent + (exponent > 0 ? 1 : -1), 'no-adjust'), whole(exponent - (exponent > 0 ? 1 : -1), 'no-adjust'), ...near(fraction(exponent))])
    return choices && build(0, 'scientific', howMuch(`${grouped}=${mantissa}\\cdot 10^{n}`, 'n'), choices, fraction(exponent), same(`${grouped}=${mantissa}\\cdot 10^{${exponent}}`), { exponent, length: digits.length })
}

function scientificProductQuestion(random: Random): PowersRaceQuestion | null {
    const a = pick(random, [2, 3, 4, 5, 6, 8])
    const b = pick(random, [2, 3, 4, 5, 7, 9])
    const p = randomInt(random, -6, 8)
    const q = randomInt(random, -6, 8)
    const product = a * b
    const exponent = p + q + (product >= 10 ? 1 : 0)
    const mantissa = product >= 10 ? decimalLatex(product / 10) : String(product)
    const choices = options(random, fraction(exponent), [whole(p + q, 'no-adjust'), whole(p * q, 'multiply-exponents'), whole(p - q, 'sign'), ...near(fraction(exponent))])
    return choices && build(0, 'scientific-product', howMuch(`(${a}\\cdot 10^{${p}})\\cdot(${b}\\cdot 10^{${q}})=${mantissa}\\cdot 10^{n}`, 'n'), choices, fraction(exponent), same(`${product}\\cdot 10^{${p + q}}=${mantissa}\\cdot 10^{${exponent}}`), { a, b, p, q })
}

/* ---------- Circuit 1: radicals ---------- */

function rootQuestion(random: Random, tier: Tier): PowersRaceQuestion | null {
    const index = pick(random, tier === 0 ? [3, 4] : [3, 4, 5, 6])
    const base = randomInt(random, 2, index > 4 ? 3 : 5)
    const negative = index % 2 === 1 && random() < 0.5
    const radicand = (negative ? -1 : 1) * base ** index
    const answer = negative ? -base : base
    const choices = options(random, fraction(answer), [whole(-answer, 'sign'), whole(radicand / index, 'no-root'), whole(answer * index, 'index'), ...near(fraction(answer))])
    return choices && build(1, 'root', calc(root(index, radicand)), choices, fraction(answer), same(`${answer < 0 ? `(${answer})` : answer}^{${index}}=${radicand}`), { index, radicand })
}

function fractionalQuestion(random: Random, tier: Tier): PowersRaceQuestion | null {
    const q = pick(random, [2, 3, 4])
    const r = randomInt(random, 2, q === 2 ? 9 : q === 3 ? 4 : 3)
    const base = r ** q
    const p = pick(random, tier === 0 ? [1, 2, 3] : [-2, -1, 2, 3])
    if (p === q) return null
    const answer = rationalPower(base, fraction(p, q))!
    const swapped = rationalPower(base, fraction(q, p))
    const choices = options(random, answer, [...(swapped ? [{ value: swapped, error: 'swap' as const }] : []), { value: fraction(base * p, q), error: 'no-root' }, { value: answer.numerator === 1 ? fraction(answer.denominator) : fraction(1, answer.numerator), error: 'no-inverse' }, { value: fraction(r ** (Math.abs(p) + 1)), error: 'calculation' }, ...near(answer)])
    return choices && build(1, 'fractional', calc(`${base}^{${p < 0 ? '-' : ''}\\frac{${Math.abs(p)}}{${q}}}`), choices, answer, same(`\\left(${root(q, base)}\\right)^{${p}}=${r}^{${p}}=${written(answer)}`), { base, p, q })
}

function commonIndexQuestion(random: Random): PowersRaceQuestion | null {
    const [first, second] = pick(random, [[2, 3], [3, 4], [2, 5], [4, 6], [3, 2]])
    const a = randomInt(random, 2, 5)
    const b = randomInt(random, 2, 5)
    const index = (first * second) / gcd(first, second)
    const answer = b ** (index / second)
    const choices = options(random, fraction(answer), [whole(b * (index / second), 'radicand'), whole(b ** (index / first), 'index'), whole(a ** (index / first), 'radicand'), ...near(fraction(answer))])
    return choices && build(1, 'common', howMuch(`${root(first, a)},\\ ${root(second, b)}\\ \\to\\ ${root(second, b)}=${root(index, 'n')}`, 'n'), choices, fraction(answer), same(`${root(second, b)}=${root(index, `${b}^{${index / second}}`)}=${root(index, answer)}`), { first, second, b })
}

function simplifyIndexQuestion(random: Random): PowersRaceQuestion | null {
    const small = pick(random, [2, 3, 5])
    const exponent = randomInt(random, 1, small - 1)
    const factor = pick(random, [2, 3])
    const base = pick(random, [2, 3, 5, 7])
    const index = small * factor
    const choices = options(random, fraction(small), [whole(index, 'index'), whole(exponent, 'radicand'), whole(index - factor, 'calculation'), whole(factor, 'index'), ...near(fraction(small))])
    return choices && build(1, 'simplify-index', howMuch(`${root(index, `${base}^{${exponent * factor}}`)}=\\sqrt[n]{${base}^{${exponent}}}`, 'n'), choices, fraction(small), same(`${base}^{\\frac{${exponent * factor}}{${index}}}=${base}^{\\frac{${exponent}}{${small}}}`), { index, factor })
}

/* ---------- Circuit 2: operations ---------- */

function extractQuestion(random: Random, tier: Tier): PowersRaceQuestion | null {
    const index = pick(random, tier === 0 ? [2, 3] : [2, 3, 4])
    const outside = randomInt(random, 2, index === 2 ? 9 : 4)
    const inside = pick(random, [2, 3, 5, 6, 7])
    const radicand = outside ** index * inside
    if (radicand > 2000) return null
    const choices = options(random, fraction(outside), [whole(outside ** index, 'outside'), whole(radicand / inside / 2, 'calculation'), whole(outside * index, 'index'), ...near(fraction(outside))])
    return choices && build(2, 'extract', howMuch(`${root(index, radicand)}=a${root(index, inside)}`, 'a'), choices, fraction(outside), same(`${root(index, `${outside}^{${index}}\\cdot ${inside}`)}=${outside}${root(index, inside)}`), { index, radicand, inside })
}

function likeQuestion(random: Random, tier: Tier): PowersRaceQuestion | null {
    const inside = pick(random, [2, 3, 5])
    const ks = [randomInt(random, 1, 5), randomInt(random, 1, 5), randomInt(random, 1, tier === 0 ? 3 : 5)]
    const signs = [1, random() < 0.5 ? -1 : 1, -1]
    const answer = ks.reduce((sum, k, index) => sum + signs[index] * k, 0)
    const radicands = ks.map((k) => k * k * inside)
    const terms = radicands.map((value, index) => `${index === 0 ? '' : signs[index] < 0 ? '-' : '+'}\\sqrt{${value}}`).join('')
    const added = radicands.reduce((sum, value, index) => sum + signs[index] * value, 0)
    const choices = options(random, fraction(answer), [whole(ks.reduce((sum, k) => sum + k, 0), 'sign'), whole(added / inside, 'no-square'), whole(added, 'add-radicands'), ...near(fraction(answer))])
    return choices && build(2, 'like', howMuch(`${terms}=a\\sqrt{${inside}}`, 'a'), choices, fraction(answer), same(`${ks.map((k, index) => `${index === 0 ? '' : signs[index] < 0 ? '-' : '+'}${k}\\sqrt{${inside}}`).join('')}=${answer}\\sqrt{${inside}}`), { k0: ks[0] * signs[0], k1: ks[1] * signs[1], k2: ks[2] * signs[2] })
}

function productQuestion(random: Random): PowersRaceQuestion | null {
    const inside = pick(random, [2, 3, 5, 6])
    const a = randomInt(random, 1, 4)
    const b = randomInt(random, 1, 4)
    const left = a * a * inside
    const right = b * b * inside
    if (left === right) return null
    const answer = a * b * inside
    const choices = options(random, fraction(answer), [whole(left * right, 'no-root'), whole(left + right, 'add-radicands'), whole(a * b, 'no-square'), ...near(fraction(answer))])
    return choices && build(2, 'product', calc(`\\sqrt{${left}}\\cdot\\sqrt{${right}}`), choices, fraction(answer), same(`\\sqrt{${left * right}}=${answer}`), { left, right })
}

function insideQuestion(random: Random, tier: Tier): PowersRaceQuestion | null {
    const index = pick(random, tier === 0 ? [2, 3] : [2, 3, 4])
    const outside = randomInt(random, 2, index === 2 ? 6 : 3)
    const inside = pick(random, [2, 3, 5, 7])
    const answer = outside ** index * inside
    const choices = options(random, fraction(answer), [whole(outside * inside, 'outside'), whole(outside * index * inside, 'index'), whole(outside ** index + inside, 'calculation'), ...near(fraction(answer))])
    return choices && build(2, 'inside', howMuch(`${outside}${root(index, inside)}=${root(index, 'N')}`, 'N'), choices, fraction(answer), same(`${root(index, `${outside}^{${index}}\\cdot ${inside}`)}=${root(index, answer)}`), { index, outside, inside })
}

/* ---------- Circuit 3: rationalizing ---------- */

function squareRationalizeQuestion(random: Random): PowersRaceQuestion | null {
    const b = pick(random, [2, 3, 5, 6, 7])
    const a = randomInt(random, 1, 5)
    const k = a * b
    const choices = options(random, fraction(a), [whole(k, 'denominator'), whole(k * b, 'denominator'), whole(b, 'radicand'), ...near(fraction(a))])
    return choices && build(3, 'rationalize-square', howMuch(`\\frac{${k}}{\\sqrt{${b}}}=a\\sqrt{${b}}`, 'a'), choices, fraction(a), same(`\\frac{${k}\\sqrt{${b}}}{${b}}=${a}\\sqrt{${b}}`), { k, b })
}

function indexRationalizeQuestion(random: Random, tier: Tier): PowersRaceQuestion | null {
    const index = pick(random, tier === 0 ? [3] : [3, 4, 5])
    const exponent = randomInt(random, 1, index - 1)
    const b = pick(random, [2, 3, 5])
    const answer = b ** (index - exponent)
    const choices = options(random, fraction(answer), [whole(b ** exponent, 'wrong-factor'), whole(b, 'wrong-factor'), whole(b ** index, 'calculation'), ...near(fraction(answer))])
    const denominator = exponent === 1 ? root(index, b) : root(index, `${b}^{${exponent}}`)
    return choices && build(3, 'rationalize-index', howMuch(`\\frac{1}{${denominator}}=\\frac{${root(index, 'N')}}{${b}}`, 'N'), choices, fraction(answer), same(`\\frac{${root(index, `${b}^{${index - exponent}}`)}}{${root(index, `${b}^{${index}}`)}}=\\frac{${root(index, answer)}}{${b}}`), { index, exponent, b })
}

function conjugateQuestion(random: Random, tier: Tier): PowersRaceQuestion | null {
    const a = randomInt(random, 2, 11)
    const b = randomInt(random, 1, 10)
    if (a === b || [4, 9].includes(a) || [4, 9].includes(b)) return null
    const difference = a - b
    const c = randomInt(random, 1, tier === 0 ? 2 : 4) * (random() < 0.3 && tier > 0 ? -1 : 1)
    const k = c * difference
    if (k <= 0) return null
    const r = (value: number) => (value === 1 ? '1' : `\\sqrt{${value}}`)
    const choices = options(random, fraction(c), [whole(-c, 'sign'), { value: fraction(k, a + b), error: 'sign' }, whole(k, 'denominator'), ...near(fraction(c))])
    return choices && build(3, 'conjugate', howMuch(`\\frac{${k}}{${r(a)}-${r(b)}}=c\\,(${r(a)}+${r(b)})`, 'c'), choices, fraction(c), same(`\\frac{${k}(${r(a)}+${r(b)})}{${a}-${b}}=${c}(${r(a)}+${r(b)})`), { k, a, b })
}

/* ---------- Circuit 4: logarithms ---------- */

function logQuestion(random: Random, tier: Tier): PowersRaceQuestion | null {
    const base = pick(random, tier === 0 ? [2, 3, 10] : [2, 3, 4, 5, 10])
    const x = randomInt(random, tier === 0 ? 1 : -3, base === 2 ? 7 : 4)
    const value = x >= 0 ? fraction(base ** x) : fraction(1, base ** -x)
    const valueLatex = x >= 0 ? String(base ** x) : `\\frac{1}{${base ** -x}}`
    if (base ** Math.abs(x) > 20000) return null
    const choices = options(random, fraction(x), [{ value, error: 'log-value' }, whole(-x, 'sign'), whole(x + 1, 'calculation'), whole(base * x, 'log-base'), ...near(fraction(x))])
    return choices && build(4, 'log', calc(`\\log_{${base}} ${valueLatex}`), choices, fraction(x), same(`${base}^{${x}}=${valueLatex}`), { base, x })
}

function logBaseQuestion(random: Random): PowersRaceQuestion | null {
    const base = randomInt(random, 2, 9)
    const x = pick(random, [2, 3])
    const value = base ** x
    if (value > 800) return null
    const choices = options(random, fraction(base), [whole(value / x, 'log-base'), whole(value, 'log-value'), whole(x, 'log-base'), ...near(fraction(base))])
    return choices && build(4, 'log-base', howMuch(`\\log_b ${value}=${x}`, 'b'), choices, fraction(base), same(`${base}^{${x}}=${value}`), { value, x })
}

function logSumQuestion(random: Random): PowersRaceQuestion | null {
    const base = pick(random, [2, 3, 5, 6, 10, 12])
    const total = randomInt(random, 2, base > 5 ? 2 : 4)
    const product = base ** total
    const divisors = Array.from({ length: product - 1 }, (_, index) => index + 2).filter((item) => product % item === 0 && item < product && item > 1)
    if (divisors.length === 0) return null
    const m = pick(random, divisors)
    const n = product / m
    if (m === n || n === 1) return null
    const choices = options(random, fraction(total), [whole(m + n, 'log-product'), { value: fraction(product), error: 'log-value' }, whole(total + 1, 'calculation'), whole(m * n / base, 'log-product'), ...near(fraction(total))])
    return choices && build(4, 'log-sum', calc(`\\log_{${base}} ${m}+\\log_{${base}} ${n}`), choices, fraction(total), same(`\\log_{${base}}(${m}\\cdot ${n})=\\log_{${base}} ${product}=${total}`), { base, m, n })
}

function bracketQuestion(random: Random, tier: Tier): PowersRaceQuestion | null {
    const base = pick(random, tier === 0 ? [2, 10] : [2, 3, 5])
    const low = randomInt(random, 1, base === 2 ? 6 : 3)
    const from = base ** low
    const to = base ** (low + 1)
    const value = randomInt(random, from + 1, to - 1)
    const choices = options(random, fraction(low), [whole(low + 1, 'calculation'), whole(Math.floor(value / base), 'log-value'), whole(low - 1, 'calculation'), whole(from, 'log-value')])
    return choices && build(4, 'bracket', say(
        `${math(`\\log_{${base}} ${value}`)} bi zenbaki osoren artean dago. Zein da txikiena?`,
        `${math(`\\log_{${base}} ${value}`)} está entre dos números enteros. ¿Cuál es el menor?`,
        `${math(`\\log_{${base}} ${value}`)} بين عددين صحيحين. ما الأصغر؟`
    ), choices, fraction(low), same(`${base}^{${low}}=${from}<${value}<${to}=${base}^{${low + 1}}`), { base, value })
}

type Generator = (random: Random, tier: Tier) => PowersRaceQuestion | null

const circuitGenerators: Generator[][] = [
    [negativePowerQuestion, factorPowerQuestion, scientificExponentQuestion, scientificProductQuestion],
    [rootQuestion, fractionalQuestion, commonIndexQuestion, simplifyIndexQuestion],
    [extractQuestion, likeQuestion, productQuestion, insideQuestion],
    [squareRationalizeQuestion, indexRationalizeQuestion, conjugateQuestion, conjugateQuestion],
    [logQuestion, logBaseQuestion, logSumQuestion, bracketQuestion]
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
    return parTimeFor([12, 12, 12, 13, 12][circuit] ?? 12)
}

export const powersRaceErrorTips: Record<PowersRaceError, LocalizedText> = {
    'no-inverse': say('Berretzaile negatiboa: alderantzizkoa, a⁻ⁿ = 1/aⁿ.', 'Exponente negativo: el inverso, a⁻ⁿ = 1/aⁿ.', 'الأس السالب: المقلوب، a⁻ⁿ = 1/aⁿ.'),
    sign: say('Kontuz zeinuarekin: berretzaileak kentzean, edo oinarri negatiboarekin.', 'Cuidado con el signo: al restar exponentes o con la base negativa.', 'انتبه للإشارة: عند طرح الأسس أو مع الأساس السالب.'),
    'multiply-exponents': say('Oinarri bera biderkatzean berretzaileak batu, ez biderkatu; berretura baten berreturan bakarrik biderkatzen dira.', 'Al multiplicar la misma base se suman los exponentes; solo se multiplican en la potencia de una potencia.', 'عند ضرب الأساس نفسه نجمع الأسس؛ ولا نضربها إلا في قوة القوة.'),
    'exponent-sign': say('Zenbaki handiak: berretzaile positiboa; zenbaki txikiak (1 baino txikiagoak): negatiboa.', 'Números grandes: exponente positivo; números pequeños (menores que 1): negativo.', 'الأعداد الكبيرة: أس موجب؛ والصغيرة (أصغر من 1): سالب.'),
    'no-adjust': say('Zenbatu jauziak ondo: komaren aurretik zero ez den zifra bakarra geratu behar da.', 'Cuenta bien los saltos: delante de la coma tiene que quedar una sola cifra distinta de cero.', 'عُدّ القفزات جيدًا: يجب أن يبقى قبل الفاصلة رقم واحد غير الصفر.'),
    swap: say('Izendatzailea indizea da eta zenbakitzailea berretura: a^(p/q) = (ᵠ√a)ᵖ.', 'El denominador es el índice y el numerador la potencia: a^(p/q) = (ᵠ√a)ᵖ.', 'المقام هو الدليل والبسط هو القوة: a^(p/q) = (ᵠ√a)ᵖ.'),
    'no-root': say('Erroa atera behar da, ez zatitu indizeaz.', 'Hay que sacar la raíz, no dividir entre el índice.', 'يجب أخذ الجذر لا القسمة على الدليل.'),
    index: say('Indizeak ez du emaitza biderkatzen: erroa da.', 'El índice no multiplica el resultado: es una raíz.', 'الدليل لا يضرب النتيجة: إنه جذر.'),
    radicand: say('Indize komunera eramatean, errokizuna berretu behar da, ez biderkatu.', 'Al pasar a índice común, el radicando se eleva, no se multiplica.', 'عند الرد إلى دليل مشترك يُرفع ما تحت الجذر إلى قوة لا يُضرب.'),
    outside: say('Ateratzen dena erroa da (a), ez berretura (aⁿ).', 'Lo que sale es la raíz (a), no la potencia (aⁿ).', 'ما يخرج هو الجذر (a) لا القوة (aⁿ).'),
    'add-radicands': say('Erroak ez dira batzen errokizunak batuz: atera faktoreak eta batu koefizienteak.', 'Las raíces no se suman sumando los radicandos: saca factores y suma los coeficientes.', 'لا تُجمع الجذور بجمع ما تحتها: أخرج العوامل واجمع المعاملات.'),
    'no-square': say('√(k² · a) = k√a: ateratzean, k karratuaren erroa da.', '√(k² · a) = k√a: al sacar, sale la raíz de k².', '√(k² · a) = k√a: عند الإخراج يخرج جذر k².'),
    'wrong-factor': say('Osatu berretzailea indizeraino: ⁿ√bᵐ bider ⁿ√bⁿ⁻ᵐ.', 'Completa el exponente hasta el índice: ⁿ√bᵐ por ⁿ√bⁿ⁻ᵐ.', 'أكمل الأس حتى الدليل: ⁿ√bᵐ في ⁿ√bⁿ⁻ᵐ.'),
    denominator: say('Ez ahaztu izendatzaileaz zatitzea: √b · √b = b.', 'No olvides dividir entre el denominador: √b · √b = b.', 'لا تنسَ القسمة على المقام: √b · √b = b.'),
    'log-value': say('Logaritmoa berretzailea da, ez balioa: logₐ aˣ = x.', 'El logaritmo es el exponente, no el valor: logₐ aˣ = x.', 'اللوغاريتم هو الأس لا القيمة: logₐ aˣ = x.'),
    'log-base': say('logₐ b = x esan nahi du aˣ = b: ez biderkatu oinarria.', 'logₐ b = x significa aˣ = b: no multipliques la base.', 'logₐ b = x تعني aˣ = b: لا تضرب الأساس.'),
    'log-product': say('Logaritmoen batura biderkaduraren logaritmoa da: log m + log n = log (m · n).', 'La suma de logaritmos es el logaritmo del producto: log m + log n = log (m · n).', 'مجموع اللوغاريتمين لوغاريتم الضرب: log m + log n = log (m · n).'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.')
}
