import { add, cross, dot, norm, scale, sub, type Vec3 } from './vec3.ts'

/* ==========================================================================
   The 3D board's camera and the clipping of lines and planes to the box
   of the drawing. The view turns around the z axis (azimuth) and tilts
   up and down (elevation); a mild perspective makes the near side a
   little bigger. The default view is the one of the textbooks: x comes
   towards you and to the left, y goes right and z goes up. Plain math,
   no React; tests in tests/bektoreak-batx2z-space.test.ts.
   ========================================================================== */

export interface View {
    /** Turn around z, in degrees: 0 looks along −x, 90 along −y */
    azimuth: number
    /** Height of the eye, in degrees: 0 sees the floor edge on, 90 from above */
    elevation: number
}

/** The textbook view: x towards you and to the left, y to the right, z up */
export const DEFAULT_VIEW: View = { azimuth: 32, elevation: 20 }
export const MIN_ELEVATION = -20
export const MAX_ELEVATION = 82

export const clampView = (view: View): View => ({
    azimuth: ((view.azimuth % 360) + 360) % 360,
    elevation: Math.max(MIN_ELEVATION, Math.min(MAX_ELEVATION, view.elevation))
})

export interface Projected {
    x: number
    y: number
    /** Larger is nearer to the eye */
    depth: number
}

export interface Camera {
    project: (point: Vec3) => Projected
    /** Pixels per unit near the origin */
    unit: number
    /** Direction from the scene towards the eye */
    eye: Vec3
}

const rad = (degrees: number) => (degrees * Math.PI) / 180

/**
 * A camera for a drawing of `width` × `height` pixels that shows the cube [−range, range]³.
 * The scale is fixed for every view, so turning the board never makes it jump.
 */
export function makeCamera(view: View, range: number, width: number, height: number, centre?: { x: number; y: number }): Camera {
    const a = rad(view.azimuth)
    const e = rad(view.elevation)
    const eye: Vec3 = [Math.cos(e) * Math.cos(a), Math.cos(e) * Math.sin(a), Math.sin(e)]
    const right: Vec3 = [-Math.sin(a), Math.cos(a), 0]
    const up: Vec3 = [-Math.sin(e) * Math.cos(a), -Math.sin(e) * Math.sin(a), Math.cos(e)]
    // Room for the axes (they reach 1.18 range) and their names, whatever the turn
    const unit = (Math.min(width, height) / 2 - 12) / (range * 1.25)
    const distance = range * 10
    const cx = centre?.x ?? width / 2
    const cy = centre?.y ?? height / 2
    return {
        unit,
        eye,
        project: (point) => {
            const depth = dot(point, eye)
            const grow = distance / (distance - depth)
            return { x: cx + dot(point, right) * unit * grow, y: cy - dot(point, up) * unit * grow, depth }
        }
    }
}

/** The part of the line point + t·direction inside the cube [−size, size]³, or null if it misses it */
export function clipLine(point: Vec3, direction: Vec3, size: number): [Vec3, Vec3] | null {
    let low = -Infinity
    let high = Infinity
    for (let axis = 0; axis < 3; axis++) {
        const d = direction[axis]
        const p = point[axis]
        if (Math.abs(d) < 1e-12) {
            if (Math.abs(p) > size + 1e-9) return null
            continue
        }
        const t1 = (-size - p) / d
        const t2 = (size - p) / d
        low = Math.max(low, Math.min(t1, t2))
        high = Math.min(high, Math.max(t1, t2))
    }
    if (!(high > low + 1e-9)) return null
    return [add(point, scale(low, direction)), add(point, scale(high, direction))]
}

const CUBE_EDGES: Array<[Vec3, Vec3]> = (() => {
    const edges: Array<[Vec3, Vec3]> = []
    const signs = [-1, 1]
    for (const s of signs) for (const t of signs) {
        edges.push([[-1, s, t], [1, s, t]])
        edges.push([[s, -1, t], [s, 1, t]])
        edges.push([[s, t, -1], [s, t, 1]])
    }
    return edges
})()

/**
 * The polygon a plane (normal · X = normal · point) cuts in the cube [−size, size]³, in order around it;
 * empty if the plane misses the cube.
 */
export function clipPlane(point: Vec3, normal: Vec3, size: number): Vec3[] {
    const level = dot(normal, point)
    const found: Vec3[] = []
    for (const [from, to] of CUBE_EDGES) {
        const a = scale(size, from)
        const b = scale(size, to)
        const fa = dot(normal, a) - level
        const fb = dot(normal, b) - level
        if (Math.abs(fa) < 1e-9) found.push(a)
        if (Math.abs(fb) < 1e-9) found.push(b)
        if (fa * fb < 0) found.push(add(a, scale(fa / (fa - fb), sub(b, a))))
    }
    const corners = found.filter((candidate, index) => found.findIndex((other) => norm(sub(other, candidate)) < 1e-7) === index)
    if (corners.length < 3) return []
    const centre = scale(1 / corners.length, corners.reduce((sum, corner) => add(sum, corner), [0, 0, 0] as Vec3))
    // Two directions inside the plane to measure the angle of each corner around the centre
    const helper: Vec3 = Math.abs(normal[0]) < 0.9 * norm(normal) ? [1, 0, 0] : [0, 1, 0]
    const first = cross(normal, helper)
    const second = cross(normal, first)
    return corners
        .map((corner) => ({ corner, angle: Math.atan2(dot(sub(corner, centre), second), dot(sub(corner, centre), first)) }))
        .sort((p, q) => p.angle - q.angle)
        .map(({ corner }) => corner)
}
