import { checkAnswer, fraction, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { written } from '../../batx1-zientziak-errealak/games/race.ts'
import { same as sameText, say } from '../../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   Integralen lasterketa · Batxilergoa 2 · Gizarte Zientziak (Carrera de
   integrales de 2.º Sociales): five circuits, one per stage —
   antiderivatives (F(1) of a xⁿ, the coefficient of a primitive, the C
   through a point), compound (the k of a chain, the k of a logarithm,
   F(0) of e^{kx}), the definite integral (a line, a parabola, joining
   intervals), areas (under k x², with a change of sign, between a x and
   x²) and economy (a cost from C′, what piles up, a rise in income).
   Every question carries `meta`.
   ========================================================================== */

export const BACH2G_INTEGRALS_RACE_CIRCUITS = 5

export type Bach2gIntegralsRaceError = 'divide' | 'derivative' | 'constant' | 'order' | 'sign' | 'fixed' | 'calculation'

export type Bach2gIntegralsRaceQuestion = RaceQuestion<Bach2gIntegralsRaceError> & { meta: Record<string, number> }

const same = (latex: string): LocalizedText => sameText(`$${latex}$`)
const math = (latex: string) => `$${latex}$`

interface Candidate {
    value: FractionValue
    error: Bach2gIntegralsRaceError
}
const whole = (value: number, error: Bach2gIntegralsRaceError): Candidate => ({ value: fraction(Math.round(value) + 0), error })
const ratio = (p: number, q: number, error: Bach2gIntegralsRaceError): Candidate => ({ value: fraction(p, q), error })
const nearby = (value: number): Candidate[] => [value + 1, value - 1, value + 2, value * 2].map((item) => ({ value: fraction(Math.round(item * 1000), 1000), error: 'calculation' as const }))

function options(random: Random, right: FractionValue, candidates: Candidate[]): RaceOption<Bach2gIntegralsRaceError>[] | null {
    const rightLatex = written(right)
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: Bach2gIntegralsRaceError }> = []
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

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<Bach2gIntegralsRaceError>[], answer: FractionValue, solution: LocalizedText, meta: Record<string, number>): Bach2gIntegralsRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution, meta }
}

const workOut = (latex: string) => say(`Kalkulatu ${math(latex)}.`, `Calcula ${math(latex)}.`, `احسب ${math(latex)}.`, `Work out ${math(latex)}.`)

/* ---------- Circuit 0: antiderivatives ---------- */

function powerQuestion(random: Random): Bach2gIntegralsRaceQuestion | null {
    const n = randomInt(random, 1, 4)
    const a = randomInt(random, 1, 6) * (n + 1)
    const b = randomInt(random, 2, 3)
    const answer = fraction(a * b ** (n + 1), n + 1)
    const choices = options(random, answer, [whole(a * b ** (n + 1), 'divide'), whole(a * n * b ** (n - 1), 'derivative'), whole(a * b ** n, 'calculation')])
    return choices && build(0, 'power', say(`${math(`F'(x)=${a}x^{${n}}`)} eta ${math('F(0)=0')}. Kalkulatu ${math(`F(${b})`)}.`, `${math(`F'(x)=${a}x^{${n}}`)} y ${math('F(0)=0')}. Calcula ${math(`F(${b})`)}.`, `${math(`F'(x)=${a}x^{${n}}`)} و${math('F(0)=0')}. احسب ${math(`F(${b})`)}.`, `${math(`F'(x)=${a}x^{${n}}`)} and ${math('F(0)=0')}. Work out ${math(`F(${b})`)}.`), choices, answer, same(`F(x)=${a / (n + 1)}x^{${n + 1}}`), { a, n, b })
}

function coefficientQuestion(random: Random): Bach2gIntegralsRaceQuestion | null {
    const n = randomInt(random, 2, 5)
    const k = randomInt(random, 1, 5)
    const answer = fraction(k * (n + 1))
    const choices = options(random, answer, [whole(k, 'divide'), whole(k * n, 'calculation'), whole(k * (n + 1) * n, 'derivative')])
    return choices && build(0, 'coefficient', say(`${math(`\\int ax^{${n}}\\,dx=${k}x^{${n + 1}}+C`)}. Zenbat da ${math('a')}?`, `${math(`\\int ax^{${n}}\\,dx=${k}x^{${n + 1}}+C`)}. ¿Cuánto vale ${math('a')}?`, `${math(`\\int ax^{${n}}\\,dx=${k}x^{${n + 1}}+C`)}. كم تساوي ${math('a')}؟`, `${math(`\\int ax^{${n}}\\,dx=${k}x^{${n + 1}}+C`)}. What is ${math('a')}?`), choices, answer, same(`(${k}x^{${n + 1}})'=${k * (n + 1)}x^{${n}}`), { k, n })
}

function constantQuestion(random: Random): Bach2gIntegralsRaceQuestion | null {
    const a = randomInt(random, 1, 4)
    const v = randomInt(random, -3, 9)
    const answer = fraction(v - a)
    const choices = options(random, answer, [whole(v, 'constant'), whole(v + a, 'sign'), whole(v - 2 * a, 'calculation')])
    return choices && build(0, 'constant', say(`${math(`F'(x)=${2 * a}x`)} eta ${math(`F(1)=${v}`)}. Zenbat da ${math('C')}?`, `${math(`F'(x)=${2 * a}x`)} y ${math(`F(1)=${v}`)}. ¿Cuánto vale ${math('C')}?`, `${math(`F'(x)=${2 * a}x`)} و${math(`F(1)=${v}`)}. كم تساوي ${math('C')}؟`, `${math(`F'(x)=${2 * a}x`)} and ${math(`F(1)=${v}`)}. What is ${math('C')}?`), choices, answer, same(`${a}+C=${v}\\ \\to\\ C=${v - a}`), { a, v })
}

/* ---------- Circuit 1: compound ---------- */

function chainQuestion(random: Random): Bach2gIntegralsRaceQuestion | null {
    const n = randomInt(random, 2, 5)
    const c = randomInt(random, 1, 5)
    const answer = fraction(n + 1)
    const choices = options(random, answer, [whole(n, 'divide'), whole(2 * (n + 1), 'derivative'), whole(n - 1, 'calculation')])
    return choices && build(1, 'chain', say(`${math(`\\int 2x(x^2+${c})^{${n}}\\,dx=\\frac{(x^2+${c})^{${n + 1}}}{k}+C`)}. Zenbat da ${math('k')}?`, `${math(`\\int 2x(x^2+${c})^{${n}}\\,dx=\\frac{(x^2+${c})^{${n + 1}}}{k}+C`)}. ¿Cuánto vale ${math('k')}?`, `${math(`\\int 2x(x^2+${c})^{${n}}\\,dx=\\frac{(x^2+${c})^{${n + 1}}}{k}+C`)}. كم تساوي ${math('k')}؟`, `${math(`\\int 2x(x^2+${c})^{${n}}\\,dx=\\frac{(x^2+${c})^{${n + 1}}}{k}+C`)}. What is ${math('k')}?`), choices, answer, same(`k=${n + 1}`), { n, c })
}

function logQuestion(random: Random): Bach2gIntegralsRaceQuestion | null {
    const m = randomInt(random, 2, 8)
    const c = randomInt(random, 1, 9)
    const answer = fraction(m, 2)
    const choices = options(random, answer, [whole(m, 'divide'), ratio(2, m, 'calculation'), whole(2 * m, 'derivative')])
    return choices && build(1, 'log', say(`${math(`\\int\\frac{${m}x}{x^2+${c}}\\,dx=k\\ln(x^2+${c})+C`)}. Zenbat da ${math('k')}?`, `${math(`\\int\\frac{${m}x}{x^2+${c}}\\,dx=k\\ln(x^2+${c})+C`)}. ¿Cuánto vale ${math('k')}?`, `${math(`\\int\\frac{${m}x}{x^2+${c}}\\,dx=k\\ln(x^2+${c})+C`)}. كم تساوي ${math('k')}؟`, `${math(`\\int\\frac{${m}x}{x^2+${c}}\\,dx=k\\ln(x^2+${c})+C`)}. What is ${math('k')}?`), choices, answer, same(`${m}x=\\frac{${m}}{2}\\cdot 2x`), { m, c })
}

function expQuestion(random: Random): Bach2gIntegralsRaceQuestion | null {
    const k = randomInt(random, 2, 6)
    const a = randomInt(random, 1, 9)
    const answer = fraction(a, k)
    const choices = options(random, answer, [whole(a, 'divide'), whole(a * k, 'derivative'), ratio(k, a, 'calculation')])
    return choices && build(1, 'exp', say(`${math(`F(x)=\\int ${a}e^{${k}x}\\,dx`)}, ${math('C=0')}. Zenbat da ${math('F(0)')}?`, `${math(`F(x)=\\int ${a}e^{${k}x}\\,dx`)}, con ${math('C=0')}. ¿Cuánto vale ${math('F(0)')}?`, `${math(`F(x)=\\int ${a}e^{${k}x}\\,dx`)} مع ${math('C=0')}. كم تساوي ${math('F(0)')}؟`, `${math(`F(x)=\\int ${a}e^{${k}x}\\,dx`)}, with ${math('C=0')}. What is ${math('F(0)')}?`), choices, answer, same(`F(x)=\\frac{${a}}{${k}}e^{${k}x}`), { a, k })
}

/* ---------- Circuit 2: the definite integral ---------- */

function lineQuestion(random: Random): Bach2gIntegralsRaceQuestion | null {
    const a = randomInt(random, 0, 3)
    const b = a + randomInt(random, 1, 4)
    const c = randomInt(random, 1, 5)
    const F = (x: number) => x * x + c * x
    const answer = fraction(F(b) - F(a))
    const choices = options(random, answer, [whole(F(a) - F(b), 'order'), whole(2 * b + c - (2 * a + c), 'derivative'), whole(F(b), 'calculation')])
    return choices && build(2, 'line', workOut(`\\int_{${a}}^{${b}}(2x+${c})\\,dx`), choices, answer, same(`${F(b)}-${F(a)}=${F(b) - F(a)}`), { a, b, c })
}

function parabolaQuestion(random: Random): Bach2gIntegralsRaceQuestion | null {
    const b = randomInt(random, 1, 4)
    const answer = fraction(b ** 3)
    const choices = options(random, answer, [whole(3 * b ** 3, 'divide'), whole(6 * b, 'derivative'), whole(-(b ** 3), 'order')])
    return choices && build(2, 'parabola', workOut(`\\int_0^{${b}}3x^2\\,dx`), choices, answer, same(`\\left[x^3\\right]_0^{${b}}=${b ** 3}`), { b })
}

function joinQuestion(random: Random): Bach2gIntegralsRaceQuestion | null {
    const p = randomInt(random, -4, 9)
    const q = randomInt(random, -4, 9)
    const answer = fraction(p + q)
    const choices = options(random, answer, [whole(p - q, 'sign'), whole(q - p, 'sign'), whole(p * q, 'calculation')])
    return choices && build(2, 'join', say(`${math(`\\int_0^3 f=${p}`)} eta ${math(`\\int_3^7 f=${q}`)}. Kalkulatu ${math('\\int_0^7 f')}.`, `${math(`\\int_0^3 f=${p}`)} y ${math(`\\int_3^7 f=${q}`)}. Calcula ${math('\\int_0^7 f')}.`, `${math(`\\int_0^3 f=${p}`)} و${math(`\\int_3^7 f=${q}`)}. احسب ${math('\\int_0^7 f')}.`, `${math(`\\int_0^3 f=${p}`)} and ${math(`\\int_3^7 f=${q}`)}. Work out ${math('\\int_0^7 f')}.`), choices, answer, same(`${p}+(${q})=${p + q}`), { p, q })
}

/* ---------- Circuit 3: areas ---------- */

function underQuestion(random: Random): Bach2gIntegralsRaceQuestion | null {
    const k = randomInt(random, 1, 4)
    const b = randomInt(random, 1, 3)
    const answer = fraction(k * b ** 3, 3)
    const choices = options(random, answer, [whole(k * b ** 3, 'divide'), whole(2 * k * b, 'derivative'), whole(k * b * b, 'calculation')])
    return choices && build(3, 'under', say(`Kalkulatu ${math(`y=${k === 1 ? '' : k}x^2`)} kurbaren azpiko azalera ${math(`[0,${b}]`)} tartean.`, `Calcula el área bajo ${math(`y=${k === 1 ? '' : k}x^2`)} en ${math(`[0,${b}]`)}.`, `احسب المساحة تحت ${math(`y=${k === 1 ? '' : k}x^2`)} على ${math(`[0,${b}]`)}.`, `Work out the area under ${math(`y=${k === 1 ? '' : k}x^2`)} on ${math(`[0,${b}]`)}.`), choices, answer, same(`\\frac{${k}\\cdot ${b ** 3}}{3}`), { k, b })
}

function crossQuestion(random: Random): Bach2gIntegralsRaceQuestion | null {
    const r = randomInt(random, 1, 3)
    const s = randomInt(random, 1, 3)
    // y = x on [−r, s]: area r²/2 + s²/2, integral s²/2 − r²/2
    const answer = fraction(r * r + s * s, 2)
    if (r === s) return null
    const choices = options(random, answer, [ratio(s * s - r * r, 2, 'sign'), ratio(r * r - s * s, 2, 'sign'), whole(r + s, 'calculation')])
    return choices && build(3, 'cross', say(`Kalkulatu ${math('y=x')} zuzenaren eta ${math('X')} ardatzaren arteko azalera ${math(`[-${r},${s}]`)} tartean.`, `Calcula el área entre ${math('y=x')} y el eje ${math('X')} en ${math(`[-${r},${s}]`)}.`, `احسب المساحة بين ${math('y=x')} ومحور ${math('X')} على ${math(`[-${r},${s}]`)}.`, `Work out the area between ${math('y=x')} and the ${math('X')} axis on ${math(`[-${r},${s}]`)}.`), choices, answer, same(`\\frac{${r * r}}{2}+\\frac{${s * s}}{2}`), { r, s })
}

function betweenQuestion(random: Random): Bach2gIntegralsRaceQuestion | null {
    const a = randomInt(random, 1, 4)
    const answer = fraction(a ** 3, 6)
    const choices = options(random, answer, [ratio(-(a ** 3), 6, 'order'), ratio(a ** 3, 2, 'calculation'), ratio(a ** 3, 3, 'calculation')])
    return choices && build(3, 'between', say(`Kalkulatu ${math(`y=${a === 1 ? '' : a}x`)} eta ${math('y=x^2')} kurben arteko azalera.`, `Calcula el área entre ${math(`y=${a === 1 ? '' : a}x`)} e ${math('y=x^2')}.`, `احسب المساحة بين ${math(`y=${a === 1 ? '' : a}x`)} و${math('y=x^2')}.`, `Work out the area between ${math(`y=${a === 1 ? '' : a}x`)} and ${math('y=x^2')}.`), choices, answer, same(`\\int_0^{${a}}(${a === 1 ? '' : a}x-x^2)\\,dx=\\frac{${a ** 3}}{6}`), { a })
}

/* ---------- Circuit 4: economy ---------- */

function costQuestion(random: Random): Bach2gIntegralsRaceQuestion | null {
    const b = randomInt(random, 2, 10)
    const K = randomInt(random, 1, 5) * 100
    const x = pick(random, [5, 10, 20])
    const answer = fraction(x * x + b * x + K)
    const choices = options(random, answer, [whole(x * x + b * x, 'fixed'), whole(2 * x + b, 'derivative'), whole(2 * x * x + b * x + K, 'divide')])
    return choices && build(4, 'cost', say(`${math(`C'(x)=2x+${b}`)} eta kostu finkoa ${K} euro. Kalkulatu ${math(`C(${x})`)}.`, `${math(`C'(x)=2x+${b}`)} y el coste fijo es ${K} €. Calcula ${math(`C(${x})`)}.`, `${math(`C'(x)=2x+${b}`)} والتكلفة الثابتة ${K} €. احسب ${math(`C(${x})`)}.`, `${math(`C'(x)=2x+${b}`)} and the fixed cost is €${K}. Work out ${math(`C(${x})`)}.`), choices, answer, same(`${x * x}+${b * x}+${K}=${x * x + b * x + K}`), { b, K, x })
}

function pileQuestion(random: Random): Bach2gIntegralsRaceQuestion | null {
    const m = randomInt(random, 1, 4)
    const T = randomInt(random, 2, 6)
    const answer = fraction(m * T * T)
    const choices = options(random, answer, [whole(2 * m * T, 'derivative'), whole(2 * m * T * T, 'divide'), whole(m * T, 'calculation')])
    return choices && build(4, 'pile', say(`Salmentak ${math(`v(t)=${2 * m}t`)} mila dira hilean. Zenbat saltzen da lehen ${T} hilabeteetan?`, `Las ventas son ${math(`v(t)=${2 * m}t`)} miles al mes. ¿Cuánto se vende en los ${T} primeros meses?`, `المبيعات ${math(`v(t)=${2 * m}t`)} ألف في الشهر. كم يُباع في الأشهر الـ${T} الأولى؟`, `Sales are ${math(`v(t)=${2 * m}t`)} thousand a month. How much is sold in the first ${T} months?`), choices, answer, same(`\\int_0^{${T}}${2 * m}t\\,dt=${m * T * T}`), { m, T })
}

function incomeQuestion(random: Random): Bach2gIntegralsRaceQuestion | null {
    const p = randomInt(random, 5, 12) * 10
    const a = pick(random, [0, 10])
    const b = a + 10
    const I = (x: number) => p * x - x * x
    const answer = fraction(I(b) - I(a))
    if (answer.numerator <= 0) return null
    const choices = options(random, answer, [whole(I(a) - I(b), 'order'), whole(p - 2 * b - (p - 2 * a), 'derivative'), whole(I(b), 'calculation')])
    return choices && build(4, 'income', say(`${math(`I'(x)=${p}-2x`)}. Zenbat igotzen dira diru-sarrerak ${a} unitatetik ${b} unitatera?`, `${math(`I'(x)=${p}-2x`)}. ¿Cuánto suben los ingresos de ${a} a ${b} unidades?`, `${math(`I'(x)=${p}-2x`)}. كم يرتفع الإيراد من ${a} إلى ${b} وحدة؟`, `${math(`I'(x)=${p}-2x`)}. How much does the income rise from ${a} to ${b} units?`), choices, answer, same(`${I(b)}-${I(a)}=${I(b) - I(a)}`), { p, a, b })
}

const circuitGenerators: Array<Array<(random: Random, tier: Tier) => Bach2gIntegralsRaceQuestion | null>> = [
    [powerQuestion, coefficientQuestion, constantQuestion],
    [chainQuestion, logQuestion, expQuestion],
    [lineQuestion, parabolaQuestion, joinQuestion],
    [underQuestion, crossQuestion, betweenQuestion],
    [costQuestion, pileQuestion, incomeQuestion]
]

export function generateBach2gIntegralsRaceQuestion(random: Random, circuit: number, tier: Tier): Bach2gIntegralsRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkBach2gIntegralsPitAnswer(question: RaceQuestion<Bach2gIntegralsRaceError>, input: string): AnswerCheck {
    return checkAnswer(input, question.answer, question.answerForm)
}

export function bach2gIntegralsParTime(circuit: number): number {
    return parTimeFor([13, 13, 13, 14, 14][circuit] ?? 13)
}

export const bach2gIntegralsRaceErrorTips: Record<Bach2gIntegralsRaceError, LocalizedText> = {
    divide: say('Berretzaile berriaz zatitu: $\\frac{x^{n+1}}{n+1}$.', 'Divide entre el nuevo exponente: $\\frac{x^{n+1}}{n+1}$.', 'اقسم على الأس الجديد: $\\frac{x^{n+1}}{n+1}$.', 'Divide by the new exponent: $\\frac{x^{n+1}}{n+1}$.'),
    derivative: say('Hori deribatua da; integratzean berretzailea igo egiten da.', 'Eso es la derivada; al integrar el exponente sube.', 'هذه المشتقة؛ عند التكامل يزيد الأس.', 'That is the derivative; integrating raises the exponent.'),
    constant: say('Ordezkatu puntua eta ebatzi $C$.', 'Sustituye el punto y despeja $C$.', 'عوّض النقطة واستخرج $C$.', 'Substitute the point and solve for $C$.'),
    order: say('Barrow: $F(b)-F(a)$, goikoa ken behekoa.', 'Barrow: $F(b)-F(a)$, arriba menos abajo.', 'بارو: $F(b)-F(a)$، العلوي ناقص السفلي.', 'Barrow: $F(b)-F(a)$, top minus bottom.'),
    sign: say('Azalera: zatitu ebaki-puntuetan eta batu balio absolutuak.', 'Área: parte en los cortes y suma valores absolutos.', 'المساحة: قسّم عند التقاطع واجمع القيم المطلقة.', 'Area: split at the crossings and add absolute values.'),
    fixed: say('Ez ahaztu kostu finkoa.', 'No olvides el coste fijo.', 'لا تنس التكلفة الثابتة.', 'Do not forget the fixed cost.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}
