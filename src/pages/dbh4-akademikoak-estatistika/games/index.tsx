import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { createStatisticsAkMemoryBoard, STATISTICS_AK_MEMORY_PAIRS } from './boards'
import { StatisticsAkGameArt } from './GameArt'
import { STATISTICS_AK_GAME_RECORDS_KEY, statisticsAkGameModeForPath, statisticsAkGames, statisticsAkGameSlugs, type StatisticsAkGameId } from './info'
import { StatisticsAkRaceGame } from './RaceGame'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'

const memoryGame = statisticsAkGames.find((game) => game.id === 'memory')!

const components: Record<StatisticsAkGameId, (props: GameProps) => JSX.Element> = {
    race: StatisticsAkRaceGame,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: memoryGame, art: <StatisticsAkGameArt game="memory" />, pairs: STATISTICS_AK_MEMORY_PAIRS, createBoard: createStatisticsAkMemoryBoard }} />
}

const hubGames: HubGame<StatisticsAkGameId>[] = statisticsAkGames.map((info) => ({ info, art: <StatisticsAkGameArt game={info.id} />, component: components[info.id] }))

export function StatisticsAkGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={STATISTICS_AK_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={statisticsAkGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : statisticsAkGameSlugs[mode])}
        />
    )
}
