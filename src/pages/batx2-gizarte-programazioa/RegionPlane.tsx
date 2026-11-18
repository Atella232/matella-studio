import type { ReactNode } from 'react'
import { Plane, PlanePath, PlanePoint } from '../dbh2-funtzioak-v2/plane'
import type { PlaneMap } from '../dbh2-funtzioak-v2/planeMap'
import { region } from '../dbh4-akademikoak-sistemak/systems'
import { withSigns, type HalfPlane, type Objective, type Point } from './lp'

/* ==========================================================================
   Programazio lineala · Batxilergoa 2 — the feasible region on a plane:
   the shaded polygon of the constraints (x ≥ 0 and y ≥ 0 included), the
   boundary lines, the vertices with their names, an objective line
   F(x, y) = k and the whole-number points. Coordinates are divided by
   `unit`, so a region up to 100 fits on a grid of 10. Used by the figures
   of the lessons and by the lab. This file only exports components.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const STAGE = 'var(--stage, #2f6fdb)'
const SECOND = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const REGION = 'rgba(38, 123, 83, 0.2)'

export interface RegionPlaneProps {
    label: string
    constraints: HalfPlane[]
    /** The size of the box, in the units of the problem */
    size: number
    unit?: number
    /** Vertices to mark, with their names (A, B…) */
    vertices?: Array<{ point: Point; name?: string; best?: boolean }>
    /** The objective line F(x, y) = k */
    level?: { objective: Objective; k: number; color?: string }
    integers?: Point[]
    xName?: string
    yName?: string
    cell?: number
    onPick?: (point: Point) => void
    children?: (map: PlaneMap, clip: string, scale: (point: Point) => Point) => ReactNode
}

/** The two ends of the line ax + by = c inside a large box, in problem units */
function lineEnds({ a, b, c }: { a: number; b: number; c: number }, size: number): [Point, Point] | null {
    if (a === 0 && b === 0) return null
    const far = size * 3
    if (b !== 0) return [[-far, (c + a * far) / b], [far, (c - a * far) / b]]
    return [[c / a, -far], [c / a, far]]
}

export function RegionPlane({ label, constraints, size, unit = 1, vertices = [], level, integers = [], xName = 'x', yName = 'y', cell = 28, onPick, children }: RegionPlaneProps) {
    const cells = Math.ceil(size / unit)
    const box = { xMin: 0, xMax: cells, yMin: 0, yMax: cells }
    const scale = ([x, y]: Point): Point => [x / unit, y / unit]
    const polygon = region({ xMin: 0, xMax: size, yMin: 0, yMax: size }, withSigns(constraints)).map(scale)
    return (
        <Plane box={box} cell={cell} label={label} labelStep={cells > 10 ? 2 : 1} xUnit={unit} yUnit={unit} xName={xName} yName={yName} onPick={onPick ? ([x, y]) => onPick([x * unit, y * unit]) : undefined}>
            {(map, clip) => (
                <g>
                    {polygon.length > 2 && <polygon points={polygon.map(([x, y]) => `${map.x(x)},${map.y(y)}`).join(' ')} fill={REGION} stroke={GREEN} strokeWidth={1.5} />}
                    {constraints.map((h, index) => {
                        const ends = lineEnds(h, size)
                        return ends && <PlanePath key={index} map={map} points={ends.map(scale)} color={INK} width={2} clip={clip} />
                    })}
                    {level && (() => {
                        const ends = lineEnds({ ...level.objective, c: level.k }, size)
                        return ends && <PlanePath map={map} points={ends.map(scale)} color={level.color ?? SECOND} width={3} dashed clip={clip} />
                    })()}
                    {integers.map((point) => {
                        const [x, y] = scale(point)
                        return <circle key={point.join()} cx={map.x(x)} cy={map.y(y)} r={3.5} fill={STAGE} />
                    })}
                    {vertices.map(({ point, name, best }) => (
                        <PlanePoint key={point.join()} map={map} point={scale(point)} color={best ? SECOND : GREEN} radius={best ? 7 : 5} name={name} fontSize={14} />
                    ))}
                    {children?.(map, clip, scale)}
                </g>
            )}
        </Plane>
    )
}

