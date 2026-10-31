import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from './prediction.ts'

/* ==========================================================================
   L2 · Ardatz engainagarria (El eje engañoso): two bars, A and B, with a
   fixed pair of values. The learner moves where the vertical axis starts;
   the true ratio B ÷ A never changes, but the ratio of the drawn heights
   does. First a guess: will B look less than, exactly or more than twice
   as tall as A? ▶ slides the axis from 0 to the chosen start.
   ========================================================================== */

export const AXIS_SETS: Array<[number, number]> = [[60, 80], [45, 50], [20, 30]]
export const AXIS_STEP = 5

export interface AxisState {
    set: number
    start: number
    prediction: Prediction | null
}

export const initialAxisState: AxisState = { set: 0, start: 0, prediction: null }

export const axisMax = (set: number) => AXIS_SETS[set][0] - AXIS_STEP

export function setAxis(state: AxisState, patch: Partial<Pick<AxisState, 'set' | 'start'>>): AxisState {
    const set = Math.min(AXIS_SETS.length - 1, Math.max(0, Math.round(patch.set ?? state.set)))
    const start = Math.min(axisMax(set), Math.max(0, Math.round((patch.start ?? state.start) / AXIS_STEP) * AXIS_STEP))
    return { set, start, prediction: set === state.set && start === state.start ? state.prediction : null }
}

/** How many times taller B looks than A, with the axis starting at `start` */
export const lookRatio = ({ set, start }: Pick<AxisState, 'set' | 'start'>) => (AXIS_SETS[set][1] - start) / (AXIS_SETS[set][0] - start)
export const trueRatio = ({ set }: Pick<AxisState, 'set'>) => AXIS_SETS[set][1] / AXIS_SETS[set][0]
/** B looks less than (<), exactly (=) or more than (>) twice as tall as A? */
export const axisPrediction = (state: AxisState): Prediction => compareTo(lookRatio(state), 2)

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const pair = (set: number) => `A=${AXIS_SETS[set][0]},\\ B=${AXIS_SETS[set][1]}`
const lookTimes = (set: number, times: number) => say(
    `$${pair(set)}$: egin B-k A baino ${times} aldiz altuagoa dirudien.`,
    `$${pair(set)}$: haz que B parezca ${times} veces más alta que A.`,
    `$${pair(set)}$: اجعل B يبدو أعلى من A بـ$${times}$ مرات.`,
    `$${pair(set)}$: make B look ${times} times as tall as A.`
)
const timesHint = (set: number, times: number) => {
    const [a, b] = AXIS_SETS[set]
    const latex = `${b}-s=${times}\\cdot(${a}-s)`
    return say(`$${latex}$`, `$${latex}$`, `$${latex}$`, `$${latex}$`)
}
const looks = (set: number, times: number) => (state: AxisState) => state.set === set && Math.abs(lookRatio(state) - times) < 1e-9

export const axisChallenges: LabChallenge<AxisState>[] = [
    { id: 56201, prompt: lookTimes(0, 3), hint: timesHint(0, 3), isSolved: looks(0, 3) },
    { id: 56202, prompt: lookTimes(1, 2), hint: timesHint(1, 2), isSolved: looks(1, 2) },
    { id: 56203, prompt: say(`$${pair(1)}$: egin grafiko zintzo bat, ardatza 0-tik hasita.`, `$${pair(1)}$: haz un gráfico honrado, con el eje empezando en 0.`, `$${pair(1)}$: اصنع مخططًا صادقًا يبدأ محوره من $0$.`, `$${pair(1)}$: make an honest chart, with the axis starting at 0.`), hint: say('Ardatza 0-tik hasten denean, altuerak benetako balioak dira.', 'Cuando el eje empieza en 0, las alturas son los valores reales.', 'عندما يبدأ المحور من $0$ تكون الارتفاعات هي القيم الحقيقية.', 'When the axis starts at 0, the heights are the true values.'), isSolved: (state) => state.set === 1 && state.start === 0 },
    { id: 56204, prompt: lookTimes(2, 2), hint: timesHint(2, 2), isSolved: looks(2, 2) },
    { id: 56205, prompt: lookTimes(0, 5), hint: timesHint(0, 5), isSolved: looks(0, 5) }
]

/** Endless practice: a start that makes B look a whole number of times as tall */
const axisMaker: LabChallengeMaker<AxisState> = (random) => {
    for (;;) {
        const set = pick(random, [0, 1, 2])
        const start = randomInt(random, 1, axisMax(set) / AXIS_STEP) * AXIS_STEP
        const times = lookRatio({ set, start })
        if (!Number.isInteger(times) || times < 2) continue
        return { prompt: lookTimes(set, times), hint: timesHint(set, times), isSolved: looks(set, times), solution: { set, start, prediction: null } }
    }
}

export const axisExtra = freshFrom(initialAxisState, axisMaker)
