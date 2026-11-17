import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J2 · Deskontua, BEZa eta bidalketa (Descuento, IVA y envío): composing
   operations on a price. Level 1: two operations in a given order, what
   is the final price?; level 2: two operations and a final price, which
   order gives it?; level 3: three operations, which of the orders on the
   cards gives the price? Multiplying operations commute with each other,
   adding ones do not commute with multiplying ones: the rounds only use
   orders that give different prices. Amounts in cents, so nothing is
   rounded twice.
   ========================================================================== */

export const CHECKOUT_ROUNDS = 5

export type Operation =
    | { kind: 'percent'; percent: number }
    | { kind: 'vat' }
    | { kind: 'minus'; euros: number }
    | { kind: 'plus'; euros: number }

export interface CheckoutRound {
    level: number
    /** Starting price, in cents */
    price: number
    operations: Operation[]
    /** Level 1: the order applied; levels 2 and 3: one card per order (indices into operations) */
    orders: number[][]
    /** Level 1: price cards in cents; levels 2 and 3: the target price in cents */
    options: number[]
    target: number
    /** Index of the right card */
    answer: number
}

/** One operation on a price in cents */
export function apply(operation: Operation, cents: number): number {
    switch (operation.kind) {
        case 'percent': return Math.round((cents * (100 - operation.percent)) / 100)
        case 'vat': return Math.round((cents * 121) / 100)
        case 'minus': return cents - 100 * operation.euros
        case 'plus': return cents + 100 * operation.euros
    }
}

export const applyOrder = (round: Pick<CheckoutRound, 'price' | 'operations'>, order: number[]) => order.reduce((cents, index) => apply(round.operations[index], cents), round.price)

const permutations = (items: number[]): number[][] => (items.length <= 1 ? [items] : items.flatMap((item, index) => permutations([...items.slice(0, index), ...items.slice(index + 1)]).map((rest) => [item, ...rest])))

function operationFor(random: Random, kind: Operation['kind']): Operation {
    if (kind === 'percent') return { kind, percent: pick(random, [10, 20, 25, 50]) }
    if (kind === 'vat') return { kind }
    if (kind === 'minus') return { kind, euros: pick(random, [5, 10, 15, 20]) }
    return { kind, euros: pick(random, [4, 5, 6, 8]) }
}

function makeRound(random: Random, level: number): CheckoutRound | null {
    const price = 100 * 10 * randomInt(random, 4, 20)
    const kinds = shuffle(random, ['percent', 'vat', 'minus', 'plus'] as Operation['kind'][]).slice(0, level === 2 ? 3 : 2)
    // At least one adding and one multiplying operation, or the order would not matter
    if (!kinds.some((kind) => kind === 'minus' || kind === 'plus') || !kinds.some((kind) => kind === 'percent' || kind === 'vat')) return null
    const operations = kinds.map((kind) => operationFor(random, kind))
    const round = { price, operations }
    if (level === 0) {
        const order = [0, 1]
        const target = applyOrder(round, order)
        const reverse = applyOrder(round, [1, 0])
        // The other order, and forgetting one operation
        const options = [...new Set([target, reverse, apply(operations[0], price), apply(operations[1], price)])]
        if (options.length < 4 || options.some((cents) => cents <= 0)) return null
        const shuffled = shuffle(random, options)
        return { level, price, operations, orders: [order], options: shuffled, target, answer: shuffled.indexOf(target) }
    }
    const all = permutations(operations.map((_, index) => index))
    const results = all.map((order) => applyOrder(round, order))
    if (results.some((cents) => cents <= 0)) return null
    const right = randomInt(random, 0, all.length - 1)
    const target = results[right]
    // The cards: the right order and orders that give another price
    const others = all.filter((_, index) => results[index] !== target)
    if (others.length < (level === 1 ? 1 : 3)) return null
    const cards = shuffle(random, [all[right], ...shuffle(random, others).slice(0, level === 1 ? 1 : 3)])
    return { level, price, operations, orders: cards, options: [], target, answer: cards.indexOf(all[right]) }
}

/** Five rounds of one level */
export function createCheckoutRounds(random: Random, level: number): CheckoutRound[] {
    const rounds: CheckoutRound[] = []
    for (let attempt = 0; rounds.length < CHECKOUT_ROUNDS && attempt < 5000; attempt += 1) {
        const round = makeRound(random, level)
        if (!round || rounds.some((other) => other.price === round.price && other.target === round.target)) continue
        rounds.push(round)
    }
    return rounds
}
