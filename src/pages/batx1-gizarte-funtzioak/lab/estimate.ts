import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { same, say } from '../text.ts'

/* ==========================================================================
   L1 · Bi (edo hiru) datuen artean (Entre dos o tres datos): the data
   A(0, a), B(4, b) and, with three data, C(8, c), and a target x where a
   value is estimated. Before the estimate is drawn the learner predicts
   whether it is an interpolation (inside the data), a datum itself, or an
   extrapolation (outside). ▶ draws the line through A and B, or Newton's
   parabola through A, B and C, up to the target; with three data the line
   stays dashed so the two estimates can be compared.
   ========================================================================== */

export type EstimateMode = 'linear' | 'parabolic'

/** The x of the data: A, B and C */
export const DATA_X = [0, 4, 8] as const

export const ESTIMATE_LIMITS = { y: { min: 0, max: 12 }, target: { min: 0, max: 12 } } as const

export interface EstimateState {
    mode: EstimateMode
    a: number
    b: number
    c: number
    target: number
    prediction: Prediction | null
}

export const initialEstimateState: EstimateState = { mode: 'linear', a: 2, b: 4, c: 8, target: 2, prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export function setEstimate(state: EstimateState, patch: Partial<Omit<EstimateState, 'prediction'>>): EstimateState {
    const next = {
        mode: patch.mode ?? state.mode,
        a: clamp(patch.a ?? state.a, ESTIMATE_LIMITS.y.min, ESTIMATE_LIMITS.y.max),
        b: clamp(patch.b ?? state.b, ESTIMATE_LIMITS.y.min, ESTIMATE_LIMITS.y.max),
        c: clamp(patch.c ?? state.c, ESTIMATE_LIMITS.y.min, ESTIMATE_LIMITS.y.max),
        target: clamp(patch.target ?? state.target, ESTIMATE_LIMITS.target.min, ESTIMATE_LIMITS.target.max)
    }
    const same = next.mode === state.mode && next.a === state.a && next.b === state.b && next.c === state.c && next.target === state.target
    return { ...next, prediction: same ? state.prediction : null }
}

/** Slope of the line through A and B */
export const slopeOf = ({ a, b }: Pick<EstimateState, 'a' | 'b'>) => (b - a) / 4
/** Newton's second coefficient: f[A, B, C] */
export const curvatureOf = ({ a, b, c }: Pick<EstimateState, 'a' | 'b' | 'c'>) => ((c - b) / 4 - (b - a) / 4) / 8

export const lineAt = (state: Pick<EstimateState, 'a' | 'b'>, x: number) => state.a + slopeOf(state) * x
export const parabolaAt = (state: Pick<EstimateState, 'a' | 'b' | 'c'>, x: number) => lineAt(state, x) + curvatureOf(state) * x * (x - 4)

/** The estimate the tool draws at the target */
export const estimateOf = (state: EstimateState) => (state.mode === 'linear' ? lineAt(state, state.target) : parabolaAt(state, state.target))

/** Where the data end: x = 4 with two data, x = 8 with three */
export const dataEnd = (state: Pick<EstimateState, 'mode'>) => (state.mode === 'linear' ? 4 : 8)

/** Inside the data (<), a datum itself (=) or outside them (>) */
export function estimatePrediction(state: EstimateState): Prediction {
    const data = state.mode === 'linear' ? [0, 4] : [0, 4, 8]
    if (data.includes(state.target)) return '='
    return state.target < dataEnd(state) ? '<' : '>'
}

const near = (value: number, goal: number) => Math.abs(value - goal) < 1e-9

export const estimateChallenges: LabChallenge<EstimateState>[] = [
    {
        id: 133101,
        prompt: say('Bi daturekin, jarri helburua $x=2$ puntuan, eta lortu estimazioa 6 izatea.', 'Con dos datos, pon el objetivo en $x=2$ y consigue que la estimación sea 6.', 'ببيانتين، ضع الهدف عند $x=2$ واجعل التقدير 6.', 'With two data, put the target at $x=2$ and make the estimate 6.'),
        hint: say('$x=2$ puntua A eta B puntuen erdian dago: estimazioa haien batez bestekoa da.', '$x=2$ está a medio camino entre A y B: la estimación es su media.', '$x=2$ في منتصف المسافة بين A وB: التقدير هو متوسطهما.', '$x=2$ is halfway between A and B: the estimate is their mean.'),
        isSolved: (state) => state.mode === 'linear' && state.target === 2 && near(estimateOf(state), 6)
    },
    {
        id: 133102,
        prompt: say('Bi daturekin, egin estrapolazio bat: helburua datuetatik kanpo.', 'Con dos datos, haz una extrapolación: el objetivo fuera de los datos.', 'ببيانتين، قم باستقراء خارجي: الهدف خارج البيانات.', 'With two data, make an extrapolation: the target outside the data.'),
        hint: say('Datuak $x=0$ eta $x=4$ puntuetan daude.', 'Los datos están en $x=0$ y $x=4$.', 'البيانات عند $x=0$ و$x=4$.', 'The data are at $x=0$ and $x=4$.'),
        isSolved: (state) => state.mode === 'linear' && state.target > 4
    },
    {
        id: 133103,
        prompt: say('Bi daturekin, lortu zuzenak 10 estimatzea $x=8$ puntuan.', 'Con dos datos, consigue que la recta estime 10 en $x=8$.', 'ببيانتين، اجعل المستقيم يقدّر 10 عند $x=8$.', 'With two data, make the line estimate 10 at $x=8$.'),
        hint: say('$x=8$ puntua B puntutik 4 urrats harago dago: zuzenak beste horrenbeste igotzen du.', '$x=8$ está 4 pasos más allá de B: la recta sube otro tanto.', '$x=8$ تبعد 4 خطوات بعد B: يصعد المستقيم بالقدر نفسه مرة أخرى.', '$x=8$ is 4 steps beyond B: the line rises by the same amount again.'),
        isSolved: (state) => state.mode === 'linear' && state.target === 8 && near(estimateOf(state), 10)
    },
    {
        id: 133104,
        prompt: say('Hiru daturekin, jarri hirurak lerrokatuta: parabola zuzen bihurtzen da.', 'Con tres datos, pon los tres alineados: la parábola se convierte en recta.', 'بثلاث بيانات، ضعها على استقامة واحدة: يصبح القطع المكافئ مستقيمًا.', 'With three data, put all three in a line: the parabola turns into a line.'),
        hint: same('$b-a=c-b$'),
        isSolved: (state) => state.mode === 'parabolic' && state.b - state.a === state.c - state.b
    },
    {
        id: 133105,
        prompt: say('Hiru daturekin eta helburua $x=12$ puntuan, lortu parabolaren eta zuzenaren estimazioak 5 baino gehiago bereiztea.', 'Con tres datos y el objetivo en $x=12$, consigue que la parábola y la recta se diferencien en más de 5.', 'بثلاث بيانات والهدف عند $x=12$، اجعل تقديري القطع المكافئ والمستقيم يختلفان بأكثر من 5.', 'With three data and the target at $x=12$, make the parabola and the line differ by more than 5.'),
        hint: say('Kurbatu datuak: C puntua zuzenetik urrun.', 'Curva los datos: C lejos de la recta.', 'اجعل البيانات منحنية: C بعيدة عن المستقيم.', 'Make the data curve: C far from the line.'),
        isSolved: (state) => state.mode === 'parabolic' && state.target === 12 && Math.abs(parabolaAt(state, 12) - lineAt(state, 12)) > 5
    }
]

/** Endless practice: a line through A and B that gives a whole estimate at a target */
const estimateMaker: LabChallengeMaker<EstimateState> = (random) => {
    const a = randomInt(random, 0, 6)
    const target = randomInt(random, 1, 12)
    // B stays on the board and the estimate between 0 and 14
    const steps = [-1, 0, 1, 2].filter((step) => a + 4 * step >= 0 && a + 4 * step <= 12 && a + step * target >= 0 && a + step * target <= 14)
    const step = steps[randomInt(random, 0, steps.length - 1)]
    const b = a + 4 * step
    const value = a + step * target
    return {
        prompt: say(`Bi daturekin, lortu estimazioa ${value} izatea $x=${target}$ puntuan.`, `Con dos datos, consigue que la estimación sea ${value} en $x=${target}$.`, `ببيانتين، اجعل التقدير ${value} عند $x=${target}$.`, `With two data, make the estimate ${value} at $x=${target}$.`),
        hint: say('Aukeratu A eta B, eta egiaztatu zuzena $x$ helburuan.', 'Elige A y B, y mira la recta en el objetivo.', 'اختر A وB وانظر إلى المستقيم عند الهدف.', 'Choose A and B, and look at the line at the target.'),
        isSolved: (state) => state.mode === 'linear' && state.target === target && near(estimateOf(state), value),
        solution: { mode: 'linear', a, b, c: initialEstimateState.c, target, prediction: null }
    }
}

export const estimateExtra = freshFrom(initialEstimateState, estimateMaker)
