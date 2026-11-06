import { checkAnswer, fraction, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { written } from '../../batx1-zientziak-errealak/games/race.ts'
import { same as sameText, say } from '../../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   Deribatuen lasterketa (Batxilergoa 1 · Zientziak): five circuits, one
   per stage — the rate of change (an average rate, f′(a) of a quadratic,
   the n of a tangent), differentiability (a one-sided derivative, the k
   that joins two pieces, the m that makes the join smooth), the
   derivative function (a power, a square root, a polynomial), the rules
   (product, quotient, chain) and the elementary functions (an
   exponential, a logarithm, sine and cosine). Every answer is f′ at a
   point or a parameter, and the wrong options are the typical mistakes.
   Every question carries `meta`, the numbers the tests check it against.
   ========================================================================== */

export const BACH_DERIVATIVES_RACE_CIRCUITS = 5

export type BachDerivativesRaceError =
    | 'no-divide'
    | 'value'
    | 'exponent'
    | 'slope'
    | 'side'
    | 'sign'
    | 'product'
    | 'order'
    | 'quotient'
    | 'inner'
    | 'constant'
    | 'half'
    | 'calculation'

export type BachDerivativesRaceQuestion = RaceQuestion<BachDerivativesRaceError> & { meta: Record<string, number> }

const same = (latex: string): LocalizedText => sameText(`$${latex}$`)
const math = (latex: string) => `$${latex}$`
const signed = (value: number) => (value === 0 ? '' : value < 0 ? `-${-value}` : `+${value}`)
const paren = (value: number) => (value < 0 ? `(${value})` : String(value))
/** c·x² + b·x */
const term = (coefficient: number, letter: string, first = false) => {
    if (coefficient === 0) return ''
    const sign = coefficient < 0 ? '-' : first ? '' : '+'
    const size = Math.abs(coefficient) === 1 ? '' : String(Math.abs(coefficient))
    return `${sign}${size}${letter}`
}

interface Candidate {
    value: FractionValue
    error: BachDerivativesRaceError
}
const whole = (value: number, error: BachDerivativesRaceError): Candidate => ({ value: fraction(Math.round(value) + 0), error })
const ratio = (p: number, q: number, error: BachDerivativesRaceError): Candidate => ({ value: fraction(p, q), error })
const nearby = (value: number): Candidate[] => [value + 1, value - 1, value + 2, value * 2].map((item) => ({ value: fraction(Math.round(item * 10000), 10000), error: 'calculation' as const }))

/** The right option and three different mistakes */
function options(random: Random, right: FractionValue, candidates: Candidate[]): RaceOption<BachDerivativesRaceError>[] | null {
    const rightLatex = written(right)
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: BachDerivativesRaceError }> = []
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

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<BachDerivativesRaceError>[], answer: FractionValue, solution: LocalizedText, meta: Record<string, number>): BachDerivativesRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution, meta }
}

/** «If f(x) = …, work out f′(a)» */
const at = (formula: string, a: number) => say(`${math(`f(x)=${formula}`)} bada, kalkulatu ${math(`f'(${a})`)}.`, `Si ${math(`f(x)=${formula}`)}, calcula ${math(`f'(${a})`)}.`, `إذا كانت ${math(`f(x)=${formula}`)} فاحسب ${math(`f'(${a})`)}.`, `If ${math(`f(x)=${formula}`)}, work out ${math(`f'(${a})`)}.`)
const piecewise = (top: string, bottom: string, t: number) => `f(x)=\\begin{cases}${top} & x<${t}\\\\ ${bottom} & x\\ge ${t}\\end{cases}`

/* ---------- Circuit 0: the rate of change ---------- */

/** The average rate of x² + bx on [p, q]: q + p + b */
function rateQuestion(random: Random): BachDerivativesRaceQuestion | null {
    const b = randomInt(random, -4, 4)
    const p = randomInt(random, -2, 2)
    const q = p + randomInt(random, 2, 4)
    const f = (x: number) => x * x + b * x
    const answer = fraction(q + p + b)
    const choices = options(random, answer, [whole(f(q) - f(p), 'no-divide'), whole(-(q + p + b), 'sign'), whole(f(q) + f(p), 'calculation')])
    return choices && build(0, 'tvm', say(`Kalkulatu ${math(`f(x)=x^2${term(b, 'x')}`)} funtzioaren T.V.M. ${math(`[${p},\\,${q}]`)} tartean.`, `Halla la T.V.M. de ${math(`f(x)=x^2${term(b, 'x')}`)} en ${math(`[${p},\\,${q}]`)}.`, `أوجد معدل التغير المتوسط لـ ${math(`f(x)=x^2${term(b, 'x')}`)} في ${math(`[${p},\\,${q}]`)}.`, `Find the average rate of ${math(`f(x)=x^2${term(b, 'x')}`)} on ${math(`[${p},\\,${q}]`)}.`), choices, answer, same(`\\frac{${f(q)}-${paren(f(p))}}{${q}-${paren(p)}}=${q + p + b}`), { b, p, q })
}

/** f′(a) of c·x² + b·x: 2ca + b */
function pointQuestion(random: Random): BachDerivativesRaceQuestion | null {
    const c = pick(random, [-3, -2, 2, 3, 4])
    const b = randomInt(random, -5, 5)
    const a = randomInt(random, -3, 3)
    if (a === 0) return null
    const answer = fraction(2 * c * a + b)
    const choices = options(random, answer, [whole(c * a * a + b * a, 'value'), whole(c * a + b, 'exponent'), whole(-(2 * c * a + b), 'sign')])
    return choices && build(0, 'point', at(`${term(c, 'x^2', true)}${term(b, 'x')}`, a), choices, answer, same(`f'(x)=${2 * c}x${signed(b)}\\ \\to\\ f'(${a})=${2 * c * a + b}`), { c, b, a })
}

/** The n of the tangent to x² + c at a: c − a² */
function tangentQuestion(random: Random): BachDerivativesRaceQuestion | null {
    const c = randomInt(random, -4, 4)
    const a = pick(random, [-3, -2, -1, 1, 2, 3])
    const answer = fraction(c - a * a)
    const choices = options(random, answer, [whole(a * a + c, 'value'), whole(2 * a, 'slope'), whole(c + a * a - 2 * a * a, 'calculation')])
    return choices && build(0, 'tangent-n', say(`${math(`f(x)=x^2${signed(c)}`)} funtzioaren zuzen ukitzailea ${math(`x=${a}`)} puntuan ${math(`y=mx+n`)} da. Kalkulatu ${math('n')}.`, `La tangente a ${math(`f(x)=x^2${signed(c)}`)} en ${math(`x=${a}`)} es ${math('y=mx+n')}. Halla ${math('n')}.`, `مماس ${math(`f(x)=x^2${signed(c)}`)} عند ${math(`x=${a}`)} هو ${math('y=mx+n')}. أوجد ${math('n')}.`, `The tangent to ${math(`f(x)=x^2${signed(c)}`)} at ${math(`x=${a}`)} is ${math('y=mx+n')}. Find ${math('n')}.`), choices, answer, same(`y-${paren(a * a + c)}=${2 * a}(x-${paren(a)})\\ \\to\\ n=${c - a * a}`), { c, a })
}

/* ---------- Circuit 1: differentiability ---------- */

/** f′(t⁻) of a piecewise function with x² + p on the left: 2t */
function sideQuestion(random: Random): BachDerivativesRaceQuestion | null {
    const t = pick(random, [-2, -1, 1, 2, 3])
    const p = randomInt(random, -3, 3)
    const m = randomInt(random, -3, 4)
    const q = randomInt(random, -3, 3)
    if (m === 2 * t) return null
    const answer = fraction(2 * t)
    const choices = options(random, answer, [whole(m, 'side'), whole(t * t + p, 'value'), whole(t, 'exponent')])
    const formula = piecewise(`x^2${signed(p)}`, `${term(m, 'x', true) || '0'}${m === 0 ? '' : signed(q)}`, t)
    return choices && build(1, 'one-sided', say(`Kalkulatu ${math(`f'(${t}^-)`)} funtzio honetan: ${math(formula)}`, `Calcula ${math(`f'(${t}^-)`)} para esta función: ${math(formula)}`, `احسب ${math(`f'(${t}^-)`)} لهذه الدالة: ${math(formula)}`, `Work out ${math(`f'(${t}^-)`)} for this function: ${math(formula)}`), choices, answer, same(`(x^2)'=2x\\ \\to\\ 2\\cdot ${paren(t)}=${2 * t}`), { t })
}

/** The k that joins x² (left) and mx + k (right) at t: t² − mt */
function joinQuestion(random: Random): BachDerivativesRaceQuestion | null {
    const t = pick(random, [-2, -1, 1, 2, 3])
    const m = pick(random, [-3, -2, -1, 1, 2, 3])
    const k = t * t - m * t
    const answer = fraction(k)
    const choices = options(random, answer, [whole(-k, 'sign'), whole(t * t, 'value'), whole(2 * t - m, 'slope')])
    const formula = piecewise('x^2', `${term(m, 'x', true)}+k`, t)
    return choices && build(1, 'join-k', say(`Aurkitu ${math('k')}, funtzio hau ${math(`x=${t}`)} puntuan jarraitua izan dadin: ${math(formula)}`, `Halla ${math('k')} para que esta función sea continua en ${math(`x=${t}`)}: ${math(formula)}`, `أوجد ${math('k')} كي تكون هذه الدالة متصلة عند ${math(`x=${t}`)}: ${math(formula)}`, `Find ${math('k')} so that this function is continuous at ${math(`x=${t}`)}: ${math(formula)}`), choices, answer, same(`${t * t}=${m}\\cdot ${paren(t)}+k\\ \\to\\ k=${k}`), { t, m })
}

/** The m that makes x² + p (left) and mx + n (right) join smoothly at t: 2t */
function smoothQuestion(random: Random): BachDerivativesRaceQuestion | null {
    const t = pick(random, [-3, -2, -1, 1, 2, 3])
    const p = randomInt(random, -3, 3)
    const answer = fraction(2 * t)
    const choices = options(random, answer, [whole(t * t + p, 'value'), whole(t, 'exponent'), whole(-2 * t, 'sign')])
    const formula = piecewise(`x^2${signed(p)}`, 'mx+n', t)
    return choices && build(1, 'smooth-m', say(`Zer ${math('m')} behar da funtzio hau ${math(`x=${t}`)} puntuan deribagarria izateko? ${math(formula)}`, `¿Qué ${math('m')} hace falta para que esta función sea derivable en ${math(`x=${t}`)}? ${math(formula)}`, `ما قيمة ${math('m')} اللازمة كي تكون هذه الدالة قابلة للاشتقاق عند ${math(`x=${t}`)}؟ ${math(formula)}`, `Which ${math('m')} makes this function differentiable at ${math(`x=${t}`)}? ${math(formula)}`), choices, answer, same(`m=2\\cdot ${paren(t)}=${2 * t}`), { t })
}

/* ---------- Circuit 2: the derivative function ---------- */

/** f′(a) of xⁿ: n·aⁿ⁻¹ */
function powerQuestion(random: Random): BachDerivativesRaceQuestion | null {
    const n = randomInt(random, 3, 5)
    const a = pick(random, [-2, -1, 2])
    const answer = fraction(n * a ** (n - 1))
    const choices = options(random, answer, [whole(a ** n, 'value'), whole(n * a ** n, 'exponent'), whole((n - 1) * a ** (n - 1), 'calculation')])
    return choices && build(2, 'power', at(`x^${n}`, a), choices, answer, same(`f'(x)=${n}x^{${n - 1}}\\ \\to\\ ${n}\\cdot ${paren(a)}^{${n - 1}}=${n * a ** (n - 1)}`), { n, a })
}

/** f′(c²) of √x: 1/(2c) */
function rootQuestion(random: Random): BachDerivativesRaceQuestion | null {
    const c = randomInt(random, 1, 5)
    const k = pick(random, [1, 2, 4, 6])
    const answer = fraction(k, 2 * c)
    const choices = options(random, answer, [whole(k * c, 'value'), ratio(k, c, 'half'), ratio(k * c, 2, 'exponent')])
    const formula = k === 1 ? '\\sqrt{x}' : `${k}\\sqrt{x}`
    return choices && build(2, 'root', at(formula, c * c), choices, answer, same(`f'(x)=\\frac{${k}}{2\\sqrt{x}}\\ \\to\\ \\frac{${k}}{2\\cdot ${c}}`), { c, k })
}

/** f′(1) of ax³ + bx² + cx + d: 3a + 2b + c */
function polynomialQuestion(random: Random): BachDerivativesRaceQuestion | null {
    const a = pick(random, [-2, -1, 1, 2, 3])
    const b = randomInt(random, -3, 3)
    const c = randomInt(random, -5, 5)
    const d = pick(random, [-6, -4, 3, 5, 7])
    const answer = fraction(3 * a + 2 * b + c)
    const choices = options(random, answer, [whole(3 * a + 2 * b + c + d, 'constant'), whole(a + b + c + d, 'value'), whole(a + b + c, 'exponent')])
    return choices && build(2, 'polynomial', at(`${term(a, 'x^3', true)}${term(b, 'x^2')}${term(c, 'x')}${signed(d)}`, 1), choices, answer, same(`f'(1)=${3 * a}${signed(2 * b)}${signed(c)}=${3 * a + 2 * b + c}`), { a, b, c, d })
}

/* ---------- Circuit 3: the rules ---------- */

/** f′(a) of (x + p)(x + q): 2a + p + q */
function productQuestion(random: Random): BachDerivativesRaceQuestion | null {
    const p = randomInt(random, -4, 4)
    const q = randomInt(random, -4, 4)
    const a = randomInt(random, -2, 3)
    if (p === 0 || q === 0 || p === q) return null
    const answer = fraction(2 * a + p + q)
    const choices = options(random, answer, [whole(1, 'product'), whole((a + p) * (a + q), 'value'), whole(a + p + q, 'calculation')])
    return choices && build(3, 'product', at(`(x${signed(p)})(x${signed(q)})`, a), choices, answer, same(`f'(${a})=(${a}${signed(q)})+(${a}${signed(p)})=${2 * a + p + q}`), { p, q, a })
}

/** f′(a) of (x + p)/(x + q): (q − p)/(a + q)² */
function quotientQuestion(random: Random): BachDerivativesRaceQuestion | null {
    const p = randomInt(random, -4, 4)
    const q = randomInt(random, -3, 3)
    const a = randomInt(random, -1, 2)
    if (p === q || a + q === 0 || Math.abs(a + q) > 3) return null
    const answer = fraction(q - p, (a + q) ** 2)
    const choices = options(random, answer, [ratio(p - q, (a + q) ** 2, 'order'), whole(1, 'quotient'), ratio(q - p, a + q, 'calculation')])
    return choices && build(3, 'quotient', at(`\\frac{x${signed(p)}}{x${signed(q)}}`, a), choices, answer, same(`f'(x)=\\frac{${q - p}}{(x${signed(q)})^2}\\ \\to\\ \\frac{${q - p}}{${(a + q) ** 2}}`), { p, q, a })
}

/** f′(0) of (kx + c)ⁿ: n·k·cⁿ⁻¹ */
function chainQuestion(random: Random): BachDerivativesRaceQuestion | null {
    const k = randomInt(random, 2, 4)
    const c = pick(random, [-2, -1, 1, 2])
    const n = randomInt(random, 2, 4)
    const answer = fraction(n * k * c ** (n - 1))
    const choices = options(random, answer, [whole(n * c ** (n - 1), 'inner'), whole(c ** n, 'value'), whole(n * k * c ** n, 'exponent')])
    return choices && build(3, 'chain', at(`(${k}x${signed(c)})^${n}`, 0), choices, answer, same(`f'(0)=${n}\\cdot ${paren(c)}^{${n - 1}}\\cdot ${k}=${n * k * c ** (n - 1)}`), { k, c, n })
}

/* ---------- Circuit 4: the elementary functions ---------- */

/** f′(0) of e^{kx} + mx: k + m */
function expQuestion(random: Random): BachDerivativesRaceQuestion | null {
    const k = pick(random, [-3, -2, 2, 3, 4])
    const m = randomInt(random, -3, 3)
    const answer = fraction(k + m)
    const choices = options(random, answer, [whole(1 + m, 'inner'), whole(1, 'value'), whole(k, 'constant')])
    return choices && build(4, 'exp', at(`e^{${k}x}${term(m, 'x')}`, 0), choices, answer, same(`f'(x)=${k}e^{${k}x}${signed(m)}\\ \\to\\ f'(0)=${k + m}`), { k, m })
}

/** f′(a) of ln(x² + c): 2a/(a² + c) */
function logQuestion(random: Random): BachDerivativesRaceQuestion | null {
    const c = randomInt(random, 1, 5)
    const a = pick(random, [-2, -1, 1, 2])
    const answer = fraction(2 * a, a * a + c)
    const choices = options(random, answer, [ratio(1, a * a + c, 'inner'), ratio(a, a * a + c, 'exponent'), ratio(-2 * a, a * a + c, 'sign')])
    return choices && build(4, 'log', at(`\\ln(x^2+${c})`, a), choices, answer, same(`f'(x)=\\frac{2x}{x^2+${c}}\\ \\to\\ \\frac{${2 * a}}{${a * a + c}}`), { c, a })
}

/** f′(0) of a·sin(kx) + b·cos x: a·k */
function trigQuestion(random: Random): BachDerivativesRaceQuestion | null {
    const a = pick(random, [-2, -1, 2, 3])
    const k = randomInt(random, 2, 4)
    const b = pick(random, [-3, -2, 2, 3])
    const answer = fraction(a * k)
    const choices = options(random, answer, [whole(a, 'inner'), whole(-a * k, 'sign'), whole(a * k + b, 'value')])
    return choices && build(4, 'trig', at(`${term(a, `\\sin(${k}x)`, true)}${term(b, '\\cos x')}`, 0), choices, answer, same(`f'(x)=${a * k}\\cos(${k}x)${term(-b, '\\sin x')}\\ \\to\\ f'(0)=${a * k}`), { a, k, b })
}

const circuitGenerators: Array<Array<(random: Random, tier: Tier) => BachDerivativesRaceQuestion | null>> = [
    [rateQuestion, pointQuestion, tangentQuestion],
    [sideQuestion, joinQuestion, smoothQuestion],
    [powerQuestion, rootQuestion, polynomialQuestion],
    [productQuestion, quotientQuestion, chainQuestion],
    [expQuestion, logQuestion, trigQuestion]
]

export function generateBachDerivativesRaceQuestion(random: Random, circuit: number, tier: Tier): BachDerivativesRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkBachDerivativesPitAnswer(question: RaceQuestion<BachDerivativesRaceError>, input: string): AnswerCheck {
    return checkAnswer(input, question.answer, question.answerForm)
}

export function bachDerivativesParTime(circuit: number): number {
    return parTimeFor([13, 14, 13, 14, 14][circuit] ?? 13)
}

export const bachDerivativesRaceErrorTips: Record<BachDerivativesRaceError, LocalizedText> = {
    'no-divide': say('T.V.M.: zatitu x-ren aldaketaz.', 'T.V.M.: divide entre lo que cambia x.', 'معدل التغير المتوسط: اقسم على تغير x.', 'Average rate: divide by the change in x.'),
    value: say('Hori f(a) da, ez f′(a): lehenik deribatu.', 'Eso es f(a), no f′(a): primero deriva.', 'هذه f(a) لا f′(a): اشتق أولًا.', 'That is f(a), not f′(a): differentiate first.'),
    exponent: say('(xⁿ)′ = n·xⁿ⁻¹: berretzailea jaitsi eta 1 kendu.', '(xⁿ)′ = n·xⁿ⁻¹: baja el exponente y réstale 1.', '(xⁿ)′ = n·xⁿ⁻¹: أنزل الأس واطرح منه 1.', '(xⁿ)′ = n·xⁿ⁻¹: bring the exponent down and subtract 1.'),
    slope: say('Hori malda da; n lortzeko, ordezkatu puntua zuzenean.', 'Esa es la pendiente; para n, sustituye el punto en la recta.', 'هذا هو الميل؛ ولإيجاد n عوّض النقطة في المستقيم.', 'That is the slope; for n, substitute the point in the line.'),
    side: say('Ezkerreko deribaturako, ezkerreko zatia.', 'Para la derivada por la izquierda, el trozo de la izquierda.', 'للمشتقة من اليسار الجزء الأيسر.', 'For the left derivative, the left piece.'),
    sign: say('Kontuz zeinuarekin.', 'Cuidado con el signo.', 'انتبه للإشارة.', 'Watch the sign.'),
    product: say('(f·g)′ ez da f′·g′: f′·g + f·g′.', '(f·g)′ no es f′·g′: f′·g + f·g′.', '(f·g)′ ليست f′·g′: بل f′·g + f·g′.', '(f·g)′ is not f′·g′: it is f′·g + f·g′.'),
    order: say('Zatiduran, lehenik goikoaren deribatua: f′·g − f·g′.', 'En el cociente, primero la derivada de arriba: f′·g − f·g′.', 'في خارج القسمة مشتقة البسط أولًا: f′·g − f·g′.', 'In the quotient, the derivative of the top first: f′·g − f·g′.'),
    quotient: say('Deribatuak ez dira zatitzen: (f′·g − f·g′)/g².', 'Las derivadas no se dividen: (f′·g − f·g′)/g².', 'لا تُقسم المشتقات: (f′·g − f·g′)/g².', 'The derivatives are not divided: (f′·g − f·g′)/g².'),
    inner: say('Katea: biderkatu barrukoaren deribatuaz.', 'Cadena: multiplica por la derivada de dentro.', 'السلسلة: اضرب في مشتقة الداخلية.', 'Chain: multiply by the derivative of the inside.'),
    constant: say('Konstante baten deribatua 0 da.', 'La derivada de una constante es 0.', 'مشتقة الثابت 0.', 'The derivative of a constant is 0.'),
    half: say('(√x)′ = 1/(2√x): ez ahaztu 2.', '(√x)′ = 1/(2√x): no olvides el 2.', '(√x)′ = 1/(2√x): لا تنسَ 2.', '(√x)′ = 1/(2√x): do not forget the 2.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}
