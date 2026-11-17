import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { say } from '../../batx2-zientziak-probabilitatea/lab/probability.ts'
import { Phi } from '../../batx2-zientziak-banaketak/normal.ts'

/* ==========================================================================
   L3 · Doitu normal batera (Ajusta a una normal): three tables of grouped
   data (80 heights, 100 waiting times, 144 marks). The learner moves μ
   and σ, or presses «x̄ and s», and sees the expected counts of each class
   (the first and last taken as open) over the observed ones, with the
   differences and the largest as a percentage of the total. Before the
   numbers, they say whether, with x̄ and s, the largest difference stays
   under 5 %, is exactly 5 % or goes over (Matella's rule). The expected
   counts use Φ itself, since μ and σ move freely. Pure.
   ========================================================================== */

export interface NormalData {
    title: LocalizedText
    /** The edges of the classes, one more than the counts */
    edges: number[]
    observed: number[]
}

export const NORMAL_DATA: NormalData[] = [
    { title: say('80 gazteren altuera (cm)', 'Estatura de 80 jóvenes (cm)', 'أطوال 80 شابًّا (سم)', 'Height of 80 young people (cm)'), edges: [150, 160, 170, 180, 190], observed: [15, 25, 25, 15] },
    { title: say('100 itxaronaldi (minututan)', '100 esperas (en minutos)', '100 فترة انتظار (بالدقائق)', '100 waits (in minutes)'), edges: [0, 5, 10, 15, 20], observed: [40, 30, 20, 10] },
    { title: say('144 ikasleren nota', 'Notas de 144 alumnos', 'علامات 144 طالبًا', 'Marks of 144 students'), edges: [2, 4, 6, 8, 10], observed: [27, 45, 45, 27] }
]

export interface FitNormalState {
    data: number
    /** μ and σ in tenths */
    mean: number
    sd: number
    prediction: Prediction | null
}

export const FIT_SD = { min: 5, max: 200, step: 5 } as const
export const initialFitNormalState: FitNormalState = { data: 0, mean: 1650, sd: 150, prediction: null }

export const totalOf = (data: NormalData) => data.observed.reduce((sum, value) => sum + value, 0)
const marksOf = (data: NormalData) => data.observed.map((_, k) => (data.edges[k] + data.edges[k + 1]) / 2)
export const meanOf = (data: NormalData) => marksOf(data).reduce((sum, mark, k) => sum + mark * data.observed[k], 0) / totalOf(data)
export const sdOf = (data: NormalData) => Math.sqrt(marksOf(data).reduce((sum, mark, k) => sum + (mark - meanOf(data)) ** 2 * data.observed[k], 0) / totalOf(data))

export function setFitNormal(state: FitNormalState, patch: Partial<Pick<FitNormalState, 'data' | 'mean' | 'sd'>>): FitNormalState {
    const data = Math.min(NORMAL_DATA.length - 1, Math.max(0, patch.data ?? state.data))
    const table = NORMAL_DATA[data]
    const low = table.edges[0] * 10
    const high = table.edges[table.edges.length - 1] * 10
    const mean = Math.min(high, Math.max(low, Math.round((patch.mean ?? state.mean) / 5) * 5))
    const sd = Math.min(FIT_SD.max, Math.max(FIT_SD.min, Math.round((patch.sd ?? state.sd) / FIT_SD.step) * FIT_SD.step))
    return { data, mean, sd, prediction: data === state.data ? state.prediction : null }
}

/** x̄ and s of a table, in tenths, as the button sets them */
export const estimateOf = (data: NormalData) => ({ mean: Math.round(meanOf(data) * 10), sd: Math.round(sdOf(data) * 10) })

/** The expected counts with N(μ; σ), μ and σ in tenths; the first and last classes are open */
export function expectedOf(data: NormalData, mean: number, sd: number): number[] {
    const z = (x: number) => (x - mean / 10) / (sd / 10)
    const inner = data.edges.slice(1, -1).map((edge) => Phi(z(edge)))
    const cumulative = [0, ...inner, 1]
    return data.observed.map((_, k) => totalOf(data) * (cumulative[k + 1] - cumulative[k]))
}
export const differencesOf = (data: NormalData, mean: number, sd: number) => expectedOf(data, mean, sd).map((value, k) => Math.abs(data.observed[k] - value))
/** The largest difference as a percentage of the total */
export const percentOf = (data: NormalData, mean: number, sd: number) => (100 * Math.max(...differencesOf(data, mean, sd))) / totalOf(data)
export const accepted = (data: NormalData, mean: number, sd: number) => percentOf(data, mean, sd) <= 5 + 1e-9

/** With x̄ and s, is the largest difference under 5 %, exactly 5 % or over it? */
export function fitNormalPrediction(state: FitNormalState): Prediction {
    const data = NORMAL_DATA[state.data]
    const { mean, sd } = estimateOf(data)
    return compareTo(Math.round(percentOf(data, mean, sd) * 100) / 100, 5)
}

/** The smallest σ (in steps of 0,5) above s with which the fit with μ = x̄ is rejected */
export function firstRejectedSd(data: NormalData): number {
    const { mean, sd } = estimateOf(data)
    for (let value = sd + FIT_SD.step; value <= FIT_SD.max; value += FIT_SD.step) if (!accepted(data, mean, value)) return value
    return FIT_SD.max
}

/* ---------- Challenges ---------- */

export const fitNormalChallenges: LabChallenge<FitNormalState>[] = [
    { id: 140121, prompt: say('Altueren datuekin, jarri $\\mu=\\bar{x}$ eta $\\sigma=s$.', 'Con los datos de las estaturas, pon $\\mu=\\bar{x}$ y $\\sigma=s$.', 'ببيانات الأطوال، ضع $\\mu=\\bar{x}$ و$\\sigma=s$.', 'With the heights\' data, set $\\mu=\\bar{x}$ and $\\sigma=s$.'), hint: say('$\\bar{x}=170$ eta $s=10$.', '$\\bar{x}=170$ y $s=10$.', '$\\bar{x}=170$ و$s=10$.', '$\\bar{x}=170$ and $s=10$.'), isSolved: (state) => state.data === 0 && state.mean === 1700 && state.sd === 100 },
    { id: 140122, prompt: say('Itxaronaldien datuekin, jarri $\\bar{x}$ eta $s$, eta begiratu normala balio duen.', 'Con los datos de las esperas, pon $\\bar{x}$ y $s$ y mira si la normal sirve.', 'ببيانات الانتظار، ضع $\\bar{x}$ و$s$ وانظر هل يصلح التوزيع الطبيعي.', 'With the waiting data, set $\\bar{x}$ and $s$ and see whether the normal works.'), hint: say('$\\bar{x}=7{,}5$ eta $s=5$.', '$\\bar{x}=7{,}5$ y $s=5$.', '$\\bar{x}=7{,}5$ و$s=5$.', '$\\bar{x}=7{,}5$ and $s=5$.'), isSolved: (state) => state.data === 1 && state.mean === 75 && state.sd === 50 },
    { id: 140123, prompt: say('Noten datuekin, $\\mu=\\bar{x}$ utzita, igo $\\sigma$ doikuntza baztertzen den lehen baliora arte.', 'Con los datos de las notas y $\\mu=\\bar{x}$, sube $\\sigma$ hasta el primer valor con el que se rechaza el ajuste.', 'ببيانات العلامات ومع $\\mu=\\bar{x}$، زِد $\\sigma$ حتى أول قيمة تُرفض معها المطابقة.', 'With the marks\' data and $\\mu=\\bar{x}$, raise $\\sigma$ to the first value with which the fit is rejected.'), hint: say('Hasi $s=2$ balioan, eta igo pixkanaka.', 'Empieza en $s=2$ y ve subiendo.', 'ابدأ من $s=2$ وزِد شيئًا فشيئًا.', 'Start at $s=2$ and go up step by step.'), isSolved: (state) => state.data === 2 && state.mean === 60 && state.sd === firstRejectedSd(NORMAL_DATA[2]) }
]

/** Endless practice: in one of the tables, x̄ and s, or the first σ that rejects */
const fitNormalMaker: LabChallengeMaker<FitNormalState> = (random) => {
    for (;;) {
        const data = randomInt(random, 0, NORMAL_DATA.length - 1)
        const table = NORMAL_DATA[data]
        const estimate = estimateOf(table)
        const widen = random() < 0.5
        if (widen && !accepted(table, estimate.mean, estimate.sd)) continue
        const target = widen ? { mean: estimate.mean, sd: firstRejectedSd(table) } : estimate
        const name = table.title
        return {
            prompt: widen
                ? say(`«${name.eu}»: $\\mu=\\bar{x}$ utzita, igo $\\sigma$ doikuntza baztertzen den lehen baliora arte.`, `«${name.es}»: con $\\mu=\\bar{x}$, sube $\\sigma$ hasta el primer valor que rechaza el ajuste.`, `«${name.ar}»: مع $\\mu=\\bar{x}$ زِد $\\sigma$ حتى أول قيمة تُرفض معها المطابقة.`, `‘${name.en}’: with $\\mu=\\bar{x}$, raise $\\sigma$ to the first value that rejects the fit.`)
                : say(`«${name.eu}»: jarri $\\mu=\\bar{x}$ eta $\\sigma=s$.`, `«${name.es}»: pon $\\mu=\\bar{x}$ y $\\sigma=s$.`, `«${name.ar}»: ضع $\\mu=\\bar{x}$ و$\\sigma=s$.`, `‘${name.en}’: set $\\mu=\\bar{x}$ and $\\sigma=s$.`),
            hint: say('Klase-markekin kalkulatzen dira $\\bar{x}$ eta $s$.', '$\\bar{x}$ y $s$ salen con las marcas de clase.', '$\\bar{x}$ و$s$ تُحسبان بمراكز الفئات.', '$\\bar{x}$ and $s$ come from the class marks.'),
            isSolved: (state) => state.data === data && state.mean === target.mean && state.sd === target.sd,
            solution: { data, mean: target.mean, sd: target.sd, prediction: null }
        }
    }
}

export const fitNormalExtra = freshFrom(initialFitNormalState, fitNormalMaker)
