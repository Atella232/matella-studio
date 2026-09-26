import type { PrototypeSection } from './content.ts'
import type { GameId } from './games/records.ts'

export type PracticeMode = 'guided' | 'bank'
/** 'hub' is the list of games */
export type GameMode = 'hub' | GameId

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
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['memory', 'memoria'].includes(game)) return 'memory'
    if (['diana', 'itua'].includes(game)) return 'target'
    // The old pizza game became the fraction wall
    if (['muro', 'horma', 'pizza'].includes(game)) return 'wall'
    return 'hub'
}
