import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { AngleGame } from './AngleGame'
import { createGeometryMemoryBoard, GEOMETRY_MEMORY_PAIRS } from './boards'
import { GeometryGameArt } from './GameArt'
import { GEOMETRY_GAME_RECORDS_KEY, geometryGameModeForPath, geometryGames, geometryGameSlugs, type GeometryGameId } from './info'
import { GeometryRaceGame } from './RaceGame'
import './GeometryGames.css'

const memoryGame = geometryGames.find((game) => game.id === 'memory')!

const components: Record<GeometryGameId, (props: GameProps) => JSX.Element> = {
    race: GeometryRaceGame,
    angles: AngleGame,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: memoryGame, art: <GeometryGameArt game="memory" />, pairs: GEOMETRY_MEMORY_PAIRS, createBoard: createGeometryMemoryBoard }} />
}

const hubGames: HubGame<GeometryGameId>[] = geometryGames.map((info) => ({ info, art: <GeometryGameArt game={info.id} />, component: components[info.id] }))

export function GeometryIntroGames({ language, pathname, openGame, completedIds, onComplete }: {
    language: UnitLanguage
    pathname: string
    openGame: (slug: string | null) => void
    completedIds: number[]
    onComplete: (id: number) => void
}) {
    return (
        <GamesHub
            language={language}
            games={hubGames}
            recordsKey={GEOMETRY_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu irudiekin eta angeluekin', es: 'Juega con figuras y ángulos', ar: 'العب بالأشكال والزوايا' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={geometryGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : geometryGameSlugs[mode])}
        />
    )
}
