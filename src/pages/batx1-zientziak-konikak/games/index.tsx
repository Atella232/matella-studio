import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'
import '../../dbh3-proportzionaltasuna/games/Games.css'
import { BACH_CONICS_MEMORY_PAIRS, createBachConicsMemoryBoard } from './boards'
import { AntennaGame, ConicGame } from './ConicsGames'
import { BACH_CONICS_DETECTIVE_CASES, bachConicsDetectiveNames, bachConicsDetectiveTips, createBachConicsDetectiveCases } from './detective'
import { BachConicsGameArt } from './GameArt'
import { BACH_CONICS_GAME_RECORDS_KEY, bachConicsGameModeForPath, bachConicsGames, bachConicsGameSlugs, type BachConicsGameId } from './info'
import { BachConicsRaceGame } from './RaceGame'

const info = (id: BachConicsGameId) => bachConicsGames.find((game) => game.id === id)!
const art = (id: BachConicsGameId) => <BachConicsGameArt game={id} />

const components: Record<BachConicsGameId, (props: GameProps) => JSX.Element> = {
    race: BachConicsRaceGame,
    conic: (props) => <ConicGame {...props} game={info('conic')} art={art('conic')} />,
    antenna: (props) => <AntennaGame {...props} game={info('antenna')} art={art('antenna')} />,
    detective: (props) => <WorkedDetectiveGame {...props} config={{ game: info('detective'), art: art('detective'), cases: BACH_CONICS_DETECTIVE_CASES, createCases: createBachConicsDetectiveCases, names: bachConicsDetectiveNames, tips: bachConicsDetectiveTips }} />,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: info('memory'), art: art('memory'), pairs: BACH_CONICS_MEMORY_PAIRS, createBoard: createBachConicsMemoryBoard }} />
}

const hubGames: HubGame<BachConicsGameId>[] = bachConicsGames.map((game) => ({ info: game, art: art(game.id), component: components[game.id] }))

export function BachConicsGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={BACH_CONICS_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu eta hobetu zure marka', es: 'Juega y mejora tu marca', en: 'Play and improve your personal best', ar: 'العب وحسّن رقمك' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={bachConicsGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : bachConicsGameSlugs[mode])}
        />
    )
}
