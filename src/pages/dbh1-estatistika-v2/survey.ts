import type { LocalizedText } from '../../features/unit-v2/types'

/** The class survey: favourite sport of 20 students */
export const sportSurvey: Array<{ name: LocalizedText; count: number; color: string }> = [
    { name: { eu: 'Futbola', es: 'Fútbol', ar: 'كرة القدم' }, count: 8, color: 'var(--blue, #2f6fdb)' },
    { name: { eu: 'Saskibaloia', es: 'Baloncesto', ar: 'كرة السلة' }, count: 5, color: 'var(--coral, #d9502e)' },
    { name: { eu: 'Igeriketa', es: 'Natación', ar: 'السباحة' }, count: 4, color: 'var(--mustard, #e0a100)' },
    { name: { eu: 'Pilota', es: 'Pelota', ar: 'الكرة الباسكية' }, count: 3, color: 'var(--green, #267b53)' }
]
