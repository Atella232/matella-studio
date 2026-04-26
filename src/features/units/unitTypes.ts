export type UnitLanguage = 'eu' | 'es' | 'ar'

export type UnitSectionId = 'home' | 'teoria' | 'laboratorio' | 'retos' | 'juegos' | 'ejercicios'

export type LegacyUnitSectionId = 'laborategia' | 'misioa' | 'jokuak' | 'ariketak'

export interface LocalizedText {
    eu: string
    es: string
    ar: string
}

export interface UnitRouteSet {
    base: string
    teoria: string
    laboratorio: string
    retos: string
    juegos: string
    ejercicios?: string
}

export interface UnitFeature {
    id: Exclude<UnitSectionId, 'home'>
    icon: string
    title: LocalizedText
    description: LocalizedText
    path: string
}

export interface UnitHomeData {
    title: LocalizedText
    subtitle: LocalizedText
    description: LocalizedText
    features: UnitFeature[]
}

export interface UnitQualityStatus {
    build: boolean
    lint: boolean
    responsive: boolean
    languages: boolean
    accessibility: boolean
    links: boolean
}

export function normalizeUnitLanguage(language?: string): UnitLanguage {
    if (language?.startsWith('es')) return 'es'
    if (language?.startsWith('ar')) return 'ar'
    return 'eu'
}

export function pickLocalizedText(language: UnitLanguage, value: LocalizedText): string {
    return value[language]
}
