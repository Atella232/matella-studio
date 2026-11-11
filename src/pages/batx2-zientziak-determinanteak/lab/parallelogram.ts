import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L1 · Paralelogramoa (El paralelogramo): the two columns of a 2 × 2
   matrix are two arrows from the origin, u = (a, c) and v = (b, d). They
   span a parallelogram whose area is |ad − bc|; the sign of the
   determinant says whether v is turned anticlockwise from u (+) or
   clockwise (−), and it is 0 when the arrows lie on one line. The learner
   moves the tips (dragging or with the steppers) and predicts the sign
   before the determinant is shown. ▶ slides v along u: the area does not
   change (adding a multiple of one column to the other).
   ========================================================================== */

export type Arrow = 'u' | 'v'
export type Vector = [number, number]

export interface ParallelogramState {
    u: Vector
    v: Vector
    active: Arrow
    prediction: Prediction | null
}

export const ARROW_LIMITS = { min: -3, max: 3 } as const
export const initialParallelogramState: ParallelogramState = { u: [3, 1], v: [1, 3], active: 'u', prediction: null }

const clamp = (value: number) => Math.min(ARROW_LIMITS.max, Math.max(ARROW_LIMITS.min, Math.round(value)))

/** |A| with the columns u and v: ad − bc */
export const areaDet = (u: Vector, v: Vector) => u[0] * v[1] - v[0] * u[1] + 0
export const parallelogramDet = (state: Pick<ParallelogramState, 'u' | 'v'>) => areaDet(state.u, state.v)
export const parallelogramPrediction = (state: ParallelogramState): Prediction => compareTo(parallelogramDet(state), 0)
/** The rows of the matrix whose columns are u and v */
export const columnsMatrix = (state: Pick<ParallelogramState, 'u' | 'v'>): number[][] => [[state.u[0], state.v[0]], [state.u[1], state.v[1]]]

export const chooseArrow = (state: ParallelogramState, active: Arrow): ParallelogramState => (active === state.active ? state : { ...state, active })

/** Moves the tip of an arrow; the prediction goes when the matrix changes */
export function setTip(state: ParallelogramState, arrow: Arrow, tip: Vector): ParallelogramState {
    const next: Vector = [clamp(tip[0]), clamp(tip[1])]
    const old = state[arrow]
    if (next[0] === old[0] && next[1] === old[1]) return state.active === arrow ? state : { ...state, active: arrow }
    return { ...state, [arrow]: next, active: arrow, prediction: null }
}

/** The arrow whose tip is nearest to a point of the grid (the one being moved when they tie) */
export function nearestArrow(state: ParallelogramState, point: Vector): Arrow {
    const distance = (tip: Vector) => Math.hypot(tip[0] - point[0], tip[1] - point[1])
    const du = distance(state.u)
    const dv = distance(state.v)
    return du === dv ? state.active : du < dv ? 'u' : 'v'
}

/** v slid along u, v + s·u: the parallelogram keeps its area */
export const slid = (state: Pick<ParallelogramState, 'u' | 'v'>, s: number): Vector => [state.v[0] + s * state.u[0], state.v[1] + s * state.u[1]]

const isZero = (vector: Vector) => vector[0] === 0 && vector[1] === 0

/* ---------- Challenges ---------- */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })

export const parallelogramChallenges: LabChallenge<ParallelogramState>[] = [
    { id: 117101, prompt: say('Lortu $|A|=0$, gezi bat ere zero izan gabe.', 'Consigue $|A|=0$ sin que ninguna flecha sea cero.', 'احصل على $|A|=0$ دون أن يكون أي سهم صفرًا.', 'Get $|A|=0$ without either arrow being zero.'), hint: say('Jarri bi geziak lerro berean: paralelogramoa zapaldu egiten da.', 'Pon las dos flechas en la misma recta: el paralelogramo se aplasta.', 'ضع السهمين على المستقيم نفسه: ينسحق متوازي الأضلاع.', 'Put both arrows on the same line: the parallelogram is squashed flat.'), isSolved: (state) => parallelogramDet(state) === 0 && !isZero(state.u) && !isZero(state.v) },
    { id: 117102, prompt: say('Lortu 6 azalera, $|A|$ positiboa izanik.', 'Consigue un área de 6 con $|A|$ positivo.', 'احصل على مساحة 6 مع $|A|$ موجب.', 'Get an area of 6 with $|A|$ positive.'), hint: say('Adibidez: $u$ ardatz horizontalean eta $v$ goian.', 'Por ejemplo: $u$ sobre el eje horizontal y $v$ arriba.', 'مثلًا: $u$ على المحور الأفقي و$v$ في الأعلى.', 'For example: $u$ on the horizontal axis and $v$ above it.'), isSolved: (state) => parallelogramDet(state) === 6 },
    { id: 117103, prompt: say('Lortu $|A|=-4$.', 'Consigue $|A|=-4$.', 'احصل على $|A|=-4$.', 'Get $|A|=-4$.'), hint: say('Zeinua negatiboa da $v$ gezia $u$ geziaren eskuinaldean dagoenean (erlojuaren norabidean).', 'El signo es negativo cuando $v$ queda a la derecha de $u$ (en el sentido del reloj).', 'تكون الإشارة سالبة عندما يقع $v$ على يمين $u$ (باتجاه عقارب الساعة).', 'The sign is negative when $v$ is to the right of $u$ (clockwise).'), isSolved: (state) => parallelogramDet(state) === -4 },
    { id: 117104, prompt: say('Marraztu 9 azalerako karratu bat.', 'Dibuja un cuadrado de área 9.', 'ارسم مربعًا مساحته 9.', 'Draw a square of area 9.'), hint: say('Bi gezi perpendikular, biak 3 luze.', 'Dos flechas perpendiculares, las dos de longitud 3.', 'سهمان متعامدان، طول كل منهما 3.', 'Two perpendicular arrows, both 3 long.'), isSolved: (state) => Math.abs(parallelogramDet(state)) === 9 && state.u[0] * state.v[0] + state.u[1] * state.v[1] === 0 && state.u[0] ** 2 + state.u[1] ** 2 === state.v[0] ** 2 + state.v[1] ** 2 },
    { id: 117105, prompt: say('Lortu $|A|=5$, matrizean zerorik gabe.', 'Consigue $|A|=5$ sin ningún cero en la matriz.', 'احصل على $|A|=5$ دون أي صفر في المصفوفة.', 'Get $|A|=5$ with no zero in the matrix.'), hint: say('$ad-bc=5$: adibidez, $ad=6$ eta $bc=1$.', '$ad-bc=5$: por ejemplo, $ad=6$ y $bc=1$.', '$ad-bc=5$: مثلًا $ad=6$ و$bc=1$.', '$ad-bc=5$: for example, $ad=6$ and $bc=1$.'), isSolved: (state) => parallelogramDet(state) === 5 && [...state.u, ...state.v].every((value) => value !== 0) }
]

const range = Array.from({ length: ARROW_LIMITS.max - ARROW_LIMITS.min + 1 }, (_, index) => ARROW_LIMITS.min + index)

/** Every pair of arrows on the board with |A| = target */
export function pairsWith(target: number): Array<{ u: Vector; v: Vector }> {
    const found: Array<{ u: Vector; v: Vector }> = []
    for (const a of range) for (const c of range) for (const b of range) for (const d of range) if (a * d - b * c === target) found.push({ u: [a, c], v: [b, d] })
    return found
}

/** Endless practice: a signed area, sometimes with u fixed */
const parallelogramMaker: LabChallengeMaker<ParallelogramState> = (random) => {
    const target = pick(random, [-9, -8, -6, -5, -3, -2, 2, 3, 4, 7, 10, 12])
    const pairs = pairsWith(target)
    // u fixed on an axis, so that only v has to move (not every area can be made that way: 5 or 7 need a slanted u)
    const withAxis = pairs.filter(({ u }) => (u[1] === 0 && u[0] > 0) || (u[0] === 0 && u[1] > 0))
    if (randomInt(random, 0, 1) === 0 || withAxis.length === 0) {
        const { u, v } = pick(random, pairs)
        return {
            prompt: say(`Lortu $|A|=${target}$.`, `Consigue $|A|=${target}$.`, `احصل على $|A|=${target}$.`, `Get $|A|=${target}$.`),
            hint: say('$|A|=ad-bc$: zeinua $v$ geziaren aldeak ematen du.', '$|A|=ad-bc$: el signo lo da el lado hacia el que queda $v$.', '$|A|=ad-bc$: الإشارة يحددها الجانب الذي يقع فيه $v$.', '$|A|=ad-bc$: the sign comes from the side $v$ is on.'),
            isSolved: (state) => parallelogramDet(state) === target,
            solution: { u, v, active: 'v', prediction: null }
        }
    }
    const { u, v } = pick(random, withAxis)
    const uText = `(${u[0]},${u[1]})`
    return {
        prompt: say(`$u=${uText}$ utzita, lortu $|A|=${target}$.`, `Con $u=${uText}$, consigue $|A|=${target}$.`, `مع $u=${uText}$ احصل على $|A|=${target}$.`, `With $u=${uText}$, get $|A|=${target}$.`),
        hint: say('Azalera = oinarria × altuera: $v$ geziaren altuera da garrantzitsua.', 'Área = base × altura: lo que cuenta es la altura de $v$.', 'المساحة = القاعدة × الارتفاع: المهم ارتفاع $v$.', 'Area = base × height: what counts is the height of $v$.'),
        isSolved: (state) => state.u[0] === u[0] && state.u[1] === u[1] && parallelogramDet(state) === target,
        solution: { u, v, active: 'v', prediction: null }
    }
}

export const parallelogramExtra = freshFrom(initialParallelogramState, parallelogramMaker)
