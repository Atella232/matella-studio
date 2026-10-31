import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types.ts'
import { decimalSeparatorFor } from '../../../utils/numberFormat.ts'

/* ==========================================================================
   Colours and number writing shared by the 3. DBH lab tools (kept apart
   from LabParts.tsx, which exports only components).
   ========================================================================== */

export const INK = 'var(--ink, #1d2733)'
export const MUTED = 'var(--muted, #58616e)'
export const STAGE = 'var(--stage, #2f6fdb)'
export const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
export const SECOND = 'var(--second, #c4432a)'
export const SECOND_TINT = '#f6d5cc'
export const GREEN = 'var(--success, #267b53)'
export const GREEN_TINT = 'var(--success-tint, #d9efe2)'
export const MUSTARD = 'var(--mustard, #e0a100)'
export const MUSTARD_TINT = 'var(--mustard-tint, #fbebc0)'
export const PAPER = 'var(--card, #fffcf6)'

export const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })

/** A number with the language's decimal mark: the comma in Basque and Spanish, the point in English and Arabic */
export function dec(value: number, language: UnitLanguage, digits = 2): string {
    const text = String(Math.round(value * 10 ** digits) / 10 ** digits)
    return language === 'ar' ? text : text.replace('.', decimalSeparatorFor(language))
}
/** A number for LaTeX: {,} for the comma (MathText writes the point in English), the point in Arabic */
export const texDec = (value: number, language: UnitLanguage, digits = 2) => String(Math.round(value * 10 ** digits) / 10 ** digits).replace('.', language === 'ar' ? '.' : '{,}')
