import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { Stars } from '../../../features/unit-v2/games/records.ts'
import type { UnitLanguage } from '../../../features/unit-v2/types.ts'

/* ==========================================================================
   Memoria: find the cards with the same value, an operation and its result.
   Boards include "trap" values: a number and its opposite are both on the
   board, so matching by the digits instead of the sign does not work.
   ========================================================================== */

export type IntegerCardKind = 'value' | 'absolute' | 'opposite' | 'add' | 'subtract' | 'multiply' | 'divide'

export interface IntegerCard {
    id: string
    setId: number
    value: number
    kind: IntegerCardKind
    /** Operands of the operation shown on the card */
    terms: number[]
}

export interface IntegerMemoryLevel {
    groups: number
    groupSize: 2 | 3
    layouts: IntegerCardKind[][]
    /** Range of the values to find */
    min: number
    max: number
}

export const integerMemoryLevels: IntegerMemoryLevel[] = [
    { groups: 6, groupSize: 2, layouts: [['absolute', 'value'], ['opposite', 'value']], min: -9, max: 9 },
    { groups: 8, groupSize: 2, layouts: [['add', 'value'], ['subtract', 'value'], ['add', 'subtract']], min: -12, max: 12 },
    { groups: 6, groupSize: 3, layouts: [['multiply', 'divide', 'value']], min: -24, max: 24 }
]

function nonZero(random: Random, min: number, max: number): number {
    const size = randomInt(random, min, max)
    return random() < 0.5 ? -size : size
}

const divisorsOf = (value: number) => Array.from({ length: 6 }, (_, index) => index + 2).filter((divisor) => value % divisor === 0 && Math.abs(value / divisor) >= 2)

/** Operands that give `value` with this kind of card, or null when it is not possible */
export function cardTerms(random: Random, kind: IntegerCardKind, value: number): number[] | null {
    switch (kind) {
        case 'value': return []
        case 'absolute': return value > 0 ? [pick(random, [-value, value])] : null
        case 'opposite': return value !== 0 ? [-value] : null
        case 'add': {
            const first = nonZero(random, 1, 9)
            return [first, value - first]
        }
        case 'subtract': {
            const second = nonZero(random, 1, 9)
            return [value + second, second]
        }
        case 'multiply': {
            const divisors = divisorsOf(value)
            if (value === 0 || divisors.length === 0) return null
            const divisor = pick(random, divisors) * (random() < 0.5 ? -1 : 1)
            return [value / divisor, divisor]
        }
        case 'divide': {
            const divisor = nonZero(random, 2, 5)
            return [value * divisor, divisor]
        }
    }
}

function drawValues(random: Random, level: IntegerMemoryLevel, playable: (value: number) => boolean): number[] {
    const chosen: number[] = []
    // Two traps first: a value and its opposite
    for (let attempt = 0; chosen.length < 4 && attempt < 200; attempt += 1) {
        const value = randomInt(random, 2, Math.max(2, level.max))
        if (!chosen.includes(value) && playable(value) && playable(-value)) chosen.push(value, -value)
    }
    for (let attempt = 0; chosen.length < level.groups && attempt < 500; attempt += 1) {
        const value = randomInt(random, level.min, level.max)
        if (!chosen.includes(value) && playable(value)) chosen.push(value)
    }
    return chosen.slice(0, level.groups)
}

export function createIntegerMemoryBoard(random: Random, levelIndex: number): IntegerCard[] {
    const level = integerMemoryLevels[levelIndex]
    const layoutsFor = (value: number) => level.layouts.filter((layout) => layout.every((kind) => kind !== 'absolute' || value > 0) && layout.every((kind) => kind !== 'opposite' || value !== 0) && layout.every((kind) => kind !== 'multiply' || (value !== 0 && divisorsOf(value).length > 0)))
    const values = drawValues(random, level, (value) => layoutsFor(value).length > 0)
    const cards: IntegerCard[] = []
    values.forEach((value, setId) => {
        const layout = pick(random, layoutsFor(value))
        layout.forEach((kind, index) => {
            const terms = cardTerms(random, kind, value) ?? []
            cards.push({ id: `${setId}-${index}-${kind}`, setId, value, kind, terms })
        })
    })
    return shuffle(random, cards)
}

/** Value of the card computed from what it shows (used by the tests) */
export function cardValue(card: IntegerCard): number {
    const [first, second] = card.terms
    switch (card.kind) {
        case 'value': return card.value
        case 'absolute': return Math.abs(first)
        case 'opposite': return -first
        case 'add': return first + second
        case 'subtract': return first - second
        case 'multiply': return first * second
        case 'divide': return first / second
    }
}

const signed = (value: number) => (value < 0 ? `-${-value}` : value > 0 ? `+${value}` : '0')
const bracket = (value: number) => `(${signed(value)})`

export function integerCardLatex(card: IntegerCard, language: UnitLanguage): string {
    const [first, second] = card.terms
    switch (card.kind) {
        case 'value': return signed(card.value)
        case 'absolute': return `\\lvert ${signed(first)}\\rvert`
        case 'opposite': return `\\mathrm{${language === 'es' ? 'Op' : 'Aur'}}(${signed(first)})`
        case 'add': return `${bracket(first)}+${bracket(second)}`
        case 'subtract': return `${bracket(first)}-${bracket(second)}`
        case 'multiply': return `${bracket(first)}\\cdot${bracket(second)}`
        case 'divide': return `${bracket(first)}\\mathbin{:}${bracket(second)}`
    }
}

export type FlipResult = 'continue' | 'match' | 'mismatch'

export function evaluateIntegerFlip(cards: IntegerCard[], flipped: number[], groupSize: number): FlipResult {
    if (flipped.length < 2) return 'continue'
    const setId = cards[flipped[0]].setId
    if (flipped.some((index) => cards[index].setId !== setId)) return 'mismatch'
    return flipped.length === groupSize ? 'match' : 'continue'
}

export function integerMemoryStars(levelIndex: number, moves: number): Stars {
    const { groups } = integerMemoryLevels[levelIndex]
    if (moves <= Math.ceil(groups * 1.6)) return 3
    if (moves <= Math.ceil(groups * 2.3)) return 2
    return 1
}
