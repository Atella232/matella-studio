import { checkAnswer, fraction, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { written } from '../../batx1-zientziak-errealak/games/race.ts'
import { same as sameText, say } from '../../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   Aplikazioen lasterketa · Batxilergoa 2 · Gizarte Zientziak (Carrera de
   aplicaciones de 2.º Sociales): five circuits, one per stage — the
   tangent (the n of a tangent, a slope, the x of a parallel tangent),
   growth (where a parabola turns, f′(a), the end of a growing period),
   extrema (the top of a parabola, the x of a minimum, an absolute
   maximum), curvature (the x of an inflection, f″(a), the slope at the
   inflection) and optimisation (the best units, the highest profit, the
   cheapest average). The wrong options are the typical mistakes; every
   question carries `meta`.
   ========================================================================== */

export const BACH2G_APPLICATIONS_RACE_CIRCUITS = 5

export type Bach2gApplicationsRaceError = 'slope' | 'intercept' | 'sign' | 'value' | 'ends' | 'second' | 'two' | 'average' | 'calculation'

export type Bach2gApplicationsRaceQuestion = RaceQuestion<Bach2gApplicationsRaceError> & { meta: Record<string, number> }

const same = (latex: string): LocalizedText => sameText(`$${latex}$`)
const math = (latex: string) => `$${latex}$`
const signed = (value: number) => (value < 0 ? `-${-value}` : `+${value}`)

interface Candidate {
    value: FractionValue
    error: Bach2gApplicationsRaceError
}
const whole = (value: number, error: Bach2gApplicationsRaceError): Candidate => ({ value: fraction(Math.round(value) + 0), error })
const nearby = (value: number): Candidate[] => [value + 1, value - 1, value + 2, value * 2].map((item) => ({ value: fraction(Math.round(item * 1000), 1000), error: 'calculation' as const }))

function options(random: Random, right: FractionValue, candidates: Candidate[]): RaceOption<Bach2gApplicationsRaceError>[] | null {
    const rightLatex = written(right)
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: Bach2gApplicationsRaceError }> = []
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

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<Bach2gApplicationsRaceError>[], answer: FractionValue, solution: LocalizedText, meta: Record<string, number>): Bach2gApplicationsRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution, meta }
}

/* ---------- Circuit 0: the tangent line ---------- */

/** The tangent to x² + b x at a: y = (2a + b)x − a² */
function tangentQuestion(random: Random): Bach2gApplicationsRaceQuestion | null {
    const a = randomInt(random, 1, 4)
    const b = randomInt(random, -4, 4)
    const answer = fraction(-a * a)
    const choices = options(random, answer, [whole(a * a + b * a, 'value'), whole(2 * a + b, 'slope'), whole(a * a, 'calculation')])
    const formula = `f(x)=x^2${b === 0 ? '' : `${signed(b)}x`}`
    return choices && build(0, 'tangent', say(`${math(formula)} kurbaren zuzen ukitzailea ${math(`x=${a}`)} puntuan ${math('y=mx+n')} da. Zenbat da ${math('n')}?`, `La tangente a ${math(formula)} en ${math(`x=${a}`)} es ${math('y=mx+n')}. ¿Cuánto vale ${math('n')}?`, `مماس ${math(formula)} عند ${math(`x=${a}`)} هو ${math('y=mx+n')}. كم تساوي ${math('n')}؟`, `The tangent to ${math(formula)} at ${math(`x=${a}`)} is ${math('y=mx+n')}. What is ${math('n')}?`), choices, answer, same(`y=${2 * a + b}x-${a * a}`), { a, b })
}

/** The slope of x³ + c x at a */
function slopeQuestion(random: Random): Bach2gApplicationsRaceQuestion | null {
    const a = randomInt(random, -3, 3)
    const c = randomInt(random, -6, 6)
    if (a === 0 || c === 0) return null
    const answer = fraction(3 * a * a + c)
    const choices = options(random, answer, [whole(a ** 3 + c * a, 'value'), whole(3 * a + c, 'calculation'), whole(3 * a * a, 'calculation')])
    const formula = `f(x)=x^3${signed(c)}x`
    return choices && build(0, 'slope', say(`Zein da ${math(formula)} kurbaren malda ${math(`x=${a}`)} puntuan?`, `¿Cuál es la pendiente de ${math(formula)} en ${math(`x=${a}`)}?`, `ما ميل ${math(formula)} عند ${math(`x=${a}`)}؟`, `What is the slope of ${math(formula)} at ${math(`x=${a}`)}?`), choices, answer, same(`f'(${a})=${3 * a * a + c}`), { a, c })
}

/** The x where the tangent to x² + b x is parallel to y = m x + n */
function parallelQuestion(random: Random): Bach2gApplicationsRaceQuestion | null {
    const x = randomInt(random, -3, 5)
    const b = randomInt(random, 1, 6)
    const m = 2 * x + b
    const n = pick(random, [-3, -1, 1, 2, 5, 7])
    if (n === m) return null
    const answer = fraction(x)
    const choices = options(random, answer, [{ value: fraction(n - b, 2), error: 'intercept' }, whole(m - b, 'two'), whole(m, 'calculation')])
    return choices && build(0, 'parallel', say(`Zein ${math('x')} baliotan da ${math(`f(x)=x^2+${b}x`)} kurbaren zuzen ukitzailea ${math(`y=${m}x${signed(n)}`)} zuzenaren paraleloa?`, `¿En qué ${math('x')} la tangente a ${math(`f(x)=x^2+${b}x`)} es paralela a ${math(`y=${m}x${signed(n)}`)}?`, `عند أي ${math('x')} يكون مماس ${math(`f(x)=x^2+${b}x`)} موازيًا لـ ${math(`y=${m}x${signed(n)}`)}؟`, `At which ${math('x')} is the tangent to ${math(`f(x)=x^2+${b}x`)} parallel to ${math(`y=${m}x${signed(n)}`)}?`), choices, answer, same(`2x+${b}=${m}\\ \\to\\ x=${x}`), { b, m })
}

/* ---------- Circuit 1: increase and decrease ---------- */

/** x² − 2a x decreases up to a */
function turnQuestion(random: Random): Bach2gApplicationsRaceQuestion | null {
    const a = randomInt(random, -4, 6)
    if (a === 0) return null
    const answer = fraction(a)
    const choices = options(random, answer, [whole(2 * a, 'two'), whole(-a, 'sign'), whole(a * a, 'calculation')])
    const formula = `f(x)=x^2${signed(-2 * a)}x`
    return choices && build(1, 'turn', say(`${math(formula)} beherakorra da ${math('(-\\infty,a)')} tartean. Zenbat da ${math('a')}?`, `${math(formula)} decrece en ${math('(-\\infty,a)')}. ¿Cuánto vale ${math('a')}?`, `${math(formula)} متناقصة في ${math('(-\\infty,a)')}. كم تساوي ${math('a')}؟`, `${math(formula)} decreases on ${math('(-\\infty,a)')}. What is ${math('a')}?`), choices, answer, same(`2x${signed(-2 * a)}<0\\ \\to\\ x<${a}`), { a })
}

/** f′(a) of x³ − k x, with its sign */
function signQuestion(random: Random): Bach2gApplicationsRaceQuestion | null {
    const k = randomInt(random, 2, 12)
    const a = randomInt(random, -3, 3)
    if (a === 0) return null
    const answer = fraction(3 * a * a - k)
    if (answer.numerator === 0) return null
    const choices = options(random, answer, [whole(a ** 3 - k * a, 'value'), whole(3 * a * a + k, 'calculation'), whole(k - 3 * a * a, 'sign')])
    const formula = `f(x)=x^3-${k}x`
    return choices && build(1, 'sign', say(`${math(formula)}. Kalkulatu ${math(`f'(${a})`)}: zeinuak esaten du gorakorra ala beherakorra den.`, `${math(formula)}. Calcula ${math(`f'(${a})`)}: su signo dice si crece o decrece.`, `${math(formula)}. احسب ${math(`f'(${a})`)}: إشارتها تخبر هل تتزايد أم تتناقص.`, `${math(formula)}. Work out ${math(`f'(${a})`)}: its sign tells whether it increases or decreases.`), choices, answer, same(`f'(${a})=${3 * a * a - k}`), { k, a })
}

/** Profits −t² + 2a t grow until t = a */
function growQuestion(random: Random): Bach2gApplicationsRaceQuestion | null {
    const a = randomInt(random, 2, 9)
    const c = randomInt(random, 1, 9) * 10
    const answer = fraction(a)
    const choices = options(random, answer, [whole(2 * a, 'two'), whole(a * a + c, 'value'), whole(c, 'calculation')])
    const formula = `B(t)=-t^2+${2 * a}t+${c}`
    return choices && build(1, 'grow', say(`Irabaziak ${math(formula)} dira. Zein urtera arte hazten dira?`, `Los beneficios son ${math(formula)}. ¿Hasta qué año crecen?`, `الأرباح ${math(formula)}. حتى أي سنة تتزايد؟`, `The profits are ${math(formula)}. Up to which year do they grow?`), choices, answer, same(`B'(t)=-2t+${2 * a}>0\\ \\to\\ t<${a}`), { a, c })
}

/* ---------- Circuit 2: maxima and minima ---------- */

/** The highest value of −x² + 2a x + c */
function topQuestion(random: Random): Bach2gApplicationsRaceQuestion | null {
    const a = randomInt(random, 1, 6)
    const c = randomInt(random, -5, 9)
    const answer = fraction(a * a + c)
    const choices = options(random, answer, [whole(a, 'value'), whole(2 * a * a + c, 'calculation'), whole(c - a * a, 'calculation')])
    const formula = `f(x)=-x^2+${2 * a}x${c === 0 ? '' : signed(c)}`
    return choices && build(2, 'top', say(`Zein da ${math(formula)} funtzioaren maximoaren balioa?`, `¿Cuánto vale el máximo de ${math(formula)}?`, `كم تساوي القيمة العظمى للدالة ${math(formula)}؟`, `What is the maximum value of ${math(formula)}?`), choices, answer, same(`x=${a}\\ \\to\\ f(${a})=${a * a + c}`), { a, c })
}

/** The x of the minimum of x³ − 3k² x */
function minimumQuestion(random: Random): Bach2gApplicationsRaceQuestion | null {
    const k = randomInt(random, 1, 4)
    const answer = fraction(k)
    const choices = options(random, answer, [whole(-k, 'second'), whole(-2 * k ** 3, 'value'), whole(3 * k * k, 'calculation')])
    const formula = `f(x)=x^3-${3 * k * k}x`
    return choices && build(2, 'minimum', say(`Zein ${math('x')} baliotan du ${math(formula)} funtzioak minimo erlatiboa?`, `¿En qué ${math('x')} tiene ${math(formula)} un mínimo relativo?`, `عند أي ${math('x')} يكون للدالة ${math(formula)} قيمة صغرى محلية؟`, `At which ${math('x')} does ${math(formula)} have a relative minimum?`), choices, answer, same(`f''(${k})=${6 * k}>0`), { k })
}

/** The absolute maximum of x² on [−a, b] */
function absoluteQuestion(random: Random): Bach2gApplicationsRaceQuestion | null {
    const a = randomInt(random, 1, 5)
    const b = randomInt(random, 1, 5)
    if (a === b) return null
    const answer = fraction(Math.max(a, b) ** 2)
    const choices = options(random, answer, [whole(0, 'ends'), whole(Math.min(a, b) ** 2, 'ends'), whole(Math.max(a, b), 'value')])
    return choices && build(2, 'absolute', say(`Zein da ${math('f(x)=x^2')} funtzioaren maximo absolutua ${math(`[-${a},${b}]`)} tartean?`, `¿Cuál es el máximo absoluto de ${math('f(x)=x^2')} en ${math(`[-${a},${b}]`)}?`, `ما القيمة العظمى المطلقة للدالة ${math('f(x)=x^2')} على ${math(`[-${a},${b}]`)}؟`, `What is the absolute maximum of ${math('f(x)=x^2')} on ${math(`[-${a},${b}]`)}?`), choices, answer, same(`f(-${a})=${a * a}\\qquad f(${b})=${b * b}`), { a, b })
}

/* ---------- Circuit 3: curvature ---------- */

/** The inflection of x³ − 3p x² */
function inflectionQuestion(random: Random): Bach2gApplicationsRaceQuestion | null {
    const p = randomInt(random, -3, 4)
    if (p === 0) return null
    const answer = fraction(p)
    const choices = options(random, answer, [whole(2 * p, 'value'), whole(-p, 'sign'), whole(3 * p, 'calculation')])
    const formula = `f(x)=x^3${signed(-3 * p)}x^2`
    return choices && build(3, 'inflection', say(`Zein ${math('x')} baliotan du ${math(formula)} funtzioak inflexio-puntua?`, `¿En qué ${math('x')} tiene ${math(formula)} un punto de inflexión?`, `عند أي ${math('x')} يكون للدالة ${math(formula)} نقطة انعطاف؟`, `At which ${math('x')} does ${math(formula)} have a point of inflection?`), choices, answer, same(`f''(x)=6x${signed(-6 * p)}=0\\ \\to\\ x=${p}`), { p })
}

/** f″(a) of x⁴ + q x² */
function secondQuestion(random: Random): Bach2gApplicationsRaceQuestion | null {
    const q = randomInt(random, -6, 6)
    const a = randomInt(random, 1, 3)
    if (q === 0) return null
    const answer = fraction(12 * a * a + 2 * q)
    const choices = options(random, answer, [whole(4 * a ** 3 + 2 * q * a, 'second'), whole(12 * a * a, 'calculation'), whole(12 * a + 2 * q, 'calculation')])
    const formula = `f(x)=x^4${signed(q)}x^2`
    return choices && build(3, 'second', say(`${math(formula)}. Kalkulatu ${math(`f''(${a})`)}.`, `${math(formula)}. Calcula ${math(`f''(${a})`)}.`, `${math(formula)}. احسب ${math(`f''(${a})`)}.`, `${math(formula)}. Work out ${math(`f''(${a})`)}.`), choices, answer, same(`f''(x)=12x^2${signed(2 * q)}\\ \\to\\ ${12 * a * a + 2 * q}`), { q, a })
}

/** Sales −t³ + 3p t² grow fastest at p, at a pace of 3p² */
function paceQuestion(random: Random): Bach2gApplicationsRaceQuestion | null {
    const p = randomInt(random, 2, 6)
    const answer = fraction(3 * p * p)
    const choices = options(random, answer, [whole(p, 'value'), whole(2 * p ** 3, 'value'), whole(6 * p * p, 'calculation')])
    const formula = `V(t)=-t^3+${3 * p}t^2`
    return choices && build(3, 'pace', say(`Salmentak ${math(formula)} dira. Zein erritmotan hazten dira azkarren hazten diren unean?`, `Las ventas son ${math(formula)}. ¿A qué ritmo crecen cuando crecen más deprisa?`, `المبيعات ${math(formula)}. بأي وتيرة تنمو عندما تنمو بأسرع ما يمكن؟`, `Sales are ${math(formula)}. At what pace do they grow when they grow fastest?`), choices, answer, same(`V''(t)=0\\ \\to\\ t=${p}\\ \\to\\ V'(${p})=${3 * p * p}`), { p })
}

/* ---------- Circuit 4: optimisation ---------- */

/** B = −x² + 2a x − c: the best units */
function unitsQuestion(random: Random): Bach2gApplicationsRaceQuestion | null {
    const a = randomInt(random, 2, 8) * 5
    const c = randomInt(random, 1, 9) * 100
    const answer = fraction(a)
    const choices = options(random, answer, [whole(2 * a, 'two'), whole(a * a - c, 'value'), whole(a + 5, 'calculation')])
    const formula = `B(x)=-x^2+${2 * a}x-${c}`
    return choices && build(4, 'units', say(`${math(formula)}. Zenbat unitaterekin da irabazia handiena?`, `${math(formula)}. ¿Con cuántas unidades es máximo el beneficio?`, `${math(formula)}. بكم وحدة يكون الربح أعظميًا؟`, `${math(formula)}. With how many units is the profit highest?`), choices, answer, same(`B'(x)=-2x+${2 * a}=0\\ \\to\\ x=${a}`), { a, c })
}

/** The highest profit of p x − x² − c */
function profitQuestion(random: Random): Bach2gApplicationsRaceQuestion | null {
    const p = randomInt(random, 2, 6) * 10
    const c = randomInt(random, 1, 3) * 100
    const top = (p * p) / 4 - c
    if (top <= 0) return null
    const answer = fraction(top)
    const choices = options(random, answer, [whole(p / 2, 'value'), whole((p * p) / 4, 'calculation'), whole((p * p) / 2 - c, 'calculation')])
    return choices && build(4, 'profit', say(`Unitate bakoitza ${p} euroan saltzen da eta ${math(`C(x)=x^2+${c}`)}. Zein da irabazirik handiena?`, `Cada unidad se vende a ${p} € y ${math(`C(x)=x^2+${c}`)}. ¿Cuál es el mayor beneficio?`, `تُباع كل وحدة بـ ${p} € و${math(`C(x)=x^2+${c}`)}. ما أكبر ربح؟`, `Each unit sells for €${p} and ${math(`C(x)=x^2+${c}`)}. What is the highest profit?`), choices, answer, same(`x=${p / 2}\\ \\to\\ B(${p / 2})=${top}`), { p, c })
}

/** The cheapest average of a x² + b x + a r²: r units */
function averageQuestion(random: Random): Bach2gApplicationsRaceQuestion | null {
    const r = pick(random, [5, 10, 15, 20, 30])
    const b = randomInt(random, 2, 12)
    const answer = fraction(r)
    const choices = options(random, answer, [whole(r * r, 'average'), whole(2 * r + b, 'value'), whole(r / 2, 'two')])
    const formula = `C(x)=x^2+${b}x+${r * r}`
    return choices && build(4, 'average', say(`${math(formula)}. Zenbat unitaterekin da batez besteko kostua minimoa?`, `${math(formula)}. ¿Con cuántas unidades es mínimo el coste medio?`, `${math(formula)}. بكم وحدة يكون متوسط التكلفة أصغريًا؟`, `${math(formula)}. With how many units is the average cost lowest?`), choices, answer, same(`M'(x)=1-\\frac{${r * r}}{x^2}=0\\ \\to\\ x=${r}`), { r, b })
}

const circuitGenerators: Array<Array<(random: Random, tier: Tier) => Bach2gApplicationsRaceQuestion | null>> = [
    [tangentQuestion, slopeQuestion, parallelQuestion],
    [turnQuestion, signQuestion, growQuestion],
    [topQuestion, minimumQuestion, absoluteQuestion],
    [inflectionQuestion, secondQuestion, paceQuestion],
    [unitsQuestion, profitQuestion, averageQuestion]
]

export function generateBach2gApplicationsRaceQuestion(random: Random, circuit: number, tier: Tier): Bach2gApplicationsRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkBach2gApplicationsPitAnswer(question: RaceQuestion<Bach2gApplicationsRaceError>, input: string): AnswerCheck {
    return checkAnswer(input, question.answer, question.answerForm)
}

export function bach2gApplicationsParTime(circuit: number): number {
    return parTimeFor([13, 13, 14, 14, 14][circuit] ?? 13)
}

export const bach2gApplicationsRaceErrorTips: Record<Bach2gApplicationsRaceError, LocalizedText> = {
    slope: say("Hori malda da; $n$ lortzeko: $n=f(a)-f'(a)\\cdot a$.", "Eso es la pendiente; para $n$: $n=f(a)-f'(a)\\cdot a$.", "هذا هو الميل؛ ولـ $n$: $n=f(a)-f'(a)\\cdot a$.", "That is the slope; for $n$: $n=f(a)-f'(a)\\cdot a$."),
    intercept: say('Paraleloa: malda bera, $m$; $n$ ez da kontuan hartzen.', 'Paralela: la misma pendiente, $m$; la $n$ no cuenta.', 'موازٍ: الميل نفسه $m$؛ ولا يُحسب $n$.', 'Parallel: the same slope, $m$; the $n$ does not count.'),
    sign: say("Begiratu $f'$ deribatuaren zeinua.", "Mira el signo de $f'$.", "انظر إلى إشارة $f'$.", "Look at the sign of $f'$."),
    value: say("Hori $f$ funtzioaren balioa da; galdera beste bat da.", 'Ese es el valor de $f$; la pregunta es otra.', 'هذه قيمة $f$؛ والسؤال عن شيء آخر.', 'That is the value of $f$; the question asks for something else.'),
    ends: say('Alderatu tartearen muturrak ere.', 'Compara también los extremos del intervalo.', 'قارن طرفي الفترة أيضًا.', 'Compare the ends of the interval too.'),
    second: say("$f''>0$: minimoa; $f''<0$: maximoa.", "$f''>0$: mínimo; $f''<0$: máximo.", "$f''>0$: صغرى؛ $f''<0$: عظمى.", "$f''>0$: minimum; $f''<0$: maximum."),
    two: say("$(x^2)'=2x$: ez ahaztu 2.", "$(x^2)'=2x$: no olvides el 2.", "$(x^2)'=2x$: لا تنس 2.", "$(x^2)'=2x$: do not forget the 2."),
    average: say("Batez bestekoa: $M(x)=\\frac{C(x)}{x}$ eta $M'(x)=0$.", "El medio: $M(x)=\\frac{C(x)}{x}$ y $M'(x)=0$.", "المتوسط: $M(x)=\\frac{C(x)}{x}$ و$M'(x)=0$.", "The average: $M(x)=\\frac{C(x)}{x}$ and $M'(x)=0$."),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}
