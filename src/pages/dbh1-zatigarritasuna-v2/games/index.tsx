import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatigarritasuna/games/DivisibilityGames.css'
import { FactorGame } from '../../dbh2-zatigarritasuna/games/FactorGame'
import { DivisibilityGameArt } from '../../dbh2-zatigarritasuna/games/GameArt'
import { HuntGame } from '../../dbh2-zatigarritasuna/games/HuntGame'
import { DivisibilityMemoryGame } from '../../dbh2-zatigarritasuna/games/MemoryGame'
import {
    INTRO_DIVISIBILITY_GAME_RECORDS_KEY,
    introDivisibilityGameModeForPath,
    introDivisibilityGames,
    introDivisibilityGameSlugs,
    introFactorLevels,
    introHuntLevels,
    type IntroDivisibilityGameId
} from './info'
import { IntroDivisibilityRaceGame } from './RaceGame'

const info = (id: IntroDivisibilityGameId) => introDivisibilityGames.find((game) => game.id === id)!

/** The hunt, the factorization and the memory come from 2. DBH, with first-year levels */
const components: Record<IntroDivisibilityGameId, (props: GameProps) => JSX.Element> = {
    race: IntroDivisibilityRaceGame,
    hunt: (props) => <HuntGame {...props} config={{ game: info('hunt'), levels: introHuntLevels }} />,
    factor: (props) => <FactorGame {...props} config={{ game: info('factor'), levels: introFactorLevels }} />,
    memory: (props) => <DivisibilityMemoryGame {...props} config={{ game: info('memory') }} />
}

const hubGames: HubGame<IntroDivisibilityGameId>[] = introDivisibilityGames.map((game) => ({ info: game, art: <DivisibilityGameArt game={game.id} />, component: components[game.id] }))

export function DivisibilityIntroGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={INTRO_DIVISIBILITY_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu zenbakien barrenarekin', es: 'Juega con los números por dentro', ar: 'العب بالأعداد من الداخل' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={introDivisibilityGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : introDivisibilityGameSlugs[mode])}
        />
    )
}
