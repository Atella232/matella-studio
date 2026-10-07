import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { createAreasVolumesMemoryBoard, AREAS_VOLUMES_MEMORY_PAIRS } from './boards'
import { AreasVolumesGameArt } from './GameArt'
import { AREAS_VOLUMES_GAME_RECORDS_KEY, areasVolumesGameModeForPath, areasVolumesGames, areasVolumesGameSlugs, type AreasVolumesGameId } from './info'
import { AreasVolumesRaceGame } from './RaceGame'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'

const memoryGame = areasVolumesGames.find((game) => game.id === 'memory')!

const components: Record<AreasVolumesGameId, (props: GameProps) => JSX.Element> = {
    race: AreasVolumesRaceGame,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: memoryGame, art: <AreasVolumesGameArt game="memory" />, pairs: AREAS_VOLUMES_MEMORY_PAIRS, createBoard: createAreasVolumesMemoryBoard }} />
}

const hubGames: HubGame<AreasVolumesGameId>[] = areasVolumesGames.map((info) => ({ info, art: <AreasVolumesGameArt game={info.id} />, component: components[info.id] }))

export function AreasVolumesGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={AREAS_VOLUMES_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={areasVolumesGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : areasVolumesGameSlugs[mode])}
        />
    )
}
