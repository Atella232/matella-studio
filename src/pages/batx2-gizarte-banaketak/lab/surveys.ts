import { createRandom, pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { binomialPmfDecimal } from '../../batx2-zientziak-banaketak/binomial.ts'
import { say } from '../../batx2-zientziak-probabilitatea/lab/probability.ts'

/* ==========================================================================
   B-L1 · Mila inkesta (Mil encuestas): a poll of n people, each one says
   yes with probability p. ▶ runs the poll 1000 times (with a fixed seed,
   so the drawing is the same each time for the same numbers) and stacks
   how many polls gave each number of yeses; the exact binomial bars stand
   behind, and the normal bell N(np; √(npq)) appears when np ≥ 5 and
   nq ≥ 5. Before playing, the learner guesses what share of the polls
   falls within μ ± σ: less than half, about two thirds or almost all.
   p in tenths. Pure logic.
   ========================================================================== */

export interface SurveysState {
    n: number
    /** p in tenths */
    p: number
    prediction: Prediction | null
}

export const SURVEYS_LIMITS = { n: { min: 5, max: 50 }, p: { min: 1, max: 9 } } as const
export const SURVEYS_RUNS = 1000
export const initialSurveysState: SurveysState = { n: 20, p: 2, prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export function setSurveys(state: SurveysState, patch: Partial<Pick<SurveysState, 'n' | 'p'>>): SurveysState {
    const n = clamp(patch.n ?? state.n, SURVEYS_LIMITS.n.min, SURVEYS_LIMITS.n.max)
    const p = clamp(patch.p ?? state.p, SURVEYS_LIMITS.p.min, SURVEYS_LIMITS.p.max)
    return n === state.n && p === state.p ? state : { n, p, prediction: null }
}

type Params = Pick<SurveysState, 'n' | 'p'>

/** μ = np and σ² = npq, with p in tenths: μ and σ² in hundredths of a unit */
export const meanOf = (state: Params) => (state.n * state.p) / 10
export const varianceOf = (state: Params) => (state.n * state.p * (10 - state.p)) / 100
export const approximable = (state: Params) => state.n * state.p >= 50 && state.n * (10 - state.p) >= 50

/** The exact probability that the number of yeses is within μ ± σ */
export function withinOneSd(state: Params): number {
    const mean = meanOf(state)
    const sd = Math.sqrt(varianceOf(state))
    let total = 0
    for (let k = 0; k <= state.n; k += 1) if (Math.abs(k - mean) <= sd + 1e-9) total += binomialPmfDecimal(state.n, state.p / 10, k)
    return total
}

/** Less than half (<), about two thirds (=) or almost all (>) */
export function surveysPrediction(state: Params): Prediction {
    const share = withinOneSd(state)
    return share < 0.5 ? '<' : share > 0.85 ? '>' : '='
}

/** How many of the 1000 polls gave each number of yeses, always the same for the same n and p */
export function simulate(state: Params): number[] {
    const random = createRandom(state.n * 97 + state.p * 13 + 7)
    const counts = Array.from({ length: state.n + 1 }, () => 0)
    for (let run = 0; run < SURVEYS_RUNS; run += 1) {
        let yes = 0
        for (let person = 0; person < state.n; person += 1) if (random() < state.p / 10) yes += 1
        counts[yes] += 1
    }
    return counts
}

/* ---------- Challenges ---------- */

export const surveysChallenges: LabChallenge<SurveysState>[] = [
    { id: 151101, prompt: say('30 pertsonarekin, egin «bai» erantzunen batez bestekoa 12 izatea.', 'Con 30 personas, haz que la media de «sí» sea 12.', 'مع 30 شخصًا، اجعل متوسط «نعم» يساوي 12.', 'With 30 people, make the mean number of ‘yes’ answers 12.'), hint: same12(), isSolved: (state) => state.n === 30 && state.p === 4 },
    { id: 151102, prompt: say('Egin $\\sigma=3$ izatea.', 'Haz que $\\sigma=3$.', 'اجعل $\\sigma=3$.', 'Make $\\sigma=3$.'), hint: say('$npq=9$ behar da; adibidez, $p=0{,}5$ eta $n=36$.', 'Hace falta $npq=9$; por ejemplo, $p=0{,}5$ y $n=36$.', 'يلزم $npq=9$؛ مثلًا $p=0{,}5$ و$n=36$.', 'You need $npq=9$; for example, $p=0{,}5$ and $n=36$.'), isSolved: (state) => state.n * state.p * (10 - state.p) === 900 },
    { id: 151103, prompt: say('20 pertsonarekin, egin normalarekin hurbil daitekeen binomial bat, batez bestekoa 10 baino txikiagoa duena.', 'Con 20 personas, haz una binomial que se pueda aproximar por la normal y tenga media menor que 10.', 'مع 20 شخصًا، اجعل توزيعًا ثنائيًّا يمكن تقريبه بالطبيعي ومتوسطه أقل من 10.', 'With 20 people, make a binomial that can be approximated by the normal and has a mean below 10.'), hint: say('$np\\ge 5$ eta $nq\\ge 5$; $p$ 0,5 baino txikiagoa.', '$np\\ge 5$ y $nq\\ge 5$; $p$ menor que 0,5.', '$np\\ge 5$ و$nq\\ge 5$؛ و$p$ أصغر من 0.5.', '$np\\ge 5$ and $nq\\ge 5$; $p$ less than 0.5.'), isSolved: (state) => state.n === 20 && approximable(state) && state.p < 5 }
]

function same12() {
    return say('$\\mu=np$: $p=\\frac{12}{30}$.', '$\\mu=np$: $p=\\frac{12}{30}$.', '$\\mu=np$: $p=\\frac{12}{30}$.', '$\\mu=np$: $p=\\frac{12}{30}$.')
}

/** Endless practice: a mean with a given n, or a variance */
const surveysMaker: LabChallengeMaker<SurveysState> = (random) => {
    for (;;) {
        const n = randomInt(random, 2, 10) * 5
        const p = randomInt(random, 1, 9)
        const solution: SurveysState = { n, p, prediction: null }
        if (pick(random, ['mean', 'variance'] as const) === 'mean') {
            const mean = meanOf(solution)
            if (!Number.isInteger(mean)) continue
            return {
                prompt: say(`${n} pertsonarekin, egin «bai» erantzunen batez bestekoa ${mean} izatea.`, `Con ${n} personas, haz que la media de «sí» sea ${mean}.`, `مع ${n} شخصًا، اجعل متوسط «نعم» يساوي ${mean}.`, `With ${n} people, make the mean number of ‘yes’ answers ${mean}.`),
                hint: say('$\\mu=np$.', '$\\mu=np$.', '$\\mu=np$.', '$\\mu=np$.'),
                isSolved: (state) => state.n === n && state.n * state.p === n * p,
                solution
            }
        }
        const variance = n * p * (10 - p)
        if (variance % 100 !== 0) continue
        return {
            prompt: say(`${n} pertsonarekin, egin $\\sigma^2=${variance / 100}$ izatea.`, `Con ${n} personas, haz que $\\sigma^2=${variance / 100}$.`, `مع ${n} شخصًا، اجعل $\\sigma^2=${variance / 100}$.`, `With ${n} people, make $\\sigma^2=${variance / 100}$.`),
            hint: say('$\\sigma^2=npq$: bi $p$ ondo daude, $p$ eta $1-p$.', '$\\sigma^2=npq$: valen dos $p$, $p$ y $1-p$.', '$\\sigma^2=npq$: تصلح قيمتان لـ $p$: $p$ و$1-p$.', '$\\sigma^2=npq$: two values of $p$ work, $p$ and $1-p$.'),
            isSolved: (state) => state.n === n && state.n * state.p * (10 - state.p) === variance,
            solution
        }
    }
}

export const surveysExtra = freshFrom(initialSurveysState, surveysMaker)
