import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh3-proportzionaltasuna/games/Games.css'
import { UnitCircleGame } from '../../dbh4-games/TrigGames'
import { localize } from '../text'
import { createTrigonometryMemoryBoard, TRIGONOMETRY_MEMORY_PAIRS } from './boards'
import { createTrigonometryDetectiveCases, TRIGONOMETRY_DETECTIVE_CASES, trigonometryDetectiveNames, trigonometryDetectiveTips } from './detective'
import { TrigonometryBatx1zGameArt } from './GameArt'
import { TRIGONOMETRY_BATX1Z_GAME_RECORDS_KEY, trigonometryBatx1zGameModeForPath, trigonometryBatx1zGames, trigonometryBatx1zGameSlugs, type TrigonometryBatx1zGameId } from './info'
import { TrigonometryBatx1zRaceGame } from './RaceGame'
import { BuildGame, ExactGame, HuntGame } from './TrigonometryGames'

const info = (id: TrigonometryBatx1zGameId) => trigonometryBatx1zGames.find((game) => game.id === id)!
const art = (id: TrigonometryBatx1zGameId) => <TrigonometryBatx1zGameArt game={id} />

const components: Record<TrigonometryBatx1zGameId, (props: GameProps) => JSX.Element> = {
    race: TrigonometryBatx1zRaceGame,
    build: (props) => <BuildGame {...props} game={info('build')} art={art('build')} />,
    hunt: (props) => <HuntGame {...props} game={info('hunt')} art={art('hunt')} />,
    exact: (props) => <ExactGame {...props} game={info('exact')} art={art('exact')} />,
    detective: (props) => <WorkedDetectiveGame {...props} config={{ game: info('detective'), art: art('detective'), cases: TRIGONOMETRY_DETECTIVE_CASES, createCases: createTrigonometryDetectiveCases, names: trigonometryDetectiveNames, tips: trigonometryDetectiveTips, localize: (latex, language) => localize(language, latex) }} />,
    // The cards write \sen, \tg, \cosec and \cotg: each language gets its names before the game draws them
    memory: (props) => <PairsMemoryGame {...props} config={{ game: info('memory'), art: art('memory'), pairs: TRIGONOMETRY_MEMORY_PAIRS, createBoard: (random, level) => createTrigonometryMemoryBoard(random, level, (latex) => localize(props.language, latex)) }} />,
    // The 4. DBH game, with this unit's levels and progress ids
    circle: (props) => <UnitCircleGame {...props} game={info('circle')} art={art('circle')} />
}

const hubGames: HubGame<TrigonometryBatx1zGameId>[] = trigonometryBatx1zGames.map((game) => ({ info: game, art: art(game.id), component: components[game.id] }))

export function TrigonometryBatx1zGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={TRIGONOMETRY_BATX1Z_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={trigonometryBatx1zGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : trigonometryBatx1zGameSlugs[mode])}
        />
    )
}
