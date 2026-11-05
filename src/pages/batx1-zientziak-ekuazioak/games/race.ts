import { checkAnswer, fraction, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { written } from '../../batx1-zientziak-errealak/games/race.ts'
import { polyLatex } from '../../dbh4-games/polynomials.ts'

/* ==========================================================================
   Ekuazioen lasterketa (Batxilergoa 1 · Zientziak): five circuits, one per
   stage — polynomials (a remainder, the one real root, a parameter),
   polynomial equations (the largest root of a cubic, how many solutions
   a biquadratic has, x⁶ with t = x³), radicals and absolute values (a
   radical equation, the sum of the solutions of |x − a| = c, the largest
   solution of |ax − b| = c), exponentials and logarithms (the same base,
   t = 2ˣ, a logarithm) and inequalities (how many integers, with an
   absolute value, the largest integer of a quotient). The wrong options
   are the typical mistakes. Every question carries `meta`, the numbers
   the tests check it against.
   ========================================================================== */

export const BACH_EQUATIONS_RACE_CIRCUITS = 5

export type BachEquationsRaceError =
    | 'sign'
    | 'constant'
    | 'order'
    | 'negative-t'
    | 'cube'
    | 'false-root'
    | 'one-case'
    | 'divide'
    | 'exponent'
    | 't-for-x'
    | 'log-times'
    | 'ends'
    | 'hole'
    | 'one-side'
    | 'calculation'

export type BachEquationsRaceQuestion = RaceQuestion<BachEquationsRaceError> & { meta: Record<string, number> }

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (latex: string): LocalizedText => ({ eu: `$${latex}$`, es: `$${latex}$`, en: `$${latex}$`, ar: `$${latex.replace(/\{,\}/g, '.')}$` })
const math = (latex: string) => `$${latex}$`
const signed = (value: number) => (value < 0 ? `-${-value}` : `+${value}`)
const binomial = (root: number) => (root === 0 ? 'x' : `x${signed(-root)}`)

interface Candidate {
    value: FractionValue
    error: BachEquationsRaceError
}
const whole = (value: number, error: BachEquationsRaceError): Candidate => ({ value: fraction(Math.round(value) + 0), error })
const ratio = (p: number, q: number, error: BachEquationsRaceError): Candidate => ({ value: fraction(p, q), error })
const nearby = (value: number): Candidate[] => [value + 1, value - 1, value + 2, value * 2].map((item) => ({ value: fraction(Math.round(item * 10000), 10000), error: 'calculation' as const }))

/** The right option and three different mistakes */
function options(random: Random, right: FractionValue, candidates: Candidate[]): RaceOption<BachEquationsRaceError>[] | null {
    const rightLatex = written(right)
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: BachEquationsRaceError }> = []
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

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<BachEquationsRaceError>[], answer: FractionValue, solution: LocalizedText, meta: Record<string, number>): BachEquationsRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution, meta }
}

const solveFor = (formula: string, what: LocalizedText) => say(`${math(formula)}. ${what.eu}`, `${math(formula)}. ${what.es}`, `${math(formula)}. ${what.ar}`, `${math(formula)}. ${what.en}`)
const LARGEST = say('Zein da soluziorik handiena?', '¿Cuál es la mayor solución?', 'ما أكبر حل؟', 'What is the largest solution?')
const SOLUTION = say('Zein da soluzioa?', '¿Cuál es la solución?', 'ما الحل؟', 'What is the solution?')
const HOW_MANY = say('Zenbat soluzio erreal ditu?', '¿Cuántas soluciones reales tiene?', 'كم حلًّا حقيقيًّا لها؟', 'How many real solutions does it have?')
const SUM = say('Zenbat da soluzioen batura?', '¿Cuánto suman las soluciones?', 'ما مجموع الحلول؟', 'What do the solutions add up to?')
const INTEGERS = say('Zenbat zenbaki osok betetzen dute?', '¿Cuántos números enteros la cumplen?', 'كم عددًا صحيحًا يحققها؟', 'How many integers satisfy it?')
const LARGEST_INTEGER = say('Zein da betetzen duen zenbaki osorik handiena?', '¿Cuál es el mayor número entero que la cumple?', 'ما أكبر عدد صحيح يحققها؟', 'What is the largest integer that satisfies it?')

/* ---------- Circuit 0: polynomials ---------- */

function remainderQuestion(random: Random): BachEquationsRaceQuestion | null {
    const p = randomInt(random, -3, 3)
    const q = randomInt(random, -5, 5)
    const r = randomInt(random, -6, 6)
    const a = pick(random, [-3, -2, -1, 1, 2, 3])
    const at = (x: number) => x ** 3 + p * x * x + q * x + r
    const answer = fraction(at(a))
    const choices = options(random, answer, [whole(at(-a), 'sign'), whole(r, 'constant'), whole(at(a) - r, 'calculation')])
    const poly = `P(x)=${polyLatex([1, p, q, r])}`
    return choices && build(0, 'remainder', say(`Zatitu ${math(poly)} polinomioa ${math(binomial(a))} binomioaz. Zein da hondarra?`, `Divide ${math(poly)} entre ${math(binomial(a))}. ¿Cuál es el resto?`, `اقسم ${math(poly)} على ${math(binomial(a))}. ما الباقي؟`, `Divide ${math(poly)} by ${math(binomial(a))}. What is the remainder?`), choices, answer, same(`R=P(${a})=${at(a)}`), { p, q, r, a })
}

/** (x − r)(x² + c) with c > 0: one real root */
function oneRootQuestion(random: Random): BachEquationsRaceQuestion | null {
    const root = pick(random, [-4, -3, -2, 2, 3, 4, 5])
    const c = randomInt(random, 1, 6)
    const answer = fraction(root)
    const choices = options(random, answer, [whole(-root, 'sign'), whole(-root * c, 'constant'), whole(c, 'calculation')])
    const poly = `P(x)=${polyLatex([1, -root, c, -root * c])}`
    return choices && build(0, 'one-root', say(`${math(poly)} polinomioak erro erreal bakarra du. Zein?`, `${math(poly)} tiene una sola raíz real. ¿Cuál?`, `للحدودية ${math(poly)} جذر حقيقي واحد. ما هو؟`, `${math(poly)} has only one real root. Which one?`), choices, answer, same(`P(x)=(${binomial(root)})(x^2+${c})`), { root, c })
}

/** k so that x² + kx + c is divisible by x − a */
function parameterQuestion(random: Random): BachEquationsRaceQuestion | null {
    const a = pick(random, [-3, -2, -1, 1, 2, 3])
    const k = randomInt(random, -5, 5)
    const c = -a * (a + k)
    if (k === 0 || c === 0) return null
    const answer = fraction(k)
    const choices = options(random, answer, [whole(-k, 'sign'), whole(c, 'constant'), whole(k + a, 'calculation')])
    const poly = `x^2+kx${signed(c)}`
    return choices && build(0, 'parameter', say(`${math(poly)} polinomioa ${math(binomial(a))} binomioaz zatigarria da. Zenbat da ${math('k')}?`, `${math(poly)} es divisible entre ${math(binomial(a))}. ¿Cuánto vale ${math('k')}?`, `${math(poly)} يقبل القسمة على ${math(binomial(a))}. كم تساوي ${math('k')}؟`, `${math(poly)} is divisible by ${math(binomial(a))}. What is ${math('k')}?`), choices, answer, same(`P(${a})=${a * a}${a === 1 ? '+' : a === -1 ? '-' : signed(a)}k${signed(c)}=0\\ \\to\\ k=${k}`), { a, c })
}

/* ---------- Circuit 1: polynomial equations ---------- */

function largestRootQuestion(random: Random): BachEquationsRaceQuestion | null {
    const roots = [randomInt(random, -4, 4), randomInt(random, -4, 4), randomInt(random, -3, 5)].sort((x, y) => x - y)
    if (new Set(roots).size < 3 || roots.includes(0)) return null
    const [r1, r2, r3] = roots
    const coefficients = [1, -(r1 + r2 + r3), r1 * r2 + r1 * r3 + r2 * r3, -r1 * r2 * r3]
    const answer = fraction(r3)
    const choices = options(random, answer, [whole(-r3, 'sign'), whole(r1, 'order'), whole(-r1 * r2 * r3, 'constant')])
    return choices && build(1, 'largest-root', solveFor(`${polyLatex(coefficients)}=0`, LARGEST), choices, answer, same(`(${binomial(r1)})(${binomial(r2)})(${binomial(r3)})=0`), { r1, r2, r3 })
}

/** x⁴ + bx² + c = 0 from the values of t = x² */
function biquadraticQuestion(random: Random): BachEquationsRaceQuestion | null {
    const t1 = pick(random, [-9, -4, -1, 0, 1, 4, 9])
    const t2 = pick(random, [-9, -4, -1, 1, 4, 9, 16])
    if (t1 >= t2) return null
    const count = [t1, t2].reduce((total, t) => total + (t > 0 ? 2 : t === 0 ? 1 : 0), 0)
    const answer = fraction(count)
    const others = [4, 2, 0, 1, 3].filter((n) => n !== count)
    const choices = options(random, answer, others.map((n) => whole(n, n === 4 ? 'negative-t' : 'calculation')))
    return choices && build(1, 'biquadratic', solveFor(`${polyLatex([1, 0, -(t1 + t2), 0, t1 * t2])}=0`, HOW_MANY), choices, answer, same(`t=x^2\\ \\to\\ t=${t1},\\ t=${t2}`), { t1, t2 })
}

/** x⁶ + bx³ + c = 0 with t = x³ */
function cubeChangeQuestion(random: Random): BachEquationsRaceQuestion | null {
    const p = pick(random, [-2, -1, 1, 2, 3])
    const q = pick(random, [-2, -1, 1, 2, 3])
    if (p >= q) return null
    const answer = fraction(q)
    const choices = options(random, answer, [whole(q ** 3, 'cube'), whole(-q, 'sign'), whole(p, 'order')])
    return choices && build(1, 'cube-change', solveFor(`${polyLatex([1, 0, 0, -(p ** 3 + q ** 3), 0, 0, p ** 3 * q ** 3])}=0`, LARGEST), choices, answer, same(`t=x^3\\ \\to\\ t=${p ** 3},\\ t=${q ** 3}\\ \\to\\ x=${p},\\ x=${q}`), { p, q })
}

/* ---------- Circuit 2: radicals and absolute values ---------- */

/** √(x + p) = x + q, squared: the roots r₁ and r₂, and only one of them is true */
function radicalQuestion(random: Random): BachEquationsRaceQuestion | null {
    const r1 = randomInt(random, -4, 6)
    const r2 = randomInt(random, -4, 6)
    if ((r1 + r2) % 2 === 0) return null
    const q = (1 - r1 - r2) / 2
    const p = q * q - r1 * r2
    if (p === 0 || q === 0 || Math.abs(p) > 12) return null
    const valid = [r1, r2].filter((value) => value + q >= 0)
    if (valid.length !== 1) return null
    const right = valid[0]
    const wrong = right === r1 ? r2 : r1
    const answer = fraction(right)
    const choices = options(random, answer, [whole(wrong, 'false-root'), whole(-right, 'sign'), whole(right + wrong, 'calculation')])
    return choices && build(2, 'radical', solveFor(`\\sqrt{x${signed(p)}}=x${signed(q)}`, SOLUTION), choices, answer, same(`x${signed(p)}=(x${signed(q)})^2\\ \\to\\ x=${r1},\\ x=${r2}`), { p, q })
}

function absoluteSumQuestion(random: Random): BachEquationsRaceQuestion | null {
    const a = pick(random, [-4, -3, -2, -1, 1, 2, 3, 4, 5])
    const c = randomInt(random, 1, 7)
    const answer = fraction(2 * a)
    const choices = options(random, answer, [whole(a + c, 'one-case'), whole(0, 'sign'), whole(2 * c, 'calculation')])
    return choices && build(2, 'absolute-sum', solveFor(`|${binomial(a)}|=${c}`, SUM), choices, answer, same(`x=${a + c},\\ x=${a - c}`), { a, c })
}

/** |ax − b| = c: x = (b ± c)/a */
function absoluteLargestQuestion(random: Random): BachEquationsRaceQuestion | null {
    const a = pick(random, [2, 3, 4])
    const b = randomInt(random, 1, 9)
    const c = randomInt(random, 1, 9)
    if (b === c || (b + c) % a !== 0) return null
    const answer = fraction(b + c, a)
    const choices = options(random, answer, [ratio(b - c, a, 'order'), whole(b + c, 'divide'), ratio(c - b, a, 'sign')])
    return choices && build(2, 'absolute-largest', solveFor(`|${a}x-${b}|=${c}`, LARGEST), choices, answer, same(`${a}x-${b}=\\pm ${c}\\ \\to\\ x=${written(answer)},\\ x=${written(fraction(b - c, a))}`), { a, b, c })
}

/* ---------- Circuit 3: exponentials and logarithms ---------- */

/** b^(mx + n) = b^k, written as a number */
function sameBaseQuestion(random: Random): BachEquationsRaceQuestion | null {
    const base = pick(random, [2, 3, 5])
    const m = randomInt(random, 2, 3)
    const n = randomInt(random, -3, 3)
    const x = randomInt(random, -1, 3)
    const k = m * x + n
    if (n === 0 || k < 1 || base ** k > 243) return null
    const answer = fraction(x)
    const choices = options(random, answer, [whole(k, 'exponent'), ratio(k + n, m, 'sign'), ratio(k, m, 'calculation')])
    return choices && build(3, 'same-base', solveFor(`${base}^{${m}x${signed(n)}}=${base ** k}`, SOLUTION), choices, answer, same(`${base ** k}=${base}^{${k}}\\ \\to\\ ${m}x${signed(n)}=${k}\\ \\to\\ x=${x}`), { base, m, n })
}

/** 4ˣ − (a + b)·2ˣ + ab = 0 with t = 2ˣ, a = 2ᵖ and b = 2^q */
function expChangeQuestion(random: Random): BachEquationsRaceQuestion | null {
    const p = randomInt(random, 0, 4)
    const q = randomInt(random, 0, 4)
    if (p >= q) return null
    const a = 2 ** p
    const b = 2 ** q
    const answer = fraction(q)
    const choices = options(random, answer, [whole(b, 't-for-x'), whole(p, 'order'), whole(p + q, 'calculation')])
    return choices && build(3, 'exp-change', solveFor(`4^x-${a + b}\\cdot 2^x+${a * b}=0`, LARGEST), choices, answer, same(`t=2^x\\ \\to\\ t=${a},\\ t=${b}\\ \\to\\ x=${p},\\ x=${q}`), { a, b })
}

/** log_b(x + a) = k: x = bᵏ − a */
function logQuestion(random: Random): BachEquationsRaceQuestion | null {
    const [base, k] = pick(random, [[2, 2], [2, 3], [2, 4], [2, 5], [3, 2], [3, 3], [3, 4], [5, 2], [10, 1], [10, 2]] as Array<[number, number]>)
    const a = pick(random, [-5, -3, -2, -1, 1, 2, 3, 4, 6])
    const answer = fraction(base ** k - a)
    const choices = options(random, answer, [whole(base * k - a, 'log-times'), whole(base ** k + a, 'sign'), whole(k ** base - a, 'calculation')])
    const log = base === 10 ? '\\log' : `\\log_{${base}}`
    return choices && build(3, 'log', solveFor(`${log}(${binomial(-a)})=${k}`, SOLUTION), choices, answer, same(`${binomial(-a)}=${base}^{${k}}\\ \\to\\ x=${base ** k - a}`), { base, k, a })
}

/* ---------- Circuit 4: inequalities ---------- */

function integersQuestion(random: Random): BachEquationsRaceQuestion | null {
    const a = randomInt(random, -6, 3)
    const b = randomInt(random, a + 2, a + 8)
    const strict = pick(random, [true, false])
    if (a === 0 || b === 0) return null
    const count = strict ? b - a - 1 : b - a + 1
    const answer = fraction(count)
    const choices = options(random, answer, [whole(strict ? b - a + 1 : b - a - 1, 'ends'), whole(b - a, 'ends'), whole(count + 2, 'calculation')])
    const interval = strict ? `(${a},${b})` : `[${a},${b}]`
    return choices && build(4, 'integers', solveFor(`(${binomial(a)})(${binomial(b)})${strict ? '<' : '\\le'}0`, INTEGERS), choices, answer, same(`${interval}\\ \\to\\ ${count}`), { a, b, strict: strict ? 1 : 0 })
}

function absoluteIntegersQuestion(random: Random): BachEquationsRaceQuestion | null {
    const a = randomInt(random, -4, 4)
    const c = randomInt(random, 2, 6)
    const strict = pick(random, [true, false])
    const count = strict ? 2 * c - 1 : 2 * c + 1
    const answer = fraction(count)
    const choices = options(random, answer, [whole(2 * c, 'ends'), whole(strict ? c - 1 : c + 1, 'one-side'), whole(strict ? 2 * c + 1 : 2 * c - 1, 'ends')])
    const interval = strict ? `(${a - c},${a + c})` : `[${a - c},${a + c}]`
    return choices && build(4, 'absolute-integers', solveFor(`|${binomial(a)}|${strict ? '<' : '\\le'}${c}`, INTEGERS), choices, answer, same(`${interval}\\ \\to\\ ${count}`), { a, c, strict: strict ? 1 : 0 })
}

/** (x − r)/(x − h) ≤ 0: between r and h, the root closed and the hole open */
function quotientMaxQuestion(random: Random): BachEquationsRaceQuestion | null {
    const r = randomInt(random, -5, 6)
    const h = randomInt(random, -5, 6)
    if (Math.abs(r - h) < 2) return null
    const largest = r > h ? r : h - 1
    const answer = fraction(largest)
    const choices = options(random, answer, r > h
        ? [whole(r - 1, 'ends'), whole(h, 'order'), whole(r + 1, 'calculation')]
        : [whole(h, 'hole'), whole(r, 'order'), whole(h - 2, 'calculation')])
    const interval = r > h ? `(${h},${r}]` : `[${r},${h})`
    return choices && build(4, 'quotient-max', solveFor(`\\frac{${binomial(r)}}{${binomial(h)}}\\le 0`, LARGEST_INTEGER), choices, answer, same(`${interval}\\ \\to\\ ${largest}`), { r, h })
}

const circuitGenerators: Array<Array<(random: Random, tier: Tier) => BachEquationsRaceQuestion | null>> = [
    [remainderQuestion, oneRootQuestion, parameterQuestion],
    [largestRootQuestion, biquadraticQuestion, cubeChangeQuestion],
    [radicalQuestion, absoluteSumQuestion, absoluteLargestQuestion],
    [sameBaseQuestion, expChangeQuestion, logQuestion],
    [integersQuestion, absoluteIntegersQuestion, quotientMaxQuestion]
]

export function generateBachEquationsRaceQuestion(random: Random, circuit: number, tier: Tier): BachEquationsRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkBachEquationsPitAnswer(question: RaceQuestion<BachEquationsRaceError>, input: string): AnswerCheck {
    return checkAnswer(input, question.answer, question.answerForm)
}

export function bachEquationsParTime(circuit: number): number {
    return parTimeFor([13, 14, 13, 13, 12][circuit] ?? 13)
}

export const bachEquationsRaceErrorTips: Record<BachEquationsRaceError, LocalizedText> = {
    sign: say('Kontuz zeinuarekin: x − a zatitzailearen erroa a da, ez −a.', 'Cuidado con el signo: la raíz de x − a es a, no −a.', 'انتبه للإشارة: جذر x − a هو a لا −a.', 'Watch the sign: the root of x − a is a, not −a.'),
    constant: say('Gai askea ez da emaitza: ordezkatu eta kalkulatu.', 'El término independiente no es la respuesta: sustituye y calcula.', 'الحد الثابت ليس الجواب: عوّض واحسب.', 'The constant term is not the answer: substitute and work it out.'),
    order: say('Hori soluziorik txikiena da: begiratu zer eskatzen den.', 'Esa es la solución más pequeña: mira qué se pide.', 'هذا أصغر حل: انظر إلى المطلوب.', 'That is the smallest solution: look at what is asked.'),
    'negative-t': say('t = x² negatiboa bada, ez du x errealik ematen.', 'Si t = x² es negativo, no da ningún x real.', 'إذا كان t = x² سالبًا فلا يعطي x حقيقيًّا.', 'If t = x² is negative, it gives no real x.'),
    cube: say('t = x³: x lortzeko, atera t-ren erro kubikoa.', 't = x³: para hallar x, saca la raíz cúbica de t.', 't = x³: لإيجاد x خذ الجذر التكعيبي لـ t.', 't = x³: to find x, take the cube root of t.'),
    'false-root': say('Karratura jasotzean soluzio faltsuak ager daitezke: egiaztatu.', 'Al elevar al cuadrado pueden salir soluciones falsas: comprueba.', 'التربيع قد يعطي حلولًا زائفة: تحقّق.', 'Squaring can give false solutions: check them.'),
    'one-case': say('|A| = c bi kasu dira: A = c eta A = −c.', '|A| = c son dos casos: A = c y A = −c.', '|A| = c حالتان: A = c وA = −c.', '|A| = c is two cases: A = c and A = −c.'),
    divide: say('Ez ahaztu x-ren koefizienteaz zatitzea.', 'No olvides dividir entre el coeficiente de x.', 'لا تنسَ القسمة على معامل x.', 'Do not forget to divide by the coefficient of x.'),
    exponent: say('Hori berretzailearen balioa da; orain askatu x.', 'Ese es el valor del exponente; ahora despeja x.', 'هذه قيمة الأس؛ الآن اعزل x.', 'That is the value of the exponent; now solve for x.'),
    't-for-x': say('Hori t = 2ˣ da; x lortzeko, 2ˣ = t.', 'Eso es t = 2ˣ; para hallar x, 2ˣ = t.', 'هذه t = 2ˣ؛ لإيجاد x حُلّ 2ˣ = t.', 'That is t = 2ˣ; to find x, solve 2ˣ = t.'),
    'log-times': say('logₐ A = k esan nahi du A = aᵏ, ez a·k.', 'logₐ A = k significa A = aᵏ, no a·k.', 'logₐ A = k تعني A = aᵏ لا a·k.', 'logₐ A = k means A = aᵏ, not a·k.'),
    ends: say('Begiratu muturrei: < irekia da, ≤ itxia.', 'Mira los extremos: < es abierto, ≤ es cerrado.', 'انظر إلى الطرفين: < مفتوح و≤ مغلق.', 'Look at the ends: < is open, ≤ is closed.'),
    hole: say('Izendatzailearen erroa ez da inoiz sartzen.', 'La raíz del denominador nunca entra.', 'جذر المقام لا يدخل أبدًا.', 'The root of the denominator is never included.'),
    'one-side': say('|x − a| < c bi aldetara doa: a − c eta a + c artean.', '|x − a| < c va a los dos lados: entre a − c y a + c.', '|x − a| < c من الجانبين: بين a − c وa + c.', '|x − a| < c goes both ways: between a − c and a + c.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}
