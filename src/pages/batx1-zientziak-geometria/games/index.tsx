import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import '../../dbh3-proportzionaltasuna/games/Games.css'
import { FindKGame } from '../../dbh4-games/VectorGames'
import { BACH_GEOMETRY_MEMORY_PAIRS, createBachGeometryMemoryBoard } from './boards'
import { BACH_GEOMETRY_DETECTIVE_CASES, bachGeometryDetectiveNames, bachGeometryDetectiveTips, createBachGeometryDetectiveCases } from './detective'
import { BachGeometryGameArt } from './GameArt'
import { RadarGame, TwinsGame } from './GeometryGames'
import { BACH_GEOMETRY_GAME_RECORDS_KEY, bachGeometryGameModeForPath, bachGeometryGames, bachGeometryGameSlugs, type BachGeometryGameId } from './info'
import { BachGeometryRaceGame } from './RaceGame'

const info = (id: BachGeometryGameId) => bachGeometryGames.find((game) => game.id === id)!
const art = (id: BachGeometryGameId) => <BachGeometryGameArt game={id} />

const components: Record<BachGeometryGameId, (props: GameProps) => JSX.Element> = {
    race: BachGeometryRaceGame,
    twins: (props) => <TwinsGame {...props} game={info('twins')} art={art('twins')} />,
    radar: (props) => <RadarGame {...props} game={info('radar')} art={art('radar')} />,
    detective: (props) => <WorkedDetectiveGame {...props} config={{ game: info('detective'), art: art('detective'), cases: BACH_GEOMETRY_DETECTIVE_CASES, createCases: createBachGeometryDetectiveCases, names: bachGeometryDetectiveNames, tips: bachGeometryDetectiveTips }} />,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: info('memory'), art: art('memory'), pairs: BACH_GEOMETRY_MEMORY_PAIRS, createBoard: createBachGeometryMemoryBoard }} />,
    // The 4. DBH game, with this unit's levels and progress ids
    lines: (props) => <FindKGame {...props} game={info('lines')} art={art('lines')} />
}

const hubGames: HubGame<BachGeometryGameId>[] = bachGeometryGames.map((game) => ({ info: game, art: art(game.id), component: components[game.id] }))

export function BachGeometryGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={BACH_GEOMETRY_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={bachGeometryGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : bachGeometryGameSlugs[mode])}
        />
    )
}
