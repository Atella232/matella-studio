import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import '../../dbh3-proportzionaltasuna/games/Games.css'
import { CurveLaserGame } from '../../dbh4-games/CurveGames'
import { DomainGame } from '../../dbh4-games/EquationGames'
import { localize } from '../text'
import { OrderGame, UndoGame, WhereGame } from './BachFunctionsGames'
import { BACH_FUNCTIONS_MEMORY_PAIRS, createBachFunctionsMemoryBoard } from './boards'
import { BACH_FUNCTIONS_DETECTIVE_CASES, bachFunctionsDetectiveNames, bachFunctionsDetectiveTips, createBachFunctionsDetectiveCases } from './detective'
import { BachFunctionsGameArt } from './GameArt'
import { BACH_FUNCTIONS_GAME_RECORDS_KEY, BACH_FUNCTIONS_LASER_FAMILIES, bachFunctionsGameModeForPath, bachFunctionsGames, bachFunctionsGameSlugs, type BachFunctionsGameId } from './info'
import { BachFunctionsRaceGame } from './RaceGame'

const info = (id: BachFunctionsGameId) => bachFunctionsGames.find((game) => game.id === id)!
const art = (id: BachFunctionsGameId) => <BachFunctionsGameArt game={id} />

const components: Record<BachFunctionsGameId, (props: GameProps) => JSX.Element> = {
    race: BachFunctionsRaceGame,
    where: (props) => <WhereGame {...props} game={info('where')} art={art('where')} />,
    order: (props) => <OrderGame {...props} game={info('order')} art={art('order')} />,
    undo: (props) => <UndoGame {...props} game={info('undo')} art={art('undo')} />,
    detective: (props) => <WorkedDetectiveGame {...props} config={{ game: info('detective'), art: art('detective'), cases: BACH_FUNCTIONS_DETECTIVE_CASES, createCases: createBachFunctionsDetectiveCases, names: bachFunctionsDetectiveNames, tips: bachFunctionsDetectiveTips, localize: (latex, language) => localize(language, latex) }} />,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: info('memory'), art: art('memory'), pairs: BACH_FUNCTIONS_MEMORY_PAIRS, createBoard: createBachFunctionsMemoryBoard }} />,
    // The 4. DBH games, with this unit's levels and progress ids
    domain: (props) => <DomainGame {...props} game={info('domain')} art={art('domain')} />,
    laser: (props) => <CurveLaserGame {...props} game={info('laser')} art={art('laser')} families={BACH_FUNCTIONS_LASER_FAMILIES.map((families) => [...families])} />
}

const hubGames: HubGame<BachFunctionsGameId>[] = bachFunctionsGames.map((game) => ({ info: game, art: art(game.id), component: components[game.id] }))

export function BachFunctionsGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={BACH_FUNCTIONS_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={bachFunctionsGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : bachFunctionsGameSlugs[mode])}
        />
    )
}
