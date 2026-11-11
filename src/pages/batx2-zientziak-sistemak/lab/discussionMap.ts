import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { classify, detValue, type SystemKind } from '../system.ts'
import { KIND_GOALS, KIND_PREDICTION } from './roucheLight.ts'

/* ==========================================================================
   L3 · Eztabaidaren mapa (El mapa de la discusión): four systems with a
   parameter a. Moving a changes A and A*; before the type is shown, the
   learner predicts it. Each value seen is painted on a strip (green
   independent, amber dependent, red inconsistent); ▶ paints them all, so
   the critical values — the roots of |A| — stand out with their type.
   Exported for the games and for 2.º Ciencias Sociales.
   ========================================================================== */

export interface DiscussionFamily {
    rows: (a: number) => number[][]
    b: (a: number) => number[]
    /** The system with the letter a, in LaTeX */
    latex: string
}

export const DISCUSSION_FAMILIES: DiscussionFamily[] = [
    { rows: (a) => [[1, 1, a], [1, a, 1], [a, 1, 1]], b: () => [1, 1, 1], latex: '\\begin{cases}x+y+az=1\\\\ x+ay+z=1\\\\ ax+y+z=1\\end{cases}' },
    { rows: (a) => [[a, 1, 1], [1, a, 1], [1, 1, a]], b: () => [1, 1, 1], latex: '\\begin{cases}ax+y+z=1\\\\ x+ay+z=1\\\\ x+y+az=1\\end{cases}' },
    { rows: (a) => [[1, 1, 1], [1, 2, 3], [2, 3, a]], b: () => [1, 2, 3], latex: '\\begin{cases}x+y+z=1\\\\ x+2y+3z=2\\\\ 2x+3y+az=3\\end{cases}' },
    { rows: (a) => [[a, 1], [4, a]], b: () => [2, 4], latex: '\\begin{cases}ax+y=2\\\\ 4x+ay=4\\end{cases}' }
]
export const DISCUSSION_NAMES = ['A', 'B', 'C', 'D'] as const
export const A_LIMITS = { min: -4, max: 4 } as const
export const aValues = Array.from({ length: A_LIMITS.max - A_LIMITS.min + 1 }, (_, index) => A_LIMITS.min + index)

export interface DiscussionState {
    family: number
    a: number
    prediction: Prediction | null
    /** The values of a whose type has been shown */
    seen: number[]
}

export const initialDiscussionState: DiscussionState = { family: 0, a: 0, prediction: null, seen: [] }

export const kindAt = (family: number, a: number): SystemKind => classify(DISCUSSION_FAMILIES[family].rows(a), DISCUSSION_FAMILIES[family].b(a)).kind
export const detAt = (family: number, a: number) => detValue(DISCUSSION_FAMILIES[family].rows(a))
export const currentKind = (state: Pick<DiscussionState, 'family' | 'a'>) => kindAt(state.family, state.a)
export const discussionPrediction = (state: DiscussionState): Prediction => KIND_PREDICTION[currentKind(state)]
/** The critical values in the range: the roots of |A| */
export const criticalValues = (family: number) => aValues.filter((a) => detAt(family, a) === 0)

export const chooseFamily = (state: DiscussionState, family: number): DiscussionState => (family === state.family ? state : { family, a: state.a, prediction: null, seen: [] })
export function setA(state: DiscussionState, a: number): DiscussionState {
    const next = Math.min(A_LIMITS.max, Math.max(A_LIMITS.min, Math.round(a)))
    return next === state.a ? state : { ...state, a: next, prediction: null }
}
export const markSeen = (state: DiscussionState): DiscussionState => (state.seen.includes(state.a) ? state : { ...state, seen: [...state.seen, state.a] })
export const seeAll = (state: DiscussionState): DiscussionState => ({ ...state, seen: [...aValues] })

/* ---------- Challenges ---------- */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const find = (name: string, kind: SystemKind) => say(`${name} familian, aurkitu sistema ${KIND_GOALS[kind].eu} egiten duen $a$.`, `En la familia ${name}, encuentra una $a$ con el sistema ${KIND_GOALS[kind].es}.`, `في العائلة ${name} أوجد قيمة لـ $a$ يكون فيها النظام ${KIND_GOALS[kind].ar}.`, `In family ${name}, find an $a$ with the system ${KIND_GOALS[kind].en}.`)

export const discussionChallenges: LabChallenge<DiscussionState>[] = [
    { id: 118301, prompt: find('A', 'inconsistent'), hint: say('$|A|=-(a-1)^2(a+2)$: probatu erroak.', '$|A|=-(a-1)^2(a+2)$: prueba las raíces.', '$|A|=-(a-1)^2(a+2)$: جرّب الجذور.', '$|A|=-(a-1)^2(a+2)$: try the roots.'), isSolved: (state) => state.family === 0 && currentKind(state) === 'inconsistent' },
    { id: 118302, prompt: find('A', 'indeterminate'), hint: say('Hiru ekuazioak berdinak dira $a$ balio batekin.', 'Con un valor de $a$ las tres ecuaciones son iguales.', 'مع قيمة لـ $a$ تتساوى المعادلات الثلاث.', 'For one value of $a$ the three equations are equal.'), isSolved: (state) => state.family === 0 && currentKind(state) === 'indeterminate' },
    { id: 118303, prompt: find('B', 'inconsistent'), hint: say('Batu hiru ekuazioak: koefizienteak 0 dira $a=-2$ denean.', 'Suma las tres ecuaciones: los coeficientes se anulan con $a=-2$.', 'اجمع المعادلات الثلاث: تنعدم المعاملات مع $a=-2$.', 'Add the three equations: the coefficients vanish with $a=-2$.'), isSolved: (state) => state.family === 1 && currentKind(state) === 'inconsistent' },
    { id: 118304, prompt: find('C', 'indeterminate'), hint: say('$|A|=a-4$; begiratu $E_1+E_2$.', '$|A|=a-4$; mira $E_1+E_2$.', '$|A|=a-4$؛ انظر إلى $E_1+E_2$.', '$|A|=a-4$; look at $E_1+E_2$.'), isSolved: (state) => state.family === 2 && currentKind(state) === 'indeterminate' },
    { id: 118305, prompt: find('D', 'indeterminate'), hint: say('$|A|=a^2-4$: bi erro, mota desberdinekoak.', '$|A|=a^2-4$: dos raíces, de tipos distintos.', '$|A|=a^2-4$: جذران من نوعين مختلفين.', '$|A|=a^2-4$: two roots, of different types.'), isSolved: (state) => state.family === 3 && currentKind(state) === 'indeterminate' }
]

/** Endless practice: a family and a type it has for some a */
const discussionMaker: LabChallengeMaker<DiscussionState> = (random) => {
    for (;;) {
        const family = randomInt(random, 0, DISCUSSION_FAMILIES.length - 1)
        const kind = pick(random, ['inconsistent', 'indeterminate', 'determined'] as SystemKind[])
        const values = aValues.filter((a) => kindAt(family, a) === kind)
        if (!values.length) continue
        return {
            prompt: find(DISCUSSION_NAMES[family], kind),
            hint: say('Lehenik, $|A|=0$ egiten duten balioak; gero, heinak.', 'Primero, los valores que anulan $|A|$; después, los rangos.', 'أولًا القيم التي تعدم $|A|$، ثم الرتب.', 'First, the values that make $|A|$ zero; then, the ranks.'),
            isSolved: (state) => state.family === family && currentKind(state) === kind,
            solution: { family, a: pick(random, values), prediction: null, seen: [] }
        }
    }
}

export const discussionExtra = freshFrom(initialDiscussionState, discussionMaker)
