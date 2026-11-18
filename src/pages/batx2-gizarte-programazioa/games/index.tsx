import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import '../../dbh3-proportzionaltasuna/games/Games.css'
import { createProgrammingMemoryBoard, PROGRAMMING_MEMORY_PAIRS } from './boards'
import { createProgrammingDetectiveCases, PROGRAMMING_DETECTIVE_CASES, programmingDetectiveNames, programmingDetectiveTips } from './detective'
import { ProgramazioaGameArt } from './GameArt'
import { PROGRAMAZIOA_GAME_RECORDS_KEY, programazioaGameModeForPath, programazioaGames, programazioaGameSlugs, type ProgramazioaGameId } from './info'
import { ExpressGame, SolutionKindGame, WhichVertexGame } from './ProgrammingGames'

const info = (id: ProgramazioaGameId) => programazioaGames.find((game) => game.id === id)!
const art = (id: ProgramazioaGameId) => <ProgramazioaGameArt game={id} />

const components: Record<ProgramazioaGameId, (props: GameProps) => JSX.Element> = {
    'which-vertex': (props) => <WhichVertexGame {...props} game={info('which-vertex')} art={art('which-vertex')} />,
    express: (props) => <ExpressGame {...props} game={info('express')} art={art('express')} />,
    'solution-kind': (props) => <SolutionKindGame {...props} game={info('solution-kind')} art={art('solution-kind')} />,
    detective: (props) => <WorkedDetectiveGame {...props} config={{ game: info('detective'), art: art('detective'), cases: PROGRAMMING_DETECTIVE_CASES, createCases: createProgrammingDetectiveCases, names: programmingDetectiveNames, tips: programmingDetectiveTips }} />,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: info('memory'), art: art('memory'), pairs: PROGRAMMING_MEMORY_PAIRS, createBoard: createProgrammingMemoryBoard }} />
}

const hubGames: HubGame<ProgramazioaGameId>[] = programazioaGames.map((game) => ({ info: game, art: art(game.id), component: components[game.id] }))

export function ProgramazioaGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={PROGRAMAZIOA_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={programazioaGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : programazioaGameSlugs[mode])}
        />
    )
}
