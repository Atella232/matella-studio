import type { LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Funtzioak · 4. DBH akademikoak — texts in three languages. Arabic
   writes the decimal point instead of the comma, so {,} becomes . there.
   Intervals and points are written left to right in every language.
   ========================================================================== */

export const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })

/** The same formula in every language */
export const same = (value: string): LocalizedText => say(value, value, value, value)
