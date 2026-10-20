import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { createCombinatoricsAkMemoryBoard, COMBINATORICS_AK_MEMORY_PAIRS } from './boards'
import { CombinatoricsAkGameArt } from './GameArt'
import { COMBINATORICS_AK_GAME_RECORDS_KEY, combinatoricsAkGameModeForPath, combinatoricsAkGames, combinatoricsAkGameSlugs, type CombinatoricsAkGameId } from './info'
import { CombinatoricsAkRaceGame } from './RaceGame'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'

const memoryGame = combinatoricsAkGames.find((game) => game.id === 'memory')!

const components: Record<CombinatoricsAkGameId, (props: GameProps) => JSX.Element> = {
    race: CombinatoricsAkRaceGame,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: memoryGame, art: <CombinatoricsAkGameArt game="memory" />, pairs: COMBINATORICS_AK_MEMORY_PAIRS, createBoard: createCombinatoricsAkMemoryBoard }} />
}

const hubGames: HubGame<CombinatoricsAkGameId>[] = combinatoricsAkGames.map((info) => ({ info, art: <CombinatoricsAkGameArt game={info.id} />, component: components[info.id] }))

export function CombinatoricsAkGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={COMBINATORICS_AK_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={combinatoricsAkGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : combinatoricsAkGameSlugs[mode])}
        />
    )
}
