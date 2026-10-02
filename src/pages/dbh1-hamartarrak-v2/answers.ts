import { parseFractionInput, type FractionValue } from '../../features/unit-v2/math/fraction.ts'

/* ==========================================================================
   Zenbaki hamartarrak · 1. DBH — reading written answers. The comma and the
   point are both decimal separators; spaces between digit groups (4 700)
   are dropped, and so are the thousand points of a number that also has a
   decimal comma (1.039,104).
   ========================================================================== */

export function readDecimalAnswer(input: string): string {
    const compact = input.trim().replace(/(\d)\s+(?=\d)/g, '$1')
    return /\d\.\d{3}.*,/.test(compact) ? compact.replace(/\.(?=\d{3})/g, '') : compact
}

/** A decimal written with the comma (or the point), as an exact fraction */
export function decimalValue(text: string): FractionValue {
    const value = parseFractionInput(text)
    if (!value) throw new Error(`Not a number: ${text}`)
    return value
}
