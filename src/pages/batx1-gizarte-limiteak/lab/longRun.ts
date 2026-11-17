import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { same, say } from '../text.ts'

/* ==========================================================================
   L1 · Epe luzera (A largo plazo): a model f(t) = (A·t + B)/(t + C), the
   shape of a population that levels off or of an average cost that
   falls. It starts at f(0) = B/C and, in the long run, tends to A (same
   degree on top and below). Before the curve is drawn the learner
   predicts whether the long-run value is below, equal to or above the
   start; ▶ runs t along the axis while a table shows f(1), f(10),
   f(100) and f(1000) closing in on A.
   ========================================================================== */

export const LONG_RUN_LIMITS = { A: { min: 0, max: 12 }, B: { min: 0, max: 60 }, C: { min: 1, max: 6 } } as const
/** The last t drawn on the board */
export const LONG_RUN_T = 40

export interface LongRunState {
    A: number
    B: number
    C: number
    prediction: Prediction | null
}

export const initialLongRunState: LongRunState = { A: 6, B: 4, C: 2, prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export function setLongRun(state: LongRunState, patch: Partial<Omit<LongRunState, 'prediction'>>): LongRunState {
    const A = clamp(patch.A ?? state.A, LONG_RUN_LIMITS.A.min, LONG_RUN_LIMITS.A.max)
    const B = clamp(patch.B ?? state.B, LONG_RUN_LIMITS.B.min, LONG_RUN_LIMITS.B.max)
    const C = clamp(patch.C ?? state.C, LONG_RUN_LIMITS.C.min, LONG_RUN_LIMITS.C.max)
    const unchanged = A === state.A && B === state.B && C === state.C
    return { A, B, C, prediction: unchanged ? state.prediction : null }
}

export const longRunAt = (state: Pick<LongRunState, 'A' | 'B' | 'C'>, t: number) => (state.A * t + state.B) / (t + state.C)
export const startOf = (state: Pick<LongRunState, 'B' | 'C'>) => state.B / state.C

/** The long-run value A against the start B/C, compared as A·C against B so that it stays exact */
export const longRunPrediction = (state: LongRunState): Prediction => compareTo(state.A * state.C, state.B)

export const longRunChallenges: LabChallenge<LongRunState>[] = [
    {
        id: 135101,
        prompt: say('Lortu 2 baliotik hastea eta, epe luzera, 8 baliora hurbiltzea.', 'Consigue que empiece en 2 y que, a la larga, se acerque a 8.', 'اجعلها تبدأ من 2 وتقترب على المدى البعيد من 8.', 'Make it start at 2 and, in the long run, approach 8.'),
        hint: same('$\\frac{B}{C}=2\\qquad A=8$'),
        isSolved: (state) => state.A === 8 && state.B === 2 * state.C
    },
    {
        id: 135102,
        prompt: say('Batez besteko kostu bat: 30 eurotik hasi, eta 5 eurora jaitsi epe luzera.', 'Un coste medio: que empiece en 30 € y baje hacia 5 € a la larga.', 'تكلفة متوسطة: تبدأ من 30 € وتنزل نحو 5 € على المدى البعيد.', 'An average cost: start at €30 and fall towards €5 in the long run.'),
        hint: say('Hasiera $\\frac{B}{C}$ da, eta epe luzera $A$.', 'El comienzo es $\\frac{B}{C}$ y el largo plazo, $A$.', 'البداية $\\frac{B}{C}$ والمدى البعيد $A$.', 'The start is $\\frac{B}{C}$ and the long run, $A$.'),
        isSolved: (state) => state.A === 5 && state.B === 30 * state.C
    },
    {
        id: 135103,
        prompt: say('Lortu funtzioak ez aldatzea inoiz: hasiera eta epe luzea berdinak.', 'Consigue que la función no cambie nunca: el comienzo y el largo plazo, iguales.', 'اجعل الدالة لا تتغير أبدًا: البداية والمدى البعيد متساويان.', 'Make the function never change: the start and the long run equal.'),
        hint: same('$\\frac{B}{C}=A$'),
        isSolved: (state) => state.A > 0 && state.A * state.C === state.B
    },
    {
        id: 135104,
        prompt: say('$A=8$ denean, lortu $f(10)$ zehazki 6 izatea.', 'Con $A=8$, consigue que $f(10)$ valga exactamente 6.', 'مع $A=8$، اجعل $f(10)$ تساوي 6 تمامًا.', 'With $A=8$, make $f(10)$ exactly 6.'),
        hint: same('$\\frac{80+B}{10+C}=6$'),
        isSolved: (state) => state.A === 8 && 80 + state.B === 6 * (10 + state.C)
    },
    {
        id: 135105,
        prompt: say('0 baliotik hasi, eta $t=3$ denean epe luzeko balioaren erdia izan.', 'Que empiece en 0 y en $t=3$ tenga la mitad del valor a largo plazo.', 'اجعلها تبدأ من 0 وتبلغ عند $t=3$ نصف قيمتها على المدى البعيد.', 'Start at 0 and at $t=3$ have half the long-run value.'),
        hint: say('$B=0$ denean, $f(C)=\\frac{A}{2}$.', 'Con $B=0$, $f(C)=\\frac{A}{2}$.', 'مع $B=0$ يكون $f(C)=\\frac{A}{2}$.', 'With $B=0$, $f(C)=\\frac{A}{2}$.'),
        isSolved: (state) => state.A > 0 && state.B === 0 && state.C === 3
    }
]

/** Endless practice: a start and a long-run value to build */
const longRunMaker: LabChallengeMaker<LongRunState> = (random) => {
    for (;;) {
        const A = randomInt(random, 1, 12)
        const start = randomInt(random, 0, 15)
        if (start === A) continue
        const C = [1, 2, 3, 4, 5, 6].find((value) => start * value <= LONG_RUN_LIMITS.B.max && value > 1) ?? 1
        if (start * C > LONG_RUN_LIMITS.B.max) continue
        return {
            prompt: say(`Lortu ${start} baliotik hastea eta, epe luzera, ${A} baliora hurbiltzea.`, `Consigue que empiece en ${start} y que, a la larga, se acerque a ${A}.`, `اجعلها تبدأ من ${start} وتقترب على المدى البعيد من ${A}.`, `Make it start at ${start} and, in the long run, approach ${A}.`),
            hint: same(`$\\frac{B}{C}=${start}\\qquad A=${A}$`),
            isSolved: (state) => state.A === A && state.B === start * state.C,
            solution: { A, B: start * C, C, prediction: null }
        }
    }
}

export const longRunExtra = freshFrom(initialLongRunState, longRunMaker)
