import { fraction, hasTerminatingDecimal, toExactDecimal, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'

/* ==========================================================================
   Probabilitatea · Batxilergoa 2 — small helpers shared by the lab tools
   and the games of the unit (and meant for 2.º Sociales too): writing an
   exact probability in LaTeX and the four-language text helper. Pure.
   ========================================================================== */

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
export const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })

/** An exact probability for LaTeX: a decimal that ends (0{,}25) or a fraction (\frac{2}{13}) */
export function probLatex(value: FractionValue): string {
    const sign = value.numerator < 0 ? '-' : ''
    const absolute = fraction(Math.abs(value.numerator), value.denominator)
    if (hasTerminatingDecimal(absolute) && String(toExactDecimal(absolute)).length <= 6) return `${sign}${toExactDecimal(absolute)!.replace(',', '{,}')}`
    return `${sign}\\frac{${absolute.numerator}}{${absolute.denominator}}`
}

/** A number of hundredths for LaTeX: 35 → 0{,}35, 100 → 1, 0 → 0 */
export const hundredthsLatex = (hundredths: number) => probLatex({ numerator: hundredths, denominator: 100 })
/** A number of tenths for LaTeX: 3 → 0{,}3 */
export const tenthsLatex = (tenths: number) => probLatex({ numerator: tenths, denominator: 10 })
