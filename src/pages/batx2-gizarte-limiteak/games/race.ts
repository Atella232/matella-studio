import { checkAnswer, fraction, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { written } from '../../batx1-zientziak-errealak/games/race.ts'
import { same as sameText, say } from '../../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   Limiteen lasterketa · Batxilergoa 2 · Gizarte Zientziak (Carrera de
   límites de 2.º Sociales): five circuits, one per stage — the graph and
   infinity (k + c/x, working with limits), limits at infinity (degrees,
   the conjugate, the a of eᵃ), limits at a point (substituting, 0/0 by
   factorising, 0/0 with a root), continuity (one parameter, the size of
   a jump, the value that mends a hole) and economy and society (the long
   run, the average cost, the charge with no jump). The wrong options are
   the typical mistakes; every question carries `meta`, the numbers the
   tests check it against.
   ========================================================================== */

export const BACH2G_LIMITS_RACE_CIRCUITS = 5

export type Bach2gLimitsRaceError =
    | 'vanish'
    | 'order'
    | 'inverse'
    | 'half'
    | 'add'
    | 'factor'
    | 'root'
    | 'piece'
    | 'jump'
    | 'initial'
    | 'fixed'
    | 'price'
    | 'calculation'

export type Bach2gLimitsRaceQuestion = RaceQuestion<Bach2gLimitsRaceError> & { meta: Record<string, number> }

const same = (latex: string): LocalizedText => sameText(`$${latex}$`)
const math = (latex: string) => `$${latex}$`
const signed = (value: number) => (value < 0 ? `-${-value}` : `+${value}`)
/** A coefficient of x with its sign, written without the 1: +3x, -x */
const signedX = (value: number) => (value === 1 ? '+x' : value === -1 ? '-x' : `${signed(value)}x`)
const dec = (value: number) => String(Math.round(value * 1000) / 1000).replace('.', '{,}')

interface Candidate {
    value: FractionValue
    error: Bach2gLimitsRaceError
}
const whole = (value: number, error: Bach2gLimitsRaceError): Candidate => ({ value: fraction(Math.round(value) + 0), error })
const ratio = (p: number, q: number, error: Bach2gLimitsRaceError): Candidate => ({ value: fraction(p, q), error })
const exact = (value: number, error: Bach2gLimitsRaceError): Candidate => ({ value: fraction(Math.round(value * 10000), 10000), error })
const nearby = (value: number): Candidate[] => [value + 1, value - 1, value + 2, value * 2].map((item) => exact(item, 'calculation'))

/** The right option and three different mistakes */
function options(random: Random, right: FractionValue, candidates: Candidate[]): RaceOption<Bach2gLimitsRaceError>[] | null {
    const rightLatex = written(right)
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: Bach2gLimitsRaceError }> = []
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

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<Bach2gLimitsRaceError>[], answer: FractionValue, solution: LocalizedText, meta: Record<string, number>): Bach2gLimitsRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution, meta }
}

const work = (formula: string) => say(`Kalkulatu ${math(formula)}.`, `Calcula ${math(formula)}.`, `احسب ${math(formula)}.`, `Work out ${math(formula)}.`)
const powerOfE = (formula: string) => say(`${math(`${formula}=e^a`)}. Zenbat da $a$?`, `${math(`${formula}=e^a`)}. ¿Cuánto vale $a$?`, `${math(`${formula}=e^a`)}. كم تساوي $a$؟`, `${math(`${formula}=e^a`)}. What is $a$?`)

/* ---------- Circuit 0: the graph and infinity ---------- */

/** k + c/xⁿ at +∞: k */
function vanishQuestion(random: Random): Bach2gLimitsRaceQuestion | null {
    const k = randomInt(random, -6, 9)
    const c = randomInt(random, 2, 9)
    const power = randomInt(random, 1, 3)
    const answer = fraction(k)
    const choices = options(random, answer, [whole(k + c, 'vanish'), whole(c, 'vanish'), whole(0, 'calculation')])
    return choices && build(0, 'vanish', work(`\\lim_{x\\to+\\infty}\\left(${k}+\\frac{${c}}{x${power === 1 ? '' : `^${power}`}}\\right)`), choices, answer, same(`${k}+0=${k}`), { k, c, power })
}

/** f → a and g → b: lim (f² − g) = a² − b */
function operateQuestion(random: Random): Bach2gLimitsRaceQuestion | null {
    const a = randomInt(random, -4, 5)
    const b = randomInt(random, -6, 8)
    if (a === 0) return null
    const answer = fraction(a * a - b)
    const choices = options(random, answer, [whole(2 * a - b, 'calculation'), whole(a * a + b, 'calculation'), whole(a - b, 'calculation')])
    return choices && build(0, 'operate', say(`$f\\to ${a}$ eta $g\\to ${b}$. Kalkulatu $\\lim(f^2-g)$.`, `$f\\to ${a}$ y $g\\to ${b}$. Calcula $\\lim(f^2-g)$.`, `$f\\to ${a}$ و$g\\to ${b}$. احسب $\\lim(f^2-g)$.`, `$f\\to ${a}$ and $g\\to ${b}$. Work out $\\lim(f^2-g)$.`), choices, answer, same(`(${a})^2-(${b})=${a * a - b}`), { a, b })
}

/** a + b/g with g → +∞: a */
function overInfinityQuestion(random: Random): Bach2gLimitsRaceQuestion | null {
    const a = randomInt(random, 1, 9)
    const b = randomInt(random, 2, 9)
    const answer = fraction(a)
    const choices = options(random, answer, [whole(a + b, 'vanish'), whole(0, 'vanish'), ratio(a, b, 'calculation')])
    return choices && build(0, 'over-infinity', say(`$f\\to ${a}$ eta $g\\to+\\infty$. Kalkulatu $\\lim\\left(f+\\frac{${b}}{g}\\right)$.`, `$f\\to ${a}$ y $g\\to+\\infty$. Calcula $\\lim\\left(f+\\frac{${b}}{g}\\right)$.`, `$f\\to ${a}$ و$g\\to+\\infty$. احسب $\\lim\\left(f+\\frac{${b}}{g}\\right)$.`, `$f\\to ${a}$ and $g\\to+\\infty$. Work out $\\lim\\left(f+\\frac{${b}}{g}\\right)$.`), choices, answer, same(`${a}+\\frac{${b}}{+\\infty}=${a}`), { a, b })
}

/* ---------- Circuit 1: limits at infinity ---------- */

/** (p x² + 1)/(q x² − x) at +∞: p/q */
function degreesQuestion(random: Random): Bach2gLimitsRaceQuestion | null {
    const p = randomInt(random, 1, 9)
    const q = randomInt(random, 2, 6)
    if (p === q) return null
    const answer = fraction(p, q)
    const choices = options(random, answer, [ratio(q, p, 'inverse'), whole(0, 'order'), whole(1, 'order')])
    return choices && build(1, 'degrees', work(`\\lim_{x\\to+\\infty}\\frac{${p}x^2+1}{${q}x^2-x}`), choices, answer, same(`\\frac{${p}x^2}{${q}x^2}=\\frac{${p}}{${q}}`), { p, q })
}

/** √(x² + px) − x at +∞: p/2 */
function conjugateQuestion(random: Random): Bach2gLimitsRaceQuestion | null {
    const p = randomInt(random, 1, 12)
    const answer = fraction(p, 2)
    const choices = options(random, answer, [whole(p, 'half'), whole(0, 'calculation'), ratio(1, p, 'inverse')])
    return choices && build(1, 'conjugate', work(`\\lim_{x\\to+\\infty}\\left(\\sqrt{x^2+${p}x}-x\\right)`), choices, answer, same(`\\frac{${p}x}{\\sqrt{x^2+${p}x}+x}\\ \\to\\ \\frac{${p}}{2}`), { p })
}

/** (1 + p/x)^(qx): a = pq */
function eQuestion(random: Random): Bach2gLimitsRaceQuestion | null {
    const p = randomInt(random, 1, 5)
    const q = randomInt(random, 2, 5)
    const answer = fraction(p * q)
    const choices = options(random, answer, [whole(p + q, 'add'), whole(1, 'calculation'), ratio(q, p, 'inverse')])
    return choices && build(1, 'e', powerOfE(`\\lim_{x\\to+\\infty}\\left(1+\\frac{${p}}{x}\\right)^{${q}x}`), choices, answer, same(`${q}x\\cdot\\frac{${p}}{x}=${p * q}`), { p, q })
}

/* ---------- Circuit 2: limits at a point ---------- */

/** x² + bx at a: a² + ab */
function substituteQuestion(random: Random): Bach2gLimitsRaceQuestion | null {
    const a = randomInt(random, -3, 4)
    const b = randomInt(random, -5, 5)
    if (a === 0 || b === 0) return null
    const answer = fraction(a * a + a * b)
    const choices = options(random, answer, [whole(-a * a + a * b, 'calculation'), whole(a * a + b, 'calculation'), whole(2 * a + b, 'calculation')])
    return choices && build(2, 'substitute', work(`\\lim_{x\\to ${a}}(x^2${signedX(b)})`), choices, answer, same(`(${a})^2${signed(b)}\\cdot(${a})=${a * a + a * b}`), { a, b })
}

/** (x² − a²)/(x − a) at a: 2a */
function factorQuestion(random: Random): Bach2gLimitsRaceQuestion | null {
    const a = randomInt(random, 1, 8)
    const answer = fraction(2 * a)
    const choices = options(random, answer, [whole(0, 'factor'), whole(a, 'factor'), whole(a * a, 'calculation')])
    return choices && build(2, 'factor', work(`\\lim_{x\\to ${a}}\\frac{x^2-${a * a}}{x-${a}}`), choices, answer, same(`x+${a}\\ \\to\\ ${2 * a}`), { a })
}

/** (√x − a)/(x − a²) at a²: 1/(2a) */
function rootQuestion(random: Random): Bach2gLimitsRaceQuestion | null {
    const a = randomInt(random, 2, 6)
    const answer = fraction(1, 2 * a)
    const choices = options(random, answer, [ratio(1, a, 'root'), whole(0, 'factor'), whole(2 * a, 'inverse')])
    return choices && build(2, 'root', work(`\\lim_{x\\to ${a * a}}\\frac{\\sqrt{x}-${a}}{x-${a * a}}`), choices, answer, same(`\\frac{1}{\\sqrt{x}+${a}}\\ \\to\\ \\frac{1}{${2 * a}}`), { a })
}

/* ---------- Circuit 3: continuity ---------- */

/** kx for x < t and mx + c from t on: k = (mt + c)/t */
function parameterQuestion(random: Random): Bach2gLimitsRaceQuestion | null {
    const t = randomInt(random, 1, 4)
    const k = randomInt(random, -3, 6)
    const m = randomInt(random, 1, 4)
    const c = k * t - m * t
    if (c === 0 || k === 0) return null
    const answer = fraction(k)
    const choices = options(random, answer, [whole(c, 'piece'), whole(m, 'piece'), whole(-k, 'calculation')])
    const formula = `f(x)=\\begin{cases}kx & x<${t}\\\\ ${m === 1 ? '' : m}x${signed(c)} & x\\ge ${t}\\end{cases}`
    return choices && build(3, 'parameter', say(`Aurkitu $k$, jarraitua izan dadin: ${math(formula)}`, `Halla $k$ para que sea continua: ${math(formula)}`, `أوجد $k$ لتكون متصلة: ${math(formula)}`, `Find $k$ so that it is continuous: ${math(formula)}`), choices, answer, same(`${t}k=${m * t + c}\\ \\to\\ k=${k}`), { t, k, m, c })
}

/** The size of the jump of px + q | rx + s at t: right − left */
function jumpQuestion(random: Random): Bach2gLimitsRaceQuestion | null {
    const t = randomInt(random, 1, 4)
    const p = randomInt(random, 1, 5)
    const q = randomInt(random, -3, 5)
    const r = randomInt(random, 1, 5)
    const s = randomInt(random, -3, 8)
    const jump = r * t + s - (p * t + q)
    if (jump <= 0 || p === r) return null
    const answer = fraction(jump)
    const choices = options(random, answer, [whole(r - p, 'jump'), whole(s - q, 'jump'), whole(r * t + s, 'jump')])
    const formula = `f(x)=\\begin{cases}${p === 1 ? '' : p}x${q === 0 ? '' : signed(q)} & x\\le ${t}\\\\ ${r === 1 ? '' : r}x${s === 0 ? '' : signed(s)} & x>${t}\\end{cases}`
    return choices && build(3, 'jump', say(`${math(formula)}. Zenbat jauzi egiten du gorantz $x=${t}$ puntuan?`, `${math(formula)}. ¿Cuánto salta hacia arriba en $x=${t}$?`, `${math(formula)}. كم تقفز إلى الأعلى عند $x=${t}$؟`, `${math(formula)}. How much does it jump up at $x=${t}$?`), choices, answer, same(`${r * t + s}-${p * t + q}=${jump}`), { t, p, q, r, s })
}

/** (x² − ax)/(x − a) has a hole at a: f(a) must be a */
function mendQuestion(random: Random): Bach2gLimitsRaceQuestion | null {
    const a = randomInt(random, 2, 9)
    const b = randomInt(random, 1, 6)
    if (b === a) return null
    const answer = fraction(a + b)
    const choices = options(random, answer, [whole(0, 'factor'), whole(a, 'calculation'), whole(b, 'calculation')])
    return choices && build(3, 'mend', say(`${math(`\\frac{x^2${signedX(b - a)}-${a * b}}{x-${a}}`)} funtzioak zulo bat du $x=${a}$ puntuan. Zein balio eman behar zaio $f(${a})$?`, `${math(`\\frac{x^2${signedX(b - a)}-${a * b}}{x-${a}}`)} tiene un agujero en $x=${a}$. ¿Qué valor hay que dar a $f(${a})$?`, `للدالة ${math(`\\frac{x^2${signedX(b - a)}-${a * b}}{x-${a}}`)} ثقب عند $x=${a}$. ما القيمة التي نعطيها لـ $f(${a})$؟`, `${math(`\\frac{x^2${signedX(b - a)}-${a * b}}{x-${a}}`)} has a hole at $x=${a}$. What value must $f(${a})$ be given?`), choices, answer, same(`x+${b}\\ \\to\\ ${a}+${b}=${a + b}`), { a, b })
}

/* ---------- Circuit 4: economy and society ---------- */

/** P(t) = (pt + q)/(t + r) in the long run: p */
function longRunQuestion(random: Random): Bach2gLimitsRaceQuestion | null {
    const p = randomInt(random, 2, 9) * 5
    const q = randomInt(random, 1, 9)
    const r = randomInt(random, 1, 4)
    const answer = fraction(p)
    const choices = options(random, answer, [ratio(q, r, 'initial'), whole(0, 'order'), whole(p + q, 'calculation')])
    return choices && build(4, 'long-run', say(`Biztanleria (milakatan): ${math(`P(t)=\\frac{${p}t+${q}}{t+${r}}`)}. Zenbatera hurbiltzen da epe luzera?`, `Población (miles): ${math(`P(t)=\\frac{${p}t+${q}}{t+${r}}`)}. ¿A cuánto se acerca a largo plazo?`, `السكان (بالآلاف): ${math(`P(t)=\\frac{${p}t+${q}}{t+${r}}`)}. إلى كم يقترب على المدى الطويل؟`, `Population (thousands): ${math(`P(t)=\\frac{${p}t+${q}}{t+${r}}`)}. What does it approach in the long run?`), choices, answer, same(`\\frac{${p}t}{t}=${p}`), { p, q, r })
}

/** C(x) = F + cx: the average cost tends to c */
function averageQuestion(random: Random): Bach2gLimitsRaceQuestion | null {
    const fixed = randomInt(random, 2, 9) * 100
    const c = randomInt(random, 2, 15)
    const answer = fraction(c)
    const choices = options(random, answer, [whole(fixed, 'fixed'), whole(0, 'fixed'), whole(fixed + c, 'calculation')])
    return choices && build(4, 'average', say(`${math(`C(x)=${fixed}+${c}x`)} euro. Zenbatera hurbiltzen da batez besteko kostua?`, `${math(`C(x)=${fixed}+${c}x`)} euros. ¿A cuánto se acerca el coste medio?`, `${math(`C(x)=${fixed}+${c}x`)} يورو. إلى كم يقترب متوسط التكلفة؟`, `${math(`C(x)=${fixed}+${c}x`)} euros. What does the average cost approach?`), choices, answer, same(`\\frac{${fixed}}{x}+${c}\\ \\to\\ ${c}`), { fixed, c })
}

/** p₁x up to B and p₂x + k beyond: k = (p₁ − p₂)B */
function chargeQuestion(random: Random): Bach2gLimitsRaceQuestion | null {
    const [p1, p2] = pick(random, [[2, 1.5], [3, 2], [1.5, 1], [4, 3], [2.5, 2], [1.2, 1]])
    const boundary = pick(random, [10, 20, 30, 40, 50])
    const k = Math.round((p1 - p2) * boundary * 100) / 100
    const answer = fraction(Math.round(k * 100), 100)
    const choices = options(random, answer, [exact(p1 - p2, 'price'), exact(p1 * boundary, 'calculation'), exact((p1 + p2) * boundary, 'calculation')])
    const formula = `f(x)=\\begin{cases}${dec(p1)}x & x\\le ${boundary}\\\\ ${p2 === 1 ? '' : dec(p2)}x+k & x>${boundary}\\end{cases}`
    return choices && build(4, 'charge', say(`Zein $k$ baliorekin ez du tarifak jauzirik? ${math(formula)}`, `¿Con qué $k$ no salta la tarifa? ${math(formula)}`, `بأي $k$ لا تقفز التعريفة؟ ${math(formula)}`, `With which $k$ does the tariff not jump? ${math(formula)}`), choices, answer, same(`${dec(p1)}\\cdot ${boundary}=${dec(p2)}\\cdot ${boundary}+k\\ \\to\\ k=${dec(k)}`), { p1, p2, boundary })
}

const circuitGenerators: Array<Array<(random: Random, tier: Tier) => Bach2gLimitsRaceQuestion | null>> = [
    [vanishQuestion, operateQuestion, overInfinityQuestion],
    [degreesQuestion, conjugateQuestion, eQuestion],
    [substituteQuestion, factorQuestion, rootQuestion],
    [parameterQuestion, jumpQuestion, mendQuestion],
    [longRunQuestion, averageQuestion, chargeQuestion]
]

export function generateBach2gLimitsRaceQuestion(random: Random, circuit: number, tier: Tier): Bach2gLimitsRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkBach2gLimitsPitAnswer(question: RaceQuestion<Bach2gLimitsRaceError>, input: string): AnswerCheck {
    return checkAnswer(input, question.answer, question.answerForm)
}

export function bach2gLimitsParTime(circuit: number): number {
    return parTimeFor([11, 13, 13, 15, 14][circuit] ?? 13)
}

export const bach2gLimitsRaceErrorTips: Record<Bach2gLimitsRaceError, LocalizedText> = {
    vanish: say('Zenbaki bat zati infinitu 0 da: gai hori desagertu egiten da.', 'Un número entre infinito es 0: ese término desaparece.', 'عدد على لانهاية يساوي 0: يختفي ذلك الحد.', 'A number over infinity is 0: that term vanishes.'),
    order: say('Maila bera goian eta behean: koefiziente nagusien zatidura.', 'Mismo grado arriba y abajo: el cociente de los coeficientes principales.', 'الدرجة نفسها في البسط والمقام: خارج قسمة المعاملين الرئيسيين.', 'Same degree on top and below: the quotient of the leading coefficients.'),
    inverse: say('Zatidura alderantziz idatzi duzu.', 'Has escrito el cociente al revés.', 'كتبت خارج القسمة معكوسًا.', 'You wrote the quotient upside down.'),
    half: say('Konjokatuaren ondoren, behean 2x geratzen da: zatitu 2 zenbakiaz.', 'Tras el conjugado queda 2x abajo: divide entre 2.', 'بعد المرافق يبقى 2x في المقام: اقسم على 2.', 'After the conjugate, 2x is left below: divide by 2.'),
    add: say('Berretzaileak biderkatzen dira, ez batzen.', 'Los exponentes se multiplican, no se suman.', 'تُضرب الأسس ولا تُجمع.', 'The exponents multiply, they do not add.'),
    factor: say('0/0: faktorizatu eta sinplifikatu, gero ordezkatu.', '0/0: factoriza y simplifica, después sustituye.', '0/0: حلّل واختصر ثم عوّض.', '0/0: factorise and cancel, then substitute.'),
    root: say('Konjokatuaren ondoren, behean √x + a geratzen da: 2a.', 'Tras el conjugado queda √x + a abajo: 2a.', 'بعد المرافق يبقى √x + a في المقام: 2a.', 'After the conjugate, √x + a is left below: 2a.'),
    piece: say('Lotunean ordezkatu bi zatiak eta berdindu.', 'Sustituye la unión en los dos trozos e iguala.', 'عوّض نقطة الالتقاء في الجزأين وساوِ بينهما.', 'Substitute the joint into both pieces and set them equal.'),
    jump: say('Jauzia = eskuineko limitea − ezkerrekoa, puntu horretan.', 'Salto = límite por la derecha − por la izquierda, en ese punto.', 'القفزة = النهاية اليمنى − اليسرى عند تلك النقطة.', 'Jump = right-hand limit − left-hand limit, at that point.'),
    initial: say('Hori hasierako balioa da (t = 0); epe luzera, t → +∞.', 'Ese es el valor inicial (t = 0); a largo plazo, t → +∞.', 'تلك هي القيمة الابتدائية (t = 0)؛ وعلى المدى الطويل t → +∞.', 'That is the initial value (t = 0); in the long run, t → +∞.'),
    fixed: say('Kostu finkoa unitate askotan banatzen da: F/x → 0.', 'El coste fijo se reparte entre muchas unidades: F/x → 0.', 'تتوزع التكلفة الثابتة على وحدات كثيرة: F/x → 0.', 'The fixed cost is shared among many units: F/x → 0.'),
    price: say('Prezioen kenketa bider tartearen muga: (p₁ − p₂) · B.', 'La diferencia de precios por el límite del tramo: (p₁ − p₂) · B.', 'فرق السعرين مضروبًا في حد الشريحة: (p₁ − p₂) · B.', 'The difference of prices times the edge of the bracket: (p₁ − p₂) · B.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}
