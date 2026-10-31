import { randomInt, shuffle } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, type Prediction } from './prediction.ts'

/* ==========================================================================
   L1 · Monomio-fitxak (Las fichas de monomios): a polynomial written as a
   row of monomial chips. The learner taps two chips to join them: like
   terms (same power of x) merge into one chip with the coefficients added,
   and two opposite chips vanish; unlike terms refuse to merge. Before
   starting, the learner predicts how many terms will be left. Five fixed
   decks carry the challenges; a shuffled deck gives free practice (there
   is no endless challenge: the tool cannot hand the learner a deck).
   Pure logic.
   ========================================================================== */

export interface Chip {
    coefficient: number
    power: number
}

const c = (coefficient: number, power: number): Chip => ({ coefficient, power })

/** Five decks: unreduced polynomials with a known reduction */
export const CHIP_DECKS: Chip[][] = [
    [c(3, 2), c(-1, 1), c(2, 2), c(4, 1), c(5, 0)],
    [c(4, 1), c(-2, 3), c(-4, 1), c(1, 0), c(5, 3), c(2, 0)],
    [c(1, 2), c(6, 0), c(-3, 2), c(2, 1), c(2, 2), c(-1, 0), c(-2, 1)],
    [c(-5, 1), c(2, 3), c(3, 1), c(-2, 3), c(7, 0), c(1, 2)],
    [c(2, 4), c(3, 2), c(-1, 4), c(-3, 2), c(4, 0), c(-1, 4), c(2, 1)]
]

export interface ChipsState {
    /** The fixed deck being played, or -1 for a shuffled one */
    deck: number
    /** The chips the deck started with */
    original: Chip[]
    chips: Chip[]
    /** The chip waiting for a partner */
    selected: number | null
    /** The last tap joined two unlike chips */
    refused: boolean
    prediction: Prediction | null
}

const fromChips = (deck: number, original: Chip[]): ChipsState => ({ deck, original, chips: original.map((chip) => ({ ...chip })), selected: null, refused: false, prediction: null })
export const startDeck = (deck: number): ChipsState => fromChips(deck, CHIP_DECKS[deck])
export const initialChipsState: ChipsState = startDeck(0)

/** A shuffled deck of five to seven chips that can be reduced at least once */
export function randomDeck(random: () => number): ChipsState {
    for (;;) {
        const count = randomInt(random, 5, 7)
        const chips = Array.from({ length: count }, () => c(randomInt(random, -5, 5) || 1, randomInt(random, 0, 3)))
        const reduced = reduceChips(chips)
        if (reduced.length > 0 && reduced.length < chips.length) return fromChips(-1, shuffle(random, chips))
    }
}

/** The fully reduced polynomial of a deck, highest power first */
export function reduceChips(chips: Chip[]): Chip[] {
    const totals = new Map<number, number>()
    for (const chip of chips) totals.set(chip.power, (totals.get(chip.power) ?? 0) + chip.coefficient)
    return [...totals.entries()].filter(([, coefficient]) => coefficient !== 0).sort((a, b) => b[0] - a[0]).map(([power, coefficient]) => c(coefficient, power))
}

/** Fewer than 3, exactly 3 or more than 3 terms left? */
export const chipsPrediction = (state: ChipsState): Prediction => compareTo(reduceChips(state.original).length, 3)
/** Nothing left to join */
export const chipsReduced = (state: ChipsState) => new Set(state.chips.map((chip) => chip.power)).size === state.chips.length

/** Tap a chip: select it, or join it with the selected one */
export function tapChip(state: ChipsState, index: number): ChipsState {
    if (index < 0 || index >= state.chips.length) return state
    if (state.selected === null || state.selected === index) return { ...state, selected: state.selected === index ? null : index, refused: false }
    const first = state.chips[state.selected]
    const second = state.chips[index]
    if (first.power !== second.power) return { ...state, selected: null, refused: true }
    const merged = c(first.coefficient + second.coefficient, first.power)
    const keep = Math.min(state.selected, index)
    const drop = Math.max(state.selected, index)
    const chips = state.chips.flatMap((chip, position) => (position === drop ? [] : position === keep ? (merged.coefficient === 0 ? [] : [merged]) : [chip]))
    return { ...state, chips, selected: null, refused: false }
}

export const setChipsPrediction = (state: ChipsState, prediction: Prediction): ChipsState => (state.prediction === null ? { ...state, prediction } : state)

/** A monomial in LaTeX: 3x^{2}, -x, 5 */
export function chipLatex(chip: Chip, first = true): string {
    const sign = chip.coefficient < 0 ? '-' : first ? '' : '+'
    const size = Math.abs(chip.coefficient)
    const letter = chip.power === 0 ? '' : chip.power === 1 ? 'x' : `x^{${chip.power}}`
    const number = size === 1 && letter !== '' ? '' : String(size)
    return `${sign}${number}${letter}`
}

export const chipsLatex = (chips: Chip[]) => (chips.length === 0 ? '0' : chips.map((chip, index) => chipLatex(chip, index === 0)).join(''))

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })

/** The deck is fully reduced (the order of the chips does not matter) */
const reducedDeck = (deck: number) => (state: ChipsState) => state.deck === deck && chipsReduced(state) && chipsLatex(reduceChips(state.chips)) === chipsLatex(reduceChips(CHIP_DECKS[deck])) && state.chips.length === reduceChips(CHIP_DECKS[deck]).length

export const chipsChallenges: LabChallenge<ChipsState>[] = [
    { id: 91101, prompt: say('Laburtu guztiz 1. sorta.', 'Reduce del todo el mazo 1.', 'اختصر المجموعة 1 كليًا.', 'Fully reduce deck 1.'), hint: say('Elkartu $x^{2}$ fitxak eta $x$ fitxak.', 'Junta las fichas de $x^{2}$ y las de $x$.', 'اجمع رقاقات $x^{2}$ ورقاقات $x$.', 'Join the $x^{2}$ chips and the $x$ chips.'), isSolved: reducedDeck(0) },
    { id: 91102, prompt: say('Laburtu guztiz 2. sorta: fitxa batzuk desagertu egiten dira.', 'Reduce del todo el mazo 2: algunas fichas desaparecen.', 'اختصر المجموعة 2 كليًا: بعض الرقاقات تختفي.', 'Fully reduce deck 2: some chips disappear.'), hint: say('$4x$ eta $-4x$ elkartuta, zero.', '$4x$ y $-4x$ juntos dan cero.', '$4x$ و$-4x$ معًا صفر.', '$4x$ and $-4x$ together make zero.'), isSolved: reducedDeck(1) },
    { id: 91103, prompt: say('Laburtu guztiz 3. sorta.', 'Reduce del todo el mazo 3.', 'اختصر المجموعة 3 كليًا.', 'Fully reduce deck 3.'), hint: say('Hiru maila daude: $x^{2}$, $x$ eta zenbakiak.', 'Hay tres grados: $x^{2}$, $x$ y números.', 'هناك ثلاث درجات: $x^{2}$ و$x$ والأعداد.', 'There are three degrees: $x^{2}$, $x$ and numbers.'), isSolved: reducedDeck(2) },
    { id: 91104, prompt: say('Laburtu guztiz 4. sorta.', 'Reduce del todo el mazo 4.', 'اختصر المجموعة 4 كليًا.', 'Fully reduce deck 4.'), hint: say('$2x^{3}$ eta $-2x^{3}$ ezeztatu egiten dira.', '$2x^{3}$ y $-2x^{3}$ se anulan.', '$2x^{3}$ و$-2x^{3}$ يلغي أحدهما الآخر.', '$2x^{3}$ and $-2x^{3}$ cancel out.'), isSolved: reducedDeck(3) },
    { id: 91105, prompt: say('Laburtu guztiz 5. sorta.', 'Reduce del todo el mazo 5.', 'اختصر المجموعة 5 كليًا.', 'Fully reduce deck 5.'), hint: say('Hiru $x^{4}$ fitxa daude.', 'Hay tres fichas de $x^{4}$.', 'هناك ثلاث رقاقات $x^{4}$.', 'There are three $x^{4}$ chips.'), isSolved: reducedDeck(4) }
]
