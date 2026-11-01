import { randomInt } from '../../../features/unit-v2/games/random.ts'
import { compare, equals, fraction, gcd, toLatex, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { freshFrom, type Prediction } from './prediction.ts'

/* ==========================================================================
   L1 · Lupa (La lupa en la recta): two fractions are written with a
   common denominator and the magnifier multiplies it by k. Between 1/3 and
   1/2 there is no fraction with denominator 6, one with 12 and two with
   18: there is always another one. First a guess: with this magnifier,
   how many fractions lie between them (none, one or more)? ▶ zooms into
   the segment and the marks appear; the learner picks one of them.
   ========================================================================== */

export const MAGNIFIER_LIMITS = { numerator: { min: -9, max: 9 }, denominator: { min: 1, max: 12 }, k: { min: 1, max: 10 } } as const

/** A fraction as the learner writes it, before simplifying */
export interface Terms {
    numerator: number
    denominator: number
}

export interface MagnifierState {
    first: Terms
    second: Terms
    /** The magnifier: the common denominator is multiplied by k */
    k: number
    /** The chosen mark between them, counted from the smaller one; 0 = none */
    pick: number
    prediction: Prediction | null
}

export const initialMagnifierState: MagnifierState = { first: { numerator: 1, denominator: 3 }, second: { numerator: 1, denominator: 2 }, k: 1, pick: 0, prediction: null }

const clamp = (value: number, { min, max }: { min: number; max: number }) => Math.min(max, Math.max(min, Math.round(value)))
const lcm = (a: number, b: number) => (a * b) / gcd(a, b)

export interface MagnifierPatch {
    firstNumerator?: number
    firstDenominator?: number
    secondNumerator?: number
    secondDenominator?: number
    k?: number
}

/** A new fraction or magnifier forgets the guess and the chosen mark */
export function setMagnifier(state: MagnifierState, patch: MagnifierPatch): MagnifierState {
    const first = { numerator: clamp(patch.firstNumerator ?? state.first.numerator, MAGNIFIER_LIMITS.numerator), denominator: clamp(patch.firstDenominator ?? state.first.denominator, MAGNIFIER_LIMITS.denominator) }
    const second = { numerator: clamp(patch.secondNumerator ?? state.second.numerator, MAGNIFIER_LIMITS.numerator), denominator: clamp(patch.secondDenominator ?? state.second.denominator, MAGNIFIER_LIMITS.denominator) }
    const k = clamp(patch.k ?? state.k, MAGNIFIER_LIMITS.k)
    const same = first.numerator === state.first.numerator && first.denominator === state.first.denominator && second.numerator === state.second.numerator && second.denominator === state.second.denominator && k === state.k
    return same ? state : { first, second, k, pick: 0, prediction: null }
}

export const valueOf = (terms: Terms): FractionValue => fraction(terms.numerator, terms.denominator)

/** Both fractions over the common denominator times k: low and high numerators over it */
export function magnifierGrid(state: Pick<MagnifierState, 'first' | 'second' | 'k'>) {
    const denominator = lcm(state.first.denominator, state.second.denominator) * state.k
    const a = (state.first.numerator * denominator) / state.first.denominator
    const b = (state.second.numerator * denominator) / state.second.denominator
    return { denominator, low: Math.min(a, b), high: Math.max(a, b), firstTop: a, secondTop: b }
}

/** Fractions with that denominator strictly between the two */
export const betweenCount = (state: Pick<MagnifierState, 'first' | 'second' | 'k'>) => {
    const { low, high } = magnifierGrid(state)
    return Math.max(0, high - low - 1)
}

export function pickMark(state: MagnifierState, pick: number): MagnifierState {
    return { ...state, pick: Math.min(betweenCount(state), Math.max(0, Math.round(pick))) }
}

/** The chosen mark as a fraction, or null */
export function pickedValue(state: MagnifierState): FractionValue | null {
    if (state.pick < 1 || state.pick > betweenCount(state)) return null
    const { denominator, low } = magnifierGrid(state)
    return fraction(low + state.pick, denominator)
}

/** None (<), exactly one (=) or more than one (>) between them? */
export function magnifierPrediction(state: MagnifierState): Prediction {
    const count = betweenCount(state)
    return count === 0 ? '<' : count === 1 ? '=' : '>'
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const isPair = (state: MagnifierState, a: FractionValue, b: FractionValue) => {
    const first = valueOf(state.first)
    const second = valueOf(state.second)
    return (equals(first, a) && equals(second, b)) || (equals(first, b) && equals(second, a))
}
const pickedBetween = (state: MagnifierState, a: FractionValue, b: FractionValue) => {
    const value = pickedValue(state)
    if (value === null || !isPair(state, a, b)) return false
    const [low, high] = compare(a, b) < 0 ? [a, b] : [b, a]
    return compare(low, value) < 0 && compare(value, high) < 0
}

const findBetween = (a: string, b: string) => say(
    `Aurkitu $${a}$ eta $${b}$ arteko zatiki bat: jarri biak, handitu lupa eta aukeratu marka bat.`,
    `Encuentra una fracción entre $${a}$ y $${b}$: ponlas, sube la lupa y elige una marca.`,
    `جد كسرًا بين $${a}$ و$${b}$: ضعهما، وكبّر العدسة، واختر علامة.`,
    `Find a fraction between $${a}$ and $${b}$: set both, turn up the magnifier and pick a mark.`
)
const findHint = say('$k=1$ denean ez badago, igo $k$: izendatzailea handitzen da eta tartean marka gehiago agertzen dira.', 'Si con $k=1$ no hay ninguna, sube $k$: el denominador crece y aparecen marcas en medio.', 'إذا لم يوجد أي كسر مع $k=1$ فارفع $k$: يكبر المقام وتظهر علامات بينهما.', 'If there is none with $k=1$, turn $k$ up: the denominator grows and marks appear in between.')

export const magnifierChallenges: LabChallenge<MagnifierState>[] = [
    { id: 31701, prompt: findBetween('\\frac{1}{3}', '\\frac{1}{2}'), hint: say('$\\frac{1}{3}=\\frac{4}{12}$ eta $\\frac{1}{2}=\\frac{6}{12}$: tartean $\\frac{5}{12}$.', '$\\frac{1}{3}=\\frac{4}{12}$ y $\\frac{1}{2}=\\frac{6}{12}$: en medio, $\\frac{5}{12}$.', '$\\frac{1}{3}=\\frac{4}{12}$ و$\\frac{1}{2}=\\frac{6}{12}$: بينهما $\\frac{5}{12}$.', '$\\frac{1}{3}=\\frac{4}{12}$ and $\\frac{1}{2}=\\frac{6}{12}$: in between, $\\frac{5}{12}$.'), isSolved: (state) => pickedBetween(state, fraction(1, 3), fraction(1, 2)) },
    { id: 31702, prompt: findBetween('-\\frac{1}{2}', '-\\frac{1}{3}'), hint: say('Zenbakitzaile negatiboak: $-\\frac{6}{12}$ eta $-\\frac{4}{12}$ artean $-\\frac{5}{12}$ dago.', 'Con numeradores negativos: entre $-\\frac{6}{12}$ y $-\\frac{4}{12}$ está $-\\frac{5}{12}$.', 'ببسوط سالبة: بين $-\\frac{6}{12}$ و$-\\frac{4}{12}$ يقع $-\\frac{5}{12}$.', 'With negative numerators: between $-\\frac{6}{12}$ and $-\\frac{4}{12}$ is $-\\frac{5}{12}$.'), isSolved: (state) => pickedBetween(state, fraction(-1, 2), fraction(-1, 3)) },
    { id: 31703, prompt: say('Jarri $\\frac{2}{5}$ eta $\\frac{3}{5}$, eta egin lupak tartean zehazki lau zatiki erakuts ditzan.', 'Pon $\\frac{2}{5}$ y $\\frac{3}{5}$ y haz que la lupa enseñe exactamente cuatro fracciones entre ellas.', 'ضع $\\frac{2}{5}$ و$\\frac{3}{5}$ واجعل العدسة تُظهر أربعة كسور بينهما تمامًا.', 'Set $\\frac{2}{5}$ and $\\frac{3}{5}$ and make the magnifier show exactly four fractions between them.'), hint: say('$k$ handitzeak tartea $k$ zatitan banatzen du: $k-1$ marka.', 'Con el aumento $k$ el hueco se parte en $k$ trozos: $k-1$ marcas.', 'مع التكبير $k$ تنقسم الفجوة إلى $k$ أجزاء: $k-1$ علامات.', 'With magnifier $k$ the gap splits into $k$ pieces: $k-1$ marks.'), isSolved: (state) => isPair(state, fraction(2, 5), fraction(3, 5)) && betweenCount(state) === 4 },
    { id: 31704, prompt: say('Aurkitu $\\frac{3}{4}$ eta $\\frac{4}{5}$ zatikien erdiko puntua.', 'Encuentra el punto medio entre $\\frac{3}{4}$ y $\\frac{4}{5}$.', 'جد منتصف المسافة بين $\\frac{3}{4}$ و$\\frac{4}{5}$.', 'Find the point halfway between $\\frac{3}{4}$ and $\\frac{4}{5}$.'), hint: say('$\\frac{30}{40}$ eta $\\frac{32}{40}$: erdian $\\frac{31}{40}$.', '$\\frac{30}{40}$ y $\\frac{32}{40}$: en medio, $\\frac{31}{40}$.', '$\\frac{30}{40}$ و$\\frac{32}{40}$: في المنتصف $\\frac{31}{40}$.', '$\\frac{30}{40}$ and $\\frac{32}{40}$: in the middle, $\\frac{31}{40}$.'), isSolved: (state) => isPair(state, fraction(3, 4), fraction(4, 5)) && pickedValue(state) !== null && equals(pickedValue(state)!, fraction(31, 40)) },
    { id: 31705, prompt: say('Badago zatikirik $0{,}3$ eta $\\frac{1}{3}$ artean? Aurkitu bat.', '¿Hay alguna fracción entre $0{,}3$ y $\\frac{1}{3}$? Encuentra una.', 'هل يوجد كسر بين $0.3$ و$\\frac{1}{3}$؟ جد واحدًا.', 'Is there a fraction between $0{,}3$ and $\\frac{1}{3}$? Find one.'), hint: say('$0{,}3=\\frac{3}{10}$. Izendatzaile komuna $30$ da: igo $k$.', '$0{,}3=\\frac{3}{10}$. El denominador común es $30$: sube $k$.', '$0.3=\\frac{3}{10}$. المقام المشترك $30$: ارفع $k$.', '$0{,}3=\\frac{3}{10}$. The common denominator is $30$: turn $k$ up.'), isSolved: (state) => pickedBetween(state, fraction(3, 10), fraction(1, 3)) }
]

/** Endless practice: two close fractions, find one in between */
const magnifierMaker: LabChallengeMaker<MagnifierState> = (random) => {
    for (;;) {
        const first = { numerator: randomInt(random, -9, 9), denominator: randomInt(random, 2, 9) }
        const second = { numerator: randomInt(random, -9, 9), denominator: randomInt(random, 2, 9) }
        const a = valueOf(first)
        const b = valueOf(second)
        const gap = Math.abs(a.numerator / a.denominator - b.numerator / b.denominator)
        if (compare(a, b) === 0 || gap > 0.5 || Math.abs(a.numerator / a.denominator) > 2) continue
        const solution = pickMark({ first, second, k: 2, pick: 0, prediction: null }, 1)
        return { prompt: findBetween(toLatex(a), toLatex(b)), hint: findHint, isSolved: (state) => pickedBetween(state, a, b), solution }
    }
}

export const magnifierExtra = freshFrom(initialMagnifierState, magnifierMaker)
