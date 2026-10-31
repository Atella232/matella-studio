import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { Stars } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Osatu identitatea (Completa la identidad, 3. DBH): a special product with
   one piece covered; the learner picks the piece among four. Level 1:
   (x + a)², the middle term or the last one. Level 2: (x − a)² and
   (x + a)(x − a), where the signs are the trap. Level 3: the other way
   round — factorising x² + 2ax + a², x² − 2ax + a² and x² − a². The wrong
   pieces are the typical mistakes: a instead of 2a, a² with the wrong
   sign, the middle term forgotten. Pure logic.
   ========================================================================== */

export const IDENTITY_ROUNDS = 8

export interface IdentityRound {
    /** The identity with a box \boxed{?} where the piece goes */
    latex: string
    /** The whole identity, shown after answering */
    full: string
    options: string[]
    answer: string
}

const box = '\\boxed{\\,?\\,}'

function expandSum(random: Random): IdentityRound {
    const a = randomInt(random, 2, 9)
    const k = pick(random, [1, 1, 2, 3])
    const first = k === 1 ? 'x' : `${k}x`
    const full = `(${first}+${a})^{2}=${k * k === 1 ? '' : k * k}x^{2}+${2 * k * a}x+${a * a}`
    if (random() < 0.5) {
        return { latex: `(${first}+${a})^{2}=${k * k === 1 ? '' : k * k}x^{2}+${box}+${a * a}`, full, answer: `${2 * k * a}x`, options: [`${2 * k * a}x`, `${k * a}x`, `${a * a}x`, `${2 * a}x^{2}`] }
    }
    return { latex: `(${first}+${a})^{2}=${k * k === 1 ? '' : k * k}x^{2}+${2 * k * a}x+${box}`, full, answer: String(a * a), options: [String(a * a), String(2 * a), String(a), String(-a * a)] }
}

function expandDiff(random: Random): IdentityRound {
    const a = randomInt(random, 2, 9)
    if (random() < 0.5) {
        const full = `(x-${a})^{2}=x^{2}-${2 * a}x+${a * a}`
        return random() < 0.5
            ? { latex: `(x-${a})^{2}=x^{2}+${box}+${a * a}`, full, answer: `-${2 * a}x`, options: [`-${2 * a}x`, `${2 * a}x`, `-${a}x`, `-${a * a}x`] }
            : { latex: `(x-${a})^{2}=x^{2}-${2 * a}x${box}`, full, answer: `+${a * a}`, options: [`+${a * a}`, `-${a * a}`, `+${2 * a}`, `-${2 * a}`] }
    }
    const full = `(x+${a})(x-${a})=x^{2}-${a * a}`
    return { latex: `(x+${a})(x-${a})=${box}`, full, answer: `x^{2}-${a * a}`, options: [`x^{2}-${a * a}`, `x^{2}+${a * a}`, `x^{2}-${2 * a}x-${a * a}`, `x^{2}-${2 * a}`] }
}

function factorise(random: Random): IdentityRound {
    const a = randomInt(random, 2, 9)
    const kind = randomInt(random, 0, 2)
    if (kind === 0) return { latex: `x^{2}+${2 * a}x+${a * a}=${box}`, full: `x^{2}+${2 * a}x+${a * a}=(x+${a})^{2}`, answer: `(x+${a})^{2}`, options: [`(x+${a})^{2}`, `(x+${a * a})^{2}`, `(x+${2 * a})^{2}`, `(x-${a})^{2}`] }
    if (kind === 1) return { latex: `x^{2}-${2 * a}x+${a * a}=${box}`, full: `x^{2}-${2 * a}x+${a * a}=(x-${a})^{2}`, answer: `(x-${a})^{2}`, options: [`(x-${a})^{2}`, `(x+${a})^{2}`, `(x+${a})(x-${a})`, `(x-${2 * a})^{2}`] }
    return { latex: `x^{2}-${a * a}=${box}`, full: `x^{2}-${a * a}=(x+${a})(x-${a})`, answer: `(x+${a})(x-${a})`, options: [`(x+${a})(x-${a})`, `(x-${a})^{2}`, `(x+${a})^{2}`, `(x-${a * a})(x+1)`] }
}

const makers = [expandSum, expandDiff, factorise]

export function createIdentityRounds(random: Random, level: number): IdentityRound[] {
    const make = makers[level] ?? makers[0]
    const rounds: IdentityRound[] = []
    while (rounds.length < IDENTITY_ROUNDS) {
        const next = make(random)
        // Four different pieces, and no round twice
        if (new Set(next.options).size < 4 || rounds.some((other) => other.latex === next.latex)) continue
        rounds.push({ ...next, options: shuffle(random, next.options) })
    }
    return rounds
}

export function identityStars(score: number): Stars {
    if (score >= 8) return 3
    if (score >= 6) return 2
    if (score >= 4) return 1
    return 0
}
