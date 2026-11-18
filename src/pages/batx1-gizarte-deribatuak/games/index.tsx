import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import '../../dbh3-proportzionaltasuna/games/Games.css'
import { ExtremaGame, UpdownGame } from '../../batx1-zientziak-aplikazioak/games/BachApplicationsGames'
import { MatchGame, SlopesGame } from '../../batx1-zientziak-deribatuak/games/BachDerivativesGames'
import { createSocDerivMemoryBoard, SOC_DERIV_MEMORY_PAIRS } from './boards'
import { createSocDerivDetectiveCases, SOC_DERIV_DETECTIVE_CASES, socDerivDetectiveNames, socDerivDetectiveTips } from './detective'
import { SocDerivGameArt } from './GameArt'
import { SOC_DERIV_GAME_RECORDS_KEY, socDerivGameModeForPath, socDerivGames, socDerivGameSlugs, type SocDerivGameId } from './info'
import { SocDerivRaceGame } from './RaceGame'
import { ProduceGame, RatesGame } from './SocDerivGames'

const info = (id: SocDerivGameId) => socDerivGames.find((game) => game.id === id)!
const art = (id: SocDerivGameId) => <SocDerivGameArt game={id} />

const components: Record<SocDerivGameId, (props: GameProps) => JSX.Element> = {
    race: SocDerivRaceGame,
    produce: (props) => <ProduceGame {...props} game={info('produce')} art={art('produce')} />,
    rates: (props) => <RatesGame {...props} game={info('rates')} art={art('rates')} />,
    detective: (props) => <WorkedDetectiveGame {...props} config={{ game: info('detective'), art: art('detective'), cases: SOC_DERIV_DETECTIVE_CASES, createCases: createSocDerivDetectiveCases, names: socDerivDetectiveNames, tips: socDerivDetectiveTips }} />,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: info('memory'), art: art('memory'), pairs: SOC_DERIV_MEMORY_PAIRS, createBoard: createSocDerivMemoryBoard }} />,
    // Borrowed from the Ciencias units, with this unit's levels and progress ids
    slopes: (props) => <SlopesGame {...props} game={info('slopes')} art={art('slopes')} />,
    match: (props) => <MatchGame {...props} game={info('match')} art={art('match')} />,
    updown: (props) => <UpdownGame {...props} game={info('updown')} art={art('updown')} />,
    extrema: (props) => <ExtremaGame {...props} game={info('extrema')} art={art('extrema')} />
}

const hubGames: HubGame<SocDerivGameId>[] = socDerivGames.map((game) => ({ info: game, art: art(game.id), component: components[game.id] }))

export function SocDerivGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={SOC_DERIV_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={socDerivGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : socDerivGameSlugs[mode])}
        />
    )
}
