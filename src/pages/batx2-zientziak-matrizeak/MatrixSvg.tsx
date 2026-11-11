import type { ReactNode } from 'react'

/* ==========================================================================
   Matrizeak · Batxilergoa 2 — a matrix drawn in SVG (round brackets, one
   number per cell, cells that can be tinted or outlined). Shared by the
   lesson figures, the lab and the games of this unit, and exported for
   Determinantes and Sistemas. Numbers are written left to right in every
   language. This file only exports components (react-refresh).
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'

export interface MatrixBlockProps {
    /** Top-left corner of the first cell */
    x: number
    y: number
    cells: Array<Array<string | number>>
    /** Width and height of a cell */
    cell?: number
    rowGap?: number
    size?: number
    /** Background of a cell, or undefined */
    tint?: (row: number, column: number) => string | undefined
    /** Colour of a number */
    color?: (row: number, column: number) => string | undefined
    /** A vertical bar before this column, as in (A | I) */
    barBefore?: number
    /** Width of the brackets' curve */
    bracket?: number
    /** Something to draw over the matrix (the same coordinates) */
    children?: ReactNode
}

/** A matrix with its brackets: it is columns × cell + 2 × bracket wide */
export function MatrixBlock({ x, y, cells, cell = 48, rowGap, size = 22, tint, color, barBefore, bracket = 14, children }: MatrixBlockProps) {
    const gap = rowGap ?? cell * 0.86
    const height = cells.length * gap
    const width = (cells[0]?.length ?? 0) * cell
    const left = x
    const right = x + width + 2 * bracket
    const top = y
    const bottom = y + height
    const curve = Math.min(16, height / 4)
    return (
        <g>
            <path d={`M${left + bracket} ${top} q${-bracket} ${curve} ${-bracket} ${height / 2} q0 ${height / 2 - curve} ${bracket} ${height / 2}`} fill="none" stroke={INK} strokeWidth={2.2} />
            <path d={`M${right - bracket} ${top} q${bracket} ${curve} ${bracket} ${height / 2} q0 ${height / 2 - curve} ${-bracket} ${height / 2}`} fill="none" stroke={INK} strokeWidth={2.2} />
            {cells.map((row, r) => row.map((value, c) => {
                const cx = left + bracket + c * cell
                const cy = top + r * gap
                const fill = tint?.(r, c)
                return (
                    <g key={`${r}-${c}`}>
                        {fill && <rect x={cx + 3} y={cy + 3} width={cell - 6} height={gap - 6} rx={7} fill={fill} />}
                        <text x={cx + cell / 2} y={cy + gap / 2 + size * 0.36} textAnchor="middle" fontSize={size} fontWeight={700} fill={color?.(r, c) ?? INK} direction="ltr">{value}</text>
                    </g>
                )
            }))}
            {barBefore !== undefined && <line x1={left + bracket + barBefore * cell} x2={left + bracket + barBefore * cell} y1={top + 4} y2={bottom - 4} stroke={INK} strokeWidth={1.8} />}
            {children}
        </g>
    )
}
