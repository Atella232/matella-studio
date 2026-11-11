import type { LocalizedText, UnitLanguage } from '../../features/unit-v2/types'

/* ==========================================================================
   Integral mugagabeak · Batxilergoa 2 · Zientziak — colours and small text
   helpers of the drawings, shared by figures.tsx, plot.tsx and the next
   topic (Integral mugatua). Plain values (a .tsx file may only export
   components). Positive areas and the first curve are blue, negative ones
   red, a second curve violet, as in Integralak of 1.º.
   ========================================================================== */

export const INK = 'var(--ink, #1d2733)'
export const MUTED = 'var(--muted, #58616e)'
export const STAGE = 'var(--stage, #2f6fdb)'
export const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
export const CARD = 'var(--card, #fffcf6)'
export const BLUE = '#2f6fdb'
export const RED = '#c4432a'
export const VIOLET = '#7b52c7'
export const GREEN = '#2f8a57'
export const PAPER = '#fffcf6'
export const SERIF = 'Fraunces, serif'

/** A text in four languages, in the order the unit writes them (eu, es, ar, en) */
export const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })

/** The decimal comma in Basque and Spanish, the point in English and Arabic */
export const decimal = (language: UnitLanguage, text: string) => (language === 'en' || language === 'ar' ? text.replace(/(\d),(\d)/g, '$1.$2') : text)

/** The trigonometric names of each language inside a drawing (Spanish sen, tg, arcsen, arctg; Basque tg, arctg) */
export const trig = (language: UnitLanguage) => ({
    sin: language === 'es' ? 'sen' : 'sin',
    tan: language === 'eu' || language === 'es' ? 'tg' : 'tan',
    arcsin: language === 'es' ? 'arcsen' : 'arcsin',
    arctan: language === 'eu' || language === 'es' ? 'arctg' : 'arctan'
})
