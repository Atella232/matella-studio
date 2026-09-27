import { GamesHub, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { IntegerGameArt } from './GameArt'
import { INTEGER_GAME_RECORDS_KEY, integerGameModeForPath, integerGameSlugs, integerGames, type IntegerGameId } from './info'
import { IntegerMemoryGame } from './MemoryGame'
import { OrderGame } from './OrderGame'
import { PyramidGame } from './PyramidGame'
import { IntegerRaceGame } from './RaceGame'
import './IntegerGames.css'

const components = { race: IntegerRaceGame, pyramid: PyramidGame, memory: IntegerMemoryGame, order: OrderGame }

const hubGames: HubGame<IntegerGameId>[] = integerGames.map((info) => ({ info, art: <IntegerGameArt game={info.id} />, component: components[info.id] }))

export function IntegerGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={INTEGER_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu zeinuekin', es: 'Juega con los signos', ar: 'العب بالإشارات' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={integerGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : integerGameSlugs[mode])}
        />
    )
}
