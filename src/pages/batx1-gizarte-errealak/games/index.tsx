import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import { PlaceGameView } from '../../dbh4-aplikatuak-errealak/games/PlaceGame'
import { IntervalGame } from '../../dbh4-games/IntervalGame'
import { LogGame, RadicalGame } from '../../dbh4-games/PowerGames'
import { createGizRealsMemoryBoard, GIZ_REALS_MEMORY_PAIRS } from './boards'
import { createGizRealsDetectiveCases, GIZ_REALS_DETECTIVE_CASES, gizRealsDetectiveNames, gizRealsDetectiveTips } from './detective'
import { GizRealsGameArt } from './GameArt'
import { HeadlineGame, OrderGame } from './GizRealsGames'
import { GIZ_REALS_GAME_RECORDS_KEY, gizRealsGameModeForPath, gizRealsGames, gizRealsGameSlugs, type GizRealsGameId } from './info'
import { GizRealsRaceGame } from './RaceGame'

const info = (id: GizRealsGameId) => gizRealsGames.find((game) => game.id === id)!

const components: Record<GizRealsGameId, (props: GameProps) => JSX.Element> = {
    race: GizRealsRaceGame,
    order: (props) => <OrderGame {...props} game={info('order')} art={<GizRealsGameArt game="order" />} />,
    headline: (props) => <HeadlineGame {...props} game={info('headline')} art={<GizRealsGameArt game="headline" />} />,
    detective: (props) => <WorkedDetectiveGame {...props} config={{ game: info('detective'), art: <GizRealsGameArt game="detective" />, cases: GIZ_REALS_DETECTIVE_CASES, createCases: createGizRealsDetectiveCases, names: gizRealsDetectiveNames, tips: gizRealsDetectiveTips }} />,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: info('memory'), art: <GizRealsGameArt game="memory" />, pairs: GIZ_REALS_MEMORY_PAIRS, createBoard: createGizRealsMemoryBoard }} />,
    place: (props) => <PlaceGameView {...props} game={info('place')} />,
    intervals: (props) => <IntervalGame {...props} game={info('intervals')} art={<GizRealsGameArt game="intervals" />} track="academic" />,
    radical: (props) => <RadicalGame {...props} game={info('radical')} art={<GizRealsGameArt game="radical" />} />,
    log: (props) => <LogGame {...props} game={info('log')} art={<GizRealsGameArt game="log" />} />
}

const hubGames: HubGame<GizRealsGameId>[] = gizRealsGames.map((game) => ({ info: game, art: <GizRealsGameArt game={game.id} />, component: components[game.id] }))

export function GizRealsGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={GIZ_REALS_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={gizRealsGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : gizRealsGameSlugs[mode])}
        />
    )
}
