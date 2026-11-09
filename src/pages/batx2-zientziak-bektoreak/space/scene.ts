import type { Vec3 } from './vec3.ts'

/* ==========================================================================
   What the 3D board can draw. A scene is a plain list, so a lesson
   figure, a laboratory tool or a game builds it from numbers and the
   board does the drawing. Colours are CSS colours (the SPACE palette has
   the notebook ones). Tests in tests/bektoreak-batx2z-space.test.ts.
   ========================================================================== */

export type SceneItem =
    /** A dot; `drop` draws dashed lines down to the floor and, with 'box', to the x and y axes */
    | { kind: 'point'; at: Vec3; label?: string; color?: string; drop?: 'floor' | 'box'; hollow?: boolean }
    /** An arrow from `from` (the origin if missing) to `to` */
    | { kind: 'vector'; to: Vec3; from?: Vec3; label?: string; color?: string; dashed?: boolean; width?: number }
    | { kind: 'segment'; from: Vec3; to: Vec3; color?: string; dashed?: boolean; width?: number }
    /** A whole line, cut by the box of the drawing */
    | { kind: 'line'; point: Vec3; direction: Vec3; label?: string; color?: string; dashed?: boolean; width?: number }
    /** A whole plane through `point` with that normal, cut by the box of the drawing */
    | { kind: 'plane'; point: Vec3; normal: Vec3; label?: string; color?: string; opacity?: number }
    | { kind: 'polygon'; points: Vec3[]; color?: string; opacity?: number; stroke?: string }
    /** The parallelepiped on three edges from `origin` */
    | { kind: 'box'; origin: Vec3; edges: readonly [Vec3, Vec3, Vec3]; color?: string; opacity?: number; stroke?: string }
    | { kind: 'label'; at: Vec3; text: string; color?: string; dx?: number; dy?: number; size?: number }
    /** A small square in the corner of a right angle between the directions u and v at `at` */
    | { kind: 'right-angle'; at: Vec3; u: Vec3; v: Vec3; size?: number; color?: string }
    /** An arc between the directions u and v at `at` */
    | { kind: 'arc'; at: Vec3; u: Vec3; v: Vec3; radius?: number; color?: string; label?: string }

export const SPACE = {
    ink: 'var(--ink, #1d2733)',
    muted: 'var(--muted, #58616e)',
    card: 'var(--card, #fffcf6)',
    blue: '#2f6fdb',
    red: '#c4432a',
    green: '#267b53',
    violet: '#6b4fb8',
    mustard: '#b98a12',
    floor: '#d9dfe8',
    axis: '#3d4652',
    planeBlue: '#8fb3ef',
    planeRed: '#f0a493',
    planeGreen: '#9fd3b4',
    planeViolet: '#c3b3ea',
    planeMustard: '#f3d683'
} as const

/** The twelve edges of the box from the origin to P, as dashed segments (to read the coordinates of P) */
export function cuboid(p: Vec3, color: string = SPACE.muted): SceneItem[] {
    const [x, y, z] = p
    const corners: Vec3[] = [[0, 0, 0], [x, 0, 0], [x, y, 0], [0, y, 0], [0, 0, z], [x, 0, z], [x, y, z], [0, y, z]]
    const edges: Array<[number, number]> = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]]
    return edges.map(([a, b]) => ({ kind: 'segment' as const, from: corners[a], to: corners[b], color, dashed: true, width: 1.4 }))
}
