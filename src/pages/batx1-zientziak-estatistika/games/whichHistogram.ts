import { pick, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J2 · Zein histograma? (¿Qué histograma?): three bar charts of ten data
   each. Level 1: which one has the largest (or smallest) σ — same mean,
   different spread. Level 2: which one has the largest CV — the shapes
   also move along the axis, so the largest σ is not always the largest
   CV. Level 3: which one has a given x̄ and σ — one decoy has the same
   mean and another the same σ. Pure logic.
   ========================================================================== */

export const HISTOGRAM_ROUNDS = 6

/** Symmetric shapes of ten data on five values, from tight to spread out */
export const SHAPES = [
    [0, 2, 6, 2, 0],
    [0, 3, 4, 3, 0],
    [1, 1, 6, 1, 1],
    [1, 2, 4, 2, 1],
    [2, 2, 2, 2, 2],
    [3, 1, 2, 1, 3],
    [4, 1, 0, 1, 4],
    [5, 0, 0, 0, 5]
]

export interface MiniHistogram {
    shape: number
    /** The values are offset + 1 … offset + 5 */
    offset: number
}

export type HistogramQuestion = 'max-sd' | 'min-sd' | 'max-cv' | 'match'

export interface HistogramRound {
    charts: MiniHistogram[]
    question: HistogramQuestion
    answer: number
}

export const chartValues = (chart: MiniHistogram) => [1, 2, 3, 4, 5].map((value) => value + chart.offset)
export const chartMean = (chart: MiniHistogram) => {
    const counts = SHAPES[chart.shape]
    return chartValues(chart).reduce((sum, value, index) => sum + value * counts[index], 0) / 10
}
export const chartSigma = (chart: MiniHistogram) => {
    const counts = SHAPES[chart.shape]
    const mean = chartMean(chart)
    return Math.sqrt(chartValues(chart).reduce((sum, value, index) => sum + counts[index] * (value - mean) ** 2, 0) / 10)
}
export const chartCv = (chart: MiniHistogram) => chartSigma(chart) / chartMean(chart)

const argBy = (charts: MiniHistogram[], score: (chart: MiniHistogram) => number, largest: boolean) =>
    charts.reduce((best, chart, index) => ((largest ? score(chart) > score(charts[best]) : score(chart) < score(charts[best])) ? index : best), 0)

/** No two charts closer than `gap` in the measure asked about */
const apart = (charts: MiniHistogram[], score: (chart: MiniHistogram) => number, gap: number) =>
    charts.every((chart, index) => charts.every((other, position) => position <= index || Math.abs(score(chart) - score(other)) >= gap))

function makeRound(random: Random, level: number, trap: boolean): HistogramRound | null {
    if (level === 0) {
        const shapes = shuffle(random, SHAPES.map((_, index) => index)).slice(0, 3)
        const charts = shapes.map((shape) => ({ shape, offset: 0 }))
        if (!apart(charts, chartSigma, 0.3)) return null
        const question = trap ? 'min-sd' : 'max-sd'
        return { charts, question, answer: argBy(charts, chartSigma, question === 'max-sd') }
    }
    if (level === 1) {
        const charts = shuffle(random, SHAPES.map((_, index) => index)).slice(0, 3).map((shape) => ({ shape, offset: pick(random, [0, 5, 10, 15]) }))
        if (!apart(charts, chartCv, 0.04) || !apart(charts, chartSigma, 0.15)) return null
        const answer = argBy(charts, chartCv, true)
        // The trap: the chart with the largest σ is not the one with the largest CV
        if (trap !== (argBy(charts, chartSigma, true) !== answer)) return null
        return { charts, question: 'max-cv', answer }
    }
    // Level 3: the right one, one with the same mean and another σ, one with the same σ and another mean
    const shapes = shuffle(random, SHAPES.map((_, index) => index))
    const offsets = shuffle(random, [0, 5, 10])
    const right = { shape: shapes[0], offset: offsets[0] }
    const sameMean = { shape: shapes[1], offset: offsets[0] }
    const sameSigma = { shape: shapes[0], offset: offsets[1] }
    if (Math.abs(chartSigma(right) - chartSigma(sameMean)) < 0.3) return null
    const charts = shuffle(random, [right, sameMean, sameSigma])
    return { charts, question: 'match', answer: charts.indexOf(right) }
}

export function createHistogramRounds(random: Random, level: number): HistogramRound[] {
    const traps = shuffle(random, level === 0 ? [true, true, true, false, false, false] : [true, true, true, true, false, false])
    return traps.map((trap) => {
        for (let attempt = 0; attempt < 3000; attempt += 1) {
            const round = makeRound(random, level, trap)
            if (round) return round
        }
        throw new Error(`No round for level ${level}`)
    })
}

/** A decimal for LaTeX with two places at most: 1{,}41, 8 */
export const twoPlaces = (value: number) => String(Math.round(value * 100) / 100).replace('.', '{,}')
