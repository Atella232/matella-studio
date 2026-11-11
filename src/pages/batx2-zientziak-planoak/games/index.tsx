import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import '../../dbh3-proportzionaltasuna/games/Games.css'
import { createPlanesMemoryBoard, PLANES_MEMORY_PAIRS } from './boards'
import { createPlanesDetectiveCases, PLANES_DETECTIVE_CASES, planesDetectiveNames, planesDetectiveTips } from './detective'
import { LinesPlanesGameArt } from './GameArt'
import { LINES_PLANES_GAME_RECORDS_KEY, linesPlanesGameModeForPath, linesPlanesGames, linesPlanesGameSlugs, type LinesPlanesGameId } from './info'
import { ClassifyGame, MissingGame, TwinsGame } from './PlanesGames'
import { LinesPlanesRaceGame } from './RaceGame'

const info = (id: LinesPlanesGameId) => linesPlanesGames.find((game) => game.id === id)!
const art = (id: LinesPlanesGameId) => <LinesPlanesGameArt game={id} />

const components: Record<LinesPlanesGameId, (props: GameProps) => JSX.Element> = {
    race: LinesPlanesRaceGame,
    twins: (props) => <TwinsGame {...props} game={info('twins')} art={art('twins')} />,
    classify: (props) => <ClassifyGame {...props} game={info('classify')} art={art('classify')} />,
    missing: (props) => <MissingGame {...props} game={info('missing')} art={art('missing')} />,
    detective: (props) => <WorkedDetectiveGame {...props} config={{ game: info('detective'), art: art('detective'), cases: PLANES_DETECTIVE_CASES, createCases: createPlanesDetectiveCases, names: planesDetectiveNames, tips: planesDetectiveTips }} />,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: info('memory'), art: art('memory'), pairs: PLANES_MEMORY_PAIRS, createBoard: createPlanesMemoryBoard }} />
}

const hubGames: HubGame<LinesPlanesGameId>[] = linesPlanesGames.map((game) => ({ info: game, art: art(game.id), component: components[game.id] }))

export function LinesPlanesGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={LINES_PLANES_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={linesPlanesGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : linesPlanesGameSlugs[mode])}
        />
    )
}
