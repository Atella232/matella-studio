import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import '../../dbh3-proportzionaltasuna/games/Games.css'
import { BoxGame } from '../../dbh4-games/StatisticsGames'
import { HistogramGame, StandoutGame } from './BachStatsGames'
import { BACH_STATS_MEMORY_PAIRS, createBachStatsMemoryBoard } from './boards'
import { BACH_STATS_DETECTIVE_CASES, bachStatsDetectiveNames, bachStatsDetectiveTips, createBachStatsDetectiveCases } from './detective'
import { BachStatsGameArt } from './GameArt'
import { BACH_STATS_GAME_RECORDS_KEY, bachStatsGameModeForPath, bachStatsGames, bachStatsGameSlugs, type BachStatsGameId } from './info'
import { BachStatsRaceGame } from './RaceGame'

const info = (id: BachStatsGameId) => bachStatsGames.find((game) => game.id === id)!
const art = (id: BachStatsGameId) => <BachStatsGameArt game={id} />

const components: Record<BachStatsGameId, (props: GameProps) => JSX.Element> = {
    race: BachStatsRaceGame,
    standout: (props) => <StandoutGame {...props} game={info('standout')} art={art('standout')} />,
    histogram: (props) => <HistogramGame {...props} game={info('histogram')} art={art('histogram')} />,
    detective: (props) => <WorkedDetectiveGame {...props} config={{ game: info('detective'), art: art('detective'), cases: BACH_STATS_DETECTIVE_CASES, createCases: createBachStatsDetectiveCases, names: bachStatsDetectiveNames, tips: bachStatsDetectiveTips }} />,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: info('memory'), art: art('memory'), pairs: BACH_STATS_MEMORY_PAIRS, createBoard: createBachStatsMemoryBoard }} />,
    // The 4. DBH box plot, with this unit's progress ids
    box: (props) => <BoxGame {...props} game={info('box')} art={art('box')} />
}

const hubGames: HubGame<BachStatsGameId>[] = bachStatsGames.map((game) => ({ info: game, art: art(game.id), component: components[game.id] }))

export function BachStatsGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={BACH_STATS_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={bachStatsGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : bachStatsGameSlugs[mode])}
        />
    )
}
