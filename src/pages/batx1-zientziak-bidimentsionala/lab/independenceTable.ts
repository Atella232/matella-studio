import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { fraction, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { isIndependent } from '../bivariate.ts'

/* ==========================================================================
   L3 · Independenteak? (¿Independientes?): a 2 × 2 table, girls and boys
   against doing sport or not. Each row becomes a bar of 100 %; the
   variables are independent when both bars split at the same place. The
   learner changes the four cells and, before seeing the bars, predicts
   in which row the share of «yes» is bigger. Pure logic.
   ========================================================================== */

export interface IndependenceState {
    /** [[girls yes, girls no], [boys yes, boys no]] */
    cells: [[number, number], [number, number]]
    prediction: Prediction | null
}

export const CELL_LIMITS = { min: 0, max: 20 } as const

/** Start: 12 of 20 girls and 9 of 20 boys do sport — not independent */
export const initialIndependenceState: IndependenceState = { cells: [[12, 8], [9, 11]], prediction: null }

const clamp = (value: number) => Math.min(CELL_LIMITS.max, Math.max(CELL_LIMITS.min, Math.round(value)))

export function setCell(state: IndependenceState, row: 0 | 1, column: 0 | 1, value: number): IndependenceState {
    const next = clamp(value)
    if (next === state.cells[row][column]) return state
    const cells = state.cells.map((line, i) => line.map((cell, j) => (i === row && j === column ? next : cell))) as IndependenceState['cells']
    return { cells, prediction: null }
}

export const rowTotal = (state: IndependenceState, row: 0 | 1) => state.cells[row][0] + state.cells[row][1]
export const tableTotal = (state: IndependenceState) => rowTotal(state, 0) + rowTotal(state, 1)
/** The share of «yes» in a row (the conditional relative frequency), exact; null for an empty row */
export const yesShare = (state: IndependenceState, row: 0 | 1): FractionValue | null => (rowTotal(state, row) === 0 ? null : fraction(state.cells[row][0], rowTotal(state, row)))
const shareValue = (state: IndependenceState, row: 0 | 1) => (rowTotal(state, row) === 0 ? 0 : state.cells[row][0] / rowTotal(state, row))

/** Independent: both rows non-empty and proportional */
export const independent = (state: IndependenceState) => rowTotal(state, 0) > 0 && rowTotal(state, 1) > 0 && isIndependent(state.cells)

/** In which row the share of «yes» is bigger: girls less (<), the same (=), girls more (>) */
export const independencePrediction = (state: IndependenceState): Prediction => compareTo(shareValue(state, 0), shareValue(state, 1))

/** The girls–yes cell that independence would ask for: (row total)·(column total) / N */
export const expectedCell = (state: IndependenceState) => (tableTotal(state) === 0 ? 0 : (rowTotal(state, 0) * (state.cells[0][0] + state.cells[1][0])) / tableTotal(state))

/* ---------- Challenges ---------- */

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })

export const independenceChallenges: LabChallenge<IndependenceState>[] = [
    { id: 115301, prompt: say('Egin bi aldagaiak independenteak izatea: bi errenkadek «bai» zati bera izan behar dute.', 'Haz que las dos variables sean independientes: las dos filas tienen que tener la misma parte de «sí».', 'اجعل المتغيرين مستقلين: يجب أن يكون نصيب «نعم» نفسه في السطرين.', 'Make the two variables independent: both rows must have the same share of «yes».'), hint: say('Errenkadak proportzionalak: adibidez, 12 eta 8, eta 6 eta 4.', 'Filas proporcionales: por ejemplo, 12 y 8, y 6 y 4.', 'أسطر متناسبة: مثلًا 12 و8، و6 و4.', 'Proportional rows: for example, 12 and 8, and 6 and 4.'), isSolved: independent },
    { id: 115302, prompt: say('Egin aldagaiak independenteak izatea, guztira 60 ikasle izanik.', 'Haz que sean independientes con 60 alumnos en total.', 'اجعلهما مستقلين ومجموع التلاميذ 60.', 'Make them independent with 60 students in all.'), hint: say('Aukeratu zati bat, $\\frac{1}{3}$ adibidez, eta banatu 60 ikasleak bi errenkadatan.', 'Elige una parte, por ejemplo $\\frac{1}{3}$, y reparte los 60 alumnos en las dos filas.', 'اختر نصيبًا، مثل $\\frac{1}{3}$، ووزّع التلاميذ الستين على السطرين.', 'Choose a share, for example $\\frac{1}{3}$, and split the 60 students between the two rows.'), isSolved: (state) => independent(state) && tableTotal(state) === 60 },
    { id: 115303, prompt: say('Egin mutilen artean «bai» zatia nesken artekoaren bikoitza izatea.', 'Haz que entre los chicos la parte de «sí» sea el doble que entre las chicas.', 'اجعل نصيب «نعم» بين الأولاد ضعف نصيبه بين البنات.', 'Make the share of «yes» among the boys twice that among the girls.'), hint: say('Adibidez, nesken $\\frac{1}{5}$ eta mutilen $\\frac{2}{5}$.', 'Por ejemplo, $\\frac{1}{5}$ de las chicas y $\\frac{2}{5}$ de los chicos.', 'مثلًا $\\frac{1}{5}$ من البنات و$\\frac{2}{5}$ من الأولاد.', 'For example, $\\frac{1}{5}$ of the girls and $\\frac{2}{5}$ of the boys.'), isSolved: (state) => state.cells[0][0] > 0 && rowTotal(state, 0) > 0 && rowTotal(state, 1) > 0 && state.cells[1][0] * rowTotal(state, 0) === 2 * state.cells[0][0] * rowTotal(state, 1) }
]

/** Shares of «yes» that a row of at most 20 + 20 can show */
const SHARES: Array<[number, number]> = [[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [2, 5], [3, 5]]
const shareLatex = ([n, d]: [number, number]) => `\\frac{${n}}{${d}}`

/** Endless practice: independence with a given total, or with a given share of «yes» */
const independenceMaker: LabChallengeMaker<IndependenceState> = (random) => {
    for (;;) {
        const [n, d] = pick(random, SHARES)
        const kind = pick(random, ['total', 'share'] as const)
        const girls = d * randomInt(random, 1, Math.floor(20 / Math.max(n, d - n)))
        const boys = d * randomInt(random, 1, Math.floor(20 / Math.max(n, d - n)))
        const cells: IndependenceState['cells'] = [[(girls * n) / d, (girls * (d - n)) / d], [(boys * n) / d, (boys * (d - n)) / d]]
        if (cells.flat().some((cell) => cell > CELL_LIMITS.max)) continue
        const solution: IndependenceState = { cells, prediction: null }
        if (kind === 'total') {
            const total = girls + boys
            return {
                prompt: say(`Egin aldagaiak independenteak izatea, guztira ${total} ikasle izanik.`, `Haz que sean independientes con ${total} alumnos en total.`, `اجعلهما مستقلين ومجموع التلاميذ ${total}.`, `Make them independent with ${total} students in all.`),
                hint: say('Errenkada bakoitzean «bai» zati bera; gero, egiaztatu guztizkoa.', 'La misma parte de «sí» en cada fila; después, comprueba el total.', 'نصيب «نعم» نفسه في كل سطر؛ ثم تحقّق من المجموع.', 'The same share of «yes» in each row; then check the total.'),
                isSolved: (state) => independent(state) && tableTotal(state) === total,
                solution
            }
        }
        return {
            prompt: say(`Egin aldagaiak independenteak izatea, errenkada bakoitzean «bai» zatia $${shareLatex([n, d])}$ izanik.`, `Haz que sean independientes con una parte de «sí» de $${shareLatex([n, d])}$ en cada fila.`, `اجعلهما مستقلين ونصيب «نعم» $${shareLatex([n, d])}$ في كل سطر.`, `Make them independent with a share of «yes» of $${shareLatex([n, d])}$ in each row.`),
            hint: say(`Errenkada bakoitzean, «bai» guztizkoaren $${shareLatex([n, d])}$.`, `En cada fila, el «sí» es $${shareLatex([n, d])}$ del total de la fila.`, `في كل سطر تكون «نعم» $${shareLatex([n, d])}$ من مجموعه.`, `In each row, «yes» is $${shareLatex([n, d])}$ of the row total.`),
            isSolved: (state) => independent(state) && state.cells[0][0] * d === n * rowTotal(state, 0),
            solution
        }
    }
}

export const independenceExtra = freshFrom(initialIndependenceState, independenceMaker)
