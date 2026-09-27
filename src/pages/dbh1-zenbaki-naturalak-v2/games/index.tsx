import { GamesHub, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../lab/NaturalsLab.css'
import { NaturalsGameArt } from './GameArt'
import { HuntGame } from './HuntGame'
import { NATURALS_GAME_RECORDS_KEY, naturalsGameModeForPath, naturalsGameSlugs, naturalsGames, type NaturalsGameId } from './info'
import { NaturalsMemoryGame } from './MemoryGame'
import { NaturalsRaceGame } from './RaceGame'
import { SprintGame } from './SprintGame'
import './NaturalsGames.css'

const components = { race: NaturalsRaceGame, hunt: HuntGame, sprint: SprintGame, memory: NaturalsMemoryGame }

const hubGames: HubGame<NaturalsGameId>[] = naturalsGames.map((info) => ({ info, art: <NaturalsGameArt game={info.id} />, component: components[info.id] }))

export function NaturalsGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={NATURALS_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu zenbaki naturalekin', es: 'Juega con los números naturales', ar: 'العب بالأعداد الطبيعية' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={naturalsGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : naturalsGameSlugs[mode])}
        />
    )
}
