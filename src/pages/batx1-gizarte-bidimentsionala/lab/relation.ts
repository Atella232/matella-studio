import { pick } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { pairStats, type Pair } from '../../batx1-zientziak-bidimentsionala/bivariate.ts'
import { CLOUD_NOISE, CLOUD_X } from '../data.ts'

/* ==========================================================================
   L1 · Funtzionala ala estatistikoa? (¿Funcional o estadística?): ten
   points around a straight line. The learner chooses whether the line
   rises, is flat or falls, and how much the points move away from it (the
   «noise», a fixed pattern with mean 0 and no relation to x, scaled). With
   no noise the relation is functional (|r| = 1); the more noise, the
   smaller |r|. Before seeing r, the learner predicts: weak statistical,
   functional or strong statistical (|r| ≥ 0,8). Pure logic.
   ========================================================================== */

export const RELATION_LIMITS = { slope: { min: -2, max: 2 }, noise: { min: 0, max: 6 } }

export interface RelationState {
    /** The slope of the line in halves: −2 → −1, … 2 → 1 */
    slope: number
    /** The size of the noise in halves: 0 → none, 6 → 3 */
    noise: number
    prediction: Prediction | null
}

export const initialRelationState: RelationState = { slope: 1, noise: 4, prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export function setRelation(state: RelationState, change: Partial<Pick<RelationState, 'slope' | 'noise'>>): RelationState {
    const slope = clamp(change.slope ?? state.slope, RELATION_LIMITS.slope.min, RELATION_LIMITS.slope.max)
    const noise = clamp(change.noise ?? state.noise, RELATION_LIMITS.noise.min, RELATION_LIMITS.noise.max)
    return slope === state.slope && noise === state.noise ? state : { slope, noise, prediction: null }
}

/** The ten points: y = 5 + b·(x − 5,5) + k·noise */
export function relationPoints(state: Pick<RelationState, 'slope' | 'noise'>): Pair[] {
    const b = state.slope / 2
    const k = state.noise / 2
    return CLOUD_X.map((x, index): Pair => [x, 5 + b * (x - 5.5) + k * CLOUD_NOISE[index]])
}

export const relationR = (state: Pick<RelationState, 'slope' | 'noise'>) => pairStats(relationPoints(state)).r

/** Functional (=) with no noise; strong (>) with |r| ≥ 0,8; weak (<) otherwise */
export function relationPrediction(state: Pick<RelationState, 'slope' | 'noise'>): Prediction {
    if (state.noise === 0) return '='
    return Math.abs(relationR(state)) >= 0.8 - 1e-9 ? '>' : '<'
}

/** r for LaTeX with two decimals: 0{,}56, -0{,}93, 1 */
export function rLatex(value: number): string {
    const rounded = Math.round(value * 100) / 100
    return String(rounded === 0 ? 0 : rounded).replace('.', '{,}')
}

/* ---------- Challenges ---------- */

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })

export const relationChallenges: LabChallenge<RelationState>[] = [
    {
        id: 138101,
        prompt: say('Egin beherantz doan erlazio funtzional bat.', 'Haz una relación funcional que baje.', 'اصنع علاقة دالية هابطة.', 'Make a functional relation that falls.'),
        hint: say('Funtzionala: puntu guztiak zuzenaren gainean, zaratarik gabe.', 'Funcional: todos los puntos sobre la recta, sin ruido.', 'دالية: كل النقاط على المستقيم بلا تشويش.', 'Functional: all the points on the line, with no noise.'),
        isSolved: (state) => state.noise === 0 && state.slope < 0
    },
    {
        id: 138102,
        prompt: say('Lortu korrelazio positibo sendoa, baina ez funtzionala: $0{,}8\\le r<1$.', 'Consigue una correlación positiva fuerte pero no funcional: $0{,}8\\le r<1$.', 'احصل على ارتباط موجب قوي غير دالي: $0{,}8\\le r<1$.', 'Get a strong positive correlation that is not functional: $0{,}8\\le r<1$.'),
        hint: say('Zuzena gora, eta zarata pixka bat bakarrik.', 'Recta que sube y solo un poco de ruido.', 'مستقيم صاعد وقليل من التشويش فقط.', 'A rising line and only a little noise.'),
        isSolved: (state) => state.noise > 0 && relationR(state) >= 0.8 - 1e-9
    },
    {
        id: 138103,
        prompt: say('Egin korrelazio linealik ez egotea, puntuak sakabanatuta egonda ere: $r=0$.', 'Haz que no haya correlación lineal aunque los puntos estén dispersos: $r=0$.', 'اجعل الارتباط الخطي منعدمًا مع أن النقاط متفرقة: $r=0$.', 'Make there be no linear correlation even though the points are spread out: $r=0$.'),
        hint: say('Zuzen laua, eta zarata.', 'Una recta plana, y ruido.', 'مستقيم أفقي مع تشويش.', 'A flat line, and noise.'),
        isSolved: (state) => state.noise > 0 && state.slope === 0
    }
]

/** Endless practice: get the r of a cloud that the maker builds */
const relationMaker: LabChallengeMaker<RelationState> = (random) => {
    const slope = pick(random, [-2, -1, 1, 2])
    const noise = pick(random, [1, 2, 3, 4, 5, 6])
    const target = rLatex(relationR({ slope, noise }))
    const value = Number(target.replace('{,}', '.'))
    return {
        prompt: say(`Lortu $r\\approx ${target}$.`, `Consigue $r\\approx ${target}$.`, `احصل على $r\\approx ${target}$.`, `Get $r\\approx ${target}$.`),
        hint: say('Zeinuak noranzkoa ematen du; zaratak, $|r|$ zenbat jaisten den.', 'El signo lo da el sentido; el ruido, cuánto baja $|r|$.', 'الإشارة يحددها الاتجاه، والتشويش يحدد مقدار نزول $|r|$.', 'The sign comes from the direction; the noise, from how far $|r|$ drops.'),
        isSolved: (state) => state.noise > 0 && Math.abs(Math.round(relationR(state) * 100) / 100 - value) < 1e-9,
        solution: { slope, noise, prediction: null }
    }
}

export const relationExtra = freshFrom(initialRelationState, relationMaker)
