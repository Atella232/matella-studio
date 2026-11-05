import type { ReactNode } from 'react'
import { Label, PlaneGrid } from '../dbh2-funtzioak-v2/plane'
import { useBoxClip } from '../dbh2-funtzioak-v2/planeClip'
import { planeMap, type PlaneBox, type PlaneMap } from '../dbh2-funtzioak-v2/planeMap'
import { Figure } from '../dbh2-zatikiak-prototype/figures'
import { CARD, INK, MUTED, STAGE, type Point } from './figureColors'

/* ==========================================================================
   Geometria analitikoa · Batxilergoa 1 · Zientziak — the pieces the lesson
   figures are drawn with: the figure frame (with room on top for the y of
   an axis), a small Cartesian plane, arrows, lines Ax + By + C = 0, points,
   right-angle marks and arcs. Formulas sit in their own <text> (left to
   right in every language); words go through <Label>.
   ========================================================================== */

/** The shared figure frame, with a strip on top so the y of a plane's axis is never cut */
export function Fig({ height, label, children }: { height: number; label: string; children: ReactNode }) {
    return (
        <Figure height={height + 14} label={label}>
            <g transform="translate(0 14)">{children}</g>
        </Figure>
    )
}

export function Caption({ y, children, x = 360 }: { y: number; children: ReactNode; x?: number }) {
    return <Label x={x} y={y} textAnchor="middle" fontSize={19} fill={MUTED}>{children}</Label>
}

/** A formula written left to right whatever the language */
export function F({ x, y, children, size = 21, color = INK, anchor = 'start', weight = 700 }: { x: number; y: number; children: ReactNode; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end'; weight?: number }) {
    return <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={weight} fill={color} direction="ltr">{children}</text>
}

/** A small Cartesian plane placed at (ox, oy) inside a figure */
export function Frame({ box, cell, ox, oy, labelStep = 1, children }: { box: PlaneBox; cell: number; ox: number; oy: number; labelStep?: number; children?: (map: PlaneMap, clip: string) => ReactNode }) {
    const map = planeMap(box, cell, ox, oy)
    const [clipPath, clip] = useBoxClip(map)
    return (
        <g>
            <defs>{clipPath}</defs>
            <rect x={ox} y={oy} width={map.width} height={map.height} fill={CARD} />
            <PlaneGrid map={map} labelStep={labelStep} />
            {children?.(map, clip)}
        </g>
    )
}

/** An arrow between two points given in pixels */
export function PixelArrow({ from, to, color = STAGE, width = 3.4, dashed = false }: { from: Point; to: Point; color?: string; width?: number; dashed?: boolean }) {
    const [x1, y1] = from
    const [x2, y2] = to
    const length = Math.hypot(x2 - x1, y2 - y1)
    if (length < 1) return null
    const [ux, uy] = [(x2 - x1) / length, (y2 - y1) / length]
    const head = Math.min(14, length * 0.6)
    const base: Point = [x2 - ux * head, y2 - uy * head]
    const wing = head / 2
    return (
        <g>
            <line x1={x1} y1={y1} x2={base[0]} y2={base[1]} stroke={color} strokeWidth={width} strokeDasharray={dashed ? '7 5' : undefined} strokeLinecap="round" />
            <polygon points={`${x2},${y2} ${base[0] - uy * wing},${base[1] + ux * wing} ${base[0] + uy * wing},${base[1] - ux * wing}`} fill={color} />
        </g>
    )
}

/** An arrow from p to q in plane coordinates, with an optional name near its middle */
export function Arrow({ map, from, to, color = STAGE, width = 3.4, dashed = false, name, dx = 6, dy = -8 }: { map: PlaneMap; from: Point; to: Point; color?: string; width?: number; dashed?: boolean; name?: string; dx?: number; dy?: number }) {
    const a: Point = [map.x(from[0]), map.y(from[1])]
    const b: Point = [map.x(to[0]), map.y(to[1])]
    return (
        <g>
            <PixelArrow from={a} to={b} color={color} width={width} dashed={dashed} />
            {name && <F x={(a[0] + b[0]) / 2 + dx} y={(a[1] + b[1]) / 2 + dy} size={19} color={color}>{name}</F>}
        </g>
    )
}

/** A segment in plane coordinates, dashed or not */
export function Segment({ map, from, to, color = MUTED, width = 2, dashed = true }: { map: PlaneMap; from: Point; to: Point; color?: string; width?: number; dashed?: boolean }) {
    return <line x1={map.x(from[0])} y1={map.y(from[1])} x2={map.x(to[0])} y2={map.y(to[1])} stroke={color} strokeWidth={width} strokeDasharray={dashed ? '6 5' : undefined} strokeLinecap="round" />
}

/** The line Ax + By + C = 0 across the plane, clipped to it */
export function LineDraw({ map, a, b, c, clip, color = STAGE, width = 3, dashed = false }: { map: PlaneMap; a: number; b: number; c: number; clip: string; color?: string; width?: number; dashed?: boolean }) {
    const { xMin, xMax, yMin, yMax } = map.box
    const ends: [Point, Point] = b === 0
        ? [[-c / a, yMin - 2], [-c / a, yMax + 2]]
        : [[xMin - 2, (-a * (xMin - 2) - c) / b], [xMax + 2, (-a * (xMax + 2) - c) / b]]
    return (
        <g clipPath={clip}>
            <line x1={map.x(ends[0][0])} y1={map.y(ends[0][1])} x2={map.x(ends[1][0])} y2={map.y(ends[1][1])} stroke={color} strokeWidth={width} strokeDasharray={dashed ? '8 6' : undefined} />
        </g>
    )
}

/** A dot with a name beside it */
export function Dot({ map, at, name, color = INK, dx = 8, dy = -8, size = 18 }: { map: PlaneMap; at: Point; name?: string; color?: string; dx?: number; dy?: number; size?: number }) {
    return (
        <g>
            <circle cx={map.x(at[0])} cy={map.y(at[1])} r={5} fill={color} stroke={INK} strokeWidth={1} />
            {name && <F x={map.x(at[0]) + dx} y={map.y(at[1]) + dy} size={size} color={color}>{name}</F>}
        </g>
    )
}

/** The small square of a right angle at corner c, between the directions of a and b (plane coordinates) */
export function RightMark({ map, corner, a, b, size = 12 }: { map: PlaneMap; corner: Point; a: Point; b: Point; size?: number }) {
    const unit = (p: Point): Point => {
        const dx = map.x(p[0]) - map.x(corner[0])
        const dy = map.y(p[1]) - map.y(corner[1])
        const length = Math.hypot(dx, dy)
        return [(dx / length) * size, (dy / length) * size]
    }
    const [ax, ay] = unit(a)
    const [bx, by] = unit(b)
    const [cx, cy] = [map.x(corner[0]), map.y(corner[1])]
    return <path d={`M${cx + ax} ${cy + ay} L${cx + ax + bx} ${cy + ay + by} L${cx + bx} ${cy + by}`} fill="none" stroke={INK} strokeWidth={1.8} />
}

/** An arc of radius r (pixels) around c (pixels) from the direction of angle a1 to a2 (degrees, counter-clockwise on screen) */
export function Arc({ c, r, a1, a2, color = INK }: { c: Point; r: number; a1: number; a2: number; color?: string }) {
    const point = (angle: number): Point => [c[0] + r * Math.cos((angle * Math.PI) / 180), c[1] - r * Math.sin((angle * Math.PI) / 180)]
    const [x1, y1] = point(a1)
    const [x2, y2] = point(a2)
    const large = Math.abs(a2 - a1) > 180 ? 1 : 0
    const sweep = a2 > a1 ? 0 : 1
    return <path d={`M${x1} ${y1} A${r} ${r} 0 ${large} ${sweep} ${x2} ${y2}`} fill="none" stroke={color} strokeWidth={2.2} />
}
