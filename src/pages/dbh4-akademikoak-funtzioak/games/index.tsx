import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { createFunctionsAkMemoryBoard, FUNCTIONS_AK_MEMORY_PAIRS } from './boards'
import { FunctionsAkGameArt } from './GameArt'
import { FUNCTIONS_AK_GAME_RECORDS_KEY, functionsAkGameModeForPath, functionsAkGames, functionsAkGameSlugs, type FunctionsAkGameId } from './info'
import { FunctionsAkRaceGame } from './RaceGame'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'

const memoryGame = functionsAkGames.find((game) => game.id === 'memory')!

const components: Record<FunctionsAkGameId, (props: GameProps) => JSX.Element> = {
    race: FunctionsAkRaceGame,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: memoryGame, art: <FunctionsAkGameArt game="memory" />, pairs: FUNCTIONS_AK_MEMORY_PAIRS, createBoard: createFunctionsAkMemoryBoard }} />
}

const hubGames: HubGame<FunctionsAkGameId>[] = functionsAkGames.map((info) => ({ info, art: <FunctionsAkGameArt game={info.id} />, component: components[info.id] }))

export function FunctionsAkGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={FUNCTIONS_AK_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={functionsAkGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : functionsAkGameSlugs[mode])}
        />
    )
}
