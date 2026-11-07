import { checkAnswer, fraction, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { written } from '../../batx1-zientziak-errealak/games/race.ts'
import { same as sameText, say } from '../../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   Integralen lasterketa (Batxilergoa 1 · Zientziak): five circuits, one
   per stage — antiderivatives (the k through a point, the new exponent,
   the number in front), basic integrals (k with eˣ, F(e) with a/x, the
   shift of an arctangent), composite integrals (the number in front of a
   power, of e^(ax) and of a logarithm), the definite integral (Barrow with
   a line, with 3x², and splitting the interval) and areas (under a cap,
   between x² and px, a line that crosses the axis). Every answer is a
   number, and the wrong options are the typical mistakes. Every question
   carries `meta`, the numbers the tests check it against.
   ========================================================================== */

export const BACH_INTEGRALS_RACE_CIRCUITS = 5

export type BachIntegralsRaceError =
    | 'sign'
    | 'k-is-y'
    | 'derivative'
    | 'no-divide'
    | 'inverted'
    | 'forgot-k'
    | 'swap'
    | 'split'
    | 'half'
    | 'calculation'

export type BachIntegralsRaceQuestion = RaceQuestion<BachIntegralsRaceError> & { meta: Record<string, number> }

const same = (latex: string): LocalizedText => sameText(`$${latex}$`)
const math = (latex: string) => `$${latex}$`
const signed = (value: number) => (value === 0 ? '' : value < 0 ? `-${-value}` : `+${value}`)
const term = (coefficient: number, letter: string, first = false) => {
    if (coefficient === 0) return ''
    const sign = coefficient < 0 ? '-' : first ? '' : '+'
    const size = Math.abs(coefficient) === 1 ? '' : String(Math.abs(coefficient))
    return `${sign}${size}${letter}`
}

interface Candidate {
    value: FractionValue
    error: BachIntegralsRaceError
}
const whole = (value: number, error: BachIntegralsRaceError): Candidate => ({ value: fraction(Math.round(value) + 0), error })
const ratio = (p: number, q: number, error: BachIntegralsRaceError): Candidate => ({ value: fraction(p, q), error })
const nearby = (value: number): Candidate[] => [value + 1, value - 1, value + 2, value * 2].map((item) => ({ value: fraction(Math.round(item * 10000), 10000), error: 'calculation' as const }))

/** The right option and three different mistakes */
function options(random: Random, right: FractionValue, candidates: Candidate[]): RaceOption<BachIntegralsRaceError>[] | null {
    const rightLatex = written(right)
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: BachIntegralsRaceError }> = []
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

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<BachIntegralsRaceError>[], answer: FractionValue, solution: LocalizedText, meta: Record<string, number>): BachIntegralsRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution, meta }
}

/* ---------- Circuit 0: antiderivatives ---------- */

/** F(x) = x² + bx + k through (p, q): k = q − p² − bp */
function pointQuestion(random: Random): BachIntegralsRaceQuestion | null {
    const b = pick(random, [-4, -3, -2, -1, 1, 2, 3, 4])
    const p = pick(random, [-2, -1, 1, 2, 3])
    const q = randomInt(random, -5, 9)
    const k = q - p * p - b * p
    const answer = fraction(k)
    const choices = options(random, answer, [whole(q, 'k-is-y'), whole(q - (2 * p + b), 'derivative'), whole(-k, 'sign')])
    const f = `f(x)=2x${signed(b)}`
    return choices && build(0, 'point', say(`${math(f)} funtzioaren jatorrizkoak ${math(`F(x)=x^2${term(b, 'x')}+k`)} dira. Zein ${math('k')} behar da ${math(`(${p},\\,${q})`)} puntutik pasatzeko?`, `Las primitivas de ${math(f)} son ${math(`F(x)=x^2${term(b, 'x')}+k`)}. ¿Qué ${math('k')} hace falta para pasar por ${math(`(${p},\\,${q})`)}?`, `الدوال الأصلية لـ ${math(f)} هي ${math(`F(x)=x^2${term(b, 'x')}+k`)}. ما قيمة ${math('k')} اللازمة لتمر بالنقطة ${math(`(${p},\\,${q})`)}؟`, `The antiderivatives of ${math(f)} are ${math(`F(x)=x^2${term(b, 'x')}+k`)}. What ${math('k')} is needed to go through ${math(`(${p},\\,${q})`)}?`), choices, answer, same(`${p * p}${signed(b * p)}+k=${q}\\ \\to\\ k=${k}`), { b, p, q })
}

/** ∫ xⁿ dx = xᵐ/m + k: m = n + 1 */
function exponentQuestion(random: Random): BachIntegralsRaceQuestion | null {
    const n = pick(random, [2, 3, 4, 5, 6, 7, -2, -3, -4])
    const m = n + 1
    const answer = fraction(m)
    const choices = options(random, answer, [whole(n - 1, 'derivative'), whole(n, 'calculation'), whole(-m, 'sign')])
    return choices && build(0, 'exponent', say(`${math(`\\int x^{${n}}\\,dx=\\frac{x^m}{m}+k`)}. Aurkitu ${math('m')}.`, `${math(`\\int x^{${n}}\\,dx=\\frac{x^m}{m}+k`)}. Halla ${math('m')}.`, `${math(`\\int x^{${n}}\\,dx=\\frac{x^m}{m}+k`)}. أوجد ${math('m')}.`, `${math(`\\int x^{${n}}\\,dx=\\frac{x^m}{m}+k`)}. Find ${math('m')}.`), choices, answer, same(`m=${n}+1=${m}`), { n })
}

/** ∫ c·xⁿ dx = A·xⁿ⁺¹ + k: A = c/(n + 1) */
function coefficientQuestion(random: Random): BachIntegralsRaceQuestion | null {
    const n = pick(random, [1, 2, 3, 4, 5])
    const c = pick(random, [2, 3, 4, 6, 8, 10, 12])
    const answer = fraction(c, n + 1)
    const choices = options(random, answer, [whole(c, 'no-divide'), whole(c * (n + 1), 'inverted'), ratio(c, n, 'derivative')])
    const integral = `\\int ${c}x${n === 1 ? '' : `^${n}`}\\,dx=A\\,x^${n + 1}+k`
    return choices && build(0, 'coefficient', say(`${math(integral)}. Aurkitu ${math('A')}.`, `${math(integral)}. Halla ${math('A')}.`, `${math(integral)}. أوجد ${math('A')}.`, `${math(integral)}. Find ${math('A')}.`), choices, answer, same(`A=\\frac{${c}}{${n + 1}}`), { n, c })
}

/* ---------- Circuit 1: basic integrals ---------- */

/** F(x) = eˣ + k with F(0) = q: k = q − 1 */
function expQuestion(random: Random): BachIntegralsRaceQuestion | null {
    const q = pick(random, [-3, -1, 0, 2, 3, 4, 5, 7])
    const answer = fraction(q - 1)
    const choices = options(random, answer, [whole(q, 'k-is-y'), whole(q + 1, 'sign'), whole(1 - q, 'calculation')])
    return choices && build(1, 'exp', say(`${math('F(x)=e^x+k')} funtzioak ${math(`F(0)=${q}`)} betetzen du. Aurkitu ${math('k')}.`, `${math('F(x)=e^x+k')} cumple ${math(`F(0)=${q}`)}. Halla ${math('k')}.`, `${math('F(x)=e^x+k')} تحقق ${math(`F(0)=${q}`)}. أوجد ${math('k')}.`, `${math('F(x)=e^x+k')} satisfies ${math(`F(0)=${q}`)}. Find ${math('k')}.`), choices, answer, same(`e^0+k=1+k=${q}\\ \\to\\ k=${q - 1}`), { q })
}

/** F is an antiderivative of a/x (x > 0) with F(1) = q: F(e) = a + q */
function logQuestion(random: Random): BachIntegralsRaceQuestion | null {
    const a = pick(random, [2, 3, 4, 5, -2, -3])
    const q = pick(random, [1, 2, 4, 6, -1])
    const answer = fraction(a + q)
    const choices = options(random, answer, [whole(q, 'forgot-k'), whole(a, 'forgot-k'), whole(q - a, 'sign')])
    const f = `f(x)=\\frac{${a}}{x}`
    return choices && build(1, 'log', say(`${math('F')} funtzioa ${math(f)} funtzioaren jatorrizkoa da ${math('x>0')} denean, eta ${math(`F(1)=${q}`)}. Kalkulatu ${math('F(e)')}.`, `${math('F')} es una primitiva de ${math(f)} para ${math('x>0')}, con ${math(`F(1)=${q}`)}. Calcula ${math('F(e)')}.`, `${math('F')} دالة أصلية لـ ${math(f)} عندما ${math('x>0')} مع ${math(`F(1)=${q}`)}. احسب ${math('F(e)')}.`, `${math('F')} is an antiderivative of ${math(f)} for ${math('x>0')}, with ${math(`F(1)=${q}`)}. Work out ${math('F(e)')}.`), choices, answer, same(`F(x)=${a}\\ln x${signed(q)}\\ \\to\\ F(e)=${a + q}`), { a, q })
}

/** 1/(x² + 2px + p² + 1) = 1/((x + p)² + 1): the arctangent of x + p */
function arctanQuestion(random: Random): BachIntegralsRaceQuestion | null {
    const p = pick(random, [-4, -3, -2, -1, 1, 2, 3, 4])
    const answer = fraction(p)
    const choices = options(random, answer, [whole(2 * p, 'calculation'), whole(-p, 'sign'), whole(p * p + 1, 'calculation')])
    const integral = `\\int\\frac{dx}{x^2${term(2 * p, 'x')}+${p * p + 1}}=\\arctan(x+P)+k`
    return choices && build(1, 'arctan', say(`${math(integral)}. Aurkitu ${math('P')}.`, `${math(integral)}. Halla ${math('P')}.`, `${math(integral)}. أوجد ${math('P')}.`, `${math(integral)}. Find ${math('P')}.`), choices, answer, same(`x^2${term(2 * p, 'x')}+${p * p + 1}=(x${signed(p)})^2+1`), { p })
}

/* ---------- Circuit 2: composite integrals ---------- */

/** ∫ x(x² + b)ⁿ dx = A(x² + b)ⁿ⁺¹ + k: A = 1/(2(n + 1)) */
function chainQuestion(random: Random): BachIntegralsRaceQuestion | null {
    const b = pick(random, [-3, -1, 1, 2, 5])
    const n = pick(random, [2, 3, 4, 5])
    const answer = fraction(1, 2 * (n + 1))
    const choices = options(random, answer, [ratio(1, n + 1, 'no-divide'), ratio(2, n + 1, 'inverted'), ratio(1, 2 * n, 'calculation')])
    const integral = `\\int x(x^2${signed(b)})^${n}\\,dx=A(x^2${signed(b)})^${n + 1}+k`
    return choices && build(2, 'chain', say(`${math(integral)}. Aurkitu ${math('A')}.`, `${math(integral)}. Halla ${math('A')}.`, `${math(integral)}. أوجد ${math('A')}.`, `${math(integral)}. Find ${math('A')}.`), choices, answer, same(`A=\\frac{1}{2}\\cdot\\frac{1}{${n + 1}}=\\frac{1}{${2 * (n + 1)}}`), { b, n })
}

/** ∫ e^(ax) dx = A·e^(ax) + k: A = 1/a */
function expChainQuestion(random: Random): BachIntegralsRaceQuestion | null {
    const a = pick(random, [2, 3, 4, 5, 6, -2, -3, -4])
    const answer = fraction(1, a)
    const choices = options(random, answer, [whole(a, 'inverted'), whole(1, 'no-divide'), ratio(-1, a, 'sign')])
    const integral = `\\int e^{${a}x}\\,dx=A\\,e^{${a}x}+k`
    return choices && build(2, 'exp-chain', say(`${math(integral)}. Aurkitu ${math('A')}.`, `${math(integral)}. Halla ${math('A')}.`, `${math(integral)}. أوجد ${math('A')}.`, `${math(integral)}. Find ${math('A')}.`), choices, answer, same(`u'=${a}\\ \\to\\ A=\\frac{1}{${a}}`), { a })
}

/** ∫ cx/(x² + b) dx = A·ln(x² + b) + k: A = c/2 */
function logChainQuestion(random: Random): BachIntegralsRaceQuestion | null {
    const c = pick(random, [1, 3, 4, 5, 6, 8])
    const b = pick(random, [1, 2, 3, 4, 9])
    const answer = fraction(c, 2)
    const choices = options(random, answer, [whole(c, 'no-divide'), whole(2 * c, 'inverted'), ratio(1, 2, 'calculation')])
    const integral = `\\int\\frac{${c === 1 ? '' : c}x}{x^2+${b}}\\,dx=A\\ln(x^2+${b})+k`
    return choices && build(2, 'log-chain', say(`${math(integral)}. Aurkitu ${math('A')}.`, `${math(integral)}. Halla ${math('A')}.`, `${math(integral)}. أوجد ${math('A')}.`, `${math(integral)}. Find ${math('A')}.`), choices, answer, same(`u'=2x\\ \\to\\ A=\\frac{${c}}{2}`), { c, b })
}

/* ---------- Circuit 3: the definite integral ---------- */

/** ∫ₚ^q (2x + b) dx = (q² + bq) − (p² + bp) */
function lineIntegralQuestion(random: Random): BachIntegralsRaceQuestion | null {
    const b = pick(random, [-3, -2, -1, 1, 2, 3])
    const p = pick(random, [0, 1, 2])
    const q = p + pick(random, [1, 2, 3])
    const F = (x: number) => x * x + b * x
    const value = F(q) - F(p)
    if (value === 0) return null
    const answer = fraction(value)
    const choices = options(random, answer, [whole(-value, 'swap'), whole(F(q), 'forgot-k'), whole(F(q) + F(p), 'sign')])
    const integral = `\\int_{${p}}^{${q}}(2x${signed(b)})\\,dx`
    return choices && build(3, 'line-integral', say(`Kalkulatu ${math(integral)}.`, `Calcula ${math(integral)}.`, `احسب ${math(integral)}.`, `Work out ${math(integral)}.`), choices, answer, same(`F(${q})-F(${p})=${F(q)}${signed(-F(p))}=${value}`), { b, p, q })
}

/** ∫₀ᵖ 3x² dx = p³ */
function cubeQuestion(random: Random): BachIntegralsRaceQuestion | null {
    const p = pick(random, [1, 2, 3, 4])
    const answer = fraction(p ** 3)
    const choices = options(random, answer, [whole(3 * p ** 3, 'no-divide'), whole(6 * p, 'derivative'), whole(3 * p * p, 'calculation')])
    const integral = `\\int_0^{${p}}3x^2\\,dx`
    return choices && build(3, 'cube', say(`Kalkulatu ${math(integral)}.`, `Calcula ${math(integral)}.`, `احسب ${math(integral)}.`, `Work out ${math(integral)}.`), choices, answer, same(`\\left[x^3\\right]_0^{${p}}=${p ** 3}`), { p })
}

/** ∫ₐᶜ f = u and ∫꜀ᵇ f = v: ∫ᵦᵃ f = −(u + v) */
function splitQuestion(random: Random): BachIntegralsRaceQuestion | null {
    const u = pick(random, [-3, 2, 3, 4, 5, 7])
    const v = pick(random, [-2, 1, 2, 3, 6])
    if (u + v === 0) return null
    const answer = fraction(-(u + v))
    const choices = options(random, answer, [whole(u + v, 'swap'), whole(u - v, 'split'), whole(v - u, 'calculation')])
    const given = `\\int_1^4 f(x)\\,dx=${u}`
    const given2 = `\\int_4^6 f(x)\\,dx=${v}`
    const asked = '\\int_6^1 f(x)\\,dx'
    return choices && build(3, 'split', say(`${math(given)} eta ${math(given2)} badira, kalkulatu ${math(asked)}.`, `Si ${math(given)} y ${math(given2)}, calcula ${math(asked)}.`, `إذا كان ${math(given)} و${math(given2)} فاحسب ${math(asked)}.`, `If ${math(given)} and ${math(given2)}, work out ${math(asked)}.`), choices, answer, same(`-(${u}${signed(v)})=${-(u + v)}`), { u, v })
}

/* ---------- Circuit 4: areas ---------- */

/** The area under c² − x² between its crossings: 4c³/3 */
function capQuestion(random: Random): BachIntegralsRaceQuestion | null {
    const c = pick(random, [1, 2, 3])
    const answer = fraction(4 * c ** 3, 3)
    const choices = options(random, answer, [ratio(2 * c ** 3, 3, 'half'), whole(4 * c ** 3, 'no-divide'), ratio(-4 * c ** 3, 3, 'sign')])
    const f = `f(x)=${c * c}-x^2`
    return choices && build(4, 'cap', say(`Aurkitu ${math(f)} kurbaren eta X ardatzaren arteko azalera.`, `Halla el área entre ${math(f)} y el eje X.`, `أوجد المساحة بين ${math(f)} ومحور X.`, `Find the area between ${math(f)} and the x-axis.`), choices, answer, same(`\\left[${c * c}x-\\frac{x^3}{3}\\right]_{-${c}}^{${c}}=\\frac{${4 * c ** 3}}{3}`), { c })
}

/** The area between x² and px: p³/6 */
function betweenQuestion(random: Random): BachIntegralsRaceQuestion | null {
    const p = pick(random, [1, 2, 3, 4])
    const answer = fraction(p ** 3, 6)
    const choices = options(random, answer, [ratio(-(p ** 3), 6, 'sign'), ratio(p ** 3, 3, 'calculation'), ratio(p * p, 2, 'calculation')])
    const g = `y=${p === 1 ? '' : p}x`
    return choices && build(4, 'between', say(`Aurkitu ${math('y=x^2')} eta ${math(g)} kurben arteko azalera.`, `Halla el área entre ${math('y=x^2')} e ${math(g)}.`, `أوجد المساحة بين ${math('y=x^2')} و${math(g)}.`, `Find the area between ${math('y=x^2')} and ${math(g)}.`), choices, answer, same(`\\int_0^{${p}}(${p === 1 ? '' : p}x-x^2)\\,dx=\\frac{${p ** 3}}{6}`), { p })
}

/** The area between x − p and the axis on [0, 2p]: p² (the integral is 0) */
function crossQuestion(random: Random): BachIntegralsRaceQuestion | null {
    const p = pick(random, [1, 2, 3, 4])
    const answer = fraction(p * p)
    const choices = options(random, answer, [whole(0, 'split'), ratio(p * p, 2, 'half'), whole(2 * p * p, 'calculation')])
    const f = `f(x)=x-${p}`
    return choices && build(4, 'cross', say(`Aurkitu ${math(f)} zuzenaren eta X ardatzaren arteko azalera ${math(`[0,\\,${2 * p}]`)} tartean.`, `Halla el área entre ${math(f)} y el eje X en ${math(`[0,\\,${2 * p}]`)}.`, `أوجد المساحة بين ${math(f)} ومحور X في ${math(`[0,\\,${2 * p}]`)}.`, `Find the area between ${math(f)} and the x-axis on ${math(`[0,\\,${2 * p}]`)}.`), choices, answer, same(`\\frac{${p * p}}{2}+\\frac{${p * p}}{2}=${p * p}`), { p })
}

const circuitGenerators: Array<Array<(random: Random, tier: Tier) => BachIntegralsRaceQuestion | null>> = [
    [pointQuestion, exponentQuestion, coefficientQuestion],
    [expQuestion, logQuestion, arctanQuestion],
    [chainQuestion, expChainQuestion, logChainQuestion],
    [lineIntegralQuestion, cubeQuestion, splitQuestion],
    [capQuestion, betweenQuestion, crossQuestion]
]

export function generateBachIntegralsRaceQuestion(random: Random, circuit: number, tier: Tier): BachIntegralsRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkBachIntegralsPitAnswer(question: RaceQuestion<BachIntegralsRaceError>, input: string): AnswerCheck {
    return checkAnswer(input, question.answer, question.answerForm)
}

export function bachIntegralsParTime(circuit: number): number {
    return parTimeFor([12, 13, 13, 13, 13][circuit] ?? 13)
}

export const bachIntegralsRaceErrorTips: Record<BachIntegralsRaceError, LocalizedText> = {
    sign: say('Kontuz zeinuarekin.', 'Cuidado con el signo.', 'انتبه للإشارة.', 'Watch the sign.'),
    'k-is-y': say('k ez da puntuaren y: ordezkatu F(a) + k = b.', 'k no es la y del punto: sustituye F(a) + k = b.', 'k ليس y النقطة: عوّض F(a) + k = b.', 'k is not the y of the point: substitute F(a) + k = b.'),
    derivative: say('Hori deribatua da; hemen integrala behar da.', 'Eso es derivar; aquí hay que integrar.', 'هذا اشتقاق؛ وهنا نحتاج التكامل.', 'That is differentiating; here you must integrate.'),
    'no-divide': say('Zatitu behar da: berretzaile berriaz edo u′ deribatuaren zenbakiaz.', 'Hay que dividir: entre el exponente nuevo o entre el número de u′.', 'يجب القسمة: على الأس الجديد أو على عدد u′.', 'You must divide: by the new exponent or by the number of u′.'),
    inverted: say('Zenbakiaz zatitu, ez biderkatu.', 'Divide entre el número, no lo multipliques.', 'اقسم على العدد ولا تضرب فيه.', 'Divide by the number, do not multiply by it.'),
    'forgot-k': say('Ez ahaztu zati bat: konstantea edo beste gaia.', 'No olvides una parte: la constante o el otro término.', 'لا تنسَ جزءًا: الثابت أو الحد الآخر.', 'Do not forget a part: the constant or the other term.'),
    swap: say('Barrow: F(b) − F(a), goikoa ken behekoa.', 'Barrow: F(b) − F(a), el de arriba menos el de abajo.', 'بارو: F(b) − F(a)، الأعلى ناقص الأدنى.', 'Barrow: F(b) − F(a), the top one minus the bottom one.'),
    split: say('Tartean zatitzean integralak batu egiten dira; ardatzaren azpian zatiak kendu.', 'Al partir el intervalo las integrales se suman; bajo el eje las partes restan.', 'عند تقسيم الفترة تُجمع التكاملات؛ وتحت المحور تُطرح الأجزاء.', 'Splitting the interval adds the integrals; below the axis the parts subtract.'),
    half: say('Hori erdia baino ez da: hartu barruti osoa.', 'Eso es solo la mitad: toma todo el recinto.', 'هذا نصف فقط: خذ المنطقة كلها.', 'That is only half: take the whole region.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}
