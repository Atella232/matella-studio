import { pick } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { deviationProducts, pairStats, type Pair } from '../bivariate.ts'

/* ==========================================================================
   L1 · Lau koadranteak (Los cuatro cuadrantes): five points on a grid
   0–8 × 0–8. The centre of gravity splits the board into four quadrants;
   each point draws the rectangle (x − x̄)(y − ȳ), green when it adds and
   coral when it subtracts. Before the rectangles and σxy are shown, the
   learner predicts the sign of the covariance. Moving a point moves the
   centre too, so every rectangle changes. Pure logic.
   ========================================================================== */

export interface QuadrantState {
    points: Pair[]
    /** The point that the steppers move */
    selected: number
    prediction: Prediction | null
}

export const QUADRANT_LIMITS = { min: 0, max: 8 } as const
export const POINT_COUNT = 5

/** The points of the lesson: centre (3, 4), products 4, 1, 0, 1 and 6 */
export const initialQuadrantState: QuadrantState = { points: [[1, 2], [2, 3], [3, 3], [4, 5], [5, 7]], selected: 0, prediction: null }

const clamp = (value: number) => Math.min(QUADRANT_LIMITS.max, Math.max(QUADRANT_LIMITS.min, Math.round(value)))

export function movePoint(state: QuadrantState, index: number, point: Pair): QuadrantState {
    const next: Pair = [clamp(point[0]), clamp(point[1])]
    const current = state.points[index]
    if (next[0] === current[0] && next[1] === current[1]) return { ...state, selected: index }
    return { ...state, selected: index, points: state.points.map((item, position) => (position === index ? next : item)), prediction: null }
}

export const selectPoint = (state: QuadrantState, selected: number): QuadrantState => ({ ...state, selected })

export const quadrantStats = (state: QuadrantState) => pairStats(state.points)
export const quadrantProducts = (state: QuadrantState) => deviationProducts(state.points)
/** Σ (x − x̄)(y − ȳ), rounded to the hundredths that five points can give */
export const productSum = (state: QuadrantState) => Math.round(quadrantProducts(state).reduce((total, value) => total + value, 0) * 100) / 100

/** The sign of the covariance: negative (<), zero (=) or positive (>) */
export const quadrantPrediction = (state: QuadrantState): Prediction => compareTo(Math.round(quadrantStats(state).cxy * 1e6) / 1e6, 0)

/** The quadrant of each point, I to IV, or 0 when it is on one of the two centre lines */
export function quadrantOf(state: QuadrantState, index: number): 0 | 1 | 2 | 3 | 4 {
    const { mx, my } = quadrantStats(state)
    const [x, y] = state.points[index]
    const dx = Math.round((x - mx) * 1e6)
    const dy = Math.round((y - my) * 1e6)
    if (dx === 0 || dy === 0) return 0
    return dx > 0 ? (dy > 0 ? 1 : 4) : dy > 0 ? 2 : 3
}

const covarianceIs = (state: QuadrantState, value: number) => Math.abs(quadrantStats(state).cxy - value) < 1e-9

/* ---------- Challenges ---------- */

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })

export const quadrantChallenges: LabChallenge<QuadrantState>[] = [
    { id: 115101, prompt: say('Egin kobariantza negatiboa izatea.', 'Haz que la covarianza sea negativa.', 'اجعل التغاير سالبًا.', 'Make the covariance negative.'), hint: say('Eraman puntuak II eta IV koadranteetara: goian ezkerrean eta behean eskuinean.', 'Lleva puntos a los cuadrantes II y IV: arriba a la izquierda y abajo a la derecha.', 'انقل نقاطًا إلى الربعين II وIV: في الأعلى يسارًا وفي الأسفل يمينًا.', 'Move points into quadrants II and IV: up on the left and down on the right.'), isSolved: (state) => quadrantStats(state).cxy < -1e-9 },
    { id: 115102, prompt: say('Egin kobariantza 0 izatea, koadrante bakoitzean puntu bat gutxienez dagoela.', 'Haz que la covarianza sea 0 con al menos un punto en cada cuadrante.', 'اجعل التغاير 0 مع نقطة واحدة على الأقل في كل ربع.', 'Make the covariance 0 with at least one point in each quadrant.'), hint: say('Puntuak simetrikoki jarri: laukizuzen berdeek eta koralek azalera bera izan behar dute.', 'Coloca los puntos en simetría: los rectángulos verdes y los corales tienen que sumar la misma área.', 'ضع النقاط متناظرة: يجب أن تتساوى مساحة المستطيلات الخضراء والمرجانية.', 'Place the points symmetrically: the green and the coral rectangles must add up to the same area.'), isSolved: (state) => covarianceIs(state, 0) && [1, 2, 3, 4].every((quadrant) => state.points.some((_, index) => quadrantOf(state, index) === quadrant)) },
    { id: 115103, prompt: say('Egin $\\sigma_{xy}=4$ izatea.', 'Haz que $\\sigma_{xy}=4$.', 'اجعل $\\sigma_{xy}=4$.', 'Make $\\sigma_{xy}=4$.'), hint: say('Bost puntu daudenez, laukizuzenek 20 batu behar dute: $\\frac{20}{5}=4$.', 'Como hay cinco puntos, los rectángulos tienen que sumar 20: $\\frac{20}{5}=4$.', 'بما أن هناك خمس نقاط فيجب أن تكون مساحات المستطيلات 20: $\\frac{20}{5}=4$.', 'As there are five points, the rectangles must add up to 20: $\\frac{20}{5}=4$.'), isSolved: (state) => covarianceIs(state, 4) }
]

/** The deviations of the five points around the centre (4, 4): Σ dx = 0 and Σ dx² = 10 */
const DX = [-2, -1, 0, 1, 2]
/** A pattern with Σ = 0 and Σ dx·dy = 5: it adds 1 to σxy */
const ODD = [-1, -1, 1, 0, 1]

/** Endless practice: a covariance to reach, from −3 to 3 */
const quadrantMaker: LabChallengeMaker<QuadrantState> = (random) => {
    const target = pick(random, [-3, -2, -1, 1, 2, 3])
    // σxy = (Σ dx·dy) / 5: dy = s·dx gives 2s, and the ODD pattern adds 1
    const slope = Math.floor(target / 2)
    const odd = target % 2 !== 0 ? 1 : 0
    const points = DX.map((dx, index) => [4 + dx, 4 + slope * dx + odd * ODD[index]] as Pair)
    const shuffled = [...points].sort(() => random() - 0.5)
    const solution: QuadrantState = { points: shuffled, selected: 0, prediction: null }
    const sum = 5 * target
    return {
        prompt: say(`Egin $\\sigma_{xy}=${target}$ izatea.`, `Haz que $\\sigma_{xy}=${target}$.`, `اجعل $\\sigma_{xy}=${target}$.`, `Make $\\sigma_{xy}=${target}$.`),
        hint: say(`Laukizuzenek, zeinuarekin, ${sum} batu behar dute: $\\frac{${sum}}{5}=${target}$.`, `Los rectángulos, con su signo, tienen que sumar ${sum}: $\\frac{${sum}}{5}=${target}$.`, `يجب أن يكون مجموع المستطيلات بإشاراتها ${sum}: $\\frac{${sum}}{5}=${target}$.`, `The rectangles, with their signs, must add up to ${sum}: $\\frac{${sum}}{5}=${target}$.`),
        isSolved: (state) => covarianceIs(state, target),
        solution
    }
}

export const quadrantExtra = freshFrom(initialQuadrantState, quadrantMaker)
