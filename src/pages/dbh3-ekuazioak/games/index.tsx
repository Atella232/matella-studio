import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import '../../dbh3-proportzionaltasuna/games/Games.css'
import { createEquations3MemoryBoard, EQUATIONS3_MEMORY_PAIRS } from './boards'
import { CrossingGame } from './CrossingGame'
import { DetectiveGame } from './DetectiveGame'
import { Equations3GameArt } from './GameArt'
import { EQUATIONS3_GAME_RECORDS_KEY, equations3GameModeForPath, equations3Games, equations3GameSlugs, type Equations3GameId } from './info'
import { Equations3RaceGame } from './RaceGame'
import { RootsGame } from './RootsGame'
import { StepGame } from './StepGame'

const memoryGame = equations3Games.find((game) => game.id === 'memory')!

const components: Record<Equations3GameId, (props: GameProps) => JSX.Element> = {
    race: Equations3RaceGame,
    step: StepGame,
    roots: RootsGame,
    crossing: CrossingGame,
    detective: DetectiveGame,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: memoryGame, art: <Equations3GameArt game="memory" />, pairs: EQUATIONS3_MEMORY_PAIRS, createBoard: createEquations3MemoryBoard }} />
}

const hubGames: HubGame<Equations3GameId>[] = equations3Games.map((info) => ({ info, art: <Equations3GameArt game={info.id} />, component: components[info.id] }))

export function Equations3Games({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={EQUATIONS3_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={equations3GameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : equations3GameSlugs[mode])}
        />
    )
}
