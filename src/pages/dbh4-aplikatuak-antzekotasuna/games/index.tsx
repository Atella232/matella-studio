import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { createSimilarityMemoryBoard, SIMILARITY_MEMORY_PAIRS } from './boards'
import { SimilarityGameArt } from './GameArt'
import { SIMILARITY_GAME_RECORDS_KEY, similarityGameModeForPath, similarityGames, similarityGameSlugs, type SimilarityGameId } from './info'
import { SimilarityRaceGame } from './RaceGame'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'

const memoryGame = similarityGames.find((game) => game.id === 'memory')!

const components: Record<SimilarityGameId, (props: GameProps) => JSX.Element> = {
    race: SimilarityRaceGame,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: memoryGame, art: <SimilarityGameArt game="memory" />, pairs: SIMILARITY_MEMORY_PAIRS, createBoard: createSimilarityMemoryBoard }} />
}

const hubGames: HubGame<SimilarityGameId>[] = similarityGames.map((info) => ({ info, art: <SimilarityGameArt game={info.id} />, component: components[info.id] }))

export function SimilarityGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={SIMILARITY_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={similarityGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : similarityGameSlugs[mode])}
        />
    )
}
