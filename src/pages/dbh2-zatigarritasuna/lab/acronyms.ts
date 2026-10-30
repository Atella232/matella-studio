import type { UnitLanguage } from '../../../features/unit-v2/types.ts'

/** ZKH / MKT in Basque and Arabic (as in class), m.c.d. / m.c.m. in Spanish, GCD / LCM in English */
export function acronym(language: UnitLanguage, kind: 'gcd' | 'lcm'): string {
    if (language === 'es') return kind === 'gcd' ? 'm.c.d.' : 'm.c.m.'
    if (language === 'en') return kind === 'gcd' ? 'GCD' : 'LCM'
    return kind === 'gcd' ? 'ZKH' : 'MKT'
}

export const acronymLatex = (language: UnitLanguage, kind: 'gcd' | 'lcm') => (language === 'es' ? `\\text{${acronym(language, kind)}}` : `\\mathrm{${acronym(language, kind)}}`)

export const divisorsLatex = (language: UnitLanguage) => (language === 'es' || language === 'en' ? '\\mathrm{Div}' : '\\mathrm{Zat}')
