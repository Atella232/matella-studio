import { checkAnswer, fraction, toExactDecimal, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { readStatisticsAnswer } from '../answers.ts'

/* ==========================================================================
   Estatistikaren lasterketa (2. DBH): five circuits — tables, graphs,
   centralization, dispersion and position, and probability. Every wrong
   option is a typical mistake: the frequency instead of the cumulative one,
   a limit of the interval instead of its class mark, the percentage read
   as degrees, the mean of the values without their frequencies, the mode
   for the median, forgetting to divide, the quartile of the unsorted list,
   the same probability instead of the contrary, counting the sums of two
   dice as equally likely… Prompts never put a Basque suffix after a
   generated number.
   ========================================================================== */

export const STATISTICS_RACE_CIRCUITS = 5

export type StatisticsRaceError =
    | 'no-accumulate'
    | 'previous'
    | 'absolute'
    | 'limit'
    | 'width'
    | 'percent-degrees'
    | 'whole-circle'
    | 'ignore-frequency'
    | 'no-divide'
    | 'mode-median'
    | 'unsorted'
    | 'median-quartile'
    | 'range-max'
    | 'same-event'
    | 'sums-equal'
    | 'order'
    | 'calculation'

export type StatisticsRaceQuestion = RaceQuestion<StatisticsRaceError>

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
const same = (latex: string): LocalizedText => ({ eu: latex, es: latex, ar: latex.replace(/\{,\}/g, '.') })
const math = (latex: string) => `$${latex}$`
const sum = (values: number[]) => values.reduce((total, value) => total + value, 0)

/** A value in LaTeX: an exact decimal with at most two decimals, or a simplified fraction when asked */
export function written(value: FractionValue, asFraction = false): string | null {
    if (asFraction) return value.denominator === 1 ? `${value.numerator}` : `\\frac{${value.numerator}}{${value.denominator}}`
    const text = toExactDecimal(value, ',')
    if (text === null || (text.split(',')[1] ?? '').length > 2) return null
    return text.replace(',', '{,}')
}
const n = (value: number) => (Number.isInteger(value) ? fraction(value) : fraction(Math.round(value * 10000), 10000))
const w = (value: FractionValue, asFraction = false) => written(value, asFraction) ?? '?'

interface Candidate {
    value: FractionValue
    error: StatisticsRaceError
}

const near = (value: FractionValue): Candidate[] => {
    const x = value.numerator / value.denominator
    return [x + 1, x - 1, x + 2, x * 2].map((item) => ({ value: n(item), error: 'calculation' as const }))
}

/** The right option and three different mistakes, all positive and well written */
function options(random: Random, right: FractionValue, candidates: Candidate[], asFraction = false): RaceOption<StatisticsRaceError>[] | null {
    const rightLatex = written(right, asFraction)
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: StatisticsRaceError }> = []
    for (const candidate of candidates) {
        if (wrong.length === 3) break
        if (candidate.value.numerator <= 0) continue
        const latex = written(candidate.value, asFraction)
        if (latex === null || used.has(latex)) continue
        used.add(latex)
        wrong.push({ latex, error: candidate.error })
    }
    if (wrong.length < 3) return null
    return shuffle(random, [{ latex: rightLatex, correct: true, error: null }, ...wrong.map((item) => ({ latex: item.latex, correct: false, error: item.error }))])
}

function question(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<StatisticsRaceError>[], answer: FractionValue, solution: LocalizedText): StatisticsRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution }
}

/** A frequency table x → f written for the prompt: 0 → 3, 1 → 6… */
const tableText = (values: number[], counts: number[]) => math(values.map((value, index) => `${value}\\to ${counts[index]}`).join(',\\ '))

/* ---------- Circuit 0: tables ---------- */

function cumulativeQuestion(random: Random, tier: Tier): StatisticsRaceQuestion | null {
    const size = tier === 0 ? 4 : 5
    const counts = Array.from({ length: size }, () => randomInt(random, 1, tier === 2 ? 15 : 9))
    const index = randomInt(random, 1, size - 2)
    const values = counts.map((_, value) => value)
    const right = sum(counts.slice(0, index + 1))
    const choices = options(random, n(right), [
        { value: n(counts[index]), error: 'no-accumulate' },
        { value: n(right - counts[index]), error: 'previous' },
        { value: n(sum(counts)), error: 'absolute' },
        ...near(n(right))
    ])
    if (!choices) return null
    return question(0, 'cumulative', say(
        `Taula: ${tableText(values, counts)}. Zein da ${math(String(index))} balioaren maiztasun absolutu metatua?`,
        `Tabla: ${tableText(values, counts)}. ¿Cuál es la frecuencia absoluta acumulada del valor ${math(String(index))}?`,
        `جدول: ${tableText(values, counts)}. ما التكرار المطلق المتجمّع للقيمة ${math(String(index))}؟`
    ), choices, n(right), same(math(`${counts.slice(0, index + 1).join('+')}=${right}`)))
}

function relativeCumulativeQuestion(random: Random, tier: Tier): StatisticsRaceQuestion | null {
    const total = pick(random, tier === 0 ? [10, 20] : [20, 25, 40, 50])
    const quarter = Math.floor(total / 4)
    const counts = [randomInt(random, 1, quarter), randomInt(random, 1, quarter), randomInt(random, 1, quarter)]
    counts.push(total - sum(counts))
    if (counts[3] < 1) return null
    const index = randomInt(random, 1, 2)
    const cumulative = sum(counts.slice(0, index + 1))
    const right = fraction(cumulative, total)
    const choices = options(random, right, [
        { value: fraction(counts[index], total), error: 'no-accumulate' },
        { value: n(cumulative), error: 'absolute' },
        { value: fraction(cumulative - counts[index], total), error: 'previous' },
        ...near(right)
    ])
    if (!choices) return null
    const values = [0, 1, 2, 3]
    return question(0, 'relative-cumulative', say(
        `Taula: ${tableText(values, counts)}. Zein da ${math(String(index))} balioaren maiztasun erlatibo metatua?`,
        `Tabla: ${tableText(values, counts)}. ¿Cuál es la frecuencia relativa acumulada del valor ${math(String(index))}?`,
        `جدول: ${tableText(values, counts)}. ما التكرار النسبي المتجمّع للقيمة ${math(String(index))}؟`
    ), choices, right, same(math(`\\frac{${counts.slice(0, index + 1).join('+')}}{${total}}=${w(right)}`)))
}

function classMarkQuestion(random: Random, tier: Tier): StatisticsRaceQuestion | null {
    const width = pick(random, tier === 0 ? [10, 20] : [4, 5, 10, 20, 50])
    const lower = width * randomInt(random, 1, tier === 0 ? 9 : 30)
    const upper = lower + width
    const right = n((lower + upper) / 2)
    const choices = options(random, right, [
        { value: n(upper), error: 'limit' },
        { value: n(lower), error: 'limit' },
        { value: n(width), error: 'width' },
        ...near(right)
    ])
    if (!choices) return null
    return question(0, 'class-mark', say(
        `Zein da ${math(`[${lower},${upper})`)} tartearen klase-marka?`,
        `¿Cuál es la marca de clase del intervalo ${math(`[${lower},${upper})`)}?`,
        `ما مركز الفئة ${math(`[${lower},${upper})`)}؟`
    ), choices, right, same(math(`\\frac{${lower}+${upper}}{2}=${w(right)}`)))
}

/* ---------- Circuit 1: graphs ---------- */

function angleQuestion(random: Random, tier: Tier): StatisticsRaceQuestion | null {
    const percent = tier === 0 ? 5 * randomInt(random, 1, 19) : randomInt(random, 1, 99)
    const right = fraction(percent * 36, 10)
    const choices = options(random, right, [
        { value: n(percent), error: 'percent-degrees' },
        { value: fraction(3600 - percent * 36, 10), error: 'whole-circle' },
        { value: n(percent * 3), error: 'calculation' },
        ...near(right)
    ])
    if (!choices) return null
    return question(1, 'angle', say(
        `Sektore-diagrama batean, zenbat gradu ditu datuen ${math(`${percent}\\,\\%`)} sektoreak?`,
        `En un diagrama de sectores, ¿cuántos grados mide el sector del ${math(`${percent}\\,\\%`)} de los datos?`,
        `في مخطط دائري، كم درجة قطاع ${math(`${percent}\\,\\%`)} من البيانات؟`
    ), choices, right, same(math(`${percent}\\cdot 3{,}6=${w(right)}`)))
}

function countFromAngleQuestion(random: Random, tier: Tier): StatisticsRaceQuestion | null {
    const people = pick(random, tier === 0 ? [20, 36, 40, 60] : [24, 30, 36, 40, 45, 60, 72, 90, 120, 180, 200])
    const count = randomInt(random, 1, people - 1)
    if ((count * 360) % people !== 0) return null
    const angle = (count * 360) / people
    const right = n(count)
    const choices = options(random, right, [
        { value: n(angle), error: 'percent-degrees' },
        { value: n(people - count), error: 'whole-circle' },
        { value: fraction(angle * people, 100), error: 'calculation' },
        ...near(right)
    ])
    if (!choices) return null
    return question(1, 'count-from-angle', say(
        `${math(String(people))} pertsonari egindako inkesta batean, sektore batek ${math(`${angle}^{\\circ}`)} ditu. Zenbat pertsona dira?`,
        `En una encuesta a ${math(String(people))} personas, un sector mide ${math(`${angle}^{\\circ}`)}. ¿Cuántas personas son?`,
        `في استبيان لـ${math(String(people))} شخصًا، قياس قطاع ${math(`${angle}^{\\circ}`)}. كم شخصًا يمثّل؟`
    ), choices, right, same(math(`\\frac{${angle}}{360}\\cdot ${people}=${count}`)))
}

function percentFromAngleQuestion(random: Random, tier: Tier): StatisticsRaceQuestion | null {
    const percent = tier === 0 ? 5 * randomInt(random, 1, 19) : 5 * randomInt(random, 1, 19) + pick(random, [0, 0, 2.5])
    const angle = (percent * 36) / 10
    if (!Number.isInteger(angle)) return null
    const right = n(percent)
    const choices = options(random, right, [
        { value: n(angle), error: 'percent-degrees' },
        { value: n(100 - percent), error: 'whole-circle' },
        { value: fraction(angle, 360), error: 'calculation' },
        ...near(right)
    ])
    if (!choices) return null
    return question(1, 'percent-from-angle', say(
        `Sektore batek ${math(`${angle}^{\\circ}`)} ditu. Datuen zein ehuneko da?`,
        `Un sector mide ${math(`${angle}^{\\circ}`)}. ¿Qué porcentaje de los datos es?`,
        `قياس قطاع ${math(`${angle}^{\\circ}`)}. ما النسبة المئوية من البيانات؟`
    ), choices, right, same(math(`\\frac{${angle}}{360}\\cdot 100=${w(right)}`)))
}

/* ---------- Circuit 2: centralization ---------- */

function meanTableQuestion(random: Random, tier: Tier): StatisticsRaceQuestion | null {
    const size = tier === 0 ? 3 : 4
    const values = Array.from({ length: size }, (_, index) => index + randomInt(random, 0, tier === 2 ? 5 : 1))
    if (new Set(values).size !== size) return null
    const counts = Array.from({ length: size }, () => randomInt(random, 1, 6))
    const total = sum(counts)
    const products = sum(values.map((value, index) => value * counts[index]))
    const right = fraction(products, total)
    const plain = fraction(sum(values), size)
    if (plain.numerator * right.denominator === right.numerator * plain.denominator) return null
    const choices = options(random, right, [
        { value: plain, error: 'ignore-frequency' },
        { value: n(products), error: 'no-divide' },
        { value: fraction(products, size), error: 'calculation' },
        ...near(right)
    ])
    if (!choices) return null
    return question(2, 'mean-table', say(
        `Taula: ${tableText(values, counts)}. Zein da batez bestekoa?`,
        `Tabla: ${tableText(values, counts)}. ¿Cuál es la media?`,
        `جدول: ${tableText(values, counts)}. ما المتوسط؟`
    ), choices, right, same(math(`\\frac{${values.map((value, index) => `${value}\\cdot ${counts[index]}`).join('+')}}{${total}}=${w(right)}`)))
}

function medianTableQuestion(random: Random, tier: Tier): StatisticsRaceQuestion | null {
    const counts = Array.from({ length: 5 }, () => randomInt(random, 1, tier === 0 ? 5 : 9))
    const total = sum(counts)
    if (total % 2 === 0) return null
    const position = (total + 1) / 2
    const cumulative = counts.map((_, index) => sum(counts.slice(0, index + 1)))
    const median = cumulative.findIndex((value) => value >= position)
    const top = Math.max(...counts)
    const mode = counts.indexOf(top)
    if (counts.filter((count) => count === top).length > 1 || mode === median) return null
    const values = [0, 1, 2, 3, 4]
    const right = n(median)
    const choices = options(random, right, [
        { value: n(mode), error: 'mode-median' },
        { value: n(2), error: 'order' },
        { value: n(position), error: 'calculation' },
        ...near(right)
    ])
    if (!choices) return null
    return question(2, 'median-table', say(
        `Taula: ${tableText(values, counts)}. Zein da mediana?`,
        `Tabla: ${tableText(values, counts)}. ¿Cuál es la mediana?`,
        `جدول: ${tableText(values, counts)}. ما الوسيط؟`
    ), choices, right, say(
        `${math(`N=${total}\\ \\to\\ \\frac{${total}+1}{2}=${position}`)}. Metatuak: ${math(cumulative.join(',\\ '))}. Mediana: ${math(String(median))}.`,
        `${math(`N=${total}\\ \\to\\ \\frac{${total}+1}{2}=${position}`)}. Acumuladas: ${math(cumulative.join(',\\ '))}. Mediana: ${math(String(median))}.`,
        `${math(`N=${total}\\ \\to\\ \\frac{${total}+1}{2}=${position}`)}. المتجمّعة: ${math(cumulative.join(',\\ '))}. الوسيط: ${math(String(median))}.`
    ))
}

function missingDatumQuestion(random: Random, tier: Tier): StatisticsRaceQuestion | null {
    const size = tier === 0 ? 4 : 5
    const known = Array.from({ length: size - 1 }, () => randomInt(random, 2, 10))
    const mean = randomInt(random, 4, 9)
    const right = size * mean - sum(known)
    if (right < 1 || right > 15) return null
    const choices = options(random, n(right), [
        { value: n(mean), error: 'calculation' },
        { value: n(size * mean), error: 'no-divide' },
        { value: n((size - 1) * mean - sum(known)), error: 'calculation' },
        ...near(n(right))
    ])
    if (!choices) return null
    const list = known.join(',\\ ')
    return question(2, 'missing-datum', say(
        `${math(String(size))} daturen batez bestekoa ${math(String(mean))} da. Horietako batzuk ${math(list)} dira. Zein da falta dena?`,
        `La media de ${math(String(size))} datos es ${math(String(mean))}. Algunos son ${math(list)}. ¿Cuál es el que falta?`,
        `متوسط ${math(String(size))} بيانات هو ${math(String(mean))}. بعضها ${math(list)}. ما البيان الناقص؟`
    ), choices, n(right), same(math(`${size}\\cdot ${mean}-(${known.join('+')})=${right}`)))
}

/* ---------- Circuit 3: dispersion and position ---------- */

function rangeQuestion(random: Random, tier: Tier): StatisticsRaceQuestion | null {
    const data = Array.from({ length: tier === 0 ? 5 : 7 }, () => randomInt(random, tier === 2 ? 10 : 1, tier === 2 ? 99 : 20))
    const max = Math.max(...data)
    const min = Math.min(...data)
    if (max === min) return null
    const right = n(max - min)
    const choices = options(random, right, [
        { value: n(max), error: 'range-max' },
        { value: n(data[data.length - 1] - data[0] > 0 ? data[data.length - 1] - data[0] : data[0] - data[data.length - 1]), error: 'unsorted' },
        { value: n(max + min), error: 'calculation' },
        ...near(right)
    ])
    if (!choices) return null
    return question(3, 'range', say(
        `Zein da ibiltartea? ${math(data.join(',\\ '))}`,
        `¿Cuál es el recorrido? ${math(data.join(',\\ '))}`,
        `ما المدى؟ ${math(data.join(',\\ '))}`
    ), choices, right, same(math(`${max}-${min}=${max - min}`)))
}

function deviationQuestion(random: Random, tier: Tier): StatisticsRaceQuestion | null {
    const size = tier === 0 ? 4 : 5
    const data = Array.from({ length: size }, () => randomInt(random, 1, tier === 2 ? 20 : 10))
    const total = sum(data)
    if (total % size !== 0) return null
    const mean = total / size
    const distances = data.map((value) => Math.abs(value - mean))
    if (sum(distances) === 0) return null
    const right = fraction(sum(distances), size)
    const choices = options(random, right, [
        { value: n(sum(distances)), error: 'no-divide' },
        { value: n(Math.max(...data) - Math.min(...data)), error: 'range-max' },
        { value: n(mean), error: 'calculation' },
        ...near(right)
    ])
    if (!choices) return null
    return question(3, 'deviation', say(
        `Kalkulatu batez besteko desbideratzea: ${math(data.join(',\\ '))}`,
        `Calcula la desviación media de: ${math(data.join(',\\ '))}`,
        `احسب الانحراف المتوسط لـ: ${math(data.join(',\\ '))}`
    ), choices, right, same(math(`\\frac{${data.join('+')}}{${size}}=${mean}\\ \\to\\ \\frac{${distances.join('+')}}{${size}}=${w(right)}`)))
}

function quartileQuestion(random: Random, tier: Tier): StatisticsRaceQuestion | null {
    const data = Array.from({ length: 7 }, () => randomInt(random, 1, tier === 0 ? 12 : 30))
    const sorted = [...data].sort((a, b) => a - b)
    const third = random() < 0.5
    const right = n(third ? sorted[5] : sorted[1])
    if (new Set(sorted).size < 6) return null
    const choices = options(random, right, [
        { value: n(third ? data[5] : data[1]), error: 'unsorted' },
        { value: n(sorted[3]), error: 'median-quartile' },
        { value: n(third ? sorted[1] : sorted[5]), error: 'order' },
        ...near(right)
    ])
    if (!choices) return null
    const name = third ? 'Q_3' : 'Q_1'
    return question(3, third ? 'third-quartile' : 'first-quartile', say(
        `Aurkitu ${math(name)}: ${math(data.join(',\\ '))}`,
        `Halla ${math(name)} de: ${math(data.join(',\\ '))}`,
        `أوجد ${math(name)} لـ: ${math(data.join(',\\ '))}`
    ), choices, right, say(
        `Ordenatuta: ${math(sorted.join(',\\ '))}. ${math(`${name}=${w(right)}`)}`,
        `Ordenados: ${math(sorted.join(',\\ '))}. ${math(`${name}=${w(right)}`)}`,
        `بعد الترتيب: ${math(sorted.join(',\\ '))}. ${math(`${name}=${w(right)}`)}`
    ))
}

/* ---------- Circuit 4: probability ---------- */

function complementQuestion(random: Random, tier: Tier): StatisticsRaceQuestion | null {
    const hundredths = tier === 0 ? 5 * randomInt(random, 1, 19) : randomInt(random, 1, 99)
    const p = fraction(hundredths, 100)
    const right = fraction(100 - hundredths, 100)
    const choices = options(random, right, [
        { value: p, error: 'same-event' },
        { value: fraction(100 + hundredths, 100), error: 'calculation' },
        { value: fraction(Math.abs(50 - hundredths) || 1, 100), error: 'calculation' },
        ...near(right)
    ])
    if (!choices) return null
    return question(4, 'complement', say(
        `${math(`P(A)=${w(p)}`)}. Zein da aurkako gertaeraren probabilitatea?`,
        `${math(`P(A)=${w(p)}`)}. ¿Cuál es la probabilidad del suceso contrario?`,
        `${math(`P(A)=${w(p)}`)}. ما احتمال الحدث المعاكس؟`
    ), choices, right, same(math(`1-${w(p)}=${w(right)}`)))
}

/** How many of the 36 cells of two dice add up to s */
const diceWays = (s: number) => 6 - Math.abs(s - 7)

function diceQuestion(random: Random, tier: Tier): StatisticsRaceQuestion | null {
    const target = randomInt(random, 2, 12)
    const atLeast = tier > 0 && random() < 0.5
    const ways = atLeast ? sum(Array.from({ length: 13 - target }, (_, index) => diceWays(target + index))) : diceWays(target)
    if (ways === 36) return null
    const right = fraction(ways, 36)
    const choices = options(random, right, ([
        { value: atLeast ? fraction(13 - target, 11) : fraction(1, 11), error: 'sums-equal' },
        { value: fraction(36 - ways, 36), error: 'same-event' },
        { value: fraction(ways, 12), error: 'calculation' },
        { value: fraction(ways + 1, 36), error: 'calculation' },
        { value: fraction(Math.max(ways - 1, 1), 36), error: 'calculation' }
    ] as Candidate[]).filter((candidate) => candidate.value.numerator < candidate.value.denominator), true)
    if (!choices) return null
    const event = atLeast ? `\\geq ${target}` : `${target}`
    return question(4, atLeast ? 'dice-at-least' : 'dice-sum', say(
        `Bi dado jaurtitzen dira. Zein da batura ${math(event)} izateko probabilitatea?`,
        `Se lanzan dos dados. ¿Cuál es la probabilidad de que la suma sea ${math(event)}?`,
        `يُرمى نردان. ما احتمال أن يكون المجموع ${math(event)}؟`
    ), choices, right, same(math(`\\frac{${ways}}{36}${right.denominator === 36 ? '' : `=${w(right, true)}`}`)))
}

function coinsQuestion(random: Random, tier: Tier): StatisticsRaceQuestion | null {
    const coins = tier === 0 ? 2 : 3
    const heads = randomInt(random, 0, coins)
    const ways = [1, coins, coins === 3 ? 3 : 1, 1][heads]
    const outcomes = 2 ** coins
    const right = fraction(ways, outcomes)
    const choices = options(random, right, ([
        { value: fraction(1, coins + 1), error: 'sums-equal' },
        { value: fraction(outcomes - ways, outcomes), error: 'same-event' },
        { value: fraction(ways, outcomes * 2), error: 'calculation' },
        { value: fraction(Math.min(ways + 1, outcomes - 1), outcomes), error: 'calculation' }
    ] as Candidate[]).filter((candidate) => candidate.value.numerator < candidate.value.denominator), true)
    if (!choices) return null
    return question(4, `coins-${coins}`, say(
        `${math(String(coins))} txanpon botatzen dira. Zein da zehazki ${math(String(heads))} aurpegi ateratzeko probabilitatea?`,
        `Se lanzan ${math(String(coins))} monedas. ¿Cuál es la probabilidad de sacar exactamente ${math(String(heads))} caras?`,
        `تُرمى ${math(String(coins))} قطع نقود. ما احتمال ظهور ${math(String(heads))} أوجه بالضبط؟`
    ), choices, right, same(math(`\\frac{${ways}}{${outcomes}}${right.denominator === outcomes ? '' : `=${w(right, true)}`}`)))
}

/* ---------- Public API ---------- */

type Generator = (random: Random, tier: Tier) => StatisticsRaceQuestion | null

const circuitGenerators: Generator[][] = [
    [cumulativeQuestion, relativeCumulativeQuestion, classMarkQuestion],
    [angleQuestion, countFromAngleQuestion, percentFromAngleQuestion],
    [meanTableQuestion, medianTableQuestion, missingDatumQuestion],
    [rangeQuestion, deviationQuestion, quartileQuestion],
    [complementQuestion, diceQuestion, coinsQuestion]
]

export function generateStatisticsRaceQuestion(random: Random, circuit: number, tier: Tier): StatisticsRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 800; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkStatisticsPitAnswer(question: StatisticsRaceQuestion, input: string): AnswerCheck {
    return checkAnswer(readStatisticsAnswer(input), question.answer, question.answerForm)
}

export function statisticsParTime(circuit: number): number {
    return parTimeFor([10, 10, 13, 12, 11][circuit] ?? 11)
}

export const statisticsRaceErrorTips: Record<StatisticsRaceError, LocalizedText> = {
    'no-accumulate': say('Hori maiztasuna da; metatua lortzeko, batu aurreko guztiak ere.', 'Esa es la frecuencia; para la acumulada, suma también todas las anteriores.', 'هذا هو التكرار؛ وللمتجمّع اجمع معه كل ما قبله.'),
    previous: say('Hori aurreko balioaren metatua da: falta da balio honen maiztasuna gehitzea.', 'Esa es la acumulada del valor anterior: falta sumar la frecuencia de este valor.', 'هذا متجمّع القيمة السابقة: ينقص إضافة تكرار هذه القيمة.'),
    absolute: say('Hori zenbatekoa da; erlatiboa lortzeko, zatitu datu kopuruaz (edo hori N da).', 'Eso es una cantidad; para la relativa, divide entre el número de datos (o eso es N).', 'هذا عدد؛ وللنسبي اقسم على عدد البيانات (أو هذا هو N).'),
    limit: say('Hori tartearen muga bat da; klase-marka erdian dago.', 'Ese es un límite del intervalo; la marca de clase está en el centro.', 'هذا حدّ الفئة؛ ومركز الفئة في منتصفها.'),
    width: say('Hori tartearen zabalera da, ez erdiko puntua.', 'Esa es la amplitud del intervalo, no su punto central.', 'هذا طول الفئة لا منتصفها.'),
    'percent-degrees': say('Ehunekoak eta graduak ez dira gauza bera: % 1 = 3,6°.', 'Porcentaje y grados no son lo mismo: 1 % = 3,6°.', 'النسبة والدرجات ليست الشيء نفسه: 1 % = 3.6°.'),
    'whole-circle': say('Hori gainerako zatia da, ez galdetutakoa.', 'Esa es la parte restante, no la que se pregunta.', 'هذا هو الجزء الباقي لا المسؤول عنه.'),
    'ignore-frequency': say('Balio bakoitza bere maiztasunaz biderkatu behar da.', 'Cada valor se multiplica por su frecuencia.', 'تُضرب كل قيمة في تكرارها.'),
    'no-divide': say('Falta da datu kopuruaz zatitzea.', 'Falta dividir entre el número de datos.', 'ينقص القسمة على عدد البيانات.'),
    'mode-median': say('Hori moda da (gehien errepikatzen dena); mediana erdiko datua da.', 'Esa es la moda (la que más se repite); la mediana es el dato central.', 'هذا المنوال (الأكثر تكرارًا)؛ والوسيط هو البيان الأوسط.'),
    unsorted: say('Lehenik ordenatu datuak.', 'Primero ordena los datos.', 'رتّب البيانات أولًا.'),
    'median-quartile': say('Hori mediana da; kuartila erdi baten erdikoa da.', 'Esa es la mediana; el cuartil es el central de una mitad.', 'هذا الوسيط؛ والربيع أوسط أحد النصفين.'),
    'range-max': say('Ibiltartea handiena ken txikiena da.', 'El recorrido es el mayor menos el menor.', 'المدى هو الأكبر ناقص الأصغر.'),
    'same-event': say('Hori gertaera beraren probabilitatea da; aurkakoa $1-P$ da.', 'Esa es la probabilidad del mismo suceso; el contrario es $1-P$.', 'هذا احتمال الحدث نفسه؛ والمعاكس $1-P$.'),
    'sums-equal': say('Emaitzek ez dute aukera bera: zenbatu zuhaitz edo taula batekin.', 'Los resultados no son igual de probables: cuenta con un árbol o una tabla.', 'النتائج ليست متساوية الإمكان: عُدّ بشجرة أو جدول.'),
    order: say('Begiratu ondo zein postutako datua den.', 'Mira bien qué posición ocupa el dato.', 'انتبه إلى موقع البيان.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.')
}
