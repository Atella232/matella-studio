import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import '../../dbh3-proportzionaltasuna/games/Games.css'
import { createDeterminanteakMemoryBoard, DETERMINANTEAK_MEMORY_PAIRS } from '../../batx2-zientziak-determinanteak/games/boards'
import { WhatHappensGame } from '../../batx2-zientziak-determinanteak/games/DeterminantsGames'
import { createGizarteDeterminantDetectiveCases, GIZARTE_DETERMINANT_DETECTIVE_CASES, gizarteDeterminantDetectiveNames, gizarteDeterminantDetectiveTips } from './detective'
import { GizarteDeterminanteakGameArt } from './GameArt'
import { GIZARTE_DETERMINANTEAK_GAME_RECORDS_KEY, gizarteDeterminanteakGameModeForPath, gizarteDeterminanteakGames, gizarteDeterminanteakGameSlugs, type GizarteDeterminanteakGameId } from './info'
import { GizarteDeterminanteakRaceGame } from './RaceGame'
import { QuickCofactorGame, UniquePricesGame } from './SocialGames'

const info = (id: GizarteDeterminanteakGameId) => gizarteDeterminanteakGames.find((game) => game.id === id)!
const art = (id: GizarteDeterminanteakGameId) => <GizarteDeterminanteakGameArt game={id} />

const components: Record<GizarteDeterminanteakGameId, (props: GameProps) => JSX.Element> = {
    race: GizarteDeterminanteakRaceGame,
    'unique-prices': (props) => <UniquePricesGame {...props} game={info('unique-prices')} art={art('unique-prices')} />,
    'quick-cofactor': (props) => <QuickCofactorGame {...props} game={info('quick-cofactor')} art={art('quick-cofactor')} />,
    'what-happens': (props) => <WhatHappensGame {...props} game={info('what-happens')} art={art('what-happens')} />,
    detective: (props) => <WorkedDetectiveGame {...props} config={{ game: info('detective'), art: art('detective'), cases: GIZARTE_DETERMINANT_DETECTIVE_CASES, createCases: createGizarteDeterminantDetectiveCases, names: gizarteDeterminantDetectiveNames, tips: gizarteDeterminantDetectiveTips }} />,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: info('memory'), art: art('memory'), pairs: DETERMINANTEAK_MEMORY_PAIRS, createBoard: createDeterminanteakMemoryBoard }} />
}

const hubGames: HubGame<GizarteDeterminanteakGameId>[] = gizarteDeterminanteakGames.map((game) => ({ info: game, art: art(game.id), component: components[game.id] }))

export function GizarteDeterminanteakGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={GIZARTE_DETERMINANTEAK_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={gizarteDeterminanteakGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : gizarteDeterminanteakGameSlugs[mode])}
        />
    )
}
