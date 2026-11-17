import { tableValue, TABLE_MAX } from '../batx2-zientziak-banaketak/normal.ts'

/* ==========================================================================
   Banaketak · Batxilergoa 2 · Gizarte Zientziak — reading the normal table
   backwards with the convention the owner approved for 2.º Sociales: the
   z with two decimals whose table value is closest to the target, and the
   midpoint when two are equally close. So 90 % gives 1,645 and 99 % gives
   2,575, as Santillana and Anaya print them, and 95 % gives 1,96. Used by
   the characteristic intervals here and by Muestreo and Inferencia. Pure.
   ========================================================================== */

/** The z ≥ 0 whose Φ is closest to p (in ten-thousandths); the midpoint on a tie, so it may have three decimals */
export function inverseZ(p: number): number {
    let best: number[] = []
    let distance = Infinity
    for (let index = 0; index <= Math.round(TABLE_MAX * 100); index += 1) {
        const gap = Math.abs(tableValue(index / 100) - p)
        if (gap < distance) {
            best = [index]
            distance = gap
        } else if (gap === distance) {
            best.push(index)
        }
    }
    return (best[0] + best[best.length - 1]) / 200
}

/** The levels of confidence the unit uses, in percent */
export const LEVELS = [50, 80, 90, 94, 95, 96, 98, 99] as const
export type Level = (typeof LEVELS)[number]

/** z_{α/2} for a level in percent: P(−z ≤ Z ≤ z) = level */
export const criticalZ = (level: number) => inverseZ(10_000 - (10_000 - level * 100) / 2)

/** A number with up to three decimals for LaTeX, decimal comma: 1.645 → 1{,}645 */
export function decimalLatex(value: number): string {
    const rounded = Math.round(value * 1000) / 1000
    const text = String(rounded)
    return text.includes('.') ? text.replace('.', '{,}') : text
}
