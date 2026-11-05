import { pick } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { say } from '../text.ts'

/* ==========================================================================
   L2 · Soluzioek birak ematen dituzte (Las soluciones dan vueltas): the
   equation sen(n·x) = k or cos(n·x) = k, with n = 1, 2 or 3 and k one of
   the notable values (or ±3/2, which no sine reaches). The angle u = n·x
   goes round the circle n times while x goes from 0° to 360°: each turn
   gives the one or two angles with that ratio, so there are 0, n or 2n
   solutions. The learner first predicts whether there are fewer than 2,
   2 or more; then the solutions are drawn on a ruler of x. Pure logic.
   ========================================================================== */

export type SpinRatio = 'sin' | 'cos'

/** The values of k: their LaTeX and, for the sine and the cosine, the angles of one turn with that value */
export const SPIN_VALUES: Array<{ latex: string; value: number; sin: number[]; cos: number[] }> = [
    { latex: '-\\frac{3}{2}', value: -1.5, sin: [], cos: [] },
    { latex: '-1', value: -1, sin: [270], cos: [180] },
    { latex: '-\\frac{\\sqrt{3}}{2}', value: -Math.sqrt(3) / 2, sin: [240, 300], cos: [150, 210] },
    { latex: '-\\frac{\\sqrt{2}}{2}', value: -Math.sqrt(2) / 2, sin: [225, 315], cos: [135, 225] },
    { latex: '-\\frac{1}{2}', value: -0.5, sin: [210, 330], cos: [120, 240] },
    { latex: '0', value: 0, sin: [0, 180], cos: [90, 270] },
    { latex: '\\frac{1}{2}', value: 0.5, sin: [30, 150], cos: [60, 300] },
    { latex: '\\frac{\\sqrt{2}}{2}', value: Math.sqrt(2) / 2, sin: [45, 135], cos: [45, 315] },
    { latex: '\\frac{\\sqrt{3}}{2}', value: Math.sqrt(3) / 2, sin: [60, 120], cos: [30, 330] },
    { latex: '1', value: 1, sin: [90], cos: [0] },
    { latex: '\\frac{3}{2}', value: 1.5, sin: [], cos: [] }
]

/** The plain-text value of k, for the board: −√3/2, 1/2 */
export const spinPlain = (index: number) => SPIN_VALUES[index].latex
    .replace(/\\sqrt\{(\d+)\}/g, '√$1')
    .replace(/\\frac\{([^{}]+)\}\{(\d+)\}/g, '$1/$2')
    .replace(/^-/, '−')

export interface SpinState {
    ratio: SpinRatio
    n: number
    k: number
    prediction: Prediction | null
}

export const SPIN_LIMITS = { n: { min: 1, max: 3 }, k: { min: 0, max: SPIN_VALUES.length - 1 } }

export const initialSpinState: SpinState = { ratio: 'sin', n: 1, k: 6, prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export function setSpin(state: SpinState, patch: Partial<Omit<SpinState, 'prediction'>>): SpinState {
    const next = {
        ratio: patch.ratio ?? state.ratio,
        n: clamp(patch.n ?? state.n, SPIN_LIMITS.n.min, SPIN_LIMITS.n.max),
        k: clamp(patch.k ?? state.k, SPIN_LIMITS.k.min, SPIN_LIMITS.k.max)
    }
    const same = next.ratio === state.ratio && next.n === state.n && next.k === state.k
    return { ...next, prediction: same ? state.prediction : null }
}

/** The angles u = n·x of one turn with that ratio */
export const spinBase = ({ ratio, k }: Pick<SpinState, 'ratio' | 'k'>) => SPIN_VALUES[k][ratio]

/** The solutions x between 0° (included) and 360° (not included), from smallest to largest */
export function spinSolutions({ ratio, n, k }: Pick<SpinState, 'ratio' | 'n' | 'k'>): number[] {
    const found: number[] = []
    for (const u of SPIN_VALUES[k][ratio]) for (let turn = 0; turn < n; turn++) found.push((u + 360 * turn) / n)
    return found.sort((a, b) => a - b)
}

export const spinCount = (state: Pick<SpinState, 'ratio' | 'n' | 'k'>) => spinSolutions(state).length
/** Fewer than 2 solutions (<), exactly 2 (=) or more (>) */
export const spinPrediction = (state: SpinState): Prediction => compareTo(spinCount(state), 2)

export const spinChallenges: LabChallenge<SpinState>[] = [
    { id: 103201, prompt: say('Lortu 0°-tik 360°-ra 6 soluzio dituen ekuazio bat.', 'Consigue una ecuación con 6 soluciones entre 0° y 360°.', 'احصل على معادلة لها 6 حلول بين 0° و360°.', 'Make an equation with 6 solutions between 0° and 360°.'), hint: say('Bira bakoitzean bi soluzio gehienez: zenbat bira behar dira?', 'Cada vuelta da como mucho dos soluciones: ¿cuántas vueltas hacen falta?', 'كل دورة تعطي حلين على الأكثر: كم دورة نحتاج؟', 'Each turn gives at most two solutions: how many turns do you need?'), isSolved: (state) => spinCount(state) === 6 },
    { id: 103202, prompt: say('Sinuarekin, lortu soluzio bakarra.', 'Con el seno, consigue una sola solución.', 'مع الجيب احصل على حل واحد فقط.', 'With the sine, get a single solution.'), hint: say('Sinua behin bakarrik da 1 eta behin bakarrik $-1$ bira bakoitzean.', 'El seno vale 1 una sola vez por vuelta, y $-1$ también.', 'يساوي الجيب 1 مرة واحدة في كل دورة، وكذلك $-1$.', 'The sine is 1 only once per turn, and so is $-1$.'), isSolved: (state) => state.ratio === 'sin' && spinCount(state) === 1 },
    { id: 103203, prompt: say('Egin ekuazioak soluziorik ez izatea.', 'Haz que la ecuación no tenga solución.', 'اجعل المعادلة بلا حل.', 'Make the equation have no solution.'), hint: say('Ez dago 1 baino gehiago balio duen sinu edo kosinurik.', 'Ningún seno ni coseno vale más de 1.', 'لا يوجد جيب ولا جيب تمام أكبر من 1.', 'No sine or cosine is greater than 1.'), isSolved: (state) => spinCount(state) === 0 },
    { id: 103204, prompt: say('$\\cos 2x$ adierazpenarekin, lortu zehazki 2 soluzio.', 'Con $\\cos 2x$, consigue exactamente 2 soluciones.', 'مع $\\cos 2x$ احصل على حلين بالضبط.', 'With $\\cos 2x$, get exactly 2 solutions.'), hint: say('$2x$ angeluak bi bira ematen ditu: balio batek bira bakoitzean soluzio bakarra eman behar du.', 'El ángulo $2x$ da dos vueltas: el valor tiene que dar una sola solución en cada vuelta.', 'تدور الزاوية $2x$ دورتين: يجب أن تعطي القيمة حلًّا واحدًا في كل دورة.', 'The angle $2x$ makes two turns: the value must give a single solution in each turn.'), isSolved: (state) => state.ratio === 'cos' && state.n === 2 && spinCount(state) === 2 },
    { id: 103205, prompt: say('Kosinuarekin eta $n=3$ izanik, lortu 3 soluzio.', 'Con el coseno y $n=3$, consigue 3 soluciones.', 'مع جيب التمام و$n=3$ احصل على 3 حلول.', 'With the cosine and $n=3$, get 3 solutions.'), hint: say('Bira bakoitzean soluzio bakarra: $k=1$ edo $k=-1$.', 'Una sola solución por vuelta: $k=1$ o $k=-1$.', 'حل واحد في كل دورة: $k=1$ أو $k=-1$.', 'A single solution per turn: $k=1$ or $k=-1$.'), isSolved: (state) => state.ratio === 'cos' && state.n === 3 && spinCount(state) === 3 }
]

const NAMES = {
    sin: say('sinuarekin', 'el seno', 'الجيب', 'the sine'),
    cos: say('kosinuarekin', 'el coseno', 'جيب التمام', 'the cosine')
}

/** Endless practice: with a ratio and n given, choose k for 0, n or 2n solutions */
const spinMaker: LabChallengeMaker<SpinState> = (random) => {
    const ratio = pick(random, ['sin', 'cos'] as const)
    const n = pick(random, [1, 2, 3])
    const count = pick(random, [0, n, 2 * n])
    const options = SPIN_VALUES.map((_, k) => k).filter((k) => spinCount({ ratio, n, k }) === count)
    const name = NAMES[ratio]
    return {
        prompt: say(`${name.eu.charAt(0).toUpperCase()}${name.eu.slice(1)} eta $n=${n}$ izanik, aukeratu $k$, ${count} soluzio egon daitezen 0°-tik 360°-ra.`, `Con ${name.es} y $n=${n}$, elige $k$ para que haya ${count} soluciones entre 0° y 360°.`, `مع ${name.ar} و$n=${n}$ اختر $k$ ليكون عدد الحلول ${count} بين 0° و360°.`, `With ${name.en} and $n=${n}$, choose $k$ so that there are ${count} solutions between 0° and 360°.`),
        hint: count === 0
            ? say('Aukeratu inongo sinuk edo kosinuk ez duen balio bat.', 'Elige un valor que no tenga ningún seno ni coseno.', 'اختر قيمة لا يبلغها أي جيب ولا جيب تمام.', 'Choose a value that no sine or cosine reaches.')
            : count === n
                ? say('Bira bakoitzean soluzio bakarra: $k=1$ edo $k=-1$.', 'Una sola solución por vuelta: $k=1$ o $k=-1$.', 'حل واحد في كل دورة: $k=1$ أو $k=-1$.', 'A single solution per turn: $k=1$ or $k=-1$.')
                : say('Bira bakoitzean bi soluzio: $-1$ eta $1$ arteko balio bat, muturrak kanpo.', 'Dos soluciones por vuelta: un valor entre $-1$ y $1$, sin los extremos.', 'حلان في كل دورة: قيمة بين $-1$ و$1$ دون الطرفين.', 'Two solutions per turn: a value between $-1$ and $1$, not the ends.'),
        isSolved: (state) => state.ratio === ratio && state.n === n && spinCount(state) === count,
        solution: { ratio, n, k: pick(random, options), prediction: null }
    }
}

export const spinExtra = freshFrom(initialSpinState, spinMaker)
