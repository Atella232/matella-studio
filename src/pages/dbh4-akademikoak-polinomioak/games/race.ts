import { checkAnswer, fraction, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { binomialLatex, deflate, evaluate, fromRoots, polyLatex, tartaglia } from '../polynomials.ts'

/* ==========================================================================
   Polinomioen lasterketa (4. DBH akademikoak): five circuits, one per
   stage — operations (a coefficient of a product, of a square, of
   (x + b)ⁿ, a value P(a)), division (a remainder, the constant term of a
   Ruffini quotient, a parameter for an exact division, the degree of a
   quotient), roots and factorisation (the greatest root, the missing
   factor, a factor with a leading coefficient, the degree of an m.c.m.),
   algebraic fractions (a value, where it does not exist, simplify and
   evaluate, an equivalent numerator) and operations with fractions (the
   numerator of a sum, a difference, a product, two taps). Wrong options are
   typical mistakes: the cross terms forgotten, 2ab missing, the sign of
   x + a, the remainder instead of the quotient, the degrees added for the
   m.c.m., the fraction upside down, the bracket forgotten when
   subtracting… Every question carries `meta`, the numbers the tests check
   it against.
   ========================================================================== */

export const POLYNOMIALS_RACE_CIRCUITS = 5

export type PolynomialsRaceError =
    | 'cross'
    | 'no-double'
    | 'no-power'
    | 'row'
    | 'sign'
    | 'binomial-sign'
    | 'remainder'
    | 'degree'
    | 'constant'
    | 'product'
    | 'upside-down'
    | 'numerator'
    | 'wrong-factor'
    | 'no-bracket'
    | 'add-across'
    | 'average'
    | 'calculation'

export type PolynomialsRaceQuestion = RaceQuestion<PolynomialsRaceError> & { meta: Record<string, number> }

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (latex: string): LocalizedText => ({ eu: `$${latex}$`, es: `$${latex}$`, en: `$${latex}$`, ar: `$${latex}$` })
const math = (latex: string) => `$${latex}$`
/** A number inside a sum: +3, −3 */
const plus = (value: number) => (value < 0 ? `-${-value}` : `+${value}`)
/** A value in brackets when negative */
const bracket = (value: number) => (value < 0 ? `(${value})` : String(value))
/** k·x with the 1 left out: x, −x, 3x */
const times = (value: number, letter = 'x') => (value === 0 ? '0' : value === 1 ? letter : value === -1 ? `-${letter}` : `${value}${letter}`)
const nonZero = (random: Random, min: number, max: number) => {
    const value = randomInt(random, min, max - 1)
    return value >= 0 ? value + 1 : value
}

/** A value in LaTeX: a whole number or a fraction */
export function written(value: FractionValue): string {
    if (value.denominator === 1) return String(value.numerator)
    return `${value.numerator < 0 ? '-' : ''}\\frac{${Math.abs(value.numerator)}}{${value.denominator}}`
}

interface Candidate {
    value: FractionValue
    error: PolynomialsRaceError
}
const whole = (value: number, error: PolynomialsRaceError): Candidate => ({ value: fraction(Math.round(value) + 0), error })
const near = (value: number): Candidate[] => [value + 1, value - 1, value + 2, -value, value - 2].map((item) => whole(item, 'calculation'))

/** The right option and three different mistakes */
function options(random: Random, right: FractionValue, candidates: Candidate[]): RaceOption<PolynomialsRaceError>[] | null {
    const rightLatex = written(right)
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: PolynomialsRaceError }> = []
    for (const candidate of candidates) {
        if (wrong.length === 3) break
        if (!Number.isFinite(candidate.value.numerator / candidate.value.denominator)) continue
        const latex = written(candidate.value)
        if (latex === '-0' || used.has(latex)) continue
        used.add(latex)
        wrong.push({ latex, error: candidate.error })
    }
    if (wrong.length < 3) return null
    return shuffle(random, [{ latex: rightLatex, correct: true, error: null }, ...wrong.map((item) => ({ latex: item.latex, correct: false, error: item.error }))])
}

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<PolynomialsRaceError>[], answer: FractionValue, solution: LocalizedText, meta: Record<string, number>): PolynomialsRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution, meta }
}

const coefficientOf = (formula: string, term: string) => say(
    `${math(formula)} garatzean, zein da ${math(term)} gaiaren koefizientea?`,
    `Al desarrollar ${math(formula)}, ¿cuál es el coeficiente de ${math(term)}?`,
    `عند نشر ${math(formula)} ما معامل ${math(term)}؟`, `When you expand ${math(formula)}, what is the coefficient of ${math(term)}?`
)
const howMuch = (formula: string, letter: string) => say(`${math(formula)}. Zenbat da ${math(letter)}?`, `${math(formula)}. ¿Cuánto vale ${math(letter)}?`, `${math(formula)}. كم تساوي ${math(letter)}؟`, `${math(formula)}. What is the value of ${math(letter)}?`)
const remainderPrompt = (division: string) => say(`Zein da ${math(division)} zatiketaren hondarra?`, `¿Cuál es el resto de ${math(division)}?`, `ما باقي ${math(division)}؟`, `What is the remainder of ${math(division)}?`)
const division = (p: number[], a: number) => `(${polyLatex(p)})\\mathbin{:}(${binomialLatex(a)})`

/* ---------- Circuit 0: operations ---------- */

function productQuestion(random: Random, tier: Tier): PolynomialsRaceQuestion | null {
    const p = tier === 0 ? 1 : randomInt(random, 1, 4)
    const q = tier === 2 ? randomInt(random, 2, 5) : randomInt(random, 1, 3)
    const a = nonZero(random, -6, 6)
    const b = nonZero(random, -6, 6)
    const value = p * b + q * a
    const choices = options(random, fraction(value), [whole(a * b, 'cross'), whole(p * b, 'cross'), whole(q * a, 'cross'), whole(p * q, 'cross'), ...near(value)])
    const factor = (k: number, c: number) => `${k === 1 ? '' : k}x${plus(c)}`
    return choices && build(0, 'product', coefficientOf(`(${factor(p, a)})(${factor(q, b)})`, 'x'), choices, fraction(value), same(`${p === 1 ? '' : `${p}`}x\\cdot ${bracket(b)}+${bracket(a)}\\cdot ${q === 1 ? '' : `${q}`}x=${times(value)}`), { p, a, q, b })
}

function squareQuestion(random: Random, tier: Tier): PolynomialsRaceQuestion | null {
    const p = tier === 0 ? 1 : randomInt(random, 2, 5)
    const a = nonZero(random, -7, 7)
    const value = 2 * p * a
    const choices = options(random, fraction(value), [whole(p * a, 'no-double'), whole(a * a, 'no-double'), whole(-value, 'sign'), whole(0, 'no-double'), ...near(value)])
    return choices && build(0, 'square', coefficientOf(`(${p === 1 ? '' : p}x${plus(a)})^{2}`, 'x'), choices, fraction(value), same(`2\\cdot ${p === 1 ? '' : p}x\\cdot ${bracket(a)}=${times(value)}`), { p, a })
}

function binomialQuestion(random: Random, tier: Tier): PolynomialsRaceQuestion | null {
    const n = randomInt(random, tier === 0 ? 3 : 4, tier === 2 ? 6 : 5)
    const b = nonZero(random, tier === 0 ? -2 : -3, tier === 0 ? 2 : 3)
    const k = randomInt(random, 1, n - 1)
    const row = tartaglia(n)[n - k]
    const value = row * b ** (n - k)
    if (Math.abs(value) > 999) return null
    const choices = options(random, fraction(value), [whole(row * b, 'no-power'), whole(row, 'row'), whole(-value, 'sign'), whole(tartaglia(n)[n - k + 1] * b ** (n - k), 'row'), ...near(value)])
    return choices && build(0, 'binomial', coefficientOf(`(x${plus(b)})^{${n}}`, `x^{${k}}`), choices, fraction(value), same(`${row}\\cdot ${bracket(b)}^{${n - k}}=${value}`), { n, b, k })
}

function valueQuestion(random: Random, tier: Tier): PolynomialsRaceQuestion | null {
    const p = [1, randomInt(random, -4, 4), randomInt(random, -6, 6), randomInt(random, -9, 9)]
    if (tier > 0) p[0] = pick(random, [1, 2, -1, 3])
    const a = nonZero(random, tier === 0 ? -2 : -3, tier === 0 ? 2 : 3)
    const value = evaluate(p, a)
    const choices = options(random, fraction(value), [whole(evaluate(p, -a), 'sign'), whole(evaluate(p.map((c) => Math.abs(c)), Math.abs(a)), 'sign'), ...near(value)])
    return choices && build(0, 'value', say(`$P(x)=${polyLatex(p)}$. Kalkulatu $P(${a})$.`, `$P(x)=${polyLatex(p)}$. Calcula $P(${a})$.`, `$P(x)=${polyLatex(p)}$. احسب $P(${a})$.`, `$P(x)=${polyLatex(p)}$. Work out $P(${a})$.`), choices, fraction(value), same(`P(${a})=${value}`), { p0: p[0], p1: p[1], p2: p[2], p3: p[3], a })
}

/* ---------- Circuit 1: division ---------- */

function remainderQuestion(random: Random, tier: Tier): PolynomialsRaceQuestion | null {
    // Tier 2 divides a polynomial of degree 4
    const p = tier === 2
        ? [pick(random, [1, 2]), randomInt(random, -4, 4), randomInt(random, -5, 5), randomInt(random, -6, 6), randomInt(random, -9, 9)]
        : [1, randomInt(random, -5, 5), randomInt(random, -6, 6), randomInt(random, -9, 9)]
    const a = nonZero(random, -3, 3)
    const value = evaluate(p, a)
    const choices = options(random, fraction(value), [whole(evaluate(p, -a), 'binomial-sign'), whole(p[p.length - 1], 'constant'), ...near(value)])
    return choices && build(1, 'remainder', remainderPrompt(division(p, a)), choices, fraction(value), same(`R=P(${a})=${value}`), { ...Object.fromEntries(p.map((c, i) => [`p${i}`, c])), n: p.length, a })
}

function quotientQuestion(random: Random, tier: Tier): PolynomialsRaceQuestion | null {
    const p = [tier === 0 ? 1 : pick(random, [1, 2, 3]), randomInt(random, -5, 5), randomInt(random, -6, 6), randomInt(random, -9, 9)]
    const a = nonZero(random, -3, 3)
    const quotient = deflate(p, a)
    const value = quotient[quotient.length - 1]
    const choices = options(random, fraction(value), [whole(evaluate(p, a), 'remainder'), whole(deflate(p, -a).at(-1)!, 'binomial-sign'), whole(p[2], 'calculation'), ...near(value)])
    return choices && build(1, 'quotient', say(
        `Ruffiniz, ${math(division(p, a))}. Zein da zatiduraren gai askea?`,
        `Con Ruffini, ${math(division(p, a))}. ¿Cuál es el término independiente del cociente?`,
        `بروفيني، ${math(division(p, a))}. ما الحد الثابت لخارج القسمة؟`, `Using Ruffini, ${math(division(p, a))}. What is the constant term of the quotient?`
    ), choices, fraction(value), same(`C(x)=${polyLatex(quotient)}`), { p0: p[0], p1: p[1], p2: p[2], p3: p[3], a })
}

function parameterQuestion(random: Random, tier: Tier): PolynomialsRaceQuestion | null {
    const a = nonZero(random, -3, 3)
    const b = randomInt(random, -4, 4)
    const m = nonZero(random, tier === 0 ? -5 : -9, tier === 0 ? 5 : 9)
    // x³ + bx² + mx + d with P(a) = 0
    const d = -(a ** 3 + b * a * a + m * a)
    if (Math.abs(d) > 40) return null
    const wrongSign = (a ** 3 * -1 + b * a * a + d) / a
    const choices = options(random, fraction(m), [whole(-m, 'sign'), ...(Number.isInteger(wrongSign) ? [whole(wrongSign, 'binomial-sign')] : []), whole(d, 'constant'), ...near(m)])
    const p = `x^{3}${b === 0 ? '' : `${b < 0 ? '-' : '+'}${Math.abs(b) === 1 ? '' : Math.abs(b)}x^{2}`}+mx${plus(d)}`
    return choices && build(1, 'parameter', say(
        `${math(p)} zatigarria da ${math(binomialLatex(a))} binomioaz. Zenbat da ${math('m')}?`,
        `${math(p)} es divisible entre ${math(binomialLatex(a))}. ¿Cuánto vale ${math('m')}?`,
        `${math(p)} تقبل القسمة على ${math(binomialLatex(a))}. كم تساوي ${math('m')}؟`, `${math(p)} is divisible by ${math(binomialLatex(a))}. What is ${math('m')}?`
    ), choices, fraction(m), same(`P(${a})=0\\ \\to\\ m=${m}`), { a, b, d })
}

function degreeQuestion(random: Random): PolynomialsRaceQuestion | null {
    const n = randomInt(random, 3, 7)
    const k = randomInt(random, 1, n - 1)
    const dividend = `${pick(random, [2, 3, 5])}x^{${n}}+${times(randomInt(random, 1, 9))}`
    const divisor = k === 1 ? `x${plus(nonZero(random, -5, 5))}` : `x^{${k}}${plus(nonZero(random, -5, 5))}`
    const value = n - k
    const choices = options(random, fraction(value), [whole(n + k, 'degree'), whole(n, 'degree'), whole(k - 1, 'degree'), whole(n * k, 'degree'), ...near(value)])
    return choices && build(1, 'degree', say(
        `Zein da ${math(`(${dividend})\\mathbin{:}(${divisor})`)} zatiketaren zatiduraren maila?`,
        `¿Cuál es el grado del cociente de ${math(`(${dividend})\\mathbin{:}(${divisor})`)}?`,
        `ما درجة خارج قسمة ${math(`(${dividend})\\mathbin{:}(${divisor})`)}؟`, `What is the degree of the quotient of ${math(`(${dividend})\\mathbin{:}(${divisor})`)}?`
    ), choices, fraction(value), same(`${n}-${k}=${value}`), { n, k })
}

/* ---------- Circuit 2: roots and factorisation ---------- */

function greatestRootQuestion(random: Random, tier: Tier): PolynomialsRaceQuestion | null {
    const count = tier === 0 ? 2 : 3
    const roots = Array.from({ length: count }, () => randomInt(random, -5, 5))
    if (new Set(roots).size < count) return null
    const p = fromRoots(roots)
    if (p.some((c) => Math.abs(c) > 60)) return null
    const top = Math.max(...roots)
    const choices = options(random, fraction(top), [whole(-top, 'binomial-sign'), whole(p[p.length - 1], 'constant'), whole(Math.min(...roots), 'calculation'), ...near(top)])
    return choices && build(2, 'greatest-root', say(
        `${math(polyLatex(p))} polinomioaren erro guztiak osoak dira. Zein da handiena?`,
        `Todas las raíces de ${math(polyLatex(p))} son enteras. ¿Cuál es la mayor?`,
        `كل جذور ${math(polyLatex(p))} صحيحة. ما أكبرها؟`, `All the roots of ${math(polyLatex(p))} are integers. What is the largest one?`
    ), choices, fraction(top), same(roots.map((r) => `(${binomialLatex(r)})`).join('')), { r0: roots[0], r1: roots[1], r2: roots[2] ?? 99 })
}

function missingFactorQuestion(random: Random): PolynomialsRaceQuestion | null {
    const u = nonZero(random, -8, 8)
    const v = nonZero(random, -8, 8)
    if (u === v) return null
    const p = [1, u + v, u * v]
    const choices = options(random, fraction(v), [whole(-v, 'binomial-sign'), whole(u * v, 'constant'), whole(u + v, 'product'), ...near(v)])
    return choices && build(2, 'missing-factor', howMuch(`${polyLatex(p)}=(x${plus(u)})(x+a)`, 'a'), choices, fraction(v), same(`(x${plus(u)})(x${plus(v)})=${polyLatex(p)}`), { u, v })
}

function leadingFactorQuestion(random: Random): PolynomialsRaceQuestion | null {
    const p = randomInt(random, 2, 4)
    const q = randomInt(random, 1, 3)
    const u = nonZero(random, -5, 5)
    const v = nonZero(random, -5, 5)
    const poly = [p * q, p * v + q * u, u * v]
    if (poly[1] === 0) return null
    const choices = options(random, fraction(v), [whole(-v, 'sign'), whole(u * v, 'constant'), whole(poly[1], 'calculation'), ...near(v)])
    const factor = (k: number, c: number) => `${k === 1 ? '' : k}x${plus(c)}`
    return choices && build(2, 'leading-factor', howMuch(`${polyLatex(poly)}=(${factor(p, u)})(${q === 1 ? '' : q}x+a)`, 'a'), choices, fraction(v), same(`(${factor(p, u)})(${factor(q, v)})=${polyLatex(poly)}`), { p, q, u, v })
}

function lcmDegreeQuestion(random: Random): PolynomialsRaceQuestion | null {
    const a = randomInt(random, 1, 3)
    const b = randomInt(random, 1, 2)
    const c = randomInt(random, 1, 3)
    const d = randomInt(random, 1, 2)
    const r = nonZero(random, -4, 4)
    const s = nonZero(random, -4, 4)
    if (r === s) return null
    const power = (base: string, n: number) => (n === 1 ? base : `${base}^{${n}}`)
    const P = `${power('x', a)}${power(`(${binomialLatex(r)})`, b)}`
    const Q = `${power('x', c)}${power(`(${binomialLatex(s)})`, d)}`
    const value = Math.max(a, c) + b + d
    const choices = options(random, fraction(value), [whole(a + b + c + d, 'product'), whole(Math.min(a, c), 'degree'), whole(Math.max(a + b, c + d), 'degree'), ...near(value)])
    return choices && build(2, 'lcm-degree', say(
        `Zein da ${math(`P=${P}`)} eta ${math(`Q=${Q}`)} polinomioen m.k.t.-aren maila?`,
        `¿Cuál es el grado del m.c.m. de ${math(`P=${P}`)} y ${math(`Q=${Q}`)}?`,
        `ما درجة المضاعف المشترك الأصغر لـ ${math(`P=${P}`)} و${math(`Q=${Q}`)}؟`, `What is the degree of the LCM of ${math(`P=${P}`)} and ${math(`Q=${Q}`)}?`
    ), choices, fraction(value), same(`${power('x', Math.max(a, c))}${power(`(${binomialLatex(r)})`, b)}${power(`(${binomialLatex(s)})`, d)}`), { a, b, c, d })
}

/* ---------- Circuit 3: algebraic fractions ---------- */

function fractionValueQuestion(random: Random, tier: Tier): PolynomialsRaceQuestion | null {
    const a = randomInt(random, -9, 9)
    const b = nonZero(random, -5, 5)
    const k = randomInt(random, tier === 0 ? 0 : -4, 4)
    if (k + b === 0 || k * k + a === 0) return null
    const answer = fraction(k * k + a, k + b)
    if (Math.abs(answer.numerator) > 99) return null
    const ratio = (top: number, bottom: number, error: PolynomialsRaceError): Candidate[] => (bottom === 0 ? [] : [{ value: fraction(top, bottom), error }])
    const choices = options(random, answer, [...ratio(k + b, k * k + a, 'upside-down'), ...ratio(-k * k + a, k + b, 'sign'), ...ratio(k * k + a, k - b, 'sign'), ...ratio(2 * k + a, k + b, 'calculation'), ...near(answer.numerator / answer.denominator)])
    return choices && build(3, 'fraction-value', say(
        `Kalkulatu ${math(`\\frac{x^{2}${a === 0 ? '' : plus(a)}}{x${plus(b)}}`)} zatikiaren balioa ${math(`x=${k}`)} denean.`,
        `Calcula el valor de ${math(`\\frac{x^{2}${a === 0 ? '' : plus(a)}}{x${plus(b)}}`)} para ${math(`x=${k}`)}.`,
        `احسب قيمة ${math(`\\frac{x^{2}${a === 0 ? '' : plus(a)}}{x${plus(b)}}`)} عندما ${math(`x=${k}`)}.`, `Work out the value of ${math(`\\frac{x^{2}${a === 0 ? '' : plus(a)}}{x${plus(b)}}`)} for ${math(`x=${k}`)}.`
    ), choices, answer, same(`\\frac{${bracket(k)}^{2}${a === 0 ? '' : plus(a)}}{${k}${plus(b)}}=${written(answer)}`), { a, b, k })
}

function holeQuestion(random: Random): PolynomialsRaceQuestion | null {
    const r = randomInt(random, 1, 6)
    const s = randomInt(random, -6, -1)
    const c = nonZero(random, -7, 7)
    if (c === -r || c === -s) return null
    const den = fromRoots([r, s])
    const choices = options(random, fraction(r), [whole(-c, 'numerator'), whole(-r, 'binomial-sign'), whole(den[2], 'constant'), whole(s, 'calculation'), ...near(r)])
    return choices && build(3, 'hole', say(
        `${math(`\\frac{x${plus(c)}}{${polyLatex(den)}}`)} zatikia ez dago x-ren bi baliotan. Zein da positiboa?`,
        `${math(`\\frac{x${plus(c)}}{${polyLatex(den)}}`)} no existe para dos valores de x. ¿Cuál es el positivo?`,
        `${math(`\\frac{x${plus(c)}}{${polyLatex(den)}}`)} غير معرّف عند قيمتين لـ x. ما القيمة الموجبة؟`, `${math(`\\frac{x${plus(c)}}{${polyLatex(den)}}`)} does not exist for two values of x. Which of the two values is positive?`
    ), choices, fraction(r), same(`${polyLatex(den)}=(${binomialLatex(r)})(${binomialLatex(s)})`), { r, s, c })
}

function simplifyQuestion(random: Random, tier: Tier): PolynomialsRaceQuestion | null {
    const a = nonZero(random, -6, 6)
    const b = nonZero(random, -6, 6)
    const k = randomInt(random, tier === 0 ? 1 : -5, 9)
    if (a === b || k === -a) return null
    const numerator = [1, a + b, a * b]
    const value = k + b
    const choices = options(random, fraction(value), [whole(k + a, 'wrong-factor'), whole(k - b, 'sign'), whole(evaluate(numerator, k), 'calculation'), ...near(value)])
    return choices && build(3, 'simplify', say(
        `Sinplifikatu ${math(`\\frac{${polyLatex(numerator)}}{x${plus(a)}}`)} eta kalkulatu haren balioa ${math(`x=${k}`)} denean.`,
        `Simplifica ${math(`\\frac{${polyLatex(numerator)}}{x${plus(a)}}`)} y calcula su valor para ${math(`x=${k}`)}.`,
        `بسّط ${math(`\\frac{${polyLatex(numerator)}}{x${plus(a)}}`)} واحسب قيمته عندما ${math(`x=${k}`)}.`, `Simplify ${math(`\\frac{${polyLatex(numerator)}}{x${plus(a)}}`)} and work out its value for ${math(`x=${k}`)}.`
    ), choices, fraction(value), same(`\\frac{(x${plus(a)})(x${plus(b)})}{x${plus(a)}}=x${plus(b)}`), { a, b, k })
}

function equivalentQuestion(random: Random): PolynomialsRaceQuestion | null {
    const a = nonZero(random, -6, 6)
    const b = nonZero(random, -6, 6)
    const c = nonZero(random, -6, 6)
    if (a === b || c === -a || c === b) return null
    const value = a + c
    if (value === 0) return null
    const den = [1, b + c, b * c]
    const choices = options(random, fraction(value), [whole(a * c, 'product'), whole(a - c, 'sign'), whole(b + c, 'calculation'), ...near(value)])
    return choices && build(3, 'equivalent', say(
        `${math(`\\frac{x${plus(a)}}{x${plus(b)}}=\\frac{x^{2}+kx${plus(a * c)}}{${polyLatex(den)}}`)}. Zenbat da ${math('k')}?`,
        `${math(`\\frac{x${plus(a)}}{x${plus(b)}}=\\frac{x^{2}+kx${plus(a * c)}}{${polyLatex(den)}}`)}. ¿Cuánto vale ${math('k')}?`,
        `${math(`\\frac{x${plus(a)}}{x${plus(b)}}=\\frac{x^{2}+kx${plus(a * c)}}{${polyLatex(den)}}`)}. كم تساوي ${math('k')}؟`, `${math(`\\frac{x${plus(a)}}{x${plus(b)}}=\\frac{x^{2}+kx${plus(a * c)}}{${polyLatex(den)}}`)}. What is ${math('k')}?`
    ), choices, fraction(value), same(`(x${plus(a)})(x${plus(c)})=${polyLatex([1, a + c, a * c])}`), { a, b, c })
}

/* ---------- Circuit 4: operations with fractions ---------- */

function sumQuestion(random: Random, tier: Tier): PolynomialsRaceQuestion | null {
    const k1 = tier === 0 ? 1 : randomInt(random, 1, 4)
    const k2 = randomInt(random, 1, tier === 0 ? 3 : 5)
    const a = nonZero(random, -6, 6)
    const b = nonZero(random, -6, 6)
    if (a === b) return null
    const value = k1 * b + k2 * a
    const choices = options(random, fraction(value), [whole(k1 * a + k2 * b, 'cross'), whole(k1 + k2, 'add-across'), whole(a * b, 'product'), ...near(value)])
    return choices && build(4, 'sum', say(
        `${math(`\\frac{${k1}}{x${plus(a)}}+\\frac{${k2}}{x${plus(b)}}=\\frac{${k1 + k2}x+c}{(x${plus(a)})(x${plus(b)})}`)}. Zenbat da ${math('c')}?`,
        `${math(`\\frac{${k1}}{x${plus(a)}}+\\frac{${k2}}{x${plus(b)}}=\\frac{${k1 + k2}x+c}{(x${plus(a)})(x${plus(b)})}`)}. ¿Cuánto vale ${math('c')}?`,
        `${math(`\\frac{${k1}}{x${plus(a)}}+\\frac{${k2}}{x${plus(b)}}=\\frac{${k1 + k2}x+c}{(x${plus(a)})(x${plus(b)})}`)}. كم تساوي ${math('c')}؟`, `${math(`\\frac{${k1}}{x${plus(a)}}+\\frac{${k2}}{x${plus(b)}}=\\frac{${k1 + k2}x+c}{(x${plus(a)})(x${plus(b)})}`)}. What is ${math('c')}?`
    ), choices, fraction(value), same(`${k1}\\cdot ${bracket(b)}+${k2}\\cdot ${bracket(a)}=${value}`), { k1, a, k2, b })
}

function differenceQuestion(random: Random): PolynomialsRaceQuestion | null {
    const a = randomInt(random, 1, 9)
    const value = 2 * a
    const choices = options(random, fraction(value), [whole(0, 'no-bracket'), whole(-value, 'sign'), whole(a, 'calculation'), whole(a * a, 'product')])
    return choices && build(4, 'difference', howMuch(`\\frac{1}{x-${a}}-\\frac{1}{x+${a}}=\\frac{n}{x^{2}-${a * a}}`, 'n'), choices, fraction(value), same(`(x+${a})-(x-${a})=${value}`), { a })
}

function productFractionQuestion(random: Random, tier: Tier): PolynomialsRaceQuestion | null {
    const a = randomInt(random, 1, 9)
    const k = tier === 0 ? 1 : randomInt(random, 2, 5)
    const value = -a * k
    const choices = options(random, fraction(value), [whole(a * k, 'sign'), whole(-a * a * k, 'wrong-factor'), whole(k, 'calculation'), whole(-a, 'calculation')])
    const left = k === 1 ? 'x' : `${k}x`
    return choices && build(4, 'product-fraction', howMuch(`\\frac{x^{2}-${a * a}}{x}\\cdot\\frac{${left}}{x+${a}}=${k === 1 ? '' : k}x+c`, 'c'), choices, fraction(value), same(`\\frac{(x+${a})(x-${a})\\cdot ${left}}{x(x+${a})}=${k === 1 ? '' : k}(x-${a})`), { a, k })
}

/** Pairs of taps whose time together is a whole number of minutes */
const TAP_PAIRS = [[3, 6], [4, 12], [6, 12], [10, 15], [12, 24], [20, 30], [6, 6], [12, 12], [5, 20], [10, 40], [15, 30], [9, 18], [8, 24], [18, 36], [12, 4], [14, 35]]

function tapsQuestion(random: Random): PolynomialsRaceQuestion | null {
    const [a, b] = pick(random, TAP_PAIRS)
    const value = (a * b) / (a + b)
    const choices = options(random, fraction(value), [whole((a + b) / 2, 'average'), whole(a + b, 'add-across'), whole(Math.abs(a - b), 'calculation'), ...near(value)])
    return choices && build(4, 'taps', say(
        `Txorrota batek depositua ${a} minututan betetzen du, eta beste batek ${b} minututan. Zenbat minutu behar dituzte biek batera?`,
        `Un grifo llena un depósito en ${a} minutos y otro en ${b} minutos. ¿Cuántos minutos tardan los dos juntos?`,
        `يملأ صنبور خزانًا في ${a} دقيقة وآخر في ${b} دقيقة. كم دقيقة يحتاجان معًا؟`, `One tap fills a tank in ${a} minutes and another in ${b} minutes. How many minutes do the two of them take together?`
    ), choices, fraction(value), same(`\\frac{1}{${a}}+\\frac{1}{${b}}=\\frac{1}{${value}}`), { a, b })
}

type Generator = (random: Random, tier: Tier) => PolynomialsRaceQuestion | null

const circuitGenerators: Generator[][] = [
    [productQuestion, squareQuestion, binomialQuestion, valueQuestion],
    [remainderQuestion, quotientQuestion, parameterQuestion, degreeQuestion],
    [greatestRootQuestion, missingFactorQuestion, leadingFactorQuestion, lcmDegreeQuestion],
    [fractionValueQuestion, holeQuestion, simplifyQuestion, equivalentQuestion],
    [sumQuestion, differenceQuestion, productFractionQuestion, tapsQuestion]
]

export function generatePolynomialsRaceQuestion(random: Random, circuit: number, tier: Tier): PolynomialsRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkPolynomialsPitAnswer(question: RaceQuestion<PolynomialsRaceError>, input: string): AnswerCheck {
    return checkAnswer(input, question.answer, question.answerForm)
}

export function polynomialsParTime(circuit: number): number {
    return parTimeFor([12, 13, 13, 13, 12][circuit] ?? 12)
}

export const polynomialsRaceErrorTips: Record<PolynomialsRaceError, LocalizedText> = {
    cross: say('Biderkatzean, gai bakoitza gai guztiez: x-ren gaia bi gurutze-biderkaduren batura da.', 'Al multiplicar, cada término por todos: el término en x es la suma de los dos productos cruzados.', 'في الضرب كل حد في كل الحدود: حد x هو مجموع الجداءين المتقاطعين.', 'When multiplying, multiply each term by every term: the x term is the sum of the two cross products.'),
    'no-double': say('(a + b)² = a² + 2ab + b²: ez ahaztu bikoitza.', '(a + b)² = a² + 2ab + b²: no olvides el doble.', '(a + b)² = a² + 2ab + b²: لا تنسَ الضعف.', '(a + b)² = a² + 2ab + b²: don\'t forget the double.'),
    'no-power': say('Tartagliako zenbakia b-ren berreturaz biderkatzen da, ez b-z bakarrik.', 'El número de Tartaglia se multiplica por la potencia de b, no solo por b.', 'يُضرب عدد تارتاليا في قوة b لا في b وحدها.', 'The Tartaglia number is multiplied by the power of b, not only by b.'),
    row: say('Hartu errenkada egokia: (x + b)ⁿ → n. errenkada; xᵏ-ren aurrean b-ren berretzailea n − k da.', 'Toma la fila correcta: (x + b)ⁿ → fila n; delante de xᵏ, b va elevado a n − k.', 'خذ الصف الصحيح: (x + b)ⁿ ← الصف n؛ وأمام xᵏ يكون أس b هو n − k.', 'Take the correct row: (x + b)ⁿ → row n; with xᵏ, b is raised to the power n − k.'),
    sign: say('Kontuz zeinuarekin: negatiboak parentesi artean.', 'Cuidado con el signo: los negativos, entre paréntesis.', 'انتبه للإشارة: السالب بين قوسين.', 'Be careful with the sign: put negatives in brackets.'),
    'binomial-sign': say('x − a binomioan erroa a da; x + a bada, −a.', 'En x − a la raíz es a; si es x + a, es −a.', 'في x − a يكون الجذر a؛ وإذا كان x + a فهو −a.', 'In x − a the root is a; if it is x + a, it is −a.'),
    remainder: say('Azken zenbakia hondarra da; zatiduraren gai askea haren aurrekoa da.', 'El último número es el resto; el término independiente del cociente es el anterior.', 'العدد الأخير هو الباقي؛ والحد الثابت لخارج القسمة هو الذي قبله.', 'The last number is the remainder; the constant term of the quotient is the one before it.'),
    degree: say('Zatiduraren maila = zatikizunarena − zatitzailearena. M.k.t.: faktore bakoitza berretzaile handienarekin.', 'Grado del cociente = el del dividendo − el del divisor. M.c.m.: cada factor con su mayor exponente.', 'درجة خارج القسمة = درجة المقسوم − درجة المقسوم عليه. المضاعف: كل عامل بأكبر أس.', 'Degree of the quotient = degree of the dividend − degree of the divisor. LCM: each factor with its highest exponent.'),
    constant: say('Gai askea ez da erroa: erroak haren zatitzaileen artean daude.', 'El término independiente no es la raíz: las raíces están entre sus divisores.', 'الحد الثابت ليس الجذر: الجذور بين قواسمه.', 'The constant term is not the root: the roots are among its divisors.'),
    product: say('Ez biderkatu dena: m.k.t.-an faktore komunak behin bakarrik doaz.', 'No lo multipliques todo: en el m.c.m. los factores comunes van una sola vez.', 'لا تضرب كل شيء: في المضاعف تُكتب العوامل المشتركة مرة واحدة.', 'Don\'t multiply everything out: in the LCM, common factors appear only once.'),
    'upside-down': say('Zenbakitzailea goian eta izendatzailea behean: ez eman buelta zatikiari.', 'El numerador arriba y el denominador abajo: no le des la vuelta a la fracción.', 'البسط في الأعلى والمقام في الأسفل: لا تقلب الكسر.', 'The numerator goes on top and the denominator at the bottom: don\'t flip the fraction.'),
    numerator: say('Zatikia ez dago izendatzailea 0 denean; zenbakitzailea 0 bada, zatikiak 0 balio du.', 'La fracción no existe cuando el denominador es 0; si es 0 el numerador, vale 0.', 'لا يكون الكسر معرّفًا عندما يكون المقام 0؛ وإذا انعدم البسط فقيمته 0.', 'The fraction does not exist when the denominator is 0; if the numerator is 0, the fraction equals 0.'),
    'wrong-factor': say('Ezabatzen den faktorea izendatzailearena da; geratzen dena bestea da.', 'El factor que se elimina es el del denominador; queda el otro.', 'العامل الذي يُحذف هو عامل المقام؛ ويبقى الآخر.', 'The factor that is cancelled is the one in the denominator; the other one stays.'),
    'no-bracket': say('Kentzean, parentesia: −(x − a) = −x + a.', 'Al restar, paréntesis: −(x − a) = −x + a.', 'عند الطرح استعمل القوس: −(x − a) = −x + a.', 'When subtracting, use brackets: −(x − a) = −x + a.'),
    'add-across': say('Zatikiak ez dira goikoak eta behekoak batuz batzen: izendatzaile komuna behar da.', 'Las fracciones no se suman sumando arriba y abajo: hace falta el denominador común.', 'لا تُجمع الكسور بجمع البسوط والمقامات: يلزم مقام مشترك.', 'Fractions are not added by adding the tops and the bottoms: you need a common denominator.'),
    average: say('Batera ez dute batez bestekoa behar: 1/a + 1/b minutuko, beraz bakoitzak bakarrik baino gutxiago.', 'Juntos no tardan la media: 1/a + 1/b por minuto, así que menos que cada uno solo.', 'معًا لا يحتاجان المتوسط: 1/a + 1/b في الدقيقة، أي أقل من كل واحد وحده.', 'Together they don\'t take the mean of the two times: 1/a + 1/b per minute, so less than each one alone.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}
