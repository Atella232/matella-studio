/* Zenbaki errealak (4. DBH) — the real line's geometry, apart from the SVG so the tests can load it. */

import type { Interval } from './reals.ts'

export interface LineMap {
    from: number
    to: number
    x0: number
    x1: number
    y: number
    x: (value: number) => number
}

export const lineMap = (from: number, to: number, x0: number, x1: number, y: number): LineMap => ({ from, to, x0, x1, y, x: (value) => x0 + ((value - from) / (to - from)) * (x1 - x0) })

/** Written with a true minus sign and, in Arabic, the decimal point */
export const tickText = (value: number, arabic = false) => {
    const text = String(Math.round(value * 1e6) / 1e6).replace('-', '−')
    return arabic ? text : text.replace('.', ',')
}

/** A real line drawn under an exercise, as plain data (the tests read it too) */
export interface LineSpec {
    from: number
    to: number
    step?: number
    labelEvery?: number
    intervals?: Array<{ value: Interval; color?: 'stage' | 'second' | 'green'; lift?: number }>
    points?: Array<{ value: number; name?: string }>
}
