import { randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   The own games of 1. DBH divisibility:
   · Rectangles: how many different rectangles can be made with N square
     tiles? (one for each pair of divisors). Level 1: N up to 24; level 2:
     N up to 60, squares too; level 3: how many divisors N has, primes and
     squares included. All the rectangles are drawn after answering.
   · Buses and ribbons: level 1, two buses leave together every a and b
     minutes (choose when they meet again among the departures of the
     slower one: the LCM); level 2, two ribbons cut into equal pieces as
     long as possible (choose among the divisors of the shorter one: the
     GCD); level 3, both mixed with the same options. The timeline or the
     cut ribbons appear after answering.
   ========================================================================== */

export const divisorsOf = (n: number) => Array.from({ length: n }, (_, index) => index + 1).filter((d) => n % d === 0)

/** The rectangles a × b of n tiles, a ≤ b */
export const rectanglePairs = (n: number): Array<[number, number]> => divisorsOf(n).filter((d) => d * d <= n).map((d) => [d, n / d])

export const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
export const lcm = (a: number, b: number) => (a * b) / gcd(a, b)

/* ---------- Rectangles ---------- */

export const RECTANGLES_ROUNDS = 5
export const RECTANGLES_MAX = 12

export interface RectanglesRound {
    n: number
    ask: 'rectangles' | 'divisors'
    answer: number
}

export function createRectanglesRound(random: Random, levelIndex: number): RectanglesRound {
    for (;;) {
        const n = levelIndex === 0 ? randomInt(random, 6, 24) : levelIndex === 1 ? randomInt(random, 24, 60) : randomInt(random, 7, 60)
        const pairs = rectanglePairs(n).length
        if (levelIndex === 0 && pairs < 2) continue
        if (levelIndex === 1 && pairs < 3) continue
        if (levelIndex < 2) return { n, ask: 'rectangles', answer: pairs }
        return { n, ask: 'divisors', answer: divisorsOf(n).length }
    }
}

/** Five different numbers; level 3 always has a prime and a square among them */
export function createRectanglesRounds(random: Random, levelIndex: number): RectanglesRound[] {
    for (;;) {
        const rounds = Array.from({ length: RECTANGLES_ROUNDS }, () => createRectanglesRound(random, levelIndex))
        if (new Set(rounds.map((round) => round.n)).size < RECTANGLES_ROUNDS) continue
        if (levelIndex === 2 && !(rounds.some((round) => round.answer === 2) && rounds.some((round) => round.answer % 2 === 1))) continue
        return rounds
    }
}

/* ---------- Buses and ribbons ---------- */

export const MEET_ROUNDS = 5

export interface MeetRound {
    kind: 'lcm' | 'gcd'
    a: number
    b: number
    answer: number
    /** Sorted; one of them is the answer */
    options: number[]
}

function busesRound(random: Random): MeetRound | null {
    const a = randomInt(random, 2, 10)
    const b = randomInt(random, a + 1, 12)
    const meet = lcm(a, b)
    // A real meeting: not the product of coprime numbers nor b itself
    if (b % a === 0 || meet > 60 || gcd(a, b) === 1) return null
    const options = Array.from({ length: Math.max(4, Math.min(6, meet / b + 2)) }, (_, index) => (index + 1) * b)
    return { kind: 'lcm', a, b, answer: meet, options }
}

function ribbonsRound(random: Random): MeetRound | null {
    const piece = randomInt(random, 2, 9)
    const [p, q] = [randomInt(random, 2, 6), randomInt(random, 2, 7)]
    if (p >= q || gcd(p, q) !== 1) return null
    const [a, b] = [piece * p, piece * q]
    const options = divisorsOf(a)
    if (a > 40 || b > 60 || options.length < 4 || options.length > 8) return null
    return { kind: 'gcd', a, b, answer: piece, options }
}

/** Level 3: the situation decides; the options are the GCD and a smaller common divisor, the LCM, the product and the two numbers */
function mixedRound(random: Random): MeetRound | null {
    const round = random() < 0.5 ? busesRound(random) : ribbonsRound(random)
    if (!round) return null
    const common = gcd(round.a, round.b)
    const smaller = divisorsOf(common).at(-2)!
    const options = [...new Set([smaller, common, lcm(round.a, round.b), round.a * round.b, round.a, round.b])].sort((x, y) => x - y)
    return { ...round, options }
}

export function createMeetRound(random: Random, levelIndex: number): MeetRound {
    for (;;) {
        const round = levelIndex === 0 ? busesRound(random) : levelIndex === 1 ? ribbonsRound(random) : mixedRound(random)
        if (round) return round
    }
}

export function createMeetRounds(random: Random, levelIndex: number): MeetRound[] {
    if (levelIndex < 2) return Array.from({ length: MEET_ROUNDS }, () => createMeetRound(random, levelIndex))
    // Level 3: both situations, in a random order
    for (;;) {
        const rounds = Array.from({ length: MEET_ROUNDS }, () => createMeetRound(random, 2))
        const kinds = rounds.map((round) => round.kind)
        if (kinds.includes('lcm') && kinds.includes('gcd')) return shuffle(random, rounds)
    }
}

/** Departures of a bus every `every` minutes up to `until` */
export const departures = (every: number, until: number) => Array.from({ length: Math.floor(until / every) + 1 }, (_, index) => index * every)

