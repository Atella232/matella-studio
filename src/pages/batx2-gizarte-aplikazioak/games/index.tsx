import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import '../../dbh3-proportzionaltasuna/games/Games.css'
import { ExtremeGame, OptimizeGame } from './Bach2gApplicationsGames'
import { BACH2G_APPLICATIONS_MEMORY_PAIRS, createBach2gApplicationsMemoryBoard } from './boards'
import { BACH2G_APPLICATIONS_DETECTIVE_CASES, bach2gApplicationsDetectiveNames, bach2gApplicationsDetectiveTips, createBach2gApplicationsDetectiveCases } from './detective'
import { Bach2gApplicationsGameArt } from './GameArt'
import { BACH2G_APPLICATIONS_GAME_RECORDS_KEY, bach2gApplicationsGameModeForPath, bach2gApplicationsGames, bach2gApplicationsGameSlugs, type Bach2gApplicationsGameId } from './info'
import { Bach2gApplicationsRaceGame } from './RaceGame'

const info = (id: Bach2gApplicationsGameId) => bach2gApplicationsGames.find((game) => game.id === id)!
const art = (id: Bach2gApplicationsGameId) => <Bach2gApplicationsGameArt game={id} />

const components: Record<Bach2gApplicationsGameId, (props: GameProps) => JSX.Element> = {
    race: Bach2gApplicationsRaceGame,
    extreme: (props) => <ExtremeGame {...props} game={info('extreme')} art={art('extreme')} />,
    optimize: (props) => <OptimizeGame {...props} game={info('optimize')} art={art('optimize')} />,
    detective: (props) => <WorkedDetectiveGame {...props} config={{ game: info('detective'), art: art('detective'), cases: BACH2G_APPLICATIONS_DETECTIVE_CASES, createCases: createBach2gApplicationsDetectiveCases, names: bach2gApplicationsDetectiveNames, tips: bach2gApplicationsDetectiveTips }} />,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: info('memory'), art: art('memory'), pairs: BACH2G_APPLICATIONS_MEMORY_PAIRS, createBoard: createBach2gApplicationsMemoryBoard }} />
}

const hubGames: HubGame<Bach2gApplicationsGameId>[] = bach2gApplicationsGames.map((game) => ({ info: game, art: art(game.id), component: components[game.id] }))

export function Bach2gApplicationsGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={BACH2G_APPLICATIONS_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={bach2gApplicationsGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : bach2gApplicationsGameSlugs[mode])}
        />
    )
}
