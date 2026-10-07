import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { createEquationsSystemsMemoryBoard, EQUATIONS_SYSTEMS_MEMORY_PAIRS } from './boards'
import { EquationsSystemsGameArt } from './GameArt'
import { EQUATIONS_SYSTEMS_GAME_RECORDS_KEY, equationsSystemsGameModeForPath, equationsSystemsGames, equationsSystemsGameSlugs, type EquationsSystemsGameId } from './info'
import { EquationsSystemsRaceGame } from './RaceGame'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'

const memoryGame = equationsSystemsGames.find((game) => game.id === 'memory')!

const components: Record<EquationsSystemsGameId, (props: GameProps) => JSX.Element> = {
    race: EquationsSystemsRaceGame,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: memoryGame, art: <EquationsSystemsGameArt game="memory" />, pairs: EQUATIONS_SYSTEMS_MEMORY_PAIRS, createBoard: createEquationsSystemsMemoryBoard }} />
}

const hubGames: HubGame<EquationsSystemsGameId>[] = equationsSystemsGames.map((info) => ({ info, art: <EquationsSystemsGameArt game={info.id} />, component: components[info.id] }))

export function EquationsSystemsGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={EQUATIONS_SYSTEMS_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={equationsSystemsGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : equationsSystemsGameSlugs[mode])}
        />
    )
}
