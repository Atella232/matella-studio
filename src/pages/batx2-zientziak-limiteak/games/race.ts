import { checkAnswer, fraction, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { written } from '../../batx1-zientziak-errealak/games/race.ts'
import { same as sameText, say } from '../../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   Limiteen lasterketa · Batxilergoa 2 (Carrera de límites de 2.º): five
   circuits, one per stage — the review (0/0 by factorising, ∞/∞, the
   conjugate at +∞), the definition (the δ of a line, the K of a limit at
   infinity, a limit at −∞ with a root), the notable limits (sin px / qx,
   the a of eᵃ, an exponential over a power), continuity (a parameter
   with an exponential and a sine, a parameter between two polynomials,
   two parameters) and the theorems (the integers around a root, how many
   roots Bolzano ensures, a maximum by Weierstrass). The wrong options are
   the typical mistakes; every question carries `meta`, the numbers the
   tests check it against.
   ========================================================================== */

export const BACH2_LIMITS_RACE_CIRCUITS = 5

export type Bach2LimitsRaceError =
    | 'factor'
    | 'inverse'
    | 'half'
    | 'slope'
    | 'distance'
    | 'sign'
    | 'inside'
    | 'add'
    | 'order'
    | 'piece'
    | 'joint'
    | 'ends'
    | 'count'
    | 'vertex'
    | 'calculation'

export type Bach2LimitsRaceQuestion = RaceQuestion<Bach2LimitsRaceError> & { meta: Record<string, number> }

const same = (latex: string): LocalizedText => sameText(`$${latex}$`)
const math = (latex: string) => `$${latex}$`
const signed = (value: number) => (value < 0 ? `-${-value}` : `+${value}`)
const dec = (value: number) => String(Math.round(value * 1000) / 1000).replace('.', '{,}')

interface Candidate {
    value: FractionValue
    error: Bach2LimitsRaceError
}
const whole = (value: number, error: Bach2LimitsRaceError): Candidate => ({ value: fraction(Math.round(value) + 0), error })
const ratio = (p: number, q: number, error: Bach2LimitsRaceError): Candidate => ({ value: fraction(p, q), error })
const exact = (value: number, error: Bach2LimitsRaceError): Candidate => ({ value: fraction(Math.round(value * 10000), 10000), error })
const nearby = (value: number): Candidate[] => [value + 1, value - 1, value + 2, value * 2].map((item) => exact(item, 'calculation'))

/** The right option and three different mistakes */
function options(random: Random, right: FractionValue, candidates: Candidate[]): RaceOption<Bach2LimitsRaceError>[] | null {
    const rightLatex = written(right)
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: Bach2LimitsRaceError }> = []
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

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<Bach2LimitsRaceError>[], answer: FractionValue, solution: LocalizedText, meta: Record<string, number>): Bach2LimitsRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution, meta }
}

const work = (formula: string) => say(`Kalkulatu ${math(formula)}.`, `Calcula ${math(formula)}.`, `احسب ${math(formula)}.`, `Work out ${math(formula)}.`)
const powerOfE = (formula: string) => say(`${math(`${formula}=e^a`)}. Zenbat da $a$?`, `${math(`${formula}=e^a`)}. ¿Cuánto vale $a$?`, `${math(`${formula}=e^a`)}. كم تساوي $a$؟`, `${math(`${formula}=e^a`)}. What is $a$?`)

/* ---------- Circuit 0: review of 1.º ---------- */

/** (x² − a²)/(x − a) at a: 2a */
function factorQuestion(random: Random): Bach2LimitsRaceQuestion | null {
    const a = randomInt(random, 1, 7)
    const answer = fraction(2 * a)
    const choices = options(random, answer, [whole(0, 'factor'), whole(a, 'factor'), whole(a * a, 'calculation')])
    return choices && build(0, 'factor', work(`\\lim_{x\\to ${a}}\\frac{x^2-${a * a}}{x-${a}}`), choices, answer, same(`x+${a}\\ \\to\\ ${2 * a}`), { a })
}

/** (p x² + 1)/(q x² − x) at +∞: p/q */
function degreesQuestion(random: Random): Bach2LimitsRaceQuestion | null {
    const p = randomInt(random, 1, 9)
    const q = randomInt(random, 2, 6)
    if (p === q) return null
    const answer = fraction(p, q)
    const choices = options(random, answer, [ratio(q, p, 'inverse'), whole(0, 'order'), whole(p, 'calculation')])
    return choices && build(0, 'degrees', work(`\\lim_{x\\to+\\infty}\\frac{${p}x^2+1}{${q}x^2-x}`), choices, answer, same(`\\frac{${p}x^2}{${q}x^2}=\\frac{${p}}{${q}}`), { p, q })
}

/** √(x² + px) − x at +∞: p/2 */
function conjugateQuestion(random: Random): Bach2LimitsRaceQuestion | null {
    const p = randomInt(random, 1, 10)
    const answer = fraction(p, 2)
    const choices = options(random, answer, [whole(p, 'half'), whole(0, 'calculation'), ratio(1, p, 'inverse')])
    return choices && build(0, 'conjugate', work(`\\lim_{x\\to+\\infty}\\left(\\sqrt{x^2+${p}x}-x\\right)`), choices, answer, same(`\\frac{${p}x}{\\sqrt{x^2+${p}x}+x}\\ \\to\\ \\frac{${p}}{2}`), { p })
}

/* ---------- Circuit 1: the exact definition ---------- */

/** The largest δ for lim (mx + c) and an ε: ε/m */
function deltaQuestion(random: Random): Bach2LimitsRaceQuestion | null {
    const m = pick(random, [2, 4, 5])
    const a = randomInt(random, 1, 3)
    const c = randomInt(random, -3, 3)
    const epsilon = pick(random, [0.1, 0.2, 0.4, 0.5, 1])
    const answer = fraction(Math.round((epsilon / m) * 1000), 1000)
    const limit = m * a + c
    const choices = options(random, answer, [exact(epsilon, 'slope'), exact(epsilon * m, 'slope'), exact(epsilon / (2 * m), 'calculation')])
    return choices && build(1, 'delta', say(`${math(`\\lim_{x\\to ${a}}(${m}x${c === 0 ? '' : signed(c)})=${limit}`)} eta ${math(`\\varepsilon=${dec(epsilon)}`)}: zein da $\\delta$ handiena?`, `${math(`\\lim_{x\\to ${a}}(${m}x${c === 0 ? '' : signed(c)})=${limit}`)} y ${math(`\\varepsilon=${dec(epsilon)}`)}: ¿cuál es el mayor $\\delta$?`, `${math(`\\lim_{x\\to ${a}}(${m}x${c === 0 ? '' : signed(c)})=${limit}`)} و${math(`\\varepsilon=${dec(epsilon)}`)}: ما أكبر $\\delta$؟`, `${math(`\\lim_{x\\to ${a}}(${m}x${c === 0 ? '' : signed(c)})=${limit}`)} and ${math(`\\varepsilon=${dec(epsilon)}`)}: what is the largest $\\delta$?`), choices, answer, same(`\\delta=${dec(epsilon)}\\div ${m}=${dec(epsilon / m)}`), { m, a, c, epsilon })
}

/** lim (cx + d)/x = c: from which K is the distance d/x below ε */
function kQuestion(random: Random): Bach2LimitsRaceQuestion | null {
    const c = randomInt(random, 1, 5)
    const d = randomInt(random, 1, 5)
    const epsilon = pick(random, [0.1, 0.5, 0.01])
    const k = Math.round(d / epsilon)
    const answer = fraction(k)
    const choices = options(random, answer, [exact(d * epsilon, 'distance'), whole(Math.round(1 / epsilon), 'distance'), whole(k * 10, 'calculation')])
    return choices && build(1, 'k', say(`${math(`\\lim_{x\\to+\\infty}\\frac{${c}x+${d}}{x}=${c}`)}. Zein $K$ baliotik aurrera dago ${math(`${dec(epsilon)}`)} baino gutxiagora?`, `${math(`\\lim_{x\\to+\\infty}\\frac{${c}x+${d}}{x}=${c}`)}. ¿Desde qué $K$ dista menos de ${math(`${dec(epsilon)}`)}?`, `${math(`\\lim_{x\\to+\\infty}\\frac{${c}x+${d}}{x}=${c}`)}. ابتداءً من أي $K$ تصبح المسافة أقل من ${math(`${dec(epsilon)}`)}؟`, `${math(`\\lim_{x\\to+\\infty}\\frac{${c}x+${d}}{x}=${c}`)}. From which $K$ is it less than ${math(`${dec(epsilon)}`)} away?`), choices, answer, same(`\\frac{${d}}{x}<${dec(epsilon)}\\ \\to\\ x>${k}`), { c, d, epsilon })
}

/** px/√(x² + q) at −∞: −p */
function minusQuestion(random: Random): Bach2LimitsRaceQuestion | null {
    const p = randomInt(random, 1, 6)
    const q = randomInt(random, 1, 9)
    const answer = fraction(-p)
    const choices = options(random, answer, [whole(p, 'sign'), whole(0, 'calculation'), ratio(-p, q, 'calculation')])
    return choices && build(1, 'minus', work(`\\lim_{x\\to-\\infty}\\frac{${p}x}{\\sqrt{x^2+${q}}}`), choices, answer, same(`\\sqrt{x^2}=-x\\ \\to\\ \\frac{${p}x}{-x}=-${p}`), { p, q })
}

/* ---------- Circuit 2: infinities and notable limits ---------- */

/** sin px / qx at 0: p/q */
function sineQuestion(random: Random): Bach2LimitsRaceQuestion | null {
    const p = randomInt(random, 2, 8)
    const q = randomInt(random, 1, 5)
    if (p === q) return null
    const answer = fraction(p, q)
    const choices = options(random, answer, [ratio(1, q, 'inside'), whole(1, 'inside'), ratio(q, p, 'inverse')])
    return choices && build(2, 'sine', work(`\\lim_{x\\to 0}\\frac{\\sin ${p}x}{${q === 1 ? '' : q}x}`), choices, answer, same(`\\frac{${p}}{${q}}\\cdot\\frac{\\sin ${p}x}{${p}x}\\ \\to\\ \\frac{${p}}{${q}}`), { p, q })
}

/** (1 + px)^(q/x) at 0: e^(pq) */
function eQuestion(random: Random): Bach2LimitsRaceQuestion | null {
    const p = randomInt(random, 1, 5)
    const q = randomInt(random, 1, 4)
    const answer = fraction(p * q)
    const choices = options(random, answer, [whole(p + q, 'add'), whole(0, 'calculation'), whole(p, 'calculation')])
    return choices && build(2, 'e', powerOfE(`\\lim_{x\\to 0}(1+${p === 1 ? '' : p}x)^{\\frac{${q}}{x}}`), choices, answer, same(`\\frac{${q}}{x}\\cdot ${p}x=${p * q}`), { p, q })
}

/** (p eˣ + x³)/(q eˣ + x) at +∞: p/q */
function ordersQuestion(random: Random): Bach2LimitsRaceQuestion | null {
    const p = randomInt(random, 1, 6)
    const q = randomInt(random, 2, 5)
    if (p === q) return null
    const answer = fraction(p, q)
    const choices = options(random, answer, [whole(0, 'order'), ratio(q, p, 'inverse'), whole(p, 'order')])
    return choices && build(2, 'orders', work(`\\lim_{x\\to+\\infty}\\frac{${p === 1 ? '' : p}e^x+x^3}{${q}e^x+x}`), choices, answer, same(`\\frac{${p === 1 ? '' : p}e^x}{${q}e^x}=\\frac{${p}}{${q}}`), { p, q })
}

/* ---------- Circuit 3: continuity in depth ---------- */

/** e^(px) + a for x ≤ 0 and sin qx / x for x > 0: a = q − 1 */
function expSineQuestion(random: Random): Bach2LimitsRaceQuestion | null {
    const p = randomInt(random, 1, 3)
    const q = randomInt(random, 2, 7)
    const answer = fraction(q - 1)
    const choices = options(random, answer, [whole(q, 'piece'), whole(q + 1, 'sign'), whole(1 - q, 'sign')])
    const formula = `f(x)=\\begin{cases}e^{${p === 1 ? '' : p}x}+a & x\\le 0\\\\ \\frac{\\sin ${q}x}{x} & x>0\\end{cases}`
    return choices && build(3, 'exp-sine', say(`Aurkitu $a$, jarraitua izan dadin: ${math(formula)}`, `Halla $a$ para que sea continua: ${math(formula)}`, `أوجد $a$ لتكون متصلة: ${math(formula)}`, `Find $a$ so that it is continuous: ${math(formula)}`), choices, answer, same(`1+a=${q}\\ \\to\\ a=${q - 1}`), { p, q })
}

/** x² + k for x < t and mx + c for x ≥ t: k = mt + c − t² */
function polyQuestion(random: Random): Bach2LimitsRaceQuestion | null {
    const t = randomInt(random, -2, 3)
    const m = pick(random, [-2, -1, 2, 3])
    const c = randomInt(random, -4, 4)
    const k = m * t + c - t * t
    const answer = fraction(k)
    const choices = options(random, answer, [whole(m * t + c, 'joint'), whole(t * t - m * t - c, 'sign'), whole(m + c - t * t, 'calculation')])
    const formula = `f(x)=\\begin{cases}x^2+k & x<${t}\\\\ ${m === -1 ? '-' : m}x${c === 0 ? '' : signed(c)} & x\\ge ${t}\\end{cases}`
    return choices && build(3, 'poly', say(`Aurkitu $k$, jarraitua izan dadin: ${math(formula)}`, `Halla $k$ para que sea continua: ${math(formula)}`, `أوجد $k$ لتكون متصلة: ${math(formula)}`, `Find $k$ so that it is continuous: ${math(formula)}`), choices, answer, same(`${t * t}+k=${m * t + c}\\ \\to\\ k=${k}`), { t, m, c })
}

/** x + a for x < 0, b for 0 ≤ x < 1, px + q for x ≥ 1: a = b = p + q, and a + b */
function twoQuestion(random: Random): Bach2LimitsRaceQuestion | null {
    const p = randomInt(random, 1, 4)
    const q = randomInt(random, -3, 3)
    const b = p + q
    const answer = fraction(2 * b)
    const choices = options(random, answer, [whole(b, 'joint'), whole(q, 'calculation'), whole(p - q, 'sign')])
    const formula = `f(x)=\\begin{cases}x+a & x<0\\\\ b & 0\\le x<1\\\\ ${p === 1 ? '' : p}x${q === 0 ? '' : signed(q)} & x\\ge 1\\end{cases}`
    return choices && build(3, 'two', say(`Jarraitua da. Kalkulatu $a+b$: ${math(formula)}`, `Es continua. Calcula $a+b$: ${math(formula)}`, `الدالة متصلة. احسب $a+b$: ${math(formula)}`, `It is continuous. Work out $a+b$: ${math(formula)}`), choices, answer, same(`b=${b}\\qquad a=b=${b}`), { p, q })
}

/* ---------- Circuit 4: the theorems ---------- */

/** x³ + x − q has its root between n and n + 1 */
function bolzanoQuestion(random: Random): Bach2LimitsRaceQuestion | null {
    const n = randomInt(random, 1, 3)
    const q = randomInt(random, n ** 3 + n + 1, (n + 1) ** 3 + n)
    const answer = fraction(n)
    const choices = options(random, answer, [whole(n + 1, 'ends'), whole(n - 1, 'ends'), whole(-n, 'sign')])
    return choices && build(4, 'bolzano', say(`${math(`f(x)=x^3+x-${q}`)}. Zein bi zenbaki oso jarraituren artean du erroa? Eman txikiena.`, `${math(`f(x)=x^3+x-${q}`)}. ¿Entre qué dos enteros consecutivos tiene su raíz? Da el menor.`, `${math(`f(x)=x^3+x-${q}`)}. بين أي عددين صحيحين متتاليين يقع جذرها؟ اكتب الأصغر.`, `${math(`f(x)=x^3+x-${q}`)}. Between which two consecutive integers is its root? Give the smaller.`), choices, answer, same(`f(${n})=${n ** 3 + n - q}\\qquad f(${n + 1})=${(n + 1) ** 3 + n + 1 - q}`), { n, q })
}

/** How many roots Bolzano ensures for x³ − bx + c on [−3, 3]: the sign changes at the integers */
function countQuestion(random: Random): Bach2LimitsRaceQuestion | null {
    const b = randomInt(random, 2, 6)
    const c = randomInt(random, -3, 3)
    const f = (x: number) => x ** 3 - b * x + c
    const values = [-3, -2, -1, 0, 1, 2, 3].map(f)
    if (values.some((value) => value === 0)) return null
    const count = values.slice(1).filter((value, index) => value * values[index] < 0).length
    if (count < 1) return null
    const answer = fraction(count)
    const choices = options(random, answer, [whole(3 - count === 0 ? 2 : 3, 'count'), whole(count === 1 ? 2 : 1, 'count'), whole(0, 'count')])
    return choices && build(4, 'count', say(`Bolzanoren arabera, gutxienez zenbat erro ditu ${math(`x^3-${b}x${c === 0 ? '' : signed(c)}`)} funtzioak ${math('[-3,3]')} tartean?`, `Por Bolzano, ¿cuántas raíces tiene como mínimo ${math(`x^3-${b}x${c === 0 ? '' : signed(c)}`)} en ${math('[-3,3]')}?`, `حسب بولتسانو، كم جذرًا على الأقل للدالة ${math(`x^3-${b}x${c === 0 ? '' : signed(c)}`)} في ${math('[-3,3]')}؟`, `By Bolzano, how many roots at least does ${math(`x^3-${b}x${c === 0 ? '' : signed(c)}`)} have in ${math('[-3,3]')}?`), choices, answer, same(values.map((value) => String(value)).join(',\\ ')), { b, c })
}

/** The absolute maximum of x² + px on [α, β]: at an end */
function maxQuestion(random: Random): Bach2LimitsRaceQuestion | null {
    const p = pick(random, [-4, -2, 2, 4])
    const alpha = randomInt(random, -4, 0)
    const beta = randomInt(random, 1, 4)
    const f = (x: number) => x * x + p * x
    const vertex = -p / 2
    if (vertex < alpha || vertex > beta) return null
    const best = Math.max(f(alpha), f(beta))
    const answer = fraction(best)
    const choices = options(random, answer, [whole(f(vertex), 'vertex'), whole(Math.min(f(alpha), f(beta)), 'ends'), whole(beta * beta, 'calculation')])
    return choices && build(4, 'max', say(`Zein da ${math(`x^2${signed(p)}x`)} funtzioaren maximo absolutua ${math(`[${alpha},${beta}]`)} tartean?`, `¿Cuál es el máximo absoluto de ${math(`x^2${signed(p)}x`)} en ${math(`[${alpha},${beta}]`)}?`, `ما القيمة العظمى المطلقة لـ ${math(`x^2${signed(p)}x`)} على ${math(`[${alpha},${beta}]`)}؟`, `What is the absolute maximum of ${math(`x^2${signed(p)}x`)} on ${math(`[${alpha},${beta}]`)}?`), choices, answer, same(`f(${alpha})=${f(alpha)}\\qquad f(${beta})=${f(beta)}`), { p, alpha, beta })
}

const circuitGenerators: Array<Array<(random: Random, tier: Tier) => Bach2LimitsRaceQuestion | null>> = [
    [factorQuestion, degreesQuestion, conjugateQuestion],
    [deltaQuestion, kQuestion, minusQuestion],
    [sineQuestion, eQuestion, ordersQuestion],
    [expSineQuestion, polyQuestion, twoQuestion],
    [bolzanoQuestion, countQuestion, maxQuestion]
]

export function generateBach2LimitsRaceQuestion(random: Random, circuit: number, tier: Tier): Bach2LimitsRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkBach2LimitsPitAnswer(question: RaceQuestion<Bach2LimitsRaceError>, input: string): AnswerCheck {
    return checkAnswer(input, question.answer, question.answerForm)
}

export function bach2LimitsParTime(circuit: number): number {
    return parTimeFor([13, 14, 13, 15, 14][circuit] ?? 13)
}

export const bach2LimitsRaceErrorTips: Record<Bach2LimitsRaceError, LocalizedText> = {
    factor: say('0/0: faktorizatu eta sinplifikatu, gero ordezkatu.', '0/0: factoriza y simplifica, después sustituye.', '0/0: حلّل واختصر ثم عوّض.', '0/0: factorise and cancel, then substitute.'),
    inverse: say('Zatidura alderantziz idatzi duzu.', 'Has escrito el cociente al revés.', 'كتبت خارج القسمة معكوسًا.', 'You wrote the quotient upside down.'),
    half: say('Konjokatuaren ondoren, behean 2x geratzen da: zatitu 2 zenbakiaz.', 'Tras el conjugado queda 2x abajo: divide entre 2.', 'بعد المرافق يبقى 2x في المقام: اقسم على 2.', 'After the conjugate, 2x is left below: divide by 2.'),
    slope: say('δ = ε zati malda.', 'δ = ε entre la pendiente.', 'δ = ε مقسومة على الميل.', 'δ = ε divided by the slope.'),
    distance: say('Distantzia d/x da: d/x < ε denean, x > d/ε.', 'La distancia es d/x: d/x < ε cuando x > d/ε.', 'المسافة d/x: ‏d/x < ε عندما x > d/ε.', 'The distance is d/x: d/x < ε when x > d/ε.'),
    sign: say('Kontuz zeinuarekin.', 'Cuidado con el signo.', 'انتبه للإشارة.', 'Watch the sign.'),
    inside: say('sin px / x → p: barruko zenbakia ez ahaztu.', 'sen px / x → p: no olvides el número de dentro.', 'sin px / x → p: لا تنس العدد في الداخل.', 'sin px / x → p: do not forget the number inside.'),
    add: say('Berretzaileak biderkatzen dira, ez batzen.', 'Los exponentes se multiplican, no se suman.', 'تُضرب الأسس ولا تُجمع.', 'The exponents multiply, they do not add.'),
    order: say('eˣ gaiak agintzen du goian eta behean: koefizienteak zatitu.', 'Manda eˣ arriba y abajo: divide los coeficientes.', 'يتحكم eˣ في البسط والمقام: اقسم المعاملين.', 'eˣ rules on top and below: divide the coefficients.'),
    piece: say('Ezkerreko zatiak 1 + a ematen du x = 0 puntuan, ez a.', 'El trozo de la izquierda da 1 + a en x = 0, no a.', 'يعطي الجزء الأيسر 1 + a عند x = 0 لا a.', 'The left piece gives 1 + a at x = 0, not a.'),
    joint: say('Lotunean bi zatiek balio bera eman behar dute.', 'En la unión los dos trozos tienen que dar lo mismo.', 'عند الالتقاء يجب أن يعطي الجزآن القيمة نفسها.', 'Where they join, both pieces must give the same value.'),
    ends: say('Erroa zeinua aldatzen den lekuan dago.', 'La raíz está donde cambia el signo.', 'الجذر حيث تتغير الإشارة.', 'The root is where the sign changes.'),
    count: say('Kontatu zeinu-aldaketak zenbaki oso jarraituen artean.', 'Cuenta los cambios de signo entre enteros consecutivos.', 'عدّ تغيّرات الإشارة بين الأعداد الصحيحة المتتالية.', 'Count the changes of sign between consecutive integers.'),
    vertex: say('Parabola gorantz irekitzen da: erpina minimoa da, maximoa muturrean dago.', 'La parábola se abre hacia arriba: el vértice es el mínimo, el máximo está en un extremo.', 'القطع مفتوح إلى الأعلى: الرأس هو الصغرى والعظمى عند طرف.', 'The parabola opens upwards: the vertex is the minimum, the maximum is at an end.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}
