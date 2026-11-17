import { checkAnswer, fraction, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { written } from '../../batx1-zientziak-errealak/games/race.ts'
import { same as sameText, say } from '../../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   Adierazpenaren lasterketa · Batxilergoa 2 · Gizarte Zientziak (Carrera de
   gráficas de 2.º Sociales): five circuits, one per stage — first sight
   (a point out of the domain, the y-intercept, the x-intercept),
   asymptotes (vertical, horizontal, the n of the oblique), derivatives
   (the x of a maximum, the x of an inflection, the value of a minimum),
   complete graphs (the minimum of x + c²/x, the top of xᵏe^(−x), the
   asymptote of ln(x − a)) and reading (the corner of |x − a|, the top of
   |x² − a²|, the k of a model). Every question carries `meta`.
   ========================================================================== */

export const BACH2G_SKETCH_RACE_CIRCUITS = 5

export type Bach2gSketchRaceError = 'sign' | 'swap' | 'degrees' | 'value' | 'remainder' | 'calculation'

export type Bach2gSketchRaceQuestion = RaceQuestion<Bach2gSketchRaceError> & { meta: Record<string, number> }

const same = (latex: string): LocalizedText => sameText(`$${latex}$`)
const math = (latex: string) => `$${latex}$`
const signed = (value: number) => (value < 0 ? `-${-value}` : `+${value}`)
const minus = (a: number) => (a === 0 ? '' : signed(-a))

interface Candidate {
    value: FractionValue
    error: Bach2gSketchRaceError
}
const whole = (value: number, error: Bach2gSketchRaceError): Candidate => ({ value: fraction(Math.round(value) + 0), error })
const ratio = (p: number, q: number, error: Bach2gSketchRaceError): Candidate => ({ value: fraction(p, q), error })
const nearby = (value: number): Candidate[] => [value + 1, value - 1, value + 2, value * 2].map((item) => ({ value: fraction(Math.round(item * 1000), 1000), error: 'calculation' as const }))

function options(random: Random, right: FractionValue, candidates: Candidate[]): RaceOption<Bach2gSketchRaceError>[] | null {
    const rightLatex = written(right)
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: Bach2gSketchRaceError }> = []
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

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<Bach2gSketchRaceError>[], answer: FractionValue, solution: LocalizedText, meta: Record<string, number>): Bach2gSketchRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution, meta }
}

const ask = (formula: string, eu: string, es: string, ar: string, en: string) => say(`${math(formula)}. ${eu}`, `${math(formula)}. ${es}`, `${math(formula)}. ${ar}`, `${math(formula)}. ${en}`)

/* ---------- Circuit 0: at first sight ---------- */

function outQuestion(random: Random): Bach2gSketchRaceQuestion | null {
    const a = randomInt(random, -6, 6)
    const p = randomInt(random, 1, 5)
    if (a === 0) return null
    const answer = fraction(a)
    const choices = options(random, answer, [whole(-a, 'sign'), whole(-p, 'swap'), whole(0, 'calculation')])
    const formula = `f(x)=\\frac{x+${p}}{x${minus(a)}}`
    return choices && build(0, 'out', ask(formula, 'Zein $x$ geratzen da izate-eremutik kanpo?', '¿Qué $x$ queda fuera del dominio?', 'ما قيمة $x$ خارج المجال؟', 'Which $x$ is out of the domain?'), choices, answer, same(`x${minus(a)}=0\\ \\to\\ x=${a}`), { a, p })
}

function yCutQuestion(random: Random): Bach2gSketchRaceQuestion | null {
    const p = randomInt(random, -6, 6)
    const a = randomInt(random, -5, 5)
    if (a === 0 || p === 0 || p === a) return null
    const answer = fraction(p, a)
    const choices = options(random, answer, [ratio(a, p, 'swap'), ratio(-p, a, 'sign'), whole(p, 'calculation')])
    const formula = `f(x)=\\frac{x${minus(-p)}}{x${minus(-a)}}`
    return choices && build(0, 'y-cut', ask(formula, 'Non mozten du $Y$ ardatza? Eman $y$.', '¿Dónde corta al eje $Y$? Da la $y$.', 'أين تقطع محور $Y$؟ اكتب $y$.', 'Where does it cut the $Y$ axis? Give $y$.'), choices, answer, same(`f(0)=\\frac{${p}}{${a}}`), { p, a })
}

function xCutQuestion(random: Random): Bach2gSketchRaceQuestion | null {
    const p = randomInt(random, -6, 6)
    const a = randomInt(random, -5, 5)
    if (p === 0 || p === a) return null
    const answer = fraction(p)
    const choices = options(random, answer, [whole(-p, 'sign'), whole(a, 'swap'), whole(p + 1, 'calculation')])
    const formula = `f(x)=\\frac{x${minus(p)}}{x${minus(a)}}`
    return choices && build(0, 'x-cut', ask(formula, 'Non mozten du $X$ ardatza? Eman $x$.', '¿Dónde corta al eje $X$? Da la $x$.', 'أين تقطع محور $X$؟ اكتب $x$.', 'Where does it cut the $X$ axis? Give $x$.'), choices, answer, same(`x${minus(p)}=0\\ \\to\\ x=${p}`), { p, a })
}

/* ---------- Circuit 1: asymptotes ---------- */

function verticalQuestion(random: Random): Bach2gSketchRaceQuestion | null {
    const a = randomInt(random, -6, 6)
    const b = randomInt(random, 2, 6)
    if (a === 0 || a === b) return null
    const answer = fraction(a)
    const choices = options(random, answer, [whole(-a, 'sign'), whole(b, 'swap'), whole(0, 'calculation')])
    const formula = `f(x)=\\frac{${b}x}{x${minus(a)}}`
    return choices && build(1, 'vertical', ask(formula, 'Asintota bertikala: $x=$?', 'Asíntota vertical: $x=$?', 'المقارب العمودي: $x=$؟', 'Vertical asymptote: $x=$?'), choices, answer, same(`x=${a}`), { a, b })
}

function horizontalQuestion(random: Random): Bach2gSketchRaceQuestion | null {
    const b = randomInt(random, 1, 8)
    const c = randomInt(random, 2, 5)
    const d = randomInt(random, 1, 9)
    const answer = fraction(b, c)
    const choices = options(random, answer, [whole(b, 'degrees'), ratio(c, b, 'swap'), whole(0, 'degrees')])
    const formula = `f(x)=\\frac{${b}x+${d}}{${c}x-1}`
    return choices && build(1, 'horizontal', ask(formula, 'Asintota horizontala: $y=$?', 'Asíntota horizontal: $y=$?', 'المقارب الأفقي: $y=$؟', 'Horizontal asymptote: $y=$?'), choices, answer, same(`y=\\frac{${b}}{${c}}`), { b, c, d })
}

function obliqueQuestion(random: Random): Bach2gSketchRaceQuestion | null {
    const nn = randomInt(random, -5, 5)
    const r = pick(random, [-3, -2, -1, 1, 2, 3])
    // (x² + n x + r)/x = x + n + r/x
    if (nn === r || nn === 0) return null
    const answer = fraction(nn)
    const choices = options(random, answer, [whole(r, 'remainder'), whole(-nn, 'sign'), whole(nn + r, 'calculation')])
    const formula = `f(x)=\\frac{x^2${signed(nn)}x${signed(r)}}{x}`
    return choices && build(1, 'oblique', ask(formula, 'Asintota zeiharra $y=x+n$: zenbat da $n$?', 'Asíntota oblicua $y=x+n$: ¿cuánto vale $n$?', 'المقارب المائل $y=x+n$: كم تساوي $n$؟', 'Oblique asymptote $y=x+n$: what is $n$?'), choices, answer, same(`f(x)=x${signed(nn)}${r < 0 ? '-' : '+'}\\frac{${Math.abs(r)}}{x}`), { n: nn, r })
}

/* ---------- Circuit 2: with derivatives ---------- */

function maxQuestion(random: Random): Bach2gSketchRaceQuestion | null {
    const k = randomInt(random, 1, 5)
    const answer = fraction(-k)
    const choices = options(random, answer, [whole(k, 'sign'), whole(2 * k ** 3, 'value'), whole(3 * k * k, 'calculation')])
    const formula = `f(x)=x^3-${3 * k * k}x`
    return choices && build(2, 'max', ask(formula, 'Maximo erlatiboaren $x$?', '¿La $x$ del máximo relativo?', 'ما $x$ القيمة العظمى المحلية؟', 'The $x$ of the relative maximum?'), choices, answer, same(`f''(-${k})=-${6 * k}<0`), { k })
}

function inflectionQuestion(random: Random): Bach2gSketchRaceQuestion | null {
    const p = randomInt(random, -4, 4)
    if (p === 0) return null
    const answer = fraction(p)
    const choices = options(random, answer, [whole(-p, 'sign'), whole(2 * p, 'calculation'), whole(3 * p, 'calculation')])
    const formula = `f(x)=x^3${signed(-3 * p)}x^2`
    return choices && build(2, 'inflection', ask(formula, 'Inflexio-puntuaren $x$?', '¿La $x$ del punto de inflexión?', 'ما $x$ نقطة الانعطاف؟', 'The $x$ of the point of inflection?'), choices, answer, same(`f''(x)=6x${signed(-6 * p)}=0\\ \\to\\ x=${p}`), { p })
}

function minValueQuestion(random: Random): Bach2gSketchRaceQuestion | null {
    const a = randomInt(random, 1, 6)
    const c = randomInt(random, -5, 9)
    const answer = fraction(c - a * a)
    const choices = options(random, answer, [whole(a, 'value'), whole(c, 'calculation'), whole(c + a * a, 'sign')])
    const formula = `f(x)=x^2-${2 * a}x${c === 0 ? '' : signed(c)}`
    return choices && build(2, 'min-value', ask(formula, 'Minimoaren balioa?', '¿El valor del mínimo?', 'ما قيمة الصغرى؟', 'The minimum value?'), choices, answer, same(`f(${a})=${c - a * a}`), { a, c })
}

/* ---------- Circuit 3: complete graphs ---------- */

function rationalMinQuestion(random: Random): Bach2gSketchRaceQuestion | null {
    const c = randomInt(random, 1, 6)
    const answer = fraction(2 * c)
    const choices = options(random, answer, [whole(c, 'value'), whole(c * c, 'calculation'), whole(c * c + 1, 'calculation')])
    const formula = `f(x)=\\frac{x^2+${c * c}}{x}`
    return choices && build(3, 'rational-min', ask(formula, 'Minimo erlatiboaren balioa, $x>0$?', '¿Valor del mínimo relativo con $x>0$?', 'قيمة الصغرى المحلية مع $x>0$؟', 'Relative minimum value for $x>0$?'), choices, answer, same(`x=${c}\\ \\to\\ f(${c})=${2 * c}`), { c })
}

function expTopQuestion(random: Random): Bach2gSketchRaceQuestion | null {
    const k = randomInt(random, 1, 5)
    const answer = fraction(k)
    const choices = options(random, answer, [whole(k + 1, 'calculation'), whole(-k, 'sign'), whole(0, 'calculation')])
    const formula = `f(x)=x^{${k}}e^{-x}`
    return choices && build(3, 'exp-top', ask(formula, 'Zein $x>0$ baliotan da maximoa?', '¿En qué $x>0$ está el máximo?', 'عند أي $x>0$ القيمة العظمى؟', 'At which $x>0$ is the maximum?'), choices, answer, same(`f'(x)=x^{${k - 1}}(${k}-x)e^{-x}\\ \\to\\ x=${k}`), { k })
}

function lnQuestion(random: Random): Bach2gSketchRaceQuestion | null {
    const a = randomInt(random, -6, 6)
    if (a === 0) return null
    const answer = fraction(a)
    const choices = options(random, answer, [whole(-a, 'sign'), whole(0, 'calculation'), whole(a + 1, 'calculation')])
    const formula = `f(x)=\\ln(x${minus(a)})`
    return choices && build(3, 'ln', ask(formula, 'Asintota bertikala: $x=$?', 'Asíntota vertical: $x=$?', 'المقارب العمودي: $x=$؟', 'Vertical asymptote: $x=$?'), choices, answer, same(`x${minus(a)}>0\\ \\to\\ x>${a}`), { a })
}

/* ---------- Circuit 4: read and draw ---------- */

function cornerQuestion(random: Random): Bach2gSketchRaceQuestion | null {
    const a = randomInt(random, -8, 8)
    const m = randomInt(random, 2, 4)
    if (a === 0) return null
    const answer = fraction(a)
    const choices = options(random, answer, [whole(-a, 'sign'), whole(m * a, 'calculation'), whole(0, 'calculation')])
    const formula = `f(x)=|${m}x${signed(-m * a)}|`
    return choices && build(4, 'corner', ask(formula, 'Puntaren $x$?', '¿La $x$ del pico?', 'ما $x$ الزاوية؟', 'The $x$ of the corner?'), choices, answer, same(`${m}x${signed(-m * a)}=0\\ \\to\\ x=${a}`), { a, m })
}

function absTopQuestion(random: Random): Bach2gSketchRaceQuestion | null {
    const a = randomInt(random, 2, 7)
    const answer = fraction(a * a)
    const choices = options(random, answer, [whole(-a * a, 'sign'), whole(a, 'value'), whole(0, 'calculation')])
    const formula = `f(x)=|x^2-${a * a}|`
    return choices && build(4, 'abs-top', ask(formula, 'Maximo erlatiboaren balioa?', '¿Valor del máximo relativo?', 'قيمة العظمى المحلية؟', 'Relative maximum value?'), choices, answer, same(`f(0)=|-${a * a}|=${a * a}`), { a })
}

function modelQuestion(random: Random): Bach2gSketchRaceQuestion | null {
    const b = randomInt(random, -3, 3)
    const k = randomInt(random, -5, 5)
    const a = randomInt(random, -3, 3)
    if (k === 0) return null
    const answer = fraction(k)
    const choices = options(random, answer, [whole(b + k, 'value'), whole(-k, 'sign'), whole(b, 'swap')])
    const formula = `f(x)=${b}+\\frac{k}{x${minus(a)}}`
    return choices && build(4, 'model', say(`${math(formula)} eta ${math(`f(${a + 1})=${b + k}`)}. Zenbat da ${math('k')}?`, `${math(formula)} y ${math(`f(${a + 1})=${b + k}`)}. ¿Cuánto vale ${math('k')}?`, `${math(formula)} و${math(`f(${a + 1})=${b + k}`)}. كم تساوي ${math('k')}؟`, `${math(formula)} and ${math(`f(${a + 1})=${b + k}`)}. What is ${math('k')}?`), choices, answer, same(`${b}+\\frac{k}{1}=${b + k}\\ \\to\\ k=${k}`), { a, b, k })
}

const circuitGenerators: Array<Array<(random: Random, tier: Tier) => Bach2gSketchRaceQuestion | null>> = [
    [outQuestion, yCutQuestion, xCutQuestion],
    [verticalQuestion, horizontalQuestion, obliqueQuestion],
    [maxQuestion, inflectionQuestion, minValueQuestion],
    [rationalMinQuestion, expTopQuestion, lnQuestion],
    [cornerQuestion, absTopQuestion, modelQuestion]
]

export function generateBach2gSketchRaceQuestion(random: Random, circuit: number, tier: Tier): Bach2gSketchRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkBach2gSketchPitAnswer(question: RaceQuestion<Bach2gSketchRaceError>, input: string): AnswerCheck {
    return checkAnswer(input, question.answer, question.answerForm)
}

export function bach2gSketchParTime(circuit: number): number {
    return parTimeFor([12, 13, 14, 14, 13][circuit] ?? 13)
}

export const bach2gSketchRaceErrorTips: Record<Bach2gSketchRaceError, LocalizedText> = {
    sign: say('Zeinua: $x-a=0$ bada, $x=a$.', 'El signo: si $x-a=0$, $x=a$.', 'الإشارة: إذا كان $x-a=0$ فإن $x=a$.', 'The sign: if $x-a=0$, then $x=a$.'),
    swap: say('Ez nahastu zenbakitzailea eta izendatzailea.', 'No mezcles numerador y denominador.', 'لا تخلط بين البسط والمقام.', 'Do not mix up numerator and denominator.'),
    degrees: say('Asintota horizontala: alderatu mailak lehenik.', 'Asíntota horizontal: compara primero los grados.', 'المقارب الأفقي: قارن الدرجات أولًا.', 'Horizontal asymptote: compare the degrees first.'),
    value: say('Begiratu zer eskatzen den: $x$ ala balioa.', 'Mira qué se pide: la $x$ o el valor.', 'انظر ماذا يُطلب: $x$ أم القيمة.', 'Check what is asked: the $x$ or the value.'),
    remainder: say('Zeiharra zatidura da, ez hondarra.', 'La oblicua es el cociente, no el resto.', 'المائل هو خارج القسمة لا الباقي.', 'The oblique one is the quotient, not the remainder.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}
