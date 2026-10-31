import type { Stars } from '../../../features/unit-v2/games/records.ts'
import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { reflect, rotate, translate, type Axis, type Point } from '../motion.ts'

/* ==========================================================================
   J1 · Non erortzen da? (¿Dónde cae?): a point and a movement written in
   words and symbols; the learner taps the image on a grid from −6 to 6.
   Level 1: translations by a vector; level 2: rotations of 90°, 180° and
   270° about the origin; level 3: reflections in the axes, in y = x, in a
   line x = k, and the central symmetry in a point. The image is worked out
   with motion.ts and is always on the grid.
   ========================================================================== */

export const WHERE_ROUNDS = 8
export const WHERE_GRID = 6

export type Movement =
    | { kind: 'translation'; vector: Point }
    | { kind: 'rotation'; angle: 90 | 180 | 270 }
    | { kind: 'reflection'; axis: Axis }
    | { kind: 'central'; centre: Point }

export interface WhereRound {
    point: Point
    movement: Movement
    image: Point
}

export function imageOf(point: Point, movement: Movement): Point {
    if (movement.kind === 'translation') return translate(point, movement.vector)
    if (movement.kind === 'rotation') return rotate(point, movement.angle)
    if (movement.kind === 'reflection') return reflect(point, movement.axis)
    return rotate(point, 180, movement.centre)
}

const inside = ([x, y]: Point, limit: number) => Math.abs(x) <= limit && Math.abs(y) <= limit

function movementFor(random: Random, level: number): Movement {
    if (level === 0) return { kind: 'translation', vector: [randomInt(random, -5, 5), randomInt(random, -5, 5)] }
    if (level === 1) return { kind: 'rotation', angle: pick(random, [90, 180, 270] as const) }
    const choice = randomInt(random, 0, 4)
    if (choice === 0) return { kind: 'reflection', axis: { kind: 'horizontal', at: 0 } }
    if (choice === 1) return { kind: 'reflection', axis: { kind: 'vertical', at: 0 } }
    if (choice === 2) return { kind: 'reflection', axis: { kind: 'diagonal' } }
    if (choice === 3) return { kind: 'reflection', axis: { kind: 'vertical', at: randomInt(random, -2, 2) } }
    return { kind: 'central', centre: [randomInt(random, -1, 1), randomInt(random, -1, 1)] }
}

export function createWhereRounds(random: Random, level: number): WhereRound[] {
    const rounds: WhereRound[] = []
    while (rounds.length < WHERE_ROUNDS) {
        const point: Point = [randomInt(random, -5, 5), randomInt(random, -5, 5)]
        const movement = movementFor(random, level)
        const image = imageOf(point, movement)
        // The point must really move, and both must be on the grid
        if (!inside(image, WHERE_GRID) || (image[0] === point[0] && image[1] === point[1])) continue
        if (movement.kind === 'translation' && movement.vector[0] === 0 && movement.vector[1] === 0) continue
        if (rounds.some((other) => other.point.join() === point.join() && JSON.stringify(other.movement) === JSON.stringify(movement))) continue
        rounds.push({ point, movement, image })
    }
    return rounds
}

export function whereStars(score: number): Stars {
    if (score >= 8) return 3
    if (score >= 6) return 2
    if (score >= 4) return 1
    return 0
}
