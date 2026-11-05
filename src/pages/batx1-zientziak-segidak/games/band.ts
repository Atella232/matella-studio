import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J2 · Harrapatu banda (Atrapa la banda): a convergent sequence, its limit
   L and a distance ε. The learner types N, the first term from which every
   term stays within ε of L. Level 1: aₙ = L + c/n; level 2: aₙ =
   (L·n + c)/(n + b), whose distance is |c − L·b|/(n + b); level 3:
   L + c/n² and the alternating L + (−1)ⁿ·c/n. ε is a fraction p/q, so
   |aₙ − L| < ε is decided with whole numbers, without rounding.
   ========================================================================== */

export const BAND_ROUNDS = 5

export type BandKind = 'over-n' | 'quotient' | 'over-square' | 'alternating'

export interface BandRound {
    kind: BandKind
    limit: number
    /** c in the distance c/n, c/(n + b) or c/n² */
    c: number
    /** b in (L·n + c₀)/(n + b); 0 otherwise */
    b: number
    /** The numerator of (L·n + c₀)/(n + b), for the quotient */
    c0: number
    /** ε = p/q */
    p: number
    q: number
}

/** The distance |aₙ − L| of the round, as a number */
export function bandGap(round: BandRound, n: number): number {
    if (round.kind === 'quotient') return round.c / (n + round.b)
    if (round.kind === 'over-square') return round.c / (n * n)
    return round.c / n
}

/** Whether |aₙ − L| < p/q, with whole numbers only */
export function bandInside(round: BandRound, n: number): boolean {
    const denominator = round.kind === 'quotient' ? n + round.b : round.kind === 'over-square' ? n * n : n
    return round.c * round.q < round.p * denominator
}

/** The first term from which all stay inside (the distance only shrinks) */
export function bandAnswer(round: BandRound): number {
    let n = 1
    while (!bandInside(round, n)) n += 1
    return n
}

/** aₙ in LaTeX */
export function bandLatex(round: BandRound): string {
    const { limit, c, b, c0 } = round
    if (round.kind === 'quotient') {
        const top = `${limit === 1 ? '' : limit}n${c0 < 0 ? '-' : '+'}${Math.abs(c0)}`
        return `\\frac{${top}}{n+${b}}`
    }
    if (round.kind === 'over-square') return `${limit}+\\frac{${c}}{n^2}`
    if (round.kind === 'alternating') return `${limit}+\\frac{(-1)^n\\cdot ${c}}{n}`
    return `${limit}+\\frac{${c}}{n}`
}

/** The distance in LaTeX */
export function bandGapLatex(round: BandRound): string {
    if (round.kind === 'quotient') return `\\frac{${round.c}}{n+${round.b}}`
    if (round.kind === 'over-square') return `\\frac{${round.c}}{n^2}`
    return `\\frac{${round.c}}{n}`
}

/** ε in LaTeX, as a decimal with {,} */
export const epsilonLatex = ({ p, q }: Pick<BandRound, 'p' | 'q'>) => String(p / q).replace('.', '{,}')

const EPSILONS: Array<[number, number]> = [[1, 2], [1, 5], [1, 10], [1, 20], [1, 100], [1, 4]]

function makeRound(random: Random, level: number): BandRound {
    const [p, q] = pick(random, EPSILONS)
    if (level === 0) return { kind: 'over-n', limit: randomInt(random, 0, 6), c: randomInt(random, 1, 9), b: 0, c0: 0, p, q }
    if (level === 1) {
        const limit = randomInt(random, 1, 4)
        const b = randomInt(random, 1, 4)
        const shift = pick(random, [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5])
        const c0 = limit * b + shift
        return { kind: 'quotient', limit, c: Math.abs(shift), b, c0, p, q }
    }
    const kind = pick<BandKind>(random, ['over-square', 'alternating'])
    const [p2, q2] = kind === 'over-square' ? pick(random, [[1, 100], [1, 10], [1, 4], [1, 50]] as Array<[number, number]>) : [p, q]
    return { kind, limit: randomInt(random, 0, 5), c: randomInt(random, 1, 9), b: 0, c0: 0, p: p2, q: q2 }
}

/** Five different rounds of one level, with answers between 2 and 1000 */
export function createBandRounds(random: Random, level: number): BandRound[] {
    const rounds: BandRound[] = []
    for (let attempt = 0; rounds.length < BAND_ROUNDS && attempt < 2000; attempt += 1) {
        const round = makeRound(random, level)
        const answer = bandAnswer(round)
        if (answer < 2 || answer > 1000) continue
        if (rounds.some((other) => bandLatex(other) === bandLatex(round) && other.p === round.p && other.q === round.q)) continue
        rounds.push(round)
    }
    return rounds
}

/** The term typed by the learner: a positive whole number */
export function readTerm(input: string): number | null {
    const text = input.trim().replace(/\s/g, '')
    return /^\d+$/.test(text) ? Number(text) : null
}
