import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { objectiveValue, optimum, vertices, withSigns, type Goal, type HalfPlane, type Objective, type Point } from '../lp.ts'

/* ==========================================================================
   L1 · Maila-zuzena (La recta de nivel): a feasible region, an objective
   F = ax + by and the line F = k. The learner moves k and watches the
   line sweep the region; before the values at the vertices are shown,
   the learner predicts where the optimum is (one of three vertices, or a
   whole side). The optimum is where the line leaves the region.
   ========================================================================== */

export interface LevelState {
    scenario: number
    k: number
    prediction: Prediction | null
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const L = (a: number, b: number, c: number, sense: HalfPlane['sense'] = '≤'): HalfPlane => ({ a, b, c, sense })

export interface LevelScenario {
    name: LocalizedText
    constraints: HalfPlane[]
    objective: Objective
    goal: Goal
    size: number
    kMax: number
    /** The three answers of the prediction: two or three vertices, or a whole side */
    choices: Record<Prediction, LocalizedText>
    answer: Prediction
}

const at = (point: Point) => say(`(${point.join(', ')}) puntuan`, `En (${point.join(', ')})`, `في (${point.join('، ')})`, `At (${point.join(', ')})`)

export const LEVEL_SCENARIOS: LevelScenario[] = [
    {
        name: say('Irabazia', 'Beneficio', 'الربح', 'Profit'),
        constraints: [L(1, 1, 6), L(1, 2, 8)],
        objective: { a: 3, b: 2 },
        goal: 'max',
        size: 8,
        kMax: 24,
        choices: { '<': at([6, 0]), '=': at([4, 2]), '>': at([0, 4]) },
        answer: '<'
    },
    {
        name: say('Kostua', 'Coste', 'الكلفة', 'Cost'),
        constraints: [L(2, 1, 8, '≥'), L(1, 3, 9, '≥')],
        objective: { a: 3, b: 2 },
        goal: 'min',
        size: 10,
        kMax: 30,
        choices: { '<': at([0, 8]), '=': at([3, 2]), '>': at([9, 0]) },
        answer: '='
    },
    {
        name: say('Berdinketa', 'Empate', 'التعادل', 'A tie'),
        constraints: [L(1, 1, 6), L(1, 0, 4)],
        objective: { a: 1, b: 1 },
        goal: 'max',
        size: 7,
        kMax: 10,
        choices: { '<': at([4, 0]), '=': at([4, 2]), '>': say('(4, 2) eta (0, 6) arteko alde osoan', 'En todo el lado de (4, 2) a (0, 6)', 'على الضلع كله من (4، 2) إلى (0، 6)', 'Along the whole side from (4, 2) to (0, 6)') },
        answer: '>'
    }
]

export const loadLevel = (scenario: number): LevelState => ({ scenario, k: 0, prediction: null })
export const initialLevelState = loadLevel(0)

export const setK = (state: LevelState, k: number): LevelState => ({ ...state, k: Math.min(LEVEL_SCENARIOS[state.scenario].kMax, Math.max(0, Math.round(k))) })

export const levelVertices = (state: LevelState) => vertices(withSigns(LEVEL_SCENARIOS[state.scenario].constraints))
export const levelOptimum = (state: LevelState) => {
    const s = LEVEL_SCENARIOS[state.scenario]
    return optimum(withSigns(s.constraints), s.objective, s.goal)
}
/** The values of F at the vertices: the line F = k meets the region when k is between them (or beyond, for an open region) */
export const levelValues = (state: LevelState) => levelVertices(state).map((point) => objectiveValue(LEVEL_SCENARIOS[state.scenario].objective, point))
export function meetsRegion(state: LevelState): boolean {
    const values = levelValues(state)
    const s = LEVEL_SCENARIOS[state.scenario]
    if (s.goal === 'min') return state.k >= Math.min(...values)
    return state.k >= Math.min(...values) && state.k <= Math.max(...values)
}
export const atOptimum = (state: LevelState) => state.k === levelOptimum(state).value

/* ---------- Challenges ---------- */

export const levelChallenges: LabChallenge<LevelState>[] = [
    {
        id: 144101,
        prompt: say('Irabazian, iragarri non dagoen maximoa, eta ikusi erpinetako balioak.', 'En el beneficio, predice dónde está el máximo y mira los valores en los vértices.', 'في الربح توقّع أين القيمة العظمى وانظر إلى القيم عند الرؤوس.', 'In the profit, predict where the maximum is and look at the values at the vertices.'),
        hint: say('$x$ zenbakiak gehiago balio du: $3$ eta $2$.', 'La $x$ vale más: $3$ frente a $2$.', '$x$ قيمتها أكبر: $3$ مقابل $2$.', '$x$ is worth more: $3$ against $2$.'),
        isSolved: (state) => state.scenario === 0 && state.prediction !== null
    },
    {
        id: 144102,
        prompt: say('Irabazian, eraman zuzena eskualdea uzten duen tokira: maximora.', 'En el beneficio, lleva la recta hasta donde deja la región: el máximo.', 'في الربح حرّك المستقيم إلى حيث يغادر المنطقة: القيمة العظمى.', 'In the profit, take the line to where it leaves the region: the maximum.'),
        hint: say('Erpinetako balio handiena: $F(6,0)=18$.', 'El mayor valor en los vértices: $F(6,0)=18$.', 'أكبر قيمة عند الرؤوس: $F(6,0)=18$.', 'The largest value at the vertices: $F(6,0)=18$.'),
        isSolved: (state) => state.scenario === 0 && atOptimum(state)
    },
    {
        id: 144103,
        prompt: say('Kostuan, eraman zuzena eskualdea ukitzen duen lehen tokira: minimora.', 'En el coste, lleva la recta al primer punto en que toca la región: el mínimo.', 'في الكلفة حرّك المستقيم إلى أول نقطة يلمس فيها المنطقة: القيمة الصغرى.', 'In the cost, take the line to the first point where it touches the region: the minimum.'),
        hint: say('Eskualdea gorantz irekita dago; jatorriaren aldetik ixten da.', 'La región está abierta hacia arriba; se cierra por el lado del origen.', 'المنطقة مفتوحة إلى الأعلى؛ وتنغلق من جهة المبدأ.', 'The region is open upwards; it closes on the side of the origin.'),
        isSolved: (state) => state.scenario === 1 && atOptimum(state)
    },
    {
        id: 144104,
        prompt: say('Berdinketan, eraman zuzena maximora, eta iragarri non dagoen.', 'En el empate, lleva la recta al máximo y predice dónde está.', 'في التعادل حرّك المستقيم إلى القيمة العظمى وتوقّع أين هي.', 'In the tie, take the line to the maximum and predict where it is.'),
        hint: say('$x+y=k$ zuzena $x+y=6$ aldearen paraleloa da.', 'La recta $x+y=k$ es paralela al lado $x+y=6$.', 'المستقيم $x+y=k$ موازٍ للضلع $x+y=6$.', 'The line $x+y=k$ is parallel to the side $x+y=6$.'),
        isSolved: (state) => state.scenario === 2 && atOptimum(state) && state.prediction !== null
    },
    {
        id: 144105,
        prompt: say('Irabazian, jarri zuzena $(4,2)$ erpinetik pasatzeko.', 'En el beneficio, pon la recta para que pase por el vértice $(4,2)$.', 'في الربح ضع المستقيم ليمر بالرأس $(4,2)$.', 'In the profit, place the line so that it goes through the vertex $(4,2)$.'),
        hint: say('Kalkulatu $F(4,2)=3\\cdot 4+2\\cdot 2$.', 'Calcula $F(4,2)=3\\cdot 4+2\\cdot 2$.', 'احسب $F(4,2)=3\\cdot 4+2\\cdot 2$.', 'Work out $F(4,2)=3\\cdot 4+2\\cdot 2$.'),
        isSolved: (state) => state.scenario === 0 && state.k === 16
    }
]

/** Endless practice: put the level line through a given vertex */
const levelMaker: LabChallengeMaker<LevelState> = (random) => {
    const scenario = randomInt(random, 0, LEVEL_SCENARIOS.length - 1)
    const points = vertices(withSigns(LEVEL_SCENARIOS[scenario].constraints))
    const point = points[randomInt(random, 0, points.length - 1)]
    const k = objectiveValue(LEVEL_SCENARIOS[scenario].objective, point)
    const name = LEVEL_SCENARIOS[scenario].name
    return {
        prompt: say(`${name.eu}: jarri zuzena $(${point.join(',')})$ erpinetik pasatzeko.`, `${name.es}: pon la recta por el vértice $(${point.join(',')})$.`, `${name.ar}: ضع المستقيم ليمر بالرأس $(${point.join(',')})$.`, `${name.en}: put the line through the vertex $(${point.join(',')})$.`),
        hint: say('Kalkulatu $F$ erpin horretan.', 'Calcula $F$ en ese vértice.', 'احسب $F$ عند ذلك الرأس.', 'Work out $F$ at that vertex.'),
        isSolved: (state) => state.scenario === scenario && state.k === k,
        solution: { scenario, k, prediction: null }
    }
}

export const levelExtra = freshFrom(initialLevelState, levelMaker)
