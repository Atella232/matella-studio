import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import '../../dbh3-proportzionaltasuna/games/Games.css'
import { CheckSolutionsGame, PaintSolutionGame } from '../../dbh4-games/EquationGames'
import { RootHuntGame, SimplifyGame } from '../../dbh4-games/PolynomialGames'
import { SignsGame, ValidGame } from './BachEquationsGames'
import { BACH_EQUATIONS_MEMORY_PAIRS, createBachEquationsMemoryBoard } from './boards'
import { BACH_EQUATIONS_DETECTIVE_CASES, bachEquationsDetectiveNames, bachEquationsDetectiveTips, createBachEquationsDetectiveCases } from './detective'
import { BachEquationsGameArt } from './GameArt'
import { BACH_EQUATIONS_GAME_RECORDS_KEY, bachEquationsGameModeForPath, bachEquationsGames, bachEquationsGameSlugs, type BachEquationsGameId } from './info'
import { BachEquationsRaceGame } from './RaceGame'

const info = (id: BachEquationsGameId) => bachEquationsGames.find((game) => game.id === id)!
const art = (id: BachEquationsGameId) => <BachEquationsGameArt game={id} />

const components: Record<BachEquationsGameId, (props: GameProps) => JSX.Element> = {
    race: BachEquationsRaceGame,
    valid: (props) => <ValidGame {...props} game={info('valid')} art={art('valid')} />,
    signs: (props) => <SignsGame {...props} game={info('signs')} art={art('signs')} />,
    detective: (props) => <WorkedDetectiveGame {...props} config={{ game: info('detective'), art: art('detective'), cases: BACH_EQUATIONS_DETECTIVE_CASES, createCases: createBachEquationsDetectiveCases, names: bachEquationsDetectiveNames, tips: bachEquationsDetectiveTips }} />,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: info('memory'), art: art('memory'), pairs: BACH_EQUATIONS_MEMORY_PAIRS, createBoard: createBachEquationsMemoryBoard }} />,
    // The 4. DBH games, with this unit's levels and progress ids
    check: (props) => <CheckSolutionsGame {...props} game={info('check')} art={art('check')} />,
    paint: (props) => <PaintSolutionGame {...props} game={info('paint')} art={art('paint')} />,
    hunt: (props) => <RootHuntGame {...props} game={info('hunt')} art={art('hunt')} />,
    simplify: (props) => <SimplifyGame {...props} game={info('simplify')} art={art('simplify')} />
}

const hubGames: HubGame<BachEquationsGameId>[] = bachEquationsGames.map((game) => ({ info: game, art: art(game.id), component: components[game.id] }))

export function BachEquationsGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={BACH_EQUATIONS_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={bachEquationsGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : bachEquationsGameSlugs[mode])}
        />
    )
}
