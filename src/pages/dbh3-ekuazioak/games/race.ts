import { checkAnswer, fraction, type AnswerCheck } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'

/* ==========================================================================
   Ekuazioen lasterketa (3. DBH): five circuits, one per stage — first
   degree equations; quadratic equations and the discriminant; pairs and
   crossing points; systems by substitution and elimination; problems.
   Every answer is one number, and the wrong options are the typical
   mistakes. Every question carries `meta`, so that the tests can work the
   answer out again.
   ========================================================================== */

export const EQUATIONS3_RACE_CIRCUITS = 5

export type Equations3RaceError =
    | 'sign'
    | 'transpose-sign'
    | 'divide-subtract'
    | 'lcm-not-all'
    | 'only-plus'
    | 'lose-root'
    | 'minus-b'
    | 'c-sign'
    | 'one-equation'
    | 'ages-one'
    | 'calculation'

export type Equations3RaceQuestion = RaceQuestion<Equations3RaceError> & { meta: Record<string, number> }

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (latex: string): LocalizedText => ({ eu: `$${latex}$`, es: `$${latex}$`, en: `$${latex}$`, ar: `$${latex.replace(/\{,\}/g, '.')}$` })
const math = (latex: string) => `$${latex}$`
const signed = (value: number) => (value < 0 ? `${value}` : `+${value}`)
const term = (k: number, letter = 'x') => (k === 1 ? letter : k === -1 ? `-${letter}` : `${k}${letter}`)

interface Candidate {
    value: number
    error: Equations3RaceError
}
const wrong = (value: number, error: Equations3RaceError): Candidate => ({ value, error })

function options(random: Random, right: number, candidates: Candidate[]): RaceOption<Equations3RaceError>[] | null {
    const used = new Set([right])
    const chosen: Candidate[] = []
    for (const candidate of [...candidates, wrong(-right, 'sign'), wrong(right + 1, 'calculation'), wrong(right - 2, 'calculation'), wrong(right * 2, 'calculation')]) {
        if (chosen.length === 3) break
        if (!Number.isInteger(candidate.value) || used.has(candidate.value)) continue
        used.add(candidate.value)
        chosen.push(candidate)
    }
    if (chosen.length < 3) return null
    return shuffle(random, [{ latex: String(right), correct: true, error: null }, ...chosen.map((item) => ({ latex: String(item.value), correct: false, error: item.error }))])
}

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<Equations3RaceError>[], answer: number, solution: LocalizedText, meta: Record<string, number>): Equations3RaceQuestion {
    return { circuit, kind, prompt, options: choices, answer: fraction(answer), answerForm: 'any', percentAnswer: false, writable: true, solution, meta }
}

const solveFor = (latex: string, letter = 'x') => say(`Ebatzi ${math(latex)}. Zenbat da ${math(letter)}?`, `Resuelve ${math(latex)}. ¿Cuánto vale ${math(letter)}?`, `حلّ ${math(latex)}. كم يساوي ${math(letter)}؟`, `Solve ${math(latex)}. What is ${math(letter)}?`)

/* ---------- Circuit 0: first degree ---------- */

function twoSides(random: Random, tier: Tier): Equations3RaceQuestion | null {
    const c = randomInt(random, 1, 3)
    const k = randomInt(random, 1, tier === 0 ? 2 : 4)
    const a = c + k
    const x = randomInt(random, tier === 0 ? 1 : -5, 9)
    const b = randomInt(random, 1, 12)
    const d = k * x + b
    const choices = options(random, x, [wrong((d + b) / k, 'transpose-sign'), wrong(d - b - k, 'divide-subtract'), wrong((d - b) / (a + c), 'transpose-sign')])
    return choices && build(0, 'two-sides', solveFor(`${term(a)}+${b}=${term(c)}${signed(d)}`), choices, x, same(`${term(k)}=${d - b}\\ \\to\\ x=${x}`), { a, b, c, d })
}

function bracket(random: Random): Equations3RaceQuestion | null {
    const k = randomInt(random, 2, 5)
    const p = randomInt(random, 1, 6)
    const x = randomInt(random, -3, 8)
    const r = k * (x - p)
    const choices = options(random, x, [wrong(r + p, 'calculation'), wrong(r / k - p, 'sign'), wrong((r + k * p) / k + 1, 'calculation')])
    return choices && build(0, 'bracket', solveFor(`${k}(x-${p})=${r}`), choices, x, same(`${k}x-${k * p}=${r}\\ \\to\\ x=${x}`), { k, p, r })
}

function fractionEquation(random: Random): Equations3RaceQuestion | null {
    const m = randomInt(random, 2, 6)
    const p = randomInt(random, 1, 8)
    const q = p + randomInt(random, 1, 6)
    const x = m * (q - p)
    const choices = options(random, x, [wrong(m * q - p, 'lcm-not-all'), wrong(q - p, 'calculation'), wrong(m * (q + p), 'sign')])
    return choices && build(0, 'fraction', solveFor(`\\frac{x}{${m}}+${p}=${q}`), choices, x, same(`x+${m * p}=${m * q}\\ \\to\\ x=${x}`), { m, p, q })
}

/* ---------- Circuit 1: second degree ---------- */

function squareRoot(random: Random): Equations3RaceQuestion | null {
    const a = pick(random, [1, 2, 3])
    const n = randomInt(random, 2, 9)
    const choices = options(random, -n, [wrong(n, 'only-plus'), wrong(-a * n * n, 'calculation'), wrong(-(n * n) / 2, 'calculation')])
    return choices && build(1, 'negative-root', say(`Ebatzi ${math(`${a === 1 ? '' : a}x^{2}=${a * n * n}`)}. Zein da ebazpen negatiboa?`, `Resuelve ${math(`${a === 1 ? '' : a}x^{2}=${a * n * n}`)}. ¿Cuál es la solución negativa?`, `حلّ ${math(`${a === 1 ? '' : a}x^{2}=${a * n * n}`)}. ما الحل السالب؟`, `Solve ${math(`${a === 1 ? '' : a}x^{2}=${a * n * n}`)}. What is the negative solution?`), choices, -n, same(`x^{2}=${n * n}\\ \\to\\ x=\\pm ${n}`), { a, n })
}

function commonX(random: Random): Equations3RaceQuestion | null {
    const k = randomInt(random, 2, 12) * (random() < 0.3 ? -1 : 1)
    const choices = options(random, k, [wrong(0, 'lose-root'), wrong(-k, 'sign'), wrong(k * k, 'calculation')])
    return choices && build(1, 'common-x', say(`Ebatzi ${math(`x^{2}${k < 0 ? '+' : '-'}${Math.abs(k)}x=0`)}. Zein da zero ez den ebazpena?`, `Resuelve ${math(`x^{2}${k < 0 ? '+' : '-'}${Math.abs(k)}x=0`)}. ¿Cuál es la solución distinta de cero?`, `حلّ ${math(`x^{2}${k < 0 ? '+' : '-'}${Math.abs(k)}x=0`)}. ما الحل غير الصفري؟`, `Solve ${math(`x^{2}${k < 0 ? '+' : '-'}${Math.abs(k)}x=0`)}. What is the non-zero solution?`), choices, k, same(`x(x${k < 0 ? '+' : '-'}${Math.abs(k)})=0\\ \\to\\ x=${k}`), { k })
}

function largerRoot(random: Random): Equations3RaceQuestion | null {
    const p = randomInt(random, -6, 6)
    const q = randomInt(random, -6, 6)
    if (p >= q) return null
    const b = -(p + q)
    const c = p * q
    const choices = options(random, q, [wrong(-p, 'minus-b'), wrong(-q, 'minus-b'), wrong(p, 'calculation')])
    const latex = `x^{2}${b === 0 ? '' : `${b < 0 ? '-' : '+'}${Math.abs(b) === 1 ? '' : Math.abs(b)}x`}${c === 0 ? '' : signed(c)}=0`
    return choices && build(1, 'larger-root', say(`Ebatzi ${math(latex)}. Zein da ebazpen handiena?`, `Resuelve ${math(latex)}. ¿Cuál es la solución mayor?`, `حلّ ${math(latex)}. ما الحل الأكبر؟`, `Solve ${math(latex)}. What is the larger solution?`), choices, q, same(`(x${signed(-p)})(x${signed(-q)})=0\\ \\to\\ x=${q}`), { p, q })
}

function discriminant(random: Random): Equations3RaceQuestion | null {
    const b = randomInt(random, -6, 6)
    const c = randomInt(random, -9, 9)
    if (c === 0) return null
    const delta = b * b - 4 * c
    const latex = `x^{2}${b === 0 ? '' : `${b < 0 ? '-' : '+'}${Math.abs(b) === 1 ? '' : Math.abs(b)}x`}${signed(c)}=0`
    const choices = options(random, delta, [wrong(b * b + 4 * c, 'c-sign'), wrong(b * b - c, 'calculation'), wrong(4 * c - b * b, 'sign')])
    return choices && build(1, 'discriminant', say(`Kalkulatu ${math(latex)} ekuazioaren ${math('\\Delta')}.`, `Calcula el ${math('\\Delta')} de ${math(latex)}.`, `احسب ${math('\\Delta')} لـ ${math(latex)}.`, `Work out ${math('\\Delta')} for ${math(latex)}.`), choices, delta, same(`\\Delta=${b * b}${signed(-4 * c)}=${delta}`), { b, c })
}

/* ---------- Circuit 2: systems ---------- */

function pairValue(random: Random): Equations3RaceQuestion | null {
    const a = randomInt(random, 1, 5)
    const x = randomInt(random, -3, 6)
    const y = randomInt(random, -5, 9)
    const c = a * x + y
    const choices = options(random, y, [wrong(c + a * x, 'sign'), wrong(c - x, 'calculation'), wrong(c, 'calculation')])
    return choices && build(2, 'pair', say(`${math(`(${x},y)`)} bikotea ${math(`${term(a)}+y=${c}`)} ekuazioaren ebazpena da. Zenbat da ${math('y')}?`, `La pareja ${math(`(${x},y)`)} es solución de ${math(`${term(a)}+y=${c}`)}. ¿Cuánto vale ${math('y')}?`, `الزوج ${math(`(${x},y)`)} حلّ لـ ${math(`${term(a)}+y=${c}`)}. كم يساوي ${math('y')}؟`, `The pair ${math(`(${x},y)`)} solves ${math(`${term(a)}+y=${c}`)}. What is ${math('y')}?`), choices, y, same(`y=${c}${signed(-a * x)}=${y}`), { a, x, c })
}

function crossingX(random: Random): Equations3RaceQuestion | null {
    const m1 = randomInt(random, -3, 3)
    const m2 = randomInt(random, -3, 3)
    if (m1 === m2) return null
    const x = randomInt(random, -4, 5)
    const n1 = randomInt(random, -6, 6)
    const n2 = n1 + (m1 - m2) * x
    const line = (m: number, n: number) => `y=${m === 0 ? '' : term(m)}${m === 0 ? n : n === 0 ? '' : signed(n)}`
    const choices = options(random, x, [wrong(-x, 'sign'), wrong(m1 * x + n1, 'calculation'), wrong(n2 - n1, 'calculation')])
    return choices && build(2, 'crossing', say(`${math(line(m1, n1))} eta ${math(line(m2, n2))} zuzenak ebakitzen dira. Zenbat da ebakidura-puntuaren ${math('x')}?`, `Las rectas ${math(line(m1, n1))} e ${math(line(m2, n2))} se cortan. ¿Cuánto vale la ${math('x')} del corte?`, `يتقاطع المستقيمان ${math(line(m1, n1))} و${math(line(m2, n2))}. كم يساوي ${math('x')} لنقطة التقاطع؟`, `The lines ${math(line(m1, n1))} and ${math(line(m2, n2))} cross. What is the ${math('x')} of the crossing?`), choices, x, same(`${term(m1 - m2)}=${n2 - n1}\\ \\to\\ x=${x}`), { m1, n1, m2, n2 })
}

function parallelK(random: Random): Equations3RaceQuestion | null {
    const a = randomInt(random, 1, 4)
    const b = randomInt(random, 1, 4)
    const m = randomInt(random, 2, 3)
    const k = m * b
    const c = randomInt(random, 1, 9)
    const choices = options(random, k, [wrong(b, 'calculation'), wrong(m * a, 'calculation'), wrong(k + 1, 'calculation')])
    return choices && build(2, 'parallel', say(`Zein ${math('k')} baliotarako dira paraleloak ${math(`${term(a)}+${term(b, 'y')}=${c}`)} eta ${math(`${term(m * a)}+ky=${m * c + 1}`)}?`, `¿Para qué ${math('k')} son paralelas ${math(`${term(a)}+${term(b, 'y')}=${c}`)} y ${math(`${term(m * a)}+ky=${m * c + 1}`)}?`, `لأي قيمة لـ ${math('k')} يتوازى ${math(`${term(a)}+${term(b, 'y')}=${c}`)} و${math(`${term(m * a)}+ky=${m * c + 1}`)}؟`, `For which ${math('k')} are ${math(`${term(a)}+${term(b, 'y')}=${c}`)} and ${math(`${term(m * a)}+ky=${m * c + 1}`)} parallel?`), choices, k, same(`\\frac{${m * a}}{${a}}=\\frac{k}{${b}}\\ \\to\\ k=${k}`), { a, b, m })
}

/* ---------- Circuit 3: methods ---------- */

function substitution(random: Random): Equations3RaceQuestion | null {
    const k = randomInt(random, 2, 4)
    const x = randomInt(random, 1, 6)
    const s = x + k * x
    const asksY = random() < 0.5
    const answer = asksY ? k * x : x
    const choices = options(random, answer, [wrong(asksY ? x : k * x, 'calculation'), wrong(s / k, 'calculation'), wrong(s - k, 'calculation')])
    return choices && build(3, asksY ? 'substitution-y' : 'substitution-x', solveFor(`y=${k}x,\\ x+y=${s}`, asksY ? 'y' : 'x'), choices, answer, same(`x+${k}x=${s}\\ \\to\\ x=${x},\\ y=${k * x}`), { k, s, asksY: asksY ? 1 : 0 })
}

function elimination(random: Random): Equations3RaceQuestion | null {
    const x = randomInt(random, 1, 9)
    const y = randomInt(random, -4, 8)
    if (y === x) return null
    const s = x + y
    const d = x - y
    const asksY = random() < 0.5
    const answer = asksY ? y : x
    const choices = options(random, answer, [wrong(asksY ? x : y, 'calculation'), wrong(s + d, 'calculation'), wrong(asksY ? s : d, 'one-equation')])
    return choices && build(3, asksY ? 'elimination-y' : 'elimination-x', solveFor(`x+y=${s},\\ x-y=${d}`, asksY ? 'y' : 'x'), choices, answer, same(`2x=${s + d}\\ \\to\\ x=${x},\\ y=${y}`), { s, d, asksY: asksY ? 1 : 0 })
}

function scaled(random: Random): Equations3RaceQuestion | null {
    const x = randomInt(random, 1, 6)
    const y = randomInt(random, 1, 6)
    const a = randomInt(random, 2, 4)
    const c1 = a * x + y
    const c2 = x + y
    const choices = options(random, x, [wrong(c1 - c2, 'calculation'), wrong(y, 'calculation'), wrong(c2 - x + 1, 'calculation')])
    return choices && build(3, 'scaled', solveFor(`${a}x+y=${c1},\\ x+y=${c2}`), choices, x, same(`${a - 1 === 1 ? '' : a - 1}x=${c1 - c2}\\ \\to\\ x=${x}`), { a, c1, c2 })
}

/* ---------- Circuit 4: problems ---------- */

function consecutive(random: Random): Equations3RaceQuestion | null {
    const count = pick(random, [2, 3])
    const x = randomInt(random, 5, 40)
    const total = count * x + (count === 2 ? 1 : 3)
    const choices = options(random, x, [wrong(Math.floor(total / count), 'calculation'), wrong(x + 1, 'calculation'), wrong(total - count, 'calculation')])
    return choices && build(4, 'consecutive', say(`${count === 2 ? 'Bi' : 'Hiru'} zenbaki jarraien batura ${total} da. Zein da txikiena?`, `La suma de ${count === 2 ? 'dos' : 'tres'} números consecutivos es ${total}. ¿Cuál es el menor?`, `مجموع ${count === 2 ? 'عددين متتاليين' : 'ثلاثة أعداد متتالية'} ${total}. ما أصغرها؟`, `The sum of ${count === 2 ? 'two' : 'three'} consecutive numbers is ${total}. What is the smallest?`), choices, x, same(`${count}x+${count === 2 ? 1 : 3}=${total}\\ \\to\\ x=${x}`), { count, total })
}

function ages(random: Random): Equations3RaceQuestion | null {
    const son = randomInt(random, 3, 14)
    const t = randomInt(random, 2, 20)
    const mother = 2 * (son + t) - t
    if (mother - son < 20 || mother > 60) return null
    const choices = options(random, t, [wrong((mother - 2 * son) / 2, 'ages-one'), wrong(mother - son, 'calculation'), wrong(t + 2, 'calculation')])
    return choices && build(4, 'ages', say(`Amak ${mother} urte ditu eta semeak ${son}. Zenbat urte barru izango du amak semearen bikoitza?`, `La madre tiene ${mother} años y el hijo ${son}. ¿Dentro de cuántos años tendrá el doble que él?`, `عمر الأم ${mother} سنة وعمر الابن ${son}. بعد كم سنة يصير عمرها ضعف عمره؟`, `The mother is ${mother} and her son ${son}. In how many years will she be twice his age?`), choices, t, same(`${mother}+t=2(${son}+t)\\ \\to\\ t=${t}`), { mother, son })
}

function tickets(random: Random): Equations3RaceQuestion | null {
    const big = randomInt(random, 6, 12)
    const small = randomInt(random, 2, big - 2)
    const x = randomInt(random, 3, 20)
    const y = randomInt(random, 3, 20)
    const count = x + y
    const money = big * x + small * y
    const choices = options(random, x, [wrong(y, 'calculation'), wrong(Math.round(money / big), 'calculation'), wrong(count - 1, 'calculation')])
    return choices && build(4, 'tickets', say(`${big} euroko eta ${small} euroko ${count} sarrera saldu dira, guztira ${money} euro. Zenbat dira ${big} eurokoak?`, `Se venden ${count} entradas de ${big} € y de ${small} €, en total ${money} €. ¿Cuántas son de ${big} €?`, `بيعت ${count} تذكرة بسعر ${big} يورو و${small} يورو، بمجموع ${money} يورو. كم تذكرة بسعر ${big} يورو؟`, `${count} tickets at ${big} € and ${small} € are sold, ${money} € in total. How many are ${big} € tickets?`), choices, x, same(`x+y=${count},\\ ${big}x+${small}y=${money}\\ \\to\\ x=${x}`), { big, small, count, money })
}

type Generator = (random: Random, tier: Tier) => Equations3RaceQuestion | null

const circuitGenerators: Generator[][] = [
    [twoSides, bracket, fractionEquation],
    [squareRoot, commonX, largerRoot, discriminant],
    [pairValue, crossingX, parallelK],
    [substitution, elimination, scaled],
    [consecutive, ages, tickets]
]

export function generateEquations3RaceQuestion(random: Random, circuit: number, tier: Tier): Equations3RaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 800; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkEquations3PitAnswer(question: RaceQuestion<Equations3RaceError>, input: string): AnswerCheck {
    return checkAnswer(input, question.answer, question.answerForm)
}

export function equations3ParTime(circuit: number): number {
    return parTimeFor([13, 14, 13, 14, 15][circuit] ?? 13)
}

export const equations3RaceErrorTips: Record<Equations3RaceError, LocalizedText> = {
    sign: say('Kontuz zeinuekin.', 'Cuidado con los signos.', 'انتبه للإشارات.', 'Watch the signs.'),
    'transpose-sign': say('Atal batean batzen dena bestean kentzen da.', 'Lo que suma en un miembro pasa restando.', 'ما يُجمع في طرف ينتقل مطروحًا.', 'What is added on one side is subtracted on the other.'),
    'divide-subtract': say('$3x$ biderkadura da: zatitu.', '$3x$ es un producto: divide.', '$3x$ جداء: اقسم.', '$3x$ is a product: divide.'),
    'lcm-not-all': say('m.k.t.-az gai guztiak biderkatu.', 'Multiplica todos los términos por el m.c.m.', 'اضرب كل الحدود في م.م.أ.', 'Multiply every term by the LCM.'),
    'only-plus': say('Erro karratuak bi zeinu ditu: $\\pm$.', 'La raíz cuadrada tiene dos signos: $\\pm$.', 'للجذر التربيعي إشارتان: $\\pm$.', 'A square root has two signs: $\\pm$.'),
    'lose-root': say('Ez zatitu $x$ ezezagunaz: atera faktore komuna.', 'No dividas entre $x$: saca factor común.', 'لا تقسم على $x$: أخرج العامل المشترك.', 'Do not divide by $x$: take out the common factor.'),
    'minus-b': say('Formulak $-b$ du.', 'La fórmula lleva $-b$.', 'في الصيغة $-b$.', 'The formula has $-b$.'),
    'c-sign': say('$\\Delta=b^{2}-4ac$: kontuz $c$ zenbakiaren zeinuarekin.', '$\\Delta=b^{2}-4ac$: cuidado con el signo de $c$.', '$\\Delta=b^{2}-4ac$: انتبه لإشارة $c$.', '$\\Delta=b^{2}-4ac$: watch the sign of $c$.'),
    'one-equation': say('Ebazpenak bi ekuazioak bete behar ditu.', 'La solución tiene que cumplir las dos ecuaciones.', 'يجب أن يحقق الحل المعادلتين.', 'The solution must satisfy both equations.'),
    'ages-one': say('Urteak bi pertsonei batzen zaizkie.', 'Los años se suman a las dos personas.', 'تُضاف السنوات إلى الشخصين.', 'The years are added to both people.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}
