import { pick } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { say } from '../text.ts'

/* ==========================================================================
   L3 · Sei arrazoiak zirkunferentzian (Las seis razones en la
   circunferencia): the point of the angle on the circle of radius 1, the
   tangent line x = 1 and the cotangent line y = 1. The sine and the
   cosine are the coordinates; the radius, made longer, meets x = 1 at the
   height tg α, at a distance sec α from the centre, and meets y = 1 at
   cotg α, at a distance cosec α. The learner picks a ratio and first
   predicts its sign (negative, zero or not there, positive); then the
   segments and the value are shown. Pure logic.
   ========================================================================== */

export type SixRatio = 'sin' | 'cos' | 'tan' | 'csc' | 'sec' | 'cot'

export const SIX_RATIOS: SixRatio[] = ['sin', 'cos', 'tan', 'csc', 'sec', 'cot']
export const SIX_LIMITS = { min: 0, max: 345, step: 15 }

export interface SixState {
    angle: number
    ratio: SixRatio
    prediction: Prediction | null
}

export const initialSixState: SixState = { angle: 30, ratio: 'sec', prediction: null }

const D = Math.PI / 180
const snap = (value: number) => Math.min(SIX_LIMITS.max, Math.max(SIX_LIMITS.min, Math.round(value / SIX_LIMITS.step) * SIX_LIMITS.step))
/** A value that is 0 up to rounding (cos 90°) is 0 */
const clean = (value: number) => (Math.abs(value) < 1e-12 ? 0 : value)

export function setSix(state: SixState, patch: Partial<Omit<SixState, 'prediction'>>): SixState {
    const next = { angle: snap(patch.angle ?? state.angle), ratio: patch.ratio ?? state.ratio }
    const same = next.angle === state.angle && next.ratio === state.ratio
    return { ...next, prediction: same ? state.prediction : null }
}

/** The value of a ratio, or null where it does not exist (a division by 0) */
export function sixValue(angle: number, ratio: SixRatio): number | null {
    const s = clean(Math.sin(angle * D))
    const c = clean(Math.cos(angle * D))
    switch (ratio) {
        case 'sin': return s
        case 'cos': return c
        case 'tan': return c === 0 ? null : clean(s / c)
        case 'cot': return s === 0 ? null : clean(c / s)
        case 'sec': return c === 0 ? null : 1 / c
        case 'csc': return s === 0 ? null : 1 / s
    }
}

/** Negative (<), zero or not there (=), positive (>) */
export function sixPrediction({ angle, ratio }: Pick<SixState, 'angle' | 'ratio'>): Prediction {
    const value = sixValue(angle, ratio)
    return value === null || value === 0 ? '=' : value < 0 ? '<' : '>'
}

const near = (value: number | null, target: number) => value !== null && Math.abs(value - target) < 1e-9

export const sixChallenges: LabChallenge<SixState>[] = [
    { id: 103301, prompt: say('Aukeratu $\\sec\\alpha$ eta aurkitu $\\sec\\alpha=2$ duen angelu bat.', 'Elige $\\sec\\alpha$ y encuentra un ángulo con $\\sec\\alpha=2$.', 'اختر $\\sec\\alpha$ وأوجد زاوية فيها $\\sec\\alpha=2$.', 'Choose $\\sec\\alpha$ and find an angle with $\\sec\\alpha=2$.'), hint: say('$\\sec\\alpha=2$ denean, $\\cos\\alpha=\\frac{1}{2}$ da.', 'Si $\\sec\\alpha=2$, entonces $\\cos\\alpha=\\frac{1}{2}$.', 'إذا كان $\\sec\\alpha=2$ فإن $\\cos\\alpha=\\frac{1}{2}$.', 'If $\\sec\\alpha=2$, then $\\cos\\alpha=\\frac{1}{2}$.'), isSolved: (state) => state.ratio === 'sec' && near(sixValue(state.angle, 'sec'), 2) },
    { id: 103302, prompt: say('Aukeratu $\\cosec\\alpha$ eta egin ez existitzea.', 'Elige $\\cosec\\alpha$ y haz que no exista.', 'اختر $\\cosec\\alpha$ واجعلها غير موجودة.', 'Choose $\\csc\\alpha$ and make it not exist.'), hint: say('$\\cosec\\alpha=\\frac{1}{\\sen\\alpha}$: noiz da sinua 0?', '$\\cosec\\alpha=\\frac{1}{\\sen\\alpha}$: ¿cuándo vale 0 el seno?', '$\\cosec\\alpha=\\frac{1}{\\sen\\alpha}$: متى يساوي الجيب 0؟', '$\\csc\\alpha=\\frac{1}{\\sin\\alpha}$: when is the sine 0?'), isSolved: (state) => state.ratio === 'csc' && sixValue(state.angle, 'csc') === null },
    { id: 103303, prompt: say('Aukeratu $\\cotg\\alpha$ eta aurkitu bigarren koadranteko angelu bat, $\\cotg\\alpha=-1$ duena.', 'Elige $\\cotg\\alpha$ y encuentra un ángulo del segundo cuadrante con $\\cotg\\alpha=-1$.', 'اختر $\\cotg\\alpha$ وأوجد زاوية في الربع الثاني فيها $\\cotg\\alpha=-1$.', 'Choose $\\cot\\alpha$ and find an angle in the second quadrant with $\\cot\\alpha=-1$.'), hint: say('Sinua eta kosinua berdinak dira, kontrako zeinuarekin.', 'El seno y el coseno valen lo mismo, con signo contrario.', 'الجيب وجيب التمام متساويان بإشارتين متعاكستين.', 'The sine and the cosine are equal, with opposite signs.'), isSolved: (state) => state.ratio === 'cot' && state.angle > 90 && state.angle < 180 && near(sixValue(state.angle, 'cot'), -1) },
    { id: 103304, prompt: say('Aukeratu $\\tg\\alpha$ eta lortu $\\tg\\alpha>1$, $\\sen\\alpha<0$ izanik.', 'Elige $\\tg\\alpha$ y consigue $\\tg\\alpha>1$ con $\\sen\\alpha<0$.', 'اختر $\\tg\\alpha$ واجعل $\\tg\\alpha>1$ مع $\\sen\\alpha<0$.', 'Choose $\\tan\\alpha$ and get $\\tan\\alpha>1$ with $\\sin\\alpha<0$.'), hint: say('Tangente positiboa eta sinu negatiboa: hirugarren koadrantea, 225°-tik aurrera.', 'Tangente positiva y seno negativo: tercer cuadrante, más allá de 225°.', 'ظل موجب وجيب سالب: الربع الثالث بعد 225°.', 'Positive tangent and negative sine: the third quadrant, past 225°.'), isSolved: (state) => state.ratio === 'tan' && (sixValue(state.angle, 'tan') ?? 0) > 1 + 1e-9 && (sixValue(state.angle, 'sin') ?? 0) < 0 },
    { id: 103305, prompt: say('Egin $\\sec\\alpha$ eta $\\cosec\\alpha$ berdinak izatea.', 'Haz que $\\sec\\alpha$ y $\\cosec\\alpha$ sean iguales.', 'اجعل $\\sec\\alpha$ و$\\cosec\\alpha$ متساويتين.', 'Make $\\sec\\alpha$ and $\\csc\\alpha$ equal.'), hint: say('Sinua eta kosinua berdinak direnean.', 'Cuando el seno y el coseno son iguales.', 'عندما يتساوى الجيب وجيب التمام.', 'When the sine and the cosine are equal.'), isSolved: (state) => { const sec = sixValue(state.angle, 'sec'); const csc = sixValue(state.angle, 'csc'); return sec !== null && csc !== null && Math.abs(sec - csc) < 1e-9 } }
]

/** Values of the three new ratios at notable angles, with their LaTeX */
const TARGETS: Array<{ ratio: SixRatio; latex: string; value: number }> = [
    { ratio: 'sec', latex: '2', value: 2 },
    { ratio: 'sec', latex: '-2', value: -2 },
    { ratio: 'sec', latex: '\\sqrt{2}', value: Math.SQRT2 },
    { ratio: 'sec', latex: '-1', value: -1 },
    { ratio: 'csc', latex: '2', value: 2 },
    { ratio: 'csc', latex: '-\\sqrt{2}', value: -Math.SQRT2 },
    { ratio: 'csc', latex: '-1', value: -1 },
    { ratio: 'cot', latex: '\\sqrt{3}', value: Math.sqrt(3) },
    { ratio: 'cot', latex: '-1', value: -1 },
    { ratio: 'cot', latex: '0', value: 0 },
    { ratio: 'tan', latex: '-\\sqrt{3}', value: -Math.sqrt(3) },
    { ratio: 'tan', latex: '1', value: 1 }
]

const TEX: Record<SixRatio, string> = { sin: '\\sen', cos: '\\cos', tan: '\\tg', csc: '\\cosec', sec: '\\sec', cot: '\\cotg' }
export const sixTex = (ratio: SixRatio) => TEX[ratio]

/** Endless practice: find an angle where one of the ratios takes a given value */
const sixMaker: LabChallengeMaker<SixState> = (random) => {
    const target = pick(random, TARGETS)
    const angles = Array.from({ length: SIX_LIMITS.max / SIX_LIMITS.step + 1 }, (_, index) => index * SIX_LIMITS.step).filter((angle) => near(sixValue(angle, target.ratio), target.value))
    const formula = `${TEX[target.ratio]}\\alpha=${target.latex}`
    const helper = target.ratio === 'sec' || target.ratio === 'tan' ? '\\cos\\alpha' : '\\sen\\alpha'
    return {
        prompt: say(`Aukeratu $${TEX[target.ratio]}\\alpha$ eta aurkitu $${formula}$ duen angelu bat.`, `Elige $${TEX[target.ratio]}\\alpha$ y encuentra un ángulo con $${formula}$.`, `اختر $${TEX[target.ratio]}\\alpha$ وأوجد زاوية فيها $${formula}$.`, `Choose $${TEX[target.ratio]}\\alpha$ and find an angle with $${formula}$.`),
        hint: say(`Begiratu $${helper}$ adierazpenari eta haren zeinuari.`, `Fíjate en $${helper}$ y en su signo.`, `انظر إلى $${helper}$ وإلى إشارته.`, `Look at $${helper}$ and its sign.`),
        isSolved: (state) => state.ratio === target.ratio && near(sixValue(state.angle, target.ratio), target.value),
        solution: { angle: pick(random, angles), ratio: target.ratio, prediction: null }
    }
}

export const sixExtra = freshFrom(initialSixState, sixMaker)
