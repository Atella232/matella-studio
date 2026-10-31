import type { Stars } from '../../../features/unit-v2/games/records.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { fraction, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { tablePercentile } from '../../dbh4-aplikatuak-estatistika/stats.ts'

/* ==========================================================================
   The three picture and word games of Estatistika eta probabilitatea
   3. DBH, each a round of eight questions:
   J1 · Irakurri grafikoa (Lee el gráfico): a bar chart of frequencies;
       the learner picks its mode, its median or its mean. The wrong
       answers are the usual slips: the frequency for the mode, the middle
       value without counting, the mean of the values without weighting.
   J2 · Zer aldagai mota? (¿Qué tipo de variable?): a question of a survey;
       qualitative, discrete or continuous; then which chart suits it.
   J3 · Zein poltsa? (¿Qué bolsa?): two bags of balls; which gives the
       greater probability, or are they the same?
   ========================================================================== */

export const QUIZ_ROUNDS = 8

export function quizStars(score: number): Stars {
    if (score >= 8) return 3
    if (score >= 6) return 2
    if (score >= 4) return 1
    return 0
}

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const num = (value: number) => String(Math.round(value * 10000) / 10000).replace('.', '{,}')

/* ---------- J1. Read the chart ---------- */

export type Measure = 'mode' | 'median' | 'mean'
export const READ_MEASURES: Measure[] = ['mode', 'median', 'mean']

export interface ReadRound {
    /** Frequencies of the values 1 to 5 */
    counts: number[]
    measure: Measure
    /** LaTeX numbers; the answer is one of them */
    options: string[]
    answer: string
}

const total = (counts: number[]) => counts.reduce((sum, count) => sum + count, 0)
const rows = (counts: number[]) => counts.map((count, index) => ({ value: index + 1, count })).filter((row) => row.count > 0)

export function readValue(counts: number[], measure: Measure): number {
    if (measure === 'mode') return counts.indexOf(Math.max(...counts)) + 1
    if (measure === 'median') return tablePercentile(rows(counts), 50)
    return counts.reduce((sum, count, index) => sum + count * (index + 1), 0) / total(counts)
}

/** The answers a learner reaches with the usual slips */
function slips(counts: number[], measure: Measure): number[] {
    if (measure === 'mode') return [Math.max(...counts), counts.indexOf(Math.min(...counts.filter((count) => count > 0))) + 1, 3]
    if (measure === 'median') return [3, tablePercentile(rows(counts).map((row) => ({ value: row.count, count: 1 })).sort((a, b) => a.value - b.value), 50), readValue(counts, 'mean')]
    return [3, total(counts) / 5, readValue(counts, 'median')]
}

/** A value with at most four decimals, so that it can be written exactly */
const terminating = (value: number) => Math.abs(value * 10000 - Math.round(value * 10000)) < 1e-6

function readRound(random: Random, measure: Measure): ReadRound | null {
    const counts = Array.from({ length: 5 }, () => randomInt(random, 0, 7))
    const n = total(counts)
    if (n < 6 || counts.filter((count) => count === Math.max(...counts)).length > 1) return null
    const right = readValue(counts, measure)
    if (!terminating(right)) return null
    const answer = num(right)
    const wrong = [...new Set(slips(counts, measure).filter((value) => terminating(value)).map(num))].filter((value) => value !== answer)
    if (wrong.length < 2) return null
    return { counts, measure, options: shuffle(random, [answer, ...wrong.slice(0, 2)]), answer }
}

export function createReadRounds(random: Random, level: number): ReadRound[] {
    const measure = READ_MEASURES[level] ?? 'mode'
    const result: ReadRound[] = []
    while (result.length < QUIZ_ROUNDS) {
        const next = readRound(random, measure)
        if (next && !result.some((round) => round.counts.join() === next.counts.join())) result.push(next)
    }
    return result
}

export function readWhy(round: ReadRound): LocalizedText {
    const n = total(round.counts)
    if (round.measure === 'mode') return say(`Barrarik altuena $${round.answer}$ balioarena da: hori da moda, ez haren maiztasuna.`, `La barra más alta es la del valor $${round.answer}$: esa es la moda, no su frecuencia.`, `أعلى عمود للقيمة $${round.answer}$: هذا هو المنوال لا تكراره.`, `The tallest bar is the value $${round.answer}$: that is the mode, not its frequency.`)
    if (round.measure === 'median') return say(`$N=${n}$ datu: ordenatuta, erdian $${round.answer}$ dago.`, `$N=${n}$ datos: ordenados, en medio queda $${round.answer}$.`, `$N=${n}$ بيانًا: بعد الترتيب يقع في المنتصف $${round.answer}$.`, `$N=${n}$ data: sorted, $${round.answer}$ is in the middle.`)
    const products = round.counts.map((count, index) => count * (index + 1)).reduce((sum, value) => sum + value, 0)
    return say(`Balioak maiztasunez biderkatuta: $\\frac{${products}}{${n}}=${round.answer}$.`, `Multiplicando cada valor por su frecuencia: $\\frac{${products}}{${n}}=${round.answer}$.`, `بضرب كل قيمة في تكرارها: $\\frac{${products}}{${n}}=${round.answer}$.`, `Multiplying each value by its frequency: $\\frac{${products}}{${n}}=${round.answer}$.`)
}

/* ---------- J2. Which kind of variable? ---------- */

export type VariableKind = 'qualitative' | 'discrete' | 'continuous'
export type ChartKind = 'bars' | 'histogram' | 'pie'

interface Survey {
    text: LocalizedText
    kind: VariableKind
}

export const SURVEYS: Survey[] = [
    { text: say('Kolore gogokoena', 'Color favorito', 'اللون المفضّل', 'Favourite colour'), kind: 'qualitative' },
    { text: say('Anai-arreba kopurua', 'Número de hermanos', 'عدد الإخوة', 'Number of siblings'), kind: 'discrete' },
    { text: say('Altuera (cm)', 'Altura (cm)', 'الطول (سم)', 'Height (cm)'), kind: 'continuous' },
    { text: say('Kirol gogokoena', 'Deporte favorito', 'الرياضة المفضّلة', 'Favourite sport'), kind: 'qualitative' },
    { text: say('Etxeko gela kopurua', 'Número de habitaciones de casa', 'عدد غرف البيت', 'Number of rooms at home'), kind: 'discrete' },
    { text: say('Pisua (kg)', 'Peso (kg)', 'الوزن (كغ)', 'Weight (kg)'), kind: 'continuous' },
    { text: say('Eskolara etortzeko garraioa', 'Medio de transporte al colegio', 'وسيلة المواصلات إلى المدرسة', 'How you travel to school'), kind: 'qualitative' },
    { text: say('Hilabete batean irakurritako liburuak', 'Libros leídos en un mes', 'الكتب المقروءة في شهر', 'Books read in a month'), kind: 'discrete' },
    { text: say('Eskolara iristeko denbora (min)', 'Tiempo para llegar al colegio (min)', 'زمن الوصول إلى المدرسة (دقيقة)', 'Time to get to school (min)'), kind: 'continuous' },
    { text: say('Jaioterria', 'Lugar de nacimiento', 'مكان الولادة', 'Place of birth'), kind: 'qualitative' },
    { text: say('Partida bateko golak', 'Goles en un partido', 'الأهداف في مباراة', 'Goals in a match'), kind: 'discrete' },
    { text: say('Tenperatura (°C)', 'Temperatura (°C)', 'درجة الحرارة (°C)', 'Temperature (°C)'), kind: 'continuous' },
    { text: say('Musika estilo gogokoena', 'Estilo de música favorito', 'نوع الموسيقى المفضّل', 'Favourite kind of music'), kind: 'qualitative' },
    { text: say('Etxeko animalia kopurua', 'Número de mascotas', 'عدد الحيوانات الأليفة', 'Number of pets'), kind: 'discrete' },
    { text: say('Lo egindako orduak', 'Horas de sueño', 'ساعات النوم', 'Hours of sleep'), kind: 'continuous' },
    { text: say('Begien kolorea', 'Color de ojos', 'لون العينين', 'Eye colour'), kind: 'qualitative' }
]

/** The chart that suits each kind of variable */
export const CHART_FOR: Record<VariableKind, ChartKind> = { qualitative: 'pie', discrete: 'bars', continuous: 'histogram' }

export interface VariableRound {
    survey: Survey
    /** Level 0 and 2 ask the kind of variable; level 1 asks the chart */
    asks: 'kind' | 'chart'
    answer: string
}

export function createVariableRounds(random: Random, level: number): VariableRound[] {
    return shuffle(random, SURVEYS).slice(0, QUIZ_ROUNDS).map((survey) => {
        const asks = level === 1 ? 'chart' : level === 2 ? pick(random, ['kind', 'chart'] as const) : 'kind'
        return { survey, asks, answer: asks === 'kind' ? survey.kind : CHART_FOR[survey.kind] }
    })
}

/* ---------- J3. Which bag? ---------- */

export type BagChoice = 'A' | 'B' | 'same'

export interface Bag {
    red: number
    blue: number
    green: number
}

export interface BagsRound {
    a: Bag
    b: Bag
    /** The colour asked for */
    colour: 'red' | 'blue'
    answer: BagChoice
}

const ballsIn = (bag: Bag) => bag.red + bag.blue + bag.green
export const bagProbability = (bag: Bag, colour: 'red' | 'blue'): FractionValue => fraction(bag[colour], ballsIn(bag))

function bag(random: Random, level: number): Bag {
    const red = randomInt(random, 1, 6)
    const blue = randomInt(random, 1, 6)
    // Level 0 keeps the same number of balls, so green ones let two bags differ and still be fair
    const green = level === 1 ? 0 : randomInt(random, 0, 3)
    return { red, blue, green }
}

export function createBagsRounds(random: Random, level: number): BagsRound[] {
    const wanted = shuffle(random, Array.from({ length: QUIZ_ROUNDS }, (_, index) => (['A', 'B', 'same'] as const)[index % 3]))
    return wanted.map((choice) => {
        for (;;) {
            const a = bag(random, level)
            const b = bag(random, level)
            // Level 0: the same number of balls in both bags
            if (level === 0 && ballsIn(a) !== ballsIn(b)) continue
            if (a.red === b.red && a.blue === b.blue && a.green === b.green) continue
            const colour = level === 2 ? pick(random, ['red', 'blue'] as const) : 'red'
            const pa = bagProbability(a, colour)
            const pb = bagProbability(b, colour)
            const difference = pa.numerator * pb.denominator - pb.numerator * pa.denominator
            const answer: BagChoice = difference === 0 ? 'same' : difference > 0 ? 'A' : 'B'
            // Level 1 and 2: a bag with more red balls is not always the better one
            if (answer === choice) return { a, b, colour, answer }
        }
    })
}

export function bagsWhy(round: BagsRound): LocalizedText {
    const pa = bagProbability(round.a, round.colour)
    const pb = bagProbability(round.b, round.colour)
    const show = (value: FractionValue, bagged: Bag) => `\\frac{${bagged[round.colour]}}{${ballsIn(bagged)}}${value.denominator !== ballsIn(bagged) ? `=\\frac{${value.numerator}}{${value.denominator}}` : ''}`
    const compare = `$P_{A}=${show(pa, round.a)}$, $P_{B}=${show(pb, round.b)}$`
    return say(`${compare}. Aldeko bolak zati bola guztiak.`, `${compare}. Bolas favorables entre todas las bolas.`, `${compare}. الكرات المواتية على كل الكرات.`, `${compare}. Favourable balls over all the balls.`)
}
