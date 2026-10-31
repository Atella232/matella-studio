import { checkAnswer, fraction, type AnswerCheck } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { functionAnswer, functionWork, lin, quad, type FunctionCheckKind } from '../content.ts'

/* ==========================================================================
   Funtzioen lasterketa (3. DBH): five circuits, one per stage — values
   and domains; cuts with the axes and turning points; slopes and
   proportions; lines through a point and crossings; vertices. Every
   question is one of the checks of ../content.ts, so its kind and data
   (`meta`) let the tests work the answer out again; its solution is the
   same worked line as in the exercises. Every answer is a whole number.
   ========================================================================== */

export const FUNCTIONS3_RACE_CIRCUITS = 5

export type Functions3RaceError = 'negative-square' | 'axis-swap' | 'slope-upside-down' | 'n-as-y' | 'vertex-sign' | 'vertex-no-2' | 'cross-sign' | 'sign' | 'calculation'

export type Functions3RaceQuestion = RaceQuestion<Functions3RaceError> & { meta: Record<string, number> }

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (latex: string): LocalizedText => ({ eu: `$${latex}$`, es: `$${latex}$`, en: `$${latex}$`, ar: `$${latex.replace(/\{,\}/g, '.')}$` })

interface Candidate {
    value: number
    error: Functions3RaceError
}
const wrong = (value: number, error: Functions3RaceError): Candidate => ({ value, error })

function options(random: Random, right: number, candidates: Candidate[]): RaceOption<Functions3RaceError>[] | null {
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

/** A question from one of the checks of the exercises: its answer and its worked line come from there */
function build(random: Random, circuit: number, kind: FunctionCheckKind, args: number[], prompt: LocalizedText, candidates: Candidate[]): Functions3RaceQuestion | null {
    const answer = functionAnswer({ kind, args })
    if (!Number.isInteger(answer)) return null
    const choices = options(random, answer, candidates)
    if (!choices) return null
    return { circuit, kind, prompt, options: choices, answer: fraction(answer), answerForm: 'any', percentAnswer: false, writable: true, solution: same(functionWork({ kind, args })), meta: Object.fromEntries(args.map((value, index) => [`a${index}`, value])) }
}

const nonZero = (random: Random, min: number, max: number) => {
    for (;;) {
        const value = randomInt(random, min, max)
        if (value !== 0) return value
    }
}

/* ---------- Circuit 0: values and domains ---------- */

function lineValue(random: Random) {
    const m = nonZero(random, -5, 5)
    const n = randomInt(random, -6, 6)
    const x = nonZero(random, -4, 4)
    return build(random, 0, 'linear', [m, n, x], say(`$f(x)=${lin(m, n)}$: $f(${x})$?`, `$f(x)=${lin(m, n)}$: ¿$f(${x})$?`, `$f(x)=${lin(m, n)}$: $f(${x})$؟`, `$f(x)=${lin(m, n)}$: $f(${x})$?`), [wrong(-m * x + n, 'sign'), wrong(m + x + n, 'calculation')])
}

function squareValue(random: Random) {
    const b = randomInt(random, -4, 4)
    const c = randomInt(random, -5, 5)
    const x = -randomInt(random, 1, 4)
    return build(random, 0, 'quadratic', [1, b, c, x], say(`$f(x)=${quad(1, b, c)}$: $f(${x})$?`, `$f(x)=${quad(1, b, c)}$: ¿$f(${x})$?`, `$f(x)=${quad(1, b, c)}$: $f(${x})$؟`, `$f(x)=${quad(1, b, c)}$: $f(${x})$?`), [wrong(-x * x + b * x + c, 'negative-square'), wrong(x * x - b * x + c, 'sign')])
}

function excluded(random: Random) {
    const m = pick(random, [1, 2, 3])
    const root = nonZero(random, -5, 5)
    const n = -m * root
    return build(random, 0, 'root', [m, n], say(`$\\frac{1}{${lin(m, n)}}$: zein $x$ ez dago eremuan?`, `$\\frac{1}{${lin(m, n)}}$: ¿qué $x$ no está en el dominio?`, `$\\frac{1}{${lin(m, n)}}$: أي $x$ خارج المجال؟`, `$\\frac{1}{${lin(m, n)}}$: which $x$ is not in the domain?`), [wrong(n, 'axis-swap'), wrong(-root, 'sign')])
}

/* ---------- Circuit 1: cuts and turning points ---------- */

function xCut(random: Random) {
    const m = pick(random, [-3, -2, 2, 3, 4])
    const root = nonZero(random, -4, 4)
    const n = -m * root
    return build(random, 1, 'root', [m, n], say(`$y=${lin(m, n)}$: X ardatzeko ebakiduraren $x$?`, `$y=${lin(m, n)}$: ¿$x$ del corte con el eje X?`, `$y=${lin(m, n)}$: $x$ للتقاطع مع محور X؟`, `$y=${lin(m, n)}$: $x$ where it meets the X axis?`), [wrong(n, 'axis-swap'), wrong(-root, 'sign')])
}

function yCut(random: Random) {
    const a = pick(random, [-2, -1, 1, 2])
    const b = nonZero(random, -5, 5)
    const c = nonZero(random, -7, 7)
    return build(random, 1, 'quadratic', [a, b, c, 0], say(`$y=${quad(a, b, c)}$: Y ardatzeko ebakiduraren $y$?`, `$y=${quad(a, b, c)}$: ¿$y$ del corte con el eje Y?`, `$y=${quad(a, b, c)}$: $y$ للتقاطع مع محور Y؟`, `$y=${quad(a, b, c)}$: $y$ where it meets the Y axis?`), [wrong(b, 'calculation'), wrong(a, 'calculation')])
}

function turn(random: Random) {
    const a = pick(random, [-1, 1])
    const p = nonZero(random, -4, 4)
    const c = randomInt(random, -5, 5)
    return build(random, 1, 'vertex-x', [a, -2 * a * p, c], say(`$y=${quad(a, -2 * a * p, c)}$: zein $x$ baliotan aldatzen da gorakortasuna?`, `$y=${quad(a, -2 * a * p, c)}$: ¿en qué $x$ cambia el crecimiento?`, `$y=${quad(a, -2 * a * p, c)}$: عند أي $x$ يتغيّر التزايد؟`, `$y=${quad(a, -2 * a * p, c)}$: at which $x$ does it turn?`), [wrong(-p, 'vertex-sign'), wrong(2 * p, 'vertex-no-2')])
}

/* ---------- Circuit 2: slopes and proportions ---------- */

function slope(random: Random) {
    const x1 = randomInt(random, -3, 3)
    const run = pick(random, [1, 2, 3])
    const m = nonZero(random, -4, 4)
    const y1 = randomInt(random, -4, 4)
    const x2 = x1 + run
    const y2 = y1 + m * run
    return build(random, 2, 'slope', [x1, y1, x2, y2], say(`$(${x1},${y1})$ eta $(${x2},${y2})$: malda?`, `$(${x1},${y1})$ y $(${x2},${y2})$: ¿pendiente?`, `$(${x1},${y1})$ و$(${x2},${y2})$: الميل؟`, `$(${x1},${y1})$ and $(${x2},${y2})$: slope?`), [wrong(run / (m * run), 'slope-upside-down'), wrong(-m, 'sign'), wrong(m * run, 'calculation')])
}

function ratio(random: Random) {
    const m = randomInt(random, 2, 9)
    const x = randomInt(random, 2, 8)
    return build(random, 2, 'ratio', [x, m * x], say(`Proportzionala: $x=${x}$ denean $y=${m * x}$. $m$?`, `Proporcional: si $x=${x}$, $y=${m * x}$. ¿$m$?`, `تناسب طردي: إذا $x=${x}$ فإن $y=${m * x}$. $m$؟`, `Proportional: when $x=${x}$, $y=${m * x}$. $m$?`), [wrong(m * x - x, 'calculation'), wrong(m * x + x, 'calculation')])
}

function propValue(random: Random) {
    const m = randomInt(random, 2, 6)
    const x = randomInt(random, 2, 5)
    const more = randomInt(random, 6, 12)
    return build(random, 2, 'prop-value', [x, m * x, more], say(`Proportzionala: $f(${x})=${m * x}$. $f(${more})$?`, `Proporcional: $f(${x})=${m * x}$. ¿$f(${more})$?`, `تناسب طردي: $f(${x})=${m * x}$. $f(${more})$؟`, `Proportional: $f(${x})=${m * x}$. $f(${more})$?`), [wrong(m * x + more - x, 'calculation'), wrong(m * more + m, 'calculation')])
}

/* ---------- Circuit 3: lines through a point, crossings ---------- */

function nFrom(random: Random) {
    const m = nonZero(random, -4, 4)
    const x = randomInt(random, 1, 4)
    const y = randomInt(random, -6, 8)
    return build(random, 3, 'n-from', [m, x, y], say(`$m=${m}$, $(${x},${y})$ puntutik: $n$?`, `$m=${m}$, por $(${x},${y})$: ¿$n$?`, `$m=${m}$ ويمر بـ$(${x},${y})$: $n$؟`, `$m=${m}$, through $(${x},${y})$: $n$?`), [wrong(y, 'n-as-y'), wrong(y + m * x, 'sign')])
}

function cross(random: Random) {
    const m1 = randomInt(random, 2, 5)
    const m2 = randomInt(random, -3, 1)
    const x = nonZero(random, -4, 4)
    const n1 = nonZero(random, -6, 6)
    const n2 = (m1 - m2) * x + n1
    return build(random, 3, 'cross-x', [m1, n1, m2, n2], say(`$y=${lin(m1, n1)}$ eta $y=${lin(m2, n2)}$: ebakiduraren $x$?`, `$y=${lin(m1, n1)}$ e $y=${lin(m2, n2)}$: ¿$x$ del corte?`, `$y=${lin(m1, n1)}$ و$y=${lin(m2, n2)}$: $x$ للتقاطع؟`, `$y=${lin(m1, n1)}$ and $y=${lin(m2, n2)}$: $x$ of the crossing?`), [wrong((n2 + n1) / (m1 - m2), 'cross-sign'), wrong(-x, 'sign')])
}

function taxi(random: Random) {
    const start = randomInt(random, 2, 6)
    const perKm = randomInt(random, 1, 3)
    const km = randomInt(random, 3, 12)
    return build(random, 3, 'linear', [perKm, start, km], say(`Taxia: ${start} € + ${perKm} € km-ko. ${km} km (€)?`, `Taxi: ${start} € + ${perKm} € por km. ¿${km} km (€)?`, `سيارة أجرة: $${start}$ يورو + $${perKm}$ يورو لكل كم. $${km}$ كم (يورو)؟`, `Taxi: ${start} € + ${perKm} € per km. ${km} km (€)?`), [wrong(start * km + perKm, 'calculation'), wrong(perKm * km, 'calculation')])
}

/* ---------- Circuit 4: vertices ---------- */

function vertexX(random: Random) {
    const a = pick(random, [-2, -1, 1, 2])
    const p = nonZero(random, -4, 4)
    const c = randomInt(random, -5, 5)
    return build(random, 4, 'vertex-x', [a, -2 * a * p, c], say(`$y=${quad(a, -2 * a * p, c)}$: $x_{v}$?`, `$y=${quad(a, -2 * a * p, c)}$: ¿$x_{v}$?`, `$y=${quad(a, -2 * a * p, c)}$: $x_{v}$؟`, `$y=${quad(a, -2 * a * p, c)}$: $x_{v}$?`), [wrong(-p, 'vertex-sign'), wrong(2 * p, 'vertex-no-2')])
}

function vertexY(random: Random) {
    const p = nonZero(random, -3, 3)
    const q = randomInt(random, -6, 6)
    const b = -2 * p
    const c = p * p + q
    return build(random, 4, 'vertex-y', [1, b, c], say(`$y=${quad(1, b, c)}$: $y_{v}$?`, `$y=${quad(1, b, c)}$: ¿$y_{v}$?`, `$y=${quad(1, b, c)}$: $y_{v}$؟`, `$y=${quad(1, b, c)}$: $y_{v}$?`), [wrong(-p * p + b * p + c, 'negative-square'), wrong(c, 'calculation')])
}

function bigRoot(random: Random) {
    const r1 = randomInt(random, -5, 2)
    const r2 = r1 + randomInt(random, 1, 6)
    return build(random, 4, 'root-big', [1, -(r1 + r2), r1 * r2], say(`$${quad(1, -(r1 + r2), r1 * r2)}=0$: ebazpen handiena?`, `$${quad(1, -(r1 + r2), r1 * r2)}=0$: ¿la solución mayor?`, `$${quad(1, -(r1 + r2), r1 * r2)}=0$: الحل الأكبر؟`, `$${quad(1, -(r1 + r2), r1 * r2)}=0$: the larger solution?`), [wrong(-r1, 'sign'), wrong(r1, 'calculation')])
}

type Generator = (random: Random, tier: Tier) => Functions3RaceQuestion | null

const circuitGenerators: Generator[][] = [
    [lineValue, squareValue, excluded],
    [xCut, yCut, turn],
    [slope, ratio, propValue],
    [nFrom, cross, taxi],
    [vertexX, vertexY, bigRoot]
]

export function generateFunctions3RaceQuestion(random: Random, circuit: number, tier: Tier): Functions3RaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 800; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkFunctions3PitAnswer(question: RaceQuestion<Functions3RaceError>, input: string): AnswerCheck {
    return checkAnswer(input, question.answer, question.answerForm)
}

export function functions3ParTime(circuit: number): number {
    return parTimeFor([12, 13, 14, 14, 15][circuit] ?? 13)
}

export const functions3RaceErrorTips: Record<Functions3RaceError, LocalizedText> = {
    'negative-square': say('$(-3)^{2}=9$, ez $-9$.', '$(-3)^{2}=9$, no $-9$.', '$(-3)^{2}=9$ لا $-9$.', '$(-3)^{2}=9$, not $-9$.'),
    'axis-swap': say('X ardatza: $y=0$ ebatzi.', 'Eje X: resuelve $y=0$.', 'محور X: حلّ $y=0$.', 'X axis: solve $y=0$.'),
    'slope-upside-down': say('Malda: $y$ aldaketa zati $x$ aldaketa.', 'Pendiente: cambio de $y$ entre cambio de $x$.', 'الميل: تغيّر $y$ على تغيّر $x$.', 'Slope: change in $y$ over change in $x$.'),
    'n-as-y': say('Ordezkatu puntua eta bakandu $n$.', 'Sustituye el punto y despeja $n$.', 'عوّض النقطة واعزل $n$.', 'Substitute the point and isolate $n$.'),
    'vertex-sign': same('x_{v}=\\frac{-b}{2a}'),
    'vertex-no-2': same('x_{v}=\\frac{-b}{2a}'),
    'cross-sign': say('Gaia beste aldera: zeinua aldatu.', 'Al pasar un término, cambia el signo.', 'عند نقل الحدّ تتغيّر إشارته.', 'A term that moves changes its sign.'),
    sign: say('Kontuz zeinuekin.', 'Cuidado con los signos.', 'انتبه للإشارات.', 'Watch the signs.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}
