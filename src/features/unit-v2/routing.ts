import type { UnitSection } from './types.ts'

export type PracticeMode = 'guided' | 'bank'

/** Legacy section URLs (Spanish and Basque) open the matching V2 section */
export function sectionForPath(pathname: string): UnitSection {
    if (/\/(?:teoria)$/.test(pathname)) return 'learn'
    if (/\/(?:laboratorio|laborategia)$/.test(pathname)) return 'lab'
    if (/\/(?:ejercicios|ariketak)$/.test(pathname)) return 'practice'
    if (/\/(?:retos|misioa)$/.test(pathname)) return 'challenges'
    if (/\/(?:juegos|jokuak)(?:\/|$)/.test(pathname)) return 'play'
    return 'route'
}

export function practiceModeForPath(pathname: string): PracticeMode {
    return /\/(?:ejercicios|ariketak)$/.test(pathname) ? 'bank' : 'guided'
}
