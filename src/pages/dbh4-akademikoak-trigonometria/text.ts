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
    ar: ['\\sin', '\\tan']
}

/** The formula with \sen and \tg written in the language's names */
export const localize = (language: UnitLanguage, text: string) =>
    text.replace(/\\sen(?![a-zA-Z])/g, names[language][0]).replace(/\\tg(?![a-zA-Z])/g, names[language][1])

export const say = (eu: string, es: string, ar: string): LocalizedText => ({
    eu: localize('eu', eu),
    es: localize('es', es),
    ar: localize('ar', ar).replace(/\{,\}/g, '.')
})

/** The same formula in every language */
export const same = (value: string): LocalizedText => say(value, value, value)
