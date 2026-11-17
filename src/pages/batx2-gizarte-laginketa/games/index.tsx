import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import '../../dbh3-proportzionaltasuna/games/Games.css'
import { createSamplingBatx2gMemoryBoard, SAMPLING_BATX2G_MEMORY_PAIRS } from './boards'
import { createSamplingBatx2gDetectiveCases, SAMPLING_BATX2G_DETECTIVE_CASES, samplingBatx2gDetectiveNames, samplingBatx2gDetectiveTips } from './detective'
import { SamplingBatx2gGameArt } from './GameArt'
import { SAMPLING_BATX2G_GAME_RECORDS_KEY, samplingBatx2gGameModeForPath, samplingBatx2gGames, samplingBatx2gGameSlugs, type SamplingBatx2gGameId } from './info'
import { SamplingBatx2gRaceGame } from './RaceGame'
import { AllocateGame, BiasGame } from './SamplingBatx2gGames'

const info = (id: SamplingBatx2gGameId) => samplingBatx2gGames.find((game) => game.id === id)!
const art = (id: SamplingBatx2gGameId) => <SamplingBatx2gGameArt game={id} />

const components: Record<SamplingBatx2gGameId, (props: GameProps) => JSX.Element> = {
    race: SamplingBatx2gRaceGame,
    bias: (props) => <BiasGame {...props} game={info('bias')} art={art('bias')} />,
    allocate: (props) => <AllocateGame {...props} game={info('allocate')} art={art('allocate')} />,
    detective: (props) => <WorkedDetectiveGame {...props} config={{ game: info('detective'), art: art('detective'), cases: SAMPLING_BATX2G_DETECTIVE_CASES, createCases: createSamplingBatx2gDetectiveCases, names: samplingBatx2gDetectiveNames, tips: samplingBatx2gDetectiveTips }} />,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: info('memory'), art: art('memory'), pairs: SAMPLING_BATX2G_MEMORY_PAIRS, createBoard: createSamplingBatx2gMemoryBoard }} />
}

const hubGames: HubGame<SamplingBatx2gGameId>[] = samplingBatx2gGames.map((game) => ({ info: game, art: art(game.id), component: components[game.id] }))

export function SamplingBatx2gGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={SAMPLING_BATX2G_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={samplingBatx2gGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : samplingBatx2gGameSlugs[mode])}
        />
    )
}
