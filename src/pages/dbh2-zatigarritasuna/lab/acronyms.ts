import type { UnitLanguage } from '../../../features/unit-v2/types.ts'

/** ZKH / MKT in Basque and Arabic (as in class), m.c.d. / m.c.m. in Spanish */
export function acronym(language: UnitLanguage, kind: 'gcd' | 'lcm'): string {
    if (language === 'es') return kind === 'gcd' ? 'm.c.d.' : 'm.c.m.'
    return kind === 'gcd' ? 'ZKH' : 'MKT'
}

export const acronymLatex = (language: UnitLanguage, kind: 'gcd' | 'lcm') => (language === 'es' ? `\\text{${acronym(language, kind)}}` : `\\mathrm{${acronym(language, kind)}}`)

export const divisorsLatex = (language: UnitLanguage) => (language === 'es' ? '\\mathrm{Div}' : '\\mathrm{Zat}')
