import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import '../../dbh3-proportzionaltasuna/games/Games.css'
import { createSistemakMemoryBoard, SISTEMAK_MEMORY_PAIRS } from '../../batx2-zientziak-sistemak/games/boards'
import { CramerColumnsGame, RoucheExpressGame } from '../../batx2-zientziak-sistemak/games/SystemsGames'
import { createGizarteSystemsDetectiveCases, GIZARTE_SYSTEMS_DETECTIVE_CASES, gizarteSystemsDetectiveNames, gizarteSystemsDetectiveTips } from './detective'
import { GizarteSistemakGameArt } from './GameArt'
import { GIZARTE_SISTEMAK_GAME_RECORDS_KEY, gizarteSistemakGameModeForPath, gizarteSistemakGames, gizarteSistemakGameSlugs, type GizarteSistemakGameId } from './info'
import { GizarteSistemakRaceGame } from './RaceGame'
import { BusinessGame, TranslateGame } from './SocialGames'

const info = (id: GizarteSistemakGameId) => gizarteSistemakGames.find((game) => game.id === id)!
const art = (id: GizarteSistemakGameId) => <GizarteSistemakGameArt game={id} />

const components: Record<GizarteSistemakGameId, (props: GameProps) => JSX.Element> = {
    race: GizarteSistemakRaceGame,
    business: (props) => <BusinessGame {...props} game={info('business')} art={art('business')} />,
    translate: (props) => <TranslateGame {...props} game={info('translate')} art={art('translate')} />,
    'rouche-express': (props) => <RoucheExpressGame {...props} game={info('rouche-express')} art={art('rouche-express')} />,
    'cramer-columns': (props) => <CramerColumnsGame {...props} game={info('cramer-columns')} art={art('cramer-columns')} />,
    detective: (props) => <WorkedDetectiveGame {...props} config={{ game: info('detective'), art: art('detective'), cases: GIZARTE_SYSTEMS_DETECTIVE_CASES, createCases: createGizarteSystemsDetectiveCases, names: gizarteSystemsDetectiveNames, tips: gizarteSystemsDetectiveTips }} />,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: info('memory'), art: art('memory'), pairs: SISTEMAK_MEMORY_PAIRS, createBoard: createSistemakMemoryBoard }} />
}

const hubGames: HubGame<GizarteSistemakGameId>[] = gizarteSistemakGames.map((game) => ({ info: game, art: art(game.id), component: components[game.id] }))

export function GizarteSistemakGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={GIZARTE_SISTEMAK_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={gizarteSistemakGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : gizarteSistemakGameSlugs[mode])}
        />
    )
}
