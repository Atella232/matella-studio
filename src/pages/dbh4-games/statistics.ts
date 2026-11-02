import { pick, randomInt, shuffle, type Random } from '../../features/unit-v2/games/random.ts'
import { boxPlot, correlation, quartiles, regression, type Pair } from '../dbh4-aplikatuak-estatistika/stats.ts'

/* ==========================================================================
   The statistics games of 4. DBH (applied and academic):
   · Build the box plot: data as a dot plot; set Q₁, Me and Q₃ (the
     textbook rule of the unit, `quartiles`) and the box is drawn as they
     move; after checking, the right box and the data behind each quartile
     appear. Level 1: an odd number of data; level 2: an even number;
     level 3: many data with repeated values.
   · Guess the correlation: a cloud of points. Level 1: positive, none or
     negative; level 2: strong or weak as well; level 3: estimate y for a
     given x by eye. The regression line and r appear after answering.
   ========================================================================== */

/* ---------- Build the box plot ---------- */

export const BOX_ROUNDS = 5
export const BOX_MIN = 0
export const BOX_MAX = 20

export interface BoxRound {
    /** Sorted */
    data: number[]
    q1: number
    median: number
    q3: number
}

export function createBoxRound(random: Random, levelIndex: number): BoxRound {
    for (;;) {
        const n = levelIndex === 0 ? pick(random, [7, 9, 11]) : levelIndex === 1 ? pick(random, [8, 10, 12, 14, 16]) : randomInt(random, 17, 24)
        const low = randomInt(random, 0, 4)
        const high = Math.min(BOX_MAX, low + (levelIndex === 2 ? randomInt(random, 9, 12) : randomInt(random, 12, 16)))
        const data = Array.from({ length: n }, () => randomInt(random, low, high)).sort((a, b) => a - b)
        const [q1, median, q3] = quartiles(data)
        // Five different marks and no outliers, so the whiskers reach the ends of the data
        if (q1 <= data[0] || q3 >= data[n - 1] || q1 === median || median === q3) continue
        if (boxPlot(data).outliers.length > 0) continue
        // Level 1 has whole quartiles; level 2 has at least one half
        if (levelIndex === 1 && [q1, median, q3].every(Number.isInteger)) continue
        return { data, q1, median, q3 }
    }
}

export const createBoxRounds = (random: Random, levelIndex: number) => Array.from({ length: BOX_ROUNDS }, () => createBoxRound(random, levelIndex))

/** The places (from 1) of the data behind a percentile with the textbook rule: N·p/100 if it is not whole, else it and the next */
export function percentilePlaces(n: number, p: number): number[] {
    const position = (n * p) / 100
    if (Math.abs(position - Math.round(position)) < 1e-9) {
        const k = Math.round(position)
        return k >= n ? [n] : [k, k + 1]
    }
    return [Math.ceil(position)]
}

/* ---------- Guess the correlation ---------- */

export const CLOUD_ROUNDS = 6
export const CLOUD_BOX = { xMin: 0, xMax: 10, yMin: 0, yMax: 10 }
/** A guess of ŷ is right this close */
export const ESTIMATE_TOLERANCE = 1

export type CloudKind = 'strong-positive' | 'weak-positive' | 'none' | 'weak-negative' | 'strong-negative'
export const CLOUD_KINDS: CloudKind[] = ['strong-negative', 'weak-negative', 'none', 'weak-positive', 'strong-positive']
/** Level 1 only asks for the sign */
export type CloudSign = 'positive' | 'none' | 'negative'

export interface CloudRound {
    points: Pair[]
    r: number
    kind: CloudKind
    slope: number
    intercept: number
    centre: Pair
    /** Level 3: the x whose ŷ is estimated */
    ask: number | null
}

export const signOf = (kind: CloudKind): CloudSign => (kind === 'none' ? 'none' : kind.endsWith('positive') ? 'positive' : 'negative')

/** The kind of a cloud from r, with gaps between the bands so no round sits on a border */
export function kindOf(r: number): CloudKind | null {
    const size = Math.abs(r)
    const sign = r > 0 ? 'positive' : 'negative'
    if (size >= 0.8) return `strong-${sign}`
    if (size >= 0.35 && size <= 0.6) return `weak-${sign}`
    if (size <= 0.15) return 'none'
    return null
}

/** A normal number (Box–Muller) from the seeded random */
const normal = (random: Random) => Math.sqrt(-2 * Math.log(1 - random())) * Math.cos(2 * Math.PI * random())
const tenth = (value: number) => Math.round(value * 10) / 10

export function createCloudRound(random: Random, levelIndex: number, kind: CloudKind): CloudRound {
    for (;;) {
        const n = randomInt(random, 14, 22)
        const sign = signOf(kind) === 'negative' ? -1 : 1
        const slope = sign * pick(random, [0.5, 0.65, 0.8])
        const noise = kind.startsWith('strong') ? 0.35 + random() * 0.4 : 1.4 + random() * 0.7
        const points: Pair[] = Array.from({ length: n }, () => {
            const x = tenth(0.5 + random() * 9)
            const y = kind === 'none' ? 1.5 + random() * 7 : 5 + slope * (x - 5) + noise * normal(random)
            return [x, tenth(Math.min(9.7, Math.max(0.3, y)))] as Pair
        })
        const r = correlation(points)
        if (kindOf(r) !== kind) continue
        const { slope: m, intercept, centre } = regression(points)
        let ask: number | null = null
        if (levelIndex === 2) {
            ask = randomInt(random, 2, 8)
            const predicted = m * ask + intercept
            if (predicted < 1 || predicted > 9) continue
        }
        return { points, r, kind, slope: m, intercept, centre, ask }
    }
}

export function createCloudRounds(random: Random, levelIndex: number): CloudRound[] {
    const kinds: CloudKind[] = levelIndex === 0
        ? shuffle(random, ['strong-positive', 'strong-positive', 'none', 'none', 'strong-negative', 'strong-negative'])
        : levelIndex === 1
            ? shuffle(random, [...CLOUD_KINDS, pick(random, ['weak-positive', 'weak-negative'] as const)])
            : shuffle(random, ['strong-positive', 'strong-positive', 'strong-positive', 'strong-negative', 'strong-negative', 'strong-negative'])
    return kinds.map((kind) => createCloudRound(random, levelIndex, kind))
}

export const estimateRight = (round: CloudRound, guess: number) => round.ask !== null && Math.abs(guess - (round.slope * round.ask + round.intercept)) <= ESTIMATE_TOLERANCE + 1e-9
