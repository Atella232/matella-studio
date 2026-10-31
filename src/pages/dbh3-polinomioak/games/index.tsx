import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import '../../dbh3-proportzionaltasuna/games/Games.css'
import { createPolynomials3MemoryBoard, POLYNOMIALS3_MEMORY_PAIRS } from './boards'
import { AlikeGame } from './AlikeGame'
import { DetectiveGame } from './DetectiveGame'
import { Polynomials3GameArt } from './GameArt'
import { IdentityGame } from './IdentityGame'
import { POLYNOMIALS3_GAME_RECORDS_KEY, polynomials3GameModeForPath, polynomials3Games, polynomials3GameSlugs, type Polynomials3GameId } from './info'
import { Polynomials3RaceGame } from './RaceGame'
import { RuffiniGame } from './RuffiniGame'

const memoryGame = polynomials3Games.find((game) => game.id === 'memory')!

const components: Record<Polynomials3GameId, (props: GameProps) => JSX.Element> = {
    race: Polynomials3RaceGame,
    alike: AlikeGame,
    identity: IdentityGame,
    ruffini: RuffiniGame,
    detective: DetectiveGame,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: memoryGame, art: <Polynomials3GameArt game="memory" />, pairs: POLYNOMIALS3_MEMORY_PAIRS, createBoard: createPolynomials3MemoryBoard }} />
}

const hubGames: HubGame<Polynomials3GameId>[] = polynomials3Games.map((info) => ({ info, art: <Polynomials3GameArt game={info.id} />, component: components[info.id] }))

export function Polynomials3Games({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={POLYNOMIALS3_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={polynomials3GameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : polynomials3GameSlugs[mode])}
        />
    )
}
