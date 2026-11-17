import { checkAnswer, fraction, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { written } from '../../batx1-zientziak-errealak/games/race.ts'
import { same as sameText, say } from '../../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   Deribatuen lasterketa · Batxilergoa 2 · Gizarte Zientziak (Carrera de
   derivadas de 2.º Sociales): five circuits, one per stage — the rate of
   change (an average rate, a rate in context, the limit of b + h), the
   derivative at a point (by the definition, the slope at a point, the n
   of a tangent), the rules (a polynomial, a product, a quotient), the
   chain rule (a power, an exponential, a logarithm) and economy (f'',
   the next unit, the a of a smooth joint). The wrong options are the
   typical mistakes; every question carries `meta`.
   ========================================================================== */

export const BACH2G_DERIVATIVES_RACE_CIRCUITS = 5

export type Bach2gDerivativesRaceError = 'divide' | 'value' | 'h' | 'slope' | 'product' | 'quotient' | 'inside' | 'average' | 'condition' | 'calculation'

export type Bach2gDerivativesRaceQuestion = RaceQuestion<Bach2gDerivativesRaceError> & { meta: Record<string, number> }

const same = (latex: string): LocalizedText => sameText(`$${latex}$`)
const math = (latex: string) => `$${latex}$`
const signed = (value: number) => (value < 0 ? `-${-value}` : `+${value}`)

interface Candidate {
    value: FractionValue
    error: Bach2gDerivativesRaceError
}
const whole = (value: number, error: Bach2gDerivativesRaceError): Candidate => ({ value: fraction(Math.round(value) + 0), error })
const ratio = (p: number, q: number, error: Bach2gDerivativesRaceError): Candidate => ({ value: fraction(p, q), error })
const nearby = (value: number): Candidate[] => [value + 1, value - 1, value + 2, value * 2].map((item) => ({ value: fraction(Math.round(item * 1000), 1000), error: 'calculation' as const }))

function options(random: Random, right: FractionValue, candidates: Candidate[]): RaceOption<Bach2gDerivativesRaceError>[] | null {
    const rightLatex = written(right)
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: Bach2gDerivativesRaceError }> = []
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

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<Bach2gDerivativesRaceError>[], answer: FractionValue, solution: LocalizedText, meta: Record<string, number>): Bach2gDerivativesRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution, meta }
}

const derivAt = (formula: string, a: number) => say(`${math(`f(x)=${formula}`)}. Kalkulatu ${math(`f'(${a})`)}.`, `${math(`f(x)=${formula}`)}. Calcula ${math(`f'(${a})`)}.`, `${math(`f(x)=${formula}`)}. احسب ${math(`f'(${a})`)}.`, `${math(`f(x)=${formula}`)}. Work out ${math(`f'(${a})`)}.`)

/* ---------- Circuit 0: the rate of change ---------- */

/** The average rate of x² on [a, b]: a + b */
function rateQuestion(random: Random): Bach2gDerivativesRaceQuestion | null {
    const a = randomInt(random, 0, 4)
    const b = a + randomInt(random, 1, 4)
    const answer = fraction(a + b)
    const choices = options(random, answer, [whole(b * b - a * a, 'divide'), whole(b * b, 'calculation'), whole(2 * b, 'calculation')])
    return choices && build(0, 'rate', say(`Zein da ${math('x^2')} funtzioaren T.V.M. ${math(`[${a},${b}]`)} tartean?`, `¿Cuál es la T.V.M. de ${math('x^2')} en ${math(`[${a},${b}]`)}?`, `ما معدل التغير المتوسط للدالة ${math('x^2')} في ${math(`[${a},${b}]`)}؟`, `What is the average rate of ${math('x^2')} on ${math(`[${a},${b}]`)}?`), choices, answer, same(`\\frac{${b * b}-${a * a}}{${b - a}}=${a + b}`), { a, b })
}

/** Sales V(t) = p t + q t² on [0, n]: p + q n */
function salesQuestion(random: Random): Bach2gDerivativesRaceQuestion | null {
    const p = randomInt(random, 2, 9)
    const q = randomInt(random, 1, 3)
    const m = randomInt(random, 2, 5)
    const answer = fraction(p + q * m)
    const choices = options(random, answer, [whole(p * m + q * m * m, 'divide'), whole(p, 'calculation'), whole(p + 2 * q * m, 'calculation')])
    return choices && build(0, 'sales', say(`Salmentak ${math(`V(t)=${p}t+${q === 1 ? '' : q}t^2`)} dira. T.V.M. ${math(`[0,${m}]`)} tartean?`, `Ventas ${math(`V(t)=${p}t+${q === 1 ? '' : q}t^2`)}. ¿T.V.M. en ${math(`[0,${m}]`)}?`, `المبيعات ${math(`V(t)=${p}t+${q === 1 ? '' : q}t^2`)}. معدل التغير المتوسط في ${math(`[0,${m}]`)}؟`, `Sales ${math(`V(t)=${p}t+${q === 1 ? '' : q}t^2`)}. Average rate on ${math(`[0,${m}]`)}?`), choices, answer, same(`\\frac{${p * m + q * m * m}}{${m}}=${p + q * m}`), { p, q, m })
}

/** The average rate is b + h: the limit is b */
function limitQuestion(random: Random): Bach2gDerivativesRaceQuestion | null {
    const b = randomInt(random, 2, 12)
    const c = randomInt(random, 1, 3)
    const answer = fraction(b)
    const choices = options(random, answer, [whole(b + c, 'h'), whole(c, 'h'), whole(0, 'calculation')])
    return choices && build(0, 'limit', say(`${math(`[2,2+h]`)} tarteko T.V.M. ${math(`${b}+${c === 1 ? '' : c}h`)} da. Zein da tasa unekoa?`, `La T.V.M. en ${math(`[2,2+h]`)} es ${math(`${b}+${c === 1 ? '' : c}h`)}. ¿Cuál es la tasa instantánea?`, `معدل التغير المتوسط في ${math(`[2,2+h]`)} هو ${math(`${b}+${c === 1 ? '' : c}h`)}. ما المعدل اللحظي؟`, `The average rate on ${math(`[2,2+h]`)} is ${math(`${b}+${c === 1 ? '' : c}h`)}. What is the instantaneous rate?`), choices, answer, same(`\\lim_{h\\to 0}(${b}+${c === 1 ? '' : c}h)=${b}`), { b, c })
}

/* ---------- Circuit 1: the derivative at a point ---------- */

/** x² + b x at a: 2a + b */
function pointQuestion(random: Random): Bach2gDerivativesRaceQuestion | null {
    const a = randomInt(random, 1, 5)
    const b = randomInt(random, -4, 6)
    if (b === 0) return null
    const answer = fraction(2 * a + b)
    const choices = options(random, answer, [whole(a * a + b * a, 'value'), whole(2 * a, 'calculation'), whole(a + b, 'calculation')])
    return choices && build(1, 'point', derivAt(`x^2${signed(b)}x`, a), choices, answer, same(`f'(x)=2x${signed(b)}\\ \\to\\ ${2 * a + b}`), { a, b })
}

/** The slope of x³ − k x at a: 3a² − k */
function slopeQuestion(random: Random): Bach2gDerivativesRaceQuestion | null {
    const a = randomInt(random, 1, 3)
    const k = randomInt(random, 1, 9)
    const answer = fraction(3 * a * a - k)
    const choices = options(random, answer, [whole(a ** 3 - k * a, 'value'), whole(3 * a - k, 'calculation'), whole(3 * a * a, 'calculation')])
    return choices && build(1, 'slope', say(`Zein da ${math(`f(x)=x^3-${k}x`)} kurbaren zuzen ukitzailearen malda ${math(`x=${a}`)} puntuan?`, `¿Cuál es la pendiente de la tangente a ${math(`f(x)=x^3-${k}x`)} en ${math(`x=${a}`)}?`, `ما ميل مماس ${math(`f(x)=x^3-${k}x`)} عند ${math(`x=${a}`)}؟`, `What is the slope of the tangent to ${math(`f(x)=x^3-${k}x`)} at ${math(`x=${a}`)}?`), choices, answer, same(`f'(${a})=${3 * a * a}-${k}=${3 * a * a - k}`), { a, k })
}

/** The tangent to x² at a is y = 2a x − a²: n = −a² */
function tangentQuestion(random: Random): Bach2gDerivativesRaceQuestion | null {
    const a = randomInt(random, 1, 6)
    const answer = fraction(-a * a)
    const choices = options(random, answer, [whole(a * a, 'slope'), whole(2 * a, 'slope'), whole(-2 * a, 'calculation')])
    return choices && build(1, 'tangent', say(`${math('f(x)=x^2')} kurbaren zuzen ukitzailea ${math(`x=${a}`)} puntuan ${math('y=mx+n')} da. Zenbat da ${math('n')}?`, `La tangente a ${math('f(x)=x^2')} en ${math(`x=${a}`)} es ${math('y=mx+n')}. ¿Cuánto vale ${math('n')}?`, `مماس ${math('f(x)=x^2')} عند ${math(`x=${a}`)} هو ${math('y=mx+n')}. كم تساوي ${math('n')}؟`, `The tangent to ${math('f(x)=x^2')} at ${math(`x=${a}`)} is ${math('y=mx+n')}. What is ${math('n')}?`), choices, answer, same(`y=${2 * a}x-${a * a}`), { a })
}

/* ---------- Circuit 2: the rules ---------- */

/** p x³ + q x at a: 3p a² + q */
function polyQuestion(random: Random): Bach2gDerivativesRaceQuestion | null {
    const p = randomInt(random, 1, 4)
    const q = randomInt(random, -5, 5)
    const a = randomInt(random, 1, 2)
    if (q === 0) return null
    const answer = fraction(3 * p * a * a + q)
    const choices = options(random, answer, [whole(p * a ** 3 + q * a, 'value'), whole(3 * p * a + q, 'calculation'), whole(3 * p * a * a, 'calculation')])
    return choices && build(2, 'poly', derivAt(`${p === 1 ? '' : p}x^3${signed(q)}x`, a), choices, answer, same(`${3 * p}\\cdot ${a * a}${signed(q)}=${3 * p * a * a + q}`), { p, q, a })
}

/** x (x + c) by the product rule at a: 2a + c */
function productQuestion(random: Random): Bach2gDerivativesRaceQuestion | null {
    const c = randomInt(random, 1, 6)
    const a = randomInt(random, 1, 4)
    const answer = fraction(2 * a + c)
    const choices = options(random, answer, [whole(1, 'product'), whole(a + c, 'calculation'), whole(a * (a + c), 'value')])
    return choices && build(2, 'product', derivAt(`x(x+${c})`, a), choices, answer, same(`(x+${c})+x\\ \\to\\ ${a + c}+${a}=${2 * a + c}`), { c, a })
}

/** x/(x + c) at 0: 1/c */
function quotientQuestion(random: Random): Bach2gDerivativesRaceQuestion | null {
    const c = randomInt(random, 2, 9)
    const answer = fraction(1, c)
    const choices = options(random, answer, [ratio(-1, c, 'quotient'), whole(1, 'quotient'), ratio(1, c * c, 'calculation')])
    return choices && build(2, 'quotient', derivAt(`\\frac{x}{x+${c}}`, 0), choices, answer, same(`f'(x)=\\frac{${c}}{(x+${c})^2}\\ \\to\\ \\frac{${c}}{${c * c}}=\\frac{1}{${c}}`), { c })
}

/* ---------- Circuit 3: the chain rule ---------- */

/** (k x + 1)² at 0: 2k */
function chainQuestion(random: Random): Bach2gDerivativesRaceQuestion | null {
    const k = randomInt(random, 2, 9)
    const answer = fraction(2 * k)
    const choices = options(random, answer, [whole(2, 'inside'), whole(k, 'calculation'), whole(k * k, 'calculation')])
    return choices && build(3, 'chain', derivAt(`(${k}x+1)^2`, 0), choices, answer, same(`2(${k}x+1)\\cdot ${k}\\ \\to\\ ${2 * k}`), { k })
}

/** e^{k x} at 0: k */
function expQuestion(random: Random): Bach2gDerivativesRaceQuestion | null {
    const k = randomInt(random, 2, 9) * pick(random, [1, -1])
    const answer = fraction(k)
    const choices = options(random, answer, [whole(1, 'inside'), whole(0, 'calculation'), whole(-k, 'calculation')])
    return choices && build(3, 'exp', derivAt(`e^{${k}x}`, 0), choices, answer, same(`${k}e^{0}=${k}`), { k })
}

/** ln(x² + c) at a: 2a/(a² + c) */
function logQuestion(random: Random): Bach2gDerivativesRaceQuestion | null {
    const a = randomInt(random, 1, 3)
    const c = randomInt(random, 1, 7)
    const answer = fraction(2 * a, a * a + c)
    const choices = options(random, answer, [ratio(1, a * a + c, 'inside'), ratio(2 * a, 1, 'calculation'), ratio(a * a + c, 2 * a, 'calculation')])
    return choices && build(3, 'log', derivAt(`\\ln(x^2+${c})`, a), choices, answer, same(`\\frac{2x}{x^2+${c}}\\ \\to\\ \\frac{${2 * a}}{${a * a + c}}`), { a, c })
}

/* ---------- Circuit 4: economy ---------- */

/** x³ + q x² at a: 6a + 2q */
function secondQuestion(random: Random): Bach2gDerivativesRaceQuestion | null {
    const q = randomInt(random, -4, 4)
    const a = randomInt(random, 1, 3)
    if (q === 0) return null
    const answer = fraction(6 * a + 2 * q)
    const choices = options(random, answer, [whole(3 * a * a + 2 * q * a, 'calculation'), whole(6 * a, 'calculation'), whole(6 + 2 * q, 'calculation')])
    return choices && build(4, 'second', say(`${math(`f(x)=x^3${signed(q)}x^2`)}. Kalkulatu ${math(`f''(${a})`)}.`, `${math(`f(x)=x^3${signed(q)}x^2`)}. Calcula ${math(`f''(${a})`)}.`, `${math(`f(x)=x^3${signed(q)}x^2`)}. احسب ${math(`f''(${a})`)}.`, `${math(`f(x)=x^3${signed(q)}x^2`)}. Work out ${math(`f''(${a})`)}.`), choices, answer, same(`f''(x)=6x${signed(2 * q)}\\ \\to\\ ${6 * a + 2 * q}`), { q, a })
}

/** C = x² + b x + F: the next unit after x costs about 2x + b */
function nextQuestion(random: Random): Bach2gDerivativesRaceQuestion | null {
    const b = randomInt(random, 2, 20)
    const fixed = randomInt(random, 1, 9) * 100
    const x = pick(random, [10, 20, 50])
    const answer = fraction(2 * x + b)
    const choices = options(random, answer, [whole((x * x + b * x + fixed) / x, 'average'), whole(x * x + b * x + fixed, 'average'), whole(x + b, 'calculation')])
    return choices && build(4, 'next', say(`${math(`C(x)=x^2+${b}x+${fixed}`)} euro. Zenbat kostatzen da gutxi gorabehera ${x + 1}. unitatea?`, `${math(`C(x)=x^2+${b}x+${fixed}`)} euros. ¿Cuánto cuesta más o menos la unidad ${x + 1}?`, `${math(`C(x)=x^2+${b}x+${fixed}`)} يورو. كم تكلّف تقريبًا الوحدة ${x + 1}؟`, `${math(`C(x)=x^2+${b}x+${fixed}`)} euros. Roughly what does unit ${x + 1} cost?`), choices, answer, same(`C'(${x})=${2 * x}+${b}=${2 * x + b}`), { b, fixed, x })
}

/** x² up to p and a x + b after it, differentiable: a = 2p */
function smoothQuestion(random: Random): Bach2gDerivativesRaceQuestion | null {
    const p = randomInt(random, 1, 5)
    const answer = fraction(2 * p)
    const choices = options(random, answer, [whole(p, 'condition'), whole(p * p, 'condition'), whole(-p * p, 'calculation')])
    const formula = `f(x)=\\begin{cases}x^2 & x\\le ${p}\\\\ ax+b & x>${p}\\end{cases}`
    return choices && build(4, 'smooth', say(`Deribagarria da. Zenbat da ${math('a')}? ${math(formula)}`, `Es derivable. ¿Cuánto vale ${math('a')}? ${math(formula)}`, `الدالة قابلة للاشتقاق. كم تساوي ${math('a')}؟ ${math(formula)}`, `It is differentiable. What is ${math('a')}? ${math(formula)}`), choices, answer, same(`a=2\\cdot ${p}=${2 * p}`), { p })
}

const circuitGenerators: Array<Array<(random: Random, tier: Tier) => Bach2gDerivativesRaceQuestion | null>> = [
    [rateQuestion, salesQuestion, limitQuestion],
    [pointQuestion, slopeQuestion, tangentQuestion],
    [polyQuestion, productQuestion, quotientQuestion],
    [chainQuestion, expQuestion, logQuestion],
    [secondQuestion, nextQuestion, smoothQuestion]
]

export function generateBach2gDerivativesRaceQuestion(random: Random, circuit: number, tier: Tier): Bach2gDerivativesRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkBach2gDerivativesPitAnswer(question: RaceQuestion<Bach2gDerivativesRaceError>, input: string): AnswerCheck {
    return checkAnswer(input, question.answer, question.answerForm)
}

export function bach2gDerivativesParTime(circuit: number): number {
    return parTimeFor([12, 13, 14, 14, 14][circuit] ?? 13)
}

export const bach2gDerivativesRaceErrorTips: Record<Bach2gDerivativesRaceError, LocalizedText> = {
    divide: say('T.V.M.: zatitu tartearen luzeraz.', 'T.V.M.: divide entre la longitud del intervalo.', 'معدل التغير المتوسط: اقسم على طول الفترة.', 'Average rate: divide by the length of the interval.'),
    value: say("Hori $f(a)$ da; malda $f'(a)$ da.", "Eso es $f(a)$; la pendiente es $f'(a)$.", "هذه $f(a)$؛ والميل $f'(a)$.", "That is $f(a)$; the slope is $f'(a)$."),
    h: say('Limitean $h\\to 0$: $h$ gaiak desagertzen dira.', 'En el límite $h\\to 0$: los términos con $h$ desaparecen.', 'في النهاية $h\\to 0$: تختفي الحدود التي فيها $h$.', 'In the limit $h\\to 0$: the terms with $h$ vanish.'),
    slope: say('Zuzena: $y-f(a)=f\'(a)(x-a)$; $n$ jatorri-ordenatua da.', 'La recta: $y-f(a)=f\'(a)(x-a)$; $n$ es la ordenada en el origen.', 'المستقيم: $y-f(a)=f\'(a)(x-a)$؛ و$n$ هي الجزء المقطوع من محور الصادات.', 'The line: $y-f(a)=f\'(a)(x-a)$; $n$ is the y-intercept.'),
    product: say("$(uv)'=u'v+uv'$, ez $u'v'$.", "$(uv)'=u'v+uv'$, no $u'v'$.", "$(uv)'=u'v+uv'$ لا $u'v'$.", "$(uv)'=u'v+uv'$, not $u'v'$."),
    quotient: say('Zatidura: goikoaren deribatua lehenik kenketan.', 'Cociente: la derivada de arriba va primero en la resta.', 'خارج القسمة: مشتقة البسط أولًا في الطرح.', 'Quotient: the derivative of the top goes first in the subtraction.'),
    inside: say('Biderkatu barrukoaren deribatuaz.', 'Multiplica por la derivada de dentro.', 'اضرب في مشتقة الداخل.', 'Multiply by the derivative of the inside.'),
    average: say("Hurrengo unitatea $C'(x)$ da, ez batez bestekoa edo totala.", "La unidad siguiente es $C'(x)$, no el medio ni el total.", "الوحدة التالية هي $C'(x)$ لا المتوسط ولا الكلي.", "The next unit is $C'(x)$, not the average or the total."),
    condition: say('Deribagarria: malda bera lotunean, $a=f\'(p)$.', 'Derivable: la misma pendiente en la unión, $a=f\'(p)$.', 'قابلة للاشتقاق: الميل نفسه عند الالتقاء، $a=f\'(p)$.', 'Differentiable: the same slope at the joint, $a=f\'(p)$.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}
