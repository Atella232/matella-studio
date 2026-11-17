import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import '../../dbh3-proportzionaltasuna/games/Games.css'
import '../../batx2-zientziak-probabilitatea/games/ProbabilityBatx2Games.css'
import { BinomialGame } from '../../batx2-zientziak-banaketak/games/DistributionsBatx2Games'
import { createDiscreteBatx1gMemoryBoard, DISCRETE_BATX1G_MEMORY_PAIRS } from './boards'
import { createDiscreteBatx1gDetectiveCases, DISCRETE_BATX1G_DETECTIVE_CASES, discreteBatx1gDetectiveNames, discreteBatx1gDetectiveTips } from './detective'
import { EventsGame, GaltonGame, WorthGame } from './DiscreteBatx1gGames'
import { DiscreteBatx1gGameArt } from './GameArt'
import { DISCRETE_BATX1G_GAME_RECORDS_KEY, discreteBatx1gGameModeForPath, discreteBatx1gGames, discreteBatx1gGameSlugs, type DiscreteBatx1gGameId } from './info'
import { DiscreteBatx1gRaceGame } from './RaceGame'

const info = (id: DiscreteBatx1gGameId) => discreteBatx1gGames.find((game) => game.id === id)!
const art = (id: DiscreteBatx1gGameId) => <DiscreteBatx1gGameArt game={id} />

const components: Record<DiscreteBatx1gGameId, (props: GameProps) => JSX.Element> = {
    race: DiscreteBatx1gRaceGame,
    galton: (props) => <GaltonGame {...props} game={info('galton')} art={art('galton')} />,
    events: (props) => <EventsGame {...props} game={info('events')} art={art('events')} />,
    worth: (props) => <WorthGame {...props} game={info('worth')} art={art('worth')} />,
    binomial: (props) => <BinomialGame {...props} game={info('binomial')} art={art('binomial')} />,
    detective: (props) => <WorkedDetectiveGame {...props} config={{ game: info('detective'), art: art('detective'), cases: DISCRETE_BATX1G_DETECTIVE_CASES, createCases: createDiscreteBatx1gDetectiveCases, names: discreteBatx1gDetectiveNames, tips: discreteBatx1gDetectiveTips }} />,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: info('memory'), art: art('memory'), pairs: DISCRETE_BATX1G_MEMORY_PAIRS, createBoard: createDiscreteBatx1gMemoryBoard }} />
}

const hubGames: HubGame<DiscreteBatx1gGameId>[] = discreteBatx1gGames.map((game) => ({ info: game, art: art(game.id), component: components[game.id] }))

export function DiscreteBatx1gGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={DISCRETE_BATX1G_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={discreteBatx1gGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : discreteBatx1gGameSlugs[mode])}
        />
    )
}
