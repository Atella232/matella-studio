import { checkAnswer, fraction, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { written } from '../../batx1-zientziak-errealak/games/race.ts'
import { readStatisticsAnswer } from '../../dbh2-estatistika-v2/answers.ts'

/* ==========================================================================
   Estatistikaren lasterketa (Batxilergoa 1 · Gizarte Zientziak): five
   circuits, one per stage — data (a percentage, a cumulative percentage,
   the height f / a of a bar), centre (a mean, a grouped mean, the mean of
   two groups), position (P_k by interpolation, the percentile of a value,
   a median), spread (σ from σ², the variance of four data, a CV in %) and
   interpretation (people between quartiles, the part of an interval, the
   end x̄ + σ). The wrong options are the typical mistakes. Every question
   carries `meta`, the numbers the tests check it against.
   ========================================================================== */

export const SOCIAL_STATS_RACE_CIRCUITS = 5

export type SocialStatsRaceError =
    | 'inverse'
    | 'absolute'
    | 'shift'
    | 'height'
    | 'divide'
    | 'mark'
    | 'groups'
    | 'cumulative'
    | 'upper'
    | 'unsorted'
    | 'root'
    | 'variance'
    | 'cv'
    | 'quartile'
    | 'whole'
    | 'calculation'

export type SocialStatsRaceQuestion = RaceQuestion<SocialStatsRaceError> & { meta: Record<string, number> }

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** A decimal for LaTeX with the comma (MathText writes the point in English; Arabic gets it from say) */
const tex = (value: number) => String(Math.round(value * 1000) / 1000).replace('.', '{,}')

interface Candidate {
    value: FractionValue
    error: SocialStatsRaceError
}
const exact = (value: number, error: SocialStatsRaceError): Candidate => ({ value: fraction(Math.round(value * 1000), 1000), error })
const nearby = (value: number): Candidate[] => [value + 1, value - 1, value + 2, value * 2].map((item) => exact(item, 'calculation'))

/** The right option and three different mistakes */
function options(random: Random, right: FractionValue, candidates: Candidate[]): RaceOption<SocialStatsRaceError>[] | null {
    const rightLatex = written(right)
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: SocialStatsRaceError }> = []
    for (const candidate of [...candidates, ...nearby(right.numerator / right.denominator)]) {
        if (wrong.length === 3) break
        const latex = written(candidate.value)
        if (latex === null || latex === '-0' || latex.startsWith('-') || used.has(latex)) continue
        used.add(latex)
        wrong.push({ latex, error: candidate.error })
    }
    if (wrong.length < 3) return null
    return shuffle(random, [{ latex: rightLatex, correct: true, error: null }, ...wrong.map((item) => ({ latex: item.latex, correct: false, error: item.error }))])
}

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<SocialStatsRaceError>[], answer: FractionValue, solution: LocalizedText, meta: Record<string, number>): SocialStatsRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution, meta }
}

const all = (latex: string) => say(`$${latex}$`, `$${latex}$`, `$${latex}$`, `$${latex}$`)
const list = (values: number[]) => values.join(',\\ ')
const short = (value: number) => Math.abs(Math.round(value * 100) - value * 100) < 1e-9

/* ---------- Circuit 0: data and charts ---------- */

/** f / N · 100 */
function percentQuestion(random: Random): SocialStatsRaceQuestion | null {
    const total = pick(random, [20, 25, 40, 50, 80])
    const count = randomInt(random, 2, total / 2)
    const value = (100 * count) / total
    if (!short(value)) return null
    const choices = options(random, fraction(Math.round(value * 100), 100), [exact(count / total, 'absolute'), exact(total / count, 'inverse'), exact(count, 'absolute')])
    return choices && build(0, 'percent', say(`$N=${total}$ eta $f=${count}$. Zer ehuneko da?`, `$N=${total}$ y $f=${count}$. ¿Qué porcentaje es?`, `$N=${total}$ و$f=${count}$. ما النسبة المئوية؟`, `$N=${total}$ and $f=${count}$. What percentage is it?`), choices, fraction(Math.round(value * 100), 100), all(`\\frac{${count}}{${total}}\\cdot 100=${tex(value)}`), { total, count })
}

/** The cumulative percentage of the third of four frequencies */
function cumulativeQuestion(random: Random): SocialStatsRaceQuestion | null {
    const counts = Array.from({ length: 4 }, () => randomInt(random, 2, 12))
    const total = counts.reduce((sum, count) => sum + count, 0)
    const value = (100 * (counts[0] + counts[1] + counts[2])) / total
    if (!short(value) || ![20, 25, 40, 50].includes(total)) return null
    const answer = fraction(Math.round(value * 100), 100)
    const choices = options(random, answer, [exact((100 * counts[2]) / total, 'shift'), exact(counts[0] + counts[1] + counts[2], 'absolute'), exact((100 * (counts[0] + counts[1])) / total, 'shift')])
    return choices && build(0, 'cumulative', say(`Maiztasunak: $${list(counts)}$. Zer ehuneko metatu du hirugarrenak?`, `Frecuencias: $${list(counts)}$. ¿Qué porcentaje acumulado tiene la tercera?`, `التكرارات: $${list(counts)}$. ما النسبة المتجمّعة للثالث؟`, `Frequencies: $${list(counts)}$. What cumulative percentage does the third have?`), choices, answer, all(`\\frac{${counts[0] + counts[1] + counts[2]}}{${total}}\\cdot 100=${tex(value)}`), { a: counts[0], b: counts[1], c: counts[2], d: counts[3] })
}

/** The height f / a of a bar */
function heightQuestion(random: Random): SocialStatsRaceQuestion | null {
    const from = pick(random, [0, 10, 20, 50])
    const width = pick(random, [2, 4, 5, 20, 30])
    const count = randomInt(random, 6, 60)
    const value = count / width
    if (!short(value)) return null
    const answer = fraction(Math.round(value * 100), 100)
    const choices = options(random, answer, [exact(count, 'height'), exact(count * width, 'height'), exact(count / (from + width), 'height')])
    return choices && build(0, 'height', say(`$[${from},${from + width})$ tartean ${count} datu daude. Zer altuera du barrak?`, `En $[${from},${from + width})$ hay ${count} datos. ¿Qué altura tiene la barra?`, `في $[${from},${from + width})$ يوجد ${count} بيانًا. ما ارتفاع العمود؟`, `$[${from},${from + width})$ holds ${count} data. How tall is the bar?`), choices, answer, all(`\\frac{${count}}{${width}}=${tex(value)}`), { from, width, count })
}

/* ---------- Circuit 1: measures of centre ---------- */

function meanQuestion(random: Random): SocialStatsRaceQuestion | null {
    const data = Array.from({ length: 5 }, () => randomInt(random, 10, 60))
    const sum = data.reduce((total, value) => total + value, 0)
    if (sum % 5 !== 0) return null
    const sorted = [...data].sort((a, b) => a - b)
    const answer = fraction(sum / 5)
    const choices = options(random, answer, [exact(sorted[2], 'unsorted'), exact(sum / 4, 'divide'), exact(data[2], 'unsorted')])
    return choices && build(1, 'mean', say(`Eguneko gastuak, eurotan: $${list(data)}$. Zein da batez bestekoa?`, `Gastos diarios en euros: $${list(data)}$. ¿Cuál es la media?`, `نفقات يومية باليورو: $${list(data)}$. ما المتوسط؟`, `Daily spending in euros: $${list(data)}$. What is the mean?`), choices, answer, all(`\\bar{x}=\\frac{${sum}}{5}=${sum / 5}`), { sum })
}

/** Two intervals of width 10 with the class marks */
function groupedQuestion(random: Random): SocialStatsRaceQuestion | null {
    const start = pick(random, [10, 20, 30, 40])
    const p = randomInt(random, 2, 12)
    const q = randomInt(random, 2, 12)
    const total = p + q
    const sum = p * (start + 5) + q * (start + 15)
    const mean = sum / total
    if (!short(mean) || p === q) return null
    const answer = fraction(Math.round(mean * 100), 100)
    const choices = options(random, answer, [exact((p * start + q * (start + 10)) / total, 'mark'), exact(sum / 2, 'divide'), exact(start + 10, 'mark')])
    return choices && build(1, 'grouped', say(`$[${start},${start + 10})$ tartean ${p} datu eta $[${start + 10},${start + 20})$ tartean ${q}. Batez bestekoa?`, `${p} datos en $[${start},${start + 10})$ y ${q} en $[${start + 10},${start + 20})$. ¿Media?`, `${p} بيانات في $[${start},${start + 10})$ و${q} في $[${start + 10},${start + 20})$. المتوسط؟`, `${p} data in $[${start},${start + 10})$ and ${q} in $[${start + 10},${start + 20})$. Mean?`), choices, answer, all(`\\frac{${p}\\cdot ${start + 5}+${q}\\cdot ${start + 15}}{${total}}=${tex(mean)}`), { start, p, q })
}

/** The mean of two groups */
function groupsQuestion(random: Random): SocialStatsRaceQuestion | null {
    const a = pick(random, [10, 15, 20, 30])
    const b = pick(random, [5, 10, 20])
    const meanA = randomInt(random, 4, 9)
    const meanB = randomInt(random, 4, 9)
    const mean = (a * meanA + b * meanB) / (a + b)
    if (a === b || meanA === meanB || !short(mean)) return null
    const answer = fraction(Math.round(mean * 100), 100)
    const choices = options(random, answer, [exact((meanA + meanB) / 2, 'groups'), exact(meanA + meanB, 'groups'), exact((a * meanA + b * meanB) / 2, 'divide')])
    return choices && build(1, 'groups', say(`${a} ikaslek batez beste ${meanA} dute, eta ${b} ikaslek, ${meanB}. Guztien batez bestekoa?`, `${a} alumnos tienen media ${meanA} y ${b}, ${meanB}. ¿Media de todos?`, `${a} طالبًا متوسطهم ${meanA} و${b} متوسطهم ${meanB}. متوسط الجميع؟`, `${a} students have a mean of ${meanA} and ${b}, ${meanB}. Mean of all?`), choices, answer, all(`\\frac{${a}\\cdot ${meanA}+${b}\\cdot ${meanB}}{${a + b}}=${tex(mean)}`), { a, b, meanA, meanB })
}

/* ---------- Circuit 2: measures of position ---------- */

/** P_k inside one interval of the polygon */
function percentileQuestion(random: Random): SocialStatsRaceQuestion | null {
    const from = pick(random, [10, 20, 40, 100])
    const width = pick(random, [10, 20])
    const before = pick(random, [10, 20, 25, 30, 40])
    const share = pick(random, [20, 25, 30, 40, 50])
    const k = before + pick(random, [5, 10, 15, 20, 25].filter((step) => step < share))
    const value = from + ((k - before) / share) * width
    if (!short(value) || k === 50 && before + share === 50) return null
    const answer = fraction(Math.round(value * 100), 100)
    const choices = options(random, answer, [exact(from + width / 2, 'mark'), exact(from + ((k - before) / (before + share)) * width, 'cumulative'), exact(from + width, 'upper')])
    return choices && build(2, 'percentile', say(`$[${from},${from + width})$ tartea % ${before} eta % ${before + share} artean doa. Zenbat da $P_{${k}}$?`, `El intervalo $[${from},${from + width})$ va del ${before} % al ${before + share} %. ¿Cuánto vale $P_{${k}}$?`, `تمتد الفئة $[${from},${from + width})$ من ${before}٪ إلى ${before + share}٪. كم $P_{${k}}$؟`, `The interval $[${from},${from + width})$ runs from ${before}% to ${before + share}%. What is $P_{${k}}$?`), choices, answer, all(`${from}+\\frac{${k}-${before}}{${share}}\\cdot ${width}=${tex(value)}`), { from, width, before, share, k })
}

/** The percentile of a value inside one interval */
function valueQuestion(random: Random): SocialStatsRaceQuestion | null {
    const from = pick(random, [10, 20, 40, 100])
    const width = pick(random, [10, 20])
    const before = pick(random, [10, 20, 25, 30, 40])
    const share = pick(random, [20, 30, 40, 50])
    const x = from + pick(random, [0.25, 0.5, 0.75]) * width
    const k = before + ((x - from) / width) * share
    if (!short(k)) return null
    const answer = fraction(Math.round(k * 100), 100)
    const choices = options(random, answer, [exact(before + share, 'upper'), exact(before, 'upper'), exact(((x - from) / width) * share, 'cumulative')])
    return choices && build(2, 'value', say(`$[${from},${from + width})$ tartea % ${before} eta % ${before + share} artean doa. Zer pertzentil du ${tex(x)} balioak?`, `El intervalo $[${from},${from + width})$ va del ${before} % al ${before + share} %. ¿Qué percentil tiene ${tex(x)}?`, `تمتد الفئة $[${from},${from + width})$ من ${before}٪ إلى ${before + share}٪. ما مئين ${tex(x)}؟`, `The interval $[${from},${from + width})$ runs from ${before}% to ${before + share}%. What percentile does ${tex(x)} have?`), choices, answer, all(`${before}+\\frac{${tex(x)}-${from}}{${width}}\\cdot ${share}=${tex(k)}`), { from, width, before, share, x })
}

/** The median of seven unsorted data */
function medianQuestion(random: Random): SocialStatsRaceQuestion | null {
    const data = Array.from({ length: 7 }, () => randomInt(random, 1, 30))
    const sorted = [...data].sort((a, b) => a - b)
    if (new Set(data).size < 7 || sorted[3] === data[3]) return null
    const sum = data.reduce((total, value) => total + value, 0)
    const answer = fraction(sorted[3])
    const choices = options(random, answer, [exact(data[3], 'unsorted'), exact(sum / 7, 'divide'), exact(sorted[4], 'shift')])
    return choices && build(2, 'median', say(`Zein da $${list(data)}$ datuen mediana?`, `¿Cuál es la mediana de $${list(data)}$?`, `ما وسيط $${list(data)}$؟`, `What is the median of $${list(data)}$?`), choices, answer, all(`${list(sorted)}\\ \\to\\ Me=${sorted[3]}`), { median: sorted[3] })
}

/* ---------- Circuit 3: measures of spread ---------- */

function squareQuestion(random: Random): SocialStatsRaceQuestion | null {
    const sigma = randomInt(random, 2, 15)
    const answer = fraction(sigma)
    const choices = options(random, answer, [exact((sigma * sigma) / 2, 'root'), exact(sigma * sigma * sigma * sigma, 'root'), exact(sigma * 2, 'root')])
    return choices && build(3, 'root', say(`$\\sigma^2=${sigma * sigma}$. Zenbat da $\\sigma$?`, `$\\sigma^2=${sigma * sigma}$. ¿Cuánto vale $\\sigma$?`, `$\\sigma^2=${sigma * sigma}$. كم $\\sigma$؟`, `$\\sigma^2=${sigma * sigma}$. What is $\\sigma$?`), choices, answer, all(`\\sigma=\\sqrt{${sigma * sigma}}=${sigma}`), { sigma })
}

function varianceQuestion(random: Random): SocialStatsRaceQuestion | null {
    const centre = randomInt(random, 4, 20)
    const d = randomInt(random, 1, 4)
    const data = [centre - d, centre - d, centre + d, centre + d]
    const answer = fraction(d * d)
    const choices = options(random, answer, [exact(d, 'variance'), exact(centre * centre + d * d, 'variance'), exact(2 * d * d, 'divide')])
    return choices && build(3, 'variance', say(`Zein da $${list(data)}$ datuen bariantza?`, `¿Cuál es la varianza de $${list(data)}$?`, `ما تباين $${list(data)}$؟`, `What is the variance of $${list(data)}$?`), choices, answer, all(`\\bar{x}=${centre}\\qquad\\sigma^2=\\frac{4\\cdot ${d * d}}{4}=${d * d}`), { centre, d })
}

/** CV in % */
function cvQuestion(random: Random): SocialStatsRaceQuestion | null {
    const mean = pick(random, [20, 25, 40, 50, 80, 200])
    const sigma = randomInt(random, 2, 20)
    const value = (100 * sigma) / mean
    if (!short(value) || value >= 100) return null
    const answer = fraction(Math.round(value * 100), 100)
    const choices = options(random, answer, [exact((100 * mean) / sigma, 'cv'), exact(sigma / mean, 'cv'), exact(mean - sigma, 'calculation')])
    return choices && build(3, 'cv', say(`$\\bar{x}=${mean}$ eta $\\sigma=${sigma}$. Zein da CV ehunekotan?`, `$\\bar{x}=${mean}$ y $\\sigma=${sigma}$. ¿Cuál es el CV en porcentaje?`, `$\\bar{x}=${mean}$ و$\\sigma=${sigma}$. ما CV بالنسبة المئوية؟`, `$\\bar{x}=${mean}$ and $\\sigma=${sigma}$. What is the CV as a percentage?`), choices, answer, all(`\\frac{${sigma}}{${mean}}\\cdot 100=${tex(value)}`), { mean, sigma })
}

/* ---------- Circuit 4: interpret ---------- */

/** People between two quartiles */
function quartileQuestion(random: Random): SocialStatsRaceQuestion | null {
    const total = pick(random, [200, 300, 400, 600, 800, 1000])
    const between = pick(random, [['Q_1', 'Me', 0.25], ['Me', 'Q_3', 0.25], ['Q_1', 'Q_3', 0.5]] as const)
    const value = total * between[2]
    const answer = fraction(value)
    const choices = options(random, answer, [exact(between[2] === 0.5 ? total / 4 : total / 2, 'quartile'), exact(total * 0.75, 'quartile'), exact(total, 'quartile')])
    const english = total >= 1000 ? total.toLocaleString('en-US') : String(total)
    return choices && build(4, 'quartile', say(`${total} pertsona. Zenbat daude $${between[0]}$ eta $${between[1]}$ artean?`, `${total} personas. ¿Cuántas hay entre $${between[0]}$ y $${between[1]}$?`, `${total} شخص. كم شخصًا بين $${between[0]}$ و$${between[1]}$؟`, `${english} people. How many are between $${between[0]}$ and $${between[1]}$?`), choices, answer, all(`${tex(between[2])}\\cdot ${total}=${value}`), { total, share: between[2] })
}

/** The part of an interval between a value and its end */
function partQuestion(random: Random): SocialStatsRaceQuestion | null {
    const from = pick(random, [0, 10, 20, 40])
    const width = pick(random, [4, 8, 10])
    const count = 4 * randomInt(random, 3, 20)
    const cut = from + pick(random, [0.25, 0.5, 0.75]) * width
    const value = (count * (from + width - cut)) / width
    if (!short(value) || !short(cut)) return null
    const answer = fraction(Math.round(value * 100), 100)
    const choices = options(random, answer, [exact(count, 'whole'), exact(count - value, 'whole'), exact(count / 2, 'whole')])
    return choices && build(4, 'part', say(`$[${from},${from + width})$ tarteak ${count} datu ditu. Zenbat daude ${tex(cut)} eta ${from + width} artean?`, `$[${from},${from + width})$ tiene ${count} datos. ¿Cuántos hay entre ${tex(cut)} y ${from + width}?`, `في $[${from},${from + width})$ ${count} بيانًا. كم بيانًا بين ${tex(cut)} و${from + width}؟`, `$[${from},${from + width})$ has ${count} data. How many are between ${tex(cut)} and ${from + width}?`), choices, answer, all(`\\frac{${from + width}-${tex(cut)}}{${width}}\\cdot ${count}=${tex(value)}`), { from, width, count, cut })
}

/** The end x̄ + σ of the band */
function bandQuestion(random: Random): SocialStatsRaceQuestion | null {
    const mean = randomInt(random, 10, 60)
    const sigma = randomInt(random, 2, 6)
    const answer = fraction(mean + sigma)
    const choices = options(random, answer, [exact(mean + sigma * sigma, 'variance'), exact(mean - sigma, 'calculation'), exact(mean + 3 * sigma, 'calculation')])
    return choices && build(4, 'band', say(`$\\bar{x}=${mean}$ eta $\\sigma^2=${sigma * sigma}$. Zenbat da $\\bar{x}+\\sigma$?`, `$\\bar{x}=${mean}$ y $\\sigma^2=${sigma * sigma}$. ¿Cuánto vale $\\bar{x}+\\sigma$?`, `$\\bar{x}=${mean}$ و$\\sigma^2=${sigma * sigma}$. كم $\\bar{x}+\\sigma$؟`, `$\\bar{x}=${mean}$ and $\\sigma^2=${sigma * sigma}$. What is $\\bar{x}+\\sigma$?`), choices, answer, all(`${mean}+\\sqrt{${sigma * sigma}}=${mean + sigma}`), { mean, sigma })
}

const circuitGenerators: Array<Array<(random: Random, tier: Tier) => SocialStatsRaceQuestion | null>> = [
    [percentQuestion, cumulativeQuestion, heightQuestion],
    [meanQuestion, groupedQuestion, groupsQuestion],
    [percentileQuestion, valueQuestion, medianQuestion],
    [squareQuestion, varianceQuestion, cvQuestion],
    [quartileQuestion, partQuestion, bandQuestion]
]

export function generateSocialStatsRaceQuestion(random: Random, circuit: number, tier: Tier): SocialStatsRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkSocialStatsPitAnswer(question: RaceQuestion<SocialStatsRaceError>, input: string): AnswerCheck {
    return checkAnswer(readStatisticsAnswer(input), question.answer, question.answerForm)
}

export function socialStatsParTime(circuit: number): number {
    return parTimeFor([12, 13, 15, 12, 12][circuit] ?? 13)
}

export const socialStatsRaceErrorTips: Record<SocialStatsRaceError, LocalizedText> = {
    inverse: say('Alderantziz: zatitu zatia osoaz, ez osoa zatiaz.', 'Al revés: divide la parte entre el total, no el total entre la parte.', 'العكس: اقسم الجزء على الكل لا الكل على الجزء.', 'The other way round: divide the part by the total, not the total by the part.'),
    absolute: say('Ehunekoa eskatzen da: $\\frac{f}{N}\\cdot 100$.', 'Se pide el porcentaje: $\\frac{f}{N}\\cdot 100$.', 'المطلوب النسبة المئوية: $\\frac{f}{N}\\cdot 100$.', 'The percentage is asked for: $\\frac{f}{N}\\cdot 100$.'),
    shift: say('Metatuak balio horretaraino batzen ditu: ez gehiago, ez gutxiago.', 'La acumulada suma hasta ese valor: ni más ni menos.', 'المتجمّع يجمع حتى تلك القيمة: لا أكثر ولا أقل.', 'The cumulative frequency adds up to that value: no more, no less.'),
    height: say('Barraren altuera maiztasuna zati zabalera da: $\\frac{f_i}{a_i}$.', 'La altura de la barra es la frecuencia entre la amplitud: $\\frac{f_i}{a_i}$.', 'ارتفاع العمود هو التكرار مقسومًا على الطول: $\\frac{f_i}{a_i}$.', 'The height of the bar is the frequency divided by the width: $\\frac{f_i}{a_i}$.'),
    divide: say('Zatitu datu kopuruaz, $N$.', 'Divide entre el número de datos, $N$.', 'اقسم على عدد البيانات $N$.', 'Divide by the number of data, $N$.'),
    mark: say('Erabili klase-marka, tartearen erdiko puntua.', 'Usa la marca de clase, el punto medio del intervalo.', 'استعمل مركز الفئة، أي منتصفها.', 'Use the class mark, the midpoint of the interval.'),
    groups: say('Talde bakoitzak bere tamainaren pisua du: batu guztizkoak.', 'Cada grupo pesa según su tamaño: suma los totales.', 'كل مجموعة تزن بحسب حجمها: اجمع المجموعين.', 'Each group weighs by its size: add the totals.'),
    cumulative: say('Zatitu tartearen beraren ehunekoaz, $h_i$, ez metatuaz.', 'Divide entre el porcentaje del propio intervalo, $h_i$, no entre el acumulado.', 'اقسم على نسبة الفئة نفسها $h_i$ لا على المتجمّعة.', 'Divide by the percentage of the interval itself, $h_i$, not by the cumulative one.'),
    upper: say('Interpolatu tartearen barruan: ez hartu muturra bera.', 'Interpola dentro del intervalo: no tomes el extremo.', 'استكمل داخل الفئة: لا تأخذ الطرف نفسه.', 'Interpolate inside the interval: do not take the end itself.'),
    unsorted: say('Ordenatu datuak lehenik.', 'Ordena primero los datos.', 'رتّب البيانات أولًا.', 'Sort the data first.'),
    root: say('$\\sigma$ bariantzaren erro karratua da.', '$\\sigma$ es la raíz cuadrada de la varianza.', '$\\sigma$ هو الجذر التربيعي للتباين.', '$\\sigma$ is the square root of the variance.'),
    variance: say('Erabili $\\sigma$, ez $\\sigma^2$; eta bariantzan kendu $\\bar{x}^2$.', 'Usa $\\sigma$, no $\\sigma^2$; y en la varianza resta $\\bar{x}^2$.', 'استعمل $\\sigma$ لا $\\sigma^2$؛ واطرح $\\bar{x}^2$ في التباين.', 'Use $\\sigma$, not $\\sigma^2$; and subtract $\\bar{x}^2$ in the variance.'),
    cv: say('$CV=\\frac{\\sigma}{\\bar{x}}$, eta ehunekotan, 100 bider.', '$CV=\\frac{\\sigma}{\\bar{x}}$, y en porcentaje, por 100.', '$CV=\\frac{\\sigma}{\\bar{x}}$، وبالنسبة المئوية نضرب في 100.', '$CV=\\frac{\\sigma}{\\bar{x}}$, and as a percentage, times 100.'),
    quartile: say('Ondoz ondoko bi kuartilen artean % 25 dago beti.', 'Entre dos cuartiles seguidos siempre está el 25 %.', 'بين ربيعيين متتاليين دائمًا 25٪.', 'Between two consecutive quartiles there is always 25%.'),
    whole: say('Barruan geratzen den zatia bakarrik zenbatzen da.', 'Solo se cuenta la parte que queda dentro.', 'لا يُعدّ إلا الجزء الواقع في الداخل.', 'Only the part that lies inside is counted.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}
