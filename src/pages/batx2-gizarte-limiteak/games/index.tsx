import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { DiscontinuityGame, FormsGame } from '../../batx1-zientziak-limiteak/games/BachLimitsGames'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import '../../dbh3-proportzionaltasuna/games/Games.css'
import { CloseTariffGame, LongRunGame } from './Bach2gLimitsGames'
import { BACH2G_LIMITS_MEMORY_PAIRS, createBach2gLimitsMemoryBoard } from './boards'
import { BACH2G_LIMITS_DETECTIVE_CASES, bach2gLimitsDetectiveNames, bach2gLimitsDetectiveTips, createBach2gLimitsDetectiveCases } from './detective'
import { Bach2gLimitsGameArt } from './GameArt'
import { BACH2G_LIMITS_GAME_RECORDS_KEY, bach2gLimitsGameModeForPath, bach2gLimitsGames, bach2gLimitsGameSlugs, type Bach2gLimitsGameId } from './info'
import { Bach2gLimitsRaceGame } from './RaceGame'

const info = (id: Bach2gLimitsGameId) => bach2gLimitsGames.find((game) => game.id === id)!
const art = (id: Bach2gLimitsGameId) => <Bach2gLimitsGameArt game={id} />

const components: Record<Bach2gLimitsGameId, (props: GameProps) => JSX.Element> = {
    race: Bach2gLimitsRaceGame,
    'long-run': (props) => <LongRunGame {...props} game={info('long-run')} art={art('long-run')} />,
    'close-tariff': (props) => <CloseTariffGame {...props} game={info('close-tariff')} art={art('close-tariff')} />,
    detective: (props) => <WorkedDetectiveGame {...props} config={{ game: info('detective'), art: art('detective'), cases: BACH2G_LIMITS_DETECTIVE_CASES, createCases: createBach2gLimitsDetectiveCases, names: bach2gLimitsDetectiveNames, tips: bach2gLimitsDetectiveTips }} />,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: info('memory'), art: art('memory'), pairs: BACH2G_LIMITS_MEMORY_PAIRS, createBoard: createBach2gLimitsMemoryBoard }} />,
    // The Límites 1.º games, with this unit's levels and progress ids
    forms: (props) => <FormsGame {...props} game={info('forms')} art={art('forms')} />,
    discontinuity: (props) => <DiscontinuityGame {...props} game={info('discontinuity')} art={art('discontinuity')} />
}

const hubGames: HubGame<Bach2gLimitsGameId>[] = bach2gLimitsGames.map((game) => ({ info: game, art: art(game.id), component: components[game.id] }))

export function Bach2gLimitsGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={BACH2G_LIMITS_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={bach2gLimitsGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : bach2gLimitsGameSlugs[mode])}
        />
    )
}
