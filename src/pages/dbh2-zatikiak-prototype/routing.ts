import type { GameId } from './games/records.ts'

export { practiceModeForPath, sectionForPath, type PracticeMode } from '../../features/unit-v2/routing.ts'

/** 'hub' is the list of games */
export type GameMode = 'hub' | GameId

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const gameSlugs: Record<GameId, string> = { race: 'lasterketa', target: 'itua', wall: 'horma', memory: 'memoria' }

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
