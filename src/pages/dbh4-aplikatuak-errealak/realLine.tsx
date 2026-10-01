import type { ReactNode } from 'react'
import { Label } from '../dbh2-funtzioak-v2/plane'
import { tickText, type LineMap } from './realLineMap'
import type { Interval } from './reals'

/* ==========================================================================
   Zenbaki errealak (4. DBH) — the real line in the notebook style, shared by
   the lesson figures, the exercises, the laboratory and the games. Values
   map linearly between `from` and `to` onto the pixels `x0`…`x1`.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const CARD = 'var(--card, #fffcf6)'

/** Axis with arrowheads, ticks every `step` and numbers every `labelEvery` ticks */
export function RealAxis({ map, step = 1, labelEvery = 1, labels = true, arabic = false, fontSize = 15, minor = 0 }: {
    map: LineMap
    step?: number
    labelEvery?: number
    labels?: boolean
    arabic?: boolean
    fontSize?: number
    /** Small ticks between the main ones (10 for tenths) */
    minor?: number
}) {
    const count = Math.round((map.to - map.from) / step)
    const ticks = Array.from({ length: count + 1 }, (_, index) => map.from + index * step)
    const minors = minor > 1 ? ticks.slice(0, -1).flatMap((tick) => Array.from({ length: minor - 1 }, (_, index) => tick + ((index + 1) * step) / minor)) : []
    return (
        <g>
            <line x1={map.x0 - 16} y1={map.y} x2={map.x1 + 16} y2={map.y} stroke={INK} strokeWidth={2.2} />
            <path d={`M${map.x1 + 24} ${map.y} l-10 -6 v12 z M${map.x0 - 24} ${map.y} l10 -6 v12 z`} fill={INK} />
            {minors.map((value) => <line key={`m${value}`} x1={map.x(value)} y1={map.y - 5} x2={map.x(value)} y2={map.y + 5} stroke={MUTED} strokeWidth={1.2} />)}
            {ticks.map((value, index) => (
                <g key={value}>
                    <line x1={map.x(value)} y1={map.y - 9} x2={map.x(value)} y2={map.y + 9} stroke={INK} strokeWidth={2} />
                    {labels && index % labelEvery === 0 && <text x={map.x(value)} y={map.y + 28} textAnchor="middle" fontSize={fontSize} fill={MUTED}>{tickText(value, arabic)}</text>}
                </g>
            ))}
        </g>
    )
}

/** A marked point with its name above the line */
export function LinePoint({ map, value, name, color = 'var(--second, #c4432a)', above = true, radius = 7, fontSize = 15 }: { map: LineMap; value: number; name?: ReactNode; color?: string; above?: boolean; radius?: number; fontSize?: number }) {
    return (
        <g>
            <circle cx={map.x(value)} cy={map.y} r={radius} fill={color} stroke={CARD} strokeWidth={2} />
            {name !== undefined && <Label x={map.x(value)} y={above ? map.y - 16 : map.y + 46} textAnchor="middle" fontSize={fontSize} fontWeight={700} fill={color}>{name}</Label>}
        </g>
    )
}

/** An interval drawn over the line: thick band, filled dot when the end belongs to it, open dot when not */
export function LineInterval({ map, value, color = STAGE, lift = 0 }: { map: LineMap; value: Interval; color?: string; lift?: number }) {
    const y = map.y - lift
    const left = value.from === null ? map.x0 - 14 : map.x(value.from)
    const right = value.to === null ? map.x1 + 14 : map.x(value.to)
    return (
        <g>
            <line x1={left} y1={y} x2={right} y2={y} stroke={color} strokeWidth={7} strokeLinecap={value.from === null || value.to === null ? 'butt' : 'round'} opacity={0.85} />
            {value.from === null && <path d={`M${left - 10} ${y} l12 -8 v16 z`} fill={color} />}
            {value.to === null && <path d={`M${right + 10} ${y} l-12 -8 v16 z`} fill={color} />}
            {value.from !== null && <circle cx={left} cy={y} r={7.5} fill={value.closedFrom ? color : CARD} stroke={color} strokeWidth={3} />}
            {value.to !== null && <circle cx={right} cy={y} r={7.5} fill={value.closedTo ? color : CARD} stroke={color} strokeWidth={3} />}
        </g>
    )
}
