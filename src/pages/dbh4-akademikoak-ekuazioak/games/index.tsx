import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { createEquationsMemoryBoard, EQUATIONS_MEMORY_PAIRS } from './boards'
import { EquationsGameArt } from './GameArt'
import { EQUATIONS_GAME_RECORDS_KEY, equationsGameModeForPath, equationsGames, equationsGameSlugs, type EquationsGameId } from './info'
import { EquationsRaceGame } from './RaceGame'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import { createEquationsDetectiveCases, EQUATIONS_DETECTIVE_CASES, equationsDetectiveNames, equationsDetectiveTips } from '../../dbh4-games/equationsDetective'
import { CheckSolutionsGame, PaintSolutionGame } from '../../dbh4-games/EquationGames'

const memoryGame = equationsGames.find((game) => game.id === 'memory')!

const components: Record<EquationsGameId, (props: GameProps) => JSX.Element> = {
    race: EquationsRaceGame,
    check: (props) => <CheckSolutionsGame {...props} game={equationsGames.find((game) => game.id === 'check')!} art={<EquationsGameArt game="check" />} />,
    paint: (props) => <PaintSolutionGame {...props} game={equationsGames.find((game) => game.id === 'paint')!} art={<EquationsGameArt game="paint" />} />,
    detective: (props) => <WorkedDetectiveGame {...props} config={{ game: equationsGames.find((game) => game.id === 'detective')!, art: <EquationsGameArt game="detective" />, cases: EQUATIONS_DETECTIVE_CASES, createCases: createEquationsDetectiveCases('academic'), names: equationsDetectiveNames, tips: equationsDetectiveTips }} />,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: memoryGame, art: <EquationsGameArt game="memory" />, pairs: EQUATIONS_MEMORY_PAIRS, createBoard: createEquationsMemoryBoard }} />
}

const hubGames: HubGame<EquationsGameId>[] = equationsGames.map((info) => ({ info, art: <EquationsGameArt game={info.id} />, component: components[info.id] }))

export function EquationsGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={EQUATIONS_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={equationsGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : equationsGameSlugs[mode])}
        />
    )
}
