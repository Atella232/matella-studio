import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { createPolynomialsMemoryBoard, POLYNOMIALS_MEMORY_PAIRS } from './boards'
import { PolynomialsGameArt } from './GameArt'
import { POLYNOMIALS_GAME_RECORDS_KEY, polynomialsGameModeForPath, polynomialsGames, polynomialsGameSlugs, type PolynomialsGameId } from './info'
import { PolynomialsRaceGame } from './RaceGame'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import { DivisibleGame, RootHuntGame } from '../../dbh4-games/PolynomialGames'
import { createPolyDetectiveCases, POLY_DETECTIVE_CASES, polyDetectiveNames, polyDetectiveTips } from '../../dbh4-games/polynomialsDetective'

const memoryGame = polynomialsGames.find((game) => game.id === 'memory')!

const components: Record<PolynomialsGameId, (props: GameProps) => JSX.Element> = {
    race: PolynomialsRaceGame,
    hunt: (props) => <RootHuntGame {...props} game={polynomialsGames.find((game) => game.id === 'hunt')!} art={<PolynomialsGameArt game="hunt" />} />,
    divisible: (props) => <DivisibleGame {...props} game={polynomialsGames.find((game) => game.id === 'divisible')!} art={<PolynomialsGameArt game="divisible" />} />,
    detective: (props) => <WorkedDetectiveGame {...props} config={{ game: polynomialsGames.find((game) => game.id === 'detective')!, art: <PolynomialsGameArt game="detective" />, cases: POLY_DETECTIVE_CASES, createCases: createPolyDetectiveCases('applied'), names: polyDetectiveNames, tips: polyDetectiveTips }} />,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: memoryGame, art: <PolynomialsGameArt game="memory" />, pairs: POLYNOMIALS_MEMORY_PAIRS, createBoard: createPolynomialsMemoryBoard }} />
}

const hubGames: HubGame<PolynomialsGameId>[] = polynomialsGames.map((info) => ({ info, art: <PolynomialsGameArt game={info.id} />, component: components[info.id] }))

export function PolynomialsGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={POLYNOMIALS_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={polynomialsGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : polynomialsGameSlugs[mode])}
        />
    )
}
