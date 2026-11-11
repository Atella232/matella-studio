import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import '../../dbh3-proportzionaltasuna/games/Games.css'
import { ContingencyGame, TreePathsGame } from '../../dbh4-games/ProbabilityGames'
import { createProbabilityBatx2MemoryBoard, PROBABILITY_BATX2_MEMORY_PAIRS } from './boards'
import { createProbabilityBatx2DetectiveCases, PROBABILITY_BATX2_DETECTIVE_CASES, probabilityBatx2DetectiveNames, probabilityBatx2DetectiveTips } from './detective'
import { ProbabilityBatx2GameArt } from './GameArt'
import { PROBABILITY_BATX2_GAME_RECORDS_KEY, probabilityBatx2GameModeForPath, probabilityBatx2Games, probabilityBatx2GameSlugs, type ProbabilityBatx2GameId } from './info'
import { CulpritGame, RelationGame, VennGame } from './ProbabilityBatx2Games'
import { ProbabilityBatx2RaceGame } from './RaceGame'

const info = (id: ProbabilityBatx2GameId) => probabilityBatx2Games.find((game) => game.id === id)!
const art = (id: ProbabilityBatx2GameId) => <ProbabilityBatx2GameArt game={id} />

const components: Record<ProbabilityBatx2GameId, (props: GameProps) => JSX.Element> = {
    race: ProbabilityBatx2RaceGame,
    relation: (props) => <RelationGame {...props} game={info('relation')} art={art('relation')} />,
    venn: (props) => <VennGame {...props} game={info('venn')} art={art('venn')} />,
    culprit: (props) => <CulpritGame {...props} game={info('culprit')} art={art('culprit')} />,
    detective: (props) => <WorkedDetectiveGame {...props} config={{ game: info('detective'), art: art('detective'), cases: PROBABILITY_BATX2_DETECTIVE_CASES, createCases: createProbabilityBatx2DetectiveCases, names: probabilityBatx2DetectiveNames, tips: probabilityBatx2DetectiveTips }} />,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: info('memory'), art: art('memory'), pairs: PROBABILITY_BATX2_MEMORY_PAIRS, createBoard: createProbabilityBatx2MemoryBoard }} />,
    // The 4. DBH tree and contingency table, with this unit's progress ids
    tree: (props) => <TreePathsGame {...props} game={info('tree')} art={art('tree')} />,
    table: (props) => <ContingencyGame {...props} game={info('table')} art={art('table')} />
}

const hubGames: HubGame<ProbabilityBatx2GameId>[] = probabilityBatx2Games.map((game) => ({ info: game, art: art(game.id), component: components[game.id] }))

export function ProbabilityBatx2Games({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={PROBABILITY_BATX2_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={probabilityBatx2GameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : probabilityBatx2GameSlugs[mode])}
        />
    )
}
