import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { createSystemsMemoryBoard, SYSTEMS_MEMORY_PAIRS } from './boards'
import { SystemsGameArt } from './GameArt'
import { SYSTEMS_GAME_RECORDS_KEY, systemsGameModeForPath, systemsGames, systemsGameSlugs, type SystemsGameId } from './info'
import { SystemsRaceGame } from './RaceGame'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'

const memoryGame = systemsGames.find((game) => game.id === 'memory')!

const components: Record<SystemsGameId, (props: GameProps) => JSX.Element> = {
    race: SystemsRaceGame,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: memoryGame, art: <SystemsGameArt game="memory" />, pairs: SYSTEMS_MEMORY_PAIRS, createBoard: createSystemsMemoryBoard }} />
}

const hubGames: HubGame<SystemsGameId>[] = systemsGames.map((info) => ({ info, art: <SystemsGameArt game={info.id} />, component: components[info.id] }))

export function SystemsGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={SYSTEMS_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={systemsGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : systemsGameSlugs[mode])}
        />
    )
}
