import { checkAnswer, fraction, type AnswerCheck } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'

/* ==========================================================================
   Polinomioen lasterketa (3. DBH): five circuits, one per stage — the value
   and the degree of a polynomial and products of monomials; a coefficient
   of a sum, a difference or a product; special products; remainders, roots
   and Ruffini; common factors and factorising. A polynomial is not a
   number, so every question asks for one number of the result. Wrong
   options are the typical mistakes. Every question carries `meta`.
   ========================================================================== */

export const POLYNOMIALS3_RACE_CIRCUITS = 5

export type Polynomials3RaceError =
    | 'sign'
    | 'multiply-exponents'
    | 'add-unlike'
    | 'minus-first'
    | 'missing-products'
    | 'no-middle'
    | 'middle-single'
    | 'square-sign'
    | 'remainder-sign'
    | 'factor-one'
    | 'calculation'

export type Polynomials3RaceQuestion = RaceQuestion<Polynomials3RaceError> & { meta: Record<string, number> }

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (latex: string): LocalizedText => ({ eu: `$${latex}$`, es: `$${latex}$`, en: `$${latex}$`, ar: `$${latex.replace(/\{,\}/g, '.')}$` })
const math = (latex: string) => `$${latex}$`
const signed = (value: number) => (value < 0 ? `${value}` : `+${value}`)

interface Candidate {
    value: number
    error: Polynomials3RaceError
}
const wrong = (value: number, error: Polynomials3RaceError): Candidate => ({ value, error })

function options(random: Random, right: number, candidates: Candidate[]): RaceOption<Polynomials3RaceError>[] | null {
    const used = new Set([right])
    const chosen: Candidate[] = []
    for (const candidate of [...candidates, wrong(-right, 'sign'), wrong(right + 1, 'calculation'), wrong(right - 2, 'calculation'), wrong(right * 2, 'calculation')]) {
        if (chosen.length === 3) break
        if (!Number.isInteger(candidate.value) || used.has(candidate.value)) continue
        used.add(candidate.value)
        chosen.push(candidate)
    }
    if (chosen.length < 3) return null
    return shuffle(random, [{ latex: String(right), correct: true, error: null }, ...chosen.map((item) => ({ latex: String(item.value), correct: false, error: item.error }))])
}

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<Polynomials3RaceError>[], answer: number, solution: LocalizedText, meta: Record<string, number>): Polynomials3RaceQuestion {
    return { circuit, kind, prompt, options: choices, answer: fraction(answer), answerForm: 'any', percentAnswer: false, writable: true, solution, meta }
}

const coefficientOf = (formula: string, power: number) => (power === 0
    ? say(`${math(formula)}: zein da gai askea?`, `${math(formula)}: ¿cuál es el término independiente?`, `${math(formula)}: ما الحد الثابت؟`, `${math(formula)}: what is the constant term?`)
    : say(`${math(formula)}: zein da ${math(power === 1 ? 'x' : `x^{${power}}`)} gaiaren koefizientea?`, `${math(formula)}: ¿cuál es el coeficiente de ${math(power === 1 ? 'x' : `x^{${power}}`)}?`, `${math(formula)}: ما معامل ${math(power === 1 ? 'x' : `x^{${power}}`)}؟`, `${math(formula)}: what is the coefficient of ${math(power === 1 ? 'x' : `x^{${power}}`)}?`))

/* ---------- Circuit 0: monomials and value ---------- */

function valueQuestion(random: Random, tier: Tier): Polynomials3RaceQuestion | null {
    const a = randomInt(random, 1, 3)
    const b = randomInt(random, -6, 6)
    const c = randomInt(random, -9, 9)
    const x = tier === 0 ? randomInt(random, 1, 4) : randomInt(random, -4, -1)
    const answer = a * x * x + b * x + c
    const formula = `P(x)=${a === 1 ? '' : a}x^{2}${b === 0 ? '' : `${signed(b)}x`}${c === 0 ? '' : signed(c)}`
    const choices = options(random, answer, [wrong(-a * x * x + b * x + c, 'sign'), wrong(a * x * x - b * x + c, 'sign'), wrong(a * 2 * x + b * x + c, 'calculation')])
    return choices && build(0, 'value', say(`${math(formula)}. Zenbat da ${math(`P(${x})`)}?`, `${math(formula)}. ¿Cuánto vale ${math(`P(${x})`)}?`, `${math(formula)}. كم يساوي ${math(`P(${x})`)}؟`, `${math(formula)}. What is ${math(`P(${x})`)}?`), choices, answer, same(`P(${x})=${answer}`), { a, b, c, x })
}

function productQuestion(random: Random): Polynomials3RaceQuestion | null {
    const m = randomInt(random, 2, 5)
    const n = randomInt(random, 2, 5)
    const answer = m + n
    const choices = options(random, answer, [wrong(m * n, 'multiply-exponents'), wrong(Math.max(m, n), 'calculation'), wrong(m + n + 1, 'calculation')])
    const a = randomInt(random, 2, 6)
    const b = randomInt(random, 2, 6)
    return choices && build(0, 'product-exponent', say(`${math(`${a}x^{${m}}\\cdot ${b}x^{${n}}=${a * b}x^{k}`)}. Zenbat da ${math('k')}?`, `${math(`${a}x^{${m}}\\cdot ${b}x^{${n}}=${a * b}x^{k}`)}. ¿Cuánto vale ${math('k')}?`, `${math(`${a}x^{${m}}\\cdot ${b}x^{${n}}=${a * b}x^{k}`)}. كم يساوي ${math('k')}؟`, `${math(`${a}x^{${m}}\\cdot ${b}x^{${n}}=${a * b}x^{k}`)}. What is ${math('k')}?`), choices, answer, same(`${m}+${n}=${answer}`), { m, n })
}

function reduceQuestion(random: Random): Polynomials3RaceQuestion | null {
    const a = randomInt(random, 2, 7)
    const b = randomInt(random, -6, 6)
    const c = randomInt(random, 1, 5)
    const d = randomInt(random, -5, 5)
    const answer = b + d
    const formula = `${a}x^{2}${signed(b)}x+${c}x^{2}${signed(d)}x`
    const choices = options(random, answer, [wrong(a + b + c + d, 'add-unlike'), wrong(a + c, 'add-unlike'), wrong(b - d, 'sign')])
    return choices && build(0, 'reduce', coefficientOf(formula, 1), choices, answer, same(`${b}${signed(d)}=${answer}`), { b, d })
}

/* ---------- Circuit 1: operations ---------- */

function differenceQuestion(random: Random): Polynomials3RaceQuestion | null {
    const b = randomInt(random, -6, 6)
    const c = randomInt(random, -6, 6)
    const e = randomInt(random, -6, 6)
    const f = randomInt(random, -6, 6)
    const answer = c - f
    const formula = `(x^{2}${signed(b)}x${signed(c)})-(2x^{2}${signed(e)}x${signed(f)})`
    const choices = options(random, answer, [wrong(c + f, 'minus-first'), wrong(f - c, 'sign'), wrong(c, 'calculation')])
    return choices && build(1, 'difference', coefficientOf(formula, 0), choices, answer, same(`${c}-(${f})=${answer}`), { c, f })
}

function binomialQuestion(random: Random): Polynomials3RaceQuestion | null {
    const a = randomInt(random, -7, 7)
    const b = randomInt(random, -7, 7)
    if (a === 0 || b === 0) return null
    const asks = random() < 0.5 ? 1 : 0
    const answer = asks === 1 ? a + b : a * b
    const formula = `(x${signed(a)})(x${signed(b)})`
    const choices = options(random, answer, asks === 1 ? [wrong(a * b, 'calculation'), wrong(0, 'missing-products'), wrong(a - b, 'sign')] : [wrong(a + b, 'calculation'), wrong(-a * b, 'sign'), wrong(a * b + 1, 'calculation')])
    return choices && build(1, asks === 1 ? 'binomial-x' : 'binomial-constant', coefficientOf(formula, asks), choices, answer, same(asks === 1 ? `${a}${signed(b)}=${answer}` : `${a}\\cdot(${b})=${answer}`), { a, b, asks })
}

function monomialTimesQuestion(random: Random): Polynomials3RaceQuestion | null {
    const k = randomInt(random, -5, 5)
    const b = randomInt(random, -6, 6)
    const c = randomInt(random, -6, 6)
    if (k === 0 || b === 0) return null
    const answer = k * b
    const formula = `${k}x(x^{2}${signed(b)}x${signed(c)})`
    const choices = options(random, answer, [wrong(k + b, 'calculation'), wrong(b, 'missing-products'), wrong(k * c, 'calculation')])
    return choices && build(1, 'monomial-times', coefficientOf(formula, 2), choices, answer, same(`${k}\\cdot(${b})=${answer}`), { k, b })
}

/* ---------- Circuit 2: special products ---------- */

function squareMiddleQuestion(random: Random, tier: Tier): Polynomials3RaceQuestion | null {
    const a = randomInt(random, 2, 9)
    const k = tier === 0 ? 1 : pick(random, [1, 2, 3])
    const minus = random() < 0.5
    const answer = (minus ? -2 : 2) * k * a
    const formula = `(${k === 1 ? '' : k}x${minus ? '-' : '+'}${a})^{2}`
    const choices = options(random, answer, [wrong((minus ? -1 : 1) * k * a, 'middle-single'), wrong(0, 'no-middle'), wrong(-answer, 'sign')])
    return choices && build(2, 'square-middle', coefficientOf(formula, 1), choices, answer, same(`2\\cdot ${k}\\cdot ${a}=${2 * k * a}`), { a, k, minus: minus ? 1 : 0 })
}

function squareLastQuestion(random: Random): Polynomials3RaceQuestion | null {
    const a = randomInt(random, 2, 12)
    const minus = random() < 0.5
    const answer = a * a
    const formula = `(x${minus ? '-' : '+'}${a})^{2}`
    const choices = options(random, answer, [wrong(-a * a, 'square-sign'), wrong(2 * a, 'calculation'), wrong(a, 'calculation')])
    return choices && build(2, 'square-last', coefficientOf(formula, 0), choices, answer, same(`(${minus ? '-' : ''}${a})^{2}=${answer}`), { a })
}

function mentalQuestion(random: Random): Polynomials3RaceQuestion | null {
    const base = pick(random, [20, 30, 40, 50, 60, 70, 100])
    const k = randomInt(random, 1, 3)
    const answer = base * base - k * k
    const choices = options(random, answer, [wrong(base * base + k * k, 'square-sign'), wrong(base * base, 'no-middle'), wrong(base * base - k, 'calculation')])
    return choices && build(2, 'mental', say(`Kalkulatu ${math(`${base + k}\\cdot ${base - k}`)}.`, `Calcula ${math(`${base + k}\\cdot ${base - k}`)}.`, `احسب ${math(`${base + k}\\cdot ${base - k}`)}.`, `Work out ${math(`${base + k}\\cdot ${base - k}`)}.`), choices, answer, same(`${base}^{2}-${k}^{2}=${answer}`), { base, k })
}

/* ---------- Circuit 3: Ruffini and roots ---------- */

function remainderQuestion(random: Random): Polynomials3RaceQuestion | null {
    const b = randomInt(random, -4, 4)
    const c = randomInt(random, -6, 6)
    const a = pick(random, [-3, -2, -1, 1, 2, 3])
    const value = (x: number) => x * x * x + b * x + c
    const answer = value(a)
    const formula = `(x^{3}${b === 0 ? '' : `${signed(b)}x`}${signed(c)}):(x${a > 0 ? `-${a}` : `+${-a}`})`
    const choices = options(random, answer, [wrong(value(-a), 'remainder-sign'), wrong(c, 'calculation'), wrong(answer + a, 'calculation')])
    return choices && build(3, 'remainder', say(`Zein da ${math(formula)} zatiketaren hondarra?`, `¿Cuál es el resto de ${math(formula)}?`, `ما باقي ${math(formula)}؟`, `What is the remainder of ${math(formula)}?`), choices, answer, same(`P(${a})=${answer}`), { b, c, a })
}

function kRootQuestion(random: Random): Polynomials3RaceQuestion | null {
    const r = pick(random, [-3, -2, -1, 1, 2, 3, 4])
    const c = randomInt(random, -8, 8)
    // r² + k·r + c = 0
    const k = -(r * r + c) / r
    if (!Number.isInteger(k)) return null
    const choices = options(random, k, [wrong((r * r + c) / r, 'sign'), wrong(-(r * r - c) / r, 'calculation'), wrong(k + r, 'calculation')])
    return choices && build(3, 'k-root', say(`${math(`x^{2}+kx${signed(c)}`)} polinomioak ${math(`x=${r}`)} erroa du. Zenbat da ${math('k')}?`, `${math(`x^{2}+kx${signed(c)}`)} tiene la raíz ${math(`x=${r}`)}. ¿Cuánto vale ${math('k')}?`, `لـ ${math(`x^{2}+kx${signed(c)}`)} الجذر ${math(`x=${r}`)}. كم يساوي ${math('k')}؟`, `${math(`x^{2}+kx${signed(c)}`)} has the root ${math(`x=${r}`)}. What is ${math('k')}?`), choices, k, same(`${r * r}+${r < 0 ? `(${r})` : r}k${signed(c)}=0\\ \\to\\ k=${k}`), { r, c })
}

function rootQuestion(random: Random): Polynomials3RaceQuestion | null {
    const p = randomInt(random, 1, 6)
    const q = randomInt(random, 1, 6)
    if (p === q) return null
    // (x − p)(x + q): roots p and −q; ask the positive one
    const b = q - p
    const c = -p * q
    const choices = options(random, p, [wrong(-p, 'sign'), wrong(q, 'sign'), wrong(-c, 'calculation')])
    return choices && build(3, 'root', say(`Zein da ${math(`x^{2}${b === 0 ? '' : `${signed(b)}x`}${signed(c)}`)} polinomioaren erro positiboa?`, `¿Cuál es la raíz positiva de ${math(`x^{2}${b === 0 ? '' : `${signed(b)}x`}${signed(c)}`)}?`, `ما الجذر الموجب لـ ${math(`x^{2}${b === 0 ? '' : `${signed(b)}x`}${signed(c)}`)}؟`, `What is the positive root of ${math(`x^{2}${b === 0 ? '' : `${signed(b)}x`}${signed(c)}`)}?`), choices, p, same(`(x-${p})(x+${q})`), { p, q })
}

/* ---------- Circuit 4: factorising ---------- */

function commonFactorQuestion(random: Random): Polynomials3RaceQuestion | null {
    const g = randomInt(random, 2, 9)
    const m = randomInt(random, 2, 5)
    const n = randomInt(random, 1, 5)
    if (m === n) return null
    const answer = g
    const choices = options(random, answer, [wrong(g * m, 'calculation'), wrong(g * n, 'calculation'), wrong(g + 1, 'calculation')])
    return choices && build(4, 'common-factor', say(`${math(`${g * m}x^{2}+${g * n}x=a\\,x(${m}x+${n})`)}. Zenbat da ${math('a')}?`, `${math(`${g * m}x^{2}+${g * n}x=a\\,x(${m}x+${n})`)}. ¿Cuánto vale ${math('a')}?`, `${math(`${g * m}x^{2}+${g * n}x=a\\,x(${m}x+${n})`)}. كم يساوي ${math('a')}؟`, `${math(`${g * m}x^{2}+${g * n}x=a\\,x(${m}x+${n})`)}. What is ${math('a')}?`), choices, answer, same(`${g * m}x^{2}+${g * n}x=${g}x(${m}x+${n})`), { g, m, n })
}

function differenceSquaresQuestion(random: Random): Polynomials3RaceQuestion | null {
    const a = randomInt(random, 2, 12)
    const choices = options(random, a, [wrong(a * a, 'calculation'), wrong(a * a / 2, 'calculation'), wrong(2 * a, 'calculation')])
    return choices && build(4, 'difference-squares', say(`${math(`x^{2}-${a * a}=(x+a)(x-a)`)}. Zenbat da ${math('a')}?`, `${math(`x^{2}-${a * a}=(x+a)(x-a)`)}. ¿Cuánto vale ${math('a')}?`, `${math(`x^{2}-${a * a}=(x+a)(x-a)`)}. كم يساوي ${math('a')}؟`, `${math(`x^{2}-${a * a}=(x+a)(x-a)`)}. What is ${math('a')}?`), choices, a, same(`${a * a}=${a}^{2}`), { a })
}

function perfectSquareQuestion(random: Random): Polynomials3RaceQuestion | null {
    const a = randomInt(random, 2, 10)
    const choices = options(random, a, [wrong(2 * a, 'middle-single'), wrong(a * a, 'calculation'), wrong(-a, 'sign')])
    return choices && build(4, 'perfect-square', say(`${math(`x^{2}+${2 * a}x+${a * a}=(x+a)^{2}`)}. Zenbat da ${math('a')}?`, `${math(`x^{2}+${2 * a}x+${a * a}=(x+a)^{2}`)}. ¿Cuánto vale ${math('a')}?`, `${math(`x^{2}+${2 * a}x+${a * a}=(x+a)^{2}`)}. كم يساوي ${math('a')}؟`, `${math(`x^{2}+${2 * a}x+${a * a}=(x+a)^{2}`)}. What is ${math('a')}?`), choices, a, same(`(x+${a})^{2}=x^{2}+${2 * a}x+${a * a}`), { a })
}

type Generator = (random: Random, tier: Tier) => Polynomials3RaceQuestion | null

const circuitGenerators: Generator[][] = [
    [valueQuestion, productQuestion, reduceQuestion],
    [differenceQuestion, binomialQuestion, monomialTimesQuestion],
    [squareMiddleQuestion, squareLastQuestion, mentalQuestion],
    [remainderQuestion, kRootQuestion, rootQuestion],
    [commonFactorQuestion, differenceSquaresQuestion, perfectSquareQuestion]
]

export function generatePolynomials3RaceQuestion(random: Random, circuit: number, tier: Tier): Polynomials3RaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 800; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkPolynomials3PitAnswer(question: RaceQuestion<Polynomials3RaceError>, input: string): AnswerCheck {
    return checkAnswer(input, question.answer, question.answerForm)
}

export function polynomials3ParTime(circuit: number): number {
    return parTimeFor([13, 13, 12, 14, 12][circuit] ?? 13)
}

export const polynomials3RaceErrorTips: Record<Polynomials3RaceError, LocalizedText> = {
    sign: say('Kontuz zeinuekin: zenbaki negatiboak parentesi artean.', 'Cuidado con los signos: los negativos, entre paréntesis.', 'انتبه للإشارات: السالبة بين قوسين.', 'Watch the signs: negative numbers go in brackets.'),
    'multiply-exponents': say('Oinarri bera biderkatzean berretzaileak batu egiten dira.', 'Al multiplicar la misma base los exponentes se suman.', 'عند ضرب الأساس نفسه تُجمع الأسس.', 'When multiplying the same base, the exponents are added.'),
    'add-unlike': say('Antzekoak bakarrik batzen dira: x² eta x ez.', 'Solo se suman los semejantes: x² y x no.', 'لا تُجمع إلا المتشابهة: x² وx لا.', 'Only like terms are added: x² and x are not.'),
    'minus-first': say('Minusak parentesiko gai guztiei eragiten die.', 'El menos afecta a todos los términos del paréntesis.', 'السالب يؤثر في كل حدود القوس.', 'The minus sign affects every term in the brackets.'),
    'missing-products': say('Gai bakoitza bider gai guztiak.', 'Cada término por todos los términos.', 'كل حد في كل الحدود.', 'Each term times every term.'),
    'no-middle': say('(a + b)² = a² + 2ab + b²: ez ahaztu erdiko gaia.', '(a + b)² = a² + 2ab + b²: no olvides el término del medio.', '(a + b)² = a² + 2ab + b²: لا تنسَ الحد الأوسط.', '(a + b)² = a² + 2ab + b²: do not forget the middle term.'),
    'middle-single': say('Erdiko gaia bikoitza da: 2ab.', 'El término del medio es el doble: 2ab.', 'الحد الأوسط هو الضعف: 2ab.', 'The middle term is twice the product: 2ab.'),
    'square-sign': say('Karratu bat beti positiboa da; batura bider kendura: a² − b².', 'Un cuadrado siempre es positivo; suma por diferencia: a² − b².', 'المربع موجب دائمًا؛ ومجموع في فرق: a² − b².', 'A square is always positive; sum times difference: a² − b².'),
    'remainder-sign': say('x − a zatitzean hondarra P(a); x + a zatitzean, P(−a).', 'Al dividir entre x − a el resto es P(a); entre x + a, P(−a).', 'عند القسمة على x − a الباقي P(a)، وعلى x + a هو P(−a).', 'Dividing by x − a, the remainder is P(a); by x + a, P(−a).'),
    'factor-one': say('Faktore komunak gai guztiak zatitzen ditu; atera z.k.h.', 'El factor común divide a todos los términos; saca el m.c.d.', 'العامل المشترك يقسم كل الحدود؛ أخرج ق.م.أ.', 'The common factor divides every term; take out the HCF.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}
