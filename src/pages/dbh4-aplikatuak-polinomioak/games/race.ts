import { checkAnswer, fraction, type AnswerCheck } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { algebraRaceErrorTips, generateAlgebraRaceQuestion, type AlgebraRaceError } from '../../dbh2-aljebra-v2/games/race.ts'
import { binomialLatex, evaluate, polynomialLatex, ruffiniRows } from '../lab/labTools.ts'

/* ==========================================================================
   Polinomioen lasterketa (4. DBH aplikatuak): five circuits, one per stage.
   The monomial and operation circuits borrow the 2. DBH algebra
   generators; the factor circuit mixes new root questions with the 2. DBH
   common factor and squares. Division (remainder, quotient, the k that
   makes a division exact) and expressions (an algebraic fraction's value,
   simplifying, a rectangle of given perimeter) are new. Wrong options are
   typical mistakes: a taken with the wrong sign, adding without
   multiplying by a in Ruffini, the opposite of a root, a number that does
   not divide the constant term, a value before simplifying, the whole
   perimeter instead of half… Prompts never put a Basque suffix after a
   generated number.
   ========================================================================== */

export const POLYNOMIALS_RACE_CIRCUITS = 5

export type PolynomialsRaceError = AlgebraRaceError | 'sign-a' | 'no-multiply' | 'root-sign' | 'not-divisor' | 'no-simplify' | 'half-perimeter' | 'no-distribute'

export type PolynomialsRaceQuestion = RaceQuestion<PolynomialsRaceError>

const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar })
const math = (latex: string) => `$${latex}$`
const all = (latex: string): LocalizedText => say(math(latex), math(latex), math(latex))
const signedRandom = (random: Random, min: number, max: number) => randomInt(random, min, max) * (random() < 0.5 ? -1 : 1)

interface Candidate {
    value: number
    error: PolynomialsRaceError
}

/** The right integer and three different wrong ones */
function options(random: Random, right: number, candidates: Candidate[]): RaceOption<PolynomialsRaceError>[] | null {
    const used = new Set([right])
    const wrong: Candidate[] = []
    for (const candidate of candidates) {
        if (wrong.length === 3) break
        if (used.has(candidate.value) || !Number.isInteger(candidate.value)) continue
        used.add(candidate.value)
        wrong.push(candidate)
    }
    if (wrong.length < 3) return null
    return shuffle(random, [{ latex: String(right), correct: true, error: null }, ...wrong.map((candidate) => ({ latex: String(candidate.value), correct: false, error: candidate.error }))])
}

const near = (value: number): Candidate[] => [value + 1, value - 1, value + 2, value - 2, value + 10].map((item) => ({ value: item, error: 'calculation' }))

function question(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<PolynomialsRaceError>[], answer: number | null, solution: LocalizedText): PolynomialsRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer: fraction(answer ?? 0), answerForm: 'any', percentAnswer: false, writable: answer !== null, solution }
}

/** A 2. DBH algebra question, renumbered as this race's circuit */
function borrowed(random: Random, circuit: number, tier: Tier, from: number[]): PolynomialsRaceQuestion {
    return { ...generateAlgebraRaceQuestion(random, pick(random, from), tier), circuit }
}

/** A cubic with small coefficients and leading coefficient 1 or 2 */
const cubic = (random: Random, tier: Tier) => [tier === 2 ? pick(random, [1, 2]) : 1, signedRandom(random, 1, 7), signedRandom(random, 0, 9), signedRandom(random, 1, 9)]

/* ---------- Circuit 2: division and Ruffini ---------- */

function remainderQuestion(random: Random, tier: Tier): PolynomialsRaceQuestion | null {
    const coefficients = cubic(random, tier)
    const a = signedRandom(random, 1, tier === 0 ? 2 : 3)
    const answer = evaluate(coefficients, a)
    const choices = options(random, answer, [{ value: evaluate(coefficients, -a), error: 'sign-a' }, { value: coefficients.reduce((sum, value) => sum + value, 0), error: 'calculation' }, ...near(answer)])
    if (!choices) return null
    const bottom = ruffiniRows(coefficients, a).bottom
    return question(2, 'remainder', say(
        `Zein da ${math(`(${polynomialLatex(coefficients)})\\mathbin{:}(${binomialLatex(a)})`)} zatiketaren hondarra?`,
        `¿Cuál es el resto de ${math(`(${polynomialLatex(coefficients)})\\mathbin{:}(${binomialLatex(a)})`)}?`,
        `ما باقي ${math(`(${polynomialLatex(coefficients)})\\mathbin{:}(${binomialLatex(a)})`)}؟`
    ), choices, answer, all(`a=${a}:\\ ${bottom.join(';\\ ')}`))
}

function quotientQuestion(random: Random, tier: Tier): PolynomialsRaceQuestion | null {
    const coefficients = cubic(random, tier)
    const a = signedRandom(random, 1, 3)
    const bottom = ruffiniRows(coefficients, a).bottom
    const answer = bottom[1]
    const choices = options(random, answer, [{ value: coefficients[1] + coefficients[0], error: 'no-multiply' }, { value: coefficients[1] - coefficients[0] * a, error: 'sign-a' }, ...near(answer)])
    if (!choices) return null
    return question(2, 'quotient', say(
        `Ruffiniz ${math(`(${polynomialLatex(coefficients)})\\mathbin{:}(${binomialLatex(a)})`)}: zein da zatiduraren x-ren koefizientea?`,
        `Con Ruffini, ${math(`(${polynomialLatex(coefficients)})\\mathbin{:}(${binomialLatex(a)})`)}: ¿cuál es el coeficiente de x del cociente?`,
        `بروفيني ${math(`(${polynomialLatex(coefficients)})\\mathbin{:}(${binomialLatex(a)})`)}: ما معامل x في خارج القسمة؟`
    ), choices, answer, all(`${coefficients[0]}\\cdot(${a})+(${coefficients[1]})=${answer}`))
}

function exactQuestion(random: Random, tier: Tier): PolynomialsRaceQuestion | null {
    if (tier === 0) return null
    const a = signedRandom(random, 1, 3)
    const k = signedRandom(random, 1, 6)
    const p = signedRandom(random, 0, 6)
    // P(a) = 0 fixes the constant term
    const q = -(a ** 3 + k * a * a + p * a)
    if (q === 0 || Math.abs(q) > 60) return null
    const shown = [1, 0, p, q]
    const latex = polynomialLatex(shown).replace(/^x\^\{3\}/, 'x^{3}+kx^{2}')
    const choices = options(random, k, [{ value: -k, error: 'sign-a' }, ...near(k)])
    if (!choices) return null
    return question(2, 'exact', say(
        `Zenbat da k, ${math(`(${latex})\\mathbin{:}(${binomialLatex(a)})`)} zatiketa zehatza izateko?`,
        `¿Cuánto vale k para que ${math(`(${latex})\\mathbin{:}(${binomialLatex(a)})`)} sea exacta?`,
        `كم قيمة k لتكون ${math(`(${latex})\\mathbin{:}(${binomialLatex(a)})`)} تامة؟`
    ), choices, k, all(`P(${a})=${a ** 3}+${a * a}k${p * a < 0 ? '' : '+'}${p * a}${q < 0 ? '' : '+'}${q}=0\\ \\to\\ k=${k}`))
}

/* ---------- Circuit 3: roots (and the 2. DBH factor questions) ---------- */

function rootQuestion(random: Random, tier: Tier): PolynomialsRaceQuestion | null {
    const roots = [signedRandom(random, 1, tier === 0 ? 3 : 5), signedRandom(random, 1, 4), signedRandom(random, 1, 4)]
    if (new Set(roots.map(Math.abs)).size < 3) return null
    // (x − r1)(x − r2)(x − r3)
    const coefficients = roots.reduce<number[]>((product, root) => [...product, 0].map((value, index) => value - (index > 0 ? root * product[index - 1] : 0)), [1])
    const constant = Math.abs(coefficients[3])
    const right = pick(random, roots)
    const isRoot = (value: number) => evaluate(coefficients, value) === 0
    const divisors = Array.from({ length: constant }, (_, index) => index + 1).filter((value) => constant % value === 0).flatMap((value) => [value, -value]).filter((value) => !isRoot(value))
    const nonDivisor = Array.from({ length: 12 }, (_, index) => index + 2).find((value) => constant % value !== 0)!
    const opposite: Candidate[] = isRoot(-right) ? [] : [{ value: -right, error: 'root-sign' }]
    const others: Candidate[] = divisors.map((value) => ({ value, error: 'calculation' }))
    const candidates = [...opposite, { value: nonDivisor, error: 'not-divisor' } as Candidate, ...others].filter((candidate) => !isRoot(candidate.value))
    const choices = options(random, right, candidates)
    if (!choices) return null
    return question(3, 'root', say(
        `Zein da ${math(polynomialLatex(coefficients))} polinomioaren erro bat?`,
        `¿Cuál es una raíz de ${math(polynomialLatex(coefficients))}?`,
        `ما جذر من جذور ${math(polynomialLatex(coefficients))}؟`
    ), choices, null, all(`P(${right})=0`))
}

/* ---------- Circuit 4: algebraic expressions ---------- */

function fractionQuestion(random: Random, tier: Tier): PolynomialsRaceQuestion | null {
    const a = signedRandom(random, 1, 6)
    const b = signedRandom(random, 1, 6)
    const c = randomInt(random, 1, tier === 0 ? 5 : 9)
    if (a === b || c + a === 0) return null
    const numerator = polynomialLatex([1, a + b, a * b])
    const answer = c + b
    const choices = options(random, answer, [{ value: c + a, error: 'calculation' }, { value: c * c + (a + b) * c + a * b, error: 'no-simplify' }, { value: c - b, error: 'calculation' }, ...near(answer)])
    if (!choices) return null
    return question(4, 'fraction', say(
        `Sinplifikatu ${math(`\\frac{${numerator}}{${binomialLatex(-a)}}`)} eta kalkulatu haren balioa ${math(`x=${c}`)} denean.`,
        `Simplifica ${math(`\\frac{${numerator}}{${binomialLatex(-a)}}`)} y calcula su valor para ${math(`x=${c}`)}.`,
        `بسّط ${math(`\\frac{${numerator}}{${binomialLatex(-a)}}`)} واحسب قيمته عندما ${math(`x=${c}`)}.`
    ), choices, answer, all(`\\frac{(${binomialLatex(-a)})(${binomialLatex(-b)})}{${binomialLatex(-a)}}=${binomialLatex(-b)}\\ \\to\\ ${c}${b < 0 ? '' : '+'}${b}=${answer}`))
}

function simplifyQuestion(random: Random, tier: Tier): PolynomialsRaceQuestion | null {
    const p = randomInt(random, 2, tier === 0 ? 5 : 9)
    const a = randomInt(random, 1, 9)
    const q = randomInt(random, 2, tier === 0 ? 5 : 9)
    const b = randomInt(random, 1, 9)
    const answer = p * a - q * b
    const choices = options(random, answer, [{ value: p * a + q * b, error: 'bracket-sign' }, { value: a - b, error: 'no-distribute' }, { value: p * a - b, error: 'no-distribute' }, ...near(answer)])
    if (!choices) return null
    return question(4, 'simplify', say(
        `Sinplifikatu ${math(`${p}(x+${a})-${q}(x+${b})`)}. Zein da gai askea?`,
        `Simplifica ${math(`${p}(x+${a})-${q}(x+${b})`)}. ¿Cuál es el término independiente?`,
        `بسّط ${math(`${p}(x+${a})-${q}(x+${b})`)}. ما الحد الثابت؟`
    ), choices, answer, all(`${p}\\cdot ${a}-${q}\\cdot ${b}=${answer}`))
}

function rectangleQuestion(random: Random, tier: Tier): PolynomialsRaceQuestion | null {
    const half = pick(random, tier === 0 ? [10, 20, 50] : [11, 15, 24, 30, 50, 100])
    const side = randomInt(random, 2, half - 2)
    const answer = side * (half - side)
    const choices = options(random, answer, [{ value: side * (2 * half - side), error: 'half-perimeter' }, { value: half * side, error: 'calculation' }, ...near(answer)])
    if (!choices) return null
    return question(4, 'rectangle', say(
        `Laukizuzen baten perimetroa ${math(`${2 * half}`)} m da eta azalera ${math(`x(${half}-x)`)}. Zenbat m² ${math(`x=${side}`)} denean?`,
        `Un rectángulo de ${math(`${2 * half}`)} m de perímetro tiene área ${math(`x(${half}-x)`)}. ¿Cuántos m² para ${math(`x=${side}`)}?`,
        `مستطيل محيطه ${math(`${2 * half}`)} م ومساحته ${math(`x(${half}-x)`)}. كم م² عندما ${math(`x=${side}`)}؟`
    ), choices, answer, all(`${side}\\cdot(${half}-${side})=${answer}`))
}

/* ---------- Public API ---------- */

type Generator = (random: Random, tier: Tier) => PolynomialsRaceQuestion | null

const circuitGenerators: Generator[][] = [
    [(random, tier) => borrowed(random, 0, tier, [0, 1])],
    [(random, tier) => borrowed(random, 1, tier, [2, 3])],
    [remainderQuestion, quotientQuestion, exactQuestion],
    [rootQuestion, (random, tier) => borrowed(random, 3, tier, [4])],
    [fractionQuestion, simplifyQuestion, rectangleQuestion]
]

export function generatePolynomialsRaceQuestion(random: Random, circuit: number, tier: Tier): PolynomialsRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 800; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkPolynomialsPitAnswer(question: PolynomialsRaceQuestion, input: string): AnswerCheck {
    return checkAnswer(input, question.answer, question.answerForm)
}

export function polynomialsParTime(circuit: number): number {
    return parTimeFor([10, 12, 13, 12, 12][circuit] ?? 12)
}

export const polynomialsRaceErrorTips: Record<PolynomialsRaceError, LocalizedText> = {
    ...algebraRaceErrorTips,
    'sign-a': say('Kontuz a-ren zeinuarekin: $x-a$ zatitzailean, $x+3$ bada $a=-3$.', 'Cuidado con el signo de a: en $x-a$, si es $x+3$, $a=-3$.', 'انتبه لإشارة a: في $x-a$، إذا كان $x+3$ فإن $a=-3$.'),
    'no-multiply': say('Ruffinin, behekoa a-z biderkatu behar da batu aurretik.', 'En Ruffini hay que multiplicar el de abajo por a antes de sumar.', 'في روفيني نضرب العدد السفلي في a قبل الجمع.'),
    'root-sign': say('$x-r$ faktoreak r erroa ematen du: $(x+2)$ → erroa $-2$.', 'El factor $x-r$ da la raíz r: $(x+2)$ → raíz $-2$.', 'العامل $x-r$ يعطي الجذر r: $(x+2)$ ← الجذر $-2$.'),
    'not-divisor': say('Erro osoak gai askearen zatitzaileak dira.', 'Las raíces enteras son divisores del término independiente.', 'الجذور الصحيحة قواسم الحد الثابت.'),
    'no-simplify': say('Lehenik faktorizatu eta sinplifikatu; gero ordeztu.', 'Primero factoriza y simplifica; después sustituye.', 'حلّل وبسّط أولًا ثم عوّض.'),
    'half-perimeter': say('Bi alde jarraiak perimetroaren erdia dira.', 'Dos lados contiguos suman la mitad del perímetro.', 'مجموع ضلعين متجاورين نصف المحيط.'),
    'no-distribute': say('Parentesiaren aurreko zenbakia gai guztiez biderkatu.', 'Multiplica el número de delante por todos los términos del paréntesis.', 'اضرب العدد الذي قبل القوس في كل حدوده.')
}
