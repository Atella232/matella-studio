import type { UnitLanguage } from '../../features/unit-v2/types.ts'

/** A number for plain text: the comma in Basque and Spanish, the point in English and Arabic */
export const plainNumber = (value: number, language: UnitLanguage) => {
    const text = String(Math.round(value * 10000) / 10000)
    return language === 'eu' || language === 'es' ? text.replace('.', ',') : text
}
