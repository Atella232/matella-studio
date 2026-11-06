import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { fraction, gcd, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L1 · Gaussen makina (La máquina de Gauss): the augmented matrix of a
   3 × 3 system, changed one row operation at a time. The learner chooses
   the row that changes (E2 or E3), the row it uses (E1 or E2), the number
   m that multiplies the changing row and the number k of the row used:
   the new row is m·Eᵢ + k·Eⱼ, the whole row, the constant term too. Before
   the new row is shown, the learner predicts what is left under the pivot:
   a negative number, 0 or a positive one. Two rows can also be swapped.
   When the matrix is triangular, the last row says how many solutions
   there are. Pure logic, whole numbers only.
   ========================================================================== */

export type Row = [number, number, number, number]
export type Matrix = [Row, Row, Row]
export type GaussVerdict = 'one' | 'infinite' | 'none'

/** The six systems of the machine: A, C and F with one solution, B too, C inconsistent, D dependent, E starts with 2x */
export const GAUSS_SYSTEMS: Matrix[] = [
    [[1, 1, 1, 6], [2, -1, 1, 3], [1, 2, -1, 2]],
    [[1, -1, 2, 1], [2, 1, 1, 8], [-1, 2, 1, 5]],
    [[1, 1, 1, 3], [1, 2, 3, 5], [2, 3, 4, 9]],
    [[1, 1, 1, 4], [1, -1, 1, 2], [2, 0, 2, 6]],
    [[2, 1, -1, 1], [1, -1, 1, 2], [1, 2, 1, 5]],
    [[1, 2, 1, 2], [2, 3, -1, 1], [-1, 1, 2, 1]]
]
export const GAUSS_NAMES = ['A', 'B', 'C', 'D', 'E', 'F'] as const

export const GAUSS_LIMITS = { m: { min: 1, max: 4 }, k: { min: -6, max: 6 } } as const

export interface GaussState {
    system: number
    rows: Matrix
    /** The row that changes: 1 is E2, 2 is E3 */
    target: 1 | 2
    /** The row it uses: 0 is E1, 1 is E2 (only for E3) */
    source: 0 | 1
    /** The changing row is multiplied by m (never 0) */
    m: number
    /** The row used is multiplied by k */
    k: number
    /** Operations done since the system was loaded */
    steps: number
    prediction: Prediction | null
}

const copy = (matrix: Matrix): Matrix => matrix.map((row) => [...row]) as Matrix
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export const initialGaussState: GaussState = { system: 0, rows: copy(GAUSS_SYSTEMS[0]), target: 1, source: 0, m: 1, k: 1, steps: 0, prediction: null }

/** Back to a system as it is written, before any operation */
export function loadGaussSystem(state: GaussState, system: number): GaussState {
    const index = clamp(system, 0, GAUSS_SYSTEMS.length - 1)
    return { ...state, system: index, rows: copy(GAUSS_SYSTEMS[index]), target: 1, source: 0, m: 1, k: 1, steps: 0, prediction: null }
}

/** Changes the operation; the prediction goes when the operation changes */
export function setGauss(state: GaussState, patch: Partial<Pick<GaussState, 'target' | 'source' | 'm' | 'k'>>): GaussState {
    const target = (patch.target ?? state.target) === 2 ? 2 : 1
    // E2 can only use E1; E3 can use E1 or E2
    const source = target === 1 ? 0 : (patch.source ?? state.source) === 1 ? 1 : 0
    const m = clamp(patch.m ?? state.m, GAUSS_LIMITS.m.min, GAUSS_LIMITS.m.max)
    const k = clamp(patch.k ?? state.k, GAUSS_LIMITS.k.min, GAUSS_LIMITS.k.max)
    const same = target === state.target && source === state.source && m === state.m && k === state.k
    return { ...state, target, source, m, k, prediction: same ? state.prediction : null }
}

/** The row m·Eᵢ + k·Eⱼ that the operation would write */
export function previewRow(state: Pick<GaussState, 'rows' | 'target' | 'source' | 'm' | 'k'>): Row {
    return state.rows[state.target].map((value, column) => state.m * value + state.k * state.rows[state.source][column]) as Row
}

/** What is left in the pivot's column (the column of the row used) */
export const pivotLeft = (state: Pick<GaussState, 'rows' | 'target' | 'source' | 'm' | 'k'>) => previewRow(state)[state.source]

/** Negative (<), zero (=) or positive (>) under the pivot */
export const gaussPrediction = (state: GaussState): Prediction => compareTo(pivotLeft(state), 0)

/** Writes the new row into the matrix */
export function applyGauss(state: GaussState): GaussState {
    const rows = copy(state.rows)
    rows[state.target] = previewRow(state)
    return { ...state, rows, steps: state.steps + 1, prediction: null }
}

/** Swaps two rows (E1 ↔ E2 or E2 ↔ E3) */
export function swapGauss(state: GaussState, first: 0 | 1): GaussState {
    const rows = copy(state.rows)
    ;[rows[first], rows[first + 1]] = [rows[first + 1], rows[first]]
    return { ...state, rows, steps: state.steps + 1, prediction: null }
}

/** Zeros under the diagonal: rows 2 and 3 start with 0 and row 3 has 0 for y as well */
export const isTriangular = (rows: Matrix) => rows[1][0] === 0 && rows[2][0] === 0 && rows[2][1] === 0

/** The rank of a matrix with these columns, by elimination on numbers */
function rank(rows: number[][]): number {
    const m = rows.map((row) => [...row])
    let r = 0
    for (let column = 0; column < m[0].length && r < m.length; column++) {
        const pivot = m.slice(r).findIndex((row) => Math.abs(row[column]) > 1e-9)
        if (pivot < 0) continue
        ;[m[r], m[r + pivot]] = [m[r + pivot], m[r]]
        for (let i = 0; i < m.length; i++) {
            if (i === r) continue
            const factor = m[i][column] / m[r][column]
            for (let j = column; j < m[i].length; j++) m[i][j] -= factor * m[r][j]
        }
        r++
    }
    return r
}

/** One solution, infinitely many or none (Rouché: the ranks of the matrix with and without its last column) */
export function gaussVerdict(rows: Matrix): GaussVerdict {
    const coefficients = rank(rows.map((row) => row.slice(0, 3)))
    const augmented = rank(rows)
    return coefficients < augmented ? 'none' : coefficients === 3 ? 'one' : 'infinite'
}

const det3 = (m: number[][]) => m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) - m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) + m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0])

/** The single solution (x, y, z), exact, when there is one */
export function gaussSolution(rows: Matrix): [FractionValue, FractionValue, FractionValue] | null {
    const a = rows.map((row) => row.slice(0, 3))
    const d = det3(a)
    if (d === 0) return null
    const column = (index: number) => det3(a.map((row, r) => row.map((value, c) => (c === index ? rows[r][3] : value))))
    return [fraction(column(0), d), fraction(column(1), d), fraction(column(2), d)]
}

/** A row as an equation: 2x-y+z=3, -3y-z=-9, 0z=1 */
export function rowLatex(row: Row): string {
    const names = ['x', 'y', 'z']
    const terms = row.slice(0, 3).map((value, index) => ({ value, name: names[index] })).filter(({ value }) => value !== 0)
    if (terms.length === 0) return `0z=${row[3]}`
    const left = terms.map(({ value, name }, index) => {
        const sign = value < 0 ? '-' : index === 0 ? '' : '+'
        const size = Math.abs(value) === 1 ? '' : String(Math.abs(value))
        return `${sign}${size}${name}`
    }).join('')
    return `${left}=${row[3]}`
}

/** The matrix in LaTeX, with the bar before the constant terms */
export const matrixLatex = (rows: Matrix) => `\\left(\\begin{array}{ccc|c}${rows.map((row) => row.join('&')).join('\\\\ ')}\\end{array}\\right)`

/** The operation in LaTeX: E_2-2E_1, 3E_3+E_2 */
export function operationLatex(state: Pick<GaussState, 'target' | 'source' | 'm' | 'k'>): string {
    const changing = `${state.m === 1 ? '' : state.m}E_${state.target + 1}`
    if (state.k === 0) return changing
    const size = Math.abs(state.k) === 1 ? '' : String(Math.abs(state.k))
    return `${changing}${state.k < 0 ? '-' : '+'}${size}E_${state.source + 1}`
}

/* ---------- Plans: the operations that make a matrix triangular (for the endless challenges and the tests) ---------- */

export type GaussMove = { kind: 'row'; target: 1 | 2; source: 0 | 1; m: number; k: number } | { kind: 'swap'; first: 0 | 1 }

/** m·Eᵢ + k·Eⱼ that leaves 0 under a pivot p, with m > 0 */
function zeroing(pivot: number, entry: number): { m: number; k: number } {
    const g = gcd(Math.abs(pivot), Math.abs(entry))
    return { m: Math.abs(pivot) / g, k: (-Math.sign(pivot) * entry) / g }
}

/** The moves, in order, that make the matrix triangular */
export function gaussPlan(start: Matrix): GaussMove[] {
    let rows = copy(start)
    const moves: GaussMove[] = []
    const run = (move: GaussMove) => {
        moves.push(move)
        rows = playMove({ ...initialGaussState, rows }, move).rows
    }
    if (rows[0][0] === 0) run({ kind: 'swap', first: rows[1][0] !== 0 ? 0 : 1 })
    for (const target of [1, 2] as const) {
        if (rows[target][0] !== 0) run({ kind: 'row', target, source: 0, ...zeroing(rows[0][0], rows[target][0]) })
    }
    if (rows[1][1] === 0 && rows[2][1] !== 0) run({ kind: 'swap', first: 1 })
    if (rows[2][1] !== 0) run({ kind: 'row', target: 2, source: 1, ...zeroing(rows[1][1], rows[2][1]) })
    return moves
}

/** One move on a state: the operation is set, then applied */
export function playMove(state: GaussState, move: GaussMove): GaussState {
    return move.kind === 'swap' ? swapGauss(state, move.first) : applyGauss(setGauss(state, move))
}

/** A system after a list of moves */
export const afterMoves = (system: number, moves: GaussMove[]) => moves.reduce(playMove, loadGaussSystem(initialGaussState, system))

/* ---------- Challenges ---------- */

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })

export const gaussChallenges: LabChallenge<GaussState>[] = [
    { id: 113101, prompt: say('A sisteman, egin 0 bat $E_2$ errenkadaren lehen zutabean.', 'En el sistema A, haz un 0 en la primera columna de $E_2$.', 'في النظام A اجعل في العمود الأول من $E_2$ صفرًا.', 'In system A, make a 0 in the first column of $E_2$.'), hint: say('$E_2$ errenkadak $2x$ du eta $E_1$ errenkadak $x$: $k=-2$.', '$E_2$ tiene $2x$ y $E_1$ tiene $x$: $k=-2$.', 'في $E_2$ يوجد $2x$ وفي $E_1$ يوجد $x$: $k=-2$.', '$E_2$ has $2x$ and $E_1$ has $x$: $k=-2$.'), isSolved: (state) => state.system === 0 && state.rows[1][0] === 0 },
    { id: 113102, prompt: say('Mailakatu A sistema: zeroak diagonalaren azpian.', 'Escalona el sistema A: ceros bajo la diagonal.', 'حوّل النظام A إلى الشكل الدرجي: أصفار تحت القطر.', 'Make system A triangular: zeros below the diagonal.'), hint: say('Lehenik $x$ kendu $E_2$ eta $E_3$ errenkadetatik; gero $y$ kendu $E_3$ errenkadatik $E_2$ erabiliz.', 'Primero quita la $x$ de $E_2$ y $E_3$; después, la $y$ de $E_3$ usando $E_2$.', 'احذف أولًا $x$ من $E_2$ و$E_3$، ثم احذف $y$ من $E_3$ باستعمال $E_2$.', 'First remove the $x$ from $E_2$ and $E_3$; then the $y$ from $E_3$ using $E_2$.'), isSolved: (state) => state.system === 0 && isTriangular(state.rows) && state.rows[1][1] !== 0 },
    { id: 113103, prompt: say('Mailakatu C sistema. Zenbat soluzio ditu?', 'Escalona el sistema C. ¿Cuántas soluciones tiene?', 'حوّل النظام C إلى الشكل الدرجي. كم حلًّا له؟', 'Make system C triangular. How many solutions does it have?'), hint: say('Begiratu azken errenkadari, mailakatu ondoren.', 'Mira la última fila cuando esté escalonado.', 'انظر إلى الصف الأخير بعد التحويل.', 'Look at the last row once it is triangular.'), isSolved: (state) => state.system === 2 && isTriangular(state.rows) },
    { id: 113104, prompt: say('D sisteman, lortu zeroz osatutako errenkada bat.', 'En el sistema D, consigue una fila de ceros.', 'في النظام D احصل على صف كله أصفار.', 'In system D, get a row of zeros.'), hint: say('$E_2-E_1$ eta $E_3-2E_1$ berdinak dira.', '$E_2-E_1$ y $E_3-2E_1$ salen iguales.', '$E_2-E_1$ و$E_3-2E_1$ متساويتان.', '$E_2-E_1$ and $E_3-2E_1$ come out the same.'), isSolved: (state) => state.system === 3 && state.rows.some((row) => row.every((value) => value === 0)) },
    { id: 113105, prompt: say('Mailakatu E sistema, gehienez hiru eragiketarekin.', 'Escalona el sistema E en tres operaciones como mucho.', 'حوّل النظام E إلى الشكل الدرجي بثلاث عمليات على الأكثر.', 'Make system E triangular in at most three operations.'), hint: say('$E_1$ errenkadak $2x$ du: erabili $m=2$, adibidez $2E_2-E_1$.', '$E_1$ empieza por $2x$: usa $m=2$, por ejemplo $2E_2-E_1$.', 'تبدأ $E_1$ بـ $2x$: استعمل $m=2$، مثل $2E_2-E_1$.', '$E_1$ starts with $2x$: use $m=2$, for example $2E_2-E_1$.'), isSolved: (state) => state.system === 4 && isTriangular(state.rows) && state.steps <= 3 }
]

type Goal = 'second' | 'third' | 'triangular'

/** Endless practice: a zero in one place, or the whole matrix triangular, in one of the six systems */
const gaussMaker: LabChallengeMaker<GaussState> = (random) => {
    const system = randomInt(random, 0, GAUSS_SYSTEMS.length - 1)
    const goal = pick<Goal>(random, ['second', 'third', 'triangular'])
    const name = GAUSS_NAMES[system]
    const plan = gaussPlan(GAUSS_SYSTEMS[system])
    if (goal === 'triangular') {
        return {
            prompt: say(`Mailakatu ${name} sistema.`, `Escalona el sistema ${name}.`, `حوّل النظام ${name} إلى الشكل الدرجي.`, `Make system ${name} triangular.`),
            hint: say('Lehenik lehen zutabea, gero bigarrena.', 'Primero la primera columna, después la segunda.', 'العمود الأول أولًا ثم الثاني.', 'First the first column, then the second.'),
            isSolved: (state) => state.system === system && isTriangular(state.rows),
            solution: afterMoves(system, plan)
        }
    }
    const target = goal === 'second' ? 1 : 2
    const row = `E_${target + 1}`
    const first = plan.filter((move) => move.kind === 'row' && move.target === target && move.source === 0)
    return {
        prompt: say(`${name} sisteman, egin 0 bat $${row}$ errenkadaren lehen zutabean.`, `En el sistema ${name}, haz un 0 en la primera columna de $${row}$.`, `في النظام ${name} اجعل في العمود الأول من $${row}$ صفرًا.`, `In system ${name}, make a 0 in the first column of $${row}$.`),
        hint: say(`Aukeratu $m$ eta $k$, $m$ bider $${row}$ errenkadako lehen zenbakia gehi $k$ bider $E_1$ errenkadakoa 0 izan dadin.`, `Elige $m$ y $k$ para que $m$ por el primer número de $${row}$ más $k$ por el de $E_1$ dé 0.`, `اختر $m$ و$k$ بحيث يكون $m$ ضرب أول عدد في $${row}$ زائد $k$ ضرب أول عدد في $E_1$ مساويًا 0.`, `Choose $m$ and $k$ so that $m$ times the first number of $${row}$ plus $k$ times that of $E_1$ is 0.`),
        isSolved: (state) => state.system === system && state.rows[target][0] === 0,
        solution: afterMoves(system, first.length ? first : plan.slice(0, 1))
    }
}

export const gaussExtra = freshFrom(initialGaussState, gaussMaker)
