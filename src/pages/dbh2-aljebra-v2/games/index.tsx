import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { ALGEBRA_MEMORY_PAIRS, createAlgebraMemoryBoard } from './boards'
import { ExpansionGame } from './ExpansionGame'
import { AlgebraGameArt } from './GameArt'
import { ALGEBRA_GAME_RECORDS_KEY, algebraGameModeForPath, algebraGames, algebraGameSlugs, type AlgebraGameId } from './info'
import { AlgebraRaceGame } from './RaceGame'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'

const memoryGame = algebraGames.find((game) => game.id === 'memory')!

const components: Record<AlgebraGameId, (props: GameProps) => JSX.Element> = {
    race: AlgebraRaceGame,
    expand: ExpansionGame,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: memoryGame, art: <AlgebraGameArt game="memory" />, pairs: ALGEBRA_MEMORY_PAIRS, createBoard: createAlgebraMemoryBoard }} />
}

const hubGames: HubGame<AlgebraGameId>[] = algebraGames.map((info) => ({ info, art: <AlgebraGameArt game={info.id} />, component: components[info.id] }))

export function AlgebraGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            title={{ eu: 'Jolastu polinomioekin', es: 'Juega con polinomios', ar: 'العب بالحدوديات' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={algebraGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : algebraGameSlugs[mode])}
        />
    )
}
