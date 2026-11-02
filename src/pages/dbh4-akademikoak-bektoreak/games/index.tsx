import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { createVectorsMemoryBoard, VECTORS_MEMORY_PAIRS } from './boards'
import { VectorsGameArt } from './GameArt'
import { VECTORS_GAME_RECORDS_KEY, vectorsGameModeForPath, vectorsGames, vectorsGameSlugs, type VectorsGameId } from './info'
import { VectorsRaceGame } from './RaceGame'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import { FindKGame, VectorJumpGame } from '../../dbh4-games/VectorGames'
import { createVectorsDetectiveCases, VECTORS_DETECTIVE_CASES, vectorsDetectiveNames, vectorsDetectiveTips } from '../../dbh4-games/vectorsDetective'

const memoryGame = vectorsGames.find((game) => game.id === 'memory')!

const components: Record<VectorsGameId, (props: GameProps) => JSX.Element> = {
    race: VectorsRaceGame,
    jump: (props) => <VectorJumpGame {...props} game={vectorsGames.find((game) => game.id === 'jump')!} art={<VectorsGameArt game="jump" />} />,
    lines: (props) => <FindKGame {...props} game={vectorsGames.find((game) => game.id === 'lines')!} art={<VectorsGameArt game="lines" />} />,
    detective: (props) => <WorkedDetectiveGame {...props} config={{ game: vectorsGames.find((game) => game.id === 'detective')!, art: <VectorsGameArt game="detective" />, cases: VECTORS_DETECTIVE_CASES, createCases: createVectorsDetectiveCases, names: vectorsDetectiveNames, tips: vectorsDetectiveTips }} />,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: memoryGame, art: <VectorsGameArt game="memory" />, pairs: VECTORS_MEMORY_PAIRS, createBoard: createVectorsMemoryBoard }} />
}

const hubGames: HubGame<VectorsGameId>[] = vectorsGames.map((info) => ({ info, art: <VectorsGameArt game={info.id} />, component: components[info.id] }))

export function VectorsGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={VECTORS_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={vectorsGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : vectorsGameSlugs[mode])}
        />
    )
}
