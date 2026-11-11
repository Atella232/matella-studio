import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import '../../dbh3-proportzionaltasuna/games/Games.css'
import { createSistemakMemoryBoard, SISTEMAK_MEMORY_PAIRS } from './boards'
import { createSistemakDetectiveCases, SISTEMAK_DETECTIVE_CASES, sistemakDetectiveNames, sistemakDetectiveTips } from './detective'
import { SistemakGameArt } from './GameArt'
import { SISTEMAK_GAME_RECORDS_KEY, sistemakGameModeForPath, sistemakGames, sistemakGameSlugs, type SistemakGameId } from './info'
import { SistemakRaceGame } from './RaceGame'
import { CramerColumnsGame, RoucheExpressGame } from './SystemsGames'

const info = (id: SistemakGameId) => sistemakGames.find((game) => game.id === id)!
const art = (id: SistemakGameId) => <SistemakGameArt game={id} />

const components: Record<SistemakGameId, (props: GameProps) => JSX.Element> = {
    race: SistemakRaceGame,
    'rouche-express': (props) => <RoucheExpressGame {...props} game={info('rouche-express')} art={art('rouche-express')} />,
    'cramer-columns': (props) => <CramerColumnsGame {...props} game={info('cramer-columns')} art={art('cramer-columns')} />,
    detective: (props) => <WorkedDetectiveGame {...props} config={{ game: info('detective'), art: art('detective'), cases: SISTEMAK_DETECTIVE_CASES, createCases: createSistemakDetectiveCases, names: sistemakDetectiveNames, tips: sistemakDetectiveTips }} />,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: info('memory'), art: art('memory'), pairs: SISTEMAK_MEMORY_PAIRS, createBoard: createSistemakMemoryBoard }} />
}

const hubGames: HubGame<SistemakGameId>[] = sistemakGames.map((game) => ({ info: game, art: art(game.id), component: components[game.id] }))

export function SistemakGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={SISTEMAK_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={sistemakGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : sistemakGameSlugs[mode])}
        />
    )
}
