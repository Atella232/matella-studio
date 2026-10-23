import { compare, equals, fraction, gcd, toExactDecimal, type FractionValue } from '../math/fraction.ts'
import { pick, randomInt, shuffle, type Random } from './random.ts'
import type { Stars } from './records.ts'

/* ==========================================================================
   Ordenaren trena (El tren del orden): wagons arrive one at a time, each
   carrying a number, and the learner hooks each one into the gap that keeps
   the train going from the smallest to the largest. A wrong gap is
   explained with the neighbour it breaks the order with, written over a
   common denominator, and the wagon goes to its place.
   ========================================================================== */

export const TRAINS_PER_LEVEL = 2
/** Wagons that arrive after the first one, in each train */
export const TRAIN_ARRIVALS = 5
export const TRAIN_MAX_SCORE = TRAINS_PER_LEVEL * TRAIN_ARRIVALS

export type TrainLevel = 0 | 1 | 2
export type CardForm = 'fraction' | 'mixed' | 'decimal' | 'whole'

/** A number on a wagon, as written */
export interface TrainCard {
    value: FractionValue
    form: CardForm
    /** For 'fraction': the terms as written, which may not be simplified (6/8) */
    written: FractionValue
}

export interface Train {
    /** The first wagon, then the ones that arrive, in order */
    cards: TrainCard[]
}

/* ---------- Placing a wagon ---------- */

/**
 * The gaps where a wagon fits in a train kept in order: from after every
 * wagon worth less to before every wagon worth more. A wagon worth the same
 * as one already there may go on either side of it.
 */
export function fittingGaps(train: TrainCard[], card: TrainCard): { first: number; last: number } {
    const first = train.filter((item) => compare(item.value, card.value) < 0).length
    const last = train.filter((item) => compare(item.value, card.value) <= 0).length
    return { first, last }
}

export const fits = (train: TrainCard[], card: TrainCard, gap: number) => {
    const { first, last } = fittingGaps(train, card)
    return gap >= first && gap <= last
}

/** The train with the wagon hooked at a gap */
export const hookAt = (train: TrainCard[], card: TrainCard, gap: number) => [...train.slice(0, gap), card, ...train.slice(gap)]

/**
 * For a wrong gap, the wagon next to it that breaks the order: the one just
 * after the gap if the new wagon is worth more, the one just before it if
 * the new wagon is worth less.
 */
export function brokenNeighbour(train: TrainCard[], card: TrainCard, gap: number): { neighbour: TrainCard; cardIsLarger: boolean } | null {
    const { first, last } = fittingGaps(train, card)
    if (gap < first) return { neighbour: train[gap], cardIsLarger: true }
    if (gap > last) return { neighbour: train[gap - 1], cardIsLarger: false }
    return null
}

/** Smallest first: whether a train is in order */
export const inOrder = (cards: TrainCard[]) => cards.every((item, index) => index === 0 || compare(cards[index - 1].value, item.value) <= 0)

/** One point for each wagon hooked right at the first try */
export function trainStars(score: number): Stars {
    if (score >= 9) return 3
    if (score >= 7) return 2
    if (score >= 5) return 1
    return 0
}

/* ---------- Making the wagons ---------- */

const card = (value: FractionValue, form: CardForm, written: FractionValue = value): TrainCard => ({ value: fraction(value.numerator, value.denominator), form, written })

const FAMILIES = [[2, 4, 8], [3, 6, 12], [2, 4, 8], [5, 10], [3, 6]]

/** Level 1: one family of denominators (halves, quarters, eighths…), from 0 to 3, some not simplified */
function familyCard(random: Random, family: number[]): TrainCard {
    const denominator = pick(random, family)
    const numerator = randomInt(random, 1, 3 * denominator - 1)
    const value = fraction(numerator, denominator)
    if (value.denominator === 1) return card(value, 'whole')
    return card(value, 'fraction', { numerator, denominator })
}

/** Level 2: any denominator up to 12, improper fractions and mixed numbers, from 0 to 3 */
function anyCard(random: Random): TrainCard {
    for (;;) {
        const denominator = randomInt(random, 2, 12)
        const numerator = randomInt(random, 1, 3 * denominator - 1)
        const value = fraction(numerator, denominator)
        if (value.denominator === 1) continue
        if (value.numerator > value.denominator && random() < 0.4) return card(value, 'mixed')
        return card(value, 'fraction', value)
    }
}

/** Level 3: from −2 to 2, with negatives, exact decimals and mixed numbers */
function signedCard(random: Random): TrainCard {
    for (;;) {
        const sign = random() < 0.5 ? -1 : 1
        const kind = random()
        if (kind < 0.3) {
            // An exact decimal with one or two decimals
            const hundredths = pick(random, [5, 10, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90, 125, 150, 175])
            return card(fraction(sign * hundredths, 100), 'decimal')
        }
        const denominator = randomInt(random, 2, 10)
        const numerator = randomInt(random, 1, 2 * denominator - 1)
        const value = fraction(sign * numerator, denominator)
        if (value.denominator === 1) continue
        if (Math.abs(value.numerator) > value.denominator && kind < 0.5) return card(value, 'mixed')
        return card(value, 'fraction', value)
    }
}

const sameCard = (a: TrainCard, b: TrainCard) =>
    a.form === b.form && a.written.numerator === b.written.numerator && a.written.denominator === b.written.denominator && equals(a.value, b.value)

/**
 * A train: six different wagons. At most one pair is worth the same (an
 * equivalent fraction, which may go on either side), and at least one pair
 * is close, so the order takes some thought.
 */
export function createTrain(random: Random, level: TrainLevel): Train {
    const family = pick(random, FAMILIES)
    const make = () => (level === 0 ? familyCard(random, family) : level === 1 ? anyCard(random) : signedCard(random))
    for (;;) {
        const cards: TrainCard[] = []
        let guard = 0
        while (cards.length < TRAIN_ARRIVALS + 1 && guard < 200) {
            guard += 1
            const next = make()
            if (cards.some((item) => sameCard(item, next))) continue
            const equal = cards.filter((item) => equals(item.value, next.value)).length
            const pairs = cards.filter((item, index) => cards.slice(index + 1).some((other) => equals(other.value, item.value))).length
            if (equal > 0 && pairs > 0) continue
            cards.push(next)
        }
        if (cards.length < TRAIN_ARRIVALS + 1) continue
        // At least one close pair: neighbouring marks of the family, or less than a tenth apart
        const values = cards.map((item) => item.value.numerator / item.value.denominator).sort((a, b) => a - b)
        const closest = Math.min(...values.slice(1).map((value, index) => value - values[index]).filter((gap) => gap > 0))
        if (closest > (level === 0 ? 1 / Math.max(...family) : 0.1) + 1e-9) continue
        return { cards: shuffle(random, cards) }
    }
}

export function createTrains(random: Random, level: TrainLevel): Train[] {
    return Array.from({ length: TRAINS_PER_LEVEL }, () => createTrain(random, level))
}

/* ---------- Writing the numbers ---------- */

const frac = (numerator: number, denominator: number) => `${numerator < 0 ? '-' : ''}\\frac{${Math.abs(numerator)}}{${denominator}}`

/** A wagon's number as LaTeX: 6/8, 1 1/4, 0,75, −2 */
export function cardLatex(item: TrainCard, separator: ',' | '.' = ','): string {
    const { value } = item
    if (item.form === 'whole') return String(value.numerator)
    if (item.form === 'fraction') return frac(item.written.numerator, item.written.denominator)
    if (item.form === 'mixed') {
        const whole = Math.trunc(value.numerator / value.denominator)
        const rest = Math.abs(value.numerator) % value.denominator
        return `${value.numerator < 0 ? '-' : ''}${Math.abs(whole)}\\tfrac{${rest}}{${value.denominator}}`
    }
    const text = toExactDecimal(value, separator) ?? String(value.numerator / value.denominator)
    return text.replace(separator, `{${separator}}`)
}

/** A wagon's number as plain text, for sentences and screen readers: 6/8, 1 1/4 (a space that does not break), 0,75 */
export function cardText(item: TrainCard, separator: ',' | '.' = ','): string {
    return cardLatex(item, separator).replace(/\\tfrac\{(\d+)\}\{(\d+)\}/, '\u00a0$1/$2').replace(/\\frac\{(\d+)\}\{(\d+)\}/, '$1/$2').replace(/\{([,.])\}/, '$1').replace('-', '−')
}

const lcm = (a: number, b: number) => (a / gcd(a, b)) * b

/**
 * Why a wagon goes before or after another, over a common denominator:
 * 3/4 = 9/12 > 8/12 = 2/3. Decimals and mixed numbers are first written as
 * fractions.
 */
export function compareLatex(larger: TrainCard, smaller: TrainCard, separator: ',' | '.' = ','): string {
    const common = lcm(larger.value.denominator, smaller.value.denominator)
    const side = (item: TrainCard, end: 'left' | 'right') => {
        const steps = [cardLatex(item, separator)]
        const simple = frac(item.value.numerator, item.value.denominator)
        if (item.value.denominator !== 1 && (item.form === 'decimal' || item.form === 'mixed' || item.written.denominator !== item.value.denominator)) steps.push(simple)
        const scaled = item.value.denominator === 1 && common === 1 ? String(item.value.numerator) : frac((item.value.numerator * common) / item.value.denominator, common)
        if (steps[steps.length - 1] !== scaled) steps.push(scaled)
        return (end === 'left' ? steps : [...steps].reverse()).join('=')
    }
    const relation = equals(larger.value, smaller.value) ? '=' : '>'
    return `${side(larger, 'left')}${relation}${side(smaller, 'right')}`
}
