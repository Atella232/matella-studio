import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { say } from '../../batx2-zientziak-probabilitatea/lab/probability.ts'
import { criticalZ, decimalLatex } from '../../batx2-gizarte-banaketak/critical.ts'

/* ==========================================================================
   I-L2 · Errore-marjina (El margen de error): three levers and an
   interval. For a mean: the level, σ and n; for a proportion: the level,
   p̂ and n. The interval x̄ ± E (or p̂ ± E) stretches and shrinks as the
   levers move, next to the 95 % interval of the same data. Before the
   numbers appear, the learner guesses whether the interval is narrower,
   equal to or wider than the 95 % one. Pure logic.
   ========================================================================== */

export type MarginMode = 'mean' | 'proportion'

export const MARGIN_LEVELS = [80, 90, 95, 99] as const
export const MARGIN_SIZES = [9, 16, 25, 36, 49, 64, 100, 144, 225, 400, 625, 900, 1600, 2500]
export const MARGIN_LIMITS = { sd: { min: 5, max: 30, step: 5 }, p: { min: 1, max: 9 } } as const

export interface MarginState {
    mode: MarginMode
    /** Index into MARGIN_LEVELS */
    level: number
    sd: number
    /** p̂ in tenths */
    p: number
    /** Index into MARGIN_SIZES */
    size: number
    prediction: Prediction | null
}

export const initialMarginState: MarginState = { mode: 'mean', level: 2, sd: 10, p: 5, size: 2, prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export function setMargin(state: MarginState, patch: Partial<Omit<MarginState, 'prediction'>>): MarginState {
    const next: MarginState = {
        mode: patch.mode ?? state.mode,
        level: clamp(patch.level ?? state.level, 0, MARGIN_LEVELS.length - 1),
        sd: clamp((patch.sd ?? state.sd) / 5, 1, 6) * 5,
        p: clamp(patch.p ?? state.p, MARGIN_LIMITS.p.min, MARGIN_LIMITS.p.max),
        size: clamp(patch.size ?? state.size, 0, MARGIN_SIZES.length - 1),
        prediction: null
    }
    return next.mode === state.mode && next.level === state.level && next.sd === state.sd && next.p === state.p && next.size === state.size ? state : next
}

type Params = Omit<MarginState, 'prediction'>

export const levelOf = (state: Pick<MarginState, 'level'>) => MARGIN_LEVELS[state.level]
export const sizeOf = (state: Pick<MarginState, 'size'>) => MARGIN_SIZES[state.size]
/** σ/√n for a mean, √(p̂q̂/n) for a proportion */
export const deviationOf = (state: Params) => (state.mode === 'mean' ? state.sd / Math.sqrt(sizeOf(state)) : Math.sqrt(((state.p / 10) * (1 - state.p / 10)) / sizeOf(state)))
export const errorOf = (state: Params) => criticalZ(levelOf(state)) * deviationOf(state)
export const centreOf = (state: Pick<MarginState, 'mode' | 'p'>) => (state.mode === 'mean' ? 50 : state.p / 10)

/** Narrower (<), equal (=) or wider (>) than the 95 % interval of the same data */
export const marginPrediction = (state: Pick<MarginState, 'level'>): Prediction => (levelOf(state) < 95 ? '<' : levelOf(state) === 95 ? '=' : '>')

/* ---------- Challenges ---------- */

export const marginChallenges: LabChallenge<MarginState>[] = [
    { id: 153121, prompt: say('$\\sigma=10$ eta % 95 mailan, lortu $E\\le 2$, ahalik eta $n$ txikienarekin.', 'Con $\\sigma=10$ y al 95 %, consigue $E\\le 2$ con la $n$ más pequeña posible.', 'مع $\\sigma=10$ وعند 95 %، احصل على $E\\le 2$ بأصغر $n$ ممكن.', 'With $\\sigma=10$ and at 95%, get $E\\le 2$ with the smallest $n$ you can.'), hint: same('$n\\ge 96{,}04$'), isSolved: (state) => state.mode === 'mean' && state.sd === 10 && levelOf(state) === 95 && sizeOf(state) === 100 },
    { id: 153122, prompt: say('Batez bestekoarekin, egin $E=9{,}8$ izatea.', 'Con la media, haz que $E=9{,}8$.', 'مع المتوسط، اجعل $E=9{,}8$.', 'With the mean, make $E=9{,}8$.'), hint: same('$9{,}8=1{,}96\\cdot 5$'), isSolved: (state) => state.mode === 'mean' && Math.abs(errorOf(state) - 9.8) < 1e-9 },
    { id: 153123, prompt: say('Proportzioarekin eta $\\hat{p}=0{,}5$ izanik, lortu $E<0{,}05$ % 95 mailan, ahalik eta $n$ txikienarekin.', 'Con la proporción y $\\hat{p}=0{,}5$, consigue $E<0{,}05$ al 95 % con la $n$ más pequeña posible.', 'مع النسبة و$\\hat{p}=0{,}5$، احصل على $E<0{,}05$ عند 95 % بأصغر $n$ ممكن.', 'With the proportion and $\\hat{p}=0{,}5$, get $E<0{,}05$ at 95% with the smallest $n$ you can.'), hint: same('$n\\ge 384{,}16$'), isSolved: (state) => state.mode === 'proportion' && state.p === 5 && levelOf(state) === 95 && sizeOf(state) === 400 }
]

function same(text: string) {
    return say(text, text, text, text)
}

/** Endless practice: an error E for a mean, reached with a level, σ and n */
const marginMaker: LabChallengeMaker<MarginState> = (random) => {
    const solution: MarginState = { mode: 'mean', level: randomInt(random, 0, MARGIN_LEVELS.length - 1), sd: 5 * randomInt(random, 1, 6), p: 5, size: pick(random, [0, 2, 3, 6, 7, 8, 9]), prediction: null }
    const error = errorOf(solution)
    const latex = decimalLatex(Math.round(error * 1000) / 1000)
    return {
        prompt: say(`Batez bestekoarekin, $\\sigma=${solution.sd}$ eta $n=${sizeOf(solution)}$ izanik, egin $E=${latex}$ izatea.`, `Con la media, $\\sigma=${solution.sd}$ y $n=${sizeOf(solution)}$, haz que $E=${latex}$.`, `مع المتوسط و$\\sigma=${solution.sd}$ و$n=${sizeOf(solution)}$، اجعل $E=${latex}$.`, `With the mean, $\\sigma=${solution.sd}$ and $n=${sizeOf(solution)}$, make $E=${latex}$.`),
        hint: say('Aukeratu maila: $E={z}_{\\alpha/2}\\,\\frac{\\sigma}{\\sqrt{n}}$.', 'Elige el nivel: $E={z}_{\\alpha/2}\\,\\frac{\\sigma}{\\sqrt{n}}$.', 'اختر المستوى: $E={z}_{\\alpha/2}\\,\\frac{\\sigma}{\\sqrt{n}}$.', 'Choose the level: $E={z}_{\\alpha/2}\\,\\frac{\\sigma}{\\sqrt{n}}$.'),
        isSolved: (state) => state.mode === 'mean' && state.sd === solution.sd && sizeOf(state) === sizeOf(solution) && Math.abs(errorOf(state) - error) < 1e-9,
        solution
    }
}

export const marginExtra = freshFrom(initialMarginState, marginMaker)
