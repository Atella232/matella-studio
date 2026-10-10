import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { createPowersMemoryBoard, POWERS_MEMORY_PAIRS } from './boards'
import { PowersGameArt } from './GameArt'
import { POWERS_GAME_RECORDS_KEY, powersGameModeForPath, powersGames, powersGameSlugs, type PowersGameId } from './info'
import { PowersRaceGame } from './RaceGame'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'

const memoryGame = powersGames.find((game) => game.id === 'memory')!

const components: Record<PowersGameId, (props: GameProps) => JSX.Element> = {
    race: PowersRaceGame,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: memoryGame, art: <PowersGameArt game="memory" />, pairs: POWERS_MEMORY_PAIRS, createBoard: createPowersMemoryBoard }} />
}

const hubGames: HubGame<PowersGameId>[] = powersGames.map((info) => ({ info, art: <PowersGameArt game={info.id} />, component: components[info.id] }))

export function PowersGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={POWERS_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={powersGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : powersGameSlugs[mode])}
        />
    )
}
