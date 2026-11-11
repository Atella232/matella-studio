import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { det } from '../determinant.ts'

/* ==========================================================================
   L2 · Propietateen makina (La máquina de propiedades): a 3 × 3 matrix
   with whole numbers and its determinant. The learner sets up one row
   operation — swap two rows, multiply a row by k (2 or 3), or add k times
   another row — and predicts what it does to |A| (it changes sign, it does
   not change, it is multiplied by k) before the new matrix and its |A|
   are shown; then the operation can be applied. Adding multiples leads to
   a triangular matrix, where |A| is the product of the diagonal.
   ========================================================================== */

export type PropertyOperation = 'swap' | 'scale' | 'add'

export interface PropertyState {
    preset: number
    matrix: number[][]
    operation: PropertyOperation
    /** The row that changes (and, for a swap, one of the two) */
    target: number
    /** The other row of a swap, or the row whose multiple is added */
    source: number
    /** For «multiply a row»: 2 or 3 */
    scale: 2 | 3
    /** For «add k times a row»: −3 … 3, never 0 */
    k: number
    prediction: Prediction | null
    steps: number
}

export const PROPERTY_PRESETS: number[][][] = [
    [[2, 1, 3], [4, 3, 7], [2, 3, 8]],
    [[1, 2, 1], [2, 5, 3], [1, 3, 4]],
    [[1, -1, 2], [3, -2, 4], [-2, 3, -1]]
]
export const PROPERTY_NAMES = ['A', 'B', 'C'] as const
/** No cell grows beyond this: the operation is not offered */
export const PROPERTY_CAP = 99
export const ADD_LIMITS = { min: -3, max: 3 } as const

const copy = (matrix: number[][]) => matrix.map((row) => [...row])

export const loadPreset = (preset: number): PropertyState => ({ preset, matrix: copy(PROPERTY_PRESETS[preset]), operation: 'add', target: 1, source: 0, scale: 2, k: -2, prediction: null, steps: 0 })
export const initialPropertyState = loadPreset(0)

export const detOf = (matrix: number[][]) => {
    const value = det(matrix)
    return value.numerator / value.denominator
}
export const currentDet = (state: Pick<PropertyState, 'matrix'>) => detOf(state.matrix)

/** The matrix after the operation that is set up */
export function previewMatrix(state: PropertyState): number[][] {
    const next = copy(state.matrix)
    const { target, source } = state
    if (state.operation === 'swap') [next[target], next[source]] = [next[source], next[target]]
    else if (state.operation === 'scale') next[target] = next[target].map((value) => value * state.scale)
    else next[target] = next[target].map((value, j) => value + state.k * state.matrix[source][j])
    return next
}

/** What the operation does to |A|: changes its sign (<), keeps it (=), multiplies it by k (>) */
export const operationEffect = (operation: PropertyOperation): Prediction => (operation === 'swap' ? '<' : operation === 'add' ? '=' : '>')
export const propertyPrediction = (state: PropertyState): Prediction => operationEffect(state.operation)

/** The operation can be applied when no cell would grow beyond the cap */
export const canApply = (state: PropertyState) => previewMatrix(state).every((row) => row.every((value) => Math.abs(value) <= PROPERTY_CAP))

/** The rows of the operation: the target and, apart from it, the source */
export function chooseOperation(state: PropertyState, operation: PropertyOperation): PropertyState {
    return operation === state.operation ? state : { ...state, operation, prediction: null }
}
export function setTarget(state: PropertyState, target: number): PropertyState {
    if (target === state.target) return state
    // The source is never the target: when they meet, they change places
    const source = target === state.source ? state.target : state.source
    return { ...state, target, source, prediction: null }
}
export function setSource(state: PropertyState, source: number): PropertyState {
    if (source === state.source) return state
    const target = source === state.target ? state.source : state.target
    return { ...state, target, source, prediction: null }
}
export const setScale = (state: PropertyState, scale: 2 | 3): PropertyState => (scale === state.scale ? state : { ...state, scale, prediction: null })
/** k for adding a row: −3 … 3, skipping 0 in the direction it moved */
export function setK(state: PropertyState, k: number): PropertyState {
    let next = Math.min(ADD_LIMITS.max, Math.max(ADD_LIMITS.min, Math.round(k)))
    if (next === 0) next = state.k > 0 ? -1 : 1
    return next === state.k ? state : { ...state, k: next, prediction: null }
}

/** Applies the operation that is set up (once the prediction has been made) */
export function applyOperation(state: PropertyState): PropertyState {
    if (!canApply(state)) return state
    return { ...state, matrix: previewMatrix(state), prediction: null, steps: state.steps + 1 }
}

/** Zeros below the diagonal */
export const isTriangular = (matrix: number[][]) => matrix.every((row, i) => row.every((value, j) => j >= i || value === 0))

/** The operation in LaTeX: E_2 ↔ E_1, 2E_2, E_2 − 2E_1 */
export function operationLatex(state: Pick<PropertyState, 'operation' | 'target' | 'source' | 'scale' | 'k'>): string {
    const t = `E_${state.target + 1}`
    const s = `E_${state.source + 1}`
    if (state.operation === 'swap') return `${t}\\leftrightarrow ${s}`
    if (state.operation === 'scale') return `${state.scale}${t}`
    const size = Math.abs(state.k) === 1 ? '' : String(Math.abs(state.k))
    return `${t}${state.k < 0 ? '-' : '+'}${size}${s}`
}

/* ---------- Challenges ---------- */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const same3 = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value })

export const propertyChallenges: LabChallenge<PropertyState>[] = [
    { id: 117151, prompt: say('A matrizean, lortu $|A|=-6$.', 'En A, consigue $|A|=-6$.', 'في A احصل على $|A|=-6$.', 'In A, get $|A|=-6$.'), hint: say('Eragiketa batek zeinua aldatzen du, besterik ez.', 'Una operación cambia el signo y nada más.', 'عملية واحدة تغيّر الإشارة لا أكثر.', 'One operation changes the sign and nothing else.'), isSolved: (state) => state.preset === 0 && currentDet(state) === -6 },
    { id: 117152, prompt: say('A matrizean, lortu $|A|=18$.', 'En A, consigue $|A|=18$.', 'في A احصل على $|A|=18$.', 'In A, get $|A|=18$.'), hint: same3('$18=3\\cdot 6$'), isSolved: (state) => state.preset === 0 && currentDet(state) === 18 },
    { id: 117153, prompt: say('Utzi A triangeluar (zeroak diagonalaren azpian), $|A|$ aldatu gabe.', 'Deja A triangular (ceros bajo la diagonal) sin cambiar $|A|$.', 'اجعل A مثلثية (أصفار تحت القطر) دون تغيير $|A|$.', 'Make A triangular (zeros below the diagonal) without changing $|A|$.'), hint: say('Erabili bakarrik «gehitu errenkada baten multiploa»: $E_2-2E_1$, $E_3-E_1$…', 'Usa solo «sumar un múltiplo de una fila»: $E_2-2E_1$, $E_3-E_1$…', 'استعمل فقط «أضف مضاعف صف»: $E_2-2E_1$ و$E_3-E_1$…', 'Use only «add a multiple of a row»: $E_2-2E_1$, $E_3-E_1$…'), isSolved: (state) => state.preset === 0 && isTriangular(state.matrix) && currentDet(state) === 6 },
    { id: 117154, prompt: say('B matrizean, lortu matrize triangeluar bat, $|B|=-2$ duena.', 'En B, consigue una matriz triangular con $|B|=-2$.', 'في B احصل على مصفوفة مثلثية فيها $|B|=-2$.', 'In B, get a triangular matrix with $|B|=-2$.'), hint: say('Lehenik, trukatu bi errenkada; gero, egin zeroak.', 'Primero cambia dos filas; después haz ceros.', 'بدّل أولًا صفين، ثم اصنع الأصفار.', 'First swap two rows; then make zeros.'), isSolved: (state) => state.preset === 1 && isTriangular(state.matrix) && currentDet(state) === -2 },
    { id: 117155, prompt: say('C matrizean, lortu $|C|=30$.', 'En C, consigue $|C|=30$.', 'في C احصل على $|C|=30$.', 'In C, get $|C|=30$.'), hint: same3('$30=2\\cdot 3\\cdot 5$'), isSolved: (state) => state.preset === 2 && currentDet(state) === 30 }
]

/** Applies a list of operations to a preset, as the learner would */
export function runOperations(preset: number, operations: Array<Pick<PropertyState, 'operation' | 'target' | 'source'> & Partial<Pick<PropertyState, 'scale' | 'k'>>>): PropertyState {
    let state = loadPreset(preset)
    for (const operation of operations) state = applyOperation({ ...state, ...operation, scale: operation.scale ?? state.scale, k: operation.k ?? state.k })
    return state
}

/** The row operations that make each preset triangular, |A| unchanged */
export const TRIANGLE_ROUTES: Array<Array<{ operation: 'add'; target: number; source: number; k: number }>> = [
    [{ operation: 'add', target: 1, source: 0, k: -2 }, { operation: 'add', target: 2, source: 0, k: -1 }, { operation: 'add', target: 2, source: 1, k: -2 }],
    [{ operation: 'add', target: 1, source: 0, k: -2 }, { operation: 'add', target: 2, source: 0, k: -1 }, { operation: 'add', target: 2, source: 1, k: -1 }],
    [{ operation: 'add', target: 1, source: 0, k: -3 }, { operation: 'add', target: 2, source: 0, k: 2 }, { operation: 'add', target: 2, source: 1, k: -1 }]
]

/** Endless practice: a value of |A| reached with swaps and products, or a triangle that keeps |A| */
const propertyMaker: LabChallengeMaker<PropertyState> = (random) => {
    const preset = randomInt(random, 0, PROPERTY_PRESETS.length - 1)
    const name = PROPERTY_NAMES[preset]
    if (randomInt(random, 0, 3) === 0) {
        const solution = runOperations(preset, TRIANGLE_ROUTES[preset])
        const value = currentDet(solution)
        return {
            prompt: say(`Utzi ${name} triangeluar, $|${name}|$ aldatu gabe.`, `Deja ${name} triangular sin cambiar $|${name}|$.`, `اجعل ${name} مثلثية دون تغيير $|${name}|$.`, `Make ${name} triangular without changing $|${name}|$.`),
            hint: say('Gehitu errenkada baten multiploak, goitik behera.', 'Suma múltiplos de una fila, de arriba abajo.', 'أضف مضاعفات صف، من الأعلى إلى الأسفل.', 'Add multiples of a row, from the top down.'),
            isSolved: (state) => state.preset === preset && isTriangular(state.matrix) && currentDet(state) === value,
            solution
        }
    }
    // One to three swaps and products of rows, made in turn
    const operations = Array.from({ length: randomInt(random, 1, 3) }, () => {
        const target = randomInt(random, 0, 2)
        const source = (target + randomInt(random, 1, 2)) % 3
        return pick(random, [{ operation: 'swap' as const, target, source }, { operation: 'scale' as const, target, source, scale: pick(random, [2, 3] as const) }])
    })
    const solution = runOperations(preset, operations)
    const value = currentDet(solution)
    return {
        prompt: say(`${name} matrizean, lortu $|${name}|=${value}$.`, `En ${name}, consigue $|${name}|=${value}$.`, `في ${name} احصل على $|${name}|=${value}$.`, `In ${name}, get $|${name}|=${value}$.`),
        hint: say('Errenkadak trukatzean, zeinua aldatzen da; errenkada bat $k$ zenbakiaz biderkatzean, $|A|$ ere bai.', 'Cambiar filas cambia el signo; multiplicar una fila por $k$ multiplica $|A|$ por $k$.', 'تبديل صفين يغيّر الإشارة، وضرب صف في $k$ يضرب $|A|$ في $k$.', 'Swapping rows changes the sign; multiplying a row by $k$ multiplies $|A|$ by $k$.'),
        isSolved: (state) => state.preset === preset && currentDet(state) === value,
        solution
    }
}

export const propertyExtra = freshFrom(initialPropertyState, propertyMaker)
