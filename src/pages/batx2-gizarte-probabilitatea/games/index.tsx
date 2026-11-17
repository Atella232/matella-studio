import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import '../../dbh3-proportzionaltasuna/games/Games.css'
import { createProbabilityBatx2MemoryBoard, PROBABILITY_BATX2_MEMORY_PAIRS } from '../../batx2-zientziak-probabilitatea/games/boards'
import { CulpritGame, VennGame } from '../../batx2-zientziak-probabilitatea/games/ProbabilityBatx2Games'
import { createProbabilityBatx2gDetectiveCases, PROBABILITY_BATX2G_DETECTIVE_CASES, probabilityBatx2gDetectiveNames, probabilityBatx2gDetectiveTips } from './detective'
import { ProbabilityBatx2gGameArt } from './GameArt'
import { PROBABILITY_BATX2G_GAME_RECORDS_KEY, probabilityBatx2gGameModeForPath, probabilityBatx2gGames, probabilityBatx2gGameSlugs, type ProbabilityBatx2gGameId } from './info'
import { DivideGame, OrderGame } from './ProbabilityBatx2gGames'
import { ProbabilityBatx2gRaceGame } from './RaceGame'

const info = (id: ProbabilityBatx2gGameId) => probabilityBatx2gGames.find((game) => game.id === id)!
const art = (id: ProbabilityBatx2gGameId) => <ProbabilityBatx2gGameArt game={id} />

const components: Record<ProbabilityBatx2gGameId, (props: GameProps) => JSX.Element> = {
    race: ProbabilityBatx2gRaceGame,
    divide: (props) => <DivideGame {...props} game={info('divide')} art={art('divide')} />,
    order: (props) => <OrderGame {...props} game={info('order')} art={art('order')} />,
    detective: (props) => <WorkedDetectiveGame {...props} config={{ game: info('detective'), art: art('detective'), cases: PROBABILITY_BATX2G_DETECTIVE_CASES, createCases: createProbabilityBatx2gDetectiveCases, names: probabilityBatx2gDetectiveNames, tips: probabilityBatx2gDetectiveTips }} />,
    // «Fill in the Venn diagram», «Who did it?» and the memory of 2.º Ciencias, with this unit's progress ids
    venn: (props) => <VennGame {...props} game={info('venn')} art={art('venn')} />,
    culprit: (props) => <CulpritGame {...props} game={info('culprit')} art={art('culprit')} />,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: info('memory'), art: art('memory'), pairs: PROBABILITY_BATX2_MEMORY_PAIRS, createBoard: createProbabilityBatx2MemoryBoard }} />
}

const hubGames: HubGame<ProbabilityBatx2gGameId>[] = probabilityBatx2gGames.map((game) => ({ info: game, art: art(game.id), component: components[game.id] }))

export function ProbabilityBatx2gGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={PROBABILITY_BATX2G_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={probabilityBatx2gGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : probabilityBatx2gGameSlugs[mode])}
        />
    )
}
