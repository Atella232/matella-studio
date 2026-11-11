import { randomInt, shuffle } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { hundredthsLatex, say, tenthsLatex } from '../../batx2-zientziak-probabilitatea/lab/probability.ts'

/* ==========================================================================
   L1 · Eraiki banaketa (Construye la distribución): five bars for the
   values 0, 1, 2, 3 and 4 of a variable X, each a probability in tenths.
   They are a probability function only when they add up to 1; then the
   mean μ = Σ x·p appears as the point where the bars balance and the
   variance σ² = Σ x²·p − μ² as how far the weight lies from it. Before
   the numbers, the learner says whether μ is less than, equal to or more
   than 2, the middle value. Tenths everywhere, so μ is a number of tenths
   and σ² of hundredths, both exact. Pure logic.
   ========================================================================== */

export const BUILD_VALUES = [0, 1, 2, 3, 4] as const

export interface BuildState {
    /** P(X = x) for x = 0…4, in tenths */
    bars: number[]
    prediction: Prediction | null
}

export const initialBuildState: BuildState = { bars: [3, 3, 2, 1, 1], prediction: null }

const clamp = (value: number) => Math.min(10, Math.max(0, Math.round(value)))

export function setBar(state: BuildState, index: number, value: number): BuildState {
    const next = clamp(value)
    if (next === state.bars[index]) return state
    return { bars: state.bars.map((bar, at) => (at === index ? next : bar)), prediction: null }
}

/** The sum of the bars, in tenths: 10 when they are a probability function */
export const totalOf = (state: Pick<BuildState, 'bars'>) => state.bars.reduce((sum, bar) => sum + bar, 0)
export const isDistribution = (state: Pick<BuildState, 'bars'>) => totalOf(state) === 10

/** μ in tenths: Σ x·P(X = x) */
export const meanTenths = (state: Pick<BuildState, 'bars'>) => state.bars.reduce((sum, bar, x) => sum + x * bar, 0)

/** σ² in hundredths: Σ x²·p − μ², that is (10·Σ x²·bar − (Σ x·bar)²) / 100 */
export function varianceHundredths(state: Pick<BuildState, 'bars'>): number {
    const squares = state.bars.reduce((sum, bar, x) => sum + x * x * bar, 0)
    return 10 * squares - meanTenths(state) ** 2
}

/** μ compared with 2, the value in the middle */
export const buildPrediction = (state: BuildState): Prediction => compareTo(meanTenths(state), 20)

/* ---------- Challenges ---------- */

export const buildChallenges: LabChallenge<BuildState>[] = [
    { id: 129101, prompt: say('Eraiki $\\mu=2$ duen banaketa bat, $P(X=2)=0$ izanik.', 'Construye una distribución con $\\mu=2$ en la que $P(X=2)=0$.', 'ابنِ توزيعًا فيه $\\mu=2$ و$P(X=2)=0$.', 'Build a distribution with $\\mu=2$ in which $P(X=2)=0$.'), hint: say('Banatu pisua 2 zenbakiaren bi aldeetara, distantzia berean.', 'Reparte el peso a los dos lados del 2, a la misma distancia.', 'وزّع الوزن على جانبي 2 بالمسافة نفسها.', 'Share the weight on both sides of 2, at the same distance.'), isSolved: (state) => isDistribution(state) && meanTenths(state) === 20 && state.bars[2] === 0 },
    { id: 129102, prompt: say('Eraiki $\\mu=3$ eta $\\sigma^2=1$ dituen banaketa bat.', 'Construye una distribución con $\\mu=3$ y $\\sigma^2=1$.', 'ابنِ توزيعًا فيه $\\mu=3$ و$\\sigma^2=1$.', 'Build a distribution with $\\mu=3$ and $\\sigma^2=1$.'), hint: say('Saiatu 3 zenbakitik distantzia berera dauden bi balioekin, bakoitza 0,5 probabilitatearekin.', 'Prueba con dos valores a la misma distancia de 3, cada uno con 0,5.', 'جرّب قيمتين على المسافة نفسها من 3، لكل منهما 0.5.', 'Try two values at the same distance from 3, each with 0.5.'), isSolved: (state) => isDistribution(state) && meanTenths(state) === 30 && varianceHundredths(state) === 100 },
    { id: 129103, prompt: say('Egin $\\sigma^2$ ahalik eta handiena izatea.', 'Haz que $\\sigma^2$ sea lo más grande posible.', 'اجعل $\\sigma^2$ أكبر ما يمكن.', 'Make $\\sigma^2$ as large as possible.'), hint: say('Bariantza hazi egiten da pisua muturretara doanean: 0 eta 4.', 'La varianza crece cuando el peso se va a los extremos: 0 y 4.', 'يكبر التباين عندما يذهب الوزن إلى الطرفين: 0 و4.', 'The variance grows when the weight moves to the ends: 0 and 4.'), isSolved: (state) => isDistribution(state) && varianceHundredths(state) === 400 }
]

/** Endless practice: a random distribution, given by its μ and σ² */
const buildMaker: LabChallengeMaker<BuildState> = (random) => {
    const bars = [0, 0, 0, 0, 0]
    const used = randomInt(random, 2, 4)
    const values = shuffle(random, [0, 1, 2, 3, 4]).slice(0, used)
    for (let unit = 0; unit < 10; unit += 1) bars[values[randomInt(random, 0, used - 1)]] += 1
    const solution: BuildState = { bars, prediction: null }
    const mean = meanTenths(solution)
    const variance = varianceHundredths(solution)
    return {
        prompt: say(`Eraiki $\\mu=${tenthsLatex(mean)}$ eta $\\sigma^2=${hundredthsLatex(variance)}$ dituen banaketa bat.`, `Construye una distribución con $\\mu=${tenthsLatex(mean)}$ y $\\sigma^2=${hundredthsLatex(variance)}$.`, `ابنِ توزيعًا فيه $\\mu=${tenthsLatex(mean)}$ و$\\sigma^2=${hundredthsLatex(variance)}$.`, `Build a distribution with $\\mu=${tenthsLatex(mean)}$ and $\\sigma^2=${hundredthsLatex(variance)}$.`),
        hint: say('Lehenik batu 1; gero mugitu pisua $\\mu$ lortu arte, eta zabaldu edo bildu $\\sigma^2$ lortzeko.', 'Primero que sumen 1; después mueve el peso hasta $\\mu$, y ábrelo o júntalo para $\\sigma^2$.', 'أولًا اجعل المجموع 1، ثم حرّك الوزن حتى $\\mu$، وافتحه أو اجمعه من أجل $\\sigma^2$.', 'First make them add up to 1; then move the weight to $\\mu$, and spread it or gather it for $\\sigma^2$.'),
        isSolved: (state) => isDistribution(state) && meanTenths(state) === mean && varianceHundredths(state) === variance,
        solution
    }
}

export const buildExtra = freshFrom(initialBuildState, buildMaker)
