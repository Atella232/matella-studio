import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import '../../dbh3-proportzionaltasuna/games/Games.css'
import { OrderGame, UndoGame, WhereGame } from '../../batx1-zientziak-funtzioak/games/BachFunctionsGames'
import { CurveLaserGame, GrowthGame } from '../../dbh4-games/CurveGames'
import { createSocExpMemoryBoard, SOC_EXP_MEMORY_PAIRS } from './boards'
import { createSocExpDetectiveCases, SOC_EXP_DETECTIVE_CASES, socExpDetectiveNames, socExpDetectiveTips } from './detective'
import { SocExpGameArt } from './GameArt'
import { SOC_EXP_GAME_RECORDS_KEY, SOC_EXP_LASER_FAMILIES, socExpGameModeForPath, socExpGames, socExpGameSlugs, type SocExpGameId } from './info'
import { SocExpRaceGame } from './RaceGame'
import { CheckoutGame, TableGame } from './SocExpGames'

const info = (id: SocExpGameId) => socExpGames.find((game) => game.id === id)!
const art = (id: SocExpGameId) => <SocExpGameArt game={id} />

const components: Record<SocExpGameId, (props: GameProps) => JSX.Element> = {
    race: SocExpRaceGame,
    table: (props) => <TableGame {...props} game={info('table')} art={art('table')} />,
    checkout: (props) => <CheckoutGame {...props} game={info('checkout')} art={art('checkout')} />,
    detective: (props) => <WorkedDetectiveGame {...props} config={{ game: info('detective'), art: art('detective'), cases: SOC_EXP_DETECTIVE_CASES, createCases: createSocExpDetectiveCases, names: socExpDetectiveNames, tips: socExpDetectiveTips }} />,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: info('memory'), art: art('memory'), pairs: SOC_EXP_MEMORY_PAIRS, createBoard: createSocExpMemoryBoard }} />,
    // Borrowed, with this unit's levels and progress ids
    where: (props) => <WhereGame {...props} game={info('where')} art={art('where')} />,
    order: (props) => <OrderGame {...props} game={info('order')} art={art('order')} />,
    undo: (props) => <UndoGame {...props} game={info('undo')} art={art('undo')} />,
    growth: (props) => <GrowthGame {...props} game={info('growth')} art={art('growth')} />,
    laser: (props) => <CurveLaserGame {...props} game={info('laser')} art={art('laser')} families={SOC_EXP_LASER_FAMILIES.map((families) => [...families])} />
}

const hubGames: HubGame<SocExpGameId>[] = socExpGames.map((game) => ({ info: game, art: art(game.id), component: components[game.id] }))

export function SocExpGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={SOC_EXP_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={socExpGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : socExpGameSlugs[mode])}
        />
    )
}
