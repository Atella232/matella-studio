import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { createExponentialAkMemoryBoard, EXPONENTIAL_AK_MEMORY_PAIRS } from './boards'
import { ExponentialAkGameArt } from './GameArt'
import { EXPONENTIAL_AK_GAME_RECORDS_KEY, exponentialAkGameModeForPath, exponentialAkGames, exponentialAkGameSlugs, type ExponentialAkGameId } from './info'
import { ExponentialAkRaceGame } from './RaceGame'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'

const memoryGame = exponentialAkGames.find((game) => game.id === 'memory')!

const components: Record<ExponentialAkGameId, (props: GameProps) => JSX.Element> = {
    race: ExponentialAkRaceGame,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: memoryGame, art: <ExponentialAkGameArt game="memory" />, pairs: EXPONENTIAL_AK_MEMORY_PAIRS, createBoard: createExponentialAkMemoryBoard }} />
}

const hubGames: HubGame<ExponentialAkGameId>[] = exponentialAkGames.map((info) => ({ info, art: <ExponentialAkGameArt game={info.id} />, component: components[info.id] }))

export function ExponentialAkGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={EXPONENTIAL_AK_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={exponentialAkGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : exponentialAkGameSlugs[mode])}
        />
    )
}
