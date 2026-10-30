import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { createAreasSimilarityMemoryBoard, AREAS_SIMILARITY_MEMORY_PAIRS } from './boards'
import { AreasSimilarityGameArt } from './GameArt'
import { AREAS_SIMILARITY_GAME_RECORDS_KEY, areasSimilarityGameModeForPath, areasSimilarityGames, areasSimilarityGameSlugs, type AreasSimilarityGameId } from './info'
import { AreasSimilarityRaceGame } from './RaceGame'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'

const memoryGame = areasSimilarityGames.find((game) => game.id === 'memory')!

const components: Record<AreasSimilarityGameId, (props: GameProps) => JSX.Element> = {
    race: AreasSimilarityRaceGame,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: memoryGame, art: <AreasSimilarityGameArt game="memory" />, pairs: AREAS_SIMILARITY_MEMORY_PAIRS, createBoard: createAreasSimilarityMemoryBoard }} />
}

const hubGames: HubGame<AreasSimilarityGameId>[] = areasSimilarityGames.map((info) => ({ info, art: <AreasSimilarityGameArt game={info.id} />, component: components[info.id] }))

export function AreasSimilarityGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={AREAS_SIMILARITY_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={areasSimilarityGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : areasSimilarityGameSlugs[mode])}
        />
    )
}
