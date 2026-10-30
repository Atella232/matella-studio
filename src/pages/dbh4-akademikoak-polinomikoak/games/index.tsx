import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { createPolynomialAkMemoryBoard, POLYNOMIAL_AK_MEMORY_PAIRS } from './boards'
import { PolynomialAkGameArt } from './GameArt'
import { POLYNOMIAL_AK_GAME_RECORDS_KEY, polynomialAkGameModeForPath, polynomialAkGames, polynomialAkGameSlugs, type PolynomialAkGameId } from './info'
import { PolynomialAkRaceGame } from './RaceGame'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'

const memoryGame = polynomialAkGames.find((game) => game.id === 'memory')!

const components: Record<PolynomialAkGameId, (props: GameProps) => JSX.Element> = {
    race: PolynomialAkRaceGame,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: memoryGame, art: <PolynomialAkGameArt game="memory" />, pairs: POLYNOMIAL_AK_MEMORY_PAIRS, createBoard: createPolynomialAkMemoryBoard }} />
}

const hubGames: HubGame<PolynomialAkGameId>[] = polynomialAkGames.map((info) => ({ info, art: <PolynomialAkGameArt game={info.id} />, component: components[info.id] }))

export function PolynomialAkGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={POLYNOMIAL_AK_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={polynomialAkGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : polynomialAkGameSlugs[mode])}
        />
    )
}
