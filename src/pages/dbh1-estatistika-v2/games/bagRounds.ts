import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   The bag (1. DBH statistics and probability, Laplace's rule): balls of a
   few colours in a bag, or numbered cards. Set the probability as a
   fraction (favourable over possible); then the favourable ones light up.
   Level 1: one colour; level 2: «not a colour» and «one colour or
   another»; level 3: numbered cards with events such as «even» or
   «greater than 4».
   ========================================================================== */

export const BAG_ROUNDS = 5
export const BAG_LIMIT = 12

export type Colour = 'red' | 'blue' | 'green' | 'yellow'
export const COLOURS: Colour[] = ['red', 'blue', 'green', 'yellow']

export type BagEvent =
    | { kind: 'colour'; colour: Colour }
    | { kind: 'not'; colour: Colour }
    | { kind: 'or'; colours: [Colour, Colour] }
    | { kind: 'even' }
    | { kind: 'greater'; than: number }
    | { kind: 'multiple'; of: number }
    | { kind: 'prime' }

export interface BagRound {
    /** The colour of each ball, or null for numbered cards 1…cards */
    balls: Colour[] | null
    cards: number
    event: BagEvent
    favourable: number
    possible: number
}

const isPrime = (n: number) => n > 1 && Array.from({ length: n - 2 }, (_, index) => index + 2).every((d) => n % d !== 0)

/** Whether a ball (by colour) or a card (by number) is favourable */
export function favours(event: BagEvent, item: Colour | number): boolean {
    switch (event.kind) {
        case 'colour': return item === event.colour
        case 'not': return item !== event.colour
        case 'or': return event.colours.includes(item as Colour)
        case 'even': return (item as number) % 2 === 0
        case 'greater': return (item as number) > event.than
        case 'multiple': return (item as number) % event.of === 0
        case 'prime': return isPrime(item as number)
    }
}

export function createBagRound(random: Random, levelIndex: number): BagRound {
    for (;;) {
        if (levelIndex < 2) {
            const colours = shuffle(random, COLOURS).slice(0, levelIndex === 0 ? randomInt(random, 2, 3) : 3)
            const balls = colours.flatMap((colour) => Array.from({ length: randomInt(random, 1, 5) }, () => colour))
            if (balls.length > BAG_LIMIT || balls.length < 4) continue
            const event: BagEvent = levelIndex === 0
                ? { kind: 'colour', colour: pick(random, colours) }
                : random() < 0.5 ? { kind: 'not', colour: pick(random, colours) } : { kind: 'or', colours: shuffle(random, colours).slice(0, 2) as [Colour, Colour] }
            const favourable = balls.filter((ball) => favours(event, ball)).length
            return { balls: shuffle(random, balls), cards: 0, event, favourable, possible: balls.length }
        }
        const cards = pick(random, [6, 8, 10, 12])
        const event: BagEvent = pick(random, [{ kind: 'even' }, { kind: 'greater', than: randomInt(random, 2, cards - 2) }, { kind: 'multiple', of: pick(random, [3, 4]) }, { kind: 'prime' }] as BagEvent[])
        const favourable = Array.from({ length: cards }, (_, index) => index + 1).filter((card) => favours(event, card)).length
        if (favourable === 0 || favourable === cards) continue
        return { balls: null, cards, event, favourable, possible: cards }
    }
}

export const createBagRounds = (random: Random, levelIndex: number) => Array.from({ length: BAG_ROUNDS }, () => createBagRound(random, levelIndex))

/** Right when the fraction is worth favourable / possible */
export const bagRight = (round: BagRound, numerator: number, denominator: number) => denominator > 0 && numerator * round.possible === denominator * round.favourable
