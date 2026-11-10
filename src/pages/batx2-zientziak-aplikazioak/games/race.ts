import { checkAnswer, fraction, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { written } from '../../batx1-zientziak-errealak/games/race.ts'
import { same as sameText, say } from '../../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   Aplikazioen lasterketa · Batxilergoa 2 (Carrera de aplicaciones de 2.º):
   five circuits, one per stage — the review (the x of a maximum, the x of
   an inflection, an absolute maximum on an interval), Rolle and the mean
   value (the c of Rolle, the c of the mean value, how many roots), L'Hôpital
   (sin kx / mx, (1 − cos kx)/x², ln L of a power), coefficients (b from a
   minimum, a from an inflection, b + c from a tangent) and optimisation
   (the largest product, the largest area, the smallest sum). The wrong
   options are the typical mistakes; every question carries `meta`, the
   numbers the tests check it against.
   ========================================================================== */

export const BACH2_APPLICATIONS_RACE_CIRCUITS = 5

export type Bach2ApplicationsRaceError =
    | 'sign'
    | 'second'
    | 'interior'
    | 'height'
    | 'slope'
    | 'degree'
    | 'swap'
    | 'twice'
    | 'transform'
    | 'inflection-slope'
    | 'slope-only'
    | 'x-value'
    | 'half'
    | 'calculation'

export type Bach2ApplicationsRaceQuestion = RaceQuestion<Bach2ApplicationsRaceError> & { meta: Record<string, number> }

/** A worked solution in rows (each \qquad and each \ \to\ starts one), so that it fits a phone */
function rows(latex: string): string {
    if (latex.length <= 28) return latex
    const parts = latex.split('\\qquad').flatMap((part) => {
        const [first, ...rest] = part.trim().split('\\ \\to\\ ')
        return [first, ...rest.map((piece) => `\\to\\ ${piece}`)]
    })
    return parts.length > 1 ? `\\begin{gathered}${parts.join('\\\\ ')}\\end{gathered}` : latex
}
const same = (latex: string): LocalizedText => sameText(`$${rows(latex)}$`)
const math = (latex: string) => `$${latex}$`
const signed = (value: number) => (value < 0 ? `-${-value}` : `+${value}`)
/** A term c·letters after another one: nothing for 0, +x or −x for ±1 */
const plusTerm = (coefficient: number, letters: string) => (coefficient === 0 ? '' : `${coefficient < 0 ? '-' : '+'}${Math.abs(coefficient) === 1 ? '' : Math.abs(coefficient)}${letters}`)

interface Candidate {
    value: FractionValue
    error: Bach2ApplicationsRaceError
}
const whole = (value: number, error: Bach2ApplicationsRaceError): Candidate => ({ value: fraction(Math.round(value) + 0), error })
const ratio = (p: number, q: number, error: Bach2ApplicationsRaceError): Candidate => ({ value: fraction(p, q), error })
const nearby = (value: number): Candidate[] => [value + 1, value - 1, value + 2, value * 2].map((item) => ({ value: fraction(Math.round(item * 10000), 10000), error: 'calculation' as const }))

/** The right option and three different mistakes */
function options(random: Random, right: FractionValue, candidates: Candidate[]): RaceOption<Bach2ApplicationsRaceError>[] | null {
    const rightLatex = written(right)
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: Bach2ApplicationsRaceError }> = []
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

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<Bach2ApplicationsRaceError>[], answer: FractionValue, solution: LocalizedText, meta: Record<string, number>): Bach2ApplicationsRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution, meta }
}

/* ---------- 0. Review ---------- */

function maxQuestion(random: Random): Bach2ApplicationsRaceQuestion | null {
    const k = randomInt(random, 1, 4)
    const answer = fraction(-k)
    const choices = options(random, answer, [whole(k, 'sign'), whole(0, 'calculation'), whole(-k * k, 'calculation')])
    const fn = `f(x)=x^3-${3 * k * k}x`
    return choices && build(0, 'max', say(`Zein abzisatan du ${math(fn)} funtzioak maximo erlatiboa?`, `¿En qué abscisa tiene ${math(fn)} su máximo relativo?`, `عند أي فاصلة تبلغ ${math(fn)} قيمتها العظمى المحلية؟`, `At which abscissa does ${math(fn)} have its local maximum?`), choices, answer, same(`f'(x)=3x^2-${3 * k * k}=0\\ \\to\\ x=\\pm ${k}\\ \\to\\ f''(-${k})<0`), { k })
}

function inflectionQuestion(random: Random): Bach2ApplicationsRaceQuestion | null {
    const m = pick(random, [-2, -1, 1, 2])
    const a = 3 * m
    const answer = fraction(-m)
    const choices = options(random, answer, [whole(-2 * m, 'second'), whole(m, 'sign'), whole(0, 'second')])
    const fn = `f(x)=x^3${plusTerm(a, 'x^2')}`
    return choices && build(0, 'inflection', say(`Zein abzisatan du ${math(fn)} funtzioak inflexio-puntua?`, `¿En qué abscisa tiene ${math(fn)} su punto de inflexión?`, `عند أي فاصلة تكون نقطة انعطاف ${math(fn)}؟`, `At which abscissa does ${math(fn)} have its point of inflection?`), choices, answer, same(`f''(x)=6x${signed(2 * a)}=0\\ \\to\\ x=${-m}`), { a })
}

function absoluteQuestion(random: Random): Bach2ApplicationsRaceQuestion | null {
    const p = randomInt(random, 1, 4)
    const q = randomInt(random, 1, 4)
    if (p === q) return null
    const answer = fraction(Math.max(p * p, q * q))
    const choices = options(random, answer, [whole(0, 'interior'), whole(Math.min(p * p, q * q), 'calculation'), whole(Math.max(p, q), 'calculation')])
    const interval = `[-${p},\\,${q}]`
    return choices && build(0, 'absolute', say(`Zein da ${math('f(x)=x^2')} funtzioaren maximo absolutua ${math(interval)} tartean?`, `¿Cuál es el máximo absoluto de ${math('f(x)=x^2')} en ${math(interval)}?`, `ما القيمة العظمى المطلقة للدالة ${math('f(x)=x^2')} على ${math(interval)}؟`, `What is the absolute maximum of ${math('f(x)=x^2')} on ${math(interval)}?`), choices, answer, same(`f(-${p})=${p * p}\\qquad f(0)=0\\qquad f(${q})=${q * q}`), { p, q })
}

/* ---------- 1. Rolle and the mean value ---------- */

function rolleQuestion(random: Random): Bach2ApplicationsRaceQuestion | null {
    const c = pick(random, [-3, -2, -1, 1, 2, 3])
    const r = randomInt(random, 1, 3)
    const answer = fraction(c)
    const choices = options(random, answer, [whole(-c, 'sign'), whole(c + r, 'calculation'), whole(r, 'calculation')])
    const fn = `f(x)=x^2${plusTerm(-2 * c, 'x')}`
    const interval = `[${c - r},\\,${c + r}]`
    return choices && build(1, 'rolle', say(`${math(fn)} funtzioak Rolle betetzen du ${math(interval)} tartean. Zenbat da ${math('c')}?`, `${math(fn)} cumple Rolle en ${math(interval)}. ¿Cuánto vale ${math('c')}?`, `تحقق ${math(fn)} مبرهنة رول على ${math(interval)}. كم تساوي ${math('c')}؟`, `${math(fn)} satisfies Rolle on ${math(interval)}. What is ${math('c')}?`), choices, answer, same(`f'(c)=2c${signed(-2 * c)}=0\\ \\to\\ c=${c}`), { c, r })
}

function meanQuestion(random: Random): Bach2ApplicationsRaceQuestion | null {
    const [a, b] = pick(random, [[1, 8], [2, 7], [4, 5], [6, 10], [7, 9]])
    const answer = fraction(a + b, 2)
    const choices = options(random, answer, [whole(Math.sqrt(a + b), 'height'), whole(a + b, 'slope'), ratio(b - a, 2, 'calculation')])
    const interval = `[${a},\\,${b}]`
    return choices && build(1, 'mean', say(`Zein da batez besteko balioaren ${math('c')}, ${math('f(x)=x^2')} funtziorako ${math(interval)} tartean?`, `¿Cuál es el ${math('c')} del valor medio de ${math('f(x)=x^2')} en ${math(interval)}?`, `ما قيمة ${math('c')} في مبرهنة القيمة المتوسطة للدالة ${math('f(x)=x^2')} على ${math(interval)}؟`, `What is the mean value ${math('c')} of ${math('f(x)=x^2')} on ${math(interval)}?`), choices, answer, same(`m=${a + b}\\ \\to\\ 2c=${a + b}\\ \\to\\ c=${written(answer)}`), { a, b })
}

function rootsQuestion(random: Random): Bach2ApplicationsRaceQuestion | null {
    const q = pick(random, [-5, -3, -1, 0, 1, 3, 5])
    const count = Math.abs(q) < 2 ? 3 : 1
    const answer = fraction(count)
    const choices = options(random, answer, [whole(count === 3 ? 1 : 3, 'degree'), whole(2, 'calculation'), whole(0, 'calculation')])
    const equation = `x^3-3x${q === 0 ? '' : signed(q)}=0`
    return choices && build(1, 'roots', say(`Zenbat erro erreal ditu ${math(equation)} ekuazioak?`, `¿Cuántas raíces reales tiene ${math(equation)}?`, `كم جذرًا حقيقيًّا للمعادلة ${math(equation)}؟`, `How many real roots does ${math(equation)} have?`), choices, answer, same(`f(-1)=${2 + q}\\qquad f(1)=${q - 2}\\ \\to\\ ${count}`), { q })
}

/* ---------- 2. L'Hôpital ---------- */

function sineQuestion(random: Random): Bach2ApplicationsRaceQuestion | null {
    const k = randomInt(random, 1, 6)
    const m = randomInt(random, 2, 6)
    if (k === m) return null
    const answer = fraction(k, m)
    const choices = options(random, answer, [ratio(m, k, 'swap'), whole(1, 'calculation'), whole(0, 'transform')])
    const limit = `\\lim_{x\\to 0}\\frac{\\sin ${k === 1 ? '' : k}x}{${m}x}`
    return choices && build(2, 'sine', say(`Kalkulatu ${math(limit)}.`, `Calcula ${math(limit)}.`, `احسب ${math(limit)}.`, `Work out ${math(limit)}.`), choices, answer, same(`\\lim_{x\\to 0}\\frac{${k === 1 ? '' : k}\\cos ${k === 1 ? '' : k}x}{${m}}=${written(answer)}`), { k, m })
}

function cosineQuestion(random: Random): Bach2ApplicationsRaceQuestion | null {
    const k = randomInt(random, 1, 4)
    const answer = fraction(k * k, 2)
    const choices = options(random, answer, [whole(k * k, 'twice'), ratio(k, 2, 'calculation'), whole(0, 'transform')])
    const limit = `\\lim_{x\\to 0}\\frac{1-\\cos ${k === 1 ? '' : k}x}{x^2}`
    return choices && build(2, 'cosine', say(`Kalkulatu ${math(limit)}.`, `Calcula ${math(limit)}.`, `احسب ${math(limit)}.`, `Work out ${math(limit)}.`), choices, answer, same(`\\lim_{x\\to 0}\\frac{${k * k}\\cos ${k === 1 ? '' : k}x}{2}=${written(answer)}`), { k })
}

function powerQuestion(random: Random): Bach2ApplicationsRaceQuestion | null {
    const k = randomInt(random, 2, 5)
    const m = randomInt(random, 2, 4)
    const answer = fraction(k * m)
    const choices = options(random, answer, [whole(k, 'calculation'), whole(1, 'transform'), whole(m, 'calculation')])
    const limit = `\\lim_{x\\to 0}(1+${k}x)^{${m}/x}`
    return choices && build(2, 'power', say(`${math(`L=${limit}`)} bada, zenbat da ${math('\\ln L')}?`, `Si ${math(`L=${limit}`)}, ¿cuánto vale ${math('\\ln L')}?`, `إذا كانت ${math(`L=${limit}`)} فكم تساوي ${math('\\ln L')}؟`, `If ${math(`L=${limit}`)}, what is ${math('\\ln L')}?`), choices, answer, same(`\\ln L=\\lim_{x\\to 0}\\frac{${m}\\ln(1+${k}x)}{x}=${k * m}`), { k, m })
}

/* ---------- 3. Coefficients with conditions ---------- */

function minimumQuestion(random: Random): Bach2ApplicationsRaceQuestion | null {
    const p = pick(random, [-3, -2, -1, 1, 2, 3])
    const answer = fraction(-2 * p)
    const choices = options(random, answer, [whole(2 * p, 'sign'), whole(-p, 'calculation'), whole(p * p, 'calculation')])
    const fn = 'f(x)=x^2+bx+1'
    return choices && build(3, 'minimum', say(`${math(fn)} funtzioak minimo bat du ${math(`x=${p}`)} puntuan. Zenbat da ${math('b')}?`, `${math(fn)} tiene un mínimo en ${math(`x=${p}`)}. ¿Cuánto vale ${math('b')}?`, `للدالة ${math(fn)} قيمة صغرى عند ${math(`x=${p}`)}. كم تساوي ${math('b')}؟`, `${math(fn)} has a minimum at ${math(`x=${p}`)}. What is ${math('b')}?`), choices, answer, same(`f'(${p})=${2 * p}+b=0\\ \\to\\ b=${-2 * p}`), { p })
}

function inflectionCoefficientQuestion(random: Random): Bach2ApplicationsRaceQuestion | null {
    const k = pick(random, [-2, -1, 1, 2, 3])
    const answer = fraction(-3 * k)
    const choices = options(random, answer, [ratio(-3 * k, 2, 'inflection-slope'), whole(3 * k, 'sign'), whole(-k, 'calculation')])
    const fn = 'f(x)=x^3+ax^2'
    return choices && build(3, 'inflection-coefficient', say(`${math(fn)} funtzioak inflexio bat du ${math(`x=${k}`)} puntuan. Zenbat da ${math('a')}?`, `${math(fn)} tiene una inflexión en ${math(`x=${k}`)}. ¿Cuánto vale ${math('a')}?`, `للدالة ${math(fn)} نقطة انعطاف عند ${math(`x=${k}`)}. كم تساوي ${math('a')}؟`, `${math(fn)} has an inflection at ${math(`x=${k}`)}. What is ${math('a')}?`), choices, answer, same(`f''(${k})=${6 * k}+2a=0\\ \\to\\ a=${-3 * k}`), { k })
}

function tangentQuestion(random: Random): Bach2ApplicationsRaceQuestion | null {
    const m = pick(random, [-3, -2, 2, 3, 4])
    const n = pick(random, [-2, -1, 1, 3, 5])
    const answer = fraction(m + n)
    const choices = options(random, answer, [whole(m, 'slope-only'), whole(n, 'slope-only'), whole(m - n, 'calculation')])
    const fn = 'f(x)=x^2+bx+c'
    const tangent = `y=${m}x${signed(n)}`
    return choices && build(3, 'tangent', say(`${math(fn)} funtzioaren zuzen ukitzailea ${math('x=0')} puntuan ${math(tangent)} da. Zenbat da ${math('b+c')}?`, `La tangente a ${math(fn)} en ${math('x=0')} es ${math(tangent)}. ¿Cuánto vale ${math('b+c')}?`, `مماس ${math(fn)} عند ${math('x=0')} هو ${math(tangent)}. كم تساوي ${math('b+c')}؟`, `The tangent to ${math(fn)} at ${math('x=0')} is ${math(tangent)}. What is ${math('b+c')}?`), choices, answer, same(`b=f'(0)=${m}\\qquad c=f(0)=${n}\\qquad b+c=${m + n}`), { m, n })
}

/* ---------- 4. Optimisation ---------- */

function productQuestion(random: Random): Bach2ApplicationsRaceQuestion | null {
    const s = pick(random, [6, 8, 10, 12, 14, 18])
    const answer = fraction((s * s) / 4)
    const choices = options(random, answer, [whole(s / 2, 'x-value'), whole((s * s) / 2, 'calculation'), whole(s, 'calculation')])
    return choices && build(4, 'product', say(`Bi zenbaki positiboren batura ${s} da. Zein da haien biderkaduraren balio handiena?`, `Dos números positivos suman ${s}. ¿Cuál es el mayor valor de su producto?`, `مجموع عددين موجبين ${s}. ما أكبر قيمة لجدائهما؟`, `Two positive numbers add up to ${s}. What is the largest value of their product?`), choices, answer, same(`x=${s / 2}\\ \\to\\ ${s / 2}\\cdot ${s / 2}=${(s * s) / 4}`), { s })
}

function areaQuestion(random: Random): Bach2ApplicationsRaceQuestion | null {
    const p = pick(random, [12, 16, 20, 24, 28])
    const answer = fraction((p * p) / 16)
    const choices = options(random, answer, [whole((p * p) / 4, 'half'), whole(p / 4, 'x-value'), whole((p * p) / 8, 'calculation')])
    return choices && build(4, 'area', say(`${p} cm-ko perimetroko laukizuzenetatik, zein da azalera handiena?`, `De los rectángulos de perímetro ${p} cm, ¿cuál es el área máxima?`, `من بين المستطيلات التي محيطها ${p} cm، ما أكبر مساحة؟`, `Of the rectangles with perimeter ${p} cm, what is the largest area?`), choices, answer, same(`A(x)=x(${p / 2}-x)\\ \\to\\ x=${p / 4}\\ \\to\\ ${(p * p) / 16}`), { p })
}

function sumQuestion(random: Random): Bach2ApplicationsRaceQuestion | null {
    const r = randomInt(random, 2, 7)
    const k = r * r
    const answer = fraction(2 * r)
    const choices = options(random, answer, [whole(r, 'x-value'), whole(k, 'calculation'), whole(k + 1, 'calculation')])
    return choices && build(4, 'sum', say(`Bi zenbaki positiboren biderkadura ${k} da. Zein da haien baturaren balio txikiena?`, `Dos números positivos tienen producto ${k}. ¿Cuál es el menor valor de su suma?`, `جداء عددين موجبين ${k}. ما أصغر قيمة لمجموعهما؟`, `Two positive numbers have product ${k}. What is the smallest value of their sum?`), choices, answer, same(`S(x)=x+\\frac{${k}}{x}\\ \\to\\ x=${r}\\ \\to\\ ${2 * r}`), { r })
}

const circuitGenerators: Array<Array<(random: Random, tier: Tier) => Bach2ApplicationsRaceQuestion | null>> = [
    [maxQuestion, inflectionQuestion, absoluteQuestion],
    [rolleQuestion, meanQuestion, rootsQuestion],
    [sineQuestion, cosineQuestion, powerQuestion],
    [minimumQuestion, inflectionCoefficientQuestion, tangentQuestion],
    [productQuestion, areaQuestion, sumQuestion]
]

export function generateBach2ApplicationsRaceQuestion(random: Random, circuit: number, tier: Tier): Bach2ApplicationsRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkBach2ApplicationsPitAnswer(question: RaceQuestion<Bach2ApplicationsRaceError>, input: string): AnswerCheck {
    return checkAnswer(input, question.answer, question.answerForm)
}

export function bach2ApplicationsParTime(circuit: number): number {
    return parTimeFor([12, 13, 14, 13, 12][circuit] ?? 13)
}

export const bach2ApplicationsRaceErrorTips: Record<Bach2ApplicationsRaceError, LocalizedText> = {
    sign: say('Kontuz zeinuarekin.', 'Cuidado con el signo.', 'انتبه إلى الإشارة.', 'Watch the sign.'),
    second: say('Inflexioa $f\'\'=0$ ekuazioan dago, ez $f\'=0$ ekuazioan.', 'La inflexión sale de $f\'\'=0$, no de $f\'=0$.', 'الانعطاف من $f\'\'=0$ لا من $f\'=0$.', 'The inflection comes from $f\'\'=0$, not from $f\'=0$.'),
    interior: say('Begiratu tartearen muturrak ere.', 'Mira también los bordes del intervalo.', 'انظر أيضًا إلى طرفي الفترة.', 'Look at the ends of the interval too.'),
    height: say('$f\'(c)$ berdintzen da, ez $f(c)$.', 'Se iguala $f\'(c)$, no $f(c)$.', 'نساوي $f\'(c)$ لا $f(c)$.', 'Set $f\'(c)$, not $f(c)$.'),
    slope: say('Hori ebakitzailearen malda da; $c$ puntua $f\'(c)=m$ ekuaziotik ateratzen da.', 'Esa es la pendiente de la secante; $c$ sale de $f\'(c)=m$.', 'هذا ميل القاطع؛ و$c$ تخرج من $f\'(c)=m$.', 'That is the slope of the secant; $c$ comes from $f\'(c)=m$.'),
    degree: say('Mailak gehienezkoa ematen du; Bolzano erabili zenbat dauden jakiteko.', 'El grado da el máximo; usa Bolzano para saber cuántas hay.', 'تعطي الدرجة الحد الأعلى؛ استعمل بولتسانو لمعرفة عددها.', 'The degree gives the most; use Bolzano to know how many there are.'),
    swap: say('Goian goikoaren deribatua, behean behekoarena.', 'Arriba la derivada de arriba, abajo la de abajo.', 'في البسط مشتقة البسط وفي المقام مشتقة المقام.', 'On top the derivative of the top, below that of the bottom.'),
    twice: say('Bi aldiz L\'Hôpital: $(x^2)\'\'=2$.', 'L\'Hôpital dos veces: $(x^2)\'\'=2$.', 'لوبيتال مرتين: $(x^2)\'\'=2$.', 'L\'Hôpital twice: $(x^2)\'\'=2$.'),
    transform: say('Indeterminazio bat da: ez du zertan 0 edo 1 izan.', 'Es una indeterminación: no tiene por qué ser 0 o 1.', 'إنها حالة عدم تعيين: لا يلزم أن تكون 0 أو 1.', 'It is an indeterminate form: it need not be 0 or 1.'),
    'inflection-slope': say('Inflexioan $f\'\'=0$, ez $f\'=0$.', 'En la inflexión, $f\'\'=0$, no $f\'=0$.', 'عند الانعطاف $f\'\'=0$ لا $f\'=0$.', 'At an inflection, $f\'\'=0$, not $f\'=0$.'),
    'slope-only': say('Zuzen ukitzaileak malda eta altuera ematen ditu.', 'La tangente da la pendiente y la altura.', 'يعطي المماس الميل والارتفاع.', 'The tangent gives the slope and the height.'),
    'x-value': say('Hori $x$ da; optimoa funtzioaren balioa da.', 'Eso es la $x$; el óptimo es el valor de la función.', 'هذه $x$؛ والقيمة المثلى هي قيمة الدالة.', 'That is the $x$; the optimum is the value of the function.'),
    half: say('Aldeen batura perimetroaren erdia da.', 'La suma de los lados es la mitad del perímetro.', 'مجموع الضلعين نصف المحيط.', 'The sum of the sides is half the perimeter.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}
