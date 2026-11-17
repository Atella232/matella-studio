import type { UnitLanguage } from '../../features/unit-v2/types'

/** The symbols of heads and tails in each language (H/T, C/X, A/G, و/ظ) */
export const coinFaces = (language: UnitLanguage): [string, string] => (({ eu: ['A', 'G'], es: ['C', 'X'], en: ['H', 'T'], ar: ['و', 'ظ'] }) as Record<UnitLanguage, [string, string]>)[language]
