import { checkAnswer, fraction, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { polyLatex } from '../../dbh4-akademikoak-polinomioak/polynomials.ts'
import { linearLatex } from '../lab/labTools.ts'
import { latticePoints, type HalfPlane } from '../systems.ts'

/* ==========================================================================
   Sistemen lasterketa (4. DBH akademikoak): five circuits, one per stage —
   linear systems (a point on a line, two lines that cross, a parameter
   that makes them parallel, where a line cuts the Y axis), methods
   (substitution, reduction, equalization, an equation with
   denominators), non-linear systems (sum and product, two squares, a line
   and a circle), inequalities in two unknowns (a test point, the whole
   points, a vertex, an area) and problems (heads and legs, coins, two
   numbers, a rectangle, a budget). Wrong options are typical mistakes:
   the other unknown, the sign, the other root, the axes swapped, the
   ratio upside down, subtracting instead of adding, a ± forgotten, x²
   given for x, the border left out, the area without the half, the fixed
   part forgotten, rounding up. Every question carries `meta`, the numbers
   the tests check it against: linear systems as a1x + b1y = c1, a2x + b2y
   = c2 with the unknown asked (0 for x, 1 for y).
   ========================================================================== */

export const SYSTEMS_RACE_CIRCUITS = 5

export type SystemsRaceError =
    | 'sign'
    | 'swap'
    | 'other-root'
    | 'axis-swap'
    | 'inverse'
    | 'subtract'
    | 'signs'
    | 'square'
    | 'border'
    | 'no-half'
    | 'no-fixed'
    | 'round-up'
    | 'calculation'

export type SystemsRaceQuestion = RaceQuestion<SystemsRaceError> & { meta: Record<string, number> }

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
const same = (latex: string): LocalizedText => ({ eu: `$${latex}$`, es: `$${latex}$`, ar: `$${latex}$` })
const math = (latex: string) => `$${latex}$`
const nonZero = (random: Random, min: number, max: number) => {
    const value = randomInt(random, min, max - 1)
    return value >= 0 ? value + 1 : value
}
/** k·x with the 1 left out */
const times = (value: number, letter = 'x') => (value === 1 ? letter : value === -1 ? `-${letter}` : `${value}${letter}`)
/** A number added: +3, −3, nothing for 0 */
const plus = (value: number) => (value === 0 ? '' : value < 0 ? `${value}` : `+${value}`)
const eq = (a: number, b: number, c: number) => linearLatex({ a, b, c })
/** The system as «eq1, eq2» inside a sentence */
const pair = (first: string, second: string) => `${math(first)}, ${math(second)}`

/** A value in LaTeX: a whole number or a fraction */
export function written(value: FractionValue): string {
    if (value.denominator === 1) return String(value.numerator)
    return `${value.numerator < 0 ? '-' : ''}\\frac{${Math.abs(value.numerator)}}{${value.denominator}}`
}

interface Candidate {
    value: FractionValue
    error: SystemsRaceError
}
const whole = (value: number, error: SystemsRaceError): Candidate => ({ value: fraction(Math.round(value) + 0), error })
const near = (value: number): Candidate[] => [value + 1, value - 1, value + 2, -value, value - 2].map((item) => whole(item, 'calculation'))

/** The right option and three different mistakes */
function options(random: Random, right: FractionValue, candidates: Candidate[]): RaceOption<SystemsRaceError>[] | null {
    const rightLatex = written(right)
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: SystemsRaceError }> = []
    for (const candidate of candidates) {
        if (wrong.length === 3) break
        if (!Number.isFinite(candidate.value.numerator / candidate.value.denominator)) continue
        const latex = written(candidate.value)
        if (latex === '-0' || used.has(latex)) continue
        used.add(latex)
        wrong.push({ latex, error: candidate.error })
    }
    if (wrong.length < 3) return null
    return shuffle(random, [{ latex: rightLatex, correct: true, error: null }, ...wrong.map((item) => ({ latex: item.latex, correct: false, error: item.error }))])
}

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<SystemsRaceError>[], answer: FractionValue, solution: LocalizedText, meta: Record<string, number>): SystemsRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution, meta }
}

/** «Solve the system …: how much is x/y?» */
const solveFor = (system: string, unknown: 'x' | 'y') => say(`Ebatzi ${system}. Zenbat da ${unknown}?`, `Resuelve ${system}. ¿Cuánto vale ${unknown}?`, `حل ${system}. كم تساوي ${unknown}؟`)
/** Meta of a linear system with the unknown asked */
const linearMeta = (a1: number, b1: number, c1: number, a2: number, b2: number, c2: number, ask: 0 | 1) => ({ a1, b1, c1, a2, b2, c2, ask })

/* ---------- Circuit 0: linear systems ---------- */

function pointQuestion(random: Random, tier: Tier): SystemsRaceQuestion | null {
    const a = nonZero(random, -5, 5)
    const b = tier === 0 ? pick(random, [1, -1]) : nonZero(random, -4, 4)
    const x = randomInt(random, -4, 4)
    const k = randomInt(random, -6, 6)
    const c = a * x + b * k
    const choices = options(random, fraction(k), [whole(-k, 'sign'), whole(c - a * x, 'calculation'), whole(c + a * x, 'sign'), ...near(k)])
    return choices && build(0, 'point', say(
        `$(${x},k)$ bikotea ${math(eq(a, b, c))} ekuazioaren ebazpena da. Zenbat da k?`,
        `$(${x},k)$ es solución de ${math(eq(a, b, c))}. ¿Cuánto vale k?`,
        `$(${x},k)$ حل للمعادلة ${math(eq(a, b, c))}. كم تساوي k؟`
    ), choices, fraction(k), same(`${a * x}${b === 1 ? '+k' : b === -1 ? '-k' : `${plus(b)}\\cdot k`}=${c}\\ \\to\\ k=${k}`), { a, b, c, x })
}

function crossQuestion(random: Random): SystemsRaceQuestion | null {
    const x = randomInt(random, -6, 6)
    const y = randomInt(random, -6, 6)
    if (x === y || x === -y) return null
    const ask = randomInt(random, 0, 1) as 0 | 1
    const value = ask === 0 ? x : y
    const choices = options(random, fraction(value), [whole(ask === 0 ? y : x, 'swap'), whole(-value, 'sign'), ...near(value)])
    return choices && build(0, 'cross', solveFor(pair(eq(1, 1, x + y), eq(1, -1, x - y)), ask === 0 ? 'x' : 'y'), choices, fraction(value), same(`2x=${2 * x}\\ \\to\\ x=${x},\\ y=${y}`), linearMeta(1, 1, x + y, 1, -1, x - y, ask))
}

function parameterQuestion(random: Random, tier: Tier): SystemsRaceQuestion | null {
    const a = randomInt(random, 1, 3)
    const b = nonZero(random, -4, 4)
    const factor = tier === 0 ? 2 : pick(random, [2, 3, -2])
    const c = randomInt(random, 1, 9)
    const m = b * factor
    const c2 = c * factor + randomInt(random, 1, 3)
    const choices = options(random, fraction(m), [{ value: fraction(b, factor), error: 'inverse' }, whole(-m, 'sign'), whole(b + factor, 'calculation'), ...near(m)])
    return choices && build(0, 'parameter', say(
        `m-ren zein baliotarako da bateraezina ${pair(eq(a, b, c), `${a * factor}x+my=${c2}`)} sistema?`,
        `¿Para qué valor de m es incompatible el sistema ${pair(eq(a, b, c), `${a * factor}x+my=${c2}`)}?`,
        `لأي قيمة لـ m يكون النظام ${pair(eq(a, b, c), `${a * factor}x+my=${c2}`)} غير متوافق؟`
    ), choices, fraction(m), same(`\\frac{${a}}{${a * factor}}=\\frac{${b}}{m}\\ \\to\\ m=${m}`), { a, b, c, factor, c2 })
}

function axisQuestion(random: Random): SystemsRaceQuestion | null {
    const a = nonZero(random, -5, 5)
    const b = nonZero(random, -5, 5)
    const y = randomInt(random, -6, 6)
    const c = b * y
    if (c === 0 || c % a !== 0 || Math.abs(a) === Math.abs(b)) return null
    const choices = options(random, fraction(y), [whole(c / a, 'axis-swap'), whole(-y, 'sign'), whole(c, 'calculation'), ...near(y)])
    return choices && build(0, 'axis', say(
        `Non ebakitzen du ${math(eq(a, b, c))} zuzenak Y ardatza? Eman y.`,
        `¿Dónde corta la recta ${math(eq(a, b, c))} al eje Y? Da la y.`,
        `أين يقطع المستقيم ${math(eq(a, b, c))} المحور Y؟ أعطِ y.`
    ), choices, fraction(y), same(`x=0\\ \\to\\ ${times(b, 'y')}=${c}\\ \\to\\ y=${y}`), { a, b, c })
}

/* ---------- Circuit 1: methods ---------- */

function substitutionQuestion(random: Random, tier: Tier): SystemsRaceQuestion | null {
    const x = randomInt(random, -5, 6)
    const y = randomInt(random, -5, 6)
    const b1 = nonZero(random, -4, 4)
    const a2 = nonZero(random, -4, 4)
    const b2 = tier === 0 ? 1 : nonZero(random, -4, 4)
    if (x === y || a2 * b1 === b2) return null
    const value = y
    const choices = options(random, fraction(value), [whole(x, 'swap'), whole(-value, 'sign'), ...near(value)])
    return choices && build(1, 'substitution', solveFor(pair(eq(1, b1, x + b1 * y), eq(a2, b2, a2 * x + b2 * y)), 'y'), choices, fraction(value), same(`x=${x + b1 * y}${-b1 > 0 ? '+' : ''}${times(-b1, 'y')}\\ \\to\\ y=${y}`), linearMeta(1, b1, x + b1 * y, a2, b2, a2 * x + b2 * y, 1))
}

function reductionQuestion(random: Random, tier: Tier): SystemsRaceQuestion | null {
    const x = randomInt(random, -5, 6)
    const y = randomInt(random, -5, 6)
    const a1 = randomInt(random, 1, 5)
    const a2 = randomInt(random, 1, 5)
    const b = randomInt(random, 1, tier === 0 ? 3 : 6)
    if (x === y || a1 === a2) return null
    const c1 = a1 * x + b * y
    const c2 = a2 * x - b * y
    const candidates: Candidate[] = [whole(y, 'swap')]
    if ((c1 - c2) % (a1 - a2) === 0) candidates.push(whole((c1 - c2) / (a1 - a2), 'subtract'))
    const choices = options(random, fraction(x), [...candidates, whole(-x, 'sign'), ...near(x)])
    return choices && build(1, 'reduction', solveFor(pair(eq(a1, b, c1), eq(a2, -b, c2)), 'x'), choices, fraction(x), same(`${a1 + a2}x=${c1 + c2}\\ \\to\\ x=${x}`), linearMeta(a1, b, c1, a2, -b, c2, 0))
}

function equalizationQuestion(random: Random): SystemsRaceQuestion | null {
    const x = randomInt(random, -5, 5)
    const m1 = nonZero(random, -4, 4)
    const m2 = nonZero(random, -4, 4)
    const n1 = randomInt(random, -8, 8)
    if (m1 === m2) return null
    const y = m1 * x + n1
    const n2 = y - m2 * x
    if (x === y) return null
    const line = (m: number, n: number) => `y=${times(m)}${plus(n)}`
    const choices = options(random, fraction(x), [whole(y, 'swap'), whole(-x, 'sign'), ...near(x)])
    return choices && build(1, 'equalization', solveFor(pair(line(m1, n1), line(m2, n2)), 'x'), choices, fraction(x), same(`${times(m1)}${plus(n1)}=${times(m2)}${plus(n2)}\\ \\to\\ x=${x}`), linearMeta(-m1, 1, n1, -m2, 1, n2, 0))
}

function denominatorsQuestion(random: Random): SystemsRaceQuestion | null {
    const p = pick(random, [2, 3, 4])
    const q = pick(random, [2, 3, 5])
    if (p === q) return null
    const x = p * randomInt(random, -3, 3)
    const y = q * randomInt(random, -3, 3)
    if (x === y) return null
    const s = x / p + y / q
    const d = x - y
    const choices = options(random, fraction(x), [whole(y, 'swap'), whole(-x, 'sign'), whole(x / p, 'calculation'), ...near(x)])
    return choices && build(1, 'denominators', solveFor(pair(`\\frac{x}{${p}}+\\frac{y}{${q}}=${s}`, eq(1, -1, d)), 'x'), choices, fraction(x), same(`${q}x+${p}y=${p * q * s}\\ \\to\\ x=${x}`), linearMeta(q, p, p * q * s, 1, -1, d, 0))
}

/* ---------- Circuit 2: non-linear systems ---------- */

function sumProductQuestion(random: Random): SystemsRaceQuestion | null {
    const r = randomInt(random, -6, 8)
    const s = randomInt(random, r + 1, 9)
    const choices = options(random, fraction(s), [whole(r, 'other-root'), whole(-s, 'sign'), whole(r + s, 'calculation'), ...near(s)])
    return choices && build(2, 'sum-product', say(
        `Ebatzi ${pair(`x+y=${r + s}`, `xy=${r * s}`)}. Zein da x-ren baliorik handiena?`,
        `Resuelve ${pair(`x+y=${r + s}`, `xy=${r * s}`)}. ¿Cuál es el mayor valor de x?`,
        `حل ${pair(`x+y=${r + s}`, `xy=${r * s}`)}. ما أكبر قيمة لـ x؟`
    ), choices, fraction(s), same(`${polyLatex([1, -(r + s), r * s])}=0\\ \\to\\ x=${r},\\ x=${s}`), { r, s })
}

function squaresCountQuestion(random: Random): SystemsRaceQuestion | null {
    const x2 = pick(random, [-4, -1, 0, 1, 4, 9, 16, 25])
    const y2 = pick(random, [-4, -1, 0, 1, 4, 9, 16])
    const A = x2 + y2
    const B = x2 - y2
    if (A <= 0) return null
    const roots = (square: number) => (square < 0 ? 0 : square === 0 ? 1 : 2)
    const count = roots(x2) * roots(y2)
    const candidates: Candidate[] = []
    if (count === 4) candidates.push(whole(2, 'signs'), whole(1, 'signs'))
    if (count === 2) candidates.push(whole(4, 'signs'), whole(1, 'signs'))
    if (count === 0) candidates.push(whole(2, 'signs'), whole(4, 'calculation'))
    if (count === 1) candidates.push(whole(2, 'signs'), whole(4, 'signs'))
    const choices = options(random, fraction(count), [...candidates, ...[0, 1, 2, 3, 4].map((value) => whole(value, 'calculation'))])
    return choices && build(2, 'squares-count', say(
        `Zenbat ebazpen ditu ${pair(`x^{2}+y^{2}=${A}`, `x^{2}-y^{2}=${B}`)} sistemak?`,
        `¿Cuántas soluciones tiene el sistema ${pair(`x^{2}+y^{2}=${A}`, `x^{2}-y^{2}=${B}`)}?`,
        `كم حلًّا للنظام ${pair(`x^{2}+y^{2}=${A}`, `x^{2}-y^{2}=${B}`)}؟`
    ), choices, fraction(count), same(`x^{2}=${x2},\\ y^{2}=${y2}`), { A, B })
}

function squaresValueQuestion(random: Random): SystemsRaceQuestion | null {
    const x = randomInt(random, 1, 7)
    const y = randomInt(random, 1, 7)
    if (x === y) return null
    const A = x * x + y * y
    const B = x * x - y * y
    const choices = options(random, fraction(x), [whole(x * x, 'square'), whole(y, 'swap'), whole(-x, 'sign'), ...near(x)])
    return choices && build(2, 'squares-value', say(
        `Ebatzi ${pair(`x^{2}+y^{2}=${A}`, `x^{2}-y^{2}=${B}`)}. Eman x positiboa.`,
        `Resuelve ${pair(`x^{2}+y^{2}=${A}`, `x^{2}-y^{2}=${B}`)}. Da la x positiva.`,
        `حل ${pair(`x^{2}+y^{2}=${A}`, `x^{2}-y^{2}=${B}`)}. أعطِ x الموجبة.`
    ), choices, fraction(x), same(`2x^{2}=${A + B}\\ \\to\\ x^{2}=${x * x}\\ \\to\\ x=\\pm ${x}`), { A, B })
}

function lineCircleQuestion(random: Random, tier: Tier): SystemsRaceQuestion | null {
    const a = randomInt(random, 1, tier === 0 ? 5 : 8)
    const b = randomInt(random, a + 1, tier === 0 ? 6 : 9)
    const choices = options(random, fraction(b), [whole(a, 'other-root'), whole(b * b, 'square'), whole(-b, 'sign'), ...near(b)])
    return choices && build(2, 'line-circle', say(
        `Ebatzi ${pair(`x^{2}+y^{2}=${a * a + b * b}`, `x+y=${a + b}`)}. Zein da x-ren baliorik handiena?`,
        `Resuelve ${pair(`x^{2}+y^{2}=${a * a + b * b}`, `x+y=${a + b}`)}. ¿Cuál es el mayor valor de x?`,
        `حل ${pair(`x^{2}+y^{2}=${a * a + b * b}`, `x+y=${a + b}`)}. ما أكبر قيمة لـ x؟`
    ), choices, fraction(b), same(`x^{2}+(${a + b}-x)^{2}=${a * a + b * b}\\ \\to\\ x=${a},\\ x=${b}`), { a, b })
}

/* ---------- Circuit 3: inequalities in two unknowns ---------- */

const leq = (a: number, b: number, c: number) => linearLatex({ a, b, c }, '\\le ')

function testPointQuestion(random: Random): SystemsRaceQuestion | null {
    const a = nonZero(random, -5, 5)
    const b = nonZero(random, -5, 5)
    const p = randomInt(random, -4, 4)
    const q = randomInt(random, -4, 4)
    const value = a * p + b * q
    const choices = options(random, fraction(value), [whole(a * p - b * q, 'sign'), whole(a * q + b * p, 'swap'), ...near(value)])
    return choices && build(3, 'test-point', say(
        `Zein da c-ren balio osorik txikiena $(${p},${q})$ puntuak ${math(linearLatex({ a, b, c: 0 }, '\\le ').replace(/0$/, 'c'))} bete dezan?`,
        `¿Cuál es el menor valor entero de c para que $(${p},${q})$ cumpla ${math(linearLatex({ a, b, c: 0 }, '\\le ').replace(/0$/, 'c'))}?`,
        `ما أصغر قيمة صحيحة لـ c لكي تحقق $(${p},${q})$ المتراجحة ${math(linearLatex({ a, b, c: 0 }, '\\le ').replace(/0$/, 'c'))}؟`
    ), choices, fraction(value), same(`${a}\\cdot(${p})+${b < 0 ? `(${b})` : b}\\cdot(${q})=${value}\\le c`), { a, b, p, q })
}

const triangle = (a: number, b: number, c: number): HalfPlane[] => [{ a, b, c, sense: '≤' }, { a: 1, b: 0, c: 0, sense: '≥' }, { a: 0, b: 1, c: 0, sense: '≥' }]
const BOX = { xMin: 0, xMax: 20, yMin: 0, yMax: 20 }

function latticeQuestion(random: Random, tier: Tier): SystemsRaceQuestion | null {
    const a = tier === 0 ? 1 : randomInt(random, 1, 3)
    const b = tier === 0 ? 1 : randomInt(random, 1, 3)
    const c = randomInt(random, 2, tier === 0 ? 5 : 8)
    const count = latticePoints(BOX, triangle(a, b, c)).length
    // Column by column: how many y for each x
    const columns = Array.from({ length: Math.floor(c / a) + 1 }, (_, x) => Math.floor((c - a * x) / b) + 1)
    const inside = latticePoints(BOX, [{ a, b, c, sense: '<' }, { a: 1, b: 0, c: 0, sense: '>' }, { a: 0, b: 1, c: 0, sense: '>' }]).length
    const choices = options(random, fraction(count), [whole(inside, 'border'), whole(count - c - 1, 'border'), ...near(count)])
    const region = `x\\ge 0,\\ y\\ge 0,\\ ${leq(a, b, c)}`
    return choices && build(3, 'lattice', say(
        `${math(region)}. Zenbat puntu ditu eskualdeak koordenatu osoekin?`,
        `${math(region)}. ¿Cuántos puntos de coordenadas enteras tiene la región?`,
        `${math(region)}. كم نقطة إحداثياتها صحيحة في المنطقة؟`
    ), choices, fraction(count), same(`${columns.join('+')}=${count}`), { a, b, c })
}

function vertexQuestion(random: Random): SystemsRaceQuestion | null {
    const a = randomInt(random, 1, 6)
    const b = randomInt(random, 1, 6)
    const x = randomInt(random, 1, 8)
    const c = a * x
    if (a === b || c % b !== 0) return null
    const choices = options(random, fraction(x), [whole(c / b, 'axis-swap'), whole(c, 'calculation'), ...near(x)])
    const region = `x\\ge 0,\\ y\\ge 0,\\ ${leq(a, b, c)}`
    return choices && build(3, 'vertex', say(
        `${math(region)}. Eskualdearen erpin bat X ardatzean dago. Zein da haren x?`,
        `${math(region)}. La región tiene un vértice en el eje X. ¿Cuál es su x?`,
        `${math(region)}. للمنطقة رأس على المحور X. ما قيمة x فيه؟`
    ), choices, fraction(x), same(`y=0\\ \\to\\ ${times(a)}=${c}\\ \\to\\ x=${x}`), { a, b, c })
}

function areaQuestion(random: Random): SystemsRaceQuestion | null {
    const p = randomInt(random, 1, 8)
    const q = randomInt(random, 1, 8)
    // x/p + y/q ≤ 1 written as qx + py ≤ pq
    const area = fraction(p * q, 2)
    const choices = options(random, area, [whole(p * q, 'no-half'), whole(p + q, 'calculation'), { value: fraction(p * q + 1, 2), error: 'calculation' }, { value: fraction(p * q - 1, 2), error: 'calculation' }])
    const region = `x\\ge 0,\\ y\\ge 0,\\ ${leq(q, p, p * q)}`
    return choices && build(3, 'area', say(
        `${math(region)}. Zenbat da eskualdearen azalera?`,
        `${math(region)}. ¿Cuánto vale el área de la región?`,
        `${math(region)}. كم مساحة المنطقة؟`
    ), choices, area, same(`\\frac{${p}\\cdot ${q}}{2}=${written(area)}`), { a: q, b: p, c: p * q })
}

/* ---------- Circuit 4: problems ---------- */

function headsLegsQuestion(random: Random): SystemsRaceQuestion | null {
    const hens = randomInt(random, 2, 30)
    const rabbits = randomInt(random, 2, 30)
    if (hens === rabbits) return null
    const heads = hens + rabbits
    const legs = 2 * hens + 4 * rabbits
    const choices = options(random, fraction(rabbits), [whole(hens, 'swap'), whole(legs / 4, 'calculation'), ...near(rabbits)])
    return choices && build(4, 'heads-legs', say(
        `Baserri batean oiloak eta untxiak daude: ${heads} buru eta ${legs} hanka. Zenbat untxi daude?`,
        `En una granja hay gallinas y conejos: ${heads} cabezas y ${legs} patas. ¿Cuántos conejos hay?`,
        `في مزرعة دجاج وأرانب: ${heads} رأسًا و${legs} رجلًا. كم أرنبًا هناك؟`
    ), choices, fraction(rabbits), same(`2y=${legs}-2\\cdot ${heads}=${2 * rabbits}\\ \\to\\ y=${rabbits}`), linearMeta(1, 1, heads, 2, 4, legs, 1))
}

function coinsQuestion(random: Random): SystemsRaceQuestion | null {
    const [low, high] = pick(random, [[1, 2], [2, 5], [5, 10], [10, 20]] as const)
    const lows = randomInt(random, 2, 20)
    const highs = randomInt(random, 2, 20)
    if (lows === highs) return null
    const count = lows + highs
    const total = low * lows + high * highs
    const choices = options(random, fraction(highs), [whole(lows, 'swap'), ...near(highs)])
    return choices && build(4, 'coins', say(
        `${low} eta ${high} euroko ${count} txanpon edo billetek ${total} € egiten dute. Zenbat dira ${high} eurokoak?`,
        `${count} monedas o billetes de ${low} € y de ${high} € suman ${total} €. ¿Cuántos son de ${high} €?`,
        `${count} قطعة نقدية أو ورقة من فئتي ${low} € و${high} € مجموعها ${total} €. كم منها من فئة ${high} €؟`
    ), choices, fraction(highs), same(`${times(high - low, 'y')}=${total}-${low}\\cdot ${count}=${(high - low) * highs}\\ \\to\\ y=${highs}`), linearMeta(1, 1, count, low, high, total, 1))
}

function numbersQuestion(random: Random): SystemsRaceQuestion | null {
    const y = randomInt(random, 1, 15)
    const x = randomInt(random, y + 1, 20)
    const sum = x + y
    const difference = x * x - y * y
    const choices = options(random, fraction(x), [whole(y, 'other-root'), whole(x - y, 'calculation'), ...near(x)])
    return choices && build(4, 'numbers', say(
        `Bi zenbakiren batura ${sum} da eta haien karratuen kendura ${difference}. Zein da handiena?`,
        `Dos números suman ${sum} y la diferencia de sus cuadrados es ${difference}. ¿Cuál es el mayor?`,
        `عددان مجموعهما ${sum} والفرق بين مربعيهما ${difference}. ما أكبرهما؟`
    ), choices, fraction(x), same(`x-y=\\frac{${difference}}{${sum}}=${x - y}\\qquad x=\\frac{${sum}+${x - y}}{2}=${x}`), { sum, difference })
}

function rectangleQuestion(random: Random): SystemsRaceQuestion | null {
    const short = randomInt(random, 2, 9)
    const long = randomInt(random, short + 1, 14)
    const perimeter = 2 * (short + long)
    const area = short * long
    const choices = options(random, fraction(long), [whole(short, 'other-root'), whole(short + long, 'calculation'), ...near(long)])
    return choices && build(4, 'rectangle', say(
        `Laukizuzen baten perimetroa ${perimeter} cm da eta azalera ${area} cm². Zenbat neurtzen du alderik luzeenak (cm)?`,
        `Un rectángulo tiene ${perimeter} cm de perímetro y ${area} cm² de área. ¿Cuánto mide el lado mayor (cm)?`,
        `مستطيل محيطه ${perimeter} سم ومساحته ${area} سم². كم طول ضلعه الأكبر (سم)؟`
    ), choices, fraction(long), same(`x+y=${short + long},\\ xy=${area}\\ \\to\\ ${short},\\ ${long}`), { perimeter, area })
}

function budgetQuestion(random: Random): SystemsRaceQuestion | null {
    const p = randomInt(random, 2, 5)
    const q = randomInt(random, 1, 4)
    const budget = randomInt(random, 10, 30)
    const answer = Math.floor((budget - p) / q)
    if (answer < 1) return null
    const candidates: Candidate[] = [whole(Math.floor(budget / q), 'no-fixed')]
    if ((budget - p) % q !== 0) candidates.push(whole(answer + 1, 'round-up'))
    const choices = options(random, fraction(answer), [...candidates, ...near(answer)])
    return choices && build(4, 'budget', say(
        `${budget} € dituzu ${p} €-ko ogitartekoak eta ${q} €-ko freskagarriak erosteko, eta ogitarteko bat gutxienez nahi duzu. Gehienez zenbat freskagarri?`,
        `Tienes ${budget} € para bocadillos de ${p} € y refrescos de ${q} €, y quieres al menos un bocadillo. ¿Cuántos refrescos como máximo?`,
        `معك ${budget} € لشطائر بـ${p} € ومشروبات بـ${q} €، وتريد شطيرة على الأقل. كم مشروبًا على الأكثر؟`
    ), choices, fraction(answer), same(`${p}+${times(q, 'y')}\\le ${budget}\\ \\to\\ y\\le ${written(fraction(budget - p, q))}`), { p, q, budget })
}

type Generator = (random: Random, tier: Tier) => SystemsRaceQuestion | null

const circuitGenerators: Generator[][] = [
    [pointQuestion, crossQuestion, parameterQuestion, axisQuestion],
    [substitutionQuestion, reductionQuestion, equalizationQuestion, denominatorsQuestion],
    [sumProductQuestion, squaresCountQuestion, squaresValueQuestion, lineCircleQuestion],
    [testPointQuestion, latticeQuestion, vertexQuestion, areaQuestion],
    [headsLegsQuestion, coinsQuestion, numbersQuestion, rectangleQuestion, budgetQuestion]
]

export function generateSystemsRaceQuestion(random: Random, circuit: number, tier: Tier): SystemsRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkSystemsPitAnswer(question: RaceQuestion<SystemsRaceError>, input: string): AnswerCheck {
    return checkAnswer(input, question.answer, question.answerForm)
}

export function systemsParTime(circuit: number): number {
    return parTimeFor([12, 13, 13, 13, 13][circuit] ?? 13)
}

export const systemsRaceErrorTips: Record<SystemsRaceError, LocalizedText> = {
    sign: say('Kontuz zeinuarekin: negatiboak parentesi artean, eta pasatzean zeinua aldatu.', 'Cuidado con el signo: los negativos, entre paréntesis, y al pasar de lado cambia el signo.', 'انتبه للإشارة: السالب بين قوسين، وعند النقل تتغير الإشارة.'),
    swap: say('Hori beste ezezaguna da: begiratu x ala y eskatzen den.', 'Esa es la otra incógnita: mira si se pide x o y.', 'هذا هو المجهول الآخر: انظر هل المطلوب x أم y.'),
    'other-root': say('Bi balio ateratzen dira: begiratu zein eskatzen den.', 'Salen dos valores: mira cuál se pide.', 'تظهر قيمتان: انظر أيهما المطلوب.'),
    'axis-swap': say('Y ardatzean x = 0; X ardatzean y = 0.', 'En el eje Y, x = 0; en el eje X, y = 0.', 'على المحور Y يكون x = 0؛ وعلى المحور X يكون y = 0.'),
    inverse: say('a/a′ = b/b′: koefizienteak ordena berean jarri.', 'a/a′ = b/b′: pon los coeficientes en el mismo orden.', 'a/a′ = b/b′: ضع المعاملات بالترتيب نفسه.'),
    subtract: say('Koefizienteak aurkakoak direnean, batu; berdinak direnean, kendu.', 'Si los coeficientes son opuestos, suma; si son iguales, resta.', 'إذا كان المعاملان متعاكسين فاجمع؛ وإذا كانا متساويين فاطرح.'),
    signs: say('x² = k positiboak bi balio ematen ditu, ±√k, eta zeinu guztiak konbinatzen dira.', 'Un x² = k positivo da dos valores, ±√k, y se combinan todos los signos.', 'x² = k الموجب يعطي قيمتين ±√k، وتُجمع كل الإشارات.'),
    square: say('Hori x² da: atera erro karratua.', 'Eso es x²: saca la raíz cuadrada.', 'هذا x²: خذ الجذر التربيعي.'),
    border: say('≤ bada, ertzeko puntuak ere badaude, ardatzetakoak barne.', 'Con ≤ también cuentan los puntos del borde, los de los ejes incluidos.', 'مع ≤ تُعدّ نقاط الحدود أيضًا، ومنها نقاط المحورين.'),
    'no-half': say('Triangeluaren azalera: oinarria bider altuera, zati 2.', 'Área del triángulo: base por altura, entre 2.', 'مساحة المثلث: القاعدة في الارتفاع على 2.'),
    'no-fixed': say('Lehenik kendu derrigorrezko ogitartekoa.', 'Primero resta el bocadillo obligatorio.', 'اطرح أولًا ثمن الشطيرة الإلزامية.'),
    'round-up': say('«Gehienez» bada, biribildu behera.', 'Si es «como máximo», redondea hacia abajo.', 'إذا كان «على الأكثر» فقرّب إلى الأسفل.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.')
}
