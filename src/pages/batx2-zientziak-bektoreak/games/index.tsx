import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import '../../dbh3-proportzionaltasuna/games/Games.css'
import { createSpaceMemoryBoard, SPACE_MEMORY_PAIRS } from './boards'
import { createSpaceDetectiveCases, SPACE_DETECTIVE_CASES, spaceDetectiveNames, spaceDetectiveTips } from './detective'
import { SpaceVectorsGameArt } from './GameArt'
import { SPACE_VECTORS_GAME_RECORDS_KEY, spaceVectorsGameModeForPath, spaceVectorsGames, spaceVectorsGameSlugs, type SpaceVectorsGameId } from './info'
import { SpaceVectorsRaceGame } from './RaceGame'
import { CrossGame, FlatGame, KindGame } from './SpaceGames'

const info = (id: SpaceVectorsGameId) => spaceVectorsGames.find((game) => game.id === id)!
const art = (id: SpaceVectorsGameId) => <SpaceVectorsGameArt game={id} />

const components: Record<SpaceVectorsGameId, (props: GameProps) => JSX.Element> = {
    race: SpaceVectorsRaceGame,
    kind: (props) => <KindGame {...props} game={info('kind')} art={art('kind')} />,
    cross: (props) => <CrossGame {...props} game={info('cross')} art={art('cross')} />,
    flat: (props) => <FlatGame {...props} game={info('flat')} art={art('flat')} />,
    detective: (props) => <WorkedDetectiveGame {...props} config={{ game: info('detective'), art: art('detective'), cases: SPACE_DETECTIVE_CASES, createCases: createSpaceDetectiveCases, names: spaceDetectiveNames, tips: spaceDetectiveTips }} />,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: info('memory'), art: art('memory'), pairs: SPACE_MEMORY_PAIRS, createBoard: createSpaceMemoryBoard }} />
}

const hubGames: HubGame<SpaceVectorsGameId>[] = spaceVectorsGames.map((game) => ({ info: game, art: art(game.id), component: components[game.id] }))

export function SpaceVectorsGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={SPACE_VECTORS_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={spaceVectorsGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : spaceVectorsGameSlugs[mode])}
        />
    )
}
