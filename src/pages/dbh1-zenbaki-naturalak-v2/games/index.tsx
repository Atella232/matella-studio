import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../lab/NaturalsLab.css'
import { NaturalsGameArt } from './GameArt'
import { HuntGame } from './HuntGame'
import { NATURALS_GAME_RECORDS_KEY, naturalsGameModeForPath, naturalsGameSlugs, naturalsGames, type NaturalsGameId } from './info'
import { NaturalsMemoryGame } from './MemoryGame'
import { NaturalsRaceGame } from './RaceGame'
import { SprintGame } from './SprintGame'
import './NaturalsGames.css'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import { createNaturalsDetectiveCases, NATURALS_DETECTIVE_CASES, naturalsDetectiveNames, naturalsDetectiveTips } from './detective'

const components = { race: NaturalsRaceGame, hunt: HuntGame, sprint: SprintGame, memory: NaturalsMemoryGame, detective: (props: GameProps) => <WorkedDetectiveGame {...props} config={{ game: naturalsGames.find((game) => game.id === 'detective')!, art: <NaturalsGameArt game="detective" language={props.language} />, cases: NATURALS_DETECTIVE_CASES, createCases: createNaturalsDetectiveCases, names: naturalsDetectiveNames, tips: naturalsDetectiveTips }} /> }

export function NaturalsGames({ language, pathname, openGame, completedIds, onComplete }: {
    language: UnitLanguage
    pathname: string
    openGame: (slug: string | null) => void
    completedIds: number[]
    onComplete: (id: number) => void
}) {
    const hubGames: HubGame<NaturalsGameId>[] = naturalsGames.map((info) => ({ info, art: <NaturalsGameArt game={info.id} language={language} />, component: components[info.id] }))
    return (
        <GamesHub
            language={language}
            games={hubGames}
            recordsKey={NATURALS_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu zenbaki naturalekin', es: 'Juega con los números naturales', en: 'Play with natural numbers', ar: 'العب بالأعداد الطبيعية' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={naturalsGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : naturalsGameSlugs[mode])}
        />
    )
}
