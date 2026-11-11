import { checkAnswer, fraction, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { written } from '../../batx1-zientziak-errealak/games/race.ts'
import { detValue, replaceColumn, systemLatex } from '../system.ts'

/* ==========================================================================
   Sistemen lasterketa (Batxilergoa 2 · Zientziak): five circuits, one per
   stage — Rouché (parameters n − r, the rank of A*, the k of three
   concurrent lines), Cramer (|A_x|, an unknown of a 2 × 2 and of a 3 × 3),
   homogeneous systems (the k with non-trivial solutions, the parameters,
   the positive m), discussion (the critical a, the b that makes it
   dependent, the positive a with no single solution) and problems (sum
   and difference, a parameter from a given solution, prices). The wrong
   options are the typical mistakes. Every question carries `meta`, the
   numbers the tests check it against.
   ========================================================================== */

export const SISTEMAK_RACE_CIRCUITS = 5

export type SistemakRaceError = 'rank-not-n' | 'inverted' | 'wrong-column' | 'sign' | 'reciprocal' | 'half' | 'calculation'

export type SistemakRaceQuestion = RaceQuestion<SistemakRaceError> & { meta: Record<string, number | number[] | number[][]> }

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (latex: string): LocalizedText => ({ eu: `$${latex}$`, es: `$${latex}$`, en: `$${latex}$`, ar: `$${latex.replace(/\{,\}/g, '.')}$` })
const bracket = (value: number) => (value < 0 ? `(${value})` : String(value))

interface Candidate {
    value: FractionValue
    error: SistemakRaceError
}
const whole = (value: number, error: SistemakRaceError): Candidate => ({ value: fraction(Math.round(value)), error })
const ratio = (p: number, q: number, error: SistemakRaceError): Candidate | null => (q === 0 ? null : { value: fraction(p, q), error })
const nearby = (value: number): Candidate[] => [value + 1, value - 1, value + 2, -value].map((item) => ({ value: fraction(Math.round(item)), error: 'calculation' as const }))

function options(random: Random, right: FractionValue, candidates: Array<Candidate | null>): RaceOption<SistemakRaceError>[] | null {
    const rightLatex = written(right)
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: SistemakRaceError }> = []
    for (const candidate of [...candidates, ...nearby(right.numerator / right.denominator)]) {
        if (!candidate || wrong.length === 3) continue
        const latex = written(candidate.value)
        if (latex === null || latex === '-0' || used.has(latex)) continue
        used.add(latex)
        wrong.push({ latex, error: candidate.error })
    }
    if (wrong.length < 3) return null
    return shuffle(random, [{ latex: rightLatex, correct: true, error: null }, ...wrong.map((item) => ({ latex: item.latex, correct: false, error: item.error }))])
}

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<SistemakRaceError>[], answer: FractionValue, solution: LocalizedText, meta: Record<string, number | number[] | number[][]>): SistemakRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution, meta }
}

const small = (random: Random) => pick(random, [-3, -2, -1, 1, 2, 3, 4])

/* ---------- Circuit 0: Rouché ---------- */

function parametersQuestion(random: Random): SistemakRaceQuestion | null {
    const n = randomInt(random, 3, 5)
    const r = randomInt(random, 1, n - 1)
    const answer = fraction(n - r)
    const choices = options(random, answer, [whole(r, 'rank-not-n'), whole(n, 'calculation'), whole(n + r, 'calculation')])
    return choices && build(0, 'parameters', say(`${n} ezezaguneko sistema batek $\\operatorname{rg}(A)=\\operatorname{rg}(A^*)=${r}$ du. Zenbat parametro ditu?`, `Un sistema de ${n} incógnitas tiene $\\operatorname{rg}(A)=\\operatorname{rg}(A^*)=${r}$. ¿Cuántos parámetros tiene?`, `نظام بـ ${n} مجاهيل فيه $\\operatorname{rg}(A)=\\operatorname{rg}(A^*)=${r}$. كم وسيطًا له؟`, `A system in ${n} unknowns has $\\operatorname{rg}(A)=\\operatorname{rg}(A^*)=${r}$. How many parameters does it have?`), choices, answer, same(`${n}-${r}=${n - r}`), { n, r })
}

/** (p q | s), (kp kq | t): rank of A* is 1 if t = ks, 2 if not */
function rankStarQuestion(random: Random): SistemakRaceQuestion | null {
    const p = randomInt(random, 1, 3)
    const q = small(random)
    const s = small(random)
    const k = pick(random, [2, 3, -1])
    const t = randomInt(random, 0, 1) === 0 ? k * s : k * s + pick(random, [1, -1, 2])
    const rank = t === k * s ? 1 : 2
    const answer = fraction(rank)
    const choices = options(random, answer, [whole(3 - rank, 'calculation'), whole(3, 'calculation'), whole(0, 'calculation')])
    const latex = systemLatex([[p, q], [k * p, k * q]], [s, t])
    return choices && build(0, 'rank-star', say(`Zein da $\\operatorname{rg}(A^*)$, $${latex}$ sisteman?`, `¿Cuánto vale $\\operatorname{rg}(A^*)$ en $${latex}$?`, `كم تساوي $\\operatorname{rg}(A^*)$ في $${latex}$؟`, `What is $\\operatorname{rg}(A^*)$ in $${latex}$?`), choices, answer, same(`\\begin{vmatrix}${p}&${s}\\\\${k * p}&${t}\\end{vmatrix}=${p * t - s * k * p}`), { p, q, s, k, t, rank })
}

/** x + y = s1 and x − y = s2 meet at (p, q); ax + by = k passes there when k = ap + bq */
function concurrentQuestion(random: Random): SistemakRaceQuestion | null {
    const p = randomInt(random, -2, 3)
    const q = randomInt(random, -2, 3)
    const a = pick(random, [2, 3, 1])
    const b = pick(random, [1, 2, -1, -2])
    const k = a * p + b * q
    const answer = fraction(k)
    const choices = options(random, answer, [whole(a * p - b * q, 'sign'), whole(a + b, 'calculation'), whole(a * q + b * p, 'calculation')])
    const third = systemLatex([[a, b]], [0]).replace('\\begin{cases}', '').replace('=0\\end{cases}', '=k')
    return choices && build(0, 'concurrent', say(`Zein $k$ baliotarako pasatzen dira puntu beretik $x+y=${p + q}$, $x-y=${p - q}$ eta $${third}$?`, `¿Para qué $k$ pasan por un mismo punto $x+y=${p + q}$, $x-y=${p - q}$ y $${third}$?`, `لأي $k$ تمر $x+y=${p + q}$ و$x-y=${p - q}$ و$${third}$ بنقطة واحدة؟`, `For which $k$ do $x+y=${p + q}$, $x-y=${p - q}$ and $${third}$ pass through one point?`), choices, answer, same(`(${p},${q})\\ \\to\\ k=${bracket(a)}\\cdot ${bracket(p)}+${bracket(b)}\\cdot ${bracket(q)}=${k}`), { a, b, p, q, k })
}

/* ---------- Circuit 1: Cramer ---------- */

const invertible2 = (random: Random): number[][] | null => {
    const rows = [[small(random), small(random)], [small(random), small(random)]]
    return detValue(rows) === 0 ? null : rows
}

/** |A_x| of a 2 × 2 */
function columnQuestion(random: Random): SistemakRaceQuestion | null {
    const a = invertible2(random)
    if (!a) return null
    const b = [small(random), small(random)]
    const dx = detValue(replaceColumn(a, b, 0))
    const dy = detValue(replaceColumn(a, b, 1))
    const answer = fraction(dx)
    const choices = options(random, answer, [whole(dy, 'wrong-column'), whole(b[0] * a[1][1] + a[0][1] * b[1], 'sign'), whole(detValue(a), 'calculation')])
    const latex = systemLatex(a, b)
    return choices && build(1, 'column', say(`$${latex}$ sisteman, zenbat da $|A_x|$?`, `En $${latex}$, ¿cuánto vale $|A_x|$?`, `في $${latex}$، كم يساوي $|A_x|$؟`, `In $${latex}$, what is $|A_x|$?`), choices, answer, same(`|A_x|=\\begin{vmatrix}${b[0]}&${a[0][1]}\\\\${b[1]}&${a[1][1]}\\end{vmatrix}=${dx}`), { a, b, dx })
}

/** x of a 2 × 2 with a whole solution */
function solve2Question(random: Random): SistemakRaceQuestion | null {
    const a = invertible2(random)
    if (!a) return null
    const s = [small(random), small(random)]
    const b = a.map((row) => row[0] * s[0] + row[1] * s[1])
    const d = detValue(a)
    const dx = detValue(replaceColumn(a, b, 0))
    const answer = fraction(s[0])
    const choices = options(random, answer, [ratio(d, dx, 'inverted'), whole(s[1], 'wrong-column'), whole(-s[0], 'sign')])
    const latex = systemLatex(a, b)
    return choices && build(1, 'solve2', say(`Ebatzi Cramerren bidez $${latex}$. Zenbat da $x$?`, `Resuelve por Cramer $${latex}$. ¿Cuánto vale $x$?`, `حُلّ بطريقة كرامر $${latex}$. كم يساوي $x$؟`, `Solve by Cramer $${latex}$. What is $x$?`), choices, answer, same(`x=\\frac{${dx}}{${d}}=${s[0]}`), { a, b, s })
}

const INVERTIBLE3 = [[[1, 1, 1], [2, -1, 1], [1, 2, -1]], [[1, 2, 1], [2, 1, 0], [0, 1, 1]], [[1, 1, 0], [0, 1, 1], [1, 0, 2]], [[2, 1, 0], [1, 0, 1], [0, 1, 1]]]

/** An unknown of a 3 × 3 with a whole solution */
function solve3Question(random: Random): SistemakRaceQuestion | null {
    const a = pick(random, INVERTIBLE3)
    const s = [small(random), small(random), small(random)]
    const b = a.map((row) => row.reduce((sum, item, j) => sum + item * s[j], 0))
    const j = randomInt(random, 0, 2)
    const name = ['x', 'y', 'z'][j]
    const d = detValue(a)
    const dj = detValue(replaceColumn(a, b, j))
    const answer = fraction(s[j])
    const choices = options(random, answer, [whole(s[(j + 1) % 3], 'wrong-column'), ratio(d, dj, 'inverted'), whole(-s[j], 'sign')])
    const latex = systemLatex(a, b)
    return choices && build(1, 'solve3', say(`Ebatzi Cramerren bidez $${latex}$. Zenbat da $${name}$?`, `Resuelve por Cramer $${latex}$. ¿Cuánto vale $${name}$?`, `حُلّ بطريقة كرامر $${latex}$. كم يساوي $${name}$؟`, `Solve by Cramer $${latex}$. What is $${name}$?`), choices, answer, same(`|A|=${d},\\ |A_${name}|=${dj}\\ \\to\\ ${s[j]}`), { a, b, s, j })
}

/* ---------- Circuit 2: homogeneous systems ---------- */

/** x + ky = 0 and cx + dy = 0: non-trivial when d − kc = 0 */
function homogeneousKQuestion(random: Random): SistemakRaceQuestion | null {
    const c = pick(random, [1, 2, 3, -2])
    const k = pick(random, [2, 3, -1, 4, -2])
    const d = c * k
    const answer = fraction(k)
    const choices = options(random, answer, [ratio(c, d, 'reciprocal'), whole(-k, 'sign'), whole(d, 'calculation')])
    const latex = `\\begin{cases}x+ky=0\\\\ ${systemLatex([[c, d]], [0]).replace('\\begin{cases}', '').replace('\\end{cases}', '')}\\end{cases}`
    return choices && build(2, 'homogeneous-k', say(`Zein $k$ baliotarako ditu soluzio ez-tribialak $${latex}$ sistemak?`, `¿Para qué $k$ tiene soluciones no triviales $${latex}$?`, `لأي $k$ يكون لـ $${latex}$ حلول غير بديهية؟`, `For which $k$ does $${latex}$ have non-trivial solutions?`), choices, answer, same(`|A|=${d}-${bracket(c)}k=0\\ \\to\\ k=${k}`), { c, d, k })
}

/** Parameters of a homogeneous system: n − rg(A) */
function homogeneousParametersQuestion(random: Random): SistemakRaceQuestion | null {
    const n = randomInt(random, 2, 4)
    const r = randomInt(random, 1, n - 1)
    const answer = fraction(n - r)
    const choices = options(random, answer, [whole(r, 'rank-not-n'), whole(0, 'calculation'), whole(n, 'calculation')])
    return choices && build(2, 'homogeneous-parameters', say(`${n} ezezaguneko sistema homogeneo batek $\\operatorname{rg}(A)=${r}$ du. Zenbat parametro ditu?`, `Un homogéneo de ${n} incógnitas tiene $\\operatorname{rg}(A)=${r}$. ¿Cuántos parámetros tiene?`, `نظام متجانس بـ ${n} مجاهيل فيه $\\operatorname{rg}(A)=${r}$. كم وسيطًا له؟`, `A homogeneous system in ${n} unknowns has $\\operatorname{rg}(A)=${r}$. How many parameters does it have?`), choices, answer, same(`${n}-${r}=${n - r}`), { n, r })
}

/** mx + cy = 0 and cx + my = 0: non-trivial when m² = c², the positive m */
function homogeneousSquareQuestion(random: Random): SistemakRaceQuestion | null {
    const c = randomInt(random, 2, 5)
    const answer = fraction(c)
    const choices = options(random, answer, [whole(c * c, 'calculation'), whole(-c, 'sign'), whole(2 * c, 'calculation')])
    const latex = `\\begin{cases}mx+${c}y=0\\\\ ${c}x+my=0\\end{cases}`
    return choices && build(2, 'homogeneous-square', say(`$m>0$ izanik, zein $m$ baliotarako ditu soluzio ez-tribialak $${latex}$ sistemak?`, `Con $m>0$, ¿para qué $m$ tiene soluciones no triviales $${latex}$?`, `مع $m>0$، لأي $m$ يكون لـ $${latex}$ حلول غير بديهية؟`, `With $m>0$, for which $m$ does $${latex}$ have non-trivial solutions?`), choices, answer, same(`m^2-${c * c}=0\\ \\to\\ m=${c}`), { c })
}

/* ---------- Circuit 3: discussion ---------- */

/** (1 1 1 / 1 2 q / 1 r a): |A| = a − (qr − q − r + 2) */
function criticalQuestion(random: Random): SistemakRaceQuestion | null {
    const q = pick(random, [3, 4, -1, 0, 2])
    const r = pick(random, [3, 5, -1, 2, 4])
    const a = q * r - q - r + 2
    const answer = fraction(a)
    const choices = options(random, answer, [whole(q * r, 'calculation'), whole(-a, 'sign'), whole(a + 2, 'calculation')])
    const latex = `\\begin{cases}x+y+z=1\\\\ ${systemLatex([[1, 2, q]], [2]).replace('\\begin{cases}', '').replace('\\end{cases}', '')}\\\\ x+${r === 1 ? '' : r === -1 ? '-' : r}y+az=3\\end{cases}`.replace('+-', '-')
    return choices && build(3, 'critical', say(`Zein $a$ baliotarako ez da bateragarri determinatua $${latex}$?`, `¿Para qué $a$ no es compatible determinado $${latex}$?`, `لأي $a$ لا يكون $${latex}$ متوافقًا محددًا؟`, `For which $a$ is $${latex}$ not consistent and independent?`), choices, answer, same(`|A|=a-${bracket(a)}=0\\ \\to\\ a=${a}`), { q, r, a })
}

/** x + y = s and px + py = b: dependent when b = ps */
function dependentBQuestion(random: Random): SistemakRaceQuestion | null {
    const s = small(random)
    const p = pick(random, [2, 3, -2, 4])
    const answer = fraction(p * s)
    const choices = options(random, answer, [whole(s, 'calculation'), whole(p + s, 'calculation'), whole(-p * s, 'sign')])
    const latex = `\\begin{cases}x+y=${s}\\\\ ${p === -2 ? '-2' : p}x${p < 0 ? '-' : '+'}${Math.abs(p)}y=b\\end{cases}`
    return choices && build(3, 'dependent-b', say(`Zein $b$ baliotarako da bateragarri indeterminatua $${latex}$?`, `¿Para qué $b$ es compatible indeterminado $${latex}$?`, `لأي $b$ يكون $${latex}$ متوافقًا غير محدد؟`, `For which $b$ is $${latex}$ consistent and dependent?`), choices, answer, same(`E_2=${p}E_1\\ \\to\\ b=${bracket(p)}\\cdot ${bracket(s)}=${p * s}`), { s, p })
}

/** ax + 4y = 1 and cx + ay = 2: |A| = a² − 4c, the positive root */
function squareCriticalQuestion(random: Random): SistemakRaceQuestion | null {
    const root = pick(random, [2, 4, 6])
    const c = (root * root) / 4
    const answer = fraction(root)
    const choices = options(random, answer, [whole(4 * c, 'calculation'), whole(c, 'calculation'), whole(-root, 'sign')])
    const latex = `\\begin{cases}ax+4y=1\\\\ ${c === 1 ? '' : c}x+ay=2\\end{cases}`
    return choices && build(3, 'square-critical', say(`Zein $a$ balio positibotarako ez da bateragarri determinatua $${latex}$?`, `¿Para qué valor positivo de $a$ no es compatible determinado $${latex}$?`, `لأي قيمة موجبة لـ $a$ لا يكون $${latex}$ متوافقًا محددًا؟`, `For which positive value of $a$ is $${latex}$ not consistent and independent?`), choices, answer, same(`a^2-${4 * c}=0\\ \\to\\ a=${root}`), { c, root })
}

/* ---------- Circuit 4: problems ---------- */

function sumDifferenceQuestion(random: Random): SistemakRaceQuestion | null {
    const x = randomInt(random, 5, 20)
    const y = randomInt(random, 1, x - 1)
    const answer = fraction(x)
    const choices = options(random, answer, [whole(y, 'calculation'), whole(x + y, 'half'), whole(x - y, 'calculation')])
    return choices && build(4, 'sum-difference', say(`Bi zenbakiren batura ${x + y} da, eta kendura ${x - y}. Zein da handiena?`, `Dos números suman ${x + y} y su diferencia es ${x - y}. ¿Cuál es el mayor?`, `مجموع عددين ${x + y} والفرق بينهما ${x - y}. ما الأكبر؟`, `Two numbers add up to ${x + y} and their difference is ${x - y}. Which is the larger?`), choices, answer, same(`2x=${x + y}+${x - y}=${2 * x}\\ \\to\\ x=${x}`), { x, y })
}

/** (p, q) solves x + my = s: m = (s − p)/q */
function givenSolutionQuestion(random: Random): SistemakRaceQuestion | null {
    const p = small(random)
    const q = pick(random, [1, 2, -1, 3])
    const m = small(random)
    const s = p + m * q
    const answer = fraction(m)
    const choices = options(random, answer, [whole(-m, 'sign'), ratio(s + p, q, 'sign'), whole(s - p, 'calculation')])
    return choices && build(4, 'given-solution', say(`Zein $m$ baliotarako da $(${p},${q})$ $x+my=${s}$ ekuazioaren soluzioa?`, `¿Para qué $m$ es $(${p},${q})$ solución de $x+my=${s}$?`, `لأي $m$ يكون $(${p},${q})$ حلًّا لـ $x+my=${s}$؟`, `For which $m$ is $(${p},${q})$ a solution of $x+my=${s}$?`), choices, answer, same(`${p}+${bracket(q)}m=${s}\\ \\to\\ m=${m}`), { p, q, m, s })
}

/** a units of X and b of Y cost s1; c of X and d of Y cost s2 */
function pricesQuestion(random: Random): SistemakRaceQuestion | null {
    const x = randomInt(random, 1, 6)
    const y = randomInt(random, 1, 6)
    const [a, b, c, d] = [randomInt(random, 1, 3), randomInt(random, 1, 3), randomInt(random, 1, 3), randomInt(random, 1, 3)]
    if (a * d - b * c === 0) return null
    const [s1, s2] = [a * x + b * y, c * x + d * y]
    const answer = fraction(x)
    const choices = options(random, answer, [whole(y, 'wrong-column'), ratio(s1, a + b, 'calculation'), whole(s1 - s2, 'calculation')])
    return choices && build(4, 'prices', say(`${a} kafek eta ${b} zukuk ${s1} € balio dute; ${c} kafek eta ${d} zukuk, ${s2} €. Zenbat balio du kafe batek?`, `${a} cafés y ${b} zumos cuestan ${s1} €; ${c} cafés y ${d} zumos, ${s2} €. ¿Cuánto cuesta un café?`, `${a} قهوة و${b} عصير بـ ${s1} €، و${c} قهوة و${d} عصير بـ ${s2} €. كم ثمن القهوة؟`, `${a} coffees and ${b} juices cost €${s1}; ${c} coffees and ${d} juices, €${s2}. How much is a coffee?`), choices, answer, same(`${systemLatex([[a, b], [c, d]], [s1, s2])}\\ \\to\\ x=${x}`), { a, b, c, d, s1, s2, x })
}

const circuitGenerators: Array<Array<(random: Random, tier: Tier) => SistemakRaceQuestion | null>> = [
    [parametersQuestion, rankStarQuestion, concurrentQuestion],
    [columnQuestion, solve2Question, solve3Question],
    [homogeneousKQuestion, homogeneousParametersQuestion, homogeneousSquareQuestion],
    [criticalQuestion, dependentBQuestion, squareCriticalQuestion],
    [sumDifferenceQuestion, givenSolutionQuestion, pricesQuestion]
]

export function generateSistemakRaceQuestion(random: Random, circuit: number, tier: Tier): SistemakRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkSistemakPitAnswer(question: RaceQuestion<SistemakRaceError>, input: string): AnswerCheck {
    return checkAnswer(input, question.answer, question.answerForm)
}

export function sistemakParTime(circuit: number): number {
    return parTimeFor([12, 15, 13, 15, 14][circuit] ?? 14)
}

export const sistemakRaceErrorTips: Record<SistemakRaceError, LocalizedText> = {
    'rank-not-n': say('Parametroak: ezezagun kopurua ken heina, $n-r$.', 'Parámetros: número de incógnitas menos el rango, $n-r$.', 'الوسائط: عدد المجاهيل ناقص الرتبة، $n-r$.', 'Parameters: number of unknowns minus the rank, $n-r$.'),
    inverted: say('$x=\\frac{|A_x|}{|A|}$: $|A|$ beti behean.', '$x=\\frac{|A_x|}{|A|}$: $|A|$ siempre abajo.', '$x=\\frac{|A_x|}{|A|}$: $|A|$ في المقام دائمًا.', '$x=\\frac{|A_x|}{|A|}$: $|A|$ always below.'),
    'wrong-column': say('$B$ zutabea ezezagun horren zutabean jartzen da.', 'La columna $B$ va en la columna de esa incógnita.', 'العمود $B$ يوضع في عمود ذلك المجهول.', 'The column $B$ goes in the column of that unknown.'),
    sign: say('Kontuz zeinuarekin.', 'Cuidado con el signo.', 'انتبه للإشارة.', 'Watch the sign.'),
    reciprocal: say('Berdindu $|A|$ zerora, eta askatu $k$.', 'Iguala $|A|$ a cero y despeja $k$.', 'ساوِ $|A|$ بالصفر واستخرج $k$.', 'Set $|A|$ equal to zero and solve for $k$.'),
    half: say('Batzean $2x$ ateratzen da: zatitu 2 zenbakiaz.', 'Al sumar sale $2x$: divide entre 2.', 'بالجمع نحصل على $2x$: اقسم على 2.', 'Adding gives $2x$: divide by 2.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}
