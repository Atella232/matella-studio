import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   The own games of 1. DBH fractions:
   · Share it out: a fraction of a number of things. Level 1: a unit
     fraction; level 2: any proper fraction; level 3: the other way round,
     the part is known and the whole is asked. After answering, the things
     appear in groups (the denominator) and the groups taken light up.
   · Fraction strips: add or subtract two fractions. Level 1: the same
     denominator; level 2: different denominators; level 3: subtractions.
     After answering, the strips are cut again into the common denominator.
   ========================================================================== */

export const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
export const lcm = (a: number, b: number) => (a * b) / gcd(a, b)
export const fracLatex = (n: number | string, d: number | string) => `\\frac{${n}}{${d}}`

/* ---------- Share it out ---------- */

export const SHARE_ROUNDS = 5
export type ShareThing = 'sweets' | 'stickers' | 'pencils'

export interface ShareRound {
    /** a/d of total; level 3 gives a/d and the part */
    a: number
    d: number
    total: number
    part: number
    inverse: boolean
    thing: ShareThing
    answer: number
    /** Sorted; the answer and typical mistakes */
    options: number[]
}

export function createShareRound(random: Random, levelIndex: number): ShareRound {
    for (;;) {
        const d = randomInt(random, levelIndex === 0 ? 2 : 3, 8)
        const a = levelIndex === 0 ? 1 : randomInt(random, 2, d - 1)
        if (gcd(a, d) !== 1) continue
        const group = randomInt(random, 2, 8)
        const total = d * group
        const part = a * group
        if (total > 48) continue
        const inverse = levelIndex === 2
        const answer = inverse ? total : part
        // The usual slips: one group only, the rest, the part times the denominator, dividing by the numerator
        const slips = inverse ? [group, part * d, part + group, part + d] : levelIndex === 0 ? [total - part, total - d, part + d, 2 * part] : [group, total - part, total % a === 0 ? total / a : part + d, part + a]
        const options = [...new Set([answer, ...slips.filter((value) => value > 0 && value !== answer)])].slice(0, 4).sort((x, y) => x - y)
        if (options.length < 4) continue
        return { a, d, total, part, inverse, thing: pick(random, ['sweets', 'stickers', 'pencils'] as const), answer, options }
    }
}

export const createShareRounds = (random: Random, levelIndex: number) => Array.from({ length: SHARE_ROUNDS }, () => createShareRound(random, levelIndex))

/* ---------- Fraction strips ---------- */

export const STRIPS_ROUNDS = 5

export interface Fraction { n: number; d: number }
export interface StripsRound {
    first: Fraction
    second: Fraction
    op: '+' | '-'
    /** The common denominator */
    common: number
    /** Sorted by value; one of them is the answer */
    options: Fraction[]
    right: number
}

export const valueOf = ({ n, d }: Fraction) => n / d
export const reduce = ({ n, d }: Fraction): Fraction => ({ n: n / gcd(n, d), d: d / gcd(n, d) })

export function createStripsRound(random: Random, levelIndex: number): StripsRound {
    for (;;) {
        const op = levelIndex === 2 ? '-' : '+'
        const b = randomInt(random, 2, 12)
        const d = levelIndex === 0 ? b : randomInt(random, 2, 12)
        if (levelIndex > 0 && b === d) continue
        const first = { n: randomInt(random, 1, b - 1), d: b }
        const second = { n: randomInt(random, 1, d - 1), d }
        const common = lcm(b, d)
        if (common > 24) continue
        const [x, y] = [(first.n * common) / b, (second.n * common) / d]
        const n = op === '+' ? x + y : x - y
        // A result between 0 and 1, so it fits one strip
        if (n <= 0 || n > common) continue
        const result = { n, d: common }
        // The slips: numerators and denominators added (or subtracted), numerators kept over the common denominator
        const slips: Fraction[] = op === '+'
            ? [{ n: first.n + second.n, d: b + d }, { n: first.n + second.n, d: common }, { n: first.n * second.n, d: b * d }]
            : [{ n: first.n - second.n, d: b - d }, { n: first.n - second.n, d: common }, { n: x + y, d: common }]
        const options = [result]
        for (const slip of slips) if (slip.n > 0 && slip.d > 0 && options.every((option) => Math.abs(valueOf(option) - valueOf(slip)) > 1e-9)) options.push(slip)
        if (options.length < 3) continue
        return { first, second, op, common, options: shuffle(random, options).sort((p, q) => valueOf(p) - valueOf(q)), right: n / common }
    }
}

export const createStripsRounds = (random: Random, levelIndex: number) => Array.from({ length: STRIPS_ROUNDS }, () => createStripsRound(random, levelIndex))
