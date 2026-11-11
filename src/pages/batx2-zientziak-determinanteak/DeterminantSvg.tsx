import type { ReactNode } from 'react'

/* ==========================================================================
   Determinanteak · Batxilergoa 2 — a determinant drawn in SVG: the
   numbers between two straight bars, cells that can be tinted, struck out
   (the row and column of a minor) or marked with the sign of their
   cofactor. Shared by the figures, the lab and the games of this unit, and
   by Sistemas. This file only exports components (react-refresh).
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'

export interface DeterminantBlockProps {
    x: number
    y: number
    cells: Array<Array<string | number>>
    cell?: number
    rowGap?: number
    size?: number
    tint?: (row: number, column: number) => string | undefined
    color?: (row: number, column: number) => string | undefined
    /** A row and a column struck out, as for a minor */
    strike?: { row: number; column: number }
    /** A small sign (+ or −) in the corner of each cell, as on the chessboard of cofactors */
    signs?: boolean
    children?: ReactNode
}

/** A determinant with its bars: it is columns × cell + 16 wide */
export function DeterminantBlock({ x, y, cells, cell = 48, rowGap, size = 22, tint, color, strike, signs = false, children }: DeterminantBlockProps) {
    const gap = rowGap ?? cell * 0.86
    const height = cells.length * gap
    const width = (cells[0]?.length ?? 0) * cell
    const left = x + 8
    return (
        <g>
            <line x1={x + 2} x2={x + 2} y1={y} y2={y + height} stroke={INK} strokeWidth={2.4} />
            <line x1={left + width + 6} x2={left + width + 6} y1={y} y2={y + height} stroke={INK} strokeWidth={2.4} />
            {cells.map((row, r) => row.map((value, c) => {
                const cx = left + c * cell
                const cy = y + r * gap
                const fill = tint?.(r, c)
                const struck = strike && (strike.row === r || strike.column === c)
                return (
                    <g key={`${r}-${c}`} opacity={struck ? 0.35 : 1}>
                        {fill && <rect x={cx + 3} y={cy + 3} width={cell - 6} height={gap - 6} rx={7} fill={fill} />}
                        <text x={cx + cell / 2} y={cy + gap / 2 + size * 0.36} textAnchor="middle" fontSize={size} fontWeight={700} fill={color?.(r, c) ?? INK} direction="ltr">{value}</text>
                        {signs && <text x={cx + cell - 7} y={cy + 14} textAnchor="end" fontSize={12} fontWeight={700} fill={MUTED} direction="ltr">{(r + c) % 2 === 0 ? '+' : '−'}</text>}
                    </g>
                )
            }))}
            {strike && (
                <g stroke="var(--second, #c4432a)" strokeWidth={2.2} opacity={0.75}>
                    <line x1={x - 2} x2={left + width + 10} y1={y + strike.row * gap + gap / 2} y2={y + strike.row * gap + gap / 2} />
                    <line x1={left + strike.column * cell + cell / 2} x2={left + strike.column * cell + cell / 2} y1={y - 4} y2={y + height + 4} />
                </g>
            )}
            {children}
        </g>
    )
}
