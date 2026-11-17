import { createRandom, pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { say } from '../../batx2-zientziak-probabilitatea/lab/probability.ts'
import { criticalZ, decimalLatex } from '../../batx2-gizarte-banaketak/critical.ts'

/* ==========================================================================
   I-L1 · Ehun tarte (Cien intervalos): a population N(50; 10). Each batch
   draws 100 samples of size n (with a fixed seed per batch and n, so the
   same choice always gives the same drawing) and builds the confidence
   interval x̄ ± z·σ/√n of each one at the chosen level. The tool counts
   how many of the 100 catch μ = 50: about 90, 95 or 99, but not always
   exactly. Before ▶, the learner guesses how many will catch μ. Pure
   logic.
   ========================================================================== */

export const HUNDRED_MEAN = 50
export const HUNDRED_SD = 10
export const HUNDRED_RUNS = 100
export const HUNDRED_LEVELS = [90, 95, 99] as const
export const HUNDRED_SIZES = [4, 9, 16, 25, 36, 64, 100]
export const HUNDRED_BATCHES = 20

export interface HundredState {
    /** Index into HUNDRED_LEVELS */
    level: number
    /** Index into HUNDRED_SIZES */
    size: number
    batch: number
    prediction: Prediction | null
}

export const initialHundredState: HundredState = { level: 1, size: 3, batch: 1, prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export function setHundred(state: HundredState, patch: Partial<Pick<HundredState, 'level' | 'size' | 'batch'>>): HundredState {
    const level = clamp(patch.level ?? state.level, 0, HUNDRED_LEVELS.length - 1)
    const size = clamp(patch.size ?? state.size, 0, HUNDRED_SIZES.length - 1)
    const batch = clamp(patch.batch ?? state.batch, 1, HUNDRED_BATCHES)
    return level === state.level && size === state.size && batch === state.batch ? state : { level, size, batch, prediction: null }
}

type Params = Pick<HundredState, 'level' | 'size' | 'batch'>

export const levelOf = (state: Pick<HundredState, 'level'>) => HUNDRED_LEVELS[state.level]
export const sizeOf = (state: Pick<HundredState, 'size'>) => HUNDRED_SIZES[state.size]
export const zOf = (state: Pick<HundredState, 'level'>) => criticalZ(levelOf(state))
export const errorOf = (state: Pick<HundredState, 'level' | 'size'>) => (zOf(state) * HUNDRED_SD) / Math.sqrt(sizeOf(state))

/** A standard normal number from two uniform ones (Box–Muller) */
function gauss(random: () => number): number {
    const u = Math.max(random(), 1e-12)
    const v = random()
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
}

/** The 100 sample means of a batch: the same for the same n and batch, whatever the level */
export function means(state: Pick<HundredState, 'size' | 'batch'>): number[] {
    const random = createRandom(state.batch * 7919 + sizeOf(state) * 101 + 13)
    const sd = HUNDRED_SD / Math.sqrt(sizeOf(state))
    return Array.from({ length: HUNDRED_RUNS }, () => HUNDRED_MEAN + gauss(random) * sd)
}

/** How many of the 100 intervals catch μ */
export function hits(state: Params): number {
    const error = errorOf(state)
    return means(state).filter((mean) => Math.abs(mean - HUNDRED_MEAN) <= error).length
}

/** Fewer than the level minus 3 (<), about the level (=) or more than the level plus 3, all of them included (>) */
export function hundredPrediction(state: Params): Prediction {
    const caught = hits(state)
    const level = levelOf(state)
    return caught < level - 3 ? '<' : caught > level + 3 || caught === HUNDRED_RUNS ? '>' : '='
}

/* ---------- Challenges ---------- */

export const hundredChallenges: LabChallenge<HundredState>[] = [
    { id: 153101, prompt: say('% 95 mailan, egin tarteak ahalik eta estuenak.', 'Al 95 %, haz los intervalos lo más estrechos posible.', 'عند 95 %، اجعل الفترات أضيق ما يمكن.', 'At 95%, make the intervals as narrow as you can.'), hint: say('$n$ handiena.', 'La $n$ mayor.', 'أكبر $n$.', 'The biggest $n$.'), isSolved: (state) => levelOf(state) === 95 && sizeOf(state) === 100 },
    { id: 153102, prompt: say('% 90 mailan, aurkitu sorta bat non 12 tartek edo gehiagok huts egiten duten.', 'Al 90 %, encuentra una tanda en la que fallen 12 intervalos o más.', 'عند 90 %، جد دفعة تخطئ فيها 12 فترة أو أكثر.', 'At 90%, find a batch in which 12 or more intervals miss.'), hint: say('Aldatu sorta: zoriak gora eta behera egiten du.', 'Cambia de tanda: el azar sube y baja.', 'غيّر الدفعة: الصدفة تصعد وتنزل.', 'Change the batch: chance goes up and down.'), isSolved: (state) => levelOf(state) === 90 && HUNDRED_RUNS - hits(state) >= 12 },
    { id: 153103, prompt: say('% 99 mailan eta $n=25$ izanik, aurkitu sorta bat non 100 tarteek $\\mu$ harrapatzen duten.', 'Al 99 % y con $n=25$, encuentra una tanda en la que los 100 intervalos atrapen $\\mu$.', 'عند 99 % ومع $n=25$، جد دفعة تلتقط فيها الفترات المئة $\\mu$.', 'At 99% and with $n=25$, find a batch in which all 100 intervals catch $\\mu$.'), hint: say('% 99 mailan, 1 inguruk bakarrik huts egiten du.', 'Al 99 % solo falla 1, más o menos.', 'عند 99 % يخطئ نحو 1 فقط.', 'At 99% only about 1 misses.'), isSolved: (state) => levelOf(state) === 99 && sizeOf(state) === 25 && hits(state) === HUNDRED_RUNS }
]

/** Endless practice: an error E = z·σ/√n for a level and a size */
const hundredMaker: LabChallengeMaker<HundredState> = (random) => {
    const level = randomInt(random, 0, HUNDRED_LEVELS.length - 1)
    const size = randomInt(random, 0, HUNDRED_SIZES.length - 1)
    const solution: HundredState = { level, size, batch: pick(random, [1, 2, 3]), prediction: null }
    const error = decimalLatex(Math.round(errorOf(solution) * 1000) / 1000)
    return {
        prompt: say(`Egin tarte bakoitzaren errorea $E=${error}$ izatea.`, `Haz que el error de cada intervalo sea $E=${error}$.`, `اجعل خطأ كل فترة $E=${error}$.`, `Make the error of each interval $E=${error}$.`),
        hint: say('$E={z}_{\\alpha/2}\\,\\frac{10}{\\sqrt{n}}$', '$E={z}_{\\alpha/2}\\,\\frac{10}{\\sqrt{n}}$', '$E={z}_{\\alpha/2}\\,\\frac{10}{\\sqrt{n}}$', '$E={z}_{\\alpha/2}\\,\\frac{10}{\\sqrt{n}}$'),
        isSolved: (state) => Math.abs(errorOf(state) - errorOf(solution)) < 1e-9,
        solution
    }
}

export const hundredExtra = freshFrom(initialHundredState, hundredMaker)
