import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { augmentedStarLatex, classify, type SystemKind } from '../../batx2-zientziak-sistemak/system.ts'

/* ==========================================================================
   J1 · Zenbat soluzio ditu negozioak? (¿Cuántas soluciones tiene el
   negocio?): the matrix A* of some bundles (one row per bundle, what it
   costs in the last column). Level 1: three bundles of two products;
   level 2: three bundles of three products. How many sets of prices fit:
   none, one or infinitely many? Each level has rounds of the three kinds.
   Level 3: the third bundle is the sum of the other two; which price
   makes the data fit? The wrong options are the slips (the difference,
   one price, the product).
   ========================================================================== */

export const BUSINESS_ROUNDS = 6
export const BUSINESS_OPTIONS: SystemKind[] = ['inconsistent', 'determined', 'indeterminate']

export interface BusinessRound {
    level: number
    q: number[][]
    totals: number[]
    kind: SystemKind
    rankA: number
    rankAugmented: number
    /** Level 3: the candidates for the price of the third bundle */
    values: number[]
    answer: number
}

const cost = (row: number[], prices: number[]) => row.reduce((sum, value, k) => sum + value * prices[k], 0)
const add = (first: number[], second: number[]) => first.map((value, k) => value + second[k])

/** A round of a given kind with `products` products */
function kindRound(random: Random, level: number, kind: SystemKind): BusinessRound | null {
    const products = level === 0 ? 2 : 3
    const prices = Array.from({ length: products }, () => randomInt(random, 1, 6))
    const row = () => Array.from({ length: products }, () => randomInt(random, 0, 4))
    let q: number[][]
    if (kind === 'indeterminate') {
        const first = row()
        q = products === 2 ? [first, first.map((value) => value * 2), first.map((value) => value * 3)] : (() => { const second = row(); return [first, second, add(first, second)] })()
    } else if (products === 2) {
        q = [row(), row(), row()]
    } else {
        const first = row()
        const second = row()
        q = [first, second, kind === 'inconsistent' ? add(first, second) : row()]
    }
    if (q.some((cells) => cells.every((value) => value === 0))) return null
    const totals = q.map((cells) => cost(cells, prices))
    if (kind === 'inconsistent') totals[2] += pick(random, [1, 2, -1, 3])
    if (totals.some((total) => total < 0)) return null
    const { kind: found, rankA, rankAugmented } = classify(q, totals)
    if (found !== kind) return null
    return { level, q, totals, kind, rankA, rankAugmented, values: [], answer: BUSINESS_OPTIONS.indexOf(kind) }
}

/** Level 3: the price of the third bundle (the sum of the other two) */
function priceRound(random: Random): BusinessRound | null {
    const prices = [randomInt(random, 1, 6), randomInt(random, 1, 6)]
    const first = [randomInt(random, 1, 4), randomInt(random, 1, 4)]
    const second = [randomInt(random, 1, 4), randomInt(random, 1, 4)]
    if (first[0] * second[1] === first[1] * second[0]) return null
    const q = [first, second, add(first, second)]
    const totals = [cost(first, prices), cost(second, prices), 0]
    const right = totals[0] + totals[1]
    const wrong = [Math.abs(totals[0] - totals[1]), totals[0] * totals[1], right + 1, right - 1, right + 2].filter((value) => value > 0 && value !== right)
    const values = shuffle(random, [right, ...[...new Set(wrong)].slice(0, 3)])
    if (values.length < 4) return null
    return { level: 2, q, totals, kind: 'determined', rankA: 2, rankAugmented: 2, values, answer: values.indexOf(right) }
}

export function createBusinessRounds(random: Random, level: number): BusinessRound[] {
    const rounds: BusinessRound[] = []
    const kinds = shuffle(random, [...BUSINESS_OPTIONS, ...BUSINESS_OPTIONS])
    for (let attempt = 0; rounds.length < BUSINESS_ROUNDS && attempt < 5000; attempt += 1) {
        const round = level === 2 ? priceRound(random) : kindRound(random, level, kinds[rounds.length])
        if (!round || rounds.some((other) => other.q.flat().join() === round.q.flat().join())) continue
        rounds.push(round)
    }
    return rounds
}

/** A* with the price of the third bundle covered in level 3 */
export const businessLatex = (round: BusinessRound) => (round.level === 2
    ? augmentedStarLatex(round.q, round.totals).replace(/&0\\end\{array\}/, '&\\boxed{?}\\end{array}')
    : augmentedStarLatex(round.q, round.totals))
