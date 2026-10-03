import { boxVertices, hullFaces, INK, MINT, MUTED, PAPER, points, SECOND, SKY, SOFT, type Camera, type Face, type Point, type V3 } from './geometry3d'

/* Components of the solids kit (see geometry3d.ts) */

/* ---------- Polyhedron ---------- */

interface SolidProps {
    cam: Camera
    vertices: V3[]
    fill?: string
    /** Colour of a particular face, by its outward normal */
    faceFill?: (face: Face) => string | undefined
    stroke?: string
    width?: number
    opacity?: number
    /** Show the hidden edges dashed (default) or not at all */
    hidden?: boolean
}

export function Solid({ cam, vertices, fill = PAPER, faceFill, stroke = INK, width = 2, opacity = 0.92, hidden = true }: SolidProps) {
    const faces = hullFaces(vertices)
    const screen = vertices.map((p) => cam.at(p))
    const visible = faces.map((face) => cam.facing(face.normal))
    const edges = new Map<string, { a: number; b: number; shown: boolean }>()
    faces.forEach((face, index) => {
        face.vertices.forEach((a, position) => {
            const b = face.vertices[(position + 1) % face.vertices.length]
            const key = a < b ? `${a}-${b}` : `${b}-${a}`
            const edge = edges.get(key) ?? { a, b, shown: false }
            edge.shown = edge.shown || visible[index]
            edges.set(key, edge)
        })
    })
    const list = [...edges.values()]
    return (
        <g>
            {hidden && list.filter((edge) => !edge.shown).map((edge) => (
                <line key={`h${edge.a}-${edge.b}`} x1={screen[edge.a][0]} y1={screen[edge.a][1]} x2={screen[edge.b][0]} y2={screen[edge.b][1]} stroke={MUTED} strokeWidth={1.3} strokeDasharray="5 4" />
            ))}
            {faces.map((face, index) => visible[index] && (
                <polygon key={`f${index}`} points={points(face.vertices.map((vertex) => screen[vertex]))} fill={faceFill?.(face) ?? fill} fillOpacity={opacity} stroke="none" />
            ))}
            {list.filter((edge) => edge.shown).map((edge) => (
                <line key={`e${edge.a}-${edge.b}`} x1={screen[edge.a][0]} y1={screen[edge.a][1]} x2={screen[edge.b][0]} y2={screen[edge.b][1]} stroke={stroke} strokeWidth={width} strokeLinecap="round" />
            ))}
        </g>
    )
}

/** Box of length a (x), depth b (z) and height c (y) with the unit squares drawn on its visible faces */
export function GridBox({ cam, a, b, c, fill = SKY, step = 1, opacity = 0.92 }: { cam: Camera; a: number; b: number; c: number; fill?: string; step?: number; opacity?: number }) {
    const vertices = boxVertices(a, b, c)
    const lines: [V3, V3][] = []
    const x0 = -a / 2
    const z0 = -b / 2
    const range = (length: number) => Array.from({ length: Math.max(0, Math.round(length / step) - 1) }, (_, index) => (index + 1) * step)
    const faces: { normal: V3; add: () => void }[] = [
        { normal: [0, 0, -1], add: () => { range(a).forEach((t) => lines.push([[x0 + t, 0, z0], [x0 + t, c, z0]])); range(c).forEach((t) => lines.push([[x0, t, z0], [x0 + a, t, z0]])) } },
        { normal: [0, 0, 1], add: () => { range(a).forEach((t) => lines.push([[x0 + t, 0, -z0], [x0 + t, c, -z0]])); range(c).forEach((t) => lines.push([[x0, t, -z0], [x0 + a, t, -z0]])) } },
        { normal: [-1, 0, 0], add: () => { range(b).forEach((t) => lines.push([[x0, 0, z0 + t], [x0, c, z0 + t]])); range(c).forEach((t) => lines.push([[x0, t, z0], [x0, t, -z0]])) } },
        { normal: [1, 0, 0], add: () => { range(b).forEach((t) => lines.push([[-x0, 0, z0 + t], [-x0, c, z0 + t]])); range(c).forEach((t) => lines.push([[-x0, t, z0], [-x0, t, -z0]])) } },
        { normal: [0, 1, 0], add: () => { range(a).forEach((t) => lines.push([[x0 + t, c, z0], [x0 + t, c, -z0]])); range(b).forEach((t) => lines.push([[x0, c, z0 + t], [-x0, c, z0 + t]])) } }
    ]
    faces.forEach((face) => cam.facing(face.normal) && face.add())
    return (
        <g>
            <Solid cam={cam} vertices={vertices} fill={fill} opacity={opacity} hidden={false} />
            {lines.map(([p, q], index) => {
                const [s, t] = [cam.at(p), cam.at(q)]
                return <line key={index} x1={s[0]} y1={s[1]} x2={t[0]} y2={t[1]} stroke={INK} strokeWidth={0.8} strokeOpacity={0.55} />
            })}
            <Solid cam={cam} vertices={vertices} fill="none" opacity={0} hidden={false} />
        </g>
    )
}

/** A segment between two points of space */
export function Segment3({ cam, a, b, color = SECOND, width = 2.6, dashed = false }: { cam: Camera; a: V3; b: V3; color?: string; width?: number; dashed?: boolean }) {
    const [p, q] = [cam.at(a), cam.at(b)]
    return <line x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} stroke={color} strokeWidth={width} strokeDasharray={dashed ? '6 4' : undefined} strokeLinecap="round" />
}

/* ---------- Round bodies ---------- */

interface Ellipse {
    cx: number
    cy: number
    rx: number
    ry: number
}

const ellipseAt = (cam: Camera, y: number, r: number): Ellipse => {
    const [cx, cy] = cam.at([0, y, 0])
    return { cx, cy, rx: cam.scale * r, ry: cam.scale * r * cam.squash }
}

/** Front half (towards the viewer) of a horizontal circle */
const frontArc = ({ cx, cy, rx, ry }: Ellipse) => `M ${cx - rx} ${cy} A ${rx} ${ry} 0 0 0 ${cx + rx} ${cy}`
const backArc = ({ cx, cy, rx, ry }: Ellipse) => `M ${cx - rx} ${cy} A ${rx} ${ry} 0 0 1 ${cx + rx} ${cy}`

/** A horizontal circle: front half solid, back half dashed (or solid when nothing hides it) */
export function Circle3({ cam, y, r, color = INK, width = 2, fill, open = false }: { cam: Camera; y: number; r: number; color?: string; width?: number; fill?: string; open?: boolean }) {
    const e = ellipseAt(cam, y, r)
    return (
        <g>
            {fill && <ellipse cx={e.cx} cy={e.cy} rx={e.rx} ry={e.ry} fill={fill} stroke="none" />}
            <path d={backArc(e)} fill="none" stroke={open ? color : MUTED} strokeWidth={open ? width : 1.3} strokeDasharray={open ? undefined : '5 4'} />
            <path d={frontArc(e)} fill="none" stroke={color} strokeWidth={width} />
        </g>
    )
}

/** Cylinder of radius r and height h standing on y = base */
export function Cylinder({ cam, r, h, base = 0, fill = SKY, top = PAPER, stroke = INK }: { cam: Camera; r: number; h: number; base?: number; fill?: string; top?: string; stroke?: string }) {
    const b = ellipseAt(cam, base, r)
    const t = ellipseAt(cam, base + h, r)
    const body = `M ${t.cx - t.rx} ${t.cy} L ${b.cx - b.rx} ${b.cy} A ${b.rx} ${b.ry} 0 0 0 ${b.cx + b.rx} ${b.cy} L ${t.cx + t.rx} ${t.cy} A ${t.rx} ${t.ry} 0 0 0 ${t.cx - t.rx} ${t.cy} Z`
    return (
        <g>
            <path d={body} fill={fill} fillOpacity={0.9} stroke="none" />
            <path d={backArc(b)} fill="none" stroke={MUTED} strokeWidth={1.3} strokeDasharray="5 4" />
            <path d={frontArc(b)} fill="none" stroke={stroke} strokeWidth={2} />
            <line x1={b.cx - b.rx} y1={b.cy} x2={t.cx - t.rx} y2={t.cy} stroke={stroke} strokeWidth={2} />
            <line x1={b.cx + b.rx} y1={b.cy} x2={t.cx + t.rx} y2={t.cy} stroke={stroke} strokeWidth={2} />
            <ellipse cx={t.cx} cy={t.cy} rx={t.rx} ry={t.ry} fill={top} stroke={stroke} strokeWidth={2} />
        </g>
    )
}

/** Cone of radius r and height h standing on y = base; also a frustum when `rTop` > 0 */
export function Cone({ cam, r, h, rTop = 0, base = 0, fill = SOFT, top = PAPER, stroke = INK }: { cam: Camera; r: number; h: number; rTop?: number; base?: number; fill?: string; top?: string; stroke?: string }) {
    const b = ellipseAt(cam, base, r)
    if (rTop > 0) {
        const t = ellipseAt(cam, base + h, rTop)
        const body = `M ${t.cx - t.rx} ${t.cy} L ${b.cx - b.rx} ${b.cy} A ${b.rx} ${b.ry} 0 0 0 ${b.cx + b.rx} ${b.cy} L ${t.cx + t.rx} ${t.cy} A ${t.rx} ${t.ry} 0 0 0 ${t.cx - t.rx} ${t.cy} Z`
        return (
            <g>
                <path d={body} fill={fill} fillOpacity={0.9} stroke="none" />
                <path d={backArc(b)} fill="none" stroke={MUTED} strokeWidth={1.3} strokeDasharray="5 4" />
                <path d={frontArc(b)} fill="none" stroke={stroke} strokeWidth={2} />
                <line x1={b.cx - b.rx} y1={b.cy} x2={t.cx - t.rx} y2={t.cy} stroke={stroke} strokeWidth={2} />
                <line x1={b.cx + b.rx} y1={b.cy} x2={t.cx + t.rx} y2={t.cy} stroke={stroke} strokeWidth={2} />
                <ellipse cx={t.cx} cy={t.cy} rx={t.rx} ry={t.ry} fill={top} stroke={stroke} strokeWidth={2} />
            </g>
        )
    }
    const apex = cam.at([0, base + h, 0])
    // Tangent points from the apex to the base ellipse: sin t = −ry / (apex height above the centre)
    const above = b.cy - apex[1]
    const s = Math.max(-0.95, Math.min(0, -b.ry / Math.max(above, 1)))
    const c = Math.sqrt(1 - s * s)
    const left: Point = [b.cx - b.rx * c, b.cy + b.ry * s]
    const right: Point = [b.cx + b.rx * c, b.cy + b.ry * s]
    const body = `M ${left[0]} ${left[1]} L ${apex[0]} ${apex[1]} L ${right[0]} ${right[1]} A ${b.rx} ${b.ry} 0 1 1 ${left[0]} ${left[1]} Z`
    return (
        <g>
            <path d={body} fill={fill} fillOpacity={0.9} stroke="none" />
            <path d={`M ${left[0]} ${left[1]} A ${b.rx} ${b.ry} 0 0 1 ${right[0]} ${right[1]}`} fill="none" stroke={MUTED} strokeWidth={1.3} strokeDasharray="5 4" />
            <path d={`M ${right[0]} ${right[1]} A ${b.rx} ${b.ry} 0 1 1 ${left[0]} ${left[1]}`} fill="none" stroke={stroke} strokeWidth={2} />
            <polyline points={points([left, apex, right])} fill="none" stroke={stroke} strokeWidth={2} strokeLinejoin="round" />
        </g>
    )
}

/** Sphere of radius r centred at height y, with its equator */
export function Sphere({ cam, r, y = 0, fill = MINT, stroke = INK, equator = true }: { cam: Camera; r: number; y?: number; fill?: string; stroke?: string; equator?: boolean }) {
    const [cx, cy] = cam.at([0, y, 0])
    const e = ellipseAt(cam, y, r)
    return (
        <g>
            <circle cx={cx} cy={cy} r={cam.scale * r} fill={fill} fillOpacity={0.9} stroke={stroke} strokeWidth={2} />
            {equator && <path d={backArc(e)} fill="none" stroke={MUTED} strokeWidth={1.3} strokeDasharray="5 4" />}
            {equator && <path d={frontArc(e)} fill="none" stroke={stroke} strokeWidth={1.6} />}
        </g>
    )
}
