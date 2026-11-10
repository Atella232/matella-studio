import type { ReactNode } from 'react'
import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { AxisTitles, Label, PlaneGrid, PlanePath, PlanePoint } from '../dbh2-funtzioak-v2/plane'
import { useBoxClip } from '../dbh2-funtzioak-v2/planeClip'
import { planeMap, type PlaneBox } from '../dbh2-funtzioak-v2/planeMap'
import { Figure } from '../dbh2-zatikiak-prototype/figures'
import { sampled } from '../dbh4-aplikatuak-funtzioak/functions'
import { BLUE, CARD, INK, MUTED, PAPER, RED, STAGE, STAGE_TINT, say } from './figureKit'

/* ==========================================================================
   Integral mugagabeak · Batxilergoa 2 · Zientziak — the drawing pieces of
   the lesson figures, exported so that Integral mugatua (and 2.º Sociales)
   can use them too. AreaPlot is a copy of the plane of Integralak of 1.º
   (which does not export it): areas filled between a curve and a base,
   rectangles, curves, dots, numbers inside the plane and a column of notes.
   TableFigure draws rows «function → integral». Formulas sit in their own
   <text> (left to right in every language); words go through <Label>.
   ========================================================================== */

/** A formula written left to right whatever the language */
export function F({ x, y, children, size = 19, color = INK, anchor = 'start', weight = 700 }: { x: number; y: number; children: ReactNode; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end'; weight?: number }) {
    return <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={weight} fill={color} direction="ltr">{children}</text>
}

/** An exponent inside an F; Back puts the text back on the line */
export function Up({ children }: { children: ReactNode }) {
    return <tspan dy={-9} fontSize="66%">{children}</tspan>
}
export function Back() {
    return <tspan dy={9}> </tspan>
}

export interface PlotCurve {
    fn: (x: number) => number
    from: number
    to: number
    color?: string
    dashed?: boolean
    width?: number
}
export interface PlotFill {
    fn: (x: number) => number
    /** The lower edge (the x-axis when left out) */
    base?: (x: number) => number
    from: number
    to: number
    color: string
}
export interface PlotBar {
    x: number
    width: number
    height: number
    color?: string
}
export interface PlotDot {
    at: [number, number]
    color?: string
    name?: string
}
export interface PlotMark {
    at: [number, number]
    text: string
    color?: string
    size?: number
}
export interface PlotNote {
    y: number
    formula?: ReactNode
    text?: LocalizedText
    color?: string
    size?: number
}

/**
 * One plane with filled areas, rectangles, curves, dots, numbers inside the plane (marks) and a column of
 * notes. The box is in grid squares; `units` says what a square is worth on each axis, and everything else
 * is in real values.
 */
export function AreaPlot({ language, height, label, box, cell, units = [1, 1], ox = 36, oy = 32, labelStep = 2, curves, fills = [], bars = [], dots = [], verticals = [], marks = [], notes = [], notesX = 420, caption }: {
    language: UnitLanguage
    height: number
    label: LocalizedText
    box: PlaneBox
    cell: number
    units?: [number, number]
    ox?: number
    oy?: number
    labelStep?: number
    curves: PlotCurve[]
    fills?: PlotFill[]
    bars?: PlotBar[]
    dots?: PlotDot[]
    verticals?: number[]
    marks?: PlotMark[]
    notes?: PlotNote[]
    notesX?: number
    caption?: LocalizedText
}) {
    const t = (text: LocalizedText) => pickText(language, text)
    const map = planeMap(box, cell, ox, oy)
    const [clipPath, clip] = useBoxClip(map)
    const [ux, uy] = units
    const px = (x: number) => map.x(x / ux)
    const py = (y: number) => map.y(y / uy)
    const area = (fill: PlotFill) => {
        const steps = 80
        const xs = Array.from({ length: steps + 1 }, (_, k) => fill.from + ((fill.to - fill.from) * k) / steps)
        const top = xs.map((x) => `${px(x)},${py(fill.fn(x))}`)
        const bottom = [...xs].reverse().map((x) => `${px(x)},${py(fill.base ? fill.base(x) : 0)}`)
        return `M${[...top, ...bottom].join(' L')} Z`
    }
    return (
        <Figure height={height} label={t(label)}>
            <g>
                <defs>{clipPath}</defs>
                <rect x={ox} y={oy} width={map.width} height={map.height} fill={CARD} />
                <PlaneGrid map={map} labelStep={labelStep} xUnit={ux} yUnit={uy} />
                <AxisTitles map={map} />
                {fills.map((fill, index) => <path key={`f${index}`} d={area(fill)} fill={fill.color} fillOpacity={0.26} stroke="none" clipPath={clip} />)}
                {bars.map((bar, index) => {
                    const left = px(bar.x)
                    const top = Math.min(py(0), py(bar.height))
                    return <rect key={`b${index}`} x={left} y={top} width={px(bar.x + bar.width) - left} height={Math.abs(py(bar.height) - py(0))} fill={bar.color ?? BLUE} fillOpacity={0.24} stroke={bar.color ?? BLUE} strokeWidth={2} clipPath={clip} />
                })}
                {verticals.map((x) => <line key={`v${x}`} x1={px(x)} y1={map.y(box.yMin)} x2={px(x)} y2={map.y(box.yMax)} stroke={MUTED} strokeWidth={2} strokeDasharray="7 5" />)}
                {curves.map((curve, index) => (
                    <PlanePath key={`c${index}`} map={map} points={sampled((x) => curve.fn(x * ux) / uy, curve.from / ux, curve.to / ux, 0.02)} color={curve.color ?? STAGE} width={curve.width ?? 3.6} dashed={curve.dashed} clip={clip} />
                ))}
                {dots.map((dot, index) => <PlanePoint key={`d${index}`} map={map} point={[dot.at[0] / ux, dot.at[1] / uy]} color={dot.color ?? STAGE} radius={6} name={dot.name} />)}
                {marks.map((mark, index) => (
                    <text key={`m${index}`} x={px(mark.at[0])} y={py(mark.at[1])} textAnchor="middle" fontSize={mark.size ?? 18} fontWeight={700} fill={mark.color ?? INK} direction="ltr" paintOrder="stroke" stroke={PAPER} strokeWidth={4} strokeLinejoin="round">{mark.text}</text>
                ))}
            </g>
            {notes.map((note, index) => note.formula !== undefined
                ? <F key={index} x={notesX} y={note.y} color={note.color ?? INK} size={note.size ?? 19}>{note.formula}</F>
                : <Label key={index} x={notesX} y={note.y} fontSize={note.size ?? 17} fill={note.color ?? INK}>{t(note.text!)}</Label>)}
            {caption && <Label x={360} y={height - 10} textAnchor="middle" fontSize={18} fill={MUTED}>{t(caption)}</Label>}
        </Figure>
    )
}

/** Rows «function → integral», with a heading over each column and an optional note under the integral */
export function TableFigure({ language, label, rows, caption }: {
    language: UnitLanguage
    label: LocalizedText
    rows: Array<{ key: string; fn: ReactNode; integral: ReactNode; note?: string; strong?: boolean }>
    caption: LocalizedText
}) {
    const t = (text: LocalizedText) => pickText(language, text)
    const height = 92 + rows.length * 72
    return (
        <Figure height={height} label={t(label)}>
            <Label x={190} y={40} textAnchor="middle" fontSize={18} fontWeight={700} fill={MUTED}>{t(say('Funtzioa', 'Función', 'الدالة', 'Function'))}</Label>
            <Label x={530} y={40} textAnchor="middle" fontSize={18} fontWeight={700} fill={MUTED}>{t(say('Integrala', 'Integral', 'التكامل', 'Integral'))}</Label>
            {rows.map((row, index) => {
                const y = 56 + index * 72
                return (
                    <g key={row.key}>
                        <rect x={40} y={y} width={300} height={60} rx={14} fill={PAPER} stroke={INK} strokeWidth={2} />
                        <F x={190} y={y + 39} anchor="middle" size={23}>{row.fn}</F>
                        <F x={360} y={y + 41} anchor="middle" size={30} color={STAGE}>∫</F>
                        <rect x={380} y={y} width={300} height={60} rx={14} fill={row.strong ? STAGE_TINT : PAPER} stroke={STAGE} strokeWidth={2.4} />
                        <F x={530} y={y + (row.note ? 30 : 39)} anchor="middle" size={23} color={row.strong ? RED : INK}>{row.integral}</F>
                        {row.note && <F x={530} y={y + 52} anchor="middle" size={14} color={MUTED} weight={400}>{row.note}</F>}
                    </g>
                )
            })}
            <Label x={360} y={height - 12} textAnchor="middle" fontSize={17} fill={MUTED}>{t(caption)}</Label>
        </Figure>
    )
}

/** An arrow head for the lines of a figure, one per colour (ids must be unique in the page) */
export function ArrowHead({ id, color }: { id: string; color: string }) {
    return <marker id={id} markerWidth={10} markerHeight={10} refX={8} refY={5} orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill={color} /></marker>
}
