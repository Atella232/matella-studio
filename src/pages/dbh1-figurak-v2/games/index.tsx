import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/games/Games.css'
import { createFiguresMemoryBoard, FIGURES_MEMORY_PAIRS } from './boards'
import { FiguresGameArt } from './GameArt'
import { FIGURES_GAME_RECORDS_KEY, figuresGameModeForPath, figuresGames, figuresGameSlugs, type FiguresGameId } from './info'
import { FiguresRaceGame } from './RaceGame'

const memoryGame = figuresGames.find((game) => game.id === 'memory')!

const components: Record<FiguresGameId, (props: GameProps) => JSX.Element> = {
    race: FiguresRaceGame,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: memoryGame, art: <FiguresGameArt game="memory" />, pairs: FIGURES_MEMORY_PAIRS, createBoard: createFiguresMemoryBoard }} />
}

const hubGames: HubGame<FiguresGameId>[] = figuresGames.map((game) => ({ info: game, art: <FiguresGameArt game={game.id} />, component: components[game.id] }))

export function FiguresGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={FIGURES_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={figuresGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : figuresGameSlugs[mode])}
        />
    )
}
