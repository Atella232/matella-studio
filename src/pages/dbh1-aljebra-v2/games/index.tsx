import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import { createAlgebraMemoryBoard, MEMORY_PAIRS } from './equations'
import { EquationGame } from './EquationGame'
import { AlgebraGameArt } from './GameArt'
import { ALGEBRA_GAME_RECORDS_KEY, algebraGameModeForPath, algebraGames, algebraGameSlugs, type AlgebraGameId } from './info'
import { AlgebraRaceGame } from './RaceGame'
import './AlgebraGames.css'

const memoryGame = algebraGames.find((game) => game.id === 'memory')!

const components: Record<AlgebraGameId, (props: GameProps) => JSX.Element> = {
    race: AlgebraRaceGame,
    balance: EquationGame,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: memoryGame, art: <AlgebraGameArt game="memory" />, pairs: MEMORY_PAIRS, createBoard: createAlgebraMemoryBoard }} />
}

const hubGames: HubGame<AlgebraGameId>[] = algebraGames.map((info) => ({ info, art: <AlgebraGameArt game={info.id} />, component: components[info.id] }))

export function AlgebraIntroGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={ALGEBRA_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu letrekin eta ekuazioekin', es: 'Juega con letras y ecuaciones', ar: 'العب بالحروف والمعادلات' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={algebraGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : algebraGameSlugs[mode])}
        />
    )
}
