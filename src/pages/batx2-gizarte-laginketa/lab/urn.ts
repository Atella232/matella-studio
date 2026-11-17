import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { say } from '../../batx2-zientziak-probabilitatea/lab/probability.ts'

/* ==========================================================================
   M-L1 · Batez bestekoen kutxa (La urna de las medias): an urn with a few
   numbered balls. The learner picks the sample size n; the tool lists
   ALL the samples of size n (with replacement, kⁿ of them) and stacks
   their means. The mean of the means is always μ and their deviation is
   σ/√n; with the lopsided urn the means begin to look like a bell as n
   grows. Before ▶, the learner guesses whether the means are more,
   equally or less spread than the balls. Pure logic.
   ========================================================================== */

export const URNS: number[][] = [[2, 4, 6], [1, 2, 3, 4, 5], [0, 0, 0, 4]]
export const URN_LIMITS = { n: { min: 1, max: 4 } } as const

export interface UrnState {
    urn: number
    n: number
    prediction: Prediction | null
}

export const initialUrnState: UrnState = { urn: 0, n: 1, prediction: null }

export function setUrn(state: UrnState, patch: Partial<Pick<UrnState, 'urn' | 'n'>>): UrnState {
    const urn = Math.min(URNS.length - 1, Math.max(0, Math.round(patch.urn ?? state.urn)))
    const n = Math.min(URN_LIMITS.n.max, Math.max(URN_LIMITS.n.min, Math.round(patch.n ?? state.n)))
    return urn === state.urn && n === state.n ? state : { urn, n, prediction: null }
}

type Params = Pick<UrnState, 'urn' | 'n'>

export const balls = (state: Pick<UrnState, 'urn'>) => URNS[state.urn]
export const populationMean = (state: Pick<UrnState, 'urn'>) => balls(state).reduce((a, b) => a + b, 0) / balls(state).length
export function populationVariance(state: Pick<UrnState, 'urn'>): number {
    const mean = populationMean(state)
    return balls(state).reduce((total, value) => total + (value - mean) ** 2, 0) / balls(state).length
}
export const sampleCount = (state: Params) => balls(state).length ** state.n
export const meansDeviation = (state: Params) => Math.sqrt(populationVariance(state) / state.n)

/** How many of the kⁿ samples give each sum, from the smallest sum to the largest */
export function sums(state: Params): Array<[number, number]> {
    let table = new Map<number, number>([[0, 1]])
    for (let draw = 0; draw < state.n; draw += 1) {
        const next = new Map<number, number>()
        for (const [sum, count] of table) for (const value of balls(state)) next.set(sum + value, (next.get(sum + value) ?? 0) + count)
        table = next
    }
    return [...table].sort((a, b) => a[0] - b[0])
}

/** The mean of all the sample means, which is always μ */
export function meanOfMeans(state: Params): number {
    const total = sums(state).reduce((acc, [sum, count]) => acc + (sum / state.n) * count, 0)
    return total / sampleCount(state)
}

/** The deviation of all the sample means, worked out from the list itself */
export function deviationOfMeans(state: Params): number {
    const mean = meanOfMeans(state)
    const total = sums(state).reduce((acc, [sum, count]) => acc + (sum / state.n - mean) ** 2 * count, 0)
    return Math.sqrt(total / sampleCount(state))
}

/** Means more spread (>), equally spread (=) or less spread (<) than the balls */
export const urnPrediction = (state: Params): Prediction => (state.n === 1 ? '=' : '<')

/* ---------- Challenges ---------- */

export const urnLatex = (index: number) => `\\{${URNS[index].join(',\\ ')}\\}`
const all = (text: string) => say(text, text, text, text)

export const urnChallenges: LabChallenge<UrnState>[] = [
    { id: 152101, prompt: say(`$${urnLatex(1)}$ kutxarekin, egin 125 lagin egotea.`, `Con la urna $${urnLatex(1)}$, haz que haya 125 muestras.`, `مع الصندوق $${urnLatex(1)}$، اجعل عدد العيّنات 125.`, `With the urn $${urnLatex(1)}$, make there be 125 samples.`), hint: all('$5^n=125$'), isSolved: (state) => state.urn === 1 && state.n === 3 },
    { id: 152102, prompt: say('Egin batez bestekoen desbideratzea $\\sigma$ zenbakiaren erdia izatea.', 'Haz que la desviación de las medias sea la mitad de $\\sigma$.', 'اجعل انحراف المتوسطات نصف $\\sigma$.', 'Make the deviation of the means half of $\\sigma$.'), hint: all('$\\frac{\\sigma}{\\sqrt{n}}=\\frac{\\sigma}{2}$'), isSolved: (state) => state.n === 4 },
    { id: 152103, prompt: say(`Kutxa okerrarekin, $${urnLatex(2)}$, hartu ahalik eta lagin handienak: batez bestekoak kanpai bihurtzen hasten dira.`, `Con la urna torcida, $${urnLatex(2)}$, toma las muestras más grandes posibles: las medias empiezan a ser una campana.`, `مع الصندوق المائل $${urnLatex(2)}$، خذ أكبر عيّنات ممكنة: تبدأ المتوسطات تصبح جرسًا.`, `With the lopsided urn, $${urnLatex(2)}$, take the largest samples you can: the means start to become a bell.`), hint: say('Laginaren tamaina, gehienez.', 'El tamaño de muestra, al máximo.', 'حجم العيّنة إلى أقصاه.', 'The sample size, as large as it goes.'), isSolved: (state) => state.urn === 2 && state.n === 4 }
]

/** Endless practice: a number of samples, or a deviation σ/√n */
const urnMaker: LabChallengeMaker<UrnState> = (random) => {
    const urn = randomInt(random, 0, URNS.length - 1)
    const n = randomInt(random, 2, 4)
    const solution: UrnState = { urn, n, prediction: null }
    if (pick(random, ['count', 'deviation'] as const) === 'count') {
        const count = sampleCount(solution)
        return {
            prompt: say(`$${urnLatex(urn)}$ kutxarekin, egin ${count} lagin egotea.`, `Con la urna $${urnLatex(urn)}$, haz que haya ${count} muestras.`, `مع الصندوق $${urnLatex(urn)}$، اجعل عدد العيّنات ${count}.`, `With the urn $${urnLatex(urn)}$, make there be ${count} samples.`),
            hint: all(`$${URNS[urn].length}^n=${count}$`),
            isSolved: (state) => state.urn === urn && state.n === n,
            solution
        }
    }
    return {
        prompt: say(`$${urnLatex(urn)}$ kutxarekin, egin batez bestekoen desbideratzea $\\frac{\\sigma}{\\sqrt{${n}}}$ izatea.`, `Con la urna $${urnLatex(urn)}$, haz que la desviación de las medias sea $\\frac{\\sigma}{\\sqrt{${n}}}$.`, `مع الصندوق $${urnLatex(urn)}$، اجعل انحراف المتوسطات $\\frac{\\sigma}{\\sqrt{${n}}}$.`, `With the urn $${urnLatex(urn)}$, make the deviation of the means $\\frac{\\sigma}{\\sqrt{${n}}}$.`),
        hint: say('Laginaren tamaina, $n$, errotik ateratzen da.', 'El tamaño de la muestra, $n$, va bajo la raíz.', 'حجم العيّنة $n$ تحت الجذر.', 'The sample size, $n$, goes under the root.'),
        isSolved: (state) => state.urn === urn && state.n === n,
        solution
    }
}

export const urnExtra = freshFrom(initialUrnState, urnMaker)
