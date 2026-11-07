import { checkAnswer, fraction, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { written } from '../../batx1-zientziak-errealak/games/race.ts'
import { same as sameText, say } from '../../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   Limiteen lasterketa (Batxilergoa 1 · Zientziak): five circuits, one per
   stage — the limit at a point (a one-sided limit of a piecewise
   function, the k that makes the limit exist, how many vertical
   asymptotes), working out limits (0/0 by factorising, by the conjugate,
   by substituting), limits at infinity (equal degrees, √(x² + px) − x,
   the a of eᵃ), asymptotes (horizontal, the m and the n of an oblique
   one) and continuity (the k that joins two pieces, the value that fills
   a hole, the integers around a root by Bolzano). The wrong options are
   the typical mistakes. Every question carries `meta`, the numbers the
   tests check it against.
   ========================================================================== */

export const BACH_LIMITS_RACE_CIRCUITS = 5

export type BachLimitsRaceError =
    | 'side'
    | 'value'
    | 'hole'
    | 'zero'
    | 'sign'
    | 'conjugate'
    | 'inverse'
    | 'degree'
    | 'half'
    | 'exponent'
    | 'quotient'
    | 'joint'
    | 'ends'
    | 'calculation'

export type BachLimitsRaceQuestion = RaceQuestion<BachLimitsRaceError> & { meta: Record<string, number> }

const same = (latex: string): LocalizedText => sameText(`$${latex}$`)
const math = (latex: string) => `$${latex}$`
const signed = (value: number) => (value < 0 ? `-${-value}` : `+${value}`)
const factor = (root: number) => (root === 0 ? 'x' : `x${signed(-root)}`)
/** x² + bx + c */
const quadratic = (b: number, c: number) => `x^2${b === 0 ? '' : `${b < 0 ? '-' : '+'}${Math.abs(b) === 1 ? '' : Math.abs(b)}x`}${c === 0 ? '' : signed(c)}`
/** m·x + c */
const linear = (m: number, c: number) => `${m === 1 ? '' : m === -1 ? '-' : m}x${c === 0 ? '' : signed(c)}`
const paren = (value: number) => (value < 0 ? `(${value})` : String(value))

interface Candidate {
    value: FractionValue
    error: BachLimitsRaceError
}
const whole = (value: number, error: BachLimitsRaceError): Candidate => ({ value: fraction(Math.round(value) + 0), error })
const ratio = (p: number, q: number, error: BachLimitsRaceError): Candidate => ({ value: fraction(p, q), error })
const nearby = (value: number): Candidate[] => [value + 1, value - 1, value + 2, value * 2].map((item) => ({ value: fraction(Math.round(item * 10000), 10000), error: 'calculation' as const }))

/** The right option and three different mistakes */
function options(random: Random, right: FractionValue, candidates: Candidate[]): RaceOption<BachLimitsRaceError>[] | null {
    const rightLatex = written(right)
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: BachLimitsRaceError }> = []
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

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<BachLimitsRaceError>[], answer: FractionValue, solution: LocalizedText, meta: Record<string, number>): BachLimitsRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution, meta }
}

const work = (formula: string) => say(`Kalkulatu ${math(formula)}.`, `Calcula ${math(formula)}.`, `احسب ${math(formula)}.`, `Work out ${math(formula)}.`)
const piecewise = (top: string, bottom: string, t: number) => `f(x)=\\begin{cases}${top} & x<${t}\\\\ ${bottom} & x\\ge ${t}\\end{cases}`

/* ---------- Circuit 0: the limit at a point ---------- */

/** lim x→t⁻ of a piecewise function: the left piece */
function sideQuestion(random: Random): BachLimitsRaceQuestion | null {
    const t = randomInt(random, -2, 3)
    const m = pick(random, [-2, -1, 2, 3])
    const c = randomInt(random, -4, 4)
    const q = randomInt(random, -3, 3)
    const left = m * t + c
    const right = t * t + q
    if (left === right) return null
    const answer = fraction(left)
    const choices = options(random, answer, [whole(right, 'side'), whole(m + c, 'calculation'), whole(-left, 'sign')])
    const formula = piecewise(linear(m, c), `x^2${q === 0 ? '' : signed(q)}`, t)
    return choices && build(0, 'side', say(`Kalkulatu ${math(`\\lim_{x\\to ${t}^-}f(x)`)} funtzio honetan: ${math(formula)}`, `Calcula ${math(`\\lim_{x\\to ${t}^-}f(x)`)} para esta función: ${math(formula)}`, `احسب ${math(`\\lim_{x\\to ${t}^-}f(x)`)} لهذه الدالة: ${math(formula)}`, `Work out ${math(`\\lim_{x\\to ${t}^-}f(x)`)} for this function: ${math(formula)}`), choices, answer, same(`${m}\\cdot ${paren(t)}${signed(c)}=${left}`), { m, c, t, q })
}

/** The k for which lim x→t exists: m·t + k = t² + q */
function joinLimitQuestion(random: Random): BachLimitsRaceQuestion | null {
    const t = randomInt(random, -2, 3)
    const m = pick(random, [-2, -1, 1, 2, 3])
    const q = randomInt(random, -4, 4)
    const k = t * t + q - m * t
    if (k === 0) return null
    const answer = fraction(k)
    const choices = options(random, answer, [whole(m * t - t * t - q, 'sign'), whole(t * t + q, 'calculation'), whole(k + 2 * m * t, 'sign')])
    const formula = piecewise(`${linear(m, 0)}+k`, `x^2${q === 0 ? '' : signed(q)}`, t)
    return choices && build(0, 'join-limit', say(`Aurkitu $k$, ${math(`\\lim_{x\\to ${t}}f(x)`)} egon dadin: ${math(formula)}`, `Halla $k$ para que exista ${math(`\\lim_{x\\to ${t}}f(x)`)}: ${math(formula)}`, `أوجد $k$ كي توجد ${math(`\\lim_{x\\to ${t}}f(x)`)}: ${math(formula)}`, `Find $k$ so that ${math(`\\lim_{x\\to ${t}}f(x)`)} exists: ${math(formula)}`), choices, answer, same(`${m}\\cdot ${paren(t)}+k=${t * t + q}\\ \\to\\ k=${k}`), { m, q, t })
}

/** How many vertical asymptotes (x − r)/((x − d)(x − e)) has: a factor may cancel */
function verticalCountQuestion(random: Random): BachLimitsRaceQuestion | null {
    const d = randomInt(random, -4, 4)
    const e = randomInt(random, -4, 4)
    const r = pick(random, [d, randomInt(random, -4, 4)])
    if (d === e || r === e) return null
    const count = r === d ? 1 : 2
    const answer = fraction(count)
    const choices = options(random, answer, [whole(3 - count, 'hole'), whole(0, 'calculation'), whole(3, 'calculation')])
    const formula = `\\frac{${factor(r)}}{${quadratic(-(d + e), d * e)}}`
    return choices && build(0, 'vertical-count', say(`Zenbat asintota bertikal ditu ${math(formula)} funtzioak?`, `¿Cuántas asíntotas verticales tiene ${math(formula)}?`, `كم مقاربًا رأسيًّا للدالة ${math(formula)}؟`, `How many vertical asymptotes does ${math(formula)} have?`), choices, answer, same(`\\frac{${factor(r)}}{(${factor(d)})(${factor(e)})}\\ \\to\\ ${count}`), { d, e, r })
}

/* ---------- Circuit 1: working out limits at a point ---------- */

/** lim x→a of (x − a)(x − b)/(x − a) = a − b */
function factorQuestion(random: Random): BachLimitsRaceQuestion | null {
    const a = pick(random, [-3, -2, -1, 1, 2, 3, 4])
    const b = randomInt(random, -4, 4)
    if (b === a) return null
    const answer = fraction(a - b)
    const choices = options(random, answer, [whole(0, 'zero'), whole(a + b, 'sign'), whole(b - a, 'sign')])
    return choices && build(1, 'factor', work(`\\lim_{x\\to ${a}}\\frac{${quadratic(-(a + b), a * b)}}{${factor(a)}}`), choices, answer, same(`\\frac{(${factor(a)})(${factor(b)})}{${factor(a)}}=${factor(b)}\\ \\to\\ ${a - b}`), { a, b })
}

/** lim x→c² of (√x − c)/(x − c²) = 1/(2c) */
function conjugateQuestion(random: Random): BachLimitsRaceQuestion | null {
    const c = randomInt(random, 1, 5)
    const answer = fraction(1, 2 * c)
    const choices = options(random, answer, [ratio(1, c, 'conjugate'), whole(0, 'zero'), ratio(c, 2, 'inverse')])
    return choices && build(1, 'conjugate', work(`\\lim_{x\\to ${c * c}}\\frac{\\sqrt{x}-${c}}{x-${c * c}}`), choices, answer, same(`\\frac{1}{\\sqrt{x}+${c}}\\ \\to\\ \\frac{1}{${2 * c}}`), { c })
}

/** lim x→a of (x² + p)/(x + q): substitute */
function substituteQuestion(random: Random): BachLimitsRaceQuestion | null {
    const a = randomInt(random, -3, 3)
    const p = randomInt(random, 1, 8)
    const q = randomInt(random, -3, 4)
    if (a + q === 0 || q === 0 || (a * a + p) % (a + q) !== 0) return null
    const value = (a * a + p) / (a + q)
    const answer = fraction(value)
    const choices = options(random, answer, [whole(a * a + p, 'calculation'), whole(-value, 'sign'), whole((-(a * a) + p) / (a + q), 'sign')])
    return choices && build(1, 'substitute', work(`\\lim_{x\\to ${a}}\\frac{x^2+${p}}{${factor(-q)}}`), choices, answer, same(`\\frac{${paren(a)}^2+${p}}{${paren(a)}${signed(q)}}=\\frac{${a * a + p}}{${a + q}}=${value}`), { a, p, q })
}

/* ---------- Circuit 2: limits at infinity ---------- */

/** Equal degrees: the quotient of the leading coefficients */
function degreesQuestion(random: Random): BachLimitsRaceQuestion | null {
    const a = randomInt(random, -6, 6)
    const b = randomInt(random, 2, 5)
    const p = randomInt(random, 1, 5)
    const q = randomInt(random, 1, 5)
    if (a === 0 || a === b || Math.abs(a) === Math.abs(b)) return null
    const answer = fraction(a, b)
    const choices = options(random, answer, [ratio(b, a, 'inverse'), whole(0, 'degree'), ratio(p, q, 'quotient')])
    return choices && build(2, 'degrees', work(`\\lim_{x\\to+\\infty}\\frac{${a}x^2+${p}x}{${b}x^2+${q}}`), choices, answer, same(`\\frac{${a}x^2}{${b}x^2}=\\frac{${a}}{${b}}`), { a, b, p, q })
}

/** √(x² + px) − x → p/2 */
function rootDifferenceQuestion(random: Random): BachLimitsRaceQuestion | null {
    const p = randomInt(random, 2, 12)
    const answer = fraction(p, 2)
    const choices = options(random, answer, [whole(p, 'half'), whole(0, 'zero'), ratio(p, 4, 'calculation')])
    return choices && build(2, 'root-difference', work(`\\lim_{x\\to+\\infty}\\left(\\sqrt{x^2+${p}x}-x\\right)`), choices, answer, same(`\\frac{${p}x}{\\sqrt{x^2+${p}x}+x}\\ \\to\\ \\frac{${p}}{2}`), { p })
}

/** (1 + p/x)^(qx) → e^(pq): the a of eᵃ */
function eQuestion(random: Random): BachLimitsRaceQuestion | null {
    const p = randomInt(random, 1, 5)
    const q = randomInt(random, 2, 4)
    const answer = fraction(p * q)
    const choices = options(random, answer, [whole(p + q, 'exponent'), whole(p, 'exponent'), whole(q, 'exponent')])
    const formula = `\\lim_{x\\to+\\infty}\\left(1+\\frac{${p}}{x}\\right)^{${q}x}=e^a`
    return choices && build(2, 'e', say(`${math(formula)}. Zenbat da $a$?`, `${math(formula)}. ¿Cuánto vale $a$?`, `${math(formula)}. كم تساوي $a$؟`, `${math(formula)}. What is $a$?`), choices, answer, same(`${q}x\\cdot\\frac{${p}}{x}=${p * q}`), { p, q })
}

/* ---------- Circuit 3: asymptotes ---------- */

/** The horizontal asymptote of (ax + c)/(bx + e): y = a/b */
function horizontalQuestion(random: Random): BachLimitsRaceQuestion | null {
    const a = randomInt(random, -8, 8)
    const b = randomInt(random, 2, 4)
    const c = randomInt(random, 1, 6)
    const e = randomInt(random, -5, 5)
    if (a === 0 || e === 0 || Math.abs(a) === b) return null
    const answer = fraction(a, b)
    const choices = options(random, answer, [whole(0, 'degree'), ratio(b, a, 'inverse'), ratio(c, e, 'quotient')])
    const formula = `\\frac{${linear(a, c)}}{${linear(b, e)}}`
    return choices && build(3, 'horizontal', say(`${math(formula)} funtzioaren asintota horizontala $y=b$ da. Zenbat da $b$?`, `La asíntota horizontal de ${math(formula)} es $y=b$. ¿Cuánto vale $b$?`, `المقارب الأفقي لـ ${math(formula)} هو $y=b$. كم تساوي $b$؟`, `The horizontal asymptote of ${math(formula)} is $y=b$. What is $b$?`), choices, answer, same(`\\frac{${a}x}{${b}x}=\\frac{${a}}{${b}}`), { a, b, c, e })
}

/** The oblique asymptote y = x + n of (x² + px + q)/(x − d): n = p + d */
function obliqueQuestion(random: Random): BachLimitsRaceQuestion | null {
    const p = randomInt(random, -5, 5)
    const q = randomInt(random, -5, 5)
    const d = randomInt(random, -4, 4)
    const n = p + d
    if (d === 0 || n === 0 || d * d + p * d + q === 0) return null
    const answer = fraction(n)
    const choices = options(random, answer, [whole(p - d, 'sign'), whole(p, 'calculation'), whole(q, 'calculation')])
    const formula = `\\frac{${quadratic(p, q)}}{${factor(d)}}`
    return choices && build(3, 'oblique', say(`${math(formula)} funtzioaren asintota zeiharra $y=x+n$ da. Zenbat da $n$?`, `La asíntota oblicua de ${math(formula)} es $y=x+n$. ¿Cuánto vale $n$?`, `المقارب المائل لـ ${math(formula)} هو $y=x+n$. كم تساوي $n$؟`, `The oblique asymptote of ${math(formula)} is $y=x+n$. What is $n$?`), choices, answer, same(`${quadratic(p, q)}=(${factor(d)})(${linear(1, n)})${signed(d * d + p * d + q)}`), { p, q, d })
}

/** The slope of the oblique asymptote of (ax² + 1)/(bx + c): m = a/b */
function slopeQuestion(random: Random): BachLimitsRaceQuestion | null {
    const a = randomInt(random, -6, 6)
    const b = randomInt(random, 2, 4)
    const c = randomInt(random, -5, 5)
    if (a === 0 || c === 0 || Math.abs(a) === b) return null
    const answer = fraction(a, b)
    const choices = options(random, answer, [ratio(b, a, 'inverse'), whole(a, 'calculation'), whole(0, 'degree')])
    const formula = `\\frac{${a}x^2+1}{${linear(b, c)}}`
    return choices && build(3, 'slope', say(`${math(formula)} funtzioaren asintota zeiharra $y=mx+n$ da. Zenbat da $m$?`, `La asíntota oblicua de ${math(formula)} es $y=mx+n$. ¿Cuánto vale $m$?`, `المقارب المائل لـ ${math(formula)} هو $y=mx+n$. كم تساوي $m$؟`, `The oblique asymptote of ${math(formula)} is $y=mx+n$. What is $m$?`), choices, answer, same(`\\frac{${a}x^2}{${b}x}=\\frac{${a}}{${b}}x`), { a, b, c })
}

/* ---------- Circuit 4: continuity ---------- */

/** The k that makes ax + k (x < t) and x² + c (x ≥ t) continuous */
function continuityQuestion(random: Random): BachLimitsRaceQuestion | null {
    const t = randomInt(random, -2, 3)
    const a = pick(random, [-3, -2, -1, 1, 2, 3])
    const c = randomInt(random, -4, 4)
    const k = t * t + c - a * t
    if (k === 0) return null
    const answer = fraction(k)
    const choices = options(random, answer, [whole(t * t + c, 'joint'), whole(a * t - t * t - c, 'sign'), whole(k + 1, 'calculation')])
    const formula = piecewise(`${linear(a, 0)}+k`, `x^2${c === 0 ? '' : signed(c)}`, t)
    return choices && build(4, 'continuity', say(`Aurkitu $k$, funtzio hau jarraitua izan dadin: ${math(formula)}`, `Halla $k$ para que esta función sea continua: ${math(formula)}`, `أوجد $k$ لتكون هذه الدالة متصلة: ${math(formula)}`, `Find $k$ so that this function is continuous: ${math(formula)}`), choices, answer, same(`${a}\\cdot ${paren(t)}+k=${t * t + c}\\ \\to\\ k=${k}`), { a, c, t })
}

/** The value of f(a) that fills the hole of (x² − a²)/(x − a): 2a */
function fillQuestion(random: Random): BachLimitsRaceQuestion | null {
    const a = pick(random, [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5])
    const answer = fraction(2 * a)
    const choices = options(random, answer, [whole(0, 'zero'), whole(a, 'calculation'), whole(a * a, 'calculation')])
    return choices && build(4, 'fill', say(`Zer balio behar du $f(${a})$ balioak ${math(`f(x)=\\frac{x^2-${a * a}}{${factor(a)}}`)} jarraitua izan dadin?`, `¿Qué valor tiene que tener $f(${a})$ para que ${math(`f(x)=\\frac{x^2-${a * a}}{${factor(a)}}`)} sea continua?`, `ما قيمة $f(${a})$ التي تجعل ${math(`f(x)=\\frac{x^2-${a * a}}{${factor(a)}}`)} متصلة؟`, `What value must $f(${a})$ have for ${math(`f(x)=\\frac{x^2-${a * a}}{${factor(a)}}`)} to be continuous?`), choices, answer, same(`${factor(-a)}\\ \\to\\ ${2 * a}`), { a })
}

/** x³ + x − q has its root between n and n + 1: the smaller integer */
function bolzanoQuestion(random: Random): BachLimitsRaceQuestion | null {
    const n = randomInt(random, 1, 3)
    const q = randomInt(random, n ** 3 + n + 1, (n + 1) ** 3 + n)
    const answer = fraction(n)
    const choices = options(random, answer, [whole(n + 1, 'ends'), whole(n - 1, 'ends'), whole(q, 'calculation')])
    return choices && build(4, 'bolzano', say(`${math(`f(x)=x^3+x-${q}`)}. Zein bi zenbaki oso jarraituren artean du erroa? Eman txikiena.`, `${math(`f(x)=x^3+x-${q}`)}. ¿Entre qué dos enteros consecutivos tiene su raíz? Da el menor.`, `${math(`f(x)=x^3+x-${q}`)}. بين أي عددين صحيحين متتاليين يقع جذرها؟ اكتب الأصغر.`, `${math(`f(x)=x^3+x-${q}`)}. Between which two consecutive integers is its root? Give the smaller.`), choices, answer, same(`f(${n})=${n ** 3 + n - q}\\qquad f(${n + 1})=${(n + 1) ** 3 + n + 1 - q}`), { n, q })
}

const circuitGenerators: Array<Array<(random: Random, tier: Tier) => BachLimitsRaceQuestion | null>> = [
    [sideQuestion, joinLimitQuestion, verticalCountQuestion],
    [factorQuestion, conjugateQuestion, substituteQuestion],
    [degreesQuestion, rootDifferenceQuestion, eQuestion],
    [horizontalQuestion, obliqueQuestion, slopeQuestion],
    [continuityQuestion, fillQuestion, bolzanoQuestion]
]

export function generateBachLimitsRaceQuestion(random: Random, circuit: number, tier: Tier): BachLimitsRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkBachLimitsPitAnswer(question: RaceQuestion<BachLimitsRaceError>, input: string): AnswerCheck {
    return checkAnswer(input, question.answer, question.answerForm)
}

export function bachLimitsParTime(circuit: number): number {
    return parTimeFor([13, 14, 13, 14, 13][circuit] ?? 13)
}

export const bachLimitsRaceErrorTips: Record<BachLimitsRaceError, LocalizedText> = {
    side: say('Ezkerreko limiterako, ezkerreko zatia; eskuinekorako, eskuinekoa.', 'Para el límite por la izquierda, el trozo de la izquierda; por la derecha, el de la derecha.', 'للنهاية من اليسار الجزء الأيسر، ومن اليمين الجزء الأيمن.', 'For the left limit, the left piece; for the right limit, the right one.'),
    value: say('Limiteak ez du f(a) begiratzen.', 'El límite no mira f(a).', 'النهاية لا تنظر إلى f(a).', 'The limit does not look at f(a).'),
    hole: say('Sinplifikatzen den faktorea zuloa da, ez asintota.', 'El factor que se simplifica es un agujero, no una asíntota.', 'العامل الذي يُختصر ثقب لا مقارب.', 'A factor that cancels is a hole, not an asymptote.'),
    zero: say('0/0 eta ∞ − ∞ indeterminazioak dira, ez zero.', '0/0 e ∞ − ∞ son indeterminaciones, no cero.', '0/0 و∞ − ∞ حالتا عدم تعيين، لا صفر.', '0/0 and ∞ − ∞ are indeterminate, not zero.'),
    sign: say('Kontuz zeinuarekin.', 'Cuidado con el signo.', 'انتبه للإشارة.', 'Watch the sign.'),
    conjugate: say('Konjokatuaz biderkatzean, √x + c geratzen da behean: x = c² denean, 2c.', 'Al multiplicar por el conjugado queda √x + c abajo: en x = c², 2c.', 'بعد الضرب في المرافق يبقى √x + c في المقام: عند x = c² يساوي 2c.', 'After multiplying by the conjugate, √x + c is left below: at x = c², 2c.'),
    inverse: say('Zatidura alderantziz idatzi duzu: goikoa zati behekoa.', 'Has escrito el cociente al revés: el de arriba entre el de abajo.', 'كتبت خارج القسمة معكوسًا: البسط على المقام.', 'You wrote the quotient upside down: the top over the bottom.'),
    degree: say('Maila bera denean, limitea ez da 0: koefiziente nagusien zatidura da.', 'Con el mismo grado, el límite no es 0: es el cociente de los coeficientes principales.', 'مع الدرجة نفسها النهاية ليست 0: إنها خارج قسمة المعاملين الرئيسيين.', 'With the same degree the limit is not 0: it is the quotient of the leading coefficients.'),
    half: say('Konjokatuaz biderkatu ondoren, behean 2x geratzen da: zatitu 2 zenbakiaz.', 'Tras el conjugado queda 2x abajo: divide entre 2.', 'بعد المرافق يبقى 2x في المقام: اقسم على 2.', 'After the conjugate, 2x is left below: divide by 2.'),
    exponent: say('(1 + p/x)^(qx) → e^(p·q): biderkatu, ez batu.', '(1 + p/x)^(qx) → e^(p·q): se multiplica, no se suma.', '(1 + p/x)^(qx) → e^(p·q): نضرب لا نجمع.', '(1 + p/x)^(qx) → e^(p·q): multiply, do not add.'),
    quotient: say('Maila handieneko gaiak bakarrik dira garrantzitsuak.', 'Solo cuentan los términos de mayor grado.', 'لا تُحسب إلا الحدود الأعلى درجة.', 'Only the terms of the highest degree count.'),
    joint: say('Lotunean, bi zatiek balio bera eman behar dute.', 'En la unión, los dos trozos tienen que dar lo mismo.', 'عند الالتقاء يجب أن يعطي الجزآن القيمة نفسها.', 'Where they join, both pieces must give the same value.'),
    ends: say('Zeinua aldatzen den lekuan dago erroa: f(n) negatiboa eta f(n + 1) positiboa.', 'La raíz está donde cambia el signo: f(n) negativo y f(n + 1) positivo.', 'الجذر حيث تتغير الإشارة: f(n) سالب وf(n + 1) موجب.', 'The root is where the sign changes: f(n) negative and f(n + 1) positive.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}
