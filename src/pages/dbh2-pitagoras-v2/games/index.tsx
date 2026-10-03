import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/games/Games.css'
import { createPythagorasMemoryBoard, PYTHAGORAS_MEMORY_PAIRS } from './boards'
import { PythagorasGameArt } from './GameArt'
import { PYTHAGORAS_GAME_RECORDS_KEY, pythagorasGameModeForPath, pythagorasGames, pythagorasGameSlugs, type PythagorasGameId } from './info'
import { PythagorasRaceGame } from './RaceGame'

const memoryGame = pythagorasGames.find((game) => game.id === 'memory')!

const components: Record<PythagorasGameId, (props: GameProps) => JSX.Element> = {
    race: PythagorasRaceGame,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: memoryGame, art: <PythagorasGameArt game="memory" />, pairs: PYTHAGORAS_MEMORY_PAIRS, createBoard: createPythagorasMemoryBoard }} />
}

const hubGames: HubGame<PythagorasGameId>[] = pythagorasGames.map((game) => ({ info: game, art: <PythagorasGameArt game={game.id} />, component: components[game.id] }))

export function PythagorasGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={PYTHAGORAS_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={pythagorasGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : pythagorasGameSlugs[mode])}
        />
    )
}
