import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { localize } from '../../batx1-zientziak-funtzioak/text'
import { DiscontinuityGame, FormsGame } from '../../batx1-zientziak-limiteak/games/BachLimitsGames'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import '../../dbh3-proportzionaltasuna/games/Games.css'
import { AssureGame, HuntGame, WinnerGame } from './Bach2LimitsGames'
import { BACH2_LIMITS_MEMORY_PAIRS, createBach2LimitsMemoryBoard } from './boards'
import { BACH2_LIMITS_DETECTIVE_CASES, bach2LimitsDetectiveNames, bach2LimitsDetectiveTips, createBach2LimitsDetectiveCases } from './detective'
import { Bach2LimitsGameArt } from './GameArt'
import { BACH2_LIMITS_GAME_RECORDS_KEY, bach2LimitsGameModeForPath, bach2LimitsGames, bach2LimitsGameSlugs, type Bach2LimitsGameId } from './info'
import { Bach2LimitsRaceGame } from './RaceGame'

const info = (id: Bach2LimitsGameId) => bach2LimitsGames.find((game) => game.id === id)!
const art = (id: Bach2LimitsGameId) => <Bach2LimitsGameArt game={id} />

const components: Record<Bach2LimitsGameId, (props: GameProps) => JSX.Element> = {
    race: Bach2LimitsRaceGame,
    winner: (props) => <WinnerGame {...props} game={info('winner')} art={art('winner')} />,
    assure: (props) => <AssureGame {...props} game={info('assure')} art={art('assure')} />,
    hunt: (props) => <HuntGame {...props} game={info('hunt')} art={art('hunt')} />,
    detective: (props) => <WorkedDetectiveGame {...props} config={{ game: info('detective'), art: art('detective'), cases: BACH2_LIMITS_DETECTIVE_CASES, createCases: createBach2LimitsDetectiveCases, names: bach2LimitsDetectiveNames, tips: bach2LimitsDetectiveTips, localize: (latex, language) => localize(language, latex) }} />,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: info('memory'), art: art('memory'), pairs: BACH2_LIMITS_MEMORY_PAIRS, createBoard: createBach2LimitsMemoryBoard }} />,
    // The Limiteak 1.º games, with this unit's levels and progress ids
    forms: (props) => <FormsGame {...props} game={info('forms')} art={art('forms')} />,
    discontinuity: (props) => <DiscontinuityGame {...props} game={info('discontinuity')} art={art('discontinuity')} />
}

const hubGames: HubGame<Bach2LimitsGameId>[] = bach2LimitsGames.map((game) => ({ info: game, art: art(game.id), component: components[game.id] }))

export function Bach2LimitsGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={BACH2_LIMITS_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={bach2LimitsGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : bach2LimitsGameSlugs[mode])}
        />
    )
}
