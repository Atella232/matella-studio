import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { createStatisticsMemoryBoard, STATISTICS_MEMORY_PAIRS } from './boards'
import { StatisticsGameArt } from './GameArt'
import { STATISTICS_GAME_RECORDS_KEY, statisticsGameModeForPath, statisticsGames, statisticsGameSlugs, type StatisticsGameId } from './info'
import { MeanGame } from './MeanGame'
import { StatisticsRaceGame } from './RaceGame'
import './StatisticsGames.css'

const memoryGame = statisticsGames.find((game) => game.id === 'memory')!

const components: Record<StatisticsGameId, (props: GameProps) => JSX.Element> = {
    race: StatisticsRaceGame,
    mean: MeanGame,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: memoryGame, art: <StatisticsGameArt game="memory" />, pairs: STATISTICS_MEMORY_PAIRS, createBoard: createStatisticsMemoryBoard }} />
}

const hubGames: HubGame<StatisticsGameId>[] = statisticsGames.map((info) => ({ info, art: <StatisticsGameArt game={info.id} />, component: components[info.id] }))

export function StatisticsIntroGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            title={{ eu: 'Jolastu datuekin eta zoriarekin', es: 'Juega con datos y azar', ar: 'العب بالبيانات والصدفة' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={statisticsGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : statisticsGameSlugs[mode])}
        />
    )
}
