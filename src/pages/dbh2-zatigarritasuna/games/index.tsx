import { GamesHub, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { FactorGame } from './FactorGame'
import { DivisibilityGameArt } from './GameArt'
import { HuntGame } from './HuntGame'
import { DIVISIBILITY_GAME_RECORDS_KEY, divisibilityGameModeForPath, divisibilityGames, type DivisibilityGameId } from './info'
import { DivisibilityMemoryGame } from './MemoryGame'
import { DivisibilityRaceGame } from './RaceGame'
import './DivisibilityGames.css'

const components = { race: DivisibilityRaceGame, hunt: HuntGame, factor: FactorGame, memory: DivisibilityMemoryGame }

const hubGames: HubGame<DivisibilityGameId>[] = divisibilityGames.map((info) => ({ info, art: <DivisibilityGameArt game={info.id} />, component: components[info.id] }))

export function DivisibilityGames({ language, pathname, completedIds, onComplete }: {
    language: UnitLanguage
    pathname: string
    completedIds: number[]
    onComplete: (id: number) => void
}) {
    return (
        <GamesHub
            language={language}
            games={hubGames}
            recordsKey={DIVISIBILITY_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu zenbakien barrenarekin', es: 'Juega con los números por dentro', ar: 'العب بالأعداد من الداخل' }}
            completedIds={completedIds}
            onComplete={onComplete}
            initialGame={divisibilityGameModeForPath(pathname)}
        />
    )
}
