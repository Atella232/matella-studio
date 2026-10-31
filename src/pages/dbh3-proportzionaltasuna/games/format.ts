import type { UnitLanguage } from '../../../features/unit-v2/types.ts'
import { decimalSeparatorFor } from '../../../utils/numberFormat.ts'

/* ==========================================================================
   How the games of this unit write numbers on screen: the decimal comma in
   Basque and Spanish, the point in English and Arabic; thousands with a
   space (a comma in English); percentages as each language writes them.
   ========================================================================== */

export function num(value: number, language: UnitLanguage, digits = 2): string {
    const rounded = Math.round(value * 10 ** digits) / 10 ** digits
    const [whole, decimals] = String(rounded).split('.')
    const thousands = whole.length > 4 ? whole.replace(/\B(?=(\d{3})+(?!\d))/g, language === 'en' ? ',' : language === 'ar' ? '' : ' ') : whole
    if (!decimals) return thousands
    return `${thousands}${language === 'ar' ? '.' : decimalSeparatorFor(language)}${decimals}`
}

/** +25 % / % 25 / 25% / 25٪ with its sign */
export function percentText(percent: number, language: UnitLanguage): string {
    const sign = percent > 0 ? '+' : '−'
    const value = Math.abs(percent)
    if (language === 'eu') return `${sign}%\u00a0${value}`
    if (language === 'es') return `${sign}${value}\u00a0%`
    if (language === 'ar') return `\u2066${sign}${value}٪\u2069`
    return `${sign}${value}%`
}

/** In Arabic a number with its unit or a scale is kept left to right inside the sentence */
export const isolate = (text: string, language: UnitLanguage) => (language === 'ar' ? `\u2066${text}\u2069` : text)

/** A real distance: 750 m or 2,5 km */
export function distanceText(metres: number, language: UnitLanguage): string {
    const km = language === 'ar' ? 'كم' : 'km'
    const m = language === 'ar' ? 'م' : 'm'
    return isolate(metres < 1000 ? `${num(metres, language)} ${m}` : `${num(metres / 1000, language, 3)} ${km}`, language)
}

/** A scale: 1 : 50 000 */
export const scaleText = (scale: number, language: UnitLanguage) => `1 : ${language === 'en' ? scale.toLocaleString('en-GB') : String(scale).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}`
