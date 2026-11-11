import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L2 · Bideen mapa (El mapa de rutas): four towns and the bus lines between
   them (one-way arrows). Tapping an arrow puts or takes away a line, and
   the matrix A of the graph changes with it. A² = A·A counts the trips
   with one change: (A²)ᵢⱼ adds up, for every town k, the lines i → k → j.
   Before (A²)ᵢⱼ is shown, the learner predicts: none, one, or more.
   ========================================================================== */

export const TOWNS = 4

export interface RouteState {
    /** arrows[i][j]: a line from town i to town j (never i to i) */
    arrows: boolean[][]
    from: number
    to: number
    prediction: Prediction | null
}

const empty = () => Array.from({ length: TOWNS }, () => Array.from({ length: TOWNS }, () => false))

function withArrows(pairs: Array<[number, number]>): boolean[][] {
    const arrows = empty()
    for (const [i, j] of pairs) arrows[i][j] = true
    return arrows
}

export const initialRouteState: RouteState = { arrows: withArrows([[0, 1], [1, 2], [2, 0]]), from: 0, to: 2, prediction: null }

/** Puts or takes away the line i → j; the prediction goes */
export function toggleArrow(state: RouteState, i: number, j: number): RouteState {
    if (i === j) return state
    const arrows = state.arrows.map((row) => [...row])
    arrows[i][j] = !arrows[i][j]
    return { ...state, arrows, prediction: null }
}

export function chooseTrip(state: RouteState, from: number, to: number): RouteState {
    return from === state.from && to === state.to ? state : { ...state, from, to, prediction: null }
}

export const adjacency = (state: Pick<RouteState, 'arrows'>) => state.arrows.map((row) => row.map((line) => (line ? 1 : 0)))
export const square = (matrix: number[][]) => matrix.map((row) => matrix[0].map((_, j) => row.reduce((sum, value, k) => sum + value * matrix[k][j], 0)))
export const twoStep = (state: RouteState) => square(adjacency(state))[state.from][state.to]
/** The towns k with i → k → j */
export const changes = (state: RouteState) => Array.from({ length: TOWNS }, (_, k) => k).filter((k) => state.arrows[state.from][k] && state.arrows[k][state.to])
export const routePrediction = (state: RouteState): Prediction => compareTo(twoStep(state), 1)
export const lineCount = (state: Pick<RouteState, 'arrows'>) => state.arrows.flat().filter(Boolean).length

/* ---------- Challenges ---------- */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const a2 = (state: RouteState) => square(adjacency(state))

export const routeChallenges: LabChallenge<RouteState>[] = [
    { id: 116151, prompt: say('Aukeratu 3 herritik 2 herrira, eta iragarri zenbat bidaia dauden aldaketa batekin.', 'Elige del pueblo 3 al 2 y predice cuántos viajes hay con un transbordo.', 'اختر من البلدة 3 إلى البلدة 2 وتوقّع عدد الرحلات بتبديل واحد.', 'Choose from town 3 to town 2 and predict how many trips there are with one change.'), hint: say('Bilatu $k$ herria, $3\\to k$ eta $k\\to 2$ lineak dituena.', 'Busca un pueblo $k$ con líneas $3\\to k$ y $k\\to 2$.', 'ابحث عن بلدة $k$ فيها الخطان $3\\to k$ و$k\\to 2$.', 'Look for a town $k$ with lines $3\\to k$ and $k\\to 2$.'), isSolved: (state) => state.from === 2 && state.to === 1 && state.prediction !== null },
    { id: 116152, prompt: say('Lortu bi urratseko bi bide 1 herritik 3 herrira.', 'Consigue dos caminos de dos pasos del pueblo 1 al 3.', 'احصل على مسارين بخطوتين من البلدة 1 إلى البلدة 3.', 'Get two two-step paths from town 1 to town 3.'), hint: say('Orain $1\\to 2\\to 3$ dago. Gehitu beste herri baten bidez: $1\\to 4$ eta $4\\to 3$.', 'Ya está $1\\to 2\\to 3$. Añade otro por otro pueblo: $1\\to 4$ y $4\\to 3$.', 'يوجد الآن $1\\to 2\\to 3$. أضف آخر عبر بلدة أخرى: $1\\to 4$ و$4\\to 3$.', 'There is $1\\to 2\\to 3$ already. Add another through a different town: $1\\to 4$ and $4\\to 3$.'), isSolved: (state) => a2(state)[0][2] === 2 },
    { id: 116153, prompt: say('Lortu joan-etorri bat: $A^2$ matrizearen diagonalean 0 ez den zenbaki bat.', 'Consigue una ida y vuelta: un número distinto de 0 en la diagonal de $A^2$.', 'احصل على ذهاب وإياب: عدد غير 0 على قطر $A^2$.', 'Get a round trip: a number other than 0 on the diagonal of $A^2$.'), hint: say('$(A^2)_{ii}$ elementuak $i\\to k\\to i$ bideak zenbatzen ditu: jarri bi noranzkoetako lineak.', '$(A^2)_{ii}$ cuenta los caminos $i\\to k\\to i$: pon líneas en los dos sentidos.', '$(A^2)_{ii}$ يعدّ المسارات $i\\to k\\to i$: ضع خطين في الاتجاهين.', '$(A^2)_{ii}$ counts the paths $i\\to k\\to i$: put lines both ways.'), isSolved: (state) => a2(state).some((row, i) => row[i] > 0) },
    { id: 116154, prompt: say('Utzi gutxienez bi linea, eta egin $A^2$ zeroz osatua.', 'Deja al menos dos líneas y haz que $A^2$ sea toda de ceros.', 'اترك خطين على الأقل واجعل $A^2$ كلها أصفارًا.', 'Keep at least two lines and make $A^2$ all zeros.'), hint: say('Bi urratseko biderik ez: linea batek ez du amaitu behar beste bat hasten den herrian.', 'Ningún camino de dos pasos: ninguna línea puede acabar en el pueblo donde empieza otra.', 'لا مسار بخطوتين: لا ينتهي أي خط في البلدة التي يبدأ منها خط آخر.', 'No two-step path: no line may end in the town where another one starts.'), isSolved: (state) => lineCount(state) >= 2 && a2(state).every((row) => row.every((value) => value === 0)) },
    { id: 116155, prompt: say('1 herritik 4 herrira linea zuzenik gabe, lortu aldaketa bateko bi bidaia.', 'Sin línea directa del 1 al 4, consigue dos viajes con un transbordo del 1 al 4.', 'دون خط مباشر من 1 إلى 4، احصل على رحلتين بتبديل واحد من 1 إلى 4.', 'With no direct line from 1 to 4, get two trips with one change from 1 to 4.'), hint: say('Erabili 2 eta 3 herriak: $1\\to 2\\to 4$ eta $1\\to 3\\to 4$.', 'Usa los pueblos 2 y 3: $1\\to 2\\to 4$ y $1\\to 3\\to 4$.', 'استعمل البلدتين 2 و3: $1\\to 2\\to 4$ و$1\\to 3\\to 4$.', 'Use towns 2 and 3: $1\\to 2\\to 4$ and $1\\to 3\\to 4$.'), isSolved: (state) => !state.arrows[0][3] && a2(state)[0][3] === 2 }
]

/** Endless practice: exactly one or two two-step paths between two towns */
const routeMaker: LabChallengeMaker<RouteState> = (random) => {
    const from = randomInt(random, 0, TOWNS - 1)
    const to = (from + randomInt(random, 1, TOWNS - 1)) % TOWNS
    const count = randomInt(random, 1, 2)
    const middles = Array.from({ length: TOWNS }, (_, k) => k).filter((k) => k !== from && k !== to).slice(0, count)
    const solution: RouteState = { arrows: withArrows(middles.flatMap((k): Array<[number, number]> => [[from, k], [k, to]])), from, to, prediction: null }
    const [a, b] = [from + 1, to + 1]
    return {
        prompt: say(`Lortu bi urratseko ${count === 1 ? 'bide bakar bat' : 'bi bide'} ${a} herritik ${b} herrira.`, `Consigue exactamente ${count === 1 ? 'un camino' : 'dos caminos'} de dos pasos del pueblo ${a} al ${b}.`, `احصل على ${count === 1 ? 'مسار واحد فقط' : 'مسارين بالضبط'} بخطوتين من البلدة ${a} إلى البلدة ${b}.`, `Get exactly ${count === 1 ? 'one two-step path' : 'two two-step paths'} from town ${a} to town ${b}.`),
        hint: say(`$(A^2)_{${a}${b}}$ elementuak ${a} → k → ${b} bideak zenbatzen ditu.`, `$(A^2)_{${a}${b}}$ cuenta los caminos ${a} → k → ${b}.`, `$(A^2)_{${a}${b}}$ يعدّ المسارات ${a} → k → ${b}.`, `$(A^2)_{${a}${b}}$ counts the paths ${a} → k → ${b}.`),
        isSolved: (state) => square(adjacency(state))[from][to] === count,
        solution
    }
}

export const routeExtra = freshFrom(initialRouteState, routeMaker)
