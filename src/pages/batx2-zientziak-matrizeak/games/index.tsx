import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import '../../dbh3-proportzionaltasuna/games/Games.css'
import { createMatrizeakMemoryBoard, MATRIZEAK_MEMORY_PAIRS } from './boards'
import { createMatrizeakDetectiveCases, MATRIZEAK_DETECTIVE_CASES, matrizeakDetectiveNames, matrizeakDetectiveTips } from './detective'
import { MatrizeakGameArt } from './GameArt'
import { MATRIZEAK_GAME_RECORDS_KEY, matrizeakGameModeForPath, matrizeakGames, matrizeakGameSlugs, type MatrizeakGameId } from './info'
import { BigPowerGame, DominoGame, SolveXGame } from './MatricesGames'
import { MatrizeakRaceGame } from './RaceGame'

const info = (id: MatrizeakGameId) => matrizeakGames.find((game) => game.id === id)!
const art = (id: MatrizeakGameId) => <MatrizeakGameArt game={id} />

const components: Record<MatrizeakGameId, (props: GameProps) => JSX.Element> = {
    race: MatrizeakRaceGame,
    dominoes: (props) => <DominoGame {...props} game={info('dominoes')} art={art('dominoes')} />,
    'solve-x': (props) => <SolveXGame {...props} game={info('solve-x')} art={art('solve-x')} />,
    'big-power': (props) => <BigPowerGame {...props} game={info('big-power')} art={art('big-power')} />,
    detective: (props) => <WorkedDetectiveGame {...props} config={{ game: info('detective'), art: art('detective'), cases: MATRIZEAK_DETECTIVE_CASES, createCases: createMatrizeakDetectiveCases, names: matrizeakDetectiveNames, tips: matrizeakDetectiveTips }} />,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: info('memory'), art: art('memory'), pairs: MATRIZEAK_MEMORY_PAIRS, createBoard: createMatrizeakMemoryBoard }} />
}

const hubGames: HubGame<MatrizeakGameId>[] = matrizeakGames.map((game) => ({ info: game, art: art(game.id), component: components[game.id] }))

export function MatrizeakGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={MATRIZEAK_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={matrizeakGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : matrizeakGameSlugs[mode])}
        />
    )
}
