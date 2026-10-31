import type { LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Segidak · 3. DBH — how the texts of this unit are written.
   In Basque and Spanish a number never breaks from its sign (3,60 €, 25 %,
   % 25); Arabic writes the decimal point instead of the comma, so {,}
   becomes . there.
   ========================================================================== */

const glue = (text: string) => text.split(/(\$[^$]*\$)/).map((part) => (part.startsWith('$') ? part : part.replace(/(\d) ([€%])/g, '$1 $2').replace(/% (?=\d)/g, '% '))).join('')

export const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu: glue(eu), es: glue(es), en, ar: ar.replace(/\{,\}/g, '.') })

/** The same formula in every language; the decimal comma becomes a point in Arabic */
export const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })
