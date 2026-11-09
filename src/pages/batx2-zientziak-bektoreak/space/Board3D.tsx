import { useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from 'react'
import { pickText, type UnitLanguage } from '../../../features/unit-v2/types'
import { clampView, clipLine, clipPlane, DEFAULT_VIEW, makeCamera, type Camera, type Projected, type View } from './camera'
import { SPACE, type SceneItem } from './scene'
import { add, cross, dot, norm, scale, sub, type Vec3 } from './vec3'
import './Board3D.css'

/* ==========================================================================
   The 3D board of the Espacio block: the x, y and z axes in perspective
   with a floor grid, and on them points, vectors, lines, planes,
   parallelograms and boxes. It turns when you drag it ('drag', for the
   laboratory and the games) or when you swipe sideways ('swipe', for the
   lessons, so the page still scrolls up and down); the arrow keys and the
   buttons underneath turn it too. Everything is drawn from far to near,
   and the hidden edges of a box are dashed. Text in the drawing is only
   letters and numbers, left to right in every language. A drag never
   counts as a click, so a lesson does not open its enlarged drawing
   after you turn the board.
   ========================================================================== */

const WIDTH = 360

type Pixel = [number, number]

interface Face {
    depth: number
    points: Pixel[]
    fill: string
    opacity: number
    stroke?: string
    key: string
}

interface Stroke {
    depth: number
    from: Pixel
    to: Pixel
    color: string
    width: number
    dashed: boolean
    arrow: boolean
    key: string
}

const px = (p: Projected): Pixel => [p.x, p.y]
const average = (values: number[]) => values.reduce((sum, value) => sum + value, 0) / Math.max(1, values.length)

/** The name of a vector with a small arrow over it (one letter), or plain text */
function Name({ at, text, color, size = 17, arrow = false }: { at: Pixel; text: string; color: string; size?: number; arrow?: boolean }) {
    const [x, y] = at
    const half = size * 0.34
    return (
        <g>
            <text x={x} y={y} textAnchor="middle" fontSize={size} fontWeight={700} fontStyle={arrow ? 'italic' : undefined} fill={color} stroke={SPACE.card} strokeWidth={4} paintOrder="stroke" direction="ltr">{text}</text>
            {arrow && (
                <g stroke={color} strokeWidth={1.6} fill="none" strokeLinecap="round">
                    <line x1={x - half} y1={y - size * 0.86} x2={x + half} y2={y - size * 0.86} />
                    <polyline points={`${x + half - 3.5},${y - size * 0.86 - 2.6} ${x + half},${y - size * 0.86} ${x + half - 3.5},${y - size * 0.86 + 2.6}`} />
                </g>
            )}
        </g>
    )
}

function ArrowHead({ from, to, color, size = 12 }: { from: Pixel; to: Pixel; color: string; size?: number }) {
    const length = Math.hypot(to[0] - from[0], to[1] - from[1])
    if (length < 1) return <circle cx={to[0]} cy={to[1]} r={4} fill={color} />
    const [ux, uy] = [(to[0] - from[0]) / length, (to[1] - from[1]) / length]
    const head = Math.min(size, length * 0.6)
    const wing = head * 0.45
    const base: Pixel = [to[0] - ux * head, to[1] - uy * head]
    return <polygon points={`${to[0]},${to[1]} ${base[0] - uy * wing},${base[1] + ux * wing} ${base[0] + uy * wing},${base[1] - ux * wing}`} fill={color} />
}

/** Where to write the name of something drawn from a to b: beside its middle, on the upper side */
function beside(a: Pixel, b: Pixel, gap = 13, at = 0.55): Pixel {
    const [mx, my] = [a[0] + (b[0] - a[0]) * at, a[1] + (b[1] - a[1]) * at]
    const length = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1
    let [nx, ny] = [-(b[1] - a[1]) / length, (b[0] - a[0]) / length]
    if (ny > 0 || (Math.abs(ny) < 0.2 && nx > 0)) [nx, ny] = [-nx, -ny]
    return [mx + nx * gap, my + ny * gap + 5]
}

/** The faces and strokes a scene item turns into, plus the dots and names drawn on top */
function build(scene: SceneItem[], camera: Camera, range: number) {
    const faces: Face[] = []
    const strokes: Stroke[] = []
    const dots: Array<{ depth: number; at: Pixel; color: string; hollow: boolean; key: string }> = []
    const names: Array<{ at: Pixel; text: string; color: string; arrow: boolean; size?: number; key: string }> = []
    const eyePoint = scale(range * 10, camera.eye)
    const p = camera.project
    const segment = (from: Vec3, to: Vec3, color: string, width: number, dashed: boolean, arrow: boolean, key: string) => {
        const a = p(from)
        const b = p(to)
        strokes.push({ depth: (a.depth + b.depth) / 2, from: px(a), to: px(b), color, width, dashed, arrow, key })
    }
    const polygon = (points: Vec3[], fill: string, opacity: number, stroke: string | undefined, key: string) => {
        const projected = points.map(p)
        faces.push({ depth: average(projected.map((point) => point.depth)), points: projected.map(px), fill, opacity, stroke, key })
    }

    scene.forEach((item, index) => {
        const key = `${item.kind}-${index}`
        switch (item.kind) {
            case 'point': {
                const color = item.color ?? SPACE.ink
                const [x, y, z] = item.at
                if (item.drop && Math.abs(z) > 1e-9) segment(item.at, [x, y, 0], color, 1.4, true, false, `${key}-drop`)
                if (item.drop === 'box') {
                    if (Math.abs(y) > 1e-9) segment([x, y, 0], [x, 0, 0], SPACE.muted, 1.2, true, false, `${key}-bx`)
                    if (Math.abs(x) > 1e-9) segment([x, y, 0], [0, y, 0], SPACE.muted, 1.2, true, false, `${key}-by`)
                }
                const at = p(item.at)
                dots.push({ depth: at.depth, at: px(at), color, hollow: item.hollow ?? false, key })
                if (item.label) names.push({ at: [at.x + 12, at.y - 9], text: item.label, color, arrow: false, key: `${key}-name` })
                break
            }
            case 'vector': {
                const from = item.from ?? [0, 0, 0]
                const color = item.color ?? SPACE.blue
                segment(from, item.to, color, item.width ?? 3.2, item.dashed ?? false, true, key)
                if (item.label) names.push({ at: beside(px(p(from)), px(p(item.to))), text: item.label, color, arrow: item.label.length === 1, key: `${key}-name` })
                break
            }
            case 'segment':
                segment(item.from, item.to, item.color ?? SPACE.ink, item.width ?? 2, item.dashed ?? false, false, key)
                break
            case 'line': {
                const cut = clipLine(item.point, item.direction, range)
                if (!cut) break
                const color = item.color ?? SPACE.violet
                segment(cut[0], cut[1], color, item.width ?? 2.4, item.dashed ?? false, false, key)
                if (item.label) names.push({ at: beside(px(p(cut[0])), px(p(cut[1])), 13, 0.86), text: item.label, color, arrow: false, key: `${key}-name` })
                break
            }
            case 'plane': {
                const corners = clipPlane(item.point, item.normal, range * 0.92)
                if (!corners.length) break
                const color = item.color ?? SPACE.planeBlue
                polygon(corners, color, item.opacity ?? 0.34, color, key)
                if (item.label) {
                    const high = corners.map(p).reduce((best, corner) => (corner.y < best.y ? corner : best))
                    names.push({ at: [high.x, high.y + 22], text: item.label, color: SPACE.ink, arrow: false, key: `${key}-name` })
                }
                break
            }
            case 'polygon':
                polygon(item.points, item.color ?? SPACE.planeBlue, item.opacity ?? 0.38, item.stroke, key)
                break
            case 'box': {
                const [a, b, c] = item.edges
                const corner = (i: number): Vec3 => add(add(add(item.origin, scale(i & 1, a)), scale((i >> 1) & 1, b)), scale((i >> 2) & 1, c))
                const vertices = Array.from({ length: 8 }, (_, i) => corner(i))
                const centre = scale(1 / 8, vertices.reduce((sum, vertex) => add(sum, vertex), [0, 0, 0] as Vec3))
                const quads = [[0, 2, 6, 4], [1, 3, 7, 5], [0, 1, 5, 4], [2, 3, 7, 6], [0, 1, 3, 2], [4, 5, 7, 6]]
                const flat = norm(cross(a, b)) < 1e-9 || Math.abs(dot(cross(a, b), c)) < 1e-9
                const facing = quads.map((quad) => {
                    if (flat) return true
                    const middle = scale(1 / 4, quad.reduce((sum, i) => add(sum, vertices[i]), [0, 0, 0] as Vec3))
                    let normal = cross(sub(vertices[quad[1]], vertices[quad[0]]), sub(vertices[quad[3]], vertices[quad[0]]))
                    if (dot(normal, sub(middle, centre)) < 0) normal = scale(-1, normal)
                    return dot(normal, sub(eyePoint, middle)) > 0
                })
                const color = item.color ?? SPACE.planeGreen
                quads.forEach((quad, i) => polygon(quad.map((v) => vertices[v]), color, item.opacity ?? 0.16, undefined, `${key}-f${i}`))
                const seen = new Set<string>()
                quads.forEach((quad) => quad.forEach((v, i) => {
                    const w = quad[(i + 1) % 4]
                    const edge = v < w ? `${v}-${w}` : `${w}-${v}`
                    if (seen.has(edge)) return
                    seen.add(edge)
                    const visible = quads.some((other, j) => facing[j] && other.includes(v) && other.includes(w))
                    segment(vertices[v], vertices[w], item.stroke ?? SPACE.green, visible ? 2.2 : 1.4, !visible, false, `${key}-e${edge}`)
                }))
                break
            }
            case 'label': {
                const at = p(item.at)
                names.push({ at: [at.x + (item.dx ?? 0), at.y + (item.dy ?? 0)], text: item.text, color: item.color ?? SPACE.ink, arrow: false, size: item.size, key })
                break
            }
            case 'right-angle': {
                const size = item.size ?? range * 0.12
                const u = scale(size / norm(item.u), item.u)
                const v = scale(size / norm(item.v), item.v)
                const color = item.color ?? SPACE.ink
                segment(add(item.at, u), add(add(item.at, u), v), color, 1.6, false, false, `${key}-a`)
                segment(add(add(item.at, u), v), add(item.at, v), color, 1.6, false, false, `${key}-b`)
                break
            }
            case 'arc': {
                const radius = item.radius ?? range * 0.22
                const u = scale(1 / norm(item.u), item.u)
                // The part of v perpendicular to u, so the arc stays in the plane of the two vectors
                const vPart = sub(item.v, scale(dot(item.v, u), u))
                const w = norm(vPart) < 1e-9 ? u : scale(1 / norm(vPart), vPart)
                const angle = Math.acos(Math.max(-1, Math.min(1, dot(u, item.v) / norm(item.v))))
                const steps = 16
                const color = item.color ?? SPACE.mustard
                const arcPoint = (t: number) => add(item.at, scale(radius, add(scale(Math.cos(t), u), scale(Math.sin(t), w))))
                for (let step = 0; step < steps; step++) segment(arcPoint((angle * step) / steps), arcPoint((angle * (step + 1)) / steps), color, 2.2, false, false, `${key}-${step}`)
                if (item.label) {
                    const middle = p(add(item.at, scale(radius * 1.55, add(scale(Math.cos(angle / 2), u), scale(Math.sin(angle / 2), w)))))
                    names.push({ at: [middle.x, middle.y + 5], text: item.label, color, arrow: false, size: 15, key: `${key}-name` })
                }
                break
            }
        }
    })
    return { faces, strokes, dots, names }
}

export interface Board3DProps {
    scene: SceneItem[]
    language: UnitLanguage
    /** What the drawing shows, for screen readers */
    label: string
    /** Half the side of the box that the drawing shows */
    range?: number
    height?: number
    /** 'drag' turns both ways (laboratory, games); 'swipe' only sideways, so the page still scrolls (lessons) */
    rotate?: 'drag' | 'swipe' | 'none'
    initialView?: View
    floor?: boolean
    /** The numbers on the positive half of each axis, every `labelStep` units (0 for none) */
    labelStep?: number
    axisNames?: readonly [string, string, string]
    /** Something drawn on top with the board's camera (a game's marks, a highlight) */
    overlay?: (camera: Camera) => ReactNode
}

export function Board3D({ scene, language, label, range = 5, height = 300, rotate = 'drag', initialView = DEFAULT_VIEW, floor = true, labelStep, axisNames = ['x', 'y', 'z'], overlay }: Board3DProps) {
    const [view, setView] = useState<View>(initialView)
    const drag = useRef<{ x: number; y: number; id: number } | null>(null)
    const moved = useRef(false)
    const camera = makeCamera(view, range, WIDTH, height, { x: WIDTH / 2, y: height / 2 })
    const p = camera.project
    const step = labelStep ?? (range <= 4 ? 1 : 2)
    const l = (text: { eu: string; es: string; en: string; ar: string }) => pickText(language, text)

    const turn = (azimuth: number, elevation = 0) => setView((current) => clampView({ azimuth: current.azimuth + azimuth, elevation: current.elevation + elevation }))

    const onPointerDown = (event: PointerEvent<SVGSVGElement>) => {
        if (rotate === 'none') return
        drag.current = { x: event.clientX, y: event.clientY, id: event.pointerId }
        moved.current = false
        event.currentTarget.setPointerCapture?.(event.pointerId)
    }
    const onPointerMove = (event: PointerEvent<SVGSVGElement>) => {
        const start = drag.current
        if (!start || start.id !== event.pointerId) return
        const dx = event.clientX - start.x
        const dy = event.clientY - start.y
        if (Math.abs(dx) + Math.abs(dy) > 3) moved.current = true
        drag.current = { ...start, x: event.clientX, y: event.clientY }
        turn(-dx * 0.6, rotate === 'drag' ? dy * 0.45 : 0)
    }
    const onPointerEnd = () => {
        drag.current = null
    }
    const onKeyDown = (event: KeyboardEvent<SVGSVGElement>) => {
        if (rotate === 'none') return
        const keys: Record<string, [number, number]> = { ArrowLeft: [-12, 0], ArrowRight: [12, 0], ArrowUp: [0, rotate === 'drag' ? 8 : 0], ArrowDown: [0, rotate === 'drag' ? -8 : 0] }
        const change = keys[event.key]
        if (change) {
            event.preventDefault()
            turn(change[0], change[1])
        } else if (event.key === 'Home') {
            event.preventDefault()
            setView(initialView)
        }
    }

    const { faces, strokes, dots, names } = build(scene, camera, range)

    // The floor grid and the three axes, under everything else
    const grid: ReactNode[] = []
    if (floor) {
        for (let k = -range; k <= range; k++) {
            grid.push(<line key={`gx${k}`} x1={p([k, -range, 0]).x} y1={p([k, -range, 0]).y} x2={p([k, range, 0]).x} y2={p([k, range, 0]).y} stroke={SPACE.floor} strokeWidth={1} />)
            grid.push(<line key={`gy${k}`} x1={p([-range, k, 0]).x} y1={p([-range, k, 0]).y} x2={p([range, k, 0]).x} y2={p([range, k, 0]).y} stroke={SPACE.floor} strokeWidth={1} />)
        }
    }
    const axes = ([0, 1, 2] as const).map((axis) => {
        const direction: Vec3 = [axis === 0 ? 1 : 0, axis === 1 ? 1 : 0, axis === 2 ? 1 : 0]
        const negative = px(p(scale(-range, direction)))
        const origin = px(p([0, 0, 0]))
        const tip = px(p(scale(range * 1.18, direction)))
        const length = Math.hypot(tip[0] - origin[0], tip[1] - origin[1]) || 1
        const [ux, uy] = [(tip[0] - origin[0]) / length, (tip[1] - origin[1]) / length]
        // Numbers beside the ticks, below the x and y axes and to the left of z
        let [nx, ny] = [-uy, ux]
        if (axis === 2 ? nx > 0 : ny < 0) [nx, ny] = [-nx, -ny]
        const ticks: ReactNode[] = []
        for (let k = 1; k <= range; k++) {
            const at = px(p(scale(k, direction)))
            ticks.push(<line key={`t${k}`} x1={at[0] - nx * 3.5} y1={at[1] - ny * 3.5} x2={at[0] + nx * 3.5} y2={at[1] + ny * 3.5} stroke={SPACE.axis} strokeWidth={1.4} />)
            if (step > 0 && k % step === 0 && length > 40) {
                ticks.push(<text key={`n${k}`} x={at[0] + nx * 13} y={at[1] + ny * 13 + 4.5} textAnchor="middle" fontSize={12.5} fill={SPACE.muted} direction="ltr">{k}</text>)
            }
        }
        return (
            <g key={`axis${axis}`}>
                <line x1={negative[0]} y1={negative[1]} x2={origin[0]} y2={origin[1]} stroke={SPACE.axis} strokeWidth={1.3} opacity={0.45} />
                <line x1={origin[0]} y1={origin[1]} x2={tip[0]} y2={tip[1]} stroke={SPACE.axis} strokeWidth={1.8} />
                <ArrowHead from={origin} to={tip} color={SPACE.axis} size={10} />
                {ticks}
                <text x={tip[0] + ux * 13} y={tip[1] + uy * 13 + 5.5} textAnchor="middle" fontSize={16} fontWeight={700} fontStyle="italic" fill={SPACE.axis} direction="ltr">{axisNames[axis]}</text>
            </g>
        )
    })

    const hint = rotate === 'drag'
        ? l({ eu: 'Arrastatu biratzeko', es: 'Arrastra para girar', en: 'Drag to turn', ar: 'اسحب للتدوير' })
        : l({ eu: 'Irristatu alboetara biratzeko', es: 'Desliza de lado para girar', en: 'Swipe sideways to turn', ar: 'اسحب جانبيًا للتدوير' })

    return (
        <div className="space-board" onClickCapture={(event) => { if (moved.current) { event.stopPropagation(); moved.current = false } }}>
            <svg
                className={`space-board-svg ${rotate === 'none' ? '' : `space-board-${rotate}`}`}
                viewBox={`0 0 ${WIDTH} ${height}`}
                role="img"
                aria-label={label}
                tabIndex={rotate === 'none' ? undefined : 0}
                direction="ltr"
                style={{ width: '100%', maxWidth: 460, height: 'auto' }}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerEnd}
                onPointerCancel={onPointerEnd}
                onKeyDown={onKeyDown}
            >
                <rect width={WIDTH} height={height} fill="transparent" />
                <g>{grid}</g>
                {[...faces].sort((a, b) => a.depth - b.depth).map((face) => (
                    <polygon key={face.key} points={face.points.map((point) => point.join(',')).join(' ')} fill={face.fill} fillOpacity={face.opacity} stroke={face.stroke} strokeOpacity={face.stroke ? 0.9 : undefined} strokeWidth={face.stroke ? 1.4 : undefined} strokeLinejoin="round" />
                ))}
                {axes}
                {[...strokes].sort((a, b) => a.depth - b.depth).map((stroke) => {
                    const length = Math.hypot(stroke.to[0] - stroke.from[0], stroke.to[1] - stroke.from[1])
                    // An arrow's shaft stops at the base of its head
                    const cut = stroke.arrow && length > 1 ? Math.min(9, length * 0.5) / length : 0
                    const end: Pixel = [stroke.to[0] - (stroke.to[0] - stroke.from[0]) * cut, stroke.to[1] - (stroke.to[1] - stroke.from[1]) * cut]
                    return (
                        <g key={stroke.key}>
                            <line x1={stroke.from[0]} y1={stroke.from[1]} x2={end[0]} y2={end[1]} stroke={stroke.color} strokeWidth={stroke.width} strokeDasharray={stroke.dashed ? '5 4' : undefined} strokeLinecap={stroke.dashed ? 'butt' : 'round'} />
                            {stroke.arrow && <ArrowHead from={stroke.from} to={stroke.to} color={stroke.color} size={13} />}
                        </g>
                    )
                })}
                {[...dots].sort((a, b) => a.depth - b.depth).map((dot) => (
                    <circle key={dot.key} cx={dot.at[0]} cy={dot.at[1]} r={5} fill={dot.hollow ? SPACE.card : dot.color} stroke={dot.hollow ? dot.color : SPACE.card} strokeWidth={dot.hollow ? 2.4 : 1.8} />
                ))}
                {names.map((name) => <Name key={name.key} at={name.at} text={name.text} color={name.color} arrow={name.arrow} size={name.size} />)}
                {overlay?.(camera)}
            </svg>
            {rotate !== 'none' && (
                <div className="space-board-tools">
                    <button type="button" onClick={() => turn(-20)} aria-label={l({ eu: 'Biratu ezkerrera', es: 'Girar a la izquierda', en: 'Turn left', ar: 'دوّر إلى اليسار' })}>↺</button>
                    <span>{hint}</span>
                    <button type="button" onClick={() => turn(20)} aria-label={l({ eu: 'Biratu eskuinera', es: 'Girar a la derecha', en: 'Turn right', ar: 'دوّر إلى اليمين' })}>↻</button>
                    <button type="button" className="space-board-reset" onClick={() => setView(initialView)}>{l({ eu: 'Hasierako ikuspegia', es: 'Vista inicial', en: 'Starting view', ar: 'العرض الأول' })}</button>
                </div>
            )}
        </div>
    )
}
