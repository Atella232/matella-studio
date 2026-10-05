import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/games/Games.css'
import { createProportionDbh4ApMemoryBoard, PROPORTION_DBH4AP_MEMORY_PAIRS } from './boards'
import { ProportionDbh4ApGameArt } from './GameArt'
import { PROPORTION_DBH4AP_GAME_RECORDS_KEY, proportionDbh4ApGameModeForPath, proportionDbh4ApGames, proportionDbh4ApGameSlugs, type ProportionDbh4ApGameId } from './info'
import { ProportionDbh4ApRaceGame } from './RaceGame'

const memoryGame = proportionDbh4ApGames.find((game) => game.id === 'memory')!

const components: Record<ProportionDbh4ApGameId, (props: GameProps) => JSX.Element> = {
    race: ProportionDbh4ApRaceGame,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: memoryGame, art: <ProportionDbh4ApGameArt game="memory" />, pairs: PROPORTION_DBH4AP_MEMORY_PAIRS, createBoard: createProportionDbh4ApMemoryBoard }} />
}

const hubGames: HubGame<ProportionDbh4ApGameId>[] = proportionDbh4ApGames.map((game) => ({ info: game, art: <ProportionDbh4ApGameArt game={game.id} />, component: components[game.id] }))

export function ProportionDbh4ApGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={PROPORTION_DBH4AP_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={proportionDbh4ApGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : proportionDbh4ApGameSlugs[mode])}
        />
    )
}
