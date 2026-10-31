import type { Stars } from '../../../features/unit-v2/games/records.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J2 · Zer triangelu da? (¿Qué triángulo es?): three sides, the longest c.
   Compare c² with a² + b²: equal, a right triangle; smaller, acute;
   larger, obtuse. On level 3 some sides do not close (c ≥ a + b). The
   drawing is not shown, so that the numbers decide.
   ========================================================================== */

export const KIND_ROUNDS = 10

export type TriangleKind = 'acute' | 'right' | 'obtuse' | 'none'

export interface KindRound {
    /** Shortest first; the last one is the longest */
    sides: [number, number, number]
    kind: TriangleKind
}

const TRIPLES: Array<[number, number, number]> = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29], [9, 40, 41]]

export function kindOf([a, b, c]: [number, number, number]): TriangleKind {
    if (c >= a + b) return 'none'
    const legs = a * a + b * b
    return c * c === legs ? 'right' : c * c < legs ? 'acute' : 'obtuse'
}

function right(random: Random): [number, number, number] {
    const [a, b, c] = pick(random, TRIPLES)
    const k = c > 20 ? 1 : randomInt(random, 1, 3)
    return [a * k, b * k, c * k]
}

/** Sides near a right triangle: the same legs with the longest side a little shorter or longer */
function near(random: Random): [number, number, number] {
    const [a, b, c] = right(random)
    return [a, b, c + pick(random, [-2, -1, 1, 2])]
}

function anySides(random: Random): [number, number, number] {
    const sides = [randomInt(random, 2, 15), randomInt(random, 2, 15), randomInt(random, 2, 20)].sort((p, q) => p - q) as [number, number, number]
    return sides
}

export function createKindRounds(random: Random, level: number): KindRound[] {
    const rounds: KindRound[] = []
    while (rounds.length < KIND_ROUNDS) {
        const sides = level === 0 ? (random() < 0.5 ? right(random) : near(random)) : level === 1 ? (random() < 0.35 ? right(random) : random() < 0.5 ? near(random) : anySides(random)) : random() < 0.25 ? right(random) : anySides(random)
        sides.sort((p, q) => p - q)
        const kind = kindOf(sides)
        if (level < 2 && kind === 'none') continue
        if (rounds.some((other) => other.sides.join() === sides.join())) continue
        rounds.push({ sides, kind })
    }
    // Level 3 always has a set of sides that does not close
    if (level === 2 && !rounds.some((round) => round.kind === 'none')) {
        const a = randomInt(random, 2, 6)
        const b = randomInt(random, a, 8)
        rounds[randomInt(random, 0, KIND_ROUNDS - 1)] = { sides: [a, b, a + b + randomInt(random, 0, 3)], kind: 'none' }
    }
    return shuffle(random, rounds)
}

export function kindStars(score: number): Stars {
    if (score >= 10) return 3
    if (score >= 8) return 2
    if (score >= 5) return 1
    return 0
}
