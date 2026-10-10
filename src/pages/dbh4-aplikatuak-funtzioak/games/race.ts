import { checkAnswer, fraction, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import type { GraphSpec, Point } from '../../dbh2-funtzioak-v2/functions.ts'
import { written } from '../../dbh2-gorputzak-v2/games/race.ts'
import { smoothThrough } from '../functions.ts'

/* ==========================================================================
   Funtzioen lasterketa (4. DBH aplikatuak): five circuits, one per stage —
   concept (an image, a fare, an x with a given image), domain and
   intercepts (the excluded x of a fraction, where a root starts, the cuts
   with the axes), growth (the T.V.M., an average speed, an extreme read on
   a graph), properties (a periodic value far away, a parking that charges
   every hour started, halving) and studying functions (a value read on a
   graph with its scale, the box made from a card, a T.V.M. read on a
   graph). Wrong options are typical mistakes: −k² instead of (−k)², the
   fixed part forgotten, not dividing by b − a, the hour not rounded up…
   Every question carries `meta`, the numbers the tests check it against.
   ========================================================================== */

export const FUNCTIONS_RACE_CIRCUITS = 5

export type FunctionsRaceError =
    | 'sign-square'
    | 'sign'
    | 'no-fixed'
    | 'image-instead'
    | 'numerator-zero'
    | 'sign-flip'
    | 'value-at-one'
    | 'y-intercept'
    | 'no-divide'
    | 'order'
    | 'total'
    | 'y-instead'
    | 'wrong-extreme'
    | 'wrong-rest'
    | 'no-round-up'
    | 'half-once'
    | 'squares'
    | 'one-cut'
    | 'no-height'
    | 'calculation'

export type FunctionsRaceQuestion = RaceQuestion<FunctionsRaceError> & { meta: Record<string, number | number[]>; graph?: GraphSpec }

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
const same = (latex: string): LocalizedText => ({ eu: `$${latex}$`, es: `$${latex}$`, ar: `$${latex.replace(/\{,\}/g, '.')}$` })
const math = (latex: string) => `$${latex}$`
const exact = (value: number) => fraction(Math.round(value * 1000), 1000)
const tex = (value: number) => written(exact(value)) ?? String(value)
/** A negative number in brackets, for substitutions */
const br = (value: number) => (value < 0 ? `(${tex(value)})` : tex(value))
const signedRandom = (random: Random, min: number, max: number) => randomInt(random, min, max) * (random() < 0.5 ? -1 : 1)

/** ax² + bx + c written as a textbook does */
export function polyLatex(a: number, b: number, c: number): string {
    const term = (coefficient: number, power: string, first: boolean) => {
        if (coefficient === 0) return ''
        const sign = coefficient < 0 ? '-' : first ? '' : '+'
        const size = Math.abs(coefficient)
        return `${sign}${size === 1 && power ? '' : tex(size)}${power}`
    }
    const out = term(a, 'x^{2}', true) + term(b, 'x', a === 0) + term(c, '', a === 0 && b === 0)
    return out || '0'
}

interface Candidate {
    value: number
    error: FunctionsRaceError
}

/** The right option and three different mistakes, each exact with at most two decimals */
function options(random: Random, right: number, candidates: Candidate[]): RaceOption<FunctionsRaceError>[] | null {
    const rightLatex = written(exact(right))
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: FunctionsRaceError }> = []
    for (const candidate of candidates) {
        if (wrong.length === 3) break
        if (!Number.isFinite(candidate.value)) continue
        const latex = written(exact(candidate.value))
        if (latex === null || used.has(latex)) continue
        used.add(latex)
        wrong.push({ latex, error: candidate.error })
    }
    if (wrong.length < 3) return null
    return shuffle(random, [{ latex: rightLatex, correct: true, error: null }, ...wrong.map((item) => ({ latex: item.latex, correct: false, error: item.error }))])
}

const near = (value: number, step = 1): Candidate[] => [value + step, value - step, value + 2 * step, value - 2 * step, value * 2 + step].map((item) => ({ value: item, error: 'calculation' as const }))

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<FunctionsRaceError>[], answer: number, solution: LocalizedText, meta: Record<string, number | number[]>, graph?: GraphSpec): FunctionsRaceQuestion {
    const value: FractionValue = exact(answer)
    return { circuit, kind, prompt, options: choices, answer: value, answerForm: 'any', percentAnswer: false, writable: true, solution, meta, ...(graph ? { graph } : {}) }
}

/* ---------- Circuit 0: concept ---------- */

function evaluateQuestion(random: Random, tier: Tier): FunctionsRaceQuestion | null {
    const a = pick(random, tier === 0 ? [1] : tier === 1 ? [1, 2, -1] : [2, 3, -2])
    const b = randomInt(random, -5, 5)
    const c = randomInt(random, -6, 6)
    const k = tier === 0 ? signedRandom(random, 1, 3) : randomInt(random, -4, -1)
    const answer = a * k * k + b * k + c
    const choices = options(random, answer, [{ value: -a * k * k + b * k + c, error: 'sign-square' }, { value: a * k * k - b * k + c, error: 'sign' }, ...near(answer)])
    return choices && build(0, 'evaluate', say(
        `${math(`f(x)=${polyLatex(a, b, c)}`)} bada, zenbat da ${math(`f(${k})`)}?`,
        `Si ${math(`f(x)=${polyLatex(a, b, c)}`)}, ¿cuánto vale ${math(`f(${k})`)}?`,
        `إذا كانت ${math(`f(x)=${polyLatex(a, b, c)}`)} فكم تساوي ${math(`f(${k})`)}؟`
    ), choices, answer, same(`${br(k)}^{2}=${k * k}\\to f(${k})=${tex(answer)}`), { a, b, c, k })
}

function fareQuestion(random: Random, tier: Tier): FunctionsRaceQuestion | null {
    const fixed = pick(random, tier === 0 ? [1, 2, 3] : [1.5, 2.5, 2.2, 3.5])
    const rate = pick(random, tier === 0 ? [1, 2] : [0.5, 0.75, 1.2, 1.5])
    const km = randomInt(random, 3, tier === 2 ? 25 : 12)
    const answer = rate * km + fixed
    const choices = options(random, answer, [{ value: rate * km, error: 'no-fixed' }, { value: (rate + fixed) * km, error: 'calculation' }, ...near(answer)])
    return choices && build(0, 'fare', say(
        `Taxi batek ${math(`y=${tex(rate)}x+${tex(fixed)}`)} kobratzen du (${math('x')} km, ${math('y')} €). Zenbat balio du ${math(String(km))} km-ko bidaiak?`,
        `Un taxi cobra ${math(`y=${tex(rate)}x+${tex(fixed)}`)} (${math('x')} en km, ${math('y')} en €). ¿Cuánto cuesta un viaje de ${math(String(km))} km?`,
        `تأخذ سيارة أجرة ${math(`y=${tex(rate)}x+${tex(fixed)}`)} (${math('x')} بالكيلومتر و${math('y')} باليورو). كم تكلف رحلة ${math(String(km))} كم؟`
    ), choices, answer, same(`${tex(rate)}\\cdot ${km}+${tex(fixed)}=${tex(answer)}`), { rate, fixed, km })
}

function preimageQuestion(random: Random, tier: Tier): FunctionsRaceQuestion | null {
    const m = pick(random, tier === 0 ? [2, 3, 4] : [2, 3, 5, -2, -3])
    const n = randomInt(random, -8, 8)
    const x = randomInt(random, tier === 0 ? 1 : -5, 8)
    const value = m * x + n
    const choices = options(random, x, [{ value: m * value + n, error: 'image-instead' }, { value: (value + n) / m, error: 'sign' }, ...near(x)])
    return choices && build(0, 'preimage', say(
        `${math(`f(x)=${polyLatex(0, m, n)}`)} funtzioan, zein ${math('x')}-k du ${math(String(value))} irudia?`,
        `En ${math(`f(x)=${polyLatex(0, m, n)}`)}, ¿qué ${math('x')} tiene imagen ${math(String(value))}?`,
        `في ${math(`f(x)=${polyLatex(0, m, n)}`)}، ما قيمة ${math('x')} التي صورتها ${math(String(value))}؟`
    ), choices, x, same(`${polyLatex(0, m, n)}=${value}\\to x=${x}`), { m, n, value })
}

/* ---------- Circuit 1: domain and intercepts ---------- */

function excludedQuestion(random: Random): FunctionsRaceQuestion | null {
    const p = randomInt(random, 1, 6)
    const q = signedRandom(random, 1, 6)
    if (q === -p) return null
    const choices = options(random, q, [{ value: -p, error: 'numerator-zero' }, { value: -q, error: 'sign-flip' }, ...near(q)])
    const fractionTex = `y=\\frac{x+${p}}{${polyLatex(0, 1, -q)}}`
    return choices && build(1, 'excluded', say(
        `Zein ${math('x')} ez dago ${math(fractionTex)} funtzioaren izate-eremuan?`,
        `¿Qué ${math('x')} no está en el dominio de ${math(fractionTex)}?`,
        `ما قيمة ${math('x')} التي ليست في مجال ${math(fractionTex)}؟`
    ), choices, q, same(`${polyLatex(0, 1, -q)}=0\\to x=${q}`), { p, q })
}

function rootQuestion(random: Random, tier: Tier): FunctionsRaceQuestion | null {
    const k = pick(random, tier === 0 ? [1] : [1, 2, 3])
    const start = signedRandom(random, 1, 6)
    const inside = polyLatex(0, k, -k * start)
    const choices = options(random, start, [{ value: -start, error: 'sign-flip' }, { value: k * start, error: 'no-divide' }, ...near(start)])
    return choices && build(1, 'root', say(
        `${math(`y=\\sqrt{${inside}}`)} funtzioaren izate-eremua ${math('[a,\\,+\\infty)')} da. Zenbat da ${math('a')}?`,
        `El dominio de ${math(`y=\\sqrt{${inside}}`)} es ${math('[a,\\,+\\infty)')}. ¿Cuánto vale ${math('a')}?`,
        `مجال ${math(`y=\\sqrt{${inside}}`)} هو ${math('[a,\\,+\\infty)')}. كم تساوي ${math('a')}؟`
    ), choices, start, same(`${inside}\\ge 0\\to x\\ge ${start}`), { k, start })
}

function yInterceptQuestion(random: Random): FunctionsRaceQuestion | null {
    const a = signedRandom(random, 1, 3)
    const b = randomInt(random, -6, 6)
    const c = signedRandom(random, 1, 9)
    const choices = options(random, c, [{ value: -c, error: 'sign-flip' }, { value: a + b + c, error: 'value-at-one' }, ...near(c)])
    return choices && build(1, 'y-intercept', say(
        `Zein da ${math(`y=${polyLatex(a, b, c)}`)} funtzioaren Y ardatzeko ebaki-puntuaren ordenatua?`,
        `¿Cuál es la ordenada del corte de ${math(`y=${polyLatex(a, b, c)}`)} con el eje Y?`,
        `ما ترتيبة تقاطع ${math(`y=${polyLatex(a, b, c)}`)} مع محور Y؟`
    ), choices, c, same(`x=0\\to y=${c}`), { a, b, c })
}

function xInterceptQuestion(random: Random): FunctionsRaceQuestion | null {
    const m = signedRandom(random, 1, 4)
    const x = signedRandom(random, 1, 6)
    const n = -m * x
    const choices = options(random, x, [{ value: n, error: 'y-intercept' }, { value: -x, error: 'sign-flip' }, ...near(x)])
    return choices && build(1, 'x-intercept', say(
        `Non ebakitzen du ${math(`y=${polyLatex(0, m, n)}`)} funtzioak X ardatza? Idatzi ${math('x')}.`,
        `¿Dónde corta ${math(`y=${polyLatex(0, m, n)}`)} al eje X? Escribe la ${math('x')}.`,
        `أين يقطع ${math(`y=${polyLatex(0, m, n)}`)} محور X؟ اكتب ${math('x')}.`
    ), choices, x, same(`${polyLatex(0, m, n)}=0\\to x=${x}`), { m, n })
}

/* ---------- Circuit 2: growth and extremes ---------- */

function rateQuestion(random: Random, tier: Tier): FunctionsRaceQuestion | null {
    const b = randomInt(random, -5, 5)
    const c = randomInt(random, -5, 6)
    const from = randomInt(random, tier === 0 ? 0 : -3, 3)
    const to = from + randomInt(random, tier === 0 ? 1 : 2, 4)
    const f = (x: number) => x * x + b * x + c
    const change = f(to) - f(from)
    const answer = change / (to - from)
    const choices = options(random, answer, [{ value: change, error: 'no-divide' }, { value: -answer, error: 'order' }, ...near(answer)])
    return choices && build(2, 'rate', say(
        `Kalkulatu ${math(`f(x)=${polyLatex(1, b, c)}`)} funtzioaren BAT ${math(`[${from},\\,${to}]`)} tartean.`,
        `Calcula la T.V.M. de ${math(`f(x)=${polyLatex(1, b, c)}`)} en ${math(`[${from},\\,${to}]`)}.`,
        `احسب معدل التغير المتوسط للدالة ${math(`f(x)=${polyLatex(1, b, c)}`)} في ${math(`[${from},\\,${to}]`)}.`
    ), choices, answer, same(`\\frac{${f(to)}-${br(f(from))}}{${to}-${br(from)}}=${tex(answer)}`), { b, c, from, to })
}

function speedQuestion(random: Random): FunctionsRaceQuestion | null {
    const t1 = randomInt(random, 1, 4)
    const dt = randomInt(random, 2, 6)
    const v = pick(random, [5, 10, 15, 20, 25, 30, -10, -20])
    const d1 = randomInt(random, 4, 20) * 5
    const d2 = d1 + v * dt
    if (d2 < 0) return null
    const t2 = t1 + dt
    const choices = options(random, v, [{ value: v * dt, error: 'no-divide' }, { value: d2 / t2, error: 'total' }, { value: -v, error: 'order' }, ...near(v, 5)])
    return choices && build(2, 'speed', say(
        `Mugikor bat ${math(String(d1))} m-ra dago ${math(String(t1))} s-tan eta ${math(String(d2))} m-ra ${math(String(t2))} s-tan. Zein da batez besteko abiadura (m/s)?`,
        `Un móvil está a ${math(String(d1))} m en el segundo ${math(String(t1))} y a ${math(String(d2))} m en el ${math(String(t2))}. ¿Cuál es su velocidad media (m/s)?`,
        `جسم على بعد ${math(String(d1))} م في الثانية ${math(String(t1))} وعلى بعد ${math(String(d2))} م في الثانية ${math(String(t2))}. ما سرعته المتوسطة (م/ث)؟`
    ), choices, v, same(`\\frac{${d2}-${d1}}{${t2}-${t1}}=${v}`), { d1, d2, t1, t2 })
}

/** Five knots that go low-high-low-high-low (or the other way) between x = 0 and x = 8 */
function wavyKnots(random: Random, peaksUp: boolean): Point[] {
    const xs = [0, randomInt(random, 1, 2), randomInt(random, 3, 4), randomInt(random, 5, 6), 8]
    const lows = xs.map(() => randomInt(random, 0, 2))
    const highs = xs.map(() => randomInt(random, 3, 5))
    return xs.map((x, index) => [x, (index % 2 === 1) === peaksUp ? highs[index] : lows[index]] as Point)
}

function extremeQuestion(random: Random): FunctionsRaceQuestion | null {
    // Valleys at the ends and two peaks: one relative minimum in the middle; or the other way round
    const askMin = random() < 0.5
    const knots = wavyKnots(random, askMin)
    const [, first, middle, third] = knots
    const answer = middle[0]
    const choices = options(random, answer, [{ value: middle[1], error: 'y-instead' }, { value: first[0], error: 'wrong-extreme' }, { value: third[0], error: 'wrong-extreme' }, ...near(answer)])
    const graph: GraphSpec = { box: { xMin: 0, xMax: 8, yMin: 0, yMax: 6 }, cell: 26, curves: [{ points: smoothThrough(knots) }] }
    return choices && build(2, askMin ? 'relative-min' : 'relative-max', askMin
        ? say('Grafikoan, zein ' + math('x') + ' puntutan dago minimo erlatiboa?', 'En la gráfica, ¿en qué ' + math('x') + ' está el mínimo relativo?', 'في الرسم، عند أي ' + math('x') + ' توجد القيمة الصغرى النسبية؟')
        : say('Grafikoan, zein ' + math('x') + ' puntutan dago maximo erlatiboa?', 'En la gráfica, ¿en qué ' + math('x') + ' está el máximo relativo?', 'في الرسم، عند أي ' + math('x') + ' توجد القيمة العظمى النسبية؟'),
    choices, answer, same(`(${middle[0]},\\,${middle[1]})\\to x=${answer}`), { knots: knots.flat() }, graph)
}

/* ---------- Circuit 3: continuity, periodicity, tendency ---------- */

function periodicQuestion(random: Random, tier: Tier): FunctionsRaceQuestion | null {
    const period = pick(random, tier === 0 ? [3, 4] : [3, 4, 5])
    const values = shuffle(random, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, period)
    const q = randomInt(random, 3, tier === 2 ? 25 : 12)
    const rest = randomInt(random, 0, period - 1)
    const x = q * period + rest
    const answer = values[rest]
    const others = values.filter((_, index) => index !== rest).map((value) => ({ value, error: 'wrong-rest' as const }))
    const choices = options(random, answer, [...others, ...near(answer)])
    const table = values.map((value, index) => `f(${index})=${value}`).join(',\\ ')
    return choices && build(3, 'periodic', say(
        `Funtzio baten periodoa ${math(`T=${period}`)} da eta ${math(table)}. Zenbat da ${math(`f(${x})`)}?`,
        `Una función tiene periodo ${math(`T=${period}`)} y ${math(table)}. ¿Cuánto vale ${math(`f(${x})`)}?`,
        `دالة دورها ${math(`T=${period}`)} و${math(table)}. كم تساوي ${math(`f(${x})`)}؟`
    ), choices, answer, same(`${x}=${q}\\cdot ${period}+${rest}\\to f(${x})=f(${rest})=${answer}`), { period, values, x })
}

function parkingQuestion(random: Random, tier: Tier): FunctionsRaceQuestion | null {
    const price = pick(random, tier === 0 ? [1, 2, 3] : [1.5, 2, 2.5, 1.2])
    const hours = randomInt(random, 1, 6)
    const minutes = randomInt(random, 1, 11) * 5
    const answer = (hours + 1) * price
    const choices = options(random, answer, [{ value: hours * price, error: 'no-round-up' }, { value: (hours + minutes / 60) * price, error: 'no-round-up' }, ...near(answer, price)])
    return choices && build(3, 'parking', say(
        `Aparkaleku batek ${math(tex(price))} € kobratzen ditu hasitako ordu bakoitzeko. Zenbat ordaintzen da ${math(String(hours))} h eta ${math(String(minutes))} min-engatik?`,
        `Un aparcamiento cobra ${math(tex(price))} € por cada hora empezada. ¿Cuánto se paga por ${math(String(hours))} h y ${math(String(minutes))} min?`,
        `يأخذ موقف ${math(tex(price))} € عن كل ساعة بدأت. كم يُدفع عن ${math(String(hours))} س و${math(String(minutes))} د؟`
    ), choices, answer, same(`${hours + 1}\\cdot ${tex(price)}=${tex(answer)}`), { price, hours, minutes })
}

function halvingQuestion(random: Random, tier: Tier): FunctionsRaceQuestion | null {
    const years = randomInt(random, 2, tier === 0 ? 3 : 5)
    const left = randomInt(random, 1, 9)
    const start = left * 2 ** years
    const choices = options(random, left, [{ value: start / (2 * years), error: 'half-once' }, { value: start / 2, error: 'half-once' }, ...near(left)])
    return choices && build(3, 'halving', say(
        `Substantzia batek ${math(String(start))} unitate ditu eta urtero erdia galtzen du. Zenbat geratzen dira ${math(String(years))} urtean?`,
        `Una sustancia tiene ${math(String(start))} unidades y cada año pierde la mitad. ¿Cuántas quedan a los ${math(String(years))} años?`,
        `مادة فيها ${math(String(start))} وحدة وتفقد نصفها كل سنة. كم يبقى بعد ${math(String(years))} سنوات؟`
    ), choices, left, same(`\\frac{${start}}{2^{${years}}}=${left}`), { start, years })
}

/* ---------- Circuit 4: studying functions ---------- */

function readGraphQuestion(random: Random): FunctionsRaceQuestion | null {
    const unit = pick(random, [5, 10, 20, 50])
    const knots = wavyKnots(random, true)
    const top = knots.reduce((best, point) => (point[1] > best[1] ? point : best))
    if (knots.filter((point) => point[1] === top[1]).length > 1) return null
    const answer = top[1] * unit
    const choices = options(random, answer, [{ value: top[1], error: 'squares' }, { value: top[0], error: 'y-instead' }, ...near(answer, unit)])
    const graph: GraphSpec = { box: { xMin: 0, xMax: 8, yMin: 0, yMax: 6 }, cell: 26, yUnit: unit, curves: [{ points: smoothThrough(knots) }] }
    return choices && build(4, 'read-max', say(
        `Grafikoan, zenbat da ${math('y')}-ren balio maximoa? Begiratu eskala.`,
        `En la gráfica, ¿cuál es el valor máximo de ${math('y')}? Mira la escala.`,
        `في الرسم، ما أكبر قيمة لـ ${math('y')}؟ انظر إلى التدريج.`
    ), choices, answer, same(`${top[1]}\\cdot ${unit}=${answer}`), { knots: knots.flat(), unit }, graph)
}

function boxQuestion(random: Random, tier: Tier): FunctionsRaceQuestion | null {
    const width = pick(random, [20, 30, 40])
    const height = pick(random, [16, 20, 24, 30].filter((value) => value < width))
    const x = randomInt(random, 1, tier === 0 ? 3 : height / 2 - 1)
    const answer = (width - 2 * x) * (height - 2 * x) * x
    const choices = options(random, answer, [{ value: (width - x) * (height - x) * x, error: 'one-cut' }, { value: (width - 2 * x) * (height - 2 * x), error: 'no-height' }, ...near(answer, 10)])
    return choices && build(4, 'box', say(
        `${math(`${width}\\times ${height}`)} cm-ko kartulina bati ${math(`x=${x}`)} cm-ko karratu bat mozten zaio izkina bakoitzean. Zein da kutxaren bolumena (cm³)?`,
        `A una cartulina de ${math(`${width}\\times ${height}`)} cm se le corta un cuadrado de ${math(`x=${x}`)} cm en cada esquina. ¿Cuál es el volumen de la caja (cm³)?`,
        `يُقص من ورق مقوى ${math(`${width}\\times ${height}`)} سم مربع ضلعه ${math(`x=${x}`)} سم في كل زاوية. ما حجم العلبة (سم³)؟`
    ), choices, answer, same(`${width - 2 * x}\\cdot ${height - 2 * x}\\cdot ${x}=${tex(answer)}`), { width, height, x })
}

function graphRateQuestion(random: Random): FunctionsRaceQuestion | null {
    const unit = pick(random, [2, 5, 10])
    const knots = wavyKnots(random, random() < 0.5)
    const [i, j] = pick(random, [[0, 2], [1, 3], [2, 4], [0, 4], [1, 4], [0, 3]])
    const [a, b] = [knots[i], knots[j]]
    const answer = ((b[1] - a[1]) * unit) / (b[0] - a[0])
    if (written(exact(answer)) === null || b[1] === a[1]) return null
    const choices = options(random, answer, [{ value: (b[1] - a[1]) * unit, error: 'no-divide' }, { value: (b[1] - a[1]) / (b[0] - a[0]), error: 'squares' }, { value: -answer, error: 'order' }, ...near(answer, unit)])
    const graph: GraphSpec = { box: { xMin: 0, xMax: 8, yMin: 0, yMax: 6 }, cell: 26, yUnit: unit, curves: [{ points: smoothThrough(knots) }], points: [{ at: a, name: 'A', color: 'ink' }, { at: b, name: 'B', color: 'ink' }] }
    return choices && build(4, 'graph-rate', say(
        `Grafikoan, zenbat da BAT ${math('A')} eta ${math('B')} puntuen artean?`,
        `En la gráfica, ¿cuánto vale la T.V.M. entre los puntos ${math('A')} y ${math('B')}?`,
        `في الرسم، كم معدل التغير المتوسط بين النقطتين ${math('A')} و${math('B')}؟`
    ), choices, answer, same(`\\frac{${b[1] * unit}-${a[1] * unit}}{${b[0]}-${a[0]}}=${tex(answer)}`), { knots: knots.flat(), unit, i, j }, graph)
}

type Generator = (random: Random, tier: Tier) => FunctionsRaceQuestion | null

const circuitGenerators: Generator[][] = [
    [evaluateQuestion, evaluateQuestion, fareQuestion, preimageQuestion],
    [excludedQuestion, rootQuestion, yInterceptQuestion, xInterceptQuestion],
    [rateQuestion, rateQuestion, speedQuestion, extremeQuestion],
    [periodicQuestion, periodicQuestion, parkingQuestion, halvingQuestion],
    [readGraphQuestion, boxQuestion, graphRateQuestion]
]

export function generateFunctionsRaceQuestion(random: Random, circuit: number, tier: Tier): FunctionsRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkFunctionsPitAnswer(question: RaceQuestion<FunctionsRaceError>, input: string): AnswerCheck {
    return checkAnswer(input, question.answer, question.answerForm)
}

export function functionsParTime(circuit: number): number {
    return parTimeFor([12, 11, 13, 12, 14][circuit] ?? 12)
}

export const functionsRaceErrorTips: Record<FunctionsRaceError, LocalizedText> = {
    'sign-square': say('Ordeztu parentesi artean: (−3)² = 9, ez −9.', 'Sustituye entre paréntesis: (−3)² = 9, no −9.', 'عوّض بين قوسين: (−3)² = 9 لا −9.'),
    sign: say('Kontuz zeinuekin: − bider − = +.', 'Cuidado con los signos: − por − = +.', 'انتبه للإشارات: − في − = +.'),
    'no-fixed': say('Ahaztu duzu zati finkoa (igotzeagatik ordaintzen dena).', 'Te has olvidado de la parte fija (lo que se paga al subir).', 'نسيت الجزء الثابت (ما يُدفع عند الركوب).'),
    'image-instead': say('Irudia kalkulatu duzu; x-a eskatzen da: ebatzi f(x) = balioa.', 'Has calculado la imagen; se pide la x: resuelve f(x) = valor.', 'حسبت الصورة؛ والمطلوب x: حُلّ f(x) = القيمة.'),
    'numerator-zero': say('Zenbakitzailea 0 izan daiteke; izendatzailea da 0 izan ezin dena.', 'El numerador sí puede ser 0; lo que no puede ser 0 es el denominador.', 'يمكن أن يكون البسط 0؛ أما المقام فلا.'),
    'sign-flip': say('Zeinua aldatu zaizu: x − 3 = 0 bada, x = 3.', 'Se te ha cambiado el signo: si x − 3 = 0, x = 3.', 'تغيّرت الإشارة: إذا كان x − 3 = 0 فإن x = 3.'),
    'value-at-one': say('Y ardatzean x = 0 da, ez x = 1.', 'En el eje Y, x = 0, no x = 1.', 'على محور Y تكون x = 0 لا x = 1.'),
    'y-intercept': say('Hori Y ardatzeko ebakidura da; X ardatzean y = 0 jarri.', 'Eso es el corte con el eje Y; para el eje X pon y = 0.', 'هذا التقاطع مع محور Y؛ لمحور X ضع y = 0.'),
    'no-divide': say('Zatitu x-ren aldaketaz: BAT = (f(b) − f(a)) / (b − a).', 'Divide entre el cambio de x: T.V.M. = (f(b) − f(a)) / (b − a).', 'اقسم على تغير x: المعدل = (f(b) − f(a)) / (b − a).'),
    order: say('Kendu ordena berean: amaierakoa ken hasierakoa, bietan.', 'Resta en el mismo orden: el final menos el principio, en los dos.', 'اطرح بالترتيب نفسه: النهاية ناقص البداية في الحالتين.'),
    total: say('Hori hasieratik batez bestekoa da, ez tarte horretakoa.', 'Esa es la media desde el principio, no la de ese intervalo.', 'هذا المتوسط منذ البداية لا في تلك الفترة.'),
    'y-instead': say('Puntu baten x-a eta y-a nahastu dituzu.', 'Has confundido la x y la y del punto.', 'خلطت بين x وy للنقطة.'),
    'wrong-extreme': say('Maximoa: igotzetik jaistera. Minimoa: jaistetik igotzera.', 'Máximo: de subir a bajar. Mínimo: de bajar a subir.', 'العظمى: من الصعود إلى النزول. الصغرى: من النزول إلى الصعود.'),
    'wrong-rest': say('Zatitu x periodoaz eta erabili hondarra: x = q · T + r.', 'Divide x entre el periodo y usa el resto: x = q · T + r.', 'اقسم x على الدور واستعمل الباقي: x = q · T + r.'),
    'no-round-up': say('Hasitako ordu bakoitza oso-osorik ordaintzen da: biribildu gora.', 'Cada hora empezada se paga entera: redondea hacia arriba.', 'كل ساعة بدأت تُدفع كاملة: قرّب إلى الأعلى.'),
    'half-once': say('Urtero erdira: zatitu 2z urte adina aldiz (2ⁿ).', 'Cada año a la mitad: divide entre 2 tantas veces como años (2ⁿ).', 'كل سنة إلى النصف: اقسم على 2 بعدد السنوات (2ⁿ).'),
    squares: say('Laukiak zenbatu dituzu: biderkatu eskalaz.', 'Has contado cuadros: multiplica por la escala.', 'عددت الخانات: اضرب في التدريج.'),
    'one-cut': say('Alde bakoitzari bi karratu kentzen zaizkio: 40 − 2x.', 'A cada lado se le quitan dos cuadrados: 40 − 2x.', 'يُطرح من كل ضلع مربعان: 40 − 2x.'),
    'no-height': say('Hori oinarriaren azalera da; biderkatu altueraz, x.', 'Eso es el área de la base; multiplica por la altura, x.', 'هذه مساحة القاعدة؛ اضرب في الارتفاع x.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.')
}
