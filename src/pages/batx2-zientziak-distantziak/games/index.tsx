import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import '../../dbh3-proportzionaltasuna/games/Games.css'
import { createDistancesMemoryBoard, DISTANCES_MEMORY_PAIRS } from './boards'
import { createDistancesDetectiveCases, DISTANCES_DETECTIVE_CASES, distancesDetectiveNames, distancesDetectiveTips } from './detective'
import { MirrorGame, NearerGame, SineGame } from './DistancesGames'
import { AnglesDistancesGameArt } from './GameArt'
import { ANGLES_DISTANCES_GAME_RECORDS_KEY, anglesDistancesGameModeForPath, anglesDistancesGames, anglesDistancesGameSlugs, type AnglesDistancesGameId } from './info'
import { AnglesDistancesRaceGame } from './RaceGame'

const info = (id: AnglesDistancesGameId) => anglesDistancesGames.find((game) => game.id === id)!
const art = (id: AnglesDistancesGameId) => <AnglesDistancesGameArt game={id} />

const components: Record<AnglesDistancesGameId, (props: GameProps) => JSX.Element> = {
    race: AnglesDistancesRaceGame,
    sine: (props) => <SineGame {...props} game={info('sine')} art={art('sine')} />,
    mirror: (props) => <MirrorGame {...props} game={info('mirror')} art={art('mirror')} />,
    nearer: (props) => <NearerGame {...props} game={info('nearer')} art={art('nearer')} />,
    detective: (props) => <WorkedDetectiveGame {...props} config={{ game: info('detective'), art: art('detective'), cases: DISTANCES_DETECTIVE_CASES, createCases: createDistancesDetectiveCases, names: distancesDetectiveNames, tips: distancesDetectiveTips }} />,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: info('memory'), art: art('memory'), pairs: DISTANCES_MEMORY_PAIRS, createBoard: createDistancesMemoryBoard }} />
}

const hubGames: HubGame<AnglesDistancesGameId>[] = anglesDistancesGames.map((game) => ({ info: game, art: art(game.id), component: components[game.id] }))

export function AnglesDistancesGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={ANGLES_DISTANCES_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={anglesDistancesGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : anglesDistancesGameSlugs[mode])}
        />
    )
}
