import { checkAnswer, fraction, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { written } from '../../batx1-zientziak-errealak/games/race.ts'

/* ==========================================================================
   Sistemen lasterketa (Batxilergoa 1 · Zientziak): five circuits, one per
   stage — linear systems (a missing number of a solution, the m that makes
   a system inconsistent, the coefficient after E2 − aE1), Gauss (substituting
   back, the k that makes a zero, a problem with three unknowns), analysing
   (z from the last row, x from λ, the critical a), non-linear systems (sum
   and product, how many solutions with two squares, an exponential
   system) and inequalities (integer points of a triangle, a point on the
   boundary, the area of a triangle). The wrong options are the typical
   mistakes. Every question carries `meta`, the numbers the tests check it
   against.
   ========================================================================== */

export const BACH_SYSTEMS_RACE_CIRCUITS = 5

export type BachSystemsRaceError =
    | 'sign'
    | 'coefficient'
    | 'constant'
    | 'inverse'
    | 'order'
    | 'multiplier'
    | 'symmetric'
    | 'u-for-x'
    | 'axis'
    | 'half'
    | 'calculation'

export type BachSystemsRaceQuestion = RaceQuestion<BachSystemsRaceError> & { meta: Record<string, number> }

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (latex: string): LocalizedText => ({ eu: `$${latex}$`, es: `$${latex}$`, en: `$${latex}$`, ar: `$${latex.replace(/\{,\}/g, '.')}$` })
const math = (latex: string) => `$${latex}$`
const cases = (...rows: string[]) => `\\begin{cases}${rows.join('\\\\ ')}\\end{cases}`
/** c·v in LaTeX, with its sign when it is not first */
const term = (value: number, name: string, first = false) => (value === 0 ? '' : `${value < 0 ? '-' : first ? '' : '+'}${Math.abs(value) === 1 ? '' : Math.abs(value)}${name}`)

interface Candidate {
    value: FractionValue
    error: BachSystemsRaceError
}
const whole = (value: number, error: BachSystemsRaceError): Candidate => ({ value: fraction(Math.round(value) + 0), error })
const ratio = (p: number, q: number, error: BachSystemsRaceError): Candidate => ({ value: fraction(p, q), error })
const nearby = (value: number): Candidate[] => [value + 1, value - 1, value + 2, value * 2].map((item) => ({ value: fraction(Math.round(item * 10000), 10000), error: 'calculation' as const }))

/** The right option and three different mistakes */
function options(random: Random, right: FractionValue, candidates: Candidate[]): RaceOption<BachSystemsRaceError>[] | null {
    const rightLatex = written(right)
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: BachSystemsRaceError }> = []
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

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<BachSystemsRaceError>[], answer: FractionValue, solution: LocalizedText, meta: Record<string, number>): BachSystemsRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution, meta }
}

const ask = (formula: string, what: LocalizedText) => say(`${math(formula)}. ${what.eu}`, `${math(formula)}. ${what.es}`, `${math(formula)}. ${what.ar}`, `${math(formula)}. ${what.en}`)
const value = (name: string) => say(`Zenbat da $${name}$?`, `¿Cuánto vale $${name}$?`, `كم قيمة $${name}$؟`, `What is $${name}$?`)

/* ---------- Circuit 0: linear systems ---------- */

/** (1, 2, k) on ax + by + cz = d: k = (d − a − 2b)/c */
function missingQuestion(random: Random): BachSystemsRaceQuestion | null {
    const a = randomInt(random, 1, 3)
    const b = randomInt(random, -2, 3)
    const c = pick(random, [1, 2, -1])
    const k = randomInt(random, -4, 5)
    const d = a + 2 * b + c * k
    const answer = fraction(k)
    const choices = options(random, answer, [whole(d - a - 2 * b, c === 1 ? 'sign' : 'coefficient'), whole(-k, 'sign'), whole(d - a - b, 'coefficient')])
    const equation = `${term(a, 'x', true)}${term(b, 'y')}${term(c, 'z')}=${d}`
    return choices && build(0, 'missing', say(`$(1,2,k)$ hirukoteak $${equation}$ betetzen du. Zenbat da $k$?`, `La terna $(1,2,k)$ cumple $${equation}$. ¿Cuánto vale $k$?`, `الثلاثية $(1,2,k)$ تحقق $${equation}$. كم قيمة $k$؟`, `The triple $(1,2,k)$ satisfies $${equation}$. What is $k$?`), choices, answer, same(`${a}+${b < 0 ? `(${b})` : b}\\cdot 2${term(c, 'k')}=${d}\\ \\to\\ k=${k}`), { a, b, c, d, k })
}

/** x + py = r, mx + qy = t with q = kp: inconsistent when m = k */
function inconsistentQuestion(random: Random): BachSystemsRaceQuestion | null {
    const p = pick(random, [-2, -1, 1, 2, 3])
    const k = pick(random, [2, 3, 4, -2])
    const r = randomInt(random, 1, 5)
    const t = k * r + pick(random, [-3, -1, 1, 2])
    const q = k * p
    const answer = fraction(k)
    const choices = options(random, answer, [whole(q, 'coefficient'), whole(-k, 'sign'), ratio(t, r, 'constant')])
    return choices && build(0, 'inconsistent', say(`Aurkitu $m$, $${cases(`x${term(p, 'y')}=${r}`, `mx${term(q, 'y')}=${t}`)}$ bateraezina izan dadin.`, `Halla $m$ para que $${cases(`x${term(p, 'y')}=${r}`, `mx${term(q, 'y')}=${t}`)}$ sea incompatible.`, `أوجد $m$ ليكون $${cases(`x${term(p, 'y')}=${r}`, `mx${term(q, 'y')}=${t}`)}$ غير متوافق.`, `Find $m$ so that $${cases(`x${term(p, 'y')}=${r}`, `mx${term(q, 'y')}=${t}`)}$ is inconsistent.`), choices, answer, same(`\\frac{m}{1}=\\frac{${q}}{${p}}\\ \\to\\ m=${k}`), { p, q, r, t, k })
}

/** x + py = r, ax + qy = t: the coefficient of y after E2 − aE1 is q − ap */
function coefficientQuestion(random: Random): BachSystemsRaceQuestion | null {
    const p = pick(random, [-3, -2, -1, 1, 2, 3])
    const a = pick(random, [2, 3, 4, -2, -3])
    const q = randomInt(random, -4, 5)
    const r = randomInt(random, 1, 6)
    const t = randomInt(random, -6, 9)
    const left = q - a * p
    if (left === 0) return null
    const answer = fraction(left)
    const choices = options(random, answer, [whole(q + a * p, 'sign'), whole(q - p, 'multiplier'), whole(q, 'coefficient')])
    const operation = `E_2${a < 0 ? '+' : '-'}${Math.abs(a)}E_1`
    return choices && build(0, 'coefficient', say(`$${cases(`x${term(p, 'y')}=${r}`, `${term(a, 'x', true)}${term(q, 'y')}=${t}`)}$ sisteman, $${operation}$ eginda, zein zenbakik biderkatzen du $y$?`, `En $${cases(`x${term(p, 'y')}=${r}`, `${term(a, 'x', true)}${term(q, 'y')}=${t}`)}$, con $${operation}$, ¿qué número multiplica a $y$?`, `في $${cases(`x${term(p, 'y')}=${r}`, `${term(a, 'x', true)}${term(q, 'y')}=${t}`)}$ وبالعملية $${operation}$ ما العدد الذي يضرب $y$؟`, `In $${cases(`x${term(p, 'y')}=${r}`, `${term(a, 'x', true)}${term(q, 'y')}=${t}`)}$, with $${operation}$, what number multiplies $y$?`), choices, answer, same(`${q}-${a < 0 ? `(${a})` : a}\\cdot ${p < 0 ? `(${p})` : p}=${left}`), { p, a, q, left })
}

/* ---------- Circuit 1: Gauss ---------- */

/** x + y + z = s, y + cz = r, dz = e: x by going up */
function backQuestion(random: Random): BachSystemsRaceQuestion | null {
    const x = randomInt(random, -3, 4)
    const y = randomInt(random, -3, 4)
    const z = randomInt(random, -2, 3)
    const c = pick(random, [-2, -1, 1, 2])
    const d = pick(random, [2, 3, -2])
    const s = x + y + z
    const r = y + c * z
    const e = d * z
    const answer = fraction(x)
    const choices = options(random, answer, [whole(s - (r + c * z) - z, 'sign'), whole(s - y, 'calculation'), whole(z, 'order')])
    return choices && build(1, 'back', ask(cases(`x+y+z=${s}`, `y${term(c, 'z')}=${r}`, `${d}z=${e}`), value('x')), choices, answer, same(`z=${z},\\ y=${y},\\ x=${x}`), { x, y, z })
}

/** E2 + kE1 with E1 = x + …, E2 = ax + …: k = −a */
function kQuestion(random: Random): BachSystemsRaceQuestion | null {
    const a = pick(random, [-5, -4, -3, -2, 2, 3, 4, 5])
    const b = randomInt(random, -3, 3)
    const q = randomInt(random, -4, 4)
    const r = randomInt(random, -5, 6)
    const t = randomInt(random, -6, 8)
    const answer = fraction(-a)
    const choices = options(random, answer, [whole(a, 'sign'), ratio(-1, a, 'inverse'), whole(-a + 1, 'calculation')])
    return choices && build(1, 'k', say(`$${cases(`x${term(b, 'y')}=${r}`, `${term(a, 'x', true)}${term(q, 'y')}=${t}`)}$ sisteman, zein $k$ zenbakik kentzen du $x$ ezezaguna $E_2+kE_1$ eragiketan?`, `En $${cases(`x${term(b, 'y')}=${r}`, `${term(a, 'x', true)}${term(q, 'y')}=${t}`)}$, ¿qué $k$ quita la $x$ en $E_2+kE_1$?`, `في $${cases(`x${term(b, 'y')}=${r}`, `${term(a, 'x', true)}${term(q, 'y')}=${t}`)}$ أي $k$ يحذف $x$ في $E_2+kE_1$؟`, `In $${cases(`x${term(b, 'y')}=${r}`, `${term(a, 'x', true)}${term(q, 'y')}=${t}`)}$, which $k$ removes the $x$ in $E_2+kE_1$?`), choices, answer, same(`${a}+k\\cdot 1=0\\ \\to\\ k=${-a}`), { a })
}

/** Three numbers add up to s; the second is twice the first and the third is d more than the first */
function problemQuestion(random: Random): BachSystemsRaceQuestion | null {
    const x = randomInt(random, 2, 9)
    const d = randomInt(random, 1, 6)
    const s = 4 * x + d
    const answer = fraction(x)
    const choices = options(random, answer, [ratio(s, 4, 'constant'), ratio(s + d, 4, 'sign'), ratio(s, 3, 'calculation')])
    return choices && build(1, 'problem', say(`Hiru zenbakiren batura ${s} da. Bigarrena lehenaren bikoitza da, eta hirugarrena lehena gehi ${d}. Zein da lehena?`, `Tres números suman ${s}. El segundo es el doble del primero y el tercero es el primero más ${d}. ¿Cuál es el primero?`, `مجموع ثلاثة أعداد ${s}. الثاني ضعف الأول، والثالث هو الأول زائد ${d}. ما الأول؟`, `Three numbers add up to ${s}. The second is twice the first and the third is the first plus ${d}. What is the first?`), choices, answer, same(`x+2x+x+${d}=${s}\\ \\to\\ x=${x}`), { x, d, s })
}

/* ---------- Circuit 2: analysing a system ---------- */

/** The last row 0 0 c | d: z = d/c */
function lastRowQuestion(random: Random): BachSystemsRaceQuestion | null {
    const c = pick(random, [-4, -3, -2, 2, 3, 4, 5])
    const z = randomInt(random, -3, 4)
    if (z === 0 || z === 1) return null
    const d = c * z
    const answer = fraction(z)
    const choices = options(random, answer, [ratio(c, d, 'inverse'), whole(d - c, 'calculation'), whole(d, 'coefficient')])
    return choices && build(2, 'last-row', say(`Sistema mailakatu baten azken errenkada $(0\\ \\ 0\\ \\ ${c}\\mid ${d})$ da. Zenbat da $z$?`, `La última fila de un sistema escalonado es $(0\\ \\ 0\\ \\ ${c}\\mid ${d})$. ¿Cuánto vale $z$?`, `الصف الأخير لنظام درجي هو $(0\\ \\ 0\\ \\ ${c}\\mid ${d})$. كم قيمة $z$؟`, `The last row of a triangular system is $(0\\ \\ 0\\ \\ ${c}\\mid ${d})$. What is $z$?`), choices, answer, same(`${c}z=${d}\\ \\to\\ z=${z}`), { c, d, z })
}

/** The solutions (p + qλ, r + sλ, λ): x when z = v */
function lambdaQuestion(random: Random): BachSystemsRaceQuestion | null {
    const p = randomInt(random, -3, 4)
    const q = pick(random, [-3, -2, -1, 2, 3])
    const r = randomInt(random, -2, 3)
    const s = pick(random, [-2, -1, 1, 2])
    const v = pick(random, [-2, 2, 3, 4])
    const x = p + q * v
    const answer = fraction(x)
    const choices = options(random, answer, [whole(p - q * v, 'sign'), whole(p + v, 'coefficient'), whole(r + s * v, 'order')])
    const lin = (constant: number, slope: number) => `${constant === 0 ? '' : constant}${slope < 0 ? '-' : constant === 0 ? '' : '+'}${Math.abs(slope) === 1 ? '' : Math.abs(slope)}\\lambda`
    const family = `(${lin(p, q)},\\ ${lin(r, s)},\\ \\lambda)`
    return choices && build(2, 'lambda', say(`Soluzioak $${family}$ dira. Zenbat da $x$, $z=${v}$ denean?`, `Las soluciones son $${family}$. ¿Cuánto vale $x$ si $z=${v}$?`, `الحلول هي $${family}$. كم قيمة $x$ إذا كان $z=${v}$؟`, `The solutions are $${family}$. What is $x$ when $z=${v}$?`), choices, answer, same(`\\lambda=${v}\\ \\to\\ x=${x}`), { p, q, v, x })
}

/** x + py = r, sx + ay = b: the coefficient of y after E2 − sE1 is a − sp, zero for a = sp */
function criticalQuestion(random: Random): BachSystemsRaceQuestion | null {
    const p = pick(random, [-3, -2, -1, 1, 2, 3])
    const s = pick(random, [2, 3, -2])
    const r = randomInt(random, 1, 4)
    const b = s * r + pick(random, [-2, -1, 1, 3])
    const critical = s * p
    const answer = fraction(critical)
    const choices = options(random, answer, [whole(p, 'coefficient'), whole(-critical, 'sign'), whole(s, 'multiplier')])
    return choices && build(2, 'critical', say(`Zein $a$ baliotarako da bateraezina $${cases(`x${term(p, 'y')}=${r}`, `${s}x+ay=${b}`)}$?`, `¿Para qué $a$ es incompatible $${cases(`x${term(p, 'y')}=${r}`, `${s}x+ay=${b}`)}$?`, `لأي قيمة لـ $a$ يكون $${cases(`x${term(p, 'y')}=${r}`, `${s}x+ay=${b}`)}$ غير متوافق؟`, `For which $a$ is $${cases(`x${term(p, 'y')}=${r}`, `${s}x+ay=${b}`)}$ inconsistent?`), choices, answer, same(`E_2${s < 0 ? '+' : '-'}${Math.abs(s)}E_1\\ \\to\\ (a${critical < 0 ? '+' : '-'}${Math.abs(critical)})y=${b - s * r}\\ \\to\\ a=${critical}`), { p, s, r, b, critical })
}

/* ---------- Circuit 3: non-linear systems ---------- */

/** x + y = S, xy = P: the larger x */
function sumProductQuestion(random: Random): BachSystemsRaceQuestion | null {
    const m = randomInt(random, -3, 4)
    const n = randomInt(random, -2, 7)
    if (m >= n || m === 0 || n === 0) return null
    const S = m + n
    const P = m * n
    const answer = fraction(n)
    const choices = options(random, answer, [whole(m, 'order'), whole(S, 'constant'), whole(P, 'coefficient')])
    return choices && build(3, 'sum-product', ask(cases(`x+y=${S}`, `xy=${P}`), say('Zein da $x$ handiena?', '¿Cuál es el mayor valor de $x$?', 'ما أكبر قيمة لـ $x$؟', 'What is the largest value of $x$?')), choices, answer, same(`x^2${term(-S, 'x')}${P < 0 ? P : `+${P}`}=0\\ \\to\\ x=${m},\\ x=${n}`), { S, P, m, n })
}

/** x² + y² = A, x² − y² = B: 4, 2 or 0 solutions */
function squaresQuestion(random: Random): BachSystemsRaceQuestion | null {
    const x2 = pick(random, [1, 4, 9, 16, 25])
    const y2 = pick(random, [0, 1, 4, 9, -4, -1])
    const A = x2 + y2
    const B = x2 - y2
    const count = y2 > 0 ? 4 : y2 === 0 ? 2 : 0
    const answer = fraction(count)
    const choices = options(random, answer, [whole(count === 4 ? 2 : 4, 'symmetric'), whole(count === 0 ? 2 : count === 2 ? 1 : 1, 'symmetric'), whole(count === 0 ? 4 : 0, 'sign')])
    return choices && build(3, 'squares', ask(cases(`x^2+y^2=${A}`, `x^2-y^2=${B}`), say('Zenbat soluzio ditu?', '¿Cuántas soluciones tiene?', 'كم حلًّا له؟', 'How many solutions does it have?')), choices, answer, same(`x^2=${x2},\\ y^2=${y2}\\ \\to\\ ${count}`), { x2, y2, count })
}

/** 2ˣ + 2ʸ = A, 2ˣ − 2ʸ = B: x + y */
function exponentialQuestion(random: Random): BachSystemsRaceQuestion | null {
    const x = randomInt(random, 1, 5)
    const y = randomInt(random, 0, 3)
    if (y >= x) return null
    const u = 2 ** x
    const v = 2 ** y
    const answer = fraction(x + y)
    const choices = options(random, answer, [whole(u + v, 'u-for-x'), whole(x, 'order'), whole(x - y, 'sign')])
    return choices && build(3, 'exponential', ask(cases(`2^x+2^y=${u + v}`, `2^x-2^y=${u - v}`), value('x+y')), choices, answer, same(`2^x=${u},\\ 2^y=${v}\\ \\to\\ x=${x},\\ y=${y}`), { x, y })
}

/* ---------- Circuit 4: inequalities ---------- */

/** x ≥ 0, y ≥ 0, x + y ≤ n: (n + 1)(n + 2)/2 integer points */
function latticeQuestion(random: Random): BachSystemsRaceQuestion | null {
    const n = randomInt(random, 2, 6)
    const count = ((n + 1) * (n + 2)) / 2
    const answer = fraction(count)
    const choices = options(random, answer, [whole((n * (n + 1)) / 2, 'axis'), whole((n + 1) * (n + 1), 'calculation'), whole(count - 1, 'axis')])
    return choices && build(4, 'lattice', ask(cases('x\\ge 0', 'y\\ge 0', `x+y\\le ${n}`), say('Zenbat puntu oso ditu eskualdeak?', '¿Cuántos puntos enteros tiene la región?', 'كم نقطة صحيحة في المنطقة؟', 'How many integer points does the region have?')), choices, answer, same(`${Array.from({ length: n + 1 }, (_, i) => n + 1 - i).join('+')}=${count}`), { n, count })
}

/** (2, k) on the boundary of ax + by ≤ c: k = (c − 2a)/b */
function boundaryQuestion(random: Random): BachSystemsRaceQuestion | null {
    const a = randomInt(random, 1, 4)
    const b = pick(random, [1, 2, 3, -1, -2])
    const k = randomInt(random, -3, 4)
    const c = 2 * a + b * k
    const answer = fraction(k)
    const choices = options(random, answer, [ratio(c + 2 * a, b, 'sign'), whole(c - 2 * a, b === 1 ? 'sign' : 'coefficient'), ratio(c, b, 'constant')])
    return choices && build(4, 'boundary', say(`$(2,k)$ puntua $${term(a, 'x', true)}${term(b, 'y')}\\le ${c}$ inekuazioaren muga-zuzenean dago. Zenbat da $k$?`, `El punto $(2,k)$ está en la recta frontera de $${term(a, 'x', true)}${term(b, 'y')}\\le ${c}$. ¿Cuánto vale $k$?`, `النقطة $(2,k)$ على المستقيم الحدّي للمتراجحة $${term(a, 'x', true)}${term(b, 'y')}\\le ${c}$. كم قيمة $k$؟`, `The point $(2,k)$ is on the boundary line of $${term(a, 'x', true)}${term(b, 'y')}\\le ${c}$. What is $k$?`), choices, answer, same(`${a}\\cdot 2${term(b, 'k')}=${c}\\ \\to\\ k=${k}`), { a, b, c, k })
}

/** x ≥ 0, y ≥ 0, ax + by ≤ c: a triangle of area c²/(2ab) */
function areaQuestion(random: Random): BachSystemsRaceQuestion | null {
    const a = randomInt(random, 1, 3)
    const b = randomInt(random, 1, 3)
    const c = a * b * randomInt(random, 1, 3)
    const area = fraction(c * c, 2 * a * b)
    const choices = options(random, area, [ratio(c * c, a * b, 'half'), ratio(c, 2, 'calculation'), ratio(c * c, 2, 'coefficient')])
    return choices && build(4, 'area', ask(cases('x\\ge 0', 'y\\ge 0', `${term(a, 'x', true)}${term(b, 'y')}\\le ${c}`), say('Zein da eskualdearen azalera?', '¿Cuál es el área de la región?', 'ما مساحة المنطقة؟', 'What is the area of the region?')), choices, area, same(`\\frac{${c / a}\\cdot ${c / b}}{2}=${written(area)}`), { a, b, c })
}

const circuitGenerators: Array<Array<(random: Random, tier: Tier) => BachSystemsRaceQuestion | null>> = [
    [missingQuestion, inconsistentQuestion, coefficientQuestion],
    [backQuestion, kQuestion, problemQuestion],
    [lastRowQuestion, lambdaQuestion, criticalQuestion],
    [sumProductQuestion, squaresQuestion, exponentialQuestion],
    [latticeQuestion, boundaryQuestion, areaQuestion]
]

export function generateBachSystemsRaceQuestion(random: Random, circuit: number, tier: Tier): BachSystemsRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkBachSystemsPitAnswer(question: RaceQuestion<BachSystemsRaceError>, input: string): AnswerCheck {
    return checkAnswer(input, question.answer, question.answerForm)
}

export function bachSystemsParTime(circuit: number): number {
    return parTimeFor([13, 14, 13, 13, 13][circuit] ?? 13)
}

export const bachSystemsRaceErrorTips: Record<BachSystemsRaceError, LocalizedText> = {
    sign: say('Kontuz zeinuarekin: kentzean, zeinu guztiak aldatzen dira.', 'Cuidado con el signo: al restar, cambian todos los signos.', 'انتبه للإشارة: عند الطرح تتغير كل الإشارات.', 'Watch the sign: when you subtract, every sign changes.'),
    coefficient: say('Ez ahaztu ezezagunaren koefizientea.', 'No olvides el coeficiente de la incógnita.', 'لا تنسَ معامل المجهول.', 'Do not forget the coefficient of the unknown.'),
    constant: say('Gai askea ere sartzen da kontuan.', 'El término independiente también cuenta.', 'الحد الثابت يدخل في الحساب أيضًا.', 'The constant term counts too.'),
    inverse: say('Alderantziz: zatitu eskuineko zenbakia koefizienteaz.', 'Al revés: divide el número de la derecha entre el coeficiente.', 'العكس: اقسم العدد في اليمين على المعامل.', 'The other way round: divide the right-hand number by the coefficient.'),
    order: say('Hori beste ezezagun bat edo beste soluzio bat da: begiratu zer eskatzen den.', 'Eso es otra incógnita u otra solución: mira qué se pide.', 'هذا مجهول آخر أو حل آخر: انظر إلى المطلوب.', 'That is another unknown or another solution: look at what is asked.'),
    multiplier: say('Biderkatu errenkada osoa zenbaki berberaz.', 'Multiplica toda la fila por el mismo número.', 'اضرب الصف كله في العدد نفسه.', 'Multiply the whole row by the same number.'),
    symmetric: say('x² = c ekuazioak bi soluzio ditu c > 0 bada, bat c = 0 bada eta bat ere ez c < 0 bada.', 'x² = c tiene dos soluciones si c > 0, una si c = 0 y ninguna si c < 0.', 'للمعادلة x² = c حلّان إذا c > 0، وحل واحد إذا c = 0، ولا حل إذا c < 0.', 'x² = c has two solutions if c > 0, one if c = 0 and none if c < 0.'),
    'u-for-x': say('Hori u = 2ˣ da; x lortzeko, 2ˣ = u.', 'Eso es u = 2ˣ; para hallar x, 2ˣ = u.', 'هذه u = 2ˣ؛ لإيجاد x حُلّ 2ˣ = u.', 'That is u = 2ˣ; to find x, solve 2ˣ = u.'),
    axis: say('Ardatzetako puntuak ere zenbatu behar dira.', 'También cuentan los puntos de los ejes.', 'نقاط المحورين تُعدّ أيضًا.', 'The points on the axes count too.'),
    half: say('Triangelu baten azalera oinarria bider altuera zati 2 da.', 'El área de un triángulo es base por altura entre 2.', 'مساحة المثلث هي القاعدة ضرب الارتفاع على 2.', 'The area of a triangle is base times height divided by 2.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}
