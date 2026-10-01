import { type MouseEvent, type ReactNode, type SVGProps } from 'react'
import type { Point } from './functions'
import { useBoxClip } from './planeClip'
import { minusSign, planeMap, type PlaneBox, type PlaneMap } from './planeMap'

/* ==========================================================================
   Funtzioak (2. DBH) — the Cartesian plane drawn in the notebook style.
   `PlaneGrid` is a group of SVG shapes (so a lesson figure can place it
   anywhere); `Plane` wraps it in its own <svg> for exercises, the lab and
   the games. Children draw in plane coordinates through the map's x() and y().
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const GRID = 'var(--line, #d6cfc2)'
const STAGE = 'var(--stage, #2f6fdb)'
const SECOND = 'var(--second, #c4432a)'
const CARD = 'var(--card, #fffcf6)'

const ARABIC = /[؀-ۿ]/
/** A run of Latin letters, digits and math signs that starts and ends with a letter, digit, bracket or exponent */
const FORMULA = /^\d+\.(?= )|[A-Za-z0-9(|−-][A-Za-z0-9()|=+−\-·:,. ²₁₂°×<>/]*[A-Za-z0-9)|²₁₂°]|[A-Za-z0-9]/g
const flipped = { start: 'end', end: 'start', middle: 'middle' } as const

function plainText(node: ReactNode): string {
    if (typeof node === 'string' || typeof node === 'number') return String(node)
    if (Array.isArray(node)) return node.map(plainText).join('')
    return ''
}

/**
 * SVG text that reads right to left when it holds Arabic. The figures are laid
 * out left to right, so the anchor is flipped too: the label keeps its place
 * and only the order of its words changes.
 */
export function Label({ textAnchor = 'start', children, ...props }: SVGProps<SVGTextElement>) {
    const rtl = ARABIC.test(plainText(children))
    const anchor = textAnchor as keyof typeof flipped
    // Inside Arabic, "x = 1" or "(0, 2)" would come out reversed: isolate each formula left to right
    const content = rtl && typeof children === 'string' ? children.replace(FORMULA, '⁦$&⁩') : children
    return <text {...props} textAnchor={rtl ? flipped[anchor] ?? anchor : anchor} direction={rtl ? 'rtl' : undefined}>{content}</text>
}

/** Grid, axes with arrowheads and numbers on the ticks */
export function PlaneGrid({ map, labelStep = 1, labels = true, grid = true, xName = 'x', yName = 'y', xUnit = 1, yUnit = 1, fontSize }: {
    map: PlaneMap
    labelStep?: number
    labels?: boolean
    grid?: boolean
    xName?: string
    yName?: string
    /** What one grid square is worth on each axis (the tick numbers are multiplied by it) */
    xUnit?: number
    yUnit?: number
    fontSize?: number
}) {
    const { box, cell } = map
    const size = fontSize ?? Math.max(12, Math.min(15, cell * 0.5))
    const xs = Array.from({ length: box.xMax - box.xMin + 1 }, (_, index) => box.xMin + index)
    const ys = Array.from({ length: box.yMax - box.yMin + 1 }, (_, index) => box.yMin + index)
    // The axes cross at the origin when it is inside the box, otherwise they stay on the border
    const axisY = Math.min(box.yMax, Math.max(box.yMin, 0))
    const axisX = Math.min(box.xMax, Math.max(box.xMin, 0))
    const ay = map.y(axisY)
    const ax = map.x(axisX)
    const arrow = Math.max(5, cell * 0.22)
    const step = (value: number) => value % labelStep === 0
    // With the origin inside the box the 0 would touch the −1 of the Y axis on a tight grid
    const originInside = box.xMin < 0 && box.yMin < 0
    const showZero = axisX === 0 && axisY === 0 && (!originInside || cell >= size * 2.2)
    return (
        <g>
            {grid && xs.map((x) => <line key={`gx${x}`} x1={map.x(x)} y1={map.y(box.yMin)} x2={map.x(x)} y2={map.y(box.yMax)} stroke={GRID} strokeWidth={1} />)}
            {grid && ys.map((y) => <line key={`gy${y}`} x1={map.x(box.xMin)} y1={map.y(y)} x2={map.x(box.xMax)} y2={map.y(y)} stroke={GRID} strokeWidth={1} />)}
            <line x1={map.x(box.xMin)} y1={ay} x2={map.x(box.xMax) + arrow} y2={ay} stroke={INK} strokeWidth={2.2} />
            <line x1={ax} y1={map.y(box.yMin)} x2={ax} y2={map.y(box.yMax) - arrow} stroke={INK} strokeWidth={2.2} />
            <path d={`M${map.x(box.xMax) + arrow + 5} ${ay} l${-arrow - 1} ${-arrow * 0.55} v${arrow * 1.1} z M${ax} ${map.y(box.yMax) - arrow - 5} l${-arrow * 0.55} ${arrow + 1} h${arrow * 1.1} z`} fill={INK} />
            <text x={map.x(box.xMax) + arrow + 9} y={ay + size * 0.35} fontSize={size + 2} fontWeight={700} fontStyle="italic" fill={INK}>{xName}</text>
            <text x={ax + 7} y={map.y(box.yMax) - arrow - 7} fontSize={size + 2} fontWeight={700} fontStyle="italic" fill={INK}>{yName}</text>
            {labels && xs.filter((x) => x !== 0 && step(x)).map((x) => (
                <text key={`lx${x}`} x={map.x(x)} y={ay + size + 4} textAnchor="middle" fontSize={size} fill={MUTED}>{minusSign(x * xUnit)}</text>
            ))}
            {labels && ys.filter((y) => y !== 0 && step(y)).map((y) => (
                <text key={`ly${y}`} x={ax - 6} y={map.y(y) + size * 0.35} textAnchor="end" fontSize={size} fill={MUTED}>{minusSign(y * yUnit)}</text>
            ))}
            {labels && showZero && <text x={ax - 6} y={ay + size + 4} textAnchor="end" fontSize={size} fill={MUTED}>0</text>}
        </g>
    )
}

/** What a magnitude measures, written beside the end of its axis */
export function AxisTitles({ map, xTitle, yTitle, fontSize = 14 }: { map: PlaneMap; xTitle?: string; yTitle?: string; fontSize?: number }) {
    const { box } = map
    const ax = map.x(Math.min(box.xMax, Math.max(box.xMin, 0)))
    const arrow = Math.max(5, map.cell * 0.22)
    return (
        <g fontSize={fontSize} fill={MUTED} fontWeight={700}>
            {yTitle && <Label x={ax + 26} y={map.y(box.yMax) - arrow - 8}>{yTitle}</Label>}
            {xTitle && <Label x={map.x(box.xMax)} y={map.y(box.yMin) + fontSize + 24} textAnchor="end">{xTitle}</Label>}
        </g>
    )
}

/** A dot with an optional name beside it */
export function PlanePoint({ map, point, color = SECOND, name, radius, dx = 8, dy = -8, anchor = 'start', fontSize = 15, hollow = false }: {
    map: PlaneMap
    point: Point
    color?: string
    name?: string
    radius?: number
    dx?: number
    dy?: number
    anchor?: 'start' | 'middle' | 'end'
    fontSize?: number
    /** An open circle: the end of a stretch that does not include that point */
    hollow?: boolean
}) {
    const cx = map.x(point[0])
    const cy = map.y(point[1])
    return (
        <g>
            <circle cx={cx} cy={cy} r={radius ?? Math.max(4.5, map.cell * 0.2)} fill={hollow ? CARD : color} stroke={hollow ? color : CARD} strokeWidth={hollow ? 2.6 : 2} />
            {name && <Label x={cx + dx} y={cy + dy} textAnchor={anchor} fontSize={fontSize} fontWeight={700} fill={color} paintOrder="stroke" stroke={CARD} strokeWidth={4} strokeLinejoin="round">{name}</Label>}
        </g>
    )
}

/** Open polyline through the given points, in plane coordinates */
export function PlanePath({ map, points, color = STAGE, width = 3.5, dashed = false, clip }: {
    map: PlaneMap
    points: readonly Point[]
    color?: string
    width?: number
    dashed?: boolean
    clip?: string
}) {
    return <polyline points={points.map(([x, y]) => `${map.x(x)},${map.y(y)}`).join(' ')} fill="none" stroke={color} strokeWidth={width} strokeLinejoin="round" strokeLinecap="round" strokeDasharray={dashed ? '7 6' : undefined} clipPath={clip} />
}

/** The line y = mx + n across the whole box (clipped by the caller's clipPath) */
export function PlaneLine({ map, m, n, color = STAGE, width = 3.5, dashed = false, clip }: {
    map: PlaneMap
    m: number
    n: number
    color?: string
    width?: number
    dashed?: boolean
    clip?: string
}) {
    const { box } = map
    return <PlanePath map={map} points={[[box.xMin - 1, m * (box.xMin - 1) + n], [box.xMax + 1, m * (box.xMax + 1) + n]]} color={color} width={width} dashed={dashed} clip={clip} />
}

/** Dashed guides from a point to both axes */
export function PlaneGuides({ map, point, color = SECOND }: { map: PlaneMap; point: Point; color?: string }) {
    const ay = map.y(Math.min(map.box.yMax, Math.max(map.box.yMin, 0)))
    const ax = map.x(Math.min(map.box.xMax, Math.max(map.box.xMin, 0)))
    return (
        <g stroke={color} strokeWidth={1.8} strokeDasharray="5 4" fill="none">
            <line x1={map.x(point[0])} y1={map.y(point[1])} x2={map.x(point[0])} y2={ay} />
            <line x1={map.x(point[0])} y1={map.y(point[1])} x2={ax} y2={map.y(point[1])} />
        </g>
    )
}

/** The plane as a standalone <svg>; a click or tap reports the nearest whole point */
export function Plane({ box, cell = 30, label, labelStep = 1, labels = true, grid = true, xName, yName, xUnit, yUnit, xTitle, yTitle, maxHeight, className = 'functions-plane', onPick, children }: {
    box: PlaneBox
    cell?: number
    label: string
    labelStep?: number
    labels?: boolean
    grid?: boolean
    xName?: string
    yName?: string
    xUnit?: number
    yUnit?: number
    /** What each axis measures, e.g. "time (h)" */
    xTitle?: string
    yTitle?: string
    /** Largest height on screen, in px: a tall plane is drawn narrower */
    maxHeight?: number
    className?: string
    onPick?: (point: Point) => void
    /** Receives the map and the id of a clipPath that keeps lines inside the box */
    children: (map: PlaneMap, clip: string) => ReactNode
}) {
    const padLeft = labels ? 34 + (yUnit && yUnit >= 10 ? 10 : 0) : 14
    const padRight = 30
    const padTop = 30
    const padBottom = (labels ? 26 : 14) + (xTitle ? 24 : 0)
    const map = planeMap(box, cell, padLeft, padTop)
    const width = map.width + padLeft + padRight
    const height = map.height + padTop + padBottom
    const [clipPath, clip] = useBoxClip(map)
    const pick = (event: MouseEvent<SVGSVGElement>) => {
        if (!onPick) return
        const rect = event.currentTarget.getBoundingClientRect()
        const px = ((event.clientX - rect.left) / rect.width) * width
        const py = ((event.clientY - rect.top) / rect.height) * height
        const x = Math.round((px - padLeft) / cell + box.xMin)
        const y = Math.round(box.yMax - (py - padTop) / cell)
        onPick([Math.min(box.xMax, Math.max(box.xMin, x)), Math.min(box.yMax, Math.max(box.yMin, y))])
    }
    return (
        <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={label} className={className} onClick={onPick ? pick : undefined} style={{ maxWidth: Math.round(Math.min(540, width * 1.3, maxHeight ? (maxHeight * width) / height : Infinity)), ...(onPick ? { cursor: 'crosshair', touchAction: 'manipulation' } : {}) }}>
            <defs>{clipPath}</defs>
            <rect x={padLeft} y={padTop} width={map.width} height={map.height} fill={CARD} />
            <PlaneGrid map={map} labelStep={labelStep} labels={labels} grid={grid} xName={xName} yName={yName} xUnit={xUnit} yUnit={yUnit} />
            <AxisTitles map={map} xTitle={xTitle} yTitle={yTitle} />
            {children(map, clip)}
        </svg>
    )
}
