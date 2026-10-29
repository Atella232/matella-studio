import { pick, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { Stars } from '../../../features/unit-v2/games/records.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'

/* ==========================================================================
   Atera errotik (Saca de la raíz, 3. DBH): the radicand is cut into prime
   tiles. Tapping two equal tiles takes the pair out of the root, where it
   becomes a single factor; two different tiles are a mistake. The round
   ends when no pair is left, and the result is the product of what came
   out times the root of what stayed: the radical simplified, whatever the
   order the pairs were taken in.
   ========================================================================== */

export const EXTRACT_ROUNDS = 5

export interface ExtractTile {
    id: number
    prime: number
}

export interface ExtractRound {
    radicand: number
    /** The prime factors, in the order they are shown */
    tiles: ExtractTile[]
    /** The simplified radical a·√b */
    outside: number
    inside: number
}

export interface ExtractState {
    tiles: ExtractTile[]
    /** The factors that came out, in the order they were taken */
    taken: number[]
    mistakes: number
}

export function primeFactors(value: number): number[] {
    const factors: number[] = []
    let rest = value
    for (let prime = 2; prime * prime <= rest; prime += 1) {
        while (rest % prime === 0) {
            factors.push(prime)
            rest /= prime
        }
    }
    if (rest > 1) factors.push(rest)
    return factors
}

/** The coefficient and the radicand left of a·√b once every pair is out */
export function simplifySquareRoot(value: number): { outside: number; inside: number } {
    let outside = 1
    let inside = 1
    const counts = new Map<number, number>()
    for (const prime of primeFactors(value)) counts.set(prime, (counts.get(prime) ?? 0) + 1)
    for (const [prime, count] of counts) {
        outside *= prime ** Math.floor(count / 2)
        inside *= prime ** (count % 2)
    }
    return { outside, inside }
}

const LEVELS: Array<{ sides: number[]; insides: number[]; max: number }> = [
    { sides: [2, 3, 4, 5, 6], insides: [2, 3, 5, 6, 7], max: 200 },
    { sides: [6, 10, 12, 14, 15, 18, 20], insides: [2, 3, 5, 6, 7, 10], max: 900 },
    { sides: [12, 18, 20, 24, 28, 30, 36, 42], insides: [2, 3, 5, 6, 7, 10, 11, 14, 15], max: 4000 }
]

export function createExtractRound(random: Random, level: number, avoid: ExtractRound[] = []): ExtractRound {
    const { sides, insides, max } = LEVELS[level]
    for (let attempt = 0; attempt < 2000; attempt += 1) {
        const side = pick(random, sides)
        const inside = pick(random, insides)
        const radicand = side * side * inside
        if (radicand > max || avoid.some((other) => other.radicand === radicand)) continue
        const factors = primeFactors(radicand)
        if (factors.length > 10) continue
        const tiles = shuffle(random, factors).map((prime, id) => ({ id, prime }))
        const { outside, inside: left } = simplifySquareRoot(radicand)
        return { radicand, tiles, outside, inside: left }
    }
    throw new Error(`No extract round for level ${level}`)
}

export function createExtractRounds(random: Random, level: number): ExtractRound[] {
    const rounds: ExtractRound[] = []
    for (let index = 0; index < EXTRACT_ROUNDS; index += 1) rounds.push(createExtractRound(random, level, rounds))
    return rounds
}

export const startExtract = (round: ExtractRound): ExtractState => ({ tiles: round.tiles, taken: [], mistakes: 0 })

/** Two different tiles of the state that are equal */
export const hasPair = (state: ExtractState) => state.tiles.some((tile, index) => state.tiles.some((other, next) => next > index && other.prime === tile.prime))

export const extractDone = (state: ExtractState) => !hasPair(state)

/** Taps two tiles: a pair of equal primes goes out as one factor; anything else is a mistake */
export function tapPair(state: ExtractState, first: number, second: number): { state: ExtractState; ok: boolean } {
    const a = state.tiles.find((tile) => tile.id === first)
    const b = state.tiles.find((tile) => tile.id === second)
    if (!a || !b || a.id === b.id) return { state, ok: false }
    if (a.prime !== b.prime) return { state: { ...state, mistakes: state.mistakes + 1 }, ok: false }
    return { state: { tiles: state.tiles.filter((tile) => tile.id !== a.id && tile.id !== b.id), taken: [...state.taken, a.prime], mistakes: state.mistakes }, ok: true }
}

/** What the state says: the coefficient and the radicand so far */
export const extractSoFar = (state: ExtractState) => ({
    outside: state.taken.reduce((product, prime) => product * prime, 1),
    inside: state.tiles.reduce((product, tile) => product * tile.prime, 1)
})

/** 3 points for a clean round, one less for each mistake */
export const extractPoints = (mistakes: number) => Math.max(0, 3 - mistakes)
export const EXTRACT_MAX = EXTRACT_ROUNDS * 3

export function extractStars(total: number): Stars {
    if (total >= 13) return 3
    if (total >= 10) return 2
    if (total >= 6) return 1
    return 0
}

const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar })
export const extractTip = (): LocalizedText => say('Bikote bakoitzak faktore bat ematen du kanpoan: $\\sqrt{2\\cdot 2\\cdot 3}=2\\sqrt{3}$.', 'Cada pareja da un factor fuera: $\\sqrt{2\\cdot 2\\cdot 3}=2\\sqrt{3}$.', 'كل زوج يعطي عاملًا في الخارج: $\\sqrt{2\\cdot 2\\cdot 3}=2\\sqrt{3}$.')
