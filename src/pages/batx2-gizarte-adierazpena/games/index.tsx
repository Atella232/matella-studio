import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import '../../dbh3-proportzionaltasuna/games/Games.css'
import { SheetGame, WhichGame } from './Bach2gSketchGames'
import { BACH2G_SKETCH_MEMORY_PAIRS, createBach2gSketchMemoryBoard } from './boards'
import { BACH2G_SKETCH_DETECTIVE_CASES, bach2gSketchDetectiveNames, bach2gSketchDetectiveTips, createBach2gSketchDetectiveCases } from './detective'
import { Bach2gSketchGameArt } from './GameArt'
import { BACH2G_SKETCH_GAME_RECORDS_KEY, bach2gSketchGameModeForPath, bach2gSketchGames, bach2gSketchGameSlugs, type Bach2gSketchGameId } from './info'
import { Bach2gSketchRaceGame } from './RaceGame'

const info = (id: Bach2gSketchGameId) => bach2gSketchGames.find((game) => game.id === id)!
const art = (id: Bach2gSketchGameId) => <Bach2gSketchGameArt game={id} />

const components: Record<Bach2gSketchGameId, (props: GameProps) => JSX.Element> = {
    race: Bach2gSketchRaceGame,
    which: (props) => <WhichGame {...props} game={info('which')} art={art('which')} />,
    sheet: (props) => <SheetGame {...props} game={info('sheet')} art={art('sheet')} />,
    detective: (props) => <WorkedDetectiveGame {...props} config={{ game: info('detective'), art: art('detective'), cases: BACH2G_SKETCH_DETECTIVE_CASES, createCases: createBach2gSketchDetectiveCases, names: bach2gSketchDetectiveNames, tips: bach2gSketchDetectiveTips }} />,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: info('memory'), art: art('memory'), pairs: BACH2G_SKETCH_MEMORY_PAIRS, createBoard: createBach2gSketchMemoryBoard }} />
}

const hubGames: HubGame<Bach2gSketchGameId>[] = bach2gSketchGames.map((game) => ({ info: game, art: art(game.id), component: components[game.id] }))

export function Bach2gSketchGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={BACH2G_SKETCH_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={bach2gSketchGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : bach2gSketchGameSlugs[mode])}
        />
    )
}
