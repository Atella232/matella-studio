import { pick } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { fraction, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L3 · Histogramaren isatsa (La cola del histograma): the books read in a
   month, 0 to 6, with a bar for each value that the learner raises or
   lowers. Before the measures are drawn, the learner predicts whether the
   mean falls below, on or above the median; then the mode, the median, the
   mean (a balance point) and the box under the bars show the shape: a long
   tail on the right pulls x̄ past Me. Median and quartiles follow the rule
   of the lessons. Pure logic.
   ========================================================================== */

export const TAIL_VALUES = [0, 1, 2, 3, 4, 5, 6]
export const TAIL_COUNT_MAX = 9

export interface TailState {
    counts: number[]
    /** The bar the stepper changes */
    selected: number
    prediction: Prediction | null
}

/** Twenty data with a tail on the right: Mo = 1, Me = 2, x̄ = 2,2 */
export const initialTailState: TailState = { counts: [2, 6, 5, 3, 2, 1, 1], selected: 6, prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export function setTailCount(state: TailState, index: number, count: number): TailState {
    const counts = state.counts.map((value, position) => (position === index ? clamp(count, 0, TAIL_COUNT_MAX) : value))
    // At least one datum is always left
    if (counts.every((value) => value === 0)) return state
    const same = counts.every((value, position) => value === state.counts[position])
    return { ...state, counts, prediction: same ? state.prediction : null }
}

export const selectTail = (state: TailState, selected: number): TailState => ({ ...state, selected: clamp(selected, 0, TAIL_VALUES.length - 1) })

export const tailData = (counts: number[]) => counts.flatMap((count, value) => Array.from({ length: count }, () => value))
export const tailTotal = (counts: number[]) => counts.reduce((sum, count) => sum + count, 0)
/** Σ fᵢxᵢ */
export const tailSum = (counts: number[]) => counts.reduce((sum, count, value) => sum + count * value, 0)
/** x̄, exact */
export const tailMean = (counts: number[]): FractionValue => fraction(tailSum(counts), tailTotal(counts))

/** The lessons' rule: position N·k/100; not whole → the next datum; whole → the mean of that datum and the next */
export function tailPercentile(counts: number[], k: number): number {
    const sorted = tailData(counts)
    const position = (sorted.length * k) / 100
    return Number.isInteger(position) ? (sorted[position - 1] + sorted[position]) / 2 : sorted[Math.ceil(position) - 1]
}

export const tailMedian = (counts: number[]) => tailPercentile(counts, 50)

/** The values with the highest frequency */
export const tailModes = (counts: number[]) => {
    const top = Math.max(...counts)
    return TAIL_VALUES.filter((value) => counts[value] === top)
}

/** Mean below (<), on (=) or above (>) the median */
export function tailPrediction(state: Pick<TailState, 'counts'>): Prediction {
    const mean = tailSum(state.counts) / tailTotal(state.counts)
    const median = tailMedian(state.counts)
    return Math.abs(mean - median) < 1e-9 ? '=' : mean < median ? '<' : '>'
}

const meanIs = (counts: number[], value: number) => tailSum(counts) === value * tailTotal(counts)
const singleMode = (counts: number[]) => (tailModes(counts).length === 1 ? tailModes(counts)[0] : null)

/* ---------- Challenges ---------- */

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })

export const tailChallenges: LabChallenge<TailState>[] = [
    { id: 114301, prompt: say('Egin banaketa simetrikoa: $\\bar{x}=Me=Mo$, moda bakar batekin.', 'Haz la distribución simétrica: $\\bar{x}=Me=Mo$, con una sola moda.', 'اجعل التوزيع متماثلًا: $\\bar{x}=Me=Mo$ بمنوال واحد.', 'Make the distribution symmetric: $\\bar{x}=Me=Mo$, with a single mode.'), hint: say('Jarri barrak berdin erdiko baten bi aldeetan, eta erdikoa altuena.', 'Pon las barras iguales a los dos lados de una central, y la central la más alta.', 'اجعل الأعمدة متساوية على جانبي عمود أوسط، والأوسط أعلاها.', 'Make the bars equal on both sides of a middle one, and the middle one the tallest.'), isSolved: (state) => { const mode = singleMode(state.counts); return mode !== null && meanIs(state.counts, mode) && tailMedian(state.counts) === mode } },
    { id: 114302, prompt: say('Egin isatsa ezkerrean: $\\bar{x}<Me<Mo$.', 'Haz una cola a la izquierda: $\\bar{x}<Me<Mo$.', 'اصنع ذيلًا في اليسار: $\\bar{x}<Me<Mo$.', 'Make a tail on the left: $\\bar{x}<Me<Mo$.'), hint: say('Barra altuenak eskuinean, eta datu gutxi batzuk ezkerrean, urrun.', 'Las barras altas a la derecha y unos pocos datos lejos, a la izquierda.', 'الأعمدة العالية في اليمين وبيانات قليلة بعيدة في اليسار.', 'The tall bars on the right and a few data far away on the left.'), isSolved: (state) => { const mode = singleMode(state.counts); const mean = tailSum(state.counts) / tailTotal(state.counts); const median = tailMedian(state.counts); return mode !== null && mean < median - 1e-9 && median < mode } },
    { id: 114303, prompt: say('Egin batez bestekoa 3 izatea, baina mediana ez.', 'Haz que la media sea 3, pero la mediana no.', 'اجعل المتوسط 3 لا الوسيط.', 'Make the mean 3, but not the median.'), hint: say('Isats luze batek batez bestekoa mugitzen du, eta mediana gutxiago.', 'Una cola larga mueve la media más que la mediana.', 'الذيل الطويل يحرّك المتوسط أكثر من الوسيط.', 'A long tail moves the mean more than the median.'), isSolved: (state) => meanIs(state.counts, 3) && tailMedian(state.counts) !== 3 }
]

const empty = () => TAIL_VALUES.map(() => 0)
const withCounts = (entries: Array<[number, number]>): TailState => {
    const counts = empty()
    for (const [value, count] of entries) counts[value] += count
    return { counts, selected: 0, prediction: null }
}

/** Endless practice: a given mean, or a given median or mode with the tail on one side */
const tailMaker: LabChallengeMaker<TailState> = (random) => {
    const goal = pick(random, ['mean', 'right', 'left'] as const)
    if (goal === 'mean') {
        const twice = pick(random, [3, 4, 5, 6, 7, 8, 9])
        const value = twice / 2
        const text = String(value).replace('.', '{,}')
        const solution = twice % 2 === 0 ? withCounts([[value, 4]]) : withCounts([[(twice - 1) / 2, 3], [(twice + 1) / 2, 3]])
        return {
            prompt: say(`Egin batez bestekoa $${text}$ izatea.`, `Haz que la media sea $${text}$.`, `اجعل المتوسط $${text}$.`, `Make the mean $${text}$.`),
            hint: say('$\\bar{x}=\\frac{\\sum f_i x_i}{N}$: orekatu barrak puntu horren bi aldeetan.', '$\\bar{x}=\\frac{\\sum f_i x_i}{N}$: equilibra las barras a los dos lados de ese punto.', '$\\bar{x}=\\frac{\\sum f_i x_i}{N}$: وازن الأعمدة على جانبي تلك النقطة.', '$\\bar{x}=\\frac{\\sum f_i x_i}{N}$: balance the bars on both sides of that point.'),
            isSolved: (state) => 2 * tailSum(state.counts) === twice * tailTotal(state.counts),
            solution
        }
    }
    if (goal === 'right') {
        // Me = k with the tail on the right: k five times, k − 1 twice, 6 twice
        const k = pick(random, [1, 2, 3])
        return {
            prompt: say(`Egin $Me=${k}$ izatea, eta isatsa eskuinean: $\\bar{x}>Me$.`, `Haz que $Me=${k}$ con la cola a la derecha: $\\bar{x}>Me$.`, `اجعل $Me=${k}$ مع ذيل في اليمين: $\\bar{x}>Me$.`, `Make $Me=${k}$ with the tail on the right: $\\bar{x}>Me$.`),
            hint: say('Datu gehienak hor, eta gutxi batzuk eskuinean, urrun.', 'Casi todos los datos ahí y unos pocos lejos, a la derecha.', 'معظم البيانات هناك وقليل منها بعيد في اليمين.', 'Almost all the data there and a few far away on the right.'),
            isSolved: (state) => tailMedian(state.counts) === k && tailPrediction(state) === '>',
            solution: withCounts([[k, 5], [k - 1, 2], [6, 2]])
        }
    }
    // Mo = k with the tail on the left: k five times, k + 1 twice, 0 twice
    const k = pick(random, [3, 4, 5])
    return {
        prompt: say(`Egin $Mo=${k}$ izatea, eta isatsa ezkerrean: $\\bar{x}<Me$.`, `Haz que $Mo=${k}$ con la cola a la izquierda: $\\bar{x}<Me$.`, `اجعل $Mo=${k}$ مع ذيل في اليسار: $\\bar{x}<Me$.`, `Make $Mo=${k}$ with the tail on the left: $\\bar{x}<Me$.`),
        hint: say('Barra altuena hor, eta datu gutxi batzuk ezkerrean, urrun.', 'La barra más alta ahí y unos pocos datos lejos, a la izquierda.', 'أعلى عمود هناك وبيانات قليلة بعيدة في اليسار.', 'The tallest bar there and a few data far away on the left.'),
        isSolved: (state) => singleMode(state.counts) === k && tailPrediction(state) === '<',
        solution: withCounts([[k, 5], [k + 1, 2], [0, 2]])
    }
}

export const tailExtra = freshFrom(initialTailState, tailMaker)
