import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types.ts'

/** LaTeX for a signed integer, as in the textbook: −5, 0, +5 */
export const signedTex = (value: number): string => (value < 0 ? `-${Math.abs(value)}` : value > 0 ? `+${value}` : '0')

/** A signed integer in brackets, ready for LaTeX: (−5), (+3) */
export const bracketTex = (value: number): string => `(${signedTex(value)})`

/** The opposite is written Aur(a) in Basque and Op(a) in Spanish, as in each textbook */
export function oppositeLatex(language: UnitLanguage, value: string): string {
    return `\\mathrm{${language === 'es' ? 'Op' : 'Aur'}}(${value})`
}

export function yesNo(language: UnitLanguage, yes: boolean): string {
    const text: LocalizedText = yes ? { eu: 'Bai', es: 'Sí', ar: 'نعم' } : { eu: 'Ez', es: 'No', ar: 'لا' }
    return text[language]
}
