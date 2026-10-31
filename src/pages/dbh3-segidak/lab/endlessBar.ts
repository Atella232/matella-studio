import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { add, divide, fraction, multiply, subtract, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { freshFrom, type Prediction } from './prediction.ts'

/* ==========================================================================
   L5 · Inoiz betetzen ez den barra (La barra que nunca se llena): the terms
   a₁, a₁·r, a₁·r², … laid end to end on a bar. With |r| < 1 the pieces get
   smaller and the bar never passes a₁ / (1 − r), the infinite sum. The
   learner picks a₁ and r, predicts whether that sum will be below, equal
   to or above 1, and adds pieces one by one or with ▶. Fractions are exact.
   ========================================================================== */

export const BAR_FIRSTS: Array<[number, number]> = [[1, 2], [1, 3], [2, 3], [3, 4], [1, 4]]
export const BAR_RATIOS: Array<[number, number]> = [[1, 2], [1, 3], [1, 4], [2, 3]]
export const BAR_PIECES_MAX = 10

export interface BarState {
    first: number
    ratio: number
    pieces: number
    prediction: Prediction | null
}

export const initialBarState: BarState = { first: 1, ratio: 1, pieces: 2, prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export function setBar(state: BarState, patch: Partial<Omit<BarState, 'prediction'>>): BarState {
    const first = clamp(patch.first ?? state.first, 0, BAR_FIRSTS.length - 1)
    const ratio = clamp(patch.ratio ?? state.ratio, 0, BAR_RATIOS.length - 1)
    const pieces = clamp(patch.pieces ?? state.pieces, 1, BAR_PIECES_MAX)
    // The prediction is about the infinite sum, which does not depend on the pieces drawn
    const same = first === state.first && ratio === state.ratio
    return { first, ratio, pieces, prediction: same ? state.prediction : null }
}

export const barFirst = (state: BarState): FractionValue => fraction(...BAR_FIRSTS[state.first])
export const barRatio = (state: BarState): FractionValue => fraction(...BAR_RATIOS[state.ratio])
/** a₁ / (1 − r), exact */
export const barLimit = (state: BarState): FractionValue => divide(barFirst(state), subtract(fraction(1), barRatio(state)))
/** The k-th piece, a₁·r^(k−1), exact */
export function barPiece(state: BarState, k: number): FractionValue {
    let value = barFirst(state)
    for (let i = 1; i < k; i += 1) value = multiply(value, barRatio(state))
    return value
}
/** The sum of the pieces drawn */
export function barPartial(state: BarState, pieces = state.pieces): FractionValue {
    let total = fraction(0)
    for (let k = 1; k <= pieces; k += 1) total = add(total, barPiece(state, k))
    return total
}
/** Will the infinite sum be below, equal to or above 1? */
export function barPrediction(state: BarState): Prediction {
    const limit = barLimit(state)
    return limit.numerator === limit.denominator ? '=' : limit.numerator < limit.denominator ? '<' : '>'
}

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const limitIs = (numerator: number, denominator: number) => (state: BarState) => {
    const limit = barLimit(state)
    return limit.numerator * denominator === limit.denominator * numerator
}

export const barChallenges: LabChallenge<BarState>[] = [
    { id: 89501, prompt: say('Lortu batura infinitua 1 izatea, $r=\\frac{1}{2}$ erabili gabe.', 'Consigue que la suma infinita sea 1 sin usar $r=\\frac{1}{2}$.', 'اجعل المجموع اللانهائي 1 دون استعمال $r=\\frac{1}{2}$.', 'Make the infinite sum equal 1 without using $r=\\frac{1}{2}$.'), hint: say('$\\frac{a_{1}}{1-r}=1$, beraz $a_{1}=1-r$.', '$\\frac{a_{1}}{1-r}=1$, así que $a_{1}=1-r$.', '$\\frac{a_{1}}{1-r}=1$ إذن $a_{1}=1-r$.', '$\\frac{a_{1}}{1-r}=1$, so $a_{1}=1-r$.'), isSolved: (state) => state.ratio !== 0 && limitIs(1, 1)(state) },
    { id: 89502, prompt: say('Lortu batura infinitua 2 izatea.', 'Consigue que la suma infinita sea 2.', 'اجعل المجموع اللانهائي 2.', 'Make the infinite sum equal 2.'), hint: say('$a_{1}=2\\cdot(1-r)$.', '$a_{1}=2\\cdot(1-r)$.', '$a_{1}=2\\cdot(1-r)$.', '$a_{1}=2\\cdot(1-r)$.'), isSolved: limitIs(2, 1) },
    { id: 89503, prompt: say('$a_{1}=\\frac{1}{2}$ eta $r=\\frac{1}{2}$: zenbat zati behar dira batura eta bat zenbakiaren arteko aldea 0,01 baino txikiagoa izan dadin?', '$a_{1}=\\frac{1}{2}$ y $r=\\frac{1}{2}$: ¿cuántos trozos hacen falta para quedarse a menos de 0,01 de 1?', '$a_{1}=\\frac{1}{2}$ و$r=\\frac{1}{2}$: كم قطعة يلزم ليقل البعد عن 1 عن 0.01؟', '$a_{1}=\\frac{1}{2}$ and $r=\\frac{1}{2}$: how many pieces are needed to be less than 0.01 away from 1?'), hint: say('Falta dena azken zatiaren berdina da: $\\frac{1}{2^{n}}<0{,}01$.', 'Lo que falta es igual al último trozo: $\\frac{1}{2^{n}}<0{,}01$.', 'الباقي يساوي آخر قطعة: $\\frac{1}{2^{n}}<0{,}01$.', 'What is missing equals the last piece: $\\frac{1}{2^{n}}<0{,}01$.'), isSolved: (state) => state.first === 0 && state.ratio === 0 && state.pieces === 7 },
    { id: 89504, prompt: say('Lortu batura infinitua $\\frac{4}{9}$ izatea.', 'Consigue que la suma infinita sea $\\frac{4}{9}$.', 'اجعل المجموع اللانهائي $\\frac{4}{9}$.', 'Make the infinite sum equal $\\frac{4}{9}$.'), hint: say('$\\frac{1}{3}$ zati $\\frac{3}{4}$.', '$\\frac{1}{3}$ entre $\\frac{3}{4}$.', '$\\frac{1}{3}$ على $\\frac{3}{4}$.', '$\\frac{1}{3}$ divided by $\\frac{3}{4}$.'), isSolved: limitIs(4, 9) }
]

/** Endless practice: an infinite sum to reach */
const barMaker: LabChallengeMaker<BarState> = (random) => {
    const first = randomInt(random, 0, BAR_FIRSTS.length - 1)
    const ratio = randomInt(random, 0, BAR_RATIOS.length - 1)
    const limit = barLimit({ first, ratio, pieces: 1, prediction: null })
    const latex = limit.denominator === 1 ? String(limit.numerator) : `\\frac{${limit.numerator}}{${limit.denominator}}`
    return {
        prompt: say(`Lortu batura infinitua $${latex}$ izatea.`, `Consigue que la suma infinita sea $${latex}$.`, `اجعل المجموع اللانهائي $${latex}$.`, `Make the infinite sum equal $${latex}$.`),
        hint: say('$S=\\frac{a_{1}}{1-r}$', '$S=\\frac{a_{1}}{1-r}$', '$S=\\frac{a_{1}}{1-r}$', '$S=\\frac{a_{1}}{1-r}$'),
        isSolved: limitIs(limit.numerator, limit.denominator),
        solution: { first, ratio, pieces: 1, prediction: null }
    }
}

export const barExtra = freshFrom(initialBarState, barMaker)
