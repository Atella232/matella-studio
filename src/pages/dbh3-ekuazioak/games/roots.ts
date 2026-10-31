import type { Stars } from '../../../features/unit-v2/games/records.ts'
import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J2 · Erroak zuzenean (Raíces en la recta): a quadratic equation and the
   number line from −6 to 6. The learner taps every solution and presses
   «done», or says there is none. Level 1 is incomplete equations (± the
   root, or 0 and another), level 2 complete ones with two whole roots,
   level 3 mixes double roots and equations with no solution.
   ========================================================================== */

export const ROOTS_ROUNDS = 8
export const ROOTS_RANGE = 6

export interface RootsRound {
    /** ax² + bx + c = 0 */
    a: number
    b: number
    c: number
    latex: string
    /** The solutions, smallest first (empty when there is none) */
    roots: number[]
}

export function quadraticLatex(a: number, b: number, c: number): string {
    const first = a === 1 ? 'x^{2}' : a === -1 ? '-x^{2}' : `${a}x^{2}`
    const second = b === 0 ? '' : `${b < 0 ? '-' : '+'}${Math.abs(b) === 1 ? '' : Math.abs(b)}x`
    const third = c === 0 ? '' : `${c < 0 ? '-' : '+'}${Math.abs(c)}`
    return `${first}${second}${third}=0`
}

const round = (a: number, b: number, c: number, roots: number[]): RootsRound => ({ a, b, c, latex: quadraticLatex(a, b, c), roots: [...new Set(roots)].sort((p, q) => p - q) })
/** a(x − p)(x − q) */
const fromRoots = (a: number, p: number, q: number) => round(a, -a * (p + q), a * p * q, [p, q])

function incomplete(random: Random): RootsRound {
    const a = pick(random, [1, 1, 2, 3])
    const r = randomInt(random, 1, ROOTS_RANGE)
    return random() < 0.5 ? fromRoots(a, -r, r) : fromRoots(a, 0, random() < 0.5 ? r : -r)
}

function complete(random: Random): RootsRound {
    for (;;) {
        const p = randomInt(random, -ROOTS_RANGE, ROOTS_RANGE)
        const q = randomInt(random, -ROOTS_RANGE, ROOTS_RANGE)
        if (p !== q && p !== 0 && q !== 0 && p !== -q) return fromRoots(1, p, q)
    }
}

function mixed(random: Random): RootsRound {
    const kind = randomInt(random, 0, 2)
    if (kind === 0) return complete(random)
    if (kind === 1) {
        const p = randomInt(random, -5, 5)
        return fromRoots(1, p, p)
    }
    // No solution: b² < 4c
    for (;;) {
        const b = randomInt(random, -6, 6)
        const c = randomInt(random, 1, 12)
        if (b * b < 4 * c) return round(1, b, c, [])
    }
}

const makers = [incomplete, complete, mixed]

export function createRootsRounds(random: Random, level: number): RootsRound[] {
    const make = makers[level] ?? makers[0]
    const rounds: RootsRound[] = []
    while (rounds.length < ROOTS_ROUNDS) {
        const next = make(random)
        if (rounds.some((other) => other.latex === next.latex)) continue
        rounds.push(next)
    }
    return rounds
}

/** The learner's marks (or none) are exactly the solutions */
export const rootsRight = (round: RootsRound, marked: number[]) => marked.length === round.roots.length && round.roots.every((root) => marked.includes(root))

export function rootsStars(score: number): Stars {
    if (score >= 8) return 3
    if (score >= 6) return 2
    if (score >= 4) return 1
    return 0
}
