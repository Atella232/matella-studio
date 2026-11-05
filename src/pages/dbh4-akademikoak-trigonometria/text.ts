import type { LocalizedText, UnitLanguage } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Trigonometria · 4. DBH akademikoak — texts in three languages. Inside the
   formulas, write \sen and \tg: Spanish reads «sen» and «tg», Basque «sin»
   and «tg», Arabic «sin» and «tan», as in each country's books. Arabic
   writes the decimal point instead of the comma.
   ========================================================================== */

const names: Record<UnitLanguage, [string, string]> = {
    eu: ['\\sin', '\\operatorname{tg}'],
    es: ['\\operatorname{sen}', '\\operatorname{tg}'],
    en: ['\\sin', '\\tan'],
    ar: ['\\sin', '\\tan']
}

/** The formula with \sen and \tg written in the language's names */
export const localize = (language: UnitLanguage, text: string) =>
    text.replace(/\\sen(?![a-zA-Z])/g, names[language][0]).replace(/\\tg(?![a-zA-Z])/g, names[language][1])

export const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({
    eu: localize('eu', eu),
    es: localize('es', es),
    en: localize('en', en),
    ar: localize('ar', ar).replace(/\{,\}/g, '.')
})

/** The same formula in every language */
export const same = (value: string): LocalizedText => say(value, value, value, value)

const languages: UnitLanguage[] = ['eu', 'es', 'en', 'ar']

const isLocalized = (value: object): value is LocalizedText => languages.every((language) => typeof (value as Record<string, unknown>)[language] === 'string')

/**
 * lessonTexts.ts and lessonChecks.ts write \sin and \tan in every language, so the shared tests see the same
 * formulas in the four; this gives each language its names (sen and tg in Spanish, tg in Basque) when the
 * lessons merge them
 */
export function localizeNames<T>(value: T): T {
    if (Array.isArray(value)) return value.map(localizeNames) as T
    if (value === null || typeof value !== 'object') return value
    if (isLocalized(value)) {
        const named = (language: UnitLanguage) => localize(language, value[language].replace(/\\sin(?![a-zA-Z])/g, '\\sen').replace(/\\tan(?![a-zA-Z])/g, '\\tg'))
        return { eu: named('eu'), es: named('es'), en: named('en'), ar: named('ar') } as T
    }
    return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, localizeNames(entry)])) as T
}
