import { checkAnswer, fraction, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { written } from '../../batx1-zientziak-errealak/games/race.ts'
import { same as sameText, say } from '../../batx1-zientziak-funtzioak/text.ts'
import { shift } from './latex.ts'

/* ==========================================================================
   Integral mugatuaren lasterketa (Batxilergoa 2 · Zientziak): five
   circuits, one per stage — review (Barrow on a polynomial, the area
   between a parabola and a line), sums and mean value (a lower or upper
   sum, a mean value), the fundamental theorem (F′(q) with x or x² as the
   top limit), working out (a change with new limits, |x − c|) and
   problems (a limit that gives an area, the a of a volume aπ, the area
   under a horizontal line). Every answer is a number and the wrong options
   are the typical mistakes. Every question carries `meta`, the numbers the
   tests check it against.
   ========================================================================== */

export const BACH2_DEFINITE_RACE_CIRCUITS = 5

export type Bach2DefiniteRaceError =
    | 'sign'
    | 'lower'
    | 'swapped'
    | 'undivided'
    | 'antiderivative'
    | 'no-chain'
    | 'old-limits'
    | 'no-divide'
    | 'no-split'
    | 'no-square'
    | 'half'
    | 'calculation'

export type Bach2DefiniteRaceQuestion = RaceQuestion<Bach2DefiniteRaceError> & { meta: Record<string, number> }

const same = (latex: string): LocalizedText => sameText(`$${latex}$`)
const math = (latex: string) => `$${latex}$`
/** «Work out <formula>.» */
const work = (latex: string) => say(`Kalkulatu ${math(latex)}.`, `Calcula ${math(latex)}.`, `احسب ${math(latex)}.`, `Work out ${math(latex)}.`)

interface Candidate {
    value: FractionValue
    error: Bach2DefiniteRaceError
}
const whole = (value: number, error: Bach2DefiniteRaceError): Candidate => ({ value: fraction(Math.round(value) + 0), error })
const ratio = (p: number, q: number, error: Bach2DefiniteRaceError): Candidate => ({ value: fraction(p, q), error })
const nearby = (value: number): Candidate[] => [value + 1, value - 1, value + 2, value * 2].map((item) => ({ value: fraction(Math.round(item * 10000), 10000), error: 'calculation' as const }))

/** The right option and three different mistakes */
function options(random: Random, right: FractionValue, candidates: Candidate[]): RaceOption<Bach2DefiniteRaceError>[] | null {
    const rightLatex = written(right)
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: Bach2DefiniteRaceError }> = []
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

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<Bach2DefiniteRaceError>[], answer: FractionValue, solution: LocalizedText, meta: Record<string, number>): Bach2DefiniteRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution, meta }
}

/* ---------- Circuit 0: review of 1.º ---------- */

/** ∫ₐᵇ 3x² dx = b³ − a³ */
function barrowQuestion(random: Random): Bach2DefiniteRaceQuestion | null {
    const a = randomInt(random, -2, 2)
    const b = randomInt(random, a + 1, 4)
    const value = b ** 3 - a ** 3
    const answer = fraction(value)
    const choices = options(random, answer, [whole(-value, 'sign'), whole(b ** 3, 'lower'), whole(3 * (b * b - a * a), 'antiderivative')])
    return choices && build(0, 'barrow', work(`\\int_{${a}}^{${b}}3x^2\\,dx`), choices, answer, same(`\\left[x^3\\right]_{${a}}^{${b}}=${value}`), { a, b })
}

/** The area between y = x² and y = mx: m³/6 */
function chordQuestion(random: Random): Bach2DefiniteRaceQuestion | null {
    const m = randomInt(random, 1, 4)
    const answer = fraction(m ** 3, 6)
    const choices = options(random, answer, [ratio(-(m ** 3), 6, 'sign'), ratio(m ** 3, 2, 'calculation'), ratio(m ** 3, 3, 'calculation')])
    const line = m === 1 ? 'y=x' : `y=${m}x`
    const prompt = say(
        `Aurkitu ${math('y=x^2')} eta ${math(line)} kurbek itxitako azalera.`,
        `Halla el área encerrada entre ${math('y=x^2')} e ${math(line)}.`,
        `أوجد المساحة المحصورة بين ${math('y=x^2')} و${math(line)}.`,
        `Find the area enclosed by ${math('y=x^2')} and ${math(line)}.`
    )
    return choices && build(0, 'chord', prompt, choices, answer, same(`\\int_0^{${m}}(${m === 1 ? '' : m}x-x^2)\\,dx=\\frac{${m ** 3}}{6}`), { m })
}

/* ---------- Circuit 1: sums and mean value ---------- */

/** The lower or the upper sum of x² with pieces of width 1 on [0, n] */
function sumQuestion(random: Random): Bach2DefiniteRaceQuestion | null {
    const n = randomInt(random, 2, 4)
    const upper = random() < 0.5
    const S = (n * (n + 1) * (2 * n + 1)) / 6
    const s = ((n - 1) * n * (2 * n - 1)) / 6
    const answer = fraction(upper ? S : s)
    const choices = options(random, answer, [whole(upper ? s : S, 'swapped'), whole((S + s) / 2, 'calculation'), ratio(n ** 3, 3, 'calculation')])
    const name = upper ? 'S' : 's'
    const prompt = say(
        `$1$ zabalerako zatiekin, aurkitu ${math(name)}, ${math('f(x)=x^2')} funtzioarentzat ${math(`[0,\\,${n}]`)} tartean.`,
        `Con tramos de anchura $1$, halla ${math(name)} para ${math('f(x)=x^2')} en ${math(`[0,\\,${n}]`)}.`,
        `بأجزاء عرضها $1$ أوجد ${math(name)} لـ ${math('f(x)=x^2')} في ${math(`[0,\\,${n}]`)}.`,
        `With pieces of width $1$, find ${math(name)} for ${math('f(x)=x^2')} on ${math(`[0,\\,${n}]`)}.`
    )
    const terms = Array.from({ length: n }, (_, i) => (upper ? i + 1 : i) ** 2).join('+')
    return choices && build(1, 'sum', prompt, choices, answer, same(`${name}=${terms}=${upper ? S : s}`), { n, upper: upper ? 1 : 0 })
}

/** The mean value of kx on [0, b]: kb/2, or of 3x² on [0, b]: b² */
function meanQuestion(random: Random): Bach2DefiniteRaceQuestion | null {
    const square = random() < 0.5
    const b = randomInt(random, 2, 4)
    const k = randomInt(random, 2, 4)
    const integral = square ? b ** 3 : (k * b * b) / 2
    const value = integral / b
    const answer = fraction(square ? value : k * b, square ? 1 : 2)
    const choices = options(random, answer, [ratio(square ? integral : k * b * b, square ? 1 : 2, 'undivided'), ratio(square ? integral : k * b * b, square ? 2 : 4, 'calculation'), whole(square ? 3 * b * b : k * b, 'calculation')])
    const f = square ? '3x^2' : `${k}x`
    const prompt = say(
        `Aurkitu ${math(`f(x)=${f}`)} funtzioaren batez besteko balioa ${math(`[0,\\,${b}]`)} tartean.`,
        `Halla el valor medio de ${math(`f(x)=${f}`)} en ${math(`[0,\\,${b}]`)}.`,
        `أوجد القيمة المتوسطة لـ ${math(`f(x)=${f}`)} في ${math(`[0,\\,${b}]`)}.`,
        `Find the mean value of ${math(`f(x)=${f}`)} on ${math(`[0,\\,${b}]`)}.`
    )
    return choices && build(1, 'mean', prompt, choices, answer, same(`\\frac{1}{${b}}\\int_0^{${b}}${f}\\,dx=${written(answer)}`), { b, k, square: square ? 1 : 0 })
}

/* ---------- Circuit 2: the fundamental theorem ---------- */

/** F(x) = ∫₀ˣ (t² + p) dt: F′(q) = q² + p */
function upperXQuestion(random: Random): Bach2DefiniteRaceQuestion | null {
    const p = randomInt(random, 1, 5)
    const q = randomInt(random, 1, 3)
    const answer = fraction(q * q + p)
    const choices = options(random, answer, [ratio(q ** 3 + 3 * p * q, 3, 'antiderivative'), whole(2 * q, 'calculation'), whole(q * q, 'calculation')])
    const prompt = say(
        `${math(`F(x)=\\int_0^x(t^2+${p})\\,dt`)} bada, kalkulatu ${math(`F'(${q})`)}.`,
        `Si ${math(`F(x)=\\int_0^x(t^2+${p})\\,dt`)}, calcula ${math(`F'(${q})`)}.`,
        `إذا كانت ${math(`F(x)=\\int_0^x(t^2+${p})\\,dt`)} فاحسب ${math(`F'(${q})`)}.`,
        `If ${math(`F(x)=\\int_0^x(t^2+${p})\\,dt`)}, work out ${math(`F'(${q})`)}.`
    )
    return choices && build(2, 'upper-x', prompt, choices, answer, same(`F'(${q})=${q}^2+${p}=${q * q + p}`), { p, q })
}

/** F(x) = ∫₁^(x²) t dt: F′(q) = q²·2q = 2q³ */
function upperSquareQuestion(random: Random): Bach2DefiniteRaceQuestion | null {
    const q = randomInt(random, 1, 3)
    const k = randomInt(random, 1, 3)
    const value = 2 * k * q ** 3
    const answer = fraction(value)
    const choices = options(random, answer, [whole(k * q * q, 'no-chain'), whole(k * q * 2 * q, 'calculation'), whole(k * q, 'calculation')])
    const f = k === 1 ? 't' : `${k}t`
    const prompt = say(
        `${math(`F(x)=\\int_1^{x^2}${f}\\,dt`)} bada, kalkulatu ${math(`F'(${q})`)}.`,
        `Si ${math(`F(x)=\\int_1^{x^2}${f}\\,dt`)}, calcula ${math(`F'(${q})`)}.`,
        `إذا كانت ${math(`F(x)=\\int_1^{x^2}${f}\\,dt`)} فاحسب ${math(`F'(${q})`)}.`,
        `If ${math(`F(x)=\\int_1^{x^2}${f}\\,dt`)}, work out ${math(`F'(${q})`)}.`
    )
    return choices && build(2, 'upper-square', prompt, choices, answer, same(`F'(x)=${k === 1 ? '' : k}x^2\\cdot 2x\\ \\to\\ F'(${q})=${value}`), { q, k })
}

/* ---------- Circuit 3: working out ---------- */

/** ∫₀¹ 2x(x² + 1)ⁿ dx = (2ⁿ⁺¹ − 1)/(n + 1) */
function changeQuestion(random: Random): Bach2DefiniteRaceQuestion | null {
    const n = randomInt(random, 1, 3)
    const answer = fraction(2 ** (n + 1) - 1, n + 1)
    const choices = options(random, answer, [ratio(1, n + 1, 'old-limits'), whole(2 ** (n + 1) - 1, 'no-divide'), ratio(2 ** (n + 1), n + 1, 'calculation')])
    const power = n === 1 ? '(x^2+1)' : `(x^2+1)^${n}`
    return choices && build(3, 'change', work(`\\int_0^1 2x${power}\\,dx`), choices, answer, same(`\\int_1^2 t${n === 1 ? '' : `^${n}`}\\,dt=\\frac{${2 ** (n + 1) - 1}}{${n + 1}}`), { n })
}

/** ∫₀ᵇ |x − c| dx = (c² + (b − c)²)/2 */
function absQuestion(random: Random): Bach2DefiniteRaceQuestion | null {
    const c = randomInt(random, 1, 2)
    const b = c + randomInt(random, 1, 3)
    const value2 = c * c + (b - c) ** 2
    const answer = fraction(value2, 2)
    const choices = options(random, answer, [ratio(b * b - 2 * c * b, 2, 'no-split'), ratio(-(b * b - 2 * c * b), 2, 'sign'), ratio((b - c) ** 2, 2, 'half')])
    return choices && build(3, 'abs', work(`\\int_0^{${b}}|${shift(c)}|\\,dx`), choices, answer, same(`\\frac{${c * c}}{2}+\\frac{${(b - c) ** 2}}{2}=${written(answer)}`), { b, c })
}

/* ---------- Circuit 4: regions and problems ---------- */

/** ∫₀ᵇ kx dx = A: b = √(2A/k) */
function parameterQuestion(random: Random): Bach2DefiniteRaceQuestion | null {
    const k = pick(random, [2, 4, 6])
    const b = randomInt(random, 2, 4)
    const area = (k * b * b) / 2
    const answer = fraction(b)
    const choices = options(random, answer, [whole(b * b, 'calculation'), ratio(area, k, 'calculation'), whole(-b, 'sign')])
    const prompt = say(
        `Aurkitu ${math('b>0')}, ${math(`\\int_0^b ${k}x\\,dx=${area}`)} izan dadin.`,
        `Halla ${math('b>0')} para que ${math(`\\int_0^b ${k}x\\,dx=${area}`)}.`,
        `أوجد ${math('b>0')} بحيث ${math(`\\int_0^b ${k}x\\,dx=${area}`)}.`,
        `Find ${math('b>0')} so that ${math(`\\int_0^b ${k}x\\,dx=${area}`)}.`
    )
    return choices && build(4, 'parameter', prompt, choices, answer, same(`${k / 2}b^2=${area}\\ \\to\\ b=${b}`.replace(/^1b/, 'b')), { k, b })
}

/** Turning y = x about the x-axis on [0, b]: V = (b³/3)π */
function volumeQuestion(random: Random): Bach2DefiniteRaceQuestion | null {
    const b = randomInt(random, 2, 4)
    const answer = fraction(b ** 3, 3)
    const choices = options(random, answer, [ratio(b * b, 2, 'no-square'), whole(b ** 3, 'no-divide'), ratio(b ** 3, 6, 'calculation')])
    const prompt = say(
        `${math('y=x')} zuzena X ardatzaren inguruan ${math(`[0,\\,${b}]`)} tartean biratzean, ${math('V=a\\pi')}. Aurkitu ${math('a')}.`,
        `Al girar ${math('y=x')} alrededor del eje X en ${math(`[0,\\,${b}]`)}, ${math('V=a\\pi')}. Halla ${math('a')}.`,
        `عند دوران ${math('y=x')} حول محور X في ${math(`[0,\\,${b}]`)} يكون ${math('V=a\\pi')}. أوجد ${math('a')}.`,
        `Turning ${math('y=x')} about the x-axis on ${math(`[0,\\,${b}]`)} gives ${math('V=a\\pi')}. Find ${math('a')}.`
    )
    return choices && build(4, 'volume', prompt, choices, answer, same(`\\pi\\int_0^{${b}}x^2\\,dx=\\frac{${b ** 3}}{3}\\pi`), { b })
}

/** The area between y = x² and y = n²: 4n³/3 */
function capQuestion(random: Random): Bach2DefiniteRaceQuestion | null {
    const n = randomInt(random, 1, 3)
    const answer = fraction(4 * n ** 3, 3)
    const choices = options(random, answer, [ratio(2 * n ** 3, 3, 'half'), whole(2 * n ** 3, 'calculation'), ratio(-4 * n ** 3, 3, 'sign')])
    const line = `y=${n * n}`
    const prompt = say(
        `Aurkitu ${math('y=x^2')} kurbak eta ${math(line)} zuzenak itxitako azalera.`,
        `Halla el área encerrada entre ${math('y=x^2')} y la recta ${math(line)}.`,
        `أوجد المساحة المحصورة بين ${math('y=x^2')} والمستقيم ${math(line)}.`,
        `Find the area enclosed by ${math('y=x^2')} and the line ${math(line)}.`
    )
    return choices && build(4, 'cap', prompt, choices, answer, same(`\\int_{-${n}}^{${n}}(${n * n}-x^2)\\,dx=${written(answer)}`), { n })
}

const circuitGenerators: Array<Array<(random: Random, tier: Tier) => Bach2DefiniteRaceQuestion | null>> = [
    [barrowQuestion, chordQuestion],
    [sumQuestion, meanQuestion],
    [upperXQuestion, upperSquareQuestion],
    [changeQuestion, absQuestion],
    [parameterQuestion, volumeQuestion, capQuestion]
]

export function generateBach2DefiniteRaceQuestion(random: Random, circuit: number, tier: Tier): Bach2DefiniteRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkBach2DefinitePitAnswer(question: RaceQuestion<Bach2DefiniteRaceError>, input: string): AnswerCheck {
    return checkAnswer(input, question.answer, question.answerForm)
}

export function bach2DefiniteParTime(circuit: number): number {
    return parTimeFor([12, 13, 12, 13, 14][circuit] ?? 13)
}

export const bach2DefiniteRaceErrorTips: Record<Bach2DefiniteRaceError, LocalizedText> = {
    sign: say('Kontuz zeinuarekin: goikoa ken behekoa, eta azalera ez da inoiz negatiboa.', 'Cuidado con el signo: el de arriba menos el de abajo, y un área nunca es negativa.', 'انتبه للإشارة: الأعلى ناقص الأدنى، والمساحة لا تكون سالبة أبدًا.', 'Watch the sign: top minus bottom, and an area is never negative.'),
    lower: say('Beheko mugako balioa ere kendu behar da.', 'También hay que restar el valor en el límite de abajo.', 'يجب طرح القيمة عند الحد الأدنى أيضًا.', 'You must also subtract the value at the bottom limit.'),
    swapped: say('Hori beste batura da: behekoak minimoa erabiltzen du, eta goikoak maximoa.', 'Esa es la otra suma: la inferior usa el mínimo y la superior, el máximo.', 'هذا هو المجموع الآخر: الأدنى يستعمل أصغر قيمة والأعلى أكبرها.', 'That is the other sum: the lower uses the minimum and the upper the maximum.'),
    undivided: say('Batez besteko balioa lortzeko, integrala zatitu tartearen luzeraz.', 'Para el valor medio, divide la integral entre la longitud del intervalo.', 'للقيمة المتوسطة اقسم التكامل على طول الفترة.', 'For the mean value, divide the integral by the length of the interval.'),
    antiderivative: say('Hori jatorrizkoa da; oinarrizko teoremak $F\'=f$ ematen du.', 'Esa es la primitiva; el teorema fundamental da $F\'=f$.', 'هذه هي الدالة الأصلية؛ والمبرهنة الأساسية تعطي $F\'=f$.', 'That is the antiderivative; the fundamental theorem gives $F\'=f$.'),
    'no-chain': say('Muga $x^2$ denean, biderkatu haren deribatuaz, $2x$.', 'Si el límite es $x^2$, multiplica por su derivada, $2x$.', 'إذا كان الحد $x^2$ فاضرب في مشتقته $2x$.', 'If the limit is $x^2$, multiply by its derivative, $2x$.'),
    'old-limits': say('Aldaketarekin mugak ere aldatzen dira: $x=0\\to t=1$ eta $x=1\\to t=2$.', 'Con el cambio también cambian los límites: $x=0\\to t=1$ y $x=1\\to t=2$.', 'مع التعويض تتغير الحدود أيضًا: $x=0\\to t=1$ و$x=1\\to t=2$.', 'With the change the limits change too: $x=0\\to t=1$ and $x=1\\to t=2$.'),
    'no-divide': say('Integratzean berretzaile berriaz zatitu behar da.', 'Al integrar hay que dividir entre el nuevo exponente.', 'عند التكامل يجب القسمة على الأس الجديد.', 'When integrating you must divide by the new exponent.'),
    'no-split': say('$|x-c|$ zatitu behar da $x=c$ puntuan.', 'Hay que partir $|x-c|$ en $x=c$.', 'يجب تقسيم $|x-c|$ عند $x=c$.', 'You must split $|x-c|$ at $x=c$.'),
    'no-square': say('Bolumenean erradioa karratu egiten da: $\\pi\\int f(x)^2\\,dx$.', 'En el volumen el radio va al cuadrado: $\\pi\\int f(x)^2\\,dx$.', 'في الحجم يُربّع نصف القطر: $\\pi\\int f(x)^2\\,dx$.', 'In a volume the radius is squared: $\\pi\\int f(x)^2\\,dx$.'),
    half: say('Barrutiaren erdia bakarrik kalkulatu duzu.', 'Solo has calculado la mitad del recinto.', 'حسبت نصف المنطقة فقط.', 'You only worked out half of the region.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}
