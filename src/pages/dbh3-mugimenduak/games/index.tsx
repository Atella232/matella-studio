import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import '../../dbh3-proportzionaltasuna/games/Games.css'
import { createMotions3MemoryBoard, MOTIONS3_MEMORY_PAIRS } from './boards'
import { DetectiveGame } from './DetectiveGame'
import { Motions3GameArt } from './GameArt'
import { MOTIONS3_GAME_RECORDS_KEY, motions3GameModeForPath, motions3Games, motions3GameSlugs, type Motions3GameId } from './info'
import { Motions3RaceGame } from './RaceGame'
import { TilesGame } from './TilesGame'
import { WhereGame } from './WhereGame'
import { WhichGame } from './WhichGame'

const memoryGame = motions3Games.find((game) => game.id === 'memory')!

const components: Record<Motions3GameId, (props: GameProps) => JSX.Element> = {
    race: Motions3RaceGame,
    where: WhereGame,
    which: WhichGame,
    tiles: TilesGame,
    detective: DetectiveGame,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: memoryGame, art: <Motions3GameArt game="memory" />, pairs: MOTIONS3_MEMORY_PAIRS, createBoard: createMotions3MemoryBoard }} />
}

const hubGames: HubGame<Motions3GameId>[] = motions3Games.map((info) => ({ info, art: <Motions3GameArt game={info.id} />, component: components[info.id] }))

export function Motions3Games({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={MOTIONS3_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={motions3GameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : motions3GameSlugs[mode])}
        />
    )
}
