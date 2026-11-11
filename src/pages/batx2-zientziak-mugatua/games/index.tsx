import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { localize } from '../../batx1-zientziak-funtzioak/text'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import '../../dbh3-proportzionaltasuna/games/Games.css'
import { BarrowGame, DeriveGame, LimitsGame } from './Bach2DefiniteGames'
import { BACH2_DEFINITE_MEMORY_PAIRS, createBach2DefiniteMemoryBoard } from './boards'
import { BACH2_DEFINITE_DETECTIVE_CASES, bach2DefiniteDetectiveNames, bach2DefiniteDetectiveTips, createBach2DefiniteDetectiveCases } from './detective'
import { Bach2DefiniteGameArt } from './GameArt'
import { BACH2_DEFINITE_GAME_RECORDS_KEY, bach2DefiniteGameModeForPath, bach2DefiniteGames, bach2DefiniteGameSlugs, type Bach2DefiniteGameId } from './info'
import { Bach2DefiniteRaceGame } from './RaceGame'

const info = (id: Bach2DefiniteGameId) => bach2DefiniteGames.find((game) => game.id === id)!
const art = (id: Bach2DefiniteGameId) => <Bach2DefiniteGameArt game={id} />

const components: Record<Bach2DefiniteGameId, (props: GameProps) => JSX.Element> = {
    race: Bach2DefiniteRaceGame,
    barrow: (props) => <BarrowGame {...props} game={info('barrow')} art={art('barrow')} />,
    limits: (props) => <LimitsGame {...props} game={info('limits')} art={art('limits')} />,
    derive: (props) => <DeriveGame {...props} game={info('derive')} art={art('derive')} />,
    detective: (props) => <WorkedDetectiveGame {...props} config={{ game: info('detective'), art: art('detective'), cases: BACH2_DEFINITE_DETECTIVE_CASES, createCases: createBach2DefiniteDetectiveCases, names: bach2DefiniteDetectiveNames, tips: bach2DefiniteDetectiveTips, localize: (latex, language) => localize(language, latex) }} />,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: info('memory'), art: art('memory'), pairs: BACH2_DEFINITE_MEMORY_PAIRS, createBoard: createBach2DefiniteMemoryBoard }} />
}

const hubGames: HubGame<Bach2DefiniteGameId>[] = bach2DefiniteGames.map((game) => ({ info: game, art: art(game.id), component: components[game.id] }))

export function Bach2DefiniteGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={BACH2_DEFINITE_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={bach2DefiniteGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : bach2DefiniteGameSlugs[mode])}
        />
    )
}
