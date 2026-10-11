import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { createPolynomialsMemoryBoard, POLYNOMIALS_MEMORY_PAIRS } from './boards'
import { PolynomialsGameArt } from './GameArt'
import { POLYNOMIALS_GAME_RECORDS_KEY, polynomialsGameModeForPath, polynomialsGames, polynomialsGameSlugs, type PolynomialsGameId } from './info'
import { PolynomialsRaceGame } from './RaceGame'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'

const memoryGame = polynomialsGames.find((game) => game.id === 'memory')!

const components: Record<PolynomialsGameId, (props: GameProps) => JSX.Element> = {
    race: PolynomialsRaceGame,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: memoryGame, art: <PolynomialsGameArt game="memory" />, pairs: POLYNOMIALS_MEMORY_PAIRS, createBoard: createPolynomialsMemoryBoard }} />
}

const hubGames: HubGame<PolynomialsGameId>[] = polynomialsGames.map((info) => ({ info, art: <PolynomialsGameArt game={info.id} />, component: components[info.id] }))

export function PolynomialsGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={POLYNOMIALS_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={polynomialsGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : polynomialsGameSlugs[mode])}
        />
    )
}
