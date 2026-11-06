import { checkAnswer, fraction, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { written } from '../../batx1-zientziak-errealak/games/race.ts'
import { same as sameText, say } from '../text.ts'

/* ==========================================================================
   Funtzioen lasterketa (Batxilergoa 1 · Zientziak): five circuits, one per
   stage — studying a function (how many integers in a domain, an odd
   function, a periodic one), transformations (where x goes with f(x + c)
   and f(kx), where y goes with A·f(x) + k), the inverse (of a line, of
   2ˣ + c, an arc function in degrees), piecewise functions (E(x) of a
   negative, the value at the joint, |x² − ax|) and operations (f ∘ g, the
   domain of f/g, f·g). The wrong options are the typical mistakes. Every
   question carries `meta`, the numbers the tests check it against.
   ========================================================================== */

export const BACH_FUNCTIONS_RACE_CIRCUITS = 5

export type BachFunctionsRaceError =
    | 'ends'
    | 'even-odd'
    | 'period'
    | 'direction'
    | 'stretch'
    | 'order'
    | 'apply'
    | 'reciprocal'
    | 'power'
    | 'range'
    | 'truncate'
    | 'piece'
    | 'sign'
    | 'numerator'
    | 'calculation'

export type BachFunctionsRaceQuestion = RaceQuestion<BachFunctionsRaceError> & { meta: Record<string, number> }

const same = (latex: string): LocalizedText => sameText(`$${latex}$`)
const math = (latex: string) => `$${latex}$`
const signed = (value: number) => (value < 0 ? `-${-value}` : `+${value}`)
const binomial = (root: number) => (root === 0 ? 'x' : `x${signed(-root)}`)

interface Candidate {
    value: FractionValue
    error: BachFunctionsRaceError
}
const whole = (value: number, error: BachFunctionsRaceError): Candidate => ({ value: fraction(Math.round(value) + 0), error })
const ratio = (p: number, q: number, error: BachFunctionsRaceError): Candidate => ({ value: fraction(p, q), error })
const nearby = (value: number): Candidate[] => [value + 1, value - 1, value + 2, value * 2].map((item) => ({ value: fraction(Math.round(item * 10000), 10000), error: 'calculation' as const }))

/** The right option and three different mistakes */
function options(random: Random, right: FractionValue, candidates: Candidate[]): RaceOption<BachFunctionsRaceError>[] | null {
    const rightLatex = written(right)
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: BachFunctionsRaceError }> = []
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

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<BachFunctionsRaceError>[], answer: FractionValue, solution: LocalizedText, meta: Record<string, number>): BachFunctionsRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution, meta }
}

/** A point of f: «f passes through (p, q).» before the question */
const through = (p: number, q: number, question: LocalizedText) => say(
    `$f$ funtzioa $(${p},${q})$ puntutik pasatzen da. ${question.eu}`,
    `$f$ pasa por $(${p},${q})$. ${question.es}`,
    `تمر $f$ بالنقطة $(${p},${q})$. ${question.ar}`,
    `$f$ passes through $(${p},${q})$. ${question.en}`
)

/* ---------- Circuit 0: studying a function ---------- */

/** How many integers in the domain of √(x − a) + √(b − x): b − a + 1 */
function domainCountQuestion(random: Random): BachFunctionsRaceQuestion | null {
    const a = randomInt(random, -4, 3)
    const b = a + randomInt(random, 2, 6)
    const answer = fraction(b - a + 1)
    const choices = options(random, answer, [whole(b - a, 'ends'), whole(b - a - 1, 'ends'), whole(a + b, 'calculation')])
    const formula = `\\sqrt{${binomial(a)}}+\\sqrt{${b}-x}`
    return choices && build(0, 'domain-count', say(`Zenbat zenbaki oso daude ${math(formula)} funtzioaren izate-eremuan?`, `¿Cuántos enteros hay en el dominio de ${math(formula)}?`, `كم عددًا صحيحًا في مجال ${math(formula)}؟`, `How many integers are there in the domain of ${math(formula)}?`), choices, answer, same(`[${a},${b}]\\ \\to\\ ${b - a + 1}`), { a, b })
}

/** f odd and f(a) = b: f(−a) = −b */
function oddQuestion(random: Random): BachFunctionsRaceQuestion | null {
    const a = randomInt(random, 1, 6)
    const b = pick(random, [-7, -5, -4, -3, -2, 2, 3, 4, 5, 7])
    if (Math.abs(a) === Math.abs(b)) return null
    const answer = fraction(-b)
    const choices = options(random, answer, [whole(b, 'even-odd'), whole(-a, 'calculation'), whole(0, 'calculation')])
    return choices && build(0, 'odd', say(`$f$ bakoitia da eta $f(${a})=${b}$. Zenbat da $f(-${a})$?`, `$f$ es impar y $f(${a})=${b}$. ¿Cuánto vale $f(-${a})$?`, `$f$ فردية و$f(${a})=${b}$. كم تساوي $f(-${a})$؟`, `$f$ is odd and $f(${a})=${b}$. What is $f(-${a})$?`), choices, answer, same(`f(-${a})=-f(${a})=${-b}`), { a, b })
}

/** f of period T with f(r) = v: f(r + nT) = v */
function periodQuestion(random: Random): BachFunctionsRaceQuestion | null {
    const T = randomInt(random, 2, 6)
    const r = randomInt(random, 0, T - 1)
    const n = randomInt(random, 2, 5)
    const v = pick(random, [-3, -2, -1, 1, 2, 4, 5, 6])
    const x = r + n * T
    const answer = fraction(v)
    const choices = options(random, answer, [whole(v * n, 'period'), whole(v + n * T, 'period'), whole(x, 'calculation')])
    return choices && build(0, 'period', say(`$f$ funtzioaren periodoa ${T} da, eta $f(${r})=${v}$. Zenbat da $f(${x})$?`, `$f$ tiene periodo ${T} y $f(${r})=${v}$. ¿Cuánto vale $f(${x})$?`, `دور $f$ هو ${T} و$f(${r})=${v}$. كم تساوي $f(${x})$؟`, `$f$ has period ${T} and $f(${r})=${v}$. What is $f(${x})$?`), choices, answer, same(`${x}=${r}+${n}\\cdot ${T}\\ \\to\\ f(${x})=${v}`), { T, r, n, v })
}

/* ---------- Circuit 1: transformations ---------- */

const ABSCISSA = (formula: string) => say(`Zein abzisa du ${math(formula)} grafikoko puntu baliokideak?`, `¿Qué abscisa tiene el punto correspondiente de ${math(formula)}?`, `ما فاصلة النقطة المقابلة على ${math(formula)}؟`, `What is the x-coordinate of the matching point of ${math(formula)}?`)
const ORDINATE = (formula: string) => say(`Zein ordenatu du ${math(formula)} grafikoko puntu baliokideak?`, `¿Qué ordenada tiene el punto correspondiente de ${math(formula)}?`, `ما ترتيب النقطة المقابلة على ${math(formula)}؟`, `What is the y-coordinate of the matching point of ${math(formula)}?`)

/** y = f(x + c): x = p − c */
function shiftQuestion(random: Random): BachFunctionsRaceQuestion | null {
    const p = randomInt(random, -4, 5)
    const q = randomInt(random, -4, 5)
    const c = pick(random, [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5])
    const answer = fraction(p - c)
    const choices = options(random, answer, [whole(p + c, 'direction'), whole(p, 'calculation'), whole(q, 'calculation')])
    return choices && build(1, 'shift', through(p, q, ABSCISSA(`y=f(x${signed(c)})`)), choices, answer, same(`x${signed(c)}=${p}\\ \\to\\ x=${p - c}`), { p, q, c })
}

/** y = f(kx): x = p/k */
function stretchQuestion(random: Random): BachFunctionsRaceQuestion | null {
    const k = randomInt(random, 2, 4)
    const m = randomInt(random, -4, 4)
    const p = k * m
    const q = randomInt(random, -4, 5)
    if (m === 0) return null
    const answer = fraction(m)
    const choices = options(random, answer, [whole(p * k, 'stretch'), whole(p, 'calculation'), whole(p - k, 'calculation')])
    return choices && build(1, 'stretch', through(p, q, ABSCISSA(`y=f(${k}x)`)), choices, answer, same(`${k}x=${p}\\ \\to\\ x=${m}`), { p, q, k })
}

/** y = A·f(x) + k: y = A·q + k */
function outsideQuestion(random: Random): BachFunctionsRaceQuestion | null {
    const p = randomInt(random, -4, 5)
    const q = pick(random, [-4, -3, -2, -1, 1, 2, 3, 4])
    const A = pick(random, [-3, -2, 2, 3])
    const k = pick(random, [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5])
    const answer = fraction(A * q + k)
    const choices = options(random, answer, [whole(A * (q + k), 'order'), whole(q + k, 'calculation'), whole(A * q - k, 'sign')])
    const value = q < 0 ? `(${q})` : String(q)
    return choices && build(1, 'outside', through(p, q, ORDINATE(`y=${A}f(x)${signed(k)}`)), choices, answer, same(`${A}\\cdot ${value}${signed(k)}=${A * q + k}`), { p, q, A, k })
}

/* ---------- Circuit 2: the inverse ---------- */

/** f(x) = ax + b and f⁻¹(v) with v = a·r + b: r */
function inverseLineQuestion(random: Random): BachFunctionsRaceQuestion | null {
    const a = randomInt(random, 2, 5)
    const b = pick(random, [-6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6])
    const r = randomInt(random, -3, 4)
    const v = a * r + b
    if (v === 0) return null
    const answer = fraction(r)
    const choices = options(random, answer, [whole(a * v + b, 'apply'), ratio(1, v, 'reciprocal'), ratio(v - a * b, a, 'order')])
    return choices && build(2, 'inverse-line', say(`$f(x)=${a}x${signed(b)}$ bada, zenbat da $f^{-1}(${v})$?`, `Si $f(x)=${a}x${signed(b)}$, ¿cuánto vale $f^{-1}(${v})$?`, `إذا كانت $f(x)=${a}x${signed(b)}$ فكم تساوي $f^{-1}(${v})$؟`, `If $f(x)=${a}x${signed(b)}$, what is $f^{-1}(${v})$?`), choices, answer, same(`${a}x${signed(b)}=${v}\\ \\to\\ x=${r}`), { a, b, v })
}

/** f(x) = 2ˣ + c and f⁻¹(v) with v = 2ʳ + c: r */
function inverseExpQuestion(random: Random): BachFunctionsRaceQuestion | null {
    const r = randomInt(random, 1, 5)
    const c = pick(random, [-3, -2, -1, 1, 2, 3, 4])
    const v = 2 ** r + c
    const answer = fraction(r)
    const choices = options(random, answer, [whole(2 ** r, 'power'), whole(v - c + 1, 'calculation'), whole(r + c, 'calculation')])
    return choices && build(2, 'inverse-exp', say(`$f(x)=2^x${signed(c)}$ bada, zenbat da $f^{-1}(${v})$?`, `Si $f(x)=2^x${signed(c)}$, ¿cuánto vale $f^{-1}(${v})$?`, `إذا كانت $f(x)=2^x${signed(c)}$ فكم تساوي $f^{-1}(${v})$؟`, `If $f(x)=2^x${signed(c)}$, what is $f^{-1}(${v})$?`), choices, answer, same(`2^x=${2 ** r}\\ \\to\\ x=${r}`), { r, c })
}

/** An arc function of a notable value, in degrees */
const ARCS: Array<{ name: string; value: string; degrees: number; mirror: number; other: number }> = [
    { name: '\\arcsin', value: '\\frac{1}{2}', degrees: 30, mirror: 150, other: 60 },
    { name: '\\arcsin', value: '-\\frac{1}{2}', degrees: -30, mirror: 210, other: -60 },
    { name: '\\arcsin', value: '\\frac{\\sqrt{3}}{2}', degrees: 60, mirror: 120, other: 30 },
    { name: '\\arcsin', value: '-\\frac{\\sqrt{2}}{2}', degrees: -45, mirror: 225, other: 135 },
    { name: '\\arccos', value: '\\frac{1}{2}', degrees: 60, mirror: -60, other: 30 },
    { name: '\\arccos', value: '-\\frac{1}{2}', degrees: 120, mirror: -60, other: 150 },
    { name: '\\arccos', value: '-\\frac{\\sqrt{3}}{2}', degrees: 150, mirror: -30, other: 120 },
    { name: '\\arccos', value: '-\\frac{\\sqrt{2}}{2}', degrees: 135, mirror: -45, other: 45 },
    { name: '\\arctan', value: '1', degrees: 45, mirror: 225, other: 135 },
    { name: '\\arctan', value: '-1', degrees: -45, mirror: 135, other: 45 },
    { name: '\\arctan', value: '\\sqrt{3}', degrees: 60, mirror: 240, other: 30 }
]

function arcQuestion(random: Random): BachFunctionsRaceQuestion | null {
    const index = randomInt(random, 0, ARCS.length - 1)
    const arc = ARCS[index]
    const answer = fraction(arc.degrees)
    const choices = options(random, answer, [whole(arc.mirror, 'range'), whole(-arc.degrees, 'range'), whole(arc.other, 'calculation')])
    const formula = `${arc.name}\\left(${arc.value}\\right)`
    return choices && build(2, 'arc', say(`Zenbat da ${math(formula)}, gradutan?`, `¿Cuánto vale ${math(formula)} en grados?`, `كم يساوي ${math(formula)} بالدرجات؟`, `What is ${math(formula)} in degrees?`), choices, answer, same(`${formula}=${arc.degrees}^\\circ`), { index })
}

/* ---------- Circuit 3: piecewise functions ---------- */

/** E(−a,d) = −a − 1 */
function floorQuestion(random: Random): BachFunctionsRaceQuestion | null {
    const a = randomInt(random, 1, 9)
    const d = randomInt(random, 1, 9)
    const answer = fraction(-a - 1)
    const choices = options(random, answer, [whole(-a, 'truncate'), whole(a, 'sign'), whole(-a + 1, 'calculation')])
    const formula = `E(-${a}{,}${d})`
    return choices && build(3, 'floor', say(`Zenbat da ${math(formula)}?`, `¿Cuánto vale ${math(formula)}?`, `كم يساوي ${math(formula)}؟`, `What is ${math(formula)}?`), choices, answer, same(`-${a + 1}\\le -${a}{,}${d}<-${a}\\ \\to\\ ${formula}=-${a + 1}`), { a, d })
}

/** f(t) of a function given in two pieces, the joint with ≥ in the second */
function pieceQuestion(random: Random): BachFunctionsRaceQuestion | null {
    const t = randomInt(random, 1, 3)
    const m = randomInt(random, 2, 4)
    const n = randomInt(random, -3, 3)
    const c = randomInt(random, -4, 4)
    const left = m * t + n
    const right = t * t + c
    if (left === right) return null
    const answer = fraction(right)
    const choices = options(random, answer, [whole(left, 'piece'), whole(left + right, 'piece'), whole(t * t, 'calculation')])
    const formula = `f(x)=\\begin{cases}${m}x${n === 0 ? '' : signed(n)} & x<${t}\\\\ x^2${c === 0 ? '' : signed(c)} & x\\ge ${t}\\end{cases}`
    return choices && build(3, 'piece', say(`${math(formula)}. Zenbat da $f(${t})$?`, `${math(formula)}. ¿Cuánto vale $f(${t})$?`, `${math(formula)}. كم تساوي $f(${t})$؟`, `${math(formula)}. What is $f(${t})$?`), choices, answer, same(`f(${t})=${t}^2${c === 0 ? '' : signed(c)}=${right}`), { t, m, n, c })
}

/** |x² − ax| at a point b between 0 and a */
function absoluteQuestion(random: Random): BachFunctionsRaceQuestion | null {
    const a = randomInt(random, 3, 7)
    const b = randomInt(random, 1, a - 1)
    const answer = fraction(a * b - b * b)
    const choices = options(random, answer, [whole(b * b - a * b, 'sign'), whole(b * b + a * b, 'calculation'), whole(a * b, 'calculation')])
    const formula = `|x^2-${a}x|`
    return choices && build(3, 'absolute', say(`Zenbat balio du ${math(`y=${formula}`)} funtzioak $x=${b}$ denean?`, `¿Cuánto vale ${math(`y=${formula}`)} en $x=${b}$?`, `كم تساوي ${math(`y=${formula}`)} عند $x=${b}$؟`, `What is ${math(`y=${formula}`)} at $x=${b}$?`), choices, answer, same(`|${b * b}-${a * b}|=${a * b - b * b}`), { a, b })
}

/* ---------- Circuit 4: operations and composition ---------- */

/** f(x) = ax + b, g(x) = x² + c: (f ∘ g)(r) */
function composeQuestion(random: Random): BachFunctionsRaceQuestion | null {
    const a = randomInt(random, 2, 4)
    const b = pick(random, [-3, -2, -1, 1, 2, 3])
    const c = pick(random, [-2, -1, 1, 2, 3])
    const r = randomInt(random, -3, 3)
    const fg = a * (r * r + c) + b
    const gf = (a * r + b) ** 2 + c
    if (fg === gf) return null
    const answer = fraction(fg)
    const choices = options(random, answer, [whole(gf, 'order'), whole((a * r + b) * (r * r + c), 'calculation'), whole(a * r * r + c + b, 'calculation')])
    const value = r < 0 ? `(${r})` : String(r)
    return choices && build(4, 'compose', say(`$f(x)=${a}x${signed(b)}$ eta $g(x)=x^2${signed(c)}$. Zenbat da $(f\\circ g)(${r})$?`, `$f(x)=${a}x${signed(b)}$ y $g(x)=x^2${signed(c)}$. ¿Cuánto vale $(f\\circ g)(${r})$?`, `$f(x)=${a}x${signed(b)}$ و$g(x)=x^2${signed(c)}$. كم تساوي $(f\\circ g)(${r})$؟`, `$f(x)=${a}x${signed(b)}$ and $g(x)=x^2${signed(c)}$. What is $(f\\circ g)(${r})$?`), choices, answer, same(`g(${r})=${value}^2${signed(c)}=${r * r + c}\\ \\to\\ f(${r * r + c})=${fg}`), { a, b, c, r })
}

/** The largest number out of the domain of (x − a)/((x − b)(x − c)) */
function quotientQuestion(random: Random): BachFunctionsRaceQuestion | null {
    const a = randomInt(random, -5, 6)
    const b = randomInt(random, -5, 5)
    const c = randomInt(random, -5, 5)
    if (b >= c || a === b || a === c || a < c) return null
    const answer = fraction(c)
    const choices = options(random, answer, [whole(a, 'numerator'), whole(-c, 'sign'), whole(b, 'calculation')])
    const formula = `\\frac{${binomial(a)}}{(${binomial(b)})(${binomial(c)})}`
    return choices && build(4, 'quotient', say(`Zein da ${math(formula)} funtzioaren izate-eremutik kanpo dagoen zenbakirik handiena?`, `¿Cuál es el mayor número que queda fuera del dominio de ${math(formula)}?`, `ما أكبر عدد خارج مجال ${math(formula)}؟`, `What is the largest number left out of the domain of ${math(formula)}?`), choices, answer, same(`x=${b},\\ x=${c}`), { a, b, c })
}

/** f(x) = x + a, g(x) = x − b: (f · g)(r) */
function productQuestion(random: Random): BachFunctionsRaceQuestion | null {
    const a = randomInt(random, 1, 5)
    const b = randomInt(random, 1, 5)
    const r = randomInt(random, -3, 4)
    const answer = fraction((r + a) * (r - b))
    const choices = options(random, answer, [whole(r + a + r - b, 'calculation'), whole((r + a - b), 'order'), whole((r - a) * (r + b), 'sign')])
    return choices && build(4, 'product', say(`$f(x)=x+${a}$ eta $g(x)=x-${b}$. Zenbat da $(f\\cdot g)(${r})$?`, `$f(x)=x+${a}$ y $g(x)=x-${b}$. ¿Cuánto vale $(f\\cdot g)(${r})$?`, `$f(x)=x+${a}$ و$g(x)=x-${b}$. كم تساوي $(f\\cdot g)(${r})$؟`, `$f(x)=x+${a}$ and $g(x)=x-${b}$. What is $(f\\cdot g)(${r})$?`), choices, answer, same(`f(${r})\\cdot g(${r})=${r + a}\\cdot ${r - b < 0 ? `(${r - b})` : r - b}=${(r + a) * (r - b)}`), { a, b, r })
}

const circuitGenerators: Array<Array<(random: Random, tier: Tier) => BachFunctionsRaceQuestion | null>> = [
    [domainCountQuestion, oddQuestion, periodQuestion],
    [shiftQuestion, stretchQuestion, outsideQuestion],
    [inverseLineQuestion, inverseExpQuestion, arcQuestion],
    [floorQuestion, pieceQuestion, absoluteQuestion],
    [composeQuestion, quotientQuestion, productQuestion]
]

export function generateBachFunctionsRaceQuestion(random: Random, circuit: number, tier: Tier): BachFunctionsRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkBachFunctionsPitAnswer(question: RaceQuestion<BachFunctionsRaceError>, input: string): AnswerCheck {
    return checkAnswer(input, question.answer, question.answerForm)
}

export function bachFunctionsParTime(circuit: number): number {
    return parTimeFor([13, 12, 13, 12, 14][circuit] ?? 13)
}

export const bachFunctionsRaceErrorTips: Record<BachFunctionsRaceError, LocalizedText> = {
    ends: say('Muturrak sartzen dira: zenbatu biak.', 'Los extremos entran: cuenta los dos.', 'الطرفان يدخلان: احسبهما.', 'The ends are included: count both.'),
    'even-odd': say('Bakoitia: f(−a) = −f(a), ez f(a).', 'Impar: f(−a) = −f(a), no f(a).', 'فردية: f(−a) = −f(a) لا f(a).', 'Odd: f(−a) = −f(a), not f(a).'),
    period: say('Periodo batean ez da ezer batzen: balioa errepikatu egiten da.', 'Un periodo después no se suma nada: el valor se repite.', 'بعد دور لا يُضاف شيء: القيمة تتكرر.', 'One period later nothing is added: the value repeats.'),
    direction: say('f(x + c) ezkerrera doa: x + c = p, beraz x = p − c.', 'f(x + c) va a la izquierda: x + c = p, así que x = p − c.', 'f(x + c) تذهب إلى اليسار: x + c = p إذن x = p − c.', 'f(x + c) goes to the left: x + c = p, so x = p − c.'),
    stretch: say('f(kx) estutu egiten da: kx = p, beraz x = p/k.', 'f(kx) comprime: kx = p, así que x = p/k.', 'f(kx) تقلّص: kx = p إذن x = p/k.', 'f(kx) squeezes: kx = p, so x = p/k.'),
    order: say('Lehenik biderkatu, eta gero batu.', 'Primero se multiplica y después se suma.', 'أولًا نضرب ثم نجمع.', 'Multiply first, then add.'),
    apply: say('Hori f(v) da; f⁻¹(v) kalkulatzeko, askatu x.', 'Eso es f(v); para f⁻¹(v), despeja x.', 'هذا f(v)؛ ولـ f⁻¹(v) اعزل x.', 'That is f(v); for f⁻¹(v), solve for x.'),
    reciprocal: say('f⁻¹ ez da 1/f.', 'f⁻¹ no es 1/f.', 'f⁻¹ ليست 1/f.', 'f⁻¹ is not 1/f.'),
    power: say('Hori 2ˣ da; orain bilatu x.', 'Eso es 2ˣ; ahora busca x.', 'هذا 2ˣ؛ ابحث الآن عن x.', 'That is 2ˣ; now find x.'),
    range: say('Arku sinua eta arku tangentea −90° eta 90° artean daude; arku kosinua, 0° eta 180° artean.', 'El arco seno y el arco tangente están entre −90° y 90°; el arco coseno, entre 0° y 180°.', 'قوس الجيب وقوس الظل بين −90° و90°، وقوس جيب التمام بين 0° و180°.', 'The arc sine and the arc tangent lie between −90° and 90°; the arc cosine, between 0° and 180°.'),
    truncate: say('E(x) beti beherantz: negatiboekin, aurreko osoa.', 'E(x) siempre hacia abajo: con negativos, el entero anterior.', 'E(x) دائمًا إلى الأسفل: مع السالبة العدد الصحيح السابق.', 'E(x) always rounds down: with negatives, the whole number below.'),
    piece: say('Erabili x dagoen zatia: ≥ daramanak barne hartzen du muturra.', 'Usa el trozo en el que está x: el que lleva ≥ incluye el extremo.', 'استعمل الجزء الذي فيه x: الذي فيه ≥ يشمل الطرف.', 'Use the piece that x is in: the one with ≥ includes the end.'),
    sign: say('Kontuz zeinuarekin.', 'Cuidado con el signo.', 'انتبه للإشارة.', 'Watch the sign.'),
    numerator: say('Zenbakitzailearen zeroak izate-eremuan daude: izendatzailearenak bakarrik kentzen dira.', 'Los ceros del numerador están en el dominio: solo se quitan los del denominador.', 'أصفار البسط في المجال: لا تُحذف إلا أصفار المقام.', 'The zeros of the numerator are in the domain: only those of the denominator are removed.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}
