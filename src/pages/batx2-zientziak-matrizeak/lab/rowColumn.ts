import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L1 · Errenkada bider zutabe (Fila por columna): A is 2 × 3 and B is
   3 × 2, so AB is 2 × 2. The learner picks a cell c_ij of AB (row i of A,
   column j of B) and can change the three numbers of that column of B.
   Before the cell is shown, the learner predicts its sign. The challenges
   ask for a cell that is 0, a column of zeros, two equal cells… so the
   numbers of B have to be chosen with row by column in mind.
   ========================================================================== */

export interface RowColumnState {
    pair: number
    a: number[][]
    b: number[][]
    /** The cell of AB: row of A (0, 1) and column of B (0, 1) */
    row: number
    column: number
    prediction: Prediction | null
}

export const ROW_COLUMN_PAIRS: Array<{ a: number[][]; b: number[][] }> = [
    { a: [[1, 0, -1], [0, 1, 2]], b: [[2, 1], [3, -1], [1, 4]] },
    { a: [[2, -1, 3], [1, 4, 0]], b: [[1, 0], [2, 3], [-1, 2]] },
    { a: [[3, 1, -2], [-1, 2, 1]], b: [[0, 2], [1, -1], [3, 1]] }
]
export const ROW_COLUMN_NAMES = ['1', '2', '3'] as const
export const ROW_COLUMN_LIMITS = { min: -5, max: 5 } as const

const copy = (matrix: number[][]) => matrix.map((row) => [...row])

export const loadPair = (pair: number): RowColumnState => ({ pair, a: copy(ROW_COLUMN_PAIRS[pair].a), b: copy(ROW_COLUMN_PAIRS[pair].b), row: 0, column: 0, prediction: null })
export const initialRowColumnState = loadPair(0)

/** Chooses the cell c_ij; the prediction goes */
export const chooseCell = (state: RowColumnState, row: number, column: number): RowColumnState =>
    row === state.row && column === state.column ? state : { ...state, row, column, prediction: null }

/** Changes the number in row k of the chosen column of B */
export function setB(state: RowColumnState, k: number, value: number): RowColumnState {
    const b = copy(state.b)
    b[k][state.column] = Math.min(ROW_COLUMN_LIMITS.max, Math.max(ROW_COLUMN_LIMITS.min, Math.round(value)))
    return { ...state, b, prediction: null }
}

/** AB, row by column */
export const product = (a: number[][], b: number[][]) => a.map((row) => b[0].map((_, j) => row.reduce((sum, value, k) => sum + value * b[k][j], 0)))
export const cellValue = (state: RowColumnState) => product(state.a, state.b)[state.row][state.column]
export const rowColumnPrediction = (state: RowColumnState): Prediction => compareTo(cellValue(state), 0)

/** The sum that gives the cell: 1·2 + 0·3 + (−1)·1 */
export function cellTerms(state: RowColumnState): Array<[number, number]> {
    return state.a[state.row].map((value, k) => [value, state.b[k][state.column]])
}

/* ---------- Challenges ---------- */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const ab = (state: RowColumnState) => product(state.a, state.b)

export const rowColumnChallenges: LabChallenge<RowColumnState>[] = [
    { id: 116101, prompt: say('1. bikotean, aukeratu $c_{21}$ laukia eta iragarri haren zeinua.', 'En el par 1, elige la casilla $c_{21}$ y predice su signo.', 'في الزوج 1 اختر الخانة $c_{21}$ وتوقّع إشارتها.', 'In pair 1, choose the cell $c_{21}$ and predict its sign.'), hint: say('2. errenkada eta 1. zutabea: $i=2$, $j=1$.', 'Fila 2 y columna 1: $i=2$, $j=1$.', 'الصف 2 والعمود 1: $i=2$ و$j=1$.', 'Row 2 and column 1: $i=2$, $j=1$.'), isSolved: (state) => state.pair === 0 && state.row === 1 && state.column === 0 && state.prediction !== null },
    { id: 116102, prompt: say('1. bikotean, aldatu $B$ matrizearen 1. zutabeko zenbaki bat, $c_{11}=0$ izan dadin.', 'En el par 1, cambia un número de la columna 1 de $B$ para que $c_{11}=0$.', 'في الزوج 1 غيّر عددًا في العمود 1 من $B$ ليكون $c_{11}=0$.', 'In pair 1, change a number in column 1 of $B$ so that $c_{11}=0$.'), hint: say('$c_{11}=1\\cdot b_{11}+0\\cdot b_{21}+(-1)\\cdot b_{31}$: $b_{11}$ eta $b_{31}$ berdinak izan behar dira.', '$c_{11}=1\\cdot b_{11}+0\\cdot b_{21}+(-1)\\cdot b_{31}$: $b_{11}$ y $b_{31}$ tienen que ser iguales.', '$c_{11}=1\\cdot b_{11}+0\\cdot b_{21}+(-1)\\cdot b_{31}$: يجب أن يتساوى $b_{11}$ و$b_{31}$.', '$c_{11}=1\\cdot b_{11}+0\\cdot b_{21}+(-1)\\cdot b_{31}$: $b_{11}$ and $b_{31}$ must be equal.'), isSolved: (state) => state.pair === 0 && ab(state)[0][0] === 0 },
    { id: 116103, prompt: say('1. bikotean, egin $AB$ matrizearen 2. zutabe osoa zeroz, $B$ matrizearen zutabea zeroz bete gabe.', 'En el par 1, haz de ceros toda la columna 2 de $AB$ sin llenar de ceros la columna de $B$.', 'في الزوج 1 اجعل العمود 2 كله من $AB$ أصفارًا دون أن تملأ عمود $B$ بالأصفار.', 'In pair 1, make the whole of column 2 of $AB$ zeros without filling the column of $B$ with zeros.'), hint: say('$b_{12}=b_{32}$ eta $b_{22}=-2b_{32}$ behar dira: adibidez, $1$, $-2$, $1$.', 'Hace falta $b_{12}=b_{32}$ y $b_{22}=-2b_{32}$: por ejemplo, $1$, $-2$, $1$.', 'يلزم $b_{12}=b_{32}$ و$b_{22}=-2b_{32}$: مثلًا $1$ و$-2$ و$1$.', 'You need $b_{12}=b_{32}$ and $b_{22}=-2b_{32}$: for example, $1$, $-2$, $1$.'), isSolved: (state) => state.pair === 0 && ab(state)[0][1] === 0 && ab(state)[1][1] === 0 && state.b.some((row) => row[1] !== 0) },
    { id: 116104, prompt: say('2. bikotean, lortu $c_{12}=c_{22}$.', 'En el par 2, consigue $c_{12}=c_{22}$.', 'في الزوج 2 احصل على $c_{12}=c_{22}$.', 'In pair 2, get $c_{12}=c_{22}$.'), hint: say('Bi errenkadak zutabe berarekin biderkatzen dira: $(2,-1,3)$ eta $(1,4,0)$ errenkaden aldea $(1,-5,3)$ da.', 'Las dos filas se multiplican por la misma columna: la diferencia de $(2,-1,3)$ y $(1,4,0)$ es $(1,-5,3)$.', 'يُضرب الصفان في العمود نفسه: الفرق بين $(2,-1,3)$ و$(1,4,0)$ هو $(1,-5,3)$.', 'Both rows are multiplied by the same column: the difference of $(2,-1,3)$ and $(1,4,0)$ is $(1,-5,3)$.'), isSolved: (state) => state.pair === 1 && ab(state)[0][1] === ab(state)[1][1] },
    { id: 116105, prompt: say('3. bikotean, egin $c_{21}$ negatiboa.', 'En el par 3, haz que $c_{21}$ sea negativo.', 'في الزوج 3 اجعل $c_{21}$ سالبًا.', 'In pair 3, make $c_{21}$ negative.'), hint: say('$A$ matrizearen 2. errenkada $(-1,2,1)$ da: jaitsi $b_{21}$ edo $b_{31}$.', 'La fila 2 de $A$ es $(-1,2,1)$: baja $b_{21}$ o $b_{31}$.', 'الصف 2 من $A$ هو $(-1,2,1)$: أنقص $b_{21}$ أو $b_{31}$.', 'Row 2 of $A$ is $(-1,2,1)$: lower $b_{21}$ or $b_{31}$.'), isSolved: (state) => state.pair === 2 && ab(state)[1][0] < 0 }
]

/** Endless practice: a cell of AB that has to take a given value by changing one number of B */
const rowColumnMaker: LabChallengeMaker<RowColumnState> = (random) => {
    for (;;) {
        const pair = randomInt(random, 0, ROW_COLUMN_PAIRS.length - 1)
        const start = loadPair(pair)
        const row = randomInt(random, 0, 1)
        const column = randomInt(random, 0, 1)
        const k = pick(random, [0, 1, 2].filter((index) => start.a[row][index] !== 0))
        const value = randomInt(random, ROW_COLUMN_LIMITS.min, ROW_COLUMN_LIMITS.max)
        if (value === start.b[k][column]) continue
        const solution = setB(chooseCell(start, row, column), k, value)
        const target = cellValue(solution)
        if (target === cellValue(chooseCell(start, row, column))) continue
        const cell = `c_{${row + 1}${column + 1}}`
        return {
            prompt: say(`${ROW_COLUMN_NAMES[pair]}. bikotean, lortu $${cell}=${target}$.`, `En el par ${ROW_COLUMN_NAMES[pair]}, consigue $${cell}=${target}$.`, `في الزوج ${ROW_COLUMN_NAMES[pair]} احصل على $${cell}=${target}$.`, `In pair ${ROW_COLUMN_NAMES[pair]}, get $${cell}=${target}$.`),
            hint: say(`Aldatu $B$ matrizearen ${column + 1}. zutabeko zenbaki bat: $${cell}$ laukiak $A$ matrizearen ${row + 1}. errenkada erabiltzen du.`, `Cambia un número de la columna ${column + 1} de $B$: $${cell}$ usa la fila ${row + 1} de $A$.`, `غيّر عددًا في العمود ${column + 1} من $B$: الخانة $${cell}$ تستعمل الصف ${row + 1} من $A$.`, `Change a number in column ${column + 1} of $B$: $${cell}$ uses row ${row + 1} of $A$.`),
            isSolved: (state) => state.pair === pair && product(state.a, state.b)[row][column] === target,
            solution
        }
    }
}

export const rowColumnExtra = freshFrom(initialRowColumnState, rowColumnMaker)
