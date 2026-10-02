import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/games/Games.css'
import { createProportionMemoryBoard, PROPORTION_MEMORY_PAIRS } from './boards'
import { ProportionGameArt } from './GameArt'
import { PROPORTION_GAME_RECORDS_KEY, proportionGameModeForPath, proportionGames, proportionGameSlugs, type ProportionGameId } from './info'
import { ProportionRaceGame } from './RaceGame'

const memoryGame = proportionGames.find((game) => game.id === 'memory')!

const components: Record<ProportionGameId, (props: GameProps) => JSX.Element> = {
    race: ProportionRaceGame,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: memoryGame, art: <ProportionGameArt game="memory" />, pairs: PROPORTION_MEMORY_PAIRS, createBoard: createProportionMemoryBoard }} />
}

const hubGames: HubGame<ProportionGameId>[] = proportionGames.map((game) => ({ info: game, art: <ProportionGameArt game={game.id} />, component: components[game.id] }))

export function ProportionGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={PROPORTION_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={proportionGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : proportionGameSlugs[mode])}
        />
    )
}
