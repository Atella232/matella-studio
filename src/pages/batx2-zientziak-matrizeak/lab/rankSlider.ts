import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { echelon, rank, toMatrix, type Matrix } from '../matrix.ts'

/* ==========================================================================
   L4 · Heinaren graduatzailea (El deslizador del rango): five 3 × 3
   matrices with a parameter m. Moving m changes the matrix; its echelon
   form shows which rows are left. Before the rank is shown, the learner
   predicts it: 1, 2 or 3. ▶ runs m over every value and leaves the rank of
   each one on a strip, so the critical values stand out. Exported: the
   Determinantes and Sistemas units of this block reuse it.
   ========================================================================== */

export interface RankFamily {
    rows: (m: number) => number[][]
    /** The matrix with the letter m, in LaTeX */
    latex: string
}

export const RANK_FAMILIES: RankFamily[] = [
    { rows: (m) => [[1, 1, 2], [2, 3, 5], [1, 2, m]], latex: '\\begin{pmatrix}1&1&2\\\\2&3&5\\\\1&2&m\\end{pmatrix}' },
    { rows: (m) => [[1, 2, 1], [2, 1, m], [1, -1, 1]], latex: '\\begin{pmatrix}1&2&1\\\\2&1&m\\\\1&-1&1\\end{pmatrix}' },
    { rows: (m) => [[1, 1, 1], [1, m, 1], [1, 1, m]], latex: '\\begin{pmatrix}1&1&1\\\\1&m&1\\\\1&1&m\\end{pmatrix}' },
    { rows: (m) => [[m, 1, 1], [1, m, 1], [1, 1, m]], latex: '\\begin{pmatrix}m&1&1\\\\1&m&1\\\\1&1&m\\end{pmatrix}' },
    { rows: (m) => [[1, 2, 3], [2, 4, m], [3, 6, 9]], latex: '\\begin{pmatrix}1&2&3\\\\2&4&m\\\\3&6&9\\end{pmatrix}' }
]
export const RANK_NAMES = ['A', 'B', 'C', 'D', 'E'] as const
export const RANK_LIMITS = { min: -4, max: 6 } as const
export const rankValues = Array.from({ length: RANK_LIMITS.max - RANK_LIMITS.min + 1 }, (_, index) => RANK_LIMITS.min + index)

export interface RankState {
    family: number
    m: number
    prediction: Prediction | null
    /** The values of m whose rank has been shown */
    seen: number[]
}

export const initialRankState: RankState = { family: 0, m: 0, prediction: null, seen: [] }

const clamp = (value: number) => Math.min(RANK_LIMITS.max, Math.max(RANK_LIMITS.min, Math.round(value)))

export const matrixAt = (family: number, m: number): Matrix => toMatrix(RANK_FAMILIES[family].rows(m))
export const rankAt = (family: number, m: number) => rank(matrixAt(family, m))
export const currentRank = (state: Pick<RankState, 'family' | 'm'>) => rankAt(state.family, state.m)
export const echelonAt = (state: Pick<RankState, 'family' | 'm'>) => echelon(matrixAt(state.family, state.m))

/** 1, 2 or 3 as a prediction: below 2, 2, above 2 */
export const rankPrediction = (state: RankState): Prediction => compareTo(currentRank(state), 2)

export const chooseFamily = (state: RankState, family: number): RankState =>
    family === state.family ? state : { family, m: state.m, prediction: null, seen: [] }
export const setM = (state: RankState, m: number): RankState => {
    const next = clamp(m)
    return next === state.m ? state : { ...state, m: next, prediction: null }
}
/** The prediction shows the rank of this m on the strip */
export const markSeen = (state: RankState): RankState => (state.seen.includes(state.m) ? state : { ...state, seen: [...state.seen, state.m] })
/** ▶ shows every value of m */
export const seeAll = (state: RankState): RankState => ({ ...state, seen: [...rankValues] })

/** The values of m (inside the range) where the rank drops, with the rank they give */
export function criticalValues(family: number): Array<{ m: number; rank: number }> {
    const ranks = rankValues.map((m) => ({ m, rank: rankAt(family, m) }))
    const top = Math.max(...ranks.map((item) => item.rank))
    return ranks.filter((item) => item.rank < top)
}

/* ---------- Challenges ---------- */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })

export const rankChallenges: LabChallenge<RankState>[] = [
    { id: 116301, prompt: say('A familian, aurkitu heina 2 arte jaisten duen $m$ balioa.', 'En la familia A, encuentra el valor de $m$ que baja el rango a 2.', 'في العائلة A أوجد قيمة $m$ التي تُنزل الرتبة إلى 2.', 'In family A, find the value of $m$ that brings the rank down to 2.'), hint: say('Mailakatuta, azken errenkada $(0\\ \\ 0\\ \\ m-3)$ da.', 'Escalonada, la última fila es $(0\\ \\ 0\\ \\ m-3)$.', 'بعد التحويل يكون الصف الأخير $(0\\ \\ 0\\ \\ m-3)$.', 'Reduced, the last row is $(0\\ \\ 0\\ \\ m-3)$.'), isSolved: (state) => state.family === 0 && state.m === 3 },
    { id: 116302, prompt: say('B familian, zein $m$ baliotarako da heina 2?', 'En la familia B, ¿con qué $m$ el rango es 2?', 'في العائلة B مع أي $m$ تكون الرتبة 2؟', 'In family B, for which $m$ is the rank 2?'), hint: say('$E_2-2E_1$ eta $E_3-E_1$ egin ondoren, bi errenkadek $-3$ dute erdian.', 'Tras $E_2-2E_1$ y $E_3-E_1$, las dos filas tienen $-3$ en el medio.', 'بعد $E_2-2E_1$ و$E_3-E_1$ يكون في وسط الصفين $-3$.', 'After $E_2-2E_1$ and $E_3-E_1$, both rows have $-3$ in the middle.'), isSolved: (state) => state.family === 1 && state.m === 2 },
    { id: 116303, prompt: say('C familian, lortu 1 heina.', 'En la familia C, consigue rango 1.', 'في العائلة C احصل على الرتبة 1.', 'In family C, get rank 1.'), hint: say('Kendu $E_1$ beste bi errenkadei: $m-1$ geratzen da.', 'Resta $E_1$ a las otras dos filas: queda $m-1$.', 'اطرح $E_1$ من الصفين الآخرين: يبقى $m-1$.', 'Subtract $E_1$ from the other two rows: $m-1$ is left.'), isSolved: (state) => state.family === 2 && state.m === 1 },
    { id: 116304, prompt: say('D familiak bi balio kritiko ditu. Lortu 2 heina.', 'La familia D tiene dos valores críticos. Consigue rango 2.', 'للعائلة D قيمتان حرجتان. احصل على الرتبة 2.', 'Family D has two critical values. Get rank 2.'), hint: say('Probatu $m$ negatibo bat: errenkadak batzean zero ateratzen da.', 'Prueba un $m$ negativo: al sumar las tres filas sale cero.', 'جرّب قيمة سالبة لـ $m$: بجمع الصفوف الثلاثة يظهر الصفر.', 'Try a negative $m$: adding the three rows gives zero.'), isSolved: (state) => state.family === 3 && state.m === -2 },
    { id: 116305, prompt: say('E familian, lortu ahalik eta heinarik txikiena.', 'En la familia E, consigue el rango más bajo posible.', 'في العائلة E احصل على أدنى رتبة ممكنة.', 'In family E, get the lowest rank you can.'), hint: say('$E_3=3E_1$ beti: heina ez da inoiz 3. Begiratu $E_2$ eta $E_1$.', 'Siempre $E_3=3E_1$: el rango nunca es 3. Mira $E_2$ y $E_1$.', 'دائمًا $E_3=3E_1$: الرتبة ليست 3 أبدًا. انظر إلى $E_2$ و$E_1$.', 'Always $E_3=3E_1$: the rank is never 3. Look at $E_2$ and $E_1$.'), isSolved: (state) => state.family === 4 && state.m === 6 }
]

/** Endless practice: a family and a rank that one of its critical values gives */
const rankMaker: LabChallengeMaker<RankState> = (random) => {
    const family = randomInt(random, 0, RANK_FAMILIES.length - 1)
    const { m, rank: target } = pick(random, criticalValues(family))
    const name = RANK_NAMES[family]
    return {
        prompt: say(`${name} familian, lortu ${target} heina.`, `En la familia ${name}, consigue rango ${target}.`, `في العائلة ${name} احصل على الرتبة ${target}.`, `In family ${name}, get rank ${target}.`),
        hint: say('Mailakatu $m$ barruan dela, eta berdindu zerora geratzen dena.', 'Escalona con la $m$ dentro e iguala a cero lo que quede.', 'حوّل إلى الشكل الدرجي و$m$ في الداخل، وساوِ ما يبقى بالصفر.', 'Reduce with $m$ inside and set what is left equal to zero.'),
        isSolved: (state) => state.family === family && currentRank(state) === target,
        solution: { family, m, prediction: null, seen: [] }
    }
}

export const rankExtra = freshFrom(initialRankState, rankMaker)
