import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/games/Games.css'
import { createStatisticsMemoryBoard, STATISTICS_MEMORY_PAIRS } from './boards'
import { StatisticsGameArt } from './GameArt'
import { STATISTICS_GAME_RECORDS_KEY, statisticsGameModeForPath, statisticsGames, statisticsGameSlugs, type StatisticsGameId } from './info'
import { StatisticsRaceGame } from './RaceGame'

const memoryGame = statisticsGames.find((game) => game.id === 'memory')!

const components: Record<StatisticsGameId, (props: GameProps) => JSX.Element> = {
    race: StatisticsRaceGame,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: memoryGame, art: <StatisticsGameArt game="memory" />, pairs: STATISTICS_MEMORY_PAIRS, createBoard: createStatisticsMemoryBoard }} />
}

const hubGames: HubGame<StatisticsGameId>[] = statisticsGames.map((game) => ({ info: game, art: <StatisticsGameArt game={game.id} />, component: components[game.id] }))

export function StatisticsGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={STATISTICS_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={statisticsGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : statisticsGameSlugs[mode])}
        />
    )
}
