import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import '../../dbh3-proportzionaltasuna/games/Games.css'
import { createInferenceBatx2gMemoryBoard, INFERENCE_BATX2G_MEMORY_PAIRS } from './boards'
import { createInferenceBatx2gDetectiveCases, INFERENCE_BATX2G_DETECTIVE_CASES, inferenceBatx2gDetectiveNames, inferenceBatx2gDetectiveTips } from './detective'
import { InferenceBatx2gGameArt } from './GameArt'
import { BackwardsGame, TruthGame } from './InferenceBatx2gGames'
import { INFERENCE_BATX2G_GAME_RECORDS_KEY, inferenceBatx2gGameModeForPath, inferenceBatx2gGames, inferenceBatx2gGameSlugs, type InferenceBatx2gGameId } from './info'
import { InferenceBatx2gRaceGame } from './RaceGame'

const info = (id: InferenceBatx2gGameId) => inferenceBatx2gGames.find((game) => game.id === id)!
const art = (id: InferenceBatx2gGameId) => <InferenceBatx2gGameArt game={id} />

const components: Record<InferenceBatx2gGameId, (props: GameProps) => JSX.Element> = {
    race: InferenceBatx2gRaceGame,
    truth: (props) => <TruthGame {...props} game={info('truth')} art={art('truth')} />,
    backwards: (props) => <BackwardsGame {...props} game={info('backwards')} art={art('backwards')} />,
    detective: (props) => <WorkedDetectiveGame {...props} config={{ game: info('detective'), art: art('detective'), cases: INFERENCE_BATX2G_DETECTIVE_CASES, createCases: createInferenceBatx2gDetectiveCases, names: inferenceBatx2gDetectiveNames, tips: inferenceBatx2gDetectiveTips }} />,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: info('memory'), art: art('memory'), pairs: INFERENCE_BATX2G_MEMORY_PAIRS, createBoard: createInferenceBatx2gMemoryBoard }} />
}

const hubGames: HubGame<InferenceBatx2gGameId>[] = inferenceBatx2gGames.map((game) => ({ info: game, art: art(game.id), component: components[game.id] }))

export function InferenceBatx2gGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={INFERENCE_BATX2G_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={inferenceBatx2gGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : inferenceBatx2gGameSlugs[mode])}
        />
    )
}
