import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import '../../dbh3-proportzionaltasuna/games/Games.css'
import '../../batx2-zientziak-probabilitatea/games/ProbabilityBatx2Games.css'
import { AreaGame, HuntGame } from '../../batx2-zientziak-banaketak/games/DistributionsBatx2Games'
import { createNormalBatx1gMemoryBoard, NORMAL_BATX1G_MEMORY_PAIRS } from './boards'
import { createNormalBatx1gDetectiveCases, NORMAL_BATX1G_DETECTIVE_CASES, normalBatx1gDetectiveNames, normalBatx1gDetectiveTips } from './detective'
import { NormalBatx1gGameArt } from './GameArt'
import { NORMAL_BATX1G_GAME_RECORDS_KEY, normalBatx1gGameModeForPath, normalBatx1gGames, normalBatx1gGameSlugs, type NormalBatx1gGameId } from './info'
import { CutoffGame, DensityGame, PercentGame } from './NormalBatx1gGames'
import { NormalBatx1gRaceGame } from './RaceGame'

const info = (id: NormalBatx1gGameId) => normalBatx1gGames.find((game) => game.id === id)!
const art = (id: NormalBatx1gGameId) => <NormalBatx1gGameArt game={id} />

const components: Record<NormalBatx1gGameId, (props: GameProps) => JSX.Element> = {
    race: NormalBatx1gRaceGame,
    percent: (props) => <PercentGame {...props} game={info('percent')} art={art('percent')} />,
    density: (props) => <DensityGame {...props} game={info('density')} art={art('density')} />,
    cutoff: (props) => <CutoffGame {...props} game={info('cutoff')} art={art('cutoff')} />,
    area: (props) => <AreaGame {...props} game={info('area')} art={art('area')} />,
    hunt: (props) => <HuntGame {...props} game={info('hunt')} art={art('hunt')} />,
    detective: (props) => <WorkedDetectiveGame {...props} config={{ game: info('detective'), art: art('detective'), cases: NORMAL_BATX1G_DETECTIVE_CASES, createCases: createNormalBatx1gDetectiveCases, names: normalBatx1gDetectiveNames, tips: normalBatx1gDetectiveTips }} />,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: info('memory'), art: art('memory'), pairs: NORMAL_BATX1G_MEMORY_PAIRS, createBoard: createNormalBatx1gMemoryBoard }} />
}

const hubGames: HubGame<NormalBatx1gGameId>[] = normalBatx1gGames.map((game) => ({ info: game, art: art(game.id), component: components[game.id] }))

export function NormalBatx1gGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={NORMAL_BATX1G_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={normalBatx1gGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : normalBatx1gGameSlugs[mode])}
        />
    )
}
