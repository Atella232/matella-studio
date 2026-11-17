import { createRandom, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { say } from '../../batx2-zientziak-probabilitatea/lab/probability.ts'
import { between } from '../../batx2-zientziak-banaketak/normal.ts'

/* ==========================================================================
   L1 · Histogramatik kanpaira (Del histograma a la campana): heights of
   N(170; 10), drawn with a seeded random source, so a state always gives
   the same data. The learner adds 100 or 1000 at a time, chooses the
   class width (10, 5 or 2,5 cm) and taps a class: the histogram is drawn
   as a density (share ÷ width), so with many data it follows the bell,
   and the tapped class shows its share against the normal's probability
   (from the table: every class edge is a z with two decimals). Before
   the numbers, the learner says whether the class 160–180 holds less
   than, about or more than two thirds of the data. Pure.
   ========================================================================== */

export const HIST_MEAN = 170
export const HIST_SD = 10
export const HIST_FROM = 130
export const HIST_TO = 210
export const HIST_WIDTHS = [10, 5, 2.5] as const

export interface HistogramState {
    /** Heights drawn so far */
    data: number[]
    /** How many times data were added: the seed of the next draw */
    draws: number
    width: number
    /** The left edge of the tapped class */
    selected: number
    prediction: Prediction | null
}

export const initialHistogramState: HistogramState = { data: [], draws: 0, width: 10, selected: 160, prediction: null }

/** Add heights of N(170; 10) with the Box–Muller method */
export function addData(state: HistogramState, howMany: number): HistogramState {
    const random = createRandom(4_217 + state.draws * 6_997)
    const data = [...state.data]
    for (let index = 0; index < howMany; index += 1) {
        const u = Math.max(1e-12, random())
        const v = random()
        data.push(HIST_MEAN + HIST_SD * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v))
    }
    return { ...state, data, draws: state.draws + 1 }
}

export const emptyHistogram = (state: HistogramState): HistogramState => ({ ...state, data: [], draws: 0 })

/** A new width keeps the data; the tapped class moves to the class that holds its old edge */
export function setHistogram(state: HistogramState, patch: Partial<Pick<HistogramState, 'width' | 'selected'>>): HistogramState {
    const width = (HIST_WIDTHS as readonly number[]).includes(patch.width ?? state.width) ? patch.width ?? state.width : state.width
    const raw = patch.selected ?? state.selected
    const selected = Math.min(HIST_TO - width, Math.max(HIST_FROM, HIST_FROM + Math.floor((raw - HIST_FROM) / width) * width))
    return { ...state, width, selected }
}

/** The left edges of the classes */
export const classesOf = (state: Pick<HistogramState, 'width'>) => Array.from({ length: Math.round((HIST_TO - HIST_FROM) / state.width) }, (_, index) => HIST_FROM + index * state.width)
/** How many data fall in [a, a + width) */
export const countIn = (state: Pick<HistogramState, 'data' | 'width'>, a: number) => state.data.filter((value) => value >= a && value < a + state.width).length
/** The share of the data in [a, a + width) */
export const shareIn = (state: Pick<HistogramState, 'data' | 'width'>, a: number) => (state.data.length ? countIn(state, a) / state.data.length : 0)
/** The normal's probability of [a, a + width), in ten-thousandths from the table */
export const normalIn = (state: Pick<HistogramState, 'width'>, a: number) => between((a - HIST_MEAN) / HIST_SD, (a + state.width - HIST_MEAN) / HIST_SD)

/** Does 160–180 hold less than, about (68,26 %) or more than two thirds? Always about: the rule */
export const histogramPrediction = (): Prediction => compareTo(between(-1, 1) / 10_000, between(-1, 1) / 10_000)

/* ---------- Challenges ---------- */

export const histogramChallenges: LabChallenge<HistogramState>[] = [
    { id: 140101, prompt: say('Gutxienez 1000 daturekin eta 5 cm-ko klaseekin, aukeratu 165–170 klasea.', 'Con al menos 1000 datos y clases de 5 cm, elige la clase 165–170.', 'مع 1000 معطى على الأقل وفئات عرضها 5 سم، اختر الفئة 165–170.', 'With at least 1,000 data and 5 cm classes, choose the class 165–170.'), hint: say('Gehitu datuak eta aldatu zabalera.', 'Añade datos y cambia la anchura.', 'أضف بيانات وغيّر العرض.', 'Add data and change the width.'), isSolved: (state) => state.data.length >= 1000 && state.width === 5 && state.selected === 165 },
    { id: 140102, prompt: say('5 cm-ko klaseekin, aukeratu normalaren probabilitatea 0,19 baino handiagoa duen klase bat.', 'Con clases de 5 cm, elige una clase cuya probabilidad normal pase de 0,19.', 'مع فئات عرضها 5 سم، اختر فئة يتجاوز احتمالها الطبيعي 0.19.', 'With 5 cm classes, choose a class whose normal probability is above 0.19.'), hint: say('Kanpaiaren erdian daude handienak.', 'Las mayores están en el centro de la campana.', 'الأكبر في وسط الجرس.', 'The largest are in the middle of the bell.'), isSolved: (state) => state.width === 5 && normalIn(state, state.selected) > 1900 },
    { id: 140103, prompt: say('10 000 datu bildu eta, 2,5 cm-ko klaseekin, aukeratu probableenetako bat.', 'Reúne 10 000 datos y, con clases de 2,5 cm, elige una de las más probables.', 'اجمع 10 000 معطى، ومع فئات عرضها 2.5 سم اختر إحدى الأرجح.', 'Gather 10,000 data and, with 2.5 cm classes, choose one of the most likely.'), hint: say('Probableenak 170 zenbakiaren ondoan daude.', 'Las más probables están junto al 170.', 'الأرجح بجوار 170.', 'The most likely ones are next to 170.'), isSolved: (state) => state.data.length >= 10_000 && state.width === 2.5 && (state.selected === 167.5 || state.selected === 170) }
]

/** Endless practice: the class with a given probability under the bell */
const histogramMaker: LabChallengeMaker<HistogramState> = (random) => {
    const width = HIST_WIDTHS[randomInt(random, 0, 1)]
    const classes = classesOf({ width }).filter((a) => a >= 150 && a + width <= 190)
    const a = classes[randomInt(random, 0, classes.length - 1)]
    const target = normalIn({ width }, a)
    const latex = (target / 10_000).toFixed(4).replace('.', '{,}')
    const solution: HistogramState = { ...initialHistogramState, width, selected: a }
    return {
        prompt: say(`${width === 10 ? 10 : 5} cm-ko klaseekin, aukeratu normalaren probabilitatea $${latex}$ duen klase bat.`, `Con clases de ${width === 10 ? 10 : 5} cm, elige una clase de probabilidad normal $${latex}$.`, `مع فئات عرضها ${width === 10 ? 10 : 5} سم، اختر فئة احتمالها الطبيعي $${latex}$.`, `With ${width === 10 ? 10 : 5} cm classes, choose a class with normal probability $${latex}$.`),
        hint: say('Kanpaia simetrikoa da: bi klase egon daitezke.', 'La campana es simétrica: puede haber dos clases.', 'الجرس متماثل: قد توجد فئتان.', 'The bell is symmetric: there may be two classes.'),
        isSolved: (state) => state.width === width && normalIn(state, state.selected) === target,
        solution
    }
}

export const histogramExtra = freshFrom(initialHistogramState, histogramMaker)
