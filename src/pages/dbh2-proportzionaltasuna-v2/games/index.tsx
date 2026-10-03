import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/games/Games.css'
import { createProportionDbh2MemoryBoard, PROPORTION_DBH2_MEMORY_PAIRS } from './boards'
import { ProportionDbh2GameArt } from './GameArt'
import { PROPORTION_DBH2_GAME_RECORDS_KEY, proportionDbh2GameModeForPath, proportionDbh2Games, proportionDbh2GameSlugs, type ProportionDbh2GameId } from './info'
import { ProportionDbh2RaceGame } from './RaceGame'

const memoryGame = proportionDbh2Games.find((game) => game.id === 'memory')!

const components: Record<ProportionDbh2GameId, (props: GameProps) => JSX.Element> = {
    race: ProportionDbh2RaceGame,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: memoryGame, art: <ProportionDbh2GameArt game="memory" />, pairs: PROPORTION_DBH2_MEMORY_PAIRS, createBoard: createProportionDbh2MemoryBoard }} />
}

const hubGames: HubGame<ProportionDbh2GameId>[] = proportionDbh2Games.map((game) => ({ info: game, art: <ProportionDbh2GameArt game={game.id} />, component: components[game.id] }))

export function ProportionDbh2Games({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={PROPORTION_DBH2_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={proportionDbh2GameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : proportionDbh2GameSlugs[mode])}
        />
    )
}
