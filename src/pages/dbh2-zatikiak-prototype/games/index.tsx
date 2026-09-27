import { GamesHub, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import type { PrototypeLanguage } from '../content'
import type { GameMode } from '../routing'
import { GameArt } from './GameKit'
import { MemoryGame } from './MemoryGame'
import { RaceGame } from './RaceGame'
import { TargetGame } from './TargetGame'
import { WallGame } from './WallGame'
import { GAME_RECORDS_KEY, games, type GameId } from './records'
import './Games.css'

export type { GameProps } from '../../../features/unit-v2/games/GamesHub'

const components = { race: RaceGame, target: TargetGame, wall: WallGame, memory: MemoryGame }

const hubGames: HubGame<GameId>[] = games.map((info) => ({ info, art: <GameArt game={info.id} />, component: components[info.id] }))

export function GamesArea({
    language,
    completedIds,
    onComplete,
    mode,
    onModeChange
}: {
    language: PrototypeLanguage
    completedIds: number[]
    onComplete: (id: number) => void
    mode: GameMode
    onModeChange: (mode: GameMode) => void
}) {
    return (
        <GamesHub
            language={language}
            games={hubGames}
            recordsKey={GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={mode}
            onModeChange={onModeChange}
        />
    )
}
