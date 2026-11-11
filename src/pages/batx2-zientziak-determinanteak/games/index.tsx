import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import '../../dbh3-proportzionaltasuna/games/Games.css'
import { createDeterminanteakMemoryBoard, DETERMINANTEAK_MEMORY_PAIRS } from './boards'
import { createDeterminanteakDetectiveCases, DETERMINANTEAK_DETECTIVE_CASES, determinanteakDetectiveNames, determinanteakDetectiveTips } from './detective'
import { DeterminanteakGameArt } from './GameArt'
import { DETERMINANTEAK_GAME_RECORDS_KEY, determinanteakGameModeForPath, determinanteakGames, determinanteakGameSlugs, type DeterminanteakGameId } from './info'
import { WhatHappensGame, ZeroGame } from './DeterminantsGames'
import { DeterminanteakRaceGame } from './RaceGame'

const info = (id: DeterminanteakGameId) => determinanteakGames.find((game) => game.id === id)!
const art = (id: DeterminanteakGameId) => <DeterminanteakGameArt game={id} />

const components: Record<DeterminanteakGameId, (props: GameProps) => JSX.Element> = {
    race: DeterminanteakRaceGame,
    'what-happens': (props) => <WhatHappensGame {...props} game={info('what-happens')} art={art('what-happens')} />,
    'zero-or-not': (props) => <ZeroGame {...props} game={info('zero-or-not')} art={art('zero-or-not')} />,
    detective: (props) => <WorkedDetectiveGame {...props} config={{ game: info('detective'), art: art('detective'), cases: DETERMINANTEAK_DETECTIVE_CASES, createCases: createDeterminanteakDetectiveCases, names: determinanteakDetectiveNames, tips: determinanteakDetectiveTips }} />,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: info('memory'), art: art('memory'), pairs: DETERMINANTEAK_MEMORY_PAIRS, createBoard: createDeterminanteakMemoryBoard }} />
}

const hubGames: HubGame<DeterminanteakGameId>[] = determinanteakGames.map((game) => ({ info: game, art: art(game.id), component: components[game.id] }))

export function DeterminanteakGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={DETERMINANTEAK_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={determinanteakGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : determinanteakGameSlugs[mode])}
        />
    )
}
