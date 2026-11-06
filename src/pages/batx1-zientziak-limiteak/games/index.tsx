import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { BandGame, WhereGame } from '../../batx1-zientziak-segidak/games/BachSequencesGames'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import '../../dbh3-proportzionaltasuna/games/Games.css'
import { AsymptoteGame, DiscontinuityGame, FormsGame } from './BachLimitsGames'
import { BACH_LIMITS_MEMORY_PAIRS, createBachLimitsMemoryBoard } from './boards'
import { BACH_LIMITS_DETECTIVE_CASES, bachLimitsDetectiveNames, bachLimitsDetectiveTips, createBachLimitsDetectiveCases } from './detective'
import { BachLimitsGameArt } from './GameArt'
import { BACH_LIMITS_GAME_RECORDS_KEY, bachLimitsGameModeForPath, bachLimitsGames, bachLimitsGameSlugs, type BachLimitsGameId } from './info'
import { BachLimitsRaceGame } from './RaceGame'

const info = (id: BachLimitsGameId) => bachLimitsGames.find((game) => game.id === id)!
const art = (id: BachLimitsGameId) => <BachLimitsGameArt game={id} />

const components: Record<BachLimitsGameId, (props: GameProps) => JSX.Element> = {
    race: BachLimitsRaceGame,
    forms: (props) => <FormsGame {...props} game={info('forms')} art={art('forms')} />,
    asymptote: (props) => <AsymptoteGame {...props} game={info('asymptote')} art={art('asymptote')} />,
    discontinuity: (props) => <DiscontinuityGame {...props} game={info('discontinuity')} art={art('discontinuity')} />,
    detective: (props) => <WorkedDetectiveGame {...props} config={{ game: info('detective'), art: art('detective'), cases: BACH_LIMITS_DETECTIVE_CASES, createCases: createBachLimitsDetectiveCases, names: bachLimitsDetectiveNames, tips: bachLimitsDetectiveTips }} />,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: info('memory'), art: art('memory'), pairs: BACH_LIMITS_MEMORY_PAIRS, createBoard: createBachLimitsMemoryBoard }} />,
    // The Segidak games, with this unit's levels and progress ids
    toward: (props) => <WhereGame {...props} game={info('toward')} art={art('toward')} />,
    band: (props) => <BandGame {...props} game={info('band')} art={art('band')} />
}

const hubGames: HubGame<BachLimitsGameId>[] = bachLimitsGames.map((game) => ({ info: game, art: art(game.id), component: components[game.id] }))

export function BachLimitsGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={BACH_LIMITS_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={bachLimitsGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : bachLimitsGameSlugs[mode])}
        />
    )
}
