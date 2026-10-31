import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import '../../dbh3-proportzionaltasuna/games/Games.css'
import { createGeometry3MemoryBoard, GEOMETRY3_MEMORY_PAIRS } from './boards'
import { AnglesGame } from './AnglesGame'
import { DetectiveGame } from './DetectiveGame'
import { Geometry3GameArt } from './GameArt'
import { GEOMETRY3_GAME_RECORDS_KEY, geometry3GameModeForPath, geometry3Games, geometry3GameSlugs, type Geometry3GameId } from './info'
import { Geometry3RaceGame } from './RaceGame'
import { PointGame } from './PointGame'
import { TriangleGame } from './TriangleGame'

const memoryGame = geometry3Games.find((game) => game.id === 'memory')!

const components: Record<Geometry3GameId, (props: GameProps) => JSX.Element> = {
    race: Geometry3RaceGame,
    angles: AnglesGame,
    triangle: TriangleGame,
    point: PointGame,
    detective: DetectiveGame,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: memoryGame, art: <Geometry3GameArt game="memory" />, pairs: GEOMETRY3_MEMORY_PAIRS, createBoard: createGeometry3MemoryBoard }} />
}

const hubGames: HubGame<Geometry3GameId>[] = geometry3Games.map((info) => ({ info, art: <Geometry3GameArt game={info.id} />, component: components[info.id] }))

export function Geometry3Games({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={GEOMETRY3_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={geometry3GameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : geometry3GameSlugs[mode])}
        />
    )
}
