import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import '../../dbh3-proportzionaltasuna/games/Games.css'
import { MatchGame, SlopesGame, TangentGame } from './BachDerivativesGames'
import { BACH_DERIVATIVES_MEMORY_PAIRS, createBachDerivativesMemoryBoard } from './boards'
import { BACH_DERIVATIVES_DETECTIVE_CASES, bachDerivativesDetectiveNames, bachDerivativesDetectiveTips, createBachDerivativesDetectiveCases } from './detective'
import { BachDerivativesGameArt } from './GameArt'
import { BACH_DERIVATIVES_GAME_RECORDS_KEY, bachDerivativesGameModeForPath, bachDerivativesGames, bachDerivativesGameSlugs, type BachDerivativesGameId } from './info'
import { BachDerivativesRaceGame } from './RaceGame'

const info = (id: BachDerivativesGameId) => bachDerivativesGames.find((game) => game.id === id)!
const art = (id: BachDerivativesGameId) => <BachDerivativesGameArt game={id} />

const components: Record<BachDerivativesGameId, (props: GameProps) => JSX.Element> = {
    race: BachDerivativesRaceGame,
    slopes: (props) => <SlopesGame {...props} game={info('slopes')} art={art('slopes')} />,
    match: (props) => <MatchGame {...props} game={info('match')} art={art('match')} />,
    tangent: (props) => <TangentGame {...props} game={info('tangent')} art={art('tangent')} />,
    detective: (props) => <WorkedDetectiveGame {...props} config={{ game: info('detective'), art: art('detective'), cases: BACH_DERIVATIVES_DETECTIVE_CASES, createCases: createBachDerivativesDetectiveCases, names: bachDerivativesDetectiveNames, tips: bachDerivativesDetectiveTips }} />,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: info('memory'), art: art('memory'), pairs: BACH_DERIVATIVES_MEMORY_PAIRS, createBoard: createBachDerivativesMemoryBoard }} />
}

const hubGames: HubGame<BachDerivativesGameId>[] = bachDerivativesGames.map((game) => ({ info: game, art: art(game.id), component: components[game.id] }))

export function BachDerivativesGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={BACH_DERIVATIVES_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={bachDerivativesGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : bachDerivativesGameSlugs[mode])}
        />
    )
}
