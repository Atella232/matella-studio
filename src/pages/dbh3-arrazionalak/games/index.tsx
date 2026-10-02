import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { RealsGameArt } from '../../dbh4-aplikatuak-errealak/games/GameArt'
import { PlaceGameView } from '../../dbh4-aplikatuak-errealak/games/PlaceGame'
import { createRationalsMemoryBoard, RATIONALS_MEMORY_PAIRS } from './boards'
import { RATIONALS_GAME_RECORDS_KEY, rationalsGameModeForPath, rationalsGames, rationalsGameSlugs, type RationalsGameId } from './info'
import { RationalsRaceGame } from './RaceGame'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'

const memoryGame = rationalsGames.find((game) => game.id === 'memory')!
const placeGame = rationalsGames.find((game) => game.id === 'place')!
const raceArt = <RealsGameArt game="race" caption="3/4 · −5/6 · 7/2" />
const placeArt = <RealsGameArt game="place" points={[{ value: 0.75, label: '3/4' }, { value: 2.5, label: '5/2' }]} />

const components: Record<RationalsGameId, (props: GameProps) => JSX.Element> = {
    race: RationalsRaceGame,
    place: (props) => <PlaceGameView {...props} game={placeGame} art={placeArt} />,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: memoryGame, art: <RealsGameArt game="memory" />, pairs: RATIONALS_MEMORY_PAIRS, createBoard: createRationalsMemoryBoard }} />
}

const hubGames: HubGame<RationalsGameId>[] = rationalsGames.map((info) => ({ info, art: info.id === 'place' ? placeArt : info.id === 'race' ? raceArt : <RealsGameArt game={info.id} />, component: components[info.id] }))

export function RationalsGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={RATIONALS_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu zenbaki arrazionalekin', es: 'Juega con los números racionales', ar: 'العب بالأعداد النسبية' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={rationalsGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : rationalsGameSlugs[mode])}
        />
    )
}
