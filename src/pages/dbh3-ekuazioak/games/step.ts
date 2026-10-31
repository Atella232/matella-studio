import type { Stars } from '../../../features/unit-v2/games/records.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J1 · Urrats zuzena (El paso correcto): an equation and three next steps.
   Only one is an equivalent equation; the other two are the typical
   mistakes of the level: moving a term without changing its sign, the
   minus in front of a bracket reaching only the first term, or clearing
   denominators without multiplying every term. Every equation is kept as
   numbers too (Ax + B = Cx + D), so the tests can check that the right
   step keeps the solution and the wrong ones do not.
   ========================================================================== */

export const STEP_ROUNDS = 10

/** Ax + B = Cx + D */
export interface Linear {
    latex: string
    A: number
    B: number
    C: number
    D: number
}

export interface StepRound {
    before: Linear
    options: Linear[]
    answer: string
}

const solution = ({ A, B, C, D }: Linear) => (D - B) / (A - C)
export const linearSolution = solution

const term = (k: number) => (k === 1 ? 'x' : k === -1 ? '-x' : `${k}x`)
const eq = (latex: string, A: number, B: number, C: number, D: number): Linear => ({ latex, A, B, C, D })

function transpose(random: Random): StepRound {
    const c = randomInt(random, 1, 4)
    const a = c + randomInt(random, 1, 4)
    const b = randomInt(random, 1, 9)
    const d = randomInt(random, 1, 20)
    const before = eq(`${term(a)}+${b}=${term(c)}+${d}`, a, b, c, d)
    return {
        before,
        options: [
            eq(`${term(a)}-${term(c)}=${d}-${b}`, a - c, 0, 0, d - b),
            eq(`${term(a)}+${term(c)}=${d}-${b}`, a + c, 0, 0, d - b),
            eq(`${term(a)}-${term(c)}=${d}+${b}`, a - c, 0, 0, d + b)
        ],
        answer: `${term(a)}-${term(c)}=${d}-${b}`
    }
}

function brackets(random: Random): StepRound {
    const k = randomInt(random, 2, 5)
    const p = randomInt(random, 1, 6)
    const q = randomInt(random, 1, 6)
    const r = randomInt(random, 5, 30)
    // k(x + p) − (x − q) = r
    const before = eq(`${k}(x+${p})-(x-${q})=${r}`, k - 1, k * p + q, 0, r)
    const right = `${k}x+${k * p}-x+${q}=${r}`
    return {
        before,
        options: [
            eq(right, k - 1, k * p + q, 0, r),
            eq(`${k}x+${k * p}-x-${q}=${r}`, k - 1, k * p - q, 0, r),
            eq(`${k}x+${p}-x+${q}=${r}`, k - 1, p + q, 0, r)
        ],
        answer: right
    }
}

const DENOMINATORS: Array<[number, number, number]> = [[2, 3, 6], [3, 4, 12], [2, 5, 10], [4, 6, 12], [3, 6, 6], [4, 10, 20]]

function denominators(random: Random): StepRound {
    const [m, n, lcm] = pick(random, DENOMINATORS)
    const p = randomInt(random, 1, 5)
    // x/m + p = x/n, times the lcm
    const before = eq(`\\frac{x}{${m}}+${p}=\\frac{x}{${n}}`, 1 / m, p, 1 / n, 0)
    const right = `${term(lcm / m)}+${lcm * p}=${term(lcm / n)}`
    return {
        before,
        options: [
            eq(right, lcm / m, lcm * p, lcm / n, 0),
            eq(`${term(lcm / m)}+${p}=${term(lcm / n)}`, lcm / m, p, lcm / n, 0),
            eq(`${term(m)}+${lcm * p}=${term(n)}`, m, lcm * p, n, 0)
        ],
        answer: right
    }
}

const makers = [transpose, brackets, denominators]

export function createStepRounds(random: Random, level: number): StepRound[] {
    const make = makers[level] ?? makers[0]
    const rounds: StepRound[] = []
    while (rounds.length < STEP_ROUNDS) {
        const next = make(random)
        const right = solution(next.before)
        // The right step keeps the solution, the others lose it, and no round repeats
        if (next.options.slice(1).some((option) => Math.abs(solution(option) - right) < 1e-9) || !Number.isFinite(right)) continue
        if (new Set(next.options.map((option) => option.latex)).size < 3 || rounds.some((other) => other.before.latex === next.before.latex)) continue
        rounds.push({ ...next, options: shuffle(random, next.options) })
    }
    return rounds
}

export function stepStars(score: number): Stars {
    if (score >= 10) return 3
    if (score >= 8) return 2
    if (score >= 5) return 1
    return 0
}
