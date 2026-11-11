import { checkAnswer, fraction, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { written } from '../../batx1-zientziak-errealak/games/race.ts'
import { same as sameText, say } from '../../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   Adierazpenaren lasterketa · Batxilergoa 2 (Carrera de la
   representación): five circuits, one per stage — the review (a vertical
   asymptote, a horizontal one, the n of an oblique one), the study (f(−a)
   of an odd function, a period, the edge of a domain), exponentials and
   logarithms (the x of a maximum, a vertical asymptote, a horizontal
   one), roots, trigonometric and pieces (the n of an oblique one with a
   root, the maximum of a·sin x + b·cos x, a parameter for continuity) and
   reading graphs (corners of |f|, the maximum of f from f′, the
   inflection of f from f′). The wrong options are the typical mistakes;
   every question carries `meta`, the numbers the tests check it against.
   ========================================================================== */

export const BACH2_SKETCH_RACE_CIRCUITS = 5

export type Bach2SketchRaceError =
    | 'sign'
    | 'swap'
    | 'remainder'
    | 'parity'
    | 'period'
    | 'square'
    | 'reciprocal'
    | 'domain'
    | 'constant'
    | 'double'
    | 'sum'
    | 'divide'
    | 'zeros'
    | 'other-root'
    | 'vertex'
    | 'calculation'

export type Bach2SketchRaceQuestion = RaceQuestion<Bach2SketchRaceError> & { meta: Record<string, number> }

/** A worked solution in rows (each \qquad and each \ \to\ starts one), so that it fits a phone */
function rows(latex: string): string {
    if (latex.length <= 14) return latex
    const parts = latex.split('\\qquad').flatMap((part) => {
        const [first, ...rest] = part.trim().split('\\ \\to\\ ')
        return [first, ...rest.map((piece) => `\\to\\ ${piece}`)]
    })
    return parts.length > 1 ? `\\begin{gathered}${parts.join('\\\\ ')}\\end{gathered}` : latex
}
const same = (latex: string): LocalizedText => sameText(`$${rows(latex)}$`)
const math = (latex: string) => `$${latex}$`
const signed = (value: number) => (value < 0 ? `-${-value}` : `+${value}`)

interface Candidate {
    value: FractionValue
    error: Bach2SketchRaceError
}
const whole = (value: number, error: Bach2SketchRaceError): Candidate => ({ value: fraction(Math.round(value) + 0), error })
const ratio = (p: number, q: number, error: Bach2SketchRaceError): Candidate => ({ value: fraction(p, q), error })
const nearby = (value: number): Candidate[] => [value + 1, value - 1, value + 2, value * 2].map((item) => ({ value: fraction(Math.round(item * 10000), 10000), error: 'calculation' as const }))

/** The right option and three different mistakes */
function options(random: Random, right: FractionValue, candidates: Candidate[]): RaceOption<Bach2SketchRaceError>[] | null {
    const rightLatex = written(right)
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: Bach2SketchRaceError }> = []
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

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<Bach2SketchRaceError>[], answer: FractionValue, solution: LocalizedText, meta: Record<string, number>): Bach2SketchRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution, meta }
}

/* ---------- 0. Review ---------- */

function verticalQuestion(random: Random): Bach2SketchRaceQuestion | null {
    const p = pick(random, [-4, -3, -2, -1, 1, 2, 3, 4])
    const k = randomInt(random, 2, 6)
    const answer = fraction(p)
    const choices = options(random, answer, [whole(-p, 'sign'), whole(k, 'swap'), whole(0, 'calculation')])
    const fn = `f(x)=\\frac{${k}}{x${signed(-p)}}`
    return choices && build(0, 'vertical', say(`Zein abzisatan du ${math(fn)} funtzioak asintota bertikala?`, `¿En qué abscisa tiene ${math(fn)} su asíntota vertical?`, `عند أي فاصلة يقع المقارب الرأسي للدالة ${math(fn)}؟`, `At which abscissa does ${math(fn)} have its vertical asymptote?`), choices, answer, same(`x${signed(-p)}=0\\ \\to\\ x=${p}`), { p, k })
}

function horizontalQuestion(random: Random): Bach2SketchRaceQuestion | null {
    const a = randomInt(random, 1, 6)
    const c = randomInt(random, 2, 4)
    const b = randomInt(random, 1, 5)
    const d = randomInt(random, 1, 5)
    if (a * d === b * c) return null
    const answer = fraction(a, c)
    const choices = options(random, answer, [ratio(b, d, 'swap'), ratio(c, a, 'reciprocal'), whole(0, 'calculation')])
    const fn = `f(x)=\\frac{${a === 1 ? '' : a}x+${b}}{${c}x+${d}}`
    return choices && build(0, 'horizontal', say(`${math(fn)} funtzioaren asintota horizontala ${math('y=k')} da. Zenbat da ${math('k')}?`, `La asíntota horizontal de ${math(fn)} es ${math('y=k')}. ¿Cuánto vale ${math('k')}?`, `المقارب الأفقي للدالة ${math(fn)} هو ${math('y=k')}. كم تساوي ${math('k')}؟`, `The horizontal asymptote of ${math(fn)} is ${math('y=k')}. What is ${math('k')}?`), choices, answer, same(`\\lim_{x\\to\\pm\\infty}f(x)=${written(answer)}`), { a, b, c, d })
}

function obliqueQuestion(random: Random): Bach2SketchRaceQuestion | null {
    const b = randomInt(random, 1, 4)
    const p = randomInt(random, 1, 3)
    const answer = fraction(b + p)
    const choices = options(random, answer, [whole(b, 'remainder'), whole(p, 'remainder'), whole(b - p, 'sign')])
    const fn = `f(x)=\\frac{x^2+${b}x}{x-${p}}`
    return choices && build(0, 'oblique', say(`${math(fn)} funtzioaren asintota zeiharra ${math('y=x+n')} da. Zenbat da ${math('n')}?`, `La asíntota oblicua de ${math(fn)} es ${math('y=x+n')}. ¿Cuánto vale ${math('n')}?`, `المقارب المائل للدالة ${math(fn)} هو ${math('y=x+n')}. كم تساوي ${math('n')}؟`, `The oblique asymptote of ${math(fn)} is ${math('y=x+n')}. What is ${math('n')}?`), choices, answer, sameText(`$\\begin{gathered}x^2+${b}x\\\\ =(x-${p})(x+${b + p})+${p * (b + p)}\\end{gathered}$`), { b, p })
}

/* ---------- 1. The study before differentiating ---------- */

function oddQuestion(random: Random): Bach2SketchRaceQuestion | null {
    const a = randomInt(random, 1, 5)
    const v = pick(random, [-7, -5, -3, -2, 2, 3, 5, 7])
    const answer = fraction(-v)
    const choices = options(random, answer, [whole(v, 'parity'), whole(-a, 'calculation'), whole(0, 'calculation')])
    return choices && build(1, 'odd', say(`${math('f')} bakoitia da eta ${math(`f(${a})=${v}`)}. Zenbat da ${math(`f(-${a})`)}?`, `${math('f')} es impar y ${math(`f(${a})=${v}`)}. ¿Cuánto vale ${math(`f(-${a})`)}?`, `${math('f')} فردية و${math(`f(${a})=${v}`)}. كم تساوي ${math(`f(-${a})`)}؟`, `${math('f')} is odd and ${math(`f(${a})=${v}`)}. What is ${math(`f(-${a})`)}?`), choices, answer, same(`f(-${a})=-f(${a})=${-v}`), { a, v })
}

function periodQuestion(random: Random): Bach2SketchRaceQuestion | null {
    const k = randomInt(random, 2, 6)
    const answer = fraction(2, k)
    const choices = options(random, answer, [whole(2 * k, 'period'), ratio(k, 2, 'reciprocal'), ratio(1, k, 'calculation')])
    const fn = `f(x)=\\cos ${k}x`
    return choices && build(1, 'period', say(`${math(fn)} funtzioaren periodoa ${math('c\\,\\pi')} da. Zenbat da ${math('c')}?`, `El periodo de ${math(fn)} es ${math('c\\,\\pi')}. ¿Cuánto vale ${math('c')}?`, `دور الدالة ${math(fn)} هو ${math('c\\,\\pi')}. كم تساوي ${math('c')}؟`, `The period of ${math(fn)} is ${math('c\\,\\pi')}. What is ${math('c')}?`), choices, answer, same(`T=\\frac{2\\pi}{${k}}\\ \\to\\ c=${written(answer)}`), { k })
}

function edgeQuestion(random: Random): Bach2SketchRaceQuestion | null {
    const a = randomInt(random, 2, 7)
    const answer = fraction(a)
    const choices = options(random, answer, [whole(a * a, 'square'), whole(-a, 'sign'), whole(a / 2, 'calculation')])
    const fn = `f(x)=\\sqrt{${a * a}-x^2}`
    return choices && build(1, 'edge', say(`Non amaitzen da eskuinetik ${math(fn)} funtzioaren izate-eremua?`, `¿Dónde termina por la derecha el dominio de ${math(fn)}?`, `أين ينتهي مجال ${math(fn)} من اليمين؟`, `Where does the domain of ${math(fn)} end on the right?`), choices, answer, same(`${a * a}-x^2\\ge 0\\ \\to\\ -${a}\\le x\\le ${a}`), { a })
}

/* ---------- 2. Exponential and logarithmic ---------- */

function expMaxQuestion(random: Random): Bach2SketchRaceQuestion | null {
    const k = randomInt(random, 2, 5)
    const answer = fraction(1, k)
    const choices = options(random, answer, [whole(k, 'reciprocal'), ratio(-1, k, 'sign'), whole(1, 'calculation')])
    const fn = `f(x)=x\\,e^{-${k}x}`
    return choices && build(2, 'exp-max', say(`Zein abzisatan du ${math(fn)} funtzioak maximoa?`, `¿En qué abscisa tiene ${math(fn)} su máximo?`, `عند أي فاصلة تبلغ ${math(fn)} قيمتها العظمى؟`, `At which abscissa does ${math(fn)} have its maximum?`), choices, answer, same(`f'(x)=e^{-${k}x}(1-${k}x)=0\\ \\to\\ x=${written(answer)}`), { k })
}

function logQuestion(random: Random): Bach2SketchRaceQuestion | null {
    const p = pick(random, [-4, -3, -2, -1, 1, 2, 3, 4])
    const answer = fraction(p)
    const choices = options(random, answer, [whole(-p, 'sign'), whole(p + 1, 'domain'), whole(0, 'calculation')])
    const fn = `f(x)=\\ln(x${signed(-p)})`
    return choices && build(2, 'log', say(`Zein abzisatan du ${math(fn)} funtzioak asintota bertikala?`, `¿En qué abscisa tiene ${math(fn)} su asíntota vertical?`, `عند أي فاصلة يقع المقارب الرأسي للدالة ${math(fn)}؟`, `At which abscissa does ${math(fn)} have its vertical asymptote?`), choices, answer, same(`x${signed(-p)}\\to 0^+\\ \\to\\ x=${p}`), { p })
}

function expHorizontalQuestion(random: Random): Bach2SketchRaceQuestion | null {
    const k = randomInt(random, 1, 6)
    const m = randomInt(random, 2, 4)
    const answer = fraction(k)
    const choices = options(random, answer, [whole(0, 'constant'), whole(k + m, 'calculation'), whole(-k, 'sign')])
    const fn = `f(x)=${k}+${m}e^{-x}`
    return choices && build(2, 'exp-horizontal', say(`${math('x\\to+\\infty')} doanean, ${math(fn)} funtzioaren asintota horizontala ${math('y=k')} da. Zenbat da ${math('k')}?`, `Cuando ${math('x\\to+\\infty')}, la asíntota horizontal de ${math(fn)} es ${math('y=k')}. ¿Cuánto vale ${math('k')}?`, `عندما ${math('x\\to+\\infty')} يكون المقارب الأفقي للدالة ${math(fn)} هو ${math('y=k')}. كم تساوي ${math('k')}؟`, `As ${math('x\\to+\\infty')}, the horizontal asymptote of ${math(fn)} is ${math('y=k')}. What is ${math('k')}?`), choices, answer, same(`e^{-x}\\to 0\\ \\to\\ y=${k}`), { k, m })
}

/* ---------- 3. Roots, trigonometric and pieces ---------- */

function rootQuestion(random: Random): Bach2SketchRaceQuestion | null {
    const p = randomInt(random, 1, 5)
    const answer = fraction(p)
    const choices = options(random, answer, [whole(2 * p, 'double'), whole(-p, 'sign'), whole(p * p, 'calculation')])
    const fn = `f(x)=\\sqrt{x^2+${2 * p}x}`
    return choices && build(3, 'root', say(`${math(fn)} funtzioaren eskuineko asintota zeiharra ${math('y=x+n')} da. Zenbat da ${math('n')}?`, `La asíntota oblicua de ${math(fn)} por la derecha es ${math('y=x+n')}. ¿Cuánto vale ${math('n')}?`, `المقارب المائل للدالة ${math(fn)} من اليمين هو ${math('y=x+n')}. كم تساوي ${math('n')}؟`, `On the right, the oblique asymptote of ${math(fn)} is ${math('y=x+n')}. What is ${math('n')}?`), choices, answer, same(`\\frac{${2 * p}x}{\\sqrt{x^2+${2 * p}x}+x}\\to\\frac{${2 * p}}{2}=${p}`), { p })
}

function trigQuestion(random: Random): Bach2SketchRaceQuestion | null {
    const [a, b, c] = pick(random, [[3, 4, 5], [4, 3, 5], [6, 8, 10], [5, 12, 13], [8, 6, 10]])
    const answer = fraction(c)
    const choices = options(random, answer, [whole(a + b, 'sum'), whole(Math.max(a, b), 'calculation'), whole(c * c, 'square')])
    const fn = `f(x)=${a}\\sin x+${b}\\cos x`
    return choices && build(3, 'trig', say(`Zein da ${math(fn)} funtzioaren balio handiena?`, `¿Cuál es el valor máximo de ${math(fn)}?`, `ما القيمة العظمى للدالة ${math(fn)}؟`, `What is the maximum value of ${math(fn)}?`), choices, answer, same(`\\sqrt{${a}^{2}+${b}^{2}}=\\sqrt{${c * c}}=${c}`), { a, b, c })
}

function pieceQuestion(random: Random): Bach2SketchRaceQuestion | null {
    const p = randomInt(random, 2, 3)
    const a = pick(random, [-2, -1, 1, 2, 3])
    const b = p * p - a * p
    if (b === 0) return null
    const answer = fraction(a)
    const choices = options(random, answer, [whole(p * p - b, 'divide'), whole(-a, 'sign'), whole(b, 'calculation')])
    const left = `ax${signed(b)}`
    const fn = `f(x)=\\begin{cases}${left} & x<${p}\\\\ x^2 & x\\ge ${p}\\end{cases}`
    return choices && build(3, 'piece', say(`${math(fn)} jarraitua da. Zenbat da ${math('a')}?`, `${math(fn)} es continua. ¿Cuánto vale ${math('a')}?`, `${math(fn)} متصلة. كم تساوي ${math('a')}؟`, `${math(fn)} is continuous. What is ${math('a')}?`), choices, answer, same(`${p}a${signed(b)}=${p * p}\\ \\to\\ a=${a}`), { p, a, b })
}

/* ---------- 4. Reading graphs ---------- */

function cornersQuestion(random: Random): Bach2SketchRaceQuestion | null {
    const kind = randomInt(random, 0, 2)
    const k = randomInt(random, 1, 4)
    const [fn, count, solution] = kind === 0
        ? [`y=|x^2-${k * k}|`, 2, `x^2-${k * k}=0\\ \\to\\ x=\\pm ${k}`]
        : kind === 1
            ? [`y=|x^2+${k}|`, 0, `x^2+${k}>0`]
            : [`y=|x^3-${k * k}x|`, 3, `x(x^2-${k * k})=0\\ \\to\\ x=0,\\ x=\\pm ${k}`]
    const answer = fraction(count)
    const choices = options(random, answer, [whole(kind === 1 ? 2 : count - 1, 'zeros'), whole(kind === 1 ? 1 : count + 1, 'zeros'), whole(4, 'calculation')])
    return choices && build(4, 'corners', say(`Zenbat punta ditu ${math(fn)} funtzioaren grafikoak?`, `¿Cuántos picos tiene la gráfica de ${math(fn)}?`, `كم زاوية في رسم ${math(fn)}؟`, `How many corners does the graph of ${math(fn)} have?`), choices, answer, same(solution), { kind, k, count })
}

function fprimeQuestion(random: Random): Bach2SketchRaceQuestion | null {
    const a = randomInt(random, -4, 1)
    const b = a + pick(random, [2, 4])
    // f′ = (x − a)(x − b): + − +, the maximum of f is at a
    const answer = fraction(a)
    const choices = options(random, answer, [whole(b, 'other-root'), whole((a + b) / 2, 'vertex'), whole(-a, 'sign')])
    const fp = `f'(x)=(x${signed(-a)})(x${signed(-b)})`.replace('(x+0)', 'x').replace('(x-0)', 'x')
    return choices && build(4, 'fprime', say(`${math(fp)} bada, zein abzisatan du ${math('f')} funtzioak maximoa?`, `Si ${math(fp)}, ¿en qué abscisa tiene ${math('f')} su máximo?`, `إذا كانت ${math(fp)} فعند أي فاصلة تكون القيمة العظمى لـ ${math('f')}؟`, `If ${math(fp)}, at which abscissa does ${math('f')} have its maximum?`), choices, answer, same(`f':\\ +\\ \\to\\ -\\ \\to\\ x=${a}`), { a, b })
}

function inflectionQuestion(random: Random): Bach2SketchRaceQuestion | null {
    const a = randomInt(random, -4, 1)
    const b = a + pick(random, [2, 4, 6])
    const v = (a + b) / 2
    const answer = fraction(v)
    const choices = options(random, answer, [whole(a, 'other-root'), whole(b, 'other-root'), whole(-v, 'sign')])
    const fp = `f'(x)=(x${signed(-a)})(x${signed(-b)})`.replace('(x+0)', 'x').replace('(x-0)', 'x')
    return choices && build(4, 'inflection', say(`${math(fp)} bada, zein abzisatan du ${math('f')} funtzioak inflexio-puntua?`, `Si ${math(fp)}, ¿en qué abscisa tiene ${math('f')} su punto de inflexión?`, `إذا كانت ${math(fp)} فعند أي فاصلة تكون نقطة انعطاف ${math('f')}؟`, `If ${math(fp)}, at which abscissa does ${math('f')} have its point of inflection?`), choices, answer, same(`f''(x)=2x${signed(-(a + b))}=0\\ \\to\\ x=${v}`), { a, b })
}

const circuitGenerators: Array<Array<(random: Random, tier: Tier) => Bach2SketchRaceQuestion | null>> = [
    [verticalQuestion, horizontalQuestion, obliqueQuestion],
    [oddQuestion, periodQuestion, edgeQuestion],
    [expMaxQuestion, logQuestion, expHorizontalQuestion],
    [rootQuestion, trigQuestion, pieceQuestion],
    [cornersQuestion, fprimeQuestion, inflectionQuestion]
]

export function generateBach2SketchRaceQuestion(random: Random, circuit: number, tier: Tier): Bach2SketchRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkBach2SketchPitAnswer(question: RaceQuestion<Bach2SketchRaceError>, input: string): AnswerCheck {
    return checkAnswer(input, question.answer, question.answerForm)
}

export function bach2SketchParTime(circuit: number): number {
    return parTimeFor([12, 12, 13, 14, 13][circuit] ?? 13)
}

export const bach2SketchRaceErrorTips: Record<Bach2SketchRaceError, LocalizedText> = {
    sign: say('Kontuz zeinuarekin.', 'Cuidado con el signo.', 'انتبه إلى الإشارة.', 'Watch the sign.'),
    swap: say('Ez nahastu zenbakitzailea eta izendatzailea.', 'No confundas numerador y denominador.', 'لا تخلط بين البسط والمقام.', 'Do not mix up the numerator and the denominator.'),
    remainder: say('Zeiharra zatidura osoa da: zatitu ondo.', 'La oblicua es el cociente entero: divide bien.', 'المائل هو خارج القسمة كاملًا: اقسم جيدًا.', 'The oblique asymptote is the whole quotient: divide carefully.'),
    parity: say('Bakoitia bada, $f(-a)=-f(a)$.', 'Si es impar, $f(-a)=-f(a)$.', 'إذا كانت فردية فإن $f(-a)=-f(a)$.', 'If it is odd, $f(-a)=-f(a)$.'),
    period: say('$\\cos kx$ funtzioaren periodoa $\\frac{2\\pi}{k}$ da, ez $2\\pi k$.', 'El periodo de $\\cos kx$ es $\\frac{2\\pi}{k}$, no $2\\pi k$.', 'دور $\\cos kx$ هو $\\frac{2\\pi}{k}$ لا $2\\pi k$.', 'The period of $\\cos kx$ is $\\frac{2\\pi}{k}$, not $2\\pi k$.'),
    square: say('Atera erro karratua.', 'Saca la raíz cuadrada.', 'خذ الجذر التربيعي.', 'Take the square root.'),
    reciprocal: say('Begiratu zer dagoen goian eta zer behean.', 'Mira qué va arriba y qué abajo.', 'انظر ماذا في البسط وماذا في المقام.', 'Look at what goes on top and what goes below.'),
    domain: say('Logaritmoaren asintota barrukoa zero den tokian dago.', 'La asíntota del logaritmo está donde lo de dentro se anula.', 'مقارب اللوغاريتم حيث ينعدم ما بالداخل.', 'The asymptote of the logarithm is where the inside is 0.'),
    constant: say('Konstantea geratu egiten da: $e^{-x}$ bakarrik doa 0 aldera.', 'La constante se queda: solo $e^{-x}$ va a 0.', 'يبقى الثابت: $e^{-x}$ وحدها تؤول إلى 0.', 'The constant stays: only $e^{-x}$ goes to 0.'),
    double: say('Konjokatuaren ondoren zatitu $2x$ ere.', 'Después del conjugado, divide también entre $2x$.', 'بعد المرافق اقسم أيضًا على $2x$.', 'After the conjugate, divide by $2x$ as well.'),
    sum: say('Anplitudea $\\sqrt{a^2+b^2}$ da, ez $a+b$.', 'La amplitud es $\\sqrt{a^2+b^2}$, no $a+b$.', 'السعة $\\sqrt{a^2+b^2}$ لا $a+b$.', 'The amplitude is $\\sqrt{a^2+b^2}$, not $a+b$.'),
    divide: say('Ekuazioa bukatu: zatitu ezezagunaren koefizienteaz.', 'Termina la ecuación: divide entre el coeficiente de la incógnita.', 'أكمل المعادلة: اقسم على معامل المجهول.', 'Finish the equation: divide by the coefficient of the unknown.'),
    zeros: say('Punta bat $f$ funtzioak zeinua aldatzen duen zero bakoitzean.', 'Un pico en cada cero donde $f$ cambia de signo.', 'زاوية عند كل صفر تغيّر فيه $f$ إشارتها.', 'One corner at each zero where $f$ changes sign.'),
    'other-root': say('Bi erroetatik, $f\'$ deribatua $+$ zeinutik $-$ zeinura pasatzen den tokia.', 'De las dos raíces, la que hace pasar $f\'$ de $+$ a $-$.', 'من الجذرين: الذي تنتقل عنده $f\'$ من $+$ إلى $-$.', 'Of the two roots, the one where $f\'$ goes from $+$ to $-$.'),
    vertex: say('$f\'$ deribatuaren erpina $f$ funtzioaren inflexioa da, ez muturra.', 'El vértice de $f\'$ es la inflexión de $f$, no su extremo.', 'رأس $f\'$ هو انعطاف $f$ لا قيمتها القصوى.', 'The vertex of $f\'$ is the inflection of $f$, not its extremum.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}
