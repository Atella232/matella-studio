import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import type { Vec3 } from '../space/vec3.ts'

/* ==========================================================================
   Small pieces shared by the laboratory tools of Espazioko bektoreak:
   whole coordinates kept inside the board, how a number or a vector is
   written in a formula, and the texts in four languages.
   ========================================================================== */

export const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })

/** A whole coordinate kept between −limit and limit */
export const clampTo = (limit: number) => (value: number) => Math.min(limit, Math.max(-limit, Math.round(value)))
export const clampVec = (limit: number, [x, y, z]: Vec3): Vec3 => {
    const clamp = clampTo(limit)
    return [clamp(x), clamp(y), clamp(z)]
}

export const sameVec = (a: Vec3, b: Vec3) => a[0] === b[0] && a[1] === b[1] && a[2] === b[2]
export const isZeroVec = (a: Vec3) => a[0] === 0 && a[1] === 0 && a[2] === 0

/** A negative number in brackets, for a product in LaTeX */
export const wrap = (value: number) => (value < 0 ? `(${value})` : String(value + 0))
/** (2,-1,3) in LaTeX */
export const vec = (a: Vec3) => `(${a.map((value) => value + 0).join(',')})`
/** √n in LaTeX, whole when n is a perfect square */
export const root = (n: number) => (Number.isInteger(Math.sqrt(n)) ? String(Math.sqrt(n)) : `\\sqrt{${n}}`)
/** A − sign that reads well in a stepper */
export const minus = (value: number) => (value < 0 ? `−${-value}` : String(value))
