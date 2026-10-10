import { checkAnswer, fraction, toExactDecimal, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { readStatisticsAnswer } from '../../dbh2-estatistika-v2/answers.ts'
import { tablePercentile } from '../stats.ts'

/* ==========================================================================
   Estatistikaren lasterketa (4. DBH aplikatuak): five circuits, one per
   stage — data (the amplitude of the intervals, a class mark, a sector, a
   frequency from its relative one), centralization and position (grouped
   mean, a percentile from a table, the limit of the whiskers), dispersion
   (variance of a list, σ from σ², variance of a table, CV), two variables
   (an estimate, n through the means, the value of r for a cloud) and
   probability (union, two draws without replacement, conditional
   probability, at least once). Wrong options are typical mistakes: the
   range instead of the amplitude, a limit for the class mark, the mean of
   the marks without frequencies, forgetting the 1,5, forgetting to square,
   σ for σ², the common part counted twice, drawing with replacement, the
   condition read backwards… Every question carries `meta`, the numbers the
   tests check it against.
   ========================================================================== */

export const STATISTICS_RACE_CIRCUITS = 5

export type StatisticsRaceError =
    | 'range'
    | 'count'
    | 'limit'
    | 'width'
    | 'percent-degrees'
    | 'percent'
    | 'ignore-frequency'
    | 'neighbour'
    | 'no-factor'
    | 'box'
    | 'other-side'
    | 'no-square'
    | 'no-divide'
    | 'variance'
    | 'mean-square'
    | 'inverse-ratio'
    | 'no-fixed'
    | 'sign'
    | 'weak'
    | 'no-common'
    | 'common'
    | 'replacement'
    | 'one-draw'
    | 'joint'
    | 'reversed'
    | 'double'
    | 'no-complement'
    | 'calculation'

export type StatisticsRaceQuestion = RaceQuestion<StatisticsRaceError> & { meta: Record<string, number> }

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
const same = (latex: string): LocalizedText => ({ eu: `$${latex}$`, es: `$${latex}$`, ar: `$${latex.replace(/\{,\}/g, '.')}$` })
const math = (latex: string) => `$${latex}$`
const sum = (values: number[]) => values.reduce((total, value) => total + value, 0)

/** A value in LaTeX: an exact decimal with at most two decimals, or a simplified fraction when asked */
export function written(value: FractionValue, asFraction = false): string | null {
    if (asFraction) return value.denominator === 1 ? `${value.numerator}` : `${value.numerator < 0 ? '-' : ''}\\frac{${Math.abs(value.numerator)}}{${value.denominator}}`
    const text = toExactDecimal(value, ',')
    if (text === null || (text.split(',')[1] ?? '').length > 2) return null
    return text.replace(',', '{,}')
}
// + 0 turns −0 into 0
const n = (value: number) => fraction(Math.round(value * 10000) + 0, 10000)
const tex = (value: number) => written(n(value)) ?? String(value)

interface Candidate {
    value: FractionValue
    error: StatisticsRaceError
}

const near = (value: FractionValue, step = 1): Candidate[] => {
    const x = value.numerator / value.denominator
    return [x + step, x - step, x + 2 * step, x * 2].map((item) => ({ value: n(item), error: 'calculation' as const }))
}

/** The right option and three different mistakes; probabilities stay in (0, 1] */
function options(random: Random, right: FractionValue, candidates: Candidate[], { asFraction = false, probability = false, negative = false } = {}): RaceOption<StatisticsRaceError>[] | null {
    const rightLatex = written(right, asFraction)
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: StatisticsRaceError }> = []
    for (const candidate of candidates) {
        if (wrong.length === 3) break
        const value = candidate.value.numerator / candidate.value.denominator
        if (!Number.isFinite(value) || (!negative && value <= 0) || (probability && value > 1)) continue
        const latex = written(candidate.value, asFraction)
        if (latex === null || latex === '-0' || used.has(latex)) continue
        used.add(latex)
        wrong.push({ latex, error: candidate.error })
    }
    if (wrong.length < 3) return null
    return shuffle(random, [{ latex: rightLatex, correct: true, error: null }, ...wrong.map((item) => ({ latex: item.latex, correct: false, error: item.error }))])
}

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<StatisticsRaceError>[], answer: FractionValue, solution: LocalizedText, meta: Record<string, number>): StatisticsRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution, meta }
}

/** A frequency table x → f for the prompt: 0 → 3, 1 → 6… */
const tableText = (values: number[], counts: number[]) => math(values.map((value, index) => `${value}\\to ${counts[index]}`).join(',\\ '))

/* ---------- Circuit 0: data ---------- */

function widthQuestion(random: Random, tier: Tier): StatisticsRaceQuestion | null {
    const k = pick(random, tier === 0 ? [5, 6, 10] : [5, 6, 8, 10, 12])
    const min = randomInt(random, 10, 60)
    const range = randomInt(random, 2 * k, 6 * k)
    const max = min + range
    const extended = (Math.floor(range / k) + 1) * k
    const width = extended / k
    const choices = options(random, n(width), [{ value: n(range), error: 'range' }, { value: n(k), error: 'count' }, { value: n(extended), error: 'range' }, ...near(n(width))])
    return choices && build(0, 'width', say(
        `Datu txikiena ${math(String(min))} da eta handiena ${math(String(max))}; ${math(String(k))} tarte egingo dira. Zein da zabalera (osoa)?`,
        `Los datos van de ${math(String(min))} a ${math(String(max))} y se harán ${math(String(k))} intervalos. ¿Cuál es la amplitud (entera)?`,
        `تمتد البيانات من ${math(String(min))} إلى ${math(String(max))} وستُعمل ${math(String(k))} فئات. ما طول الفئة (عدد صحيح)؟`
    ), choices, n(width), same(`r=${range}\\to r'=${extended}\\to ${extended}:${k}=${width}`), { min, max, k })
}

function markQuestion(random: Random, tier: Tier): StatisticsRaceQuestion | null {
    const width = pick(random, tier === 0 ? [2, 4, 10] : [3, 5, 6, 7])
    const from = randomInt(random, 20, 180) + 0.5
    const to = from + width
    const mark = from + width / 2
    const choices = options(random, n(mark), [{ value: n(from), error: 'limit' }, { value: n(to), error: 'limit' }, { value: n(width), error: 'width' }, ...near(n(mark))])
    return choices && build(0, 'mark', say(
        `Zein da ${math(`[${tex(from)};\\ ${tex(to)})`)} tartearen klase-marka?`,
        `¿Cuál es la marca de clase del intervalo ${math(`[${tex(from)};\\ ${tex(to)})`)}?`,
        `ما مركز الفئة ${math(`[${tex(from)};\\ ${tex(to)})`)}؟`
    ), choices, n(mark), same(`\\frac{${tex(from)}+${tex(to)}}{2}=${tex(mark)}`), { from, width })
}

function sectorQuestion(random: Random, tier: Tier): StatisticsRaceQuestion | null {
    const total = pick(random, tier === 0 ? [20, 40, 60] : [24, 36, 40, 72, 90, 120])
    const part = randomInt(random, 1, total - 1)
    const angle = (part / total) * 360
    const choices = options(random, n(angle), [{ value: n((part / total) * 100), error: 'percent-degrees' }, { value: n(part), error: 'percent-degrees' }, { value: n(360 - angle), error: 'calculation' }, ...near(n(angle), 10)])
    return choices && build(0, 'sector', say(
        `Inkesta bat: guztira ${math(String(total))} pertsona, eta aukera bat ${math(String(part))} pertsonak hautatu dute. Zenbat gradu ditu haren sektoreak?`,
        `De ${math(String(total))} personas, ${math(String(part))} han elegido una opción. ¿Cuántos grados mide su sector?`,
        `من ${math(String(total))} شخصًا اختار ${math(String(part))} خيارًا. كم درجة قطاعه؟`
    ), choices, n(angle), same(`\\frac{${part}}{${total}}\\cdot 360=${tex(angle)}`), { part, total })
}

function relativeQuestion(random: Random, tier: Tier): StatisticsRaceQuestion | null {
    const total = pick(random, tier === 0 ? [20, 50, 100] : [40, 60, 80, 120, 200])
    const h = pick(random, [0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45])
    const count = h * total
    if (!Number.isInteger(Math.round(count * 1000) / 1000)) return null
    const choices = options(random, n(count), [{ value: n(h * 100), error: 'percent' }, { value: n(total / h), error: 'inverse-ratio' }, { value: n(total - count), error: 'calculation' }, ...near(n(count))])
    return choices && build(0, 'relative', say(
        `${math(String(total))} datuko taula batean, balio baten maiztasun erlatiboa ${math(tex(h))} da. Zein da haren maiztasun absolutua?`,
        `En una tabla de ${math(String(total))} datos, la frecuencia relativa de un valor es ${math(tex(h))}. ¿Cuál es su frecuencia absoluta?`,
        `في جدول من ${math(String(total))} بيانًا، التكرار النسبي لقيمة ${math(tex(h))}. ما تكرارها المطلق؟`
    ), choices, n(count), same(`${tex(h)}\\cdot ${total}=${tex(count)}`), { h, total })
}

/* ---------- Circuit 1: centralization and position ---------- */

function groupedMeanQuestion(random: Random, tier: Tier): StatisticsRaceQuestion | null {
    const width = pick(random, tier === 0 ? [10] : [4, 10, 20])
    const counts = [randomInt(random, 1, 8), randomInt(random, 2, 10), randomInt(random, 1, 8)]
    const marks = counts.map((_, index) => width * index + width / 2)
    const total = sum(counts)
    const mean = sum(counts.map((count, index) => count * marks[index])) / total
    const lower = sum(counts.map((count, index) => count * width * index)) / total
    const choices = options(random, n(mean), [{ value: n(sum(marks) / 3), error: 'ignore-frequency' }, { value: n(lower), error: 'limit' }, { value: n(mean + width / 2), error: 'limit' }, ...near(n(mean))])
    const intervals = counts.map((count, index) => `[${width * index},${width * (index + 1)})\\ ${count}`).join(',\\ ')
    return choices && build(1, 'grouped-mean', say(
        `Datu multzokatuak: ${math(intervals)}. Kalkulatu batez bestekoa.`,
        `Datos agrupados: ${math(intervals)}. Calcula la media.`,
        `بيانات مبوّبة: ${math(intervals)}. احسب المتوسط.`
    ), choices, n(mean), same(`\\frac{${counts.map((count, index) => `${tex(marks[index])}\\cdot ${count}`).join('+')}}{${total}}=${tex(mean)}`), { width, c0: counts[0], c1: counts[1], c2: counts[2] })
}

function percentileQuestion(random: Random, tier: Tier): StatisticsRaceQuestion | null {
    const counts = Array.from({ length: 5 }, () => randomInt(random, 1, tier === 0 ? 6 : 12))
    const k = pick(random, tier === 0 ? [25, 50, 75] : [10, 25, 40, 50, 60, 75, 90])
    const rows = counts.map((count, value) => ({ value, count }))
    const answer = tablePercentile(rows, k)
    const total = sum(counts)
    const cumulative = counts.map((_, index) => sum(counts.slice(0, index + 1)))
    const modeValue = counts.indexOf(Math.max(...counts))
    const choices = options(random, n(answer), [{ value: n(answer + 1), error: 'neighbour' }, { value: n(answer - 1), error: 'neighbour' }, { value: n(modeValue), error: 'calculation' }, { value: n(answer + 0.5), error: 'neighbour' }, { value: n(answer - 0.5), error: 'neighbour' }], { negative: false })
    const name = k === 50 ? '\\text{Me}' : k === 25 ? 'Q_1' : k === 75 ? 'Q_3' : `p_{${k}}`
    return choices && build(1, 'percentile', say(
        `Taula: ${tableText([0, 1, 2, 3, 4], counts)}. Zein da ${math(name)}?`,
        `Tabla: ${tableText([0, 1, 2, 3, 4], counts)}. ¿Cuánto vale ${math(name)}?`,
        `جدول: ${tableText([0, 1, 2, 3, 4], counts)}. كم يساوي ${math(name)}؟`
    ), choices, n(answer), same(`N=${total}\\quad F_i:\\ ${cumulative.join(',\\ ')}\\quad ${total}\\cdot\\frac{${k}}{100}=${tex((total * k) / 100)}\\to ${name}=${tex(answer)}`), { k, c0: counts[0], c1: counts[1], c2: counts[2], c3: counts[3], c4: counts[4] })
}

function fenceQuestion(random: Random, tier: Tier): StatisticsRaceQuestion | null {
    const q1 = randomInt(random, 2, 30)
    const box = pick(random, tier === 0 ? [2, 4, 6, 10] : [2, 3, 4, 5, 6, 8, 10, 12])
    const q3 = q1 + box
    const upper = random() < 0.5 || tier === 0
    const answer = upper ? q3 + 1.5 * box : q1 - 1.5 * box
    const choices = options(random, n(answer), [{ value: n(upper ? q3 + box : q1 - box), error: 'no-factor' }, { value: n(1.5 * box), error: 'box' }, { value: n(upper ? q1 - 1.5 * box : q3 + 1.5 * box), error: 'other-side' }, ...near(n(answer))], { negative: true })
    return choices && build(1, upper ? 'fence-up' : 'fence-down', say(
        `Kutxa-diagrama batean ${math(`Q_1=${q1}`)} eta ${math(`Q_3=${q3}`)}. Zein da ${upper ? 'goiko' : 'beheko'} biboteen muga?`,
        `En un diagrama de caja ${math(`Q_1=${q1}`)} y ${math(`Q_3=${q3}`)}. ¿Cuál es el límite ${upper ? 'superior' : 'inferior'} de los bigotes?`,
        `في مخطط صندوق ${math(`Q_1=${q1}`)} و${math(`Q_3=${q3}`)}. ما الحد ${upper ? 'الأعلى' : 'الأدنى'} للشاربين؟`
    ), choices, n(answer), same(`${upper ? q3 : q1}${upper ? '+' : '-'}1{,}5\\cdot ${box}=${tex(answer)}`), { q1, q3 })
}

/* ---------- Circuit 2: dispersion ---------- */

function varianceListQuestion(random: Random, tier: Tier): StatisticsRaceQuestion | null {
    const size = tier === 0 ? 4 : 5
    const mean = randomInt(random, 3, 12)
    const deviations = Array.from({ length: size - 1 }, () => randomInt(random, -4, 4))
    deviations.push(-sum(deviations))
    if (Math.abs(deviations[size - 1]) > 6) return null
    const data = deviations.map((deviation) => mean + deviation).sort((a, b) => a - b)
    if (data[0] < 0) return null
    const squares = deviations.map((deviation) => deviation ** 2)
    const variance = sum(squares) / size
    if (variance === 0) return null
    const choices = options(random, n(variance), [{ value: n(sum(deviations.map(Math.abs)) / size), error: 'no-square' }, { value: n(sum(squares)), error: 'no-divide' }, { value: n(Math.sqrt(variance)), error: 'variance' }, ...near(n(variance))])
    return choices && build(2, 'variance-list', say(
        `Kalkulatu bariantza: ${math(data.join(',\\ '))}.`,
        `Calcula la varianza de: ${math(data.join(',\\ '))}.`,
        `احسب تباين: ${math(data.join(',\\ '))}.`
    ), choices, n(variance), same(`\\bar{x}=${mean}\\quad \\sigma^2=\\frac{${squares.join('+')}}{${size}}=${tex(variance)}`), Object.fromEntries(data.map((value, index) => [`d${index}`, value])))
}

function sigmaQuestion(random: Random, tier: Tier): StatisticsRaceQuestion | null {
    const sigma = pick(random, tier === 0 ? [2, 3, 4, 5, 6, 10] : [1.5, 2.5, 0.5, 0.7, 1.2, 7, 8, 9])
    const variance = sigma * sigma
    const choices = options(random, n(sigma), [{ value: n(variance), error: 'variance' }, { value: n(variance / 2), error: 'variance' }, { value: n(variance * variance), error: 'variance' }, ...near(n(sigma), sigma < 2 ? 0.1 : 1)])
    return choices && build(2, 'sigma', say(
        `Banaketa baten bariantza ${math(tex(variance))} da. Zein da desbideratze tipikoa?`,
        `La varianza de una distribución es ${math(tex(variance))}. ¿Cuál es la desviación típica?`,
        `تباين توزيع ${math(tex(variance))}. ما الانحراف المعياري؟`
    ), choices, n(sigma), same(`\\sqrt{${tex(variance)}}=${tex(sigma)}`), { variance })
}

function tableVarianceQuestion(random: Random, tier: Tier): StatisticsRaceQuestion | null {
    const counts = Array.from({ length: 4 }, () => randomInt(random, tier === 0 ? 1 : 0, 6))
    const total = sum(counts)
    if (total < 4) return null
    const fx = sum(counts.map((count, value) => count * value))
    const fx2 = sum(counts.map((count, value) => count * value * value))
    const mean = fx / total
    const variance = fx2 / total - mean * mean
    const choices = options(random, n(variance), [{ value: n(fx2 / total), error: 'mean-square' }, { value: n(fx2 / total - mean), error: 'mean-square' }, { value: n(Math.sqrt(variance)), error: 'variance' }, ...near(n(variance), 0.5)])
    return choices && build(2, 'table-variance', say(
        `Taula: ${tableText([0, 1, 2, 3], counts)}; ${math(`\\sum f_i x_i=${fx}`)} eta ${math(`\\sum f_i x_i^2=${fx2}`)}. Kalkulatu bariantza.`,
        `Tabla: ${tableText([0, 1, 2, 3], counts)}; ${math(`\\sum f_i x_i=${fx}`)} y ${math(`\\sum f_i x_i^2=${fx2}`)}. Calcula la varianza.`,
        `جدول: ${tableText([0, 1, 2, 3], counts)}؛ ${math(`\\sum f_i x_i=${fx}`)} و${math(`\\sum f_i x_i^2=${fx2}`)}. احسب التباين.`
    ), choices, n(variance), same(`\\frac{${fx2}}{${total}}-\\left(\\frac{${fx}}{${total}}\\right)^{2}=${tex(variance)}`), { c0: counts[0], c1: counts[1], c2: counts[2], c3: counts[3] })
}

function cvQuestion(random: Random, tier: Tier): StatisticsRaceQuestion | null {
    const mean = pick(random, tier === 0 ? [10, 20, 50, 100] : [8, 25, 40, 80, 125, 200, 500])
    const sigma = pick(random, tier === 0 ? [1, 2, 5, 10] : [1, 2, 3, 4, 5, 6, 10, 15, 20, 25])
    const cv = (sigma / mean) * 100
    if (sigma >= mean) return null
    const choices = options(random, n(cv), [{ value: n((mean / sigma) * 100), error: 'inverse-ratio' }, { value: n(sigma / mean), error: 'percent' }, { value: n(mean - sigma), error: 'calculation' }, ...near(n(cv))])
    return choices && build(2, 'cv', say(
        `${math(`\\bar{x}=${mean}`)} eta ${math(`\\sigma=${sigma}`)}. Zein da aldakuntza-koefizientea, ehunekotan?`,
        `${math(`\\bar{x}=${mean}`)} y ${math(`\\sigma=${sigma}`)}. ¿Cuál es el coeficiente de variación, en porcentaje?`,
        `${math(`\\bar{x}=${mean}`)} و${math(`\\sigma=${sigma}`)}. ما معامل الاختلاف بالنسبة المئوية؟`
    ), choices, n(cv), same(`\\frac{${sigma}}{${mean}}\\cdot 100=${tex(cv)}`), { mean, sigma })
}

/* ---------- Circuit 3: two variables ---------- */

function estimateQuestion(random: Random, tier: Tier): StatisticsRaceQuestion | null {
    const m = pick(random, tier === 0 ? [2, 3, 0.5, -2] : [1.2, 0.8, -1.5, 2.5, -0.4, 0.25])
    const b = randomInt(random, -10, 30)
    const x = randomInt(random, 2, tier === 0 ? 10 : 40)
    const answer = m * x + b
    const sign = b < 0 ? '-' : '+'
    const choices = options(random, n(answer), [{ value: n(m * x), error: 'no-fixed' }, { value: n(m * x - b), error: 'sign' }, { value: n((x - b) / m), error: 'inverse-ratio' }, ...near(n(answer))], { negative: true })
    return choices && build(3, 'estimate', say(
        `Erregresio-zuzena ${math(`\\hat{y}=${tex(m)}x${sign}${tex(Math.abs(b))}`)} da. Estimatu ${math('y')}, ${math(`x=${x}`)} denean.`,
        `La recta de regresión es ${math(`\\hat{y}=${tex(m)}x${sign}${tex(Math.abs(b))}`)}. Estima ${math('y')} para ${math(`x=${x}`)}.`,
        `مستقيم الانحدار ${math(`\\hat{y}=${tex(m)}x${sign}${tex(Math.abs(b))}`)}. قدّر ${math('y')} عند ${math(`x=${x}`)}.`
    ), choices, n(answer), same(`${tex(m)}\\cdot ${x}${sign}${tex(Math.abs(b))}=${tex(answer)}`), { m, b, x })
}

function throughMeansQuestion(random: Random, tier: Tier): StatisticsRaceQuestion | null {
    const m = pick(random, tier === 0 ? [2, 3, 0.5] : [1.5, 0.4, -2, 1.2, -0.5])
    const xm = randomInt(random, 2, 12)
    const ym = randomInt(random, 5, 40)
    const answer = ym - m * xm
    const choices = options(random, n(answer), [{ value: n(ym + m * xm), error: 'sign' }, { value: n(ym / xm), error: 'inverse-ratio' }, { value: n(ym - m), error: 'no-fixed' }, ...near(n(answer))], { negative: true })
    return choices && build(3, 'through-means', say(
        `Erregresio-zuzenak ${math(`m=${tex(m)}`)} malda du, eta ${math(`\\bar{x}=${xm}`)}, ${math(`\\bar{y}=${ym}`)}. Zenbat da ${math('n')}?`,
        `La recta de regresión tiene pendiente ${math(`m=${tex(m)}`)}, y ${math(`\\bar{x}=${xm}`)}, ${math(`\\bar{y}=${ym}`)}. ¿Cuánto vale ${math('n')}?`,
        `ميل مستقيم الانحدار ${math(`m=${tex(m)}`)}، و${math(`\\bar{x}=${xm}`)}، ${math(`\\bar{y}=${ym}`)}. كم تساوي ${math('n')}؟`
    ), choices, n(answer), same(`n=${ym}-${m < 0 ? `(${tex(m)})` : tex(m)}\\cdot ${xm}=${tex(answer)}`), { m, xm, ym })
}

const clouds = [
    { r: 0.95, text: say('gorantz doa eta puntuak zuzen batetik oso hurbil daude', 'sube y sus puntos están muy cerca de una recta', 'تصعد ونقاطها قريبة جدًا من مستقيم') },
    { r: -0.95, text: say('beherantz doa eta puntuak zuzen batetik oso hurbil daude', 'baja y sus puntos están muy cerca de una recta', 'تهبط ونقاطها قريبة جدًا من مستقيم') },
    { r: 0.5, text: say('gorantz doa, baina puntuak oso sakabanatuta daude', 'sube, pero sus puntos están muy dispersos', 'تصعد لكن نقاطها متشتتة جدًا') },
    { r: -0.5, text: say('beherantz doa, baina puntuak oso sakabanatuta daude', 'baja, pero sus puntos están muy dispersos', 'تهبط لكن نقاطها متشتتة جدًا') },
    { r: 0.05, text: say('ez du joerarik: puntuak toki guztietan daude', 'no tiene tendencia: los puntos están por todas partes', 'لا اتجاه لها: النقاط في كل مكان') }
]

function rQuestion(random: Random): StatisticsRaceQuestion | null {
    const index = randomInt(random, 0, clouds.length - 1)
    const cloud = clouds[index]
    const others: Candidate[] = clouds.filter((_, position) => position !== index).map((other) => ({
        value: n(other.r),
        error: Math.sign(other.r) !== Math.sign(cloud.r) && Math.abs(other.r) === Math.abs(cloud.r) ? 'sign' as const : 'weak' as const
    }))
    const choices = options(random, n(cloud.r), shuffle(random, others), { negative: true })
    return choices && build(3, 'r', say(
        `Hodei bat ${cloud.text.eu}. Zein izan daiteke ${math('r')}?`,
        `Una nube ${cloud.text.es}. ¿Cuál puede ser ${math('r')}?`,
        `سحابة ${cloud.text.ar}. أي قيمة قد تكون ${math('r')}؟`
    ), choices, n(cloud.r), same(`r=${tex(cloud.r)}`), { cloud: index })
}

/* ---------- Circuit 4: probability ---------- */

function unionQuestion(random: Random, tier: Tier): StatisticsRaceQuestion | null {
    const a = pick(random, [0.2, 0.3, 0.4, 0.5, 0.6])
    const b = pick(random, [0.1, 0.2, 0.3, 0.4, 0.5])
    const both = tier === 0 ? 0 : pick(random, [0.05, 0.1, 0.15, 0.2])
    if (both > Math.min(a, b) || a + b - both > 1) return null
    const answer = a + b - both
    const choices = options(random, n(answer), [{ value: n(a + b), error: 'no-common' }, { value: n(a + b - 2 * both), error: 'common' }, { value: n(a * b), error: 'no-common' }, { value: n(1 - answer), error: 'no-complement' }, ...near(n(answer), 0.1)], { probability: true })
    const given = both === 0 ? say('bateraezinak dira', 'son incompatibles', 'متنافيان') : say(`${math(`P(A\\cap B)=${tex(both)}`)}`, `${math(`P(A\\cap B)=${tex(both)}`)}`, `${math(`P(A\\cap B)=${tex(both)}`)}`)
    return choices && build(4, 'union', say(
        `${math(`P(A)=${tex(a)}`)}, ${math(`P(B)=${tex(b)}`)} eta ${given.eu}. Zenbat da ${math('P(A\\cup B)')}?`,
        `${math(`P(A)=${tex(a)}`)}, ${math(`P(B)=${tex(b)}`)} y ${given.es}. ¿Cuánto vale ${math('P(A\\cup B)')}?`,
        `${math(`P(A)=${tex(a)}`)} و${math(`P(B)=${tex(b)}`)} و${given.ar}. كم يساوي ${math('P(A\\cup B)')}؟`
    ), choices, n(answer), same(`${tex(a)}+${tex(b)}-${tex(both)}=${tex(answer)}`), { a, b, both })
}

function drawsQuestion(random: Random, tier: Tier): StatisticsRaceQuestion | null {
    const red = randomInt(random, 2, tier === 0 ? 4 : 7)
    const blue = randomInt(random, 1, tier === 0 ? 3 : 6)
    const total = red + blue
    const answer = fraction(red * (red - 1), total * (total - 1))
    const choices = options(random, answer, [
        { value: fraction(red * red, total * total), error: 'replacement' },
        { value: fraction(red, total), error: 'one-draw' },
        { value: fraction(red - 1, total - 1), error: 'one-draw' },
        { value: fraction(2 * red, total), error: 'calculation' },
        { value: fraction(red * (red - 1), total * total), error: 'replacement' }
    ], { asFraction: true, probability: true })
    return choices && build(4, 'draws', say(
        `Kutxa batean ${math(String(red))} bola gorri eta ${math(String(blue))} urdin daude. Bi atera dira, itzuli gabe. Zein da biak gorriak izateko probabilitatea?`,
        `En una urna hay ${math(String(red))} bolas rojas y ${math(String(blue))} azules. Se sacan dos sin devolver. ¿Cuál es la probabilidad de que las dos sean rojas?`,
        `في جرّة ${math(String(red))} كرات حمراء و${math(String(blue))} زرقاء. تُسحب كرتان دون إرجاع. ما احتمال أن تكونا حمراوين؟`
    ), choices, answer, same(`\\frac{${red}}{${total}}\\cdot\\frac{${red - 1}}{${total - 1}}=${written(answer, true)}`), { red, blue })
}

function conditionalQuestion(random: Random, tier: Tier): StatisticsRaceQuestion | null {
    const cells = Array.from({ length: 4 }, () => randomInt(random, 2, tier === 0 ? 12 : 40))
    const [boysGlasses, girlsGlasses, boysWithout, girlsWithout] = cells
    const girls = girlsGlasses + girlsWithout
    const glasses = boysGlasses + girlsGlasses
    const total = sum(cells)
    const answer = fraction(girlsGlasses, girls)
    const choices = options(random, answer, [
        { value: fraction(girlsGlasses, glasses), error: 'reversed' },
        { value: fraction(girlsGlasses, total), error: 'joint' },
        { value: fraction(glasses, total), error: 'joint' },
        { value: fraction(girlsWithout, girls), error: 'calculation' }
    ], { asFraction: true, probability: true })
    return choices && build(4, 'conditional', say(
        `Mutilak: ${math(String(boysGlasses))} betaurrekoekin eta ${math(String(boysWithout))} gabe. Neskak: ${math(String(girlsGlasses))} betaurrekoekin eta ${math(String(girlsWithout))} gabe. Neska dela jakinda, zein da betaurrekoak eramateko probabilitatea?`,
        `Chicos: ${math(String(boysGlasses))} con gafas y ${math(String(boysWithout))} sin gafas. Chicas: ${math(String(girlsGlasses))} con gafas y ${math(String(girlsWithout))} sin gafas. Sabiendo que es chica, ¿cuál es la probabilidad de que lleve gafas?`,
        `الأولاد: ${math(String(boysGlasses))} بنظارات و${math(String(boysWithout))} بلا نظارات. البنات: ${math(String(girlsGlasses))} بنظارات و${math(String(girlsWithout))} بلا نظارات. علمًا أنها بنت، ما احتمال أن تلبس نظارات؟`
    ), choices, answer, same(`\\frac{${girlsGlasses}}{${girlsGlasses}+${girlsWithout}}=${written(answer, true)}`), { boysGlasses, girlsGlasses, boysWithout, girlsWithout })
}

function atLeastQuestion(random: Random, tier: Tier): StatisticsRaceQuestion | null {
    const k = pick(random, tier === 0 ? [2, 3, 4] : [3, 4, 5, 6])
    const answer = fraction(k * k - (k - 1) * (k - 1), k * k)
    const choices = options(random, answer, [
        { value: fraction(2, k), error: 'double' },
        { value: fraction((k - 1) * (k - 1), k * k), error: 'no-complement' },
        { value: fraction(1, k * k), error: 'no-complement' },
        { value: fraction(1, k), error: 'calculation' }
    ], { asFraction: true, probability: true })
    return choices && build(4, 'at-least', say(
        `Erruleta batek ${math(String(k))} sektore berdin ditu, bat gorria. Bi aldiz biratzen da. Zein da gutxienez behin gorria ateratzeko probabilitatea?`,
        `Una ruleta tiene ${math(String(k))} sectores iguales, uno rojo. Se gira dos veces. ¿Cuál es la probabilidad de sacar rojo al menos una vez?`,
        `لدولاب ${math(String(k))} قطاعات متساوية، أحدها أحمر. يُدار مرتين. ما احتمال ظهور الأحمر مرة واحدة على الأقل؟`
    ), choices, answer, same(`1-\\frac{${k - 1}}{${k}}\\cdot\\frac{${k - 1}}{${k}}=${written(answer, true)}`), { k })
}

type Generator = (random: Random, tier: Tier) => StatisticsRaceQuestion | null

const circuitGenerators: Generator[][] = [
    [widthQuestion, markQuestion, sectorQuestion, relativeQuestion],
    [groupedMeanQuestion, percentileQuestion, percentileQuestion, fenceQuestion],
    [varianceListQuestion, sigmaQuestion, tableVarianceQuestion, cvQuestion],
    [estimateQuestion, estimateQuestion, throughMeansQuestion, rQuestion],
    [unionQuestion, drawsQuestion, conditionalQuestion, atLeastQuestion]
]

export function generateStatisticsRaceQuestion(random: Random, circuit: number, tier: Tier): StatisticsRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkStatisticsPitAnswer(question: RaceQuestion<StatisticsRaceError>, input: string): AnswerCheck {
    return checkAnswer(readStatisticsAnswer(input), question.answer, question.answerForm)
}

export function statisticsParTime(circuit: number): number {
    return parTimeFor([11, 13, 12, 11, 13][circuit] ?? 12)
}

export const statisticsRaceErrorTips: Record<StatisticsRaceError, LocalizedText> = {
    range: say('Hori ibiltartea da (edo r′); zabalera r′ zati tarte kopurua da.', 'Eso es el recorrido (o r′); la amplitud es r′ entre el número de intervalos.', 'هذا المدى (أو r′)؛ وطول الفئة r′ على عدد الفئات.'),
    count: say('Hori tarte kopurua da, ez zabalera.', 'Ese es el número de intervalos, no la amplitud.', 'هذا عدد الفئات لا طولها.'),
    limit: say('Hori tartearen muga da; klase-marka erdiko puntua da.', 'Eso es un extremo del intervalo; la marca de clase es el punto medio.', 'هذا حدّ الفئة؛ ومركز الفئة نقطتها الوسطى.'),
    width: say('Hori tartearen zabalera da, ez klase-marka.', 'Esa es la amplitud del intervalo, no la marca de clase.', 'هذا طول الفئة لا مركزها.'),
    'percent-degrees': say('Angelua: zatia bider 360°, ez 100.', 'Ángulo: la parte por 360°, no por 100.', 'الزاوية: الجزء في 360° لا في 100.'),
    percent: say('Ehunekoa eta maiztasun erlatiboa ez dira gauza bera: % 15 = 0,15.', 'El porcentaje y la frecuencia relativa no son lo mismo: 15 % = 0,15.', 'النسبة المئوية والتكرار النسبي ليسا الشيء نفسه: 15 % = 0.15.'),
    'ignore-frequency': say('Klase-marka bakoitza bere maiztasunaz biderkatu behar da.', 'Hay que multiplicar cada marca de clase por su frecuencia.', 'يجب ضرب كل مركز فئة في تكراره.'),
    neighbour: say('Bilatu N · k / 100 postua maiztasun metatuetan: osoa bada, posizio horretako eta hurrengoaren batez bestekoa.', 'Busca la posición N · k / 100 en las acumuladas: si es entera, la media de esa posición y la siguiente.', 'ابحث عن الموقع N · k / 100 في المتجمّعة: إذا كان صحيحًا فمتوسط ذلك الموقع والذي يليه.'),
    'no-factor': say('Biboteak kutxa bider 1,5 dira, ez kutxa bera.', 'Los bigotes son 1,5 veces la caja, no la caja.', 'الشاربان 1.5 مرة الصندوق، لا الصندوق نفسه.'),
    box: say('Hori luzapena da; gehitu Q₃-ri edo kendu Q₁-i.', 'Eso es el alargamiento; súmalo a Q₃ o réstalo a Q₁.', 'هذا الامتداد؛ أضفه إلى Q₃ أو اطرحه من Q₁.'),
    'other-side': say('Beste aldeko muga da hori.', 'Ese es el límite del otro lado.', 'هذا حدّ الجهة الأخرى.'),
    'no-square': say('Desbideratzeak karratura jaso behar dira.', 'Las desviaciones hay que elevarlas al cuadrado.', 'يجب تربيع الانحرافات.'),
    'no-divide': say('Karratuen batura zati datu kopurua.', 'La suma de cuadrados, entre el número de datos.', 'مجموع المربعات على عدد البيانات.'),
    variance: say('σ² eta σ nahastu dituzu: σ = √σ².', 'Has mezclado σ² y σ: σ = √σ².', 'خلطت بين σ² وσ: σ = √σ².'),
    'mean-square': say('Bariantza = Σ fᵢxᵢ² : N − x̄²: batez bestekoaren karratua kendu.', 'Varianza = Σ fᵢxᵢ² : N − x̄²: resta el cuadrado de la media.', 'التباين = Σ fᵢxᵢ² : N − x̄²: اطرح مربع المتوسط.'),
    'inverse-ratio': say('Zatiketa alderantziz: CV = σ : x̄.', 'División al revés: CV = σ : x̄.', 'قسمة معكوسة: CV = σ : x̄.'),
    'no-fixed': say('Ez ahaztu zuzenaren n zatia.', 'No olvides la parte n de la recta.', 'لا تنسَ الجزء n من المستقيم.'),
    sign: say('Kontuz zeinuarekin: n = ȳ − m · x̄.', 'Cuidado con el signo: n = ȳ − m · x̄.', 'انتبه للإشارة: n = ȳ − m · x̄.'),
    weak: say('Zeinua: hodeia gora ala behera. Balio absolutua: zenbat eta hurbilago zuzenetik, orduan eta 1etik hurbilago.', 'El signo: la nube sube o baja. El valor absoluto: cuanto más cerca de una recta, más cerca de 1.', 'الإشارة: السحابة تصعد أو تهبط. والقيمة المطلقة: كلما اقتربت من مستقيم اقتربت من 1.'),
    'no-common': say('Bateragarriak badira, kendu P(A ∩ B) behin.', 'Si son compatibles, resta P(A ∩ B) una vez.', 'إذا كانا متوافقين فاطرح P(A ∩ B) مرة.'),
    common: say('Zati komuna behin bakarrik kendu.', 'La parte común se resta una sola vez.', 'يُطرح الجزء المشترك مرة واحدة.'),
    replacement: say('Itzuli gabe, bigarrenean bola bat gutxiago dago.', 'Sin devolver, en la segunda hay una bola menos.', 'دون إرجاع تكون في السحبة الثانية كرة أقل.'),
    'one-draw': say('Bi ateraldi dira: biderkatu bi adarrak.', 'Son dos extracciones: multiplica las dos ramas.', 'سحبتان: اضرب الفرعين.'),
    joint: say('Baldintzatuan, kasu posibleak baldintzarenak bakarrik dira.', 'En la condicionada, los casos posibles son solo los de la condición.', 'في المشروط الحالات الممكنة هي حالات الشرط فقط.'),
    reversed: say('Alderantziz irakurri duzu: P(A / B) = P(A ∩ B) : P(B).', 'Lo has leído al revés: P(A / B) = P(A ∩ B) : P(B).', 'قرأته بالعكس: P(A / B) = P(A ∩ B) : P(B).'),
    double: say('Probabilitateak ez dira batzen aldi bakoitzean: erabili aurkakoa.', 'Las probabilidades no se suman en cada intento: usa el contrario.', 'لا تُجمع الاحتمالات في كل محاولة: استعمل المعاكس.'),
    'no-complement': say('«Gutxienez behin» = 1 − P(behin ere ez).', '«Al menos una vez» = 1 − P(ninguna vez).', '«مرة على الأقل» = 1 − P(ولا مرة).'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.')
}
