import { pick } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { fraction, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L3 · Zabalera desberdinak (Anchos distintos): the hours of television of
   50 people, from 0 to 12, are grouped in three intervals whose two inner
   ends the learner moves. Before predicting, the bars are drawn the wrong
   way, with height = f; afterwards (and with ▶ the change is animated)
   they are drawn well, with height = f / a, so that the area is the
   frequency. The prediction: drawn well, is the third bar (usually the
   widest) lower than, as tall as or taller than the first? Pure logic.
   ========================================================================== */

/** People per hour of the 50 viewers, hour by hour from 0 to 12 */
export const HOURS = [3, 5, 6, 8, 8, 6, 4, 3, 2, 2, 2, 1]
export const HOURS_END = HOURS.length

export interface WidthsState {
    /** The two inner ends: 0 < first < second < 12 */
    cuts: [number, number]
    prediction: Prediction | null
}

export const initialWidthsState: WidthsState = { cuts: [2, 6], prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

export interface WidthsBar {
    from: number
    to: number
    count: number
    width: number
    /** f / a, exact */
    height: FractionValue
}

export function barsOf(cuts: [number, number]): WidthsBar[] {
    const ends = [0, cuts[0], cuts[1], HOURS_END]
    return [0, 1, 2].map((index) => {
        const from = ends[index]
        const to = ends[index + 1]
        const count = HOURS.slice(from, to).reduce((sum, value) => sum + value, 0)
        return { from, to, count, width: to - from, height: fraction(count, to - from) }
    })
}

const value = (f: FractionValue) => f.numerator / f.denominator

export function setCut(state: WidthsState, index: 0 | 1, at: number): WidthsState {
    const cuts: [number, number] = [...state.cuts]
    cuts[index] = Math.round(at)
    cuts[0] = clamp(cuts[0], 1, HOURS_END - 2)
    cuts[1] = clamp(cuts[1], 2, HOURS_END - 1)
    // The cut that moves pushes the other one
    if (cuts[1] <= cuts[0]) {
        if (index === 0) cuts[1] = cuts[0] + 1
        else cuts[0] = cuts[1] - 1
    }
    return cuts[0] === state.cuts[0] && cuts[1] === state.cuts[1] ? state : { cuts, prediction: null }
}

/** Drawn well (height f / a): the third bar lower than (<), as tall as (=) or taller than (>) the first */
export function widthsPrediction(state: Pick<WidthsState, 'cuts'>): Prediction {
    const bars = barsOf(state.cuts)
    return compareTo(value(bars[2].height), value(bars[0].height))
}

/* ---------- Challenges ---------- */

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })

const same = (a: FractionValue, b: FractionValue) => a.numerator * b.denominator === b.numerator * a.denominator

export const widthsChallenges: LabChallenge<WidthsState>[] = [
    {
        id: 137301,
        prompt: say('Egin barra zabalenak datu gehien izatea, baina ondo marraztuta baxuena izatea.', 'Haz que la barra más ancha tenga más datos que ninguna, pero bien dibujada sea la más baja.', 'اجعل العمود الأعرض يحوي بيانات أكثر من غيره، لكنه حين يُرسم صحيحًا يكون الأقصر.', 'Make the widest bar hold more data than any other, but be the lowest when drawn properly.'),
        hint: say('Bigarren barra estu bat erdian, eta azkena oso zabala.', 'Una segunda barra estrecha en el centro y la última muy ancha.', 'عمود ثانٍ ضيق في الوسط والأخير عريض جدًّا.', 'A narrow second bar in the middle and a very wide last one.'),
        isSolved: (state) => {
            const bars = barsOf(state.cuts)
            const widest = bars.filter((bar) => bar.width === Math.max(...bars.map((item) => item.width)))
            if (widest.length !== 1) return false
            const bar = widest[0]
            return bars.every((other) => other === bar || (other.count < bar.count && value(other.height) > value(bar.height)))
        }
    },
    {
        id: 137302,
        prompt: say('Egin bi barrak maiztasun bera izatea, baina altuera desberdina.', 'Haz que dos barras tengan la misma frecuencia pero distinta altura.', 'اجعل عمودين لهما التكرار نفسه لكن بارتفاعين مختلفين.', 'Make two bars have the same frequency but different heights.'),
        hint: say('Maiztasun bera eta zabalera desberdina: altuera $\\frac{f_i}{a_i}$ da.', 'Misma frecuencia y distinta amplitud: la altura es $\\frac{f_i}{a_i}$.', 'التكرار نفسه وطول مختلف: الارتفاع $\\frac{f_i}{a_i}$.', 'Same frequency and different width: the height is $\\frac{f_i}{a_i}$.'),
        isSolved: (state) => {
            const bars = barsOf(state.cuts)
            return bars.some((bar, index) => bars.some((other, position) => position > index && other.count === bar.count && !same(other.height, bar.height)))
        }
    },
    {
        id: 137303,
        prompt: say('Egin lehen eta hirugarren barrek altuera bera izatea, eta erdikoak beste bat.', 'Haz que la primera y la tercera barra tengan la misma altura, y la del medio otra.', 'اجعل العمودين الأول والثالث بالارتفاع نفسه، والأوسط بارتفاع آخر.', 'Make the first and third bars the same height, and the middle one a different one.'),
        hint: say('Hasieran orduko pertsona gutxi daude, eta amaieran ere bai: barra estuak ezkerrean.', 'Al principio hay pocas personas por hora y al final también: barras estrechas a la izquierda.', 'في البداية قليل من الأشخاص لكل ساعة وفي النهاية أيضًا: أعمدة ضيقة في اليسار.', 'At the start there are few people per hour and at the end too: narrow bars on the left.'),
        isSolved: (state) => {
            const bars = barsOf(state.cuts)
            return same(bars[0].height, bars[2].height) && !same(bars[1].height, bars[0].height)
        }
    }
]

const ordinal = [say('lehenengo', 'primera', 'الأول', 'first'), say('bigarren', 'segunda', 'الثاني', 'second'), say('hirugarren', 'tercera', 'الثالث', 'third')]

/** A height for the screen and for LaTeX: whole, a short decimal or a fraction */
export function heightLatex(height: FractionValue): string {
    if (height.denominator === 1) return String(height.numerator)
    const decimal = height.numerator / height.denominator
    if (Number.isInteger(decimal * 100)) return String(decimal).replace('.', '{,}')
    return `\\frac{${height.numerator}}{${height.denominator}}`
}

/** Endless practice: give one bar a frequency and a height worked out from a pair of cuts */
const widthsMaker: LabChallengeMaker<WidthsState> = (random) => {
    const options: Array<[number, number]> = []
    for (let first = 1; first <= HOURS_END - 2; first += 1) for (let second = first + 1; second <= HOURS_END - 1; second += 1) if (first !== initialWidthsState.cuts[0] || second !== initialWidthsState.cuts[1]) options.push([first, second])
    const cuts = pick(random, options)
    const index = pick(random, [0, 1, 2] as const)
    const bar = barsOf(cuts)[index]
    const height = heightLatex(bar.height)
    const name = ordinal[index]
    return {
        prompt: say(`Egin ${name.eu} barrak $f=${bar.count}$ eta altuera $${height}$ izatea.`, `Haz que la ${name.es} barra tenga $f=${bar.count}$ y altura $${height}$.`, `اجعل العمود ${name.ar} بتكرار $f=${bar.count}$ وارتفاع $${height}$.`, `Make the ${name.en} bar have $f=${bar.count}$ and height $${height}$.`),
        hint: say(`Zabalera: $\\frac{${bar.count}}{${height}}=${bar.width}$.`, `Amplitud: $\\frac{${bar.count}}{${height}}=${bar.width}$.`, `الطول: $\\frac{${bar.count}}{${height}}=${bar.width}$.`, `Width: $\\frac{${bar.count}}{${height}}=${bar.width}$.`),
        isSolved: (state) => {
            const mine = barsOf(state.cuts)[index]
            return mine.count === bar.count && mine.width === bar.width
        },
        solution: { cuts, prediction: null }
    }
}

export const widthsExtra = freshFrom(initialWidthsState, widthsMaker)
