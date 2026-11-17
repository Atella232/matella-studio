import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L3 · Datuetatik marraztu (Dibuja desde los datos): a data card (a
   vertical asymptote, a horizontal one and a point) and the model
   f(x) = b + k/(x − a) with three steppers. The board shows the data as
   dashed lines and a dot; once the learner has guessed, it draws the
   curve of the chosen a, b and k, so the learner can move them until the
   curve meets the data. Before drawing, the learner guesses whether the
   curve that fits cuts the Y axis below 0, at 0 or above 0.
   ========================================================================== */

export type DataCard = 'd1' | 'd2' | 'd3'

export const DATA_CARDS: DataCard[] = ['d1', 'd2', 'd3']

export const DATA_LIMITS = { a: { min: -4, max: 4 }, b: { min: -4, max: 4 }, k: { min: -4, max: 4 } } as const

export interface DataState {
    card: DataCard
    a: number
    b: number
    /** Never 0 */
    k: number
    prediction: Prediction | null
}

export const initialDataState: DataState = { card: 'd1', a: 0, b: 0, k: 1, prediction: null }

interface CardSetup {
    /** Vertical asymptote x = a, horizontal y = b, a point (px, py) */
    a: number
    b: number
    point: [number, number]
}

export const DATA_SETUP: Record<DataCard, CardSetup> = {
    d1: { a: 2, b: 1, point: [3, 4] },
    d2: { a: -1, b: 2, point: [0, 0] },
    d3: { a: 1, b: -1, point: [2, -3] }
}

/** The k that makes the curve pass through the point */
export const fittingK = (card: DataCard) => {
    const { a, b, point } = DATA_SETUP[card]
    return (point[1] - b) * (point[0] - a)
}

export function setData(state: DataState, patch: Partial<Omit<DataState, 'prediction'>>): DataState {
    const card = patch.card ?? state.card
    const clamp = (value: number, { min, max }: { min: number; max: number }) => Math.min(max, Math.max(min, Math.round(value)))
    const a = clamp(patch.a ?? state.a, DATA_LIMITS.a)
    const b = clamp(patch.b ?? state.b, DATA_LIMITS.b)
    let k = clamp(patch.k ?? state.k, DATA_LIMITS.k)
    // k = 0 is no curve: jump over it in the direction of the change
    if (k === 0) k = (patch.k ?? state.k) < state.k ? -1 : 1
    return { card, a, b, k, prediction: card === state.card ? state.prediction : null }
}

export const modelOf = (state: Pick<DataState, 'a' | 'b' | 'k'>) => (x: number) => state.b + state.k / (x - state.a)

/** The model meets the card: the same asymptotes and through the point */
export const fits = (state: DataState, card: DataCard = state.card) => {
    const { a, b } = DATA_SETUP[card]
    return state.a === a && state.b === b && state.k === fittingK(card)
}

/** The fitting curve cuts the Y axis below 0 (<), at 0 (=) or above 0 (>) */
export const dataPrediction = (state: Pick<DataState, 'card'>): Prediction => {
    const { a, b } = DATA_SETUP[state.card]
    return compareTo(b + fittingK(state.card) / (0 - a), 0)
}

const same = (text: string) => say(text, text, text, text)

export const dataChallenges: LabChallenge<DataState>[] = [
    {
        id: 148201,
        prompt: say('Egokitu ereduari lehen fitxaren datuak.', 'Ajusta el modelo a los datos de la primera ficha.', 'طابق النموذج مع معطيات البطاقة الأولى.', 'Fit the model to the data of the first card.'),
        hint: same('$a=2\\qquad b=1\\qquad 1+\\frac{k}{1}=4$'),
        isSolved: (state) => state.card === 'd1' && fits(state)
    },
    {
        id: 148202,
        prompt: say('Egokitu ereduari bigarren fitxaren datuak.', 'Ajusta el modelo a los datos de la segunda ficha.', 'طابق النموذج مع معطيات البطاقة الثانية.', 'Fit the model to the data of the second card.'),
        hint: same('$a=-1\\qquad b=2\\qquad 2+\\frac{k}{1}=0$'),
        isSolved: (state) => state.card === 'd2' && fits(state)
    },
    {
        id: 148203,
        prompt: say('Egokitu ereduari hirugarren fitxaren datuak.', 'Ajusta el modelo a los datos de la tercera ficha.', 'طابق النموذج مع معطيات البطاقة الثالثة.', 'Fit the model to the data of the third card.'),
        hint: same('$a=1\\qquad b=-1\\qquad -1+\\frac{k}{1}=-3$'),
        isSolved: (state) => state.card === 'd3' && fits(state)
    },
    {
        id: 148204,
        prompt: say('Bigarren fitxaren asintotekin, lortu kurbak $X$ ardatza $x=1$ puntuan moztea.', 'Con las asíntotas de la segunda ficha, consigue que la curva corte al eje $X$ en $x=1$.', 'بمقاربي البطاقة الثانية، اجعل المنحنى يقطع محور $X$ عند $x=1$.', 'With the asymptotes of the second card, make the curve cut the $X$ axis at $x=1$.'),
        hint: same('$2+\\frac{k}{2}=0$'),
        isSolved: (state) => state.a === -1 && state.b === 2 && state.k === -4
    },
    {
        id: 148205,
        prompt: say('Hirugarren fitxaren asintotekin, lortu kurba jatorritik igarotzea.', 'Con las asíntotas de la tercera ficha, consigue que la curva pase por el origen.', 'بمقاربي البطاقة الثالثة، اجعل المنحنى يمر بالمبدأ.', 'With the asymptotes of the third card, make the curve pass through the origin.'),
        hint: same('$-1+\\frac{k}{-1}=0$'),
        isSolved: (state) => state.a === 1 && state.b === -1 && state.k === -1
    }
]

/** Endless practice: a new data card in words */
const dataMaker: LabChallengeMaker<DataState> = (random) => {
    const a = randomInt(random, -3, 3)
    const b = randomInt(random, -3, 3)
    let k = randomInt(random, -4, 3)
    if (k >= 0) k += 1
    const point = `(${a + 1},${b + k})`
    return {
        prompt: say(`Asintotak $x=${a}$ eta $y=${b}$, eta $${point}$ puntua: egokitu eredua.`, `Asíntotas $x=${a}$ e $y=${b}$ y el punto $${point}$: ajusta el modelo.`, `المقاربان $x=${a}$ و$y=${b}$ والنقطة $${point}$: طابق النموذج.`, `Asymptotes $x=${a}$ and $y=${b}$ and the point $${point}$: fit the model.`),
        hint: same(`$${b}+\\frac{k}{1}=${b + k}$`),
        isSolved: (state) => state.a === a && state.b === b && state.k === k,
        solution: { card: 'd1', a, b, k, prediction: null }
    }
}

export const dataExtra = freshFrom(initialDataState, dataMaker)
