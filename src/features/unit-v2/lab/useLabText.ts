import { pickText, type LocalizedText, type UnitLanguage } from '../types.ts'

export function useLabText(language: UnitLanguage): (text: LocalizedText) => string {
    return (text: LocalizedText) => pickText(language, text)
}
