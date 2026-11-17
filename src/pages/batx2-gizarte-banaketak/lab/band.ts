import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { say } from '../../batx2-zientziak-probabilitatea/lab/probability.ts'
import { criticalZ, decimalLatex } from '../critical.ts'

/* ==========================================================================
   B-L2 · % k-ko zerrenda (La franja del k %): a bell N(μ; σ) and a level
   of probability k. The band centred on μ with that probability is
   μ ± z_{α/2}·σ, where z_{α/2} comes from the table with the approved
   convention (critical.ts). Changing k widens or narrows the band;
   changing σ stretches it. Before the numbers, the learner says whether
   the band is narrower than, about the same as or wider than μ ± 2σ:
   95 % is about 2σ. Pure logic.
   ========================================================================== */

export const BAND_LEVELS = [50, 80, 90, 95, 98, 99] as const

export interface BandState {
    mean: number
    sd: number
    /** Index into BAND_LEVELS */
    level: number
    prediction: Prediction | null
}

export const BAND_LIMITS = { mean: { min: 50, max: 200, step: 10 }, sd: { min: 5, max: 30, step: 5 } } as const
export const initialBandState: BandState = { mean: 100, sd: 15, level: 2, prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export function setBand(state: BandState, patch: Partial<Pick<BandState, 'mean' | 'sd' | 'level'>>): BandState {
    const mean = clamp(patch.mean ?? state.mean, BAND_LIMITS.mean.min, BAND_LIMITS.mean.max)
    const sd = clamp(patch.sd ?? state.sd, BAND_LIMITS.sd.min, BAND_LIMITS.sd.max)
    const level = clamp(patch.level ?? state.level, 0, BAND_LEVELS.length - 1)
    return mean === state.mean && sd === state.sd && level === state.level ? state : { mean, sd, level, prediction: null }
}

type Params = Pick<BandState, 'mean' | 'sd' | 'level'>

export const zOf = (state: Pick<BandState, 'level'>) => criticalZ(BAND_LEVELS[state.level])
/** The radius z·σ, rounded to thousandths so it can be compared and written */
export const radiusOf = (state: Params) => Math.round(zOf(state) * state.sd * 1000) / 1000
export const intervalOf = (state: Params): [number, number] => [Math.round((state.mean - radiusOf(state)) * 1000) / 1000, Math.round((state.mean + radiusOf(state)) * 1000) / 1000]

/** The band compared with μ ± 2σ: 95 % (1,96) counts as the same */
export function bandPrediction(state: Pick<BandState, 'level'>): Prediction {
    const z = zOf(state)
    return Math.abs(z - 2) < 0.05 ? '=' : z < 2 ? '<' : '>'
}

/** The interval for LaTeX: (80{,}8;\ 159{,}2) */
export const intervalLatex = (state: Params) => {
    const [low, high] = intervalOf(state)
    return `(${decimalLatex(low)};\\ ${decimalLatex(high)})`
}

/* ---------- Challenges ---------- */

export const bandChallenges: LabChallenge<BandState>[] = [
    { id: 151121, prompt: say('Egin $N(120;\\,20)$ banaketaren tarte karakteristikoa, % 95 probabilitatearekin.', 'Haz el intervalo característico del 95 % de una $N(120;\\,20)$.', 'اصنع الفترة المميزة لـ 95 % في $N(120;\\,20)$.', 'Make the 95% characteristic interval of an $N(120;\\,20)$.'), hint: say('Aukeratu $\\mu$, $\\sigma$ eta maila.', 'Elige $\\mu$, $\\sigma$ y el nivel.', 'اختر $\\mu$ و$\\sigma$ والمستوى.', 'Choose $\\mu$, $\\sigma$ and the level.'), isSolved: (state) => state.mean === 120 && state.sd === 20 && BAND_LEVELS[state.level] === 95 },
    { id: 151122, prompt: say('Egin zerrendaren erradioa $25{,}75$ izatea.', 'Haz que el radio de la franja sea $25{,}75$.', 'اجعل نصف قطر الشريط $25{,}75$.', 'Make the radius of the band $25{,}75$.'), hint: say('$2{,}575\\cdot 10=25{,}75$.', '$2{,}575\\cdot 10=25{,}75$.', '$2{,}575\\cdot 10=25{,}75$.', '$2{,}575\\cdot 10=25{,}75$.'), isSolved: (state) => radiusOf(state) === 25.75 },
    { id: 151123, prompt: say('Egin zerrendaren erradioa $32{,}9$ izatea.', 'Haz que el radio de la franja sea $32{,}9$.', 'اجعل نصف قطر الشريط $32{,}9$.', 'Make the radius of the band $32{,}9$.'), hint: say('$1{,}645\\cdot 20=32{,}9$: % 90.', '$1{,}645\\cdot 20=32{,}9$: el 90 %.', '$1{,}645\\cdot 20=32{,}9$: أي 90 %.', '$1{,}645\\cdot 20=32{,}9$: 90%.'), isSolved: (state) => radiusOf(state) === 32.9 }
]

/** Endless practice: build a given interval */
const bandMaker: LabChallengeMaker<BandState> = (random) => {
    const mean = 10 * randomInt(random, 5, 20)
    const sd = 5 * randomInt(random, 1, 6)
    const level = pick(random, [0, 1, 2, 3, 4, 5])
    const solution: BandState = { mean, sd, level, prediction: null }
    return {
        prompt: say(`Egin $${intervalLatex(solution)}$ tartea, $\\sigma=${sd}$ izanik.`, `Haz el intervalo $${intervalLatex(solution)}$ con $\\sigma=${sd}$.`, `اصنع الفترة $${intervalLatex(solution)}$ مع $\\sigma=${sd}$.`, `Make the interval $${intervalLatex(solution)}$ with $\\sigma=${sd}$.`),
        hint: say('Erdiko puntua $\\mu$ da; erradioa zati $\\sigma$, $z_{\\alpha/2}$.', 'El punto medio es $\\mu$; el radio entre $\\sigma$ es $z_{\\alpha/2}$.', 'منتصف الفترة $\\mu$؛ ونصف القطر على $\\sigma$ هو $z_{\\alpha/2}$.', 'The midpoint is $\\mu$; the radius over $\\sigma$ is $z_{\\alpha/2}$.'),
        isSolved: (state) => state.mean === mean && state.sd === sd && state.level === level,
        solution
    }
}

export const bandExtra = freshFrom(initialBandState, bandMaker)
