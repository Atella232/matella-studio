import type { Stars } from '../../../features/unit-v2/games/records.ts'
import { randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { NOTABLE_KINDS, notablePoint, type NotableKind, type Point } from '../lab/notable.ts'

/* ==========================================================================
   J3 · Zer puntu da? (¿Qué punto es?): a triangle with A = (0, 0), B =
   (6, 0) and C on the grid, some lines of one kind and the point where
   they meet. The learner names the point. Level 1 draws the three lines,
   level 2 two and level 3 one. Right triangles and C straight above the
   middle of AB are left out, so that the lines of different kinds never
   look the same.
   ========================================================================== */

export const POINT_ROUNDS = 8

export interface PointRound {
    c: Point
    kind: NotableKind
    lines: number
}

export function createPointRounds(random: Random, level: number): PointRound[] {
    const rounds: PointRound[] = []
    const kinds = [...NOTABLE_KINDS, ...NOTABLE_KINDS]
    while (rounds.length < POINT_ROUNDS) {
        const c: Point = [randomInt(random, -1, 7), randomInt(random, 2, 6)]
        const sides = [c[0] * c[0] + c[1] * c[1], (c[0] - 6) ** 2 + c[1] * c[1], 36].sort((p, q) => p - q)
        // No right triangle and no isosceles one with C over the middle of AB
        if (sides[2] === sides[0] + sides[1] || c[0] === 3) continue
        const kind = kinds[rounds.length]
        const point = notablePoint(kind, c)
        if (Math.abs(point[0]) > 9 || Math.abs(point[1]) > 9) continue
        rounds.push({ c, kind, lines: 3 - Math.min(level, 2) })
    }
    // The kinds come in a shuffled order
    for (let index = rounds.length - 1; index > 0; index -= 1) {
        const other = randomInt(random, 0, index)
        const swap = rounds[index].kind
        rounds[index] = { ...rounds[index], kind: rounds[other].kind }
        rounds[other] = { ...rounds[other], kind: swap }
    }
    return rounds.map((round) => {
        const point = notablePoint(round.kind, round.c)
        return Math.abs(point[0]) > 9 || Math.abs(point[1]) > 9 ? { ...round, kind: 'centroid' as NotableKind } : round
    })
}

export function pointStars(score: number): Stars {
    if (score >= 8) return 3
    if (score >= 6) return 2
    if (score >= 4) return 1
    return 0
}
