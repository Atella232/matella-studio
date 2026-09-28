import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/games/Games.css'
import { GameArt } from '../../dbh2-zatikiak-prototype/games/GameKit'
import { MemoryGame } from '../../dbh2-zatikiak-prototype/games/MemoryGame'
import { TargetGame } from '../../dbh2-zatikiak-prototype/games/TargetGame'
import { WallGame } from '../../dbh2-zatikiak-prototype/games/WallGame'
import {
    INTRO_FRACTION_GAME_RECORDS_KEY,
    introFractionGameModeForPath,
    introFractionGames,
    introFractionGameSlugs,
    introMemoryLevels,
    introTargetLevels,
    type IntroFractionGameId
} from './info'
import { IntroFractionRaceGame } from './RaceGame'

const info = (id: IntroFractionGameId) => introFractionGames.find((game) => game.id === id)!

/** The target, the wall and the memory come from 2. DBH, with first-year levels */
const components: Record<IntroFractionGameId, (props: GameProps) => JSX.Element> = {
    race: IntroFractionRaceGame,
    target: (props) => <TargetGame {...props} config={{ game: info('target'), levels: introTargetLevels }} />,
    wall: (props) => <WallGame {...props} config={{ game: info('wall') }} />,
    memory: (props) => <MemoryGame {...props} config={{ game: info('memory'), levels: introMemoryLevels }} />
}

const hubGames: HubGame<IntroFractionGameId>[] = introFractionGames.map((game) => ({ info: game, art: <GameArt game={game.id} />, component: components[game.id] }))

export function FractionsIntroGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={INTRO_FRACTION_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={introFractionGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : introFractionGameSlugs[mode])}
        />
    )
}
