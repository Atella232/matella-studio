import { pick } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { freshFrom, type Prediction } from './prediction.ts'

/* ==========================================================================
   L4 · Faktorizatzen den laukizuzena (El rectángulo que se factoriza): the
   tiles of x² + bx + c — one big square, b strips and c small squares —
   have to be laid out as a rectangle (x + p)(x + q). The learner moves p
   and q; the drawing shows how many strips and small squares that
   rectangle needs. First the learner predicts whether the tiles make a
   square, a rectangle or nothing at all: x² + 6x + 9 is (x + 3)², x² + 5x
   + 6 is (x + 2)(x + 3), and x² + 4x + 5 has no rectangle. Pure logic.
   ========================================================================== */

/** The trinomials x² + bx + c to lay out */
export const TRINOMIALS: Array<{ b: number; c: number }> = [
    { b: 5, c: 6 },
    { b: 6, c: 9 },
    { b: 7, c: 12 },
    { b: 4, c: 5 },
    { b: 8, c: 15 },
    { b: 10, c: 25 },
    { b: 9, c: 14 },
    { b: 6, c: 7 }
]

export const FACTOR_LIMIT = 9

export interface FactorState {
    trinomial: number
    p: number
    q: number
    prediction: Prediction | null
}

export const initialFactorState: FactorState = { trinomial: 0, p: 1, q: 1, prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export function setFactor(state: FactorState, patch: Partial<Omit<FactorState, 'prediction'>>): FactorState {
    const trinomial = clamp(patch.trinomial ?? state.trinomial, 0, TRINOMIALS.length - 1)
    const p = clamp(patch.p ?? state.p, 0, FACTOR_LIMIT)
    const q = clamp(patch.q ?? state.q, 0, FACTOR_LIMIT)
    return { trinomial, p, q, prediction: trinomial === state.trinomial ? state.prediction : null }
}

/** The whole-number pair p ≤ q with p + q = b and p · q = c, if there is one */
export function factorPair(trinomial: number): [number, number] | null {
    const { b, c } = TRINOMIALS[trinomial]
    for (let p = 0; p <= b; p += 1) if (p * (b - p) === c && p <= b - p) return [p, b - p]
    return null
}

/** The rectangle uses exactly the tiles of the trinomial */
export const factorFits = (state: FactorState) => {
    const { b, c } = TRINOMIALS[state.trinomial]
    return state.p + state.q === b && state.p * state.q === c
}

/** No rectangle (<), a square (=) or a rectangle (>)? */
export function factorPrediction(state: FactorState): Prediction {
    const pair = factorPair(state.trinomial)
    if (!pair) return '<'
    return pair[0] === pair[1] ? '=' : '>'
}

export const trinomialLatex = (trinomial: number) => `x^{2}+${TRINOMIALS[trinomial].b}x+${TRINOMIALS[trinomial].c}`

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })

const fits = (trinomial: number) => (state: FactorState) => state.trinomial === trinomial && factorFits(state)

export const factorChallenges: LabChallenge<FactorState>[] = [
    { id: 91401, prompt: say(`Egin laukizuzena $${trinomialLatex(0)}$ fitxekin.`, `Forma el rectángulo con las fichas de $${trinomialLatex(0)}$.`, `كوّن المستطيل برقاقات $${trinomialLatex(0)}$.`, `Make the rectangle with the tiles of $${trinomialLatex(0)}$.`), hint: say('$p+q=5$ eta $p\\cdot q=6$.', '$p+q=5$ y $p\\cdot q=6$.', '$p+q=5$ و$p\\cdot q=6$.', '$p+q=5$ and $p\\cdot q=6$.'), isSolved: fits(0) },
    { id: 91402, prompt: say(`Egin karratua $${trinomialLatex(1)}$ fitxekin.`, `Forma el cuadrado con las fichas de $${trinomialLatex(1)}$.`, `كوّن المربع برقاقات $${trinomialLatex(1)}$.`, `Make the square with the tiles of $${trinomialLatex(1)}$.`), hint: say('Karratu batean $p=q$.', 'En un cuadrado $p=q$.', 'في المربع $p=q$.', 'In a square $p=q$.'), isSolved: fits(1) },
    { id: 91403, prompt: say(`Faktorizatu $${trinomialLatex(2)}$.`, `Factoriza $${trinomialLatex(2)}$.`, `حلّل $${trinomialLatex(2)}$.`, `Factorise $${trinomialLatex(2)}$.`), hint: say('Biderkadura 12, batura 7.', 'Producto 12, suma 7.', 'حاصل الضرب 12 والمجموع 7.', 'Product 12, sum 7.'), isSolved: fits(2) },
    { id: 91404, prompt: say(`Faktorizatu $${trinomialLatex(4)}$.`, `Factoriza $${trinomialLatex(4)}$.`, `حلّل $${trinomialLatex(4)}$.`, `Factorise $${trinomialLatex(4)}$.`), hint: say('Biderkadura 15, batura 8.', 'Producto 15, suma 8.', 'حاصل الضرب 15 والمجموع 8.', 'Product 15, sum 8.'), isSolved: fits(4) },
    { id: 91405, prompt: say(`Faktorizatu $${trinomialLatex(6)}$.`, `Factoriza $${trinomialLatex(6)}$.`, `حلّل $${trinomialLatex(6)}$.`, `Factorise $${trinomialLatex(6)}$.`), hint: say('Biderkadura 14, batura 9.', 'Producto 14, suma 9.', 'حاصل الضرب 14 والمجموع 9.', 'Product 14, sum 9.'), isSolved: fits(6) }
]

/** Endless practice: lay out one of the trinomials that has a rectangle */
const factorMaker: LabChallengeMaker<FactorState> = (random) => {
    const trinomial = pick(random, TRINOMIALS.map((_, index) => index).filter((index) => factorPair(index) !== null))
    const [p, q] = factorPair(trinomial)!
    return {
        prompt: say(`Faktorizatu $${trinomialLatex(trinomial)}$.`, `Factoriza $${trinomialLatex(trinomial)}$.`, `حلّل $${trinomialLatex(trinomial)}$.`, `Factorise $${trinomialLatex(trinomial)}$.`),
        hint: say(`Biderkadura ${TRINOMIALS[trinomial].c}, batura ${TRINOMIALS[trinomial].b}.`, `Producto ${TRINOMIALS[trinomial].c}, suma ${TRINOMIALS[trinomial].b}.`, `حاصل الضرب ${TRINOMIALS[trinomial].c} والمجموع ${TRINOMIALS[trinomial].b}.`, `Product ${TRINOMIALS[trinomial].c}, sum ${TRINOMIALS[trinomial].b}.`),
        isSolved: fits(trinomial),
        solution: { trinomial, p, q, prediction: null }
    }
}

export const factorExtra = freshFrom(initialFactorState, factorMaker)
