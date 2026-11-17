import { checkAnswer, fraction, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { written } from '../../batx1-zientziak-errealak/games/race.ts'
import { same as sameText, say } from '../text.ts'

/* ==========================================================================
   Limiteen lasterketa (1.º Sociales · límites): five circuits, one per
   stage — at infinity (quotients of the same degree, more degree below,
   c + k·aˣ with 0 < a < 1), more cases (towards −∞, roots, the average
   cost), at a point (a one-sided limit of a piecewise function, 0/0,
   x(x − a)/(x − a)), continuity (the k that joins two pieces, the value
   that fills a hole, the size of a jump) and asymptotes (vertical,
   horizontal and the n of an oblique y = x + n). Every answer is a
   number; the wrong options are the typical mistakes. Every question
   carries `meta`, the numbers the tests check it against.
   ========================================================================== */

export const SOC_LIMITS_RACE_CIRCUITS = 5

export type SocLimitsRaceError =
    | 'infinity-one'
    | 'top-only'
    | 'upside-down'
    | 'start'
    | 'degree'
    | 'sign'
    | 'root'
    | 'fixed'
    | 'wrong-side'
    | 'wrong-piece'
    | 'vertical'
    | 'calculation'

export type SocLimitsRaceQuestion = RaceQuestion<SocLimitsRaceError> & { meta: Record<string, number> }

const same = (latex: string): LocalizedText => sameText(`$${latex}$`)
const lead = (a: number, n: number) => `${a === 1 ? '' : a === -1 ? '-' : a}x${n === 1 ? '' : `^${n}`}`
const signed = (value: number) => (value < 0 ? `-${-value}` : `+${value}`)

interface Candidate {
    value: FractionValue
    error: SocLimitsRaceError
}
const as = (top: number, bottom: number, error: SocLimitsRaceError): Candidate => ({ value: fraction(top, bottom), error })
const whole = (value: number, error: SocLimitsRaceError): Candidate => as(value, 1, error)
const nearby = (value: number): Candidate[] => [value + 1, value - 1, value + 2, value * 2, -value].map((item) => ({ value: fraction(Math.round(item * 1000), 1000), error: 'calculation' as const }))

function options(random: Random, right: FractionValue, candidates: Candidate[]): RaceOption<SocLimitsRaceError>[] | null {
    const rightLatex = written(right)
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: SocLimitsRaceError }> = []
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

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<SocLimitsRaceError>[], answer: FractionValue, solution: LocalizedText, meta: Record<string, number>): SocLimitsRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution, meta }
}

const limitPrompt = (where: string, latex: string) => say(`Zenbat da $\\lim_{x\\to ${where}}${latex}$?`, `¿Cuánto vale $\\lim_{x\\to ${where}}${latex}$?`, `كم تساوي $\\lim_{x\\to ${where}}${latex}$؟`, `What is $\\lim_{x\\to ${where}}${latex}$?`)

/* ---------- Circuit 0: at infinity ---------- */

function sameDegreeQuestion(random: Random): SocLimitsRaceQuestion | null {
    const n = randomInt(random, 1, 3)
    const a = pick(random, [-6, -4, -3, 2, 3, 4, 6, 8, 9, 10, 12])
    const b = pick(random, [2, 3, 4])
    const p = randomInt(random, 1, 9)
    const q = randomInt(random, 1, 9)
    const answer = fraction(a, b)
    const choices = options(random, answer, [whole(a, 'top-only'), whole(1, 'infinity-one'), as(b, a, 'upside-down')])
    return choices && build(0, 'same-degree', limitPrompt('+\\infty', `\\frac{${lead(a, n)}+${p}}{${lead(b, n)}-${q}}`), choices, answer, same(`\\frac{${a}}{${b}}`), { a, b, n })
}

function lowerDegreeQuestion(random: Random): SocLimitsRaceQuestion | null {
    const m = randomInt(random, 1, 2)
    const n = m + randomInt(random, 1, 2)
    const a = randomInt(random, 2, 9)
    const b = randomInt(random, 1, 5)
    const answer = fraction(0)
    const choices = options(random, answer, [as(a, b, 'degree'), whole(a, 'top-only'), whole(1, 'infinity-one')])
    return choices && build(0, 'lower-degree', limitPrompt('+\\infty', `\\frac{${lead(a, m)}}{${lead(b, n)}+1}`), choices, answer, same(`\\frac{${lead(a, m)}}{${lead(b, n)}}\\ \\to\\ 0`), { a, b, m, n })
}

function decayQuestion(random: Random): SocLimitsRaceQuestion | null {
    const c = randomInt(random, 2, 30)
    const k = randomInt(random, 2, 20)
    const base = pick(random, ['0{,}5', '0{,}8', '0{,}2', '0{,}9'])
    const answer = fraction(c)
    const choices = options(random, answer, [whole(c + k, 'start'), whole(k, 'calculation'), whole(0, 'calculation')])
    return choices && build(0, 'decay', limitPrompt('+\\infty', `(${c}+${k}\\cdot ${base}^x)`), choices, answer, same(`${base}^x\\ \\to\\ 0\\qquad ${c}+0=${c}`), { c, k })
}

/* ---------- Circuit 1: more cases at infinity ---------- */

function minusQuestion(random: Random): SocLimitsRaceQuestion | null {
    const n = randomInt(random, 1, 3)
    const a = pick(random, [-6, -4, 2, 3, 4, 6, 8, 9])
    const b = pick(random, [1, 2, 3])
    const p = randomInt(random, 1, 9)
    const answer = fraction(a, b)
    const choices = options(random, answer, [as(-a, b, 'sign'), whole(a, 'top-only'), whole(1, 'infinity-one')])
    return choices && build(1, 'minus', limitPrompt('-\\infty', `\\frac{${lead(a, n)}-${p}}{${lead(b, n)}+${p}}`), choices, answer, same(`\\frac{${a}}{${b}}`), { a, b, n })
}

function rootQuestion(random: Random): SocLimitsRaceQuestion | null {
    const r = randomInt(random, 2, 6)
    const m = randomInt(random, 1, 3)
    const c = randomInt(random, 1, 9)
    const d = randomInt(random, 1, 9)
    const answer = fraction(r, m)
    const choices = options(random, answer, [as(r * r, m, 'root'), whole(r, 'calculation'), whole(1, 'infinity-one')])
    return choices && build(1, 'root', limitPrompt('+\\infty', `\\frac{\\sqrt{${r * r}x^2+${c}}}{${m === 1 ? '' : m}x+${d}}`), choices, answer, same(`\\sqrt{${r * r}x^2}=${r}x\\qquad\\frac{${r}}{${m}}`), { r, m })
}

function costQuestion(random: Random): SocLimitsRaceQuestion | null {
    const fixed = pick(random, [400, 900, 1500, 2000, 3600, 6000])
    const unit = randomInt(random, 3, 60)
    const answer = fraction(unit)
    const choices = options(random, answer, [whole(fixed, 'fixed'), whole(fixed + unit, 'fixed'), whole(0, 'calculation')])
    return choices && build(1, 'cost', say(`$C(x)=${fixed}+${unit}x$ bada, zein baliotara doa batez besteko kostua?`, `Si $C(x)=${fixed}+${unit}x$, ¿a qué tiende el coste medio?`, `إذا كانت $C(x)=${fixed}+${unit}x$ فإلامَ تتجه التكلفة المتوسطة؟`, `If $C(x)=${fixed}+${unit}x$, what does the average cost tend to?`), choices, answer, same(`\\frac{${fixed}}{x}+${unit}\\ \\to\\ ${unit}`), { fixed, unit })
}

/* ---------- Circuit 2: at a point ---------- */

function sideQuestion(random: Random): SocLimitsRaceQuestion | null {
    const a = randomInt(random, 1, 4)
    const p = randomInt(random, -5, 5)
    const m = randomInt(random, 2, 5)
    const q = randomInt(random, -5, 5)
    const left = a * a + p
    const right = m * a + q
    if (left === right) return null
    const fromLeft = random() < 0.5
    const answer = fraction(fromLeft ? left : right)
    const choices = options(random, answer, [whole(fromLeft ? right : left, 'wrong-side'), whole(fromLeft ? a + p : m + q, 'calculation'), whole(0, 'calculation')])
    const side = fromLeft ? '^-' : '^+'
    const latex = `f(x)=\\begin{cases}x^2${p === 0 ? '' : signed(p)} & x<${a}\\\\ ${m}x${q === 0 ? '' : signed(q)} & x\\ge ${a}\\end{cases}`
    return choices && build(2, 'side', say(`$${latex}$. Zenbat da $\\lim_{x\\to ${a}${side}}f(x)$?`, `$${latex}$. ¿Cuánto vale $\\lim_{x\\to ${a}${side}}f(x)$?`, `$${latex}$. كم تساوي $\\lim_{x\\to ${a}${side}}f(x)$؟`, `$${latex}$. What is $\\lim_{x\\to ${a}${side}}f(x)$?`), choices, answer, same(fromLeft ? `${a}^{2}${p === 0 ? '' : signed(p)}=${left}` : `${m}\\cdot ${a}${q === 0 ? '' : signed(q)}=${right}`), { a, p, m, q, fromLeft: fromLeft ? 1 : 0 })
}

function zeroQuestion(random: Random): SocLimitsRaceQuestion | null {
    const r = randomInt(random, 1, 6)
    const s = randomInt(random, 1, 6)
    const b = s - r
    const middle = b === 0 ? '' : `${b < 0 ? '-' : '+'}${Math.abs(b) === 1 ? '' : Math.abs(b)}x`
    const answer = fraction(r + s)
    const choices = options(random, answer, [whole(r - s, 'sign'), whole(0, 'calculation'), whole(r, 'calculation')])
    return choices && build(2, 'zero', limitPrompt(`${r}`, `\\frac{x^2${middle}-${r * s}}{x-${r}}`), choices, answer, same(`\\frac{(x-${r})(x+${s})}{x-${r}}=x+${s}\\ \\to\\ ${r + s}`), { r, s })
}

function commonQuestion(random: Random): SocLimitsRaceQuestion | null {
    const a = randomInt(random, 2, 9)
    const k = randomInt(random, 2, 6)
    const answer = fraction(k * a)
    const choices = options(random, answer, [whole(0, 'calculation'), whole(k, 'calculation'), whole(a, 'calculation')])
    return choices && build(2, 'common', limitPrompt(`${a}`, `\\frac{${k}x^2-${k * a}x}{x-${a}}`), choices, answer, same(`\\frac{${k}x(x-${a})}{x-${a}}=${k}x\\ \\to\\ ${k * a}`), { a, k })
}

/* ---------- Circuit 3: continuity ---------- */

function parameterQuestion(random: Random): SocLimitsRaceQuestion | null {
    const a = randomInt(random, 1, 5)
    const m1 = randomInt(random, 2, 5)
    const c1 = randomInt(random, -4, 6)
    const m2 = pick(random, [1, -1, 2])
    if (m1 === m2) return null
    const left = m1 * a + c1
    const k = left - m2 * a
    if (k === 0) return null
    const answer = fraction(k)
    const choices = options(random, answer, [whole(left, 'wrong-piece'), whole(-k, 'sign'), whole(left + m2 * a, 'sign')])
    const latex = `f(x)=\\begin{cases}${m1}x${c1 === 0 ? '' : signed(c1)} & x<${a}\\\\ ${m2 === 1 ? '' : m2 === -1 ? '-' : m2}x+k & x\\ge ${a}\\end{cases}`
    return choices && build(3, 'parameter', say(`Zer $k$ baliorekin da jarraitua $${latex}$?`, `¿Con qué $k$ es continua $${latex}$?`, `مع أي $k$ تكون $${latex}$ متصلة؟`, `For which $k$ is $${latex}$ continuous?`), choices, answer, same(`${left}=${m2}\\cdot ${a}+k\\ \\to\\ k=${k}`), { a, m1, c1, m2 })
}

function holeQuestion(random: Random): SocLimitsRaceQuestion | null {
    const a = randomInt(random, 2, 9)
    const answer = fraction(2 * a)
    const choices = options(random, answer, [whole(0, 'calculation'), whole(a, 'calculation'), whole(a * a, 'calculation')])
    return choices && build(3, 'hole', say(`Zer balio eman behar zaio $f(${a})$ balioari, $f(x)=\\frac{x^2-${a * a}}{x-${a}}$ jarraitua izan dadin?`, `¿Qué valor hay que dar a $f(${a})$ para que $f(x)=\\frac{x^2-${a * a}}{x-${a}}$ sea continua?`, `ما القيمة التي تُعطى لـ $f(${a})$ لتكون $f(x)=\\frac{x^2-${a * a}}{x-${a}}$ متصلة؟`, `What value must $f(${a})$ get for $f(x)=\\frac{x^2-${a * a}}{x-${a}}$ to be continuous?`), choices, answer, same(`x+${a}\\ \\to\\ ${2 * a}`), { a })
}

function jumpQuestion(random: Random): SocLimitsRaceQuestion | null {
    const a = randomInt(random, 1, 5)
    const m = randomInt(random, 1, 4)
    const value = randomInt(random, 1, 20)
    const left = m * a
    if (left === value) return null
    const answer = fraction(value - left)
    const latex = `f(x)=\\begin{cases}${m === 1 ? '' : m}x & x<${a}\\\\ ${value} & x\\ge ${a}\\end{cases}`
    const choices = options(random, answer, [whole(left - value, 'sign'), whole(value, 'calculation'), whole(left, 'calculation')])
    return choices && build(3, 'jump', say(`$${latex}$. Zenbat da jauzia, eskuineko limitea ken ezkerrekoa?`, `$${latex}$. ¿Cuánto vale el salto, límite por la derecha menos por la izquierda?`, `$${latex}$. كم تساوي القفزة، النهاية من اليمين ناقص النهاية من اليسار؟`, `$${latex}$. What is the jump, the limit from the right minus the one from the left?`), choices, answer, same(`${value}-${left}=${value - left}`), { a, m, value })
}

/* ---------- Circuit 4: asymptotes ---------- */

function verticalQuestion(random: Random): SocLimitsRaceQuestion | null {
    const a = pick(random, [-6, -5, -4, -3, -2, 2, 3, 4, 5, 6])
    const k = randomInt(random, 1, 9)
    const answer = fraction(a)
    const choices = options(random, answer, [whole(-a, 'sign'), whole(k, 'calculation'), whole(0, 'calculation')])
    return choices && build(4, 'vertical', say(`$f(x)=\\frac{${k}}{x${signed(-a)}}$ funtzioaren asintota bertikala $x=a$ da. Zenbat da $a$?`, `La asíntota vertical de $f(x)=\\frac{${k}}{x${signed(-a)}}$ es $x=a$. ¿Cuánto vale $a$?`, `المقارب الرأسي لـ $f(x)=\\frac{${k}}{x${signed(-a)}}$ هو $x=a$. كم تساوي $a$؟`, `The vertical asymptote of $f(x)=\\frac{${k}}{x${signed(-a)}}$ is $x=a$. What is $a$?`), choices, answer, same(`x${signed(-a)}=0\\ \\to\\ x=${a}`), { a, k })
}

function horizontalQuestion(random: Random): SocLimitsRaceQuestion | null {
    const a = pick(random, [2, 3, 4, 6, 8, 9, 10, 12, -4, -6])
    const b = pick(random, [1, 2, 3])
    const q = randomInt(random, 1, 9)
    const answer = fraction(a, b)
    const choices = options(random, answer, [whole(a, 'top-only'), as(-q, b, 'vertical'), whole(1, 'infinity-one')])
    return choices && build(4, 'horizontal', say(`$f(x)=\\frac{${a}x+1}{${b === 1 ? '' : b}x+${q}}$ funtzioaren asintota horizontala $y=b$ da. Zenbat da $b$?`, `La asíntota horizontal de $f(x)=\\frac{${a}x+1}{${b === 1 ? '' : b}x+${q}}$ es $y=b$. ¿Cuánto vale $b$?`, `المقارب الأفقي لـ $f(x)=\\frac{${a}x+1}{${b === 1 ? '' : b}x+${q}}$ هو $y=b$. كم تساوي $b$؟`, `The horizontal asymptote of $f(x)=\\frac{${a}x+1}{${b === 1 ? '' : b}x+${q}}$ is $y=b$. What is $b$?`), choices, answer, same(`\\frac{${a}}{${b}}`), { a, b, q })
}

function obliqueQuestion(random: Random): SocLimitsRaceQuestion | null {
    const p = randomInt(random, -5, 6)
    const d = randomInt(random, 1, 5)
    const c = randomInt(random, -6, 6)
    const n = p - d
    const remainder = c - n * d
    if (remainder === 0 || p === 0) return null
    const answer = fraction(n)
    const middle = `${p < 0 ? '-' : '+'}${Math.abs(p) === 1 ? '' : Math.abs(p)}x`
    const choices = options(random, answer, [whole(p + d, 'sign'), whole(p, 'calculation'), whole(c, 'calculation')])
    return choices && build(4, 'oblique', say(`$f(x)=\\frac{x^2${middle}${c === 0 ? '' : signed(c)}}{x+${d}}$ funtzioaren asintota zeiharra $y=x+n$ da. Zenbat da $n$?`, `La asíntota oblicua de $f(x)=\\frac{x^2${middle}${c === 0 ? '' : signed(c)}}{x+${d}}$ es $y=x+n$. ¿Cuánto vale $n$?`, `المقارب المائل لـ $f(x)=\\frac{x^2${middle}${c === 0 ? '' : signed(c)}}{x+${d}}$ هو $y=x+n$. كم تساوي $n$؟`, `The oblique asymptote of $f(x)=\\frac{x^2${middle}${c === 0 ? '' : signed(c)}}{x+${d}}$ is $y=x+n$. What is $n$?`), choices, answer, same(`${p}-${d}=${n}`), { p, d, c })
}

const circuitGenerators: Array<Array<(random: Random, tier: Tier) => SocLimitsRaceQuestion | null>> = [
    [sameDegreeQuestion, lowerDegreeQuestion, decayQuestion],
    [minusQuestion, rootQuestion, costQuestion],
    [sideQuestion, zeroQuestion, commonQuestion],
    [parameterQuestion, holeQuestion, jumpQuestion],
    [verticalQuestion, horizontalQuestion, obliqueQuestion]
]

export function generateSocLimitsRaceQuestion(random: Random, circuit: number, tier: Tier): SocLimitsRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkSocLimitsPitAnswer(question: RaceQuestion<SocLimitsRaceError>, input: string): AnswerCheck {
    return checkAnswer(input, question.answer, question.answerForm)
}

export function socLimitsParTime(circuit: number): number {
    return parTimeFor([12, 13, 13, 13, 12][circuit] ?? 13)
}

export const socLimitsRaceErrorTips: Record<SocLimitsRaceError, LocalizedText> = {
    'infinity-one': say('∞/∞ ez da 1: maila bera bada, koefiziente nagusien zatidura.', '∞/∞ no es 1: con el mismo grado, el cociente de los coeficientes principales.', '∞/∞ ليست 1: مع الدرجة نفسها خارج قسمة المعاملين الرئيسيين.', '∞/∞ is not 1: with the same degree, the quotient of the leading coefficients.'),
    'top-only': say('Zatitu goiko koefizientea behekoaz.', 'Divide el coeficiente de arriba entre el de abajo.', 'اقسم معامل البسط على معامل المقام.', 'Divide the top coefficient by the bottom one.'),
    'upside-down': say('Goikoa zati behekoa, ez alderantziz.', 'El de arriba entre el de abajo, no al revés.', 'البسط على المقام لا العكس.', 'Top over bottom, not the other way round.'),
    start: say('aˣ → 0 bada, c + k·aˣ → c: k desagertzen da.', 'Si aˣ → 0, c + k·aˣ → c: la k desaparece.', 'إذا aˣ → 0 فإن c + k·aˣ → c: تختفي k.', 'If aˣ → 0, c + k·aˣ → c: the k disappears.'),
    degree: say('Behean maila handiagoa: limitea 0 da.', 'Más grado abajo: el límite es 0.', 'درجة المقام أكبر: النهاية 0.', 'Higher degree below: the limit is 0.'),
    sign: say('Begiratu zeinua berriro.', 'Revisa el signo.', 'راجع الإشارة.', 'Check the sign.'),
    root: say('√(a²x²) = a·x: erroa zenbakiari ere bai.', '√(a²x²) = a·x: la raíz también al número.', '√(a²x²) = a·x: الجذر على العدد أيضًا.', '√(a²x²) = a·x: the root of the number too.'),
    fixed: say('Gastu finkoa unitate askoren artean banatzen da: F/x → 0.', 'El gasto fijo se reparte entre muchas unidades: F/x → 0.', 'تتوزع التكلفة الثابتة على وحدات كثيرة: F/x → 0.', 'The fixed cost is shared among many units: F/x → 0.'),
    'wrong-side': say('Ezkerretik, x < a duen zatia; eskuinetik, x ≥ a duena.', 'Por la izquierda, el trozo de x < a; por la derecha, el de x ≥ a.', 'من اليسار جزء x < a، ومن اليمين جزء x ≥ a.', 'From the left, the piece with x < a; from the right, the one with x ≥ a.'),
    'wrong-piece': say('Berdindu bi zatiak x = a puntuan, eta askatu k.', 'Iguala los dos trozos en x = a y despeja k.', 'ساوِ بين الجزأين عند x = a واعزل k.', 'Set the two pieces equal at x = a and solve for k.'),
    vertical: say('Horizontala infinituko limitea da, ez izendatzailearen erroa.', 'La horizontal es el límite en el infinito, no la raíz del denominador.', 'الأفقي هو النهاية عند اللانهاية لا جذر المقام.', 'The horizontal one is the limit at infinity, not the root of the denominator.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}
