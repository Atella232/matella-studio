import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { IntegerGameArt } from '../../dbh2-zenbaki-osoak/games/GameArt'
import '../../dbh2-zenbaki-osoak/games/IntegerGames.css'
import { OrderGame } from '../../dbh2-zenbaki-osoak/games/OrderGame'
import { PyramidGame } from '../../dbh2-zenbaki-osoak/games/PyramidGame'
import { ElevatorArt } from './ElevatorArt'
import { ElevatorGame } from './ElevatorGame'
import { INTRO_GAME_RECORDS_KEY, introGameModeForPath, introGames, introGameSlugs, introOrderLevels, introPyramidLevels, type IntroGameId } from './info'
import { IntroRaceGame } from './RaceGame'
import './IntroGames.css'

const info = (id: IntroGameId) => introGames.find((game) => game.id === id)!

/** The pyramid and the order game come from 2. DBH, with first-year levels */
const components: Record<IntroGameId, (props: GameProps) => JSX.Element> = {
    race: IntroRaceGame,
    elevator: ElevatorGame,
    pyramid: (props) => <PyramidGame {...props} config={{ game: info('pyramid'), levels: introPyramidLevels, art: <IntegerGameArt game="pyramid" /> }} />,
    order: (props) => <OrderGame {...props} config={{ game: info('order'), levels: introOrderLevels, art: <IntegerGameArt game="order" /> }} />
}

const art: Record<IntroGameId, JSX.Element> = {
    race: <IntegerGameArt game="race" />,
    elevator: <ElevatorArt />,
    pyramid: <IntegerGameArt game="pyramid" />,
    order: <IntegerGameArt game="order" />
}

const hubGames: HubGame<IntroGameId>[] = introGames.map((game) => ({ info: game, art: art[game.id], component: components[game.id] }))

export function IntegerIntroGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={INTRO_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu zenbaki osoekin', es: 'Juega con los números enteros', ar: 'العب بالأعداد الصحيحة' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={introGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : introGameSlugs[mode])}
        />
    )
}
