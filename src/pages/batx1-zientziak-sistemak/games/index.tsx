import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import '../../dbh3-proportzionaltasuna/games/Games.css'
import { CrossingPointGame } from '../../dbh4-games/EquationGames'
import { TouchSolutionGame } from '../../dbh4-games/SystemGames'
import { LastRowGame, ZeroGame } from './BachSystemsGames'
import { BACH_SYSTEMS_MEMORY_PAIRS, createBachSystemsMemoryBoard } from './boards'
import { BACH_SYSTEMS_DETECTIVE_CASES, bachSystemsDetectiveNames, bachSystemsDetectiveTips, createBachSystemsDetectiveCases } from './detective'
import { BachSystemsGameArt } from './GameArt'
import { BACH_SYSTEMS_GAME_RECORDS_KEY, bachSystemsGameModeForPath, bachSystemsGames, bachSystemsGameSlugs, type BachSystemsGameId } from './info'
import { BachSystemsRaceGame } from './RaceGame'

const info = (id: BachSystemsGameId) => bachSystemsGames.find((game) => game.id === id)!
const art = (id: BachSystemsGameId) => <BachSystemsGameArt game={id} />

const components: Record<BachSystemsGameId, (props: GameProps) => JSX.Element> = {
    race: BachSystemsRaceGame,
    zero: (props) => <ZeroGame {...props} game={info('zero')} art={art('zero')} />,
    'last-row': (props) => <LastRowGame {...props} game={info('last-row')} art={art('last-row')} />,
    detective: (props) => <WorkedDetectiveGame {...props} config={{ game: info('detective'), art: art('detective'), cases: BACH_SYSTEMS_DETECTIVE_CASES, createCases: createBachSystemsDetectiveCases, names: bachSystemsDetectiveNames, tips: bachSystemsDetectiveTips }} />,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: info('memory'), art: art('memory'), pairs: BACH_SYSTEMS_MEMORY_PAIRS, createBoard: createBachSystemsMemoryBoard }} />,
    // The 4. DBH games, with this unit's levels and progress ids
    cross: (props) => <CrossingPointGame {...props} game={info('cross')} art={art('cross')} />,
    touch: (props) => <TouchSolutionGame {...props} game={info('touch')} art={art('touch')} />
}

const hubGames: HubGame<BachSystemsGameId>[] = bachSystemsGames.map((game) => ({ info: game, art: art(game.id), component: components[game.id] }))

export function BachSystemsGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={BACH_SYSTEMS_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={bachSystemsGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : bachSystemsGameSlugs[mode])}
        />
    )
}
