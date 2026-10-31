import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import '../../dbh3-proportzionaltasuna/games/Games.css'
import { createStats3MemoryBoard, STATS3_MEMORY_PAIRS } from './boards'
import { DetectiveGame } from './DetectiveGame'
import { Stats3GameArt } from './GameArt'
import { STATS3_GAME_RECORDS_KEY, stats3GameModeForPath, stats3Games, stats3GameSlugs, type Stats3GameId } from './info'
import { BagsGame, ReadGame, VariableGame } from './QuizGames'
import { Stats3RaceGame } from './RaceGame'

const memoryGame = stats3Games.find((game) => game.id === 'memory')!

const components: Record<Stats3GameId, (props: GameProps) => JSX.Element> = {
    race: Stats3RaceGame,
    read: ReadGame,
    variable: VariableGame,
    bags: BagsGame,
    detective: DetectiveGame,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: memoryGame, art: <Stats3GameArt game="memory" />, pairs: STATS3_MEMORY_PAIRS, createBoard: createStats3MemoryBoard }} />
}

const hubGames: HubGame<Stats3GameId>[] = stats3Games.map((info) => ({ info, art: <Stats3GameArt game={info.id} />, component: components[info.id] }))

export function Stats3Games({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={STATS3_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={stats3GameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : stats3GameSlugs[mode])}
        />
    )
}
