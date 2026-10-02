import type { JSX } from 'react'
import { GamesHub, type GameProps, type HubGame } from '../../../features/unit-v2/games/GamesHub'
import { PairsMemoryGame } from '../../../features/unit-v2/games/PairsMemoryGame'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { RealsGameArt } from '../../dbh4-aplikatuak-errealak/games/GameArt'
import { PlaceGameView } from '../../dbh4-aplikatuak-errealak/games/PlaceGame'
import { createPercentMemoryBoard, PERCENT_MEMORY_PAIRS } from './boards'
import { PERCENT_GAME_RECORDS_KEY, percentGameModeForPath, percentGames, percentGameSlugs, type PercentGameId } from './info'
import { PercentRaceGame } from './RaceGame'
import '../../dbh1-aljebra-v2/games/AlgebraGames.css'

const memoryGame = percentGames.find((game) => game.id === 'memory')!
const placeGame = percentGames.find((game) => game.id === 'place')!

const components: Record<PercentGameId, (props: GameProps) => JSX.Element> = {
    race: PercentRaceGame,
    place: (props) => <PlaceGameView {...props} game={placeGame} />,
    memory: (props) => <PairsMemoryGame {...props} config={{ game: memoryGame, art: <RealsGameArt game="memory" />, pairs: PERCENT_MEMORY_PAIRS, createBoard: createPercentMemoryBoard }} />
}

const hubGames: HubGame<PercentGameId>[] = percentGames.map((info) => ({ info, art: <RealsGameArt game={info.id} />, component: components[info.id] }))

export function PercentGames({ language, pathname, openGame, completedIds, onComplete }: {
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
            recordsKey={PERCENT_GAME_RECORDS_KEY}
            title={{ eu: 'Jolastu errealekin eta ehunekoekin', es: 'Juega con reales y porcentajes', ar: 'العب بالأعداد الحقيقية والنسب' }}
            completedIds={completedIds}
            onComplete={onComplete}
            mode={percentGameModeForPath(pathname)}
            onModeChange={(mode) => openGame(mode === 'hub' ? null : percentGameSlugs[mode])}
        />
    )
}
