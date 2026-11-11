import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { hundredthsLatex, say, tenthsLatex } from '../../batx2-zientziak-probabilitatea/lab/probability.ts'
import { binomialPmfDecimal } from '../binomial.ts'

/* ==========================================================================
   L2 · Makina binomiala (La máquina binomial): n from 1 to 20 and p in
   tenths draw the bars of B(n; p); a value k and a mode («exactly k»,
   «at least k», «at most k») paint the bars that count. The readout gives
   that probability (four decimals, from binomial.ts) with μ = np and
   σ² = npq, exact. Before the number, the learner says whether the
   painted probability is less than, equal to or more than 0,5. Pure.
   ========================================================================== */

export type MachineMode = 'eq' | 'atLeast' | 'atMost'

export interface MachineState {
    n: number
    /** p in tenths */
    p: number
    k: number
    mode: MachineMode
    prediction: Prediction | null
}

export const MACHINE_LIMITS = { n: { min: 1, max: 20 }, p: { min: 1, max: 9 } } as const
export const initialMachineState: MachineState = { n: 10, p: 5, k: 6, mode: 'atLeast', prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export function setMachine(state: MachineState, patch: Partial<Pick<MachineState, 'n' | 'p' | 'k' | 'mode'>>): MachineState {
    const n = clamp(patch.n ?? state.n, MACHINE_LIMITS.n.min, MACHINE_LIMITS.n.max)
    const p = clamp(patch.p ?? state.p, MACHINE_LIMITS.p.min, MACHINE_LIMITS.p.max)
    const k = clamp(patch.k ?? state.k, 0, n)
    const mode = patch.mode ?? state.mode
    const same = n === state.n && p === state.p && k === state.k && mode === state.mode
    return { n, p, k, mode, prediction: same ? state.prediction : null }
}

/** Whether the value j is painted */
export const counts = (state: Pick<MachineState, 'k' | 'mode'>, j: number) => (state.mode === 'eq' ? j === state.k : state.mode === 'atLeast' ? j >= state.k : j <= state.k)

/** The bars of B(n; p) as decimals */
export const barsOf = (state: Pick<MachineState, 'n' | 'p'>) => Array.from({ length: state.n + 1 }, (_, j) => binomialPmfDecimal(state.n, state.p / 10, j))

/** The painted probability, as a decimal */
export const paintedOf = (state: Pick<MachineState, 'n' | 'p' | 'k' | 'mode'>) => barsOf(state).reduce((sum, value, j) => sum + (counts(state, j) ? value : 0), 0)

/** μ = np in tenths and σ² = npq in hundredths */
export const machineMean = (state: Pick<MachineState, 'n' | 'p'>) => state.n * state.p
export const machineVariance = (state: Pick<MachineState, 'n' | 'p'>) => state.n * state.p * (10 - state.p)

/** The painted probability compared with 0,5 */
export const machinePrediction = (state: MachineState): Prediction => compareTo(paintedOf(state), 0.5)

/* ---------- Challenges ---------- */

export const machineChallenges: LabChallenge<MachineState>[] = [
    { id: 129111, prompt: say('Bilatu $\\mu=6$ eta $\\sigma^2=4{,}2$ dituen binomiala.', 'Busca la binomial con $\\mu=6$ y $\\sigma^2=4{,}2$.', 'ابحث عن التوزيع الثنائي الذي فيه $\\mu=6$ و$\\sigma^2=4{,}2$.', 'Find the binomial with $\\mu=6$ and $\\sigma^2=4{,}2$.'), hint: say('$npq$ zati $np$ eginda, $q$ ateratzen da.', 'Dividiendo $npq$ entre $np$ sale $q$.', 'بقسمة $npq$ على $np$ نحصل على $q$.', 'Dividing $npq$ by $np$ gives $q$.'), isSolved: (state) => machineMean(state) === 60 && machineVariance(state) === 420 },
    { id: 129112, prompt: say('$p=0{,}5$ izanik, bilatu $P(X=0)<0{,}01$ betetzen duen $n$ txikiena, eta begiratu $k=0$ balioarekin.', 'Con $p=0{,}5$, busca el menor $n$ con $P(X=0)<0{,}01$ y míralo con $k=0$.', 'مع $p=0{,}5$، ابحث عن أصغر $n$ يحقق $P(X=0)<0{,}01$، وانظر إليه مع $k=0$.', 'With $p=0{,}5$, find the smallest $n$ with $P(X=0)<0{,}01$, and look at it with $k=0$.'), hint: say('$P(X=0)=0{,}5^n$: igo $n$ pixkanaka.', '$P(X=0)=0{,}5^n$: ve subiendo $n$.', '$P(X=0)=0{,}5^n$: زِد $n$ شيئًا فشيئًا.', '$P(X=0)=0{,}5^n$: raise $n$ step by step.'), isSolved: (state) => state.p === 5 && state.n === 7 && state.k === 0 && state.mode === 'eq' },
    { id: 129113, prompt: say('$B(10;\\,0{,}5)$ banaketan, margotu «gutxienez $k$», 0,06 baino gutxiago uzten duen $k$ txikienarekin.', 'En $B(10;\\,0{,}5)$, pinta «al menos $k$» con la $k$ más pequeña que deje menos de 0,06.', 'في $B(10;\\,0{,}5)$، لوّن «$k$ على الأقل» بأصغر $k$ تترك أقل من 0.06.', 'In $B(10;\\,0{,}5)$, paint ‘at least $k$’ with the smallest $k$ that leaves less than 0.06.'), hint: say('Igo $k$ pixkanaka eta begiratu balioari.', 'Ve subiendo $k$ y mira el valor.', 'زِد $k$ شيئًا فشيئًا وانظر إلى القيمة.', 'Raise $k$ step by step and watch the value.'), isSolved: (state) => state.n === 10 && state.p === 5 && state.mode === 'atLeast' && state.k === 8 }
]

/** Endless practice: the binomial with a given μ and σ², which fix n and p */
const machineMaker: LabChallengeMaker<MachineState> = (random) => {
    const n = randomInt(random, 2, 20)
    const p = randomInt(random, 1, 9)
    const solution: MachineState = { n, p, k: 0, mode: 'atLeast', prediction: null }
    const mean = machineMean(solution)
    const variance = machineVariance(solution)
    return {
        prompt: say(`Bilatu $\\mu=${tenthsLatex(mean)}$ eta $\\sigma^2=${hundredthsLatex(variance)}$ dituen binomiala.`, `Busca la binomial con $\\mu=${tenthsLatex(mean)}$ y $\\sigma^2=${hundredthsLatex(variance)}$.`, `ابحث عن التوزيع الثنائي الذي فيه $\\mu=${tenthsLatex(mean)}$ و$\\sigma^2=${hundredthsLatex(variance)}$.`, `Find the binomial with $\\mu=${tenthsLatex(mean)}$ and $\\sigma^2=${hundredthsLatex(variance)}$.`),
        hint: say('$q=\\sigma^2\\div\\mu$, eta gero $n=\\mu\\div p$.', '$q=\\sigma^2\\div\\mu$, y después $n=\\mu\\div p$.', '$q=\\sigma^2\\div\\mu$، ثم $n=\\mu\\div p$.', '$q=\\sigma^2\\div\\mu$, and then $n=\\mu\\div p$.'),
        isSolved: (state) => machineMean(state) === mean && machineVariance(state) === variance,
        solution
    }
}

export const machineExtra = freshFrom(initialMachineState, machineMaker)
