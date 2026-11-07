import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import '../../dbh3-proportzionaltasuna/games/Games.css'
import { FindKGame, VectorJumpGame } from '../../dbh4-games/VectorGames'
import { KindGame, PolygonGame } from './BachVectorsGames'
import { BACH_VECTORS_MEMORY_PAIRS, createBachVectorsMemoryBoard } from './boards'
import { BACH_VECTORS_DETECTIVE_CASES, bachVectorsDetectiveNames, bachVectorsDetectiveTips, createBachVectorsDetectiveCases } from './detective'
import { BachVectorsGameArt } from './GameArt'
import { BACH_VECTORS_GAME_RECORDS_KEY, bachVectorsGameModeForPath, bachVectorsGames, bachVectorsGameSlugs, type BachVectorsGameId } from './info'
import { BachVectorsRaceGame } from './RaceGame'

const info = (id: BachVectorsGameId) => bachVectorsGames.find((game) => game.id === id)!
const art = (id: BachVectorsGameId) => <BachVectorsGameArt game={id} />

const components: Record<BachVectorsGameId, (props: GameProps) => JSX.Element> = {
    race: BachVectorsRaceGame,
    kind: (props) => <KindGame {...props} game={info('kind')} art={art('kind')} />,
    polygon: (props) => <PolygonGame {...props} game={info('polygon')} art={art('polygon')} />,
    detective: (props) => <WorkedDetectiveGame {...props} config={{ game: info('detective'), art: art('detective'), cases: BACH_VECTORS_DETECTIVE_CASES, createCases: createBachVectorsDetectiveCases, names: bachVectorsDetectiveNames, tips: bachVectorsDetectiveTips }} />,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: info('memory'), art: art('memory'), pairs: BACH_VECTORS_MEMORY_PAIRS, createBoard: createBachVectorsMemoryBoard }} />,
    // The 4. DBH games, with this unit's levels and progress ids
    jump: (props) => <VectorJumpGame {...props} game={info('jump')} art={art('jump')} />,
    lines: (props) => <FindKGame {...props} game={info('lines')} art={art('lines')} />
}

const hubGames: HubGame<BachVectorsGameId>[] = bachVectorsGames.map((game) => ({ info: game, art: art(game.id), component: components[game.id] }))

export function BachVectorsGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={BACH_VECTORS_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={bachVectorsGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : bachVectorsGameSlugs[mode])}
        />
    )
}
