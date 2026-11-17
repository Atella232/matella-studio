import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import '../../dbh3-proportzionaltasuna/games/Games.css'
import { MatchSlopeGame, NextCostGame } from './Bach2gDerivativesGames'
import { BACH2G_DERIVATIVES_MEMORY_PAIRS, createBach2gDerivativesMemoryBoard } from './boards'
import { BACH2G_DERIVATIVES_DETECTIVE_CASES, bach2gDerivativesDetectiveNames, bach2gDerivativesDetectiveTips, createBach2gDerivativesDetectiveCases } from './detective'
import { Bach2gDerivativesGameArt } from './GameArt'
import { BACH2G_DERIVATIVES_GAME_RECORDS_KEY, bach2gDerivativesGameModeForPath, bach2gDerivativesGames, bach2gDerivativesGameSlugs, type Bach2gDerivativesGameId } from './info'
import { Bach2gDerivativesRaceGame } from './RaceGame'

const info = (id: Bach2gDerivativesGameId) => bach2gDerivativesGames.find((game) => game.id === id)!
const art = (id: Bach2gDerivativesGameId) => <Bach2gDerivativesGameArt game={id} />

const components: Record<Bach2gDerivativesGameId, (props: GameProps) => JSX.Element> = {
    race: Bach2gDerivativesRaceGame,
    'next-cost': (props) => <NextCostGame {...props} game={info('next-cost')} art={art('next-cost')} />,
    'match-slope': (props) => <MatchSlopeGame {...props} game={info('match-slope')} art={art('match-slope')} />,
    detective: (props) => <WorkedDetectiveGame {...props} config={{ game: info('detective'), art: art('detective'), cases: BACH2G_DERIVATIVES_DETECTIVE_CASES, createCases: createBach2gDerivativesDetectiveCases, names: bach2gDerivativesDetectiveNames, tips: bach2gDerivativesDetectiveTips }} />,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: info('memory'), art: art('memory'), pairs: BACH2G_DERIVATIVES_MEMORY_PAIRS, createBoard: createBach2gDerivativesMemoryBoard }} />
}

const hubGames: HubGame<Bach2gDerivativesGameId>[] = bach2gDerivativesGames.map((game) => ({ info: game, art: art(game.id), component: components[game.id] }))

export function Bach2gDerivativesGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={BACH2G_DERIVATIVES_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={bach2gDerivativesGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : bach2gDerivativesGameSlugs[mode])}
        />
    )
}
