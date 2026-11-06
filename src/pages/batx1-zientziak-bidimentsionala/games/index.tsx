import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import '../../dbh3-proportzionaltasuna/games/Games.css'
import { CloudGame } from '../../dbh4-games/StatisticsGames'
import { LinesGame, SignGame } from './BivarGames'
import { BIVAR_MEMORY_PAIRS, createBivarMemoryBoard } from './boards'
import { BIVAR_DETECTIVE_CASES, bivarDetectiveNames, bivarDetectiveTips, createBivarDetectiveCases } from './detective'
import { BivarGameArt } from './GameArt'
import { BIVAR_GAME_RECORDS_KEY, bivarGameModeForPath, bivarGames, bivarGameSlugs, type BivarGameId } from './info'
import { BivarRaceGame } from './RaceGame'

const info = (id: BivarGameId) => bivarGames.find((game) => game.id === id)!
const art = (id: BivarGameId) => <BivarGameArt game={id} />

const components: Record<BivarGameId, (props: GameProps) => JSX.Element> = {
    race: BivarRaceGame,
    sign: (props) => <SignGame {...props} game={info('sign')} art={art('sign')} />,
    lines: (props) => <LinesGame {...props} game={info('lines')} art={art('lines')} />,
    detective: (props) => <WorkedDetectiveGame {...props} config={{ game: info('detective'), art: art('detective'), cases: BIVAR_DETECTIVE_CASES, createCases: createBivarDetectiveCases, names: bivarDetectiveNames, tips: bivarDetectiveTips }} />,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: info('memory'), art: art('memory'), pairs: BIVAR_MEMORY_PAIRS, createBoard: createBivarMemoryBoard }} />,
    // «Guess the correlation» of 4. DBH, with this unit's progress ids
    cloud: (props) => <CloudGame {...props} game={info('cloud')} art={art('cloud')} />
}

const hubGames: HubGame<BivarGameId>[] = bivarGames.map((game) => ({ info: game, art: art(game.id), component: components[game.id] }))

export function BivarGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={BIVAR_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={bivarGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : bivarGameSlugs[mode])}
        />
    )
}
