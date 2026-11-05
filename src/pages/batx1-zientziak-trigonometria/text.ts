import type { LocalizedText, UnitLanguage } from '../../features/unit-v2/types.ts'
import { localize as localizeTrig } from '../dbh4-akademikoak-trigonometria/text.ts'

/* ==========================================================================
   Formula eta funtzio trigonometrikoak · Batxilergoa 1 — texts in four
   languages. Inside the formulas write \sen, \tg, \cosec and \cotg:
   Spanish reads sen, tg, cosec and cotg; Basque sin, tg, cosec and cotg;
   English and Arabic sin, tan, csc and cot (\sec is the same everywhere).
   Arabic writes the decimal point instead of the comma. lessonTexts.ts and
   lessonChecks.ts write \sin, \tan, \csc and \cot in every language (so the
   shared tests see the same formulas) and localizeNames gives each
   language its names when the lessons merge them.
   ========================================================================== */

const reciprocal: Record<UnitLanguage, [string, string]> = {
    eu: ['\\operatorname{cosec}', '\\operatorname{cotg}'],
    es: ['\\operatorname{cosec}', '\\operatorname{cotg}'],
    en: ['\\csc', '\\cot'],
    ar: ['\\csc', '\\cot']
}

/** The formula with \sen, \tg, \cosec and \cotg written in the language's names */
export const localize = (language: UnitLanguage, text: string) =>
    localizeTrig(language, text).replace(/\\cosec(?![a-zA-Z])/g, reciprocal[language][0]).replace(/\\cotg(?![a-zA-Z])/g, reciprocal[language][1])

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

/** \sin, \tan, \csc and \cot of the shared lesson files, in each language's names */
export function localizeNames<T>(value: T): T {
    if (Array.isArray(value)) return value.map(localizeNames) as T
    if (value === null || typeof value !== 'object') return value
    if (isLocalized(value)) {
        const named = (language: UnitLanguage) => localize(language, value[language]
            .replace(/\\sin(?![a-zA-Z])/g, '\\sen')
            .replace(/\\tan(?![a-zA-Z])/g, '\\tg')
            .replace(/\\csc(?![a-zA-Z])/g, '\\cosec')
            .replace(/\\cot(?![a-zA-Z])/g, '\\cotg'))
        return { eu: named('eu'), es: named('es'), en: named('en'), ar: named('ar') } as T
    }
    return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, localizeNames(entry)])) as T
}
