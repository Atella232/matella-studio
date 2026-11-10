import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { localize } from '../../batx1-zientziak-funtzioak/text'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import '../../dbh3-proportzionaltasuna/games/Games.css'
import { BuildGame, ChooseUGame, MethodGame } from './Bach2IndefiniteGames'
import { BACH2_INDEFINITE_MEMORY_PAIRS, createBach2IndefiniteMemoryBoard } from './boards'
import { BACH2_INDEFINITE_DETECTIVE_CASES, bach2IndefiniteDetectiveNames, bach2IndefiniteDetectiveTips, createBach2IndefiniteDetectiveCases } from './detective'
import { Bach2IndefiniteGameArt } from './GameArt'
import { BACH2_INDEFINITE_GAME_RECORDS_KEY, bach2IndefiniteGameModeForPath, bach2IndefiniteGames, bach2IndefiniteGameSlugs, type Bach2IndefiniteGameId } from './info'
import { Bach2IndefiniteRaceGame } from './RaceGame'

const info = (id: Bach2IndefiniteGameId) => bach2IndefiniteGames.find((game) => game.id === id)!
const art = (id: Bach2IndefiniteGameId) => <Bach2IndefiniteGameArt game={id} />

const components: Record<Bach2IndefiniteGameId, (props: GameProps) => JSX.Element> = {
    race: Bach2IndefiniteRaceGame,
    method: (props) => <MethodGame {...props} game={info('method')} art={art('method')} />,
    'choose-u': (props) => <ChooseUGame {...props} game={info('choose-u')} art={art('choose-u')} />,
    fractions: (props) => <BuildGame {...props} game={info('fractions')} art={art('fractions')} />,
    detective: (props) => <WorkedDetectiveGame {...props} config={{ game: info('detective'), art: art('detective'), cases: BACH2_INDEFINITE_DETECTIVE_CASES, createCases: createBach2IndefiniteDetectiveCases, names: bach2IndefiniteDetectiveNames, tips: bach2IndefiniteDetectiveTips, localize: (latex, language) => localize(language, latex) }} />,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: info('memory'), art: art('memory'), pairs: BACH2_INDEFINITE_MEMORY_PAIRS, createBoard: createBach2IndefiniteMemoryBoard }} />
}

const hubGames: HubGame<Bach2IndefiniteGameId>[] = bach2IndefiniteGames.map((game) => ({ info: game, art: art(game.id), component: components[game.id] }))

export function Bach2IndefiniteGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={BACH2_INDEFINITE_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={bach2IndefiniteGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : bach2IndefiniteGameSlugs[mode])}
        />
    )
}
