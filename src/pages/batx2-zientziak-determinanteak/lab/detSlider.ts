import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { det } from '../determinant.ts'

/* ==========================================================================
   L4 · Determinantearen graduatzailea (El deslizador del determinante):
   five 3 × 3 matrices with a parameter k. Moving k changes the matrix and
   |A(k)|, a polynomial in k drawn as a curve. Before |A| is shown, the
   learner predicts its sign: negative, 0 (no inverse) or positive. ▶
   traces the whole curve, so the values where it crosses or touches the
   axis — where A has no inverse — stand out. Exported (families, |A(k)|
   and its roots) for Sistemas, where the same values decide Rouché.
   ========================================================================== */

export interface DetFamily {
    rows: (k: number) => number[][]
    /** The matrix with the letter k, in LaTeX */
    latex: string
    /** |A(k)| factored, in LaTeX */
    detLatex: string
}

export const DET_FAMILIES: DetFamily[] = [
    { rows: (k) => [[k, 4, 1], [1, k, 2], [0, 0, 1]], latex: '\\begin{pmatrix}k&4&1\\\\1&k&2\\\\0&0&1\\end{pmatrix}', detLatex: 'k^2-4' },
    { rows: (k) => [[2, k, 1], [k, 2, 1], [1, 1, 1]], latex: '\\begin{pmatrix}2&k&1\\\\k&2&1\\\\1&1&1\\end{pmatrix}', detLatex: '-k^2+2k' },
    { rows: (k) => [[1, 0, k], [k, 1, 0], [0, k, 1]], latex: '\\begin{pmatrix}1&0&k\\\\k&1&0\\\\0&k&1\\end{pmatrix}', detLatex: 'k^3+1' },
    { rows: (k) => [[k, 2, 0], [2, k, 0], [0, 0, k - 1]], latex: '\\begin{pmatrix}k&2&0\\\\2&k&0\\\\0&0&k-1\\end{pmatrix}', detLatex: '(k^2-4)(k-1)' },
    { rows: (k) => [[1, 1, 1], [1, k, 1], [1, 1, k * k]], latex: '\\begin{pmatrix}1&1&1\\\\1&k&1\\\\1&1&k^2\\end{pmatrix}', detLatex: '(k-1)^2(k+1)' }
]
export const DET_NAMES = ['A', 'B', 'C', 'D', 'E'] as const
export const DET_LIMITS = { min: -3, max: 3 } as const
export const detValues = Array.from({ length: DET_LIMITS.max - DET_LIMITS.min + 1 }, (_, index) => DET_LIMITS.min + index)

export interface DetSliderState {
    family: number
    k: number
    prediction: Prediction | null
    /** The values of k whose |A| has been shown */
    seen: number[]
    /** ▶ has drawn the whole curve */
    traced: boolean
}

export const initialDetSliderState: DetSliderState = { family: 0, k: 0, prediction: null, seen: [], traced: false }

/** |A(k)| for a whole k, worked out exactly */
export function detAt(family: number, k: number): number {
    const value = det(DET_FAMILIES[family].rows(k))
    return value.numerator / value.denominator
}
/** |A(k)| for any real k, to draw the curve between the whole values */
export const detCurve = (family: number, k: number) => {
    const [[a, b, c], [d, e, f], [g, h, i]] = DET_FAMILIES[family].rows(k)
    return a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g)
}
export const currentDetValue = (state: Pick<DetSliderState, 'family' | 'k'>) => detAt(state.family, state.k)
export const detSliderPrediction = (state: DetSliderState): Prediction => compareTo(currentDetValue(state), 0)
/** The whole values of k (in the range) where A has no inverse */
export const rootsIn = (family: number) => detValues.filter((k) => detAt(family, k) === 0)

const clamp = (value: number) => Math.min(DET_LIMITS.max, Math.max(DET_LIMITS.min, Math.round(value)))

export const chooseDetFamily = (state: DetSliderState, family: number): DetSliderState =>
    family === state.family ? state : { family, k: state.k, prediction: null, seen: [], traced: false }
export const setK = (state: DetSliderState, k: number): DetSliderState => {
    const next = clamp(k)
    return next === state.k ? state : { ...state, k: next, prediction: null }
}
export const markDetSeen = (state: DetSliderState): DetSliderState => (state.seen.includes(state.k) ? state : { ...state, seen: [...state.seen, state.k] })
/** ▶ draws the curve and shows every whole k */
export const traceAll = (state: DetSliderState): DetSliderState => ({ ...state, seen: [...detValues], traced: true })

/* ---------- Challenges ---------- */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })

const noInverse = say('Bilatu $|A|=0$ egiten duen $k$: hor ez dago alderantzizkorik.', 'Busca la $k$ que hace $|A|=0$: ahí no hay inversa.', 'ابحث عن $k$ التي تجعل $|A|=0$: هناك لا يوجد معكوس.', 'Look for the $k$ that makes $|A|=0$: there is no inverse there.')

export const detSliderChallenges: LabChallenge<DetSliderState>[] = [
    { id: 117301, prompt: say('A familian, aurkitu alderantzizkorik gabeko $k$ balio bat.', 'En la familia A, encuentra un valor de $k$ sin inversa.', 'في العائلة A أوجد قيمة لـ $k$ دون معكوس.', 'In family A, find a value of $k$ with no inverse.'), hint: say('$|A|=k^2-4$', '$|A|=k^2-4$', '$|A|=k^2-4$', '$|A|=k^2-4$'), isSolved: (state) => state.family === 0 && currentDetValue(state) === 0 },
    { id: 117302, prompt: say('B familian, aurkitu alderantzizkorik gabeko $k$ balio positiboa.', 'En la familia B, encuentra el valor positivo de $k$ sin inversa.', 'في العائلة B أوجد القيمة الموجبة لـ $k$ دون معكوس.', 'In family B, find the positive value of $k$ with no inverse.'), hint: say('$|A|=k(2-k)$: bi erro ditu.', '$|A|=k(2-k)$: tiene dos raíces.', '$|A|=k(2-k)$: له جذران.', '$|A|=k(2-k)$: it has two roots.'), isSolved: (state) => state.family === 1 && state.k > 0 && currentDetValue(state) === 0 },
    { id: 117303, prompt: say('C familian, aurkitu alderantzizkorik ez duen $k$ bakarra.', 'En la familia C, encuentra la única $k$ sin inversa.', 'في العائلة C أوجد قيمة $k$ الوحيدة دون معكوس.', 'In family C, find the only $k$ with no inverse.'), hint: noInverse, isSolved: (state) => state.family === 2 && currentDetValue(state) === 0 },
    { id: 117304, prompt: say('D familian, aurkitu alderantzizkorik gabeko $k$ balio negatiboa.', 'En la familia D, encuentra el valor negativo de $k$ sin inversa.', 'في العائلة D أوجد القيمة السالبة لـ $k$ دون معكوس.', 'In family D, find the negative value of $k$ with no inverse.'), hint: say('Kurbak hiru aldiz mozten du ardatza.', 'La curva corta el eje tres veces.', 'المنحنى يقطع المحور ثلاث مرات.', 'The curve crosses the axis three times.'), isSolved: (state) => state.family === 3 && state.k < 0 && currentDetValue(state) === 0 },
    { id: 117305, prompt: say('E familian, aurkitu $|A|$ negatiboa egiten duen $k$ bat.', 'En la familia E, encuentra una $k$ con $|A|$ negativo.', 'في العائلة E أوجد قيمة لـ $k$ يكون فيها $|A|$ سالبًا.', 'In family E, find a $k$ with $|A|$ negative.'), hint: say('$k=1$ denean, kurbak ardatza ukitu besterik ez du egiten: begiratu $k=-1$ balioaren ezkerraldera.', 'En $k=1$ la curva solo toca el eje: mira a la izquierda de $k=-1$.', 'عند $k=1$ يلمس المنحنى المحور فقط: انظر إلى يسار $k=-1$.', 'At $k=1$ the curve only touches the axis: look to the left of $k=-1$.'), isSolved: (state) => state.family === 4 && currentDetValue(state) < 0 }
]

/** Endless practice: a k with no inverse, or a k that gives a value of |A| */
const detSliderMaker: LabChallengeMaker<DetSliderState> = (random) => {
    const family = randomInt(random, 0, DET_FAMILIES.length - 1)
    const name = DET_NAMES[family]
    if (randomInt(random, 0, 1) === 0) {
        const k = pick(random, rootsIn(family))
        return {
            prompt: say(`${name} familian, aurkitu alderantzizkorik gabeko $k$ bat.`, `En la familia ${name}, encuentra una $k$ sin inversa.`, `في العائلة ${name} أوجد قيمة لـ $k$ دون معكوس.`, `In family ${name}, find a $k$ with no inverse.`),
            hint: noInverse,
            isSolved: (state) => state.family === family && currentDetValue(state) === 0,
            solution: { family, k, prediction: null, seen: [], traced: false }
        }
    }
    const k = pick(random, detValues.filter((value) => detAt(family, value) !== 0))
    const target = detAt(family, k)
    return {
        prompt: say(`${name} familian, lortu $|A|=${target}$.`, `En la familia ${name}, consigue $|A|=${target}$.`, `في العائلة ${name} احصل على $|A|=${target}$.`, `In family ${name}, get $|A|=${target}$.`),
        hint: say(`$|A|=${DET_FAMILIES[family].detLatex}$`, `$|A|=${DET_FAMILIES[family].detLatex}$`, `$|A|=${DET_FAMILIES[family].detLatex}$`, `$|A|=${DET_FAMILIES[family].detLatex}$`),
        isSolved: (state) => state.family === family && currentDetValue(state) === target,
        solution: { family, k, prediction: null, seen: [], traced: false }
    }
}

export const detSliderExtra = freshFrom(initialDetSliderState, detSliderMaker)
