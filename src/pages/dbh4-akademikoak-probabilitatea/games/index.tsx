import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { createProbabilityAkMemoryBoard, PROBABILITY_AK_MEMORY_PAIRS } from './boards'
import { ProbabilityAkGameArt } from './GameArt'
import { PROBABILITY_AK_GAME_RECORDS_KEY, probabilityAkGameModeForPath, probabilityAkGames, probabilityAkGameSlugs, type ProbabilityAkGameId } from './info'
import { ProbabilityAkRaceGame } from './RaceGame'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'

const memoryGame = probabilityAkGames.find((game) => game.id === 'memory')!

const components: Record<ProbabilityAkGameId, (props: GameProps) => JSX.Element> = {
    race: ProbabilityAkRaceGame,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: memoryGame, art: <ProbabilityAkGameArt game="memory" />, pairs: PROBABILITY_AK_MEMORY_PAIRS, createBoard: createProbabilityAkMemoryBoard }} />
}

const hubGames: HubGame<ProbabilityAkGameId>[] = probabilityAkGames.map((info) => ({ info, art: <ProbabilityAkGameArt game={info.id} />, component: components[info.id] }))

export function ProbabilityAkGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={PROBABILITY_AK_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={probabilityAkGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : probabilityAkGameSlugs[mode])}
        />
    )
}
