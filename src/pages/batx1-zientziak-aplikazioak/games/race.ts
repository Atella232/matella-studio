import { checkAnswer, fraction, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { written } from '../../batx1-zientziak-errealak/games/race.ts'
import { same as sameText, say } from '../../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   Deribatuaren aplikazioen lasterketa (Batxilergoa 1 · Zientziak): five
   circuits, one per stage — increase (where a parabola turns, from where
   a cubic rises, the least parameter that makes it rise everywhere),
   extrema (the x of a maximum, the value of a minimum, f″ at a point),
   concavity (the x and the y of an inflection, the parameter of an
   inflection), optimisation (the greatest product, an absolute maximum on
   [0, b], the greatest profit) and sketching (how many extrema, a
   vertical asymptote, the minimum of x·eᵏˣ). Every answer is a number,
   and the wrong options are the typical mistakes. Every question carries
   `meta`, the numbers the tests check it against.
   ========================================================================== */

export const BACH_APPLICATIONS_RACE_CIRCUITS = 5

export type BachApplicationsRaceError =
    | 'sign'
    | 'value'
    | 'x-not-value'
    | 'square'
    | 'discriminant'
    | 'kind'
    | 'first'
    | 'ends'
    | 'zeros'
    | 'numerator'
    | 'calculation'

export type BachApplicationsRaceQuestion = RaceQuestion<BachApplicationsRaceError> & { meta: Record<string, number> }

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
    error: BachApplicationsRaceError
}
const whole = (value: number, error: BachApplicationsRaceError): Candidate => ({ value: fraction(Math.round(value) + 0), error })
const ratio = (p: number, q: number, error: BachApplicationsRaceError): Candidate => ({ value: fraction(p, q), error })
const nearby = (value: number): Candidate[] => [value + 1, value - 1, value + 2, value * 2].map((item) => ({ value: fraction(Math.round(item * 10000), 10000), error: 'calculation' as const }))

/** The right option and three different mistakes */
function options(random: Random, right: FractionValue, candidates: Candidate[]): RaceOption<BachApplicationsRaceError>[] | null {
    const rightLatex = written(right)
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: BachApplicationsRaceError }> = []
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

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<BachApplicationsRaceError>[], answer: FractionValue, solution: LocalizedText, meta: Record<string, number>): BachApplicationsRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution, meta }
}

/* ---------- Circuit 0: increase and decrease ---------- */

/** x² + bx + c turns from falling to rising at −b/2 */
function turnQuestion(random: Random): BachApplicationsRaceQuestion | null {
    const b = pick(random, [-8, -6, -4, -2, 2, 4, 6, 8])
    const c = randomInt(random, -5, 5)
    const x = -b / 2
    const answer = fraction(x)
    const choices = options(random, answer, [whole(b / 2, 'sign'), whole(x * x + b * x + c, 'value'), whole(-b, 'calculation')])
    const f = `f(x)=x^2${term(b, 'x')}${signed(c)}`
    return choices && build(0, 'turn', say(`${math(f)} beherakorra da ${math('a')} baino lehen eta gorakorra ondoren. Aurkitu ${math('a')}.`, `${math(f)} decrece antes de ${math('a')} y crece después. Halla ${math('a')}.`, `${math(f)} متناقصة قبل ${math('a')} ومتزايدة بعده. أوجد ${math('a')}.`, `${math(f)} decreases before ${math('a')} and increases after it. Find ${math('a')}.`), choices, answer, same(`f'(x)=2x${signed(b)}=0\\ \\to\\ x=${x}`), { b, c })
}

/** x³ − 3p²x rises from x = p on */
function riseQuestion(random: Random): BachApplicationsRaceQuestion | null {
    const p = randomInt(random, 1, 4)
    const answer = fraction(p)
    const choices = options(random, answer, [whole(p * p, 'square'), whole(3 * p * p, 'value'), whole(-p, 'sign')])
    const f = `f(x)=x^3-${3 * p * p}x`
    return choices && build(0, 'rise', say(`Zer ${math('x>0')} baliotatik aurrera da gorakorra ${math(f)}?`, `¿A partir de qué ${math('x>0')} crece ${math(f)}?`, `ابتداءً من أي ${math('x>0')} تتزايد ${math(f)}؟`, `From which ${math('x>0')} on does ${math(f)} increase?`), choices, answer, same(`3x^2-${3 * p * p}=0\\ \\to\\ x=\\pm ${p}`), { p })
}

/** The least a that makes x³ + bx² + ax increasing on ℝ: b²/3 */
function parameterQuestion(random: Random): BachApplicationsRaceQuestion | null {
    const b = pick(random, [-9, -6, -3, 3, 6, 9])
    const a = (b * b) / 3
    const answer = fraction(a)
    const choices = options(random, answer, [whole(b * b, 'discriminant'), whole(-a, 'sign'), whole((b * b) / 12, 'calculation')])
    const f = `f(x)=x^3${term(b, 'x^2')}+ax`
    return choices && build(0, 'parameter', say(`Zein da ${math('a')} baliorik txikiena, ${math(f)} funtzioa ${math('\\mathbb{R}')} osoan gorakorra izateko?`, `¿Cuál es el menor ${math('a')} para el que ${math(f)} crece en todo ${math('\\mathbb{R}')}?`, `ما أصغر ${math('a')} تكون عنده ${math(f)} متزايدة في كل ${math('\\mathbb{R}')}؟`, `What is the least ${math('a')} for which ${math(f)} increases on all of ${math('\\mathbb{R}')}?`), choices, answer, same(`${4 * b * b}-12a\\le 0\\ \\to\\ a\\ge ${a}`), { b })
}

/* ---------- Circuit 1: maxima and minima ---------- */

/** x³ − 3p²x has its maximum at −p */
function maxQuestion(random: Random): BachApplicationsRaceQuestion | null {
    const p = randomInt(random, 1, 4)
    const c = randomInt(random, -5, 5)
    const answer = fraction(-p)
    const choices = options(random, answer, [whole(p, 'kind'), whole(2 * p * p * p + c, 'x-not-value'), whole(-p * p, 'square')])
    const f = `f(x)=x^3-${3 * p * p}x${signed(c)}`
    return choices && build(1, 'max-x', say(`Aurkitu ${math(f)} funtzioaren maximoaren ${math('x')} abszisa.`, `Halla la ${math('x')} del máximo de ${math(f)}.`, `أوجد الإحداثي ${math('x')} للقيمة العظمى في ${math(f)}.`, `Find the ${math('x')} of the maximum of ${math(f)}.`), choices, answer, same(`f''(-${p})=-${6 * p}<0\\ \\to\\ x=-${p}`), { p, c })
}

/** The value of the minimum of x² − 2px + q: q − p² */
function minQuestion(random: Random): BachApplicationsRaceQuestion | null {
    const p = pick(random, [-4, -3, -2, -1, 1, 2, 3, 4])
    const q = randomInt(random, -3, 9)
    const answer = fraction(q - p * p)
    const choices = options(random, answer, [whole(p, 'x-not-value'), whole(q + p * p, 'sign'), whole(q, 'calculation')])
    const f = `f(x)=x^2${term(-2 * p, 'x')}${signed(q)}`
    return choices && build(1, 'min-value', say(`Zenbat da ${math(f)} funtzioaren minimoaren balioa?`, `¿Cuánto vale el mínimo de ${math(f)}?`, `كم تساوي القيمة الصغرى للدالة ${math(f)}؟`, `What is the minimum value of ${math(f)}?`), choices, answer, same(`x=${p}\\ \\to\\ f(${p})=${q - p * p}`), { p, q })
}

/** f″(a) of x³ + bx² + cx: 6a + 2b */
function secondQuestion(random: Random): BachApplicationsRaceQuestion | null {
    const b = randomInt(random, -4, 4)
    const c = randomInt(random, -5, 5)
    const a = pick(random, [-2, -1, 1, 2, 3])
    const answer = fraction(6 * a + 2 * b)
    const choices = options(random, answer, [whole(3 * a * a + 2 * b * a + c, 'first'), whole(3 * a + 2 * b, 'calculation'), whole(-(6 * a + 2 * b), 'sign')])
    const f = `f(x)=x^3${term(b, 'x^2')}${term(c, 'x')}`
    return choices && build(1, 'second', say(`${math(f)} bada, kalkulatu ${math(`f''(${a})`)}.`, `Si ${math(f)}, calcula ${math(`f''(${a})`)}.`, `إذا كانت ${math(f)} فاحسب ${math(`f''(${a})`)}.`, `If ${math(f)}, work out ${math(`f''(${a})`)}.`), choices, answer, same(`f''(x)=6x${signed(2 * b)}\\ \\to\\ f''(${a})=${6 * a + 2 * b}`), { a, b, c })
}

/* ---------- Circuit 2: concavity ---------- */

/** x³ + 3px² + cx has its inflection at −p */
function inflectionXQuestion(random: Random): BachApplicationsRaceQuestion | null {
    const p = pick(random, [-3, -2, -1, 1, 2, 3])
    const c = randomInt(random, -4, 4)
    const answer = fraction(-p)
    const choices = options(random, answer, [whole(p, 'sign'), whole(-2 * p, 'first'), whole(3 * p, 'calculation')])
    const f = `f(x)=x^3${term(3 * p, 'x^2')}${term(c, 'x')}`
    return choices && build(2, 'inflection-x', say(`Aurkitu ${math(f)} funtzioaren inflexio-puntuaren ${math('x')} abszisa.`, `Halla la ${math('x')} del punto de inflexión de ${math(f)}.`, `أوجد الإحداثي ${math('x')} لنقطة انعطاف ${math(f)}.`, `Find the ${math('x')} of the point of inflection of ${math(f)}.`), choices, answer, same(`f''(x)=6x${signed(6 * p)}=0\\ \\to\\ x=${-p}`), { p, c })
}

/** x³ − 3px² + q has its inflection at (p, q − 2p³) */
function inflectionYQuestion(random: Random): BachApplicationsRaceQuestion | null {
    const p = pick(random, [-2, -1, 1, 2])
    const q = randomInt(random, -5, 5)
    const y = q - 2 * p ** 3
    const answer = fraction(y)
    const choices = options(random, answer, [whole(p, 'x-not-value'), whole(q, 'calculation'), whole(q + 2 * p ** 3, 'sign')])
    const f = `f(x)=x^3${term(-3 * p, 'x^2')}${signed(q)}`
    return choices && build(2, 'inflection-y', say(`Aurkitu ${math(f)} funtzioaren inflexio-puntuaren ${math('y')} ordenatua.`, `Halla la ${math('y')} del punto de inflexión de ${math(f)}.`, `أوجد الإحداثي ${math('y')} لنقطة انعطاف ${math(f)}.`, `Find the ${math('y')} of the point of inflection of ${math(f)}.`), choices, answer, same(`x=${p}\\ \\to\\ f(${p})=${y}`), { p, q })
}

/** x³ + ax² has its inflection at p when a = −3p */
function inflectionParameterQuestion(random: Random): BachApplicationsRaceQuestion | null {
    const p = pick(random, [-3, -2, -1, 1, 2, 3])
    const answer = fraction(-3 * p)
    const choices = options(random, answer, [ratio(-3 * p, 2, 'first'), whole(3 * p, 'sign'), whole(-6 * p, 'calculation')])
    const f = 'f(x)=x^3+ax^2'
    return choices && build(2, 'inflection-a', say(`${math(f)} funtzioak inflexio-puntu bat du ${math(`x=${p}`)} puntuan. Aurkitu ${math('a')}.`, `${math(f)} tiene un punto de inflexión en ${math(`x=${p}`)}. Halla ${math('a')}.`, `للدالة ${math(f)} نقطة انعطاف عند ${math(`x=${p}`)}. أوجد ${math('a')}.`, `${math(f)} has a point of inflection at ${math(`x=${p}`)}. Find ${math('a')}.`), choices, answer, same(`f''(${p})=${6 * p}+2a=0\\ \\to\\ a=${-3 * p}`), { p })
}

/* ---------- Circuit 3: optimisation ---------- */

/** Two numbers adding up to S: the greatest product is S²/4 */
function productQuestion(random: Random): BachApplicationsRaceQuestion | null {
    const s = pick(random, [6, 8, 10, 12, 14, 16, 18, 20])
    const answer = fraction((s * s) / 4)
    const choices = options(random, answer, [whole(s / 2, 'x-not-value'), whole((s * s) / 2, 'calculation'), whole(s, 'value')])
    return choices && build(3, 'product', say(`Bi zenbakiren batura ${s} da. Zein da haien biderkadurarik handiena?`, `Dos números suman ${s}. ¿Cuál es el mayor producto posible?`, `مجموع عددين ${s}. ما أكبر جداء ممكن لهما؟`, `Two numbers add up to ${s}. What is the greatest possible product?`), choices, answer, same(`P(x)=x(${s}-x)\\ \\to\\ x=${s / 2}\\ \\to\\ P=${(s * s) / 4}`), { s })
}

/** The absolute maximum of x² − 2px on [0, b], b > 2p: f(b) = b² − 2pb */
function absoluteQuestion(random: Random): BachApplicationsRaceQuestion | null {
    const p = randomInt(random, 1, 3)
    const b = 2 * p + randomInt(random, 1, 3)
    const answer = fraction(b * b - 2 * p * b)
    const choices = options(random, answer, [whole(-p * p, 'ends'), whole(b, 'x-not-value'), whole(0, 'calculation')])
    const f = `f(x)=x^2-${2 * p}x`
    return choices && build(3, 'absolute', say(`Aurkitu ${math(f)} funtzioaren maximo absolutua ${math(`[0,\\,${b}]`)} tartean.`, `Halla el máximo absoluto de ${math(f)} en ${math(`[0,\\,${b}]`)}.`, `أوجد القيمة العظمى المطلقة للدالة ${math(f)} في ${math(`[0,\\,${b}]`)}.`, `Find the absolute maximum of ${math(f)} on ${math(`[0,\\,${b}]`)}.`), choices, answer, same(`f(0)=0\\quad f(${p})=${-p * p}\\quad f(${b})=${b * b - 2 * p * b}`), { p, b })
}

/** The greatest profit of −x² + 2px − q: p² − q */
function profitQuestion(random: Random): BachApplicationsRaceQuestion | null {
    const p = pick(random, [5, 6, 8, 10, 12, 15])
    const q = pick(random, [10, 20, 25, 30, 50])
    if (p * p <= q) return null
    const answer = fraction(p * p - q)
    const choices = options(random, answer, [whole(p, 'x-not-value'), whole(p * p, 'calculation'), whole(p * p + q, 'sign')])
    const B = `B(x)=-x^2+${2 * p}x-${q}`
    return choices && build(3, 'profit', say(`${math(B)} bada, zein da mozkinik handiena?`, `Si ${math(B)}, ¿cuál es el beneficio máximo?`, `إذا كان ${math(B)} فما الربح الأكبر؟`, `If ${math(B)}, what is the greatest profit?`), choices, answer, same(`x=${p}\\ \\to\\ B(${p})=${p * p - q}`), { p, q })
}

/* ---------- Circuit 4: sketching ---------- */

const COUNTS: Array<{ latex: string; extrema: number; zeros: number }> = [
    { latex: 'x^3-3x', extrema: 2, zeros: 2 },
    { latex: 'x^3+3x', extrema: 0, zeros: 0 },
    { latex: 'x^3', extrema: 0, zeros: 1 },
    { latex: 'x^4', extrema: 1, zeros: 1 },
    { latex: 'x^4-2x^2', extrema: 3, zeros: 3 },
    { latex: 'x^4-4x^3', extrema: 1, zeros: 2 },
    { latex: '3x^4-4x^3', extrema: 1, zeros: 2 },
    { latex: 'x^2e^x', extrema: 2, zeros: 2 }
]

/** How many local extrema; the trap counts the zeros of f′ */
function countQuestion(random: Random): BachApplicationsRaceQuestion | null {
    const index = randomInt(random, 0, COUNTS.length - 1)
    const item = COUNTS[index]
    const answer = fraction(item.extrema)
    const choices = options(random, answer, [whole(item.zeros, 'zeros'), whole(item.extrema + 1, 'calculation'), whole(Math.max(0, item.extrema - 1), 'calculation')])
    const f = `f(x)=${item.latex}`
    return choices && build(4, 'count', say(`Zenbat mutur erlatibo ditu ${math(f)} funtzioak?`, `¿Cuántos extremos relativos tiene ${math(f)}?`, `كم قيمة قصوى محلية للدالة ${math(f)}؟`, `How many local extrema does ${math(f)} have?`), choices, answer, say('Zenbatu $f\'$ deribatuaren zeinu-aldaketak.', 'Cuenta los cambios de signo de $f\'$.', 'عُدّ تغيرات إشارة $f\'$.', 'Count the changes of sign of $f\'$.'), { index })
}

/** The vertical asymptote of (x + c)/(x − a) is x = a */
function asymptoteQuestion(random: Random): BachApplicationsRaceQuestion | null {
    const a = pick(random, [-4, -3, -2, -1, 1, 2, 3, 4])
    const c = pick(random, [-5, -3, -1, 1, 2, 5].filter((value) => value !== -a))
    const answer = fraction(a)
    const choices = options(random, answer, [whole(-a, 'sign'), whole(-c, 'numerator'), whole(1, 'calculation')])
    const f = `f(x)=\\frac{x${signed(c)}}{x${signed(-a)}}`
    return choices && build(4, 'asymptote', say(`${math(f)} funtzioaren asintota bertikala ${math('x=k')} da. Aurkitu ${math('k')}.`, `La asíntota vertical de ${math(f)} es ${math('x=k')}. Halla ${math('k')}.`, `المقارب الرأسي للدالة ${math(f)} هو ${math('x=k')}. أوجد ${math('k')}.`, `The vertical asymptote of ${math(f)} is ${math('x=k')}. Find ${math('k')}.`), choices, answer, same(`x${signed(-a)}=0\\ \\to\\ x=${a}`), { a, c })
}

/** x·eᵏˣ has its minimum at −1/k */
function expQuestion(random: Random): BachApplicationsRaceQuestion | null {
    const k = pick(random, [1, 2, 3, 4])
    const answer = fraction(-1, k)
    const choices = options(random, answer, [ratio(1, k, 'sign'), whole(-k, 'calculation'), whole(0, 'zeros')])
    const f = `f(x)=x\\,e^{${k === 1 ? '' : k}x}`
    return choices && build(4, 'exp-min', say(`Aurkitu ${math(f)} funtzioaren minimoaren ${math('x')} abszisa.`, `Halla la ${math('x')} del mínimo de ${math(f)}.`, `أوجد الإحداثي ${math('x')} للقيمة الصغرى في ${math(f)}.`, `Find the ${math('x')} of the minimum of ${math(f)}.`), choices, answer, same(`f'(x)=(1${signed(k)}x)\\,e^{${k === 1 ? '' : k}x}=0\\ \\to\\ x=${k === 1 ? '-1' : `-\\frac{1}{${k}}`}`.replace('(1+1x)', '(1+x)')), { k })
}

const circuitGenerators: Array<Array<(random: Random, tier: Tier) => BachApplicationsRaceQuestion | null>> = [
    [turnQuestion, riseQuestion, parameterQuestion],
    [maxQuestion, minQuestion, secondQuestion],
    [inflectionXQuestion, inflectionYQuestion, inflectionParameterQuestion],
    [productQuestion, absoluteQuestion, profitQuestion],
    [countQuestion, asymptoteQuestion, expQuestion]
]

export function generateBachApplicationsRaceQuestion(random: Random, circuit: number, tier: Tier): BachApplicationsRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkBachApplicationsPitAnswer(question: RaceQuestion<BachApplicationsRaceError>, input: string): AnswerCheck {
    return checkAnswer(input, question.answer, question.answerForm)
}

export function bachApplicationsParTime(circuit: number): number {
    return parTimeFor([12, 13, 13, 13, 12][circuit] ?? 13)
}

export const bachApplicationsRaceErrorTips: Record<BachApplicationsRaceError, LocalizedText> = {
    sign: say('Kontuz zeinuarekin.', 'Cuidado con el signo.', 'انتبه للإشارة.', 'Watch the sign.'),
    value: say('Hori f(x) da; galdera x da.', 'Eso es f(x); se pregunta la x.', 'هذه f(x)؛ والسؤال عن x.', 'That is f(x); the question asks for x.'),
    'x-not-value': say('Hori x da; galdera balioa da: ordezkatu funtzioan.', 'Eso es la x; se pregunta el valor: sustituye en la función.', 'هذه x؛ والسؤال عن القيمة: عوّض في الدالة.', 'That is x; the question asks for the value: substitute in the function.'),
    square: say('Ebatzi x² = p²: x = ±p, ez p².', 'Resuelve x² = p²: x = ±p, no p².', 'حلّ x² = p²: x = ±p لا p².', 'Solve x² = p²: x = ±p, not p².'),
    discriminant: say('Diskriminatzailea b² − 4ac da; f′ = 3x² + 2bx + a.', 'El discriminante es b² − 4ac; f′ = 3x² + 2bx + a.', 'المميز b² − 4ac، و f′ = 3x² + 2bx + a.', 'The discriminant is b² − 4ac; f′ = 3x² + 2bx + a.'),
    kind: say('f″ < 0 maximoa da; f″ > 0, minimoa.', 'f″ < 0 es máximo; f″ > 0, mínimo.', 'f″ < 0 قيمة عظمى، و f″ > 0 قيمة صغرى.', 'f″ < 0 is a maximum; f″ > 0, a minimum.'),
    first: say('Hori f′ da; hemen f″ behar da.', 'Eso es f′; aquí hace falta f″.', 'هذه f′؛ وهنا نحتاج f″.', 'That is f′; here you need f″.'),
    ends: say('[a, b] tartean, konparatu ertzak ere.', 'En [a, b], compara también los bordes.', 'في [a, b] قارن الطرفين أيضًا.', 'On [a, b], compare the edges too.'),
    zeros: say('f′ = 0 ez da nahikoa: zeinuak aldatu behar du.', 'f′ = 0 no basta: el signo tiene que cambiar.', 'لا يكفي f′ = 0: يجب أن تتغير الإشارة.', 'f′ = 0 is not enough: the sign has to change.'),
    numerator: say('Asintota bertikala izendatzailearen zeroa da.', 'La asíntota vertical es el cero del denominador.', 'المقارب الرأسي صفر المقام.', 'The vertical asymptote is the zero of the denominator.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}
