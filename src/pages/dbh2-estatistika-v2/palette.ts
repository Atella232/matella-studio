import type { UnitLanguage } from '../../features/unit-v2/types'

/* ==========================================================================
   Estatistika eta probabilitatea · 2. DBH — notebook colours shared by the
   lesson figures, the laboratory and the games, and the decimal writer.
   ========================================================================== */

export const INK = 'var(--ink, #1d2733)'
export const MUTED = 'var(--muted, #58616e)'
export const STAGE = 'var(--stage, #2f6fdb)'
export const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
export const SECOND = 'var(--second, #c4432a)'
export const LINE = 'var(--line, #d6cfc2)'
export const PAPER = '#fffcf6'
export const COLORS = ['#2f6fdb', '#d9502e', '#e0a100', '#267b53', '#7a4cc2']

/** A number written with the comma, shown with the point in Arabic */
export const num = (language: UnitLanguage, value: number | string) => {
    const text = typeof value === 'number' ? String(Math.round(value * 1000) / 1000).replace('.', ',') : value
    return language === 'ar' ? text.replace(/,/g, '.') : text
}
