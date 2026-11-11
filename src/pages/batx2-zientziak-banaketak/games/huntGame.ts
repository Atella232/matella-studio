import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { above, below, tableLatex, zLatex } from '../normal.ts'

/* ==========================================================================
   J3 · Bilatu taulan (Busca en la tabla): a probability is given and k (or
   x) is asked, the inverse reading of the table. Level 1: P(Z ≤ k) = p
   with p > 0,5, read straight from the table; level 2: P(Z > k) = p, or
   P(Z ≤ k) = p with p < 0,5, which need the complement or the symmetry;
   level 3: X ~ N(μ; σ) and P(X ≤ x) = p, so x = μ + kσ. The wrong options
   are the sign slip (−k), the next row of the table (k ± 0,1) and, on
   level 3, forgetting σ (μ + k). Every p is a table value of a z with two
   decimals up to 2,5, where the table grows strictly, so k is unique.
   ========================================================================== */

export const HUNT_ROUNDS = 6
export const HUNT_SDS = [2, 4, 5, 10] as const

export interface HuntRound {
    /** The data, in LaTeX lines */
    data: string[]
    /** What is asked: k or x */
    unknown: 'k' | 'x'
    options: string[]
    answer: number
    worked: string[]
    /** The numbers behind the round, for the tests */
    meta: { z: number; side: 'below' | 'above'; p: number; mean?: number; sd?: number; x?: number }
}

/** A number with two decimals at most for LaTeX: 1.5 → 1{,}5, −0.84 → −0{,}84 */
const numberLatex = (value: number) => {
    const rounded = Math.round(value * 100) / 100
    return String(rounded).replace('.', '{,}')
}

function standard(random: Random, level: number): HuntRound | null {
    const z = (level === 0 ? 1 : random() < 0.5 ? -1 : 1) * randomInt(random, 10, 250) / 100
    const side = level === 0 ? 'below' : pick(random, ['below', 'above'] as const)
    if (level === 0 && z <= 0) return null
    // Level 2 always needs a turn: «above», or «below» with p < 0,5
    if (level === 1 && side === 'below' && z > 0) return null
    const p = side === 'below' ? below(z) : above(z)
    const relation = side === 'below' ? '\\le' : '>'
    const near = Math.round((z + (random() < 0.5 ? 0.1 : -0.1)) * 100) / 100
    const options = [zLatex(z), zLatex(-z), zLatex(near)]
    if (new Set(options).size < 3 || near === 0) return null
    const shuffled = shuffle(random, options)
    const size = Math.abs(z)
    const worked = side === 'below'
        ? z > 0 ? [`P(Z\\le ${zLatex(z)})=${tableLatex(p)}`] : [`P(Z\\le ${zLatex(size)})=1-${tableLatex(p)}=${tableLatex(below(size))}`, `k=-${zLatex(size)}`]
        : z > 0 ? [`P(Z\\le k)=1-${tableLatex(p)}=${tableLatex(below(z))}`, `k=${zLatex(z)}`] : [`P(Z\\le ${zLatex(size)})=${tableLatex(p)}`, `k=-${zLatex(size)}`]
    return { data: [`P(Z${relation} k)=${tableLatex(p)}`], unknown: 'k', options: shuffled, answer: shuffled.indexOf(zLatex(z)), worked, meta: { z, side, p } }
}

function withX(random: Random): HuntRound | null {
    const z = (random() < 0.5 ? -1 : 1) * randomInt(random, 10, 250) / 100
    const mean = 5 * randomInt(random, 4, 30)
    const sd = pick(random, HUNT_SDS)
    const p = below(z)
    const x = mean + z * sd
    const options = [numberLatex(x), numberLatex(mean - z * sd), numberLatex(mean + z)]
    if (new Set(options).size < 3) return null
    const shuffled = shuffle(random, options)
    const size = Math.abs(z)
    const read = z > 0 ? `P(Z\\le ${zLatex(z)})=${tableLatex(p)}` : `P(Z\\le ${zLatex(size)})=1-${tableLatex(p)}=${tableLatex(below(size))}`
    return {
        data: [`X\\sim N(${mean};\\,${sd})`, `P(X\\le x)=${tableLatex(p)}`],
        unknown: 'x',
        options: shuffled,
        answer: shuffled.indexOf(numberLatex(x)),
        worked: [read, `x=${mean}${z < 0 ? '-' : '+'}${zLatex(size)}\\cdot ${sd}=${numberLatex(x)}`],
        meta: { z, side: 'below', p, mean, sd, x }
    }
}

/** Six rounds, never the same data twice */
export function createHuntRounds(random: Random, level: number): HuntRound[] {
    const rounds: HuntRound[] = []
    for (let attempt = 0; rounds.length < HUNT_ROUNDS && attempt < 5000; attempt += 1) {
        const round = level === 2 ? withX(random) : standard(random, level)
        if (!round || rounds.some((other) => other.data.join() === round.data.join())) continue
        rounds.push(round)
    }
    return rounds
}
