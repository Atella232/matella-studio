import { SPACE, type SceneItem } from './scene.ts'
import { add, cross, sub, type Vec3 } from './vec3.ts'

/* ==========================================================================
   Small scene builders shared by the lesson figures, the laboratory and
   the games of the Espacio block: the dashed box between two points, the
   plane of two vectors, a parallelogram on two vectors, a triangle.
   ========================================================================== */

/** The twelve dashed edges of the box with opposite corners a and b (its sides are parallel to the axes) */
export function boxBetween(a: Vec3, b: Vec3, color: string = SPACE.muted): SceneItem[] {
    const corner = (i: number): Vec3 => [i & 1 ? b[0] : a[0], i & 2 ? b[1] : a[1], i & 4 ? b[2] : a[2]]
    const edges: Array<[number, number]> = [[0, 1], [2, 3], [4, 5], [6, 7], [0, 2], [1, 3], [4, 6], [5, 7], [0, 4], [1, 5], [2, 6], [3, 7]]
    return edges.map(([i, j]) => ({ kind: 'segment' as const, from: corner(i), to: corner(j), color, dashed: true, width: 1.3 }))
}

/** The plane through `point` that holds the directions u and v */
export const planeOf = (point: Vec3, u: Vec3, v: Vec3, color: string = SPACE.planeBlue, opacity = 0.3): SceneItem => ({ kind: 'plane', point, normal: cross(u, v), color, opacity })

/** The parallelogram with sides u and v from `origin` */
export const parallelogram = (origin: Vec3, u: Vec3, v: Vec3, color: string = SPACE.planeRed, opacity = 0.42): SceneItem => ({
    kind: 'polygon',
    points: [origin, add(origin, u), add(add(origin, u), v), add(origin, v)],
    color,
    opacity,
    stroke: color
})

export const triangle = (a: Vec3, b: Vec3, c: Vec3, color: string = SPACE.planeRed, opacity = 0.45): SceneItem => ({ kind: 'polygon', points: [a, b, c], color, opacity, stroke: color })

/** The vector from a to b drawn where it is */
export const arrow = (a: Vec3, b: Vec3, color: string, label?: string, dashed = false): SceneItem => ({ kind: 'vector', from: a, to: b, color, label, dashed })

export const between = (a: Vec3, b: Vec3): Vec3 => sub(b, a)
