import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/games/Games.css'
import { TargetGame } from '../../dbh2-zatikiak-prototype/games/TargetGame'
import { createDecimalsMemoryBoard, DECIMALS_MEMORY_PAIRS } from './boards'
import { DecimalsGameArt } from './GameArt'
import { DECIMALS_GAME_RECORDS_KEY, decimalsGameModeForPath, decimalsGames, decimalsGameSlugs, decimalsTargetLevels, type DecimalsGameId } from './info'
import { DecimalsRaceGame } from './RaceGame'

const info = (id: DecimalsGameId) => decimalsGames.find((game) => game.id === id)!

const components: Record<DecimalsGameId, (props: GameProps) => JSX.Element> = {
    race: DecimalsRaceGame,
    target: (props) => <TargetGame {...props} config={{ game: info('target'), levels: decimalsTargetLevels }} />,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: info('memory'), art: <DecimalsGameArt game="memory" />, pairs: DECIMALS_MEMORY_PAIRS, createBoard: createDecimalsMemoryBoard }} />
}

const hubGames: HubGame<DecimalsGameId>[] = decimalsGames.map((game) => ({ info: game, art: <DecimalsGameArt game={game.id} />, component: components[game.id] }))

export function DecimalsGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={DECIMALS_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={decimalsGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : decimalsGameSlugs[mode])}
        />
    )
}
