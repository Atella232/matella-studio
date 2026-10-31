import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { Stars } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Patroi ezkutua (El patrón escondido, 3. DBH): a sequence of six terms
   with one of them hidden; the learner picks it among four. Level 1:
   arithmetic progressions (also decreasing ones). Level 2: geometric
   progressions, with ratios 2, 3, 1/2, −2. Level 3: other rules —
   Fibonacci-like sums, squares plus a number, differences that grow.
   The wrong options are what the other rules would give (adding the jump
   when it multiplies, the next square…). Pure logic, whole numbers only.
   ========================================================================== */

export const HIDDEN_ROUNDS = 8

export type HiddenKind = 'arithmetic' | 'geometric' | 'fibonacci' | 'squares' | 'growing'

export interface HiddenRound {
    kind: HiddenKind
    terms: number[]
    /** Position of the hidden term (0-based) */
    hole: number
    options: number[]
    answer: number
}

function arithmetic(random: Random): { kind: HiddenKind; terms: number[] } {
    const a1 = randomInt(random, -10, 30)
    const d = pick(random, [-7, -5, -4, -3, 2, 3, 4, 5, 6, 7, 9, 11])
    return { kind: 'arithmetic', terms: Array.from({ length: 6 }, (_, k) => a1 + k * d) }
}

function geometric(random: Random): { kind: HiddenKind; terms: number[] } {
    const r = pick(random, [2, 3, -2, 0.5])
    const a1 = r === 0.5 ? pick(random, [64, 96, 160, 320]) : r === 3 ? pick(random, [1, 2, 4]) : pick(random, [1, 3, 5, 7])
    return { kind: 'geometric', terms: Array.from({ length: 6 }, (_, k) => a1 * r ** k) }
}

function other(random: Random): { kind: HiddenKind; terms: number[] } {
    const kind = pick(random, ['fibonacci', 'squares', 'growing'] as const)
    if (kind === 'fibonacci') {
        const terms = [randomInt(random, 1, 4), randomInt(random, 1, 5)]
        while (terms.length < 6) terms.push(terms[terms.length - 1] + terms[terms.length - 2])
        return { kind, terms }
    }
    if (kind === 'squares') {
        const c = randomInt(random, -3, 5)
        return { kind, terms: Array.from({ length: 6 }, (_, k) => (k + 1) ** 2 + c) }
    }
    // Differences 1, 2, 3, … (or 2, 4, 6, …)
    const start = randomInt(random, 1, 10)
    const step = pick(random, [1, 2])
    return { kind, terms: Array.from({ length: 6 }, (_, k) => start + (step * k * (k + 1)) / 2) }
}

const makers = [arithmetic, geometric, other]

export function createHiddenRound(random: Random, level: number): HiddenRound {
    for (;;) {
        const { kind, terms } = (makers[level] ?? arithmetic)(random)
        if (terms.some((term) => !Number.isInteger(term))) continue
        const hole = randomInt(random, 2, 5)
        const answer = terms[hole]
        const before = terms[hole - 1]
        const twoBefore = terms[hole - 2]
        // What another rule would put in the hole
        const mistakes = [
            before + (before - twoBefore),
            twoBefore === 0 ? before * 2 : (before * before) / twoBefore,
            before + twoBefore,
            answer + 1,
            answer - 1,
            answer + (before - twoBefore)
        ]
        const options = new Set([answer])
        for (const value of shuffle(random, mistakes)) {
            if (options.size === 4) break
            if (Number.isInteger(value) && !options.has(value)) options.add(value)
        }
        if (options.size < 4) continue
        return { kind, terms, hole, options: shuffle(random, [...options]), answer }
    }
}

export function createHiddenRounds(random: Random, level: number): HiddenRound[] {
    return Array.from({ length: HIDDEN_ROUNDS }, () => createHiddenRound(random, level))
}

export function hiddenStars(score: number): Stars {
    if (score >= 8) return 3
    if (score >= 6) return 2
    if (score >= 4) return 1
    return 0
}
