import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { augmentedStarLatex, classify, type SystemKind } from '../system.ts'
import { DISCUSSION_FAMILIES, aValues, criticalValues, kindAt } from '../lab/discussionMap.ts'

/* ==========================================================================
   J1 · Rouché espresa (Rouché exprés): a system and three buttons — no
   solution, one, infinitely many. Level 1 gives the ranks and n. Level 2
   gives A* with numbers (2 × 3 or 3 × 4), built to be of a chosen type.
   Level 3 gives a system with a parameter and one value of a, half of the
   time a critical one. The tests classify every round with system.ts.
   ========================================================================== */

export const ROUCHE_ROUNDS = 6

/** The buttons, always in this order */
export const ROUCHE_OPTIONS: SystemKind[] = ['inconsistent', 'determined', 'indeterminate']

export interface RoucheRound {
    level: number
    /** What is shown, in LaTeX (one or two formulas) */
    shown: string[]
    kind: SystemKind
    answer: number
    /** Why, in LaTeX: the ranks */
    why: string
    /** For the tests: the system (levels 2 and 3), or the ranks (level 1) */
    rows?: number[][]
    b?: number[]
    ranks?: [number, number, number]
}

const small = (random: Random) => pick(random, [-3, -2, -1, 1, 2, 3])
const kindOf = (ranks: [number, number, number]): SystemKind => (ranks[0] !== ranks[1] ? 'inconsistent' : ranks[0] === ranks[2] ? 'determined' : 'indeterminate')
const ranksLatex = (rankA: number, rankStar: number) => `\\operatorname{rg}(A)=${rankA},\\ \\operatorname{rg}(A^*)=${rankStar}`

function rankRound(random: Random): RoucheRound {
    const n = randomInt(random, 2, 4)
    const rankA = randomInt(random, 1, Math.min(n, 3))
    const rankStar = rankA + (rankA < 3 && randomInt(random, 0, 2) === 0 ? 1 : 0)
    const ranks: [number, number, number] = [rankA, rankStar, n]
    const kind = kindOf(ranks)
    return { level: 0, shown: [`${ranksLatex(rankA, rankStar)},\\ n=${n}`], kind, answer: ROUCHE_OPTIONS.indexOf(kind), why: kind === 'indeterminate' ? `${n}-${rankA}=${n - rankA}` : ranksLatex(rankA, rankStar), ranks }
}

/** A* of a chosen type: two random rows and a third that depends on them (or not) */
function matrixRound(random: Random): RoucheRound | null {
    const size = randomInt(random, 2, 3)
    const kind = pick(random, ROUCHE_OPTIONS)
    const base = Array.from({ length: size }, () => Array.from({ length: size }, () => small(random)))
    const b = base.map(() => small(random))
    let rows = base.map((row) => [...row])
    let constants = [...b]
    if (kind !== 'determined') {
        // The last row is a combination of the others; its constant follows it (dependent) or not (inconsistent)
        const factors = Array.from({ length: size - 1 }, () => pick(random, [1, -1, 2]))
        rows[size - 1] = rows[0].map((_, j) => factors.reduce((sum, factor, i) => sum + factor * rows[i][j], 0))
        constants[size - 1] = factors.reduce((sum, factor, i) => sum + factor * constants[i], 0) + (kind === 'inconsistent' ? pick(random, [1, -1, 2]) : 0)
    }
    if (rows.flat().some((item) => Math.abs(item) > 9) || constants.some((item) => Math.abs(item) > 12)) return null
    const result = classify(rows, constants)
    if (result.kind !== kind) return null
    const order = shuffle(random, rows.map((_, index) => index))
    rows = order.map((index) => rows[index])
    constants = order.map((index) => constants[index])
    return { level: 1, shown: [`A^*=${augmentedStarLatex(rows, constants)}`], kind, answer: ROUCHE_OPTIONS.indexOf(kind), why: ranksLatex(result.rankA, result.rankAugmented), rows, b: constants }
}

/** A system with a parameter and one value of a */
function parameterRound(random: Random): RoucheRound {
    const family = randomInt(random, 0, DISCUSSION_FAMILIES.length - 1)
    const critical = criticalValues(family)
    const a = randomInt(random, 0, 1) === 0 && critical.length ? pick(random, critical) : pick(random, aValues.filter((value) => !critical.includes(value)))
    const rows = DISCUSSION_FAMILIES[family].rows(a)
    const b = DISCUSSION_FAMILIES[family].b(a)
    const result = classify(rows, b)
    return { level: 2, shown: [DISCUSSION_FAMILIES[family].latex, `a=${a}`], kind: kindAt(family, a), answer: ROUCHE_OPTIONS.indexOf(result.kind), why: ranksLatex(result.rankA, result.rankAugmented), rows, b }
}

/** Six rounds of one level, never the same twice */
export function createRoucheRounds(random: Random, level: number): RoucheRound[] {
    const rounds: RoucheRound[] = []
    for (let attempt = 0; rounds.length < ROUCHE_ROUNDS && attempt < 3000; attempt += 1) {
        const round = level === 0 ? rankRound(random) : level === 1 ? matrixRound(random) : parameterRound(random)
        if (!round || rounds.some((other) => other.shown.join() === round.shown.join())) continue
        rounds.push(round)
    }
    return rounds
}
