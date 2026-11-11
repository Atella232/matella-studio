import type { UnitLanguage } from '../../../features/unit-v2/types.ts'
import { texDec } from '../../dbh3-segidak/lab/labStyle.ts'
import { gcd } from '../../batx2-zientziak-bektoreak/space/vec3.ts'

/* ==========================================================================
   Small pieces shared by the laboratory tools of Angeluak eta
   distantziak: a distance written exactly from its square (a whole
   number, a root or a fraction of roots) and an angle in degrees (exact
   when it is whole). The rest comes from the labs of Espazioko bektoreak
   and of Zuzenak eta planoak.
   ========================================================================== */

export { clampTo, clampVec, constantLatex, fractionPoint, generalLatex, insideBox, isZeroVec, levelLatex, linearLatex, minus, nonZeroStep, pointLatex, sameVec, say, termLatex, tidy, toNumbers, vec, wrap } from '../../batx2-zientziak-planoak/lab/common.ts'

const isSquare = (value: number) => Number.isInteger(Math.sqrt(value))

/** √(top / bottom) in LaTeX, exact: 3, √5, 2/3, √5/3, √(5/7)… with ≈ and two decimals when it is not whole */
export function rootLatex(top: number, bottom: number, language: UnitLanguage): string {
    const common = gcd(top, bottom) || 1
    const [p, q] = [top / common, bottom / common]
    const value = Math.sqrt(p / q)
    const part = (n: number) => (isSquare(n) ? String(Math.sqrt(n)) : `\\sqrt{${n}}`)
    const exact = q === 1 ? part(p) : `\\frac{${part(p)}}{${part(q)}}`
    if (isSquare(p) && isSquare(q)) return exact
    return `${exact}\\approx ${texDec(value, language, 2)}`
}

/** An angle in degrees after its sign: =60° when it is whole, else ≈ with two decimals */
export function degreesLatex(degrees: number, language: UnitLanguage): string {
    const whole = Math.round(degrees)
    return Math.abs(degrees - whole) < 1e-7 ? `=${whole}^\\circ` : `\\approx ${texDec(degrees, language, 2)}^\\circ`
}

/** The angle in degrees whose cosine (or sine) is √(top / bottom) */
export const angleFromSquare = (top: number, bottom: number, sine = false) => {
    const ratio = Math.min(1, Math.sqrt(top / bottom))
    return ((sine ? Math.asin(ratio) : Math.acos(ratio)) * 180) / Math.PI
}
