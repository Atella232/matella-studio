import { fraction, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { add, cross, det3, dot, scale, type Vec3 } from '../../batx2-zientziak-bektoreak/space/vec3.ts'
import { clampTo, exactRank, isZeroVec, levelLatex, linearLatex, nonZeroStep, proportional, say } from './common.ts'

/* ==========================================================================
   L5 · Hiru plano (Tres planos): three planes a·x + b·y + c·z = d with
   a, b and c from −2 to 2 (never all three 0) and d from −4 to 4. The
   learner first predicts how many points they share: one, infinitely
   many (a line or a whole plane) or none; then the extended matrix M*,
   det M, both ranks, the name of the case and, when there is one, the
   exact common point (Cramer) appear. The common line, when there is
   one, has the exact closed form p = (d₁ n₂ × w + d₂ w × n₁) / |w|²
   with w = n₁ × n₂. Pure logic.
   ========================================================================== */

export const COEFFICIENT_LIMIT = 2
export const CONSTANT_LIMIT = 4

export type PlaneRow = readonly [number, number, number, number]
export type PlaneIndex = 0 | 1 | 2
export type PlanesCase = 'point' | 'line' | 'line-double' | 'prism' | 'two-parallel' | 'same' | 'parallel' | 'parallel-double'

export interface ThreePlanesState {
    planes: readonly [PlaneRow, PlaneRow, PlaneRow]
    prediction: Prediction | null
}

export const initialThreePlanesState: ThreePlanesState = { planes: [[1, 1, 1, 3], [1, -1, 0, 0], [1, 0, 1, 3]], prediction: null }

export const normalOf = (row: PlaneRow): Vec3 => [row[0], row[1], row[2]]
const sameRow = (a: PlaneRow, b: PlaneRow) => a.every((value, index) => value === b[index])

export function setPlaneRow(state: ThreePlanesState, index: PlaneIndex, row: PlaneRow): ThreePlanesState {
    const normal = nonZeroStep(COEFFICIENT_LIMIT, normalOf(state.planes[index]), normalOf(row))
    const next: PlaneRow = [normal[0], normal[1], normal[2], clampTo(CONSTANT_LIMIT)(row[3])]
    const planes: ThreePlanesState['planes'] = [index === 0 ? next : state.planes[0], index === 1 ? next : state.planes[1], index === 2 ? next : state.planes[2]]
    return { planes, prediction: sameRow(next, state.planes[index]) ? state.prediction : null }
}

/** The state as the controls would leave it (for the tests) */
export const normalThreePlanesState = (state: ThreePlanesState): ThreePlanesState =>
    ({ ...([0, 1, 2] as PlaneIndex[]).reduce((current, index) => setPlaneRow(current, index, state.planes[index]), state), prediction: state.prediction })

type Planes = Pick<ThreePlanesState, 'planes'>

export const coefficientRank = ({ planes }: Planes) => exactRank(planes.map(normalOf))
export const extendedRank = ({ planes }: Planes) => exactRank(planes)
export const planesDeterminant = ({ planes }: Planes) => det3(normalOf(planes[0]), normalOf(planes[1]), normalOf(planes[2])) + 0

const pairs: Array<[PlaneIndex, PlaneIndex]> = [[0, 1], [0, 2], [1, 2]]
const someSamePlanes = ({ planes }: Planes) => pairs.some(([i, j]) => proportional(planes[i], planes[j]))
const someParallelNormals = ({ planes }: Planes) => pairs.some(([i, j]) => proportional(normalOf(planes[i]), normalOf(planes[j])))

export function planesCase(state: Planes): PlanesCase {
    const m = coefficientRank(state)
    const extended = extendedRank(state)
    if (m === 3) return 'point'
    if (m === 2) {
        if (extended === 2) return someSamePlanes(state) ? 'line-double' : 'line'
        return someParallelNormals(state) ? 'two-parallel' : 'prism'
    }
    if (extended === 1) return 'same'
    return someSamePlanes(state) ? 'parallel-double' : 'parallel'
}

/** What the learner predicts: one common point ('<'), infinitely many ('=') or none ('>') */
export const threePlanesPrediction = (state: ThreePlanesState): Prediction => {
    const m = coefficientRank(state)
    return m === 3 ? '<' : m === extendedRank(state) ? '=' : '>'
}

/** The common point by Cramer's rule, exact, when there is only one */
export function commonPoint(state: Planes): FractionValue[] | null {
    const det = planesDeterminant(state)
    if (det === 0) return null
    const columns = [0, 1, 2].map((column) => {
        const swap = (row: PlaneRow): Vec3 => [column === 0 ? row[3] : row[0], column === 1 ? row[3] : row[1], column === 2 ? row[3] : row[2]]
        return det3(swap(state.planes[0]), swap(state.planes[1]), swap(state.planes[2]))
    })
    return columns.map((value) => fraction(value, det))
}

/** The common line when the three planes share one (rank 2 and 2): a point on it and its direction */
export function commonLine(state: Planes): { point: Vec3; direction: Vec3 } | null {
    if (coefficientRank(state) !== 2 || extendedRank(state) !== 2) return null
    const [i, j] = pairs.find(([first, second]) => !isZeroVec(cross(normalOf(state.planes[first]), normalOf(state.planes[second]))))!
    const [n1, n2] = [normalOf(state.planes[i]), normalOf(state.planes[j])]
    const w = cross(n1, n2)
    const top = add(scale(state.planes[i][3], cross(n2, w)), scale(state.planes[j][3], cross(w, n1)))
    return { point: scale(1 / dot(w, w), top), direction: w }
}

export const planeLabel = (row: PlaneRow) => levelLatex(normalOf(row), row[3])

export const threePlanesChallenges: LabChallenge<ThreePlanesState>[] = [
    {
        id: 120301,
        prompt: say('Lortu hiru planoek $(1,1,1)$ puntuan ebakitzea.', 'Haz que los tres planos se corten en el punto $(1,1,1)$.', 'اجعل المستويات الثلاثة تتقاطع في النقطة $(1,1,1)$.', 'Make the three planes meet at the point $(1,1,1)$.'),
        hint: say('Plano bakoitzean, $d=a+b+c$ izan behar da.', 'En cada plano tiene que ser $d=a+b+c$.', 'في كل مستوى يجب أن يكون $d=a+b+c$.', 'In each plane it has to be $d=a+b+c$.'),
        isSolved: (state) => {
            const point = commonPoint(state)
            return point !== null && point.every((value) => value.numerator === 1 && value.denominator === 1)
        }
    },
    {
        id: 120302,
        prompt: say('Lortu hiru planoek zuzen bat komunean izatea, bi plano bat etorri gabe.', 'Haz que los tres tengan una recta en común sin que coincidan dos de ellos.', 'اجعل للمستويات الثلاثة مستقيمًا مشتركًا دون أن ينطبق اثنان منها.', 'Make the three share a line without two of them being the same.'),
        hint: say('Hirugarren errenkada: lehenengo bien batura, $d$ barne.', 'La tercera fila: la suma de las dos primeras, también la $d$.', 'الصف الثالث: مجموع الصفين الأولين، ومعه $d$.', 'The third row: the sum of the first two, $d$ included.'),
        isSolved: (state) => planesCase(state) === 'line'
    },
    {
        id: 120303,
        prompt: say('Egin prisma bat: planoek binaka ebakitzen dute, baina ez dago puntu komunik.', 'Haz un prisma: los planos se cortan dos a dos pero no hay punto común.', 'اصنع موشورًا: تتقاطع المستويات مثنى مثنى ولا نقطة مشتركة.', 'Make a prism: the planes meet in pairs but share no point.'),
        hint: say('Hirugarren normala: lehenengo bien batura; baina $d$ ez.', 'El tercer normal: la suma de los dos primeros; pero la $d$ no.', 'الناظم الثالث: مجموع الناظمين الأولين؛ أما $d$ فلا.', 'The third normal: the sum of the first two; but not $d$.'),
        isSolved: (state) => planesCase(state) === 'prism'
    },
    {
        id: 120304,
        prompt: say('Lortu hiru planoak paraleloak eta desberdinak izatea.', 'Haz que los tres planos sean paralelos y distintos.', 'اجعل المستويات الثلاثة متوازية ومختلفة.', 'Make the three planes parallel and different.'),
        hint: say('Normal proportzionalak eta $d$ desberdinak, proportzioan sartu gabe.', 'Normales proporcionales y $d$ distintas, fuera de la proporción.', 'ناظمات متناسبة و$d$ مختلفة خارج التناسب.', 'Proportional normals and different $d$, out of proportion.'),
        isSolved: (state) => planesCase(state) === 'parallel'
    },
    {
        id: 120305,
        prompt: say('Lortu bi plano paraleloak izatea eta hirugarrenak biak ebakitzea.', 'Haz que dos planos sean paralelos y el tercero corte a los dos.', 'اجعل مستويين متوازيين والثالث يقطعهما.', 'Make two planes parallel and the third one cut both.'),
        hint: say('Bi errenkadatan normal bera eta $d$ desberdina.', 'En dos filas el mismo normal y distinta $d$.', 'في صفين الناظم نفسه و$d$ مختلفة.', 'In two rows the same normal and a different $d$.'),
        isSolved: (state) => planesCase(state) === 'two-parallel'
    }
]

/** Endless practice: π₁, π₂ and the normal of π₃ are given; the d of π₃ that makes a line in common */
const threePlanesMaker: LabChallengeMaker<ThreePlanesState> = (random) => {
    for (;;) {
        const pick = () => randomInt(random, -COEFFICIENT_LIMIT, COEFFICIENT_LIMIT)
        const level = () => randomInt(random, -CONSTANT_LIMIT, CONSTANT_LIMIT)
        const first: PlaneRow = [pick(), pick(), pick(), level()]
        const second: PlaneRow = [pick(), pick(), pick(), level()]
        if (isZeroVec(cross(normalOf(first), normalOf(second)))) continue
        const [alpha, beta] = [[-1, 1][randomInt(random, 0, 1)], [-1, 1][randomInt(random, 0, 1)]]
        const mix = (index: number) => alpha * first[index] + beta * second[index] + 0
        const third: PlaneRow = [mix(0), mix(1), mix(2), mix(3)]
        if (third.slice(0, 3).some((value) => Math.abs(value) > COEFFICIENT_LIMIT) || Math.abs(third[3]) > CONSTANT_LIMIT) continue
        const planes: ThreePlanesState['planes'] = [first, second, third]
        const missing = `${linearLatex(normalOf(third))}=\\,?`
        return {
            prompt: say(`$\\pi_1$: $${planeLabel(first)}$, $\\pi_2$: $${planeLabel(second)}$ eta $\\pi_3$: $${missing}$. Aukeratu $\\pi_3$ planoaren $d$, hiru planoek zuzen bat komunean izan dezaten.`, `$\\pi_1$: $${planeLabel(first)}$, $\\pi_2$: $${planeLabel(second)}$ y $\\pi_3$: $${missing}$. Elige la $d$ de $\\pi_3$ para que los tres tengan una recta en común.`, `$\\pi_1$: ‏$${planeLabel(first)}$ و$\\pi_2$: ‏$${planeLabel(second)}$ و$\\pi_3$: ‏$${missing}$. اختر $d$ في $\\pi_3$ ليكون للمستويات الثلاثة مستقيم مشترك.`, `$\\pi_1$: $${planeLabel(first)}$, $\\pi_2$: $${planeLabel(second)}$ and $\\pi_3$: $${missing}$. Choose the $d$ of $\\pi_3$ so that the three share a line.`),
            hint: say('$\\pi_3$ planoaren normala beste bien konbinazioa da: $d$ zenbakiak konbinazio bera izan behar du.', 'El normal de $\\pi_3$ es una combinación de los otros dos: la $d$ tiene que seguir la misma combinación.', 'ناظم $\\pi_3$ تركيب من الناظمين الآخرين: يجب أن يتبع $d$ التركيب نفسه.', 'The normal of $\\pi_3$ is a combination of the other two: $d$ has to follow the same combination.'),
            isSolved: (state) => sameRow(state.planes[0], first) && sameRow(state.planes[1], second) && normalOf(state.planes[2]).every((value, index) => value === third[index]) && extendedRank(state) === 2,
            solution: { planes, prediction: null }
        }
    }
}

export const threePlanesExtra = freshFrom(initialThreePlanesState, threePlanesMaker)
