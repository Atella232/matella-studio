import { checkAnswer, fraction, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { written } from '../../batx1-zientziak-errealak/games/race.ts'
import { same as sameText, say } from '../../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   Integral mugagabeen lasterketa (Batxilergoa 2 · Zientziak): five
   circuits, one per stage — review (the number in front of a sine, of an
   arctangent, of a power of kx + b), by parts (the coefficients of x·e^(mx),
   xⁿ ln x and (x² + p)eˣ), rational integrals (the A of a fraction, the
   remainder of a division, the B of a double root), substitution (the
   number a change brings) and conditions (f(0), f(1) once the constants
   are fixed). Every answer is a number, and the wrong options are the
   typical mistakes. Every question carries `meta`, the numbers the tests
   check it against.
   ========================================================================== */

export const BACH2_INDEFINITE_RACE_CIRCUITS = 5

export type Bach2IndefiniteRaceError =
    | 'sign'
    | 'no-divide'
    | 'inverted'
    | 'square'
    | 'derivative'
    | 'inner'
    | 'last'
    | 'swap'
    | 'constant'
    | 'dx'
    | 'k-is-y'
    | 'one-constant'
    | 'calculation'

export type Bach2IndefiniteRaceQuestion = RaceQuestion<Bach2IndefiniteRaceError> & { meta: Record<string, number> }

const same = (latex: string): LocalizedText => sameText(`$${latex}$`)
const math = (latex: string) => `$${latex}$`
const signed = (value: number) => (value === 0 ? '' : value < 0 ? `-${-value}` : `+${value}`)
const linear = (a: number) => (a > 0 ? `x-${a}` : `x+${-a}`)
/** «<formula>. Find <letter>.» */
const find = (latex: string, letter: string) => say(`${math(latex)}. Aurkitu ${math(letter)}.`, `${math(latex)}. Halla ${math(letter)}.`, `${math(latex)}. أوجد ${math(letter)}.`, `${math(latex)}. Find ${math(letter)}.`)

interface Candidate {
    value: FractionValue
    error: Bach2IndefiniteRaceError
}
const whole = (value: number, error: Bach2IndefiniteRaceError): Candidate => ({ value: fraction(Math.round(value) + 0), error })
const ratio = (p: number, q: number, error: Bach2IndefiniteRaceError): Candidate => ({ value: fraction(p, q), error })
const nearby = (value: number): Candidate[] => [value + 1, value - 1, value + 2, value * 2].map((item) => ({ value: fraction(Math.round(item * 10000), 10000), error: 'calculation' as const }))

/** The right option and three different mistakes */
function options(random: Random, right: FractionValue, candidates: Candidate[]): RaceOption<Bach2IndefiniteRaceError>[] | null {
    const rightLatex = written(right)
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: Bach2IndefiniteRaceError }> = []
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

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<Bach2IndefiniteRaceError>[], answer: FractionValue, solution: LocalizedText, meta: Record<string, number>): Bach2IndefiniteRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution, meta }
}

/* ---------- Circuit 0: review ---------- */

/** ∫ cos(kx) dx = a·sin(kx) + C: a = 1/k */
function cosineQuestion(random: Random): Bach2IndefiniteRaceQuestion | null {
    const k = randomInt(random, 2, 6)
    const answer = fraction(1, k)
    const choices = options(random, answer, [whole(k, 'inverted'), whole(1, 'no-divide'), ratio(-1, k, 'sign')])
    return choices && build(0, 'cosine', find(`\\int\\cos ${k}x\\,dx=a\\sin ${k}x+k`, 'a'), choices, answer, same(`u'=${k}\\ \\to\\ a=\\frac{1}{${k}}`), { k })
}

/** ∫ dx/(c² + x²) = a·arctan(x/c) + C: a = 1/c */
function arctanQuestion(random: Random): Bach2IndefiniteRaceQuestion | null {
    const c = randomInt(random, 2, 5)
    const answer = fraction(1, c)
    const choices = options(random, answer, [whole(1, 'no-divide'), ratio(1, c * c, 'square'), whole(c, 'inverted')])
    return choices && build(0, 'arctan', find(`\\int\\frac{dx}{${c * c}+x^2}=a\\arctan\\frac{x}{${c}}+k`, 'a'), choices, answer, same(`\\frac{1}{${c * c}}\\cdot ${c}=\\frac{1}{${c}}`), { c })
}

/** ∫ (kx + b)ⁿ dx = (kx + b)ⁿ⁺¹/m + C: m = k(n + 1) */
function powerQuestion(random: Random): Bach2IndefiniteRaceQuestion | null {
    const k = randomInt(random, 2, 4)
    const b = pick(random, [-3, -1, 1, 2, 5])
    const n = randomInt(random, 2, 5)
    const m = k * (n + 1)
    const answer = fraction(m)
    const choices = options(random, answer, [whole(n + 1, 'no-divide'), whole(k * n, 'derivative'), whole(k + n + 1, 'calculation')])
    const inside = `${k}x${signed(b)}`
    return choices && build(0, 'power', find(`\\int(${inside})^${n}\\,dx=\\frac{(${inside})^${n + 1}}{m}+k`, 'm'), choices, answer, same(`m=${k}\\cdot ${n + 1}=${m}`), { k, b, n })
}

/* ---------- Circuit 1: by parts ---------- */

/** ∫ x·e^(mx) dx = e^(mx)(x/m + b) + C: b = −1/m² */
function xExpQuestion(random: Random): Bach2IndefiniteRaceQuestion | null {
    const m = randomInt(random, 2, 5)
    const answer = fraction(-1, m * m)
    const choices = options(random, answer, [ratio(1, m * m, 'sign'), ratio(-1, m, 'inner'), whole(-m * m, 'inverted')])
    return choices && build(1, 'x-exp', find(`\\int xe^{${m}x}\\,dx=e^{${m}x}\\left(\\frac{x}{${m}}+b\\right)+k`, 'b'), choices, answer, same(`-\\int\\frac{e^{${m}x}}{${m}}\\,dx=-\\frac{e^{${m}x}}{${m * m}}`), { m })
}

/** ∫ xⁿ ln x dx = xⁿ⁺¹/(n + 1)·ln x + a·xⁿ⁺¹ + C: a = −1/(n + 1)² */
function xLnQuestion(random: Random): Bach2IndefiniteRaceQuestion | null {
    const n = randomInt(random, 1, 4)
    const answer = fraction(-1, (n + 1) ** 2)
    const choices = options(random, answer, [ratio(-1, n + 1, 'inner'), ratio(1, (n + 1) ** 2, 'sign'), ratio(-1, n * n, 'calculation')])
    const power = n === 1 ? 'x' : `x^${n}`
    return choices && build(1, 'x-ln', find(`\\int ${power}\\ln x\\,dx=\\frac{x^${n + 1}}{${n + 1}}\\ln x+a\\,x^${n + 1}+k`, 'a'), choices, answer, same(`-\\int\\frac{x^${n}}{${n + 1}}\\,dx=-\\frac{x^${n + 1}}{${(n + 1) ** 2}}`), { n })
}

/** ∫ (x² + p)eˣ dx = eˣ(x² − 2x + c) + C: c = 2 + p */
function squareExpQuestion(random: Random): Bach2IndefiniteRaceQuestion | null {
    const p = pick(random, [-3, -1, 1, 3, 4, 5])
    const c = 2 + p
    const answer = fraction(c)
    const choices = options(random, answer, [whole(p, 'last'), whole(p - 2, 'sign'), whole(-c, 'sign')])
    return choices && build(1, 'square-exp', find(`\\int(x^2${signed(p)})e^x\\,dx=e^x(x^2-2x+c)+k`, 'c'), choices, answer, same(`c=2${signed(p)}=${c}`), { p })
}

/* ---------- Circuit 2: rational integrals ---------- */

/** N/((x − a)(x − b)) = A/(x − a) + B/(x − b): A = N(a)/(a − b) */
function coverQuestion(random: Random): Bach2IndefiniteRaceQuestion | null {
    const a = pick(random, [1, 2, 3])
    const b = pick(random, [-1, -2, -3])
    const A = pick(random, [-3, -2, -1, 1, 2, 3])
    const B = pick(random, [-2, -1, 1, 2])
    const p = A + B
    const q = -(A * b + B * a)
    if (p === 0 || A === B) return null
    const answer = fraction(A)
    const choices = options(random, answer, [whole(B, 'swap'), whole(A * (a - b), 'no-divide'), whole(-A, 'sign')])
    const top = `${p === 1 ? '' : p === -1 ? '-' : p}x${signed(q)}`
    return choices && build(2, 'cover', find(`\\frac{${top}}{(${linear(a)})(${linear(b)})}=\\frac{A}{${linear(a)}}+\\frac{B}{${linear(b)}}`, 'A'), choices, answer, same(`x=${a}\\ \\to\\ A=\\frac{${A * (a - b)}}{${a - b}}=${A}`), { a, b, A, B })
}

/** (x² + c)/(x − a) = x + a + r/(x − a): r = a² + c */
function divisionQuestion(random: Random): Bach2IndefiniteRaceQuestion | null {
    const a = pick(random, [1, 2, 3, 4])
    const c = pick(random, [1, 2, 3, 5, 7])
    const r = a * a + c
    const answer = fraction(r)
    const choices = options(random, answer, [whole(c, 'constant'), whole(c - a * a, 'sign'), whole(a + c, 'calculation')])
    return choices && build(2, 'division', find(`\\frac{x^2+${c}}{x-${a}}=x+${a}+\\frac{r}{x-${a}}`, 'r'), choices, answer, same(`r=${a}^2+${c}=${r}`), { a, c })
}

/** (px + q)/(x − a)² = A/(x − a) + B/(x − a)²: B = pa + q */
function doubleQuestion(random: Random): Bach2IndefiniteRaceQuestion | null {
    const a = pick(random, [-2, -1, 1, 2, 3])
    const p = pick(random, [2, 3, 4])
    const q = pick(random, [-5, -3, -1, 1, 4, 5])
    const B = p * a + q
    if (B === 0 || B === q || B === p) return null
    const answer = fraction(B)
    const choices = options(random, answer, [whole(q, 'constant'), whole(p, 'swap'), whole(-B, 'sign')])
    return choices && build(2, 'double', find(`\\frac{${p}x${signed(q)}}{(${linear(a)})^2}=\\frac{A}{${linear(a)}}+\\frac{B}{(${linear(a)})^2}`, 'B'), choices, answer, same(`x=${a}\\ \\to\\ B=${p}\\cdot(${a})${signed(q)}=${B}`), { a, p, q })
}

/* ---------- Circuit 3: substitution ---------- */

/** ∫ x(x² + c)ⁿ dx = a(x² + c)ⁿ⁺¹ + C: a = 1/(2(n + 1)) */
function squareChangeQuestion(random: Random): Bach2IndefiniteRaceQuestion | null {
    const c = randomInt(random, 1, 6)
    const n = randomInt(random, 2, 5)
    const answer = fraction(1, 2 * (n + 1))
    const choices = options(random, answer, [ratio(1, n + 1, 'dx'), ratio(1, 2, 'no-divide'), whole(2 * (n + 1), 'inverted')])
    return choices && build(3, 'square-change', find(`\\int x(x^2+${c})^${n}\\,dx=a(x^2+${c})^${n + 1}+k`, 'a'), choices, answer, same(`t=x^2+${c}\\ \\to\\ \\frac{1}{2}\\cdot\\frac{1}{${n + 1}}=\\frac{1}{${2 * (n + 1)}}`), { c, n })
}

/** ∫ c(ln x)ⁿ/x dx = a(ln x)ⁿ⁺¹ + C: a = c/(n + 1) */
function logChangeQuestion(random: Random): Bach2IndefiniteRaceQuestion | null {
    const n = randomInt(random, 1, 4)
    const c = (n + 1) * pick(random, [1, 2, 3])
    const answer = fraction(c, n + 1)
    const choices = options(random, answer, [whole(c, 'no-divide'), ratio(c, n, 'calculation'), whole(c * (n + 1), 'inverted')])
    return choices && build(3, 'log-change', find(`\\int\\frac{${c}(\\ln x)^${n}}{x}\\,dx=a(\\ln x)^${n + 1}+k`, 'a'), choices, answer, same(`t=\\ln x\\ \\to\\ \\frac{${c}}{${n + 1}}=${c / (n + 1)}`), { c, n })
}

/** ∫ c·e^√x/√x dx = a·e^√x + C: a = 2c */
function rootChangeQuestion(random: Random): Bach2IndefiniteRaceQuestion | null {
    const c = randomInt(random, 1, 6)
    const answer = fraction(2 * c)
    const choices = options(random, answer, [whole(c, 'dx'), ratio(c, 2, 'inverted'), whole(-2 * c, 'sign')])
    const lead = c === 1 ? '' : String(c)
    return choices && build(3, 'root-change', find(`\\int\\frac{${lead}e^{\\sqrt{x}}}{\\sqrt{x}}\\,dx=a\\,e^{\\sqrt{x}}+k`, 'a'), choices, answer, same(`t=\\sqrt{x}\\ \\to\\ dx=2t\\,dt\\ \\to\\ a=${2 * c}`), { c })
}

/* ---------- Circuit 4: conditions ---------- */

/** f′(x) = 2x + b and f(p) = q: f(0) = q − p² − bp */
function pointQuestion(random: Random): Bach2IndefiniteRaceQuestion | null {
    const b = pick(random, [-4, -3, -2, -1, 1, 2, 3, 4])
    const p = pick(random, [-2, -1, 1, 2, 3])
    const q = randomInt(random, -5, 9)
    const k = q - p * p - b * p
    const answer = fraction(k)
    const choices = options(random, answer, [whole(q, 'k-is-y'), whole(q - (2 * p + b), 'derivative'), whole(-k, 'sign')])
    const prompt = say(
        `${math(`f'(x)=2x${signed(b)}`)} eta ${math(`f(${p})=${q}`)} badira, kalkulatu ${math('f(0)')}.`,
        `Si ${math(`f'(x)=2x${signed(b)}`)} y ${math(`f(${p})=${q}`)}, calcula ${math('f(0)')}.`,
        `إذا كان ${math(`f'(x)=2x${signed(b)}`)} و${math(`f(${p})=${q}`)} فاحسب ${math('f(0)')}.`,
        `If ${math(`f'(x)=2x${signed(b)}`)} and ${math(`f(${p})=${q}`)}, work out ${math('f(0)')}.`
    )
    return choices && build(4, 'point', prompt, choices, answer, same(`${p * p}${signed(b * p)}+k=${q}\\ \\to\\ f(0)=k=${k}`), { b, p, q })
}

/** f″ = 6x, f′(0) = p, f(0) = q: f(1) = 1 + p + q */
function twoConstantsQuestion(random: Random): Bach2IndefiniteRaceQuestion | null {
    const p = pick(random, [-3, -2, -1, 1, 2, 3, 4])
    const q = pick(random, [-2, -1, 1, 2, 3, 5])
    const value = 1 + p + q
    const answer = fraction(value)
    const choices = options(random, answer, [whole(1 + q, 'one-constant'), whole(p + q, 'calculation'), whole(3 + p + q, 'derivative')])
    const prompt = say(
        `${math("f''(x)=6x")}, ${math(`f'(0)=${p}`)} eta ${math(`f(0)=${q}`)} badira, kalkulatu ${math('f(1)')}.`,
        `Si ${math("f''(x)=6x")}, ${math(`f'(0)=${p}`)} y ${math(`f(0)=${q}`)}, calcula ${math('f(1)')}.`,
        `إذا كان ${math("f''(x)=6x")} و${math(`f'(0)=${p}`)} و${math(`f(0)=${q}`)} فاحسب ${math('f(1)')}.`,
        `If ${math("f''(x)=6x")}, ${math(`f'(0)=${p}`)} and ${math(`f(0)=${q}`)}, work out ${math('f(1)')}.`
    )
    return choices && build(4, 'two-constants', prompt, choices, answer, same(`f(x)=x^3${signed(p)}x${signed(q)}\\ \\to\\ f(1)=${value}`.replace('+1x', '+x').replace('-1x', '-x')), { p, q })
}

/** f″ = 2 and the tangent at x = 0 is y = mx + n: f(1) = 1 + m + n */
function tangentQuestion(random: Random): Bach2IndefiniteRaceQuestion | null {
    const m = pick(random, [-3, -2, -1, 1, 2, 3])
    const n = pick(random, [-2, -1, 1, 2, 4])
    const value = 1 + m + n
    const answer = fraction(value)
    const choices = options(random, answer, [whole(m + n, 'calculation'), whole(2 + m + n, 'derivative'), whole(1 + n, 'one-constant')])
    const line = `y=${m === 1 ? '' : m === -1 ? '-' : m}x${signed(n)}`
    const prompt = say(
        `${math("f''(x)=2")} da, eta ${math('x=0')} puntuko ukitzailea ${math(line)} da. Kalkulatu ${math('f(1)')}.`,
        `${math("f''(x)=2")} y la tangente en ${math('x=0')} es ${math(line)}. Calcula ${math('f(1)')}.`,
        `${math("f''(x)=2")} والمماس عند ${math('x=0')} هو ${math(line)}. احسب ${math('f(1)')}.`,
        `${math("f''(x)=2")} and the tangent at ${math('x=0')} is ${math(line)}. Work out ${math('f(1)')}.`
    )
    return choices && build(4, 'tangent', prompt, choices, answer, same(`f(x)=x^2${signed(m)}x${signed(n)}\\ \\to\\ f(1)=${value}`.replace('+1x', '+x').replace('-1x', '-x')), { m, n })
}

const circuitGenerators: Array<Array<(random: Random, tier: Tier) => Bach2IndefiniteRaceQuestion | null>> = [
    [cosineQuestion, arctanQuestion, powerQuestion],
    [xExpQuestion, xLnQuestion, squareExpQuestion],
    [coverQuestion, divisionQuestion, doubleQuestion],
    [squareChangeQuestion, logChangeQuestion, rootChangeQuestion],
    [pointQuestion, twoConstantsQuestion, tangentQuestion]
]

export function generateBach2IndefiniteRaceQuestion(random: Random, circuit: number, tier: Tier): Bach2IndefiniteRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkBach2IndefinitePitAnswer(question: RaceQuestion<Bach2IndefiniteRaceError>, input: string): AnswerCheck {
    return checkAnswer(input, question.answer, question.answerForm)
}

export function bach2IndefiniteParTime(circuit: number): number {
    return parTimeFor([12, 14, 14, 13, 14][circuit] ?? 13)
}

export const bach2IndefiniteRaceErrorTips: Record<Bach2IndefiniteRaceError, LocalizedText> = {
    sign: say('Kontuz zeinuarekin.', 'Cuidado con el signo.', 'انتبه للإشارة.', 'Watch the sign.'),
    'no-divide': say('Zatitu behar da: u′ deribatuaren zenbakiaz edo berretzaile berriaz.', 'Hay que dividir: entre el número de u′ o entre el exponente nuevo.', 'يجب القسمة: على عدد u′ أو على الأس الجديد.', 'You must divide: by the number of u′ or by the new exponent.'),
    inverted: say('Zenbakiaz zatitu, ez biderkatu.', 'Divide entre el número, no lo multipliques.', 'اقسم على العدد ولا تضرب فيه.', 'Divide by the number, do not multiply by it.'),
    square: say('a² atera da errotik, baina u′ = 1/a da: behin bakarrik zatitu.', 'Sale a² de dentro, pero u′ = 1/a: queda dividir una sola vez.', 'يخرج a² من الداخل لكن u′ = 1/a: تبقى قسمة واحدة.', 'a² comes out, but u′ = 1/a: you end up dividing only once.'),
    derivative: say('Hori deribatzea da; hemen integratu behar da.', 'Eso es derivar; aquí hay que integrar.', 'هذا اشتقاق؛ وهنا يجب التكامل.', 'That is differentiating; here you must integrate.'),
    inner: say('Integral berria ere doitu behar da.', 'La integral nueva también hay que ajustarla.', 'التكامل الجديد يجب ضبطه أيضًا.', 'The new integral must be adjusted too.'),
    last: say('Azken integrala falta da.', 'Falta la última integral.', 'ينقص التكامل الأخير.', 'The last integral is missing.'),
    swap: say('Hori beste koefizientea da.', 'Ese es el otro coeficiente.', 'هذا هو المعامل الآخر.', 'That is the other coefficient.'),
    constant: say('Hori zenbakitzailearen gai askea da, ez hondarra.', 'Ese es el término independiente, no el resto.', 'هذا الحد الثابت لا الباقي.', 'That is the constant term, not the remainder.'),
    dx: say('dx ere aldatzen da: dt = u′ dx.', 'También cambia dx: dt = u′ dx.', 'يتغير dx أيضًا: dt = u′ dx.', 'dx changes too: dt = u′ dx.'),
    'k-is-y': say('k ez da puntuaren y: ordezkatu F(a) + k = b.', 'k no es la y del punto: sustituye F(a) + k = b.', 'k ليس y النقطة: عوّض F(a) + k = b.', 'k is not the y of the point: substitute F(a) + k = b.'),
    'one-constant': say('Bi aldiz integratzean bi konstante daude.', 'Al integrar dos veces hay dos constantes.', 'عند التكامل مرتين يوجد ثابتان.', 'Integrating twice gives two constants.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}
