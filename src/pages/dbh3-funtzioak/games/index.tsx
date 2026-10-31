import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import '../../dbh3-proportzionaltasuna/games/Games.css'
import { createFunctions3MemoryBoard, FUNCTIONS3_MEMORY_PAIRS } from './boards'
import { DetectiveGame } from './DetectiveGame'
import { Functions3GameArt } from './GameArt'
import { FUNCTIONS3_GAME_RECORDS_KEY, functions3GameModeForPath, functions3Games, functions3GameSlugs, type Functions3GameId } from './info'
import { MatchGame, SignsGame, StoryGame } from './QuizGames'
import { Functions3RaceGame } from './RaceGame'

const memoryGame = functions3Games.find((game) => game.id === 'memory')!

const components: Record<Functions3GameId, (props: GameProps) => JSX.Element> = {
    race: Functions3RaceGame,
    match: MatchGame,
    story: StoryGame,
    signs: SignsGame,
    detective: DetectiveGame,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: memoryGame, art: <Functions3GameArt game="memory" />, pairs: FUNCTIONS3_MEMORY_PAIRS, createBoard: createFunctions3MemoryBoard }} />
}

const hubGames: HubGame<Functions3GameId>[] = functions3Games.map((info) => ({ info, art: <Functions3GameArt game={info.id} />, component: components[info.id] }))

export function Functions3Games({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={FUNCTIONS3_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={functions3GameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : functions3GameSlugs[mode])}
        />
    )
}
