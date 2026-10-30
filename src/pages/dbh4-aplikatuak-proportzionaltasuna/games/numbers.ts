import { fraction, toExactDecimal, toLatex, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import type { UnitLanguage } from '../../../features/unit-v2/types.ts'
import { decimalSeparatorFor, thousandsSeparatorFor } from '../../../utils/numberFormat.ts'

/* ==========================================================================
   Numbers for the games: LaTeX with a decimal comma, euros for a sentence
   and times as «1 h 20 min». No value in these games goes past four
   decimals.
   ========================================================================== */

export const round4 = (value: number) => Math.round(value * 10000) / 10000

/** Whether a value has at most `digits` decimals */
export const hasDecimals = (value: number, digits: number) => Math.abs(value * 10 ** digits - Math.round(value * 10 ** digits)) < 1e-6

/** A number in LaTeX: 1{,}05, and a thin space in the thousands from 10 000 (10\,609) */
export function latexNumber(value: number): string {
    const rounded = round4(value)
    const [whole, decimals] = String(Math.abs(rounded)).split('.')
    const grouped = Math.abs(rounded) >= 10000 ? whole.replace(/\B(?=(\d{3})+(?!\d))/g, '\\,') : whole
    return `${rounded < 0 ? '-' : ''}${grouped}${decimals ? `{,}${decimals}` : ''}`
}

/** Euros to the cent for a sentence: 4440,73 (4440.73 in Arabic and English); 13 488,50 with a narrow space, 13,488.50 in English */
export function moneyText(value: number, language: UnitLanguage): string {
    const [whole, cents] = (Math.round(value * 100) / 100).toFixed(2).split('.')
    const grouped = Number(whole) >= 10000 ? whole.replace(/\B(?=(\d{3})+(?!\d))/g, language === 'en' ? thousandsSeparatorFor(language) : '\u202f') : whole
    return cents === '00' ? grouped : `${grouped}${language === 'ar' ? '.' : decimalSeparatorFor(language)}${cents}`
}

/** Minutes as «1 h 20 min» («1 س 20 د» in Arabic), to the minute */
export function durationText(minutes: number, language: UnitLanguage): string {
    const total = Math.round(minutes)
    const whole = Math.floor(total / 60)
    const rest = total % 60
    const [h, min] = language === 'ar' ? ['س', 'د'] : ['h', 'min']
    return whole === 0 ? `${rest} ${min}` : rest === 0 ? `${whole} ${h}` : `${whole} ${h} ${rest} ${min}`
}

/** Hours in LaTeX: a short decimal (1{,}25) when there is one, otherwise a fraction (\frac{4}{3}) */
export function hoursLatex(hours: FractionValue): string {
    const value = fraction(hours.numerator, hours.denominator)
    const decimal = toExactDecimal(value, ',')
    return decimal !== null && (decimal.split(',')[1] ?? '').length <= 2 ? decimal.replace(',', '{,}') : toLatex(value)
}
