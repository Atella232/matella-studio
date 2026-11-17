import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import '../../dbh3-proportzionaltasuna/games/Games.css'
import { createDistributionsBatx2MemoryBoard, DISTRIBUTIONS_BATX2_MEMORY_PAIRS } from '../../batx2-zientziak-banaketak/games/boards'
import { AreaGame, HuntGame } from '../../batx2-zientziak-banaketak/games/DistributionsBatx2Games'
import { createDistributionsBatx2gDetectiveCases, DISTRIBUTIONS_BATX2G_DETECTIVE_CASES, distributionsBatx2gDetectiveNames, distributionsBatx2gDetectiveTips } from './detective'
import { CutoffGame, StandoutGame } from './DistributionsBatx2gGames'
import { DistributionsBatx2gGameArt } from './GameArt'
import { DISTRIBUTIONS_BATX2G_GAME_RECORDS_KEY, distributionsBatx2gGameModeForPath, distributionsBatx2gGames, distributionsBatx2gGameSlugs, type DistributionsBatx2gGameId } from './info'
import { DistributionsBatx2gRaceGame } from './RaceGame'

const info = (id: DistributionsBatx2gGameId) => distributionsBatx2gGames.find((game) => game.id === id)!
const art = (id: DistributionsBatx2gGameId) => <DistributionsBatx2gGameArt game={id} />

const components: Record<DistributionsBatx2gGameId, (props: GameProps) => JSX.Element> = {
    race: DistributionsBatx2gRaceGame,
    cutoff: (props) => <CutoffGame {...props} game={info('cutoff')} art={art('cutoff')} />,
    standout: (props) => <StandoutGame {...props} game={info('standout')} art={art('standout')} />,
    detective: (props) => <WorkedDetectiveGame {...props} config={{ game: info('detective'), art: art('detective'), cases: DISTRIBUTIONS_BATX2G_DETECTIVE_CASES, createCases: createDistributionsBatx2gDetectiveCases, names: distributionsBatx2gDetectiveNames, tips: distributionsBatx2gDetectiveTips }} />,
    // «Which area is it?», «Find it in the table» and the memory of 2.º Ciencias, with this unit's progress ids
    area: (props) => <AreaGame {...props} game={info('area')} art={art('area')} />,
    hunt: (props) => <HuntGame {...props} game={info('hunt')} art={art('hunt')} />,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: info('memory'), art: art('memory'), pairs: DISTRIBUTIONS_BATX2_MEMORY_PAIRS, createBoard: createDistributionsBatx2MemoryBoard }} />
}

const hubGames: HubGame<DistributionsBatx2gGameId>[] = distributionsBatx2gGames.map((game) => ({ info: game, art: art(game.id), component: components[game.id] }))

export function DistributionsBatx2gGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={DISTRIBUTIONS_BATX2G_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={distributionsBatx2gGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : distributionsBatx2gGameSlugs[mode])}
        />
    )
}
