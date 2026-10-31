import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { freshFrom, type Prediction } from './prediction.ts'

/* ==========================================================================
   L4 · Errebotatzen duen pilota (La pelota que rebota): a ball dropped from
   h₀ bounces back each time to a fixed fraction r of the height before, so
   the heights hₙ = h₀ · rⁿ form a geometric progression. The learner picks
   the height, the ratio and the bounce, predicts whether that bounce will
   be below, at or above half the starting height, and ▶ drops the ball.
   Heights are chosen so that the useful bounces come out whole.
   ========================================================================== */

export const BOUNCE_HEIGHTS = [81, 128, 160, 162, 200, 243, 256] as const
/** The ratios as fractions, so that every height can be exact */
export const BOUNCE_RATIOS: Array<[number, number]> = [[1, 3], [1, 2], [2, 3], [3, 4], [4, 5]]
export const BOUNCE_N_MAX = 6

export interface BounceState {
    height: number
    ratio: number
    n: number
    prediction: Prediction | null
}

export const initialBounceState: BounceState = { height: 4, ratio: 1, n: 2, prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export function setBounce(state: BounceState, patch: Partial<Omit<BounceState, 'prediction'>>): BounceState {
    const height = clamp(patch.height ?? state.height, 0, BOUNCE_HEIGHTS.length - 1)
    const ratio = clamp(patch.ratio ?? state.ratio, 0, BOUNCE_RATIOS.length - 1)
    const n = clamp(patch.n ?? state.n, 1, BOUNCE_N_MAX)
    const same = height === state.height && ratio === state.ratio && n === state.n
    return { height, ratio, n, prediction: same ? state.prediction : null }
}

export const bounceStart = (state: BounceState) => BOUNCE_HEIGHTS[state.height]
export const bounceRatio = (state: BounceState) => BOUNCE_RATIOS[state.ratio][0] / BOUNCE_RATIOS[state.ratio][1]
/** Height after bounce k (k = 0 is the drop) */
export const bounceHeight = (state: BounceState, k = state.n) => bounceStart(state) * bounceRatio(state) ** k
/** Below (<), at (=) or above (>) half the starting height? */
export function bouncePrediction(state: BounceState): Prediction {
    const [p, q] = BOUNCE_RATIOS[state.ratio]
    // Compare pⁿ / qⁿ with 1/2 exactly: 2·pⁿ against qⁿ
    const left = 2 * p ** state.n
    const right = q ** state.n
    return left === right ? '=' : left < right ? '<' : '>'
}

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const ratioLatex = (index: number) => `\\frac{${BOUNCE_RATIOS[index][0]}}{${BOUNCE_RATIOS[index][1]}}`

const at = (height: number, ratio: number, n: number) => (state: BounceState) => state.height === height && state.ratio === ratio && state.n === n

export const bounceChallenges: LabChallenge<BounceState>[] = [
    { id: 89401, prompt: say('160 cm-tik, $r=\\frac{1}{2}$: zein errebotetan iristen da 10 cm-ra?', 'Desde 160 cm, $r=\\frac{1}{2}$: ¿en qué bote llega a 10 cm?', 'من 160 سم و$r=\\frac{1}{2}$: في أي ارتداد تبلغ 10 سم؟', 'From 160 cm, $r=\\frac{1}{2}$: on which bounce does it reach 10 cm?'), hint: say('$160\\cdot\\left(\\frac{1}{2}\\right)^{n}=10$.', '$160\\cdot\\left(\\frac{1}{2}\\right)^{n}=10$.', '$160\\cdot\\left(\\frac{1}{2}\\right)^{n}=10$.', '$160\\cdot\\left(\\frac{1}{2}\\right)^{n}=10$.'), isSolved: at(2, 1, 4) },
    { id: 89402, prompt: say('243 cm-tik, lortu hirugarren errebotean 72 cm.', 'Desde 243 cm, consigue 72 cm en el tercer bote.', 'من 243 سم اجعل الارتداد الثالث 72 سم.', 'From 243 cm, get 72 cm on the third bounce.'), hint: say('$\\frac{72}{243}=\\frac{8}{27}=r^{3}$.', '$\\frac{72}{243}=\\frac{8}{27}=r^{3}$.', '$\\frac{72}{243}=\\frac{8}{27}=r^{3}$.', '$\\frac{72}{243}=\\frac{8}{27}=r^{3}$.'), isSolved: at(5, 2, 3) },
    { id: 89403, prompt: say('256 cm-tik eta $r=\\frac{3}{4}$: erakutsi 81 cm-ra iristen den errebotea.', 'Desde 256 cm y $r=\\frac{3}{4}$: muestra el bote que llega a 81 cm.', 'من 256 سم و$r=\\frac{3}{4}$: أظهر الارتداد الذي يبلغ 81 سم.', 'From 256 cm with $r=\\frac{3}{4}$: show the bounce that reaches 81 cm.'), hint: say('$\\frac{81}{256}=\\left(\\frac{3}{4}\\right)^{4}$.', '$\\frac{81}{256}=\\left(\\frac{3}{4}\\right)^{4}$.', '$\\frac{81}{256}=\\left(\\frac{3}{4}\\right)^{4}$.', '$\\frac{81}{256}=\\left(\\frac{3}{4}\\right)^{4}$.'), isSolved: at(6, 3, 4) },
    { id: 89404, prompt: say('200 cm-tik eta $r=\\frac{4}{5}$: lortu 128 cm.', 'Desde 200 cm y $r=\\frac{4}{5}$: consigue 128 cm.', 'من 200 سم و$r=\\frac{4}{5}$: احصل على 128 سم.', 'From 200 cm with $r=\\frac{4}{5}$: get 128 cm.'), hint: say('$200\\cdot 0{,}8\\cdot 0{,}8$.', '$200\\cdot 0{,}8\\cdot 0{,}8$.', '$200\\cdot 0{,}8\\cdot 0{,}8$.', '$200\\cdot 0{,}8\\cdot 0{,}8$.'), isSolved: at(4, 4, 2) },
    { id: 89405, prompt: say('162 cm-tik, lortu errebote batean 2 cm.', 'Desde 162 cm, consigue un bote de 2 cm.', 'من 162 سم اجعل ارتدادًا يبلغ 2 سم.', 'From 162 cm, get a bounce of 2 cm.'), hint: say('$\\frac{2}{162}=\\frac{1}{81}$.', '$\\frac{2}{162}=\\frac{1}{81}$.', '$\\frac{2}{162}=\\frac{1}{81}$.', '$\\frac{2}{162}=\\frac{1}{81}$.'), isSolved: (state) => state.height === 3 && Math.abs(bounceHeight(state) - 2) < 1e-9 }
]

/** Endless practice: a height and a ratio, and a whole height to reach */
const bounceMaker: LabChallengeMaker<BounceState> = (random) => {
    for (;;) {
        const height = randomInt(random, 0, BOUNCE_HEIGHTS.length - 1)
        const ratio = randomInt(random, 0, BOUNCE_RATIOS.length - 1)
        const n = pick(random, [1, 2, 3, 4, 5])
        const value = bounceHeight({ height, ratio, n, prediction: null })
        // Only whole heights, so that the bounce can be named exactly
        if (Math.abs(value - Math.round(value)) > 1e-9) continue
        return {
            prompt: say(`${BOUNCE_HEIGHTS[height]} cm-tik eta $r=${ratioLatex(ratio)}$: zein errebotetan iristen da ${Math.round(value)} cm-ra?`, `Desde ${BOUNCE_HEIGHTS[height]} cm y $r=${ratioLatex(ratio)}$: ¿en qué bote llega a ${Math.round(value)} cm?`, `من ${BOUNCE_HEIGHTS[height]} سم و$r=${ratioLatex(ratio)}$: في أي ارتداد تبلغ ${Math.round(value)} سم؟`, `From ${BOUNCE_HEIGHTS[height]} cm with $r=${ratioLatex(ratio)}$: on which bounce does it reach ${Math.round(value)} cm?`),
            hint: say(`$${BOUNCE_HEIGHTS[height]}\\cdot r^{n}=${Math.round(value)}$`, `$${BOUNCE_HEIGHTS[height]}\\cdot r^{n}=${Math.round(value)}$`, `$${BOUNCE_HEIGHTS[height]}\\cdot r^{n}=${Math.round(value)}$`, `$${BOUNCE_HEIGHTS[height]}\\cdot r^{n}=${Math.round(value)}$`),
            isSolved: at(height, ratio, n),
            solution: { height, ratio, n, prediction: null }
        }
    }
}

export const bounceExtra = freshFrom(initialBounceState, bounceMaker)
