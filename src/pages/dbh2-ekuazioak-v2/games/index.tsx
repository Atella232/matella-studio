import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { createEquationsMemoryBoard, EQUATIONS_MEMORY_PAIRS } from './boards'
import { EquationsGameArt } from './GameArt'
import { EQUATIONS_GAME_RECORDS_KEY, equationsGameModeForPath, equationsGames, equationsGameSlugs, type EquationsGameId } from './info'
import { EquationsRaceGame } from './RaceGame'
import { SolveGame } from './SolveGame'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'

const memoryGame = equationsGames.find((game) => game.id === 'memory')!

const components: Record<EquationsGameId, (props: GameProps) => JSX.Element> = {
    race: EquationsRaceGame,
    solve: SolveGame,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: memoryGame, art: <EquationsGameArt game="memory" />, pairs: EQUATIONS_MEMORY_PAIRS, createBoard: createEquationsMemoryBoard }} />
}

const hubGames: HubGame<EquationsGameId>[] = equationsGames.map((info) => ({ info, art: <EquationsGameArt game={info.id} />, component: components[info.id] }))

export function EquationsGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={EQUATIONS_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu ekuazioekin', es: 'Juega con ecuaciones', ar: 'العب بالمعادلات' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={equationsGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : equationsGameSlugs[mode])}
        />
    )
}
