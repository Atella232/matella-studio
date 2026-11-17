import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/games/Games.css'
import { ProportionDbh4ApBankGame } from '../../dbh4-aplikatuak-proportzionaltasuna/games/BankGame'
import { ProportionDbh4ApTillGame } from '../../dbh4-aplikatuak-proportzionaltasuna/games/TillGame'
import { createGizMoneyMemoryBoard, GIZ_MONEY_MEMORY_PAIRS } from './boards'
import { createGizMoneyDetectiveCases, GIZ_MONEY_DETECTIVE_CASES, gizMoneyDetectiveNames, gizMoneyDetectiveTips } from './detective'
import { GizMoneyGameArt } from './GameArt'
import { GapsGame, OfferGame } from './GizMoneyGames'
import { GIZ_MONEY_GAME_RECORDS_KEY, gizMoneyGameModeForPath, gizMoneyGames, gizMoneyGameSlugs, type GizMoneyGameId } from './info'
import { GizMoneyRaceGame } from './RaceGame'

const info = (id: GizMoneyGameId) => gizMoneyGames.find((game) => game.id === id)!

const components: Record<GizMoneyGameId, (props: GameProps) => JSX.Element> = {
    race: GizMoneyRaceGame,
    offer: (props) => <OfferGame {...props} game={info('offer')} art={<GizMoneyGameArt game="offer" />} />,
    gaps: (props) => <GapsGame {...props} game={info('gaps')} art={<GizMoneyGameArt game="gaps" />} />,
    detective: (props) => <WorkedDetectiveGame {...props} config={{ game: info('detective'), art: <GizMoneyGameArt game="detective" />, cases: GIZ_MONEY_DETECTIVE_CASES, createCases: createGizMoneyDetectiveCases, names: gizMoneyDetectiveNames, tips: gizMoneyDetectiveTips }} />,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: info('memory'), art: <GizMoneyGameArt game="memory" />, pairs: GIZ_MONEY_MEMORY_PAIRS, createBoard: createGizMoneyMemoryBoard }} />,
    bank: ProportionDbh4ApBankGame,
    till: ProportionDbh4ApTillGame
}

const hubGames: HubGame<GizMoneyGameId>[] = gizMoneyGames.map((game) => ({ info: game, art: <GizMoneyGameArt game={game.id} />, component: components[game.id] }))

export function GizMoneyGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={GIZ_MONEY_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={gizMoneyGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : gizMoneyGameSlugs[mode])}
        />
    )
}
