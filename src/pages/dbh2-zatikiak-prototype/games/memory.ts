import { equals, fraction, hasTerminatingDecimal, multiply, toExactDecimal, toLatex, type FractionValue } from '../math/fraction.ts'
import { pick, shuffle, type Random } from './random.ts'
import type { Stars } from './records.ts'

/* ==========================================================================
   Memoria: find the cards that write the same value in different ways.
   Boards mix "trap" values (1/4 and 0,4, 1/5 and 0,5…) so matching by the
   digits instead of the value does not work.
   ========================================================================== */

export type CardKind = 'fraction' | 'decimal' | 'percent' | 'mixed' | 'bar' | 'line'

export interface MemoryCard {
    id: string
    setId: number
    value: FractionValue
    kind: CardKind
}

export interface MemoryLevel {
    groups: number
    groupSize: 2 | 3
    /** Representation pairs (or trios) the level can deal */
    layouts: CardKind[][]
    values: FractionValue[]
}

const f = fraction

/** Values whose digits invite a wrong match (1/4 ↔ 0,4; 1/5 ↔ 0,5; 3/4 ↔ 0,34…) */
const trapFamilies: FractionValue[][] = [
    [f(1, 4), f(2, 5)],
    [f(1, 5), f(1, 2)],
    [f(3, 4), f(3, 5)],
    [f(1, 8), f(4, 5)],
    [f(5, 4), f(3, 2)]
]

export const memoryLevels: MemoryLevel[] = [
    {
        groups: 6,
        groupSize: 2,
        layouts: [['fraction', 'bar'], ['fraction', 'decimal']],
        values: [f(1, 2), f(1, 3), f(2, 3), f(1, 4), f(3, 4), f(1, 5), f(2, 5), f(3, 5), f(4, 5), f(1, 6), f(5, 6), f(3, 8), f(7, 10)]
    },
    {
        groups: 8,
        groupSize: 2,
        layouts: [['fraction', 'percent'], ['fraction', 'mixed'], ['fraction', 'line'], ['decimal', 'percent'], ['fraction', 'bar'], ['mixed', 'line']],
        values: [f(1, 4), f(3, 4), f(2, 5), f(3, 5), f(1, 5), f(1, 2), f(5, 4), f(3, 2), f(7, 4), f(5, 3), f(7, 3), f(9, 4), f(4, 3), f(3, 10), f(1, 8), f(4, 5)]
    },
    {
        groups: 6,
        groupSize: 3,
        layouts: [['fraction', 'decimal', 'percent'], ['fraction', 'bar', 'percent'], ['mixed', 'decimal', 'percent']],
        values: [f(1, 4), f(2, 5), f(1, 5), f(1, 2), f(3, 4), f(3, 5), f(4, 5), f(1, 8), f(5, 4), f(3, 2), f(7, 20), f(9, 10), f(7, 4), f(3, 20)]
    }
]

/** Whether a value can be shown as this kind of card */
export function supportsKind(value: FractionValue, kind: CardKind): boolean {
    const normalized = fraction(value.numerator, value.denominator)
    const positive = normalized.numerator > 0
    switch (kind) {
        case 'fraction': return true
        case 'decimal': return hasTerminatingDecimal(normalized)
        case 'percent': return hasTerminatingDecimal(normalized) && multiply(normalized, fraction(100)).denominator === 1
        case 'mixed': return positive && normalized.numerator > normalized.denominator && normalized.denominator !== 1
        case 'bar': return positive && normalized.numerator <= normalized.denominator * 2 && normalized.denominator <= 10
        case 'line': return positive && normalized.numerator <= normalized.denominator * 3 && normalized.denominator <= 6
    }
}

export function createMemoryBoard(random: Random, levelIndex: number, levels: MemoryLevel[] = memoryLevels): MemoryCard[] {
    const level = levels[levelIndex]
    const chosen: FractionValue[] = []
    const playable = (value: FractionValue) => level.layouts.some((layout) => layout.every((kind) => supportsKind(value, kind)))
    const available = level.values.filter(playable)
    // Two trap families first, then fill with the rest of the level's values
    const families = shuffle(random, trapFamilies.filter((family) => family.every((value) => available.some((item) => equals(item, value)))))
    for (const family of families.slice(0, 2)) chosen.push(...family)
    for (const value of shuffle(random, available)) {
        if (chosen.length >= level.groups) break
        if (!chosen.some((item) => equals(item, value))) chosen.push(value)
    }

    const cards: MemoryCard[] = []
    chosen.slice(0, level.groups).forEach((value, setId) => {
        const layouts = level.layouts.filter((layout) => layout.every((kind) => supportsKind(value, kind)))
        pick(random, layouts).forEach((kind, index) => cards.push({ id: `${setId}-${index}-${kind}`, setId, value, kind }))
    })
    return shuffle(random, cards)
}

export type FlipResult = 'continue' | 'match' | 'mismatch'

/**
 * Evaluates the face-up cards of the current turn: a turn ends as soon as a
 * card does not belong to the first card's set, or when the set is complete.
 */
export function evaluateFlip(cards: MemoryCard[], flipped: number[], groupSize: number): FlipResult {
    if (flipped.length < 2) return 'continue'
    const setId = cards[flipped[0]].setId
    if (flipped.some((index) => cards[index].setId !== setId)) return 'mismatch'
    return flipped.length === groupSize ? 'match' : 'continue'
}

export function memoryStars(levelIndex: number, moves: number, levels: MemoryLevel[] = memoryLevels): Stars {
    const { groups } = levels[levelIndex]
    if (moves <= Math.ceil(groups * 1.6)) return 3
    if (moves <= Math.ceil(groups * 2.3)) return 2
    return 1
}

/** Text for decimals and percentages in LaTeX ({,} keeps the comma tight) */
export function decimalLatex(value: FractionValue, separator: ',' | '.' = ','): string {
    const decimal = toExactDecimal(value, separator) ?? toLatex(value)
    return separator === ',' ? decimal.replace(',', '{,}') : decimal
}

export function cardLatex(card: MemoryCard, separator: ',' | '.' = ','): string | null {
    const value = fraction(card.value.numerator, card.value.denominator)
    switch (card.kind) {
        case 'fraction': return toLatex(value)
        case 'decimal': return decimalLatex(value, separator)
        case 'percent': return `${toLatex(multiply(value, fraction(100)))}\\%`
        case 'mixed': {
            const whole = Math.floor(value.numerator / value.denominator)
            return `${whole}\\tfrac{${value.numerator - whole * value.denominator}}{${value.denominator}}`
        }
        default: return null
    }
}

/** Shows the value of two mismatched cards in the same form so the difference is visible */
export function mismatchLatex(first: MemoryCard, second: MemoryCard, separator: ',' | '.' = ','): string {
    const both = [first.value, second.value]
    const readable = both.every((value) => hasTerminatingDecimal(value))
        ? both.map((value) => decimalLatex(value, separator))
        : both.map((value) => toLatex(value))
    return `${readable[0]}\\neq ${readable[1]}`
}
