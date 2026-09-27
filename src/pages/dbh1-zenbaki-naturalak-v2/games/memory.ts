import { randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { Stars } from '../../../features/unit-v2/games/records.ts'
import { formatNatural } from '../format.ts'
import { fromRoman, toRoman } from '../numbers.ts'

/* ==========================================================================
   Memoria: a Roman numeral and its value, a power and its value, or a trio
   (number, expanded form, powers of ten). Every board is built from trap
   pairs: IX next to XI, 2³ next to 3², 3.402 next to 3.042.
   ========================================================================== */

export type NaturalsCardKind = 'value' | 'roman' | 'power' | 'expanded' | 'tens'

export interface NaturalsCard {
    id: string
    setId: number
    value: number
    kind: NaturalsCardKind
    /** Base and exponent for power cards */
    terms: number[]
}

export interface NaturalsMemoryLevel {
    groups: number
    groupSize: 2 | 3
}

export const naturalsMemoryLevels: NaturalsMemoryLevel[] = [
    { groups: 6, groupSize: 2 },
    { groups: 6, groupSize: 2 },
    { groups: 6, groupSize: 3 }
]

/** Roman numerals that look alike when you read them the wrong way round */
const romanTraps: Array<[number, number]> = [[4, 6], [9, 11], [40, 60], [90, 110], [14, 16], [19, 21], [400, 600], [900, 1100], [49, 51], [44, 66]]

/** Base and exponent swapped: 2³ and 3² have different values */
const powerTraps: Array<[[number, number], [number, number]]> = [
    [[2, 3], [3, 2]],
    [[2, 5], [5, 2]],
    [[3, 4], [4, 3]],
    [[2, 7], [7, 2]],
    [[3, 5], [5, 3]],
    [[10, 2], [2, 10]]
]

function pairsBoard(random: Random, groups: number, make: (random: Random) => Array<Omit<NaturalsCard, 'id' | 'setId'>>): NaturalsCard[] {
    const cards: NaturalsCard[] = []
    const values = new Set<number>()
    for (const card of make(random)) {
        if (values.has(card.value) || values.size >= groups) continue
        const setId = values.size
        values.add(card.value)
        cards.push({ ...card, id: `${setId}-a`, setId })
        cards.push({ id: `${setId}-v`, setId, value: card.value, kind: 'value', terms: [] })
    }
    return cards
}

function trioBoard(random: Random, groups: number): NaturalsCard[] {
    const cards: NaturalsCard[] = []
    const values = new Set<number>()
    while (values.size < groups) {
        // 3.402 and 3.042: the same digits with the zero in another place
        const [a, b, c] = [randomInt(random, 1, 9), randomInt(random, 1, 9), randomInt(random, 1, 9)]
        for (const value of [a * 1000 + b * 100 + c, a * 1000 + b * 10 + c]) {
            if (values.has(value) || values.size >= groups) continue
            const setId = values.size
            values.add(value)
            cards.push({ id: `${setId}-v`, setId, value, kind: 'value', terms: [] })
            cards.push({ id: `${setId}-e`, setId, value, kind: 'expanded', terms: [] })
            cards.push({ id: `${setId}-t`, setId, value, kind: 'tens', terms: [] })
        }
    }
    return cards
}

export function createNaturalsMemoryBoard(random: Random, levelIndex: number): NaturalsCard[] {
    const { groups } = naturalsMemoryLevels[levelIndex]
    if (levelIndex === 2) return shuffle(random, trioBoard(random, groups))
    const cards = levelIndex === 0
        ? pairsBoard(random, groups, (rng) => shuffle(rng, romanTraps).flat().map((value) => ({ value, kind: 'roman' as const, terms: [] })))
        : pairsBoard(random, groups, (rng) => shuffle(rng, powerTraps).flat().map(([base, exponent]) => ({ value: base ** exponent, kind: 'power' as const, terms: [base, exponent] })))
    return shuffle(random, cards)
}

/** Nonzero places of a number, from the largest */
function places(value: number): Array<{ digit: number; power: number }> {
    return String(value).split('').map((digit, index, all) => ({ digit: Number(digit), power: all.length - 1 - index })).filter((part) => part.digit > 0)
}

/** Value of the card computed from what it shows (used by the tests) */
export function naturalsCardValue(card: NaturalsCard): number {
    switch (card.kind) {
        case 'roman': return fromRoman(toRoman(card.value)) ?? -1
        case 'power': return card.terms[0] ** card.terms[1]
        default: return card.value
    }
}

export function naturalsCardLatex(card: NaturalsCard): string {
    switch (card.kind) {
        case 'value': return formatNatural(card.value)
        case 'roman': return `\\mathrm{${toRoman(card.value)}}`
        case 'power': return `${card.terms[0]}^{${card.terms[1]}}`
        case 'expanded': return places(card.value).map((part) => formatNatural(part.digit * 10 ** part.power)).join('+')
        // Each term in braces, so a long card only breaks after a +
        case 'tens': return places(card.value).map((part) => (part.power === 0 ? String(part.digit) : part.power === 1 ? `{${part.digit}\\cdot 10}` : `{${part.digit}\\cdot 10^{${part.power}}}`)).join('+')
    }
}

export type FlipResult = 'continue' | 'match' | 'mismatch'

export function evaluateNaturalsFlip(cards: NaturalsCard[], flipped: number[], groupSize: number): FlipResult {
    if (flipped.length < 2) return 'continue'
    const setId = cards[flipped[0]].setId
    if (flipped.some((index) => cards[index].setId !== setId)) return 'mismatch'
    return flipped.length === groupSize ? 'match' : 'continue'
}

export function naturalsMemoryStars(levelIndex: number, moves: number): Stars {
    const { groups } = naturalsMemoryLevels[levelIndex]
    if (moves <= Math.ceil(groups * 1.6)) return 3
    if (moves <= Math.ceil(groups * 2.3)) return 2
    return 1
}
