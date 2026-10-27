import type { UnitLanguage } from '../../../features/unit-v2/types.ts'

/* ==========================================================================
   Numbers for the detective and the bank: LaTeX with a decimal comma, and
   euros for a sentence. No value in these games goes past four decimals.
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

/** Euros to the cent for a sentence: 4440,73 (4440.73 in Arabic); 13 488,50 with a narrow space */
export function moneyText(value: number, language: UnitLanguage): string {
    const [whole, cents] = (Math.round(value * 100) / 100).toFixed(2).split('.')
    const grouped = Number(whole) >= 10000 ? whole.replace(/\B(?=(\d{3})+(?!\d))/g, '\u202f') : whole
    return cents === '00' ? grouped : `${grouped}${language === 'ar' ? '.' : ','}${cents}`
}
