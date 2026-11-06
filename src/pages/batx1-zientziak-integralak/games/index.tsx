import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import '../../dbh3-proportzionaltasuna/games/Games.css'
import { AdjustGame, EstimateGame, PrimitiveGame } from './BachIntegralsGames'
import { BACH_INTEGRALS_MEMORY_PAIRS, createBachIntegralsMemoryBoard } from './boards'
import { BACH_INTEGRALS_DETECTIVE_CASES, bachIntegralsDetectiveNames, bachIntegralsDetectiveTips, createBachIntegralsDetectiveCases } from './detective'
import { BachIntegralsGameArt } from './GameArt'
import { BACH_INTEGRALS_GAME_RECORDS_KEY, bachIntegralsGameModeForPath, bachIntegralsGames, bachIntegralsGameSlugs, type BachIntegralsGameId } from './info'
import { BachIntegralsRaceGame } from './RaceGame'

const info = (id: BachIntegralsGameId) => bachIntegralsGames.find((game) => game.id === id)!
const art = (id: BachIntegralsGameId) => <BachIntegralsGameArt game={id} />

const components: Record<BachIntegralsGameId, (props: GameProps) => JSX.Element> = {
    race: BachIntegralsRaceGame,
    primitive: (props) => <PrimitiveGame {...props} game={info('primitive')} art={art('primitive')} />,
    adjust: (props) => <AdjustGame {...props} game={info('adjust')} art={art('adjust')} />,
    estimate: (props) => <EstimateGame {...props} game={info('estimate')} art={art('estimate')} />,
    detective: (props) => <WorkedDetectiveGame {...props} config={{ game: info('detective'), art: art('detective'), cases: BACH_INTEGRALS_DETECTIVE_CASES, createCases: createBachIntegralsDetectiveCases, names: bachIntegralsDetectiveNames, tips: bachIntegralsDetectiveTips }} />,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: info('memory'), art: art('memory'), pairs: BACH_INTEGRALS_MEMORY_PAIRS, createBoard: createBachIntegralsMemoryBoard }} />
}

const hubGames: HubGame<BachIntegralsGameId>[] = bachIntegralsGames.map((game) => ({ info: game, art: art(game.id), component: components[game.id] }))

export function BachIntegralsGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={BACH_INTEGRALS_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={bachIntegralsGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : bachIntegralsGameSlugs[mode])}
        />
    )
}
