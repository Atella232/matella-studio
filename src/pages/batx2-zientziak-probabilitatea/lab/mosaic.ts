import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { equals, fraction, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { hundredthsLatex, probLatex, say, tenthsLatex } from './probability.ts'

/* ==========================================================================
   L3 · Probabilitatearen karratua (El cuadrado de probabilidad): the
   whole square is the sample space. A vertical cut at P(A) splits it into
   the strips A and Ā; in each strip a horizontal cut at P(B/A) and at
   P(B/Ā) marks B. Each piece is an intersection, P(A∩B) = P(A)·P(B/A),
   so the square is the multiplication rule and the total probability at
   once; and A and B are independent exactly when the two cuts are at the
   same height. Before the numbers, the learner says whether P(A/B) is
   less than, equal to or more than P(A). Tenths everywhere, so every
   piece is an exact number of hundredths. Pure logic.
   ========================================================================== */

export interface MosaicState {
    /** P(A), P(B/A) and P(B/Ā), in tenths */
    a: number
    bGivenA: number
    bGivenNotA: number
    prediction: Prediction | null
}

export const MOSAIC_LIMITS = { a: { min: 1, max: 9 }, cut: { min: 0, max: 10 } } as const
export const initialMosaicState: MosaicState = { a: 5, bGivenA: 6, bGivenNotA: 2, prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export function setMosaic(state: MosaicState, patch: Partial<Pick<MosaicState, 'a' | 'bGivenA' | 'bGivenNotA'>>): MosaicState {
    const a = clamp(patch.a ?? state.a, MOSAIC_LIMITS.a.min, MOSAIC_LIMITS.a.max)
    const bGivenA = clamp(patch.bGivenA ?? state.bGivenA, MOSAIC_LIMITS.cut.min, MOSAIC_LIMITS.cut.max)
    const bGivenNotA = clamp(patch.bGivenNotA ?? state.bGivenNotA, MOSAIC_LIMITS.cut.min, MOSAIC_LIMITS.cut.max)
    const same = a === state.a && bGivenA === state.bGivenA && bGivenNotA === state.bGivenNotA
    return { a, bGivenA, bGivenNotA, prediction: same ? state.prediction : null }
}

/** The pieces in hundredths: A∩B, A∩B̄, Ā∩B, Ā∩B̄ */
export function piecesOf(state: Pick<MosaicState, 'a' | 'bGivenA' | 'bGivenNotA'>): [number, number, number, number] {
    const notA = 10 - state.a
    return [state.a * state.bGivenA, state.a * (10 - state.bGivenA), notA * state.bGivenNotA, notA * (10 - state.bGivenNotA)]
}

/** P(B) in hundredths: the total probability of the two strips */
export const bOf = (state: Pick<MosaicState, 'a' | 'bGivenA' | 'bGivenNotA'>) => piecesOf(state)[0] + piecesOf(state)[2]

/** P(A/B), exact; null when B is impossible */
export function aGivenB(state: Pick<MosaicState, 'a' | 'bGivenA' | 'bGivenNotA'>): FractionValue | null {
    const b = bOf(state)
    return b === 0 ? null : fraction(piecesOf(state)[0], b)
}

/** Independent: P(A∩B) = P(A)·P(B), the same as the two cuts at the same height */
export const isIndependent = (state: Pick<MosaicState, 'a' | 'bGivenA' | 'bGivenNotA'>) => state.bGivenA === state.bGivenNotA

/** P(A/B) compared with P(A): when B is impossible there is nothing to compare, and it is taken as equal */
export function mosaicPrediction(state: MosaicState): Prediction {
    const value = aGivenB(state)
    if (value === null) return '='
    const left = value.numerator * 10
    const right = state.a * value.denominator
    return left === right ? '=' : left < right ? '<' : '>'
}

/* ---------- Challenges ---------- */

export const mosaicChallenges: LabChallenge<MosaicState>[] = [
    { id: 128141, prompt: say('Egin $A$ eta $B$ independenteak izatea, $P(A)=0{,}3$ eta $P(B)=0{,}6$ izanik.', 'Haz que $A$ y $B$ sean independientes, con $P(A)=0{,}3$ y $P(B)=0{,}6$.', 'اجعل $A$ و$B$ مستقلين مع $P(A)=0{,}3$ و$P(B)=0{,}6$.', 'Make $A$ and $B$ independent, with $P(A)=0{,}3$ and $P(B)=0{,}6$.'), hint: say('Independenteak: bi mozketak altuera berean, $P(B)$ zenbakian.', 'Independientes: los dos cortes a la misma altura, la de $P(B)$.', 'مستقلان: الخطّان على الارتفاع نفسه، ارتفاع $P(B)$.', 'Independent: both cuts at the same height, that of $P(B)$.'), isSolved: (state) => state.a === 3 && state.bGivenA === 6 && state.bGivenNotA === 6 },
    { id: 128142, prompt: say('Egin $P(A/B)=1$ izatea, $B$ ezinezkoa izan gabe.', 'Haz que $P(A/B)=1$ sin que $B$ sea imposible.', 'اجعل $P(A/B)=1$ دون أن يكون $B$ مستحيلًا.', 'Make $P(A/B)=1$ without $B$ being impossible.'), hint: say('$B$ osoa $A$ zerrendan egon behar da: $P(B/\\overline{A})=0$.', 'Todo $B$ tiene que estar en la franja $A$: $P(B/\\overline{A})=0$.', 'يجب أن يكون $B$ كله في شريط $A$: $P(B/\\overline{A})=0$.', 'All of $B$ has to be in the strip $A$: $P(B/\\overline{A})=0$.'), isSolved: (state) => state.bGivenNotA === 0 && state.bGivenA > 0 },
    { id: 128143, prompt: say('$P(A)=0{,}4$ izanik, egin $P(A\\cap B)=0{,}12$ eta $P(B)=0{,}42$ izatea.', 'Con $P(A)=0{,}4$, haz que $P(A\\cap B)=0{,}12$ y $P(B)=0{,}42$.', 'مع $P(A)=0{,}4$، اجعل $P(A\\cap B)=0{,}12$ و$P(B)=0{,}42$.', 'With $P(A)=0{,}4$, make $P(A\\cap B)=0{,}12$ and $P(B)=0{,}42$.'), hint: say('$P(A\\cap B)=0{,}4\\cdot P(B/A)$; beste zerrendak $0{,}42-0{,}12$ jarri behar du.', '$P(A\\cap B)=0{,}4\\cdot P(B/A)$; la otra franja tiene que poner $0{,}42-0{,}12$.', '$P(A\\cap B)=0{,}4\\cdot P(B/A)$؛ ويجب أن يضع الشريط الآخر $0{,}42-0{,}12$.', '$P(A\\cap B)=0{,}4\\cdot P(B/A)$; the other strip has to add $0{,}42-0{,}12$.'), isSolved: (state) => state.a === 4 && piecesOf(state)[0] === 12 && bOf(state) === 42 }
]

/** Endless practice: independence with given P(A) and P(B), or a given P(A/B), or a given P(B) and P(A∩B) */
const mosaicMaker: LabChallengeMaker<MosaicState> = (random) => {
    for (;;) {
        const a = randomInt(random, 2, 8)
        const bGivenA = randomInt(random, 1, 9)
        const bGivenNotA = randomInt(random, 0, 9)
        const solution: MosaicState = { a, bGivenA, bGivenNotA, prediction: null }
        const kind = pick(random, ['independent', 'conditional', 'pieces'] as const)
        if (kind === 'independent') {
            const independent = { ...solution, bGivenNotA: bGivenA }
            return {
                prompt: say(`Egin $A$ eta $B$ independenteak izatea, $P(A)=${tenthsLatex(a)}$ eta $P(B)=${tenthsLatex(bGivenA)}$ izanik.`, `Haz que $A$ y $B$ sean independientes, con $P(A)=${tenthsLatex(a)}$ y $P(B)=${tenthsLatex(bGivenA)}$.`, `اجعل $A$ و$B$ مستقلين مع $P(A)=${tenthsLatex(a)}$ و$P(B)=${tenthsLatex(bGivenA)}$.`, `Make $A$ and $B$ independent, with $P(A)=${tenthsLatex(a)}$ and $P(B)=${tenthsLatex(bGivenA)}$.`),
                hint: say('Bi mozketak altuera berean.', 'Los dos cortes a la misma altura.', 'الخطّان على الارتفاع نفسه.', 'Both cuts at the same height.'),
                isSolved: (state) => state.a === a && state.bGivenA === bGivenA && state.bGivenNotA === bGivenA,
                solution: independent
            }
        }
        if (kind === 'conditional') {
            const value = aGivenB(solution)
            if (value === null || bGivenA === bGivenNotA) continue
            return {
                prompt: say(`$P(A)=${tenthsLatex(a)}$ eta $P(B/A)=${tenthsLatex(bGivenA)}$ izanik, egin $P(A/B)=${probLatex(value)}$ izatea.`, `Con $P(A)=${tenthsLatex(a)}$ y $P(B/A)=${tenthsLatex(bGivenA)}$, haz que $P(A/B)=${probLatex(value)}$.`, `مع $P(A)=${tenthsLatex(a)}$ و$P(B/A)=${tenthsLatex(bGivenA)}$، اجعل $P(A/B)=${probLatex(value)}$.`, `With $P(A)=${tenthsLatex(a)}$ and $P(B/A)=${tenthsLatex(bGivenA)}$, make $P(A/B)=${probLatex(value)}$.`),
                hint: say('Mugitu $\\overline{A}$ zerrendako mozketa: $P(A/B)$ $B$ gertaeraren zati bat da, $A$ zerrendan dagoena.', 'Mueve el corte de la franja $\\overline{A}$: $P(A/B)$ es la parte de $B$ que está en la franja $A$.', 'حرّك خط شريط $\\overline{A}$: $P(A/B)$ هو جزء $B$ الواقع في شريط $A$.', 'Move the cut of strip $\\overline{A}$: $P(A/B)$ is the part of $B$ that lies in strip $A$.'),
                isSolved: (state) => state.a === a && state.bGivenA === bGivenA && aGivenB(state) !== null && equals(aGivenB(state)!, value),
                solution
            }
        }
        const both = piecesOf(solution)[0]
        const b = bOf(solution)
        return {
            prompt: say(`$P(A)=${tenthsLatex(a)}$ izanik, egin $P(A\\cap B)=${hundredthsLatex(both)}$ eta $P(B)=${hundredthsLatex(b)}$ izatea.`, `Con $P(A)=${tenthsLatex(a)}$, haz que $P(A\\cap B)=${hundredthsLatex(both)}$ y $P(B)=${hundredthsLatex(b)}$.`, `مع $P(A)=${tenthsLatex(a)}$، اجعل $P(A\\cap B)=${hundredthsLatex(both)}$ و$P(B)=${hundredthsLatex(b)}$.`, `With $P(A)=${tenthsLatex(a)}$, make $P(A\\cap B)=${hundredthsLatex(both)}$ and $P(B)=${hundredthsLatex(b)}$.`),
            hint: say('$P(A\\cap B)=P(A)\\cdot P(B/A)$, eta $P(B)$ bi zerrenden batura da.', '$P(A\\cap B)=P(A)\\cdot P(B/A)$, y $P(B)$ es la suma de las dos franjas.', '$P(A\\cap B)=P(A)\\cdot P(B/A)$، و$P(B)$ مجموع الشريطين.', '$P(A\\cap B)=P(A)\\cdot P(B/A)$, and $P(B)$ is the sum of the two strips.'),
            isSolved: (state) => state.a === a && piecesOf(state)[0] === both && bOf(state) === b,
            solution
        }
    }
}

export const mosaicExtra = freshFrom(initialMosaicState, mosaicMaker)
