import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import '../../dbh3-proportzionaltasuna/games/Games.css'
import { CurveLaserGame } from '../../dbh4-games/CurveGames'
import { DomainGame } from '../../dbh4-games/EquationGames'
import { createSocFunctionsMemoryBoard, SOC_FUNCTIONS_MEMORY_PAIRS } from './boards'
import { createSocFunctionsDetectiveCases, SOC_FUNCTIONS_DETECTIVE_CASES, socFunctionsDetectiveNames, socFunctionsDetectiveTips } from './detective'
import { SocFunctionsGameArt } from './GameArt'
import { SOC_FUNCTIONS_GAME_RECORDS_KEY, SOC_FUNCTIONS_LASER_FAMILIES, socFunctionsGameModeForPath, socFunctionsGames, socFunctionsGameSlugs, type SocFunctionsGameId } from './info'
import { SocFunctionsRaceGame } from './RaceGame'
import { BillGame, EstimateGame, PriceGame } from './SocFunctionsGames'

const info = (id: SocFunctionsGameId) => socFunctionsGames.find((game) => game.id === id)!
const art = (id: SocFunctionsGameId) => <SocFunctionsGameArt game={id} />

const components: Record<SocFunctionsGameId, (props: GameProps) => JSX.Element> = {
    race: SocFunctionsRaceGame,
    estimate: (props) => <EstimateGame {...props} game={info('estimate')} art={art('estimate')} />,
    price: (props) => <PriceGame {...props} game={info('price')} art={art('price')} />,
    bill: (props) => <BillGame {...props} game={info('bill')} art={art('bill')} />,
    detective: (props) => <WorkedDetectiveGame {...props} config={{ game: info('detective'), art: art('detective'), cases: SOC_FUNCTIONS_DETECTIVE_CASES, createCases: createSocFunctionsDetectiveCases, names: socFunctionsDetectiveNames, tips: socFunctionsDetectiveTips }} />,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: info('memory'), art: art('memory'), pairs: SOC_FUNCTIONS_MEMORY_PAIRS, createBoard: createSocFunctionsMemoryBoard }} />,
    // The 4. DBH games, with this unit's levels and progress ids
    domain: (props) => <DomainGame {...props} game={info('domain')} art={art('domain')} />,
    laser: (props) => <CurveLaserGame {...props} game={info('laser')} art={art('laser')} families={SOC_FUNCTIONS_LASER_FAMILIES.map((families) => [...families])} />
}

const hubGames: HubGame<SocFunctionsGameId>[] = socFunctionsGames.map((game) => ({ info: game, art: art(game.id), component: components[game.id] }))

export function SocFunctionsGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={SOC_FUNCTIONS_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={socFunctionsGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : socFunctionsGameSlugs[mode])}
        />
    )
}
