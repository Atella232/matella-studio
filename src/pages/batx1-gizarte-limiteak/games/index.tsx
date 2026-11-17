import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import '../../dbh3-proportzionaltasuna/games/Games.css'
import { AsymptoteGame, DiscontinuityGame, FormsGame } from '../../batx1-zientziak-limiteak/games/BachLimitsGames'
import { createSocLimitsMemoryBoard, SOC_LIMITS_MEMORY_PAIRS } from './boards'
import { createSocLimitsDetectiveCases, SOC_LIMITS_DETECTIVE_CASES, socLimitsDetectiveNames, socLimitsDetectiveTips } from './detective'
import { SocLimitsGameArt } from './GameArt'
import { SOC_LIMITS_GAME_RECORDS_KEY, socLimitsGameModeForPath, socLimitsGames, socLimitsGameSlugs, type SocLimitsGameId } from './info'
import { SocLimitsRaceGame } from './RaceGame'
import { JoinGame, LongGame } from './SocLimitsGames'

const info = (id: SocLimitsGameId) => socLimitsGames.find((game) => game.id === id)!
const art = (id: SocLimitsGameId) => <SocLimitsGameArt game={id} />

const components: Record<SocLimitsGameId, (props: GameProps) => JSX.Element> = {
    race: SocLimitsRaceGame,
    long: (props) => <LongGame {...props} game={info('long')} art={art('long')} />,
    join: (props) => <JoinGame {...props} game={info('join')} art={art('join')} />,
    detective: (props) => <WorkedDetectiveGame {...props} config={{ game: info('detective'), art: art('detective'), cases: SOC_LIMITS_DETECTIVE_CASES, createCases: createSocLimitsDetectiveCases, names: socLimitsDetectiveNames, tips: socLimitsDetectiveTips }} />,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: info('memory'), art: art('memory'), pairs: SOC_LIMITS_MEMORY_PAIRS, createBoard: createSocLimitsMemoryBoard }} />,
    // Borrowed from the Ciencias twin, with this unit's levels and progress ids
    forms: (props) => <FormsGame {...props} game={info('forms')} art={art('forms')} />,
    asymptote: (props) => <AsymptoteGame {...props} game={info('asymptote')} art={art('asymptote')} />,
    discontinuity: (props) => <DiscontinuityGame {...props} game={info('discontinuity')} art={art('discontinuity')} />
}

const hubGames: HubGame<SocLimitsGameId>[] = socLimitsGames.map((game) => ({ info: game, art: art(game.id), component: components[game.id] }))

export function SocLimitsGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={SOC_LIMITS_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={socLimitsGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : socLimitsGameSlugs[mode])}
        />
    )
}
