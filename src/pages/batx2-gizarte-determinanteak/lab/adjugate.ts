import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { cofactor, cofactorSign, det, minor } from '../../batx2-zientziak-determinanteak/determinant.ts'

/* ==========================================================================
   L2 · Adjuntua, laukiz lauki (La adjunta, casilla a casilla): a 3 × 3
   matrix and one chosen cell. In the first view its row and column are
   struck out: the minor, the sign of the board and the cofactor. In the
   second the cofactor goes to its place in Adj A; in the third, Adj A is
   transposed and divided by |A|, and the cofactor of (i, j) lands on
   (j, i) of A⁻¹. Before the cofactor is shown, the learner predicts its
   sign. One cofactor at a time, so it fits on a phone.
   ========================================================================== */

export type AdjugateView = 'cofactor' | 'adjugate' | 'inverse'

export interface AdjugateState {
    matrix: number
    row: number
    column: number
    view: AdjugateView
    prediction: Prediction | null
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })

/** Three matrices with small determinants (3, 1 and 5) */
export const ADJUGATE_MATRICES: number[][][] = [
    [[1, 2, 0], [0, 1, 1], [1, 0, 1]],
    [[2, 1, 0], [1, 1, 0], [0, 0, 1]],
    [[1, 0, 2], [2, 1, 0], [0, 1, 1]]
]

const value = (input: { numerator: number; denominator: number }) => input.numerator / input.denominator

export const loadAdjugate = (matrix: number): AdjugateState => ({ matrix, row: 0, column: 0, view: 'cofactor', prediction: null })
export const initialAdjugateState = loadAdjugate(0)

export const chooseCell = (state: AdjugateState, row: number, column: number): AdjugateState =>
    row === state.row && column === state.column ? state : { ...state, row, column, prediction: null }
export const setView = (state: AdjugateState, view: AdjugateView): AdjugateState => ({ ...state, view })

export const matrixOf = (state: AdjugateState) => ADJUGATE_MATRICES[state.matrix]
export const adjugateDet = (state: AdjugateState) => value(det(matrixOf(state)))
export const chosenMinor = (state: AdjugateState) => value(minor(matrixOf(state), state.row, state.column))
export const chosenCofactor = (state: AdjugateState) => value(cofactor(matrixOf(state), state.row, state.column))
export const chosenSign = (state: AdjugateState) => cofactorSign(state.row, state.column)
/** All the cofactors, in their places: the matrix Adj A */
export const adjugateCells = (state: AdjugateState) => matrixOf(state).map((cells, i) => cells.map((_, j) => value(cofactor(matrixOf(state), i, j))))
export const adjugatePrediction = (state: AdjugateState): Prediction => compareTo(chosenCofactor(state), 0)
/** Where the chosen cofactor lands in A⁻¹ (row, column, 0-based), and its value there */
export const inverseSpot = (state: AdjugateState) => ({ row: state.column, column: state.row, value: chosenCofactor(state) / adjugateDet(state) })

/* ---------- Challenges ---------- */

export const adjugateChallenges: LabChallenge<AdjugateState>[] = [
    {
        id: 142151,
        prompt: say('1. matrizean, aukeratu minus zeinua duen lauki bat, eta iragarri haren adjuntuaren zeinua.', 'En la matriz 1, elige una casilla con signo menos y predice el signo de su adjunto.', 'في المصفوفة 1 اختر خانة إشارتها سالبة وتوقّع إشارة متممها الجبري.', 'In matrix 1, choose a cell with a minus sign and predict the sign of its cofactor.'),
        hint: say('Minus zeinua: $i+j$ bakoitia, $(1,2)$ adibidez.', 'Signo menos: $i+j$ impar, como $(1,2)$.', 'الإشارة السالبة: $i+j$ فردي، مثل $(1,2)$.', 'Minus sign: $i+j$ odd, like $(1,2)$.'),
        isSolved: (state) => state.matrix === 0 && chosenSign(state) === -1 && state.prediction !== null
    },
    {
        id: 142152,
        prompt: say('1. matrizean, aurkitu $-2$ balio duen adjuntua.', 'En la matriz 1, encuentra el adjunto que vale $-2$.', 'في المصفوفة 1 جد المتمم الجبري الذي يساوي $-2$.', 'In matrix 1, find the cofactor that is $-2$.'),
        hint: say('Minus zeinua eta 2 balio duen menorea.', 'Signo menos y un menor que vale 2.', 'إشارة سالبة ومحدد أصغر يساوي 2.', 'A minus sign and a minor that is 2.'),
        isSolved: (state) => state.matrix === 0 && chosenCofactor(state) === -2 && state.prediction !== null
    },
    {
        id: 142153,
        prompt: say('1. matrizean, «Alderantzizkoa» ikuspegian, piztu $A^{-1}$ matrizearen $(1,2)$ elementua.', 'En la matriz 1, en la vista «Inversa», enciende el elemento $(1,2)$ de $A^{-1}$.', 'في المصفوفة 1، في عرض «المعكوس»، أضئ العنصر $(1,2)$ من $A^{-1}$.', 'In matrix 1, in the «Inverse» view, light up the entry $(1,2)$ of $A^{-1}$.'),
        hint: say('Irauli egiten da: $A^{-1}$ matrizearen $(1,2)$ elementua $A_{21}$ adjuntutik dator.', 'Se traspone: el $(1,2)$ de $A^{-1}$ sale del adjunto $A_{21}$.', 'يحدث نقل: العنصر $(1,2)$ من $A^{-1}$ يأتي من المتمم $A_{21}$.', 'It is transposed: entry $(1,2)$ of $A^{-1}$ comes from the cofactor $A_{21}$.'),
        isSolved: (state) => state.matrix === 0 && state.view === 'inverse' && state.row === 1 && state.column === 0
    },
    {
        id: 142154,
        prompt: say('3. matrizean ($|A|=5$), piztu $\\frac{4}{5}$ balio duen $A^{-1}$ matrizearen elementua.', 'En la matriz 3 ($|A|=5$), enciende el elemento de $A^{-1}$ que vale $\\frac{4}{5}$.', 'في المصفوفة 3 ($|A|=5$) أضئ عنصر $A^{-1}$ الذي يساوي $\\frac{4}{5}$.', 'In matrix 3 ($|A|=5$), light up the entry of $A^{-1}$ that is $\\frac{4}{5}$.'),
        hint: say('4 balio duen adjuntua behar duzu.', 'Necesitas el adjunto que vale 4.', 'تحتاج إلى المتمم الذي يساوي 4.', 'You need the cofactor that is 4.'),
        isSolved: (state) => state.matrix === 2 && state.view === 'inverse' && chosenCofactor(state) === 4
    },
    {
        id: 142155,
        prompt: say('2. matrizean $|A|=1$ da, eta $A^{-1}$ zenbaki osoz osatuta dago. Aurkitu $-1$ balio duen haren elementu bat.', 'En la matriz 2 es $|A|=1$ y $A^{-1}$ es entera. Encuentra un elemento suyo que valga $-1$.', 'في المصفوفة 2 يكون $|A|=1$ و$A^{-1}$ أعداده صحيحة. جد عنصرًا منه يساوي $-1$.', 'In matrix 2, $|A|=1$ and $A^{-1}$ is whole. Find one of its entries that is $-1$.'),
        hint: say('$|A|=1$ denean, $A^{-1}$ matrizeko elementua adjuntua bera da, iraulita.', 'Con $|A|=1$, cada elemento de $A^{-1}$ es el adjunto, traspuesto.', 'مع $|A|=1$ كل عنصر من $A^{-1}$ هو المتمم نفسه بعد النقل.', 'With $|A|=1$, each entry of $A^{-1}$ is the cofactor, transposed.'),
        isSolved: (state) => state.matrix === 1 && state.view === 'inverse' && inverseSpot(state).value === -1
    }
]

/** Endless practice: light up a given entry of A⁻¹ of one of the matrices */
const adjugateMaker: LabChallengeMaker<AdjugateState> = (random) => {
    const matrix = randomInt(random, 0, ADJUGATE_MATRICES.length - 1)
    const i = randomInt(random, 0, 2)
    const j = randomInt(random, 0, 2)
    const solution: AdjugateState = { matrix, row: j, column: i, view: 'inverse', prediction: null }
    return {
        prompt: say(
            `${matrix + 1}. matrizean, piztu $A^{-1}$ matrizearen $(${i + 1},${j + 1})$ elementua.`,
            `En la matriz ${matrix + 1}, enciende el elemento $(${i + 1},${j + 1})$ de $A^{-1}$.`,
            `في المصفوفة ${matrix + 1} أضئ العنصر $(${i + 1},${j + 1})$ من $A^{-1}$.`,
            `In matrix ${matrix + 1}, light up the entry $(${i + 1},${j + 1})$ of $A^{-1}$.`
        ),
        hint: say(`Irauli: $A_{${j + 1}${i + 1}}$ adjuntua aukeratu behar duzu.`, `Traspón: elige el adjunto $A_{${j + 1}${i + 1}}$.`, `انقل: اختر المتمم $A_{${j + 1}${i + 1}}$.`, `Transpose: choose the cofactor $A_{${j + 1}${i + 1}}$.`),
        isSolved: (state) => state.matrix === matrix && state.view === 'inverse' && state.row === j && state.column === i,
        solution
    }
}

export const adjugateExtra = freshFrom(initialAdjugateState, adjugateMaker)
