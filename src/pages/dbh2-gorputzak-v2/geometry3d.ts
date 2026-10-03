/* ==========================================================================
   Gorputz geometrikoak · 2. DBH — geometry of a small kit to draw solids in SVG with
   one orthographic camera seen from the front, a little from the right and
   from above. Polyhedra are given by their vertices: the faces come from
   the convex hull, hidden edges are dashed. Round bodies (cylinder, cone,
   frustum, sphere) are drawn with axis-aligned ellipses for their circles.
   ========================================================================== */

export type V3 = [number, number, number]
export type Point = [number, number]

export const INK = 'var(--ink, #1d2733)'
export const MUTED = 'var(--muted, #58616e)'
export const STAGE = 'var(--stage, #2f6fdb)'
export const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
export const SECOND = 'var(--second, #c4432a)'
export const GREEN = 'var(--success, #267b53)'
export const PAPER = '#fffcf6'
export const SOFT = '#fbebc0'
export const ROSE = '#f6d9d2'
export const MINT = '#d6eddf'
export const SKY = '#dde7f7'

export const points = (list: Point[]) => list.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')

const sub = (a: V3, b: V3): V3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]]
const dot = (a: V3, b: V3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
const cross = (a: V3, b: V3): V3 => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]
const norm = (a: V3) => Math.hypot(a[0], a[1], a[2])
const scaleV = (a: V3, k: number): V3 => [a[0] * k, a[1] * k, a[2] * k]
const centroid = (list: V3[]): V3 => scaleV(list.reduce<V3>((sum, p) => [sum[0] + p[0], sum[1] + p[1], sum[2] + p[2]], [0, 0, 0]), 1 / list.length)

/** Horizontal direction towards the viewer of the default camera (theta = −0.5) */
export const FRONT: V3 = [Math.sin(-0.5), 0, -Math.cos(-0.5)]
/** Horizontal direction that shows at the right of the default camera */
export const RIGHT: V3 = [Math.cos(-0.5), 0, Math.sin(-0.5)]

/** Index of the vertex that comes most towards the viewer (ties: the lowest index) */
export const frontMost = (vertices: V3[], direction: V3 = FRONT) =>
    vertices.reduce((best, p, index) => (dot(p, direction) > dot(vertices[best], direction) + 1e-9 ? index : best), 0)

export interface Camera {
    at: (p: V3) => Point
    /** True when a face with this outward normal looks towards the viewer */
    facing: (normal: V3) => boolean
    scale: number
    /** How much a horizontal circle is squashed: ry = r · squash */
    squash: number
    /** Screen pixels per unit of height */
    rise: number
}

/** A camera turned `theta` radians around the vertical axis and looking down `phi` radians */
export function camera(cx: number, cy: number, scale: number, theta = -0.5, phi = 0.36): Camera {
    const ct = Math.cos(theta)
    const st = Math.sin(theta)
    const cp = Math.cos(phi)
    const sp = Math.sin(phi)
    const rotate = ([x, y, z]: V3): V3 => [x * ct + z * st, y, -x * st + z * ct]
    return {
        at: (p) => {
            const [x, y, z] = rotate(p)
            return [cx + scale * x, cy - scale * (y * cp + z * sp)]
        },
        facing: (normal) => {
            const [, ny, nz] = rotate(normal)
            return ny * sp - nz * cp > 1e-9
        },
        scale,
        squash: sp,
        rise: cp
    }
}

/** A camera that fits these points inside the box [x0, y0] – [x1, y1], scale at most `maxScale` */
export function fitCamera(list: V3[], [x0, y0, x1, y1]: [number, number, number, number], maxScale = Infinity, theta = -0.5, phi = 0.36): Camera {
    const unit = camera(0, 0, 1, theta, phi)
    const projected = list.map((p) => unit.at(p))
    const xs = projected.map(([x]) => x)
    const ys = projected.map(([, y]) => y)
    const [minX, maxX, minY, maxY] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)]
    const scale = Math.min((x1 - x0) / Math.max(maxX - minX, 1e-6), (y1 - y0) / Math.max(maxY - minY, 1e-6), maxScale)
    return camera((x0 + x1) / 2 - scale * (minX + maxX) / 2, (y0 + y1) / 2 - scale * (minY + maxY) / 2, scale, theta, phi)
}

/** Points that bound a round body: its circles (as rings) and, for a sphere, its outline */
export const roundHull = (r: number, bottom: number, top: number, rTop = r): V3[] => [...ring(24, r, bottom), ...ring(24, rTop, top), [0, top, 0]]

export interface Face {
    vertices: number[]
    normal: V3
}

const hullCache = new WeakMap<V3[], Face[]>()

/** Faces of the convex hull, each ordered counterclockwise seen from outside */
export function hullFaces(vertices: V3[]): Face[] {
    const cached = hullCache.get(vertices)
    if (cached) return cached
    const size = Math.max(...vertices.map((p) => norm(p))) || 1
    const eps = 1e-7 * size * size
    const middle = centroid(vertices)
    const faces: Face[] = []
    const seen = new Set<string>()
    for (let i = 0; i < vertices.length; i += 1) {
        for (let j = i + 1; j < vertices.length; j += 1) {
            for (let k = j + 1; k < vertices.length; k += 1) {
                let normal = cross(sub(vertices[j], vertices[i]), sub(vertices[k], vertices[i]))
                if (norm(normal) < eps) continue
                const level = dot(normal, vertices[i])
                let above = 0
                let below = 0
                const on: number[] = []
                vertices.forEach((p, index) => {
                    const side = dot(normal, p) - level
                    if (side > eps) above += 1
                    else if (side < -eps) below += 1
                    else on.push(index)
                })
                if (above > 0 && below > 0) continue
                const key = on.join(',')
                if (seen.has(key)) continue
                seen.add(key)
                const centre = centroid(on.map((index) => vertices[index]))
                if (dot(normal, sub(centre, middle)) < 0) normal = scaleV(normal, -1)
                normal = scaleV(normal, 1 / norm(normal))
                const u0 = sub(vertices[on[0]], centre)
                const u = scaleV(u0, 1 / norm(u0))
                const w = cross(normal, u)
                const ordered = [...on].sort((a, b) => {
                    const pa = sub(vertices[a], centre)
                    const pb = sub(vertices[b], centre)
                    return Math.atan2(dot(pa, w), dot(pa, u)) - Math.atan2(dot(pb, w), dot(pb, u))
                })
                faces.push({ vertices: ordered, normal })
            }
        }
    }
    hullCache.set(vertices, faces)
    return faces
}

/** Number of faces, edges and vertices of a convex polyhedron */
export function countElements(vertices: V3[]) {
    const faces = hullFaces(vertices)
    const edges = faces.reduce((sum, face) => sum + face.vertices.length, 0) / 2
    return { faces: faces.length, edges, vertices: vertices.length }
}

/* ---------- Vertex lists ---------- */

/** Regular n-gon of circumradius r at height y, turned by `turn` radians */
export const ring = (n: number, r: number, y: number, turn = 0): V3[] =>
    Array.from({ length: n }, (_, index) => {
        const angle = turn + (2 * Math.PI * index) / n
        return [r * Math.cos(angle), y, r * Math.sin(angle)]
    })

export const prismVertices = (n: number, r: number, h: number, turn = 0): V3[] => [...ring(n, r, 0, turn), ...ring(n, r, h, turn)]
export const pyramidVertices = (n: number, r: number, h: number, turn = 0): V3[] => [...ring(n, r, 0, turn), [0, h, 0]]
export const frustumVertices = (n: number, r1: number, r2: number, h: number, turn = 0): V3[] => [...ring(n, r1, 0, turn), ...ring(n, r2, h, turn)]
/** Box of length a (x), height c (y) and depth b (z), centred on the vertical axis */
export const boxVertices = (a: number, b: number, c: number): V3[] => {
    const list: V3[] = []
    for (const x of [-a / 2, a / 2]) for (const y of [0, c]) for (const z of [-b / 2, b / 2]) list.push([x, y, z])
    return list
}

const PHI = (1 + Math.sqrt(5)) / 2

export const platonic: Record<'tetra' | 'cube' | 'octa' | 'dodeca' | 'icosa', V3[]> = {
    tetra: [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]],
    cube: [-1, 1].flatMap((x) => [-1, 1].flatMap((y) => [-1, 1].map((z): V3 => [x, y, z]))),
    octa: [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]],
    dodeca: [
        ...[-1, 1].flatMap((x) => [-1, 1].flatMap((y) => [-1, 1].map((z): V3 => [x, y, z]))),
        ...[-1, 1].flatMap((a) => [-1, 1].flatMap((b): V3[] => [[0, a / PHI, b * PHI], [a / PHI, b * PHI, 0], [a * PHI, 0, b / PHI]]))
    ],
    icosa: [-1, 1].flatMap((a) => [-1, 1].flatMap((b): V3[] => [[0, a, b * PHI], [a, b * PHI, 0], [a * PHI, 0, b]]))
}

