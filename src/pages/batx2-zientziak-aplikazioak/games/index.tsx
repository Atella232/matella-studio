import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { ExtremaGame, ShapeGame } from '../../batx1-zientziak-aplikazioak/games/BachApplicationsGames'
import { localize } from '../../batx1-zientziak-funtzioak/text'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import '../../dbh3-proportzionaltasuna/games/Games.css'
import { HopitalGame, OptimizeGame, RolleGame } from './Bach2ApplicationsGames'
import { BACH2_APPLICATIONS_MEMORY_PAIRS, createBach2ApplicationsMemoryBoard } from './boards'
import { BACH2_APPLICATIONS_DETECTIVE_CASES, bach2ApplicationsDetectiveNames, bach2ApplicationsDetectiveTips, createBach2ApplicationsDetectiveCases } from './detective'
import { Bach2ApplicationsGameArt } from './GameArt'
import { BACH2_APPLICATIONS_GAME_RECORDS_KEY, bach2ApplicationsGameModeForPath, bach2ApplicationsGames, bach2ApplicationsGameSlugs, type Bach2ApplicationsGameId } from './info'
import { Bach2ApplicationsRaceGame } from './RaceGame'

const info = (id: Bach2ApplicationsGameId) => bach2ApplicationsGames.find((game) => game.id === id)!
const art = (id: Bach2ApplicationsGameId) => <Bach2ApplicationsGameArt game={id} />

const components: Record<Bach2ApplicationsGameId, (props: GameProps) => JSX.Element> = {
    race: Bach2ApplicationsRaceGame,
    hopital: (props) => <HopitalGame {...props} game={info('hopital')} art={art('hopital')} />,
    rolle: (props) => <RolleGame {...props} game={info('rolle')} art={art('rolle')} />,
    optimize: (props) => <OptimizeGame {...props} game={info('optimize')} art={art('optimize')} />,
    detective: (props) => <WorkedDetectiveGame {...props} config={{ game: info('detective'), art: art('detective'), cases: BACH2_APPLICATIONS_DETECTIVE_CASES, createCases: createBach2ApplicationsDetectiveCases, names: bach2ApplicationsDetectiveNames, tips: bach2ApplicationsDetectiveTips, localize: (latex, language) => localize(language, latex) }} />,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: info('memory'), art: art('memory'), pairs: BACH2_APPLICATIONS_MEMORY_PAIRS, createBoard: createBach2ApplicationsMemoryBoard }} />,
    // The Aplikazioak 1.º games, with this unit's levels and progress ids
    extrema: (props) => <ExtremaGame {...props} game={info('extrema')} art={art('extrema')} />,
    shape: (props) => <ShapeGame {...props} game={info('shape')} art={art('shape')} />
}

const hubGames: HubGame<Bach2ApplicationsGameId>[] = bach2ApplicationsGames.map((game) => ({ info: game, art: art(game.id), component: components[game.id] }))

export function Bach2ApplicationsGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={BACH2_APPLICATIONS_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={bach2ApplicationsGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : bach2ApplicationsGameSlugs[mode])}
        />
    )
}
