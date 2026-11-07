import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import '../../dbh3-proportzionaltasuna/games/Games.css'
import { ExtremaGame, ShapeGame, UpdownGame } from './BachApplicationsGames'
import { BACH_APPLICATIONS_MEMORY_PAIRS, createBachApplicationsMemoryBoard } from './boards'
import { BACH_APPLICATIONS_DETECTIVE_CASES, bachApplicationsDetectiveNames, bachApplicationsDetectiveTips, createBachApplicationsDetectiveCases } from './detective'
import { BachApplicationsGameArt } from './GameArt'
import { BACH_APPLICATIONS_GAME_RECORDS_KEY, bachApplicationsGameModeForPath, bachApplicationsGames, bachApplicationsGameSlugs, type BachApplicationsGameId } from './info'
import { BachApplicationsRaceGame } from './RaceGame'

const info = (id: BachApplicationsGameId) => bachApplicationsGames.find((game) => game.id === id)!
const art = (id: BachApplicationsGameId) => <BachApplicationsGameArt game={id} />

const components: Record<BachApplicationsGameId, (props: GameProps) => JSX.Element> = {
    race: BachApplicationsRaceGame,
    updown: (props) => <UpdownGame {...props} game={info('updown')} art={art('updown')} />,
    extrema: (props) => <ExtremaGame {...props} game={info('extrema')} art={art('extrema')} />,
    shape: (props) => <ShapeGame {...props} game={info('shape')} art={art('shape')} />,
    detective: (props) => <WorkedDetectiveGame {...props} config={{ game: info('detective'), art: art('detective'), cases: BACH_APPLICATIONS_DETECTIVE_CASES, createCases: createBachApplicationsDetectiveCases, names: bachApplicationsDetectiveNames, tips: bachApplicationsDetectiveTips }} />,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: info('memory'), art: art('memory'), pairs: BACH_APPLICATIONS_MEMORY_PAIRS, createBoard: createBachApplicationsMemoryBoard }} />
}

const hubGames: HubGame<BachApplicationsGameId>[] = bachApplicationsGames.map((game) => ({ info: game, art: art(game.id), component: components[game.id] }))

export function BachApplicationsGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={BACH_APPLICATIONS_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={bachApplicationsGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : bachApplicationsGameSlugs[mode])}
        />
    )
}
