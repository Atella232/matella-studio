import { pick } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { pairStats, type Pair } from '../../batx1-zientziak-bidimentsionala/bivariate.ts'

/* ==========================================================================
   L2 · Fidagarria ala ez? (¿Fiable o no?): two clouds of five families,
   monthly income (thousands of euros, from 2 to 10) and spending on
   culture (hundreds of euros), with the same regression line y = 1 + 0,5x
   (the noise has mean 0 and no relation to x) but different r: about 0,93
   and about 0,54. The learner drags the x to estimate and predicts whether
   the estimate will be reliable (|r| ≥ 0,75 and x within the data), not
   very reliable (|r| ≥ 0,75 and x up to 2 outside) or not reliable at all.
   Pure logic.
   ========================================================================== */

export const RELIABLE_X = [2, 4, 6, 8, 10]
const NOISE = [0, 1, -2, 1, 0]
export const RELIABLE_SETS = [0.5, 2]
export const RELIABLE_LIMITS = { min: 0, max: 24 }

export interface ReliableState {
    /** 0: strong correlation; 1: weak */
    data: number
    x: number
    prediction: Prediction | null
}

export const initialReliableState: ReliableState = { data: 0, x: 8, prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export function setReliable(state: ReliableState, change: Partial<Pick<ReliableState, 'data' | 'x'>>): ReliableState {
    const data = clamp(change.data ?? state.data, 0, RELIABLE_SETS.length - 1)
    const x = clamp(change.x ?? state.x, RELIABLE_LIMITS.min, RELIABLE_LIMITS.max)
    return data === state.data && x === state.x ? state : { data, x, prediction: null }
}

export const reliablePoints = (data: number): Pair[] => RELIABLE_X.map((x, index): Pair => [x, 1 + 0.5 * x + RELIABLE_SETS[data] * NOISE[index]])
export const reliableR = (data: number) => pairStats(reliablePoints(data)).r
/** The regression line of both clouds: y = 1 + 0,5x */
export const estimate = (x: number) => 1 + 0.5 * x

export type Verdict = 'reliable' | 'little' | 'not'

export function verdictOf(state: Pick<ReliableState, 'data' | 'x'>): Verdict {
    const strong = Math.abs(reliableR(state.data)) >= 0.75
    const [low, high] = [RELIABLE_X[0], RELIABLE_X.at(-1)!]
    if (!strong) return 'not'
    if (state.x >= low && state.x <= high) return 'reliable'
    return state.x >= low - 2 && state.x <= high + 2 ? 'little' : 'not'
}

/** Reliable (>), not very reliable (=) or not reliable at all (<) */
export const reliablePrediction = (state: Pick<ReliableState, 'data' | 'x'>): Prediction => ({ reliable: '>', little: '=', not: '<' } as const)[verdictOf(state)]

/* ---------- Challenges ---------- */

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })

export const reliableChallenges: LabChallenge<ReliableState>[] = [
    {
        id: 138201,
        prompt: say('Datu sendoekin, egin $\\hat{y}=4$ ematen duen estimazio fidagarri bat.', 'Con los datos fuertes, haz una estimación fiable que dé $\\hat{y}=4$.', 'بالبيانات القوية، اصنع تقديرًا موثوقًا يعطي $\\hat{y}=4$.', 'With the strong data, make a reliable estimate that gives $\\hat{y}=4$.'),
        hint: same4('$1+0{,}5x=4$'),
        isSolved: (state) => state.data === 0 && Math.abs(estimate(state.x) - 4) < 1e-9 && verdictOf(state) === 'reliable'
    },
    {
        id: 138202,
        prompt: say('Datu sendoekin, egin zenbaki bat ematen duen baina batere fidagarria ez den estimazio bat.', 'Con los datos fuertes, haz una estimación que dé un número pero no sea nada fiable.', 'بالبيانات القوية، اصنع تقديرًا يعطي عددًا لكنه غير موثوق إطلاقًا.', 'With the strong data, make an estimate that gives a number but is not reliable at all.'),
        hint: say('Joan datuetatik oso urrun.', 'Vete muy lejos de los datos.', 'ابتعد كثيرًا عن البيانات.', 'Go very far from the data.'),
        isSolved: (state) => state.data === 0 && verdictOf(state) === 'not'
    },
    {
        id: 138203,
        prompt: say('Datu ahulekin, estimatu $x=6$ balioan: barruan egonda ere, ez da fidagarria.', 'Con los datos débiles, estima en $x=6$: aunque esté dentro, no es fiable.', 'بالبيانات الضعيفة قدّر عند $x=6$: مع أنها داخل البيانات فالتقدير غير موثوق.', 'With the weak data, estimate at $x=6$: even though it is inside, it is not reliable.'),
        hint: say('Begiratu r koefizienteari.', 'Mira el coeficiente r.', 'انظر إلى المعامل r.', 'Look at the coefficient r.'),
        isSolved: (state) => state.data === 1 && state.x === 6
    }
]

function same4(value: string): LocalizedText {
    return say(value, value, value, value)
}

const VERDICT_TEXT: Record<Verdict, LocalizedText> = {
    reliable: say('fidagarria', 'fiable', 'موثوقًا', 'reliable'),
    little: say('ez oso fidagarria', 'poco fiable', 'قليل الموثوقية', 'not very reliable'),
    not: say('batere fidagarria ez dena', 'nada fiable', 'غير موثوق إطلاقًا', 'not reliable at all')
}

/** Endless practice: an estimate of ŷ with a given verdict */
const reliableMaker: LabChallengeMaker<ReliableState> = (random) => {
    const solution: ReliableState = { data: pick(random, [0, 0, 1]), x: pick(random, Array.from({ length: 25 }, (_, index) => index)), prediction: null }
    const target = String(estimate(solution.x)).replace('.', '{,}')
    const verdict = verdictOf(solution)
    const word = VERDICT_TEXT[verdict]
    return {
        prompt: say(`Egin estimazio bat, $\\hat{y}=${target}$ ematen duena eta ${word.eu}.`, `Haz una estimación ${word.es} que dé $\\hat{y}=${target}$.`, `اصنع تقديرًا ${word.ar} يعطي $\\hat{y}=${target}$.`, `Make an estimate that gives $\\hat{y}=${target}$ and is ${word.en}.`),
        hint: say('Zuzena $y=1+0{,}5x$ da bi hodeietan; aukeratu x eta datuak.', 'La recta es $y=1+0{,}5x$ en las dos nubes; elige x y los datos.', 'المستقيم $y=1+0{,}5x$ في السحابتين؛ اختر x والبيانات.', 'The line is $y=1+0{,}5x$ in both clouds; choose x and the data.'),
        isSolved: (state) => Math.abs(estimate(state.x) - estimate(solution.x)) < 1e-9 && verdictOf(state) === verdict,
        solution
    }
}

export const reliableExtra = freshFrom(initialReliableState, reliableMaker)
