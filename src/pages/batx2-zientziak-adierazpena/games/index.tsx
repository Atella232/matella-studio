import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { UpdownGame } from '../../batx1-zientziak-aplikazioak/games/BachApplicationsGames'
import { localize } from '../../batx1-zientziak-funtzioak/text'
import { AsymptoteGame } from '../../batx1-zientziak-limiteak/games/BachLimitsGames'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import '../../dbh3-proportzionaltasuna/games/Games.css'
import { GraphGame, ReadGame, SightGame } from './Bach2SketchGames'
import { BACH2_SKETCH_MEMORY_PAIRS, createBach2SketchMemoryBoard } from './boards'
import { BACH2_SKETCH_DETECTIVE_CASES, bach2SketchDetectiveNames, bach2SketchDetectiveTips, createBach2SketchDetectiveCases } from './detective'
import { Bach2SketchGameArt } from './GameArt'
import { BACH2_SKETCH_GAME_RECORDS_KEY, bach2SketchGameModeForPath, bach2SketchGames, bach2SketchGameSlugs, type Bach2SketchGameId } from './info'
import { Bach2SketchRaceGame } from './RaceGame'

const info = (id: Bach2SketchGameId) => bach2SketchGames.find((game) => game.id === id)!
const art = (id: Bach2SketchGameId) => <Bach2SketchGameArt game={id} />

const components: Record<Bach2SketchGameId, (props: GameProps) => JSX.Element> = {
    race: Bach2SketchRaceGame,
    graph: (props) => <GraphGame {...props} game={info('graph')} art={art('graph')} />,
    read: (props) => <ReadGame {...props} game={info('read')} art={art('read')} />,
    sight: (props) => <SightGame {...props} game={info('sight')} art={art('sight')} />,
    detective: (props) => <WorkedDetectiveGame {...props} config={{ game: info('detective'), art: art('detective'), cases: BACH2_SKETCH_DETECTIVE_CASES, createCases: createBach2SketchDetectiveCases, names: bach2SketchDetectiveNames, tips: bach2SketchDetectiveTips, localize: (latex, language) => localize(language, latex) }} />,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: info('memory'), art: art('memory'), pairs: BACH2_SKETCH_MEMORY_PAIRS, createBoard: createBach2SketchMemoryBoard }} />,
    // The 1.º games, with this unit's levels and progress ids
    updown: (props) => <UpdownGame {...props} game={info('updown')} art={art('updown')} />,
    asymptote: (props) => <AsymptoteGame {...props} game={info('asymptote')} art={art('asymptote')} />
}

const hubGames: HubGame<Bach2SketchGameId>[] = bach2SketchGames.map((game) => ({ info: game, art: art(game.id), component: components[game.id] }))

export function Bach2SketchGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={BACH2_SKETCH_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={bach2SketchGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : bach2SketchGameSlugs[mode])}
        />
    )
}
