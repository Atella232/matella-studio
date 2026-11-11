import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import '../../dbh3-proportzionaltasuna/games/Games.css'
import '../../batx2-zientziak-probabilitatea/games/ProbabilityBatx2Games.css'
import { createDistributionsBatx2MemoryBoard, DISTRIBUTIONS_BATX2_MEMORY_PAIRS } from './boards'
import { createDistributionsBatx2DetectiveCases, DISTRIBUTIONS_BATX2_DETECTIVE_CASES, distributionsBatx2DetectiveNames, distributionsBatx2DetectiveTips } from './detective'
import { AreaGame, BinomialGame, HuntGame } from './DistributionsBatx2Games'
import { DistributionsBatx2GameArt } from './GameArt'
import { DISTRIBUTIONS_BATX2_GAME_RECORDS_KEY, distributionsBatx2GameModeForPath, distributionsBatx2Games, distributionsBatx2GameSlugs, type DistributionsBatx2GameId } from './info'
import { DistributionsBatx2RaceGame } from './RaceGame'

const info = (id: DistributionsBatx2GameId) => distributionsBatx2Games.find((game) => game.id === id)!
const art = (id: DistributionsBatx2GameId) => <DistributionsBatx2GameArt game={id} />

const components: Record<DistributionsBatx2GameId, (props: GameProps) => JSX.Element> = {
    race: DistributionsBatx2RaceGame,
    binomial: (props) => <BinomialGame {...props} game={info('binomial')} art={art('binomial')} />,
    area: (props) => <AreaGame {...props} game={info('area')} art={art('area')} />,
    hunt: (props) => <HuntGame {...props} game={info('hunt')} art={art('hunt')} />,
    detective: (props) => <WorkedDetectiveGame {...props} config={{ game: info('detective'), art: art('detective'), cases: DISTRIBUTIONS_BATX2_DETECTIVE_CASES, createCases: createDistributionsBatx2DetectiveCases, names: distributionsBatx2DetectiveNames, tips: distributionsBatx2DetectiveTips }} />,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: info('memory'), art: art('memory'), pairs: DISTRIBUTIONS_BATX2_MEMORY_PAIRS, createBoard: createDistributionsBatx2MemoryBoard }} />
}

const hubGames: HubGame<DistributionsBatx2GameId>[] = distributionsBatx2Games.map((game) => ({ info: game, art: art(game.id), component: components[game.id] }))

export function DistributionsBatx2Games({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={DISTRIBUTIONS_BATX2_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={distributionsBatx2GameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : distributionsBatx2GameSlugs[mode])}
        />
    )
}
