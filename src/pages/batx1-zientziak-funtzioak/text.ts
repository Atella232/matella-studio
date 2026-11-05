import type { LocalizedText, UnitLanguage } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Funtzio elementalak · Batxilergoa 1 · Zientziak — texts in four
   languages. The trigonometric and arc names follow each country's books,
   as in Trigonometria of 4. DBH: Spanish writes sen, tg, arcsen and arctg;
   Basque sin, tg, arcsin and arctg; English and Arabic sin, tan, arcsin and
   arctan. lessonTexts.ts and lessonChecks.ts write \sin, \tan, \arcsin and
   \arctan in every language (the shared tests compare the formulas of the
   four), and lessons.tsx gives each language its names with
   localizeNames. Arabic writes the decimal point instead of the comma.
   ========================================================================== */

const names: Record<UnitLanguage, { sin: string; tan: string; arcsin: string; arctan: string }> = {
    eu: { sin: '\\sin', tan: '\\operatorname{tg}', arcsin: '\\arcsin', arctan: '\\operatorname{arctg}' },
    es: { sin: '\\operatorname{sen}', tan: '\\operatorname{tg}', arcsin: '\\operatorname{arcsen}', arctan: '\\operatorname{arctg}' },
    en: { sin: '\\sin', tan: '\\tan', arcsin: '\\arcsin', arctan: '\\arctan' },
    ar: { sin: '\\sin', tan: '\\tan', arcsin: '\\arcsin', arctan: '\\arctan' }
}

/** The formula with \sin, \tan, \arcsin and \arctan written in the language's names */
export function localize(language: UnitLanguage, text: string): string {
    const name = names[language]
    return text
        .replace(/\\arcsin(?![a-zA-Z])/g, name.arcsin)
        .replace(/\\arctan(?![a-zA-Z])/g, name.arctan)
        .replace(/\\sin(?![a-zA-Z])/g, name.sin)
        .replace(/\\tan(?![a-zA-Z])/g, name.tan)
}

/** A text in four languages (say takes eu, es, ar, en), with the trigonometric names of each one */
export const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({
    eu: localize('eu', eu),
    es: localize('es', es),
    en: localize('en', en),
    ar: localize('ar', ar).replace(/\{,\}/g, '.')
})

/** The same formula in every language */
export const same = (value: string): LocalizedText => say(value, value, value, value)

/** A text in four languages with the same formulas in all of them, for lessonTexts.ts and lessonChecks.ts */
export const plain = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
export const plainSame = (value: string): LocalizedText => plain(value, value, value, value)

const languages: UnitLanguage[] = ['eu', 'es', 'en', 'ar']

const isLocalized = (value: object): value is LocalizedText => languages.every((language) => typeof (value as Record<string, unknown>)[language] === 'string')

/** Gives each language its trigonometric names in the texts of lessonTexts.ts and lessonChecks.ts */
export function localizeNames<T>(value: T): T {
    if (Array.isArray(value)) return value.map(localizeNames) as T
    if (value === null || typeof value !== 'object') return value
    if (isLocalized(value)) return { eu: localize('eu', value.eu), es: localize('es', value.es), en: localize('en', value.en), ar: localize('ar', value.ar) } as T
    return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, localizeNames(entry)])) as T
}
