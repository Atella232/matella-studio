import { checkAnswer, fraction, toExactDecimal, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { readStatisticsAnswer } from '../../dbh2-estatistika-v2/answers.ts'
import { percentile, tablePercentile } from '../../dbh4-aplikatuak-estatistika/stats.ts'

/* ==========================================================================
   Estatistikaren lasterketa (4. DBH akademikoak): five circuits, one per
   stage — data (a stratum of a stratified sample, the j-th element of a
   systematic sample, a cumulative frequency), centralization (the mean of
   a table, the mean of two joined groups, the datum that is missing),
   position (a quartile by position, the limit of the whiskers, a
   percentile from a table), dispersion (the mean deviation, σ² from the
   sums, the CV) and two variables (an estimate, the intercept through the
   point of the means, the x for a given y). Wrong options are typical
   mistakes: the whole stratum, the start forgotten, a frequency that is
   not cumulative, the unweighted mean, the mean for the sum, the other
   quartile, the 1,5 forgotten, the sum not divided, x̄² forgotten, σ / x̄
   turned over, the intercept forgotten, substituting y for x… Every
   answer is one number, so every question can be written at the pit
   stop; every question carries `meta`, the numbers of its prompt, so the
   test recomputes the answer.
   ========================================================================== */

export const STATISTICS_AK_RACE_CIRCUITS = 5

export type StatisticsAkRaceError =
    | 'stratum'
    | 'complement'
    | 'off-by-one'
    | 'no-start'
    | 'not-cumulative'
    | 'total'
    | 'unweighted'
    | 'divide-values'
    | 'mean'
    | 'no-subtract'
    | 'other-quartile'
    | 'median'
    | 'position'
    | 'no-factor'
    | 'other-side'
    | 'neighbour'
    | 'no-divide'
    | 'square'
    | 'signed'
    | 'mean-square'
    | 'no-square'
    | 'sigma'
    | 'inverse-ratio'
    | 'no-intercept'
    | 'no-x'
    | 'swap'
    | 'sign'
    | 'substitute'
    | 'calculation'

export type StatisticsAkRaceQuestion = RaceQuestion<StatisticsAkRaceError> & { meta: Record<string, number> }

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (latex: string): LocalizedText => ({ eu: `$${latex}$`, es: `$${latex}$`, en: `$${latex}$`, ar: `$${latex.replace(/\{,\}/g, '.')}$` })
const math = (latex: string) => `$${latex}$`
const sum = (values: number[]) => values.reduce((total, value) => total + value, 0)

/** A value in LaTeX: an exact decimal with at most two decimals */
function written(value: FractionValue): string | null {
    const text = toExactDecimal(value, ',')
    if (text === null || (text.split(',')[1] ?? '').length > 2) return null
    return text.replace(',', '{,}')
}
// + 0 turns −0 into 0
const n = (value: number) => fraction(Math.round(value * 10000) + 0, 10000)
const tex = (value: number) => written(n(value)) ?? String(value)
/** A list of data for the prompt: 3, 5, 8 (one formula each, so a long list wraps) */
const listText = (values: number[]) => values.map((value) => math(tex(value))).join(', ')
/** A frequency table for the prompt: 0 → 3, 1 → 6… (one formula per entry) */
const tableText = (counts: number[], first = 0) => counts.map((count, index) => math(`${index + first}\\to ${count}`)).join(', ')

interface Candidate {
    value: FractionValue
    error: StatisticsAkRaceError
}

const wrong = (value: number, error: StatisticsAkRaceError): Candidate => ({ value: n(value), error })
const near = (value: number, step = 1): Candidate[] => [value + step, value - step, value + 2 * step, value - 2 * step].map((item) => wrong(item, 'calculation'))

/** The right option and three different mistakes */
function options(random: Random, right: number, candidates: Candidate[], negative = false): RaceOption<StatisticsAkRaceError>[] | null {
    const rightLatex = written(n(right))
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const picked: Array<{ latex: string; error: StatisticsAkRaceError }> = []
    for (const candidate of candidates) {
        if (picked.length === 3) break
        const value = candidate.value.numerator / candidate.value.denominator
        if (!Number.isFinite(value) || (!negative && value < 0)) continue
        const latex = written(candidate.value)
        if (latex === null || latex === '-0' || used.has(latex)) continue
        used.add(latex)
        picked.push({ latex, error: candidate.error })
    }
    if (picked.length < 3) return null
    return shuffle(random, [{ latex: rightLatex, correct: true, error: null }, ...picked.map((item) => ({ latex: item.latex, correct: false, error: item.error }))])
}

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<StatisticsAkRaceError>[] | null, answer: number, solution: string, meta: Record<string, number>): StatisticsAkRaceQuestion | null {
    if (!choices) return null
    return { circuit, kind, prompt, options: choices, answer: n(answer), answerForm: 'any', percentAnswer: false, writable: true, solution: same(solution), meta }
}

/* ---------- Circuit 0: data and tables ---------- */

function stratumQuestion(random: Random, tier: Tier): StatisticsAkRaceQuestion | null {
    const step = pick(random, tier === 0 ? [10, 5] : [10, 5, 20, 4])
    const share = randomInt(random, 3, 20)
    const sample = share + randomInt(random, 10, 50)
    const students = step * share
    const total = step * sample
    return build(0, 'stratum', say(
        `Ikastetxe batek ${math(String(total))} ikasle ditu, eta maila batek ${math(String(students))}. ${math(String(sample))} ikasleko lagin geruzatu batean, zenbat dira maila horretakoak?`,
        `Un centro tiene ${math(String(total))} alumnos y un curso, ${math(String(students))}. En una muestra estratificada de ${math(String(sample))}, ¿cuántos son de ese curso?`,
        `في مدرسة ${math(String(total))} تلميذًا، وفي أحد الصفوف ${math(String(students))}. في عيّنة طبقية من ${math(String(sample))}، كم تلميذًا من ذلك الصف؟`, `A school has ${math(String(total))} students and one year group has ${math(String(students))} of them. In a stratified sample of ${math(String(sample))}, how many are from that year group?`
    ), options(random, share, [wrong(students, 'stratum'), wrong(sample - share, 'complement'), ...near(share)]), share, `${sample}\\cdot\\frac{${students}}{${total}}=${share}`, { students, total, sample })
}

function systematicQuestion(random: Random, tier: Tier): StatisticsAkRaceQuestion | null {
    const sample = pick(random, [20, 25, 40, 50])
    const k = pick(random, tier === 0 ? [5, 10] : [4, 5, 8, 10, 12, 20])
    const total = sample * k
    const first = randomInt(random, 1, k)
    const j = randomInt(random, 3, 8)
    const right = first + (j - 1) * k
    return build(0, 'systematic', say(
        `${math(String(total))} elementutik ${math(String(sample))} elementuko lagin sistematikoa hartzen da, eta lehen aukeratua ${math(String(first))} zenbakia da. Zein zenbaki du ${math(String(j))}. aukeratuak?`,
        `De ${math(String(total))} elementos se toma una muestra sistemática de ${math(String(sample))}, y el primero es el ${math(String(first))}. ¿Cuál es el elegido número ${math(String(j))}?`,
        `من ${math(String(total))} عنصرًا نأخذ عيّنة منتظمة من ${math(String(sample))}، وأول عنصر هو ${math(String(first))}. ما العنصر المختار رقم ${math(String(j))}؟`, `From ${math(String(total))} elements, a systematic sample of ${math(String(sample))} is taken, and the first element chosen is ${math(String(first))}. Which element is chosen number ${math(String(j))}?`
    ), options(random, right, [wrong(first + j * k, 'off-by-one'), wrong(j * k, 'no-start'), ...near(right)]), right, `k=\\frac{${total}}{${sample}}=${k}\\qquad ${first}+${j - 1}\\cdot ${k}=${right}`, { total, sample, first, j })
}

function cumulativeQuestion(random: Random): StatisticsAkRaceQuestion | null {
    const counts = [0, 1, 2, 3].map(() => randomInt(random, 1, 9))
    const value = randomInt(random, 1, 2)
    const right = sum(counts.slice(0, value + 1))
    return build(0, 'cumulative', say(
        `Taula: ${tableText(counts)}. Zein da ${math(String(value))} balioaren maiztasun absolutu metatua?`,
        `Tabla: ${tableText(counts)}. ¿Cuál es la frecuencia absoluta acumulada del valor ${math(String(value))}?`,
        `جدول: ${tableText(counts)}. ما التكرار المطلق المتجمّع للقيمة ${math(String(value))}؟`, `Table: ${tableText(counts)}. What is the absolute cumulative frequency of the value ${math(String(value))}?`
    ), options(random, right, [wrong(counts[value], 'not-cumulative'), wrong(sum(counts), 'total'), wrong(sum(counts.slice(0, value)), 'off-by-one'), ...near(right)]), right, `F=${counts.slice(0, value + 1).join('+')}=${right}`, { f0: counts[0], f1: counts[1], f2: counts[2], f3: counts[3], value })
}

/* ---------- Circuit 1: centralization ---------- */

function tableMeanQuestion(random: Random, tier: Tier): StatisticsAkRaceQuestion | null {
    const counts = [1, 2, 3, 4].map(() => randomInt(random, 1, tier === 0 ? 6 : 9))
    const total = sum(counts)
    const weighted = sum(counts.map((count, index) => count * (index + 1)))
    const right = weighted / total
    return build(1, 'table-mean', say(
        `Taula: ${tableText(counts, 1)}. Kalkulatu batez bestekoa.`,
        `Tabla: ${tableText(counts, 1)}. Calcula la media.`,
        `جدول: ${tableText(counts, 1)}. احسب المتوسط.`, `Table: ${tableText(counts, 1)}. Calculate the mean.`
    ), options(random, right, [wrong(2.5, 'unweighted'), wrong(weighted / 4, 'divide-values'), ...near(right, 0.5)]), right, `\\frac{${weighted}}{${total}}=${tex(right)}`, { f1: counts[0], f2: counts[1], f3: counts[2], f4: counts[3] })
}

function joinedQuestion(random: Random): StatisticsAkRaceQuestion | null {
    const n1 = randomInt(random, 5, 30)
    const n2 = randomInt(random, 5, 30)
    const m1 = randomInt(random, 8, 18) / 2
    const m2 = randomInt(random, 8, 18) / 2
    if (n1 === n2 || m1 === m2) return null
    const right = (n1 * m1 + n2 * m2) / (n1 + n2)
    return build(1, 'joined', say(
        `${math(String(n1))} ikasleren batez bestekoa ${math(tex(m1))} da, eta beste ${math(String(n2))} ikasleena ${math(tex(m2))}. Zein da guztien batez bestekoa?`,
        `La media de ${math(String(n1))} alumnos es ${math(tex(m1))} y la de otros ${math(String(n2))}, ${math(tex(m2))}. ¿Cuál es la media de todos?`,
        `متوسط ${math(String(n1))} تلميذًا هو ${math(tex(m1))}، ومتوسط ${math(String(n2))} آخرين ${math(tex(m2))}. ما متوسط الجميع؟`, `The mean of ${math(String(n1))} students is ${math(tex(m1))} and the mean of another ${math(String(n2))} students is ${math(tex(m2))}. What is the mean of all the students?`
    ), options(random, right, [wrong((m1 + m2) / 2, 'unweighted'), ...near(right, 0.5)]), right, `\\frac{${n1}\\cdot ${tex(m1)}+${n2}\\cdot ${tex(m2)}}{${n1 + n2}}=${tex(right)}`, { n1, m1, n2, m2 })
}

function missingQuestion(random: Random, tier: Tier): StatisticsAkRaceQuestion | null {
    const count = randomInt(random, 4, tier === 0 ? 4 : 6)
    const mean = randomInt(random, 5, 9)
    const known = Array.from({ length: count - 1 }, () => randomInt(random, 3, 12))
    const right = count * mean - sum(known)
    if (right < 0 || right > 15) return null
    return build(1, 'missing', say(
        `${math(String(count))} daturen batez bestekoa ${math(String(mean))} da. Horietako ${math(String(count - 1))} hauek dira: ${listText(known)}. Zein da falta dena?`,
        `La media de ${math(String(count))} datos es ${math(String(mean))}. ${math(String(count - 1))} de ellos son ${listText(known)}. ¿Cuál falta?`,
        `متوسط ${math(String(count))} بيانات هو ${math(String(mean))}. ${math(String(count - 1))} منها: ${listText(known)}. ما البيان الناقص؟`, `The mean of ${math(String(count))} values is ${math(String(mean))}. ${math(String(count - 1))} of them are ${listText(known)}. Which value is missing?`
    ), options(random, right, [wrong(mean, 'mean'), wrong(count * mean, 'no-subtract'), ...near(right)]), right, `${count}\\cdot ${mean}-${sum(known)}=${right}`, { count, mean, known: sum(known) })
}

/* ---------- Circuit 2: position ---------- */

function quartileQuestion(random: Random, tier: Tier): StatisticsAkRaceQuestion | null {
    const size = randomInt(random, 8, tier === 0 ? 10 : 15)
    const data = Array.from({ length: size }, () => randomInt(random, 1, 20)).sort((a, b) => a - b)
    const k = pick(random, [25, 75])
    const right = percentile(data, k)
    const other = percentile(data, 100 - k)
    const position = (size * k) / 100
    const name = k === 25 ? 'Q_1' : 'Q_3'
    const meta: Record<string, number> = { k, size }
    data.forEach((value, index) => { meta[`d${index}`] = value })
    return build(2, 'quartile', say(
        `Aurkitu ${math(name)}: ${listText(data)}.`,
        `Halla ${math(name)} de: ${listText(data)}.`,
        `أوجد ${math(name)} لـ: ${listText(data)}.`, `Find ${math(name)} of: ${listText(data)}.`
    ), options(random, right, [wrong(other, 'other-quartile'), wrong(percentile(data, 50), 'median'), wrong(data[Math.min(size - 1, Math.floor(position))], 'position'), wrong(data[Math.max(0, Math.ceil(position) - 2)], 'position'), ...near(right)]), right, `${size}\\cdot ${tex(k / 100)}=${tex(position)}\\ \\to\\ ${name}=${tex(right)}`, meta)
}

function fenceQuestion(random: Random, tier: Tier): StatisticsAkRaceQuestion | null {
    const q1 = randomInt(random, 10, 40)
    const iqr = 2 * randomInt(random, 1, tier === 0 ? 5 : 10)
    const q3 = q1 + iqr
    const upper = random() < 0.6 ? 1 : 0
    const right = upper ? q3 + 1.5 * iqr : q1 - 1.5 * iqr
    const limit = upper ? say('goiko muga', 'límite superior', 'الحدّ العلوي', 'upper limit') : say('beheko muga', 'límite inferior', 'الحدّ السفلي', 'lower limit')
    return build(2, 'fence', say(
        `${math(`Q_1=${q1}`)} eta ${math(`Q_3=${q3}`)}. Zein da biboteen ${limit.eu}?`,
        `${math(`Q_1=${q1}`)} y ${math(`Q_3=${q3}`)}. ¿Cuál es el ${limit.es} de los bigotes?`,
        `${math(`Q_1=${q1}`)} و${math(`Q_3=${q3}`)}. ما ${limit.ar} للشاربين؟`, `${math(`Q_1=${q1}`)} and ${math(`Q_3=${q3}`)}. What is the ${limit.en} of the whiskers?`
    ), options(random, right, [wrong(upper ? q3 + iqr : q1 - iqr, 'no-factor'), wrong(upper ? q1 - 1.5 * iqr : q3 + 1.5 * iqr, 'other-side'), ...near(right)], true), right, upper ? `${q3}+1{,}5\\cdot ${iqr}=${tex(right)}` : `${q1}-1{,}5\\cdot ${iqr}=${tex(right)}`, { q1, q3, upper })
}

function percentileQuestion(random: Random): StatisticsAkRaceQuestion | null {
    const counts = [0, 1, 2, 3, 4].map(() => randomInt(random, 1, 12))
    const total = sum(counts)
    if (![20, 25, 40, 50].includes(total)) return null
    const k = pick(random, [10, 20, 30, 40, 60, 70, 80, 90])
    const right = tablePercentile(counts.map((count, value) => ({ value, count })), k)
    const cumulative = counts.map((_, index) => (sum(counts.slice(0, index + 1)) / total) * 100)
    return build(2, 'percentile', say(
        `Taula (${math(`N=${total}`)}): ${tableText(counts)}. Zein da ${math(`p_{${k}}`)}?`,
        `Tabla (${math(`N=${total}`)}): ${tableText(counts)}. ¿Cuál es ${math(`p_{${k}}`)}?`,
        `جدول (${math(`N=${total}`)}): ${tableText(counts)}. ما ${math(`p_{${k}}`)}؟`, `Table (${math(`N=${total}`)}): ${tableText(counts)}. What is ${math(`p_{${k}}`)}?`
    ), options(random, right, [wrong(right - 1, 'neighbour'), wrong(right + 1, 'neighbour'), wrong(right + 0.5, 'neighbour'), wrong(right - 0.5, 'neighbour'), wrong(right + 2, 'calculation'), wrong(right - 2, 'calculation')]), right, `${cumulative.map((value) => tex(value)).join(';\\ ')}\\ \\to\\ p_{${k}}=${tex(right)}`, { k, c0: counts[0], c1: counts[1], c2: counts[2], c3: counts[3], c4: counts[4] })
}

/* ---------- Circuit 3: dispersion ---------- */

function meanDeviationQuestion(random: Random, tier: Tier): StatisticsAkRaceQuestion | null {
    const size = pick(random, tier === 0 ? [4] : [4, 5])
    const mean = randomInt(random, 4, 9)
    const data = Array.from({ length: size - 1 }, () => randomInt(random, 1, 15))
    const last = size * mean - sum(data)
    if (last < 0 || last > 20) return null
    data.push(last)
    const distances = data.map((value) => Math.abs(value - mean))
    const right = sum(distances) / size
    if (right === 0) return null
    const variance = sum(distances.map((value) => value * value)) / size
    const meta: Record<string, number> = { size }
    data.forEach((value, index) => { meta[`d${index}`] = value })
    return build(3, 'mean-deviation', say(
        `Kalkulatu batez besteko desbideratzea: ${listText(data)} (${math(`\\bar{x}=${mean}`)}).`,
        `Calcula la desviación media de: ${listText(data)} (${math(`\\bar{x}=${mean}`)}).`,
        `احسب الانحراف المتوسط لـ: ${listText(data)} (${math(`\\bar{x}=${mean}`)}).`, `Calculate the mean deviation of: ${listText(data)} (${math(`\\bar{x}=${mean}`)}).`
    ), options(random, right, [wrong(sum(distances), 'no-divide'), wrong(variance, 'square'), wrong(0, 'signed'), ...near(right, 0.5)]), right, `\\frac{${distances.join('+')}}{${size}}=${tex(right)}`, meta)
}

function varianceQuestion(random: Random, tier: Tier): StatisticsAkRaceQuestion | null {
    const size = pick(random, [10, 20, 25, 40, 50])
    const mean = randomInt(random, 2, 9)
    const variance = randomInt(random, 1, tier === 0 ? 9 : 16)
    const sx = size * mean
    const sx2 = size * (variance + mean * mean)
    const root = Math.sqrt(variance)
    return build(3, 'variance', say(
        `Taula batean ${math(`N=${size}`)}, ${math(`\\sum f_i x_i=${sx}`)} eta ${math(`\\sum f_i x_i^2=${sx2}`)}. Zein da ${math('\\sigma^2')}?`,
        `En una tabla ${math(`N=${size}`)}, ${math(`\\sum f_i x_i=${sx}`)} y ${math(`\\sum f_i x_i^2=${sx2}`)}. ¿Cuál es ${math('\\sigma^2')}?`,
        `في جدول ${math(`N=${size}`)} و${math(`\\sum f_i x_i=${sx}`)} و${math(`\\sum f_i x_i^2=${sx2}`)}. ما ${math('\\sigma^2')}؟`, `In a table, ${math(`N=${size}`)}, ${math(`\\sum f_i x_i=${sx}`)} and ${math(`\\sum f_i x_i^2=${sx2}`)}. What is ${math('\\sigma^2')}?`
    ), options(random, variance, [wrong(sx2 / size, 'mean-square'), wrong(sx2 / size - mean, 'no-square'), ...(Number.isInteger(root) && root !== variance ? [wrong(root, 'sigma')] : []), ...near(variance)]), variance, `\\frac{${sx2}}{${size}}-${mean}^{2}=${variance}`, { size, sx, sx2 })
}

function cvQuestion(random: Random, tier: Tier): StatisticsAkRaceQuestion | null {
    const mean = pick(random, tier === 0 ? [20, 50] : [20, 25, 40, 50, 80])
    const sigma = randomInt(random, 1, 12)
    const right = (100 * sigma) / mean
    return build(3, 'cv', say(
        `${math(`\\bar{x}=${mean}`)} eta ${math(`\\sigma=${sigma}`)}. Zein da CV ehunekotan?`,
        `${math(`\\bar{x}=${mean}`)} y ${math(`\\sigma=${sigma}`)}. ¿Cuál es el CV en porcentaje?`,
        `${math(`\\bar{x}=${mean}`)} و${math(`\\sigma=${sigma}`)}. ما CV بالنسبة المئوية؟`, `${math(`\\bar{x}=${mean}`)} and ${math(`\\sigma=${sigma}`)}. What is the CV as a percentage?`
    ), options(random, right, [wrong((100 * mean) / sigma, 'inverse-ratio'), wrong(sigma, 'sigma'), ...near(right)]), right, `\\frac{${sigma}}{${mean}}\\cdot 100=${tex(right)}`, { sigma, mean })
}

/* ---------- Circuit 4: two variables ---------- */

const SLOPES = [0.5, 1.5, 2, 2.5, 3, -0.5, -1.5, -2]
/** m·x written as 0{,}5x, -2x or x */
const term = (m: number) => `${m === 1 ? '' : m === -1 ? '-' : tex(m)}x`
const plus = (value: number) => (value === 0 ? '' : value > 0 ? `+${tex(value)}` : tex(value))

function estimateQuestion(random: Random, tier: Tier): StatisticsAkRaceQuestion | null {
    const m = pick(random, tier === 0 ? SLOPES.slice(0, 5) : SLOPES)
    const intercept = randomInt(random, -5, 20)
    const x = randomInt(random, 2, 12)
    const right = m * x + intercept
    return build(4, 'estimate', say(
        `Erregresio-zuzena ${math(`\\hat{y}=${term(m)}${plus(intercept)}`)} da. Estimatu ${math('y')} ${math(`x=${x}`)} denean.`,
        `La recta de regresión es ${math(`\\hat{y}=${term(m)}${plus(intercept)}`)}. Estima ${math('y')} para ${math(`x=${x}`)}.`,
        `مستقيم الانحدار ${math(`\\hat{y}=${term(m)}${plus(intercept)}`)}. قدّر ${math('y')} عندما ${math(`x=${x}`)}.`, `The regression line is ${math(`\\hat{y}=${term(m)}${plus(intercept)}`)}. Estimate ${math('y')} for ${math(`x=${x}`)}.`
    ), options(random, right, [wrong(m * x, 'no-intercept'), wrong(intercept * x + m, 'swap'), ...near(right)], true), right, `${tex(m)}\\cdot ${x}${plus(intercept)}=${tex(right)}`, { m, n: intercept, x })
}

function interceptQuestion(random: Random): StatisticsAkRaceQuestion | null {
    const m = pick(random, SLOPES)
    const mx = randomInt(random, 2, 10)
    const my = randomInt(random, 5, 30)
    const right = my - m * mx
    return build(4, 'intercept', say(
        `Erregresio-zuzenaren malda ${math(tex(m))} da, eta ${math(`(\\bar{x},\\bar{y})=(${mx},\\ ${my})`)} puntutik pasatzen da. Zenbat da ${math('n')}, ${math('\\hat{y}=mx+n')} zuzenean?`,
        `La recta de regresión tiene pendiente ${math(tex(m))} y pasa por ${math(`(\\bar{x},\\bar{y})=(${mx},\\ ${my})`)}. ¿Cuánto vale ${math('n')} en ${math('\\hat{y}=mx+n')}?`,
        `ميل مستقيم الانحدار ${math(tex(m))} ويمرّ بـ ${math(`(\\bar{x},\\bar{y})=(${mx},\\ ${my})`)}. كم قيمة ${math('n')} في ${math('\\hat{y}=mx+n')}؟`, `The regression line has slope ${math(tex(m))} and passes through ${math(`(\\bar{x},\\bar{y})=(${mx},\\ ${my})`)}. What is ${math('n')} in ${math('\\hat{y}=mx+n')}?`
    ), options(random, right, [wrong(my + m * mx, 'sign'), wrong(my - m, 'no-x'), ...near(right)], true), right, `${my}-${m < 0 ? `(${tex(m)})` : tex(m)}\\cdot ${mx}=${tex(right)}`, { m, mx, my })
}

function inverseQuestion(random: Random, tier: Tier): StatisticsAkRaceQuestion | null {
    const m = pick(random, tier === 0 ? [2, 4, 5] : [0.5, 2, 2.5, 4, 5])
    const x = randomInt(random, 2, 12)
    const intercept = randomInt(random, 1, 20)
    const y = m * x + intercept
    return build(4, 'inverse', say(
        `Erregresio-zuzena ${math(`\\hat{y}=${term(m)}+${intercept}`)} da. Zein ${math('x')} baliorekin estimatzen da ${math(`y=${tex(y)}`)}?`,
        `La recta de regresión es ${math(`\\hat{y}=${term(m)}+${intercept}`)}. ¿Con qué ${math('x')} se estima ${math(`y=${tex(y)}`)}?`,
        `مستقيم الانحدار ${math(`\\hat{y}=${term(m)}+${intercept}`)}. مع أي ${math('x')} نقدّر ${math(`y=${tex(y)}`)}؟`, `The regression line is ${math(`\\hat{y}=${term(m)}+${intercept}`)}. For what ${math('x')} is the estimate ${math(`y=${tex(y)}`)}?`
    ), options(random, x, [wrong(m * y + intercept, 'substitute'), wrong((y + intercept) / m, 'sign'), ...near(x)]), x, `\\frac{${tex(y)}-${intercept}}{${tex(m)}}=${x}`, { m, n: intercept, y })
}

/* ---------- Circuits ---------- */

type Generator = (random: Random, tier: Tier) => StatisticsAkRaceQuestion | null

const circuitGenerators: Generator[][] = [
    [stratumQuestion, systematicQuestion, cumulativeQuestion],
    [tableMeanQuestion, joinedQuestion, missingQuestion],
    [quartileQuestion, fenceQuestion, percentileQuestion],
    [meanDeviationQuestion, varianceQuestion, cvQuestion],
    [estimateQuestion, interceptQuestion, inverseQuestion]
]

export function generateStatisticsAkRaceQuestion(random: Random, circuit: number, tier: Tier, requireWritable = false): StatisticsAkRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 2000; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next && (!requireWritable || next.writable)) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkStatisticsAkPitAnswer(question: RaceQuestion<StatisticsAkRaceError>, input: string): AnswerCheck {
    return checkAnswer(readStatisticsAnswer(input), question.answer as FractionValue, question.answerForm)
}

export function statisticsAkParTime(circuit: number): number {
    return parTimeFor([14, 14, 16, 15, 14][circuit] ?? 14)
}

export const statisticsAkRaceErrorTips: Record<StatisticsAkRaceError, LocalizedText> = {
    stratum: say('Hori geruza osoa da, ez laginean duen zatia: biderkatu $\\frac{n}{N}$-z.', 'Eso es todo el estrato, no su parte en la muestra: multiplica por $\\frac{n}{N}$.', 'هذه الطبقة كلها لا نصيبها في العيّنة: اضرب في $\\frac{n}{N}$.', 'That is the whole stratum, not its share of the sample: multiply by $\\frac{n}{N}$.'),
    complement: say('Hori laginaren gainerako zatia da, ez maila horrena.', 'Eso es el resto de la muestra, no la parte de ese curso.', 'هذا باقي العيّنة لا نصيب ذلك الصف.', 'That is the rest of the sample, not that year group\'s share.'),
    'off-by-one': say('Kontatu ondo: lehen elementutik $j-1$ jauzi daude, eta metatuak balio hori ere hartzen du.', 'Cuenta bien: desde el primero hay $j-1$ saltos, y la acumulada incluye también ese valor.', 'عُدّ جيدًا: من العنصر الأول هناك $j-1$ قفزة، والمتجمّع يشمل تلك القيمة أيضًا.', 'Count carefully: from the first one there are $j-1$ jumps, and the cumulative frequency also includes that value.'),
    'no-start': say('Ez ahaztu zoriz aukeratutako lehen elementua.', 'No olvides el primer elemento elegido al azar.', 'لا تنسَ العنصر الأول المختار عشوائيًا.', 'Do not forget the first element, chosen at random.'),
    'not-cumulative': say('Metatuak aurreko maiztasun guztiak batzen ditu, ez bakarrik balio horrena.', 'La acumulada suma todas las frecuencias anteriores, no solo la de ese valor.', 'المتجمّع يجمع كل التكرارات السابقة، لا تكرار تلك القيمة وحدها.', 'The cumulative frequency adds all the earlier frequencies, not just the one for that value.'),
    total: say('Hori $N$ da, azken metatua; gelditu galdetutako balioan.', 'Eso es $N$, la última acumulada; para en el valor que se pregunta.', 'هذا $N$، آخر متجمّع؛ توقّف عند القيمة المطلوبة.', 'That is $N$, the last cumulative frequency; stop at the value being asked about.'),
    unweighted: say('Taldeek edo balioek ez dute pisu bera: haztatu maiztasunekin.', 'Los grupos o los valores no pesan lo mismo: pondera con las frecuencias.', 'المجموعات أو القيم ليست بالوزن نفسه: رجّح بالتكرارات.', 'The groups or the values do not count the same: weight them by their frequencies.'),
    'divide-values': say('Zatitu datu kopuruaz, $N$-z, ez balio kopuruaz.', 'Divide entre el número de datos, $N$, no entre el número de valores.', 'اقسم على عدد البيانات $N$ لا على عدد القيم.', 'Divide by the number of data values, $N$, not by the number of different values.'),
    mean: say('Batez bestekoa ez da falta den datua: batura osoa $N\\cdot\\bar{x}$ da.', 'La media no es el dato que falta: la suma total es $N\\cdot\\bar{x}$.', 'المتوسط ليس البيان الناقص: المجموع الكلي $N\\cdot\\bar{x}$.', 'The mean is not the missing value: the total sum is $N\\cdot\\bar{x}$.'),
    'no-subtract': say('Batura osotik kendu ezagutzen diren datuak.', 'A la suma total réstale los datos conocidos.', 'اطرح البيانات المعروفة من المجموع الكلي.', 'Subtract the known values from the total sum.'),
    'other-quartile': say('$Q_1$ % 25ean dago eta $Q_3$ % 75ean: begiratu zein den galdetzen dena.', '$Q_1$ está en el 25 % y $Q_3$ en el 75 %: mira cuál se pregunta.', '$Q_1$ عند 25 % و$Q_3$ عند 75 %: انظر أيهما المطلوب.', '$Q_1$ is at 25% and $Q_3$ at 75%: check which one is being asked about.'),
    median: say('Hori mediana da, % 50.', 'Eso es la mediana, el 50 %.', 'هذا الوسيط، 50 %.', 'That is the median, 50%.'),
    position: say('Postua $N\\cdot\\frac{k}{100}$: osoa bada, datu hori eta hurrengoaren erdia; hamartarra bada, hurrengo datua.', 'Posición $N\\cdot\\frac{k}{100}$: si es entera, la media de ese dato y el siguiente; si es decimal, el dato siguiente.', 'الموقع $N\\cdot\\frac{k}{100}$: إذا كان صحيحًا فمتوسط ذلك البيان والذي يليه، وإذا كان عشريًا فالبيان التالي.', 'Position $N\\cdot\\frac{k}{100}$: if it is a whole number, take the mean of that value and the next one; if it is a decimal, take the next value.'),
    'no-factor': say('Biboteak $1{,}5\\cdot\\text{RIC}$ luza daitezke, ez RIC bakarrik.', 'Los bigotes se alargan $1{,}5\\cdot\\text{RIC}$, no solo el RIC.', 'يمتد الشاربان $1{,}5\\cdot\\text{RIC}$، لا RIC وحده.', 'The whiskers extend $1{,}5\\cdot\\text{IQR}$, not just the IQR.'),
    'other-side': say('Hori beste muga da: goikoa $Q_3$-tik, behekoa $Q_1$-etik.', 'Ese es el otro límite: el superior desde $Q_3$, el inferior desde $Q_1$.', 'هذا الحدّ الآخر: العلوي من $Q_3$ والسفلي من $Q_1$.', 'That is the other limit: the upper one from $Q_3$, the lower one from $Q_1$.'),
    neighbour: say('$p_k$ ehuneko metatuak $k$ lehen aldiz gainditzen duen balioa da; justu $k$ bada, hura eta hurrengoaren erdia.', '$p_k$ es el primer valor cuyo porcentaje acumulado supera $k$; si es justo $k$, el punto medio con el siguiente.', '$p_k$ أول قيمة تتجاوز نسبتها المتجمّعة $k$؛ وإذا ساوت $k$ تمامًا فمنتصفها مع التالية.', '$p_k$ is the first value whose cumulative percentage exceeds $k$; if it is exactly $k$, use the midpoint with the next value.'),
    'no-divide': say('Distantziak batu ondoren, zatitu datu kopuruaz.', 'Después de sumar las distancias, divide entre el número de datos.', 'بعد جمع المسافات اقسم على عدد البيانات.', 'After adding the distances, divide by the number of data values.'),
    square: say('DM-k distantziak erabiltzen ditu, ez haien karratuak.', 'La DM usa las distancias, no sus cuadrados.', 'DM يستعمل المسافات لا مربعاتها.', 'The MD uses the distances, not their squares.'),
    signed: say('Desbideratzeak zeinuarekin batuta beti 0 dira: hartu balio absolutua.', 'Las desviaciones con su signo suman siempre 0: toma el valor absoluto.', 'مجموع الانحرافات بإشاراتها دائمًا 0: خذ القيمة المطلقة.', 'Deviations with their sign always add up to 0: take the absolute value.'),
    'mean-square': say('Karratuen batez bestekoari $\\bar{x}^2$ kendu behar zaio.', 'A la media de los cuadrados hay que restarle $\\bar{x}^2$.', 'يجب طرح $\\bar{x}^2$ من متوسط المربعات.', 'You have to subtract $\\bar{x}^2$ from the mean of the squares.'),
    'no-square': say('Kendu batez bestekoaren karratua, $\\bar{x}^2$, ez $\\bar{x}$.', 'Resta el cuadrado de la media, $\\bar{x}^2$, no $\\bar{x}$.', 'اطرح مربع المتوسط $\\bar{x}^2$ لا $\\bar{x}$.', 'Subtract the square of the mean, $\\bar{x}^2$, not $\\bar{x}$.'),
    sigma: say('$\\sigma$ eta $\\sigma^2$ ez dira gauza bera, eta CV $\\sigma$ zati $\\bar{x}$ da.', '$\\sigma$ y $\\sigma^2$ no son lo mismo, y el CV es $\\sigma$ entre $\\bar{x}$.', '$\\sigma$ و$\\sigma^2$ ليسا الشيء نفسه، وCV هو $\\sigma$ على $\\bar{x}$.', '$\\sigma$ and $\\sigma^2$ are not the same, and the CV is $\\sigma$ divided by $\\bar{x}$.'),
    'inverse-ratio': say('$\\text{CV}=\\frac{\\sigma}{\\bar{x}}$: $\\sigma$ goian.', '$\\text{CV}=\\frac{\\sigma}{\\bar{x}}$: $\\sigma$ arriba.', '$\\text{CV}=\\frac{\\sigma}{\\bar{x}}$: $\\sigma$ في البسط.', '$\\text{CV}=\\frac{\\sigma}{\\bar{x}}$: $\\sigma$ on top.'),
    'no-intercept': say('Ez ahaztu ordenatua jatorrian, $n$.', 'No olvides la ordenada en el origen, $n$.', 'لا تنسَ الجزء المقطوع $n$.', 'Do not forget the y-intercept, $n$.'),
    'no-x': say('Malda $\\bar{x}$-rekin biderkatu behar da: $n=\\bar{y}-m\\,\\bar{x}$.', 'La pendiente se multiplica por $\\bar{x}$: $n=\\bar{y}-m\\,\\bar{x}$.', 'يُضرب الميل في $\\bar{x}$: $n=\\bar{y}-m\\,\\bar{x}$.', 'The slope is multiplied by $\\bar{x}$: $n=\\bar{y}-m\\,\\bar{x}$.'),
    swap: say('Malda $x$-rekin biderkatzen da; $n$ bakarrik batzen da.', 'La pendiente multiplica a $x$; $n$ solo se suma.', 'الميل يُضرب في $x$؛ و$n$ يُضاف فقط.', 'The slope multiplies $x$; $n$ is only added.'),
    sign: say('Kontuz zeinuarekin: $n=\\bar{y}-m\\,\\bar{x}$ eta $x=\\frac{y-n}{m}$.', 'Cuidado con el signo: $n=\\bar{y}-m\\,\\bar{x}$ y $x=\\frac{y-n}{m}$.', 'انتبه للإشارة: $n=\\bar{y}-m\\,\\bar{x}$ و$x=\\frac{y-n}{m}$.', 'Be careful with the sign: $n=\\bar{y}-m\\,\\bar{x}$ and $x=\\frac{y-n}{m}$.'),
    substitute: say('$y$ ezaguna da: ebatzi $mx+n=y$, ez ordeztu $y$ $x$-ren lekuan.', 'Conoces $y$: resuelve $mx+n=y$, no sustituyas $y$ en lugar de $x$.', 'تعرف $y$: حلّ $mx+n=y$، ولا تعوّض $y$ مكان $x$.', 'You know $y$: solve $mx+n=y$; do not substitute $y$ in place of $x$.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}
