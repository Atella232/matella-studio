import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { Stars } from '../../../features/unit-v2/games/records.ts'
import { cardTerms, type IntegerCardKind } from './memory.ts'

/* ==========================================================================
   Ilara (En fila): tap the numbers in order as fast as possible. A wrong tap
   costs time and shows why it was not the next one.
   ========================================================================== */

export const ORDER_ROUNDS = 5
export const ORDER_PENALTY_MS = 3000

export interface OrderLevel {
    count: number
    min: number
    max: number
    /** Some rounds ask from the largest to the smallest */
    bothWays: boolean
    /** Cards show operations to work out instead of plain numbers */
    expressions: IntegerCardKind[] | null
    /** Seconds an average student needs for one round */
    secondsPerRound: number
}

export const orderLevels: OrderLevel[] = [
    { count: 6, min: -10, max: 10, bothWays: false, expressions: null, secondsPerRound: 8 },
    { count: 8, min: -30, max: 30, bothWays: true, expressions: null, secondsPerRound: 11 },
    { count: 6, min: -12, max: 12, bothWays: false, expressions: ['value', 'absolute', 'opposite', 'add', 'subtract', 'multiply'], secondsPerRound: 18 }
]

export interface OrderCard {
    id: string
    value: number
    kind: IntegerCardKind
    terms: number[]
}

export interface OrderRound {
    cards: OrderCard[]
    descending: boolean
}

export function createOrderRound(random: Random, levelIndex: number, roundIndex: number, levels: OrderLevel[] = orderLevels): OrderRound {
    const level = levels[levelIndex]
    const values = new Set<number>()
    // Half of the cards negative at least, where the ordering mistakes happen
    while (values.size < level.count) {
        const value = values.size < level.count / 2 ? randomInt(random, level.min, -1) : randomInt(random, level.min, level.max)
        values.add(value)
    }
    const cards = [...values].map((value, index) => {
        let kind: IntegerCardKind = 'value'
        let terms: number[] = []
        if (level.expressions) {
            for (let attempt = 0; attempt < 20; attempt += 1) {
                const candidate = pick(random, level.expressions)
                const candidateTerms = cardTerms(random, candidate, value)
                if (candidateTerms) {
                    kind = candidate
                    terms = candidateTerms
                    break
                }
            }
        }
        return { id: `${roundIndex}-${index}`, value, kind, terms }
    })
    return { cards: shuffle(random, cards), descending: level.bothWays && roundIndex % 2 === 1 }
}

/** Value of the card that should be tapped next, given the ones already tapped */
export function nextExpected(round: OrderRound, tapped: string[]): number | null {
    const left = round.cards.filter((card) => !tapped.includes(card.id)).map((card) => card.value)
    if (left.length === 0) return null
    return round.descending ? Math.max(...left) : Math.min(...left)
}

export function orderParTime(levelIndex: number, levels: OrderLevel[] = orderLevels): number {
    return (ORDER_ROUNDS * levels[levelIndex].secondsPerRound + 5) * 1000
}

export function orderStars(levelIndex: number, timeMs: number, mistakes: number, levels: OrderLevel[] = orderLevels): Stars {
    const par = orderParTime(levelIndex, levels)
    if (timeMs <= par * 0.8 && mistakes <= 1) return 3
    if (timeMs <= par) return 2
    return 1
}
