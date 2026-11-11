import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { above, below, between, tableLatex, zLatex } from '../normal.ts'

/* ==========================================================================
   J2 · Zein azalera da? (¿Qué área es?): a probability of Z ~ N(0; 1) and
   three bells with a shaded region; one is right. The wrong ones are the
   usual slips: the complement (the other side of k), the mirror image
   (−k instead of k) and, between two values, the two tails outside or
   the interval started at 0 (its mirror image would have the same
   area). Level 1: P(Z ≤ k) and P(Z > k) with k > 0;
   level 2: the same with a negative k; level 3: P(a ≤ Z ≤ b). After the
   answer, the value from the table of normal.ts. Pure logic.
   ========================================================================== */

export const AREA_ROUNDS = 6

/** A shaded region: one or two intervals of z (−∞ and ∞ as nulls) */
export type Region = Array<{ from: number | null; to: number | null }>

export interface AreaRound {
    /** The probability asked, in LaTeX */
    asked: string
    regions: Region[]
    answer: number
    /** The value, in ten-thousandths, and how the table gives it */
    value: number
    worked: string
}

const P = (z: number) => tableLatex(below(Math.abs(z)))
const key = (region: Region) => region.map((part) => `${part.from ?? '-'}:${part.to ?? '+'}`).join('|')

/** The area of a region, in ten-thousandths */
export function regionValue(region: Region): number {
    return region.reduce((sum, part) => sum + (part.from === null ? (part.to === null ? 10_000 : below(part.to)) : part.to === null ? above(part.from) : between(part.from, part.to)), 0)
}

function oneSided(random: Random, negative: boolean): AreaRound {
    const size = randomInt(random, 2, 25) / 10 + (random() < 0.5 ? 0 : randomInt(random, 1, 9) / 100)
    const k = Math.round((negative ? -size : size) * 100) / 100
    const side = pick(random, ['below', 'above'] as const)
    const right: Region = side === 'below' ? [{ from: null, to: k }] : [{ from: k, to: null }]
    const complement: Region = side === 'below' ? [{ from: k, to: null }] : [{ from: null, to: k }]
    const mirror: Region = side === 'below' ? [{ from: null, to: -k }] : [{ from: -k, to: null }]
    const regions = shuffle(random, [right, complement, mirror])
    const asked = side === 'below' ? `P(Z\\le ${zLatex(k)})` : `P(Z>${zLatex(k)})`
    const value = regionValue(right)
    let worked: string
    if (side === 'below') worked = k >= 0 ? `${asked}=${tableLatex(value)}` : `${asked}=1-${P(k)}=${tableLatex(value)}`
    else worked = k >= 0 ? `${asked}=1-${P(k)}=${tableLatex(value)}` : `${asked}=P(Z\\le ${zLatex(-k)})=${tableLatex(value)}`
    return { asked, regions, answer: regions.indexOf(right), value, worked }
}

function twoSided(random: Random): AreaRound | null {
    const a = Math.round((randomInt(random, -20, 15) / 10) * 100) / 100
    const b = Math.round((a + randomInt(random, 3, 20) / 10) * 100) / 100
    if (b > 2.5 || a === 0 || b === 0) return null
    const right: Region = [{ from: a, to: b }]
    const tails: Region = [{ from: null, to: a }, { from: b, to: null }]
    // Not the mirror image [−b, −a]: by symmetry it has the same area. The interval from 0 instead
    const third: Region = b > 0 ? [{ from: 0, to: b }] : [{ from: a, to: 0 }]
    const regions = shuffle(random, [right, tails, third])
    if (new Set(regions.map(key)).size < 3) return null
    const asked = `P(${zLatex(a)}\\le Z\\le ${zLatex(b)})`
    const value = regionValue(right)
    const low = a < 0 ? `(1-${P(a)})` : P(a)
    const high = b < 0 ? `(1-${P(b)})` : P(b)
    return { asked, regions, answer: regions.indexOf(right), value, worked: `${asked}=${high}-${low}=${tableLatex(value)}` }
}

/** Six rounds, never the same probability twice */
export function createAreaRounds(random: Random, level: number): AreaRound[] {
    const rounds: AreaRound[] = []
    for (let attempt = 0; rounds.length < AREA_ROUNDS && attempt < 3000; attempt += 1) {
        const round = level === 2 ? twoSided(random) : oneSided(random, level === 1)
        if (!round || rounds.some((other) => other.asked === round.asked)) continue
        rounds.push(round)
    }
    return rounds
}
