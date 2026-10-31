import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import { createProportion3MemoryBoard, PROPORTION3_MEMORY_PAIRS } from './boards'
import { CopierGame } from './CopierGame'
import { Proportion3GameArt } from './GameArt'
import { GearboxGame } from './GearboxGame'
import { PROPORTION3_GAME_RECORDS_KEY, proportion3GameModeForPath, proportion3Games, proportion3GameSlugs, type Proportion3GameId } from './info'
import { LootGame } from './LootGame'
import { Proportion3RaceGame } from './RaceGame'
import { TreasureGame } from './TreasureGame'

const memoryGame = proportion3Games.find((game) => game.id === 'memory')!

const components: Record<Proportion3GameId, (props: GameProps) => JSX.Element> = {
    race: Proportion3RaceGame,
    gearbox: GearboxGame,
    copier: CopierGame,
    loot: LootGame,
    treasure: TreasureGame,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: memoryGame, art: <Proportion3GameArt game="memory" />, pairs: PROPORTION3_MEMORY_PAIRS, createBoard: createProportion3MemoryBoard }} />
}

const hubGames: HubGame<Proportion3GameId>[] = proportion3Games.map((info) => ({ info, art: <Proportion3GameArt game={info.id} />, component: components[info.id] }))

export function Proportion3Games({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={PROPORTION3_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={proportion3GameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : proportion3GameSlugs[mode])}
        />
    )
}
