import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { add, divide, fraction, multiply, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { besides, echelon, identity, inverse, isZero, rank, toMatrix, type Matrix } from '../matrix.ts'

/* ==========================================================================
   L3 · Gauss-Jordanen makina (La máquina de Gauss-Jordan): (A | I) for six
   matrices, four with an inverse and two without. The learner chooses the
   row that changes, the row it uses, m and k: the new row is
   m·Eᵢ + k·Eⱼ, the whole row, the I part too. A row can also be divided by
   its pivot, and two rows swapped. Before the new row is shown, the learner
   predicts what is left in the column of the row used: negative, 0 or
   positive. When the left part is I, the right part is A⁻¹; when a row of
   the left part is all zeros, there is no inverse. Exact fractions.
   ========================================================================== */

export interface JordanState {
    matrix: number
    rows: Matrix
    target: number
    source: number
    m: number
    k: number
    steps: number
    prediction: Prediction | null
}

export const JORDAN_MATRICES: number[][][] = [
    [[2, 1], [5, 3]],
    [[2, 0], [1, 1]],
    [[2, 4], [1, 2]],
    [[1, 0, 0], [2, 1, 0], [0, 3, 1]],
    [[1, 1, 0], [0, 1, 1], [1, 0, 1]],
    [[1, 2, 1], [2, 3, 4], [3, 5, 5]]
]
export const JORDAN_NAMES = ['A', 'B', 'C', 'D', 'E', 'F'] as const
export const JORDAN_LIMITS = { m: { min: 1, max: 4 }, k: { min: -6, max: 6 } } as const

export const sizeOf = (state: Pick<JordanState, 'matrix'>) => JORDAN_MATRICES[state.matrix].length
const start = (index: number) => besides(toMatrix(JORDAN_MATRICES[index]), identity(JORDAN_MATRICES[index].length))
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export function loadJordan(index: number): JordanState {
    const matrix = clamp(index, 0, JORDAN_MATRICES.length - 1)
    return { matrix, rows: start(matrix), target: 1, source: 0, m: 1, k: -1, steps: 0, prediction: null }
}
export const initialJordanState = loadJordan(0)

/** Changes the operation; the row used is never the row that changes; the prediction goes when anything changes */
export function setJordan(state: JordanState, patch: Partial<Pick<JordanState, 'target' | 'source' | 'm' | 'k'>>): JordanState {
    const size = sizeOf(state)
    const target = clamp(patch.target ?? state.target, 0, size - 1)
    let source = clamp(patch.source ?? state.source, 0, size - 1)
    if (source === target) source = patch.source !== undefined ? state.source : (target + 1) % size
    if (source === target) source = (target + 1) % size
    const m = clamp(patch.m ?? state.m, JORDAN_LIMITS.m.min, JORDAN_LIMITS.m.max)
    const k = clamp(patch.k ?? state.k, JORDAN_LIMITS.k.min, JORDAN_LIMITS.k.max)
    const same = target === state.target && source === state.source && m === state.m && k === state.k
    return { ...state, target, source, m, k, prediction: same ? state.prediction : null }
}

/** The row m·Eᵢ + k·Eⱼ that the operation would write */
export function previewRow(state: Pick<JordanState, 'rows' | 'target' | 'source' | 'm' | 'k'>): FractionValue[] {
    return state.rows[state.target].map((value, column) => add(multiply(fraction(state.m), value), multiply(fraction(state.k), state.rows[state.source][column])))
}

/** What is left in the column of the row used (its place on the diagonal) */
export const leftUnder = (state: JordanState) => previewRow(state)[state.source]
export const jordanPrediction = (state: JordanState): Prediction => {
    const value = leftUnder(state)
    return compareTo(value.numerator / value.denominator, 0)
}

export function applyJordan(state: JordanState): JordanState {
    const rows = state.rows.map((row) => [...row])
    rows[state.target] = previewRow(state)
    return { ...state, rows, steps: state.steps + 1, prediction: null }
}

/** The pivot of a row: its number on the diagonal */
export const pivotOf = (state: JordanState, row: number) => state.rows[row][row]

/** Divides the row that changes by its pivot (only when the pivot is not 0 and not 1) */
export function canDivide(state: JordanState): boolean {
    const pivot = pivotOf(state, state.target)
    return !isZero(pivot) && !(pivot.numerator === pivot.denominator)
}

export function divideJordan(state: JordanState): JordanState {
    if (!canDivide(state)) return state
    const pivot = pivotOf(state, state.target)
    const rows = state.rows.map((row) => [...row])
    rows[state.target] = rows[state.target].map((value) => divide(value, pivot))
    return { ...state, rows, steps: state.steps + 1, prediction: null }
}

export function swapJordan(state: JordanState): JordanState {
    const rows = state.rows.map((row) => [...row])
    ;[rows[state.target], rows[state.source]] = [rows[state.source], rows[state.target]]
    return { ...state, rows, steps: state.steps + 1, prediction: null }
}

/** The left part of (A | I) */
export const leftPart = (state: Pick<JordanState, 'rows' | 'matrix'>) => state.rows.map((row) => row.slice(0, sizeOf(state)))
export const rightPart = (state: Pick<JordanState, 'rows' | 'matrix'>) => state.rows.map((row) => row.slice(sizeOf(state)))
export const leftIsIdentity = (state: Pick<JordanState, 'rows' | 'matrix'>) => leftPart(state).every((row, i) => row.every((value, j) => value.numerator === (i === j ? 1 : 0) && value.denominator === 1))
export const leftHasZeroRow = (state: Pick<JordanState, 'rows' | 'matrix'>) => leftPart(state).some((row) => row.every(isZero))
export const hasInverse = (index: number) => rank(toMatrix(JORDAN_MATRICES[index])) === JORDAN_MATRICES[index].length

/* ---------- Challenges ---------- */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })

export const jordanChallenges: LabChallenge<JordanState>[] = [
    { id: 116201, prompt: say('A matrizean, egin 0 bat diagonalaren azpian.', 'En la matriz A, haz un 0 debajo de la diagonal.', 'في المصفوفة A اجعل صفرًا تحت القطر.', 'In matrix A, make a 0 below the diagonal.'), hint: say('$E_2$ errenkadak 5 du eta $E_1$ errenkadak 2: $2E_2-5E_1$.', '$E_2$ tiene un 5 y $E_1$ un 2: $2E_2-5E_1$.', 'في $E_2$ العدد 5 وفي $E_1$ العدد 2: $2E_2-5E_1$.', '$E_2$ has a 5 and $E_1$ a 2: $2E_2-5E_1$.'), isSolved: (state) => state.matrix === 0 && isZero(state.rows[1][0]) },
    { id: 116202, prompt: say('A matrizean, iritsi $(I\\mid A^{-1})$ arte.', 'En la matriz A, llega a $(I\\mid A^{-1})$.', 'في المصفوفة A صِل إلى $(I\\mid A^{-1})$.', 'In matrix A, reach $(I\\mid A^{-1})$.'), hint: say('Zeroa azpian, gero zeroa gainean, eta azkenik zatitu errenkada bakoitza bere pibotaz.', 'Cero abajo, después cero arriba y al final divide cada fila por su pivote.', 'صفر في الأسفل، ثم صفر في الأعلى، وأخيرًا اقسم كل صف على محوره.', 'Zero below, then zero above, and finally divide each row by its pivot.'), isSolved: (state) => state.matrix === 0 && leftIsIdentity(state) },
    { id: 116203, prompt: say('B matrizean, iritsi $(I\\mid A^{-1})$ arte: zatitu beharko duzu.', 'En la matriz B, llega a $(I\\mid A^{-1})$: tendrás que dividir.', 'في المصفوفة B صِل إلى $(I\\mid A^{-1})$: ستحتاج إلى القسمة.', 'In matrix B, reach $(I\\mid A^{-1})$: you will need to divide.'), hint: say('$2E_2-E_1$, eta gero zatitu $E_1$ eta $E_2$ beren pibotez.', '$2E_2-E_1$ y después divide $E_1$ y $E_2$ por su pivote.', '$2E_2-E_1$ ثم اقسم $E_1$ و$E_2$ على محوريهما.', '$2E_2-E_1$, then divide $E_1$ and $E_2$ by their pivots.'), isSolved: (state) => state.matrix === 1 && leftIsIdentity(state) },
    { id: 116204, prompt: say('Ikusi C matrizeak ez duela alderantzizkorik: lortu zeroko errenkada bat ezkerreko zatian.', 'Descubre que C no tiene inversa: consigue una fila de ceros en la parte izquierda.', 'اكتشف أن C ليس لها معكوس: احصل على صف أصفار في الجزء الأيسر.', 'Find out that C has no inverse: get a row of zeros on the left part.'), hint: say('$E_1$ errenkada $E_2$ errenkadaren bikoitza da: $2E_2-E_1$.', '$E_1$ es el doble de $E_2$: $2E_2-E_1$.', '$E_1$ ضعف $E_2$: $2E_2-E_1$.', '$E_1$ is twice $E_2$: $2E_2-E_1$.'), isSolved: (state) => state.matrix === 2 && leftHasZeroRow(state) },
    { id: 116205, prompt: say('D matrizean ($3\\times 3$), iritsi $(I\\mid A^{-1})$ arte.', 'En la matriz D ($3\\times 3$), llega a $(I\\mid A^{-1})$.', 'في المصفوفة D ($3\\times 3$) صِل إلى $(I\\mid A^{-1})$.', 'In matrix D ($3\\times 3$), reach $(I\\mid A^{-1})$.'), hint: say('Triangeluarra da jada: $E_2-2E_1$ eta gero $E_3-3E_2$.', 'Ya es triangular: $E_2-2E_1$ y después $E_3-3E_2$.', 'إنها مثلثية: $E_2-2E_1$ ثم $E_3-3E_2$.', 'It is already triangular: $E_2-2E_1$ and then $E_3-3E_2$.'), isSolved: (state) => state.matrix === 3 && leftIsIdentity(state) }
]

/** Endless practice: reach (I | A⁻¹), or show that a matrix has no inverse */
const jordanMaker: LabChallengeMaker<JordanState> = (random) => {
    const index = randomInt(random, 0, JORDAN_MATRICES.length - 1)
    const name = JORDAN_NAMES[index]
    const loaded = loadJordan(index)
    if (hasInverse(index)) {
        const solution: JordanState = { ...loaded, rows: besides(identity(sizeOf(loaded)), inverse(toMatrix(JORDAN_MATRICES[index]))!), steps: 1 }
        return {
            prompt: say(`${name} matrizean, iritsi $(I\\mid A^{-1})$ arte.`, `En la matriz ${name}, llega a $(I\\mid A^{-1})$.`, `في المصفوفة ${name} صِل إلى $(I\\mid A^{-1})$.`, `In matrix ${name}, reach $(I\\mid A^{-1})$.`),
            hint: pick(random, [
                say('Lehenik zeroak diagonalaren azpian, gero gainean.', 'Primero ceros debajo de la diagonal, después encima.', 'أولًا أصفار تحت القطر ثم فوقه.', 'First zeros below the diagonal, then above.'),
                say('Bukaeran, zatitu errenkada bakoitza bere pibotaz.', 'Al final, divide cada fila por su pivote.', 'في النهاية اقسم كل صف على محوره.', 'At the end, divide each row by its pivot.')
            ]),
            isSolved: (state) => state.matrix === index && leftIsIdentity(state),
            solution
        }
    }
    const solution: JordanState = { ...loaded, rows: echelon(start(index), sizeOf(loaded)), steps: 1 }
    return {
        prompt: say(`Ikusi ${name} matrizeak ez duela alderantzizkorik.`, `Descubre que la matriz ${name} no tiene inversa.`, `اكتشف أن المصفوفة ${name} ليس لها معكوس.`, `Find out that matrix ${name} has no inverse.`),
        hint: say('Mailakatu: ezkerreko zatian zeroko errenkada bat agertuko da.', 'Escalona: en la parte izquierda saldrá una fila de ceros.', 'حوّل إلى الشكل الدرجي: سيظهر صف أصفار في الجزء الأيسر.', 'Reduce it: a row of zeros will appear on the left part.'),
        isSolved: (state) => state.matrix === index && leftHasZeroRow(state),
        solution
    }
}

export const jordanExtra = freshFrom(initialJordanState, jordanMaker)
