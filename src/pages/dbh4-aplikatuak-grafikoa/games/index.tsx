import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { createGraphsMemoryBoard, GRAPHS_MEMORY_PAIRS } from './boards'
import { GraphsGameArt } from './GameArt'
import { GRAPHS_GAME_RECORDS_KEY, graphsGameModeForPath, graphsGames, graphsGameSlugs, type GraphsGameId } from './info'
import { GraphsRaceGame } from './RaceGame'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'

const memoryGame = graphsGames.find((game) => game.id === 'memory')!

const components: Record<GraphsGameId, (props: GameProps) => JSX.Element> = {
    race: GraphsRaceGame,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: memoryGame, art: <GraphsGameArt game="memory" />, pairs: GRAPHS_MEMORY_PAIRS, createBoard: createGraphsMemoryBoard }} />
}

const hubGames: HubGame<GraphsGameId>[] = graphsGames.map((info) => ({ info, art: <GraphsGameArt game={info.id} />, component: components[info.id] }))

export function GraphsGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={GRAPHS_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={graphsGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : graphsGameSlugs[mode])}
        />
    )
}
