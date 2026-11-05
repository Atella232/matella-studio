import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh3-proportzionaltasuna/games/Games.css'
import { localize } from '../../dbh4-akademikoak-trigonometria/text'
import { OtherRatiosGame, UnitCircleGame } from '../../dbh4-games/TrigGames'
import { createTrianglesMemoryBoard, TRIANGLES_MEMORY_PAIRS } from './boards'
import { createTrianglesDetectiveCases, TRIANGLES_DETECTIVE_CASES, trianglesDetectiveNames, trianglesDetectiveTips } from './detective'
import { TrianglesGameArt } from './GameArt'
import { TRIANGLES_GAME_RECORDS_KEY, trianglesGameModeForPath, trianglesGames, trianglesGameSlugs, type TrianglesGameId } from './info'
import { TrianglesRaceGame } from './RaceGame'
import { CountGame, PiecesGame, StationGame } from './TrianglesGames'

const info = (id: TrianglesGameId) => trianglesGames.find((game) => game.id === id)!
const art = (id: TrianglesGameId) => <TrianglesGameArt game={id} />

const components: Record<TrianglesGameId, (props: GameProps) => JSX.Element> = {
    race: TrianglesRaceGame,
    count: (props) => <CountGame {...props} game={info('count')} art={art('count')} />,
    pieces: (props) => <PiecesGame {...props} game={info('pieces')} art={art('pieces')} />,
    station: (props) => <StationGame {...props} game={info('station')} art={art('station')} />,
    detective: (props) => <WorkedDetectiveGame {...props} config={{ game: info('detective'), art: art('detective'), cases: TRIANGLES_DETECTIVE_CASES, createCases: createTrianglesDetectiveCases, names: trianglesDetectiveNames, tips: trianglesDetectiveTips, localize: (latex, language) => localize(language, latex) }} />,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: info('memory'), art: art('memory'), pairs: TRIANGLES_MEMORY_PAIRS, createBoard: createTrianglesMemoryBoard }} />,
    // The 4. DBH games, with this unit's levels and progress ids
    circle: (props) => <UnitCircleGame {...props} game={info('circle')} art={art('circle')} />,
    ratios: (props) => <OtherRatiosGame {...props} game={info('ratios')} art={art('ratios')} />
}

const hubGames: HubGame<TrianglesGameId>[] = trianglesGames.map((game) => ({ info: game, art: art(game.id), component: components[game.id] }))

export function TrianglesGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={TRIANGLES_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={trianglesGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : trianglesGameSlugs[mode])}
        />
    )
}
