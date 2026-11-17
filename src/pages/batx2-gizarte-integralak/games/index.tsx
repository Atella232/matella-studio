import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import '../../dbh3-proportzionaltasuna/games/Games.css'
import { PrimitiveGame, SignedGame } from './Bach2gIntegralsGames'
import { BACH2G_INTEGRALS_MEMORY_PAIRS, createBach2gIntegralsMemoryBoard } from './boards'
import { BACH2G_INTEGRALS_DETECTIVE_CASES, bach2gIntegralsDetectiveNames, bach2gIntegralsDetectiveTips, createBach2gIntegralsDetectiveCases } from './detective'
import { Bach2gIntegralsGameArt } from './GameArt'
import { BACH2G_INTEGRALS_GAME_RECORDS_KEY, bach2gIntegralsGameModeForPath, bach2gIntegralsGames, bach2gIntegralsGameSlugs, type Bach2gIntegralsGameId } from './info'
import { Bach2gIntegralsRaceGame } from './RaceGame'

const info = (id: Bach2gIntegralsGameId) => bach2gIntegralsGames.find((game) => game.id === id)!
const art = (id: Bach2gIntegralsGameId) => <Bach2gIntegralsGameArt game={id} />

const components: Record<Bach2gIntegralsGameId, (props: GameProps) => JSX.Element> = {
    race: Bach2gIntegralsRaceGame,
    primitive: (props) => <PrimitiveGame {...props} game={info('primitive')} art={art('primitive')} />,
    signed: (props) => <SignedGame {...props} game={info('signed')} art={art('signed')} />,
    detective: (props) => <WorkedDetectiveGame {...props} config={{ game: info('detective'), art: art('detective'), cases: BACH2G_INTEGRALS_DETECTIVE_CASES, createCases: createBach2gIntegralsDetectiveCases, names: bach2gIntegralsDetectiveNames, tips: bach2gIntegralsDetectiveTips }} />,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: info('memory'), art: art('memory'), pairs: BACH2G_INTEGRALS_MEMORY_PAIRS, createBoard: createBach2gIntegralsMemoryBoard }} />
}

const hubGames: HubGame<Bach2gIntegralsGameId>[] = bach2gIntegralsGames.map((game) => ({ info: game, art: art(game.id), component: components[game.id] }))

export function Bach2gIntegralsGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={BACH2G_INTEGRALS_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={bach2gIntegralsGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : bach2gIntegralsGameSlugs[mode])}
        />
    )
}
