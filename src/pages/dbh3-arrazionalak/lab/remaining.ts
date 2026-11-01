import { randomInt } from '../../../features/unit-v2/games/random.ts'
import { compare, equals, fraction, multiply, subtract, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { freshFrom, type Prediction } from './prediction.ts'

/* ==========================================================================
   L2 · Geratzen dena (Lo que queda): a bar is the whole (a walk, a tank,
   the money). The first cut takes a/b of the whole: a of its b columns.
   The second takes c/d of what is left: the columns left are split into
   d rows and c of them go. What is left is (1 − a/b)(1 − c/d) of the
   whole, not 1 − a/b − c/d. First a guess: is less than half, exactly
   half or more than half left? ▶ makes the two cuts.
   ========================================================================== */

export const REMAINING_LIMITS = { denominator: { min: 2, max: 8 } } as const

export interface RemainingState {
    /** The first cut, of the whole */
    first: { numerator: number; denominator: number }
    /** The second cut, of what is left */
    second: { numerator: number; denominator: number }
    prediction: Prediction | null
}

export const initialRemainingState: RemainingState = { first: { numerator: 1, denominator: 4 }, second: { numerator: 1, denominator: 2 }, prediction: null }

export interface RemainingPatch {
    firstNumerator?: number
    firstDenominator?: number
    secondNumerator?: number
    secondDenominator?: number
}

const cut = (numerator: number, denominator: number) => {
    const bottom = Math.min(REMAINING_LIMITS.denominator.max, Math.max(REMAINING_LIMITS.denominator.min, Math.round(denominator)))
    return { numerator: Math.min(bottom - 1, Math.max(1, Math.round(numerator))), denominator: bottom }
}

/** A cut always takes something and leaves something; a new cut forgets the guess */
export function setRemaining(state: RemainingState, patch: RemainingPatch): RemainingState {
    const first = cut(patch.firstNumerator ?? state.first.numerator, patch.firstDenominator ?? state.first.denominator)
    const second = cut(patch.secondNumerator ?? state.second.numerator, patch.secondDenominator ?? state.second.denominator)
    const same = first.numerator === state.first.numerator && first.denominator === state.first.denominator && second.numerator === state.second.numerator && second.denominator === state.second.denominator
    return same ? state : { first, second, prediction: null }
}

const asValue = (part: { numerator: number; denominator: number }) => fraction(part.numerator, part.denominator)
const ONE = fraction(1)

/** What the first cut leaves, of the whole */
export const leftAfterFirst = (state: Pick<RemainingState, 'first'>) => subtract(ONE, asValue(state.first))
/** The second cut, as a part of the whole */
export const secondOfWhole = (state: Pick<RemainingState, 'first' | 'second'>) => multiply(asValue(state.second), leftAfterFirst(state))
/** What is left at the end, of the whole */
export const remainingPart = (state: Pick<RemainingState, 'first' | 'second'>) => multiply(leftAfterFirst(state), subtract(ONE, asValue(state.second)))
/** The usual mistake: taking the second cut of the whole */
export const remainingMistake = (state: Pick<RemainingState, 'first' | 'second'>) => subtract(leftAfterFirst(state), asValue(state.second))

/** Less than half (<), exactly half (=) or more than half (>) left? */
export function remainingPrediction(state: RemainingState): Prediction {
    const relation = compare(remainingPart(state), fraction(1, 2))
    return relation < 0 ? '<' : relation === 0 ? '=' : '>'
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const tex = (part: { numerator: number; denominator: number }) => `\\frac{${part.numerator}}{${part.denominator}}`
const isSetUp = (state: RemainingState, first: FractionValue, second: FractionValue) => equals(asValue(state.first), first) && equals(asValue(state.second), second)
const predicted = (state: RemainingState) => state.prediction !== null && state.prediction === remainingPrediction(state)

const setUpAndGuess = (first: { numerator: number; denominator: number }, second: { numerator: number; denominator: number }) => say(
    `Txango batean bidearen $${tex(first)}$ egiten da lehen egunean, eta bigarrenean geratzen denaren $${tex(second)}$. Jarri ebakiak eta asmatu zenbat geratzen den.`,
    `En una excursión se hace $${tex(first)}$ del camino el primer día y $${tex(second)}$ de lo que queda el segundo. Pon los cortes y acierta cuánto queda.`,
    `في رحلة يُقطع $${tex(first)}$ من الطريق في اليوم الأول و$${tex(second)}$ من الباقي في الثاني. ضع القطعين وخمّن كم يبقى.`,
    `On a hike, $${tex(first)}$ of the way is walked on the first day and $${tex(second)}$ of what is left on the second. Set the cuts and guess how much is left.`
)
const setUpHint = (first: { numerator: number; denominator: number }, second: { numerator: number; denominator: number }) => {
    const left = `\\frac{${first.denominator - first.numerator}}{${first.denominator}}\\cdot\\frac{${second.denominator - second.numerator}}{${second.denominator}}`
    return say(`Geratzen dena: $${left}$.`, `Queda: $${left}$.`, `يبقى: $${left}$.`, `What is left: $${left}$.`)
}

export const remainingChallenges: LabChallenge<RemainingState>[] = [
    { id: 31801, prompt: setUpAndGuess({ numerator: 2, denominator: 5 }, { numerator: 1, denominator: 3 }), hint: setUpHint({ numerator: 2, denominator: 5 }, { numerator: 1, denominator: 3 }), isSolved: (state) => isSetUp(state, fraction(2, 5), fraction(1, 3)) && predicted(state) },
    { id: 31802, prompt: say('Lehen ebakia $\\frac{1}{4}$ da. Aukeratu bigarrena, osoaren erdia justu gera dadin.', 'El primer corte es $\\frac{1}{4}$. Elige el segundo para que quede justo la mitad.', 'القطع الأول $\\frac{1}{4}$. اختر الثاني ليبقى النصف تمامًا.', 'The first cut is $\\frac{1}{4}$. Choose the second so that exactly half is left.'), hint: say('$\\frac{3}{4}\\cdot\\square=\\frac{1}{2}$: geratu behar da $\\frac{2}{3}$.', '$\\frac{3}{4}\\cdot\\square=\\frac{1}{2}$: debe quedar $\\frac{2}{3}$.', '$\\frac{3}{4}\\cdot\\square=\\frac{1}{2}$: يجب أن يبقى $\\frac{2}{3}$.', '$\\frac{3}{4}\\cdot\\square=\\frac{1}{2}$: $\\frac{2}{3}$ must be left.'), isSolved: (state) => equals(asValue(state.first), fraction(1, 4)) && equals(remainingPart(state), fraction(1, 2)) },
    { id: 31803, prompt: say('Aukeratu bi ebaki, osoaren $\\frac{1}{6}$ bakarrik gera dadin.', 'Elige dos cortes para que solo quede $\\frac{1}{6}$ del total.', 'اختر قطعين ليبقى $\\frac{1}{6}$ فقط من الكل.', 'Choose two cuts so that only $\\frac{1}{6}$ of the whole is left.'), hint: say('$\\frac{1}{6}=\\frac{1}{2}\\cdot\\frac{1}{3}$.', '$\\frac{1}{6}=\\frac{1}{2}\\cdot\\frac{1}{3}$.', '$\\frac{1}{6}=\\frac{1}{2}\\cdot\\frac{1}{3}$.', '$\\frac{1}{6}=\\frac{1}{2}\\cdot\\frac{1}{3}$.'), isSolved: (state) => equals(remainingPart(state), fraction(1, 6)) },
    { id: 31804, prompt: setUpAndGuess({ numerator: 1, denominator: 3 }, { numerator: 1, denominator: 2 }), hint: setUpHint({ numerator: 1, denominator: 3 }, { numerator: 1, denominator: 2 }), isSolved: (state) => isSetUp(state, fraction(1, 3), fraction(1, 2)) && predicted(state) },
    { id: 31805, prompt: say('Lehen ebakia $\\frac{2}{5}$ da. Egin osoaren $\\frac{3}{10}$ gera dadin.', 'El primer corte es $\\frac{2}{5}$. Haz que quede $\\frac{3}{10}$ del total.', 'القطع الأول $\\frac{2}{5}$. اجعل الباقي $\\frac{3}{10}$ من الكل.', 'The first cut is $\\frac{2}{5}$. Make $\\frac{3}{10}$ of the whole be left.'), hint: say('$\\frac{3}{5}\\cdot\\square=\\frac{3}{10}$.', '$\\frac{3}{5}\\cdot\\square=\\frac{3}{10}$.', '$\\frac{3}{5}\\cdot\\square=\\frac{3}{10}$.', '$\\frac{3}{5}\\cdot\\square=\\frac{3}{10}$.'), isSolved: (state) => equals(asValue(state.first), fraction(2, 5)) && equals(remainingPart(state), fraction(3, 10)) }
]

/** Endless practice: two cuts to set and a guess to make */
const remainingMaker: LabChallengeMaker<RemainingState> = (random) => {
    const firstDenominator = randomInt(random, 2, 8)
    const secondDenominator = randomInt(random, 2, 8)
    const first = { numerator: randomInt(random, 1, firstDenominator - 1), denominator: firstDenominator }
    const second = { numerator: randomInt(random, 1, secondDenominator - 1), denominator: secondDenominator }
    const solution: RemainingState = { first, second, prediction: null }
    return {
        prompt: setUpAndGuess(first, second),
        hint: setUpHint(first, second),
        isSolved: (state) => isSetUp(state, asValue(first), asValue(second)) && predicted(state),
        solution: { ...solution, prediction: remainingPrediction(solution) }
    }
}

export const remainingExtra = freshFrom(initialRemainingState, remainingMaker)
