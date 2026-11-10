import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { MatchGame, TangentGame } from '../../batx1-zientziak-deribatuak/games/BachDerivativesGames'
import { localize } from '../../batx1-zientziak-funtzioak/text'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import '../../dbh3-proportzionaltasuna/games/Games.css'
import { DerivableGame, HiddenGame, OnionGame } from './Bach2DerivativesGames'
import { BACH2_DERIVATIVES_MEMORY_PAIRS, createBach2DerivativesMemoryBoard } from './boards'
import { BACH2_DERIVATIVES_DETECTIVE_CASES, bach2DerivativesDetectiveNames, bach2DerivativesDetectiveTips, createBach2DerivativesDetectiveCases } from './detective'
import { Bach2DerivativesGameArt } from './GameArt'
import { BACH2_DERIVATIVES_GAME_RECORDS_KEY, bach2DerivativesGameModeForPath, bach2DerivativesGames, bach2DerivativesGameSlugs, type Bach2DerivativesGameId } from './info'
import { Bach2DerivativesRaceGame } from './RaceGame'

const info = (id: Bach2DerivativesGameId) => bach2DerivativesGames.find((game) => game.id === id)!
const art = (id: Bach2DerivativesGameId) => <Bach2DerivativesGameArt game={id} />

const components: Record<Bach2DerivativesGameId, (props: GameProps) => JSX.Element> = {
    race: Bach2DerivativesRaceGame,
    derivable: (props) => <DerivableGame {...props} game={info('derivable')} art={art('derivable')} />,
    onion: (props) => <OnionGame {...props} game={info('onion')} art={art('onion')} />,
    hidden: (props) => <HiddenGame {...props} game={info('hidden')} art={art('hidden')} />,
    detective: (props) => <WorkedDetectiveGame {...props} config={{ game: info('detective'), art: art('detective'), cases: BACH2_DERIVATIVES_DETECTIVE_CASES, createCases: createBach2DerivativesDetectiveCases, names: bach2DerivativesDetectiveNames, tips: bach2DerivativesDetectiveTips, localize: (latex, language) => localize(language, latex) }} />,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: info('memory'), art: art('memory'), pairs: BACH2_DERIVATIVES_MEMORY_PAIRS, createBoard: createBach2DerivativesMemoryBoard }} />,
    // The Deribatuak 1.º games, with this unit's levels and progress ids
    match: (props) => <MatchGame {...props} game={info('match')} art={art('match')} />,
    tangent: (props) => <TangentGame {...props} game={info('tangent')} art={art('tangent')} />
}

const hubGames: HubGame<Bach2DerivativesGameId>[] = bach2DerivativesGames.map((game) => ({ info: game, art: art(game.id), component: components[game.id] }))

export function Bach2DerivativesGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={BACH2_DERIVATIVES_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={bach2DerivativesGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : bach2DerivativesGameSlugs[mode])}
        />
    )
}
