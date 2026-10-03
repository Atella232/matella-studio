import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/games/Games.css'
import { createSolidsMemoryBoard, SOLIDS_MEMORY_PAIRS } from './boards'
import { SolidsGameArt } from './GameArt'
import { SOLIDS_GAME_RECORDS_KEY, solidsGameModeForPath, solidsGames, solidsGameSlugs, type SolidsGameId } from './info'
import { SolidsRaceGame } from './RaceGame'

const memoryGame = solidsGames.find((game) => game.id === 'memory')!

const components: Record<SolidsGameId, (props: GameProps) => JSX.Element> = {
    race: SolidsRaceGame,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: memoryGame, art: <SolidsGameArt game="memory" />, pairs: SOLIDS_MEMORY_PAIRS, createBoard: createSolidsMemoryBoard }} />
}

const hubGames: HubGame<SolidsGameId>[] = solidsGames.map((game) => ({ info: game, art: <SolidsGameArt game={game.id} />, component: components[game.id] }))

export function SolidsGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={SOLIDS_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={solidsGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : solidsGameSlugs[mode])}
        />
    )
}
