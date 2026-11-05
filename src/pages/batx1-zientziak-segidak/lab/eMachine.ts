import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L3 · e zenbakiaren makina (La máquina de e): one euro at a yearly rate
   k (100 %, 200 % or 300 %), with the interest paid n times a year. Each
   payment multiplies by 1 + k/n, so after a year there is (1 + k/n)ⁿ: the
   staircase on the board, next to the smooth curve e^(kt). The learner
   first predicts whether the year ends below or above a mark just under
   eᵏ (2,7 for k = 1); ▶ then climbs the staircase. However many
   payments, the staircase never passes eᵏ. Pure logic.
   ========================================================================== */

export const E_PAYMENTS = [1, 2, 4, 12, 52, 365, 1000] as const
export const E_RATES = [1, 2, 3] as const

export interface EMachineState {
    /** Index in E_RATES */
    rate: number
    /** Index in E_PAYMENTS */
    payments: number
    prediction: Prediction | null
}

export const initialEMachineState: EMachineState = { rate: 0, payments: 2, prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export function setEMachine(state: EMachineState, patch: Partial<Omit<EMachineState, 'prediction'>>): EMachineState {
    const rate = clamp(patch.rate ?? state.rate, 0, E_RATES.length - 1)
    const payments = clamp(patch.payments ?? state.payments, 0, E_PAYMENTS.length - 1)
    const same = rate === state.rate && payments === state.payments
    return { rate, payments, prediction: same ? state.prediction : null }
}

/** (1 + k/n)ⁿ: what one euro becomes in a year */
export const eValue = ({ rate, payments }: Pick<EMachineState, 'rate' | 'payments'>) => (1 + E_RATES[rate] / E_PAYMENTS[payments]) ** E_PAYMENTS[payments]
/** The limit eᵏ */
export const eLimit = (rate: number) => Math.exp(E_RATES[rate])
/** The mark of the prediction: eᵏ cut to one decimal (2,7; 7,3; 20) */
export const eMark = (rate: number) => Math.floor(eLimit(rate) * 10) / 10
/** Below, on or above the mark */
export const eMachinePrediction = (state: EMachineState): Prediction => compareTo(eValue(state), eMark(state.rate))

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const tex = (value: number) => String(value).replace('.', '{,}')

/** «k = …: the smallest n of the list with (1 + k/n)ⁿ > t» */
function askSmallest(rate: number, threshold: number): LocalizedText {
    const k = E_RATES[rate]
    const power = `\\left(1+\\frac{${k}}{n}\\right)^n>${tex(threshold)}`
    return say(
        `$k=${k}$ denean, aukeratu zerrendako $n$ txikiena, $${power}$ izan dadin.`,
        `Con $k=${k}$, elige el $n$ más pequeño de la lista con $${power}$.`,
        `مع $k=${k}$ اختر أصغر $n$ في القائمة يحقق $${power}$.`,
        `With $k=${k}$, choose the smallest $n$ on the list with $${power}$.`
    )
}

const tryMore = say('Igo $n$ urratsez urrats, eta begiratu urte amaierako dirua.', 'Sube $n$ paso a paso y mira el dinero al final del año.', 'زد $n$ خطوة خطوة وانظر إلى المال في آخر السنة.', 'Raise $n$ step by step and watch the money at the end of the year.')

export const eMachineChallenges: LabChallenge<EMachineState>[] = [
    { id: 100301, prompt: askSmallest(0, 2.7), hint: tryMore, isSolved: (state) => state.rate === 0 && state.payments === 5 },
    { id: 100302, prompt: askSmallest(1, 7), hint: tryMore, isSolved: (state) => state.rate === 1 && state.payments === 4 },
    { id: 100303, prompt: say('Interesa urtean behin ordaintzen da ($n=1$), eta $k=1$: dirua bikoiztu egiten da. Jarri egoera hori.', 'El interés se paga una vez al año ($n=1$) y $k=1$: el dinero se duplica. Prepara ese caso.', 'تُدفع الفائدة مرة في السنة ($n=1$) و$k=1$: يتضاعف المال. حضّر هذه الحالة.', 'The interest is paid once a year ($n=1$) and $k=1$: the money doubles. Set up that case.'), hint: say('$\\left(1+\\frac{1}{1}\\right)^1=2$', '$\\left(1+\\frac{1}{1}\\right)^1=2$', '$\\left(1+\\frac{1}{1}\\right)^1=2$', '$\\left(1+\\frac{1}{1}\\right)^1=2$'), isSolved: (state) => state.rate === 0 && state.payments === 0 },
    { id: 100304, prompt: say('$k=3$ eta $n=1000$ jarrita, ia $e^3$ dago. Lortu, eta begiratu ez dela $e^3$ zenbakira iristen.', 'Con $k=3$ y $n=1000$ hay casi $e^3$. Consíguelo y mira que no llega a $e^3$.', 'مع $k=3$ و$n=1000$ يكون المال تقريبًا $e^3$. حضّر ذلك ولاحظ أنه لا يبلغ $e^3$.', 'With $k=3$ and $n=1000$ there is almost $e^3$. Set it up and see that it does not reach $e^3$.'), hint: say('Jarri $k=3$ eta zerrendako azken $n$.', 'Pon $k=3$ y el último $n$ de la lista.', 'ضع $k=3$ وآخر $n$ في القائمة.', 'Set $k=3$ and the last $n$ on the list.'), isSolved: (state) => state.rate === 2 && state.payments === 6 },
    { id: 100305, prompt: askSmallest(2, 14), hint: tryMore, isSolved: (state) => state.rate === 2 && state.payments === 3 }
]

/** Endless practice: a mark between two payments of the list, to be passed with the fewest */
const eMachineMaker: LabChallengeMaker<EMachineState> = (random) => {
    const rate = randomInt(random, 0, E_RATES.length - 1)
    const payments = pick(random, [1, 2, 3, 4, 5, 6])
    const before = eValue({ rate, payments: payments - 1 })
    const after = eValue({ rate, payments })
    const middle = (before + after) / 2
    // The shortest decimal that falls between the two values
    let threshold = middle
    for (const digits of [0, 1, 2, 3]) {
        const candidate = Math.round(middle * 10 ** digits) / 10 ** digits
        if (candidate > before && candidate < after) {
            threshold = candidate
            break
        }
    }
    return {
        prompt: askSmallest(rate, threshold),
        hint: tryMore,
        isSolved: (state) => state.rate === rate && state.payments === payments,
        solution: { rate, payments, prediction: null }
    }
}

export const eMachineExtra = freshFrom(initialEMachineState, eMachineMaker)
