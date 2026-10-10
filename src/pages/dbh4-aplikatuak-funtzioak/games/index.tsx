import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { createFunctionsMemoryBoard, FUNCTIONS_MEMORY_PAIRS } from './boards'
import { FunctionsGameArt } from './GameArt'
import { FUNCTIONS_GAME_RECORDS_KEY, functionsGameModeForPath, functionsGames, functionsGameSlugs, type FunctionsGameId } from './info'
import { FunctionsRaceGame } from './RaceGame'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'

const memoryGame = functionsGames.find((game) => game.id === 'memory')!

const components: Record<FunctionsGameId, (props: GameProps) => JSX.Element> = {
    race: FunctionsRaceGame,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: memoryGame, art: <FunctionsGameArt game="memory" />, pairs: FUNCTIONS_MEMORY_PAIRS, createBoard: createFunctionsMemoryBoard }} />
}

const hubGames: HubGame<FunctionsGameId>[] = functionsGames.map((info) => ({ info, art: <FunctionsGameArt game={info.id} />, component: components[info.id] }))

export function FunctionsGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={FUNCTIONS_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={functionsGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : functionsGameSlugs[mode])}
        />
    )
}
