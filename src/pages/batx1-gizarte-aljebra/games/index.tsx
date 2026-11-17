import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/games/Games.css'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import '../../dbh3-proportzionaltasuna/games/Games.css'
import { SignsGame, ValidGame } from '../../batx1-zientziak-ekuazioak/games/BachEquationsGames'
import { ZeroGame } from '../../batx1-zientziak-sistemak/games/BachSystemsGames'
import { createGizAlgebraMemoryBoard, GIZ_ALGEBRA_MEMORY_PAIRS } from './boards'
import { createGizAlgebraDetectiveCases, GIZ_ALGEBRA_DETECTIVE_CASES, gizAlgebraDetectiveNames, gizAlgebraDetectiveTips } from './detective'
import { GizAlgebraGameArt } from './GameArt'
import { BoxGame, GainGame } from './GizAlgebraGames'
import { GIZ_ALGEBRA_GAME_RECORDS_KEY, gizAlgebraGameModeForPath, gizAlgebraGames, gizAlgebraGameSlugs, type GizAlgebraGameId } from './info'
import { GizAlgebraRaceGame } from './RaceGame'

const info = (id: GizAlgebraGameId) => gizAlgebraGames.find((game) => game.id === id)!
const art = (id: GizAlgebraGameId) => <GizAlgebraGameArt game={id} />

const components: Record<GizAlgebraGameId, (props: GameProps) => JSX.Element> = {
    race: GizAlgebraRaceGame,
    box: (props) => <BoxGame {...props} game={info('box')} art={art('box')} />,
    gain: (props) => <GainGame {...props} game={info('gain')} art={art('gain')} />,
    detective: (props) => <WorkedDetectiveGame {...props} config={{ game: info('detective'), art: art('detective'), cases: GIZ_ALGEBRA_DETECTIVE_CASES, createCases: createGizAlgebraDetectiveCases, names: gizAlgebraDetectiveNames, tips: gizAlgebraDetectiveTips }} />,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: info('memory'), art: art('memory'), pairs: GIZ_ALGEBRA_MEMORY_PAIRS, createBoard: createGizAlgebraMemoryBoard }} />,
    zero: (props) => <ZeroGame {...props} game={info('zero')} art={art('zero')} />,
    valid: (props) => <ValidGame {...props} game={info('valid')} art={art('valid')} />,
    signs: (props) => <SignsGame {...props} game={info('signs')} art={art('signs')} />
}

const hubGames: HubGame<GizAlgebraGameId>[] = gizAlgebraGames.map((game) => ({ info: game, art: art(game.id), component: components[game.id] }))

export function GizAlgebraGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={GIZ_ALGEBRA_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={gizAlgebraGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : gizAlgebraGameSlugs[mode])}
        />
    )
}
