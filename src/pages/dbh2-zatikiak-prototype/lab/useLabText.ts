import { pickText, type LocalizedText, type PrototypeLanguage } from '../content'

export function useLabText(language: PrototypeLanguage): (text: LocalizedText) => string {
    return (text: LocalizedText) => pickText(language, text)
}
