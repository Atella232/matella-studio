import { pick, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { Stars } from '../../../features/unit-v2/games/records.ts'
import type { UnitLanguage } from '../../../features/unit-v2/types.ts'
import { divisors, factorize, factorLatex, gcd, lcm } from '../math.ts'

/* ==========================================================================
   Memoria: a number and its factorization, a ZKH/MKT and its value, or a
   trio (number, factorization, a product of two factors). Boards include
   traps: the ZKH and the MKT of the same pair, or 2³·3 next to 2·3³.
   ========================================================================== */

export type DivisibilityCardKind = 'value' | 'factors' | 'gcd' | 'lcm' | 'product'

export interface DivisibilityCard {
    id: string
    setId: number
    value: number
    kind: DivisibilityCardKind
    /** The pair for ZKH/MKT cards, the two factors for product cards */
    terms: number[]
}

export interface DivisibilityMemoryLevel {
    groups: number
    groupSize: 2 | 3
}

export const divisibilityMemoryLevels: DivisibilityMemoryLevel[] = [
    { groups: 6, groupSize: 2 },
    { groups: 8, groupSize: 2 },
    { groups: 6, groupSize: 3 }
]

const factorizable = [12, 18, 20, 24, 28, 30, 36, 40, 42, 45, 48, 54, 56, 60, 63, 72, 80, 84, 90, 96, 100, 108, 120, 144]

/** Pairs whose ZKH and MKT are both small and different from every other value on the board */
const gcdPairs: Array<[number, number]> = [[12, 18], [8, 12], [6, 15], [10, 15], [9, 12], [14, 21], [8, 20], [4, 10], [6, 9], [12, 20], [15, 20], [16, 24]]

function cardsForFactorLevel(random: Random, groups: number, withProduct: boolean): DivisibilityCard[] {
    const cards: DivisibilityCard[] = []
    const values = shuffle(random, factorizable).slice(0, groups)
    values.forEach((value, setId) => {
        cards.push({ id: `${setId}-v`, setId, value, kind: 'value', terms: [] })
        cards.push({ id: `${setId}-f`, setId, value, kind: 'factors', terms: [] })
        if (withProduct) {
            const middle = divisors(value).filter((divisor) => divisor > 2 && divisor * divisor <= value && value / divisor > 2)
            const first = middle.length ? pick(random, middle) : 2
            cards.push({ id: `${setId}-p`, setId, value, kind: 'product', terms: [first, value / first] })
        }
    })
    return cards
}

function cardsForGcdLevel(random: Random, groups: number): DivisibilityCard[] {
    const cards: DivisibilityCard[] = []
    const used = new Set<number>()
    let setId = 0
    for (const [a, b] of shuffle(random, gcdPairs)) {
        if (setId >= groups) break
        const g = gcd(a, b)
        const m = lcm(a, b)
        // Both the ZKH and the MKT of the pair go on the board: the trap
        for (const [kind, value] of [['gcd', g], ['lcm', m]] as Array<['gcd' | 'lcm', number]>) {
            if (setId >= groups || used.has(value)) continue
            used.add(value)
            cards.push({ id: `${setId}-e`, setId, value, kind, terms: [a, b] })
            cards.push({ id: `${setId}-v`, setId, value, kind: 'value', terms: [] })
            setId += 1
        }
    }
    return cards
}

export function createDivisibilityMemoryBoard(random: Random, levelIndex: number): DivisibilityCard[] {
    const { groups } = divisibilityMemoryLevels[levelIndex]
    const cards = levelIndex === 1 ? cardsForGcdLevel(random, groups) : cardsForFactorLevel(random, groups, levelIndex === 2)
    return shuffle(random, cards)
}

/** Value of the card computed from what it shows (used by the tests) */
export function divisibilityCardValue(card: DivisibilityCard): number {
    switch (card.kind) {
        case 'value':
        case 'factors': return card.value
        case 'gcd': return gcd(card.terms[0], card.terms[1])
        case 'lcm': return lcm(card.terms[0], card.terms[1])
        case 'product': return card.terms[0] * card.terms[1]
    }
}

export function divisibilityCardLatex(card: DivisibilityCard, language: UnitLanguage): string {
    const gcdName = language === 'es' ? '\\text{m.c.d.}' : '\\mathrm{ZKH}'
    const lcmName = language === 'es' ? '\\text{m.c.m.}' : '\\mathrm{MKT}'
    switch (card.kind) {
        case 'value': return String(card.value)
        case 'factors': return factorLatex(factorize(card.value))
        case 'gcd': return `${gcdName}(${card.terms[0]},${card.terms[1]})`
        case 'lcm': return `${lcmName}(${card.terms[0]},${card.terms[1]})`
        case 'product': return `${card.terms[0]}\\cdot ${card.terms[1]}`
    }
}

export type FlipResult = 'continue' | 'match' | 'mismatch'

export function evaluateDivisibilityFlip(cards: DivisibilityCard[], flipped: number[], groupSize: number): FlipResult {
    if (flipped.length < 2) return 'continue'
    const setId = cards[flipped[0]].setId
    if (flipped.some((index) => cards[index].setId !== setId)) return 'mismatch'
    return flipped.length === groupSize ? 'match' : 'continue'
}

export function divisibilityMemoryStars(levelIndex: number, moves: number): Stars {
    const { groups } = divisibilityMemoryLevels[levelIndex]
    if (moves <= Math.ceil(groups * 1.6)) return 3
    if (moves <= Math.ceil(groups * 2.3)) return 2
    return 1
}
