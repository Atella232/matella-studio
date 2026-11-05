import { checkAnswer, fraction, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { written } from '../../batx1-zientziak-errealak/games/race.ts'
import { readStatisticsAnswer } from '../../dbh2-estatistika-v2/answers.ts'

/* ==========================================================================
   Estatistikaren lasterketa (Batxilergoa 1 · Zientziak): five circuits,
   one per stage — data (a relative frequency, a cumulative frequency, the
   angle of a sector), centre (a mean, the missing datum, a grouped mean),
   position (the place of a percentile, the upper fence, a median from a
   table), spread (σ² from σ, the variance of four data, a CV) and
   interpretation (a standard score, the limit x̄ + 3σ, σ after a·x + b).
   The wrong options are the typical mistakes. Every question carries
   `meta`, the numbers the tests check it against.
   ========================================================================== */

export const BACH_STATS_RACE_CIRCUITS = 5

export type BachStatsRaceError =
    | 'inverse'
    | 'percent'
    | 'absolute'
    | 'shift'
    | 'median'
    | 'divide'
    | 'mean'
    | 'mark'
    | 'floor'
    | 'factor'
    | 'quartile'
    | 'mode'
    | 'root'
    | 'variance'
    | 'sign'
    | 'translate'
    | 'calculation'

export type BachStatsRaceQuestion = RaceQuestion<BachStatsRaceError> & { meta: Record<string, number> }

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** A decimal for LaTeX with the comma (MathText writes the point in English; Arabic gets it from say) */
const tex = (value: number) => String(Math.round(value * 1000) / 1000).replace('.', '{,}')

interface Candidate {
    value: FractionValue
    error: BachStatsRaceError
}
const exact = (value: number, error: BachStatsRaceError): Candidate => ({ value: fraction(Math.round(value * 1000), 1000), error })
const nearby = (value: number): Candidate[] => [value + 1, value - 1, value + 2, value * 2].map((item) => exact(item, 'calculation'))

/** The right option and three different mistakes */
function options(random: Random, right: FractionValue, candidates: Candidate[]): RaceOption<BachStatsRaceError>[] | null {
    const rightLatex = written(right)
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: BachStatsRaceError }> = []
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

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<BachStatsRaceError>[], answer: FractionValue, solution: LocalizedText, meta: Record<string, number>): BachStatsRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution, meta }
}

const all = (latex: string) => say(`$${latex}$`, `$${latex}$`, `$${latex}$`, `$${latex}$`)
const list = (values: number[]) => values.join(',\\ ')

/* ---------- Circuit 0: data and tables ---------- */

/** h = f / N with a short decimal */
function relativeQuestion(random: Random): BachStatsRaceQuestion | null {
    const total = pick(random, [20, 25, 40, 50])
    const count = randomInt(random, 2, total / 2)
    const answer = fraction(count, total)
    const choices = options(random, answer, [exact(total / count, 'inverse'), exact((100 * count) / total, 'percent'), exact(count, 'absolute')])
    return choices && build(0, 'relative', say(`$N=${total}$ eta $f=${count}$ badira, zenbat da $h$?`, `Con $N=${total}$ y $f=${count}$, ¿cuánto vale $h$?`, `مع $N=${total}$ و$f=${count}$، كم قيمة $h$؟`, `With $N=${total}$ and $f=${count}$, what is $h$?`), choices, answer, all(`h=\\frac{${count}}{${total}}=${tex(count / total)}`), { total, count })
}

/** F₃ from four frequencies */
function cumulativeQuestion(random: Random): BachStatsRaceQuestion | null {
    const counts = Array.from({ length: 4 }, () => randomInt(random, 2, 9))
    const answer = fraction(counts[0] + counts[1] + counts[2])
    const choices = options(random, answer, [exact(counts[2], 'absolute'), exact(counts[0] + counts[1] + counts[2] + counts[3], 'shift'), exact(counts[0] + counts[1], 'shift')])
    return choices && build(0, 'cumulative', say(`Maiztasunak: $${list(counts)}$. Zenbat da $F_3$?`, `Frecuencias: $${list(counts)}$. ¿Cuánto vale $F_3$?`, `التكرارات: $${list(counts)}$. كم قيمة $F_3$؟`, `Frequencies: $${list(counts)}$. What is $F_3$?`), choices, answer, all(`F_3=${counts[0]}+${counts[1]}+${counts[2]}=${counts[0] + counts[1] + counts[2]}`), { a: counts[0], b: counts[1], c: counts[2], d: counts[3] })
}

/** The angle h · 360° of a sector */
function sectorQuestion(random: Random): BachStatsRaceQuestion | null {
    const total = pick(random, [30, 40, 60, 72, 90, 120])
    const count = randomInt(random, 2, total / 2)
    const angle = (360 * count) / total
    if (!Number.isInteger(angle)) return null
    const answer = fraction(angle)
    const choices = options(random, answer, [exact((100 * count) / total, 'percent'), exact(count, 'absolute'), exact(360 / count, 'inverse')])
    return choices && build(0, 'sector', say(`$N=${total}$ eta $f=${count}$. Zenbat gradu ditu sektoreak?`, `$N=${total}$ y $f=${count}$. ¿Cuántos grados mide el sector?`, `$N=${total}$ و$f=${count}$. كم درجة قياس القطاع؟`, `$N=${total}$ and $f=${count}$. How many degrees is the sector?`), choices, answer, all(`\\frac{${count}}{${total}}\\cdot 360=${angle}`), { total, count })
}

/* ---------- Circuit 1: measures of centre ---------- */

/** The mean of five data */
function meanQuestion(random: Random): BachStatsRaceQuestion | null {
    const data = Array.from({ length: 5 }, () => randomInt(random, 1, 12))
    const sum = data.reduce((total, value) => total + value, 0)
    if (sum % 5 !== 0) return null
    const sorted = [...data].sort((a, b) => a - b)
    const answer = fraction(sum / 5)
    const choices = options(random, answer, [exact(sorted[2], 'median'), exact(sum, 'divide'), exact(sum / 4, 'divide')])
    return choices && build(1, 'mean', say(`Zein da $${list(data)}$ datuen batez bestekoa?`, `¿Cuál es la media de $${list(data)}$?`, `ما متوسط $${list(data)}$؟`, `What is the mean of $${list(data)}$?`), choices, answer, all(`\\bar{x}=\\frac{${sum}}{5}=${sum / 5}`), { sum })
}

/** n data with mean m; n − 1 known: the missing one is n·m − S */
function missingQuestion(random: Random): BachStatsRaceQuestion | null {
    const known = Array.from({ length: 3 }, () => randomInt(random, 2, 9))
    const mean = randomInt(random, 4, 8)
    const missing = 4 * mean - known.reduce((total, value) => total + value, 0)
    if (missing < 0 || missing > 12) return null
    const sum = 4 * mean - missing
    const answer = fraction(missing)
    const choices = options(random, answer, [exact(mean, 'mean'), exact(3 * mean - sum, 'divide'), exact(sum - 4 * mean, 'sign')])
    return choices && build(1, 'missing', say(`Lau datuen batez bestekoa $${mean}$ da; hiru $${list(known)}$ dira. Zein da laugarrena?`, `Cuatro datos tienen media $${mean}$; tres son $${list(known)}$. ¿Cuál es el cuarto?`, `لأربعة بيانات متوسط $${mean}$؛ ثلاثة منها $${list(known)}$. ما الرابع؟`, `Four data have a mean of $${mean}$; three are $${list(known)}$. What is the fourth?`), choices, answer, all(`4\\cdot ${mean}-${sum}=${missing}`), { mean, sum, missing })
}

/** The mean of three intervals of width 10 with the class marks */
function groupedQuestion(random: Random): BachStatsRaceQuestion | null {
    const start = pick(random, [0, 10, 20])
    const counts = Array.from({ length: 3 }, () => randomInt(random, 1, 6))
    const total = counts[0] + counts[1] + counts[2]
    const marks = [start + 5, start + 15, start + 25]
    const sum = counts.reduce((acc, count, index) => acc + count * marks[index], 0)
    const mean = sum / total
    if (Math.round(mean * 100) !== mean * 100) return null
    const answer = fraction(Math.round(mean * 100), 100)
    const choices = options(random, answer, [exact(mean - 5, 'mark'), exact(mean + 5, 'mark'), exact((marks[0] + marks[1] + marks[2]) / 3, 'mean')])
    const intervals = counts.map((count, index) => `[${start + 10 * index},${start + 10 * index + 10})\\ ${count}`).join(',\\ ')
    return choices && build(1, 'grouped', say(`Tarteak: $${intervals}$. Zein da batez bestekoa?`, `Intervalos: $${intervals}$. ¿Cuál es la media?`, `الفئات: $${intervals}$. ما المتوسط؟`, `Intervals: $${intervals}$. What is the mean?`), choices, answer, all(`\\bar{x}=\\frac{${sum}}{${total}}=${tex(mean)}`), { sum, total })
}

/* ---------- Circuit 2: measures of position ---------- */

/** The place of P_k in N ordered data, never a whole position */
function placeQuestion(random: Random): BachStatsRaceQuestion | null {
    const total = pick(random, [30, 40, 50, 60])
    const k = pick(random, [15, 35, 45, 65, 85, 95, 22, 78])
    const position = (total * k) / 100
    if (Number.isInteger(position)) return null
    const answer = fraction(Math.ceil(position))
    const choices = options(random, answer, [exact(Math.floor(position), 'floor'), exact(k, 'percent'), exact(Math.round(position * 10) / 10, 'floor')])
    return choices && build(2, 'place', say(`$${total}$ datu ordenatuta. Zenbatgarren datua da $P_{${k}}$?`, `$${total}$ datos ordenados. ¿Qué dato, en orden, es $P_{${k}}$?`, `$${total}$ بيانًا مرتبًا. ما ترتيب البيان $P_{${k}}$؟`, `$${total}$ ordered data. Which datum, in order, is $P_{${k}}$?`), choices, answer, all(`${total}\\cdot ${tex(k / 100)}=${tex(position)}\\ \\to\\ ${Math.ceil(position)}`), { total, k })
}

/** The upper fence Q₃ + 1,5·(Q₃ − Q₁) */
function fenceQuestion(random: Random): BachStatsRaceQuestion | null {
    const q1 = randomInt(random, 4, 20)
    const range = 2 * randomInt(random, 1, 6)
    const q3 = q1 + range
    const fence = q3 + 1.5 * range
    const answer = fraction(fence)
    const choices = options(random, answer, [exact(q3 + range, 'factor'), exact(q1 + 1.5 * range, 'quartile'), exact(q3 + 1.5 * q3, 'factor')])
    return choices && build(2, 'fence', say(`$Q_1=${q1}$ eta $Q_3=${q3}$. Zein balioren gainetik da atipikoa datu bat?`, `$Q_1=${q1}$ y $Q_3=${q3}$. ¿Por encima de qué valor es atípico un dato?`, `$Q_1=${q1}$ و$Q_3=${q3}$. فوق أي قيمة يكون البيان شاذًّا؟`, `$Q_1=${q1}$ and $Q_3=${q3}$. Above what value is a datum an outlier?`), choices, answer, all(`${q3}+1{,}5\\cdot ${range}=${fence}`), { q1, q3 })
}

/** The median of a table with an odd number of data */
function medianQuestion(random: Random): BachStatsRaceQuestion | null {
    const counts = Array.from({ length: 4 }, () => randomInt(random, 1, 7))
    const total = counts.reduce((acc, count) => acc + count, 0)
    if (total % 2 === 0) return null
    const place = (total + 1) / 2
    let running = 0
    let median = 0
    for (let value = 0; value < 4; value += 1) {
        running += counts[value]
        if (running >= place) { median = value + 1; break }
    }
    const top = Math.max(...counts)
    if (counts.filter((count) => count === top).length > 1) return null
    const mode = counts.indexOf(top) + 1
    if (mode === median) return null
    const answer = fraction(median)
    const choices = options(random, answer, [exact(mode, 'mode'), exact(2.5, 'median'), exact(place, 'floor')])
    return choices && build(2, 'median', say(`1, 2, 3 eta 4 balioen maiztasunak: $${list(counts)}$. Zein da mediana?`, `Los valores 1, 2, 3 y 4 tienen frecuencias $${list(counts)}$. ¿Cuál es la mediana?`, `للقيم 1 و2 و3 و4 التكرارات $${list(counts)}$. ما الوسيط؟`, `The values 1, 2, 3 and 4 have frequencies $${list(counts)}$. What is the median?`), choices, answer, all(`N=${total}\\ \\to\\ ${place}\\ \\to\\ Me=${median}`), { a: counts[0], b: counts[1], c: counts[2], d: counts[3], median })
}

/* ---------- Circuit 3: measures of spread ---------- */

/** σ² from σ */
function squareQuestion(random: Random): BachStatsRaceQuestion | null {
    const sigma = pick(random, [1.5, 2, 2.5, 3, 4, 5, 0.5, 1.2])
    const answer = fraction(Math.round(sigma * sigma * 100), 100)
    const choices = options(random, answer, [exact(2 * sigma, 'root'), exact(Math.sqrt(sigma), 'root'), exact(sigma, 'root')])
    return choices && build(3, 'square', say(`$\\sigma=${tex(sigma)}$ bada, zenbat da bariantza?`, `Si $\\sigma=${tex(sigma)}$, ¿cuánto vale la varianza?`, `إذا كان $\\sigma=${tex(sigma)}$ فكم التباين؟`, `If $\\sigma=${tex(sigma)}$, what is the variance?`), choices, answer, all(`\\sigma^2=${tex(sigma)}^2=${tex(sigma * sigma)}`), { sigma })
}

/** The variance of a − d, a − d, a + d, a + d is d² */
function varianceQuestion(random: Random): BachStatsRaceQuestion | null {
    const centre = randomInt(random, 5, 15)
    const d = randomInt(random, 1, 4)
    const data = [centre - d, centre - d, centre + d, centre + d]
    const answer = fraction(d * d)
    const choices = options(random, answer, [exact(d, 'root'), exact(0, 'sign'), exact(2 * d * d, 'divide')])
    return choices && build(3, 'variance', say(`Zein da $${list(data)}$ datuen bariantza?`, `¿Cuál es la varianza de $${list(data)}$?`, `ما تباين $${list(data)}$؟`, `What is the variance of $${list(data)}$?`), choices, answer, all(`\\bar{x}=${centre}\\qquad\\sigma^2=\\frac{${4 * d * d}}{4}=${d * d}`), { centre, d })
}

/** CV = σ / x̄ */
function cvQuestion(random: Random): BachStatsRaceQuestion | null {
    const mean = pick(random, [20, 25, 40, 50, 80])
    const sigma = randomInt(random, 2, 10)
    const cv = sigma / mean
    if (Math.round(cv * 1000) !== cv * 1000) return null
    const answer = fraction(sigma, mean)
    const choices = options(random, answer, [exact(mean / sigma, 'inverse'), exact(sigma, 'absolute'), exact(100 * cv, 'percent')])
    return choices && build(3, 'cv', say(`$\\bar{x}=${mean}$ eta $\\sigma=${sigma}$. Zenbat da $CV$?`, `$\\bar{x}=${mean}$ y $\\sigma=${sigma}$. ¿Cuánto vale $CV$?`, `$\\bar{x}=${mean}$ و$\\sigma=${sigma}$. كم قيمة $CV$؟`, `$\\bar{x}=${mean}$ and $\\sigma=${sigma}$. What is $CV$?`), choices, answer, all(`\\frac{${sigma}}{${mean}}=${tex(cv)}`), { mean, sigma })
}

/* ---------- Circuit 4: interpret and compare ---------- */

/** z = (x − x̄) / σ */
function scoreQuestion(random: Random): BachStatsRaceQuestion | null {
    const mean = randomInt(random, 40, 70)
    const sigma = pick(random, [2, 4, 5, 8, 10])
    const z = pick(random, [-2, -1.5, -1, -0.5, 0.5, 1, 1.5, 2, 2.5])
    const datum = mean + z * sigma
    if (!Number.isInteger(datum)) return null
    const answer = fraction(Math.round(z * 10), 10)
    const choices = options(random, answer, [exact((datum - mean) / (sigma * sigma), 'variance'), exact(-z, 'sign'), exact(datum / sigma, 'mean')])
    return choices && build(4, 'score', say(`$\\bar{x}=${mean}$ eta $\\sigma=${sigma}$. Zein da $${datum}$ datuaren puntuazio tipikoa?`, `$\\bar{x}=${mean}$ y $\\sigma=${sigma}$. ¿Cuál es la puntuación típica de $${datum}$?`, `$\\bar{x}=${mean}$ و$\\sigma=${sigma}$. ما الدرجة المعيارية لـ $${datum}$؟`, `$\\bar{x}=${mean}$ and $\\sigma=${sigma}$. What is the standard score of $${datum}$?`), choices, answer, all(`\\frac{${datum}-${mean}}{${sigma}}=${tex(z)}`), { mean, sigma, datum })
}

/** The limit x̄ + 3σ */
function limitQuestion(random: Random): BachStatsRaceQuestion | null {
    const mean = randomInt(random, 10, 60)
    const sigma = randomInt(random, 2, 6)
    const answer = fraction(mean + 3 * sigma)
    const choices = options(random, answer, [exact(mean + 3 * sigma * sigma, 'variance'), exact(mean + sigma, 'factor'), exact(mean - 3 * sigma, 'sign')])
    return choices && build(4, 'limit', say(`$\\bar{x}=${mean}$ eta $\\sigma=${sigma}$. Zein da $\\bar{x}+3\\sigma$ muga?`, `$\\bar{x}=${mean}$ y $\\sigma=${sigma}$. ¿Cuál es el límite $\\bar{x}+3\\sigma$?`, `$\\bar{x}=${mean}$ و$\\sigma=${sigma}$. ما الحد $\\bar{x}+3\\sigma$؟`, `$\\bar{x}=${mean}$ and $\\sigma=${sigma}$. What is the limit $\\bar{x}+3\\sigma$?`), choices, answer, all(`${mean}+3\\cdot ${sigma}=${mean + 3 * sigma}`), { mean, sigma })
}

/** σ of a·x + b is a·σ */
function transformQuestion(random: Random): BachStatsRaceQuestion | null {
    const sigma = randomInt(random, 2, 6)
    const a = randomInt(random, 2, 4)
    const b = randomInt(random, 3, 12)
    const answer = fraction(a * sigma)
    const choices = options(random, answer, [exact(a * sigma + b, 'translate'), exact(sigma, 'translate'), exact(sigma + b, 'translate')])
    return choices && build(4, 'transform', say(`Datu batzuek $\\sigma=${sigma}$ dute. Zenbat da $${a}x+${b}$ datuen $\\sigma$?`, `Unos datos tienen $\\sigma=${sigma}$. ¿Cuánto vale la $\\sigma$ de los datos $${a}x+${b}$?`, `لبيانات $\\sigma=${sigma}$. كم $\\sigma$ للبيانات $${a}x+${b}$؟`, `Some data have $\\sigma=${sigma}$. What is $\\sigma$ for the data $${a}x+${b}$?`), choices, answer, all(`${a}\\cdot ${sigma}=${a * sigma}`), { sigma, a, b })
}

const circuitGenerators: Array<Array<(random: Random, tier: Tier) => BachStatsRaceQuestion | null>> = [
    [relativeQuestion, cumulativeQuestion, sectorQuestion],
    [meanQuestion, missingQuestion, groupedQuestion],
    [placeQuestion, fenceQuestion, medianQuestion],
    [squareQuestion, varianceQuestion, cvQuestion],
    [scoreQuestion, limitQuestion, transformQuestion]
]

export function generateBachStatsRaceQuestion(random: Random, circuit: number, tier: Tier): BachStatsRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkBachStatsPitAnswer(question: RaceQuestion<BachStatsRaceError>, input: string): AnswerCheck {
    return checkAnswer(readStatisticsAnswer(input), question.answer, question.answerForm)
}

export function bachStatsParTime(circuit: number): number {
    return parTimeFor([12, 13, 13, 13, 12][circuit] ?? 13)
}

export const bachStatsRaceErrorTips: Record<BachStatsRaceError, LocalizedText> = {
    inverse: say('Alderantziz: zatitu zatia osoaz, ez osoa zatiaz.', 'Al revés: divide la parte entre el total, no el total entre la parte.', 'العكس: اقسم الجزء على الكل لا الكل على الجزء.', 'The other way round: divide the part by the total, not the total by the part.'),
    percent: say('Hori ehunekoa da; zenbaki hutsa eskatzen da.', 'Eso es el porcentaje; se pide el número tal cual.', 'هذه هي النسبة المئوية؛ المطلوب العدد نفسه.', 'That is the percentage; the plain number is asked for.'),
    absolute: say('Hori maiztasun absolutua da, ez eskatzen dena.', 'Esa es la frecuencia absoluta, no lo que se pide.', 'هذا هو التكرار المطلق لا المطلوب.', 'That is the absolute frequency, not what is asked.'),
    shift: say('Metatuak balio horretaraino batzen ditu: ez gehiago, ez gutxiago.', 'La acumulada suma hasta ese valor: ni más ni menos.', 'المتجمّع يجمع حتى تلك القيمة: لا أكثر ولا أقل.', 'The cumulative frequency adds up to that value: no more, no less.'),
    median: say('Hori mediana da, ez batez bestekoa.', 'Esa es la mediana, no la media.', 'هذا هو الوسيط لا المتوسط.', 'That is the median, not the mean.'),
    divide: say('Zatitu datu kopuruaz, $N$.', 'Divide entre el número de datos, $N$.', 'اقسم على عدد البيانات $N$.', 'Divide by the number of data, $N$.'),
    mean: say('Falta den datua ez da batez bestekoa: kalkulatu batura osoa, $N\\cdot\\bar{x}$.', 'El dato que falta no es la media: calcula la suma total, $N\\cdot\\bar{x}$.', 'البيان الناقص ليس المتوسط: احسب المجموع الكلي $N\\cdot\\bar{x}$.', 'The missing datum is not the mean: work out the total sum, $N\\cdot\\bar{x}$.'),
    mark: say('Erabili klase-marka, tartearen erdiko puntua.', 'Usa la marca de clase, el punto medio del intervalo.', 'استعمل مركز الفئة، أي منتصفها.', 'Use the class mark, the midpoint of the interval.'),
    floor: say('Posizioa osoa ez denean, hurrengo datua hartzen da.', 'Si la posición no es entera, se toma el dato siguiente.', 'إذا لم يكن الموضع صحيحًا نأخذ البيان التالي.', 'If the position is not whole, take the next datum.'),
    factor: say('Muga $Q_3+1{,}5\\cdot(Q_3-Q_1)$ da.', 'El límite es $Q_3+1{,}5\\cdot(Q_3-Q_1)$.', 'الحد هو $Q_3+1{,}5\\cdot(Q_3-Q_1)$.', 'The limit is $Q_3+1{,}5\\cdot(Q_3-Q_1)$.'),
    quartile: say('Goiko muga $Q_3$ kuartiletik neurtzen da, ez $Q_1$ kuartiletik.', 'El límite de arriba se mide desde $Q_3$, no desde $Q_1$.', 'يُقاس الحد الأعلى من $Q_3$ لا من $Q_1$.', 'The upper limit is measured from $Q_3$, not from $Q_1$.'),
    mode: say('Hori moda da; mediana erdiko datua da.', 'Esa es la moda; la mediana es el dato central.', 'هذا هو المنوال؛ الوسيط هو البيان الأوسط.', 'That is the mode; the median is the middle datum.'),
    root: say('Bariantza desbideratze tipikoaren karratua da.', 'La varianza es el cuadrado de la desviación típica.', 'التباين هو مربع الانحراف المعياري.', 'The variance is the square of the standard deviation.'),
    variance: say('Erabili $\\sigma$, ez $\\sigma^2$.', 'Usa $\\sigma$, no $\\sigma^2$.', 'استعمل $\\sigma$ لا $\\sigma^2$.', 'Use $\\sigma$, not $\\sigma^2$.'),
    sign: say('Kontuz zeinuarekin.', 'Cuidado con el signo.', 'انتبه للإشارة.', 'Watch the sign.'),
    translate: say('Batzeak ez du $\\sigma$ aldatzen; biderkatzeak, bai.', 'Sumar no cambia $\\sigma$; multiplicar, sí.', 'الجمع لا يغيّر $\\sigma$، أما الضرب فيغيّره.', 'Adding does not change $\\sigma$; multiplying does.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}
