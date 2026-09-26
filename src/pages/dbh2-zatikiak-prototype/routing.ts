import type { PrototypeSection } from './content.ts'

export type PracticeMode = 'guided' | 'bank'
export type GameMode = 'equivalence' | 'pizza' | 'memory' | 'race'

export function sectionForPath(pathname: string): PrototypeSection {
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

export function gameModeForPath(pathname: string): GameMode {
    if (/\/(?:juegos|jokuak)\/pizza$/.test(pathname)) return 'pizza'
    if (/\/(?:juegos|jokuak)\/memory$/.test(pathname)) return 'memory'
    if (/\/(?:juegos|jokuak)\/(?:carrera|lasterketa)$/.test(pathname)) return 'race'
    return 'equivalence'
}
