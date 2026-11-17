import { createRandom, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { say } from '../../batx2-zientziak-probabilitatea/lab/probability.ts'

/* ==========================================================================
   M-L2 · Lagin asko (Muchas muestras): a population that is far from
   normal (the weekly spending of a town, with many small amounts and a
   few large ones) or a yes/no question with p = 0,3. ▶ draws 500 samples
   of size n (with a fixed seed, so the same n always gives the same
   drawing) and stacks their means or proportions; the bell
   N(μ; σ/√n) or N(p; √(pq/n)) stands on top. The learner guesses what
   share of the 500 falls within μ ± 2σ/√n. Pure logic.
   ========================================================================== */

export type ManyMode = 'mean' | 'proportion'

export interface ManyState {
    mode: ManyMode
    /** Index into MANY_SIZES */
    size: number
    prediction: Prediction | null
}

export const MANY_SIZES = [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
export const MANY_RUNS = 500
/** Weekly spending in euros and how often each amount appears: μ = 20 and σ² = 600 */
export const SPENDING = { values: [0, 10, 20, 50, 80], weights: [0.3, 0.3, 0.2, 0.1, 0.1] }
export const YES = 0.3

export const initialManyState: ManyState = { mode: 'mean', size: 0, prediction: null }

export function setMany(state: ManyState, patch: Partial<Pick<ManyState, 'mode' | 'size'>>): ManyState {
    const mode = patch.mode ?? state.mode
    const size = Math.min(MANY_SIZES.length - 1, Math.max(0, Math.round(patch.size ?? state.size)))
    return mode === state.mode && size === state.size ? state : { mode, size, prediction: null }
}

type Params = Pick<ManyState, 'mode' | 'size'>

export const sizeOf = (state: Pick<ManyState, 'size'>) => MANY_SIZES[state.size]
export const centreOf = (state: Pick<ManyState, 'mode'>) => (state.mode === 'mean' ? 20 : YES)
export const populationDeviation = (state: Pick<ManyState, 'mode'>) => (state.mode === 'mean' ? Math.sqrt(600) : Math.sqrt(YES * (1 - YES)))
export const statisticDeviation = (state: Params) => populationDeviation(state) / Math.sqrt(sizeOf(state))
/** np ≥ 5 and nq ≥ 5 for proportions; for means the bell is always drawn, to compare */
export const bellFits = (state: Params) => state.mode === 'mean' || (sizeOf(state) * YES >= 5 && sizeOf(state) * (1 - YES) >= 5)

function draw(random: () => number): number {
    let u = random()
    for (let index = 0; index < SPENDING.values.length; index += 1) {
        u -= SPENDING.weights[index]
        if (u < 0) return SPENDING.values[index]
    }
    return SPENDING.values[SPENDING.values.length - 1]
}

/** The 500 means or proportions, always the same for the same mode and n */
export function simulate(state: Params): number[] {
    const n = sizeOf(state)
    const random = createRandom(n * 131 + (state.mode === 'mean' ? 17 : 59))
    return Array.from({ length: MANY_RUNS }, () => {
        let total = 0
        for (let person = 0; person < n; person += 1) total += state.mode === 'mean' ? draw(random) : random() < YES ? 1 : 0
        return total / n
    })
}

/** The share of the 500 that falls between two values (both included) */
export function shareBetween(state: Params, low: number, high: number): number {
    return simulate(state).filter((value) => value >= low - 1e-9 && value <= high + 1e-9).length / MANY_RUNS
}

/** The share within μ ± 2σ/√n */
export function shareWithinTwo(state: Params): number {
    const centre = centreOf(state)
    const radius = 2 * statisticDeviation(state)
    return shareBetween(state, centre - radius, centre + radius)
}

/** Under 90 % (<), about 95 % (=) or over 99 % (>) */
export function manyPrediction(state: Params): Prediction {
    const share = shareWithinTwo(state)
    return share < 0.9 ? '<' : share > 0.99 ? '>' : '='
}

/* ---------- Challenges ---------- */

export const manyChallenges: LabChallenge<ManyState>[] = [
    { id: 152121, prompt: say('Gastuarekin, egin batez bestekoen desbideratzea $\\sigma$ baino 3 aldiz txikiagoa izatea.', 'Con el gasto, haz que la desviación de las medias sea 3 veces menor que $\\sigma$.', 'مع الإنفاق، اجعل انحراف المتوسطات أصغر من $\\sigma$ بثلاث مرات.', 'With the spending, make the deviation of the means 3 times smaller than $\\sigma$.'), hint: say('$\\sqrt{n}=3$', '$\\sqrt{n}=3$', '$\\sqrt{n}=3$', '$\\sqrt{n}=3$'), isSolved: (state) => state.mode === 'mean' && sizeOf(state) === 9 },
    { id: 152122, prompt: say('Proportzioekin, aukeratu kanpaia erabiltzeko lagin txikiena.', 'Con proporciones, elige la muestra más pequeña con la que vale la campana.', 'مع النسب، اختر أصغر عيّنة يصلح معها الجرس.', 'With proportions, choose the smallest sample for which the bell works.'), hint: say('$np\\ge 5$ eta $nq\\ge 5$, $p=0{,}3$ izanik.', '$np\\ge 5$ y $nq\\ge 5$, con $p=0{,}3$.', '$np\\ge 5$ و$nq\\ge 5$ مع $p=0{,}3$.', '$np\\ge 5$ and $nq\\ge 5$, with $p=0{,}3$.'), isSolved: (state) => state.mode === 'proportion' && sizeOf(state) === 25 },
    { id: 152123, prompt: say('Proportzioekin, egin 500 laginetatik % 90 baino gehiagok 0,2 eta 0,4 arteko $\\hat{p}$ ematea.', 'Con proporciones, haz que más del 90 % de las 500 muestras dé un $\\hat{p}$ entre 0,2 y 0,4.', 'مع النسب، اجعل أكثر من 90 % من العيّنات الـ 500 تعطي $\\hat{p}$ بين 0.2 و0.4.', 'With proportions, make more than 90% of the 500 samples give a $\\hat{p}$ between 0.2 and 0.4.'), hint: say('Lagina handitu: $\\hat{p}$ balioak 0,3 zenbakiaren ondora biltzen dira.', 'Agranda la muestra: los $\\hat{p}$ se juntan cerca de 0,3.', 'كبّر العيّنة: تتجمع قيم $\\hat{p}$ قرب 0.3.', 'Make the sample bigger: the $\\hat{p}$ values gather near 0.3.'), isSolved: (state) => state.mode === 'proportion' && shareBetween(state, 0.2, 0.4) > 0.9 }
]

/** Endless practice: a deviation of the means σ/k */
const manyMaker: LabChallengeMaker<ManyState> = (random) => {
    const k = randomInt(random, 2, 10)
    const solution: ManyState = { mode: 'mean', size: MANY_SIZES.indexOf(k * k), prediction: null }
    return {
        prompt: say(`Gastuarekin, egin batez bestekoen desbideratzea $\\frac{\\sigma}{${k}}$ izatea.`, `Con el gasto, haz que la desviación de las medias sea $\\frac{\\sigma}{${k}}$.`, `مع الإنفاق، اجعل انحراف المتوسطات $\\frac{\\sigma}{${k}}$.`, `With the spending, make the deviation of the means $\\frac{\\sigma}{${k}}$.`),
        hint: say(`$\\sqrt{n}=${k}$`, `$\\sqrt{n}=${k}$`, `$\\sqrt{n}=${k}$`, `$\\sqrt{n}=${k}$`),
        isSolved: (state) => state.mode === 'mean' && sizeOf(state) === k * k,
        solution
    }
}

export const manyExtra = freshFrom(initialManyState, manyMaker)
