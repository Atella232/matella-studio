import { pick } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { say } from '../text.ts'

/* ==========================================================================
   L1 · Batzen diren bi angelu (Dos ángulos que se suman): α and β on the
   unit circle, one after the other, and the angle α + β (or α − β) they
   make. The tool compares the true ratio of the sum, which the formula
   gives, with the typical mistake: the sum of the ratios. The learner
   first predicts whether sen(α + β) is less than, equal to or greater
   than sen α + sen β (or the same with the cosine or the difference);
   then both bars are drawn. Pure logic.
   ========================================================================== */

export type SumRatio = 'sin' | 'cos'
export type SumOperation = 'plus' | 'minus'

export const SUM_LIMITS = { min: 0, max: 345, step: 15 }

export interface SumState {
    alpha: number
    beta: number
    ratio: SumRatio
    operation: SumOperation
    prediction: Prediction | null
}

export const initialSumState: SumState = { alpha: 45, beta: 30, ratio: 'sin', operation: 'plus', prediction: null }

const D = Math.PI / 180
const snap = (value: number) => Math.min(SUM_LIMITS.max, Math.max(SUM_LIMITS.min, Math.round(value / SUM_LIMITS.step) * SUM_LIMITS.step))
/** A value that is 0 up to rounding (sen 180°) is written as 0 */
const clean = (value: number) => (Math.abs(value) < 1e-12 ? 0 : value)

export const ratioOf = (ratio: SumRatio, degrees: number) => clean(ratio === 'sin' ? Math.sin(degrees * D) : Math.cos(degrees * D))

export function setSum(state: SumState, patch: Partial<Omit<SumState, 'prediction'>>): SumState {
    const next = {
        alpha: snap(patch.alpha ?? state.alpha),
        beta: snap(patch.beta ?? state.beta),
        ratio: patch.ratio ?? state.ratio,
        operation: patch.operation ?? state.operation
    }
    const same = next.alpha === state.alpha && next.beta === state.beta && next.ratio === state.ratio && next.operation === state.operation
    return { ...next, prediction: same ? state.prediction : null }
}

/** α + β or α − β */
export const combinedAngle = ({ alpha, beta, operation }: Pick<SumState, 'alpha' | 'beta' | 'operation'>) => (operation === 'plus' ? alpha + beta : alpha - beta)

/** The ratio of α ± β, as the formula gives it: sen α cos β ± cos α sen β, cos α cos β ∓ sen α sen β */
export function formulaValue({ alpha, beta, ratio, operation }: Pick<SumState, 'alpha' | 'beta' | 'ratio' | 'operation'>): number {
    const sign = operation === 'plus' ? 1 : -1
    const [sa, ca, sb, cb] = [ratioOf('sin', alpha), ratioOf('cos', alpha), ratioOf('sin', beta), ratioOf('cos', beta)]
    return clean(ratio === 'sin' ? sa * cb + sign * ca * sb : ca * cb - sign * sa * sb)
}

/** The typical mistake: sen α ± sen β (or the cosines) */
export const mistakeValue = ({ alpha, beta, ratio, operation }: Pick<SumState, 'alpha' | 'beta' | 'ratio' | 'operation'>) =>
    clean(ratioOf(ratio, alpha) + (operation === 'plus' ? 1 : -1) * ratioOf(ratio, beta))

/** Whether the true value is below, equal to or above the mistake */
export const sumPrediction = (state: SumState): Prediction => compareTo(formulaValue(state), mistakeValue(state))

const NOTABLE = (angle: number) => angle > 0 && (angle % 30 === 0 || angle % 45 === 0)

export const sumChallenges: LabChallenge<SumState>[] = [
    { id: 103101, prompt: say('Sinuarekin eta $\\alpha+\\beta$ eragiketarekin, lortu $\\alpha+\\beta=90°$, angeluetako bat ere 0° izan gabe.', 'Con el seno y $\\alpha+\\beta$, consigue $\\alpha+\\beta=90°$ sin que ningún ángulo sea 0°.', 'مع الجيب و$\\alpha+\\beta$ اجعل $\\alpha+\\beta=90°$ دون أن تكون أي زاوية 0°.', 'With the sine and $\\alpha+\\beta$, make $\\alpha+\\beta=90°$ with neither angle 0°.'), hint: say('Adibidez, $60°+30°$: sinua 1 da, ez $\\sen 60°+\\sen 30°$.', 'Por ejemplo, $60°+30°$: el seno vale 1, no $\\sen 60°+\\sen 30°$.', 'مثلًا $60°+30°$: الجيب يساوي 1، لا $\\sen 60°+\\sen 30°$.', 'For example, $60°+30°$: the sine is 1, not $\\sin 60°+\\sin 30°$.'), isSolved: (state) => state.ratio === 'sin' && state.operation === 'plus' && state.alpha > 0 && state.beta > 0 && state.alpha + state.beta === 90 },
    { id: 103102, prompt: say('Sinuarekin eta $\\alpha+\\beta$ eragiketarekin, aurkitu 0° ez diren α eta β, $\\sen(\\alpha+\\beta)=\\sen\\alpha+\\sen\\beta$ izan dadin.', 'Con el seno y $\\alpha+\\beta$, encuentra α y β, distintos de 0°, con $\\sen(\\alpha+\\beta)=\\sen\\alpha+\\sen\\beta$.', 'مع الجيب و$\\alpha+\\beta$ أوجد α وβ غير 0° بحيث $\\sen(\\alpha+\\beta)=\\sen\\alpha+\\sen\\beta$.', 'With the sine and $\\alpha+\\beta$, find α and β, not 0°, with $\\sin(\\alpha+\\beta)=\\sin\\alpha+\\sin\\beta$.'), hint: say('Erabili bira bat osatzen duten bi angelu: $\\sen 360°=0$.', 'Usa dos ángulos que sumen una vuelta: $\\sen 360°=0$.', 'استعمل زاويتين مجموعهما دورة: $\\sen 360°=0$.', 'Use two angles that add up to a full turn: $\\sin 360°=0$.'), isSolved: (state) => state.ratio === 'sin' && state.operation === 'plus' && state.alpha > 0 && state.beta > 0 && sumPrediction(state) === '=' },
    { id: 103103, prompt: say('Kosinuarekin eta $\\alpha-\\beta$ eragiketarekin, lortu $\\cos(\\alpha-\\beta)=1$, α 0° izan gabe.', 'Con el coseno y $\\alpha-\\beta$, consigue $\\cos(\\alpha-\\beta)=1$ sin que α sea 0°.', 'مع جيب التمام و$\\alpha-\\beta$ اجعل $\\cos(\\alpha-\\beta)=1$ دون أن تكون α تساوي 0°.', 'With the cosine and $\\alpha-\\beta$, make $\\cos(\\alpha-\\beta)=1$ with α not 0°.'), hint: say('$\\cos 0°=1$: zer gertatzen da $\\alpha=\\beta$ denean?', '$\\cos 0°=1$: ¿qué pasa si $\\alpha=\\beta$?', '$\\cos 0°=1$: ماذا يحدث إذا كان $\\alpha=\\beta$؟', '$\\cos 0°=1$: what happens if $\\alpha=\\beta$?'), isSolved: (state) => state.ratio === 'cos' && state.operation === 'minus' && state.alpha > 0 && Math.abs(formulaValue(state) - 1) < 1e-9 },
    { id: 103104, prompt: say('Kosinuarekin eta $\\alpha+\\beta$ eragiketarekin, jarri $\\alpha=60°$ eta aukeratu β, $\\cos(\\alpha+\\beta)=0$ izan dadin.', 'Con el coseno y $\\alpha+\\beta$, pon $\\alpha=60°$ y elige β para que $\\cos(\\alpha+\\beta)=0$.', 'مع جيب التمام و$\\alpha+\\beta$ ضع $\\alpha=60°$ واختر β بحيث $\\cos(\\alpha+\\beta)=0$.', 'With the cosine and $\\alpha+\\beta$, set $\\alpha=60°$ and choose β so that $\\cos(\\alpha+\\beta)=0$.'), hint: say('Kosinua 0 da 90° eta 270° angeluetan.', 'El coseno vale 0 en 90° y en 270°.', 'جيب التمام يساوي 0 عند 90° و270°.', 'The cosine is 0 at 90° and at 270°.'), isSolved: (state) => state.ratio === 'cos' && state.operation === 'plus' && state.alpha === 60 && Math.abs(formulaValue(state)) < 1e-9 },
    { id: 103105, prompt: say('Sinuarekin eta $\\alpha+\\beta$ eragiketarekin, lortu $\\sen(\\alpha+\\beta)$ handiagoa izatea $\\sen\\alpha+\\sen\\beta$ baino.', 'Con el seno y $\\alpha+\\beta$, consigue que $\\sen(\\alpha+\\beta)$ sea mayor que $\\sen\\alpha+\\sen\\beta$.', 'مع الجيب و$\\alpha+\\beta$ اجعل $\\sen(\\alpha+\\beta)$ أكبر من $\\sen\\alpha+\\sen\\beta$.', 'With the sine and $\\alpha+\\beta$, make $\\sin(\\alpha+\\beta)$ greater than $\\sin\\alpha+\\sin\\beta$.'), hint: say('Bi sinu negatibo batzean, emaitza oso txikia da: probatu hirugarren koadranteko angeluekin.', 'Al sumar dos senos negativos sale algo muy pequeño: prueba con ángulos del tercer cuadrante.', 'جمع جيبين سالبين يعطي شيئًا صغيرًا جدًا: جرّب زوايا من الربع الثالث.', 'Adding two negative sines gives something very small: try angles in the third quadrant.'), isSolved: (state) => state.ratio === 'sin' && state.operation === 'plus' && sumPrediction(state) === '>' }
]

/** The angles that are not notable, written as a sum or a difference of two that are */
const TARGETS = [15, 75, 105, 165, 195, 255, 285, 345]
const NAMES = {
    sin: say('sinua', 'seno', 'الجيب', 'sine'),
    cos: say('kosinua', 'coseno', 'جيب التمام', 'cosine')
}

/** Endless practice: write an angle that is not notable as a sum or a difference of two notable ones */
const sumMaker: LabChallengeMaker<SumState> = (random) => {
    for (;;) {
        const target = pick(random, TARGETS)
        const operation = pick(random, ['plus', 'minus'] as const)
        const ratio = pick(random, ['sin', 'cos'] as const)
        const pairs: Array<[number, number]> = []
        for (let alpha = SUM_LIMITS.step; alpha <= SUM_LIMITS.max; alpha += SUM_LIMITS.step) {
            for (let beta = SUM_LIMITS.step; beta <= SUM_LIMITS.max; beta += SUM_LIMITS.step) {
                if (NOTABLE(alpha) && NOTABLE(beta) && combinedAngle({ alpha, beta, operation }) === target) pairs.push([alpha, beta])
            }
        }
        if (pairs.length === 0) continue
        const [alpha, beta] = pick(random, pairs)
        const name = NAMES[ratio]
        const plus = operation === 'plus'
        return {
            prompt: plus
                ? say(`Idatzi ${target}° angelua 30°-ren edo 45°-ren multiploak diren bi angeluren batura gisa, eta begiratu haren ${name.eu}.`, `Escribe ${target}° como suma de dos ángulos múltiplos de 30° o de 45° y mira su ${name.es}.`, `اكتب ${target}° مجموعَ زاويتين من مضاعفات 30° أو 45° وانظر إلى ${name.ar}.`, `Write ${target}° as the sum of two angles that are multiples of 30° or 45° and look at its ${name.en}.`)
                : say(`Idatzi ${target}° angelua 30°-ren edo 45°-ren multiploak diren bi angeluren kendura gisa, eta begiratu haren ${name.eu}.`, `Escribe ${target}° como resta de dos ángulos múltiplos de 30° o de 45° y mira su ${name.es}.`, `اكتب ${target}° فرقَ زاويتين من مضاعفات 30° أو 45° وانظر إلى ${name.ar}.`, `Write ${target}° as the difference of two angles that are multiples of 30° or 45° and look at its ${name.en}.`),
            hint: say(`Adibidez, $${alpha}°${plus ? '+' : '-'}${beta}°$.`, `Por ejemplo, $${alpha}°${plus ? '+' : '-'}${beta}°$.`, `مثلًا $${alpha}°${plus ? '+' : '-'}${beta}°$.`, `For example, $${alpha}°${plus ? '+' : '-'}${beta}°$.`),
            isSolved: (state) => state.ratio === ratio && state.operation === operation && NOTABLE(state.alpha) && NOTABLE(state.beta) && combinedAngle(state) === target,
            solution: { alpha, beta, ratio, operation, prediction: null }
        }
    }
}

export const sumExtra = freshFrom(initialSumState, sumMaker)
